import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. Block Party: a 90s hip-hop block party at dusk — a boombox on the stoop against a brick wall tagged with a graffiti burner, names sprayed in marker on torn kraft-paper labels, the last raid crashing in as a SOUND CLASH. */
export const VARIANT: ThemeVariant = {
  key: "boombox",
  name: "Block Party — 90s Hip-Hop",
  css: `
/* ================================================================
   BLOCK PARTY — layered after the base theme.
   Fiction: 7:40 PM, a summer block party on the avenue. The sun has
   dropped behind the tenements and the streetlight just buzzed on
   warm orange over a brick wall someone spent all week burning a
   graffiti piece onto. A boombox the size of a suitcase sits on the
   stoop, lower-left, twin cones thumping; the open hydrant is misting
   the far corner gold; a string of party lights is strung wall to
   wall overhead. The credits are the flyer for the night — every
   section a torn kraft-paper label markered up and slapped on the
   bricks, every name a tag. The raid at the end is a SOUND CLASH:
   a second crew rolls up and the wall lights RED.
   Layer map (all scenery kill-switched via --boombox-scenery):
     html bg (--credits-bg)   dusk-over-brick wash (cheap: 1 radial glow
                              + 1 vertical gradient)
     html::before             THE WALL — running-bond brick (coarse SVG
                              tile, ~112x40px bricks, soft mortar),
                              streetlight pool upper-left, warm floor
                              bounce, vignette. STATIC, promoted
     html::after              THE BURNER — a "THE AVE" wildstyle piece
                              sprayed low-left on the wall behind the
                              boombox (dim, off the center lane), with
                              drop-shadow + highlight + arrow tails. SVG,
                              z:-2, static, promoted
     body::before             readability scrim down the center lane +
                              party-light string swagged across the top
                              (coarse bulbs, off-lane). STATIC, promoted
     body::after              THE BOOMBOX — hero SVG object lower-left:
                              chrome-bezel twin cones, cassette deck,
                              EQ sliders, carry handle, cast shadow.
                              STATIC, promoted, z:-1 (rides under names)
     head::before             ONE party-light bulb glow that breathes —
                              the only continuous mover (will-change: 1),
                              tiny, in the top-left swag
     head::after              spray-mist drifting off the boombox cone —
                              steps() drift, NOT continuous (no wc spent)
     head meta#1::before      the open FIRE HYDRANT lower-right, misting
                              gold. STATIC, promoted, foreground
     head meta#1::after       the CASSETTE bug, far upper-right corner —
                              its reels flip between 2 postures on steps()
                              (off-lane, NOT a continuous mover)
     head meta#2::before      tape-hiss speckle in the streetlight cone,
                              COARSE + off-lane (upper-left only). STATIC
     head meta#2::after       "BLOCK PARTY '9X" spray-stencil stamp in a
                              lower corner. STATIC
     .credits-roll::before    fine paper-grain that RIDES THE ROLL (the
     .credits-slideshow::before  only fine full-lane texture — zero
                              flicker because it tracks the glyphs)
   ================================================================ */
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Rubik+Mono+One&family=Archivo+Black&family=Barlow+Semi+Condensed:ital,wght@0,600;0,800;1,700&display=swap');

:root {
  --boombox-scenery: block; /* set to none to strip every scenery layer */
  /* ── palette: kraft, marker, chrome, streetlight ── */
  --bb-kraft: #d9b98a;       /* torn label paper */
  --bb-kraft-dk: #b8925c;
  --bb-cream: #f3ead6;       /* paper highlight / names */
  --bb-ink: #17120c;         /* marker black */
  --bb-red: #e0333a;         /* spray red */
  --bb-gold: #f5b93b;        /* streetlight / cassette gold */
  --bb-teal: #2fbfa8;        /* spray teal accent */
  --bb-brick: #7a2e26;       /* wall */

  /* ── base hooks ── */
  /* Cheap dusk: one warm streetlight bloom upper-left + a vertical wash
     from deep-dusk sky at the top down to warm sidewalk bounce at the
     floor (L3 — the brick texture + burner live on promoted pseudos). */
  --credits-bg:
    radial-gradient(ellipse 46% 40% at 16% 8%, rgba(245, 185, 59, 0.16) 0%, rgba(245, 185, 59, 0.04) 46%, rgba(20, 12, 8, 0) 72%),
    linear-gradient(180deg, #1a1310 0%, #241813 24%, #2c1c15 48%, #30201a 66%, #291a14 84%, #1c130f 100%);
  --credits-color: var(--bb-cream);
  --credits-accent: var(--bb-gold);
  --credits-font: "Barlow Semi Condensed", "Arial Narrow", "Helvetica Neue", sans-serif;
  --credits-title-font: "Permanent Marker", "Comic Sans MS", cursive;
  --credits-title-size: clamp(1.5rem, 4vw, 2.5rem);
  --credits-name-size: clamp(1.05rem, 2.7vw, 1.6rem);
  --credits-flourish-title-size: clamp(2.4rem, 8.5vw, 5rem);
  --credits-block-gap: 5.5rem;
  --credits-name-gap: 0.55rem;
  --credits-shadow: 0 2px 10px rgba(8, 5, 3, 0.75);
  /* glow no-op — NEVER "none" (a "none" in the composed shadow list
     invalidates the whole declaration); Block Party glows are bespoke. */
  --credits-glow: 0 0 0 rgba(0, 0, 0, 0);
}

/* Scenery is full-bleed: drop the base edge-fade on html ONLY; body keeps
   the base mask so names still ease in at the sidewalk and out at the sky. */
html { -webkit-mask-image: none; mask-image: none; }
body { background: transparent; counter-reset: bb-side; }

/* ═══ THE WALL — one static promoted layer. Real running-bond brick,
   drawn with an SVG tile (coarse: bricks are ~112x40px, mortar is a soft
   2px valley, every other course offset half a brick — L6-legal, far
   above the fine-pattern threshold and low-contrast under the lane). A
   warm streetlight pool blooms from the upper-left where the lamp hangs;
   a soft sidewalk bounce warms the floor; the corners fall to a cool
   vignette so the wall has a room. ═══ */
html::before {
  content: "";
  display: var(--boombox-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* corner vignette — the block ends in shadow. Pulled to the lamp side
       (28% 22%) and deepened so the frame falls off hard away from the lamp:
       the scene reads as lit from ONE source, not evenly flooded. */
    radial-gradient(ellipse 140% 128% at 28% 22%, rgba(10, 6, 4, 0) 40%, rgba(9, 5, 3, 0.5) 74%, rgba(6, 3, 2, 0.86) 100%),
    /* cool atmospheric haze creeping in from the far-right edge (distance
       reads cooler + lower-contrast — depth) */
    linear-gradient(100deg, rgba(20, 24, 34, 0) 58%, rgba(24, 30, 44, 0.18) 82%, rgba(28, 34, 50, 0.34) 100%),
    /* streetlight HOT-SPOT — a tight bright core right where the lamp hangs,
       so the wall has a real key-light kiss (not an even wash) */
    radial-gradient(ellipse 20vw 18vh at 15% 3%, rgba(255, 224, 150, 0.4), rgba(252, 208, 118, 0.12) 44%, rgba(250, 200, 100, 0) 76%),
    /* streetlight pool from the lamp, upper-left — a broad warm bloom that
       lifts the wall where the lamp hangs and fades into the dusk */
    radial-gradient(ellipse 52vw 46vh at 13% 1%, rgba(250, 200, 104, 0.28), rgba(246, 192, 84, 0.07) 46%, rgba(245, 190, 80, 0) 74%),
    /* NON-REPEATING grime + efflorescence that breaks the brick tile's grid
       — big soft stains hugging the edges/corners (off the center lane so
       they stay L6-safe). Darks are warm SOOT/damp (brown, not grey fog),
       kept low so they read as patina, not clouds. */
    radial-gradient(ellipse 20vw 26vh at 4% 40%, rgba(216, 208, 192, 0.05) 0%, rgba(216, 208, 192, 0) 70%),
    radial-gradient(ellipse 14vw 20vh at 96% 58%, rgba(208, 200, 184, 0.045) 0%, rgba(208, 200, 184, 0) 68%),
    radial-gradient(ellipse 30vw 40vh at 0% 92%, rgba(20, 12, 7, 0.28) 0%, rgba(20, 12, 7, 0) 72%),
    radial-gradient(ellipse 22vw 30vh at 100% 12%, rgba(22, 13, 8, 0.22) 0%, rgba(22, 13, 8, 0) 70%),
    radial-gradient(ellipse 40vw 18vh at 84% 100%, rgba(18, 22, 16, 0.2) 0%, rgba(18, 22, 16, 0) 74%),
    /* a taped-up flyer wall — two weathered concert flyers slapped on the
       bricks high-right, off the center text lane, filling the dead zone */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 300'%3E%3Cdefs%3E%3ClinearGradient id='p1' x1='0' y1='0' x2='.2' y2='1'%3E%3Cstop offset='0' stop-color='%23e8ddc2'/%3E%3Cstop offset='1' stop-color='%23b8a982'/%3E%3C/linearGradient%3E%3ClinearGradient id='p2' x1='0' y1='0' x2='.2' y2='1'%3E%3Cstop offset='0' stop-color='%23d8c9a6'/%3E%3Cstop offset='1' stop-color='%23a08a5e'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg transform='rotate(2.5 90 150)'%3E%3Crect x='18' y='40' width='150' height='210' rx='2' fill='%23000' opacity='.4'/%3E%3Cpath d='M14 36 L166 30 L170 246 L20 252 Z' fill='url(%23p2)'/%3E%3Crect x='30' y='58' width='120' height='84' rx='2' fill='%2317120c' opacity='.85'/%3E%3Cg fill='%23f5b93b'%3E%3Crect x='40' y='70' width='100' height='14' rx='2'/%3E%3Crect x='40' y='92' width='72' height='10' rx='2' opacity='.8'/%3E%3Crect x='40' y='108' width='90' height='10' rx='2' opacity='.7'/%3E%3Crect x='40' y='124' width='56' height='8' rx='2' opacity='.6'/%3E%3C/g%3E%3Cg fill='%2317120c' opacity='.6'%3E%3Crect x='30' y='158' width='120' height='7' rx='2'/%3E%3Crect x='30' y='172' width='96' height='7' rx='2'/%3E%3Crect x='30' y='186' width='108' height='7' rx='2'/%3E%3Crect x='30' y='200' width='70' height='7' rx='2'/%3E%3C/g%3E%3Crect x='30' y='222' width='120' height='18' rx='2' fill='%23e0333a' opacity='.85'/%3E%3Crect x='38' y='227' width='80' height='8' rx='2' fill='%23f3ead6'/%3E%3C/g%3E%3Cg transform='rotate(-4 175 120)'%3E%3Cpath d='M120 20 L232 30 L226 150 L112 138 Z' fill='%23000' opacity='.35'/%3E%3Cpath d='M118 16 L230 26 L224 146 L110 134 Z' fill='url(%23p1)'/%3E%3Crect x='132' y='34' width='84' height='58' rx='2' fill='%232fbfa8' opacity='.8'/%3E%3Cg fill='%2317120c'%3E%3Crect x='142' y='44' width='64' height='11' rx='2'/%3E%3Crect x='142' y='60' width='44' height='8' rx='2' opacity='.8'/%3E%3C/g%3E%3Cg fill='%2317120c' opacity='.6'%3E%3Crect x='128' y='102' width='90' height='6' rx='2'/%3E%3Crect x='128' y='114' width='66' height='6' rx='2'/%3E%3C/g%3E%3C/g%3E%3Cg fill='%23c9ccd2' opacity='.5'%3E%3Crect x='80' y='30' width='30' height='10' rx='1' transform='rotate(-8 95 35)'/%3E%3Crect x='150' y='16' width='26' height='9' rx='1' transform='rotate(6 163 20)'/%3E%3C/g%3E%3Crect x='0' y='0' width='240' height='300' fill='%232c1c14' opacity='.42'/%3E%3Crect x='0' y='0' width='240' height='300' fill='%23f5b93b' opacity='.06'/%3E%3C/svg%3E") 85% 24% / 280px auto no-repeat,
    /* grime + soot streaks running down the wall (soft vertical smears,
       off the center lane) */
    linear-gradient(90deg, rgba(12, 8, 5, 0) 4%, rgba(12, 8, 5, 0.22) 7%, rgba(12, 8, 5, 0) 11%, rgba(12, 8, 5, 0) 88%, rgba(12, 8, 5, 0.18) 92%, rgba(12, 8, 5, 0) 96%),
    /* water-stain / damp patina rising from the sidewalk — darker, greener
       near the ground where the wall never dries */
    linear-gradient(180deg, rgba(30, 40, 30, 0) 68%, rgba(26, 34, 28, 0.16) 84%, rgba(20, 26, 22, 0.3) 100%),
    /* warm sidewalk bounce along the floor */
    linear-gradient(180deg, rgba(245, 185, 90, 0) 70%, rgba(212, 140, 66, 0.1) 88%, rgba(212, 140, 66, 0.18) 100%),
    /* running-bond brick tile — two courses tall so the half-offset bakes
       into the tile; each brick beveled (top light / bottom shadow), soft
       recessed mortar, a couple of chipped/worn faces. */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 224 80'%3E%3Cdefs%3E%3ClinearGradient id='bk' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23ffffff' stop-opacity='.08'/%3E%3Cstop offset='.18' stop-color='%23ffffff' stop-opacity='0'/%3E%3Cstop offset='.8' stop-color='%23000000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000000' stop-opacity='.28'/%3E%3C/linearGradient%3E%3CradialGradient id='efl' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0' stop-color='%23d8cfc0' stop-opacity='.3'/%3E%3Cstop offset='1' stop-color='%23d8cfc0' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='224' height='80' fill='%232e160f'/%3E%3Cg%3E%3Crect x='2' y='2' width='108' height='36' rx='3' fill='%234c281f'/%3E%3Crect x='114' y='2' width='108' height='36' rx='3' fill='%233d1f19'/%3E%3Crect x='-54' y='42' width='108' height='36' rx='3' fill='%23472520'/%3E%3Crect x='58' y='42' width='108' height='36' rx='3' fill='%23582f24'/%3E%3Crect x='170' y='42' width='108' height='36' rx='3' fill='%233a1c15'/%3E%3C/g%3E%3Cg%3E%3Crect x='2' y='2' width='108' height='36' rx='3' fill='%23703c28' opacity='.22'/%3E%3Crect x='58' y='42' width='108' height='36' rx='3' fill='%23d98a2b' opacity='.06'/%3E%3Crect x='114' y='2' width='108' height='36' rx='3' fill='%23120a07' opacity='.28'/%3E%3Crect x='170' y='42' width='108' height='36' rx='3' fill='%23120a07' opacity='.22'/%3E%3C/g%3E%3Cg%3E%3Crect x='2' y='2' width='108' height='36' rx='3' fill='url(%23bk)'/%3E%3Crect x='114' y='2' width='108' height='36' rx='3' fill='url(%23bk)'/%3E%3Crect x='-54' y='42' width='108' height='36' rx='3' fill='url(%23bk)'/%3E%3Crect x='58' y='42' width='108' height='36' rx='3' fill='url(%23bk)'/%3E%3Crect x='170' y='42' width='108' height='36' rx='3' fill='url(%23bk)'/%3E%3C/g%3E%3Cellipse cx='150' cy='22' rx='26' ry='13' fill='url(%23efl)'/%3E%3Cellipse cx='96' cy='58' rx='20' ry='11' fill='url(%23efl)'/%3E%3Cpath d='M40 8 q-3 8 2 14 q-4 6 1 14' fill='none' stroke='%23140b07' stroke-width='.8' opacity='.5'/%3E%3Cpath d='M40 8 q-3 8 2 14 q-4 6 1 14' fill='none' stroke='%237a4a2e' stroke-width='.4' opacity='.4' transform='translate(.6,.6)'/%3E%3Cg fill='%23120a06' opacity='.5'%3E%3Cpath d='M78 30 q6 3 2 8 l-9 -1 q-2 -5 3 -7z'/%3E%3Cpath d='M132 60 q5 2 1 6 l-7 0 q-1 -4 6 -6z'/%3E%3Cpath d='M188 12 q7 2 4 9 l-8 1 q-3 -6 4 -10z'/%3E%3Cpath d='M22 52 q5 4 0 8 l-6 -2 q0 -4 6 -6z'/%3E%3C/g%3E%3Cg fill='%23c98a4a' opacity='.28'%3E%3Cpath d='M78 30 q6 3 2 8 l-2 -1 q0 -4 0 -7z' opacity='.6'/%3E%3Cpath d='M188 12 q7 2 4 9 l-2 0 q0 -5 -2 -9z' opacity='.6'/%3E%3C/g%3E%3Cg fill='%23a86a3a' opacity='.22'%3E%3Ccircle cx='30' cy='16' r='1'/%3E%3Ccircle cx='168' cy='30' r='1.2'/%3E%3Ccircle cx='88' cy='68' r='1'/%3E%3Ccircle cx='205' cy='54' r='1.1'/%3E%3Ccircle cx='128' cy='14' r='.8'/%3E%3Ccircle cx='52' cy='64' r='.9'/%3E%3C/g%3E%3C/svg%3E") 0 0 / 224px 80px,
    /* the brick faces — warm muted red, dimming toward the floor */
    linear-gradient(180deg, #45241d 0%, #4c281f 38%, #3d211a 72%, #2e1811 100%);
}

/* ═══ THE BURNER — a graffiti wildstyle piece sprayed across the wall,
   the crew tag the streamer's regulars would recognize: "THE AVE." Bold
   italic letters over a soft AIRBRUSHED HALO (the overspray glow that reads
   as fresh spray energy), a saturated gold→orange→red fill that stays hot
   the whole way down, a cream chrome-shine sweep across the letter tops
   (static specular — always L6-safe), a hard ink drop-shadow, fat teal
   arrow tails, a star and a fresh drip run. Slung LOW and LEFT of the
   boombox so the roll passes over it, never a headline. z:-2 (on the
   wall). STATIC, promoted. ═══ */
html::after {
  content: "";
  display: var(--boombox-scenery, block);
  position: fixed;
  left: 2.5vw;
  bottom: 29vh;
  width: min(640px, 48vw);
  height: 222px;
  z-index: -2;
  pointer-events: none;
  opacity: 0.66;
  transform: translateZ(0) rotate(-4deg);
  background-repeat: no-repeat;
  background-position: left center;
  background-size: contain;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 760 250'%3E%3Cdefs%3E%3ClinearGradient id='fill' x1='.06' y1='0' x2='.14' y2='1'%3E%3Cstop offset='0' stop-color='%23fff0b0'/%3E%3Cstop offset='.26' stop-color='%23ffd24a'/%3E%3Cstop offset='.52' stop-color='%23ff9524'/%3E%3Cstop offset='.78' stop-color='%23fb5a2a'/%3E%3Cstop offset='1' stop-color='%23f0343e'/%3E%3C/linearGradient%3E%3ClinearGradient id='shine' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23fffaf0' stop-opacity='.95'/%3E%3Cstop offset='.42' stop-color='%23fff2c8' stop-opacity='.35'/%3E%3Cstop offset='.6' stop-color='%23fff2c8' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='ext' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23c4451f'/%3E%3Cstop offset='1' stop-color='%235a1808'/%3E%3C/linearGradient%3E%3CradialGradient id='halo' cx='50%25' cy='48%25' r='52%25'%3E%3Cstop offset='0' stop-color='%23ffb038' stop-opacity='.62'/%3E%3Cstop offset='.42' stop-color='%23ff6a2e' stop-opacity='.3'/%3E%3Cstop offset='.72' stop-color='%23e0333a' stop-opacity='.12'/%3E%3Cstop offset='1' stop-color='%23e0333a' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='over' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0' stop-color='%23ffcaa0' stop-opacity='.5'/%3E%3Cstop offset='.5' stop-color='%23f5762a' stop-opacity='.16'/%3E%3Cstop offset='1' stop-color='%23f5762a' stop-opacity='0'/%3E%3C/radialGradient%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch' result='n'/%3E%3CfeColorMatrix in='n' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .5 0'/%3E%3CfeComposite operator='in' in2='SourceGraphic'/%3E%3C/filter%3E%3C/defs%3E%3Cellipse cx='380' cy='138' rx='352' ry='128' fill='url(%23halo)'/%3E%3Cellipse cx='380' cy='150' rx='300' ry='96' fill='url(%23over)'/%3E%3Cg font-family='Arial Black, Arial Narrow, sans-serif' font-weight='900' font-size='160' font-style='italic' text-anchor='middle'%3E%3Cg fill='url(%23ext)'%3E%3Ctext x='392' y='170'%3ETHE AVE%3C/text%3E%3Ctext x='390' y='168'%3ETHE AVE%3C/text%3E%3Ctext x='388' y='166'%3ETHE AVE%3C/text%3E%3Ctext x='386' y='164'%3ETHE AVE%3C/text%3E%3Ctext x='384' y='162'%3ETHE AVE%3C/text%3E%3Ctext x='382' y='159'%3ETHE AVE%3C/text%3E%3C/g%3E%3Ctext x='380' y='156' fill='%23fff6e2' stroke='%23fff6e2' stroke-width='11' stroke-linejoin='round'%3ETHE AVE%3C/text%3E%3Ctext x='380' y='156' fill='%23140805' stroke='%23140805' stroke-width='7' stroke-linejoin='round'%3ETHE AVE%3C/text%3E%3Ctext x='380' y='156' fill='url(%23fill)'%3ETHE AVE%3C/text%3E%3Ctext x='380' y='156' fill='url(%23shine)'%3ETHE AVE%3C/text%3E%3C/g%3E%3Cg fill='%23140805' opacity='.82'%3E%3Crect x='150' y='150' width='7' height='46' rx='3'/%3E%3Ccircle cx='153.5' cy='200' r='5.5'/%3E%3Crect x='330' y='158' width='6' height='32' rx='3'/%3E%3Ccircle cx='333' cy='193' r='4'/%3E%3Crect x='548' y='150' width='7' height='54' rx='3'/%3E%3Ccircle cx='551.5' cy='208' r='6'/%3E%3C/g%3E%3Cg fill='url(%23fill)'%3E%3Crect x='150.5' y='150' width='5.5' height='40' rx='3'/%3E%3Ccircle cx='153.3' cy='194' r='3.6'/%3E%3Crect x='548.5' y='150' width='5.5' height='48' rx='3'/%3E%3Ccircle cx='551.3' cy='202' r='4'/%3E%3C/g%3E%3Cg fill='none' stroke='%2312070433' stroke-width='15' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M50 124 L6 164'/%3E%3Cpath d='M718 68 L760 30'/%3E%3C/g%3E%3Cg fill='none' stroke='%2314362f' stroke-width='12' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M46 120 L4 158 L40 166'/%3E%3Cpath d='M714 66 L756 30 L720 22'/%3E%3C/g%3E%3Cg fill='none' stroke='%2340d8bf' stroke-width='8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M46 120 L4 158 L40 166'/%3E%3Cpath d='M714 66 L756 30 L720 22'/%3E%3C/g%3E%3Cpath d='M11 154 L28 160' stroke='%23d6fff5' stroke-width='2.4' stroke-linecap='round' opacity='.7'/%3E%3Cpath d='M60 26 L68 44 L87 44 L72 56 L78 74 L60 62 L42 74 L48 56 L33 44 L52 44 Z' fill='%23140805'/%3E%3Cpath d='M60 30 L67 45 L83 45 L70 55 L75 71 L60 60 L45 71 L50 55 L37 45 L53 45 Z' fill='%23ffd24a'/%3E%3Cpath d='M60 30 L67 45 L83 45 L70 55 L60 50 Z' fill='%23fff6e2' opacity='.8'/%3E%3Ccircle cx='700' cy='196' r='10' fill='none' stroke='%2340d8bf' stroke-width='4.5'/%3E%3Ccircle cx='700' cy='196' r='3.4' fill='%2340d8bf'/%3E%3Ccircle cx='696' cy='192' r='2' fill='%23d6fff5' opacity='.8'/%3E%3Crect x='0' y='0' width='760' height='250' fill='%23fff6e2' filter='url(%23grain)' opacity='.32'/%3E%3C/svg%3E");
}

/* ═══ the lane scrim + the party-light STRING swagged across the top.
   Scrim: a soft vertical dark column so cream names never fight the
   burner. String: a real cord catenary drawn as an SVG band pinned to
   the top edge with coarse warm bulbs — every bulb >=14px, all in the
   top 14vh, off the text lane. STATIC, promoted. ═══ */
body::before {
  content: "";
  display: var(--boombox-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* center-lane readability scrim (coarse, soft) */
    linear-gradient(90deg, rgba(14, 9, 6, 0) 14%, rgba(14, 9, 6, 0.42) 34%, rgba(14, 9, 6, 0.5) 50%, rgba(14, 9, 6, 0.42) 66%, rgba(14, 9, 6, 0) 86%),
    /* VOLUMETRIC GOD-RAYS off the streetlight — three coarse warm beams
       raking down-right from the lamp in the upper-left, low-alpha so they
       read as haze-lit shafts across the wall (L6-safe: wide + soft, no fine
       pattern). A tenement-window shaft feel; adds air to the dead center. */
    repeating-linear-gradient(114deg, rgba(250, 205, 115, 0) 0px, rgba(250, 205, 115, 0) 52px, rgba(250, 205, 115, 0.07) 92px, rgba(250, 205, 115, 0.15) 122px, rgba(250, 205, 115, 0.07) 152px, rgba(250, 205, 115, 0) 200px),
    /* the shafts fade out toward the bottom + far right so they read as
       coming FROM the lamp (mask keeps them upper-left-weighted) */
    radial-gradient(ellipse 120% 95% at 8% -6%, rgba(250, 205, 115, 0.12) 0%, rgba(250, 205, 115, 0.04) 44%, rgba(250, 205, 115, 0) 72%),
    /* a soft global haze pool hanging in the air, warm near the lamp,
       thinning to the right — atmospheric perspective */
    radial-gradient(ellipse 90% 80% at 20% 12%, rgba(245, 190, 90, 0.1) 0%, rgba(245, 190, 90, 0.03) 40%, rgba(245, 190, 90, 0) 70%),
    /* party-light string across the very top — big blooming teardrop bulbs
       with a wide bokeh halo, a hot glowing filament core, a screw base, a
       specular hotspot, and a glowing catenary cord. Bulbs are big + coarse
       (>=40px halos), all in the top 16vh, off the text lane — L6-safe. */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 170' preserveAspectRatio='none'%3E%3Cdefs%3E%3CradialGradient id='gG' cx='50%25' cy='42%25' r='55%25'%3E%3Cstop offset='0' stop-color='%23fff7dc' stop-opacity='.95'/%3E%3Cstop offset='.32' stop-color='%23ffcf5e' stop-opacity='.62'/%3E%3Cstop offset='.62' stop-color='%23f5b93b' stop-opacity='.24'/%3E%3Cstop offset='1' stop-color='%23f5b93b' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='gR' cx='50%25' cy='42%25' r='55%25'%3E%3Cstop offset='0' stop-color='%23ffe6e4' stop-opacity='.9'/%3E%3Cstop offset='.32' stop-color='%23ff7a72' stop-opacity='.58'/%3E%3Cstop offset='.62' stop-color='%23e0333a' stop-opacity='.24'/%3E%3Cstop offset='1' stop-color='%23e0333a' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='gT' cx='50%25' cy='42%25' r='55%25'%3E%3Cstop offset='0' stop-color='%23f0fffb' stop-opacity='.95'/%3E%3Cstop offset='.32' stop-color='%237ff2de' stop-opacity='.66'/%3E%3Cstop offset='.62' stop-color='%2340d8c0' stop-opacity='.3'/%3E%3Cstop offset='1' stop-color='%2340d8c0' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='bG' cx='42%25' cy='32%25' r='64%25'%3E%3Cstop offset='0' stop-color='%23fffbe8'/%3E%3Cstop offset='.42' stop-color='%23ffd76a'/%3E%3Cstop offset='1' stop-color='%23c78a24'/%3E%3C/radialGradient%3E%3CradialGradient id='bR' cx='42%25' cy='32%25' r='64%25'%3E%3Cstop offset='0' stop-color='%23fff0ee'/%3E%3Cstop offset='.42' stop-color='%23f2565b'/%3E%3Cstop offset='1' stop-color='%23a52328'/%3E%3C/radialGradient%3E%3CradialGradient id='bT' cx='42%25' cy='32%25' r='64%25'%3E%3Cstop offset='0' stop-color='%23f0fffb'/%3E%3Cstop offset='.42' stop-color='%2359e8d0'/%3E%3Cstop offset='1' stop-color='%23269e8c'/%3E%3C/radialGradient%3E%3CradialGradient id='fil' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0' stop-color='%23fffef8'/%3E%3Cstop offset='.55' stop-color='%23fff2c0' stop-opacity='.7'/%3E%3Cstop offset='1' stop-color='%23fff2c0' stop-opacity='0'/%3E%3C/radialGradient%3E%3Cg id='bulbG'%3E%3Ccircle cx='0' cy='2' r='40' fill='url(%23gG)'/%3E%3Crect x='-4' y='-15' width='8' height='7' rx='2' fill='%231a120a'/%3E%3Cpath d='M-10 -9 A10 10 0 0 1 10 -9 L8 7 Q0 17 -8 7 Z' fill='url(%23bG)'/%3E%3Ccircle cx='0' cy='0' r='4.5' fill='url(%23fil)'/%3E%3Cellipse cx='-3.4' cy='-4' rx='2.8' ry='4.4' fill='%23fffef8' opacity='.95'/%3E%3C/g%3E%3Cg id='bulbR'%3E%3Ccircle cx='0' cy='2' r='40' fill='url(%23gR)'/%3E%3Crect x='-4' y='-15' width='8' height='7' rx='2' fill='%231a120a'/%3E%3Cpath d='M-10 -9 A10 10 0 0 1 10 -9 L8 7 Q0 17 -8 7 Z' fill='url(%23bR)'/%3E%3Ccircle cx='0' cy='0' r='4' fill='url(%23fil)'/%3E%3Cellipse cx='-3.4' cy='-4' rx='2.8' ry='4.4' fill='%23fff' opacity='.9'/%3E%3C/g%3E%3Cg id='bulbT'%3E%3Ccircle cx='0' cy='2' r='40' fill='url(%23gT)'/%3E%3Crect x='-4' y='-15' width='8' height='7' rx='2' fill='%231a120a'/%3E%3Cpath d='M-10 -9 A10 10 0 0 1 10 -9 L8 7 Q0 17 -8 7 Z' fill='url(%23bT)'/%3E%3Ccircle cx='0' cy='0' r='4' fill='url(%23fil)'/%3E%3Cellipse cx='-3.4' cy='-4' rx='2.8' ry='4.4' fill='%23fff' opacity='.9'/%3E%3C/g%3E%3C/defs%3E%3Cpath d='M0 20 Q200 80 400 42 Q600 8 800 46 Q1000 84 1200 42 Q1400 8 1600 32' fill='none' stroke='%23000' stroke-width='5' opacity='.5'/%3E%3Cpath d='M0 16 Q200 76 400 38 Q600 4 800 42 Q1000 80 1200 38 Q1400 4 1600 28' fill='none' stroke='%233a2c1e' stroke-width='3'/%3E%3Cpath d='M0 15 Q200 75 400 37 Q600 3 800 41 Q1000 79 1200 37 Q1400 3 1600 27' fill='none' stroke='%23c69a5a' stroke-width='1' opacity='.55'/%3E%3Cuse href='%23bulbG' x='120' y='60'/%3E%3Cuse href='%23bulbR' x='280' y='62'/%3E%3Cuse href='%23bulbT' x='440' y='40'/%3E%3Cuse href='%23bulbG' x='600' y='26'/%3E%3Cuse href='%23bulbR' x='760' y='42'/%3E%3Cuse href='%23bulbT' x='920' y='64'/%3E%3Cuse href='%23bulbG' x='1080' y='60'/%3E%3Cuse href='%23bulbR' x='1240' y='38'/%3E%3Cuse href='%23bulbT' x='1400' y='24'/%3E%3C/svg%3E") 0 0 / 100% 16vh no-repeat;
}

/* ═══ THE BOOMBOX — hero prop, lower-left, thumping on the stoop. One
   SVG: black plastic body lit upper-left, twin chrome-bezel cones with
   concentric rings + dust caps + rim-light catches, a center console
   with a cassette deck window (gold cassette, spinning reels), a red
   record strip, five EQ sliders at mixed heights, twin knobs, a chrome
   carry handle arcing over the top with a specular line, and a soft
   cast shadow on the sidewalk. z:-1 so the crawl rides OVER it, but the
   scrim keeps names clear of the cones. STATIC, promoted. ═══ */
body::after {
  content: "";
  display: var(--boombox-scenery, block);
  position: fixed;
  left: 1vw;
  bottom: 1.5vh;
  width: 624px;
  height: 392px;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background-repeat: no-repeat;
  background-position: left bottom;
  background-size: contain;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 624 392'%3E%3Cdefs%3E%3ClinearGradient id='stoop' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%236a5e52'/%3E%3Cstop offset='.1' stop-color='%23443a31'/%3E%3Cstop offset='1' stop-color='%231a1510'/%3E%3C/linearGradient%3E%3ClinearGradient id='stooptop' x1='0' y1='0' x2='.15' y2='1'%3E%3Cstop offset='0' stop-color='%238a7a68'/%3E%3Cstop offset='.5' stop-color='%23675a4c'/%3E%3Cstop offset='1' stop-color='%233e352d'/%3E%3C/linearGradient%3E%3ClinearGradient id='riser' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23342c24'/%3E%3Cstop offset='1' stop-color='%23110d09'/%3E%3C/linearGradient%3E%3ClinearGradient id='body' x1='0' y1='0' x2='.32' y2='1'%3E%3Cstop offset='0' stop-color='%234a4b54'/%3E%3Cstop offset='.14' stop-color='%232a2b31'/%3E%3Cstop offset='.5' stop-color='%2318181d'/%3E%3Cstop offset='.82' stop-color='%230f0f13'/%3E%3Cstop offset='1' stop-color='%23070708'/%3E%3C/linearGradient%3E%3ClinearGradient id='bodylip' x1='0' y1='0' x2='.2' y2='1'%3E%3Cstop offset='0' stop-color='%23f7c766' stop-opacity='.55'/%3E%3Cstop offset='.3' stop-color='%23a1876a' stop-opacity='.22'/%3E%3Cstop offset='1' stop-color='%23ffffff' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='brush' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23ffffff' stop-opacity='0'/%3E%3Cstop offset='.45' stop-color='%23ffffff' stop-opacity='.07'/%3E%3Cstop offset='.55' stop-color='%23ffffff' stop-opacity='.07'/%3E%3Cstop offset='1' stop-color='%23ffffff' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='panel' x1='0' y1='0' x2='.2' y2='1'%3E%3Cstop offset='0' stop-color='%23d4d7dd'/%3E%3Cstop offset='.14' stop-color='%239aa0a8'/%3E%3Cstop offset='.5' stop-color='%23767c84'/%3E%3Cstop offset='.84' stop-color='%23555a61'/%3E%3Cstop offset='1' stop-color='%23383c42'/%3E%3C/linearGradient%3E%3CradialGradient id='mesh' cx='40%25' cy='34%25' r='66%25'%3E%3Cstop offset='0' stop-color='%23343036'/%3E%3Cstop offset='.55' stop-color='%231a181c'/%3E%3Cstop offset='1' stop-color='%2308080a'/%3E%3C/radialGradient%3E%3CradialGradient id='cone' cx='42%25' cy='36%25' r='64%25'%3E%3Cstop offset='0' stop-color='%23343338'/%3E%3Cstop offset='.34' stop-color='%231e1d21'/%3E%3Cstop offset='.72' stop-color='%230e0d10'/%3E%3Cstop offset='1' stop-color='%23050506'/%3E%3C/radialGradient%3E%3CradialGradient id='dust' cx='40%25' cy='34%25' r='62%25'%3E%3Cstop offset='0' stop-color='%235e5e66'/%3E%3Cstop offset='.5' stop-color='%232e2e34'/%3E%3Cstop offset='1' stop-color='%230d0d10'/%3E%3C/radialGradient%3E%3CradialGradient id='conelit' cx='42%25' cy='36%25' r='70%25'%3E%3Cstop offset='0' stop-color='%23f5b93b' stop-opacity='.24'/%3E%3Cstop offset='.5' stop-color='%23f5b93b' stop-opacity='.05'/%3E%3Cstop offset='1' stop-color='%23f5b93b' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='chrome' x1='.1' y1='0' x2='.1' y2='1'%3E%3Cstop offset='0' stop-color='%23f4f6f9'/%3E%3Cstop offset='.28' stop-color='%23b5bbc4'/%3E%3Cstop offset='.5' stop-color='%23646a73'/%3E%3Cstop offset='.72' stop-color='%238b9099'/%3E%3Cstop offset='1' stop-color='%23e4e8ed'/%3E%3C/linearGradient%3E%3ClinearGradient id='chromeh' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23fbfcfe'/%3E%3Cstop offset='.35' stop-color='%23c2c8d0'/%3E%3Cstop offset='.55' stop-color='%23595f68'/%3E%3Cstop offset='.75' stop-color='%23a2a8b1'/%3E%3Cstop offset='1' stop-color='%23e8ebf0'/%3E%3C/linearGradient%3E%3ClinearGradient id='handle' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23f2f5f8'/%3E%3Cstop offset='.45' stop-color='%239096a0'/%3E%3Cstop offset='1' stop-color='%23474c54'/%3E%3C/linearGradient%3E%3ClinearGradient id='cass' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23323848'/%3E%3Cstop offset='1' stop-color='%230f121a'/%3E%3C/linearGradient%3E%3ClinearGradient id='vu' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%233fe07a'/%3E%3Cstop offset='.55' stop-color='%23f5d13b'/%3E%3Cstop offset='.8' stop-color='%23f59a2f'/%3E%3Cstop offset='1' stop-color='%23e0333a'/%3E%3C/linearGradient%3E%3ClinearGradient id='tuner' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23ffe6a0'/%3E%3Cstop offset='.4' stop-color='%23f2c25a'/%3E%3Cstop offset='1' stop-color='%23b3862e'/%3E%3C/linearGradient%3E%3CradialGradient id='led' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0' stop-color='%23ff9a90'/%3E%3Cstop offset='.5' stop-color='%23e0333a'/%3E%3Cstop offset='1' stop-color='%23e0333a' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='crateR' x1='0' y1='0' x2='.25' y2='1'%3E%3Cstop offset='0' stop-color='%23d24b3e'/%3E%3Cstop offset='.5' stop-color='%23a5322a'/%3E%3Cstop offset='1' stop-color='%236a1d18'/%3E%3C/linearGradient%3E%3ClinearGradient id='crateB' x1='0' y1='0' x2='.25' y2='1'%3E%3Cstop offset='0' stop-color='%233aa6a2'/%3E%3Cstop offset='.5' stop-color='%23227a76'/%3E%3Cstop offset='1' stop-color='%23134846'/%3E%3C/linearGradient%3E%3ClinearGradient id='crateY' x1='0' y1='0' x2='.25' y2='1'%3E%3Cstop offset='0' stop-color='%23e8a83a'/%3E%3Cstop offset='.5' stop-color='%23b87d22'/%3E%3Cstop offset='1' stop-color='%23724c12'/%3E%3C/linearGradient%3E%3ClinearGradient id='vinylSl' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23f0e6cf'/%3E%3Cstop offset='1' stop-color='%23b8a880'/%3E%3C/linearGradient%3E%3Cpattern id='perf' width='8' height='8' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='2' cy='2' r='1.4' fill='%23000' opacity='.55'/%3E%3Ccircle cx='6' cy='6' r='1.4' fill='%23000' opacity='.55'/%3E%3Ccircle cx='2.7' cy='1.3' r='.7' fill='%23fff' opacity='.12'/%3E%3Ccircle cx='6.7' cy='5.3' r='.7' fill='%23fff' opacity='.12'/%3E%3C/pattern%3E%3C/defs%3E%3Cpath d='M0 392 L0 314 L624 305 L624 392 Z' fill='url(%23riser)'/%3E%3Cpath d='M0 314 L624 305 L624 321 L0 330 Z' fill='url(%23stoop)'/%3E%3Cpath d='M0 300 L624 289 L624 305 L0 314 Z' fill='url(%23stooptop)'/%3E%3Cpath d='M0 300 L624 289' fill='none' stroke='%23b8a078' stroke-width='1.6' opacity='.6'/%3E%3Cpath d='M0 314 L624 305' fill='none' stroke='%23120c08' stroke-width='2.4' opacity='.65'/%3E%3Cpath d='M0 330 L624 321' fill='none' stroke='%23000' stroke-width='1.6' opacity='.5'/%3E%3Cg stroke='%23120c08' stroke-width='1.2' opacity='.35'%3E%3Cline x1='150' y1='308' x2='148' y2='330'/%3E%3Cline x1='320' y1='303' x2='322' y2='330'/%3E%3Cline x1='520' y1='298' x2='522' y2='330'/%3E%3Cline x1='150' y1='330' x2='150' y2='392'/%3E%3Cline x1='320' y1='330' x2='320' y2='392'/%3E%3Cline x1='520' y1='330' x2='520' y2='392'/%3E%3C/g%3E%3Cg stroke='%23b8a078' stroke-width='.6' opacity='.25'%3E%3Cline x1='150' y1='308' x2='149' y2='330'/%3E%3Cline x1='320' y1='303' x2='321' y2='330'/%3E%3Cline x1='520' y1='298' x2='521' y2='330'/%3E%3C/g%3E%3Cellipse cx='226' cy='305' rx='218' ry='13' fill='%23000' opacity='.5'/%3E%3Cellipse cx='226' cy='302' rx='158' ry='7' fill='%23000' opacity='.4'/%3E%3Cellipse cx='522' cy='300' rx='96' ry='11' fill='%23000' opacity='.5'/%3E%3Cg transform='translate(452,150)'%3E%3Cellipse cx='72' cy='152' rx='84' ry='11' fill='%23000' opacity='.35'/%3E%3Cg transform='skewY(-1.4)'%3E%3Crect x='6' y='72' width='140' height='74' rx='5' fill='url(%23crateB)'/%3E%3Crect x='6' y='72' width='140' height='10' rx='5' fill='%23ffffff' opacity='.12'/%3E%3Crect x='6' y='72' width='140' height='74' rx='5' fill='none' stroke='%230c2a28' stroke-width='1.4'/%3E%3Cg stroke='%230c2a28' stroke-width='2.2' opacity='.65'%3E%3Cline x1='40' y1='78' x2='40' y2='140'/%3E%3Cline x1='76' y1='78' x2='76' y2='140'/%3E%3Cline x1='112' y1='78' x2='112' y2='140'/%3E%3Cline x1='12' y1='98' x2='140' y2='98'/%3E%3Cline x1='12' y1='120' x2='140' y2='120'/%3E%3C/g%3E%3Cg stroke='%235fd8d2' stroke-width='.8' opacity='.5'%3E%3Cline x1='40' y1='78' x2='40' y2='140'/%3E%3Cline x1='12' y1='98' x2='140' y2='98'/%3E%3C/g%3E%3Crect x='14' y='58' width='124' height='18' rx='2' fill='%230a0806'/%3E%3Cg%3E%3Crect x='16' y='56' width='7' height='20' fill='%23c0392b'/%3E%3Crect x='24' y='55' width='6' height='21' fill='%23e0e0d4'/%3E%3Crect x='31' y='56' width='8' height='20' fill='%232a2622'/%3E%3Crect x='40' y='55' width='6' height='21' fill='%23d98a2b'/%3E%3Crect x='47' y='56' width='7' height='20' fill='%23f0e6cf'/%3E%3Crect x='55' y='55' width='6' height='21' fill='%23c0392b'/%3E%3Crect x='62' y='56' width='8' height='20' fill='%231f6f6b'/%3E%3Crect x='71' y='55' width='6' height='21' fill='%23e0e0d4'/%3E%3Crect x='78' y='56' width='7' height='20' fill='%232a2622'/%3E%3Crect x='86' y='55' width='6' height='21' fill='%23d98a2b'/%3E%3Crect x='93' y='56' width='8' height='20' fill='%23f0e6cf'/%3E%3Crect x='102' y='55' width='6' height='21' fill='%23c0392b'/%3E%3Crect x='109' y='56' width='7' height='20' fill='%231f6f6b'/%3E%3Crect x='117' y='55' width='6' height='21' fill='%23e0e0d4'/%3E%3Crect x='124' y='56' width='8' height='20' fill='%232a2622'/%3E%3C/g%3E%3Crect x='14' y='56' width='124' height='4' fill='%23fff' opacity='.14'/%3E%3Crect x='14' y='74' width='124' height='3' fill='%23000' opacity='.4'/%3E%3Crect x='18' y='4' width='118' height='64' rx='5' fill='url(%23crateR)'/%3E%3Crect x='18' y='4' width='118' height='9' rx='5' fill='%23ffffff' opacity='.14'/%3E%3Crect x='18' y='4' width='118' height='64' rx='5' fill='none' stroke='%23431210' stroke-width='1.4'/%3E%3Cg stroke='%23431210' stroke-width='2.2' opacity='.6'%3E%3Cline x1='48' y1='9' x2='48' y2='63'/%3E%3Cline x1='78' y1='9' x2='78' y2='63'/%3E%3Cline x1='108' y1='9' x2='108' y2='63'/%3E%3Cline x1='24' y1='28' x2='130' y2='28'/%3E%3Cline x1='24' y1='48' x2='130' y2='48'/%3E%3C/g%3E%3Cg stroke='%23e87d6f' stroke-width='.8' opacity='.5'%3E%3Cline x1='48' y1='9' x2='48' y2='63'/%3E%3Cline x1='24' y1='28' x2='130' y2='28'/%3E%3C/g%3E%3Crect x='26' y='-8' width='102' height='16' rx='2' fill='%230a0806'/%3E%3Cg%3E%3Crect x='28' y='-9' width='7' height='17' fill='%231f6f6b'/%3E%3Crect x='36' y='-10' width='6' height='18' fill='%23f0e6cf'/%3E%3Crect x='43' y='-9' width='8' height='17' fill='%23c0392b'/%3E%3Crect x='52' y='-10' width='6' height='18' fill='%232a2622'/%3E%3Crect x='59' y='-9' width='7' height='17' fill='%23d98a2b'/%3E%3Crect x='67' y='-10' width='6' height='18' fill='%23e0e0d4'/%3E%3Crect x='74' y='-9' width='8' height='17' fill='%231f6f6b'/%3E%3Crect x='83' y='-10' width='6' height='18' fill='%23c0392b'/%3E%3Crect x='90' y='-9' width='7' height='17' fill='%23f0e6cf'/%3E%3Crect x='98' y='-10' width='6' height='18' fill='%232a2622'/%3E%3Crect x='105' y='-9' width='8' height='17' fill='%23d98a2b'/%3E%3Crect x='114' y='-10' width='6' height='18' fill='%231f6f6b'/%3E%3Crect x='121' y='-9' width='7' height='17' fill='%23e0e0d4'/%3E%3C/g%3E%3Crect x='26' y='-10' width='102' height='4' fill='%23fff' opacity='.16'/%3E%3Crect x='26' y='6' width='102' height='3' fill='%23000' opacity='.4'/%3E%3C/g%3E%3C/g%3E%3Cg transform='translate(17,43)'%3E%3Cpath d='M330 6 L400 6' fill='none' stroke='%230a0b0e' stroke-width='6' stroke-linecap='round'/%3E%3Cpath d='M366 8 L438 -70' fill='none' stroke='%2318191d' stroke-width='7' stroke-linecap='round'/%3E%3Cpath d='M366 8 L438 -70' fill='none' stroke='url(%23chrome)' stroke-width='4.4' stroke-linecap='round'/%3E%3Cpath d='M367 6 L432 -64' fill='none' stroke='%23ffffff' stroke-width='1.1' stroke-linecap='round' opacity='.75'/%3E%3Cg stroke='%230a0b0e' stroke-width='.8' opacity='.6'%3E%3Cline x1='391' y1='-18' x2='398' y2='-25'/%3E%3Cline x1='410' y1='-38' x2='417' y2='-45'/%3E%3C/g%3E%3Ccircle cx='440' cy='-73' r='4.4' fill='url(%23chrome)' stroke='%2318191d' stroke-width='.8'/%3E%3Ccircle cx='438.5' cy='-74.5' r='1.6' fill='%23ffffff' opacity='.85'/%3E%3Cpath d='M120 62 Q120 18 220 18 Q320 18 320 62' fill='none' stroke='%2325282d' stroke-width='16' stroke-linecap='round'/%3E%3Cpath d='M120 62 Q120 18 220 18 Q320 18 320 62' fill='none' stroke='url(%23handle)' stroke-width='9' stroke-linecap='round'/%3E%3Cpath d='M124 58 Q124 24 220 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' opacity='.6'/%3E%3Cpath d='M316 58 Q316 30 250 22' fill='none' stroke='%23000' stroke-width='1.6' stroke-linecap='round' opacity='.4'/%3E%3Ccircle cx='120' cy='60' r='6' fill='%232a2c31' stroke='%23000' stroke-width='1'/%3E%3Ccircle cx='320' cy='60' r='6' fill='%232a2c31' stroke='%23000' stroke-width='1'/%3E%3Ccircle cx='120' cy='60' r='2' fill='%23c9ccd2'/%3E%3Ccircle cx='320' cy='60' r='2' fill='%23c9ccd2'/%3E%3Crect x='24' y='52' width='398' height='214' rx='20' fill='url(%23body)'/%3E%3Crect x='24' y='52' width='398' height='214' rx='20' fill='url(%23brush)'/%3E%3Cpath d='M40 55 Q223 50 406 55 Q406 62 400 63 Q223 58 44 63 Q38 62 40 55 Z' fill='url(%23bodylip)'/%3E%3Cg opacity='.5' stroke='%23ffffff'%3E%3Cline x1='34' y1='118' x2='406' y2='118' stroke-width='.5' opacity='.12'/%3E%3Cline x1='34' y1='140' x2='406' y2='140' stroke-width='.5' opacity='.08'/%3E%3Cline x1='34' y1='246' x2='406' y2='246' stroke-width='.5' opacity='.07'/%3E%3C/g%3E%3Crect x='24' y='52' width='398' height='214' rx='20' fill='none' stroke='%23000' stroke-width='1.6' opacity='.7'/%3E%3Crect x='26' y='54' width='394' height='210' rx='18' fill='none' stroke='%235e5f68' stroke-width='1' opacity='.5'/%3E%3Crect x='36' y='68' width='374' height='26' rx='6' fill='%230c0f16'/%3E%3Crect x='38' y='70' width='370' height='22' rx='5' fill='url(%23tuner)'/%3E%3Crect x='38' y='70' width='370' height='9' rx='5' fill='%23fff2cc' opacity='.5'/%3E%3Cg stroke='%233a2a0e' stroke-width='1' opacity='.72'%3E%3Cline x1='60' y1='73' x2='60' y2='89'/%3E%3Cline x1='95' y1='73' x2='95' y2='89'/%3E%3Cline x1='130' y1='73' x2='130' y2='89'/%3E%3Cline x1='165' y1='73' x2='165' y2='89'/%3E%3Cline x1='200' y1='73' x2='200' y2='89'/%3E%3Cline x1='235' y1='73' x2='235' y2='89'/%3E%3Cline x1='270' y1='73' x2='270' y2='89'/%3E%3Cline x1='305' y1='73' x2='305' y2='89'/%3E%3Cline x1='340' y1='73' x2='340' y2='89'/%3E%3Cline x1='375' y1='73' x2='375' y2='89'/%3E%3C/g%3E%3Cg stroke='%233a2a0e' stroke-width='.6' opacity='.5'%3E%3Cline x1='77' y1='79' x2='77' y2='89'/%3E%3Cline x1='112' y1='79' x2='112' y2='89'/%3E%3Cline x1='147' y1='79' x2='147' y2='89'/%3E%3Cline x1='182' y1='79' x2='182' y2='89'/%3E%3Cline x1='217' y1='79' x2='217' y2='89'/%3E%3Cline x1='252' y1='79' x2='252' y2='89'/%3E%3Cline x1='287' y1='79' x2='287' y2='89'/%3E%3Cline x1='322' y1='79' x2='322' y2='89'/%3E%3Cline x1='357' y1='79' x2='357' y2='89'/%3E%3C/g%3E%3Crect x='276' y='66' width='4' height='32' rx='2' fill='%23e0333a'/%3E%3Crect x='277' y='66' width='1.4' height='32' fill='%23ff8a84'/%3E%3Ccircle cx='278' cy='66' r='3.4' fill='%23e0333a' stroke='%23ffd9d5' stroke-width='.8'/%3E%3Crect x='36' y='68' width='374' height='26' rx='6' fill='none' stroke='%23000' stroke-width='1' opacity='.6'/%3E%3Crect x='36' y='247' width='88' height='16' rx='4' fill='url(%23chromeh)' stroke='%2318191d' stroke-width='.8'/%3E%3Crect x='37' y='248' width='86' height='5' rx='3' fill='%23ffffff' opacity='.4'/%3E%3Ccircle cx='42' cy='255' r='1.4' fill='%23494d54'/%3E%3Ccircle cx='118' cy='255' r='1.4' fill='%23494d54'/%3E%3Ctext x='55' y='259' font-family='Arial Black, sans-serif' font-weight='900' font-size='9' letter-spacing='.4' fill='%231a1c20'%3EAVE%3C/text%3E%3Ctext x='81' y='259' font-family='Arial, sans-serif' font-weight='700' font-size='9' letter-spacing='.4' fill='%236b4d15'%3E9000%3C/text%3E%3Ctext x='300' y='260' font-family='Arial, sans-serif' font-weight='400' font-size='6.5' letter-spacing='2.4' fill='%235c6069' opacity='.8'%3ESTEREO%3C/text%3E%3Ccircle cx='104' cy='176' r='74' fill='url(%23chrome)'/%3E%3Ccircle cx='104' cy='176' r='74' fill='none' stroke='%2318191d' stroke-width='2'/%3E%3Ccircle cx='104' cy='176' r='71' fill='none' stroke='%23ffffff' stroke-width='.8' opacity='.4'/%3E%3Ccircle cx='104' cy='176' r='65' fill='url(%23mesh)'/%3E%3Ccircle cx='104' cy='176' r='65' fill='url(%23perf)'/%3E%3Ccircle cx='104' cy='176' r='63' fill='url(%23conelit)'/%3E%3Ccircle cx='104' cy='176' r='48' fill='url(%23cone)'/%3E%3Cg fill='none' stroke='%23000' stroke-linecap='round'%3E%3Ccircle cx='104' cy='176' r='47' stroke-width='1.4' opacity='.5'/%3E%3Ccircle cx='104' cy='176' r='39' stroke-width='1' opacity='.4'/%3E%3Ccircle cx='104' cy='176' r='31' stroke-width='1' opacity='.38'/%3E%3Ccircle cx='104' cy='176' r='24' stroke-width='1' opacity='.35'/%3E%3C/g%3E%3Cpath d='M104 129 A47 47 0 0 1 148 164' fill='none' stroke='%23ffffff' stroke-width='2.6' stroke-linecap='round' opacity='.28'/%3E%3Ccircle cx='104' cy='176' r='16' fill='url(%23dust)'/%3E%3Ccircle cx='104' cy='176' r='16' fill='none' stroke='%23000' stroke-width='1' opacity='.4'/%3E%3Cellipse cx='98' cy='170' rx='5.5' ry='4' fill='%23ffffff' opacity='.5'/%3E%3Cpath d='M62 142 A70 70 0 0 1 132 120' fill='none' stroke='%23ffffff' stroke-width='2.4' stroke-linecap='round' opacity='.55'/%3E%3Ccircle cx='336' cy='176' r='74' fill='url(%23chrome)'/%3E%3Ccircle cx='336' cy='176' r='74' fill='none' stroke='%2318191d' stroke-width='2'/%3E%3Ccircle cx='336' cy='176' r='71' fill='none' stroke='%23ffffff' stroke-width='.8' opacity='.4'/%3E%3Ccircle cx='336' cy='176' r='65' fill='url(%23mesh)'/%3E%3Ccircle cx='336' cy='176' r='65' fill='url(%23perf)'/%3E%3Ccircle cx='336' cy='176' r='63' fill='url(%23conelit)'/%3E%3Ccircle cx='336' cy='176' r='48' fill='url(%23cone)'/%3E%3Cg fill='none' stroke='%23000' stroke-linecap='round'%3E%3Ccircle cx='336' cy='176' r='47' stroke-width='1.4' opacity='.5'/%3E%3Ccircle cx='336' cy='176' r='39' stroke-width='1' opacity='.4'/%3E%3Ccircle cx='336' cy='176' r='31' stroke-width='1' opacity='.38'/%3E%3Ccircle cx='336' cy='176' r='24' stroke-width='1' opacity='.35'/%3E%3C/g%3E%3Cpath d='M336 129 A47 47 0 0 1 380 164' fill='none' stroke='%23ffffff' stroke-width='2.6' stroke-linecap='round' opacity='.28'/%3E%3Ccircle cx='336' cy='176' r='16' fill='url(%23dust)'/%3E%3Ccircle cx='336' cy='176' r='16' fill='none' stroke='%23000' stroke-width='1' opacity='.4'/%3E%3Cellipse cx='330' cy='170' rx='5.5' ry='4' fill='%23ffffff' opacity='.5'/%3E%3Cpath d='M294 142 A70 70 0 0 1 364 120' fill='none' stroke='%23ffffff' stroke-width='2.4' stroke-linecap='round' opacity='.55'/%3E%3Crect x='178' y='106' width='84' height='150' rx='9' fill='url(%23panel)'/%3E%3Crect x='178' y='106' width='84' height='150' rx='9' fill='none' stroke='%2323262b' stroke-width='1.4'/%3E%3Crect x='180' y='108' width='80' height='146' rx='7' fill='none' stroke='%23eef1f5' stroke-width='.8' opacity='.45'/%3E%3Crect x='188' y='114' width='64' height='44' rx='5' fill='url(%23cass)' stroke='%23000' stroke-width='1.2'/%3E%3Crect x='190' y='116' width='60' height='40' rx='4' fill='none' stroke='%2352586a' stroke-width='.7' opacity='.6'/%3E%3Crect x='195' y='121' width='50' height='28' rx='3' fill='%23e0b94e'/%3E%3Crect x='195' y='121' width='50' height='13' rx='3' fill='%23f2d074'/%3E%3Crect x='198' y='124' width='44' height='8' rx='2' fill='%2317120c' opacity='.85'/%3E%3Ccircle cx='209' cy='141' r='5.5' fill='%231a1a1e'/%3E%3Ccircle cx='209' cy='141' r='2' fill='%23808088'/%3E%3Ccircle cx='231' cy='141' r='5.5' fill='%231a1a1e'/%3E%3Ccircle cx='231' cy='141' r='2' fill='%23808088'/%3E%3Cg stroke='%23000' stroke-width='.6' opacity='.5'%3E%3Cline x1='209' y1='135.5' x2='209' y2='139'/%3E%3Cline x1='209' y1='143' x2='209' y2='146.5'/%3E%3Cline x1='203.5' y1='141' x2='207' y2='141'/%3E%3Cline x1='211' y1='141' x2='214.5' y2='141'/%3E%3C/g%3E%3Cpath d='M190 116 L214 116 L200 156 L190 156 Z' fill='%23ffffff' opacity='.1'/%3E%3Crect x='186' y='162' width='68' height='14' rx='3' fill='%2312141a'/%3E%3Crect x='189' y='164' width='62' height='4' rx='2' fill='url(%23vu)'/%3E%3Crect x='189' y='170' width='44' height='3' rx='1.5' fill='url(%23vu)' opacity='.7'/%3E%3Cg fill='%23000' opacity='.4'%3E%3Crect x='197' y='163' width='1' height='12'/%3E%3Crect x='208' y='163' width='1' height='12'/%3E%3Crect x='219' y='163' width='1' height='12'/%3E%3Crect x='230' y='163' width='1' height='12'/%3E%3Crect x='241' y='163' width='1' height='12'/%3E%3C/g%3E%3Crect x='186' y='180' width='68' height='44' rx='4' fill='%2316181e'/%3E%3Crect x='186' y='180' width='68' height='44' rx='4' fill='none' stroke='%23000' stroke-width='1' opacity='.5'/%3E%3Cg stroke='%230a0b0e' stroke-width='4.5' stroke-linecap='round'%3E%3Cline x1='196' y1='186' x2='196' y2='218'/%3E%3Cline x1='207' y1='186' x2='207' y2='218'/%3E%3Cline x1='218' y1='186' x2='218' y2='218'/%3E%3Cline x1='229' y1='186' x2='229' y2='218'/%3E%3Cline x1='240' y1='186' x2='240' y2='218'/%3E%3C/g%3E%3Cg fill='url(%23panel)' stroke='%2323262b' stroke-width='.8'%3E%3Crect x='192' y='202' width='8' height='7' rx='2'/%3E%3Crect x='203' y='190' width='8' height='7' rx='2'/%3E%3Crect x='214' y='210' width='8' height='7' rx='2'/%3E%3Crect x='225' y='195' width='8' height='7' rx='2'/%3E%3Crect x='236' y='205' width='8' height='7' rx='2'/%3E%3C/g%3E%3Cg fill='%23ffffff' opacity='.5'%3E%3Crect x='193' y='202.6' width='6' height='1.4' rx='.7'/%3E%3Crect x='204' y='190.6' width='6' height='1.4' rx='.7'/%3E%3Crect x='215' y='210.6' width='6' height='1.4' rx='.7'/%3E%3Crect x='226' y='195.6' width='6' height='1.4' rx='.7'/%3E%3Crect x='237' y='205.6' width='6' height='1.4' rx='.7'/%3E%3C/g%3E%3Ccircle cx='204' cy='240' r='9.5' fill='%23202329'/%3E%3Ccircle cx='204' cy='240' r='9.5' fill='none' stroke='%23c9ccd2' stroke-width='1.4'/%3E%3Ccircle cx='204' cy='240' r='9.5' fill='none' stroke='%23000' stroke-width='.6' opacity='.4'/%3E%3Cpath d='M197.5 234 A9.5 9.5 0 0 1 208 231' fill='none' stroke='%23eef1f5' stroke-width='1.4' stroke-linecap='round' opacity='.6'/%3E%3Cline x1='204' y1='240' x2='204' y2='232.5' stroke='%23e8eaee' stroke-width='2' stroke-linecap='round'/%3E%3Ccircle cx='236' cy='240' r='9.5' fill='%23202329'/%3E%3Ccircle cx='236' cy='240' r='9.5' fill='none' stroke='%23c9ccd2' stroke-width='1.4'/%3E%3Ccircle cx='236' cy='240' r='9.5' fill='none' stroke='%23000' stroke-width='.6' opacity='.4'/%3E%3Cpath d='M229.5 234 A9.5 9.5 0 0 1 240 231' fill='none' stroke='%23eef1f5' stroke-width='1.4' stroke-linecap='round' opacity='.6'/%3E%3Cline x1='236' y1='240' x2='241' y2='234.5' stroke='%23e8eaee' stroke-width='2' stroke-linecap='round'/%3E%3Ccircle cx='220' cy='252' r='3.6' fill='url(%23led)'/%3E%3Ccircle cx='220' cy='252' r='1.6' fill='%23ffd9d5'/%3E%3Crect x='40' y='250' width='16' height='9' rx='2' fill='%230a0b0e'/%3E%3Crect x='390' y='250' width='16' height='9' rx='2' fill='%230a0b0e'/%3E%3Cellipse cx='48' cy='250' rx='8' ry='2' fill='%23ffffff' opacity='.06'/%3E%3Cg fill='%23fffef8'%3E%3Cg transform='translate(64,130)'%3E%3Ccircle r='6' fill='%23fff6d8' opacity='.45'/%3E%3Cpath d='M0 -13 L2.3 -2.3 L13 0 L2.3 2.3 L0 13 L-2.3 2.3 L-13 0 L-2.3 -2.3 Z' opacity='.92'/%3E%3Ccircle r='2' opacity='.95'/%3E%3C/g%3E%3Cg transform='translate(296,130)'%3E%3Ccircle r='5' fill='%23fff6d8' opacity='.4'/%3E%3Cpath d='M0 -10 L1.8 -1.8 L10 0 L1.8 1.8 L0 10 L-1.8 1.8 L-10 0 L-1.8 -1.8 Z' opacity='.85'/%3E%3Ccircle r='1.6' opacity='.95'/%3E%3C/g%3E%3Cg transform='translate(150,20)'%3E%3Cpath d='M0 -9 L1.5 -1.5 L9 0 L1.5 1.5 L0 9 L-1.5 1.5 L-9 0 L-1.5 -1.5 Z' opacity='.85'/%3E%3Ccircle r='1.4' opacity='.95'/%3E%3C/g%3E%3Cg transform='translate(122,250)'%3E%3Cpath d='M0 -6 L1.1 -1.1 L6 0 L1.1 1.1 L0 6 L-1.1 1.1 L-6 0 L-1.1 -1.1 Z' opacity='.8'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

/* head is a prop rack: its pseudos are free fixed canvases. ═══ */
head { display: var(--boombox-scenery, block); }
head meta { display: var(--boombox-scenery, block); }

/* ═══ ONE party bulb breathing — the single continuous mover (L2 small-
   element budget; will-change count: 1). A tiny warm glow up in the
   left of the swag, pulsing on the beat. ═══ */
head::before {
  content: "";
  display: var(--boombox-scenery, block);
  position: fixed;
  left: 6vw;
  top: 3.4vh;
  width: 40px;
  height: 40px;
  z-index: -1;
  pointer-events: none;
  opacity: 0.85;
  background: radial-gradient(circle at 50% 50%, rgba(245, 185, 59, 0.55) 0%, rgba(245, 185, 59, 0.18) 40%, rgba(245, 185, 59, 0) 72%);
  will-change: transform;
  animation: boombox-bulb 3.2s ease-in-out infinite;
}

/* ═══ spray-mist rising off the left cone — a small fixed box (not the
   viewport), steps() drift so it's NOT a continuous mover (no will-change
   spent). One hop every ~2.2s, low alpha, dies before it reaches the
   lane. ═══ */
head::after {
  content: "";
  display: var(--boombox-scenery, block);
  position: fixed;
  left: 5vw;
  bottom: 22vh;
  width: 150px;
  height: 180px;
  z-index: -1;
  pointer-events: none;
  opacity: 0.5;
  background:
    radial-gradient(circle at 40% 64%, rgba(210, 216, 224, 0.16) 0%, rgba(210, 216, 224, 0) 56%),
    radial-gradient(circle at 62% 34%, rgba(245, 210, 160, 0.10) 0%, rgba(245, 210, 160, 0) 52%);
  animation: boombox-mist 11s steps(1, end) infinite;
}

/* ═══ THE FIRE HYDRANT — open on the corner, lower-right, misting a gold
   fan into the streetlight. A stout SVG hydrant (cap, bonnet, two side
   nozzles, chain, base flange) in silhouette ink with a beam-side rim,
   sitting in a soft golden spray pool. STATIC, promoted, foreground. ═══ */
head meta:first-of-type::before {
  content: "";
  display: var(--boombox-scenery, block);
  position: fixed;
  right: 3vw;
  bottom: 1.5vh;
  width: 150px;
  height: 210px;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  background:
    radial-gradient(ellipse 150px 60px at 30% 78%, rgba(245, 200, 120, 0.2) 0%, rgba(245, 200, 120, 0) 72%) no-repeat,
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 170 230'%3E%3Cdefs%3E%3ClinearGradient id='hy' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23415049'/%3E%3Cstop offset='.22' stop-color='%233d4d49'/%3E%3Cstop offset='.55' stop-color='%23212b2b'/%3E%3Cstop offset='1' stop-color='%230d1414'/%3E%3C/linearGradient%3E%3ClinearGradient id='bon' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23c23138'/%3E%3Cstop offset='.4' stop-color='%23e0454b'/%3E%3Cstop offset='.7' stop-color='%23a5262c'/%3E%3Cstop offset='1' stop-color='%23701a1f'/%3E%3C/linearGradient%3E%3CradialGradient id='brass' cx='38%25' cy='34%25' r='70%25'%3E%3Cstop offset='0' stop-color='%23fbe6a8'/%3E%3Cstop offset='.45' stop-color='%23c9982f'/%3E%3Cstop offset='1' stop-color='%236b4d15'/%3E%3C/radialGradient%3E%3CradialGradient id='spray' cx='50%25' cy='60%25' r='60%25'%3E%3Cstop offset='0' stop-color='%23eaf6f4' stop-opacity='.6'/%3E%3Cstop offset='.5' stop-color='%23bfe0dc' stop-opacity='.22'/%3E%3Cstop offset='1' stop-color='%23bfe0dc' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='88' cy='218' rx='56' ry='9' fill='%23090604' opacity='.75'/%3E%3Cellipse cx='40' cy='210' rx='42' ry='9' fill='url(%23spray)'/%3E%3Crect x='60' y='202' width='56' height='16' rx='4' fill='%2314201f'/%3E%3Crect x='60' y='202' width='56' height='4' rx='2' fill='%233a4a48' opacity='.6'/%3E%3Cg fill='%230b1211'%3E%3Ccircle cx='70' cy='210' r='2.4'/%3E%3Ccircle cx='88' cy='210' r='2.4'/%3E%3Ccircle cx='106' cy='210' r='2.4'/%3E%3C/g%3E%3Cpath d='M64 86 Q64 68 88 68 Q112 68 112 86 L112 196 Q112 204 103 204 L73 204 Q64 204 64 196 Z' fill='url(%23hy)'/%3E%3Crect x='62' y='98' width='52' height='6' rx='3' fill='%230d1413'/%3E%3Crect x='62' y='100' width='52' height='2' rx='1' fill='%235a706c' opacity='.4'/%3E%3Crect x='62' y='154' width='52' height='6' rx='3' fill='%230d1413'/%3E%3Crect x='62' y='156' width='52' height='2' rx='1' fill='%235a706c' opacity='.4'/%3E%3Cellipse cx='88' cy='68' rx='28' ry='9' fill='%23283434'/%3E%3Cpath d='M66 50 Q66 40 88 40 Q110 40 110 50 L110 64 Q110 70 88 70 Q66 70 66 64 Z' fill='url(%23bon)'/%3E%3Cellipse cx='88' cy='40' rx='20' ry='6' fill='%23e0454b'/%3E%3Cpath d='M81 27 L95 27 L99 41 L77 41 Z' fill='%23283434'/%3E%3Cpath d='M81 27 L88 24 L95 27 L92 33 L84 33 Z' fill='url(%23brass)' stroke='%230d1413' stroke-width='.8'/%3E%3Cellipse cx='88' cy='24' rx='7' ry='3' fill='%23fbe6a8' opacity='.7'/%3E%3Cellipse cx='40' cy='118' rx='11' ry='13' fill='%23222c2c'/%3E%3Ccircle cx='39' cy='118' r='10' fill='url(%23brass)'/%3E%3Ccircle cx='39' cy='118' r='10' fill='none' stroke='%230d1413' stroke-width='1.2'/%3E%3Ccircle cx='39' cy='118' r='4' fill='%236b4d15'/%3E%3Cpath d='M32 111 A10 10 0 0 1 46 111' fill='none' stroke='%23fff3cf' stroke-width='1.6' opacity='.7' stroke-linecap='round'/%3E%3Cellipse cx='112' cy='124' rx='9' ry='12' fill='%23283434'/%3E%3Ccircle cx='113' cy='124' r='10' fill='url(%23brass)'/%3E%3Ccircle cx='113' cy='124' r='10' fill='none' stroke='%230d1413' stroke-width='1.2'/%3E%3Ccircle cx='113' cy='124' r='3.5' fill='%236b4d15'/%3E%3Cpath d='M113 104 Q128 110 123 134' fill='none' stroke='%231a1512' stroke-width='2' stroke-dasharray='3 2.5' opacity='.85'/%3E%3Cpath d='M65 84 Q63 132 65 195' fill='none' stroke='%23f8c874' stroke-width='4' opacity='.55' stroke-linecap='round'/%3E%3Cpath d='M65 86 Q63 132 65 192' fill='none' stroke='%23fff0cc' stroke-width='1.4' opacity='.7' stroke-linecap='round'/%3E%3Cpath d='M68 100 Q65 130 68 172' fill='none' stroke='%23f8c874' stroke-width='7' opacity='.16' stroke-linecap='round'/%3E%3Cpath d='M67 50 Q65 40 88 40' fill='none' stroke='%23ffdca0' stroke-width='2.4' opacity='.6'/%3E%3Cpath d='M104 92 Q108 140 104 190' fill='none' stroke='%23000' stroke-width='2.4' opacity='.36' stroke-linecap='round'/%3E%3Cg stroke='%23dff2ef' stroke-linecap='round' fill='none'%3E%3Cpath d='M30 116 Q2 104 -6 82' stroke-width='2.8' opacity='.6'/%3E%3Cpath d='M29 122 Q0 124 -8 150' stroke-width='2.4' opacity='.5'/%3E%3Cpath d='M30 119 Q6 112 -2 96' stroke-width='2' opacity='.45'/%3E%3Cpath d='M28 126 Q4 136 -2 160' stroke-width='1.8' opacity='.4'/%3E%3C/g%3E%3Cg fill='%23eaf6f4'%3E%3Ccircle cx='6' cy='86' r='2.4' opacity='.6'/%3E%3Ccircle cx='0' cy='118' r='2' opacity='.55'/%3E%3Ccircle cx='12' cy='72' r='1.8' opacity='.5'/%3E%3Ccircle cx='-2' cy='150' r='2.2' opacity='.5'/%3E%3Ccircle cx='16' cy='138' r='1.5' opacity='.45'/%3E%3Ccircle cx='20' cy='100' r='1.4' opacity='.4'/%3E%3C/g%3E%3C/svg%3E") right bottom / contain no-repeat;
}

/* ═══ the CASSETTE bug spinning in the far upper-right corner — a small
   cassette icon whose two reels flip between two postures on steps()
   (one hop / 1.4s, explicitly NOT a continuous mover: no will-change).
   Corner-parked, off the lane. ═══ */
head meta:first-of-type::after {
  content: "";
  display: var(--boombox-scenery, block);
  position: fixed;
  right: 4vw;
  top: 6vh;
  width: 96px;
  height: 62px;
  z-index: 0;
  pointer-events: none;
  opacity: 0.8;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 78'%3E%3Crect x='4' y='4' width='112' height='70' rx='8' fill='%2317120c' stroke='%23f5b93b' stroke-width='2'/%3E%3Crect x='18' y='16' width='84' height='26' rx='4' fill='%23d8b24a'/%3E%3Crect x='24' y='20' width='72' height='8' rx='2' fill='%2317120c' opacity='.8'/%3E%3Ccircle cx='40' cy='54' r='12' fill='%2317120c' stroke='%23f3ead6' stroke-width='1.5'/%3E%3Ccircle cx='40' cy='54' r='4' fill='%23f3ead6'/%3E%3Ccircle cx='80' cy='54' r='12' fill='%2317120c' stroke='%23f3ead6' stroke-width='1.5'/%3E%3Ccircle cx='80' cy='54' r='4' fill='%23f3ead6'/%3E%3Cg stroke='%23f3ead6' stroke-width='1.2'%3E%3Cline x1='40' y1='46' x2='40' y2='50'/%3E%3Cline x1='40' y1='58' x2='40' y2='62'/%3E%3Cline x1='32' y1='54' x2='36' y2='54'/%3E%3Cline x1='44' y1='54' x2='48' y2='54'/%3E%3Cline x1='80' y1='46' x2='80' y2='50'/%3E%3Cline x1='80' y1='58' x2='80' y2='62'/%3E%3Cline x1='72' y1='54' x2='76' y2='54'/%3E%3Cline x1='84' y1='54' x2='88' y2='54'/%3E%3C/g%3E%3C/svg%3E") center / contain no-repeat;
  animation: boombox-reels 2.8s steps(1, end) infinite;
}

/* ═══ tape-hiss speckle in the streetlight cone — COARSE dots, upper-left
   ONLY (off the center text lane), low alpha. STATIC. L6-legal: it never
   overlaps the lane and the dots are widely spaced. ═══ */
head meta:last-of-type::before {
  content: "";
  display: var(--boombox-scenery, block);
  position: fixed;
  left: 0;
  top: 0;
  width: 34vw;
  height: 40vh;
  z-index: -1;
  pointer-events: none;
  opacity: 0.5;
  background-image:
    radial-gradient(circle at 30% 24%, rgba(245, 220, 170, 0.5) 0 1.4px, rgba(245, 220, 170, 0) 2.6px),
    radial-gradient(circle at 68% 52%, rgba(245, 220, 170, 0.4) 0 1.2px, rgba(245, 220, 170, 0) 2.4px),
    radial-gradient(circle at 14% 74%, rgba(245, 220, 170, 0.35) 0 1.2px, rgba(245, 220, 170, 0) 2.4px);
  background-size: 120px 120px, 96px 96px, 150px 150px;
  -webkit-mask-image: radial-gradient(ellipse 100% 100% at 12% 6%, #000 0%, rgba(0,0,0,0.5) 50%, transparent 80%);
  mask-image: radial-gradient(ellipse 100% 100% at 12% 6%, #000 0%, rgba(0,0,0,0.5) 50%, transparent 80%);
}

/* ═══ "BLOCK PARTY '9X" spray-stencil stamp, bottom-right corner above the
   hydrant. A little bit of designed graffiti fiction. STATIC. ═══ */
head meta:last-of-type::after {
  content: "BLOCK PARTY '9X";
  display: var(--boombox-scenery, block);
  position: fixed;
  right: 2.5vw;
  bottom: 24vh;
  z-index: 0;
  pointer-events: none;
  font-family: "Rubik Mono One", "Arial Black", sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  color: rgba(245, 185, 59, 0.6);
  text-shadow: 1px 1px 0 rgba(9, 6, 4, 0.8);
  transform: rotate(-6deg);
}

/* ═══ paper grain + soft warm GLINTS that RIDE THE ROLL — the only fine
   full-lane texture, so it tracks the glyphs and never flickers (L6-b). A
   handful of coarse soft warm blooms tile down the roll (every ~640px), so
   as names crawl up they drift through streetlight kisses — a subtle sheen
   that moves WITH the text (never screen-fixed). Subtle kraft speckle sits
   on top. ═══ */
.credits-roll::before,
.credits-slideshow::before {
  content: "";
  display: var(--boombox-scenery, block);
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.2;
  background-image:
    radial-gradient(ellipse 46% 42% at 32% 30%, rgba(255, 220, 144, 0.5) 0%, rgba(255, 210, 120, 0.12) 46%, rgba(255, 205, 110, 0) 72%),
    radial-gradient(ellipse 40% 34% at 68% 78%, rgba(255, 226, 156, 0.34) 0%, rgba(255, 214, 128, 0) 66%),
    radial-gradient(circle at 25% 32%, rgba(217, 185, 138, 0.7) 0 1px, rgba(217, 185, 138, 0) 2px),
    radial-gradient(circle at 72% 60%, rgba(120, 80, 50, 0.6) 0 1px, rgba(120, 80, 50, 0) 2px),
    radial-gradient(circle at 48% 84%, rgba(243, 234, 214, 0.5) 0 1px, rgba(243, 234, 214, 0) 2px);
  background-size: 900px 640px, 760px 560px, 200px 200px, 260px 260px, 320px 320px;
}

/* ═══════════ SECTION TITLES — torn kraft labels, markered ═══════════
   Every section is a torn strip of kraft paper slapped on the bricks and
   markered with the section name in Permanent Marker. The paper is a torn-
   edge SVG that STRETCHES to fill the label box (background-size 100% 100%)
   — no clip-path, so the mixtape eyebrow (::before) and marker underline
   (::after) escape the box freely. The marker-ink hue cycles gold / teal /
   red down the roll. The whole label carries a hard drop-shadow (it's a
   scrap of paper stuck to the bricks) and a slight tape-up tilt. ═══ */
.credits-block,
.credits-slide:not(.flourish) { counter-increment: bb-side; }

/* marker-ink hue cycle — gold, teal, red (content-agnostic, custom safe) */
.credits-block:nth-of-type(3n + 1) .credits-block__title,
.credits-slide:nth-of-type(3n + 1) .credits-block__title { --bb-tag: var(--bb-gold); }
.credits-block:nth-of-type(3n + 2) .credits-block__title,
.credits-slide:nth-of-type(3n + 2) .credits-block__title { --bb-tag: var(--bb-teal); }
.credits-block:nth-of-type(3n) .credits-block__title,
.credits-slide:nth-of-type(3n) .credits-block__title { --bb-tag: var(--bb-red); }

.credits-block__title {
  position: relative;
  width: fit-content;
  max-width: 84vw;
  margin: 0 auto 1.9rem;
  padding: 0.72em 1.5em 0.78em;
  font-family: var(--credits-title-font);
  font-weight: 400;
  font-size: var(--credits-title-size);
  letter-spacing: 0.01em;
  line-height: 1;
  text-transform: uppercase;
  color: var(--bb-ink);
  /* the torn kraft paper — a stretchable SVG on the ELEMENT background
     (separate props: the shorthand+/size form silently drops SVG data URIs
     in CEF/Chromium). It paints behind the text, no clip, so both pseudos
     stay free for the eyebrow + underline. */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 96' preserveAspectRatio='none'%3E%3Cdefs%3E%3ClinearGradient id='k' x1='0' y1='0' x2='0.3' y2='1'%3E%3Cstop offset='0' stop-color='%23f1e6cd'/%3E%3Cstop offset='.4' stop-color='%23dcbd8e'/%3E%3Cstop offset='1' stop-color='%23bd975f'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M4 14 L20 6 L44 15 L70 5 L98 13 L128 4 L160 14 L192 5 L222 13 L252 6 L280 15 L296 9 L293 34 L297 56 L294 80 L280 90 L252 82 L224 91 L196 83 L166 92 L136 83 L106 91 L76 83 L46 92 L20 84 L5 90 L7 64 L3 40 Z' fill='url(%23k)'/%3E%3Cpath d='M4 14 L20 6 L44 15 L70 5 L98 13 L128 4 L160 14 L192 5 L222 13 L252 6 L280 15 L296 9' fill='none' stroke='%23fff' stroke-opacity='.35' stroke-width='1.5'/%3E%3Cg stroke='%23a07d4e' stroke-opacity='.32' stroke-width='1'%3E%3Cpath d='M40 30 L120 26 M180 62 L250 58'/%3E%3C/g%3E%3C/svg%3E");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.32);
  filter: drop-shadow(0.16em 0.22em 0.02em rgba(9, 6, 4, 0.5));
  transform: rotate(-1.4deg);
}
/* markered underline swipe in the section's tag color (own pseudo — no
   clip now, so it shows clean under the text) */
.credits-block__title::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0.42em;
  width: 62%;
  height: 6px;
  transform: translateX(-50%) rotate(0.6deg);
  border-radius: 5px 7px 5px 8px;
  background: var(--bb-tag, var(--bb-gold));
  box-shadow: 0 0 6px 0 var(--bb-tag, var(--bb-gold));
  opacity: 0.92;
}
/* the mixtape side number, markered on tape above the label (escapes the
   box freely now — no clip). Finale swaps its content to SOUND CLASH. */
.credits-block__title::before {
  content: "SIDE A" " \\00B7 " counter(bb-side, decimal-leading-zero);
  position: absolute;
  left: 0.7em;
  bottom: calc(100% - 0.35em);
  font-family: var(--credits-font);
  font-weight: 800;
  font-size: 0.46rem;
  letter-spacing: 0.36em;
  white-space: nowrap;
  color: var(--bb-tag, var(--bb-gold));
  text-shadow: 0 1px 6px rgba(9, 6, 4, 0.95);
  opacity: 0.9;
}

/* ═══════════ ROWS — tags on the wall ═══════════
   Names in bold condensed marker (cream), amounts ride in a gold bubble-
   tag pill (rounded, inset highlight + drop-shadow; goes red in the finale).
   Names are sacred — inline-flex + wrap, never clipped. ═══ */
.credits-block__list { gap: 0.5rem; }
.credit {
  max-width: min(40rem, 90vw);
  margin-inline: auto;
  min-width: 0;
  overflow-wrap: anywhere;
  display: inline-flex;
  align-items: baseline;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.15em 0.5em;
  font-weight: 700;
  letter-spacing: 0.01em;
  line-height: 1.4;
}
.credit__name {
  color: var(--bb-cream);
  text-shadow: 0 1px 0 rgba(9, 6, 4, 0.5), 0 2px 10px rgba(9, 6, 4, 0.55);
}
/* bubble-tag amount pill */
.credit__amount {
  opacity: 1;
  font-size: 0.7em;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: var(--bb-ink);
  background: var(--bb-gold);
  padding: 0.14em 0.62em 0.1em;
  border-radius: 999px;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.35) inset, 0 2px 6px rgba(9, 6, 4, 0.5);
  font-variant-numeric: tabular-nums;
}
.credit__amount::before { content: none; }

/* ═══════════ FLOURISH CARDS ═══════════ */
.flourish--intro { gap: 1.3rem; }

/* badge -> the flyer eyebrow (copy swap via font-size:0 + ::after) */
.flourish__badge { font-size: 0; border: 0; border-radius: 0; padding: 0; box-shadow: none; }
.flourish__badge::after {
  content: "ONE NIGHT ON THE AVENUE";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 800;
  font-size: 0.82rem;
  letter-spacing: 0.4em;
  padding: 0.5em 0 0.5em 0.4em;
  text-transform: uppercase;
  color: var(--bb-gold);
  border-top: 2px solid rgba(245, 185, 59, 0.6);
  border-bottom: 2px solid rgba(245, 185, 59, 0.6);
}

/* the streamer's title — sprayed big on the wall, marker font, gold-to-red
   with a hard ink drop-shadow (restyle only, keeps the streamer's text) */
.flourish--intro .flourish__title {
  font-family: var(--credits-title-font);
  font-weight: 400;
  letter-spacing: 0.01em;
  line-height: 1.02;
  max-width: min(90vw, 12em);
  color: var(--bb-gold);
  text-shadow:
    3px 3px 0 var(--bb-red),
    5px 5px 0 rgba(9, 6, 4, 0.85),
    0 0 26px rgba(245, 185, 59, 0.25);
  transform: rotate(-1.6deg);
}

/* streamer tagline: restyle only — hand-scrawled marker aside */
.flourish--intro .flourish__tagline {
  font-family: var(--credits-title-font);
  font-style: normal;
  font-weight: 400;
  font-size: 1.2rem;
  letter-spacing: 0.02em;
  color: var(--bb-cream);
  transform: rotate(0.8deg);
  opacity: 0.92;
}

/* rating -> the block-permit stamp (copy swap) */
.flourish__rating { font-size: 0; border: 0; padding: 0; opacity: 1; }
.flourish__rating::after {
  content: "BYOB · BRING YA OWN BREAKS";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 800;
  font-size: 0.72rem;
  letter-spacing: 0.24em;
  padding: 0.45em 0.9em 0.4em 1.14em;
  text-transform: uppercase;
  color: var(--bb-teal);
  border: 2px solid rgba(47, 191, 168, 0.55);
  border-radius: 4px;
  transform: rotate(-2deg);
}

/* the flyer fine print under the intro */
.flourish--intro::after {
  content: "no cover · pass the aux · all crews welcome";
  display: var(--boombox-scenery, block);
  font-family: var(--credits-font);
  font-weight: 600;
  font-size: 0.66rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(243, 234, 214, 0.5);
}

/* outro: PACK THE CRATES — sprayed on the last label, copy swap */
.flourish--outro::before {
  content: "\\25AA \\25AA \\25AA";
  display: var(--boombox-scenery, block);
  font-size: 0.7rem;
  letter-spacing: 0.8em;
  padding-left: 0.8em;
  color: var(--bb-gold);
  opacity: 0.7;
}
.flourish--outro .flourish__title { font-size: 0; }
.flourish--outro .flourish__title::after {
  content: "PARTY OVER";
  display: inline-block;
  font-family: var(--credits-title-font);
  font-weight: 400;
  font-size: var(--credits-flourish-title-size);
  letter-spacing: 0.02em;
  line-height: 1.02;
  color: var(--bb-gold);
  text-shadow: 3px 3px 0 var(--bb-red), 5px 5px 0 rgba(9, 6, 4, 0.85);
  transform: rotate(-1.4deg);
}
.flourish--outro .flourish__tagline { font-size: 0; }
.flourish--outro .flourish__tagline::after {
  content: "pack the crates \\2014 same block, next stream";
  font-family: var(--credits-title-font);
  font-weight: 400;
  font-size: 1.2rem;
  letter-spacing: 0.02em;
  color: var(--bb-cream);
}

/* ═══════════ RAID FINALE — SOUND CLASH ═══════════
   A rival crew rolls up: the whole wall lights RED, the section label goes
   red kraft, the eyebrow reads SOUND CLASH and pulses on a steps() glow
   (~0.5 paints/s — the ONLY animation inside the roll, far under the 2/s
   ceiling). Declared after the hue cycle so it wins the cascade. ═══ */
.credits-block:nth-last-of-type(2) .credits-block__title,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
  --bb-tag: #ffd0cf;
  color: var(--bb-cream);
  text-shadow: 0 2px 0 rgba(9, 6, 4, 0.55), 0 0 18px rgba(255, 90, 79, 0.5);
  /* the label paper goes red kraft — a torn strip that got sprayed over
     (element background, separate props, same as the base label) */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 96' preserveAspectRatio='none'%3E%3Cdefs%3E%3ClinearGradient id='r' x1='0' y1='0' x2='0.3' y2='1'%3E%3Cstop offset='0' stop-color='%23ff6a5a'/%3E%3Cstop offset='.5' stop-color='%23e0333a'/%3E%3Cstop offset='1' stop-color='%239c1f22'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M4 14 L20 6 L44 15 L70 5 L98 13 L128 4 L160 14 L192 5 L222 13 L252 6 L280 15 L296 9 L293 34 L297 56 L294 80 L280 90 L252 82 L224 91 L196 83 L166 92 L136 83 L106 91 L76 83 L46 92 L20 84 L5 90 L7 64 L3 40 Z' fill='url(%23r)'/%3E%3Cpath d='M4 14 L20 6 L44 15 L70 5 L98 13 L128 4 L160 14 L192 5 L222 13 L252 6 L280 15 L296 9' fill='none' stroke='%23fff' stroke-opacity='.4' stroke-width='1.5'/%3E%3C/svg%3E");
}
/* scroll: a tight red halo dying inside the block; slideshow: whole slide warms */
.credits-block:nth-last-of-type(2) {
  background: radial-gradient(ellipse 58% 62% at 50% 34%, rgba(224, 51, 58, 0.15), rgba(224, 51, 58, 0) 72%);
}
.credits-slide:nth-last-of-type(2):not(.flourish) {
  background: radial-gradient(ellipse 64% 60% at 50% 46%, rgba(224, 51, 58, 0.14), rgba(224, 51, 58, 0) 80%);
}
.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  content: "\\26A1 SOUND CLASH \\26A1";
  color: #ffd0cf;
  letter-spacing: 0.22em;
  text-shadow: 0 0 14px rgba(255, 90, 79, 0.7), 0 1px 6px rgba(9, 6, 4, 0.9);
  animation: boombox-clash 4s steps(1, end) infinite;
}
.credits-block:nth-last-of-type(2) .credit,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit {
  font-size: calc(var(--credits-name-size) * 1.08);
}
.credits-block:nth-last-of-type(2) .credit__name,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__name {
  text-shadow: 0 0 16px rgba(255, 90, 79, 0.4), 0 2px 10px rgba(9, 6, 4, 0.55);
}
.credits-block:nth-last-of-type(2) .credit__amount,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__amount {
  background: #ff5a4f;
  color: #17120c;
}

/* ═══ slideshow: each slide slaps onto the wall (small settle) ═══ */
.credits-slide {
  transform: translateY(12px) rotate(-0.6deg);
  transition: opacity 0.85s ease, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}
.credits-slide.is-active { transform: none; }

/* ═══ keyframes (all boombox- prefixed; transform/opacity ONLY) ═══ */
/* party bulb: a gentle throb, ~one pulse per 3.2s */
@keyframes boombox-bulb {
  0%, 100% { transform: scale(0.9); }
  50%      { transform: scale(1.12); }
}
/* spray-mist: five held drift positions over 11s (one hop / 2.2s) */
@keyframes boombox-mist {
  0%   { transform: translate3d(0, 0, 0); opacity: 0.5; }
  20%  { transform: translate3d(0.4vw, -2vh, 0); opacity: 0.42; }
  40%  { transform: translate3d(1vw, -4vh, 0); opacity: 0.34; }
  60%  { transform: translate3d(0.6vw, -6vh, 0); opacity: 0.24; }
  80%  { transform: translate3d(1.2vw, -8vh, 0); opacity: 0.12; }
  100% { transform: translate3d(0, 0, 0); opacity: 0.5; }
}
/* cassette reels: two discrete postures per 2.8s (~0.7 hops/s) */
@keyframes boombox-reels {
  0%, 50%   { transform: rotate(0deg); }
  50.01%, 100% { transform: rotate(30deg); }
}
/* SOUND CLASH eyebrow: two discrete dips per 4s — the wall pulsing red */
@keyframes boombox-clash {
  0%, 52%   { opacity: 1; }
  60%, 74%  { opacity: 0.5; }
  82%, 100% { opacity: 1; }
}

/* ═══ reduced motion: the party holds — the bulb parks lit, the mist
   parks faint, the reels stop, the clash stops pulsing, slides settle. ═══ */
@media (prefers-reduced-motion: reduce) {
  head::before { animation: none; transform: scale(1); }
  head::after { animation: none; }
  head meta:first-of-type::after { animation: none; }
  .credits-block:nth-last-of-type(2) .credits-block__title::before,
  .credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
    animation: none;
  }
  .credits-slide { transform: none; transition: opacity 0.8s ease; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--boombox-scenery:none;}",
};
