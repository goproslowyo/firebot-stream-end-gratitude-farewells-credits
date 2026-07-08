import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. Final Round: midnight dojo VS screen — a paper lantern swings over two silhouetted rivals, brush slashes cross the night, and the community rolls by as the roster: health bars, combo counters, ROUND N — FIGHT!, and a K.O.!! PERFECT for the raiders. */
export const VARIANT: ThemeVariant = {
  key: "fighter",
  name: "Final Round",
  css: `
/* ================================================================
   FINAL ROUND — layered after the base theme.
   Fiction: the last cabinet in the arcade runs one match a night,
   at midnight, in a dojo nobody can find twice. A paper lantern
   swings over the mat; two rivals hold their stances at the edges
   of the screen and never throw first. Tonight's roster is the
   community — every name a challenger with a health bar, every
   amount a combo counter. Raids are the FINAL ROUND: K.O.!! and
   the word every fighter chases — PERFECT.
   Typography: Anton slant caps punched on slashed banners (crimson
   / gold / steel cycling per round), Chakra Petch arcade caps for
   the roster and eyebrows.
   Layer map (all scenery kill-switched via --fighter-scenery):
     html bg (--credits-bg)   midnight dojo gradient (cheap linear)
     html::before             LIGHT STORY — lantern glow upper-left,
                              moon wash + disc upper-right, warm mat
                              pool, floor line, vignette. STATIC,
                              promoted
     html::after              BRUSH SLASHES — red ink sweep from the
                              upper-left, gold counter-slash lower-
                              right, spatter. One SVG. STATIC, promoted
     body::before             THE RIVALS — two fighter silhouettes at
                              the bottom corners, rim-lit (crimson vs
                              steel), cast shadows, mat line. STATIC,
                              promoted
     body::after              center-lane readability scrim. STATIC
     head::before             THE LANTERN — hero prop upper-left,
                              swings gently (continuous mover #1,
                              will-change)
     head::after              VS emblem bottom-center: gold bolt +
                              "VS" between the rivals. STATIC, promoted
     meta:first-of-type::before  embers rising past the right rival
                              (continuous mover #2, small, will-change)
   ================================================================ */
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Chakra+Petch:ital,wght@0,500;0,600;0,700;1,600;1,700&display=swap');

:root {
  /* ── palette: the dojo at midnight ── */
  --fighter-scenery: block; /* set to none to strip every scenery layer */
  --fighter-crimson: #c9242c;
  --fighter-red-hot: #ff4438;
  --fighter-gold: #f2b32c;
  --fighter-gold-bright: #ffd166;
  --fighter-steel: #6ea8cf;
  --fighter-cream: #f6eedd;
  --fighter-ink: #17090c;

  /* ── base hooks ── */
  /* Cheap room: ONE linear gradient — cold night falling into the warm
     lantern-lit mat, then dropping to black at the floor (L3: the real
     light story lives on the promoted html::before). */
  --credits-bg: linear-gradient(180deg, #06040a 0%, #0a0711 24%, #100a13 46%, #150c11 66%, #190f0f 82%, #0b0709 100%);
  --credits-color: var(--fighter-cream);
  --credits-accent: var(--fighter-gold);
  --credits-font: "Chakra Petch", "Trebuchet MS", Verdana, sans-serif;
  --credits-title-font: "Anton", "Arial Narrow", Impact, sans-serif;
  --credits-title-size: clamp(1.4rem, 3.6vw, 2.2rem);
  --credits-name-size: clamp(1rem, 2.5vw, 1.42rem);
  --credits-flourish-title-size: clamp(2.4rem, 8vw, 5rem);
  --credits-block-gap: 5.25rem;
  --credits-name-gap: 1.05rem;
  --credits-shadow: 0 2px 12px rgba(4, 2, 8, 0.85);
  /* glow no-op — never "none" (a "none" in the composed shadow list
     invalidates the whole declaration); Final Round glows are bespoke. */
  --credits-glow: 0 0 0 rgba(0, 0, 0, 0);
}

/* Scenery is full-bleed: html drops the base edge-fade; body keeps a mask
   with a steeper floor ramp so the roster dies out BEFORE the VS emblem
   (names crawling over the gold bolt read as clutter at the base 89%). */
html { -webkit-mask-image: none; mask-image: none; }
body {
  background: transparent;
  counter-reset: fighter-round;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 11%, #000 84%, transparent 90%);
  mask-image: linear-gradient(to bottom, transparent 0%, #000 11%, #000 84%, transparent 90%);
}

/* ═══ THE LIGHT STORY — one static promoted layer (L3). The lantern owns
   the upper-left in hot vermilion; the moon answers upper-right in cold
   steel; both lights land on the mat as a warm pool where the rivals
   stand. A gold breath marks the floor line, and the corners fall away.
   Everything huge and soft — nothing here can flicker against glyphs. */
html::before {
  content: "";
  display: var(--fighter-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* corner vignette — the dojo swallows its edges */
    radial-gradient(ellipse 140% 120% at 50% 40%, rgba(3, 2, 7, 0) 56%, rgba(3, 2, 7, 0.58) 100%),
    /* THE RIDGE BEAM — a heavy rafter running the ceiling, closing the top of
       the frame the way the shoji wall closes the middle: dark wood volume, a
       gold breath along its lower edge where the lantern light grazes it, and
       a soft shadow it drops onto the night below. Coarse, STATIC. */
    linear-gradient(180deg, rgba(9, 4, 3, 0.92) 0%, rgba(38, 19, 14, 0.88) 42%, rgba(52, 27, 18, 0.85) 62%, rgba(12, 6, 4, 0.95) 100%) 0 0 / 100% 30px no-repeat,
    linear-gradient(180deg, rgba(240, 200, 120, 0.22) 0%, rgba(240, 200, 120, 0) 100%) 0 30px / 100% 3px no-repeat,
    linear-gradient(180deg, rgba(3, 2, 7, 0.5) 0%, rgba(3, 2, 7, 0) 100%) 0 33px / 100% 34px no-repeat,
    /* lantern light, upper-left: hot vermilion breath */
    radial-gradient(ellipse 34vw 30vh at 8% 0%, rgba(255, 96, 54, 0.17), rgba(255, 96, 54, 0.06) 55%, rgba(255, 96, 54, 0) 76%),
    /* lantern god-ray: a soft warm shaft raking down-right from the paper
       glow (coarse, low-alpha, static — volumetric depth, L6-safe) */
    linear-gradient(122deg, rgba(255, 130, 60, 0) 8%, rgba(255, 138, 66, 0.09) 15%, rgba(255, 120, 54, 0.02) 24%, rgba(255, 120, 54, 0) 34%),
    /* moon corona: a cool halo bleeding off the disc into the night */
    radial-gradient(circle at 89% 8%, rgba(150, 190, 230, 0) 44px, rgba(150, 190, 230, 0.06) 90px, rgba(150, 190, 230, 0) 220px),
    /* the moon: small hard disc in the corner (corners are L6-legal) */
    radial-gradient(circle at 89% 8%, rgba(226, 238, 250, 0.95) 0 9px, rgba(196, 216, 240, 0.35) 14px, rgba(180, 205, 235, 0.1) 24px, rgba(180, 205, 235, 0) 44px),
    /* cold moon wash answering from upper-right */
    radial-gradient(ellipse 36vw 30vh at 92% 0%, rgba(140, 178, 218, 0.13), rgba(140, 178, 218, 0.05) 55%, rgba(140, 178, 218, 0) 75%),
    /* where the lights land: warm pool on the mat between the rivals */
    radial-gradient(ellipse 46vw 13vh at 50% 97%, rgba(255, 150, 66, 0.13), rgba(255, 150, 66, 0.05) 55%, rgba(255, 150, 66, 0) 78%),
    /* footlights behind the rivals so their silhouettes pop */
    radial-gradient(ellipse 17vw 20vh at 7% 94%, rgba(255, 120, 60, 0.14), rgba(255, 120, 60, 0) 72%),
    radial-gradient(ellipse 17vw 20vh at 93% 94%, rgba(126, 168, 210, 0.12), rgba(126, 168, 210, 0) 72%),
    /* floor line: gold breath where the mat meets the dark */
    linear-gradient(180deg, rgba(242, 179, 44, 0) 0%, rgba(242, 179, 44, 0.07) 40%, rgba(255, 190, 90, 0.12) 52%, rgba(242, 179, 44, 0.03) 72%, rgba(242, 179, 44, 0) 100%) 0 79vh / 100% 44px no-repeat,
    /* the floor falls to black under the roster */
    linear-gradient(180deg, rgba(3, 2, 6, 0) 0%, rgba(3, 2, 6, 0.4) 100%) 0 80vh / 100% 20vh no-repeat,
    /* ── MID-GROUND: the shoji wall of the dojo far behind the mat. A row of
       rim-lit paper panels under a heavy rafter beam, warm on the lantern
       side cooling to the moon side. Coarse panels (>40px), very low alpha,
       hazed by atmospheric perspective — it fills the dead middle without
       fighting the lane (the body scrim rides over it). STATIC. ── */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900' preserveAspectRatio='xMidYMax slice'%3E%3Cdefs%3E%3ClinearGradient id='paw' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23f4d79a' stop-opacity='.15'/%3E%3Cstop offset='.5' stop-color='%23c88a4e' stop-opacity='.09'/%3E%3Cstop offset='1' stop-color='%236a4426' stop-opacity='.02'/%3E%3C/linearGradient%3E%3ClinearGradient id='pac' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23c6def2' stop-opacity='.12'/%3E%3Cstop offset='.5' stop-color='%237098bc' stop-opacity='.07'/%3E%3Cstop offset='1' stop-color='%233a4c64' stop-opacity='.02'/%3E%3C/linearGradient%3E%3ClinearGradient id='wood' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23241410' stop-opacity='.62'/%3E%3Cstop offset='1' stop-color='%23120a08' stop-opacity='.78'/%3E%3C/linearGradient%3E%3ClinearGradient id='beam' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23140a08' stop-opacity='.2'/%3E%3Cstop offset='.45' stop-color='%232e1712' stop-opacity='.62'/%3E%3Cstop offset='1' stop-color='%23070303' stop-opacity='.78'/%3E%3C/linearGradient%3E%3ClinearGradient id='haze' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23070510' stop-opacity='0'/%3E%3Cstop offset='.66' stop-color='%23090610' stop-opacity='.28'/%3E%3Cstop offset='1' stop-color='%230a0710' stop-opacity='.9'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg%3E%3Crect x='60' y='318' width='268' height='338' rx='4' fill='url(%23paw)'/%3E%3Crect x='344' y='318' width='268' height='338' rx='4' fill='url(%23paw)'/%3E%3C/g%3E%3Cg stroke='url(%23wood)' fill='none'%3E%3Crect x='60' y='318' width='268' height='338' stroke-width='9'/%3E%3Crect x='344' y='318' width='268' height='338' stroke-width='9'/%3E%3Cg stroke-width='4' opacity='.9'%3E%3Cpath d='M194 318 v338 M60 431 h268 M60 544 h268'/%3E%3Cpath d='M478 318 v338 M344 431 h268 M344 544 h268'/%3E%3C/g%3E%3C/g%3E%3Cg stroke='%23ffcf8a' stroke-width='2' opacity='.16' fill='none'%3E%3Cpath d='M66 324 h256 M350 324 h256'/%3E%3C/g%3E%3Cg%3E%3Crect x='988' y='318' width='268' height='338' rx='4' fill='url(%23pac)'/%3E%3Crect x='1272' y='318' width='268' height='338' rx='4' fill='url(%23pac)'/%3E%3C/g%3E%3Cg stroke='url(%23wood)' fill='none'%3E%3Crect x='988' y='318' width='268' height='338' stroke-width='9'/%3E%3Crect x='1272' y='318' width='268' height='338' stroke-width='9'/%3E%3Cg stroke-width='4' opacity='.9'%3E%3Cpath d='M1122 318 v338 M988 431 h268 M988 544 h268'/%3E%3Cpath d='M1406 318 v338 M1272 431 h268 M1272 544 h268'/%3E%3C/g%3E%3C/g%3E%3Cg stroke='%23bcd9f2' stroke-width='2' opacity='.12' fill='none'%3E%3Cpath d='M994 324 h256 M1278 324 h256'/%3E%3C/g%3E%3Crect x='0' y='280' width='1600' height='46' fill='url(%23beam)'/%3E%3Crect x='0' y='320' width='1600' height='3' fill='%23f0c878' opacity='.14'/%3E%3Crect x='40' y='322' width='26' height='334' fill='%23130b08' opacity='.42'/%3E%3Crect x='1534' y='322' width='26' height='334' fill='%230a0608' opacity='.42'/%3E%3Crect x='0' y='300' width='1600' height='600' fill='url(%23haze)'/%3E%3C/svg%3E") center top / cover no-repeat;
}

/* ═══ BRUSH SLASHES — the VS-screen ink: a red sweep cutting in from the
   upper-left and a gold counter-slash rising from the lower-right, with
   dry-brush trails and spatter. Low alpha, coarse, corners/edges only.
   One SVG, STATIC, promoted. */
html::after {
  content: "";
  display: var(--fighter-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900' preserveAspectRatio='none'%3E%3Cg fill='%23c9242c'%3E%3Cpath d='M-60 8 C 180 74 400 172 610 388 C 632 410 620 434 596 428 C 372 250 150 132 -70 84 Z' opacity='.16'/%3E%3Cpath d='M610 388 C 640 414 664 446 676 480 C 660 470 634 448 612 420 C 606 408 604 396 610 388 Z' opacity='.11'/%3E%3C/g%3E%3Cg stroke='%23c9242c' stroke-linecap='round' fill='none'%3E%3Cpath d='M-40 46 C 180 108 380 210 560 386' stroke-width='5' opacity='.1'/%3E%3Cpath d='M-30 70 C 170 128 360 230 520 396' stroke-width='3' opacity='.08'/%3E%3Cpath d='M120 150 C 260 220 380 300 470 400' stroke-width='2.5' opacity='.09'/%3E%3Cpath d='M600 384 L648 452 M614 402 L676 470 M596 372 L628 430' stroke-width='2.5' opacity='.12'/%3E%3C/g%3E%3Cg fill='%23e0342e'%3E%3Ccircle cx='650' cy='470' r='6' opacity='.16'/%3E%3Ccircle cx='700' cy='512' r='4' opacity='.13'/%3E%3Ccircle cx='624' cy='430' r='3.4' opacity='.14'/%3E%3Ccircle cx='732' cy='548' r='2.6' opacity='.1'/%3E%3Ccircle cx='566' cy='352' r='2.4' opacity='.12'/%3E%3C/g%3E%3Cg fill='%23f2b32c'%3E%3Cpath d='M1680 620 C 1440 686 1220 772 1004 892 C 980 900 966 878 986 866 C 1200 748 1420 668 1660 616 Z' opacity='.14'/%3E%3Cpath d='M1004 892 C 968 872 940 846 924 812 C 946 826 976 852 1000 878 C 1008 886 1010 894 1004 892 Z' opacity='.1'/%3E%3C/g%3E%3Cg stroke='%23f2b32c' stroke-linecap='round' fill='none'%3E%3Cpath d='M1670 656 C 1450 716 1250 796 1044 892' stroke-width='4.5' opacity='.09'/%3E%3Cpath d='M1660 690 C 1470 742 1300 812 1120 884' stroke-width='2.6' opacity='.06'/%3E%3Cpath d='M1000 878 L950 812 M1014 862 L960 800 M986 884 L946 838' stroke-width='2.4' opacity='.1'/%3E%3C/g%3E%3Cg fill='%23ffcf5e'%3E%3Ccircle cx='946' cy='808' r='5' opacity='.15'/%3E%3Ccircle cx='902' cy='770' r='3.4' opacity='.12'/%3E%3Ccircle cx='978' cy='838' r='3' opacity='.13'/%3E%3Ccircle cx='872' cy='742' r='2.4' opacity='.1'/%3E%3C/g%3E%3C/svg%3E") 0 0 / 100% 100% no-repeat;
}

/* ═══ THE RIVALS — two fighters holding their stances at the bottom
   corners, facing each other across the lane. Each is SCULPTED, not a flat
   blob: a body-volume gradient (near-black core warming/cooling toward its
   key light), gi folds, belt, headband, a tapered rim-light on the lit
   edges, and a soft contact shadow anchoring the feet. The challenger
   lunges left (crimson rim from the lantern); the champion guards right
   (steel rim from the moon). Both SVGs + a mat line ride ONE static
   promoted layer. */
body::before {
  content: "";
  display: var(--fighter-scenery, block);
  position: fixed;
  left: 0;
  right: auto;
  width: 46vw;
  bottom: 0;
  height: 44vh;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  animation: fighter-breathe 2.4s ease-in-out infinite;
  background:
    url("data:image/svg+xml,%3Csvg viewBox='0 0 250 280' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='cb' x1='.15' y1='0' x2='.9' y2='1'%3E%3Cstop offset='0' stop-color='%235a2026'/%3E%3Cstop offset='.4' stop-color='%232c1015'/%3E%3Cstop offset='.8' stop-color='%2317080d'/%3E%3Cstop offset='1' stop-color='%230d040a'/%3E%3C/linearGradient%3E%3CradialGradient id='cs' cx='50%' cy='50%' r='50%'%3E%3Cstop offset='0' stop-color='%23040108' stop-opacity='.75'/%3E%3Cstop offset='1' stop-color='%23040108' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='108' cy='270' rx='110' ry='9' fill='url(%23cs)'/%3E%3Cg fill='none' stroke='url(%23cb)' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M92 154 L46 250' stroke-width='24'/%3E%3Cpath d='M106 154 L148 194 L156 250' stroke-width='25'/%3E%3C/g%3E%3Cpath d='M38 246 L60 256 L54 264 L30 260 Z' fill='%2312060b'/%3E%3Cpath d='M146 248 L176 250 L178 262 L144 262 Z' fill='%2312060b'/%3E%3C!-- torso / gi jacket (slimmer, tapered to belt) --%3E%3Cpath d='M88 76 Q86 68 98 66 L128 70 Q136 90 132 116 L128 156 Q108 162 86 156 L88 112 Q86 92 88 76 Z' fill='url(%23cb)'/%3E%3Cpath d='M94 90 L76 118 L72 142' fill='none' stroke='url(%23cb)' stroke-width='17' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='72' cy='143' r='10' fill='%231a0810'/%3E%3Cpath d='M124 90 L170 104 L206 120' fill='none' stroke='url(%23cb)' stroke-width='17' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='207' cy='121' r='11' fill='%231a0810'/%3E%3Crect x='110' y='56' width='18' height='18' rx='5' fill='url(%23cb)'/%3E%3Ccircle cx='119' cy='46' r='18' fill='url(%23cb)'/%3E%3C!-- belt --%3E%3Cpath d='M84 148 Q108 156 130 148 L130 160 Q108 168 84 160 Z' fill='%23c9242c'/%3E%3Cpath d='M112 158 L122 158 L118 182 L108 182 Z' fill='%23a51e1e'/%3E%3Cpath d='M120 158 L130 158 L134 180 L124 180 Z' fill='%23c9242c'/%3E%3C!-- gi lapel --%3E%3Cpath d='M110 72 Q116 108 118 150 L111 150 Q108 108 106 74 Z' fill='%230d0409' opacity='.55'/%3E%3C!-- headband over the head (closes the gap) --%3E%3Cpath d='M102 42 Q119 35 137 43 L135 51 Q119 44 104 51 Z' fill='%23c9242c'/%3E%3Cpath d='M104 46 Q90 50 82 43 Q89 55 102 54 Z' fill='%23c9242c'/%3E%3Cpath d='M86 44 L72 37 M86 49 L74 52' stroke='%23a51e1e' stroke-width='2.6' stroke-linecap='round'/%3E%3C!-- RIM LIGHT: lantern upper-left → warm edges top/left --%3E%3Cg fill='none' stroke-linecap='round'%3E%3Cpath d='M102 40 Q112 31 126 32' stroke='%23ff9a5a' stroke-width='3' opacity='.85'/%3E%3Cpath d='M101 48 Q98 58 103 68' stroke='%23ff7a4a' stroke-width='2.6' opacity='.65'/%3E%3Cpath d='M88 82 Q85 116 87 154' stroke='%23ff6a42' stroke-width='2.8' opacity='.7'/%3E%3Cpath d='M124 90 Q170 104 206 120' stroke='%23ff8a52' stroke-width='2.8' opacity='.82'/%3E%3Cpath d='M92 154 L46 250' stroke='%23ff6a42' stroke-width='2.4' opacity='.5'/%3E%3Cpath d='M106 154 L148 194' stroke='%23ff7a4a' stroke-width='2.2' opacity='.46'/%3E%3Cpath d='M94 90 L76 118' stroke='%23ff6a42' stroke-width='2' opacity='.45'/%3E%3C/g%3E%3C/svg%3E") left 2vw bottom 0 / auto 41vh no-repeat;
}

/* ═══ the lane: the roster must stay readable over the slashes, so the
   center column gets a quiet ink scrim — coarse, soft, STATIC. It fades
   before the corners so the rivals keep their rim light. */
body::after {
  content: "";
  display: var(--fighter-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background: linear-gradient(90deg,
    rgba(4, 2, 8, 0) 10%, rgba(4, 2, 8, 0.4) 30%, rgba(4, 2, 8, 0.48) 50%,
    rgba(4, 2, 8, 0.4) 70%, rgba(4, 2, 8, 0) 90%),
    /* the mat: a thin warm line the rivals stand on (static floor) */
    linear-gradient(180deg, rgba(255, 170, 80, 0) 0%, rgba(255, 170, 80, 0.14) 48%, rgba(255, 170, 80, 0) 100%) 0 calc(100% - 3.2vh) / 100% 3px no-repeat;
}

/* ═══ SHINE — light motes catching the dojo glow, RIDING THE ROLL. Because this
   pseudo lives on .credits-roll it travels UP with the names (never screen-fixed),
   so per L6(b) it cannot flicker against the lane. Kept COARSE + soft (>=40px, gentle
   falloff) and pushed toward the column edges so it reads as drifting incense-light,
   not twinkles. Full roll height so motes ride the whole crawl; kill-switched. */
.credits-roll::before,
.credits-slideshow::before {
  content: "";
  display: var(--fighter-scenery, block);
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    /* warm glints toward the left (lantern side) */
    radial-gradient(circle 5px at 15% 8%, rgba(255, 214, 150, 0.5), rgba(255, 214, 150, 0) 70%),
    radial-gradient(circle 7px at 9% 34%, rgba(255, 196, 120, 0.4), rgba(255, 196, 120, 0) 72%),
    radial-gradient(circle 4px at 20% 61%, rgba(255, 224, 170, 0.42), rgba(255, 224, 170, 0) 72%),
    radial-gradient(circle 6px at 12% 86%, rgba(255, 200, 130, 0.4), rgba(255, 200, 130, 0) 72%),
    /* cool glints toward the right (moon side) */
    radial-gradient(circle 6px at 86% 16%, rgba(178, 214, 245, 0.4), rgba(178, 214, 245, 0) 72%),
    radial-gradient(circle 4px at 92% 48%, rgba(200, 226, 248, 0.4), rgba(200, 226, 248, 0) 72%),
    radial-gradient(circle 7px at 83% 74%, rgba(178, 214, 245, 0.36), rgba(178, 214, 245, 0) 72%),
    radial-gradient(circle 5px at 90% 93%, rgba(200, 226, 248, 0.36), rgba(200, 226, 248, 0) 72%);
  background-repeat: no-repeat;
}

/* ═══ THE LANTERN — hero prop, upper-left, hanging over the mat. Paper
   barrel lit from inside (hot core, vermilion shell, ink ribs), gold
   caps, a tassel, and a warm halo. The ONLY swinging thing in the dojo:
   continuous mover #1 (small, will-change; transform-origin at the cord). */
head { display: var(--fighter-scenery, block); }
head::before {
  content: "";
  display: var(--fighter-scenery, block);
  position: fixed;
  top: -6px;
  left: 5vw;
  width: 130px;
  height: 210px;
  z-index: 0;
  pointer-events: none;
  transform-origin: 50% 0;
  transform: translateZ(0);
  will-change: transform;
  animation: fighter-lantern 8s ease-in-out infinite;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 172'%3E%3Cdefs%3E%3CradialGradient id='pg' cx='42%25' cy='42%25' r='64%25'%3E%3Cstop offset='0' stop-color='%23ffe1a0'/%3E%3Cstop offset='.18' stop-color='%23ffb857'/%3E%3Cstop offset='.42' stop-color='%23f47a38'/%3E%3Cstop offset='.66' stop-color='%23d43a26'/%3E%3Cstop offset='.86' stop-color='%23a51e1e'/%3E%3Cstop offset='1' stop-color='%236e1114'/%3E%3C/radialGradient%3E%3ClinearGradient id='pbar' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='.34'/%3E%3Cstop offset='.26' stop-color='%23fff' stop-opacity='.22'/%3E%3Cstop offset='.5' stop-color='%23fff' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='.42'/%3E%3C/linearGradient%3E%3ClinearGradient id='cap' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%236b420f'/%3E%3Cstop offset='.28' stop-color='%23ffe08a'/%3E%3Cstop offset='.5' stop-color='%23c98a24'/%3E%3Cstop offset='.75' stop-color='%23a06a1c'/%3E%3Cstop offset='1' stop-color='%235e3a0c'/%3E%3C/linearGradient%3E%3CradialGradient id='halo' cx='50%25' cy='44%25' r='55%25'%3E%3Cstop offset='0' stop-color='%23ffab5e' stop-opacity='.4'/%3E%3Cstop offset='.42' stop-color='%23ff7a3a' stop-opacity='.16'/%3E%3Cstop offset='.72' stop-color='%23ff6a3a' stop-opacity='.05'/%3E%3Cstop offset='1' stop-color='%23ff6a3a' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='core' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0' stop-color='%23fff2cf' stop-opacity='.95'/%3E%3Cstop offset='.5' stop-color='%23ffd98f' stop-opacity='.55'/%3E%3Cstop offset='1' stop-color='%23ffd98f' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='50' cy='74' rx='50' ry='64' fill='url(%23halo)'/%3E%3Cpath d='M50 0 L50 22' stroke='%23120b0a' stroke-width='2.6'/%3E%3Cpath d='M49 2 L49 22' stroke='%235a4636' stroke-width='1' opacity='.6'/%3E%3Crect x='31' y='20' width='38' height='9' rx='3' fill='url(%23cap)'/%3E%3Crect x='31' y='21' width='38' height='2' rx='1' fill='%23fff3cf' opacity='.7'/%3E%3Crect x='28' y='28' width='4' height='5' rx='1.4' fill='%236e470f'/%3E%3Crect x='68' y='28' width='4' height='5' rx='1.4' fill='%236e470f'/%3E%3Cpath d='M24 32 Q50 24 76 32 Q84 66 76 106 Q50 116 24 106 Q16 66 24 32 Z' fill='url(%23pg)'/%3E%3Cpath d='M24 32 Q50 24 76 32 Q84 66 76 106 Q50 116 24 106 Q16 66 24 32 Z' fill='url(%23pbar)'/%3E%3Cpath d='M31 36 Q27 68 31 104' stroke='%23fff4d8' stroke-width='3' fill='none' opacity='.55' stroke-linecap='round'/%3E%3Cpath d='M30 40 Q27 68 30 100' stroke='%23fff' stroke-width='1.2' fill='none' opacity='.5' stroke-linecap='round'/%3E%3Cg stroke='%236e1014' stroke-width='1.5' fill='none' opacity='.5'%3E%3Cpath d='M22 44 Q50 52 78 44'/%3E%3Cpath d='M20 60 Q50 69 80 60'/%3E%3Cpath d='M20 76 Q50 85 80 76'/%3E%3Cpath d='M20 92 Q50 100 80 92'/%3E%3C/g%3E%3Cg stroke='%23ffca8a' stroke-width='1' fill='none' opacity='.3'%3E%3Cpath d='M22 46 Q50 54 78 46'/%3E%3Cpath d='M20 78 Q50 87 80 78'/%3E%3C/g%3E%3Cpath d='M33 30 Q28 68 33 108' stroke='%23ffd9a8' stroke-width='2.4' fill='none' opacity='.4'/%3E%3Cpath d='M67 30 Q72 68 67 108' stroke='%236e1014' stroke-width='2.4' fill='none' opacity='.4'/%3E%3Ccircle cx='50' cy='70' r='15' fill='url(%23core)'/%3E%3Ccircle cx='50' cy='70' r='13' fill='none' stroke='%23ffe6b0' stroke-width='2.4' opacity='.9'/%3E%3Ccircle cx='50' cy='70' r='6' fill='%23fff4d8' opacity='.7'/%3E%3Crect x='32' y='105' width='36' height='9' rx='3' fill='url(%23cap)'/%3E%3Crect x='32' y='106' width='36' height='2' rx='1' fill='%23fff3cf' opacity='.6'/%3E%3Cpath d='M50 114 L50 128' stroke='%23241612' stroke-width='2.4'/%3E%3Ccircle cx='50' cy='130' r='4.2' fill='url(%23cap)'/%3E%3Cpath d='M46 133 Q45 150 44 162 M50 134 L50 166 M54 133 Q55 150 56 162 M48 133 L47 160 M52 133 L53 160' stroke='%23c62a26' stroke-width='1.8' fill='none' opacity='.92' stroke-linecap='round'/%3E%3Cpath d='M50 134 L50 166' stroke='%23ff7a4a' stroke-width='1' opacity='.5'/%3E%3C/svg%3E") center top / contain no-repeat;
}

/* ═══ VS — the emblem between the rivals, bottom-center, under the lane's
   fade-out. A gold flash bolt behind slant Anton caps. STATIC, promoted. */
head::after {
  content: "VS";
  display: var(--fighter-scenery, block);
  position: fixed;
  bottom: 0.5vh;
  left: 50%;
  width: 120px;
  height: 72px;
  z-index: 0;
  pointer-events: none;
  transform: translate3d(-50%, 0, 0) skewX(-8deg);
  font-family: var(--credits-title-font);
  font-size: 2.1rem;
  line-height: 72px;
  text-align: center;
  letter-spacing: 0.04em;
  color: var(--fighter-gold-bright);
  /* chrome-ish stack: dark crimson punch, bright top bevel, warm bloom */
  text-shadow:
    0.055em 0.06em 0 #7e0f16,
    0.03em 0.03em 0 #c0202a,
    0 -0.02em 0 #fff2c8,
    0 0 22px rgba(242, 179, 44, 0.45);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 190 116'%3E%3Cdefs%3E%3CradialGradient id='vb' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0' stop-color='%23ffdf8a' stop-opacity='.5'/%3E%3Cstop offset='.4' stop-color='%23ff8a3a' stop-opacity='.2'/%3E%3Cstop offset='1' stop-color='%23ff8a3a' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='95' cy='58' r='52' fill='url(%23vb)'/%3E%3Cg fill='%23ffe9b0' opacity='.5'%3E%3Cpolygon points='95,58 116,2 104,54'/%3E%3Cpolygon points='95,58 74,114 86,62'/%3E%3Cpolygon points='95,58 186,44 100,54'/%3E%3Cpolygon points='95,58 4,72 90,62'/%3E%3Cpolygon points='95,58 150,10 104,52'/%3E%3Cpolygon points='95,58 40,106 86,64'/%3E%3C/g%3E%3Cpath d='M6 66 L84 50 L70 58 L92 60 L68 64 L86 68 Z' fill='%23c9242c' opacity='.7'/%3E%3Cpath d='M184 50 L106 66 L120 58 L98 56 L122 52 L104 48 Z' fill='%236ea8cf' opacity='.7'/%3E%3Cpath d='M8 68 L60 56 L52 62 L66 63' stroke='%23ff6a42' stroke-width='2' fill='none' opacity='.6' stroke-linecap='round'/%3E%3Cpath d='M182 52 L130 64 L138 58 L124 57' stroke='%23aad4f2' stroke-width='2' fill='none' opacity='.6' stroke-linecap='round'/%3E%3Cg opacity='.85'%3E%3Cpolygon points='95,30 99,55 95,58 91,55' fill='%23fff6da'/%3E%3Cpolygon points='95,86 99,61 95,58 91,61' fill='%23fff6da'/%3E%3Cpolygon points='63,58 89,54 92,58 89,62' fill='%23fff6da'/%3E%3Cpolygon points='127,58 101,54 98,58 101,62' fill='%23fff6da'/%3E%3Ccircle cx='95' cy='58' r='4.5' fill='%23fffdf4'/%3E%3Ccircle cx='95' cy='58' r='9' fill='none' stroke='%23fff2c8' stroke-width='1' opacity='.5'/%3E%3C/g%3E%3C/svg%3E") center / contain no-repeat;
}

/* ═══ embers off the mat — a few warm sparks rising past the champion's
   corner. Continuous mover #2: small layer, transform/opacity only,
   will-change; fine dots live at the right EDGE (L6-legal), never the lane. */
meta { display: block; }
meta:first-of-type::before {
  content: "";
  display: var(--fighter-scenery, block);
  position: fixed;
  right: 0.5vw;
  bottom: -40px;
  width: 210px;
  height: 320px;
  z-index: -1;
  pointer-events: none;
  opacity: 0;
  background:
    /* near embers: bright hot cores with a soft glow shell (real coals, not dust) */
    radial-gradient(circle at 22% 88%, rgba(255, 236, 190, 0.95) 0 1.4px, rgba(255, 150, 60, 0.85) 2.6px, rgba(255, 110, 40, 0.28) 6px, rgba(255, 110, 40, 0) 12px),
    radial-gradient(circle at 70% 62%, rgba(255, 224, 150, 0.9) 0 1.2px, rgba(255, 160, 70, 0.8) 2.4px, rgba(255, 120, 50, 0.24) 5.5px, rgba(255, 120, 50, 0) 11px),
    /* mid embers: smaller, cooler, dimmer for depth */
    radial-gradient(circle at 46% 34%, rgba(255, 200, 120, 0.7) 0 1px, rgba(255, 130, 55, 0.6) 2px, rgba(255, 120, 50, 0) 7px),
    radial-gradient(circle at 84% 44%, rgba(255, 180, 100, 0.55) 0 0.9px, rgba(255, 120, 50, 0.45) 1.8px, rgba(255, 120, 50, 0) 6px),
    /* far spark: tiny distant coal */
    radial-gradient(circle at 34% 14%, rgba(255, 170, 90, 0.45) 0 0.8px, rgba(255, 120, 50, 0) 5px),
    /* coarse warm heat bloom rising with the embers (>40px, soft — L6-safe) */
    radial-gradient(ellipse 70px 150px at 55% 78%, rgba(255, 120, 50, 0.09), rgba(255, 120, 50, 0) 72%);
  background-repeat: no-repeat;
  background-size: 130px 220px, 170px 270px, 150px 250px, 120px 200px, 140px 240px, 100% 100%;
  will-change: transform;
  animation: fighter-embers 13s linear infinite;
}

/* ═══ THE EXCHANGE — the money beat. Between idle beats the two rivals TRADE
   BLOWS: the challenger fires a straight punch first, then the champion counters,
   each ~9s. Each strike is a pre-baked frame — a striking arm + speed streaks +
   an impact star — that flashes in via opacity (NOT repositioned to fake the
   art; the small translate is only the fist's thrust), then vanishes back to the
   held stance. The arms emerge from BEHIND each rival (head-pseudo layer, so it
   paints under the body::before silhouettes) and land in the side gutter, clear
   of the center name lane (L6). Kill-switched; parked flat under reduced motion. */
meta:first-of-type::after {
  content: "";
  display: var(--fighter-scenery, block);
  position: fixed;
  left: 0;
  bottom: 0;
  width: 40vw;
  height: 34vh;
  z-index: -1;
  pointer-events: none;
  opacity: 0;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'%3E%3Cg fill='none' stroke-linecap='round'%3E%3Cpath d='M300 130 L520 130' stroke='%23c9242c' stroke-width='3' opacity='.4'/%3E%3Cpath d='M280 150 L500 150' stroke='%23ff6a42' stroke-width='5' opacity='.55'/%3E%3Cpath d='M270 170 L515 170' stroke='%23ffffff' stroke-width='3' opacity='.5'/%3E%3Cpath d='M280 190 L500 190' stroke='%23ff6a42' stroke-width='5' opacity='.5'/%3E%3Cpath d='M300 210 L520 210' stroke='%23c9242c' stroke-width='3' opacity='.35'/%3E%3C/g%3E%3Cpath d='M240 170 L515 170' stroke='%23160710' stroke-width='40' stroke-linecap='round' fill='none'/%3E%3Cpath d='M250 156 L500 156' stroke='%23ff7a4a' stroke-width='3.5' stroke-linecap='round' opacity='.75' fill='none'/%3E%3Ccircle cx='525' cy='170' r='30' fill='%23160710'/%3E%3Cpath d='M500 150 A30 30 0 0 1 548 158' stroke='%23ff8a52' stroke-width='3.5' fill='none' opacity='.8'/%3E%3Ccircle cx='556' cy='170' r='40' fill='%23ffcf5e' opacity='.3'/%3E%3Cpath d='M556 118 L568 158 L610 170 L568 182 L556 222 L544 182 L502 170 L544 158 Z' fill='%23fff2c8'/%3E%3Cpath d='M556 138 L563 168 L556 198 L549 168 Z' fill='%23ffffff'/%3E%3Ccircle cx='556' cy='170' r='6' fill='%23ffffff'/%3E%3C/svg%3E") left bottom / contain no-repeat;
  animation: fighter-strike-l 9s ease-out infinite;
}
head title { display: var(--fighter-scenery, block); font-size: 0; color: transparent; }
/* ═══ THE CHAMPION — the blue rival's own sprite layer so it can breathe
   independently of the challenger. Same held stance, bottom-right; idle bob
   runs -1.2s out of phase (half a period) so the two never pulse together.
   Transform-only, promoted, no will-change (budget stays at 2). */
head title::after {
  content: "";
  display: var(--fighter-scenery, block);
  position: fixed;
  right: 0;
  bottom: 0;
  width: 46vw;
  height: 44vh;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  animation: fighter-breathe 2.4s ease-in-out -1.2s infinite;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 250 280' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='hb' x1='.85' y1='0' x2='.1' y2='1'%3E%3Cstop offset='0' stop-color='%2338566b'/%3E%3Cstop offset='.4' stop-color='%231b2c3e'/%3E%3Cstop offset='.8' stop-color='%230e1622'/%3E%3Cstop offset='1' stop-color='%23070b13'/%3E%3C/linearGradient%3E%3CradialGradient id='hs' cx='50%' cy='50%' r='50%'%3E%3Cstop offset='0' stop-color='%23040108' stop-opacity='.75'/%3E%3Cstop offset='1' stop-color='%23040108' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='176' cy='270' rx='80' ry='9' fill='url(%23hs)'/%3E%3Cg fill='none' stroke='url(%23hb)' stroke-linecap='round' stroke-linejoin='round'%3E%3C!-- support leg, nearly straight, slight bend --%3E%3Cpath d='M168 152 L176 204 L174 254' stroke-width='25'/%3E%3C!-- kicking leg: hip -%3E knee(high) -%3E extended foot up-left, clearly above arms --%3E%3Cpath d='M156 150 L108 128 L56 108' stroke-width='24'/%3E%3C/g%3E%3Cpath d='M162 250 L192 250 L194 262 L160 262 Z' fill='%230a1018'/%3E%3C!-- pointed kicking foot --%3E%3Cpath d='M60 112 L40 100 L34 108 L54 122 Z' fill='%230a1018'/%3E%3C!-- torso leaning back-right --%3E%3Cpath d='M154 78 Q152 68 166 66 L184 78 Q188 102 180 126 L166 156 Q148 156 150 130 L150 104 Q150 88 154 78 Z' fill='url(%23hb)'/%3E%3C!-- guard arm tucked (front/left), fist near chin --%3E%3Cpath d='M158 96 L148 116 L152 132' fill='none' stroke='url(%23hb)' stroke-width='16' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='152' cy='133' r='9' fill='%230c1420'/%3E%3C!-- balance arm out back-right --%3E%3Cpath d='M176 96 L198 110 L210 130' fill='none' stroke='url(%23hb)' stroke-width='16' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='211' cy='131' r='10' fill='%230c1420'/%3E%3Crect x='158' y='56' width='18' height='18' rx='5' fill='url(%23hb)'/%3E%3Ccircle cx='167' cy='46' r='18' fill='url(%23hb)'/%3E%3C!-- belt --%3E%3Cpath d='M148 150 Q168 158 186 150 L186 162 Q168 170 148 162 Z' fill='%235078a0'/%3E%3Cpath d='M166 160 L176 160 L172 184 L162 184 Z' fill='%233a5a7c'/%3E%3Cpath d='M158 160 L168 160 L172 182 L162 182 Z' fill='%235078a0'/%3E%3Cpath d='M160 72 Q166 108 166 150 L159 150 Q157 108 156 74 Z' fill='%23081018' opacity='.55'/%3E%3C!-- headband over head --%3E%3Cpath d='M150 42 Q167 35 185 43 L183 51 Q167 44 152 51 Z' fill='%235078a0'/%3E%3Cpath d='M185 43 Q199 47 207 40 Q200 54 184 54 Z' fill='%235078a0'/%3E%3Cpath d='M201 41 L215 34 M201 46 L213 49' stroke='%233a5a7c' stroke-width='2.6' stroke-linecap='round'/%3E%3C!-- RIM LIGHT: moon upper-right → cool edges top/right --%3E%3Cg fill='none' stroke-linecap='round'%3E%3Cpath d='M186 40 Q196 31 210 32' stroke='%23c6e4f8' stroke-width='3' opacity='.82'/%3E%3Cpath d='M187 48 Q190 58 185 68' stroke='%238fc1e8' stroke-width='2.6' opacity='.62'/%3E%3Cpath d='M182 80 Q186 104 178 128' stroke='%238fc1e8' stroke-width='2.8' opacity='.66'/%3E%3Cpath d='M176 96 Q198 110 210 130' stroke='%23aad4f2' stroke-width='2.8' opacity='.8'/%3E%3Cpath d='M168 152 L176 204' stroke='%237fb4dc' stroke-width='2.4' opacity='.5'/%3E%3Cpath d='M156 150 L108 128 L56 108' stroke='%239ec8ea' stroke-width='2.4' opacity='.62'/%3E%3Cpath d='M158 96 L148 116' stroke='%237fb4dc' stroke-width='2' opacity='.45'/%3E%3C/g%3E%3C/svg%3E") right 2vw bottom 0 / auto 41vh no-repeat;
}
head title::before {
  content: "";
  display: var(--fighter-scenery, block);
  position: fixed;
  right: 0;
  bottom: 0;
  width: 40vw;
  height: 34vh;
  z-index: -1;
  pointer-events: none;
  opacity: 0;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'%3E%3Cg fill='none' stroke-linecap='round'%3E%3Cpath d='M300 130 L80 130' stroke='%233a5a7c' stroke-width='3' opacity='.4'/%3E%3Cpath d='M320 150 L100 150' stroke='%236ea8cf' stroke-width='5' opacity='.55'/%3E%3Cpath d='M330 170 L85 170' stroke='%23ffffff' stroke-width='3' opacity='.5'/%3E%3Cpath d='M320 190 L100 190' stroke='%236ea8cf' stroke-width='5' opacity='.5'/%3E%3Cpath d='M300 210 L80 210' stroke='%233a5a7c' stroke-width='3' opacity='.35'/%3E%3C/g%3E%3Cpath d='M360 170 L85 170' stroke='%23070b13' stroke-width='40' stroke-linecap='round' fill='none'/%3E%3Cpath d='M350 156 L100 156' stroke='%23aad4f2' stroke-width='3.5' stroke-linecap='round' opacity='.7' fill='none'/%3E%3Ccircle cx='75' cy='170' r='30' fill='%23070b13'/%3E%3Cpath d='M100 150 A30 30 0 0 0 52 158' stroke='%23aad4f2' stroke-width='3.5' fill='none' opacity='.8'/%3E%3Ccircle cx='44' cy='170' r='40' fill='%239ec8ea' opacity='.3'/%3E%3Cpath d='M44 118 L56 158 L98 170 L56 182 L44 222 L32 182 L-10 170 L32 158 Z' fill='%23eaf7ff'/%3E%3Cpath d='M44 138 L51 168 L44 198 L37 168 Z' fill='%23ffffff'/%3E%3Ccircle cx='44' cy='170' r='6' fill='%23ffffff'/%3E%3C/svg%3E") right bottom / contain no-repeat;
  animation: fighter-strike-r 9s ease-out infinite;
}

/* ═══ HANGING SCROLLS — two kakemono dropped from the ridge beam, filling
   the dead night between the lantern and the moon without touching the
   lane. Each is a real object: cord, wooden dowels with gold end caps, a
   dim paper body (multi-stop, lit from its lantern/moon side), abstract
   brush calligraphy, a red hanko seal, a bottom weight rod + tassel. The
   left scroll hangs long and warm-rimmed; the right hangs shorter and
   moon-cooled. ONE static promoted layer, kill-switched. */
meta:last-of-type::before {
  content: "";
  display: var(--fighter-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 110 340'%3E%3Cdefs%3E%3ClinearGradient id='pp' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23cfc0a0' stop-opacity='.26'/%3E%3Cstop offset='.45' stop-color='%23917c58' stop-opacity='.16'/%3E%3Cstop offset='1' stop-color='%23453520' stop-opacity='.1'/%3E%3C/linearGradient%3E%3ClinearGradient id='dw' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%234a2c1a'/%3E%3Cstop offset='.4' stop-color='%23231208'/%3E%3Cstop offset='1' stop-color='%23130a05'/%3E%3C/linearGradient%3E%3ClinearGradient id='cap' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23ffe08a'/%3E%3Cstop offset='.5' stop-color='%23c98a24'/%3E%3Cstop offset='1' stop-color='%235e3a0c'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M55 0 L55 13' stroke='%23120b0a' stroke-width='2.6'/%3E%3Cpath d='M54 1 L54 13' stroke='%235a4636' stroke-width='1' opacity='.6'/%3E%3Crect x='10' y='13' width='90' height='9' rx='4' fill='url(%23dw)'/%3E%3Crect x='10' y='14' width='90' height='2' rx='1' fill='%23c98a4e' opacity='.4'/%3E%3Ccircle cx='10' cy='17.5' r='5' fill='url(%23cap)'/%3E%3Ccircle cx='100' cy='17.5' r='5' fill='url(%23cap)'/%3E%3Ccircle cx='8.6' cy='16' r='1.4' fill='%23fff3cf' opacity='.85'/%3E%3Crect x='21' y='22' width='68' height='268' fill='url(%23pp)'/%3E%3Crect x='21' y='22' width='68' height='268' fill='none' stroke='%23191009' stroke-width='2' opacity='.65'/%3E%3Cpath d='M22.5 24 L22.5 288' stroke='%23ffca8a' stroke-width='1.6' opacity='.3'/%3E%3Cpath d='M24 24 Q22 150 24 288' stroke='%23ff8a52' stroke-width='.8' opacity='.2'/%3E%3Cg stroke='%23140a06' stroke-linecap='round' fill='none' opacity='.8'%3E%3Cpath d='M50 44 Q60 50 54 62 M42 56 L66 54' stroke-width='6'/%3E%3Cpath d='M55 74 Q44 92 58 104 Q64 110 54 118' stroke-width='5.4'/%3E%3Cpath d='M44 96 L52 98' stroke-width='4.6'/%3E%3Cpath d='M46 134 L64 132 M55 128 Q52 150 56 166 M46 158 Q55 168 64 156' stroke-width='5'/%3E%3Cpath d='M54 184 Q62 196 52 208 M44 196 L66 198' stroke-width='5.4'/%3E%3Cpath d='M50 224 L60 222 M55 220 L53 244' stroke-width='4.4'/%3E%3C/g%3E%3Cg stroke='%23c9b48a' stroke-linecap='round' fill='none' opacity='.14'%3E%3Cpath d='M49 43 Q59 49 53 61' stroke-width='2'/%3E%3Cpath d='M54 73 Q43 91 57 103' stroke-width='2'/%3E%3Cpath d='M45 133 L63 131' stroke-width='2'/%3E%3C/g%3E%3Crect x='44' y='256' width='15' height='15' fill='%23c9242c' opacity='.88'/%3E%3Cg stroke='%23f6eedd' stroke-width='1.4' opacity='.5' fill='none'%3E%3Cpath d='M47 259 L56 259 M47 263 L56 263 M49 259 L49 268 M53 263 L53 268'/%3E%3C/g%3E%3Crect x='15' y='290' width='80' height='8' rx='4' fill='url(%23dw)'/%3E%3Crect x='15' y='291' width='80' height='1.6' rx='0.8' fill='%23c98a4e' opacity='.35'/%3E%3Ccircle cx='15' cy='294' r='4.4' fill='url(%23cap)'/%3E%3Ccircle cx='95' cy='294' r='4.4' fill='url(%23cap)'/%3E%3Cpath d='M55 298 L55 310' stroke='%23241612' stroke-width='2'/%3E%3Cpath d='M52 310 Q51 324 50 332 M55 310 L55 336 M58 310 Q59 324 60 332' stroke='%23a51e1e' stroke-width='1.6' fill='none' opacity='.85' stroke-linecap='round'/%3E%3C/svg%3E") left 16vw top 6px / auto 36vh no-repeat,
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 110 300'%3E%3Cdefs%3E%3ClinearGradient id='pp2' x1='1' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23b8c4d4' stop-opacity='.2'/%3E%3Cstop offset='.45' stop-color='%23707e94' stop-opacity='.13'/%3E%3Cstop offset='1' stop-color='%23343c4c' stop-opacity='.08'/%3E%3C/linearGradient%3E%3ClinearGradient id='dw2' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%234a2c1a'/%3E%3Cstop offset='.4' stop-color='%23231208'/%3E%3Cstop offset='1' stop-color='%23130a05'/%3E%3C/linearGradient%3E%3ClinearGradient id='cap2' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23ffe08a'/%3E%3Cstop offset='.5' stop-color='%23c98a24'/%3E%3Cstop offset='1' stop-color='%235e3a0c'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M55 0 L55 12' stroke='%23120b0a' stroke-width='2.6'/%3E%3Crect x='12' y='12' width='86' height='8' rx='4' fill='url(%23dw2)'/%3E%3Crect x='12' y='13' width='86' height='1.8' rx='0.9' fill='%23a8b8cc' opacity='.3'/%3E%3Ccircle cx='12' cy='16' r='4.6' fill='url(%23cap2)'/%3E%3Ccircle cx='98' cy='16' r='4.6' fill='url(%23cap2)'/%3E%3Ccircle cx='99.2' cy='14.8' r='1.2' fill='%23eaf2fc' opacity='.8'/%3E%3Crect x='22' y='20' width='66' height='232' fill='url(%23pp2)'/%3E%3Crect x='22' y='20' width='66' height='232' fill='none' stroke='%23101418' stroke-width='2' opacity='.65'/%3E%3Cpath d='M86.5 22 L86.5 250' stroke='%23aad4f2' stroke-width='1.6' opacity='.3'/%3E%3Cg stroke='%230c1016' stroke-linecap='round' fill='none' opacity='.8'%3E%3Cpath d='M52 40 L64 38 M58 36 Q54 54 60 66' stroke-width='5.6'/%3E%3Cpath d='M48 84 Q60 90 52 104 M62 96 L44 100' stroke-width='5'/%3E%3Cpath d='M56 122 Q46 138 58 150' stroke-width='5.2'/%3E%3Cpath d='M48 168 L64 166 M56 162 L54 188' stroke-width='4.6'/%3E%3Cpath d='M52 204 Q60 214 50 224' stroke-width='4.8'/%3E%3C/g%3E%3Cg stroke='%23a8bccc' stroke-linecap='round' fill='none' opacity='.12'%3E%3Cpath d='M51 39 L63 37' stroke-width='2'/%3E%3Cpath d='M55 121 Q45 137 57 149' stroke-width='2'/%3E%3C/g%3E%3Crect x='46' y='226' width='13' height='13' fill='%23c9242c' opacity='.85'/%3E%3Cpath d='M49 229 L56 229 M49 233 L56 233 M51 229 L51 236' stroke='%23f6eedd' stroke-width='1.2' opacity='.5' fill='none'/%3E%3Crect x='16' y='252' width='78' height='7' rx='3.5' fill='url(%23dw2)'/%3E%3Ccircle cx='16' cy='255.5' r='4' fill='url(%23cap2)'/%3E%3Ccircle cx='94' cy='255.5' r='4' fill='url(%23cap2)'/%3E%3Cpath d='M55 259 L55 269' stroke='%23241612' stroke-width='2'/%3E%3Cpath d='M52 269 Q51 281 50 288 M55 269 L55 292 M58 269 Q59 281 60 288' stroke='%23a51e1e' stroke-width='1.5' fill='none' opacity='.8' stroke-linecap='round'/%3E%3C/svg%3E") right 20vw top 6px / auto 29vh no-repeat;
}

/* ═══ sakura petals — a small handful drifting down the lantern side,
   answering the embers rising on the moon side. Continuous mover #3: a
   SMALL layer (320px square), transform/opacity only, no will-change
   (budget stays at 2 + the roll). Petals live in the left gutter, never
   the lane. */
meta:last-of-type::after {
  content: "";
  display: var(--fighter-scenery, block);
  position: fixed;
  left: 3vw;
  top: -340px;
  width: 320px;
  height: 320px;
  z-index: -1;
  pointer-events: none;
  opacity: 0;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 320'%3E%3Cdefs%3E%3CradialGradient id='pe' cx='.35' cy='.3' r='.8'%3E%3Cstop offset='0' stop-color='%23ffd9e2'/%3E%3Cstop offset='.55' stop-color='%23f0a8bc'/%3E%3Cstop offset='1' stop-color='%23c9758e'/%3E%3C/radialGradient%3E%3CradialGradient id='pe2' cx='.35' cy='.3' r='.8'%3E%3Cstop offset='0' stop-color='%23f2b6c6'/%3E%3Cstop offset='1' stop-color='%23a85870'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cg%3E%3Cellipse cx='60' cy='30' rx='7' ry='4.6' fill='url(%23pe)' transform='rotate(-24 60 30)' opacity='.9'/%3E%3Cellipse cx='180' cy='74' rx='6' ry='4' fill='url(%23pe2)' transform='rotate(38 180 74)' opacity='.8'/%3E%3Cellipse cx='110' cy='128' rx='7.6' ry='4.8' fill='url(%23pe)' transform='rotate(12 110 128)' opacity='.85'/%3E%3Cellipse cx='250' cy='150' rx='5' ry='3.4' fill='url(%23pe2)' transform='rotate(-40 250 150)' opacity='.7'/%3E%3Cellipse cx='46' cy='196' rx='6.4' ry='4.2' fill='url(%23pe2)' transform='rotate(52 46 196)' opacity='.8'/%3E%3Cellipse cx='160' cy='236' rx='7' ry='4.4' fill='url(%23pe)' transform='rotate(-14 160 236)' opacity='.85'/%3E%3Cellipse cx='268' cy='282' rx='5.4' ry='3.6' fill='url(%23pe2)' transform='rotate(28 268 282)' opacity='.65'/%3E%3C/g%3E%3C/svg%3E") 0 0 / contain no-repeat;
  /* negative delay: petals are already mid-drift when the credits open */
  animation: fighter-petals 17s linear -7s infinite;
}

/* ═══ the card: every section is a round ═══ */
.credits-block,
.credits-slide:not(.flourish) { counter-increment: fighter-round; }

/* corner cycle — crimson, gold, steel, repeat (intro is section 1, so the
   first block lands on 3n+2 = crimson). Content-agnostic, custom types safe. */
.credits-block:nth-of-type(3n + 2),
.credits-slide:nth-of-type(3n + 2) { --fighter-bar: var(--fighter-crimson); --fighter-bar-ink: var(--fighter-cream); }
.credits-block:nth-of-type(3n),
.credits-slide:nth-of-type(3n) { --fighter-bar: var(--fighter-gold); --fighter-bar-ink: #221008; }
.credits-block:nth-of-type(3n + 1),
.credits-slide:nth-of-type(3n + 1) { --fighter-bar: var(--fighter-steel); --fighter-bar-ink: #0a1016; }

/* ═══ titles: slashed banners — Anton slant caps punched on the round's
   color, hard ink drop like a sticker on the cabinet. The round number
   calls the fight from above. */
.credits-block__title {
  position: relative;
  width: fit-content;
  max-width: 84vw;
  margin: 0 auto 1.1rem;
  padding: 0.26em 0.7em 0.22em;
  font-weight: 400;
  letter-spacing: 0.06em;
  color: var(--fighter-bar-ink, var(--fighter-cream));
  background: var(--fighter-bar, var(--fighter-crimson));
  box-shadow: 0.26em 0.26em 0 rgba(4, 2, 8, 0.85);
  text-shadow: none;
  transform: translateX(-0.9em) skewX(-8deg);
}
.credits-block__title::after { display: none; }
.credits-block__title::before {
  content: "ROUND " counter(fighter-round, decimal-leading-zero) " \\2014  FIGHT!";
  position: absolute;
  left: 0.2em;
  bottom: calc(100% + 0.7em);
  transform: skewX(8deg);
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.42em;
  white-space: nowrap;
  color: var(--fighter-gold-bright);
  text-shadow: 0 1px 8px rgba(4, 2, 8, 0.8);
  opacity: 0.95;
}

/* the clash divider between banner and roster: red and steel speedlines
   meeting a gold bolt — a drawn prop, so it gets the kill switch. It rides
   the roll (L6-safe). */
.credits-block__list::before {
  content: "";
  display: var(--fighter-scenery, block);
  width: min(240px, 56vw);
  height: 22px;
  margin: 0 auto 0.9rem;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 22'%3E%3Cpolygon points='0,11 94,7.5 94,14.5' fill='%23c9242c' opacity='.85'/%3E%3Cpolygon points='240,11 146,7.5 146,14.5' fill='%236ea8cf' opacity='.85'/%3E%3Cpolygon points='132,0 108,12 116,12 102,22 130,9 121,9 138,0' fill='%23f2b32c'/%3E%3Cpolygon points='128,2 115,10.5 120,10.5 110,18 125,8.5 119,8.5 129,2' fill='%23ffe9b0' opacity='.9'/%3E%3C/svg%3E") center / contain no-repeat;
}

/* ═══ rows: the roster. Challenger caps, a health bar under every name
   (block-local — it rides the row), amounts as combo counters. */
.credit {
  max-width: min(42rem, 90vw);
  margin-inline: auto;
  min-width: 0;
  overflow-wrap: anywhere;
  font-weight: 600;
  letter-spacing: 0.04em;
  line-height: 1.35;
}
.credit__name {
  color: var(--fighter-cream);
  text-transform: uppercase;
  text-shadow: 0 0 14px rgba(255, 150, 66, 0.12), var(--credits-shadow);
}
.credit__amount {
  opacity: 1;
  font-style: italic;
  font-weight: 700;
  font-size: 0.72em;
  letter-spacing: 0.06em;
  margin-left: 0.6em;
  color: var(--fighter-gold);
  font-variant-numeric: tabular-nums;
  text-shadow: 0 0 12px rgba(242, 179, 44, 0.25), var(--credits-shadow);
}
.credit__amount::before { content: "\\00d7"; }
.credit__amount::after { content: " HITS"; font-size: 0.82em; letter-spacing: 0.14em; }

/* the health bar: chamfered frame, gold vitality with a hard stop into
   the damage-red remainder, glass sheen on top. Damage varies down the
   roster (5-row cycle) — some challengers barely survived the set. */
.credit::after {
  content: "";
  display: block;
  width: 132px;
  height: 11px;
  margin: 0.4rem auto 0;
  transform: skewX(-18deg);
  border: 1px solid rgba(242, 179, 44, 0.72);
  border-radius: 1px;
  box-shadow:
    0 0 8px rgba(242, 179, 44, 0.2),
    0 1px 2px rgba(4, 2, 8, 0.7),
    inset 0 -2px 3px rgba(80, 10, 14, 0.62),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
  background:
    /* STATIC specular streak baked on the glass near the fill head — rides the
       row (moves with the text, not the screen) so it is L6-safe. */
    linear-gradient(90deg, rgba(255, 255, 255, 0) calc(var(--fighter-hp, 82%) - 16%), rgba(255, 255, 255, 0.72) calc(var(--fighter-hp, 82%) - 6%), rgba(255, 255, 255, 0.1) calc(var(--fighter-hp, 82%) - 2%), rgba(255, 255, 255, 0) var(--fighter-hp, 82%)),
    /* segment ticks: thin dark chamfer divisions across the gauge (baked prop) */
    repeating-linear-gradient(90deg, rgba(6, 3, 10, 0) 0 15px, rgba(6, 3, 10, 0.42) 15px 17px),
    /* top glass sheen: bright upper third fading down into a shadowed base */
    linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.14) 32%, rgba(255, 255, 255, 0) 52%, rgba(0, 0, 0, 0.26) 100%),
    /* the vitality fill: hot gold vitality → hard damage line → charred remainder */
    linear-gradient(90deg, #fff0b0 0%, #ffd858 30%, #f6b02e var(--fighter-hp, 82%), rgba(176, 26, 30, 0.97) var(--fighter-hp, 82%), rgba(120, 16, 22, 0.97) calc(var(--fighter-hp, 82%) + 3%), rgba(58, 6, 12, 0.97) 100%);
}
.credit:nth-child(5n + 1) { --fighter-hp: 84%; }
.credit:nth-child(5n + 2) { --fighter-hp: 58%; }
.credit:nth-child(5n + 3) { --fighter-hp: 93%; }
.credit:nth-child(5n + 4) { --fighter-hp: 37%; }
.credit:nth-child(5n) { --fighter-hp: 69%; }

/* ═══ flourish cards ═══ */
.flourish--intro { gap: 1.3rem; }

/* badge -> the challenger call (copy swap via font-size:0 + ::after) */
.flourish__badge { font-size: 0; border: 0; border-radius: 0; padding: 0; box-shadow: none; }
.flourish__badge::after {
  content: "A NEW CHALLENGER APPROACHES";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.82rem;
  letter-spacing: 0.4em;
  padding: 0.55em 0.9em 0.55em 1.3em;
  color: var(--fighter-gold-bright);
  border: 1px solid rgba(242, 179, 44, 0.55);
  background: rgba(242, 179, 44, 0.07);
  text-shadow: 0 0 12px rgba(242, 179, 44, 0.4);
  transform: skewX(-8deg);
}

/* the streamer's marquee: Anton slant caps in gold with the hard crimson
   punch shadow — the cabinet art. Restyle only (streamer copy). */
.flourish--intro .flourish__title {
  font-weight: 400;
  letter-spacing: 0.04em;
  line-height: 1.06;
  max-width: min(88vw, 14em);
  color: var(--fighter-gold-bright);
  transform: skewX(-6deg);
  text-shadow: 0.055em 0.055em 0 #8e1219, 0 0 34px rgba(242, 179, 44, 0.28), var(--credits-shadow);
}

/* streamer tagline: restyle only — the attract-screen strapline */
.flourish__tagline {
  font-style: normal;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.34em;
  padding-left: 0.34em;
  text-transform: uppercase;
  color: rgba(246, 238, 221, 0.82);
}

/* rating -> the house rules stamp (copy swap) */
.flourish__rating { font-size: 0; border: 0; padding: 0; opacity: 1; }
.flourish__rating::after {
  content: "FT10 \\2014  WINNER STAYS ON";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.74rem;
  letter-spacing: 0.3em;
  padding: 0.5em 0.8em 0.5em 1.1em;
  color: var(--fighter-red-hot);
  border: 2px solid rgba(255, 68, 56, 0.6);
  box-shadow: inset 0 0 0 1px rgba(255, 68, 56, 0.25);
  transform: rotate(-2.5deg);
  text-shadow: 0 0 12px rgba(255, 68, 56, 0.35);
}

/* cabinet fine print — scenery-flavored fiction, so it gets the switch */
.flourish--intro::after {
  content: "MIDNIGHT DOJO \\00b7  CABINET 02 \\00b7  TOURNAMENT EDITION";
  display: var(--fighter-scenery, block);
  font-family: var(--credits-font);
  font-weight: 500;
  font-size: 0.64rem;
  letter-spacing: 0.32em;
  padding-left: 0.32em;
  color: rgba(246, 238, 221, 0.45);
}

/* outro: YOU WIN — the community takes the set (copy swap; spacing and
   shadows re-declared on the ::after since em against font-size:0 is 0) */
.flourish--outro .flourish__title { font-size: 0; }
.flourish--outro .flourish__title::after {
  content: "YOU WIN";
  display: inline-block;
  font-family: var(--credits-title-font);
  font-weight: 400;
  font-size: var(--credits-flourish-title-size);
  letter-spacing: 0.04em;
  line-height: 1.06;
  color: var(--fighter-gold-bright);
  transform: skewX(-6deg);
  text-shadow: 0.055em 0.055em 0 #8e1219, 0 0 34px rgba(242, 179, 44, 0.3), var(--credits-shadow);
}
.flourish--outro .flourish__tagline { font-size: 0; }
.flourish--outro .flourish__tagline::after {
  content: "CONTINUE? 9\\2026 8\\2026 7\\2026";
  font-family: var(--credits-font);
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.34em;
  padding-left: 0.34em;
  color: rgba(246, 238, 221, 0.8);
}
/* the sign-off chip under the countdown */
.flourish--outro::after {
  content: "THANKS FOR PLAYING \\2014  REMATCH NEXT STREAM";
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.68rem;
  letter-spacing: 0.3em;
  padding: 0.45em 0.7em 0.45em 1em;
  margin-top: 0.5rem;
  color: var(--fighter-gold);
  border: 1px solid rgba(242, 179, 44, 0.45);
  text-shadow: 0 0 10px rgba(242, 179, 44, 0.3);
}

/* ═══ raid finale: FINAL ROUND — K.O.!! and the raiders roll in with
   PERFECT bars. The K.O. flash is steps(1) at ~1.3 paints/s — the only
   animation inside the roll (L5 ceiling is 2/s). Declared after the
   parity tints so it wins the cascade. */
.credits-block:nth-last-of-type(2),
.credits-slide:nth-last-of-type(2):not(.flourish) {
  --fighter-bar: var(--fighter-red-hot);
  --fighter-bar-ink: #fff3e0;
}
.credits-block:nth-last-of-type(2)::before,
.credits-slide:nth-last-of-type(2):not(.flourish)::before {
  content: "K.O.!!";
  display: block;
  font-family: var(--credits-title-font);
  font-size: calc(var(--credits-flourish-title-size) * 0.8);
  line-height: 1;
  letter-spacing: 0.02em;
  margin-bottom: 2.4rem;
  color: var(--fighter-red-hot);
  transform: skewX(-8deg);
  text-shadow: 0.05em 0.05em 0 rgba(242, 179, 44, 0.85), 0 0 30px rgba(255, 68, 56, 0.45), var(--credits-shadow);
  animation: fighter-ko 1.5s steps(1, end) infinite;
}
.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  content: "FINAL ROUND \\2014  FIGHT!";
  color: var(--fighter-red-hot);
  text-shadow: 0 0 12px rgba(255, 68, 56, 0.5), 0 1px 8px rgba(4, 2, 8, 0.8);
}
.credits-block:nth-last-of-type(2)::after,
.credits-slide:nth-last-of-type(2):not(.flourish)::after {
  content: "PERFECT";
  display: block;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.62em;
  padding-left: 0.62em;
  margin-top: 1.2rem;
  text-align: center;
  color: var(--fighter-gold-bright);
  text-shadow: 0 0 16px rgba(242, 179, 44, 0.55), var(--credits-shadow);
}
.credits-block:nth-last-of-type(2) .credit,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit {
  --fighter-hp: 100%;
  font-size: calc(var(--credits-name-size) * 1.1);
}
.credits-block:nth-last-of-type(2) .credit::after,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit::after {
  border-color: rgba(255, 209, 102, 0.85);
}
.credits-block:nth-last-of-type(2) .credit__name,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__name {
  text-shadow: 0 0 18px rgba(255, 150, 66, 0.35), var(--credits-shadow);
}

/* ═══ slideshow: every slide lands like a hit — a fast punch-in with a
   hint of overshoot (transform/opacity only, one-shot). */
.credits-slide {
  transform: translate3d(26px, 0, 0) scale(1.04);
  transition: opacity 0.35s ease-out, transform 0.5s cubic-bezier(0.17, 0.89, 0.32, 1.24);
}
.credits-slide.is-active { transform: none; }

/* ═══ keyframes (all fighter- prefixed; transform/opacity ONLY) ═══ */
/* the lantern swings a lazy 2.4 degrees on its cord */
@keyframes fighter-lantern {
  0%   { transform: translateZ(0) rotate(-2.4deg); }
  50%  { transform: translateZ(0) rotate(2.4deg); }
  100% { transform: translateZ(0) rotate(-2.4deg); }
}
/* embers ride the updraft ~300px, fading in low and dying high */
@keyframes fighter-embers {
  0%   { transform: translate3d(0, 0, 0); opacity: 0; }
  10%  { opacity: 0.55; }
  70%  { opacity: 0.4; }
  96%  { opacity: 0; }
  100% { transform: translate3d(-14px, -300px, 0); opacity: 0; }
}
/* petals fall ~78vh down the left gutter with a lazy two-beat sway */
@keyframes fighter-petals {
  0%   { transform: translate3d(0, 0, 0); opacity: 0; }
  8%   { opacity: 0.8; }
  30%  { transform: translate3d(28px, 24vh, 0); }
  55%  { transform: translate3d(-8px, 46vh, 0); opacity: 0.7; }
  80%  { transform: translate3d(22px, 66vh, 0); }
  94%  { opacity: 0; }
  100% { transform: translate3d(10px, 78vh, 0); opacity: 0; }
}
/* K.O. flash: two held dips per 1.5s ~ 1.3 paints/s (L5 ceiling 2/s) */
@keyframes fighter-ko {
  0%, 58%   { opacity: 1; }
  64%, 80%  { opacity: 0.55; }
  86%, 100% { opacity: 1; }
}
/* the challenger's punch: dark most of the 9s, then wind-up -> thrust -> hold
   -> gone (a 3-beat pop; the fist thrusts a few px, the frame does NOT slide to
   fake the pose). ~2 visible paints per cycle, well under the L5 ceiling. */
@keyframes fighter-strike-l {
  0%, 63%   { opacity: 0; transform: translate3d(-12px, 0, 0); }
  65%       { opacity: 1; transform: translate3d(-12px, 0, 0); }
  69%       { opacity: 1; transform: translate3d(8px, 0, 0); }
  74%       { opacity: 1; transform: translate3d(8px, 0, 0); }
  77%, 100% { opacity: 0; transform: translate3d(-12px, 0, 0); }
}
/* the champion's counter, offset later in the same 9s so it reads as a reply */
@keyframes fighter-strike-r {
  0%, 76%   { opacity: 0; transform: translate3d(12px, 0, 0); }
  78%       { opacity: 1; transform: translate3d(12px, 0, 0); }
  82%       { opacity: 1; transform: translate3d(-8px, 0, 0); }
  87%       { opacity: 1; transform: translate3d(-8px, 0, 0); }
  90%, 100% { opacity: 0; transform: translate3d(12px, 0, 0); }
}

/* idle breathing: each fighter's sprite layer rises ~5px and settles over a
   2.4s period; the champion runs -1.2s out of phase so the two never pulse in
   lockstep. Transform-only, compositor-safe, no will-change. */
@keyframes fighter-breathe {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50%      { transform: translate3d(0, -5px, 0); }
}

/* ═══ reduced motion: the dojo holds still — the lantern hangs plumb,
   the embers park as a faint glow, the K.O. stops flashing. */
@media (prefers-reduced-motion: reduce) {
  head::before { animation: none; transform: translateZ(0); }
  body::before { animation: none; transform: translateZ(0); }
  meta:first-of-type::before { animation: none; opacity: 0.25; transform: translate3d(0, -120px, 0); }
  meta:first-of-type::after { animation: none; opacity: 0; }
  head title::before { animation: none; opacity: 0; }
  head title::after { animation: none; transform: translateZ(0); }
  meta:last-of-type::after { animation: none; opacity: 0.3; transform: translate3d(14px, 38vh, 0); }
  .credits-block:nth-last-of-type(2)::before,
  .credits-slide:nth-last-of-type(2):not(.flourish)::before { animation: none; }
  .credits-slide { transform: none; transition: opacity 0.8s ease; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--fighter-scenery:none;}",
};
