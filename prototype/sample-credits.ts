/**
 * PROTOTYPE — realistic sample dataset for the theme preview harness.
 * Intent: every built-in credit type present, one custom type ("clip-of-the-night"),
 * deliberately shuffled amounts (so the amount-descending sort is visible), an
 * underscore-heavy handle, and a near-25-char username to test wrapping. 62 credits
 * total — a substantial ~90s crawl at the default 70 px/s.
 */
import type { Credit } from "../src/credits/types";

const mods: Credit[] = ["MossyToad", "ByteBarista", "GlitchWitch_TTV", "holms_b"].map(
  (username) => ({ type: "mod", username }),
);

const vips: Credit[] = [
  "PixelPeach",
  "TheDuchessOfDoom",
  "ok_computer_ok",
  "NoScopeNana",
  "VelvetThunder22",
].map((username) => ({ type: "vip", username }));

const subs: Credit[] = [
  "QuietRiotGrrl",
  "DadSpaghetti",
  "LoreKeeperLevi",
  "xX_ShadowMage_Xx",
  "TinyCactusEnergy",
  "BeansOnToastTV",
  "capybara_cavalry",
  "JpegWarrior",
  "MildlyFeralFae",
  "StackOverflowed",
  "GhostOfTwitchPast",
  "aggressively_ok",
].map((username) => ({ type: "sub", username }));

// Shuffled arrival order on purpose — the view sorts by amount descending.
const cheers: Credit[] = [
  ["SirCheersALot", 10000],
  ["bitrate_bandit", 500],
  ["EmoteHoarder", 2500],
  ["CtrlAltDefeat", 100],
  ["LadyLagspike", 5000],
  ["prawn_to_be_wild", 300],
  ["BigMoodEnergy", 1000],
  ["sleepy_gremlin", 50],
  ["TheTipTitan", 200],
].map(([username, amount]) => ({ type: "cheer", username: username as string, amount: amount as number }));

// The two 5s verify stable tie order.
const giftSubs: Credit[] = [
  ["GiftedAndTalented", 50],
  ["SantaButSpicy", 20],
  ["community_carrier", 10],
  ["WholesomeHexes", 5],
  ["snack_provider", 5],
  ["FirstTimeGifter", 1],
].map(([username, amount]) => ({
  type: "gift-sub",
  username: username as string,
  amount: amount as number,
}));

const watchStreaks: Credit[] = [
  ["EveryDamnDay", 42],
  ["StreakFreak_", 30],
  ["calendar_goblin", 21],
  ["LoyalLlama", 14],
  ["ThirdShiftThea", 9],
  ["popcorn_witness", 5],
  ["NewHabitNina", 3],
].map(([username, amount]) => ({
  type: "watch-streak",
  username: username as string,
  amount: amount as number,
}));

const follows: Credit[] = [
  "JustLurkingThx",
  "AlgorithmSentMe",
  "ClippedByFate",
  "moth_to_the_stream",
  "HelloFromVOD",
  "Trackpad_Tactician",
  "unreasonably_here",
  "PogChampagne",
  "DialUpDreams",
  "QuesoQuest",
  "SidequestSteve",
  "RaccoonInACoat",
  "TheUnreasonablyLongName99",
  "l1minal_spaces",
  "byeface",
].map((username) => ({ type: "follow", username }));

// Custom type — verifies titleCase → "Clip Of The Night" and custom-block placement.
// Repeats usernames from other blocks on purpose (real streams do).
const clips: Credit[] = [
  { type: "clip-of-the-night", username: "ClippedByFate", amount: 1 },
  { type: "clip-of-the-night", username: "RaccoonInACoat", amount: 1 },
];

const raids: Credit[] = [
  { type: "raid", username: "BossRushBetty", amount: 412 },
  { type: "raid", username: "MidnightMarauder", amount: 87 },
];

export const SAMPLE_CREDITS: Credit[] = [
  ...mods,
  ...vips,
  ...subs,
  ...cheers,
  ...giftSubs,
  ...watchStreaks,
  ...follows,
  ...clips,
  ...raids,
];
