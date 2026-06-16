import type { Firebot } from "@crowbartools/firebot-custom-scripts-types";
import { toAmount, toUsername } from "../credits/coerce";
import type { CreditStore } from "../credits/store";

export const REGISTER_MANUAL_EFFECT_ID = "stream-end-credits:register-manual";

interface RegisterManualModel {
  creditType: string;
  username: string;
  amount?: number | string;
}

/**
 * The manual **Register event** effect: explicit credit type, username, and
 * optional amount. The credit type may be a built-in or a user-defined **custom credit type** (any
 * label), which then renders as its own titled block.
 */
export function buildRegisterManualEffect(
  store: CreditStore,
): Firebot.EffectType<RegisterManualModel> {
  return {
    definition: {
      id: REGISTER_MANUAL_EFFECT_ID,
      name: "Stream Credits: Register Event (Manual)",
      description: "Add a credit with an explicit credit type, username, and optional amount.",
      icon: "fad fa-user-edit",
      categories: ["scripting"],
    },
    optionsTemplate: `
      <eos-container header="Credit">
        <firebot-input model="effect.creditType" input-title="Credit Type"
          placeholder-text="follow, sub, gift-sub, cheer, raid, mod, vip, or a custom label" />
        <firebot-input model="effect.username" input-title="Username" />
        <firebot-input model="effect.amount" input-title="Amount (optional)"
          placeholder-text="bits, raiders, gifted subs, …" />
      </eos-container>
    `,
    onTriggerEvent: async ({ effect }) => {
      const username = toUsername(effect.username);
      const type = typeof effect.creditType === "string" ? effect.creditType.trim() : "";
      if (!username || !type) {
        return true;
      }
      const amount = toAmount(effect.amount);
      store.addCredit(amount === undefined ? { type, username } : { type, username, amount });
      return true;
    },
  };
}
