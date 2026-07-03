import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. Aurora — Northern Lights: the last transmission from a solitary arctic station. Aurora curtains breathe over a frozen fjord, snow-laden pines and mountains hold the shore, one cabin window burns warm, and the names drift up through the polar night. */
export const VARIANT: ThemeVariant = {
  key: "aurora",
  name: "Aurora — Northern Lights",
  css: `
/* ================================================================
   AURORA — NORTHERN LIGHTS (layered after the base theme).
   Fiction: 03:14, deep in the polar night, at STATION AURORA — a
   lone observation hut on the shore of a frozen fjord. Overhead,
   three vast aurora curtains breathe across the sky in ice-green,
   teal and violet; a ridge of snow mountains stands on the far
   shore; black pines crowd the near bank under snow; one cabin
   window burns warm amber against all that cold. A crisp starfield
   hangs behind it. The station is logging everyone who kept the
   watch tonight. When the raiders arrive, the whole sky FLARES —
   a substorm, the corona overhead — then the lights fade and the
   channel signs off: stay warm out there.
   Layer map (all scenery kill-switched via --aurora-scenery):
     html bg (--credits-bg)   polar-night gradient (cheap: 1 radial + 1 linear)
     html::before  z-2        THE SKY: coarse star blooms, milky haze,
                              horizon airglow. STATIC, promoted
     html::after   z-2        THE AURORA — three HUGE soft vertical
                              curtain ribbons (coarse conic/linear, low
                              alpha) + the readability scrim. The ribbons
                              shimmer on a steps() opacity swap (<=1 hop/2s).
                              STATIC geometry, promoted
     body::before  z-1        THE FJORD SHORE — one wide SVG silhouette:
                              snow mountains far, snow-laden pines near,
                              a frozen lake edge + a faint aurora reflection
                              on the ice. STATIC, promoted
     body::after   z-1        center-lane readability scrim over the
                              brightest ribbon. STATIC, promoted
     head::before  z0         THE CABIN — a little station hut with a warm
                              lit window on the near shore, snow on the roof,
                              cast glow on the snow. STATIC, promoted. Its
                              window is the ONLY warm note until the finale.
     head::after   z-1        a slow drift of snow — ONE continuous mover
                              (steps(1) fall, will-change budget: 1), coarse
                              soft flakes, rides high and to the sides
     meta#1::before z0        a lone PINE + weather mast in the near-left
                              foreground, moon-side rim light. STATIC
     meta#1::after  z-1       ONE shooting star, upper-right, steps() 3 states
                              once per ~34s, off-lane. NOT a continuous mover
     meta#2::before z-2       the SECOND aurora band low on the horizon
                              behind the mountains — a green airglow arc,
                              steps() shimmer offset from the main curtains
     .credits-roll::before    the fine starfield — RIDES THE ROLL (static
     .credits-slideshow::before  vs the tracked glyphs = zero flicker)
   ================================================================ */
@import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Josefin+Sans:wght@300;400;600&display=swap');

:root {
  --aurora-scenery: block; /* set to none to strip every scenery layer */
  --aurora-green: #7ef7c4;   /* ice green — the dominant curtain */
  --aurora-teal: #58e0e8;    /* glacial teal */
  --aurora-violet: #b79cff;  /* high-altitude violet crown */
  --aurora-snow: #eaf3ff;    /* moonlit snow */
  --aurora-ice: #cfe6ff;     /* pale ice blue */
  --aurora-ember: #ffcf8a;   /* the cabin window — the one warm note */

  /* cheap polar night: one faint zenith glow + a 6-stop night gradient
     falling to a hint of green airglow at the horizon (L3: root bg stays
     simple; the texture stacks live on the promoted fixed pseudos). */
  --credits-bg:
    radial-gradient(ellipse 60% 40% at 50% 4%, rgba(126, 247, 196, 0.08) 0%, rgba(88, 224, 232, 0.03) 48%, rgba(6, 12, 22, 0) 76%),
    linear-gradient(180deg, #030711 0%, #050c1a 20%, #071324 44%, #081a2c 62%, #06111f 82%, #040a14 100%);
  --credits-color: var(--aurora-snow);
  --credits-accent: var(--aurora-teal);
  --credits-font: "Jost", "Avenir Next", "Segoe UI", "Helvetica Neue", sans-serif;
  --credits-title-font: "Josefin Sans", "Jost", "Trebuchet MS", sans-serif;
  --credits-title-size: clamp(1.3rem, 3.4vw, 2.05rem);
  --credits-name-size: clamp(1.05rem, 2.6vw, 1.55rem);
  --credits-flourish-title-size: clamp(2.3rem, 7.6vw, 4.6rem);
  --credits-block-gap: 5.25rem;
  --credits-name-gap: 0.72rem;
  --credits-shadow: 0 2px 14px rgba(2, 6, 14, 0.85);
  /* no-op glow — NEVER "none" (a "none" in the composed shadow list
     invalidates the whole declaration); Aurora glows are bespoke. */
  --credits-glow: 0 0 0 rgba(0, 0, 0, 0);
}

/* scenery is full-bleed: html drops the base edge-fade; body keeps it but
   with a slightly steeper top ramp so crawling names dissolve before they
   reach the aurora crown and never fight the brightest sky. */
html { -webkit-mask-image: none; mask-image: none; }
body {
  background: transparent;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 15%, #000 88%, transparent 100%);
  mask-image: linear-gradient(to bottom, transparent 0%, #000 15%, #000 88%, transparent 100%);
}

/* ═══ THE SKY (html::before, z-2): coarse soft star blooms (60-90px
   features, low alpha), a soft milky haze band, and green airglow low
   over the horizon. Every feature is huge/soft — nothing can flicker
   against glyphs. STATIC, promoted. ═══ */
html::before {
  content: "";
  display: var(--aurora-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* a few brighter GLINT stars (first-magnitude) in the corners, off-lane —
       each a tight white core plus a soft coloured bloom halo */
    radial-gradient(circle at 16% 12%, rgba(255, 255, 255, 1) 0 1.9px, rgba(234, 243, 255, 0.5) 2.6px, rgba(234, 243, 255, 0) 4.2px),
    radial-gradient(ellipse 96px 74px at 16% 12%, rgba(180, 220, 255, 0.09) 0%, rgba(180, 220, 255, 0) 70%),
    radial-gradient(circle at 68% 8%, rgba(255, 253, 246, 0.95) 0 1.7px, rgba(240, 248, 255, 0) 3.4px),
    radial-gradient(ellipse 82px 64px at 68% 8%, rgba(190, 240, 225, 0.08) 0%, rgba(190, 240, 225, 0) 70%),
    radial-gradient(circle at 88% 30%, rgba(255, 250, 255, 0.85) 0 1.6px, rgba(240, 248, 255, 0) 3.2px),
    radial-gradient(ellipse 90px 68px at 88% 30%, rgba(183, 156, 255, 0.08) 0%, rgba(183, 156, 255, 0) 70%),
    radial-gradient(circle at 40% 16%, rgba(245, 250, 255, 0.78) 0 1.3px, rgba(240, 248, 255, 0) 2.8px),
    radial-gradient(ellipse 70px 56px at 40% 16%, rgba(255, 210, 190, 0.05) 0%, rgba(255, 210, 190, 0) 70%),
    /* a faint amber giant + a cool blue star, top corners, off-lane */
    radial-gradient(circle at 6% 26%, rgba(255, 226, 190, 0.7) 0 1.5px, rgba(255, 226, 190, 0) 3px),
    radial-gradient(circle at 95% 14%, rgba(206, 226, 255, 0.72) 0 1.5px, rgba(206, 226, 255, 0) 3px),
    /* extra glints filling the sparse upper-LEFT quadrant (all off-lane) */
    radial-gradient(circle at 10% 46%, rgba(255, 253, 248, 0.82) 0 1.5px, rgba(240, 248, 255, 0) 3px),
    radial-gradient(ellipse 64px 52px at 10% 46%, rgba(180, 220, 255, 0.06) 0%, rgba(180, 220, 255, 0) 70%),
    radial-gradient(circle at 24% 32%, rgba(226, 236, 255, 0.62) 0 1.2px, rgba(226, 236, 255, 0) 2.6px),
    radial-gradient(circle at 30% 52%, rgba(255, 246, 232, 0.55) 0 1.1px, rgba(255, 246, 232, 0) 2.4px),
    radial-gradient(circle at 4% 60%, rgba(206, 226, 255, 0.5) 0 1.1px, rgba(206, 226, 255, 0) 2.4px),
    radial-gradient(circle at 18% 68%, rgba(255, 255, 255, 0.46) 0 1px, rgba(240, 248, 255, 0) 2.2px),
    /* the MILKY WAY: a soft dusty band arcing down the sky (coarse, off-lane) */
    linear-gradient(118deg, rgba(150, 200, 220, 0) 28%, rgba(168, 214, 224, 0.05) 42%, rgba(214, 234, 245, 0.09) 50%, rgba(190, 208, 240, 0.06) 58%, rgba(150, 200, 220, 0) 74%),
    radial-gradient(ellipse 46vw 26vh at 30% 20%, rgba(200, 220, 245, 0.045) 0%, rgba(200, 220, 245, 0) 68%),
    /* green airglow low over the horizon */
    linear-gradient(180deg, rgba(126, 247, 196, 0) 58%, rgba(126, 247, 196, 0.05) 80%, rgba(150, 250, 205, 0.1) 100%);
}

/* ═══ THE AURORA (html::after, z-2): the painterly curtains. Each drape is
   an SVG figure with real anatomy — a bright lower HEM where the rays
   ignite, vertical filament RAYS combed up through the body, a soft BLOOM
   halo, and green→teal→violet vertical color mixing (cold at the hem,
   warming to violet at the crown). Two big drapes + a violet crown wash,
   all coarse/soft/low-alpha — L6-legal light. The layer breathes on a
   steps() opacity/parallax swap (aurora-drape, ~1 hop/2s). One UNBROKEN
   data-URI line. STATIC geometry, promoted. ═══ */
html::after {
  content: "";
  display: var(--aurora-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* ── the RAY filaments + blazing HEM, a small SVG with only a light blur
       (large SVG blur tiles/bands in headless Chrome, so the smooth curtain
       BODY is built from CSS gradients below, never in SVG). ONE UNBROKEN
       data-URI line. ── */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 700' preserveAspectRatio='xMidYMin slice'%3E%3Cdefs%3E%3ClinearGradient id='rg' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%237ef7c4' stop-opacity='0'/%3E%3Cstop offset='.5' stop-color='%237ef7c4' stop-opacity='.42'/%3E%3Cstop offset='.9' stop-color='%23d6fff0' stop-opacity='.98'/%3E%3C/linearGradient%3E%3ClinearGradient id='rt' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%2358e0e8' stop-opacity='0'/%3E%3Cstop offset='.5' stop-color='%2358e0e8' stop-opacity='.42'/%3E%3Cstop offset='.9' stop-color='%23c8fff2' stop-opacity='.98'/%3E%3C/linearGradient%3E%3ClinearGradient id='rv' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23b79cff' stop-opacity='0'/%3E%3Cstop offset='.5' stop-color='%23aab6ff' stop-opacity='.46'/%3E%3Cstop offset='.9' stop-color='%23e2e8ff' stop-opacity='.98'/%3E%3C/linearGradient%3E%3ClinearGradient id='hemG' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23eafff6' stop-opacity='0'/%3E%3Cstop offset='.7' stop-color='%23c8fbe6' stop-opacity='.6'/%3E%3Cstop offset='1' stop-color='%23fcfffd' stop-opacity='1'/%3E%3C/linearGradient%3E%3Cfilter id='fs' x='-30%25' y='-15%25' width='160%25' height='130%25'%3E%3CfeGaussianBlur stdDeviation='6'/%3E%3C/filter%3E%3Cfilter id='ff' x='-30%25' y='-15%25' width='160%25' height='130%25'%3E%3CfeGaussianBlur stdDeviation='2.4'/%3E%3C/filter%3E%3C/defs%3E%3C!-- FINE COMBED FILAMENTS: many soft hair-thin rays give the curtain body vertical structure. Kept soft-blurred (ff) so they read as combed texture, never a flicker-prone hard line --%3E%3Cg filter='url(%23ff)' opacity='.42'%3E%3Cpath d='M356 150 L360 430 L366 430 Z' fill='url(%23rg)'/%3E%3Cpath d='M392 176 L395 400 L400 400 Z' fill='url(%23rg)'/%3E%3Cpath d='M468 140 L472 442 L478 442 Z' fill='url(%23rg)'/%3E%3Cpath d='M512 168 L515 410 L520 410 Z' fill='url(%23rg)'/%3E%3Cpath d='M600 120 L604 456 L610 456 Z' fill='url(%23rg)'/%3E%3Cpath d='M636 158 L639 420 L644 420 Z' fill='url(%23rt)'/%3E%3Cpath d='M700 132 L704 440 L710 440 Z' fill='url(%23rt)'/%3E%3Cpath d='M740 170 L743 405 L748 405 Z' fill='url(%23rt)'/%3E%3Cpath d='M830 120 L834 452 L840 452 Z' fill='url(%23rt)'/%3E%3Cpath d='M888 150 L891 425 L896 425 Z' fill='url(%23rt)'/%3E%3Cpath d='M952 128 L956 448 L962 448 Z' fill='url(%23rt)'/%3E%3Cpath d='M1012 160 L1015 412 L1020 412 Z' fill='url(%23rt)'/%3E%3Cpath d='M1088 130 L1092 446 L1098 446 Z' fill='url(%23rv)'/%3E%3Cpath d='M1148 158 L1151 420 L1156 420 Z' fill='url(%23rv)'/%3E%3Cpath d='M1222 122 L1226 452 L1232 452 Z' fill='url(%23rv)'/%3E%3Cpath d='M1288 150 L1291 426 L1296 426 Z' fill='url(%23rv)'/%3E%3Cpath d='M1360 128 L1364 444 L1370 444 Z' fill='url(%23rv)'/%3E%3Cpath d='M1424 160 L1427 408 L1432 408 Z' fill='url(%23rv)'/%3E%3C/g%3E%3C!-- RAY ACCENTS: a FEW well-spaced brighter filaments. Green left, teal centre, violet right --%3E%3Cg filter='url(%23fs)' opacity='.75'%3E%3Cpath d='M336 118 L346 456 L364 456 Z' fill='url(%23rg)'/%3E%3Cpath d='M430 150 L438 388 L454 388 Z' fill='url(%23rg)'/%3E%3Cpath d='M548 80 L558 472 L576 472 Z' fill='url(%23rg)'/%3E%3Cpath d='M660 140 L668 366 L684 366 Z' fill='url(%23rt)'/%3E%3Cpath d='M792 96 L800 456 L818 456 Z' fill='url(%23rt)'/%3E%3Cpath d='M858 118 L866 408 L882 408 Z' fill='url(%23rt)'/%3E%3Cpath d='M918 62 L928 482 L946 482 Z' fill='url(%23rt)'/%3E%3Cpath d='M980 128 L988 402 L1004 402 Z' fill='url(%23rt)'/%3E%3Cpath d='M1042 132 L1050 452 L1066 452 Z' fill='url(%23rt)'/%3E%3Cpath d='M1116 96 L1124 388 L1140 388 Z' fill='url(%23rv)'/%3E%3Cpath d='M1188 100 L1196 456 L1212 456 Z' fill='url(%23rv)'/%3E%3Cpath d='M1258 84 L1266 400 L1282 400 Z' fill='url(%23rv)'/%3E%3Cpath d='M1326 78 L1334 462 L1350 462 Z' fill='url(%23rv)'/%3E%3Cpath d='M1392 112 L1400 396 L1416 396 Z' fill='url(%23rv)'/%3E%3Cpath d='M1452 128 L1460 448 L1476 448 Z' fill='url(%23rv)'/%3E%3C/g%3E%3C!-- the blazing HEM: an UNDULATING bright ribbon that dips and rises like a hanging curtain edge (no more ruled clothesline). A broad soft under-bloom + a brighter festooned crest so each ray ignites at its OWN height --%3E%3Cg filter='url(%23fs)'%3E%3Cpath d='M232 402 Q360 360 470 400 Q560 434 660 396 Q760 358 858 402 Q960 446 1058 400 Q1156 356 1256 402 Q1356 446 1452 398 L1452 452 Q1356 496 1256 452 Q1156 408 1058 452 Q960 496 858 452 Q760 410 660 448 Q560 486 470 450 Q360 412 232 452 Z' fill='url(%23hemG)' opacity='.42'/%3E%3Cpath d='M256 396 Q372 366 466 396 Q556 424 654 392 Q754 360 846 396 Q948 434 1046 394 Q1146 358 1240 396 Q1338 432 1436 394 L1436 416 Q1338 452 1240 416 Q1146 382 1046 416 Q948 454 846 416 Q754 384 654 414 Q556 446 466 416 Q372 390 256 418 Z' fill='%23dafff0' opacity='.6'/%3E%3C/g%3E%3C!-- scattered soft BLOOM knots along the crest where the light pools brightest (coarse, off-lane sides) --%3E%3Cg filter='url(%23fs)' fill='%23eafff6'%3E%3Cellipse cx='360' cy='382' rx='58' ry='18' opacity='.2'/%3E%3Cellipse cx='660' cy='406' rx='50' ry='16' opacity='.16'/%3E%3Cellipse cx='1058' cy='388' rx='62' ry='20' opacity='.22'/%3E%3Cellipse cx='1352' cy='402' rx='56' ry='18' opacity='.18'/%3E%3C/g%3E%3C/svg%3E") top center / 100% auto no-repeat,
    /* VOLUMETRIC GOD-RAYS: two broad soft shafts descending from the brightest
       curtain regions (right-third + left-third, OFF the center text lane).
       Coarse and low-alpha (L6-safe: no fine pattern over the lane). */
    linear-gradient(178deg, rgba(198, 255, 232, 0.08) 0%, rgba(160, 240, 220, 0.04) 30%, rgba(126, 247, 196, 0) 62%) 78% 0 / 12vw 62vh no-repeat,
    linear-gradient(183deg, rgba(198, 236, 255, 0.06) 0%, rgba(150, 220, 235, 0.03) 30%, rgba(120, 210, 230, 0) 60%) 26% 0 / 10vw 56vh no-repeat,
    /* the violet crown CORONA: a brighter bloom where the curtains reach highest */
    radial-gradient(ellipse 54vw 30vh at 46% -8%, rgba(197, 176, 255, 0.2) 0%, rgba(168, 158, 255, 0.07) 42%, rgba(183, 156, 255, 0) 70%),
    radial-gradient(ellipse 30vw 20vh at 46% -4%, rgba(226, 232, 255, 0.14) 0%, rgba(226, 232, 255, 0) 66%),
    /* ── the smooth CURTAIN BODY as wide gradients that can never band:
       (1) a horizontal green→teal→violet hue wash for the colour mix (now
       richer/more saturated), (2) a vertical fade so it hangs from the crown
       and dies above the horizon. Smooth gradients ADD to one coherent sheet. ── */
    linear-gradient(101deg, rgba(126, 247, 196, 0.2) 2%, rgba(104, 240, 208, 0.18) 26%, rgba(88, 224, 232, 0.17) 50%, rgba(124, 176, 244, 0.16) 74%, rgba(183, 156, 255, 0.2) 96%),
    radial-gradient(ellipse 34vw 36vh at 70% 18%, rgba(140, 128, 255, 0.12) 0%, rgba(150, 150, 255, 0.04) 44%, rgba(150, 150, 255, 0) 70%),
    radial-gradient(ellipse 32vw 34vh at 24% 22%, rgba(110, 236, 204, 0.11) 0%, rgba(110, 236, 204, 0.03) 46%, rgba(110, 236, 204, 0) 72%),
    /* a faint DISTANT curtain wisp in the left third — hazier, cooler, lower
       contrast (aerial perspective) so it reads as a drape far up the fjord */
    radial-gradient(ellipse 15vw 30vh at 12% 26%, rgba(120, 220, 200, 0.08) 0%, rgba(120, 200, 210, 0.03) 40%, rgba(120, 200, 210, 0) 66%),
    linear-gradient(96deg, rgba(126, 247, 196, 0) 2%, rgba(126, 240, 205, 0.05) 8%, rgba(120, 220, 210, 0.03) 15%, rgba(126, 247, 196, 0) 24%),
    radial-gradient(ellipse 82vw 40vh at 48% 2%, rgba(255, 255, 255, 0.11) 0%, rgba(255, 255, 255, 0.05) 40%, rgba(255, 255, 255, 0) 74%),
    /* a broad even airglow lifting the whole upper sky (no black gaps) */
    linear-gradient(180deg, rgba(120, 235, 210, 0.11) 0%, rgba(96, 210, 220, 0.08) 34%, rgba(110, 150, 210, 0.03) 58%, rgba(110, 150, 210, 0) 74%);
  animation: aurora-drape 8s steps(1, end) infinite;
}

/* ═══ THE FJORD SHORE (body::before, z-1): one wide SVG silhouette band —
   a ridge of snow mountains far, a frozen lake edge catching a faint green
   aurora reflection, and snow-laden black pines crowding the near bank.
   Above it in the same layer: the soft green pool where the sky meets the
   ice. STATIC, promoted. ═══ */
body::before {
  content: "";
  display: var(--aurora-scenery, block);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 34vh;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* the light pool where the aurora hem meets the horizon haze */
    radial-gradient(ellipse 58vw 9vh at 48% 30%, rgba(126, 247, 196, 0.12) 0%, rgba(88, 224, 232, 0.04) 48%, rgba(126, 247, 196, 0) 74%) no-repeat,
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 440' preserveAspectRatio='none'%3E%3Cdefs%3E%3ClinearGradient id='haze' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23233c56' stop-opacity='0'/%3E%3Cstop offset='.5' stop-color='%232b4a64' stop-opacity='.42'/%3E%3Cstop offset='1' stop-color='%23385c76' stop-opacity='.7'/%3E%3C/linearGradient%3E%3ClinearGradient id='farlit' x1='0' y1='0' x2='.5' y2='1'%3E%3Cstop offset='0' stop-color='%2354788f'/%3E%3Cstop offset='1' stop-color='%2333546e'/%3E%3C/linearGradient%3E%3ClinearGradient id='farsh' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%232f4c66'/%3E%3Cstop offset='1' stop-color='%23223c54'/%3E%3C/linearGradient%3E%3ClinearGradient id='midlit' x1='0' y1='0' x2='.4' y2='1'%3E%3Cstop offset='0' stop-color='%23335472'/%3E%3Cstop offset='1' stop-color='%231d3a54'/%3E%3C/linearGradient%3E%3ClinearGradient id='midsh' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23193253'/%3E%3Cstop offset='1' stop-color='%230f2440'/%3E%3C/linearGradient%3E%3ClinearGradient id='nearlit' x1='0' y1='0' x2='.35' y2='1'%3E%3Cstop offset='0' stop-color='%23234668'/%3E%3Cstop offset='.55' stop-color='%2313294a'/%3E%3Cstop offset='1' stop-color='%230a1830'/%3E%3C/linearGradient%3E%3ClinearGradient id='nearsh' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%230d1d3a'/%3E%3Cstop offset='1' stop-color='%23050c1c'/%3E%3C/linearGradient%3E%3ClinearGradient id='snowfield' x1='.3' y1='0' x2='.5' y2='1'%3E%3Cstop offset='0' stop-color='%23eef5ff' stop-opacity='.92'/%3E%3Cstop offset='.4' stop-color='%23bcd3f2' stop-opacity='.6'/%3E%3Cstop offset='1' stop-color='%238fb2e0' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='snow' x1='.2' y1='0' x2='.5' y2='1'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='.45' stop-color='%23e3edfb'/%3E%3Cstop offset='1' stop-color='%23aac6ec'/%3E%3C/linearGradient%3E%3ClinearGradient id='ice' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%230d2238'/%3E%3Cstop offset='.45' stop-color='%23081425'/%3E%3Cstop offset='1' stop-color='%23030811'/%3E%3C/linearGradient%3E%3ClinearGradient id='refl' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23c6ffe8' stop-opacity='.62'/%3E%3Cstop offset='.4' stop-color='%237ef7c4' stop-opacity='.26'/%3E%3Cstop offset='1' stop-color='%237ef7c4' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='refl2' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23a6fbf2' stop-opacity='.5'/%3E%3Cstop offset='.4' stop-color='%2358e0e8' stop-opacity='.22'/%3E%3Cstop offset='1' stop-color='%2358e0e8' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='refl3' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23cdc0ff' stop-opacity='.42'/%3E%3Cstop offset='.4' stop-color='%23b79cff' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23b79cff' stop-opacity='0'/%3E%3C/linearGradient%3E%3Cfilter id='b' x='-40%25' y='-40%25' width='180%25' height='180%25'%3E%3CfeGaussianBlur stdDeviation='11'/%3E%3C/filter%3E%3Cfilter id='bs' x='-60%25' y='-60%25' width='220%25' height='220%25'%3E%3CfeGaussianBlur stdDeviation='4'/%3E%3C/filter%3E%3C/defs%3E%3C!-- ATMOSPHERIC HAZE BAND behind the far range --%3E%3Crect x='0' y='118' width='1600' height='158' fill='url(%23haze)'/%3E%3C!-- FAR RANGE: pale, hazy, low-contrast (aerial perspective). Two-tone lit/shadow faces --%3E%3Cg opacity='.46'%3E%3Cpath d='M0 170 L150 142 L300 168 L460 124 L640 170 L820 142 L1000 172 L1180 134 L1360 170 L1520 146 L1600 168 L1600 250 L0 250 Z' fill='url(%23farsh)'/%3E%3Cpath d='M460 124 L640 170 L460 170 Z M1180 134 L1360 170 L1180 170 Z M150 142 L300 168 L150 168 Z' fill='url(%23farlit)' opacity='.7'/%3E%3C/g%3E%3C!-- MID RANGE: modeled peaks, shadow body + lit right face + snow field --%3E%3Cg opacity='.92'%3E%3Cpath d='M0 198 L200 152 L360 212 L520 132 L700 202 L900 152 L1080 207 L1280 142 L1460 202 L1600 178 L1600 262 L0 262 Z' fill='url(%23midsh)'/%3E%3C!-- lit right faces --%3E%3Cpath d='M520 132 L700 202 L520 202 Z' fill='url(%23midlit)'/%3E%3Cpath d='M1280 142 L1460 202 L1280 202 Z' fill='url(%23midlit)'/%3E%3Cpath d='M200 152 L360 212 L200 212 Z' fill='url(%23midlit)' opacity='.85'/%3E%3C!-- snow on mid peaks --%3E%3Cpath d='M520 132 L556 172 L536 182 L519 173 L503 183 L487 173 L476 180 L500 150 Z' fill='%23c9dbf3' opacity='.7'/%3E%3Cpath d='M1280 142 L1314 178 L1296 188 L1280 179 L1265 189 L1250 179 L1240 185 L1262 158 Z' fill='%23c9dbf3' opacity='.7'/%3E%3C/g%3E%3C!-- NEAR RANGE: three majestic peaks, fully modeled --%3E%3Cpath d='M0 216 L120 188 L300 96 L470 212 L560 188 L760 78 L980 216 L1120 164 L1300 108 L1460 212 L1560 188 L1600 204 L1600 272 L0 272 Z' fill='url(%23nearsh)'/%3E%3C!-- LIT RIGHT FACES (aurora-side) catch cool light --%3E%3Cg fill='url(%23nearlit)'%3E%3Cpath d='M300 96 L470 212 L300 212 Z'/%3E%3Cpath d='M760 78 L980 216 L760 216 Z'/%3E%3Cpath d='M1300 108 L1460 212 L1300 212 Z'/%3E%3C/g%3E%3C!-- aerial-haze pooling in the valleys separates the near peaks (they no longer read as one flat mass) --%3E%3Cg fill='%232c4a64' opacity='.3'%3E%3Cpath d='M470 212 L560 188 L640 212 Z'/%3E%3Cpath d='M980 216 L1120 164 L1160 216 Z'/%3E%3Cpath d='M120 188 L60 208 L200 212 Z'/%3E%3C/g%3E%3C!-- a secondary snow-dusting ridgeline on the mid-slopes --%3E%3Cg stroke='%23c6d8f0' stroke-opacity='.16' stroke-width='2' fill='none' stroke-linecap='round'%3E%3Cpath d='M360 176 Q400 184 440 200'/%3E%3Cpath d='M828 168 Q880 180 940 202'/%3E%3Cpath d='M1354 184 Q1400 194 1440 206'/%3E%3C/g%3E%3C!-- SNOW FIELDS washing down the lit faces from each summit --%3E%3Cg%3E%3Cpath d='M300 96 L392 158 L360 176 L336 160 L318 178 L300 165 L300 96 Z' fill='url(%23snowfield)'/%3E%3Cpath d='M760 78 L868 148 L828 168 L800 150 L778 172 L760 156 L760 78 Z' fill='url(%23snowfield)'/%3E%3Cpath d='M1300 108 L1388 166 L1354 184 L1330 168 L1310 186 L1300 172 L1300 108 Z' fill='url(%23snowfield)'/%3E%3C/g%3E%3C!-- soft mid-value bridge softening the snow-field/shadow seam on each near peak --%3E%3Cg fill='%232a4666' opacity='.28'%3E%3Cpath d='M300 120 L318 178 L300 165 Z'/%3E%3Cpath d='M760 104 L778 172 L760 156 Z'/%3E%3Cpath d='M1300 132 L1310 186 L1300 172 Z'/%3E%3C/g%3E%3C!-- sculpted SNOW CAPS: bright crown with a scalloped drift lip --%3E%3Cg fill='url(%23snow)'%3E%3Cpath d='M300 96 L346 128 L330 140 L314 130 L300 141 L286 131 L270 140 L258 124 Z'/%3E%3Cpath d='M760 78 L818 116 L798 130 L780 118 L762 132 L744 119 L726 130 L706 110 Z'/%3E%3Cpath d='M1300 108 L1350 142 L1332 154 L1315 143 L1300 155 L1285 144 L1268 153 L1252 132 Z'/%3E%3C/g%3E%3C!-- core shadow on shaded (left) flank of each cap --%3E%3Cg fill='%23718fc0' opacity='.5'%3E%3Cpath d='M300 96 L300 141 L286 131 L270 140 L258 124 Z'/%3E%3Cpath d='M760 78 L762 132 L744 119 L726 130 L706 110 Z'/%3E%3Cpath d='M1300 108 L1300 155 L1285 144 L1268 153 L1252 132 Z'/%3E%3C/g%3E%3C!-- specular glint on the lit shoulder --%3E%3Cg fill='%23ffffff' opacity='.85'%3E%3Cpath d='M300 96 L328 116 L318 124 L302 106 Z'/%3E%3Cpath d='M760 78 L798 104 L786 114 L766 88 Z'/%3E%3Cpath d='M1300 108 L1332 130 L1322 138 L1306 118 Z'/%3E%3C/g%3E%3C!-- STATIC specular STAR-GLINTS on each summit crown: a crisp 4-point sparkle where starlight catches the fresh snow (baked on the prop = always L6-safe). Soft bloom first, then a long specular flare, crisp star on top --%3E%3Cg fill='%23eafff6' opacity='.5'%3E%3Ccircle cx='300' cy='101' r='10'/%3E%3Ccircle cx='760' cy='84' r='13'/%3E%3Ccircle cx='1300' cy='113' r='10'/%3E%3C/g%3E%3Cg fill='%23ffffff'%3E%3C!-- summit 1 --%3E%3Cpath d='M300 86 L303 99 L316 101 L303 103 L300 116 L297 103 L284 101 L297 99 Z' opacity='.95'/%3E%3Cpath d='M279 101 L321 101 L300 100.4 Z M300 82 L300 120 L299.4 101 Z' opacity='.5'/%3E%3Ccircle cx='300' cy='101' r='2.2' opacity='.95'/%3E%3C!-- summit 2 (tallest, brightest) --%3E%3Cpath d='M760 66 L763.6 82 L780 84 L763.6 86 L760 102 L756.4 86 L740 84 L756.4 82 Z' opacity='1'/%3E%3Cpath d='M734 84 L786 84 L760 83.2 Z M760 62 L760 106 L759.2 84 Z' opacity='.55'/%3E%3Ccircle cx='760' cy='84' r='2.8' opacity='1'/%3E%3C!-- summit 3 --%3E%3Cpath d='M1300 98 L1303 111 L1316 113 L1303 115 L1300 128 L1297 115 L1284 113 L1297 111 Z' opacity='.92'/%3E%3Cpath d='M1279 113 L1321 113 L1300 112.4 Z M1300 94 L1300 132 L1299.4 113 Z' opacity='.48'/%3E%3Ccircle cx='1300' cy='113' r='2.2' opacity='.92'/%3E%3C/g%3E%3C!-- aurora-side rim light down each lit ridge --%3E%3Cg fill='none' stroke='%237ef7c4' stroke-opacity='.34' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='M300 96 L470 212'/%3E%3Cpath d='M760 78 L980 216'/%3E%3Cpath d='M1300 108 L1460 212'/%3E%3C/g%3E%3C!-- violet crown catch on the tallest summit --%3E%3Cpath d='M760 78 L780 92 L744 90 Z' fill='%23b79cff' opacity='.3'/%3E%3C!-- FROZEN LAKE --%3E%3Crect x='0' y='260' width='1600' height='112' fill='url(%23ice)'/%3E%3C!-- a faint SKY-SHEEN band on the polished ice: the whole aurora curtain mirrored as a soft horizontal wash just below the waterline (gives the ice a reflective polish instead of flat dark) --%3E%3Crect x='0' y='262' width='1600' height='46' fill='url(%23refl)' opacity='.22'/%3E%3Crect x='560' y='262' width='620' height='40' fill='url(%23refl2)' opacity='.2'/%3E%3Crect x='1120' y='262' width='420' height='36' fill='url(%23refl3)' opacity='.16'/%3E%3C!-- the AURORA REFLECTION: clean mirrored CURTAIN COLUMNS under each drape, brightest at the waterline and streaking straight down, colour-matched to the sky (green left, teal centre, violet right). Tall and coherent, not blobs --%3E%3Cg filter='url(%23b)'%3E%3Cpath d='M356 261 L470 261 L452 366 L378 366 Z' fill='url(%23refl)' opacity='.92'/%3E%3Cpath d='M548 261 L660 261 L644 372 L568 372 Z' fill='url(%23refl)' opacity='.85'/%3E%3Cpath d='M792 261 L918 261 L900 372 L814 372 Z' fill='url(%23refl2)' opacity='.9'/%3E%3Cpath d='M980 261 L1066 261 L1052 356 L996 356 Z' fill='url(%23refl2)' opacity='.78'/%3E%3Cpath d='M1116 261 L1256 261 L1238 362 L1138 362 Z' fill='url(%23refl3)' opacity='.82'/%3E%3Cpath d='M1326 261 L1452 261 L1436 350 L1344 350 Z' fill='url(%23refl3)' opacity='.66'/%3E%3C/g%3E%3C!-- brighter thin reflected RAY streaks directly under the sky filaments (mirror + colour-match) --%3E%3Cg filter='url(%23bs)' opacity='.78'%3E%3Cpath d='M346 261 L342 348 L350 348 Z' fill='%23aefdda'/%3E%3Cpath d='M438 261 L434 330 L442 330 Z' fill='%23c6ffe8'/%3E%3Cpath d='M558 261 L554 360 L562 360 Z' fill='%23aefdda'/%3E%3Cpath d='M668 261 L664 322 L672 322 Z' fill='%23c6ffe8'/%3E%3Cpath d='M800 261 L796 352 L804 352 Z' fill='%23a6fbf2'/%3E%3Cpath d='M866 261 L862 336 L870 336 Z' fill='%2372ecec'/%3E%3Cpath d='M988 261 L984 340 L992 340 Z' fill='%2372ecec'/%3E%3Cpath d='M1124 261 L1120 336 L1128 336 Z' fill='%23cdc0ff'/%3E%3Cpath d='M1258 261 L1254 348 L1262 348 Z' fill='%23cdc0ff'/%3E%3Cpath d='M1400 261 L1396 328 L1404 328 Z' fill='%23d8ccff'/%3E%3C/g%3E%3C!-- CRACKED-ICE highlight veins: crisp pale hairlines catching starlight across the polished surface (material read) --%3E%3Cg stroke='%23cfe6ff' stroke-opacity='.22' stroke-width='1' stroke-linecap='round' fill='none'%3E%3Cpath d='M120 300 L280 312 L360 306'/%3E%3Cpath d='M470 322 L640 316 L720 328'/%3E%3Cpath d='M980 310 L1140 320 L1240 312'/%3E%3Cpath d='M1300 330 L1440 322'/%3E%3C/g%3E%3Cg stroke='%23aefdda' stroke-opacity='.12' stroke-width='1.4' stroke-linecap='round'%3E%3Cpath d='M300 288 L420 288 M900 294 L1030 294 M640 340 L760 340 M1080 344 L1180 344'/%3E%3C/g%3E%3C!-- the WATERLINE: a crisp bright seam where shore ice meets the drift, with a soft bloom above and below --%3E%3Crect x='0' y='259' width='1600' height='2.4' fill='%23eafff6' opacity='.55'/%3E%3Crect x='0' y='258' width='1600' height='6' fill='%23aefdda' opacity='.28' filter='url(%23bs)'/%3E%3Cellipse cx='700' cy='264' rx='620' ry='16' fill='%237ef7c4' opacity='.1'/%3E%3C!-- NEAR SHORE + snow line --%3E%3Cpath d='M0 318 Q260 310 520 316 Q820 324 1120 316 Q1380 308 1600 318 L1600 440 L0 440 Z' fill='%23030811'/%3E%3Cpath d='M0 318 Q260 310 520 316 Q820 324 1120 316 Q1380 308 1600 318' fill='none' stroke='%23dcecff' stroke-opacity='.32' stroke-width='2.5'/%3E%3Cpath d='M0 318 Q260 310 520 316 Q820 324 1120 316 Q1380 308 1600 318' fill='none' stroke='%237ef7c4' stroke-opacity='.14' stroke-width='5' filter='url(%23bs)'/%3E%3C!-- SNOW-LADEN CONIFER TREE-LINE along the near bank: fuller multi-tier firs with modeled lit/shadow flanks, heavy scalloped snow load, aurora rim light and a crisp snow tip. A denser grove on each bank so the shore reads as forested, not scattered arrowheads. Far/small firs recede into aerial haze. --%3E%3Cdefs%3E%3ClinearGradient id='firlit' x1='0' y1='0' x2='1' y2='.2'%3E%3Cstop offset='0' stop-color='%23020609'/%3E%3Cstop offset='.5' stop-color='%230a1526'/%3E%3Cstop offset='1' stop-color='%23163055'/%3E%3C/linearGradient%3E%3ClinearGradient id='sload2' x1='.15' y1='0' x2='.6' y2='1'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='.5' stop-color='%23dbe8fb'/%3E%3Cstop offset='1' stop-color='%23a3c1ea'/%3E%3C/linearGradient%3E%3C/defs%3E%3C!-- DISTANT haze firs (small, low-contrast) tucked between the near grove --%3E%3Cg fill='%230b1830' opacity='.5'%3E%3Cpath d='M255 322 L240 356 L270 356 Z M255 338 L243 366 L267 366 Z'/%3E%3Cpath d='M410 320 L397 352 L423 352 Z M410 336 L400 362 L420 362 Z'/%3E%3Cpath d='M1225 322 L1211 354 L1239 354 Z M1225 338 L1214 364 L1236 364 Z'/%3E%3Cpath d='M1385 320 L1372 352 L1398 352 Z M1385 336 L1375 362 L1395 362 Z'/%3E%3C/g%3E%3C!-- NEAR-LEFT GROVE (frames the cabin): three overlapping firs --%3E%3Cg%3E%3C!-- tallest fir --%3E%3Crect x='104' y='366' width='9' height='26' fill='%23050c16'/%3E%3Cpath d='M108 288 L82 336 L134 336 Z M108 314 L76 366 L140 366 Z M108 342 L70 392 L146 392 Z' fill='url(%23firlit)'/%3E%3Cpath d='M108 288 L82 336 L108 336 Z M108 314 L76 366 L108 366 Z M108 342 L70 392 L108 392 Z' fill='%23010509' opacity='.5'/%3E%3Cpath d='M108 288 L94 320 Q101 314 108 322 Q115 314 122 320 Z M108 314 L90 352 Q100 344 108 354 Q116 344 126 352 Z M108 342 L86 380 Q98 371 108 382 Q118 371 130 380 Z' fill='url(%23sload2)'/%3E%3Cg fill='%238fb0d8' opacity='.32'%3E%3Cpath d='M94 320 Q108 326 122 320 L121 323 Q108 329 95 323 Z'/%3E%3Cpath d='M90 352 Q108 359 126 352 L125 355 Q108 362 91 355 Z'/%3E%3Cpath d='M86 380 Q108 388 130 380 L129 384 Q108 392 87 384 Z'/%3E%3C/g%3E%3Cpath d='M108 288 L134 336 M108 342 L146 392' stroke='%237ef7c4' stroke-opacity='.36' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3Cpath d='M108 288 L112 302 L108 300 L104 302 Z' fill='%23ffffff' opacity='.85'/%3E%3C/g%3E%3C!-- shorter left fir --%3E%3Cg%3E%3Cpath d='M168 320 L148 358 L188 358 Z M168 340 L152 380 L184 380 Z' fill='url(%23firlit)'/%3E%3Cpath d='M168 320 L148 358 L168 358 Z M168 340 L152 380 L168 380 Z' fill='%23010509' opacity='.5'/%3E%3Cpath d='M168 320 L157 344 Q163 339 168 345 Q173 339 179 344 Z M168 340 L154 370 Q162 363 168 372 Q174 363 182 370 Z' fill='url(%23sload2)'/%3E%3Cpath d='M168 320 L188 358 M168 340 L184 380' stroke='%237ef7c4' stroke-opacity='.28' stroke-width='1.3' fill='none' stroke-linecap='round'/%3E%3C/g%3E%3C!-- right filler fir --%3E%3Cg%3E%3Cpath d='M62 328 L46 362 L78 362 Z M62 346 L50 382 L74 382 Z' fill='url(%23firlit)'/%3E%3Cpath d='M62 328 L46 362 L62 362 Z M62 346 L50 382 L62 382 Z' fill='%23010509' opacity='.5'/%3E%3Cpath d='M62 328 L52 350 Q57 345 62 351 Q67 345 72 350 Z' fill='url(%23sload2)'/%3E%3Cpath d='M62 328 L78 362' stroke='%237ef7c4' stroke-opacity='.24' stroke-width='1.2' fill='none' stroke-linecap='round'/%3E%3C/g%3E%3C!-- mid-left lone fir --%3E%3Cg%3E%3Cpath d='M330 314 L312 350 L348 350 Z M330 334 L316 372 L344 372 Z' fill='url(%23firlit)'/%3E%3Cpath d='M330 314 L312 350 L330 350 Z M330 334 L316 372 L330 372 Z' fill='%23010509' opacity='.5'/%3E%3Cpath d='M330 314 L319 340 Q325 335 330 341 Q335 335 341 340 Z M330 334 L318 364 Q326 357 330 366 Q334 357 342 364 Z' fill='url(%23sload2)'/%3E%3Cpath d='M330 314 L348 350 M330 334 L344 372' stroke='%237ef7c4' stroke-opacity='.26' stroke-width='1.3' fill='none' stroke-linecap='round'/%3E%3Cpath d='M330 314 L334 328 L330 326 L326 328 Z' fill='%23ffffff' opacity='.7'/%3E%3C/g%3E%3C!-- NEAR-RIGHT GROVE: three overlapping firs --%3E%3Cg%3E%3C!-- tall right fir --%3E%3Crect x='1296' y='362' width='9' height='26' fill='%23050c16'/%3E%3Cpath d='M1300 290 L1274 338 L1326 338 Z M1300 316 L1268 368 L1332 368 Z M1300 344 L1262 392 L1338 392 Z' fill='url(%23firlit)'/%3E%3Cpath d='M1300 290 L1274 338 L1300 338 Z M1300 316 L1268 368 L1300 368 Z M1300 344 L1262 392 L1300 392 Z' fill='%23010509' opacity='.5'/%3E%3Cpath d='M1300 290 L1286 322 Q1293 316 1300 324 Q1307 316 1314 322 Z M1300 316 L1282 354 Q1292 346 1300 356 Q1308 346 1318 354 Z M1300 344 L1278 382 Q1290 373 1300 384 Q1310 373 1322 382 Z' fill='url(%23sload2)'/%3E%3Cg fill='%238fb0d8' opacity='.32'%3E%3Cpath d='M1286 322 Q1300 328 1314 322 L1313 325 Q1300 331 1287 325 Z'/%3E%3Cpath d='M1282 354 Q1300 361 1318 354 L1317 357 Q1300 364 1283 357 Z'/%3E%3Cpath d='M1278 382 Q1300 390 1322 382 L1321 386 Q1300 394 1279 386 Z'/%3E%3C/g%3E%3Cpath d='M1300 290 L1326 338 M1300 344 L1338 392' stroke='%237ef7c4' stroke-opacity='.36' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3Cpath d='M1300 290 L1304 304 L1300 302 L1296 304 Z' fill='%23ffffff' opacity='.85'/%3E%3C/g%3E%3C!-- shorter right fir --%3E%3Cg%3E%3Cpath d='M1360 318 L1340 356 L1380 356 Z M1360 338 L1344 378 L1376 378 Z' fill='url(%23firlit)'/%3E%3Cpath d='M1360 318 L1340 356 L1360 356 Z M1360 338 L1344 378 L1360 378 Z' fill='%23010509' opacity='.5'/%3E%3Cpath d='M1360 318 L1349 342 Q1355 337 1360 343 Q1365 337 1371 342 Z M1360 338 L1346 368 Q1354 361 1360 370 Q1366 361 1374 368 Z' fill='url(%23sload2)'/%3E%3Cpath d='M1360 318 L1380 356 M1360 338 L1376 378' stroke='%237ef7c4' stroke-opacity='.28' stroke-width='1.3' fill='none' stroke-linecap='round'/%3E%3C/g%3E%3C!-- far-right filler fir --%3E%3Cg%3E%3Cpath d='M1452 322 L1436 356 L1468 356 Z M1452 340 L1440 376 L1464 376 Z' fill='url(%23firlit)'/%3E%3Cpath d='M1452 322 L1436 356 L1452 356 Z M1452 340 L1440 376 L1452 376 Z' fill='%23010509' opacity='.5'/%3E%3Cpath d='M1452 322 L1442 344 Q1447 339 1452 345 Q1457 339 1462 344 Z' fill='url(%23sload2)'/%3E%3Cpath d='M1452 322 L1468 356' stroke='%237ef7c4' stroke-opacity='.24' stroke-width='1.2' fill='none' stroke-linecap='round'/%3E%3C/g%3E%3C/svg%3E") bottom / 100% 100% no-repeat;
}

/* ═══ CENTER-LANE READABILITY SCRIM (body::after, z-1): a soft vertical dark
   veil down the middle third where the names crawl, so the brightened aurora
   never fights the glyphs. A single smooth gradient (L6-safe: coarse, no fine
   pattern), STATIC, promoted. L9: scrim because the scenery is now bright. ═══ */
body::after {
  content: "";
  display: var(--aurora-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background:
    linear-gradient(90deg, rgba(4, 9, 18, 0) 20%, rgba(4, 9, 18, 0.24) 40%, rgba(4, 9, 18, 0.28) 50%, rgba(4, 9, 18, 0.24) 60%, rgba(4, 9, 18, 0) 80%);
}

/* ═══ THE CABIN (head::before, z0): the station hut on the near shore,
   lower-left, a warm lit window burning against the cold. Snow on the
   roof, a soft warm glow spilling on the snow in front. STATIC, promoted.
   The window is the ONLY warm note until the finale flares. ═══ */
head { display: var(--aurora-scenery, block); }
head::before {
  content: "";
  display: var(--aurora-scenery, block);
  position: fixed;
  left: 6vw;
  bottom: 3.4vh;
  width: 172px;
  height: 150px;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 158'%3E%3Cdefs%3E%3CradialGradient id='pool' cx='50%25' cy='40%25' r='58%25'%3E%3Cstop offset='0' stop-color='%23ffe0a6' stop-opacity='.72'/%3E%3Cstop offset='38%25' stop-color='%23ffb861' stop-opacity='.3'/%3E%3Cstop offset='100%25' stop-color='%23ff9d4a' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='win' cx='50%25' cy='34%25' r='78%25'%3E%3Cstop offset='0' stop-color='%23fffbf0'/%3E%3Cstop offset='24%25' stop-color='%23fff0cf'/%3E%3Cstop offset='60%25' stop-color='%23ffcf82'/%3E%3Cstop offset='100%25' stop-color='%23ec9a44'/%3E%3C/radialGradient%3E%3ClinearGradient id='wall' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%2317293e'/%3E%3Cstop offset='1' stop-color='%23091323'/%3E%3C/linearGradient%3E%3ClinearGradient id='wallsh' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%230e1c2e'/%3E%3Cstop offset='1' stop-color='%23060e1a'/%3E%3C/linearGradient%3E%3ClinearGradient id='roofsnow' x1='0' y1='0' x2='.3' y2='1'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='.5' stop-color='%23dbe8fb'/%3E%3Cstop offset='1' stop-color='%23aec8ec'/%3E%3C/linearGradient%3E%3Cfilter id='cs' x='-50%25' y='-50%25' width='200%25' height='200%25'%3E%3CfeGaussianBlur stdDeviation='3'/%3E%3C/filter%3E%3Cfilter id='cw' x='-80%25' y='-80%25' width='260%25' height='260%25'%3E%3CfeGaussianBlur stdDeviation='5'/%3E%3C/filter%3E%3C/defs%3E%3C!-- warm light POOL spilling onto the snow (soft, blurred) --%3E%3Cellipse cx='100' cy='134' rx='80' ry='28' fill='url(%23pool)' filter='url(%23cs)'/%3E%3C!-- snow drift the cabin sits in, lit warm on the window side --%3E%3Cellipse cx='96' cy='143' rx='86' ry='14' fill='%23cfe6ff' opacity='.2'/%3E%3Cellipse cx='104' cy='140' rx='40' ry='9' fill='%23ffce8c' opacity='.16'/%3E%3C!-- contact shadow under the cabin --%3E%3Cellipse cx='96' cy='135' rx='48' ry='8' fill='%23010509' opacity='.55'/%3E%3C!-- LEFT GABLE (shadow side) + RIGHT WALL (lit face) give the box volume --%3E%3Crect x='60' y='80' width='42' height='56' fill='url(%23wallsh)'/%3E%3Crect x='100' y='80' width='40' height='56' fill='url(%23wall)'/%3E%3C!-- plank lines --%3E%3Cg stroke='%23223a55' stroke-opacity='.45' stroke-width='.6'%3E%3Cpath d='M60 92 L140 92 M60 104 L140 104 M60 116 L140 116 M60 128 L140 128'/%3E%3C/g%3E%3C!-- corner edge highlight where the two wall faces meet --%3E%3Crect x='99' y='80' width='2' height='56' fill='%233a5a80' opacity='.4'/%3E%3Crect x='99.5' y='80' width='1' height='56' fill='%23cfe6ff' opacity='.14'/%3E%3C!-- aurora-side (right) wall catches cool rim light --%3E%3Crect x='135' y='80' width='5' height='56' fill='%237ef7c4' opacity='.16'/%3E%3C!-- warm light leaking along the lit wall from the window --%3E%3Crect x='100' y='94' width='40' height='34' fill='%23ffb861' opacity='.07'/%3E%3C!-- roof: shaded left plane + lit right plane --%3E%3Cpath d='M50 84 L100 46 L100 84 Z' fill='%23060e18'/%3E%3Cpath d='M100 46 L150 84 L100 84 Z' fill='%230a141f'/%3E%3C!-- snow blanket on roof with a scalloped drip lip --%3E%3Cpath d='M50 84 L100 46 L150 84 Q138 80 132 86 Q124 79 116 85 Q108 78 100 84 Q92 78 84 85 Q76 79 68 86 Q62 80 50 84 Z' fill='url(%23roofsnow)'/%3E%3C!-- soft blue core-shadow along the roof underside of the snow --%3E%3Cpath d='M52 84 Q100 90 148 84' stroke='%238fb0d8' stroke-opacity='.4' stroke-width='2' fill='none'/%3E%3Cpath d='M50 84 Q100 89 150 84' stroke='%23f2f8ff' stroke-opacity='.55' stroke-width='1' fill='none'/%3E%3C!-- specular glint on the snowy roof ridge (lit side) --%3E%3Cpath d='M100 50 L128 71 L124 74 L100 55 Z' fill='%23ffffff' opacity='.7'/%3E%3C!-- warm window bloom BEHIND the panes (soft) --%3E%3Cellipse cx='114' cy='110' rx='30' ry='27' fill='%23ffcf8a' opacity='.2' filter='url(%23cw)'/%3E%3C!-- the WARM WINDOW on the lit face: frame, 4 panes, bright inner glow --%3E%3Crect x='104' y='95' width='26' height='30' rx='1.5' fill='%233a2410'/%3E%3Crect x='106' y='97' width='22' height='26' rx='1' fill='url(%23win)'/%3E%3C!-- hot core near the lamp --%3E%3Cellipse cx='117' cy='104' rx='7' ry='6' fill='%23fffdf4' opacity='.85' filter='url(%23cs)'/%3E%3C!-- mullions --%3E%3Cpath d='M117 97 L117 123 M106 110 L128 110' stroke='%234a2f13' stroke-width='1.4'/%3E%3C!-- frame highlight --%3E%3Crect x='104' y='95' width='26' height='30' rx='1.5' fill='none' stroke='%23ffe6c0' stroke-opacity='.55' stroke-width='.8'/%3E%3C!-- warm sill light spill below the window --%3E%3Cpath d='M104 125 L130 125 L138 132 L96 132 Z' fill='%23ffbe70' opacity='.16' filter='url(%23cs)'/%3E%3C!-- chimney on the ridge + a curling wisp of woodsmoke --%3E%3Crect x='78' y='56' width='9' height='16' fill='%23091320'/%3E%3Crect x='78' y='56' width='9' height='3' fill='%23e6f0ff' opacity='.75'/%3E%3Cpath d='M82 54 Q89 45 82 37 Q75 29 82 20 Q87 14 83 8' stroke='%23c9d8ec' stroke-opacity='.26' stroke-width='2.6' fill='none' stroke-linecap='round' filter='url(%23cs)'/%3E%3C!-- aurora-side rim light down the lit roof edge --%3E%3Cpath d='M100 46 L150 84' stroke='%237ef7c4' stroke-opacity='.3' stroke-width='1.4' fill='none'/%3E%3C/svg%3E") center bottom / contain no-repeat;
}

/* ═══ SNOWFALL (head::after, z-1): the ONE continuous mover. Coarse soft
   flakes (>= 6px, low alpha, off-lane at the sides), falling on a steps(1)
   cadence so it never smears against the crawl. Overscans so hops never
   expose an edge. will-change budget: 1. ═══ */
head::after {
  content: "";
  display: var(--aurora-scenery, block);
  position: fixed;
  top: -8vh;
  left: -6vw;
  right: -6vw;
  height: 120vh;
  z-index: -1;
  pointer-events: none;
  background-image:
    radial-gradient(circle at 8% 20%, rgba(234, 243, 255, 0.5) 0 2.4px, rgba(234, 243, 255, 0) 4px),
    radial-gradient(circle at 22% 62%, rgba(234, 243, 255, 0.4) 0 1.8px, rgba(234, 243, 255, 0) 3.4px),
    radial-gradient(circle at 90% 34%, rgba(234, 243, 255, 0.5) 0 2.4px, rgba(234, 243, 255, 0) 4px),
    radial-gradient(circle at 78% 78%, rgba(234, 243, 255, 0.38) 0 1.8px, rgba(234, 243, 255, 0) 3.4px),
    radial-gradient(circle at 12% 88%, rgba(234, 243, 255, 0.42) 0 2px, rgba(234, 243, 255, 0) 3.6px);
  background-size: 42vw 46vh, 30vw 38vh, 46vw 50vh, 34vw 40vh, 38vw 44vh;
  opacity: 0.75;
  will-change: transform;
  animation: aurora-snow 26s steps(1, end) infinite;
}

/* extra prop layers: the two <meta> void elements render nothing but their
   fixed pseudos are free canvases. */
head meta { display: var(--aurora-scenery, block); }

/* ═══ FOREGROUND PINE + WEATHER MAST (meta#1::before, z0): a single tall
   snow-dusted pine and a thin instrument mast planted near-left, the
   station's own tree. Aurora-side rim light down its lit edge, cast
   shadow on the snow. STATIC, promoted, foreground. ═══ */
head meta:first-of-type::before {
  content: "";
  display: var(--aurora-scenery, block);
  position: fixed;
  left: 1vw;
  bottom: 1.5vh;
  width: 132px;
  height: 260px;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 140 280'%3E%3Cdefs%3E%3ClinearGradient id='pn' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23010508'/%3E%3Cstop offset='.55' stop-color='%23060f1c'/%3E%3Cstop offset='1' stop-color='%230e2036'/%3E%3C/linearGradient%3E%3ClinearGradient id='sload' x1='.2' y1='0' x2='.6' y2='1'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='.5' stop-color='%23dbe8fb'/%3E%3Cstop offset='1' stop-color='%23a7c3ea'/%3E%3C/linearGradient%3E%3Cfilter id='ps' x='-40%25' y='-40%25' width='180%25' height='180%25'%3E%3CfeGaussianBlur stdDeviation='2'/%3E%3C/filter%3E%3C/defs%3E%3C!-- ground shadow + a soft snow drift the tree stands in --%3E%3Cellipse cx='58' cy='273' rx='48' ry='8' fill='%23010509' opacity='.7'/%3E%3Cellipse cx='58' cy='268' rx='54' ry='9' fill='%23bcd6f5' opacity='.12'/%3E%3C!-- weather mast with an instrument cross-arm --%3E%3Cline x1='112' y1='58' x2='112' y2='268' stroke='%23091524' stroke-width='3'/%3E%3Cline x1='113.4' y1='58' x2='113.4' y2='268' stroke='%237ef7c4' stroke-opacity='.18' stroke-width='1'/%3E%3Cpath d='M112 78 L129 71 M112 94 L127 100 M112 68 L112 56' stroke='%23091524' stroke-width='2.4' stroke-linecap='round'/%3E%3Ccircle cx='112' cy='54' r='3.2' fill='%23ff8b7f' opacity='.7'/%3E%3Ccircle cx='112' cy='54' r='6' fill='%23ff8b7f' opacity='.2' filter='url(%23ps)'/%3E%3C!-- the pine trunk + tiered boughs, each with a lit right flank --%3E%3Crect x='53' y='248' width='11' height='26' fill='%23050c16'/%3E%3Cg fill='url(%23pn)'%3E%3Cpath d='M58 58 L34 118 L82 118 Z'/%3E%3Cpath d='M58 94 L28 158 L88 158 Z'/%3E%3Cpath d='M58 136 L22 206 L94 206 Z'/%3E%3Cpath d='M58 182 L16 258 L100 258 Z'/%3E%3C/g%3E%3C!-- shaded left half of each tier for form --%3E%3Cg fill='%23010509' opacity='.55'%3E%3Cpath d='M58 58 L34 118 L58 118 Z'/%3E%3Cpath d='M58 94 L28 158 L58 158 Z'/%3E%3Cpath d='M58 136 L22 206 L58 206 Z'/%3E%3Cpath d='M58 182 L16 258 L58 258 Z'/%3E%3C/g%3E%3C!-- SNOW LOAD sitting on each bough, drooping at the tips (volume + drips) --%3E%3Cg fill='url(%23sload)'%3E%3Cpath d='M58 58 L47 86 Q52 82 56 88 Q58 80 60 88 Q64 82 69 86 Z'/%3E%3Cpath d='M58 94 L43 128 Q50 122 55 130 Q58 120 61 130 Q66 122 73 128 Z'/%3E%3Cpath d='M58 136 L39 176 Q47 168 54 178 Q58 166 62 178 Q69 168 77 176 Z'/%3E%3Cpath d='M58 182 L35 224 Q45 214 53 226 Q58 212 63 226 Q71 214 81 224 Z'/%3E%3C/g%3E%3C!-- soft blue underside shadow beneath each snow shelf --%3E%3Cg fill='%238fb0d8' opacity='.35'%3E%3Cpath d='M49 86 Q58 90 67 86 L66 89 Q58 92 50 89 Z'/%3E%3Cpath d='M45 128 Q58 133 71 128 L70 131 Q58 136 46 131 Z'/%3E%3Cpath d='M41 176 Q58 182 75 176 L74 179 Q58 185 42 179 Z'/%3E%3Cpath d='M37 224 Q58 231 79 224 L78 228 Q58 235 38 228 Z'/%3E%3C/g%3E%3C!-- aurora-side rim light down the lit edge --%3E%3Cg fill='none' stroke='%237ef7c4' stroke-opacity='.34' stroke-width='1.4' stroke-linecap='round'%3E%3Cpath d='M58 58 L82 118'/%3E%3Cpath d='M58 136 L94 206'/%3E%3Cpath d='M58 182 L100 258'/%3E%3C/g%3E%3C!-- crisp white snow highlight on the sunniest tip --%3E%3Cpath d='M58 58 L62 70 L58 68 L54 70 Z' fill='%23ffffff' opacity='.8'/%3E%3C/svg%3E") center bottom / contain no-repeat;
}

/* ═══ SHOOTING STAR (meta#1::after, z-1): one rare meteor, upper-right,
   three steps() states once per ~34s, off-lane. Explicitly NOT a
   continuous mover (steps, no will-change). ═══ */
head meta:first-of-type::after {
  content: "";
  display: var(--aurora-scenery, block);
  position: fixed;
  top: 14vh;
  right: 12vw;
  width: 130px;
  height: 90px;
  z-index: -1;
  pointer-events: none;
  opacity: 0;
  background: linear-gradient(56deg, rgba(234, 243, 255, 0) 42%, rgba(234, 243, 255, 0.5) 68%, rgba(255, 255, 255, 0.95) 86%, rgba(234, 243, 255, 0) 100%) center / 100% 2px no-repeat;
  transform: rotate(0deg);
  animation: aurora-meteor 34s steps(1, end) infinite;
}

/* ═══ SECOND AURORA BAND (meta#2::before, z-2): a low green airglow arc
   hugging the horizon behind the mountains, its shimmer offset from the
   main curtains so the sky never pulses in lockstep. Coarse, soft, low
   alpha. STATIC geometry, promoted. ═══ */
head meta:last-of-type::before {
  content: "";
  display: var(--aurora-scenery, block);
  position: fixed;
  left: -10vw;
  right: -10vw;
  bottom: 26vh;
  height: 26vh;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background:
    radial-gradient(ellipse 60vw 14vh at 40% 100%, rgba(126, 247, 196, 0.09) 0%, rgba(126, 247, 196, 0) 72%),
    radial-gradient(ellipse 44vw 11vh at 72% 100%, rgba(88, 224, 232, 0.07) 0%, rgba(88, 224, 232, 0) 74%);
  animation: aurora-glow 9s steps(1, end) infinite;
}

/* ═══ starfield: the ONLY fine pattern, so it RIDES THE ROLL (zero motion
   relative to the tracked glyphs = zero flicker). z:-1 keeps it behind the
   names inside the roll's own stacking context. ═══ */
.credits-roll::before,
.credits-slideshow::before {
  content: "";
  display: var(--aurora-scenery, block);
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.5;
  background-image:
    /* COARSE soft aurora GLINTS (>=60px, soft falloff) — the sparkle layer.
       Legal L6 sparkle: it RIDES the roll (zero motion vs. the tracked glyphs),
       and each is a big soft glow, never a fine twinkle. Green/teal/violet gleams
       that drift up with the names like slow ember-lights caught in the sky. */
    radial-gradient(circle at 12% 34%, rgba(126, 247, 196, 0.34) 0 6px, rgba(126, 247, 196, 0.1) 34px, rgba(126, 247, 196, 0) 64px),
    radial-gradient(circle at 90% 20%, rgba(88, 224, 232, 0.3) 0 6px, rgba(88, 224, 232, 0.09) 32px, rgba(88, 224, 232, 0) 60px),
    radial-gradient(circle at 84% 78%, rgba(183, 156, 255, 0.28) 0 6px, rgba(183, 156, 255, 0.08) 34px, rgba(183, 156, 255, 0) 62px),
    radial-gradient(circle at 8% 88%, rgba(126, 247, 196, 0.26) 0 5px, rgba(126, 247, 196, 0.08) 30px, rgba(126, 247, 196, 0) 56px),
    /* the fine starfield (rides the roll = zero flicker) */
    radial-gradient(circle at 20% 26%, rgba(234, 243, 255, 0.9) 0 1px, rgba(234, 243, 255, 0) 2px),
    radial-gradient(circle at 74% 14%, rgba(200, 235, 240, 0.8) 0 1px, rgba(200, 235, 240, 0) 2px),
    radial-gradient(circle at 52% 64%, rgba(183, 156, 255, 0.55) 0 1px, rgba(183, 156, 255, 0) 2px),
    radial-gradient(circle at 10% 82%, rgba(234, 243, 255, 0.7) 0 1px, rgba(234, 243, 255, 0) 2px),
    radial-gradient(circle at 88% 56%, rgba(200, 235, 240, 0.6) 0 1px, rgba(200, 235, 240, 0) 2px);
  background-size: 760px 900px, 900px 820px, 820px 880px, 700px 840px, 300px 300px, 250px 250px, 360px 360px, 320px 320px, 280px 280px;
}

/* ═══ section titles: thin elegant Josefin Sans caps, wide tracking, with
   a subtle STATIC aurora gradient text fill (green->teal->violet). The base
   gold rule becomes a soft aurora hairline. Hue cycles down the roll so
   custom blocks (clip-of-the-night) inherit a coherent tint. ═══ */
.credits-block__title {
  font-family: var(--credits-title-font);
  font-weight: 600;
  letter-spacing: 0.34em;
  padding-left: 0.34em;
  text-transform: uppercase;
  color: var(--aurora-ice);
  background-image: linear-gradient(96deg, var(--aurora-green) 0%, var(--aurora-teal) 46%, var(--aurora-violet) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none;
  filter: drop-shadow(0 2px 10px rgba(2, 6, 14, 0.85)) drop-shadow(0 0 18px rgba(126, 247, 196, 0.22));
}
/* hue rotation per section — each block's gradient starts at a different
   angle so the ribbon reads differently down the roll (content-agnostic). */
.credits-block:nth-of-type(3n) .credits-block__title { background-image: linear-gradient(96deg, var(--aurora-teal) 0%, var(--aurora-violet) 52%, var(--aurora-green) 100%); }
.credits-block:nth-of-type(3n + 1) .credits-block__title { background-image: linear-gradient(96deg, var(--aurora-violet) 0%, var(--aurora-green) 50%, var(--aurora-teal) 100%); }
.credits-block__title::after {
  width: min(220px, 52vw);
  height: 2px;
  margin: 0.7rem auto 0;
  opacity: 1;
  background: linear-gradient(90deg, rgba(126, 247, 196, 0) 0%, rgba(126, 247, 196, 0.6) 24%, rgba(88, 224, 232, 0.7) 50%, rgba(183, 156, 255, 0.6) 76%, rgba(183, 156, 255, 0) 100%);
}

/* ═══ rows: the station watch log. Names are sacred — wrap, never clip.
   Cool snow-white with a faint ice glow; amounts in glacial teal behind
   a small aurora tick. ═══ */
.credit {
  max-width: min(42rem, 92vw);
  margin-inline: auto;
  min-width: 0;
  overflow-wrap: anywhere;
  font-weight: 400;
  letter-spacing: 0.03em;
  line-height: 1.55;
}
.credit__name {
  color: var(--aurora-snow);
  text-shadow: 0 0 16px rgba(88, 224, 232, 0.14), var(--credits-shadow);
}
.credit__amount {
  opacity: 1;
  font-size: 0.76em;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: var(--aurora-teal);
  font-variant-numeric: tabular-nums;
  text-shadow: 0 0 12px rgba(88, 224, 232, 0.22), var(--credits-shadow);
}
.credit__amount::before {
  content: "\\2744";
  font-size: 0.62em;
  color: rgba(126, 247, 196, 0.7);
  margin: 0 0.5em 0 0.7em;
  vertical-align: 0.14em;
}

/* ═══ flourish cards ═══ */
.flourish--intro { gap: 1.2rem; }
.flourish__title {
  font-family: var(--credits-title-font);
  font-weight: 600;
  letter-spacing: 0.12em;
  line-height: 1.12;
  color: var(--aurora-ice);
  background-image: linear-gradient(100deg, var(--aurora-green) 0%, var(--aurora-teal) 40%, var(--aurora-violet) 82%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none;
  filter: drop-shadow(0 2px 14px rgba(2, 6, 14, 0.9)) drop-shadow(0 0 26px rgba(126, 247, 196, 0.3));
}

/* badge -> the station ident (copy swap via font-size:0 + ::after) */
.flourish__badge { font-size: 0; border: 0; padding: 0; box-shadow: none; }
.flourish__badge::after {
  content: "STATION AURORA \\2022 69\\00B0 N";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 500;
  font-size: 0.8rem;
  letter-spacing: 0.4em;
  padding: 0.5rem 1rem 0.5rem 1.4rem;
  color: var(--aurora-green);
  border: 1px solid rgba(126, 247, 196, 0.4);
  border-radius: 2px;
  /* a static diagonal GLASS GLEAM sweeps across the ident card (specular sheen,
     always L6-safe: baked static on the prop) over a faint green tint */
  background:
    linear-gradient(108deg, rgba(255, 255, 255, 0) 30%, rgba(230, 255, 246, 0.16) 46%, rgba(255, 255, 255, 0) 58%),
    rgba(126, 247, 196, 0.05);
  box-shadow: 0 0 20px rgba(126, 247, 196, 0.12), inset 0 1px 0 rgba(230, 255, 246, 0.22);
  text-shadow: 0 0 10px rgba(126, 247, 196, 0.4);
}

/* tagline is streamer copy: restyle only — a quiet thin italic */
.flourish__tagline {
  font-family: var(--credits-font);
  font-style: italic;
  font-weight: 300;
  letter-spacing: 0.16em;
  padding-left: 0.16em;
  font-size: 1rem;
  color: rgba(207, 230, 255, 0.82);
}

/* rating -> the log stamp (copy swap): cold ice-blue, clipped card */
.flourish__rating { font-size: 0; border: 0; padding: 0; opacity: 1; }
.flourish__rating::after {
  content: "AURORA WATCH \\2022 CLEAR SKIES";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 500;
  font-size: 0.74rem;
  letter-spacing: 0.3em;
  padding: 0.42rem 0.8rem 0.42rem 1.1rem;
  color: var(--aurora-ice);
  border: 1px solid rgba(207, 230, 255, 0.35);
  border-radius: 3px;
  /* matching static glass gleam on the log stamp */
  background: linear-gradient(108deg, rgba(255, 255, 255, 0) 32%, rgba(224, 240, 255, 0.14) 48%, rgba(255, 255, 255, 0) 60%);
  box-shadow: inset 0 1px 0 rgba(224, 240, 255, 0.2);
  text-shadow: 0 0 10px rgba(88, 224, 232, 0.3);
}

/* a small coordinate line under the intro card, station log flavor */
.flourish--intro::after {
  content: "LAT 69.65 \\2022 LON 18.96 \\2022 KP 7 \\2022 -24\\00B0C";
  display: var(--aurora-scenery, block);
  font-family: var(--credits-font);
  font-weight: 400;
  font-size: 0.64rem;
  letter-spacing: 0.28em;
  padding-left: 0.28em;
  color: rgba(207, 230, 255, 0.42);
  font-variant-numeric: tabular-nums;
}

/* outro: THE LIGHTS FADE / stay warm out there (copy swap) */
.flourish--outro::before {
  content: "\\2744 \\2744 \\2744";
  display: var(--aurora-scenery, block);
  font-size: 0.72rem;
  letter-spacing: 0.7em;
  padding-left: 0.7em;
  color: rgba(126, 247, 196, 0.6);
}
.flourish--outro .flourish__title { font-size: 0; }
.flourish--outro .flourish__title::after {
  content: "THE LIGHTS FADE";
  display: inline-block;
  font-family: var(--credits-title-font);
  font-weight: 600;
  font-size: var(--credits-flourish-title-size);
  letter-spacing: 0.1em;
  line-height: 1.12;
  background-image: linear-gradient(100deg, var(--aurora-green) 0%, var(--aurora-teal) 44%, var(--aurora-violet) 88%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 14px rgba(2, 6, 14, 0.9)) drop-shadow(0 0 22px rgba(126, 247, 196, 0.26));
}
.flourish--outro .flourish__tagline { font-size: 0; }
.flourish--outro .flourish__tagline::after {
  content: "stay warm out there";
  font-family: var(--credits-font);
  font-style: italic;
  font-weight: 300;
  font-size: 1rem;
  letter-spacing: 0.18em;
  padding-left: 0.18em;
  color: rgba(207, 230, 255, 0.72);
}

/* ═══ raid finale: THE SUBSTORM. The sky flares — a green/violet corona
   wash blooms behind the block, the title burns brighter, and the eyebrow
   announces the substorm. The pulse rides a pseudo-element (::before) so
   only the WASH breathes — the block and its names stay at full opacity,
   never dimming. steps() at ~1.4 paints/s — the only animation inside the
   roll (L5 ceiling 2/s). Declared after the hue-cycle so it wins. ═══ */
.credits-block:nth-last-of-type(2),
.credits-slide:nth-last-of-type(2):not(.flourish) {
  position: relative;
}
/* scroll: a corona halo that dies inside the block box (no hard edges).
   The wash lives on ::before (behind the content via z-index) and is the
   only thing that pulses — the text above it holds steady. */
.credits-block:nth-last-of-type(2)::before {
  content: "";
  display: block;
  position: absolute;
  inset: -1.5rem -8% -1rem;
  z-index: -1;
  pointer-events: none;
  background: radial-gradient(ellipse 60% 62% at 50% 40%, rgba(126, 247, 196, 0.16), rgba(183, 156, 255, 0.06) 54%, rgba(126, 247, 196, 0) 76%);
  animation: aurora-substorm 4.2s steps(1, end) infinite;
}
/* slideshow: the slide IS the viewport, so the whole sky flares */
.credits-slide:nth-last-of-type(2):not(.flourish)::before {
  content: "";
  display: block;
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: radial-gradient(ellipse 66% 60% at 50% 44%, rgba(126, 247, 196, 0.14), rgba(183, 156, 255, 0.06) 60%, rgba(126, 247, 196, 0) 82%);
  animation: aurora-substorm 4.2s steps(1, end) infinite;
}
.credits-block:nth-last-of-type(2) .credits-block__title,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
  background-image: linear-gradient(96deg, var(--aurora-green) 0%, #d8fff0 50%, var(--aurora-violet) 100%);
  filter: drop-shadow(0 2px 10px rgba(2, 6, 14, 0.85)) drop-shadow(0 0 26px rgba(126, 247, 196, 0.5));
}
.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  content: "\\2726 SUBSTORM \\2022 CORONA OVERHEAD \\2726";
  display: block;
  font-family: var(--credits-font);
  font-weight: 600;
  font-size: 0.72rem;
  letter-spacing: 0.36em;
  padding-left: 0.36em;
  margin-bottom: 0.8rem;
  -webkit-text-fill-color: initial;
  color: var(--aurora-violet);
  text-shadow: 0 0 14px rgba(183, 156, 255, 0.5), var(--credits-shadow);
}
.credits-block:nth-last-of-type(2) .credit,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit {
  font-size: calc(var(--credits-name-size) * 1.1);
}
.credits-block:nth-last-of-type(2) .credit__name,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__name {
  text-shadow: 0 0 20px rgba(126, 247, 196, 0.4), var(--credits-shadow);
}

/* ═══ slideshow: each slide settles like the sky clearing ═══ */
.credits-slide {
  transform: scale(1.015);
  transition: opacity 0.9s ease, transform 1.1s cubic-bezier(0.22, 1, 0.36, 1);
}
.credits-slide.is-active { transform: scale(1); }

/* ═══ keyframes (all aurora- prefixed; transform/opacity ONLY) ═══ */
/* curtain shimmer: the three drapes breathe on discrete opacity postures,
   ~1 hop / 2s (far under the 5/s cap) — the sky rippling, never a strobe.
   All transform/opacity: we shift the whole layer a hair and dip opacity. */
@keyframes aurora-drape {
  0%,  24% { opacity: 1;    transform: translate3d(0, 0, 0); }
  25%, 49% { opacity: 0.82; transform: translate3d(-0.8vw, 0, 0); }
  50%, 74% { opacity: 0.92; transform: translate3d(0.4vw, 0, 0); }
  75%, 99% { opacity: 0.78; transform: translate3d(1vw, 0, 0); }
  100%     { opacity: 1;    transform: translate3d(0, 0, 0); }
}
/* the horizon airglow breathes on its own offset cadence */
@keyframes aurora-glow {
  0%,  32% { opacity: 0.9; }
  33%, 65% { opacity: 0.65; }
  66%, 99% { opacity: 1; }
  100%     { opacity: 0.9; }
}
/* snowfall: eight discrete drift positions over 26s = ~1 hop / 3.25s. The
   layer holds a cached texture between hops (steps(1)); it drifts down and
   sideways and loops seamlessly (the flakes tile). */
@keyframes aurora-snow {
  0%   { transform: translate3d(0, 0, 0); }
  12%  { transform: translate3d(-0.6vw, 5vh, 0); }
  25%  { transform: translate3d(0.4vw, 11vh, 0); }
  37%  { transform: translate3d(-0.4vw, 17vh, 0); }
  50%  { transform: translate3d(0.6vw, 23vh, 0); }
  62%  { transform: translate3d(-0.5vw, 29vh, 0); }
  75%  { transform: translate3d(0.4vw, 35vh, 0); }
  87%  { transform: translate3d(-0.3vw, 41vh, 0); }
  100% { transform: translate3d(0, 46vh, 0); }
}
/* meteor: dark for 88% of the cycle, then three quick steps down the sky
   (one every ~0.9s), then gone — a single fall once per 34s */
@keyframes aurora-meteor {
  0%, 88%  { opacity: 0; transform: translate3d(0, 0, 0) rotate(0deg); }
  89%      { opacity: 0.9; transform: translate3d(0, 0, 0) rotate(0deg); }
  92%      { opacity: 0.85; transform: translate3d(-5vw, 4vh, 0) rotate(0deg); }
  95%      { opacity: 0.6; transform: translate3d(-10vw, 8vh, 0) rotate(0deg); }
  97%      { opacity: 0; transform: translate3d(-13vw, 11vh, 0) rotate(0deg); }
  100%     { opacity: 0; transform: translate3d(0, 0, 0) rotate(0deg); }
}
/* finale substorm: 4 discrete brightness stops per 4.2s = ~1.4 paints/s
   (L5 ceiling 2/s) — the corona pulsing overhead, not a blink */
@keyframes aurora-substorm {
  0%, 46%  { opacity: 1; }
  52%, 66% { opacity: 0.72; }
  72%, 86% { opacity: 1; }
  90%, 96% { opacity: 0.85; }
  100%     { opacity: 1; }
}

/* ═══ reduced motion: the night holds still — the curtains park at full
   opacity, the snow parks mid-fall, the airglow holds bright, the meteor
   stays dark, the substorm rests, slides fall back to the base fade. ═══ */
@media (prefers-reduced-motion: reduce) {
  html::after { animation: none; opacity: 1; transform: translateZ(0); }
  head::after { animation: none; transform: translate3d(0, 20vh, 0); }
  head meta:last-of-type::before { animation: none; opacity: 0.9; }
  head meta:first-of-type::after { animation: none; opacity: 0; }
  .credits-block:nth-last-of-type(2)::before,
  .credits-slide:nth-last-of-type(2):not(.flourish)::before { animation: none; opacity: 1; }
  .credits-slide { transform: none; transition: opacity 0.8s ease; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--aurora-scenery:none;}",
};
