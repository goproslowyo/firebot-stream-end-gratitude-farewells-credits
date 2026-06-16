import type { ScriptModules } from "@crowbartools/firebot-custom-scripts-types";
import { CreditStore } from "../credits/store";
import { CreditsServer } from "../server/server";
import { CLEAR_CREDITS_EFFECT_ID } from "./clear-credits";
import { GENERATE_CREDITS_EFFECT_ID } from "./generate-credits";
import { registerEffects } from "./index";
import { REGISTER_EVENT_EFFECT_ID } from "./register-event";
import { REGISTER_MANUAL_EFFECT_ID } from "./register-manual";

const noopHttpServer = {
  registerCustomRoute: () => true,
  unregisterCustomRoute: () => true,
} as unknown as ScriptModules["httpServer"];

const noopLogger = {
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
} as unknown as ScriptModules["logger"];

describe("registerEffects", () => {
  it("registers the register, manual, generate, and clear effects", () => {
    const ids: string[] = [];
    const effectManager = {
      registerEffect(effect: { definition: { id: string } }) {
        ids.push(effect.definition.id);
      },
    } as unknown as ScriptModules["effectManager"];
    const server = new CreditsServer(noopHttpServer, noopLogger);

    registerEffects(effectManager, new CreditStore(), server);

    expect(ids).toEqual([
      REGISTER_EVENT_EFFECT_ID,
      REGISTER_MANUAL_EFFECT_ID,
      GENERATE_CREDITS_EFFECT_ID,
      CLEAR_CREDITS_EFFECT_ID,
    ]);
  });
});
