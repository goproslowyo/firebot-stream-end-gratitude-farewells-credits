import { CLEAR_CREDITS_EFFECT_ID } from "./effects/clear-credits";
import { REGISTER_EVENT_EFFECT_ID } from "./effects/register-event";
import { REGISTER_MANUAL_EFFECT_ID } from "./effects/register-manual";
import script from "./main";
import {
  CREDITS_ROUTE_PREFIX,
  GENERATION_ID_PARAM,
  STATIC_VIEW_ROUTE,
  THEME_CSS_ROUTE,
} from "./server/server";

// Minimal shape of an effect we fire in tests.
type FakeEffect = { definition: { id: string }; onTriggerEvent: (event: unknown) => unknown };

type FakeRes = {
  headers: Record<string, string>;
  body?: string;
  set(field: string, value: string): FakeRes;
  status(code: number): FakeRes;
  send(body: string): FakeRes;
};

function makeRes(): FakeRes {
  return {
    headers: {},
    set(field, value) {
      this.headers[field] = value;
      return this;
    },
    status() {
      return this;
    },
    send(body) {
      this.body = body;
      return this;
    },
  };
}

type Captured = {
  prefix: string;
  route: string;
  method: string;
  callback?: (req: unknown, res: FakeRes) => unknown;
};

function makeRunRequest(enabled: boolean, customCss = "") {
  const registered: Captured[] = [];
  const effectIds: string[] = [];
  const effects: FakeEffect[] = [];
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
    unregisterCustomRoute() {
      return true;
    },
  };
  const effectManager = {
    registerEffect(effect: FakeEffect) {
      effectIds.push(effect.definition.id);
      effects.push(effect);
    },
  };
  const eventSourceIds: string[] = [];
  const triggered: Array<{ sourceId: string; eventId: string; meta: unknown }> = [];
  const eventManager = {
    registerEventSource(source: { id: string }) {
      eventSourceIds.push(source.id);
    },
    triggerEvent(sourceId: string, eventId: string, meta: unknown) {
      triggered.push({ sourceId, eventId, meta });
    },
  };
  const variableHandles: string[] = [];
  const replaceVariableManager = {
    registerReplaceVariable(variable: { definition: { handle: string } }) {
      variableHandles.push(variable.definition.handle);
    },
  };
  const logger = { debug: jest.fn(), info: jest.fn(), warn: jest.fn(), error: jest.fn() };
  const runRequest = {
    parameters: { enabled, webServerHost: "localhost", customCss },
    modules: { httpServer, effectManager, eventManager, replaceVariableManager, logger },
  } as unknown as Parameters<typeof script.run>[0];

  const routeMeta = () =>
    registered.map(({ prefix, route, method }) => ({ prefix, route, method }));
  const getEffect = (id: string): FakeEffect => {
    const effect = effects.find((e) => e.definition.id === id);
    if (!effect) {
      throw new Error(`effect not registered: ${id}`);
    }
    return effect;
  };
  const serveStaticView = async (): Promise<{ body: string; headers: Record<string, string> }> => {
    const res = makeRes();
    await registered.find((entry) => entry.route === STATIC_VIEW_ROUTE)?.callback?.({}, res);
    return { body: res.body ?? "", headers: res.headers };
  };
  const serveThemeCss = async (): Promise<string> => {
    const res = makeRes();
    await registered.find((entry) => entry.route === THEME_CSS_ROUTE)?.callback?.({}, res);
    return res.body ?? "";
  };
  const completeGeneration = async (generationId: string): Promise<void> => {
    const res = makeRes();
    await registered
      .find((entry) => entry.route.endsWith("/complete"))
      ?.callback?.({ params: { [GENERATION_ID_PARAM]: generationId } }, res);
  };
  return {
    routeMeta,
    effectIds,
    eventSourceIds,
    triggered,
    variableHandles,
    runRequest,
    getEffect,
    serveStaticView,
    serveThemeCss,
    completeGeneration,
  };
}

