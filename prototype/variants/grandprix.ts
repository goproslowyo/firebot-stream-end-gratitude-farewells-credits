import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. Chequered Flag — Grand Prix: a night race broadcast from the pit straight. Carbon-fibre dark, floodlit grandstand, a timing tower reading positions and gaps, chequered band divider, and an F1 car streaking the bottom straight every lap. */
export const VARIANT: ThemeVariant = {
  key: "grandprix",
  name: "Chequered Flag — Grand Prix",
  css: `
/* ================================================================
   CHEQUERED FLAG — GRAND PRIX — layered after the base theme.
   Fiction: lights out at a floodlit night circuit. The broadcast
   is running the classification down the timing tower — position,
   driver, gap to leader (+0.500) — over the carbon-fibre wall of
   the pit garage. Behind it: the main grandstand under the lights,
   the track apron, tyre barriers, marshal posts. A single-seater
   streaks the pit straight every lap (baked speed lines). DRS is
   enabled top-left; the pit lane is OPEN top-right. The raid is
   the CHEQUERED FLAG — P1, gold. Then it is a cool-down lap home.
   Layer map (all scenery kill-switched via --grandprix-scenery):
     html bg (--credits-bg)   night circuit gradient (cheap linear +
                              one floodlight bloom radial)
     html::before             THE CIRCUIT — grandstand under lights,
                              floodlight pylons + soft cones, track
                              apron, kerb, tyre wall. STATIC, promoted
     html::after              floodlight light-story + corner vignette
                              + center-lane readability scrim. STATIC
     head::before             THE CAR — F1 single-seater, the ONLY
                              continuous mover, streaks the pit straight
                              L→R every ~19s with baked speed lines
                              (will-change budget: 1)
     head::after              marshal post + waved flags, far right,
                              STATIC promoted foreground object
     meta#1::before           DRS ENABLED chip, top-left corner
     meta#1::after            PIT LANE OPEN chip, top-right corner
     meta#2::before           tyre barrier stack, bottom-left corner,
                              STATIC promoted foreground
     meta#2::after            start-gantry lights strip, top-center,
                              STATIC (5 red lights = go-signal motif)
     body::before             CHEQUERED FLOOR BAND — coarse 46px checks
                              along the very bottom (L6-legal: coarse),
                              plus the track-edge kerb. STATIC promoted
     body::after              flood haze drifting over the stand — one
                              huge soft layer, steps() drift. Kill-safe
     .credits-roll::before    carbon-fibre weave — the fine pattern, so
     .credits-slideshow::before  it RIDES THE ROLL (no flicker)
   ================================================================ */
@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Rajdhani:wght@500;600;700&family=Syncopate:wght@700&display=swap');

:root {
  --grandprix-scenery: block; /* set to none to strip every scenery layer */
  /* ── palette: the circuit at night ── */
  --gp-red: #e10600;        /* F1 racing red */
  --gp-red-bright: #ff2b23;
  --gp-white: #f4f6f9;
  --gp-silver: #c6ced8;
  --gp-amber: #ffb020;      /* timing tower amber */
  --gp-green: #2fe08a;      /* purple-sector green (fastest) */
  --gp-gold: #ffcf3f;       /* P1 */
  --gp-carbon: #0b0d11;
  --gp-graphite: #14181f;

  /* cheap night: a deep sky vault falling to the black apron, one cool
     floodlight bloom off the top, and a warm sodium-lit horizon glow where
     the far grandstand meets the sky (L3: stand + cones live on promoted
     pseudos; this is only gradients). */
  --credits-bg:
    radial-gradient(ellipse 78% 30% at 50% 40%, rgba(210, 150, 78, 0.10) 0%, rgba(180, 120, 64, 0.05) 40%, rgba(11, 13, 17, 0) 70%),
    radial-gradient(ellipse 62% 42% at 50% -8%, rgba(150, 176, 210, 0.16) 0%, rgba(120, 150, 190, 0.06) 44%, rgba(11, 13, 17, 0) 74%),
    radial-gradient(ellipse 120% 60% at 50% 116%, rgba(6, 8, 12, 0.9) 0%, rgba(6, 8, 12, 0) 60%),
    linear-gradient(180deg, #0a0e16 0%, #0b0f16 20%, #0c1017 40%, #0a0d13 60%, #080a10 80%, #05070b 100%);
  --credits-color: var(--gp-white);
  --credits-accent: var(--gp-red);
  --credits-font: "Rajdhani", "Chakra Petch", "Segoe UI", "Helvetica Neue", sans-serif;
  --credits-title-font: "Chakra Petch", "Rajdhani", "Segoe UI", sans-serif;
  --credits-title-size: clamp(1.3rem, 3.3vw, 2rem);
  --credits-name-size: clamp(1.02rem, 2.5vw, 1.5rem);
  --credits-flourish-title-size: clamp(2.2rem, 7vw, 4.4rem);
  --credits-block-gap: 5rem;
  --credits-name-gap: 0.5rem;
  --credits-shadow: 0 2px 12px rgba(2, 4, 8, 0.85);
  /* glow no-op — NEVER "none" (a none in the base's shadow list kills the
     whole declaration); grand-prix glows are bespoke per element. */
  --credits-glow: 0 0 0 rgba(0, 0, 0, 0);
}

/* scenery is full-bleed: html drops the base edge-fade; body keeps it so the
   crawling classification eases in at the floor and dissolves at the ceiling. */
html { -webkit-mask-image: none; mask-image: none; }
body { background: transparent; counter-reset: gp-pos; }

/* ═══ THE CIRCUIT — the place, one static promoted layer. Far back: the main
   grandstand under the lights (a low dark band with a soft-lit roof and rows
   of tiny seat speckles that are COARSE and OFF the lane). Two floodlight
   pylons throw soft cones down onto the apron. Foreground: the track apron
   with a red/white kerb strip and a tyre barrier line. All huge and soft —
   nothing here is a fine pattern over the center lane. ═══ */
html::before {
  content: "";
  display: var(--grandprix-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* THE CIRCUIT: a distant hazed grandstand tier + a nearer, higher-contrast
       main stand under four floodlight pylons; volumetric light cones splash to
       a warm-pooled apron; a catch fence and pit-wall run across the front. Built
       with atmospheric perspective — far things are cooler, lower-contrast, hazier.
       One wide SVG band pinned to the bottom. Everything coarse/soft off the lane. */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 760' preserveAspectRatio='xMidYMax slice'%3E%3Cdefs%3E%3ClinearGradient id='farstand' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%2318212f'/%3E%3Cstop offset='1' stop-color='%230e1520'/%3E%3C/linearGradient%3E%3ClinearGradient id='stand' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23283548'/%3E%3Cstop offset='.55' stop-color='%23161f2d'/%3E%3Cstop offset='1' stop-color='%230b0f17'/%3E%3C/linearGradient%3E%3ClinearGradient id='roof' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%235a6f88'/%3E%3Cstop offset='.5' stop-color='%232c3949'/%3E%3Cstop offset='1' stop-color='%23161d29'/%3E%3C/linearGradient%3E%3ClinearGradient id='apron' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%2318202b'/%3E%3Cstop offset='.4' stop-color='%230f141c'/%3E%3Cstop offset='1' stop-color='%23070a0f'/%3E%3C/linearGradient%3E%3ClinearGradient id='cone' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23eef5ff' stop-opacity='.4'/%3E%3Cstop offset='24%25' stop-color='%23cfe0fb' stop-opacity='.2'/%3E%3Cstop offset='58%25' stop-color='%23b6cbec' stop-opacity='.07'/%3E%3Cstop offset='100%25' stop-color='%23aebfd8' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='coneEdge' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23f2f8ff' stop-opacity='.5'/%3E%3Cstop offset='60%25' stop-color='%23cfe0fb' stop-opacity='.06'/%3E%3Cstop offset='100%25' stop-color='%23cfe0fb' stop-opacity='0'/%3E%3C/linearGradient%3E%3CradialGradient id='crowd' cx='50%25' cy='24%25' r='72%25'%3E%3Cstop offset='0' stop-color='%237c9bce' stop-opacity='.32'/%3E%3Cstop offset='100%25' stop-color='%237c9bce' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='warmwash' cx='50%25' cy='30%25' r='70%25'%3E%3Cstop offset='0' stop-color='%23c99a5a' stop-opacity='.14'/%3E%3Cstop offset='100%25' stop-color='%23c99a5a' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='bloom' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0' stop-color='%23f4faff' stop-opacity='.95'/%3E%3Cstop offset='26%25' stop-color='%23d2e4fb' stop-opacity='.5'/%3E%3Cstop offset='100%25' stop-color='%23bcd4f4' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='haze' cx='50%25' cy='100%25' r='75%25'%3E%3Cstop offset='0' stop-color='%232e3d58' stop-opacity='.55'/%3E%3Cstop offset='100%25' stop-color='%232e3d58' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='pool' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23cfe0fb' stop-opacity='.14'/%3E%3Cstop offset='100%25' stop-color='%23cfe0fb' stop-opacity='0'/%3E%3C/linearGradient%3E%3Cg id='glint'%3E%3Cpath d='M0 -9 L1.4 -1.4 L9 0 L1.4 1.4 L0 9 L-1.4 1.4 L-9 0 L-1.4 -1.4 Z' fill='%23fffdf2'/%3E%3Ccircle r='2.4' fill='%23fff'/%3E%3C/g%3E%3C/defs%3E%3C!-- distant sky haze band behind the stands --%3E%3Crect x='0' y='150' width='1600' height='260' fill='url(%23haze)'/%3E%3C!-- distant hazed circuit skyline: hospitality tower + pit building silhouettes on the far side, lit windows, low contrast (kills the black void, adds depth) --%3E%3Cg opacity='.6'%3E%3Crect x='560' y='236' width='96' height='60' fill='%23202c40'/%3E%3Crect x='700' y='220' width='150' height='76' rx='3' fill='%23243044'/%3E%3Crect x='900' y='244' width='120' height='52' fill='%231e2a3c'/%3E%3Crect x='1030' y='210' width='60' height='86' fill='%23283750'/%3E%3Cg fill='%23e9c887' opacity='.5'%3E%3Crect x='712' y='230' width='7' height='5'/%3E%3Crect x='726' y='230' width='7' height='5'/%3E%3Crect x='740' y='230' width='7' height='5'/%3E%3Crect x='712' y='244' width='7' height='5'/%3E%3Crect x='740' y='244' width='7' height='5'/%3E%3Crect x='772' y='230' width='7' height='5'/%3E%3Crect x='800' y='244' width='7' height='5'/%3E%3Crect x='1044' y='222' width='6' height='6'/%3E%3Crect x='1058' y='222' width='6' height='6'/%3E%3Crect x='1044' y='238' width='6' height='6'/%3E%3Crect x='1072' y='238' width='6' height='6'/%3E%3Crect x='1044' y='256' width='6' height='6'/%3E%3Crect x='1072' y='222' width='6' height='6'/%3E%3C/g%3E%3Cg fill='%237fa0cc' opacity='.4'%3E%3Crect x='916' y='254' width='6' height='5'/%3E%3Crect x='934' y='254' width='6' height='5'/%3E%3Crect x='970' y='270' width='6' height='5'/%3E%3Crect x='998' y='254' width='6' height='5'/%3E%3C/g%3E%3C/g%3E%3C!-- FAR grandstand tier (hazed, low contrast, cooler) --%3E%3Cpath d='M0 292 Q800 262 1600 292 L1600 360 L0 360 Z' fill='url(%23farstand)' opacity='.85'/%3E%3Cg stroke-linecap='round'%3E%3Cpath d='M30 312 Q800 286 1570 312' fill='none' stroke='%236884ab' stroke-opacity='.15' stroke-width='7' stroke-dasharray='2 17'/%3E%3Cpath d='M20 332 Q800 304 1580 332' fill='none' stroke='%237491b8' stroke-opacity='.17' stroke-width='7' stroke-dasharray='2 18'/%3E%3C/g%3E%3C!-- far roof line catching light --%3E%3Cpath d='M0 292 Q800 262 1600 292' fill='none' stroke='%236e88a8' stroke-opacity='.34' stroke-width='2'/%3E%3C!-- volumetric floodlight cones: soft body + a crisp bright leading edge so they read as real beams splashing the apron --%3E%3Cg%3E%3Cpolygon points='250,86 78,556 434,556 352,86' fill='url(%23cone)'/%3E%3Cpolygon points='250,86 78,556 118,556 292,86' fill='url(%23coneEdge)'/%3E%3Cpolygon points='620,84 512,556 802,556 704,84' fill='url(%23cone)' opacity='.8'/%3E%3Cpolygon points='980,84 798,556 1088,556 1064,84' fill='url(%23cone)' opacity='.8'/%3E%3Cpolygon points='1350,86 1246,556 1602,556 1452,86' fill='url(%23cone)'/%3E%3Cpolygon points='1450,86 1428,556 1602,556 1522,86' fill='url(%23coneEdge)'/%3E%3C/g%3E%3C!-- MAIN grandstand structure --%3E%3Cpath d='M40 322 Q800 278 1560 322 L1560 476 L40 476 Z' fill='url(%23stand)'/%3E%3C!-- warm/cool crowd washes spilling down the tiers --%3E%3Cellipse cx='800' cy='398' rx='770' ry='134' fill='url(%23crowd)'/%3E%3Cellipse cx='300' cy='420' rx='300' ry='90' fill='url(%23warmwash)'/%3E%3Cellipse cx='1300' cy='420' rx='300' ry='90' fill='url(%23warmwash)'/%3E%3C!-- CROWD: five seat tiers built as dense coarse speckle rows, brighter+warmer toward the front (nearer), cooler+dimmer up back. Multiple hues per tier so it reads as thousands of people, not one gray dot. --%3E%3Cg stroke-linecap='round'%3E%3C!-- tier 1 (back, coolest) --%3E%3Cpath d='M120 352 Q800 314 1480 352' fill='none' stroke='%238ba4c8' stroke-opacity='.2' stroke-width='8' stroke-dasharray='3 13'/%3E%3Cpath d='M124 350 Q800 312 1476 350' fill='none' stroke='%23c9b48a' stroke-opacity='.13' stroke-width='7' stroke-dasharray='2 26'/%3E%3C!-- tier 2 --%3E%3Cpath d='M108 380 Q800 340 1492 380' fill='none' stroke='%239ab2d6' stroke-opacity='.24' stroke-width='9' stroke-dasharray='3 13'/%3E%3Cpath d='M112 378 Q800 338 1488 378' fill='none' stroke='%23d8c48e' stroke-opacity='.16' stroke-width='7' stroke-dasharray='2 24'/%3E%3Cpath d='M116 382 Q800 342 1484 382' fill='none' stroke='%23c98a7a' stroke-opacity='.12' stroke-width='6' stroke-dasharray='2 40'/%3E%3C!-- tier 3 (mid) --%3E%3Cpath d='M98 410 Q800 368 1502 410' fill='none' stroke='%23a9c2e4' stroke-opacity='.3' stroke-width='10' stroke-dasharray='3 13'/%3E%3Cpath d='M102 408 Q800 366 1498 408' fill='none' stroke='%23e6d199' stroke-opacity='.2' stroke-width='8' stroke-dasharray='2 22'/%3E%3Cpath d='M94 413 Q800 371 1506 413' fill='none' stroke='%237fb0d8' stroke-opacity='.16' stroke-width='7' stroke-dasharray='2 34'/%3E%3C!-- tier 4 --%3E%3Cpath d='M88 442 Q800 398 1512 442' fill='none' stroke='%23b8cdec' stroke-opacity='.36' stroke-width='11' stroke-dasharray='3 12'/%3E%3Cpath d='M92 440 Q800 396 1508 440' fill='none' stroke='%23f0d89e' stroke-opacity='.24' stroke-width='8' stroke-dasharray='2 20'/%3E%3Cpath d='M84 445 Q800 401 1516 445' fill='none' stroke='%23e39a6a' stroke-opacity='.16' stroke-width='7' stroke-dasharray='2 30'/%3E%3C!-- tier 5 (front, brightest, warmest) --%3E%3Cpath d='M80 470 Q800 424 1520 470' fill='none' stroke='%23c6d8f0' stroke-opacity='.4' stroke-width='12' stroke-dasharray='3 12'/%3E%3Cpath d='M84 468 Q800 422 1516 468' fill='none' stroke='%23f6dea4' stroke-opacity='.28' stroke-width='9' stroke-dasharray='2 18'/%3E%3Cpath d='M76 473 Q800 427 1524 473' fill='none' stroke='%23ee8f6a' stroke-opacity='.18' stroke-width='7' stroke-dasharray='2 28'/%3E%3C/g%3E%3C!-- PHONE-FLASH SPARKLE: coarse bright points scattered across the crowd, kept to the LEFT and RIGHT thirds (off the center text lane). Static specular = L6-safe. --%3E%3Cg fill='%23fffdf4'%3E%3Ccircle cx='150' cy='372' r='3.4' opacity='.9'/%3E%3Ccircle cx='232' cy='406' r='3' opacity='.8'/%3E%3Ccircle cx='300' cy='384' r='3.6' opacity='.95'/%3E%3Ccircle cx='188' cy='444' r='3.2' opacity='.85'/%3E%3Ccircle cx='356' cy='432' r='3' opacity='.75'/%3E%3Ccircle cx='268' cy='462' r='3.8' opacity='1'/%3E%3Ccircle cx='420' cy='396' r='3' opacity='.7'/%3E%3Ccircle cx='120' cy='420' r='3.2' opacity='.8'/%3E%3Ccircle cx='388' cy='468' r='3.4' opacity='.9'/%3E%3Ccircle cx='1180' cy='372' r='3.4' opacity='.85'/%3E%3Ccircle cx='1268' cy='404' r='3.2' opacity='.9'/%3E%3Ccircle cx='1340' cy='386' r='3.6' opacity='.95'/%3E%3Ccircle cx='1212' cy='446' r='3' opacity='.8'/%3E%3Ccircle cx='1420' cy='430' r='3.4' opacity='.9'/%3E%3Ccircle cx='1300' cy='464' r='3.8' opacity='1'/%3E%3Ccircle cx='1470' cy='398' r='3' opacity='.7'/%3E%3Ccircle cx='1150' cy='420' r='3.2' opacity='.8'/%3E%3Ccircle cx='1392' cy='468' r='3.2' opacity='.85'/%3E%3C/g%3E%3C!-- roof lip (the bright edge catching the floodlights) --%3E%3Cpath d='M28 322 Q800 276 1572 322 L1552 336 Q800 292 48 336 Z' fill='url(%23roof)'/%3E%3Cpath d='M32 324 Q800 278 1568 324' fill='none' stroke='%23d0e0f6' stroke-opacity='.7' stroke-width='2.5'/%3E%3C!-- roof trusses --%3E%3Cg stroke='%230f151e' stroke-width='5' stroke-opacity='.85'%3E%3Cline x1='230' y1='330' x2='230' y2='476'/%3E%3Cline x1='520' y1='308' x2='520' y2='476'/%3E%3Cline x1='800' y1='300' x2='800' y2='476'/%3E%3Cline x1='1080' y1='308' x2='1080' y2='476'/%3E%3Cline x1='1370' y1='330' x2='1370' y2='476'/%3E%3C/g%3E%3Cg stroke='%234a5c74' stroke-width='1.5' stroke-opacity='.6'%3E%3Cline x1='233' y1='330' x2='233' y2='476'/%3E%3Cline x1='523' y1='308' x2='523' y2='476'/%3E%3Cline x1='803' y1='300' x2='803' y2='476'/%3E%3Cline x1='1083' y1='308' x2='1083' y2='476'/%3E%3Cline x1='1373' y1='330' x2='1373' y2='476'/%3E%3C/g%3E%3C!-- FLOODLIGHT PYLONS: two big front + two smaller mid. Each a lattice mast + real lamp bank with lit bulbs, a bright bloom halo, and a coarse specular star-glint (sparkle on the light itself). --%3E%3Cg%3E%3C!-- pylon L (front) --%3E%3Crect x='294' y='96' width='9' height='232' fill='%232e3a4c'/%3E%3Crect x='296' y='96' width='2.5' height='232' fill='%235c7092' opacity='.6'/%3E%3Cg stroke='%233c4a5e' stroke-width='1.2' stroke-opacity='.55'%3E%3Cline x1='294' y1='120' x2='303' y2='140'/%3E%3Cline x1='303' y1='120' x2='294' y2='140'/%3E%3Cline x1='294' y1='168' x2='303' y2='188'/%3E%3Cline x1='303' y1='168' x2='294' y2='188'/%3E%3Cline x1='294' y1='216' x2='303' y2='236'/%3E%3Cline x1='303' y1='216' x2='294' y2='236'/%3E%3Cline x1='294' y1='264' x2='303' y2='284'/%3E%3Cline x1='303' y1='264' x2='294' y2='284'/%3E%3C/g%3E%3Ccircle cx='299' cy='84' r='50' fill='url(%23bloom)'/%3E%3Crect x='268' y='70' width='62' height='26' rx='4' fill='%23222d3c'/%3E%3Crect x='268' y='70' width='62' height='26' rx='4' fill='none' stroke='%235a6f8c' stroke-width='1.4' stroke-opacity='.8'/%3E%3Crect x='270' y='71.5' width='58' height='3' rx='2' fill='%237791b2' opacity='.6'/%3E%3Cg%3E%3Ccircle cx='281' cy='83' r='6.5' fill='%23bcd2f4'/%3E%3Ccircle cx='281' cy='83' r='5' fill='%23fbfdff'/%3E%3Ccircle cx='299' cy='83' r='6.5' fill='%23bcd2f4'/%3E%3Ccircle cx='299' cy='83' r='5' fill='%23fbfdff'/%3E%3Ccircle cx='317' cy='83' r='6.5' fill='%23bcd2f4'/%3E%3Ccircle cx='317' cy='83' r='5' fill='%23fbfdff'/%3E%3C/g%3E%3Cuse href='%23glint' x='299' y='83' opacity='.95'/%3E%3C!-- pylon R (front) --%3E%3Crect x='1297' y='96' width='9' height='232' fill='%232e3a4c'/%3E%3Crect x='1299' y='96' width='2.5' height='232' fill='%235c7092' opacity='.6'/%3E%3Cg stroke='%233c4a5e' stroke-width='1.2' stroke-opacity='.55'%3E%3Cline x1='1297' y1='120' x2='1306' y2='140'/%3E%3Cline x1='1306' y1='120' x2='1297' y2='140'/%3E%3Cline x1='1297' y1='168' x2='1306' y2='188'/%3E%3Cline x1='1306' y1='168' x2='1297' y2='188'/%3E%3Cline x1='1297' y1='216' x2='1306' y2='236'/%3E%3Cline x1='1306' y1='216' x2='1297' y2='236'/%3E%3Cline x1='1297' y1='264' x2='1306' y2='284'/%3E%3Cline x1='1306' y1='264' x2='1297' y2='284'/%3E%3C/g%3E%3Ccircle cx='1301' cy='84' r='50' fill='url(%23bloom)'/%3E%3Crect x='1270' y='70' width='62' height='26' rx='4' fill='%23222d3c'/%3E%3Crect x='1270' y='70' width='62' height='26' rx='4' fill='none' stroke='%235a6f8c' stroke-width='1.4' stroke-opacity='.8'/%3E%3Crect x='1272' y='71.5' width='58' height='3' rx='2' fill='%237791b2' opacity='.6'/%3E%3Cg%3E%3Ccircle cx='1283' cy='83' r='6.5' fill='%23bcd2f4'/%3E%3Ccircle cx='1283' cy='83' r='5' fill='%23fbfdff'/%3E%3Ccircle cx='1301' cy='83' r='6.5' fill='%23bcd2f4'/%3E%3Ccircle cx='1301' cy='83' r='5' fill='%23fbfdff'/%3E%3Ccircle cx='1319' cy='83' r='6.5' fill='%23bcd2f4'/%3E%3Ccircle cx='1319' cy='83' r='5' fill='%23fbfdff'/%3E%3C/g%3E%3Cuse href='%23glint' x='1301' y='83' opacity='.95'/%3E%3C!-- pylon mid-L (further, hazier) --%3E%3Crect x='662' y='116' width='6' height='192' fill='%23283242' opacity='.85'/%3E%3Ccircle cx='665' cy='106' r='32' fill='url(%23bloom)' opacity='.72'/%3E%3Crect x='646' y='97' width='40' height='16' rx='2' fill='%232a3648'/%3E%3Cg fill='%23eaf2ff'%3E%3Ccircle cx='655' cy='105' r='3.4'/%3E%3Ccircle cx='665' cy='105' r='3.4'/%3E%3Ccircle cx='675' cy='105' r='3.4'/%3E%3C/g%3E%3Cuse href='%23glint' x='665' y='105' opacity='.7' transform='scale(.7)' transform-origin='665 105'/%3E%3C!-- pylon mid-R (further, hazier) --%3E%3Crect x='932' y='116' width='6' height='192' fill='%23283242' opacity='.85'/%3E%3Ccircle cx='935' cy='106' r='32' fill='url(%23bloom)' opacity='.72'/%3E%3Crect x='916' y='97' width='40' height='16' rx='2' fill='%232a3648'/%3E%3Cg fill='%23eaf2ff'%3E%3Ccircle cx='925' cy='105' r='3.4'/%3E%3Ccircle cx='935' cy='105' r='3.4'/%3E%3Ccircle cx='945' cy='105' r='3.4'/%3E%3C/g%3E%3Cuse href='%23glint' x='935' y='105' opacity='.7' transform='scale(.7)' transform-origin='935 105'/%3E%3C/g%3E%3C!-- catch fence + debris fence in front of the stand (coarse, faint) --%3E%3Cpath d='M40 476 L1560 476' stroke='%23323f52' stroke-width='2.5'/%3E%3Cpath d='M40 468 L1560 468' stroke='%23212b38' stroke-width='1' stroke-opacity='.6'/%3E%3C!-- track apron / tarmac --%3E%3Cpath d='M0 476 L1600 476 L1600 760 L0 760 Z' fill='url(%23apron)'/%3E%3C!-- warm-cool floodlight pools on the apron (elongated, believable falloff) --%3E%3Cellipse cx='250' cy='600' rx='260' ry='62' fill='url(%23pool)'/%3E%3Cellipse cx='665' cy='578' rx='176' ry='40' fill='url(%23pool)' opacity='.75'/%3E%3Cellipse cx='935' cy='578' rx='176' ry='40' fill='url(%23pool)' opacity='.75'/%3E%3Cellipse cx='1350' cy='600' rx='260' ry='62' fill='url(%23pool)'/%3E%3C!-- pit wall line running the front of the apron --%3E%3Crect x='0' y='500' width='1600' height='7' fill='%2314202e' opacity='.7'/%3E%3Crect x='0' y='500' width='1600' height='2' fill='%233a4c64' opacity='.5'/%3E%3C/svg%3E") center bottom / cover no-repeat,
    /* soft warm marshal-post glow low right */
    radial-gradient(ellipse 26vw 14vh at 84% 70%, rgba(255, 150, 60, 0.06), rgba(255, 150, 60, 0) 72%);
}

/* ═══ light story + scrim: cool floodlight wash from top corners falling to a
   dark apron, a corner vignette so the frame closes, and a center-lane scrim
   so the white classification never fights the stand lights. STATIC. ═══ */
html::after {
  content: "";
  display: var(--grandprix-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* center-lane readability scrim (paints on top of everything below) */
    linear-gradient(90deg, rgba(5, 7, 11, 0) 12%, rgba(5, 7, 11, 0.42) 30%, rgba(5, 7, 11, 0.5) 50%, rgba(5, 7, 11, 0.42) 70%, rgba(5, 7, 11, 0) 88%),
    /* corner vignette */
    radial-gradient(ellipse 132% 120% at 50% 42%, rgba(3, 5, 9, 0) 56%, rgba(3, 5, 9, 0.6) 100%),
    /* volumetric god-rays hanging in the night air below the two front pylon lamps —
       tall, narrow, soft; at the edges so they never reach the center lane (L6-safe,
       and static anyway). Gives the upper sky atmosphere instead of dead black. */
    radial-gradient(ellipse 10vw 56vh at 13% 8%, rgba(184, 208, 244, 0.13), rgba(184, 208, 244, 0) 72%),
    radial-gradient(ellipse 10vw 56vh at 87% 8%, rgba(184, 208, 244, 0.13), rgba(184, 208, 244, 0) 72%),
    /* fainter mid-pylon god-rays, further in, dimmer (atmospheric perspective) */
    radial-gradient(ellipse 7vw 40vh at 35% 10%, rgba(176, 200, 236, 0.07), rgba(176, 200, 236, 0) 72%),
    radial-gradient(ellipse 7vw 40vh at 62% 10%, rgba(176, 200, 236, 0.07), rgba(176, 200, 236, 0) 72%),
    /* distant floodlight sky-dome: the whole vault above the stand glows cool from
       the massed lights below, so the upper frame is lit night air, not dead black. */
    radial-gradient(ellipse 78vw 40vh at 50% 2%, rgba(120, 148, 194, 0.13), rgba(120, 148, 194, 0.04) 55%, rgba(120, 148, 194, 0) 82%),
    /* low warm sodium horizon glow where the far stand meets the sky */
    radial-gradient(ellipse 66vw 20vh at 50% 40%, rgba(196, 150, 92, 0.06), rgba(196, 150, 92, 0) 74%),
    /* two cool floodlight washes from the top corners */
    radial-gradient(ellipse 32vw 44vh at 18% 0%, rgba(168, 194, 232, 0.12), rgba(168, 194, 232, 0) 70%),
    radial-gradient(ellipse 32vw 44vh at 82% 0%, rgba(168, 194, 232, 0.12), rgba(168, 194, 232, 0) 70%);
}

/* ═══ THE CAR — hero prop and the ONLY continuous mover. A broadcast-grade F1
   single-seater in side profile: low nose + multi-element front wing, halo,
   cockpit + helmet, louvred sidepod, airbox, engine cover, layered rear wing,
   slick tyres (specular sidewall + rim + hot brake-disc glow), and baked
   motion-blur — speed streaks plus a translucent ghost of the body trailing.
   It launches off-screen left, tears across the pit straight, and is gone off
   the right every ~19s. translateX only, will-change: transform (budget 1). ═══ */
head { display: var(--grandprix-scenery, block); }
head::before {
  content: "";
  display: var(--grandprix-scenery, block);
  position: fixed;
  left: -440px;
  bottom: 10vh;
  width: 448px;
  height: 168px;
  z-index: 0;
  pointer-events: none;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 168'%3E%3Cdefs%3E%3ClinearGradient id='body' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23ff7a70'/%3E%3Cstop offset='.16' stop-color='%23ff473d'/%3E%3Cstop offset='.42' stop-color='%23ec1109'/%3E%3Cstop offset='.68' stop-color='%23c40600'/%3E%3Cstop offset='.86' stop-color='%238c0300'/%3E%3Cstop offset='1' stop-color='%23560200'/%3E%3C/linearGradient%3E%3ClinearGradient id='bodyDk' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23d21008'/%3E%3Cstop offset='.5' stop-color='%23920300'/%3E%3Cstop offset='1' stop-color='%23470100'/%3E%3C/linearGradient%3E%3ClinearGradient id='cool' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23bcd8ff' stop-opacity='.6'/%3E%3Cstop offset='1' stop-color='%23bcd8ff' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='carbon' x1='0' y1='0' x2='.5' y2='1'%3E%3Cstop offset='0' stop-color='%232e343e'/%3E%3Cstop offset='.5' stop-color='%23161a20'/%3E%3Cstop offset='1' stop-color='%23080a0e'/%3E%3C/linearGradient%3E%3ClinearGradient id='carbonL' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%233c4450'/%3E%3Cstop offset='1' stop-color='%2312161c'/%3E%3C/linearGradient%3E%3Cpattern id='weave' width='6' height='6' patternUnits='userSpaceOnUse' patternTransform='rotate(0)'%3E%3Crect width='6' height='6' fill='%2314181e'/%3E%3Cpath d='M0 0h3v3H0zM3 3h3v3H3z' fill='%232a313b'/%3E%3Cpath d='M3 0h3v3H3zM0 3h3v3H0z' fill='%230c0f14'/%3E%3C/pattern%3E%3ClinearGradient id='spd' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23ffffff' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23ffe6c2' stop-opacity='.92'/%3E%3C/linearGradient%3E%3ClinearGradient id='spdR' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23ff4a3f' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23ff7a60' stop-opacity='.78'/%3E%3C/linearGradient%3E%3CradialGradient id='tyre' cx='38%25' cy='28%25' r='78%25'%3E%3Cstop offset='0' stop-color='%23545a63'/%3E%3Cstop offset='.34' stop-color='%23272c33'/%3E%3Cstop offset='.62' stop-color='%2314171d'/%3E%3Cstop offset='.85' stop-color='%230a0c10'/%3E%3Cstop offset='1' stop-color='%23040506'/%3E%3C/radialGradient%3E%3CradialGradient id='brake' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0' stop-color='%23fff6d8' stop-opacity='.98'/%3E%3Cstop offset='24%25' stop-color='%23ffb04a' stop-opacity='.92'/%3E%3Cstop offset='52%25' stop-color='%23ff6a12' stop-opacity='.72'/%3E%3Cstop offset='78%25' stop-color='%23e83606' stop-opacity='.34'/%3E%3Cstop offset='100%25' stop-color='%23e83606' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='hub' cx='40%25' cy='34%25' r='72%25'%3E%3Cstop offset='0' stop-color='%23eef2f8'/%3E%3Cstop offset='.4' stop-color='%23aab2be'/%3E%3Cstop offset='.72' stop-color='%236b7480'/%3E%3Cstop offset='1' stop-color='%23262b33'/%3E%3C/radialGradient%3E%3CradialGradient id='visor' cx='34%25' cy='30%25' r='80%25'%3E%3Cstop offset='0' stop-color='%237fe6ff'/%3E%3Cstop offset='.4' stop-color='%232aa8d8'/%3E%3Cstop offset='1' stop-color='%230a2436'/%3E%3C/radialGradient%3E%3CradialGradient id='helm' cx='36%25' cy='28%25' r='78%25'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='.55' stop-color='%23e2e7ee'/%3E%3Cstop offset='1' stop-color='%239aa2ad'/%3E%3C/radialGradient%3E%3CradialGradient id='gloss' cx='50%25' cy='40%25' r='60%25'%3E%3Cstop offset='0' stop-color='%23fff' stop-opacity='.95'/%3E%3Cstop offset='45%25' stop-color='%23ffe9e4' stop-opacity='.45'/%3E%3Cstop offset='100%25' stop-color='%23ffe9e4' stop-opacity='0'/%3E%3C/radialGradient%3E%3Cg id='carGlint'%3E%3Cpath d='M0 -7 L1.1 -1.1 L7 0 L1.1 1.1 L0 7 L-1.1 1.1 L-7 0 L-1.1 -1.1 Z' fill='%23fffef6'/%3E%3Ccircle r='1.8' fill='%23fff'/%3E%3C/g%3E%3C/defs%3E%3C!-- ground contact shadow --%3E%3Cellipse cx='232' cy='150' rx='176' ry='10' fill='%23020406' opacity='.62'/%3E%3Cellipse cx='232' cy='150' rx='96' ry='5' fill='%23000' opacity='.4'/%3E%3C!-- BAKED MOTION BLUR: trailing ghost of the body + speed streaks --%3E%3Cg opacity='.26'%3E%3Cpath d='M168 92 L128 92 L140 70 L214 70 L236 62 L280 62 L302 82 L302 96 L204 96 Z' fill='url(%23bodyDk)'/%3E%3C/g%3E%3Cg stroke-linecap='round'%3E%3Cline x1='2' y1='80' x2='138' y2='80' stroke='url(%23spd)' stroke-width='3.6'/%3E%3Cline x1='20' y1='60' x2='150' y2='60' stroke='url(%23spd)' stroke-width='2.3'/%3E%3Cline x1='14' y1='100' x2='144' y2='100' stroke='url(%23spd)' stroke-width='2.3'/%3E%3Cline x1='40' y1='44' x2='160' y2='44' stroke='url(%23spd)' stroke-width='1.6'/%3E%3Cline x1='34' y1='116' x2='156' y2='116' stroke='url(%23spd)' stroke-width='1.6'/%3E%3Cline x1='6' y1='90' x2='130' y2='90' stroke='url(%23spdR)' stroke-width='2.8'/%3E%3Cline x1='26' y1='72' x2='140' y2='72' stroke='url(%23spdR)' stroke-width='1.4'/%3E%3C/g%3E%3C!-- ===== REAR (left) wheel: hot brake glow, slick tyre with rim-light + sidewall sheen ===== --%3E%3Ccircle cx='168' cy='114' r='50' fill='url(%23brake)' opacity='.92'/%3E%3Ccircle cx='168' cy='114' r='19' fill='url(%23brake)'/%3E%3Ccircle cx='168' cy='114' r='39' fill='url(%23tyre)'/%3E%3Ccircle cx='168' cy='114' r='39' fill='none' stroke='%23020304' stroke-width='3'/%3E%3Cpath d='M143 84 A39 39 0 0 1 197 87' fill='none' stroke='%237c8590' stroke-width='3' stroke-opacity='.6' stroke-linecap='round'/%3E%3Cpath d='M138 100 A39 39 0 0 1 150 82' fill='none' stroke='%23aeb8c4' stroke-width='2' stroke-opacity='.45' stroke-linecap='round'/%3E%3Ccircle cx='168' cy='114' r='34' fill='none' stroke='%232f353d' stroke-width='1.2' stroke-opacity='.55'/%3E%3Ctext x='168' y='90' font-family='Arial' font-size='5' font-weight='700' fill='%23c9cfd8' fill-opacity='.5' text-anchor='middle'%3EP ZERO%3C/text%3E%3Ccircle cx='168' cy='114' r='18' fill='url(%23hub)'/%3E%3Ccircle cx='168' cy='114' r='18' fill='none' stroke='%23e6a020' stroke-width='1.4' stroke-opacity='.8'/%3E%3Cg stroke='%23181c22' stroke-width='2.4' stroke-linecap='round'%3E%3Cline x1='168' y1='98' x2='168' y2='130'/%3E%3Cline x1='152' y1='114' x2='184' y2='114'/%3E%3Cline x1='157' y1='103' x2='179' y2='125'/%3E%3Cline x1='179' y1='103' x2='157' y2='125'/%3E%3C/g%3E%3Ccircle cx='168' cy='114' r='5' fill='%23dfe4ec'/%3E%3Ccircle cx='168' cy='114' r='5' fill='none' stroke='%236b7480' stroke-width='1'/%3E%3Ccircle cx='166' cy='112' r='1.6' fill='%23fff' fill-opacity='.9'/%3E%3C!-- diffuser + floor (carbon weave) --%3E%3Cpath d='M134 132 L214 132 L214 120 L134 120 Z' fill='url(%23weave)'/%3E%3Cpath d='M134 132 L214 132 L214 120 L134 120 Z' fill='url(%23carbon)' opacity='.35'/%3E%3Cg stroke='%233a424e' stroke-width='1' stroke-opacity='.5'%3E%3Cline x1='146' y1='120' x2='146' y2='132'/%3E%3Cline x1='162' y1='120' x2='162' y2='132'/%3E%3Cline x1='178' y1='120' x2='178' y2='132'/%3E%3Cline x1='194' y1='120' x2='194' y2='132'/%3E%3C/g%3E%3Cpath d='M134 121 L214 121' stroke='%235a6470' stroke-width='1' stroke-opacity='.4'/%3E%3C!-- ===== REAR WING: endplate + mainplane + upper flap + swan-neck pylon ===== --%3E%3Cpath d='M126 44 L136 44 L136 96 L126 96 Z' fill='url(%23weave)'/%3E%3Cpath d='M126 44 L129 44 L129 96 L126 96 Z' fill='%235a6470' opacity='.55'/%3E%3Cpath d='M126 44 L136 44 L136 47 L126 47 Z' fill='%23ec1109'/%3E%3Cpath d='M150 56 Q154 72 160 92 L153 92 Q147 72 143 58 Z' fill='url(%23carbon)'/%3E%3Crect x='128' y='46' width='40' height='7' rx='2.5' fill='url(%23bodyDk)'/%3E%3Crect x='128' y='45' width='40' height='2.6' fill='%23ff8a80'/%3E%3Crect x='128' y='52' width='40' height='1.6' fill='%23360100'/%3E%3Cpath d='M130 56 L166 56 L166 62 L132 62 Z' fill='url(%23carbon)'/%3E%3Cpath d='M130 56 L166 56 L166 57.4 L130 57.4 Z' fill='%236a7480' opacity='.5'/%3E%3C!-- ===== ENGINE COVER + BODYWORK (glossy red livery) ===== --%3E%3Cpath d='M168 92 L128 92 L140 70 L214 70 L236 62 L280 62 L302 82 L302 96 L204 96 Z' fill='url(%23body)'/%3E%3C!-- cool sky reflection along the top ridge --%3E%3Cpath d='M150 71 L232 63 L278 63 L296 78 Q220 70 150 78 Z' fill='url(%23cool)' opacity='.5'/%3E%3C!-- white livery flash + gold pinstripe --%3E%3Cpath d='M168 80 L272 70 L278 76 L172 87 Z' fill='%23f4f7fb' opacity='.95'/%3E%3Cpath d='M168 88 L292 78' stroke='%23ffcf3f' stroke-width='2.2' stroke-opacity='.9'/%3E%3Cpath d='M170 84 L270 74' stroke='%23e10600' stroke-width='1.4' stroke-opacity='.55'/%3E%3C!-- sponsor mini-blocks on the flash --%3E%3Crect x='188' y='73' width='11' height='5' rx='1' fill='%230b0d11' fill-opacity='.72'/%3E%3Crect x='214' y='71' width='9' height='4.4' rx='1' fill='%230b0d11' fill-opacity='.62'/%3E%3Crect x='236' y='69' width='13' height='4' rx='1' fill='%230b0d11' fill-opacity='.55'/%3E%3C!-- panel gap shadow lines --%3E%3Cpath d='M204 70 L206 96' stroke='%23360100' stroke-width='1' stroke-opacity='.5'/%3E%3Cpath d='M240 63 L244 82' stroke='%23360100' stroke-width='1' stroke-opacity='.45'/%3E%3C!-- sidepod undercut shadow --%3E%3Cpath d='M204 96 L302 96 L302 90 Q252 86 204 90 Z' fill='%23360100' opacity='.55'/%3E%3C!-- sidepod cooling louvres --%3E%3Cg stroke='%23360100' stroke-width='1.5' stroke-opacity='.75' stroke-linecap='round'%3E%3Cline x1='222' y1='84' x2='238' y2='84'/%3E%3Cline x1='226' y1='88' x2='244' y2='88'/%3E%3Cline x1='232' y1='84' x2='250' y2='84'/%3E%3C/g%3E%3C!-- airbox intake above cockpit --%3E%3Cpath d='M214 70 L228 50 L248 50 L252 70 Z' fill='url(%23bodyDk)'/%3E%3Cpath d='M228 52 L246 52 L248 66 L230 66 Z' fill='%23100405'/%3E%3Cpath d='M214 70 L228 50 L231 50 L218 70 Z' fill='%23ff8a80' opacity='.55'/%3E%3C!-- ===== HALO (thick titanium, material) + strut ===== --%3E%3Cpath d='M250 66 Q286 30 330 60' fill='none' stroke='%230a0d12' stroke-width='9' stroke-linecap='round'/%3E%3Cpath d='M250 66 Q286 30 330 60' fill='none' stroke='%234a525e' stroke-width='2.4' stroke-linecap='round' stroke-opacity='.7'/%3E%3Cpath d='M251 68 Q286 33 329 62' fill='none' stroke='%23000' stroke-width='1.6' stroke-linecap='round' stroke-opacity='.5'/%3E%3Cpath d='M286 41 L286 66' stroke='%230a0d12' stroke-width='7'/%3E%3Cpath d='M284 41 L284 66' stroke='%234a525e' stroke-width='1.4' stroke-opacity='.6'/%3E%3C!-- ===== COCKPIT + driver helmet + visor ===== --%3E%3Cpath d='M252 68 Q282 50 312 68 Z' fill='%23070a0e'/%3E%3Cpath d='M256 66 Q282 54 308 66 Z' fill='%23161b22'/%3E%3Ccircle cx='283' cy='60' r='11' fill='url(%23helm)'/%3E%3Cpath d='M283 49 A11 11 0 0 1 294 58 L283 60 Z' fill='%23e10600'/%3E%3Cpath d='M275 51 A11 11 0 0 1 283 49 L283 60 Z' fill='%23ffcf3f'/%3E%3Cpath d='M274 62 Q283 55 293 61 L291 65 Q283 60 276 65 Z' fill='url(%23visor)'/%3E%3Cpath d='M274 62 Q283 56 293 61' fill='none' stroke='%230a0c10' stroke-width='1.4'/%3E%3Cpath d='M277 60 Q283 57 288 59' fill='none' stroke='%23cdefff' stroke-width='1' stroke-opacity='.8'/%3E%3Cpath d='M276 53 A11 11 0 0 1 288 51' fill='none' stroke='%23fff' stroke-width='1.2' stroke-opacity='.6'/%3E%3C!-- ===== NOSE + tea-tray ===== --%3E%3Cpath d='M302 74 L392 84 L392 94 L302 92 Z' fill='url(%23body)'/%3E%3Cpath d='M302 76 L388 85 L388 79 L338 74 Z' fill='%23ff8a80' opacity='.5'/%3E%3Cpath d='M338 73 L360 72' stroke='%23ffcf3f' stroke-width='1.6' stroke-opacity='.7'/%3E%3Cpath d='M340 88 L392 92 L392 97 L340 95 Z' fill='url(%23bodyDk)'/%3E%3Cellipse cx='378' cy='84' rx='7' ry='4' fill='%23f4f7fb' opacity='.9'/%3E%3Ctext x='378' y='86' font-family='Arial' font-size='5' font-weight='700' fill='%23e10600' text-anchor='middle'%3E1%3C/text%3E%3C!-- ===== FRONT (right) wheel: brake glow, slick tyre, rim-light ===== --%3E%3Ccircle cx='356' cy='118' r='42' fill='url(%23brake)' opacity='.85'/%3E%3Ccircle cx='356' cy='118' r='15' fill='url(%23brake)'/%3E%3Ccircle cx='356' cy='118' r='32' fill='url(%23tyre)'/%3E%3Ccircle cx='356' cy='118' r='32' fill='none' stroke='%23020304' stroke-width='2.8'/%3E%3Cpath d='M335 94 A32 32 0 0 1 379 96' fill='none' stroke='%237c8590' stroke-width='2.6' stroke-opacity='.6' stroke-linecap='round'/%3E%3Ccircle cx='356' cy='118' r='27' fill='none' stroke='%232f353d' stroke-width='1' stroke-opacity='.5'/%3E%3Ccircle cx='356' cy='118' r='15' fill='url(%23hub)'/%3E%3Ccircle cx='356' cy='118' r='15' fill='none' stroke='%23e6a020' stroke-width='1.2' stroke-opacity='.75'/%3E%3Cg stroke='%23181c22' stroke-width='2.2' stroke-linecap='round'%3E%3Cline x1='356' y1='104' x2='356' y2='132'/%3E%3Cline x1='342' y1='118' x2='370' y2='118'/%3E%3Cline x1='346' y1='108' x2='366' y2='128'/%3E%3Cline x1='366' y1='108' x2='346' y2='128'/%3E%3C/g%3E%3Ccircle cx='356' cy='118' r='4.4' fill='%23dfe4ec'/%3E%3Ccircle cx='354' cy='116' r='1.4' fill='%23fff' fill-opacity='.9'/%3E%3C!-- ===== FRONT WING: multi-element cascade + tall endplate ===== --%3E%3C!-- top mainplane (red, glossy) --%3E%3Cpath d='M378 86 L440 80 L442 86 L382 92 Z' fill='url(%23bodyDk)'/%3E%3Cpath d='M378 86 L440 80 L442 82.4 L380 88 Z' fill='%23ff8a80' opacity='.8'/%3E%3C!-- 2nd element (carbon) --%3E%3Cpath d='M382 93 L440 89 L440 96 L384 99 Z' fill='url(%23carbon)'/%3E%3Cpath d='M382 93 L440 89 L440 90.6 L382 94.6 Z' fill='%236a7480' opacity='.5'/%3E%3C!-- 3rd element (lower, red) --%3E%3Cpath d='M386 100 L436 96 L436 103 L388 106 Z' fill='url(%23bodyDk)'/%3E%3Cpath d='M386 100 L436 96 L436 97.4 L386 101.4 Z' fill='%23ff8a80' opacity='.6'/%3E%3C!-- tall endplate with fin (carbon weave) --%3E%3Cpath d='M432 74 L446 74 L446 108 L436 108 Z' fill='url(%23weave)'/%3E%3Cpath d='M432 74 L446 74 L446 78 L432 78 Z' fill='url(%23carbonL)'/%3E%3Cpath d='M432 74 L435 74 L435 108 L432 108 Z' fill='%237c8794' opacity='.6'/%3E%3Cpath d='M446 74 L446 108' stroke='%23020304' stroke-width='1'/%3E%3Cpath d='M434 76 L444 76 L444 79 L434 79 Z' fill='%23ec1109'/%3E%3Cpath d='M436 100 L444 100 L444 103 L436 103 Z' fill='%23ffcf3f' opacity='.7'/%3E%3C!-- body specular sweep (glossy paint highlight) --%3E%3Cpath d='M144 74 Q224 64 296 72' fill='none' stroke='%23ffe4e0' stroke-width='2.6' stroke-opacity='.72' stroke-linecap='round'/%3E%3Cpath d='M150 76 Q224 68 290 74' fill='none' stroke='%23fff' stroke-width='1' stroke-opacity='.55' stroke-linecap='round'/%3E%3C!-- hot specular bloom on the engine-cover shoulder + a second on the nose --%3E%3Cellipse cx='224' cy='72' rx='40' ry='9' fill='url(%23gloss)' opacity='.7'/%3E%3Cellipse cx='352' cy='80' rx='24' ry='6' fill='url(%23gloss)' opacity='.55'/%3E%3C!-- crisp specular star-glints: airbox lip, halo apex, nose tip, rear-wing endplate --%3E%3Cuse href='%23carGlint' x='238' y='63' opacity='.95'/%3E%3Cuse href='%23carGlint' x='287' y='40' opacity='.85' transform='scale(.8)' transform-origin='287 40'/%3E%3Cuse href='%23carGlint' x='388' y='80' opacity='.9' transform='scale(.85)' transform-origin='388 80'/%3E%3Cuse href='%23carGlint' x='444' y='75' opacity='.7' transform='scale(.65)' transform-origin='444 75'/%3E%3C/svg%3E");
  will-change: transform;
  animation: grandprix-lap 19s linear infinite;
}

/* ═══ marshal post far right: a striped post with a waved yellow flag, planted
   at the trackside. STATIC promoted foreground object, off the lane. ═══ */
head::after {
  content: "";
  display: var(--grandprix-scenery, block);
  position: fixed;
  right: 3vw;
  bottom: 8vh;
  width: 120px;
  height: 190px;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: contain;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 130 200'%3E%3Cdefs%3E%3ClinearGradient id='flag' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23ffe14a'/%3E%3Cstop offset='.5' stop-color='%23ffc21a'/%3E%3Cstop offset='1' stop-color='%23e59400'/%3E%3C/linearGradient%3E%3ClinearGradient id='suit' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23ff9330'/%3E%3Cstop offset='.5' stop-color='%23ee6f12'/%3E%3Cstop offset='1' stop-color='%23b84c06'/%3E%3C/linearGradient%3E%3ClinearGradient id='post' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%233a434f'/%3E%3Cstop offset='.4' stop-color='%2323292f'/%3E%3Cstop offset='1' stop-color='%2312161b'/%3E%3C/linearGradient%3E%3CradialGradient id='helm' cx='36%25' cy='30%25' r='72%25'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='.55' stop-color='%23cfd6df'/%3E%3Cstop offset='1' stop-color='%237e8792'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='58' cy='196' rx='30' ry='5' fill='%23020406' opacity='.6'/%3E%3C!-- striped marshal post behind the figure --%3E%3Crect x='40' y='34' width='7' height='160' fill='url(%23post)'/%3E%3Cg fill='%23e10600' opacity='.85'%3E%3Crect x='40' y='40' width='7' height='12'/%3E%3Crect x='40' y='64' width='7' height='12'/%3E%3Crect x='40' y='88' width='7' height='12'/%3E%3C/g%3E%3Crect x='41' y='34' width='2' height='160' fill='%236a7480' opacity='.4'/%3E%3C!-- MARSHAL, three-quarter, in hi-vis suit --%3E%3C!-- legs --%3E%3Cpath d='M58 150 L54 191 L61 191 L64 152 Z' fill='%232a2f37'/%3E%3Cpath d='M70 152 L74 191 L81 191 L76 150 Z' fill='%23222730'/%3E%3C!-- boots --%3E%3Cpath d='M53 188 L63 188 L63 192 L52 192 Z' fill='%23101319'/%3E%3Cpath d='M73 188 L83 188 L83 192 L73 192 Z' fill='%23101319'/%3E%3C!-- torso --%3E%3Cpath d='M55 116 Q68 110 81 116 L78 154 L57 154 Z' fill='url(%23suit)'/%3E%3C!-- reflective bands --%3E%3Cpath d='M56 130 L80 130 L79.6 135 L56.4 135 Z' fill='%23f6f0d8' opacity='.85'/%3E%3Cpath d='M57 145 L79 145 L78.6 150 L57.4 150 Z' fill='%23f6f0d8' opacity='.68'/%3E%3C!-- shoulders/collar --%3E%3Cpath d='M57 118 Q68 112 79 118 L77 124 Q68 119 59 124 Z' fill='%23ffab52' opacity='.9'/%3E%3C!-- near arm down --%3E%3Cpath d='M58 120 L50 150' stroke='url(%23suit)' stroke-width='7' stroke-linecap='round'/%3E%3Ccircle cx='50' cy='150' r='3.5' fill='%232a2f37'/%3E%3C!-- far arm raised holding pole --%3E%3Cpath d='M78 121 L104 78' stroke='url(%23suit)' stroke-width='7' stroke-linecap='round'/%3E%3Ccircle cx='104' cy='78' r='4' fill='%232a2f37'/%3E%3C!-- neck + helmet sitting on the shoulders --%3E%3Crect x='65' y='107' width='6' height='6' fill='%23b84c06'/%3E%3Ccircle cx='68' cy='103' r='8.5' fill='url(%23helm)'/%3E%3Cpath d='M61 101 A8.5 8.5 0 0 1 75 98' fill='none' stroke='%23ffffff' stroke-width='1.3' opacity='.65'/%3E%3Cpath d='M60 105 Q68 108 76 105' fill='none' stroke='%2311141a' stroke-width='1.5' opacity='.5'/%3E%3C!-- flag pole --%3E%3Cpath d='M102 46 L107 82' stroke='%2311141a' stroke-width='3' stroke-linecap='round'/%3E%3C!-- double-waved yellow flag with folds --%3E%3Cpath d='M102 48 Q116 40 129 48 Q119 56 129 64 Q117 61 105 70 Z' fill='url(%23flag)'/%3E%3Cpath d='M102 48 Q116 40 129 48' fill='none' stroke='%23fff6c8' stroke-width='1.5' opacity='.7'/%3E%3Cpath d='M109 52 Q117 50 123 54' fill='none' stroke='%23c98800' stroke-width='1.2' opacity='.55'/%3E%3C/svg%3E");
}

/* ═══ prop layers: the two <meta> void elements render nothing but their
   fixed pseudos are free canvases. ═══ */
head meta { display: var(--grandprix-scenery, block); }

/* DRS ENABLED chip, top-left. Broadcast overlay style: a dark rounded chip,
   green LED, mono label. STATIC, off the lane. */
head meta:first-of-type::before {
  content: "";
  display: var(--grandprix-scenery, block);
  position: fixed;
  left: 2.4vw;
  top: 3vh;
  width: 150px;
  height: 40px;
  z-index: 1;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 54'%3E%3Crect x='1' y='1' width='198' height='52' rx='7' fill='%230c0f15' fill-opacity='.94' stroke='%232fe08a' stroke-opacity='.4' stroke-width='1.5'/%3E%3Crect x='1' y='1' width='6' height='52' rx='3' fill='%232fe08a'/%3E%3Ccircle cx='28' cy='27' r='7' fill='%232fe08a'/%3E%3Ccircle cx='28' cy='27' r='11' fill='%232fe08a' fill-opacity='.22'/%3E%3Ctext x='48' y='33' font-family='Consolas,monospace' font-weight='700' font-size='19' letter-spacing='2' fill='%23eaf4ee'%3EDRS%3C/text%3E%3Ctext x='104' y='33' font-family='Consolas,monospace' font-weight='700' font-size='14' letter-spacing='1.5' fill='%232fe08a'%3EENABLED%3C/text%3E%3C/svg%3E") center / contain no-repeat;
}

/* PIT LANE OPEN chip, top-right. Amber LED, same broadcast styling. */
head meta:first-of-type::after {
  content: "";
  display: var(--grandprix-scenery, block);
  position: fixed;
  right: 2.4vw;
  top: 3vh;
  width: 158px;
  height: 40px;
  z-index: 1;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 210 54'%3E%3Crect x='1' y='1' width='208' height='52' rx='7' fill='%230c0f15' fill-opacity='.94' stroke='%23ffb020' stroke-opacity='.4' stroke-width='1.5'/%3E%3Crect x='1' y='1' width='6' height='52' rx='3' fill='%23ffb020'/%3E%3Ccircle cx='28' cy='27' r='7' fill='%23ffb020'/%3E%3Ccircle cx='28' cy='27' r='11' fill='%23ffb020' fill-opacity='.22'/%3E%3Ctext x='48' y='33' font-family='Consolas,monospace' font-weight='700' font-size='16' letter-spacing='1.5' fill='%23eaf4ee'%3EPIT LANE%3C/text%3E%3Ctext x='150' y='33' font-family='Consolas,monospace' font-weight='700' font-size='14' letter-spacing='1.5' fill='%23ffb020'%3EOPEN%3C/text%3E%3C/svg%3E") center / contain no-repeat;
}

/* tyre barrier stack, bottom-left corner: stacked painted tyres (red/white).
   STATIC promoted foreground, corner-only so never over the lane. */
head meta:last-of-type::before {
  content: "";
  display: var(--grandprix-scenery, block);
  position: fixed;
  left: 0;
  bottom: 0;
  width: 210px;
  height: 130px;
  z-index: 1;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 140'%3E%3Cdefs%3E%3CradialGradient id='tw' cx='38%25' cy='32%25' r='72%25'%3E%3Cstop offset='0' stop-color='%23363c45'/%3E%3Cstop offset='.4' stop-color='%231c2027'/%3E%3Cstop offset='.72' stop-color='%230f1217'/%3E%3Cstop offset='1' stop-color='%23050609'/%3E%3C/radialGradient%3E%3CradialGradient id='hubR' cx='42%25' cy='38%25' r='68%25'%3E%3Cstop offset='0' stop-color='%23ff544e'/%3E%3Cstop offset='.6' stop-color='%23d00500'/%3E%3Cstop offset='1' stop-color='%238a0300'/%3E%3C/radialGradient%3E%3CradialGradient id='hubW' cx='42%25' cy='38%25' r='68%25'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='.6' stop-color='%23dfe4ec'/%3E%3Cstop offset='1' stop-color='%23a8b0bc'/%3E%3C/radialGradient%3E%3Cg id='tyre'%3E%3Ccircle cx='24' cy='24' r='24' fill='%23020304'/%3E%3Ccircle cx='24' cy='24' r='24' fill='url(%23tw)'/%3E%3Ccircle cx='24' cy='24' r='19' fill='none' stroke='%23090b0e' stroke-width='4' stroke-opacity='.7'/%3E%3Cpath d='M6 15 A24 24 0 0 1 40 10' fill='none' stroke='%236e7883' stroke-width='2' stroke-opacity='.4' stroke-linecap='round'/%3E%3Ccircle cx='24' cy='24' r='11' fill='%23070809'/%3E%3C/g%3E%3C/defs%3E%3C!-- ground contact shadow --%3E%3Cellipse cx='110' cy='137' rx='120' ry='7' fill='%23000' opacity='.5'/%3E%3C!-- row 3 (back, hazed) --%3E%3Cg transform='translate(0,84)' opacity='.82'%3E%3Cuse href='%23tyre'/%3E%3Ccircle cx='24' cy='24' r='9' fill='url(%23hubR)'/%3E%3Cuse href='%23tyre' x='50'/%3E%3Ccircle cx='74' cy='24' r='9' fill='url(%23hubW)'/%3E%3Cuse href='%23tyre' x='100'/%3E%3Ccircle cx='124' cy='24' r='9' fill='url(%23hubR)'/%3E%3Cuse href='%23tyre' x='150'/%3E%3Ccircle cx='174' cy='24' r='9' fill='url(%23hubW)'/%3E%3C/g%3E%3C!-- conveyor strap across the stack --%3E%3Crect x='2' y='96' width='216' height='6' rx='2' fill='%231a1d22' opacity='.7'/%3E%3Crect x='2' y='96' width='216' height='2' fill='%233a424e' opacity='.5'/%3E%3C!-- row 2 --%3E%3Cg transform='translate(24,44)'%3E%3Cuse href='%23tyre'/%3E%3Ccircle cx='24' cy='24' r='9' fill='url(%23hubW)'/%3E%3Cuse href='%23tyre' x='50'/%3E%3Ccircle cx='74' cy='24' r='9' fill='url(%23hubR)'/%3E%3Cuse href='%23tyre' x='100'/%3E%3Ccircle cx='124' cy='24' r='9' fill='url(%23hubW)'/%3E%3C/g%3E%3Crect x='26' y='56' width='168' height='6' rx='2' fill='%231a1d22' opacity='.7'/%3E%3Crect x='26' y='56' width='168' height='2' fill='%233a424e' opacity='.5'/%3E%3C!-- row 1 (front top) --%3E%3Cg transform='translate(48,6)'%3E%3Cuse href='%23tyre'/%3E%3Ccircle cx='24' cy='24' r='9' fill='url(%23hubR)'/%3E%3Cuse href='%23tyre' x='50'/%3E%3Ccircle cx='74' cy='24' r='9' fill='url(%23hubW)'/%3E%3C/g%3E%3C/svg%3E") left bottom / contain no-repeat;
}

/* start gantry lights, top-center: five red bulbs on a beam — the go signal.
   STATIC (the classic 5-lights motif; not animated so it never strobes). */
head meta:last-of-type::after {
  content: "";
  display: var(--grandprix-scenery, block);
  position: fixed;
  left: 50%;
  top: 0;
  width: 280px;
  height: 54px;
  margin-left: -140px;
  z-index: 1;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 60'%3E%3Cdefs%3E%3CradialGradient id='bulb' cx='50%25' cy='40%25' r='60%25'%3E%3Cstop offset='0' stop-color='%23ff6b62'/%3E%3Cstop offset='.5' stop-color='%23e10600'/%3E%3Cstop offset='1' stop-color='%238a0300'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cpath d='M30 2 L270 2 L270 8 L30 8 Z' fill='%2321262f'/%3E%3Crect x='40' y='8' width='220' height='30' rx='6' fill='%230c0f14' stroke='%232a313c' stroke-width='1.5'/%3E%3Cg%3E%3Ccircle cx='68' cy='23' r='9' fill='url(%23bulb)'/%3E%3Ccircle cx='68' cy='23' r='13' fill='%23e10600' fill-opacity='.2'/%3E%3Ccircle cx='105' cy='23' r='9' fill='url(%23bulb)'/%3E%3Ccircle cx='105' cy='23' r='13' fill='%23e10600' fill-opacity='.2'/%3E%3Ccircle cx='150' cy='23' r='9' fill='url(%23bulb)'/%3E%3Ccircle cx='150' cy='23' r='13' fill='%23e10600' fill-opacity='.2'/%3E%3Ccircle cx='195' cy='23' r='9' fill='url(%23bulb)'/%3E%3Ccircle cx='195' cy='23' r='13' fill='%23e10600' fill-opacity='.2'/%3E%3Ccircle cx='232' cy='23' r='9' fill='url(%23bulb)'/%3E%3Ccircle cx='232' cy='23' r='13' fill='%23e10600' fill-opacity='.2'/%3E%3C/g%3E%3Cpath d='M150 38 L150 48' stroke='%2321262f' stroke-width='4'/%3E%3C/svg%3E") center top / contain no-repeat;
}

/* ═══ CHEQUERED FLOOR BAND — coarse 46px checks striping the very bottom edge
   of the frame, plus a red/white kerb line above it. Coarse cells (>40px) and
   below the masked floor zone = L6-legal. STATIC, promoted. ═══ */
body::before {
  content: "";
  display: var(--grandprix-scenery, block);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100px;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* wet-track specular glints: a few COARSE soft hotspots (>=90px) where the
       floodlights pool on the wet start-line paint. Static, on the floor band far
       below the text lane = L6-safe, and gives the tarmac a rain-lit sheen. */
    radial-gradient(ellipse 130px 26px at 18% 62%, rgba(210, 226, 250, 0.24), rgba(210, 226, 250, 0) 70%) no-repeat,
    radial-gradient(ellipse 110px 22px at 44% 58%, rgba(255, 234, 200, 0.18), rgba(255, 234, 200, 0) 72%) no-repeat,
    radial-gradient(ellipse 120px 24px at 72% 62%, rgba(210, 226, 250, 0.2), rgba(210, 226, 250, 0) 70%) no-repeat,
    radial-gradient(ellipse 100px 20px at 90% 60%, rgba(255, 234, 200, 0.16), rgba(255, 234, 200, 0) 72%) no-repeat,
    /* wet-track sheen over the checks: a gentle vertical highlight so the
       painted start-line reads as gloss-on-tarmac. Starts below the kerb, peaks
       soft, and darkens to a floor shadow. COARSE full-width = L6-safe. */
    linear-gradient(180deg, rgba(210, 224, 245, 0.10) 0%, rgba(210, 224, 245, 0.03) 30%, rgba(0, 0, 0, 0) 62%, rgba(0, 0, 0, 0.38) 100%) left 0 top 18px / 100% 82px no-repeat,
    /* thin dark shadow line grounding the kerb onto the tarmac */
    linear-gradient(180deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)) left 0 top 14px / 100% 4px no-repeat,
    /* kerb: beveled red/white — bright face + shaded lower lip */
    repeating-linear-gradient(90deg, #ff2b23 0 30px, #f4f6f9 30px 60px) left 0 top 0 / 100% 8px no-repeat,
    repeating-linear-gradient(90deg, #9a0300 0 30px, #aeb6c0 30px 60px) left 0 top 8px / 100% 5px no-repeat,
    /* the chequered band: 46px checks, painted onto tarmac (starts below kerb) */
    conic-gradient(from 90deg at 50% 50%, #0e1116 0 25%, #eef2f7 0 50%, #0e1116 0 75%, #eef2f7 0) 0 18px / 92px 92px repeat-x,
    /* tarmac base under the checks */
    linear-gradient(180deg, #0b0e13 0%, #05070b 100%);
  box-shadow: inset 0 3px 8px rgba(0, 0, 0, 0.45);
  opacity: 0.96;
}

/* ═══ flood haze: one huge soft cool layer drifting over the stand, so the
   night air moves. Viewport-sized, so steps(1) — one hop per 5s (far under the
   cap); overscans so hops never expose an edge. ═══ */
body::after {
  content: "";
  display: var(--grandprix-scenery, block);
  position: fixed;
  top: 0;
  bottom: 0;
  left: -16vw;
  right: -16vw;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(ellipse 40vw 16vh at 30% 30%, rgba(150, 176, 214, 0.05), rgba(150, 176, 214, 0) 72%),
    radial-gradient(ellipse 34vw 13vh at 70% 22%, rgba(150, 176, 214, 0.04), rgba(150, 176, 214, 0) 72%);
  animation: grandprix-haze 40s steps(1, end) infinite;
}

/* ═══ carbon-fibre weave — the fine pattern, so it RIDES THE ROLL (zero slide
   against the tracked glyphs = zero flicker). A twill of two diagonal hatches
   at low alpha. z below the names in the roll's own stacking context. ═══ */
.credits-roll::before,
.credits-slideshow::before {
  content: "";
  display: var(--grandprix-scenery, block);
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.62;
  /* concentrate the carbon panel behind the center name lane and fade it out toward
     the left/right edges, so the weave reads as the wall BEHIND the classification
     rather than a screen-door washing over the whole grandstand. (Mask fades the
     pseudo's own paint; it still rides the roll, so no flicker.) */
  -webkit-mask-image: linear-gradient(90deg, rgba(0,0,0,0) 4%, rgba(0,0,0,0.55) 18%, rgba(0,0,0,1) 34%, rgba(0,0,0,1) 66%, rgba(0,0,0,0.55) 82%, rgba(0,0,0,0) 96%);
  mask-image: linear-gradient(90deg, rgba(0,0,0,0) 4%, rgba(0,0,0,0.55) 18%, rgba(0,0,0,1) 34%, rgba(0,0,0,1) 66%, rgba(0,0,0,0.55) 82%, rgba(0,0,0,0) 96%);
  /* woven carbon-fibre twill: two crossed diagonal hatches build the 2x2 weave,
     a brighter highlight hatch gives the fibres a satin sheen, and a broad
     diagonal light sweep reads as a soft specular across the panel. */
  background-image:
    linear-gradient(115deg, rgba(120, 140, 172, 0.07) 0%, rgba(120, 140, 172, 0) 30%, rgba(120, 140, 172, 0) 62%, rgba(120, 140, 172, 0.055) 100%),
    repeating-linear-gradient(45deg, rgba(168, 182, 205, 0.09) 0 2px, rgba(0, 0, 0, 0) 2px 6px),
    repeating-linear-gradient(-45deg, rgba(168, 182, 205, 0.09) 0 2px, rgba(0, 0, 0, 0) 2px 6px),
    repeating-linear-gradient(45deg, rgba(3, 5, 9, 0.6) 0 6px, rgba(23, 28, 37, 0.6) 6px 12px),
    repeating-linear-gradient(-45deg, rgba(3, 5, 9, 0.4) 0 6px, rgba(19, 23, 31, 0.4) 6px 12px);
  background-size: 100% 100%, 12px 12px, 12px 12px, 24px 24px, 24px 24px;
}

/* ═══ TIMING TOWER ROW ANATOMY — every block is a classification. Section
   titles are broadcast headers; each credit is a timing-tower line: a position
   number (CSS counter) in a red tab, the driver name, the gap as amount. ═══ */
.credits-block,
.credits-slide:not(.flourish) { counter-reset: gp-pos; }

/* section titles: broadcast header — Chakra Petch caps, red leading tab, tight
   tracking, sitting on a thin graphite bar. */
.credits-block__title {
  position: relative;
  width: fit-content;
  max-width: 88vw;
  margin: 0 auto 1.4rem;
  padding: 0.36em 1em 0.32em 1.15em;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--gp-white);
  /* glossy broadcast bug: a graphite plate with a bright top sheen falling to a
     dark base, a hairline top light and a soft floor shadow — reads as a moulded
     TV-graphic panel, not a flat rectangle. */
  background:
    linear-gradient(180deg, rgba(52, 60, 74, 0.96) 0%, rgba(30, 36, 46, 0.96) 22%, rgba(18, 22, 29, 0.97) 55%, rgba(11, 14, 19, 0.97) 100%);
  border-left: 5px solid var(--gp-red);
  border-radius: 2px;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.14),
    inset 0 -1px 0 rgba(0, 0, 0, 0.5),
    inset 0 0 0 1px rgba(120, 140, 170, 0.08),
    inset 7px 0 12px -6px rgba(225, 6, 0, 0.5),
    -3px 0 12px -2px rgba(225, 6, 0, 0.4),
    0 8px 22px rgba(2, 4, 8, 0.55);
  text-shadow: 0 1px 7px rgba(2, 4, 8, 0.85);
}
.credits-block__title::after {
  /* replace the base gold rule with a red/white racing accent under the tab */
  content: "";
  display: block;
  width: 100%;
  height: 3px;
  margin: 0.5rem 0 0;
  background: repeating-linear-gradient(90deg, var(--gp-red) 0 12px, var(--gp-white) 12px 24px);
  opacity: 0.85;
}

/* the classification list */
.credits-block__list { gap: 0.32rem; }

/* each credit is a timing-tower line. A red position tab (::before with the
   counter), the driver name, and the gap (amount) pinned right in amber mono.
   The whole row is a graphite lozenge so it reads like the broadcast overlay. */
.credit {
  counter-increment: gp-pos;
  position: relative;
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  gap: 0.7em;
  max-width: min(40rem, 92vw);
  margin-inline: auto;
  padding: 0.28em 0.9em 0.28em 0.34em;
  min-width: 0;
  overflow-wrap: anywhere;
  font-weight: 600;
  letter-spacing: 0.02em;
  border-radius: 2px;
  /* broadcast timing-line lozenge: a horizontal graphite wash fading to the
     right, with a faint top sheen + floor line so each row reads as a moulded
     bar rather than flat tint. */
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 40%),
    linear-gradient(90deg, rgba(26, 31, 40, 0.82), rgba(16, 20, 26, 0.58) 58%, rgba(14, 17, 22, 0) 100%);
  border-left: 2px solid rgba(198, 206, 216, 0.22);
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.35);
}
/* position number tab */
.credit::before {
  content: counter(gp-pos, decimal-leading-zero);
  flex: 0 0 auto;
  min-width: 1.9em;
  padding: 0.08em 0.36em;
  font-family: "Chakra Petch", monospace;
  font-weight: 700;
  font-size: 0.86em;
  letter-spacing: 0.04em;
  text-align: center;
  color: var(--gp-white);
  background: var(--gp-red);
  border-radius: 3px;
  font-variant-numeric: tabular-nums;
  box-shadow: 0 1px 4px rgba(2, 4, 8, 0.5);
}
.credit__name {
  color: var(--gp-white);
  text-align: left;
  flex: 1 1 auto;
  min-width: 0;
  overflow-wrap: anywhere;
}
/* the gap: pinned right, amber mono, with a leading + so it reads as a delta */
.credit__amount {
  flex: 0 0 auto;
  margin-left: auto;
  opacity: 1;
  font-family: "Chakra Petch", monospace;
  font-weight: 700;
  font-size: 0.82em;
  letter-spacing: 0.04em;
  color: var(--gp-amber);
  font-variant-numeric: tabular-nums;
}
.credit__amount::before { content: "+ "; color: rgba(255, 176, 32, 0.6); }

/* custom credit types cycle sector colours on the position tab (content-agnostic:
   nth-of-type only, no copy assumptions). Green = a purple/fastest sector feel. */
.credits-block__list .credit:nth-of-type(5n + 3)::before { background: var(--gp-green); color: #062615; }

/* ═══ FLOURISH CARDS ═══ */
.flourish--intro { gap: 1.15rem; }

/* badge -> the broadcast bug (copy swap via font-size:0 + ::after) */
.flourish__badge { font-size: 0; border: 0; border-radius: 0; padding: 0; box-shadow: none; }
.flourish__badge::after {
  content: "LIVE \\2014 ROUND 14 \\2014 NIGHT RACE";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.82rem;
  letter-spacing: 0.32em;
  padding: 0.5em 0 0.5em 0.32em;
  text-transform: uppercase;
  color: var(--gp-white);
  border-top: 2px solid var(--gp-red);
  border-bottom: 2px solid var(--gp-red);
}

/* the streamer's title, set like a race-title lockup: heavy Chakra caps with a
   red underscore stripe and a subtle carbon plate behind it. Restyle only. */
.flourish--intro .flourish__title {
  font-family: var(--credits-title-font);
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1.04;
  max-width: min(90vw, 15em);
  color: var(--gp-white);
  text-shadow: 0 0 30px rgba(225, 6, 0, 0.28), 0 2px 10px rgba(2, 4, 8, 0.8);
}

/* streamer tagline: restyle only — the grid-position line, silver, spaced */
.flourish__tagline {
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.18em;
  padding-left: 0.18em;
  text-transform: uppercase;
  font-size: 0.98rem;
  color: rgba(198, 206, 216, 0.86);
}

/* rating -> the tech-inspection stamp (copy swap) */
.flourish__rating { font-size: 0; border: 0; padding: 0; opacity: 1; }
.flourish__rating::after {
  content: "SCRUTINEERED \\2014 PARC FERM\\00C9";
  display: inline-block;
  font-family: "Syncopate", var(--credits-font);
  font-weight: 700;
  font-size: 0.66rem;
  letter-spacing: 0.22em;
  padding: 0.5em 0.9em;
  text-transform: uppercase;
  color: var(--gp-amber);
  border: 1.5px solid rgba(255, 176, 32, 0.5);
  border-radius: 3px;
}

/* start-line fine print under the intro */
.flourish--intro::after {
  content: "GRID SET \\2014 FORMATION LAP \\2014 LIGHTS OUT";
  display: var(--grandprix-scenery, block);
  font-family: "Chakra Petch", var(--credits-font);
  font-weight: 500;
  font-size: 0.64rem;
  letter-spacing: 0.28em;
  padding-left: 0.28em;
  text-transform: uppercase;
  color: rgba(198, 206, 216, 0.5);
}

/* ═══ RAID FINALE — CHEQUERED FLAG - P1. The block's header goes gold, a P1
   plate sits above it, the classification names get a gold rim, and the header
   tab flashes on a steps() glow (~1 paint/s — the only in-roll animation). ═══ */
.credits-block:nth-last-of-type(2) .credits-block__title,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
  color: var(--gp-gold);
  border-left-color: var(--gp-gold);
  /* gilded plate: bright gold sheen at top falling to a deep bronze base */
  background: linear-gradient(180deg, rgba(86, 70, 24, 0.96) 0%, rgba(58, 46, 14, 0.96) 24%, rgba(36, 28, 9, 0.97) 60%, rgba(22, 17, 5, 0.97) 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 227, 150, 0.28),
    inset 0 -1px 0 rgba(0, 0, 0, 0.5),
    inset 0 0 0 1px rgba(255, 207, 63, 0.12),
    inset 7px 0 12px -6px rgba(255, 207, 63, 0.4),
    -3px 0 14px -2px rgba(255, 207, 63, 0.4),
    0 8px 24px rgba(2, 4, 8, 0.55);
  text-shadow: 0 0 22px rgba(255, 207, 63, 0.4), 0 1px 6px rgba(2, 4, 8, 0.8);
  animation: grandprix-flag 2.6s steps(1, end) infinite;
}
.credits-block:nth-last-of-type(2) .credits-block__title::after,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::after {
  background: repeating-linear-gradient(90deg, var(--gp-gold) 0 12px, #3a2e08 12px 24px);
}
.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  content: "\\2691 CHEQUERED FLAG \\2014 P1";
  display: block;
  font-family: "Chakra Petch", var(--credits-font);
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.34em;
  padding-left: 0.34em;
  margin-bottom: 0.7rem;
  color: var(--gp-gold);
  text-shadow: 0 0 14px rgba(255, 207, 63, 0.5);
}
.credits-block:nth-last-of-type(2) .credit::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit::before {
  background: var(--gp-gold);
  color: #2a2006;
}
.credits-block:nth-last-of-type(2) .credit__name,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__name {
  text-shadow: 0 0 16px rgba(255, 207, 63, 0.35), var(--credits-shadow);
}
.credits-block:nth-last-of-type(2) .credit__amount,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__amount {
  color: var(--gp-gold);
}

/* ═══ OUTRO — cool-down lap (copy swap) ═══ */
.flourish--outro::before {
  content: "\\2691 \\2691 \\2691";
  display: var(--grandprix-scenery, block);
  font-size: 0.9rem;
  letter-spacing: 0.6em;
  padding-left: 0.6em;
  color: var(--gp-red);
  opacity: 0.85;
}
.flourish--outro .flourish__title { font-size: 0; }
.flourish--outro .flourish__title::after {
  content: "COOL-DOWN LAP";
  display: inline-block;
  font-family: var(--credits-title-font);
  font-weight: 700;
  font-size: var(--credits-flourish-title-size);
  letter-spacing: 0.05em;
  line-height: 1.04;
  color: var(--gp-white);
  text-shadow: 0 0 30px rgba(225, 6, 0, 0.3), 0 2px 10px rgba(2, 4, 8, 0.8);
}
.flourish--outro .flourish__tagline { font-size: 0; }
.flourish--outro .flourish__tagline::after {
  content: "see you at the next round";
  font-family: var(--credits-font);
  font-weight: 500;
  font-size: 1rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(198, 206, 216, 0.82);
}

/* ═══ slideshow: each slide settles like the timing screen refreshing ═══ */
.credits-slide {
  transform: translateY(12px);
  transition: opacity 0.85s ease, transform 0.95s cubic-bezier(0.22, 1, 0.36, 1);
}
.credits-slide.is-active { transform: none; }

/* ═══ keyframes (all grandprix- prefixed; transform/opacity ONLY) ═══ */
/* the lap: the car launches off-screen left, tears across the pit straight,
   and is gone off the right. 300px car + 320px lead-in, so it clears both
   edges. It sits parked off-left for the back third of the cycle (empty
   straight beat between laps). */
@keyframes grandprix-lap {
  0%   { transform: translate3d(0, 0, 0); }
  62%  { transform: translate3d(calc(100vw + 800px), 0, 0); }
  100% { transform: translate3d(calc(100vw + 800px), 0, 0); }
}
/* flood haze: eight held positions over 40s = one hop every 5s, tiny drift */
@keyframes grandprix-haze {
  0%   { transform: translate3d(0, 0, 0); }
  12%  { transform: translate3d(1.4vw, 0.4vh, 0); }
  25%  { transform: translate3d(2.6vw, 0.9vh, 0); }
  38%  { transform: translate3d(1.6vw, 1.4vh, 0); }
  50%  { transform: translate3d(-0.4vw, 1vh, 0); }
  62%  { transform: translate3d(-2vw, 0.5vh, 0); }
  75%  { transform: translate3d(-2.4vw, -0.2vh, 0); }
  88%  { transform: translate3d(-1vw, -0.4vh, 0); }
  100% { transform: translate3d(0, 0, 0); }
}
/* finale header flash: three discrete dips per 2.6s (~1.1 paints/s) — the tab
   catching the flag, not a strobe */
@keyframes grandprix-flag {
  0%, 50%   { opacity: 1; }
  58%, 70%  { opacity: 0.62; }
  78%, 100% { opacity: 1; }
}

/* ═══ reduced motion: the race holds a still frame — the car parks mid-straight
   (visible), the haze hangs, the finale tab stops flashing, slides fall back to
   the base fade. ═══ */
@media (prefers-reduced-motion: reduce) {
  head::before {
    animation: none;
    transform: translate3d(46vw, 0, 0);
  }
  body::after { animation: none; }
  .credits-block:nth-last-of-type(2) .credits-block__title,
  .credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
    animation: none;
  }
  .credits-slide { transform: none; transition: opacity 0.8s ease; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--grandprix-scenery:none;}",
};
