import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. The Abyss: a crewed submersible at 3800 metres — near-black blue depth, a sonar ping walking the dark, marine snow riding the roll, and an anglerfish patrolling with its lure lit while the depth-gauge HUD counts the pressure. */
export const VARIANT: ThemeVariant = {
  key: "abyss",
  name: "The Abyss",
  css: `
/* ================================================================
   THE ABYSS — layered after the base theme.
   Fiction: 03:14, DEPTH 3800M. A crewed submersible hangs in the
   hadal dark off a rift wall. Nothing reaches down here but a
   dying green thread of surface light far above and the sub's own
   sonar, pinging the void from the lower-left emitter. A hydro-
   thermal vent smoulders orange on the seafloor. Marine snow — the
   endless drift of dead sea — sinks through the beam, and a lone
   anglerfish patrols the edge of the light, its lure a slow cold
   blink. The credits read like a dive manifest; the raids are
   LEVIATHAN SIGHTED, when the sonar goes hot; the sign-off is the
   ascent: surfacing, decompress slowly.
   Palette: near-black abyssal blue, cold cyan bioluminescence, a
   single warm vent ember. Typography: a technical grotesk for the
   HUD/manifest, cut with an italic serif for the spoken lines.
   Layer map (all scenery kill-switched via --abyss-scenery):
     html bg (--credits-bg)   6-stop depth gradient, black at the floor
     html::before             WATER COLUMN — surface light thread,
                              thermocline bands, pressure vignette.
                              STATIC, promoted
     html::after              SONAR — coarse ring pinging from the
                              lower-left emitter (steps, 1 ping / 2.6s)
     body::before             SEAFLOOR + hydrothermal vent SVG:
                              rift-wall silhouette, vent chimney with
                              an orange ember glow, settling snow pool.
                              STATIC, promoted
     body::after              center-lane readability scrim. STATIC
     head::before             THE ANGLERFISH — SVG silhouette, cold
                              rim light, patrolling via steps hops
                              (continuous-mover budget: 1)
     head::after              THE LURE — welded overlay on the same
                              patrol keyframe, steps() blink = the
                              esca pulsing in the dark
     head meta#1::before      DEPTH-GAUGE HUD — "DEPTH 3800 M" panel,
                              framed lower-right. STATIC
     head meta#1::after       the gauge's ones digit TICKING — steps
                              flicker, ~0.5 paints/s (depth breathing)
     head meta#2::before      PORTHOLE — thick pressure-hull rim
                              vignette pressing in at the edges.
                              STATIC, promoted
     head meta#2::after       a drifting SIPHONOPHORE far in the dark,
                              steps hops (1 hop / 2s, NOT a mover)
     .credits-roll::before    MARINE SNOW / plankton — the fine
     .credits-slideshow::before  pattern, so it RIDES THE ROLL (static)
   ================================================================ */
@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Spectral:ital,wght@0,400;1,400;1,500&display=swap');

:root {
  --abyss-scenery: block; /* set to none to strip every scenery layer */
  --abyss-cyan: #57e2f0;
  --abyss-cyan-bright: #a6f4fb;
  --abyss-cyan-dim: #2f8fa6;
  --abyss-ice: #dff3f7;
  --abyss-ember: #ff8a3c;
  --abyss-deep: #061622;
  --abyss-ink: #030a12;

  /* cheap depth: one 6-stop vertical gradient — a bruised blue just under
     the surface thread up top, falling through teal-black to true black at
     the hadal floor. The water-column texture lives on the promoted
     html::before (L3: --credits-bg stays a plain gradient). */
  --credits-bg: linear-gradient(180deg, #0a2436 0%, #072030 16%, #06192a 36%, #041322 56%, #030d1a 74%, #020810 88%, #010509 100%);
  --credits-color: var(--abyss-ice);
  --credits-accent: var(--abyss-cyan);
  --credits-font: "Chakra Petch", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  --credits-title-font: "Chakra Petch", "Segoe UI", Arial, sans-serif;
  --credits-title-size: clamp(1.3rem, 3.3vw, 2.05rem);
  --credits-name-size: clamp(1.02rem, 2.6vw, 1.5rem);
  --credits-flourish-title-size: clamp(2.2rem, 7.2vw, 4.5rem);
  --credits-block-gap: 5.25rem;
  --credits-name-gap: 0.66rem;
  --credits-shadow: 0 2px 14px rgba(1, 6, 12, 0.9);
  /* glow no-op — NEVER "none": base composes "var(--credits-glow),
     var(--credits-shadow)" and a "none" invalidates the whole list. */
  --credits-glow: 0 0 0 rgba(0, 0, 0, 0);
}

/* scenery is full-bleed: html drops the base edge-fade; body keeps it so the
   names still dissolve into the water at ceiling and floor. */
html { -webkit-mask-image: none; mask-image: none; }
body { background: transparent; counter-reset: abyss-dive; }

/* ═══ WATER COLUMN — one static promoted layer. A single thin green-cyan
   thread of surface light falls from top-center and dies out by mid-depth;
   two soft thermocline bands mark where the water changes temperature; the
   corners fall away into pressure dark. Every feature is huge and soft —
   nothing here can flicker against the glyph lane. ═══ */
html::before {
  content: "";
  display: var(--abyss-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* pressure vignette — the dark closes on the edges */
    radial-gradient(ellipse 150% 130% at 50% 30%, rgba(1, 5, 10, 0) 50%, rgba(1, 5, 10, 0.66) 100%),
    /* ═══ MID-WATER BIOLUMINESCENT GLINTS — coarse soft cyan blooms suspended in
       the dead middle band, OFF the center text lane (left ~20-30% and right
       ~70-82%). Each is a large diffuse glow (>=40px feature, no hard edge),
       STATIC, promoted — legal sparkle under L6 (a). They give the mid-frame
       depth and drifting-light interest without any fine screen-fixed pattern
       over the crawling names. ═══ */
    radial-gradient(circle 5vw at 21% 38%, rgba(120, 226, 240, 0.17), rgba(120, 226, 240, 0) 70%),
    radial-gradient(circle 3.4vw at 28% 54%, rgba(150, 236, 246, 0.14), rgba(150, 236, 246, 0) 68%),
    radial-gradient(circle 5.4vw at 79% 44%, rgba(110, 216, 232, 0.16), rgba(110, 216, 232, 0) 70%),
    radial-gradient(circle 3.8vw at 72% 61%, rgba(140, 232, 244, 0.13), rgba(140, 232, 244, 0) 68%),
    radial-gradient(circle 2.8vw at 15% 64%, rgba(170, 244, 250, 0.16), rgba(170, 244, 250, 0) 66%),
    radial-gradient(circle 2.6vw at 85% 67%, rgba(170, 244, 250, 0.15), rgba(170, 244, 250, 0) 66%),
    /* a tiny hot bioluminescent core in the center of the two nearest blooms —
       still coarse-soft (no hard edge), a brighter heart to the glow */
    radial-gradient(circle 1.2vw at 21% 38%, rgba(200, 250, 255, 0.14), rgba(200, 250, 255, 0) 72%),
    radial-gradient(circle 1.3vw at 79% 44%, rgba(200, 250, 255, 0.13), rgba(200, 250, 255, 0) 72%),
    /* GOD-RAYS — REBUILT as crisp volumetric shafts. Each ray now has a TIGHT
       bright core with hard-ish shoulders and CLEAN dark gaps between beams, so
       the fan reads as discrete crushed-light shafts instead of one grey cone.
       The wide muddy outriggers are gone. Every ray is coarse (>=40px feature),
       low-alpha, static, promoted — L6-legal — and each dies to zero by mid-depth
       under the vertical fade so the text lane stays clean.
       The fade goes CLEAN-DARK (near-zero cool tint) by the lane rather than the
       old grey wash that muddied the middle. */
    linear-gradient(180deg, rgba(2,9,16,0) 0%, rgba(2,9,16,0) 34%, rgba(2,10,18,0.62) 52%, rgba(2,8,15,0.99) 68%),
    /* ray 1 — steep, right-leaning, hot narrow core */
    linear-gradient(102deg, rgba(126,214,208,0) 47.4%, rgba(150,232,226,0.20) 49.2%, rgba(198,248,244,0.50) 50%, rgba(150,232,226,0.20) 50.8%, rgba(126,214,208,0) 52.6%) 40% -8% / 120% 130% no-repeat,
    /* ray 2 — near-vertical bright core, offset left of true center so it never
       forms a symmetric column behind the title */
    linear-gradient(96deg, rgba(140,226,220,0) 47.6%, rgba(168,238,232,0.22) 49.2%, rgba(214,252,248,0.52) 50%, rgba(168,238,232,0.22) 50.8%, rgba(140,226,220,0) 52.4%) 48% -8% / 104% 122% no-repeat,
    /* ray 3 — left-leaning, hot narrow core */
    linear-gradient(78deg, rgba(120,208,204,0) 47.4%, rgba(146,228,222,0.19) 49.2%, rgba(192,246,242,0.46) 50%, rgba(146,228,222,0.19) 50.8%, rgba(120,208,204,0) 52.6%) 60% -8% / 120% 130% no-repeat,
    /* ray 4 — a slimmer secondary shaft between 1 and 2, right of center */
    linear-gradient(99deg, rgba(120,206,204,0) 48%, rgba(150,230,226,0.14) 49.4%, rgba(180,242,238,0.30) 50%, rgba(150,230,226,0.14) 50.6%, rgba(120,206,204,0) 52%) 44% -9% / 128% 128% no-repeat,
    /* ray 5 — a slimmer secondary shaft, left of center */
    linear-gradient(81deg, rgba(116,202,200,0) 48%, rgba(146,226,222,0.13) 49.4%, rgba(176,240,236,0.28) 50%, rgba(146,226,222,0.13) 50.6%, rgba(116,202,200,0) 52%) 56% -9% / 128% 128% no-repeat,
    /* an even thinner far outrider each side to give the fan spread without haze */
    linear-gradient(107deg, rgba(104,196,198,0) 48.4%, rgba(140,224,220,0.10) 49.6%, rgba(160,232,228,0.20) 50%, rgba(140,224,220,0.10) 50.4%, rgba(104,196,198,0) 51.6%) 30% -10% / 140% 130% no-repeat,
    linear-gradient(73deg, rgba(104,196,198,0) 48.4%, rgba(140,224,220,0.10) 49.6%, rgba(160,232,228,0.20) 50%, rgba(140,224,220,0.10) 50.4%, rgba(104,196,198,0) 51.6%) 70% -10% / 140% 130% no-repeat,
    /* ambient surface bloom feeding the fan — a tight defined bright source top-center.
       Kept high and compact so the beams stay distinct below it instead of merging
       into a convergence blob behind the title. */
    radial-gradient(ellipse 20vw 13vh at 49% -5%, rgba(196, 246, 242, 0.42), rgba(150, 224, 218, 0.09) 54%, rgba(120, 208, 202, 0) 76%),
    radial-gradient(ellipse 44vw 32vh at 50% -16%, rgba(120, 208, 202, 0.085), rgba(120, 208, 202, 0) 70%),
    /* upper thermocline — a soft cool band, lifted well above the lane so it no
       longer draws a flat seam across the center text */
    linear-gradient(180deg, rgba(60, 150, 170, 0) 0%, rgba(60, 150, 170, 0.05) 46%, rgba(72, 168, 188, 0.075) 52%, rgba(60, 150, 170, 0.04) 60%, rgba(60, 150, 170, 0) 100%) 0 22vh / 100% 78px no-repeat;
}

/* ═══ SONAR — a single coarse ring expanding from the sub's emitter in the
   lower-left corner. steps(1) so the ring TELEPORTS between held radii —
   one ping walking outward every 2.6s, dark for the back half of the cycle
   so it reads as an instrument sweep, not decoration. The ring is a thick
   soft cyan stroke (coarse >= 40px feature), so even where it crosses the
   lane it is a broad low-alpha wash, never a hairline (L6-legal). z:-2 so
   it sits behind the seafloor and under all text. ═══ */
html::after {
  content: "";
  display: var(--abyss-scenery, block);
  position: fixed;
  left: -60vh;
  bottom: -60vh;
  width: 120vh;
  height: 120vh;
  z-index: -2;
  pointer-events: none;
  opacity: 0;
  transform-origin: 50% 50%;
  background:
    /* a broad soft cyan sweep ring (coarse >= 40px band — L6-legal) with a faint
       trailing inner ghost so the ping reads as a radar sweep, not a hairline */
    radial-gradient(circle at 50% 50%, rgba(87, 226, 240, 0) 42%, rgba(87, 226, 240, 0.08) 46%, rgba(120, 235, 246, 0.22) 50%, rgba(87, 226, 240, 0.09) 54%, rgba(87, 226, 240, 0) 59%),
    radial-gradient(circle at 50% 50%, rgba(87, 226, 240, 0) 34%, rgba(87, 226, 240, 0.06) 40%, rgba(87, 226, 240, 0.09) 43%, rgba(87, 226, 240, 0) 47%);
  animation: abyss-sonar 2.6s steps(1, end) infinite;
}

/* ═══ SEAFLOOR + HYDROTHERMAL VENT — one wide SVG band along the bottom:
   a jagged rift-wall silhouette rising on the right, a vent chimney with
   its own orange ember glow (the only warmth down here), scattered rocks
   and a few tube-worm clusters catching cold cyan rim light. Above it in
   the same layer: the cool pool where the surface thread lands on the
   sediment; below the chimney: the warm ember seep. STATIC, promoted. ═══ */
body::before {
  content: "";
  display: var(--abyss-scenery, block);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 26vh;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* SONAR EMITTER origin — a small static cyan glow pinned to the lower-left
       corner (the sub's transducer) so the expanding ping visibly emanates from
       a source instead of appearing as a free-floating glint. */
    radial-gradient(circle 30px at 2% 96%, rgba(120, 235, 246, 0.32) 0%, rgba(87, 226, 240, 0.12) 40%, rgba(87, 226, 240, 0) 78%) no-repeat,
    /* the vent ember seep — a warm column of heat-shimmer bleeding up off the
       black-smoker throat (registered to the new chimney tip ~61% across) */
    radial-gradient(ellipse 150px 150px at 61% 30%, rgba(255, 150, 74, 0.22) 0%, rgba(255, 120, 50, 0.08) 44%, rgba(255, 120, 50, 0) 74%) no-repeat,
    radial-gradient(ellipse 220px 96px at 61% 44%, rgba(255, 138, 60, 0.28) 0%, rgba(255, 120, 50, 0.1) 48%, rgba(255, 120, 50, 0) 74%) no-repeat,
    /* cool floor pool where the surface thread reaches the sediment */
    radial-gradient(ellipse 340px 60px at 40% 62%, rgba(90, 190, 205, 0.1) 0%, rgba(90, 190, 205, 0) 72%) no-repeat,
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 240' preserveAspectRatio='none'%3E%3Cdefs%3E%3ClinearGradient id='floor' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%230b1e2a'/%3E%3Cstop offset='1' stop-color='%23020608'/%3E%3C/linearGradient%3E%3ClinearGradient id='wallFar' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23163140' stop-opacity='.5'/%3E%3Cstop offset='1' stop-color='%230a1922' stop-opacity='.5'/%3E%3C/linearGradient%3E%3ClinearGradient id='wallMid' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%2311303f' stop-opacity='.82'/%3E%3Cstop offset='1' stop-color='%23051019' stop-opacity='.82'/%3E%3C/linearGradient%3E%3ClinearGradient id='wallNear' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23123647'/%3E%3Cstop offset='0.5' stop-color='%230a2130'/%3E%3Cstop offset='1' stop-color='%23020a11'/%3E%3C/linearGradient%3E%3ClinearGradient id='chim' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23081a20'/%3E%3Cstop offset='30%25' stop-color='%23112830'/%3E%3Cstop offset='55%25' stop-color='%2322160e'/%3E%3Cstop offset='78%25' stop-color='%233e2416'/%3E%3Cstop offset='100%25' stop-color='%23140b08'/%3E%3C/linearGradient%3E%3CradialGradient id='throat' cx='50%25' cy='36%25' r='68%25'%3E%3Cstop offset='0' stop-color='%23fff4dc' stop-opacity='1'/%3E%3Cstop offset='26%25' stop-color='%23ffbc66' stop-opacity='.88'/%3E%3Cstop offset='60%25' stop-color='%23ff7c30' stop-opacity='.5'/%3E%3Cstop offset='100%25' stop-color='%23ff6a1e' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='plume' cx='50%25' cy='100%25' r='80%25'%3E%3Cstop offset='0' stop-color='%232c1e13' stop-opacity='.62'/%3E%3Cstop offset='45%25' stop-color='%231a1510' stop-opacity='.3'/%3E%3Cstop offset='100%25' stop-color='%2312100c' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='vbase' cx='50%25' cy='100%25' r='70%25'%3E%3Cstop offset='0' stop-color='%23ff8a3c' stop-opacity='.42'/%3E%3Cstop offset='60%25' stop-color='%23c85a24' stop-opacity='.12'/%3E%3Cstop offset='100%25' stop-color='%23c85a24' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='ventwash' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23ff8a3c' stop-opacity='.20'/%3E%3Cstop offset='55%25' stop-color='%23e0662a' stop-opacity='.06'/%3E%3Cstop offset='100%25' stop-color='%23c85a24' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M0 182 Q90 168 190 176 Q280 183 360 172 Q450 160 540 174 L600 168 L600 240 L0 240 Z' fill='url(%23wallFar)'/%3E%3Cpath d='M960 168 Q1050 150 1140 160 Q1240 172 1330 150 Q1430 128 1520 150 Q1570 160 1600 150 L1600 240 L960 240 Z' fill='url(%23wallFar)'/%3E%3Cpath d='M1020 176 Q1070 150 1110 158 Q1150 120 1210 138 Q1250 96 1300 130 Q1350 92 1410 128 Q1470 88 1530 122 Q1570 104 1600 118 L1600 240 L1020 240 Z' fill='url(%23wallMid)'/%3E%3Cg fill='none' stroke='%231d4552' stroke-opacity='.28' stroke-width='1.1' stroke-linecap='round'%3E%3Cpath d='M1120 170 Q1260 150 1400 160'/%3E%3Cpath d='M1160 186 Q1320 168 1480 178'/%3E%3C/g%3E%3Cpath d='M1080 186 Q1120 150 1160 160 Q1196 116 1250 140 Q1290 100 1344 134 Q1390 96 1448 130 Q1500 92 1556 124 Q1582 110 1600 120 L1600 240 L1080 240 Z' fill='url(%23wallNear)'/%3E%3Cpath d='M1080 186 Q1120 150 1160 160 Q1196 116 1250 140 L1250 240 L1080 240 Z' fill='url(%23ventwash)'/%3E%3Cpath d='M1080 186 Q1120 150 1160 160 Q1196 116 1250 140 Q1290 100 1344 134 Q1390 96 1448 130 Q1500 92 1556 124 Q1582 110 1600 120' fill='none' stroke='%236fe0ef' stroke-opacity='.32' stroke-width='1.4' stroke-linecap='round'/%3E%3Cpath d='M1080 186 Q1120 150 1160 160 Q1196 116 1250 140' fill='none' stroke='%23ffa860' stroke-opacity='.4' stroke-width='1.4' stroke-linecap='round'/%3E%3Cg fill='none' stroke='%230b222c' stroke-opacity='.6' stroke-width='1.4' stroke-linecap='round'%3E%3Cpath d='M1200 150 L1230 200'/%3E%3Cpath d='M1340 140 L1380 210'/%3E%3Cpath d='M1470 130 L1500 205'/%3E%3C/g%3E%3Cpath d='M0 168 Q160 156 340 164 Q520 174 700 162 Q880 152 1060 166 Q1240 176 1420 164 Q1520 158 1600 168 L1600 240 L0 240 Z' fill='url(%23floor)'/%3E%3Cg fill='%23050f16'%3E%3Cellipse cx='300' cy='210' rx='72' ry='16'/%3E%3Cellipse cx='600' cy='220' rx='104' ry='18'/%3E%3Cellipse cx='860' cy='212' rx='70' ry='15'/%3E%3Cellipse cx='1300' cy='216' rx='86' ry='16'/%3E%3C/g%3E%3Cg fill='none' stroke='%233a8ea0' stroke-opacity='.16' stroke-width='1.2' stroke-linecap='round'%3E%3Cpath d='M240 205 Q300 199 360 205'/%3E%3Cpath d='M500 214 Q600 207 700 214'/%3E%3Cpath d='M792 208 Q860 202 928 208'/%3E%3C/g%3E%3Cg fill='none' stroke='%23123642' stroke-opacity='.3' stroke-width='1'%3E%3Cpath d='M120 196 Q300 190 480 196'/%3E%3Cpath d='M700 206 Q900 200 1100 206'/%3E%3Cpath d='M1180 198 Q1360 192 1520 198'/%3E%3C/g%3E%3Cg stroke-linecap='round' fill='none'%3E%3Cpath d='M258 196 Q246 178 252 160' stroke='%233a8ea0' stroke-opacity='.4' stroke-width='2.2'/%3E%3Cpath d='M270 198 Q272 176 262 158' stroke='%23357f92' stroke-opacity='.36' stroke-width='2.2'/%3E%3Cpath d='M284 196 Q294 178 289 160' stroke='%233a8ea0' stroke-opacity='.4' stroke-width='2.2'/%3E%3Cpath d='M297 194 Q305 180 302 166' stroke='%23357f92' stroke-opacity='.34' stroke-width='2'/%3E%3C/g%3E%3Cg fill='%23c9464a' opacity='.6'%3E%3Ccircle cx='252' cy='160' r='2.4'/%3E%3Ccircle cx='262' cy='158' r='2.4'/%3E%3Ccircle cx='289' cy='160' r='2.2'/%3E%3Ccircle cx='302' cy='166' r='2'/%3E%3C/g%3E%3Cg fill='%23ff9a6a' opacity='.5'%3E%3Ccircle cx='252' cy='160' r='1'/%3E%3Ccircle cx='262' cy='158' r='1'/%3E%3Ccircle cx='289' cy='160' r='.9'/%3E%3C/g%3E%3Cg stroke-linecap='round' fill='none'%3E%3Cpath d='M1052 200 Q1044 182 1050 166' stroke='%23c86a3a' stroke-opacity='.4' stroke-width='2'/%3E%3Cpath d='M1064 202 Q1068 180 1060 164' stroke='%23b85e34' stroke-opacity='.36' stroke-width='2'/%3E%3Cpath d='M1076 200 Q1084 184 1080 168' stroke='%23c86a3a' stroke-opacity='.36' stroke-width='2'/%3E%3C/g%3E%3Cg fill='%23e07a4a' opacity='.5'%3E%3Ccircle cx='1050' cy='166' r='2'/%3E%3Ccircle cx='1060' cy='164' r='2'/%3E%3Ccircle cx='1080' cy='168' r='1.8'/%3E%3C/g%3E%3Cpath d='M948 130 Q912 60 942 8 Q966 -24 998 6 Q1030 -18 1058 20 Q1084 56 1054 128 Q1010 96 948 130 Z' fill='url(%23plume)'/%3E%3Cpath d='M948 200 L946 176 L942 168 L950 156 L944 148 L953 140 L947 130 L957 122 L952 114 L962 108 L958 100 L970 96 L978 100 L974 108 L984 112 L980 120 L992 122 L989 132 L1000 136 L995 146 L1006 150 L1001 160 L1012 166 L1007 176 L1016 182 L1012 200 Z' fill='url(%23chim)'/%3E%3Cg fill='%23081217' fill-opacity='.7'%3E%3Cpath d='M948 200 L946 176 L950 156 L947 130 L957 122 L952 114 L958 100 L970 96 L965 120 L960 150 L958 180 L955 200 Z'/%3E%3C/g%3E%3Cg stroke-linecap='round' fill='none'%3E%3Cpath d='M952 150 Q982 144 1004 152' stroke='%231a3a42' stroke-opacity='.5' stroke-width='1.6'/%3E%3Cpath d='M956 132 Q984 126 998 134' stroke='%230d1f26' stroke-opacity='.7' stroke-width='2'/%3E%3Cpath d='M950 170 Q984 164 1010 172' stroke='%230d1f26' stroke-opacity='.6' stroke-width='1.6'/%3E%3Cpath d='M960 112 Q976 108 984 114' stroke='%2325150d' stroke-opacity='.7' stroke-width='1.4'/%3E%3C/g%3E%3Cpath d='M978 100 L984 112 L980 120 L992 122 L989 132 L1000 136 L995 146 L1006 150 L1001 160 L1012 166 L1007 176 L1016 182 L1012 200' fill='none' stroke='%23ff8a3c' stroke-opacity='.5' stroke-width='1.6' stroke-linecap='round'/%3E%3Cpath d='M948 200 L946 176 L950 156 L947 130 L957 122 L952 114 L958 100 L970 96' fill='none' stroke='%233a9db0' stroke-opacity='.4' stroke-width='1.4' stroke-linecap='round'/%3E%3Cellipse cx='974' cy='100' rx='16' ry='9' fill='url(%23throat)'/%3E%3Cellipse cx='974' cy='101' rx='7' ry='3.6' fill='%23fff0cf' opacity='.95'/%3E%3Cellipse cx='974' cy='101' rx='3' ry='1.8' fill='%23fffaf0'/%3E%3Ccircle cx='998' cy='138' r='3.2' fill='%23ff8a3c' opacity='.55'/%3E%3Ccircle cx='998' cy='138' r='1.4' fill='%23ffdca0'/%3E%3Ccircle cx='960' cy='158' r='2.2' fill='%23ff7a2e' opacity='.4'/%3E%3Cg fill='%23081319'%3E%3Cpath d='M900 176 l22 -8 l14 10 l-12 11 l-24 -4 Z'/%3E%3Cpath d='M1030 178 l24 -6 l12 10 l-14 11 l-22 -6 Z'/%3E%3Cpath d='M1090 190 l18 -6 l12 8 l-10 9 l-20 -4 Z'/%3E%3C/g%3E%3Cpath d='M900 176 l22 -8' stroke='%233a9db0' stroke-opacity='.24' stroke-width='1.4' stroke-linecap='round'/%3E%3Cpath d='M1054 172 l12 10' stroke='%23ff8a3c' stroke-opacity='.26' stroke-width='1.4' stroke-linecap='round'/%3E%3Cellipse cx='985' cy='198' rx='120' ry='30' fill='url(%23vbase)'/%3E%3C/svg%3E") 0 0 / 100% 100% no-repeat;
}

/* ═══ the lane: names must stay cool-legible over the vent glow and floor
   pool, so the center column gets a quiet abyssal scrim — coarse, soft,
   STATIC. It fades off toward the walls so the vent keeps its ember. ═══ */
body::after {
  content: "";
  display: var(--abyss-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  /* a soft ELLIPTICAL pool of shade centered on the lane instead of a full-height
     vertical band — it darkens directly behind the names for legibility but fades
     out top and bottom so it no longer reads as a muddy floor-to-ceiling stripe.
     Coarse, soft, static. */
  background:
    radial-gradient(ellipse 34% 60% at 50% 50%, rgba(2, 8, 14, 0.5), rgba(2, 8, 14, 0.32) 46%, rgba(2, 8, 14, 0) 82%),
    linear-gradient(90deg, rgba(2, 8, 14, 0) 18%, rgba(2, 8, 14, 0.22) 38%, rgba(2, 8, 14, 0.26) 50%, rgba(2, 8, 14, 0.22) 62%, rgba(2, 8, 14, 0) 82%);
}

/* ═══ THE ANGLERFISH — hero prop patrolling the edge of the light. One SVG:
   a bulbous dark-teal body lit cold from the upper-left (rim light down the
   dorsal line), a gaping jaw of needle teeth, a small dead eye, and the
   illicium arching forward to the esca (the bulb) at its tip. head::before
   is the fish; head::after is the LURE — a welded overlay riding the SAME
   patrol keyframe (so the glow never slips off the tip) plus a steps()
   opacity blink = the esca pulsing to draw prey. The patrol is steps()
   teleport hops (one reposition every ~2.6s, well under the 5/s cap), so
   this is NOT a smooth continuous mover — but it IS the ONE mover we spend
   a will-change on. z:-1 keeps it under the crawl text. ═══ */
head { display: var(--abyss-scenery, block); }
head::before,
head::after {
  content: "";
  display: var(--abyss-scenery, block);
  position: fixed;
  left: 5vw;
  top: 37vh;
  width: 300px;
  height: 210px;
  z-index: -1;
  pointer-events: none;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  transform: translate3d(0, 0, 0);
  will-change: transform;
  animation: abyss-patrol 46s steps(1, end) infinite;
}
/* THE FISH: viewBox 260x176. A deep-sea anglerfish facing right — fat round
   body, huge head, an upturned gaping jaw crammed with needle teeth, a small
   dead eye. The illicium (fishing rod) arcs up and forward off the forehead
   to the esca dangling in front of the mouth. It reads against black because
   the whole dorsal/back edge carries a bright cyan RIM LIGHT and the belly
   catches a dimmer under-glow; the fill itself is only a shade above the
   water so the silhouette stays a creature-in-the-dark, not a cutout. The
   esca's soft halo lands ON the body (baked here, dim), so the animated
   overlay only has to brighten it. */
head::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 210'%3E%3Cdefs%3E%3CradialGradient id='body' cx='40%25' cy='26%25' r='92%25'%3E%3Cstop offset='0' stop-color='%23327585'/%3E%3Cstop offset='20%25' stop-color='%231d505d'/%3E%3Cstop offset='42%25' stop-color='%23123a45'/%3E%3Cstop offset='66%25' stop-color='%230a2731'/%3E%3Cstop offset='86%25' stop-color='%23071820'/%3E%3Cstop offset='100%25' stop-color='%23040d13'/%3E%3C/radialGradient%3E%3CradialGradient id='flesh' cx='44%25' cy='34%25' r='50%25'%3E%3Cstop offset='0' stop-color='%2368c8d8' stop-opacity='.32'/%3E%3Cstop offset='45%25' stop-color='%234aa0b4' stop-opacity='.12'/%3E%3Cstop offset='100%25' stop-color='%234aa0b4' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='belly' cx='48%25' cy='92%25' r='62%25'%3E%3Cstop offset='0' stop-color='%2348b4c4' stop-opacity='.6'/%3E%3Cstop offset='55%25' stop-color='%232f8fa6' stop-opacity='.22'/%3E%3Cstop offset='100%25' stop-color='%232a6f7e' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='ao' x1='0' y1='0' x2='0.3' y2='1'%3E%3Cstop offset='0' stop-color='%23030a10' stop-opacity='0'/%3E%3Cstop offset='70%25' stop-color='%23030a10' stop-opacity='0'/%3E%3Cstop offset='100%25' stop-color='%23020609' stop-opacity='.55'/%3E%3C/linearGradient%3E%3CradialGradient id='spec' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0' stop-color='%23dffaff' stop-opacity='.9'/%3E%3Cstop offset='40%25' stop-color='%23bff0fa' stop-opacity='.35'/%3E%3Cstop offset='100%25' stop-color='%23bff0fa' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='finmem' x1='0' y1='1' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%2359c4d8' stop-opacity='.3'/%3E%3Cstop offset='60%25' stop-color='%233a97ac' stop-opacity='.12'/%3E%3Cstop offset='100%25' stop-color='%232f8fa6' stop-opacity='.02'/%3E%3C/linearGradient%3E%3ClinearGradient id='tailmem' x1='1' y1='0.3' x2='0' y2='0.7'%3E%3Cstop offset='0' stop-color='%2357e2f0' stop-opacity='.03'/%3E%3Cstop offset='50%25' stop-color='%233fa6bd' stop-opacity='.16'/%3E%3Cstop offset='100%25' stop-color='%236fe0ef' stop-opacity='.3'/%3E%3C/linearGradient%3E%3CradialGradient id='throat' cx='58%25' cy='50%25' r='60%25'%3E%3Cstop offset='0' stop-color='%23010508'/%3E%3Cstop offset='70%25' stop-color='%23030c13'/%3E%3Cstop offset='100%25' stop-color='%2307161d'/%3E%3C/radialGradient%3E%3CradialGradient id='escbloom' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0' stop-color='%23bff6ff' stop-opacity='.42'/%3E%3Cstop offset='40%25' stop-color='%2357e2f0' stop-opacity='.18'/%3E%3Cstop offset='100%25' stop-color='%2357e2f0' stop-opacity='0'/%3E%3CradialGradient id='aura' cx='44%25' cy='40%25' r='60%25'%3E%3Cstop offset='0' stop-color='%234fc6da' stop-opacity='.22'/%3E%3Cstop offset='55%25' stop-color='%233a9db4' stop-opacity='.08'/%3E%3Cstop offset='100%25' stop-color='%232f8fa6' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='246' cy='128' rx='56' ry='48' fill='url(%23escbloom)' opacity='.45'/%3E%3Cellipse cx='150' cy='108' rx='110' ry='82' fill='url(%23aura)' opacity='.5'/%3E%3Cpath d='M72 102 Q28 70 -2 74 Q14 88 8 102 Q2 118 18 132 Q32 120 50 138 Q38 112 72 114 Z' fill='url(%23tailmem)'/%3E%3Cg stroke='%236fe0ef' stroke-opacity='.32' stroke-width='1' fill='none' stroke-linecap='round'%3E%3Cpath d='M62 106 Q32 88 8 82'/%3E%3Cpath d='M60 112 Q30 104 12 100'/%3E%3Cpath d='M60 118 Q32 120 16 122'/%3E%3Cpath d='M62 122 Q40 126 30 130'/%3E%3C/g%3E%3Cpath d='M112 54 Q126 26 152 34 Q168 40 176 52 Q160 48 146 54 Q130 50 116 60 Z' fill='url(%23finmem)'/%3E%3Cg stroke='%236fe0ef' stroke-opacity='.26' stroke-width='.9' fill='none' stroke-linecap='round'%3E%3Cpath d='M120 56 Q128 36 146 38'/%3E%3Cpath d='M130 56 Q138 34 156 40'/%3E%3Cpath d='M142 56 Q150 38 168 48'/%3E%3C/g%3E%3Cpath d='M124 150 Q132 178 158 182 Q150 166 152 152 Q138 148 124 150 Z' fill='url(%23finmem)'/%3E%3Cg stroke='%235fcfe0' stroke-opacity='.2' stroke-width='.9' fill='none' stroke-linecap='round'%3E%3Cpath d='M132 152 Q138 172 154 180'/%3E%3Cpath d='M142 151 Q148 168 156 178'/%3E%3C/g%3E%3Cpath d='M70 106 Q64 64 108 48 Q154 30 196 52 Q228 68 236 102 Q240 126 227 145 Q208 168 173 170 Q150 172 138 163 Q118 172 98 159 Q76 144 70 106 Z' fill='url(%23body)'/%3E%3Cpath d='M70 106 Q64 64 108 48 Q154 30 196 52 Q228 68 236 102 Q240 126 227 145 Q208 168 173 170 Q150 172 138 163 Q118 172 98 159 Q76 144 70 106 Z' fill='url(%23flesh)'/%3E%3Cellipse cx='150' cy='146' rx='74' ry='34' fill='url(%23belly)'/%3E%3Cpath d='M70 106 Q64 64 108 48 Q154 30 196 52 Q228 68 236 102 Q240 126 227 145 Q208 168 173 170 Q150 172 138 163 Q118 172 98 159 Q76 144 70 106 Z' fill='url(%23ao)'/%3E%3Cg fill='%236fd0e0' fill-opacity='.14'%3E%3Ccircle cx='118' cy='84' r='1.3'/%3E%3Ccircle cx='134' cy='76' r='1.1'/%3E%3Ccircle cx='150' cy='72' r='1.2'/%3E%3Ccircle cx='104' cy='100' r='1.1'/%3E%3Ccircle cx='126' cy='96' r='1'/%3E%3Ccircle cx='148' cy='92' r='1.1'/%3E%3Ccircle cx='112' cy='118' r='1'/%3E%3Ccircle cx='132' cy='114' r='1'/%3E%3Ccircle cx='160' cy='88' r='1'/%3E%3C/g%3E%3Cpath d='M100 106 Q142 99 186 108' fill='none' stroke='%234aa0b4' stroke-opacity='.16' stroke-width='.7' stroke-dasharray='1 6' stroke-linecap='round'/%3E%3Cpath d='M236 102 Q240 126 227 145 Q214 160 190 162 L176 152 Q168 140 176 129 Q192 120 203 123 Q218 119 222 106 Q228 100 236 102 Z' fill='url(%23throat)'/%3E%3Cpath d='M236 102 Q222 110 208 110 Q194 108 182 115 Q173 121 176 129' fill='none' stroke='%23164049' stroke-opacity='.8' stroke-width='2'/%3E%3Cpath d='M236 102 Q224 108 212 108' fill='none' stroke='%233a8ea0' stroke-opacity='.4' stroke-width='1' stroke-linecap='round'/%3E%3Cg fill='%23eaf9fc'%3E%3Cpath d='M205 112 L208 128 L212 112 Z'/%3E%3Cpath d='M215 110 L218 124 L222 109 Z'/%3E%3Cpath d='M196 114 L198 129 L202 113 Z'/%3E%3Cpath d='M225 106 L228 118 L231 105 Z'/%3E%3Cpath d='M187 118 L189 130 L192 117 Z'/%3E%3C/g%3E%3Cg fill='%238fb8c4' fill-opacity='.5'%3E%3Cpath d='M208 128 L210 113 L212 112 Z'/%3E%3Cpath d='M218 124 L221 110 L222 109 Z'/%3E%3Cpath d='M198 129 L201 114 L202 113 Z'/%3E%3C/g%3E%3Cg fill='%23d6f2f8'%3E%3Cpath d='M191 156 L194 142 L198 156 Z'/%3E%3Cpath d='M201 158 L204 143 L208 157 Z'/%3E%3Cpath d='M211 155 L214 142 L217 153 Z'/%3E%3Cpath d='M221 150 L223 139 L226 148 Z'/%3E%3C/g%3E%3Cpath d='M72 104 Q66 64 108 48 Q154 30 196 52 Q226 66 235 98' fill='none' stroke='%2385f2ff' stroke-opacity='.85' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M108 48 Q154 30 190 50' fill='none' stroke='%23e6fdff' stroke-opacity='.55' stroke-width='1' stroke-linecap='round'/%3E%3Cpath d='M84 138 Q104 162 140 164' fill='none' stroke='%232f8fa6' stroke-opacity='.5' stroke-width='1.4' stroke-linecap='round'/%3E%3Cpath d='M140 164 Q160 168 176 164' fill='none' stroke='%233a9db0' stroke-opacity='.35' stroke-width='1.2' stroke-linecap='round'/%3E%3Cpath d='M116 130 Q102 142 94 158 Q108 150 124 148 Q120 138 116 130 Z' fill='url(%23finmem)' opacity='.7'/%3E%3Cg stroke='%235fcfe0' stroke-opacity='.16' stroke-width='.7' fill='none' stroke-linecap='round'%3E%3Cpath d='M114 132 Q104 144 99 156'/%3E%3C/g%3E%3Cellipse cx='126' cy='78' rx='30' ry='11' fill='url(%23spec)' transform='rotate(-26 126 78)'/%3E%3Cellipse cx='116' cy='72' rx='9' ry='2.6' fill='%23f4ffff' opacity='.6' transform='rotate(-26 116 72)'/%3E%3Ccircle cx='172' cy='84' r='9' fill='%23030c12'/%3E%3Ccircle cx='172' cy='84' r='9' fill='none' stroke='%2357e2f0' stroke-opacity='.55' stroke-width='1.4'/%3E%3Ccircle cx='172' cy='84' r='5.5' fill='%23071c24'/%3E%3Ccircle cx='169' cy='81' r='2.6' fill='%23cff8ff'/%3E%3Ccircle cx='174' cy='87' r='1' fill='%2357e2f0' opacity='.7'/%3E%3Cpath d='M156 44 Q196 4 244 24 Q258 44 251 78 Q247 104 246 126' fill='none' stroke='%230c2833' stroke-width='4.5' stroke-linecap='round'/%3E%3Cpath d='M156 44 Q196 4 244 24 Q258 44 251 78 Q247 104 246 126' fill='none' stroke='%2364d8e8' stroke-opacity='.55' stroke-width='1.4' stroke-linecap='round'/%3E%3Cpath d='M158 45 Q196 8 240 25' fill='none' stroke='%23bff6ff' stroke-opacity='.4' stroke-width='.7' stroke-linecap='round'/%3E%3C/svg%3E");
}
/* the LURE (esca) overlay — SAME box + patrol keyframe (welded), a cold hot
   bulb at the illicium tip in front of the jaw that blinks on a steps()
   cycle: the esca calling in the dark. Its wide bloom is baked here so only
   opacity animates. Registered to the esca dangling in front of the jaw at (246,126). */
head::after {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 210'%3E%3Cdefs%3E%3CradialGradient id='lg' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0' stop-color='%23eaffff' stop-opacity='1'/%3E%3Cstop offset='22%25' stop-color='%23bff6ff' stop-opacity='.9'/%3E%3Cstop offset='48%25' stop-color='%2357e2f0' stop-opacity='.42'/%3E%3Cstop offset='100%25' stop-color='%2357e2f0' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='hot' cx='50%25' cy='42%25' r='55%25'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='60%25' stop-color='%23dffbff'/%3E%3Cstop offset='100%25' stop-color='%23a6f4fb'/%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='246' cy='126' r='34' fill='url(%23lg)'/%3E%3Cpath d='M246 100 L249 122 L246 126 L243 122 Z' fill='%23bff6ff' opacity='.5'/%3E%3Cpath d='M246 152 L249 130 L246 126 L243 130 Z' fill='%23bff6ff' opacity='.45'/%3E%3Cpath d='M220 126 L242 129 L246 126 L242 123 Z' fill='%23bff6ff' opacity='.4'/%3E%3Cpath d='M272 126 L250 129 L246 126 L250 123 Z' fill='%23bff6ff' opacity='.4'/%3E%3Ccircle cx='246' cy='126' r='6.5' fill='url(%23hot)'/%3E%3Ccircle cx='245' cy='124' r='2.2' fill='%23ffffff'/%3E%3C/svg%3E");
  animation: abyss-patrol 46s steps(1, end) infinite, abyss-lure 3.4s steps(1, end) infinite;
}

/* ═══ extra prop canvases: the two <meta> void elements in <head> render
   nothing but their fixed pseudos are free layers. ═══ */
head meta { display: var(--abyss-scenery, block); }

/* ═══ DEPTH-GAUGE HUD — the pilot's readout, framed lower-right, well off
   the text lane. A dark rounded panel with a cyan hairline border, a small
   "DEPTH" label, the big number, a "M" unit, and a thin descent bar with a
   marker three-quarters down (we are deep). STATIC, promoted. The fine
   panel lines live in the corner (L6-legal: off the center lane). ═══ */
head meta:first-of-type::before {
  content: "";
  display: var(--abyss-scenery, block);
  position: fixed;
  right: 3.4vw;
  bottom: 6vh;
  width: 208px;
  height: 118px;
  z-index: 1;
  pointer-events: none;
  transform: translateZ(0);
  filter: drop-shadow(0 6px 18px rgba(1, 6, 12, 0.75));
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 208 118'%3E%3Cdefs%3E%3ClinearGradient id='pan' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23123643'/%3E%3Cstop offset='55%25' stop-color='%230d2833'/%3E%3Cstop offset='100%25' stop-color='%23071a23'/%3E%3C/linearGradient%3E%3ClinearGradient id='bezel' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%231a4450'/%3E%3Cstop offset='100%25' stop-color='%2308181f'/%3E%3C/linearGradient%3E%3CradialGradient id='inner' cx='50%25' cy='20%25' r='90%25'%3E%3Cstop offset='0' stop-color='%2357e2f0' stop-opacity='.08'/%3E%3Cstop offset='100%25' stop-color='%2357e2f0' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='glass' x1='0' y1='0' x2='0.5' y2='1'%3E%3Cstop offset='0' stop-color='%23dffbff' stop-opacity='.22'/%3E%3Cstop offset='14%25' stop-color='%23bff0fa' stop-opacity='.06'/%3E%3Cstop offset='30%25' stop-color='%23bff0fa' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='1.5' y='1.5' width='205' height='115' rx='10' fill='url(%23bezel)'/%3E%3Crect x='4' y='4' width='200' height='110' rx='8' fill='url(%23pan)' stroke='%2357e2f0' stroke-opacity='.6' stroke-width='1.3'/%3E%3Crect x='4' y='4' width='200' height='110' rx='8' fill='url(%23inner)'/%3E%3Cpath d='M6 6 L120 6 L44 60 L6 60 Z' fill='url(%23glass)'/%3E%3Ccircle cx='20' cy='12' r='7' fill='%23eaffff' fill-opacity='.5'/%3E%3Ccircle cx='20' cy='12' r='2.4' fill='%23ffffff' fill-opacity='.85'/%3E%3Cpath d='M14 6 Q104 3 196 6' fill='none' stroke='%23bff0fa' stroke-opacity='.35' stroke-width='1'/%3E%3Cg fill='%230c2a33' stroke='%232a6f80' stroke-opacity='.5' stroke-width='.8'%3E%3Ccircle cx='13' cy='13' r='2.4'/%3E%3Ccircle cx='195' cy='13' r='2.4'/%3E%3Ccircle cx='13' cy='105' r='2.4'/%3E%3Ccircle cx='195' cy='105' r='2.4'/%3E%3C/g%3E%3Ctext x='18' y='28' font-family='Consolas,Menlo,monospace' font-size='11' letter-spacing='3.5' fill='%238fe0ec' fill-opacity='.85'%3EDEPTH%3C/text%3E%3Ccircle cx='182' cy='23' r='3.2' fill='%2357e2f0' opacity='.9'/%3E%3Ccircle cx='182' cy='23' r='6' fill='none' stroke='%2357e2f0' stroke-opacity='.3' stroke-width='1'/%3E%3Ctext x='17' y='66' font-family='Consolas,Menlo,monospace' font-weight='bold' font-size='32' letter-spacing='1' fill='%23dbfaff'%3E3800%3C/text%3E%3Ctext x='150' y='66' font-family='Consolas,Menlo,monospace' font-size='16' fill='%2357e2f0' fill-opacity='.9'%3EM%3C/text%3E%3Cg stroke='%232a6f80' stroke-opacity='.55' stroke-width='.9' stroke-linecap='round'%3E%3Cpath d='M18 82 L18 78'/%3E%3Cpath d='M55 82 L55 79'/%3E%3Cpath d='M92 82 L92 79'/%3E%3Cpath d='M129 82 L129 79'/%3E%3Cpath d='M166 82 L166 79'/%3E%3Cpath d='M190 82 L190 78'/%3E%3C/g%3E%3Crect x='18' y='84' width='172' height='5' rx='2.5' fill='%230a222c' stroke='%232a6f80' stroke-opacity='.5' stroke-width='.8'/%3E%3Crect x='18' y='84' width='138' height='5' rx='2.5' fill='%2357e2f0' fill-opacity='.42'/%3E%3Crect x='153' y='81' width='4.5' height='11' rx='1.6' fill='%23c6f4fb'/%3E%3Ctext x='18' y='102' font-family='Consolas,Menlo,monospace' font-size='7.5' letter-spacing='1' fill='%234d97a6' fill-opacity='.8'%3E0%3C/text%3E%3Ctext x='176' y='102' font-family='Consolas,Menlo,monospace' font-size='7.5' letter-spacing='1' fill='%234d97a6' fill-opacity='.8'%3E4K%3C/text%3E%3Ctext x='70' y='102' font-family='Consolas,Menlo,monospace' font-size='7.5' letter-spacing='2' fill='%234d97a6' fill-opacity='.7'%3EHDG 214%3C/text%3E%3Ctext x='118' y='102' font-family='Consolas,Menlo,monospace' font-size='7.5' letter-spacing='2' fill='%236fd0a0' fill-opacity='.75'%3EO2 98%25%3C/text%3E%3C/svg%3E") center / contain no-repeat;
}

/* ═══ the gauge's ones-place digit TICKS — a tiny fixed box parked over the
   last "0" of "3800", one soft cyan digit swapping between 0/1/2/... on a
   steps() cycle (~0.5 paints/s: the depth breathing as the sub holds trim,
   not a strobe). Just a translucent overlay digit — L2/L5-safe, no
   will-change spent (not a continuous mover). ═══ */
head meta:first-of-type::after {
  content: "";
  display: var(--abyss-scenery, block);
  position: fixed;
  right: calc(3.4vw + 112px);
  bottom: calc(6vh + 48px);
  width: 20px;
  height: 30px;
  z-index: 2;
  pointer-events: none;
  background:
    radial-gradient(circle 3px at 50% 46%, rgba(191, 242, 250, 0.75), rgba(191, 242, 250, 0) 100%);
  animation: abyss-tick 8s steps(1, end) infinite;
}

/* ═══ PORTHOLE — we watch all of this through a thick pressure-hull window.
   A heavy dark rim presses in at the four edges (soft inner shoulder so it
   frames without hard lines), with a faint cyan glint on the upper-left arc
   where the sub's own light catches the glass. STATIC, promoted, at the
   frame edges (L6-legal). z:-1 so it sits behind the names but over the
   deep scenery, cupping the whole scene. ═══ */
head meta:last-of-type::before {
  content: "";
  display: var(--abyss-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  /* a thick brushed-steel hull rim frames the glass; a beveled inner shoulder
     presses in; a diagonal glass glint catches the sub's light. The rivet band
     rides the very top and bottom edges only (coarse, far from the lane —
     L6-legal). */
  border: 18px solid transparent;
  border-image: linear-gradient(160deg, #16333d, #081820 42%, #04121a 70%, #0a2029) 18;
  box-shadow:
    inset 0 0 0 1.5px rgba(87, 226, 240, 0.14),
    inset 0 0 32px 6px rgba(1, 5, 10, 0.6),
    inset 0 0 90px 20px rgba(1, 4, 8, 0.45);
  background:
    /* rivets — a coarse dotted band clinging to the top and bottom hull edges */
    radial-gradient(circle 2.4px at 50% 50%, rgba(140, 200, 214, 0.55), rgba(90, 150, 165, 0.2) 60%, rgba(90, 150, 165, 0) 100%) 0 5px / 64px 12px repeat-x,
    radial-gradient(circle 2.4px at 50% 50%, rgba(140, 200, 214, 0.5), rgba(90, 150, 165, 0.18) 60%, rgba(90, 150, 165, 0) 100%) 0 calc(100% - 5px) / 64px 12px repeat-x,
    /* pressure vignette closing on the edges */
    radial-gradient(ellipse 128% 118% at 50% 50%, rgba(1, 5, 10, 0) 60%, rgba(1, 5, 10, 0.5) 82%, rgba(1, 4, 8, 0.82) 100%),
    /* SPECULAR GLASS SHEEN — a brighter diagonal reflection band sweeping the
       upper-left glass (coarse, static, at the frame edge — L6-legal shine) */
    linear-gradient(146deg, rgba(170, 236, 246, 0.16) 0%, rgba(160, 232, 242, 0.05) 7%, rgba(150, 228, 238, 0) 18%),
    /* a second thin hot specular streak riding just inside the first */
    linear-gradient(146deg, rgba(220, 248, 252, 0) 2%, rgba(220, 248, 252, 0.12) 4.5%, rgba(220, 248, 252, 0) 7%),
    /* soft glint pool upper-left */
    radial-gradient(ellipse 30vw 20vh at 15% 10%, rgba(130, 226, 238, 0.11), rgba(120, 220, 232, 0) 70%),
    /* a coarse specular bloom where the sub-light hits the top-left glass corner */
    radial-gradient(circle 9vw at 9% 7%, rgba(190, 240, 248, 0.10), rgba(190, 240, 248, 0) 66%);
  background-origin: border-box;
  background-clip: border-box;
}

/* ═══ a SIPHONOPHORE drifting far in the dark — a chain-of-lights gelatinous
   creature, upper-right third, never in the lane. steps(1) teleport hops
   (one every ~2s, far under the 5/s ceiling; explicitly NOT a continuous
   mover, so no will-change spent). z:-2 = far background, dim and hazy to
   sell the distance. It pulses faintly as it hops. ═══ */
head meta:last-of-type::after {
  content: "";
  display: var(--abyss-scenery, block);
  position: fixed;
  top: 20vh;
  right: 12vw;
  width: 24px;
  height: 92px;
  z-index: -2;
  pointer-events: none;
  opacity: 0;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 92'%3E%3Cdefs%3E%3CradialGradient id='sp' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0' stop-color='%23a6f4fb' stop-opacity='.9'/%3E%3Cstop offset='100%25' stop-color='%2357e2f0' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cpath d='M12 4 Q9 26 12 48 Q15 68 12 88' fill='none' stroke='%237fd9e6' stroke-opacity='.4' stroke-width='1.4'/%3E%3Cg fill='url(%23sp)'%3E%3Ccircle cx='12' cy='10' r='5'/%3E%3Ccircle cx='11' cy='24' r='4.4'/%3E%3Ccircle cx='13' cy='38' r='4'/%3E%3Ccircle cx='11' cy='52' r='3.6'/%3E%3Ccircle cx='13' cy='66' r='3.2'/%3E%3Ccircle cx='12' cy='80' r='2.8'/%3E%3C/g%3E%3Cg fill='%23e6fdff' opacity='.9'%3E%3Ccircle cx='12' cy='10' r='1.6'/%3E%3Ccircle cx='11' cy='24' r='1.4'/%3E%3Ccircle cx='13' cy='38' r='1.2'/%3E%3C/g%3E%3C/svg%3E") center / contain no-repeat;
  animation: abyss-drift 30s steps(1, end) infinite;
}

/* ═══ MARINE SNOW / plankton — the fine pattern, so it RIDES THE ROLL (zero
   slide against tracked glyphs = zero flicker). Tiny cold cyan motes at
   three parallax scales, plus a couple of bioluminescent brights. Static,
   content-locked to the crawl. z:-1 keeps it behind the names in the roll's
   own stacking context. ═══ */
.credits-roll::before,
.credits-slideshow::before {
  content: "";
  display: var(--abyss-scenery, block);
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.5;
  background-image:
    radial-gradient(circle at 24% 30%, rgba(191, 244, 251, 0.85) 0 1px, rgba(191, 244, 251, 0) 2px),
    radial-gradient(circle at 68% 14%, rgba(120, 220, 232, 0.7) 0 1px, rgba(120, 220, 232, 0) 2px),
    radial-gradient(circle at 52% 62%, rgba(160, 235, 245, 0.6) 0 1.4px, rgba(160, 235, 245, 0) 2.4px),
    radial-gradient(circle at 10% 78%, rgba(191, 244, 251, 0.55) 0 1px, rgba(191, 244, 251, 0) 2px),
    radial-gradient(circle at 86% 52%, rgba(140, 230, 240, 0.5) 0 1px, rgba(140, 230, 240, 0) 2px);
  background-size: 300px 300px, 250px 250px, 360px 360px, 210px 210px, 330px 330px;
}

/* ═══ section titles: dive-manifest headers. Chakra Petch caps in cold ice,
   a cyan glow, wide tracking; the base gold rule becomes a cyan sonar tick
   line with a small depth diamond in the gap. A leading ">>" cursor +
   station number sits as a HUD eyebrow above the bar. ═══ */
.credits-block,
.credits-slide:not(.flourish) { counter-increment: abyss-dive; }

.credits-block__title {
  position: relative;
  font-weight: 600;
  letter-spacing: 0.18em;
  padding-left: 0.18em;
  color: var(--abyss-ice);
  text-shadow: 0 0 22px rgba(87, 226, 240, 0.4), var(--credits-shadow);
}
.credits-block__title::before {
  content: "STATION " counter(abyss-dive, decimal-leading-zero) "  \\00B7  " counter(abyss-dive) "00 M";
  display: block;
  font-family: var(--credits-font);
  font-weight: 500;
  font-size: 0.62rem;
  letter-spacing: 0.42em;
  padding-left: 0.42em;
  margin-bottom: 0.7rem;
  color: var(--abyss-cyan);
  opacity: 0.72;
  text-shadow: 0 0 10px rgba(87, 226, 240, 0.4);
}
.credits-block__title::after {
  width: min(230px, 55vw);
  height: 12px;
  margin: 0.62rem auto 0;
  opacity: 1;
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 12'%3E%3Cpath d='M20 1 L26 6 L20 11 L14 6 Z' fill='none' stroke='%2357e2f0' stroke-width='1.4' stroke-opacity='.9'/%3E%3Ccircle cx='20' cy='6' r='1.4' fill='%23a6f4fb'/%3E%3C/svg%3E") center / 24px 12px no-repeat,
    linear-gradient(90deg, rgba(87, 226, 240, 0) 0%, rgba(87, 226, 240, 0.5) 16% 40%, rgba(87, 226, 240, 0) 44% 56%, rgba(87, 226, 240, 0.5) 60% 84%, rgba(87, 226, 240, 0) 100%) center / 100% 1px no-repeat;
}

/* ═══ rows: the manifest. Names in cold cyan-white, never clipped; amounts
   in bright cyan behind a small depth caret. ═══ */
.credit {
  max-width: min(42rem, 92vw);
  margin-inline: auto;
  min-width: 0;
  overflow-wrap: anywhere;
  letter-spacing: 0.02em;
  line-height: 1.55;
}
.credit__name {
  color: var(--abyss-ice);
  text-shadow: 0 0 15px rgba(87, 226, 240, 0.18), var(--credits-shadow);
}
.credit__amount {
  opacity: 1;
  font-size: 0.76em;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--abyss-cyan);
  font-variant-numeric: tabular-nums;
  text-shadow: 0 0 12px rgba(87, 226, 240, 0.3), var(--credits-shadow);
}
.credit__amount::before {
  content: "\\276F";
  font-size: 0.7em;
  color: var(--abyss-cyan-dim);
  margin: 0 0.5em 0 0.7em;
  vertical-align: 0.06em;
}

/* ═══ custom credit types (streakers etc.) appear mid-roll — give each a
   cool hue shift via nth-of-type so they read as distinct dive logs, with
   NO assumption about their content. ═══ */
.credits-block:nth-of-type(4n) .credits-block__title,
.credits-slide:nth-of-type(4n) .credits-block__title { color: #d7f6ff; }
.credits-block:nth-of-type(4n) .credit__name,
.credits-slide:nth-of-type(4n) .credit__name { color: #cdeef6; }

/* ═══ flourish cards ═══ */
.flourish--intro { gap: 1.15rem; }
.flourish__title {
  font-weight: 700;
  letter-spacing: 0.06em;
  line-height: 1.1;
  color: var(--abyss-ice);
  text-shadow: 0 0 34px rgba(87, 226, 240, 0.4), 0 0 8px rgba(87, 226, 240, 0.22), var(--credits-shadow);
}

/* badge -> dive-log stamp (copy swap via font-size:0 + ::after) */
.flourish__badge { font-size: 0; border: 0; padding: 0; box-shadow: none; }
.flourish__badge::after {
  content: "DEEP DIVE \\00B7 CREW MANIFEST";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 600;
  font-size: 0.8rem;
  letter-spacing: 0.34em;
  padding: 0.5rem 1rem 0.5rem 1.34rem;
  color: var(--abyss-cyan);
  border: 1px solid rgba(87, 226, 240, 0.5);
  border-radius: 2px;
  background: rgba(87, 226, 240, 0.06);
  box-shadow: 0 0 18px rgba(87, 226, 240, 0.16);
  text-shadow: 0 0 10px rgba(87, 226, 240, 0.5);
}

/* tagline is streamer copy: restyle only — the spoken line, in Spectral italic */
.flourish__tagline {
  font-family: "Spectral", Georgia, "Times New Roman", serif;
  font-style: italic;
  font-weight: 400;
  letter-spacing: 0.06em;
  font-size: 1.12rem;
  color: rgba(223, 243, 247, 0.82);
}

/* rating -> the pressure stamp (copy swap) */
.flourish__rating { font-size: 0; border: 0; padding: 0; opacity: 1; }
.flourish__rating::after {
  content: "PRESSURE 380 ATM \\00B7 HULL NOMINAL";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 600;
  font-size: 0.72rem;
  letter-spacing: 0.24em;
  padding: 0.42rem 0.75rem 0.42rem 0.99rem;
  color: var(--abyss-cyan-bright);
  border: 1px solid rgba(87, 226, 240, 0.42);
  border-radius: 3px;
  opacity: 0.9;
  text-shadow: 0 0 10px rgba(87, 226, 240, 0.35);
}

/* a dive-coordinate fine-print line under the intro card */
.flourish--intro::after {
  content: "11\\00B0 22' N  142\\00B0 35' E \\00B7 DESCENT LOG \\00B7 O\\2082 98%";
  display: var(--abyss-scenery, block);
  font-family: var(--credits-font);
  font-weight: 400;
  font-size: 0.64rem;
  letter-spacing: 0.28em;
  padding-left: 0.28em;
  color: rgba(121, 211, 224, 0.5);
}

/* outro: SURFACING — the ascent. Copy swap on title + tagline. */
.flourish--outro::before {
  content: "\\2191 \\2191 \\2191";
  display: var(--abyss-scenery, block);
  font-size: 0.9rem;
  letter-spacing: 0.7em;
  padding-left: 0.7em;
  color: var(--abyss-cyan);
  opacity: 0.7;
  text-shadow: 0 0 12px rgba(87, 226, 240, 0.5);
}
.flourish--outro .flourish__title { font-size: 0; }
.flourish--outro .flourish__title::after {
  content: "SURFACING";
  font-family: var(--credits-title-font);
  font-weight: 700;
  font-size: var(--credits-flourish-title-size);
  letter-spacing: 0.08em;
  color: var(--abyss-ice);
  text-shadow: 0 0 34px rgba(87, 226, 240, 0.45), 0 0 8px rgba(87, 226, 240, 0.25), var(--credits-shadow);
}
.flourish--outro .flourish__tagline { font-size: 0; }
.flourish--outro .flourish__tagline::after {
  content: "decompress slowly \\2014 the deep keeps its own";
  font-family: "Spectral", Georgia, "Times New Roman", serif;
  font-style: italic;
  font-size: 1.06rem;
  letter-spacing: 0.05em;
  color: rgba(223, 243, 247, 0.82);
}
.flourish--outro::after {
  content: "\\25C9 ASCENT ENGAGED";
  display: var(--abyss-scenery, block);
  font-family: var(--credits-font);
  font-weight: 600;
  font-size: 0.68rem;
  letter-spacing: 0.34em;
  padding: 0.32rem 0.5rem 0.32rem 0.84rem;
  margin-top: 0.7rem;
  color: rgba(87, 226, 240, 0.85);
  border: 1px solid rgba(87, 226, 240, 0.4);
  border-radius: 2px;
  text-shadow: 0 0 10px rgba(87, 226, 240, 0.4);
}

/* ═══ raid finale: LEVIATHAN SIGHTED — the sonar goes hot. The title floods
   cyan-white with a hard bloom, a contact label burns above it, and the
   whole block warms with a cold sonar halo. The eyebrow pulses on a steps()
   glow (~1.5 paints/s — the only animation inside the roll, under the L5
   2/s ceiling). Declared after the parity tints so it wins the cascade. ═══ */
.credits-block:nth-last-of-type(2) .credits-block__title,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
  color: var(--abyss-cyan-bright);
  text-shadow: 0 0 30px rgba(87, 226, 240, 0.7), 0 0 10px rgba(166, 244, 251, 0.5), var(--credits-shadow);
}
.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  content: "\\25C9 SONAR HOT \\00B7 LEVIATHAN SIGHTED";
  color: var(--abyss-cyan-bright);
  opacity: 1;
  text-shadow: 0 0 14px rgba(166, 244, 251, 0.7);
  animation: abyss-contact 3s steps(1, end) infinite;
}
/* scroll: a tight cold halo dying inside the block box; slideshow: the whole
   viewport goes sonar-hot */
.credits-block:nth-last-of-type(2) {
  background: radial-gradient(ellipse 58% 62% at 50% 34%, rgba(87, 226, 240, 0.11), rgba(87, 226, 240, 0) 72%);
}
.credits-slide:nth-last-of-type(2):not(.flourish) {
  background: radial-gradient(ellipse 64% 60% at 50% 46%, rgba(87, 226, 240, 0.1), rgba(87, 226, 240, 0) 80%);
}
.credits-block:nth-last-of-type(2) .credit,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit {
  font-size: calc(var(--credits-name-size) * 1.1);
}
.credits-block:nth-last-of-type(2) .credit__name,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__name {
  text-shadow: 0 0 20px rgba(87, 226, 240, 0.42), var(--credits-shadow);
}

/* ═══ slideshow: each slide settles like the sub trimming to depth ═══ */
.credits-slide {
  transform: translateY(12px);
  transition: opacity 0.9s ease, transform 1s cubic-bezier(0.22, 1, 0.36, 1);
}
.credits-slide.is-active { transform: none; }

/* ═══ keyframes (all abyss- prefixed; transform/opacity ONLY) ═══ */
/* SONAR: a ring walking outward. Dark 55% of the cycle, then five discrete
   held radii scaling out from the emitter, fading as it goes — one ping
   every 2.6s (steps). translate3d is baked at rest; only scale/opacity. */
@keyframes abyss-sonar {
  0%, 54%  { transform: scale(0.22); opacity: 0; }
  56%      { transform: scale(0.32); opacity: 0.5; }
  66%      { transform: scale(0.48); opacity: 0.4; }
  76%      { transform: scale(0.66); opacity: 0.28; }
  86%      { transform: scale(0.84); opacity: 0.15; }
  96%      { transform: scale(1); opacity: 0; }
  100%     { transform: scale(1); opacity: 0; }
}
/* ANGLERFISH patrol: a long slow prowl at the edge of the light. Nine held
   postures over 42s (one hop / ~4.7s — steps, NOT a smooth mover), easing
   in from the left dark, cruising a shallow arc across the lower-left third,
   dipping toward the vent, then withdrawing back into the black. Stays out
   of the center lane; the box never nears the walls' props. */
@keyframes abyss-patrol {
  0%   { transform: translate3d(0, 0, 0); opacity: 0; }
  4%   { transform: translate3d(2vw, -0.5vh, 0); opacity: 0.9; }
  16%  { transform: translate3d(6vw, -2vh, 0); opacity: 1; }
  28%  { transform: translate3d(11vw, -1vh, 0); opacity: 1; }
  40%  { transform: translate3d(15vw, 1.5vh, 0); opacity: 1; }
  52%  { transform: translate3d(17vw, 4vh, 0); opacity: 0.95; }
  64%  { transform: translate3d(14vw, 6vh, 0); opacity: 0.85; }
  76%  { transform: translate3d(9vw, 5vh, 0); opacity: 0.7; }
  88%  { transform: translate3d(4vw, 2.5vh, 0); opacity: 0.4; }
  100% { transform: translate3d(0, 0, 0); opacity: 0; }
}
/* the LURE blink: the esca calling. Mostly lit, with two quick dark dips
   per 3.4s (~1.5 paints/s under the 5/s cap) — a heartbeat, not a strobe. */
@keyframes abyss-lure {
  0%, 60%  { opacity: 1; }
  66%, 72% { opacity: 0.25; }
  78%      { opacity: 1; }
  88%, 92% { opacity: 0.4; }
  100%     { opacity: 1; }
}
/* the depth digit ticking: five held brightness/position phases over 8s
   (~0.5 paints/s) — the readout breathing as the sub holds trim. */
@keyframes abyss-tick {
  0%   { opacity: 0.75; transform: translateY(0); }
  20%  { opacity: 0.3; transform: translateY(0.5px); }
  40%  { opacity: 0.9; transform: translateY(0); }
  64%  { opacity: 0.45; transform: translateY(0.5px); }
  84%  { opacity: 0.8; transform: translateY(0); }
  100% { opacity: 0.75; transform: translateY(0); }
}
/* the siphonophore drift: blink in off the right, seven ~30px teleport hops
   sinking-and-swaying down through the dark (one hop / ~2s — steps), blink
   out, leave the water empty for a long beat. */
@keyframes abyss-drift {
  0%   { transform: translate3d(0, 0, 0); opacity: 0; }
  4%   { transform: translate3d(0, 0, 0); opacity: 0.55; }
  12%  { transform: translate3d(-8px, 4vh, 0); opacity: 0.6; }
  20%  { transform: translate3d(4px, 8vh, 0); opacity: 0.6; }
  28%  { transform: translate3d(-6px, 12vh, 0); opacity: 0.55; }
  36%  { transform: translate3d(5px, 16vh, 0); opacity: 0.5; }
  44%  { transform: translate3d(-4px, 20vh, 0); opacity: 0.4; }
  52%  { transform: translate3d(3px, 24vh, 0); opacity: 0.24; }
  60%  { transform: translate3d(-3px, 28vh, 0); opacity: 0; }
  100% { transform: translate3d(-3px, 28vh, 0); opacity: 0; }
}
/* finale contact pulse: 4 discrete opacity stops per 3s = ~1.3 paints/s */
@keyframes abyss-contact {
  0%, 50%  { opacity: 1; }
  56%, 66% { opacity: 0.5; }
  72%, 84% { opacity: 1; }
  90%, 96% { opacity: 0.7; }
  100%     { opacity: 1; }
}

/* ═══ reduced motion: the dive holds trim. The sonar rests mid-ping, the
   anglerfish parks lit at the edge of the light, the lure stays on, the
   depth digit holds a bright reading, the siphonophore hangs mid-drift, the
   contact label stops pulsing, slides fall back to the base fade. ═══ */
@media (prefers-reduced-motion: reduce) {
  html::after {
    animation: none;
    opacity: 0.28;
    transform: scale(0.5);
  }
  head::before,
  head::after {
    animation: none;
    opacity: 1;
    transform: translate3d(11vw, -1vh, 0);
  }
  head::after { animation: none; opacity: 1; }
  head meta:first-of-type::after { animation: none; opacity: 0.7; }
  head meta:last-of-type::after {
    animation: none;
    opacity: 0.5;
    transform: translate3d(-6px, 12vh, 0);
  }
  .credits-block:nth-last-of-type(2) .credits-block__title::before,
  .credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
    animation: none;
  }
  .credits-slide { transform: none; transition: opacity 0.8s ease; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--abyss-scenery:none;}",
};
