import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. Corkboard: an after-hours desk under a warm gooseneck lamp — the stream's memories pinned to a cork board as instant photos, each block a polaroid with a handwritten marker caption, held by washi tape or a chrome push-pin and strung together with red baker's twine. Amounts are little heart-counts; the raid finale is a gold-star burst sticker; the outro closes the book. */
export const VARIANT: ThemeVariant = {
  key: "scrapbook",
  name: "Corkboard",
  css: `
/* ================================================================
   CORKBOARD — layered after the base theme.
   Fiction: 1:14 AM at the desk. A warm gooseneck lamp leans in from
   the upper-left and pools its light on a cork memo-board that fills
   the frame; the night's memories are pinned up as instant photos.
   Every credits BLOCK is a polaroid: a thick white frame with a slim
   photographic mat, a handwritten marker caption on its lower lip,
   held to the cork by a strip of candy-striped washi tape or a chrome
   push-pin, and threaded onto a length of red baker's twine that
   swags between the cards. A coffee mug and a jar of markers sit at
   the desk's right edge; a loose snapshot and a ticket stub have
   slid into the lower-left corner. Names are photo captions; amounts
   are little heart-counts inked beside them. The raid block is the
   GOLD-STAR sticker slapped on the best shot of the night. The outro
   closes the book: "scrapbook closed."
   Layer map (all scenery kill-switched via --scrapbook-scenery):
     html bg (--credits-bg)   cheap warm cork: one radial lamp-warm
                              lift over a 6-stop cork-brown field (L3)
     html::before             LIGHT STORY — the lamp pool from upper-
                              left, a soft cone, warm desk sheen, the
                              board's inner shadow frame, corner
                              vignette. STATIC, promoted, all coarse
     html::after              THE GOOSENECK LAMP — SVG object upper-
                              left: brass arm, enamel shade, hot bulb,
                              specular, cast shadow. STATIC, promoted
     head::before             COFFEE MUG + MARKER JAR still life,
                              lower-right on the desk. STATIC, promoted
     head::after              a LOOSE SNAPSHOT + TICKET STUB slid into
                              the lower-left corner. STATIC, promoted
     meta#1::before           the CORK GRAIN — coarse blob flecks
                              (>=44px soft cells, low alpha), promoted.
                              Corners/edges only feel; L6-safe coarse
     meta#1::after            a scatter of loose PUSH-PINS + a paper
                              clip resting in the top-right. STATIC
     meta#2::before           the TWINE REEL + a torn washi roll
                              parked top-left under the lamp. STATIC
     meta#2::after            a DANGLING PHOTO swinging on its pin in
                              the top-right — the ONLY continuous
                              mover (small box, will-change budget: 1)
     body::before             warm lamp dust — 3 huge soft motes,
                              steps(1) drift, one hop per 5s
     body::after              center-lane readability scrim. STATIC
     .credits-roll::before    fine cork fleck + fiber print — the only
     .credits-slideshow::before  fine pattern, so it RIDES THE ROLL
   ================================================================ */
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Kalam:wght@300;400;700&family=Nunito+Sans:ital,wght@0,600;0,800;1,600&display=swap');

:root {
  /* ── palette: the desk ── */
  --scrapbook-scenery: block; /* set to none to strip every scenery layer */
  --sb-cork: #c69a5f;
  --sb-cork-deep: #8a6636;
  --sb-cork-dark: #6d4e29;
  --sb-paper: #f8f4ea;
  --sb-paper-warm: #efe7d4;
  --sb-ink: #2c3a44;         /* marker midnight */
  --sb-ink-soft: #47535d;
  --sb-coral: #ef7a6b;        /* washi coral */
  --sb-mint: #7cc6ae;         /* washi mint */
  --sb-twine: #c0392b;        /* baker's twine red */
  --sb-gold: #f4c430;         /* gold star */
  --sb-heart: #e35d6a;        /* heart-count red */

  /* ── the developed instant-photos each polaroid holds — three
     distinct dusk memories, cycled per block (see nth-of-type below).
     Each is one unbroken data-URI line. ── */
  --sb-photo: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' preserveAspectRatio='xMidYMid slice'%3E %3Cdefs%3E %3ClinearGradient id='skyA' x1='0' y1='0' x2='0' y2='1'%3E %3Cstop offset='0' stop-color='%233a5170'/%3E%3Cstop offset='.34' stop-color='%237d6f8e'/%3E%3Cstop offset='.56' stop-color='%23c98d76'/%3E%3Cstop offset='.72' stop-color='%23e6a878'/%3E%3Cstop offset='1' stop-color='%23f0c489'/%3E %3C/linearGradient%3E %3CradialGradient id='sunA' cx='50%25' cy='70%25' r='42%25'%3E %3Cstop offset='0' stop-color='%23fff3d4'/%3E%3Cstop offset='.3' stop-color='%23ffd9a0' stop-opacity='.85'/%3E%3Cstop offset='1' stop-color='%23ffd9a0' stop-opacity='0'/%3E %3C/radialGradient%3E %3ClinearGradient id='ah3' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%239a8fa2'/%3E%3Cstop offset='1' stop-color='%238a8098'/%3E%3C/linearGradient%3E %3ClinearGradient id='ah2' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%236a5f72'/%3E%3Cstop offset='1' stop-color='%23514a5e'/%3E%3C/linearGradient%3E %3ClinearGradient id='ah1' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23332b3a'/%3E%3Cstop offset='1' stop-color='%231c1824'/%3E%3C/linearGradient%3E %3CradialGradient id='vigA' cx='50%25' cy='46%25' r='62%25'%3E%3Cstop offset='.5' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%230a0710' stop-opacity='.5'/%3E%3C/radialGradient%3E %3Cfilter id='grA'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='4' result='n'/%3E%3CfeColorMatrix in='n' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0'/%3E%3C/filter%3E %3C/defs%3E %3Crect width='400' height='300' fill='url(%23skyA)'/%3E %3Ccircle cx='200' cy='210' r='150' fill='url(%23sunA)'/%3E %3Cpath d='M0 150 Q80 128 150 144 T300 140 T400 148 L400 300 L0 300 Z' fill='url(%23ah3)' opacity='.7'/%3E %3Cpath d='M0 182 Q90 158 180 176 T340 172 L400 180 L400 300 L0 300 Z' fill='url(%23ah2)' opacity='.85'/%3E %3Cpath d='M0 216 Q110 192 210 214 T400 210 L400 300 L0 300 Z' fill='url(%23ah1)'/%3E %3Crect width='400' height='300' fill='url(%23vigA)'/%3E %3Crect width='400' height='300' filter='url(%23grA)'/%3E %3C/svg%3E");
  --sb-photo-b: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' preserveAspectRatio='xMidYMid slice'%3E %3Cdefs%3E %3ClinearGradient id='skyB' x1='0' y1='0' x2='0' y2='1'%3E %3Cstop offset='0' stop-color='%2333474a'/%3E%3Cstop offset='.4' stop-color='%235f7d76'/%3E%3Cstop offset='.7' stop-color='%23b8b183'/%3E%3Cstop offset='1' stop-color='%23e4d29a'/%3E %3C/linearGradient%3E %3CradialGradient id='sunB' cx='42%25' cy='64%25' r='40%25'%3E %3Cstop offset='0' stop-color='%23fdf6d8'/%3E%3Cstop offset='.4' stop-color='%23f0e3a8' stop-opacity='.7'/%3E%3Cstop offset='1' stop-color='%23f0e3a8' stop-opacity='0'/%3E %3C/radialGradient%3E %3ClinearGradient id='r3' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%238fa39a'/%3E%3Cstop offset='1' stop-color='%237e948b'/%3E%3C/linearGradient%3E %3ClinearGradient id='r2' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%234f665c'/%3E%3Cstop offset='1' stop-color='%233c524a'/%3E%3C/linearGradient%3E %3ClinearGradient id='r1' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23212f2a'/%3E%3Cstop offset='1' stop-color='%23141d1a'/%3E%3C/linearGradient%3E %3CradialGradient id='vigB' cx='50%25' cy='46%25' r='62%25'%3E %3Cstop offset='.5' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%230a0710' stop-opacity='.5'/%3E %3C/radialGradient%3E %3Cfilter id='grB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='4' result='n'/%3E%3CfeColorMatrix in='n' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0'/%3E%3C/filter%3E %3C/defs%3E %3Crect width='400' height='300' fill='url(%23skyB)'/%3E %3Ccircle cx='168' cy='192' r='120' fill='url(%23sunB)'/%3E %3Cpath d='M0 152 L26 132 L44 150 L70 126 L92 150 L116 130 L140 152 L400 150 L400 300 L0 300 Z' fill='url(%23r3)' opacity='.55'/%3E %3Cpath d='M0 186 L34 158 L58 184 L86 156 L118 186 L150 160 L182 188 L400 182 L400 300 L0 300 Z' fill='url(%23r2)' opacity='.8'/%3E %3Cpath d='M0 222 L40 194 L74 222 L110 192 L150 224 L196 196 L240 224 L400 216 L400 300 L0 300 Z' fill='url(%23r1)'/%3E %3Crect width='400' height='300' fill='url(%23vigB)'/%3E %3Crect width='400' height='300' filter='url(%23grB)'/%3E %3C/svg%3E");
  --sb-photo-c: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' preserveAspectRatio='xMidYMid slice'%3E %3Cdefs%3E %3ClinearGradient id='skyC' x1='0' y1='0' x2='0' y2='1'%3E %3Cstop offset='0' stop-color='%236a4a6a'/%3E%3Cstop offset='.35' stop-color='%23c56f5a'/%3E%3Cstop offset='.62' stop-color='%23eea24e'/%3E%3Cstop offset='1' stop-color='%23f6cf6e'/%3E %3C/linearGradient%3E %3CradialGradient id='sunC' cx='52%25' cy='78%25' r='40%25'%3E %3Cstop offset='0' stop-color='%23fffbe4'/%3E%3Cstop offset='.35' stop-color='%23ffe08a' stop-opacity='.85'/%3E%3Cstop offset='1' stop-color='%23ffe08a' stop-opacity='0'/%3E %3C/radialGradient%3E %3ClinearGradient id='seaC' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23c98a54'/%3E%3Cstop offset='.5' stop-color='%237a5560'/%3E%3Cstop offset='1' stop-color='%233a2c42'/%3E%3C/linearGradient%3E %3CradialGradient id='vigC' cx='50%25' cy='46%25' r='62%25'%3E %3Cstop offset='.5' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%230a0710' stop-opacity='.5'/%3E %3C/radialGradient%3E %3Cfilter id='grC'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='4' result='n'/%3E%3CfeColorMatrix in='n' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0'/%3E%3C/filter%3E %3C/defs%3E %3Crect width='400' height='300' fill='url(%23skyC)'/%3E %3Ccircle cx='208' cy='196' r='30' fill='%23fff4cc'/%3E %3Ccircle cx='208' cy='196' r='120' fill='url(%23sunC)'/%3E %3Crect x='0' y='196' width='400' height='104' fill='url(%23seaC)'/%3E %3Cpath d='M188 196 h40 l30 104 h-100 Z' fill='%23ffe8a4' opacity='.4'/%3E %3Cg fill='%23ffe8a4' opacity='.5'%3E%3Crect x='150' y='212' width='100' height='2'/%3E%3Crect x='120' y='230' width='160' height='2.4'/%3E%3Crect x='96' y='250' width='208' height='2.6'/%3E%3Crect x='80' y='274' width='240' height='3'/%3E%3C/g%3E %3Cpath d='M0 194 Q40 186 78 192 L78 200 L0 200 Z' fill='%232c2438' opacity='.5'/%3E %3Crect width='400' height='300' fill='url(%23vigC)'/%3E %3Crect width='400' height='300' filter='url(%23grC)'/%3E %3C/svg%3E");

  /* ── base hooks ── */
  /* Cheap board (L3): the cork's underlying colour story only — a warm
     lamp-lift top-left, a few LARGE clumped tonal zones (the cork's
     macro mottle, all >=120px so they read as pressed-granule regions,
     never flicker), a whisper of ochre/sienna variation, over an 8-stop
     cork field warmed from honey at the lamp to roast at the far corner.
     The FINE granule speckle + pressed fibre lives on the promoted grain
     pseudo (meta#1::before) as a real fractal-noise print — this field
     stays gradient-cheap so the compositor never sweats it. */
  --credits-bg:
    radial-gradient(ellipse 60% 50% at 24% 6%, rgba(255, 228, 170, 0.22) 0%, rgba(255, 226, 168, 0.06) 46%, rgba(255, 226, 168, 0) 72%),
    radial-gradient(ellipse 150px 130px at 16% 30%, rgba(120, 82, 40, 0.20) 0 46%, rgba(120, 82, 40, 0) 78%),
    radial-gradient(ellipse 140px 120px at 58% 16%, rgba(232, 196, 142, 0.22) 0 44%, rgba(232, 196, 142, 0) 76%),
    radial-gradient(ellipse 180px 150px at 86% 38%, rgba(96, 62, 28, 0.20) 0 48%, rgba(96, 62, 28, 0) 78%),
    radial-gradient(ellipse 130px 150px at 34% 64%, rgba(224, 186, 132, 0.20) 0 44%, rgba(224, 186, 132, 0) 76%),
    radial-gradient(ellipse 190px 160px at 72% 84%, rgba(88, 56, 26, 0.22) 0 48%, rgba(88, 56, 26, 0) 78%),
    radial-gradient(ellipse 150px 130px at 6% 86%, rgba(210, 172, 120, 0.18) 0 44%, rgba(210, 172, 120, 0) 76%),
    radial-gradient(ellipse 120% 80% at 48% 40%, rgba(196, 118, 52, 0.10) 0 40%, rgba(150, 90, 40, 0) 82%),
    linear-gradient(157deg, #d3a25e 0%, #caa055 20%, #bd9147 40%, #ac7d3a 58%, #986b31 74%, #7c5628 88%, #61451f 100%);
  --credits-color: var(--sb-ink);
  --credits-accent: var(--sb-twine);
  --credits-font: "Kalam", "Comic Sans MS", "Segoe Print", cursive;
  --credits-title-font: "Caveat", "Bradley Hand", "Segoe Script", cursive;
  --credits-title-size: clamp(1.9rem, 4.6vw, 3rem);
  --credits-name-size: clamp(1.05rem, 2.5vw, 1.5rem);
  --credits-flourish-title-size: clamp(2.6rem, 9vw, 5.4rem);
  --credits-block-gap: 5.5rem;
  --credits-name-gap: 0.5rem;
  --credits-shadow: 0 1px 6px rgba(60, 40, 18, 0.35);
  /* glow no-op — never "none" (a "none" in the composed shadow list
     invalidates the whole declaration); Corkboard glows are bespoke. */
  --credits-glow: 0 0 0 rgba(0, 0, 0, 0);
}

/* Scenery is full-bleed: drop the base edge-fade on html ONLY; body keeps
   the base mask so the polaroids ease in at the bottom and out at the top. */
html { -webkit-mask-image: none; mask-image: none; }
body { background: transparent; }

/* ═══ THE LIGHT STORY — one static promoted layer (L3). The gooseneck
   lamp pours a warm pool from the upper-left; a soft cone hangs under
   it; the desk breathes a warm sheen; the cork board carries a subtle
   inner-shadow frame so it reads as a mounted panel; the corners fall
   to a warm vignette. Everything huge and soft — nothing can flicker. */
html::before {
  content: "";
  display: var(--scrapbook-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* board inner-shadow frame — the cork is inset in a wooden lip */
    linear-gradient(90deg, rgba(52, 34, 14, 0.40) 0%, rgba(52, 34, 14, 0) 5%, rgba(52, 34, 14, 0) 95%, rgba(52, 34, 14, 0.40) 100%),
    linear-gradient(180deg, rgba(52, 34, 14, 0.36) 0%, rgba(52, 34, 14, 0) 6%, rgba(52, 34, 14, 0) 94%, rgba(52, 34, 14, 0.42) 100%),
    /* corner vignette — the room presses in warm-dark at the edges, but
       eased so there is NO hard mid-frame shelf: the darkness only gathers
       past 66% radius and lands soft, letting the whole board breathe */
    radial-gradient(ellipse 132% 128% at 40% 30%, rgba(46, 30, 12, 0) 60%, rgba(46, 30, 12, 0.22) 84%, rgba(38, 24, 10, 0.48) 100%),
    /* the lamp source: a hot little bloom off the upper-left */
    radial-gradient(ellipse 24vw 18vh at 19% 1%, rgba(255, 238, 190, 0.42), rgba(255, 236, 186, 0) 72%),
    /* the cone: a soft warm wedge dropping from the shade toward center */
    conic-gradient(from 150deg at 18% -4%, rgba(255, 230, 176, 0) 0deg, rgba(255, 230, 176, 0.06) 9deg, rgba(255, 226, 166, 0.15) 19deg, rgba(255, 230, 176, 0.07) 29deg, rgba(255, 230, 176, 0) 40deg),
    /* where the light lands: a strong warm pool on the upper-left cork —
       the granules brighten and warm right under the shade. Enlarged and
       reaching further down-and-right so its falloff is long and smooth,
       never a shelf, and the light travels across the board naturally */
    radial-gradient(ellipse 56vw 50vh at 26% 16%, rgba(255, 226, 166, 0.32), rgba(255, 222, 158, 0.10) 46%, rgba(255, 222, 158, 0) 80%),
    /* a second, softer warm bloom carrying the lamp's light out to the
       lower-centre so the big middle of the board is lit, not dead */
    radial-gradient(ellipse 62vw 52vh at 44% 62%, rgba(246, 208, 154, 0.13), rgba(246, 208, 154, 0) 72%),
    /* a warm sheen on the right half so the mid-right is never a flat
       dead zone — a gentle bounce of lamplight across the cork */
    radial-gradient(ellipse 54vw 60vh at 78% 40%, rgba(238, 196, 140, 0.10), rgba(238, 196, 140, 0) 70%),
    /* the lamp's soft body-shadow thrown down-right across the cork so the
       object feels like it sits ON the board and casts, not floats */
    radial-gradient(ellipse 20vw 30vh at 12% 42%, rgba(40, 26, 10, 0.24), rgba(40, 26, 10, 0) 68%),
    /* the far corners cool gently deeper into board shadow (soft, no band) */
    radial-gradient(ellipse 46vw 44vh at 92% 94%, rgba(48, 30, 12, 0.30), rgba(48, 30, 12, 0) 72%),
    radial-gradient(ellipse 38vw 38vh at 96% 6%, rgba(48, 30, 12, 0.18), rgba(48, 30, 12, 0) 68%);
}

/* ═══ THE GOOSENECK LAMP — hero prop, upper-left, leaning into the
   board. Brass jointed arm rising from a weighted base, a warm enamel
   shade tipped toward center, a hot bulb with a specular pip, and a
   soft cast shadow thrown down-right onto the cork. STATIC, promoted —
   an object at rest, the source of the whole light story. */
html::after {
  content: "";
  display: var(--scrapbook-scenery, block);
  position: fixed;
  left: 1vw;
  top: -2vh;
  width: 300px;
  height: 360px;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background-repeat: no-repeat;
  background-position: left top;
  background-size: contain;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 380' width='300' height='380'%3E%3Cdefs%3E%3ClinearGradient id='enamel' x1='0.15' y1='0.05' x2='0.9' y2='0.95'%3E%3Cstop offset='0' stop-color='%23fff0c8'/%3E%3Cstop offset='0.2' stop-color='%23f4cd6e'/%3E%3Cstop offset='0.5' stop-color='%23e09a2e'/%3E%3Cstop offset='0.78' stop-color='%23b06d1c'/%3E%3Cstop offset='1' stop-color='%23744612'/%3E%3C/linearGradient%3E%3ClinearGradient id='enamelDk' x1='0' y1='0' x2='1' y2='0.6'%3E%3Cstop offset='0' stop-color='%23a4661a'/%3E%3Cstop offset='1' stop-color='%235e3a10'/%3E%3C/linearGradient%3E%3CradialGradient id='inner' cx='58%25' cy='46%25' r='60%25'%3E%3Cstop offset='0' stop-color='%23fffef7'/%3E%3Cstop offset='0.3' stop-color='%23fff0bc'/%3E%3Cstop offset='0.7' stop-color='%23f0b84e'/%3E%3Cstop offset='1' stop-color='%238a5a18'/%3E%3C/radialGradient%3E%3CradialGradient id='bulb' cx='50%25' cy='50%25' r='55%25'%3E%3Cstop offset='0' stop-color='%23fffefa'/%3E%3Cstop offset='0.3' stop-color='%23fff6d4'/%3E%3Cstop offset='0.68' stop-color='%23ffe390' stop-opacity='0.6'/%3E%3Cstop offset='1' stop-color='%23f6c24a' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='brass' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%235c3f18'/%3E%3Cstop offset='0.32' stop-color='%23caa25a'/%3E%3Cstop offset='0.5' stop-color='%23f4e6ac'/%3E%3Cstop offset='0.68' stop-color='%23b58a3e'/%3E%3Cstop offset='1' stop-color='%234a3213'/%3E%3C/linearGradient%3E%3ClinearGradient id='brassV' x1='0' y1='0' x2='1' y2='0.3'%3E%3Cstop offset='0' stop-color='%234a3213'/%3E%3Cstop offset='0.4' stop-color='%23c8a05a'/%3E%3Cstop offset='0.55' stop-color='%23f6e6ac'/%3E%3Cstop offset='0.72' stop-color='%23a8813f'/%3E%3Cstop offset='1' stop-color='%233a2609'/%3E%3C/linearGradient%3E%3CradialGradient id='baseG' cx='40%25' cy='30%25' r='75%25'%3E%3Cstop offset='0' stop-color='%23f0d488'/%3E%3Cstop offset='0.45' stop-color='%23b98d42'/%3E%3Cstop offset='1' stop-color='%235c3f18'/%3E%3C/radialGradient%3E%3ClinearGradient id='cone' x1='0.4' y1='0' x2='0.7' y2='1'%3E%3Cstop offset='0' stop-color='%23ffeaa8' stop-opacity='0.5'/%3E%3Cstop offset='0.55' stop-color='%23ffe2a0' stop-opacity='0.12'/%3E%3Cstop offset='1' stop-color='%23ffe0a0' stop-opacity='0'/%3E%3C/linearGradient%3E%3CradialGradient id='cast' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0' stop-color='%233a2610' stop-opacity='0.5'/%3E%3Cstop offset='1' stop-color='%233a2610' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3C!-- volumetric cone from the shade mouth toward board centre --%3E%3Cpath d='M214 182 L300 372 L128 372 Z' fill='url(%23cone)'/%3E%3C!-- overall cast shadow on the cork --%3E%3Cellipse cx='118' cy='350' rx='120' ry='24' fill='url(%23cast)'/%3E%3C!-- weighted round base --%3E%3Cellipse cx='92' cy='352' rx='50' ry='11' fill='%233c2810' opacity='0.4'/%3E%3Cellipse cx='92' cy='347' rx='46' ry='12' fill='url(%23baseG)'/%3E%3Cellipse cx='92' cy='342' rx='34' ry='8' fill='%23d3b063'/%3E%3Cellipse cx='92' cy='339' rx='22' ry='4.6' fill='%23f2e0a2'/%3E%3Cellipse cx='83' cy='338' rx='9' ry='2' fill='%23fff6da' opacity='0.75'/%3E%3Cpath d='M80 340 Q92 330 104 340 L101 332 Q92 325 83 332 Z' fill='url(%23brass)'/%3E%3C!-- gooseneck brass arm --%3E%3Cpath d='M92 336 Q74 250 116 194 Q150 148 200 134' fill='none' stroke='url(%23brassV)' stroke-width='14' stroke-linecap='round'/%3E%3Cpath d='M92 336 Q74 252 116 196 Q150 150 198 136' fill='none' stroke='%23f6e6ac' stroke-width='3' stroke-linecap='round' opacity='0.8'/%3E%3Cpath d='M93 334 Q76 254 117 198' fill='none' stroke='%233a2609' stroke-width='2.2' stroke-linecap='round' opacity='0.4'/%3E%3C!-- lower joint --%3E%3Ccircle cx='116' cy='194' r='11' fill='url(%23brass)'/%3E%3Ccircle cx='116' cy='194' r='11' fill='none' stroke='%233a2609' stroke-width='1.4' opacity='0.5'/%3E%3Ccircle cx='112' cy='190' r='3.4' fill='%23faecb4'/%3E%3C!-- shade mount joint --%3E%3Ccircle cx='200' cy='134' r='9' fill='url(%23brass)'/%3E%3Ccircle cx='197' cy='131' r='2.8' fill='%23faecb4'/%3E%3C!-- SHADE: a proper tapered cone — narrow neck at top-left widening to an     elliptical mouth down-right. Interior glow, then hot bulb, then the outer     enamel body over the top so the mouth stays open at lower-right. --%3E%3Cellipse cx='210' cy='176' rx='42' ry='24' transform='rotate(40 210 176)' fill='url(%23inner)'/%3E%3Cellipse cx='208' cy='174' rx='17' ry='11' transform='rotate(40 208 174)' fill='url(%23bulb)'/%3E%3Ccircle cx='203' cy='168' r='3' fill='%23fffef8'/%3E%3Cpath d='M170 96 Q198 86 224 100 Q256 118 258 150 Q259 172 240 188 L232 178 Q216 158 190 146 Q168 136 158 118 Q152 102 170 96 Z' fill='url(%23enamel)'/%3E%3Cpath d='M232 178 Q248 168 254 150 Q256 172 240 188 Z' fill='url(%23enamelDk)' opacity='0.55'/%3E%3Cpath d='M166 108 Q188 94 220 106' fill='none' stroke='%23fff8dc' stroke-width='3' stroke-linecap='round' opacity='0.9'/%3E%3Cellipse cx='188' cy='120' rx='20' ry='11' transform='rotate(34 188 120)' fill='%23fff4d0' opacity='0.42'/%3E%3Cellipse cx='183' cy='115' rx='8' ry='4.4' transform='rotate(34 183 115)' fill='%23fffef7' opacity='0.8'/%3E%3C!-- static specular star-glint on the enamel hotspot (baked, L6-safe) --%3E%3Cg transform='translate(181 113)' fill='%23fffdf6'%3E%3Cpath d='M0 -11 Q1.4 -1.4 11 0 Q1.4 1.4 0 11 Q-1.4 1.4 -11 0 Q-1.4 -1.4 0 -11 Z' opacity='0.92'/%3E%3Ccircle r='2.4' fill='%23ffffff'/%3E%3C/g%3E%3Cpath d='M190 188 Q214 202 240 188' fill='none' stroke='%23e8cd84' stroke-width='4' stroke-linecap='round'/%3E%3Cpath d='M190 188 Q214 202 240 188' fill='none' stroke='%238a5e22' stroke-width='1.4' stroke-linecap='round' opacity='0.5'/%3E%3Ccircle cx='176' cy='94' r='5' fill='url(%23brass)'/%3E%3Ccircle cx='174' cy='92' r='1.6' fill='%23faecb4'/%3E%3C!-- warm bulb spill onto surrounding cork --%3E%3Cellipse cx='210' cy='180' rx='70' ry='54' fill='url(%23bulb)' opacity='0.36'/%3E%3C/svg%3E");
}

/* ═══ COFFEE MUG + MARKER JAR — the desk still life, lower-right,
   bottoms planted on the desk. A warm mug with a stripe and a soft
   rim highlight, a jar of markers with colored caps, warm rim light
   off the lamp, cast shadows. STATIC, promoted. */
head { display: var(--scrapbook-scenery, block); }
head::before {
  content: "";
  display: var(--scrapbook-scenery, block);
  position: fixed;
  right: 2vw;
  bottom: 2vh;
  width: 300px;
  height: 240px;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: contain;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 250'%3E %3Cdefs%3E %3ClinearGradient id='mug' x1='0' y1='0' x2='1' y2='0'%3E %3Cstop offset='0' stop-color='%23dcd3c2'/%3E%3Cstop offset='.22' stop-color='%23fbf7ee'/%3E%3Cstop offset='.5' stop-color='%23ece2cf'/%3E%3Cstop offset='.74' stop-color='%23cabda3'/%3E%3Cstop offset='1' stop-color='%239c8e73'/%3E %3C/linearGradient%3E %3ClinearGradient id='jar' x1='0' y1='0' x2='1' y2='0'%3E %3Cstop offset='0' stop-color='%23bcd7d3' stop-opacity='.5'/%3E%3Cstop offset='.22' stop-color='%23f2faf8' stop-opacity='.72'/%3E%3Cstop offset='.5' stop-color='%23cfe6e2' stop-opacity='.5'/%3E%3Cstop offset='.78' stop-color='%23eef7f5' stop-opacity='.62'/%3E%3Cstop offset='1' stop-color='%238fb0aa' stop-opacity='.48'/%3E %3C/linearGradient%3E %3CradialGradient id='coffee' cx='42%25' cy='38%25' r='62%25'%3E %3Cstop offset='0' stop-color='%237a5230'/%3E%3Cstop offset='.5' stop-color='%234a3018'/%3E%3Cstop offset='1' stop-color='%232c1c0d'/%3E %3C/radialGradient%3E %3CradialGradient id='cast2' cx='50%25' cy='50%25' r='50%25'%3E %3Cstop offset='0' stop-color='%233c2810' stop-opacity='.42'/%3E%3Cstop offset='1' stop-color='%233c2810' stop-opacity='0'/%3E %3C/radialGradient%3E %3C/defs%3E %3Cellipse cx='176' cy='230' rx='150' ry='20' fill='url(%23cast2)'/%3E %3Cellipse cx='100' cy='224' rx='58' ry='10' fill='%233c2810' opacity='.4'/%3E %3Cpath d='M148 150 q28 2 30 26 q-2 24 -30 26' fill='none' stroke='%23c9bda3' stroke-width='11'/%3E %3Cpath d='M148 152 q22 2 24 22 q-2 20 -24 22' fill='none' stroke='%23efe8d8' stroke-width='3' opacity='.6'/%3E %3Crect x='48' y='140' width='104' height='84' rx='9' fill='url(%23mug)'/%3E %3Crect x='48' y='166' width='104' height='13' fill='%23ef7a6b' opacity='.9'/%3E %3Crect x='48' y='162' width='104' height='2.4' fill='%237cc6ae' opacity='.85'/%3E %3Crect x='55' y='146' width='7' height='72' rx='3.5' fill='%23ffffff' opacity='.5'/%3E %3Crect x='140' y='150' width='4' height='64' rx='2' fill='%236b5f48' opacity='.35'/%3E %3Cellipse cx='100' cy='141' rx='52' ry='9' fill='%23e6dece'/%3E %3Cellipse cx='100' cy='141' rx='45' ry='7' fill='url(%23coffee)'/%3E %3C!-- warm lamp reflection gleaming on the coffee surface (static specular) --%3E%3Cellipse cx='84' cy='139' rx='15' ry='3.2' fill='%23c99a5e' opacity='.55'/%3E%3Cellipse cx='80' cy='138.4' rx='6' ry='1.5' fill='%23ffe6b0' opacity='.75'/%3E %3C!-- crisp specular pip on the ceramic rim (static) --%3E%3Ccircle cx='60' cy='142' r='2' fill='%23fffdf2' opacity='.85'/%3E %3Cpath d='M62 139 q38 -7 76 0' fill='none' stroke='%23a9825a' stroke-width='2.4' opacity='.55'/%3E %3Cellipse cx='86' cy='139' rx='16' ry='2.6' fill='%23c9a06e' opacity='.6'/%3E %3Cpath d='M84 128 q-5 -10 2 -20 q5 -8 0 -16' fill='none' stroke='%23efe8d8' stroke-width='2.4' stroke-linecap='round' opacity='.28'/%3E %3Cpath d='M104 126 q5 -9 -1 -18 q-4 -7 1 -14' fill='none' stroke='%23efe8d8' stroke-width='2.2' stroke-linecap='round' opacity='.22'/%3E %3Cellipse cx='234' cy='226' rx='52' ry='9' fill='%233c2810' opacity='.4'/%3E %3Cpath d='M196 118 L200 218 q0 8 34 8 q34 0 34 -8 L272 118 Z' fill='url(%23jar)'/%3E %3Crect x='210' y='126' width='5' height='92' rx='2.5' fill='%23ffffff' opacity='.42'/%3E %3Crect x='248' y='128' width='7' height='88' rx='3.5' fill='%23ffffff' opacity='.3'/%3E %3Crect x='236' y='130' width='3' height='84' rx='1.5' fill='%238fb0aa' opacity='.35'/%3E %3Crect x='194' y='110' width='80' height='12' rx='5' fill='%23cfe3df' opacity='.72'/%3E %3Crect x='198' y='112' width='30' height='4' rx='2' fill='%23ffffff' opacity='.5'/%3E %3Cg stroke-linecap='round'%3E %3Cpath d='M214 116 L206 58' stroke='%232c3a44' stroke-width='9'/%3E%3Cpath d='M206 58 l0 -12' stroke='%23ef7a6b' stroke-width='9'/%3E%3Cpath d='M212 114 L205 62' stroke='%234a5a66' stroke-width='2' opacity='.8'/%3E%3Cellipse cx='204' cy='47' rx='2.2' ry='2.6' fill='%23ffd8cf' opacity='.85'/%3E %3Cpath d='M234 116 L236 50' stroke='%232c3a44' stroke-width='9'/%3E%3Cpath d='M236 50 l0 -12' stroke='%237cc6ae' stroke-width='9'/%3E%3Cpath d='M233 114 L235 54' stroke='%234a5a66' stroke-width='2' opacity='.8'/%3E%3Cellipse cx='235' cy='39' rx='2.2' ry='2.6' fill='%23d4f0e6' opacity='.85'/%3E %3Cpath d='M252 116 L262 64' stroke='%232c3a44' stroke-width='9'/%3E%3Cpath d='M262 64 l3 -11' stroke='%23f4c430' stroke-width='9'/%3E%3Cpath d='M251 114 L260 68' stroke='%234a5a66' stroke-width='2' opacity='.8'/%3E%3Cellipse cx='264' cy='54' rx='2.2' ry='2.6' fill='%23fff0b8' opacity='.85'/%3E %3Cpath d='M224 118 L222 44' stroke='%232c3a44' stroke-width='9'/%3E%3Cpath d='M222 44 l0 -12' stroke='%23c0392b' stroke-width='9'/%3E%3Cpath d='M222 116 L221 48' stroke='%234a5a66' stroke-width='2' opacity='.8'/%3E%3Cellipse cx='221' cy='33' rx='2.2' ry='2.6' fill='%23f7b8b0' opacity='.85'/%3E %3C/g%3E %3C/svg%3E");
}

/* ═══ a LOOSE SNAPSHOT + TICKET STUB slid into the lower-left corner —
   foreground desk dressing so the board has stuff resting in front of
   it. A tilted instant photo (a little out of frame) and a torn
   concert ticket, warm rim light, cast shadows. STATIC, promoted. */
head::after {
  content: "";
  display: var(--scrapbook-scenery, block);
  position: fixed;
  left: 1.5vw;
  bottom: -3vh;
  width: 280px;
  height: 230px;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  background-repeat: no-repeat;
  background-position: left bottom;
  background-size: contain;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 240'%3E %3Cdefs%3E %3ClinearGradient id='snap' x1='0' y1='0' x2='.2' y2='1'%3E %3Cstop offset='0' stop-color='%23fffdf7'/%3E%3Cstop offset='1' stop-color='%23e6ddca'/%3E %3C/linearGradient%3E %3ClinearGradient id='nsky' x1='0' y1='0' x2='0' y2='1'%3E %3Cstop offset='0' stop-color='%2320304e'/%3E%3Cstop offset='.5' stop-color='%233d4a68'/%3E%3Cstop offset='1' stop-color='%238a6f7a'/%3E %3C/linearGradient%3E %3ClinearGradient id='nsea' x1='0' y1='0' x2='0' y2='1'%3E %3Cstop offset='0' stop-color='%2357506a'/%3E%3Cstop offset='1' stop-color='%23242034'/%3E %3C/linearGradient%3E %3CradialGradient id='moon' cx='50%25' cy='50%25' r='50%25'%3E %3Cstop offset='0' stop-color='%23fff7e0'/%3E%3Cstop offset='.55' stop-color='%23ffeec2'/%3E%3Cstop offset='1' stop-color='%23ffeec2' stop-opacity='0'/%3E %3C/radialGradient%3E %3ClinearGradient id='sgl' x1='0' y1='0' x2='1' y2='1'%3E %3Cstop offset='0' stop-color='%23fff' stop-opacity='.45'/%3E%3Cstop offset='.35' stop-color='%23fff' stop-opacity='0'/%3E %3C/linearGradient%3E %3CradialGradient id='cast3' cx='50%25' cy='50%25' r='50%25'%3E %3Cstop offset='0' stop-color='%233c2810' stop-opacity='.42'/%3E%3Cstop offset='1' stop-color='%233c2810' stop-opacity='0'/%3E %3C/radialGradient%3E %3C/defs%3E %3Cellipse cx='150' cy='214' rx='140' ry='24' fill='url(%23cast3)'/%3E %3Cg transform='rotate(-9 120 150)'%3E %3Crect x='40' y='96' width='150' height='150' rx='4' fill='url(%23snap)'/%3E %3Crect x='52' y='108' width='126' height='96' fill='url(%23nsky)'/%3E %3Ccircle cx='150' cy='140' r='24' fill='url(%23moon)'/%3E %3Ccircle cx='150' cy='140' r='9' fill='%23fffdf0'/%3E %3Crect x='52' y='158' width='126' height='46' fill='url(%23nsea)'/%3E %3Cpath d='M142 158 h16 l6 46 h-28 Z' fill='%23ffeec2' opacity='.32'/%3E %3Cpath d='M52 160 q30 -4 62 2 q34 5 64 -1 l0 6 q-30 5 -64 0 q-32 -5 -62 -1 Z' fill='%237d7488' opacity='.5'/%3E %3Crect x='52' y='108' width='126' height='96' fill='url(%23sgl)' opacity='.5'/%3E %3C/g%3E %3Cg transform='rotate(6 210 176)'%3E %3Crect x='150' y='150' width='140' height='52' rx='4' fill='%23f6ecd2'/%3E %3Crect x='150' y='150' width='34' height='52' rx='4' fill='%23ef7a6b'/%3E %3Cline x1='184' y1='150' x2='184' y2='202' stroke='%23c9612f' stroke-width='2' stroke-dasharray='3 4'/%3E %3Ctext x='167' y='182' font-family='monospace' font-size='16' fill='%23fbeede' text-anchor='middle' font-weight='bold'%3E51%3C/text%3E %3Crect x='196' y='162' width='84' height='6' rx='3' fill='%23c7a15c'/%3E %3Crect x='196' y='176' width='68' height='5' rx='2.5' fill='%23c7a15c' opacity='.7'/%3E %3Crect x='196' y='187' width='54' height='5' rx='2.5' fill='%23c7a15c' opacity='.5'/%3E %3C/g%3E %3C/svg%3E");
}

/* ═══ extra prop layers: the two <meta> void elements render nothing
   themselves but their fixed pseudos are free canvases. ═══ */
head meta { display: var(--scrapbook-scenery, block); }

/* ═══ THE CORK GRAIN — the board's real pressed-granule texture. A
   single feDiffuseLighting bump-map baked over multi-octave fractal
   noise gives chunky compressed cork granules with genuine relief:
   dark pits, light raised bumps, all lit from the upper-left to agree
   with the lamp (azimuth 235°). A low-frequency tone layer paints
   warm-roast patches between the granules so the field never reads as
   a flat repeat, and a whisper of fine grain keeps it from going
   plastic. Tiled at 560px so the repeat is invisible at board scale;
   two huge soft tonal drifts (>=520px, low alpha) further hide the
   seam. STATIC promoted layer — the crawl never slides against it
   (names ride opaque polaroids, not bare cork) and the lane scrim
   quiets the centre, so this rich granule reads without tripping L6.
   The cork data-URI is ONE unbroken line. */
head meta:first-of-type::before {
  content: "";
  display: var(--scrapbook-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -3;
  pointer-events: none;
  opacity: 0.9;
  transform: translateZ(0);
  background-image:
    /* used-board character — a scatter of old pin-holes, ghost tape-
       residue patches and faint pencil ticks, placed at fixed off-lane
       spots (never tiled, never over the centre text lane) so the board
       reads as WELL-USED rather than a blank field. STATIC, low-alpha. */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080' preserveAspectRatio='xMidYMid slice'%3E%3Cg opacity='0.5'%3E%3Cg%3E%3Ccircle cx='300' cy='470' r='3.2' fill='%233a2510'/%3E%3Ccircle cx='299' cy='469' r='1.4' fill='%23e6c890' opacity='0.5'/%3E%3Ccircle cx='1650' cy='360' r='3' fill='%233a2510'/%3E%3Ccircle cx='1649' cy='359' r='1.3' fill='%23e6c890' opacity='0.5'/%3E%3Ccircle cx='470' cy='820' r='3.4' fill='%233a2510'/%3E%3Ccircle cx='469' cy='819' r='1.5' fill='%23e6c890' opacity='0.5'/%3E%3Ccircle cx='1480' cy='880' r='3' fill='%233a2510'/%3E%3Ccircle cx='1479' cy='879' r='1.3' fill='%23e6c890' opacity='0.5'/%3E%3Ccircle cx='1560' cy='620' r='2.8' fill='%233a2510'/%3E%3Ccircle cx='1559' cy='619' r='1.2' fill='%23e6c890' opacity='0.5'/%3E%3Ccircle cx='360' cy='640' r='2.8' fill='%233a2510'/%3E%3Ccircle cx='359' cy='639' r='1.2' fill='%23e6c890' opacity='0.5'/%3E%3Ccircle cx='1230' cy='540' r='3' fill='%233a2510'/%3E%3Ccircle cx='1229' cy='539' r='1.3' fill='%23e6c890' opacity='0.5'/%3E%3Ccircle cx='1380' cy='680' r='2.6' fill='%233a2510'/%3E%3Ccircle cx='1379' cy='679' r='1.1' fill='%23e6c890' opacity='0.5'/%3E%3Ccircle cx='1520' cy='500' r='2.6' fill='%233a2510'/%3E%3Ccircle cx='1519' cy='499' r='1.1' fill='%23e6c890' opacity='0.5'/%3E%3C/g%3E%3C!-- a faint ghost coffee-ring, off the lane on the mid-right --%3E%3Ccircle cx='1400' cy='560' r='58' fill='none' stroke='%235a3c1c' stroke-width='6' opacity='0.09'/%3E%3Ccircle cx='1400' cy='560' r='52' fill='none' stroke='%236a4a24' stroke-width='2.5' opacity='0.07'/%3E%3Crect x='1600' y='470' width='70' height='26' rx='3' fill='%236a4a24' opacity='0.14' transform='rotate(-8 1635 483)'/%3E%3Crect x='300' y='720' width='60' height='22' rx='3' fill='%236a4a24' opacity='0.12' transform='rotate(6 330 731)'/%3E%3Crect x='1280' y='770' width='64' height='22' rx='3' fill='%236a4a24' opacity='0.1' transform='rotate(-5 1312 781)'/%3E%3Cpath d='M1620 760 l24 -6' stroke='%234a3418' stroke-width='1.6' stroke-linecap='round' opacity='0.3'/%3E%3Cpath d='M300 380 l18 4' stroke='%234a3418' stroke-width='1.4' stroke-linecap='round' opacity='0.28'/%3E%3Cpath d='M1250 640 l20 3' stroke='%234a3418' stroke-width='1.4' stroke-linecap='round' opacity='0.24'/%3E%3C/g%3E%3C/svg%3E"),
    /* macro tone drift — huge soft roast/honey zones that break the
       560px cork tile's repeat so the board never grids up */
    radial-gradient(ellipse 620px 540px at 12% 22%, rgba(214, 172, 112, 0.16), rgba(214, 172, 112, 0) 70%),
    radial-gradient(ellipse 680px 600px at 82% 74%, rgba(74, 48, 22, 0.18), rgba(74, 48, 22, 0) 72%),
    /* the pressed-granule cork itself — two-scale granule relief: soft
       mounds (low-freq bump) multiplied with a finer chip speckle, both
       lit from the upper-left to agree with the lamp, then warm-roast
       granule patches composited in for colour life. Reads as real
       pressed cork / warm kraft board, never crumbly stucco. */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='520' height='520'%3E%3Cdefs%3E%3Cfilter id='k' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.022 0.024' numOctaves='2' seed='7' stitchTiles='stitch' result='mound'/%3E%3CfeColorMatrix in='mound' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 3 -1.1' result='h1'/%3E%3CfeDiffuseLighting in='h1' surfaceScale='2' diffuseConstant='1.05' lighting-color='%23e8c489' result='lit1'%3E%3CfeDistantLight azimuth='235' elevation='60'/%3E%3C/feDiffuseLighting%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.13 0.14' numOctaves='2' seed='19' stitchTiles='stitch' result='chip'/%3E%3CfeColorMatrix in='chip' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2.2 -0.9' result='h2'/%3E%3CfeDiffuseLighting in='h2' surfaceScale='0.85' diffuseConstant='1' lighting-color='%23dcb677' result='lit2'%3E%3CfeDistantLight azimuth='235' elevation='55'/%3E%3C/feDiffuseLighting%3E%3CfeBlend in='lit2' in2='lit1' mode='multiply' result='corkgray'/%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.07 0.078' numOctaves='3' seed='5' stitchTiles='stitch' result='tone'/%3E%3CfeColorMatrix in='tone' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0' result='toneA'/%3E%3CfeFlood flood-color='%239a6a26' result='dk'/%3E%3CfeComposite in='dk' in2='toneA' operator='in' result='patch'/%3E%3CfeComposite in='patch' in2='corkgray' operator='over' result='tinted'/%3E%3CfeColorMatrix in='tinted' type='matrix' values='0.98 0 0 0 0 0 0.75 0 0 0 0 0 0.45 0 0 0 0 0 0.9 0'/%3E%3C/filter%3E%3C/defs%3E%3Crect width='520' height='520' fill='%23c2954f'/%3E%3Crect width='520' height='520' filter='url(%23k)'/%3E%3C/svg%3E");
  background-size: 100% 100%, 100% 100%, 100% 100%, 520px 520px;
}

/* ═══ a scatter of loose PUSH-PINS + a paper clip resting in the
   top-right corner — spare pins waiting to be used, well off the lane.
   STATIC, promoted. */
head meta:first-of-type::after {
  content: "";
  display: var(--scrapbook-scenery, block);
  position: fixed;
  right: 3vw;
  top: 4vh;
  width: 150px;
  height: 120px;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 128'%3E%3Cdefs%3E%3CradialGradient id='pinR' cx='36%25' cy='30%25' r='70%25'%3E%3Cstop offset='0' stop-color='%23ffb3a6'/%3E%3Cstop offset='.5' stop-color='%23ef7a6b'/%3E%3Cstop offset='1' stop-color='%23a83f31'/%3E%3C/radialGradient%3E%3CradialGradient id='pinM' cx='36%25' cy='30%25' r='70%25'%3E%3Cstop offset='0' stop-color='%23bdeadb'/%3E%3Cstop offset='.5' stop-color='%237cc6ae'/%3E%3Cstop offset='1' stop-color='%233f8570'/%3E%3C/radialGradient%3E%3CradialGradient id='pinG' cx='36%25' cy='30%25' r='70%25'%3E%3Cstop offset='0' stop-color='%23ffe79a'/%3E%3Cstop offset='.5' stop-color='%23f4c430'/%3E%3Cstop offset='1' stop-color='%23a37c10'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='42' cy='52' rx='16' ry='5' fill='%233c2810' opacity='.3'/%3E%3Ccircle cx='40' cy='44' r='13' fill='url(%23pinR)'/%3E%3Cellipse cx='35' cy='39' rx='4' ry='3' fill='%23fff' opacity='.6'/%3E%3Ccircle cx='34' cy='38' r='1.6' fill='%23ffffff'/%3E%3Ccircle cx='40' cy='44' r='4.5' fill='%23882f24'/%3E%3Cellipse cx='106' cy='84' rx='16' ry='5' fill='%233c2810' opacity='.3'/%3E%3Ccircle cx='104' cy='76' r='13' fill='url(%23pinM)'/%3E%3Cellipse cx='99' cy='71' rx='4' ry='3' fill='%23fff' opacity='.6'/%3E%3Ccircle cx='98' cy='70' r='1.6' fill='%23ffffff'/%3E%3Ccircle cx='104' cy='76' r='4.5' fill='%232f6151'/%3E%3Cellipse cx='120' cy='34' rx='13' ry='4' fill='%233c2810' opacity='.28'/%3E%3Ccircle cx='118' cy='28' r='11' fill='url(%23pinG)'/%3E%3Cellipse cx='114' cy='24' rx='3.5' ry='2.6' fill='%23fff' opacity='.6'/%3E%3Ccircle cx='113' cy='23' r='1.4' fill='%23ffffff'/%3E%3Ccircle cx='118' cy='28' r='4' fill='%23806010'/%3E%3Cpath d='M40 96 q-14 -4 -14 -16 q0 -12 12 -12 q10 0 10 10 l0 14 q0 6 6 6 q6 0 6 -8 l0 -18' fill='none' stroke='%23b9c2c8' stroke-width='3.4' stroke-linecap='round'/%3E%3Cpath d='M40 95 q-12 -4 -12 -14' fill='none' stroke='%23eef2f4' stroke-width='1.2' stroke-linecap='round' opacity='.7'/%3E%3Ccircle cx='27' cy='66' r='1.6' fill='%23ffffff' opacity='.9'/%3E%3C/svg%3E");
}

/* ═══ the TWINE REEL + a torn washi roll parked top-left under the
   lamp — the supply corner, so the strung twine has a source. A wooden
   spool wound with red baker's twine and a fat roll of coral washi
   tape. STATIC, promoted. */
head meta:last-of-type::before {
  content: "";
  display: var(--scrapbook-scenery, block);
  position: fixed;
  left: 15vw;
  top: 3vh;
  width: 160px;
  height: 120px;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0) rotate(-5deg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 170 130'%3E%3Cdefs%3E%3ClinearGradient id='spool' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23caa262'/%3E%3Cstop offset='1' stop-color='%238a6636'/%3E%3C/linearGradient%3E%3ClinearGradient id='wash' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23ff9d90'/%3E%3Cstop offset='1' stop-color='%23d6584a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cellipse cx='58' cy='112' rx='44' ry='9' fill='%233c2810' opacity='.32'/%3E%3Crect x='22' y='34' width='10' height='72' rx='3' fill='url(%23spool)'/%3E%3Crect x='86' y='34' width='10' height='72' rx='3' fill='url(%23spool)'/%3E%3Cellipse cx='27' cy='34' rx='5' ry='11' fill='%23b89055'/%3E%3Cellipse cx='91' cy='34' rx='5' ry='11' fill='%23b89055'/%3E%3Crect x='30' y='48' width='58' height='46' rx='4' fill='%23c0392b'/%3E%3Cg stroke='%23e8695c' stroke-width='2' opacity='.7'%3E%3Cpath d='M30 54 L88 54 M30 62 L88 62 M30 70 L88 70 M30 78 L88 78 M30 86 L88 86'/%3E%3C/g%3E%3Cg stroke='%23fff' stroke-width='1' opacity='.35'%3E%3Cpath d='M30 50 L88 50 M30 58 L88 58 M30 66 L88 66 M30 74 L88 74 M30 82 L88 82 M30 90 L88 90'/%3E%3C/g%3E%3Cpath d='M88 66 q22 -6 40 4' fill='none' stroke='%23c0392b' stroke-width='2.4' stroke-linecap='round'/%3E%3Cellipse cx='134' cy='86' rx='30' ry='30' fill='url(%23wash)'/%3E%3Cellipse cx='134' cy='86' rx='30' ry='30' fill='none' stroke='%23fff' stroke-width='3' stroke-dasharray='5 5' opacity='.5'/%3E%3Cellipse cx='134' cy='86' rx='13' ry='13' fill='%23eadfca'/%3E%3Cellipse cx='134' cy='86' rx='13' ry='13' fill='none' stroke='%23b89f77' stroke-width='2'/%3E%3Cpath d='M164 86 l14 3 l-2 8 l-13 -4 Z' fill='url(%23wash)'/%3E%3C/svg%3E");
}

/* ═══ a DANGLING PHOTO swinging gently on its pin, top-right — the
   ONLY continuous mover (small box, will-change budget: 1). A single
   instant photo pinned at its top corner, rocking a couple of degrees
   like a draft caught it. transform-origin at the pin so it pivots. */
head meta:last-of-type::after {
  content: "";
  display: var(--scrapbook-scenery, block);
  position: fixed;
  right: 8vw;
  top: 0;
  width: 118px;
  height: 168px;
  z-index: 0;
  pointer-events: none;
  transform-origin: 76% 8px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 130 184'%3E %3Cdefs%3E %3ClinearGradient id='dp' x1='0' y1='0' x2='.3' y2='1'%3E %3Cstop offset='0' stop-color='%23fffdf7'/%3E%3Cstop offset='1' stop-color='%23e4dbc6'/%3E %3C/linearGradient%3E %3ClinearGradient id='dsky' x1='0' y1='0' x2='0' y2='1'%3E %3Cstop offset='0' stop-color='%234a4a72'/%3E%3Cstop offset='.45' stop-color='%23b06c72'/%3E %3Cstop offset='.7' stop-color='%23e0955f'/%3E%3Cstop offset='1' stop-color='%23f2c078'/%3E %3C/linearGradient%3E %3CradialGradient id='dsun' cx='60%25' cy='74%25' r='45%25'%3E %3Cstop offset='0' stop-color='%23fff2cf'/%3E%3Cstop offset='.4' stop-color='%23ffd89a' stop-opacity='.7'/%3E%3Cstop offset='1' stop-color='%23ffd89a' stop-opacity='0'/%3E %3C/radialGradient%3E %3CradialGradient id='pinT' cx='36%25' cy='30%25' r='70%25'%3E %3Cstop offset='0' stop-color='%23ffe79a'/%3E%3Cstop offset='.5' stop-color='%23f4c430'/%3E%3Cstop offset='1' stop-color='%23a37c10'/%3E %3C/radialGradient%3E %3ClinearGradient id='dgl' x1='0' y1='0' x2='1' y2='1'%3E %3Cstop offset='0' stop-color='%23fff' stop-opacity='.5'/%3E%3Cstop offset='.3' stop-color='%23fff' stop-opacity='0'/%3E %3C/linearGradient%3E %3C/defs%3E %3Cg transform='translate(6 14)'%3E %3Crect x='8' y='6' width='102' height='120' rx='4' fill='url(%23dp)'/%3E %3Crect x='18' y='16' width='82' height='72' fill='url(%23dsky)'/%3E %3Ccircle cx='66' cy='68' r='30' fill='url(%23dsun)'/%3E %3Cpath d='M18 60 Q40 50 62 58 T100 56 L100 88 L18 88 Z' fill='%236a5a6e' opacity='.8'/%3E %3Cpath d='M18 70 Q46 62 74 70 T100 68 L100 88 L18 88 Z' fill='%232c2230'/%3E %3Crect x='18' y='16' width='82' height='72' fill='url(%23dgl)' opacity='.5'/%3E %3Cpath d='M22 104 q26 -7 62 0' fill='none' stroke='%23b6613f' stroke-width='3' stroke-linecap='round' opacity='.75'/%3E %3Cpath d='M22 112 q20 -4 44 0' fill='none' stroke='%23c98a66' stroke-width='2' stroke-linecap='round' opacity='.55'/%3E %3C/g%3E %3Ccircle cx='99' cy='16' r='11' fill='url(%23pinT)'/%3E %3Cellipse cx='95' cy='12' rx='3.4' ry='2.6' fill='%23fff' opacity='.6'/%3E %3Ccircle cx='99' cy='16' r='3.8' fill='%23806010'/%3E %3C/svg%3E");
  will-change: transform;
  animation: scrapbook-swing 6.5s ease-in-out infinite;
}

/* ═══ warm lamp dust — three huge soft motes drifting in the light.
   Viewport-sized, so motion is steps(1, end): one hop every 5s (far
   under the 5 hops/s cap). Box overscans 20vw so hops never expose an
   edge. Coarse and low-alpha — cannot flicker. */
body::before {
  content: "";
  display: var(--scrapbook-scenery, block);
  position: fixed;
  top: 0;
  bottom: 0;
  left: -20vw;
  right: -20vw;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(ellipse 30vw 12vh at 30% 30%, rgba(255, 226, 172, 0.06), rgba(255, 226, 172, 0) 70%),
    radial-gradient(ellipse 36vw 13vh at 64% 52%, rgba(255, 220, 168, 0.05), rgba(255, 220, 168, 0) 72%),
    radial-gradient(ellipse 26vw 10vh at 46% 74%, rgba(240, 208, 158, 0.045), rgba(240, 208, 158, 0) 70%);
  animation: scrapbook-dust 40s steps(1, end) infinite;
}

/* ═══ the lane: names on the polaroids read over cork and light, so
   the center column gets a quiet warm-dark scrim — coarse, soft,
   STATIC. Fades before the lamp corner keeps its glow. */
body::after {
  content: "";
  display: var(--scrapbook-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background: linear-gradient(90deg,
    rgba(52, 34, 15, 0) 10%, rgba(52, 34, 15, 0.24) 30%, rgba(52, 34, 15, 0.34) 50%,
    rgba(52, 34, 15, 0.24) 70%, rgba(52, 34, 15, 0) 90%);
}

/* ═══ fine cork fibre print — a REAL fractal-noise cork granule field
   (feTurbulence fBm, warm-dark, low alpha) plus a few pale/dark granule
   pops. This is the only fine pattern in the theme, so it RIDES THE ROLL
   (moves lockstep with tracked glyphs = zero subpixel beat = zero
   flicker, L6). z:-1 keeps it behind the polaroids inside the roll's own
   stacking context. The turbulence tile is one unbroken data-URI line. */
.credits-roll::before,
.credits-slideshow::before {
  content: "";
  display: var(--scrapbook-scenery, block);
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.42;
  background-image:
    radial-gradient(circle at 24% 34%, rgba(96, 66, 30, 0.5) 0 1.4px, rgba(96, 66, 30, 0) 2.6px),
    radial-gradient(circle at 72% 16%, rgba(226, 192, 140, 0.42) 0 1.2px, rgba(226, 192, 140, 0) 2.4px),
    radial-gradient(circle at 54% 74%, rgba(90, 60, 26, 0.44) 0 1.3px, rgba(90, 60, 26, 0) 2.4px),
    radial-gradient(circle at 12% 82%, rgba(228, 194, 142, 0.36) 0 1px, rgba(228, 194, 142, 0) 2px),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='c' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85 0.5' numOctaves='4' seed='11' stitchTiles='stitch' result='n'/%3E%3CfeColorMatrix in='n' type='matrix' values='0 0 0 0 0.32  0 0 0 0 0.21  0 0 0 0 0.10  0 0 0 0.7 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23c)'/%3E%3C/svg%3E");
  background-size: 84px 84px, 68px 68px, 96px 96px, 74px 74px, 200px 200px;
}

/* ═══ POLAROID anatomy: each credits BLOCK is an instant photo ═══ */

/* alternating tilt down the roll (content-agnostic nth-of-type) so the
   board feels hand-pinned, never gridded. Washi tape hue cycles coral,
   mint, gold; and the developed PHOTO each polaroid holds cycles through
   three distinct memories (dusk hills / forest dawn / golden sea) so no
   two neighbours show the same snapshot. Intro is section 1, first
   block = 3n+2. */
.credits-block:nth-of-type(3n + 2),
.credits-slide:nth-of-type(3n + 2) { --sb-tilt: -2.4deg; --sb-tape: var(--sb-coral); --sb-tape-hi: #ffb0a4; --sb-photo: var(--sb-photo-b); }
.credits-block:nth-of-type(3n),
.credits-slide:nth-of-type(3n)     { --sb-tilt: 2deg;    --sb-tape: var(--sb-mint);  --sb-tape-hi: #bdeadb; --sb-photo: var(--sb-photo-c); }
.credits-block:nth-of-type(3n + 1),
.credits-slide:nth-of-type(3n + 1) { --sb-tilt: -1.4deg; --sb-tape: var(--sb-gold);  --sb-tape-hi: #ffe79a; }

/* the polaroid frame: a thick warm-white frame with the classic tall
   bottom lip, a soft paper sheen, and a real dropped shadow onto the
   cork. It is a block-local panel — it rides the roll, so the shadow
   moves WITH the names (no flicker).

   Scroll mode: the whole .credits-block IS the card (an in-flow block).
   Slideshow mode: the base .credits-slide is a full-viewport absolutely
   positioned centering flex box — so we DON'T touch the slide (touching
   its position pulls every slide into a shrinking row-flex). Instead the
   inner .credits-block__list becomes the card there (see the __list rule,
   which is width-capped and centered). This keeps the frame identical in
   both modes. */
.credits-roll .credits-block {
  position: relative;
  box-sizing: border-box;
  width: min(30rem, 84vw);
  margin: 0 auto;
  padding: 1.5rem 1.4rem 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background:
    /* fine paper fibre so the frame reads as pressed card, not plastic —
       rides the roll with the card, so its grain is L6-safe */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='p' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7 0.9' numOctaves='3' seed='5' stitchTiles='stitch' result='n'/%3E%3CfeColorMatrix in='n' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23p)'/%3E%3C/svg%3E"),
    /* a soft diagonal sheen band raking across the frame (glossy card) */
    linear-gradient(122deg, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0.5) 44%, rgba(255, 255, 255, 0.08) 52%, rgba(255, 255, 255, 0) 64%),
    /* the classic top-left corner catch-light */
    linear-gradient(158deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 20%),
    /* warm-white card stock with a faint cool cast toward the shadowed
       lower-right, so the frame has volume rather than a flat fill */
    linear-gradient(150deg, #fffdf7 0%, #f9f3e6 46%, #efe6d2 78%, #e6dcc6 100%);
  background-size: 220px 220px, cover, cover, cover;
  border-radius: 3px;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.75) inset,
    0 0 0 1px rgba(120, 90, 48, 0.12),
    0 14px 26px rgba(52, 34, 14, 0.42),
    0 3px 8px rgba(52, 34, 14, 0.3);
  transform: rotate(var(--sb-tilt, -1.5deg));
}

/* the photo mat: a REAL developed instant-photo the polaroid holds — a
   dusk landscape (graded sky, sun bloom, three hill ranges with
   atmospheric perspective, chemical vignette + film grain) baked as a
   data-URI, framed in warm white. Over the scene sit a readability scrim
   (so cream names hold against the sky's warm band), a soft top gloss,
   and an inset border. The scene rides the roll inside the list, so its
   grain is L6-safe. Data-URI is ONE unbroken line. */
.credits-block__list {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 1.15rem 1.1rem 1.25rem;
  background:
    /* readability scrim: darken the middle band where names land, ease
       off top/bottom so the sky-warmth and hill-dark still read */
    linear-gradient(180deg, rgba(14, 16, 26, 0.42) 0%, rgba(14, 16, 26, 0.14) 24%, rgba(14, 16, 26, 0.26) 52%, rgba(10, 10, 20, 0.5) 100%),
    /* glossy instant-film sheen: a soft diagonal light-streak raking the
       top-left of the print, like glass catching the lamp — kept low so
       names stay legible */
    linear-gradient(128deg, rgba(255, 255, 255, 0) 26%, rgba(255, 255, 255, 0.14) 38%, rgba(255, 255, 255, 0.03) 46%, rgba(255, 255, 255, 0) 58%),
    /* chemical corner vignette on top of the print */
    radial-gradient(ellipse 140% 120% at 50% 46%, rgba(8, 8, 16, 0) 54%, rgba(8, 8, 16, 0.42) 100%),
    /* soft developed-photo top gloss */
    radial-gradient(ellipse 120% 70% at 34% 4%, rgba(255, 236, 200, 0.16), rgba(255, 236, 200, 0) 52%),
    /* the photograph itself — cycled per block via --sb-photo so
       consecutive cards hold DIFFERENT memories (dusk hills / forest
       dawn / golden sea), like a real strung-up strip of snapshots */
    var(--sb-photo);
  background-size: auto, cover, auto, auto, cover;
  background-position: center, center, center, center, center 42%;
  border-radius: 2px;
  box-shadow:
    0 0 0 1px rgba(20, 30, 40, 0.55) inset,
    0 2px 8px rgba(10, 14, 22, 0.5) inset;
  display: flex;
  flex-direction: column;
  gap: var(--credits-name-gap);
}

/* Slideshow: the base .credits-slide is a full-viewport centering flex
   box — leave its position alone. Here the LIST becomes the whole
   polaroid: the dark mat wrapped in a thick warm-white border with the
   classic tall bottom lip, width-capped and centered by the slide. */
.credits-slideshow .credits-block__list {
  box-sizing: border-box;
  width: min(30rem, 84vw);
  margin: 0 auto;
  border: 0.95rem solid #fbf6ea;
  border-bottom-width: 2.4rem;
  border-radius: 4px;
  box-shadow:
    0 0 0 1px rgba(20, 30, 40, 0.5) inset,
    0 2px 6px rgba(20, 28, 38, 0.4) inset,
    0 16px 30px rgba(52, 34, 14, 0.45),
    0 3px 8px rgba(52, 34, 14, 0.32);
  transform: rotate(var(--sb-tilt, -1.5deg));
}

/* the handwritten caption: the block title inked in marker on the
   polaroid's bottom lip, sitting below the photo mat. Caveat, tipped a
   touch, in ballpoint midnight. The base gold rule is dropped. */
.credits-block__title {
  order: 2; /* not needed on the block, kept simple */
  margin: 0.7rem 0 0.35rem;
  padding: 0;
  font-family: var(--credits-title-font);
  font-weight: 700;
  font-size: var(--credits-title-size);
  line-height: 1;
  letter-spacing: 0.01em;
  text-transform: none;
  color: var(--sb-ink);
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  transform: rotate(-1.2deg);
}
/* a hand-drawn felt-tip underline under the caption — a double marker
   swoosh (tapered, slightly wavy, ends lifting off the paper) rather
   than a flat UI bar. Inked in twine-red, the desk's signature pen. */
.credits-block__title::after {
  content: "";
  display: block;
  width: 4.6rem;
  height: 0.7rem;
  margin: 0.12rem auto 0;
  /* background-color MUST be cleared: the base rule sets
     background:var(--credits-accent) (a solid red fill) which this
     longhand image alone would not override — leaving a red bar behind
     the marker strokes. */
  background-color: transparent;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='18' viewBox='0 0 120 18'%3E%3Cpath d='M6 8 Q40 3 74 6 Q98 8 114 5' fill='none' stroke='%23c0392b' stroke-width='3.4' stroke-linecap='round' opacity='.92'/%3E%3Cpath d='M10 12 Q44 9 78 11 Q96 12 108 10' fill='none' stroke='%23d6584a' stroke-width='2' stroke-linecap='round' opacity='.6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  opacity: 1;
  transform: rotate(-0.8deg);
}

/* the tape strip: a short piece of candy-striped washi holding the
   photo to the board, slapped over the top edge at a jaunty angle.
   Scroll: on the block. Slideshow: on the list (the card there). */
.credits-roll .credits-block::before,
.credits-slideshow .credits-block__list::before {
  content: "";
  display: var(--scrapbook-scenery, block);
  position: absolute;
  top: -0.85rem;
  left: 50%;
  width: 5.5rem;
  height: 1.7rem;
  z-index: 3;
  pointer-events: none;
  background:
    repeating-linear-gradient(48deg, var(--sb-tape, var(--sb-coral)) 0 8px, var(--sb-tape-hi, #ffb0a4) 8px 16px);
  opacity: 0.82;
  box-shadow: 0 3px 6px rgba(52, 34, 14, 0.3);
  transform: translateX(-50%) rotate(-4deg);
  /* soft torn ends via a mask so the tape looks ripped, not cut */
  -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%);
  mask-image: linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%);
}
/* slideshow tape sits above the white frame border */
.credits-slideshow .credits-block__list::before { top: -1.75rem; }

/* slideshow caption: ride the title UP onto the polaroid's white bottom
   lip (the list's tall bottom border) so it reads as inked on the frame,
   not floating beneath the card */
.credits-slideshow .credits-block__title {
  margin-top: -2.15rem;
  position: relative;
  z-index: 2;
  /* match the polaroid's tilt (plus the caption's own hand-lettered
     lean) so the caption sits square on the lip, not level under it */
  transform: rotate(calc(var(--sb-tilt, -1.5deg) - 1.2deg));
}

/* the twine: a swag of red baker's twine hanging from the card's top
   corners, strung to the next photo. Scroll only (the crawl is what
   strings the cards together); slideshow shows one photo at a time. */
.credits-roll .credits-block::after {
  content: "";
  display: var(--scrapbook-scenery, block);
  position: absolute;
  top: -2.5rem;
  left: -6%;
  width: 112%;
  height: 2.6rem;
  z-index: -1;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 60' preserveAspectRatio='none'%3E%3Cdefs%3E%3ClinearGradient id='tw' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23a5271a'/%3E%3Cstop offset='0.5' stop-color='%23c0392b'/%3E%3Cstop offset='1' stop-color='%23a5271a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M8 14 Q200 82 392 14' fill='none' stroke='%23000' stroke-width='5' stroke-linecap='round' opacity='0.22' transform='translate(1 3)'/%3E%3Cpath d='M8 14 Q200 82 392 14' fill='none' stroke='url(%23tw)' stroke-width='4' stroke-linecap='round'/%3E%3Cpath d='M8 14 Q200 82 392 14' fill='none' stroke='%23e0685a' stroke-width='4' stroke-linecap='round' stroke-dasharray='2 7' opacity='0.8'/%3E%3Cpath d='M8 14 Q200 82 392 14' fill='none' stroke='%23f6f0e4' stroke-width='1.4' stroke-linecap='round' stroke-dasharray='2 7' stroke-dashoffset='4' opacity='0.7'/%3E%3Cpath d='M8 14 Q200 82 392 14' fill='none' stroke='%23fff' stroke-width='0.8' stroke-linecap='round' opacity='0.25'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

/* ═══ rows: photo captions. Cream ink on the dark mat; the name in a
   readable hand, the amount as a little inked heart-count beside it.
   Names are sacred — wrap, never clip. ═══ */
.credit {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.5em;
  max-width: 100%;
  min-width: 0;
  color: #f4ecdb;
  text-shadow: 0 1px 2px rgba(12, 20, 28, 0.6);
  font-weight: 400;
  font-size: var(--credits-name-size);
  letter-spacing: 0.01em;
  line-height: 1.4;
}
.credit__name {
  min-width: 0;
  overflow-wrap: anywhere;
  color: #f6efe0;
}
/* the amount is a heart-count: a small inked heart then the number */
.credit__amount {
  display: inline-flex;
  align-items: baseline;
  flex: 0 0 auto;
  white-space: nowrap;
  opacity: 1;
  font-size: 0.82em;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #ffd0b8;
  font-variant-numeric: tabular-nums;
  text-shadow: 0 1px 2px rgba(12, 20, 28, 0.55);
}
.credit__amount::before {
  content: "\\2665";
  margin-right: 0.28em;
  font-size: 0.92em;
  color: var(--sb-heart);
  text-shadow: 0 0 4px rgba(227, 93, 106, 0.4);
  vertical-align: baseline;
}

/* ═══ flourish cards: the scrapbook's cover and closing page ═══ */
.flourish { position: relative; }
.flourish--intro { gap: 1.1rem; padding-top: 4rem; }

/* a small fan of loose instant-photos pinned to the cover above the
   title — establishes the scrapbook fiction on the opening shot and
   fills the intro's upper negative space. Absolutely positioned in the
   card's top padding so it never disturbs the centred flex column, and
   it sits well above the text lane. Decorative → kill-switched. */
.flourish--intro::before {
  content: "";
  display: var(--scrapbook-scenery, block);
  position: absolute;
  top: -5.5rem;
  left: 50%;
  width: 15rem;
  height: 8.5rem;
  z-index: 1;
  pointer-events: none;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 170' width='300' height='170'%3E%3Cdefs%3E%3ClinearGradient id='pf' x1='0' y1='0' x2='0.2' y2='1'%3E%3Cstop offset='0' stop-color='%23fffdf7'/%3E%3Cstop offset='1' stop-color='%23e8dfc9'/%3E%3C/linearGradient%3E%3ClinearGradient id='s1' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%233a5170'/%3E%3Cstop offset='0.6' stop-color='%23c98d76'/%3E%3Cstop offset='1' stop-color='%23f0c489'/%3E%3C/linearGradient%3E%3ClinearGradient id='s2' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%2333474a'/%3E%3Cstop offset='0.6' stop-color='%237e948b'/%3E%3Cstop offset='1' stop-color='%23e4d29a'/%3E%3C/linearGradient%3E%3ClinearGradient id='s3' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%236a4a6a'/%3E%3Cstop offset='0.55' stop-color='%23eea24e'/%3E%3Cstop offset='1' stop-color='%23f6cf6e'/%3E%3C/linearGradient%3E%3CradialGradient id='pinr' cx='36%25' cy='30%25' r='70%25'%3E%3Cstop offset='0' stop-color='%23ffb3a6'/%3E%3Cstop offset='0.5' stop-color='%23ef7a6b'/%3E%3Cstop offset='1' stop-color='%23a83f31'/%3E%3C/radialGradient%3E%3C/defs%3E%3C!-- back photo, tilted left --%3E%3Cg transform='rotate(-11 90 100)'%3E%3Crect x='40' y='46' width='96' height='112' rx='4' fill='url(%23pf)'/%3E%3Crect x='48' y='54' width='80' height='76' fill='url(%23s1)'/%3E%3Ccircle cx='98' cy='104' r='16' fill='%23ffe8a4' opacity='0.55'/%3E%3Crect x='48' y='54' width='80' height='76' fill='%23fff' opacity='0.06'/%3E%3C/g%3E%3C!-- middle photo, tilted right --%3E%3Cg transform='rotate(9 210 96)'%3E%3Crect x='150' y='42' width='96' height='112' rx='4' fill='url(%23pf)'/%3E%3Crect x='158' y='50' width='80' height='76' fill='url(%23s3)'/%3E%3Ccircle cx='208' cy='104' r='12' fill='%23fff4cc'/%3E%3Crect x='158' y='50' width='80' height='76' fill='%23fff' opacity='0.06'/%3E%3C/g%3E%3C!-- front photo, near-straight, on top --%3E%3Cg transform='rotate(-2 150 90)'%3E%3Crect x='104' y='34' width='94' height='110' rx='4' fill='url(%23pf)'/%3E%3Crect x='112' y='42' width='78' height='74' fill='url(%23s2)'/%3E%3Cpath d='M112 96 Q140 84 170 94 T190 92 L190 116 L112 116 Z' fill='%233c524a' opacity='0.8'/%3E%3Crect x='112' y='42' width='78' height='74' fill='%23fff' opacity='0.07'/%3E%3C/g%3E%3C!-- brass pin holding the front photo --%3E%3Cellipse cx='150' cy='40' rx='9' ry='3' fill='%233c2810' opacity='0.3'/%3E%3Ccircle cx='149' cy='34' r='8' fill='url(%23pinr)'/%3E%3Cellipse cx='146' cy='31' rx='2.6' ry='2' fill='%23fff' opacity='0.6'/%3E%3C/svg%3E") no-repeat center / contain;
  transform: translateX(-50%) rotate(-1deg);
  filter: drop-shadow(0 10px 16px rgba(40, 24, 10, 0.4));
}

/* badge -> a stamped label sticker on the cover (copy swap) */
.flourish__badge { font-size: 0; border: 0; border-radius: 0; padding: 0; box-shadow: none; }
.flourish__badge::after {
  content: "our little corner of the internet";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.06em;
  padding: 0.5em 1.1em;
  text-transform: none;
  color: var(--sb-ink);
  background: #fbf5e7;
  border-radius: 3px;
  box-shadow: 0 6px 14px rgba(52, 34, 14, 0.4), 0 0 0 1px rgba(120, 88, 44, 0.2) inset;
  transform: rotate(-2deg);
  text-shadow: none;
}

/* the streamer's title, hand-lettered big across the cover (restyle
   only — this is streamer copy). Caveat, ballpoint midnight, tipped. */
.flourish--intro .flourish__title {
  font-family: var(--credits-title-font);
  font-weight: 700;
  text-transform: none;
  letter-spacing: 0.005em;
  line-height: 0.98;
  max-width: min(90vw, 12em);
  color: #f6ecd8;
  text-shadow: 0 2px 0 rgba(74, 48, 20, 0.55), 0 8px 20px rgba(30, 18, 6, 0.5);
  transform: rotate(-1.5deg);
}

/* streamer tagline: restyle only — a felt-tip note under the title */
.flourish__tagline {
  font-family: var(--credits-font);
  font-style: normal;
  font-weight: 400;
  font-size: 1.15rem;
  letter-spacing: 0.02em;
  color: rgba(246, 236, 216, 0.9);
  text-shadow: 0 1px 4px rgba(30, 18, 6, 0.5);
  transform: rotate(0.6deg);
}

/* rating -> a "do not bend" postal stamp (copy swap) */
.flourish__rating { font-size: 0; border: 0; padding: 0; opacity: 1; }
.flourish__rating::after {
  content: "photos \\00B7 do not bend \\00B7 keep forever";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.74rem;
  letter-spacing: 0.14em;
  padding: 0.45em 0.9em;
  text-transform: uppercase;
  color: #f3d9c8;
  border: 2px dashed rgba(239, 122, 107, 0.7);
  border-radius: 4px;
  transform: rotate(1.5deg);
  text-shadow: 0 1px 3px rgba(30, 18, 6, 0.5);
}

/* cover fine print — a pencil note along the spine */
.flourish--intro::after {
  content: "vol. i \\00B7 assembled by hand \\00B7 est. tonight";
  display: var(--scrapbook-scenery, block);
  font-family: var(--credits-font);
  font-weight: 400;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: lowercase;
  color: rgba(246, 236, 216, 0.6);
  transform: rotate(-0.6deg);
}

/* outro: the book closes (copy swaps). A little pinned tab above. */
.flourish--outro::before {
  content: "\\2665 \\2665 \\2665";
  display: var(--scrapbook-scenery, block);
  font-size: 0.9rem;
  letter-spacing: 0.5em;
  padding-left: 0.5em;
  color: var(--sb-heart);
  opacity: 0.9;
  text-shadow: 0 0 6px rgba(227, 93, 106, 0.35);
}
.flourish--outro .flourish__title { font-size: 0; }
.flourish--outro .flourish__title::after {
  content: "scrapbook closed";
  display: inline-block;
  font-family: var(--credits-title-font);
  font-weight: 700;
  text-transform: none;
  font-size: var(--credits-flourish-title-size);
  line-height: 0.98;
  color: #f6ecd8;
  text-shadow: 0 2px 0 rgba(74, 48, 20, 0.55), 0 8px 20px rgba(30, 18, 6, 0.5);
  transform: rotate(-1.5deg);
}
.flourish--outro .flourish__tagline { font-size: 0; }
.flourish--outro .flourish__tagline::after {
  content: "thanks for the memories";
  font-family: var(--credits-font);
  font-style: normal;
  font-size: 1.15rem;
  letter-spacing: 0.02em;
  color: rgba(246, 236, 216, 0.9);
  text-shadow: 0 1px 4px rgba(30, 18, 6, 0.5);
}
/* the closing sticker under the tagline */
.flourish--outro::after {
  content: "see you next time \\00B7 \\2661";
  display: var(--scrapbook-scenery, block);
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  padding: 0.45em 0.9em;
  margin-top: 0.5rem;
  text-transform: none;
  color: var(--sb-ink);
  background: #fbf5e7;
  border-radius: 3px;
  box-shadow: 0 5px 12px rgba(52, 34, 14, 0.4);
  transform: rotate(2deg);
  text-shadow: none;
}

/* ═══ raid finale: THE GOLD-STAR SHOT — the best photo of the night
   gets the gold-star burst sticker slapped in the corner. The photo
   mat warms, a gold-foil star badge sits over the top-right corner,
   the caption gets a "best in show" note, and the sticker breathes on
   a steps() glow (~0.5 paints/s — the only animation inside the roll,
   ceiling is 2/s). Declared after the parity tints so it wins. ═══ */
.credits-block:nth-last-of-type(2),
.credits-slide:nth-last-of-type(2):not(.flourish) {
  --sb-tape: var(--sb-gold);
  --sb-tape-hi: #ffe79a;
}
/* warm the polaroid's frame + a soft gold halo behind the card */
.credits-block:nth-last-of-type(2) {
  background:
    radial-gradient(ellipse 70% 60% at 50% 30%, rgba(244, 196, 48, 0.16), rgba(244, 196, 48, 0) 72%),
    linear-gradient(158deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 22%),
    linear-gradient(178deg, #fdf8ea 0%, #f8f0d8 72%, #f1e6c4 100%);
}
.credits-slide:nth-last-of-type(2):not(.flourish) {
  background:
    radial-gradient(ellipse 76% 60% at 50% 40%, rgba(244, 196, 48, 0.14), rgba(244, 196, 48, 0) 80%),
    linear-gradient(158deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 22%),
    linear-gradient(178deg, #fdf8ea 0%, #f8f0d8 72%, #f1e6c4 100%);
}
/* the gold-star burst sticker over the top-right corner of the photo */
.credits-block:nth-last-of-type(2) .credits-block__list::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__list::before {
  content: "";
  display: var(--scrapbook-scenery, block);
  position: absolute;
  top: -2rem;
  right: -1.9rem;
  width: 4.4rem;
  height: 4.4rem;
  z-index: 4;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3CradialGradient id='foil' cx='40%25' cy='34%25' r='72%25'%3E%3Cstop offset='0' stop-color='%23fff6cf'/%3E%3Cstop offset='.45' stop-color='%23f4c430'/%3E%3Cstop offset='1' stop-color='%23b8860b'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cg fill='%23fbe9a4'%3E%3Cpath d='M50 4 L58 20 L74 12 L70 30 L88 30 L74 42 L92 52 L72 56 L80 74 L62 66 L58 86 L50 70 L42 86 L38 66 L20 74 L28 56 L8 52 L26 42 L12 30 L30 30 L26 12 L42 20 Z'/%3E%3C/g%3E%3Ccircle cx='50' cy='50' r='30' fill='url(%23foil)'/%3E%3Ccircle cx='50' cy='50' r='30' fill='none' stroke='%23fff3c4' stroke-width='1.5' opacity='.7'/%3E%3Cpath d='M50 30 L56 44 L71 44 L59 53 L64 68 L50 59 L36 68 L41 53 L29 44 L44 44 Z' fill='%23fffef2'/%3E%3Cellipse cx='40' cy='40' rx='9' ry='5' fill='%23fff' opacity='.5'/%3E%3C!-- static specular sparkles on the gold foil (ride the roll, L6-safe) --%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M38 38 Q39 33 40 38 Q45 39 40 40 Q39 45 38 40 Q33 39 38 38 Z'/%3E%3Cpath d='M67 27 Q67.6 24 68 27 Q71 27.4 68 28 Q67.6 31 67 28 Q64 27.4 67 27 Z' opacity='.9'/%3E%3Cpath d='M78 62 Q78.5 59.5 79 62 Q81.5 62.5 79 63 Q78.5 65.5 78 63 Q75.5 62.5 78 62 Z' opacity='.85'/%3E%3C/g%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: contain;
  transform: rotate(14deg);
  animation: scrapbook-star 5s steps(1, end) infinite;
}
.credits-block:nth-last-of-type(2) .credits-block__title::after,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::after {
  content: "best in show \\2605";
  display: block;
  width: auto;
  height: auto;
  margin: 0.2rem 0 0;
  border-radius: 0;
  background: none;
  opacity: 1;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.5em;
  letter-spacing: 0.1em;
  color: #b8860b;
  text-shadow: none;
}
.credits-block:nth-last-of-type(2) .credit,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit {
  font-size: calc(var(--credits-name-size) * 1.06);
}

/* ═══ slideshow: each photo is laid onto the board; keep the tilt and
   settle it like a card set down. ═══ */
.credits-slide:not(.flourish) {
  padding: 1.6rem 1.5rem 0.8rem;
}
.credits-slide {
  transform: translateY(12px) rotate(var(--sb-tilt, -1.5deg));
  transition: opacity 0.8s ease, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}
.credits-slide.is-active { transform: rotate(var(--sb-tilt, -1.5deg)); }
.credits-slide.flourish { transform: translateY(12px); }
.credits-slide.flourish.is-active { transform: none; }

/* ═══ keyframes (all scrapbook- prefixed; transform/opacity ONLY) ═══ */
/* the dangling photo: a slow gentle rock about its pin, a couple of
   degrees each way — a draft caught it, not a pendulum */
@keyframes scrapbook-swing {
  0%   { transform: rotate(-2.2deg); }
  50%  { transform: rotate(2.4deg); }
  100% { transform: rotate(-2.2deg); }
}
/* lamp dust: eight held positions over 40s = one hop every 5s */
@keyframes scrapbook-dust {
  0%    { transform: translate3d(0, 0, 0); }
  12.5% { transform: translate3d(1.6vw, -0.6vh, 0); }
  25%   { transform: translate3d(3vw, -1.1vh, 0); }
  37.5% { transform: translate3d(1.5vw, -1.7vh, 0); }
  50%   { transform: translate3d(-0.7vw, -1.1vh, 0); }
  62.5% { transform: translate3d(-2.4vw, -0.4vh, 0); }
  75%   { transform: translate3d(-1.6vw, 0.6vh, 0); }
  87.5% { transform: translate3d(0.5vw, 0.4vh, 0); }
  100%  { transform: translate3d(0, 0, 0); }
}
/* the gold star: two soft brightness dips per 5s — foil catching the
   lamp, never a strobe (~0.5 paints/s) */
@keyframes scrapbook-star {
  0%, 54%   { opacity: 1; }
  60%, 76%  { opacity: 0.72; }
  82%, 100% { opacity: 1; }
}

/* ═══ reduced motion: the desk holds still — the dangling photo parks
   at a slight visible tilt, the dust hangs, the gold star burns steady,
   slides fall back to the base fade (keeping their pinned tilt). ═══ */
@media (prefers-reduced-motion: reduce) {
  head meta:last-of-type::after { animation: none; transform: rotate(1.5deg); }
  body::before { animation: none; }
  .credits-block:nth-last-of-type(2) .credits-block__list::before,
  .credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__list::before {
    animation: none;
  }
  .credits-slide { transition: opacity 0.8s ease; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--scrapbook-scenery:none;}",
};
