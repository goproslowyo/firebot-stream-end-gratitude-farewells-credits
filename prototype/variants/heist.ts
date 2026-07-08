import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. The Crew — Heist: the end credits AS the crew reveal. A navy blueprint safehouse wall under one desk lamp; the take's floor plan drafted in white schematic lines; a brushed-steel vault door dead center on the intro card; two red laser tripwires crossing the corners; roles announced like a lineup — THE MODERATORS, THE INSIDERS — and every cut of the take tagged in gold. Finale: THE SCORE. Then the crew disperses. */
export const VARIANT: ThemeVariant = {
  key: "heist",
  name: "The Crew",
  css: `
/* ================================================================
   THE CREW — HEIST — layered after the base theme.
   Fiction: 3AM in the safehouse. The plan is pinned to the wall — a
   navy blueprint of the job, drafted in white schematic lines, lit by
   one hard desk lamp raking down from the upper-left. The vault door
   they're cracking hangs dead center on the intro card: brushed steel,
   a concentric combination dial, eight radial spokes, a spoked handle
   wheel, bolt-work around the rim. Two red laser tripwires cross the
   far corners, humming. The credits ARE the lineup — each section a
   role called out (THE MODERATORS, THE INSIDERS, THE MONEY), each
   name a member of the crew, each cut of the take tagged in gold.
   The raid finale is THE SCORE. Then everyone scatters.
   Layer map (all scenery kill-switched via --heist-scenery):
     html bg (--credits-bg)   blueprint navy — desk-lamp glow upper-left
                              falling to ink at the floor (cheap: 1
                              radial + 1 linear, L3)
     html::before             THE WALL — coarse wide-spaced blueprint
                              grid (>=64px), the job's floor-plan drawn
                              faint upper-right, drafting crosshairs,
                              corner vignette. STATIC, promoted
     html::after              THE LIGHT + laser #1 — desk-lamp cone from
                              upper-left, warm floor pool, one red
                              tripwire raking the lower-LEFT, and the
                              center-lane readability scrim. STATIC, promoted
     body::before             THE VAULT DOOR — hero SVG object, right
                              side: steel volume, dial, spokes, handle
                              wheel, bolts, rim light, cast shadow.
                              STATIC, promoted
     body::after              THE DIAL TELLTALE — the ONE continuous
                              mover: a point of light travelling the
                              vault dial. On body::after so it paints
                              ABOVE the door (will-change budget 1)
     head::before             laser tripwire #2 — SWEEPING beam scanning
                              the right margin (small hung box, transform-
                              only rotation, mover #3)
     title::before            SECURITY CAMERA silhouette watching the
                              desk from the upper-right. STATIC, promoted
     title::after             the camera's blinking REC LED (16px box,
                              steps(1) opacity)
     head::after              THE DUFFEL BAG of cash, lower-left corner,
                              foreground prop. STATIC, promoted
     head meta#1::before      pinned index cards / dossier photos in the
                              far upper-right corner. STATIC
     head meta#1::after       soft cast shadow grounding the dossier
                              against the wall. STATIC
     head meta#2::before      blueprint stamp: TOP SECRET / THE JOB in
                              the lower-left margin. STATIC
     head meta#2::after       drafting-tape corner + a coffee-ring on
                              the plan, lower-center-left. STATIC
     .credits-roll::before    laser-dust / graph paper fine grid — the
     .credits-slideshow::before  ONLY fine pattern, so it RIDES THE ROLL
   ================================================================ */
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Share+Tech+Mono&display=swap');

:root {
  --heist-scenery: block; /* set to none to strip every scenery layer */
  --heist-blue: #0d2340;      /* blueprint navy */
  --heist-blue-lit: #1a3a63;  /* where the lamp grazes the wall */
  --heist-ink: #050c18;       /* floor shadow */
  --heist-line: #cfe2ff;      /* schematic white-blue */
  --heist-gold: #e8b64a;      /* the take */
  --heist-gold-bright: #ffd77a;
  --heist-steel: #9fb2c8;     /* vault steel */
  --heist-red: #ff3b30;       /* laser */
  --heist-paper: #eef4ff;     /* names */

  /* cheap wall: one warm lamp bloom off the upper-left + a 6-stop
     navy fall to ink at the floor. The schematic texture and the hard
     light cone live on the promoted fixed pseudos (L3). */
  --credits-bg:
    radial-gradient(ellipse 52% 42% at 16% 4%, rgba(232, 200, 150, 0.16) 0%, rgba(232, 200, 150, 0.05) 40%, rgba(13, 35, 64, 0) 72%),
    linear-gradient(172deg, #123058 0%, #0f2a4c 20%, #0d2340 42%, #0a1c37 62%, #07142a 82%, #040c1c 100%);
  --credits-color: var(--heist-paper);
  --credits-accent: var(--heist-gold);
  --credits-font: "Oswald", "Bebas Neue", "Helvetica Neue", Arial, sans-serif;
  --credits-title-font: "Playfair Display", Georgia, "Times New Roman", serif;
  --credits-title-size: clamp(1.4rem, 3.4vw, 2.2rem);
  --credits-name-size: clamp(1.05rem, 2.7vw, 1.6rem);
  --credits-flourish-title-size: clamp(2.4rem, 8vw, 5rem);
  --credits-block-gap: 5.25rem;
  --credits-name-gap: 0.62rem;
  --credits-shadow: 0 2px 12px rgba(3, 8, 18, 0.85);
  /* glow no-op — NEVER "none" (a "none" in the composed shadow list
     invalidates the whole declaration); heist glows are bespoke. */
  --credits-glow: 0 0 0 rgba(0, 0, 0, 0);
}

/* Scenery is full-bleed: html drops the base edge-fade; body keeps a
   slightly steeper top ramp so names dissolve before the vault steel. */
html { -webkit-mask-image: none; mask-image: none; }
body {
  background: transparent;
  counter-reset: heist-case;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 14%, #000 88%, transparent 100%);
  mask-image: linear-gradient(to bottom, transparent 0%, #000 14%, #000 88%, transparent 100%);
}

/* ═══ THE WALL — coarse wide-spaced blueprint grid (major rule every
   88px, minor every 88px offset so the lane never meets a fine mesh —
   L6: >=64px cells, low alpha), the job's floor-plan drawn faint in the
   upper-right (rooms, a corridor, a marked vault), drafting crosshairs
   pinned at two anchor points, and a corner vignette so the wall
   swallows its edges. STATIC, promoted. ═══ */
html::before {
  content: "";
  display: var(--heist-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* corner vignette — the room falls to ink at the edges */
    radial-gradient(ellipse 140% 130% at 42% 30%, rgba(4, 10, 22, 0) 56%, rgba(4, 10, 22, 0.6) 100%),
    /* LAMP GRAZE on the plan — the desk lamp rakes across the drafting sheet
       from the upper-left, so the paper reads as physically lit: a warm
       brightening over the plan's top-left falling to a cool ink shadow at
       its lower-right. Confined to the plan box (~2vw..42vw x, ~2vh..34vh y),
       giving the previously-flat wireframe real light hierarchy. */
    linear-gradient(128deg, rgba(255, 232, 178, 0.11) 0%, rgba(255, 224, 164, 0.04) 26%, rgba(24, 44, 74, 0) 52%, rgba(6, 14, 28, 0.16) 80%, rgba(4, 10, 22, 0.24) 100%) 2.4vw 4.5vh / 39vw 29vw no-repeat,
    /* the floor plan, upper-right: a faint drafted schematic (SVG) */
    url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 520 380'><defs><marker id='ah' markerWidth='7' markerHeight='7' refX='6' refY='3.5' orient='auto'><path d='M0 0 L7 3.5 L0 7 Z' fill='%23cfe2ff' fill-opacity='.5'/></marker></defs><g fill='none' stroke='%23cfe2ff'><rect x='36' y='40' width='448' height='288' stroke-width='2.5' stroke-opacity='.34'/><rect x='42' y='46' width='436' height='276' stroke-width='1' stroke-opacity='.16'/></g><g fill='none' stroke='%23cfe2ff' stroke-width='2' stroke-opacity='.26'><path d='M250 40 L250 150 M250 210 L250 328'/><path d='M36 168 L140 168 M200 168 L250 168'/><path d='M250 236 L360 236 M420 236 L484 236'/><path d='M120 40 L120 110 M36 110 L120 110'/></g><g fill='none' stroke='%23cfe2ff' stroke-width='1.4' stroke-opacity='.4'><path d='M250 150 A60 60 0 0 1 190 210'/><path d='M120 110 A34 34 0 0 0 86 76'/><path d='M360 236 A44 44 0 0 1 404 280'/><path d='M250 150 L250 210' stroke-opacity='.28'/></g><g fill='none' stroke='%23cfe2ff'><rect x='330' y='150' width='130' height='120' stroke-width='3' stroke-opacity='.5'/><rect x='336' y='156' width='118' height='108' stroke-width='1' stroke-opacity='.22'/></g><g fill='none' stroke='%23ffd77a' stroke-opacity='.5'><circle cx='395' cy='210' r='30' stroke-width='2'/><circle cx='395' cy='210' r='14' stroke-width='1.2' stroke-opacity='.34'/><path d='M395 176 L395 244 M361 210 L429 210' stroke-width='1' stroke-opacity='.34'/></g><g stroke='%23ffd77a' stroke-width='.8' stroke-opacity='.14'><path d='M296 156 L404 264'/><path d='M306 156 L414 264'/><path d='M316 156 L424 264'/><path d='M326 156 L434 264'/><path d='M336 156 L444 264'/><path d='M346 156 L454 264'/><path d='M356 156 L464 264'/><path d='M366 156 L474 264'/><path d='M376 156 L484 264'/><path d='M386 156 L494 264'/><path d='M396 156 L504 264'/><path d='M406 156 L514 264'/><path d='M416 156 L524 264'/><path d='M426 156 L534 264'/><path d='M436 156 L544 264'/><path d='M446 156 L554 264'/><path d='M456 156 L564 264'/><path d='M466 156 L574 264'/></g><g stroke='%23cfe2ff' stroke-width='1' stroke-opacity='.4'><path d='M36 26 L484 26' marker-start='url(%23ah)' marker-end='url(%23ah)'/><path d='M36 22 L36 44 M484 22 L484 44' stroke-opacity='.26'/><path d='M498 150 L498 270' marker-start='url(%23ah)' marker-end='url(%23ah)'/><path d='M462 150 L502 150 M462 270 L502 270' stroke-opacity='.26'/></g><g font-family='monospace' fill='%23cfe2ff' fill-opacity='.5'><text x='250' y='20' font-size='10' letter-spacing='2' text-anchor='middle'>14.2 m</text><text x='512' y='214' font-size='10' letter-spacing='1' text-anchor='middle' transform='rotate(90 512 214)'>3.6 m</text></g><g font-family='monospace' fill='%23cfe2ff' fill-opacity='.42'><text x='78' y='80' font-size='9' letter-spacing='1.5' text-anchor='middle'>LOBBY</text><text x='140' y='250' font-size='9' letter-spacing='1.5' text-anchor='middle'>FLOOR</text><text x='360' y='118' font-size='9' letter-spacing='1.5' text-anchor='middle'>OFFICE</text></g><text x='395' y='258' font-family='monospace' font-size='11' letter-spacing='3' fill='%23ffd77a' fill-opacity='.62' text-anchor='middle'>VAULT</text><g fill='none' stroke='%23ffd77a' stroke-opacity='.5' stroke-width='1.2'><path d='M425 210 L470 130' stroke-dasharray='4 3'/><circle cx='470' cy='122' r='4'/></g><text x='470' y='112' font-family='monospace' font-size='8' letter-spacing='1' fill='%23ffd77a' fill-opacity='.55' text-anchor='middle'>ENTRY PT</text><g stroke='%23cfe2ff' stroke-opacity='.4' fill='%23cfe2ff' fill-opacity='.4'><path d='M70 300 L70 320' stroke-width='1'/><path d='M70 298 L66 306 L70 303 L74 306 Z'/></g><text x='70' y='334' font-family='monospace' font-size='8' fill='%23cfe2ff' fill-opacity='.4' text-anchor='middle'>N</text><g fill='none' stroke='%23cfe2ff' stroke-opacity='.3' stroke-width='1'><rect x='366' y='296' width='118' height='30'/><path d='M366 310 L484 310 M420 296 L420 326'/></g><g font-family='monospace' fill='%23cfe2ff' fill-opacity='.4'><text x='372' y='306' font-size='7' letter-spacing='1'>PLAN 01</text><text x='372' y='321' font-size='7' letter-spacing='1'>SCALE 1:50</text><text x='426' y='306' font-size='7' letter-spacing='1'>REV C</text><text x='426' y='321' font-size='6' letter-spacing='1'>THE JOB</text></g><g stroke='%23cfe2ff' stroke-opacity='.3' stroke-width='1'><path d='M30 40 L42 40 M36 34 L36 46'/><path d='M478 40 L490 40 M484 34 L484 46'/><path d='M30 328 L42 328 M36 322 L36 334'/><path d='M478 328 L490 328 M484 322 L484 334'/></g></svg>") 2.4vw 4.5vh / 39vw auto no-repeat,
    /* PAPER SUBSTRATE — a faint drafting-sheet under the plan lines so the
       schematic reads as ink on paper pinned to the wall, not floating
       wireframe. A cool blueprint-blue sheet, a touch lighter than the wall,
       lit warmer at the lamp-side corner. Sits BELOW the drafted lines. */
    linear-gradient(128deg, rgba(30, 58, 96, 0.5) 0%, rgba(24, 50, 86, 0.42) 44%, rgba(16, 38, 68, 0.34) 78%, rgba(12, 30, 56, 0.26) 100%) 2.4vw 4.5vh / 39vw 29vw no-repeat,
    /* drafting crosshair pinned lower-left of the wall */
    linear-gradient(90deg, rgba(207, 226, 255, 0) 49.3%, rgba(207, 226, 255, 0.28) 49.3% 50.7%, rgba(207, 226, 255, 0) 50.7%) 12vw 66vh / 46px 46px no-repeat,
    linear-gradient(0deg, rgba(207, 226, 255, 0) 49.3%, rgba(207, 226, 255, 0.28) 49.3% 50.7%, rgba(207, 226, 255, 0) 50.7%) 12vw 66vh / 46px 46px no-repeat,
    /* the blueprint grid — coarse, wide-spaced, low alpha. Major lines
       every 176px, a paler intermediate every 88px. All >= 64px cells. */
    repeating-linear-gradient(0deg, rgba(207, 226, 255, 0.05) 0 1px, rgba(207, 226, 255, 0) 1px 88px),
    repeating-linear-gradient(90deg, rgba(207, 226, 255, 0.05) 0 1px, rgba(207, 226, 255, 0) 1px 88px),
    repeating-linear-gradient(0deg, rgba(207, 226, 255, 0.09) 0 1.5px, rgba(207, 226, 255, 0) 1.5px 176px),
    repeating-linear-gradient(90deg, rgba(207, 226, 255, 0.09) 0 1.5px, rgba(207, 226, 255, 0) 1.5px 176px);
}

/* ═══ THE LIGHT + laser #1 — the desk-lamp cone rakes down from the
   upper-left corner (coarse soft conic wedge, ~7% alpha) with two haze
   layers for volumetric god-ray body, lands in a warm pool on the
   wall's lower-left; ONE red laser tripwire rakes the lower-left corner
   with an emitter node, a hot floor-hit glow, and a soft haze bloom;
   a center readability scrim keeps names off the glow. STATIC, promoted.
   Everything huge and soft — nothing here can flicker on glyphs. ═══ */
html::after {
  content: "";
  display: var(--heist-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* THE ESCAPE ROUTE — a dashed gold path drafted across the floor from
       the vault to the duffel: waypoint chevrons, a start node under the
       door, an X at the getaway end. Faint plan-markings at the masked
       bottom edge, coarse dashes, STATIC. */
    url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 260' preserveAspectRatio='none'><g fill='none' stroke='%23ffd77a' stroke-opacity='.34'><path d='M1580 34 C 1240 150, 760 200, 210 176' stroke-width='2.6' stroke-dasharray='11 13'/></g><g stroke='%23ffd77a' stroke-opacity='.42' stroke-width='2.4' fill='none'><path d='M1122 158 L1104 168 L1122 178'/><path d='M622 186 L604 192 L622 200'/></g><circle cx='1584' cy='32' r='5' fill='none' stroke='%23ffd77a' stroke-opacity='.5' stroke-width='1.6'/><circle cx='1584' cy='32' r='1.8' fill='%23ffd77a' fill-opacity='.55'/><g stroke='%23ff6b62' stroke-opacity='.5' stroke-width='3' stroke-linecap='round'><path d='M196 164 L216 186 M216 164 L196 186'/></g><text x='236' y='158' font-family='monospace' font-size='13' letter-spacing='3' fill='%23ffd77a' fill-opacity='.4'>EXIT</text></svg>") 0 100% / 100% 24vh no-repeat,
    /* center-lane readability scrim — coarse, soft; fades to 0 well before
       the right edge so the vault door keeps its steel. Lives here (not on
       body::after) so body::after is free for the dial telltale, which must
       paint ABOVE the door. */
    linear-gradient(90deg, rgba(5, 12, 24, 0) 8%, rgba(5, 12, 24, 0.42) 28%, rgba(5, 12, 24, 0.5) 48%, rgba(5, 12, 24, 0.38) 64%, rgba(5, 12, 24, 0) 80%),
    /* laser #1 EMITTER node — a small hot pip at the beam origin, upper-left,
       where the tripwire enters the frame (coarse soft dot, off-lane). */
    radial-gradient(circle 7px at 2vw 47vh, rgba(255, 240, 232, 0.95), rgba(255, 96, 86, 0.7) 40%, rgba(255, 59, 48, 0) 75%),
    /* CENTRE STAGE POOL — a soft warm key-pool falling on the desk where the
       lineup is read, so the crawl lane sits IN the lamplight, not floating in
       a void. Very coarse + low alpha (L6-safe), warm to match the lamp. Sits
       ABOVE the scrim so the names read as lit paper on a lit desk. */
    radial-gradient(ellipse 34vw 46vh at 49% 60%, rgba(255, 216, 156, 0.052), rgba(255, 210, 150, 0.018) 52%, rgba(255, 210, 150, 0) 78%),
    /* COOL STEEL BOUNCE — dim cyan fill spilling off the vault door back into
       the mid-right so that half of the frame isn't dead ink; the steel throws
       a cold reflected wash (atmospheric balance, cool vs the warm lamp). */
    radial-gradient(ellipse 30vw 40vh at 84% 52%, rgba(120, 156, 200, 0.07), rgba(90, 130, 180, 0.02) 55%, rgba(90, 130, 180, 0) 80%),
    /* laser #1 FLOOR-HIT glow — the hot pool where the beam strikes the
       lower-left floor (coarse, soft, corner-bound). */
    radial-gradient(ellipse 12vw 7vh at 21vw 92vh, rgba(255, 90, 78, 0.32), rgba(255, 59, 48, 0.08) 55%, rgba(255, 59, 48, 0) 80%),
    /* the lamp source blooming off the top-left corner */
    radial-gradient(ellipse 24vw 18vh at 8% -4%, rgba(255, 224, 168, 0.22), rgba(255, 224, 168, 0) 68%),
    /* the beam: a soft warm wedge from upper-left aimed down the wall */
    conic-gradient(from 118deg at 6% -4%, rgba(255, 226, 170, 0) 0deg, rgba(255, 222, 164, 0.07) 12deg, rgba(255, 216, 150, 0.15) 24deg, rgba(255, 222, 164, 0.07) 36deg, rgba(255, 226, 170, 0) 48deg),
    /* wider ambient haze hugging the beam (god-ray body), now opened to a
       broader wedge so the volumetric light reaches toward centre-stage and
       the mid-frame reads as lit dusty air, not empty navy. */
    conic-gradient(from 108deg at 6% -4%, rgba(255, 224, 168, 0) 0deg, rgba(255, 224, 168, 0.03) 16deg, rgba(255, 224, 168, 0.06) 40deg, rgba(255, 222, 162, 0.038) 66deg, rgba(255, 224, 168, 0) 88deg),
    /* the pool where the lamp light lands, lower-left of the wall */
    radial-gradient(ellipse 30vw 20vh at 22% 74%, rgba(255, 214, 150, 0.09), rgba(255, 214, 150, 0) 72%),
    /* red laser tripwire #1 — a short diagonal beam raking the LOWER-LEFT
       corner, drawn as a rotated gradient BOX (no-repeat) so it lives only
       in that corner and never crosses the reading column. Twin: hot core +
       soft bloom (L6/L9: coarse, soft, corner-bound). */
    linear-gradient(48deg, rgba(255, 59, 48, 0) 45.5%, rgba(255, 59, 48, 0.12) 47.5%, rgba(255, 118, 108, 0.62) 49% 51%, rgba(255, 59, 48, 0.12) 52.5%, rgba(255, 59, 48, 0) 54.5%) -6vw 58vh / 34vw 42vh no-repeat,
    /* laser #1 haze halo hugging the beam so it reads as a beam cutting
       dusty air, not a drawn line (coarse, very soft). */
    linear-gradient(48deg, rgba(255, 70, 60, 0) 42%, rgba(255, 70, 60, 0.07) 50%, rgba(255, 70, 60, 0) 58%) -6vw 58vh / 34vw 42vh no-repeat,
    /* DESK HORIZON — a faint desk-edge line low in the frame: the plan is
       lying ON a surface, so give the scene a ground. A soft brightening band
       where the desk catches the lamp, then the floor falls to ink below it.
       Coarse, off-lane at the bottom. */
    linear-gradient(180deg, rgba(255, 214, 150, 0) 0%, rgba(255, 214, 150, 0.028) 46%, rgba(60, 74, 96, 0.09) 50%, rgba(6, 12, 24, 0.16) 55%, rgba(4, 10, 22, 0) 100%) 0 80vh / 100% 20vh no-repeat,
    /* the floor falls to ink under the lane */
    linear-gradient(180deg, rgba(4, 10, 22, 0) 0%, rgba(4, 10, 22, 0.32) 100%) 0 78vh / 100% 22vh no-repeat;
}

/* ═══ THE VAULT DOOR — hero prop, right side, half-open into the room.
   One SVG data-URI: a round brushed-steel door with a chrome bezel ring
   lit from the upper-left, a concentric combination dial, eight radial
   spokes, a spoked handle wheel at the hub, bolt-work around the frame,
   a bright rim light down the leading edge, and a cast shadow thrown to
   the lower-right away from the lamp. STATIC, promoted — a heavy object
   at rest, not a diagram. ═══ */
body::before {
  content: "";
  display: var(--heist-scenery, block);
  position: fixed;
  right: -3vw;
  top: 48%;
  width: 452px;
  height: 452px;
  margin-top: -226px;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><defs><radialGradient id='amb' cx='42%25' cy='36%25' r='62%25'><stop offset='0' stop-color='%23e8b64a' stop-opacity='.15'/><stop offset='45%25' stop-color='%23e8b64a' stop-opacity='.06'/><stop offset='100%25' stop-color='%23e8b64a' stop-opacity='0'/></radialGradient><radialGradient id='frame' cx='35%25' cy='28%25' r='84%25'><stop offset='0' stop-color='%237d90a9'/><stop offset='.32' stop-color='%234a5c74'/><stop offset='.6' stop-color='%232c3a4f'/><stop offset='.82' stop-color='%231a2536'/><stop offset='1' stop-color='%230e1622'/></radialGradient><linearGradient id='lip' x1='0.16' y1='0.05' x2='0.84' y2='0.95'><stop offset='0' stop-color='%23fbfdff'/><stop offset='.16' stop-color='%23d3e0f0'/><stop offset='.4' stop-color='%238ea1b8'/><stop offset='.6' stop-color='%235d6e84'/><stop offset='.82' stop-color='%23384656'/><stop offset='1' stop-color='%23222f3e'/></linearGradient><radialGradient id='face' cx='36%25' cy='29%25' r='86%25'><stop offset='0' stop-color='%23dde8f4'/><stop offset='.22' stop-color='%23b3c3d7'/><stop offset='.46' stop-color='%23879ab1'/><stop offset='.68' stop-color='%23647689'/><stop offset='.86' stop-color='%23485565'/><stop offset='1' stop-color='%2330404f'/></radialGradient><radialGradient id='facev' cx='50%25' cy='50%25' r='53%25'><stop offset='0' stop-color='%23000000' stop-opacity='0'/><stop offset='.66' stop-color='%23000000' stop-opacity='0'/><stop offset='1' stop-color='%23101a28' stop-opacity='.55'/></radialGradient><linearGradient id='sheen' x1='0' y1='0' x2='1' y2='0.65'><stop offset='0' stop-color='%23ffffff' stop-opacity='0'/><stop offset='.34' stop-color='%23ffffff' stop-opacity='0'/><stop offset='.46' stop-color='%23f2f8ff' stop-opacity='.5'/><stop offset='.52' stop-color='%23ffffff' stop-opacity='.62'/><stop offset='.58' stop-color='%23f2f8ff' stop-opacity='.42'/><stop offset='.72' stop-color='%23ffffff' stop-opacity='0'/><stop offset='1' stop-color='%23ffffff' stop-opacity='0'/></linearGradient><radialGradient id='well' cx='40%25' cy='34%25' r='70%25'><stop offset='0' stop-color='%236b7d94'/><stop offset='.4' stop-color='%23455467'/><stop offset='.74' stop-color='%23283542'/><stop offset='1' stop-color='%23151f2b'/></radialGradient><radialGradient id='dialr' cx='37%25' cy='30%25' r='74%25'><stop offset='0' stop-color='%23eef4fc'/><stop offset='.38' stop-color='%23b6c5d8'/><stop offset='.7' stop-color='%236f8096'/><stop offset='1' stop-color='%23303f50'/></radialGradient><radialGradient id='dialf' cx='39%25' cy='32%25' r='72%25'><stop offset='0' stop-color='%23d3e0f0'/><stop offset='.48' stop-color='%2393a5bb'/><stop offset='1' stop-color='%233f4e61'/></radialGradient><radialGradient id='dialband' cx='40%25' cy='34%25' r='70%25'><stop offset='0' stop-color='%23f4f8fd'/><stop offset='.6' stop-color='%23c8d5e5'/><stop offset='1' stop-color='%238494a8'/></radialGradient><radialGradient id='bolthead' cx='36%25' cy='30%25' r='72%25'><stop offset='0' stop-color='%23f2f7fe'/><stop offset='.3' stop-color='%23c1cfe0'/><stop offset='.6' stop-color='%237c8ea3'/><stop offset='.85' stop-color='%234a5a6d'/><stop offset='1' stop-color='%232c3a4b'/></radialGradient><radialGradient id='rivet' cx='36%25' cy='30%25' r='72%25'><stop offset='0' stop-color='%23c9d6e6'/><stop offset='.34' stop-color='%237e90a6'/><stop offset='.66' stop-color='%234a5a6d'/><stop offset='1' stop-color='%23222f3e'/></radialGradient><linearGradient id='rod' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%232c3a4c'/><stop offset='.28' stop-color='%23c7d5e6'/><stop offset='.5' stop-color='%238a9cb2'/><stop offset='.72' stop-color='%234a5a6d'/><stop offset='1' stop-color='%231e2a39'/></linearGradient><radialGradient id='hub' cx='37%25' cy='30%25' r='76%25'><stop offset='0' stop-color='%23eef4fc'/><stop offset='.36' stop-color='%23b6c6da'/><stop offset='.7' stop-color='%23637489'/><stop offset='1' stop-color='%232a3849'/></radialGradient><radialGradient id='hubcap' cx='38%25' cy='32%25' r='70%25'><stop offset='0' stop-color='%23f4f9ff'/><stop offset='.4' stop-color='%23a9bacf'/><stop offset='1' stop-color='%23273545'/></radialGradient><linearGradient id='wheel' x1='0.18' y1='0.06' x2='0.82' y2='0.94'><stop offset='0' stop-color='%23f2f7fe'/><stop offset='.24' stop-color='%23bccbde'/><stop offset='.5' stop-color='%236f8298'/><stop offset='.76' stop-color='%23394859'/><stop offset='1' stop-color='%235a6a7e'/></linearGradient></defs><ellipse cx='202' cy='206' rx='190' ry='190' fill='url(%23amb)'/><g opacity='.6'><ellipse cx='222' cy='240' rx='176' ry='168' fill='%23030913'/><ellipse cx='214' cy='228' rx='176' ry='170' fill='%23050c18'/></g><circle cx='198' cy='202' r='182' fill='url(%23frame)'/><circle cx='198' cy='202' r='182' fill='none' stroke='%230b131f' stroke-width='2.5'/><path d='M 74 116 A 168 168 0 0 1 280 34' fill='none' stroke='%23c7d6ea' stroke-opacity='.4' stroke-width='4' stroke-linecap='round'/><path d='M 322 288 A 168 168 0 0 1 120 370' fill='none' stroke='%23070d16' stroke-opacity='.5' stroke-width='5' stroke-linecap='round'/><ellipse cx='224.6' cy='39.6' rx='6.5' ry='5.2' fill='%23070d16' opacity='.42'/><circle cx='221.4' cy='35.6' r='7.2' fill='%23141f2e'/><circle cx='221.4' cy='35.6' r='7.2' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='221.4' cy='35.6' r='6.4' fill='url(%23rivet)'/><circle cx='221.4' cy='35.6' r='6.4' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='223.6' cy='37.9' r='4.0' fill='%23070d16' opacity='.34'/><circle cx='219.1' cy='33.1' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='219.1' cy='33.1' r='1.0' fill='%23ffffff' opacity='.98'/><ellipse cx='286.5' cy='61.2' rx='6.5' ry='5.2' fill='%23070d16' opacity='.42'/><circle cx='283.3' cy='57.3' r='7.2' fill='%23141f2e'/><circle cx='283.3' cy='57.3' r='7.2' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='283.3' cy='57.3' r='6.4' fill='url(%23rivet)'/><circle cx='283.3' cy='57.3' r='6.4' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='285.5' cy='59.6' r='4.0' fill='%23070d16' opacity='.34'/><circle cx='281.0' cy='54.7' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='281.0' cy='54.7' r='1.0' fill='%23ffffff' opacity='.98'/><ellipse cx='335.4' cy='104.9' rx='6.5' ry='5.2' fill='%23070d16' opacity='.42'/><circle cx='332.2' cy='100.9' r='7.2' fill='%23141f2e'/><circle cx='332.2' cy='100.9' r='7.2' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='332.2' cy='100.9' r='6.4' fill='url(%23rivet)'/><circle cx='332.2' cy='100.9' r='6.4' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='334.4' cy='103.2' r='4.0' fill='%23070d16' opacity='.34'/><circle cx='329.9' cy='98.4' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='329.9' cy='98.4' r='1.0' fill='%23ffffff' opacity='.98'/><ellipse cx='363.9' cy='164.0' rx='6.5' ry='5.2' fill='%23070d16' opacity='.42'/><circle cx='360.7' cy='160.0' r='7.2' fill='%23141f2e'/><circle cx='360.7' cy='160.0' r='7.2' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='360.7' cy='160.0' r='6.4' fill='url(%23rivet)'/><circle cx='360.7' cy='160.0' r='6.4' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='362.8' cy='162.3' r='4.0' fill='%23070d16' opacity='.34'/><circle cx='358.4' cy='157.4' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='358.4' cy='157.4' r='1.0' fill='%23ffffff' opacity='.98'/><ellipse cx='367.6' cy='229.4' rx='6.5' ry='5.2' fill='%23070d16' opacity='.42'/><circle cx='364.4' cy='225.4' r='7.2' fill='%23141f2e'/><circle cx='364.4' cy='225.4' r='7.2' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='364.4' cy='225.4' r='6.4' fill='url(%23rivet)'/><circle cx='364.4' cy='225.4' r='6.4' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='366.5' cy='227.7' r='4.0' fill='%23070d16' opacity='.34'/><circle cx='362.1' cy='222.9' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='362.1' cy='222.9' r='1.0' fill='%23ffffff' opacity='.98'/><ellipse cx='345.9' cy='291.3' rx='6.5' ry='5.2' fill='%23070d16' opacity='.42'/><circle cx='342.7' cy='287.3' r='7.2' fill='%23141f2e'/><circle cx='342.7' cy='287.3' r='7.2' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='342.7' cy='287.3' r='6.4' fill='url(%23rivet)'/><circle cx='342.7' cy='287.3' r='6.4' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='344.9' cy='289.6' r='4.0' fill='%23070d16' opacity='.34'/><circle cx='340.4' cy='284.8' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='340.4' cy='284.8' r='1.0' fill='%23ffffff' opacity='.98'/><ellipse cx='302.3' cy='340.2' rx='6.5' ry='5.2' fill='%23070d16' opacity='.42'/><circle cx='299.1' cy='336.2' r='7.2' fill='%23141f2e'/><circle cx='299.1' cy='336.2' r='7.2' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='299.1' cy='336.2' r='6.4' fill='url(%23rivet)'/><circle cx='299.1' cy='336.2' r='6.4' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='301.2' cy='338.5' r='4.0' fill='%23070d16' opacity='.34'/><circle cx='296.8' cy='333.6' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='296.8' cy='333.6' r='1.0' fill='%23ffffff' opacity='.98'/><ellipse cx='243.2' cy='368.6' rx='6.5' ry='5.2' fill='%23070d16' opacity='.42'/><circle cx='240.0' cy='364.7' r='7.2' fill='%23141f2e'/><circle cx='240.0' cy='364.7' r='7.2' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='240.0' cy='364.7' r='6.4' fill='url(%23rivet)'/><circle cx='240.0' cy='364.7' r='6.4' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='242.2' cy='367.0' r='4.0' fill='%23070d16' opacity='.34'/><circle cx='237.7' cy='362.1' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='237.7' cy='362.1' r='1.0' fill='%23ffffff' opacity='.98'/><ellipse cx='177.8' cy='372.3' rx='6.5' ry='5.2' fill='%23070d16' opacity='.42'/><circle cx='174.6' cy='368.4' r='7.2' fill='%23141f2e'/><circle cx='174.6' cy='368.4' r='7.2' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='174.6' cy='368.4' r='6.4' fill='url(%23rivet)'/><circle cx='174.6' cy='368.4' r='6.4' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='176.7' cy='370.7' r='4.0' fill='%23070d16' opacity='.34'/><circle cx='172.3' cy='365.8' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='172.3' cy='365.8' r='1.0' fill='%23ffffff' opacity='.98'/><ellipse cx='115.9' cy='350.7' rx='6.5' ry='5.2' fill='%23070d16' opacity='.42'/><circle cx='112.7' cy='346.7' r='7.2' fill='%23141f2e'/><circle cx='112.7' cy='346.7' r='7.2' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='112.7' cy='346.7' r='6.4' fill='url(%23rivet)'/><circle cx='112.7' cy='346.7' r='6.4' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='114.9' cy='349.0' r='4.0' fill='%23070d16' opacity='.34'/><circle cx='110.4' cy='344.2' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='110.4' cy='344.2' r='1.0' fill='%23ffffff' opacity='.98'/><ellipse cx='67.0' cy='307.0' rx='6.5' ry='5.2' fill='%23070d16' opacity='.42'/><circle cx='63.8' cy='303.1' r='7.2' fill='%23141f2e'/><circle cx='63.8' cy='303.1' r='7.2' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='63.8' cy='303.1' r='6.4' fill='url(%23rivet)'/><circle cx='63.8' cy='303.1' r='6.4' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='66.0' cy='305.4' r='4.0' fill='%23070d16' opacity='.34'/><circle cx='61.5' cy='300.5' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='61.5' cy='300.5' r='1.0' fill='%23ffffff' opacity='.98'/><ellipse cx='38.5' cy='248.0' rx='6.5' ry='5.2' fill='%23070d16' opacity='.42'/><circle cx='35.3' cy='244.0' r='7.2' fill='%23141f2e'/><circle cx='35.3' cy='244.0' r='7.2' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='35.3' cy='244.0' r='6.4' fill='url(%23rivet)'/><circle cx='35.3' cy='244.0' r='6.4' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='37.5' cy='246.3' r='4.0' fill='%23070d16' opacity='.34'/><circle cx='33.0' cy='241.4' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='33.0' cy='241.4' r='1.0' fill='%23ffffff' opacity='.98'/><ellipse cx='34.8' cy='182.5' rx='6.5' ry='5.2' fill='%23070d16' opacity='.42'/><circle cx='31.6' cy='178.6' r='7.2' fill='%23141f2e'/><circle cx='31.6' cy='178.6' r='7.2' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='31.6' cy='178.6' r='6.4' fill='url(%23rivet)'/><circle cx='31.6' cy='178.6' r='6.4' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='33.8' cy='180.9' r='4.0' fill='%23070d16' opacity='.34'/><circle cx='29.3' cy='176.0' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='29.3' cy='176.0' r='1.0' fill='%23ffffff' opacity='.98'/><ellipse cx='56.5' cy='120.6' rx='6.5' ry='5.2' fill='%23070d16' opacity='.42'/><circle cx='53.3' cy='116.7' r='7.2' fill='%23141f2e'/><circle cx='53.3' cy='116.7' r='7.2' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='53.3' cy='116.7' r='6.4' fill='url(%23rivet)'/><circle cx='53.3' cy='116.7' r='6.4' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='55.5' cy='119.0' r='4.0' fill='%23070d16' opacity='.34'/><circle cx='51.0' cy='114.1' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='51.0' cy='114.1' r='1.0' fill='%23ffffff' opacity='.98'/><ellipse cx='100.1' cy='71.8' rx='6.5' ry='5.2' fill='%23070d16' opacity='.42'/><circle cx='96.9' cy='67.8' r='7.2' fill='%23141f2e'/><circle cx='96.9' cy='67.8' r='7.2' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='96.9' cy='67.8' r='6.4' fill='url(%23rivet)'/><circle cx='96.9' cy='67.8' r='6.4' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='99.1' cy='70.1' r='4.0' fill='%23070d16' opacity='.34'/><circle cx='94.6' cy='65.2' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='94.6' cy='65.2' r='1.0' fill='%23ffffff' opacity='.98'/><ellipse cx='159.2' cy='43.3' rx='6.5' ry='5.2' fill='%23070d16' opacity='.42'/><circle cx='156.0' cy='39.3' r='7.2' fill='%23141f2e'/><circle cx='156.0' cy='39.3' r='7.2' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='156.0' cy='39.3' r='6.4' fill='url(%23rivet)'/><circle cx='156.0' cy='39.3' r='6.4' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='158.2' cy='41.6' r='4.0' fill='%23070d16' opacity='.34'/><circle cx='153.7' cy='36.8' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='153.7' cy='36.8' r='1.0' fill='%23ffffff' opacity='.98'/><circle cx='198' cy='202' r='158' fill='url(%23lip)'/><path d='M 96 150 A 150 150 0 0 1 276 66' fill='none' stroke='%23ffffff' stroke-opacity='.7' stroke-width='2.4' stroke-linecap='round'/><circle cx='198' cy='202' r='146' fill='none' stroke='%230b1624' stroke-width='3' opacity='.6'/><circle cx='198' cy='202' r='144' fill='url(%23face)'/><g fill='none' stroke='%23cfe0f2' stroke-opacity='.055'><circle cx='198' cy='202' r='24.0'/><circle cx='198' cy='202' r='28.2'/><circle cx='198' cy='202' r='32.4'/><circle cx='198' cy='202' r='36.6'/><circle cx='198' cy='202' r='40.8'/><circle cx='198' cy='202' r='45.0'/><circle cx='198' cy='202' r='49.2'/><circle cx='198' cy='202' r='53.4'/><circle cx='198' cy='202' r='57.6'/><circle cx='198' cy='202' r='61.8'/><circle cx='198' cy='202' r='66.0'/><circle cx='198' cy='202' r='70.2'/><circle cx='198' cy='202' r='74.4'/><circle cx='198' cy='202' r='78.6'/><circle cx='198' cy='202' r='82.8'/><circle cx='198' cy='202' r='87.0'/><circle cx='198' cy='202' r='91.2'/><circle cx='198' cy='202' r='95.4'/><circle cx='198' cy='202' r='99.6'/><circle cx='198' cy='202' r='103.8'/><circle cx='198' cy='202' r='108.0'/><circle cx='198' cy='202' r='112.2'/><circle cx='198' cy='202' r='116.4'/><circle cx='198' cy='202' r='120.6'/><circle cx='198' cy='202' r='124.8'/><circle cx='198' cy='202' r='129.0'/><circle cx='198' cy='202' r='133.2'/><circle cx='198' cy='202' r='137.4'/></g><clipPath id='faceclip'><circle cx='198' cy='202' r='144'/></clipPath><g clip-path='url(%23faceclip)'><rect x='40' y='58' width='150' height='320' fill='url(%23sheen)' transform='rotate(-24 198 202)'/></g><g fill='none' stroke-linecap='round'><path d='M 84 176 A 118 118 0 0 1 244 90' stroke='%23eaf3ff' stroke-opacity='.2' stroke-width='9'/><path d='M 300 150 A 130 130 0 0 1 150 328' stroke='%230c1524' stroke-opacity='.24' stroke-width='10'/></g><circle cx='198' cy='202' r='144' fill='url(%23facev)'/><g fill='none' stroke-linecap='round'><path d='M 62 250 A 143 143 0 0 1 270 76' stroke='%23f7fbff' stroke-opacity='.62' stroke-width='3.4'/><path d='M 334 154 A 143 143 0 0 1 126 328' stroke='%230b1322' stroke-opacity='.55' stroke-width='4.5'/></g><ellipse cx='208.5' cy='86.3' rx='6.7' ry='5.4' fill='%23070d16' opacity='.42'/><circle cx='205.2' cy='82.2' r='7.4' fill='%23141f2e'/><circle cx='205.2' cy='82.2' r='7.4' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='205.2' cy='82.2' r='6.6' fill='url(%23bolthead)'/><circle cx='205.2' cy='82.2' r='6.6' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='207.4' cy='84.6' r='4.1' fill='%23070d16' opacity='.34'/><circle cx='202.8' cy='79.6' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='202.8' cy='79.6' r='1.1' fill='%23ffffff' opacity='.98'/><ellipse cx='249.0' cy='96.0' rx='6.7' ry='5.4' fill='%23070d16' opacity='.42'/><circle cx='245.7' cy='91.9' r='7.4' fill='%23141f2e'/><circle cx='245.7' cy='91.9' r='7.4' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='245.7' cy='91.9' r='6.6' fill='url(%23bolthead)'/><circle cx='245.7' cy='91.9' r='6.6' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='248.0' cy='94.3' r='4.1' fill='%23070d16' opacity='.34'/><circle cx='243.4' cy='89.3' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='243.4' cy='89.3' r='1.1' fill='%23ffffff' opacity='.98'/><ellipse cx='283.8' cy='119.0' rx='6.7' ry='5.4' fill='%23070d16' opacity='.42'/><circle cx='280.5' cy='114.9' r='7.4' fill='%23141f2e'/><circle cx='280.5' cy='114.9' r='7.4' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='280.5' cy='114.9' r='6.6' fill='url(%23bolthead)'/><circle cx='280.5' cy='114.9' r='6.6' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='282.8' cy='117.2' r='4.1' fill='%23070d16' opacity='.34'/><circle cx='278.1' cy='112.2' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='278.1' cy='112.2' r='1.1' fill='%23ffffff' opacity='.98'/><ellipse cx='308.6' cy='152.4' rx='6.7' ry='5.4' fill='%23070d16' opacity='.42'/><circle cx='305.3' cy='148.3' r='7.4' fill='%23141f2e'/><circle cx='305.3' cy='148.3' r='7.4' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='305.3' cy='148.3' r='6.6' fill='url(%23bolthead)'/><circle cx='305.3' cy='148.3' r='6.6' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='307.6' cy='150.7' r='4.1' fill='%23070d16' opacity='.34'/><circle cx='303.0' cy='145.7' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='303.0' cy='145.7' r='1.1' fill='%23ffffff' opacity='.98'/><ellipse cx='320.5' cy='192.4' rx='6.7' ry='5.4' fill='%23070d16' opacity='.42'/><circle cx='317.2' cy='188.3' r='7.4' fill='%23141f2e'/><circle cx='317.2' cy='188.3' r='7.4' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='317.2' cy='188.3' r='6.6' fill='url(%23bolthead)'/><circle cx='317.2' cy='188.3' r='6.6' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='319.5' cy='190.7' r='4.1' fill='%23070d16' opacity='.34'/><circle cx='314.8' cy='185.6' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='314.8' cy='185.6' r='1.1' fill='%23ffffff' opacity='.98'/><ellipse cx='318.0' cy='234.0' rx='6.7' ry='5.4' fill='%23070d16' opacity='.42'/><circle cx='314.7' cy='229.9' r='7.4' fill='%23141f2e'/><circle cx='314.7' cy='229.9' r='7.4' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='314.7' cy='229.9' r='6.6' fill='url(%23bolthead)'/><circle cx='314.7' cy='229.9' r='6.6' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='317.0' cy='232.3' r='4.1' fill='%23070d16' opacity='.34'/><circle cx='312.3' cy='227.2' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='312.3' cy='227.2' r='1.1' fill='%23ffffff' opacity='.98'/><ellipse cx='301.4' cy='272.2' rx='6.7' ry='5.4' fill='%23070d16' opacity='.42'/><circle cx='298.1' cy='268.1' r='7.4' fill='%23141f2e'/><circle cx='298.1' cy='268.1' r='7.4' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='298.1' cy='268.1' r='6.6' fill='url(%23bolthead)'/><circle cx='298.1' cy='268.1' r='6.6' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='300.4' cy='270.5' r='4.1' fill='%23070d16' opacity='.34'/><circle cx='295.8' cy='265.5' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='295.8' cy='265.5' r='1.1' fill='%23ffffff' opacity='.98'/><ellipse cx='272.8' cy='302.5' rx='6.7' ry='5.4' fill='%23070d16' opacity='.42'/><circle cx='269.5' cy='298.4' r='7.4' fill='%23141f2e'/><circle cx='269.5' cy='298.4' r='7.4' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='269.5' cy='298.4' r='6.6' fill='url(%23bolthead)'/><circle cx='269.5' cy='298.4' r='6.6' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='271.7' cy='300.8' r='4.1' fill='%23070d16' opacity='.34'/><circle cx='267.1' cy='295.7' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='267.1' cy='295.7' r='1.1' fill='%23ffffff' opacity='.98'/><ellipse cx='235.5' cy='321.1' rx='6.7' ry='5.4' fill='%23070d16' opacity='.42'/><circle cx='232.2' cy='317.0' r='7.4' fill='%23141f2e'/><circle cx='232.2' cy='317.0' r='7.4' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='232.2' cy='317.0' r='6.6' fill='url(%23bolthead)'/><circle cx='232.2' cy='317.0' r='6.6' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='234.5' cy='319.4' r='4.1' fill='%23070d16' opacity='.34'/><circle cx='229.8' cy='314.4' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='229.8' cy='314.4' r='1.1' fill='%23ffffff' opacity='.98'/><ellipse cx='194.1' cy='325.9' rx='6.7' ry='5.4' fill='%23070d16' opacity='.42'/><circle cx='190.8' cy='321.8' r='7.4' fill='%23141f2e'/><circle cx='190.8' cy='321.8' r='7.4' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='190.8' cy='321.8' r='6.6' fill='url(%23bolthead)'/><circle cx='190.8' cy='321.8' r='6.6' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='193.0' cy='324.2' r='4.1' fill='%23070d16' opacity='.34'/><circle cx='188.4' cy='319.1' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='188.4' cy='319.1' r='1.1' fill='%23ffffff' opacity='.98'/><ellipse cx='153.6' cy='316.2' rx='6.7' ry='5.4' fill='%23070d16' opacity='.42'/><circle cx='150.3' cy='312.1' r='7.4' fill='%23141f2e'/><circle cx='150.3' cy='312.1' r='7.4' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='150.3' cy='312.1' r='6.6' fill='url(%23bolthead)'/><circle cx='150.3' cy='312.1' r='6.6' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='152.5' cy='314.5' r='4.1' fill='%23070d16' opacity='.34'/><circle cx='147.9' cy='309.5' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='147.9' cy='309.5' r='1.1' fill='%23ffffff' opacity='.98'/><ellipse cx='118.8' cy='293.2' rx='6.7' ry='5.4' fill='%23070d16' opacity='.42'/><circle cx='115.5' cy='289.1' r='7.4' fill='%23141f2e'/><circle cx='115.5' cy='289.1' r='7.4' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='115.5' cy='289.1' r='6.6' fill='url(%23bolthead)'/><circle cx='115.5' cy='289.1' r='6.6' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='117.7' cy='291.5' r='4.1' fill='%23070d16' opacity='.34'/><circle cx='113.1' cy='286.5' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='113.1' cy='286.5' r='1.1' fill='%23ffffff' opacity='.98'/><ellipse cx='94.0' cy='259.8' rx='6.7' ry='5.4' fill='%23070d16' opacity='.42'/><circle cx='90.7' cy='255.7' r='7.4' fill='%23141f2e'/><circle cx='90.7' cy='255.7' r='7.4' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='90.7' cy='255.7' r='6.6' fill='url(%23bolthead)'/><circle cx='90.7' cy='255.7' r='6.6' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='92.9' cy='258.0' r='4.1' fill='%23070d16' opacity='.34'/><circle cx='88.3' cy='253.0' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='88.3' cy='253.0' r='1.1' fill='%23ffffff' opacity='.98'/><ellipse cx='82.1' cy='219.8' rx='6.7' ry='5.4' fill='%23070d16' opacity='.42'/><circle cx='78.8' cy='215.7' r='7.4' fill='%23141f2e'/><circle cx='78.8' cy='215.7' r='7.4' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='78.8' cy='215.7' r='6.6' fill='url(%23bolthead)'/><circle cx='78.8' cy='215.7' r='6.6' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='81.0' cy='218.1' r='4.1' fill='%23070d16' opacity='.34'/><circle cx='76.4' cy='213.1' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='76.4' cy='213.1' r='1.1' fill='%23ffffff' opacity='.98'/><ellipse cx='84.6' cy='178.2' rx='6.7' ry='5.4' fill='%23070d16' opacity='.42'/><circle cx='81.3' cy='174.1' r='7.4' fill='%23141f2e'/><circle cx='81.3' cy='174.1' r='7.4' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='81.3' cy='174.1' r='6.6' fill='url(%23bolthead)'/><circle cx='81.3' cy='174.1' r='6.6' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='83.5' cy='176.5' r='4.1' fill='%23070d16' opacity='.34'/><circle cx='78.9' cy='171.5' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='78.9' cy='171.5' r='1.1' fill='%23ffffff' opacity='.98'/><ellipse cx='101.2' cy='140.0' rx='6.7' ry='5.4' fill='%23070d16' opacity='.42'/><circle cx='97.9' cy='135.9' r='7.4' fill='%23141f2e'/><circle cx='97.9' cy='135.9' r='7.4' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='97.9' cy='135.9' r='6.6' fill='url(%23bolthead)'/><circle cx='97.9' cy='135.9' r='6.6' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='100.1' cy='138.3' r='4.1' fill='%23070d16' opacity='.34'/><circle cx='95.5' cy='133.2' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='95.5' cy='133.2' r='1.1' fill='%23ffffff' opacity='.98'/><ellipse cx='129.8' cy='109.7' rx='6.7' ry='5.4' fill='%23070d16' opacity='.42'/><circle cx='126.5' cy='105.6' r='7.4' fill='%23141f2e'/><circle cx='126.5' cy='105.6' r='7.4' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='126.5' cy='105.6' r='6.6' fill='url(%23bolthead)'/><circle cx='126.5' cy='105.6' r='6.6' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='128.8' cy='108.0' r='4.1' fill='%23070d16' opacity='.34'/><circle cx='124.1' cy='103.0' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='124.1' cy='103.0' r='1.1' fill='%23ffffff' opacity='.98'/><ellipse cx='167.1' cy='91.1' rx='6.7' ry='5.4' fill='%23070d16' opacity='.42'/><circle cx='163.8' cy='87.0' r='7.4' fill='%23141f2e'/><circle cx='163.8' cy='87.0' r='7.4' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='163.8' cy='87.0' r='6.6' fill='url(%23bolthead)'/><circle cx='163.8' cy='87.0' r='6.6' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='166.0' cy='89.4' r='4.1' fill='%23070d16' opacity='.34'/><circle cx='161.4' cy='84.3' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='161.4' cy='84.3' r='1.1' fill='%23ffffff' opacity='.98'/><circle cx='198' cy='202' r='104' fill='none' stroke='%23172436' stroke-width='1.4' opacity='.5'/><circle cx='198' cy='202' r='104' fill='none' stroke='%23dbe8f6' stroke-width='.7' stroke-opacity='.14'/><circle cx='198.0' cy='121.0' r='37.0' fill='%230a1220' opacity='.45'/><circle cx='198.0' cy='118.0' r='34.0' fill='url(%23dialr)'/><circle cx='198.0' cy='118.0' r='34.0' fill='none' stroke='%2316263a' stroke-width='1.4'/><g stroke='%231b2b3f' stroke-width='1' stroke-opacity='.7'><path d='M 227.5 118.0 L 231.5 118.0'/><path d='M 227.3 121.1 L 231.3 121.5'/><path d='M 226.9 124.1 L 230.8 125.0'/><path d='M 226.1 127.1 L 229.9 128.4'/><path d='M 224.9 130.0 L 228.6 131.6'/><path d='M 223.5 132.8 L 227.0 134.8'/><path d='M 221.9 135.3 L 225.1 137.7'/><path d='M 219.9 137.7 L 222.9 140.4'/><path d='M 217.7 139.9 L 220.4 142.9'/><path d='M 215.3 141.9 L 217.7 145.1'/><path d='M 212.8 143.5 L 214.8 147.0'/><path d='M 210.0 144.9 L 211.6 148.6'/><path d='M 207.1 146.1 L 208.4 149.9'/><path d='M 204.1 146.9 L 205.0 150.8'/><path d='M 201.1 147.3 L 201.5 151.3'/><path d='M 198.0 147.5 L 198.0 151.5'/><path d='M 194.9 147.3 L 194.5 151.3'/><path d='M 191.9 146.9 L 191.0 150.8'/><path d='M 188.9 146.1 L 187.6 149.9'/><path d='M 186.0 144.9 L 184.4 148.6'/><path d='M 183.3 143.5 L 181.3 147.0'/><path d='M 180.7 141.9 L 178.3 145.1'/><path d='M 178.3 139.9 L 175.6 142.9'/><path d='M 176.1 137.7 L 173.1 140.4'/><path d='M 174.1 135.3 L 170.9 137.7'/><path d='M 172.5 132.8 L 169.0 134.8'/><path d='M 171.1 130.0 L 167.4 131.6'/><path d='M 169.9 127.1 L 166.1 128.4'/><path d='M 169.1 124.1 L 165.2 125.0'/><path d='M 168.7 121.1 L 164.7 121.5'/><path d='M 168.5 118.0 L 164.5 118.0'/><path d='M 168.7 114.9 L 164.7 114.5'/><path d='M 169.1 111.9 L 165.2 111.0'/><path d='M 169.9 108.9 L 166.1 107.6'/><path d='M 171.1 106.0 L 167.4 104.4'/><path d='M 172.5 103.3 L 169.0 101.3'/><path d='M 174.1 100.7 L 170.9 98.3'/><path d='M 176.1 98.3 L 173.1 95.6'/><path d='M 178.3 96.1 L 175.6 93.1'/><path d='M 180.7 94.1 L 178.3 90.9'/><path d='M 183.3 92.5 L 181.3 89.0'/><path d='M 186.0 91.1 L 184.4 87.4'/><path d='M 188.9 89.9 L 187.6 86.1'/><path d='M 191.9 89.1 L 191.0 85.2'/><path d='M 194.9 88.7 L 194.5 84.7'/><path d='M 198.0 88.5 L 198.0 84.5'/><path d='M 201.1 88.7 L 201.5 84.7'/><path d='M 204.1 89.1 L 205.0 85.2'/><path d='M 207.1 89.9 L 208.4 86.1'/><path d='M 210.0 91.1 L 211.6 87.4'/><path d='M 212.8 92.5 L 214.8 89.0'/><path d='M 215.3 94.1 L 217.7 90.9'/><path d='M 217.7 96.1 L 220.4 93.1'/><path d='M 219.9 98.3 L 222.9 95.6'/><path d='M 221.9 100.7 L 225.1 98.3'/><path d='M 223.5 103.2 L 227.0 101.2'/><path d='M 224.9 106.0 L 228.6 104.4'/><path d='M 226.1 108.9 L 229.9 107.6'/><path d='M 226.9 111.9 L 230.8 111.0'/><path d='M 227.3 114.9 L 231.3 114.5'/></g><circle cx='198.0' cy='118.0' r='29.0' fill='url(%23dialband)'/><circle cx='198.0' cy='118.0' r='29.0' fill='none' stroke='%23222f40' stroke-width='.8' stroke-opacity='.5'/><g stroke='%230f1b28' stroke-linecap='round'><path d='M 198.0 94.0 L 198.0 89.5' stroke-width='1.4' stroke-opacity='0.85'/><path d='M 201.8 94.3 L 202.2 91.3' stroke-width='0.7' stroke-opacity='0.5'/><path d='M 205.4 95.2 L 206.3 92.3' stroke-width='0.7' stroke-opacity='0.5'/><path d='M 208.9 96.6 L 210.3 93.9' stroke-width='0.7' stroke-opacity='0.5'/><path d='M 212.1 98.6 L 213.9 96.2' stroke-width='0.7' stroke-opacity='0.5'/><path d='M 215.0 101.0 L 218.2 97.8' stroke-width='1.4' stroke-opacity='0.85'/><path d='M 217.4 103.9 L 219.8 102.1' stroke-width='0.7' stroke-opacity='0.5'/><path d='M 219.4 107.1 L 222.1 105.7' stroke-width='0.7' stroke-opacity='0.5'/><path d='M 220.8 110.6 L 223.7 109.7' stroke-width='0.7' stroke-opacity='0.5'/><path d='M 221.7 114.2 L 224.7 113.8' stroke-width='0.7' stroke-opacity='0.5'/><path d='M 222.0 118.0 L 226.5 118.0' stroke-width='1.4' stroke-opacity='0.85'/><path d='M 221.7 121.8 L 224.7 122.2' stroke-width='0.7' stroke-opacity='0.5'/><path d='M 220.8 125.4 L 223.7 126.3' stroke-width='0.7' stroke-opacity='0.5'/><path d='M 219.4 128.9 L 222.1 130.3' stroke-width='0.7' stroke-opacity='0.5'/><path d='M 217.4 132.1 L 219.8 133.9' stroke-width='0.7' stroke-opacity='0.5'/><path d='M 215.0 135.0 L 218.2 138.2' stroke-width='1.4' stroke-opacity='0.85'/><path d='M 212.1 137.4 L 213.9 139.8' stroke-width='0.7' stroke-opacity='0.5'/><path d='M 208.9 139.4 L 210.3 142.1' stroke-width='0.7' stroke-opacity='0.5'/><path d='M 205.4 140.8 L 206.3 143.7' stroke-width='0.7' stroke-opacity='0.5'/><path d='M 201.8 141.7 L 202.2 144.7' stroke-width='0.7' stroke-opacity='0.5'/><path d='M 198.0 142.0 L 198.0 146.5' stroke-width='1.4' stroke-opacity='0.85'/><path d='M 194.2 141.7 L 193.8 144.7' stroke-width='0.7' stroke-opacity='0.5'/><path d='M 190.6 140.8 L 189.7 143.7' stroke-width='0.7' stroke-opacity='0.5'/><path d='M 187.1 139.4 L 185.7 142.1' stroke-width='0.7' stroke-opacity='0.5'/><path d='M 183.9 137.4 L 182.1 139.8' stroke-width='0.7' stroke-opacity='0.5'/><path d='M 181.0 135.0 L 177.8 138.2' stroke-width='1.4' stroke-opacity='0.85'/><path d='M 178.6 132.1 L 176.2 133.9' stroke-width='0.7' stroke-opacity='0.5'/><path d='M 176.6 128.9 L 173.9 130.3' stroke-width='0.7' stroke-opacity='0.5'/><path d='M 175.2 125.4 L 172.3 126.3' stroke-width='0.7' stroke-opacity='0.5'/><path d='M 174.3 121.8 L 171.3 122.2' stroke-width='0.7' stroke-opacity='0.5'/><path d='M 174.0 118.0 L 169.5 118.0' stroke-width='1.4' stroke-opacity='0.85'/><path d='M 174.3 114.2 L 171.3 113.8' stroke-width='0.7' stroke-opacity='0.5'/><path d='M 175.2 110.6 L 172.3 109.7' stroke-width='0.7' stroke-opacity='0.5'/><path d='M 176.6 107.1 L 173.9 105.7' stroke-width='0.7' stroke-opacity='0.5'/><path d='M 178.6 103.9 L 176.2 102.1' stroke-width='0.7' stroke-opacity='0.5'/><path d='M 181.0 101.0 L 177.8 97.8' stroke-width='1.4' stroke-opacity='0.85'/><path d='M 183.9 98.6 L 182.1 96.2' stroke-width='0.7' stroke-opacity='0.5'/><path d='M 187.1 96.6 L 185.7 93.9' stroke-width='0.7' stroke-opacity='0.5'/><path d='M 190.6 95.2 L 189.7 92.3' stroke-width='0.7' stroke-opacity='0.5'/><path d='M 194.2 94.3 L 193.8 91.3' stroke-width='0.7' stroke-opacity='0.5'/></g><circle cx='198.0' cy='118.0' r='23.0' fill='url(%23dialf)'/><circle cx='198.0' cy='118.0' r='23.0' fill='none' stroke='%2314212f' stroke-width='.8'/><g font-family='monospace' font-weight='bold' fill='%23101c2a' fill-opacity='.85' text-anchor='middle'><text x='198.0' y='97.5' font-size='7'>0</text><text x='223.5' y='120.6' font-size='7'>25</text><text x='198.0' y='146.0' font-size='7'>50</text><text x='172.5' y='120.6' font-size='7'>75</text></g><path d='M 198.0 82.0 L 193.0 73.0 L 203.0 73.0 Z' fill='%23e8b64a'/><path d='M 198.0 82.0 L 193.0 73.0 L 203.0 73.0 Z' fill='none' stroke='%23a97e26' stroke-width='.6'/><path d='M 198.0 80.0 L 196.0 75.5 L 200.0 75.5 Z' fill='%23ffd77a'/><circle cx='198.0' cy='118.0' r='5.5' fill='url(%23hubcap)'/><circle cx='198.0' cy='118.0' r='5.5' fill='none' stroke='%2313202e' stroke-width='.8'/><circle cx='196.2' cy='116.2' r='1.6' fill='%23ffffff' opacity='.85'/><ellipse cx='189.0' cy='109.0' rx='11' ry='6' fill='%23f7fbff' opacity='.24' transform='rotate(-32 189.0 109.0)'/><circle cx='198.0' cy='208.0' r='78.0' fill='%230a1220' opacity='.4'/><circle cx='198.0' cy='202.0' r='76.0' fill='url(%23well)'/><circle cx='198.0' cy='202.0' r='76.0' fill='none' stroke='%230e1826' stroke-width='2.5'/><path d='M 124.0 202.0 A 74 74 0 0 1 272.0 202.0' fill='none' stroke='%23070e19' stroke-opacity='.5' stroke-width='6'/><rect x='179.0' y='155.0' width='42.0' height='13.0' rx='6.5' fill='%23060d17' opacity='.4' transform='rotate(-90.0 200.0 161.5)'/><rect x='177.0' y='152.5' width='42.0' height='13.0' rx='6.5' fill='url(%23rod)' transform='rotate(-90.0 198.0 159.0)'/><rect x='216.2' y='176.5' width='42.0' height='13.0' rx='6.5' fill='%23060d17' opacity='.4' transform='rotate(-30.0 237.2 183.0)'/><rect x='214.2' y='174.0' width='42.0' height='13.0' rx='6.5' fill='url(%23rod)' transform='rotate(-30.0 235.2 180.5)'/><rect x='216.2' y='219.5' width='42.0' height='13.0' rx='6.5' fill='%23060d17' opacity='.4' transform='rotate(30.0 237.2 226.0)'/><rect x='214.2' y='217.0' width='42.0' height='13.0' rx='6.5' fill='url(%23rod)' transform='rotate(30.0 235.2 223.5)'/><rect x='179.0' y='241.0' width='42.0' height='13.0' rx='6.5' fill='%23060d17' opacity='.4' transform='rotate(90.0 200.0 247.5)'/><rect x='177.0' y='238.5' width='42.0' height='13.0' rx='6.5' fill='url(%23rod)' transform='rotate(90.0 198.0 245.0)'/><rect x='141.8' y='219.5' width='42.0' height='13.0' rx='6.5' fill='%23060d17' opacity='.4' transform='rotate(150.0 162.8 226.0)'/><rect x='139.8' y='217.0' width='42.0' height='13.0' rx='6.5' fill='url(%23rod)' transform='rotate(150.0 160.8 223.5)'/><rect x='141.8' y='176.5' width='42.0' height='13.0' rx='6.5' fill='%23060d17' opacity='.4' transform='rotate(210.0 162.8 183.0)'/><rect x='139.8' y='174.0' width='42.0' height='13.0' rx='6.5' fill='url(%23rod)' transform='rotate(210.0 160.8 180.5)'/><circle cx='198.0' cy='202.0' r='66.0' fill='none' stroke='%23101c2c' stroke-width='16'/><circle cx='198.0' cy='202.0' r='66.0' fill='none' stroke='url(%23wheel)' stroke-width='13'/><path d='M 136.0 224.4 A 66.0 66.0 0 0 1 231.0 144.6' fill='none' stroke='%23f7fbff' stroke-opacity='.6' stroke-width='2.6'/><path d='M 257.4 231.0 A 66.0 66.0 0 0 1 175.6 264.0' fill='none' stroke='%230a1220' stroke-opacity='.55' stroke-width='3.4'/><ellipse cx='201.3' cy='140.0' rx='6.6' ry='5.3' fill='%23070d16' opacity='.42'/><circle cx='198.0' cy='136.0' r='7.3' fill='%23141f2e'/><circle cx='198.0' cy='136.0' r='7.3' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='198.0' cy='136.0' r='6.5' fill='url(%23bolthead)'/><circle cx='198.0' cy='136.0' r='6.5' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='200.2' cy='138.3' r='4.0' fill='%23070d16' opacity='.34'/><circle cx='195.7' cy='133.4' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='195.7' cy='133.4' r='1.0' fill='%23ffffff' opacity='.98'/><ellipse cx='258.4' cy='173.0' rx='6.6' ry='5.3' fill='%23070d16' opacity='.42'/><circle cx='255.2' cy='169.0' r='7.3' fill='%23141f2e'/><circle cx='255.2' cy='169.0' r='7.3' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='255.2' cy='169.0' r='6.5' fill='url(%23bolthead)'/><circle cx='255.2' cy='169.0' r='6.5' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='257.4' cy='171.3' r='4.0' fill='%23070d16' opacity='.34'/><circle cx='252.8' cy='166.4' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='252.8' cy='166.4' r='1.0' fill='%23ffffff' opacity='.98'/><ellipse cx='258.4' cy='239.0' rx='6.6' ry='5.3' fill='%23070d16' opacity='.42'/><circle cx='255.2' cy='235.0' r='7.3' fill='%23141f2e'/><circle cx='255.2' cy='235.0' r='7.3' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='255.2' cy='235.0' r='6.5' fill='url(%23bolthead)'/><circle cx='255.2' cy='235.0' r='6.5' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='257.4' cy='237.3' r='4.0' fill='%23070d16' opacity='.34'/><circle cx='252.8' cy='232.4' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='252.8' cy='232.4' r='1.0' fill='%23ffffff' opacity='.98'/><ellipse cx='201.3' cy='272.0' rx='6.6' ry='5.3' fill='%23070d16' opacity='.42'/><circle cx='198.0' cy='268.0' r='7.3' fill='%23141f2e'/><circle cx='198.0' cy='268.0' r='7.3' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='198.0' cy='268.0' r='6.5' fill='url(%23bolthead)'/><circle cx='198.0' cy='268.0' r='6.5' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='200.2' cy='270.3' r='4.0' fill='%23070d16' opacity='.34'/><circle cx='195.7' cy='265.4' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='195.7' cy='265.4' r='1.0' fill='%23ffffff' opacity='.98'/><ellipse cx='144.1' cy='239.0' rx='6.6' ry='5.3' fill='%23070d16' opacity='.42'/><circle cx='140.8' cy='235.0' r='7.3' fill='%23141f2e'/><circle cx='140.8' cy='235.0' r='7.3' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='140.8' cy='235.0' r='6.5' fill='url(%23bolthead)'/><circle cx='140.8' cy='235.0' r='6.5' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='143.1' cy='237.3' r='4.0' fill='%23070d16' opacity='.34'/><circle cx='138.5' cy='232.4' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='138.5' cy='232.4' r='1.0' fill='%23ffffff' opacity='.98'/><ellipse cx='144.1' cy='173.0' rx='6.6' ry='5.3' fill='%23070d16' opacity='.42'/><circle cx='140.8' cy='169.0' r='7.3' fill='%23141f2e'/><circle cx='140.8' cy='169.0' r='7.3' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='140.8' cy='169.0' r='6.5' fill='url(%23bolthead)'/><circle cx='140.8' cy='169.0' r='6.5' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='143.1' cy='171.3' r='4.0' fill='%23070d16' opacity='.34'/><circle cx='138.5' cy='166.4' r='2.2' fill='%23f4f9ff' opacity='.92'/><circle cx='138.5' cy='166.4' r='1.0' fill='%23ffffff' opacity='.98'/><circle cx='198.0' cy='202.0' r='23' fill='url(%23hub)'/><circle cx='198.0' cy='202.0' r='23' fill='none' stroke='%23152232' stroke-width='2'/><ellipse cx='212.3' cy='203.6' rx='2.7' ry='2.1' fill='%23070d16' opacity='.42'/><circle cx='211.0' cy='202.0' r='2.9' fill='%23141f2e'/><circle cx='211.0' cy='202.0' r='2.9' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='211.0' cy='202.0' r='2.6' fill='url(%23rivet)'/><circle cx='211.0' cy='202.0' r='2.6' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='211.9' cy='202.9' r='1.6' fill='%23070d16' opacity='.34'/><circle cx='210.1' cy='201.0' r='0.9' fill='%23f4f9ff' opacity='.92'/><circle cx='210.1' cy='201.0' r='0.4' fill='%23ffffff' opacity='.98'/><ellipse cx='205.8' cy='214.9' rx='2.7' ry='2.1' fill='%23070d16' opacity='.42'/><circle cx='204.5' cy='213.3' r='2.9' fill='%23141f2e'/><circle cx='204.5' cy='213.3' r='2.9' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='204.5' cy='213.3' r='2.6' fill='url(%23rivet)'/><circle cx='204.5' cy='213.3' r='2.6' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='205.4' cy='214.2' r='1.6' fill='%23070d16' opacity='.34'/><circle cx='203.6' cy='212.2' r='0.9' fill='%23f4f9ff' opacity='.92'/><circle cx='203.6' cy='212.2' r='0.4' fill='%23ffffff' opacity='.98'/><ellipse cx='192.8' cy='214.9' rx='2.7' ry='2.1' fill='%23070d16' opacity='.42'/><circle cx='191.5' cy='213.3' r='2.9' fill='%23141f2e'/><circle cx='191.5' cy='213.3' r='2.9' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='191.5' cy='213.3' r='2.6' fill='url(%23rivet)'/><circle cx='191.5' cy='213.3' r='2.6' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='192.4' cy='214.2' r='1.6' fill='%23070d16' opacity='.34'/><circle cx='190.6' cy='212.2' r='0.9' fill='%23f4f9ff' opacity='.92'/><circle cx='190.6' cy='212.2' r='0.4' fill='%23ffffff' opacity='.98'/><ellipse cx='186.3' cy='203.6' rx='2.7' ry='2.1' fill='%23070d16' opacity='.42'/><circle cx='185.0' cy='202.0' r='2.9' fill='%23141f2e'/><circle cx='185.0' cy='202.0' r='2.9' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='185.0' cy='202.0' r='2.6' fill='url(%23rivet)'/><circle cx='185.0' cy='202.0' r='2.6' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='185.9' cy='202.9' r='1.6' fill='%23070d16' opacity='.34'/><circle cx='184.1' cy='201.0' r='0.9' fill='%23f4f9ff' opacity='.92'/><circle cx='184.1' cy='201.0' r='0.4' fill='%23ffffff' opacity='.98'/><ellipse cx='192.8' cy='192.4' rx='2.7' ry='2.1' fill='%23070d16' opacity='.42'/><circle cx='191.5' cy='190.7' r='2.9' fill='%23141f2e'/><circle cx='191.5' cy='190.7' r='2.9' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='191.5' cy='190.7' r='2.6' fill='url(%23rivet)'/><circle cx='191.5' cy='190.7' r='2.6' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='192.4' cy='191.7' r='1.6' fill='%23070d16' opacity='.34'/><circle cx='190.6' cy='189.7' r='0.9' fill='%23f4f9ff' opacity='.92'/><circle cx='190.6' cy='189.7' r='0.4' fill='%23ffffff' opacity='.98'/><ellipse cx='205.8' cy='192.4' rx='2.7' ry='2.1' fill='%23070d16' opacity='.42'/><circle cx='204.5' cy='190.7' r='2.9' fill='%23141f2e'/><circle cx='204.5' cy='190.7' r='2.9' fill='none' stroke='%230a121d' stroke-width='.8'/><circle cx='204.5' cy='190.7' r='2.6' fill='url(%23rivet)'/><circle cx='204.5' cy='190.7' r='2.6' fill='none' stroke='%230c1622' stroke-width='.7' stroke-opacity='.7'/><circle cx='205.4' cy='191.7' r='1.6' fill='%23070d16' opacity='.34'/><circle cx='203.6' cy='189.7' r='0.9' fill='%23f4f9ff' opacity='.92'/><circle cx='203.6' cy='189.7' r='0.4' fill='%23ffffff' opacity='.98'/><circle cx='198.0' cy='202.0' r='7.5' fill='url(%23hubcap)'/><circle cx='198.0' cy='202.0' r='7.5' fill='none' stroke='%2313202e' stroke-width='.9'/><circle cx='195.6' cy='199.6' r='2.4' fill='%23ffffff' opacity='.8'/><ellipse cx='190.0' cy='194.0' rx='9' ry='5' fill='%23f7fbff' opacity='.3' transform='rotate(-32 190.0 194.0)'/></svg>");
}

/* ═══ THE DIAL TELLTALE — the ONE continuous mover. A bright point of
   light travels the vault's COMBINATION DIAL as the crew works the
   number, riding the knurled ring where it pops against the steel.
   Lives on body::after so it paints ABOVE the door (body::before): head
   pseudos paint before body in DOM order, so a head-anchored glint would
   be occluded by the door. Small element, its own promoted layer
   (will-change: transform) — L2 small-mover budget: 1. Welded to the
   dial center: the door is right:-3vw / width 452 / centred at top:48%,
   so its centre sits 226px left of that anchor; the dial rides ~86px
   above the door centre (viewBox 198,124 in a 400→452 box), so the
   orbit box is centred there and the glint rings the dial groove. ═══ */
body::after {
  content: "";
  display: var(--heist-scenery, block);
  position: fixed;
  right: calc(-3vw + 226px - 39px + 2px);
  top: calc(48% - 93px);
  width: 78px;
  height: 78px;
  margin-top: -39px;
  z-index: 0;
  pointer-events: none;
  opacity: 1;
  background:
    /* wide soft amber bloom (the dial glows where the finger works it) */
    radial-gradient(circle 15px at 50% 6%, rgba(255, 206, 120, 0.55), rgba(255, 200, 110, 0.16) 44%, rgba(255, 200, 110, 0) 74%),
    /* hot core */
    radial-gradient(circle 9px at 50% 6%, rgba(255, 224, 150, 0.95), rgba(255, 214, 120, 0.3) 42%, rgba(255, 214, 120, 0) 74%),
    /* specular pip */
    radial-gradient(circle 3.5px at 50% 6%, rgba(255, 255, 250, 1), rgba(255, 253, 244, 0) 100%);
  transform-origin: 50% 50%;
  will-change: transform;
  animation: heist-dial 9s linear infinite;
}

/* ═══ THE GLEAM — static specular shine welded to the vault door. The
   door SVG (body::before) is superbly modelled but reads matte pewter:
   its brightest steel tops out mid-grey, so the hero object never catches
   the desk lamp. This layer bakes the missing HOT specular: a blown
   highlight where the lamp kisses the bezel upper-left, a bright crescent
   glinting off the dial ring, a chrome pop on the spoke hub, and a thin
   hot rim running the door's leading (lamp-side) edge. All STATIC, all on
   the right side well OFF the centre text lane — L6-safe (static specular
   on a prop is always legal), coarse-soft radii >=40px. Welded to the same
   box as body::before so it tracks the door exactly; z:-1 sits just above
   the door face, below the dial telltale (z:0). ═══ */
link::before {
  content: "";
  display: var(--heist-scenery, block);
  position: fixed;
  right: -3vw;
  top: 48%;
  width: 452px;
  height: 452px;
  margin-top: -226px;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  mix-blend-mode: screen;
  background:
    /* ── SPARKLE STARS (baked static specular on the steel = L6-d safe). A
       four-point lens star: a hot round core + a crossed pair of thin soft
       bright bars, each confined to its own tiny no-repeat box on a polished
       hit point. Static, screen-blended, on the door far off the lane. ── */
    /* star A — the brightest bezel bolt, upper-left (lamp side) */
    radial-gradient(circle 3px at 50% 50%, rgba(255,255,255,0.98), rgba(230,242,255,0) 100%) 30% 20% / 30px 30px no-repeat,
    linear-gradient(0deg, rgba(255,255,255,0) 46%, rgba(240,248,255,0.85) 50%, rgba(255,255,255,0) 54%) 30% 20% / 4px 34px no-repeat,
    linear-gradient(90deg, rgba(255,255,255,0) 46%, rgba(240,248,255,0.85) 50%, rgba(255,255,255,0) 54%) 30% 20% / 34px 4px no-repeat,
    /* star B — a dial-ring bolt catching the lamp, upper-centre */
    radial-gradient(circle 2.4px at 50% 50%, rgba(255,255,255,0.95), rgba(230,242,255,0) 100%) 52% 20% / 24px 24px no-repeat,
    linear-gradient(0deg, rgba(255,255,255,0) 46%, rgba(240,248,255,0.75) 50%, rgba(255,255,255,0) 54%) 52% 20% / 3px 26px no-repeat,
    linear-gradient(90deg, rgba(255,255,255,0) 46%, rgba(240,248,255,0.75) 50%, rgba(255,255,255,0) 54%) 52% 20% / 26px 3px no-repeat,
    /* star C — a small twinkle on the spoke hub centre */
    radial-gradient(circle 2px at 50% 50%, rgba(255,255,255,0.9), rgba(230,242,255,0) 100%) 47% 53% / 20px 20px no-repeat,
    linear-gradient(0deg, rgba(255,255,255,0) 44%, rgba(240,248,255,0.6) 50%, rgba(255,255,255,0) 56%) 47% 53% / 3px 20px no-repeat,
    linear-gradient(90deg, rgba(255,255,255,0) 44%, rgba(240,248,255,0.6) 50%, rgba(255,255,255,0) 56%) 47% 53% / 20px 3px no-repeat,
    /* ── SPECULAR HIGHLIGHTS (coarse soft blobs, the material key light) ── */
    /* HOT bezel specular — the lamp blows out the brushed-steel bezel at
       the upper-left of the ring (the key highlight, hot + tight core). */
    radial-gradient(ellipse 15% 11% at 31% 21%, rgba(255, 253, 247, 1), rgba(226, 238, 255, 0.45) 40%, rgba(200, 224, 255, 0) 72%),
    /* a second smaller cooler specular a touch down the bezel curve so the
       highlight wraps the round volume, not a single dot. */
    radial-gradient(ellipse 10% 8% at 23% 39%, rgba(232, 244, 255, 0.55), rgba(200, 224, 255, 0) 74%),
    /* dial-ring glint — a bright tight crescent on the knurled combo ring. */
    radial-gradient(ellipse 7% 5% at 47% 25%, rgba(255, 251, 242, 0.85), rgba(220, 236, 255, 0) 78%),
    /* spoke-hub chrome pop — a hot kiss on the polished handle hub. */
    radial-gradient(ellipse 6% 6% at 47% 52%, rgba(250, 252, 255, 0.7), rgba(210, 230, 255, 0) 80%),
    /* thin HOT rim down the door's leading (lamp-side) edge — a bright
       crescent hugging the upper-left rim of the round frame. */
    radial-gradient(circle at 50% 50%, rgba(240, 248, 255, 0) 45.5%, rgba(240, 248, 255, 0.5) 47.5%, rgba(240, 248, 255, 0) 49.5%) -28% -8% / 78% 78% no-repeat,
    /* broad cool ambient bloom off the whole door so the steel glows into
       the surrounding air (kills the hard clip-art edge). */
    radial-gradient(ellipse 60% 58% at 50% 46%, rgba(150, 186, 230, 0.11), rgba(120, 160, 210, 0) 72%);
}

/* ═══ THE MID-GROUND — kills the dead navy void between the text lane and
   the vault door, and across the lower-centre. The original scene had crisp
   props at the four corners and a black hole in the middle. This layer adds
   the atmospheric connective tissue a real lit room has: a broad warm dust
   haze bridging the lamp-cone toward the door (the air between them is lit,
   not empty), a defined COOL steel-bounce wash the door throws back into the
   mid-right, a soft warm desk light-pool the lineup sits in, and a low floor
   sheen so the bottom third isn't a flat black band. Everything huge (>=30vw)
   and low-alpha — pure atmosphere, no edges, L6-safe, cannot flicker. z:-1
   above the wall, below the props. STATIC, promoted. ═══ */
link::after {
  content: "";
  display: var(--heist-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* warm dust bridge — the lamp's lit air reaching across the mid-frame
       toward the door, so the centre isn't a void between two lit corners. */
    radial-gradient(ellipse 46vw 34vh at 40% 40%, rgba(255, 218, 158, 0.05), rgba(255, 214, 150, 0.016) 54%, rgba(255, 214, 150, 0) 80%),
    /* COOL steel bounce — the door throws a cold reflected wash back into the
       mid-right so that half the frame reads as lit metal light, not ink. */
    radial-gradient(ellipse 34vw 44vh at 74% 50%, rgba(126, 166, 214, 0.11), rgba(96, 138, 190, 0.03) 52%, rgba(96, 138, 190, 0) 80%),
    /* a soft cyan rim of that bounce hugging the door's inner edge */
    radial-gradient(ellipse 16vw 30vh at 88% 50%, rgba(150, 190, 236, 0.09), rgba(120, 160, 210, 0) 70%),
    /* warm desk light-pool the lineup is read in (centre-lane, very low
       alpha so it lifts the names off the void without touching contrast). */
    radial-gradient(ellipse 30vw 42vh at 50% 56%, rgba(255, 220, 162, 0.045), rgba(255, 214, 150, 0) 76%),
    /* low floor sheen — a faint warm-to-cool graze along the bottom so the
       lower third has a surface, not a flat black cutoff. */
    radial-gradient(ellipse 70vw 22vh at 44% 96%, rgba(120, 150, 196, 0.06), rgba(90, 124, 172, 0) 74%);
}

/* the head void-elements render nothing but their fixed pseudos are
   free canvases (L7 kill-switch on head itself too). link/title carry
   the UA's display:none, so they must be re-displayed for their pseudos
   (the gleam + mid-ground layers) to paint at all; title gets font-size
   0 so the document title's text node never renders. */
head { display: var(--heist-scenery, block); }
head meta { display: var(--heist-scenery, block); }
head link { display: var(--heist-scenery, block); }
head title { display: var(--heist-scenery, block); font-size: 0; color: transparent; }

/* ═══ THE SECURITY CAMERA — a wall-mounted camera hangs off the ceiling
   between the lane and the dossier, hooded lens aimed down at the desk.
   Dark steel silhouette, a warm lamp-side rim, a drooping cable back
   into the wall. STATIC, promoted (its LED blinks separately below). ═══ */
head title::before {
  content: "";
  display: var(--heist-scenery, block);
  position: fixed;
  right: 19vw;
  top: 0;
  width: 190px;
  height: 150px;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  background-repeat: no-repeat;
  background-position: center top;
  background-size: contain;
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 190 150'><defs><linearGradient id='cam' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%232e405a'/><stop offset='.4' stop-color='%231b2c44'/><stop offset='1' stop-color='%230a1626'/></linearGradient><linearGradient id='camtop' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='%23ffd9a8' stop-opacity='.5'/><stop offset='1' stop-color='%237d94b4' stop-opacity='.25'/></linearGradient><radialGradient id='lens' cx='40%25' cy='38%25' r='70%25'><stop offset='0' stop-color='%232c4866'/><stop offset='.5' stop-color='%23101f32'/><stop offset='1' stop-color='%23040910'/></radialGradient></defs><!-- ceiling mount plate + stem + joint --><rect x='88' y='0' width='40' height='8' rx='2' fill='%231a2c44' stroke='%23405a7c' stroke-opacity='.5' stroke-width='1'/><rect x='104' y='6' width='8' height='28' rx='3' fill='url(%23cam)'/><circle cx='108' cy='40' r='8' fill='%23223650'/><circle cx='105' cy='37' r='2.4' fill='%237d94b4' opacity='.6'/><!-- arm down to the housing --><path d='M108 44 L96 62' stroke='%231b2c44' stroke-width='7' stroke-linecap='round'/><!-- housing, angled down-left --><g transform='rotate(-22 92 88)'><rect x='42' y='72' width='96' height='36' rx='7' fill='url(%23cam)'/><path d='M48 73 L132 73' stroke='url(%23camtop)' stroke-width='2.4' stroke-linecap='round'/><!-- lens hood --><path d='M42 76 L28 80 L28 102 L42 106 Z' fill='%23101f32'/><path d='M28 80 L28 102' stroke='%23405a7c' stroke-opacity='.5' stroke-width='1.4'/><!-- lens --><circle cx='40' cy='91' r='11' fill='url(%23lens)'/><circle cx='40' cy='91' r='11' fill='none' stroke='%233b5878' stroke-width='1.6'/><circle cx='36.5' cy='87' r='2.6' fill='%23aac8e8' opacity='.75'/><!-- housing vents + screw --><g stroke='%23081222' stroke-width='2' opacity='.8'><path d='M96 82 L124 82 M96 88 L124 88 M96 94 L124 94'/></g><circle cx='130' cy='102' r='2' fill='%23405a7c'/><!-- warm floor-side underlight kiss --><path d='M50 108 L120 108' stroke='%23233a56' stroke-width='2' stroke-linecap='round'/></g><!-- cable drooping from the rear into the wall --><path d='M132 74 Q158 84 160 118 Q160.6 132 172 138' fill='none' stroke='%23132238' stroke-width='2.6' stroke-linecap='round'/><path d='M132 74 Q158 84 160 118' fill='none' stroke='%233b5878' stroke-width='1' stroke-linecap='round' opacity='.4'/></svg>");
}

/* ═══ the camera's REC telltale — a tiny red LED on the housing's rear
   shoulder, blinking once every 2.6s (steps(1): ~0.8 paints/s on a
   16px box — negligible). The only pixels that animate here. ═══ */
head title::after {
  content: "";
  display: var(--heist-scenery, block);
  position: fixed;
  right: calc(19vw + 60px);
  top: 54px;
  width: 16px;
  height: 16px;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(circle 7px at 50% 50%, rgba(255, 96, 86, 0.85), rgba(255, 59, 48, 0.25) 55%, rgba(255, 59, 48, 0) 80%),
    radial-gradient(circle 2.6px at 50% 50%, rgba(255, 214, 208, 1), rgba(255, 120, 110, 0.6) 60%, rgba(255, 59, 48, 0) 100%);
  animation: heist-led 2.6s steps(1, end) infinite;
}

/* ═══ THE FLASHLIGHT — the money beat. The heist is IN PROGRESS: a crew
   member is scanning the plan RIGHT NOW. A cool-white torch cone rakes across
   the blueprint in the upper band, its bright pool travelling over the drafted
   floor-plan and revealing detail as it passes. Cool white so it reads as a
   handheld LED torch, distinct from the warm tungsten desk lamp. Lives in the
   TOP ~40vh, well ABOVE the centre name lane (which crawls lower) so it never
   touches a glyph. transform-only translateX, 13s ease alternate (it dwells at
   the ends, as if pausing on a detail). Continuous mover (will-change budget:
   dial telltale + this + the base roll). ═══ */
head::before {
  content: "";
  display: var(--heist-scenery, block);
  position: fixed;
  left: -6vw;
  top: -8vh;
  width: 44vw;
  height: 46vh;
  z-index: -1;
  pointer-events: none;
  will-change: transform;
  animation: heist-flashlight 13s ease-in-out infinite alternate;
  background:
    /* the torch beam: a cool-white soft cone thrown from the hand, upper-left */
    conic-gradient(from 128deg at 16% 2%, rgba(206, 226, 255, 0) 0deg, rgba(210, 230, 255, 0.05) 9deg, rgba(226, 240, 255, 0.14) 19deg, rgba(210, 230, 255, 0.05) 29deg, rgba(206, 226, 255, 0) 38deg),
    /* wider haze hugging the beam (torch throw catching dust in the air) */
    conic-gradient(from 120deg at 16% 2%, rgba(200, 222, 255, 0) 0deg, rgba(200, 222, 255, 0.03) 14deg, rgba(200, 222, 255, 0.06) 34deg, rgba(200, 222, 255, 0.03) 54deg, rgba(200, 222, 255, 0) 72deg),
    /* the hot pool where the torch lands on the drafting paper */
    radial-gradient(ellipse 12vw 9vh at 52% 62%, rgba(238, 246, 255, 0.22), rgba(224, 238, 255, 0.08) 46%, rgba(210, 230, 255, 0) 76%),
    /* a small blown core inside the pool (the torch's hotspot) */
    radial-gradient(ellipse 5vw 4vh at 52% 62%, rgba(255, 255, 255, 0.26), rgba(238, 246, 255, 0) 74%);
}

/* ═══ THE DUFFEL BAG — the take, slumped in the lower-left foreground.
   A dark canvas holdall, gold rim light on the lamp-side, banded straps,
   and a few bundles of cash spilling from the open mouth. STATIC,
   promoted, z:0 = foreground (paints over the wall). ═══ */
head::after {
  content: "";
  display: var(--heist-scenery, block);
  position: fixed;
  left: 1.5vw;
  bottom: 1vh;
  width: 350px;
  height: 206px;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  background-repeat: no-repeat;
  background-position: left bottom;
  background-size: contain;
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 340 200'><defs><radialGradient id='bag' cx='34%25' cy='24%25' r='96%25'><stop offset='0' stop-color='%233c4f66'/><stop offset='.3' stop-color='%23293a4f'/><stop offset='.62' stop-color='%23172636'/><stop offset='1' stop-color='%2308111d'/></radialGradient><linearGradient id='bagtop' x1='0.1' y1='0' x2='0.4' y2='1'><stop offset='0' stop-color='%235b7089'/><stop offset='1' stop-color='%231a2a3b'/></linearGradient><linearGradient id='mouth' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%23060d18'/><stop offset='1' stop-color='%2311202f'/></linearGradient><linearGradient id='cash' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%23d6efd7'/><stop offset='.5' stop-color='%2396cc9d'/><stop offset='1' stop-color='%2361996b'/></linearGradient><linearGradient id='cashside' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%2384bd8e'/><stop offset='1' stop-color='%23497f54'/></linearGradient></defs><ellipse cx='140' cy='188' rx='132' ry='15' fill='%23030a14' opacity='.62'/><ellipse cx='140' cy='190' rx='96' ry='8' fill='%23020810' opacity='.5'/><g transform='rotate(-9.0 96.0 40.0)'><rect x='81.0' y='48.0' width='30.0' height='6' rx='1' fill='url(%23cashside)'/><path d='M 81.0 49.2 L 111.0 49.2' stroke='%234f8259' stroke-width='.5' stroke-opacity='.6'/><path d='M 81.0 50.4 L 111.0 50.4' stroke='%234f8259' stroke-width='.5' stroke-opacity='.6'/><path d='M 81.0 51.6 L 111.0 51.6' stroke='%234f8259' stroke-width='.5' stroke-opacity='.6'/><path d='M 81.0 52.8 L 111.0 52.8' stroke='%234f8259' stroke-width='.5' stroke-opacity='.6'/><rect x='81.0' y='32.0' width='30.0' height='16.0' rx='1.5' fill='url(%23cash)'/><rect x='81.0' y='32.0' width='30.0' height='16.0' rx='1.5' fill='none' stroke='%234f8259' stroke-opacity='.5' stroke-width='.7'/><rect x='80.0' y='37.4' width='32.0' height='5.4' fill='%23e8b64a' fill-opacity='.88'/><rect x='80.0' y='37.4' width='32.0' height='5.4' fill='none' stroke='%23a97e26' stroke-width='.4' stroke-opacity='.6'/><rect x='80.0' y='37.4' width='32.0' height='1.9' fill='%23fff0cc' fill-opacity='.4'/><circle cx='96.0' cy='36.0' r='2.2' fill='%234f8259' fill-opacity='.5'/><path d='M 81.0 32.0 L 81.0 48.0' stroke='%23eaffe9' stroke-opacity='.5' stroke-width='.8'/></g><g transform='rotate(8.0 146.0 34.0)'><rect x='131.0' y='42.0' width='30.0' height='6' rx='1' fill='url(%23cashside)'/><path d='M 131.0 43.2 L 161.0 43.2' stroke='%234f8259' stroke-width='.5' stroke-opacity='.6'/><path d='M 131.0 44.4 L 161.0 44.4' stroke='%234f8259' stroke-width='.5' stroke-opacity='.6'/><path d='M 131.0 45.6 L 161.0 45.6' stroke='%234f8259' stroke-width='.5' stroke-opacity='.6'/><path d='M 131.0 46.8 L 161.0 46.8' stroke='%234f8259' stroke-width='.5' stroke-opacity='.6'/><rect x='131.0' y='26.0' width='30.0' height='16.0' rx='1.5' fill='url(%23cash)'/><rect x='131.0' y='26.0' width='30.0' height='16.0' rx='1.5' fill='none' stroke='%234f8259' stroke-opacity='.5' stroke-width='.7'/><rect x='130.0' y='31.4' width='32.0' height='5.4' fill='%23e8b64a' fill-opacity='.88'/><rect x='130.0' y='31.4' width='32.0' height='5.4' fill='none' stroke='%23a97e26' stroke-width='.4' stroke-opacity='.6'/><rect x='130.0' y='31.4' width='32.0' height='1.9' fill='%23fff0cc' fill-opacity='.4'/><circle cx='146.0' cy='30.0' r='2.2' fill='%234f8259' fill-opacity='.5'/><path d='M 131.0 26.0 L 131.0 42.0' stroke='%23eaffe9' stroke-opacity='.5' stroke-width='.8'/></g><g transform='rotate(-17.0 80.0 46.0)'><rect x='67.0' y='53.0' width='26.0' height='6' rx='1' fill='url(%23cashside)'/><path d='M 67.0 54.2 L 93.0 54.2' stroke='%234f8259' stroke-width='.5' stroke-opacity='.6'/><path d='M 67.0 55.4 L 93.0 55.4' stroke='%234f8259' stroke-width='.5' stroke-opacity='.6'/><path d='M 67.0 56.6 L 93.0 56.6' stroke='%234f8259' stroke-width='.5' stroke-opacity='.6'/><path d='M 67.0 57.8 L 93.0 57.8' stroke='%234f8259' stroke-width='.5' stroke-opacity='.6'/><rect x='67.0' y='39.0' width='26.0' height='14.0' rx='1.5' fill='url(%23cash)'/><rect x='67.0' y='39.0' width='26.0' height='14.0' rx='1.5' fill='none' stroke='%234f8259' stroke-opacity='.5' stroke-width='.7'/><rect x='66.0' y='43.8' width='28.0' height='4.8' fill='%23e8b64a' fill-opacity='.88'/><rect x='66.0' y='43.8' width='28.0' height='4.8' fill='none' stroke='%23a97e26' stroke-width='.4' stroke-opacity='.6'/><rect x='66.0' y='43.8' width='28.0' height='1.7' fill='%23fff0cc' fill-opacity='.4'/><circle cx='80.0' cy='43.0' r='2.2' fill='%234f8259' fill-opacity='.5'/><path d='M 67.0 39.0 L 67.0 53.0' stroke='%23eaffe9' stroke-opacity='.5' stroke-width='.8'/></g><g transform='rotate(15.0 166.0 46.0)'><rect x='154.0' y='52.0' width='24.0' height='6' rx='1' fill='url(%23cashside)'/><path d='M 154.0 53.2 L 178.0 53.2' stroke='%234f8259' stroke-width='.5' stroke-opacity='.6'/><path d='M 154.0 54.4 L 178.0 54.4' stroke='%234f8259' stroke-width='.5' stroke-opacity='.6'/><path d='M 154.0 55.6 L 178.0 55.6' stroke='%234f8259' stroke-width='.5' stroke-opacity='.6'/><path d='M 154.0 56.8 L 178.0 56.8' stroke='%234f8259' stroke-width='.5' stroke-opacity='.6'/><rect x='154.0' y='40.0' width='24.0' height='12.0' rx='1.5' fill='url(%23cash)'/><rect x='154.0' y='40.0' width='24.0' height='12.0' rx='1.5' fill='none' stroke='%234f8259' stroke-opacity='.5' stroke-width='.7'/><rect x='153.0' y='44.1' width='26.0' height='4.1' fill='%23e8b64a' fill-opacity='.88'/><rect x='153.0' y='44.1' width='26.0' height='4.1' fill='none' stroke='%23a97e26' stroke-width='.4' stroke-opacity='.6'/><rect x='153.0' y='44.1' width='26.0' height='1.4' fill='%23fff0cc' fill-opacity='.4'/><circle cx='166.0' cy='44.0' r='2.2' fill='%234f8259' fill-opacity='.5'/><path d='M 154.0 40.0 L 154.0 52.0' stroke='%23eaffe9' stroke-opacity='.5' stroke-width='.8'/></g><g transform='rotate(-2.0 122.0 30.0)'><rect x='108.0' y='37.5' width='28.0' height='6' rx='1' fill='url(%23cashside)'/><path d='M 108.0 38.7 L 136.0 38.7' stroke='%234f8259' stroke-width='.5' stroke-opacity='.6'/><path d='M 108.0 39.9 L 136.0 39.9' stroke='%234f8259' stroke-width='.5' stroke-opacity='.6'/><path d='M 108.0 41.1 L 136.0 41.1' stroke='%234f8259' stroke-width='.5' stroke-opacity='.6'/><path d='M 108.0 42.3 L 136.0 42.3' stroke='%234f8259' stroke-width='.5' stroke-opacity='.6'/><rect x='108.0' y='22.5' width='28.0' height='15.0' rx='1.5' fill='url(%23cash)'/><rect x='108.0' y='22.5' width='28.0' height='15.0' rx='1.5' fill='none' stroke='%234f8259' stroke-opacity='.5' stroke-width='.7'/><rect x='107.0' y='27.6' width='30.0' height='5.1' fill='%23e8b64a' fill-opacity='.88'/><rect x='107.0' y='27.6' width='30.0' height='5.1' fill='none' stroke='%23a97e26' stroke-width='.4' stroke-opacity='.6'/><rect x='107.0' y='27.6' width='30.0' height='1.8' fill='%23fff0cc' fill-opacity='.4'/><circle cx='122.0' cy='26.5' r='2.2' fill='%234f8259' fill-opacity='.5'/><path d='M 108.0 22.5 L 108.0 37.5' stroke='%23eaffe9' stroke-opacity='.5' stroke-width='.8'/></g><path d='M 34 96 Q 34 66 68 64 L 200 64 Q 234 66 234 96 L 246 162 Q 248 178 230 178 L 44 178 Q 26 178 28 162 Z' fill='url(%23bag)'/><clipPath id='bagclip'><path d='M 34 96 Q 34 66 68 64 L 200 64 Q 234 66 234 96 L 246 162 Q 248 178 230 178 L 44 178 Q 26 178 28 162 Z'/></clipPath><g clip-path='url(%23bagclip)' stroke='%234a5f78' stroke-opacity='.09' stroke-width='.7'><path d='M -20 96 L 22 180'/><path d='M -9 96 L 33 180'/><path d='M 2 96 L 44 180'/><path d='M 13 96 L 55 180'/><path d='M 24 96 L 66 180'/><path d='M 35 96 L 77 180'/><path d='M 46 96 L 88 180'/><path d='M 57 96 L 99 180'/><path d='M 68 96 L 110 180'/><path d='M 79 96 L 121 180'/><path d='M 90 96 L 132 180'/><path d='M 101 96 L 143 180'/><path d='M 112 96 L 154 180'/><path d='M 123 96 L 165 180'/><path d='M 134 96 L 176 180'/><path d='M 145 96 L 187 180'/><path d='M 156 96 L 198 180'/><path d='M 167 96 L 209 180'/><path d='M 178 96 L 220 180'/><path d='M 189 96 L 231 180'/><path d='M 200 96 L 242 180'/><path d='M 211 96 L 253 180'/><path d='M 222 96 L 264 180'/><path d='M 233 96 L 275 180'/><path d='M 244 96 L 286 180'/><path d='M 255 96 L 297 180'/><path d='M -20 96 L -62 180'/><path d='M -9 96 L -51 180'/><path d='M 2 96 L -40 180'/><path d='M 13 96 L -29 180'/><path d='M 24 96 L -18 180'/><path d='M 35 96 L -7 180'/><path d='M 46 96 L 4 180'/><path d='M 57 96 L 15 180'/><path d='M 68 96 L 26 180'/><path d='M 79 96 L 37 180'/><path d='M 90 96 L 48 180'/><path d='M 101 96 L 59 180'/><path d='M 112 96 L 70 180'/><path d='M 123 96 L 81 180'/><path d='M 134 96 L 92 180'/><path d='M 145 96 L 103 180'/><path d='M 156 96 L 114 180'/><path d='M 167 96 L 125 180'/><path d='M 178 96 L 136 180'/><path d='M 189 96 L 147 180'/><path d='M 200 96 L 158 180'/><path d='M 211 96 L 169 180'/><path d='M 222 96 L 180 180'/><path d='M 233 96 L 191 180'/><path d='M 244 96 L 202 180'/><path d='M 255 96 L 213 180'/></g><g clip-path='url(%23bagclip)'><ellipse cx='138' cy='188' rx='120' ry='40' fill='%23050d18' opacity='.5'/><ellipse cx='150' cy='120' rx='120' ry='70' fill='%23060f1c' opacity='.28'/></g><g clip-path='url(%23bagclip)'><ellipse cx='84' cy='96' rx='58' ry='40' fill='%236a8098' opacity='.22'/><ellipse cx='72' cy='90' rx='30' ry='20' fill='%238ea4bc' opacity='.16'/></g><path d='M 34 96 Q 34 66 68 64 L 200 64 Q 234 66 234 96 L 246 162 Q 248 178 230 178 L 44 178 Q 26 178 28 162 Z' fill='none' stroke='%2305101c' stroke-width='2'/><path d='M 44 178 Q 26 178 28 162 L 34 96 Q 34 66 68 64 L 150 64' fill='none' stroke='%23ffd77a' stroke-opacity='.42' stroke-width='2'/><path d='M 34 96 Q 34 66 68 64 L 120 64' fill='none' stroke='%23fff0cc' stroke-opacity='.3' stroke-width='1'/><path d='M 34 96 Q 134 78 234 96 Q 134 88 34 96 Z' fill='url(%23mouth)'/><path d='M 34 96 Q 134 80 234 96' fill='none' stroke='%2305101c' stroke-width='4'/><g stroke='%236f8296' stroke-width='1' stroke-opacity='.5'><path d='M 40.0 94.0 L 40.0 98.0'/><path d='M 49.4 91.8 L 49.4 95.8'/><path d='M 58.8 89.7 L 58.8 93.7'/><path d='M 68.2 87.6 L 68.2 91.6'/><path d='M 77.6 85.8 L 77.6 89.8'/><path d='M 87.0 84.1 L 87.0 88.1'/><path d='M 96.4 82.7 L 96.4 86.7'/><path d='M 105.8 81.5 L 105.8 85.5'/><path d='M 115.2 80.7 L 115.2 84.7'/><path d='M 124.6 80.2 L 124.6 84.2'/><path d='M 134.0 80.0 L 134.0 84.0'/><path d='M 143.4 80.2 L 143.4 84.2'/><path d='M 152.8 80.7 L 152.8 84.7'/><path d='M 162.2 81.5 L 162.2 85.5'/><path d='M 171.6 82.7 L 171.6 86.7'/><path d='M 181.0 84.1 L 181.0 88.1'/><path d='M 190.4 85.8 L 190.4 89.8'/><path d='M 199.8 87.6 L 199.8 91.6'/><path d='M 209.2 89.7 L 209.2 93.7'/><path d='M 218.6 91.8 L 218.6 95.8'/><path d='M 228.0 94.0 L 228.0 98.0'/></g><rect x='36' y='90' width='9' height='13' rx='2.5' fill='%23283a4e'/><rect x='37.5' y='91.5' width='6' height='10' rx='2' fill='%23e8b64a' fill-opacity='.55'/><circle cx='40.5' cy='96' r='2' fill='%23ffd77a' fill-opacity='.7'/><path d='M 86 66 Q 96 30 134 30 Q 172 30 182 66' fill='none' stroke='%231d2c3d' stroke-width='10'/><path d='M 86 66 Q 96 30 134 30 Q 172 30 182 66' fill='none' stroke='%23050d18' stroke-width='11' stroke-opacity='.4'/><path d='M 86 66 Q 96 30 134 30' fill='none' stroke='%23ffd77a' stroke-opacity='.4' stroke-width='2.2'/><path d='M 86 66 Q 96 30 134 30' fill='none' stroke='%236a8098' stroke-opacity='.4' stroke-width='.9'/><rect x='118' y='26' width='32' height='12' rx='3.5' fill='%23283a4e'/><rect x='118' y='26' width='32' height='12' rx='3.5' fill='none' stroke='%23101c28' stroke-width='.8'/><rect x='120' y='28' width='28' height='8' rx='2.5' fill='%23e8b64a' fill-opacity='.42'/><rect x='125' y='28' width='1.6' height='8' fill='%23a97e26' fill-opacity='.5'/><rect x='131' y='28' width='1.6' height='8' fill='%23a97e26' fill-opacity='.5'/><rect x='137' y='28' width='1.6' height='8' fill='%23a97e26' fill-opacity='.5'/><rect x='143' y='28' width='1.6' height='8' fill='%23a97e26' fill-opacity='.5'/><path d='M 52 124 L 216 124' stroke='%2305101c' stroke-width='7' opacity='.55'/><path d='M 52 124 L 216 124' stroke='%234a6079' stroke-opacity='.42' stroke-width='1.4'/><path d='M 52 121 L 216 121' stroke='%236a8296' stroke-opacity='.25' stroke-width='.8'/><circle cx='67' cy='125.5' r='4' fill='%23060d17' opacity='.4'/><circle cx='66' cy='124' r='3.6' fill='%23425672'/><circle cx='66' cy='124' r='3.6' fill='none' stroke='%23101c28' stroke-width='.6'/><circle cx='64.8' cy='122.8' r='1.4' fill='%23cdd9e8' fill-opacity='.8'/><circle cx='135' cy='125.5' r='4' fill='%23060d17' opacity='.4'/><circle cx='134' cy='124' r='3.6' fill='%23425672'/><circle cx='134' cy='124' r='3.6' fill='none' stroke='%23101c28' stroke-width='.6'/><circle cx='132.8' cy='122.8' r='1.4' fill='%23cdd9e8' fill-opacity='.8'/><circle cx='203' cy='125.5' r='4' fill='%23060d17' opacity='.4'/><circle cx='202' cy='124' r='3.6' fill='%23425672'/><circle cx='202' cy='124' r='3.6' fill='none' stroke='%23101c28' stroke-width='.6'/><circle cx='200.8' cy='122.8' r='1.4' fill='%23cdd9e8' fill-opacity='.8'/><ellipse cx='40' cy='138' rx='9' ry='40' fill='%23050e18' opacity='.4'/><ellipse cx='36' cy='130' rx='4' ry='30' fill='%237089a0' opacity='.14'/><ellipse cx='228' cy='138' rx='9' ry='40' fill='%23050e18' opacity='.46'/><defs><linearGradient id='goldT' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='%23ffe9a8'/><stop offset='.5' stop-color='%23f2c45e'/><stop offset='1' stop-color='%23c8922e'/></linearGradient><linearGradient id='goldF' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%23e8b64a'/><stop offset='.55' stop-color='%23b57e22'/><stop offset='1' stop-color='%237c5312'/></linearGradient></defs><g><ellipse cx='292' cy='184' rx='54' ry='8' fill='%23030a14' opacity='.55'/><ellipse cx='292' cy='172' rx='60' ry='26' fill='%23ffd77a' opacity='.13'/><ellipse cx='286' cy='165' rx='34' ry='13' fill='%23fff0cc' opacity='.1'/><path d='M300 160 L336 160 L340 167 L294 167 Z' fill='url(%23goldT)'/><path d='M294 167 L340 167 L336 181 L297 181 Z' fill='url(%23goldF)'/><path d='M301 161 L335 161' stroke='%23fffdf2' stroke-width='1.3' opacity='.85'/><ellipse cx='318' cy='163.4' rx='12' ry='2' fill='%23fff6dc' opacity='.55'/><path d='M296 170 L332 170' stroke='%23ffe9a8' stroke-width='1.4' stroke-linecap='round' opacity='.5'/><g stroke='%23a97e26' stroke-width='.8' opacity='.7'><path d='M300 172 L334 172'/><path d='M301 176 L332 176'/></g><path d='M246 158 L290 158 L297 166 L238 166 Z' fill='url(%23goldT)'/><path d='M238 166 L297 166 L293 182 L242 182 Z' fill='url(%23goldF)'/><path d='M247 159 L289 159' stroke='%23fffdf2' stroke-width='1.3' opacity='.9'/><path d='M242 171 L290 171' stroke='%23ffe9a8' stroke-width='1.4' stroke-linecap='round' opacity='.5'/><g stroke='%23a97e26' stroke-width='.8' opacity='.7'><path d='M244 172 L292 172'/><path d='M245 176 L290 176'/></g><ellipse cx='262' cy='162' rx='10' ry='2.2' fill='%23fff6dc' opacity='.65'/><g transform='rotate(-5 285 150)'><path d='M262 143 L302 143 L308 150 L255 150 Z' fill='url(%23goldT)'/><path d='M255 150 L308 150 L304 163 L259 163 Z' fill='url(%23goldF)'/><path d='M263 144 L301 144' stroke='%23fff6dc' stroke-width='1.2' opacity='.85'/><g stroke='%23a97e26' stroke-width='.8' opacity='.7'><path d='M261 154 L303 154'/><path d='M262 158 L301 158'/></g><ellipse cx='278' cy='146.5' rx='9' ry='2' fill='%23fff6dc' opacity='.7'/></g><path d='M270 141 L271.2 145.5 L276 146.7 L271.2 147.9 L270 152.4 L268.8 147.9 L264 146.7 L268.8 145.5 Z' fill='%23ffffff' opacity='.9'/><path d='M246 158 L238 166 L242 182' fill='none' stroke='%23ffe9a8' stroke-width='1.2' opacity='.5'/></g></svg>");
}

/* ═══ pinned dossier — three index cards / surveillance photos tacked to
   the wall in the far upper-right corner, tilted, with pushpin heads and
   a whisper of lamp-side rim. Far off the lane. STATIC. ═══ */
head meta:first-of-type::before {
  content: "";
  display: var(--heist-scenery, block);
  position: fixed;
  right: 1.5vw;
  top: 2vh;
  width: 228px;
  height: 164px;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  background-repeat: no-repeat;
  background-position: right top;
  background-size: contain;
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 230 165'><defs><linearGradient id='card' x1='0' y1='0' x2='0.7' y2='1'><stop offset='0' stop-color='%23193149'/><stop offset='1' stop-color='%230c1928'/></linearGradient><linearGradient id='card2' x1='0' y1='0' x2='0.7' y2='1'><stop offset='0' stop-color='%23162a40'/><stop offset='1' stop-color='%230a1524'/></linearGradient></defs><g transform='rotate(-7 66 66)'><rect x='16' y='24' width='92' height='70' rx='2' fill='url(%23card)' stroke='%2340597a' stroke-width='1.5'/><path d='M17 25 L107 25 M17 25 L17 93' fill='none' stroke='%23bcd0ea' stroke-opacity='.28' stroke-width='1.2'/><circle cx='46' cy='52' r='13' fill='%2321395a'/><path d='M31 78 Q46 60 61 78 Z' fill='%2321395a'/><g stroke='%233a5578' stroke-opacity='.4' stroke-width='.6'><path d='M70 40 L100 40'/><path d='M70 44 L100 44'/><path d='M70 48 L100 48'/><path d='M70 52 L100 52'/><path d='M70 56 L100 56'/><path d='M70 60 L100 60'/><path d='M70 64 L100 64'/><path d='M70 68 L100 68'/></g><rect x='24' y='82' width='76' height='7' rx='1.5' fill='%230c1c30'/><text x='28' y='88' font-family='monospace' font-size='5' fill='%2378d0ff' fill-opacity='.55' letter-spacing='1'>CAM-04 03:11</text><ellipse cx='64.5' cy='27.5' rx='7' ry='3.2' fill='%23030a14' opacity='.5'/><circle cx='62' cy='24' r='5.5' fill='%23ff3b30'/><circle cx='62' cy='24' r='5.5' fill='none' stroke='%23801a14' stroke-width='.7' stroke-opacity='.6'/><circle cx='60' cy='22' r='1.8' fill='%23ffc4bf'/></g><g transform='rotate(6 165 78)'><rect x='118' y='42' width='96' height='72' rx='2' fill='url(%23card2)' stroke='%2340597a' stroke-width='1.5'/><path d='M119 43 L213 43 M119 43 L119 113' fill='none' stroke='%23bcd0ea' stroke-opacity='.26' stroke-width='1.2'/><path d='M126 104 L126 74 L140 74 L140 62 L156 62 L156 84 L172 84 L172 66 L188 66 L188 104 Z' fill='%23223c5c'/><g fill='%23e8b64a' fill-opacity='.4'><rect x='131' y='80' width='3' height='3'/><rect x='147' y='70' width='3' height='3'/><rect x='147' y='80' width='3' height='3'/><rect x='163' y='90' width='3' height='3'/><rect x='178' y='74' width='3' height='3'/><rect x='178' y='86' width='3' height='3'/></g><circle cx='163' cy='72' r='9' fill='none' stroke='%23e8b64a' stroke-opacity='.6' stroke-width='1.2'/><path d='M163 60 L163 84 M151 72 L175 72' stroke='%23e8b64a' stroke-opacity='.4' stroke-width='.8'/><ellipse cx='160.5' cy='45.5' rx='7' ry='3.2' fill='%23030a14' opacity='.5'/><circle cx='158' cy='42' r='5.5' fill='%23e8b64a'/><circle cx='158' cy='42' r='5.5' fill='none' stroke='%238a6018' stroke-width='.7' stroke-opacity='.6'/><circle cx='156' cy='40' r='1.8' fill='%23fff0cc'/></g><path d='M64 20 Q120 8 160 40' fill='none' stroke='%23ff3b30' stroke-opacity='.5' stroke-width='1.3'/><g transform='rotate(-4 40 128)'><rect x='10' y='118' width='64' height='16' rx='2' fill='%230b1726' stroke='%23ff3b30' stroke-opacity='.45' stroke-width='1'/><text x='42' y='129' font-family='monospace' font-size='7' letter-spacing='2' fill='%23ff6b62' fill-opacity='.7' text-anchor='middle'>SUSPECT</text><rect x='14' y='136' width='40' height='4' fill='%230f1f30'/></g></svg>");
}

/* ═══ a soft cast shadow grounding the pinned dossier against the wall
   (the cards throw a shadow down-right, away from the lamp). STATIC.
   Uses the second free head-meta pseudo — the continuous dial telltale
   now lives on body::after so it paints above the vault door. ═══ */
head meta:first-of-type::after {
  content: "";
  display: var(--heist-scenery, block);
  position: fixed;
  right: 0.6vw;
  top: 3vh;
  width: 220px;
  height: 165px;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background: radial-gradient(ellipse 60% 46% at 46% 44%, rgba(3, 8, 18, 0.5), rgba(3, 8, 18, 0) 72%);
}

/* ═══ blueprint stamp — TOP SECRET / THE JOB in the lower-left margin,
   set like a rubber stamp on the drafting paper, slightly crooked.
   STATIC. ═══ */
head meta:last-of-type::before {
  content: "TOP SECRET";
  display: var(--heist-scenery, block);
  position: fixed;
  left: 3vw;
  bottom: 26vh;
  z-index: 0;
  pointer-events: none;
  font-family: "Share Tech Mono", ui-monospace, Menlo, monospace;
  font-size: 0.82rem;
  letter-spacing: 0.42em;
  color: rgba(255, 59, 48, 0.42);
  border: 2px solid rgba(255, 59, 48, 0.34);
  border-radius: 3px;
  padding: 0.28em 0.66em 0.24em 0.9em;
  transform: rotate(-6deg);
  text-shadow: none;
}

/* ═══ drafting-tape corner + coffee ring on the plan — small
   foreground dressing lower-center-left so the paper feels handled.
   STATIC. ═══ */
head meta:last-of-type::after {
  content: "";
  display: var(--heist-scenery, block);
  position: fixed;
  left: 6vw;
  bottom: 30vh;
  width: 150px;
  height: 120px;
  z-index: -1;
  pointer-events: none;
  background:
    /* coffee ring */
    radial-gradient(circle 30px at 108px 30px, rgba(120, 82, 40, 0) 0 22px, rgba(150, 104, 54, 0.14) 23px 26px, rgba(120, 82, 40, 0) 28px),
    /* torn drafting tape at top-left, catching lamp light */
    linear-gradient(-38deg, rgba(233, 226, 200, 0) 0 12%, rgba(233, 226, 200, 0.14) 12% 26%, rgba(233, 226, 200, 0) 26%);
}

/* ═══ laser dust / graph-paper hairlines — the ONLY fine pattern, so it
   RIDES THE ROLL (zero slide against tracked glyphs = zero flicker).
   A faint fine graph grid + a few floating dust specks lit red. ═══ */
.credits-roll::before,
.credits-slideshow::before {
  content: "";
  display: var(--heist-scenery, block);
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.5;
  background-image:
    radial-gradient(circle at 28% 22%, rgba(255, 120, 110, 0.5) 0 1px, rgba(255, 120, 110, 0) 2px),
    radial-gradient(circle at 74% 58%, rgba(207, 226, 255, 0.6) 0 1px, rgba(207, 226, 255, 0) 2px),
    radial-gradient(circle at 46% 84%, rgba(232, 182, 74, 0.5) 0 1px, rgba(232, 182, 74, 0) 2px),
    linear-gradient(0deg, rgba(207, 226, 255, 0.05) 0 1px, rgba(207, 226, 255, 0) 1px 40px),
    linear-gradient(90deg, rgba(207, 226, 255, 0.05) 0 1px, rgba(207, 226, 255, 0) 1px 40px);
  background-size: 300px 300px, 260px 260px, 340px 340px, 40px 40px, 40px 40px;
}

/* ═══ THE LINEUP — each section is a case file / a role called out ═══ */
.credits-block,
.credits-slide:not(.flourish) { counter-increment: heist-case; }

/* section titles: the role, announced. Playfair caps for weight, a thin
   monospace eyebrow above ("MEMBER 01 · THE CREW"), a gold rule and a
   drafted corner bracket. Names of blocks are content-driven (MODERATORS,
   VIPS, SUBSCRIBERS...) so we DON'T assume copy — we frame them. */
.credits-block__title {
  position: relative;
  font-family: var(--credits-title-font);
  font-weight: 700;
  font-size: var(--credits-title-size);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--heist-paper);
  text-shadow: 0 2px 14px rgba(3, 8, 18, 0.9);
  margin: 0 auto 1.5rem;
  padding: 0.55rem 0.2rem 0;
  width: fit-content;
  max-width: 88vw;
}
/* the case-file eyebrow above the role */
.credits-block__title::before {
  content: "MEMBER " counter(heist-case, decimal-leading-zero) "  /  THE CREW";
  display: block;
  font-family: "Share Tech Mono", ui-monospace, Menlo, monospace;
  font-size: 0.62rem;
  font-weight: 400;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: var(--heist-gold);
  opacity: 0.85;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 12px rgba(232, 182, 74, 0.3);
}
/* the base gold rule becomes a longer drafted line with end ticks, its
   centre run graded like a foil filament — dim gold at the ends, a hot
   bright-gold core catching the light in the middle. */
.credits-block__title::after {
  content: "";
  display: block;
  width: min(220px, 60vw);
  height: 8px;
  margin: 0.7rem auto 0;
  opacity: 1;
  background:
    linear-gradient(90deg, rgba(232, 182, 74, 0) 0%, rgba(232, 182, 74, 0.7) 20%, rgba(255, 224, 150, 0.95) 50%, rgba(232, 182, 74, 0.7) 80%, rgba(232, 182, 74, 0) 100%) center / 100% 1.5px no-repeat,
    linear-gradient(0deg, rgba(232, 182, 74, 0.75) 0 8px, rgba(232, 182, 74, 0) 8px) left center / 1.5px 8px no-repeat,
    linear-gradient(0deg, rgba(232, 182, 74, 0.75) 0 8px, rgba(232, 182, 74, 0) 8px) right center / 1.5px 8px no-repeat;
}

/* rows: the crew members. Names in warm paper, never clipped. Amounts
   are the CUT OF THE TAKE — a gold chip. */
.credit {
  max-width: min(42rem, 90vw);
  margin-inline: auto;
  min-width: 0;
  overflow-wrap: anywhere;
  font-weight: 500;
  letter-spacing: 0.02em;
  line-height: 1.55;
}
.credit__name {
  color: var(--heist-paper);
  text-shadow: 0 1px 10px rgba(3, 8, 18, 0.8);
}
.credit__amount {
  display: inline-block;
  margin-left: 0.7em;
  vertical-align: 0.12em;
  opacity: 1;
  font-family: "Share Tech Mono", ui-monospace, Menlo, monospace;
  font-size: 0.66em;
  font-weight: 400;
  letter-spacing: 0.06em;
  color: #2a1e06;
  /* gold-foil chip: a stamped foil tag — a warm metallic base with a bright
     diagonal sheen band raking across it (like light on foil), a darker
     lower edge for weight, and a chiselled bevel from inset light/shadow. */
  background:
    linear-gradient(118deg, rgba(255, 255, 255, 0) 30%, rgba(255, 252, 236, 0.65) 46%, rgba(255, 255, 255, 0) 60%),
    linear-gradient(178deg, #fff0c0 0%, #ffd77a 26%, #e8b64a 62%, #bd8a2e 100%);
  border-radius: 3px;
  padding: 0.18em 0.55em 0.14em;
  font-variant-numeric: tabular-nums;
  box-shadow:
    0 1px 6px rgba(232, 182, 74, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.65),
    inset 0 -1px 0 rgba(120, 82, 24, 0.45);
  white-space: nowrap;
  text-shadow: 0 1px 0 rgba(255, 245, 210, 0.4);
}
.credit__amount::before {
  content: "CUT ";
  font-size: 0.78em;
  letter-spacing: 0.16em;
  opacity: 0.66;
}

/* ═══ flourish cards ═══ */
.flourish--intro { gap: 1.35rem; }

/* the intro title sits UNDER the vault door on the right; nudge the card
   content left so the streamer name doesn't fight the steel. */
.flourish--intro .flourish__title,
.flourish--intro .flourish__badge,
.flourish--intro .flourish__tagline,
.flourish--intro .flourish__rating { position: relative; z-index: 2; }

.flourish__title {
  font-family: var(--credits-title-font);
  font-weight: 800;
  letter-spacing: 0.03em;
  line-height: 1.06;
  /* chiselled steel-letterpress: the crew name embossed into the plan and
     raked by the desk lamp — a bright bevel edge up-LEFT (lamp side), a dark
     cut down-RIGHT, weight below, then a cool ambient bloom + a whisper of
     warm gold from the take. Reads as engraved foil, not flat paper. */
  color: #eef4ff;
  text-shadow:
    -1px -1px 0 rgba(255, 255, 255, 0.55),
    1px 1px 0 rgba(6, 12, 24, 0.9),
    0 3px 2px rgba(3, 8, 18, 0.55),
    0 6px 18px rgba(3, 8, 18, 0.9),
    0 0 30px rgba(207, 226, 255, 0.16),
    0 0 44px rgba(232, 182, 74, 0.1);
}

/* badge -> the operation codename card (copy swap via font-size:0 + ::after) */
.flourish__badge { font-size: 0; border: 0; border-radius: 0; padding: 0; box-shadow: none; }
.flourish__badge::after {
  content: "OPERATION: LAST CALL  ·  EYES ONLY";
  display: inline-block;
  font-family: "Share Tech Mono", ui-monospace, Menlo, monospace;
  font-weight: 400;
  font-size: 0.78rem;
  letter-spacing: 0.34em;
  padding: 0.5em 1em 0.5em 1.34em;
  text-transform: uppercase;
  color: var(--heist-gold-bright);
  border: 1px solid rgba(232, 182, 74, 0.55);
  border-radius: 2px;
  /* foil-stamped card: a faint gold wash with a top sheen band, as if the
     lamp catches the embossed foil edge. */
  background:
    linear-gradient(180deg, rgba(255, 224, 150, 0.14) 0%, rgba(232, 182, 74, 0.04) 34%, rgba(232, 182, 74, 0) 100%),
    rgba(232, 182, 74, 0.05);
  box-shadow:
    0 0 16px rgba(232, 182, 74, 0.16),
    inset 0 1px 0 rgba(255, 232, 176, 0.3),
    inset 0 0 0 1px rgba(232, 182, 74, 0.12);
  text-shadow: 0 0 10px rgba(232, 182, 74, 0.4);
}

/* tagline: streamer copy — restyle only (the briefing line) */
.flourish__tagline {
  font-family: var(--credits-title-font);
  font-style: italic;
  font-weight: 600;
  font-size: 1.14rem;
  letter-spacing: 0.04em;
  color: rgba(238, 244, 255, 0.86);
}

/* rating -> the clearance stamp (copy swap): red ink, crooked */
.flourish__rating { font-size: 0; border: 0; padding: 0; opacity: 1; }
.flourish__rating::after {
  content: "CLEARANCE: CREW ONLY";
  display: inline-block;
  font-family: "Share Tech Mono", ui-monospace, Menlo, monospace;
  font-weight: 400;
  font-size: 0.72rem;
  letter-spacing: 0.28em;
  padding: 0.42em 0.7em 0.42em 0.98em;
  text-transform: uppercase;
  color: var(--heist-red);
  border: 2px solid rgba(255, 59, 48, 0.6);
  border-radius: 4px;
  transform: rotate(-3deg);
  opacity: 0.9;
  text-shadow: 0 0 12px rgba(255, 59, 48, 0.3);
}

/* the safe-cracking fine print under the intro */
.flourish--intro::after {
  content: "no names  ·  no traces  ·  in and out";
  display: var(--heist-scenery, block);
  font-family: "Share Tech Mono", ui-monospace, Menlo, monospace;
  font-weight: 400;
  font-size: 0.64rem;
  letter-spacing: 0.32em;
  padding-left: 0.32em;
  text-transform: uppercase;
  color: rgba(207, 226, 255, 0.44);
}

/* outro: THE CREW DISPERSES (copy swap on title + tagline). em units on
   the ::after compute against the parent's font-size:0 = zero, so the
   ::after re-declares its own font-size. */
.flourish--outro::before {
  content: "\\2014  \\2014  \\2014";
  display: var(--heist-scenery, block);
  font-family: "Share Tech Mono", ui-monospace, Menlo, monospace;
  font-size: 0.8rem;
  letter-spacing: 0.6em;
  padding-left: 0.6em;
  color: var(--heist-gold);
  opacity: 0.72;
}
.flourish--outro .flourish__title { font-size: 0; }
.flourish--outro .flourish__title::after {
  content: "THE CREW DISPERSES";
  display: inline-block;
  font-family: var(--credits-title-font);
  font-weight: 800;
  font-size: calc(var(--credits-flourish-title-size) * 0.72);
  letter-spacing: 0.03em;
  line-height: 1.08;
  color: #eef4ff;
  /* same chiselled steel-letterpress raking as the intro title */
  text-shadow:
    -1px -1px 0 rgba(255, 255, 255, 0.5),
    1px 1px 0 rgba(6, 12, 24, 0.9),
    0 3px 2px rgba(3, 8, 18, 0.55),
    0 6px 18px rgba(3, 8, 18, 0.9),
    0 0 30px rgba(207, 226, 255, 0.18),
    0 0 44px rgba(232, 182, 74, 0.1);
}
.flourish--outro .flourish__tagline { font-size: 0; }
.flourish--outro .flourish__tagline::after {
  content: "no names — no traces";
  font-family: var(--credits-title-font);
  font-style: italic;
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.05em;
  color: rgba(238, 244, 255, 0.82);
}
/* the sign-off chip */
.flourish--outro::after {
  content: "\\25A0 CASE CLOSED";
  font-family: "Share Tech Mono", ui-monospace, Menlo, monospace;
  font-weight: 400;
  font-size: 0.68rem;
  letter-spacing: 0.4em;
  padding: 0.32em 0.5em 0.32em 0.9em;
  margin-top: 0.6rem;
  color: rgba(232, 182, 74, 0.85);
  border: 1px solid rgba(232, 182, 74, 0.42);
  border-radius: 2px;
  text-shadow: 0 0 10px rgba(232, 182, 74, 0.3);
}

/* ═══ THE SCORE — raid finale (nth-last-of-type(2)). The take is
   counted: the role title goes hot gold, a static amber halo rises
   behind the block, the eyebrow reads THE SCORE and breathes on a
   steps() glow (~0.5 paints/s — the ONLY animation inside the roll,
   far under the 2 paints/s ceiling). ═══ */
.credits-block:nth-last-of-type(2) {
  background: radial-gradient(ellipse 56% 60% at 50% 34%, rgba(232, 182, 74, 0.14), rgba(232, 182, 74, 0) 72%);
}
.credits-slide:nth-last-of-type(2):not(.flourish) {
  background: radial-gradient(ellipse 62% 58% at 50% 46%, rgba(232, 182, 74, 0.13), rgba(232, 182, 74, 0) 80%);
}
.credits-block:nth-last-of-type(2) .credits-block__title,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
  color: var(--heist-gold-bright);
  text-shadow: 0 0 30px rgba(255, 215, 122, 0.5), 0 0 8px rgba(232, 182, 74, 0.4), var(--credits-shadow);
}
.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  content: "\\2726  THE SCORE  \\2726";
  color: var(--heist-gold-bright);
  opacity: 1;
  text-shadow: 0 0 16px rgba(255, 215, 122, 0.6);
  animation: heist-score 4.2s steps(1, end) infinite;
}
.credits-block:nth-last-of-type(2) .credits-block__title::after,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::after {
  background:
    linear-gradient(90deg, rgba(255, 215, 122, 0) 0%, rgba(255, 215, 122, 0.9) 22% 78%, rgba(255, 215, 122, 0) 100%) center / 100% 1.5px no-repeat,
    linear-gradient(0deg, rgba(255, 215, 122, 0.9) 0 8px, rgba(255, 215, 122, 0) 8px) left center / 1.5px 8px no-repeat,
    linear-gradient(0deg, rgba(255, 215, 122, 0.9) 0 8px, rgba(255, 215, 122, 0) 8px) right center / 1.5px 8px no-repeat;
}
.credits-block:nth-last-of-type(2) .credit,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit {
  font-size: calc(var(--credits-name-size) * 1.1);
}
.credits-block:nth-last-of-type(2) .credit__name,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__name {
  text-shadow: 0 0 18px rgba(255, 215, 122, 0.35), var(--credits-shadow);
}

/* ═══ custom credit types cycle a subtle hue on the eyebrow so a
   mid-roll custom block (e.g. clip-of-the-night) still feels drafted,
   without assuming its copy. Content-agnostic parity tint. ═══ */
.credits-block:nth-of-type(3n) .credits-block__title::before,
.credits-slide:nth-of-type(3n):not(.flourish) .credits-block__title::before {
  color: var(--heist-line);
  text-shadow: 0 0 12px rgba(207, 226, 255, 0.28);
}

/* ═══ slideshow: each slide slides in like a case file dropping on the
   table — small one-shot transform layered on the base fade. ═══ */
.credits-slide {
  transform: translateY(16px);
  transition: opacity 0.9s ease, transform 1s cubic-bezier(0.22, 1, 0.36, 1);
}
.credits-slide.is-active { transform: none; }

/* ═══ keyframes (all heist- prefixed; transform/opacity ONLY) ═══ */
/* the dial telltale: one slow orbit of the hub every 11s. It rotates a
   small offset-anchored glint around the door center — continuous but
   tiny, on its own promoted layer (will-change: transform). */
@keyframes heist-dial {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
/* THE SCORE eyebrow: three discrete brightening steps per 4.2s — a
   counter clicking over, not a strobe (~0.7 paints/s). */
@keyframes heist-score {
  0%, 46%  { opacity: 1; }
  54%, 70% { opacity: 0.6; }
  78%, 92% { opacity: 1; }
  100%     { opacity: 0.82; }
}
/* the flashlight panning the blueprint — transform-only translateX on a
   top-band torch layer; ease alternate makes it dwell on details at the ends */
@keyframes heist-flashlight {
  0%   { transform: translate3d(-3vw, 0, 0); }
  100% { transform: translate3d(13vw, 0, 0); }
}
/* the camera's REC LED: a short blink every 2.6s (steps = 2 paints per
   cycle on a 16px box) */
@keyframes heist-led {
  0%, 84%   { opacity: 0.35; }
  86%, 96%  { opacity: 1; }
  98%, 100% { opacity: 0.35; }
}

/* ═══ reduced motion: the safehouse holds still — the dial telltale
   parks visible at the top of the hub, the score eyebrow stops
   breathing, slides fall back to the base fade. ═══ */
@media (prefers-reduced-motion: reduce) {
  /* the dial telltale parks visibly at the 2-o'clock mark on the dial */
  body::after { animation: none; transform: rotate(60deg); }
  /* the flashlight parks mid-sweep, resting on the plan; the REC LED holds lit */
  head::before { animation: none; transform: translate3d(6vw, 0, 0); }
  head title::after { animation: none; opacity: 0.8; }
  .credits-block:nth-last-of-type(2) .credits-block__title::before,
  .credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
    animation: none;
  }
  .credits-slide { transform: none; transition: opacity 0.8s ease; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--heist-scenery:none;}",
};
