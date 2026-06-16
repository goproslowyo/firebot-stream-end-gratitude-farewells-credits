import { extractCredit } from "./extract";

describe("extractCredit", () => {
  it("follow: reads the follower's username, no amount", () => {
    expect(extractCredit("follow", { username: "alice" })).toEqual({
      type: "follow",
      username: "alice",
    });
  });

  it("sub: reads the subscriber's username, no amount", () => {
    expect(extractCredit("sub", { username: "bob" })).toEqual({ type: "sub", username: "bob" });
  });

  it("gift-sub: credits the gifter with the number of subs gifted", () => {
    expect(extractCredit("gift-sub", { gifterUsername: "carol", subCount: 5 })).toEqual({
      type: "gift-sub",
      username: "carol",
      amount: 5,
    });
  });

  it("gift-sub: falls back to username and a count of 1", () => {
    expect(extractCredit("gift-sub", { username: "dave" })).toEqual({
      type: "gift-sub",
      username: "dave",
      amount: 1,
    });
  });

  // community-subs-gifted carries both gifterUsername (display) and username (login); prefer display.
  it("gift-sub: prefers the gifter's display name over the login", () => {
    expect(
      extractCredit("gift-sub", { gifterUsername: "Carol", username: "carol_login", subCount: 3 }),
    ).toEqual({ type: "gift-sub", username: "Carol", amount: 3 });
  });

  // A single subs-gifted has no subCount, so the gift counts as 1.
  it("gift-sub: a single gift (no subCount) counts as 1", () => {
    expect(extractCredit("gift-sub", { gifterUsername: "Carol" })).toEqual({
      type: "gift-sub",
      username: "Carol",
      amount: 1,
    });
  });

  it("cheer: reads username and bits", () => {
    expect(extractCredit("cheer", { username: "erin", bits: 250 })).toEqual({
      type: "cheer",
      username: "erin",
      amount: 250,
    });
  });

  it("raid: reads the raider's username and viewer count", () => {
    expect(extractCredit("raid", { username: "frank", viewerCount: 42 })).toEqual({
      type: "raid",
      username: "frank",
      amount: 42,
    });
  });

  it("mod: reads username, no amount", () => {
    expect(extractCredit("mod", { username: "grace" })).toEqual({ type: "mod", username: "grace" });
  });

  it("vip: reads username, no amount", () => {
    expect(extractCredit("vip", { username: "heidi" })).toEqual({ type: "vip", username: "heidi" });
  });

  it("returns null when no username is present", () => {
    expect(extractCredit("follow", {})).toBeNull();
  });

  it("coerces numeric strings in amount fields", () => {
    expect(extractCredit("cheer", { username: "ivan", bits: "100" })).toEqual({
      type: "cheer",
      username: "ivan",
      amount: 100,
    });
  });
});
