import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. VHS Home Video: a taped-off-air family recording at 11:58 PM — fringed white names crawling over tape blacks while the VCR's crisp OSD chrome watches from the corners. */
export const VARIANT: ThemeVariant = {
  key: "vhs",
  name: "VHS Home Video",
  css: `
/* ================================================================
   VHS HOME VIDEO — layered after the base theme.
   Fiction: everything inside <body> is signal-on-tape (fringed, soft,
   judders); everything on <html> is the VCR's live OSD (crisp, still).
   Scenery kill-switch: every full-bleed layer honors --vhs-scenery,
   and the background rides --credits-bg, so the one-line transparent
   override collapses the whole set for OBS compositing.
   ================================================================ */
@import url('https://fonts.googleapis.com/css2?family=VT323&family=Permanent+Marker&display=swap');

:root {
  /* --credits-bg is the CRT phosphor bed: a warm screen-light pool blooming up
     the center lane (so names sit ON a glowing tube, not in a void) over the
     cooled tape blacks. Tube barrel-vignette + bezel live on a promoted fixed
     pseudo (meta:first-of-type) so they read as the physical set around the glass. */
  --credits-bg:
    /* the head-switching tear that every VHS frame wears at the bottom edge no
       longer lives here as a dead gradient — it is now a jittering steps() noise
       band on head title::before (see "head-switch noise tear" below). Only its
       soft blue under-glow stays baked into the bed. */
    linear-gradient(to top, rgba(170, 200, 230, 0.10) 0, rgba(170, 200, 230, 0) 100%) left bottom / 100% 26px no-repeat,
    /* white-balance drift: two broad, whisper-soft tint bands baked into the
       tape blacks (green up high, magenta low) — the chroma wander of EP tape */
    linear-gradient(to bottom, rgba(0, 0, 0, 0) 24%, rgba(120, 180, 140, 0.05) 34%, rgba(0, 0, 0, 0) 46%),
    linear-gradient(to bottom, rgba(0, 0, 0, 0) 58%, rgba(190, 120, 170, 0.05) 70%, rgba(0, 0, 0, 0) 82%),
    radial-gradient(70% 52% at 50% 46%, rgba(120, 96, 104, 0.42) 0%, rgba(70, 54, 62, 0.20) 40%, rgba(18, 14, 16, 0) 72%),
    radial-gradient(135% 100% at 50% 34%, rgba(74, 55, 60, 0.55) 0%, rgba(18, 14, 16, 0) 60%),
    linear-gradient(to bottom, #1b1620 0%, #131019 46%, #0a080c 100%);
  --credits-color: #f4f1e8;
  --credits-accent: #f6f3ea;
  --credits-font: "VT323", "Courier New", ui-monospace, Menlo, Consolas, monospace;
  --credits-title-font: "VT323", "Courier New", ui-monospace, Menlo, Consolas, monospace;
  --vhs-marker-font: "Permanent Marker", "Marker Felt", "Comic Sans MS", "Segoe Print", cursive;
  --vhs-red: #ff5f4d;
  /* VCR VFD on-screen display: cool phosphor cyan-white with a soft backlit bloom,
     the way real player OSDs sit lit over the picture. */
  --vhs-osd: #dff6ff;
  --vhs-osd-glow:
    0 0 2px rgba(210, 244, 255, 0.9),
    0 0 12px rgba(90, 200, 235, 0.55),
    0 0 26px rgba(70, 170, 220, 0.30);
  /* Phosphor bloom for section titles reading off the tube (soft, cheap, static). */
  --vhs-title-bloom: 0 0 22px rgba(220, 236, 255, 0.32), 0 0 44px rgba(150, 190, 235, 0.16);
  /* pre-baked luma-noise sprite (white snow on transparent) — sampled at shifting
     background-positions by the head-switch tear's steps() cycle. */
  --vhs-tear-noise: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='512' height='26'%3E%3Cfilter id='tn'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85 0.7' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0.9 0.9 0.9 0 -0.5'/%3E%3C/filter%3E%3Crect width='512' height='26' filter='url(%23tn)'/%3E%3C/svg%3E");
  --vhs-measure: min(36rem, 86vw);
  --credits-title-size: clamp(1.7rem, 4.2vw, 2.7rem);
  --credits-name-size: clamp(1.5rem, 3.6vw, 2.35rem);
  --credits-flourish-title-size: clamp(2.75rem, 8vw, 5.25rem);
  --credits-block-gap: 4.75rem;
  --credits-name-gap: 0.5rem;
  /* Resting chromatic fringe on body text (names) is capped at 1px;
     the full 1.6px aberration is reserved for titles + OSD chrome. */
  --credits-shadow:
    1px 0 0 rgba(255, 70, 90, 0.40),
    -1px 0 0 rgba(60, 235, 255, 0.35),
    0 0 1px rgba(244, 241, 232, 0.85),
    0 2px 8px rgba(0, 0, 0, 0.55);
  --vhs-title-shadow:
    1.6px 0 0 rgba(255, 70, 90, 0.45),
    -1.6px 0 0 rgba(60, 235, 255, 0.40),
    0 0 1px rgba(244, 241, 232, 0.85),
    0 2px 8px rgba(0, 0, 0, 0.55);
  --credits-glow: 0 0 18px rgba(235, 225, 255, 0.28);
}

/* ---- canvas split: scenery paints once on <html>, unmasked; the edge-fade
   stays on <body> so the fixed OSD chrome never fades or judders. ---- */
html {
  -webkit-mask-image: none;
  mask-image: none;
}
body {
  background: transparent;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 9%, #000 91%, transparent 100%);
  mask-image: linear-gradient(to bottom, transparent 0%, #000 9%, #000 91%, transparent 100%);
  /* Tape judder CUT for perf: any running animation on the masked body — even a
     steps() one holding transform:none — kept the full-page mask re-applying
     every frame under CPU compositing (measured 44fps with vs 61 without). Two
     judder blips per 11s weren't worth it; the tracking band + noise carry the
     tape fiction. */
}

/* ---- CRT phosphor screen-glow: a warm light pool riding UP the center lane so
   the crawling names sit ON a lit tube instead of hanging in a void. Soft and
   coarse (radial >>40px, no fine pattern) so it is L6-safe even though it is
   screen-fixed; masked by the body edge-fade, which only softens its top/bottom
   (a glow wants soft edges anyway). Static — paints once. ---- */
body::before {
  content: "";
  display: var(--vhs-scenery, block);
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(58% 46% at 50% 48%, rgba(150, 128, 138, 0.30) 0%, rgba(120, 96, 110, 0.12) 45%, rgba(0, 0, 0, 0) 72%),
    radial-gradient(46% 30% at 50% 52%, rgba(120, 170, 200, 0.10) 0%, rgba(0, 0, 0, 0) 70%);
}

/* ---- the physical television around the glass: barrel vignette + rounded tube
   corners + dark bezel inset. Rides the void-element trick (meta:first-of-type)
   because both html:: pseudos are the OSD chrome. Opting meta/link in as render
   nodes shows nothing (UA keeps their content empty) but unlocks 6 fixed pseudos.
   Static, unmasked, crisp — this is the SET, not the tape. ---- */
head meta,
head link { display: var(--vhs-scenery, block); }
head meta:first-of-type::before {
  content: "";
  display: var(--vhs-scenery, block);
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  /* barrel darkening toward the corners: coarse radial with a smooth mid-stop so the
     falloff reads as tube curvature, not a hard ring; the bright picture area stays open. */
  background:
    radial-gradient(130% 122% at 50% 47%, rgba(0, 0, 0, 0) 55%, rgba(10, 6, 12, 0.30) 74%, rgba(6, 3, 8, 0.62) 88%, rgba(2, 1, 3, 0.9) 100%);
}
head meta:first-of-type::after {
  content: "";
  display: var(--vhs-scenery, block);
  position: fixed;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  /* rounded tube glass: black bezel corners masked out with 4 corner radials +
     a thin inner rim highlight so the glass edge catches the room light (specular,
     static — always L6-safe) */
  border-radius: 2.4vw / 3.2vh;
  box-shadow:
    inset 0 0 0 2px rgba(20, 16, 22, 0.9),
    inset 0 0 3px 2px rgba(190, 205, 225, 0.14),
    inset 0 6px 40px rgba(0, 0, 0, 0.5),
    inset 0 -6px 40px rgba(0, 0, 0, 0.5);
}

/* ---- specular room-light sheen on the curved tube glass: a big soft diagonal
   glint pooled in the upper-left, kept COARSE (radial >>40px, soft falloff) and
   OFF the center text lane, and STATIC — the always-safe kind of sparkle under L6.
   Rides link:first-of-type::before (a void-element pseudo). It is the gleam that
   tells you there is real glass in front of the picture. ---- */
head link:first-of-type::before {
  content: "";
  display: var(--vhs-scenery, block);
  position: fixed;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  background:
    radial-gradient(38% 30% at 22% 20%, rgba(214, 230, 246, 0.16) 0%, rgba(214, 230, 246, 0.06) 42%, rgba(0, 0, 0, 0) 70%),
    radial-gradient(22% 16% at 80% 82%, rgba(200, 220, 240, 0.08) 0%, rgba(0, 0, 0, 0) 68%);
}

/* ---- tape artifacts: scan noise + scanlines, ON THE TAPE IMAGE (the roll),
   not the screen. Root-cause fix for perceived "lag": the eye smoothly tracks
   the crawling names, so a SCREEN-FIXED pattern slides across the tracked text
   at ~20Hz — a flicker painted onto whatever you read (measured 1.66 vs 0.32
   luma delta per frame after this change). Attached to the roll, the pattern
   moves WITH the text: zero relative slide, zero flicker — and it is fiction-
   correct: tape noise is recorded in the picture; only the OSD belongs to the
   player. Static (no re-randomize hops): animating a roll descendant would
   damage the crawl's cached texture every hop. ---- */
.credits-roll::before,
.credits-slideshow::before {
  content: "";
  display: var(--vhs-scenery, block);
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  opacity: 0.13;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23n)'/%3E%3C/svg%3E"),
    repeating-linear-gradient(to bottom, rgba(6, 4, 8, 0.5) 0 1px, transparent 1px 3px);
  background-size: 260px 260px, auto;
}

/* ---- tracking-glitch band: periodic sweep down the screen ---- */
body::after {
  content: "";
  display: var(--vhs-scenery, block);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 120px;
  z-index: 30;
  pointer-events: none;
  opacity: 0;
  background:
    linear-gradient(to bottom,
      transparent 0%, rgba(255, 255, 255, 0.05) 18%, rgba(255, 70, 90, 0.07) 34%,
      rgba(255, 255, 255, 0.16) 46%, rgba(220, 240, 255, 0.28) 50%,
      rgba(60, 235, 255, 0.08) 60%, rgba(255, 255, 255, 0.05) 78%, transparent 100%),
    /* dropout shadow trailing the hot core — the dark smear a real head clog drags */
    linear-gradient(to bottom, transparent 54%, rgba(4, 2, 6, 0.30) 62%, rgba(4, 2, 6, 0.10) 72%, transparent 82%),
    repeating-linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 0 2px, transparent 2px 7px);
  /* backdrop-filter blur/saturate removed: it forced a per-frame readback of the
     moving crawl underneath the band; the gradient stack alone carries the look. */
  will-change: transform; /* keep the band's raster alive between its 9s sweeps (was a 207ms layerize hitch) */
  animation: vhs-tracking 9s linear infinite;
}

/* ---- head-switch noise tear: the one authentic artifact this flat theme was
   missing. Every real VHS frame carries a ragged band of jittering luma-noise +
   torn dashes across its bottom scanlines where the video heads switch fields.
   Pinned to the very bottom edge, ragged along its TOP boundary (mask fade), and
   flickered by a steps() cycle that samples fresh noise columns from the sprite +
   nudges the band — NOT a smooth compositor loop. Rides head title::before (a
   free void pseudo). Sits above the tube glass but below the body group, so the
   crawling names always read on top. Gated on --vhs-scenery. ---- */
head title { display: var(--vhs-scenery, block); font-size: 0; color: transparent; }
head title::before {
  content: "";
  display: var(--vhs-scenery, block);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 22px;
  z-index: 33;
  pointer-events: none;
  background-image:
    var(--vhs-tear-noise),
    repeating-linear-gradient(90deg,
      rgba(232, 242, 254, 0.55) 0 9px, rgba(232, 242, 254, 0.04) 9px 17px,
      rgba(232, 242, 254, 0.72) 17px 27px, rgba(232, 242, 254, 0.02) 27px 44px,
      rgba(232, 242, 254, 0.4) 44px 58px, transparent 58px 84px),
    linear-gradient(to top, rgba(220, 232, 248, 0.3) 0%, rgba(220, 232, 248, 0) 100%);
  background-repeat: repeat, repeat, no-repeat;
  background-size: 512px 26px, 84px 100%, 100% 100%;
  background-position: 0 0, 0 0, 0 0;
  /* ragged top boundary that dissolves the tear up into the picture */
  -webkit-mask-image: linear-gradient(to top, #000 0%, #000 40%, rgba(0, 0, 0, 0.55) 66%, transparent 100%);
  mask-image: linear-gradient(to top, #000 0%, #000 40%, rgba(0, 0, 0, 0.55) 66%, transparent 100%);
  opacity: 0.9;
  will-change: transform;
  animation: vhs-headswitch 0.36s steps(6, end) infinite;
}

/* ---- intermittent tracking-dropout bursts, confined STRICTLY to the left and
   right gutters (masked away from the whole center name lane so they never touch
   a name). Two torn bright streaks flash on for a beat, then jump to a new height
   for the next burst — hard on/off via steps(1) opacity, translateY reposition
   under cover of opacity 0. Rides head title::after. Gated on --vhs-scenery. ---- */
head title::after {
  content: "";
  display: var(--vhs-scenery, block);
  position: fixed;
  inset: 0;
  z-index: 32;
  pointer-events: none;
  background-image:
    var(--vhs-tear-noise),
    var(--vhs-tear-noise),
    linear-gradient(to bottom, transparent 0%, rgba(242, 248, 255, 0.9) 45%, rgba(255, 255, 255, 0.4) 60%, transparent 100%),
    linear-gradient(to bottom, transparent 0%, rgba(210, 232, 255, 0.7) 50%, transparent 100%);
  background-repeat: repeat-x, repeat-x, no-repeat, no-repeat;
  /* two thin noise strips ride the two bright streaks so each dropout reads torn,
     not like a clean UI rule */
  background-size: 512px 9px, 512px 7px, 100% 8px, 100% 6px;
  background-position: 0 34%, 70px 57%, 0 34%, 0 57%;
  /* opaque only in the outer gutters; the center lane stays fully transparent */
  -webkit-mask-image: linear-gradient(to right, #000 0%, #000 13%, transparent 19%, transparent 81%, #000 87%, #000 100%);
  mask-image: linear-gradient(to right, #000 0%, #000 13%, transparent 19%, transparent 81%, #000 87%, #000 100%);
  opacity: 0;
  will-change: transform;
  animation: vhs-dropout 6.5s steps(1, end) infinite;
}

/* ---- VCR OSD chrome (crisp, unmasked, un-jittered — full 1.6px-class fringe OK here).
   Rebuilt as a backlit VFD: cool phosphor cyan-white with a soft bloom (--vhs-osd-glow),
   the way a real player's on-screen display sits lit over the picture. Each caption also
   rides a translucent letterbox plate (the OSD's own dark backing) so it never floats
   naked on the tube — those plates are the meta:last-of-type::before/::after pseudos. ---- */
html::before,
html::after {
  display: var(--vhs-scenery, block);
  position: fixed;
  z-index: 41;
  pointer-events: none;
  font-family: var(--credits-font);
  color: var(--vhs-osd);
  letter-spacing: 0.12em;
}
/* double space after hex escapes is intentional: the first space terminates the escape */
html::before {
  content: "\\25B6  PLAY";
  top: clamp(1rem, 4vh, 2.2rem);
  left: clamp(1.2rem, 4vw, 2.6rem);
  font-size: clamp(1.35rem, 2.6vw, 1.9rem);
  text-shadow:
    1px 1px 0 rgba(4, 8, 12, 0.7),
    var(--vhs-osd-glow);
}
html::after {
  content: "REC\\A DEC 24 1994  11:58 PM\\A COUNTER  0:04:37";
  white-space: pre;
  text-align: left;
  line-height: 1.5;
  left: clamp(1.2rem, 4vw, 2.6rem);
  bottom: clamp(1rem, 4vh, 2.2rem);
  padding-left: 1.05em; /* reserves the column the REC dot (head::before) sits in */
  font-size: clamp(1.2rem, 2.3vw, 1.7rem);
  text-shadow:
    1px 1px 0 rgba(4, 8, 12, 0.7),
    var(--vhs-osd-glow);
}

/* ---- tape-reel spinner: the counter's little companion — a spoked reel
   turning in 60-degree clicks like a mechanical counter gear. A ~1em layer,
   transform-only steps() rotation (6 cheap composites per 1.8s). ---- */
head link:first-of-type::after {
  content: "";
  display: var(--vhs-scenery, block);
  position: fixed;
  z-index: 42;
  pointer-events: none;
  left: calc(clamp(1.2rem, 4vw, 2.6rem) + 10.6em);
  bottom: calc(clamp(1rem, 4vh, 2.2rem) + 0.28em);
  width: 0.85em; height: 0.85em;
  font-size: clamp(1.2rem, 2.3vw, 1.7rem);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg stroke='%23dff6ff' stroke-width='2.6' stroke-opacity='.9' fill='none'%3E%3Ccircle cx='12' cy='12' r='9'/%3E%3Cline x1='12' y1='4.5' x2='12' y2='9.5'/%3E%3Cline x1='5.4' y1='15.8' x2='9.7' y2='13.3'/%3E%3Cline x1='18.6' y1='15.8' x2='14.3' y2='13.3'/%3E%3C/g%3E%3C/svg%3E") no-repeat center / contain;
  filter: drop-shadow(0 0 6px rgba(90, 200, 235, 0.5));
  animation: vhs-reel 1.8s steps(6, end) infinite;
}

/* ---- battery chip: camcorder OSD, top-right — an SP mode tag and a drawn
   battery at 2/3 charge on its own letterbox plate. All static. ---- */
head::after {
  content: "SP";
  display: var(--vhs-scenery, block);
  position: fixed;
  z-index: 41;
  pointer-events: none;
  top: calc(clamp(1rem, 4vh, 2.2rem) - 0.42em);
  right: calc(clamp(1.2rem, 4vw, 2.6rem) - 0.65em);
  font-family: var(--credits-font);
  font-size: clamp(1.35rem, 2.6vw, 1.9rem);
  line-height: 1;
  letter-spacing: 0.12em;
  color: var(--vhs-osd);
  padding: 0.5em 2.6em 0.5em 0.65em;
  border-radius: 4px;
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='18' viewBox='0 0 36 18'%3E%3Crect x='1' y='2' width='30' height='14' rx='2' fill='none' stroke='%23dff6ff' stroke-width='2'/%3E%3Crect x='32' y='6' width='4' height='6' rx='1' fill='%23dff6ff'/%3E%3Crect x='4' y='5' width='7' height='8' fill='%23dff6ff'/%3E%3Crect x='13' y='5' width='7' height='8' fill='%23dff6ff'/%3E%3Crect x='22' y='5' width='7' height='8' fill='%23dff6ff' opacity='.22'/%3E%3C/svg%3E") no-repeat right 0.55em center / 1.65em auto,
    linear-gradient(to bottom, rgba(24, 30, 40, 0.34) 0%, rgba(10, 14, 20, 0.44) 100%);
  box-shadow:
    inset 0 1px 0 rgba(150, 200, 230, 0.22),
    inset 0 0 0 1px rgba(120, 170, 200, 0.10),
    0 2px 10px rgba(0, 0, 0, 0.35);
  text-shadow:
    1px 1px 0 rgba(4, 8, 12, 0.7),
    var(--vhs-osd-glow);
}

/* ---- OSD letterbox plates: the dark translucent backing each caption group sits on,
   like the shaded strip a VCR paints behind its overlay. Ride meta:last-of-type's two
   pseudos (fixed, crisp, unmasked). A soft top-edge highlight gives the plate a glassy
   lip (static specular — L6-safe). ---- */
head meta:last-of-type::before,
head meta:last-of-type::after {
  content: "";
  display: var(--vhs-scenery, block);
  position: fixed;
  z-index: 40;
  pointer-events: none;
  background:
    linear-gradient(to bottom, rgba(24, 30, 40, 0.34) 0%, rgba(10, 14, 20, 0.44) 100%);
  border-radius: 4px;
  box-shadow:
    inset 0 1px 0 rgba(150, 200, 230, 0.22),
    inset 0 0 0 1px rgba(120, 170, 200, 0.10),
    0 2px 10px rgba(0, 0, 0, 0.35);
}
head meta:last-of-type::before { /* behind PLAY */
  top: calc(clamp(1rem, 4vh, 2.2rem) - 0.42em);
  left: calc(clamp(1.2rem, 4vw, 2.6rem) - 0.65em);
  width: 7.4em;
  height: 2.1em;
  font-size: clamp(1.35rem, 2.6vw, 1.9rem);
}
head meta:last-of-type::after { /* behind REC + timestamp + counter (three lines) */
  bottom: calc(clamp(1rem, 4vh, 2.2rem) - 0.42em);
  left: calc(clamp(1.2rem, 4vw, 2.6rem) - 0.65em);
  width: 15.6em;
  height: 5.4em;
  font-size: clamp(1.2rem, 2.3vw, 1.7rem);
}

/* ---- blinking REC dot. Both html pseudos are taken, so the dot gets the one
   other layer that lives OUTSIDE <body> (crisp: no mask, no jitter): <head>.
   Opting head in as a render node shows nothing — the UA sheet keeps all its
   children display:none — but unlocks head::before. The dot's gradients paint
   once (static background-*) and the blink is a steps() opacity toggle, same
   1.6s cadence as the old background-size flicker. ---- */
head {
  display: var(--vhs-scenery, block);
}
head::before {
  content: "";
  display: var(--vhs-scenery, block);
  position: fixed;
  z-index: 42;
  pointer-events: none;
  /* geometry mirrors html::after (same box origin + em size) so the dot lands
     exactly where the old background dot sat */
  left: clamp(1.2rem, 4vw, 2.6rem);
  bottom: clamp(1rem, 4vh, 2.2rem);
  font-size: clamp(1.2rem, 2.3vw, 1.7rem);
  width: 1.5em;
  height: 3em; /* two REC lines at line-height 1.5 */
  /* glossy lit LED: soft outer halo, saturated body, and a small offset white
     specular hotspot on the upper-left (static — always L6-safe) that reads as
     glass catching the room light. All background-* paint once; only opacity blinks. */
  background:
    radial-gradient(circle at 38% 34%, rgba(255, 255, 255, 0.95) 0 12%, rgba(255, 255, 255, 0) 26%),
    radial-gradient(circle, rgba(255, 92, 78, 0.98) 0 40%, rgba(255, 59, 48, 0.9) 48%, rgba(255, 59, 48, 0) 54%),
    radial-gradient(circle, rgba(255, 70, 60, 0.42) 0 55%, rgba(255, 59, 48, 0) 74%);
  background-repeat: no-repeat;
  background-position: left 0 top 0.5em, left 0 top 0.5em, left -0.22em top 0.28em;
  background-size: 0.6em 0.6em, 0.6em 0.6em, 1.1em 1.1em;
  animation: vhs-rec 1.6s steps(1, end) infinite;
}

/* ---- tape log structure: left-ragged measure, works in BOTH modes
   (slideshow slides have no .credits-block wrapper — style title/list) ---- */
.credits-block__title,
.credits-block__list {
  box-sizing: border-box;
  width: var(--vhs-measure);
  text-align: left;
}
.credits-block__title {
  letter-spacing: 0.18em;
  margin: 0 0 1.1rem;
  /* phosphor bloom added so the label reads as GLOWING off the tube, not printed */
  text-shadow: var(--vhs-title-bloom), var(--credits-glow), var(--vhs-title-shadow);
}
.credits-block__title::before {
  content: "\\25B8  ";
  color: var(--vhs-red);
  /* the red cue triangle picks up its own hot bloom */
  text-shadow: 0 0 10px rgba(255, 95, 77, 0.55), 0 0 20px rgba(255, 70, 60, 0.28);
}
/* the section rule: a lit phosphor dash instead of a flat printed line — a soft
   cyan under-bloom rides beneath the dashes (static, coarse, L6-safe). */
.credits-block__title::after {
  width: 100%;
  height: 2px;
  margin: 0.55rem 0 0;
  background: repeating-linear-gradient(to right, rgba(223, 246, 255, 0.7) 0 10px, transparent 10px 16px);
  box-shadow: 0 0 8px rgba(130, 200, 235, 0.35);
  opacity: 0.6;
}

/* ---- ledger rows: NAME .......... 500 (amount-less rows stay plain).
   Names are sacred: they wrap, never clip. ---- */
.credit {
  display: flex;
  align-items: center;
  width: 100%;
}
.credit__name {
  min-width: 0;
  overflow-wrap: anywhere;
}
.credit__amount {
  flex: 1;
  display: flex;
  align-items: center;
  min-width: 0;
  opacity: 1;
  color: #ffd8a8;
}
.credit__amount::before {
  content: "";
  flex: 1 1 2rem;
  min-width: 2rem;
  margin: 0 0.65em;
  border-bottom: 2px dotted rgba(242, 240, 230, 0.32);
  position: relative;
  top: 0.32em;
}

/* ---- intro: handwritten tape-label sticker (ink on paper — no bloom).
   Glow no-op must be a transparent shadow, NEVER "none": the base composes
   "text-shadow: var(--credits-glow), var(--credits-shadow)" and a "none"
   in a shadow list invalidates the whole declaration. ---- */
.flourish--intro {
  --credits-glow: 0 0 0 rgba(0, 0, 0, 0);
  color: #26231f;
  text-shadow: 0.8px 0 rgba(200, 40, 40, 0.18), -0.8px 0 rgba(40, 150, 200, 0.15);
  background-color: #ece5d3;
  background-image:
    linear-gradient(to bottom, #c14b3f 0, #c14b3f 8px, transparent 8px),
    linear-gradient(to bottom, transparent 0 11px, #3f5fa8 11px, #3f5fa8 14px, transparent 14px),
    repeating-linear-gradient(to bottom, transparent 0 2.6em, rgba(90, 110, 160, 0.28) 2.6em calc(2.6em + 1px));
}
/* scroll = rotated sticker card; slideshow slide is inset:0 so the label goes full-bleed.
   The rotate() here establishes the sticker as the containing block for its two glossy
   tape-strip pseudos below — that is why they are scoped to scroll mode (in slideshow the
   intro is full-bleed OSD, no physical card to tape down). NOTE: this is the SCOPED
   containing block; we never set position on the unscoped subject. */
body[data-mode="scroll"] .flourish--intro {
  box-sizing: border-box;
  position: relative; /* anchors the tape-strip pseudos to the card, scroll mode only */
  width: min(30rem, 85vw);
  padding: 2.9rem 2rem 2.25rem;
  border-radius: 6px;
  transform: rotate(-1.6deg);
  /* paper lift + a soft inner top sheen so the label stock catches the tube light */
  box-shadow:
    inset 0 1px 0 rgba(255, 252, 244, 0.7),
    inset 0 -14px 26px rgba(150, 138, 118, 0.18),
    0 10px 30px rgba(0, 0, 0, 0.55),
    0 2px 6px rgba(0, 0, 0, 0.4);
}
/* ---- glossy adhesive tape strips holding the label to the glass. Each is a
   translucent amber-cellophane band with a hard specular gleam raking across it
   (the bright diagonal highlight of packing tape). Static, baked-on specular =
   always L6-safe. z above the card body so they sit ON the paper. ---- */
body[data-mode="scroll"] .flourish--intro::before,
body[data-mode="scroll"] .flourish--intro::after {
  content: "";
  position: absolute;
  z-index: 3;
  width: 118px;
  height: 34px;
  pointer-events: none;
  /* cellophane body + raking specular gleam + soft edge darkening */
  background:
    linear-gradient(115deg, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0.72) 44%, rgba(255, 255, 255, 0) 52%),
    linear-gradient(to bottom, rgba(255, 244, 214, 0.34) 0%, rgba(236, 214, 168, 0.30) 100%);
  box-shadow:
    inset 0 0 0 1px rgba(255, 250, 236, 0.35),
    0 2px 5px rgba(0, 0, 0, 0.32);
}
body[data-mode="scroll"] .flourish--intro::before {
  top: -13px;
  left: -22px;
  transform: rotate(-42deg);
}
body[data-mode="scroll"] .flourish--intro::after {
  bottom: -13px;
  right: -22px;
  transform: rotate(-42deg);
}
.flourish--intro .flourish__title {
  font-family: var(--vhs-marker-font);
  font-size: clamp(2.2rem, 6.5vw, 3.6rem);
  text-transform: none;
  letter-spacing: 0.01em;
  color: #26231f;
  transform: rotate(-0.6deg);
  text-shadow: 1px 0 rgba(200, 40, 40, 0.20), -1px 0 rgba(40, 150, 200, 0.16);
}
.flourish--intro .flourish__badge {
  font-size: 0;
  border: 0;
  box-shadow: none;
  padding: 0;
  color: #6b2f2a;
}
.flourish--intro .flourish__badge::after {
  content: "HI-FI STEREO \\00B7  T-120 \\00B7  SP";
  font-size: 0.95rem;
  font-family: var(--credits-font);
  letter-spacing: 0.28em;
  text-transform: uppercase;
}
/* streamer-configurable copy — restyled as red-pen marker, text NEVER swapped */
.flourish--intro .flourish__tagline {
  font-style: normal;
  font-family: var(--vhs-marker-font);
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  color: #8a2f27;
  opacity: 1;
  transform: rotate(-1deg);
}
.flourish--intro .flourish__rating {
  font-size: 0;
  color: #4a463d;
  border-color: rgba(74, 70, 61, 0.6);
  border-radius: 2px;
  opacity: 0.9;
  transform: rotate(1.2deg);
}
.flourish--intro .flourish__rating::after {
  content: "BE KIND \\2014  PLEASE REWIND";
  font-size: 0.9rem;
  font-family: var(--credits-font);
  letter-spacing: 0.22em;
}

/* ---- outro: pure OSD ---- */
.flourish--outro .flourish__title { font-size: 0; }
.flourish--outro .flourish__title::after {
  content: "\\25A0  STOP";
  font-size: var(--credits-flourish-title-size);
  letter-spacing: 0.14em;
  text-shadow: var(--credits-glow), var(--vhs-title-shadow);
}
.flourish--outro .flourish__tagline { font-size: 0; font-style: normal; }
.flourish--outro .flourish__tagline::after {
  content: "end of tape \\00B7  thanks for watching";
  font-size: 1.25rem;
  letter-spacing: 0.12em;
  opacity: 0.85;
}

/* ---- raid finale: signal surge. The outro flourish <section> is the true
   last sibling in both modes, so the last credit block is nth-last-of-type(2).
   Surge lives on the TITLE only — never on crawling name rows. ---- */
.credits-block:nth-last-of-type(2) .credits-block__title,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
  color: var(--vhs-red);
  /* surge downgraded from an animated text-shadow bloom (per-frame text repaint)
     to an arcade-style steps() opacity flicker in the same 76-100% window of the
     same 2.8s loop; the static title fringe (--vhs-title-shadow) stays put */
  animation: vhs-surge 2.8s steps(1, end) infinite;
}
.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  content: "\\25B8\\25B8  ";
  animation: vhs-blink 0.9s steps(1, end) infinite;
}

/* ---- slideshow: hard VCR cut instead of a dissolve. The old brightness/
   contrast filter flash is now a pre-rendered white-wash overlay that fades
   via opacity (compositor-only); the judder stays as a transform keyframe. ---- */
.credits-slide { transition: opacity 0.18s linear; }
.credits-slide.is-active { animation: vhs-cut 0.45s ease-out; }
.credits-slide::before {
  content: "";
  display: var(--vhs-scenery, block);
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: rgba(235, 242, 255, 0.16); /* the flash extreme, painted once */
  opacity: 0;
}
.credits-slide.is-active::before { animation: vhs-cut-flash 0.45s ease-out; }

/* ---- keyframes (all vhs- prefixed) ---- */
/* whole-layer jumps; Y offsets are multiples of 3px so the ride-along
   scanlines land back on their own phase (only -80 changed, to -81) */
@keyframes vhs-tracking {
  0%    { transform: translateY(-140px) scaleY(1); opacity: 0; }
  0.5%  { opacity: 1; }
  4.5%  { transform: translateY(52vh) scaleY(1); }
  5.2%  { transform: translateY(45vh) translateX(-11px) scaleY(1.7); } /* mid-sweep judder kicks sideways */
  5.9%  { transform: translateY(49vh) translateX(6px) scaleY(1.3); }
  7.5%  { transform: translateY(110vh) scaleY(1); opacity: 1; }
  7.6%, 100% { transform: translateY(110vh) scaleY(1); opacity: 0; }
}
/* head-switch tear jitter: shift the noise sprite to fresh columns each step,
   crawl the torn dashes a hair, warp sideways, and flicker luma — the shimmer is
   the sprite resampling, not any smooth motion. */
@keyframes vhs-headswitch {
  0%   { background-position: 0px 0, 0px 0, 0 0; transform: translateX(0); opacity: 0.82; }
  100% { background-position: -372px 0, -30px 0, 0 0; transform: translateX(2px); opacity: 0.96; }
}
/* tracking dropout bursts: three brief flashes per cycle, each at a different
   height; the layer is invisible between bursts and repositions while dark. */
@keyframes vhs-dropout {
  0%, 12%      { opacity: 0; transform: translateY(-24vh) translateX(0); }
  13%, 15%     { opacity: 0.9; transform: translateY(-24vh) translateX(-3px); }
  15.01%, 43%  { opacity: 0; transform: translateY(28vh) translateX(0); }
  44%, 45.5%   { opacity: 0.85; transform: translateY(28vh) translateX(3px); }
  45.51%, 70%  { opacity: 0; transform: translateY(6vh) translateX(0); }
  71%, 73%     { opacity: 0.8; transform: translateY(6vh) translateX(-2px); }
  73.01%, 100% { opacity: 0; transform: translateY(6vh) translateX(0); }
}
/* counter reel: six 60-degree clicks per turn */
@keyframes vhs-reel {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes vhs-rec {
  0%, 55%   { opacity: 1; }
  56%, 100% { opacity: 0; }
}
@keyframes vhs-blink {
  0%, 55%   { opacity: 1; }
  56%, 100% { opacity: 0.15; }
}
@keyframes vhs-surge {
  0%, 76%, 100% { opacity: 1; }
  84%           { opacity: 0.55; }
  88%           { opacity: 0.92; }
  92%           { opacity: 0.7; }
}
@keyframes vhs-cut {
  0%   { transform: translateY(7px) skewX(0.8deg); }
  100% { transform: none; }
}
/* opacity decay traces the old brightness curve: strong at the cut, mild by 60% */
@keyframes vhs-cut-flash {
  0%   { opacity: 1; }
  60%  { opacity: 0.2; }
  100% { opacity: 0; }
}

/* ---- reduced motion: tape settles — no glitch, no blink, no jitter
   (head::before = REC dot parked lit; slide flash pseudo rests at opacity 0) ---- */
@media (prefers-reduced-motion: reduce) {
  body,
  head::before,
  head link:first-of-type::after,
  .credits-slide.is-active,
  .credits-slide.is-active::before,
  .credits-block:nth-last-of-type(2) .credits-block__title,
  .credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title,
  .credits-block:nth-last-of-type(2) .credits-block__title::before,
  .credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
    animation: none;
  }
  body::after {
    animation: none;
    opacity: 0; /* tracking band stays parked off-screen */
  }
  /* tape settles: the head-switch tear freezes to a single static noise texture
     (frame 0, no jitter); the gutter dropout bursts rest off-screen. Parked at
     matching specificity so the qualified animated selectors are the ones stopped. */
  head title::before {
    animation: none;
  }
  head title::after {
    animation: none;
    opacity: 0;
  }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--vhs-scenery:none;}",
};
