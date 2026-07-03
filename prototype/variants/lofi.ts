import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. Lo-Fi Room: the 2:47 AM study room — a desk lamp holds one warm pool of light over a sleeping cat, rain ticks down the window over the night city, and the credits go up as sticky notes in a handwritten thank-you journal. */
export const VARIANT: ThemeVariant = {
  key: "lofi",
  name: "Lo-Fi Room",
  css: `
/* ================================================================
   LO-FI ROOM — layered after the base theme.
   Fiction: 2:47 AM, the beats never stopped. A study room in the
   quiet hours — the desk lamp leans over a sleeping cat on its
   cushion, tea steams beside a stack of half-read books, rain
   ticks down the window while the city across the street keeps a
   few lights on. The credits are the streamer's gratitude journal:
   every section is a sticky note slapped on the wall, every name
   is written down so it won't be forgotten. When the raid lands,
   the cat wakes up — that NEVER happens.
   Light story: ONE warm key light (the lamp, lower-right) pooling
   over cat/books/mug; a cool blue fill spills from the window,
   lower-left; everything else falls into warm plum darkness.
   Layer map (all scenery kill-switched via --lofi-scenery):
     html bg (--credits-bg)   warm plum room falling to dark (cheap:
                              1 radial + 1 linear)
     html::before             LIGHT STORY — lamp pool + wall bloom +
                              lamp cone, window cool spill, ceiling
                              falloff, vignette. STATIC, promoted
     html::after              NIGHT CITY seen through the glass —
                              moon, two skyline rows, lit windows,
                              tower beacon. STATIC, promoted, sized
                              exactly to the glass hole
     meta#1::after            city TWINKLE — a few extra windows
                              breathing, steps() ~0.5 paints/s
     head::after              RAIN — soft 4px dashes falling in
                              steps() over the glass ONLY (off-lane);
                              spill hidden behind the frame rail
     meta#1::before           WINDOW FRAME + THE DESK — one static
                              promoted layer, two SVGs: wood frame,
                              mullions, sill + cactus (left); desk,
                              clock, books, headphones, mug, cushion,
                              plant, the lamp itself (right)
     body::before             sticky-note cluster on the wall by the
                              window (scribbles, washi tape). STATIC
     body::after              center-lane readability scrim. STATIC
     head::before             tea steam off the mug — the ONLY
                              continuous mover (will-change: 1)
     meta#2::before           THE CAT asleep on her cushion in the
                              lamp pool. STATIC
     meta#2::after            her tail — one lazy steps() flick every
                              8 seconds
     .credits-roll::before    paper grain (fine flecks RIDE THE ROLL)
     .credits-slideshow::before  same grain, static per L6
   Raid finale: the cat wakes up IN THE ROLL — two poses swapping on
   steps() above the note (~1.5 paints/s, under the in-roll cap).
   ================================================================ */
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Nunito:ital,wght@0,400;0,600;0,700;1,400&family=Patrick+Hand&display=swap');

:root {
  /* ── palette: the room ── */
  --lofi-scenery: block; /* set to none to strip every scenery layer */
  --lofi-cream: #f3e7d3;
  --lofi-amber: #f0b46e;
  --lofi-lamp: #ffd79b;
  --lofi-ink: #4a3226;
  --lofi-rose: #e8927c;
  --lofi-note-yellow: #f2d987;
  --lofi-note-mint: #c9e2bd;
  --lofi-note-pink: #eebbc4;

  /* ── base hooks ── */
  /* Cheap room: one warm breath where the lamp lives + a plum-dark
     vertical fall (L3: the real light lives on promoted pseudos). */
  --credits-bg:
    radial-gradient(ellipse 62% 54% at 80% 82%, rgba(88, 54, 38, 0.5), rgba(88, 54, 38, 0) 72%),
    linear-gradient(180deg, #251b23 0%, #231926 20%, #1f1720 44%, #1a131b 66%, #150f15 84%, #100b10 100%);
  --credits-color: var(--lofi-cream);
  --credits-accent: var(--lofi-amber);
  --credits-font: "Nunito", "Avenir Next", "Segoe UI", Roboto, sans-serif;
  --credits-title-font: "Caveat", "Comic Sans MS", "Bradley Hand", cursive;
  --credits-title-size: clamp(1.7rem, 4vw, 2.4rem);
  --credits-name-size: clamp(1rem, 2.5vw, 1.5rem);
  --credits-flourish-title-size: clamp(2.8rem, 8.5vw, 5.2rem);
  --credits-block-gap: 5.5rem;
  --credits-name-gap: 0.65rem;
  --credits-shadow: 0 2px 10px rgba(12, 7, 10, 0.75);
  /* glow no-op — never "none" (a "none" in the composed shadow list
     invalidates the whole declaration); Lo-Fi glows are bespoke. */
  --credits-glow: 0 0 0 rgba(0, 0, 0, 0);
}

/* Scenery is full-bleed: html drops the base edge-fade; body keeps the
   base mask so names still ease in at the floor and out at the ceiling. */
html { -webkit-mask-image: none; mask-image: none; }
body { background: transparent; counter-reset: lofi-track; }

/* ═══ THE LIGHT STORY — one static promoted layer. The lamp is the key:
   a warm pool over the desk, a bloom up the right wall, a soft cone from
   the shade toward the cushion. The window answers with a cool spill,
   the ceiling falls away, and a plum vignette closes the room. Every
   feature is huge and soft — nothing here can flicker against glyphs. */
html::before {
  content: "";
  display: var(--lofi-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -4;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* DUST IN THE LIGHT — a few soft motes hanging in the lamp's beams on
       the right, off the text lane (L6: static, edge-confined). The detail
       that makes the god-rays read as real volumetric air. */
    url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 620 900'><defs><radialGradient id='glint' cx='50%25' cy='50%25' r='50%25'><stop offset='0' stop-color='%23fff3d6' stop-opacity='.9'/><stop offset='.35' stop-color='%23ffe0a8' stop-opacity='.35'/><stop offset='1' stop-color='%23ffe0a8' stop-opacity='0'/></radialGradient></defs><g fill='url(%23glint)'><circle cx='470' cy='200' r='26'/><circle cx='540' cy='360' r='22'/><circle cx='200' cy='330' r='20'/><circle cx='330' cy='560' r='18'/></g><g fill='%23fff2d4'><circle cx='120' cy='150' r='1.6' opacity='.55'/><circle cx='300' cy='90' r='1.1' opacity='.36'/><circle cx='470' cy='200' r='2.4' opacity='.85'/><circle cx='560' cy='120' r='1.3' opacity='.42'/><circle cx='200' cy='330' r='2' opacity='.7'/><circle cx='400' cy='420' r='1' opacity='.32'/><circle cx='540' cy='360' r='2.2' opacity='.78'/><circle cx='90' cy='500' r='1.2' opacity='.36'/><circle cx='330' cy='560' r='1.9' opacity='.62'/><circle cx='500' cy='620' r='1' opacity='.32'/><circle cx='250' cy='690' r='1.5' opacity='.38'/><circle cx='440' cy='760' r='1.2' opacity='.34'/><circle cx='150' cy='800' r='1.3' opacity='.36'/></g></svg>") right 3vw top 14vh / 380px 560px no-repeat,
    url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><defs><radialGradient id='face' cx='42%25' cy='36%25' r='70%25'><stop offset='0' stop-color='%23f2e6cf'/><stop offset='.7' stop-color='%23e0cfae'/><stop offset='1' stop-color='%23c9b58f'/></radialGradient><linearGradient id='rim' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%23caa25e'/><stop offset='.5' stop-color='%238a6a3c'/><stop offset='1' stop-color='%23553f22'/></linearGradient></defs><ellipse cx='62' cy='64' rx='52' ry='52' fill='%23120b08' opacity='.4'/><circle cx='60' cy='60' r='54' fill='url(%23rim)'/><circle cx='60' cy='60' r='54' fill='none' stroke='%23e8c98a' stroke-opacity='.4' stroke-width='1.5'/><circle cx='60' cy='60' r='46' fill='%232a1e16'/><circle cx='60' cy='60' r='43' fill='url(%23face)'/><circle cx='60' cy='60' r='43' fill='none' stroke='%23f4b96a' stroke-opacity='.18' stroke-width='2'/><g stroke='%234a3326' stroke-width='2.4' stroke-linecap='round'><path d='M60 22 V29'/><path d='M98 60 H91'/><path d='M60 98 V91'/><path d='M22 60 H29'/></g><g stroke='%236b503a' stroke-width='1.4' stroke-linecap='round' opacity='.7'><path d='M79 27 l-3 5'/><path d='M93 41 l-5 3'/><path d='M93 79 l-5 -3'/><path d='M79 93 l-3 -5'/><path d='M41 93 l3 -5'/><path d='M27 79 l5 -3'/><path d='M27 41 l5 3'/><path d='M41 27 l3 5'/></g><path d='M60 60 L86 57' stroke='%233a2a1e' stroke-width='4.5' stroke-linecap='round'/><path d='M60 60 L21 52' stroke='%233a2a1e' stroke-width='3' stroke-linecap='round'/><path d='M60 60 L89 77' stroke='%23c8564a' stroke-width='1.4' stroke-linecap='round'/><circle cx='60' cy='60' r='3.5' fill='%233a2a1e'/><circle cx='60' cy='60' r='1.5' fill='%23c8564a'/><path d='M60 8 A52 52 0 0 1 92 100' stroke='%23f4b96a' stroke-opacity='.3' stroke-width='2.5' fill='none'/><path d='M34 34 A40 40 0 0 1 74 26' stroke='%23fff8e8' stroke-opacity='.22' stroke-width='4' fill='none' stroke-linecap='round'/></svg>") right 20vw top 12vh / 128px 128px no-repeat,
    /* vignette — the room swallows its corners */
    radial-gradient(ellipse 140% 120% at 50% 40%, rgba(10, 6, 9, 0) 56%, rgba(10, 6, 9, 0.55) 100%),
    /* GOD-RAYS — the lamp throws soft volumetric beams up-and-left across
       the room, catching dust. Coarse, static, off-lane on the right; the
       fan now reaches all the way into the upper-center-left, turning the
       dead wall into lit air. Two brighter core beams + a wide soft wash. */
    url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 720' preserveAspectRatio='none'><defs><linearGradient id='ray' x1='0' y1='1' x2='0' y2='0'><stop offset='0' stop-color='%23ffdca0' stop-opacity='.22'/><stop offset='.5' stop-color='%23ffcf8c' stop-opacity='.06'/><stop offset='1' stop-color='%23ffcf8c' stop-opacity='0'/></linearGradient><linearGradient id='rayb' x1='0' y1='1' x2='0' y2='0'><stop offset='0' stop-color='%23ffe4b4' stop-opacity='.14'/><stop offset='.6' stop-color='%23ffcf8c' stop-opacity='.03'/><stop offset='1' stop-color='%23ffcf8c' stop-opacity='0'/></linearGradient><linearGradient id='rayc' x1='0' y1='1' x2='0' y2='0'><stop offset='0' stop-color='%23ffe8bc' stop-opacity='.09'/><stop offset='.65' stop-color='%23ffd79b' stop-opacity='.02'/><stop offset='1' stop-color='%23ffd79b' stop-opacity='0'/></linearGradient></defs><g fill='url(%23rayc)'><path d='M905 704 L300 150 L392 120 Z'/><path d='M905 704 L200 320 L268 262 Z'/><path d='M905 704 L120 220 L196 188 Z'/></g><g fill='url(%23ray)'><path d='M905 704 L556 96 L648 104 Z'/><path d='M905 704 L742 74 L822 116 Z'/><path d='M905 704 L452 214 L512 168 Z'/><path d='M905 704 L360 130 L432 118 Z'/></g><g fill='url(%23rayb)'><path d='M905 704 L668 60 L708 70 Z'/><path d='M905 704 L858 128 L906 176 Z'/><path d='M905 704 L372 300 L418 262 Z'/><path d='M905 704 L250 180 L306 156 Z'/></g></svg>") center / 100% 100% no-repeat,
    /* the bulb itself — a tight hot core of light where the shade opens,
       so the lamp reads as the room's true key, not a teal blob */
    radial-gradient(circle 3.2vw at 91.4% 80.5%, rgba(255, 244, 214, 0.5), rgba(255, 226, 168, 0.22) 42%, rgba(255, 210, 140, 0) 78%),
    /* lamp cone: soft wedge from the shade down toward the cushion */
    conic-gradient(from 203deg at 91.7% 78.7%, rgba(255, 214, 148, 0) 0deg, rgba(255, 216, 150, 0.16) 15deg 27deg, rgba(255, 214, 148, 0) 43deg),
    /* the warm pool the bulb throws across the desktop toward the cat */
    radial-gradient(ellipse 20vw 9vh at 82% 88%, rgba(255, 198, 128, 0.16), rgba(255, 198, 128, 0) 74%),
    /* lamp wall bloom climbing the right wall */
    radial-gradient(ellipse 24vw 28vh at 84% 58%, rgba(255, 184, 114, 0.15), rgba(255, 184, 114, 0) 70%),
    /* the room breathes warm — a broad amber haze filling the center-right
       air so the wall reads as lit plaster, not a void */
    radial-gradient(ellipse 58vw 62vh at 66% 56%, rgba(236, 150, 92, 0.11), rgba(236, 150, 92, 0) 76%),
    /* upper-wall warmth — a soft lamp bounce washing the dead upper-center
       so the top of the frame reads as lit plaster catching the god-rays */
    radial-gradient(ellipse 52vw 34vh at 52% 20%, rgba(228, 154, 96, 0.075), rgba(228, 154, 96, 0) 74%),
    /* wide warm ambient around the desk */
    radial-gradient(ellipse 46vw 60vh at 88% 78%, rgba(240, 160, 90, 0.07), rgba(240, 160, 90, 0) 78%),
    /* window cool fill on the left wall */
    radial-gradient(ellipse 22vw 30vh at 12% 32%, rgba(150, 180, 225, 0.10), rgba(150, 180, 225, 0) 72%),
    /* a cool counter-breath reaching from the window toward mid-room so
       the temperature story crosses the whole wall, not just the edges */
    radial-gradient(ellipse 40vw 44vh at 33% 40%, rgba(126, 158, 208, 0.05), rgba(126, 158, 208, 0) 78%),
    /* window light pooling on the floor */
    radial-gradient(ellipse 18vw 12vh at 14% 90%, rgba(150, 180, 225, 0.06), rgba(150, 180, 225, 0) 74%),
    /* PLASTER WALL — a faint painterly mottle + a picture-rail line high on
       the wall, so the flat field gains tooth and architecture. Coarse and
       low-alpha (L6-safe), tiled large. */
    url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'><defs><radialGradient id='m1' cx='30%25' cy='28%25' r='60%25'><stop offset='0' stop-color='%23ffffff' stop-opacity='.018'/><stop offset='1' stop-color='%23ffffff' stop-opacity='0'/></radialGradient><radialGradient id='m2' cx='72%25' cy='66%25' r='55%25'><stop offset='0' stop-color='%23000000' stop-opacity='.03'/><stop offset='1' stop-color='%23000000' stop-opacity='0'/></radialGradient></defs><rect width='600' height='600' fill='url(%23m1)'/><rect width='600' height='600' fill='url(%23m2)'/></svg>") center / 620px 620px repeat,
    /* the ceiling falls away */
    linear-gradient(180deg, rgba(8, 5, 8, 0.5) 0%, rgba(8, 5, 8, 0) 11%),
    /* a warm picture-rail band high on the wall grounds the architecture,
       with a thin lit lip on top where the god-rays catch the moulding */
    linear-gradient(180deg, rgba(70, 44, 30, 0) 15.1%, rgba(150, 104, 62, 0.16) 15.5%, rgba(120, 80, 46, 0.2) 16%, rgba(56, 36, 22, 0.2) 16.9%, rgba(70, 44, 30, 0) 17.8%),
    /* the floor falls to dark under the names */
    linear-gradient(180deg, rgba(8, 5, 7, 0) 70%, rgba(8, 5, 7, 0.42) 100%);
}

/* ═══ THE CITY — what the room looks out at. One SVG sized exactly to
   the glass hole in the frame layer: moon with a quiet halo, two rows
   of skyline, a handful of windows still lit (someone else is up too),
   a beacon on the tallest tower, sodium haze low over the rooftops.
   STATIC, promoted; the fine lit-window dots live at the far left edge,
   never in the text lane. ---- */
html::after {
  content: "";
  display: var(--lofi-scenery, block);
  position: fixed;
  left: calc(2vw + 32px);
  top: calc(10vh + 32px);
  width: 336px;
  height: 368px;
  z-index: -4;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 336 368' preserveAspectRatio='none'><defs><linearGradient id='sky' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%232b3d64'/><stop offset='.4' stop-color='%231d2c4b'/><stop offset='.72' stop-color='%23121d34'/><stop offset='1' stop-color='%230c1426'/></linearGradient><radialGradient id='mh' cx='50%25' cy='50%25' r='50%25'><stop offset='0' stop-color='%23eef2fb' stop-opacity='.42'/><stop offset='.45' stop-color='%23dfe6f2' stop-opacity='.14'/><stop offset='1' stop-color='%23dfe6f2' stop-opacity='0'/></radialGradient><radialGradient id='moon' cx='38%25' cy='34%25' r='68%25'><stop offset='0' stop-color='%23fbfcff'/><stop offset='.55' stop-color='%23e7edf8'/><stop offset='.85' stop-color='%23cdd6e6'/><stop offset='1' stop-color='%23b6c0d4'/></radialGradient><radialGradient id='moonwarm' cx='72%25' cy='72%25' r='60%25'><stop offset='0' stop-color='%23ffe8c4' stop-opacity='0'/><stop offset='.7' stop-color='%23ffdcae' stop-opacity='0'/><stop offset='1' stop-color='%23f6c98c' stop-opacity='.4'/></radialGradient><radialGradient id='sodium' cx='50%25' cy='100%25' r='95%25'><stop offset='0' stop-color='%23f4b06a' stop-opacity='.26'/><stop offset='.55' stop-color='%23e88a56' stop-opacity='.08'/><stop offset='1' stop-color='%23e88a56' stop-opacity='0'/></radialGradient><linearGradient id='haze' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%232a3c5e' stop-opacity='0'/><stop offset='1' stop-color='%233a4d70' stop-opacity='.55'/></linearGradient><linearGradient id='near' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%230e1728'/><stop offset='1' stop-color='%23060a15'/></linearGradient><linearGradient id='mid' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%2319263f'/><stop offset='1' stop-color='%230f182d'/></linearGradient><linearGradient id='far' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%23243652'/><stop offset='1' stop-color='%231a2942'/></linearGradient><linearGradient id='sheen' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%23bcd2ee' stop-opacity='0'/><stop offset='.42' stop-color='%23cfe0f2' stop-opacity='.09'/><stop offset='.52' stop-color='%23e2eefb' stop-opacity='.14'/><stop offset='.62' stop-color='%23cfe0f2' stop-opacity='.05'/><stop offset='1' stop-color='%23bcd2ee' stop-opacity='0'/></linearGradient></defs><rect width='336' height='368' fill='url(%23sky)'/><ellipse cx='168' cy='368' rx='250' ry='100' fill='url(%23sodium)'/><g fill='%23eef2fb'><circle cx='200' cy='40' r='1.1' opacity='.75'/><circle cx='252' cy='66' r='1.3' opacity='.85'/><circle cx='300' cy='34' r='1' opacity='.6'/><circle cx='158' cy='100' r='.9' opacity='.55'/><circle cx='278' cy='116' r='1' opacity='.6'/><circle cx='226' cy='24' r='.8' opacity='.5'/><circle cx='134' cy='52' r='.9' opacity='.5'/><circle cx='312' cy='90' r='.8' opacity='.45'/></g><circle cx='84' cy='70' r='46' fill='url(%23mh)'/><circle cx='84' cy='70' r='20' fill='url(%23moon)'/><circle cx='84' cy='70' r='20' fill='url(%23moonwarm)'/><g fill='%23b3bdd2' opacity='.55'><circle cx='78' cy='63' r='3.4'/><circle cx='90' cy='78' r='2.4'/><circle cx='88' cy='60' r='1.8'/><circle cx='75' cy='75' r='1.5'/></g><path d='M70 62 A20 20 0 0 1 92 60' stroke='%23ffffff' stroke-opacity='.5' stroke-width='1.6' fill='none' stroke-linecap='round'/><circle cx='84' cy='70' r='20' fill='none' stroke='%23f0f5ff' stroke-opacity='.35' stroke-width='.8'/><circle cx='75' cy='61' r='2.6' fill='%23ffffff' opacity='.85'/><path d='M75 55 L75 67 M69 61 L81 61' stroke='%23ffffff' stroke-opacity='.4' stroke-width='1' stroke-linecap='round'/><g fill='url(%23far)' opacity='.66'><rect x='0' y='196' width='30' height='172'/><rect x='36' y='210' width='24' height='158'/><rect x='66' y='184' width='34' height='184'/><rect x='108' y='206' width='22' height='162'/><rect x='136' y='190' width='36' height='178'/><rect x='180' y='202' width='26' height='166'/><rect x='212' y='176' width='34' height='192'/><rect x='252' y='210' width='24' height='158'/><rect x='282' y='196' width='28' height='172'/><rect x='316' y='210' width='20' height='158'/></g><path d='M223 176 h6 v-10 h-2 v-8 h-2 v8 h-2 Z' fill='url(%23far)' opacity='.66'/><rect x='0' y='176' width='336' height='120' fill='url(%23haze)' opacity='.6'/><g fill='%23ffd9a0' opacity='.42'><rect x='74' y='200' width='3.5' height='4.5'/><rect x='86' y='220' width='3.5' height='4.5'/><rect x='146' y='210' width='3.5' height='4.5'/><rect x='222' y='192' width='3.5' height='4.5'/><rect x='230' y='214' width='3.5' height='4.5'/><rect x='292' y='214' width='3.5' height='4.5'/><rect x='10' y='214' width='3.5' height='4.5'/><rect x='46' y='232' width='3.5' height='4.5'/><rect x='158' y='226' width='3.5' height='4.5'/></g><g fill='url(%23mid)'><rect x='0' y='234' width='40' height='134'/><rect x='44' y='250' width='30' height='118'/><rect x='78' y='222' width='46' height='146'/><rect x='128' y='252' width='28' height='116'/><rect x='160' y='236' width='40' height='132'/><rect x='206' y='246' width='36' height='122'/><rect x='248' y='224' width='40' height='144'/><rect x='294' y='248' width='42' height='120'/></g><path d='M95 222 h12 v-9 h-12 Z' fill='url(%23mid)'/><rect x='170' y='226' width='4' height='10' fill='url(%23mid)'/><path d='M262 224 l6 -12 l6 12 Z' fill='url(%23mid)'/><g fill='%23ffcf88' opacity='.66'><rect x='8' y='244' width='4' height='5.5'/><rect x='22' y='262' width='4' height='5.5'/><rect x='90' y='236' width='4' height='5.5'/><rect x='104' y='256' width='4' height='5.5'/><rect x='170' y='250' width='4' height='5.5'/><rect x='216' y='260' width='4' height='5.5'/><rect x='258' y='240' width='4' height='5.5'/><rect x='270' y='262' width='4' height='5.5'/><rect x='306' y='262' width='4' height='5.5'/></g><rect x='168' y='238' width='4' height='11' fill='%237fb0e0' opacity='.55'/><rect x='90' y='248' width='4' height='5.5' fill='%23ffe6b0' opacity='.85'/><rect x='231' y='190' width='3' height='36' fill='%2318263f'/><path d='M232.5 152 v40' stroke='%23223a5a' stroke-width='1.4'/><circle cx='232.5' cy='188' r='2.8' fill='%23ff6b5e' opacity='.95'/><circle cx='232.5' cy='188' r='7' fill='%23ff6b5e' opacity='.24'/><circle cx='232.5' cy='152' r='1.6' fill='%23ffd9a0' opacity='.7'/><g fill='url(%23near)'><rect x='0' y='286' width='48' height='82'/><rect x='52' y='304' width='38' height='64'/><rect x='94' y='272' width='54' height='96'/><rect x='150' y='308' width='30' height='60'/><rect x='184' y='288' width='46' height='80'/><rect x='234' y='298' width='42' height='70'/><rect x='280' y='270' width='46' height='98'/></g><rect x='108' y='262' width='26' height='10' fill='url(%23near)'/><path d='M112 262 v-8 h4 v8 M124 262 v-8 h4 v8' fill='url(%23near)'/><rect x='296' y='262' width='14' height='8' fill='url(%23near)'/><g fill='%23ffc46f' opacity='.85'><rect x='8' y='298' width='5' height='6.5'/><rect x='24' y='314' width='5' height='6.5'/><rect x='104' y='288' width='5' height='6.5'/><rect x='118' y='308' width='5' height='6.5'/><rect x='196' y='302' width='5' height='6.5'/><rect x='244' y='312' width='5' height='6.5'/><rect x='292' y='284' width='5' height='6.5'/><rect x='304' y='306' width='5' height='6.5'/></g><rect x='103' y='288' width='5' height='6.5' fill='%23ffe0a8' opacity='.98'/><rect x='103' y='298' width='5' height='6.5' fill='%23ffcf88' opacity='.6'/><rect x='196' y='314' width='5' height='6.5' fill='%236fa8de' opacity='.7'/><rect x='34' y='300' width='5' height='6.5' fill='%23ffd898' opacity='.5'/><rect x='262' y='300' width='5' height='6.5' fill='%23ffc46f' opacity='.7'/><rect x='0' y='176' width='336' height='192' fill='url(%23sheen)'/><g stroke='%23c9dbf2' stroke-opacity='.16' stroke-width='1' stroke-linecap='round'><path d='M52 40 l-7 22'/><path d='M128 30 l-6 20'/><path d='M204 46 l-7 24'/><path d='M286 54 l-6 20'/><path d='M170 22 l-5 18'/></g><g fill='%23dbe8fb' opacity='.2'><circle cx='60' cy='104' r='1.4'/><circle cx='150' cy='128' r='1.6'/><circle cx='250' cy='96' r='1.3'/><circle cx='300' cy='140' r='1.5'/></g></svg>") 0 0 / 100% 100% no-repeat;
}

/* ═══ city twinkle — three more windows across the street breathing on
   a small overlay box (inside the glass, off-lane). steps(1) opacity,
   ~0.5 paints/s; not a continuous mover, so no will-change spent. */
head meta { display: var(--lofi-scenery, block); }
head meta:first-of-type::after {
  content: "";
  display: var(--lofi-scenery, block);
  position: fixed;
  left: calc(2vw + 52px);
  top: calc(10vh + 230px);
  width: 280px;
  height: 150px;
  z-index: -3;
  pointer-events: none;
  opacity: 0.9;
  background:
    radial-gradient(ellipse 4px 5px at 40px 30px, rgba(255, 209, 136, 0.75), rgba(255, 209, 136, 0) 80%),
    radial-gradient(ellipse 4px 5px at 158px 18px, rgba(255, 196, 111, 0.7), rgba(255, 196, 111, 0) 80%),
    radial-gradient(ellipse 5px 6px at 236px 92px, rgba(255, 209, 136, 0.65), rgba(255, 209, 136, 0) 80%);
  animation: lofi-city 9s steps(1, end) infinite;
}

/* ═══ THE RAIN — soft vertical dashes over the glass ONLY (window sits
   at the far left, off the text lane; L6). The tile repeats every 48px
   and the layer overscans 48px above the glass, so the steps() fall
   never opens a gap; the bottom spill hides behind the frame's deep
   rail + sill, which paint on top (z -1 over z -2). ~2.9 hops/s. */
head::after {
  content: "";
  display: var(--lofi-scenery, block);
  position: fixed;
  left: calc(2vw + 32px);
  top: calc(10vh - 16px);
  width: 336px;
  height: 416px;
  z-index: -2;
  pointer-events: none;
  background-image:
    radial-gradient(ellipse 2px 11px at 14px 12px, rgba(205, 222, 246, 0.30), rgba(205, 222, 246, 0) 70%),
    radial-gradient(ellipse 1.7px 9px at 40px 34px, rgba(178, 198, 228, 0.22), rgba(178, 198, 228, 0) 70%),
    radial-gradient(ellipse 2.4px 14px at 66px 22px, rgba(215, 230, 250, 0.15), rgba(215, 230, 250, 0) 70%);
  background-size: 56px 48px, 88px 48px, 104px 48px;
  background-repeat: repeat;
  animation: lofi-rain 1.4s steps(4, end) infinite;
}

/* ═══ WINDOW FRAME + THE DESK — the room's furniture on one static,
   promoted, unmasked layer (two SVG props in one paint). The frame's
   rail and sill cover the rain layer's overscan; the desk carries the
   whole right side: wall clock at 2:47, the book stack wearing the
   headphones, tea, the cat's cushion waiting, the plant, and the lamp
   itself — every object shadowed on the wood and rimmed from the lamp
   side, with the warm pool painted onto the desktop. */
head meta:first-of-type::before {
  content: "";
  display: var(--lofi-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background-image:
    url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 470'><defs><linearGradient id='wd' x1='0' y1='0' x2='1' y2='.3'><stop offset='0' stop-color='%234a3327'/><stop offset='.5' stop-color='%23392820'/><stop offset='1' stop-color='%23271b15'/></linearGradient><linearGradient id='wdrail' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%23654832'/><stop offset='.5' stop-color='%234a3426'/><stop offset='1' stop-color='%232e2016'/></linearGradient><linearGradient id='beam' x1='0' y1='0' x2='.5' y2='1'><stop offset='0' stop-color='%23dfe8fa' stop-opacity='.16'/><stop offset='.55' stop-color='%23c3d2ee' stop-opacity='.06'/><stop offset='1' stop-color='%23c3d2ee' stop-opacity='0'/></linearGradient><linearGradient id='glasssheen' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%23aec4e8' stop-opacity='.1'/><stop offset='.5' stop-color='%23aec4e8' stop-opacity='0'/></linearGradient><linearGradient id='pot2' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='%237a3a24'/><stop offset='.5' stop-color='%23b45c36'/><stop offset='1' stop-color='%2388431f'/></linearGradient><radialGradient id='cac' cx='38%25' cy='30%25' r='80%25'><stop offset='0' stop-color='%235c8a52'/><stop offset='1' stop-color='%23335f34'/></radialGradient></defs><path d='M64 32 L150 32 L104 400 L52 400 Z' fill='url(%23beam)'/><path d='M168 32 L196 32 L150 400 L128 400 Z' fill='url(%23beam)' opacity='.6'/><path d='M32 300 L200 32 L280 32 L32 380 Z' fill='url(%23glasssheen)'/><path fill-rule='evenodd' d='M6 6 H394 V436 H6 Z M32 32 H368 V400 H32 Z' fill='url(%23wd)'/><rect x='6' y='6' width='388' height='430' fill='none' stroke='%231a120d' stroke-width='2'/><rect x='30' y='30' width='340' height='372' fill='none' stroke='%2318100b' stroke-width='4'/><rect x='34' y='34' width='332' height='364' fill='none' stroke='%236e5137' stroke-opacity='.4' stroke-width='1.5'/><g stroke='%237a5a3c' stroke-opacity='.16' fill='none'><path d='M14 40 V420'/><path d='M20 40 V420'/><path d='M380 40 V420'/><path d='M386 40 V420'/><path d='M40 14 H360'/><path d='M40 22 H360'/></g><rect x='195' y='32' width='10' height='368' fill='%232f221a'/><path d='M196.5 32 V400' stroke='%235e4331' stroke-opacity='.5' stroke-width='1.5'/><path d='M203.5 32 V400' stroke='%23120c08' stroke-opacity='.5' stroke-width='1.2'/><rect x='32' y='211' width='336' height='10' fill='%232f221a'/><path d='M32 212.5 H368' stroke='%235e4331' stroke-opacity='.5' stroke-width='1.5'/><path d='M32 219 H368' stroke='%23120c08' stroke-opacity='.5' stroke-width='1.2'/><path d='M392 10 V434' stroke='%23f4b96a' stroke-opacity='.16' stroke-width='2'/><path d='M368 34 V398' stroke='%23f4b96a' stroke-opacity='.1' stroke-width='1.5'/><rect x='0' y='436' width='400' height='13' fill='url(%23wdrail)'/><path d='M0 436 H400' stroke='%23a07750' stroke-opacity='.55' stroke-width='1.6'/><rect x='0' y='449' width='400' height='15' fill='%2331221a'/><rect x='10' y='464' width='380' height='8' fill='%23231710'/><path d='M0 449 H400' stroke='%23120c08' stroke-opacity='.6' stroke-width='1'/><ellipse cx='60' cy='436' rx='30' ry='5' fill='%23120b08' opacity='.4'/><path d='M44 436 L76 436 L71 410 L49 410 Z' fill='url(%23pot2)'/><rect x='46' y='403' width='30' height='9' rx='2' fill='%23bd6a44'/><path d='M46 403 h30' stroke='%23dd8a5e' stroke-opacity='.6' stroke-width='1.3'/><path d='M72 406 L69 434' stroke='%23f4b96a' stroke-opacity='.3' stroke-width='1.4'/><rect x='53' y='372' width='14' height='36' rx='7' fill='url(%23cac)'/><path d='M65 388 q11 -1 11 -12 l0 -5' stroke='url(%23cac)' stroke-width='7' fill='none' stroke-linecap='round'/><path d='M56 376 v30' stroke='%23a9c2df' stroke-opacity='.28' stroke-width='1.3'/><g stroke='%23cfe0c8' stroke-opacity='.4' stroke-width='.8'><path d='M53 380 h-2 M53 388 h-2 M53 396 h-2 M67 380 h2 M67 388 h2 M67 396 h2'/></g><circle cx='60' cy='370' r='3' fill='%23e58aa0'/></svg>"),
    url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 680 340'><defs><linearGradient id='dt' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%237a5540'/><stop offset='.4' stop-color='%235f4230'/><stop offset='1' stop-color='%23412d21'/></linearGradient><linearGradient id='df' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%232a1f18'/><stop offset='1' stop-color='%23130d09'/></linearGradient><linearGradient id='deskedge' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='%23b98757' stop-opacity='.05'/><stop offset='.55' stop-color='%23d69a5e' stop-opacity='.35'/><stop offset='1' stop-color='%23ffce8a' stop-opacity='.85'/></linearGradient><radialGradient id='pool' cx='50%25' cy='42%25' r='58%25'><stop offset='0' stop-color='%23ffd79b' stop-opacity='.34'/><stop offset='.45' stop-color='%23f6b877' stop-opacity='.16'/><stop offset='1' stop-color='%23f6b877' stop-opacity='0'/></radialGradient><linearGradient id='cone' x1='.72' y1='0' x2='.12' y2='1'><stop offset='0' stop-color='%23fff0cf' stop-opacity='.4'/><stop offset='.5' stop-color='%23ffd493' stop-opacity='.12'/><stop offset='1' stop-color='%23ffd493' stop-opacity='0'/></linearGradient><radialGradient id='bulb' cx='50%25' cy='50%25' r='50%25'><stop offset='0' stop-color='%23fffdf4'/><stop offset='.3' stop-color='%23fff0cf'/><stop offset='.7' stop-color='%23ffd493' stop-opacity='.85'/><stop offset='1' stop-color='%23ffd493' stop-opacity='0'/></radialGradient><linearGradient id='shade' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%233f7264'/><stop offset='.5' stop-color='%23285049'/><stop offset='1' stop-color='%23122824'/></linearGradient><linearGradient id='shadespec' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='%23bfe8dc' stop-opacity='0'/><stop offset='.5' stop-color='%23d3f2e8' stop-opacity='.75'/><stop offset='1' stop-color='%23bfe8dc' stop-opacity='0'/></linearGradient><linearGradient id='arm' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='%23152a26'/><stop offset='.5' stop-color='%23386a5f'/><stop offset='1' stop-color='%231a332e'/></linearGradient><linearGradient id='mug' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='%236f3d42'/><stop offset='.38' stop-color='%23b56a6e'/><stop offset='.62' stop-color='%23cc7d80'/><stop offset='1' stop-color='%23854a4e'/></linearGradient><linearGradient id='pot' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='%23803c26'/><stop offset='.45' stop-color='%23c06439'/><stop offset='.75' stop-color='%23d27445'/><stop offset='1' stop-color='%238f4227'/></linearGradient><linearGradient id='cushtop' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%23c98fa6'/><stop offset='1' stop-color='%238a5a70'/></linearGradient><linearGradient id='bkA' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%23a5474a'/><stop offset='1' stop-color='%237c3033'/></linearGradient><linearGradient id='bkB' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%23c69a42'/><stop offset='1' stop-color='%23977128'/></linearGradient><linearGradient id='bkC' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%234f7576'/><stop offset='1' stop-color='%2332514f'/></linearGradient><linearGradient id='bkD' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%236a5680'/><stop offset='1' stop-color='%2348395c'/></linearGradient><linearGradient id='hb' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%23c9d2dc'/><stop offset='.5' stop-color='%236d7681'/><stop offset='1' stop-color='%232f353d'/></linearGradient><radialGradient id='leaf' cx='40%25' cy='28%25' r='80%25'><stop offset='0' stop-color='%235f8664'/><stop offset='1' stop-color='%23335140'/></radialGradient></defs><path d='M8 236 L680 222 L680 250 L4 266 Z' fill='url(%23dt)'/><path d='M8 236 L680 222' stroke='url(%23deskedge)' stroke-width='2.5'/><path d='M4 266 L680 250 L680 340 L4 340 Z' fill='url(%23df)'/><g stroke='%23120c08' stroke-opacity='.5' fill='none'><path d='M40 250 L660 236' stroke-width='1.6'/><path d='M40 290 L660 276' stroke-width='2'/><path d='M120 320 L640 308' stroke-width='1.4' stroke-opacity='.35'/></g><g stroke='%23a97a52' stroke-opacity='.12' fill='none'><path d='M60 246 L650 232'/><path d='M60 258 L400 250'/></g><ellipse cx='430' cy='236' rx='210' ry='34' fill='url(%23pool)'/><ellipse cx='500' cy='234' rx='70' ry='16' fill='url(%23pool)'/><g fill='%23100a08' opacity='.48'><ellipse cx='132' cy='240' rx='80' ry='8'/><ellipse cx='274' cy='240' rx='30' ry='5.5'/><ellipse cx='402' cy='240' rx='92' ry='9'/><ellipse cx='534' cy='242' rx='40' ry='6.5'/><ellipse cx='620' cy='240' rx='40' ry='6.5'/></g><rect x='66' y='214' width='138' height='24' rx='3' fill='url(%23bkA)'/><rect x='188' y='217' width='12' height='18' fill='%23e6d3ac'/><g stroke='%23cbb890' stroke-opacity='.7' stroke-width='.8'><path d='M190 220 h9'/><path d='M190 224 h9'/><path d='M190 228 h9'/><path d='M190 232 h9'/></g><path d='M78 220 h96' stroke='%23e7c58f' stroke-opacity='.4' stroke-width='2'/><path d='M78 232 h70' stroke='%23e7c58f' stroke-opacity='.25' stroke-width='1.4'/><path d='M66 214 h138' stroke='%23c9686b' stroke-opacity='.5' stroke-width='1.2'/><circle cx='70' cy='236' r='2.2' fill='%23120c08' opacity='.4'/><rect x='76' y='194' width='120' height='20' rx='3' fill='url(%23bkB)'/><rect x='180' y='197' width='12' height='14' fill='%23efdcae'/><g stroke='%23cbb890' stroke-opacity='.7' stroke-width='.8'><path d='M182 200 h9'/><path d='M182 204 h9'/><path d='M182 208 h9'/></g><path d='M88 200 h92' stroke='%23f2e0a4' stroke-opacity='.55' stroke-width='1.8'/><path d='M88 208 h60' stroke='%23f2e0a4' stroke-opacity='.3' stroke-width='1.2'/><path d='M76 194 h120' stroke='%23e0b862' stroke-opacity='.6' stroke-width='1'/><rect x='72' y='175' width='126' height='19' rx='3' fill='url(%23bkC)'/><rect x='184' y='178' width='12' height='13' fill='%23d8e2d6'/><g stroke='%23bcd0c4' stroke-opacity='.6' stroke-width='.8'><path d='M186 181 h9'/><path d='M186 185 h9'/><path d='M186 189 h9'/></g><path d='M84 181 h94' stroke='%23bfe0d0' stroke-opacity='.4' stroke-width='1.6'/><path d='M72 175 h126' stroke='%2368908c' stroke-opacity='.6' stroke-width='1'/><rect x='88' y='158' width='98' height='17' rx='3' fill='url(%23bkD)'/><rect x='172' y='161' width='11' height='11' fill='%23dcd0e6'/><g stroke='%23c3b6d4' stroke-opacity='.6' stroke-width='.8'><path d='M174 164 h8'/><path d='M174 168 h8'/></g><path d='M100 164 h70' stroke='%23c9b6e0' stroke-opacity='.4' stroke-width='1.5'/><path d='M88 158 h98' stroke='%238b76a8' stroke-opacity='.6' stroke-width='1'/><path d='M204 214 v24 M196 194 v20 M198 175 v19 M186 158 v17' stroke='%23ffd79b' stroke-opacity='.45' stroke-width='1.6'/><path d='M104 158 Q140 112 178 150' fill='none' stroke='url(%23hb)' stroke-width='8' stroke-linecap='round'/><path d='M108 154 Q140 118 172 150' fill='none' stroke='%23dfe6ee' stroke-opacity='.5' stroke-width='2' stroke-linecap='round'/><g><ellipse cx='103' cy='160' rx='12' ry='15' fill='%231d1720' transform='rotate(-14 103 160)'/><ellipse cx='103' cy='160' rx='6.5' ry='9' fill='%230f0b12' transform='rotate(-14 103 160)'/><path d='M96 150 a13 15 0 0 1 4 -4' stroke='%236a7480' stroke-opacity='.6' stroke-width='2' fill='none' transform='rotate(-14 103 160)'/></g><g><ellipse cx='178' cy='152' rx='12' ry='15' fill='%231d1720' transform='rotate(12 178 152)'/><ellipse cx='178' cy='152' rx='6.5' ry='9' fill='%230f0b12' transform='rotate(12 178 152)'/><path d='M184 148 a13 15 0 0 1 -2 8' stroke='%23ffd79b' stroke-opacity='.4' stroke-width='2' fill='none' transform='rotate(12 178 152)'/></g><path d='M98 172 C86 200 104 210 92 236' fill='none' stroke='%23151016' stroke-width='2.6'/><path d='M300 202 q20 7 2 27' fill='none' stroke='%23a5595c' stroke-width='8'/><path d='M300 203 q15 6 2 24' fill='none' stroke='%23d68f92' stroke-opacity='.5' stroke-width='2.5'/><rect x='250' y='196' width='50' height='44' rx='8' fill='url(%23mug)'/><ellipse cx='275' cy='197' rx='25' ry='6.5' fill='%236a383d'/><ellipse cx='275' cy='196.5' rx='19' ry='4.5' fill='%232c1712'/><ellipse cx='273' cy='195.5' rx='13' ry='2.6' fill='%23120b08'/><path d='M258 202 q-2 18 3 34' stroke='%23e7b7b9' stroke-opacity='.55' stroke-width='3' fill='none'/><path d='M294 200 q3 20 -1 36' stroke='%23ffd79b' stroke-opacity='.45' stroke-width='2' fill='none'/><path d='M270 216 c-3 -4.5 -10 -1 -6.5 4.5 c2.2 3.5 6.5 5.5 6.5 5.5 c0 0 4.3 -2 6.5 -5.5 c3.5 -5.5 -3.5 -9 -6.5 -4.5 Z' fill='%23f2c9c2' opacity='.85'/><ellipse cx='402' cy='232' rx='88' ry='17' fill='%236b3f52'/><ellipse cx='402' cy='226' rx='84' ry='15' fill='url(%23cushtop)'/><ellipse cx='402' cy='224' rx='58' ry='9' fill='%237a4d63' opacity='.55'/><path d='M328 226 Q402 240 476 226' stroke='%23593546' stroke-width='1.6' fill='none' opacity='.7'/><path d='M348 220 Q402 210 456 220' stroke='%23d9a8bd' stroke-opacity='.5' stroke-width='1.4' fill='none'/><circle cx='402' cy='224' r='3' fill='%23593546'/><path d='M456 219 q16 5 20 10' stroke='%23ffd79b' stroke-opacity='.4' stroke-width='1.6' fill='none'/><path d='M512 236 L556 236 L563 200 L505 200 Z' fill='url(%23pot)'/><ellipse cx='534' cy='200' rx='29' ry='5.5' fill='%236a2f1d'/><rect x='503' y='194' width='62' height='9' rx='3' fill='%23c26a3f'/><path d='M503 194 h62' stroke='%23e39160' stroke-opacity='.6' stroke-width='1.4'/><rect x='503' y='194' width='62' height='9' rx='3' fill='none'/><ellipse cx='534' cy='199' rx='24' ry='3.5' fill='%232c1a10'/><path d='M560 200 L554 234' stroke='%23ffd79b' stroke-opacity='.4' stroke-width='1.6'/><g stroke='%232f4a37' stroke-width='5' fill='none' stroke-linecap='round'><path d='M534 198 C531 168 520 148 504 135'/><path d='M534 198 C539 158 550 138 570 124'/><path d='M534 198 C532 148 528 126 534 104'/><path d='M534 192 C520 172 512 166 500 162'/><path d='M534 192 C548 174 558 168 570 164'/><path d='M534 196 C536 174 540 158 548 146'/></g><g><ellipse cx='500' cy='131' rx='18' ry='9.5' fill='url(%23leaf)' transform='rotate(-34 500 131)'/><ellipse cx='572' cy='120' rx='19' ry='9.5' fill='url(%23leaf)' transform='rotate(30 572 120)'/><ellipse cx='534' cy='100' rx='10.5' ry='18' fill='url(%23leaf)'/><ellipse cx='498' cy='160' rx='14' ry='7.5' fill='url(%23leaf)' transform='rotate(-22 498 160)'/><ellipse cx='572' cy='162' rx='14' ry='7.5' fill='url(%23leaf)' transform='rotate(22 572 162)'/><ellipse cx='550' cy='143' rx='12' ry='6.5' fill='url(%23leaf)' transform='rotate(34 550 143)'/></g><g stroke='%2337593f' stroke-width='1' fill='none' opacity='.7'><path d='M500 131 l-13 -6 M500 131 l12 5' transform='rotate(-34 500 131)'/><path d='M572 120 l13 -5 M572 120 l-12 5' transform='rotate(30 572 120)'/><path d='M534 100 v-15 M534 100 v15'/></g><g stroke='%237fae7f' stroke-opacity='.4' stroke-width='1.3' fill='none'><path d='M579 116 q7 5 5 12'/><path d='M540 88 q5 7 2 15'/></g><ellipse cx='622' cy='232' rx='34' ry='8' fill='%231a2c28'/><ellipse cx='622' cy='229' rx='34' ry='8' fill='%23294c45'/><ellipse cx='622' cy='227' rx='24' ry='5' fill='%233a6a5f' opacity='.7'/><path d='M600 224 A34 8 0 0 1 610 234' stroke='%23ffd79b' stroke-opacity='.42' stroke-width='2' fill='none' stroke-linecap='round'/><ellipse cx='612' cy='225' rx='4' ry='1.6' fill='%23fff1d4' opacity='.7'/><path d='M619 228 L592 156' stroke='url(%23arm)' stroke-width='8' stroke-linecap='round'/><path d='M592 156 L520 116' stroke='url(%23arm)' stroke-width='7' stroke-linecap='round'/><circle cx='592' cy='156' r='6' fill='%231a332e'/><circle cx='592' cy='156' r='2.4' fill='%233a6a5f'/><circle cx='520' cy='116' r='6' fill='%231a332e'/><path d='M616 224 L590 156' stroke='%23ffe0b4' stroke-opacity='.55' stroke-width='2.2' stroke-linecap='round'/><path d='M589 155 L521 116' stroke='%23ffe0b4' stroke-opacity='.5' stroke-width='2' stroke-linecap='round'/><circle cx='590' cy='154' r='1.8' fill='%23fff1d4' opacity='.75'/><path d='M508 150 L452 234 L556 234 L544 150 Z' fill='url(%23cone)' opacity='.8'/><path d='M512 152 L474 232 L536 232 L538 152 Z' fill='url(%23cone)' opacity='.55'/><g transform='rotate(38 518 116)'><path d='M490 96 Q518 72 546 96 L558 138 L478 138 Z' fill='url(%23shade)'/><path d='M490 96 Q518 72 546 96' fill='none' stroke='%23cff1e6' stroke-opacity='.6' stroke-width='2'/><path d='M496 100 Q518 82 540 100 L548 132 L488 132 Z' fill='url(%23shadespec)' opacity='.5'/><ellipse cx='518' cy='138' rx='40' ry='10' fill='%23fff3da'/><ellipse cx='518' cy='138' rx='26' ry='6' fill='url(%23bulb)'/></g><circle cx='494' cy='158' r='40' fill='url(%23bulb)' opacity='.42'/></svg>");
  background-position: left 2vw top 10vh, right 0 bottom 0;
  background-size: 400px 470px, 680px 340px;
  background-repeat: no-repeat, no-repeat;
}

/* ═══ sticky notes on the wall between window and lane — the journal's
   older pages: scribbled reminders, a checked-off list, one small heart.
   STATIC, low foreground. */
body::before {
  content: "";
  display: var(--lofi-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background:
    url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 120'><defs><radialGradient id='glow' cx='50%25' cy='50%25' r='50%25'><stop offset='0' stop-color='%23ffe9b8'/><stop offset='.4' stop-color='%23ffcf7e' stop-opacity='.9'/><stop offset='1' stop-color='%23ffcf7e' stop-opacity='0'/></radialGradient><radialGradient id='bulb2' cx='42%25' cy='34%25' r='62%25'><stop offset='0' stop-color='%23fff6d8'/><stop offset='.5' stop-color='%23ffd27f'/><stop offset='1' stop-color='%23e79a3f'/></radialGradient></defs><path d='M0 18 C150 92 330 90 450 54 C580 16 760 26 900 78' fill='none' stroke='%231d1420' stroke-width='2.4' opacity='.75'/><g><g transform='translate(70,64)'><line x1='0' y1='-14' x2='0' y2='0' stroke='%231d1420' stroke-width='1.6'/><circle cx='0' cy='16' r='22' fill='url(%23glow)' opacity='.55'/><circle cx='0' cy='8' r='6.5' fill='url(%23bulb2)'/></g><g transform='translate(160,80)'><line x1='0' y1='-14' x2='0' y2='0' stroke='%231d1420' stroke-width='1.6'/><circle cx='0' cy='16' r='22' fill='url(%23glow)' opacity='.5'/><circle cx='0' cy='8' r='6' fill='url(%23bulb2)'/></g><g transform='translate(255,84)'><line x1='0' y1='-14' x2='0' y2='0' stroke='%231d1420' stroke-width='1.6'/><circle cx='0' cy='16' r='24' fill='url(%23glow)' opacity='.6'/><circle cx='0' cy='8' r='6.5' fill='url(%23bulb2)'/></g><g transform='translate(350,74)'><line x1='0' y1='-14' x2='0' y2='0' stroke='%231d1420' stroke-width='1.6'/><circle cx='0' cy='16' r='20' fill='url(%23glow)' opacity='.5'/><circle cx='0' cy='8' r='6' fill='url(%23bulb2)'/></g><g transform='translate(450,56)'><line x1='0' y1='-14' x2='0' y2='0' stroke='%231d1420' stroke-width='1.6'/><circle cx='0' cy='16' r='24' fill='url(%23glow)' opacity='.6'/><circle cx='0' cy='8' r='6.5' fill='url(%23bulb2)'/></g><g transform='translate(550,44)'><line x1='0' y1='-14' x2='0' y2='0' stroke='%231d1420' stroke-width='1.6'/><circle cx='0' cy='16' r='20' fill='url(%23glow)' opacity='.5'/><circle cx='0' cy='8' r='6' fill='url(%23bulb2)'/></g><g transform='translate(650,44)'><line x1='0' y1='-14' x2='0' y2='0' stroke='%231d1420' stroke-width='1.6'/><circle cx='0' cy='16' r='22' fill='url(%23glow)' opacity='.55'/><circle cx='0' cy='8' r='6.5' fill='url(%23bulb2)'/></g><g transform='translate(750,56)'><line x1='0' y1='-14' x2='0' y2='0' stroke='%231d1420' stroke-width='1.6'/><circle cx='0' cy='16' r='20' fill='url(%23glow)' opacity='.5'/><circle cx='0' cy='8' r='6' fill='url(%23bulb2)'/></g><g transform='translate(850,72)'><line x1='0' y1='-14' x2='0' y2='0' stroke='%231d1420' stroke-width='1.6'/><circle cx='0' cy='16' r='22' fill='url(%23glow)' opacity='.55'/><circle cx='0' cy='8' r='6.5' fill='url(%23bulb2)'/></g></g></svg>") left calc(2vw - 40px) top 1.5vh / 660px 110px no-repeat,
    url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 132 150'><defs><linearGradient id='fr' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%235a4436'/><stop offset='1' stop-color='%233a2a20'/></linearGradient><linearGradient id='ph' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%233b5566'/><stop offset='1' stop-color='%23243a49'/></linearGradient></defs><rect x='16' y='14' width='104' height='128' rx='3' fill='%23140d10' opacity='.4'/><rect x='12' y='10' width='104' height='128' rx='3' fill='url(%23fr)'/><rect x='12' y='10' width='104' height='128' rx='3' fill='none' stroke='%236b5240' stroke-opacity='.5' stroke-width='1.5'/><rect x='22' y='20' width='84' height='84' fill='url(%23ph)'/><circle cx='48' cy='42' r='11' fill='%23f0e2c0' opacity='.7'/><path d='M22 104 L46 74 L64 92 L82 68 L106 104 Z' fill='%231b2b34'/><path d='M22 104 L46 74 L64 92 L82 68 L106 104 Z' fill='%23f4b96a' opacity='.06'/><rect x='22' y='20' width='84' height='84' fill='none' stroke='%23f4b96a' stroke-opacity='.12' stroke-width='1'/><text x='64' y='126' font-family='Comic Sans MS, cursive' font-size='13' fill='%23c9b79b' text-anchor='middle' opacity='.7'>home</text><path d='M62 6 L70 6 L70 12 L62 12 Z' fill='%23e8e0ea' opacity='.5'/></svg>") left calc(2vw + 372px) top 6vh / 118px 134px no-repeat,
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 210 240'%3E%3Cg transform='rotate(-4 77 66)'%3E%3Crect x='22' y='14' width='114' height='108' fill='%23120b0e' opacity='.35'/%3E%3Crect x='18' y='10' width='114' height='108' fill='%23f2d987'/%3E%3Cpath d='M118 118 L132 118 L132 104 Z' fill='%23d9bd6d'/%3E%3Ctext x='75' y='52' font-family='Comic Sans MS, cursive' font-size='21' fill='%236b4f33' text-anchor='middle'%3Ehydrate!%3C/text%3E%3Cpath d='M36 72 q14 -6 28 0 q14 6 28 0 q10 -4 18 0' stroke='%236b4f33' stroke-opacity='.55' stroke-width='2.2' fill='none'/%3E%3Cpath d='M36 90 q18 -5 36 0 q16 5 30 0' stroke='%236b4f33' stroke-opacity='.4' stroke-width='2.2' fill='none'/%3E%3Crect x='56' y='2' width='44' height='15' fill='%23e8e0ea' opacity='.55'/%3E%3C/g%3E%3Cg transform='rotate(3 138 168)'%3E%3Crect x='88' y='120' width='104' height='100' fill='%23110b0d' opacity='.35'/%3E%3Crect x='84' y='116' width='104' height='100' fill='%23c9e2bd'/%3E%3Crect x='98' y='136' width='11' height='11' fill='none' stroke='%234a5c42' stroke-width='2'/%3E%3Cpath d='M99 141 l4 5 l7 -9' stroke='%234a5c42' stroke-width='2.4' fill='none'/%3E%3Cpath d='M118 143 h56' stroke='%234a5c42' stroke-opacity='.6' stroke-width='2.2'/%3E%3Crect x='98' y='162' width='11' height='11' fill='none' stroke='%234a5c42' stroke-width='2'/%3E%3Cpath d='M118 169 h48' stroke='%234a5c42' stroke-opacity='.6' stroke-width='2.2'/%3E%3Crect x='98' y='188' width='11' height='11' fill='none' stroke='%234a5c42' stroke-width='2'/%3E%3Cpath d='M118 195 h52' stroke='%234a5c42' stroke-opacity='.6' stroke-width='2.2'/%3E%3Crect x='122' y='108' width='40' height='14' fill='%23e8e0ea' opacity='.55'/%3E%3C/g%3E%3Cg transform='rotate(-7 46 175)'%3E%3Crect x='12' y='144' width='72' height='68' fill='%23110b0d' opacity='.35'/%3E%3Crect x='8' y='140' width='72' height='68' fill='%23eebbc4'/%3E%3Cpath d='M44 186 c-8 -10 -22 -2 -15 9 c5 8 15 12 15 12 c0 0 10 -4 15 -12 c7 -11 -7 -19 -15 -9 Z' fill='none' stroke='%238a4a56' stroke-width='2.6'/%3E%3C/g%3E%3C/svg%3E") left calc(2vw + 330px) top 20vh / 210px 240px no-repeat;
}

/* ═══ the lane: names must stay readable over the lamp's ambience, so
   the center column gets a quiet plum scrim — coarse, soft, STATIC. */
body::after {
  content: "";
  display: var(--lofi-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background: linear-gradient(90deg,
    rgba(18, 11, 15, 0) 18%, rgba(18, 11, 15, 0.38) 36%, rgba(18, 11, 15, 0.46) 50%,
    rgba(18, 11, 15, 0.38) 64%, rgba(18, 11, 15, 0) 82%);
}

/* ═══ tea steam curling off the mug — the ONLY continuous mover
   (small box, will-change count: 1). It rises, sways, thins, gone. */
head { display: var(--lofi-scenery, block); }
head::before {
  content: "";
  display: var(--lofi-scenery, block);
  position: fixed;
  right: 360px;
  bottom: 144px;
  width: 90px;
  height: 150px;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  /* the wisp catches the lamp's warmth low, cools as it climbs — three
     lobes stacked into a curling column, richer near the cup so it reads. */
  background:
    radial-gradient(ellipse 60% 34% at 52% 88%, rgba(255, 236, 206, 0.42) 0%, rgba(250, 230, 205, 0.18) 40%, rgba(250, 230, 205, 0) 66%),
    radial-gradient(ellipse 46% 30% at 38% 60%, rgba(244, 232, 214, 0.30) 0%, rgba(244, 232, 214, 0) 58%),
    radial-gradient(ellipse 40% 28% at 60% 34%, rgba(236, 228, 216, 0.22) 0%, rgba(236, 228, 216, 0) 56%),
    radial-gradient(ellipse 30% 22% at 46% 12%, rgba(232, 226, 216, 0.13) 0%, rgba(232, 226, 216, 0) 54%);
  will-change: transform;
  animation: lofi-steam 16s ease-in-out infinite;
}

/* ═══ THE CAT — asleep on her cushion in the lamp pool, ink-dark with
   a warm rim down her back where the light lands. STATIC; her tail is
   the separate layer below. Two little z's hang over her head. */
head meta:last-of-type::before {
  content: "";
  display: var(--lofi-scenery, block);
  position: fixed;
  right: 206px;
  bottom: 118px;
  width: 150px;
  height: 84px;
  z-index: 0;
  pointer-events: none;
  background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 84'><defs><radialGradient id='cbody' cx='62%25' cy='30%25' r='85%25'><stop offset='0' stop-color='%23383040'/><stop offset='.45' stop-color='%23272231'/><stop offset='1' stop-color='%23161320'/></radialGradient><radialGradient id='chead' cx='58%25' cy='34%25' r='75%25'><stop offset='0' stop-color='%233a3242'/><stop offset='.55' stop-color='%23282232'/><stop offset='1' stop-color='%23181420'/></radialGradient><linearGradient id='cear' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%23a5697e'/><stop offset='1' stop-color='%235e3a4c'/></linearGradient></defs><ellipse cx='74' cy='78' rx='60' ry='9' fill='%23120b14' opacity='.4'/><path d='M30 74 C9 63 11 33 35 23 C60 11 98 12 120 28 C140 43 141 63 122 73 C95 83 54 82 30 74 Z' fill='url(%23cbody)'/><path d='M40 70 C64 78 100 76 118 66' stroke='%23120d18' stroke-opacity='.5' stroke-width='3' fill='none'/><g stroke='%23453c50' stroke-opacity='.5' stroke-width='1' stroke-linecap='round' fill='none'><path d='M46 26 q3 -4 7 -3'/><path d='M60 22 q3 -4 7 -2'/><path d='M76 21 q4 -3 8 -1'/><path d='M92 24 q4 -3 8 0'/><path d='M106 30 q4 -2 7 1'/></g><path d='M38 25 C62 12 99 13 120 29 C139 44 140 62 123 72' stroke='%23f4b96a' stroke-opacity='.6' stroke-width='2.2' fill='none' stroke-linecap='round'/><path d='M120 30 C136 44 138 60 124 70' stroke='%23ffd79b' stroke-opacity='.35' stroke-width='1.4' fill='none' stroke-linecap='round'/><path d='M30 43 L25 25 L43 34 Z' fill='%23241f30'/><path d='M47 33 L53 15 L60 34 Z' fill='%23241f30'/><path d='M32 40 L29 29 L40 35 Z' fill='url(%23cear)' opacity='.55'/><path d='M49 33 L53 21 L57 33 Z' fill='url(%23cear)' opacity='.55'/><circle cx='44' cy='55' r='21' fill='url(%23chead)'/><path d='M58 48 C66 54 66 64 58 70' stroke='%23120d18' stroke-opacity='.4' stroke-width='3' fill='none'/><path d='M33 55 Q39 60 45 55' stroke='%230f0b14' stroke-width='1.8' fill='none' stroke-linecap='round'/><path d='M34 53 Q39 56 44 53' stroke='%23574a5e' stroke-opacity='.5' stroke-width='1' fill='none' stroke-linecap='round'/><path d='M50 58 Q53 60.5 57 58' stroke='%230f0b14' stroke-width='1.5' fill='none' stroke-linecap='round' opacity='.75'/><path d='M46 62 l3 2 l-3 2 Z' fill='%23a5697e'/><path d='M47 66 q0 3 -3 4 M47 66 q0 3 3 4' stroke='%23120d18' stroke-opacity='.5' stroke-width='1' fill='none'/><path d='M28 62 q-9 1 -14 -1 M28 65 q-8 3 -13 3 M28 68 q-8 4 -12 6' stroke='%23e8dcc8' stroke-opacity='.22' stroke-width='1' fill='none'/><ellipse cx='52' cy='50' rx='6' ry='4.5' fill='%23f4b96a' opacity='.1'/><path d='M116 68 C138 64 142 44 126 40 C120 39 119 47 126 48' stroke='%23211c2c' stroke-width='7' fill='none' stroke-linecap='round'/><path d='M117 67 C135 63 139 46 127 43' stroke='%23f4b96a' stroke-opacity='.28' stroke-width='1.3' fill='none' stroke-linecap='round'/><ellipse cx='40' cy='73' rx='9' ry='4' fill='%231d1826'/><path d='M35 73 h10' stroke='%230f0b14' stroke-opacity='.5' stroke-width='.8'/><path d='M8 22 L18 22 L8 33 L18 33' stroke='%23d9c8a8' stroke-opacity='.42' stroke-width='1.7' fill='none' stroke-linecap='round' stroke-linejoin='round'/><path d='M0 6 L8 6 L0 15 L8 15' stroke='%23d9c8a8' stroke-opacity='.28' stroke-width='1.4' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg>") center / contain no-repeat;
}

/* ═══ her tail — one lazy flick every 8 seconds, three discrete
   held poses (steps; a tiny 74px box, nowhere near the mover caps). */
head meta:last-of-type::after {
  content: "";
  display: var(--lofi-scenery, block);
  position: fixed;
  right: 186px;
  bottom: 112px;
  width: 74px;
  height: 56px;
  z-index: 0;
  pointer-events: none;
  transform-origin: 14% 34%;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 74 56'%3E%3Cpath d='M8 16 C40 8 62 18 60 34 C58 48 42 52 30 46' stroke='%23241d28' stroke-width='9' fill='none' stroke-linecap='round'/%3E%3Cpath d='M14 12.5 C38 6.5 56 14 58 26' stroke='%23f4b96a' stroke-opacity='.3' stroke-width='1.6' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") center / contain no-repeat;
  animation: lofi-tail 8s steps(1, end) infinite;
}

/* ═══ THE WALL SHELF — hung on the picture rail in the upper-center-left,
   filling what used to be a dead plum void. A floating wood plank on two
   little brackets holds the streamer's night things: a leaning vinyl LP in
   its sleeve, a mason-jar candle throwing a small warm glow, a trailing
   pothos, and a short stack of cassettes. Every object is rim-lit warm from
   the lamp side (right) and kissed cool from the window (left); the record
   groove and the jar glass carry STATIC specular highlights (safe sparkle,
   L6-d). One promoted fixed layer, off the center text lane. */
head link { display: var(--lofi-scenery, block); }
head link::before {
  content: "";
  display: var(--lofi-scenery, block);
  position: fixed;
  left: 30.5vw;
  top: 11vh;
  width: 372px;
  height: 235px;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 396 250'><defs><linearGradient id='shl' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%236a4b34'/><stop offset='.5' stop-color='%234f3826'/><stop offset='1' stop-color='%23301f14'/></linearGradient><linearGradient id='shlface' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%23412c1d'/><stop offset='1' stop-color='%23261812'/></linearGradient><linearGradient id='brk' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='%23241812'/><stop offset='.5' stop-color='%233a281b'/><stop offset='1' stop-color='%23140d09'/></linearGradient><radialGradient id='vinyl' cx='38%25' cy='34%25' r='72%25'><stop offset='0' stop-color='%23343036'/><stop offset='.5' stop-color='%23201d24'/><stop offset='1' stop-color='%23100e14'/></radialGradient><linearGradient id='sleeve' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%23c9756a'/><stop offset='.5' stop-color='%23a3554e'/><stop offset='1' stop-color='%236f3833'/></linearGradient><linearGradient id='jarg' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='%23a9c6cf' stop-opacity='.22'/><stop offset='.35' stop-color='%23dff0f2' stop-opacity='.5'/><stop offset='.6' stop-color='%23bcd6dc' stop-opacity='.3'/><stop offset='1' stop-color='%238fb0b8' stop-opacity='.2'/></linearGradient><radialGradient id='flame' cx='50%25' cy='60%25' r='60%25'><stop offset='0' stop-color='%23fff3cf'/><stop offset='.4' stop-color='%23ffca6c'/><stop offset='1' stop-color='%23f0913c' stop-opacity='0'/></radialGradient><radialGradient id='candleglow' cx='50%25' cy='50%25' r='50%25'><stop offset='0' stop-color='%23ffdd8f' stop-opacity='.6'/><stop offset='1' stop-color='%23ffcf7e' stop-opacity='0'/></radialGradient><linearGradient id='potA' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='%23803c26'/><stop offset='.5' stop-color='%23c06439'/><stop offset='1' stop-color='%238f4227'/></linearGradient><radialGradient id='leaf2' cx='40%25' cy='28%25' r='80%25'><stop offset='0' stop-color='%235f8664'/><stop offset='1' stop-color='%23335140'/></radialGradient><linearGradient id='cass' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%23d9b7c4'/><stop offset='1' stop-color='%23a07688'/></linearGradient><linearGradient id='cass2' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%23c9d29a'/><stop offset='1' stop-color='%238f9c66'/></linearGradient></defs><ellipse cx='198' cy='222' rx='176' ry='16' fill='%230c0810' opacity='.34'/><g stroke='%232c1d13' stroke-width='7' stroke-linecap='round'><path d='M96 200 L88 236'/><path d='M300 200 L308 236'/></g><path d='M96 200 L88 236' stroke='%236a4d34' stroke-opacity='.4' stroke-width='2' stroke-linecap='round'/><path d='M300 200 L308 236' stroke='%23120c08' stroke-opacity='.5' stroke-width='2' stroke-linecap='round'/><rect x='40' y='190' width='316' height='16' rx='3' fill='url(%23shl)'/><rect x='40' y='204' width='316' height='11' rx='3' fill='url(%23shlface)'/><path d='M40 191 H356' stroke='%23a07a52' stroke-opacity='.5' stroke-width='1.4'/><path d='M40 204 H356' stroke='%23120c08' stroke-opacity='.5' stroke-width='1.2'/><path d='M356 191 V214' stroke='%23f4b96a' stroke-opacity='.35' stroke-width='2'/><ellipse cx='120' cy='188' rx='58' ry='7' fill='%230c0810' opacity='.36'/><ellipse cx='250' cy='188' rx='38' ry='6' fill='%230c0810' opacity='.32'/><ellipse cx='330' cy='188' rx='24' ry='5' fill='%230c0810' opacity='.3'/><g transform='rotate(-13 120 120)'><rect x='60' y='58' width='120' height='120' rx='4' fill='url(%23sleeve)'/><rect x='60' y='58' width='120' height='120' rx='4' fill='none' stroke='%23e7a89e' stroke-opacity='.35' stroke-width='1.5'/><path d='M60 58 h120' stroke='%23f2c3ba' stroke-opacity='.5' stroke-width='2'/><circle cx='120' cy='118' r='26' fill='%23120e14' opacity='.35'/><rect x='74' y='150' width='60' height='5' rx='2' fill='%23f2c9c2' opacity='.45'/><rect x='74' y='160' width='40' height='4' rx='2' fill='%23f2c9c2' opacity='.3'/></g><g transform='rotate(-7 150 116)'><circle cx='150' cy='116' r='58' fill='url(%23vinyl)'/><g fill='none' stroke='%23423d47' stroke-opacity='.4'><circle cx='150' cy='116' r='50'/><circle cx='150' cy='116' r='42'/><circle cx='150' cy='116' r='34'/><circle cx='150' cy='116' r='26'/></g><circle cx='150' cy='116' r='17' fill='%23d98a54'/><circle cx='150' cy='116' r='17' fill='none' stroke='%23f0b077' stroke-opacity='.5' stroke-width='1'/><circle cx='150' cy='116' r='3' fill='%231a1410'/><path d='M116 90 A58 58 0 0 1 174 68' stroke='%23fff2d8' stroke-opacity='.5' stroke-width='4' fill='none' stroke-linecap='round'/><path d='M108 128 A58 58 0 0 0 150 174' stroke='%23c9d6ee' stroke-opacity='.16' stroke-width='3' fill='none' stroke-linecap='round'/></g><g transform='translate(228,120)'><ellipse cx='0' cy='34' rx='60' ry='60' fill='url(%23candleglow)'/><path d='M-20 68 L-24 20 Q-24 12 -16 12 L16 12 Q24 12 24 20 L20 68 Z' fill='url(%23jarg)'/><path d='M-20 68 L-24 20 Q-24 12 -16 12 L16 12 Q24 12 24 20 L20 68 Z' fill='none' stroke='%23cfe6ea' stroke-opacity='.4' stroke-width='1.2'/><rect x='-24' y='10' width='48' height='6' rx='2' fill='%23bcd6dc' fill-opacity='.4'/><path d='M-18 20 L-16 66' stroke='%23f2fbfc' stroke-opacity='.6' stroke-width='2.4' stroke-linecap='round'/><path d='M-11 22 L-10 64' stroke='%23f2fbfc' stroke-opacity='.25' stroke-width='1.2' stroke-linecap='round'/><rect x='-18' y='40' width='36' height='28' rx='3' fill='%23f4d9a8' opacity='.6'/><ellipse cx='0' cy='8' rx='16' ry='16' fill='url(%23flame)'/><ellipse cx='0' cy='6' rx='5' ry='9' fill='%23fff6df'/><circle cx='-1' cy='4' r='1.6' fill='%23ffffff'/><path d='M0 -8 L0 20 M-13 6 L13 6' stroke='%23fff3cf' stroke-opacity='.45' stroke-width='1.4' stroke-linecap='round'/><path d='M0 14 L0 22' stroke='%232a1d16' stroke-width='2'/></g><g transform='translate(316,150)'><path d='M-20 40 L20 40 L15 4 L-15 4 Z' fill='url(%23potA)'/><rect x='-22' y='-2' width='44' height='8' rx='2' fill='%23c26a3f'/><path d='M-22 -2 h44' stroke='%23e39160' stroke-opacity='.6' stroke-width='1.3'/><ellipse cx='0' cy='0' rx='18' ry='3' fill='%232c1a10'/><g stroke='%232f4a37' stroke-width='3' fill='none' stroke-linecap='round'><path d='M-4 0 C-18 -6 -30 2 -38 18'/><path d='M2 0 C4 -14 -2 -26 -14 -36'/><path d='M4 0 C16 -8 30 -6 40 8'/><path d='M0 0 C2 -10 8 -20 20 -28'/><path d='M-2 2 C-24 8 -30 22 -26 36'/></g><g><ellipse cx='-38' cy='18' rx='11' ry='6' fill='url(%23leaf2)' transform='rotate(-30 -38 18)'/><ellipse cx='-14' cy='-36' rx='7' ry='11' fill='url(%23leaf2)'/><ellipse cx='40' cy='8' rx='11' ry='6' fill='url(%23leaf2)' transform='rotate(24 40 8)'/><ellipse cx='20' cy='-28' rx='9' ry='6' fill='url(%23leaf2)' transform='rotate(38 20 -28)'/><ellipse cx='-26' cy='36' rx='9' ry='5' fill='url(%23leaf2)' transform='rotate(-16 -26 36)'/></g><path d='M42 6 q6 4 4 10 M22 -30 q4 6 1 12' stroke='%237fae7f' stroke-opacity='.4' stroke-width='1.2' fill='none'/></g><g transform='translate(196,168)'><rect x='-30' y='-16' width='60' height='16' rx='2' fill='url(%23cass2)'/><rect x='-30' y='-16' width='60' height='16' rx='2' fill='none' stroke='%23d8e0aa' stroke-opacity='.4' stroke-width='1'/><rect x='-20' y='-12' width='40' height='7' rx='1' fill='%23f2f5da' opacity='.6'/><circle cx='-8' cy='-8' r='2.4' fill='%235f6a3c'/><circle cx='8' cy='-8' r='2.4' fill='%235f6a3c'/><rect x='-32' y='-32' width='64' height='16' rx='2' fill='url(%23cass)'/><rect x='-32' y='-32' width='64' height='16' rx='2' fill='none' stroke='%23e7c3d0' stroke-opacity='.4' stroke-width='1'/><rect x='-22' y='-28' width='44' height='7' rx='1' fill='%23f7ecf0' opacity='.6'/><circle cx='-9' cy='-24' r='2.6' fill='%237a5060'/><circle cx='9' cy='-24' r='2.6' fill='%237a5060'/><path d='M-32 -32 h64' stroke='%23f2d0dc' stroke-opacity='.4' stroke-width='1'/></g></svg>") left top / contain no-repeat;
}

/* ═══ paper grain — the journal's tooth. The only fine pattern, so it
   RIDES THE ROLL (zero slide against tracked glyphs = zero flicker). */
.credits-roll::before,
.credits-slideshow::before {
  content: "";
  display: var(--lofi-scenery, block);
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  opacity: 0.15;
  background-image:
    radial-gradient(circle at 28% 36%, rgba(243, 231, 211, 0.55) 0 1px, rgba(243, 231, 211, 0) 1.7px),
    radial-gradient(circle at 73% 62%, rgba(216, 185, 140, 0.5) 0 1px, rgba(216, 185, 140, 0) 1.7px),
    radial-gradient(circle at 11% 81%, rgba(243, 231, 211, 0.4) 0 1px, rgba(243, 231, 211, 0) 1.7px),
    radial-gradient(circle at 55% 14%, rgba(180, 140, 100, 0.35) 0 2px, rgba(180, 140, 100, 0) 3.4px);
  background-size: 300px 300px, 240px 240px, 380px 380px, 460px 460px;
}

/* ═══ the journal: every block is a track on tonight's tape ═══ */
.credits-block,
.credits-slide:not(.flourish) { counter-increment: lofi-track; }

/* note color + tilt cycle — yellow, mint, pink (intro is section 1, so
   the first block lands on 3n+2 = yellow). Content-agnostic. */
.credits-block:nth-of-type(3n + 2),
.credits-slide:nth-of-type(3n + 2) { --lofi-note: var(--lofi-note-yellow); --lofi-tilt: -2deg; }
.credits-block:nth-of-type(3n),
.credits-slide:nth-of-type(3n) { --lofi-note: var(--lofi-note-mint); --lofi-tilt: 1.6deg; }
.credits-block:nth-of-type(3n + 1),
.credits-slide:nth-of-type(3n + 1) { --lofi-note: var(--lofi-note-pink); --lofi-tilt: -1.2deg; }

/* ═══ titles: sticky notes. Caveat handwriting in warm ink on the note,
   a strip of washi tape carrying the track number, a pencil squiggle
   underline, a soft shadow lifting the paper off the wall. */
.credits-block__title {
  position: relative;
  width: fit-content;
  min-width: 4.5em;
  max-width: 86vw;
  margin: 0 auto 1.7rem;
  padding: 0.45em 0.85em 0.4em;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: lowercase;
  color: var(--lofi-ink);
  background: var(--lofi-note, var(--lofi-note-yellow));
  box-shadow: 0 10px 16px -6px rgba(8, 5, 8, 0.55), inset 0 -12px 16px rgba(120, 80, 40, 0.16);
  text-shadow: none;
  transform: rotate(var(--lofi-tilt, -2deg));
}
/* the washi tape holding it up, with tonight's track number printed on */
.credits-block__title::before {
  content: "track " counter(lofi-track, decimal-leading-zero);
  position: absolute;
  top: -0.85em;
  left: 50%;
  transform: translateX(-50%) rotate(-1.5deg);
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.58rem;
  letter-spacing: 0.28em;
  text-transform: lowercase;
  white-space: nowrap;
  padding: 0.32em 1em 0.32em 1.28em;
  color: rgba(58, 40, 28, 0.8);
  background: rgba(238, 232, 240, 0.55);
  box-shadow: 0 1px 3px rgba(8, 5, 8, 0.25);
}
/* pencil squiggle instead of the base gold rule */
.credits-block__title::after {
  content: "";
  display: block;
  width: 76px;
  height: 8px;
  margin: 0.32rem auto 0;
  opacity: 0.65;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 76 8'%3E%3Cpath d='M2 5 Q8 1.5 14 5 T26 5 T38 5 T50 5 T62 5 T74 5' stroke='%234a3226' stroke-width='1.8' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") center / contain no-repeat;
}

/* ═══ rows: typed names, handwritten counts. Names are sacred — wrap,
   never clip; the amount is a Caveat margin-note with a little heart. */
.credit {
  max-width: min(40rem, 90vw);
  margin-inline: auto;
  min-width: 0;
  overflow-wrap: anywhere;
  font-weight: 600;
  letter-spacing: 0.015em;
  line-height: 1.55;
}
.credit__name { color: var(--lofi-cream); }
.credit__amount {
  opacity: 1;
  font-family: var(--credits-title-font);
  font-weight: 600;
  font-size: 1.1em;
  color: var(--lofi-amber);
  text-shadow: var(--credits-shadow);
}
.credit__amount::before {
  content: "\\2661";
  font-size: 0.62em;
  margin: 0 0.55em 0 0.8em;
  vertical-align: 0.22em;
  color: rgba(240, 180, 110, 0.8);
}

/* ═══ flourish cards ═══ */
.flourish--intro { gap: 1.3rem; }

/* badge -> the player chip (copy swap via font-size:0 + ::after) */
.flourish__badge { font-size: 0; border: 0; border-radius: 0; padding: 0; box-shadow: none; }
.flourish__badge::after {
  content: "\\266A now playing \\00B7 beats to relax to";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 0.32em;
  text-transform: lowercase;
  padding: 0.55em 1em 0.55em 1.32em;
  color: var(--lofi-amber);
  border: 1px dashed rgba(240, 180, 110, 0.5);
  border-radius: 6px;
  background: rgba(240, 180, 110, 0.07);
}

/* the streamer's title in their own handwriting (restyle only) */
.flourish--intro .flourish__title {
  font-weight: 700;
  letter-spacing: 0.01em;
  line-height: 1.05;
  max-width: min(88vw, 13em);
  text-transform: none;
  color: #f6e8cd;
  transform: rotate(-1.5deg);
  text-shadow: 0 0 32px rgba(244, 185, 106, 0.35), 0 0 6px rgba(244, 185, 106, 0.14), var(--credits-shadow);
}

/* streamer tagline: restyle only — Patrick Hand, like a note in a margin */
.flourish__tagline {
  font-family: "Patrick Hand", "Comic Sans MS", cursive;
  font-style: normal;
  font-size: 1.15rem;
  letter-spacing: 0.05em;
  color: rgba(243, 231, 211, 0.85);
}

/* rating -> the cozy certificate (copy swap) */
.flourish__rating { font-size: 0; border: 0; padding: 0; opacity: 1; }
.flourish__rating::after {
  content: "rated c \\00B7 for cozy";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.3em;
  text-transform: lowercase;
  padding: 0.5em 0.8em 0.5em 1.1em;
  color: var(--lofi-rose);
  border: 1px solid rgba(232, 146, 124, 0.5);
  border-radius: 4px;
  transform: rotate(-2.5deg);
}

/* cassette fine print off the tape label */
.flourish--intro::after {
  content: "mixtape vol. 04 \\00B7 side a \\00B7 2:47 am";
  display: var(--lofi-scenery, block);
  font-family: var(--credits-font);
  font-weight: 600;
  font-size: 0.66rem;
  letter-spacing: 0.3em;
  padding-left: 0.3em;
  text-transform: lowercase;
  color: rgba(243, 231, 211, 0.48);
}

/* outro: goodnight (copy swap; spacing re-declared on the ::after —
   em against the parent's font-size:0 computes to zero) */
.flourish--outro::before {
  content: "z z z";
  display: var(--lofi-scenery, block);
  font-family: var(--credits-title-font);
  font-size: 1.4rem;
  letter-spacing: 0.6em;
  padding-left: 0.6em;
  color: rgba(240, 180, 110, 0.7);
  text-shadow: var(--credits-shadow);
}
.flourish--outro .flourish__title { font-size: 0; }
.flourish--outro .flourish__title::after {
  content: "goodnight";
  display: inline-block;
  font-family: var(--credits-title-font);
  font-weight: 700;
  font-size: var(--credits-flourish-title-size);
  letter-spacing: 0.01em;
  line-height: 1.05;
  text-transform: none;
  color: #f6e8cd;
  transform: rotate(-1.5deg);
  text-shadow: 0 0 32px rgba(244, 185, 106, 0.4), 0 0 6px rgba(244, 185, 106, 0.16), var(--credits-shadow);
}
.flourish--outro .flourish__tagline { font-size: 0; }
.flourish--outro .flourish__tagline::after {
  content: "a stream to relax and study to";
  font-family: "Patrick Hand", "Comic Sans MS", cursive;
  font-size: 1.1rem;
  letter-spacing: 0.05em;
  color: rgba(243, 231, 211, 0.85);
}
/* the lamp's promise, in small print */
.flourish--outro::after {
  content: "the lamp stays on for you";
  display: var(--lofi-scenery, block);
  font-family: var(--credits-font);
  font-weight: 600;
  font-size: 0.66rem;
  letter-spacing: 0.3em;
  padding-left: 0.3em;
  margin-top: 0.5rem;
  text-transform: lowercase;
  color: rgba(243, 231, 211, 0.48);
}

/* ═══ raid finale: THE CAT WOKE UP. The note goes warm amber, a soft
   lamp halo rises behind the block, and above the note she sits — two
   poses swapping on steps() (~1.5 paints/s, in-roll cap is 2/s), tail
   asking questions, eyes catching the lamp. Declared after the note
   tints so it wins the cascade. */
.credits-block:nth-last-of-type(2),
.credits-slide:nth-last-of-type(2):not(.flourish) {
  --lofi-note: #f4c46e;
  --lofi-tilt: -1.2deg;
  background: radial-gradient(ellipse 58% 62% at 50% 42%, rgba(244, 185, 106, 0.12), rgba(244, 185, 106, 0) 74%);
}
.credits-block:nth-last-of-type(2) .credits-block__title,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
  margin-top: 104px;
  box-shadow: 0 12px 20px -6px rgba(8, 5, 8, 0.6), inset 0 -12px 16px rgba(140, 90, 40, 0.2);
}
/* pose A: sitting up, tail wrapped, eyes on the raid */
.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  content: "";
  display: var(--lofi-scenery, block);
  top: auto;
  bottom: calc(100% + 8px);
  left: 50%;
  margin-left: -48px;
  transform: none;
  width: 96px;
  height: 92px;
  padding: 0;
  box-shadow: none;
  background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 92'><defs><radialGradient id='wb' cx='60%25' cy='28%25' r='85%25'><stop offset='0' stop-color='%23383040'/><stop offset='.5' stop-color='%23272130'/><stop offset='1' stop-color='%2317131f'/></radialGradient><radialGradient id='wh' cx='56%25' cy='32%25' r='78%25'><stop offset='0' stop-color='%233b3243'/><stop offset='.55' stop-color='%23282232'/><stop offset='1' stop-color='%23181420'/></radialGradient><linearGradient id='wear' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%23a5697e'/><stop offset='1' stop-color='%235e3a4c'/></linearGradient><radialGradient id='weye' cx='42%25' cy='38%25' r='62%25'><stop offset='0' stop-color='%23fff0c4'/><stop offset='.45' stop-color='%23f6c778'/><stop offset='1' stop-color='%23d69436'/></radialGradient></defs><ellipse cx='54' cy='89' rx='34' ry='5' fill='%23120b14' opacity='.4'/><path d='M28 90 C19 66 27 48 44 42 L64 42 C79 48 85 66 80 90 Z' fill='url(%23wb)'/><path d='M78 86 C94 80 96 64 85 58 C79 55 77 63 84 65' stroke='%23211c2c' stroke-width='7.5' fill='none' stroke-linecap='round'/><path d='M79 85 C92 79 94 65 86 60' stroke='%23f4b96a' stroke-opacity='.32' stroke-width='1.4' fill='none' stroke-linecap='round'/><path d='M30 88 C24 70 30 52 44 46' stroke='%23f4b96a' stroke-opacity='.14' stroke-width='2' fill='none'/><path d='M64 46 C79 52 84 68 80 88' stroke='%23f4b96a' stroke-opacity='.5' stroke-width='2' fill='none' stroke-linecap='round'/><path d='M40 20 L35 3 L52 13 Z' fill='url(%23wb)'/><path d='M58 13 L69 2 L72 19 Z' fill='url(%23wb)'/><path d='M42 17 L38.5 7 L48 12.5 Z' fill='url(%23wear)' opacity='.6'/><path d='M60 13 L67 5 L69 16 Z' fill='url(%23wear)' opacity='.6'/><circle cx='54' cy='30' r='19' fill='url(%23wh)'/><g stroke='%23453c50' stroke-opacity='.5' stroke-width='.9' fill='none' stroke-linecap='round'><path d='M46 14 q3 -3 6 -2'/><path d='M60 12 q3 -3 6 -1'/></g><path d='M44 14 C52 8 62 8 68 13' stroke='%23f4b96a' stroke-opacity='.5' stroke-width='1.8' fill='none' stroke-linecap='round'/><ellipse cx='47' cy='31' rx='6' ry='7' fill='url(%23weye)'/><ellipse cx='61' cy='31' rx='6' ry='7' fill='url(%23weye)'/><circle cx='47' cy='31' r='9' fill='%23f6c778' opacity='.14'/><circle cx='61' cy='31' r='9' fill='%23f6c778' opacity='.14'/><path d='M47 25.5 Q49 31 47 36.5 Q45 31 47 25.5 Z' fill='%23201828'/><path d='M61 25.5 Q63 31 61 36.5 Q59 31 61 25.5 Z' fill='%23201828'/><circle cx='45.4' cy='28.6' r='1.5' fill='%23fff6e2'/><circle cx='59.4' cy='28.6' r='1.5' fill='%23fff6e2'/><path d='M40 26 q4 -2 6 0 M56 26 q4 -2 6 0' stroke='%23120d18' stroke-opacity='.5' stroke-width='.9' fill='none'/><path d='M52 39 l2 2 l-2 2 Z' fill='%23a5697e'/><path d='M54 43 q0 2 -2 3 M54 43 q0 2 2 3' stroke='%23120d18' stroke-opacity='.5' stroke-width='.8' fill='none'/><path d='M38 33 q-8 -1 -12 -3 M38 36 q-7 2 -11 2' stroke='%23e8dcc8' stroke-opacity='.24' stroke-width='1' fill='none'/><path d='M70 33 q8 -1 12 -3 M70 36 q7 2 11 2' stroke='%23e8dcc8' stroke-opacity='.24' stroke-width='1' fill='none'/></svg>") center / contain no-repeat;
  animation: lofi-poseswap 2.6s steps(1, end) infinite;
}
/* pose B: head tilted, tail up — she is DEFINITELY awake */
.credits-block:nth-last-of-type(2) .credits-block__title::after,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::after {
  content: "";
  display: var(--lofi-scenery, block);
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  margin: 0 0 0 -48px;
  width: 96px;
  height: 92px;
  opacity: 0;
  background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 92'><defs><radialGradient id='wb' cx='60%25' cy='28%25' r='85%25'><stop offset='0' stop-color='%23383040'/><stop offset='.5' stop-color='%23272130'/><stop offset='1' stop-color='%2317131f'/></radialGradient><radialGradient id='wh' cx='56%25' cy='32%25' r='78%25'><stop offset='0' stop-color='%233b3243'/><stop offset='.55' stop-color='%23282232'/><stop offset='1' stop-color='%23181420'/></radialGradient><linearGradient id='wear' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%23a5697e'/><stop offset='1' stop-color='%235e3a4c'/></linearGradient><radialGradient id='weye' cx='42%25' cy='38%25' r='62%25'><stop offset='0' stop-color='%23fff0c4'/><stop offset='.45' stop-color='%23f6c778'/><stop offset='1' stop-color='%23d69436'/></radialGradient></defs><ellipse cx='54' cy='89' rx='34' ry='5' fill='%23120b14' opacity='.4'/><path d='M28 90 C19 66 27 48 44 42 L64 42 C79 48 85 66 80 90 Z' fill='url(%23wb)'/><path d='M78 82 C97 71 92 49 78 48 C69 47 68 57 77 58' stroke='%23211c2c' stroke-width='7.5' fill='none' stroke-linecap='round'/><path d='M80 80 C94 71 90 53 80 52' stroke='%23f4b96a' stroke-opacity='.32' stroke-width='1.4' fill='none' stroke-linecap='round'/><path d='M64 46 C79 52 84 68 80 88' stroke='%23f4b96a' stroke-opacity='.5' stroke-width='2' fill='none' stroke-linecap='round'/><g transform='rotate(-7 54 30)'><path d='M40 20 L34 3 L52 12 Z' fill='url(%23wb)'/><path d='M58 13 L70 3 L72 19 Z' fill='url(%23wb)'/><path d='M42 17 L38 6 L48 12 Z' fill='url(%23wear)' opacity='.6'/><path d='M60 13 L68 6 L69 17 Z' fill='url(%23wear)' opacity='.6'/><circle cx='54' cy='30' r='19' fill='url(%23wh)'/><g stroke='%23453c50' stroke-opacity='.5' stroke-width='.9' fill='none' stroke-linecap='round'><path d='M46 14 q3 -3 6 -2'/><path d='M60 12 q3 -3 6 -1'/></g><path d='M44 14 C52 8 62 8 68 13' stroke='%23f4b96a' stroke-opacity='.5' stroke-width='1.8' fill='none' stroke-linecap='round'/><ellipse cx='47' cy='31' rx='6.3' ry='7.4' fill='url(%23weye)'/><ellipse cx='61' cy='31' rx='6.3' ry='7.4' fill='url(%23weye)'/><circle cx='47' cy='31' r='9' fill='%23f6c778' opacity='.18'/><circle cx='61' cy='31' r='9' fill='%23f6c778' opacity='.18'/><path d='M47 25 Q49 31 47 37 Q45 31 47 25 Z' fill='%23201828'/><path d='M61 25 Q63 31 61 37 Q59 31 61 25 Z' fill='%23201828'/><circle cx='45.4' cy='28.4' r='1.6' fill='%23fff6e2'/><circle cx='59.4' cy='28.4' r='1.6' fill='%23fff6e2'/><path d='M40 26 q4 -2 6 0 M56 26 q4 -2 6 0' stroke='%23120d18' stroke-opacity='.5' stroke-width='.9' fill='none'/><path d='M52 39.5 l2 2 l-2 2 Z' fill='%23a5697e'/><path d='M50 44 q3 2.5 6 0' stroke='%23120d18' stroke-opacity='.5' stroke-width='1' fill='none'/><path d='M38 33 q-8 -1 -12 -3 M38 36 q-7 2 -11 2' stroke='%23e8dcc8' stroke-opacity='.24' stroke-width='1' fill='none'/><path d='M70 33 q8 -1 12 -3 M70 36 q7 2 11 2' stroke='%23e8dcc8' stroke-opacity='.24' stroke-width='1' fill='none'/></g></svg>") center / contain no-repeat;
  animation: lofi-poseswap 2.6s steps(1, end) infinite;
  animation-delay: -1.3s;
}
.credits-block:nth-last-of-type(2) .credit,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit {
  font-size: calc(var(--credits-name-size) * 1.08);
}
.credits-block:nth-last-of-type(2) .credit__name,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__name {
  text-shadow: 0 0 16px rgba(244, 185, 106, 0.3), var(--credits-shadow);
}
/* the margin note under the raid names */
.credits-block:nth-last-of-type(2)::after,
.credits-slide:nth-last-of-type(2):not(.flourish)::after {
  content: "( the cat woke up for this one )";
  display: block;
  font-family: var(--credits-title-font);
  font-weight: 600;
  font-size: 1.25rem;
  margin-top: 1rem;
  color: #f0c27e;
  text-shadow: var(--credits-shadow);
}

/* ═══ slideshow: pages settle like a note pressed onto the wall */
.credits-slide {
  transform: translateY(12px);
  transition: opacity 0.9s ease, transform 1s cubic-bezier(0.22, 1, 0.36, 1);
}
.credits-slide.is-active { transform: none; }

/* ═══ keyframes (all lofi- prefixed; transform/opacity ONLY) ═══ */
/* rain: one 48px tile per 1.4s in 4 held steps (~2.9 hops/s) */
@keyframes lofi-rain {
  0%   { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(0, 48px, 0); }
}
/* steam: rises off the tea, sways into the lamp light, thins, gone */
@keyframes lofi-steam {
  0%   { transform: translate3d(0, 10px, 0) scale(0.66); opacity: 0; }
  14%  { opacity: 0.85; }
  40%  { transform: translate3d(-7px, -44px, 0) scale(0.98); opacity: 0.82; }
  68%  { transform: translate3d(4px, -80px, 0) scale(1.12); opacity: 0.44; }
  100% { transform: translate3d(8px, -116px, 0) scale(1.3); opacity: 0; }
}
/* the tail: three held poses once per 8s — a dream, not an alarm */
@keyframes lofi-tail {
  0%, 84%   { transform: rotate(0deg); }
  88%, 90%  { transform: rotate(-10deg); }
  93%, 94%  { transform: rotate(-4deg); }
  97%, 100% { transform: rotate(0deg); }
}
/* someone across the street is up too: slow held brightness levels */
@keyframes lofi-city {
  0%   { opacity: 0.95; }
  24%  { opacity: 0.55; }
  46%  { opacity: 0.9; }
  68%  { opacity: 0.5; }
  86%  { opacity: 0.85; }
  100% { opacity: 0.95; }
}
/* the wake-up: two poses trading places every 1.3s */
@keyframes lofi-poseswap {
  0%, 49%   { opacity: 1; }
  50%, 100% { opacity: 0; }
}

/* ═══ reduced motion: the room holds still — rain hangs on the glass,
   steam drifts faintly in place, the tail rests, the city holds its
   lights, and the woken cat parks in pose A, watching. */
@media (prefers-reduced-motion: reduce) {
  head::after { animation: none; }
  head::before { animation: none; opacity: 0.4; transform: translate3d(-4px, -38px, 0) scale(1); }
  head meta:first-of-type::after { animation: none; opacity: 0.8; }
  head meta:last-of-type::after { animation: none; }
  .credits-block:nth-last-of-type(2) .credits-block__title::before,
  .credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
    animation: none;
  }
  .credits-block:nth-last-of-type(2) .credits-block__title::after,
  .credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::after {
    animation: none;
    opacity: 0;
  }
  .credits-slide { transform: none; transition: opacity 0.8s ease; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--lofi-scenery:none;}",
};
