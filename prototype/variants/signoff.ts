import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. End of Broadcast: 11:59 PM at station KSGN-TV channel 9 — the test card is up, the tower beacon blinks on the ridge, and the sign-off log rolls as white-on-black captions until the carrier collapses to a dot. */
export const VARIANT: ThemeVariant = {
  key: "signoff",
  name: "End of Broadcast (Test Card)",
  css: `@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap');
/* ================================================================
   END OF BROADCAST — layered after the base theme.
   Fiction: 11:59 PM, station KSGN-TV channel 9. Programming is over;
   the engineer has punched up the test card and the SMPTE bars, the
   transmitter tower on the ridge keeps blinking its aviation beacon,
   and the master control clock reads one minute to sign-off. The
   credits are the station's PROGRAM LOG, read out as white-on-black
   broadcast captions inside the title-safe area. A raid interrupts
   the log as a red SPECIAL BULLETIN slate; then the carrier drops:
   END OF TRANSMISSION, a breath of static, and the picture collapses
   to a single white dot. Good night.
   Layer map (all scenery kill-switched via --signoff-scenery):
     html bg (--credits-bg)   off-air monitor: 6-stop blue-black + one
                              faint phosphor lift (cheap, L3)
     html::before             LIGHT STORY — center tube glow, corner
                              vignette, floor falloff, a whisper of
                              beacon red near the tower. STATIC, promoted
     html::after              SMPTE bars strip pinned to the top screen
                              edge (LARGE bars = coarse; edge = L6-legal)
                              + soft spill under it. STATIC, promoted
     body::before             analog hum bar — one soft 16vh band that
                              hops down the screen, steps(1), one hop
                              per 3s (coarse, ~4% alpha; L6-legal)
     head::before             THE TOWER — lattice transmitter mast SVG
                              on the lower-right ridge: rim light, red
                              beacon housing, equipment shack, ground
                              shadow. STATIC, promoted
     head::after              the beacon LAMP — small fixed halo at the
                              mast tip, steps(1) blink (~0.8 paints/s;
                              not a continuous mover, no will-change)
     meta#1::before           master control clock, top-right corner
                              inside the safe area: 23:59:07 / SIGN-OFF.
                              STATIC text OSD
     meta#1::after            title-safe frame — corner brackets only
                              (coarse strokes at the screen corners,
                              off the lane). STATIC
     meta#2::before           station bug "KSGN-TV 9", bottom-left,
                              translucent watermark. STATIC
     .credits-roll::before    broadcast snow (fine noise RIDES THE ROLL)
     .credits-slideshow::before  same, static per L6
     .flourish--intro::before test pattern circle SVG behind the intro
                              card (rides the roll — fine detail legal)
     .flourish--outro::before static-to-black snow patch behind the
                              outro (rides the roll, masked to dissolve)
   will-change budget: 0 of 2 — nothing here moves continuously.
   ================================================================ */

:root {
  /* ── palette: master control at midnight ── */
  --signoff-scenery: block; /* set to none to strip every scenery layer */
  --signoff-white: #f2f5f7;   /* caption white */
  --signoff-gray: #aebfd2;    /* engineer's slate gray-blue */
  --signoff-amber: #ffb84d;   /* meters + amounts */
  --signoff-red: #d43c3c;     /* bulletin red */
  --signoff-yellow: #e3c93f;  /* SMPTE accents, tuned for dark bg */
  --signoff-cyan: #4fd4d4;
  --signoff-green: #58cf6b;
  --signoff-magenta: #d670d6;
  --signoff-ink: rgba(2, 4, 8, 0.82); /* the caption band */

  /* ── base hooks ── */
  /* Cheap off-air monitor: the picture tube seen from a dark room. A warm
     phosphor lift blooms where the beam still rests (center-high), a cool
     blue-black glass ramp falls to a near-black floor, and a low horizon
     band warms just barely — the last light of the day dying behind the
     ridge. 8 stops, all in --credits-bg (L3: the real light + curvature
     live on the promoted html::before). */
  --credits-bg:
    radial-gradient(ellipse 74% 48% at 50% 30%, rgba(36, 52, 78, 0.62) 0%, rgba(28, 42, 64, 0.28) 42%, rgba(20, 30, 48, 0) 72%),
    radial-gradient(ellipse 120% 40% at 50% 99%, rgba(58, 34, 26, 0.22) 0%, rgba(40, 26, 22, 0.08) 40%, rgba(20, 14, 12, 0) 72%),
    linear-gradient(90deg, rgba(1, 3, 8, 0.5) 0%, rgba(1, 3, 8, 0) 22%, rgba(1, 3, 8, 0) 78%, rgba(1, 3, 8, 0.5) 100%),
    linear-gradient(180deg, #04070d 0%, #070d18 18%, #0b1322 40%, #0c1524 55%, #091220 70%, #060d18 84%, #030711 93%, #010308 100%);
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
   base mask so captions still ease in at the floor and out at the top. */
html { -webkit-mask-image: none; mask-image: none; }
body { background: transparent; counter-reset: signoff-log; }

/* ═══ THE TUBE — CRT glass and the light that lives in it. This is the
   hero material: a curved phosphor face seen in a dark control room.
   Reading top→bottom in the stack:
     · specular SHEEN — a soft diagonal band of reflected room light lying
       ON the glass, upper-left, the tell that this is a convex surface;
     · barrel VIGNETTE — a deep radial that crushes and cools the four
       corners, faking the glass curving away from the beam (the corner
       falloff is what makes a flat rectangle read as a bowed tube);
     · phosphor BLOOM — the warm lift where the beam rests high-center,
       the picture being the room's only lamp;
     · a whisper of beacon RED hanging over the ridge by the tower;
     · floor falloff into black.
   Everything huge and soft: nothing here can flicker against glyphs.
   STATIC, promoted. */
html::before {
  content: "";
  display: var(--signoff-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background:
    linear-gradient(122deg, rgba(150, 178, 214, 0) 30%, rgba(150, 178, 214, 0.05) 40%, rgba(168, 194, 226, 0.075) 46%, rgba(150, 178, 214, 0.04) 52%, rgba(150, 178, 214, 0) 62%),
    radial-gradient(ellipse 150% 128% at 50% 44%, rgba(1, 2, 6, 0) 46%, rgba(2, 5, 11, 0.35) 74%, rgba(1, 2, 6, 0.78) 100%),
    radial-gradient(ellipse 82% 60% at 50% 34%, rgba(60, 88, 128, 0.11) 0%, rgba(48, 74, 112, 0.05) 44%, rgba(40, 62, 96, 0) 74%),
    radial-gradient(ellipse 58vw 40vh at 50% 33%, rgba(150, 180, 214, 0.085), rgba(150, 180, 214, 0) 70%),
    radial-gradient(ellipse 34vw 22vh at 84% 92%, rgba(226, 88, 66, 0.09), rgba(226, 88, 66, 0) 70%),
    linear-gradient(180deg, rgba(1, 2, 5, 0) 58%, rgba(1, 2, 5, 0.55) 100%);
}

/* ═══ SMPTE BARS — the top screen edge belongs to the bars, exactly like
   a monitor with the generator patched in. Seven LARGE bars (each ~14vw
   wide = coarse) in one 14px band at the very top (edges are L6-legal),
   a hard sync line under them, and a soft spill fading into the picture.
   STATIC, promoted. */
html::after {
  content: "";
  display: var(--signoff-scenery, block);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 66px;
  z-index: 1;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* phosphor bloom lifting the top edge of the bars into the glass */
    linear-gradient(180deg, rgba(188, 208, 230, 0.16), rgba(188, 208, 230, 0)) 0 0 / 100% 7px no-repeat,
    /* the seven bars, each carrying a top-lit sheen + a bottom shade so they
       read as glowing phosphor swatches with a little cylinder to them */
    linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.04) 28%, rgba(0, 0, 0, 0.1) 62%, rgba(0, 0, 0, 0.26) 100%) 0 0 / 100% 17px no-repeat,
    linear-gradient(90deg, #b6bcc0 0 14.28%, #c2ba36 0 28.57%, #34c2be 0 42.85%, #34b846 0 57.14%, #bd42b7 0 71.42%, #c53c36 0 85.71%, #3844c2 0 100%) 0 0 / 100% 17px no-repeat,
    /* hard sync line + a bright scan pulse just under the bars */
    linear-gradient(180deg, rgba(220, 236, 252, 0.58), rgba(220, 236, 252, 0)) 0 17px / 100% 2px no-repeat,
    linear-gradient(180deg, rgba(1, 2, 5, 0.92), rgba(1, 2, 5, 0)) 0 19px / 100% 4px no-repeat,
    /* colored spill bleeding down into the picture (phosphor smear) */
    linear-gradient(90deg, rgba(194, 186, 54, 0.11) 21%, rgba(52, 194, 190, 0.11) 35%, rgba(52, 184, 70, 0.11) 50%, rgba(189, 66, 183, 0.11) 64%, rgba(197, 60, 54, 0.11) 78%) 0 23px / 100% 26px no-repeat,
    linear-gradient(180deg, rgba(156, 178, 206, 0.09), rgba(156, 178, 206, 0)) 0 23px / 100% 46px no-repeat;
}

/* ═══ analog hum bar — the slow vertical drift every off-air monitor has.
   One soft 16vh band, ~4% alpha (coarse per L6), hopping down the screen
   on steps(1): 12 held positions over 36s = one hop / 3s, far under the
   5 hops/s ceiling. Not a continuous mover — no will-change spent. */
body::before {
  content: "";
  display: var(--signoff-scenery, block);
  position: fixed;
  left: 0;
  right: 0;
  top: -18vh;
  height: 16vh;
  z-index: -1;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(190, 212, 238, 0) 0%, rgba(190, 212, 238, 0.045) 32%, rgba(190, 212, 238, 0.045) 68%, rgba(190, 212, 238, 0) 100%);
  animation: signoff-hum 36s steps(1, end) infinite;
}

/* ═══ THE RIDGE — the dark hill the tower stands on, and the atmosphere
   behind it. This is the mid/background plate that gives the tower somewhere
   to stand instead of floating on flat gradient, and it carries the theme's
   committed light story: a cool dusk sky the last light is draining out of,
   a warm sodium town-glow pooling low behind the far ridge, a soft haze band
   lifting the horizon (distant = lower contrast, cooler, hazier), and a real
   two-tier ridgeline SILHOUETTE (a hazed far range + a hard near hill) so the
   land reads as land. STATIC, promoted, coarse. */
html { }
body::after {
  content: "";
  display: var(--signoff-scenery, block);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 66vh;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* the ridgeline silhouette itself — a soft-hazed far range sitting behind
       a darker near hill, both washed with atmospheric perspective so the far
       one is cooler/lower-contrast. Drawn as one wide SVG pinned to the bottom
       so the tower has a horizon to key off. ONE UNBROKEN LINE. */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 520' preserveAspectRatio='none'%3E%3Cdefs%3E%3ClinearGradient id='far' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23172134' stop-opacity='.4'/%3E%3Cstop offset='1' stop-color='%230b1322' stop-opacity='.66'/%3E%3C/linearGradient%3E%3ClinearGradient id='near' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23080e18'/%3E%3Cstop offset='1' stop-color='%23020509'/%3E%3C/linearGradient%3E%3ClinearGradient id='rim' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%237c96b8' stop-opacity='.34'/%3E%3Cstop offset='1' stop-color='%237c96b8' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M0 262 C220 244 360 240 560 254 C760 268 900 226 1120 236 C1320 245 1440 232 1600 240 L1600 520 L0 520 Z' fill='url(%23far)'/%3E%3Cpath d='M0 262 C220 244 360 240 560 254 C760 268 900 226 1120 236 C1320 245 1440 232 1600 240' fill='none' stroke='url(%23rim)' stroke-width='1.5'/%3E%3Cpath d='M0 356 C200 342 380 350 600 332 C820 314 980 344 1200 330 C1380 319 1480 336 1600 328 L1600 520 L0 520 Z' fill='url(%23near)'/%3E%3Cpath d='M0 356 C200 342 380 350 600 332 C820 314 980 344 1200 330 C1380 319 1480 336 1600 328' fill='none' stroke='%234a5c74' stroke-opacity='.24' stroke-width='1.5'/%3E%3C/svg%3E") center bottom / 100% 46vh no-repeat,
    /* a soft luminous haze sitting just ABOVE the ridge — the last light in
       the sky. Wide, cool, low-alpha: this reads as the horizon so the land
       below can fall to black without a hard butt-join. */
    radial-gradient(ellipse 108vw 14vh at 50% 42%, rgba(126, 154, 192, 0.13) 0%, rgba(98, 126, 164, 0.05) 44%, rgba(80, 104, 140, 0) 74%),
    /* distant sodium town-glow — warm, low, hazed out behind the far ridge and
       pooling toward the tower side; the committed warm accent in a cool frame */
    radial-gradient(ellipse 46vw 15vh at 74% 54%, rgba(224, 158, 98, 0.14) 0%, rgba(190, 126, 82, 0.05) 42%, rgba(150, 100, 72, 0) 72%),
    radial-gradient(ellipse 30vw 9vh at 30% 58%, rgba(150, 168, 200, 0.07) 0%, rgba(130, 150, 184, 0) 70%),
    /* the landmass floor wash: a long gentle ramp from transparent sky down to
       a black floor, every stop a fade so the seam dissolves under the ridge */
    linear-gradient(180deg, rgba(6, 11, 20, 0) 0%, rgba(6, 11, 20, 0.05) 38%, rgba(4, 9, 16, 0.20) 52%, rgba(4, 8, 15, 0.44) 64%, rgba(3, 6, 12, 0.72) 78%, rgba(1, 3, 8, 0.92) 90%, rgba(1, 2, 6, 0.97) 100%);
}

/* ═══ THE TOWER — the transmitter mast on the ridge, lower-right: a tapering
   galvanized-steel lattice built for VOLUME. REBUILT this pass — the old mast
   dissolved into mud below the midpoint and its shack was clipped in the screen
   corner. Now the material story reads clean top→bottom:
     · a COOL steel body — legs and bracing keyed with sky light, not fire; the
       beacon beam is a tight RED-ONLY cone confined to just above the tip, so
       the steel stays steel instead of looking rusted/on-fire;
     · READABLE ALL THE WAY DOWN — a cool sky RIM runs the full length of the
       right leg (specular) with a fainter one on the left, the lower bracing
       carries a lit face + rim over its shadow pass, and a ground-fog band
       lifts the base off pure black so the feet don't vanish;
     · a real LEFT-side EQUIPMENT SHACK, fully on-canvas: corrugated gable roof
       with an eave highlight, a warm-lit window throwing a spill pool on the
       ground, a doorway, and a small microwave DISH on a side mast;
     · climb ladder + guy-wires + top platform detail that reward a look.
   STATIC, promoted; z:-1 keeps it behind the lane. ONE UNBROKEN data-URI. */
head { display: var(--signoff-scenery, block); }
head::before {
  content: "";
  display: var(--signoff-scenery, block);
  position: fixed;
  right: 2.6vw;
  bottom: 0;
  width: 212px;
  height: 512px;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 210 520'%3E%3Cdefs%3E%3ClinearGradient id='lgR' x1='0' y1='1' x2='0' y2='0'%3E%3Cstop offset='0' stop-color='%230c1420'/%3E%3Cstop offset='.5' stop-color='%23243347'/%3E%3Cstop offset='.85' stop-color='%233d506a'/%3E%3Cstop offset='1' stop-color='%23566f8e'/%3E%3C/linearGradient%3E%3ClinearGradient id='lgL' x1='0' y1='1' x2='0' y2='0'%3E%3Cstop offset='0' stop-color='%23080e18'/%3E%3Cstop offset='.5' stop-color='%23172333'/%3E%3Cstop offset='.85' stop-color='%232a3a51'/%3E%3Cstop offset='1' stop-color='%233c5170'/%3E%3C/linearGradient%3E%3ClinearGradient id='beam' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23ff5a48' stop-opacity='.34'/%3E%3Cstop offset='.4' stop-color='%23d23a34' stop-opacity='.12'/%3E%3Cstop offset='1' stop-color='%23902420' stop-opacity='0'/%3E%3C/linearGradient%3E%3CradialGradient id='pool' cx='.5' cy='.5' r='.5'%3E%3Cstop offset='0' stop-color='%23010308' stop-opacity='.9'/%3E%3Cstop offset='1' stop-color='%23010308' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='win' cx='.5' cy='.35' r='.75'%3E%3Cstop offset='0' stop-color='%23ffe6ad'/%3E%3Cstop offset='.55' stop-color='%23e7ad5c'/%3E%3Cstop offset='1' stop-color='%23bd7f38'/%3E%3C/radialGradient%3E%3CradialGradient id='spill' cx='.5' cy='0' r='1'%3E%3Cstop offset='0' stop-color='%23ffc879' stop-opacity='.34'/%3E%3Cstop offset='1' stop-color='%23ffc879' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='fog' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%233a4a63' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%233a4a63' stop-opacity='.16'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='0' y='430' width='210' height='90' fill='url(%23fog)'/%3E%3Cellipse cx='118' cy='497' rx='72' ry='10' fill='url(%23pool)'/%3E%3Cpath d='M108 150 L128 150 L123 46 L113 46 Z' fill='url(%23beam)'/%3E%3Cellipse cx='40' cy='500' rx='46' ry='12' fill='url(%23spill)'/%3E%3Crect x='10' y='454' width='58' height='44' rx='1.5' fill='%23141d2a'/%3E%3Crect x='10' y='454' width='58' height='44' rx='1.5' fill='none' stroke='%232f3e52' stroke-width='1'/%3E%3Crect x='10' y='454' width='2' height='44' fill='%234a6285' opacity='.5'/%3E%3Cpath d='M6 456 L39 440 L72 456 Z' fill='%23182231'/%3E%3Cpath d='M6 456 L39 440 L72 456' fill='none' stroke='%233a4d66' stroke-width='.9'/%3E%3Cpath d='M14 453 L39 441 M22 451 L39 442.5 M30 449 L39 444 M64 453 L39 441 M56 451 L39 442.5 M48 449 L39 444' stroke='%230b1119' stroke-width='.6' opacity='.7'/%3E%3Cpath d='M6 456 L72 456' stroke='%234a6082' stroke-opacity='.5' stroke-width='.8'/%3E%3Crect x='24' y='466' width='16' height='17' rx='.5' fill='url(%23win)'/%3E%3Crect x='24' y='466' width='16' height='5' fill='%23fff2d0' opacity='.6'/%3E%3Cpath d='M32 466 L32 483 M24 474.5 L40 474.5' stroke='%2361431f' stroke-width='.7' opacity='.6'/%3E%3Crect x='50' y='470' width='11' height='28' fill='%230c131d'/%3E%3Crect x='50' y='470' width='2' height='28' fill='%232a3a50'/%3E%3Cpath d='M15 454 L15 436' stroke='%232a3a50' stroke-width='2'/%3E%3Cellipse cx='11' cy='434' rx='7' ry='9' fill='%231b2636' stroke='%233d5271' stroke-width='.8'/%3E%3Cellipse cx='12.5' cy='434' rx='4.5' ry='6.5' fill='%23121b28'/%3E%3Ccircle cx='11' cy='434' r='1.1' fill='%234a6488'/%3E%3Cpath d='M90 494 L110 50' stroke='url(%23lgL)' stroke-width='6' fill='none' stroke-linecap='round'/%3E%3Cpath d='M146 494 L126 50' stroke='url(%23lgR)' stroke-width='6' fill='none' stroke-linecap='round'/%3E%3Cg stroke='%230a121e' fill='none' stroke-width='3'%3E%3Cpath d='M90.0 494 L143.4 436 M146.0 494 L92.6 436 M92.6 436 L141.0 382 M143.4 436 L95.0 382 M95.0 382 L138.8 332 M141.0 382 L97.2 332 M97.2 332 L136.8 286 M138.8 332 L99.2 286 M99.2 286 L134.9 244 M136.8 286 L101.1 244 M101.1 244 L133.2 206 M134.9 244 L102.8 206 M102.8 206 L131.7 172 M133.2 206 L104.3 172 M104.3 172 L130.4 142 M131.7 172 L105.6 142 '/%3E%3C/g%3E%3Cg stroke='%23223550' fill='none' stroke-width='2.4'%3E%3Cpath d='M90.0 494 L143.4 436 M146.0 494 L92.6 436 M92.6 436 L141.0 382 M143.4 436 L95.0 382 M95.0 382 L138.8 332 M141.0 382 L97.2 332 M97.2 332 L136.8 286 M138.8 332 L99.2 286 M99.2 286 L134.9 244 M136.8 286 L101.1 244 M101.1 244 L133.2 206 M134.9 244 L102.8 206 M102.8 206 L131.7 172 M133.2 206 L104.3 172 M104.3 172 L130.4 142 M131.7 172 L105.6 142 '/%3E%3C/g%3E%3Cg stroke='%233f597c' fill='none' stroke-width='1.1' stroke-opacity='.7'%3E%3Cpath d='M90.0 494 L143.4 436 M92.6 436 L141.0 382 M95.0 382 L138.8 332 M97.2 332 L136.8 286 M99.2 286 L134.9 244 M101.1 244 L133.2 206 M102.8 206 L131.7 172 M104.3 172 L130.4 142 '/%3E%3C/g%3E%3Cg stroke='%23263a56' fill='none' stroke-width='2.6'%3E%3Cpath d='M92.6 436 L143.4 436 M95.0 382 L141.0 382 M97.2 332 L138.8 332 M99.2 286 L136.8 286 M101.1 244 L134.9 244 M102.8 206 L133.2 206 M104.3 172 L131.7 172 M105.6 142 L130.4 142 '/%3E%3C/g%3E%3Cg stroke='%2348648a' fill='none' stroke-width='1' stroke-opacity='.55'%3E%3Cpath d='M92.6 436 L143.4 436 M95.0 382 L141.0 382 M97.2 332 L138.8 332 M99.2 286 L136.8 286 M101.1 244 L134.9 244 M102.8 206 L133.2 206 M104.3 172 L131.7 172 M105.6 142 L130.4 142 '/%3E%3C/g%3E%3Cpath d='M107.4 170 h6 M106.7 186 h6 M106.0 202 h6 M105.3 218 h6 M104.6 234 h6 M103.8 250 h6 M103.1 266 h6 M102.4 282 h6 M101.7 298 h6 M101.0 314 h6 M100.3 330 h6 M99.6 346 h6 M98.9 362 h6 M98.2 378 h6 M97.4 394 h6 M96.7 410 h6 M96.0 426 h6 ' stroke='%234a6082' stroke-opacity='.28' stroke-width='1' fill='none'/%3E%3Cpath d='M98.8 430 L110.4 170' stroke='%234a6082' stroke-opacity='.22' stroke-width='1.2' fill='none'/%3E%3Cpath d='M146 494 L126 50' stroke='%23adc6e0' stroke-opacity='.42' stroke-width='1.4' fill='none'/%3E%3Cpath d='M90 494 L110 50' stroke='%23809cc0' stroke-opacity='.24' stroke-width='1.1' fill='none'/%3E%3Crect x='106' y='46' width='24' height='5' rx='1' fill='%2334475f'/%3E%3Crect x='106' y='46' width='24' height='1.6' fill='%236f88a4' opacity='.6'/%3E%3Cpath d='M118 46 L118 8' stroke='%232a3d55' stroke-width='4.2'/%3E%3Cpath d='M118 46 L118 8' stroke='%2346608a' stroke-opacity='.5' stroke-width='1.6'/%3E%3Cpath d='M108 28 L128 28 M110 17 L126 17' stroke='%232a3d55' stroke-width='2.2'/%3E%3Cpath d='M108 28 L128 28' stroke='%2346608a' stroke-opacity='.4' stroke-width='.9'/%3E%3Cpath d='M114 46 L122 46' stroke='%23c98a72' stroke-opacity='.4' stroke-width='1'/%3E%3Ccircle cx='118' cy='6' r='4.2' fill='%236e211c'/%3E%3Ccircle cx='118' cy='6' r='4.2' fill='none' stroke='%23c9635a' stroke-opacity='.55' stroke-width='.9'/%3E%3Ccircle cx='116.6' cy='4.6' r='1.5' fill='%23e07a68' opacity='.85'/%3E%3Cpath d='M118 150 L172 470 M118 150 L64 470' stroke='%234a6082' stroke-opacity='.14' stroke-width='.8' fill='none'/%3E%3C/svg%3E") center bottom / contain no-repeat;
}

/* ═══ the beacon LAMP — a small halo pinned to the mast tip. steps(1)
   blink: 2 paints per 2.6s ≈ 0.8 paints/s (small, screen-fixed, NOT a
   continuous mover). The dim housing is baked into the tower SVG, so the
   dark phase still shows a fixture, not a hole. */
head::after {
  content: "";
  display: var(--signoff-scenery, block);
  position: fixed;
  /* aligned to the rebuilt mast tip: element right:2.6vw + width 212px; the tip
     sits at x~118/210 of the SVG => ~119px from the element's LEFT => ~93px from
     its right edge; the 56px halo box centers there at
     right:2.6vw + 93px - 28px = 2.6vw + 65px. Tip y ~6/520 of the 512px element
     whose bottom is at 0 => ~506px up; center the box there => bottom 478px. */
  right: calc(2.6vw + 65px);
  bottom: 478px;
  width: 56px;
  height: 56px;
  z-index: -1;
  pointer-events: none;
  background:
    /* hot filament core — a small overexposed white point */
    radial-gradient(circle 2px at 50% 50%, #fff4ee 0%, #ff9a78 55%, rgba(255, 154, 120, 0) 100%),
    /* lamp glass — the red fresnel lens catching the filament */
    radial-gradient(circle 6px at 50% 46%, rgba(255, 132, 100, 0.9) 0%, rgba(255, 96, 70, 0.42) 58%, rgba(255, 96, 70, 0) 100%),
    /* inner warm bloom */
    radial-gradient(circle 15px at 50% 48%, rgba(255, 96, 66, 0.4) 0%, rgba(255, 84, 58, 0.12) 55%, rgba(255, 84, 58, 0) 100%),
    /* soft wide halo bleeding into the night sky */
    radial-gradient(circle 27px at 50% 48%, rgba(255, 78, 54, 0.26) 0%, rgba(255, 78, 54, 0) 100%);
  animation: signoff-beacon 2.6s steps(1, end) infinite;
}

/* ═══ master control clock — one minute to sign-off, top-right corner
   inside the safe area. Crisp OSD furniture: it belongs to the station,
   not the picture, so it sits above the crawl. STATIC. */
head meta { display: var(--signoff-scenery, block); }
head meta:first-of-type::before {
  content: "23:59:07\\ASIGN-OFF";
  display: var(--signoff-scenery, block);
  position: fixed;
  top: calc(3.2vh + 14px);
  right: calc(3.4vw + 16px);
  z-index: 2;
  pointer-events: none;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.92rem;
  line-height: 1.5;
  letter-spacing: 0.22em;
  text-align: right;
  white-space: pre;
  color: rgba(255, 184, 77, 0.78);
  text-shadow: 0 0 10px rgba(255, 184, 77, 0.25), 0 2px 6px rgba(1, 3, 7, 0.8);
}

/* ═══ title-safe frame — the engineer's overlay: corner brackets only,
   coarse 2px strokes parked at the screen corners (never in the lane). */
head meta:first-of-type::after {
  content: "";
  display: var(--signoff-scenery, block);
  position: fixed;
  inset: 3.2vh 3.4vw;
  z-index: 0;
  pointer-events: none;
  --signoff-corner: rgba(174, 191, 210, 0.30);
  background:
    linear-gradient(var(--signoff-corner) 0 0) 0 0 / 38px 2px no-repeat,
    linear-gradient(var(--signoff-corner) 0 0) 0 0 / 2px 38px no-repeat,
    linear-gradient(var(--signoff-corner) 0 0) 100% 0 / 38px 2px no-repeat,
    linear-gradient(var(--signoff-corner) 0 0) 100% 0 / 2px 38px no-repeat,
    linear-gradient(var(--signoff-corner) 0 0) 0 100% / 38px 2px no-repeat,
    linear-gradient(var(--signoff-corner) 0 0) 0 100% / 2px 38px no-repeat,
    linear-gradient(var(--signoff-corner) 0 0) 100% 100% / 38px 2px no-repeat,
    linear-gradient(var(--signoff-corner) 0 0) 100% 100% / 2px 38px no-repeat;
}

/* ═══ station bug — translucent "KSGN-TV 9" watermark, bottom-left inside
   the safe area, exactly where the bug burns into every set in town. */
head meta:last-of-type::before {
  content: "KSGN-TV 9";
  display: var(--signoff-scenery, block);
  position: fixed;
  left: calc(3.4vw + 16px);
  bottom: calc(3.2vh + 12px);
  z-index: 2;
  pointer-events: none;
  font-family: var(--credits-title-font);
  font-weight: 600;
  font-size: 1.05rem;
  letter-spacing: 0.3em;
  color: rgba(230, 240, 248, 0.42);
  text-shadow: 0 0 12px rgba(174, 191, 210, 0.2), 0 2px 6px rgba(1, 3, 7, 0.8);
}

/* ═══ THE NIGHT SKY — the void above the ridge was a dead flat gradient; now
   it's the real midnight sky the tower stands under. A STATIC baked starfield
   (never animates → zero relative slide → zero flicker even over the lane, L6:
   static specular/points on a fixed layer are safe). Density is biased to the
   TOP and the SIDES and deliberately thinned + dimmed inside the center text
   lane (x 30–70%), so no fine bright point ever sits bright over a crawling
   glyph. Five brighter "hero" stars carry baked cross-diffraction spikes (a
   static specular sparkle) up in the corners, off the lane. Rides on the free
   void-element pseudo meta:last-of-type::after. STATIC, promoted. */
head meta:last-of-type::after {
  content: "";
  display: var(--signoff-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  opacity: 0.9;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900' preserveAspectRatio='xMidYMin slice'%3E%3Cdefs%3E%3Cfilter id='hb' x='-200%25' y='-200%25' width='500%25' height='500%25'%3E%3CfeGaussianBlur stdDeviation='1.6'/%3E%3C/filter%3E%3C/defs%3E%3Ccircle cx='59' cy='337' r='1.44' fill='%23eef4fb' opacity='0.34'/%3E%3Ccircle cx='1332' cy='320' r='0.43' fill='%23cfe0ff' opacity='0.25'/%3E%3Ccircle cx='844' cy='33' r='0.42' fill='%23eef4fb' opacity='0.16'/%3E%3Ccircle cx='1201' cy='583' r='0.60' fill='%23eef4fb' opacity='0.65'/%3E%3Ccircle cx='457' cy='362' r='1.24' fill='%23eef4fb' opacity='0.25'/%3E%3Ccircle cx='161' cy='148' r='0.64' fill='%23eef4fb' opacity='0.24'/%3E%3Ccircle cx='394' cy='375' r='0.70' fill='%23eef4fb' opacity='0.32'/%3E%3Ccircle cx='191' cy='370' r='0.46' fill='%23ffe6c0' opacity='0.39'/%3E%3Ccircle cx='608' cy='104' r='0.45' fill='%23ffe6c0' opacity='0.16'/%3E%3Ccircle cx='624' cy='407' r='0.41' fill='%23ffe6c0' opacity='0.16'/%3E%3Ccircle cx='1222' cy='378' r='1.65' fill='%23eef4fb' opacity='0.42'/%3E%3Ccircle cx='15' cy='643' r='0.64' fill='%23eef4fb' opacity='0.21'/%3E%3Ccircle cx='273' cy='203' r='0.42' fill='%23eef4fb' opacity='0.43'/%3E%3Ccircle cx='1483' cy='141' r='0.66' fill='%23eef4fb' opacity='0.50'/%3E%3Ccircle cx='1590' cy='400' r='0.59' fill='%23cfe0ff' opacity='0.56'/%3E%3Ccircle cx='1314' cy='632' r='0.56' fill='%23ffe6c0' opacity='0.12'/%3E%3Ccircle cx='753' cy='62' r='0.70' fill='%23eef4fb' opacity='0.16'/%3E%3Ccircle cx='199' cy='79' r='0.48' fill='%23ffe6c0' opacity='0.13'/%3E%3Ccircle cx='344' cy='437' r='0.46' fill='%23ffe6c0' opacity='0.36'/%3E%3Ccircle cx='1413' cy='10' r='0.93' fill='%23ffe6c0' opacity='0.40'/%3E%3Ccircle cx='341' cy='246' r='0.51' fill='%23eef4fb' opacity='0.18'/%3E%3Ccircle cx='373' cy='17' r='0.40' fill='%23eef4fb' opacity='0.32'/%3E%3Ccircle cx='1304' cy='478' r='0.98' fill='%23eef4fb' opacity='0.29'/%3E%3Ccircle cx='1403' cy='34' r='0.96' fill='%23ffe6c0' opacity='0.42'/%3E%3Ccircle cx='1467' cy='85' r='0.97' fill='%23eef4fb' opacity='0.60'/%3E%3Ccircle cx='1371' cy='552' r='0.90' fill='%23eef4fb' opacity='0.44'/%3E%3Ccircle cx='1135' cy='33' r='0.46' fill='%23cfe0ff' opacity='0.45'/%3E%3Ccircle cx='1384' cy='578' r='0.58' fill='%23eef4fb' opacity='0.63'/%3E%3Ccircle cx='430' cy='25' r='0.55' fill='%23eef4fb' opacity='0.67'/%3E%3Ccircle cx='134' cy='252' r='0.58' fill='%23eef4fb' opacity='0.61'/%3E%3Ccircle cx='65' cy='519' r='0.46' fill='%23ffe6c0' opacity='0.35'/%3E%3Ccircle cx='268' cy='29' r='0.98' fill='%23ffe6c0' opacity='0.33'/%3E%3Ccircle cx='1549' cy='342' r='0.85' fill='%23eef4fb' opacity='0.54'/%3E%3Ccircle cx='614' cy='134' r='0.70' fill='%23eef4fb' opacity='0.15'/%3E%3Ccircle cx='1404' cy='515' r='0.50' fill='%23eef4fb' opacity='0.28'/%3E%3Ccircle cx='193' cy='107' r='0.38' fill='%23eef4fb' opacity='0.40'/%3E%3Ccircle cx='465' cy='92' r='0.42' fill='%23ffe6c0' opacity='0.27'/%3E%3Ccircle cx='475' cy='188' r='1.53' fill='%23cfe0ff' opacity='0.59'/%3E%3Ccircle cx='72' cy='491' r='0.42' fill='%23eef4fb' opacity='0.18'/%3E%3Ccircle cx='24' cy='6' r='1.31' fill='%23cfe0ff' opacity='0.21'/%3E%3Ccircle cx='111' cy='183' r='0.38' fill='%23eef4fb' opacity='0.46'/%3E%3Ccircle cx='474' cy='578' r='0.75' fill='%23eef4fb' opacity='0.61'/%3E%3Ccircle cx='1410' cy='14' r='0.54' fill='%23ffe6c0' opacity='0.65'/%3E%3Ccircle cx='451' cy='175' r='0.44' fill='%23eef4fb' opacity='0.50'/%3E%3Ccircle cx='334' cy='301' r='0.71' fill='%23eef4fb' opacity='0.66'/%3E%3Ccircle cx='858' cy='344' r='0.65' fill='%23eef4fb' opacity='0.16'/%3E%3Ccircle cx='277' cy='137' r='0.35' fill='%23cfe0ff' opacity='0.48'/%3E%3Ccircle cx='146' cy='68' r='0.74' fill='%23ffe6c0' opacity='0.63'/%3E%3Ccircle cx='1522' cy='132' r='0.58' fill='%23cfe0ff' opacity='0.17'/%3E%3Ccircle cx='1350' cy='457' r='0.92' fill='%23eef4fb' opacity='0.34'/%3E%3Ccircle cx='1185' cy='515' r='0.42' fill='%23ffe6c0' opacity='0.61'/%3E%3Ccircle cx='440' cy='75' r='1.16' fill='%23eef4fb' opacity='0.33'/%3E%3Ccircle cx='471' cy='573' r='1.11' fill='%23ffe6c0' opacity='0.55'/%3E%3Ccircle cx='426' cy='12' r='0.88' fill='%23cfe0ff' opacity='0.55'/%3E%3Ccircle cx='348' cy='513' r='0.82' fill='%23ffe6c0' opacity='0.48'/%3E%3Ccircle cx='836' cy='394' r='0.65' fill='%23eef4fb' opacity='0.16'/%3E%3Ccircle cx='1127' cy='512' r='0.49' fill='%23cfe0ff' opacity='0.34'/%3E%3Ccircle cx='1209' cy='200' r='0.38' fill='%23eef4fb' opacity='0.50'/%3E%3Ccircle cx='392' cy='20' r='0.38' fill='%23eef4fb' opacity='0.23'/%3E%3Ccircle cx='1434' cy='4' r='0.47' fill='%23eef4fb' opacity='0.48'/%3E%3Ccircle cx='285' cy='31' r='0.82' fill='%23eef4fb' opacity='0.34'/%3E%3Ccircle cx='1404' cy='218' r='0.75' fill='%23eef4fb' opacity='0.35'/%3E%3Ccircle cx='1353' cy='206' r='1.20' fill='%23eef4fb' opacity='0.25'/%3E%3Ccircle cx='448' cy='29' r='0.82' fill='%23eef4fb' opacity='0.33'/%3E%3Ccircle cx='1018' cy='553' r='0.70' fill='%23eef4fb' opacity='0.16'/%3E%3Ccircle cx='1437' cy='285' r='0.83' fill='%23eef4fb' opacity='0.14'/%3E%3Ccircle cx='1425' cy='128' r='0.56' fill='%23eef4fb' opacity='0.17'/%3E%3Ccircle cx='1088' cy='72' r='0.41' fill='%23eef4fb' opacity='0.14'/%3E%3Ccircle cx='1441' cy='149' r='0.70' fill='%23eef4fb' opacity='0.14'/%3E%3Ccircle cx='511' cy='33' r='0.42' fill='%23eef4fb' opacity='0.16'/%3E%3Ccircle cx='712' cy='26' r='0.52' fill='%23eef4fb' opacity='0.16'/%3E%3Ccircle cx='1025' cy='406' r='0.64' fill='%23eef4fb' opacity='0.16'/%3E%3Ccircle cx='365' cy='642' r='0.79' fill='%23eef4fb' opacity='0.49'/%3E%3Ccircle cx='982' cy='81' r='0.40' fill='%23ffe6c0' opacity='0.16'/%3E%3Ccircle cx='1490' cy='250' r='1.07' fill='%23eef4fb' opacity='0.29'/%3E%3Ccircle cx='420' cy='244' r='0.39' fill='%23eef4fb' opacity='0.28'/%3E%3Ccircle cx='1152' cy='620' r='0.54' fill='%23eef4fb' opacity='0.54'/%3E%3Ccircle cx='1320' cy='164' r='0.36' fill='%23eef4fb' opacity='0.17'/%3E%3Ccircle cx='209' cy='56' r='0.56' fill='%23eef4fb' opacity='0.24'/%3E%3Ccircle cx='145' cy='104' r='1.37' fill='%23cfe0ff' opacity='0.55'/%3E%3Ccircle cx='465' cy='251' r='0.90' fill='%23eef4fb' opacity='0.40'/%3E%3Ccircle cx='111' cy='574' r='0.71' fill='%23eef4fb' opacity='0.15'/%3E%3Ccircle cx='427' cy='427' r='0.82' fill='%23eef4fb' opacity='0.23'/%3E%3Ccircle cx='1350' cy='382' r='0.49' fill='%23ffe6c0' opacity='0.49'/%3E%3Ccircle cx='23' cy='8' r='0.35' fill='%23eef4fb' opacity='0.40'/%3E%3Ccircle cx='283' cy='14' r='0.88' fill='%23eef4fb' opacity='0.27'/%3E%3Ccircle cx='129' cy='526' r='0.42' fill='%23eef4fb' opacity='0.18'/%3E%3Ccircle cx='677' cy='12' r='0.70' fill='%23eef4fb' opacity='0.16'/%3E%3Ccircle cx='1549' cy='196' r='0.95' fill='%23eef4fb' opacity='0.52'/%3E%3Ccircle cx='1225' cy='443' r='0.42' fill='%23eef4fb' opacity='0.22'/%3E%3Ccircle cx='363' cy='26' r='0.65' fill='%23eef4fb' opacity='0.49'/%3E%3Ccircle cx='68' cy='14' r='0.52' fill='%23ffe6c0' opacity='0.61'/%3E%3Ccircle cx='1329' cy='25' r='0.90' fill='%23eef4fb' opacity='0.22'/%3E%3Ccircle cx='1281' cy='517' r='0.91' fill='%23eef4fb' opacity='0.39'/%3E%3Ccircle cx='1386' cy='90' r='1.18' fill='%23eef4fb' opacity='0.38'/%3E%3Ccircle cx='32' cy='11' r='0.60' fill='%23ffe6c0' opacity='0.22'/%3E%3Ccircle cx='45' cy='120' r='0.78' fill='%23cfe0ff' opacity='0.43'/%3E%3Ccircle cx='871' cy='311' r='0.67' fill='%23eef4fb' opacity='0.16'/%3E%3Ccircle cx='1415' cy='272' r='0.42' fill='%23eef4fb' opacity='0.30'/%3E%3Ccircle cx='35' cy='202' r='0.36' fill='%23cfe0ff' opacity='0.34'/%3E%3Ccircle cx='182' cy='47' r='1.72' fill='%23ffe6c0' opacity='0.46'/%3E%3Ccircle cx='147' cy='19' r='1.25' fill='%23ffe6c0' opacity='0.25'/%3E%3Ccircle cx='1173' cy='645' r='0.63' fill='%23cfe0ff' opacity='0.44'/%3E%3Ccircle cx='94' cy='341' r='0.40' fill='%23eef4fb' opacity='0.35'/%3E%3Ccircle cx='670' cy='0' r='0.70' fill='%23cfe0ff' opacity='0.16'/%3E%3Ccircle cx='957' cy='266' r='0.68' fill='%23eef4fb' opacity='0.16'/%3E%3Ccircle cx='256' cy='283' r='0.41' fill='%23eef4fb' opacity='0.30'/%3E%3Ccircle cx='1539' cy='7' r='0.55' fill='%23eef4fb' opacity='0.37'/%3E%3Ccircle cx='482' cy='131' r='0.48' fill='%23eef4fb' opacity='0.16'/%3E%3Ccircle cx='1446' cy='2' r='0.62' fill='%23eef4fb' opacity='0.47'/%3E%3Ccircle cx='1302' cy='7' r='0.47' fill='%23eef4fb' opacity='0.28'/%3E%3Ccircle cx='150' cy='120' r='10.3' fill='%23bcd6ff' opacity='0.10' filter='url(%23hb)'/%3E%3Cpath d='M138.5 120 L161.5 120 M150 108.5 L150 131.5' stroke='%23eaf3ff' stroke-width='0.7' opacity='0.5' filter='url(%23hb)'/%3E%3Cpath d='M143.7 113.7 L156.3 126.3 M143.7 126.3 L156.3 113.7' stroke='%23eaf3ff' stroke-width='0.5' opacity='0.3'/%3E%3Ccircle cx='150' cy='120' r='1.7' fill='%23ffffff' opacity='0.9'/%3E%3Ccircle cx='1440' cy='90' r='9.0' fill='%23ffcaa0' opacity='0.10' filter='url(%23hb)'/%3E%3Cpath d='M1430 90 L1450 90 M1440 80 L1440 100' stroke='%23fff0d8' stroke-width='0.7' opacity='0.5' filter='url(%23hb)'/%3E%3Cpath d='M1434.5 84.5 L1445.5 95.5 M1434.5 95.5 L1445.5 84.5' stroke='%23fff0d8' stroke-width='0.5' opacity='0.3'/%3E%3Ccircle cx='1440' cy='90' r='1.5' fill='%23ffffff' opacity='0.9'/%3E%3Ccircle cx='1290' cy='300' r='7.6' fill='%23bcd6ff' opacity='0.10' filter='url(%23hb)'/%3E%3Cpath d='M1281.5 300 L1298.5 300 M1290 291.5 L1290 308.5' stroke='%23eaf3ff' stroke-width='0.7' opacity='0.5' filter='url(%23hb)'/%3E%3Cpath d='M1285.3 295.3 L1294.7 304.7 M1285.3 304.7 L1294.7 295.3' stroke='%23eaf3ff' stroke-width='0.5' opacity='0.3'/%3E%3Ccircle cx='1290' cy='300' r='1.3' fill='%23ffffff' opacity='0.9'/%3E%3Ccircle cx='70' cy='360' r='7.2' fill='%23bcd6ff' opacity='0.10' filter='url(%23hb)'/%3E%3Cpath d='M62 360 L78 360 M70 352 L70 368' stroke='%23eaf3ff' stroke-width='0.7' opacity='0.5' filter='url(%23hb)'/%3E%3Cpath d='M65.6 355.6 L74.4 364.4 M65.6 364.4 L74.4 355.6' stroke='%23eaf3ff' stroke-width='0.5' opacity='0.3'/%3E%3Ccircle cx='70' cy='360' r='1.2' fill='%23ffffff' opacity='0.9'/%3E%3Ccircle cx='1520' cy='470' r='6.8' fill='%23ffcaa0' opacity='0.10' filter='url(%23hb)'/%3E%3Cpath d='M1512.5 470 L1527.5 470 M1520 462.5 L1520 477.5' stroke='%23fff0d8' stroke-width='0.7' opacity='0.5' filter='url(%23hb)'/%3E%3Cpath d='M1515.9 465.9 L1524.1 474.1 M1515.9 474.1 L1524.1 465.9' stroke='%23fff0d8' stroke-width='0.5' opacity='0.3'/%3E%3Ccircle cx='1520' cy='470' r='1.1' fill='%23ffffff' opacity='0.9'/%3E%3C/svg%3E") top center / cover no-repeat;
}

/* ═══ ATMOSPHERE — the dead mid-band of sky between the star field and the
   ridge got a committed weather story. The single stylesheet <link> is the
   last free void element; promote it and hang two COARSE soft washes on its
   pseudos (nothing fine, nothing over the lane — pure large gradients, L6/L3):
     link::before — a broad milky airglow band lifting the horizon on the tower
                    side + a faint high cirrus veil catching the last skylight.
   STATIC, promoted. */
head link { display: var(--signoff-scenery, block); }
head link::before {
  content: "";
  display: var(--signoff-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* high cirrus veil, upper third, very soft and cool */
    radial-gradient(ellipse 120vw 20vh at 42% 8%, rgba(120, 148, 190, 0.06) 0%, rgba(100, 128, 170, 0.02) 46%, rgba(90, 116, 156, 0) 74%),
    /* broad airglow arc lifting the horizon toward the tower — warm sodium
       shimmer bleeding up off the distant town, coarse and dim */
    radial-gradient(ellipse 70vw 26vh at 72% 66%, rgba(206, 150, 104, 0.10) 0%, rgba(168, 120, 92, 0.035) 44%, rgba(140, 104, 84, 0) 72%),
    /* a cool counter-glow low on the left so the horizon isn't one-sided */
    radial-gradient(ellipse 52vw 20vh at 22% 70%, rgba(120, 146, 184, 0.06) 0%, rgba(104, 128, 166, 0) 70%);
}

/* ═══ GLASS SHEEN — the SHINE. A soft band of reflected control-room light
   lying ON the curved tube face, sliding slowly across the glass the way a
   convex CRT catches the room. This is the moving sparkle, made L6-legal three
   ways at once: it is COARSE and soft (a ~26vw feathered highlight, no fine
   edge), it lives ONLY in the TOP 34vh of the screen (nowhere near the center
   caption lane), and it moves in DISCRETE steps() hops — one glide every ~6s,
   ~9 hops, well under the ceiling. A twin diagonal specular streak layered on
   top gives it the pinched highlight of curved glass. Not a continuous mover,
   so it spends no will-change (matching the hum bar + beacon). Rides the last
   free void pseudo, link::after. Promoted. */
head link::after {
  content: "";
  display: var(--signoff-scenery, block);
  position: fixed;
  top: 0;
  left: -30vw;
  width: 40vw;
  height: 34vh;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* the broad convex glass reflection — coarse, feathered both axes */
    radial-gradient(ellipse 62% 76% at 50% 40%, rgba(200, 222, 248, 0.075) 0%, rgba(190, 214, 242, 0.03) 48%, rgba(180, 206, 236, 0) 76%),
    /* the pinched specular streak riding its center — widely feathered so it
       reads as an ambient reflection on curved glass, not a hard beam edge */
    linear-gradient(108deg, rgba(214, 232, 252, 0) 34%, rgba(224, 238, 254, 0.04) 46%, rgba(236, 246, 255, 0.075) 50%, rgba(224, 238, 254, 0.04) 54%, rgba(214, 232, 252, 0) 66%);
  animation: signoff-sheen 42s steps(9, end) infinite;
}

/* ═══ CRT texture — broadcast snow + phosphor scanlines. Both are FINE
   patterns, so they RIDE THE ROLL (they translate WITH the tracked glyphs =
   zero relative slide = zero flicker, L6-legal). The scanlines are the
   raster of the picture tube: a 3px horizontal line pair the crawl carries
   perfectly in register with the caption bands. Snow stays faint — the
   carrier is still up; the real static is saved for the outro. STATIC. */
.credits-roll::before,
.credits-slideshow::before {
  content: "";
  display: var(--signoff-scenery, block);
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  opacity: 0.14;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E"),
    repeating-linear-gradient(180deg, rgba(0, 0, 0, 0.22) 0px, rgba(0, 0, 0, 0.22) 1.5px, rgba(120, 150, 180, 0.02) 1.5px, rgba(120, 150, 180, 0.02) 3px);
  background-size: 240px 240px, 100% 3px;
}

/* ═══ PROGRAM LOG: every block is a log entry ═══ */
.credits-block,
.credits-slide:not(.flourish) { counter-increment: signoff-log; }

/* SMPTE accent cycle down the log — yellow, cyan, green, magenta (the
   intro is section 1, so the first block lands on 4n+2 = yellow).
   Content-agnostic: custom credit types just pick up the next hue. */
.credits-block:nth-of-type(4n + 2),
.credits-slide:nth-of-type(4n + 2) { --signoff-hue: var(--signoff-yellow); --signoff-hue-soft: rgba(227, 201, 63, 0.28); }
.credits-block:nth-of-type(4n + 3),
.credits-slide:nth-of-type(4n + 3) { --signoff-hue: var(--signoff-cyan); --signoff-hue-soft: rgba(79, 212, 212, 0.28); }
.credits-block:nth-of-type(4n),
.credits-slide:nth-of-type(4n) { --signoff-hue: var(--signoff-green); --signoff-hue-soft: rgba(88, 207, 107, 0.28); }
.credits-block:nth-of-type(4n + 1),
.credits-slide:nth-of-type(4n + 1) { --signoff-hue: var(--signoff-magenta); --signoff-hue-soft: rgba(214, 112, 214, 0.28); }

/* ═══ titles: broadcast slates — a black band carrying a small typed log
   line over condensed gothic caps, with a miniature SMPTE bar strip as
   the underline. Bands self-scrim, so no text-shadow theatrics. */
.credits-block__title {
  width: fit-content;
  max-width: 88vw;
  margin: 0 auto 1.5rem;
  padding: 0.5em 1.1em 0.42em;
  font-weight: 600;
  letter-spacing: 0.16em;
  padding-left: calc(1.1em + 0.16em);
  color: var(--signoff-hue, var(--signoff-gray));
  /* the slate reads as a lit caption on glass: the ink band carries a faint
     phosphor lift down from its top edge so it isn't a dead black rectangle */
  background:
    linear-gradient(180deg, rgba(150, 176, 210, 0.09) 0%, rgba(150, 176, 210, 0) 24%),
    var(--signoff-ink);
  box-shadow: inset 0 1px 0 0 rgba(190, 210, 236, 0.14), inset 0 0 0 1px rgba(174, 191, 210, 0.16);
  /* the hue glows a little, like coloured phosphor typed on the tube */
  text-shadow: 0 0 14px var(--signoff-hue-soft, rgba(174, 191, 210, 0.2));
}
.credits-block__title::before {
  content: "PROGRAM LOG \\00B7 ENTRY " counter(signoff-log, decimal-leading-zero);
  display: block;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.62rem;
  letter-spacing: 0.4em;
  margin-bottom: 0.5em;
  color: rgba(174, 191, 210, 0.62);
  text-shadow: none;
}
/* base gold rule becomes the mini bar strip riding under each slate */
.credits-block__title::after {
  width: 140px;
  height: 7px;
  margin: 0.7em auto 0;
  opacity: 0.9;
  /* mini SMPTE strip — matched to the brighter top-edge bars, with a top sheen
     so it reads as the same glowing phosphor motif at slate scale */
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0) 55%),
    linear-gradient(90deg, #b6bcc0 0 14.28%, #c2ba36 0 28.57%, #34c2be 0 42.85%, #34b846 0 57.14%, #bd42b7 0 71.42%, #c53c36 0 85.71%, #3844c2 0 100%);
}

/* ═══ rows: EIA-608 captions — each name typed white on its own black
   band, stacking like closed captions over the picture. Names sacred:
   wrap, never clip. Amounts read as meter figures in amber. */
.credit {
  width: fit-content;
  max-width: min(44rem, 92vw);
  margin-inline: auto;
  min-width: 0;
  overflow-wrap: anywhere;
  line-height: 1.42;
  padding: 0.1em 0.72em 0.14em;
  /* caption band with a whisper of top-edge phosphor lift — the same lit-glass
     read as the slates, so the whole log looks typed on one tube */
  background:
    linear-gradient(180deg, rgba(150, 176, 210, 0.06) 0%, rgba(150, 176, 210, 0) 40%),
    var(--signoff-ink);
  box-shadow: inset 0 1px 0 0 rgba(190, 210, 236, 0.08);
  letter-spacing: 0.04em;
}
/* the caption white glows faintly, as broadcast text does on a dark tube */
.credit__name { color: var(--signoff-white); text-shadow: 0 0 10px rgba(198, 216, 238, 0.16); }
.credit__amount {
  opacity: 1;
  font-size: 0.82em;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--signoff-amber);
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
/* the tube-face wash the card sits IN: a soft convex phosphor glow so the
   test pattern reads as light inside curved glass, not a decal on flat black */
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
    /* convex specular SHEEN — a soft band of reflected room light lying on the
       glass, upper-left, the tell that this is a bowed surface (over the SVG) */
    radial-gradient(ellipse 46% 30% at 38% 30%, rgba(198, 220, 246, 0.12) 0%, rgba(198, 220, 246, 0) 62%),
    /* warm phosphor bloom lifting the beam-rest center a touch above the glass */
    radial-gradient(circle at 50% 47%, rgba(120, 150, 190, 0.12) 0%, rgba(90, 118, 160, 0.05) 34%, rgba(70, 96, 140, 0) 58%),
    /* THE TUBE FACE — barrel-warped SMPTE test card glowing inside curved glass.
       Grid lines are drawn as gentle ARCS that bow away from center (barrel
       distortion), the color bars carry a blurred phosphor bloom under a crisp
       swatch so they read as emitted light, the bezel is a real convex glass
       ring (bright top-left highlight, dark bottom-right), and a deep vignette
       curves the corners of the picture away. ONE UNBROKEN data-URI. */
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
  /* the slate band carries a baked GLASS SHEEN — a soft diagonal specular streak
     of reflected room light lying across the caption, plus a top phosphor lift.
     Static highlight on a prop = always L6-safe; it gives the hero title the
     wet-glass gleam of a lit tube instead of a dead black rectangle. */
  background:
    linear-gradient(107deg, rgba(224, 238, 254, 0) 30%, rgba(228, 242, 255, 0.09) 43%, rgba(238, 248, 255, 0.15) 48%, rgba(228, 242, 255, 0.08) 53%, rgba(224, 238, 254, 0) 66%),
    linear-gradient(180deg, rgba(170, 196, 230, 0.12) 0%, rgba(170, 196, 230, 0) 30%),
    var(--signoff-ink);
  box-shadow: inset 0 0 0 1px rgba(232, 238, 245, 0.3), inset 0 0 0 5px rgba(2, 4, 8, 0.01), inset 0 0 0 6px rgba(232, 238, 245, 0.14);
  /* phosphor bloom — the caption glowing on the tube */
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
   2 paints per 2.8s ≈ 0.7 paints/s — in-roll L5 ceiling is 2/s. */
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
  animation: signoff-standby 2.8s steps(1, end) infinite;
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
  /* same baked glass sheen as the sign-off slate — a diagonal specular streak of
     the room reflected on the dying tube, over a top phosphor lift. Static = safe. */
  background:
    linear-gradient(107deg, rgba(224, 238, 254, 0) 32%, rgba(228, 242, 255, 0.08) 44%, rgba(238, 248, 255, 0.14) 49%, rgba(228, 242, 255, 0.07) 54%, rgba(224, 238, 254, 0) 66%),
    linear-gradient(180deg, rgba(170, 196, 230, 0.1) 0%, rgba(170, 196, 230, 0) 32%),
    var(--signoff-ink);
  box-shadow: inset 0 0 0 1px rgba(232, 238, 245, 0.3);
  /* strong phosphor bloom — the last caption burning on the dying tube */
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
   (the classic CRT power-off), a hot bloom-dot rides its center, and a soft
   afterglow hangs where the phosphor is cooling. Built from stacked
   gradients on one small box so it reads as light, not a shape. */
.flourish--outro::after {
  content: "";
  display: var(--signoff-scenery, block);
  width: min(420px, 64vw);
  height: 40px;
  margin-top: 1.6rem;
  background:
    /* hot core dot */
    radial-gradient(circle 3px at 50% 50%, #ffffff 0%, #eaf3fb 55%, rgba(234, 243, 251, 0) 100%) no-repeat,
    /* the collapsed raster line — a thin bright streak tapering to the edges */
    linear-gradient(90deg, rgba(219, 231, 242, 0) 0%, rgba(219, 231, 242, 0.6) 30%, #eef5fc 50%, rgba(219, 231, 242, 0.6) 70%, rgba(219, 231, 242, 0) 100%) no-repeat,
    /* soft afterglow bloom hanging around the collapse */
    radial-gradient(ellipse 60% 100% at 50% 50%, rgba(200, 220, 240, 0.28) 0%, rgba(200, 220, 240, 0) 70%) no-repeat;
  background-size: 100% 100%, 100% 2px, 100% 100%;
  background-position: center, center, center;
  filter: drop-shadow(0 0 12px rgba(219, 231, 242, 0.5));
}

/* ═══ raid finale: SPECIAL BULLETIN — the log is interrupted. The slate
   goes bulletin red, the typed line changes, the mini strip becomes an
   alert barber bar, and a red halo warms the block. The pulse is steps()
   at ~0.8 paints/s — the only other in-roll animation (L5 cap 2/s). */
.credits-block:nth-last-of-type(2),
.credits-slide:nth-last-of-type(2):not(.flourish) {
  --signoff-hue: #ffffff;
}
.credits-block:nth-last-of-type(2) {
  background: radial-gradient(ellipse 55% 58% at 50% 32%, rgba(212, 60, 60, 0.13), rgba(212, 60, 60, 0) 72%);
}
.credits-slide:nth-last-of-type(2):not(.flourish) {
  background: radial-gradient(ellipse 62% 56% at 50% 46%, rgba(212, 60, 60, 0.12), rgba(212, 60, 60, 0) 80%);
}
.credits-block:nth-last-of-type(2) .credits-block__title,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
  /* the alert slate reads as a lit red caption card: a top phosphor sheen, a
     hot band across the middle, and a shaded lower edge give it volume, and a
     soft red bloom warms the block around it */
  background:
    linear-gradient(180deg, rgba(255, 236, 232, 0.22) 0%, rgba(255, 236, 232, 0) 18%),
    radial-gradient(ellipse 90% 70% at 50% 34%, #c22626 0%, #a51d1d 46%, #7c1313 100%);
  box-shadow: inset 0 1px 0 0 rgba(255, 224, 220, 0.4), inset 0 0 0 1px rgba(255, 214, 210, 0.32), inset 0 -8px 14px rgba(90, 8, 8, 0.5), 0 0 30px rgba(212, 60, 60, 0.38);
  text-shadow: 0 0 16px rgba(255, 120, 110, 0.4);
  animation: signoff-bulletin 2.4s steps(1, end) infinite;
}
.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  content: "\\25A0 SPECIAL BULLETIN \\00B7 WE INTERRUPT THIS PROGRAM";
  color: #ffd7d2;
}
.credits-block:nth-last-of-type(2) .credits-block__title::after,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::after {
  background: repeating-linear-gradient(-45deg, #d43c3c 0 10px, #f2f5f7 10px 20px);
  opacity: 0.95;
}
.credits-block:nth-last-of-type(2) .credit,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit {
  font-size: calc(var(--credits-name-size) * 1.1);
  box-shadow: inset 0 0 0 1px rgba(212, 60, 60, 0.4);
}

/* ═══ slideshow: a hard broadcast cut softened by a breath of vertical
   hold — the slide settles 8px like the picture catching sync. */
.credits-slide {
  transform: translateY(8px);
  transition: opacity 0.7s ease, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}
.credits-slide.is-active { transform: none; }

/* ═══ keyframes (all signoff- prefixed; transform/opacity ONLY) ═══ */
/* hum bar: 12 held positions marching down the screen, one hop / 3s */
@keyframes signoff-hum {
  0%    { transform: translate3d(0, 0, 0); }
  8.3%  { transform: translate3d(0, 12vh, 0); }
  16.6% { transform: translate3d(0, 24vh, 0); }
  25%   { transform: translate3d(0, 36vh, 0); }
  33.3% { transform: translate3d(0, 48vh, 0); }
  41.6% { transform: translate3d(0, 60vh, 0); }
  50%   { transform: translate3d(0, 72vh, 0); }
  58.3% { transform: translate3d(0, 84vh, 0); }
  66.6% { transform: translate3d(0, 96vh, 0); }
  75%   { transform: translate3d(0, 108vh, 0); }
  83.3% { transform: translate3d(0, 120vh, 0); }
  91.6% { transform: translate3d(0, 132vh, 0); }
  100%  { transform: translate3d(0, 132vh, 0); }
}
/* glass sheen: the reflection glides across the top of the tube in discrete
   hops. Element starts at left:-30vw and travels 180vw, so it enters from the
   left edge, crosses, and fully clears the right edge (parking off-screen =
   naturally invisible until the loop restarts — a slow, occasional gleam, not
   a strobe). transform-only; steps() quantizes the glide. */
@keyframes signoff-sheen {
  0%   { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(180vw, 0, 0); }
}
/* aviation beacon: long on, short off — procedure, not a strobe */
@keyframes signoff-beacon {
  0%, 62%  { opacity: 1; }
  68%, 94% { opacity: 0.06; }
  100%     { opacity: 1; }
}
/* PLEASE STAND BY: the lamp dips once per cycle */
@keyframes signoff-standby {
  0%, 64%  { opacity: 1; }
  72%, 90% { opacity: 0.4; }
  100%     { opacity: 1; }
}
/* bulletin slate: two discrete dips per 2.4s */
@keyframes signoff-bulletin {
  0%, 55%  { opacity: 1; }
  62%, 88% { opacity: 0.72; }
  100%     { opacity: 1; }
}

/* ═══ reduced motion: the station holds one frame — beacon parked lit,
   STAND BY lamp steady, hum bar parked mid-screen, bulletin slate calm, and
   the glass sheen parked visibly on the tube (not off-screen). */
@media (prefers-reduced-motion: reduce) {
  body::before { animation: none; transform: translate3d(0, 60vh, 0); }
  head::after { animation: none; opacity: 1; }
  head link::after { animation: none; transform: translate3d(46vw, 0, 0); }
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
