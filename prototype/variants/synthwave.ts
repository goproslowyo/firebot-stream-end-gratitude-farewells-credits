import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. Synthwave — Night Drive: chrome VHS-logo titles over a neon roster crawling down an endless magenta grid toward a striped horizon sun. */
export const VARIANT: ThemeVariant = {
  key: "synthwave",
  name: "Synthwave — Night Drive",
  css: `/* ════════════════════════════════════════════════════════════════
   SYNTHWAVE — NIGHT DRIVE (layered AFTER the base sheet)
   Transparent collapse is ONE line (see transparentOverride):
   :root { --credits-bg: transparent; --synthwave-scenery: none; }
   ════════════════════════════════════════════════════════════════ */
@import url('https://fonts.googleapis.com/css2?family=Audiowide&family=Monoton&family=Orbitron:wght@500;700;900&display=swap');

:root {
  /* ── palette ── */
  --synthwave-magenta: #ff2d95;
  --synthwave-cyan: #5af7ff;
  --synthwave-text: #eaf6ff;
  --synthwave-scenery: block; /* set to none to strip every scenery layer */
  /* Chrome fills carry a tight hot-white specular band at the horizon flip — the
     glint that makes VHS-logo chrome read as polished metal. A hot top-edge
     highlight adds a second gleam. Static clip-text sheen → always flicker-safe. */
  --synthwave-chrome: linear-gradient(180deg,
      #ffffff 0%, #d6f4ff 12%, #8fdcff 34%, #ffffff 46%, #ffffff 49%,
      #241052 53%, #7a4fe0 67%, #ff8fce 87%, #ffe3f6 100%);
  --synthwave-chrome-gold: linear-gradient(180deg,
      #fffdf0 0%, #ffe98f 20%, #ffcb17 40%, #ffffff 47%, #ffffff 50%,
      #4e0b2c 53%, #ff2975 71%, #ffc1e3 100%);

  /* ── base hooks ── */
  --credits-color: var(--synthwave-text);
  --credits-accent: var(--synthwave-magenta);
  --credits-font: "Orbitron", "Verdana", "Segoe UI", sans-serif;
  --credits-title-font: "Audiowide", "Arial Black", "Trebuchet MS", sans-serif;
  --credits-title-size: clamp(1.7rem, 5vw, 3rem);
  --credits-name-size: clamp(1.05rem, 2.6vw, 1.55rem);
  --credits-flourish-title-size: clamp(2.4rem, 8vw, 5rem);
  --credits-block-gap: 5.25rem;
  --credits-name-gap: 0.55rem;
  --credits-shadow: 0 2px 14px rgba(5, 1, 15, 0.85);
  /* Glow no-op — NEVER "none": the base composes
     "text-shadow: var(--credits-glow), var(--credits-shadow)" and a "none"
     in a shadow list invalidates the whole declaration. All glow here is bespoke. */
  --credits-glow: 0 0 0 rgba(0, 0, 0, 0);

  /* ── night sky: stars ×3, horizon glow, hard hot-pink horizon at 62% ──
     Lives in --credits-bg so the base's html background paints it (and the
     one-line override kills it). */
  --credits-bg:
    radial-gradient(circle at 25% 35%, rgba(255,255,255,.9) 0 1px, transparent 2px) 0 0 / 260px 260px repeat,
    radial-gradient(circle at 75% 15%, rgba(255,255,255,.65) 0 1px, transparent 2px) 40px 90px / 190px 190px repeat,
    radial-gradient(circle at 55% 70%, rgba(185,103,255,.8) 0 1px, transparent 2px) 0 0 / 330px 330px repeat,
    radial-gradient(ellipse 90% 40% at 50% 62%, rgba(255,145,60,.34) 0%, rgba(255,60,140,.24) 34%, rgba(255,41,117,0) 66%) 0 0 / 100% 100% no-repeat,
    linear-gradient(180deg, #05010f 0%, #1b0b3a 30%, #4b1663 52%,
      #a1246b 61.6%, #ff2975 62%, #0d0221 62.15%) #0d0221;
}

/* ═══ scenery ═══ */
/* Scenery is full-bleed: drop the base edge-fade on html ONLY.
   body KEEPS the base mask so names still ease in/out at the edges. */
html { -webkit-mask-image: none; mask-image: none; }
/* Sky paints once, on html, behind the negative-z sun/grid pseudos. */
body { background: transparent; }

/* Grid floor STATICS: ground fill + vertical lines + cyan horizon edge.
   PINNED — paints once. The driving horizontal lines were split off to
   body::after so this huge layer never repaints (the old background-position
   loop here forced a full-surface repaint every frame). */
html::before {
  content: "";
  display: var(--synthwave-scenery, block);
  position: fixed;
  left: -70vw; right: -70vw;
  top: 62vh; height: 95vh;
  z-index: -1;
  pointer-events: none;
  transform-origin: top center;
  transform: perspective(340px) rotateX(60deg);
  border-top: 2px solid rgba(120, 250, 255, 0.9);
  box-shadow: 0 0 34px rgba(90, 247, 255, 0.65), 0 0 90px rgba(90,247,255,.28);
  background:
    /* vertical laser lines: a crisp magenta core riding a wider soft bloom, so
       each line reads as a glowing tube rather than a hairline mesh */
    repeating-linear-gradient(90deg, rgba(255,90,190,.95) 0 1.5px, transparent 1.5px 72px),
    repeating-linear-gradient(90deg, rgba(255,45,149,.32) 0 5px, transparent 5px 72px),
    /* bright cyan atmospheric wash pooling on the horizon edge, fading down */
    linear-gradient(180deg, rgba(90,247,255,.30) 0%, rgba(90,247,255,0) 9%),
    /* ground: atmospheric perspective — near-black far distance so lines pop */
    linear-gradient(180deg, #2a0b47 0%, #170733 26%, #0a0119 62%, #060011 100%);
}

/* Horizon sun with blind stripes (sets behind the grid's ground fill).
   Its halo lives in the html background radial — a box-shadow here would
   be clipped by the stripe mask. */
html::after {
  content: "";
  display: var(--synthwave-scenery, block);
  position: fixed;
  left: 50%; top: 62vh;
  width: 46vmin; height: 46vmin;
  z-index: -2;
  pointer-events: none;
  /* translateZ(0): the sun is a cached compositor texture — unpromoted it was
     repainted (gradient + blinds mask) inside the crawl's damage every frame. */
  transform: translate(-50%, -66%) translateZ(0);
  border-radius: 50%;
  /* Incandescent disc: a radial white-hot crown capping the visible top of the
     disc (static specular bloom baked into the material — always flicker-safe)
     over a clean, saturated vertical body that runs hot-yellow → gold → tangerine
     → coral → hot magenta. Tightened bands kill the old dingy-mustard upper third
     so it reads as a glowing light source, not a mud-ball. */
  background:
    /* tight specular gleam near the upper-left limb — a compact hot warm-white
       glint reading as a light source catching the sphere. Tight falloff keeps
       it a point (no soft oval bleeding into the mid-disc). Baked INTO the disc
       + masked with it, so it can never float off the sun. */
    radial-gradient(ellipse 15% 9% at 44% 12%,
      rgba(255,255,248,1) 0%, rgba(255,247,208,.5) 26%, rgba(255,236,160,0) 56%),
    /* broad incandescent crown — kept warm (pale gold, not white) so it lifts
       the top of the disc without greying the body */
    radial-gradient(ellipse 80% 46% at 50% 22%,
      rgba(255,246,200,.5) 0%, rgba(255,233,145,.28) 18%, rgba(255,214,90,0) 42%),
    linear-gradient(180deg,
      #fff6cc 0%, #ffe960 12%, #ffd23a 26%, #ff9a35 45%, #ff5f4a 61%,
      #ff2f75 76%, #e2118a 90%, #b60a76 100%);
  -webkit-mask-image: linear-gradient(180deg,
    #000 0 52%, transparent 52% 55.5%, #000 55.5% 65%, transparent 65% 69.5%,
    #000 69.5% 78%, transparent 78% 83.5%, #000 83.5% 90.5%,
    transparent 90.5% 96%, #000 96% 100%);
  mask-image: linear-gradient(180deg,
    #000 0 52%, transparent 52% 55.5%, #000 55.5% 65%, transparent 65% 69.5%,
    #000 69.5% 78%, transparent 78% 83.5%, #000 83.5% 90.5%,
    transparent 90.5% 96%, #000 96% 100%);
}

/* ── extra prop pseudos via the head void-element trick ──
   head + its meta/link children render nothing, so their ::before/::after give
   us up to 8 more fixed layers for scenery. All are static (no animation) and
   collapse with the scene via --synthwave-scenery. */
head { display: block; }
head meta { display: block; }

/* SUN BLOOM HALO — big soft radial behind the sun, UNMASKED so the stripe mask
   on html::after can't clip it (the old halo was a dim flat ellipse buried in
   --credits-bg). Coarse soft falloff, static → flicker-safe (L6d). z-index -3
   tucks it behind the sun disc (-2). */
head::before {
  content: "";
  display: var(--synthwave-scenery, block);
  position: fixed;
  left: 50%; top: 62vh;
  width: 92vmin; height: 92vmin;
  z-index: -3;
  pointer-events: none;
  transform: translate(-50%, -62%) translateZ(0);
  border-radius: 50%;
  background: radial-gradient(circle at 50% 44%,
    rgba(255,236,190,.55) 0%, rgba(255,150,70,.42) 16%, rgba(255,58,130,.34) 34%,
    rgba(217,17,138,.16) 52%, rgba(120,10,90,0) 70%);
}

/* HORIZON GLOW BAND — soft coarse bloom pooling on the 62vh line where the sun
   meets the grid, so the hard horizon edge dissolves into atmospheric haze.
   Full-bleed, static, wide soft falloff → flicker-safe. z-index -2 sits above
   the grid statics but below the sun disc region visually via blend of colours. */
head::after {
  content: "";
  display: var(--synthwave-scenery, block);
  position: fixed;
  left: 0; right: 0;
  top: 62vh; height: 30vh;
  z-index: -2;
  pointer-events: none;
  transform: translate(0, -50%) translateZ(0);
  background:
    radial-gradient(ellipse 60% 100% at 50% 50%,
      rgba(255,120,200,.30) 0%, rgba(160,60,200,.14) 40%, rgba(90,247,255,0) 72%),
    linear-gradient(180deg, rgba(90,247,255,0) 40%, rgba(120,250,255,.18) 50%, rgba(90,247,255,0) 60%);
}

/* ═══ SHINE & SPARKLE — all STATIC props, off the crawl lane (L6-safe) ═══ */

/* SKY CORNER GLINTS — two delicate soft star-blooms high in the sky corners,
   FAR off the center text lane. Mostly a soft round bloom with just a whisper of
   cross-flare (not clip-art crosshairs). >=40px soft falloff + static → L6a/c-safe.
   A couple of bright "hero stars" without any fine twinkle over the crawl. */
head meta:first-of-type::after {
  content: "";
  display: var(--synthwave-scenery, block);
  position: fixed;
  left: 13vw; top: 13vh;
  width: 84px; height: 84px;
  z-index: -3;
  pointer-events: none;
  transform: translate(-50%, -50%) translateZ(0);
  background:
    radial-gradient(circle at 50% 50%, rgba(232,250,255,.95) 0%, rgba(160,224,255,.35) 16%, rgba(120,200,255,0) 52%),
    linear-gradient(90deg, transparent 40%, rgba(210,244,255,.32) 49.5% 50.5%, transparent 60%),
    linear-gradient(180deg, transparent 40%, rgba(210,244,255,.32) 49.5% 50.5%, transparent 60%);
}
head meta:last-of-type::before {
  content: "";
  display: var(--synthwave-scenery, block);
  position: fixed;
  left: 87vw; top: 21vh;
  width: 66px; height: 66px;
  z-index: -3;
  pointer-events: none;
  transform: translate(-50%, -50%) translateZ(0);
  background:
    radial-gradient(circle at 50% 50%, rgba(255,220,246,.9) 0%, rgba(255,150,220,.3) 18%, rgba(255,120,200,0) 54%),
    linear-gradient(90deg, transparent 42%, rgba(255,204,240,.3) 49.5% 50.5%, transparent 58%),
    linear-gradient(180deg, transparent 42%, rgba(255,204,240,.3) 49.5% 50.5%, transparent 58%);
}

/* Midnight lane: center-column scrim. LOAD-BEARING READABILITY GUARD —
   the bright gold sun sits exactly behind the name column; do NOT remove
   this independently of the sun. It collapses only with the whole scene
   via the --synthwave-scenery kill-switch. */
body::before {
  content: "";
  display: var(--synthwave-scenery, block);
  position: fixed;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(90deg,
    transparent 6%, rgba(5,1,15,.42) 26%, rgba(5,1,15,.58) 50%,
    rgba(5,1,15,.42) 74%, transparent 94%);
}

/* Horizontal grid lines, driving toward the viewer — the ONE always-on loop.
   Compositor-only: the pattern paints once and the whole plane slides via
   transform (translate3d in the rotated plane's frame, exactly one 68px tile
   per loop, so the wrap is seamless). Same geometry as the html::before floor;
   the pseudo's top edge starts AT the horizon carrying the first line, so the
   growing strip above it during a cycle matches the old background-position
   phase exactly, and the bottom edge only ever slides past 95vh (extra
   coverage, never a gap). z-index -1 tucks it under the center-lane scrim
   (body::before, z auto) and the credits, while body itself paints over the
   html-level statics — i.e. between the static grid and the content. */
body::after {
  content: "";
  display: var(--synthwave-scenery, block);
  position: fixed;
  left: -70vw; right: -70vw;
  top: 62vh; height: 95vh;
  z-index: -1;
  pointer-events: none;
  transform-origin: top center;
  transform: perspective(340px) rotateX(60deg);
  /* crisp hot-magenta core riding a wider soft bloom band — same 68px period so
     the transform loop stays seamless. Reads as a glowing laser line, not a wire. */
  background:
    repeating-linear-gradient(180deg, rgba(255,120,205,1) 0 1.5px, transparent 1.5px 68px),
    repeating-linear-gradient(180deg, rgba(255,45,149,.34) 0 5px, transparent 5px 68px);
  will-change: transform;
  animation: synthwave-grid-drive 1.5s linear infinite;
}

/* ═══ chrome VHS-logo titles ═══ */
.credits-block__title {
  font-weight: 400; /* Audiowide has no bold — avoid faux-bold smear */
  letter-spacing: .1em;
  transform: skewX(-6deg);
  text-shadow: none; /* base glow would flood the transparent clipped fill */
  background-image: var(--synthwave-chrome);
  background-size: 100% 230%;
  background-position: 50% 14%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  filter: drop-shadow(0 3px 0 rgba(13,2,33,.9)) drop-shadow(0 0 16px rgba(255,45,149,.4));
}

.flourish__title {
  font-weight: 400;
  letter-spacing: .06em;
  line-height: .98;
  transform: skewX(-6deg);
  text-shadow: none;
  background-image: var(--synthwave-chrome);
  background-size: 100% 230%;
  background-position: 50% 14%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  filter: drop-shadow(0 4px 0 rgba(13,2,33,.9)) drop-shadow(0 0 22px rgba(255,45,149,.45));
}

/* If clip:text is unsupported, fall back to solid neon-pink type. */
@supports not (-webkit-background-clip: text) {
  .credits-block__title, .flourish__title {
    background: none;
    color: #ffd9f2;
    -webkit-text-fill-color: currentColor;
  }
}

/* Cyan laser rule replaces the base gold underline. */
.credits-block__title::after {
  width: min(300px, 60vw);
  height: 3px;
  margin: .85rem auto 0;
  border-radius: 2px;
  opacity: 1;
  background: linear-gradient(90deg, transparent, var(--synthwave-cyan) 18% 82%, transparent);
  box-shadow: 0 0 14px rgba(90,247,255,.7);
}

/* ═══ neon roster rows: fixed centered measure, amounts right ═══ */
.credit {
  display: flex;
  align-items: baseline;
  width: min(34rem, 86vw);
  margin-inline: auto;
  text-align: left;
}

.credit__name {
  margin-right: auto;
  padding-right: 1rem;
  min-width: 0;
  overflow-wrap: anywhere; /* long usernames wrap — never clip */
  font-weight: 500;
  letter-spacing: .05em;
  color: #f2fbff;
  text-shadow: 0 0 8px rgba(90,247,255,.5), 0 0 26px rgba(90,247,255,.22), var(--credits-shadow);
}

.credit__amount {
  flex-shrink: 0;
  opacity: 1;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--synthwave-cyan);
  text-shadow: 0 0 10px rgba(90,247,255,.6), var(--credits-shadow);
}
.credit__amount::before { content: ""; } /* kill base " · " */

/* ═══ flourish cards ═══ */
/* Badge → VHS label (copy swap via font-size:0 + ::after). */
.flourish__badge { font-size: 0; border: 0; padding: 0; box-shadow: none; border-radius: 0; }
.flourish__badge::after {
  content: "A SYNTHWAVE ORIGINAL";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: .8rem;
  line-height: 1;
  letter-spacing: .42em;
  padding: .55rem 1rem .55rem 1.4rem;
  color: var(--synthwave-cyan);
  border: 1px solid rgba(90,247,255,.55);
  box-shadow: 0 0 16px rgba(90,247,255,.35), inset 0 0 12px rgba(90,247,255,.12);
}

/* Tagline: restyle ONLY — the intro tagline is streamer-configurable copy. */
.flourish__tagline {
  font-style: normal;
  text-transform: uppercase;
  letter-spacing: .34em;
  font-size: .95rem;
  color: #cfe9ff;
  opacity: .9;
}

/* Rating → VHS on-screen display (copy swap). */
.flourish__rating { font-size: 0; border: 0; padding: 0; opacity: 1; }
.flourish__rating::after {
  content: "▶ PLAY · SP · 00:00:00";
  font-family: var(--credits-font);
  font-weight: 500;
  font-size: .85rem;
  letter-spacing: .3em;
  color: #dff4ff;
  text-shadow: 0 0 10px rgba(90,247,255,.5);
}

/* Intro speed-rule bars — a designed neon divider, not stray hairlines.
   A bright white-hot core line flanked by magenta glow rails and a fading
   cyan echo, with a soft bloom. Reads as a "night drive" light streak framing
   the title. Static → flicker-safe. */
.flourish--intro::before,
.flourish--intro::after {
  content: "";
  display: var(--synthwave-scenery, block);
  width: min(560px, 82vw);
  height: 16px;
  background:
    /* hot white-cyan core */
    linear-gradient(90deg, transparent 4%, rgba(220,252,255,.98) 26% 74%, transparent 96%) 0 6px  / 100% 3px no-repeat,
    /* magenta over-rail */
    linear-gradient(90deg, transparent 10%, rgba(255,60,170,.9)  24% 76%, transparent 90%) 0 2px  / 100% 2px no-repeat,
    /* magenta under-rail */
    linear-gradient(90deg, transparent 10%, rgba(255,60,170,.9)  24% 76%, transparent 90%) 0 11px / 100% 2px no-repeat,
    /* cyan distance echo */
    linear-gradient(90deg, transparent 18%, rgba(90,247,255,.5)  30% 70%, transparent 82%) 0 14px / 100% 2px no-repeat;
  filter: drop-shadow(0 0 8px rgba(255,60,170,.7)) drop-shadow(0 0 14px rgba(90,247,255,.4));
}

/* Outro: "The End" → neon-tube END OF THE LINE (copy swap, Monoton). */
.flourish--outro .flourish__title {
  font-size: 0;
  transform: none;
  background: none;
  filter: none;
}
.flourish--outro .flourish__title::after {
  content: "END OF THE LINE";
  font-family: "Monoton", "Audiowide", "Arial Black", sans-serif;
  font-weight: 400; /* Monoton has no bold — faux-bold smears the tube lines */
  font-size: var(--credits-flourish-title-size);
  line-height: 1.1;
  letter-spacing: .08em;
  color: var(--synthwave-magenta);
  -webkit-text-fill-color: var(--synthwave-magenta); /* parent fill is transparent + inherited */
  text-shadow: 0 0 10px rgba(255,45,149,.9), 0 0 38px rgba(255,45,149,.5), 0 0 90px rgba(255,45,149,.3);
}
.flourish--outro .flourish__tagline { font-size: 0; }
.flourish--outro .flourish__tagline::after {
  content: "SEE YOU ON THE HORIZON";
  font-size: .95rem;
  letter-spacing: .34em;
}

/* ═══ raid finale ═══
   .credits-block:last-of-type matches NOTHING — every sibling is a <section>
   and the outro flourish is last. Raids are always SECOND from last; in
   slideshow mode block sections carry only .credits-slide. */
.credits-block:nth-last-of-type(2) .credits-block__title,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
  background-image: var(--synthwave-chrome-gold);
}
.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  content: "FINAL STAGE";
  display: block;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: .78rem;
  letter-spacing: .55em;
  margin-bottom: .7rem;
  color: var(--synthwave-cyan);
  -webkit-text-fill-color: var(--synthwave-cyan); /* re-opaque inside chrome parent */
  text-shadow: 0 0 12px rgba(90,247,255,.75);
}
.credits-block:nth-last-of-type(2) .credits-block__title::after,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::after {
  box-shadow: 0 0 20px rgba(90,247,255,.9), 0 0 42px rgba(255,45,149,.4); /* hotter, static */
}
.credits-block:nth-last-of-type(2) .credit,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit {
  font-size: calc(var(--credits-name-size) * 1.12);
}
.credits-block:nth-last-of-type(2) .credit__name,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__name {
  text-shadow: 0 0 10px rgba(90,247,255,.75), 0 0 30px rgba(255,45,149,.35), var(--credits-shadow);
}

/* ═══ slideshow: zoom-pop layered onto the base fade ═══ */
.credits-slide {
  transform: scale(.965);
  transition: opacity .8s ease, transform .8s cubic-bezier(.22, 1, .36, 1);
}
.credits-slide.is-active { transform: scale(1); }

/* ═══ keyframes ═══
   Transform-only (compositor) drive: slides the horizontal-line plane
   (body::after) one 68px tile down-plane per loop — same apparent motion and
   speed as the old background-position loop, zero repaint. The
   perspective/rotateX prefix must match the pseudo's static transform so only
   the trailing translate3d varies. */
@keyframes synthwave-grid-drive {
  from { transform: perspective(340px) rotateX(60deg) translate3d(0, 0, 0); }
  to   { transform: perspective(340px) rotateX(60deg) translate3d(0, 68px, 0); }
}

@media (prefers-reduced-motion: reduce) {
  body::after { animation: none; } /* park the grid drive */
  .credits-slide { transform: none; transition: opacity .8s ease; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--synthwave-scenery:none;}",
};
