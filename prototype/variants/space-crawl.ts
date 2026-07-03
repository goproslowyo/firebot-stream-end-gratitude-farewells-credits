import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. Space-Crawl: golden crawl receding along a tilted plane into a twinkling starfield. */
export const VARIANT: ThemeVariant = {
  key: "space-crawl",
  name: "Space-Crawl",
  css: `
/* ============================================================
   SPACE-CRAWL — space-opera credits theme
   Layered after the base stylesheet. The tilt lives on <body>
   (scroll mode only); the JS rewrites .credits-roll's inline
   transform every frame, so this theme NEVER touches it.
   Collapse all scenery for OBS compositing with ONE line:
     :root { --credits-bg: transparent; --space-crawl-scenery: none; }
   ============================================================ */

@import url('https://fonts.googleapis.com/css2?family=News+Cycle:wght@400;700&family=Pathway+Gothic+One&display=swap');

:root {
  /* palette */
  --sw-yellow: #FFE81F;
  --sw-yellow-dim: rgba(255, 232, 31, 0.62);
  --sw-blue: #4BD5EE;
  --sw-space: #020208;

  /* Tilt knob — the readability tradeoff, exposed. 18deg keeps every
     name legible for 20+ seconds in the lower band at the default
     70 px/s; the film's own steeper ~20deg look shrinks and dims text
     faster up-plane. Streamers dial it via Custom CSS, e.g.
       :root { --space-crawl-tilt: 14deg; }   (flatter = more readable)
       :root { --space-crawl-tilt: 20deg; }   (steeper = more movie) */
  --space-crawl-tilt: 18deg;

  /* base hooks */
  --credits-color: var(--sw-yellow);
  --credits-accent: var(--sw-yellow);
  --credits-font: "News Cycle", "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  --credits-title-font: "Pathway Gothic One", "Arial Narrow", "Helvetica Neue", Arial, sans-serif;
  --credits-title-size: clamp(1.9rem, 5.5vw, 3.4rem);
  --credits-name-size: clamp(1.05rem, 3vw, 1.8rem);
  --credits-flourish-title-size: clamp(2.75rem, 10vw, 6rem);
  --credits-block-gap: 5.5rem;
  --credits-name-gap: 0.55rem;
  --credits-shadow: 0 0 6px rgba(0, 0, 0, 0.9);
  --credits-glow: 0 0 22px rgba(255, 232, 31, 0.38);

  /* Scenery: a real deep-space cosmos, painted in depth order (nearest
     glow first) so the crawl dives toward a luminous galactic core.
     Lives entirely in --credits-bg (painted by <html> in the base) so
     the transparent override collapses it in one declaration.
       1. galactic-core bloom — the bright thing the crawl recedes into
       2. warm inner-core rim just above it
       3. teal/violet nebula clouds drifting up-frame (two hues, offset)
       4. a faint tilted Milky-Way band across the mid sky
       5-8. FOUR star tiles: bright colored anchors + a fine dust field,
            varied size/hue/density so it reads as real sky not a grid
       9. deep-space vertical gradient (lighter toward the core horizon) */
  --credits-bg:
    radial-gradient(ellipse 62% 40% at 50% 116%, rgba(120, 196, 255, 0.55) 0%, rgba(64, 120, 220, 0.30) 30%, rgba(28, 52, 120, 0.14) 55%, transparent 76%),
    radial-gradient(ellipse 120% 52% at 50% 122%, rgba(255, 214, 150, 0.20) 0%, rgba(190, 120, 210, 0.14) 34%, transparent 66%),
    radial-gradient(ellipse 90% 70% at 22% 30%, rgba(78, 150, 210, 0.16) 0%, transparent 58%),
    radial-gradient(ellipse 85% 65% at 82% 46%, rgba(150, 92, 200, 0.15) 0%, transparent 56%),
    radial-gradient(ellipse 130% 26% at 60% 40%, rgba(150, 178, 235, 0.10) 0%, transparent 62%),
    radial-gradient(1.9px 1.9px at 18% 22%, rgba(255, 255, 255, 0.98) 46%, rgba(255,255,255,0.28) 60%, transparent 72%) 0 0 / 360px 320px repeat,
    radial-gradient(1.5px 1.5px at 66% 58%, rgba(190, 224, 255, 0.92) 46%, rgba(190,224,255,0.22) 62%, transparent 74%) 0 0 / 300px 270px repeat,
    radial-gradient(1.2px 1.2px at 44% 84%, rgba(255, 236, 200, 0.82) 47%, transparent 66%) 0 0 / 240px 210px repeat,
    radial-gradient(0.8px 0.8px at 30% 40%, rgba(255, 255, 255, 0.55) 48%, transparent 62%) 0 0 / 150px 130px repeat,
    linear-gradient(to top, rgba(20, 30, 60, 0.9) 0%, rgba(8, 10, 26, 0.85) 30%, var(--sw-space) 62%);
}

/* ---- scenery ------------------------------------------------ */

/* Kill the base screen-space fade on the root so the sky never fades;
   each mode's fade moves onto <body> below. */
html {
  -webkit-mask-image: none;
  mask-image: none;
}

/* Stars paint once on <html>; a tilted body background would render a
   trapezoid of duplicate stars. Counter drives the EPISODE kickers. */
body {
  background: transparent;
  counter-reset: episode;
}

/* ---- galactic core + nebula bloom (fixed, promoted, off the lane) ----
   Two big COARSE soft glows on the <head> pseudos. <head> is made a block
   so it participates in layout, then its pseudos are position:fixed —
   crucially <head> is NEVER transformed (only <body> carries the scroll
   tilt), so unlike body pseudos these stay true screen-space and don't get
   sheared into a parallelogram by the perspective. Both glows are >=40px
   soft falloff (L6), translateZ(0)-promoted, painted ONCE; the only motion
   is a slow opacity breathe (compositor-only). Off the center text band. */
head {
  display: block;
}

head::before,
head::after {
  content: "";
  position: fixed;
  left: 0;
  right: 0;
  z-index: -1;
  pointer-events: none;
  display: var(--space-crawl-scenery, block);
  transform: translateZ(0);
  will-change: opacity;
}

/* Galactic core: a wide luminous bloom rising from the bottom horizon —
   the destination the golden crawl recedes toward. Big and soft, entirely
   below the lower third, so it deepens the "diving in" read without ever
   flickering over names. */
head::before {
  bottom: -34vh;
  height: 82vh;
  background:
    radial-gradient(ellipse 30% 34% at 50% 100%, rgba(220, 240, 255, 0.5) 0%, rgba(150, 210, 255, 0.34) 22%, transparent 54%),
    radial-gradient(ellipse 44% 52% at 50% 100%, rgba(154, 216, 255, 0.62) 0%, rgba(98, 160, 242, 0.34) 26%, rgba(48, 92, 190, 0.16) 48%, transparent 72%),
    radial-gradient(ellipse 80% 58% at 50% 104%, rgba(202, 150, 236, 0.2) 0%, rgba(120, 90, 200, 0.1) 40%, transparent 70%);
  animation: space-crawl-core 9s ease-in-out infinite alternate;
}

/* Nebula wing: soft violet/teal clouds in the upper sky, well above the
   center lane. Coarse, no fine detail. */
head::after {
  top: -12vh;
  height: 60vh;
  background:
    radial-gradient(ellipse 56% 60% at 22% 34%, rgba(86, 150, 220, 0.20) 0%, rgba(64, 110, 190, 0.07) 44%, transparent 70%),
    radial-gradient(ellipse 50% 56% at 82% 18%, rgba(168, 104, 214, 0.19) 0%, rgba(120, 74, 190, 0.06) 46%, transparent 72%);
  animation: space-crawl-core 11s ease-in-out infinite alternate-reverse;
}

@keyframes space-crawl-core {
  from { opacity: 0.7; }
  to   { opacity: 1; }
}

/* ---- hero star glints: the SHINE (void-element trick, off the lane) ----
   The <head>'s void children (meta, link) are made blocks so their pseudos
   render; each is a screen-fixed COARSE cross-star glint parked in a CORNER
   or edge — never over the center text lane (L6 (a)+(c)). A glint = a soft
   radial core (>=40px, soft falloff) crossed by two thin bright flare arms
   baked into the same background (static gradients). Motion is a slow
   opacity twinkle via steps() (<=1 paint/s), which L6 permits precisely
   because these sit at the frame edges, clear of the crawling names.
   Painted once, translateZ(0)-promoted; brightness-only compositing. */
head meta,
head link {
  display: block;
}

head meta::before,
head meta::after,
head link::before,
head link::after {
  content: "";
  position: fixed;
  z-index: -1;
  pointer-events: none;
  display: var(--space-crawl-scenery, block);
  transform: translateZ(0);
  width: 190px;
  height: 190px;
  /* Shared glint art — a crisp four-point specular star (echoing the ✦ used
     as the amount separator). All static; the twinkle only changes opacity:
       1. hot white pin core with a tight bright center
       2. soft coloured bloom halo (the coarse >=40px part that satisfies L6)
       3+4. two long thin flare arms (horizontal + vertical) tapering to none */
  background:
    radial-gradient(closest-side, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 5%, rgba(214, 238, 255, 0.45) 12%, rgba(150, 200, 255, 0.14) 26%, transparent 48%),
    linear-gradient(90deg, transparent 8%, rgba(214, 238, 255, 0.72) 50%, transparent 92%),
    linear-gradient(0deg, transparent 8%, rgba(214, 238, 255, 0.72) 50%, transparent 92%);
  background-repeat: no-repeat;
  background-position: center;
  /* Arms constrained to thin bright lines via background-size (full span,
     ~1.6px thick); the radial halo fills the box. */
  background-size: 100% 100%, 100% 1.6px, 1.6px 100%;
}

/* top-left glint — big & bright, slow twinkle */
head meta:first-of-type::before {
  top: 9vh;
  left: 8vw;
  width: 230px;
  height: 230px;
  animation: space-crawl-glint 5.5s steps(4, end) infinite alternate;
}

/* top-right glint — the brightest hero star near the violet nebula */
head meta:first-of-type::after {
  top: 6vh;
  right: 10vw;
  width: 260px;
  height: 260px;
  animation: space-crawl-glint 6.8s steps(4, end) infinite alternate-reverse;
}

/* left-mid edge glint — smaller, dimmer, well left of the lane */
head meta:last-of-type::before {
  top: 42vh;
  left: 5vw;
  width: 150px;
  height: 150px;
  opacity: 0.72;
  animation: space-crawl-glint 7.6s steps(3, end) infinite alternate;
}

/* right-mid edge glint */
head meta:last-of-type::after {
  top: 52vh;
  right: 6vw;
  width: 160px;
  height: 160px;
  opacity: 0.72;
  animation: space-crawl-glint 6.2s steps(3, end) infinite alternate-reverse;
}

/* bottom-left glint riding just above the galactic core, off to the side */
head link:first-of-type::before {
  bottom: 12vh;
  left: 12vw;
  width: 180px;
  height: 180px;
  opacity: 0.8;
  animation: space-crawl-glint 8.2s steps(4, end) infinite alternate;
}

/* bottom-right core-side glint */
head link:last-of-type::after {
  bottom: 16vh;
  right: 13vw;
  width: 200px;
  height: 200px;
  opacity: 0.82;
  animation: space-crawl-glint 5.9s steps(4, end) infinite alternate-reverse;
}

@keyframes space-crawl-glint {
  from { opacity: 0.34; }
  to   { opacity: 1; }
}

/* Twinkle overlay: the two star sets are split across html::before and
   html::after and cross-faded in counter-phase — opacity-only, so each
   layer is painted ONCE and only composited thereafter, and the combined
   brightness stays steady while individual star sets shimmer. Both
   pseudos sit outside body's transform, so they stay screen-space.
   The one always-on ambient motion (no starfield drift — that would
   repaint 1080p every frame under the crawl). */
html::before,
html::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  display: var(--space-crawl-scenery, block);
  /* steps(7): a continuous cross-fade re-composited BOTH full-screen star layers
     every frame on CPU; discrete shimmer steps cost ~1 composite/s each and stars
     twinkling in little pops reads just as well. */
  animation: space-crawl-twinkle 6.5s steps(7, end) infinite alternate;
}

html::before {
  background:
    radial-gradient(1.4px 1.4px at 32% 34%, rgba(255, 255, 255, 0.9) 49%, transparent 51%) 0 0 / 420px 380px repeat;
}

html::after {
  background:
    radial-gradient(1px 1px at 78% 12%, rgba(180, 220, 255, 0.8) 49%, transparent 51%) 0 0 / 310px 350px repeat;
  /* One full iteration behind = exact counter-phase under alternate:
     this star set dims while the other brightens. */
  animation-delay: -6.5s;
}

@keyframes space-crawl-twinkle {
  from { opacity: 0.15; }
  to   { opacity: 0.95; }
}

/* ---- scroll mode: the tilted plane --------------------------- */

/* Bottom-pivot tilt: entry text hits the frame bottom at scale 1.
   44.5vh = ~480px perspective at 1080p. Tilt is on <body>, NEVER on
   .credits-roll — the JS clobbers that element's inline transform
   every frame. Slideshow mode stays untilted. */
body[data-mode="scroll"] {
  transform-origin: 50% 100%;
  transform: perspective(44.5vh) rotateX(var(--space-crawl-tilt, 18deg));
  /* The transform makes body the containing block (and would-be clipper)
     of the absolutely-positioned roll — base overflow:hidden would blank
     the crawl entirely. html still clips at the viewport. */
  overflow: visible;
  /* Distance fade measured ALONG THE PLANE (a body mask tilts with body):
     bottom-anchored oversized no-repeat tile, opaque for the first ~1.05
     viewport-heights of travel, gone by ~2.3. */
  -webkit-mask-image: linear-gradient(to top, #000 0%, #000 33%, rgba(0, 0, 0, 0.4) 52%, transparent 71%);
  -webkit-mask-size: 100% 320%;
  -webkit-mask-position: 50% 100%;
  -webkit-mask-repeat: no-repeat;
  mask-image: linear-gradient(to top, #000 0%, #000 33%, rgba(0, 0, 0, 0.4) 52%, transparent 71%);
  mask-size: 100% 320%;
  mask-position: 50% 100%;
  mask-repeat: no-repeat;
}

/* Runway: JS scrolls innerHeight + offsetHeight, so bottom padding pushes
   the outro fully through the fade band before completion fires (~20s of
   receding-into-the-stars tail at 70 px/s). */
body[data-mode="scroll"] .credits-roll {
  padding: 4.5rem 1rem 130vh;
  /* Pin the roll's rasterized texture so the per-frame JS translateY
     (an INLINE transform — will-change never fights it) re-projects
     through the tilt on the compositor instead of repainting the crawl. */
  will-change: transform;
}

/* ---- slideshow mode: flat, calm, same fiction ----------------- */

body[data-mode="slideshow"] {
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 8%, #000 92%, transparent 100%);
  mask-image: linear-gradient(to bottom, transparent 0%, #000 8%, #000 92%, transparent 100%);
}

/* Hyperspace settle. Slides never get inline JS transforms (only
   #credits-roll does), so transitioning transform here is safe. */
body[data-mode="slideshow"] .credits-slide {
  transform: scale(1.045);
  transition: opacity 0.8s ease, transform 1.1s ease;
}

body[data-mode="slideshow"] .credits-slide.is-active {
  transform: scale(1);
}

/* ---- type system ---------------------------------------------- */

.credit {
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1.5;
  /* Long single-word usernames wrap instead of overflowing the frame. */
  overflow-wrap: anywhere;
}

.credit__amount {
  opacity: 1;
  color: var(--sw-yellow-dim);
  font-size: 0.68em;
  font-weight: 400;
  letter-spacing: 0.18em;
  margin-left: 0.7em;
}

/* Replace the base " · " separator with a four-pointed star
   (per-glyph system-font fallback supplies the glyph). */
.credit__amount::before {
  content: "✦ ";
  font-size: 0.85em;
  opacity: 0.8;
}

/* ---- section titles: every block is an EPISODE ----------------- */

.credits-block__title {
  letter-spacing: 0.28em;
  counter-increment: episode;
}

.credits-block__title::before {
  content: "Episode " counter(episode, upper-roman);
  display: block;
  font-family: var(--credits-font);
  font-size: 0.38em;
  font-weight: 700;
  letter-spacing: 0.5em;
  opacity: 0.75;
  margin-bottom: 0.5em;
}

/* Long fading hairline instead of the stubby gold rule. */
.credits-block__title::after {
  width: 11rem;
  height: 1px;
  margin: 0.7em auto 0;
  background: linear-gradient(90deg, transparent, rgba(255, 232, 31, 0.8), transparent);
  opacity: 1;
}

/* ---- intro flourish: the calm blue moment ---------------------- */

/* Badge pill dissolves; ::after rebuilds it as the blue prologue line. */
.flourish__badge {
  font-size: 0;
  border: none;
  box-shadow: none;
  padding: 0;
  text-transform: none;
  letter-spacing: normal;
}

.flourish__badge::after {
  content: "A long time ago, on a stream far, far away….";
  font-size: clamp(1.15rem, 2.6vw, 1.6rem);
  font-weight: 400;
  color: var(--sw-blue);
  text-shadow: 0 0 18px rgba(75, 213, 238, 0.4), var(--credits-shadow);
}

/* Show title as the chrome-gold logo. Copy is streamer-configurable, so it
   is only restyled — never swapped. Base fallback: solid gold + soft bloom. */
.flourish--intro .flourish__title {
  color: var(--sw-yellow);
  letter-spacing: 0.06em;
  line-height: 0.95;
  text-shadow: 0 0 40px rgba(255, 232, 31, 0.34), 0 2px 4px rgba(120, 70, 0, 0.6), var(--credits-shadow);
}

/* Metallic upgrade: fill each glyph with a top-lit gold gradient — bright
   near-white specular band across the upper third, saturated gold body,
   deep amber at the base — the classic beveled-chrome logo read. The sheen
   is BAKED (static gradient), so it never flickers. A dark drop-shadow
   under the fill fakes the lower bevel; the bloom stays on text-shadow. */
@supports ((-webkit-background-clip: text) or (background-clip: text)) {
  .flourish--intro .flourish__title {
    color: transparent;
    background-image: linear-gradient(
      178deg,
      #fff7cf 0%,
      #ffffff 13%,
      #ffe81f 30%,
      #ffcf14 52%,
      #f4a814 74%,
      #c47a0c 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    /* Baked specular pin-glint + bevel contour + outer bloom (all static). */
    filter:
      drop-shadow(0 1px 0 rgba(255, 255, 220, 0.55))
      drop-shadow(0 2px 3px rgba(90, 48, 0, 0.7))
      drop-shadow(0 0 26px rgba(255, 224, 60, 0.35));
    text-shadow: none;
  }
}

.flourish--intro .flourish__tagline {
  font-style: normal;
  font-size: 0.98rem;
  letter-spacing: 0.42em;
  text-indent: 0.42em;
  text-transform: uppercase;
  color: var(--sw-blue);
  opacity: 0.92;
  margin-top: 0.35rem;
  text-shadow: 0 0 14px rgba(75, 213, 238, 0.35), var(--credits-shadow);
}

/* Rating box dissolves into the episode subtitle. */
.flourish__rating {
  font-size: 0;
  border: none;
  padding: 0;
  opacity: 1;
}

.flourish__rating::after {
  content: "Episode ∞ — A New Stream";
  font-size: 0.95rem;
  letter-spacing: 0.34em;
  text-transform: uppercase;
  color: var(--sw-yellow);
  opacity: 0.85;
}

/* ---- raid finale: the incoming transmission --------------------- */
/* The outro <section> is the true :last-of-type in BOTH modes, so the
   raids block is nth-last-of-type(2); :not(.flourish) guards the
   slideshow pair when no credit blocks rendered. */

.credits-block:nth-last-of-type(2),
.credits-slide:nth-last-of-type(2):not(.flourish) {
  --credits-name-size: clamp(1.3rem, 3.8vw, 2.2rem);
}

.credits-block:nth-last-of-type(2) .credits-block__title,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
  font-size: calc(var(--credits-title-size) * 1.22);
  /* Beacon glow is painted ONCE at full strength (static text-shadow);
     the pulse is an opacity breathe — compositor-only. Animating the
     text-shadow itself would invalidate the moving roll's texture and
     force a full tilted-plane repaint every frame. */
  text-shadow: 0 0 34px rgba(255, 232, 31, 0.6), 0 0 60px rgba(255, 232, 31, 0.25), var(--credits-shadow);
  /* steps(4): continuous opacity on an element INSIDE the roll damaged the tilted
     plane's texture every frame; discrete breathe = ~1.7 small repaints/s. */
  animation: space-crawl-raid-beacon 2.4s steps(4, end) infinite alternate;
}

.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  content: "Incoming Transmission";
  color: var(--sw-blue);
  /* steps(2) for the same reason as the beacon: no per-frame roll damage. */
  animation: space-crawl-transmission-blink 1.6s steps(2, end) infinite;
}

@keyframes space-crawl-raid-beacon {
  from { opacity: 0.68; }
  to   { opacity: 1; }
}

@keyframes space-crawl-transmission-blink {
  0%, 100% { opacity: 0.45; }
  50%      { opacity: 1; }
}

/* ---- outro flourish --------------------------------------------- */
/* Fixed flavor copy (not streamer-configurable), so swaps are allowed. */

.flourish--outro .flourish__title {
  font-size: 0;
}

.flourish--outro .flourish__title::after {
  content: "The Saga Continues";
  font-size: var(--credits-flourish-title-size);
  letter-spacing: 0.1em;
}

/* Same chrome-gold family as the intro logo so the two bookends rhyme, but
   tuned BRIGHTER: the outro font (condensed Pathway Gothic) has thin strokes,
   so a lighter top-lit gradient (white→gold, minimal deep-amber base) keeps
   every letter luminous instead of muddying. Specular + bloom only — no dark
   bevel shadow, which would swallow the thin strokes. */
@supports ((-webkit-background-clip: text) or (background-clip: text)) {
  .flourish--outro .flourish__title::after {
    color: transparent;
    background-image: linear-gradient(
      178deg,
      #ffffff 0%,
      #fff3b0 26%,
      #ffe81f 58%,
      #ffd220 82%,
      #f0aa1c 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    filter:
      drop-shadow(0 1px 1px rgba(120, 70, 0, 0.5))
      drop-shadow(0 0 26px rgba(255, 224, 60, 0.42));
  }
}

.flourish--outro .flourish__tagline {
  font-size: 0;
}

.flourish--outro .flourish__tagline::after {
  content: "may the chat be with you… always";
  font-size: 1.15rem;
  font-style: italic;
  letter-spacing: 0.06em;
  color: var(--sw-blue);
}

/* ---- reduced motion --------------------------------------------- */
/* Twinkle/pulse/blink loops off; the static tilt itself is fine. */

@media (prefers-reduced-motion: reduce) {
  html::before,
  html::after,
  head::before,
  head::after,
  head meta::before,
  head meta::after,
  head link::before,
  head link::after,
  .credits-block:nth-last-of-type(2) .credits-block__title,
  .credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title,
  .credits-block:nth-last-of-type(2) .credits-block__title::before,
  .credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
    animation: none;
  }
  html::before,
  html::after {
    opacity: 0.55;
  }
  /* Park the glints visibly at a calm mid-brightness so the shine still
     reads while every twinkle loop is stopped. */
  head::before,
  head::after {
    opacity: 0.85;
  }
  head meta::before,
  head meta::after,
  head link::before,
  head link::after {
    opacity: 0.6;
  }
  body[data-mode="slideshow"] .credits-slide {
    transform: none;
    transition: opacity 0.8s ease;
  }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--space-crawl-scenery:none;}",
};
