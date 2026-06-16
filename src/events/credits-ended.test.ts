import type { ScriptModules } from "@crowbartools/firebot-custom-scripts-types";
import {
  CREDITS_ENDED_EVENT_ID,
  CREDITS_EVENT_SOURCE_ID,
  emitCreditsEnded,
  registerCreditsEndedEvent,
} from "./credits-ended";

type EventSource = { id: string; events: Array<{ id: string; name: string }> };

describe("Credits Ended event", () => {
  it("registers an event source exposing the Credits Ended event", () => {
    const sources: EventSource[] = [];
    const eventManager = {
      registerEventSource(source: EventSource) {
        sources.push(source);
      },
    } as unknown as ScriptModules["eventManager"];

    registerCreditsEndedEvent(eventManager);

    expect(sources).toHaveLength(1);
    expect(sources[0].id).toBe(CREDITS_EVENT_SOURCE_ID);
    expect(sources[0].events.map((e) => e.id)).toContain(CREDITS_ENDED_EVENT_ID);
  });

  it("fires the Credits Ended event with metadata", () => {
    const calls: Array<{ sourceId: string; eventId: string; meta: unknown }> = [];
    const eventManager = {
      triggerEvent(sourceId: string, eventId: string, meta: unknown) {
        calls.push({ sourceId, eventId, meta });
      },
    } as unknown as ScriptModules["eventManager"];

    emitCreditsEnded(eventManager, { generationId: "gen-1" });

    expect(calls).toEqual([
      {
        sourceId: CREDITS_EVENT_SOURCE_ID,
        eventId: CREDITS_ENDED_EVENT_ID,
        meta: { generationId: "gen-1" },
      },
    ]);
  });
});
