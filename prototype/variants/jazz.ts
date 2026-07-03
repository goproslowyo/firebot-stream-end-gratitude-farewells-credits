import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. Blue Note: last set in a smoky basement jazz club — Reid-Miles color blocks over midnight blue, a brass saxophone resting in the spotlight, and the names rolling like a setlist of takes. */
export const VARIANT: ThemeVariant = {
  key: "jazz",
  name: "Blue Note",
  css: `
/* ================================================================
   BLUE NOTE — layered after the base theme.
   Fiction: a basement jazz club, late set. One spotlight leans in
   from upper-right and washes the little stage; a tenor sax rests
   on its stand in the pool of light, lower-left; an upright bass
   sleeps in the shadows on the right. Smoke hangs in the room.
   The credits read like the session sheet: take 01, take 02...
   and the raids are THE ENCORE, when the room lights warm.
   Typography is Reid Miles: hard grotesk caps punched on solid
   color blocks (brass / bordeaux / teal, cycling per section),
   lowercase eyebrows, Fraunces italic for the spoken lines.
   Layer map (all scenery kill-switched via --jazz-scenery):
     html bg (--credits-bg)   midnight room gradient (cheap linear)
     html::before             LIGHT STORY — spotlight cone from the
                              upper-right, floor pool lower-left,
                              stage horizon band, corner vignette.
                              STATIC, promoted
     html::after              THE SAX — SVG data-URI object on its
                              stand, brass volume gradient, gold rim
                              light, bell specular, cast shadow.
                              STATIC, promoted
     head::before             one small smoke puff curling up from
                              beside the sax — the ONLY continuous
                              mover (will-change budget: 1)
     head::after              upright bass silhouette asleep in the
                              right shadows. STATIC, promoted
     meta#1::before           table candles — two out-of-focus bokeh
                              discs at the bottom edge. STATIC
     meta#1::after            the third candle — small box, steps()
                              flicker at ~0.7 paints/s
     meta#2::before           THE PIANO — keyboard edge jutting in
                              from the bottom-right corner, brass rim
                              light, keys receding. STATIC, promoted
     meta#2::after            neon OPEN LATE window sign in the far
                              dark, z:-1 so smoke drifts across it.
                              STATIC, promoted
     body::before             room smoke — 4 huge soft wisps,
                              steps(1) drift, one hop per 4.4s
     body::after              center-lane readability scrim. STATIC
     .credits-roll::before    dust motes in the light — the only
     .credits-slideshow::before  fine pattern, so it RIDES THE ROLL
   ================================================================ */
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@600;800;900&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&family=Fraunces:ital,opsz,wght@1,9..144,400;1,9..144,500&display=swap');

:root {
  /* ── palette: the room ── */
  --jazz-scenery: block; /* set to none to strip every scenery layer */
  --jazz-brass: #d9a441;
  --jazz-brass-bright: #eec167;
  --jazz-cream: #f2e9d8;
  --jazz-ink: #171006;
  --jazz-bordeaux: #7c2136;
  --jazz-teal: #1f5f5b;

  /* ── base hooks ── */
  /* Cheap room: ONE linear gradient — midnight blue lifting where the
     spotlight grazes the wall, falling back to black at the floor (L3:
     the complex light lives on the promoted html::before). */
  --credits-bg: linear-gradient(180deg, #05080f 0%, #0a1020 22%, #0f1930 46%, #101b33 64%, #0b1424 84%, #060a14 100%);
  --credits-color: var(--jazz-cream);
  --credits-accent: var(--jazz-brass);
  --credits-font: "DM Sans", "Avenir Next", "Segoe UI", "Helvetica Neue", sans-serif;
  --credits-title-font: "Archivo", "Helvetica Neue", Arial, sans-serif;
  --credits-title-size: clamp(1.35rem, 3.2vw, 2.05rem);
  --credits-name-size: clamp(1.02rem, 2.6vw, 1.5rem);
  --credits-flourish-title-size: clamp(2.3rem, 7.4vw, 4.7rem);
  --credits-block-gap: 5.25rem;
  --credits-name-gap: 0.7rem;
  --credits-shadow: 0 2px 12px rgba(2, 5, 12, 0.8);
  /* glow no-op — never "none" (a "none" in the composed shadow list
     invalidates the whole declaration); Blue Note glows are bespoke. */
  --credits-glow: 0 0 0 rgba(0, 0, 0, 0);
}

/* Scenery is full-bleed: drop the base edge-fade on html ONLY; body keeps
   the base mask so names still ease in at the floor and out at the ceiling. */
html { -webkit-mask-image: none; mask-image: none; }
body { background: transparent; counter-reset: jazz-take; }

/* ═══ THE LIGHT STORY — one static promoted layer (L3). A warm spotlight
   leans in from the upper-right (coarse conic wedge, soft shoulders, low
   alpha), lands in a floor pool at lower-left where the sax stands, a soft
   brass band marks the stage edge at 76vh, the source itself blooms in the
   top-right corner, and the corners fall away in a cool vignette. Every
   feature is huge and soft — nothing here can flicker against glyphs. */
html::before {
  content: "";
  display: var(--jazz-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* corner vignette — the room swallows its edges */
    radial-gradient(ellipse 140% 120% at 50% 38%, rgba(2, 4, 10, 0) 58%, rgba(2, 4, 10, 0.55) 100%),
    /* the source: a hot little bloom off the top-right corner */
    radial-gradient(ellipse 26vw 16vh at 88% -4%, rgba(255, 228, 170, 0.20), rgba(255, 228, 170, 0) 70%),
    /* the beam CORE — a brighter, tighter shaft inside the cone so the
       spotlight reads as a defined volumetric shaft, not a smear */
    conic-gradient(from 217deg at 87% -6%, rgba(255, 240, 205, 0) 0deg, rgba(252, 232, 186, 0.14) 5deg, rgba(250, 224, 170, 0.28) 11deg, rgba(252, 232, 186, 0.14) 17deg, rgba(255, 240, 205, 0) 22deg),
    /* the beam: soft wedge from upper-right aimed at the sax lower-left */
    conic-gradient(from 214deg at 86% -6%, rgba(242, 233, 216, 0) 0deg, rgba(240, 220, 170, 0.09) 10deg, rgba(238, 205, 140, 0.2) 20deg, rgba(240, 220, 170, 0.09) 30deg, rgba(242, 233, 216, 0) 40deg),
    /* beam haze: a wider, fainter ambient wedge hugging the core beam, and
       two soft mist pockets hanging in its path — deep air, no hard lines */
    conic-gradient(from 208deg at 86% -6%, rgba(240, 222, 176, 0) 0deg, rgba(240, 222, 176, 0.03) 13deg, rgba(240, 222, 176, 0.05) 26deg, rgba(240, 222, 176, 0.03) 39deg, rgba(240, 222, 176, 0) 52deg),
    radial-gradient(ellipse 34vw 20vh at 56% 36%, rgba(240, 222, 180, 0.05), rgba(240, 222, 180, 0) 72%),
    radial-gradient(ellipse 30vw 16vh at 33% 64%, rgba(238, 210, 160, 0.045), rgba(238, 210, 160, 0) 74%),
    /* where the light lands: warm pool on the stage floor, lower-left, so the
       sax clearly stands IN the spotlight — a brighter core, softer falloff */
    radial-gradient(ellipse 20vw 8vh at 14% 90%, rgba(246, 214, 150, 0.16), rgba(246, 214, 150, 0) 70%),
    radial-gradient(ellipse 32vw 11vh at 15% 93%, rgba(233, 196, 138, 0.24), rgba(233, 196, 138, 0.08) 55%, rgba(233, 196, 138, 0) 76%),
    /* back-wall bloom — a warm breath rising behind the stage so the dead
       navy center gains atmospheric depth. Two stacked ellipses: a broad low
       wash and a taller softer breath climbing into the mid-room, so the wall
       behind the names glows instead of falling to flat navy. */
    radial-gradient(ellipse 66vw 40vh at 50% 84%, rgba(128, 100, 76, 0.20), rgba(128, 100, 76, 0.06) 50%, rgba(128, 100, 76, 0) 78%),
    radial-gradient(ellipse 52vw 46vh at 52% 60%, rgba(96, 82, 70, 0.12), rgba(96, 82, 70, 0.03) 54%, rgba(96, 82, 70, 0) 76%),
    /* far back wall behind the whole room — a very faint warm-grey lift so the
       deep center reads as a plastered wall in shadow, not a black hole */
    radial-gradient(ellipse 90vw 60vh at 46% 46%, rgba(58, 54, 58, 0.14), rgba(58, 54, 58, 0.04) 56%, rgba(58, 54, 58, 0) 80%),
    /* the STAGE DRAPE — soft velvet curtain folds hung across the back wall in
       the dead upper-center, catching a whisper of the beam. Broad vertical
       ripples (coarse, low alpha, static) so the void becomes a lit surface
       behind the names instead of flat navy. The scrim keeps the lane clean. */
    radial-gradient(ellipse 40vw 44vh at 50% 30%, rgba(74, 56, 66, 0.2), rgba(74, 56, 66, 0.05) 58%, rgba(74, 56, 66, 0) 82%),
    linear-gradient(90deg, rgba(28, 22, 34, 0) 20%, rgba(58, 44, 54, 0.14) 32%, rgba(24, 20, 30, 0.18) 40%, rgba(60, 46, 56, 0.15) 48%, rgba(24, 20, 30, 0.18) 56%, rgba(58, 44, 54, 0.14) 64%, rgba(28, 22, 34, 0) 78%) 0 4vh / 100% 46vh no-repeat,
    /* distant back-bar — a run of warm bottle-glow smudges deep in the room,
       mid-left, far behind the beam (atmospheric perspective: low contrast,
       hazier, cooler and dimmer than the foreground floor pool) */
    radial-gradient(ellipse 18vw 7vh at 32% 55%, rgba(206, 176, 132, 0.075), rgba(206, 176, 132, 0) 72%),
    radial-gradient(circle 1.6vh at 26% 53%, rgba(240, 206, 150, 0.16), rgba(240, 206, 150, 0) 100%),
    radial-gradient(circle 1.3vh at 37% 56%, rgba(230, 176, 120, 0.13), rgba(230, 176, 120, 0) 100%),
    radial-gradient(circle 1.1vh at 42% 54%, rgba(236, 196, 140, 0.11), rgba(236, 196, 140, 0) 100%),
    /* one dim pendant glow, top-left, so the room does not end at the beam */
    radial-gradient(ellipse 13vw 8vh at 7% 0%, rgba(233, 196, 138, 0.09), rgba(233, 196, 138, 0) 70%),
    /* a second far pendant, deep-center high, hanging over the back tables */
    radial-gradient(ellipse 9vw 6vh at 62% 20%, rgba(214, 176, 120, 0.06), rgba(214, 176, 120, 0) 74%),
    /* upper-room haze so the ceiling void is not pure black — cool, faint */
    radial-gradient(ellipse 70vw 24vh at 48% 8%, rgba(44, 60, 94, 0.24), rgba(44, 60, 94, 0) 72%),
    /* stage horizon: soft brass breath where wall meets floor */
    linear-gradient(180deg, rgba(217, 164, 65, 0) 0%, rgba(217, 164, 65, 0.09) 42%, rgba(224, 182, 110, 0.14) 52%, rgba(217, 164, 65, 0.04) 70%, rgba(217, 164, 65, 0) 100%) 0 74vh / 100% 52px no-repeat,
    /* the floor falls to black under the names */
    linear-gradient(180deg, rgba(3, 6, 13, 0) 0%, rgba(3, 6, 13, 0.38) 100%) 0 76vh / 100% 24vh no-repeat;
}

/* ═══ THE SAX — hero prop, lower-left, standing in its pool of light.
   One SVG data-URI: warm brass volume gradient lit from the upper-right,
   a gold rim light down the leading edge, specular glint on the bell lip,
   pearl keys, a quiet stand, and a cast shadow thrown down-left away from
   the beam. STATIC, promoted — an object at rest, not a diagram. */
html::after {
  content: "";
  display: var(--jazz-scenery, block);
  position: fixed;
  left: 2vw;
  bottom: 1vh;
  width: 292px;
  height: 438px;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: contain;
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 360'><defs><linearGradient id='tube' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='%232e2110'/><stop offset='.14' stop-color='%237e5a1d'/><stop offset='.34' stop-color='%23dca841'/><stop offset='.5' stop-color='%23fff2cf'/><stop offset='.64' stop-color='%23e0aa42'/><stop offset='.84' stop-color='%239a6d1e'/><stop offset='1' stop-color='%232e2110'/></linearGradient><linearGradient id='bell' x1='.1' y1='1' x2='.9' y2='.1'><stop offset='0' stop-color='%233c2b12'/><stop offset='.26' stop-color='%23926819'/><stop offset='.5' stop-color='%23e2ac46'/><stop offset='.72' stop-color='%23fff2cf'/><stop offset='.88' stop-color='%23dfa73f'/><stop offset='1' stop-color='%238a611b'/></linearGradient><radialGradient id='bellin' cx='42%' cy='36%' r='74%'><stop offset='0' stop-color='%23030201'/><stop offset='.45' stop-color='%23140d05'/><stop offset='.78' stop-color='%233e2a10'/><stop offset='1' stop-color='%239a6c1f'/></radialGradient><linearGradient id='bellrim' x1='0' y1='1' x2='1' y2='0'><stop offset='0' stop-color='%236d4a16'/><stop offset='.45' stop-color='%23ffe9a8'/><stop offset='1' stop-color='%23fffaea'/></linearGradient><radialGradient id='pearl' cx='34%' cy='26%' r='78%'><stop offset='0' stop-color='%23fffdf6'/><stop offset='.38' stop-color='%23efe3cc'/><stop offset='.78' stop-color='%23bfa982'/><stop offset='1' stop-color='%23796338'/></radialGradient><radialGradient id='cup' cx='38%' cy='32%' r='72%'><stop offset='0' stop-color='%23ecc463'/><stop offset='.58' stop-color='%23a4761f'/><stop offset='1' stop-color='%23543a11'/></radialGradient><radialGradient id='halo' cx='44%' cy='50%' r='58%'><stop offset='0' stop-color='%23e6b24e' stop-opacity='.24'/><stop offset='.5' stop-color='%23c58c33' stop-opacity='.08'/><stop offset='1' stop-color='%23c58c33' stop-opacity='0'/></radialGradient></defs><ellipse cx='120' cy='196' rx='120' ry='158' fill='url(%23halo)'/><ellipse cx='116' cy='344' rx='80' ry='9' fill='%23020509' opacity='.62'/><g stroke='%230e1626' stroke-width='5' stroke-linecap='round' fill='none'><path d='M118 300 L92 346'/><path d='M118 300 L146 346'/><path d='M118 304 L118 348'/></g><path d='M118 300 L92 346 M118 300 L146 346' stroke='%232c3a54' stroke-width='1.6' opacity='.7' fill='none' stroke-linecap='round'/><path d='M84 290 Q86 316 116 320 Q146 316 150 296' stroke='%23172438' stroke-width='7' fill='none' stroke-linecap='round'/><path d='M84 290 Q86 316 116 320' stroke='%234a5c78' stroke-width='1.6' opacity='.5' fill='none' stroke-linecap='round'/><path d='M154 300 C154 322 138 336 116 336 C92 336 76 320 78 296 C80 276 92 264 108 262' fill='none' stroke='%232a1e0c' stroke-width='30' stroke-linecap='round'/><path d='M154 300 C154 322 138 336 116 336 C92 336 76 320 78 296 C80 276 92 264 108 262' fill='none' stroke='url(%23tube)' stroke-width='25' stroke-linecap='round'/><path d='M78 296 C76 274 88 262 106 260' fill='none' stroke='%23fff4d6' stroke-width='2.6' opacity='.55' stroke-linecap='round'/><rect x='139' y='126' width='30' height='150' rx='10' fill='%232a1e0c'/><rect x='140.5' y='127' width='27' height='148' rx='9' fill='url(%23tube)'/><rect x='147' y='130' width='4' height='142' rx='2' fill='%23fff4d6' opacity='.6'/><rect x='161' y='132' width='3' height='138' rx='1.5' fill='%23fff0c8' opacity='.35'/><path d='M154 126 C154 96 156 74 166 58 C172 48 184 44 194 48' fill='none' stroke='%232a1e0c' stroke-width='20' stroke-linecap='round'/><path d='M154 126 C154 96 156 74 166 58 C172 48 184 44 194 48' fill='none' stroke='url(%23tube)' stroke-width='15' stroke-linecap='round'/><path d='M156 122 C156 98 158 78 167 62' fill='none' stroke='%23fff4d6' stroke-width='2.4' opacity='.6' stroke-linecap='round'/><ellipse cx='158' cy='128' rx='16' ry='6' fill='%23caa03e' stroke='%237a5518' stroke-width='1.5'/><ellipse cx='158' cy='127' rx='16' ry='6' fill='none' stroke='%23fff2cf' stroke-width='1' opacity='.6'/><path d='M194 48 L214 40 L219 49 L199 57 Z' fill='%2318140f'/><path d='M194 48 L214 40' stroke='%235c564d' stroke-width='1.5' opacity='.9' stroke-linecap='round'/><path d='M195 52 L211 45' stroke='%23e7be5a' stroke-width='2.4' stroke-linecap='round' opacity='.9'/><g transform='rotate(-26 92 268)'><path d='M118 268 C110 268 104 258 102 244 C96 208 78 168 62 138 C54 122 66 112 88 111 L140 110 C142 150 136 208 130 250 C128 262 128 268 118 268 Z' fill='url(%23bell)'/><path d='M118 268 C110 268 104 258 102 244 C96 208 78 168 62 138' fill='none' stroke='%23fff4d6' stroke-width='2.8' opacity='.55' stroke-linecap='round'/><ellipse cx='101' cy='122' rx='42' ry='16' fill='url(%23bellin)'/><path d='M59 122 A42 16 0 0 1 143 122' fill='none' stroke='url(%23bellrim)' stroke-width='7'/><path d='M63 115 A40 13 0 0 1 139 115' fill='none' stroke='%23fffaea' stroke-width='1.8' opacity='.85' stroke-linecap='round'/><g opacity='.92'><ellipse cx='131' cy='120' rx='13' ry='2.4' fill='%23fffef8'/><ellipse cx='131' cy='120' rx='2.4' ry='8' fill='%23fffef8'/><circle cx='131' cy='120' r='2.8' fill='%23ffffff'/></g><ellipse cx='101' cy='122' rx='33' ry='11' fill='none' stroke='%235a3d12' stroke-width='1.4' opacity='.55'/><ellipse cx='103' cy='126' rx='19' ry='6' fill='%23090603' opacity='.72'/><path d='M124 148 C132 190 128 236 118 262' stroke='%23fff6da' stroke-width='3' fill='none' opacity='.6' stroke-linecap='round'/><ellipse cx='128' cy='176' rx='4' ry='13' fill='%23fffbec' opacity='.5' transform='rotate(10 128 176)'/><path d='M76 156 Q101 166 126 156 M80 176 Q101 185 122 176 M84 198 Q101 206 118 198' stroke='%235a3d12' stroke-width='1.2' fill='none' opacity='.45'/></g><g fill='none' stroke='%236a4a16' stroke-width='2.2' opacity='.75'><path d='M141 146 L131 146 L131 178 L141 178'/><path d='M141 210 L131 210 L131 244 L141 244'/></g><g stroke='%237a5518' stroke-width='2.6' opacity='.92'><path d='M165 140 L173 139'/><path d='M166 168 L174 167'/><path d='M166 196 L174 195'/><path d='M165 224 L173 223'/><path d='M164 250 L172 249'/></g><g><ellipse cx='176' cy='140' rx='8' ry='6.6' fill='url(%23cup)'/><circle cx='176' cy='139' r='4.8' fill='url(%23pearl)'/><g opacity='.95'><ellipse cx='174.2' cy='137.4' rx='4' ry='1' fill='%23fffef8'/><ellipse cx='174.2' cy='137.4' rx='1' ry='3' fill='%23fffef8'/><circle cx='174.2' cy='137.4' r='1.5' fill='%23ffffff'/></g><ellipse cx='177' cy='168' rx='8.4' ry='6.9' fill='url(%23cup)'/><circle cx='177' cy='167' r='5' fill='url(%23pearl)'/><circle cx='175.1' cy='165.3' r='1.5' fill='%23fffef8'/><ellipse cx='177' cy='196' rx='8.6' ry='7.1' fill='url(%23cup)'/><circle cx='177' cy='195' r='5.2' fill='url(%23pearl)'/><circle cx='175' cy='193.2' r='1.55' fill='%23fffef8'/><ellipse cx='176' cy='224' rx='8.6' ry='7.1' fill='url(%23cup)'/><circle cx='176' cy='223' r='5.2' fill='url(%23pearl)'/><circle cx='174' cy='221.2' r='1.55' fill='%23fffef8'/><ellipse cx='174' cy='250' rx='8.2' ry='6.8' fill='url(%23cup)'/><circle cx='174' cy='249' r='4.9' fill='url(%23pearl)'/><circle cx='172.1' cy='247.3' r='1.45' fill='%23fffef8'/></g></svg>");
}

/* ═══ the upright bass asleep in the right shadows — midground dressing so
   the club has depth beyond the beam. Near-wall navy, one faint brass rim
   on its lit edge. STATIC, promoted, mostly darkness. It stands BEHIND the
   piano (meta#2::before paints over its feet), which grounds them both. */
head { display: var(--jazz-scenery, block); }
head::after {
  content: "";
  display: var(--jazz-scenery, block);
  position: fixed;
  right: 14vw;
  bottom: 9vh;
  width: 196px;
  height: 470px;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0) rotate(3deg);
  transform-origin: 50% 100%;
  opacity: 0.9;
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: contain;
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 400'><defs><radialGradient id='wood' cx='70%' cy='34%' r='84%'><stop offset='0' stop-color='%23a06e2e'/><stop offset='.24' stop-color='%237a5122'/><stop offset='.5' stop-color='%23523619'/><stop offset='.74' stop-color='%23331f10'/><stop offset='1' stop-color='%23140c07'/></radialGradient><linearGradient id='rim' x1='0' y1='.1' x2='1' y2='.9'><stop offset='0' stop-color='%23140c07' stop-opacity='0'/><stop offset='.62' stop-color='%23c98f3c' stop-opacity='0'/><stop offset='.85' stop-color='%23edb861' stop-opacity='.28'/><stop offset='1' stop-color='%23fbdd9a' stop-opacity='.5'/></linearGradient><linearGradient id='sheen' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%23ffe6b0' stop-opacity='0'/><stop offset='.5' stop-color='%23ffe6b0' stop-opacity='.22'/><stop offset='1' stop-color='%23ffe6b0' stop-opacity='0'/></linearGradient><linearGradient id='neck' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='%23180f08'/><stop offset='.5' stop-color='%233a2613'/><stop offset='1' stop-color='%23744f27'/></linearGradient><radialGradient id='scroll' cx='60%' cy='40%' r='70%'><stop offset='0' stop-color='%238a5f2c'/><stop offset='.6' stop-color='%23432c15'/><stop offset='1' stop-color='%23150d07'/></radialGradient></defs><ellipse cx='74' cy='390' rx='50' ry='6' fill='%2302040a' opacity='.55'/><path d='M78 340 L78 384' stroke='%230a0906' stroke-width='3.4'/><path d='M78 384 L78 392' stroke='%234a3218' stroke-width='2.4' stroke-linecap='round'/><path d='M69 158 L69 52 L83 52 L83 158 Z' fill='url(%23neck)'/><path d='M83 52 L83 158' stroke='%239a7042' stroke-width='1.6' opacity='.8'/><path d='M72 56 L72 156' stroke='%23100a06' stroke-width='2.6' opacity='.5'/><path d='M70 52 C62 34 66 20 78 16 C90 12 100 22 97 36 C95 47 87 51 80 48' fill='url(%23scroll)' stroke='%232a1c10' stroke-width='2.5'/><path d='M78 22 C86 20 92 26 90 34 C89 40 84 42 80 40' fill='none' stroke='%23a67a3e' stroke-width='1.6' opacity='.7'/><circle cx='84' cy='34' r='6.5' fill='%23241810'/><circle cx='85' cy='32.5' r='2.6' fill='%23bb8c48'/><circle cx='64' cy='60' r='3' fill='%23130c07'/><path d='M64 60 l-9 -3' stroke='%23241810' stroke-width='3.4' stroke-linecap='round'/><ellipse cx='53' cy='56.5' rx='3.4' ry='2.4' fill='%234a3018'/><circle cx='64' cy='76' r='3' fill='%23130c07'/><path d='M64 76 l-9 -3' stroke='%23241810' stroke-width='3.4' stroke-linecap='round'/><ellipse cx='53' cy='72.5' rx='3.4' ry='2.4' fill='%234a3018'/><circle cx='88' cy='60' r='3' fill='%23130c07'/><path d='M88 60 l9 -3' stroke='%23241810' stroke-width='3.4' stroke-linecap='round'/><ellipse cx='99' cy='56.5' rx='3.4' ry='2.4' fill='%234a3018'/><path d='M76 154 C106 154 124 174 122 200 C121 216 110 228 99 234 C118 247 129 266 128 296 C126 338 101 358 76 359 C51 358 26 338 24 296 C23 266 34 247 53 234 C42 228 31 216 30 200 C28 174 46 154 76 154 Z' fill='url(%23wood)'/><path d='M76 154 C106 154 124 174 122 200 C121 216 110 228 99 234 C118 247 129 266 128 296 C126 338 101 358 76 359 C51 358 26 338 24 296 C23 266 34 247 53 234 C42 228 31 216 30 200 C28 174 46 154 76 154 Z' fill='url(%23rim)'/><path d='M60 172 C48 178 40 190 40 204 C40 190 48 176 62 170 Z' fill='url(%23sheen)' opacity='.7'/><ellipse cx='95' cy='300' rx='24' ry='40' fill='url(%23sheen)' opacity='.5' transform='rotate(-8 95 300)'/><path d='M55 250 C51 262 51 278 57 291 C54 286 54 274 56 267 M56 252 a2.2 2.2 0 1 0 .1 0 M56 289 a2.2 2.2 0 1 0 .1 0' fill='none' stroke='%23070503' stroke-width='2.6'/><path d='M97 250 C101 262 101 278 95 291 C98 286 98 274 96 267 M96 252 a2.2 2.2 0 1 0 -.1 0 M96 289 a2.2 2.2 0 1 0 -.1 0' fill='none' stroke='%23070503' stroke-width='2.6'/><path d='M63 292 L89 292' stroke='%23070503' stroke-width='2.4' opacity='.9'/><path d='M66 289 L66 296 M86 289 L86 296' stroke='%234a3218' stroke-width='2.2'/><path d='M76 296 L74 326 L78 326 Z' fill='%230c0a06'/><path d='M71 326 L81 326 L80 340 L72 340 Z' fill='%230c0a06'/><g stroke='%23e8cf9a' stroke-width='1' opacity='.55'><path d='M72.5 58 L71 290'/><path d='M75.5 58 L75 292'/><path d='M78.5 58 L79 292'/><path d='M81.5 58 L83 290'/></g><path d='M76 154 C106 154 124 174 122 200 C121 216 110 228 99 234 C118 247 129 266 128 296 C126 338 102 358 82 359' stroke='%23f0be6e' stroke-opacity='.6' stroke-width='2.2' fill='none'/><path d='M83 52 L83 154' stroke='%23f0be6e' stroke-opacity='.45' stroke-width='1.4'/><path d='M104 160 C116 170 121 186 120 200' stroke='%23fbd88c' stroke-opacity='.6' stroke-width='1.8' fill='none'/><path d='M99 236 C116 249 126 268 125 294' stroke='%23f0be6e' stroke-opacity='.5' stroke-width='1.6' fill='none'/></svg>");
}

/* ═══ table candles in the extreme foreground — out-of-focus bokeh discs
   cropped by the bottom edge (coarse >= 40px, soft, low alpha: L6-legal in
   the lane's masked floor zone). Two hold still on the static layer. */
head meta { display: var(--jazz-scenery, block); }
head meta:first-of-type::before {
  content: "";
  display: var(--jazz-scenery, block);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 34vh;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  background:
    radial-gradient(circle 3.6vh at 22% 72%, rgba(255, 226, 180, 0.12), rgba(255, 226, 180, 0) 100%),
    radial-gradient(circle 12vh at 22% 76%, rgba(255, 199, 130, 0.14) 0 56%, rgba(255, 190, 120, 0.065) 78%, rgba(255, 190, 120, 0) 100%),
    radial-gradient(circle 4.4vh at 57% 94%, rgba(255, 232, 190, 0.11), rgba(255, 232, 190, 0) 100%),
    radial-gradient(circle 14vh at 57% 100%, rgba(255, 208, 150, 0.12) 0 58%, rgba(255, 200, 140, 0.06) 80%, rgba(255, 200, 140, 0) 100%);
}

/* ═══ the third candle breathes — a small fixed box (not the viewport), one
   soft disc, steps(1) opacity: 6 discrete levels over 9s ≈ 0.7 paints/s
   (L2/L5-safe; not a continuous mover, so no will-change spent). */
head meta:first-of-type::after {
  content: "";
  display: var(--jazz-scenery, block);
  position: fixed;
  left: 68vw;
  bottom: -7vh;
  width: 26vh;
  height: 26vh;
  z-index: 0;
  pointer-events: none;
  opacity: 0.9;
  background:
    radial-gradient(circle 3.6vh at 50% 46%, rgba(255, 224, 176, 0.13), rgba(255, 224, 176, 0) 100%),
    radial-gradient(circle closest-side at 50% 50%, rgba(255, 196, 124, 0.16) 0 56%, rgba(255, 182, 104, 0.075) 78%, rgba(255, 182, 104, 0) 100%);
  animation: jazz-candle 9s steps(1, end) infinite;
}

/* ═══ THE PIANO — the house upright shouldering in from the bottom-right
   corner to balance the sax. A tall navy upper panel rises to a lid edge
   that carries the brass rim light (the beam grazes its top-right corner);
   parchment ivories brighten toward the light; black keys lean with the
   perspective; the left end sinks into the room's shadow. STATIC, promoted.
   Fine key-gap lines live in the corner — off the center lane, L6-legal. */
head meta:last-of-type::before {
  content: "";
  display: var(--jazz-scenery, block);
  position: fixed;
  right: 0;
  bottom: 0;
  width: 400px;
  height: 230px;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: contain;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 230'%3E%3Cdefs%3E%3ClinearGradient id='iv' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23786f5a'/%3E%3Cstop offset='.6' stop-color='%23b7aa89'/%3E%3Cstop offset='1' stop-color='%23c9bb97'/%3E%3C/linearGradient%3E%3ClinearGradient id='up' x1='0' y1='0' x2='.25' y2='1'%3E%3Cstop offset='0' stop-color='%23283a5e'/%3E%3Cstop offset='.4' stop-color='%231b2742'/%3E%3Cstop offset='1' stop-color='%230b1220'/%3E%3C/linearGradient%3E%3ClinearGradient id='sh' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='.28' stop-color='%23e9c48a' stop-opacity='0'/%3E%3Cstop offset='.72' stop-color='%23e9c48a' stop-opacity='.06'/%3E%3Cstop offset='1' stop-color='%23f4d49a' stop-opacity='.20'/%3E%3C/linearGradient%3E%3ClinearGradient id='refl' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23aebbd6' stop-opacity='.16'/%3E%3Cstop offset='.5' stop-color='%23aebbd6' stop-opacity='.03'/%3E%3Cstop offset='1' stop-color='%23aebbd6' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='lb' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%230d1730'/%3E%3Cstop offset='1' stop-color='%2305080f'/%3E%3C/linearGradient%3E%3ClinearGradient id='fd' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%2305070f' stop-opacity='1'/%3E%3Cstop offset='1' stop-color='%2305070f' stop-opacity='0'/%3E%3C/linearGradient%3E%3CclipPath id='pc'%3E%3Cpath d='M104 34 L400 6 L400 98 L96 128 Z M96 128 L400 98 L400 140 L84 170 Z M84 170 L400 140 L400 230 L84 230 Z'/%3E%3C/clipPath%3E%3C/defs%3E%3Cellipse cx='92' cy='226' rx='84' ry='5' fill='%23010409' opacity='.55'/%3E%3Cpath d='M84 170 L400 140 L400 230 L84 230 Z' fill='url(%23lb)'/%3E%3Cpath d='M104 34 L400 6 L400 98 L96 128 Z' fill='url(%23up)'/%3E%3Cpath d='M104 34 L400 6 L400 98 L96 128 Z' fill='url(%23sh)'/%3E%3Cpath d='M104 34 L400 6 L400 40 L102 66 Z' fill='url(%23refl)'/%3E%3Cpath d='M104 34 L400 6' stroke='%23d9a441' stroke-opacity='.55' stroke-width='2.2' stroke-linecap='round'/%3E%3Cpath d='M104 38 L400 10' stroke='%23eec167' stroke-opacity='.14' stroke-width='1'/%3E%3Cpath d='M96 122 L400 92' stroke='%23091120' stroke-opacity='.85' stroke-width='2'/%3E%3Cpath d='M96 128 L400 98 L400 130 L84 160 Z' fill='url(%23iv)'/%3E%3Cpath d='M117.7 125.9 L106.6 157.9 M139.4 123.7 L129.2 155.7 M161.1 121.6 L151.7 153.6 M182.9 119.4 L174.3 151.4 M204.6 117.3 L196.9 149.3 M226.3 115.1 L219.4 147.1 M248 113 L242 145 M269.7 110.9 L264.6 142.9 M291.4 108.7 L287.2 140.7 M313.1 106.6 L309.7 138.6 M334.9 104.4 L332.3 136.4 M356.6 102.3 L354.9 134.3 M378.3 100.1 L377.4 132.1' stroke='%23141a2b' stroke-width='1.2' opacity='.9' fill='none'/%3E%3Cpath d='M112.2 126.5 l11 -1.1 l-6.1 17.6 l-11 1.1 Z M133.9 124.3 l11 -1.1 l-5.7 17.6 l-11 1.1 Z M177.4 120 l11 -1.1 l-4.7 17.6 l-11 1.1 Z M199.1 117.9 l11 -1.1 l-4.2 17.6 l-11 1.1 Z M220.8 115.7 l11 -1.1 l-3.8 17.6 l-11 1.1 Z M264.2 111.5 l11 -1.1 l-2.8 17.6 l-11 1.1 Z M285.9 109.3 l11 -1.1 l-2.4 17.6 l-11 1.1 Z M329.4 105 l11 -1.1 l-1.4 17.6 l-11 1.1 Z M351.1 102.9 l11 -1.1 l-.9 17.6 l-11 1.1 Z M372.8 100.7 l11 -1.1 l-.5 17.6 l-11 1.1 Z' fill='%23090e1b'/%3E%3Cpath d='M84 160 L400 130 L400 140 L84 170 Z' fill='%23514b3c'/%3E%3Cpath d='M84 160 L400 130' stroke='%23e8d9b0' stroke-opacity='.22' stroke-width='1'/%3E%3Crect x='70' y='0' width='110' height='230' fill='url(%23fd)' clip-path='url(%23pc)'/%3E%3C/svg%3E");
}

/* ═══ neon OPEN LATE — the little window sign burning in the far dark,
   upper-left, across the room from the stage. z:-1 so the room smoke
   (body::before) drifts in front of it; the lane scrim never reaches this
   corner. Tube letters: wide dim bloom stroke under a thin hot core.
   STATIC, promoted. */
head meta:last-of-type::after {
  content: "";
  display: var(--jazz-scenery, block);
  position: fixed;
  left: 2vw;
  top: 11vh;
  width: 126px;
  height: 94px;
  z-index: -1;
  pointer-events: none;
  opacity: 0.75;
  transform: translateZ(0);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 110'%3E%3Cdefs%3E%3CradialGradient id='ng' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0' stop-color='%23ff7d72' stop-opacity='.20'/%3E%3Cstop offset='.6' stop-color='%23ff7d72' stop-opacity='.07'/%3E%3Cstop offset='1' stop-color='%23ff7d72' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect x='6' y='4' width='138' height='102' rx='4' fill='%23060b16' opacity='.55'/%3E%3Crect x='6' y='4' width='138' height='102' rx='4' fill='none' stroke='%23182136' stroke-width='2'/%3E%3Cellipse cx='75' cy='52' rx='58' ry='36' fill='url(%23ng)'/%3E%3Cpath d='M46 8 L46 24 M104 8 L104 24' stroke='%23131c30' stroke-width='1.5'/%3E%3Crect x='26' y='24' width='98' height='58' rx='10' fill='none' stroke='%23ff8c86' stroke-opacity='.16' stroke-width='2'/%3E%3Cg fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cg stroke='%23ff9089' stroke-width='4' opacity='.3'%3E%3Cellipse cx='46' cy='44' rx='8' ry='11'/%3E%3Cpath d='M60 55 L60 33 L67 33 A5.5 5.5 0 0 1 67 44 L60 44'/%3E%3Cpath d='M84 33 L76 33 L76 55 L84 55 M76 44 L83 44'/%3E%3Cpath d='M92 55 L92 33 L104 55 L104 33'/%3E%3Cpath d='M46 62 L46 72 L52 72'/%3E%3Cpath d='M58 72 L62 62 L66 72 M59.8 68.5 L64.2 68.5'/%3E%3Cpath d='M72 62 L80 62 M76 62 L76 72'/%3E%3Cpath d='M92 62 L86 62 L86 72 L92 72 M86 67 L91 67'/%3E%3C/g%3E%3Cg stroke='%23ffd7cf' stroke-width='1.6' opacity='.95'%3E%3Cellipse cx='46' cy='44' rx='8' ry='11'/%3E%3Cpath d='M60 55 L60 33 L67 33 A5.5 5.5 0 0 1 67 44 L60 44'/%3E%3Cpath d='M84 33 L76 33 L76 55 L84 55 M76 44 L83 44'/%3E%3Cpath d='M92 55 L92 33 L104 55 L104 33'/%3E%3Cpath d='M46 62 L46 72 L52 72'/%3E%3Cpath d='M58 72 L62 62 L66 72 M59.8 68.5 L64.2 68.5'/%3E%3Cpath d='M72 62 L80 62 M76 62 L76 72'/%3E%3Cpath d='M92 62 L86 62 L86 72 L92 72 M86 67 L91 67'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

/* ═══ room smoke: four huge soft wisps hanging in the air. Viewport-sized
   layer, so motion is steps(1, end) — one transform hop every 4.4s (far
   under the 5 hops/s cap); it holds a cached texture between hops. Box
   overscans 20vw so hops never expose an edge. */
body::before {
  content: "";
  display: var(--jazz-scenery, block);
  position: fixed;
  top: 0;
  bottom: 0;
  left: -20vw;
  right: -20vw;
  z-index: -1;
  pointer-events: none;
  background:
    /* wisps drifting in the cool ambient room */
    radial-gradient(ellipse 34vw 12vh at 24% 64%, rgba(172, 190, 218, 0.09), rgba(172, 190, 218, 0) 70%),
    radial-gradient(ellipse 30vw 10vh at 44% 82%, rgba(224, 204, 168, 0.06), rgba(224, 204, 168, 0) 70%),
    radial-gradient(ellipse 26vw 9vh at 82% 72%, rgba(168, 186, 214, 0.06), rgba(168, 186, 214, 0) 70%),
    /* two wisps hanging IN the beam's path (right of center, upper) — these
       catch the warm light, so they are tinted warm and a touch brighter: the
       money shot, smoke made visible by the spotlight raking through it */
    radial-gradient(ellipse 22vw 15vh at 68% 34%, rgba(226, 208, 176, 0.10), rgba(226, 208, 176, 0) 72%),
    radial-gradient(ellipse 16vw 11vh at 58% 50%, rgba(230, 214, 182, 0.075), rgba(230, 214, 182, 0) 74%);
  animation: jazz-smoke 44s steps(1, end) infinite;
}

/* ═══ the lane: names must stay readable over the beam, so the center
   column gets a quiet navy scrim — coarse, soft, STATIC. It fades before
   the far left so the sax keeps its light. */
body::after {
  content: "";
  display: var(--jazz-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background: linear-gradient(90deg,
    rgba(3, 6, 13, 0) 12%, rgba(3, 6, 13, 0.40) 32%, rgba(3, 6, 13, 0.48) 50%,
    rgba(3, 6, 13, 0.40) 68%, rgba(3, 6, 13, 0) 88%);
}

/* ═══ one small smoke puff curling off the stage beside the sax — the ONLY
   continuous mover (L2 small-element budget; will-change count: 1). It
   rises through the beam, sways, and thins out. */
head::before {
  content: "";
  display: var(--jazz-scenery, block);
  position: fixed;
  left: 5vw;
  bottom: 8vh;
  width: 190px;
  height: 210px;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  background:
    radial-gradient(circle at 42% 62%, rgba(214, 222, 238, 0.20) 0%, rgba(214, 222, 238, 0.09) 34%, rgba(214, 222, 238, 0) 62%),
    radial-gradient(circle at 64% 34%, rgba(226, 214, 196, 0.14) 0%, rgba(226, 214, 196, 0) 55%),
    radial-gradient(circle at 28% 28%, rgba(214, 222, 238, 0.11) 0%, rgba(214, 222, 238, 0) 50%);
  will-change: transform;
  animation: jazz-puff 38s ease-in-out infinite;
}

/* ═══ dust motes GLINTING in the light — the only fine pattern, so it RIDES
   THE ROLL (moves WITH the tracked glyphs = zero slide, zero flicker; L6-legal
   even as fine bright points). A richer spread now: cream + brass motes at a
   few scales, each a tiny hot core in a soft halo so they sparkle like grains
   caught in the spotlight rather than flat dots. Static, riding the roll. */
.credits-roll::before,
.credits-slideshow::before {
  content: "";
  display: var(--jazz-scenery, block);
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  opacity: 0.28;
  background-image:
    radial-gradient(circle at 30% 42%, rgba(255, 250, 236, 0.95) 0 1px, rgba(242, 233, 216, 0.28) 2.2px, rgba(242, 233, 216, 0) 4px),
    radial-gradient(circle at 72% 18%, rgba(255, 224, 156, 0.9) 0 1.1px, rgba(238, 193, 103, 0.24) 2.4px, rgba(238, 193, 103, 0) 4.4px),
    radial-gradient(circle at 14% 78%, rgba(248, 240, 224, 0.75) 0 1px, rgba(242, 233, 216, 0) 3px),
    radial-gradient(circle at 88% 60%, rgba(255, 236, 184, 0.7) 0 1.2px, rgba(240, 206, 150, 0.2) 2.6px, rgba(240, 206, 150, 0) 4.6px),
    radial-gradient(circle at 52% 88%, rgba(250, 244, 228, 0.6) 0 0.9px, rgba(242, 233, 216, 0) 2.6px);
  background-size: 340px 340px, 260px 260px, 420px 420px, 300px 300px, 380px 380px;
}

/* ═══ session sheet: every block is a take ═══ */
.credits-block,
.credits-slide:not(.flourish) { counter-increment: jazz-take; }

/* hue cycle — brass, bordeaux, teal, repeat (intro is section 1, so the
   first block lands on 3n+2 = brass). Content-agnostic, custom types safe. */
.credits-block:nth-of-type(3n + 2),
.credits-slide:nth-of-type(3n + 2) { --jazz-bar: var(--jazz-brass); --jazz-bar-ink: var(--jazz-ink); }
.credits-block:nth-of-type(3n),
.credits-slide:nth-of-type(3n) { --jazz-bar: var(--jazz-bordeaux); --jazz-bar-ink: var(--jazz-cream); }
.credits-block:nth-of-type(3n + 1),
.credits-slide:nth-of-type(3n + 1) { --jazz-bar: var(--jazz-teal); --jazz-bar-ink: var(--jazz-cream); }

/* ═══ titles: Reid Miles color blocks — hard Archivo caps punched on a
   solid bar, knocked off-center left, with a flat print-shadow block.
   The take number sits above the bar like a pencil note on the sheet. */
.credits-block__title {
  position: relative;
  width: fit-content;
  max-width: 86vw;
  margin: 0 auto 1.6rem;
  padding: 0.3em 0.78em 0.24em;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: var(--jazz-bar-ink, var(--jazz-ink));
  /* letterpress ink block: the flat hue-cycle color grazed by two lights — a
     soft top light and a warm raking sheen from the upper-right (the room's
     spotlight direction), sunk to shadow at the foot. Top hairline + inset
     shadows read as a pressed, slightly domed inked plate, not a flat swatch. */
  background-color: var(--jazz-bar, var(--jazz-brass));
  background-image:
    /* SHINE: a crisp diagonal specular gleam raking across the plate from the
       spotlight's upper-right — a polished-varnish highlight, static and baked
       ON the prop (L6-safe). A tight bright band with soft shoulders. */
    linear-gradient(122deg, rgba(255, 252, 240, 0) 40%, rgba(255, 252, 240, 0.16) 47%, rgba(255, 255, 250, 0.42) 50%, rgba(255, 252, 240, 0.16) 53%, rgba(255, 252, 240, 0) 60%),
    radial-gradient(ellipse 120% 180% at 88% -30%, rgba(255, 246, 224, 0.22), rgba(255, 246, 224, 0) 58%),
    linear-gradient(178deg, rgba(255, 255, 255, 0.17) 0%, rgba(255, 255, 255, 0) 22%, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.22) 100%);
  box-shadow:
    0.28em 0.3em 0 rgba(3, 6, 14, 0.82),
    0.5em 0.54em 0.6em rgba(2, 4, 10, 0.34),
    inset 0 0.07em 0 rgba(255, 250, 235, 0.32),
    inset 0.05em 0 0 rgba(255, 250, 235, 0.10),
    inset 0 -0.1em 0.16em rgba(0, 0, 0, 0.32);
  /* ink bite: the caps sit pressed into the block, a hair of relief */
  text-shadow: 0 0.5px 0 rgba(255, 250, 235, 0.2), 0 -0.5px 0.5px rgba(0, 0, 0, 0.24);
  transform: translateX(-1.6em);
}
.credits-block__title::after { display: none; }
.credits-block__title::before {
  content: "take " counter(jazz-take, decimal-leading-zero);
  position: absolute;
  left: 0.15em;
  bottom: calc(100% + 0.55em);
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.68rem;
  letter-spacing: 0.5em;
  text-transform: lowercase;
  white-space: nowrap;
  color: var(--jazz-brass-bright);
  text-shadow: 0 1px 8px rgba(2, 5, 12, 0.8);
  opacity: 0.92;
}

/* ═══ rows: the setlist. Names in warm cream, never clipped; amounts in
   aged cream behind a small brass diamond. */
.credit {
  max-width: min(42rem, 90vw);
  margin-inline: auto;
  min-width: 0;
  overflow-wrap: anywhere;
  font-weight: 500;
  letter-spacing: 0.015em;
  line-height: 1.55;
}
.credit__name { color: #f7f1e4; }
.credit__amount {
  opacity: 0.95;
  font-size: 0.78em;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: var(--jazz-cream);
  font-variant-numeric: tabular-nums;
}
.credit__amount::before {
  content: "\\25C6";
  font-size: 0.52em;
  color: var(--jazz-brass);
  margin: 0 0.75em 0 0.9em;
  vertical-align: 0.24em;
  opacity: 0.85;
}

/* ═══ flourish cards ═══ */
.flourish--intro { gap: 1.35rem; }

/* badge -> the marquee card (copy swap via font-size:0 + ::after) */
.flourish__badge { font-size: 0; border: 0; border-radius: 0; padding: 0; box-shadow: none; }
.flourish__badge::after {
  content: "live at the basement · one night only";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.82rem;
  letter-spacing: 0.42em;
  padding: 0.62em 0 0.62em 0.42em;
  text-transform: uppercase;
  color: var(--jazz-cream);
  border-top: 1px solid rgba(217, 164, 65, 0.6);
  border-bottom: 1px solid rgba(217, 164, 65, 0.6);
}

/* the streamer's title, set like an album cover: 900-weight caps on a
   brass block, bordeaux print-shadow, knocked slightly off-center. */
.flourish--intro .flourish__title {
  font-weight: 900;
  letter-spacing: 0.02em;
  line-height: 1.06;
  max-width: min(88vw, 14em);
  background-color: var(--jazz-brass);
  background-image:
    /* SHINE: diagonal specular gleam raking the marquee plate (static, on-prop) */
    linear-gradient(122deg, rgba(255, 252, 240, 0) 41%, rgba(255, 252, 240, 0.18) 47%, rgba(255, 255, 250, 0.46) 50%, rgba(255, 252, 240, 0.18) 53%, rgba(255, 252, 240, 0) 59%),
    radial-gradient(ellipse 100% 170% at 86% -28%, rgba(255, 248, 226, 0.26), rgba(255, 248, 226, 0) 56%),
    linear-gradient(178deg, rgba(255, 255, 255, 0.19) 0%, rgba(255, 255, 255, 0) 24%, rgba(0, 0, 0, 0) 58%, rgba(0, 0, 0, 0.22) 100%);
  color: var(--jazz-ink);
  padding: 0.16em 0.48em 0.1em;
  transform: translateX(-0.35em);
  box-shadow:
    0.22em 0.22em 0 rgba(124, 33, 54, 0.92),
    0.42em 0.46em 0.6em rgba(2, 4, 10, 0.36),
    inset 0 0.06em 0 rgba(255, 250, 235, 0.36),
    inset 0.05em 0 0 rgba(255, 250, 235, 0.12),
    inset 0 -0.09em 0.15em rgba(0, 0, 0, 0.3);
  text-shadow: 0 0.5px 0 rgba(255, 250, 235, 0.22), 0 -0.5px 0.5px rgba(0, 0, 0, 0.24);
}

/* streamer tagline: restyle only — the spoken line, in Fraunces italic */
.flourish__tagline {
  font-family: "Fraunces", Georgia, "Times New Roman", serif;
  font-style: italic;
  font-weight: 400;
  font-size: 1.12rem;
  letter-spacing: 0.05em;
  text-transform: lowercase;
  color: rgba(242, 233, 216, 0.88);
}

/* rating -> the session stamp (copy swap) */
.flourish__rating { font-size: 0; border: 0; padding: 0; opacity: 1; }
.flourish__rating::after {
  content: "recorded hot — no charts";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.32em;
  padding: 0.55em 0.9em 0.55em 1.22em;
  text-transform: uppercase;
  color: var(--jazz-brass);
  border: 1px solid rgba(217, 164, 65, 0.55);
  border-radius: 2px;
}

/* catalog fine print, straight off the back of the sleeve */
.flourish--intro::after {
  content: "blp 4217 · stereo · 33\\2153 rpm · high fidelity";
  display: var(--jazz-scenery, block);
  font-family: var(--credits-font);
  font-weight: 500;
  font-size: 0.66rem;
  letter-spacing: 0.32em;
  padding-left: 0.32em;
  text-transform: lowercase;
  color: rgba(242, 233, 216, 0.48);
}

/* outro: LAST CALL on the bordeaux block, brass print-shadow (copy swap;
   shadow and spacing re-declared on the ::after — em against the parent's
   font-size:0 computes to zero) */
.flourish--outro::before {
  content: "\\25C6 \\25C6 \\25C6";
  display: var(--jazz-scenery, block);
  font-size: 0.7rem;
  letter-spacing: 0.85em;
  padding-left: 0.85em;
  color: var(--jazz-brass);
  opacity: 0.8;
}
.flourish--outro .flourish__title { font-size: 0; }
.flourish--outro .flourish__title::after {
  content: "LAST CALL";
  display: inline-block;
  font-family: var(--credits-title-font);
  font-weight: 900;
  font-size: var(--credits-flourish-title-size);
  letter-spacing: 0.03em;
  line-height: 1.06;
  background-color: var(--jazz-bordeaux);
  background-image:
    /* SHINE: diagonal specular gleam raking the LAST CALL plate (static, on-prop) */
    linear-gradient(122deg, rgba(255, 236, 226, 0) 41%, rgba(255, 236, 226, 0.16) 47%, rgba(255, 244, 238, 0.4) 50%, rgba(255, 236, 226, 0.16) 53%, rgba(255, 236, 226, 0) 59%),
    radial-gradient(ellipse 100% 170% at 86% -28%, rgba(255, 214, 200, 0.20), rgba(255, 214, 200, 0) 56%),
    linear-gradient(178deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 24%, rgba(0, 0, 0, 0) 58%, rgba(0, 0, 0, 0.26) 100%);
  color: var(--jazz-cream);
  padding: 0.16em 0.5em 0.1em;
  transform: translateX(-0.3em);
  box-shadow:
    0.22em 0.22em 0 rgba(217, 164, 65, 0.85),
    0.42em 0.46em 0.6em rgba(2, 4, 10, 0.38),
    inset 0 0.055em 0 rgba(255, 240, 224, 0.26),
    inset 0.05em 0 0 rgba(255, 240, 224, 0.1),
    inset 0 -0.09em 0.15em rgba(0, 0, 0, 0.36);
  text-shadow: 0 0.5px 0 rgba(255, 240, 224, 0.16), 0 -0.5px 0.5px rgba(0, 0, 0, 0.32);
}
.flourish--outro .flourish__tagline { font-size: 0; }
.flourish--outro .flourish__tagline::after {
  content: "the band plays on — tip your bartender";
  font-family: "Fraunces", Georgia, "Times New Roman", serif;
  font-style: italic;
  font-size: 1.05rem;
  letter-spacing: 0.05em;
  color: rgba(242, 233, 216, 0.85);
}

/* ═══ raid finale: THE ENCORE — the room lights warm. The bar goes hot
   brass with a bordeaux print-shadow, a static amber halo rises behind the
   block, and the eyebrow breathes on a steps() glow (~0.5 paints/s — the
   only animation inside the roll, far under the 2 paints/s ceiling). */
.credits-block:nth-last-of-type(2),
.credits-slide:nth-last-of-type(2):not(.flourish) {
  --jazz-bar: #e5b04a;
  --jazz-bar-ink: #1a1206;
}
/* scroll: a tight halo that dies well inside the block box (no hard edges);
   slideshow: the slide IS the viewport, so the whole room warms up. */
.credits-block:nth-last-of-type(2) {
  background: radial-gradient(ellipse 55% 60% at 50% 34%, rgba(217, 164, 65, 0.13), rgba(217, 164, 65, 0) 72%);
}
.credits-slide:nth-last-of-type(2):not(.flourish) {
  background: radial-gradient(ellipse 62% 58% at 50% 46%, rgba(217, 164, 65, 0.12), rgba(217, 164, 65, 0) 80%);
}
.credits-block:nth-last-of-type(2) .credits-block__title,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
  box-shadow: 0.3em 0.3em 0 rgba(124, 33, 54, 0.9);
}
.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  content: "the encore";
  color: #ffdf9e;
  text-shadow: 0 0 14px rgba(238, 193, 103, 0.55), 0 1px 8px rgba(2, 5, 12, 0.8);
  animation: jazz-encore 4.2s steps(1, end) infinite;
}
.credits-block:nth-last-of-type(2) .credit,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit {
  font-size: calc(var(--credits-name-size) * 1.08);
}
.credits-block:nth-last-of-type(2) .credit__name,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__name {
  text-shadow: 0 0 16px rgba(238, 193, 103, 0.35), var(--credits-shadow);
}

/* ═══ slideshow: slides settle like a needle drop — small one-shot
   opacity/transform transitions layered on the base fade. */
.credits-slide {
  transform: translateY(14px);
  transition: opacity 0.9s ease, transform 1s cubic-bezier(0.22, 1, 0.36, 1);
}
.credits-slide.is-active { transform: none; }

/* ═══ keyframes (all jazz- prefixed; transform/opacity ONLY) ═══ */
/* room smoke: ten held positions over 44s = one hop every 4.4s */
@keyframes jazz-smoke {
  0%   { transform: translate3d(0, 0, 0); }
  10%  { transform: translate3d(1.6vw, -0.5vh, 0); }
  20%  { transform: translate3d(3vw, -1vh, 0); }
  30%  { transform: translate3d(1.8vw, -1.7vh, 0); }
  40%  { transform: translate3d(-0.6vw, -1.2vh, 0); }
  50%  { transform: translate3d(-2.4vw, -0.4vh, 0); }
  60%  { transform: translate3d(-3.2vw, 0.5vh, 0); }
  70%  { transform: translate3d(-1.8vw, 1vh, 0); }
  80%  { transform: translate3d(0.4vw, 0.8vh, 0); }
  90%  { transform: translate3d(1.2vw, 0.3vh, 0); }
  100% { transform: translate3d(0, 0, 0); }
}
/* the puff: rises through the beam, sways right, thins, and is gone */
@keyframes jazz-puff {
  0%   { transform: translate3d(0, 0, 0) scale(0.85); opacity: 0; }
  10%  { opacity: 0.32; }
  45%  { transform: translate3d(6vw, -24vh, 0) scale(1.12); }
  70%  { opacity: 0.2; }
  100% { transform: translate3d(2vw, -52vh, 0) scale(1.3); opacity: 0; }
}
/* encore eyebrow: two discrete dips per 4.2s — lights warming, not a blink */
@keyframes jazz-encore {
  0%, 55%   { opacity: 1; }
  62%, 78%  { opacity: 0.55; }
  84%, 100% { opacity: 1; }
}
/* the candle: six held brightness levels over 9s (~0.7 paints/s) — a flame
   settling, never a strobe */
@keyframes jazz-candle {
  0%   { opacity: 0.92; }
  16%  { opacity: 0.72; }
  41%  { opacity: 1; }
  62%  { opacity: 0.64; }
  80%  { opacity: 0.88; }
  100% { opacity: 0.92; }
}

/* ═══ reduced motion: the room holds its breath — smoke hangs still, the
   puff parks faint beside the sax, the candle burns steady (parked visible
   at its resting opacity), the encore stops breathing. */
@media (prefers-reduced-motion: reduce) {
  body::before { animation: none; }
  head::before { animation: none; opacity: 0.2; }
  head meta:first-of-type::after { animation: none; }
  .credits-block:nth-last-of-type(2) .credits-block__title::before,
  .credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
    animation: none;
  }
  .credits-slide { transform: none; transition: opacity 0.8s ease; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--jazz-scenery:none;}",
};
