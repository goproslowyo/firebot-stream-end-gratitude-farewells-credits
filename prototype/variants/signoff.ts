import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. End of Broadcast: 3 a.m., the last TV in the world signs off. A dark living room lit only by a big vintage console TV — the screen cycles test card / PLEASE STAND BY / rolling static, its cold flicker washing over a couch, a sleeping cat, venetian blinds; outside the window the transmitter tower blinks red against the night. */
export const VARIANT: ThemeVariant = {
  key: "signoff",
  name: "End of Broadcast (Test Card)",
  css: `@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap');
/* ================================================================
   END OF BROADCAST — RADICAL REDESIGN. The scene is a PLACE now:
   3:02 a.m. in a dark living room. The only light in the world is a
   big vintage console TV, still on after the station signed off. Its
   screen cycles — SMPTE bars, PLEASE STAND BY, rolling static — on a
   27s master clock, and every change re-lights the whole room: the
   cold glow washes the walls, pools on the floor, rims the couch and
   the cat asleep on its back. Through the venetian blinds, the
   transmitter tower blinks red on the ridge under a gibbous moon.
   The credits float in the room's dark center — glowing caption
   light hanging in the air between the TV and the couch.
   Layer map (all scenery kill-switched via --signoff-scenery):
     html bg (--credits-bg)  the room: dark walls, darker floor, a
                             center-lane scrim so names always read
     html::before            STATIC room ambience: floor seam, corner
                             dark, moon ambient near the window
     html::after             THE TV LIGHT — the story beat. One big
                             promoted layer of soft radials anchored
                             at the screen; opacity-only 27s track:
                             breathes during bars/standby, flickers
                             hard in steps() when the static rolls.
                             will-change #1 of 3
     body::before            foreground couch + sleeping cat + side
                             table, rim-lit by the TV. STATIC
     body::after             moonlight blind-stripes cast on the
                             floor under the window. STATIC
     head::before            THE TV — walnut console, rabbit ears,
                             channel dial, VCR blinking 12:00. STATIC
     meta#1::before          screen content A: SMPTE bars (27s gate)
     meta#1::after           screen content B: PLEASE STAND BY
     meta#2::before          screen content C: rolling static — noise
                             tiles + steps() jitter; will-change #2
     meta#2::after           wall clock at 3:02 + family photos
                             catching the TV glint. STATIC
     title::before           the window: blinds, night sky, moon,
                             ridge, the distant transmitter tower
     title::after            the tower BEACON — steps() aviation
                             blink through the blinds
     link#1::before          dust motes drifting up through the TV
                             glow above the cabinet; will-change #3
     head::after             curved-glass overlay ON the screen:
                             specular sheen + tube vignette, painted
                             above whatever the TV is showing. STATIC
   ================================================================ */

:root {
  /* ── palette: a room lit by a television ── */
  --signoff-scenery: block; /* set to none to strip every scenery layer */
  --signoff-white: #f2f5f7;   /* caption white */
  --signoff-gray: #aebfd2;    /* slate gray-blue */
  --signoff-blue: #9cc4e8;    /* TV glow */
  --signoff-amber: #ffb84d;   /* VCR clock + amounts */
  --signoff-red: #d43c3c;     /* bulletin red / beacon */
  --signoff-yellow: #e3c93f;
  --signoff-cyan: #4fd4d4;
  --signoff-green: #58cf6b;
  --signoff-magenta: #d670d6;
  --signoff-ink: rgba(2, 4, 8, 0.82);

  /* ── base hooks ── */
  /* The room: cool near-black walls falling to a floor seam at 74%,
     a subtle center-lane scrim (the dark middle of the room where the
     credits hang), and corner falloff. All static, all coarse. */
  --credits-bg:
    linear-gradient(90deg, rgba(1, 2, 4, 0) 26%, rgba(1, 2, 4, 0.32) 42%, rgba(1, 2, 4, 0.32) 58%, rgba(1, 2, 4, 0) 74%),
    radial-gradient(ellipse 140% 110% at 50% 42%, rgba(0, 0, 0, 0) 52%, rgba(0, 0, 0, 0.5) 100%),
    linear-gradient(180deg, #06090f 0%, #090d16 38%, #0b101a 62%, #0c111b 73.8%, #0a0806 74.2%, #070504 86%, #030202 100%);
  --credits-color: var(--signoff-white);
  --credits-accent: var(--signoff-gray);
  --credits-font: "Courier Prime", "Courier New", ui-monospace, Menlo, Consolas, monospace;
  --credits-title-font: "Oswald", "Arial Narrow", "Helvetica Neue", Arial, sans-serif;
  --credits-title-size: clamp(1.3rem, 3.2vw, 2.05rem);
  --credits-name-size: clamp(1.02rem, 2.5vw, 1.42rem);
  --credits-flourish-title-size: clamp(2.1rem, 6.6vw, 4.3rem);
  --credits-block-gap: 4.75rem;
  --credits-name-gap: 0.5rem;
  --credits-shadow: 0 2px 10px rgba(1, 3, 7, 0.75);
  /* glow no-op — never "none": base composes "var(--credits-glow),
     var(--credits-shadow)" and a "none" invalidates the whole list. */
  --credits-glow: 0 0 0 rgba(0, 0, 0, 0);
}

/* Scenery is full-bleed: html drops the base edge-fade; body keeps the
   base mask so names still ease in at the floor and out at the top. */
html { -webkit-mask-image: none; mask-image: none; }
body { background: transparent; }

/* ═══ ROOM AMBIENCE — the still parts of the dark: a hard-ish seam where
   the wall meets the floor, deep corner shadow, and a faint cool ambient
   hanging by the window (moonlight leaking through the blinds). STATIC,
   promoted, coarse. */
html::before {
  content: "";
  display: var(--signoff-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -3;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* the area rug on the floor in front of the set — a muted vintage
       weave grounding the room. Kept low + soft so the TV's blue pool
       (html::after) does most of the lighting; a faint border ring and a
       hair of warmth read it as fabric, not floor. */
    radial-gradient(ellipse 39vw 12vh at 45% 100%, rgba(0, 0, 0, 0) 60%, rgba(158, 150, 162, 0.09) 65%, rgba(158, 150, 162, 0.09) 67.5%, rgba(0, 0, 0, 0) 72%),
    radial-gradient(ellipse 34vw 10vh at 45% 100%, rgba(56, 46, 54, 0.5) 0%, rgba(46, 39, 48, 0.34) 52%, rgba(44, 38, 47, 0) 78%),
    /* skirting-line shadow at the wall/floor seam */
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)) 0 74% / 100% 3px no-repeat,
    linear-gradient(rgba(120, 150, 190, 0.05), rgba(120, 150, 190, 0.05)) 0 74.6% / 100% 1px no-repeat,
    /* atmospheric haze hanging over the mid-floor — a thin cool veil that
       separates the TV plane from the couch plane (far/mid/near depth) */
    linear-gradient(180deg, rgba(118, 150, 192, 0) 66%, rgba(112, 144, 186, 0.05) 73.5%, rgba(118, 150, 192, 0) 82%),
    /* moon ambient on the right wall + floor near the window */
    radial-gradient(ellipse 34vw 26vh at 85% 30%, rgba(120, 150, 190, 0.055), rgba(120, 150, 190, 0) 70%),
    radial-gradient(ellipse 30vw 9vh at 80% 86%, rgba(140, 170, 210, 0.06), rgba(140, 170, 210, 0) 70%),
    /* gentle key falloff down the left wall (the TV side reads brighter
       near the ceiling, darker toward the far corner) */
    radial-gradient(ellipse 52vw 60vh at 6% 8%, rgba(96, 128, 168, 0.05) 0%, rgba(96, 128, 168, 0) 66%),
    /* ceiling dark + deep corners */
    linear-gradient(180deg, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0) 16%),
    radial-gradient(ellipse 120% 90% at 50% 60%, rgba(0, 0, 0, 0) 58%, rgba(0, 0, 0, 0.45) 100%);
}

/* ═══ THE TV LIGHT — the story beat. Everything the room knows about
   light comes from this one promoted layer: a hot core at the screen,
   a wide wash climbing the wall, a pool on the floor in front of the
   set, a bounce off the ceiling, and a faint reach that rims the couch
   across the room. It BREATHES on a 27s opacity track locked to the
   screen-content clock: steady drift while the bars are up, a dim drop
   for PLEASE STAND BY, then hard steps() flicker while the static
   rolls. Opacity-only, compositor-safe. will-change #1 of 3. */
html::after {
  content: "";
  display: var(--signoff-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* hot halo hugging the set */
    radial-gradient(ellipse 26vw 30vh at 14% 72%, rgba(190, 220, 248, 0.62) 0%, rgba(160, 198, 236, 0.26) 46%, rgba(150, 190, 230, 0) 72%),
    /* wall hotspot climbing behind/above the cabinet */
    radial-gradient(ellipse 40vw 48vh at 13% 46%, rgba(140, 180, 220, 0.26) 0%, rgba(132, 172, 214, 0.15) 34%, rgba(126, 166, 208, 0.07) 58%, rgba(120, 160, 205, 0) 82%),
    /* the wide room wash */
    radial-gradient(ellipse 78vw 66vh at 18% 66%, rgba(120, 162, 206, 0.27) 0%, rgba(110, 150, 196, 0.11) 46%, rgba(100, 140, 185, 0) 74%),
    /* floor pool spilling toward the couch */
    radial-gradient(ellipse 56vw 15vh at 24% 98%, rgba(158, 196, 234, 0.42) 0%, rgba(150, 190, 230, 0) 72%),
    /* ceiling bounce */
    radial-gradient(ellipse 46vw 24vh at 10% 2%, rgba(110, 150, 195, 0.18) 0%, rgba(110, 150, 195, 0) 70%),
    /* the glow catching the area rug — a soft blue pool laid over the
       weave so the rug reads as lit by the set, not painted on */
    radial-gradient(ellipse 33vw 9vh at 44% 100%, rgba(150, 188, 228, 0.2) 0%, rgba(140, 178, 220, 0.07) 52%, rgba(140, 178, 220, 0) 80%),
    /* the light's long reach: a dim wash arriving at the couch */
    radial-gradient(ellipse 40vw 26vh at 70% 88%, rgba(120, 160, 205, 0.22) 0%, rgba(120, 160, 205, 0) 72%),
    /* the key catching the couch's TV-facing top edge — the near rim */
    radial-gradient(ellipse 15vw 10vh at 74% 82%, rgba(150, 186, 226, 0.16) 0%, rgba(150, 186, 226, 0) 70%);
  will-change: opacity;
  animation: signoff-glow 27s ease-in-out infinite;
}

/* ═══ THE COUCH — foreground, across the room from the set, seen from
   behind: back cushions, both arm rolls, a throw blanket, a side table
   with a cooling mug — and THE CAT asleep on the couch back, every left
   edge rimmed in TV blue. Lives on body::before so it sits ABOVE all
   head scenery but BEHIND the sacred names. STATIC, promoted. */
body::before {
  content: "";
  display: var(--signoff-scenery, block);
  position: fixed;
  right: 1.5vw;
  bottom: 1vh;
  width: 640px;
  height: 300px;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 300'%3E%3Cdefs%3E%3ClinearGradient id='rm' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23b4d4ee' stop-opacity='.8'/%3E%3Cstop offset='1' stop-color='%23a8cce8' stop-opacity='.06'/%3E%3C/linearGradient%3E%3ClinearGradient id='bk' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23162238'/%3E%3Cstop offset='.25' stop-color='%230a101c'/%3E%3Cstop offset='1' stop-color='%23030509'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cellipse cx='300' cy='288' rx='290' ry='9' fill='%23000000' opacity='.55'/%3E%3Cellipse cx='596' cy='286' rx='34' ry='6' fill='%23000000' opacity='.5'/%3E%3Cpath d='M596 205 L596 282' stroke='%23070b11' stroke-width='7'/%3E%3Crect x='584' y='172' width='17' height='20' rx='3' fill='%230c1117'/%3E%3Cpath d='M601 177 Q610 181 601 188' stroke='%230c1117' stroke-width='3' fill='none'/%3E%3Cpath d='M585 173 Q584 182 585 190' stroke='%23a8cce8' stroke-opacity='.45' stroke-width='1.2' fill='none'/%3E%3Cpath d='M592 168 Q589 160 593 154' stroke='%239cb8d4' stroke-opacity='.25' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3Cellipse cx='596' cy='196' rx='38' ry='9' fill='%230a0f16'/%3E%3Cpath d='M560 194 Q578 188 606 189' stroke='%238fb4d8' stroke-opacity='.35' stroke-width='1.5' fill='none'/%3E%3Cg transform='rotate(-7 575 189)'%3E%3Crect x='559' y='185' width='31' height='8' rx='1' fill='%23120c0a'/%3E%3Crect x='559' y='183.4' width='31' height='7.6' rx='1' fill='%23a2452e'/%3E%3Crect x='559' y='183.4' width='31' height='1.9' rx='1' fill='%23c6603f'/%3E%3Crect x='563' y='185.6' width='12' height='1.7' rx='.5' fill='%23e6d7bd' opacity='.72'/%3E%3Crect x='563' y='188' width='9' height='1.1' fill='%23e6d7bd' opacity='.35'/%3E%3Cpath d='M559 191 L559 183.6' stroke='%23a8cce8' stroke-opacity='.55' stroke-width='1'/%3E%3Cpath d='M559 183.6 L590 183.6' stroke='%23f0c99a' stroke-opacity='.4' stroke-width='.7'/%3E%3C/g%3E%3Cpath d='M40 286 L40 150 Q40 104 92 104 L468 104 Q520 104 520 150 L520 286 Z' fill='url(%23bk)'/%3E%3Cg stroke='%235e78a0' stroke-opacity='.05' stroke-width='1' fill='none'%3E%3Cpath d='M56 132 L508 132'/%3E%3Cpath d='M52 158 L512 158'/%3E%3Cpath d='M48 186 L516 186'/%3E%3Cpath d='M46 216 L518 216'/%3E%3Cpath d='M44 248 L520 248'/%3E%3C/g%3E%3Cpath d='M208 108 L208 150 M352 108 L352 150' stroke='%23020407' stroke-width='4' opacity='.7'/%3E%3Cpath d='M380 106 L448 106 L456 190 Q420 200 400 190 Z' fill='%23161f2e'/%3E%3Cpath d='M382 106 L448 106' stroke='%236f8cae' stroke-opacity='.4' stroke-width='2'/%3E%3Cpath d='M404 112 L410 186 M428 112 L436 188' stroke='%23090f18' stroke-width='2' opacity='.8'/%3E%3Cpath d='M42 160 Q42 106 94 106 L466 106' stroke='url(%23rm)' stroke-width='2.4' fill='none'/%3E%3Cpath d='M26 286 L26 186 Q26 150 56 150 Q86 150 86 186 L86 286 Z' fill='%23090e16'/%3E%3Cpath d='M494 286 L494 186 Q494 150 524 150 Q554 150 554 186 L554 286 Z' fill='%23060a10'/%3E%3Cpath d='M28 220 Q28 152 56 152' stroke='%23a8cce8' stroke-opacity='.5' stroke-width='2' fill='none'/%3E%3Cpath d='M26 206 Q26 153 53 150' stroke='%23d4e6f6' stroke-opacity='.4' stroke-width='1' fill='none'/%3E%3Cpath d='M496 200 Q496 152 524 152' stroke='%23a8cce8' stroke-opacity='.22' stroke-width='2' fill='none'/%3E%3Cellipse cx='158' cy='92' rx='36' ry='17' fill='%23030508'/%3E%3Ccircle cx='124' cy='78' r='13' fill='%23030508'/%3E%3Cpath d='M115 70 L111 56 L122 64 Z' fill='%23030508'/%3E%3Cpath d='M128 66 L133 54 L136 66 Z' fill='%23030508'/%3E%3Cpath d='M192 96 Q220 100 224 76' stroke='%23030508' stroke-width='7' fill='none' stroke-linecap='round'/%3E%3Cpath d='M112 57 Q108 70 114 82 Q118 90 128 92' stroke='%23a8cce8' stroke-opacity='.6' stroke-width='1.6' fill='none'/%3E%3Cpath d='M133 55 L136 65' stroke='%23a8cce8' stroke-opacity='.5' stroke-width='1.2'/%3E%3Cpath d='M128 80 Q150 72 186 84' stroke='%238fb4d8' stroke-opacity='.3' stroke-width='1.4' fill='none'/%3E%3C/svg%3E") center bottom / contain no-repeat;
}

/* ═══ moonlight through the blinds — pale slat-stripes lying on the floor
   around the couch. Coarse soft bands, masked to a pool, STATIC. Sits
   under the couch silhouette (z -2 within the body group). */
body::after {
  content: "";
  display: var(--signoff-scenery, block);
  position: fixed;
  right: calc(2vw + 20px);
  bottom: 2vh;
  width: 600px;
  height: 230px;
  z-index: -2;
  pointer-events: none;
  background: repeating-linear-gradient(176deg, rgba(152, 182, 220, 0.16) 0 14px, rgba(146, 176, 214, 0) 14px 42px);
  -webkit-mask-image: radial-gradient(ellipse 62% 85% at 55% 45%, #000 26%, transparent 76%);
  mask-image: radial-gradient(ellipse 62% 85% at 55% 45%, #000 26%, transparent 76%);
}

/* ═══ THE TV — the protagonist. A walnut mid-century console: rabbit
   ears, channel + volume dials, woven grille, splayed legs, and a VCR
   on top frozen at 12:00. The glass is bare here — the picture is
   painted by the meta overlays, the curved-glass sheen by head::after.
   STATIC, promoted. ONE UNBROKEN data-URI. */
head { display: var(--signoff-scenery, block); }
head::before {
  content: "";
  display: var(--signoff-scenery, block);
  position: fixed;
  left: 2vw;
  bottom: 2vh;
  width: 560px;
  height: 520px;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 560 520'%3E%3Cdefs%3E%3ClinearGradient id='wd' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%232e1d11'/%3E%3Cstop offset='.45' stop-color='%23201409'/%3E%3Cstop offset='1' stop-color='%23120a05'/%3E%3C/linearGradient%3E%3ClinearGradient id='sd' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23000000' stop-opacity='.5'/%3E%3Cstop offset='.15' stop-color='%23000000' stop-opacity='0'/%3E%3Cstop offset='.85' stop-color='%23000000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000000' stop-opacity='.55'/%3E%3C/linearGradient%3E%3CradialGradient id='gl' cx='.5' cy='.42' r='.75'%3E%3Cstop offset='0' stop-color='%231c2e42'/%3E%3Cstop offset='.6' stop-color='%230d1622'/%3E%3Cstop offset='1' stop-color='%23060b12'/%3E%3C/radialGradient%3E%3CradialGradient id='dl' cx='.35' cy='.3' r='.9'%3E%3Cstop offset='0' stop-color='%234c545e'/%3E%3Cstop offset='.55' stop-color='%2323282e'/%3E%3Cstop offset='1' stop-color='%230f1216'/%3E%3C/radialGradient%3E%3Cfilter id='b4' x='-60%25' y='-60%25' width='220%25' height='220%25'%3E%3CfeGaussianBlur stdDeviation='3.5'/%3E%3C/filter%3E%3Cfilter id='b8' x='-60%25' y='-60%25' width='220%25' height='220%25'%3E%3CfeGaussianBlur stdDeviation='7'/%3E%3C/filter%3E%3C/defs%3E%3Cellipse cx='285' cy='508' rx='258' ry='11' fill='%23000000' opacity='.6'/%3E%3Cpath d='M104 446 L84 508' stroke='%23150c06' stroke-width='11' stroke-linecap='round'/%3E%3Cpath d='M102 447 L83 506' stroke='%23443016' stroke-width='2' opacity='.55'/%3E%3Cpath d='M462 446 L488 508' stroke='%23150c06' stroke-width='11' stroke-linecap='round'/%3E%3Cpath d='M460 447 L485 506' stroke='%23443016' stroke-width='2' opacity='.4'/%3E%3Cpath d='M294 98 L172 8' stroke='%23515f6b' stroke-width='3'/%3E%3Cpath d='M294 98 L172 8' stroke='%239db2c2' stroke-width='1.1' opacity='.55'/%3E%3Ccircle cx='172' cy='8' r='3' fill='%23849aa9'/%3E%3Cpath d='M312 98 L446 22' stroke='%23414d58' stroke-width='3'/%3E%3Cpath d='M312 98 L446 22' stroke='%238da2b2' stroke-width='1.1' opacity='.45'/%3E%3Ccircle cx='446' cy='22' r='3' fill='%23718695'/%3E%3Cellipse cx='303' cy='98' rx='17' ry='9' fill='%23170e07'/%3E%3Cellipse cx='303' cy='95' rx='17' ry='7' fill='%232c1c10'/%3E%3Crect x='344' y='68' width='138' height='28' rx='3' fill='%230a0c10'/%3E%3Crect x='344' y='68' width='138' height='3.5' fill='%23222932' opacity='.9'/%3E%3Crect x='352' y='76' width='20' height='13' rx='1.5' fill='%23151a20'/%3E%3Crect x='382' y='74' width='62' height='17' rx='2' fill='%23030507'/%3E%3Ctext x='413' y='87.5' text-anchor='middle' font-family='Courier New,monospace' font-weight='bold' font-size='14' letter-spacing='2' fill='%23ffb84d'%3E12:00%3C/text%3E%3Ccircle cx='458' cy='82' r='2' fill='%2358cf6b' opacity='.9'/%3E%3Crect x='38' y='94' width='484' height='356' rx='18' fill='url(%23wd)'/%3E%3Cg stroke='%23110a05' stroke-opacity='.32' stroke-width='1.1' fill='none'%3E%3Cpath d='M84 100 Q80 250 86 446'/%3E%3Cpath d='M150 100 Q157 250 149 446'/%3E%3Cpath d='M300 100 Q294 250 302 446'/%3E%3Cpath d='M430 100 Q436 250 428 446'/%3E%3Cpath d='M470 100 Q464 250 472 446'/%3E%3Cpath d='M500 100 Q505 250 497 446'/%3E%3C/g%3E%3Cg stroke='%234a3418' stroke-opacity='.34' stroke-width='.8' fill='none'%3E%3Cpath d='M116 100 Q112 250 118 446'/%3E%3Cpath d='M446 100 Q451 250 443 446'/%3E%3Cpath d='M486 100 Q481 250 489 446'/%3E%3C/g%3E%3Crect x='38' y='94' width='484' height='356' rx='18' fill='url(%23sd)'/%3E%3Cpath d='M56 97 L504 97' stroke='%23553b1e' stroke-width='2' opacity='.6'/%3E%3Cpath d='M50 118 Q50 97 70 97 L150 97' stroke='%23a8895a' stroke-opacity='.5' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3Cpath d='M40 108 L40 300' stroke='%233a2712' stroke-opacity='.4' stroke-width='1.5'/%3E%3Cg stroke='%23110a05' stroke-width='1' opacity='.6'%3E%3Cpath d='M46 430 L514 430 M46 108 L514 108'/%3E%3C/g%3E%3Crect x='56' y='112' width='348' height='296' rx='20' fill='%230b0705'/%3E%3Crect x='62' y='118' width='336' height='284' rx='18' fill='none' stroke='%238d7c5e' stroke-width='2' opacity='.4'/%3E%3Crect x='65' y='121' width='330' height='278' rx='17' fill='none' stroke='%23040302' stroke-width='4'/%3E%3Crect x='70' y='126' width='320' height='268' rx='26' fill='url(%23gl)'/%3E%3Crect x='70' y='126' width='320' height='268' rx='26' fill='none' stroke='%23bcd9f2' stroke-opacity='.3' stroke-width='6' filter='url(%23b8)'/%3E%3Crect x='70' y='126' width='320' height='268' rx='26' fill='none' stroke='%239cc4e8' stroke-opacity='.3' stroke-width='1.6'/%3E%3Ccircle cx='462' cy='170' r='27' fill='url(%23dl)'/%3E%3Ccircle cx='462' cy='170' r='22' fill='none' stroke='%236a727c' stroke-opacity='.32' stroke-width='.7'/%3E%3Ccircle cx='462' cy='170' r='17' fill='none' stroke='%235a626c' stroke-opacity='.3' stroke-width='.7'/%3E%3Ccircle cx='462' cy='170' r='11' fill='none' stroke='%234c545e' stroke-opacity='.3' stroke-width='.7'/%3E%3Cpath d='M444 156 A22 22 0 0 1 480 158' fill='none' stroke='%23aeb8c2' stroke-opacity='.28' stroke-width='1' stroke-linecap='round'/%3E%3Ccircle cx='462' cy='170' r='27' fill='none' stroke='%235d656f' stroke-width='1.5' opacity='.7'/%3E%3Cg stroke='%23929eaa' stroke-width='1.4' opacity='.5'%3E%3Cpath d='M462 138 L462 144 M462 196 L462 202 M430 170 L436 170 M488 170 L494 170 M439 147 L443.5 151.5 M480.5 188.5 L485 193 M485 147 L480.5 151.5 M443.5 188.5 L439 193'/%3E%3C/g%3E%3Cpath d='M462 170 L462 149' stroke='%23d8e2ec' stroke-width='3' stroke-linecap='round'/%3E%3Ccircle cx='462' cy='170' r='5' fill='%23181c21'/%3E%3Ccircle cx='462' cy='234' r='16' fill='url(%23dl)'/%3E%3Cpath d='M462 234 L471 224' stroke='%23c8d2dc' stroke-width='2.4' stroke-linecap='round'/%3E%3Ccircle cx='462' cy='268' r='3.5' fill='%23ff5a48'/%3E%3Ccircle cx='462' cy='268' r='8' fill='%23ff5a48' opacity='.3' filter='url(%23b4)'/%3E%3Ctext x='462' y='294' text-anchor='middle' font-family='Arial,sans-serif' font-size='10' letter-spacing='3' fill='%23cdbf9f' opacity='.5'%3ETELESTAR%3C/text%3E%3Crect x='424' y='308' width='76' height='114' rx='9' fill='%230d0806'/%3E%3Cg fill='%23231610'%3E%3Crect x='432' y='315' width='5' height='100' rx='2'/%3E%3Crect x='443' y='315' width='5' height='100' rx='2'/%3E%3Crect x='454' y='315' width='5' height='100' rx='2'/%3E%3Crect x='465' y='315' width='5' height='100' rx='2'/%3E%3Crect x='476' y='315' width='5' height='100' rx='2'/%3E%3Crect x='487' y='315' width='5' height='100' rx='2'/%3E%3C/g%3E%3Cpath d='M430 314 L494 314' stroke='%234a5c74' stroke-width='1' opacity='.35'/%3E%3Cpath d='M100 170 Q230 142 360 164' stroke='%23dceafc' stroke-opacity='.1' stroke-width='14' fill='none' filter='url(%23b4)'/%3E%3C/svg%3E") center bottom / contain no-repeat;
}

/* screen geometry shared by the three content overlays + glass:
   TV element = left 2vw, bottom 2vh, 560x520 drawn 1:1;
   glass rect in the SVG = x 70..390, y 126..394 → overlay box is
   left calc(2vw+74px), bottom calc(2vh+130px), 312x260, radius 24. */

/* ═══ SCREEN A — SMPTE bars (with castellation strip + PLUGE row),
   what the station left running. Visible 0–40% of the 27s clock. */
head meta { display: var(--signoff-scenery, block); }
head meta:first-of-type::before {
  content: "";
  display: var(--signoff-scenery, block);
  position: fixed;
  left: calc(2vw + 74px);
  bottom: calc(2vh + 130px);
  width: 312px;
  height: 260px;
  z-index: -1;
  pointer-events: none;
  border-radius: 24px;
  box-shadow: inset 0 0 34px rgba(1, 3, 8, 0.55);
  background:
    linear-gradient(90deg, #3844c2 0 14.28%, #12161b 0 28.57%, #bd42b7 0 42.85%, #12161b 0 57.14%, #34c2be 0 71.42%, #12161b 0 85.71%, #b6bcc0 0 100%) 0 63% / 100% 9% no-repeat,
    linear-gradient(90deg, #1a2430 0 18%, #eef3f8 18% 36%, #2a1a4e 36% 52%, #0b0e12 52% 74%, #161b22 74% 82%, #0b0e12 82% 100%) 0 100% / 100% 30% no-repeat,
    linear-gradient(90deg, #b6bcc0 0 14.28%, #c2ba36 0 28.57%, #34c2be 0 42.85%, #34b846 0 57.14%, #bd42b7 0 71.42%, #c53c36 0 85.71%, #3844c2 0 100%);
  animation: signoff-tv-bars 27s steps(1, end) infinite;
}

/* ═══ SCREEN B — PLEASE STAND BY, typed inside a test-pattern ring.
   Visible 40–63% of the clock. */
head meta:first-of-type::after {
  content: "PLEASE\\ASTAND BY";
  display: var(--signoff-scenery, block);
  position: fixed;
  left: calc(2vw + 74px);
  bottom: calc(2vh + 130px);
  width: 312px;
  height: 260px;
  z-index: -1;
  pointer-events: none;
  border-radius: 24px;
  box-sizing: border-box;
  padding-top: 92px;
  white-space: pre;
  text-align: center;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 23px;
  line-height: 1.7;
  letter-spacing: 0.26em;
  text-indent: 0.26em;
  color: #d5e2ee;
  text-shadow: 0 0 14px rgba(156, 196, 232, 0.55);
  background:
    radial-gradient(circle at 50% 46%, rgba(13, 21, 32, 0) 84px, rgba(174, 191, 210, 0.3) 86px, rgba(174, 191, 210, 0.3) 88px, rgba(13, 21, 32, 0) 90px),
    radial-gradient(ellipse at 50% 45%, #17232f 0%, #0c141f 60%, #070d15 100%);
  animation: signoff-tv-standby 27s steps(1, end) infinite;
  opacity: 0;
}

/* ═══ SCREEN C — the carrier drops: rolling broadcast static. Two noise
   tiles at different scales churn under a steps() jitter (small promoted
   layer, transform+opacity only). Visible 63–100%; while it rolls, the
   room glow flickers hard. Fine texture is LEGAL here: it lives in a
   312px box far left of the crawl lane. will-change #2 of 3. */
head meta:last-of-type::before {
  content: "";
  display: var(--signoff-scenery, block);
  position: fixed;
  left: calc(2vw + 77px);
  bottom: calc(2vh + 133px);
  width: 306px;
  height: 254px;
  z-index: -1;
  pointer-events: none;
  border-radius: 22px;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E"),
    linear-gradient(#141a22, #141a22);
  background-size: 120px 120px, 190px 190px, 100% 100%;
  will-change: transform;
  animation: signoff-tv-static 27s steps(1, end) infinite, signoff-static-jitter 0.9s steps(1, end) infinite;
  opacity: 0;
}

/* ═══ wall dressing — the clock stopped at 3:02 and three family photos,
   their glass catching a diagonal glint of TV light. STATIC. */
head meta:last-of-type::after {
  content: "";
  display: var(--signoff-scenery, block);
  position: fixed;
  left: calc(2vw + 50px);
  top: 10vh;
  width: 420px;
  height: 150px;
  z-index: -1;
  pointer-events: none;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 420 150'%3E%3Ccircle cx='58' cy='66' r='36' fill='%23090c11'/%3E%3Ccircle cx='58' cy='66' r='36' fill='none' stroke='%232c343e' stroke-width='3.5'/%3E%3Ccircle cx='58' cy='66' r='30' fill='none' stroke='%23161c24' stroke-width='1.5'/%3E%3Cpath d='M58 38 L58 43 M58 89 L58 94 M30 66 L35 66 M81 66 L86 66' stroke='%236b7684' stroke-width='2' opacity='.6'/%3E%3Cpath d='M58 66 L76 67' stroke='%23a5b4c4' stroke-width='3.5' stroke-linecap='round'/%3E%3Cpath d='M58 66 L60 42' stroke='%23a5b4c4' stroke-width='2.2' stroke-linecap='round'/%3E%3Ccircle cx='58' cy='66' r='2.5' fill='%23c4d2e0'/%3E%3Cpath d='M36 48 A30 30 0 0 1 72 40' stroke='%239cc4e8' stroke-opacity='.35' stroke-width='2.5' fill='none'/%3E%3Cg transform='rotate(-2 160 78)'%3E%3Crect x='126' y='34' width='68' height='88' fill='%231c1208'/%3E%3Crect x='133' y='41' width='54' height='74' fill='%23172236'/%3E%3Ccircle cx='152' cy='68' r='9' fill='%23222f42'/%3E%3Ccircle cx='170' cy='72' r='7' fill='%231e2a3c'/%3E%3Cpath d='M133 100 Q160 88 187 98 L187 115 L133 115 Z' fill='%231a2534'/%3E%3Cpath d='M132 108 L190 42' stroke='%239cc4e8' stroke-opacity='.12' stroke-width='6'/%3E%3C/g%3E%3Cg transform='rotate(2 246 84)'%3E%3Crect x='218' y='52' width='56' height='64' fill='%23191006'/%3E%3Crect x='224' y='58' width='44' height='52' fill='%23152034'/%3E%3Cpath d='M224 96 C238 86 252 92 268 84 L268 110 L224 110 Z' fill='%23202c3e'/%3E%3Ccircle cx='254' cy='72' r='4' fill='%232c3a50'/%3E%3Cpath d='M223 104 L270 60' stroke='%239cc4e8' stroke-opacity='.1' stroke-width='5'/%3E%3C/g%3E%3Cg transform='rotate(-1.2 348 70)'%3E%3Crect x='302' y='38' width='92' height='64' fill='%231c1208'/%3E%3Crect x='309' y='45' width='78' height='50' fill='%23182338'/%3E%3Ccircle cx='330' cy='66' r='6' fill='%23243147'/%3E%3Ccircle cx='348' cy='62' r='7' fill='%23283753'/%3E%3Ccircle cx='366' cy='67' r='5' fill='%23223046'/%3E%3Cpath d='M309 84 Q348 74 387 84 L387 95 L309 95 Z' fill='%231c2738'/%3E%3Cpath d='M308 92 L392 48' stroke='%239cc4e8' stroke-opacity='.11' stroke-width='6'/%3E%3C/g%3E%3C/svg%3E") center / contain no-repeat;
}

/* ═══ THE WINDOW — venetian blinds tilted open on the 3 a.m. sky: a
   gibbous moon, thin stars, the far ridge with its sodium town lights,
   and the transmitter tower silhouetted with its beacon housing. A
   potted plant sleeps on the sill; the left frame edge catches TV glow.
   STATIC, promoted. ONE UNBROKEN data-URI. */
head title {
  display: var(--signoff-scenery, block);
  font-size: 0;
  color: transparent;
}
head title::before {
  content: "";
  display: var(--signoff-scenery, block);
  position: fixed;
  right: 3.5vw;
  top: 6vh;
  width: 460px;
  height: 480px;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 460 480'%3E%3Cdefs%3E%3ClinearGradient id='sky' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%231a2c46'/%3E%3Cstop offset='.62' stop-color='%23101d34'/%3E%3Cstop offset='1' stop-color='%230b1526'/%3E%3C/linearGradient%3E%3Cfilter id='wb' x='-80%25' y='-80%25' width='260%25' height='260%25'%3E%3CfeGaussianBlur stdDeviation='5'/%3E%3C/filter%3E%3C/defs%3E%3Crect x='28' y='28' width='404' height='424' fill='url(%23sky)'/%3E%3Cg fill='%23e8f0fa'%3E%3Ccircle cx='70' cy='70' r='1.1' opacity='.5'/%3E%3Ccircle cx='120' cy='46' r='.8' opacity='.4'/%3E%3Ccircle cx='210' cy='84' r='1' opacity='.55'/%3E%3Ccircle cx='260' cy='52' r='.7' opacity='.35'/%3E%3Ccircle cx='306' cy='150' r='.9' opacity='.5'/%3E%3Ccircle cx='396' cy='64' r='1' opacity='.45'/%3E%3Ccircle cx='404' cy='190' r='.8' opacity='.4'/%3E%3Ccircle cx='60' cy='160' r='.8' opacity='.35'/%3E%3Ccircle cx='186' cy='150' r='.7' opacity='.4'/%3E%3Ccircle cx='250' cy='120' r='1.2' opacity='.6'/%3E%3Ccircle cx='348' cy='210' r='.7' opacity='.35'/%3E%3Ccircle cx='96' cy='230' r='.9' opacity='.4'/%3E%3C/g%3E%3Ccircle cx='342' cy='104' r='30' fill='%23bcd6ff' opacity='.14' filter='url(%23wb)'/%3E%3Ccircle cx='342' cy='104' r='19' fill='%23e6eef8'/%3E%3Ccircle cx='336' cy='98' r='4' fill='%23c6d2e0' opacity='.6'/%3E%3Ccircle cx='348' cy='110' r='3' fill='%23ccd8e6' opacity='.5'/%3E%3Ccircle cx='340' cy='112' r='2' fill='%23c6d2e0' opacity='.5'/%3E%3Cpath d='M28 376 C110 362 190 372 268 358 C330 348 390 358 432 352 L432 452 L28 452 Z' fill='%23081226'/%3E%3Cpath d='M28 376 C110 362 190 372 268 358 C330 348 390 358 432 352' fill='none' stroke='%23557098' stroke-opacity='.55' stroke-width='1.3'/%3E%3Cg fill='%23ffcf8f'%3E%3Crect x='236' y='372' width='2' height='2' opacity='.6'/%3E%3Crect x='262' y='378' width='1.6' height='1.6' opacity='.45'/%3E%3Crect x='288' y='374' width='2' height='2' opacity='.55'/%3E%3Crect x='318' y='378' width='1.6' height='1.6' opacity='.4'/%3E%3Crect x='348' y='372' width='2' height='2' opacity='.5'/%3E%3Crect x='378' y='376' width='1.6' height='1.6' opacity='.45'/%3E%3C/g%3E%3Cpath d='M136 372 L148 158 M164 372 L152 158' stroke='%23030810' stroke-width='4'/%3E%3Cpath d='M138 344 L162 322 M162 344 L138 322 M140 310 L160 292 M160 310 L140 292 M142 278 L158 262 M158 278 L142 262 M143 248 L157 234 M157 248 L143 234 M145 220 L155 208 M155 220 L145 208 M146 194 L154 184 M154 194 L146 184' stroke='%23030810' stroke-width='2.2'/%3E%3Cpath d='M164 372 L152 158' stroke='%238aa6c8' stroke-opacity='.6' stroke-width='1.2'/%3E%3Cpath d='M150 158 L150 132' stroke='%23030810' stroke-width='3'/%3E%3Ccircle cx='150' cy='128' r='6' fill='%23d43c3c' opacity='.3' filter='url(%23wb)'/%3E%3Ccircle cx='150' cy='128' r='2.6' fill='%237e241e'/%3E%3Ccircle cx='149' cy='127' r='1' fill='%23e07a68' opacity='.8'/%3E%3Cg fill='%23060a12'%3E%3Crect x='28' y='36' width='404' height='9'/%3E%3Crect x='28' y='70' width='404' height='9'/%3E%3Crect x='28' y='104' width='404' height='9'/%3E%3Crect x='28' y='138' width='404' height='9'/%3E%3Crect x='28' y='172' width='404' height='9'/%3E%3Crect x='28' y='206' width='404' height='9'/%3E%3Crect x='28' y='240' width='404' height='9'/%3E%3Crect x='28' y='274' width='404' height='9'/%3E%3Crect x='28' y='308' width='404' height='9'/%3E%3Crect x='28' y='342' width='404' height='9'/%3E%3Crect x='28' y='376' width='404' height='9'/%3E%3Crect x='28' y='410' width='404' height='9'/%3E%3C/g%3E%3Cg fill='%233c4e64' opacity='.28'%3E%3Crect x='28' y='36' width='404' height='2'/%3E%3Crect x='28' y='70' width='404' height='2'/%3E%3Crect x='28' y='104' width='404' height='2'/%3E%3Crect x='28' y='138' width='404' height='2'/%3E%3Crect x='28' y='172' width='404' height='2'/%3E%3Crect x='28' y='206' width='404' height='2'/%3E%3Crect x='28' y='240' width='404' height='2'/%3E%3Crect x='28' y='274' width='404' height='2'/%3E%3Crect x='28' y='308' width='404' height='2'/%3E%3Crect x='28' y='342' width='404' height='2'/%3E%3Crect x='28' y='376' width='404' height='2'/%3E%3Crect x='28' y='410' width='404' height='2'/%3E%3C/g%3E%3Cg fill='%239cc4e8' opacity='.25'%3E%3Crect x='28' y='36' width='30' height='2'/%3E%3Crect x='28' y='70' width='30' height='2'/%3E%3Crect x='28' y='104' width='30' height='2'/%3E%3Crect x='28' y='138' width='30' height='2'/%3E%3Crect x='28' y='172' width='30' height='2'/%3E%3Crect x='28' y='206' width='30' height='2'/%3E%3Crect x='28' y='240' width='30' height='2'/%3E%3Crect x='28' y='274' width='30' height='2'/%3E%3Crect x='28' y='308' width='30' height='2'/%3E%3Crect x='28' y='342' width='30' height='2'/%3E%3Crect x='28' y='376' width='30' height='2'/%3E%3Crect x='28' y='410' width='30' height='2'/%3E%3C/g%3E%3Cpath d='M100 32 L100 446 M360 32 L360 446' stroke='%23090e15' stroke-width='2.2' opacity='.9'/%3E%3Crect x='20' y='20' width='420' height='440' rx='4' fill='none' stroke='%23201409' stroke-width='18'/%3E%3Crect x='29' y='29' width='402' height='422' fill='none' stroke='%23000000' stroke-opacity='.6' stroke-width='2'/%3E%3Cpath d='M12 26 L12 454' stroke='%237fa0c4' stroke-opacity='.3' stroke-width='2'/%3E%3Crect x='2' y='460' width='456' height='15' rx='3' fill='%23271a0a'/%3E%3Crect x='2' y='460' width='456' height='2.5' fill='%23553b1e' opacity='.8'/%3E%3Cpath d='M50 460 L46 440 L88 440 L84 460 Z' fill='%23110a05'/%3E%3Cpath d='M46 440 L88 440' stroke='%234e3520' stroke-width='1.5' opacity='.7'/%3E%3Cg stroke='%230b1310' stroke-width='4.5' fill='none' stroke-linecap='round'%3E%3Cpath d='M64 440 C58 420 50 412 42 406'/%3E%3Cpath d='M68 440 C68 414 70 404 76 394'/%3E%3Cpath d='M72 440 C80 424 88 416 98 410'/%3E%3C/g%3E%3Cpath d='M64 440 C58 420 50 412 42 406' stroke='%237fa0c4' stroke-opacity='.3' stroke-width='1.2' fill='none'/%3E%3C/svg%3E") center / contain no-repeat;
}

/* ═══ the tower BEACON — a small red halo pinned to the mast tip inside
   the window, blinking its aviation pattern on steps(1) (~0.8 paints/s;
   not a continuous mover, no will-change). The dim housing is baked into
   the window SVG so the dark phase shows a fixture, not a hole. */
head title::after {
  content: "";
  display: var(--signoff-scenery, block);
  position: fixed;
  /* window element: right 3.5vw, top 6vh, 460x480 @1:1; beacon at svg
     (150,128) → 310px in from the right edge, 128px down. 44px box. */
  right: calc(3.5vw + 288px);
  top: calc(6vh + 106px);
  width: 44px;
  height: 44px;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(circle 2px at 50% 50%, #fff4ee 0%, #ff9a78 55%, rgba(255, 154, 120, 0) 100%),
    radial-gradient(circle 6px at 50% 48%, rgba(255, 132, 100, 0.85) 0%, rgba(255, 96, 70, 0.4) 58%, rgba(255, 96, 70, 0) 100%),
    radial-gradient(circle 14px at 50% 48%, rgba(255, 96, 66, 0.35) 0%, rgba(255, 84, 58, 0.1) 55%, rgba(255, 84, 58, 0) 100%),
    radial-gradient(circle 21px at 50% 48%, rgba(255, 78, 54, 0.22) 0%, rgba(255, 78, 54, 0) 100%);
  animation: signoff-beacon 2.6s steps(1, end) infinite;
}

/* ═══ dust motes — tiny flecks hanging in the column of TV light above
   the cabinet, drifting on a slow air current. The one smooth continuous
   mover: a small 340px layer, transform+opacity only. will-change #3. */
head link { display: var(--signoff-scenery, block); }
head link:first-of-type::before {
  content: "";
  display: var(--signoff-scenery, block);
  position: fixed;
  left: calc(2vw + 60px);
  bottom: calc(2vh + 470px);
  width: 340px;
  height: 240px;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(circle 2px at 12% 84%, rgba(226, 240, 252, 0.5) 0%, rgba(226, 240, 252, 0) 100%),
    radial-gradient(circle 1.5px at 30% 60%, rgba(226, 240, 252, 0.4) 0%, rgba(226, 240, 252, 0) 100%),
    radial-gradient(circle 2.5px at 55% 74%, rgba(226, 240, 252, 0.55) 0%, rgba(226, 240, 252, 0) 100%),
    radial-gradient(circle 1.5px at 70% 40%, rgba(226, 240, 252, 0.35) 0%, rgba(226, 240, 252, 0) 100%),
    radial-gradient(circle 2px at 44% 26%, rgba(226, 240, 252, 0.4) 0%, rgba(226, 240, 252, 0) 100%),
    radial-gradient(circle 1.2px at 84% 62%, rgba(226, 240, 252, 0.3) 0%, rgba(226, 240, 252, 0) 100%),
    radial-gradient(circle 1.8px at 22% 34%, rgba(226, 240, 252, 0.35) 0%, rgba(226, 240, 252, 0) 100%);
  will-change: transform;
  animation: signoff-motes 19s ease-in-out infinite;
}
/* ═══ a second, nearer layer of dust — a few larger, softer bokeh flecks
   catching the glow, drifting slower and slightly counter to the fine
   motes above. The parallax between the two sells the column of light as
   real depth. Small layer, transform+opacity only; no will-change (budget
   is full), rare/slow so it costs nothing. */
head link:first-of-type::after {
  content: "";
  display: var(--signoff-scenery, block);
  position: fixed;
  left: calc(2vw + 42px);
  bottom: calc(2vh + 508px);
  width: 380px;
  height: 268px;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(circle 3.5px at 18% 80%, rgba(214, 232, 250, 0.34) 0%, rgba(214, 232, 250, 0) 100%),
    radial-gradient(circle 4px at 62% 58%, rgba(214, 232, 250, 0.28) 0%, rgba(214, 232, 250, 0) 100%),
    radial-gradient(circle 3px at 40% 40%, rgba(214, 232, 250, 0.26) 0%, rgba(214, 232, 250, 0) 100%),
    radial-gradient(circle 4.5px at 80% 72%, rgba(214, 232, 250, 0.22) 0%, rgba(214, 232, 250, 0) 100%);
  animation: signoff-motes-near 27s ease-in-out infinite;
}

/* ═══ the curved GLASS — painted last, ON TOP of whatever the screen
   shows: a diagonal specular sheen of the room reflected in the tube,
   an upper-left glass highlight, and a barrel vignette curving the
   picture's corners away. STATIC. */
head::after {
  content: "";
  display: var(--signoff-scenery, block);
  position: fixed;
  left: calc(2vw + 74px);
  bottom: calc(2vh + 130px);
  width: 312px;
  height: 260px;
  z-index: -1;
  pointer-events: none;
  border-radius: 24px;
  background:
    linear-gradient(115deg, rgba(214, 232, 252, 0) 32%, rgba(224, 238, 254, 0.09) 43%, rgba(238, 248, 255, 0.14) 48%, rgba(224, 238, 254, 0.06) 54%, rgba(214, 232, 252, 0) 66%),
    radial-gradient(ellipse 46% 26% at 32% 14%, rgba(206, 228, 250, 0.14) 0%, rgba(206, 228, 250, 0) 70%),
    radial-gradient(ellipse 135% 105% at 50% 46%, rgba(2, 6, 12, 0) 50%, rgba(2, 6, 12, 0.42) 84%, rgba(1, 3, 7, 0.72) 100%);
  box-shadow: inset 0 0 30px rgba(1, 3, 8, 0.4);
}

/* ═══ CREDITS — caption light hanging in the dark middle of the room.
   No bands, no boxes: glowing type over the lane scrim, TV-blue halo
   over a hard dark drop so it reads on anything. */

/* SMPTE accent cycle down the credits — yellow, cyan, green, magenta
   (the intro is section 1, so the first block lands on 4n+2 = yellow).
   Content-agnostic: custom credit types just pick up the next hue. */
.credits-block:nth-of-type(4n + 2),
.credits-slide:nth-of-type(4n + 2) { --signoff-hue: var(--signoff-yellow); --signoff-hue-soft: rgba(227, 201, 63, 0.3); }
.credits-block:nth-of-type(4n + 3),
.credits-slide:nth-of-type(4n + 3) { --signoff-hue: var(--signoff-cyan); --signoff-hue-soft: rgba(79, 212, 212, 0.3); }
.credits-block:nth-of-type(4n),
.credits-slide:nth-of-type(4n) { --signoff-hue: var(--signoff-green); --signoff-hue-soft: rgba(88, 207, 107, 0.3); }
.credits-block:nth-of-type(4n + 1),
.credits-slide:nth-of-type(4n + 1) { --signoff-hue: var(--signoff-magenta); --signoff-hue-soft: rgba(214, 112, 214, 0.3); }

.credits-block__title {
  font-weight: 600;
  letter-spacing: 0.18em;
  color: var(--signoff-hue, var(--signoff-gray));
  text-shadow:
    0 2px 12px rgba(1, 3, 8, 0.95),
    0 0 24px var(--signoff-hue-soft, rgba(156, 196, 232, 0.25)),
    0 0 3px rgba(240, 246, 252, 0.28);
}
/* base gold rule becomes a tiny SMPTE strip — the TV's colors echoed
   under each title, dim, like the bars reflected in the room */
.credits-block__title::after {
  width: 120px;
  height: 5px;
  margin: 0.65em auto 0;
  opacity: 0.55;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0) 55%),
    linear-gradient(90deg, #b6bcc0 0 14.28%, #c2ba36 0 28.57%, #34c2be 0 42.85%, #34b846 0 57.14%, #bd42b7 0 71.42%, #c53c36 0 85.71%, #3844c2 0 100%);
}

/* names: soft phosphor-white glow floating in the dark. Sacred:
   wrap, never clip. Amounts read warm — the only amber in the room
   besides the VCR clock. */
.credit {
  max-width: min(44rem, 92vw);
  margin-inline: auto;
  min-width: 0;
  overflow-wrap: anywhere;
  line-height: 1.45;
  letter-spacing: 0.04em;
  text-shadow: 0 2px 8px rgba(1, 3, 8, 0.95), 0 0 14px rgba(156, 196, 232, 0.18);
}
.credit__name { color: var(--signoff-white); }
.credit__amount {
  opacity: 1;
  font-size: 0.82em;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--signoff-amber);
  text-shadow: 0 2px 8px rgba(1, 3, 8, 0.95), 0 0 12px rgba(255, 184, 77, 0.25);
  font-variant-numeric: tabular-nums;
}
.credit__amount::before {
  content: " \\00B7 ";
  font-weight: 400;
  color: rgba(174, 191, 210, 0.55);
}

/* ═══ flourish cards ═══ */

/* intro: the TEST CARD — the circle hangs behind the station slate.
   It rides the roll (a flourish descendant), so its fine gratings and
   hairlines can never flicker against the crawl. */
.flourish--intro {
  gap: 1.05rem;
  padding: 4.5rem 1.5rem;
}
/* Scroll mode only: give the flow flourish a positioning context so its
   ::before test card anchors to it. In SLIDESHOW the element already carries
   .credits-slide (position:absolute;inset:0) — re-declaring position here
   would clobber that and collapse the slide off-center, so scope to the roll. */
.credits-roll .flourish--intro { position: relative; }
.flourish--intro::before {
  content: "";
  display: var(--signoff-scenery, block);
  position: absolute;
  left: 50%;
  top: 50%;
  width: min(600px, 92vw);
  height: min(600px, 92vw);
  transform: translate(-50%, -50%);
  z-index: -1;
  pointer-events: none;
  opacity: 0.94;
  background:
    radial-gradient(ellipse 46% 30% at 38% 30%, rgba(198, 220, 246, 0.12) 0%, rgba(198, 220, 246, 0) 62%),
    radial-gradient(circle at 50% 47%, rgba(120, 150, 190, 0.12) 0%, rgba(90, 118, 160, 0.05) 34%, rgba(70, 96, 140, 0) 58%),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cdefs%3E%3CclipPath id='c'%3E%3Ccircle cx='200' cy='200' r='182'/%3E%3C/clipPath%3E%3CradialGradient id='face' cx='.5' cy='.43' r='.62'%3E%3Cstop offset='0' stop-color='%23141f30'/%3E%3Cstop offset='.55' stop-color='%230c1523'/%3E%3Cstop offset='1' stop-color='%23050a13'/%3E%3C/radialGradient%3E%3CradialGradient id='vig' cx='.5' cy='.48' r='.52'%3E%3Cstop offset='.55' stop-color='%23000000' stop-opacity='0'/%3E%3Cstop offset='.82' stop-color='%23020509' stop-opacity='.45'/%3E%3Cstop offset='1' stop-color='%23010306' stop-opacity='.9'/%3E%3C/radialGradient%3E%3ClinearGradient id='bezel' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23d7e4f2'/%3E%3Cstop offset='.5' stop-color='%234a5c72'/%3E%3Cstop offset='1' stop-color='%230e1826'/%3E%3C/linearGradient%3E%3Cfilter id='soft'%3E%3CfeGaussianBlur stdDeviation='.5'/%3E%3C/filter%3E%3Cfilter id='glow'%3E%3CfeGaussianBlur stdDeviation='4.5'/%3E%3C/filter%3E%3C/defs%3E%3Ccircle cx='200' cy='200' r='190' fill='%23030710'/%3E%3Ccircle cx='200' cy='200' r='187' fill='url(%23face)'/%3E%3Cg clip-path='url(%23c)'%3E%3Cg filter='url(%23glow)' opacity='.55'%3E%3Crect x='18' y='62' width='60' height='44' fill='%23d8cf3e'/%3E%3Crect x='78' y='62' width='61' height='44' fill='%2340d6d0'/%3E%3Crect x='139' y='62' width='61' height='44' fill='%2340cf54'/%3E%3Crect x='200' y='62' width='61' height='44' fill='%23cf4ac9'/%3E%3Crect x='261' y='62' width='61' height='44' fill='%23d8433c'/%3E%3Crect x='322' y='62' width='60' height='44' fill='%233b4ad8'/%3E%3C/g%3E%3Cg filter='url(%23soft)'%3E%3Crect x='18' y='62' width='60' height='44' fill='%23c7bf38'/%3E%3Crect x='78' y='62' width='61' height='44' fill='%2338c2be'/%3E%3Crect x='139' y='62' width='61' height='44' fill='%2338bd4c'/%3E%3Crect x='200' y='62' width='61' height='44' fill='%23bd42b7'/%3E%3Crect x='261' y='62' width='61' height='44' fill='%23c53c36'/%3E%3Crect x='322' y='62' width='60' height='44' fill='%23343fc7'/%3E%3Crect x='18' y='62' width='364' height='11' fill='%23ffffff' fill-opacity='.16'/%3E%3Crect x='18' y='98' width='364' height='8' fill='%23000000' fill-opacity='.2'/%3E%3C/g%3E%3Cg opacity='.9'%3E%3Crect x='18' y='114' width='45' height='16' fill='%23eef3f8'/%3E%3Crect x='109' y='114' width='45' height='16' fill='%23eef3f8'/%3E%3Crect x='200' y='114' width='45' height='16' fill='%23eef3f8'/%3E%3Crect x='291' y='114' width='45' height='16' fill='%23eef3f8'/%3E%3Crect x='63' y='114' width='46' height='16' fill='%23080c12'/%3E%3Crect x='154' y='114' width='46' height='16' fill='%23080c12'/%3E%3Crect x='245' y='114' width='46' height='16' fill='%23080c12'/%3E%3Crect x='336' y='114' width='46' height='16' fill='%23080c12'/%3E%3C/g%3E%3Crect x='18' y='176' width='364' height='50' fill='%23070b11' opacity='.66'/%3E%3Cpath d='M18 176 Q200 172 382 176 M18 226 Q200 230 382 226' fill='none' stroke='%23aebfd2' stroke-opacity='.34' stroke-width='1.4'/%3E%3Cg stroke='%23e2ecf6' stroke-opacity='.72' filter='url(%23soft)'%3E%3Cpath d='M82 238 V264 M94 238 V264 M106 238 V264 M118 238 V264 M130 238 V264' stroke-width='4'/%3E%3Cpath d='M154 238 V264 M162 238 V264 M170 238 V264 M178 238 V264 M186 238 V264 M194 238 V264' stroke-width='2.6'/%3E%3Cpath d='M214 238 V264 M220 238 V264 M226 238 V264 M232 238 V264 M238 238 V264 M244 238 V264 M250 238 V264' stroke-width='1.7'/%3E%3Cpath d='M266 238 V264 M270 238 V264 M274 238 V264 M278 238 V264 M282 238 V264 M286 238 V264 M290 238 V264 M294 238 V264 M298 238 V264 M302 238 V264 M306 238 V264 M310 238 V264' stroke-width='1'/%3E%3C/g%3E%3Cg%3E%3Crect x='18' y='278' width='61' height='30' fill='%230d131b'/%3E%3Crect x='79' y='278' width='60' height='30' fill='%232f3742'/%3E%3Crect x='139' y='278' width='61' height='30' fill='%23545c67'/%3E%3Crect x='200' y='278' width='61' height='30' fill='%23838b96'/%3E%3Crect x='261' y='278' width='61' height='30' fill='%23b7bfc8'/%3E%3Crect x='322' y='278' width='60' height='30' fill='%23eef3f8'/%3E%3Crect x='18' y='278' width='364' height='6' fill='%23ffffff' fill-opacity='.09'/%3E%3Crect x='18' y='302' width='364' height='6' fill='%23000000' fill-opacity='.24'/%3E%3C/g%3E%3Ctext x='200' y='344' font-family='Courier New,monospace' font-weight='bold' font-size='15' letter-spacing='6' text-anchor='middle' fill='%23c2d0e0' fill-opacity='.82'%3EKSGN-TV 9%3C/text%3E%3Cg stroke='%236f8298' stroke-opacity='.16' stroke-width='1.3' fill='none'%3E%3Cpath d='M62 22 Q58 200 62 378 M108 20 Q106 200 108 380 M154 19 Q153 200 154 381 M246 19 Q247 200 246 381 M292 20 Q294 200 292 380 M338 22 Q342 200 338 378'/%3E%3Cpath d='M22 62 Q200 58 378 62 M20 108 Q200 106 380 108 M19 154 Q200 153 381 154 M19 246 Q200 247 381 246 M20 292 Q200 294 380 292 M22 338 Q200 342 378 338'/%3E%3C/g%3E%3Cpath d='M200 18 Q196 200 200 382 M18 200 Q200 196 382 200' fill='none' stroke='%23e2ecf6' stroke-opacity='.42' stroke-width='1.5'/%3E%3Ccircle cx='200' cy='200' r='8' fill='none' stroke='%23e2ecf6' stroke-opacity='.6' stroke-width='1.5'/%3E%3Ccircle cx='200' cy='200' r='2.4' fill='%23e2ecf6' fill-opacity='.7'/%3E%3Cg stroke='%2384929e' stroke-opacity='.5' stroke-width='2' fill='none'%3E%3Cpath d='M34 34 h16 M34 34 v16 M366 34 h-16 M366 34 v16 M34 366 h16 M34 366 v-16 M366 366 h-16 M366 366 v-16'/%3E%3C/g%3E%3Crect x='0' y='0' width='400' height='400' fill='url(%23vig)'/%3E%3C/g%3E%3Ccircle cx='200' cy='200' r='189' fill='none' stroke='url(%23bezel)' stroke-width='6'/%3E%3Ccircle cx='200' cy='200' r='185.5' fill='none' stroke='%23020509' stroke-opacity='.85' stroke-width='2'/%3E%3Cpath d='M92 44 A187 187 0 0 1 356 92' fill='none' stroke='%23eef4fb' stroke-opacity='.5' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M62 320 A187 187 0 0 0 300 360' fill='none' stroke='%23050a14' stroke-opacity='.7' stroke-width='2.5' stroke-linecap='round'/%3E%3C/svg%3E") center / contain no-repeat;
}

/* badge -> the station ident line (copy swap via font-size:0 + ::after) */
.flourish__badge { font-size: 0; border: 0; border-radius: 0; padding: 0; box-shadow: none; }
.flourish__badge::after {
  content: "KSGN-TV \\00B7 CHANNEL 9 \\00B7 END OF BROADCAST DAY";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.74rem;
  letter-spacing: 0.34em;
  padding: 0.6em 0.9em 0.6em 1.24em;
  color: var(--signoff-gray);
  background: var(--signoff-ink);
  box-shadow: inset 0 0 0 1px rgba(174, 191, 210, 0.28);
}

/* the streamer's title: restyle only — the sign-off slate. Condensed
   gothic caps on the black band with a hairline double frame. */
.flourish--intro .flourish__title {
  font-weight: 700;
  letter-spacing: 0.07em;
  line-height: 1.1;
  max-width: min(86vw, 13em);
  padding: 0.18em 0.55em 0.14em;
  color: var(--signoff-white);
  background:
    linear-gradient(107deg, rgba(224, 238, 254, 0) 30%, rgba(228, 242, 255, 0.09) 43%, rgba(238, 248, 255, 0.15) 48%, rgba(228, 242, 255, 0.08) 53%, rgba(224, 238, 254, 0) 66%),
    linear-gradient(180deg, rgba(170, 196, 230, 0.12) 0%, rgba(170, 196, 230, 0) 30%),
    var(--signoff-ink);
  box-shadow: inset 0 0 0 1px rgba(232, 238, 245, 0.3), inset 0 0 0 5px rgba(2, 4, 8, 0.01), inset 0 0 0 6px rgba(232, 238, 245, 0.14);
  text-shadow: 0 0 18px rgba(190, 214, 240, 0.28), 0 0 4px rgba(220, 234, 250, 0.35);
}

/* tagline: restyle only — the announcer's line, typed lowercase */
.flourish__tagline {
  font-family: var(--credits-font);
  font-style: italic;
  font-size: 1rem;
  letter-spacing: 0.12em;
  padding: 0.14em 0.7em;
  color: rgba(174, 191, 210, 0.9);
  background: rgba(2, 4, 8, 0.6);
}

/* rating -> PLEASE STAND BY (copy swap), breathing on a steps() blink:
   2 paints per 2.8s ≈ 0.7 paints/s — in-roll ceiling is 2/s. */
.flourish__rating { font-size: 0; border: 0; padding: 0; opacity: 1; }
.flourish__rating::after {
  content: "\\25CF PLEASE STAND BY";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 0.3em;
  padding: 0.55em 0.9em 0.55em 1.2em;
  color: var(--signoff-white);
  background: var(--signoff-ink);
  box-shadow: inset 0 0 0 1px rgba(232, 238, 245, 0.35);
  animation: signoff-rating 2.8s steps(1, end) infinite;
}

/* the bars, printed on the card itself: SMPTE row + PLUGE row */
.flourish--intro::after {
  content: "";
  display: var(--signoff-scenery, block);
  width: min(430px, 72vw);
  height: 30px;
  margin-top: 0.4rem;
  background:
    linear-gradient(90deg, #c0c0c0 0 14.28%, #c6bf39 0 28.57%, #39c6c2 0 42.85%, #39bc47 0 57.14%, #c141bd 0 71.42%, #c93a34 0 85.71%, #3941c6 0 100%) 0 0 / 100% 21px no-repeat,
    linear-gradient(90deg, #3941c6 0 14.28%, #0c0f14 0 28.57%, #c141bd 0 42.85%, #0c0f14 0 57.14%, #39c6c2 0 71.42%, #0c0f14 0 85.71%, #c0c0c0 0 100%) 0 23px / 100% 7px no-repeat;
  box-shadow: 0 2px 12px rgba(1, 3, 7, 0.6);
}

/* outro: the carrier drops — a breath of static dissolving to black
   behind END OF TRANSMISSION, then the picture collapses to a dot. */
.flourish--outro {
  gap: 1.15rem;
  padding-bottom: 5.5rem;
}
/* Scroll only — same reason as the intro: don't override .credits-slide's
   absolute/inset:0 in slideshow (that collapses the slide off to one side). */
.credits-roll .flourish--outro { position: relative; }
.flourish--outro::before {
  content: "";
  display: var(--signoff-scenery, block);
  position: absolute;
  left: 50%;
  top: -2.5rem;
  bottom: 0;
  width: min(720px, 96vw);
  transform: translateX(-50%);
  z-index: -1;
  pointer-events: none;
  opacity: 0.2;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 240px 240px;
  -webkit-mask-image: radial-gradient(ellipse 65% 78% at 50% 30%, #000 0%, rgba(0, 0, 0, 0.5) 55%, transparent 82%);
  mask-image: radial-gradient(ellipse 65% 78% at 50% 30%, #000 0%, rgba(0, 0, 0, 0.5) 55%, transparent 82%);
}
.flourish--outro .flourish__title { font-size: 0; }
.flourish--outro .flourish__title::after {
  content: "END OF TRANSMISSION";
  display: inline-block;
  font-family: var(--credits-title-font);
  font-weight: 700;
  font-size: calc(var(--credits-flourish-title-size) * 0.88);
  letter-spacing: 0.12em;
  line-height: 1.1;
  padding: 0.18em 0.55em 0.14em;
  color: var(--signoff-white);
  background:
    linear-gradient(107deg, rgba(224, 238, 254, 0) 32%, rgba(228, 242, 255, 0.08) 44%, rgba(238, 248, 255, 0.14) 49%, rgba(228, 242, 255, 0.07) 54%, rgba(224, 238, 254, 0) 66%),
    linear-gradient(180deg, rgba(170, 196, 230, 0.1) 0%, rgba(170, 196, 230, 0) 32%),
    var(--signoff-ink);
  box-shadow: inset 0 0 0 1px rgba(232, 238, 245, 0.3);
  text-shadow: 0 0 30px rgba(180, 206, 236, 0.34), 0 0 8px rgba(214, 232, 250, 0.4), 0 0 3px rgba(232, 240, 250, 0.5);
}
.flourish--outro .flourish__tagline { font-size: 0; background: none; }
.flourish--outro .flourish__tagline::after {
  content: "this concludes our broadcast day \\2014 good night";
  display: inline-block;
  font-family: var(--credits-font);
  font-style: italic;
  font-size: 1rem;
  letter-spacing: 0.14em;
  padding: 0.14em 0.7em;
  color: rgba(174, 191, 210, 0.88);
  background: rgba(2, 4, 8, 0.6);
}
/* the picture collapses — the raster crushes to a bright horizontal LINE
   (the classic CRT power-off), a hot bloom-dot rides its center, and a
   soft afterglow hangs where the phosphor is cooling. */
.flourish--outro::after {
  content: "";
  display: var(--signoff-scenery, block);
  width: min(420px, 64vw);
  height: 40px;
  margin-top: 1.6rem;
  background:
    radial-gradient(circle 3px at 50% 50%, #ffffff 0%, #eaf3fb 55%, rgba(234, 243, 251, 0) 100%) no-repeat,
    linear-gradient(90deg, rgba(219, 231, 242, 0) 0%, rgba(219, 231, 242, 0.6) 30%, #eef5fc 50%, rgba(219, 231, 242, 0.6) 70%, rgba(219, 231, 242, 0) 100%) no-repeat,
    radial-gradient(ellipse 60% 100% at 50% 50%, rgba(200, 220, 240, 0.28) 0%, rgba(200, 220, 240, 0) 70%) no-repeat;
  background-size: 100% 100%, 100% 2px, 100% 100%;
  background-position: center, center, center;
  filter: drop-shadow(0 0 12px rgba(219, 231, 242, 0.5));
}

/* ═══ raid finale: SPECIAL BULLETIN — the broadcast interrupts itself.
   The block warms bulletin-red with a typed alert eyebrow and a barber
   strip; the pulse is steps() at ~0.8 paints/s. */
.credits-block:nth-last-of-type(2),
.credits-slide:nth-last-of-type(2):not(.flourish) {
  --signoff-hue: #ffd7d2;
  --signoff-hue-soft: rgba(255, 120, 110, 0.4);
}
.credits-block:nth-last-of-type(2) {
  background: radial-gradient(ellipse 55% 58% at 50% 32%, rgba(212, 60, 60, 0.14), rgba(212, 60, 60, 0) 72%);
}
.credits-slide:nth-last-of-type(2):not(.flourish) {
  background: radial-gradient(ellipse 62% 56% at 50% 46%, rgba(212, 60, 60, 0.13), rgba(212, 60, 60, 0) 80%);
}
.credits-block:nth-last-of-type(2) .credits-block__title,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
  animation: signoff-bulletin 2.4s steps(1, end) infinite;
}
.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  content: "\\25A0 SPECIAL BULLETIN \\00B7 WE INTERRUPT THIS PROGRAM";
  display: block;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.62rem;
  letter-spacing: 0.4em;
  margin-bottom: 0.5em;
  color: #ff9a90;
  text-shadow: 0 2px 8px rgba(1, 3, 8, 0.95);
}
.credits-block:nth-last-of-type(2) .credits-block__title::after,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::after {
  background: repeating-linear-gradient(-45deg, #d43c3c 0 10px, #f2f5f7 10px 20px);
  opacity: 0.9;
}
.credits-block:nth-last-of-type(2) .credit,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit {
  font-size: calc(var(--credits-name-size) * 1.1);
}

/* ═══ slideshow: a hard broadcast cut softened by a breath of vertical
   hold — the slide settles 8px like the picture catching sync. */
.credits-slide {
  transform: translateY(8px);
  transition: opacity 0.7s ease, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}
.credits-slide.is-active { transform: none; }

/* ═══ keyframes (all signoff- prefixed; transform/opacity ONLY) ═══ */
/* the 27s master clock: bars 0–40%, PLEASE STAND BY 40–63%, static
   63–100%. steps(1,end) holds each value until the next key. */
@keyframes signoff-tv-bars {
  0%   { opacity: 1; }
  40%  { opacity: 0; }
  100% { opacity: 0; }
}
@keyframes signoff-tv-standby {
  0%   { opacity: 0; }
  40%  { opacity: 1; }
  63%  { opacity: 0; }
  100% { opacity: 0; }
}
@keyframes signoff-tv-static {
  0%   { opacity: 0; }
  63%  { opacity: 0.92; }
  100% { opacity: 0.92; }
}
/* the static churns: the noise box snaps around a few px, tiles beating
   against each other read as boiling snow */
@keyframes signoff-static-jitter {
  0%   { transform: translate3d(0, 0, 0); }
  20%  { transform: translate3d(-3px, 2px, 0); }
  40%  { transform: translate3d(2px, -2px, 0); }
  60%  { transform: translate3d(-2px, -3px, 0); }
  80%  { transform: translate3d(3px, 1px, 0); }
  100% { transform: translate3d(0, 0, 0); }
}
/* the room light, locked to the same 27s clock: slow breathe while the
   bars hold, a dim drop for STAND BY, hard steps() flicker while the
   static rolls, then back to the bars' glow as the loop closes. */
@keyframes signoff-glow {
  0%    { opacity: 0.84; }
  10%   { opacity: 0.9; }
  22%   { opacity: 0.8; }
  34%   { opacity: 0.88; }
  39.5% { opacity: 0.84; animation-timing-function: steps(1, end); }
  40%   { opacity: 0.62; }
  50%   { opacity: 0.7; }
  62.5% { opacity: 0.64; animation-timing-function: steps(1, end); }
  63%   { opacity: 0.98; animation-timing-function: steps(1, end); }
  66%   { opacity: 0.6;  animation-timing-function: steps(1, end); }
  70%   { opacity: 1;    animation-timing-function: steps(1, end); }
  73%   { opacity: 0.64; animation-timing-function: steps(1, end); }
  77%   { opacity: 0.9;  animation-timing-function: steps(1, end); }
  81%   { opacity: 0.58; animation-timing-function: steps(1, end); }
  85%   { opacity: 0.96; animation-timing-function: steps(1, end); }
  89%   { opacity: 0.68; animation-timing-function: steps(1, end); }
  93%   { opacity: 0.9;  animation-timing-function: steps(1, end); }
  97%   { opacity: 0.62; animation-timing-function: steps(1, end); }
  100%  { opacity: 0.84; }
}
/* aviation beacon: long on, short off — procedure, not a strobe */
@keyframes signoff-beacon {
  0%, 62%  { opacity: 1; }
  68%, 94% { opacity: 0.05; }
  100%     { opacity: 1; }
}
/* dust motes: a lazy thermal loop up through the light column */
@keyframes signoff-motes {
  0%   { transform: translate3d(0, 0, 0); opacity: 0.55; }
  25%  { transform: translate3d(-8px, -16px, 0); opacity: 0.8; }
  50%  { transform: translate3d(-2px, -30px, 0); opacity: 0.65; }
  75%  { transform: translate3d(6px, -14px, 0); opacity: 0.8; }
  100% { transform: translate3d(0, 0, 0); opacity: 0.55; }
}
/* the nearer bokeh: a slower, gentler drift counter to the fine motes */
@keyframes signoff-motes-near {
  0%   { transform: translate3d(0, 0, 0); opacity: 0.5; }
  30%  { transform: translate3d(9px, -12px, 0); opacity: 0.72; }
  55%  { transform: translate3d(4px, -24px, 0); opacity: 0.58; }
  80%  { transform: translate3d(-7px, -11px, 0); opacity: 0.7; }
  100% { transform: translate3d(0, 0, 0); opacity: 0.5; }
}
/* PLEASE STAND BY badge on the intro card: the lamp dips once per cycle */
@keyframes signoff-rating {
  0%, 64%  { opacity: 1; }
  72%, 90% { opacity: 0.4; }
  100%     { opacity: 1; }
}
/* bulletin title: two discrete dips per 2.4s */
@keyframes signoff-bulletin {
  0%, 55%  { opacity: 1; }
  62%, 88% { opacity: 0.72; }
  100%     { opacity: 1; }
}

/* ═══ reduced motion: the room holds one frame — bars up, glow steady,
   beacon lit, motes hanging, static and stand-by screens dark. */
@media (prefers-reduced-motion: reduce) {
  html::after { animation: none; opacity: 0.84; }
  head meta:first-of-type::before { animation: none; opacity: 1; }
  head meta:first-of-type::after { animation: none; opacity: 0; }
  head meta:last-of-type::before { animation: none; opacity: 0; transform: none; }
  head title::after { animation: none; opacity: 1; }
  head link:first-of-type::before { animation: none; transform: translate3d(-4px, -18px, 0); }
  head link:first-of-type::after { animation: none; transform: translate3d(3px, -14px, 0); }
  .flourish__rating::after { animation: none; }
  .credits-block:nth-last-of-type(2) .credits-block__title,
  .credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
    animation: none;
  }
  .credits-slide { transform: none; transition: opacity 0.7s ease; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--signoff-scenery:none;}",
};
