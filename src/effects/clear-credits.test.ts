import { CreditStore } from "../credits/store";
import { buildClearCreditsEffect } from "./clear-credits";

type Effect = ReturnType<typeof buildClearCreditsEffect>;

function fire(effect: Effect) {
  const event = {
    effect: {},
    trigger: { type: "manual", metadata: {} },
    sendDataToOverlay: jest.fn(),
    abortSignal: new AbortController().signal,
  } as unknown as Parameters<Effect["onTriggerEvent"]>[0];
  return effect.onTriggerEvent(event);
}

describe("Clear credits effect", () => {
  it("has a scripting-category effect definition with a stable id", () => {
    const effect = buildClearCreditsEffect(new CreditStore());
    expect(effect.definition.id).toBe("stream-end-credits:clear-credits");
    expect(effect.definition.categories).toContain("scripting");
  });

  it("empties the credit store when triggered", async () => {
    const store = new CreditStore();
    store.addCredit({ type: "follow", username: "alice" });
    store.addCredit({ type: "cheer", username: "bob", amount: 100 });

    await fire(buildClearCreditsEffect(store));

    expect(store.snapshot()).toEqual([]);
  });
});
