import type { Credit } from "../credits/types";
import { CREDITS_ROUTE_PREFIX, THEME_CSS_ROUTE } from "../server/server";
import type { CreditsBlock, CreditsModel } from "./model";

/** The two credits view display modes. */
export type DisplayMode = "scroll" | "slideshow";

/** Configurable text for the film-style intro **flourish card**. */
export interface FilmTitle {
  /** The "studio"/show name shown large on the intro card. */
  studio?: string;
  /** A tagline under the title, e.g. "Filmed before a live audience". */
  tagline?: string;
}

/**
 * Tunable animation timing for the credits view (issue: tune-via-params). Surfaced as global script
 * params so the streamer can dial the film feel live in Firebot without rebuilding the bundle —
 * `customCss` can't reach these because they are JS timing, not CSS. Read at render time (like the
 * film title) and emitted as `data-*` attributes the view script reads.
 */
export interface Timing {
  /** Crawl speed for **scroll** mode, in pixels per second. */
  scrollPxPerSecond?: number;
  /** Dwell per slide for **slideshow** mode, in seconds. */
  slideSeconds?: number;
}

export interface RenderOptions {
  mode?: DisplayMode;
  title?: FilmTitle;
  timing?: Timing;
}

// Defaults match the constants the film-look polish settled on; the view stays identical when the
// streamer leaves the params blank.
const DEFAULT_SCROLL_PX_PER_SECOND = 70;
const DEFAULT_SLIDE_SECONDS = 5;
// Sane bounds so a 0/negative/garbage value can't freeze the roll or scroll names by unreadably fast.
const SCROLL_PX_MIN = 10;
const SCROLL_PX_MAX = 1000;
const SLIDE_SECONDS_MIN = 1;
const SLIDE_SECONDS_MAX = 120;

function clampNumber(value: unknown, min: number, max: number, fallback: number): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) {
    return fallback;
  }
  return Math.min(Math.max(n, min), max);
}

/** Resolve a (possibly partial/garbage) {@link Timing} to clamped, finite numbers with defaults. */
export function normalizeTiming(timing: Timing = {}): {
  scrollPxPerSecond: number;
  slideSeconds: number;
} {
  return {
    scrollPxPerSecond: clampNumber(
      timing.scrollPxPerSecond,
      SCROLL_PX_MIN,
      SCROLL_PX_MAX,
      DEFAULT_SCROLL_PX_PER_SECOND,
    ),
    slideSeconds: clampNumber(
      timing.slideSeconds,
      SLIDE_SECONDS_MIN,
      SLIDE_SECONDS_MAX,
      DEFAULT_SLIDE_SECONDS,
    ),
  };
}

/** Absolute path so the link resolves from any generation URL. */
const THEME_CSS_HREF = `/integrations/${CREDITS_ROUTE_PREFIX}/${THEME_CSS_ROUTE}`;

// Default copy for the flourish cards — decorative homage, all drawn in code (no image files).
// The intro studio/tagline are overridable via script params; the rest are fixed flavor.
const DEFAULT_STUDIO = "Tonight's Stream";
const DEFAULT_TAGLINE = "Filmed before a live audience";
const INTRO_BADGE = "In Glorious Twitchicolor";
const INTRO_RATING = "Rated S — for Streamers";
const OUTRO_TITLE = "The End";
const OUTRO_TAGLINE = "Thanks for watching";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderCredit(credit: Credit): string {
  const name = `<span class="credit__name">${escapeHtml(credit.username)}</span>`;
  const amount =
    credit.amount === undefined
      ? ""
      : `<span class="credit__amount">${escapeHtml(String(credit.amount))}</span>`;
  return `<li class="credit">${name}${amount}</li>`;
}

function renderBlockInner(block: CreditsBlock): string {
  const items = block.credits.map(renderCredit).join("");
  return `<h2 class="credits-block__title">${escapeHtml(block.title)}</h2>
        <ul class="credits-block__list">${items}</ul>`;
}

/** Decorative film-credits intro card (studio ident + badge + rating), drawn in code. */
function introCardInner(title: FilmTitle): string {
  const studio = escapeHtml(title.studio?.trim() || DEFAULT_STUDIO);
  const tagline = escapeHtml(title.tagline?.trim() || DEFAULT_TAGLINE);
  return `<div class="flourish__badge">${escapeHtml(INTRO_BADGE)}</div>
        <h1 class="flourish__title">${studio}</h1>
        <p class="flourish__tagline">${tagline}</p>
        <div class="flourish__rating">${escapeHtml(INTRO_RATING)}</div>`;
}

