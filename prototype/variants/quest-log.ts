import type { ThemeVariant } from "./variant";

/** PROTOTYPE — throwaway. Quest Log: a night-tavern guild ledger — candlelit parchment panel on dark umber wood, rubricated blackletter, inked tallies on ruled sign-in lines, a wax seal under "So ends the tale…". */
export const VARIANT: ThemeVariant = {
  key: "quest-log",
  name: "Quest Log",
  css: `@import url('https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&family=IM+Fell+English:ital@0;1&family=IM+Fell+English+SC&display=swap');

/* ════════════════════════════════════════════════════════════════════
   QUEST LOG — night-tavern guild ledger (layered after the base sheet)
   Dark umber wood ground, one candlelit parchment panel, rubricated
   blackletter quest headings, "× N" tallies inked on sign-in rules.
   Transparent collapse: :root{--credits-bg:transparent;--quest-log-scenery:none;}
   ════════════════════════════════════════════════════════════════════ */
:root {
  color-scheme: dark;
  /* -- theme palette -- */
  --ql-ink: #3b2a1a;
  --ql-ink-deep: #2a1c10;
  --ql-gold: #a3701c;
  --ql-wax: #8a1e22;
  --ql-tally: #6b3f0e;
  --ql-rule: rgba(90, 58, 26, 0.5);
  /* the vellum tone used to break a gilt rule cleanly around a centred ornament */
  --ql-paper-cartouche: #e2c68c;
  /* anchor for the tabletop props: sits in the wood gutter, never on the page
     (50% - 35rem parks it left of the 46rem-wide parchment panel) */
  --ql-prop-x: clamp(2vw, calc(50% - 35rem), 24vw);
  --ql-sc-font: 'IM Fell English SC', 'Palatino Linotype', Palatino, serif;
  /* -- base variable overrides -- */
  --credits-color: var(--ql-ink);
  --credits-accent: var(--ql-gold);
  --credits-font: 'IM Fell English', 'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif;
  --credits-title-font: 'UnifrakturMaguntia', 'Luminari', 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
  --credits-title-size: clamp(1.7rem, 4.5vw, 2.6rem);
  --credits-name-size: clamp(1.05rem, 2.6vw, 1.55rem);
  /* capped so the blackletter show name fits INSIDE the 46rem parchment —
     at 5rem "GoProSlowYo Live" overflowed the page edge and shoved the
     drop-cap tile off the left margin */
  --credits-flourish-title-size: clamp(2.2rem, 5.5vw, 3.6rem);
  --credits-block-gap: 5.5rem;
  --credits-name-gap: 0.45rem;
  --credits-shadow: 0 1px 0 rgba(255, 240, 205, 0.4); /* letterpress lift, not film-noir blur */
  /* Glow no-op: must be a valid shadow, NEVER "none" — the base composes
     "text-shadow: var(--credits-glow), var(--credits-shadow)" and "none"
     inside a shadow list invalidates the whole declaration. */
  --credits-glow: 0 0 0 rgba(0, 0, 0, 0);
  /* Root paints only the solid tavern base — cheap to repaint inside the crawl's
     per-frame damage under CPU rendering. The wood planks + vignette live on the
     PROMOTED html::after layer below (painted once, composited thereafter);
     unpromoted root texture measured 41fps. The one-line override still
     collapses both (--credits-bg + --quest-log-scenery). */
  --credits-bg: #251710;
}

/* Tavern wood + vignette on a cached compositor texture. z-index -2 keeps the
   hearth glow (html::before) breathing above the planks. */
html::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  display: var(--quest-log-scenery, block);
  background:
    radial-gradient(ellipse at 50% 42%, rgba(10, 5, 2, 0) 38%, rgba(10, 5, 2, 0.55) 100%),
    /* wood knots — two dark whorls low in each gutter: a FILLED dark core with a
       faint lit grain-lip around it (raised wood catching hearth-light), instead
       of the hollow double-ring "O" they used to read as (coarse, static) */
    radial-gradient(ellipse 1.9rem 2.9rem at 12% 68%, rgba(11, 6, 2, 0.62) 0%, rgba(18, 9, 3, 0.44) 30%, rgba(74, 46, 20, 0.16) 48%, rgba(40, 24, 10, 0) 64%),
    radial-gradient(ellipse 1.6rem 2.5rem at 89% 24%, rgba(11, 6, 2, 0.56) 0%, rgba(18, 9, 3, 0.4) 32%, rgba(70, 44, 18, 0.14) 50%, rgba(40, 24, 10, 0) 66%),
    /* horizontal plank seams: a dark cut + a lit lower lip every ~190px */
    repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.42) 0 2px, rgba(120, 76, 34, 0.12) 2px 3px, rgba(0, 0, 0, 0) 3px 190px),
    repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.18) 0 3px, rgba(0, 0, 0, 0) 3px 12px, rgba(64, 38, 18, 0.14) 12px 14px, rgba(0, 0, 0, 0) 14px 29px),
    linear-gradient(165deg, #2a1b12 0%, #251710 45%, #180d07 100%);
  transform: translateZ(0);
}

/* Full-bleed room: html paints the dark tavern UN-masked; body keeps the base
   edge-fade mask so the page and its ink ease in/out at top and bottom. */
html { -webkit-mask-image: none; mask-image: none; }
body { background: transparent; } /* html already paints --credits-bg; avoid double paint */

/* ── Scenery (kill-switched for OBS compositing) ── */
html::before { /* hearth-light from below — the theme's ONE always-on loop.
   Perf: the glow is fully transparent above ~56% of the viewport, so the box
   covers only the bottom half (gradient recomputed for identical absolute
   geometry: ry 80%H/50%H=160%, cy (106%-50%)/50%=112%), and will-change
   promotes it to its own compositor layer so the opacity flicker never
   repaints the gradient — compositor-only, same look. */
  content: "";
  position: fixed;
  top: 50%;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
  display: var(--quest-log-scenery, block);
  background: radial-gradient(ellipse 120% 160% at 50% 112%, rgba(255, 170, 78, 0.22), rgba(255, 170, 78, 0) 62%);
  will-change: opacity;
  /* steps(1) = discrete hearth pops: the half-screen glow re-composites only at
     each keyframe (~1x/s) instead of every frame — continuous ease measured 40fps
     under software compositing. Popping is what real firelight does anyway. */
  animation: questlog-candle 9s steps(1, end) infinite;
}
body::before { /* the ledger page: one tall candlelit parchment panel under the roll.
   Now a REAL vellum material — cross-hatched paper fibre (two fine diagonal weaves
   + a vertical laid grain), aged foxing blooms, a warm candle-pool low-centre, and
   dark deckled edges that let the page sink into the wood. All baked ONCE on this
   promoted (translateZ) layer: static texture, never repainted, zero flicker. */
  content: "";
  position: fixed;
  top: 0;
  bottom: 0;
  left: 50%;
  width: min(46rem, 94vw);
  /* translateZ(0): the parchment panel is a cached texture, blended not repainted */
  transform: translateX(-50%) translateZ(0);
  z-index: -1;
  pointer-events: none;
  display: var(--quest-log-scenery, block);
  background:
    /* -- warm candle-pool blooming up from the lower centre -- */
    radial-gradient(ellipse 88% 52% at 50% 88%, rgba(255, 201, 116, 0.34), rgba(255, 201, 116, 0) 72%),
    /* -- faint heraldic guild watermark pressed into the sheet's upper third -- */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='240' viewBox='0 0 200 240'%3E%3Cg fill='none' stroke='%23805626' stroke-width='4' opacity='0.13'%3E%3Cpath d='M30 30 H170 V110 Q170 180 100 214 Q30 180 30 110 Z'/%3E%3Cpath d='M100 30 V214 M30 110 H170'/%3E%3Cpath d='M52 58 l32 34 M84 58 l-32 34'/%3E%3Ccircle cx='137' cy='72' r='17'/%3E%3Cpath d='M62 148 q-9 15 0 28 q9 -13 0 -28 M50 164 q-7 11 5 18 M74 164 q7 11 -5 18'/%3E%3Cpath d='M114 182 l24 -20 24 20'/%3E%3C/g%3E%3C/svg%3E") no-repeat 50% 17% / 15rem auto,
    /* -- aged foxing spots: soft FILLED tea-stain blooms (dense warm core fading
       to nothing), slightly irregular ellipses tucked into corners off the text
       lane — reads as organic age, not the clean coffee-cup rings it used to -- */
    radial-gradient(ellipse 2.6rem 2.1rem at 15% 19%, rgba(146, 96, 42, 0.17) 0%, rgba(150, 104, 48, 0.08) 44%, rgba(150, 104, 48, 0) 76%),
    radial-gradient(ellipse 1.9rem 2.3rem at 88% 33%, rgba(146, 96, 42, 0.15) 0%, rgba(150, 104, 48, 0.07) 46%, rgba(150, 104, 48, 0) 78%),
    radial-gradient(ellipse 1.7rem 1.4rem at 24% 71%, rgba(150, 100, 46, 0.14) 0%, rgba(160, 112, 52, 0.06) 48%, rgba(160, 112, 52, 0) 80%),
    radial-gradient(ellipse 1.6rem 2rem at 82% 86%, rgba(140, 90, 38, 0.13) 0%, rgba(150, 100, 44, 0.06) 48%, rgba(150, 100, 44, 0) 80%),
    /* -- broad warm parchment mottling so the head isn't a flat cream void -- */
    radial-gradient(ellipse 20rem 16rem at 30% 30%, rgba(214, 176, 116, 0.22), transparent 70%),
    radial-gradient(ellipse 18rem 20rem at 74% 62%, rgba(206, 168, 108, 0.2), transparent 70%),
    /* -- fine cross-hatched paper fibre: two shallow diagonal weaves -- */
    repeating-linear-gradient(48deg, rgba(120, 82, 40, 0.05) 0 1px, rgba(255, 244, 214, 0.04) 1px 2px, rgba(120, 82, 40, 0) 2px 4px),
    repeating-linear-gradient(-42deg, rgba(96, 62, 26, 0.045) 0 1px, rgba(255, 244, 214, 0.035) 1px 2px, rgba(96, 62, 26, 0) 2px 4px),
    /* -- vertical laid-lines of the mould, very faint -- */
    repeating-linear-gradient(90deg, rgba(150, 112, 60, 0.05) 0 1px, rgba(150, 112, 60, 0) 1px 7px),
    /* -- deckled darkened side edges: page sinks into the wood -- */
    linear-gradient(90deg, rgba(74, 46, 18, 0.42) 0%, rgba(74, 46, 18, 0) 5%, rgba(74, 46, 18, 0) 95%, rgba(74, 46, 18, 0.42) 100%),
    /* -- base vellum tone, subtly cooler at the head so it never blows out -- */
    linear-gradient(172deg, #e8d09c 0%, #e6ce97 34%, #ddc088 66%, #cfa96f 100%);
  border-left: 1px solid rgba(40, 22, 6, 0.75);
  border-right: 1px solid rgba(40, 22, 6, 0.75);
  /* deeper cast shadow + inset burn seats the sheet on the umber wood */
  box-shadow:
    0 0 4rem rgba(0, 0, 0, 0.7),
    inset 0 0 3.2rem rgba(70, 42, 14, 0.42),
    inset 0 1.2rem 2.4rem rgba(58, 34, 10, 0.28),
    inset 0 -1.6rem 2.8rem rgba(58, 34, 10, 0.2);
}

/* The laid-paper ruling rides the CONTENT (flicker root-cause fix: fixed fine
   lines slide across eye-tracked crawling ink at ~20Hz). Moving with the roll
   the ruling scrolls with the entries — MORE ledger-like, each line keeps its
   rule. Geometry mirrors the panel; z:-1 sits under the ink, over the panel. */
.credits-roll::before,
.credits-slideshow::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: min(46rem, 94vw);
  transform: translateX(-50%);
  z-index: -1;
  pointer-events: none;
  display: var(--quest-log-scenery, block);
  background: repeating-linear-gradient(0deg, rgba(96, 64, 28, 0.05) 0 2px, rgba(96, 64, 28, 0) 2px 5px);
}

/* ── Tavern props: the scribe's desk, set in the wood gutters ──
   Hosts are <head>'s void children (promoted to blocks) + <title>, all
   position: fixed screen-space layers keyed to the one kill-switch. The
   candle/inkwell/map art is static SVG (painted once, promoted); the only
   movers are the candle's opacity-flicker halo and three tiny ember motes. */
head, head meta, head link, head title { display: var(--quest-log-scenery, block); }
head title { font-size: 0; }

/* The lit candle on its brass chamberstick — left gutter, table height. */
head meta:first-of-type::before {
  content: "";
  position: fixed;
  left: var(--ql-prop-x);
  bottom: 4vh;
  width: 150px;
  height: 258px;
  z-index: 0;
  pointer-events: none;
  display: var(--quest-log-scenery, block);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='240' viewBox='0 0 140 240'%3E%3Cpath d='M70 66 Q71.5 71 70 75' stroke='%23331d08' stroke-width='2.5' fill='none'/%3E%3Crect x='52' y='75' width='36' height='84' rx='4' fill='%23f0dfb2'/%3E%3Crect x='54' y='75' width='9' height='84' rx='4' fill='%23fdf3d2' opacity='0.85'/%3E%3Crect x='77' y='75' width='11' height='84' rx='4' fill='%23c9a86a' opacity='0.9'/%3E%3Cpath d='M55 75 q-7 18 -2 30 q3 8 6 2 q4 -8 0 -32 Z' fill='%23f8ecc4'/%3E%3Cpath d='M86 78 q8 11 6 22 q-2 7 -6 2 Z' fill='%23e2cd96'/%3E%3Cpath d='M43 159 h54 l-7 13 h-40 Z' fill='%23a97c28'/%3E%3Cpath d='M43 159 h54 l-2 4 h-50 Z' fill='%23e6c470' opacity='0.85'/%3E%3Crect x='61' y='168' width='18' height='13' fill='%23c39a3c'/%3E%3Cellipse cx='70' cy='188' rx='55' ry='14' fill='%23906a1e'/%3E%3Cellipse cx='70' cy='184' rx='55' ry='13' fill='%23d9ae4e'/%3E%3Cellipse cx='70' cy='182' rx='41' ry='9' fill='%23a87c28'/%3E%3Cellipse cx='48' cy='184' rx='11' ry='3.4' fill='%23ffe9ae' opacity='0.85'/%3E%3Ccircle cx='120' cy='178' r='12' fill='none' stroke='%23c39a3c' stroke-width='6'/%3E%3Ccircle cx='118' cy='175' r='12' fill='none' stroke='%23eed492' stroke-width='2' opacity='0.6'/%3E%3C/svg%3E") no-repeat center / contain;
  filter: drop-shadow(0 10px 12px rgba(10, 4, 1, 0.6));
  transform: translateZ(0);
}

/* The candle's pooled light: a warm halo centred on the flame that pops
   through uneven keyframes — steps(1) discrete flicker, opacity-only,
   compositor-composited (same recipe as the hearth below). */
head meta:first-of-type::after {
  content: "";
  position: fixed;
  left: calc(var(--ql-prop-x) - 115px);
  bottom: calc(4vh + 6px);
  width: 380px;
  height: 380px;
  z-index: 0;
  pointer-events: none;
  display: var(--quest-log-scenery, block);
  background: radial-gradient(circle at 50% 42%, rgba(255, 196, 106, 0.34) 0%, rgba(255, 176, 76, 0.16) 38%, rgba(255, 170, 70, 0) 68%);
  will-change: opacity;
  animation: questlog-flame 7s steps(1, end) infinite;
}

/* THE FLAME DANCES — the money beat. The candle SVG now carries only its wick;
   the living flame lives on its own tiny layer planted on the wick tip and
   flickers through discrete poses (steps): it leans, stretches and shivers the
   way a real candle tongue does. transform-only, base pinned (origin at foot),
   promoted via will-change — compositor-only, off the crawl lane, in the left
   gutter. Paired with the halo breath above and the hearth pops, the scribe's
   candle is now unmistakably alive. */
body::after {
  content: "";
  position: fixed;
  left: calc(var(--ql-prop-x) + 53px);
  bottom: calc(4vh + 183px);
  width: 44px;
  height: 68px;
  z-index: 0;
  pointer-events: none;
  display: var(--quest-log-scenery, block);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='68' viewBox='0 0 44 68'%3E%3Cellipse cx='22' cy='42' rx='14' ry='21' fill='%23ff9d3a' opacity='0.16'/%3E%3Cpath d='M22 62 Q35 46 30 30 Q27 15 22 5 Q17 15 14 30 Q9 46 22 62 Z' fill='%23ffbf5a'/%3E%3Cpath d='M22 60 Q30 47 27 33 Q25 22 22 14 Q19 22 17 33 Q14 47 22 60 Z' fill='%23ffd88a'/%3E%3Cpath d='M22 59 Q26 49 24 37 Q23 29 22 24 Q21 29 20 37 Q18 49 22 59 Z' fill='%23fff3c8'/%3E%3Cellipse cx='22' cy='60' rx='6' ry='4' fill='%237ab0ff' opacity='0.5'/%3E%3C/svg%3E") no-repeat center / contain;
  transform-origin: 50% 92%;
  will-change: transform;
  animation: questlog-flamedance 2.3s steps(1, end) infinite;
}
@keyframes questlog-flamedance {
  0%   { transform: scaleY(1)    skewX(0deg); }
  14%  { transform: scaleY(1.07) skewX(2.5deg)  translateX(0.4px); }
  28%  { transform: scaleY(0.95) skewX(-2deg)   translateX(-0.5px); }
  43%  { transform: scaleY(1.09) skewX(1.5deg)  translateX(0.3px); }
  58%  { transform: scaleY(0.99) skewX(-2.6deg) translateX(-0.4px); }
  72%  { transform: scaleY(1.05) skewX(1deg)    translateX(0.2px); }
  86%  { transform: scaleY(0.96) skewX(-1.4deg) translateX(-0.3px); }
  100% { transform: scaleY(1)    skewX(0deg); }
}

/* Inkwell + quill, right gutter — the ledger is mid-entry. */
head meta:last-of-type::before {
  content: "";
  position: fixed;
  right: calc(var(--ql-prop-x) - 1vw);
  bottom: 4.5vh;
  width: 190px;
  height: 168px;
  z-index: 0;
  pointer-events: none;
  display: var(--quest-log-scenery, block);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='170' height='150' viewBox='0 0 170 150'%3E%3Cpath d='M20 138 q8 -9 19 -3 q12 -9 21 0 q10 -5 13 4 q-26 9 -53 -1 Z' fill='%23281a0c' opacity='0.5'/%3E%3Cpath d='M96 98 Q122 58 158 13 Q161 8 156 11 Q112 40 91 94 Z' fill='%23ece4d0'/%3E%3Cpath d='M100 84 Q126 52 149 23 M96 92 Q118 66 141 35 M104 76 Q128 48 145 28' stroke='%23c9bfa4' stroke-width='1.6' fill='none'/%3E%3Cpath d='M96 98 Q124 56 156 12' stroke='%23a89a78' stroke-width='2.4' fill='none'/%3E%3Cpath d='M95 96 L86 111 L93 113 Z' fill='%23443018'/%3E%3Cpath d='M40 92 Q33 99 33 111 Q33 133 62 137 Q91 133 91 111 Q91 99 84 92 Z' fill='%23262c3c'/%3E%3Cpath d='M44 97 Q39 103 39 113 Q39 122 46 128 Q41 110 48 97 Z' fill='%236a7890' opacity='0.7'/%3E%3Cellipse cx='62' cy='120' rx='16' ry='7' fill='%23161b28' opacity='0.8'/%3E%3Crect x='47' y='84' width='30' height='10' rx='2' fill='%231d2230'/%3E%3Cellipse cx='62' cy='89' rx='11' ry='3' fill='%230e1220'/%3E%3Crect x='45' y='79' width='34' height='7' rx='3.5' fill='%23b98a30'/%3E%3Crect x='45' y='79' width='34' height='3' rx='1.5' fill='%23e6c470' opacity='0.8'/%3E%3C/svg%3E") no-repeat center / contain;
  filter: drop-shadow(0 8px 10px rgba(10, 4, 1, 0.55));
  transform: translateZ(0);
}

/* A campaign map pinned to the planks, top-left gutter, hung slightly askew. */
head meta:last-of-type::after {
  content: "";
  position: fixed;
  left: calc(var(--ql-prop-x) - 1.5vw);
  top: 5vh;
  width: 244px;
  height: 193px;
  z-index: 0;
  pointer-events: none;
  display: var(--quest-log-scenery, block);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='190' height='150' viewBox='0 0 190 150'%3E%3Crect x='8' y='10' width='174' height='130' rx='3' fill='%23d9bd85' stroke='%235a3c16' stroke-width='2'/%3E%3Cpath d='M14 96 Q40 84 52 96 Q70 112 92 100 Q120 88 132 102 Q150 116 176 104 L176 134 L14 134 Z' fill='%23c2a262' opacity='0.85'/%3E%3Cpath d='M40 52 l10 -14 10 14 Z M58 56 l8 -11 8 11 Z M74 50 l9 -13 9 13 Z' fill='none' stroke='%236b4a1c' stroke-width='2'/%3E%3Cpath d='M28 118 Q60 96 88 104 Q124 112 150 78 Q160 64 152 48' stroke='%238a1e22' stroke-width='2.5' stroke-dasharray='6 5' fill='none'/%3E%3Cpath d='M146 42 l12 12 M158 42 l-12 12' stroke='%238a1e22' stroke-width='3'/%3E%3Ccircle cx='40' cy='34' r='12' fill='none' stroke='%235a3c16' stroke-width='2'/%3E%3Cpath d='M40 24 L44 34 L40 44 L36 34 Z' fill='%235a3c16'/%3E%3Cpath d='M95 16 V134' stroke='%23a3865a' stroke-width='1.5' opacity='0.6'/%3E%3Cpath d='M12 60 Q30 64 44 58 M120 128 Q140 120 156 126' stroke='%23b59a64' stroke-width='1.5' fill='none' opacity='0.7'/%3E%3Ccircle cx='95' cy='15' r='5.5' fill='%23702a20'/%3E%3Ccircle cx='93.4' cy='13.4' r='1.9' fill='%23d88a70'/%3E%3C/svg%3E") no-repeat center / contain;
  filter: drop-shadow(3px 6px 7px rgba(10, 4, 1, 0.55));
  transform: rotate(-3.5deg) translateZ(0);
}

/* Ember motes off the hearth: three tiny glowing dots that rise through the
   gutters and gutter only — staggered 13s/17s/21s loops, transform+opacity. */
head link::before,
head link::after,
head title::before {
  content: "";
  position: fixed;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  z-index: 0;
  pointer-events: none;
  display: var(--quest-log-scenery, block);
  background: radial-gradient(circle, #ffd9a0 0 28%, #ff9a3c 58%, rgba(255, 150, 60, 0) 76%);
  box-shadow: 0 0 9px 2px rgba(255, 150, 60, 0.45);
  opacity: 0;
}
head link::before {                 /* this ember lifts off the candle FLAME itself,
   drifting up past the parchment's left edge — it visually ties the flame to the
   scene (the fire is throwing sparks) instead of rising from empty gutter */
  left: calc(var(--ql-prop-x) + 68px);
  bottom: calc(4vh + 232px);
  animation: questlog-ember 11s linear infinite;
}
head link::after {
  right: 10vw;
  bottom: 6vh;
  animation: questlog-ember 21s linear 4s infinite;
}
head title::before {
  left: 5vw;
  bottom: 3vh;
  animation: questlog-ember 17s linear 9s infinite;
}

@keyframes questlog-ember {
  0%   { transform: translate(0, 0) scale(1); opacity: 0; }
  8%   { opacity: 0.85; }
  55%  { transform: translate(16px, -30vh) scale(0.8); opacity: 0.4; }
  82%  { transform: translate(-6px, -50vh) scale(0.55); opacity: 0; }
  100% { transform: translate(-6px, -50vh) scale(0.55); opacity: 0; }
}

@keyframes questlog-flame { /* uneven candle pops, brighter register than the hearth */
  0%, 100% { opacity: 0.72; }
  11% { opacity: 0.92; }
  23% { opacity: 0.66; }
  37% { opacity: 0.88; }
  49% { opacity: 0.74; }
  63% { opacity: 1; }
  78% { opacity: 0.68; }
  90% { opacity: 0.84; }
}

/* ── Quest headings: rubricated blackletter, flush-left ledger column ── */
.credits-block__title {
  width: min(36rem, 86vw);
  margin: 0 auto 1rem;
  text-align: left;
  text-transform: none;
  letter-spacing: 0.02em;
  font-weight: 400; /* UnifrakturMaguntia ships no bold; avoid synthetic bolding */
  color: var(--ql-wax);
}
.credits-block__title::before { /* rubricator's paragraph mark, gilt with a baked highlight */
  content: "❧";
  color: var(--ql-gold);
  font-size: 0.82em;
  margin-right: 0.55ch;
  /* static specular gleam on the gilt ornament — always-safe (L6d) */
  text-shadow: 0 1px 0 rgba(255, 240, 200, 0.55), 0 0 6px rgba(214, 168, 74, 0.35);
}
.credits-block__title::after { /* rubricated header rule: a real GILT hairline that
   catches candlelight (baked specular band, static = always-safe L6d), capped with a
   centred fleuron medallion sitting ON the rule instead of an orphan floating right. */
  content: "❦";
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 0.9rem;
  margin: 0.5rem 0 0;
  opacity: 1;
  border: none;
  background:
    /* the fleuron rides a small parchment cartouche so the rule breaks cleanly around it */
    radial-gradient(ellipse 3.4rem 0.9rem at 50% 50%, var(--ql-paper-cartouche) 0 55%, transparent 62%),
    /* gilt rule: dark seat + bright specular core + fine top glint = a rule with sheen */
    linear-gradient(180deg, transparent calc(50% - 1.3px), rgba(60, 38, 12, 0.45) calc(50% - 1.3px), var(--ql-gold) calc(50% - 0.4px), rgba(255, 238, 196, 0.85) 50%, var(--ql-gold) calc(50% + 0.4px), rgba(60, 38, 12, 0.3) calc(50% + 1.3px), transparent calc(50% + 1.3px));
  padding: 0;
  text-align: center;
  font-size: 0.62em;
  line-height: 1;
  color: var(--ql-gold);
  text-shadow: 0 1px 0 rgba(255, 240, 200, 0.6), 0 0 5px rgba(214, 168, 74, 0.4);
}

/* ── Guild roster: sign-in ledger lines, tally inked right after the name ── */
.credits-block__list {
  width: min(36rem, 86vw);
  margin: 0 auto;
  text-align: left;
}
.credit {
  display: flex;
  align-items: baseline;
  padding: 0.05em 0.4em 0.2em;
  border-bottom: 1px solid var(--ql-rule); /* solid ruled sign-in line */
}
.credit__name {
  min-width: 0;
  overflow-wrap: anywhere; /* 25-char usernames wrap, never clip */
}
.credit__amount { /* "× N" tally: small, inked, slightly raised off the line */
  flex-shrink: 0;
  margin-left: 0.75ch;
  position: relative;
  top: -0.35em;
  opacity: 1;
  color: var(--ql-tally);
  font-family: var(--ql-sc-font);
  font-size: 0.72em;
  letter-spacing: 0.06em;
}
.credit__amount::before { content: "× "; color: var(--ql-gold); }

/* ── Intro flourish: illuminated title page ── */
.flourish { gap: 1.4rem; }
/* Frontispiece crest — an illuminated guild medallion that crowns the title page and
   anchors the top of the sheet. Gilt burnished disc, embossed heraldic device, a baked
   diagonal specular sweep + soft candle bloom (all static = always-safe L6d). Becomes the
   first flex child of the centred intro column, giving the page a proper crowning ornament
   instead of an empty cream void above the title. */
.flourish--intro::before {
  content: "✠";
  order: -1;
  display: var(--quest-log-scenery, flex);
  align-items: center;
  justify-content: center;
  width: 5.6rem;
  height: 5.6rem;
  margin-bottom: 0.9rem;
  font-family: var(--credits-title-font);
  font-size: 2.6rem;
  color: #6b1418; /* embossed device — deep guild crimson */
  text-shadow:
    -1px -1px 1px rgba(40, 20, 6, 0.55),
    1px 1px 1px rgba(255, 244, 214, 0.65),
    0 0 4px rgba(90, 58, 20, 0.4);
  background:
    /* diagonal specular sweep across the gilt — the candle catching the medal */
    linear-gradient(122deg, rgba(255, 250, 224, 0.85) 0%, rgba(255, 250, 224, 0) 22%),
    /* secondary lower sheen so the gold reads convex, not flat */
    radial-gradient(ellipse 54% 40% at 66% 74%, rgba(255, 208, 128, 0.4), transparent 66%),
    /* an inner rope-ring bevel: a darker band inside the gold edge */
    radial-gradient(circle at 50% 50%, transparent 74%, rgba(120, 82, 32, 0.55) 78%, rgba(214, 172, 92, 0.7) 84%, rgba(120, 82, 32, 0.4) 90%, transparent 92%),
    /* burnished gold body: bright lit crown → deep antique gold rim */
    radial-gradient(circle at 38% 32%, #f4dc9e 0 14%, #ddb96e 40%, #b98f42 68%, #8f6a2c 90%, #79591f 100%);
  border: 1px solid rgba(120, 80, 30, 0.85);
  border-radius: 50%;
  box-shadow:
    inset 0 2px 3px rgba(255, 250, 224, 0.6),
    inset 0 -4px 6px rgba(74, 48, 16, 0.5),
    0 0 0 4px rgba(58, 36, 12, 0.16),   /* thin dark seat ring */
    0 0 14px 3px rgba(255, 190, 96, 0.22), /* soft candle bloom off the gilt (coarse, static) */
    0 5px 12px rgba(40, 22, 8, 0.45);
}
/* flanking frontispiece rules — short gilt hairlines that turn the lone medallion into
   a designed title-page header band (static gilt, always-safe) */
.flourish--intro::after {
  content: "";
  order: -1; /* also above the badge, just under the crest */
  display: var(--quest-log-scenery, block);
  width: 14rem;
  max-width: 62vw;
  height: 3px;
  margin: 0 auto 0.2rem;
  background: linear-gradient(90deg, transparent 0%, rgba(120, 80, 24, 0.35) 12%, var(--ql-gold) 34%, rgba(255, 240, 200, 0.9) 50%, var(--ql-gold) 66%, rgba(120, 80, 24, 0.35) 88%, transparent 100%);
}
.flourish__badge { /* gilt-ruled title band with a baked specular sheen on the gold */
  font-size: 0; /* copy swap: real text lives on ::after */
  color: var(--ql-ink);
  border: none;
  /* the double-rules are painted as sheened gilt bars (bright core + dark seat) so the
     gold catches candlelight instead of reading as flat lines — static, always-safe */
  border-top: 3px double transparent;
  border-bottom: 3px double transparent;
  border-image: linear-gradient(90deg, rgba(120, 80, 24, 0.4) 0%, var(--ql-gold) 26%, rgba(255, 240, 200, 0.95) 50%, var(--ql-gold) 74%, rgba(120, 80, 24, 0.4) 100%) 1;
  border-radius: 0;
  padding: 0.55rem 1.9rem;
  box-shadow: none;
}
.flourish__badge::after {
  content: "Inscribed by Candlelight";
  display: inline-block;
  font-family: var(--ql-sc-font);
  font-size: 0.95rem;
  line-height: 1.4;
  letter-spacing: 0.26em;
  text-transform: none; /* the SC face supplies the small caps */
  color: var(--ql-ink);
  text-shadow: 0 1px 0 rgba(255, 244, 214, 0.5); /* letterpress lift on the caps */
}
.flourish__title { /* streamer-configurable text — restyled only, never swapped */
  text-transform: none;
  font-weight: 400;
  letter-spacing: 0.02em;
  color: var(--ql-ink-deep);
}
.flourish--intro .flourish__title::first-letter { /* illuminated drop-cap: gilt-leafed
   initial on a burnished panel with a baked diagonal specular sweep (static = safe) */
  font-size: 1.5em;
  /* crop the blackletter's deep descent so the gilt tile hugs the cap-to-baseline
     of the initial and sits flush on the same baseline as the rest of the word,
     instead of hanging a slab of empty gold below the line */
  line-height: 0.72;
  color: var(--ql-wax);
  background:
    linear-gradient(128deg, rgba(255, 244, 214, 0.6) 0%, rgba(255, 244, 214, 0) 26%),
    linear-gradient(135deg, rgba(214, 168, 74, 0.55) 0%, rgba(184, 138, 52, 0.28) 50%, rgba(150, 108, 40, 0.42) 100%);
  border: 1px solid rgba(150, 100, 34, 0.7);
  border-radius: 0.07em;
  box-shadow:
    inset 0 1px 0 rgba(255, 248, 220, 0.6),
    inset 0 -1px 2px rgba(90, 58, 20, 0.35),
    0 1px 2px rgba(60, 36, 12, 0.3);
  padding: 0.1em 0.13em 0.08em;
  margin-right: 0.12em;
  text-shadow: 0 1px 0 rgba(255, 230, 190, 0.5);
}
.flourish__tagline { font-size: 1.15rem; opacity: 0.9; color: #5a3a1a; }
.flourish__rating { /* red ink stamp */
  font-size: 0; /* copy swap */
  color: var(--ql-wax);
  border: 2px solid rgba(138, 30, 34, 0.55);
  border-radius: 3px;
  padding: 0.4rem 1rem;
  opacity: 0.9;
  transform: rotate(-2.5deg);
}
.flourish__rating::after {
  content: "Sealed by the Guildmaster’s Hand";
  display: inline-block;
  font-family: var(--ql-sc-font);
  font-size: 0.8rem;
  line-height: 1.4;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

/* ── Outro: "So ends the tale…" + wax seal ── */
.flourish--outro .flourish__title { font-size: 0; } /* copy swap */
.flourish--outro .flourish__title::after {
  content: "So ends the tale…";
  display: block;
  font-size: var(--credits-flourish-title-size);
  line-height: 1.15;
  letter-spacing: 0.02em;
}
.flourish--outro .flourish__tagline { font-size: 0; } /* copy swap */
.flourish--outro .flourish__tagline::after {
  content: "Until the next quest — rest well, adventurers";
  display: block;
  font-size: 1.15rem;
  line-height: 1.5;
  font-style: italic;
}
/* Wax seal — rebuilt as REAL sealing wax pressed into the page. The ::before is the
   irregular molten pool/spatter that oozed out under the stamp; the ::after is the
   pressed disc with an uneven raised rim, a matte crimson body, a debossed emblem, and
   ONE soft off-centre specular gleam (static highlight = always-safe L6d). It sits still
   because a seal is set once — no motion, no flicker. */
/* The molten "squeezed-out" wax is baked directly into the disc (concentric outer glow
   + irregular skirt) rather than a separate offset box — an offset ::before read as a
   detached coffee-ring. The disc alone, with a wax-red contact halo, is cleaner + safer. */
.flourish--outro::after { /* the pressed seal disc */
  content: "⚜︎"; /* fleur-de-lis, text presentation forced */
  position: relative;
  z-index: 1;
  width: 7.6rem;
  height: 7.6rem;
  margin-top: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--credits-title-font);
  font-size: 3.1rem;
  color: #5a1114; /* debossed emblem colour */
  /* emboss: dark cut on top-left, light lift on bottom-right = pressed INTO the wax */
  text-shadow:
    -1px -1px 1px rgba(40, 6, 8, 0.85),
    1px 1px 1px rgba(255, 170, 150, 0.35),
    0 0 3px rgba(60, 10, 12, 0.4);
  background:
    /* 1 — a soft SATIN sheen off-centre (candle grazing the matte wax): a broad
       low-alpha bloom, not the tight glossy hotspot that read as a plastic gumdrop */
    radial-gradient(ellipse 2.4rem 1.9rem at 36% 30%, rgba(255, 226, 202, 0.24), rgba(255, 226, 202, 0.07) 50%, transparent 74%),
    /* 2 — a faint warm counter-sheen lower-right so the wax reads rounded, not flat */
    radial-gradient(ellipse 2.4rem 1.6rem at 66% 70%, rgba(255, 150, 130, 0.1), transparent 72%),
    /* 2b — micro matte mottling so the body isn't a uniform candy fill (static) */
    radial-gradient(circle 0.5rem at 52% 44%, rgba(60, 12, 14, 0.16), transparent 60%),
    radial-gradient(circle 0.4rem at 44% 60%, rgba(60, 12, 14, 0.13), transparent 62%),
    /* 3 — the raised RIM: bright lit lip top-left, dark shadowed lip bottom-right */
    radial-gradient(circle at 40% 36%, transparent 66%, rgba(255, 196, 168, 0.4) 70%, rgba(150, 40, 42, 0.2) 74%, transparent 76%),
    radial-gradient(circle at 60% 64%, transparent 66%, rgba(56, 12, 14, 0.55) 72%, transparent 80%),
    /* 4 — pressed inner well ring (the die's raised border bit into the wax) */
    radial-gradient(circle at 50% 50%, transparent 50%, rgba(58, 12, 14, 0.5) 54%, rgba(58, 12, 14, 0.5) 59%, transparent 63%),
    /* 5 — matte molten body: hot lit crimson upper-left → deep cool ox-blood lower-right */
    radial-gradient(circle at 38% 32%, #b02a2e 0 30%, #9b2226 42%, #86191d 64%, #6b1418 84%, #571014 100%);
  border-radius: 47% 53% 51% 49% / 52% 48% 55% 45%; /* irregular hand-pressed disc */
  box-shadow:
    0 0 0 3px rgba(120, 22, 26, 0.5),        /* thin wax skirt: molten bleed at the edge */
    0 0 10px 5px rgba(116, 20, 24, 0.32),    /* soft wax contact halo, concentric */
    0 10px 20px rgba(20, 8, 3, 0.55),        /* cast shadow onto the page */
    0 3px 5px rgba(20, 8, 3, 0.4),
    inset 0 -6px 12px rgba(40, 8, 10, 0.42), /* body darkens to the lower rim */
    inset 0 5px 10px rgba(255, 210, 190, 0.16); /* top catches candlelight */
  transform: rotate(-7deg);
}

/* ── Raid finale (scroll): the outro flourish <section> is the true last
   sibling, so :nth-last-of-type(2) is the Raids block — a proclamation. ── */
.credits-block:nth-last-of-type(2) {
  box-sizing: border-box;
  width: min(38rem, 88vw);
  padding: 1.6rem 1.4rem 1.8rem;
  border: 3px double rgba(138, 30, 34, 0.55);
  background: linear-gradient(rgba(210, 176, 117, 0.55), rgba(210, 176, 117, 0.2));
  box-shadow: inset 0 0 24px rgba(90, 58, 26, 0.22);
}
.credits-block:nth-last-of-type(2)::before {
  content: "— the horns sound at the gates —";
  display: block;
  margin-bottom: 0.6rem;
  font-style: italic;
  font-size: 0.95rem;
  color: var(--ql-wax);
  opacity: 0.85;
  text-align: center;
}
.credits-block:nth-last-of-type(2) .credits-block__title,
.credits-block:nth-last-of-type(2) .credits-block__list { width: 100%; }
.credits-block:nth-last-of-type(2) .credits-block__title::before {
  content: "⚔︎ ";
  color: var(--ql-wax);
}

/* ── Slideshow: spread-ledger columns + a gentle page-settle entrance ── */
.credits-slide {
  transform: translateY(12px); /* safe: only .credits-roll's transform is JS-owned */
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.credits-slide.is-active { transform: translateY(0); }
.credits-slide .credits-block__title { width: auto; text-align: center; }
.credits-slide .credits-block__list { /* big follower pages read as a two-column spread */
  display: block;
  width: auto;
  max-width: min(42rem, 88vw);
  column-width: 16rem;
  column-gap: 2.5rem;
  column-rule: 1px solid rgba(90, 58, 26, 0.3);
}
.credits-slide .credit { margin-bottom: var(--credits-name-gap); break-inside: avoid; }
/* Raid slide finale: second-to-last slide (the outro flourish is last) */
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  content: "⚔︎ ";
  color: var(--ql-wax);
}
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__list {
  border: 3px double rgba(138, 30, 34, 0.55);
  padding: 1.2rem 1.4rem;
  background: linear-gradient(rgba(210, 176, 117, 0.55), rgba(210, 176, 117, 0.2));
}

/* ── Motion ── */
@keyframes questlog-candle { /* uneven stops = organic hearth flicker */
  0%, 100% { opacity: 0.55; }
  13% { opacity: 0.68; }
  24% { opacity: 0.5; }
  38% { opacity: 0.66; }
  52% { opacity: 0.57; }
  66% { opacity: 0.7; }
  81% { opacity: 0.52; }
}
@media (prefers-reduced-motion: reduce) {
  html::before { animation: none; will-change: auto; } /* release the pinned layer too */
  head meta:first-of-type::after { animation: none; will-change: auto; opacity: 0.85; } /* candle parked warm */
  body::after { animation: none; will-change: auto; } /* flame parked upright */
  head link::before,
  head link::after,
  head title::before { animation: none; } /* embers stay dark (opacity 0 base) */
  .credits-slide, .credits-slide.is-active { transform: none; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--quest-log-scenery:none;}",
};
