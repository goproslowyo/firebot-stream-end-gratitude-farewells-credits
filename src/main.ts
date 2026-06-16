import type { Firebot } from "@crowbartools/firebot-custom-scripts-types";
import { CreditStore } from "./credits/store";
import { registerEffects } from "./effects";
import { renderCreditsHtml } from "./effects/generate-credits";
import { emitCreditsEnded, registerCreditsEndedEvent } from "./events/credits-ended";
import { CreditsServer } from "./server/server";
import { buildGratitudeSummaryVariable } from "./variables/gratitude-summary";

/**
 * Script parameters surfaced in Firebot's startup-script settings UI.
 * Kept minimal for the scaffold; display/credit options arrive with later issues.
 */
interface Params {
  enabled: boolean;
  webServerHost: string;
  customCss: string;
  showTitle: string;
  titleTagline: string;
  scrollPxPerSecond: number;
  slideSeconds: number;
}

/** Holds the running server so `stop()` can tear its route down on script unload/reload. */
let creditsServer: CreditsServer | undefined;

/** The session credit store, shared across effects/variables. Empty on load (session start). */
const creditStore = new CreditStore();

const MANIFEST = {
  name: "Stream-End Gratitude, Farewells & Credits",
  description:
    "Rolling end-credits served over Firebot's web server, plus a Discord gratitude summary.",
  author: "goproslowyo",
  version: "0.1.0",
  // Firebot major version this script targets.
  firebotVersion: "5",
} as const;

const script: Firebot.CustomScript<Params> = {
  getScriptManifest: () => ({ ...MANIFEST }),

  getDefaultParameters: () => ({
    enabled: {
      type: "boolean",
      title: "Enabled",
      default: true,
      description: "Enabled",
      secondaryDescription: "Master switch for the stream-end script.",
    },
    webServerHost: {
      type: "string",
      title: "Web Server Host",
      default: "localhost",
      description: "Hostname or LAN IP OBS uses to reach Firebot's web server (port 7472).",
      secondaryDescription:
        "Set this to the Firebot laptop's LAN IP/hostname when OBS runs on a separate machine, so the generated credits URL is reachable from OBS.",
    },
    customCss: {
      type: "string",
      useTextArea: true,
      title: "Custom CSS",
      default: "",
      description: "Optional CSS appended to the credits theme (served on the theme.css route).",
      secondaryDescription:
        "Override the --credits-* variables or any view selector to restyle without rebuilding. Takes effect on the next credits view load.",
    },
    showTitle: {
      type: "string",
      title: "Credits Title",
      default: "",
      description: "Name shown on the credits intro card (your show/channel 'studio' name).",
      secondaryDescription:
        "Drawn as a film-style title card — no image needed. Leave blank for a default.",
    },
    titleTagline: {
      type: "string",
      title: "Credits Tagline",
      default: "",
      description:
        'Tagline under the title on the intro card, e.g. "Filmed before a live audience".',
      secondaryDescription: "Leave blank for a default.",
    },
    scrollPxPerSecond: {
      type: "number",
      title: "Scroll Speed (pixels/sec)",
      default: 70,
      validation: { min: 10, max: 1000 },
      description: "How fast the scroll-mode credits crawl, in pixels per second.",
      secondaryDescription:
        "Lower = slower, more readable; higher = faster. Tune the film feel without rebuilding. Applies on the next Generate.",
    },
    slideSeconds: {
      type: "number",
      title: "Slideshow Time Per Slide (seconds)",
      default: 5,
      validation: { min: 1, max: 120 },
      description: "How long each slide shows in slideshow mode, in seconds.",
      secondaryDescription: "Applies on the next Generate.",
    },
  }),

  run: (runRequest) => {
    const { logger, httpServer, effectManager, eventManager, replaceVariableManager } =
      runRequest.modules;
    const {
      enabled,
      webServerHost,
      customCss,
      showTitle,
      titleTagline,
      scrollPxPerSecond,
      slideSeconds,
    } = runRequest.parameters;
    logger.info(`[stream-end-credits] v${MANIFEST.version} loaded (enabled=${enabled})`);

    if (!enabled) {
      return;
    }

    // Fresh session: start with an empty credit store. (Mid-session stream-start clearing is wired
    // by attaching the Clear credits effect to the Stream Online event.)
    creditStore.clear();

    registerCreditsEndedEvent(eventManager);

    const server = new CreditsServer(httpServer, logger, {
      host: webServerHost || "localhost",
      onCreditsEnded: (generationId) => emitCreditsEnded(eventManager, { generationId }),
    });
    creditsServer = server;
    server.setCustomCss(customCss ?? "");
    server.setFilmTitle({ studio: showTitle, tagline: titleTagline });
    server.setTiming({ scrollPxPerSecond, slideSeconds });
    // The static /view route renders the live store on each request (so Clear/Register show without
    // a Generate). Per-generation URLs stay immutable for OBS.
    server.setPreviewRenderer(() => renderCreditsHtml(creditStore, server));
    server.start();

    registerEffects(effectManager, creditStore, creditsServer);
    replaceVariableManager.registerReplaceVariable(buildGratitudeSummaryVariable(creditStore));
  },

  parametersUpdated: (parameters) => {
    creditsServer?.setCustomCss(parameters.customCss ?? "");
    creditsServer?.setFilmTitle({ studio: parameters.showTitle, tagline: parameters.titleTagline });
    creditsServer?.setTiming({
      scrollPxPerSecond: parameters.scrollPxPerSecond,
      slideSeconds: parameters.slideSeconds,
    });
  },

  stop: () => {
    creditsServer?.stop();
    creditsServer = undefined;
  },
};

export default script;
