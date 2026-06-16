import type { ScriptModules } from "@crowbartools/firebot-custom-scripts-types";
import {
  COMPLETE_ROUTE_FILE,
  CREDITS_ROUTE_PREFIX,
  CreditsServer,
  GENERATION_ID_PARAM,
  GENERATION_VIEW_ROUTE_FILE,
  STATIC_VIEW_ROUTE,
  THEME_CSS_ROUTE,
} from "./server";

type Captured = {
  prefix: string;
  route: string;
  method: string;
  callback: (req: FakeRequest, res: FakeResponse) => void | Promise<void>;
};

type FakeRequest = { params?: Record<string, string> };

type FakeResponse = {
  headers: Record<string, string>;
  statusCode: number;
  body?: string;
  set(field: string, value: string): FakeResponse;
  status(code: number): FakeResponse;
  send(body: string): FakeResponse;
};

function makeFakeResponse(): FakeResponse {
  return {
    headers: {},
    statusCode: 200,
    set(field, value) {
      this.headers[field] = value;
      return this;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    send(body) {
      this.body = body;
      return this;
    },
  };
}

function makeFakeHttpServer() {
  const registered: Captured[] = [];
  const unregistered: Array<{ prefix: string; route: string; method: string }> = [];
  const httpServer = {
    registerCustomRoute(
      prefix: string,
      route: string,
      method: string,
      callback: Captured["callback"],
    ) {
      registered.push({ prefix, route, method, callback });
      return true;
    },
    unregisterCustomRoute(prefix: string, route: string, method: string) {
      unregistered.push({ prefix, route, method });
      return true;
    },
  };
  return { registered, unregistered, httpServer };
}

const fakeLogger = {
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
} as unknown as ScriptModules["logger"];

function newServer(
  httpServer: unknown,
  options?: { host?: string; idFactory?: () => string; maxGenerations?: number },
): CreditsServer {
  return new CreditsServer(httpServer as ScriptModules["httpServer"], fakeLogger, options);
}

function routeMeta(registered: Captured[]) {
  return registered.map(({ prefix, route, method }) => ({ prefix, route, method }));
}

function findRoute(registered: Captured[], route: string): Captured {
  const match = registered.find((entry) => entry.route === route);
  if (!match) {
    throw new Error(`route not registered: ${route}`);
  }
  return match;
}

describe("CreditsServer static view", () => {
  it("registers a GET route for the static credits view on start", () => {
    const { registered, httpServer } = makeFakeHttpServer();

    newServer(httpServer).start();

    expect(routeMeta(registered)).toContainEqual({
      prefix: CREDITS_ROUTE_PREFIX,
      route: STATIC_VIEW_ROUTE,
      method: "GET",
    });
  });

  it("serves an HTML credits view from the static route handler", async () => {
    const { registered, httpServer } = makeFakeHttpServer();
    newServer(httpServer).start();

    const res = makeFakeResponse();
    await findRoute(registered, STATIC_VIEW_ROUTE).callback({}, res);

    expect(res.headers["Content-Type"]).toMatch(/text\/html/);
    expect(res.body?.toLowerCase()).toContain("<!doctype html>");
    expect(res.body?.toLowerCase()).toContain("credits");
  });

  it("unregisters the static route on stop", () => {
    const { unregistered, httpServer } = makeFakeHttpServer();
    const server = newServer(httpServer);
    server.start();
    server.stop();

    expect(unregistered).toContainEqual({
      prefix: CREDITS_ROUTE_PREFIX,
      route: STATIC_VIEW_ROUTE,
      method: "GET",
    });
  });
});

describe("CreditsServer generations", () => {
  it("registers a dynamic per-generation route on start", () => {
    const { registered, httpServer } = makeFakeHttpServer();

    newServer(httpServer).start();

    expect(routeMeta(registered)).toContainEqual({
      prefix: CREDITS_ROUTE_PREFIX,
      route: `:${GENERATION_ID_PARAM}/${GENERATION_VIEW_ROUTE_FILE}`,
      method: "GET",
    });
  });

  it("registers every route with an all-lowercase path (Firebot lowercases route params)", () => {
    const { registered, httpServer } = makeFakeHttpServer();

    newServer(httpServer).start();

    for (const { route } of registered) {
      expect(route).toBe(route.toLowerCase());
    }
  });

  it("serves published HTML for a known generation id", async () => {
    const { registered, httpServer } = makeFakeHttpServer();
    const server = newServer(httpServer, { idFactory: () => "gen-1" });
    server.start();

    const id = server.publishGeneration("<!doctype html><html><body>roll</body></html>");
    expect(id).toBe("gen-1");

    const res = makeFakeResponse();
    await findRoute(registered, `:${GENERATION_ID_PARAM}/${GENERATION_VIEW_ROUTE_FILE}`).callback(
      { params: { [GENERATION_ID_PARAM]: id } },
      res,
    );

    expect(res.headers["Content-Type"]).toMatch(/text\/html/);
    expect(res.body).toContain("roll");
  });

  it("returns 404 for an unknown generation id", async () => {
    const { registered, httpServer } = makeFakeHttpServer();
    newServer(httpServer).start();

    const res = makeFakeResponse();
    await findRoute(registered, `:${GENERATION_ID_PARAM}/${GENERATION_VIEW_ROUTE_FILE}`).callback(
      { params: { [GENERATION_ID_PARAM]: "nope" } },
      res,
    );

    expect(res.statusCode).toBe(404);
  });

  it("builds the OBS-ready URL using the configured host", () => {
    const { httpServer } = makeFakeHttpServer();
    const server = newServer(httpServer, { host: "192.168.1.50", idFactory: () => "gen-7" });

    const id = server.publishGeneration("<html></html>");

    expect(server.generationUrl(id)).toBe(
      `http://192.168.1.50:7472/integrations/${CREDITS_ROUTE_PREFIX}/gen-7/${GENERATION_VIEW_ROUTE_FILE}`,
    );
  });

  it("evicts the oldest generation beyond the cap", () => {
    const { registered, httpServer } = makeFakeHttpServer();
    let n = 0;
    const server = newServer(httpServer, { idFactory: () => `g${++n}`, maxGenerations: 2 });
    server.start();

    const first = server.publishGeneration("<html>1</html>");
    server.publishGeneration("<html>2</html>");
    server.publishGeneration("<html>3</html>");

    const res = makeFakeResponse();
    return Promise.resolve(
      findRoute(registered, `:${GENERATION_ID_PARAM}/${GENERATION_VIEW_ROUTE_FILE}`).callback(
        { params: { [GENERATION_ID_PARAM]: first } },
        res,
      ),
    ).then(() => {
      expect(res.statusCode).toBe(404);
    });
  });
});

describe("CreditsServer theme css", () => {
  it("registers a GET route for the themeable stylesheet on start", () => {
    const { registered, httpServer } = makeFakeHttpServer();

    newServer(httpServer).start();

    expect(routeMeta(registered)).toContainEqual({
      prefix: CREDITS_ROUTE_PREFIX,
      route: THEME_CSS_ROUTE,
      method: "GET",
    });
  });

  it("serves the base stylesheet as text/css", async () => {
    const { registered, httpServer } = makeFakeHttpServer();
    newServer(httpServer).start();

    const res = makeFakeResponse();
    await findRoute(registered, THEME_CSS_ROUTE).callback({}, res);

    expect(res.headers["Content-Type"]).toMatch(/text\/css/);
    expect(res.body).toContain("--credits-bg");
  });

  it("includes the user's custom css after setCustomCss", async () => {
    const { registered, httpServer } = makeFakeHttpServer();
    const server = newServer(httpServer);
    server.start();
    server.setCustomCss(".credit { color: hotpink; }");

    const res = makeFakeResponse();
    await findRoute(registered, THEME_CSS_ROUTE).callback({}, res);

    expect(res.body).toContain(".credit { color: hotpink; }");
  });
});

describe("CreditsServer completion", () => {
  it("registers a per-generation complete route on start", () => {
    const { registered, httpServer } = makeFakeHttpServer();

    newServer(httpServer).start();

    expect(routeMeta(registered)).toContainEqual({
      prefix: CREDITS_ROUTE_PREFIX,
      route: `:${GENERATION_ID_PARAM}/${COMPLETE_ROUTE_FILE}`,
      method: "GET",
    });
  });

  it("invokes the credits-ended handler with the generation id and responds 204", async () => {
    const { registered, httpServer } = makeFakeHttpServer();
    const ended: string[] = [];
    const server = newServer(httpServer);
    server.setCreditsEndedHandler((id) => ended.push(id));
    server.start();

    const res = makeFakeResponse();
    await findRoute(registered, `:${GENERATION_ID_PARAM}/${COMPLETE_ROUTE_FILE}`).callback(
      { params: { [GENERATION_ID_PARAM]: "gen-1" } },
      res,
    );

    expect(ended).toEqual(["gen-1"]);
    expect(res.statusCode).toBe(204);
  });
});

describe("CreditsServer view convenience (testing aid)", () => {
  it("logs the OBS-ready credits URL when a generation is published", () => {
    const { httpServer } = makeFakeHttpServer();
    const info = jest.fn();
    const logger = {
      debug: jest.fn(),
      info,
      warn: jest.fn(),
      error: jest.fn(),
    } as unknown as ScriptModules["logger"];
    const server = new CreditsServer(httpServer as unknown as ScriptModules["httpServer"], logger, {
      host: "10.0.0.5",
      idFactory: () => "gen-1",
    });

    const id = server.publishGeneration("<html></html>");

    expect(info).toHaveBeenCalledWith(expect.stringContaining(server.generationUrl(id)));
  });

  it("serves the placeholder at the static view route before a preview renderer is set", async () => {
    const { registered, httpServer } = makeFakeHttpServer();
    newServer(httpServer).start();

    const res = makeFakeResponse();
    await findRoute(registered, STATIC_VIEW_ROUTE).callback({}, res);

    expect(res.body?.toLowerCase()).toContain("served by stream-end-credits");
  });

  it("serves the live preview from the preview renderer, re-rendered on each request", async () => {
    const { registered, httpServer } = makeFakeHttpServer();
    const server = newServer(httpServer);
    server.start();
    // Simulates the live store: what the renderer returns can change between requests.
    let current = "<!doctype html><html><body>HAS_ALICE</body></html>";
    server.setPreviewRenderer(() => current);

    const view = () =>
      Promise.resolve(makeFakeResponse()).then((res) =>
        Promise.resolve(findRoute(registered, STATIC_VIEW_ROUTE).callback({}, res)).then(() => res),
      );

    expect((await view()).body).toContain("HAS_ALICE");

    // After a Clear, the renderer reflects the empty store — the static view follows immediately.
    current = "<!doctype html><html><body>EMPTY</body></html>";
    const after = await view();
    expect(after.body).toContain("EMPTY");
    expect(after.body).not.toContain("HAS_ALICE");
  });

  it("does not let a published generation change the static view (per-gen URLs are separate)", async () => {
    const { registered, httpServer } = makeFakeHttpServer();
    const server = newServer(httpServer, { idFactory: () => "gen-1" });
    server.start();
    server.setPreviewRenderer(() => "<!doctype html><html><body>LIVE_PREVIEW</body></html>");
    server.publishGeneration("<!doctype html><html><body>FROZEN_ROLL</body></html>");

    const res = makeFakeResponse();
    await findRoute(registered, STATIC_VIEW_ROUTE).callback({}, res);

    expect(res.body).toContain("LIVE_PREVIEW");
    expect(res.body).not.toContain("FROZEN_ROLL");
  });

  it("sends a no-store cache header on the static view so refreshes are never stale", async () => {
    const { registered, httpServer } = makeFakeHttpServer();
    const server = newServer(httpServer);
    server.start();
    server.setPreviewRenderer(() => "<!doctype html><html></html>");

    const res = makeFakeResponse();
    await findRoute(registered, STATIC_VIEW_ROUTE).callback({}, res);

    expect(res.headers["Cache-Control"]).toMatch(/no-store/);
  });
});

describe("CreditsServer route ownership across re-initialization", () => {
  // Models Firebot's web server: one handler per (prefix, route, method); a duplicate
  // registerCustomRoute is REJECTED (returns false). This reproduces the "No credits generation
  // for this URL" 404 that happens when the script re-initializes and a stale instance keeps the
  // routes while the new instance holds the generation.
  function firebotHttpServer() {
    const handlers = new Map<string, Captured["callback"]>();
    const key = (p: string, r: string, m: string) => `${p}|${r}|${m}`;
    const httpServer = {
      registerCustomRoute(p: string, r: string, m: string, cb: Captured["callback"]) {
        const k = key(p, r, m);
        if (handlers.has(k)) {
          return false;
        }
        handlers.set(k, cb);
        return true;
      },
      unregisterCustomRoute(p: string, r: string, m: string) {
        return handlers.delete(key(p, r, m));
      },
    } as unknown as ScriptModules["httpServer"];
    const liveHandler = (route: string) => handlers.get(key(CREDITS_ROUTE_PREFIX, route, "GET"));
    return { httpServer, liveHandler };
  }

  it("serves a generation published by the most recently started server (no stale-instance 404)", async () => {
    const { httpServer, liveHandler } = firebotHttpServer();

    // First init (e.g. Firebot startup) claims the routes.
    newServer(httpServer, { idFactory: () => "old" }).start();

    // Second init (e.g. script reload / settings save) must reclaim the routes.
    const current = newServer(httpServer, { idFactory: () => "gen1" });
    current.start();
    const id = current.publishGeneration("<!doctype html><html><body>CURRENT_ROLL</body></html>");

    const res = makeFakeResponse();
    await liveHandler(`:${GENERATION_ID_PARAM}/${GENERATION_VIEW_ROUTE_FILE}`)?.(
      { params: { [GENERATION_ID_PARAM]: id } },
      res,
    );

    expect(res.statusCode).toBe(200);
    expect(res.body).toContain("CURRENT_ROLL");
  });
});
