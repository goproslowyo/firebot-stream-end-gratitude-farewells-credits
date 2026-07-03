import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. On Deck: the last minutes of a closing set seen from inside the booth — a big CDJ holding 126.0 under your right hand, one channel already pulled down, the recorder still counting, and every name in the room filed as a track with its key and tempo. */
export const VARIANT: ThemeVariant = {
  key: "cdj",
  name: "On Deck",
  css: `
/* ================================================================
   ON DECK — layered after the base theme.
   Fiction: inside the booth, closing set, 126.0 BPM. The room is
   near-black; every photon comes off the gear itself — amber LEDs
   from the console at lower-right, the cold blue of the laptop
   screen at left. DECK A is live, DECK B is cued, channel two is
   already pulled down, and the booth recorder has been running for
   three hours. The credits are the night's crate: every name is a
   track with a key/BPM tag, every section a deck, and the raids go
   out on the MASTER bus.
   Palette: amber LED (#ffb054) + blue LED (#4fb8ff) on near-black.
   Layer map (all scenery kill-switched via --cdj-scenery):
     html bg (--credits-bg)   near-black booth (cheap: 1 radial + 1 linear)
     html::before             LIGHT STORY — blue screen-wash upper-left,
                              amber console updraft lower-right, floor
                              LED seep, corner vignette. STATIC, promoted
     html::after              THE CDJ — hero prop SVG, bottom-right:
                              platter ring with blue jog illumination,
                              center display (MASTER / 126.0 / +0.00%),
                              CUE + PLAY with glints, 8 hot-cue pads,
                              tempo fader, track-progress strip. STATIC
     head::before             jog position marker — thin amber needle
                              riding the platter, ONE continuous mover
                              (256px rotation; will-change budget: 1)
     head::after              THE MIXER — channel strip silhouette,
                              bottom-left: two faders (ch2 pulled down),
                              EQ knobs, master VU columns. STATIC
     meta#1::before           VU overlay — the loud state of the meter
                              columns, steps() opacity (~2.8 paints/s,
                              small corner box, no will-change)
     meta#1::after            headphones hung on the booth rail, upper
                              left, blue rim light. STATIC, promoted
     meta#2::before           laptop on its stand at the left edge —
                              the blue light source; two coarse
                              waveform bands on screen. STATIC, z:-1
     meta#2::after            master beat LED on the mixer — steps()
                              pulse at the downbeat (~2 paints/s)
     link::before             booth recorder chip top-right: REC dot +
                              03:12:44 (the outro saves this file). STATIC
     body::before             booth haze — 3 huge soft wisps, steps(1),
                              one hop per 4.5s
     body::after              center-lane readability scrim. STATIC
     .credits-roll::before    twin rekordbox waveform rails riding the
     .credits-slideshow::before  roll at +-370px (fine pattern on the
                              sanctioned carrier; static in slideshow)
   ================================================================ */
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');

:root {
  --cdj-scenery: block; /* set to none to strip every scenery layer */
  --cdj-amber: #ffb054;
  --cdj-amber-hi: #ffd9a0;
  --cdj-amber-wave: #ff9d3f;
  --cdj-blue: #4fb8ff;
  --cdj-blue-dim: #79c7ff;
  --cdj-red: #ff5340;
  --cdj-text: #e9f1f7;
  --cdj-ink: #04050a;

  /* cheap booth: one amber breath off the console + a 6-stop near-black
     fall (L3: the real light lives on the promoted fixed pseudos) */
  --credits-bg:
    radial-gradient(ellipse 46% 34% at 80% 102%, rgba(255, 157, 63, 0.07) 0%, rgba(255, 157, 63, 0.02) 55%, rgba(4, 5, 10, 0) 78%),
    linear-gradient(168deg, #070a12 0%, #05070d 26%, #04050a 52%, #030408 74%, #040508 100%);
  --credits-color: var(--cdj-text);
  --credits-accent: var(--cdj-amber);
  --credits-font: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  --credits-title-font: "Rajdhani", "Bahnschrift", "Trebuchet MS", "Segoe UI", sans-serif;
  --credits-title-size: clamp(1.3rem, 3vw, 1.9rem);
  --credits-name-size: clamp(1rem, 2.4vw, 1.42rem);
  --credits-flourish-title-size: clamp(2.4rem, 7.4vw, 4.9rem);
  --credits-block-gap: 5rem;
  --credits-name-gap: 0.68rem;
  --credits-shadow: 0 2px 12px rgba(2, 4, 9, 0.85);
  /* no-op — NEVER "none": base composes "var(--credits-glow), var(--credits-shadow)" */
  --credits-glow: 0 0 0 rgba(0, 0, 0, 0);
}

/* scenery is full-bleed: html drops the base edge-fade; body keeps it so
   names still dissolve at the ceiling and floor of the lane */
html { -webkit-mask-image: none; mask-image: none; }
body { background: transparent; }

/* ═══ THE LIGHT STORY — static, promoted (L3). Three honest sources: the
   club's booth light spills a cool volumetric cone down from the top-centre
   truss; the laptop screen throws cold blue from the left edge; the console
   throws amber up from the lower-right where the CDJ sits. A faint amber seep
   marks the LED strip under the booth table, a cool wall-glow keeps the deep
   background from dropping to dead void, and the corners drown. Everything
   coarse, soft, low alpha — nothing here can flicker. ═══ */
html::before {
  content: "";
  display: var(--cdj-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* ═ distant crowd at the horizon ═ a soft silhouette band of heads and
       a few raised hands, way back in the room, catching a cold blue rim off
       the lights. Coarse, very low-contrast (atmospheric perspective =
       distance), and the SVG carries its own centre gap so nothing fine ever
       crosses the text lane. Sits at the back-wall horizon. STATIC. */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 160'%3E%3Cdefs%3E%3ClinearGradient id='crowd' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%233a5578' stop-opacity='0'/%3E%3Cstop offset='.24' stop-color='%2332506f' stop-opacity='.3'/%3E%3Cstop offset='.6' stop-color='%23203148' stop-opacity='.24'/%3E%3Cstop offset='1' stop-color='%230a1018' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='crim' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%237fb2e6' stop-opacity='.34'/%3E%3Cstop offset='1' stop-color='%237fb2e6' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='url(%23crowd)'%3E%3Cpath d='M0 160 L0 90 Q28 70 54 86 Q78 62 104 84 Q126 68 150 86 Q176 66 202 84 Q226 72 252 86 Q278 60 304 84 Q330 74 356 86 Q382 66 408 84 Q432 72 458 86 Q484 64 510 84 Q534 74 560 88 L560 160 Z'/%3E%3Cpath d='M1040 160 L1040 88 Q1066 72 1092 84 Q1116 64 1142 84 Q1168 68 1194 86 Q1218 66 1244 84 Q1270 72 1296 86 Q1322 60 1348 84 Q1374 74 1400 86 Q1426 66 1452 84 Q1478 72 1504 86 Q1530 66 1556 84 Q1578 74 1600 88 L1600 160 Z'/%3E%3C/g%3E%3Cg fill='url(%23crim)'%3E%3Cpath d='M300 86 L296 52 L304 52 L308 86 Z'/%3E%3Cpath d='M312 86 L318 58 L326 60 L322 86 Z'/%3E%3Cpath d='M1300 86 L1296 54 L1304 54 L1308 86 Z'/%3E%3Cpath d='M1288 86 L1282 60 L1290 58 L1294 86 Z'/%3E%3C/g%3E%3Cg fill='%237fb2e6' opacity='.12'%3E%3Cellipse cx='150' cy='84' rx='13' ry='4'/%3E%3Cellipse cx='356' cy='84' rx='13' ry='4'/%3E%3Cellipse cx='1142' cy='84' rx='13' ry='4'/%3E%3Cellipse cx='1400' cy='84' rx='13' ry='4'/%3E%3C/g%3E%3C/svg%3E") 50% 47% / 100% auto no-repeat,
    /* the overhead lighting rig, top-centre — the physical source of the
       booth light. A trussed steel beam with clamps and a lattice, carrying
       FIVE par-cans: a cool-lit centre, two amber-lit inners, two dim
       outers. The lit cans are the origin points of the god-ray beams
       painted below. Fine machining/bolts read only at the very top edge,
       far from the centre text lane. STATIC. */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 760 108'%3E%3Cdefs%3E%3ClinearGradient id='beam' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%2334415a'/%3E%3Cstop offset='.34' stop-color='%23222c3d'/%3E%3Cstop offset='.6' stop-color='%23151b27'/%3E%3Cstop offset='1' stop-color='%230a0e15'/%3E%3C/linearGradient%3E%3ClinearGradient id='tube' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%234a5b78'/%3E%3Cstop offset='.28' stop-color='%232a3446'/%3E%3Cstop offset='1' stop-color='%230c1019'/%3E%3C/linearGradient%3E%3CradialGradient id='canlit' cx='.5' cy='.28' r='.85'%3E%3Cstop offset='0' stop-color='%23f2f8ff'/%3E%3Cstop offset='.34' stop-color='%2396c2f0'/%3E%3Cstop offset='.72' stop-color='%233a5578'/%3E%3Cstop offset='1' stop-color='%23162334'/%3E%3C/radialGradient%3E%3CradialGradient id='canamb' cx='.5' cy='.28' r='.85'%3E%3Cstop offset='0' stop-color='%23ffe9c6'/%3E%3Cstop offset='.4' stop-color='%23ffb45e'/%3E%3Cstop offset='.78' stop-color='%23875024'/%3E%3Cstop offset='1' stop-color='%23331d0c'/%3E%3C/radialGradient%3E%3ClinearGradient id='can' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%232a3446'/%3E%3Cstop offset='.5' stop-color='%23181f2c'/%3E%3Cstop offset='1' stop-color='%23080b12'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='0' y='16' width='760' height='15' rx='4' fill='url(%23beam)'/%3E%3Crect x='0' y='17' width='760' height='2.6' fill='%23bcd9f5' opacity='.3'/%3E%3Crect x='0' y='28' width='760' height='2' fill='%23000' opacity='.4'/%3E%3Cg stroke='%237a92b4' stroke-opacity='.3' stroke-width='1.5'%3E%3Cpath d='M10 31 L64 16 M64 31 L118 16 M118 31 L172 16 M172 31 L226 16 M226 31 L280 16 M280 31 L334 16 M334 31 L388 16 M388 31 L442 16 M442 31 L496 16 M496 31 L550 16 M550 31 L604 16 M604 31 L658 16 M658 31 L712 16 M712 31 L752 16'/%3E%3C/g%3E%3Cg fill='%23566a88' opacity='.5'%3E%3Ccircle cx='64' cy='23' r='1.6'/%3E%3Ccircle cx='172' cy='23' r='1.6'/%3E%3Ccircle cx='280' cy='23' r='1.6'/%3E%3Ccircle cx='388' cy='23' r='1.6'/%3E%3Ccircle cx='496' cy='23' r='1.6'/%3E%3Ccircle cx='604' cy='23' r='1.6'/%3E%3Ccircle cx='712' cy='23' r='1.6'/%3E%3C/g%3E%3Cg fill='url(%23can)' stroke='%23000' stroke-opacity='.45'%3E%3Crect x='150' y='31' width='30' height='20' rx='4'/%3E%3Crect x='584' y='31' width='30' height='20' rx='4'/%3E%3C/g%3E%3Cellipse cx='165' cy='52' rx='14' ry='4.5' fill='%2305070c'/%3E%3Cellipse cx='599' cy='52' rx='14' ry='4.5' fill='%2305070c'/%3E%3Crect x='288' y='31' width='34' height='23' rx='5' fill='url(%23can)' stroke='%23000' stroke-opacity='.45'/%3E%3Crect x='438' y='31' width='34' height='23' rx='5' fill='url(%23can)' stroke='%23000' stroke-opacity='.45'/%3E%3Cellipse cx='305' cy='56' rx='17' ry='6' fill='url(%23canamb)'/%3E%3Cellipse cx='305' cy='56' rx='7' ry='2.6' fill='%23fff1dc'/%3E%3Cellipse cx='455' cy='56' rx='17' ry='6' fill='url(%23canamb)'/%3E%3Cellipse cx='455' cy='56' rx='7' ry='2.6' fill='%23fff1dc'/%3E%3Crect x='363' y='31' width='38' height='26' rx='5' fill='url(%23can)' stroke='%23000' stroke-opacity='.45'/%3E%3Crect x='366' y='33' width='32' height='8' rx='3' fill='%237a92b4' opacity='.24'/%3E%3Cpath d='M369 31 L360 12 M395 31 L404 12' stroke='url(%23tube)' stroke-width='3'/%3E%3Cellipse cx='382' cy='59' rx='20' ry='7.5' fill='url(%23canlit)'/%3E%3Cellipse cx='382' cy='59' rx='9' ry='3.5' fill='%23f4faff'/%3E%3C/svg%3E") 50% 0 / 900px auto no-repeat,
    /* the room swallows its corners */
    radial-gradient(ellipse 150% 128% at 52% 38%, rgba(2, 3, 7, 0) 48%, rgba(2, 3, 7, 0.6) 100%),
    /* ═ VOLUMETRIC GOD-RAYS ═ cool shafts fanning down from the lit centre
       can through the club haze — the biggest depth cue, and what kills the
       centre void. Coarse conic wedges (L6-safe: no fine pattern), reaching
       well down into the room before they dissolve. Each beam's apex sits at
       -1% (right at the can lenses in the 900px rig) so the light visibly
       ORIGINATES at the fixtures. A hot bright central shaft with a soft
       feathered core, two splayed cool side beams, two warm outer beams from
       the amber cans. Stronger than before — the ceiling now reads as lit air. */
    conic-gradient(from 175.4deg at 50% -1%, rgba(150, 194, 240, 0) 45.6%, rgba(150, 194, 240, 0.14) 48%, rgba(174, 210, 248, 0.34) 49.4%, rgba(214, 234, 255, 0.5) 50%, rgba(174, 210, 248, 0.34) 50.6%, rgba(150, 194, 240, 0.14) 52%, rgba(150, 194, 240, 0) 54.4%),
    conic-gradient(from 165deg at 47.4% -1%, rgba(126, 176, 228, 0) 46.4%, rgba(126, 176, 228, 0.2) 49.2%, rgba(158, 200, 244, 0.28) 50%, rgba(126, 176, 228, 0.2) 50.8%, rgba(126, 176, 228, 0) 53.6%),
    conic-gradient(from 195deg at 52.6% -1%, rgba(126, 176, 228, 0) 46.4%, rgba(126, 176, 228, 0.2) 49.2%, rgba(158, 200, 244, 0.28) 50%, rgba(126, 176, 228, 0.2) 50.8%, rgba(126, 176, 228, 0) 53.6%),
    /* two warm splay beams from the amber inner cans (at ~46% / ~54% on
       screen), angled outward */
    conic-gradient(from 154deg at 46% -1%, rgba(255, 176, 94, 0) 46.6%, rgba(255, 176, 94, 0.16) 49.2%, rgba(255, 203, 138, 0.24) 50%, rgba(255, 176, 94, 0.16) 50.8%, rgba(255, 176, 94, 0) 53.4%),
    conic-gradient(from 206deg at 54% -1%, rgba(255, 176, 94, 0) 46.6%, rgba(255, 176, 94, 0.16) 49.2%, rgba(255, 203, 138, 0.24) 50%, rgba(255, 176, 94, 0.16) 50.8%, rgba(255, 176, 94, 0) 53.4%),
    /* THROW POOLS — a bright bloom right under each lit can lens, so every beam
       has a visible source of emission at the fixture, not a floating wedge */
    radial-gradient(ellipse 6vw 9vh at 50% 4%, rgba(226, 240, 255, 0.4), rgba(174, 210, 248, 0.12) 42%, rgba(150, 194, 240, 0) 74%),
    radial-gradient(ellipse 4.4vw 7vh at 46% 4.5%, rgba(255, 214, 156, 0.28), rgba(255, 176, 94, 0.06) 46%, rgba(255, 176, 94, 0) 76%),
    radial-gradient(ellipse 4.4vw 7vh at 54% 4.5%, rgba(255, 214, 156, 0.28), rgba(255, 176, 94, 0.06) 46%, rgba(255, 176, 94, 0) 76%),
    /* a big soft haze SLAB the beams cross mid-air, so the whole upper-centre
       reads as luminous club air rather than dead void — coarse and centred,
       reaching from the ceiling down to the top of the text lane */
    radial-gradient(ellipse 40vw 42vh at 50% 30%, rgba(150, 190, 236, 0.075), rgba(150, 190, 236, 0.03) 46%, rgba(150, 190, 236, 0.01) 66%, rgba(150, 190, 236, 0) 84%),
    /* the soft luminous core under the centre can so the beams have a source */
    radial-gradient(ellipse 30vw 56vh at 50% 1%, rgba(178, 214, 250, 0.26), rgba(150, 194, 240, 0.07) 42%, rgba(150, 194, 240, 0) 70%),
    /* a hazy back-wall band across the deep midground — a dim horizon so the
       centre reads as a receding room, not a flat void. Cooler + lower
       contrast = atmospheric perspective (distance). */
    radial-gradient(ellipse 84vw 34vh at 50% 46%, rgba(66, 100, 142, 0.12), rgba(60, 92, 132, 0.035) 54%, rgba(60, 92, 132, 0) 80%),
    /* a warmer counter-glow from the console side keeping the mid-right alive */
    radial-gradient(ellipse 44vw 28vh at 66% 52%, rgba(150, 120, 92, 0.05), rgba(150, 120, 92, 0) 74%),
    /* far crowd/room floor pool below the horizon — where bodies would be */
    radial-gradient(ellipse 70vw 26vh at 50% 63%, rgba(46, 72, 108, 0.08), rgba(42, 66, 100, 0) 74%),
    /* blue screen-wash: source at the left edge, mid-height */
    radial-gradient(ellipse 30vw 34vh at 2% 52%, rgba(79, 184, 255, 0.13), rgba(79, 184, 255, 0.04) 55%, rgba(79, 184, 255, 0) 76%),
    /* its spill across the booth ceiling */
    linear-gradient(118deg, rgba(79, 184, 255, 0.05) 0%, rgba(79, 184, 255, 0.02) 26%, rgba(79, 184, 255, 0) 46%),
    /* amber updraft off the CDJ, lower-right */
    radial-gradient(ellipse 36vw 30vh at 84% 100%, rgba(255, 157, 63, 0.18), rgba(255, 157, 63, 0.05) 58%, rgba(255, 157, 63, 0) 78%),
    /* a second, wider amber breath so the right wall warms */
    radial-gradient(ellipse 50vw 44vh at 96% 78%, rgba(255, 157, 63, 0.06), rgba(255, 157, 63, 0) 72%),
    /* LED strip seep under the booth table, along the floor */
    linear-gradient(180deg, rgba(255, 157, 63, 0) 0%, rgba(255, 157, 63, 0.06) 55%, rgba(255, 176, 84, 0.1) 100%) 0 82vh / 100% 18vh no-repeat;
}

/* ═══ THE CDJ — hero prop, bottom-right, 1:1 px mapping (560x400 box =
   560x400 viewBox) so the jog marker overlay can weld to the platter.
   Amber halo, chassis with blue top rim (lit by the laptop) and amber
   underglow, track-progress strip, the big platter: dark tire, blue jog
   illumination ring, near-black display glass carrying MASTER / 126.0 /
   BPM / +0.00% with a 65% progress arc, glass specular; CUE (amber,
   glinted) + PLAY (blue triangle), 8 hot-cue pads (pad 1 amber, pad 4
   blue), tempo fader with zero-mark. STATIC, promoted. ═══ */
html::after {
  content: "";
  display: var(--cdj-scenery, block);
  position: fixed;
  right: 8px;
  bottom: 0;
  width: 560px;
  height: 400px;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: 560px 400px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 560 400'%3E%3Cdefs%3E%3ClinearGradient id='ch' x1='.1' y1='0' x2='.5' y2='1'%3E%3Cstop offset='0' stop-color='%2320283a'/%3E%3Cstop offset='.28' stop-color='%23161c29'/%3E%3Cstop offset='.6' stop-color='%230c101a'/%3E%3Cstop offset='1' stop-color='%23070a10'/%3E%3C/linearGradient%3E%3ClinearGradient id='top' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%2333405a'/%3E%3Cstop offset='.5' stop-color='%231c2536'/%3E%3Cstop offset='1' stop-color='%2311161f'/%3E%3C/linearGradient%3E%3CradialGradient id='jgm' cx='.5' cy='.5' r='.5' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%231b2230'/%3E%3Cstop offset='.5' stop-color='%23131925'/%3E%3Cstop offset='.82' stop-color='%230c101a'/%3E%3Cstop offset='1' stop-color='%23060810'/%3E%3C/radialGradient%3E%3ClinearGradient id='tire' x1='.5' y1='0' x2='.5' y2='1'%3E%3Cstop offset='0' stop-color='%234a5a74'/%3E%3Cstop offset='.16' stop-color='%232c384c'/%3E%3Cstop offset='.5' stop-color='%23171d29'/%3E%3Cstop offset='.86' stop-color='%230b0f18'/%3E%3Cstop offset='1' stop-color='%23060910'/%3E%3C/linearGradient%3E%3CradialGradient id='sheen' cx='.5' cy='.5' r='.5'%3E%3Cstop offset='.72' stop-color='%23cfe4fb' stop-opacity='0'/%3E%3Cstop offset='.9' stop-color='%23cfe4fb' stop-opacity='.42'/%3E%3Cstop offset='.955' stop-color='%23f2f9ff' stop-opacity='.78'/%3E%3Cstop offset='1' stop-color='%23cfe4fb' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='brush' cx='.5' cy='.5' r='.5'%3E%3Cstop offset='.62' stop-color='%234a5a74' stop-opacity='0'/%3E%3Cstop offset='.78' stop-color='%234a5a74' stop-opacity='.5'/%3E%3Cstop offset='.85' stop-color='%237e97b8' stop-opacity='.32'/%3E%3Cstop offset='.92' stop-color='%234a5a74' stop-opacity='.5'/%3E%3Cstop offset='1' stop-color='%234a5a74' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='chbrush' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23fff' stop-opacity='0'/%3E%3Cstop offset='.3' stop-color='%23fff' stop-opacity='.05'/%3E%3Cstop offset='.5' stop-color='%23fff' stop-opacity='0'/%3E%3Cstop offset='.72' stop-color='%23fff' stop-opacity='.04'/%3E%3Cstop offset='1' stop-color='%23fff' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='spin' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23ffffff' stop-opacity='0'/%3E%3Cstop offset='.36' stop-color='%23aecbe6' stop-opacity='.16'/%3E%3Cstop offset='.5' stop-color='%23e8f2fb' stop-opacity='.24'/%3E%3Cstop offset='.64' stop-color='%23aecbe6' stop-opacity='.13'/%3E%3Cstop offset='1' stop-color='%23ffffff' stop-opacity='0'/%3E%3C/linearGradient%3E%3CradialGradient id='dome' cx='.42' cy='.34' r='.75'%3E%3Cstop offset='0' stop-color='%23141c2e'/%3E%3Cstop offset='.5' stop-color='%230a0f1a'/%3E%3Cstop offset='.86' stop-color='%23060911'/%3E%3Cstop offset='1' stop-color='%23020409'/%3E%3C/radialGradient%3E%3ClinearGradient id='glass' x1='.15' y1='0' x2='.6' y2='1'%3E%3Cstop offset='0' stop-color='%23bcd6f0' stop-opacity='.16'/%3E%3Cstop offset='.42' stop-color='%23bcd6f0' stop-opacity='.03'/%3E%3Cstop offset='1' stop-color='%23bcd6f0' stop-opacity='0'/%3E%3C/linearGradient%3E%3CradialGradient id='hal' cx='.5' cy='.5' r='.5'%3E%3Cstop offset='0' stop-color='%23ff9d3f' stop-opacity='.2'/%3E%3Cstop offset='.55' stop-color='%23ff9d3f' stop-opacity='.06'/%3E%3Cstop offset='1' stop-color='%23ff9d3f' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='bhal' cx='.5' cy='.5' r='.5'%3E%3Cstop offset='0' stop-color='%234fb8ff' stop-opacity='.12'/%3E%3Cstop offset='1' stop-color='%234fb8ff' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='lit' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23b06a1d'/%3E%3Cstop offset='.7' stop-color='%23ffb054'/%3E%3Cstop offset='1' stop-color='%23ffe0b0'/%3E%3C/linearGradient%3E%3CradialGradient id='cuebtn' cx='.4' cy='.3' r='.85'%3E%3Cstop offset='0' stop-color='%23ffcf87'/%3E%3Cstop offset='.35' stop-color='%23ffb054'/%3E%3Cstop offset='.72' stop-color='%23c67a24'/%3E%3Cstop offset='1' stop-color='%237a4a12'/%3E%3C/radialGradient%3E%3CradialGradient id='plybtn' cx='.4' cy='.3' r='.85'%3E%3Cstop offset='0' stop-color='%23a9dcff'/%3E%3Cstop offset='.4' stop-color='%234fb8ff'/%3E%3Cstop offset='.74' stop-color='%23246ea8'/%3E%3Cstop offset='1' stop-color='%23123a5e'/%3E%3C/radialGradient%3E%3ClinearGradient id='faderc' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23415068'/%3E%3Cstop offset='.5' stop-color='%23222c3d'/%3E%3Cstop offset='1' stop-color='%230d121b'/%3E%3C/linearGradient%3E%3CradialGradient id='padA' cx='.4' cy='.3' r='.9'%3E%3Cstop offset='0' stop-color='%23ffd9a0'/%3E%3Cstop offset='.5' stop-color='%23ffb054'/%3E%3Cstop offset='1' stop-color='%23a5641c'/%3E%3C/radialGradient%3E%3CradialGradient id='padB' cx='.4' cy='.3' r='.9'%3E%3Cstop offset='0' stop-color='%23a9dcff'/%3E%3Cstop offset='.5' stop-color='%234fb8ff'/%3E%3Cstop offset='1' stop-color='%23205a8c'/%3E%3C/radialGradient%3E%3Cradialgradient id='cvig' cx='.5' cy='.5' r='.5'%3E%3Cstop offset='.62' stop-color='%23000000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000000' stop-opacity='.55'/%3E%3C/radialgradient%3E%3C/defs%3E%3Cellipse cx='320' cy='236' rx='272' ry='182' fill='url(%23hal)'/%3E%3Cellipse cx='150' cy='397' rx='176' ry='9' fill='%23000000' opacity='.6'/%3E%3Crect x='36' y='60' width='540' height='356' rx='22' fill='%2305070c'/%3E%3Crect x='39' y='63' width='534' height='350' rx='20' fill='url(%23ch)'/%3E%3Crect x='39' y='63' width='534' height='350' rx='20' fill='url(%23chbrush)'/%3E%3Crect x='39' y='63' width='534' height='58' rx='20' fill='url(%23top)' opacity='.5'/%3E%3Cpath d='M52 64 L560 64' stroke='%23aacdf2' stroke-opacity='.5' stroke-width='1.6' stroke-linecap='round'/%3E%3Cpath d='M40 78 L40 410' stroke='%23aacdf2' stroke-opacity='.14' stroke-width='1.4'/%3E%3Cpath d='M571 80 L571 410' stroke='%23000' stroke-opacity='.5' stroke-width='2'/%3E%3Cg opacity='.5'%3E%3Cpath d='M60 132 L540 132' stroke='%23000' stroke-opacity='.4'/%3E%3Cpath d='M60 133 L540 133' stroke='%236f86a8' stroke-opacity='.14'/%3E%3C/g%3E%3Ccircle cx='52' cy='76' r='2' fill='%236f86a8' opacity='.4'/%3E%3Ccircle cx='558' cy='76' r='2' fill='%23000' opacity='.5'/%3E%3Crect x='70' y='84' width='470' height='8' rx='4' fill='%2302040a' stroke='%23ffb054' stroke-opacity='.16'/%3E%3Crect x='71' y='85' width='297' height='6' rx='3' fill='url(%23lit)'/%3E%3Crect x='71' y='85' width='297' height='2.4' rx='1.2' fill='%23fff' opacity='.32'/%3E%3Ccircle cx='368' cy='88' r='9' fill='%23ffb054' opacity='.28'/%3E%3Crect x='366.5' y='79' width='3' height='18' rx='1.5' fill='%23ffe6c2'/%3E%3Ctext x='70' y='116' font-family='Arial,Helvetica,sans-serif' font-weight='bold' font-size='13' letter-spacing='5' fill='%238cbef0' fill-opacity='.42'%3EDECK A%3C/text%3E%3Ctext x='540' y='116' text-anchor='end' font-family='Arial,Helvetica,sans-serif' font-size='11' letter-spacing='2' fill='%23e9f1f7' fill-opacity='.34'%3ETRACK 07 / 12%3C/text%3E%3Ccircle cx='320' cy='230' r='128' fill='%2306080f'/%3E%3Ccircle cx='320' cy='230' r='127' fill='none' stroke='%23000' stroke-opacity='.6' stroke-width='4'/%3E%3Ccircle cx='320' cy='230' r='123' fill='none' stroke='%232a3346' stroke-width='2'/%3E%3Ccircle cx='320' cy='230' r='120' fill='url(%23jgm)'/%3E%3Ccircle cx='320' cy='230' r='120' fill='url(%23tire)' opacity='.85'/%3E%3Ccircle cx='320' cy='230' r='120' fill='url(%23brush)'/%3E%3Cg fill='none' stroke='%23000' stroke-opacity='.2'%3E%3Ccircle cx='320' cy='230' r='114'/%3E%3Ccircle cx='320' cy='230' r='108'/%3E%3Ccircle cx='320' cy='230' r='102'/%3E%3Ccircle cx='320' cy='230' r='97'/%3E%3C/g%3E%3Cg fill='none' stroke='%2394afce' stroke-opacity='.13'%3E%3Ccircle cx='320' cy='230' r='115.5'/%3E%3Ccircle cx='320' cy='230' r='109.5'/%3E%3Ccircle cx='320' cy='230' r='103.5'/%3E%3Ccircle cx='320' cy='230' r='98.5'/%3E%3C/g%3E%3Cpath d='M234 148 A118 118 0 0 1 406 148' fill='none' stroke='%23dce9f8' stroke-opacity='.5' stroke-width='2.2' stroke-linecap='round'/%3E%3Cpath d='M234 148 A118 118 0 0 1 320 120' fill='none' stroke='%23fbfdff' stroke-opacity='.55' stroke-width='2.4' stroke-linecap='round'/%3E%3Ccircle cx='320' cy='230' r='120' fill='url(%23spin)'/%3E%3Ccircle cx='320' cy='230' r='118' fill='url(%23sheen)' opacity='.48' transform='rotate(-32 320 230)'/%3E%3Cpath d='M226 300 A118 118 0 0 0 414 300' fill='none' stroke='%23000' stroke-opacity='.35' stroke-width='6' stroke-linecap='round'/%3E%3Cpath d='M232 142 A124 124 0 0 1 226 320' fill='none' stroke='%23dcecfb' stroke-opacity='.3' stroke-width='2.5' stroke-linecap='round'/%3E%3Cpath d='M408 318 A124 124 0 0 1 414 140' fill='none' stroke='%23dcecfb' stroke-opacity='.12' stroke-width='2' stroke-linecap='round'/%3E%3Ccircle cx='320' cy='230' r='93' fill='none' stroke='%234fb8ff' stroke-opacity='.12' stroke-width='15'/%3E%3Ccircle cx='320' cy='230' r='93' fill='none' stroke='%234fb8ff' stroke-opacity='.32' stroke-width='7'/%3E%3Ccircle cx='320' cy='230' r='93' fill='none' stroke='%23bfe4ff' stroke-opacity='.95' stroke-width='2'/%3E%3Cpath d='M254 168 A93 93 0 0 1 386 168' fill='none' stroke='%23ffffff' stroke-opacity='.5' stroke-width='2' stroke-linecap='round'/%3E%3Ccircle cx='320' cy='230' r='86' fill='%2304060c' stroke='%23283349' stroke-width='2.5'/%3E%3Ccircle cx='320' cy='230' r='83' fill='none' stroke='%23000' stroke-opacity='.7' stroke-width='2'/%3E%3Ccircle cx='320' cy='230' r='80' fill='url(%23dome)'/%3E%3Cpath d='M320 152 A78 78 0 0 1 391 205' fill='none' stroke='url(%23glass)' stroke-width='20' stroke-linecap='round' opacity='.7'/%3E%3Ccircle cx='320' cy='230' r='80' fill='url(%23glass)'/%3E%3Ccircle cx='320' cy='230' r='72' fill='none' stroke='%23ff9d3f' stroke-opacity='.16' stroke-width='9'/%3E%3Ccircle cx='320' cy='230' r='72' fill='none' stroke='%23ffb054' stroke-opacity='.55' stroke-width='3' stroke-dasharray='294 158' transform='rotate(-92 320 230)'/%3E%3Ccircle cx='320' cy='230' r='72' fill='none' stroke='%23ffe0b0' stroke-opacity='.9' stroke-width='1.4' stroke-dasharray='294 158' transform='rotate(-92 320 230)'/%3E%3Ccircle cx='265' cy='274' r='3.4' fill='%23fff2dc'/%3E%3Ccircle cx='265' cy='274' r='6' fill='%23ffb054' opacity='.4'/%3E%3Ctext x='320' y='184' text-anchor='middle' font-family='Arial,Helvetica,sans-serif' font-weight='bold' font-size='11.5' letter-spacing='4' fill='%23ff5340' fill-opacity='.92'%3EMASTER%3C/text%3E%3Ctext x='320' y='245' text-anchor='middle' font-family='Arial,Helvetica,sans-serif' font-weight='bold' font-size='49' letter-spacing='0' fill='%23ff5c24' opacity='.35'%3E126.0%3C/text%3E%3Ctext x='320' y='243' text-anchor='middle' font-family='Arial,Helvetica,sans-serif' font-weight='bold' font-size='49' letter-spacing='0' fill='%23ffbf6a'%3E126.0%3C/text%3E%3Ctext x='320' y='226' text-anchor='middle' font-family='Arial,Helvetica,sans-serif' font-weight='bold' font-size='49' letter-spacing='0' fill='%23fff' opacity='.12'%3E126.0%3C/text%3E%3Ctext x='320' y='265' text-anchor='middle' font-family='Arial,Helvetica,sans-serif' font-weight='bold' font-size='10.5' letter-spacing='6' fill='%23ffb054' fill-opacity='.6'%3EBPM%3C/text%3E%3Ctext x='320' y='287' text-anchor='middle' font-family='Arial,Helvetica,sans-serif' font-size='12' letter-spacing='1' fill='%234fb8ff' fill-opacity='.85'%3E%2B0.00%25%3C/text%3E%3Cellipse cx='294' cy='182' rx='40' ry='16' fill='%23dcecfb' opacity='.06' transform='rotate(-24 294 182)'/%3E%3Ccircle cx='95' cy='249' rx='44' ry='34' fill='url(%23hal)'/%3E%3Crect x='63' y='217' width='64' height='64' rx='11' fill='%23000' opacity='.5'/%3E%3Crect x='64' y='218' width='62' height='62' rx='10' fill='url(%23cuebtn)'/%3E%3Crect x='67' y='220' width='56' height='26' rx='7' fill='%23fff' opacity='.22'/%3E%3Crect x='64' y='218' width='62' height='62' rx='10' fill='none' stroke='%23ffe6c2' stroke-opacity='.5'/%3E%3Ctext x='95' y='255' text-anchor='middle' font-family='Arial,Helvetica,sans-serif' font-weight='bold' font-size='14' letter-spacing='2' fill='%233a2408'%3ECUE%3C/text%3E%3Crect x='63' y='299' width='64' height='64' rx='11' fill='%23000' opacity='.5'/%3E%3Crect x='64' y='300' width='62' height='62' rx='10' fill='url(%23plybtn)'/%3E%3Crect x='67' y='302' width='56' height='26' rx='7' fill='%23fff' opacity='.24'/%3E%3Crect x='64' y='300' width='62' height='62' rx='10' fill='none' stroke='%23cfeaff' stroke-opacity='.5'/%3E%3Cpath d='M86 317 L86 345 L112 331 Z' fill='%230d2740'/%3E%3Cpath d='M84 315 L84 343 L110 329 Z' fill='%23eaf6ff'/%3E%3Cellipse cx='184' cy='378' rx='28' ry='15' fill='%23ffb054' opacity='.2'/%3E%3Cellipse cx='310' cy='378' rx='28' ry='15' fill='%234fb8ff' opacity='.16'/%3E%3Cg%3E%3Crect x='210' y='363' width='32' height='27' rx='5' fill='%23090d14' stroke='%231d2534'/%3E%3Crect x='212' y='365' width='28' height='11' rx='3' fill='%23fff' opacity='.05'/%3E%3Crect x='252' y='363' width='32' height='27' rx='5' fill='%23090d14' stroke='%231d2534'/%3E%3Crect x='254' y='365' width='28' height='11' rx='3' fill='%23fff' opacity='.05'/%3E%3Crect x='336' y='363' width='32' height='27' rx='5' fill='%23090d14' stroke='%231d2534'/%3E%3Crect x='338' y='365' width='28' height='11' rx='3' fill='%23fff' opacity='.05'/%3E%3Crect x='378' y='363' width='32' height='27' rx='5' fill='%23090d14' stroke='%231d2534'/%3E%3Crect x='380' y='365' width='28' height='11' rx='3' fill='%23fff' opacity='.05'/%3E%3Crect x='420' y='363' width='32' height='27' rx='5' fill='%23090d14' stroke='%231d2534'/%3E%3Crect x='422' y='365' width='28' height='11' rx='3' fill='%23fff' opacity='.05'/%3E%3Crect x='462' y='363' width='32' height='27' rx='5' fill='%23090d14' stroke='%231d2534'/%3E%3Crect x='464' y='365' width='28' height='11' rx='3' fill='%23fff' opacity='.05'/%3E%3C/g%3E%3Crect x='168' y='363' width='32' height='27' rx='5' fill='url(%23padA)'/%3E%3Crect x='170' y='365' width='28' height='11' rx='3' fill='%23fff' opacity='.28'/%3E%3Crect x='294' y='363' width='32' height='27' rx='5' fill='url(%23padB)'/%3E%3Crect x='296' y='365' width='28' height='11' rx='3' fill='%23fff' opacity='.28'/%3E%3Cg stroke='%23e9f1f7' stroke-opacity='.14' stroke-width='1.4'%3E%3Cpath d='M500 116 L510 116'/%3E%3Cpath d='M500 134 L510 134'/%3E%3Cpath d='M500 152 L510 152'/%3E%3Cpath d='M500 170 L510 170'/%3E%3Cpath d='M500 188 L510 188'/%3E%3Cpath d='M500 224 L510 224'/%3E%3Cpath d='M500 242 L510 242'/%3E%3Cpath d='M500 260 L510 260'/%3E%3Cpath d='M500 278 L510 278'/%3E%3Cpath d='M500 296 L510 296'/%3E%3Cpath d='M500 314 L510 314'/%3E%3C/g%3E%3Crect x='494' y='204' width='19' height='4' rx='1' fill='%23ff5340' opacity='.22'/%3E%3Crect x='497' y='205' width='13' height='2' fill='%23ff7060'/%3E%3Ctext x='522' y='120' font-family='Arial,Helvetica,sans-serif' font-size='9' fill='%234fb8ff' fill-opacity='.55'%3E%2B%3C/text%3E%3Ctext x='522' y='318' font-family='Arial,Helvetica,sans-serif' font-size='11' fill='%23ffb054' fill-opacity='.55'%3E-%3C/text%3E%3Crect x='514' y='108' width='7' height='214' rx='3.5' fill='%2302040a' stroke='%23000' stroke-opacity='.6'/%3E%3Crect x='515.5' y='108' width='2' height='214' fill='%236f86a8' opacity='.12'/%3E%3Crect x='515' y='206' width='4' height='4' rx='1' fill='%23ff9d3f' opacity='.7'/%3E%3Crect x='496' y='227' width='42' height='22' rx='4' fill='url(%23faderc)' stroke='%23000' stroke-opacity='.5'/%3E%3Crect x='497' y='228' width='40' height='7' rx='3' fill='%23fff' opacity='.18'/%3E%3Crect x='496' y='237' width='42' height='2' fill='%23f2f6fa' opacity='.9'/%3E%3Crect x='500' y='231' width='34' height='1.5' rx='.7' fill='%23000' opacity='.4'/%3E%3Crect x='515' y='237' width='4' height='2' fill='%23bfe4ff' opacity='.8'/%3E%3Cellipse cx='150' cy='92' rx='120' ry='10' fill='%23cfe4fb' opacity='.05'/%3E%3Ccircle cx='261' cy='179' r='8.4' fill='%23dff0ff' opacity='.9'/%3E%3Ccircle cx='261' cy='179' r='17.0' fill='%23dff0ff' opacity='.22'/%3E%3Cpath d='M261 159 L263.2 179 L261 199 L258.8 179 Z' fill='%23eaf6ff' opacity='.85'/%3E%3Cpath d='M241 179 L261 176.8 L281 179 L261 181.2 Z' fill='%23eaf6ff' opacity='.85'/%3E%3Ccircle cx='110' cy='228' r='5.5' fill='%23fff2dc' opacity='.9'/%3E%3Ccircle cx='110' cy='228' r='11.0' fill='%23fff2dc' opacity='.22'/%3E%3Cpath d='M110 215 L111.8 228 L110 241 L108.2 228 Z' fill='%23fff7ea' opacity='.85'/%3E%3Cpath d='M97 228 L110 226.2 L123 228 L110 229.8 Z' fill='%23fff7ea' opacity='.85'/%3E%3Ccircle cx='372' cy='166' r='6.3' fill='%23eef6ff' opacity='.9'/%3E%3Ccircle cx='372' cy='166' r='12.8' fill='%23eef6ff' opacity='.22'/%3E%3Cpath d='M372 151 L373.9 166 L372 181 L370.1 166 Z' fill='%23f6fbff' opacity='.85'/%3E%3Cpath d='M357 166 L372 164.1 L387 166 L372 167.9 Z' fill='%23f6fbff' opacity='.85'/%3E%3C/svg%3E");
}

/* ═══ jog position marker — the ONE continuous mover (256px box, well
   under the ~300px cap; will-change budget 1 of 2). A thin amber needle
   with a soft glow plus a dim counterweight dot, welded to the platter
   center of html::after (box math: jog center sits 248px from the right
   edge, 170px up). One revolution every 4s — a platter at rest speed. ═══ */
head { display: var(--cdj-scenery, block); }
head::before {
  content: "";
  display: var(--cdj-scenery, block);
  position: fixed;
  right: 120px;
  bottom: 42px;
  width: 256px;
  height: 256px;
  z-index: 0;
  pointer-events: none;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cpath d='M128 14 L128 40' stroke='%23ffb054' stroke-opacity='.25' stroke-width='7' stroke-linecap='round'/%3E%3Cpath d='M128 14 L128 40' stroke='%23ffd9a0' stroke-opacity='.95' stroke-width='2.5' stroke-linecap='round'/%3E%3Ccircle cx='128' cy='236' r='2.5' fill='%23ffb054' opacity='.35'/%3E%3C/svg%3E") center / contain no-repeat;
  will-change: transform;
  animation: cdj-spin 4s linear infinite;
}

/* ═══ THE MIXER — bottom-left, cropped by both edges: two channel strips
   (EQ knobs with amber position marks, fader slots with scale ticks),
   channel one still up, channel two already pulled down — the set IS
   ending. Master VU columns hold a dim resting state (the loud state
   lives on the meta#1 overlay). Amber top rim from the console glow,
   blue kiss on its right edge from the laptop. STATIC, promoted. ═══ */
head::after {
  content: "";
  display: var(--cdj-scenery, block);
  position: fixed;
  left: 0;
  bottom: 0;
  width: 320px;
  height: 280px;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 280'%3E%3Cdefs%3E%3ClinearGradient id='pn' x1='.1' y1='0' x2='.5' y2='1'%3E%3Cstop offset='0' stop-color='%2318202e'/%3E%3Cstop offset='.4' stop-color='%230e131d'/%3E%3Cstop offset='1' stop-color='%2306080d'/%3E%3C/linearGradient%3E%3ClinearGradient id='ptop' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%232c3a52'/%3E%3Cstop offset='1' stop-color='%23141a26'/%3E%3C/linearGradient%3E%3CradialGradient id='kn' cx='.38' cy='.28' r='.9'%3E%3Cstop offset='0' stop-color='%23445269'/%3E%3Cstop offset='.42' stop-color='%23252e3f'/%3E%3Cstop offset='.8' stop-color='%23111622'/%3E%3Cstop offset='1' stop-color='%23080b12'/%3E%3C/radialGradient%3E%3CradialGradient id='kncap' cx='.4' cy='.28' r='.82'%3E%3Cstop offset='0' stop-color='%23708aab'/%3E%3Cstop offset='.14' stop-color='%235a6b88'/%3E%3Cstop offset='.5' stop-color='%232b3648'/%3E%3Cstop offset='.82' stop-color='%23161d2a'/%3E%3Cstop offset='1' stop-color='%230e131d'/%3E%3C/radialGradient%3E%3ClinearGradient id='amb' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23ff9d3f' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23ff9d3f' stop-opacity='.1'/%3E%3C/linearGradient%3E%3ClinearGradient id='cp2' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23c9d6e6'/%3E%3Cstop offset='.14' stop-color='%233c4a5e'/%3E%3Cstop offset='.5' stop-color='%23222c3d'/%3E%3Cstop offset='1' stop-color='%230b0f18'/%3E%3C/linearGradient%3E%3ClinearGradient id='vum' x1='0' y1='1' x2='0' y2='0'%3E%3Cstop offset='0' stop-color='%23ffb054'/%3E%3Cstop offset='.7' stop-color='%23ffcf87'/%3E%3Cstop offset='1' stop-color='%23fff'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cellipse cx='130' cy='274' rx='140' ry='7' fill='%23000000' opacity='.55'/%3E%3Crect x='-30' y='40' width='320' height='244' rx='18' fill='%2303050a'/%3E%3Crect x='-28' y='42' width='316' height='240' rx='16' fill='url(%23pn)'/%3E%3Crect x='-28' y='42' width='316' height='30' rx='16' fill='url(%23ptop)' opacity='.55'/%3E%3Crect x='150' y='42' width='138' height='240' rx='16' fill='url(%23amb)'/%3E%3Cpath d='M-16 43 L286 43' stroke='%23aacdf2' stroke-opacity='.42' stroke-width='1.6' stroke-linecap='round'/%3E%3Cpath d='M285 60 L285 280' stroke='%238cbef0' stroke-opacity='.16' stroke-width='1.6'/%3E%3Cpath d='M100 58 L100 276' stroke='%23000' stroke-opacity='.4'/%3E%3Cpath d='M101 58 L101 276' stroke='%236f86a8' stroke-opacity='.1'/%3E%3Cpath d='M180 58 L180 276' stroke='%23000' stroke-opacity='.4'/%3E%3Cpath d='M181 58 L181 276' stroke='%236f86a8' stroke-opacity='.1'/%3E%3Cg%3E%3Cg%3E%3Ccircle cx='58' cy='74' r='12' fill='url(%23kn)'/%3E%3Ccircle cx='58' cy='73' r='8.5' fill='url(%23kncap)' stroke='%23000' stroke-opacity='.3'/%3E%3Cpath d='M58 73 L52 66' stroke='%23ffb054' stroke-opacity='.8' stroke-width='2.2' stroke-linecap='round'/%3E%3Ccircle cx='54.5' cy='69.5' r='1.6' fill='%23eaf3ff' opacity='.5'/%3E%3C/g%3E%3Cg%3E%3Ccircle cx='140' cy='74' r='12' fill='url(%23kn)'/%3E%3Ccircle cx='140' cy='73' r='8.5' fill='url(%23kncap)' stroke='%23000' stroke-opacity='.3'/%3E%3Cpath d='M140 73 L146 66' stroke='%23ffb054' stroke-opacity='.8' stroke-width='2.2' stroke-linecap='round'/%3E%3Ccircle cx='136.5' cy='69.5' r='1.6' fill='%23eaf3ff' opacity='.5'/%3E%3C/g%3E%3Cg%3E%3Ccircle cx='58' cy='110' r='12' fill='url(%23kn)'/%3E%3Ccircle cx='58' cy='109' r='8.5' fill='url(%23kncap)' stroke='%23000' stroke-opacity='.3'/%3E%3Cpath d='M58 109 L50 107' stroke='%23ffb054' stroke-opacity='.8' stroke-width='2.2' stroke-linecap='round'/%3E%3Ccircle cx='54.5' cy='105.5' r='1.6' fill='%23eaf3ff' opacity='.5'/%3E%3C/g%3E%3Cg%3E%3Ccircle cx='140' cy='110' r='12' fill='url(%23kn)'/%3E%3Ccircle cx='140' cy='109' r='8.5' fill='url(%23kncap)' stroke='%23000' stroke-opacity='.3'/%3E%3Cpath d='M140 109 L148 107' stroke='%23ffb054' stroke-opacity='.8' stroke-width='2.2' stroke-linecap='round'/%3E%3Ccircle cx='136.5' cy='105.5' r='1.6' fill='%23eaf3ff' opacity='.5'/%3E%3C/g%3E%3Cg%3E%3Ccircle cx='58' cy='146' r='12' fill='url(%23kn)'/%3E%3Ccircle cx='58' cy='145' r='8.5' fill='url(%23kncap)' stroke='%23000' stroke-opacity='.3'/%3E%3Cpath d='M58 145 L52 152' stroke='%234fb8ff' stroke-opacity='.75' stroke-width='2.2' stroke-linecap='round'/%3E%3Ccircle cx='54.5' cy='141.5' r='1.6' fill='%23eaf3ff' opacity='.5'/%3E%3C/g%3E%3Cg%3E%3Ccircle cx='140' cy='146' r='12' fill='url(%23kn)'/%3E%3Ccircle cx='140' cy='145' r='8.5' fill='url(%23kncap)' stroke='%23000' stroke-opacity='.3'/%3E%3Cpath d='M140 145 L134 152' stroke='%234fb8ff' stroke-opacity='.75' stroke-width='2.2' stroke-linecap='round'/%3E%3Ccircle cx='136.5' cy='141.5' r='1.6' fill='%23eaf3ff' opacity='.5'/%3E%3C/g%3E%3C/g%3E%3Ctext x='58' y='176' text-anchor='middle' font-family='Arial,Helvetica,sans-serif' font-size='9' letter-spacing='2' fill='%23e9f1f7' fill-opacity='.28'%3ECH 1%3C/text%3E%3Ctext x='140' y='176' text-anchor='middle' font-family='Arial,Helvetica,sans-serif' font-size='9' letter-spacing='2' fill='%23e9f1f7' fill-opacity='.28'%3ECH 2%3C/text%3E%3Cg stroke='%23e9f1f7' stroke-opacity='.12'%3E%3Cpath d='M40 188 L50 188'/%3E%3Cpath d='M40 200 L50 200'/%3E%3Cpath d='M40 212 L50 212'/%3E%3Cpath d='M40 224 L50 224'/%3E%3Cpath d='M40 236 L50 236'/%3E%3Cpath d='M40 248 L50 248'/%3E%3Cpath d='M40 260 L50 260'/%3E%3Cpath d='M122 188 L132 188'/%3E%3Cpath d='M122 200 L132 200'/%3E%3Cpath d='M122 212 L132 212'/%3E%3Cpath d='M122 224 L132 224'/%3E%3Cpath d='M122 236 L132 236'/%3E%3Cpath d='M122 248 L132 248'/%3E%3Cpath d='M122 260 L132 260'/%3E%3C/g%3E%3Crect x='56.5' y='184' width='3' height='86' rx='1.5' fill='%2302040a'/%3E%3Crect x='57.4' y='184' width='1' height='86' fill='%236f86a8' opacity='.14'/%3E%3Crect x='138.5' y='184' width='3' height='86' rx='1.5' fill='%2302040a'/%3E%3Crect x='139.4' y='184' width='1' height='86' fill='%236f86a8' opacity='.14'/%3E%3Cg%3E%3Crect x='38' y='193' width='40' height='17' rx='3' fill='%23000' opacity='.4'/%3E%3Crect x='38' y='192' width='40' height='17' rx='3' fill='url(%23cp2)' stroke='%23000' stroke-opacity='.4'/%3E%3Crect x='40' y='193' width='36' height='6' rx='2' fill='%23fff' opacity='.2'/%3E%3Crect x='38' y='200' width='40' height='1.8' fill='%23fff' opacity='.6'/%3E%3C/g%3E%3Cg%3E%3Crect x='120' y='251' width='40' height='17' rx='3' fill='%23000' opacity='.4'/%3E%3Crect x='120' y='250' width='40' height='17' rx='3' fill='url(%23cp2)' stroke='%23000' stroke-opacity='.4' opacity='.9'/%3E%3Crect x='122' y='251' width='36' height='6' rx='2' fill='%23fff' opacity='.14'/%3E%3Crect x='120' y='258' width='40' height='1.8' fill='%23fff' opacity='.4'/%3E%3C/g%3E%3Ctext x='240' y='58' text-anchor='middle' font-family='Arial,Helvetica,sans-serif' font-size='8' letter-spacing='2' fill='%23e9f1f7' fill-opacity='.3'%3EMASTER%3C/text%3E%3Cellipse cx='241' cy='118' rx='34' ry='58' fill='%23ffb054' opacity='.07'/%3E%3Crect x='218' y='70' width='19' height='100' rx='2.5' fill='%23010308'/%3E%3Crect x='218.5' y='70.5' width='18' height='99' rx='2.2' fill='none' stroke='%23000000' stroke-opacity='.6'/%3E%3Crect x='246' y='70' width='19' height='100' rx='2.5' fill='%23010308'/%3E%3Crect x='246.5' y='70.5' width='18' height='99' rx='2.2' fill='none' stroke='%23000000' stroke-opacity='.6'/%3E%3Crect x='220' y='160' width='15' height='7' rx='1' fill='%234fe08a'/%3E%3Crect x='220' y='160' width='15' height='2' rx='1' fill='%23ffffff' opacity='0.28'/%3E%3Crect x='220' y='150' width='15' height='7' rx='1' fill='%234fe08a'/%3E%3Crect x='220' y='150' width='15' height='2' rx='1' fill='%23ffffff' opacity='0.28'/%3E%3Crect x='220' y='140' width='15' height='7' rx='1' fill='%234fe08a'/%3E%3Crect x='220' y='140' width='15' height='2' rx='1' fill='%23ffffff' opacity='0.28'/%3E%3Crect x='220' y='130' width='15' height='7' rx='1' fill='%234fe08a'/%3E%3Crect x='220' y='130' width='15' height='2' rx='1' fill='%23ffffff' opacity='0.28'/%3E%3Crect x='220' y='120' width='15' height='7' rx='1' fill='%234fe08a'/%3E%3Crect x='220' y='120' width='15' height='2' rx='1' fill='%23ffffff' opacity='0.28'/%3E%3Crect x='220' y='110' width='15' height='7' rx='1' fill='%23ffb054'/%3E%3Crect x='220' y='110' width='15' height='2' rx='1' fill='%23ffffff' opacity='0.28'/%3E%3Crect x='220' y='100' width='15' height='7' rx='1' fill='%23ffb054'/%3E%3Crect x='220' y='100' width='15' height='2' rx='1' fill='%23ffffff' opacity='0.28'/%3E%3Crect x='220' y='90' width='15' height='7' rx='1' fill='%23ffb054'/%3E%3Crect x='220' y='90' width='15' height='2' rx='1' fill='%23ffffff' opacity='0.28'/%3E%3Crect x='220' y='80' width='15' height='7' rx='1' fill='%23200f0e'/%3E%3Crect x='220' y='70' width='15' height='7' rx='1' fill='%23200f0e'/%3E%3Crect x='248' y='160' width='15' height='7' rx='1' fill='%234fe08a'/%3E%3Crect x='248' y='160' width='15' height='2' rx='1' fill='%23ffffff' opacity='0.28'/%3E%3Crect x='248' y='150' width='15' height='7' rx='1' fill='%234fe08a'/%3E%3Crect x='248' y='150' width='15' height='2' rx='1' fill='%23ffffff' opacity='0.28'/%3E%3Crect x='248' y='140' width='15' height='7' rx='1' fill='%234fe08a'/%3E%3Crect x='248' y='140' width='15' height='2' rx='1' fill='%23ffffff' opacity='0.28'/%3E%3Crect x='248' y='130' width='15' height='7' rx='1' fill='%234fe08a'/%3E%3Crect x='248' y='130' width='15' height='2' rx='1' fill='%23ffffff' opacity='0.28'/%3E%3Crect x='248' y='120' width='15' height='7' rx='1' fill='%234fe08a'/%3E%3Crect x='248' y='120' width='15' height='2' rx='1' fill='%23ffffff' opacity='0.28'/%3E%3Crect x='248' y='110' width='15' height='7' rx='1' fill='%23ffb054'/%3E%3Crect x='248' y='110' width='15' height='2' rx='1' fill='%23ffffff' opacity='0.28'/%3E%3Crect x='248' y='100' width='15' height='7' rx='1' fill='%23191410'/%3E%3Crect x='248' y='90' width='15' height='7' rx='1' fill='%23191410'/%3E%3Crect x='248' y='80' width='15' height='7' rx='1' fill='%23200f0e'/%3E%3Crect x='248' y='70' width='15' height='7' rx='1' fill='%23200f0e'/%3E%3Ctext x='240' y='210' text-anchor='middle' font-family='Arial,Helvetica,sans-serif' font-size='7.5' letter-spacing='2' fill='%23e9f1f7' fill-opacity='.24'%3ECROSSFADER%3C/text%3E%3Crect x='202' y='224' width='76' height='14' rx='4' fill='%2302040a' stroke='%23000' stroke-opacity='.4'/%3E%3Crect x='234' y='220' width='16' height='22' rx='3' fill='url(%23cp2)' stroke='%23000' stroke-opacity='.4'/%3E%3Crect x='236' y='221' width='12' height='7' rx='2' fill='%23fff' opacity='.18'/%3E%3Crect x='234' y='230' width='16' height='1.6' fill='%23fff' opacity='.5'/%3E%3C/svg%3E") left bottom / 320px 280px no-repeat;
}

/* ═══ VU overlay — the loud state of the master meters, welded over the
   columns of head::after (46x100 box at the mixer's meter geometry).
   steps(1) opacity between held levels: 5 changes per 1.8s ≈ 2.8
   paints/s — a small fixed corner box, L2-legal, no will-change. ═══ */
head meta { display: var(--cdj-scenery, block); }
head meta:first-of-type::before {
  content: "";
  display: var(--cdj-scenery, block);
  position: fixed;
  left: 218px;
  bottom: 110px;
  width: 47px;
  height: 100px;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 47 100'%3E%3Cdefs%3E%3C/defs%3E%3Crect x='2' y='90' width='15' height='7' rx='1' fill='%236effa0'/%3E%3Crect x='2' y='90' width='15' height='2' rx='1' fill='%23ffffff' opacity='.34'/%3E%3Crect x='2' y='80' width='15' height='7' rx='1' fill='%236effa0'/%3E%3Crect x='2' y='80' width='15' height='2' rx='1' fill='%23ffffff' opacity='.34'/%3E%3Crect x='2' y='70' width='15' height='7' rx='1' fill='%23ffcf87'/%3E%3Crect x='2' y='70' width='15' height='2' rx='1' fill='%23ffffff' opacity='.34'/%3E%3Crect x='2' y='60' width='15' height='7' rx='1' fill='%23ffcf87'/%3E%3Crect x='2' y='60' width='15' height='2' rx='1' fill='%23ffffff' opacity='.34'/%3E%3Crect x='2' y='50' width='15' height='7' rx='1' fill='%23ffe6bf'/%3E%3Crect x='2' y='50' width='15' height='2' rx='1' fill='%23ffffff' opacity='.34'/%3E%3Crect x='2' y='40' width='15' height='7' rx='1' fill='%23ffe6bf'/%3E%3Crect x='2' y='40' width='15' height='2' rx='1' fill='%23ffffff' opacity='.34'/%3E%3Crect x='2' y='30' width='15' height='7' rx='1' fill='%23ff6a58'/%3E%3Crect x='2' y='30' width='15' height='2' rx='1' fill='%23ffffff' opacity='.34'/%3E%3Crect x='2' y='20' width='15' height='7' rx='1' fill='%23ff6a58'/%3E%3Crect x='2' y='20' width='15' height='2' rx='1' fill='%23ffffff' opacity='.34'/%3E%3Crect x='30' y='90' width='15' height='7' rx='1' fill='%236effa0'/%3E%3Crect x='30' y='90' width='15' height='2' rx='1' fill='%23ffffff' opacity='.34'/%3E%3Crect x='30' y='80' width='15' height='7' rx='1' fill='%236effa0'/%3E%3Crect x='30' y='80' width='15' height='2' rx='1' fill='%23ffffff' opacity='.34'/%3E%3Crect x='30' y='70' width='15' height='7' rx='1' fill='%23ffcf87'/%3E%3Crect x='30' y='70' width='15' height='2' rx='1' fill='%23ffffff' opacity='.34'/%3E%3Crect x='30' y='60' width='15' height='7' rx='1' fill='%23ffcf87'/%3E%3Crect x='30' y='60' width='15' height='2' rx='1' fill='%23ffffff' opacity='.34'/%3E%3Crect x='30' y='50' width='15' height='7' rx='1' fill='%23ffe6bf'/%3E%3Crect x='30' y='50' width='15' height='2' rx='1' fill='%23ffffff' opacity='.34'/%3E%3Crect x='30' y='40' width='15' height='7' rx='1' fill='%23ffe6bf'/%3E%3Crect x='30' y='40' width='15' height='2' rx='1' fill='%23ffffff' opacity='.34'/%3E%3C/svg%3E") center / contain no-repeat;
  animation: cdj-vu 1.8s steps(1, end) infinite;
}

/* ═══ headphones hung on the booth rail, upper-left — closed cans at a
   tired angle, blue rim light down their left edges from the laptop, one
   amber glint off the console, cable coiling toward the floor. STATIC. ═══ */
head meta:first-of-type::after {
  content: "";
  display: var(--cdj-scenery, block);
  position: fixed;
  left: 0;
  top: 0;
  width: 150px;
  height: 210px;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 210'%3E%3Cdefs%3E%3CradialGradient id='cup' cx='.36' cy='.32' r='.8'%3E%3Cstop offset='0' stop-color='%23273040'/%3E%3Cstop offset='.5' stop-color='%23161d2a'/%3E%3Cstop offset='1' stop-color='%2307090f'/%3E%3C/radialGradient%3E%3CradialGradient id='cush' cx='.5' cy='.5' r='.5'%3E%3Cstop offset='0' stop-color='%2305070c'/%3E%3Cstop offset='.72' stop-color='%230a0e16'/%3E%3Cstop offset='1' stop-color='%23222b3a'/%3E%3C/radialGradient%3E%3ClinearGradient id='band' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23222b3c'/%3E%3Cstop offset='1' stop-color='%230c111b'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='0' y='5' width='150' height='11' fill='%230d1118'/%3E%3Crect x='0' y='5' width='150' height='4' fill='%236f86a8' opacity='.2'/%3E%3Cpath d='M0 6.5 L150 6.5' stroke='%23aacdf2' stroke-opacity='.4' stroke-width='1.4'/%3E%3Cpath d='M72 16 L72 34 Q72 45 82 45' stroke='%23141a26' stroke-width='6' fill='none' stroke-linecap='round'/%3E%3Cpath d='M72 16 L72 33' stroke='%238cbef0' stroke-opacity='.24' stroke-width='1.4'/%3E%3Cpath d='M42 100 Q75 30 108 100' stroke='url(%23band)' stroke-width='13' fill='none' stroke-linecap='round'/%3E%3Cpath d='M41 98 Q75 26 109 98' stroke='%23aacdf2' stroke-opacity='.5' stroke-width='2.4' fill='none' stroke-linecap='round'/%3E%3Cpath d='M43 100 Q75 34 107 100' stroke='%23000' stroke-opacity='.4' stroke-width='2' fill='none' stroke-dasharray='1 6' stroke-linecap='round'/%3E%3Cpath d='M42 98 L39 116 M108 98 L111 116' stroke='%23141a26' stroke-width='5' stroke-linecap='round'/%3E%3Cg transform='rotate(-6 75 124)'%3E%3Cellipse cx='40' cy='128' rx='20' ry='26' fill='%2305070c'/%3E%3Cellipse cx='40' cy='127' rx='19' ry='25' fill='url(%23cush)'/%3E%3Cellipse cx='40' cy='126' rx='12' ry='17' fill='url(%23cup)'/%3E%3Cellipse cx='36' cy='120' rx='4' ry='6' fill='%23aacdf2' opacity='.16'/%3E%3Cpath d='M23 110 Q16 127 23 145' stroke='%239ecdf5' stroke-opacity='.65' stroke-width='2.4' fill='none'/%3E%3Ccircle cx='49' cy='143' r='2.2' fill='%23ffcf87'/%3E%3Ccircle cx='49' cy='143' r='4' fill='%23ffb054' opacity='.4'/%3E%3Cellipse cx='110' cy='128' rx='20' ry='26' fill='%2305070c'/%3E%3Cellipse cx='110' cy='127' rx='19' ry='25' fill='url(%23cush)' opacity='.94'/%3E%3Cellipse cx='110' cy='126' rx='12' ry='17' fill='url(%23cup)' opacity='.92'/%3E%3Cpath d='M97 112 Q90 127 97 143' stroke='%238cbef0' stroke-opacity='.34' stroke-width='2' fill='none'/%3E%3C/g%3E%3Cpath d='M40 152 C33 172 58 176 49 194 C45 203 39 205 46 210' stroke='%23111621' stroke-width='3.4' fill='none'/%3E%3Cpath d='M38 154 C33 170 55 174 48 188' stroke='%238cbef0' stroke-opacity='.26' stroke-width='1.1' fill='none'/%3E%3C/svg%3E") center / contain no-repeat;
}

/* ═══ the laptop — the booth's blue light source, left edge, mid-height.
   Screen tilted toward the decks with two coarse waveform bands (amber
   deck A over blue deck B, chunky blocks only) and a hot playhead; stand
   legs; keyboard deck falling into shadow. The blue wash of html::before
   radiates from exactly here. STATIC, z:-1 (haze may drift across). ═══ */
head meta:last-of-type::before {
  content: "";
  display: var(--cdj-scenery, block);
  position: fixed;
  left: -26px;
  top: 32vh;
  width: 240px;
  height: 220px;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 220'%3E%3Cdefs%3E%3CradialGradient id='sg' cx='.5' cy='.45' r='.55'%3E%3Cstop offset='0' stop-color='%234fb8ff' stop-opacity='.18'/%3E%3Cstop offset='.6' stop-color='%234fb8ff' stop-opacity='.05'/%3E%3Cstop offset='1' stop-color='%234fb8ff' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='scr' x1='0' y1='0' x2='.4' y2='1'%3E%3Cstop offset='0' stop-color='%23112238'/%3E%3Cstop offset='1' stop-color='%23081226'/%3E%3C/linearGradient%3E%3ClinearGradient id='lid' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%231a2434'/%3E%3Cstop offset='.5' stop-color='%23111826'/%3E%3Cstop offset='1' stop-color='%230a0e18'/%3E%3C/linearGradient%3E%3ClinearGradient id='kb' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%231b2434'/%3E%3Cstop offset='1' stop-color='%2307090f'/%3E%3C/linearGradient%3E%3ClinearGradient id='ah' x1='0' y1='1' x2='0' y2='0'%3E%3Cstop offset='0' stop-color='%23ff8a2e'/%3E%3Cstop offset='1' stop-color='%23ffd9a0'/%3E%3C/linearGradient%3E%3ClinearGradient id='bh' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%237fccff'/%3E%3Cstop offset='1' stop-color='%232f7fd0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cellipse cx='108' cy='80' rx='128' ry='94' fill='url(%23sg)'/%3E%3Cellipse cx='108' cy='212' rx='78' ry='7' fill='%23000000' opacity='.5'/%3E%3Cpath d='M58 210 L96 150 M152 206 L120 150' stroke='%2305070c' stroke-width='7' stroke-linecap='round'/%3E%3Cpath d='M52 188 L156 184' stroke='%2307090f' stroke-width='6' stroke-linecap='round'/%3E%3Cpath d='M53 187 L155 183' stroke='%236f86a8' stroke-opacity='.18' stroke-width='1.4'/%3E%3Cpolygon points='28,146 192,110 216,140 50,182' fill='url(%23kb)'/%3E%3Cpath d='M50 182 L216 140' stroke='%234fb8ff' stroke-opacity='.28' stroke-width='1.4'/%3E%3Cg stroke='%236f86a8' stroke-opacity='.16' stroke-width='1'%3E%3Cpath d='M58 168 L196 137'/%3E%3Cpath d='M62 176 L200 145'/%3E%3C/g%3E%3Cg fill='%236f86a8' opacity='.1'%3E%3Crect x='60' y='159' width='9' height='5' transform='skewX(-18)'/%3E%3C/g%3E%3Cpolygon points='18,30 196,12 202,120 26,148' fill='%230b1018' stroke='%234fb8ff' stroke-opacity='.4' stroke-width='1.6'/%3E%3Cpolygon points='26,37 188,21 193,113 34,138' fill='url(%23scr)'/%3E%3Cpath d='M27 38 L188 22' stroke='%237fccff' stroke-opacity='.35' stroke-width='1'/%3E%3Cg%3E%3Crect x='42' y='52' width='2' height='7' fill='url(%23ah)'/%3E%3Crect x='47' y='49' width='2' height='10' fill='url(%23ah)'/%3E%3Crect x='52' y='54' width='2' height='5' fill='url(%23ah)'/%3E%3Crect x='57' y='47' width='2' height='12' fill='url(%23ah)'/%3E%3Crect x='62' y='51' width='2' height='8' fill='url(%23ah)'/%3E%3Crect x='67' y='45' width='2' height='14' fill='url(%23ah)'/%3E%3Crect x='72' y='50' width='2' height='9' fill='url(%23ah)'/%3E%3Crect x='77' y='53' width='2' height='6' fill='url(%23ah)'/%3E%3Crect x='82' y='46' width='2' height='13' fill='url(%23ah)'/%3E%3Crect x='87' y='49' width='2' height='10' fill='url(%23ah)'/%3E%3Crect x='97' y='51' width='2' height='8' fill='url(%23ah)'/%3E%3Crect x='102' y='47' width='2' height='12' fill='url(%23ah)'/%3E%3Crect x='107' y='53' width='2' height='6' fill='url(%23ah)'/%3E%3Crect x='112' y='48' width='2' height='11' fill='url(%23ah)'/%3E%3Crect x='117' y='44' width='2' height='15' fill='url(%23ah)'/%3E%3Crect x='122' y='50' width='2' height='9' fill='url(%23ah)'/%3E%3Crect x='127' y='46' width='2' height='13' fill='url(%23ah)'/%3E%3Crect x='132' y='52' width='2' height='7' fill='url(%23ah)'/%3E%3Crect x='137' y='48' width='2' height='11' fill='url(%23ah)'/%3E%3Crect x='142' y='51' width='2' height='8' fill='url(%23ah)'/%3E%3Crect x='147' y='47' width='2' height='12' fill='url(%23ah)'/%3E%3Crect x='152' y='53' width='2' height='6' fill='url(%23ah)'/%3E%3Crect x='157' y='50' width='2' height='9' fill='url(%23ah)'/%3E%3Crect x='162' y='49' width='2' height='10' fill='url(%23ah)'/%3E%3Crect x='167' y='52' width='2' height='7' fill='url(%23ah)'/%3E%3Crect x='172' y='51' width='2' height='8' fill='url(%23ah)'/%3E%3C/g%3E%3Cg%3E%3Crect x='42' y='75' width='2' height='6' fill='url(%23bh)'/%3E%3Crect x='47' y='72' width='2' height='9' fill='url(%23bh)'/%3E%3Crect x='52' y='77' width='2' height='4' fill='url(%23bh)'/%3E%3Crect x='57' y='70' width='2' height='11' fill='url(%23bh)'/%3E%3Crect x='62' y='74' width='2' height='7' fill='url(%23bh)'/%3E%3Crect x='67' y='71' width='2' height='10' fill='url(%23bh)'/%3E%3Crect x='72' y='76' width='2' height='5' fill='url(%23bh)'/%3E%3Crect x='77' y='73' width='2' height='8' fill='url(%23bh)'/%3E%3Crect x='82' y='69' width='2' height='12' fill='url(%23bh)'/%3E%3Crect x='87' y='75' width='2' height='6' fill='url(%23bh)'/%3E%3Crect x='97' y='72' width='2' height='9' fill='url(%23bh)'/%3E%3Crect x='102' y='76' width='2' height='5' fill='url(%23bh)'/%3E%3Crect x='107' y='70' width='2' height='11' fill='url(%23bh)'/%3E%3Crect x='112' y='74' width='2' height='7' fill='url(%23bh)'/%3E%3Crect x='117' y='71' width='2' height='10' fill='url(%23bh)'/%3E%3Crect x='122' y='77' width='2' height='4' fill='url(%23bh)'/%3E%3Crect x='127' y='73' width='2' height='8' fill='url(%23bh)'/%3E%3Crect x='132' y='75' width='2' height='6' fill='url(%23bh)'/%3E%3Crect x='137' y='72' width='2' height='9' fill='url(%23bh)'/%3E%3Crect x='142' y='76' width='2' height='5' fill='url(%23bh)'/%3E%3Crect x='147' y='70' width='2' height='11' fill='url(%23bh)'/%3E%3Crect x='152' y='74' width='2' height='7' fill='url(%23bh)'/%3E%3Crect x='157' y='73' width='2' height='8' fill='url(%23bh)'/%3E%3Crect x='162' y='75' width='2' height='6' fill='url(%23bh)'/%3E%3Crect x='167' y='72' width='2' height='9' fill='url(%23bh)'/%3E%3Crect x='172' y='76' width='2' height='5' fill='url(%23bh)'/%3E%3C/g%3E%3Crect x='91' y='40' width='2.4' height='58' fill='%23fff' opacity='.7'/%3E%3Crect x='90' y='40' width='4.4' height='58' fill='%237fccff' opacity='.28'/%3E%3Crect x='34' y='100' width='150' height='30' fill='%234fb8ff' opacity='.03'/%3E%3C/svg%3E") center / contain no-repeat;
}

/* ═══ master beat LED on the mixer — one amber dot pulsing the downbeat
   at 126 BPM (two soft pulses per 1.9s bar ≈ 2 paints/s; tiny fixed box,
   steps, no will-change). Pure CSS gradient, no SVG needed. ═══ */
head meta:last-of-type::after {
  content: "";
  display: var(--cdj-scenery, block);
  position: fixed;
  left: 230px;
  bottom: 210px;
  width: 20px;
  height: 20px;
  z-index: 0;
  pointer-events: none;
  opacity: 0.25;
  background: radial-gradient(circle at 50% 50%, #ffd9a0 0 3px, rgba(255, 176, 84, 0.7) 6px, rgba(255, 176, 84, 0) 10px);
  animation: cdj-beat 1.905s steps(1, end) infinite;
}

/* ═══ booth recorder, top-right: still rolling at 03:12:44 (the outro
   card saves this exact file). Static chip — red dot, mono readout.
   (the <link> void element must itself be display:block for its pseudo
   to render; it still paints nothing of its own) ═══ */
head link:first-of-type { display: var(--cdj-scenery, block); }
head link:first-of-type::before {
  content: "";
  display: var(--cdj-scenery, block);
  position: fixed;
  right: 26px;
  top: 18px;
  width: 150px;
  height: 40px;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 40'%3E%3Crect x='1' y='1' width='148' height='38' rx='6' fill='%2306080d' opacity='.85' stroke='%231b2331'/%3E%3Ccircle cx='22' cy='20' r='10' fill='%23ff5340' opacity='.22'/%3E%3Ccircle cx='22' cy='20' r='5' fill='%23ff5340'/%3E%3Ccircle cx='20.5' cy='18.5' r='1.5' fill='%23ffd9d4' opacity='.8'/%3E%3Ctext x='40' y='25' font-family='Arial,Helvetica,sans-serif' font-weight='bold' font-size='13' letter-spacing='1.5' fill='%23e9f1f7' fill-opacity='.8'%3EREC 03:12:44%3C/text%3E%3C/svg%3E") center / contain no-repeat;
}

/* ═══ booth haze: three huge soft wisps in the gear light — blue near the
   laptop, amber near the console. Viewport-sized, so steps(1): one hop
   per 4.5s, texture cached between hops. Overscan hides the hops. ═══ */
body::before {
  content: "";
  display: var(--cdj-scenery, block);
  position: fixed;
  top: 0;
  bottom: 0;
  left: -20vw;
  right: -20vw;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(ellipse 34vw 13vh at 26% 40%, rgba(140, 190, 240, 0.055), rgba(140, 190, 240, 0) 70%),
    radial-gradient(ellipse 40vw 12vh at 70% 74%, rgba(255, 190, 120, 0.05), rgba(255, 190, 120, 0) 72%),
    radial-gradient(ellipse 28vw 10vh at 52% 22%, rgba(140, 190, 240, 0.04), rgba(140, 190, 240, 0) 70%);
  animation: cdj-haze 36s steps(1, end) infinite;
}

/* ═══ the lane: names must survive both LED washes, so the center column
   gets a quiet near-black scrim — coarse, soft, STATIC. It lets go before
   the mixer on the left and the CDJ on the right keep their light. ═══ */
body::after {
  content: "";
  display: var(--cdj-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background: linear-gradient(90deg,
    rgba(3, 4, 9, 0) 13%, rgba(3, 4, 9, 0.42) 32%, rgba(3, 4, 9, 0.5) 50%,
    rgba(3, 4, 9, 0.42) 68%, rgba(3, 4, 9, 0) 87%);
}

/* ═══ waveform rails — the rekordbox strip, twice, riding the roll at
   +-372px so it moves WITH the names (fine pattern on the sanctioned
   carrier; static screen furniture in slideshow). A mirrored 3-band
   envelope around a dim spine: amber mids up top, hot amber-white cores,
   cool blue bass mirrored below, and blue beat-grid bars every 90px. The
   rails are softly masked at their column ends so they dissolve into the
   lane instead of pasting on. ═══ */
.credits-roll::before,
.credits-slideshow::before {
  content: "";
  display: var(--cdj-scenery, block);
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.66;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 360'%3E%3Cdefs%3E%3ClinearGradient id='hi' x1='0' y1='1' x2='0' y2='0'%3E%3Cstop offset='0' stop-color='%23ff8a2e'/%3E%3Cstop offset='.55' stop-color='%23ffb054'/%3E%3Cstop offset='1' stop-color='%23ffe6bf'/%3E%3C/linearGradient%3E%3ClinearGradient id='lo' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%234fb8ff'/%3E%3Cstop offset='1' stop-color='%232f7fd0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%234fb8ff' opacity='.2'%3E%3Crect x='0' y='0' width='40' height='2.2'/%3E%3Crect x='0' y='90' width='40' height='2.2'/%3E%3Crect x='0' y='180' width='40' height='2.2'/%3E%3Crect x='0' y='270' width='40' height='2.2'/%3E%3C/g%3E%3Cg id='wv'%3E%3Crect x='19' y='6' width='2' height='9' fill='url(%23hi)'/%3E%3Crect x='19' y='15' width='2' height='7' fill='url(%23lo)' opacity='.7'/%3E%3Crect x='16' y='9' width='2' height='6' fill='url(%23hi)'/%3E%3Crect x='16' y='15' width='2' height='4' fill='url(%23lo)' opacity='.6'/%3E%3Crect x='22' y='9' width='2' height='6' fill='url(%23hi)'/%3E%3Crect x='22' y='15' width='2' height='4' fill='url(%23lo)' opacity='.6'/%3E%3Crect x='13' y='3' width='2' height='12' fill='url(%23hi)'/%3E%3Crect x='13' y='15' width='2' height='9' fill='url(%23lo)' opacity='.7'/%3E%3Crect x='25' y='4' width='2' height='11' fill='url(%23hi)'/%3E%3Crect x='25' y='15' width='2' height='8' fill='url(%23lo)' opacity='.7'/%3E%3Crect x='10' y='7' width='2' height='8' fill='url(%23hi)'/%3E%3Crect x='10' y='15' width='2' height='5' fill='url(%23lo)' opacity='.55'/%3E%3Crect x='28' y='8' width='2' height='7' fill='url(%23hi)'/%3E%3Crect x='28' y='15' width='2' height='4' fill='url(%23lo)' opacity='.55'/%3E%3Crect x='7' y='11' width='2' height='4' fill='url(%23hi)' opacity='.8'/%3E%3Crect x='31' y='10' width='2' height='5' fill='url(%23hi)' opacity='.8'/%3E%3C/g%3E%3Cg%3E%3Cuse href='%23wv' transform='translate(0 20.4) scale(1 .7)'/%3E%3Cuse href='%23wv' transform='translate(0 51) scale(1 .5)'/%3E%3Cuse href='%23wv' transform='translate(0 78) scale(1 .85)'/%3E%3Cuse href='%23wv' transform='translate(0 105) scale(1 1.25)'/%3E%3Cuse href='%23wv' transform='translate(0 150) scale(1 1)'/%3E%3Cuse href='%23wv' transform='translate(0 189) scale(1 .6)'/%3E%3Cuse href='%23wv' transform='translate(0 213) scale(1 1.2)'/%3E%3Cuse href='%23wv' transform='translate(0 258) scale(1 .95)'/%3E%3Cuse href='%23wv' transform='translate(0 294) scale(1 .55)'/%3E%3Cuse href='%23wv' transform='translate(0 321) scale(1 .8)'/%3E%3C/g%3E%3Crect x='19.4' y='0' width='1.2' height='360' fill='%23ffe6bf' opacity='.16'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 360'%3E%3Cdefs%3E%3ClinearGradient id='hi' x1='0' y1='1' x2='0' y2='0'%3E%3Cstop offset='0' stop-color='%23ff8a2e'/%3E%3Cstop offset='.55' stop-color='%23ffb054'/%3E%3Cstop offset='1' stop-color='%23ffe6bf'/%3E%3C/linearGradient%3E%3ClinearGradient id='lo' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%234fb8ff'/%3E%3Cstop offset='1' stop-color='%232f7fd0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%234fb8ff' opacity='.2'%3E%3Crect x='0' y='45' width='40' height='2.2'/%3E%3Crect x='0' y='135' width='40' height='2.2'/%3E%3Crect x='0' y='225' width='40' height='2.2'/%3E%3Crect x='0' y='315' width='40' height='2.2'/%3E%3C/g%3E%3Cg id='wu'%3E%3Crect x='19' y='4' width='2' height='11' fill='url(%23hi)'/%3E%3Crect x='19' y='15' width='2' height='8' fill='url(%23lo)' opacity='.7'/%3E%3Crect x='16' y='7' width='2' height='8' fill='url(%23hi)'/%3E%3Crect x='16' y='15' width='2' height='5' fill='url(%23lo)' opacity='.6'/%3E%3Crect x='22' y='6' width='2' height='9' fill='url(%23hi)'/%3E%3Crect x='22' y='15' width='2' height='6' fill='url(%23lo)' opacity='.6'/%3E%3Crect x='13' y='10' width='2' height='5' fill='url(%23hi)'/%3E%3Crect x='13' y='15' width='2' height='3' fill='url(%23lo)' opacity='.55'/%3E%3Crect x='25' y='9' width='2' height='6' fill='url(%23hi)'/%3E%3Crect x='25' y='15' width='2' height='4' fill='url(%23lo)' opacity='.6'/%3E%3Crect x='10' y='11' width='2' height='4' fill='url(%23hi)' opacity='.85'/%3E%3Crect x='28' y='5' width='2' height='10' fill='url(%23hi)'/%3E%3Crect x='28' y='15' width='2' height='7' fill='url(%23lo)' opacity='.65'/%3E%3Crect x='7' y='12' width='2' height='3' fill='url(%23hi)' opacity='.7'/%3E%3Crect x='31' y='8' width='2' height='7' fill='url(%23hi)' opacity='.85'/%3E%3C/g%3E%3Cg%3E%3Cuse href='%23wu' transform='translate(0 21) scale(1 .6)'/%3E%3Cuse href='%23wu' transform='translate(0 45) scale(1 1.2)'/%3E%3Cuse href='%23wu' transform='translate(0 87) scale(1 .9)'/%3E%3Cuse href='%23wu' transform='translate(0 111) scale(1 1.3)'/%3E%3Cuse href='%23wu' transform='translate(0 156) scale(1 .7)'/%3E%3Cuse href='%23wu' transform='translate(0 183) scale(1 1.05)'/%3E%3Cuse href='%23wu' transform='translate(0 222) scale(1 .5)'/%3E%3Cuse href='%23wu' transform='translate(0 249) scale(1 1.15)'/%3E%3Cuse href='%23wu' transform='translate(0 291) scale(1 .85)'/%3E%3Cuse href='%23wu' transform='translate(0 318) scale(1 .95)'/%3E%3C/g%3E%3Crect x='19.4' y='0' width='1.2' height='360' fill='%23ffe6bf' opacity='.16'/%3E%3C/svg%3E");
  background-position: calc(50% - 372px) 0, calc(50% + 372px) 0;
  background-repeat: repeat-y, repeat-y;
  background-size: 40px 360px, 40px 360px;
  -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 8% 92%, transparent 100%);
  mask-image: linear-gradient(90deg, transparent 0, #000 8% 92%, transparent 100%);
}

/* ═══ section titles: LED display modules. Rajdhani caps in a bezel with
   an inner glow, a deck eyebrow above, and a played-position bar below —
   DECK A runs amber and 62% through its track, DECK B holds blue at 38%.
   Parity counts <section>s, so intro = 1, first block = 2 (even = A). ═══ */
.credits-block__title {
  position: relative;
  width: fit-content;
  max-width: 86vw;
  margin: 0 auto 1.5rem;
  padding: 0.26em 0.85em 0.34em;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: var(--cdj-amber-hi);
  background: rgba(7, 9, 15, 0.88);
  border: 1px solid rgba(255, 167, 46, 0.4);
  border-radius: 4px;
  box-shadow: inset 0 0 22px rgba(255, 157, 63, 0.09), 0 0 26px rgba(255, 157, 63, 0.12);
  text-shadow: 0 0 18px rgba(255, 176, 84, 0.45), var(--credits-shadow);
}
.credits-block__title::before {
  content: "DECK A ▸ LIVE";
  position: absolute;
  left: 50%;
  bottom: calc(100% + 0.7em);
  transform: translateX(-50%);
  width: max-content;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.66rem;
  letter-spacing: 0.5em;
  padding-left: 0.5em;
  color: var(--cdj-amber);
  text-shadow: 0 0 12px rgba(255, 176, 84, 0.4), var(--credits-shadow);
  opacity: 0.9;
}
/* played-position bar replaces the base gold rule */
.credits-block__title::after {
  width: 100%;
  height: 3px;
  margin: 0.5em 0 0;
  opacity: 1;
  background: linear-gradient(90deg, rgba(255, 176, 84, 0.75) 0 62%, rgba(255, 176, 84, 0.14) 62% 100%);
}

/* DECK B — the odd blocks are cued on the cold channel */
.credits-block:nth-of-type(odd) .credits-block__title,
.credits-slide:nth-of-type(odd) .credits-block__title {
  color: var(--cdj-blue-dim);
  border-color: rgba(79, 184, 255, 0.38);
  box-shadow: inset 0 0 22px rgba(79, 184, 255, 0.08), 0 0 26px rgba(79, 184, 255, 0.1);
  text-shadow: 0 0 18px rgba(79, 184, 255, 0.4), var(--credits-shadow);
}
.credits-block:nth-of-type(odd) .credits-block__title::before,
.credits-slide:nth-of-type(odd) .credits-block__title::before {
  content: "DECK B ● CUED";
  color: var(--cdj-blue);
  text-shadow: 0 0 12px rgba(79, 184, 255, 0.4), var(--credits-shadow);
}
.credits-block:nth-of-type(odd) .credits-block__title::after,
.credits-slide:nth-of-type(odd) .credits-block__title::after {
  background: linear-gradient(90deg, rgba(79, 184, 255, 0.7) 0 38%, rgba(79, 184, 255, 0.14) 38% 100%);
}

/* ═══ rows: the crate. Every name is a track — a dim blue track number
   leads, the name plays in cool white mono, and a key/BPM tag follows in
   a small amber chip (harmonic-key fiction cycling by row position —
   content-agnostic; custom credit types inherit everything). ═══ */
.credits-block__list { counter-reset: cdj-track; }
.credit {
  counter-increment: cdj-track;
  max-width: min(44rem, 92vw);
  margin-inline: auto;
  min-width: 0;
  overflow-wrap: anywhere;
  font-weight: 500;
  letter-spacing: 0.01em;
  line-height: 1.6;
}
.credit::before {
  content: counter(cdj-track, decimal-leading-zero);
  font-size: 0.68em;
  font-weight: 400;
  letter-spacing: 0.08em;
  color: rgba(79, 184, 255, 0.55);
  margin-right: 0.9em;
  vertical-align: 0.12em;
}
.credit__name {
  color: #f2f7fb;
  text-shadow: 0 0 14px rgba(140, 190, 240, 0.12), var(--credits-shadow);
}
.credit__name::after {
  content: "8A · 126";
  font-family: var(--credits-font);
  font-size: 0.6em;
  font-weight: 400;
  letter-spacing: 0.12em;
  color: rgba(255, 176, 84, 0.8);
  border: 1px solid rgba(255, 167, 46, 0.28);
  border-radius: 2px;
  padding: 0.08em 0.5em 0.1em;
  margin-left: 0.85em;
  vertical-align: 0.22em;
  white-space: nowrap;
}
.credit:nth-child(5n + 2) .credit__name::after { content: "5A · 124"; }
.credit:nth-child(5n + 3) .credit__name::after { content: "11B · 127"; }
.credit:nth-child(5n + 4) .credit__name::after { content: "3A · 125"; }
.credit:nth-child(5n) .credit__name::after { content: "9B · 128"; }

/* amounts read off the LED meter — amber, tabular, gently lit */
.credit__amount {
  opacity: 1;
  font-size: 0.78em;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--cdj-amber-hi);
  font-variant-numeric: tabular-nums;
  text-shadow: 0 0 12px rgba(255, 176, 84, 0.3), var(--credits-shadow);
}
.credit__amount::before {
  content: " / ";
  font-weight: 400;
  color: rgba(233, 241, 247, 0.3);
}

/* ═══ flourish cards ═══ */
.flourish--intro { gap: 1.3rem; }

/* badge -> the booth status chip (copy swap via font-size:0 + ::after) */
.flourish__badge { font-size: 0; border: 0; border-radius: 0; padding: 0; box-shadow: none; }
.flourish__badge::after {
  content: "ON DECK — CLOSING SET";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 0.4em;
  padding: 0.55em 0.9em 0.55em 1.3em;
  color: var(--cdj-amber);
  border: 1px solid rgba(255, 167, 46, 0.5);
  border-radius: 3px;
  background: rgba(255, 157, 63, 0.06);
  box-shadow: 0 0 20px rgba(255, 157, 63, 0.16), inset 0 0 14px rgba(255, 157, 63, 0.07);
  text-shadow: 0 0 12px rgba(255, 176, 84, 0.45);
}

/* the streamer's title: restyle only — tall Rajdhani caps, cool white with
   the blue screen-light in its halo */
.flourish__title {
  font-weight: 700;
  letter-spacing: 0.06em;
  line-height: 1.05;
  color: #f4f8fc;
  text-shadow: 0 0 38px rgba(79, 184, 255, 0.35), 0 0 10px rgba(79, 184, 255, 0.18), var(--credits-shadow);
}
/* wrap guard for long streamer titles — intro only (the outro title is
   font-size:0 for the copy swap, so an em max-width there collapses to 0) */
.flourish--intro .flourish__title { max-width: min(90vw, 14em); }

/* streamer tagline: restyle only — a quiet line off the monitor */
.flourish__tagline {
  font-family: var(--credits-font);
  font-style: normal;
  font-size: 0.92rem;
  letter-spacing: 0.24em;
  padding-left: 0.24em;
  text-transform: lowercase;
  color: rgba(121, 199, 255, 0.75);
}

/* rating -> the DJ's oath (copy swap) */
.flourish__rating { font-size: 0; border: 0; padding: 0; opacity: 1; }
.flourish__rating::after {
  content: "SYNC OFF — BEATMATCHED BY HAND";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  padding: 0.5em 0.8em 0.5em 1.1em;
  color: var(--cdj-blue-dim);
  border: 1px solid rgba(79, 184, 255, 0.4);
  border-radius: 3px;
  text-shadow: 0 0 10px rgba(79, 184, 255, 0.4);
}

/* rider fine print under the intro card */
.flourish--intro::after {
  content: "2x cdj-3000 · djm-900nxs2 · master tempo off · 126.0 bpm";
  display: var(--cdj-scenery, block);
  font-family: var(--credits-font);
  font-size: 0.62rem;
  letter-spacing: 0.3em;
  padding-left: 0.3em;
  text-transform: lowercase;
  color: rgba(233, 241, 247, 0.4);
}

/* outro: SET OVER — the amber master takes the last word (copy swap). Cast in
   brushed gold: a vertical metal gradient (dark base -> hot amber -> a bright
   specular band near the top -> pale gold) clipped to the glyphs, with a soft
   amber bloom via drop-shadow. Static specular = always L6-safe. */
.flourish--outro .flourish__title { font-size: 0; }
.flourish--outro .flourish__title::after {
  content: "SET OVER";
  font-family: var(--credits-title-font);
  font-weight: 700;
  font-size: var(--credits-flourish-title-size);
  letter-spacing: 0.08em;
  line-height: 1.05;
  color: var(--cdj-amber-hi);
  /* the metal: a dark base rising through hot amber to a bright specular band
     just above centre, then falling to pale gold — the classic gold-bar sheen.
     A second, tighter white stop reads as the raised specular ridge. */
  background: linear-gradient(177deg,
    #ffd98f 0%, #ffbf6a 15%, #f0993c 30%,
    #ffcf87 42%, #fff4dc 47.5%, #ffffff 50%, #ffe9bc 52.5%,
    #ffb457 64%, #e89334 80%, #b56d22 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  filter:
    drop-shadow(0 0 36px rgba(255, 176, 84, 0.5))
    drop-shadow(0 0 11px rgba(255, 208, 130, 0.42))
    drop-shadow(0 2px 6px rgba(2, 4, 9, 0.9));
}
.flourish--outro .flourish__tagline { font-size: 0; }
.flourish--outro .flourish__tagline::after {
  content: "link up next week — same booth, same tempo";
  font-family: var(--credits-font);
  font-size: 0.9rem;
  letter-spacing: 0.22em;
  padding-left: 0.22em;
  color: rgba(121, 199, 255, 0.7);
}
/* the recorder saves the night (matches the top-right chip's clock) */
.flourish--outro::after {
  content: "■ rec stopped — 03:12:44 saved";
  display: var(--cdj-scenery, block);
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.66rem;
  letter-spacing: 0.34em;
  padding: 0.5em 0.7em 0.5em 1.04em;
  margin-top: 0.5rem;
  color: rgba(255, 83, 64, 0.85);
  border: 1px solid rgba(255, 83, 64, 0.4);
  border-radius: 3px;
  text-shadow: 0 0 10px rgba(255, 83, 64, 0.4);
}

/* ═══ raid finale: MASTER OUT — the raid mix leaves on the main bus.
   Declared after the deck parity so it wins the cascade. The eyebrow goes
   clip-red and breathes on steps (~1.3 paints/s — the only animation
   inside the roll, under the 2/s ceiling); the module runs hot amber and
   its track bar pins full into the red. ═══ */
.credits-block:nth-last-of-type(2) {
  background: radial-gradient(ellipse 56% 62% at 50% 36%, rgba(255, 157, 63, 0.11), rgba(255, 157, 63, 0) 74%);
}
.credits-slide:nth-last-of-type(2):not(.flourish) {
  background: radial-gradient(ellipse 62% 58% at 50% 46%, rgba(255, 157, 63, 0.1), rgba(255, 157, 63, 0) 80%);
}
.credits-block:nth-last-of-type(2) .credits-block__title,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
  color: var(--cdj-amber-hi);
  border-color: rgba(255, 90, 64, 0.5);
  box-shadow: inset 0 0 24px rgba(255, 130, 60, 0.12), 0 0 32px rgba(255, 130, 60, 0.16);
  text-shadow: 0 0 22px rgba(255, 176, 84, 0.55), var(--credits-shadow);
}
.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  content: "MASTER OUT — RAID MIX";
  color: #ff6a58;
  text-shadow: 0 0 14px rgba(255, 83, 64, 0.55), var(--credits-shadow);
  animation: cdj-clip 3s steps(1, end) infinite;
}
.credits-block:nth-last-of-type(2) .credits-block__title::after,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::after {
  background: linear-gradient(90deg, rgba(255, 176, 84, 0.85) 0 82%, rgba(255, 83, 64, 0.85) 82% 100%);
}
.credits-block:nth-last-of-type(2) .credit,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit {
  font-size: calc(var(--credits-name-size) * 1.1);
}
.credits-block:nth-last-of-type(2) .credit__name,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__name {
  text-shadow: 0 0 18px rgba(255, 176, 84, 0.35), var(--credits-shadow);
}

/* ═══ slideshow: slides nudge in like a crossfader throw ═══ */
.credits-slide {
  transform: translateX(26px);
  transition: opacity 0.85s ease, transform 0.95s cubic-bezier(0.22, 1, 0.36, 1);
}
.credits-slide.is-active { transform: none; }

/* ═══ keyframes (all cdj- prefixed; transform/opacity ONLY) ═══ */
/* the platter: one lazy revolution per 4s, dead constant */
@keyframes cdj-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
/* master VU: five held levels per 1.8s bar — program material, not strobe */
@keyframes cdj-vu {
  0%   { opacity: 0.85; }
  18%  { opacity: 0.3; }
  38%  { opacity: 0.65; }
  60%  { opacity: 0.15; }
  78%  { opacity: 0.5; }
  100% { opacity: 0.85; }
}
/* beat LED: the downbeat lands, decays, echoes on the 3 — 126 BPM bar */
@keyframes cdj-beat {
  0%   { opacity: 1; }
  24%  { opacity: 0.35; }
  50%  { opacity: 0.7; }
  74%  { opacity: 0.35; }
  100% { opacity: 1; }
}
/* booth haze: eight held postures over 36s = one hop per 4.5s */
@keyframes cdj-haze {
  0%    { transform: translate3d(0, 0, 0); }
  12.5% { transform: translate3d(1.8vw, -0.6vh, 0); }
  25%   { transform: translate3d(3.2vw, -1.2vh, 0); }
  37.5% { transform: translate3d(1.6vw, -1.8vh, 0); }
  50%   { transform: translate3d(-0.8vw, -1.2vh, 0); }
  62.5% { transform: translate3d(-2.6vw, -0.4vh, 0); }
  75%   { transform: translate3d(-1.8vw, 0.6vh, 0); }
  87.5% { transform: translate3d(0.4vw, 0.4vh, 0); }
  100%  { transform: translate3d(0, 0, 0); }
}
/* clip warning on the finale eyebrow: 4 held levels per 3s ≈ 1.3 paints/s */
@keyframes cdj-clip {
  0%, 52%  { opacity: 1; }
  58%, 72% { opacity: 0.5; }
  78%, 88% { opacity: 1; }
  92%, 96% { opacity: 0.65; }
  100%     { opacity: 1; }
}

/* ═══ reduced motion: the booth idles — platter needle parks at ten past,
   VU holds a mid level, the beat LED burns steady, haze hangs, the clip
   light stops blinking, slides fall back to the base fade. ═══ */
@media (prefers-reduced-motion: reduce) {
  head::before { animation: none; transform: rotate(35deg); }
  head meta:first-of-type::before { animation: none; opacity: 0.45; }
  head meta:last-of-type::after { animation: none; opacity: 0.75; }
  body::before { animation: none; }
  .credits-block:nth-last-of-type(2) .credits-block__title::before,
  .credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
    animation: none;
  }
  .credits-slide { transform: none; transition: opacity 0.8s ease; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--cdj-scenery:none;}",
};
