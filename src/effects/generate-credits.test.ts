import type { ScriptModules } from "@crowbartools/firebot-custom-scripts-types";
import { CreditStore } from "../credits/store";
import { CreditsServer, GENERATION_ID_PARAM, GENERATION_VIEW_ROUTE_FILE } from "../server/server";
import { buildGenerateCreditsEffect } from "./generate-credits";

type RouteCb = (req: { params?: Record<string, string> }, res: FakeRes) => void | Promise<void>;
type FakeRes = {
  headers: Record<string, string>;
  statusCode: number;
  body?: string;
  set(f: string, v: string): FakeRes;
  status(c: number): FakeRes;
  send(b: string): FakeRes;
};

function makeRes(): FakeRes {
  return {
    headers: {},
    statusCode: 200,
    set(f, v) {
      this.headers[f] = v;
      return this;
    },
    status(c) {
      this.statusCode = c;
      return this;
    },
    send(b) {
      this.body = b;
      return this;
    },
  };
}

function makeServer(idFactory: () => string) {
  const routes: Array<{ route: string; cb: RouteCb }> = [];
  const httpServer = {
    registerCustomRoute(_p: string, route: string, _m: string, cb: RouteCb) {
      routes.push({ route, cb });
      return true;
    },
    unregisterCustomRoute: () => true,
  } as unknown as ScriptModules["httpServer"];
  const logger = { debug: jest.fn(), info: jest.fn(), warn: jest.fn(), error: jest.fn() };
  const server = new CreditsServer(httpServer, logger as unknown as ScriptModules["logger"], {
    host: "10.0.0.5",
    idFactory,
  });
  server.start();
  const gen = routes.find(
    (r) => r.route === `:${GENERATION_ID_PARAM}/${GENERATION_VIEW_ROUTE_FILE}`,
  );
  return {
    server,
    async serve(id: string): Promise<FakeRes> {
      const res = makeRes();
      await gen?.cb({ params: { [GENERATION_ID_PARAM]: id } }, res);
      return res;
    },
  };
}

type Effect = ReturnType<typeof buildGenerateCreditsEffect>;

async function fire(effect: Effect, model: { mode?: string } = {}) {
  const event = {
    effect: model,
    trigger: { type: "manual", metadata: {} },
    sendDataToOverlay: jest.fn(),
    abortSignal: new AbortController().signal,
  } as unknown as Parameters<Effect["onTriggerEvent"]>[0];
  return (await effect.onTriggerEvent(event)) as {
    success: boolean;
    outputs: { creditsUrl: string };
  };
}

describe("Generate credits effect", () => {
  it("defines a scripting effect with a Credits URL output", () => {
    const effect = buildGenerateCreditsEffect(new CreditStore(), makeServer(() => "g").server);
    expect(effect.definition.id).toBe("stream-end-credits:generate-credits");
    expect(effect.definition.categories).toContain("scripting");
    expect(effect.definition.outputs?.[0]?.defaultName).toBe("creditsUrl");
  });

  it("outputs the OBS-ready credits URL for the generated view", async () => {
    const store = new CreditStore();
    store.addCredit({ type: "follow", username: "alice" });
    const { server } = makeServer(() => "gen-1");
    const effect = buildGenerateCreditsEffect(store, server);

    const result = await fire(effect);

    expect(result.success).toBe(true);
    expect(result.outputs.creditsUrl).toBe(server.generationUrl("gen-1"));
  });

  it("serves a view reflecting the store, grouped into titled blocks", async () => {
    const store = new CreditStore();
    store.addCredit({ type: "follow", username: "alice" });
    store.addCredit({ type: "cheer", username: "bob", amount: 100 });
    const harness = makeServer(() => "gen-1");
    const effect = buildGenerateCreditsEffect(store, harness.server);

    await fire(effect);
    const res = await harness.serve("gen-1");

    expect(res.statusCode).toBe(200);
    expect(res.body).toContain("Followers");
    expect(res.body).toContain("alice");
    expect(res.body).toContain("Cheers");
    expect(res.body).toContain("bob");
  });

  it("omits blocks for types with zero credits", async () => {
    const store = new CreditStore();
    store.addCredit({ type: "follow", username: "alice" });
    const harness = makeServer(() => "gen-1");
    const effect = buildGenerateCreditsEffect(store, harness.server);

    await fire(effect);
    const res = await harness.serve("gen-1");

    expect(res.body).toContain("Followers");
    expect(res.body).not.toContain("Subscribers");
  });

  it("frames the served view with the film flourish cards", async () => {
    const store = new CreditStore();
    store.addCredit({ type: "follow", username: "alice" });
    const harness = makeServer(() => "gen-1");
    const effect = buildGenerateCreditsEffect(store, harness.server);

    await fire(effect);
    const res = await harness.serve("gen-1");

    expect(res.body).toContain("flourish--intro");
    expect(res.body).toContain("The End");
  });

  it("renders the configured title-card text from the server", async () => {
    const store = new CreditStore();
    store.addCredit({ type: "follow", username: "alice" });
    const harness = makeServer(() => "gen-1");
    harness.server.setFilmTitle({ studio: "Steve and Friends", tagline: "thanks for tuning in" });
    const effect = buildGenerateCreditsEffect(store, harness.server);

    await fire(effect);
    const res = await harness.serve("gen-1");

    expect(res.body).toContain("Steve and Friends");
    expect(res.body).toContain("thanks for tuning in");
  });

  it("renders the configured animation timing from the server", async () => {
    const store = new CreditStore();
    store.addCredit({ type: "follow", username: "alice" });
    const harness = makeServer(() => "gen-1");
    harness.server.setTiming({ scrollPxPerSecond: 120, slideSeconds: 8 });
    const effect = buildGenerateCreditsEffect(store, harness.server);

    await fire(effect);
    const res = await harness.serve("gen-1");

    expect(res.body).toContain('data-scroll-speed="120"');
    expect(res.body).toContain('data-slide-seconds="8"');
  });
});
