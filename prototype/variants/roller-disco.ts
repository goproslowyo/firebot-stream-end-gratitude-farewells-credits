import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. Roller Disco: last song at the rink — a lit mirror ball raining soft light shafts over a checkered 2.5D floor, a neon rail on the horizon, and a four-skater ensemble (Duke, Roxy, Comet, Flash) carving one hand-choreographed 36s routine — two near-misses, a pirouette, and a sparkle-burst high-five — while the names roll in gold and hot pink. */
export const VARIANT: ThemeVariant = {
  key: "roller-disco",
  name: "Roller Disco",
  css: `
/* ================================================================
   ROLLER DISCO — layered after the base theme.
   Fiction: it is 1:00 AM at the rink, the DJ calls ALL SKATE one last
   time. The mirror ball hangs bright at top-center and throws soft
   shafts down the wall to a neon rail where the checkered floor
   begins; the die-hards — Duke, Roxy, Comet, Flash — carve one
   hand-choreographed routine under the names, all four locked to a
   single 36s master clock so every crossing is staged, never chance:
     t=25%  near-miss 1 — Duke swings low as Comet cuts behind him,
            both leaning apart
     t=50%  THE HIGH-FIVE — Duke (facing right, hand up) meets Flash
            (facing left, palm out) mid-floor; a sparkle burst pops
            at the meeting point on the same clock
     t=57-62%  Comet pirouettes (scaleX paper-doll twirl) and comes
            out of the spin facing the other way — the flip IS the move;
            moments later Flash glides past behind her (staged depth pass)
     t=82%  near-miss 2 — Flash crosses Roxy up at the rail, small in
            the distance, opposite leans
   Layer map (all scenery kill-switched via --roller-disco-scenery):
     html bg (--credits-bg)  night gradient (cheap: halo radial + 6-stop linear)
     html::before            checkered 2.5D floor, bottom 28vh, STATIC
     html::after             MIRROR BALL — border-radius:50% clips every facet
                             gradient to the sphere; glow halo via box-shadow.
                             STATIC, promoted
     body::before            floor light pools, steps() drift (1 hop/4s)
     body::after             rod + light shafts + neon rail horizon + scrim,
                             STATIC, promoted
     head::before                     COMET  (paints deepest of the cast)
     head meta:first-of-type::before  ROXY   (void-element prop layer)
     head meta:last-of-type::before   FLASH  (void-element prop layer)
     head link::before                DUKE   (nearest-lane hero, paints above cast)
     head::after                      high-five sparkle burst (paints above all)
     .credits-roll::before   disco-dust sparkle, RIDES THE ROLL (fine pattern)
   MOVER BUDGET: this theme runs the granted roller-disco exception —
   4 continuous small movers (150x203px boxes, will-change: transform,
   one pseudo each). Each also carries a legcycle that swaps background-image
   through 4 stride frames at ~2.6-2.9/s (steps(1) sprite frames, no extra
   compositor layer, negligible repaint — the blessed small-sprite exception).
   The extra two compositor layers are the accepted SW cost of the ensemble;
   everything else is static or steps(). Void meta/link elements render nothing
   themselves (verified: no stray text) — they only host the fixed pseudos.
   ================================================================ */
@import url('https://fonts.googleapis.com/css2?family=Righteous&family=Quicksand:wght@500;600;700&display=swap');

:root {
  --roller-disco-pink: #ff2d95;
  --roller-disco-gold: #ffd23f;
  --roller-disco-purple: #7b2fbf;
  --roller-disco-night: #14060f;
  --roller-disco-cream: #fff3fb;
  --roller-disco-scenery: block; /* set to none to strip every scenery layer */

  --credits-bg:
    radial-gradient(ellipse 46% 32% at 50% 2%, rgba(206, 108, 244, 0.3) 0%, rgba(255, 45, 149, 0.1) 50%, rgba(20, 6, 15, 0) 74%),
    linear-gradient(180deg, #2b1141 0%, #221033 18%, #190a26 38%, #13061b 58%, #0d0313 78%, #070109 100%);
  --credits-color: var(--roller-disco-cream);
  --credits-accent: var(--roller-disco-gold);
  --credits-font: "Quicksand", "Avenir Next", "Segoe UI", Verdana, sans-serif;
  --credits-title-font: "Righteous", "Arial Rounded MT Bold", "Trebuchet MS", sans-serif;
  --credits-title-size: clamp(1.8rem, 4.6vw, 2.9rem);
  --credits-name-size: clamp(1.05rem, 2.7vw, 1.6rem);
  --credits-flourish-title-size: clamp(2.6rem, 8.5vw, 5.4rem);
  --credits-block-gap: 5rem;
  --credits-name-gap: 0.55rem;
  --credits-shadow: 0 2px 12px rgba(11, 3, 9, 0.85);
  /* Glow no-op — NEVER "none": the base composes
     "text-shadow: var(--credits-glow), var(--credits-shadow)" and a "none"
     in a shadow list invalidates the whole declaration. Glow here is bespoke. */
  --credits-glow: 0 0 0 rgba(0, 0, 0, 0);
}

/* Scenery is full-bleed: drop the base edge-fade on html ONLY; body keeps
   the base mask so names still ease in/out at the edges. */
html { -webkit-mask-image: none; mask-image: none; }
body { background: transparent; }

/* ---- checkered dance floor: perspective plane in the bottom ~28vh only.
   STATIC — the 3D transform is its compositor promotion. Squares are 96px
   (coarse per the flicker law) and the top fade swallows the perspective-
   compressed rows near the horizon so no fine pattern reaches the lane.
   Near rows warm up (orange/pink wash) as if lit by the rail + ball. ---- */
html::before {
  content: "";
  display: var(--roller-disco-scenery, block);
  position: fixed;
  left: -55vw;
  right: -55vw;
  top: 72vh;
  height: 65vh;
  z-index: -1;
  pointer-events: none;
  transform-origin: top center;
  transform: perspective(430px) rotateX(55deg);
  background:
    linear-gradient(180deg, #14060f 0%, rgba(20, 6, 15, 0.9) 7%, rgba(20, 6, 15, 0.45) 20%, rgba(20, 6, 15, 0) 50%),
    linear-gradient(0deg, rgba(255, 128, 64, 0.16) 0%, rgba(255, 45, 149, 0.1) 20%, rgba(255, 45, 149, 0) 52%),
    radial-gradient(ellipse 42% 60% at 50% 26%, rgba(255, 214, 240, 0.12) 0%, rgba(255, 214, 240, 0) 72%),
    radial-gradient(circle at 22% 74%, rgba(255, 236, 250, 0.22) 0 6px, rgba(255, 236, 250, 0) 15px),
    radial-gradient(circle at 78% 66%, rgba(255, 210, 63, 0.2) 0 5px, rgba(255, 210, 63, 0) 13px),
    radial-gradient(circle at 55% 88%, rgba(255, 45, 149, 0.22) 0 6px, rgba(255, 45, 149, 0) 16px),
    radial-gradient(circle at 40% 56%, rgba(224, 192, 255, 0.16) 0 4px, rgba(224, 192, 255, 0) 11px),
    radial-gradient(circle at 88% 82%, rgba(255, 236, 250, 0.18) 0 5px, rgba(255, 236, 250, 0) 14px),
    radial-gradient(circle at 12% 90%, rgba(255, 210, 63, 0.16) 0 5px, rgba(255, 210, 63, 0) 13px),
    repeating-conic-gradient(#2e1038 0% 25%, #481646 25% 50%) 0 0 / 96px 96px #1e0a24;
}

/* ---- MIRROR BALL, top-center: ONE static promoted layer. border-radius
   clips every gradient to the sphere (the old build drew facets on an
   unrounded box — never again). Volume = specular upper-left fading to a
   deep plum lower-right; facets = two SOFT repeating gradients (18px cycle,
   1px core with 4px shoulders, low alpha); crisp specular dot + two colored
   glints on top. The magenta/gold halo is outset box-shadow (paints behind
   the sphere), the shading is inset box-shadow — all static. ---- */
html::after {
  content: "";
  display: var(--roller-disco-scenery, block);
  position: fixed;
  top: 3vh;
  left: 50%;
  width: 150px;
  height: 150px;
  z-index: -1;
  pointer-events: none;
  border-radius: 50%;
  transform: translateX(-50%) translateZ(0); /* cached compositor texture */
  background:
    radial-gradient(circle at 34% 28%, rgba(255, 255, 255, 0.85) 0 4px, rgba(255, 255, 255, 0.35) 7px, rgba(255, 255, 255, 0) 15px),
    radial-gradient(circle at 64% 62%, rgba(255, 45, 149, 0.4) 0 5px, rgba(255, 45, 149, 0) 13px),
    radial-gradient(circle at 38% 72%, rgba(255, 210, 63, 0.38) 0 4px, rgba(255, 210, 63, 0) 11px),
    repeating-linear-gradient(90deg, rgba(246, 238, 255, 0.13) 0 1px, rgba(246, 238, 255, 0) 3px 15px, rgba(246, 238, 255, 0.13) 17px 18px),
    repeating-linear-gradient(0deg, rgba(246, 238, 255, 0.1) 0 1px, rgba(246, 238, 255, 0) 3px 15px, rgba(246, 238, 255, 0.1) 17px 18px),
    radial-gradient(circle at 34% 28%, rgba(255, 248, 255, 0.42) 0%, rgba(224, 192, 255, 0.32) 16%, rgba(160, 120, 210, 0.3) 38%, rgba(96, 60, 140, 0.35) 60%, rgba(46, 20, 72, 0.75) 84%, rgba(32, 12, 52, 0.9) 100%),
    radial-gradient(circle at 62% 68%, #63488c 0%, #422567 52%, #200e38 100%);
  box-shadow:
    0 0 30px 4px rgba(255, 214, 110, 0.14),
    0 0 70px 20px rgba(255, 45, 149, 0.2),
    0 0 150px 62px rgba(123, 47, 191, 0.24),
    inset -20px -26px 36px rgba(14, 4, 24, 0.78),
    inset 12px 14px 28px rgba(255, 240, 255, 0.12);
}

/* ---- floor light pools: 4 LARGE soft radials sweeping VERY slowly.
   Viewport-sized layer, so motion is steps(1, end) — one transform hop
   every 4s (well under the 5 hops/s cap); it holds a cached texture
   between hops. Box overscans 24vw so hops never expose an edge. ---- */
body::before {
  content: "";
  display: var(--roller-disco-scenery, block);
  position: fixed;
  top: 0;
  bottom: 0;
  left: -24vw;
  right: -24vw;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(ellipse 30vw 17vh at 30% 86%, rgba(255, 45, 149, 0.26) 0%, rgba(255, 45, 149, 0) 70%),
    radial-gradient(ellipse 34vw 18vh at 62% 92%, rgba(123, 47, 191, 0.32) 0%, rgba(123, 47, 191, 0) 70%),
    radial-gradient(ellipse 26vw 14vh at 47% 97%, rgba(255, 210, 63, 0.2) 0%, rgba(255, 210, 63, 0) 70%),
    radial-gradient(ellipse 22vw 13vh at 78% 82%, rgba(255, 240, 250, 0.12) 0%, rgba(255, 240, 250, 0) 70%),
    /* AMBIENT MIRROR-BALL GLINTS drifting on the floor: coarse soft discs
       (>=44px cores, big soft falloff) scattered across the lower floor
       (80-98vh), well below the center text lane. They ride this layer's
       steps() drift (1 hop / 4s) so they HOP with the pools, never slide —
       lawful under L6 (coarse soft glints, not fine screen-fixed twinkles). */
    radial-gradient(circle at 18% 90%, rgba(255, 236, 250, 0.5) 0 5px, rgba(255, 236, 250, 0.16) 22px, rgba(255, 236, 250, 0) 40px),
    radial-gradient(circle at 40% 95%, rgba(255, 210, 63, 0.42) 0 4px, rgba(255, 210, 63, 0.14) 20px, rgba(255, 210, 63, 0) 38px),
    radial-gradient(circle at 63% 88%, rgba(255, 45, 149, 0.4) 0 5px, rgba(255, 45, 149, 0.14) 22px, rgba(255, 45, 149, 0) 40px),
    radial-gradient(circle at 82% 94%, rgba(224, 192, 255, 0.42) 0 4px, rgba(224, 192, 255, 0.14) 20px, rgba(224, 192, 255, 0) 36px),
    radial-gradient(circle at 30% 84%, rgba(255, 236, 250, 0.32) 0 4px, rgba(255, 236, 250, 0) 30px),
    radial-gradient(circle at 72% 97%, rgba(255, 210, 63, 0.34) 0 4px, rgba(255, 210, 63, 0) 32px),
    radial-gradient(circle at 52% 92%, rgba(255, 240, 250, 0.3) 0 4px, rgba(255, 240, 250, 0) 30px),
    radial-gradient(circle at 90% 85%, rgba(255, 45, 149, 0.3) 0 4px, rgba(255, 45, 149, 0) 30px);
  animation: roller-disco-pools 32s steps(1, end) infinite;
}

/* ---- the light story, STATIC + promoted: hanging rod (2px strip from
   screen top down to the ball), three wide SOFT shafts fanning down from
   the ball (coarse conic wedges, 5-6% alpha), a bloom around the ball, the
   neon rail where wall meets floor (10px soft-edged core + reflection +
   wall glow — replaces the old hard 2px horizon border), and a readability
   scrim shaped to spare the ball at the top. All coarse, soft, low alpha —
   the only screen-fixed light allowed in the lane. ---- */
body::after {
  content: "";
  display: var(--roller-disco-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background:
    linear-gradient(180deg, rgba(231, 205, 255, 0.06) 0%, rgba(231, 205, 255, 0.4) 62%, rgba(255, 246, 255, 0.75) 100%) 50% 0 / 2px calc(3vh + 5px) no-repeat,
    conic-gradient(from 0deg at 50% calc(3vh + 70px), rgba(255, 210, 63, 0) 146deg, rgba(255, 210, 63, 0.055) 157deg, rgba(255, 210, 63, 0) 168deg, rgba(255, 236, 250, 0) 174deg, rgba(255, 236, 250, 0.06) 182deg, rgba(255, 236, 250, 0) 190deg, rgba(255, 45, 149, 0) 196deg, rgba(255, 45, 149, 0.055) 207deg, rgba(255, 45, 149, 0) 218deg),
    radial-gradient(ellipse 30vw 20vh at 50% calc(3vh + 70px), rgba(255, 230, 250, 0.1) 0%, rgba(255, 45, 149, 0.05) 55%, rgba(255, 45, 149, 0) 78%),
    radial-gradient(circle at 12% 22%, rgba(224, 192, 255, 0.18) 0 7px, rgba(224, 192, 255, 0) 20px),
    radial-gradient(circle at 88% 18%, rgba(255, 236, 250, 0.16) 0 6px, rgba(255, 236, 250, 0) 18px),
    radial-gradient(circle at 6% 44%, rgba(255, 45, 149, 0.15) 0 8px, rgba(255, 45, 149, 0) 22px),
    radial-gradient(circle at 94% 40%, rgba(255, 210, 63, 0.14) 0 7px, rgba(255, 210, 63, 0) 20px),
    radial-gradient(circle at 20% 10%, rgba(255, 236, 250, 0.13) 0 5px, rgba(255, 236, 250, 0) 16px),
    radial-gradient(circle at 80% 52%, rgba(224, 192, 255, 0.14) 0 6px, rgba(224, 192, 255, 0) 18px),
    radial-gradient(circle at 30% 30%, rgba(255, 210, 63, 0.1) 0 5px, rgba(255, 210, 63, 0) 15px),
    radial-gradient(circle at 72% 12%, rgba(255, 45, 149, 0.11) 0 5px, rgba(255, 45, 149, 0) 15px),
    radial-gradient(circle at 90% 60%, rgba(255, 236, 250, 0.1) 0 5px, rgba(255, 236, 250, 0) 15px),
    radial-gradient(ellipse 68% 50% at 50% 6%, rgba(123, 47, 191, 0.2) 0%, rgba(123, 47, 191, 0.06) 46%, rgba(123, 47, 191, 0) 74%),
    linear-gradient(180deg, rgba(255, 45, 149, 0) 0%, rgba(255, 45, 149, 0.5) 30%, rgba(255, 199, 150, 0.85) 50%, rgba(255, 45, 149, 0.5) 70%, rgba(255, 45, 149, 0) 100%) 0 calc(72vh - 5px) / 100% 10px no-repeat,
    linear-gradient(180deg, rgba(255, 45, 149, 0.22) 0%, rgba(255, 45, 149, 0) 100%) 0 calc(72vh + 4px) / 100% 64px no-repeat,
    linear-gradient(180deg, rgba(123, 47, 191, 0) 0%, rgba(123, 47, 191, 0.12) 55%, rgba(255, 45, 149, 0.22) 100%) 0 calc(72vh - 120px) / 100% 115px no-repeat,
    radial-gradient(ellipse 120% 12vh at 50% 70vh, rgba(255, 210, 240, 0.09) 0%, rgba(255, 210, 240, 0) 70%),
    radial-gradient(ellipse 56% 74% at 50% 66%, rgba(13, 4, 12, 0.5) 0%, rgba(13, 4, 12, 0.4) 55%, rgba(13, 4, 12, 0) 80%);
}

/* ---- THE ENSEMBLE: four editorial silhouettes (Soul Train title cards,
   not mascots) — lifted plum figures with one gold rim-light edge each,
   distinct two-color kits, uniform white quad skates with gold wheels,
   baked floor shadow + glow halo + trailing streaks. Each skater pseudo runs
   TWO animations: the 36s glide-path transform (lean rocks, depth scale,
   carve curves) AND a local legcycle that swaps background-image through 4
   stride frames (A push / B gather / C opposite push / D recovery) — the
   blessed small-sprite exception (150px box, ~2.6-2.9 background swaps/s,
   negligible repaint) so the legs pump strokes instead of sliding as one
   frozen pose. The static background-image below is frame B (a clean glide),
   which is also the reduced-motion park pose. All four run on ONE 36s master
   clock, so their crossings are choreography, not chance. Feet-anchor trick:
   top/left offset the 150x203 box so translate3d(Xvw, Yvh) places the
   skates exactly at floor point (X, Y); transform-origin bottom-center
   keeps scale planted on the wheels. Depth = scale synced to Y
   (0.55 far rail .. ~1.05 near lane). z-index 0 lifts the cast above the
   scrim and pools but under the crawl (the roll is a later positioned
   sibling). Facing flips only happen off-screen (teleport keyframes a
   hair apart) or inside Comet's pirouette. ---- */
head { display: var(--roller-disco-scenery, block); }
head meta,
head link { display: var(--roller-disco-scenery, block); } /* void hosts: render nothing */
head::before,
head meta:first-of-type::before,
head meta:last-of-type::before,
head link::before,
head meta:first-of-type::after,
head meta:last-of-type::after,
head link::after {
  content: "";
  display: var(--roller-disco-scenery, block);
  position: fixed;
  top: -203px;
  left: -75px;
  width: 150px;
  height: 203px;
  z-index: 0;
  pointer-events: none;
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: contain;
  transform-origin: 50% 100%;
  /* No blanket will-change here: every skater's translate3d() keyframe already
     forces a compositor layer. To honour L8 (<=3 will-change) with the fuller
     7-skater cast, will-change: transform is re-added on ONLY the three nearest-
     lane hero movers (Duke, Flash, Jinx) in their own rules below. */
}
/* COMET — ponytail, purple wrap top + pink legwarmers, deep crossover
   lean (faces left). Right-to-left sweep, swerve UP at near-miss 1, wide
   left curl, then the 57-62% pirouette flips her to exit stage right. */
head::before {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='66' cy='214' rx='50' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M58 116 L94 122 L90 132 L60 128 Z' fill='%233d1336'/%3E%3Cpath d='M64 124 Q60 150 56 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M58 170 Q57 180 56 190' stroke='%23ff2d95' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M58 170 L56 190' stroke='%23b3186b' stroke-width='6' fill='none' stroke-linecap='round' opacity='.55'/%3E%3Cpath d='M82 126 Q84 152 84 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M84 171 Q84 180.5 84 190' stroke='%23ff2d95' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M84 171 L84 190' stroke='%23b3186b' stroke-width='6' fill='none' stroke-linecap='round' opacity='.55'/%3E%3Cg transform='rotate(-4 56 193)'%3E%3Crect x='43' y='187' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M43 187 L69 187 L69 192 L43 192 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='48' cy='202' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='63' cy='202' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='48' cy='202' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='63' cy='202' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(2 84 193)'%3E%3Crect x='71' y='187' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M71 187 L97 187 L97 192 L71 192 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='76' cy='202' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='91' cy='202' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='76' cy='202' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='91' cy='202' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='70' cy='120' rx='78' ry='98' fill='url(%23g1)'/%3E%3Cpath d='M66 88 Q58 102 69 116 L90 121 Q86 100 76 90 Z' fill='%234a1a42'/%3E%3Cpath d='M66 90 Q58 102 69 116 L86 121 Q82 103 74 93 Z' fill='%237b2fbf'/%3E%3Cpath d='M66 90 Q58 102 69 116 L77 118 Q72 102 69 91 Z' fill='%234e1c7e'/%3E%3Cpath d='M70 112 Q84 108 94 116 L101 130 Q80 137 62 126 Z' fill='%237b2fbf'/%3E%3Cpath d='M82 112 L101 130 Q89 135 77 133 Z' fill='%234e1c7e'/%3E%3Cpath d='M58 94 Q42 100 28 110' stroke='%234a1a42' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='26' cy='111' r='4.5' fill='%234a1a42'/%3E%3Ccircle cx='52' cy='74' r='11.5' fill='%234a1a42'/%3E%3Cpath d='M61 68 Q82 56 104 56 Q88 66 68 78 Z' fill='%233d1336'/%3E%3Cpath d='M102 56 Q114 58 112 68 Q102 64 98 59 Z' fill='%233d1336'/%3E%3Ccircle cx='63' cy='68' r='3' fill='%23ffd23f'/%3E%3Cpath d='M63 64 Q84 54 103 55' stroke='%23ffd23f' stroke-width='1.7' fill='none' stroke-linecap='round' opacity='.85'/%3E%3Cpath d='M46 66 Q41 71 41 79' stroke='%23ffd23f' stroke-width='1.5' fill='none' stroke-linecap='round' opacity='.7'/%3E%3C/svg%3E");
  animation: roller-disco-comet 36s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite, roller-disco-comet-legs 1.40s steps(1, end) infinite;
}
/* ROXY — high bun + scrunchie, teal shorts, tube socks, arms-wide cruise
   (faces right). One long slalom weave, rail-to-lane and back, drifting
   right the whole period: she owns the up/down axis. */
head meta:first-of-type::before {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='86' cy='214' rx='50' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M72 116 L100 118 L98 128 L74 126 Z' fill='%231a9e8b'/%3E%3Cpath d='M78 120 Q74 148 70 190' stroke='%234a1a42' stroke-width='12' fill='none' stroke-linecap='round'/%3E%3Cpath d='M71.33333333333333 176 L70 190' stroke='%23fff3fb' stroke-width='12' fill='none' stroke-linecap='round'/%3E%3Cpath d='M71.33333333333333 176 L70 190' stroke='%232ee6c8' stroke-width='3' fill='none' stroke-linecap='round' opacity='.5'/%3E%3Cpath d='M96 122 Q98 150 98 190' stroke='%234a1a42' stroke-width='12' fill='none' stroke-linecap='round'/%3E%3Cpath d='M98 176.66666666666666 L98 190' stroke='%23fff3fb' stroke-width='12' fill='none' stroke-linecap='round'/%3E%3Cpath d='M98 176.66666666666666 L98 190' stroke='%232ee6c8' stroke-width='3' fill='none' stroke-linecap='round' opacity='.5'/%3E%3Cg transform='rotate(-4 70 193)'%3E%3Crect x='56.5' y='187' width='27' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M56.5 187 L83.5 187 L83.5 192 L56.5 192 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='61.5' cy='202' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='77.5' cy='202' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='61.5' cy='202' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='77.5' cy='202' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(2 98 193)'%3E%3Crect x='84.5' y='187' width='27' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M84.5 187 L111.5 187 L111.5 192 L84.5 192 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='89.5' cy='202' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='105.5' cy='202' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='89.5' cy='202' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='105.5' cy='202' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='88' cy='120' rx='78' ry='98' fill='url(%23g1)'/%3E%3Cpath d='M97 60 Q103 84 93 108 L75 106 Q79 82 85 60 Z' fill='%234a1a42'/%3E%3Cpath d='M97 60 Q101 74 98 88 L78 86 Q81 72 85 62 Z' fill='%23fff3fb'/%3E%3Cpath d='M97 60 Q101 74 98 88 L90 87 Q94 72 92 61 Z' fill='%23d9c3d3'/%3E%3Cpath d='M78 86 L98 88' stroke='%232ee6c8' stroke-width='2.5'/%3E%3Cpath d='M74 100 L98 102 L100 120 L72 118 Z' fill='%232ee6c8'/%3E%3Cpath d='M88 101 L98 102 L100 120 L90 119 Z' fill='%231a9e8b'/%3E%3Cpath d='M95 66 Q120 62 141 56' stroke='%234a1a42' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='143' cy='55' r='4.5' fill='%234a1a42'/%3E%3Cpath d='M86 66 Q64 70 44 76' stroke='%2335102f' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='42' cy='77' r='4.5' fill='%2335102f'/%3E%3Ccircle cx='97' cy='32' r='11.5' fill='%234a1a42'/%3E%3Ccircle cx='100' cy='13' r='7.5' fill='%233d1336'/%3E%3Cellipse cx='99' cy='20.5' rx='5.5' ry='2.6' fill='%23ffd23f'/%3E%3Cpath d='M96 63 Q120 59 142 53' stroke='%23ffd23f' stroke-width='1.7' fill='none' stroke-linecap='round' opacity='.9'/%3E%3Cpath d='M94 8 Q101 4 106 10' stroke='%23ffd23f' stroke-width='1.7' fill='none' stroke-linecap='round' opacity='.8'/%3E%3C/svg%3E");
  animation: roller-disco-roxy 36s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite, roller-disco-roxy-legs 1.52s steps(1, end) infinite;
}
/* FLASH — headband + gold windbreaker, purple pants, open palm already up
   (faces left). Near-lane laps right-to-left; second lap he arrives on the
   beat for the 50% high-five, then a far-rail pass for near-miss 2. */
head meta:last-of-type::before {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='58' cy='214' rx='50' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M50 112 L74 114 L72 124 L52 122 Z' fill='%234e1c7e'/%3E%3Cpath d='M56 118 Q52 146 48 188' stroke='%237b2fbf' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M56 118 Q52 146 50 167' stroke='%234e1c7e' stroke-width='5' fill='none' stroke-linecap='round' opacity='.7'/%3E%3Cpath d='M72 120 Q74 148 74 190' stroke='%237b2fbf' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M72 120 Q74 148 74 169' stroke='%234e1c7e' stroke-width='5' fill='none' stroke-linecap='round' opacity='.7'/%3E%3Cg transform='rotate(-4 48 191)'%3E%3Crect x='34.5' y='185' width='27' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M34.5 185 L61.5 185 L61.5 190 L34.5 190 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='39.5' cy='200' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='55.5' cy='200' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='39.5' cy='200' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='55.5' cy='200' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(2 74 193)'%3E%3Crect x='60.5' y='187' width='27' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M60.5 187 L87.5 187 L87.5 192 L60.5 192 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='65.5' cy='202' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='81.5' cy='202' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='65.5' cy='202' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='81.5' cy='202' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='60' cy='118' rx='78' ry='98' fill='url(%23g1)'/%3E%3Cpath d='M68 62 Q76 92 72 116 L50 114 Q50 88 54 64 Z' fill='%23ffd23f'/%3E%3Cpath d='M68 62 Q76 92 72 116 L62 115 Q64 88 61 63 Z' fill='%23c99a1f'/%3E%3Cpath d='M59 64 L61 114' stroke='%232b0d24' stroke-width='1.5'/%3E%3Cpath d='M50 110 L72 112 L72 118 L50 116 Z' fill='%237b2fbf'/%3E%3Cpath d='M51 86 L72 88' stroke='%237b2fbf' stroke-width='4'/%3E%3Cpath d='M54 68 Q38 58 27 42' stroke='%23ffd23f' stroke-width='11' fill='none' stroke-linecap='round'/%3E%3Cpath d='M31 48 Q29 45 27 42' stroke='%237b2fbf' stroke-width='11' fill='none' stroke-linecap='round'/%3E%3Cellipse cx='23' cy='32' rx='5.5' ry='7' fill='%234a1a42' transform='rotate(-30 23 32)'/%3E%3Cpath d='M18 37 L14 33' stroke='%234a1a42' stroke-width='3.4' fill='none' stroke-linecap='round'/%3E%3Cpath d='M66 68 Q80 88 88 102' stroke='%23c99a1f' stroke-width='10' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='91' cy='107' r='4.5' fill='%234a1a42'/%3E%3Ccircle cx='62' cy='38' r='12' fill='%234a1a42'/%3E%3Ccircle cx='56' cy='28' r='7' fill='%233d1336'/%3E%3Ccircle cx='66' cy='26' r='7.5' fill='%233d1336'/%3E%3Ccircle cx='74' cy='33' r='6' fill='%233d1336'/%3E%3Cpath d='M50 36 Q62 30 75 35 L75 40 Q62 35 50 41 Z' fill='%23fff3fb'/%3E%3Cpath d='M75 37 Q84 34 88 30' stroke='%23fff3fb' stroke-width='3' fill='none' stroke-linecap='round'/%3E%3Cpath d='M52 64 Q37 55 26 39' stroke='%23fff0b0' stroke-width='1.6' fill='none' stroke-linecap='round' opacity='.9'/%3E%3C/svg%3E");
  animation: roller-disco-flash 36s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite, roller-disco-flash-legs 1.36s steps(1, end) infinite;
  will-change: transform; /* 1 of the 3 promoted hero movers (L8 cap) */
}
/* DUKE — afro + gold shirt + hot-pink flares, disco point held high
   (faces right). The hero lap: enters low-left, swings through both
   beats (near-miss 1, the 50% high-five), exits far-right, sits out the
   last fifth of the clock — the rink breathes. */
head link::before {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='84' cy='214' rx='44' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M74 122 L102 124 L100 134 L76 132 Z' fill='%23b3186b'/%3E%3Cpath d='M78 124 Q74 152 70 192' stroke='%23b3186b' stroke-width='15' fill='none' stroke-linecap='round'/%3E%3Cpath d='M78 124 Q74 152 72 172' stroke='%23d94c8f' stroke-width='3.5' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cpath d='M96 126 Q98 152 98 192' stroke='%23ff2d95' stroke-width='15' fill='none' stroke-linecap='round'/%3E%3Cpath d='M96 126 Q98 152 98 172' stroke='%23ff5aad' stroke-width='3.5' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cg transform='rotate(-4 68 195)'%3E%3Crect x='55' y='189' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M55 189 L81 189 L81 194 L55 194 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='60' cy='204' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='75' cy='204' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='60' cy='204' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='75' cy='204' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(2 98 195)'%3E%3Crect x='85' y='189' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M85 189 L111 189 L111 194 L85 194 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='90' cy='204' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='105' cy='204' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='90' cy='204' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='105' cy='204' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='88' cy='120' rx='80' ry='102' fill='url(%23g1)'/%3E%3Cpath d='M100 62 Q110 92 96 118 L76 116 Q80 88 90 66 Z' fill='%234a1a42'/%3E%3Cpath d='M100 64 Q107 88 97 110 L79 108 Q83 86 90 68 Z' fill='%23ffd23f'/%3E%3Cpath d='M100 64 Q107 88 97 110 L89 109 Q95 86 93 66 Z' fill='%23c99a1f'/%3E%3Cpath d='M76 110 L100 112 L102 128 L74 126 Z' fill='%23ff2d95'/%3E%3Cpath d='M97 68 Q116 58 129 44' stroke='%234a1a42' stroke-width='10' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='131' cy='42' r='5' fill='%234a1a42'/%3E%3Cpath d='M132 40 L136 31' stroke='%234a1a42' stroke-width='3.4' fill='none' stroke-linecap='round'/%3E%3Cpath d='M90 72 Q72 90 58 102' stroke='%2335102f' stroke-width='10' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='56' cy='104' r='4.5' fill='%2335102f'/%3E%3Ccircle cx='100' cy='40' r='12.5' fill='%234a1a42'/%3E%3Ccircle cx='88' cy='30' r='9' fill='%233d1336'/%3E%3Ccircle cx='95' cy='21' r='10' fill='%233d1336'/%3E%3Ccircle cx='107' cy='20' r='9.5' fill='%233d1336'/%3E%3Ccircle cx='117' cy='28' r='9' fill='%233d1336'/%3E%3Ccircle cx='119' cy='39' r='8' fill='%233d1336'/%3E%3Ccircle cx='86' cy='42' r='7' fill='%233d1336'/%3E%3Cpath d='M99 65 Q117 55 130 41' stroke='%23ffd23f' stroke-width='1.7' fill='none' stroke-linecap='round' opacity='.9'/%3E%3Cpath d='M90 17 Q105 10 118 25' stroke='%23ffd23f' stroke-width='1.8' fill='none' stroke-linecap='round' opacity='.75'/%3E%3Cpath d='M101 66 Q108 90 98 112' stroke='%23ffd23f' stroke-width='1.5' fill='none' stroke-linecap='round' opacity='.6'/%3E%3C/svg%3E");
  animation: roller-disco-duke 36s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite, roller-disco-duke-legs 1.44s steps(1, end) infinite;
  will-change: transform; /* 2 of the 3 promoted hero movers (L8 cap) */
}
/* NOVA — side bob, hot-pink crop top + teal shorts, lead arm out for the
   spin (faces right). Mid-lane cruiser: joins the conga train early, then
   ORBITS Rico at t=38 (spin-around-a-partner), slaps Jinx at t=68, and
   closes on a side-by-side glide with Jinx at t=90. */
head meta:first-of-type::after {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='80' cy='214' rx='50' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M78 120 Q74 150 72 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M72.3 170.4 L72 190' stroke='%232ee6c8' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M78 120 Q74 150 73.0 170.0' stroke='%2359f0d8' stroke-width='4' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cpath d='M96 120 Q100 150 100 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M100.0 170.4 L100 190' stroke='%232ee6c8' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M96 120 Q100 150 100.0 170.0' stroke='%2359f0d8' stroke-width='4' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cg transform='rotate(-4 72 195)'%3E%3Crect x='59.0' y='189.0' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M59.0 189.0 L85.0 189.0 L85.0 194.0 L59.0 194.0 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='64.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='80.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='64.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='80.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(2 100 195)'%3E%3Crect x='87.0' y='189.0' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M87.0 189.0 L113.0 189.0 L113.0 194.0 L87.0 194.0 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='92.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='108.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='92.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='108.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='88' cy='120' rx='78' ry='98' fill='url(%23g1)'/%3E%3Cpath d='M92 66 Q100 88 96 108 L76 106 Q78 84 84 64 Z' fill='%23ff2d95'/%3E%3Cpath d='M92 66 Q98 82 96 100 L86 99 Q88 82 88 66 Z' fill='%23b3186b'/%3E%3Cpath d='M76 104 L98 106 L100 122 L74 120 Z' fill='%232ee6c8'/%3E%3Cpath d='M88 105 L98 106 L100 122 L90 121 Z' fill='%231a9e8b'/%3E%3Cpath d='M77 101 L97 103' stroke='%23c99a1f' stroke-width='0' /%3E%3Cpath d='M84 72 Q66 82 52 96' stroke='%2335102f' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='50' cy='98' r='4.5' fill='%2335102f'/%3E%3Cpath d='M94 70 Q116 66 136 72' stroke='%234a1a42' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='138' cy='73' r='4.8' fill='%234a1a42'/%3E%3Ccircle cx='92' cy='42' r='11.5' fill='%234a1a42'/%3E%3Cpath d='M83 40 Q80 26 92 24 Q104 26 101 42 Q96 34 88 34 Z' fill='%233d1336'/%3E%3Cpath d='M101 40 Q108 44 108 54 Q101 50 100 44 Z' fill='%233d1336'/%3E%3Cpath d='M93 66 Q99 84 96 104' stroke='%23ff8fc4' stroke-width='1.6' fill='none' stroke-linecap='round' opacity='.6'/%3E%3Cpath d='M85 26 Q92 22 100 27' stroke='%23ffd23f' stroke-width='1.6' fill='none' stroke-linecap='round' opacity='.7'/%3E%3Cpath d='M95 68 Q116 64 135 70' stroke='%23ffd23f' stroke-width='1.5' fill='none' stroke-linecap='round' opacity='.6'/%3E%3C/svg%3E");
  animation: roller-disco-nova 36s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite, roller-disco-nova-legs 1.48s steps(1, end) infinite;
}
/* RICO — beanie + purple tank + gold shorts, arms pumping (faces left).
   The conga anchor: heads the 3-skater train (t=6-16), holds a straight
   glide while Nova orbits him at t=38, then rushes the double-swerve
   near-collision with Jinx at t=75 (both fling up, whoa, swerve apart). */
head meta:last-of-type::after {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='68' cy='214' rx='50' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M58 120 Q54 150 52 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M52.3 169.0 L52 190' stroke='%237b2fbf' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M58 120 Q54 150 53.0 170.0' stroke='%23a259e0' stroke-width='4' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cpath d='M76 120 Q80 150 80 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M80.0 169.0 L80 190' stroke='%237b2fbf' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M76 120 Q80 150 80.0 170.0' stroke='%23a259e0' stroke-width='4' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cg transform='rotate(-4 52 195)'%3E%3Crect x='39.0' y='189.0' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M39.0 189.0 L65.0 189.0 L65.0 194.0 L39.0 194.0 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='44.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='60.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='44.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='60.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(2 80 195)'%3E%3Crect x='67.0' y='189.0' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M67.0 189.0 L93.0 189.0 L93.0 194.0 L67.0 194.0 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='72.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='88.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='72.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='88.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='68' cy='120' rx='78' ry='98' fill='url(%23g1)'/%3E%3Cpath d='M60 64 Q52 88 58 108 L80 106 Q76 84 72 64 Z' fill='%237b2fbf'/%3E%3Cpath d='M60 64 Q54 84 58 104 L68 103 Q64 84 66 64 Z' fill='%234e1c7e'/%3E%3Cpath d='M58 104 L80 106 L82 122 L56 120 Z' fill='%23ffd23f'/%3E%3Cpath d='M58 104 L68 105 L70 121 L56 120 Z' fill='%23c99a1f'/%3E%3Cpath d='M66 70 Q50 66 40 52' stroke='%234a1a42' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='38' cy='50' r='4.8' fill='%234a1a42'/%3E%3Cpath d='M74 72 Q92 80 104 92' stroke='%2335102f' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='106' cy='94' r='4.5' fill='%2335102f'/%3E%3Ccircle cx='62' cy='42' r='11.5' fill='%234a1a42'/%3E%3Cpath d='M50 40 Q52 26 62 25 Q73 26 74 40 Z' fill='%23ff2d95'/%3E%3Cpath d='M50 39 L74 39 L74 44 L50 44 Z' fill='%23b3186b'/%3E%3Ccircle cx='62' cy='24' r='3' fill='%23ffd23f'/%3E%3Cpath d='M59 66 Q54 86 58 104' stroke='%23a259e0' stroke-width='1.6' fill='none' stroke-linecap='round' opacity='.55'/%3E%3Cpath d='M52 40 Q62 36 72 40' stroke='%23ff8fc4' stroke-width='1.5' fill='none' stroke-linecap='round' opacity='.6'/%3E%3Cpath d='M67 72 Q90 80 103 91' stroke='%23ffd23f' stroke-width='1.4' fill='none' stroke-linecap='round' opacity='.5'/%3E%3C/svg%3E");
  animation: roller-disco-rico 36s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite, roller-disco-rico-legs 1.56s steps(1, end) infinite;
}
/* JINX — twin buns + gold bomber + hot-pink leggings, both arms up (faces
   right). The live wire: tails the conga train, HIGH-FIVES Nova at t=68,
   the whoa double-swerve with Rico at t=75, then the synchronized
   side-by-side with Nova at t=90. Nearest-lane hero (3rd promoted mover). */
head link::after {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='84' cy='214' rx='48' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M76 122 Q72 150 70 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M70.3 171.0 L70 190' stroke='%23ff2d95' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M76 122 Q72 150 71.0 170.0' stroke='%23ff8fc4' stroke-width='4' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cpath d='M94 122 Q98 150 98 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M98.0 171.0 L98 190' stroke='%23ff2d95' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M94 122 Q98 150 98.0 170.0' stroke='%23ff8fc4' stroke-width='4' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cg transform='rotate(-4 70 195)'%3E%3Crect x='57.0' y='189.0' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M57.0 189.0 L83.0 189.0 L83.0 194.0 L57.0 194.0 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='62.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='78.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='62.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='78.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(2 98 195)'%3E%3Crect x='85.0' y='189.0' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M85.0 189.0 L111.0 189.0 L111.0 194.0 L85.0 194.0 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='90.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='106.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='90.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='106.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='88' cy='120' rx='78' ry='98' fill='url(%23g1)'/%3E%3Cpath d='M92 64 Q102 88 96 110 L74 108 Q78 86 84 64 Z' fill='%23ffd23f'/%3E%3Cpath d='M92 64 Q100 84 96 104 L86 103 Q88 84 88 64 Z' fill='%23c99a1f'/%3E%3Cpath d='M60 64 L61 108' stroke='%232b0d24' stroke-width='1.2'/%3E%3Cpath d='M74 104 L96 106 L96 112 L74 110 Z' fill='%23c99a1f'/%3E%3Cpath d='M84 68 Q72 52 66 34' stroke='%234a1a42' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='65' cy='31' r='4.8' fill='%234a1a42'/%3E%3Cpath d='M94 68 Q110 54 118 38' stroke='%234a1a42' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='120' cy='35' r='4.8' fill='%234a1a42'/%3E%3Ccircle cx='90' cy='44' r='11.5' fill='%234a1a42'/%3E%3Ccircle cx='78' cy='34' r='6.5' fill='%233d1336'/%3E%3Ccircle cx='102' cy='34' r='6.5' fill='%233d1336'/%3E%3Cellipse cx='78' cy='34' rx='3' ry='2' fill='%23ff2d95'/%3E%3Cellipse cx='102' cy='34' rx='3' ry='2' fill='%23ff2d95'/%3E%3Cpath d='M93 66 Q101 86 96 106' stroke='%23fff0b0' stroke-width='1.6' fill='none' stroke-linecap='round' opacity='.6'/%3E%3Cpath d='M84 26 Q90 22 96 26' stroke='%23ffd23f' stroke-width='1.5' fill='none' stroke-linecap='round' opacity='.6'/%3E%3C/svg%3E");
  animation: roller-disco-jinx 36s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite, roller-disco-jinx-legs 1.42s steps(1, end) infinite;
  will-change: transform; /* 3 of the 3 promoted hero movers (L8 cap) */
}
/* ---- INTERACTION SPARKLE BURST: one tiny promoted pseudo that TELEPORTS to
   each staged meeting point on the shared 36s clock and pops a juicy multi-
   point gold/pink/white star-burst (soft coarse halo + 12-pt corona + light
   shafts + satellite sparks). Because it rides steps() opacity + transform
   (teleport while invisible, brief scale-pop on the beat), one layer serves
   every interaction and the flash ALWAYS lands on the slap. It fires on the
   FLOOR/lower third (72-90vh), off the center text lane, and its points sit on
   a soft >=40px halo — a lawful glint, not a screen-fixed fine twinkle (L6). ---- */
head::after {
  content: "";
  display: var(--roller-disco-scenery, block);
  position: fixed;
  left: 0;
  top: 0;
  width: 160px;
  height: 160px;
  margin: -80px 0 0 -80px;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  transform: translate3d(62vw, 84vh, 0) scale(0.4);
  transform-origin: 50% 50%;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='h' cx='.5' cy='.5' r='.5'%3E%3Cstop offset='0' stop-color='%23fff3fb' stop-opacity='.9'/%3E%3Cstop offset='.28' stop-color='%23ffd23f' stop-opacity='.5'/%3E%3Cstop offset='.6' stop-color='%23ff2d95' stop-opacity='.22'/%3E%3Cstop offset='1' stop-color='%23ff2d95' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='80' cy='80' r='78' fill='url(%23h)'/%3E%3Cpath d='M80 80 L154.0 80.0' stroke='%23ffe98a' stroke-width='7' stroke-linecap='round' opacity='.55'/%3E%3Cpath d='M80 80 L116.8 116.8' stroke='%23ffe98a' stroke-width='4' stroke-linecap='round' opacity='.55'/%3E%3Cpath d='M80 80 L80.0 154.0' stroke='%23ffe98a' stroke-width='7' stroke-linecap='round' opacity='.55'/%3E%3Cpath d='M80 80 L43.2 116.8' stroke='%23ffe98a' stroke-width='4' stroke-linecap='round' opacity='.55'/%3E%3Cpath d='M80 80 L6.0 80.0' stroke='%23ffe98a' stroke-width='7' stroke-linecap='round' opacity='.55'/%3E%3Cpath d='M80 80 L43.2 43.2' stroke='%23ffe98a' stroke-width='4' stroke-linecap='round' opacity='.55'/%3E%3Cpath d='M80 80 L80.0 6.0' stroke='%23ffe98a' stroke-width='7' stroke-linecap='round' opacity='.55'/%3E%3Cpath d='M80 80 L116.8 43.2' stroke='%23ffe98a' stroke-width='4' stroke-linecap='round' opacity='.55'/%3E%3Cpath d='M80.0 20.0 L85.7 58.7 L110.0 28.0 L95.6 64.4 L132.0 50.0 L101.3 74.3 L140.0 80.0 L101.3 85.7 L132.0 110.0 L95.6 95.6 L110.0 132.0 L85.7 101.3 L80.0 140.0 L74.3 101.3 L50.0 132.0 L64.4 95.6 L28.0 110.0 L58.7 85.7 L20.0 80.0 L58.7 74.3 L28.0 50.0 L64.4 64.4 L50.0 28.0 L74.3 58.7 Z' fill='%23ffd23f' opacity='.92'/%3E%3Cpath d='M93.0 48.6 L88.5 71.5 L111.4 67.0 L92.0 80.0 L111.4 93.0 L88.5 88.5 L93.0 111.4 L80.0 92.0 L67.0 111.4 L71.5 88.5 L48.6 93.0 L68.0 80.0 L48.6 67.0 L71.5 71.5 L67.0 48.6 L80.0 68.0 Z' fill='%23fff3fb'/%3E%3Cpath d='M94.1 65.9 L86.0 80.0 L94.1 94.1 L80.0 86.0 L65.9 94.1 L74.0 80.0 L65.9 65.9 L80.0 74.0 Z' fill='%23ff2d95'/%3E%3Ccircle cx='80' cy='80' r='7' fill='%23ffffff'/%3E%3Cpath d='M130.0 33.0 L132.5 39.5 L139.0 42.0 L132.5 44.5 L130.0 51.0 L127.5 44.5 L121.0 42.0 L127.5 39.5 Z' fill='%23ff2d95' opacity='0.9'/%3E%3Cpath d='M34.0 43.0 L36.0 48.0 L41.0 50.0 L36.0 52.0 L34.0 57.0 L32.0 52.0 L27.0 50.0 L32.0 48.0 Z' fill='%23ffd23f' opacity='0.9'/%3E%3Cpath d='M120.0 116.0 L122.3 121.7 L128.0 124.0 L122.3 126.3 L120.0 132.0 L117.7 126.3 L112.0 124.0 L117.7 121.7 Z' fill='%23fff3fb' opacity='0.9'/%3E%3Cpath d='M40.0 114.0 L41.7 118.3 L46.0 120.0 L41.7 121.7 L40.0 126.0 L38.3 121.7 L34.0 120.0 L38.3 118.3 Z' fill='%23ff2d95' opacity='0.9'/%3E%3Cpath d='M82.0 8.0 L83.7 12.3 L88.0 14.0 L83.7 15.7 L82.0 20.0 L80.3 15.7 L76.0 14.0 L80.3 12.3 Z' fill='%23fff3fb' opacity='0.9'/%3E%3Cpath d='M16.0 78.0 L17.7 82.3 L22.0 84.0 L17.7 85.7 L16.0 90.0 L14.3 85.7 L10.0 84.0 L14.3 82.3 Z' fill='%23ffd23f' opacity='0.9'/%3E%3C/svg%3E") center / contain no-repeat;
  animation: roller-disco-hifive 36s steps(1, end) infinite;
}

/* ---- disco dust: the ONLY fine pattern, so it RIDES THE ROLL (moves with
   the tracked text = zero relative slide, zero flicker). Static, over-ink. ---- */
.credits-roll::before,
.credits-slideshow::before {
  content: "";
  display: var(--roller-disco-scenery, block);
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  opacity: 0.45;
  background-image:
    radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.85) 0 1px, rgba(255, 255, 255, 0) 2px),
    radial-gradient(circle at 70% 20%, rgba(255, 210, 63, 0.75) 0 1px, rgba(255, 210, 63, 0) 2px),
    radial-gradient(circle at 15% 80%, rgba(255, 45, 149, 0.7) 0 1px, rgba(255, 45, 149, 0) 2px);
  background-size: 270px 270px, 210px 210px, 330px 330px;
}

/* ---- titles: fat funky Righteous (400 only — never faux-bold it),
   gold with the hot-pink offset shadow. Static. ---- */
.credits-block__title {
  font-weight: 400;
  letter-spacing: 0.1em;
  color: var(--roller-disco-gold);
  text-shadow: 0.05em 0.05em 0 var(--roller-disco-pink), 0.1em 0.1em 0 rgba(123, 47, 191, 0.55), 0 4px 18px rgba(11, 3, 9, 0.85);
  transform: rotate(-1.5deg);
}
.credits-block__title::after {
  width: min(240px, 55vw);
  height: 4px;
  border-radius: 999px;
  opacity: 1;
  margin: 0.7rem auto 0;
  background: linear-gradient(90deg, rgba(255, 45, 149, 0), var(--roller-disco-pink) 22%, var(--roller-disco-gold) 50%, var(--roller-disco-pink) 78%, rgba(255, 45, 149, 0));
  box-shadow: 0 0 14px rgba(255, 45, 149, 0.5); /* static glow */
}

/* ---- rows: centered, amounts flanked by sparkles. Names never clip. ---- */
.credit {
  font-weight: 600;
  letter-spacing: 0.04em;
}
.credit__name {
  min-width: 0;
  overflow-wrap: anywhere;
  color: var(--roller-disco-cream);
  text-shadow: 0 0 14px rgba(255, 45, 149, 0.3), 0 2px 10px rgba(11, 3, 9, 0.8);
}
.credit__amount {
  opacity: 1;
  font-weight: 700;
  color: var(--roller-disco-gold);
  text-shadow: 0 0 12px rgba(255, 210, 63, 0.35), 0 2px 10px rgba(11, 3, 9, 0.8);
}
.credit__amount::before,
.credit__amount::after {
  content: " ✦ ";
  font-weight: 500;
  color: var(--roller-disco-pink);
}

/* ---- flourish cards ---- */
.flourish__title {
  font-weight: 400;
  letter-spacing: 0.07em;
  line-height: 1.05;
  color: var(--roller-disco-gold);
  text-shadow: 0.045em 0.045em 0 var(--roller-disco-pink), 0.09em 0.09em 0 rgba(123, 47, 191, 0.5), 0 6px 26px rgba(11, 3, 9, 0.8);
}
.flourish--intro .flourish__title { transform: rotate(-2deg); } /* streamer copy: restyle only */

/* intro composition: the ball + halo own the top of the frame, so the
   badge/title/tagline/rating group sits in the middle-lower third with a
   slightly tightened vertical rhythm (rating gets extra air). */
.flourish--intro {
  padding-top: 24vh;
  gap: 1.1rem;
}
.flourish--intro .flourish__tagline { margin-top: 0.3rem; }
.flourish--intro .flourish__rating { margin-top: 1.1rem; }

/* badge -> rink marquee pill (copy swap via font-size:0 + ::after) */
.flourish__badge { font-size: 0; border: 0; padding: 0; box-shadow: none; }
.flourish__badge::after {
  content: "✦ ALL SKATE ✦";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.42em;
  padding: 0.55rem 1.2rem 0.55rem 1.62rem;
  color: var(--roller-disco-gold);
  border: 3px dotted rgba(255, 210, 63, 0.75); /* marquee bulbs — static */
  border-radius: 999px;
  background: rgba(123, 47, 191, 0.18);
  box-shadow: 0 0 18px rgba(255, 45, 149, 0.3);
}

/* tagline is streamer copy: restyle only */
.flourish__tagline {
  font-style: normal;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-size: 0.95rem;
  color: #f0c8ff;
  opacity: 0.92;
}

/* rating -> rink rules chip (copy swap) */
.flourish__rating { font-size: 0; border: 0; padding: 0; opacity: 1; }
.flourish__rating::after {
  content: "8 WHEELS — NO BRAKES";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 0.32em;
  padding: 0.35rem 0.6rem 0.35rem 0.92rem;
  color: var(--roller-disco-pink);
  border: 1px solid rgba(255, 45, 149, 0.6);
  border-radius: 4px;
  text-shadow: 0 0 10px rgba(255, 45, 149, 0.5);
}

/* outro: The End -> LAST SKATE (copy swap; shadow redeclared in em on the
   ::after because the parent's em-based shadow computes to 0 at font-size:0) */
.flourish--outro .flourish__title { font-size: 0; }
.flourish--outro .flourish__title::after {
  content: "LAST SKATE";
  font-family: var(--credits-title-font);
  font-weight: 400;
  font-size: var(--credits-flourish-title-size);
  letter-spacing: 0.09em;
  color: var(--roller-disco-gold);
  text-shadow: 0.045em 0.045em 0 var(--roller-disco-pink), 0.09em 0.09em 0 rgba(123, 47, 191, 0.5), 0 6px 26px rgba(11, 3, 9, 0.8);
}
.flourish--outro .flourish__tagline { font-size: 0; }
.flourish--outro .flourish__tagline::after {
  content: "✦ take it home ✦";
  font-size: 1rem;
  letter-spacing: 0.3em;
  text-transform: none;
  color: #f0c8ff;
}

/* ---- raid finale: the skate train rolls in. Colorway flips pink-on-gold
   and the title gets a low-rate steps() opacity strobe (about 1.7 paints/s
   — the only animation inside the roll, siren-style). ---- */
.credits-block:nth-last-of-type(2) .credits-block__title,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
  color: var(--roller-disco-pink);
  text-shadow: 0.05em 0.05em 0 var(--roller-disco-gold), 0.1em 0.1em 0 rgba(123, 47, 191, 0.6), 0 4px 18px rgba(11, 3, 9, 0.85);
  animation: roller-disco-spotlight 2.4s steps(1, end) infinite;
}
.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  content: "✦ SKATE TRAIN ✦";
  display: block;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.78rem;
  letter-spacing: 0.5em;
  margin-bottom: 0.7rem;
  color: var(--roller-disco-gold);
  text-shadow: 0 0 12px rgba(255, 210, 63, 0.5);
}
.credits-block:nth-last-of-type(2) .credits-block__title::after,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::after {
  box-shadow: 0 0 22px rgba(255, 45, 149, 0.85), 0 0 40px rgba(255, 210, 63, 0.4); /* hotter, static */
}
.credits-block:nth-last-of-type(2) .credit,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit {
  font-size: calc(var(--credits-name-size) * 1.1);
}
.credits-block:nth-last-of-type(2) .credit__name,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__name {
  text-shadow: 0 0 16px rgba(255, 45, 149, 0.55), 0 2px 10px rgba(11, 3, 9, 0.8);
}

/* ---- slideshow: bouncy zoom-pop layered on the base fade ---- */
.credits-slide {
  transform: scale(0.955);
  transition: opacity 0.8s ease, transform 0.9s cubic-bezier(0.22, 1.4, 0.36, 1);
}
.credits-slide.is-active { transform: scale(1); }

/* ---- keyframes (all roller-disco- prefixed; transform/opacity ONLY) ----
   THE ROUTINE — one 36s master clock, four paths, every beat staged:
   sine-ish easing per segment reads as push-glide strides. All flips
   (scaleX sign changes) happen off-screen via paired keyframes 0.01%
   apart (a sub-frame teleport), except Comet's on-floor pirouette where
   the flip IS the choreography. Loop-closed: 0% state == 100% state. */
/* DUKE: in low-left -> deep near-lane swing across the LEFT THIRD (the
   text column never hides his beats) -> near-miss 1 at 25% (27vw — Comet
   cuts behind his shoulders, both lean apart) -> long ease up-floor,
   swing-set, HIGH-FIVE at 50% at 62vw (right of the name column) -> push
   out far-right by 80% -> off-screen breather until the next song. */
@keyframes roller-disco-duke {
  0%     { transform: translate3d(-7vw, 82vh, 0) rotate(2deg) scale(0.87); }
  7%     { transform: translate3d(5vw, 87vh, 0) rotate(5deg) scale(0.96); }
  13%    { transform: translate3d(13vw, 90vh, 0) rotate(-3deg) scale(1.01); }
  19%    { transform: translate3d(20vw, 91vh, 0) rotate(-2deg) scale(1.03); }
  25%    { transform: translate3d(27vw, 90vh, 0) rotate(9deg) scale(1.01); }
  32%    { transform: translate3d(38vw, 87vh, 0) rotate(-5deg) scale(0.96); }
  39%    { transform: translate3d(47vw, 84.5vh, 0) rotate(-7deg) scale(0.91); }
  45%    { transform: translate3d(56vw, 84vh, 0) rotate(5deg) scale(0.9); }
  50%    { transform: translate3d(62vw, 86vh, 0) rotate(-5deg) scale(0.94); }
  58%    { transform: translate3d(74vw, 91.5vh, 0) rotate(7deg) scale(1.04); }
  66%    { transform: translate3d(86vw, 88vh, 0) rotate(-3deg) scale(0.98); }
  74%    { transform: translate3d(97vw, 82vh, 0) rotate(-5deg) scale(0.87); }
  80%    { transform: translate3d(107vw, 78vh, 0) rotate(0deg) scale(0.8); }
  80.01% { transform: translate3d(-20vw, 76vh, 0) rotate(0deg) scale(0.76); }
  100%   { transform: translate3d(-7vw, 82vh, 0) rotate(2deg) scale(0.87); }
}
/* COMET: in from the right -> cuts behind Duke at 25% (both swerve, she
   lifts up-floor with a hard lean-away) -> wide left curl by the rail ->
   sweeps down-lane -> 60-65% paper-doll pirouette (scaleX 1 -> -1 -> 1
   -> -1: a turn and a half, out facing RIGHT) -> exits right, flips back
   while hidden. */
@keyframes roller-disco-comet {
  0%     { transform: translate3d(108vw, 76vh, 0) rotate(0deg) scale(0.76); }
  5%     { transform: translate3d(99vw, 78vh, 0) rotate(-4deg) scale(0.8); }
  12%    { transform: translate3d(80vw, 84vh, 0) rotate(5deg) scale(0.9); }
  19%    { transform: translate3d(55vw, 83vh, 0) rotate(-3deg) scale(0.89); }
  25%    { transform: translate3d(30vw, 81vh, 0) rotate(-12deg) scale(0.85); }
  31%    { transform: translate3d(20vw, 75vh, 0) rotate(0deg) scale(0.74); }
  38%    { transform: translate3d(13vw, 70vh, 0) rotate(6deg) scale(0.66); }
  45%    { transform: translate3d(10vw, 76vh, 0) rotate(8deg) scale(0.76); }
  50%    { transform: translate3d(15vw, 82vh, 0) rotate(3deg) scale(0.87); }
  55%    { transform: translate3d(21vw, 87.5vh, 0) rotate(0deg) scale(0.97); }
  57%    { transform: translate3d(23vw, 88vh, 0) rotate(0deg) scale(0.98); }
  58.7%  { transform: translate3d(24vw, 88vh, 0) rotate(0deg) scale(-0.98, 0.98); }
  60.4%  { transform: translate3d(25vw, 88vh, 0) rotate(0deg) scale(0.98, 0.98); }
  62%    { transform: translate3d(26vw, 88vh, 0) rotate(0deg) scale(-0.98, 0.98); }
  69%    { transform: translate3d(40vw, 90vh, 0) rotate(-5deg) scale(-1.01, 1.01); }
  76%    { transform: translate3d(58vw, 88vh, 0) rotate(6deg) scale(-0.975, 0.975); }
  83%    { transform: translate3d(78vw, 84.5vh, 0) rotate(-4deg) scale(-0.9, 0.9); }
  90%    { transform: translate3d(99vw, 81vh, 0) rotate(0deg) scale(-0.85, 0.85); }
  94%    { transform: translate3d(108vw, 78vh, 0) rotate(0deg) scale(-0.8, 0.8); }
  94.01% { transform: translate3d(108vw, 76vh, 0) rotate(0deg) scale(0.76); }
  100%   { transform: translate3d(108vw, 76vh, 0) rotate(0deg) scale(0.76); }
}
/* ROXY: the slalom — enters six seconds after Duke (never bunching his
   lane), then one long weave rail-to-lane and back while drifting right
   all period; ducks toward the rail during the 50% high-five so the beat
   stays clean, then crosses UNDER Flash at 82% (near-miss 2). */
@keyframes roller-disco-roxy {
  0%     { transform: translate3d(-10vw, 68vh, 0) rotate(0deg) scale(0.62); }
  6%     { transform: translate3d(-7vw, 70vh, 0) rotate(0deg) scale(0.66); }
  13%    { transform: translate3d(3vw, 75vh, 0) rotate(6deg) scale(0.74); }
  20%    { transform: translate3d(11vw, 80vh, 0) rotate(8deg) scale(0.83); }
  27%    { transform: translate3d(19vw, 88vh, 0) rotate(4deg) scale(0.98); }
  34%    { transform: translate3d(26vw, 80vh, 0) rotate(-7deg) scale(0.83); }
  41%    { transform: translate3d(33vw, 70vh, 0) rotate(-5deg) scale(0.66); }
  48%    { transform: translate3d(41vw, 65.5vh, 0) rotate(3deg) scale(0.58); }
  56%    { transform: translate3d(52vw, 67vh, 0) rotate(5deg) scale(0.6); }
  64%    { transform: translate3d(60vw, 71.5vh, 0) rotate(6deg) scale(0.68); }
  73%    { transform: translate3d(69vw, 67vh, 0) rotate(-3deg) scale(0.6); }
  82%    { transform: translate3d(82vw, 63.5vh, 0) rotate(-9deg) scale(0.54); }
  88%    { transform: translate3d(93vw, 70.5vh, 0) rotate(6deg) scale(0.665); }
  94%    { transform: translate3d(106vw, 78vh, 0) rotate(0deg) scale(0.8); }
  94.01% { transform: translate3d(-10vw, 66vh, 0) rotate(0deg) scale(0.59); }
  100%   { transform: translate3d(-10vw, 68vh, 0) rotate(0deg) scale(0.62); }
}
/* FLASH: near-lane laps right-to-left. First lap exits left early (29%,
   clearing the floor before near-miss 1 so the beat stays a duet), then
   teleports to the right wing and slow-rolls the edge until it is time
   to arrive ON the beat: HIGH-FIVE at 50% (leaning into the slap opposite
   Duke), follows through — gliding past BEHIND Comet as she exits her
   twirl (~65%, a staged depth pass) — and is out left by 74% -> far-rail
   return crossing Roxy at 82% (near-miss 2, he takes the nearer line),
   then drifts down-lane home to his 0% mark. */
@keyframes roller-disco-flash {
  0%     { transform: translate3d(70vw, 88vh, 0) rotate(0deg) scale(0.98); }
  5%     { transform: translate3d(58vw, 91vh, 0) rotate(-5deg) scale(1.03); }
  11%    { transform: translate3d(44vw, 87vh, 0) rotate(6deg) scale(0.96); }
  17%    { transform: translate3d(28vw, 82vh, 0) rotate(3deg) scale(0.87); }
  23%    { transform: translate3d(12vw, 77vh, 0) rotate(-4deg) scale(0.78); }
  29%    { transform: translate3d(-7vw, 73vh, 0) rotate(0deg) scale(0.71); }
  29.01% { transform: translate3d(110vw, 80vh, 0) rotate(0deg) scale(0.83); }
  36%    { transform: translate3d(103vw, 81vh, 0) rotate(-2deg) scale(0.845); }
  43%    { transform: translate3d(94vw, 82.5vh, 0) rotate(-3deg) scale(0.88); }
  50%    { transform: translate3d(69vw, 86vh, 0) rotate(8deg) scale(0.94); }
  55%    { transform: translate3d(56vw, 88.5vh, 0) rotate(-6deg) scale(0.985); }
  61%    { transform: translate3d(44vw, 83vh, 0) rotate(4deg) scale(0.89); }
  67%    { transform: translate3d(24vw, 79.5vh, 0) rotate(2deg) scale(0.82); }
  74%    { transform: translate3d(-7vw, 76vh, 0) rotate(0deg) scale(0.76); }
  74.01% { transform: translate3d(112vw, 62vh, 0) rotate(0deg) scale(0.52); }
  82%    { transform: translate3d(86vw, 65.5vh, 0) rotate(9deg) scale(0.58); }
  88%    { transform: translate3d(79vw, 69.5vh, 0) rotate(-5deg) scale(0.65); }
  94%    { transform: translate3d(74vw, 79vh, 0) rotate(4deg) scale(0.815); }
  100%   { transform: translate3d(70vw, 88vh, 0) rotate(0deg) scale(0.98); }
}
/* the slap flash: dark all cycle, pops for ~1s around t=50% — same clock
   as the skaters so it can never miss the hands. 5 discrete paints/36s. */
@keyframes roller-disco-hifive {
  /* invisible + parked at the next beat's spot, teleport happens at opacity 0.
     Each beat sits at the skaters' RAISED-HAND height (~10-14vh above their
     foot line) so the burst pops between the palms, not at the wheels. */
  0%, 24.2%   { opacity: 0; transform: translate3d(29vw, 76vh, 0) scale(0.35); }
  /* t=25 near-miss 1 (Duke/Comet) — small quick glint */
  24.6%       { opacity: 0.85; transform: translate3d(29vw, 76vh, 0) scale(0.5); }
  25.6%       { opacity: 0; transform: translate3d(29vw, 76vh, 0) scale(0.55); }
  /* t=38 orbit spot (Nova around Rico) — mid-air, between their held hands */
  25.61%, 37.2% { opacity: 0; transform: translate3d(44vw, 66vh, 0) scale(0.4); }
  37.8%       { opacity: 0.95; transform: translate3d(44vw, 66vh, 0) scale(0.72); }
  39%         { opacity: 0.5; transform: translate3d(44vw, 66vh, 0) scale(0.8); }
  39.8%       { opacity: 0; transform: translate3d(44vw, 66vh, 0) scale(0.85); }
  /* t=50 HIGH-FIVE (Duke/Flash) — the big one, at their palms */
  39.81%, 48.6% { opacity: 0; transform: translate3d(62vw, 75vh, 0) scale(0.4); }
  49%         { opacity: 1; transform: translate3d(62vw, 75vh, 0) scale(0.85); }
  49.8%       { opacity: 0.55; transform: translate3d(62vw, 75vh, 0) scale(1.02); }
  50.4%       { opacity: 1; transform: translate3d(62vw, 75vh, 0) scale(0.92); }
  51.6%       { opacity: 0.4; transform: translate3d(62vw, 75vh, 0) scale(1.08); }
  52.6%       { opacity: 0; transform: translate3d(62vw, 75vh, 0) scale(1.12); }
  /* t=68 HIGH-FIVE (Nova/Jinx) — at their palms */
  52.61%, 66.6% { opacity: 0; transform: translate3d(63vw, 77vh, 0) scale(0.4); }
  67%         { opacity: 1; transform: translate3d(63vw, 77vh, 0) scale(0.85); }
  67.8%       { opacity: 0.5; transform: translate3d(63vw, 77vh, 0) scale(1.02); }
  68.4%       { opacity: 1; transform: translate3d(63vw, 77vh, 0) scale(0.94); }
  69.6%       { opacity: 0; transform: translate3d(63vw, 77vh, 0) scale(1.1); }
  /* t=75 WHOA near-collision (Rico/Jinx) — between their flung-up arms */
  69.61%, 73.8% { opacity: 0; transform: translate3d(56vw, 74vh, 0) scale(0.4); }
  74.4%       { opacity: 0.95; transform: translate3d(56vw, 74vh, 0) scale(0.8); }
  75.4%       { opacity: 0.45; transform: translate3d(56vw, 74vh, 0) scale(0.95); }
  76.2%       { opacity: 0; transform: translate3d(56vw, 74vh, 0) scale(1.0); }
  /* t=82 near-miss 2 (Flash/Roxy) — small distant glint at the rail */
  76.21%, 81.4% { opacity: 0; transform: translate3d(84vw, 60vh, 0) scale(0.3); }
  81.8%       { opacity: 0.8; transform: translate3d(84vw, 60vh, 0) scale(0.45); }
  82.8%       { opacity: 0; transform: translate3d(84vw, 60vh, 0) scale(0.5); }
  /* t=90 side-by-side (Nova/Jinx) — soft twin twinkle above their heads */
  82.81%, 88.8% { opacity: 0; transform: translate3d(59vw, 78vh, 0) scale(0.4); }
  89.4%       { opacity: 0.9; transform: translate3d(59vw, 78vh, 0) scale(0.72); }
  90.4%       { opacity: 0.5; transform: translate3d(59vw, 78vh, 0) scale(0.82); }
  91.4%       { opacity: 0; transform: translate3d(59vw, 78vh, 0) scale(0.88); }
  /* park back at beat-1 spot for the loop seam */
  91.41%, 100% { opacity: 0; transform: translate3d(29vw, 76vh, 0) scale(0.35); }
}/* finale strobe: discrete opacity dips late in the loop */
@keyframes roller-disco-spotlight {
  0%, 70%, 100% { opacity: 1; }
  78%           { opacity: 0.55; }
  84%           { opacity: 0.95; }
  90%           { opacity: 0.65; }
}

/* DUKE legcycle: 4 discrete stride frames (A push / B gather /
   C opposite push / D recovery) swapped via background-image at ~2.5-3.2/s
   — the blessed small-sprite exception (150px box, background-image only,
   negligible repaint). Loop-closed; the glide-path transform runs alongside. */
@keyframes roller-disco-duke-legs {
  0%, 24.99%   { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='80' cy='214' rx='54' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M74 122 L102 124 L100 134 L76 132 Z' fill='%23b3186b'/%3E%3Cpath d='M78 124 Q58 152 42 190' stroke='%23b3186b' stroke-width='15' fill='none' stroke-linecap='round'/%3E%3Cpath d='M78 124 Q58 152 50 171' stroke='%23d94c8f' stroke-width='3.5' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cpath d='M96 126 Q100 150 96 190' stroke='%23ff2d95' stroke-width='15' fill='none' stroke-linecap='round'/%3E%3Cpath d='M96 126 Q100 150 98 170' stroke='%23ff5aad' stroke-width='3.5' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cg transform='rotate(-24 42 193)'%3E%3Crect x='29' y='187' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M29 187 L55 187 L55 192 L29 192 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='34' cy='202' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='49' cy='202' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='34' cy='202' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='49' cy='202' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(4 96 193)'%3E%3Crect x='83' y='187' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M83 187 L109 187 L109 192 L83 192 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='88' cy='202' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='103' cy='202' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='88' cy='202' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='103' cy='202' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='88' cy='120' rx='80' ry='102' fill='url(%23g1)'/%3E%3Cpath d='M100 62 Q110 92 96 118 L76 116 Q80 88 90 66 Z' fill='%234a1a42'/%3E%3Cpath d='M100 64 Q107 88 97 110 L79 108 Q83 86 90 68 Z' fill='%23ffd23f'/%3E%3Cpath d='M100 64 Q107 88 97 110 L89 109 Q95 86 93 66 Z' fill='%23c99a1f'/%3E%3Cpath d='M76 110 L100 112 L102 128 L74 126 Z' fill='%23ff2d95'/%3E%3Cpath d='M97 68 Q116 58 129 44' stroke='%234a1a42' stroke-width='10' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='131' cy='42' r='5' fill='%234a1a42'/%3E%3Cpath d='M132 40 L136 31' stroke='%234a1a42' stroke-width='3.4' fill='none' stroke-linecap='round'/%3E%3Cpath d='M90 72 Q72 90 58 102' stroke='%2335102f' stroke-width='10' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='56' cy='104' r='4.5' fill='%2335102f'/%3E%3Ccircle cx='100' cy='40' r='12.5' fill='%234a1a42'/%3E%3Ccircle cx='88' cy='30' r='9' fill='%233d1336'/%3E%3Ccircle cx='95' cy='21' r='10' fill='%233d1336'/%3E%3Ccircle cx='107' cy='20' r='9.5' fill='%233d1336'/%3E%3Ccircle cx='117' cy='28' r='9' fill='%233d1336'/%3E%3Ccircle cx='119' cy='39' r='8' fill='%233d1336'/%3E%3Ccircle cx='86' cy='42' r='7' fill='%233d1336'/%3E%3Cpath d='M99 65 Q117 55 130 41' stroke='%23ffd23f' stroke-width='1.7' fill='none' stroke-linecap='round' opacity='.9'/%3E%3Cpath d='M90 17 Q105 10 118 25' stroke='%23ffd23f' stroke-width='1.8' fill='none' stroke-linecap='round' opacity='.75'/%3E%3Cpath d='M101 66 Q108 90 98 112' stroke='%23ffd23f' stroke-width='1.5' fill='none' stroke-linecap='round' opacity='.6'/%3E%3C/svg%3E"); }
  25%, 49.99%  { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='84' cy='214' rx='44' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M74 122 L102 124 L100 134 L76 132 Z' fill='%23b3186b'/%3E%3Cpath d='M78 124 Q74 152 70 192' stroke='%23b3186b' stroke-width='15' fill='none' stroke-linecap='round'/%3E%3Cpath d='M78 124 Q74 152 72 172' stroke='%23d94c8f' stroke-width='3.5' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cpath d='M96 126 Q98 152 98 192' stroke='%23ff2d95' stroke-width='15' fill='none' stroke-linecap='round'/%3E%3Cpath d='M96 126 Q98 152 98 172' stroke='%23ff5aad' stroke-width='3.5' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cg transform='rotate(-4 68 195)'%3E%3Crect x='55' y='189' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M55 189 L81 189 L81 194 L55 194 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='60' cy='204' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='75' cy='204' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='60' cy='204' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='75' cy='204' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(2 98 195)'%3E%3Crect x='85' y='189' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M85 189 L111 189 L111 194 L85 194 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='90' cy='204' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='105' cy='204' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='90' cy='204' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='105' cy='204' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='88' cy='120' rx='80' ry='102' fill='url(%23g1)'/%3E%3Cpath d='M100 62 Q110 92 96 118 L76 116 Q80 88 90 66 Z' fill='%234a1a42'/%3E%3Cpath d='M100 64 Q107 88 97 110 L79 108 Q83 86 90 68 Z' fill='%23ffd23f'/%3E%3Cpath d='M100 64 Q107 88 97 110 L89 109 Q95 86 93 66 Z' fill='%23c99a1f'/%3E%3Cpath d='M76 110 L100 112 L102 128 L74 126 Z' fill='%23ff2d95'/%3E%3Cpath d='M97 68 Q116 58 129 44' stroke='%234a1a42' stroke-width='10' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='131' cy='42' r='5' fill='%234a1a42'/%3E%3Cpath d='M132 40 L136 31' stroke='%234a1a42' stroke-width='3.4' fill='none' stroke-linecap='round'/%3E%3Cpath d='M90 72 Q72 90 58 102' stroke='%2335102f' stroke-width='10' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='56' cy='104' r='4.5' fill='%2335102f'/%3E%3Ccircle cx='100' cy='40' r='12.5' fill='%234a1a42'/%3E%3Ccircle cx='88' cy='30' r='9' fill='%233d1336'/%3E%3Ccircle cx='95' cy='21' r='10' fill='%233d1336'/%3E%3Ccircle cx='107' cy='20' r='9.5' fill='%233d1336'/%3E%3Ccircle cx='117' cy='28' r='9' fill='%233d1336'/%3E%3Ccircle cx='119' cy='39' r='8' fill='%233d1336'/%3E%3Ccircle cx='86' cy='42' r='7' fill='%233d1336'/%3E%3Cpath d='M99 65 Q117 55 130 41' stroke='%23ffd23f' stroke-width='1.7' fill='none' stroke-linecap='round' opacity='.9'/%3E%3Cpath d='M90 17 Q105 10 118 25' stroke='%23ffd23f' stroke-width='1.8' fill='none' stroke-linecap='round' opacity='.75'/%3E%3Cpath d='M101 66 Q108 90 98 112' stroke='%23ffd23f' stroke-width='1.5' fill='none' stroke-linecap='round' opacity='.6'/%3E%3C/svg%3E"); }
  50%, 74.99%  { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='88' cy='214' rx='54' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M74 122 L102 124 L100 134 L76 132 Z' fill='%23b3186b'/%3E%3Cpath d='M78 124 Q78 150 74 190' stroke='%23b3186b' stroke-width='15' fill='none' stroke-linecap='round'/%3E%3Cpath d='M78 124 Q78 150 76 170' stroke='%23d94c8f' stroke-width='3.5' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cpath d='M96 126 Q112 150 124 188' stroke='%23ff2d95' stroke-width='15' fill='none' stroke-linecap='round'/%3E%3Cpath d='M96 126 Q112 150 118 169' stroke='%23ff5aad' stroke-width='3.5' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cg transform='rotate(-2 72 193)'%3E%3Crect x='59' y='187' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M59 187 L85 187 L85 192 L59 192 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='64' cy='202' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='79' cy='202' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='64' cy='202' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='79' cy='202' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(22 124 191)'%3E%3Crect x='111' y='185' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M111 185 L137 185 L137 190 L111 190 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='116' cy='200' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='131' cy='200' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='116' cy='200' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='131' cy='200' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='88' cy='120' rx='80' ry='102' fill='url(%23g1)'/%3E%3Cpath d='M100 62 Q110 92 96 118 L76 116 Q80 88 90 66 Z' fill='%234a1a42'/%3E%3Cpath d='M100 64 Q107 88 97 110 L79 108 Q83 86 90 68 Z' fill='%23ffd23f'/%3E%3Cpath d='M100 64 Q107 88 97 110 L89 109 Q95 86 93 66 Z' fill='%23c99a1f'/%3E%3Cpath d='M76 110 L100 112 L102 128 L74 126 Z' fill='%23ff2d95'/%3E%3Cpath d='M97 68 Q116 58 129 44' stroke='%234a1a42' stroke-width='10' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='131' cy='42' r='5' fill='%234a1a42'/%3E%3Cpath d='M132 40 L136 31' stroke='%234a1a42' stroke-width='3.4' fill='none' stroke-linecap='round'/%3E%3Cpath d='M90 72 Q72 90 58 102' stroke='%2335102f' stroke-width='10' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='56' cy='104' r='4.5' fill='%2335102f'/%3E%3Ccircle cx='100' cy='40' r='12.5' fill='%234a1a42'/%3E%3Ccircle cx='88' cy='30' r='9' fill='%233d1336'/%3E%3Ccircle cx='95' cy='21' r='10' fill='%233d1336'/%3E%3Ccircle cx='107' cy='20' r='9.5' fill='%233d1336'/%3E%3Ccircle cx='117' cy='28' r='9' fill='%233d1336'/%3E%3Ccircle cx='119' cy='39' r='8' fill='%233d1336'/%3E%3Ccircle cx='86' cy='42' r='7' fill='%233d1336'/%3E%3Cpath d='M99 65 Q117 55 130 41' stroke='%23ffd23f' stroke-width='1.7' fill='none' stroke-linecap='round' opacity='.9'/%3E%3Cpath d='M90 17 Q105 10 118 25' stroke='%23ffd23f' stroke-width='1.8' fill='none' stroke-linecap='round' opacity='.75'/%3E%3Cpath d='M101 66 Q108 90 98 112' stroke='%23ffd23f' stroke-width='1.5' fill='none' stroke-linecap='round' opacity='.6'/%3E%3C/svg%3E"); }
  75%, 100%    { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='84' cy='214' rx='52' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M74 122 L102 124 L100 134 L76 132 Z' fill='%23b3186b'/%3E%3Cpath d='M78 124 Q68 152 58 191' stroke='%23b3186b' stroke-width='15' fill='none' stroke-linecap='round'/%3E%3Cpath d='M78 124 Q68 152 63 171.5' stroke='%23d94c8f' stroke-width='3.5' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cpath d='M96 126 Q104 152 110 190' stroke='%23ff2d95' stroke-width='15' fill='none' stroke-linecap='round'/%3E%3Cpath d='M96 126 Q104 152 107 171' stroke='%23ff5aad' stroke-width='3.5' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cg transform='rotate(-14 56 194)'%3E%3Crect x='43' y='188' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M43 188 L69 188 L69 193 L43 193 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='48' cy='203' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='63' cy='203' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='48' cy='203' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='63' cy='203' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(12 110 193)'%3E%3Crect x='97' y='187' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M97 187 L123 187 L123 192 L97 192 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='102' cy='202' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='117' cy='202' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='102' cy='202' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='117' cy='202' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='88' cy='120' rx='80' ry='102' fill='url(%23g1)'/%3E%3Cpath d='M100 62 Q110 92 96 118 L76 116 Q80 88 90 66 Z' fill='%234a1a42'/%3E%3Cpath d='M100 64 Q107 88 97 110 L79 108 Q83 86 90 68 Z' fill='%23ffd23f'/%3E%3Cpath d='M100 64 Q107 88 97 110 L89 109 Q95 86 93 66 Z' fill='%23c99a1f'/%3E%3Cpath d='M76 110 L100 112 L102 128 L74 126 Z' fill='%23ff2d95'/%3E%3Cpath d='M97 68 Q116 58 129 44' stroke='%234a1a42' stroke-width='10' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='131' cy='42' r='5' fill='%234a1a42'/%3E%3Cpath d='M132 40 L136 31' stroke='%234a1a42' stroke-width='3.4' fill='none' stroke-linecap='round'/%3E%3Cpath d='M90 72 Q72 90 58 102' stroke='%2335102f' stroke-width='10' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='56' cy='104' r='4.5' fill='%2335102f'/%3E%3Ccircle cx='100' cy='40' r='12.5' fill='%234a1a42'/%3E%3Ccircle cx='88' cy='30' r='9' fill='%233d1336'/%3E%3Ccircle cx='95' cy='21' r='10' fill='%233d1336'/%3E%3Ccircle cx='107' cy='20' r='9.5' fill='%233d1336'/%3E%3Ccircle cx='117' cy='28' r='9' fill='%233d1336'/%3E%3Ccircle cx='119' cy='39' r='8' fill='%233d1336'/%3E%3Ccircle cx='86' cy='42' r='7' fill='%233d1336'/%3E%3Cpath d='M99 65 Q117 55 130 41' stroke='%23ffd23f' stroke-width='1.7' fill='none' stroke-linecap='round' opacity='.9'/%3E%3Cpath d='M90 17 Q105 10 118 25' stroke='%23ffd23f' stroke-width='1.8' fill='none' stroke-linecap='round' opacity='.75'/%3E%3Cpath d='M101 66 Q108 90 98 112' stroke='%23ffd23f' stroke-width='1.5' fill='none' stroke-linecap='round' opacity='.6'/%3E%3C/svg%3E"); }
}
/* COMET legcycle: 4 discrete stride frames (A push / B gather /
   C opposite push / D recovery) swapped via background-image at ~2.5-3.2/s
   — the blessed small-sprite exception (150px box, background-image only,
   negligible repaint). Loop-closed; the glide-path transform runs alongside. */
@keyframes roller-disco-comet-legs {
  0%, 24.99%   { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='66' cy='214' rx='50' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M58 116 L94 122 L90 132 L60 128 Z' fill='%233d1336'/%3E%3Cpath d='M64 124 Q46 150 30 188' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M38 169 Q34 178.5 30 188' stroke='%23ff2d95' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M38 169 L30 188' stroke='%23b3186b' stroke-width='6' fill='none' stroke-linecap='round' opacity='.55'/%3E%3Cpath d='M82 126 Q86 152 84 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M85 171 Q84.5 180.5 84 190' stroke='%23ff2d95' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M85 171 L84 190' stroke='%23b3186b' stroke-width='6' fill='none' stroke-linecap='round' opacity='.55'/%3E%3Cg transform='rotate(-22 30 191)'%3E%3Crect x='17' y='185' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M17 185 L43 185 L43 190 L17 190 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='22' cy='200' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='37' cy='200' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='22' cy='200' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='37' cy='200' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(3 84 192)'%3E%3Crect x='71' y='186' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M71 186 L97 186 L97 191 L71 191 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='76' cy='201' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='91' cy='201' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='76' cy='201' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='91' cy='201' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='70' cy='120' rx='78' ry='98' fill='url(%23g1)'/%3E%3Cpath d='M66 88 Q58 102 69 116 L90 121 Q86 100 76 90 Z' fill='%234a1a42'/%3E%3Cpath d='M66 90 Q58 102 69 116 L86 121 Q82 103 74 93 Z' fill='%237b2fbf'/%3E%3Cpath d='M66 90 Q58 102 69 116 L77 118 Q72 102 69 91 Z' fill='%234e1c7e'/%3E%3Cpath d='M70 112 Q84 108 94 116 L101 130 Q80 137 62 126 Z' fill='%237b2fbf'/%3E%3Cpath d='M82 112 L101 130 Q89 135 77 133 Z' fill='%234e1c7e'/%3E%3Cpath d='M58 94 Q42 100 28 110' stroke='%234a1a42' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='26' cy='111' r='4.5' fill='%234a1a42'/%3E%3Ccircle cx='52' cy='74' r='11.5' fill='%234a1a42'/%3E%3Cpath d='M61 68 Q82 56 104 56 Q88 66 68 78 Z' fill='%233d1336'/%3E%3Cpath d='M102 56 Q114 58 112 68 Q102 64 98 59 Z' fill='%233d1336'/%3E%3Ccircle cx='63' cy='68' r='3' fill='%23ffd23f'/%3E%3Cpath d='M63 64 Q84 54 103 55' stroke='%23ffd23f' stroke-width='1.7' fill='none' stroke-linecap='round' opacity='.85'/%3E%3Cpath d='M46 66 Q41 71 41 79' stroke='%23ffd23f' stroke-width='1.5' fill='none' stroke-linecap='round' opacity='.7'/%3E%3C/svg%3E"); }
  25%, 49.99%  { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='66' cy='214' rx='50' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M58 116 L94 122 L90 132 L60 128 Z' fill='%233d1336'/%3E%3Cpath d='M64 124 Q60 150 56 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M58 170 Q57 180 56 190' stroke='%23ff2d95' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M58 170 L56 190' stroke='%23b3186b' stroke-width='6' fill='none' stroke-linecap='round' opacity='.55'/%3E%3Cpath d='M82 126 Q84 152 84 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M84 171 Q84 180.5 84 190' stroke='%23ff2d95' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M84 171 L84 190' stroke='%23b3186b' stroke-width='6' fill='none' stroke-linecap='round' opacity='.55'/%3E%3Cg transform='rotate(-4 56 193)'%3E%3Crect x='43' y='187' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M43 187 L69 187 L69 192 L43 192 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='48' cy='202' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='63' cy='202' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='48' cy='202' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='63' cy='202' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(2 84 193)'%3E%3Crect x='71' y='187' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M71 187 L97 187 L97 192 L71 192 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='76' cy='202' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='91' cy='202' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='76' cy='202' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='91' cy='202' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='70' cy='120' rx='78' ry='98' fill='url(%23g1)'/%3E%3Cpath d='M66 88 Q58 102 69 116 L90 121 Q86 100 76 90 Z' fill='%234a1a42'/%3E%3Cpath d='M66 90 Q58 102 69 116 L86 121 Q82 103 74 93 Z' fill='%237b2fbf'/%3E%3Cpath d='M66 90 Q58 102 69 116 L77 118 Q72 102 69 91 Z' fill='%234e1c7e'/%3E%3Cpath d='M70 112 Q84 108 94 116 L101 130 Q80 137 62 126 Z' fill='%237b2fbf'/%3E%3Cpath d='M82 112 L101 130 Q89 135 77 133 Z' fill='%234e1c7e'/%3E%3Cpath d='M58 94 Q42 100 28 110' stroke='%234a1a42' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='26' cy='111' r='4.5' fill='%234a1a42'/%3E%3Ccircle cx='52' cy='74' r='11.5' fill='%234a1a42'/%3E%3Cpath d='M61 68 Q82 56 104 56 Q88 66 68 78 Z' fill='%233d1336'/%3E%3Cpath d='M102 56 Q114 58 112 68 Q102 64 98 59 Z' fill='%233d1336'/%3E%3Ccircle cx='63' cy='68' r='3' fill='%23ffd23f'/%3E%3Cpath d='M63 64 Q84 54 103 55' stroke='%23ffd23f' stroke-width='1.7' fill='none' stroke-linecap='round' opacity='.85'/%3E%3Cpath d='M46 66 Q41 71 41 79' stroke='%23ffd23f' stroke-width='1.5' fill='none' stroke-linecap='round' opacity='.7'/%3E%3C/svg%3E"); }
  50%, 74.99%  { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='66' cy='214' rx='50' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M58 116 L94 122 L90 132 L60 128 Z' fill='%233d1336'/%3E%3Cpath d='M64 124 Q64 150 60 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M62 170 Q61 180 60 190' stroke='%23ff2d95' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M62 170 L60 190' stroke='%23b3186b' stroke-width='6' fill='none' stroke-linecap='round' opacity='.55'/%3E%3Cpath d='M82 126 Q98 150 110 188' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M104 169 Q107 178.5 110 188' stroke='%23ff2d95' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M104 169 L110 188' stroke='%23b3186b' stroke-width='6' fill='none' stroke-linecap='round' opacity='.55'/%3E%3Cg transform='rotate(-2 60 192)'%3E%3Crect x='47' y='186' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M47 186 L73 186 L73 191 L47 191 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='52' cy='201' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='67' cy='201' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='52' cy='201' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='67' cy='201' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(20 110 191)'%3E%3Crect x='97' y='185' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M97 185 L123 185 L123 190 L97 190 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='102' cy='200' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='117' cy='200' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='102' cy='200' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='117' cy='200' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='70' cy='120' rx='78' ry='98' fill='url(%23g1)'/%3E%3Cpath d='M66 88 Q58 102 69 116 L90 121 Q86 100 76 90 Z' fill='%234a1a42'/%3E%3Cpath d='M66 90 Q58 102 69 116 L86 121 Q82 103 74 93 Z' fill='%237b2fbf'/%3E%3Cpath d='M66 90 Q58 102 69 116 L77 118 Q72 102 69 91 Z' fill='%234e1c7e'/%3E%3Cpath d='M70 112 Q84 108 94 116 L101 130 Q80 137 62 126 Z' fill='%237b2fbf'/%3E%3Cpath d='M82 112 L101 130 Q89 135 77 133 Z' fill='%234e1c7e'/%3E%3Cpath d='M58 94 Q42 100 28 110' stroke='%234a1a42' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='26' cy='111' r='4.5' fill='%234a1a42'/%3E%3Ccircle cx='52' cy='74' r='11.5' fill='%234a1a42'/%3E%3Cpath d='M61 68 Q82 56 104 56 Q88 66 68 78 Z' fill='%233d1336'/%3E%3Cpath d='M102 56 Q114 58 112 68 Q102 64 98 59 Z' fill='%233d1336'/%3E%3Ccircle cx='63' cy='68' r='3' fill='%23ffd23f'/%3E%3Cpath d='M63 64 Q84 54 103 55' stroke='%23ffd23f' stroke-width='1.7' fill='none' stroke-linecap='round' opacity='.85'/%3E%3Cpath d='M46 66 Q41 71 41 79' stroke='%23ffd23f' stroke-width='1.5' fill='none' stroke-linecap='round' opacity='.7'/%3E%3C/svg%3E"); }
  75%, 100%    { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='66' cy='214' rx='50' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M58 116 L94 122 L90 132 L60 128 Z' fill='%233d1336'/%3E%3Cpath d='M64 124 Q54 150 44 189' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M49 169.5 Q46.5 179.25 44 189' stroke='%23ff2d95' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M49 169.5 L44 189' stroke='%23b3186b' stroke-width='6' fill='none' stroke-linecap='round' opacity='.55'/%3E%3Cpath d='M82 126 Q90 152 96 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M93 171 Q94.5 180.5 96 190' stroke='%23ff2d95' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M93 171 L96 190' stroke='%23b3186b' stroke-width='6' fill='none' stroke-linecap='round' opacity='.55'/%3E%3Cg transform='rotate(-14 44 193)'%3E%3Crect x='31' y='187' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M31 187 L57 187 L57 192 L31 192 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='36' cy='202' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='51' cy='202' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='36' cy='202' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='51' cy='202' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(11 96 192)'%3E%3Crect x='83' y='186' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M83 186 L109 186 L109 191 L83 191 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='88' cy='201' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='103' cy='201' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='88' cy='201' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='103' cy='201' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='70' cy='120' rx='78' ry='98' fill='url(%23g1)'/%3E%3Cpath d='M66 88 Q58 102 69 116 L90 121 Q86 100 76 90 Z' fill='%234a1a42'/%3E%3Cpath d='M66 90 Q58 102 69 116 L86 121 Q82 103 74 93 Z' fill='%237b2fbf'/%3E%3Cpath d='M66 90 Q58 102 69 116 L77 118 Q72 102 69 91 Z' fill='%234e1c7e'/%3E%3Cpath d='M70 112 Q84 108 94 116 L101 130 Q80 137 62 126 Z' fill='%237b2fbf'/%3E%3Cpath d='M82 112 L101 130 Q89 135 77 133 Z' fill='%234e1c7e'/%3E%3Cpath d='M58 94 Q42 100 28 110' stroke='%234a1a42' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='26' cy='111' r='4.5' fill='%234a1a42'/%3E%3Ccircle cx='52' cy='74' r='11.5' fill='%234a1a42'/%3E%3Cpath d='M61 68 Q82 56 104 56 Q88 66 68 78 Z' fill='%233d1336'/%3E%3Cpath d='M102 56 Q114 58 112 68 Q102 64 98 59 Z' fill='%233d1336'/%3E%3Ccircle cx='63' cy='68' r='3' fill='%23ffd23f'/%3E%3Cpath d='M63 64 Q84 54 103 55' stroke='%23ffd23f' stroke-width='1.7' fill='none' stroke-linecap='round' opacity='.85'/%3E%3Cpath d='M46 66 Q41 71 41 79' stroke='%23ffd23f' stroke-width='1.5' fill='none' stroke-linecap='round' opacity='.7'/%3E%3C/svg%3E"); }
}
/* ROXY legcycle: 4 discrete stride frames (A push / B gather /
   C opposite push / D recovery) swapped via background-image at ~2.5-3.2/s
   — the blessed small-sprite exception (150px box, background-image only,
   negligible repaint). Loop-closed; the glide-path transform runs alongside. */
@keyframes roller-disco-roxy-legs {
  0%, 24.99%   { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='86' cy='214' rx='50' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M72 116 L100 118 L98 128 L74 126 Z' fill='%231a9e8b'/%3E%3Cpath d='M78 120 Q60 148 44 188' stroke='%234a1a42' stroke-width='12' fill='none' stroke-linecap='round'/%3E%3Cpath d='M49.333333333333336 174.66666666666666 L44 188' stroke='%23fff3fb' stroke-width='12' fill='none' stroke-linecap='round'/%3E%3Cpath d='M49.333333333333336 174.66666666666666 L44 188' stroke='%232ee6c8' stroke-width='3' fill='none' stroke-linecap='round' opacity='.5'/%3E%3Cpath d='M96 122 Q100 148 96 190' stroke='%234a1a42' stroke-width='12' fill='none' stroke-linecap='round'/%3E%3Cpath d='M97.33333333333333 176 L96 190' stroke='%23fff3fb' stroke-width='12' fill='none' stroke-linecap='round'/%3E%3Cpath d='M97.33333333333333 176 L96 190' stroke='%232ee6c8' stroke-width='3' fill='none' stroke-linecap='round' opacity='.5'/%3E%3Cg transform='rotate(-22 44 191)'%3E%3Crect x='30.5' y='185' width='27' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M30.5 185 L57.5 185 L57.5 190 L30.5 190 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='35.5' cy='200' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='51.5' cy='200' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='35.5' cy='200' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='51.5' cy='200' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(4 96 192)'%3E%3Crect x='82.5' y='186' width='27' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M82.5 186 L109.5 186 L109.5 191 L82.5 191 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='87.5' cy='201' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='103.5' cy='201' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='87.5' cy='201' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='103.5' cy='201' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='88' cy='120' rx='78' ry='98' fill='url(%23g1)'/%3E%3Cpath d='M97 60 Q103 84 93 108 L75 106 Q79 82 85 60 Z' fill='%234a1a42'/%3E%3Cpath d='M97 60 Q101 74 98 88 L78 86 Q81 72 85 62 Z' fill='%23fff3fb'/%3E%3Cpath d='M97 60 Q101 74 98 88 L90 87 Q94 72 92 61 Z' fill='%23d9c3d3'/%3E%3Cpath d='M78 86 L98 88' stroke='%232ee6c8' stroke-width='2.5'/%3E%3Cpath d='M74 100 L98 102 L100 120 L72 118 Z' fill='%232ee6c8'/%3E%3Cpath d='M88 101 L98 102 L100 120 L90 119 Z' fill='%231a9e8b'/%3E%3Cpath d='M95 66 Q120 62 141 56' stroke='%234a1a42' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='143' cy='55' r='4.5' fill='%234a1a42'/%3E%3Cpath d='M86 66 Q64 70 44 76' stroke='%2335102f' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='42' cy='77' r='4.5' fill='%2335102f'/%3E%3Ccircle cx='97' cy='32' r='11.5' fill='%234a1a42'/%3E%3Ccircle cx='100' cy='13' r='7.5' fill='%233d1336'/%3E%3Cellipse cx='99' cy='20.5' rx='5.5' ry='2.6' fill='%23ffd23f'/%3E%3Cpath d='M96 63 Q120 59 142 53' stroke='%23ffd23f' stroke-width='1.7' fill='none' stroke-linecap='round' opacity='.9'/%3E%3Cpath d='M94 8 Q101 4 106 10' stroke='%23ffd23f' stroke-width='1.7' fill='none' stroke-linecap='round' opacity='.8'/%3E%3C/svg%3E"); }
  25%, 49.99%  { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='86' cy='214' rx='50' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M72 116 L100 118 L98 128 L74 126 Z' fill='%231a9e8b'/%3E%3Cpath d='M78 120 Q74 148 70 190' stroke='%234a1a42' stroke-width='12' fill='none' stroke-linecap='round'/%3E%3Cpath d='M71.33333333333333 176 L70 190' stroke='%23fff3fb' stroke-width='12' fill='none' stroke-linecap='round'/%3E%3Cpath d='M71.33333333333333 176 L70 190' stroke='%232ee6c8' stroke-width='3' fill='none' stroke-linecap='round' opacity='.5'/%3E%3Cpath d='M96 122 Q98 150 98 190' stroke='%234a1a42' stroke-width='12' fill='none' stroke-linecap='round'/%3E%3Cpath d='M98 176.66666666666666 L98 190' stroke='%23fff3fb' stroke-width='12' fill='none' stroke-linecap='round'/%3E%3Cpath d='M98 176.66666666666666 L98 190' stroke='%232ee6c8' stroke-width='3' fill='none' stroke-linecap='round' opacity='.5'/%3E%3Cg transform='rotate(-4 70 193)'%3E%3Crect x='56.5' y='187' width='27' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M56.5 187 L83.5 187 L83.5 192 L56.5 192 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='61.5' cy='202' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='77.5' cy='202' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='61.5' cy='202' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='77.5' cy='202' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(2 98 193)'%3E%3Crect x='84.5' y='187' width='27' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M84.5 187 L111.5 187 L111.5 192 L84.5 192 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='89.5' cy='202' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='105.5' cy='202' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='89.5' cy='202' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='105.5' cy='202' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='88' cy='120' rx='78' ry='98' fill='url(%23g1)'/%3E%3Cpath d='M97 60 Q103 84 93 108 L75 106 Q79 82 85 60 Z' fill='%234a1a42'/%3E%3Cpath d='M97 60 Q101 74 98 88 L78 86 Q81 72 85 62 Z' fill='%23fff3fb'/%3E%3Cpath d='M97 60 Q101 74 98 88 L90 87 Q94 72 92 61 Z' fill='%23d9c3d3'/%3E%3Cpath d='M78 86 L98 88' stroke='%232ee6c8' stroke-width='2.5'/%3E%3Cpath d='M74 100 L98 102 L100 120 L72 118 Z' fill='%232ee6c8'/%3E%3Cpath d='M88 101 L98 102 L100 120 L90 119 Z' fill='%231a9e8b'/%3E%3Cpath d='M95 66 Q120 62 141 56' stroke='%234a1a42' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='143' cy='55' r='4.5' fill='%234a1a42'/%3E%3Cpath d='M86 66 Q64 70 44 76' stroke='%2335102f' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='42' cy='77' r='4.5' fill='%2335102f'/%3E%3Ccircle cx='97' cy='32' r='11.5' fill='%234a1a42'/%3E%3Ccircle cx='100' cy='13' r='7.5' fill='%233d1336'/%3E%3Cellipse cx='99' cy='20.5' rx='5.5' ry='2.6' fill='%23ffd23f'/%3E%3Cpath d='M96 63 Q120 59 142 53' stroke='%23ffd23f' stroke-width='1.7' fill='none' stroke-linecap='round' opacity='.9'/%3E%3Cpath d='M94 8 Q101 4 106 10' stroke='%23ffd23f' stroke-width='1.7' fill='none' stroke-linecap='round' opacity='.8'/%3E%3C/svg%3E"); }
  50%, 74.99%  { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='86' cy='214' rx='50' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M72 116 L100 118 L98 128 L74 126 Z' fill='%231a9e8b'/%3E%3Cpath d='M78 120 Q78 148 74 190' stroke='%234a1a42' stroke-width='12' fill='none' stroke-linecap='round'/%3E%3Cpath d='M75.33333333333333 176 L74 190' stroke='%23fff3fb' stroke-width='12' fill='none' stroke-linecap='round'/%3E%3Cpath d='M75.33333333333333 176 L74 190' stroke='%232ee6c8' stroke-width='3' fill='none' stroke-linecap='round' opacity='.5'/%3E%3Cpath d='M96 122 Q112 148 124 186' stroke='%234a1a42' stroke-width='12' fill='none' stroke-linecap='round'/%3E%3Cpath d='M120 173.33333333333334 L124 186' stroke='%23fff3fb' stroke-width='12' fill='none' stroke-linecap='round'/%3E%3Cpath d='M120 173.33333333333334 L124 186' stroke='%232ee6c8' stroke-width='3' fill='none' stroke-linecap='round' opacity='.5'/%3E%3Cg transform='rotate(-2 74 192)'%3E%3Crect x='60.5' y='186' width='27' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M60.5 186 L87.5 186 L87.5 191 L60.5 191 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='65.5' cy='201' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='81.5' cy='201' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='65.5' cy='201' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='81.5' cy='201' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(20 124 190)'%3E%3Crect x='110.5' y='184' width='27' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M110.5 184 L137.5 184 L137.5 189 L110.5 189 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='115.5' cy='199' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='131.5' cy='199' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='115.5' cy='199' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='131.5' cy='199' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='88' cy='120' rx='78' ry='98' fill='url(%23g1)'/%3E%3Cpath d='M97 60 Q103 84 93 108 L75 106 Q79 82 85 60 Z' fill='%234a1a42'/%3E%3Cpath d='M97 60 Q101 74 98 88 L78 86 Q81 72 85 62 Z' fill='%23fff3fb'/%3E%3Cpath d='M97 60 Q101 74 98 88 L90 87 Q94 72 92 61 Z' fill='%23d9c3d3'/%3E%3Cpath d='M78 86 L98 88' stroke='%232ee6c8' stroke-width='2.5'/%3E%3Cpath d='M74 100 L98 102 L100 120 L72 118 Z' fill='%232ee6c8'/%3E%3Cpath d='M88 101 L98 102 L100 120 L90 119 Z' fill='%231a9e8b'/%3E%3Cpath d='M95 66 Q120 62 141 56' stroke='%234a1a42' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='143' cy='55' r='4.5' fill='%234a1a42'/%3E%3Cpath d='M86 66 Q64 70 44 76' stroke='%2335102f' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='42' cy='77' r='4.5' fill='%2335102f'/%3E%3Ccircle cx='97' cy='32' r='11.5' fill='%234a1a42'/%3E%3Ccircle cx='100' cy='13' r='7.5' fill='%233d1336'/%3E%3Cellipse cx='99' cy='20.5' rx='5.5' ry='2.6' fill='%23ffd23f'/%3E%3Cpath d='M96 63 Q120 59 142 53' stroke='%23ffd23f' stroke-width='1.7' fill='none' stroke-linecap='round' opacity='.9'/%3E%3Cpath d='M94 8 Q101 4 106 10' stroke='%23ffd23f' stroke-width='1.7' fill='none' stroke-linecap='round' opacity='.8'/%3E%3C/svg%3E"); }
  75%, 100%    { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='86' cy='214' rx='50' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M72 116 L100 118 L98 128 L74 126 Z' fill='%231a9e8b'/%3E%3Cpath d='M78 120 Q68 148 58 189' stroke='%234a1a42' stroke-width='12' fill='none' stroke-linecap='round'/%3E%3Cpath d='M61.333333333333336 175.33333333333334 L58 189' stroke='%23fff3fb' stroke-width='12' fill='none' stroke-linecap='round'/%3E%3Cpath d='M61.333333333333336 175.33333333333334 L58 189' stroke='%232ee6c8' stroke-width='3' fill='none' stroke-linecap='round' opacity='.5'/%3E%3Cpath d='M96 122 Q104 150 110 190' stroke='%234a1a42' stroke-width='12' fill='none' stroke-linecap='round'/%3E%3Cpath d='M108 176.66666666666666 L110 190' stroke='%23fff3fb' stroke-width='12' fill='none' stroke-linecap='round'/%3E%3Cpath d='M108 176.66666666666666 L110 190' stroke='%232ee6c8' stroke-width='3' fill='none' stroke-linecap='round' opacity='.5'/%3E%3Cg transform='rotate(-14 58 192)'%3E%3Crect x='44.5' y='186' width='27' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M44.5 186 L71.5 186 L71.5 191 L44.5 191 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='49.5' cy='201' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='65.5' cy='201' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='49.5' cy='201' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='65.5' cy='201' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(11 110 192)'%3E%3Crect x='96.5' y='186' width='27' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M96.5 186 L123.5 186 L123.5 191 L96.5 191 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='101.5' cy='201' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='117.5' cy='201' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='101.5' cy='201' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='117.5' cy='201' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='88' cy='120' rx='78' ry='98' fill='url(%23g1)'/%3E%3Cpath d='M97 60 Q103 84 93 108 L75 106 Q79 82 85 60 Z' fill='%234a1a42'/%3E%3Cpath d='M97 60 Q101 74 98 88 L78 86 Q81 72 85 62 Z' fill='%23fff3fb'/%3E%3Cpath d='M97 60 Q101 74 98 88 L90 87 Q94 72 92 61 Z' fill='%23d9c3d3'/%3E%3Cpath d='M78 86 L98 88' stroke='%232ee6c8' stroke-width='2.5'/%3E%3Cpath d='M74 100 L98 102 L100 120 L72 118 Z' fill='%232ee6c8'/%3E%3Cpath d='M88 101 L98 102 L100 120 L90 119 Z' fill='%231a9e8b'/%3E%3Cpath d='M95 66 Q120 62 141 56' stroke='%234a1a42' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='143' cy='55' r='4.5' fill='%234a1a42'/%3E%3Cpath d='M86 66 Q64 70 44 76' stroke='%2335102f' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='42' cy='77' r='4.5' fill='%2335102f'/%3E%3Ccircle cx='97' cy='32' r='11.5' fill='%234a1a42'/%3E%3Ccircle cx='100' cy='13' r='7.5' fill='%233d1336'/%3E%3Cellipse cx='99' cy='20.5' rx='5.5' ry='2.6' fill='%23ffd23f'/%3E%3Cpath d='M96 63 Q120 59 142 53' stroke='%23ffd23f' stroke-width='1.7' fill='none' stroke-linecap='round' opacity='.9'/%3E%3Cpath d='M94 8 Q101 4 106 10' stroke='%23ffd23f' stroke-width='1.7' fill='none' stroke-linecap='round' opacity='.8'/%3E%3C/svg%3E"); }
}
/* FLASH legcycle: 4 discrete stride frames (A push / B gather /
   C opposite push / D recovery) swapped via background-image at ~2.5-3.2/s
   — the blessed small-sprite exception (150px box, background-image only,
   negligible repaint). Loop-closed; the glide-path transform runs alongside. */
@keyframes roller-disco-flash-legs {
  0%, 24.99%   { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='58' cy='214' rx='50' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M50 112 L74 114 L72 124 L52 122 Z' fill='%234e1c7e'/%3E%3Cpath d='M56 118 Q40 146 26 186' stroke='%237b2fbf' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M56 118 Q40 146 33 166' stroke='%234e1c7e' stroke-width='5' fill='none' stroke-linecap='round' opacity='.7'/%3E%3Cpath d='M72 120 Q76 148 74 190' stroke='%237b2fbf' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M72 120 Q76 148 75 169' stroke='%234e1c7e' stroke-width='5' fill='none' stroke-linecap='round' opacity='.7'/%3E%3Cg transform='rotate(-22 26 189)'%3E%3Crect x='12.5' y='183' width='27' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M12.5 183 L39.5 183 L39.5 188 L12.5 188 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='17.5' cy='198' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='33.5' cy='198' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='17.5' cy='198' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='33.5' cy='198' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(3 74 192)'%3E%3Crect x='60.5' y='186' width='27' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M60.5 186 L87.5 186 L87.5 191 L60.5 191 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='65.5' cy='201' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='81.5' cy='201' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='65.5' cy='201' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='81.5' cy='201' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='60' cy='118' rx='78' ry='98' fill='url(%23g1)'/%3E%3Cpath d='M68 62 Q76 92 72 116 L50 114 Q50 88 54 64 Z' fill='%23ffd23f'/%3E%3Cpath d='M68 62 Q76 92 72 116 L62 115 Q64 88 61 63 Z' fill='%23c99a1f'/%3E%3Cpath d='M59 64 L61 114' stroke='%232b0d24' stroke-width='1.5'/%3E%3Cpath d='M50 110 L72 112 L72 118 L50 116 Z' fill='%237b2fbf'/%3E%3Cpath d='M51 86 L72 88' stroke='%237b2fbf' stroke-width='4'/%3E%3Cpath d='M54 68 Q38 58 27 42' stroke='%23ffd23f' stroke-width='11' fill='none' stroke-linecap='round'/%3E%3Cpath d='M31 48 Q29 45 27 42' stroke='%237b2fbf' stroke-width='11' fill='none' stroke-linecap='round'/%3E%3Cellipse cx='23' cy='32' rx='5.5' ry='7' fill='%234a1a42' transform='rotate(-30 23 32)'/%3E%3Cpath d='M18 37 L14 33' stroke='%234a1a42' stroke-width='3.4' fill='none' stroke-linecap='round'/%3E%3Cpath d='M66 68 Q80 88 88 102' stroke='%23c99a1f' stroke-width='10' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='91' cy='107' r='4.5' fill='%234a1a42'/%3E%3Ccircle cx='62' cy='38' r='12' fill='%234a1a42'/%3E%3Ccircle cx='56' cy='28' r='7' fill='%233d1336'/%3E%3Ccircle cx='66' cy='26' r='7.5' fill='%233d1336'/%3E%3Ccircle cx='74' cy='33' r='6' fill='%233d1336'/%3E%3Cpath d='M50 36 Q62 30 75 35 L75 40 Q62 35 50 41 Z' fill='%23fff3fb'/%3E%3Cpath d='M75 37 Q84 34 88 30' stroke='%23fff3fb' stroke-width='3' fill='none' stroke-linecap='round'/%3E%3Cpath d='M52 64 Q37 55 26 39' stroke='%23fff0b0' stroke-width='1.6' fill='none' stroke-linecap='round' opacity='.9'/%3E%3C/svg%3E"); }
  25%, 49.99%  { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='58' cy='214' rx='50' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M50 112 L74 114 L72 124 L52 122 Z' fill='%234e1c7e'/%3E%3Cpath d='M56 118 Q52 146 48 188' stroke='%237b2fbf' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M56 118 Q52 146 50 167' stroke='%234e1c7e' stroke-width='5' fill='none' stroke-linecap='round' opacity='.7'/%3E%3Cpath d='M72 120 Q74 148 74 190' stroke='%237b2fbf' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M72 120 Q74 148 74 169' stroke='%234e1c7e' stroke-width='5' fill='none' stroke-linecap='round' opacity='.7'/%3E%3Cg transform='rotate(-4 48 191)'%3E%3Crect x='34.5' y='185' width='27' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M34.5 185 L61.5 185 L61.5 190 L34.5 190 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='39.5' cy='200' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='55.5' cy='200' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='39.5' cy='200' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='55.5' cy='200' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(2 74 193)'%3E%3Crect x='60.5' y='187' width='27' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M60.5 187 L87.5 187 L87.5 192 L60.5 192 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='65.5' cy='202' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='81.5' cy='202' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='65.5' cy='202' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='81.5' cy='202' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='60' cy='118' rx='78' ry='98' fill='url(%23g1)'/%3E%3Cpath d='M68 62 Q76 92 72 116 L50 114 Q50 88 54 64 Z' fill='%23ffd23f'/%3E%3Cpath d='M68 62 Q76 92 72 116 L62 115 Q64 88 61 63 Z' fill='%23c99a1f'/%3E%3Cpath d='M59 64 L61 114' stroke='%232b0d24' stroke-width='1.5'/%3E%3Cpath d='M50 110 L72 112 L72 118 L50 116 Z' fill='%237b2fbf'/%3E%3Cpath d='M51 86 L72 88' stroke='%237b2fbf' stroke-width='4'/%3E%3Cpath d='M54 68 Q38 58 27 42' stroke='%23ffd23f' stroke-width='11' fill='none' stroke-linecap='round'/%3E%3Cpath d='M31 48 Q29 45 27 42' stroke='%237b2fbf' stroke-width='11' fill='none' stroke-linecap='round'/%3E%3Cellipse cx='23' cy='32' rx='5.5' ry='7' fill='%234a1a42' transform='rotate(-30 23 32)'/%3E%3Cpath d='M18 37 L14 33' stroke='%234a1a42' stroke-width='3.4' fill='none' stroke-linecap='round'/%3E%3Cpath d='M66 68 Q80 88 88 102' stroke='%23c99a1f' stroke-width='10' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='91' cy='107' r='4.5' fill='%234a1a42'/%3E%3Ccircle cx='62' cy='38' r='12' fill='%234a1a42'/%3E%3Ccircle cx='56' cy='28' r='7' fill='%233d1336'/%3E%3Ccircle cx='66' cy='26' r='7.5' fill='%233d1336'/%3E%3Ccircle cx='74' cy='33' r='6' fill='%233d1336'/%3E%3Cpath d='M50 36 Q62 30 75 35 L75 40 Q62 35 50 41 Z' fill='%23fff3fb'/%3E%3Cpath d='M75 37 Q84 34 88 30' stroke='%23fff3fb' stroke-width='3' fill='none' stroke-linecap='round'/%3E%3Cpath d='M52 64 Q37 55 26 39' stroke='%23fff0b0' stroke-width='1.6' fill='none' stroke-linecap='round' opacity='.9'/%3E%3C/svg%3E"); }
  50%, 74.99%  { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='58' cy='214' rx='50' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M50 112 L74 114 L72 124 L52 122 Z' fill='%234e1c7e'/%3E%3Cpath d='M56 118 Q56 146 52 188' stroke='%237b2fbf' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M56 118 Q56 146 54 167' stroke='%234e1c7e' stroke-width='5' fill='none' stroke-linecap='round' opacity='.7'/%3E%3Cpath d='M72 120 Q88 146 100 186' stroke='%237b2fbf' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M72 120 Q88 146 94 166' stroke='%234e1c7e' stroke-width='5' fill='none' stroke-linecap='round' opacity='.7'/%3E%3Cg transform='rotate(-2 52 190)'%3E%3Crect x='38.5' y='184' width='27' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M38.5 184 L65.5 184 L65.5 189 L38.5 189 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='43.5' cy='199' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='59.5' cy='199' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='43.5' cy='199' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='59.5' cy='199' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(20 100 190)'%3E%3Crect x='86.5' y='184' width='27' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M86.5 184 L113.5 184 L113.5 189 L86.5 189 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='91.5' cy='199' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='107.5' cy='199' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='91.5' cy='199' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='107.5' cy='199' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='60' cy='118' rx='78' ry='98' fill='url(%23g1)'/%3E%3Cpath d='M68 62 Q76 92 72 116 L50 114 Q50 88 54 64 Z' fill='%23ffd23f'/%3E%3Cpath d='M68 62 Q76 92 72 116 L62 115 Q64 88 61 63 Z' fill='%23c99a1f'/%3E%3Cpath d='M59 64 L61 114' stroke='%232b0d24' stroke-width='1.5'/%3E%3Cpath d='M50 110 L72 112 L72 118 L50 116 Z' fill='%237b2fbf'/%3E%3Cpath d='M51 86 L72 88' stroke='%237b2fbf' stroke-width='4'/%3E%3Cpath d='M54 68 Q38 58 27 42' stroke='%23ffd23f' stroke-width='11' fill='none' stroke-linecap='round'/%3E%3Cpath d='M31 48 Q29 45 27 42' stroke='%237b2fbf' stroke-width='11' fill='none' stroke-linecap='round'/%3E%3Cellipse cx='23' cy='32' rx='5.5' ry='7' fill='%234a1a42' transform='rotate(-30 23 32)'/%3E%3Cpath d='M18 37 L14 33' stroke='%234a1a42' stroke-width='3.4' fill='none' stroke-linecap='round'/%3E%3Cpath d='M66 68 Q80 88 88 102' stroke='%23c99a1f' stroke-width='10' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='91' cy='107' r='4.5' fill='%234a1a42'/%3E%3Ccircle cx='62' cy='38' r='12' fill='%234a1a42'/%3E%3Ccircle cx='56' cy='28' r='7' fill='%233d1336'/%3E%3Ccircle cx='66' cy='26' r='7.5' fill='%233d1336'/%3E%3Ccircle cx='74' cy='33' r='6' fill='%233d1336'/%3E%3Cpath d='M50 36 Q62 30 75 35 L75 40 Q62 35 50 41 Z' fill='%23fff3fb'/%3E%3Cpath d='M75 37 Q84 34 88 30' stroke='%23fff3fb' stroke-width='3' fill='none' stroke-linecap='round'/%3E%3Cpath d='M52 64 Q37 55 26 39' stroke='%23fff0b0' stroke-width='1.6' fill='none' stroke-linecap='round' opacity='.9'/%3E%3C/svg%3E"); }
  75%, 100%    { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='58' cy='214' rx='50' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M50 112 L74 114 L72 124 L52 122 Z' fill='%234e1c7e'/%3E%3Cpath d='M56 118 Q46 146 36 188' stroke='%237b2fbf' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M56 118 Q46 146 41 167' stroke='%234e1c7e' stroke-width='5' fill='none' stroke-linecap='round' opacity='.7'/%3E%3Cpath d='M72 120 Q82 148 88 190' stroke='%237b2fbf' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M72 120 Q82 148 85 169' stroke='%234e1c7e' stroke-width='5' fill='none' stroke-linecap='round' opacity='.7'/%3E%3Cg transform='rotate(-14 36 190)'%3E%3Crect x='22.5' y='184' width='27' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M22.5 184 L49.5 184 L49.5 189 L22.5 189 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='27.5' cy='199' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='43.5' cy='199' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='27.5' cy='199' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='43.5' cy='199' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(11 88 192)'%3E%3Crect x='74.5' y='186' width='27' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M74.5 186 L101.5 186 L101.5 191 L74.5 191 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='79.5' cy='201' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='95.5' cy='201' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='79.5' cy='201' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='95.5' cy='201' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='60' cy='118' rx='78' ry='98' fill='url(%23g1)'/%3E%3Cpath d='M68 62 Q76 92 72 116 L50 114 Q50 88 54 64 Z' fill='%23ffd23f'/%3E%3Cpath d='M68 62 Q76 92 72 116 L62 115 Q64 88 61 63 Z' fill='%23c99a1f'/%3E%3Cpath d='M59 64 L61 114' stroke='%232b0d24' stroke-width='1.5'/%3E%3Cpath d='M50 110 L72 112 L72 118 L50 116 Z' fill='%237b2fbf'/%3E%3Cpath d='M51 86 L72 88' stroke='%237b2fbf' stroke-width='4'/%3E%3Cpath d='M54 68 Q38 58 27 42' stroke='%23ffd23f' stroke-width='11' fill='none' stroke-linecap='round'/%3E%3Cpath d='M31 48 Q29 45 27 42' stroke='%237b2fbf' stroke-width='11' fill='none' stroke-linecap='round'/%3E%3Cellipse cx='23' cy='32' rx='5.5' ry='7' fill='%234a1a42' transform='rotate(-30 23 32)'/%3E%3Cpath d='M18 37 L14 33' stroke='%234a1a42' stroke-width='3.4' fill='none' stroke-linecap='round'/%3E%3Cpath d='M66 68 Q80 88 88 102' stroke='%23c99a1f' stroke-width='10' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='91' cy='107' r='4.5' fill='%234a1a42'/%3E%3Ccircle cx='62' cy='38' r='12' fill='%234a1a42'/%3E%3Ccircle cx='56' cy='28' r='7' fill='%233d1336'/%3E%3Ccircle cx='66' cy='26' r='7.5' fill='%233d1336'/%3E%3Ccircle cx='74' cy='33' r='6' fill='%233d1336'/%3E%3Cpath d='M50 36 Q62 30 75 35 L75 40 Q62 35 50 41 Z' fill='%23fff3fb'/%3E%3Cpath d='M75 37 Q84 34 88 30' stroke='%23fff3fb' stroke-width='3' fill='none' stroke-linecap='round'/%3E%3Cpath d='M52 64 Q37 55 26 39' stroke='%23fff0b0' stroke-width='1.6' fill='none' stroke-linecap='round' opacity='.9'/%3E%3C/svg%3E"); }
}

/* ===== NEW CAST GLIDE PATHS — same 36s master clock, staged crossings ===== */
/* NOVA: enters left, forms the conga train behind Rico (t=6-16, near-lane
   left third), drifts to mid-floor, ORBITS Rico at t=38 (arcs up-and-over
   his straight line — the spin-around), sweeps right, HIGH-FIVE with Jinx at
   t=68 (62vw), then falls into the side-by-side glide with Jinx at t=90. */
@keyframes roller-disco-nova {
  0%     { transform: translate3d(-9vw, 80vh, 0) rotate(0deg) scale(0.84); }
  6%     { transform: translate3d(2vw, 84vh, 0) rotate(6deg) scale(0.9); }
  11%    { transform: translate3d(12vw, 87vh, 0) rotate(4deg) scale(0.94); }
  16%    { transform: translate3d(18vw, 88vh, 0) rotate(-3deg) scale(0.98); }
  24%    { transform: translate3d(26vw, 84vh, 0) rotate(-6deg) scale(0.9); }
  31%    { transform: translate3d(33vw, 79vh, 0) rotate(5deg) scale(0.8); }
  36%    { transform: translate3d(37vw, 75vh, 0) rotate(12deg) scale(0.72); }
  38%    { transform: translate3d(41vw, 72.5vh, 0) rotate(16deg) scale(0.68); }
  40%    { transform: translate3d(46vw, 74vh, 0) rotate(6deg) scale(0.71); }
  44%    { transform: translate3d(50vw, 79vh, 0) rotate(-6deg) scale(0.8); }
  50%    { transform: translate3d(55vw, 84vh, 0) rotate(-4deg) scale(0.9); }
  58%    { transform: translate3d(59vw, 88vh, 0) rotate(5deg) scale(0.98); }
  64%    { transform: translate3d(61vw, 90vh, 0) rotate(3deg) scale(1.02); }
  68%    { transform: translate3d(62vw, 90.5vh, 0) rotate(-7deg) scale(1.03); }
  73%    { transform: translate3d(60vw, 88vh, 0) rotate(6deg) scale(0.99); }
  80%    { transform: translate3d(58vw, 86vh, 0) rotate(-3deg) scale(0.95); }
  86%    { transform: translate3d(57vw, 87vh, 0) rotate(2deg) scale(0.97); }
  90%    { transform: translate3d(57vw, 89vh, 0) rotate(3deg) scale(1.0); }
  95%    { transform: translate3d(52vw, 86vh, 0) rotate(-4deg) scale(0.94); }
  97.99% { transform: translate3d(46vw, 83vh, 0) rotate(0deg) scale(0.88); }
  98%    { transform: translate3d(-20vw, 78vh, 0) rotate(0deg) scale(0.8); }
  100%   { transform: translate3d(-9vw, 80vh, 0) rotate(0deg) scale(0.84); }
}
/* RICO: heads the conga train (enters left just ahead of Nova/Jinx, t=4-16),
   holds a near-straight glide across the mid-floor so Nova can orbit him at
   t=38, curls out toward the rail, then RUSHES back for the double-swerve
   near-collision with Jinx at t=75 (48vw) — both fling arms up, swerve apart.
   Faces LEFT most of the lap (scaleX -1); flips off-screen. */
@keyframes roller-disco-rico {
  0%     { transform: translate3d(-10vw, 76vh, 0) rotate(0deg) scale(-0.76, 0.76); }
  4%     { transform: translate3d(2vw, 80vh, 0) rotate(-4deg) scale(-0.82, 0.82); }
  10%    { transform: translate3d(14vw, 84vh, 0) rotate(4deg) scale(-0.9, 0.9); }
  16%    { transform: translate3d(24vw, 86vh, 0) rotate(-3deg) scale(-0.95, 0.95); }
  24%    { transform: translate3d(30vw, 84vh, 0) rotate(3deg) scale(-0.9, 0.9); }
  31%    { transform: translate3d(32vw, 79vh, 0) rotate(-3deg) scale(-0.82, 0.82); }
  38%    { transform: translate3d(40vw, 75vh, 0) rotate(2deg) scale(-0.74, 0.74); }
  45%    { transform: translate3d(47vw, 71vh, 0) rotate(-4deg) scale(-0.66, 0.66); }
  53%    { transform: translate3d(53vw, 69vh, 0) rotate(3deg) scale(-0.62, 0.62); }
  61%    { transform: translate3d(58vw, 71vh, 0) rotate(-3deg) scale(-0.66, 0.66); }
  68%    { transform: translate3d(60vw, 76vh, 0) rotate(5deg) scale(-0.78, 0.78); }
  72%    { transform: translate3d(55vw, 81vh, 0) rotate(-10deg) scale(-0.88, 0.88); }
  75%    { transform: translate3d(49vw, 84vh, 0) rotate(-22deg) scale(-0.94, 0.94); }
  78%    { transform: translate3d(42vw, 85vh, 0) rotate(-9deg) scale(-0.96, 0.96); }
  84%    { transform: translate3d(33vw, 82vh, 0) rotate(5deg) scale(-0.9, 0.9); }
  90%    { transform: translate3d(22vw, 78vh, 0) rotate(-4deg) scale(-0.82, 0.82); }
  95%    { transform: translate3d(9vw, 74vh, 0) rotate(3deg) scale(-0.74, 0.74); }
  97.99% { transform: translate3d(-2vw, 71vh, 0) rotate(0deg) scale(-0.69, 0.69); }
  98%    { transform: translate3d(-14vw, 72vh, 0) rotate(0deg) scale(-0.72, 0.72); }
  100%   { transform: translate3d(-14vw, 74vh, 0) rotate(0deg) scale(-0.74, 0.74); }
}
/* JINX: tails the conga train (enters left, t=8-18), sweeps mid-floor, then
   the busy stretch — HIGH-FIVE with Nova at t=68 (63vw, right of column), the
   whoa double-swerve with Rico at t=75 (rushes in from the right to 55vw,
   both fling up + swerve), then the synchronized side-by-side with Nova at
   t=90. Nearest-lane, largest scale (hero mover). Faces RIGHT. */
@keyframes roller-disco-jinx {
  0%     { transform: translate3d(-16vw, 79vh, 0) rotate(0deg) scale(0.82); }
  8%     { transform: translate3d(-4vw, 84vh, 0) rotate(5deg) scale(0.9); }
  13%    { transform: translate3d(4vw, 87vh, 0) rotate(3deg) scale(0.96); }
  18%    { transform: translate3d(12vw, 89vh, 0) rotate(-4deg) scale(1.0); }
  26%    { transform: translate3d(25vw, 89vh, 0) rotate(-5deg) scale(1.0); }
  34%    { transform: translate3d(36vw, 87vh, 0) rotate(6deg) scale(0.96); }
  42%    { transform: translate3d(47vw, 84vh, 0) rotate(-4deg) scale(0.9); }
  50%    { transform: translate3d(56vw, 83vh, 0) rotate(4deg) scale(0.89); }
  58%    { transform: translate3d(62vw, 86vh, 0) rotate(-5deg) scale(0.95); }
  64%    { transform: translate3d(64vw, 89vh, 0) rotate(4deg) scale(1.01); }
  68%    { transform: translate3d(64vw, 90.5vh, 0) rotate(9deg) scale(1.04); }
  71%    { transform: translate3d(66vw, 89vh, 0) rotate(4deg) scale(1.02); }
  73%    { transform: translate3d(65vw, 87vh, 0) rotate(-6deg) scale(0.99); }
  75%    { transform: translate3d(63vw, 85vh, 0) rotate(22deg) scale(0.96); }
  78%    { transform: translate3d(67vw, 86vh, 0) rotate(7deg) scale(0.98); }
  83%    { transform: translate3d(62vw, 88vh, 0) rotate(-4deg) scale(1.0); }
  90%    { transform: translate3d(61vw, 90vh, 0) rotate(3deg) scale(1.03); }
  95%    { transform: translate3d(66vw, 87vh, 0) rotate(-4deg) scale(0.98); }
  97.99% { transform: translate3d(74vw, 83vh, 0) rotate(0deg) scale(0.9); }
  98%    { transform: translate3d(112vw, 79vh, 0) rotate(0deg) scale(0.82); }
  100%   { transform: translate3d(-8vw, 77vh, 0) rotate(0deg) scale(0.8); }
}

/* NOVA legcycle: 4 discrete stride frames (A push / B gather /
   C opposite push / D recovery) swapped via background-image at ~2.5-3.2/s
   — the blessed small-sprite exception (150px box, background-image only,
   negligible repaint). Loop-closed; the glide-path transform runs alongside. */
@keyframes roller-disco-nova-legs {
  0%, 24.99%   { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='80' cy='214' rx='50' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M78 120 Q72 150 56 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M58.4 170.4 L56 190' stroke='%232ee6c8' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M78 120 Q72 150 64.0 170.0' stroke='%2359f0d8' stroke-width='4' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cpath d='M96 120 Q102 150 104 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M103.7 170.4 L104 190' stroke='%232ee6c8' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M96 120 Q102 150 103.0 170.0' stroke='%2359f0d8' stroke-width='4' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cg transform='rotate(-24 56 195)'%3E%3Crect x='43.0' y='189.0' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M43.0 189.0 L69.0 189.0 L69.0 194.0 L43.0 194.0 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='48.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='64.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='48.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='64.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(4 104 195)'%3E%3Crect x='91.0' y='189.0' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M91.0 189.0 L117.0 189.0 L117.0 194.0 L91.0 194.0 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='96.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='112.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='96.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='112.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='88' cy='120' rx='78' ry='98' fill='url(%23g1)'/%3E%3Cpath d='M92 66 Q100 88 96 108 L76 106 Q78 84 84 64 Z' fill='%23ff2d95'/%3E%3Cpath d='M92 66 Q98 82 96 100 L86 99 Q88 82 88 66 Z' fill='%23b3186b'/%3E%3Cpath d='M76 104 L98 106 L100 122 L74 120 Z' fill='%232ee6c8'/%3E%3Cpath d='M88 105 L98 106 L100 122 L90 121 Z' fill='%231a9e8b'/%3E%3Cpath d='M77 101 L97 103' stroke='%23c99a1f' stroke-width='0' /%3E%3Cpath d='M84 72 Q66 82 52 96' stroke='%2335102f' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='50' cy='98' r='4.5' fill='%2335102f'/%3E%3Cpath d='M94 70 Q116 66 136 72' stroke='%234a1a42' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='138' cy='73' r='4.8' fill='%234a1a42'/%3E%3Ccircle cx='92' cy='42' r='11.5' fill='%234a1a42'/%3E%3Cpath d='M83 40 Q80 26 92 24 Q104 26 101 42 Q96 34 88 34 Z' fill='%233d1336'/%3E%3Cpath d='M101 40 Q108 44 108 54 Q101 50 100 44 Z' fill='%233d1336'/%3E%3Cpath d='M93 66 Q99 84 96 104' stroke='%23ff8fc4' stroke-width='1.6' fill='none' stroke-linecap='round' opacity='.6'/%3E%3Cpath d='M85 26 Q92 22 100 27' stroke='%23ffd23f' stroke-width='1.6' fill='none' stroke-linecap='round' opacity='.7'/%3E%3Cpath d='M95 68 Q116 64 135 70' stroke='%23ffd23f' stroke-width='1.5' fill='none' stroke-linecap='round' opacity='.6'/%3E%3C/svg%3E"); }
  25%, 49.99%  { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='80' cy='214' rx='50' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M78 120 Q74 150 72 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M72.3 170.4 L72 190' stroke='%232ee6c8' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M78 120 Q74 150 73.0 170.0' stroke='%2359f0d8' stroke-width='4' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cpath d='M96 120 Q100 150 100 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M100.0 170.4 L100 190' stroke='%232ee6c8' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M96 120 Q100 150 100.0 170.0' stroke='%2359f0d8' stroke-width='4' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cg transform='rotate(-4 72 195)'%3E%3Crect x='59.0' y='189.0' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M59.0 189.0 L85.0 189.0 L85.0 194.0 L59.0 194.0 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='64.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='80.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='64.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='80.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(2 100 195)'%3E%3Crect x='87.0' y='189.0' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M87.0 189.0 L113.0 189.0 L113.0 194.0 L87.0 194.0 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='92.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='108.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='92.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='108.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='88' cy='120' rx='78' ry='98' fill='url(%23g1)'/%3E%3Cpath d='M92 66 Q100 88 96 108 L76 106 Q78 84 84 64 Z' fill='%23ff2d95'/%3E%3Cpath d='M92 66 Q98 82 96 100 L86 99 Q88 82 88 66 Z' fill='%23b3186b'/%3E%3Cpath d='M76 104 L98 106 L100 122 L74 120 Z' fill='%232ee6c8'/%3E%3Cpath d='M88 105 L98 106 L100 122 L90 121 Z' fill='%231a9e8b'/%3E%3Cpath d='M77 101 L97 103' stroke='%23c99a1f' stroke-width='0' /%3E%3Cpath d='M84 72 Q66 82 52 96' stroke='%2335102f' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='50' cy='98' r='4.5' fill='%2335102f'/%3E%3Cpath d='M94 70 Q116 66 136 72' stroke='%234a1a42' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='138' cy='73' r='4.8' fill='%234a1a42'/%3E%3Ccircle cx='92' cy='42' r='11.5' fill='%234a1a42'/%3E%3Cpath d='M83 40 Q80 26 92 24 Q104 26 101 42 Q96 34 88 34 Z' fill='%233d1336'/%3E%3Cpath d='M101 40 Q108 44 108 54 Q101 50 100 44 Z' fill='%233d1336'/%3E%3Cpath d='M93 66 Q99 84 96 104' stroke='%23ff8fc4' stroke-width='1.6' fill='none' stroke-linecap='round' opacity='.6'/%3E%3Cpath d='M85 26 Q92 22 100 27' stroke='%23ffd23f' stroke-width='1.6' fill='none' stroke-linecap='round' opacity='.7'/%3E%3Cpath d='M95 68 Q116 64 135 70' stroke='%23ffd23f' stroke-width='1.5' fill='none' stroke-linecap='round' opacity='.6'/%3E%3C/svg%3E"); }
  50%, 74.99%  { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='80' cy='214' rx='50' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M78 120 Q78 150 78 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M78.0 170.4 L78 190' stroke='%232ee6c8' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M78 120 Q78 150 78.0 170.0' stroke='%2359f0d8' stroke-width='4' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cpath d='M96 120 Q100 150 84 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M86.4 170.4 L84 190' stroke='%232ee6c8' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M96 120 Q100 150 92.0 170.0' stroke='%2359f0d8' stroke-width='4' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cg transform='rotate(6 78 195)'%3E%3Crect x='65.0' y='189.0' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M65.0 189.0 L91.0 189.0 L91.0 194.0 L65.0 194.0 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='70.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='86.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='70.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='86.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(-22 84 195)'%3E%3Crect x='71.0' y='189.0' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M71.0 189.0 L97.0 189.0 L97.0 194.0 L71.0 194.0 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='76.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='92.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='76.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='92.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='88' cy='120' rx='78' ry='98' fill='url(%23g1)'/%3E%3Cpath d='M92 66 Q100 88 96 108 L76 106 Q78 84 84 64 Z' fill='%23ff2d95'/%3E%3Cpath d='M92 66 Q98 82 96 100 L86 99 Q88 82 88 66 Z' fill='%23b3186b'/%3E%3Cpath d='M76 104 L98 106 L100 122 L74 120 Z' fill='%232ee6c8'/%3E%3Cpath d='M88 105 L98 106 L100 122 L90 121 Z' fill='%231a9e8b'/%3E%3Cpath d='M77 101 L97 103' stroke='%23c99a1f' stroke-width='0' /%3E%3Cpath d='M84 72 Q66 82 52 96' stroke='%2335102f' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='50' cy='98' r='4.5' fill='%2335102f'/%3E%3Cpath d='M94 70 Q116 66 136 72' stroke='%234a1a42' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='138' cy='73' r='4.8' fill='%234a1a42'/%3E%3Ccircle cx='92' cy='42' r='11.5' fill='%234a1a42'/%3E%3Cpath d='M83 40 Q80 26 92 24 Q104 26 101 42 Q96 34 88 34 Z' fill='%233d1336'/%3E%3Cpath d='M101 40 Q108 44 108 54 Q101 50 100 44 Z' fill='%233d1336'/%3E%3Cpath d='M93 66 Q99 84 96 104' stroke='%23ff8fc4' stroke-width='1.6' fill='none' stroke-linecap='round' opacity='.6'/%3E%3Cpath d='M85 26 Q92 22 100 27' stroke='%23ffd23f' stroke-width='1.6' fill='none' stroke-linecap='round' opacity='.7'/%3E%3Cpath d='M95 68 Q116 64 135 70' stroke='%23ffd23f' stroke-width='1.5' fill='none' stroke-linecap='round' opacity='.6'/%3E%3C/svg%3E"); }
  75%, 100%    { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='80' cy='214' rx='50' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M78 120 Q76 150 74 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M74.3 170.4 L74 190' stroke='%232ee6c8' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M78 120 Q76 150 75.0 170.0' stroke='%2359f0d8' stroke-width='4' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cpath d='M96 120 Q98 150 96 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M96.3 170.4 L96 190' stroke='%232ee6c8' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M96 120 Q98 150 97.0 170.0' stroke='%2359f0d8' stroke-width='4' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cg transform='rotate(-2 74 195)'%3E%3Crect x='61.0' y='189.0' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M61.0 189.0 L87.0 189.0 L87.0 194.0 L61.0 194.0 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='66.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='82.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='66.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='82.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(-3 96 195)'%3E%3Crect x='83.0' y='189.0' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M83.0 189.0 L109.0 189.0 L109.0 194.0 L83.0 194.0 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='88.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='104.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='88.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='104.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='88' cy='120' rx='78' ry='98' fill='url(%23g1)'/%3E%3Cpath d='M92 66 Q100 88 96 108 L76 106 Q78 84 84 64 Z' fill='%23ff2d95'/%3E%3Cpath d='M92 66 Q98 82 96 100 L86 99 Q88 82 88 66 Z' fill='%23b3186b'/%3E%3Cpath d='M76 104 L98 106 L100 122 L74 120 Z' fill='%232ee6c8'/%3E%3Cpath d='M88 105 L98 106 L100 122 L90 121 Z' fill='%231a9e8b'/%3E%3Cpath d='M77 101 L97 103' stroke='%23c99a1f' stroke-width='0' /%3E%3Cpath d='M84 72 Q66 82 52 96' stroke='%2335102f' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='50' cy='98' r='4.5' fill='%2335102f'/%3E%3Cpath d='M94 70 Q116 66 136 72' stroke='%234a1a42' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='138' cy='73' r='4.8' fill='%234a1a42'/%3E%3Ccircle cx='92' cy='42' r='11.5' fill='%234a1a42'/%3E%3Cpath d='M83 40 Q80 26 92 24 Q104 26 101 42 Q96 34 88 34 Z' fill='%233d1336'/%3E%3Cpath d='M101 40 Q108 44 108 54 Q101 50 100 44 Z' fill='%233d1336'/%3E%3Cpath d='M93 66 Q99 84 96 104' stroke='%23ff8fc4' stroke-width='1.6' fill='none' stroke-linecap='round' opacity='.6'/%3E%3Cpath d='M85 26 Q92 22 100 27' stroke='%23ffd23f' stroke-width='1.6' fill='none' stroke-linecap='round' opacity='.7'/%3E%3Cpath d='M95 68 Q116 64 135 70' stroke='%23ffd23f' stroke-width='1.5' fill='none' stroke-linecap='round' opacity='.6'/%3E%3C/svg%3E"); }
}
/* RICO legcycle: 4 discrete stride frames (A push / B gather /
   C opposite push / D recovery) swapped via background-image at ~2.5-3.2/s
   — the blessed small-sprite exception (150px box, background-image only,
   negligible repaint). Loop-closed; the glide-path transform runs alongside. */
@keyframes roller-disco-rico-legs {
  0%, 24.99%   { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='68' cy='214' rx='50' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M58 120 Q52 150 36 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M38.4 169.0 L36 190' stroke='%237b2fbf' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M58 120 Q52 150 44.0 170.0' stroke='%23a259e0' stroke-width='4' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cpath d='M76 120 Q82 150 84 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M83.7 169.0 L84 190' stroke='%237b2fbf' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M76 120 Q82 150 83.0 170.0' stroke='%23a259e0' stroke-width='4' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cg transform='rotate(-24 36 195)'%3E%3Crect x='23.0' y='189.0' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M23.0 189.0 L49.0 189.0 L49.0 194.0 L23.0 194.0 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='28.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='44.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='28.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='44.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(4 84 195)'%3E%3Crect x='71.0' y='189.0' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M71.0 189.0 L97.0 189.0 L97.0 194.0 L71.0 194.0 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='76.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='92.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='76.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='92.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='68' cy='120' rx='78' ry='98' fill='url(%23g1)'/%3E%3Cpath d='M60 64 Q52 88 58 108 L80 106 Q76 84 72 64 Z' fill='%237b2fbf'/%3E%3Cpath d='M60 64 Q54 84 58 104 L68 103 Q64 84 66 64 Z' fill='%234e1c7e'/%3E%3Cpath d='M58 104 L80 106 L82 122 L56 120 Z' fill='%23ffd23f'/%3E%3Cpath d='M58 104 L68 105 L70 121 L56 120 Z' fill='%23c99a1f'/%3E%3Cpath d='M66 70 Q50 66 40 52' stroke='%234a1a42' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='38' cy='50' r='4.8' fill='%234a1a42'/%3E%3Cpath d='M74 72 Q92 80 104 92' stroke='%2335102f' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='106' cy='94' r='4.5' fill='%2335102f'/%3E%3Ccircle cx='62' cy='42' r='11.5' fill='%234a1a42'/%3E%3Cpath d='M50 40 Q52 26 62 25 Q73 26 74 40 Z' fill='%23ff2d95'/%3E%3Cpath d='M50 39 L74 39 L74 44 L50 44 Z' fill='%23b3186b'/%3E%3Ccircle cx='62' cy='24' r='3' fill='%23ffd23f'/%3E%3Cpath d='M59 66 Q54 86 58 104' stroke='%23a259e0' stroke-width='1.6' fill='none' stroke-linecap='round' opacity='.55'/%3E%3Cpath d='M52 40 Q62 36 72 40' stroke='%23ff8fc4' stroke-width='1.5' fill='none' stroke-linecap='round' opacity='.6'/%3E%3Cpath d='M67 72 Q90 80 103 91' stroke='%23ffd23f' stroke-width='1.4' fill='none' stroke-linecap='round' opacity='.5'/%3E%3C/svg%3E"); }
  25%, 49.99%  { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='68' cy='214' rx='50' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M58 120 Q54 150 52 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M52.3 169.0 L52 190' stroke='%237b2fbf' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M58 120 Q54 150 53.0 170.0' stroke='%23a259e0' stroke-width='4' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cpath d='M76 120 Q80 150 80 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M80.0 169.0 L80 190' stroke='%237b2fbf' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M76 120 Q80 150 80.0 170.0' stroke='%23a259e0' stroke-width='4' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cg transform='rotate(-4 52 195)'%3E%3Crect x='39.0' y='189.0' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M39.0 189.0 L65.0 189.0 L65.0 194.0 L39.0 194.0 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='44.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='60.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='44.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='60.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(2 80 195)'%3E%3Crect x='67.0' y='189.0' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M67.0 189.0 L93.0 189.0 L93.0 194.0 L67.0 194.0 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='72.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='88.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='72.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='88.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='68' cy='120' rx='78' ry='98' fill='url(%23g1)'/%3E%3Cpath d='M60 64 Q52 88 58 108 L80 106 Q76 84 72 64 Z' fill='%237b2fbf'/%3E%3Cpath d='M60 64 Q54 84 58 104 L68 103 Q64 84 66 64 Z' fill='%234e1c7e'/%3E%3Cpath d='M58 104 L80 106 L82 122 L56 120 Z' fill='%23ffd23f'/%3E%3Cpath d='M58 104 L68 105 L70 121 L56 120 Z' fill='%23c99a1f'/%3E%3Cpath d='M66 70 Q50 66 40 52' stroke='%234a1a42' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='38' cy='50' r='4.8' fill='%234a1a42'/%3E%3Cpath d='M74 72 Q92 80 104 92' stroke='%2335102f' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='106' cy='94' r='4.5' fill='%2335102f'/%3E%3Ccircle cx='62' cy='42' r='11.5' fill='%234a1a42'/%3E%3Cpath d='M50 40 Q52 26 62 25 Q73 26 74 40 Z' fill='%23ff2d95'/%3E%3Cpath d='M50 39 L74 39 L74 44 L50 44 Z' fill='%23b3186b'/%3E%3Ccircle cx='62' cy='24' r='3' fill='%23ffd23f'/%3E%3Cpath d='M59 66 Q54 86 58 104' stroke='%23a259e0' stroke-width='1.6' fill='none' stroke-linecap='round' opacity='.55'/%3E%3Cpath d='M52 40 Q62 36 72 40' stroke='%23ff8fc4' stroke-width='1.5' fill='none' stroke-linecap='round' opacity='.6'/%3E%3Cpath d='M67 72 Q90 80 103 91' stroke='%23ffd23f' stroke-width='1.4' fill='none' stroke-linecap='round' opacity='.5'/%3E%3C/svg%3E"); }
  50%, 74.99%  { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='68' cy='214' rx='50' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M58 120 Q58 150 58 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M58.0 169.0 L58 190' stroke='%237b2fbf' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M58 120 Q58 150 58.0 170.0' stroke='%23a259e0' stroke-width='4' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cpath d='M76 120 Q80 150 64 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M66.4 169.0 L64 190' stroke='%237b2fbf' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M76 120 Q80 150 72.0 170.0' stroke='%23a259e0' stroke-width='4' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cg transform='rotate(6 58 195)'%3E%3Crect x='45.0' y='189.0' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M45.0 189.0 L71.0 189.0 L71.0 194.0 L45.0 194.0 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='50.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='66.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='50.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='66.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(-22 64 195)'%3E%3Crect x='51.0' y='189.0' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M51.0 189.0 L77.0 189.0 L77.0 194.0 L51.0 194.0 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='56.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='72.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='56.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='72.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='68' cy='120' rx='78' ry='98' fill='url(%23g1)'/%3E%3Cpath d='M60 64 Q52 88 58 108 L80 106 Q76 84 72 64 Z' fill='%237b2fbf'/%3E%3Cpath d='M60 64 Q54 84 58 104 L68 103 Q64 84 66 64 Z' fill='%234e1c7e'/%3E%3Cpath d='M58 104 L80 106 L82 122 L56 120 Z' fill='%23ffd23f'/%3E%3Cpath d='M58 104 L68 105 L70 121 L56 120 Z' fill='%23c99a1f'/%3E%3Cpath d='M66 70 Q50 66 40 52' stroke='%234a1a42' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='38' cy='50' r='4.8' fill='%234a1a42'/%3E%3Cpath d='M74 72 Q92 80 104 92' stroke='%2335102f' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='106' cy='94' r='4.5' fill='%2335102f'/%3E%3Ccircle cx='62' cy='42' r='11.5' fill='%234a1a42'/%3E%3Cpath d='M50 40 Q52 26 62 25 Q73 26 74 40 Z' fill='%23ff2d95'/%3E%3Cpath d='M50 39 L74 39 L74 44 L50 44 Z' fill='%23b3186b'/%3E%3Ccircle cx='62' cy='24' r='3' fill='%23ffd23f'/%3E%3Cpath d='M59 66 Q54 86 58 104' stroke='%23a259e0' stroke-width='1.6' fill='none' stroke-linecap='round' opacity='.55'/%3E%3Cpath d='M52 40 Q62 36 72 40' stroke='%23ff8fc4' stroke-width='1.5' fill='none' stroke-linecap='round' opacity='.6'/%3E%3Cpath d='M67 72 Q90 80 103 91' stroke='%23ffd23f' stroke-width='1.4' fill='none' stroke-linecap='round' opacity='.5'/%3E%3C/svg%3E"); }
  75%, 100%    { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='68' cy='214' rx='50' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M58 120 Q56 150 54 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M54.3 169.0 L54 190' stroke='%237b2fbf' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M58 120 Q56 150 55.0 170.0' stroke='%23a259e0' stroke-width='4' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cpath d='M76 120 Q78 150 76 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M76.3 169.0 L76 190' stroke='%237b2fbf' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M76 120 Q78 150 77.0 170.0' stroke='%23a259e0' stroke-width='4' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cg transform='rotate(-2 54 195)'%3E%3Crect x='41.0' y='189.0' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M41.0 189.0 L67.0 189.0 L67.0 194.0 L41.0 194.0 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='46.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='62.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='46.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='62.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(-3 76 195)'%3E%3Crect x='63.0' y='189.0' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M63.0 189.0 L89.0 189.0 L89.0 194.0 L63.0 194.0 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='68.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='84.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='68.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='84.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='68' cy='120' rx='78' ry='98' fill='url(%23g1)'/%3E%3Cpath d='M60 64 Q52 88 58 108 L80 106 Q76 84 72 64 Z' fill='%237b2fbf'/%3E%3Cpath d='M60 64 Q54 84 58 104 L68 103 Q64 84 66 64 Z' fill='%234e1c7e'/%3E%3Cpath d='M58 104 L80 106 L82 122 L56 120 Z' fill='%23ffd23f'/%3E%3Cpath d='M58 104 L68 105 L70 121 L56 120 Z' fill='%23c99a1f'/%3E%3Cpath d='M66 70 Q50 66 40 52' stroke='%234a1a42' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='38' cy='50' r='4.8' fill='%234a1a42'/%3E%3Cpath d='M74 72 Q92 80 104 92' stroke='%2335102f' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='106' cy='94' r='4.5' fill='%2335102f'/%3E%3Ccircle cx='62' cy='42' r='11.5' fill='%234a1a42'/%3E%3Cpath d='M50 40 Q52 26 62 25 Q73 26 74 40 Z' fill='%23ff2d95'/%3E%3Cpath d='M50 39 L74 39 L74 44 L50 44 Z' fill='%23b3186b'/%3E%3Ccircle cx='62' cy='24' r='3' fill='%23ffd23f'/%3E%3Cpath d='M59 66 Q54 86 58 104' stroke='%23a259e0' stroke-width='1.6' fill='none' stroke-linecap='round' opacity='.55'/%3E%3Cpath d='M52 40 Q62 36 72 40' stroke='%23ff8fc4' stroke-width='1.5' fill='none' stroke-linecap='round' opacity='.6'/%3E%3Cpath d='M67 72 Q90 80 103 91' stroke='%23ffd23f' stroke-width='1.4' fill='none' stroke-linecap='round' opacity='.5'/%3E%3C/svg%3E"); }
}
/* JINX legcycle: 4 discrete stride frames (A push / B gather /
   C opposite push / D recovery) swapped via background-image at ~2.5-3.2/s
   — the blessed small-sprite exception (150px box, background-image only,
   negligible repaint). Loop-closed; the glide-path transform runs alongside. */
@keyframes roller-disco-jinx-legs {
  0%, 24.99%   { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='84' cy='214' rx='48' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M76 122 Q70 150 54 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M56.4 171.0 L54 190' stroke='%23ff2d95' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M76 122 Q70 150 62.0 170.0' stroke='%23ff8fc4' stroke-width='4' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cpath d='M94 122 Q100 150 102 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M101.7 171.0 L102 190' stroke='%23ff2d95' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M94 122 Q100 150 101.0 170.0' stroke='%23ff8fc4' stroke-width='4' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cg transform='rotate(-24 54 195)'%3E%3Crect x='41.0' y='189.0' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M41.0 189.0 L67.0 189.0 L67.0 194.0 L41.0 194.0 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='46.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='62.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='46.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='62.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(4 102 195)'%3E%3Crect x='89.0' y='189.0' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M89.0 189.0 L115.0 189.0 L115.0 194.0 L89.0 194.0 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='94.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='110.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='94.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='110.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='88' cy='120' rx='78' ry='98' fill='url(%23g1)'/%3E%3Cpath d='M92 64 Q102 88 96 110 L74 108 Q78 86 84 64 Z' fill='%23ffd23f'/%3E%3Cpath d='M92 64 Q100 84 96 104 L86 103 Q88 84 88 64 Z' fill='%23c99a1f'/%3E%3Cpath d='M60 64 L61 108' stroke='%232b0d24' stroke-width='1.2'/%3E%3Cpath d='M74 104 L96 106 L96 112 L74 110 Z' fill='%23c99a1f'/%3E%3Cpath d='M84 68 Q72 52 66 34' stroke='%234a1a42' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='65' cy='31' r='4.8' fill='%234a1a42'/%3E%3Cpath d='M94 68 Q110 54 118 38' stroke='%234a1a42' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='120' cy='35' r='4.8' fill='%234a1a42'/%3E%3Ccircle cx='90' cy='44' r='11.5' fill='%234a1a42'/%3E%3Ccircle cx='78' cy='34' r='6.5' fill='%233d1336'/%3E%3Ccircle cx='102' cy='34' r='6.5' fill='%233d1336'/%3E%3Cellipse cx='78' cy='34' rx='3' ry='2' fill='%23ff2d95'/%3E%3Cellipse cx='102' cy='34' rx='3' ry='2' fill='%23ff2d95'/%3E%3Cpath d='M93 66 Q101 86 96 106' stroke='%23fff0b0' stroke-width='1.6' fill='none' stroke-linecap='round' opacity='.6'/%3E%3Cpath d='M84 26 Q90 22 96 26' stroke='%23ffd23f' stroke-width='1.5' fill='none' stroke-linecap='round' opacity='.6'/%3E%3C/svg%3E"); }
  25%, 49.99%  { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='84' cy='214' rx='48' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M76 122 Q72 150 70 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M70.3 171.0 L70 190' stroke='%23ff2d95' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M76 122 Q72 150 71.0 170.0' stroke='%23ff8fc4' stroke-width='4' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cpath d='M94 122 Q98 150 98 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M98.0 171.0 L98 190' stroke='%23ff2d95' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M94 122 Q98 150 98.0 170.0' stroke='%23ff8fc4' stroke-width='4' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cg transform='rotate(-4 70 195)'%3E%3Crect x='57.0' y='189.0' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M57.0 189.0 L83.0 189.0 L83.0 194.0 L57.0 194.0 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='62.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='78.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='62.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='78.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(2 98 195)'%3E%3Crect x='85.0' y='189.0' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M85.0 189.0 L111.0 189.0 L111.0 194.0 L85.0 194.0 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='90.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='106.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='90.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='106.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='88' cy='120' rx='78' ry='98' fill='url(%23g1)'/%3E%3Cpath d='M92 64 Q102 88 96 110 L74 108 Q78 86 84 64 Z' fill='%23ffd23f'/%3E%3Cpath d='M92 64 Q100 84 96 104 L86 103 Q88 84 88 64 Z' fill='%23c99a1f'/%3E%3Cpath d='M60 64 L61 108' stroke='%232b0d24' stroke-width='1.2'/%3E%3Cpath d='M74 104 L96 106 L96 112 L74 110 Z' fill='%23c99a1f'/%3E%3Cpath d='M84 68 Q72 52 66 34' stroke='%234a1a42' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='65' cy='31' r='4.8' fill='%234a1a42'/%3E%3Cpath d='M94 68 Q110 54 118 38' stroke='%234a1a42' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='120' cy='35' r='4.8' fill='%234a1a42'/%3E%3Ccircle cx='90' cy='44' r='11.5' fill='%234a1a42'/%3E%3Ccircle cx='78' cy='34' r='6.5' fill='%233d1336'/%3E%3Ccircle cx='102' cy='34' r='6.5' fill='%233d1336'/%3E%3Cellipse cx='78' cy='34' rx='3' ry='2' fill='%23ff2d95'/%3E%3Cellipse cx='102' cy='34' rx='3' ry='2' fill='%23ff2d95'/%3E%3Cpath d='M93 66 Q101 86 96 106' stroke='%23fff0b0' stroke-width='1.6' fill='none' stroke-linecap='round' opacity='.6'/%3E%3Cpath d='M84 26 Q90 22 96 26' stroke='%23ffd23f' stroke-width='1.5' fill='none' stroke-linecap='round' opacity='.6'/%3E%3C/svg%3E"); }
  50%, 74.99%  { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='84' cy='214' rx='48' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M76 122 Q76 150 76 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M76.0 171.0 L76 190' stroke='%23ff2d95' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M76 122 Q76 150 76.0 170.0' stroke='%23ff8fc4' stroke-width='4' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cpath d='M94 122 Q98 150 82 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M84.4 171.0 L82 190' stroke='%23ff2d95' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M94 122 Q98 150 90.0 170.0' stroke='%23ff8fc4' stroke-width='4' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cg transform='rotate(6 76 195)'%3E%3Crect x='63.0' y='189.0' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M63.0 189.0 L89.0 189.0 L89.0 194.0 L63.0 194.0 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='68.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='84.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='68.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='84.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(-22 82 195)'%3E%3Crect x='69.0' y='189.0' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M69.0 189.0 L95.0 189.0 L95.0 194.0 L69.0 194.0 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='74.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='90.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='74.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='90.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='88' cy='120' rx='78' ry='98' fill='url(%23g1)'/%3E%3Cpath d='M92 64 Q102 88 96 110 L74 108 Q78 86 84 64 Z' fill='%23ffd23f'/%3E%3Cpath d='M92 64 Q100 84 96 104 L86 103 Q88 84 88 64 Z' fill='%23c99a1f'/%3E%3Cpath d='M60 64 L61 108' stroke='%232b0d24' stroke-width='1.2'/%3E%3Cpath d='M74 104 L96 106 L96 112 L74 110 Z' fill='%23c99a1f'/%3E%3Cpath d='M84 68 Q72 52 66 34' stroke='%234a1a42' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='65' cy='31' r='4.8' fill='%234a1a42'/%3E%3Cpath d='M94 68 Q110 54 118 38' stroke='%234a1a42' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='120' cy='35' r='4.8' fill='%234a1a42'/%3E%3Ccircle cx='90' cy='44' r='11.5' fill='%234a1a42'/%3E%3Ccircle cx='78' cy='34' r='6.5' fill='%233d1336'/%3E%3Ccircle cx='102' cy='34' r='6.5' fill='%233d1336'/%3E%3Cellipse cx='78' cy='34' rx='3' ry='2' fill='%23ff2d95'/%3E%3Cellipse cx='102' cy='34' rx='3' ry='2' fill='%23ff2d95'/%3E%3Cpath d='M93 66 Q101 86 96 106' stroke='%23fff0b0' stroke-width='1.6' fill='none' stroke-linecap='round' opacity='.6'/%3E%3Cpath d='M84 26 Q90 22 96 26' stroke='%23ffd23f' stroke-width='1.5' fill='none' stroke-linecap='round' opacity='.6'/%3E%3C/svg%3E"); }
  75%, 100%    { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 170 230' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%23ff2d95' stop-opacity='.38'/%3E%3Cstop offset='.5' stop-color='%23c44bd9' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23c44bd9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='84' cy='214' rx='48' ry='6' fill='%23060210' opacity='.5'/%3E%3Cpath d='M76 122 Q74 150 72 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M72.3 171.0 L72 190' stroke='%23ff2d95' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M76 122 Q74 150 73.0 170.0' stroke='%23ff8fc4' stroke-width='4' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cpath d='M94 122 Q96 150 94 190' stroke='%234a1a42' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M94.3 171.0 L94 190' stroke='%23ff2d95' stroke-width='14' fill='none' stroke-linecap='round'/%3E%3Cpath d='M94 122 Q96 150 95.0 170.0' stroke='%23ff8fc4' stroke-width='4' fill='none' stroke-linecap='round' opacity='.45'/%3E%3Cg transform='rotate(-2 72 195)'%3E%3Crect x='59.0' y='189.0' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M59.0 189.0 L85.0 189.0 L85.0 194.0 L59.0 194.0 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='64.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='80.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='64.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='80.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cg transform='rotate(-3 94 195)'%3E%3Crect x='81.0' y='189.0' width='26' height='11' rx='5' fill='%23fff3fb'/%3E%3Cpath d='M81.0 189.0 L107.0 189.0 L107.0 194.0 L81.0 194.0 Z' fill='%23d9c3d3'/%3E%3Ccircle cx='86.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='102.0' cy='204.0' r='4.5' fill='%23ffd23f'/%3E%3Ccircle cx='86.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3Ccircle cx='102.0' cy='204.0' r='1.8' fill='%232b0d24'/%3E%3C/g%3E%3Cellipse cx='88' cy='120' rx='78' ry='98' fill='url(%23g1)'/%3E%3Cpath d='M92 64 Q102 88 96 110 L74 108 Q78 86 84 64 Z' fill='%23ffd23f'/%3E%3Cpath d='M92 64 Q100 84 96 104 L86 103 Q88 84 88 64 Z' fill='%23c99a1f'/%3E%3Cpath d='M60 64 L61 108' stroke='%232b0d24' stroke-width='1.2'/%3E%3Cpath d='M74 104 L96 106 L96 112 L74 110 Z' fill='%23c99a1f'/%3E%3Cpath d='M84 68 Q72 52 66 34' stroke='%234a1a42' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='65' cy='31' r='4.8' fill='%234a1a42'/%3E%3Cpath d='M94 68 Q110 54 118 38' stroke='%234a1a42' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='120' cy='35' r='4.8' fill='%234a1a42'/%3E%3Ccircle cx='90' cy='44' r='11.5' fill='%234a1a42'/%3E%3Ccircle cx='78' cy='34' r='6.5' fill='%233d1336'/%3E%3Ccircle cx='102' cy='34' r='6.5' fill='%233d1336'/%3E%3Cellipse cx='78' cy='34' rx='3' ry='2' fill='%23ff2d95'/%3E%3Cellipse cx='102' cy='34' rx='3' ry='2' fill='%23ff2d95'/%3E%3Cpath d='M93 66 Q101 86 96 106' stroke='%23fff0b0' stroke-width='1.6' fill='none' stroke-linecap='round' opacity='.6'/%3E%3Cpath d='M84 26 Q90 22 96 26' stroke='%23ffd23f' stroke-width='1.5' fill='none' stroke-linecap='round' opacity='.6'/%3E%3C/svg%3E"); }
}

/* ---- reduced motion: the rink settles — the cast parks VISIBLY in a
   group line at the rail (Comet, Roxy, Flash, Duke, left to right), the
   sparkle stays dark, pools hold their first position, no strobe, no
   zoom-pop ---- */
@media (prefers-reduced-motion: reduce) {
  head::before,
  head::after,
  head meta:first-of-type::before,
  head meta:last-of-type::before,
  head link::before,
  head meta:first-of-type::after,
  head meta:last-of-type::after,
  head link::after,
  body::before,
  .credits-block:nth-last-of-type(2) .credits-block__title,
  .credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
    animation: none;
  }
  head::before { transform: translate3d(22vw, 70.5vh, 0) scale(0.66); }
  head meta:first-of-type::before { transform: translate3d(40vw, 69.5vh, 0) scale(0.65); }
  head meta:last-of-type::before { transform: translate3d(60vw, 70.5vh, 0) scale(0.66); }
  head link::before { transform: translate3d(78vw, 69.5vh, 0) scale(0.65); }
  head meta:first-of-type::after { transform: translate3d(30vw, 84vh, 0) scale(0.9); }
  head meta:last-of-type::after { transform: translate3d(46vw, 82vh, 0) scale(-0.86, 0.86); }
  head link::after { transform: translate3d(90vw, 85vh, 0) scale(0.92); }
  head::after { opacity: 0; }
  .credits-slide {
    transform: none;
    transition: opacity 0.8s ease;
  }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--roller-disco-scenery:none;}",
};
