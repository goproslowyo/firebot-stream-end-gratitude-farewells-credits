import type { Firebot } from "@crowbartools/firebot-custom-scripts-types";
import { type EventMetadata, extractCredit } from "../credits/extract";
import type { CreditStore } from "../credits/store";
import { BUILT_IN_CREDIT_TYPES, type BuiltInCreditType } from "../credits/types";

export const REGISTER_EVENT_EFFECT_ID = "stream-end-credits:register-event";

interface RegisterEventModel {
  creditType: BuiltInCreditType;
}

// Static <option> list built at module load (no AngularJS ng-repeat / optionsController, which
// breaks Firebot's effect-options rendering — see the working Generate Credits effect).
const CREDIT_TYPE_OPTIONS = BUILT_IN_CREDIT_TYPES.map(
  (type) => `<option value="${type}">${type}</option>`,
).join("\n          ");

/**
 * The automatic **Register event** effect: attach it to a supported Firebot
 * event, pick the credit type, and it derives the username (+ amount) from the event metadata and
 * adds a credit to the shared store.
 */
export function buildRegisterEventEffect(
  store: CreditStore,
): Firebot.EffectType<RegisterEventModel> {
  return {
    definition: {
      id: REGISTER_EVENT_EFFECT_ID,
      name: "Stream Credits: Register Event",
      description: "Add a credit from the attached Firebot event's metadata (username + amount).",
      icon: "fad fa-user-plus",
      categories: ["scripting"],
    },
    optionsTemplate: `
      <eos-container header="Credit Type">
        <p class="muted">Username and amount are read from the event this effect is attached to.</p>
        <select class="fb-select" ng-model="effect.creditType" ng-init="effect.creditType = effect.creditType || 'follow'">
          ${CREDIT_TYPE_OPTIONS}
        </select>
      </eos-container>
    `,
    onTriggerEvent: async ({ effect, trigger }) => {
      if (!effect.creditType) {
        return true;
      }
      const { metadata } = trigger;
      const eventData = (metadata.eventData ?? {}) as EventMetadata;
      const data: EventMetadata = { username: metadata.username, ...eventData };
      const credit = extractCredit(effect.creditType, data);
      if (credit) {
        store.addCredit(credit);
      }
      return true;
    },
  };
}