describe("script manifest", () => {
  it("reports name, version, and Firebot major version", async () => {
    const manifest = await script.getScriptManifest();
    expect(manifest.name).toBe("Stream-End Gratitude, Farewells & Credits");
    expect(manifest.version).toBe("0.2.0");
    expect(manifest.firebotVersion).toBe("5");
  });

  it("defaults to enabled", () => {
    expect(script.getDefaultParameters().enabled.default).toBe(true);
  });

  it("defaults the web server host to localhost", () => {
    expect(script.getDefaultParameters().webServerHost.default).toBe("localhost");
  });

  it("defaults custom css to empty", () => {
    expect(script.getDefaultParameters().customCss.default).toBe("");
  });

  it("defaults the credits title and tagline to empty", () => {
    expect(script.getDefaultParameters().showTitle.default).toBe("");
    expect(script.getDefaultParameters().titleTagline.default).toBe("");
  });

  it("defaults the animation timing to the film-look constants", () => {
    expect(script.getDefaultParameters().scrollPxPerSecond.default).toBe(70);
    expect(script.getDefaultParameters().slideSeconds.default).toBe(5);
  });
});

describe("script.run", () => {
  it("registers the credits view route when enabled", () => {
    const { routeMeta, runRequest } = makeRunRequest(true);

    script.run(runRequest);

    expect(routeMeta()).toContainEqual({
      prefix: CREDITS_ROUTE_PREFIX,
      route: STATIC_VIEW_ROUTE,
      method: "GET",
    });
  });

  it("registers the Register event effect when enabled", () => {
    const { effectIds, runRequest } = makeRunRequest(true);

    script.run(runRequest);

    expect(effectIds).toContain(REGISTER_EVENT_EFFECT_ID);
  });

  it("applies the Custom CSS parameter to the served theme stylesheet", async () => {
    const custom = ".credit { color: rebeccapurple; }";
    const { runRequest, serveThemeCss } = makeRunRequest(true, custom);

    script.run(runRequest);

    expect(await serveThemeCss()).toContain(custom);
  });

  it("registers the Credits Ended event source when enabled", () => {
    const { eventSourceIds, runRequest } = makeRunRequest(true);

    script.run(runRequest);

    expect(eventSourceIds).toContain("stream-end-credits");
  });

  it("fires Credits Ended when a generation completion is signalled", async () => {
    const { triggered, runRequest, completeGeneration } = makeRunRequest(true);

    script.run(runRequest);
    await completeGeneration("gen-9");

    expect(triggered).toContainEqual({
      sourceId: "stream-end-credits",
      eventId: "credits-ended",
      meta: { generationId: "gen-9" },
    });
  });

  it("registers the gratitude summary replace variable when enabled", () => {
    const { variableHandles, runRequest } = makeRunRequest(true);

    script.run(runRequest);

    expect(variableHandles).toContain("gratitudeSummary");
  });

  it("reflects the live store at /view — Register shows up, Clear empties it (no Generate needed)", async () => {
    const h = makeRunRequest(true);
    script.run(h.runRequest);

    await h.getEffect(REGISTER_MANUAL_EFFECT_ID).onTriggerEvent({
      effect: { creditType: "follow", username: "alice" },
    });
    expect((await h.serveStaticView()).body).toContain("alice");

    // The reported bug: Clear empties the store but the /view URL still showed the credits.
    await h.getEffect(CLEAR_CREDITS_EFFECT_ID).onTriggerEvent({ effect: {} });
    expect((await h.serveStaticView()).body).not.toContain("alice");
  });

  it("sends a no-store cache header on /view so refreshes are never stale", async () => {
    const h = makeRunRequest(true);
    script.run(h.runRequest);

    const { headers } = await h.serveStaticView();
    expect(headers["Cache-Control"]).toMatch(/no-store/);
  });

  it("does not register routes or effects when disabled", () => {
    const { routeMeta, effectIds, runRequest } = makeRunRequest(false);

    script.run(runRequest);

    expect(routeMeta()).toHaveLength(0);
    expect(effectIds).toHaveLength(0);
  });
});
