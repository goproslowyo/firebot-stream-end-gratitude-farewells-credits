import {
  type BuiltInCreditType,
  type Credit,
  type CreditType,
  isBuiltInCreditType,
} from "../credits/types";

/** Display titles for the built-in credit types (a block is a titled section). */
const BUILT_IN_TITLES: Record<BuiltInCreditType, string> = {
  follow: "Followers",
  sub: "Subscribers",
  "gift-sub": "Gift Subs",
  cheer: "Cheers",
  raid: "Raids",
  mod: "Moderators",
  vip: "VIPs",
};

/**
 * Display order for the built-in credit types in the **gratitude crescendo**: standing
 * regulars open, the stream's contributions build, and `raid` is always the finale — emitted last,
 * after any custom credit types. Intentionally distinct from `BUILT_IN_CREDIT_TYPES`, which stays
 * the canonical vocabulary/membership set used by the register effects and `extract.ts`.
 */
const GRATITUDE_ORDER: readonly BuiltInCreditType[] = [
  "mod",
  "vip",
  "follow",
  "sub",
  "cheer",
  "gift-sub",
];

/** The credit type that always closes the roll — the crescendo finale. */
const FINALE_TYPE: BuiltInCreditType = "raid";

/** A titled section grouping all credits of one type (a credits block). */
export interface CreditsBlock {
  type: CreditType;
  title: string;
  credits: Credit[];
}

export interface CreditsModel {
  blocks: CreditsBlock[];
}

/** Title-case a custom credit type label, e.g. `art-share` / `raid_train` → `Art Share`. */
function titleCase(type: CreditType): string {
  return type
    .split(/[-_\s]+/)
    .filter((word) => word.length > 0)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

function titleFor(type: CreditType): string {
  return BUILT_IN_TITLES[type as BuiltInCreditType] ?? titleCase(type);
}

/**
 * Biggest contributors first within a block: stable sort by `amount` descending, so ties and
 * amount-less types (follow/sub/mod/vip) keep their arrival order.
 */
function byContributionDesc(credits: Credit[]): Credit[] {
  return [...credits].sort((a, b) => (b.amount ?? 0) - (a.amount ?? 0));
}

/**
 * Build the credits view's data model from a store snapshot: one titled **block** per present type,
 * ordered as the **gratitude crescendo** — built-in regulars/contributions in `GRATITUDE_ORDER`,
 * then custom types in first-seen order, then `raid` as the finale. Within each block, the biggest
 * contributors come first (ties keep arrival order). Types with zero credits are omitted entirely.
 * The credits view and the gratitude post share this model.
 */
export function buildCreditsModel(credits: Credit[]): CreditsModel {
  const byType = new Map<CreditType, Credit[]>();
  for (const credit of credits) {
    const bucket = byType.get(credit.type);
    if (bucket) {
      bucket.push(credit);
    } else {
      byType.set(credit.type, [credit]);
    }
  }

  const blocks: CreditsBlock[] = [];
  const pushBlock = (type: CreditType): void => {
    const bucket = byType.get(type);
    if (bucket) {
      blocks.push({ type, title: titleFor(type), credits: byContributionDesc(bucket) });
    }
  };

  // Standing regulars → the stream's contributions (the gratitude crescendo).
  for (const type of GRATITUDE_ORDER) {
    pushBlock(type);
  }

  // Custom credit types, in first-seen order, just before the finale.
  for (const type of byType.keys()) {
    if (!isBuiltInCreditType(type)) {
      pushBlock(type);
    }
  }

  // Raid always closes the roll.
  pushBlock(FINALE_TYPE);

  return { blocks };
}
