import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. Blue Plate: a 50s roadside diner at two minutes to midnight — teal walls, red vinyl stools on a checkerboard floor, pink neon humming OPEN 24H, and the credits typed up as tonight's menu with dot leaders running out to the prices. Raids ride the last card as a mint guest check: ON THE HOUSE. */
export const VARIANT: ThemeVariant = {
  key: "diner",
  name: "Blue Plate",
  css: `
/* ================================================================
   BLUE PLATE — layered after the base theme.
   Fiction: a roadside diner, 11:58 PM. Teal enamel walls, a red
   laminate counter with a chrome lip, checkerboard floor. The
   pendants pour two warm pools of light; the window sign hums
   OPEN 24h in pink neon; a slice of cherry pie and a fresh cup
   sit at the far end of the counter, still steaming. The credits
   are tonight's MENU: cream card-stock panels riding the roll,
   every section a red enamel header board, every name a typed
   menu item with a dot leader running out to its price. The raid
   block is the mint GUEST CHECK — stamped on the house.
   Layer map (all scenery kill-switched via --diner-scenery):
     html bg (--credits-bg)   cheap 1-linear room: teal wall, red
                              counter front, dark floor
     html::before             LIGHT STORY — two pendant pools, wall
                              sheen, chrome wainscot band + counter
                              lip, floor falloff, vignette. STATIC,
                              promoted
     html::after              TWO STOOLS — chrome pedestals, red
                              vinyl seats, rim light, cast shadows
                              (one SVG, near+far). STATIC, promoted
     title::before            TWO PENDANT LAMPS — enamel teal domes at
                              22%/78%, glowing bulbs + soft light cones
                              (the light SOURCE). STATIC, promoted
     head::before             the neon sign: Pacifico CSS text in a
                              teal tube frame, pink glow, steps(1)
                              buzz (~0.4 paints/s, small box)
     head::after              PIE + COFFEE on the counter — cherry
                              slice, teal-stripe mug, saucer, cast
                              shadows. STATIC, promoted
     meta#1::before           checkerboard floor — coarse cells,
                              perspective rotateX, far edge fades to
                              dark before cells get fine. STATIC
     meta#1::after            counter set: chrome napkin dispenser,
                              ketchup + mustard squeeze bottles.
                              STATIC, promoted
     meta#2::before           chrome wall clock reading 11:58, glass
                              highlight. STATIC, promoted
     meta#2::after            coffee steam — the ONLY continuous
                              mover (small, will-change budget: 1)
     body::before             griddle haze — 3 huge soft warm blobs,
                              steps(1), one hop per 5s
     body::after              center-lane readability scrim. STATIC
     .credits-roll::before    formica starburst sparkles — the only
     .credits-slideshow::before  fine pattern, so it RIDES THE ROLL
   ================================================================ */
@import url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Pacifico&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap');

:root {
  /* ── palette: the diner ── */
  --diner-scenery: block; /* set to none to strip every scenery layer */
  --diner-red: #c8372a;
  --diner-red-deep: #8e1f16;
  --diner-teal: #1f7d80;
  --diner-cream: #f7eed9;
  --diner-ink: #3b2a1c;
  --diner-mustard: #e8b45a;
  --diner-neon: #ff5f7a;

  /* ── base hooks ── */
  /* Cheap room: ONE linear gradient — teal wall down to the counter
     seam, red laminate front, dark floor under the checker (L3: the
     detailed light lives on the promoted html::before). */
  --credits-bg: linear-gradient(180deg,
    #082326 0%, #0e3a3e 22%, #135054 46%, #114448 60%,
    #0a2f33 65.4%, #071e21 66%,
    #8c2718 66%, #6f1c10 78%, #4a1108 85.6%,
    #101d22 86%, #0a1418 96%, #070f13 100%);
  --credits-color: var(--diner-cream);
  --credits-accent: var(--diner-red);
  --credits-font: "Courier Prime", "Courier New", Courier, monospace;
  --credits-title-font: "Alfa Slab One", "Rockwell", "Arial Black", serif;
  --credits-title-size: clamp(1.25rem, 2.9vw, 1.85rem);
  --credits-name-size: clamp(1rem, 2.3vw, 1.34rem);
  --credits-flourish-title-size: clamp(2.4rem, 7.4vw, 4.7rem);
  --credits-block-gap: 5rem;
  --credits-name-gap: 0.55rem;
  --credits-shadow: 0 2px 10px rgba(3, 10, 12, 0.75);
  /* glow no-op — never "none" (a "none" in the composed shadow list
     invalidates the whole declaration); Blue Plate glows are bespoke. */
  --credits-glow: 0 0 0 rgba(0, 0, 0, 0);
}

/* Scenery is full-bleed: drop the base edge-fade on html ONLY; body keeps
   the base mask so the menu cards ease in at the floor and out at the top. */
html { -webkit-mask-image: none; mask-image: none; }
body { background: transparent; }

/* ═══ THE LIGHT STORY — one static promoted layer (L3). Two warm pendant
   pools spill from above; the wall breathes a soft teal sheen between
   them; a chrome wainscot band divides wall from counter, the counter
   lip catches a warm reflection under the pie; the floor falls away and
   the corners vignette. Everything huge and soft — nothing can flicker.
   Also carries the ROOM MATERIAL: a boomerang laminate print on the red
   counter front and a subtle enamel-tile seam grid on the teal wall —
   both COARSE (>40px cells) and confined to bands well outside the
   center text lane, so L6 (flicker) is safe. */
html::before {
  content: "";
  display: var(--diner-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* corner vignette — night presses in at the edges */
    radial-gradient(ellipse 140% 120% at 50% 40%, rgba(2, 8, 10, 0) 56%, rgba(2, 8, 10, 0.5) 100%),
    /* pendant halos: two warm blooms pooling around the lit bulbs (the
       crisp light cones themselves live on the pendant SVG layer) */
    radial-gradient(ellipse 20vw 20vh at 22% 16vh, rgba(255, 220, 158, 0.22), rgba(255, 220, 158, 0) 70%),
    radial-gradient(ellipse 20vw 20vh at 78% 16vh, rgba(255, 220, 158, 0.19), rgba(255, 220, 158, 0) 70%),
    /* enamel wall panel seams: four faint vertical joints break the flat
       teal into riveted enamel panels (cheap 2px gradient bands, only in
       the wall region above the wainscot — no tiling, cannot flicker) */
    linear-gradient(90deg, rgba(200, 240, 236, 0) calc(20% - 1px), rgba(200, 240, 236, 0.06) 20%, rgba(6, 22, 25, 0.1) calc(20% + 1px), rgba(6, 22, 25, 0) calc(20% + 2px)) 0 0 / 100% 62vh no-repeat,
    linear-gradient(90deg, rgba(200, 240, 236, 0) calc(40% - 1px), rgba(200, 240, 236, 0.06) 40%, rgba(6, 22, 25, 0.1) calc(40% + 1px), rgba(6, 22, 25, 0) calc(40% + 2px)) 0 0 / 100% 62vh no-repeat,
    linear-gradient(90deg, rgba(200, 240, 236, 0) calc(60% - 1px), rgba(200, 240, 236, 0.06) 60%, rgba(6, 22, 25, 0.1) calc(60% + 1px), rgba(6, 22, 25, 0) calc(60% + 2px)) 0 0 / 100% 62vh no-repeat,
    linear-gradient(90deg, rgba(200, 240, 236, 0) calc(80% - 1px), rgba(200, 240, 236, 0.06) 80%, rgba(6, 22, 25, 0.1) calc(80% + 1px), rgba(6, 22, 25, 0) calc(80% + 2px)) 0 0 / 100% 62vh no-repeat,
    /* teal wall sheen where the light grazes the enamel */
    radial-gradient(ellipse 60vw 26vh at 50% 30%, rgba(140, 220, 216, 0.05), rgba(140, 220, 216, 0) 74%),
    /* lower warm wall-glow pools — the pendant light spills down the enamel
       and warms the mid-wall (kills the flat dead zone between cards + counter) */
    radial-gradient(ellipse 15vw 26vh at 22% 50vh, rgba(255, 214, 150, 0.09), rgba(255, 214, 150, 0) 72%),
    radial-gradient(ellipse 15vw 26vh at 78% 50vh, rgba(255, 214, 150, 0.08), rgba(255, 214, 150, 0) 72%),
    /* chrome wainscot band where wall meets counter back */
    linear-gradient(180deg, rgba(226, 244, 248, 0) 0%, rgba(226, 244, 248, 0.28) 30%, rgba(150, 182, 190, 0.22) 52%, rgba(16, 36, 42, 0.42) 80%, rgba(226, 244, 248, 0) 100%) 0 64.4vh / 100% 2.4vh no-repeat,
    /* warm counter-lip reflection under the pendants */
    linear-gradient(180deg, rgba(255, 206, 140, 0.16), rgba(255, 206, 140, 0)) 0 66.2vh / 100% 10px no-repeat,
    /* red laminate sheen: broad, soft */
    radial-gradient(ellipse 44vw 14vh at 72% 74vh, rgba(255, 150, 110, 0.08), rgba(255, 150, 110, 0) 74%),
    /* the floor eases into shadow behind the counter — a soft ramp (not a
       hard band) so the stool bases don't sit on a fake shelf edge */
    linear-gradient(180deg, rgba(4, 9, 12, 0) 0%, rgba(4, 9, 12, 0.28) 55%, rgba(4, 9, 12, 0.4) 100%) 0 80vh / 100% 20vh no-repeat;
}

/* ═══ TWO STOOLS — chrome pedestals, red vinyl tops, planted on the
   checker at lower-left; the far one sits higher and smaller. One SVG,
   warm rim light off the pendants, cast shadows pooling on the tile.
   STATIC, promoted. */
html::after {
  content: "";
  display: var(--diner-scenery, block);
  position: fixed;
  left: 2.5vw;
  bottom: 1.5vh;
  width: 350px;
  height: 340px;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: contain;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 340 330'%3E%3Cdefs%3E%3C!-- chrome column: vertical brushed steel --%3E%3ClinearGradient id='c' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%231c2b31'/%3E%3Cstop offset='.28' stop-color='%238ea3aa'/%3E%3Cstop offset='.44' stop-color='%23eaf5f7'/%3E%3Cstop offset='.56' stop-color='%23c2d3d7'/%3E%3Cstop offset='.72' stop-color='%236d838a'/%3E%3Cstop offset='1' stop-color='%2316232a'/%3E%3C/linearGradient%3E%3C!-- base chrome (foot) --%3E%3ClinearGradient id='cb' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%231a282e'/%3E%3Cstop offset='.4' stop-color='%23d0e0e4'/%3E%3Cstop offset='.6' stop-color='%2394aab0'/%3E%3Cstop offset='1' stop-color='%2316232a'/%3E%3C/linearGradient%3E%3C!-- red vinyl top: glossy, domed --%3E%3CradialGradient id='t' cx='40%25' cy='26%25' r='80%25'%3E%3Cstop offset='0' stop-color='%23f47a5f'/%3E%3Cstop offset='.3' stop-color='%23d84a30'/%3E%3Cstop offset='.62' stop-color='%23b2301e'/%3E%3Cstop offset='1' stop-color='%237a160b'/%3E%3C/radialGradient%3E%3C!-- vinyl side band --%3E%3ClinearGradient id='v' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23c73c26'/%3E%3Cstop offset='.5' stop-color='%239e2416'/%3E%3Cstop offset='1' stop-color='%2363100a'/%3E%3C/linearGradient%3E%3C!-- chrome trim ring under the cushion --%3E%3ClinearGradient id='ring' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23eaf5f7'/%3E%3Cstop offset='.5' stop-color='%239db2b8'/%3E%3Cstop offset='1' stop-color='%233a4a50'/%3E%3C/linearGradient%3E%3Cg id='s'%3E%3C!-- cast shadow on tile: a broad soft pool stretched away from the pendant light, plus a tight dark contact patch at the foot so the stool is planted, not floating --%3E%3Cellipse cx='118' cy='312' rx='94' ry='15' fill='%2304090c' opacity='.34'/%3E%3Cellipse cx='108' cy='309' rx='62' ry='9' fill='%2302070a' opacity='.5'/%3E%3Cellipse cx='100' cy='306' rx='34' ry='5' fill='%2301060a' opacity='.6'/%3E%3C!-- foot base: flared chrome disc --%3E%3Cpath d='M60 305 L140 305 L124 283 L76 283 Z' fill='url(%23cb)'/%3E%3Cpath d='M60 305 L140 305 L124 283 L76 283 Z' fill='%230a1418' opacity='.28'/%3E%3Cellipse cx='100' cy='305' rx='40' ry='5' fill='%231a282e' opacity='.6'/%3E%3Cellipse cx='100' cy='283' rx='24' ry='4' fill='url(%23cb)'/%3E%3C!-- column --%3E%3Crect x='91' y='196' width='18' height='90' rx='6' fill='url(%23c)'/%3E%3C!-- column top collar --%3E%3Cellipse cx='100' cy='196' rx='30' ry='6' fill='%231a282e'/%3E%3Cellipse cx='100' cy='194' rx='30' ry='6' fill='url(%23ring)'/%3E%3C!-- chrome trim ring under cushion --%3E%3Crect x='50' y='185' width='100' height='9' rx='4.5' fill='url(%23ring)'/%3E%3Cellipse cx='100' cy='185' rx='50' ry='7' fill='url(%23ring)'/%3E%3C!-- vinyl side band (the cushion depth) with piped welt at the base --%3E%3Cpath d='M50 182 L50 172 q0 -10 50 -10 q50 0 50 10 L150 182 q0 10 -50 10 q-50 0 -50 -10 Z' fill='url(%23v)'/%3E%3Cpath d='M52 184 q48 11 96 0' stroke='%2363100a' stroke-width='2.4' fill='none' opacity='.7'/%3E%3Cpath d='M52 183 q48 10 96 0' stroke='%23d8563c' stroke-width='1' fill='none' opacity='.5'/%3E%3C!-- vinyl domed top --%3E%3Cellipse cx='100' cy='167' rx='50' ry='14' fill='url(%23t)'/%3E%3C!-- tufting: a ring of six shallow dimples pulled toward the center button --%3E%3Cg fill='%237a160b' opacity='.4'%3E%3Cellipse cx='72' cy='166' rx='2.6' ry='1.5'/%3E%3Cellipse cx='128' cy='166' rx='2.6' ry='1.5'/%3E%3Cellipse cx='86' cy='159' rx='2.4' ry='1.3'/%3E%3Cellipse cx='114' cy='159' rx='2.4' ry='1.3'/%3E%3Cellipse cx='86' cy='174' rx='2.4' ry='1.3'/%3E%3Cellipse cx='114' cy='174' rx='2.4' ry='1.3'/%3E%3C/g%3E%3C!-- faint seams radiating from each dimple to the center button --%3E%3Cg stroke='%237a160b' stroke-width='.8' opacity='.28' fill='none'%3E%3Cpath d='M72 166 Q86 166 100 166'/%3E%3Cpath d='M128 166 Q114 166 100 166'/%3E%3Cpath d='M86 159 Q93 162 100 166'/%3E%3Cpath d='M114 159 Q107 162 100 166'/%3E%3C/g%3E%3C!-- piped seam ring (tufted edge) --%3E%3Cellipse cx='100' cy='167' rx='42' ry='11' fill='none' stroke='%237a160b' stroke-width='2' opacity='.5'/%3E%3Cellipse cx='100' cy='166' rx='42' ry='11' fill='none' stroke='%23e8674a' stroke-width='.8' opacity='.4'/%3E%3C!-- center button tuft (dimpled, with its own tiny shade) --%3E%3Cellipse cx='100' cy='166.5' rx='5.5' ry='2.8' fill='%236a1109'/%3E%3Cellipse cx='100' cy='166' rx='3.4' ry='1.6' fill='%238a1c10'/%3E%3C!-- broad glossy specular sweeping the dome (vinyl sheen) --%3E%3Cellipse cx='84' cy='160' rx='22' ry='6.5' fill='%23ffcdb8' opacity='.5' transform='rotate(-9 84 160)'/%3E%3Cellipse cx='78' cy='158' rx='9' ry='3' fill='%23fff2ea' opacity='.7'/%3E%3C!-- small hot glint --%3E%3Cellipse cx='72' cy='157' rx='3.5' ry='1.4' fill='%23ffffff' opacity='.75'/%3E%3C!-- warm rim light on the far cushion edge (from the pendants) --%3E%3Cpath d='M56 171 Q100 154 144 171' stroke='%23ffcdbb' stroke-width='2' fill='none' opacity='.5' stroke-linecap='round'/%3E%3C!-- column vertical highlight --%3E%3Crect x='96' y='200' width='3' height='82' rx='1.5' fill='%23eaf5f7' opacity='.55'/%3E%3C/g%3E%3C/defs%3E%3Cuse href='%23s' transform='translate(150 12) scale(.74)'/%3E%3Cuse href='%23s'/%3E%3C/svg%3E");
}

/* ═══ TWO PENDANT LAMPS — the source of the light story. Enamel teal domes
   hung over the counter at 22%/78%, glowing warm bulbs, chrome canopies,
   soft downward cones that meet the pendant pools on html::before. Full-
   bleed fixed layer riding the <title> element (void-element trick). The
   viewBox maps the lamps to the same 22%/78% as the pools. STATIC. */
head title { display: var(--diner-scenery, block); }
head title::before {
  content: "";
  display: var(--diner-scenery, block);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60vh;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% auto;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 620' preserveAspectRatio='xMidYMin slice'%3E%3Cdefs%3E%3CradialGradient id='shade' cx='42%25' cy='26%25' r='82%25'%3E%3Cstop offset='0' stop-color='%2342acac'/%3E%3Cstop offset='.45' stop-color='%231f7d80'/%3E%3Cstop offset='1' stop-color='%230c4145'/%3E%3C/radialGradient%3E%3CradialGradient id='bulb' cx='50%25' cy='55%25' r='62%25'%3E%3Cstop offset='0' stop-color='%23fff6e0'/%3E%3Cstop offset='.4' stop-color='%23ffd991'/%3E%3Cstop offset='1' stop-color='%23ffb14e' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='cone' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23ffe3ab' stop-opacity='.26'/%3E%3Cstop offset='.55' stop-color='%23ffe0a2' stop-opacity='.09'/%3E%3Cstop offset='1' stop-color='%23ffe3ab' stop-opacity='0'/%3E%3C/linearGradient%3E%3Cfilter id='soft' x='-40%25' y='-20%25' width='180%25' height='140%25'%3E%3CfeGaussianBlur stdDeviation='16'/%3E%3C/filter%3E%3Cg id='pend'%3E%3C!-- volumetric downward light cone, now reaching the counter (edges feathered) --%3E%3Cpath d='M-24 98 L-176 540 L176 540 L24 98 Z' fill='url(%23cone)' filter='url(%23soft)'/%3E%3C!-- brighter inner core of the cone --%3E%3Cpath d='M-12 100 L-70 430 L70 430 L12 100 Z' fill='url(%23cone)' filter='url(%23soft)' opacity='.7'/%3E%3C!-- warm pool where the cone lands on the counter --%3E%3Cellipse cx='0' cy='534' rx='150' ry='30' fill='url(%23bulb)' opacity='.5' filter='url(%23soft)'/%3E%3C!-- cord --%3E%3Crect x='-2.5' y='0' width='5' height='58' fill='%230a2124'/%3E%3C!-- chrome canopy fitting --%3E%3Cpath d='M-9 58 L9 58 L6 70 L-6 70 Z' fill='%239fb2b6'/%3E%3Cpath d='M-9 58 L9 58 L6 70 L-6 70 Z' fill='%230a2124' opacity='.2'/%3E%3C!-- dome shade --%3E%3Cpath d='M-52 96 Q-50 56 0 54 Q50 56 52 96 Q0 106 -52 96 Z' fill='url(%23shade)'/%3E%3C!-- shade top rim highlight --%3E%3Cpath d='M-44 74 Q0 58 44 74' stroke='%238ad6d4' stroke-width='2.4' opacity='.6' fill='none' stroke-linecap='round'/%3E%3C!-- shade under-lip --%3E%3Cellipse cx='0' cy='96' rx='52' ry='10' fill='%230c4145'/%3E%3C!-- glowing bulb --%3E%3Cellipse cx='0' cy='96' rx='34' ry='9' fill='url(%23bulb)'/%3E%3Cellipse cx='0' cy='95' rx='9' ry='4' fill='%23fffbf0'/%3E%3C/g%3E%3C/defs%3E%3Cuse href='%23pend' transform='translate(220 0)'/%3E%3Cuse href='%23pend' transform='translate(780 0)'/%3E%3C/svg%3E");
}

/* ═══ the boomerang laminate — the atomic-age counter-front print. A
   coarse ~130px cream motif tiled across ONLY the red counter band
   (fixed strip from the counter lip down to the floor), so it reads as
   patterned formica without ever crossing the center text lane. L6-safe:
   coarse, low-alpha, edge-confined. STATIC, rides <title> (void trick). */
head title::after {
  content: "";
  display: var(--diner-scenery, block);
  position: fixed;
  left: 0;
  right: 0;
  top: 66.4vh;
  height: 19.6vh;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 132 132'%3E%3Cg fill='none' stroke='%23f7e0c6' stroke-width='2.2' stroke-linecap='round' opacity='.13'%3E%3Cpath d='M16 34 q20 -13 37 3 q11 10 0 20 q-8 7 -15 -1 q-4 -6 4 -11'/%3E%3Cpath d='M82 84 q20 -13 37 3 q11 10 0 20 q-8 7 -15 -1 q-4 -6 4 -11'/%3E%3C/g%3E%3Cg fill='%23f7e0c6' opacity='.1'%3E%3Ccircle cx='104' cy='28' r='2'/%3E%3Ccircle cx='34' cy='100' r='2'/%3E%3Ccircle cx='70' cy='60' r='1.5'/%3E%3Ccircle cx='120' cy='112' r='1.4'/%3E%3C/g%3E%3C/svg%3E");
  background-size: 132px 132px;
  background-repeat: repeat;
  /* soft mask so the laminate fades at the lip and into the floor shadow */
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 22%, #000 74%, transparent 100%);
  mask-image: linear-gradient(180deg, transparent 0%, #000 22%, #000 74%, transparent 100%);
}

/* ═══ the neon sign: OPEN 24h in the window, top-right. CSS text in
   Pacifico — pink tubes, hot white core, a teal tube frame around it.
   A small box, so the steps(1) buzz (~0.4 paints/s) is cheap. */
head { display: var(--diner-scenery, block); }
head::before {
  content: "Open 24h";
  display: var(--diner-scenery, block);
  position: fixed;
  top: 5.5vh;
  right: 3.5vw;
  z-index: 0;
  pointer-events: none;
  padding: 0.3em 0.65em 0.42em;
  font-family: "Pacifico", "Brush Script MT", "Segoe Script", cursive;
  font-size: clamp(1.9rem, 3.2vw, 2.9rem);
  line-height: 1.15;
  color: #ffeef2;
  text-shadow:
    0 0 3px rgba(255, 255, 255, 0.8),
    0 0 12px rgba(255, 95, 122, 0.85),
    0 0 30px rgba(255, 61, 104, 0.55),
    0 0 60px rgba(255, 61, 104, 0.3);
  background: rgba(5, 18, 21, 0.5);
  /* the tube frame reads as a LIT glass tube: bright cyan core + layered
     halo (outer bloom, inner spill) rather than a flat line */
  border: 2.5px solid rgba(158, 240, 234, 0.92);
  border-radius: 16px;
  box-shadow:
    0 0 4px rgba(190, 250, 244, 0.7),
    0 0 16px rgba(84, 214, 208, 0.55),
    0 0 34px rgba(84, 200, 196, 0.32),
    inset 0 0 10px rgba(120, 226, 220, 0.3),
    inset 0 0 22px rgba(84, 200, 196, 0.16),
    0 10px 30px rgba(3, 10, 12, 0.5);
  transform: rotate(-2.5deg) translateZ(0);
  animation: diner-neon 11s steps(1, end) infinite;
}

/* ═══ PIE + COFFEE — the still life at the end of the counter, right
   side, bottoms planted on the counter lip. A generous cherry slice with
   a woven LATTICE top, glossy translucent filling and bulging syrup-glazed
   cherries; a diner mug of black coffee with a crema ring, both on
   cream stoneware with warm rim light + ambient-occlusion contact shadows.
   STATIC, promoted. */
head::after {
  content: "";
  display: var(--diner-scenery, block);
  position: fixed;
  right: 4vw;
  bottom: 32vh;
  width: 380px;
  height: 250px;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: contain;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 380 250'%3E%3Cdefs%3E%3ClinearGradient id='p' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23fdf8ec'/%3E%3Cstop offset='.6' stop-color='%23eaddc2'/%3E%3Cstop offset='1' stop-color='%23c3b593'/%3E%3C/linearGradient%3E%3ClinearGradient id='lid' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23f6cd83'/%3E%3Cstop offset='.4' stop-color='%23dd9f47'/%3E%3Cstop offset='.75' stop-color='%23bc7a30'/%3E%3Cstop offset='1' stop-color='%238f5620'/%3E%3C/linearGradient%3E%3CradialGradient id='latg' cx='40%25' cy='30%25' r='80%25'%3E%3Cstop offset='0' stop-color='%23f9d189'/%3E%3Cstop offset='.55' stop-color='%23d99a44'/%3E%3Cstop offset='1' stop-color='%23a86a29'/%3E%3C/radialGradient%3E%3ClinearGradient id='fill' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23c22832'/%3E%3Cstop offset='.45' stop-color='%238f171d'/%3E%3Cstop offset='1' stop-color='%23480a0d'/%3E%3C/linearGradient%3E%3ClinearGradient id='bcrust' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23e6b565'/%3E%3Cstop offset='.5' stop-color='%23b9803c'/%3E%3Cstop offset='1' stop-color='%23744a21'/%3E%3C/linearGradient%3E%3CradialGradient id='cherry' cx='34%25' cy='26%25' r='78%25'%3E%3Cstop offset='0' stop-color='%23f0636a'/%3E%3Cstop offset='.32' stop-color='%23c22832'/%3E%3Cstop offset='.7' stop-color='%23891419'/%3E%3Cstop offset='1' stop-color='%234c090c'/%3E%3C/radialGradient%3E%3ClinearGradient id='mug' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23b7bfbe'/%3E%3Cstop offset='.16' stop-color='%23fffdf6'/%3E%3Cstop offset='.42' stop-color='%23f3ecdb'/%3E%3Cstop offset='.7' stop-color='%23d9cdb2'/%3E%3Cstop offset='1' stop-color='%238f8067'/%3E%3C/linearGradient%3E%3CradialGradient id='coffee' cx='40%25' cy='32%25' r='72%25'%3E%3Cstop offset='0' stop-color='%236b4020'/%3E%3Cstop offset='.42' stop-color='%233c2410'/%3E%3Cstop offset='1' stop-color='%23180c05'/%3E%3C/radialGradient%3E%3CradialGradient id='crema' cx='50%25' cy='50%25' r='55%25'%3E%3Cstop offset='0' stop-color='%23b98a52' stop-opacity='0'/%3E%3Cstop offset='.72' stop-color='%23b98a52' stop-opacity='0'/%3E%3Cstop offset='.9' stop-color='%23caa066' stop-opacity='.55'/%3E%3Cstop offset='1' stop-color='%23d8b478' stop-opacity='.8'/%3E%3C/radialGradient%3E%3CradialGradient id='latg2' cx='38%25' cy='24%25' r='86%25'%3E%3Cstop offset='0' stop-color='%23ffe6a6'/%3E%3Cstop offset='.5' stop-color='%23e2a84e'/%3E%3Cstop offset='1' stop-color='%23a86a29'/%3E%3C/radialGradient%3E%3C/defs%3E%3C!-- ===== PLATE + PIE (left) ===== --%3E%3C!-- ambient-occlusion contact shadow pooled under the plate --%3E%3Cellipse cx='126' cy='216' rx='116' ry='18' fill='%23030809' opacity='.52'/%3E%3Cellipse cx='126' cy='211' rx='100' ry='14' fill='%23050d10' opacity='.3'/%3E%3C!-- stoneware plate: broad rim, well, teal house pinstripe --%3E%3Cellipse cx='126' cy='206' rx='116' ry='19' fill='url(%23p)'/%3E%3Cellipse cx='126' cy='204' rx='116' ry='17.5' fill='none' stroke='%23fffbef' stroke-width='1.5' opacity='.6'/%3E%3Cellipse cx='126' cy='202' rx='99' ry='14' fill='%23fffbef'/%3E%3Cellipse cx='126' cy='202' rx='99' ry='14' fill='%23c3b593' opacity='.2'/%3E%3Cellipse cx='126' cy='201' rx='88' ry='11.5' fill='none' stroke='%231f7d80' stroke-opacity='.5' stroke-width='2'/%3E%3Cellipse cx='126' cy='201' rx='79' ry='9.6' fill='none' stroke='%231f7d80' stroke-opacity='.2' stroke-width='1'/%3E%3C!-- plate rim specular sweep (left) --%3E%3Cpath d='M44 200 q18 -12 46 -13' stroke='%23ffffff' stroke-width='2.4' opacity='.5' fill='none' stroke-linecap='round'/%3E%3C!-- SLICE: point left x54, tall cut right x184; near CUT FACE = lit glossy filling + flaky crust; TOP = genuinely woven lattice. Slice lifted so it sits IN the plate well. --%3E%3C!-- 1) flaky bottom crust (layered wafer, sits in the plate) --%3E%3Cpath d='M54 194 L184 168 L186 187 L58 198 Z' fill='url(%23bcrust)'/%3E%3Cpath d='M58 192 L184 167 M62 196 L182 172' stroke='%23f4d6a0' stroke-width='1' opacity='.5'/%3E%3Cpath d='M60 195 L180 170' stroke='%236e461f' stroke-width='1.1' opacity='.5'/%3E%3C!-- 2) cut-face cherry FILLING, now lit --%3E%3Cpath d='M54 192 L184 120 L184 168 L56 194 Z' fill='url(%23fill)'/%3E%3C!-- broad warm subsurface glow up the middle of the filling (kills the dark-foam read) --%3E%3Cpath d='M62 188 L182 124 L184 148 L68 184 Z' fill='%23e0454a' opacity='.34'/%3E%3Cpath d='M70 182 L180 128 L182 140 L78 176 Z' fill='%23f0666a' opacity='.22'/%3E%3C!-- deep shadow tucked under the lattice lip (near end pulled back so it never pokes past the crust point) --%3E%3Cpath d='M78 172 L184 118 L184 130 L80 178 Z' fill='%2333070a' opacity='.48'/%3E%3C!-- glazed cherries bulging from the cut face, each hot specular + tiny pinlight + soft syrup shadow --%3E%3Cg%3E%3Cellipse cx='150' cy='150' rx='11' ry='10' fill='%233c070a' opacity='.5'/%3E%3Ccircle cx='150' cy='148' r='10' fill='url(%23cherry)'/%3E%3Cellipse cx='145' cy='142' rx='3.4' ry='2.2' fill='%23ffd8d2' opacity='.9'/%3E%3Ccircle cx='142' cy='140' r='1' fill='%23fffaf8'/%3E%3Cellipse cx='122' cy='162' rx='12' ry='10.5' fill='%233c070a' opacity='.5'/%3E%3Ccircle cx='122' cy='160' r='11' fill='url(%23cherry)'/%3E%3Cellipse cx='116' cy='153' rx='3.8' ry='2.4' fill='%23ffd8d2' opacity='.9'/%3E%3Ccircle cx='113' cy='151' r='1.1' fill='%23fffaf8'/%3E%3Ccircle cx='150' cy='169' r='8' fill='url(%23cherry)'/%3E%3Cellipse cx='146' cy='164' rx='2.6' ry='1.7' fill='%23ffd0ca' opacity='.85'/%3E%3Ccircle cx='98' cy='173' r='8.5' fill='url(%23cherry)'/%3E%3Cellipse cx='93' cy='168' rx='2.8' ry='1.8' fill='%23ffd0ca' opacity='.85'/%3E%3Ccircle cx='170' cy='140' r='7' fill='url(%23cherry)'/%3E%3Cellipse cx='166' cy='136' rx='2.2' ry='1.5' fill='%23ffd0ca' opacity='.8'/%3E%3Ccircle cx='131' cy='179' r='5.8' fill='url(%23cherry)'/%3E%3C/g%3E%3C!-- glossy syrup sheen sweeping across the filling --%3E%3Cpath d='M72 182 Q126 156 178 128' stroke='%23ff8a7e' stroke-width='2.6' opacity='.34' fill='none' stroke-linecap='round'/%3E%3C!-- 3) WOVEN LATTICE — long warp strips run point→back with gaps; short weft strips cross OVER, dipping UNDER each warp so the weave reads. Filling shows in the diamond gaps. --%3E%3C!-- WARP (long, along the slice length): 3 raised strips with dark gaps between. Near ends stop behind the crimped lip (x~76) so no strip pokes past the crust point. --%3E%3Cg stroke='%238a5420' stroke-width='.7'%3E%3Cpath d='M76 183 L184 122 L184 132 L78 189 Z' fill='url(%23latg2)'/%3E%3Cpath d='M78 173 L184 114 L184 123 L80 179 Z' fill='url(%23latg2)'/%3E%3Cpath d='M80 163 L184 106 L184 114 L82 169 Z' fill='url(%23latg2)'/%3E%3C/g%3E%3C!-- warp top highlights --%3E%3Cg stroke-linecap='round' fill='none'%3E%3Cpath d='M78 185 L183 124' stroke='%23ffefc4' stroke-width='1.3' opacity='.75'/%3E%3Cpath d='M80 175 L183 116' stroke='%23ffefc4' stroke-width='1.2' opacity='.7'/%3E%3Cpath d='M82 165 L183 108' stroke='%23ffefc4' stroke-width='1.1' opacity='.65'/%3E%3C/g%3E%3C!-- WEFT (cross strips) — run PARALLEL to the near front edge (same down-left→up-right diagonal as the scallop lip), crossing the warp at an angle. Each rides OVER the warp with a soft shadow where it passes, and a dark gap between shows filling: a true woven read. Confined to the top surface (never below the crust line). --%3E%3Cg stroke='%237c4a1c' stroke-width='.6'%3E%3Cpath d='M96 178 L106 148 L112 149 L102 179 Z' fill='url(%23latg)'/%3E%3Cpath d='M112 172 L124 141 L130 142 L118 173 Z' fill='url(%23latg)'/%3E%3Cpath d='M130 165 L142 134 L148 135 L136 166 Z' fill='url(%23latg)'/%3E%3Cpath d='M148 158 L160 127 L166 128 L154 159 Z' fill='url(%23latg)'/%3E%3Cpath d='M166 150 L177 121 L182 122 L171 151 Z' fill='url(%23latg)'/%3E%3C/g%3E%3C!-- weft top highlights (lit crown) + contact shadow the weft casts on the warp beneath it (the over-read) --%3E%3Cg fill='none' stroke-linecap='round'%3E%3Cpath d='M99 176 L108 149' stroke='%23fff0c8' stroke-width='1' opacity='.72'/%3E%3Cpath d='M115 170 L126 142' stroke='%23fff0c8' stroke-width='1' opacity='.72'/%3E%3Cpath d='M133 163 L144 135' stroke='%23fff0c8' stroke-width='1' opacity='.72'/%3E%3Cpath d='M151 156 L162 128' stroke='%23fff0c8' stroke-width='1' opacity='.72'/%3E%3Cpath d='M104 180 L112 152' stroke='%235a3312' stroke-width='1.4' opacity='.34'/%3E%3Cpath d='M122 173 L130 146' stroke='%235a3312' stroke-width='1.4' opacity='.34'/%3E%3Cpath d='M140 166 L148 139' stroke='%235a3312' stroke-width='1.4' opacity='.34'/%3E%3C/g%3E%3C!-- crimped scallop lip along the near front edge of the crust --%3E%3Cg fill='url(%23lid)' stroke='%2385501d' stroke-width='1'%3E%3Cellipse cx='68' cy='190' rx='8.5' ry='4.8' transform='rotate(-27 68 190)'/%3E%3Cellipse cx='94' cy='177' rx='8.5' ry='4.8' transform='rotate(-27 94 177)'/%3E%3Cellipse cx='120' cy='164' rx='8.5' ry='4.8' transform='rotate(-27 120 164)'/%3E%3Cellipse cx='146' cy='151' rx='8.5' ry='4.8' transform='rotate(-27 146 151)'/%3E%3Cellipse cx='172' cy='138' rx='8.5' ry='4.8' transform='rotate(-27 172 138)'/%3E%3C/g%3E%3C!-- scallop-lip highlights --%3E%3Cg fill='%23ffe6ad' opacity='.6'%3E%3Cellipse cx='66' cy='188' rx='3' ry='1.4' transform='rotate(-27 66 188)'/%3E%3Cellipse cx='118' cy='162' rx='3' ry='1.4' transform='rotate(-27 118 162)'/%3E%3Cellipse cx='170' cy='136' rx='3' ry='1.4' transform='rotate(-27 170 136)'/%3E%3C/g%3E%3C!-- back outer crust wall (thickness at the tall cut) --%3E%3Cpath d='M184 114 L187 118 L187 170 L184 168 Z' fill='%236e441e'/%3E%3C!-- sugar-glint speckles on the crust --%3E%3Cg fill='%23fff3d6' opacity='.6'%3E%3Ccircle cx='96' cy='178' r='1'/%3E%3Ccircle cx='130' cy='160' r='1'/%3E%3Ccircle cx='160' cy='144' r='.9'/%3E%3Ccircle cx='112' cy='170' r='.8'/%3E%3C/g%3E%3C!-- ===== MUG + SAUCER (right) ===== --%3E%3C!-- contact shadow --%3E%3Cellipse cx='292' cy='222' rx='72' ry='12' fill='%23030809' opacity='.48'/%3E%3Cellipse cx='292' cy='216' rx='66' ry='11' fill='url(%23p)'/%3E%3Cellipse cx='292' cy='214' rx='66' ry='10' fill='none' stroke='%23fffbef' stroke-width='1.2' opacity='.55'/%3E%3Cellipse cx='292' cy='212' rx='50' ry='8' fill='%23f0e7d2'/%3E%3Cellipse cx='292' cy='212' rx='44' ry='6.5' fill='none' stroke='%231f7d80' stroke-opacity='.35' stroke-width='1.4'/%3E%3C!-- ceramic handle (loop with inner shade) --%3E%3Cpath d='M324 151 q40 5 34 42 q-6 30 -36 25' stroke='%23e7ddc6' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M324 153 q33 5 28 37 q-5 25 -30 21' stroke='%23a2937a' stroke-width='3.5' fill='none' opacity='.5'/%3E%3Cpath d='M322 151 q36 5 31 39' stroke='%23fffdf3' stroke-width='2.4' fill='none' opacity='.6' stroke-linecap='round'/%3E%3C!-- mug body --%3E%3Crect x='250' y='130' width='84' height='84' rx='13' fill='url(%23mug)'/%3E%3C!-- house teal band + chrome keylines --%3E%3Crect x='250' y='152' width='84' height='14' fill='%231f7d80' opacity='.92'/%3E%3Crect x='250' y='150' width='84' height='2' fill='%2340b0b2' opacity='.7'/%3E%3Crect x='250' y='166' width='84' height='1.6' fill='%230c4145' opacity='.6'/%3E%3C!-- vertical gloss highlights --%3E%3Crect x='253' y='136' width='4' height='72' rx='2' fill='%23fffef8' opacity='.6'/%3E%3Crect x='262' y='137' width='8' height='68' rx='4' fill='%23ffffff' opacity='.32'/%3E%3Crect x='324' y='138' width='4' height='66' rx='2' fill='%237a6c52' opacity='.4'/%3E%3C!-- coffee surface: dark brew + crema ring + rim reflection --%3E%3Cellipse cx='292' cy='131' rx='41' ry='10.5' fill='%23f6efdd'/%3E%3Cellipse cx='292' cy='131.5' rx='34' ry='8' fill='url(%23coffee)'/%3E%3Cellipse cx='292' cy='131.5' rx='34' ry='8' fill='url(%23crema)'/%3E%3Cellipse cx='292' cy='131.5' rx='34' ry='8' fill='none' stroke='%23c9a066' stroke-width='1.2' opacity='.7'/%3E%3C!-- warm reflection of the rim caught on the brew --%3E%3Cpath d='M270 128 q22 -6 44 0' stroke='%23e8c88c' stroke-width='1.4' opacity='.55' fill='none'/%3E%3Cellipse cx='280' cy='129' rx='9' ry='2.2' fill='%238a5c32' opacity='.6'/%3E%3C!-- baked 4-point star glint on the glossy mug shoulder (static specular = L6-safe) --%3E%3Cpath d='M262 150 L263.4 156 L269 157.4 L263.4 158.8 L262 165 L260.6 158.8 L255 157.4 L260.6 156 Z' fill='%23ffffff' opacity='.9'/%3E%3C/svg%3E");
}

/* ═══ THE BACK-BAR — kills the mid-wall dead zone. Two wall-mounted
   fixtures riding the single <link> element (void trick), pinned to the
   LEFT and RIGHT thirds so the center text lane stays clear:
     link::before  a chrome shelf bracketed to the wall carrying a glass
                   cake DOME over a frosted layer cake + a stack of mugs
     link::after   a framed enamel "BLUE PLATE SPECIAL" wall placard with a
                   tall soda-fountain MILKSHAKE (whip, cherry, straw)
   Both sit in the wall band (~30-52vh), above the counter, below the
   pendants. STATIC, promoted. */
head link { display: var(--diner-scenery, block); }
head link:first-of-type::before {
  content: "";
  display: var(--diner-scenery, block);
  position: fixed;
  left: 3.5vw;
  top: 30vh;
  width: 250px;
  height: 210px;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background-repeat: no-repeat;
  background-position: left top;
  background-size: contain;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 250 210'%3E%3Cdefs%3E%3ClinearGradient id='sh' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23e6f2f4'/%3E%3Cstop offset='.45' stop-color='%23b3c7cc'/%3E%3Cstop offset='.55' stop-color='%23718890'/%3E%3Cstop offset='1' stop-color='%232a3a41'/%3E%3C/linearGradient%3E%3ClinearGradient id='brk' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%232a3a41'/%3E%3Cstop offset='.5' stop-color='%23c3d5d9'/%3E%3Cstop offset='1' stop-color='%233a4a51'/%3E%3C/linearGradient%3E%3ClinearGradient id='dome' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23dff2f4' stop-opacity='.55'/%3E%3Cstop offset='.5' stop-color='%23a9cfd2' stop-opacity='.22'/%3E%3Cstop offset='1' stop-color='%235b8f92' stop-opacity='.3'/%3E%3C/linearGradient%3E%3ClinearGradient id='cake' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23fbeede'/%3E%3Cstop offset='1' stop-color='%23e2c8a6'/%3E%3C/linearGradient%3E%3ClinearGradient id='mugm' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23c9c1ae'/%3E%3Cstop offset='.2' stop-color='%23fffdf5'/%3E%3Cstop offset='.6' stop-color='%23e7ddc7'/%3E%3Cstop offset='1' stop-color='%239b8d72'/%3E%3C/linearGradient%3E%3C/defs%3E%3C!-- wall drop-shadow of the whole shelf --%3E%3Crect x='6' y='150' width='240' height='9' rx='3' fill='%23040d10' opacity='.32'/%3E%3C!-- brackets --%3E%3Cpath d='M28 150 L40 150 L40 176 Z' fill='url(%23brk)'/%3E%3Cpath d='M196 150 L208 150 L208 176 Z' fill='url(%23brk)'/%3E%3C!-- the chrome shelf plank --%3E%3Crect x='10' y='142' width='230' height='11' rx='3' fill='url(%23sh)'/%3E%3Crect x='10' y='142' width='230' height='2.4' rx='1.2' fill='%23f4fbfc' opacity='.8'/%3E%3Crect x='10' y='150' width='230' height='2' fill='%230f1c21' opacity='.4'/%3E%3C!-- ===== GLASS CAKE DOME + LAYER CAKE (left of shelf) ===== --%3E%3C!-- contact shadow --%3E%3Cellipse cx='70' cy='142' rx='46' ry='6' fill='%23040d10' opacity='.4'/%3E%3C!-- cake stand foot + plate --%3E%3Crect x='66' y='128' width='8' height='12' fill='%23c3d5d9'/%3E%3Cellipse cx='70' cy='140' rx='20' ry='4' fill='url(%23sh)'/%3E%3Cellipse cx='70' cy='128' rx='40' ry='6' fill='url(%23sh)'/%3E%3C!-- cake: two frosted layers --%3E%3Cpath d='M42 126 q28 -9 56 0 L98 108 q-28 -8 -56 0 Z' fill='url(%23cake)'/%3E%3Cpath d='M42 108 q28 -8 56 0 L98 92 q-28 -7 -56 0 Z' fill='url(%23cake)'/%3E%3C!-- frosting drips + cherry on top --%3E%3Cpath d='M46 108 q4 6 8 0 q4 6 8 0 q4 6 8 0 q4 6 8 0 q4 6 8 0' fill='none' stroke='%23f7ecdb' stroke-width='3' opacity='.9'/%3E%3Ccircle cx='70' cy='88' r='5' fill='%23c22832'/%3E%3Cellipse cx='68' cy='86' rx='1.6' ry='1' fill='%23ff9a92' opacity='.9'/%3E%3C!-- glass DOME over it (translucent, with a bright specular) --%3E%3Cpath d='M34 128 Q34 74 70 72 Q106 74 106 128 Z' fill='url(%23dome)'/%3E%3Cpath d='M44 122 Q44 84 66 80' stroke='%23f2fbfc' stroke-width='3' opacity='.55' fill='none' stroke-linecap='round'/%3E%3Cellipse cx='70' cy='72' rx='7' ry='3' fill='%23b3c7cc'/%3E%3Ccircle cx='70' cy='70' r='3' fill='%23e6f2f4'/%3E%3C!-- baked 4-point star glint on the dome finial (static specular = L6-safe) --%3E%3Cpath d='M70 62 L71.4 68.6 L78 70 L71.4 71.4 L70 78 L68.6 71.4 L62 70 L68.6 68.6 Z' fill='%23ffffff' opacity='.92'/%3E%3C!-- crisp glass specular pip low on the dome --%3E%3Ccircle cx='52' cy='112' r='2' fill='%23f2fbfc' opacity='.7'/%3E%3C!-- ===== STACK OF MUGS (right of shelf) ===== --%3E%3Cg%3E%3Cellipse cx='176' cy='142' rx='30' ry='5' fill='%23040d10' opacity='.35'/%3E%3Crect x='150' y='120' width='52' height='22' rx='4' fill='url(%23mugm)'/%3E%3Crect x='156' y='100' width='52' height='22' rx='4' fill='url(%23mugm)'/%3E%3Crect x='152' y='80' width='52' height='22' rx='4' fill='url(%23mugm)'/%3E%3Cellipse cx='178' cy='80' rx='26' ry='4.5' fill='%23efe6d2'/%3E%3Cellipse cx='178' cy='80' rx='20' ry='3' fill='%23cabf9f'/%3E%3Cpath d='M204 86 q13 3 11 13 q-2 9 -12 8' stroke='%23e7ddc7' stroke-width='5' fill='none' stroke-linecap='round'/%3E%3Crect x='156' y='104' width='4' height='34' rx='2' fill='%23fffdf5' opacity='.6'/%3E%3C/g%3E%3C/svg%3E");
}
head link:last-of-type::after {
  content: "";
  display: var(--diner-scenery, block);
  position: fixed;
  right: 3.5vw;
  top: 29vh;
  width: 250px;
  height: 220px;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background-repeat: no-repeat;
  background-position: right top;
  background-size: contain;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 250 220'%3E%3Cdefs%3E%3ClinearGradient id='plc' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%232b9297'/%3E%3Cstop offset='1' stop-color='%230c4145'/%3E%3C/linearGradient%3E%3ClinearGradient id='pfr' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23f2fbfc'/%3E%3Cstop offset='.5' stop-color='%239db3ba'/%3E%3Cstop offset='1' stop-color='%2338484f'/%3E%3C/linearGradient%3E%3ClinearGradient id='glass' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23cfe6e8' stop-opacity='.4'/%3E%3Cstop offset='.5' stop-color='%23f4fbfc' stop-opacity='.6'/%3E%3Cstop offset='1' stop-color='%237fa8ac' stop-opacity='.35'/%3E%3C/linearGradient%3E%3ClinearGradient id='shk' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23fff1f4'/%3E%3Cstop offset='.5' stop-color='%23fbd9e0'/%3E%3Cstop offset='1' stop-color='%23f0b4c1'/%3E%3C/linearGradient%3E%3C/defs%3E%3C!-- ===== ENAMEL WALL PLACARD: BLUE PLATE SPECIAL ===== --%3E%3Crect x='40' y='16' width='196' height='84' rx='9' fill='%23050f12' opacity='.35' transform='translate(4 5)'/%3E%3Crect x='40' y='16' width='196' height='84' rx='9' fill='url(%23pfr)'/%3E%3Crect x='46' y='22' width='184' height='72' rx='6' fill='url(%23plc)'/%3E%3Crect x='46' y='22' width='184' height='72' rx='6' fill='none' stroke='%23f7eed9' stroke-width='2' opacity='.75'/%3E%3C!-- placard lettering (baked as shapes so no webfont needed) --%3E%3Ctext x='138' y='48' font-family='Georgia,serif' font-size='17' font-weight='700' fill='%23f7eed9' text-anchor='middle' letter-spacing='1.5'%3EBLUE PLATE%3C/text%3E%3Ctext x='138' y='74' font-family='Georgia,serif' font-size='20' font-weight='700' fill='%23e8b45a' text-anchor='middle' letter-spacing='3'%3ESPECIAL%3C/text%3E%3Cpath d='M64 84 h148' stroke='%23e8b45a' stroke-width='1.4' opacity='.5'/%3E%3C!-- placard glass specular --%3E%3Cpath d='M52 30 L120 30 L92 90 L52 90 Z' fill='%23ffffff' opacity='.06'/%3E%3C!-- ===== MILKSHAKE on a small chrome wall shelf (below the placard) ===== --%3E%3C!-- shelf drop-shadow + bracket + plank so the glass stands on something --%3E%3Crect x='118' y='210' width='104' height='7' rx='2.5' fill='%23040d10' opacity='.3'/%3E%3Cpath d='M150 208 L160 208 L160 224 Z' fill='%233a4a51'/%3E%3Cpath d='M180 208 L190 208 L190 224 Z' fill='%233a4a51'/%3E%3Crect x='120' y='202' width='100' height='8' rx='2.5' fill='url(%23pfr)'/%3E%3Crect x='120' y='202' width='100' height='2' rx='1' fill='%23f2fbfc' opacity='.8'/%3E%3C!-- contact shadow of the glass on the shelf --%3E%3Cellipse cx='170' cy='202' rx='30' ry='4.5' fill='%23040d10' opacity='.42'/%3E%3Cellipse cx='170' cy='200' rx='24' ry='3.4' fill='%23e7ddc7'/%3E%3C!-- tall soda glass (tulip) --%3E%3Cpath d='M150 128 L190 128 L182 200 L158 200 Z' fill='url(%23shk)'/%3E%3C!-- glass overlay + rim --%3E%3Cpath d='M150 128 L190 128 L182 200 L158 200 Z' fill='url(%23glass)' opacity='.5'/%3E%3Cellipse cx='170' cy='128' rx='20' ry='4' fill='%23fff4f6'/%3E%3C!-- whipped cream crown + cherry + straw --%3E%3Cpath d='M150 128 q6 -14 20 -14 q14 0 20 14 q-8 -6 -14 2 q-6 -8 -12 0 q-6 -8 -14 -2 Z' fill='%23fff6f0'/%3E%3Ccircle cx='176' cy='112' r='5' fill='%23c22832'/%3E%3Cellipse cx='174' cy='110' rx='1.6' ry='1' fill='%23ff9a92' opacity='.9'/%3E%3Crect x='162' y='96' width='4' height='34' rx='2' fill='%23e34d5e' transform='rotate(10 164 113)'/%3E%3C!-- glass vertical specular --%3E%3Crect x='156' y='134' width='4' height='60' rx='2' fill='%23ffffff' opacity='.5'/%3E%3Cpath d='M180 136 L178 194' stroke='%23ffffff' stroke-width='2' opacity='.25'/%3E%3C!-- baked 4-point star glint on the glass shoulder (static specular = L6-safe) --%3E%3Cpath d='M158 140 L159 144 L163 145 L159 146 L158 150 L157 146 L153 145 L157 144 Z' fill='%23ffffff' opacity='.95'/%3E%3C!-- tiny specular pip on the placard chrome frame corner --%3E%3Ccircle cx='52' cy='24' r='2.2' fill='%23f2fbfc' opacity='.85'/%3E%3C/svg%3E");
}

/* ═══ checkerboard floor — the diner SIGNATURE, now actually reading.
   Coarse black-and-cream tile, tipped back on a one-point perspective so
   the near rows are broad and clear and the far rows compress under a
   warm-lit haze. Two stacked layers on ONE fixed box:
     • the tile itself (conic checker, warm cream vs deep charcoal)
     • a POLISHED-FLOOR sheen: two long specular pools where the pendants
       reflect down the waxed tile, plus a cool ambient wash
     • a soft depth ramp that fades the FAR edge (top) into the room
       rather than crushing the whole floor to black.
   L6: cells are coarse (128px pre-perspective; the near rows read at
   ~120px on screen, far rows compress but are veiled by haze — no fine
   screen-fixed pattern crosses the center text lane, which sits far
   above the floor band). STATIC. */
head meta { display: var(--diner-scenery, block); }
head meta:first-of-type::before {
  content: "";
  display: var(--diner-scenery, block);
  position: fixed;
  left: -34vw;
  right: -34vw;
  bottom: -10vh;
  height: 60vh;
  z-index: -2;
  pointer-events: none;
  transform-origin: 50% 100%;
  transform: perspective(60vh) rotateX(55deg) translateZ(0);
  background:
    /* far-edge veil: the back of the floor dissolves into warm room shadow
       (top of the box = far rows). Softer + higher so more mid rows read
       under the counter shadow instead of a flat black gap. */
    linear-gradient(180deg, #0a161a 0%, rgba(10, 22, 26, 0.6) 13%, rgba(10, 22, 26, 0.22) 30%, rgba(10, 22, 26, 0.04) 54%, rgba(10, 22, 26, 0) 76%),
    /* warm pendant reflections pooling down the waxed tile (the floor is
       polished, so the two lamps throw long soft highlights) — brighter now */
    radial-gradient(ellipse 24% 72% at 33% 84%, rgba(255, 220, 158, 0.34), rgba(255, 220, 158, 0) 68%),
    radial-gradient(ellipse 24% 72% at 67% 84%, rgba(255, 220, 158, 0.3), rgba(255, 220, 158, 0) 68%),
    /* broad warm wax bloom across the whole near floor (lifts the muddy band
       so the checker actually reads bright and polished) */
    radial-gradient(ellipse 70% 60% at 50% 96%, rgba(255, 226, 176, 0.16), rgba(255, 226, 176, 0) 74%),
    /* cool ambient sheen across the near tile (the polish catches skylight) */
    linear-gradient(180deg, rgba(160, 220, 216, 0) 34%, rgba(160, 220, 216, 0.1) 78%, rgba(160, 220, 216, 0.03) 100%),
    /* subtle wax gloss banding on the dark tiles so they read glossy not flat */
    linear-gradient(180deg, rgba(150, 200, 205, 0) 60%, rgba(150, 200, 205, 0.05) 100%),
    /* the tile: warm cream squares alternating with polished charcoal —
       lifted contrast + luminance so it reads as a real diner floor */
    conic-gradient(#dccfa4 25%, #17242a 0 50%, #dccfa4 0 75%, #17242a 0) 0 0 / 134px 134px;
}

/* ═══ the counter set — chrome napkin dispenser, ketchup, mustard —
   parked on the counter at the left to balance the pie. STATIC, promoted. */
head meta:first-of-type::after {
  content: "";
  display: var(--diner-scenery, block);
  position: fixed;
  left: 7vw;
  bottom: 33vh;
  width: 180px;
  height: 163px;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: contain;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 200'%3E%3Cdefs%3E%3C!-- brushed chrome for the dispenser --%3E%3ClinearGradient id='n' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%232b3a40'/%3E%3Cstop offset='.2' stop-color='%23c3d4d8'/%3E%3Cstop offset='.38' stop-color='%23eef7f9'/%3E%3Cstop offset='.52' stop-color='%238fa4aa'/%3E%3Cstop offset='.7' stop-color='%23dbeaed'/%3E%3Cstop offset='1' stop-color='%2322323a'/%3E%3C/linearGradient%3E%3ClinearGradient id='ntop' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23f0f8fa'/%3E%3Cstop offset='1' stop-color='%23b7c8cd'/%3E%3C/linearGradient%3E%3C!-- ketchup red plastic --%3E%3ClinearGradient id='r' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%237a150b'/%3E%3Cstop offset='.3' stop-color='%23d23a24'/%3E%3Cstop offset='.5' stop-color='%23e8563d'/%3E%3Cstop offset='.72' stop-color='%23c22e1a'/%3E%3Cstop offset='1' stop-color='%236e1108'/%3E%3C/linearGradient%3E%3ClinearGradient id='rcap' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23e5573f'/%3E%3Cstop offset='1' stop-color='%237a160a'/%3E%3C/linearGradient%3E%3C!-- mustard yellow plastic --%3E%3ClinearGradient id='y' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%238a5e12'/%3E%3Cstop offset='.3' stop-color='%23e0b445'/%3E%3Cstop offset='.5' stop-color='%23f2cf68'/%3E%3Cstop offset='.72' stop-color='%23cc9a2c'/%3E%3Cstop offset='1' stop-color='%237a5410'/%3E%3C/linearGradient%3E%3ClinearGradient id='ycap' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23efc659'/%3E%3Cstop offset='1' stop-color='%238a5e12'/%3E%3C/linearGradient%3E%3C/defs%3E%3C!-- contact shadow --%3E%3Cellipse cx='105' cy='182' rx='92' ry='9' fill='%23040b0e' opacity='.45'/%3E%3C!-- ===== NAPKIN DISPENSER (left) ===== --%3E%3C!-- napkins stacked, peeking --%3E%3Cpath d='M26 96 L92 96 L86 74 L34 74 Z' fill='%23f6efdd'/%3E%3Cpath d='M34 74 L86 74 L84 68 L36 68 Z' fill='%23fffbef'/%3E%3Cpath d='M34 80 L86 80 M34 86 L86 86' stroke='%23d8cbaa' stroke-width='1.5' opacity='.7'/%3E%3C!-- chrome body --%3E%3Crect x='18' y='94' width='82' height='82' rx='7' fill='url(%23n)'/%3E%3C!-- top chrome rail --%3E%3Crect x='16' y='90' width='86' height='9' rx='4.5' fill='url(%23ntop)'/%3E%3C!-- curved reflection band --%3E%3Cpath d='M18 128 L100 102 L100 122 L18 152 Z' fill='%23ffffff' opacity='.16'/%3E%3C!-- horizontal slot for napkins --%3E%3Crect x='30' y='100' width='58' height='4' rx='2' fill='%23101b20' opacity='.55'/%3E%3C!-- rim light left edge --%3E%3Crect x='19' y='96' width='3' height='76' rx='1.5' fill='%23eef9fb' opacity='.5'/%3E%3C!-- weighted pusher bar highlight --%3E%3Crect x='40' y='150' width='38' height='5' rx='2.5' fill='%23f0f8fa' opacity='.3'/%3E%3C!-- baked 4-point star glint on the dispenser chrome (static specular = L6-safe) --%3E%3Cpath d='M30 112 L31.4 118 L37 119.4 L31.4 120.8 L30 127 L28.6 120.8 L23 119.4 L28.6 118 Z' fill='%23ffffff' opacity='.92'/%3E%3C!-- ===== KETCHUP (center) ===== --%3E%3C!-- body --%3E%3Cpath d='M126 96 q-5 5 -5 14 L121 158 q0 12 16 12 q16 0 16 -12 L153 110 q0 -9 -5 -14 Z' fill='url(%23r)'/%3E%3C!-- molded cap: shoulder ring + tapered nozzle --%3E%3Cpath d='M124 96 L150 96 L147 84 q-1 -4 -10 -4 q-9 0 -10 4 Z' fill='url(%23rcap)'/%3E%3Crect x='126' y='92' width='22' height='4' rx='2' fill='%234a0d05' opacity='.5'/%3E%3C!-- nozzle tip: clean cone --%3E%3Cpath d='M131 80 L143 80 L138 64 L136 64 Z' fill='url(%23rcap)'/%3E%3Crect x='135' y='62' width='4' height='4' rx='1.5' fill='%239c2415'/%3E%3C!-- gloss streak (plastic highlight) --%3E%3Crect x='127' y='102' width='6' height='52' rx='3' fill='%23ff9d84' opacity='.55'/%3E%3Crect x='145' y='106' width='3' height='44' rx='1.5' fill='%23ffb9a6' opacity='.35'/%3E%3C!-- little label patch --%3E%3Crect x='129' y='120' width='17' height='18' rx='3' fill='%23fff2ec' opacity='.85'/%3E%3Cpath d='M132 126 h11 M132 130 h11 M132 134 h7' stroke='%23c22e1a' stroke-width='1.4' opacity='.7'/%3E%3C!-- ===== MUSTARD (right) ===== --%3E%3Cpath d='M170 100 q-5 5 -5 13 L165 160 q0 11 14 11 q14 0 14 -11 L188 113 q0 -8 -5 -13 Z' fill='url(%23y)'/%3E%3Cpath d='M168 100 L190 100 L187 89 q-1 -4 -9 -4 q-8 0 -9 4 Z' fill='url(%23ycap)'/%3E%3Crect x='170' y='96' width='18' height='4' rx='2' fill='%235a3d0a' opacity='.5'/%3E%3Cpath d='M174 85 L184 85 L180 70 L178 70 Z' fill='url(%23ycap)'/%3E%3Crect x='177' y='68' width='4' height='4' rx='1.5' fill='%238a6212'/%3E%3Crect x='171' y='106' width='5' height='48' rx='2.5' fill='%23ffe08a' opacity='.55'/%3E%3Crect x='186' y='110' width='3' height='40' rx='1.5' fill='%23fff0c0' opacity='.35'/%3E%3Crect x='172' y='124' width='15' height='16' rx='3' fill='%23fffaf0' opacity='.8'/%3E%3Cpath d='M175 130 h9 M175 134 h9' stroke='%23cc9a2c' stroke-width='1.4' opacity='.7'/%3E%3C/svg%3E");
}

/* ═══ the wall clock — chrome bezel, cream face, 11:58 and holding.
   Top-left corner, opposite the neon. STATIC, promoted. */
head meta:last-of-type::before {
  content: "";
  display: var(--diner-scenery, block);
  position: fixed;
  left: 4vw;
  top: 5.5vh;
  width: 118px;
  height: 118px;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 150'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23f2fbfd'/%3E%3Cstop offset='.5' stop-color='%239db3ba'/%3E%3Cstop offset='1' stop-color='%2338484f'/%3E%3C/linearGradient%3E%3CradialGradient id='fc' cx='42%25' cy='36%25' r='75%25'%3E%3Cstop offset='0' stop-color='%23faf3e0'/%3E%3Cstop offset='1' stop-color='%23ddd0b1'/%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='75' cy='75' r='68' fill='%230a161b'/%3E%3Ccircle cx='75' cy='75' r='64' fill='none' stroke='url(%23g)' stroke-width='9'/%3E%3Ccircle cx='75' cy='75' r='57' fill='url(%23fc)'/%3E%3Cg stroke='%233b2a1c' stroke-width='3' stroke-linecap='round'%3E%3Cpath d='M75 26 L75 34'/%3E%3Cpath d='M124 75 L116 75'/%3E%3Cpath d='M75 124 L75 116'/%3E%3Cpath d='M26 75 L34 75'/%3E%3C/g%3E%3Cg fill='%233b2a1c' opacity='.7'%3E%3Ccircle cx='99.5' cy='32.6' r='2'/%3E%3Ccircle cx='117.4' cy='50.5' r='2'/%3E%3Ccircle cx='117.4' cy='99.5' r='2'/%3E%3Ccircle cx='99.5' cy='117.4' r='2'/%3E%3Ccircle cx='50.5' cy='117.4' r='2'/%3E%3Ccircle cx='32.6' cy='99.5' r='2'/%3E%3Ccircle cx='32.6' cy='50.5' r='2'/%3E%3Ccircle cx='50.5' cy='32.6' r='2'/%3E%3C/g%3E%3Cpath d='M75 75 L74 47' stroke='%232a2018' stroke-width='5' stroke-linecap='round'/%3E%3Cpath d='M75 75 L67 38' stroke='%232a2018' stroke-width='3.5' stroke-linecap='round'/%3E%3Cpath d='M75 75 L32 66' stroke='%23c8372a' stroke-width='1.6'/%3E%3Cpath d='M75 75 L84 77' stroke='%23c8372a' stroke-width='1.6'/%3E%3Ccircle cx='75' cy='75' r='4' fill='%232a2018'/%3E%3Ccircle cx='75' cy='75' r='1.8' fill='%23c8372a'/%3E%3Cellipse cx='58' cy='52' rx='27' ry='13' fill='%23ffffff' opacity='.14' transform='rotate(-28 58 52)'/%3E%3C!-- baked 4-point star glint on the polished chrome bezel (static specular = L6-safe) --%3E%3Cpath d='M40 30 L42 37 L49 39 L42 41 L40 48 L38 41 L31 39 L38 37 Z' fill='%23ffffff' opacity='.9'/%3E%3C/svg%3E");
}

/* ═══ coffee steam — the ONLY continuous mover (small box, will-change
   budget: 1). Three soft wisps rise off the mug, sway, thin out. */
head meta:last-of-type::after {
  content: "";
  display: var(--diner-scenery, block);
  position: fixed;
  right: calc(4.5vw + 36px);
  bottom: calc(32.5vh + 96px);
  width: 90px;
  height: 130px;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  background:
    radial-gradient(ellipse 12px 26px at 38% 78%, rgba(247, 238, 217, 0.5), rgba(247, 238, 217, 0) 70%),
    radial-gradient(ellipse 10px 22px at 60% 48%, rgba(247, 238, 217, 0.4), rgba(247, 238, 217, 0) 70%),
    radial-gradient(ellipse 14px 26px at 46% 18%, rgba(247, 238, 217, 0.32), rgba(247, 238, 217, 0) 70%);
  will-change: transform;
  animation: diner-steam 7s ease-in-out infinite;
}

/* ═══ griddle haze: three huge soft warm blobs hanging in the room.
   Viewport-sized layer, so motion is steps(1, end) — one hop every 5s.
   Box overscans 20vw so hops never expose an edge. */
body::before {
  content: "";
  display: var(--diner-scenery, block);
  position: fixed;
  top: 0;
  bottom: 0;
  left: -20vw;
  right: -20vw;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(ellipse 34vw 12vh at 30% 44%, rgba(255, 220, 180, 0.05), rgba(255, 220, 180, 0) 70%),
    radial-gradient(ellipse 40vw 13vh at 68% 30%, rgba(214, 236, 238, 0.045), rgba(214, 236, 238, 0) 72%),
    radial-gradient(ellipse 28vw 10vh at 52% 62%, rgba(255, 214, 170, 0.04), rgba(255, 214, 170, 0) 70%),
  ;
  animation: diner-haze 40s steps(1, end) infinite;
}

/* ═══ the lane: a quiet dark band under the crawl so the flourish text
   and card shadows read over the teal and the red. Coarse, soft, STATIC.
   Fades before the stools and the pie keep their light. */
body::after {
  content: "";
  display: var(--diner-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background: linear-gradient(90deg,
    rgba(4, 14, 16, 0) 12%, rgba(4, 14, 16, 0.34) 32%, rgba(4, 14, 16, 0.42) 50%,
    rgba(4, 14, 16, 0.34) 68%, rgba(4, 14, 16, 0) 88%);
}

/* ═══ formica starbursts + coarse atomic glints — the mid-century sparkle
   print. RIDES THE ROLL (zero slide against glyphs), so per L6 it is safe.
   Three layers: two sparse fine starburst tiles (each now with a hot center
   pip so it truly twinkles) and a COARSE soft-glint wash (>=40px warm/cool
   blooms) that gives the sheen its shine as the cards drift up. */
.credits-roll::before,
.credits-slideshow::before {
  content: "";
  display: var(--diner-scenery, block);
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.16;
  background-image:
    /* coarse soft glints — pure gradients on a repeating tile, big soft
       falloff (L6-coarse); rides the roll so it never slides vs the glyphs */
    radial-gradient(circle 46px at 18% 20%, rgba(255, 238, 200, 0.5), rgba(255, 238, 200, 0) 68%),
    radial-gradient(circle 42px at 78% 62%, rgba(198, 240, 236, 0.42), rgba(198, 240, 236, 0) 68%),
    radial-gradient(circle 52px at 52% 88%, rgba(255, 226, 186, 0.4), rgba(255, 226, 186, 0) 70%),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 260 300'%3E%3Cg stroke='%23f7eed9' stroke-width='2' stroke-linecap='round' fill='none'%3E%3Cpath d='M60 60 L60 96 M42 78 L78 78 M49 67 L71 89 M71 67 L49 89'/%3E%3C/g%3E%3Ccircle cx='60' cy='78' r='2.4' fill='%23fffaf0'/%3E%3Ccircle cx='185' cy='210' r='3' fill='%23fffaf0'/%3E%3Cpath d='M185 194 L185 206 M185 214 L185 226 M169 210 L181 210 M189 210 L201 210' stroke='%23f7eed9' stroke-width='1.6' stroke-linecap='round' fill='none'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 260 300'%3E%3Cg stroke='%23f7eed9' stroke-width='2' stroke-linecap='round' fill='none'%3E%3Cpath d='M60 60 L60 96 M42 78 L78 78 M49 67 L71 89 M71 67 L49 89'/%3E%3C/g%3E%3Ccircle cx='60' cy='78' r='2.4' fill='%23fffaf0'/%3E%3Ccircle cx='185' cy='210' r='3' fill='%23fffaf0'/%3E%3Cpath d='M185 194 L185 206 M185 214 L185 226 M169 210 L181 210 M189 210 L201 210' stroke='%23f7eed9' stroke-width='1.6' stroke-linecap='round' fill='none'/%3E%3C/svg%3E");
  background-size: 620px 560px, 620px 560px, 620px 560px, 340px 392px, 240px 280px;
  background-position: 0 0, 0 0, 0 0, 0 0, 130px 190px;
}

/* ═══ menu anatomy: red enamel header board + cream card ═══ */

/* hue cycle — cherry, teal, mustard, repeat (intro is section 1, so the
   first block lands on 3n+2 = cherry). Content-agnostic. */
.credits-block:nth-of-type(3n + 2),
.credits-slide:nth-of-type(3n + 2) {
  --diner-chip-hi: #d8503c; --diner-chip-bg: #a92c1f; --diner-chip-ink: #fdf3df;
}
.credits-block:nth-of-type(3n),
.credits-slide:nth-of-type(3n) {
  --diner-chip-hi: #2b9297; --diner-chip-bg: #176569; --diner-chip-ink: #f2fbf9;
}
.credits-block:nth-of-type(3n + 1),
.credits-slide:nth-of-type(3n + 1) {
  --diner-chip-hi: #e5ad46; --diner-chip-bg: #bf861f; --diner-chip-ink: #402c12;
}

/* the header board: Alfa Slab caps on an enamel chip with a cream
   double-keyline, hung half-over the card edge like a clipped menu. */
.credits-block__title {
  position: relative;
  z-index: 1;
  width: fit-content;
  max-width: 78vw;
  margin: 0 auto -0.9em;
  padding: 0.4em 1.15em 0.5em;
  font-weight: 400;
  letter-spacing: 0.06em;
  color: var(--diner-chip-ink, #fdf3df);
  background: linear-gradient(180deg, var(--diner-chip-hi, #d8503c) 0%, var(--diner-chip-bg, #a92c1f) 100%);
  border-radius: 12px;
  box-shadow:
    inset 0 0 0 2px rgba(252, 244, 224, 0.85),
    inset 0 0 0 4px rgba(20, 10, 8, 0.18),
    0 4px 0 rgba(20, 10, 8, 0.35),
    0 10px 22px rgba(4, 12, 15, 0.45);
  text-shadow: 0 2px 0 rgba(0, 0, 0, 0.25);
}
.credits-block__title::after { display: none; }
.credits-block__title::before {
  content: "\\2605 \\00B7 \\2605";
  display: block;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.48em;
  letter-spacing: 0.7em;
  padding-left: 0.7em;
  margin-bottom: 0.3em;
  opacity: 0.8;
  text-shadow: none;
}

/* the menu card: cream stock, laminate sheen, double red rule frame,
   thrown shadow onto the diner. Rides the roll — block-local panel. */
.credits-block__list {
  box-sizing: border-box;
  width: min(34rem, 86vw);
  margin: 0 auto;
  padding: 2.4rem 2.2rem 1.7rem;
  background:
    linear-gradient(160deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 30%),
    linear-gradient(180deg, var(--diner-card-a, #fbf4e3) 0%, var(--diner-card-b, #f2e6ca) 78%, var(--diner-card-c, #e9dbba) 100%);
  border-radius: 14px;
  box-shadow:
    inset 0 0 0 1.5px rgba(179, 57, 43, 0.5),
    inset 0 0 0 7px rgba(252, 246, 232, 1),
    inset 0 0 0 8.5px rgba(179, 57, 43, 0.32),
    0 18px 36px rgba(3, 10, 13, 0.5);
}

/* ═══ rows: typed menu items. Name left, dot leader on the baseline,
   price right — a row with no price stays a centered menu line. */
.credit {
  display: flex;
  align-items: baseline;
  justify-content: center;
  width: 100%;
  min-width: 0;
  color: var(--diner-ink);
  text-shadow: none;
  letter-spacing: 0;
  line-height: 1.5;
}
.credit__name {
  flex: 0 1 auto;
  min-width: 0;
  overflow-wrap: anywhere;
  text-align: left;
  font-weight: 700;
  color: var(--diner-name-ink, #3b2a1c);
}
.credit__amount {
  display: flex;
  align-items: baseline;
  flex: 1 1 auto;
  min-width: 3.5em;
  opacity: 1;
  font-size: 0.92em;
  font-weight: 700;
  white-space: nowrap;
  color: var(--diner-price, #b3392b);
  font-variant-numeric: tabular-nums;
}
/* the dot leader — an empty flex filler whose bottom border sits right
   on the shared baseline */
.credit__amount::before {
  content: "";
  order: -2;
  flex: 1 1 2em;
  align-self: baseline;
  height: 0.72em;
  border-bottom: 2px dotted rgba(84, 55, 36, 0.5);
  margin: 0 0.6em;
}
/* everything on this menu is priced in dollars */
.credit__amount::after {
  content: "$";
  order: -1;
  margin-right: 0.05em;
}

/* ═══ flourish cards ═══ */
.flourish--intro { gap: 1.3rem; }

/* badge -> the window decal (copy swap via font-size:0 + ::after) */
.flourish__badge { font-size: 0; border: 0; border-radius: 0; padding: 0; box-shadow: none; }
.flourish__badge::after {
  content: "air cooled \\00B7 counter service \\00B7 est. 1952";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 0.32em;
  padding: 0.55em 1em 0.55em 1.32em;
  text-transform: uppercase;
  color: #9fe0dc;
  border: 2px solid rgba(120, 214, 209, 0.6);
  border-radius: 999px;
  box-shadow: 0 0 14px rgba(84, 200, 196, 0.3), inset 0 0 10px rgba(84, 200, 196, 0.15);
  text-shadow: 0 0 10px rgba(120, 214, 209, 0.5), var(--credits-shadow);
}

/* the streamer's title in lights: neon script over the door (restyle only) */
.flourish--intro .flourish__title {
  font-family: "Pacifico", "Brush Script MT", "Segoe Script", cursive;
  font-weight: 400;
  text-transform: none;
  letter-spacing: 0.01em;
  line-height: 1.3;
  max-width: min(88vw, 13em);
  padding-bottom: 0.12em;
  color: #fff0f3;
  text-shadow:
    0 0 4px rgba(255, 255, 255, 0.6),
    0 0 16px rgba(255, 95, 122, 0.8),
    0 0 44px rgba(255, 61, 104, 0.5),
    0 3px 14px rgba(4, 12, 14, 0.8);
}

/* streamer tagline: restyle only — the line painted under the sign */
.flourish__tagline {
  font-family: var(--credits-font);
  font-style: italic;
  font-size: 1.02rem;
  letter-spacing: 0.14em;
  color: rgba(247, 238, 217, 0.85);
}

/* rating -> the menu fine print ticket (copy swap) */
.flourish__rating { font-size: 0; border: 0; padding: 0; opacity: 1; }
.flourish__rating::after {
  content: "no substitutions \\2014 tax included";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.28em;
  padding: 0.5em 0.9em 0.5em 1.18em;
  text-transform: uppercase;
  color: var(--diner-mustard);
  border: 1.5px dashed rgba(232, 180, 90, 0.55);
  border-radius: 3px;
  text-shadow: var(--credits-shadow);
}

/* menu-cover fine print */
.flourish--intro::after {
  content: "menu no. 7 \\00B7 prices subject to change \\00B7 free refills for regulars";
  display: var(--diner-scenery, block);
  font-family: var(--credits-font);
  font-size: 0.66rem;
  letter-spacing: 0.3em;
  padding-left: 0.3em;
  text-transform: lowercase;
  color: rgba(247, 238, 217, 0.5);
}

/* outro: the sign in the window on your way out (copy swaps) */
.flourish--outro::before {
  content: "\\2605 \\2605 \\2605";
  display: var(--diner-scenery, block);
  font-size: 0.7rem;
  letter-spacing: 0.85em;
  padding-left: 0.85em;
  color: var(--diner-mustard);
  opacity: 0.85;
  text-shadow: var(--credits-shadow);
}
.flourish--outro .flourish__title { font-size: 0; }
.flourish--outro .flourish__title::after {
  content: "Come back soon";
  display: inline-block;
  font-family: "Pacifico", "Brush Script MT", "Segoe Script", cursive;
  font-weight: 400;
  text-transform: none;
  font-size: calc(var(--credits-flourish-title-size) * 0.92);
  line-height: 1.35;
  padding-bottom: 0.12em;
  color: #fff0f3;
  text-shadow:
    0 0 4px rgba(255, 255, 255, 0.6),
    0 0 16px rgba(255, 95, 122, 0.8),
    0 0 44px rgba(255, 61, 104, 0.5),
    0 3px 14px rgba(4, 12, 14, 0.8);
}
.flourish--outro .flourish__tagline { font-size: 0; }
.flourish--outro .flourish__tagline::after {
  content: "open 24 hours \\2014 the coffee\\2019s always on";
  font-family: var(--credits-font);
  font-style: italic;
  font-size: 1.02rem;
  letter-spacing: 0.14em;
  color: rgba(247, 238, 217, 0.85);
}
/* the stapled check on the way out */
.flourish--outro::after {
  content: "check no. 0042 \\00B7 paid \\00B7 thank you";
  display: var(--diner-scenery, block);
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  padding: 0.5em 0.9em 0.5em 1.2em;
  margin-top: 0.5rem;
  text-transform: uppercase;
  color: var(--diner-mustard);
  border: 1.5px dashed rgba(232, 180, 90, 0.55);
  border-radius: 3px;
  text-shadow: var(--credits-shadow);
}

/* ═══ raid finale: ON THE HOUSE — the last card is the guest check.
   Mint check stock, cherry header, a dashed check header line, prices
   struck through. The eyebrow breathes on steps() (~0.45 paints/s —
   the only animation inside the roll; ceiling is 2/s). */
.credits-block:nth-last-of-type(2),
.credits-slide:nth-last-of-type(2):not(.flourish) {
  --diner-chip-hi: #d8503c;
  --diner-chip-bg: #a92c1f;
  --diner-chip-ink: #fdf3df;
  --diner-card-a: #eef5e4;
  --diner-card-b: #e0ecce;
  --diner-card-c: #d3e2bd;
  --diner-price: #6d8557;
  --diner-name-ink: #2f3a24;
}
/* a soft warm halo behind the check (scroll: dies inside the block;
   slideshow: the slide is the viewport, so the room warms) */
.credits-block:nth-last-of-type(2) {
  background: radial-gradient(ellipse 58% 58% at 50% 42%, rgba(255, 170, 120, 0.10), rgba(255, 170, 120, 0) 72%);
}
.credits-slide:nth-last-of-type(2):not(.flourish) {
  background: radial-gradient(ellipse 64% 56% at 50% 48%, rgba(255, 170, 120, 0.09), rgba(255, 170, 120, 0) 80%);
}
.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  content: "\\2605 on the house \\2605";
  letter-spacing: 0.42em;
  padding-left: 0.42em;
  text-transform: uppercase;
  opacity: 1;
  animation: diner-special 4.5s steps(1, end) infinite;
}
.credits-block:nth-last-of-type(2) .credits-block__list::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__list::before {
  content: "guest check \\00B7 no. 0042 \\00B7 paid in full";
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.68rem;
  letter-spacing: 0.3em;
  padding-left: 0.3em;
  text-transform: uppercase;
  text-align: center;
  color: rgba(179, 57, 43, 0.75);
  padding-bottom: 0.7em;
  margin-bottom: 0.4em;
  border-bottom: 1.5px dashed rgba(84, 55, 36, 0.35);
  text-shadow: none;
}
.credits-block:nth-last-of-type(2) .credit,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit {
  font-size: calc(var(--credits-name-size) * 1.06);
}
/* prices struck — nobody pays tonight */
.credits-block:nth-last-of-type(2) .credit__amount,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__amount {
  text-decoration: line-through;
  text-decoration-color: rgba(179, 57, 43, 0.8);
  text-decoration-thickness: 2px;
}

/* ═══ slideshow: the header board keeps its overlap; each slide settles
   like a plate set down on the counter. */
.credits-slide:not(.flourish) { gap: 0; }
.credits-slide {
  transform: translateY(10px) scale(1.01);
  transition: opacity 0.8s ease, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}
.credits-slide.is-active { transform: none; }

/* ═══ keyframes (all diner- prefixed; transform/opacity ONLY) ═══ */
/* neon buzz: two brief sags and one double-stutter per 11s (~0.4 paints/s) */
@keyframes diner-neon {
  0%   { opacity: 1; }
  38%  { opacity: 0.86; }
  41%  { opacity: 1; }
  67%  { opacity: 0.9; }
  69%  { opacity: 1; }
  70.5%{ opacity: 0.82; }
  72%  { opacity: 1; }
  100% { opacity: 1; }
}
/* steam: rise off the cup, sway, thin, gone */
@keyframes diner-steam {
  0%   { transform: translate3d(0, 14px, 0) scale(0.9); opacity: 0; }
  22%  { opacity: 0.5; }
  60%  { transform: translate3d(-7px, -26px, 0) scale(1.06); opacity: 0.36; }
  100% { transform: translate3d(5px, -58px, 0) scale(1.2); opacity: 0; }
}
/* griddle haze: eight held positions over 40s = one hop every 5s */
@keyframes diner-haze {
  0%    { transform: translate3d(0, 0, 0); }
  12.5% { transform: translate3d(1.8vw, -0.6vh, 0); }
  25%   { transform: translate3d(3.2vw, -1.2vh, 0); }
  37.5% { transform: translate3d(1.6vw, -1.8vh, 0); }
  50%   { transform: translate3d(-0.8vw, -1.2vh, 0); }
  62.5% { transform: translate3d(-2.6vw, -0.5vh, 0); }
  75%   { transform: translate3d(-1.8vw, 0.6vh, 0); }
  87.5% { transform: translate3d(0.6vw, 0.4vh, 0); }
  100%  { transform: translate3d(0, 0, 0); }
}
/* the ON THE HOUSE eyebrow: two discrete dips per 4.5s — a wink, not a strobe */
@keyframes diner-special {
  0%, 52%   { opacity: 1; }
  58%, 74%  { opacity: 0.55; }
  80%, 100% { opacity: 1; }
}

/* ═══ reduced motion: the diner holds still — steam hangs over the cup,
   the neon burns steady, the haze parks, the special stops winking. */
@media (prefers-reduced-motion: reduce) {
  head::before { animation: none; }
  head meta:last-of-type::after {
    animation: none;
    opacity: 0.3;
    transform: translate3d(0, -22px, 0) scale(1.05);
  }
  body::before { animation: none; }
  .credits-block:nth-last-of-type(2) .credits-block__title::before,
  .credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
    animation: none;
  }
  .credits-slide { transform: none; transition: opacity 0.8s ease; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--diner-scenery:none;}",
};
