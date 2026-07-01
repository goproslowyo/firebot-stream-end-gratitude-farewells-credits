import type { Credit } from "../credits/types";
import { buildCreditsModel } from "./model";

describe("buildCreditsModel", () => {
  it("returns no blocks for an empty store", () => {
    expect(buildCreditsModel([])).toEqual({ blocks: [] });
  });

  it("groups credits into one titled block per present type", () => {
    const credits: Credit[] = [
      { type: "follow", username: "alice" },
      { type: "follow", username: "bob" },
      { type: "sub", username: "carol" },
    ];
    const model = buildCreditsModel(credits);
    expect(model.blocks).toEqual([
      { type: "sub", title: "Subscribers", credits: [{ type: "sub", username: "carol" }] },
      {
        type: "follow",
        title: "Followers",
        credits: [
          { type: "follow", username: "alice" },
          { type: "follow", username: "bob" },
        ],
      },
    ]);
  });

  it("omits types that have zero credits", () => {
    const model = buildCreditsModel([{ type: "raid", username: "dave", amount: 5 }]);
    expect(model.blocks.map((b) => b.type)).toEqual(["raid"]);
  });

  it("orders built-in blocks as the gratitude crescendo regardless of insertion order", () => {
    const credits: Credit[] = [
      { type: "raid", username: "r", amount: 10 },
      { type: "follow", username: "f" },
      { type: "vip", username: "v" },
      { type: "mod", username: "m" },
      { type: "gift-sub", username: "g", amount: 2 },
    ];
    // Team (mod, vip) → contributions build → follow welcomes the newest → raid finale.
    expect(buildCreditsModel(credits).blocks.map((b) => b.type)).toEqual([
      "mod",
      "vip",
      "gift-sub",
      "follow",
      "raid",
    ]);
  });

  it("places Watch Streaks after gift-sub and before follow, sorted by streak desc", () => {
    const credits: Credit[] = [
      { type: "follow", username: "newbie" },
      { type: "watch-streak", username: "loyalLow", amount: 3 },
      { type: "watch-streak", username: "loyalHigh", amount: 30 },
      { type: "gift-sub", username: "gifter", amount: 5 },
    ];
    const model = buildCreditsModel(credits);
    expect(model.blocks.map((b) => ({ type: b.type, title: b.title }))).toEqual([
      { type: "gift-sub", title: "Gift Subs" },
      { type: "watch-streak", title: "Watch Streaks" },
      { type: "follow", title: "Followers" },
    ]);
    expect(model.blocks[1].credits.map((c) => c.username)).toEqual(["loyalHigh", "loyalLow"]);
  });

  it("places custom types after built-ins but before the raid finale, first-seen order", () => {
    const credits: Credit[] = [
      { type: "raid", username: "r", amount: 5 },
      { type: "art-share", username: "x" },
      { type: "follow", username: "f" },
      { type: "raid_train", username: "y" },
    ];
    const model = buildCreditsModel(credits);
    expect(model.blocks.map((b) => ({ type: b.type, title: b.title }))).toEqual([
      { type: "follow", title: "Followers" },
      { type: "art-share", title: "Art Share" },
      { type: "raid_train", title: "Raid Train" },
      { type: "raid", title: "Raids" },
    ]);
  });

  it("sorts credits within a block biggest-first, stable for ties and amount-less types", () => {
    const credits: Credit[] = [
      { type: "cheer", username: "small", amount: 1 },
      { type: "cheer", username: "big", amount: 250 },
      { type: "cheer", username: "tieA", amount: 100 },
      { type: "cheer", username: "tieB", amount: 100 },
    ];
    expect(buildCreditsModel(credits).blocks[0].credits.map((c) => c.username)).toEqual([
      "big",
      "tieA",
      "tieB",
      "small",
    ]);
  });

  it("keeps arrival order within an amount-less block", () => {
    const credits: Credit[] = [
      { type: "follow", username: "alice" },
      { type: "follow", username: "bob" },
      { type: "follow", username: "carol" },
    ];
    expect(buildCreditsModel(credits).blocks[0].credits.map((c) => c.username)).toEqual([
      "alice",
      "bob",
      "carol",
    ]);
  });
});
