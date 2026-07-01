import { toAmount, toUsername } from "./coerce";
import type { BuiltInCreditType, Credit } from "./types";

/**
 * Firebot's `trigger.metadata.eventData` for the attached event. The field names read below are
 * verified against the Firebot v5 source (`src/backend/streaming-platforms/twitch/events/`:
 * follow.ts, sub.ts, gift-sub.ts, bits.ts, raid.ts).
 *
 * Gift-sub note: `gifterUsername` is the gifter's *display name* and `username` is the *login*; we
 * prefer the display name for the credit. `subCount` is only present on `community-subs-gifted`
 * (bulk gifts) — a single `subs-gifted` has no count, so the gift defaults to 1.
 */
export type EventMetadata = Record<string, unknown>;

/**
 * Derive a {@link Credit} from a Firebot event's metadata for the selected credit type. Returns
 * `null` when no username can be read (the credit can't be attributed). The automatic Register
 * event effect selects the type and feeds this `trigger.metadata.eventData`.
 */
export function extractCredit(type: BuiltInCreditType, data: EventMetadata): Credit | null {
  if (type === "gift-sub") {
    const username = toUsername(data.gifterUsername) ?? toUsername(data.username);
    if (!username) {
      return null;
    }
    const amount = toAmount(data.subCount) ?? 1;
    return { type, username, amount };
  }

  if (type === "watch-streak") {
    const username = toUsername(data.userDisplayName) ?? toUsername(data.username);
    if (!username) {
      return null;
    }
    const amount = toAmount(data.streakCount);
    return amount === undefined ? { type, username } : { type, username, amount };
  }

  const username = toUsername(data.username);
  if (!username) {
    return null;
  }

  if (type === "cheer") {
    const amount = toAmount(data.bits);
    return amount === undefined ? { type, username } : { type, username, amount };
  }

  if (type === "raid") {
    const amount = toAmount(data.viewerCount);
    return amount === undefined ? { type, username } : { type, username, amount };
  }

  // follow, sub, mod, vip — membership-style credits with no numeric amount.
  return { type, username };
}
