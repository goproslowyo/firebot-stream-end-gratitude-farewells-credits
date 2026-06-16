import { CreditStore } from "../credits/store";
import { buildRegisterManualEffect } from "./register-manual";

type Effect = ReturnType<typeof buildRegisterManualEffect>;
type Model = { creditType: string; username: string; amount?: number | string };

function fire(effect: Effect, model: Model) {
  const event = {
    effect: model,
    trigger: { type: "manual", metadata: {} },
    sendDataToOverlay: jest.fn(),
    abortSignal: new AbortController().signal,
  } as unknown as Parameters<Effect["onTriggerEvent"]>[0];
  return effect.onTriggerEvent(event);
}

describe("Register event manually effect", () => {
  it("has a scripting-category effect definition with a stable id", () => {
    const effect = buildRegisterManualEffect(new CreditStore());
    expect(effect.definition.id).toBe("stream-end-credits:register-manual");
    expect(effect.definition.categories).toContain("scripting");
  });

  it("adds a credit of an explicit built-in type", async () => {
    const store = new CreditStore();
    await fire(buildRegisterManualEffect(store), { creditType: "sub", username: "alice" });
    expect(store.snapshot()).toEqual([{ type: "sub", username: "alice" }]);
  });

  it("adds a credit of a user-defined custom type with an amount", async () => {
    const store = new CreditStore();
    await fire(buildRegisterManualEffect(store), {
      creditType: "art",
      username: "bob",
      amount: 3,
    });
    expect(store.snapshot()).toEqual([{ type: "art", username: "bob", amount: 3 }]);
  });

  it("coerces a string amount to a number", async () => {
    const store = new CreditStore();
    await fire(buildRegisterManualEffect(store), {
      creditType: "cheer",
      username: "carol",
      amount: "500",
    });
    expect(store.snapshot()).toEqual([{ type: "cheer", username: "carol", amount: 500 }]);
  });

  it("adds nothing when username or credit type is blank", async () => {
    const store = new CreditStore();
    const effect = buildRegisterManualEffect(store);
    await fire(effect, { creditType: "sub", username: "   " });
    await fire(effect, { creditType: "", username: "dave" });
    expect(store.snapshot()).toEqual([]);
  });
});
