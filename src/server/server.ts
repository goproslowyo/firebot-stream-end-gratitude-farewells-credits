import type { ScriptModules } from "@crowbartools/firebot-custom-scripts-types";
import type { FilmTitle, Timing } from "../view/render";
import { renderStaticCreditsView } from "../view/static-view";
import { buildThemeCss } from "../view/theme";

/** Firebot's embedded web server listens here; OBS reaches it across the LAN. */
export const FIREBOT_WEB_SERVER_PORT = 7472;

/** Unique-per-script URL prefix for our custom routes. */
export const CREDITS_ROUTE_PREFIX = "stream-end-credits";

/** Route serving the static placeholder credits view. */
export const STATIC_VIEW_ROUTE = "view";

/** Filename segment of the per-generation credits route (`:generationId/<file>`). */
export const GENERATION_VIEW_ROUTE_FILE = "view";

/** Route serving the themeable stylesheet. */
export const THEME_CSS_ROUTE = "theme.css";

/** Filename segment of the per-generation completion ping (`:generationId/<file>`). */
export const COMPLETE_ROUTE_FILE = "complete";

/**
 * Route param for the generation id. **Lowercase on purpose:** Firebot lowercases custom route
 * paths when registering them, so the param key Express provides is lowercase — we must register
 * and read it under the same lowercase key (confirmed in Firebot's route-registration logs).
 */
export const GENERATION_ID_PARAM = "generationid";
const GENERATION_ROUTE = `:${GENERATION_ID_PARAM}/${GENERATION_VIEW_ROUTE_FILE}`;
const COMPLETE_ROUTE = `:${GENERATION_ID_PARAM}/${COMPLETE_ROUTE_FILE}`;
const DEFAULT_MAX_GENERATIONS = 20;

type HttpServer = ScriptModules["httpServer"];
type Logger = ScriptModules["logger"];
type RouteHandler = Parameters<HttpServer["registerCustomRoute"]>[3];

export interface CreditsServerOptions {
  /** Hostname/LAN IP OBS uses to reach Firebot's web server. Defaults to `localhost`. */
  host?: string;
  /** Factory for unique generation ids; injectable for tests. */
  idFactory?: () => string;
  /** Cap on retained generations (oldest evicted past this). */
  maxGenerations?: number;
  /** Called when a credits view signals completion. */
  onCreditsEnded?: (generationId: string) => void;
}

/**
 * Registers the credits views on Firebot's embedded web server as custom HTTP routes, so OBS can
 * load them as URL browser sources from a separate machine.
 *
 * - `view` — the static placeholder view.
 * - `:generationId/view` — a freshly rendered credits view per Generate, addressed by a unique id
 *   so OBS reloads clean content each roll. Express route params are honoured by
 *   `registerCustomRoute` (as in the StaticMage reference).
 */
export class CreditsServer {
  private readonly host: string;
  private readonly idFactory: () => string;
  private readonly maxGenerations: number;
  private readonly generations = new Map<string, string>();
  private readonly order: string[] = [];
  private seq = 0;
  private customCss = "";
  private filmTitle: FilmTitle = {};
  private timing: Timing = {};
  private previewRenderer?: () => string;
  private creditsEndedHandler?: (generationId: string) => void;

  constructor(
    private readonly httpServer: HttpServer,
    private readonly logger: Logger,
    options: CreditsServerOptions = {},
  ) {
    this.host = options.host ?? "localhost";
    this.idFactory = options.idFactory ?? (() => `gen${++this.seq}`);
    this.maxGenerations = options.maxGenerations ?? DEFAULT_MAX_GENERATIONS;
    this.creditsEndedHandler = options.onCreditsEnded;
  }

  start(): void {
    const staticOk = this.register(STATIC_VIEW_ROUTE, (_req, res) => {
      res.set("Content-Type", "text/html; charset=utf-8");
      // No-store so a browser/OBS refresh always re-fetches the *current* store (never a stale copy).
      res.set("Cache-Control", "no-store");
      // Live preview: re-render the current credit store on every request, so Clear/Register show up
      // here immediately without a Generate. OBS should still use the per-generation URL from Generate
      // (it changes per roll to force a clean reload and carries the Credits Ended signal).
      res.send(this.previewRenderer?.() ?? renderStaticCreditsView());
    });

    const generationOk = this.register(GENERATION_ROUTE, (req, res) => {
      const raw = req.params?.[GENERATION_ID_PARAM];
      const id = typeof raw === "string" ? raw : undefined;
      const html = id ? this.generations.get(id) : undefined;
      if (!html) {
        res
          .status(404)
          .set("Content-Type", "text/html; charset=utf-8")
          .send("<!doctype html><title>Credits</title><p>No credits generation for this URL.</p>");
        return;
      }
      res.set("Content-Type", "text/html; charset=utf-8");
      res.send(html);
    });

    const themeOk = this.register(THEME_CSS_ROUTE, (_req, res) => {
      res.set("Content-Type", "text/css; charset=utf-8");
      res.send(buildThemeCss(this.customCss));
    });

    const completeOk = this.register(COMPLETE_ROUTE, (req, res) => {
      const raw = req.params?.[GENERATION_ID_PARAM];
      const id = typeof raw === "string" ? raw : undefined;
      if (id) {
        this.creditsEndedHandler?.(id);
      }
      res.status(204).send("");
    });

    if (!staticOk || !generationOk || !themeOk || !completeOk) {
      this.logger.error("[stream-end-credits] failed to register one or more credits routes");
      return;
    }
    this.logger.info(`[stream-end-credits] static credits view served at ${this.staticViewUrl()}`);
  }

