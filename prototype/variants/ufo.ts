import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. Close Encounter: a 1950s drive-in B-movie — a chrome saucer hangs over the desert night, its acid-green abduction beam working on one doomed cow while the paperwork rolls by stamped CLASSIFIED. */
export const VARIANT: ThemeVariant = {
  key: "ufo",
  name: "Close Encounter",
  css: `
/* ================================================================
   CLOSE ENCOUNTER — layered after the base theme.
   Fiction: 11:58 PM on the shoulder of ROUTE 51. The drive-in projector
   died mid-reel because the real show is hovering over the mesas: a
   chrome saucer with amber running lights, working its acid-green
   tractor beam on the county's last two cows while a scout ship
   patrols the far ridge and the base searchlight sweeps the sky a
   beat behind everything. Channel 51 is rolling credits on everyone
   who witnessed it. You were never here.
   Layer map (all scenery kill-switched via --ufo-scenery):
     html bg (--credits-bg)   green-black night (cheap: 1 radial + 1 linear)
     html::before             sky: moon, coarse star blooms, milky-way band,
                              horizon airglow — STATIC, promoted
     html::after              THE BEAM (coarse conic wedge, ~6% alpha) +
                              origin bloom + readability scrim — STATIC, promoted
     body::before             desert horizon SVG (mesas, 2 cacti, radar dish)
                              + beam ground pool + base-glow — STATIC, promoted
     body::after              THE COWS — a 40s two-act cycle (continuous
                              mover #2, 88px, will-change, z:-1 so it rides
                              UNDER the names): act I clean lift, act II a
                              stubborn cow that stalls mid-beam
     head::before             SAUCER HULL (continuous mover #1: small bob)
     head::after              porthole CHASE overlay — identical geometry,
                              same bob keyframe (stays welded to the hull),
                              steps() opacity swap = the running lights
     head meta#1::before      ROUTE 51 shield sign — static SVG silhouette
                              planted roadside lower-left (z:0, foreground)
     head meta#1::after       SCOUT SAUCER — far-background patrol, steps()
                              hops (1 hop / 2s, NOT a continuous mover)
     head meta#2::before      BASE SEARCHLIGHT — coarse amber wedge sweeping
                              from behind the right mesa, steps() (z:-1 so
                              the mesa band hides its origin)
     .credits-roll::before    starfield (fine pattern RIDES THE ROLL)
     .credits-slideshow::before  same starfield, static per L6
   ================================================================ */
@import url('https://fonts.googleapis.com/css2?family=Zen+Dots&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

:root {
  --ufo-green: #7dff6a;
  --ufo-amber: #ffc46b;
  --ufo-cream: #eef7e8;
  --ufo-red: #ff5149;
  --ufo-scenery: block; /* set to none to strip every scenery layer */

  /* cheap sky: one faint saucer-side glow + a 7-stop green-black night
     falling to a hint of airglow at the horizon (L3: simple gradients only —
     the texture stacks live on the promoted fixed pseudos below) */
  --credits-bg:
    radial-gradient(ellipse 44% 30% at 50% 0%, rgba(125, 255, 106, 0.10) 0%, rgba(125, 255, 106, 0.03) 55%, rgba(5, 10, 8, 0) 78%),
    linear-gradient(180deg, #020604 0%, #040906 22%, #050c09 45%, #071009 64%, #0a140c 80%, #0d1c10 92%, #112610 100%);
  --credits-color: var(--ufo-cream);
  --credits-accent: var(--ufo-green);
  --credits-font: "Space Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  --credits-title-font: "Zen Dots", "Trebuchet MS", Verdana, sans-serif;
  --credits-title-size: clamp(1.25rem, 3.4vw, 2rem);
  --credits-name-size: clamp(1rem, 2.5vw, 1.5rem);
  --credits-flourish-title-size: clamp(2rem, 6.8vw, 4.2rem);
  --credits-block-gap: 5rem;
  --credits-name-gap: 0.65rem;
  --credits-shadow: 0 2px 14px rgba(2, 7, 4, 0.9);
  /* no-op — NEVER "none": base composes "var(--credits-glow), var(--credits-shadow)"
     and a "none" in the list invalidates the whole declaration */
  --credits-glow: 0 0 0 rgba(0, 0, 0, 0);
}

/* scenery is full-bleed: html drops the base edge-fade; body keeps it but
   with a steeper top ramp so crawling names dissolve BEFORE they reach the
   chrome hull (cream-on-chrome would mush for a beat at the base 11%) */
html { -webkit-mask-image: none; mask-image: none; }
body {
  background: transparent;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 17%, #000 89%, transparent 100%);
  mask-image: linear-gradient(to bottom, transparent 0%, #000 17%, #000 89%, transparent 100%);
}

/* ---- SKY: small hard moon in the corner (corners are L6-legal), three
   coarse soft star blooms (60-90px features, ~6% alpha), one soft milky-way
   band, and green airglow low over the horizon. STATIC, promoted. ---- */
html::before {
  content: "";
  display: var(--ufo-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background:
    radial-gradient(circle at 10.75% 13.35%, rgba(150, 180, 158, 0.32) 0 1.3px, rgba(150, 180, 158, 0) 2.4px),
    radial-gradient(circle at 11.28% 12.72%, rgba(150, 180, 158, 0.24) 0 0.9px, rgba(150, 180, 158, 0) 1.8px),
    radial-gradient(ellipse 3px 60px at 11% 13%, rgba(240, 255, 244, 0.5) 0%, rgba(240, 255, 244, 0) 78%),
    radial-gradient(ellipse 84px 2.4px at 11% 13%, rgba(240, 255, 244, 0.42) 0%, rgba(240, 255, 244, 0) 80%),
    radial-gradient(circle at 11% 13%, rgba(255, 255, 253, 1) 0 5px, rgba(244, 252, 244, 0.98) 6px, rgba(224, 242, 226, 0.92) 8px, rgba(196, 226, 204, 0.62) 9.4px, rgba(170, 208, 178, 0.2) 12px, rgba(170, 208, 178, 0) 22px),
    radial-gradient(circle at 9.7% 11.7%, rgba(255, 255, 254, 0.9) 0 1.6px, rgba(255, 255, 254, 0) 3.4px),
    radial-gradient(ellipse 128px 116px at 11% 13%, rgba(190, 236, 200, 0.16) 0%, rgba(190, 236, 200, 0.055) 42%, rgba(190, 236, 200, 0) 74%),
    radial-gradient(circle at 79% 17%, rgba(240, 255, 242, 0.85) 0 1.6px, rgba(240, 255, 242, 0) 3.4px),
    radial-gradient(ellipse 90px 70px at 79% 17%, rgba(170, 240, 180, 0.08) 0%, rgba(170, 240, 180, 0) 70%),
    radial-gradient(circle at 27% 7%, rgba(240, 255, 242, 0.8) 0 1.4px, rgba(240, 255, 242, 0) 3px),
    radial-gradient(ellipse 70px 56px at 27% 7%, rgba(210, 250, 215, 0.07) 0%, rgba(210, 250, 215, 0) 70%),
    radial-gradient(circle at 90% 42%, rgba(240, 255, 242, 0.7) 0 1.4px, rgba(240, 255, 242, 0) 3px),
    radial-gradient(ellipse 80px 64px at 90% 42%, rgba(170, 240, 180, 0.06) 0%, rgba(170, 240, 180, 0) 70%),
    radial-gradient(circle at 17% 24%, rgba(236, 250, 236, 0.58) 0 1.2px, rgba(236, 250, 236, 0) 2.6px),
    radial-gradient(circle at 68% 9%, rgba(255, 244, 210, 0.6) 0 1.3px, rgba(255, 244, 210, 0) 2.8px),
    radial-gradient(circle at 94% 27%, rgba(200, 240, 208, 0.5) 0 1.1px, rgba(200, 240, 208, 0) 2.4px),
    radial-gradient(circle at 6% 34%, rgba(236, 250, 236, 0.44) 0 1.1px, rgba(236, 250, 236, 0) 2.4px),
    radial-gradient(circle at 85% 8%, rgba(236, 250, 236, 0.5) 0 1.2px, rgba(236, 250, 236, 0) 2.6px),
    linear-gradient(115deg, rgba(140, 220, 160, 0) 28%, rgba(140, 220, 160, 0.055) 43%, rgba(196, 244, 206, 0.085) 50%, rgba(140, 220, 160, 0.055) 57%, rgba(140, 220, 160, 0) 72%),
    linear-gradient(74deg, rgba(120, 200, 150, 0) 62%, rgba(150, 220, 170, 0.035) 74%, rgba(120, 200, 150, 0) 88%),
    radial-gradient(ellipse 60% 46% at 50% 20%, rgba(150, 220, 168, 0.05) 0%, rgba(150, 220, 168, 0.018) 50%, rgba(150, 220, 168, 0) 78%),
    radial-gradient(ellipse 42% 60% at 50% 74%, rgba(120, 210, 150, 0.06) 0%, rgba(120, 210, 150, 0.02) 46%, rgba(120, 210, 150, 0) 76%),
    linear-gradient(180deg, rgba(125, 255, 106, 0) 60%, rgba(125, 255, 106, 0.05) 82%, rgba(170, 255, 158, 0.11) 100%);
}

/* ---- THE BEAM + scrim, STATIC + promoted. This is the hero fiction, so it
   is built as a REAL volumetric shaft, not a thread. Reading top→bottom of
   the paint stack: (1) a coarse readability scrim under the text lane; (2) a
   mid-air "abduction glow" — a big soft green bloom filling what used to be
   the dead center of the frame; (3) the cone itself — five nested conic
   wedges widening from a hot ~226,255,214 core line out to a wide 96,210,84
   spill, each MUCH brighter/wider than before so it reads as a solid
   column of light; (4) coarse volumetric haze discs (>=48px, soft) crossing
   the void where dust catches the beam; (5) the emitter bloom at the hull
   lip. All coarse, soft, static — L6-legal light, no fine screen-fixed
   twinkles over the lane. ---- */
html::after {
  content: "";
  display: var(--ufo-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background:
    radial-gradient(ellipse 62% 64% at 50% 58%, rgba(2, 6, 4, 0.46) 0%, rgba(2, 6, 4, 0.30) 55%, rgba(2, 6, 4, 0) 82%),
    radial-gradient(ellipse 30% 34% at 50% 40%, rgba(150, 255, 130, 0.075) 0%, rgba(125, 255, 106, 0.03) 46%, rgba(125, 255, 106, 0) 78%),
    conic-gradient(from 0deg at 50% calc(1.5vh + 118px), rgba(232, 255, 224, 0) 178.9deg, rgba(236, 255, 228, 0.26) 179.7deg 180.3deg, rgba(232, 255, 224, 0) 181.1deg),
    conic-gradient(from 0deg at 50% calc(1.5vh + 118px), rgba(226, 255, 214, 0) 178deg, rgba(226, 255, 216, 0.17) 179.3deg 180.7deg, rgba(226, 255, 214, 0) 182deg),
    conic-gradient(from 0deg at 50% calc(1.5vh + 118px), rgba(180, 255, 158, 0) 176.6deg, rgba(190, 255, 168, 0.13) 178.7deg 181.3deg, rgba(180, 255, 158, 0) 183.4deg),
    conic-gradient(from 0deg at 50% calc(1.5vh + 118px), rgba(125, 255, 106, 0) 172.6deg, rgba(140, 255, 118, 0.11) 176.8deg 183.2deg, rgba(125, 255, 106, 0) 187.4deg),
    conic-gradient(from 0deg at 50% calc(1.5vh + 118px), rgba(110, 235, 96, 0) 166deg, rgba(118, 240, 104, 0.075) 174deg 186deg, rgba(110, 235, 96, 0) 194deg),
    conic-gradient(from 0deg at 50% calc(1.5vh + 118px), rgba(96, 210, 84, 0) 158.5deg, rgba(100, 216, 88, 0.04) 170.5deg 189.5deg, rgba(96, 210, 84, 0) 201.5deg),
    radial-gradient(ellipse 46% 46% at 50% 100%, rgba(125, 255, 106, 0.10) 0%, rgba(125, 255, 106, 0.03) 42%, rgba(125, 255, 106, 0) 66%),
    radial-gradient(ellipse 26px 320px at 50% 52%, rgba(200, 255, 178, 0.10) 0%, rgba(160, 245, 138, 0.045) 40%, rgba(150, 240, 130, 0) 80%),
    radial-gradient(ellipse 40px 210px at 50% 38%, rgba(196, 255, 176, 0.055) 0%, rgba(150, 240, 130, 0.02) 48%, rgba(150, 240, 130, 0) 82%),
    radial-gradient(ellipse 44px 20px at 50% 30%, rgba(220, 255, 200, 0.15) 0%, rgba(220, 255, 200, 0) 74%),
    radial-gradient(ellipse 60px 24px at 50% 44%, rgba(208, 255, 188, 0.125) 0%, rgba(208, 255, 188, 0) 74%),
    radial-gradient(ellipse 78px 28px at 50% 58%, rgba(184, 252, 160, 0.105) 0%, rgba(184, 252, 160, 0) 76%),
    radial-gradient(ellipse 96px 32px at 50% 72%, rgba(174, 248, 154, 0.088) 0%, rgba(174, 248, 154, 0) 76%),
    radial-gradient(ellipse 116px 36px at 50% 86%, rgba(156, 240, 136, 0.07) 0%, rgba(156, 240, 136, 0) 78%),
    radial-gradient(ellipse 2.4px 40px at 50% calc(1.5vh + 120px), rgba(236, 255, 224, 0.55) 0%, rgba(236, 255, 224, 0) 82%),
    radial-gradient(ellipse 56px 2.2px at 50% calc(1.5vh + 120px), rgba(236, 255, 224, 0.45) 0%, rgba(236, 255, 224, 0) 84%),
    radial-gradient(ellipse 200px 60px at 50% calc(1.5vh + 128px), rgba(226, 255, 210, 0.30) 0%, rgba(160, 255, 140, 0.16) 34%, rgba(125, 255, 106, 0.06) 58%, rgba(125, 255, 106, 0) 80%),
    radial-gradient(circle 44px at 50% calc(1.5vh + 120px), rgba(240, 255, 232, 0.34) 0%, rgba(200, 255, 180, 0.12) 46%, rgba(200, 255, 180, 0) 74%);
}

/* ---- DESERT HORIZON: one wide SVG built in TRUE depth layers with
   atmospheric perspective — a far butte ridge (cool, hazy, low contrast),
   a warmer band of mid mesas carrying the radar installation (dish + lattice
   tower + guy-wires, legible now), and a dark near dune with scrub tufts,
   two rim-lit saguaros and a boulder cluster. Above the far ridge sits an
   airglow wash; behind the right mesa, the amber base-glow seeps up. The
   whole thing is graded so distance = cooler + hazier + lower contrast.
   Beneath in the CSS stack: the green pool where the beam lands. STATIC,
   promoted. Height bumped to 34vh to give the depth room to breathe. ---- */
body::before {
  content: "";
  display: var(--ufo-scenery, block);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 34vh;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background:
    radial-gradient(ellipse 380px 46px at 50% 78%, rgba(125, 255, 106, 0.18) 0%, rgba(125, 255, 106, 0.05) 46%, rgba(125, 255, 106, 0) 72%) no-repeat,
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 340' preserveAspectRatio='none'%3E%3Cdefs%3E%3ClinearGradient id='airglow' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%2374c8a0' stop-opacity='.14'/%3E%3Cstop offset='55%25' stop-color='%234f9878' stop-opacity='.05'/%3E%3Cstop offset='100%25' stop-color='%234f9878' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='far' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%23294f47'/%3E%3Cstop offset='100%25' stop-color='%231e3f38'/%3E%3C/linearGradient%3E%3CradialGradient id='basewarm' cx='50%25' cy='100%25' r='62%25'%3E%3Cstop offset='0%25' stop-color='%23e0a552' stop-opacity='.34'/%3E%3Cstop offset='48%25' stop-color='%23c98a3a' stop-opacity='.12'/%3E%3Cstop offset='100%25' stop-color='%23c98a3a' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='mid' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%23234a35'/%3E%3Cstop offset='100%25' stop-color='%23112a1d'/%3E%3C/linearGradient%3E%3ClinearGradient id='haze' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%232a5648' stop-opacity='.6'/%3E%3Cstop offset='100%25' stop-color='%23163027' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='near' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%230a1710'/%3E%3Cstop offset='55%25' stop-color='%23050e08'/%3E%3Cstop offset='100%25' stop-color='%23010402'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='0' y='40' width='1600' height='120' fill='url(%23airglow)'/%3E%3Cellipse cx='1300' cy='210' rx='340' ry='120' fill='url(%23basewarm)'/%3E%3Cpath d='M0 150 Q150 138 260 146 L300 122 Q330 116 360 122 L392 146 Q520 152 700 143 Q880 134 1010 146 L1044 120 Q1078 114 1112 120 L1150 146 Q1360 154 1600 144 L1600 340 L0 340 Z' fill='url(%23far)' opacity='.62'/%3E%3Crect x='0' y='120' width='1600' height='58' fill='url(%23haze)'/%3E%3Cpath d='M0 200 L150 200 L168 168 L286 168 L304 200 L470 200 L488 182 L582 182 L598 200 L860 200 L878 160 L1018 160 L1036 200 L1300 200 L1316 184 L1414 184 L1430 200 L1600 200 L1600 340 L0 340 Z' fill='url(%23mid)'/%3E%3Cpath d='M0 201 L150 201 L168 169 L286 169 L304 201 L470 201 L488 183 L582 183 L598 201 L860 201 L878 161 L1018 161 L1036 201 L1300 201 L1316 185 L1414 185 L1430 201 L1600 201' fill='none' stroke='%23bfe6c8' stroke-opacity='.34' stroke-width='1.3' stroke-linejoin='round'/%3E%3Cpath d='M150 201 L168 169 L286 169 L304 201 M470 201 L488 183 L582 183 L598 201 M860 201 L878 161 L1018 161 L1036 201 M1300 201 L1316 185 L1414 185 L1430 201' fill='none' stroke='%23eafff2' stroke-opacity='.5' stroke-width='1' stroke-linejoin='round'/%3E%3Cg fill='none' stroke='%234a8a5c' stroke-opacity='.28' stroke-width='1.5' stroke-linecap='round'%3E%3Cpath d='M168 168 L286 168'/%3E%3Cpath d='M488 182 L582 182'/%3E%3Cpath d='M878 160 L1018 160'/%3E%3Cpath d='M1316 184 L1414 184'/%3E%3C/g%3E%3Cg fill='none' stroke='%237dff6a' stroke-opacity='.13' stroke-width='1.1'%3E%3Cpath d='M878 160 L894 200'/%3E%3Cpath d='M488 182 L502 200'/%3E%3C/g%3E%3Cg stroke='%231a3a2c' stroke-opacity='.5' stroke-width='1'%3E%3Cpath d='M210 174 L210 198'/%3E%3Cpath d='M250 172 L250 198'/%3E%3Cpath d='M930 168 L930 198'/%3E%3Cpath d='M975 166 L975 198'/%3E%3C/g%3E%3Cg%3E%3Cpath d='M1300 150 L1289 200 M1300 150 L1311 200' stroke='%23223d2c' stroke-width='2.4'/%3E%3Crect x='1298' y='150' width='4' height='50' fill='%231a3325'/%3E%3Cpath d='M1291 165 L1309 165 M1293 180 L1307 180 M1295 192 L1305 192' stroke='%23264a34' stroke-width='1.3'/%3E%3Cpath d='M1290 200 L1300 150 M1298 150 L1298 200' stroke='%2384c79a' stroke-opacity='.34' stroke-width='.8'/%3E%3Cpath d='M1300 150 L1274 152 M1300 150 L1326 152' stroke='%23305a3f' stroke-width='1' stroke-opacity='.7'/%3E%3Cellipse cx='1300' cy='138' rx='24' ry='8.4' fill='%23223b2c' transform='rotate(-26 1300 138)'/%3E%3Cellipse cx='1296' cy='136' rx='16' ry='5.4' fill='%23e0a552' fill-opacity='.16' transform='rotate(-26 1300 138)'/%3E%3Cpath d='M1276 137 A24 8.4 0 0 1 1324 139' fill='none' stroke='%23eafff2' stroke-opacity='.5' stroke-width='1.3' transform='rotate(-26 1300 138)'/%3E%3Cellipse cx='1300' cy='138' rx='24' ry='8.4' fill='none' stroke='%235aa06e' stroke-opacity='.6' stroke-width='1.1' transform='rotate(-26 1300 138)'/%3E%3Cpath d='M1300 138 L1317 125' stroke='%23345536' stroke-width='2.4'/%3E%3Ccircle cx='1319' cy='123' r='2.8' fill='%23223b2c'/%3E%3Ccircle cx='1318' cy='122.4' r='1.1' fill='%23c8ffb2' opacity='.7'/%3E%3Cpath d='M1284 134 Q1301 121 1322 130' fill='none' stroke='%235aa06e' stroke-opacity='.5' stroke-width='1.2' transform='rotate(-26 1300 138)'/%3E%3C/g%3E%3Cpath d='M0 258 Q120 244 280 250 Q430 256 560 248 Q640 243 720 250 Q760 254 800 250 Q960 240 1140 252 Q1320 262 1480 250 Q1545 245 1600 251 L1600 340 L0 340 Z' fill='url(%23near)'/%3E%3Cpath d='M0 258 Q120 244 280 250 Q430 256 560 248 Q640 243 720 250 Q760 254 800 250 Q960 240 1140 252 Q1320 262 1480 250 Q1545 245 1600 251' fill='none' stroke='%233d7d54' stroke-opacity='.5' stroke-width='1.6'/%3E%3Cpath d='M0 257 Q120 243 280 249 Q430 255 560 247 Q640 242 720 249 Q760 253 800 249 Q960 239 1140 251 Q1320 261 1480 249 Q1545 244 1600 250' fill='none' stroke='%23c4ecce' stroke-opacity='.32' stroke-width='.9'/%3E%3Cg fill='%23050e08'%3E%3Crect x='268' y='196' width='12' height='68' rx='6'/%3E%3Crect x='250' y='210' width='10' height='30' rx='5'/%3E%3Crect x='250' y='232' width='20' height='10' rx='5'/%3E%3Crect x='288' y='220' width='10' height='24' rx='5'/%3E%3Crect x='272' y='236' width='26' height='10' rx='5'/%3E%3Crect x='1352' y='214' width='10' height='50' rx='5'/%3E%3Crect x='1336' y='222' width='9' height='22' rx='4.5'/%3E%3Crect x='1336' y='238' width='18' height='9' rx='4.5'/%3E%3Cellipse cx='620' cy='262' rx='20' ry='7'/%3E%3Cellipse cx='600' cy='266' rx='12' ry='5'/%3E%3Cellipse cx='1150' cy='266' rx='14' ry='5.5'/%3E%3C/g%3E%3Cg fill='none' stroke='%23122619' stroke-width='2.4' stroke-linecap='round' opacity='.9'%3E%3Cpath d='M90 264 L86 250 M90 264 L94 251 M90 264 L90 248'/%3E%3Cpath d='M410 262 L406 250 M410 262 L414 251 M410 262 L410 247'/%3E%3Cpath d='M930 264 L926 252 M930 264 L934 253 M930 264 L930 250'/%3E%3Cpath d='M1240 263 L1236 252 M1240 263 L1244 253'/%3E%3Cpath d='M1480 262 L1476 251 M1480 262 L1484 252 M1480 262 L1480 249'/%3E%3C/g%3E%3Cpath d='M271 198 L271 260' stroke='%23d6f7de' stroke-opacity='.42' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpath d='M252 212 L252 238' stroke='%23d6f7de' stroke-opacity='.32' stroke-width='1.2' stroke-linecap='round'/%3E%3Cpath d='M280 200 L280 260' stroke='%237dff6a' stroke-opacity='.34' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M290 222 L290 242' stroke='%237dff6a' stroke-opacity='.22' stroke-width='1.2' stroke-linecap='round'/%3E%3Cpath d='M1354 216 L1354 262' stroke='%23d6f7de' stroke-opacity='.36' stroke-width='1.4' stroke-linecap='round'/%3E%3Cpath d='M1362 218 L1362 262' stroke='%237dff6a' stroke-opacity='.26' stroke-width='1.6' stroke-linecap='round'/%3E%3Cpath d='M1338 224 L1338 242' stroke='%23d6f7de' stroke-opacity='.26' stroke-width='1.1' stroke-linecap='round'/%3E%3C/svg%3E") 0 0 / 100% 100% no-repeat,
    radial-gradient(ellipse 240px 44px at 81% 62%, rgba(255, 184, 84, 0.24) 0%, rgba(255, 184, 84, 0.06) 44%, rgba(255, 184, 84, 0) 72%) no-repeat;
}

/* ---- THE COWS: continuous mover #2 (88px, will-change). A 40s two-act
   cycle so the cadence never feels metronomic: act I, a cow grazes 6s and
   is taken in one clean pull; the field sits empty; act II, a second cow
   wanders in a step to the left, grazes longer — and STALLS mid-beam
   (the tractor beam visibly straining) before it finally goes. Stiff
   legs, panicked sway, shrinking toward the hull, gone before overlap.
   z:-1 keeps it UNDER the crawl text (body::after paints after the roll
   in tree order, so at z:0 it would ink over names mid-lane). ---- */
body::after {
  content: "";
  display: var(--ufo-scenery, block);
  position: fixed;
  left: 50%;
  bottom: 6.5vh;
  width: 88px;
  height: 60px;
  margin-left: -44px;
  z-index: -1;
  pointer-events: none;
  opacity: 0;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 66'%3E%3Cdefs%3E%3CradialGradient id='cg' cx='50%25' cy='42%25' r='56%25'%3E%3Cstop offset='0%25' stop-color='%23aef79a' stop-opacity='.24'/%3E%3Cstop offset='55%25' stop-color='%237dff6a' stop-opacity='.1'/%3E%3Cstop offset='100%25' stop-color='%237dff6a' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='cpool' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0%25' stop-color='%23c8ffb2' stop-opacity='.5'/%3E%3Cstop offset='45%25' stop-color='%237dff6a' stop-opacity='.22'/%3E%3Cstop offset='100%25' stop-color='%237dff6a' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='cbody' x1='0.1' y1='0' x2='0.4' y2='1'%3E%3Cstop offset='0%25' stop-color='%233a5238'/%3E%3Cstop offset='38%25' stop-color='%23213420'/%3E%3Cstop offset='72%25' stop-color='%23121e14'/%3E%3Cstop offset='100%25' stop-color='%23070d09'/%3E%3C/linearGradient%3E%3CradialGradient id='cbelly' cx='50%25' cy='100%25' r='62%25'%3E%3Cstop offset='0%25' stop-color='%23a7ff8e' stop-opacity='.32'/%3E%3Cstop offset='55%25' stop-color='%235bbf52' stop-opacity='.1'/%3E%3Cstop offset='100%25' stop-color='%235bbf52' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='chorn' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%23e6dcc2'/%3E%3Cstop offset='100%25' stop-color='%238a7e5e'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cellipse cx='48' cy='30' rx='44' ry='28' fill='url(%23cg)'/%3E%3Cellipse cx='49' cy='60' rx='30' ry='7' fill='url(%23cpool)'/%3E%3Cellipse cx='49' cy='58' rx='22' ry='4.2' fill='%23020604' opacity='.66'/%3E%3Cpath d='M74 27 Q85 29 83 41 Q82.2 47 85 50' stroke='%230a120c' stroke-width='2.6' fill='none' stroke-linecap='round'/%3E%3Cpath d='M84 49 Q86 53 82 56' stroke='%230a120c' stroke-width='3.6' fill='none' stroke-linecap='round'/%3E%3Cg fill='%230a120c'%3E%3Crect x='31' y='40' width='5.4' height='19' rx='2.4'/%3E%3Crect x='40' y='41' width='5.4' height='17' rx='2.4'/%3E%3Crect x='58' y='41' width='5.4' height='17' rx='2.4'/%3E%3Crect x='67.5' y='40' width='5.4' height='19' rx='2.4'/%3E%3C/g%3E%3Cg fill='%23050b07'%3E%3Crect x='31' y='56' width='5.4' height='3.6' rx='1'/%3E%3Crect x='40' y='55' width='5.4' height='3.4' rx='1'/%3E%3Crect x='58' y='55' width='5.4' height='3.4' rx='1'/%3E%3Crect x='67.5' y='56' width='5.4' height='3.6' rx='1'/%3E%3C/g%3E%3Cpath d='M33 41 L33.6 55 M69.4 41 L68.8 55' stroke='%237dff6a' stroke-opacity='.3' stroke-width='1' stroke-linecap='round'/%3E%3Cpath d='M27 31 Q25 20 38 17.5 L66 16.5 Q81 16.5 81 30 Q81 44 66 45 L40 45 Q27 44 27 31 Z' fill='url(%23cbody)'/%3E%3Cellipse cx='54' cy='42' rx='15' ry='6' fill='url(%23cbelly)'/%3E%3Cpath d='M44 20 Q52 17 62 19 Q60 25 50 25 Q44 24 44 20 Z' fill='%23e8dccb' opacity='.14'/%3E%3Cpath d='M36 34 Q44 31 50 35 Q45 39 39 38 Q35 37 36 34 Z' fill='%23e8dccb' opacity='.1'/%3E%3Cellipse cx='52' cy='43' rx='4' ry='2.6' fill='%23e6c9a0' opacity='.22'/%3E%3Cpath d='M30 27 L25 22 Q22 14 30 11 L39 9 L41 25 Z' fill='url(%23cbody)'/%3E%3Cpath d='M22.5 6.5 Q15 4 11 8 Q18 12.5 25 12 Z' fill='%23d8ccb2'/%3E%3Cpath d='M22.5 6.5 Q15 4 11 8 Q18 12.5 25 12 Z' fill='none' stroke='%238a7e5e' stroke-width='.5' stroke-opacity='.6'/%3E%3Cpath d='M40 8 Q47 3.5 50 9' fill='none' stroke='url(%23chorn)' stroke-width='2.2' stroke-linecap='round'/%3E%3Cpath d='M40 8 Q46.6 4 49.4 8.6' fill='none' stroke='%23fff2d4' stroke-width='.7' stroke-linecap='round' opacity='.7'/%3E%3Cpath d='M32 5 Q28 8 30 12 Q26 8 30 4 Z' fill='%230a120c'/%3E%3Cellipse cx='24' cy='24' rx='5.2' ry='4.2' fill='%230a120c'/%3E%3Cellipse cx='26' cy='23.5' rx='2.6' ry='1.8' fill='%234a3630' opacity='.7'/%3E%3Ccircle cx='23' cy='22' r='.7' fill='%23120806'/%3E%3Ccircle cx='31.5' cy='18' r='2.6' fill='%23f2fbe8' opacity='.95'/%3E%3Ccircle cx='31.9' cy='18.5' r='1.2' fill='%23060c08'/%3E%3Ccircle cx='32.4' cy='17.4' r='.6' fill='%23ffffff'/%3E%3Cpath d='M27 31 Q25 20 38 17 L66 16.5 Q81 16.5 81 30' fill='none' stroke='%237dff6a' stroke-width='2.1' opacity='.95' stroke-linecap='round'/%3E%3Cpath d='M30 12 Q34 9 40 10' stroke='%23c8ffb2' stroke-width='1.5' opacity='.8' fill='none' stroke-linecap='round'/%3E%3Cpath d='M79 30 Q80 23 74 19' stroke='%237dff6a' stroke-width='1.4' opacity='.55' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='39' cy='16.6' r='1.4' fill='%23eaffe0' opacity='.9'/%3E%3Ccircle cx='55' cy='16.5' r='1.1' fill='%23aef79a' opacity='.75'/%3E%3C/svg%3E") center / contain no-repeat;
  will-change: transform;
  animation: ufo-abduct 40s ease-in-out infinite;
}

/* ---- THE SAUCER: hero prop, top-center. Chrome dome with a hot specular,
   7-stop chrome disc, dark keel ring carrying six amber portholes (odds lit
   in the hull state), red beacon on the mast, acid-green emitter + halo all
   baked into one SVG. head::before = hull, head::after = the chase overlay:
   identical geometry, the SAME bob keyframe (welded), plus a steps() opacity
   swap that flips which portholes burn and blinks the beacon — one visual
   mover in two locked layers (+ cow = the 2-mover budget; 3 will-change
   total = the cap). ---- */
head { display: var(--ufo-scenery, block); }
head::before,
head::after {
  content: "";
  display: var(--ufo-scenery, block);
  position: fixed;
  top: 1.5vh;
  left: 50%;
  width: 300px;
  height: 178px;
  z-index: 0;
  pointer-events: none;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  transform: translate3d(-50%, 0, 0);
  will-change: transform;
  animation: ufo-bob 7s ease-in-out infinite;
}
head::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 190'%3E%3Cdefs%3E%3CradialGradient id='dome' cx='38%25' cy='26%25' r='82%25'%3E%3Cstop offset='0%25' stop-color='%23fbfff9'/%3E%3Cstop offset='14%25' stop-color='%23e2efe4'/%3E%3Cstop offset='30%25' stop-color='%23bcd2c2'/%3E%3Cstop offset='50%25' stop-color='%238ba699'/%3E%3Cstop offset='70%25' stop-color='%23566d5e'/%3E%3Cstop offset='88%25' stop-color='%23334439'/%3E%3Cstop offset='100%25' stop-color='%231c2a23'/%3E%3C/radialGradient%3E%3ClinearGradient id='domerefl' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%239fd8c9' stop-opacity='0'/%3E%3Cstop offset='62%25' stop-color='%2378c8b0' stop-opacity='.22'/%3E%3Cstop offset='100%25' stop-color='%2364b89e' stop-opacity='.4'/%3E%3C/linearGradient%3E%3ClinearGradient id='disc' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%23f4fbf4'/%3E%3Cstop offset='11%25' stop-color='%23d4e3d6'/%3E%3Cstop offset='26%25' stop-color='%23a7bcac'/%3E%3Cstop offset='42%25' stop-color='%237a9184'/%3E%3Cstop offset='58%25' stop-color='%23516557'/%3E%3Cstop offset='76%25' stop-color='%232f4137'/%3E%3Cstop offset='100%25' stop-color='%230d160f'/%3E%3C/linearGradient%3E%3ClinearGradient id='discenv' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%23bfeee0' stop-opacity='.5'/%3E%3Cstop offset='34%25' stop-color='%2384d4c0' stop-opacity='.16'/%3E%3Cstop offset='58%25' stop-color='%235a9c86' stop-opacity='0'/%3E%3Cstop offset='84%25' stop-color='%23c98a3a' stop-opacity='.14'/%3E%3Cstop offset='100%25' stop-color='%23e0a552' stop-opacity='.32'/%3E%3C/linearGradient%3E%3ClinearGradient id='keel' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%232a3b2e'/%3E%3Cstop offset='40%25' stop-color='%23141f18'/%3E%3Cstop offset='100%25' stop-color='%23040a07'/%3E%3C/linearGradient%3E%3CradialGradient id='keelwarm' cx='50%25' cy='96%25' r='60%25'%3E%3Cstop offset='0%25' stop-color='%237dff6a' stop-opacity='.3'/%3E%3Cstop offset='55%25' stop-color='%235bbf52' stop-opacity='.09'/%3E%3Cstop offset='100%25' stop-color='%237dff6a' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='uglow' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0%25' stop-color='%237dff6a' stop-opacity='.55'/%3E%3Cstop offset='60%25' stop-color='%237dff6a' stop-opacity='.16'/%3E%3Cstop offset='100%25' stop-color='%237dff6a' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='halo' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0%25' stop-color='%23aef7a2' stop-opacity='.2'/%3E%3Cstop offset='55%25' stop-color='%237dff6a' stop-opacity='.07'/%3E%3Cstop offset='100%25' stop-color='%237dff6a' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='pg' cx='50%25' cy='38%25' r='58%25'%3E%3Cstop offset='0%25' stop-color='%23fff0d0' stop-opacity='.6'/%3E%3Cstop offset='45%25' stop-color='%23ffc46b' stop-opacity='.34'/%3E%3Cstop offset='100%25' stop-color='%23ffc46b' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='pglass' cx='42%25' cy='34%25' r='72%25'%3E%3Cstop offset='0%25' stop-color='%23fff6de'/%3E%3Cstop offset='38%25' stop-color='%23ffcf88'/%3E%3Cstop offset='72%25' stop-color='%23e79a3c'/%3E%3Cstop offset='100%25' stop-color='%23a1651f'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='160' cy='100' rx='158' ry='84' fill='url(%23halo)'/%3E%3Crect x='158.6' y='30' width='2.8' height='16' rx='1.4' fill='%239fb3a6'/%3E%3Crect x='158.6' y='30' width='1.1' height='16' rx='.6' fill='%23e8f4ea' opacity='.7'/%3E%3Ccircle cx='160' cy='27' r='8' fill='%23ff5149' opacity='.16'/%3E%3Ccircle cx='160' cy='27' r='3' fill='%23aa4038'/%3E%3Cellipse cx='160' cy='72' rx='54' ry='40' fill='url(%23dome)'/%3E%3Cpath d='M108 76 A54 40 0 0 1 212 76 A116 20 0 0 0 108 76 Z' fill='url(%23domerefl)'/%3E%3Cpath d='M108 74 A52 38 0 0 1 160 34' fill='none' stroke='%23e6fff4' stroke-opacity='.5' stroke-width='1.4'/%3E%3Cpath d='M132 44 Q120 55 116 74' fill='none' stroke='%23dff7ec' stroke-opacity='.28' stroke-width='1'/%3E%3Cellipse cx='139' cy='53' rx='15' ry='8' fill='%23ffffff' opacity='.5' transform='rotate(-22 139 53)'/%3E%3Cellipse cx='148' cy='60' rx='7' ry='11' fill='%23ffffff' opacity='.22' transform='rotate(28 148 60)'/%3E%3Cg opacity='.92'%3E%3Cpath d='M135 39 L136.6 49 L135 50.4 L133.4 49 Z' fill='%23ffffff'/%3E%3Cpath d='M135 61 L136.6 51 L135 49.6 L133.4 51 Z' fill='%23ffffff'/%3E%3Cpath d='M124 50 L134 48.4 L135.4 50 L134 51.6 Z' fill='%23ffffff'/%3E%3Cpath d='M146 50 L136 48.4 L134.6 50 L136 51.6 Z' fill='%23ffffff'/%3E%3Ccircle cx='135' cy='50' r='3.4' fill='%23ffffff'/%3E%3Ccircle cx='135' cy='50' r='6.5' fill='%23eafff6' opacity='.28'/%3E%3C/g%3E%3Ccircle cx='178' cy='58' r='1.5' fill='%23eafff6' opacity='.6'/%3E%3Cellipse cx='160' cy='94' rx='55' ry='10' fill='%23070d07' opacity='.5'/%3E%3Cellipse cx='160' cy='100' rx='136' ry='30' fill='url(%23disc)'/%3E%3Cellipse cx='160' cy='100' rx='136' ry='30' fill='url(%23discenv)'/%3E%3Cg fill='none' stroke='%231a251d' stroke-opacity='.72' stroke-width='.9'%3E%3Cpath d='M160 71 L160 129'/%3E%3Cpath d='M96 74 Q118 100 108 127'/%3E%3Cpath d='M224 74 Q202 100 212 127'/%3E%3Cpath d='M60 90 Q104 106 116 100'/%3E%3Cpath d='M260 90 Q216 106 204 100'/%3E%3C/g%3E%3Cg fill='none' stroke='%23eafff2' stroke-opacity='.2' stroke-width='.6'%3E%3Cpath d='M161.3 71 L161.3 129'/%3E%3Cpath d='M97.2 74 Q119 100 109.2 127'/%3E%3Cpath d='M225.2 74 Q203 100 213 127'/%3E%3C/g%3E%3Cellipse cx='160' cy='89' rx='118' ry='12' fill='none' stroke='%23eafff2' stroke-opacity='.16' stroke-width='.8'/%3E%3Cellipse cx='160' cy='88' rx='116' ry='11' fill='%23eefff0' opacity='.12'/%3E%3Cellipse cx='104' cy='88' rx='44' ry='4.5' fill='%23f4fff6' opacity='.34' transform='rotate(-3 104 88)'/%3E%3Cellipse cx='88' cy='87' rx='11' ry='2.6' fill='%23ffffff' opacity='.7' transform='rotate(-3 88 87)'/%3E%3Cg opacity='.85'%3E%3Cpath d='M84 82 L85.2 86.4 L84 87.4 L82.8 86.4 Z' fill='%23ffffff'/%3E%3Cpath d='M84 92 L85.2 87.6 L84 86.6 L82.8 87.6 Z' fill='%23ffffff'/%3E%3Cpath d='M76 87 L83 86 L84.2 87 L83 88 Z' fill='%23ffffff'/%3E%3Cpath d='M92 87 L85 86 L83.8 87 L85 88 Z' fill='%23ffffff'/%3E%3Ccircle cx='84' cy='87' r='1.7' fill='%23ffffff'/%3E%3C/g%3E%3Cellipse cx='238' cy='91' rx='22' ry='3' fill='%23c98a3a' opacity='.18'/%3E%3Cg fill='%23cfe0d4' fill-opacity='.4'%3E%3Ccircle cx='72' cy='104' r='.9'/%3E%3Ccircle cx='96' cy='108' r='.9'/%3E%3Ccircle cx='120' cy='110' r='.9'/%3E%3Ccircle cx='160' cy='111' r='.9'/%3E%3Ccircle cx='200' cy='110' r='.9'/%3E%3Ccircle cx='224' cy='108' r='.9'/%3E%3Ccircle cx='248' cy='104' r='.9'/%3E%3C/g%3E%3Cpath d='M40 98 Q34 92 44 84' fill='none' stroke='%23dff7ec' stroke-opacity='.45' stroke-width='1.6' stroke-linecap='round'/%3E%3Cellipse cx='160' cy='112' rx='92' ry='16' fill='url(%23keel)'/%3E%3Cellipse cx='160' cy='118' rx='78' ry='11' fill='url(%23keelwarm)'/%3E%3Cg stroke='%23070f0a' stroke-opacity='.5' stroke-width='.7'%3E%3Cpath d='M96 108 L96 122'/%3E%3Cpath d='M120 112 L120 127'/%3E%3Cpath d='M200 112 L200 127'/%3E%3Cpath d='M224 108 L224 122'/%3E%3C/g%3E%3Cellipse cx='160' cy='105' rx='90' ry='12' fill='none' stroke='%23a9d0b6' stroke-opacity='.22' stroke-width='.8'/%3E%3Cellipse cx='160' cy='112' rx='92' ry='16' fill='none' stroke='%237dff6a' stroke-opacity='.16' stroke-width='1'/%3E%3Cg%3E%3Ccircle cx='75.9' cy='117.7' r='10' fill='url(%23pg)'/%3E%3Ccircle cx='75.9' cy='117.7' r='5' fill='%23241a0e'/%3E%3Ccircle cx='75.9' cy='117.7' r='4.4' fill='url(%23pglass)'/%3E%3Cellipse cx='74.2' cy='116' rx='1.7' ry='1.1' fill='%23fff8e6' opacity='.92' transform='rotate(-30 74.2 116)'/%3E%3Ccircle cx='75.9' cy='117.7' r='5' fill='none' stroke='%23e8d4a4' stroke-opacity='.4' stroke-width='.7'/%3E%3C/g%3E%3Cg%3E%3Ccircle cx='128.5' cy='125.2' r='10' fill='url(%23pg)'/%3E%3Ccircle cx='128.5' cy='125.2' r='5' fill='%23241a0e'/%3E%3Ccircle cx='128.5' cy='125.2' r='4.4' fill='url(%23pglass)'/%3E%3Cellipse cx='126.8' cy='123.5' rx='1.7' ry='1.1' fill='%23fff8e6' opacity='.92' transform='rotate(-30 126.8 123.5)'/%3E%3Ccircle cx='128.5' cy='125.2' r='5' fill='none' stroke='%23e8d4a4' stroke-opacity='.4' stroke-width='.7'/%3E%3C/g%3E%3Cg%3E%3Ccircle cx='222.7' cy='122.2' r='10' fill='url(%23pg)'/%3E%3Ccircle cx='222.7' cy='122.2' r='5' fill='%23241a0e'/%3E%3Ccircle cx='222.7' cy='122.2' r='4.4' fill='url(%23pglass)'/%3E%3Cellipse cx='221' cy='120.5' rx='1.7' ry='1.1' fill='%23fff8e6' opacity='.92' transform='rotate(-30 221 120.5)'/%3E%3Ccircle cx='222.7' cy='122.2' r='5' fill='none' stroke='%23e8d4a4' stroke-opacity='.4' stroke-width='.7'/%3E%3C/g%3E%3Cg fill='%232a1d0f' stroke='%23c98a3a' stroke-opacity='.34' stroke-width='.8'%3E%3Ccircle cx='97.3' cy='122.2' r='4.6'/%3E%3Ccircle cx='191.5' cy='125.2' r='4.6'/%3E%3Ccircle cx='244.1' cy='117.7' r='4.6'/%3E%3C/g%3E%3Cg fill='%23120c06'%3E%3Ccircle cx='97.3' cy='122.2' r='2.6'/%3E%3Ccircle cx='191.5' cy='125.2' r='2.6'/%3E%3Ccircle cx='244.1' cy='117.7' r='2.6'/%3E%3C/g%3E%3Cellipse cx='160' cy='122' rx='40' ry='11' fill='url(%23uglow)'/%3E%3Cellipse cx='160' cy='121' rx='24' ry='6' fill='%237dff6a' opacity='.7'/%3E%3Cellipse cx='160' cy='120' rx='14' ry='3.4' fill='%23e9ffdf' opacity='.85'/%3E%3C/svg%3E");
}
head::after {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 190'%3E%3Cdefs%3E%3CradialGradient id='pg2' cx='50%25' cy='38%25' r='58%25'%3E%3Cstop offset='0%25' stop-color='%23fff0d0' stop-opacity='.6'/%3E%3Cstop offset='45%25' stop-color='%23ffc46b' stop-opacity='.34'/%3E%3Cstop offset='100%25' stop-color='%23ffc46b' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='pglass2' cx='42%25' cy='34%25' r='72%25'%3E%3Cstop offset='0%25' stop-color='%23fff6de'/%3E%3Cstop offset='38%25' stop-color='%23ffcf88'/%3E%3Cstop offset='72%25' stop-color='%23e79a3c'/%3E%3Cstop offset='100%25' stop-color='%23a1651f'/%3E%3C/radialGradient%3E%3CradialGradient id='cov' cx='50%25' cy='42%25' r='58%25'%3E%3Cstop offset='0%25' stop-color='%23070f07' stop-opacity='.97'/%3E%3Cstop offset='60%25' stop-color='%23070f07' stop-opacity='.9'/%3E%3Cstop offset='85%25' stop-color='%23070f07' stop-opacity='.4'/%3E%3Cstop offset='100%25' stop-color='%23070f07' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='75.9' cy='117.7' r='11' fill='url(%23cov)'/%3E%3Ccircle cx='75.9' cy='117.7' r='4.4' fill='%231f150b'/%3E%3Ccircle cx='75.9' cy='117.7' r='5' fill='none' stroke='%235a4728' stroke-opacity='.4' stroke-width='.7'/%3E%3Ccircle cx='128.5' cy='125.2' r='11' fill='url(%23cov)'/%3E%3Ccircle cx='128.5' cy='125.2' r='4.4' fill='%231f150b'/%3E%3Ccircle cx='128.5' cy='125.2' r='5' fill='none' stroke='%235a4728' stroke-opacity='.4' stroke-width='.7'/%3E%3Ccircle cx='222.7' cy='122.2' r='11' fill='url(%23cov)'/%3E%3Ccircle cx='222.7' cy='122.2' r='4.4' fill='%231f150b'/%3E%3Ccircle cx='222.7' cy='122.2' r='5' fill='none' stroke='%235a4728' stroke-opacity='.4' stroke-width='.7'/%3E%3Cg%3E%3Ccircle cx='97.3' cy='122.2' r='10' fill='url(%23pg2)'/%3E%3Ccircle cx='97.3' cy='122.2' r='5' fill='%23241a0e'/%3E%3Ccircle cx='97.3' cy='122.2' r='4.4' fill='url(%23pglass2)'/%3E%3Cellipse cx='95.6' cy='120.5' rx='1.7' ry='1.1' fill='%23fff8e6' opacity='.92' transform='rotate(-30 95.6 120.5)'/%3E%3Ccircle cx='97.3' cy='122.2' r='5' fill='none' stroke='%23e8d4a4' stroke-opacity='.4' stroke-width='.7'/%3E%3C/g%3E%3Cg%3E%3Ccircle cx='191.5' cy='125.2' r='10' fill='url(%23pg2)'/%3E%3Ccircle cx='191.5' cy='125.2' r='5' fill='%23241a0e'/%3E%3Ccircle cx='191.5' cy='125.2' r='4.4' fill='url(%23pglass2)'/%3E%3Cellipse cx='189.8' cy='123.5' rx='1.7' ry='1.1' fill='%23fff8e6' opacity='.92' transform='rotate(-30 189.8 123.5)'/%3E%3Ccircle cx='191.5' cy='125.2' r='5' fill='none' stroke='%23e8d4a4' stroke-opacity='.4' stroke-width='.7'/%3E%3C/g%3E%3Cg%3E%3Ccircle cx='244.1' cy='117.7' r='10' fill='url(%23pg2)'/%3E%3Ccircle cx='244.1' cy='117.7' r='5' fill='%23241a0e'/%3E%3Ccircle cx='244.1' cy='117.7' r='4.4' fill='url(%23pglass2)'/%3E%3Cellipse cx='242.4' cy='116' rx='1.7' ry='1.1' fill='%23fff8e6' opacity='.92' transform='rotate(-30 242.4 116)'/%3E%3Ccircle cx='244.1' cy='117.7' r='5' fill='none' stroke='%23e8d4a4' stroke-opacity='.4' stroke-width='.7'/%3E%3C/g%3E%3Ccircle cx='160' cy='27' r='11' fill='%23ff5149' opacity='.4'/%3E%3Ccircle cx='160' cy='27' r='3.4' fill='%23ff8b7f'/%3E%3Ccircle cx='159' cy='26' r='1.2' fill='%23ffd9d4'/%3E%3C/svg%3E");
  animation: ufo-bob 7s ease-in-out infinite, ufo-chase 0.8s steps(1, end) infinite;
}

/* ---- extra prop layers: the two <meta> void elements in head render
   nothing themselves but their fixed pseudos are free canvases. ---- */
head meta { display: var(--ufo-scenery, block); }

/* ---- ROUTE 51: a shot-up highway shield on the shoulder, lower-left,
   well off the text lane. Silhouette ink like the mesas, ridge-stroke
   detail lines, a whisper of beam-side rim light down the right edge of
   post and shield, two bullet holes (this IS the desert), dim
   retroreflective legend catching the saucer glow, ground shadow.
   STATIC, promoted, z:0 = foreground (paints over the horizon band). ---- */
head meta:first-of-type::before {
  content: "";
  display: var(--ufo-scenery, block);
  position: fixed;
  left: 5.5vw;
  bottom: 2vh;
  width: 150px;
  height: 250px;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 260'%3E%3Cdefs%3E%3ClinearGradient id='shield' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23122016'/%3E%3Cstop offset='55%25' stop-color='%230c170f'/%3E%3Cstop offset='100%25' stop-color='%23172a1c'/%3E%3C/linearGradient%3E%3ClinearGradient id='post' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0%25' stop-color='%23060f0a'/%3E%3Cstop offset='45%25' stop-color='%23132018'/%3E%3Cstop offset='100%25' stop-color='%230a130d'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cellipse cx='82' cy='250' rx='36' ry='6' fill='%23020604' opacity='.85'/%3E%3Cg transform='rotate(-2 80 130)'%3E%3Crect x='76' y='118' width='9' height='128' rx='2' fill='url(%23post)'/%3E%3Crect x='83.2' y='120' width='1.4' height='124' rx='.7' fill='%237dff6a' opacity='.24'/%3E%3Crect x='76.4' y='120' width='1' height='124' rx='.5' fill='%23020604' opacity='.6'/%3E%3Cg stroke='%23000000' stroke-opacity='.35' stroke-width='.6'%3E%3Cpath d='M78 150 L83 150'/%3E%3Cpath d='M78 176 L83 176'/%3E%3Cpath d='M78 204 L83 204'/%3E%3C/g%3E%3Crect x='74' y='236' width='13' height='8' rx='2' fill='%23070f09'/%3E%3Crect x='48' y='8' width='64' height='19' rx='2.5' fill='%230f1c14' stroke='%233c7a48' stroke-opacity='.5' stroke-width='1.4'/%3E%3Crect x='49' y='9' width='62' height='2' rx='1' fill='%23a8e0b0' fill-opacity='.14'/%3E%3Ctext x='80' y='22' font-family='Arial,Helvetica,sans-serif' font-weight='bold' font-size='11.5' letter-spacing='3' text-anchor='middle' fill='%23cdf5d4' fill-opacity='.82'%3EROUTE%3C/text%3E%3Cpath d='M32 56 Q32 40 42 34 Q60 42 80 42 Q100 42 118 34 Q128 40 128 56 Q128 98 104 120 Q90 131 80 144 Q70 131 56 120 Q32 98 32 56 Z' fill='url(%23shield)'/%3E%3Cpath d='M32 56 Q32 40 42 34 Q60 42 80 42 Q100 42 118 34 Q128 40 128 56 Q128 98 104 120 Q90 131 80 144 Q70 131 56 120 Q32 98 32 56 Z' fill='%237dff6a' fill-opacity='.06'/%3E%3Cpath d='M36 55 Q36 42 44 37 Q60 45 80 45 Q100 45 116 37 Q124 42 124 55' fill='none' stroke='%23eafff0' stroke-opacity='.16' stroke-width='2.2'/%3E%3Cpath d='M32 56 Q32 40 42 34 Q60 42 80 42 Q100 42 118 34 Q128 40 128 56 Q128 98 104 120 Q90 131 80 144 Q70 131 56 120 Q32 98 32 56 Z' fill='none' stroke='%2358a869' stroke-opacity='.7' stroke-width='2'/%3E%3Cpath d='M118 34 Q128 40 128 56 Q128 98 104 120 Q90 131 80 144' fill='none' stroke='%237dff6a' stroke-opacity='.6' stroke-width='2'/%3E%3Cg stroke='%2360935f' stroke-opacity='.18' stroke-width='.6'%3E%3Cpath d='M40 60 Q80 66 120 60'/%3E%3Cpath d='M42 78 Q80 84 118 78'/%3E%3Cpath d='M46 98 Q80 104 114 98'/%3E%3C/g%3E%3Ctext x='81' y='106' font-family='Arial,Helvetica,sans-serif' font-weight='bold' font-size='58' text-anchor='middle' fill='%23071009' fill-opacity='.55'%3E51%3C/text%3E%3Ctext x='80' y='104' font-family='Arial,Helvetica,sans-serif' font-weight='bold' font-size='58' text-anchor='middle' fill='%23d4f7db' fill-opacity='.88'%3E51%3C/text%3E%3Ctext x='79.4' y='103.2' font-family='Arial,Helvetica,sans-serif' font-weight='bold' font-size='58' text-anchor='middle' fill='%23f4fff6' fill-opacity='.24'%3E51%3C/text%3E%3Ccircle cx='105' cy='66' r='3.6' fill='%23010302'/%3E%3Ccircle cx='105' cy='66' r='3.6' fill='none' stroke='%237dff6a' stroke-opacity='.34' stroke-width='1'/%3E%3Cpath d='M105 66 L110 61' stroke='%23a8e0b0' stroke-opacity='.2' stroke-width='.7'/%3E%3Ccircle cx='59' cy='106' r='2.7' fill='%23010302'/%3E%3Ccircle cx='59' cy='106' r='2.7' fill='none' stroke='%237dff6a' stroke-opacity='.26' stroke-width='.9'/%3E%3C/g%3E%3C/svg%3E") center / contain no-repeat;
}

/* ---- SCOUT SAUCER: a second, tiny ship patrolling low over the far
   ridge, right third — never in the lane. steps(1) teleport hops (one
   every ~2s, far under the 5/s ceiling; explicitly NOT a continuous
   mover, so no will-change spent). z:-1 = behind the horizon band and
   under all text; dim, hazy colors sell the distance. It shares sky
   with the searchlight on purpose: some passes, the beam finds it. ---- */
head meta:first-of-type::after {
  content: "";
  display: var(--ufo-scenery, block);
  position: fixed;
  top: 60vh;
  right: 6vw;
  width: 40px;
  height: 17px;
  z-index: -1;
  pointer-events: none;
  opacity: 0;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 46 19'%3E%3Cellipse cx='23' cy='7.4' rx='6.6' ry='4.2' fill='%23a9c4ae' opacity='.65'/%3E%3Cellipse cx='21' cy='5.8' rx='2.4' ry='1.3' fill='%23eef7e8' opacity='.5'/%3E%3Cellipse cx='23' cy='11' rx='16' ry='4' fill='%236e8d77' opacity='.75'/%3E%3Cellipse cx='23' cy='10' rx='16' ry='3.2' fill='%23b9d4bd' opacity='.55'/%3E%3Cg fill='%23ffc46b' opacity='.7'%3E%3Ccircle cx='13' cy='11.6' r='1'/%3E%3Ccircle cx='23' cy='12.7' r='1'/%3E%3Ccircle cx='33' cy='11.6' r='1'/%3E%3C/g%3E%3Cellipse cx='23' cy='14.8' rx='6' ry='1.6' fill='%237dff6a' opacity='.3'/%3E%3C/svg%3E") center / contain no-repeat;
  animation: ufo-patrol 34s steps(1, end) infinite;
}

/* ---- BASE SEARCHLIGHT: somebody at the amber installation behind the
   right mesa is sweeping the sky for what we can already see. One coarse
   soft wedge (~8% alpha), origin tucked below the mesa line (z:-1 paints
   before body::before, so the silhouette band hides the source), masked
   to dissolve before the tip can graze the text lane. The sweep is
   steps(1) — six discrete postures per pass, one every 2s, dark 60% of
   the cycle so it reads as procedure, not decoration. ---- */
head meta:last-of-type::before {
  content: "";
  display: var(--ufo-scenery, block);
  position: fixed;
  left: calc(79vw - 180px);
  bottom: 8vh;
  width: 360px;
  height: 52vh;
  z-index: -1;
  pointer-events: none;
  opacity: 0;
  transform-origin: 50% 100%;
  background:
    conic-gradient(from -6deg at 50% 100%, rgba(255, 220, 160, 0) 3.4deg, rgba(255, 228, 178, 0.10) 5.4deg 6.6deg, rgba(255, 220, 160, 0) 8.6deg),
    conic-gradient(from -6deg at 50% 100%, rgba(255, 210, 150, 0) 1.6deg, rgba(255, 210, 150, 0.05) 5deg 7deg, rgba(255, 210, 150, 0) 10.4deg),
    radial-gradient(ellipse 70px 30px at 50% 100%, rgba(255, 228, 178, 0.22) 0%, rgba(255, 228, 178, 0) 70%);
  -webkit-mask-image: linear-gradient(to top, #000 0%, #000 42%, rgba(0, 0, 0, 0.55) 68%, transparent 96%);
  mask-image: linear-gradient(to top, #000 0%, #000 42%, rgba(0, 0, 0, 0.55) 68%, transparent 96%);
  animation: ufo-sweep 32s steps(1, end) infinite;
}

/* ---- starfield: the only fine pattern, so it RIDES THE ROLL (zero motion
   relative to the tracked glyphs = zero flicker). z:-1 keeps it behind the
   names inside the roll's own stacking context. ---- */
.credits-roll::before,
.credits-slideshow::before {
  content: "";
  display: var(--ufo-scenery, block);
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.55;
  background-image:
    radial-gradient(circle at 22% 30%, rgba(232, 250, 235, 0.9) 0 1px, rgba(232, 250, 235, 0) 2px),
    radial-gradient(circle at 76% 12%, rgba(190, 240, 200, 0.8) 0 1px, rgba(190, 240, 200, 0) 2px),
    radial-gradient(circle at 55% 68%, rgba(255, 196, 107, 0.6) 0 1px, rgba(255, 196, 107, 0) 2px),
    radial-gradient(circle at 8% 84%, rgba(232, 250, 235, 0.7) 0 1px, rgba(232, 250, 235, 0) 2px);
  background-size: 290px 290px, 240px 240px, 350px 350px, 310px 310px;
}

/* ---- section titles: atomic-age Zen Dots (400 only — never faux-bold),
   slight forward slant, hue alternating green/amber down the roll; the base
   gold rule becomes a hairline with a tiny chrome saucer parked in the gap. ---- */
.credits-block__title {
  font-weight: 400;
  letter-spacing: 0.16em;
  padding-left: 0.16em;
  color: var(--ufo-green);
  text-shadow: 0 0 22px rgba(125, 255, 106, 0.35), var(--credits-shadow);
  transform: skewX(-4deg);
}
.credits-block:nth-of-type(odd) .credits-block__title {
  color: var(--ufo-amber);
  text-shadow: 0 0 22px rgba(255, 196, 107, 0.3), var(--credits-shadow);
}
.credits-block__title::after {
  width: min(230px, 55vw);
  height: 14px;
  margin: 0.7rem auto 0;
  opacity: 1;
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 14'%3E%3Cellipse cx='20' cy='6.2' rx='6.5' ry='4' fill='%23d7f5da'/%3E%3Cellipse cx='20' cy='9' rx='15' ry='3.6' fill='%238fb9a0'/%3E%3Cellipse cx='20' cy='8.2' rx='15' ry='3' fill='%23c9e6cf'/%3E%3Cg fill='%23ffc46b'%3E%3Ccircle cx='11' cy='9.6' r='1.1'/%3E%3Ccircle cx='20' cy='10.6' r='1.1'/%3E%3Ccircle cx='29' cy='9.6' r='1.1'/%3E%3C/g%3E%3C/svg%3E") center / 40px 14px no-repeat,
    linear-gradient(90deg, rgba(125, 255, 106, 0) 0%, rgba(125, 255, 106, 0.6) 18% 38%, rgba(125, 255, 106, 0) 41% 59%, rgba(125, 255, 106, 0.6) 62% 82%, rgba(125, 255, 106, 0) 100%) center / 100% 1px no-repeat;
}

/* ---- rows: teletype witness log. Names are sacred — wrap, never clip. ---- */
.credit {
  max-width: min(42rem, 92vw);
  margin-inline: auto;
  min-width: 0;
  overflow-wrap: anywhere;
  letter-spacing: 0.02em;
}
.credit__name {
  color: var(--ufo-cream);
  text-shadow: 0 0 16px rgba(125, 255, 106, 0.16), var(--credits-shadow);
}
.credit__amount {
  opacity: 1;
  font-size: 0.74em;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--ufo-amber);
  font-variant-numeric: tabular-nums;
  text-shadow: 0 0 12px rgba(255, 196, 107, 0.25), var(--credits-shadow);
}
.credit__amount::before { content: " [ "; font-weight: 400; color: rgba(125, 255, 106, 0.55); }
.credit__amount::after { content: " ]"; font-weight: 400; color: rgba(125, 255, 106, 0.55); }

/* ---- flourish cards ---- */
/* the saucer owns the top of the frame — intro copy sits below the beam origin */
.flourish--intro { padding-top: 20vh; gap: 1.15rem; }
.flourish__title {
  font-weight: 400;
  letter-spacing: 0.08em;
  line-height: 1.14;
  color: var(--ufo-cream);
  text-shadow: 0 0 34px rgba(125, 255, 106, 0.4), 0 0 8px rgba(125, 255, 106, 0.2), var(--credits-shadow);
}

/* badge -> channel bug (copy swap via font-size:0 + ::after) */
.flourish__badge { font-size: 0; border: 0; padding: 0; box-shadow: none; }
.flourish__badge::after {
  content: "CHANNEL 51 — THEY'RE HERE";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.82rem;
  letter-spacing: 0.34em;
  padding: 0.5rem 1rem 0.5rem 1.34rem;
  color: var(--ufo-green);
  border: 1px solid rgba(125, 255, 106, 0.55);
  border-radius: 2px;
  background: rgba(125, 255, 106, 0.07);
  box-shadow: 0 0 18px rgba(125, 255, 106, 0.2);
  text-shadow: 0 0 10px rgba(125, 255, 106, 0.5);
}

/* tagline is streamer copy: restyle only */
.flourish__tagline {
  font-style: italic;
  letter-spacing: 0.2em;
  padding-left: 0.2em;
  font-size: 0.95rem;
  color: rgba(238, 247, 232, 0.8);
}

/* rating -> the CLASSIFIED stamp (copy swap): red ink, crooked, double-struck */
.flourish__rating { font-size: 0; border: 0; padding: 0; opacity: 1; }
.flourish__rating::after {
  content: "CLASSIFIED — LEVEL 5 CLEARANCE";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.78rem;
  letter-spacing: 0.28em;
  padding: 0.42rem 0.7rem 0.42rem 0.98rem;
  color: var(--ufo-red);
  border: 2px solid rgba(255, 81, 73, 0.75);
  border-radius: 4px;
  box-shadow: inset 0 0 0 1px rgba(255, 81, 73, 0.3);
  transform: rotate(-3.5deg);
  opacity: 0.92;
  text-shadow: 0 0 12px rgba(255, 81, 73, 0.35);
}

/* outro: TRANSMISSION ENDS / you were never here — no prop up top: the roll
   parks this card directly under the hovering hero saucer, which IS the
   departing ship (an in-roll saucer would double it) */
.flourish--outro .flourish__title { font-size: 0; }
.flourish--outro .flourish__title::after {
  content: "TRANSMISSION ENDS";
  font-family: var(--credits-title-font);
  font-weight: 400;
  font-size: calc(var(--credits-flourish-title-size) * 0.82);
  letter-spacing: 0.1em;
  color: var(--ufo-green);
  text-shadow: 0 0 34px rgba(125, 255, 106, 0.45), 0 0 8px rgba(125, 255, 106, 0.25), var(--credits-shadow);
}
.flourish--outro .flourish__tagline { font-size: 0; }
.flourish--outro .flourish__tagline::after {
  content: "you were never here";
  font-family: var(--credits-font);
  font-style: italic;
  font-size: 0.95rem;
  letter-spacing: 0.26em;
  padding-left: 0.26em;
  color: rgba(238, 247, 232, 0.66);
}
/* the drive-in sign-off chip under the tagline */
.flourish--outro::after {
  content: "● OFF AIR";
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.7rem;
  letter-spacing: 0.4em;
  padding: 0.32rem 0.5rem 0.32rem 0.9rem;
  margin-top: 0.6rem;
  color: rgba(255, 81, 73, 0.85);
  border: 1px solid rgba(255, 81, 73, 0.45);
  border-radius: 2px;
  text-shadow: 0 0 10px rgba(255, 81, 73, 0.4);
}

/* ---- raid finale: MOTHERSHIP ARRIVAL. Green klaxon glow on the title +
   a dossier label above it; the pulse is steps(1) at ~1.7 paints/s — the
   only animation inside the roll (L5 ceiling is 2/s). Declared after the
   parity tints so it wins the cascade. ---- */
.credits-block:nth-last-of-type(2) .credits-block__title,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
  color: var(--ufo-green);
  text-shadow: 0 0 30px rgba(125, 255, 106, 0.65), 0 0 8px rgba(125, 255, 106, 0.4), var(--credits-shadow);
  animation: ufo-klaxon 2.4s steps(1, end) infinite;
}
.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  content: "[ MOTHERSHIP ARRIVAL ]";
  display: block;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.74rem;
  letter-spacing: 0.42em;
  padding-left: 0.42em;
  margin-bottom: 0.8rem;
  color: var(--ufo-red);
  text-shadow: 0 0 12px rgba(255, 81, 73, 0.5), var(--credits-shadow);
}
.credits-block:nth-last-of-type(2) .credit,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit {
  font-size: calc(var(--credits-name-size) * 1.12);
}
.credits-block:nth-last-of-type(2) .credit__name,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__name {
  text-shadow: 0 0 20px rgba(125, 255, 106, 0.4), var(--credits-shadow);
}

/* ---- slideshow: each slide settles like a lens finding focus ---- */
.credits-slide {
  transform: scale(1.02);
  transition: opacity 0.9s ease, transform 1.1s cubic-bezier(0.22, 1, 0.36, 1);
}
.credits-slide.is-active { transform: scale(1); }

/* ---- keyframes (all ufo- prefixed; transform/opacity ONLY) ---- */
/* small hover: 7px of lift with a half-degree tilt, identical on both
   saucer layers so the running lights never slip off the hull */
@keyframes ufo-bob {
  0%   { transform: translate3d(-50%, 0, 0) rotate(0deg); }
  25%  { transform: translate3d(-50%, -4px, 0) rotate(-0.6deg); }
  50%  { transform: translate3d(-50%, -7px, 0) rotate(0deg); }
  75%  { transform: translate3d(-50%, -4px, 0) rotate(0.6deg); }
  100% { transform: translate3d(-50%, 0, 0) rotate(0deg); }
}
/* running-light alternation: 2.5 discrete swaps/s (L2 steps ceiling is 5/s) */
@keyframes ufo-chase {
  0%, 49%   { opacity: 0; }
  50%, 100% { opacity: 1; }
}
/* the abductions, in two acts on a 40s clock so the cadence breathes:
   act I (0-34%): graze 6s, one clean 7s pull, gone. Empty field beat.
   act II (40-95%): a second cow a step to the left grazes LONGER, gets
   yanked — then stalls at -15vh for four full seconds (75-80%), swaying
   against the beam, before it loses. The reset (34-40%) happens at
   opacity 0 so the teleport is never seen. */
@keyframes ufo-abduct {
  0%    { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); opacity: 0; }
  2%    { opacity: 1; }
  15%   { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); opacity: 1; }
  18%   { transform: translate3d(2px, -4vh, 0) rotate(-9deg) scale(1); }
  22%   { transform: translate3d(8px, -16vh, 0) rotate(7deg) scale(0.95); }
  26%   { transform: translate3d(-7px, -30vh, 0) rotate(-8deg) scale(0.86); }
  30%   { transform: translate3d(5px, -44vh, 0) rotate(5deg) scale(0.76); opacity: 1; }
  34%   { transform: translate3d(0, -57vh, 0) rotate(0deg) scale(0.66); opacity: 0; }
  40%   { transform: translate3d(-26px, 0, 0) rotate(0deg) scale(1); opacity: 0; }
  43%   { opacity: 1; }
  62%   { transform: translate3d(-26px, 0, 0) rotate(0deg) scale(1); opacity: 1; }
  65%   { transform: translate3d(-24px, -5vh, 0) rotate(-11deg) scale(0.99); }
  70%   { transform: translate3d(-18px, -13vh, 0) rotate(9deg) scale(0.94); }
  75%   { transform: translate3d(-21px, -15vh, 0) rotate(-6deg) scale(0.93); }
  80%   { transform: translate3d(-15px, -17vh, 0) rotate(5deg) scale(0.92); }
  84%   { transform: translate3d(-9px, -30vh, 0) rotate(-7deg) scale(0.83); }
  89%   { transform: translate3d(-3px, -45vh, 0) rotate(4deg) scale(0.73); opacity: 1; }
  95%   { transform: translate3d(0, -57vh, 0) rotate(0deg) scale(0.65); opacity: 0; }
  100%  { transform: translate3d(0, -57vh, 0) rotate(0deg) scale(0.65); opacity: 0; }
}
/* scout-ship patrol: blink in off the right edge, seven ~46px teleport
   hops westward along the ridge line (one hop / ~2s — steps, not a
   continuous mover), blink out, leave the sky empty for 18s */
@keyframes ufo-patrol {
  0%   { transform: translate3d(0, 0, 0); opacity: 0; }
  3%   { transform: translate3d(0, 0, 0); opacity: 0.8; }
  9%   { transform: translate3d(-46px, 5px, 0); opacity: 0.8; }
  15%  { transform: translate3d(-92px, -3px, 0); opacity: 0.8; }
  21%  { transform: translate3d(-138px, 6px, 0); opacity: 0.8; }
  27%  { transform: translate3d(-184px, -2px, 0); opacity: 0.8; }
  33%  { transform: translate3d(-230px, 4px, 0); opacity: 0.8; }
  39%  { transform: translate3d(-276px, -4px, 0); opacity: 0.8; }
  45%  { transform: translate3d(-276px, -4px, 0); opacity: 0; }
  100% { transform: translate3d(0, 0, 0); opacity: 0; }
}
/* base searchlight: dark two-thirds of the pass, then six discrete
   postures sweeping west-to-east (one reposition / 2s = 0.5 paints/s)
   and cut to black again — a patrol procedure, not a light show */
@keyframes ufo-sweep {
  0%, 56% { transform: rotate(-12deg); opacity: 0; }
  57%     { transform: rotate(-12deg); opacity: 0.85; }
  63%     { transform: rotate(-7deg); opacity: 0.85; }
  69%     { transform: rotate(-2deg); opacity: 0.85; }
  75%     { transform: rotate(3deg); opacity: 0.85; }
  81%     { transform: rotate(8deg); opacity: 0.85; }
  87%     { transform: rotate(13deg); opacity: 0.85; }
  93%     { transform: rotate(13deg); opacity: 0; }
  100%    { transform: rotate(-12deg); opacity: 0; }
}
/* finale klaxon: 4 discrete opacity stops per 2.4s = ~1.7 paints/s */
@keyframes ufo-klaxon {
  0%, 55%  { opacity: 1; }
  60%, 70% { opacity: 0.6; }
  75%, 85% { opacity: 1; }
  88%, 94% { opacity: 0.75; }
  100%     { opacity: 1; }
}

/* ---- reduced motion: the saucer holds position (lights parked on the
   even pattern), the cow is held mid-beam in dignified suspension, the
   scout ship parks mid-ridge, the searchlight freezes mid-sweep at low
   beam, the klaxon rests, slides fall back to the base fade ---- */
@media (prefers-reduced-motion: reduce) {
  head::before,
  head::after {
    animation: none;
  }
  body::after {
    animation: none;
    opacity: 1;
    transform: translate3d(0, -26vh, 0) rotate(-6deg) scale(0.9);
  }
  head meta:first-of-type::after {
    animation: none;
    opacity: 0.8;
    transform: translate3d(-138px, 6px, 0);
  }
  head meta:last-of-type::before {
    animation: none;
    opacity: 0.5;
    transform: rotate(-7deg);
  }
  .credits-block:nth-last-of-type(2) .credits-block__title,
  .credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
    animation: none;
  }
  .credits-slide { transform: none; transition: opacity 0.8s ease; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--ufo-scenery:none;}",
};
