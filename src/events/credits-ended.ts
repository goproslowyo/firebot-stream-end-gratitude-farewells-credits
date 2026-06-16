import type { ScriptModules } from "@crowbartools/firebot-custom-scripts-types";

/** Event source + event ids for the **Credits Ended** custom Firebot event. */
export const CREDITS_EVENT_SOURCE_ID = "stream-end-credits";
export const CREDITS_ENDED_EVENT_ID = "credits-ended";

/**
 * Register the Credits Ended event source. Users attach effects (e.g. "Toggle OBS Source
 * Visibility → Hide") to this event to auto-hide the credits browser source when the roll finishes.
 */
export function registerCreditsEndedEvent(eventManager: ScriptModules["eventManager"]): void {
  eventManager.registerEventSource({
    id: CREDITS_EVENT_SOURCE_ID,
    name: "Stream-End Credits",
    events: [
      {
        id: CREDITS_ENDED_EVENT_ID,
        name: "Credits Ended",
        description: "Fires when the credits view finishes animating (scroll end / last slide).",
      },
    ],
  });
}

/** Fire the Credits Ended event (called when the credits view signals completion). */
export function emitCreditsEnded(
  eventManager: ScriptModules["eventManager"],
  meta: Record<string, unknown> = {},
): void {
  eventManager.triggerEvent(CREDITS_EVENT_SOURCE_ID, CREDITS_ENDED_EVENT_ID, meta);
}
