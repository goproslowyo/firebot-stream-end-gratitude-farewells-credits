import type { Firebot } from "@crowbartools/firebot-custom-scripts-types";
import type { CreditStore } from "../credits/store";
import type { CreditsServer } from "../server/server";
import { buildCreditsModel } from "../view/model";
import { type DisplayMode, renderCreditsView } from "../view/render";

export const GENERATE_CREDITS_EFFECT_ID = "stream-end-credits:generate-credits";

interface GenerateCreditsModel {
  mode?: DisplayMode;
}

/**
 * Render the current credit store to a credits-view HTML page, using the server's configured film
 * title + timing. Shared by the **Generate credits** effect and the live `/view` preview route so
 * both reflect the same store/render — the preview is never a stale snapshot.
 */
export function renderCreditsHtml(
  store: CreditStore,
  server: CreditsServer,
  mode: DisplayMode = "scroll",
): string {
  return renderCreditsView(buildCreditsModel(store.snapshot()), {
    mode,
    title: server.getFilmTitle(),
    timing: server.getTiming(),
  });
}

/**
 * The **Generate credits** effect: snapshot the store, build the data model,
 * render the credits view, publish it on the custom route, and output the **credits URL** for the
 * "Set OBS Browser Source URL" step (mirrors StaticMage's `creditsUrl`). Zero-credit blocks are
 * omitted by the model.
 */
export function buildGenerateCreditsEffect(
  store: CreditStore,
  server: CreditsServer,
): Firebot.EffectType<GenerateCreditsModel> {
  return {
    definition: {
      id: GENERATE_CREDITS_EFFECT_ID,
      name: "Stream Credits: Generate Credits",
      description: "Render the credits view and output a URL to set as your OBS browser source.",
      icon: "fad fa-scroll",
      categories: ["scripting"],
      outputs: [
        {
          label: "Credits URL",
          description: "URL of the generated credits view; set this as your OBS browser source.",
          defaultName: "creditsUrl",
        },
      ],
    },
    optionsTemplate: `
      <eos-container header="Display Mode">
        <select class="fb-select" ng-model="effect.mode">
          <option value="scroll">Scroll (vertical crawl)</option>
          <option value="slideshow">Slideshow (paged)</option>
        </select>
      </eos-container>
    `,
    onTriggerEvent: async ({ effect }) => {
      const html = renderCreditsHtml(store, server, effect.mode ?? "scroll");
      const id = server.publishGeneration(html);
      return { success: true, outputs: { creditsUrl: server.generationUrl(id) } };
    },
  };
}