/** Decorative "The End" outro card. */
function outroCardInner(): string {
  return `<h1 class="flourish__title">${escapeHtml(OUTRO_TITLE)}</h1>
        <p class="flourish__tagline">${escapeHtml(OUTRO_TAGLINE)}</p>`;
}

function renderScroll(model: CreditsModel, title: FilmTitle): string {
  const sections = [
    `<section class="flourish flourish--intro">${introCardInner(title)}</section>`,
    ...model.blocks.map(
      (block) => `<section class="credits-block">${renderBlockInner(block)}</section>`,
    ),
    `<section class="flourish flourish--outro">${outroCardInner()}</section>`,
  ];
  return `<div class="credits-roll" id="credits-roll">
      ${sections.join("\n      ")}
    </div>`;
}

function renderSlideshow(model: CreditsModel, title: FilmTitle): string {
  const slides = [
    `<section class="credits-slide flourish flourish--intro">${introCardInner(title)}</section>`,
    ...model.blocks.map(
      (block) => `<section class="credits-slide">${renderBlockInner(block)}</section>`,
    ),
    `<section class="credits-slide flourish flourish--outro">${outroCardInner()}</section>`,
  ];
  return `<div class="credits-slideshow" id="credits-slideshow">
      ${slides.join("\n      ")}
    </div>`;
}

const VIEW_SCRIPT = `(function () {
  var done = false;
  function signalComplete() {
    if (done) return;
    done = true;
    // Ping the per-generation complete route (resolves relative to this view's URL); the script
    // fires the Credits Ended event in response.
    try {
      fetch("complete", { method: "GET" }).catch(function () {});
    } catch (e) {}
  }
  var mode = document.body.getAttribute("data-mode");
  // Timing is set via script params and emitted as data-* attributes; fall back defensively in case
  // an attribute is somehow missing (the render layer already clamps to sane bounds).
  var slideSeconds = parseFloat(document.body.getAttribute("data-slide-seconds")) || 5;
  if (mode === "slideshow") {
    var slides = Array.prototype.slice.call(document.querySelectorAll(".credits-slide"));
    if (!slides.length) {
      signalComplete();
      return;
    }
    var i = 0;
    slides[0].classList.add("is-active");
    var timer = setInterval(function () {
      slides[i].classList.remove("is-active");
      i += 1;
      if (i >= slides.length) {
        clearInterval(timer);
        signalComplete();
        return;
      }
      slides[i].classList.add("is-active");
    }, slideSeconds * 1000);
    return;
  }
  var roll = document.getElementById("credits-roll");
  if (!roll) {
    signalComplete();
    return;
  }
  var pxPerSecond = parseFloat(document.body.getAttribute("data-scroll-speed")) || 70;
  var start = null;
  var distance = window.innerHeight + roll.offsetHeight;
  var durationMs = (distance / pxPerSecond) * 1000;
  function frame(now) {
    if (start === null) start = now;
    var progress = Math.min((now - start) / durationMs, 1);
    roll.style.transform = "translateY(" + -(distance * progress) + "px)";
    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      signalComplete();
    }
  }
  requestAnimationFrame(frame);
})();`;

/**
 * Render the credits view as an HTML page that links the themeable stylesheet. The page
 * is framed by film-style **flourish cards** — a studio-ident intro and a "The End" outro —
 * around the crescendo of credit blocks. `scroll` animates a vertical crawl; `slideshow`
 * pages through one section at a time. Usernames and titles are HTML-escaped. The completion signal
 * back to the script is sent by the view script when the roll finishes.
 */
export function renderCreditsView(model: CreditsModel, options: RenderOptions = {}): string {
  const mode: DisplayMode = options.mode ?? "scroll";
  const title = options.title ?? {};
  const timing = normalizeTiming(options.timing);
  const body = mode === "slideshow" ? renderSlideshow(model, title) : renderScroll(model, title);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Credits</title>
    <link rel="stylesheet" href="${THEME_CSS_HREF}" />
  </head>
  <body data-mode="${mode}" data-scroll-speed="${timing.scrollPxPerSecond}" data-slide-seconds="${timing.slideSeconds}">
    ${body}
    <script>
      ${VIEW_SCRIPT}
    </script>
  </body>
</html>
`;
}
