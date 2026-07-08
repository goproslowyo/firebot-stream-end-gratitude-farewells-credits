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
    radial-gradient(circle at 25% 30%, rgba(255,255,255,.95) 0 1px, transparent 2px) 0 0 / 240px 240px repeat,
    radial-gradient(circle at 72% 14%, rgba(255,255,255,.7) 0 1px, transparent 2px) 40px 90px / 180px 180px repeat,
    radial-gradient(circle at 48% 44%, rgba(190,120,255,.7) 0 1px, transparent 2px) 0 0 / 320px 320px repeat,
    radial-gradient(ellipse 62% 30% at 50% 60%, rgba(255,150,60,.26) 0%, rgba(255,60,140,.16) 42%, rgba(255,41,117,0) 72%) 0 0 / 100% 100% no-repeat,
    /* horizon haze — soft glow hugging the 62% line so the road/city seam melts */
    radial-gradient(ellipse 52% 5% at 50% 61.6%, rgba(255,160,90,.3) 0%, rgba(255,95,165,.16) 46%, rgba(120,230,255,0) 80%) 0 0 / 100% 100% no-repeat,
    linear-gradient(180deg, #04010e 0%, #180a36 30%, #45155f 51%, #8f2064 60.4%, #ff3d7e 61.5%, #ff2975 62%, #0c0220 62.2%) #0c0220;
}

/* ═══ scenery ═══  DEPTH (back→front): sun halo(-4) · sun disc + rolling blinds(-3) ·
   lasers(-2.5 sky) · mountains + city(-2) · grid + road(-1) · palms(1) · car(2) · names.
   The sun is the REARMOST backdrop; everything else silhouettes in front of it. */
html { -webkit-mask-image: none; mask-image: none; }
body { background: transparent; }
head { display: block; }
head meta { display: block; }
head link { display: block; }
head title { display: block; font-size: 0; color: transparent; }

/* SUN HALO — soft bloom behind the disc, breathing (glow pulse). */
head::before {
  content: "";
  display: var(--synthwave-scenery, block);
  position: fixed;
  left: 50%; top: 62vh;
  width: 96vmin; height: 96vmin;
  z-index: -4;
  pointer-events: none;
  transform: translate(-50%, -60%) translateZ(0);
  border-radius: 50%;
  background: radial-gradient(circle at 50% 44%,
    rgba(255,242,196,.62) 0%, rgba(255,172,84,.5) 13%, rgba(255,92,120,.4) 29%,
    rgba(255,45,149,.24) 46%, rgba(150,20,110,.09) 63%, rgba(110,8,84,0) 78%);
  will-change: opacity, transform;
  animation: sw-sun-pulse 5s ease-in-out infinite;
}

/* SUN DISC — rearmost backdrop. Flat OutRun gradient, soft-edged circle. The
   rolling blinds live on a separate overlay so they can animate. */
