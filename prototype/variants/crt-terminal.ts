import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. CRT Terminal: a dead stream's last tty session — phosphor scrollback cat-ing gratitude logs until the connection closes on a blinking cursor. */
export const VARIANT: ThemeVariant = {
  key: "crt-terminal",
  name: "CRT Terminal (Phosphor Shell)",
  css: `/* ==================================================================
   CRT TERMINAL - phosphor shell theme; layered AFTER the base sheet.
   Transparent collapse (one line):
   :root{--credits-bg:transparent;--crt-terminal-scenery:none;}
   ================================================================== */
/* @import relies on the harness hoisting it above the base sheet
   (CSSOM ignores non-leading @import). System mono fallbacks below. */
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=VT323&display=swap');

:root {
  /* phosphor palette */
  --crtterm-bright: #a8ff60;     /* hot phosphor: viewer names, [ OK ], cursor */
  --crtterm-mid:    #8cd94a;     /* typed commands, taglines */
  --crtterm-dim:    #4e8a33;     /* chrome: prompts, line numbers, brackets, HUD */
  --crtterm-hot:    #eaffd6;     /* burned-in white-green: banner, amounts */
  --crtterm-amber:  #ffb000;     /* raid-finale alert phosphor */
  --crtterm-amber-dim: #a87400;

  /* base hooks (scenery routed through --credits-bg so the override kills it).
     The tube is now a STACK, not a single wash: (1) a tight hot phosphor pool
     biased to the tty column (left-of-center, where the beam "rests"), (2) a
     broad soft green ambient so the glass never goes fully dead, (3) a curved
     corner-darkening vignette that fakes the tube's spherical glass, (4) a
     near-black plate base. Everything baked/static => no flicker, no repaint. */
  --credits-bg:
    radial-gradient(58% 46% at 34% 40%, rgba(120, 210, 70, 0.22) 0%, rgba(90, 170, 55, 0.10) 34%, rgba(40, 90, 30, 0.02) 62%, rgba(0, 0, 0, 0) 80%),
    radial-gradient(60% 55% at 74% 58%, rgba(70, 150, 45, 0.10) 0%, rgba(40, 95, 28, 0.05) 44%, rgba(0, 0, 0, 0) 76%),
    radial-gradient(160% 128% at 50% 44%, rgba(34, 74, 22, 0.60) 0%, rgba(16, 40, 12, 0.38) 44%, rgba(0, 0, 0, 0) 80%),
    radial-gradient(125% 135% at 50% 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.58) 80%, rgba(0, 0, 0, 0.92) 100%),
    linear-gradient(180deg, #0a1207 0%, #060f05 50%, #030602 100%);
  --credits-color: var(--crtterm-mid);
  --credits-accent: var(--crtterm-mid);
  --credits-font: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
  --credits-title-font: "VT323", "IBM Plex Mono", ui-monospace, Menlo, Consolas, monospace;
  --credits-title-size: clamp(1.7rem, 4.8vw, 2.75rem);   /* VT323 runs small */
  --credits-name-size: clamp(1.05rem, 2.5vw, 1.45rem);
  --credits-flourish-title-size: clamp(2rem, 6.5vw, 3.75rem);
  --credits-block-gap: 3.25rem;
  --credits-name-gap: 0.4rem;
  --credits-shadow: 0 0 1px rgba(168, 255, 96, 0.55);     /* crisp phosphor edge */
  /* Kept live here; to ever disable use 0 0 0 rgba(0,0,0,0) — NEVER "none",
     the base composes "text-shadow: var(--credits-glow), var(--credits-shadow)"
     and "none" in the list invalidates the whole declaration. */
  --credits-glow: 0 0 18px rgba(140, 217, 74, 0.4);       /* soft bloom */
}

/* --- the tube -----------------------------------------------------
   Base masks BOTH html and body; lift it off html so the screen never
   fades, keep a tighter fade on body so only text decays at the glass. */
html { -webkit-mask-image: none; mask-image: none; }

body {
  background: transparent;              /* html already paints --credits-bg */
  text-align: left;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 7%, #000 93%, transparent 100%);
  mask-image: linear-gradient(to bottom, transparent 0%, #000 7%, #000 93%, transparent 100%);
  /* one-shot power-on lives on BODY, never .credits-roll (JS rewrites the
     roll's inline transform every frame and would clobber it) */
  animation: crtterm-poweron 900ms cubic-bezier(0.23, 1, 0.32, 1) 1 both;
}

/* one-shot power-on flash veil (scenery kill-switch): stands in for the
   removed animated filter: brightness(3) on body. As a body descendant it
   collapses with the tube's scaleY snap, so the 0% frame is the same hot
   horizontal line; the veil then fades out via opacity — compositor-only. */
body::before {
  content: ""; position: fixed; inset: 0; z-index: 6; pointer-events: none;
  display: var(--crt-terminal-scenery, block);
  background: radial-gradient(120% 90% at 50% 45%, rgba(234, 255, 214, 0.9) 0%, rgba(168, 255, 96, 0.5) 55%, rgba(140, 217, 74, 0.25) 100%);
  opacity: 0;
  animation: crtterm-poweron-flash 900ms cubic-bezier(0.23, 1, 0.32, 1) 1 both;
}

/* --- the bezel: a physical monitor frame drawn in code (scenery kill-switch).
   Root-cause fix for "the CRT has no glass, no tube": a fixed inset frame with
   a beveled dark-plastic border. box-shadow does the whole bezel — an inset
   dark plastic lip, a crisp bright specular top-edge (light from above), a
   dark bottom-inner shade for volume, and a wide soft outer black to seat the
   tube in the dark. STATIC specular = always L6-safe. Sits UNDER the text
   (z below the roll) so it frames the phosphor without touching the lane. */
body::after {
  content: ""; position: fixed; inset: 0; z-index: 1; pointer-events: none;
  display: var(--crt-terminal-scenery, block);
  border-radius: 26px;
  box-shadow:
    inset 0 0 0 2px rgba(150, 190, 120, 0.14),          /* thin phosphor-lit glass rim */
    inset 0 4px 2px rgba(200, 240, 170, 0.16),          /* specular top edge (light from above) */
    inset 0 -5px 4px rgba(0, 0, 0, 0.55),               /* bottom inner shade -> volume */
    inset 0 0 110px 16px rgba(0, 0, 0, 0.62),           /* glass darkens toward the frame */
    inset 0 0 0 26px rgba(7, 11, 6, 0.92),              /* the plastic bezel body */
    inset 0 0 8px 26px rgba(0, 0, 0, 0.92),             /* bezel inner shadow */
    inset 0 3px 0 26px rgba(125, 155, 100, 0.20),       /* specular sheen on the bezel top */
    inset 0 -3px 0 26px rgba(0, 0, 0, 0.65),            /* bezel bottom shade */
    inset 0 -6px 0 30px rgba(60, 80, 45, 0.06);         /* faint chin catch-light */
}

/* --- POWER LED + label: a lit green pilot lamp on the bezel chin, bottom-right.
   Glossy LED (soft halo + offset specular pinpoint, all static background paint)
   with a tiny embossed POWER label. The one piece of hardware jewellery the
   monitor gets — always-safe static sparkle on a prop. --- */
head::after {
  content: "POWER";
  position: fixed; right: 2.2rem; bottom: 0.35rem; z-index: 5;
  display: var(--crt-terminal-scenery, block);
  pointer-events: none;
  padding-left: 1.55rem;
  font: 500 0.52rem/1.4 var(--credits-font);
  letter-spacing: 0.22em;
  color: rgba(160, 200, 130, 0.38);
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.7);
  background:
    radial-gradient(circle at 34% 30%, rgba(240, 255, 225, 0.95) 0 1.5px, rgba(240, 255, 225, 0) 3.5px),
    radial-gradient(circle, rgba(140, 255, 110, 0.95) 0 2.5px, rgba(90, 210, 70, 0.55) 4px, rgba(60, 160, 45, 0) 6px),
    radial-gradient(circle, rgba(120, 240, 95, 0.4) 0 5px, rgba(90, 210, 70, 0) 9px);
  background-repeat: no-repeat;
  background-position: left 0.1rem center, left 0.1rem center, left 0.1rem center;
  background-size: 12px 12px, 12px 12px, 18px 18px;
}

/* --- BURNED-IN GHOST PANEL: the tube remembers last night's monitoring
   session — a faint phosphor after-image of a system dashboard haunting the
   empty right half of the glass. Barely-there (never competes with names),
   pure static text, and it collapses with the scenery. --- */
head link:first-of-type::before {
  content: "\\250c\\2500 sys \\2500\\2500\\2500\\2500\\2500\\2500\\2500\\2500\\2500\\2500\\2500\\2500\\2500\\2500\\2500\\2500\\2500\\2510\\A\\2502 uptime   04:22:57     \\2502\\A\\2502 cpu  [\\2588\\2588\\2588\\2588\\2588\\2588\\2591\\2591\\2591\\2591] 61%  \\2502\\A\\2502 mem  [\\2588\\2588\\2588\\2591\\2591\\2591\\2591\\2591\\2591\\2591] 28%  \\2502\\A\\2502 net  [\\2588\\2588\\2588\\2588\\2588\\2588\\2588\\2588\\2591\\2591] 84%  \\2502\\A\\2502 irc        connected  \\2502\\A\\2502 bitrate  6000 kbps    \\2502\\A\\2502 drops              0  \\2502\\A\\2514\\2500\\2500\\2500\\2500\\2500\\2500\\2500\\2500\\2500\\2500\\2500\\2500\\2500\\2500\\2500\\2500\\2500\\2500\\2500\\2500\\2500\\2500\\2500\\2518";
  position: fixed; right: 6vw; top: 16vh; z-index: 0;
  display: var(--crt-terminal-scenery, block);
  pointer-events: none;
  white-space: pre;
  text-align: left;
  font: 400 0.92rem/1.65 var(--credits-font);
  letter-spacing: 0.02em;
  color: rgba(140, 217, 74, 0.16);
  text-shadow: 0 0 6px rgba(140, 217, 74, 0.10);
}
head link { display: block; }

/* --- HUD cursor: a dim blinking block parked after the bottom status line,
   like the console is still waiting on stdin. Tiny layer, opacity steps. --- */
head meta:first-of-type::after {
  content: "";
  position: fixed; left: calc(1.5rem + 24.6em); bottom: 0.78rem; z-index: 3;
  display: var(--crt-terminal-scenery, block);
  pointer-events: none;
  width: 0.5em; height: 1em;
  font-size: 0.8rem;
  background: rgba(140, 217, 74, 0.45);
  box-shadow: 0 0 8px rgba(140, 217, 74, 0.35);
  animation: crtterm-blink 1.06s step-end infinite;
}

/* vignette + status HUD, painted ABOVE the text (scenery kill-switch).
   The vignette lives with the HUD on ONE promoted layer; the flicker is
   pure composited-opacity steps on a cached texture — zero repaints. */
html::before {
  content: "tty1 \\00b7 gratitude.log \\00b7 80\\00d7 24 @ 60Hz";
  position: fixed; inset: 0; z-index: 3; pointer-events: none;
  display: var(--crt-terminal-scenery, flex);
  align-items: flex-end; justify-content: flex-start;
  padding: 0 1.5rem 0.9rem;
  font: 400 0.8rem/1 var(--credits-font);
  letter-spacing: 0.12em; text-align: left;
  color: rgba(140, 217, 74, 0.4); text-shadow: none;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0.42) 100%);
  will-change: transform;                         /* promotion 1/2: pin glass texture */
  animation: crtterm-flicker 7s step-end infinite;  /* opacity steps: composited */
}

/* Scanlines ride the CONTENT, not the glass. Root-cause fix for perceived
   "lag": the eye tracks the crawling text, so screen-fixed lines slide across
   the tracked glyphs at ~20Hz — a flicker painted onto the words (measured
   1.32 luma delta per frame; the user pinned the scanline as the culprit by
   eye). Attached to the roll the lines move with the text: zero relative
   slide, zero flicker, and stills are indistinguishable (the pattern is
   translation-invariant). Static — no flicker animation here, since damaging
   a roll descendant would invalidate the crawl's cached texture. */
.credits-roll::before,
.credits-slideshow::before {
  content: "";
  position: absolute; inset: 0; z-index: 5; pointer-events: none;
  display: var(--crt-terminal-scenery, block);
  background: repeating-linear-gradient(to bottom, rgba(0, 0, 0, 0) 0 2px, rgba(0, 0, 0, 0.2) 2px 3px);
}

/* --- SHINE: static specular glass sheen (void-element trick) -----------
   The tube is glass; glass catches the room light. This is the theme's
   "sparkle": a COARSE, SOFT reflected-light sheen raked across the top-left
   of the glass (where an overhead light would strike a curved CRT), plus a
   tight bright specular hot-spot in the upper-left corner. Both are LARGE
   soft gradients (hundreds of px, gentle falloff) and STATIC — the L6-legal
   form of sparkle: no fine points, no motion, no screen-fixed twinkles over
   the text lane. It lifts the flat plate into "lit glass" and gives the eye
   a highlight to catch. Drawn on a void-element pseudo so it costs no primary
   prop slot. head meta made block-level to host ::before. */
head { display: block; }
head meta { display: block; }
head meta:first-of-type::before {
  content: ""; position: fixed; inset: 0; z-index: 2; pointer-events: none;
  display: var(--crt-terminal-scenery, block);
  background:
    radial-gradient(38% 30% at 16% 12%, rgba(210, 245, 180, 0.10) 0%, rgba(150, 210, 110, 0.05) 40%, rgba(0, 0, 0, 0) 72%),
    linear-gradient(128deg, rgba(200, 240, 170, 0.055) 0%, rgba(200, 240, 170, 0.02) 14%, rgba(0, 0, 0, 0) 34%);
  mix-blend-mode: screen;
}
/* a second, tighter specular kiss on the bezel's top-left corner — a small
   static highlight baked on the "plastic" (always L6-safe, form (d)). */
head meta:last-of-type::before {
  content: ""; position: fixed; top: 0; left: 0; z-index: 2;
  width: 24vw; height: 12vh; pointer-events: none;
  display: var(--crt-terminal-scenery, block);
  background: radial-gradient(60% 80% at 30% 20%, rgba(220, 250, 190, 0.13) 0%, rgba(160, 215, 120, 0.04) 55%, rgba(0, 0, 0, 0) 100%);
  mix-blend-mode: screen;
}

/* drifting sync bar, topmost glass layer (scenery kill-switch).
   Was a full-screen background-position sweep (full 1080p repaint per
   frame); now a dedicated 26vh strip the compositor slides via
   transform: translateY (recipe B) — same band, same -30vh -> 130vh
   sweep, same 9s period. */
html::after {
  content: ""; position: fixed; left: 0; right: 0; top: 0; height: 26vh;
  z-index: 4; pointer-events: none;
  display: var(--crt-terminal-scenery, block);
  background: linear-gradient(to bottom, rgba(190,255,140,0) 0%, rgba(190,255,140,0.05) 45%, rgba(190,255,140,0.09) 50%, rgba(190,255,140,0.05) 55%, rgba(190,255,140,0) 100%);
  transform: translateY(-30vh);
  will-change: transform;                         /* promotion 2/2: pin bar strip */
  animation: crtterm-rollbar 9s linear infinite;
}

/* --- layout: left-anchored tty column (both modes) ----------------- */
.credits-roll {
  align-items: flex-start;
  padding: 4.5rem clamp(2rem, 8vw, 9rem);
}
.credits-slide {
  align-items: flex-start;
  text-align: left;
  padding: 3rem clamp(2rem, 8vw, 9rem);
}
.flourish { align-items: flex-start; text-align: left; gap: 0.9rem; }
.credits-block, .flourish { min-width: 0; max-width: 100%; }

/* --- section titles as shell commands ------------------------------ */
.credits-block__title {
  text-transform: lowercase;            /* "$ cat subscribers.log" */
  letter-spacing: 0.04em;
  color: var(--crtterm-hot);            /* the typed command reads hot-white-green */
  margin: 0 0 0.9rem;
  /* burned-in phosphor: tight hot core + soft green bloom (the VT323 pixel
     face now glows like beam-scanned phosphor, not flat text). STATIC.
     Bloom pulled back: at 8px/22px the glow smeared the command line into
     mush ("$ cat" read as "$ eat"); tight core + modest halo keeps the
     phosphor look without sacrificing the section labels' legibility. */
  text-shadow:
    0 0 1px rgba(255, 255, 255, 0.55),
    0 0 5px rgba(168, 255, 96, 0.3),
    0 0 13px rgba(140, 217, 74, 0.15);
}
.credits-block__title::before { content: "$ cat "; color: var(--crtterm-dim); }
/* base gold rule -> ".log" suffix (reset the block-rule styles) */
.credits-block__title::after {
  content: ".log"; display: inline;
  width: auto; height: auto; margin: 0;
  background: none; color: var(--crtterm-dim); opacity: 1;
}

/* --- output lines: cat -n numbering, phosphor names -----------------
   Rows are inline flow (not flexed): a hanging indent keeps wrapped
   long names aligned under the name column, never clipped. */
.credits-block__list {
  counter-reset: ln;
  min-width: 0;
  border-left: 1px solid rgba(78, 138, 51, 0.35);
  padding-left: 1.1rem;
}
.credit {
  counter-increment: ln;
  letter-spacing: 0; line-height: 1.5; max-width: 100%;
  padding-left: 4ch; text-indent: -4ch;  /* hanging indent for wrapped names */
}
.credit::before {
  content: counter(ln, decimal-leading-zero);
  display: inline-block; text-align: right;
  min-width: 3ch; margin-right: 2ch;     /* 5ch at 0.8em = the parent's 4ch */
  font-size: 0.8em; color: var(--crtterm-dim);
}
.credit__name {
  color: var(--crtterm-bright); font-weight: 500;
  overflow-wrap: anywhere;               /* 25-char names wrap, never clip */
  /* per-name phosphor bloom so the crawling viewer names read as lit phosphor
     glyphs, not printed text. STATIC (rides with the roll => no flicker). */
  text-shadow: 0 0 1px rgba(200, 255, 160, 0.55), 0 0 9px rgba(168, 255, 96, 0.32);
}
.credit__amount {
  opacity: 1; color: var(--crtterm-hot); font-size: 0.85em;
  margin-left: 0.9ch;                    /* margin, not content-space */
}
.credit__amount::before { content: "["; color: var(--crtterm-dim); }
.credit__amount::after  { content: "]"; color: var(--crtterm-dim); }

/* --- intro: boot log / MOTD (REBUILT; title+tagline text kept) --------
   Was a dim, near-black boot line that vanished into the plate and collided
   with the bottom HUD. Now a legible multi-line POST/systemd boot sequence:
   the "[ OK ]" markers ride at bright phosphor, the log body at mid so it
   actually reads, and the whole card gets breathing room (padding-top) so it
   never fights the HUD. The [OK] tokens are the recurring visual motif that
   sells "this machine just came alive". */
.flourish--intro { padding-top: 4.5rem; gap: 1.2rem; }
.flourish--intro::before {
  content: "PHOSPHOR-9000 BIOS 3.7 \\00b7 640K GRATITUDE OK\\A\\A[ OK ] mounted /dev/stream (read-only)\\A[ OK ] started phosphor-refresh.target\\A[ OK ] reached target Farewell.\\A\\Amotd:";
  white-space: pre; display: block;
  font-size: 0.98rem; line-height: 1.85; letter-spacing: 0.04em;
  color: var(--crtterm-mid);
  text-shadow: 0 0 6px rgba(140, 217, 74, 0.35);
}
/* The badge is now a lit, boxed status pill: a phosphor-outlined chip with a
   soft inner bloom so the "service started" ident reads as an on-screen UI
   element, not loose text. */
.flourish__badge {
  font-size: 0; letter-spacing: 0;
  display: inline-flex; align-items: baseline;
  border: 1px solid rgba(120, 210, 70, 0.55);
  border-radius: 3px; padding: 0.4rem 0.9rem; box-shadow: none;
  background:
    linear-gradient(180deg, rgba(120, 210, 70, 0.10) 0%, rgba(40, 90, 30, 0.04) 100%);
  box-shadow: inset 0 0 14px rgba(120, 210, 70, 0.14), 0 0 18px rgba(90, 170, 55, 0.18);
}
.flourish__badge::before {
  content: "[ OK ]"; font-size: 1.1rem; letter-spacing: 0.05em;
  margin-right: 0.6ch;                    /* real gap: flex collapses trailing space */
  color: var(--crtterm-bright);
  text-shadow: 0 0 10px rgba(168, 255, 96, 0.65), 0 0 2px rgba(234, 255, 214, 0.9);
}
.flourish__badge::after {
  content: "gratitude.service \\2014 started";
  font-size: 1.1rem; letter-spacing: 0.05em; text-transform: none;
  color: var(--crtterm-hot);
  text-shadow: 0 0 8px rgba(234, 255, 214, 0.3);
}
/* Hero streamer name: burned-in hot phosphor with a layered bloom (tight hot
   core + wide soft halo) — the persistence smear a real tube leaves. */
.flourish__title {
  color: var(--crtterm-hot);
  letter-spacing: 0.04em;
  overflow-wrap: anywhere;               /* streamer show names wrap too */
  /* bloom halved — the 10px/30px/60px stack blurred the show name to mush;
     keep a phosphor halo but let the glyph edges survive */
  text-shadow:
    0 0 1px rgba(255, 255, 255, 0.8),
    0 0 6px rgba(234, 255, 214, 0.4),
    0 0 18px rgba(168, 255, 96, 0.25),
    0 0 40px rgba(140, 217, 74, 0.14);
}
.flourish__tagline { font-style: normal; opacity: 1; color: var(--crtterm-mid); }
.flourish--intro .flourish__tagline::before { content: "# "; color: var(--crtterm-dim); }
.flourish__rating {
  font-size: 0; letter-spacing: 0; opacity: 1;
  border: 1px solid rgba(120, 210, 70, 0.5);
  border-radius: 2px; padding: 0.4rem 0.85rem;
  box-shadow: inset 0 0 10px rgba(90, 170, 55, 0.1);
}
.flourish__rating::after {
  content: "TERM=twitch-256color \\00b7 RATED=S/streamers";
  font-size: 0.88rem; letter-spacing: 0.1em;
  text-transform: none; color: var(--crtterm-mid);
  text-shadow: 0 0 5px rgba(140, 217, 74, 0.3);
}

/* --- outro: $ exit + blinking block cursor --------------------------- */
.flourish--outro .flourish__title { font-size: 0; }
.flourish--outro .flourish__title::before {
  content: "$ exit";
  display: block; margin-bottom: 0.75rem;
  font-family: var(--credits-font);
  font-size: 1.1rem; font-weight: 400; letter-spacing: 0.05em;
  text-transform: none; text-shadow: none;
  color: var(--crtterm-dim);
}
.flourish--outro .flourish__title::after {
  content: "Connection to stream closed.";
  display: block;
  font-size: var(--credits-flourish-title-size); letter-spacing: 0.04em;
  text-transform: none; color: var(--crtterm-hot);
}
.flourish--outro .flourish__tagline::after {
  content: "";                           /* drawn cursor, no glyph fallback risk */
  display: inline-block;
  width: 0.6em; height: 1.05em;
  margin-left: 0.5ch; vertical-align: text-bottom;
  background: var(--crtterm-bright);
  box-shadow: 0 0 12px rgba(168, 255, 96, 0.7);
  animation: crtterm-blink 1.06s step-end infinite;
}

/* --- raid finale: amber alert channel ---------------------------------
   NOTE: .credits-block:last-of-type NEVER matches — every section is a
   <section>, so the outro flourish is the :last-of-type. nth-last-of-type(2)
   is the raids block (scroll) / raids slide (slideshow); :not(.flourish)
   guards the zero-blocks edge case in slideshow. */
.credits-block:nth-last-of-type(2)::before,
.credits-slide:nth-last-of-type(2):not(.flourish)::before {
  content: "*** INCOMING TRANSMISSION ***";
  display: block; margin-bottom: 1rem;
  font-size: 0.95rem; letter-spacing: 0.3em;
  color: var(--crtterm-amber); text-shadow: 0 0 16px rgba(255, 176, 0, 0.5);
  animation: crtterm-blink 1.4s step-end infinite;
}
.credits-block:nth-last-of-type(2) .credits-block__title,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
  color: var(--crtterm-amber);
  /* glow is STATIC at the hot extreme; the pulse's dim half-cycle is an
     opacity hold (recipe C-2) — animating text-shadow forced repaints */
  text-shadow: 0 0 26px rgba(255, 176, 0, 0.75);
  animation: crtterm-amber-pulse 2.4s step-end infinite;
}
.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  content: "$ tail -f ";
  color: var(--crtterm-amber-dim);
}
.credits-block:nth-last-of-type(2) .credits-block__title::after,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::after { color: var(--crtterm-amber-dim); }
.credits-block:nth-last-of-type(2) .credits-block__list,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__list { border-left-color: rgba(255, 176, 0, 0.35); }
.credits-block:nth-last-of-type(2) .credit::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit::before { color: var(--crtterm-amber-dim); }
.credits-block:nth-last-of-type(2) .credit__name,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__name { color: #ffd23f; text-shadow: 0 0 14px rgba(255, 176, 0, 0.4); }
.credits-block:nth-last-of-type(2) .credit__amount,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__amount { color: #ffe9b3; }
.credits-block:nth-last-of-type(2) .credit__amount::before,
.credits-block:nth-last-of-type(2) .credit__amount::after,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__amount::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__amount::after { color: var(--crtterm-amber-dim); }

/* --- slideshow: phosphor pages don't dissolve — they CUT. Two hard steps
   stand in for the base 0.8s fade (also why the outro screenshots stopped
   racing the fade). --- */
.credits-slide { transition: opacity 0.12s steps(2, jump-none); }

/* --- motion (all keyframes crtterm- prefixed; transform/opacity ONLY) --- */
@keyframes crtterm-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

/* step-end holds reproduce the old paired-percentage dips exactly:
   1 | 0.82 @ 3-4% | 1 | 0.88 @ 37-38.2% | 1 | 0.85 @ 72-73.6% | 1 */
@keyframes crtterm-flicker {
  0%, 4%, 38.2%, 73.6%, 100% { opacity: 1; }
  3%  { opacity: 0.82; }
  37% { opacity: 0.88; }
  72% { opacity: 0.85; }
}

/* band top edge sweeps -30vh -> 130vh, identical to the retired
   background-position keyframes, but composited */
@keyframes crtterm-rollbar {
  from { transform: translateY(-30vh); }
  to   { transform: translateY(130vh); }
}

/* hard phosphor-refresh toggle (step-end, 2 composites per cycle); the
   glow itself is static on the element — only opacity toggles here */
@keyframes crtterm-amber-pulse {
  0%        { opacity: 0.86; }
  50%, 100% { opacity: 1; }
}

/* one-shot tube power-on (see body note: never on .credits-roll).
   transform-only: the old animated brightness ramp repainted the whole
   body per frame; the flash now comes from the body::before veil. */
@keyframes crtterm-poweron {
  0%   { transform: scaleY(0.004) scaleX(1.15); }
  45%  { transform: scaleY(1.02) scaleX(1); }
  100% { transform: none; }
}

@keyframes crtterm-poweron-flash {
  0%   { opacity: 1; }
  45%  { opacity: 0.3; }
  100% { opacity: 0; }
}

/* --- reduced motion: kill flicker/roll/blink loops; steady cursor stays --
   (body::before holds its static opacity: 0, so the flash veil never shows;
   html::after holds translateY(-30vh), parking the sync bar off-screen) */
@media (prefers-reduced-motion: reduce) {
  body,
  body::before,
  html::before,
  html::after,
  head meta:first-of-type::after,
  .flourish--outro .flourish__tagline::after,
  .credits-block:nth-last-of-type(2)::before,
  .credits-slide:nth-last-of-type(2):not(.flourish)::before,
  .credits-block:nth-last-of-type(2) .credits-block__title,
  .credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
    animation: none;
  }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--crt-terminal-scenery:none;}",
};
