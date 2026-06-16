import type { ScriptModules } from "@crowbartools/firebot-custom-scripts-types";
import type { CreditStore } from "../credits/store";
import type { CreditsServer } from "../server/server";
import { buildClearCreditsEffect } from "./clear-credits";
import { buildGenerateCreditsEffect } from "./generate-credits";
import { buildRegisterEventEffect } from "./register-event";
import { buildRegisterManualEffect } from "./register-manual";

/** Register every credits effect against the shared credit store and server. */
export function registerEffects(
  effectManager: ScriptModules["effectManager"],
  store: CreditStore,
  server: CreditsServer,
): void {
  effectManager.registerEffect(buildRegisterEventEffect(store));
  effectManager.registerEffect(buildRegisterManualEffect(store));
  effectManager.registerEffect(buildGenerateCreditsEffect(store, server));
  effectManager.registerEffect(buildClearCreditsEffect(store));
}
