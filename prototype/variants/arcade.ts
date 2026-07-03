import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. Arcade: CRT high-score attract mode — ranked neon scoreboards, INSERT COIN, GAME OVER. */
export const VARIANT: ThemeVariant = {
  key: "arcade",
  name: "Arcade",
  css: `
/* ==========================================================================
   ARCADE — CRT high-score attract mode. Layered AFTER the base stylesheet.
   Transparent collapse (one line): :root { --credits-bg: transparent; --arcade-scenery: none; }
   ========================================================================== */

/* Harness hoists this to the top of the composed sheet; @font-face below is
   the load-bearing copy for contexts where a late @import is ignored. */
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

@font-face {
  font-family: "Press Start 2P";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("https://fonts.gstatic.com/s/pressstart2p/v15/e3t4euO8T-267oIAQAu6jDQyK3nVivM.woff2") format("woff2");
}

:root {
  --credits-color: #eaf6ff;
  --credits-accent: #ffe600;
  --credits-font: "Press Start 2P", "Courier New", ui-monospace, monospace;
  --credits-title-font: "Press Start 2P", "Courier New", ui-monospace, monospace;
  --credits-title-size: clamp(1rem, 2.6vw, 1.5rem);
  /* Critic fix: cap raised to 1.3rem — 18px Press Start 2P under scanlines at
     70px/s is this set's readability floor. */
  --credits-name-size: clamp(0.85rem, 2.1vw, 1.3rem);
  --credits-flourish-title-size: clamp(1.5rem, 5.5vw, 3rem);
  --credits-block-gap: 4.25rem;
  --credits-name-gap: 0.8rem;
  --credits-shadow: 2px 2px 0 rgba(2, 4, 12, 0.9); /* hard pixel drop */
  /* To zero this glow use 0 0 0 rgba(0,0,0,0) — NEVER "none": the base composes
     "text-shadow: var(--credits-glow), var(--credits-shadow)" and "none" in a
     shadow list invalidates the whole declaration. */
  --credits-glow: 0 0 22px rgba(255, 230, 0, 0.35);

  /* Arcade knobs. --arcade-crt: 0 kills scanlines + vignette entirely; 1 is
     full cabinet glass. 0.35 ships as the readable default. */
  --arcade-crt: 0.35;
  --arcade-panel-w: min(740px, 90vw);
  --block-accent: #ffe600; /* cycled per section below */
  --block-glow: rgba(255, 230, 0, 0.45);

  /* Scenery: deep arcade hall — a warm marquee-bloom horizon, sparse phosphor
     stars up high, and a grounded neon floor-glow, painted by the base's
     "background: var(--credits-bg)" on <html>; body is made transparent.
     The floor lattice + cabinet furniture live on promoted fixed pseudos below. */
  --credits-bg:
    radial-gradient(circle at 26% 24%, rgba(255, 255, 255, 0.55) 1px, transparent 1.9px) 0 0 / 240px 210px repeat,
    radial-gradient(circle at 72% 58%, rgba(150, 185, 255, 0.32) 1px, transparent 1.7px) 61px 83px / 330px 280px repeat,
    radial-gradient(150% 70% at 50% 118%, rgba(120, 60, 220, 0.35) 0%, rgba(60, 26, 120, 0.14) 34%, transparent 60%) center / 100% 100% no-repeat,
    radial-gradient(115% 46% at 50% 30%, rgba(255, 180, 40, 0.16) 0%, rgba(255, 120, 40, 0.06) 40%, transparent 70%) center / 100% 100% no-repeat,
    radial-gradient(135% 92% at 50% 40%, #22163f 0%, #120d28 46%, #08081a 74%, #040510 100%) center / 100% 100% no-repeat #04040d;
}

/* Base fades <html> AND <body>. Un-mask html so scenery runs full-bleed; keep
   a harder readability fade on body only (names still ease in/out). */
html {
  -webkit-mask-image: none;
  mask-image: none;
}
body {
  background: transparent; /* scenery paints once, on the root canvas */
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 7%, #000 93%, transparent 100%);
  mask-image: linear-gradient(to bottom, transparent 0, #000 7%, #000 93%, transparent 100%);
}

/* Scanlines ride the CONTENT, not the glass (flicker root-cause fix: screen-
   fixed fine lines slide across eye-tracked crawling text at ~20Hz — a strobe
   painted onto the names; attached to the roll they move with the text, and
   the translation-invariant pattern looks identical in stills). Static — the
   old rare flicker would damage the crawl's cached texture from inside. */
.credits-roll::before,
.credits-slideshow::before {
  content: "";
  display: var(--arcade-scenery, block);
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  opacity: calc(var(--arcade-crt) * 0.55);
  background: repeating-linear-gradient(0deg, rgba(4, 6, 14, 0.3) 0 2px, transparent 2px 5px);
}

/* CRT glass — child of <html>, so the body mask never fades it and body
   transforms can't reparent it. Collapses via --arcade-scenery. */
html::after { /* vignette + rounded CRT bezel corners */
  content: "";
  display: var(--arcade-scenery, block);
  position: fixed;
  inset: 0;
  z-index: 4;
  pointer-events: none;
  opacity: var(--arcade-crt);
  box-shadow: inset 0 0 170px rgba(2, 3, 10, 0.72);
  background:
    radial-gradient(circle 26px at 26px 26px, transparent 25px, #02030a 26px) left top / 26px 26px no-repeat,
    radial-gradient(circle 26px at 0 26px, transparent 25px, #02030a 26px) right top / 26px 26px no-repeat,
    radial-gradient(circle 26px at 26px 0, transparent 25px, #02030a 26px) left bottom / 26px 26px no-repeat,
    radial-gradient(circle 26px at 0 0, transparent 25px, #02030a 26px) right bottom / 26px 26px no-repeat;
}

/* ==========================================================================
   ARCADE HALL SCENERY — grounded cabinet environment on promoted fixed pseudos.
   All static (L1/L2/L4): the room never moves; only names crawl. Every layer
   collapses through display: var(--arcade-scenery, block). translateZ(0) promotes
   so the crawl composites cleanly above them. Kill-switch: --arcade-scenery: none.
   ========================================================================== */

/* Grounded neon FLOOR — a perspective lattice fading up to a horizon light-pool.
   This is the biggest fix for the dead void: it plants the room on a floor and
   gives the lower frame a receding arcade-hall depth. Static; COARSE glow only. */
html::before {
  content: "";
  display: var(--arcade-scenery, block);
  position: fixed;
  left: 0; right: 0; bottom: 0;
  height: 52vh;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* horizon light-pool where floor meets the room (coarse, soft) */
    radial-gradient(130% 90% at 50% 100%, rgba(130, 75, 245, 0.38) 0%, rgba(80, 34, 165, 0.16) 40%, transparent 70%) center bottom / 100% 100% no-repeat,
    /* horizontal floor rungs — bright near the camera, packed toward the horizon */
    linear-gradient(to top, rgba(0, 229, 255, 0.22) 0 2px, transparent 2px 10.5%, rgba(0, 229, 255, 0.18) 10.5% calc(10.5% + 2px), transparent calc(10.5% + 2px) 24%, rgba(120, 90, 255, 0.16) 24% calc(24% + 2px), transparent calc(24% + 2px) 42%, rgba(255, 60, 140, 0.14) 42% calc(42% + 2px), transparent calc(42% + 2px) 64%, rgba(255, 60, 140, 0.11) 64% calc(64% + 2px), transparent 64%) center bottom / 100% 100% no-repeat,
    /* receding perspective lines: converge to a vanishing point above the frame */
    conic-gradient(from 180deg at 50% -14%, transparent 0deg, transparent 27deg, rgba(0, 229, 255, 0.30) 27.5deg, transparent 28deg, transparent 30deg, rgba(0, 229, 255, 0.24) 30.5deg, transparent 31deg, transparent 33.5deg, rgba(120, 100, 255, 0.20) 34deg, transparent 34.5deg, transparent 37deg, rgba(255, 40, 130, 0.22) 37.5deg, transparent 38deg, transparent 40.5deg, rgba(255, 40, 130, 0.28) 41deg, transparent 41.5deg, transparent 180deg) center bottom / 100% 100% no-repeat,
    /* floor tint fading up to transparent */
    linear-gradient(to top, rgba(34, 18, 74, 0.6) 0%, rgba(22, 13, 52, 0.22) 46%, transparent 100%) center bottom / 100% 100% no-repeat;
  -webkit-mask-image: linear-gradient(to top, #000 0%, #000 44%, transparent 100%);
  mask-image: linear-gradient(to top, #000 0%, #000 44%, transparent 100%);
}

/* Left & right CABINET COLUMNS — glowing arcade-machine silhouettes framing the
   hall, each with a lit marquee band up top and a neon side-tube. Static SVG,
   one unbroken data-URI line each. Sits behind content (z-index 0). */
body::before, body::after {
  content: "";
  display: var(--arcade-scenery, block);
  position: fixed;
  top: 0; bottom: 0;
  width: min(20vw, 320px);
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  background-repeat: no-repeat;
  background-position: bottom center;
  background-size: 100% auto;
  opacity: 0.9;
}
body::before {
  left: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='1080' viewBox='0 0 320 1080' preserveAspectRatio='xMinYMax meet'%3E%3Cdefs%3E%3ClinearGradient id='cab' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%230e0724'/%3E%3Cstop offset='0.6' stop-color='%231d1140'/%3E%3Cstop offset='0.86' stop-color='%23241650'/%3E%3Cstop offset='1' stop-color='%2308041c'/%3E%3C/linearGradient%3E%3ClinearGradient id='scr' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%2300e5ff' stop-opacity='0.5'/%3E%3Cstop offset='0.5' stop-color='%23b967ff' stop-opacity='0.32'/%3E%3Cstop offset='1' stop-color='%23ff2079' stop-opacity='0.3'/%3E%3C/linearGradient%3E%3ClinearGradient id='mar' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23ffe600' stop-opacity='0.5'/%3E%3Cstop offset='1' stop-color='%23ff7a28' stop-opacity='0.28'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg%3E%3C!--body--%3E%3Cpath d='M-40 250 L200 250 L232 300 L232 1080 L-40 1080 Z' fill='url(%23cab)'/%3E%3Cpath d='M-40 250 L200 250 L232 300 L232 1080' fill='none' stroke='%2300e5ff' stroke-opacity='0.4' stroke-width='3'/%3E%3C!--marquee header--%3E%3Crect x='-40' y='250' width='240' height='58' fill='url(%23mar)'/%3E%3Crect x='-40' y='250' width='240' height='58' fill='none' stroke='%23ffe600' stroke-opacity='0.55' stroke-width='2'/%3E%3C!--marquee gleam (static specular streak)--%3E%3Cpath d='M20 250 L64 250 L34 308 L-10 308 Z' fill='%23fff' fill-opacity='0.22'/%3E%3C!--bezel + screen--%3E%3Crect x='16' y='336' width='200' height='250' rx='12' fill='%23050414' stroke='%2300e5ff' stroke-opacity='0.3' stroke-width='3'/%3E%3Crect x='34' y='356' width='164' height='210' rx='6' fill='url(%23scr)'/%3E%3C!--screen scanlines--%3E%3Cg stroke='%23000' stroke-opacity='0.25' stroke-width='2'%3E%3Cline x1='34' y1='372' x2='198' y2='372'/%3E%3Cline x1='34' y1='396' x2='198' y2='396'/%3E%3Cline x1='34' y1='420' x2='198' y2='420'/%3E%3Cline x1='34' y1='444' x2='198' y2='444'/%3E%3Cline x1='34' y1='468' x2='198' y2='468'/%3E%3Cline x1='34' y1='492' x2='198' y2='492'/%3E%3Cline x1='34' y1='516' x2='198' y2='516'/%3E%3Cline x1='34' y1='540' x2='198' y2='540'/%3E%3C/g%3E%3C!--CRT glass specular highlight--%3E%3Cellipse cx='72' cy='388' rx='42' ry='26' fill='%23fff' fill-opacity='0.14'/%3E%3C!--control deck--%3E%3Cpath d='M4 636 L232 636 L232 720 L4 700 Z' fill='%23150c33' stroke='%23ff2079' stroke-opacity='0.35' stroke-width='2'/%3E%3Crect x='150' y='648' width='70' height='16' rx='4' fill='%23ff2079' fill-opacity='0.45'/%3E%3Ccircle cx='60' cy='674' r='15' fill='%23ff3b30' fill-opacity='0.6'/%3E%3Ccircle cx='102' cy='678' r='15' fill='%2339ff14' fill-opacity='0.55'/%3E%3Ccircle cx='60' cy='674' r='15' fill='none' stroke='%23fff' stroke-opacity='0.3'/%3E%3C!--joystick--%3E%3Cline x1='150' y1='690' x2='150' y2='662' stroke='%23e9edf6' stroke-opacity='0.5' stroke-width='5'/%3E%3Ccircle cx='150' cy='658' r='11' fill='%23ff3b30' fill-opacity='0.7'/%3E%3C!--base plinth glow--%3E%3Crect x='-40' y='980' width='272' height='100' fill='%2300e5ff' fill-opacity='0.06'/%3E%3Crect x='224' y='300' width='8' height='780' fill='%2300e5ff' fill-opacity='0.55'/%3E%3C/g%3E%3C/svg%3E");
  -webkit-mask-image: linear-gradient(to top, #000 0%, #000 74%, transparent 100%);
  mask-image: linear-gradient(to top, #000 0%, #000 74%, transparent 100%);
}
body::after {
  right: 0;
  transform: translateZ(0) scaleX(-1);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='1080' viewBox='0 0 320 1080' preserveAspectRatio='xMinYMax meet'%3E%3Cdefs%3E%3ClinearGradient id='cab2' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%230e0724'/%3E%3Cstop offset='0.6' stop-color='%231d1140'/%3E%3Cstop offset='0.86' stop-color='%23241650'/%3E%3Cstop offset='1' stop-color='%2308041c'/%3E%3C/linearGradient%3E%3ClinearGradient id='scr2' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23b967ff' stop-opacity='0.5'/%3E%3Cstop offset='0.5' stop-color='%23ff9f0a' stop-opacity='0.3'/%3E%3Cstop offset='1' stop-color='%23ffe600' stop-opacity='0.3'/%3E%3C/linearGradient%3E%3ClinearGradient id='mar2' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23b967ff' stop-opacity='0.5'/%3E%3Cstop offset='1' stop-color='%23ff2079' stop-opacity='0.28'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg%3E%3Cpath d='M-40 250 L200 250 L232 300 L232 1080 L-40 1080 Z' fill='url(%23cab2)'/%3E%3Cpath d='M-40 250 L200 250 L232 300 L232 1080' fill='none' stroke='%23b967ff' stroke-opacity='0.4' stroke-width='3'/%3E%3Crect x='-40' y='250' width='240' height='58' fill='url(%23mar2)'/%3E%3Crect x='-40' y='250' width='240' height='58' fill='none' stroke='%23b967ff' stroke-opacity='0.55' stroke-width='2'/%3E%3Cpath d='M20 250 L64 250 L34 308 L-10 308 Z' fill='%23fff' fill-opacity='0.22'/%3E%3Crect x='16' y='336' width='200' height='250' rx='12' fill='%23050414' stroke='%23b967ff' stroke-opacity='0.3' stroke-width='3'/%3E%3Crect x='34' y='356' width='164' height='210' rx='6' fill='url(%23scr2)'/%3E%3Cg stroke='%23000' stroke-opacity='0.25' stroke-width='2'%3E%3Cline x1='34' y1='372' x2='198' y2='372'/%3E%3Cline x1='34' y1='396' x2='198' y2='396'/%3E%3Cline x1='34' y1='420' x2='198' y2='420'/%3E%3Cline x1='34' y1='444' x2='198' y2='444'/%3E%3Cline x1='34' y1='468' x2='198' y2='468'/%3E%3Cline x1='34' y1='492' x2='198' y2='492'/%3E%3Cline x1='34' y1='516' x2='198' y2='516'/%3E%3Cline x1='34' y1='540' x2='198' y2='540'/%3E%3C/g%3E%3Cellipse cx='72' cy='388' rx='42' ry='26' fill='%23fff' fill-opacity='0.14'/%3E%3Cpath d='M4 636 L232 636 L232 720 L4 700 Z' fill='%23150c33' stroke='%23ff9f0a' stroke-opacity='0.35' stroke-width='2'/%3E%3Crect x='150' y='648' width='70' height='16' rx='4' fill='%23ffe600' fill-opacity='0.45'/%3E%3Ccircle cx='60' cy='674' r='15' fill='%23ff9f0a' fill-opacity='0.6'/%3E%3Ccircle cx='102' cy='678' r='15' fill='%23ffe600' fill-opacity='0.55'/%3E%3Cline x1='150' y1='690' x2='150' y2='662' stroke='%23e9edf6' stroke-opacity='0.5' stroke-width='5'/%3E%3Ccircle cx='150' cy='658' r='11' fill='%23b967ff' fill-opacity='0.7'/%3E%3Crect x='224' y='300' width='8' height='780' fill='%23b967ff' fill-opacity='0.55'/%3E%3C/g%3E%3C/svg%3E");
  -webkit-mask-image: linear-gradient(to top, #000 0%, #000 74%, transparent 100%);
  mask-image: linear-gradient(to top, #000 0%, #000 74%, transparent 100%);
}

/* TOP MARQUEE BAR — a lit header strip across the top of the hall, like the
   backlit sign over a bank of cabinets. Uses head::before (head made block). */
head { display: block; }
head::before {
  content: "";
  display: var(--arcade-scenery, block);
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 74px;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  background:
    linear-gradient(180deg, rgba(255, 230, 0, 0.14) 0%, rgba(255, 120, 40, 0.06) 55%, transparent 100%) center top / 100% 100% no-repeat,
    repeating-linear-gradient(90deg, rgba(255, 230, 0, 0.5) 0 5px, transparent 5px 22px) center top / 100% 5px no-repeat;
  -webkit-mask-image: radial-gradient(120% 100% at 50% 0%, #000 40%, transparent 85%);
  mask-image: radial-gradient(120% 100% at 50% 0%, #000 40%, transparent 85%);
  opacity: var(--arcade-crt, 0.35);
}

/* --- Per-section hue cycling. nth-of-type counts ALL <section>s: intro = 1,
   first block = 2; 6n+2..6n+7 covers every residue. Works in both modes
   (.credits-block in scroll, .credits-slide in slideshow). --- */
.credits-block:nth-of-type(6n + 2), .credits-slide:nth-of-type(6n + 2) { --block-accent: #00e5ff; --block-glow: rgba(0, 229, 255, 0.45); }
.credits-block:nth-of-type(6n + 3), .credits-slide:nth-of-type(6n + 3) { --block-accent: #ff2079; --block-glow: rgba(255, 32, 121, 0.45); }
.credits-block:nth-of-type(6n + 4), .credits-slide:nth-of-type(6n + 4) { --block-accent: #ffe600; --block-glow: rgba(255, 230, 0, 0.45); }
.credits-block:nth-of-type(6n + 5), .credits-slide:nth-of-type(6n + 5) { --block-accent: #39ff14; --block-glow: rgba(57, 255, 20, 0.4); }
.credits-block:nth-of-type(6n + 6), .credits-slide:nth-of-type(6n + 6) { --block-accent: #ff9f0a; --block-glow: rgba(255, 159, 10, 0.45); }
.credits-block:nth-of-type(6n + 7), .credits-slide:nth-of-type(6n + 7) { --block-accent: #b967ff; --block-glow: rgba(185, 103, 255, 0.45); }

/* --- Section titles: neon pixel caps + chunky dash rule --- */
.credits-block__title {
  color: var(--block-accent);
  letter-spacing: 0.06em;
  line-height: 1.4;
  text-shadow: 2px 2px 0 rgba(2, 4, 12, 0.95), 0 0 18px var(--block-glow);
  margin: 0 0 1.1rem;
}
.credits-block__title::after { /* base gold rule -> chunky pixel dashes */
  width: 8rem;
  height: 6px;
  margin: 0.85rem auto 0;
  opacity: 1;
  background: repeating-linear-gradient(90deg, var(--block-accent) 0 10px, transparent 10px 18px);
}

/* --- High-score panel (on the LIST: exists in scroll AND slideshow) ---
   Rebuilt from a flat black slab into lit CRT glass: a diagonal sheen sweep
   (top-left specular), a phosphor scanline sheen baked into the glass, and a
   pooled block-glow behind it. All static — L6-safe (baked highlights on a
   prop). The corner spark lives on ::before. --- */
.credits-block__list {
  position: relative;
  counter-reset: arcade-rank;
  width: var(--arcade-panel-w);
  box-sizing: border-box;
  padding: 1.1rem 1.3rem;
  background:
    /* diagonal glass sheen — bright top-left falling off (specular) */
    linear-gradient(135deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.03) 16%, transparent 34%) center / 100% 100% no-repeat,
    /* faint phosphor scanline sheen baked into the glass (static, part of texture) */
    repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.018) 0 2px, transparent 2px 4px) center / 100% 100% no-repeat,
    /* accent wash pooling from the top of the screen glass */
    linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, transparent 22%) center / 100% 100% no-repeat,
    linear-gradient(180deg, rgba(6, 9, 20, 0.82) 0%, rgba(3, 5, 12, 0.88) 100%) center / 100% 100% no-repeat;
  border: 3px solid var(--block-accent);
  border-radius: 3px;
  box-shadow: 0 0 0 6px rgba(2, 3, 10, 0.85), 0 0 30px var(--block-glow), 0 12px 40px rgba(0, 0, 0, 0.5), inset 0 0 26px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.14);
}
/* Static specular SPARKLE on the panel's top-left corner — a coarse 4-point
   glint on the glass/bezel. Baked highlight on a prop => always L6-safe. */
.credits-block__list::before {
  content: "";
  position: absolute;
  top: -7px; left: -7px;
  width: 46px; height: 46px;
  pointer-events: none;
  z-index: 2;
  background:
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.5) 12%, transparent 30%) center / 100% 100% no-repeat,
    linear-gradient(90deg, transparent 47%, rgba(255, 255, 255, 0.75) 50%, transparent 53%) center / 100% 100% no-repeat,
    linear-gradient(0deg, transparent 47%, rgba(255, 255, 255, 0.75) 50%, transparent 53%) center / 100% 100% no-repeat;
  filter: drop-shadow(0 0 4px var(--block-glow));
}

/* --- Rows: [01] NAME ............... 500 PTS --- */
.credit {
  counter-increment: arcade-rank;
  display: flex;
  align-items: center;
  text-align: left;
  line-height: 1.6;
  padding: 0.22em 0.5em;
}
.credit:nth-child(even) { background: rgba(125, 249, 255, 0.05); }
.credit::before { /* rank 01, 02, 03... */
  content: counter(arcade-rank, decimal-leading-zero);
  min-width: 2ch;
  margin-right: 1ch;
  font-size: 0.72em;
  color: var(--block-accent);
  text-shadow: var(--credits-shadow);
}
.credit__name { /* sacred: wraps, never clips */
  min-width: 0;
  overflow-wrap: anywhere;
}
.credit::after { /* dotted pixel leader; doubles as the 1UP slot */
  content: "";
  order: 1;
  flex: 1 1 2ch;
  min-width: 2ch;
  margin: 0 1ch;
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 0.6em;
  letter-spacing: 0.08em;
  color: var(--block-accent);
  background: repeating-linear-gradient(90deg, rgba(146, 156, 199, 0.65) 0 4px, transparent 4px 11px) left center / 100% 4px no-repeat;
}
/* Amount-less rows (mods/VIPs/subs/follows): leader ends in a static 1UP.
   (No blink — decorative loops never sit on name rows.) Without :has()
   support this degrades to a plain full dotted leader. */
.credit:not(:has(.credit__amount))::after {
  content: "1UP";
  background-size: calc(100% - 5ch) 4px;
}
.credit__amount {
  order: 2;
  opacity: 1;
  font-size: 0.9em;
  color: var(--block-accent);
  text-shadow: var(--credits-shadow), 0 0 12px var(--block-glow);
}
.credit__amount::before { content: none; } /* kill base " · " */
.credit__amount::after { /* score suffix — delete this rule if off-vibe */
  content: " PTS";
  font-size: 0.55em;
  letter-spacing: 0.12em;
  opacity: 0.75;
}

/* --- Raid finale (crescendo): the outro flourish is the true last sibling,
   so the raids block is second-to-last in both modes. --- */
.credits-block:nth-last-of-type(2),
.credits-slide:nth-last-of-type(2):not(.flourish) {
  --block-accent: #ff3b30;
  --block-glow: rgba(255, 59, 48, 0.55);
}
.credits-block:nth-last-of-type(2) .credits-block__list,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__list {
  animation: arcade-raid-alert 0.9s steps(1, end) infinite; /* siren border, 2 paints/sec */
}
.credits-block:nth-last-of-type(2) .credits-block__list::after,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__list::after {
  content: "!! BONUS STAGE — THANK YOU RAIDERS !!";
  margin-top: 0.9rem;
  text-align: center;
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  color: #ff3b30;
  text-shadow: var(--credits-shadow), 0 0 14px rgba(255, 59, 48, 0.6);
  animation: arcade-blink 1.2s steps(1, end) infinite;
}

/* --- Intro flourish: coin-slot chip + marquee logo (title/tagline text stays
   real, user-configurable — restyled only) --- */
.flourish { gap: 1.4rem; }
/* COIN-SLOT CHIP — rebuilt from a hollow box into a real chrome coin door with
   a milled slot mouth (::before) and blinking "INSERT COIN" plate (::after).
   The slot has a beveled metal rim + dark mouth; a static specular glint sits on
   the chrome (L6-safe: baked highlight on a prop). */
.flourish__badge {
  position: relative;
  font-size: 0;
  border: 3px solid #ffe600;
  border-radius: 4px;
  padding: 1.5rem 1.4rem 0.85rem;
  background:
    linear-gradient(150deg, rgba(255, 255, 255, 0.10) 0%, transparent 30%) center / 100% 100% no-repeat,
    linear-gradient(180deg, rgba(20, 24, 44, 0.92) 0%, rgba(5, 7, 16, 0.92) 100%) center / 100% 100% no-repeat;
  box-shadow: 0 0 0 6px rgba(2, 3, 10, 0.9), 0 0 26px rgba(255, 230, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.18);
}
.flourish__badge::before { /* milled coin slot: chrome bezel + dark mouth + coin */
  content: "";
  display: block;
  width: 2.6rem;
  height: 0.72rem;
  margin: 0 auto 0.7rem;
  border-radius: 3px;
  background:
    /* static specular glint on the chrome rim (L6-safe baked highlight) */
    radial-gradient(circle at 30% 22%, rgba(255, 255, 255, 0.9) 0%, transparent 42%) 0 0 / 100% 100% no-repeat,
    /* dark slot mouth */
    linear-gradient(180deg, #01020a 0%, #10121e 55%, #01020a 100%) center / 62% 46% no-repeat,
    /* brushed chrome bezel */
    linear-gradient(180deg, #e9edf6 0%, #9aa2b8 42%, #5b6178 60%, #cfd6e6 100%) center / 100% 100% no-repeat;
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.6), 0 0 10px rgba(180, 200, 255, 0.35);
}
.flourish__badge::after {
  content: "INSERT COIN";
  font-size: 0.8rem;
  letter-spacing: 0.18em; /* restated: em-tracking computes to 0 on the 0-size parent */
  color: #ffe600;
  text-shadow: 0 0 10px rgba(255, 230, 0, 0.55);
  animation: arcade-blink 1.1s steps(1, end) infinite;
}
/* MARQUEE HOUSING — the show name now sits inside a backlit marquee frame: a
   chrome top/bottom rail + coarse backlight bloom behind the real title text,
   plus a row of running marquee bulbs (title::after, intro-only so it never
   collides with the outro's GAME OVER ::after). Static; all L6-safe. */
.flourish__title { /* show name stays real: arcade block letters, marquee-lit */
  position: relative;
  line-height: 1.3;
  letter-spacing: 0.04em;
  padding: 0.55rem 1.4rem;
  color: #fff3b0;
  border-top: 4px solid rgba(255, 230, 0, 0.55);
  border-bottom: 4px solid rgba(255, 120, 40, 0.5);
  background:
    /* diagonal glass sheen sweeping the marquee (static specular, L6-safe) */
    linear-gradient(115deg, transparent 30%, rgba(255, 255, 255, 0.14) 44%, rgba(255, 255, 255, 0.05) 50%, transparent 60%) center / 100% 100% no-repeat,
    /* marquee backlight bloom behind the letters (coarse, static) */
    radial-gradient(80% 135% at 50% 50%, rgba(255, 210, 60, 0.22) 0%, rgba(255, 120, 40, 0.10) 45%, transparent 78%) center / 100% 100% no-repeat;
  text-shadow: 0.07em 0.07em 0 #ff2079, 0.14em 0.14em 0 #12081f, 0 0 30px rgba(255, 220, 90, 0.55), 0 0 60px rgba(255, 150, 40, 0.3);
}
.flourish--intro .flourish__title::after { /* running marquee bulbs, top edge (static, off text) */
  content: "";
  position: absolute;
  left: 3%; right: 3%; top: -0.95rem;
  height: 0.42rem;
  border-radius: 3px;
  background: repeating-linear-gradient(90deg, #ffe600 0 5px, rgba(255, 120, 40, 0.22) 5px 15px);
  box-shadow: 0 0 12px rgba(255, 220, 90, 0.6);
  opacity: 0.92;
}
.flourish__tagline {
  font-style: normal;
  font-size: 0.75rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #00e5ff;
  opacity: 1;
  text-shadow: var(--credits-shadow), 0 0 12px rgba(0, 229, 255, 0.45);
}
.flourish__rating { /* "Rated S" -> attract-screen copyright line */
  font-size: 0;
  border: none;
  padding: 0;
  opacity: 1;
}
.flourish__rating::after {
  content: "© 198X STREAM CO. — FREE PLAY";
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  color: #8d96c9;
}

/* --- Outro flourish: GAME OVER / PRESS START --- */
.flourish--outro .flourish__title { font-size: 0; }
.flourish--outro .flourish__title::after {
  content: "GAME OVER";
  display: block;
  font-size: var(--credits-flourish-title-size);
  letter-spacing: 0.08em;
  color: #ff3b30;
  text-shadow: 0.07em 0.07em 0 #6e0b1e, 0.14em 0.14em 0 #12081f, 0 0 34px rgba(255, 59, 48, 0.5);
}
.flourish--outro .flourish__tagline { font-size: 0; }
.flourish--outro .flourish__tagline::after {
  content: "THANKS FOR PLAYING";
  font-size: 0.75rem;
  letter-spacing: 0.16em;
  color: #ffe600;
  text-shadow: var(--credits-shadow), 0 0 12px rgba(255, 230, 0, 0.4);
}
.flourish--outro::after { /* flourish is flex-column: slots in last */
  content: "PRESS START TO CONTINUE";
  margin-top: 0.4rem;
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  color: #00e5ff;
  text-shadow: var(--credits-shadow), 0 0 14px rgba(0, 229, 255, 0.6);
  animation: arcade-blink 0.95s steps(1, end) infinite;
}

/* --- Slideshow: CRT channel-snap instead of the base 0.8s fade --- */
.credits-slide { transition: opacity 0.18s steps(3, jump-none); }

/* --- Keyframes (all arcade- prefixed) --- */
@keyframes arcade-blink {
  0%, 54% { opacity: 1; }
  55%, 100% { opacity: 0; }
}
@keyframes arcade-raid-alert {
  0%, 100% { border-color: #ff3b30; box-shadow: 0 0 0 6px rgba(2, 3, 10, 0.85), 0 0 30px rgba(255, 59, 48, 0.6), inset 0 0 22px rgba(0, 0, 0, 0.5); }
  50% { border-color: #ffe600; box-shadow: 0 0 0 6px rgba(2, 3, 10, 0.85), 0 0 34px rgba(255, 230, 0, 0.6), inset 0 0 22px rgba(0, 0, 0, 0.5); }
}

@media (prefers-reduced-motion: reduce) {
  .credits-block__list,
  .credits-block__list::after,
  .flourish__badge::after,
  .flourish--outro::after {
    animation: none !important;
  }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--arcade-scenery:none;}",
};
