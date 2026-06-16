import { CreditStore } from "./store";

describe("CreditStore", () => {
  it("starts empty", () => {
    expect(new CreditStore().snapshot()).toEqual([]);
  });

  it("records an added credit", () => {
    const store = new CreditStore();
    store.addCredit({ type: "follow", username: "Alice" });
    expect(store.snapshot()).toEqual([{ type: "follow", username: "Alice" }]);
  });

  it("dedupes by type + case-insensitive username, keeping first-seen casing", () => {
    const store = new CreditStore();
    store.addCredit({ type: "follow", username: "Alice" });
    store.addCredit({ type: "follow", username: "alice" });
    expect(store.snapshot()).toEqual([{ type: "follow", username: "Alice" }]);
  });

  it("keeps credits of different types for the same user separate", () => {
    const store = new CreditStore();
    store.addCredit({ type: "follow", username: "alice" });
    store.addCredit({ type: "sub", username: "alice" });
    expect(store.snapshot()).toHaveLength(2);
  });

  it("accumulates amounts for repeat credits of the same type + user", () => {
    const store = new CreditStore();
    store.addCredit({ type: "cheer", username: "bob", amount: 100 });
    store.addCredit({ type: "cheer", username: "bob", amount: 50 });
    expect(store.snapshot()).toEqual([{ type: "cheer", username: "bob", amount: 150 }]);
  });

  it("clear() empties the store", () => {
    const store = new CreditStore();
    store.addCredit({ type: "raid", username: "carol", amount: 12 });
    store.clear();
    expect(store.snapshot()).toEqual([]);
  });

  it("snapshot returns a copy that does not mutate the store", () => {
    const store = new CreditStore();
    store.addCredit({ type: "follow", username: "alice" });
    const snap = store.snapshot();
    snap.push({ type: "follow", username: "intruder" });
    expect(store.snapshot()).toHaveLength(1);
  });
});
