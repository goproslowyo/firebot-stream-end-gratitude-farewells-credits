import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. Grand Finals: championship Sunday at a sold-out esports major — navy arena air cut by electric-blue rig light, the trophy waiting under its own spotlight, and every name run through the broadcast package on skewed lower-thirds. */
export const VARIANT: ThemeVariant = {
  key: "esports",
  name: "Grand Finals",
  css: `
/* ================================================================
   GRAND FINALS — layered after the base theme.
   Fiction: the major is over. Series went the distance, 2–2 into
   game five, and the arena is still humming. The observer swings
   the spidercam over the crowd, the casters lean back at the desk,
   the trophy waits on its plinth under one warm pool of light —
   and the broadcast package rolls the community through the same
   lower-thirds it used for the players all weekend. Every credit
   block is a ROUND of official results; the raids are the SERIES
   MVP and get the gold lower-third. GGs — see you at the next major.
   Layer map (all scenery kill-switched via --esports-scenery):
     html bg (--credits-bg)   navy arena air (one cheap linear)
     html::before             LIGHT STORY — rig-light fans from both
                              top corners, source blooms, warm pool
                              on the trophy, stage horizon band,
                              arena vignette. STATIC, promoted
     html::after              LARGE hex accents riding the left/right
                              edges (coarse, low alpha — never in the
                              lane) + one gold hex. STATIC, promoted
     body::before             THE BOWL — barricade LED + two rows of
                              crowd silhouettes, raised arms, glow-
                              sticks, phone lights. STATIC, promoted
     body::after              center-lane readability scrim. STATIC
     head::before             SPIDERCAM on its crossed cables, upper
                              left — the ONLY continuous mover
                              (will-change budget: 1)
     head::after              THE TROPHY on its hex plinth, lower
                              right, in the warm pool. STATIC, promoted
     meta#1::before           hanging scorebug top-right: GRAND FINALS
                              2:2, GAME 5 — LIVE. STATIC, promoted
     meta#1::after            SCISSOR BEAM · LEFT — narrow spotlight cone
                              rotating about the left truss lamp apex
                              (will-change: transform)
     meta#2::before           CASTERS' DESK silhouette, lower-left —
                              two headsets, one arm up. STATIC, promoted
     meta#2::after            SCISSOR BEAM · RIGHT — mirror cone rotating
                              opposite about the right lamp apex; the two
                              cross at centre (will-change: transform)
     .credits-roll::before    timecode rails at the lane edges — the
     .credits-slideshow::before  only fine pattern, RIDES THE ROLL
   ================================================================ */
@import url('https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@600;700;800&family=Barlow+Condensed:ital,wght@0,400;0,500;0,600;1,400&family=Chakra+Petch:wght@500;600;700&display=swap');

:root {
  /* ── palette: broadcast package ── */
  --esports-scenery: block; /* set to none to strip every scenery layer */
  --gf-blue: #2f86ff;
  --gf-blue-lt: #58b9ff;
  --gf-blue-pale: #9fd4ff;
  --gf-white: #eef5ff;
  --gf-gold: #f7c548;
  --gf-gold-lt: #ffd98a;
  --gf-ink-navy: #071224;

  /* ── base hooks ── */
  /* Cheap arena air: ONE linear gradient — navy lifting where the rig
     light hangs, falling to the black floor (L3: the light itself lives
     on the promoted html::before). */
  --credits-bg: linear-gradient(180deg, #02040c 0%, #071022 24%, #0c1a38 48%, #0a1630 66%, #060d1e 84%, #02050e 100%);
  --credits-color: var(--gf-white);
  --credits-accent: var(--gf-blue-lt);
  --credits-font: "Barlow Condensed", "Arial Narrow", "Segoe UI", sans-serif;
  --credits-title-font: "Saira Condensed", "Arial Narrow", Impact, sans-serif;
  --credits-title-size: clamp(1.4rem, 3.4vw, 2.15rem);
  --credits-name-size: clamp(1.12rem, 2.8vw, 1.68rem);
  --credits-flourish-title-size: clamp(2.6rem, 8vw, 5.1rem);
  --credits-block-gap: 5rem;
  --credits-name-gap: 0.72rem;
  --credits-shadow: 0 2px 12px rgba(2, 5, 14, 0.85);
  /* glow no-op — never "none" (a "none" in the composed shadow list
     invalidates the whole declaration); Grand Finals glows are bespoke. */
  --credits-glow: 0 0 0 rgba(0, 0, 0, 0);
}

/* Scenery is full-bleed: drop the base edge-fade on html ONLY; body keeps
   the base mask so names still ease in at the floor and out at the truss. */
html { -webkit-mask-image: none; mask-image: none; }
body { background: transparent; counter-reset: gf-round; }

/* ═══ THE LIGHT STORY — one static promoted layer (L3). Two rig-light
   fans lean in from the top corners (coarse conic blades, soft shoulders,
   low alpha), their sources bloom cold white-blue, a warm gold pool lands
   lower-right where the trophy stands, a blue breath marks the stage edge,
   and the corners fall away in an arena vignette. Everything huge and
   soft — nothing here can flicker against glyphs (L6). */
html::before {
  content: "";
  display: var(--esports-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* vignette — the bowl swallows its edges */
    radial-gradient(ellipse 140% 120% at 50% 40%, rgba(1, 3, 9, 0) 56%, rgba(1, 3, 9, 0.55) 100%),
    /* rig sources: cold blooms off both top corners */
    /* --- god-ray CONE onto the trophy: a soft light shaft dropping from the
       up-right rig into the warm pool, giving the beam a direction (added here
       above the fans so it reads as a discrete shaft). Coarse, low alpha. */
    conic-gradient(from 210deg at 90% 3%, rgba(255, 224, 150, 0) 0deg, rgba(255, 220, 140, 0.03) 4deg, rgba(255, 226, 155, 0.07) 8deg, rgba(255, 232, 170, 0.10) 11deg, rgba(255, 226, 155, 0.06) 15deg, rgba(255, 220, 140, 0.02) 20deg, rgba(255, 224, 150, 0) 25deg),
    /* trophy-landing bloom — the shaft flares softly where it meets the cup */
    radial-gradient(ellipse 9vw 12vh at 88.5% 62%, rgba(255, 226, 155, 0.11), rgba(255, 220, 140, 0.03) 52%, rgba(255, 220, 140, 0) 78%),
    radial-gradient(ellipse 11vw 8vh at 2% -2%, rgba(240, 250, 255, 0.55), rgba(198, 230, 255, 0.16) 44%, rgba(170, 215, 255, 0) 76%),
    radial-gradient(ellipse 20vw 13vh at 2% -3%, rgba(198, 230, 255, 0.34), rgba(170, 215, 255, 0.10) 46%, rgba(170, 215, 255, 0) 74%),
    radial-gradient(ellipse 11vw 8vh at 98% -2%, rgba(240, 250, 255, 0.50), rgba(198, 230, 255, 0.15) 44%, rgba(170, 215, 255, 0) 76%),
    radial-gradient(ellipse 20vw 13vh at 98% -3%, rgba(198, 230, 255, 0.30), rgba(170, 215, 255, 0.09) 46%, rgba(170, 215, 255, 0) 74%),
    /* left fan: three volumetric blades aimed down-right across the air —
       now with a HOT thin specular core inside each soft shoulder, so they
       read as committed stage beams instead of lens haze (committed god-rays,
       cores are wide soft wedges >=40px on screen, still L6-legal). */
    conic-gradient(from 96deg at 2% -3%, rgba(160, 210, 255, 0) 0deg, rgba(170, 216, 255, 0.13) 5deg, rgba(224, 244, 255, 0.30) 10deg, rgba(255, 255, 255, 0.34) 11deg, rgba(224, 244, 255, 0.28) 12deg, rgba(180, 222, 255, 0.12) 16deg, rgba(160, 210, 255, 0) 24deg),
    conic-gradient(from 123deg at 2% -3%, rgba(160, 210, 255, 0) 0deg, rgba(168, 214, 255, 0.11) 6deg, rgba(214, 238, 255, 0.24) 11deg, rgba(240, 250, 255, 0.28) 12deg, rgba(214, 238, 255, 0.22) 13deg, rgba(176, 220, 255, 0.09) 18deg, rgba(160, 210, 255, 0) 26deg),
    conic-gradient(from 151deg at 2% -3%, rgba(160, 210, 255, 0) 0deg, rgba(166, 212, 255, 0.09) 7deg, rgba(206, 234, 255, 0.19) 13deg, rgba(224, 242, 255, 0.22) 14deg, rgba(198, 230, 255, 0.16) 15deg, rgba(160, 210, 255, 0) 24deg),
    /* right fan: mirrored, one blade dropping toward the trophy */
    conic-gradient(from 240deg at 98% -3%, rgba(160, 210, 255, 0) 0deg, rgba(168, 214, 255, 0.11) 5deg, rgba(214, 238, 255, 0.24) 10deg, rgba(240, 250, 255, 0.28) 11deg, rgba(214, 238, 255, 0.22) 12deg, rgba(176, 220, 255, 0.10) 16deg, rgba(160, 210, 255, 0) 24deg),
    conic-gradient(from 213deg at 98% -3%, rgba(160, 210, 255, 0) 0deg, rgba(170, 216, 255, 0.13) 6deg, rgba(220, 240, 255, 0.26) 11deg, rgba(248, 252, 255, 0.30) 12deg, rgba(220, 240, 255, 0.24) 13deg, rgba(178, 221, 255, 0.09) 18deg, rgba(160, 210, 255, 0) 26deg),
    conic-gradient(from 186deg at 98% -3%, rgba(160, 210, 255, 0) 0deg, rgba(170, 214, 255, 0.10) 8deg, rgba(206, 234, 255, 0.18) 13deg, rgba(224, 242, 255, 0.21) 14deg, rgba(198, 230, 255, 0.15) 15deg, rgba(160, 210, 255, 0) 24deg),
    /* haze pockets hanging in the beams — deep air, no hard lines */
    radial-gradient(ellipse 32vw 18vh at 30% 34%, rgba(180, 218, 255, 0.05), rgba(180, 218, 255, 0) 72%),
    radial-gradient(ellipse 30vw 16vh at 72% 42%, rgba(180, 218, 255, 0.045), rgba(180, 218, 255, 0) 74%),
    /* DISTANT UPSTAGE LED RING — a huge soft cyan arc glowing far behind the
       stage, high in the frame, giving the deep dark a mid-layer and
       atmospheric perspective. Coarse + low-alpha, well above the lane (L6). */
    radial-gradient(ellipse 62vw 20vh at 50% 15%, rgba(70, 150, 240, 0.11), rgba(70, 150, 240, 0.04) 55%, rgba(70, 150, 240, 0) 80%),
    radial-gradient(ellipse 30vw 9vh at 50% 12%, rgba(150, 205, 255, 0.09), rgba(150, 205, 255, 0) 72%),
    /* the warm pool where the trophy waits, lower-right — a stronger single
       beam drop from the up-right rig, godray-like */
    radial-gradient(ellipse 15vw 30vh at 88% 60%, rgba(255, 214, 130, 0.07), rgba(255, 214, 130, 0) 74%),
    radial-gradient(ellipse 26vw 14vh at 86% 84%, rgba(255, 208, 122, 0.20), rgba(255, 208, 122, 0.08) 55%, rgba(255, 208, 122, 0) 78%),
    /* STAGE-LIP LED RIBBON — the bright cyan ribbon along the deck edge, a
       touch hotter and crisper than the old horizon breath */
    linear-gradient(180deg, rgba(88, 185, 255, 0) 0%, rgba(88, 185, 255, 0.10) 34%, rgba(150, 210, 255, 0.30) 50%, rgba(88, 185, 255, 0.10) 66%, rgba(88, 185, 255, 0) 100%) 0 73.2vh / 100% 26px no-repeat,
    /* wider cold breath above and below the ribbon */
    linear-gradient(180deg, rgba(47, 134, 255, 0) 0%, rgba(47, 134, 255, 0.06) 40%, rgba(88, 185, 255, 0.10) 52%, rgba(47, 134, 255, 0.03) 72%, rgba(47, 134, 255, 0) 100%) 0 71vh / 100% 72px no-repeat,
    /* ATMOSPHERIC HAZE over the far crowd — a cool low-contrast lift so the
       distant rows read hazier and further back than the near silhouettes
       (aerial perspective). Coarse soft band, bottom third only (L6). */
    linear-gradient(180deg, rgba(58, 96, 150, 0) 0%, rgba(58, 96, 150, 0.10) 45%, rgba(48, 82, 132, 0.05) 100%) 0 80vh / 100% 20vh no-repeat,
    /* the floor falls to black under the crowd */
    linear-gradient(180deg, rgba(1, 3, 9, 0) 0%, rgba(1, 3, 9, 0.42) 100%) 0 74vh / 100% 26vh no-repeat,
    /* ═══ DEEP-STAGE LED VIDEO WALL — REBUILT. The far upstage screen behind
       the desk now reads as a real broadcast jumbotron: a big soft-cornered LED
       panel glowing cyan, carrying a live BRACKET (two team columns feeding a
       gold champion node), concentric energy rings, and a scrolling waveform
       floor, flanked by team-color pylons with hot LED spines, over a bright
       base lip. Alphas are lifted so it actually READS as a mid-ground and
       kills the dead center void — but it stays soft/backlit (no thin fixed
       grid over the lane) and is held to the UPPER stage so it never competes
       with the crawling names (L6). Atmospheric perspective: cooler + hazier
       than the near props. DEEPEST layer (last = furthest back). */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 620' preserveAspectRatio='xMidYMid slice'%3E%3Cdefs%3E%3CradialGradient id='wall' cx='50%25' cy='40%25' r='66%25'%3E%3Cstop offset='0' stop-color='%231c56a0' stop-opacity='.62'/%3E%3Cstop offset='.4' stop-color='%23123f74' stop-opacity='.46'/%3E%3Cstop offset='.72' stop-color='%230c2850' stop-opacity='.24'/%3E%3Cstop offset='1' stop-color='%23081a34' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='panel' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%231e4f8e' stop-opacity='.34'/%3E%3Cstop offset='.5' stop-color='%23123a6e' stop-opacity='.2'/%3E%3Cstop offset='1' stop-color='%230c2246' stop-opacity='.06'/%3E%3C/linearGradient%3E%3ClinearGradient id='pyl' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%233f8ee6' stop-opacity='.32'/%3E%3Cstop offset='1' stop-color='%230c1c3a' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='pylg' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23f7c548' stop-opacity='.26'/%3E%3Cstop offset='1' stop-color='%230c1c3a' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='lip' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%2358b9ff' stop-opacity='0'/%3E%3Cstop offset='.5' stop-color='%23cfeaff' stop-opacity='.85'/%3E%3Cstop offset='1' stop-color='%2358b9ff' stop-opacity='0'/%3E%3C/linearGradient%3E%3CradialGradient id='champ' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0' stop-color='%23fff0c0' stop-opacity='.6'/%3E%3Cstop offset='.5' stop-color='%23f7c548' stop-opacity='.3'/%3E%3Cstop offset='1' stop-color='%23f7c548' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect x='0' y='0' width='1600' height='620' fill='url(%23wall)'/%3E%3Crect x='150' y='54' width='1300' height='440' rx='26' fill='url(%23panel)' stroke='%2378c4ff' stroke-opacity='.22' stroke-width='2'/%3E%3Crect x='168' y='70' width='1264' height='408' rx='18' fill='none' stroke='%2358b9ff' stroke-opacity='.12' stroke-width='1.5'/%3E%3Cg fill='none' stroke='%2378c4ff'%3E%3Ccircle cx='800' cy='250' r='150' stroke-opacity='.16' stroke-width='6'/%3E%3Ccircle cx='800' cy='250' r='210' stroke-opacity='.10' stroke-width='5'/%3E%3Ccircle cx='800' cy='250' r='272' stroke-opacity='.055' stroke-width='4'/%3E%3C/g%3E%3Cg stroke-linejoin='round' fill='none'%3E%3Cpath d='M300 150 L360 150 L360 250 L430 250' stroke='%2378c4ff' stroke-opacity='.34' stroke-width='4'/%3E%3Cpath d='M300 350 L360 350 L360 250 L430 250' stroke='%2378c4ff' stroke-opacity='.24' stroke-width='4'/%3E%3Cpath d='M1300 150 L1240 150 L1240 250 L1170 250' stroke='%23ffd98a' stroke-opacity='.3' stroke-width='4'/%3E%3Cpath d='M1300 350 L1240 350 L1240 250 L1170 250' stroke='%2378c4ff' stroke-opacity='.22' stroke-width='4'/%3E%3C/g%3E%3Crect x='250' y='132' width='96' height='36' rx='4' fill='%2358b9ff' fill-opacity='.16' stroke='%2378c4ff' stroke-opacity='.4' stroke-width='1.5'/%3E%3Crect x='250' y='332' width='96' height='36' rx='4' fill='%2358b9ff' fill-opacity='.1' stroke='%2378c4ff' stroke-opacity='.3' stroke-width='1.5'/%3E%3Crect x='1254' y='132' width='96' height='36' rx='4' fill='%23f7c548' fill-opacity='.14' stroke='%23ffd98a' stroke-opacity='.4' stroke-width='1.5'/%3E%3Crect x='1254' y='332' width='96' height='36' rx='4' fill='%2358b9ff' fill-opacity='.1' stroke='%2378c4ff' stroke-opacity='.3' stroke-width='1.5'/%3E%3Ccircle cx='800' cy='250' r='80' fill='url(%23champ)'/%3E%3Cpath d='M764 188 L836 188 L872 250 L836 312 L764 312 L728 250 Z' fill='%230c1c3a' fill-opacity='.34' stroke='%23ffd98a' stroke-opacity='.62' stroke-width='2.5'/%3E%3Cpath d='M770 198 L830 198 L860 250 L830 302 L770 302 L740 250 Z' fill='none' stroke='%2378c4ff' stroke-opacity='.4' stroke-width='1.4'/%3E%3Cpath d='M800 195 L802.4 201.5 L809.2 202 L804 206.6 L805.7 213.4 L800 209.6 L794.3 213.4 L796 206.6 L790.8 202 L797.6 201.5 Z' fill='%23fff6d8' fill-opacity='.9'/%3E%3Cpath d='M781 226 C770 226 768 240 778 244' fill='none' stroke='%23ffd98a' stroke-opacity='.72' stroke-width='2.5'/%3E%3Cpath d='M819 226 C830 226 832 240 822 244' fill='none' stroke='%23ffd98a' stroke-opacity='.72' stroke-width='2.5'/%3E%3Cellipse cx='800' cy='224' rx='19' ry='4.5' fill='%23ffe9ad' fill-opacity='.82'/%3E%3Cpath d='M781 224 C781 244 790 256 800 260 C810 256 819 244 819 224 Z' fill='%23f7c548' fill-opacity='.8'/%3E%3Cpath d='M787 227 C787 242 793 252 799 257' fill='none' stroke='%23fff6d8' stroke-opacity='.7' stroke-width='2'/%3E%3Crect x='796' y='260' width='8' height='10' fill='%23e0ab3e' fill-opacity='.8'/%3E%3Cpath d='M786 270 L814 270 L809 279 L791 279 Z' fill='%23ffd98a' fill-opacity='.8'/%3E%3Crect x='782' y='279' width='36' height='4' rx='1.5' fill='%23e0ab3e' fill-opacity='.75'/%3E%3Cpath d='M180 452 L340 420 L340 470 L500 424 L500 464 L660 420 L660 472 L820 424 L820 464 L980 420 L980 470 L1140 424 L1140 464 L1300 420 L1420 450' fill='none' stroke='%2388ccff' stroke-opacity='.16' stroke-width='4' stroke-linejoin='round'/%3E%3Crect x='120' y='60' width='70' height='430' rx='6' fill='url(%23pyl)'/%3E%3Crect x='1410' y='60' width='70' height='430' rx='6' fill='url(%23pylg)'/%3E%3Crect x='186' y='60' width='4' height='430' fill='%2378c4ff' fill-opacity='.34'/%3E%3Crect x='1410' y='60' width='4' height='430' fill='%23ffd98a' fill-opacity='.3'/%3E%3Crect x='150' y='494' width='1300' height='7' rx='3' fill='url(%23lip)'/%3E%3Crect x='150' y='486' width='1300' height='22' rx='6' fill='url(%23lip)' opacity='.4'/%3E%3C/svg%3E") 50% 3vh / 104vw 66vh no-repeat;
}

/* ═══ LARGE HEX ACCENTS — the package's geometry, riding the screen edges
   only (L6: never in the lane). Big outline hexes cropped by the frame,
   one glass fill, one gold echo of the MVP moment. STATIC, promoted. */
html::after {
  content: "";
  display: var(--esports-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* ═══ LIGHTING TRUSS — the physical rig the whole light story hangs from:
       a lattice chord running the full top edge, plus two moving-head fixtures
       clamped under it at the exact corner points the beam fans leave from.
       The rig light stops being weather and becomes equipment. STATIC. */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56 84'%3E%3Crect x='20' y='0' width='16' height='10' fill='%2312233f'/%3E%3Cpath d='M15 8 L15 34 M41 8 L41 34' stroke='%2316294a' stroke-width='5'/%3E%3Cpath d='M14 8 L14 33 M40 8 L40 33' stroke='%233d669c' stroke-width='1' stroke-opacity='.5'/%3E%3Crect x='10' y='30' width='36' height='34' rx='4' fill='%23142a4a'/%3E%3Crect x='10' y='30' width='36' height='10' rx='4' fill='%23234674'/%3E%3Crect x='13' y='33' width='30' height='2' rx='1' fill='%235c8cc8' opacity='.6'/%3E%3Cg stroke='%230a1830' stroke-width='2'%3E%3Cline x1='16' y1='46' x2='16' y2='58'/%3E%3Cline x1='22' y1='46' x2='22' y2='58'/%3E%3Cline x1='34' y1='46' x2='34' y2='58'/%3E%3Cline x1='40' y1='46' x2='40' y2='58'/%3E%3C/g%3E%3Ccircle cx='28' cy='66' r='15' fill='%239fd4ff' opacity='.22'/%3E%3Ccircle cx='28' cy='64' r='9' fill='%230c1c36'/%3E%3Ccircle cx='28' cy='64' r='7' fill='%23bfe6ff'/%3E%3Ccircle cx='26' cy='62' r='3' fill='%23ffffff'/%3E%3C/svg%3E") calc(2vw - 24px) -16px / 56px 84px no-repeat,
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56 84'%3E%3Crect x='20' y='0' width='16' height='10' fill='%2312233f'/%3E%3Cpath d='M15 8 L15 34 M41 8 L41 34' stroke='%2316294a' stroke-width='5'/%3E%3Cpath d='M14 8 L14 33 M40 8 L40 33' stroke='%233d669c' stroke-width='1' stroke-opacity='.5'/%3E%3Crect x='10' y='30' width='36' height='34' rx='4' fill='%23142a4a'/%3E%3Crect x='10' y='30' width='36' height='10' rx='4' fill='%23234674'/%3E%3Crect x='13' y='33' width='30' height='2' rx='1' fill='%235c8cc8' opacity='.6'/%3E%3Cg stroke='%230a1830' stroke-width='2'%3E%3Cline x1='16' y1='46' x2='16' y2='58'/%3E%3Cline x1='22' y1='46' x2='22' y2='58'/%3E%3Cline x1='34' y1='46' x2='34' y2='58'/%3E%3Cline x1='40' y1='46' x2='40' y2='58'/%3E%3C/g%3E%3Ccircle cx='28' cy='66' r='15' fill='%239fd4ff' opacity='.22'/%3E%3Ccircle cx='28' cy='64' r='9' fill='%230c1c36'/%3E%3Ccircle cx='28' cy='64' r='7' fill='%23bfe6ff'/%3E%3Ccircle cx='26' cy='62' r='3' fill='%23ffffff'/%3E%3C/svg%3E") calc(100% - 2vw + 24px) -16px / 56px 84px no-repeat,
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 360 64'%3E%3Crect x='0' y='8' width='360' height='5' fill='%231b3054'/%3E%3Crect x='0' y='8' width='360' height='1.5' fill='%234a7ab8' opacity='.8'/%3E%3Crect x='0' y='52' width='360' height='5' fill='%2316294a'/%3E%3Crect x='0' y='52' width='360' height='1.5' fill='%233d669c' opacity='.6'/%3E%3Cg stroke='%2322406e' stroke-width='4'%3E%3Cpath d='M0 13 L90 52'/%3E%3Cpath d='M180 13 L90 52'/%3E%3Cpath d='M180 13 L270 52'/%3E%3Cpath d='M360 13 L270 52'/%3E%3C/g%3E%3Cg stroke='%23486e9e' stroke-width='1' stroke-opacity='.45'%3E%3Cpath d='M1 12 L91 51'/%3E%3Cpath d='M181 12 L91 51'/%3E%3Cpath d='M181 12 L271 51'/%3E%3Cpath d='M361 12 L271 51'/%3E%3C/g%3E%3Crect x='0' y='8' width='5' height='49' fill='%231e3a66'/%3E%3Crect x='177' y='8' width='5' height='49' fill='%231e3a66'/%3E%3Crect x='355' y='8' width='5' height='49' fill='%231e3a66'/%3E%3C/svg%3E") 0 -10px / 360px 64px repeat-x,
    /* ═══ SHINE & SPARKLE — broadcast lens flares. Two big anamorphic light-
       stars burn where the rig sources hang in the top corners, and one warm
       gold star sits on the trophy's pool, lower-right. Each is a COARSE soft
       4-point star (>=90px, gaussian falloff) — L6-legal: static specular
       highlights baked at the light sources, well off the center name lane
       (clauses a + d). This is the sparkle the fiction wants: stage-light
       glints, not fine twinkles over the crawling names. */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cdefs%3E%3CradialGradient id='c' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0' stop-color='%23ffffff' stop-opacity='.9'/%3E%3Cstop offset='.3' stop-color='%23d6efff' stop-opacity='.4'/%3E%3Cstop offset='1' stop-color='%23aad8ff' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='hb' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23bfe6ff' stop-opacity='0'/%3E%3Cstop offset='.5' stop-color='%23eaf7ff' stop-opacity='.85'/%3E%3Cstop offset='1' stop-color='%23bfe6ff' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='vb' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23bfe6ff' stop-opacity='0'/%3E%3Cstop offset='.5' stop-color='%23eaf7ff' stop-opacity='.8'/%3E%3Cstop offset='1' stop-color='%23bfe6ff' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='4' y='96' width='192' height='8' rx='4' fill='url(%23hb)'/%3E%3Crect x='96' y='16' width='8' height='168' rx='4' fill='url(%23vb)'/%3E%3Ccircle cx='100' cy='100' r='60' fill='url(%23c)'/%3E%3C/svg%3E") 3.5vw 1vh / 180px 180px no-repeat,
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cdefs%3E%3CradialGradient id='c' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0' stop-color='%23ffffff' stop-opacity='.9'/%3E%3Cstop offset='.3' stop-color='%23d6efff' stop-opacity='.4'/%3E%3Cstop offset='1' stop-color='%23aad8ff' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='hb' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23bfe6ff' stop-opacity='0'/%3E%3Cstop offset='.5' stop-color='%23eaf7ff' stop-opacity='.85'/%3E%3Cstop offset='1' stop-color='%23bfe6ff' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='vb' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23bfe6ff' stop-opacity='0'/%3E%3Cstop offset='.5' stop-color='%23eaf7ff' stop-opacity='.8'/%3E%3Cstop offset='1' stop-color='%23bfe6ff' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='4' y='96' width='192' height='8' rx='4' fill='url(%23hb)'/%3E%3Crect x='96' y='16' width='8' height='168' rx='4' fill='url(%23vb)'/%3E%3Ccircle cx='100' cy='100' r='60' fill='url(%23c)'/%3E%3C/svg%3E") calc(100% - 20vw) 4vh / 190px 190px no-repeat,
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'%3E%3Cdefs%3E%3CradialGradient id='cg' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0' stop-color='%23fff6d8' stop-opacity='.95'/%3E%3Cstop offset='.34' stop-color='%23ffd98a' stop-opacity='.4'/%3E%3Cstop offset='1' stop-color='%23f7c548' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='hg' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23ffe9ad' stop-opacity='0'/%3E%3Cstop offset='.5' stop-color='%23fff6d8' stop-opacity='.85'/%3E%3Cstop offset='1' stop-color='%23ffe9ad' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='vg' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23ffe9ad' stop-opacity='0'/%3E%3Cstop offset='.5' stop-color='%23fff6d8' stop-opacity='.8'/%3E%3Cstop offset='1' stop-color='%23ffe9ad' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='4' y='76' width='152' height='7' rx='3.5' fill='url(%23hg)'/%3E%3Crect x='76' y='12' width='7' height='136' rx='3.5' fill='url(%23vg)'/%3E%3Ccircle cx='80' cy='80' r='44' fill='url(%23cg)'/%3E%3C/svg%3E") calc(100% - 6.5vw) 42vh / 120px 120px no-repeat,
    /* ═══ BROADCAST SAFE-FRAME CORNERS — four L-brackets at the true screen
       corners, the tournament package's outer frame. Each corner is a short
       horizontal + vertical cyan bar (one gradient each), so the whole overlay
       reads as a designed broadcast frame instead of floating rails. Coarse,
       edges only — never near the lane (L6). */
    linear-gradient(rgba(120, 196, 255, 0.5), rgba(120, 196, 255, 0.5)) no-repeat 3.2vw 3.4vh / 76px 2px,
    linear-gradient(rgba(120, 196, 255, 0.5), rgba(120, 196, 255, 0.5)) no-repeat 3.2vw 3.4vh / 2px 40px,
    linear-gradient(rgba(120, 196, 255, 0.5), rgba(120, 196, 255, 0.5)) no-repeat calc(100% - 3.2vw) 3.4vh / 76px 2px,
    linear-gradient(rgba(120, 196, 255, 0.5), rgba(120, 196, 255, 0.5)) no-repeat calc(100% - 3.2vw) 3.4vh / 2px 40px,
    linear-gradient(rgba(120, 196, 255, 0.45), rgba(120, 196, 255, 0.45)) no-repeat 3.2vw calc(100% - 3.4vh) / 76px 2px,
    linear-gradient(rgba(120, 196, 255, 0.45), rgba(120, 196, 255, 0.45)) no-repeat 3.2vw calc(100% - 3.4vh - 38px) / 2px 40px,
    linear-gradient(rgba(255, 217, 138, 0.4), rgba(255, 217, 138, 0.4)) no-repeat calc(100% - 3.2vw) calc(100% - 3.4vh) / 76px 2px,
    linear-gradient(rgba(255, 217, 138, 0.4), rgba(255, 217, 138, 0.4)) no-repeat calc(100% - 3.2vw) calc(100% - 3.4vh - 38px) / 2px 40px,
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 640'%3E%3Cpath d='M200 180 L125 309.9 L-25 309.9 L-100 180 L-25 50.1 L125 50.1 Z' fill='none' stroke='%2358b9ff' stroke-opacity='.30' stroke-width='3'/%3E%3Cpath d='M170 180 L110 283.9 L-10 283.9 L-70 180 L-10 76.1 L110 76.1 Z' fill='none' stroke='%2358b9ff' stroke-opacity='.13' stroke-width='1.5'/%3E%3Cpath d='M226 430 L183 504.5 L97 504.5 L54 430 L97 355.5 L183 355.5 Z' fill='%2358b9ff' fill-opacity='.05' stroke='%2358b9ff' stroke-opacity='.38' stroke-width='2'/%3E%3Cpath d='M144 560 L127 589.4 L93 589.4 L76 560 L93 530.6 L127 530.6 Z' fill='%2358b9ff' fill-opacity='.10' stroke='%2358b9ff' stroke-opacity='.22' stroke-width='1.5'/%3E%3C/svg%3E") left -70px top 9vh / 320px 640px no-repeat,
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 640'%3E%3Cpath d='M450 150 L365 297.2 L195 297.2 L110 150 L195 2.8 L365 2.8 Z' fill='none' stroke='%2358b9ff' stroke-opacity='.26' stroke-width='3'/%3E%3Cpath d='M256 420 L218 485.8 L142 485.8 L104 420 L142 354.2 L218 354.2 Z' fill='%2358b9ff' fill-opacity='.05' stroke='%2358b9ff' stroke-opacity='.34' stroke-width='2'/%3E%3Cpath d='M300 540 L281 572.9 L243 572.9 L224 540 L243 507.1 L281 507.1 Z' fill='%23ffd98a' fill-opacity='.10' stroke='%23ffd98a' stroke-opacity='.28' stroke-width='1.5'/%3E%3C/svg%3E") right -80px bottom 10vh / 320px 640px no-repeat;
}

/* ═══ THE BOWL — barricade LED + two rows of crowd silhouettes, a few
   raised arms, glowsticks and phone lights held up for the send-off.
   Coarse scallops, near-black inks, bottom band only (the body mask has
   already dissolved the names here). STATIC, promoted. */
body::before {
  content: "";
  display: var(--esports-scenery, block);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 23vh;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 240' preserveAspectRatio='none'%3E%3Cdefs%3E%3ClinearGradient id='bg1' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%2358b9ff' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%2358b9ff' stop-opacity='.12'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='0' y='26' width='1600' height='22' fill='url(%23bg1)'/%3E%3Crect x='0' y='46' width='1600' height='3' fill='%2358b9ff' opacity='.38'/%3E%3Crect x='0' y='50' width='1600' height='24' fill='%230a1428'/%3E%3Crect x='300' y='58' width='7' height='46' rx='3' fill='%23071021' transform='rotate(-14 303 80)'/%3E%3Ccircle cx='300' cy='52' r='14' fill='%2358b9ff' opacity='.16'/%3E%3Crect x='292' y='48' width='17' height='6' rx='3' fill='%2358b9ff' opacity='.75' transform='rotate(-14 300 51)'/%3E%3Crect x='1238' y='60' width='7' height='44' rx='3' fill='%23071021' transform='rotate(12 1241 82)'/%3E%3Ccircle cx='1243' cy='54' r='13' fill='%2358b9ff' opacity='.15'/%3E%3Crect x='1234' y='50' width='17' height='6' rx='3' fill='%2358b9ff' opacity='.7' transform='rotate(12 1242 53)'/%3E%3Ccircle cx='732' cy='78' r='12' fill='%23cfe8ff' opacity='.13'/%3E%3Crect x='729' y='72' width='5' height='9' rx='1' fill='%23cfe8ff' opacity='.85'/%3E%3Ccircle cx='1076' cy='84' r='11' fill='%23cfe8ff' opacity='.11'/%3E%3Crect x='1073' y='79' width='5' height='9' rx='1' fill='%23cfe8ff' opacity='.8'/%3E%3Cpath d='M0 132 Q28 96 56 126 Q88 92 122 124 Q150 100 184 128 Q216 90 252 122 Q282 98 316 126 Q350 94 388 124 Q420 102 456 128 Q490 92 528 122 Q560 100 596 126 Q630 94 668 124 Q700 98 736 128 Q770 92 806 122 Q840 100 876 126 Q910 96 948 124 Q980 100 1016 128 Q1050 92 1088 122 Q1120 98 1156 126 Q1190 94 1228 124 Q1260 102 1296 128 Q1330 92 1368 122 Q1400 98 1436 126 Q1470 94 1508 124 Q1540 100 1576 126 L1600 118 L1600 240 L0 240 Z' fill='%23071021'/%3E%3Crect x='516' y='108' width='9' height='58' rx='4' fill='%2302050d' transform='rotate(10 520 136)'/%3E%3Ccircle cx='514' cy='102' r='9' fill='%2302050d'/%3E%3Ccircle cx='514' cy='96' r='15' fill='%2358b9ff' opacity='.14'/%3E%3Crect x='505' y='92' width='19' height='6' rx='3' fill='%2358b9ff' opacity='.7' transform='rotate(10 514 95)'/%3E%3Cpath d='M0 190 Q45 128 92 178 Q140 122 196 174 Q244 132 300 180 Q350 124 408 176 Q458 130 516 180 Q566 126 624 176 Q676 132 732 180 Q782 124 840 176 Q890 130 948 180 Q1000 126 1058 176 Q1108 132 1164 180 Q1216 124 1274 176 Q1324 130 1382 180 Q1434 126 1490 176 Q1540 134 1600 178 L1600 240 L0 240 Z' fill='%2302050d'/%3E%3Cpath d='M62 140 Q92 122 120 138' fill='none' stroke='%237ab4ff' stroke-opacity='.14' stroke-width='2'/%3E%3Cpath d='M786 136 Q816 118 844 134' fill='none' stroke='%237ab4ff' stroke-opacity='.12' stroke-width='2'/%3E%3Cpath d='M1440 138 Q1466 122 1492 136' fill='none' stroke='%237ab4ff' stroke-opacity='.13' stroke-width='2'/%3E%3C!--send-off pass: more phones up (bokeh dots w/ soft halos), a few glowsticks in team colours, extra raised arms — the bowl saying goodbye--%3E%3Cg%3E%3Ccircle cx='95' cy='168' r='8' fill='%23cfe8ff' opacity='.12'/%3E%3Ccircle cx='95' cy='168' r='2.6' fill='%23e8f4ff' opacity='.9'/%3E%3Ccircle cx='230' cy='182' r='7' fill='%23cfe8ff' opacity='.1'/%3E%3Ccircle cx='230' cy='182' r='2.2' fill='%23dcefff' opacity='.8'/%3E%3Ccircle cx='408' cy='164' r='8' fill='%23cfe8ff' opacity='.12'/%3E%3Ccircle cx='408' cy='164' r='2.6' fill='%23e8f4ff' opacity='.9'/%3E%3Ccircle cx='560' cy='196' r='6' fill='%23cfe8ff' opacity='.1'/%3E%3Ccircle cx='560' cy='196' r='2' fill='%23dcefff' opacity='.75'/%3E%3Ccircle cx='690' cy='158' r='7' fill='%23cfe8ff' opacity='.11'/%3E%3Ccircle cx='690' cy='158' r='2.4' fill='%23e8f4ff' opacity='.85'/%3E%3Ccircle cx='902' cy='186' r='7' fill='%23cfe8ff' opacity='.1'/%3E%3Ccircle cx='902' cy='186' r='2.2' fill='%23dcefff' opacity='.8'/%3E%3Ccircle cx='1010' cy='164' r='8' fill='%23cfe8ff' opacity='.12'/%3E%3Ccircle cx='1010' cy='164' r='2.6' fill='%23e8f4ff' opacity='.9'/%3E%3Ccircle cx='1120' cy='196' r='6' fill='%23cfe8ff' opacity='.1'/%3E%3Ccircle cx='1120' cy='196' r='2' fill='%23dcefff' opacity='.75'/%3E%3Ccircle cx='1240' cy='158' r='7' fill='%23cfe8ff' opacity='.11'/%3E%3Ccircle cx='1240' cy='158' r='2.4' fill='%23e8f4ff' opacity='.85'/%3E%3Ccircle cx='1500' cy='168' r='8' fill='%23cfe8ff' opacity='.12'/%3E%3Ccircle cx='1500' cy='168' r='2.6' fill='%23e8f4ff' opacity='.9'/%3E%3C/g%3E%3Cg%3E%3Ccircle cx='302' cy='148' r='12' fill='%2358b9ff' opacity='.14'/%3E%3Crect x='299' y='140' width='5' height='17' rx='2.5' fill='%2380ccff' opacity='.9' transform='rotate(-18 301.5 148.5)'/%3E%3Ccircle cx='758' cy='150' r='11' fill='%23ffd98a' opacity='.13'/%3E%3Crect x='755' y='142' width='5' height='16' rx='2.5' fill='%23ffe3a4' opacity='.85' transform='rotate(12 757.5 150)'/%3E%3Ccircle cx='1178' cy='148' r='12' fill='%2358b9ff' opacity='.14'/%3E%3Crect x='1175' y='140' width='5' height='17' rx='2.5' fill='%2380ccff' opacity='.9' transform='rotate(14 1177.5 148.5)'/%3E%3Ccircle cx='1447' cy='152' r='11' fill='%2358b9ff' opacity='.12'/%3E%3Crect x='1444' y='144' width='5' height='16' rx='2.5' fill='%2380ccff' opacity='.85' transform='rotate(-10 1446.5 152)'/%3E%3C/g%3E%3Cg fill='none' stroke='%237ab4ff' stroke-opacity='.13' stroke-width='2'%3E%3Cpath d='M232 142 Q258 120 284 136'/%3E%3Cpath d='M580 140 Q606 118 632 134'/%3E%3Cpath d='M1042 142 Q1068 120 1094 136'/%3E%3C/g%3E%3C/svg%3E") 0 0 / 100% 100% no-repeat;
}

/* ═══ the lane: names must stay readable through the rig light, so the
   center column gets a quiet navy scrim — coarse, soft, STATIC (L9). It
   dies before the edges so the trophy and desk keep their light. */
body::after {
  content: "";
  display: var(--esports-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background: linear-gradient(90deg,
    rgba(2, 5, 14, 0) 11%, rgba(2, 5, 14, 0.38) 31%, rgba(2, 5, 14, 0.46) 50%,
    rgba(2, 5, 14, 0.38) 69%, rgba(2, 5, 14, 0) 89%);
}

/* ═══ SPIDERCAM — the observer's last slow pass, upper-left, hanging on
   crossed cables that run off the top of the frame. The ONLY continuous
   mover (small box, will-change budget: 1). */
head { display: var(--esports-scenery, block); }
head::before {
  content: "";
  display: var(--esports-scenery, block);
  position: fixed;
  left: 7vw;
  top: -8px;
  width: 260px;
  height: 220px;
  z-index: 0;
  pointer-events: none;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 260 220'%3E%3Cdefs%3E%3ClinearGradient id='body' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23415f8c'/%3E%3Cstop offset='.18' stop-color='%232c476f'/%3E%3Cstop offset='.55' stop-color='%2313223f'/%3E%3Cstop offset='1' stop-color='%23070f22'/%3E%3C/linearGradient%3E%3ClinearGradient id='top' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%236a8cbf'/%3E%3Cstop offset='.5' stop-color='%23385880'/%3E%3Cstop offset='1' stop-color='%231a2d4d'/%3E%3C/linearGradient%3E%3CradialGradient id='lens' cx='38%25' cy='34%25' r='68%25'%3E%3Cstop offset='0' stop-color='%23bfe6ff'/%3E%3Cstop offset='.28' stop-color='%2358b9ff'/%3E%3Cstop offset='.62' stop-color='%230d3a75'/%3E%3Cstop offset='1' stop-color='%23050f24'/%3E%3C/radialGradient%3E%3CradialGradient id='barrel' cx='50%25' cy='45%25' r='55%25'%3E%3Cstop offset='0' stop-color='%232a405f'/%3E%3Cstop offset='.7' stop-color='%23111f38'/%3E%3Cstop offset='1' stop-color='%23060d1c'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cpath d='M4 0 L120 90 M256 0 L140 90' stroke='%23aec4e6' stroke-opacity='.34' stroke-width='1.8'/%3E%3Cpath d='M4 0 L120 90 M256 0 L140 90' stroke='%23dcebff' stroke-opacity='.3' stroke-width='.6'/%3E%3Cpath d='M62 0 L126 90 M198 0 L134 90' stroke='%239db4d8' stroke-opacity='.18' stroke-width='1'/%3E%3Cpath d='M118 84 L142 84 L146 96 L114 96 Z' fill='%23223a5e' stroke='%2378a8e0' stroke-opacity='.4'/%3E%3Cpath d='M118 84 L142 84 L141 88 L119 88 Z' fill='%23a8c6ec' fill-opacity='.5'/%3E%3Ccircle cx='130' cy='104' r='6' fill='%23172a48' stroke='%23557bad' stroke-opacity='.5'/%3E%3Ccircle cx='128' cy='102' r='2' fill='%23cfe4ff' opacity='.7'/%3E%3Cpath d='M120 108 L110 130 M140 108 L150 130' stroke='%23162948' stroke-width='6' stroke-linecap='round'/%3E%3Cpath d='M119 110 L110 128 M141 110 L150 128' stroke='%2378a8e0' stroke-opacity='.35' stroke-width='1.4' stroke-linecap='round'/%3E%3Cellipse cx='130' cy='166' rx='30' ry='9' fill='%2302060e' opacity='.55'/%3E%3Crect x='100' y='125' width='60' height='34' rx='8' fill='url(%23body)' stroke='%238cbcf0' stroke-opacity='.35'/%3E%3Crect x='100' y='125' width='60' height='11' rx='8' fill='url(%23top)'/%3E%3Cpath d='M108 128 L152 128' stroke='%23eaf6ff' stroke-opacity='.6' stroke-width='1.4' stroke-linecap='round'/%3E%3Crect x='103' y='140' width='54' height='2.5' rx='1' fill='%2358b9ff' opacity='.4'/%3E%3Crect x='106' y='146' width='20' height='6' rx='2' fill='%230a1730' stroke='%234c74ac' stroke-opacity='.4'/%3E%3Ccircle cx='153' cy='133' r='5.5' fill='%23ff5d6e' opacity='.25'/%3E%3Ccircle cx='153' cy='133' r='2.6' fill='%23ff6d7d'/%3E%3Ccircle cx='152' cy='132' r='.9' fill='%23ffd0d5'/%3E%3Ccircle cx='130' cy='168' r='19' fill='url(%23barrel)' stroke='%23233a5c' stroke-width='2'/%3E%3Ccircle cx='130' cy='168' r='19' fill='none' stroke='%2378a8e0' stroke-opacity='.3' stroke-width='.8'/%3E%3Ccircle cx='130' cy='168' r='13' fill='%230a1528' stroke='%231b3050' stroke-width='1.5'/%3E%3Ccircle cx='130' cy='168' r='9.5' fill='url(%23lens)'/%3E%3Ccircle cx='130' cy='168' r='9.5' fill='none' stroke='%23081226' stroke-width='1'/%3E%3Ccircle cx='125.5' cy='163.5' r='3' fill='%23f2fbff' opacity='.92'/%3E%3Ccircle cx='134' cy='172' r='1.6' fill='%23bfe6ff' opacity='.5'/%3E%3Cpath d='M122 161 A9.5 9.5 0 0 1 138 163' fill='none' stroke='%23cfeeff' stroke-opacity='.4' stroke-width='1'/%3E%3Cellipse cx='130' cy='190' rx='28' ry='7' fill='%2358b9ff' opacity='.10'/%3E%3C/svg%3E") center / contain no-repeat;
  will-change: transform;
  animation: esports-cam 7.5s ease-in-out infinite;
}

/* ═══ THE TROPHY — hero prop, lower-right, standing on its hex plinth in
   the warm pool. Chromed championship gold: the bowl carries a full
   metal-reflection story — a hot top-lip catch, a bright shoulder, a dark
   equator band where the room reflects, a mirror specular streak down the
   lit face, a cool blue arena bounce climbing the shadow side, and a warm
   floor-bounce at the base. Handles are dimensional tubes with their own
   rim + core-shadow. AO where every joint meets. STATIC, promoted — the
   object everyone came for, at rest, lit like the broadcast's beauty shot. */
head::after {
  content: "";
  display: var(--esports-scenery, block);
  position: fixed;
  right: 5vw;
  bottom: 8vh;
  width: 272px;
  height: 370px;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 340'%3E%3Cdefs%3E%3ClinearGradient id='bowl' x1='.12' y1='.05' x2='.9' y2='.95'%3E%3Cstop offset='0' stop-color='%23fff6d8'/%3E%3Cstop offset='.16' stop-color='%23ffe49a'/%3E%3Cstop offset='.34' stop-color='%23f4c85a'/%3E%3Cstop offset='.5' stop-color='%23c9962f'/%3E%3Cstop offset='.62' stop-color='%237c561a'/%3E%3Cstop offset='.72' stop-color='%23a67424'/%3E%3Cstop offset='.86' stop-color='%23d8a63f'/%3E%3Cstop offset='1' stop-color='%236b4a16'/%3E%3C/linearGradient%3E%3ClinearGradient id='stem' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%235b4114'/%3E%3Cstop offset='.28' stop-color='%23d8a840'/%3E%3Cstop offset='.5' stop-color='%23ffe9a8'/%3E%3Cstop offset='.72' stop-color='%23b6862a'/%3E%3Cstop offset='1' stop-color='%234e3712'/%3E%3C/linearGradient%3E%3ClinearGradient id='base' x1='0' y1='0' x2='1' y2='.4'%3E%3Cstop offset='0' stop-color='%236a4c18'/%3E%3Cstop offset='.35' stop-color='%23f2cf6e'/%3E%3Cstop offset='.55' stop-color='%23fff0c0'/%3E%3Cstop offset='.8' stop-color='%23b3842a'/%3E%3Cstop offset='1' stop-color='%234a350f'/%3E%3C/linearGradient%3E%3ClinearGradient id='hnd' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23e8bd52'/%3E%3Cstop offset='.35' stop-color='%23fff0bc'/%3E%3Cstop offset='.6' stop-color='%23a9781f'/%3E%3Cstop offset='1' stop-color='%234f3812'/%3E%3C/linearGradient%3E%3ClinearGradient id='pt' x1='0' y1='0' x2='.2' y2='1'%3E%3Cstop offset='0' stop-color='%23244676'/%3E%3Cstop offset='.5' stop-color='%23162e56'/%3E%3Cstop offset='1' stop-color='%230b1c3c'/%3E%3C/linearGradient%3E%3ClinearGradient id='pttop' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%232f5a94'/%3E%3Cstop offset='1' stop-color='%23132a52'/%3E%3C/linearGradient%3E%3CradialGradient id='pool' cx='50%25' cy='42%25' r='58%25'%3E%3Cstop offset='0' stop-color='%23ffe6ae' stop-opacity='.42'/%3E%3Cstop offset='.42' stop-color='%23ffcf78' stop-opacity='.16'/%3E%3Cstop offset='1' stop-color='%23ffcf78' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='spec' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23ffffff' stop-opacity='1'/%3E%3Cstop offset='.4' stop-color='%23fffbe8' stop-opacity='.82'/%3E%3Cstop offset='.7' stop-color='%23fff2c8' stop-opacity='.42'/%3E%3Cstop offset='1' stop-color='%23fff2c8' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cellipse cx='120' cy='150' rx='118' ry='142' fill='url(%23pool)'/%3E%3Cellipse cx='118' cy='328' rx='90' ry='11' fill='%2301040b' opacity='.82'/%3E%3Cellipse cx='118' cy='325' rx='64' ry='6.5' fill='%2301030a' opacity='.7'/%3E%3Cellipse cx='118' cy='322' rx='40' ry='4' fill='%23000207' opacity='.6'/%3E%3Cpath d='M40 282 L40 308 L78 324 L162 324 L200 308 L200 282 L162 298 L78 298 Z' fill='%23081430'/%3E%3Cpath d='M40 282 L40 308 L78 324 M200 282 L200 308 L162 324' fill='none' stroke='%2358b9ff' stroke-opacity='.34' stroke-width='1.2'/%3E%3Cpath d='M78 298 L78 324 M162 298 L162 324' fill='none' stroke='%23040a16' stroke-width='1.2'/%3E%3Cpath d='M40 282 L78 266 L162 266 L200 282 L162 298 L78 298 Z' fill='url(%23pttop)' stroke='%2358b9ff' stroke-opacity='.5' stroke-width='1.5'/%3E%3Cpath d='M40 282 L78 266 L120 266 L120 298 L78 298 Z' fill='%2358b9ff' fill-opacity='.05'/%3E%3Cellipse cx='120' cy='276' rx='36' ry='7.5' fill='%23ffe1a0' fill-opacity='.16'/%3E%3Cpath d='M40 282 L78 298 L162 298 L200 282' fill='none' stroke='%237fd0ff' stroke-opacity='.55' stroke-width='1.5'/%3E%3Crect x='97' y='302' width='46' height='15' rx='2' fill='%230c1a38' stroke='%23ffd98a' stroke-opacity='.4'/%3E%3Crect x='97' y='302' width='46' height='4' rx='2' fill='%23ffe9ad' fill-opacity='.18'/%3E%3Ctext x='120' y='313' font-family='Arial,Helvetica,sans-serif' font-weight='bold' font-size='8' letter-spacing='2' text-anchor='middle' fill='%23ffdc90' fill-opacity='.72'%3EMAJOR V%3C/text%3E%3Cellipse cx='120' cy='264' rx='42' ry='8' fill='%23050d1c' opacity='.5'/%3E%3Cpath d='M84 254 L156 254 L150 266 L90 266 Z' fill='url(%23base)'/%3E%3Cpath d='M84 254 L156 254 L154 257 L86 257 Z' fill='%23fff3cd' fill-opacity='.75'/%3E%3Crect x='92' y='245' width='56' height='10' rx='2' fill='url(%23base)'/%3E%3Crect x='92' y='245' width='56' height='3' rx='1.5' fill='%23fff3cd' fill-opacity='.7'/%3E%3Cpath d='M114 205 C113 220 109 232 101 245 L139 245 C131 232 127 220 126 205 Z' fill='url(%23stem)'/%3E%3Cpath d='M117.5 206 C117 221 115 233 111 245 L114 245 C112 233 111 221 111 206 Z' fill='%23fff2c6' fill-opacity='.6'/%3E%3Cellipse cx='120' cy='202' rx='17' ry='5.5' fill='%23795518'/%3E%3Cellipse cx='120' cy='201' rx='14' ry='3.5' fill='%23050d1c' opacity='.45'/%3E%3Cpath d='M79 96 C48 90 41 130 65 145 C72 150 79 148 82 143 L77 133 C63 132 60 112 80 112 Z' fill='url(%23hnd)'/%3E%3Cpath d='M79 100 C55 96 49 128 66 141' fill='none' stroke='%23fff0bc' stroke-opacity='.55' stroke-width='1.6' stroke-linecap='round'/%3E%3Cpath d='M78 130 C66 128 64 116 78 114' fill='none' stroke='%23492f0c' stroke-opacity='.6' stroke-width='1.4' stroke-linecap='round'/%3E%3Cpath d='M161 96 C192 90 199 130 175 145 C168 150 161 148 158 143 L163 133 C177 132 180 112 160 112 Z' fill='url(%23hnd)'/%3E%3Cpath d='M162 130 C174 128 176 116 162 114' fill='none' stroke='%23fff0bc' stroke-opacity='.4' stroke-width='1.4' stroke-linecap='round'/%3E%3Cpath d='M77 92 L163 92 C163 141 150 179 120 199 C90 179 77 141 77 92 Z' fill='url(%23bowl)'/%3E%3Cpath d='M77 92 L100 92 C100 140 106 172 118 196 C98 184 84 155 79 120 C77 108 77 99 77 92 Z' fill='%23231704' fill-opacity='.28'/%3E%3Cpath d='M77 92 L163 92 C163 105 161 116 158 126 L82 126 C79 116 77 105 77 92 Z' fill='%23fff4cf' fill-opacity='.14'/%3E%3Cpath d='M80 150 C92 160 108 165 120 165 C132 165 148 160 160 150 C150 172 136 188 120 199 C104 188 90 172 80 150 Z' fill='%23050d1c' opacity='.14'/%3E%3Cpath d='M101 96 C100 142 105 176 116 199 L128 199 C122 176 118 142 121 96 Z' fill='url(%23spec)'/%3E%3Cpath d='M111 96 C110 140 112 173 118 198' fill='none' stroke='%23ffffff' stroke-opacity='.85' stroke-width='4' stroke-linecap='round'/%3E%3Cpath d='M111 96 C110 140 112 173 118 198' fill='none' stroke='%23ffffff' stroke-opacity='.95' stroke-width='1.3' stroke-linecap='round'/%3E%3Cpath d='M148 96 C149 138 141 172 124 194' fill='none' stroke='%23fff0bc' stroke-opacity='.45' stroke-width='1.8' stroke-linecap='round'/%3E%3Cpath d='M79 98 C80 142 92 176 116 197' fill='none' stroke='%2378c0ff' stroke-width='2.6' stroke-linecap='round' opacity='.55'/%3E%3Cpath d='M80 100 C81 142 92 174 114 195' fill='none' stroke='%23bfe6ff' stroke-width='.9' stroke-linecap='round' opacity='.5'/%3E%3Cpath d='M124 176 C133 182 140 185 143 183' fill='none' stroke='%23ffefb0' stroke-opacity='.35' stroke-width='1.4' stroke-linecap='round'/%3E%3Cellipse cx='120' cy='92' rx='45' ry='9.5' fill='%23a67a24'/%3E%3Cellipse cx='120' cy='91.5' rx='39' ry='7' fill='%232a1d08'/%3E%3Cellipse cx='120' cy='90' rx='39' ry='6' fill='%23120c04'/%3E%3Cpath d='M84 86 Q120 76 156 86' fill='none' stroke='%23ffffff' stroke-width='3' stroke-linecap='round' opacity='.95'/%3E%3Cpath d='M92 94 Q120 100 148 94' fill='none' stroke='%23ffe6a4' stroke-width='1.4' stroke-linecap='round' opacity='.5'/%3E%3Cpath d='M90 87 Q104 81 120 82' fill='none' stroke='%23ffffff' stroke-width='3.4' stroke-linecap='round' opacity='.9'/%3E%3Cpath d='M90 87 Q104 81 120 82' fill='none' stroke='%23ffffff' stroke-width='7' stroke-linecap='round' opacity='.28'/%3E%3Cpath d='M133 130 L126.5 141.3 L113.5 141.3 L107 130 L113.5 118.7 L126.5 118.7 Z' fill='none' stroke='%235c3f12' stroke-opacity='.55' stroke-width='1.6'/%3E%3Cpath d='M133 130 L126.5 141.3 L113.5 141.3 L107 130' fill='none' stroke='%23120a02' stroke-opacity='.4' stroke-width='2.4'/%3E%3Cpath d='M113.5 118.7 L126.5 118.7 L124 123 L116 123 Z' fill='%23fff8e0' fill-opacity='.6'/%3E%3Cpath d='M107 130 L113.5 118.7' stroke='%23fffbe8' stroke-opacity='.55' stroke-width='1.4'/%3E%3Ccircle cx='108' cy='112' r='4.2' fill='%23ffffff' opacity='1'/%3E%3Ccircle cx='108' cy='112' r='8' fill='%23fffbe8' opacity='.28'/%3E%3Cpath d='M108 105 L109.4 110.6 L115 112 L109.4 113.4 L108 119 L106.6 113.4 L101 112 L106.6 110.6 Z' fill='%23ffffff' opacity='.9'/%3E%3C/svg%3E") center bottom / contain no-repeat;
}

/* ═══ extra prop layers: the two <meta> void elements render nothing
   themselves but their fixed pseudos are free canvases. ═══ */
head meta { display: var(--esports-scenery, block); }

/* ═══ SCOREBUG — the hanging panel top-right still shows the series that
   just ended: GRAND FINALS, 2:2, GAME 5 — LIVE. STATIC, promoted. */
head meta:first-of-type::before {
  content: "";
  display: var(--esports-scenery, block);
  position: fixed;
  right: 4.5vw;
  top: 0;
  width: 300px;
  height: 178px;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 190'%3E%3Cdefs%3E%3ClinearGradient id='pn' x1='0' y1='0' x2='.15' y2='1'%3E%3Cstop offset='0' stop-color='%23204272'/%3E%3Cstop offset='.14' stop-color='%23132a52'/%3E%3Cstop offset='.5' stop-color='%230c1c3a'/%3E%3Cstop offset='1' stop-color='%23060d1e'/%3E%3C/linearGradient%3E%3ClinearGradient id='gloss' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23bfe0ff' stop-opacity='.22'/%3E%3Cstop offset='1' stop-color='%23bfe0ff' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='blu' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%237fc4ff'/%3E%3Cstop offset='1' stop-color='%232f6fd6'/%3E%3C/linearGradient%3E%3ClinearGradient id='gld' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23ffe3a0'/%3E%3Cstop offset='1' stop-color='%23d69f34'/%3E%3C/linearGradient%3E%3CradialGradient id='sg' cx='50%25' cy='42%25' r='58%25'%3E%3Cstop offset='0' stop-color='%232f86ff' stop-opacity='.16'/%3E%3Cstop offset='1' stop-color='%232f86ff' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='158' cy='92' rx='158' ry='84' fill='url(%23sg)'/%3E%3Cpath d='M120 2 L128 34 L192 34 L200 2' fill='none' stroke='%2316294a' stroke-width='5'/%3E%3Cpath d='M120 2 L128 34 M200 2 L192 34' stroke='%235a86bf' stroke-opacity='.4' stroke-width='1.2'/%3E%3Crect x='150' y='0' width='20' height='9' rx='2' fill='%230f2647' stroke='%235a86bf' stroke-opacity='.45'/%3E%3Cpath d='M40 36 L280 36 L266 150 L54 150 Z' fill='%23050a18' opacity='.5'/%3E%3Cpath d='M38 36 L292 36 L277 149 L53 149 Z' fill='url(%23pn)'/%3E%3Cpath d='M38 36 L292 36 L288 66 L41 66 Z' fill='url(%23gloss)'/%3E%3Cpath d='M38 36 L292 36 L277 149 L53 149 Z' fill='none' stroke='%2378c4ff' stroke-opacity='.7' stroke-width='1.6'/%3E%3Cpath d='M43 40 L286 40 L273 145 L57 145 Z' fill='none' stroke='%23bfe4ff' stroke-opacity='.18' stroke-width='1'/%3E%3Cpath d='M40 38 L290 38' stroke='%23eaf6ff' stroke-opacity='.5' stroke-width='1.4'/%3E%3Ctext x='160' y='61' font-family='Arial,Helvetica,sans-serif' font-weight='bold' font-size='15' letter-spacing='4' text-anchor='middle' fill='%23050c1c' fill-opacity='.55'%3EGRAND FINALS%3C/text%3E%3Ctext x='160' y='60' font-family='Arial,Helvetica,sans-serif' font-weight='bold' font-size='15' letter-spacing='4' text-anchor='middle' fill='%23dcefff'%3EGRAND FINALS%3C/text%3E%3Cpath d='M52 69 L268 69' stroke='%2358b9ff' stroke-opacity='.4' stroke-width='1'/%3E%3Cpath d='M52 69 L160 69' stroke='%237fc4ff' stroke-opacity='.5' stroke-width='1'/%3E%3Crect x='47' y='84' width='5' height='34' rx='2' fill='url(%23blu)'/%3E%3Ctext x='74' y='108' font-family='Arial,Helvetica,sans-serif' font-weight='bold' font-size='15' letter-spacing='2' text-anchor='middle' fill='%2384c6ff'%3EBLU%3C/text%3E%3Ctext x='159' y='114' font-family='Arial,Helvetica,sans-serif' font-weight='bold' font-size='39' letter-spacing='3' text-anchor='middle' fill='%23081428' fill-opacity='.6'%3E2:2%3C/text%3E%3Ctext x='158' y='113' font-family='Arial,Helvetica,sans-serif' font-weight='bold' font-size='39' letter-spacing='3' text-anchor='middle' fill='%23f2f9ff'%3E2:2%3C/text%3E%3Crect x='278' y='84' width='5' height='34' rx='2' fill='url(%23gld)'/%3E%3Ctext x='248' y='108' font-family='Arial,Helvetica,sans-serif' font-weight='bold' font-size='15' letter-spacing='2' text-anchor='middle' fill='%23ffd98a'%3EGLD%3C/text%3E%3Crect x='100' y='122' width='120' height='20' rx='2' fill='%2358b9ff' fill-opacity='.10' stroke='%2358b9ff' stroke-opacity='.45'/%3E%3Crect x='100' y='122' width='120' height='7' rx='2' fill='%23bfe0ff' fill-opacity='.12'/%3E%3Ccircle cx='113' cy='132' r='4.5' fill='%23ff5d6e' opacity='.3'/%3E%3Ccircle cx='113' cy='132' r='2.6' fill='%23ff5d6e'/%3E%3Ctext x='172' y='136' font-family='Arial,Helvetica,sans-serif' font-weight='bold' font-size='10.5' letter-spacing='2' text-anchor='middle' fill='%23aad8ff'%3EGAME 5 - LIVE%3C/text%3E%3Cpath d='M53 149 L277 149' stroke='%2378c4ff' stroke-opacity='.7' stroke-width='2.5'/%3E%3Cpath d='M53 149 L277 149' stroke='%23eaf6ff' stroke-opacity='.3' stroke-width='.8'/%3E%3Cellipse cx='165' cy='153' rx='124' ry='9' fill='%2358b9ff' fill-opacity='.12'/%3E%3C/svg%3E") center top / contain no-repeat;
}

/* ═══ SCISSOR BEAM · LEFT truss lamp — the grand-finals cue a static rig can
   never sell. A NARROW spotlight cone pinned by its apex to the left moving-
   head fixture (transform-origin at the lamp lens), swinging slowly opposite
   the right beam so the two cross at mid-stage. Narrow painted wedge (~11deg,
   hot specular core), transform-only rotation, masked to dissolve before it
   reaches the crowd. Translucent light over the lane is fine — names sit in
   the body stacking context ABOVE every head pseudo, so nothing here can
   occlude a plate. will-change: 1 of 2 for the pair. */
head meta:first-of-type::after {
  content: "";
  display: var(--esports-scenery, block);
  position: fixed;
  left: 0;
  top: 0;
  width: 62vw;
  height: 82vh;
  z-index: -1;
  pointer-events: none;
  transform-origin: 2vw 44px;
  transform: rotate(0deg);
  will-change: transform;
  background:
    radial-gradient(ellipse 72px 34px at 2vw 44px, rgba(214, 238, 255, 0.30), rgba(214, 238, 255, 0) 72%),
    conic-gradient(from 108deg at 2vw 44px,
      rgba(200, 232, 255, 0) 0deg,
      rgba(206, 236, 255, 0.06) 2.5deg,
      rgba(224, 244, 255, 0.18) 4deg,
      rgba(246, 251, 255, 0.28) 5deg,
      rgba(224, 244, 255, 0.17) 6deg,
      rgba(200, 232, 255, 0.05) 8.5deg,
      rgba(200, 232, 255, 0) 11deg);
  -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 40%, rgba(0, 0, 0, 0.55) 66%, transparent 92%);
  mask-image: linear-gradient(to bottom, #000 0%, #000 40%, rgba(0, 0, 0, 0.55) 66%, transparent 92%);
  animation: esports-beam-l 8s ease-in-out infinite;
}

/* ═══ CASTERS' DESK — lower-left silhouette: two headsets still on, one
   arm up for the chat, monitor glow between them, LED lip on the desk.
   Near-black inks with a cold rim so it sits in the room. STATIC, promoted. */
head meta:last-of-type::before {
  content: "";
  display: var(--esports-scenery, block);
  position: fixed;
  left: 3vw;
  bottom: 3.5vh;
  width: 340px;
  height: 180px;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 360 190'%3E%3Cellipse cx='176' cy='183' rx='150' ry='7' fill='%2301040a' opacity='.6'/%3E%3Ccircle cx='120' cy='86' r='20' fill='%2304070f'/%3E%3Cpath d='M84 122 C90 102 106 96 120 96 C134 96 150 102 156 122 Z' fill='%2304070f'/%3E%3Cpath d='M104 78 C108 62 132 62 136 78' fill='none' stroke='%2316294f' stroke-width='4'/%3E%3Crect x='99' y='78' width='9' height='15' rx='4' fill='%2316294f'/%3E%3Cpath d='M104 91 C98 99 100 105 110 106' fill='none' stroke='%2316294f' stroke-width='2.5'/%3E%3Cpath d='M108 70 C114 63 128 63 134 70' fill='none' stroke='%2396c8ff' stroke-opacity='.5' stroke-width='2'/%3E%3Ccircle cx='225' cy='84' r='21' fill='%2304070f'/%3E%3Cpath d='M188 122 C194 100 210 94 225 94 C240 94 256 102 262 122 Z' fill='%2304070f'/%3E%3Cpath d='M258 116 C266 98 274 88 284 78' fill='none' stroke='%2304070f' stroke-width='13' stroke-linecap='round'/%3E%3Ccircle cx='287' cy='75' r='8' fill='%2304070f'/%3E%3Cpath d='M209 76 C213 60 237 60 241 76' fill='none' stroke='%2316294f' stroke-width='4'/%3E%3Crect x='204' y='76' width='9' height='15' rx='4' fill='%2316294f'/%3E%3Cpath d='M213 68 C219 61 233 61 239 68' fill='none' stroke='%2396c8ff' stroke-opacity='.5' stroke-width='2'/%3E%3Crect x='158' y='96' width='44' height='26' rx='3' fill='%23071021' stroke='%231c2c4c'/%3E%3Cellipse cx='180' cy='112' rx='30' ry='12' fill='%2358b9ff' fill-opacity='.08'/%3E%3Cpath d='M20 120 L340 120 L322 138 L38 138 Z' fill='%2312244a'/%3E%3Cpath d='M38 138 L322 138 L322 186 L38 186 Z' fill='%23050c1a'/%3E%3Cpath d='M38 138 L322 138' stroke='%2358b9ff' stroke-opacity='.5' stroke-width='2'/%3E%3Cpath d='M120 148 L180 148 L164 178 L104 178 Z' fill='%2358b9ff' fill-opacity='.10' stroke='%2358b9ff' stroke-opacity='.3'/%3E%3Cpath d='M196 148 L214 148 L198 178 L180 178 Z' fill='%2358b9ff' fill-opacity='.05'/%3E%3C/svg%3E") center bottom / contain no-repeat;
}

/* ═══ SCISSOR BEAM · RIGHT truss lamp — mirror cone, apex pinned to the right
   moving-head fixture, swinging in OPPOSITE phase to the left beam so the pair
   scissors across centre stage (crossed at the neutral rest angle). Narrow
   wedge, transform-only. will-change: 2 of 2 for the pair. */
head meta:last-of-type::after {
  content: "";
  display: var(--esports-scenery, block);
  position: fixed;
  right: 0;
  top: 0;
  width: 62vw;
  height: 82vh;
  z-index: -1;
  pointer-events: none;
  transform-origin: calc(100% - 2vw) 44px;
  transform: rotate(0deg);
  will-change: transform;
  background:
    radial-gradient(ellipse 72px 34px at calc(100% - 2vw) 44px, rgba(214, 238, 255, 0.28), rgba(214, 238, 255, 0) 72%),
    conic-gradient(from 241deg at calc(100% - 2vw) 44px,
      rgba(200, 232, 255, 0) 0deg,
      rgba(206, 236, 255, 0.05) 2.5deg,
      rgba(224, 244, 255, 0.16) 4deg,
      rgba(246, 251, 255, 0.26) 5deg,
      rgba(224, 244, 255, 0.15) 6deg,
      rgba(200, 232, 255, 0.05) 8.5deg,
      rgba(200, 232, 255, 0) 11deg);
  -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 40%, rgba(0, 0, 0, 0.55) 66%, transparent 92%);
  mask-image: linear-gradient(to bottom, #000 0%, #000 40%, rgba(0, 0, 0, 0.55) 66%, transparent 92%);
  animation: esports-beam-r 8s ease-in-out infinite;
}

/* ═══ TICKER TAPE — the broadcast's bottom line, still crawling after the
   series: results, GGs, the send-off. A slim strip pinned to the very
   bottom edge (inside the base mask's dissolve zone, so names never touch
   it). The text tile repeats every 1200px and the whole strip shifts left
   in steps() — a small layer, 2 discrete hops/s, transform only, loops
   seamlessly (element overscans right by exactly one tile). ═══ */
head title { display: var(--esports-scenery, block); font-size: 0; color: transparent; }
head title::before {
  content: "";
  display: var(--esports-scenery, block);
  position: fixed;
  left: 0;
  bottom: 0;
  width: calc(100vw + 1200px);
  height: 30px;
  z-index: 1;
  pointer-events: none;
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 30'%3E%3Ctext x='24' y='20' font-family='Arial,Helvetica,sans-serif' font-weight='bold' font-size='13' letter-spacing='3' fill='%23cfe6ff'%3EGRAND FINALS %E2%80%94 CHAMPIONSHIP SUNDAY%3C/text%3E%3Crect x='452' y='11' width='7' height='7' transform='rotate(45 455.5 14.5)' fill='%2358b9ff'/%3E%3Ctext x='488' y='20' font-family='Arial,Helvetica,sans-serif' font-weight='bold' font-size='13' letter-spacing='3' fill='%23ffd98a'%3ESERIES 2-2 %C2%B7 GAME 5 DECIDER%3C/text%3E%3Crect x='822' y='11' width='7' height='7' transform='rotate(45 825.5 14.5)' fill='%23f7c548'/%3E%3Ctext x='858' y='20' font-family='Arial,Helvetica,sans-serif' font-weight='bold' font-size='13' letter-spacing='3' fill='%23eef5ff'%3EGGs %C2%B7 THANKS FOR WATCHING%3C/text%3E%3Crect x='1148' y='11' width='7' height='7' transform='rotate(45 1151.5 14.5)' fill='%2358b9ff'/%3E%3C/svg%3E") 0 50% / 1200px 30px repeat-x,
    linear-gradient(rgba(150, 210, 255, 0.5), rgba(150, 210, 255, 0.5)) 0 0 / 100% 2px no-repeat,
    linear-gradient(180deg, rgba(12, 24, 48, 0.9) 0%, rgba(3, 8, 18, 0.95) 100%);
  animation: esports-ticker 26s steps(52, end) infinite;
}

/* ═══ CROWD CAMERA FLASHES — the sold-out bowl beat. Sharp white pinpoints pop
   off across the stands like phones firing on the champion moment. TWO offset
   sets ripple async so it reads as scattered cameras, not one blink. Coarse
   dots with soft halos sit in the upper crowd band (above the silhouette tops,
   below the name lane — L6), steps() opacity so each is a discrete flash, ~1.8
   flashes/s per set. No will-change (discrete opacity, not a continuous mover). */
head title::after {
  content: "";
  display: var(--esports-scenery, block);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 22vh;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  background:
    radial-gradient(circle 11px at 11% 40%, rgba(255,255,255,0.98) 0 1.6px, rgba(210,235,255,0.5) 3.5px, rgba(210,235,255,0) 100%),
    radial-gradient(circle 9px at 31% 58%, rgba(255,255,255,0.95) 0 1.4px, rgba(210,235,255,0.45) 3px, rgba(210,235,255,0) 100%),
    radial-gradient(circle 10px at 52% 34%, rgba(255,255,255,0.95) 0 1.5px, rgba(210,235,255,0.45) 3px, rgba(210,235,255,0) 100%),
    radial-gradient(circle 9px at 72% 56%, rgba(255,255,255,0.95) 0 1.4px, rgba(210,235,255,0.45) 3px, rgba(210,235,255,0) 100%),
    radial-gradient(circle 11px at 89% 42%, rgba(255,255,255,0.98) 0 1.6px, rgba(210,235,255,0.5) 3.5px, rgba(210,235,255,0) 100%);
  background-repeat: no-repeat;
  animation: esports-flash-a 3.2s steps(1, end) infinite;
}

/* the LINK element's fixed pseudos are free canvases here (used by no other
   scenery). Set B of the camera flashes + the LIVE-dot pulse hang off it. */
head link { display: var(--esports-scenery, block); }
head link:first-of-type::after {
  content: "";
  display: var(--esports-scenery, block);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 22vh;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  background:
    radial-gradient(circle 9px at 19% 54%, rgba(255,255,255,0.95) 0 1.4px, rgba(210,235,255,0.45) 3px, rgba(210,235,255,0) 100%),
    radial-gradient(circle 10px at 40% 40%, rgba(255,255,255,0.96) 0 1.5px, rgba(210,235,255,0.48) 3.2px, rgba(210,235,255,0) 100%),
    radial-gradient(circle 9px at 60% 60%, rgba(255,255,255,0.95) 0 1.4px, rgba(210,235,255,0.45) 3px, rgba(210,235,255,0) 100%),
    radial-gradient(circle 11px at 81% 36%, rgba(255,255,255,0.98) 0 1.6px, rgba(210,235,255,0.5) 3.5px, rgba(210,235,255,0) 100%),
    radial-gradient(circle 9px at 94% 62%, rgba(255,255,255,0.95) 0 1.4px, rgba(210,235,255,0.45) 3px, rgba(210,235,255,0) 100%);
  background-repeat: no-repeat;
  animation: esports-flash-b 3.2s steps(1, end) infinite;
}

/* ═══ LIVE dot pulse — the scorebug's "GAME 5 - LIVE" indicator breathes red,
   the one thing on the panel that says the series is happening right now. A
   small soft red glow over the bug's dot (soft, so exact alignment is forgiving),
   opacity + scale pulse. Small layer, no will-change. */
head link:first-of-type::before {
  content: "";
  display: var(--esports-scenery, block);
  position: fixed;
  right: 13.4vw;
  top: 104px;
  width: 40px;
  height: 40px;
  z-index: 1;
  pointer-events: none;
  transform-origin: 50% 50%;
  background: radial-gradient(circle, rgba(255,93,110,0.95) 0 2.6px, rgba(255,70,90,0.5) 7px, rgba(255,70,90,0) 68%);
  animation: esports-live 1.7s ease-in-out infinite;
}

/* ═══ broadcast guide rails at the lane edges. SOLID vertical lines, not
   dashed: a solid vertical rail has no horizontal edges, so it is exactly
   invariant under the vertical crawl — zero flicker by geometry, even
   though it is screen-fixed. (The dashed version ticked visibly against
   the scroll; solid reads cleaner as a broadcast frame anyway.) */
.credits-roll::before,
.credits-slideshow::before {
  content: "";
  display: var(--esports-scenery, block);
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.5;
  background:
    linear-gradient(rgba(88, 185, 255, 0.5), rgba(88, 185, 255, 0.5)) no-repeat calc(50% - 23rem) 0 / 2px 100%,
    linear-gradient(rgba(88, 185, 255, 0.5), rgba(88, 185, 255, 0.5)) no-repeat calc(50% + 23rem) 0 / 2px 100%;
}

/* ═══ the rundown: every block is a ROUND of official results ═══ */
.credits-block,
.credits-slide:not(.flourish) { counter-increment: gf-round; }

/* parity — solid blue lower-third, then glass navy, alternating. nth counts
   sections, intro is 1, so the first block (2) lands on the solid bar.
   Content-agnostic: custom credit types just keep cycling. */
.credits-block:nth-of-type(even),
.credits-slide:nth-of-type(even) {
  --gf-bar: linear-gradient(105deg, #3f95ff 0%, #1e5fd6 48%, #123a8a 100%);
  --gf-bar-ink: #f4faff;
  --gf-bar-edge: #dff1ff;
  --gf-bar-glow: rgba(47, 134, 255, 0.35);
}
.credits-block:nth-of-type(odd),
.credits-slide:nth-of-type(odd) {
  --gf-bar: linear-gradient(105deg, rgba(13, 28, 58, 0.94) 0%, rgba(7, 15, 34, 0.94) 100%);
  --gf-bar-ink: #58b9ff;
  --gf-bar-edge: rgba(88, 185, 255, 0.95);
  --gf-bar-glow: rgba(47, 134, 255, 0.22);
}

/* eyebrow above each lower-third: the round number, straight off the
   broadcast rundown sheet. */
.credits-block::before,
.credits-slide:not(.flourish)::before {
  content: "ROUND " counter(gf-round, decimal-leading-zero) " \\2014  OFFICIAL RESULT";
  display: block;
  font-family: "Chakra Petch", "Trebuchet MS", monospace;
  font-weight: 600;
  font-size: 0.64rem;
  letter-spacing: 0.5em;
  padding-left: 0.5em;
  margin-bottom: 0.85rem;
  color: var(--gf-blue-lt);
  opacity: 0.85;
  text-shadow: 0 1px 8px rgba(2, 5, 14, 0.8);
}

/* ═══ titles: the lower-third. Upright Saira caps on a skewed bar with a
   hot leading edge, hard drop block, and three chips trailing off the end
   like the package's transition wipe. */
.credits-block__title {
  position: relative;
  z-index: 0;
  width: fit-content;
  max-width: 82vw;
  margin: 0 auto 1.7rem;
  padding: 0.3em 1.15em 0.26em 1.3em;
  font-weight: 800;
  letter-spacing: 0.13em;
  color: var(--gf-bar-ink, var(--gf-white));
  text-shadow: 0 1px 6px rgba(2, 6, 16, 0.4);
}
.credits-block__title::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  transform: skewX(-16deg);
  background:
    /* hot leading edge */
    linear-gradient(90deg, var(--gf-bar-edge, #dff1ff) 0 0.26em, rgba(0, 0, 0, 0) 0.26em),
    /* glassy top-half sheen — the plastic catches the rig light */
    linear-gradient(180deg, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.08) 34%, rgba(255, 255, 255, 0) 52%, rgba(2, 6, 16, 0.10) 100%),
    var(--gf-bar, linear-gradient(105deg, #3f95ff, #123a8a));
  box-shadow:
    0.3em 0.3em 0 rgba(2, 6, 16, 0.85),
    0 0 24px var(--gf-bar-glow, rgba(47, 134, 255, 0.3)),
    inset 0 1.5px 0 rgba(255, 255, 255, 0.35),
    inset 0 -1.5px 0 rgba(2, 6, 16, 0.35);
}
.credits-block__title::after {
  content: "";
  display: block;
  position: absolute;
  left: 100%;
  top: 50%;
  width: 0.55em;
  height: 0.52em;
  margin: -0.26em 0 0 0.6em;
  background: var(--gf-bar-edge, #dff1ff);
  opacity: 0.9;
  transform: skewX(-16deg);
  box-shadow: 0.95em 0 0 rgba(88, 185, 255, 0.45), 1.9em 0 0 rgba(88, 185, 255, 0.18);
}

/* ═══ rows: the player card. Condensed names between angular team-tag
   brackets; amounts ride in skewed stat-chip pills. Names are sacred —
   wrap, never clip. */
.credit {
  max-width: min(44rem, 92vw);
  margin-inline: auto;
  min-width: 0;
  overflow-wrap: anywhere;
  font-weight: 500;
  letter-spacing: 0.045em;
  line-height: 1.5;
}
.credit__name {
  color: var(--gf-white);
  font-weight: 600;
  text-shadow: 0 0 14px rgba(88, 185, 255, 0.14), var(--credits-shadow);
}
.credit__name::before,
.credit__name::after {
  content: "";
  display: inline-block;
  width: 0.32em;
  height: 0.68em;
  border: 2px solid rgba(88, 185, 255, 0.6);
  transform: skewX(-15deg);
}
.credit__name::before { border-right: 0; margin-right: 0.5em; }
.credit__name::after { border-left: 0; margin-left: 0.5em; }
.credit__amount {
  display: inline-block;
  position: relative;
  z-index: 0;
  opacity: 1;
  margin-left: 0.75em;
  padding: 0.1em 0.8em 0.14em;
  vertical-align: 0.1em;
  font-family: "Chakra Petch", "Trebuchet MS", monospace;
  font-size: 0.6em;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--gf-blue-pale);
  font-variant-numeric: tabular-nums;
  text-shadow: 0 0 10px rgba(88, 185, 255, 0.3);
}
.credit__amount::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  transform: skewX(-12deg);
  border-radius: 1px;
  background: rgba(53, 140, 255, 0.12);
  border: 1px solid rgba(88, 185, 255, 0.5);
  box-shadow: inset 0 0 12px rgba(53, 140, 255, 0.12);
}

/* ═══ flourish cards ═══ */
.flourish--intro { gap: 1.3rem; }

/* badge -> the event strap (copy swap via font-size:0 + ::after; the
   skewed chip body rides ::before so the text stays upright) */
.flourish__badge {
  font-size: 0;
  border: 0;
  border-radius: 0;
  padding: 0;
  box-shadow: none;
  position: relative;
  z-index: 0;
}
.flourish__badge::after {
  content: "GRAND FINALS \\2022  CHAMPIONSHIP SUNDAY";
  display: inline-block;
  font-family: "Chakra Petch", "Trebuchet MS", monospace;
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 0.34em;
  padding: 0.62em 1.3em 0.62em 1.64em;
  color: #dff0ff;
  text-shadow: 0 0 12px rgba(88, 185, 255, 0.45);
}
.flourish__badge::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  transform: skewX(-14deg);
  background: rgba(13, 28, 58, 0.78);
  border: 1px solid rgba(88, 185, 255, 0.55);
  border-left: 3px solid var(--gf-blue-lt);
  box-shadow: 0 0 22px rgba(47, 134, 255, 0.25);
}

/* the streamer's title, set like the event mark: heavy condensed caps in a
   BROADCAST-CHROME finish — a hot ivory top lip, a bright specular band across
   the upper third, a cool steel-blue body, and a dark base so the letters read
   as brushed metal caught in the rig light. The glow rides a drop-shadow filter
   because background-clip:text zeroes text-shadow. Solid color first as the
   fallback for engines without text clipping. */
.flourish--intro .flourish__title {
  font-weight: 800;
  letter-spacing: 0.06em;
  line-height: 1.04;
  max-width: min(88vw, 13em);
  color: #fff3cf;
  /* championship gold — the old steel-blue gradient sat at the same value as
     the arena behind it and read as flat grey placeholder; the title should
     outshine its own scenery (it's the trophy moment) */
  background: linear-gradient(180deg, #ffffff 0%, #fff3c4 24%, #ffd96a 46%, #f0a92e 62%, #c67f14 78%, #ffe9a8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 26px rgba(255, 200, 80, 0.5)) drop-shadow(0 2px 10px rgba(2, 5, 14, 0.85));
}
.flourish--intro .flourish__title::after {
  content: "";
  display: block;
  width: 4.8em;
  height: 0.13em;
  margin: 0.28em auto 0;
  transform: skewX(-30deg);
  background: linear-gradient(90deg, rgba(88, 185, 255, 0) 0%, var(--gf-blue-lt) 22%, #dff1ff 50%, var(--gf-blue-lt) 78%, rgba(88, 185, 255, 0) 100%);
}

/* tagline is streamer copy: restyle only — the venue line */
.flourish__tagline {
  font-style: normal;
  font-weight: 400;
  font-size: 0.98rem;
  letter-spacing: 0.3em;
  padding-left: 0.3em;
  text-transform: uppercase;
  color: rgba(190, 220, 255, 0.82);
}

/* rating -> the series state chip (copy swap) */
.flourish__rating { font-size: 0; border: 0; padding: 0; opacity: 1; }
.flourish__rating::after {
  content: "SERIES 2\\2013 2 \\2022  FINAL MAP \\2022  SOLD OUT";
  display: inline-block;
  font-family: "Chakra Petch", "Trebuchet MS", monospace;
  font-weight: 600;
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  padding: 0.5em 0.8em 0.5em 1.1em;
  color: #7fc0ff;
  border: 1px solid rgba(88, 185, 255, 0.4);
  border-radius: 2px;
}

/* production fine print under the intro card */
.flourish--intro::after {
  content: "main stage \\2022  arena cam 07 \\2022  produced by chat";
  display: var(--esports-scenery, block);
  font-family: "Chakra Petch", "Trebuchet MS", monospace;
  font-weight: 500;
  font-size: 0.62rem;
  letter-spacing: 0.32em;
  padding-left: 0.32em;
  text-transform: lowercase;
  color: rgba(160, 200, 255, 0.42);
}

/* outro: GGs — see you at the next major (copy swap) */
.flourish--outro::before {
  content: "BROADCAST COMPLETE";
  display: var(--esports-scenery, block);
  font-family: "Chakra Petch", "Trebuchet MS", monospace;
  font-weight: 600;
  font-size: 0.66rem;
  letter-spacing: 0.5em;
  padding-left: 0.5em;
  color: var(--gf-blue-lt);
  opacity: 0.8;
}
.flourish--outro .flourish__title { font-size: 0; }
.flourish--outro .flourish__title::after {
  content: "GGs";
  display: inline-block;
  text-transform: none;
  font-family: var(--credits-title-font);
  font-weight: 800;
  font-size: var(--credits-flourish-title-size);
  letter-spacing: 0.04em;
  line-height: 1.05;
  color: #f4f9ff;
  background: linear-gradient(180deg, #ffffff 0%, #f2f9ff 22%, #ddeeff 44%, #bcdcff 62%, #93bef0 82%, #d4e9ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 40px rgba(88, 185, 255, 0.6)) drop-shadow(0 0 14px rgba(150, 205, 255, 0.4)) drop-shadow(0 2px 12px rgba(2, 5, 14, 0.7));
}
.flourish--outro .flourish__tagline { font-size: 0; }
.flourish--outro .flourish__tagline::after {
  content: "see you at the next major";
  font-family: var(--credits-font);
  font-size: 1rem;
  letter-spacing: 0.3em;
  padding-left: 0.3em;
  text-transform: uppercase;
  color: rgba(190, 220, 255, 0.75);
}
.flourish--outro::after {
  content: "\\25A0  STREAM OFFLINE \\2022  VOD SOON";
  display: var(--esports-scenery, block);
  font-family: "Chakra Petch", "Trebuchet MS", monospace;
  font-weight: 600;
  font-size: 0.62rem;
  letter-spacing: 0.4em;
  padding: 0.4em 0.5em 0.4em 0.9em;
  margin-top: 0.5rem;
  color: rgba(160, 200, 255, 0.55);
  border: 1px solid rgba(88, 185, 255, 0.28);
  border-radius: 2px;
}

/* ═══ raid finale: the SERIES MVP gets the gold lower-third. Bar goes
   championship gold with the hot ivory edge, the eyebrow swaps to the MVP
   card and breathes on a steps() glow (~0.55 paints/s — the only animation
   inside the roll, under the 2 paints/s ceiling), names catch the trophy
   light, chips and brackets turn gold. */
.credits-block:nth-last-of-type(2),
.credits-slide:nth-last-of-type(2):not(.flourish) {
  --gf-bar: linear-gradient(105deg, #ffe9ab 0%, #f7c548 42%, #c98f1d 100%);
  --gf-bar-ink: #241703;
  --gf-bar-edge: #fff3cd;
  --gf-bar-glow: rgba(247, 197, 72, 0.38);
}
/* scroll: a tight gold halo that dies inside the block box; slideshow:
   the slide IS the viewport, so the whole arena warms for the MVP. */
.credits-block:nth-last-of-type(2) {
  background: radial-gradient(ellipse 56% 58% at 50% 36%, rgba(247, 197, 72, 0.12), rgba(247, 197, 72, 0) 72%);
}
.credits-slide:nth-last-of-type(2):not(.flourish) {
  background: radial-gradient(ellipse 62% 56% at 50% 46%, rgba(247, 197, 72, 0.11), rgba(247, 197, 72, 0) 80%);
}
.credits-block:nth-last-of-type(2)::before,
.credits-slide:nth-last-of-type(2):not(.flourish)::before {
  content: "\\2605  SERIES MVP \\2014  VOTED BY THE CROWD \\2605";
  color: var(--gf-gold-lt);
  text-shadow: 0 0 16px rgba(255, 205, 110, 0.55), 0 1px 8px rgba(2, 5, 14, 0.8);
  animation: esports-mvp 3.6s steps(1, end) infinite;
}
.credits-block:nth-last-of-type(2) .credits-block__title::after,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::after {
  box-shadow: 0.95em 0 0 rgba(247, 197, 72, 0.5), 1.9em 0 0 rgba(247, 197, 72, 0.2);
}
.credits-block:nth-last-of-type(2) .credit,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit {
  font-size: calc(var(--credits-name-size) * 1.1);
}
.credits-block:nth-last-of-type(2) .credit__name,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__name {
  text-shadow: 0 0 18px rgba(255, 205, 110, 0.4), var(--credits-shadow);
}
.credits-block:nth-last-of-type(2) .credit__name::before,
.credits-block:nth-last-of-type(2) .credit__name::after,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__name::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__name::after {
  border-color: rgba(255, 217, 138, 0.7);
}
.credits-block:nth-last-of-type(2) .credit__amount,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__amount {
  color: #ffe2a6;
  text-shadow: 0 0 10px rgba(255, 205, 110, 0.35);
}
.credits-block:nth-last-of-type(2) .credit__amount::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__amount::before {
  background: rgba(255, 190, 80, 0.12);
  border-color: rgba(255, 217, 138, 0.55);
  box-shadow: inset 0 0 12px rgba(255, 190, 80, 0.12);
}

/* ═══ slideshow: cards wipe in from stage-left like the package's
   transition — small one-shot transform layered on the base fade. */
.credits-slide {
  transform: translate3d(-26px, 0, 0);
  transition: opacity 0.85s ease, transform 0.95s cubic-bezier(0.22, 1, 0.36, 1);
}
.credits-slide.is-active { transform: translate3d(0, 0, 0); }

/* ═══ keyframes (all esports- prefixed; transform/opacity ONLY) ═══ */
/* spidercam: one slow settle along its cables — 6px of drift */
@keyframes esports-cam {
  0%   { transform: translate3d(0, 0, 0) rotate(0deg); }
  50%  { transform: translate3d(4px, 6px, 0) rotate(0.5deg); }
  100% { transform: translate3d(0, 0, 0) rotate(0deg); }
}
/* scissor beams: two narrow spotlights swinging ±7.5° about their truss-lamp
   apexes in OPPOSITE phase, crossing at mid-stage twice per cycle. Both hit
   rotate(0) (the crossed neutral rest angle) at 25%/75%. Transform only. */
@keyframes esports-beam-l {
  0%, 100% { transform: rotate(-7.5deg); }
  50%      { transform: rotate(7.5deg); }
}
@keyframes esports-beam-r {
  0%, 100% { transform: rotate(7.5deg); }
  50%      { transform: rotate(-7.5deg); }
}
/* ticker: one tile-width left per cycle; steps(52) = 2 discrete 23px hops/s.
   -1200px equals exactly one repeat, so the loop seam is invisible. */
@keyframes esports-ticker {
  0%   { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-1200px, 0, 0); }
}
/* MVP eyebrow: two discrete dips per 3.6s — trophy light, not a blink */
@keyframes esports-mvp {
  0%, 50%   { opacity: 1; }
  55%, 72%  { opacity: 0.58; }
  78%, 100% { opacity: 1; }
}
/* crowd camera flashes, set A: two brief pops per 3.2s, held dark between —
   discrete steps() so each is a hard flash, ~0.6 paints/s per set. */
@keyframes esports-flash-a {
  0%, 14%   { opacity: 0; }
  16%, 22%  { opacity: 1; }
  24%, 60%  { opacity: 0; }
  62%, 67%  { opacity: 0.85; }
  69%, 100% { opacity: 0; }
}
/* set B: offset in the cycle so the two sets ripple, never fire together */
@keyframes esports-flash-b {
  0%, 34%   { opacity: 0; }
  36%, 42%  { opacity: 0.9; }
  44%, 80%  { opacity: 0; }
  82%, 87%  { opacity: 1; }
  89%, 100% { opacity: 0; }
}
/* LIVE dot: a steady red breathe/pulse (opacity + scale) */
@keyframes esports-live {
  0%, 100% { opacity: 0.4; transform: scale(0.82); }
  50%      { opacity: 1; transform: scale(1.16); }
}

/* ═══ reduced motion: the arena holds still — the spidercam parks on its
   cables, the rig light freezes mid-cue at low power, the crowd lights
   burn steady, the MVP card rests. */
@media (prefers-reduced-motion: reduce) {
  head::before { animation: none; }
  head title::before { animation: none; }
  head title::after { animation: none; opacity: 0; }
  head link:first-of-type::after { animation: none; opacity: 0; }
  head link:first-of-type::before { animation: none; opacity: 0.8; transform: scale(1); }
  head meta:first-of-type::after { animation: none; transform: rotate(0deg); }
  head meta:last-of-type::after { animation: none; transform: rotate(0deg); }
  .credits-block:nth-last-of-type(2)::before,
  .credits-slide:nth-last-of-type(2):not(.flourish)::before { animation: none; }
  .credits-slide { transform: none; transition: opacity 0.8s ease; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--esports-scenery:none;}",
};
