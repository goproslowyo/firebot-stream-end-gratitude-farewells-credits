import { CreditStore } from "../credits/store";
import type { Credit } from "../credits/types";
import {
  GRATITUDE_DISCORD_HEADER,
  GRATITUDE_SUMMARY_HANDLE,
  buildGratitudeSummaryVariable,
  formatGratitudeDiscord,
  formatGratitudeSummary,
} from "./gratitude-summary";

type Variable = ReturnType<typeof buildGratitudeSummaryVariable>;
const trigger = {} as Parameters<Variable["evaluator"]>[0];

function evaluate(store: CreditStore, ...args: unknown[]): string {
  const variable = buildGratitudeSummaryVariable(store);
  return variable.evaluator(trigger, ...args) as string;
}

describe("formatGratitudeSummary", () => {
  it("returns an empty string for an empty store", () => {
    expect(formatGratitudeSummary([], { includeNames: false, maxNames: 5 })).toBe("");
  });

  it("counts-only: one segment per type, empty types omitted", () => {
    const credits: Credit[] = [
      { type: "follow", username: "alice" },
      { type: "follow", username: "bob" },
      { type: "sub", username: "carol" },
    ];
    expect(formatGratitudeSummary(credits, { includeNames: false, maxNames: 5 })).toBe(
      "Followers: 2, Subscribers: 1",
    );
  });

  it("names: lists names per type", () => {
    const credits: Credit[] = [
      { type: "follow", username: "alice" },
      { type: "follow", username: "bob" },
    ];
    expect(formatGratitudeSummary(credits, { includeNames: true, maxNames: 5 })).toBe(
      "Followers: alice, bob",
    );
  });

  it("names: truncates with “…and X more” past the cap", () => {
    const credits: Credit[] = ["a", "b", "c", "d"].map((u) => ({ type: "follow", username: u }));
    expect(formatGratitudeSummary(credits, { includeNames: true, maxNames: 2 })).toBe(
      "Followers: a, b, …and 2 more",
    );
  });
});

describe("formatGratitudeDiscord", () => {
  it("returns an empty string for an empty store", () => {
    expect(formatGratitudeDiscord([], { maxNames: 5 })).toBe("");
  });

  it("emits a warm header + per-type emoji sections with amounts, in crescendo order", () => {
    const credits: Credit[] = [
      { type: "follow", username: "alice" },
      { type: "follow", username: "bob" },
      { type: "cheer", username: "carol", amount: 500 },
      { type: "gift-sub", username: "dave", amount: 10 },
      { type: "raid", username: "erin", amount: 200 },
    ];
    expect(formatGratitudeDiscord(credits, { maxNames: 5 })).toBe(
      [
        GRATITUDE_DISCORD_HEADER,
        "👋 **New followers:** alice, bob",
        "🎉 **Cheers:** **carol** (500 bits)",
        "🎁 **Gift subs:** **dave** (10 subs)",
        "🚀 **Raids:** **erin** (200 viewers)",
      ].join("\n"),
    );
  });

  it("pluralizes singular amounts", () => {
    const credits: Credit[] = [
      { type: "gift-sub", username: "g", amount: 1 },
      { type: "raid", username: "r", amount: 1 },
    ];
    const out = formatGratitudeDiscord(credits, { maxNames: 5 });
    expect(out).toContain("**g** (1 sub)");
    expect(out).toContain("**r** (1 viewer)");
  });

  it("lists the biggest contributors first within a section", () => {
    const credits: Credit[] = [
      { type: "cheer", username: "small", amount: 100 },
      { type: "cheer", username: "big", amount: 250 },
    ];
    expect(formatGratitudeDiscord(credits, { maxNames: 5 })).toContain(
      "🎉 **Cheers:** **big** (250 bits), **small** (100 bits)",
    );
  });

  it("caps each section with “…and X more”", () => {
    const credits: Credit[] = ["a", "b", "c", "d"].map((u) => ({ type: "follow", username: u }));
    expect(formatGratitudeDiscord(credits, { maxNames: 2 })).toContain(
      "👋 **New followers:** a, b, …and 2 more",
    );
  });

  it("escapes Discord markdown in usernames so underscores survive", () => {
    const credits: Credit[] = [
      { type: "follow", username: "holms_b" },
      { type: "gift-sub", username: "orbitalgun__", amount: 5 },
    ];
    const out = formatGratitudeDiscord(credits, { maxNames: 5 });
    expect(out).toContain("👋 **New followers:** holms\\_b");
    expect(out).toContain("🎁 **Gift subs:** **orbitalgun\\_\\_** (5 subs)");
    // The raw (unescaped) underscores must not appear — that is the Discord-mangling bug.
    expect(out).not.toContain("holms_b");
    expect(out).not.toContain("orbitalgun__");
  });
});

describe("$gratitudeSummary variable", () => {
  it("defines the expected handle and text output", () => {
    const variable = buildGratitudeSummaryVariable(new CreditStore());
    expect(variable.definition.handle).toBe(GRATITUDE_SUMMARY_HANDLE);
    expect(variable.definition.possibleDataOutput).toContain("text");
  });

  it("defaults to counts-only from the current store", () => {
    const store = new CreditStore();
    store.addCredit({ type: "follow", username: "alice" });
    store.addCredit({ type: "cheer", username: "bob", amount: 100 });
    expect(evaluate(store)).toBe("Followers: 1, Cheers: 1");
  });

  it("includes names when called with the names argument", () => {
    const store = new CreditStore();
    store.addCredit({ type: "follow", username: "alice" });
    store.addCredit({ type: "follow", username: "bob" });
    expect(evaluate(store, "names")).toBe("Followers: alice, bob");
  });

  it("honours a numeric truncation cap argument", () => {
    const store = new CreditStore();
    for (const u of ["a", "b", "c"]) {
      store.addCredit({ type: "follow", username: u });
    }
    expect(evaluate(store, "names", "1")).toBe("Followers: a, …and 2 more");
  });

  it("emits the rich Discord post with the discord argument", () => {
    const store = new CreditStore();
    store.addCredit({ type: "follow", username: "alice" });
    store.addCredit({ type: "raid", username: "bob", amount: 50 });
    const out = evaluate(store, "discord");
    expect(out).toContain(GRATITUDE_DISCORD_HEADER);
    expect(out).toContain("👋 **New followers:** alice");
    expect(out).toContain("🚀 **Raids:** **bob** (50 viewers)");
  });

  it("caps Discord sections with a numeric argument", () => {
    const store = new CreditStore();
    for (const u of ["a", "b", "c"]) {
      store.addCredit({ type: "follow", username: u });
    }
    expect(evaluate(store, "discord", "1")).toContain("👋 **New followers:** a, …and 2 more");
  });

  it("lists everyone in Discord mode with the 'all' cap (no truncation)", () => {
    const store = new CreditStore();
    for (const u of ["a", "b", "c", "d", "e", "f"]) {
      store.addCredit({ type: "follow", username: u });
    }
    const out = evaluate(store, "discord", "all");
    expect(out).toContain("👋 **New followers:** a, b, c, d, e, f");
    expect(out).not.toContain("more");
  });

  it("lists everyone in names mode with the 'all' cap", () => {
    const store = new CreditStore();
    for (const u of ["a", "b", "c", "d", "e", "f"]) {
      store.addCredit({ type: "follow", username: u });
    }
    expect(evaluate(store, "names", "all")).toBe("Followers: a, b, c, d, e, f");
  });
});