html::after {
  content: "";
  display: var(--synthwave-scenery, block);
  position: fixed;
  left: 50%; top: 62vh;
  width: 56vmin; height: 56vmin;
  z-index: -3;
  pointer-events: none;
  transform: translate(-50%, -72%) translateZ(0);
  background: linear-gradient(180deg,
    #fff5a6 0%, #ffe23f 13%, #ffc21e 30%, #ff9500 45%, #ff6a00 58%,
    #ff4a24 70%, #ff2f52 82%, #ff2478 92%, #ff2d95 100%);
  /* soft-feathered inscribed circle (closest-side keeps it a true circle) */
  -webkit-mask-image: radial-gradient(circle closest-side at 50% 50%, #000 97%, transparent 100%);
  mask-image: radial-gradient(circle closest-side at 50% 50%, #000 97%, transparent 100%);
  will-change: transform;
  animation: sw-sun-pulse 5s ease-in-out infinite;
}

/* SUN BLINDS — the OutRun signature: horizontal cut-lines that ROLL DOWNWARD,
   thin near the top and dissolving thicker toward the bottom. Masked to the
   disc. Two layers: (A) rolling uniform cut-lines (background-position scroll),
   (B) a static downward dark ramp that thickens the cuts / dissolves the base. */
head title::before {
  content: "";
  display: var(--synthwave-scenery, block);
  position: fixed;
  left: 50%; top: 62vh;
  width: 56vmin; height: 56vmin;
  z-index: -3;
  pointer-events: none;
  transform: translate(-50%, -72%) translateZ(0);
  background:
    repeating-linear-gradient(180deg, transparent 0 16px, rgba(6,0,14,.9) 16px 28px) 0 0 / 100% 28px,
    linear-gradient(180deg, transparent 42%, rgba(6,0,14,.04) 56%, rgba(6,0,14,.2) 72%, rgba(6,0,14,.4) 88%, rgba(6,0,14,.6) 100%) 0 0 / 100% 100% no-repeat;
  /* gate (solid top ~40%) INTERSECT an inset circle so cut-lines stop just inside
     the rim — no dashed-arc artifact where cuts meet the disc edge. */
  -webkit-mask-image: linear-gradient(180deg, transparent 38%, #000 47%, #000 100%), radial-gradient(circle closest-side at 50% 50%, #000 90%, transparent 98%);
  -webkit-mask-composite: source-in;
  mask-image: linear-gradient(180deg, transparent 38%, #000 47%, #000 100%), radial-gradient(circle closest-side at 50% 50%, #000 90%, transparent 98%);
  mask-composite: intersect;
  /* background-position is not compositable — no will-change hint; this is the
     ONE sanctioned non-compositor loop (56vmin disc, GPU raster holds 60fps). */
  animation: sw-sun-roll 2.1s linear infinite;
}

/* GRID FLOOR STATICS — ground fill + vertical lines + bright cyan horizon line. */
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
  border-top: 2px solid rgba(120, 250, 255, 0.95);
  box-shadow: 0 0 30px rgba(90, 247, 255, 0.6), 0 0 90px rgba(90,247,255,.26);
  background:
    repeating-linear-gradient(90deg, rgba(255,90,190,.9) 0 1.5px, transparent 1.5px 72px),
    repeating-linear-gradient(90deg, rgba(255,45,149,.3) 0 5px, transparent 5px 72px),
    linear-gradient(180deg, rgba(90,247,255,.28) 0%, rgba(90,247,255,0) 9%),
    linear-gradient(180deg, #280b45 0%, #160731 26%, #0a0119 62%, #060011 100%);
}

/* LASERS (left rig) — three beams sharing ONE emitter, each beam SCISSORING
   independently (per-beam SMIL rotate, distinct durations 7s/5s/11s so their
   relative angles never repeat) and each cycling a complementary synthwave hue
   (per-beam SMIL on the gradient stops, 22s/26s/19s, phase-offset). The whole
   rig ALSO sweeps + pulses via CSS (compositor). Layer shrunk to the top band
   (height 32vw) so the per-frame SMIL re-raster stays cheap. */
head::after {
  content: "";
  display: var(--synthwave-scenery, block);
  position: fixed;
  left: 0; right: 0; top: 0; height: 32vw;
  z-index: -2;
  pointer-events: none;
  transform-origin: 12.5vw 8.06vw;
  will-change: transform, opacity;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='540' viewBox='0 0 1920 540'%3E%3Cdefs%3E%3ClinearGradient id='l1' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.95'%3E%3Canimate attributeName='stop-color' values='%23ff2d95;%235af7ff;%23ff2d95' dur='22s' repeatCount='indefinite'/%3E%3C/stop%3E%3Cstop offset='1' stop-color='%23ff2d95' stop-opacity='0'%3E%3Canimate attributeName='stop-color' values='%23ff2d95;%235af7ff;%23ff2d95' dur='22s' repeatCount='indefinite'/%3E%3C/stop%3E%3C/linearGradient%3E%3ClinearGradient id='l2' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%235af7ff' stop-opacity='.9'%3E%3Canimate attributeName='stop-color' values='%235af7ff;%23ffd23f;%235af7ff' dur='26s' begin='-8s' repeatCount='indefinite'/%3E%3C/stop%3E%3Cstop offset='1' stop-color='%235af7ff' stop-opacity='0'%3E%3Canimate attributeName='stop-color' values='%235af7ff;%23ffd23f;%235af7ff' dur='26s' begin='-8s' repeatCount='indefinite'/%3E%3C/stop%3E%3C/linearGradient%3E%3ClinearGradient id='l3' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%235af7ff' stop-opacity='.95'%3E%3Canimate attributeName='stop-color' values='%235af7ff;%23ff2d95;%235af7ff' dur='19s' begin='-5s' repeatCount='indefinite'/%3E%3C/stop%3E%3Cstop offset='1' stop-color='%235af7ff' stop-opacity='0'%3E%3Canimate attributeName='stop-color' values='%235af7ff;%23ff2d95;%235af7ff' dur='19s' begin='-5s' repeatCount='indefinite'/%3E%3C/stop%3E%3C/linearGradient%3E%3CradialGradient id='src' cx='.5' cy='.5' r='.5'%3E%3Cstop offset='0' stop-color='%23eaffff' stop-opacity='.95'/%3E%3Cstop offset='1' stop-color='%235af7ff' stop-opacity='0'/%3E%3C/radialGradient%3E%3Cfilter id='g' x='-30%' y='-250%' width='160%' height='600%'%3E%3CfeGaussianBlur stdDeviation='2.6'/%3E%3C/filter%3E%3C/defs%3E%3Cg filter='url(%23g)'%3E%3Cg transform='translate(240,150)'%3E%3Cg transform='rotate(9)'%3E%3Cpolygon points='0,-3 640,-1 640,1 0,3' fill='url(%23l1)'/%3E%3CanimateTransform attributeName='transform' type='rotate' values='9;15;9' dur='7s' calcMode='spline' keyTimes='0;0.5;1' keySplines='.42 0 .58 1;.42 0 .58 1' repeatCount='indefinite'/%3E%3C/g%3E%3C/g%3E%3Cg transform='translate(240,150)'%3E%3Cg transform='rotate(20)'%3E%3Cpolygon points='0,-2.4 560,-.8 560,.8 0,2.4' fill='url(%23l2)'/%3E%3CanimateTransform attributeName='transform' type='rotate' values='20;15;20' dur='5s' begin='-2s' calcMode='spline' keyTimes='0;0.5;1' keySplines='.42 0 .58 1;.42 0 .58 1' repeatCount='indefinite'/%3E%3C/g%3E%3C/g%3E%3Cg transform='translate(240,150)'%3E%3Cg transform='rotate(32)'%3E%3Cpolygon points='0,-2.8 580,-1 580,1 0,2.8' fill='url(%23l3)'/%3E%3CanimateTransform attributeName='transform' type='rotate' values='32;38;32' dur='11s' begin='-4s' calcMode='spline' keyTimes='0;0.5;1' keySplines='.42 0 .58 1;.42 0 .58 1' repeatCount='indefinite'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3Ccircle cx='240' cy='150' r='11' fill='url(%23src)'/%3E%3Ccircle cx='240' cy='150' r='3.4' fill='%23eaffff'/%3E%3C/svg%3E") 50% 0 / 100vw 29vw no-repeat;
  animation: sw-laser-l 9s ease-in-out infinite, sw-laser-pulse 3.4s ease-in-out infinite;
}

/* MOUNTAIN RANGE — low-poly range across the horizon (prominent side peaks, low
   centre where the city sits), IN FRONT of the sun (z -2 vs -3) so it silhouettes
   against / occludes the sun's lower edge. */
head meta:first-of-type::before {
  content: "";
  display: var(--synthwave-scenery, block);
  position: fixed;
  left: 0; right: 0;
  top: calc(62.3vh - 15vh); height: 15vh;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='620' height='130' viewBox='0 0 620 130'%3E%3Cdefs%3E%3ClinearGradient id='b' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%231a1338'/%3E%3Cstop offset='1' stop-color='%230a0620'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='url(%23b)'%3E%3Crect x='40' y='78' width='26' height='52'/%3E%3Crect x='72' y='58' width='34' height='72'/%3E%3Crect x='112' y='88' width='22' height='42'/%3E%3Crect x='140' y='44' width='40' height='86'/%3E%3Crect x='186' y='70' width='28' height='60'/%3E%3Crect x='220' y='30' width='34' height='100'/%3E%3Crect x='260' y='60' width='26' height='70'/%3E%3Crect x='292' y='16' width='30' height='114'/%3E%3Crect x='328' y='52' width='34' height='78'/%3E%3Crect x='368' y='74' width='24' height='56'/%3E%3Crect x='398' y='40' width='40' height='90'/%3E%3Crect x='444' y='66' width='28' height='64'/%3E%3Crect x='478' y='84' width='22' height='46'/%3E%3Crect x='506' y='54' width='36' height='76'/%3E%3Crect x='548' y='78' width='26' height='52'/%3E%3C/g%3E%3Cg stroke-width='2'%3E%3Cpath d='M72 58 L106 58' stroke='%235af7ff' stroke-opacity='.75'/%3E%3Cpath d='M140 44 L180 44' stroke='%23ff2d95' stroke-opacity='.7'/%3E%3Cpath d='M220 30 L254 30' stroke='%235af7ff' stroke-opacity='.8'/%3E%3Cpath d='M292 16 L322 16' stroke='%23ff2d95' stroke-opacity='.75'/%3E%3Cpath d='M328 52 L362 52' stroke='%235af7ff' stroke-opacity='.7'/%3E%3Cpath d='M398 40 L438 40' stroke='%23ff2d95' stroke-opacity='.72'/%3E%3Cpath d='M506 54 L542 54' stroke='%235af7ff' stroke-opacity='.7'/%3E%3C/g%3E%3Cg fill='%23ffd28a' opacity='.7'%3E%3Crect x='150' y='58' width='3' height='4'/%3E%3Crect x='166' y='72' width='3' height='4'/%3E%3Crect x='230' y='48' width='3' height='4'/%3E%3Crect x='240' y='70' width='3' height='4'/%3E%3Crect x='300' y='40' width='3' height='4'/%3E%3Crect x='310' y='64' width='3' height='4'/%3E%3Crect x='408' y='58' width='3' height='4'/%3E%3Crect x='420' y='80' width='3' height='4'/%3E%3Crect x='516' y='72' width='3' height='4'/%3E%3C/g%3E%3Cg fill='%238ff0ff' opacity='.55'%3E%3Crect x='84' y='74' width='3' height='4'/%3E%3Crect x='268' y='80' width='3' height='4'/%3E%3Crect x='352' y='68' width='3' height='4'/%3E%3Crect x='458' y='84' width='3' height='4'/%3E%3C/g%3E%3Cline x1='161' y1='44' x2='161' y2='28' stroke='%23ff5aa8' stroke-width='1.6'/%3E%3Ccircle cx='161' cy='26' r='2' fill='%23ffd2ec'/%3E%3Cline x1='307' y1='16' x2='307' y2='2' stroke='%239deaff' stroke-width='1.6'/%3E%3Ccircle cx='307' cy='1' r='2' fill='%23eafbff'/%3E%3C/svg%3E") 50% bottom / auto 6vh no-repeat,
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='300' viewBox='0 0 1920 300' preserveAspectRatio='none'%3E%3Cdefs%3E%3ClinearGradient id='lit' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23eafaff'/%3E%3Cstop offset='.28' stop-color='%23a9d6f5'/%3E%3Cstop offset='.62' stop-color='%236f7fd0'/%3E%3Cstop offset='1' stop-color='%233a3f86'/%3E%3C/linearGradient%3E%3ClinearGradient id='lit2' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23ffe0f2'/%3E%3Cstop offset='.35' stop-color='%23e59ad0'/%3E%3Cstop offset='.7' stop-color='%238a5aa8'/%3E%3Cstop offset='1' stop-color='%233c2f68'/%3E%3C/linearGradient%3E%3ClinearGradient id='drk' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23241755'/%3E%3Cstop offset='1' stop-color='%230d0722'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg%3E%3Cpath d='M0 300 L0 250 L96 120 L208 244 L340 74 L470 244 L582 168 L664 262 Q960 296 1256 262 L1338 168 L1450 90 L1582 244 L1700 96 L1812 240 L1920 150 L1920 300 Z' fill='url(%23drk)'/%3E%3Cpath d='M96 120 L208 244 L96 244 Z' fill='url(%23lit)' opacity='.92'/%3E%3Cpath d='M340 74 L470 244 L340 244 Z' fill='url(%23lit)'/%3E%3Cpath d='M582 168 L664 262 L582 262 Z' fill='url(%23lit2)' opacity='.82'/%3E%3Cpath d='M1450 90 L1582 244 L1450 244 Z' fill='url(%23lit2)' opacity='.85'/%3E%3Cpath d='M1700 96 L1812 240 L1700 240 Z' fill='url(%23lit)'/%3E%3Cpath d='M1920 150 L1812 240 L1920 240 Z' fill='url(%23lit)' opacity='.8'/%3E%3Cg fill='%23f4fbff'%3E%3Cpath d='M340 74 L366 110 L340 128 L316 108 Z' opacity='.9'/%3E%3Cpath d='M1700 96 L1726 130 L1700 146 L1674 128 Z' opacity='.9'/%3E%3Cpath d='M96 120 L114 148 L96 160 L80 146 Z' opacity='.7'/%3E%3Cpath d='M1450 90 L1470 120 L1450 134 L1430 118 Z' opacity='.72'/%3E%3C/g%3E%3Cg fill='none' stroke-linecap='round'%3E%3Cpath d='M0 250 L96 120 L208 244 L340 74 L470 244 L582 168 L664 262 Q960 296 1256 262 L1338 168 L1450 90 L1582 244 L1700 96 L1812 240 L1920 150' stroke='%235af7ff' stroke-width='2.6' stroke-opacity='.9'/%3E%3Cpath d='M96 120 L208 244 M340 74 L470 244 M582 168 L664 262 M1450 90 L1582 244 M1700 96 L1812 240' stroke='%23ff2d95' stroke-width='1.8' stroke-opacity='.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") 0 0 / 100% 100% no-repeat;
}

/* LASERS (right rig) — mirror of the left rig on the far side of the sky. Three
   beams share one emitter, each SCISSORING independently (SMIL rotate, durations
   6s/9s/5s — all different from the left rig) and each cycling a complementary
   synthwave hue on a different phase/period (20s/24s/17s) so the two rigs are
   never in sync. Whole rig sweeps + pulses via CSS on offset timings. Top-band
   layer (32vw) to keep the SMIL re-raster cheap. */
head meta:first-of-type::after {
  content: "";
  display: var(--synthwave-scenery, block);
  position: fixed;
  left: 0; right: 0; top: 0; height: 32vw;
  z-index: -2;
  pointer-events: none;
  transform-origin: 87.5vw 8.06vw;
  will-change: transform, opacity;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='540' viewBox='0 0 1920 540'%3E%3Cdefs%3E%3ClinearGradient id='r1' x1='1' y1='0' x2='0' y2='0'%3E%3Cstop offset='0' stop-color='%235af7ff' stop-opacity='.95'%3E%3Canimate attributeName='stop-color' values='%235af7ff;%23ff2d95;%235af7ff' dur='20s' repeatCount='indefinite'/%3E%3C/stop%3E%3Cstop offset='1' stop-color='%235af7ff' stop-opacity='0'%3E%3Canimate attributeName='stop-color' values='%235af7ff;%23ff2d95;%235af7ff' dur='20s' repeatCount='indefinite'/%3E%3C/stop%3E%3C/linearGradient%3E%3ClinearGradient id='r2' x1='1' y1='0' x2='0' y2='0'%3E%3Cstop offset='0' stop-color='%23ffd23f' stop-opacity='.85'%3E%3Canimate attributeName='stop-color' values='%23ffd23f;%235af7ff;%23ffd23f' dur='24s' begin='-11s' repeatCount='indefinite'/%3E%3C/stop%3E%3Cstop offset='1' stop-color='%23ffd23f' stop-opacity='0'%3E%3Canimate attributeName='stop-color' values='%23ffd23f;%235af7ff;%23ffd23f' dur='24s' begin='-11s' repeatCount='indefinite'/%3E%3C/stop%3E%3C/linearGradient%3E%3ClinearGradient id='r3' x1='1' y1='0' x2='0' y2='0'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.95'%3E%3Canimate attributeName='stop-color' values='%23ff2d95;%235af7ff;%23ff2d95' dur='17s' begin='-3s' repeatCount='indefinite'/%3E%3C/stop%3E%3Cstop offset='1' stop-color='%23ff2d95' stop-opacity='0'%3E%3Canimate attributeName='stop-color' values='%23ff2d95;%235af7ff;%23ff2d95' dur='17s' begin='-3s' repeatCount='indefinite'/%3E%3C/stop%3E%3C/linearGradient%3E%3CradialGradient id='srcm' cx='.5' cy='.5' r='.5'%3E%3Cstop offset='0' stop-color='%23ffe0f2' stop-opacity='.95'/%3E%3Cstop offset='1' stop-color='%23ff2d95' stop-opacity='0'/%3E%3C/radialGradient%3E%3Cfilter id='g' x='-30%' y='-250%' width='160%' height='600%'%3E%3CfeGaussianBlur stdDeviation='2.6'/%3E%3C/filter%3E%3C/defs%3E%3Cg filter='url(%23g)'%3E%3Cg transform='translate(1680,150)'%3E%3Cg transform='rotate(-9)'%3E%3Cpolygon points='0,-3 -640,-1 -640,1 0,3' fill='url(%23r1)'/%3E%3CanimateTransform attributeName='transform' type='rotate' values='-9;-15;-9' dur='6s' begin='-1s' calcMode='spline' keyTimes='0;0.5;1' keySplines='.42 0 .58 1;.42 0 .58 1' repeatCount='indefinite'/%3E%3C/g%3E%3C/g%3E%3Cg transform='translate(1680,150)'%3E%3Cg transform='rotate(-20)'%3E%3Cpolygon points='0,-2.4 -560,-.8 -560,.8 0,2.4' fill='url(%23r2)'/%3E%3CanimateTransform attributeName='transform' type='rotate' values='-20;-15;-20' dur='9s' begin='-3s' calcMode='spline' keyTimes='0;0.5;1' keySplines='.42 0 .58 1;.42 0 .58 1' repeatCount='indefinite'/%3E%3C/g%3E%3C/g%3E%3Cg transform='translate(1680,150)'%3E%3Cg transform='rotate(-32)'%3E%3Cpolygon points='0,-2.8 -580,-1 -580,1 0,2.8' fill='url(%23r3)'/%3E%3CanimateTransform attributeName='transform' type='rotate' values='-32;-38;-32' dur='5s' begin='-2s' calcMode='spline' keyTimes='0;0.5;1' keySplines='.42 0 .58 1;.42 0 .58 1' repeatCount='indefinite'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3Ccircle cx='1680' cy='150' r='11' fill='url(%23srcm)'/%3E%3Ccircle cx='1680' cy='150' r='3.4' fill='%23ffe0f2'/%3E%3C/svg%3E") 50% 0 / 100vw 29vw no-repeat;
  animation: sw-laser-r 7.3s ease-in-out infinite, sw-laser-pulse 4.6s ease-in-out infinite -1.7s;
}

/* PALMS — four roadside silhouettes that rush past the camera (emerge small near
   the horizon beside the road, scale up + slide toward the screen edge, fading;
   a slight lean approximates frond-sway). Two per side, staggered by half-cycle. */
head title::after,
head meta:last-of-type::before,
head link:first-of-type::before,
head link:first-of-type::after {
  content: "";
  display: var(--synthwave-scenery, block);
  position: fixed;
  bottom: 0;
  width: 17vw; height: 30vw;
  z-index: 1;
  pointer-events: none;
  transform-origin: 50% 100%;
  opacity: 0;
  will-change: transform, opacity;
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: contain;
}
head title::after            { left: 42vw; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='460' viewBox='0 0 260 460'%3E%3Cdefs%3E%3ClinearGradient id='trunk' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23060213'/%3E%3Cstop offset='.55' stop-color='%23160a2c'/%3E%3Cstop offset='1' stop-color='%23241040'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg%3E%3Cpath d='M116 456 Q126 322 130 214 Q131 178 138 150 L164 152 Q152 184 152 216 Q152 334 150 456 Z' fill='url(%23trunk)'/%3E%3Cg fill='%230b0420'%3E%3Cpath d='M140 152 Q104 108 30 92 Q72 104 104 128 Q68 118 22 122 Q80 130 118 150 Q92 140 60 148 Q104 150 140 160 Z'/%3E%3Cpath d='M142 150 Q128 92 84 44 Q108 92 116 128 Q96 96 66 74 Q110 116 132 150 Z'/%3E%3Cpath d='M146 146 Q146 80 176 34 Q160 82 154 122 Q166 90 196 66 Q158 108 152 150 Z'/%3E%3Cpath d='M150 150 Q196 104 258 96 Q214 108 178 132 Q220 118 250 130 Q200 132 156 156 Q188 146 224 156 Q176 150 150 160 Z'/%3E%3Cpath d='M138 156 Q86 148 34 182 Q84 162 122 166 Q80 172 44 200 Q98 168 140 168 Z'/%3E%3Cpath d='M150 156 Q206 150 244 196 Q200 168 158 168 Q206 176 236 208 Q188 172 148 166 Z'/%3E%3C/g%3E%3Cg fill='none' stroke='%23ff4faf' stroke-opacity='.4' stroke-width='1.6' stroke-linecap='round'%3E%3Cpath d='M146 146 Q146 80 176 34'/%3E%3Cpath d='M150 150 Q196 104 258 96'/%3E%3Cpath d='M150 156 Q206 150 244 196'/%3E%3C/g%3E%3Cg fill='none' stroke='%236ff8ff' stroke-opacity='.28' stroke-width='1.4' stroke-linecap='round'%3E%3Cpath d='M140 152 Q104 108 30 92'/%3E%3Cpath d='M138 156 Q86 148 34 182'/%3E%3C/g%3E%3Ccircle cx='137' cy='150' r='6' fill='%230b0420'/%3E%3Ccircle cx='148' cy='153' r='5' fill='%230b0420'/%3E%3C/g%3E%3C/svg%3E"); animation: sw-palm-l 5s linear infinite; }
head link:first-of-type::before { left: 42vw; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='460' viewBox='0 0 260 460'%3E%3Cdefs%3E%3ClinearGradient id='trunk' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23060213'/%3E%3Cstop offset='.55' stop-color='%23160a2c'/%3E%3Cstop offset='1' stop-color='%23241040'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg%3E%3Cpath d='M116 456 Q126 322 130 214 Q131 178 138 150 L164 152 Q152 184 152 216 Q152 334 150 456 Z' fill='url(%23trunk)'/%3E%3Cg fill='%230b0420'%3E%3Cpath d='M140 152 Q104 108 30 92 Q72 104 104 128 Q68 118 22 122 Q80 130 118 150 Q92 140 60 148 Q104 150 140 160 Z'/%3E%3Cpath d='M142 150 Q128 92 84 44 Q108 92 116 128 Q96 96 66 74 Q110 116 132 150 Z'/%3E%3Cpath d='M146 146 Q146 80 176 34 Q160 82 154 122 Q166 90 196 66 Q158 108 152 150 Z'/%3E%3Cpath d='M150 150 Q196 104 258 96 Q214 108 178 132 Q220 118 250 130 Q200 132 156 156 Q188 146 224 156 Q176 150 150 160 Z'/%3E%3Cpath d='M138 156 Q86 148 34 182 Q84 162 122 166 Q80 172 44 200 Q98 168 140 168 Z'/%3E%3Cpath d='M150 156 Q206 150 244 196 Q200 168 158 168 Q206 176 236 208 Q188 172 148 166 Z'/%3E%3C/g%3E%3Cg fill='none' stroke='%23ff4faf' stroke-opacity='.4' stroke-width='1.6' stroke-linecap='round'%3E%3Cpath d='M146 146 Q146 80 176 34'/%3E%3Cpath d='M150 150 Q196 104 258 96'/%3E%3Cpath d='M150 156 Q206 150 244 196'/%3E%3C/g%3E%3Cg fill='none' stroke='%236ff8ff' stroke-opacity='.28' stroke-width='1.4' stroke-linecap='round'%3E%3Cpath d='M140 152 Q104 108 30 92'/%3E%3Cpath d='M138 156 Q86 148 34 182'/%3E%3C/g%3E%3Ccircle cx='137' cy='150' r='6' fill='%230b0420'/%3E%3Ccircle cx='148' cy='153' r='5' fill='%230b0420'/%3E%3C/g%3E%3C/svg%3E"); animation: sw-palm-l 5s linear -2.5s infinite; }
head meta:last-of-type::before  { left: 42vw; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='460' viewBox='0 0 260 460'%3E%3Cdefs%3E%3ClinearGradient id='trunk' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23060213'/%3E%3Cstop offset='.55' stop-color='%23160a2c'/%3E%3Cstop offset='1' stop-color='%23241040'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg transform='scale(-1,1) translate(-260,0)'%3E%3Cpath d='M116 456 Q126 322 130 214 Q131 178 138 150 L164 152 Q152 184 152 216 Q152 334 150 456 Z' fill='url(%23trunk)'/%3E%3Cg fill='%230b0420'%3E%3Cpath d='M140 152 Q104 108 30 92 Q72 104 104 128 Q68 118 22 122 Q80 130 118 150 Q92 140 60 148 Q104 150 140 160 Z'/%3E%3Cpath d='M142 150 Q128 92 84 44 Q108 92 116 128 Q96 96 66 74 Q110 116 132 150 Z'/%3E%3Cpath d='M146 146 Q146 80 176 34 Q160 82 154 122 Q166 90 196 66 Q158 108 152 150 Z'/%3E%3Cpath d='M150 150 Q196 104 258 96 Q214 108 178 132 Q220 118 250 130 Q200 132 156 156 Q188 146 224 156 Q176 150 150 160 Z'/%3E%3Cpath d='M138 156 Q86 148 34 182 Q84 162 122 166 Q80 172 44 200 Q98 168 140 168 Z'/%3E%3Cpath d='M150 156 Q206 150 244 196 Q200 168 158 168 Q206 176 236 208 Q188 172 148 166 Z'/%3E%3C/g%3E%3Cg fill='none' stroke='%23ff4faf' stroke-opacity='.4' stroke-width='1.6' stroke-linecap='round'%3E%3Cpath d='M146 146 Q146 80 176 34'/%3E%3Cpath d='M150 150 Q196 104 258 96'/%3E%3Cpath d='M150 156 Q206 150 244 196'/%3E%3C/g%3E%3Cg fill='none' stroke='%236ff8ff' stroke-opacity='.28' stroke-width='1.4' stroke-linecap='round'%3E%3Cpath d='M140 152 Q104 108 30 92'/%3E%3Cpath d='M138 156 Q86 148 34 182'/%3E%3C/g%3E%3Ccircle cx='137' cy='150' r='6' fill='%230b0420'/%3E%3Ccircle cx='148' cy='153' r='5' fill='%230b0420'/%3E%3C/g%3E%3C/svg%3E"); animation: sw-palm-r 5s linear -1.25s infinite; }
head link:first-of-type::after  { left: 42vw; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='460' viewBox='0 0 260 460'%3E%3Cdefs%3E%3ClinearGradient id='trunk' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23060213'/%3E%3Cstop offset='.55' stop-color='%23160a2c'/%3E%3Cstop offset='1' stop-color='%23241040'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg transform='scale(-1,1) translate(-260,0)'%3E%3Cpath d='M116 456 Q126 322 130 214 Q131 178 138 150 L164 152 Q152 184 152 216 Q152 334 150 456 Z' fill='url(%23trunk)'/%3E%3Cg fill='%230b0420'%3E%3Cpath d='M140 152 Q104 108 30 92 Q72 104 104 128 Q68 118 22 122 Q80 130 118 150 Q92 140 60 148 Q104 150 140 160 Z'/%3E%3Cpath d='M142 150 Q128 92 84 44 Q108 92 116 128 Q96 96 66 74 Q110 116 132 150 Z'/%3E%3Cpath d='M146 146 Q146 80 176 34 Q160 82 154 122 Q166 90 196 66 Q158 108 152 150 Z'/%3E%3Cpath d='M150 150 Q196 104 258 96 Q214 108 178 132 Q220 118 250 130 Q200 132 156 156 Q188 146 224 156 Q176 150 150 160 Z'/%3E%3Cpath d='M138 156 Q86 148 34 182 Q84 162 122 166 Q80 172 44 200 Q98 168 140 168 Z'/%3E%3Cpath d='M150 156 Q206 150 244 196 Q200 168 158 168 Q206 176 236 208 Q188 172 148 166 Z'/%3E%3C/g%3E%3Cg fill='none' stroke='%23ff4faf' stroke-opacity='.4' stroke-width='1.6' stroke-linecap='round'%3E%3Cpath d='M146 146 Q146 80 176 34'/%3E%3Cpath d='M150 150 Q196 104 258 96'/%3E%3Cpath d='M150 156 Q206 150 244 196'/%3E%3C/g%3E%3Cg fill='none' stroke='%236ff8ff' stroke-opacity='.28' stroke-width='1.4' stroke-linecap='round'%3E%3Cpath d='M140 152 Q104 108 30 92'/%3E%3Cpath d='M138 156 Q86 148 34 182'/%3E%3C/g%3E%3Ccircle cx='137' cy='150' r='6' fill='%230b0420'/%3E%3Ccircle cx='148' cy='153' r='5' fill='%230b0420'/%3E%3C/g%3E%3C/svg%3E"); animation: sw-palm-r 5s linear -2.5s infinite; }

/* SHOOTING STAR — the sky's story beat: a thin cyan-white streak arcs down
   the upper sky once every 19s, then the night goes still again. A tiny
   150x36 layer moving via transform+opacity only. Lives on the host freed
   by the car's move to body::before — head link:first-of-type::after is
   the 4th palm; redefining it here would silently kill that palm. */
head meta:last-of-type::after {
  content: "";
  display: var(--synthwave-scenery, block);
  position: fixed;
  left: 18vw; top: 8vh;
  width: 150px; height: 36px;
  z-index: -2;
  pointer-events: none;
  opacity: 0;
  background:
    radial-gradient(circle at 88% 50%, rgba(240,252,255,.95) 0 3px, rgba(160,236,255,.5) 6px, transparent 12px),
    linear-gradient(90deg, transparent 0%, rgba(140,230,255,.05) 30%, rgba(190,244,255,.55) 82%, transparent 88%) 0 46% / 100% 3px no-repeat;
  transform: rotate(6deg) translate3d(0, 0, 0);
  animation: synthwave-shoot 19s linear infinite;
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
  /* Layer order (first = top): HERO CAR, its ground glow, then the readability
     scrim. The car lives on the scrim's host ON PURPOSE — the base fade-mask makes
     <body> a stacking context, so body's pseudos (this scrim, the road on
     body::after) + the crawl paint as one group ABOVE every <head> pseudo. Putting
     the car here sits it ABOVE the road (body::after z-1, earlier layer) yet BELOW
     the scrolling names (the crawl is later in tree order). The mask's bottom fade
     just softens where the tyres meet the road. */
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='440' height='300' viewBox='0 0 440 300'%3E%3Cdefs%3E%3ClinearGradient id='body' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%233a2168'/%3E%3Cstop offset='.4' stop-color='%23241247'/%3E%3Cstop offset='1' stop-color='%230e0722'/%3E%3C/linearGradient%3E%3ClinearGradient id='roof' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%232e1a56'/%3E%3Cstop offset='1' stop-color='%23160b34'/%3E%3C/linearGradient%3E%3ClinearGradient id='glass' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%233a5a8f' stop-opacity='.7'/%3E%3Cstop offset='1' stop-color='%230a1230' stop-opacity='.92'/%3E%3C/linearGradient%3E%3ClinearGradient id='rear' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%231c1140'/%3E%3Cstop offset='1' stop-color='%230a0620'/%3E%3C/linearGradient%3E%3CradialGradient id='tl' cx='.5' cy='.5' r='.5'%3E%3Cstop offset='0' stop-color='%23ff617f'/%3E%3Cstop offset='.5' stop-color='%23ff1246'/%3E%3Cstop offset='1' stop-color='%23b00028'/%3E%3C/radialGradient%3E%3CradialGradient id='uglow' cx='.5' cy='.5' r='.5'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.5'/%3E%3Cstop offset='1' stop-color='%23ff2d95' stop-opacity='0'/%3E%3C/radialGradient%3E%3Cfilter id='sf' x='-50%' y='-50%' width='200%' height='200%'%3E%3CfeGaussianBlur stdDeviation='3.4'/%3E%3C/filter%3E%3Cfilter id='sfb' x='-80%' y='-200%' width='260%' height='500%'%3E%3CfeGaussianBlur stdDeviation='7'/%3E%3C/filter%3E%3C/defs%3E%3Cellipse cx='220' cy='288' rx='190' ry='14' fill='url(%23uglow)' filter='url(%23sfb)'/%3E%3Cg%3E%3Crect x='60' y='224' width='60' height='66' rx='11' fill='%23050110'/%3E%3Crect x='320' y='224' width='60' height='66' rx='11' fill='%23050110'/%3E%3Cpath d='M64 278 A 26 26 0 0 0 116 278 Z' fill='%230c0620'/%3E%3Cpath d='M324 278 A 26 26 0 0 0 376 278 Z' fill='%230c0620'/%3E%3Cpath d='M66 276 A 24 24 0 0 1 114 276' fill='none' stroke='%23ff5aa8' stroke-opacity='.6' stroke-width='2.4'/%3E%3Cpath d='M326 276 A 24 24 0 0 1 374 276' fill='none' stroke='%235af7ff' stroke-opacity='.5' stroke-width='2.4'/%3E%3C/g%3E%3Cpath d='M150 78 Q154 62 176 60 L264 60 Q286 62 290 78 L306 150 L134 150 Z' fill='url(%23roof)'/%3E%3Cpath d='M160 80 Q164 70 180 69 L260 69 Q276 70 280 80 L296 146 L144 146 Z' fill='url(%23glass)'/%3E%3Cpath d='M164 71 Q220 63 276 71' fill='none' stroke='%238fbfff' stroke-opacity='.35' stroke-width='2'/%3E%3Cpath d='M172 88 L268 88 M168 112 L272 112 M164 136 L276 136' stroke='%230a1230' stroke-width='3' opacity='.5'/%3E%3Cpath d='M56 168 Q62 140 96 133 Q158 124 220 124 Q282 124 344 133 Q378 140 384 168 L394 236 Q396 254 374 256 L66 256 Q44 254 46 236 Z' fill='url(%23body)'/%3E%3Cpath d='M60 172 Q220 156 380 172' fill='none' stroke='%23c9a4ff' stroke-opacity='.3' stroke-width='2.4'/%3E%3Cpath d='M58 174 Q52 206 48 238 Q47 250 62 252' fill='none' stroke='%235af7ff' stroke-opacity='.75' stroke-width='2.8'/%3E%3Cpath d='M382 174 Q388 206 392 238 Q393 250 378 252' fill='none' stroke='%23ff2d95' stroke-opacity='.8' stroke-width='2.8'/%3E%3Cpath d='M46 150 L20 143 Q12 141 12 150 L15 162 Q16 168 26 167 L50 160 Z' fill='%230c0620'/%3E%3Cpath d='M394 150 L420 143 Q428 141 428 150 L425 162 Q424 168 414 167 L390 160 Z' fill='%230c0620'/%3E%3Crect x='66' y='182' width='308' height='60' rx='9' fill='url(%23rear)'/%3E%3Crect x='66' y='182' width='308' height='60' rx='9' fill='none' stroke='%233a2168' stroke-width='1.6'/%3E%3Crect x='86' y='196' width='120' height='22' rx='11' fill='url(%23tl)' filter='url(%23sf)'/%3E%3Crect x='86' y='196' width='120' height='22' rx='11' fill='url(%23tl)'/%3E%3Crect x='94' y='201' width='104' height='7' rx='3.5' fill='%23ffd0d8' opacity='.85'/%3E%3Crect x='234' y='196' width='120' height='22' rx='11' fill='url(%23tl)' filter='url(%23sf)'/%3E%3Crect x='234' y='196' width='120' height='22' rx='11' fill='url(%23tl)'/%3E%3Crect x='242' y='201' width='104' height='7' rx='3.5' fill='%23ffd0d8' opacity='.85'/%3E%3Crect x='206' y='202' width='28' height='10' rx='2' fill='%23ff1246' opacity='.85' filter='url(%23sf)'/%3E%3Crect x='182' y='224' width='76' height='16' rx='2' fill='%230b1c33' stroke='%235af7ff' stroke-opacity='.55' stroke-width='1.2'/%3E%3Ctext x='220' y='236' font-family='monospace' font-size='11' font-weight='bold' letter-spacing='2' fill='%235af7ff' text-anchor='middle'%3EOUTRUN%3C/text%3E%3Cpath d='M66 246 L374 246 L380 268 Q381 276 366 276 L74 276 Q59 276 60 268 Z' fill='%230a0620'/%3E%3Cg stroke='%23241247' stroke-width='2.4'%3E%3Cpath d='M110 250 L110 272 M150 250 L150 272 M290 250 L290 272 M330 250 L330 272'/%3E%3C/g%3E%3Ccircle cx='94' cy='232' r='3.4' fill='%23cfe9ff' fill-opacity='.9' filter='url(%23sf)'/%3E%3Ccircle cx='346' cy='232' r='3.4' fill='%23cfe9ff' fill-opacity='.9' filter='url(%23sf)'/%3E%3C/svg%3E") center bottom / 32vw auto no-repeat,
    radial-gradient(ellipse 20% 11% at 50% 97%, rgba(255,44,72,.5) 0%, rgba(255,32,96,.2) 42%, rgba(255,45,149,0) 72%) 0 0 / 100% 100% no-repeat,
    linear-gradient(90deg,
      transparent 10%, rgba(5,1,15,.20) 30%, rgba(5,1,15,.28) 50%,
      rgba(5,1,15,.20) 70%, transparent 90%) 0 0 / 100% 100% no-repeat;
  will-change: transform;
  animation: sw-car-bob 5.4s ease-in-out infinite;
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
  /* far edge dissolves into horizon haze so nothing pops at the top */
  -webkit-mask-image: linear-gradient(180deg, transparent 0, rgba(0,0,0,.5) 8%, #000 16%, #000 100%);
  mask-image: linear-gradient(180deg, transparent 0, rgba(0,0,0,.5) 8%, #000 16%, #000 100%);
  background:
    repeating-linear-gradient(180deg, rgba(255,224,96,1) 0 30px, transparent 30px 68px) 50% 0 / 6px 100% repeat-y,
    linear-gradient(rgba(170,253,255,1), rgba(170,253,255,1)) 44% 0 / 6px 100% repeat-y,
    linear-gradient(rgba(255,120,214,1), rgba(255,120,214,1)) 56% 0 / 6px 100% repeat-y,
    repeating-linear-gradient(180deg, rgba(160,252,255,.8) 0 30px, transparent 30px 68px) 40.5% 0 / 4px 100% repeat-y,
    repeating-linear-gradient(180deg, rgba(255,110,210,.8) 0 30px, transparent 30px 68px) 59.5% 0 / 4px 100% repeat-y,
    linear-gradient(90deg, transparent 43.3%, rgba(4,1,11,.8) 44%, rgba(13,6,28,.66) 50%, rgba(4,1,11,.8) 56%, transparent 56.7%) 0 0 / 100% 100% no-repeat,
    repeating-linear-gradient(180deg, rgba(255,120,205,1) 0 1.5px, transparent 1.5px 68px) 0 0 / 100% 100% repeat,
    repeating-linear-gradient(180deg, rgba(255,45,149,.34) 0 5px, transparent 5px 68px) 0 0 / 100% 100% repeat;
  filter: drop-shadow(0 0 5px rgba(255,90,190,.6)) drop-shadow(0 0 9px rgba(120,240,255,.28));
  will-change: transform;
  animation: synthwave-grid-drive 1s linear infinite;
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
  /* the 14px dark layer is the sun guard: names crawl straight across the
     bright disc and the tight 2-4px halo alone washed out there */
  text-shadow: 0 0 2px rgba(3,0,12,1), 0 0 4px rgba(3,0,12,1), 0 1px 3px rgba(3,0,12,1), 0 0 14px rgba(3,0,12,.9), 0 0 9px rgba(90,247,255,.55), 0 0 26px rgba(90,247,255,.22), var(--credits-shadow);
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
@keyframes sw-sun-pulse {
  0%, 100% { opacity: .82; }
  50%      { opacity: 1; }
}
@keyframes sw-sun-roll {
  from { background-position: 0 0, 0 0; }
  to   { background-position: 0 28px, 0 0; }
}
@keyframes sw-laser-l {
  0%, 100% { transform: rotate(-4.5deg); }
  50%      { transform: rotate(4.5deg); }
}
@keyframes sw-laser-r {
  0%, 100% { transform: rotate(6deg); }
  50%      { transform: rotate(-3.5deg); }
}
@keyframes sw-laser-pulse {
  0%, 100% { opacity: .55; }
  50%      { opacity: 1; }
}
/* palms emerge SMALL at the horizon beside the road, then sweep DOWN + OUTWARD
   toward the screen corner, growing — the perspective of driving past them.
   The 55% waypoint puts most of the growth in the near half (accelerating). */
@keyframes sw-palm-l {
  0%   { opacity: 0; transform: translate(-2vw, -33vh) scale(.12) rotate(1deg); }
  7%   { opacity: 1; }
  55%  { transform: translate(-13vw, -12vh) scale(.6) rotate(-2deg); }
  84%  { opacity: 1; }
  100% { opacity: 0; transform: translate(-42vw, 9vh) scale(2.0) rotate(-6deg); }
}
@keyframes sw-palm-r {
  0%   { opacity: 0; transform: translate(2vw, -33vh) scale(.12) rotate(-1deg); }
  7%   { opacity: 1; }
  55%  { transform: translate(13vw, -12vh) scale(.6) rotate(2deg); }
  84%  { opacity: 1; }
  100% { opacity: 0; transform: translate(42vw, 9vh) scale(2.0) rotate(6deg); }
}
@keyframes synthwave-grid-drive {
  from { transform: perspective(340px) rotateX(60deg) translate3d(0, 0, 0); }
  to   { transform: perspective(340px) rotateX(60deg) translate3d(0, 68px, 0); }
}
/* sun heat-shimmer — coarse bands drift up one 14px period */
@keyframes synthwave-sun-scan {
  from { background-position: 0 0; }
  to   { background-position: 0 -14px; }
}
/* sun glow breathe — the halo swells and cools on a slow pulse */
@keyframes synthwave-sun-breathe {
  0%, 100% { opacity: .8; transform: translate(-50%, -62%) translateZ(0) scale(1); }
  50%      { opacity: 1;  transform: translate(-50%, -62%) translateZ(0) scale(1.05); }
}
/* car — a gentle float + micro-sway, like a car settling on its suspension */
@keyframes sw-car-bob {
  0%, 100% { transform: translateY(0); }
  40%      { transform: translateY(-0.55vh); }
  72%      { transform: translateY(-0.18vh); }
}

/* One 0.9s streak per 19s cycle; the rotate(6deg) prefix stays constant so the
   translate3d runs along the streak's own axis (a straight descending path). */
@keyframes synthwave-shoot {
  0%        { transform: rotate(6deg) translate3d(0, 0, 0); opacity: 0; }
  0.6%      { opacity: .9; }
  4.2%      { opacity: .85; }
  4.8%      { transform: rotate(6deg) translate3d(46vw, 0, 0); opacity: 0; }
  100%      { transform: rotate(6deg) translate3d(46vw, 0, 0); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  body::after,
  head::before, html::after, head title::before,
  head::after, head meta:first-of-type::after,
  head title::after, head meta:last-of-type::before,
  head link:first-of-type::before, head link:first-of-type::after,
  head meta:last-of-type::after,
  body::before { animation: none; }
  /* park palms visible: left pair stage-left, mirrored right pair stage-right */
  head title::after, head link:first-of-type::before { opacity: .9; transform: translate(-20vw, 20vh) scale(1); }
  head meta:last-of-type::before, head link:first-of-type::after { opacity: .9; transform: translate(20vw, 20vh) scale(1); }
  .credits-slide { transform: none; transition: opacity .8s ease; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--synthwave-scenery:none;}",
};
