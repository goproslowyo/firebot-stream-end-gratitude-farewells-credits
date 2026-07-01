import type { ScriptModules } from "@crowbartools/firebot-custom-scripts-types";
import { toAmount } from "../credits/coerce";
import { type BuiltInCreditType, type Credit, isBuiltInCreditType } from "../credits/types";
import { type CreditsBlock, buildCreditsModel } from "../view/model";

export const GRATITUDE_SUMMARY_HANDLE = "gratitudeSummary";

/** Default number of names listed per type before truncation. */
export const DEFAULT_MAX_NAMES = 5;

type ReplaceVariable = Parameters<
  ScriptModules["replaceVariableManager"]["registerReplaceVariable"]
>[0];

export interface GratitudeSummaryOptions {
  includeNames: boolean;
  maxNames: number;
}

/**
 * Build the gratitude summary string from a store snapshot: per-type counts, or top-N
 * names with "…and X more" truncation. Empty types are omitted (the model already drops them).
 */
export function formatGratitudeSummary(
  credits: Credit[],
  options: GratitudeSummaryOptions,
): string {
  const { blocks } = buildCreditsModel(credits);
  if (blocks.length === 0) {
    return "";
  }

  if (!options.includeNames) {
    return blocks.map((block) => `${block.title}: ${block.credits.length}`).join(", ");
  }

  const cap = Math.max(0, options.maxNames);
  return blocks
    .map((block) => {
      const names = block.credits.map((credit) => credit.username);
      const shown = names.slice(0, cap);
      const extra = names.length - shown.length;
      const list = extra > 0 ? `${shown.join(", ")}, …and ${extra} more` : shown.join(", ");
      return `${block.title}: ${list}`;
    })
    .join("\n");
}

/** Warm opening line for the Discord gratitude post. Tasteful default; adjustable here. */
export const GRATITUDE_DISCORD_HEADER = "💜 **Thank you to everyone who showed up today!**";

interface DiscordStyle {
  emoji: string;
  label: string;
  /** Singular unit for amount-bearing types (pluralized by count). Absent → list names only. */
  unit?: string;
}

/** Per-type emoji/label/unit for the Discord post. Ordering comes from the model. */
const DISCORD_STYLES: Record<BuiltInCreditType, DiscordStyle> = {
  mod: { emoji: "🛡️", label: "Moderators" },
  vip: { emoji: "💎", label: "VIPs" },
  follow: { emoji: "👋", label: "New followers" },
  sub: { emoji: "⭐", label: "New subs" },
  cheer: { emoji: "🎉", label: "Cheers", unit: "bit" },
  "gift-sub": { emoji: "🎁", label: "Gift subs", unit: "sub" },
  "watch-streak": { emoji: "🔥", label: "Watch streaks", unit: "stream" },
  raid: { emoji: "🚀", label: "Raids", unit: "viewer" },
};

function styleFor(block: CreditsBlock): DiscordStyle {
  if (isBuiltInCreditType(block.type)) {
    return DISCORD_STYLES[block.type];
  }
  // Custom credit type: a generic flourish with the block's own title.
  return { emoji: "✨", label: block.title };
}

function pluralize(count: number, singular: string): string {
  return `${count} ${singular}${count === 1 ? "" : "s"}`;
}

/**
 * Escape Discord markdown so usernames render literally — e.g. `holms_b` / `orbitalgun__` keep their
 * underscores instead of being italicized/underlined. Twitch names are `[A-Za-z0-9_]`, but manual and
 * custom credits can hold anything, so we escape the whole inline-formatting set (backslash first).
 */
function escapeDiscordMarkdown(text: string): string {
  return text.replace(/([\\*_~`|])/g, "\\$1");
}

/** One Discord section line: `<emoji> **<label>:** name, **name** (amount), …and N more`. */
function discordLine(block: CreditsBlock, cap: number): string {
  const style = styleFor(block);
  const entries = block.credits.map((credit) => {
    const name = escapeDiscordMarkdown(credit.username);
    if (credit.amount === undefined) {
      return name;
    }
    const qty = style.unit ? pluralize(credit.amount, style.unit) : String(credit.amount);
    return `**${name}** (${qty})`;
  });
  const shown = entries.slice(0, cap);
  const extra = entries.length - shown.length;
  const list = extra > 0 ? `${shown.join(", ")}, …and ${extra} more` : shown.join(", ");
  return `${style.emoji} **${style.label}:** ${list}`;
}

/**
 * Build the richer Discord gratitude post: a warm header followed by one emoji section
 * per present **credit type**, surfacing amounts where they exist (bits/gifted subs/raid viewers),
 * names capped with "…and X more". Sections and within-section names follow the **gratitude
 * crescendo**, since this reuses `buildCreditsModel`. Empty store → empty string.
 */
export function formatGratitudeDiscord(credits: Credit[], options: { maxNames: number }): string {
  const { blocks } = buildCreditsModel(credits);
  if (blocks.length === 0) {
    return "";
  }
  const cap = Math.max(0, options.maxNames);
  return [GRATITUDE_DISCORD_HEADER, ...blocks.map((block) => discordLine(block, cap))].join("\n");
}

/**
 * Resolve the names-cap argument: a number caps the list, the keyword **`all`** lists everyone (no
 * `…and X more`), and anything else falls back to the default cap.
 */
function parseMaxNames(arg: unknown): number {
  if (typeof arg === "string" && arg.trim().toLowerCase() === "all") {
    return Number.POSITIVE_INFINITY;
  }
  return toAmount(arg) ?? DEFAULT_MAX_NAMES;
}

/**
 * The `$gratitudeSummary` replace variable for the Discord gratitude post.
 * Usage: `$gratitudeSummary` (counts only), `$gratitudeSummary[names]` (top-N names),
 * `$gratitudeSummary[names, 3]` (cap the list at 3), `$gratitudeSummary[discord]` (rich Discord post
 * with emoji sections + amounts; `$gratitudeSummary[discord, 3]` caps each section at 3). Use
 * **`all`** as the cap to thank everyone with no truncation, e.g. `$gratitudeSummary[discord, all]`.
 */
export function buildGratitudeSummaryVariable(store: {
  snapshot(): Credit[];
}): ReplaceVariable {
  return {
    definition: {
      handle: GRATITUDE_SUMMARY_HANDLE,
      description:
        "Summary of this session's credits for a gratitude post. Args: [names] to list names, [names, N] to cap the list (or [names, all] for everyone), [discord] for a rich Discord post with emoji sections + amounts ([discord, N] to cap, [discord, all] to thank everyone).",
      possibleDataOutput: ["text"],
    },
    evaluator: (_trigger, ...args: unknown[]): string => {
      const mode = String(args[0] ?? "").toLowerCase();
      const maxNames = parseMaxNames(args[1]);
      if (mode === "discord") {
        return formatGratitudeDiscord(store.snapshot(), { maxNames });
      }
      return formatGratitudeSummary(store.snapshot(), { includeNames: mode === "names", maxNames });
    },
  };
}
