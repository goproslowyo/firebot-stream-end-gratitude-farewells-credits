import { CreditStore } from "../credits/store";
import { BUILT_IN_CREDIT_TYPES } from "../credits/types";
import { buildRegisterEventEffect } from "./register-event";

type Effect = ReturnType<typeof buildRegisterEventEffect>;
type TriggerEvent = Parameters<Effect["onTriggerEvent"]>[0];

function fire(effect: Effect, model: { creditType: string }, metadata: Record<string, unknown>) {
  const event = {
    effect: model,
    trigger: { type: "event", metadata },
    sendDataToOverlay: jest.fn(),
    abortSignal: new AbortController().signal,
  } as unknown as TriggerEvent;
  return effect.onTriggerEvent(event);
}

describe("Register event effect (automatic)", () => {
  it("has a scripting-category effect definition with a stable id", () => {
    const effect = buildRegisterEventEffect(new CreditStore());
    expect(effect.definition.id).toBe("stream-end-credits:register-event");
    expect(effect.definition.categories).toContain("scripting");
  });

  it("builds the credit-type dropdown statically (no Angular controller / ng-repeat)", () => {
    const effect = buildRegisterEventEffect(new CreditStore());
    for (const type of BUILT_IN_CREDIT_TYPES) {
      expect(effect.optionsTemplate).toContain(`<option value="${type}">`);
    }
    expect(effect.optionsTemplate).not.toContain("ng-repeat");
    expect(effect.optionsController).toBeUndefined();
  });

  it("adds a credit derived from the attached event's eventData", async () => {
    const store = new CreditStore();
    const effect = buildRegisterEventEffect(store);

    await fire(effect, { creditType: "cheer" }, { eventData: { username: "erin", bits: 250 } });

    expect(store.snapshot()).toEqual([{ type: "cheer", username: "erin", amount: 250 }]);
  });

  it("falls back to trigger.metadata.username when eventData omits it", async () => {
    const store = new CreditStore();
    const effect = buildRegisterEventEffect(store);

    await fire(effect, { creditType: "follow" }, { username: "alice", eventData: {} });

    expect(store.snapshot()).toEqual([{ type: "follow", username: "alice" }]);
  });

  it("adds nothing when no username can be attributed", async () => {
    const store = new CreditStore();
    const effect = buildRegisterEventEffect(store);

    await fire(effect, { creditType: "follow" }, {});

    expect(store.snapshot()).toEqual([]);
  });
});
