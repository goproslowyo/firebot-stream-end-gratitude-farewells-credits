/**
 * Credit vocabulary. A **credit** is one recorded acknowledgement of a viewer action;
 * a **credit type** is its category. Built-in types map to titled credits blocks in the render;
 * users may also define **custom credit types**, which are arbitrary label strings.
 */

/** The standard credit types tracked automatically from Firebot events. */
export const BUILT_IN_CREDIT_TYPES = [
  "follow",
  "sub",
  "gift-sub",
  "cheer",
  "raid",
  "watch-streak",
  "mod",
  "vip",
] as const;

export type BuiltInCreditType = (typeof BUILT_IN_CREDIT_TYPES)[number];

/** A built-in credit type, or a user-defined custom credit type label. */
export type CreditType = string;

/** The atomic unit accumulated during a stream. `amount` is type-specific (bits, raiders, …). */
export interface Credit {
  type: CreditType;
  username: string;
  amount?: number;
}

export function isBuiltInCreditType(type: string): type is BuiltInCreditType {
  return (BUILT_IN_CREDIT_TYPES as readonly string[]).includes(type);
}
