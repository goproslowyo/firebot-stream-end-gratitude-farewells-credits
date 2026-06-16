import type { Firebot } from "@crowbartools/firebot-custom-scripts-types";
import type { CreditStore } from "../credits/store";

export const CLEAR_CREDITS_EFFECT_ID = "stream-end-credits:clear-credits";

/** Effect model for an options-free effect. */
type EmptyModel = Record<string, never>;

/**
 * The **Clear credits** effect: empties the credit store. Attach it to the
 * Stream Online event to clear credits at the start of each stream.
 */
export function buildClearCreditsEffect(store: CreditStore): Firebot.EffectType<EmptyModel> {
  return {
    definition: {
      id: CLEAR_CREDITS_EFFECT_ID,
      name: "Stream Credits: Clear Credits",
      description: "Empty the credit store (e.g. at the start of a stream).",
      icon: "fad fa-trash",
      categories: ["scripting"],
    },
    optionsTemplate: `
      <eos-container>
        <p class="muted">Clears all recorded credits for the current session.</p>
      </eos-container>
    `,
    onTriggerEvent: async () => {
      store.clear();
      return true;
    },
  };
}