  /**
   * Register a GET route, reclaiming it if a prior init already holds it. Firebot rejects duplicate
   * registrations (returns false); on a clean first start the register succeeds with no warning, and
   * on a re-init (reload / settings save) we unregister the stale handler then re-register so the
   * most recent instance is authoritative and owns the live routes.
   */
  private register(route: string, handler: RouteHandler): boolean {
    let ok = this.httpServer.registerCustomRoute(CREDITS_ROUTE_PREFIX, route, "GET", handler);
    if (!ok) {
      this.httpServer.unregisterCustomRoute(CREDITS_ROUTE_PREFIX, route, "GET");
      ok = this.httpServer.registerCustomRoute(CREDITS_ROUTE_PREFIX, route, "GET", handler);
    }
    return ok;
  }

  stop(): void {
    this.unregisterRoutes();
  }

  private unregisterRoutes(): void {
    this.httpServer.unregisterCustomRoute(CREDITS_ROUTE_PREFIX, STATIC_VIEW_ROUTE, "GET");
    this.httpServer.unregisterCustomRoute(CREDITS_ROUTE_PREFIX, GENERATION_ROUTE, "GET");
    this.httpServer.unregisterCustomRoute(CREDITS_ROUTE_PREFIX, THEME_CSS_ROUTE, "GET");
    this.httpServer.unregisterCustomRoute(CREDITS_ROUTE_PREFIX, COMPLETE_ROUTE, "GET");
  }

  /** Set the user's Custom CSS, appended to the base stylesheet on the theme route. */
  setCustomCss(css: string): void {
    this.customCss = css ?? "";
  }

  /** Set the film intro title-card text; read by Generate credits at render time. */
  setFilmTitle(title: FilmTitle): void {
    this.filmTitle = title ?? {};
  }

  /** The current film intro title-card text. */
  getFilmTitle(): FilmTitle {
    return this.filmTitle;
  }

  /** Set the animation timing (crawl speed / slide dwell); read by Generate credits at render time. */
  setTiming(timing: Timing): void {
    this.timing = timing ?? {};
  }

  /** The current animation timing. */
  getTiming(): Timing {
    return this.timing;
  }

  /** Register the handler fired when a credits view pings its complete route. */
  setCreditsEndedHandler(handler: (generationId: string) => void): void {
    this.creditsEndedHandler = handler;
  }

  /**
   * Register the renderer the static `/view` route uses to produce a **live** preview of the current
   * credit store on each request (so Clear/Register are reflected without a Generate).
   */
  setPreviewRenderer(renderer: () => string): void {
    this.previewRenderer = renderer;
  }

  /** Store a rendered credits view and return its unique generation id. */
  publishGeneration(html: string): string {
    const id = this.idFactory();
    this.generations.set(id, html);
    this.order.push(id);
    while (this.order.length > this.maxGenerations) {
      const evicted = this.order.shift();
      if (evicted !== undefined) {
        this.generations.delete(evicted);
      }
    }
    this.logger.info(
      `[stream-end-credits] credits generated — OBS browser source URL: ${this.generationUrl(id)}`,
    );
    return id;
  }

  /** Path portion of the static credits URL. Host + port are supplied by Firebot/OBS. */
  get staticViewPath(): string {
    return `integrations/${CREDITS_ROUTE_PREFIX}/${STATIC_VIEW_ROUTE}`;
  }

  staticViewUrl(host = this.host): string {
    return `http://${host}:${FIREBOT_WEB_SERVER_PORT}/${this.staticViewPath}`;
  }

  /** Path portion of a generation's credits URL. */
  generationPath(id: string): string {
    return `integrations/${CREDITS_ROUTE_PREFIX}/${id}/${GENERATION_VIEW_ROUTE_FILE}`;
  }

  /** OBS-ready credits URL for a generation, using the configured host (LAN IP for a split host). */
  generationUrl(id: string, host = this.host): string {
    return `http://${host}:${FIREBOT_WEB_SERVER_PORT}/${this.generationPath(id)}`;
  }
}
