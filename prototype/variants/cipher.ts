import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. Cipher: the stream decompiles into digital rain — katakana trails pour down the side gutters of a black construct, every viewer decoded to clean white text in the protected channel, until the code flashes WAKE UP and the hardline rings. */
export const VARIANT: ThemeVariant = {
  key: "cipher",
  name: "Cipher",
  css: `
/* ================================================================
   CIPHER — layered after the base theme.
   Fiction: 23:59:59 — the broadcast is being decompiled. Inside the
   construct, glyph rain sheets down the left and right walls of the
   frame while a protected channel is held open down the middle: the
   operator is extracting every residual self-image — every viewer —
   from the noise and printing them as clean white text. Sector by
   sector the simulation unloads. At the raid block the code itself
   flashes WAKE UP; at the bottom of the roll a payphone rings in the
   right gutter (the exit), a white rabbit bolts into the left wall
   of rain, and the last line admits it: there is no stream.
   Palette: phosphor green (#57ff9a) modernized on true black, leads
   burned white-hot (#f4fff7); one soft red accent on CARRIER LOST.
   Layer map (all scenery kill-switched via --cipher-scenery):
     html bg (--credits-bg)   black-green void (cheap: one linear)
     html::before             THE PLACE — gutter backlight walls, lane
                              darkness, corner vignette. STATIC, promoted
     html::after              RAIN WALL A (near): white-hot leads, big
                              promoted layer, steps() fall — 32px glyph
                              hops, 2 hops/s, seamless 384px tile loop,
                              gutter-masked off the lane
     body::before             RAIN WALL B (far): dim small glyphs, 24px
                              hops at 1 hop/s, parallax depth, same mask
     body::after              lane scrim — the protected channel: black
                              center wash + two soft luminous walls.
                              STATIC, promoted
     head::before             THE HARDLINE — payphone SVG in the right
                              gutter: volume gradient, green rim light,
                              lit keypad, coiled cord, cast shadow.
                              STATIC, promoted
     head::after              THE WHITE RABBIT — bolts through the left
                              gutter in steps() teleport hops, gone for
                              30s at a time (not a continuous mover)
     meta#1::before           landing pools — soft green glow where the
                              rain hits the floor of both gutters. STATIC
     meta#1::after            corner HUD tag, top-left. STATIC text
     meta#2::before           corner HUD tag, top-right. STATIC text
     meta#2::after            the hardline RINGING — small glow over the
                              phone, double-pulse steps() every 10s
     link::before             THE MESSAGE — "follow the white rabbit."
                              materializes in the left gutter for ~4s
                              per 36s cycle, then the rabbit runs
     .credits-roll::before    data motes riding the roll (the only
     .credits-slideshow::before  in-lane texture — L6-legal by riding)
   ================================================================ */
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Space+Grotesk:wght@400;500;700&family=Share+Tech+Mono&display=swap');

:root {
  /* ── palette: phosphor on black ── */
  --cipher-scenery: block; /* set to none to strip every scenery layer */
  --cipher-green: #57ff9a;
  --cipher-green-dim: #2bb45f;
  --cipher-white: #f4fff7;
  --cipher-mint: #b4ffce;
  --cipher-mono: "Share Tech Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

  /* ── base hooks ── */
  /* cheap void: ONE linear gradient — green breath at the top of the
     construct falling to true black at the floor (L3: the walls of rain
     and their backlight live on promoted fixed pseudos). */
  --credits-bg: linear-gradient(180deg, #01130a 0%, #021009 26%, #010b06 55%, #010704 80%, #000302 100%);
  --credits-color: var(--cipher-white);
  --credits-accent: var(--cipher-green);
  --credits-font: "Space Grotesk", "Segoe UI", system-ui, sans-serif;
  --credits-title-font: "Rajdhani", "Trebuchet MS", Verdana, sans-serif;
  --credits-title-size: clamp(1.45rem, 3.6vw, 2.2rem);
  --credits-name-size: clamp(1.02rem, 2.6vw, 1.5rem);
  --credits-flourish-title-size: clamp(2.3rem, 7.2vw, 4.6rem);
  --credits-block-gap: 5rem;
  --credits-name-gap: 0.62rem;
  --credits-shadow: 0 2px 12px rgba(0, 4, 2, 0.9);
  /* glow no-op — never "none" (a "none" in the composed shadow list
     invalidates the whole declaration); cipher glows are bespoke. */
  --credits-glow: 0 0 0 rgba(0, 0, 0, 0);
}

/* Scenery is full-bleed: drop the base edge-fade on html ONLY; body keeps
   the base mask so names still decode in at the floor and out at the top. */
html { -webkit-mask-image: none; mask-image: none; }
body { background: transparent; counter-reset: cipher-sector; }

/* sector indices print as hex — 0x01, 0x0a, 0x10... */
@counter-style cipher-hex {
  system: numeric;
  symbols: "0" "1" "2" "3" "4" "5" "6" "7" "8" "9" "a" "b" "c" "d" "e" "f";
  pad: 2 "0";
}

/* ═══ THE PLACE — one static promoted layer. Two tall backlight walls
   glow softly behind the rain gutters (the rain is the light source),
   the lane between them stays void-dark, and the corners fall away.
   Everything huge and soft — nothing here can flicker against glyphs. */
html::before {
  content: "";
  display: var(--cipher-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* corner vignette — the construct swallows its edges */
    radial-gradient(ellipse 140% 130% at 50% 42%, rgba(0, 2, 1, 0) 54%, rgba(0, 2, 1, 0.66) 100%),
    /* THE PRINTER SOURCE — a bright soft phosphor pool sits high on the
       centerline: the operator's beam that decodes the noise into names. It
       kills the dead upper-center by giving it a light source, and the shaft
       below it holds the whole lane open as a lit volume (coarse, low-alpha,
       static → L6-clean even directly over the text). */
    radial-gradient(ellipse 42% 30% at 50% 6%, rgba(160, 255, 200, 0.2) 0%, rgba(95, 225, 155, 0.075) 46%, rgba(0, 0, 0, 0) 76%),
    /* EXTRACTION BEAM: the tall vertical shaft the names ride down — brightest
       near the top, tapering to nothing at the floor. Very soft, very coarse. */
    radial-gradient(ellipse 27% 92% at 50% 28%, rgba(85, 225, 145, 0.12) 0%, rgba(60, 190, 120, 0.05) 40%, rgba(0, 0, 0, 0) 74%),
    /* SCAN HORIZON: a faint bright band across the decode plane at ~38% —
       where the beam is strongest. A single wide soft stop; no fine edges. */
    radial-gradient(ellipse 62% 12% at 50% 38%, rgba(120, 245, 175, 0.09) 0%, rgba(120, 245, 175, 0) 78%),
    /* DESCENDING GOD-RAYS: two soft volumetric shafts diverging out of the
       printer source at the top-center and raking down into the gutters —
       big, coarse, static, reads as light through the falling code. Anchored
       as elongated ellipses so they diverge rather than tint whole corners. */
    radial-gradient(ellipse 15% 70% at 33% 4%, rgba(80, 215, 135, 0.11) 0%, rgba(80, 215, 135, 0.035) 38%, rgba(0, 0, 0, 0) 70%),
    radial-gradient(ellipse 15% 70% at 67% 4%, rgba(80, 215, 135, 0.11) 0%, rgba(80, 215, 135, 0.035) 38%, rgba(0, 0, 0, 0) 70%),
    /* GOD-RAY HAZE off the gutter floors: soft volumetric lift where the rain
       pools, angling inward — big, coarse, static. */
    radial-gradient(ellipse 26vw 62vh at 9vw 108%, rgba(50, 175, 105, 0.18) 0%, rgba(50, 175, 105, 0.055) 40%, rgba(0, 0, 0, 0) 72%),
    radial-gradient(ellipse 26vw 62vh at 91vw 108%, rgba(50, 175, 105, 0.18) 0%, rgba(50, 175, 105, 0.055) 40%, rgba(0, 0, 0, 0) 72%),
    /* DATA CONDUIT — the extraction shaft has structure: two soft phosphor
       rails frame the protected channel and three broad node-glows ladder
       down its spine, so the mid-frame between blocks is a lit volume, not a
       black hole. All bands are >=2vw wide and low-alpha (coarse-soft, static
       → L6-clean even directly under the crawling names). */
    radial-gradient(ellipse 4vw 52vh at 41.5vw 44%, rgba(87, 255, 154, 0.075) 0%, rgba(87, 255, 154, 0) 74%),
    radial-gradient(ellipse 4vw 52vh at 58.5vw 44%, rgba(87, 255, 154, 0.075) 0%, rgba(87, 255, 154, 0) 74%),
    radial-gradient(ellipse 22vw 9vh at 50% 24%, rgba(120, 245, 175, 0.06) 0%, rgba(120, 245, 175, 0) 76%),
    radial-gradient(ellipse 22vw 9vh at 50% 46%, rgba(87, 255, 154, 0.05) 0%, rgba(87, 255, 154, 0) 76%),
    radial-gradient(ellipse 21vw 8vh at 50% 68%, rgba(70, 210, 130, 0.055) 0%, rgba(70, 210, 130, 0) 78%),
    radial-gradient(ellipse 20vw 8vh at 50% 88%, rgba(50, 190, 115, 0.06) 0%, rgba(50, 190, 115, 0) 78%),
    /* gutter backlight: the code glows through from behind */
    linear-gradient(90deg, rgba(30, 122, 66, 0.24) 0%, rgba(30, 122, 66, 0.16) 9vw, rgba(30, 122, 66, 0.04) 19vw, rgba(0, 0, 0, 0) 26vw, rgba(0, 0, 0, 0) 74vw, rgba(30, 122, 66, 0.04) 81vw, rgba(30, 122, 66, 0.16) 91vw, rgba(30, 122, 66, 0.24) 100%),
    /* a faint green ceiling where the rain enters the frame */
    linear-gradient(180deg, rgba(87, 255, 154, 0.13) 0%, rgba(87, 255, 154, 0) 24%);
}

/* ═══ RAIN WALL A — the near sheet. One big promoted layer, overscanned
   one tile above the viewport; the keyframe travels exactly one 384px
   tile period, so the loop is seamless. SMOOTH linear fall (not steps):
   the animated property is a translate3d transform on a compositor-
   promoted layer (zero repaint), and the mask keeps it in the 18vw
   gutters — no fine pattern ever touches the crawl lane, so the L2
   "no continuous motion on big layers" repaint/flicker concern doesn't
   apply. Stepped hops read as slow/stuttery; linear reads as rain. */
html::after {
  content: "";
  display: var(--cipher-scenery, block);
  position: fixed;
  top: -400px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20320%20384'%3E%3Cdefs%3E%3CradialGradient%20id='lead'%20cx='50%25'%20cy='50%25'%20r='50%25'%3E%3Cstop%20offset='0'%20stop-color='%23eafff2'%20stop-opacity='0.55'/%3E%3Cstop%20offset='0.4'%20stop-color='%238dffb6'%20stop-opacity='0.2'/%3E%3Cstop%20offset='1'%20stop-color='%2357ff9a'%20stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cg%20font-family='Osaka-Mono,MS%20Gothic,Meiryo,monospace'%3E%3Ccircle%20cx='18.82'%20cy='207.18'%20r='17'%20fill='url(%23lead)'/%3E%3Ccircle%20cx='54.82'%20cy='111.18'%20r='17'%20fill='url(%23lead)'/%3E%3Ccircle%20cx='90.82'%20cy='239.18'%20r='17'%20fill='url(%23lead)'/%3E%3Ccircle%20cx='126.82'%20cy='143.18'%20r='17'%20fill='url(%23lead)'/%3E%3Ccircle%20cx='162.82'%20cy='47.18'%20r='17'%20fill='url(%23lead)'/%3E%3Ccircle%20cx='198.82'%20cy='47.18'%20r='17'%20fill='url(%23lead)'/%3E%3Ccircle%20cx='234.82'%20cy='111.18'%20r='17'%20fill='url(%23lead)'/%3E%3Ccircle%20cx='270.82'%20cy='239.18'%20r='17'%20fill='url(%23lead)'/%3E%3Ccircle%20cx='306.82'%20cy='111.18'%20r='17'%20fill='url(%23lead)'/%3E%3Ctext%20x='11'%20y='215'%20font-size='23'%20fill='%23f4fff7'%20fill-opacity='0.98'%3E&%23xFF6D;%3C/text%3E%3Ctext%20x='11'%20y='183'%20font-size='23'%20fill='%23d6ffe4'%20fill-opacity='0.8'%3E8%3C/text%3E%3Ctext%20x='11'%20y='151'%20font-size='23'%20fill='%238dffb6'%20fill-opacity='0.62'%3E&%23xFF9D;%3C/text%3E%3Ctext%20x='11'%20y='119'%20font-size='23'%20fill='%238dffb6'%20fill-opacity='0.45'%3E&%23xFF95;%3C/text%3E%3Ctext%20x='11'%20y='87'%20font-size='23'%20fill='%238dffb6'%20fill-opacity='0.32'%3E&%23xFF74;%3C/text%3E%3Ctext%20x='11'%20y='55'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.28'%3E7%3C/text%3E%3Ctext%20x='11'%20y='23'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.18'%3E&%23xFF8F;%3C/text%3E%3Ctext%20x='11'%20y='375'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.12'%3E3%3C/text%3E%3Ctext%20x='11'%20y='343'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.08'%3E&%23xFF91;%3C/text%3E%3Ctext%20x='11'%20y='311'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.05'%3E&%23xFF94;%3C/text%3E%3Ctext%20x='11'%20y='279'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.04'%3E&%23xFF67;%3C/text%3E%3Ctext%20x='11'%20y='247'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.04'%3E&%23xFF6D;%3C/text%3E%3Ctext%20x='11'%20y='215'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.04'%3E&%23xFF8F;%3C/text%3E%3Ctext%20x='11'%20y='183'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.04'%3E&%23xFF7E;%3C/text%3E%3Ctext%20x='47'%20y='119'%20font-size='23'%20fill='%23f4fff7'%20fill-opacity='0.98'%3E&%23xFF7A;%3C/text%3E%3Ctext%20x='47'%20y='87'%20font-size='23'%20fill='%23d6ffe4'%20fill-opacity='0.8'%3E&%23xFF88;%3C/text%3E%3Ctext%20x='47'%20y='55'%20font-size='23'%20fill='%238dffb6'%20fill-opacity='0.62'%3E&%23xFF7C;%3C/text%3E%3Ctext%20x='47'%20y='23'%20font-size='23'%20fill='%238dffb6'%20fill-opacity='0.45'%3E0%3C/text%3E%3Ctext%20x='47'%20y='375'%20font-size='23'%20fill='%238dffb6'%20fill-opacity='0.32'%3E&%23xFF7D;%3C/text%3E%3Ctext%20x='47'%20y='343'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.28'%3E7%3C/text%3E%3Ctext%20x='47'%20y='311'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.18'%3E&%23xFF6C;%3C/text%3E%3Ctext%20x='47'%20y='279'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.12'%3E&%23xFF8B;%3C/text%3E%3Ctext%20x='83'%20y='247'%20font-size='23'%20fill='%23f4fff7'%20fill-opacity='0.98'%3E&%23xFF86;%3C/text%3E%3Ctext%20x='83'%20y='215'%20font-size='23'%20fill='%23d6ffe4'%20fill-opacity='0.8'%3E4%3C/text%3E%3Ctext%20x='83'%20y='183'%20font-size='23'%20fill='%238dffb6'%20fill-opacity='0.62'%3E1%3C/text%3E%3Ctext%20x='83'%20y='151'%20font-size='23'%20fill='%238dffb6'%20fill-opacity='0.45'%3E&%23xFF89;%3C/text%3E%3Ctext%20x='83'%20y='119'%20font-size='23'%20fill='%238dffb6'%20fill-opacity='0.32'%3E&%23xFF70;%3C/text%3E%3Ctext%20x='83'%20y='87'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.28'%3E&%23xFF8B;%3C/text%3E%3Ctext%20x='83'%20y='55'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.18'%3E&%23xFF6D;%3C/text%3E%3Ctext%20x='83'%20y='23'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.12'%3E2%3C/text%3E%3Ctext%20x='83'%20y='375'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.08'%3E&%23xFF9C;%3C/text%3E%3Ctext%20x='83'%20y='343'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.05'%3E5%3C/text%3E%3Ctext%20x='83'%20y='311'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.04'%3E&%23xFF70;%3C/text%3E%3Ctext%20x='83'%20y='279'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.04'%3E&%23xFF8E;%3C/text%3E%3Ctext%20x='83'%20y='247'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.04'%3E&%23xFF78;%3C/text%3E%3Ctext%20x='83'%20y='215'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.04'%3E&%23xFF91;%3C/text%3E%3Ctext%20x='83'%20y='183'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.04'%3E&%23xFF74;%3C/text%3E%3Ctext%20x='119'%20y='151'%20font-size='23'%20fill='%23f4fff7'%20fill-opacity='0.98'%3E&%23xFF7E;%3C/text%3E%3Ctext%20x='119'%20y='119'%20font-size='23'%20fill='%23d6ffe4'%20fill-opacity='0.8'%3E&%23xFF93;%3C/text%3E%3Ctext%20x='119'%20y='87'%20font-size='23'%20fill='%238dffb6'%20fill-opacity='0.62'%3E&%23xFF6B;%3C/text%3E%3Ctext%20x='119'%20y='55'%20font-size='23'%20fill='%238dffb6'%20fill-opacity='0.45'%3E&%23xFF75;%3C/text%3E%3Ctext%20x='119'%20y='23'%20font-size='23'%20fill='%238dffb6'%20fill-opacity='0.32'%3E&%23xFF90;%3C/text%3E%3Ctext%20x='119'%20y='375'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.28'%3E&%23xFF72;%3C/text%3E%3Ctext%20x='119'%20y='343'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.18'%3E&%23xFF9A;%3C/text%3E%3Ctext%20x='119'%20y='311'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.12'%3E6%3C/text%3E%3Ctext%20x='119'%20y='279'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.08'%3E&%23xFF74;%3C/text%3E%3Ctext%20x='119'%20y='247'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.05'%3E&%23xFF7C;%3C/text%3E%3Ctext%20x='119'%20y='215'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.04'%3E&%23xFF9A;%3C/text%3E%3Ctext%20x='155'%20y='55'%20font-size='23'%20fill='%23f4fff7'%20fill-opacity='0.98'%3E4%3C/text%3E%3Ctext%20x='155'%20y='23'%20font-size='23'%20fill='%23d6ffe4'%20fill-opacity='0.8'%3E4%3C/text%3E%3Ctext%20x='155'%20y='375'%20font-size='23'%20fill='%238dffb6'%20fill-opacity='0.62'%3E&%23xFF8B;%3C/text%3E%3Ctext%20x='155'%20y='343'%20font-size='23'%20fill='%238dffb6'%20fill-opacity='0.45'%3E&%23xFF74;%3C/text%3E%3Ctext%20x='155'%20y='311'%20font-size='23'%20fill='%238dffb6'%20fill-opacity='0.32'%3E&%23xFF83;%3C/text%3E%3Ctext%20x='155'%20y='279'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.28'%3E9%3C/text%3E%3Ctext%20x='155'%20y='247'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.18'%3E&%23xFF7F;%3C/text%3E%3Ctext%20x='155'%20y='215'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.12'%3E&%23xFF6D;%3C/text%3E%3Ctext%20x='155'%20y='183'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.08'%3E&%23xFF6B;%3C/text%3E%3Ctext%20x='155'%20y='151'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.05'%3E&%23xFF6C;%3C/text%3E%3Ctext%20x='155'%20y='119'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.04'%3E&%23xFF93;%3C/text%3E%3Ctext%20x='155'%20y='87'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.04'%3E&%23xFF7D;%3C/text%3E%3Ctext%20x='155'%20y='55'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.04'%3E&%23xFF79;%3C/text%3E%3Ctext%20x='155'%20y='23'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.04'%3E&%23xFF67;%3C/text%3E%3Ctext%20x='155'%20y='375'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.04'%3E&%23xFF74;%3C/text%3E%3Ctext%20x='155'%20y='343'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.04'%3E8%3C/text%3E%3Ctext%20x='191'%20y='55'%20font-size='23'%20fill='%23f4fff7'%20fill-opacity='0.98'%3E&%23xFF7F;%3C/text%3E%3Ctext%20x='191'%20y='23'%20font-size='23'%20fill='%23d6ffe4'%20fill-opacity='0.8'%3E&%23xFF71;%3C/text%3E%3Ctext%20x='191'%20y='375'%20font-size='23'%20fill='%238dffb6'%20fill-opacity='0.62'%3E&%23xFF76;%3C/text%3E%3Ctext%20x='191'%20y='343'%20font-size='23'%20fill='%238dffb6'%20fill-opacity='0.45'%3E5%3C/text%3E%3Ctext%20x='191'%20y='311'%20font-size='23'%20fill='%238dffb6'%20fill-opacity='0.32'%3E&%23xFF89;%3C/text%3E%3Ctext%20x='227'%20y='119'%20font-size='23'%20fill='%23f4fff7'%20fill-opacity='0.98'%3E&%23xFF97;%3C/text%3E%3Ctext%20x='227'%20y='87'%20font-size='23'%20fill='%23d6ffe4'%20fill-opacity='0.8'%3E3%3C/text%3E%3Ctext%20x='227'%20y='55'%20font-size='23'%20fill='%238dffb6'%20fill-opacity='0.62'%3EZ%3C/text%3E%3Ctext%20x='227'%20y='23'%20font-size='23'%20fill='%238dffb6'%20fill-opacity='0.45'%3E&%23xFF97;%3C/text%3E%3Ctext%20x='227'%20y='375'%20font-size='23'%20fill='%238dffb6'%20fill-opacity='0.32'%3E&%23xFF8A;%3C/text%3E%3Ctext%20x='227'%20y='343'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.28'%3E&%23xFF89;%3C/text%3E%3Ctext%20x='227'%20y='311'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.18'%3E&%23xFF7D;%3C/text%3E%3Ctext%20x='263'%20y='247'%20font-size='23'%20fill='%23f4fff7'%20fill-opacity='0.98'%3E&%23xFF96;%3C/text%3E%3Ctext%20x='263'%20y='215'%20font-size='23'%20fill='%23d6ffe4'%20fill-opacity='0.8'%3E&%23xFF6B;%3C/text%3E%3Ctext%20x='263'%20y='183'%20font-size='23'%20fill='%238dffb6'%20fill-opacity='0.62'%3E&%23xFF8E;%3C/text%3E%3Ctext%20x='263'%20y='151'%20font-size='23'%20fill='%238dffb6'%20fill-opacity='0.45'%3E&%23xFF97;%3C/text%3E%3Ctext%20x='263'%20y='119'%20font-size='23'%20fill='%238dffb6'%20fill-opacity='0.32'%3E&%23xFF85;%3C/text%3E%3Ctext%20x='263'%20y='87'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.28'%3E&%23xFF85;%3C/text%3E%3Ctext%20x='263'%20y='55'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.18'%3E&%23xFF94;%3C/text%3E%3Ctext%20x='263'%20y='23'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.12'%3E&%23xFF71;%3C/text%3E%3Ctext%20x='299'%20y='119'%20font-size='23'%20fill='%23f4fff7'%20fill-opacity='0.98'%3E&%23xFF77;%3C/text%3E%3Ctext%20x='299'%20y='87'%20font-size='23'%20fill='%23d6ffe4'%20fill-opacity='0.8'%3E&%23xFF8C;%3C/text%3E%3Ctext%20x='299'%20y='55'%20font-size='23'%20fill='%238dffb6'%20fill-opacity='0.62'%3E8%3C/text%3E%3Ctext%20x='299'%20y='23'%20font-size='23'%20fill='%238dffb6'%20fill-opacity='0.45'%3E&%23xFF94;%3C/text%3E%3Ctext%20x='299'%20y='375'%20font-size='23'%20fill='%238dffb6'%20fill-opacity='0.32'%3E&%23xFF75;%3C/text%3E%3Ctext%20x='299'%20y='343'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.28'%3E2%3C/text%3E%3Ctext%20x='299'%20y='311'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.18'%3E&%23xFF7F;%3C/text%3E%3Ctext%20x='299'%20y='279'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.12'%3E8%3C/text%3E%3Ctext%20x='299'%20y='247'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.08'%3E&%23xFF6B;%3C/text%3E%3Ctext%20x='299'%20y='215'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.05'%3E&%23xFF8F;%3C/text%3E%3Ctext%20x='299'%20y='183'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.04'%3E&%23xFF73;%3C/text%3E%3Ctext%20x='299'%20y='151'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.04'%3E6%3C/text%3E%3Ctext%20x='299'%20y='119'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.04'%3E&%23xFF95;%3C/text%3E%3Ctext%20x='299'%20y='343'%20font-size='23'%20fill='%23f4fff7'%20fill-opacity='0.69'%3E3%3C/text%3E%3Ctext%20x='299'%20y='311'%20font-size='23'%20fill='%23d6ffe4'%20fill-opacity='0.56'%3E&%23xFF7B;%3C/text%3E%3Ctext%20x='299'%20y='279'%20font-size='23'%20fill='%238dffb6'%20fill-opacity='0.43'%3E&%23xFF90;%3C/text%3E%3Ctext%20x='299'%20y='247'%20font-size='23'%20fill='%238dffb6'%20fill-opacity='0.31'%3E&%23xFF6C;%3C/text%3E%3Ctext%20x='299'%20y='215'%20font-size='23'%20fill='%238dffb6'%20fill-opacity='0.22'%3E&%23xFF7B;%3C/text%3E%3Ctext%20x='299'%20y='183'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.19'%3E8%3C/text%3E%3Ctext%20x='299'%20y='151'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.13'%3E&%23xFF73;%3C/text%3E%3Ctext%20x='299'%20y='119'%20font-size='23'%20fill='%2340c878'%20fill-opacity='0.08'%3E&%23xFF89;%3C/text%3E%3C/g%3E%3C/svg%3E");
  background-size: 320px 384px;
  background-repeat: repeat;
  -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 12vw, transparent 19vw, transparent 81vw, #000 88vw, #000 100%);
  mask-image: linear-gradient(90deg, #000 0%, #000 12vw, transparent 19vw, transparent 81vw, #000 88vw, #000 100%);
  animation: cipher-rain-a 2.2s linear infinite;
}

/* ═══ RAIN WALL B — the far sheet: smaller, dimmer glyphs falling slower
   (24px hops, 1 hop/s, 336px tile loop). Painted before wall A in tree
   order at the same z, so it reads as depth behind it. */
body::before {
  content: "";
  display: var(--cipher-scenery, block);
  position: fixed;
  top: -360px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20264%20336'%3E%3Cg%20font-family='Osaka-Mono,MS%20Gothic,Meiryo,monospace'%3E%3Ctext%20x='11'%20y='16'%20font-size='16'%20fill='%23d8ffe6'%20fill-opacity='0.98'%3E&%23xFF70;%3C/text%3E%3Ctext%20x='11'%20y='328'%20font-size='16'%20fill='%23a8f5c4'%20fill-opacity='0.8'%3E&%23xFF97;%3C/text%3E%3Ctext%20x='11'%20y='304'%20font-size='16'%20fill='%236fd79a'%20fill-opacity='0.62'%3E&%23xFF9B;%3C/text%3E%3Ctext%20x='11'%20y='280'%20font-size='16'%20fill='%236fd79a'%20fill-opacity='0.45'%3EZ%3C/text%3E%3Ctext%20x='11'%20y='256'%20font-size='16'%20fill='%236fd79a'%20fill-opacity='0.32'%3E7%3C/text%3E%3Ctext%20x='11'%20y='40'%20font-size='16'%20fill='%23d8ffe6'%20fill-opacity='0.69'%3E&%23xFF7D;%3C/text%3E%3Ctext%20x='11'%20y='16'%20font-size='16'%20fill='%23a8f5c4'%20fill-opacity='0.56'%3E&%23xFF99;%3C/text%3E%3Ctext%20x='11'%20y='328'%20font-size='16'%20fill='%236fd79a'%20fill-opacity='0.43'%3E&%23xFF73;%3C/text%3E%3Ctext%20x='11'%20y='304'%20font-size='16'%20fill='%236fd79a'%20fill-opacity='0.31'%3E&%23xFF99;%3C/text%3E%3Ctext%20x='11'%20y='280'%20font-size='16'%20fill='%236fd79a'%20fill-opacity='0.22'%3E5%3C/text%3E%3Ctext%20x='11'%20y='256'%20font-size='16'%20fill='%232f6e49'%20fill-opacity='0.19'%3E&%23xFF78;%3C/text%3E%3Ctext%20x='11'%20y='232'%20font-size='16'%20fill='%232f6e49'%20fill-opacity='0.13'%3E&%23xFF8E;%3C/text%3E%3Ctext%20x='11'%20y='208'%20font-size='16'%20fill='%232f6e49'%20fill-opacity='0.08'%3E&%23xFF84;%3C/text%3E%3Ctext%20x='11'%20y='184'%20font-size='16'%20fill='%232f6e49'%20fill-opacity='0.06'%3E&%23xFF74;%3C/text%3E%3Ctext%20x='11'%20y='160'%20font-size='16'%20fill='%232f6e49'%20fill-opacity='0.04'%3E&%23xFF96;%3C/text%3E%3Ctext%20x='47'%20y='304'%20font-size='16'%20fill='%23d8ffe6'%20fill-opacity='0.98'%3E&%23xFF9C;%3C/text%3E%3Ctext%20x='47'%20y='280'%20font-size='16'%20fill='%23a8f5c4'%20fill-opacity='0.8'%3E&%23xFF66;%3C/text%3E%3Ctext%20x='47'%20y='256'%20font-size='16'%20fill='%236fd79a'%20fill-opacity='0.62'%3E&%23xFF68;%3C/text%3E%3Ctext%20x='47'%20y='232'%20font-size='16'%20fill='%236fd79a'%20fill-opacity='0.45'%3E&%23xFF7C;%3C/text%3E%3Ctext%20x='47'%20y='208'%20font-size='16'%20fill='%236fd79a'%20fill-opacity='0.32'%3E&%23xFF89;%3C/text%3E%3Ctext%20x='47'%20y='184'%20font-size='16'%20fill='%232f6e49'%20fill-opacity='0.28'%3E&%23xFF7D;%3C/text%3E%3Ctext%20x='47'%20y='160'%20font-size='16'%20fill='%232f6e49'%20fill-opacity='0.18'%3E&%23xFF7B;%3C/text%3E%3Ctext%20x='47'%20y='136'%20font-size='16'%20fill='%232f6e49'%20fill-opacity='0.12'%3E&%23xFF88;%3C/text%3E%3Ctext%20x='47'%20y='112'%20font-size='16'%20fill='%232f6e49'%20fill-opacity='0.08'%3E&%23xFF77;%3C/text%3E%3Ctext%20x='47'%20y='88'%20font-size='16'%20fill='%232f6e49'%20fill-opacity='0.05'%3E&%23xFF95;%3C/text%3E%3Ctext%20x='83'%20y='304'%20font-size='16'%20fill='%23d8ffe6'%20fill-opacity='0.98'%3E&%23xFF69;%3C/text%3E%3Ctext%20x='83'%20y='280'%20font-size='16'%20fill='%23a8f5c4'%20fill-opacity='0.8'%3E9%3C/text%3E%3Ctext%20x='83'%20y='256'%20font-size='16'%20fill='%236fd79a'%20fill-opacity='0.62'%3E&%23xFF93;%3C/text%3E%3Ctext%20x='83'%20y='232'%20font-size='16'%20fill='%236fd79a'%20fill-opacity='0.45'%3E8%3C/text%3E%3Ctext%20x='83'%20y='208'%20font-size='16'%20fill='%236fd79a'%20fill-opacity='0.32'%3E7%3C/text%3E%3Ctext%20x='83'%20y='184'%20font-size='16'%20fill='%232f6e49'%20fill-opacity='0.28'%3E0%3C/text%3E%3Ctext%20x='83'%20y='160'%20font-size='16'%20fill='%232f6e49'%20fill-opacity='0.18'%3E7%3C/text%3E%3Ctext%20x='83'%20y='136'%20font-size='16'%20fill='%232f6e49'%20fill-opacity='0.12'%3E&%23xFF79;%3C/text%3E%3Ctext%20x='83'%20y='112'%20font-size='16'%20fill='%232f6e49'%20fill-opacity='0.08'%3E&%23xFF89;%3C/text%3E%3Ctext%20x='83'%20y='88'%20font-size='16'%20fill='%232f6e49'%20fill-opacity='0.05'%3E&%23xFF91;%3C/text%3E%3Ctext%20x='83'%20y='280'%20font-size='16'%20fill='%23d8ffe6'%20fill-opacity='0.69'%3E&%23xFF68;%3C/text%3E%3Ctext%20x='83'%20y='256'%20font-size='16'%20fill='%23a8f5c4'%20fill-opacity='0.56'%3E&%23xFF8C;%3C/text%3E%3Ctext%20x='83'%20y='232'%20font-size='16'%20fill='%236fd79a'%20fill-opacity='0.43'%3E&%23xFF96;%3C/text%3E%3Ctext%20x='83'%20y='208'%20font-size='16'%20fill='%236fd79a'%20fill-opacity='0.31'%3E&%23xFF7A;%3C/text%3E%3Ctext%20x='83'%20y='184'%20font-size='16'%20fill='%236fd79a'%20fill-opacity='0.22'%3E&%23xFF72;%3C/text%3E%3Ctext%20x='83'%20y='160'%20font-size='16'%20fill='%232f6e49'%20fill-opacity='0.19'%3E&%23xFF73;%3C/text%3E%3Ctext%20x='83'%20y='136'%20font-size='16'%20fill='%232f6e49'%20fill-opacity='0.13'%3E&%23xFF8A;%3C/text%3E%3Ctext%20x='155'%20y='160'%20font-size='16'%20fill='%23d8ffe6'%20fill-opacity='0.98'%3E&%23xFF7A;%3C/text%3E%3Ctext%20x='155'%20y='136'%20font-size='16'%20fill='%23a8f5c4'%20fill-opacity='0.8'%3E&%23xFF69;%3C/text%3E%3Ctext%20x='155'%20y='112'%20font-size='16'%20fill='%236fd79a'%20fill-opacity='0.62'%3E4%3C/text%3E%3Ctext%20x='155'%20y='88'%20font-size='16'%20fill='%236fd79a'%20fill-opacity='0.45'%3E&%23xFF6B;%3C/text%3E%3Ctext%20x='155'%20y='64'%20font-size='16'%20fill='%236fd79a'%20fill-opacity='0.32'%3E&%23xFF78;%3C/text%3E%3Ctext%20x='155'%20y='40'%20font-size='16'%20fill='%232f6e49'%20fill-opacity='0.28'%3E&%23xFF80;%3C/text%3E%3Ctext%20x='155'%20y='16'%20font-size='16'%20fill='%232f6e49'%20fill-opacity='0.18'%3E&%23xFF70;%3C/text%3E%3Ctext%20x='155'%20y='328'%20font-size='16'%20fill='%232f6e49'%20fill-opacity='0.12'%3E&%23xFF98;%3C/text%3E%3Ctext%20x='227'%20y='64'%20font-size='16'%20fill='%23d8ffe6'%20fill-opacity='0.98'%3E&%23xFF97;%3C/text%3E%3Ctext%20x='227'%20y='40'%20font-size='16'%20fill='%23a8f5c4'%20fill-opacity='0.8'%3E&%23xFF68;%3C/text%3E%3Ctext%20x='227'%20y='16'%20font-size='16'%20fill='%236fd79a'%20fill-opacity='0.62'%3E&%23xFF66;%3C/text%3E%3Ctext%20x='227'%20y='328'%20font-size='16'%20fill='%236fd79a'%20fill-opacity='0.45'%3E&%23xFF9C;%3C/text%3E%3Ctext%20x='227'%20y='304'%20font-size='16'%20fill='%236fd79a'%20fill-opacity='0.32'%3E&%23xFF98;%3C/text%3E%3Ctext%20x='227'%20y='280'%20font-size='16'%20fill='%232f6e49'%20fill-opacity='0.28'%3E&%23xFF90;%3C/text%3E%3Ctext%20x='227'%20y='256'%20font-size='16'%20fill='%232f6e49'%20fill-opacity='0.18'%3E&%23xFF7D;%3C/text%3E%3C/g%3E%3C/svg%3E");
  background-size: 264px 336px;
  background-repeat: repeat;
  background-position: 140px 0;
  -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 13vw, transparent 20vw, transparent 80vw, #000 87vw, #000 100%);
  mask-image: linear-gradient(90deg, #000 0%, #000 13vw, transparent 20vw, transparent 80vw, #000 87vw, #000 100%);
  animation: cipher-rain-b 3.8s linear infinite;
}

/* ═══ the protected channel: a black scrim holds the center lane open so
   white names never fight the glow, walled by two soft luminous seams
   (coarse 3vw bands, ~5% alpha — L6-legal even if a long name reaches
   them). STATIC, promoted. */
body::after {
  content: "";
  display: var(--cipher-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background:
    linear-gradient(90deg, rgba(0, 3, 2, 0) 15%, rgba(0, 3, 2, 0.5) 28%, rgba(0, 3, 2, 0.62) 50%, rgba(0, 3, 2, 0.5) 72%, rgba(0, 3, 2, 0) 85%),
    linear-gradient(90deg, rgba(87, 255, 154, 0) 18vw, rgba(87, 255, 154, 0.07) 20.5vw, rgba(87, 255, 154, 0) 23vw, rgba(87, 255, 154, 0) 77vw, rgba(87, 255, 154, 0.07) 79.5vw, rgba(87, 255, 154, 0) 82vw);
}

/* ═══ THE HARDLINE — the exit is a payphone waiting at the bottom of the
   right gutter. Rebuilt R2: brighter brushed-steel body lit from the LEFT
   by the rain, a full green rim-light down that edge, a real receiver
   seated in a hook cradle, a proper coiled cord, a keypad of lit keys with
   the "5" burning hot, a bright decode display, and a BAKED specular
   highlight streak on the steel (a static gleam — L6-safe sparkle).
   STATIC, promoted. */
head { display: var(--cipher-scenery, block); }
head::before {
  content: "";
  display: var(--cipher-scenery, block);
  position: fixed;
  right: 3.4vw;
  bottom: 3vh;
  width: 190px;
  height: 320px;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20200%20340'%3E%3Cdefs%3E%3CradialGradient%20id='occ'%20cx='50%25'%20cy='44%25'%20r='62%25'%3E%3Cstop%20offset='0'%20stop-color='%23000402'%20stop-opacity='0.9'/%3E%3Cstop%20offset='0.6'%20stop-color='%23000402'%20stop-opacity='0.5'/%3E%3Cstop%20offset='1'%20stop-color='%23000402'%20stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient%20id='amb'%20cx='38%25'%20cy='36%25'%20r='70%25'%3E%3Cstop%20offset='0'%20stop-color='%2357ff9a'%20stop-opacity='0.14'/%3E%3Cstop%20offset='1'%20stop-color='%2357ff9a'%20stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient%20id='steel'%20x1='0'%20y1='0'%20x2='1'%20y2='0'%3E%3Cstop%20offset='0'%20stop-color='%237fe8ad'/%3E%3Cstop%20offset='0.08'%20stop-color='%234c9a6e'/%3E%3Cstop%20offset='0.24'%20stop-color='%232a5f40'/%3E%3Cstop%20offset='0.52'%20stop-color='%231a4530'/%3E%3Cstop%20offset='0.80'%20stop-color='%23122f21'/%3E%3Cstop%20offset='1'%20stop-color='%231d4130'/%3E%3C/linearGradient%3E%3ClinearGradient%20id='bodyV'%20x1='0'%20y1='0'%20x2='0'%20y2='1'%3E%3Cstop%20offset='0'%20stop-color='%2340805c'%20stop-opacity='0.5'/%3E%3Cstop%20offset='0.28'%20stop-color='%231a3826'%20stop-opacity='0'/%3E%3Cstop%20offset='1'%20stop-color='%23020806'%20stop-opacity='0.55'/%3E%3C/linearGradient%3E%3ClinearGradient%20id='bake'%20x1='0'%20y1='0'%20x2='1'%20y2='1'%3E%3Cstop%20offset='0'%20stop-color='%233d6b50'/%3E%3Cstop%20offset='0.4'%20stop-color='%23163024'/%3E%3Cstop%20offset='1'%20stop-color='%23030b07'/%3E%3C/linearGradient%3E%3ClinearGradient%20id='recv'%20x1='0'%20y1='0'%20x2='0'%20y2='1'%3E%3Cstop%20offset='0'%20stop-color='%234f8f68'/%3E%3Cstop%20offset='0.45'%20stop-color='%231d4230'/%3E%3Cstop%20offset='1'%20stop-color='%23050f0a'/%3E%3C/linearGradient%3E%3CradialGradient%20id='disp'%20cx='40%25'%20cy='40%25'%20r='74%25'%3E%3Cstop%20offset='0'%20stop-color='%23d6ffe8'/%3E%3Cstop%20offset='0.35'%20stop-color='%2372ffab'/%3E%3Cstop%20offset='0.7'%20stop-color='%2333c46e'/%3E%3Cstop%20offset='1'%20stop-color='%230e4a26'/%3E%3C/radialGradient%3E%3CradialGradient%20id='dispbloom'%20cx='50%25'%20cy='50%25'%20r='50%25'%3E%3Cstop%20offset='0'%20stop-color='%238dffbb'%20stop-opacity='0.85'/%3E%3Cstop%20offset='0.55'%20stop-color='%2357ff9a'%20stop-opacity='0.25'/%3E%3Cstop%20offset='1'%20stop-color='%2357ff9a'%20stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient%20id='keylit'%20cx='50%25'%20cy='42%25'%20r='62%25'%3E%3Cstop%20offset='0'%20stop-color='%23eafff4'/%3E%3Cstop%20offset='0.4'%20stop-color='%238dffb6'/%3E%3Cstop%20offset='0.75'%20stop-color='%232fa860'/%3E%3Cstop%20offset='1'%20stop-color='%230c3a20'/%3E%3C/radialGradient%3E%3CradialGradient%20id='keyhot'%20cx='50%25'%20cy='42%25'%20r='60%25'%3E%3Cstop%20offset='0'%20stop-color='%23ffffff'/%3E%3Cstop%20offset='0.4'%20stop-color='%23b6ffd2'/%3E%3Cstop%20offset='1'%20stop-color='%2334c470'/%3E%3C/radialGradient%3E%3CradialGradient%20id='keybloom'%20cx='50%25'%20cy='50%25'%20r='50%25'%3E%3Cstop%20offset='0'%20stop-color='%238dffb6'%20stop-opacity='0.8'/%3E%3Cstop%20offset='1'%20stop-color='%2357ff9a'%20stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient%20id='coin'%20x1='0'%20y1='0'%20x2='0'%20y2='1'%3E%3Cstop%20offset='0'%20stop-color='%23081a11'/%3E%3Cstop%20offset='0.5'%20stop-color='%23153a26'/%3E%3Cstop%20offset='1'%20stop-color='%23050f0a'/%3E%3C/linearGradient%3E%3ClinearGradient%20id='ped'%20x1='0'%20y1='0'%20x2='0'%20y2='1'%3E%3Cstop%20offset='0'%20stop-color='%231b4530'/%3E%3Cstop%20offset='1'%20stop-color='%23030b07'/%3E%3C/linearGradient%3E%3ClinearGradient%20id='gleam'%20x1='0'%20y1='0'%20x2='0'%20y2='1'%3E%3Cstop%20offset='0'%20stop-color='%23eafff4'%20stop-opacity='0'/%3E%3Cstop%20offset='0.5'%20stop-color='%23eafff4'%20stop-opacity='0.75'/%3E%3Cstop%20offset='1'%20stop-color='%23eafff4'%20stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cellipse%20cx='100'%20cy='150'%20rx='100'%20ry='176'%20fill='url(%23occ)'/%3E%3Cellipse%20cx='96'%20cy='120'%20rx='96'%20ry='150'%20fill='url(%23amb)'/%3E%3Cellipse%20cx='104'%20cy='314'%20rx='78'%20ry='12'%20fill='%23010402'%20opacity='0.9'/%3E%3Cellipse%20cx='104'%20cy='313'%20rx='46'%20ry='6'%20fill='%23000201'%20opacity='0.8'/%3E%3Cellipse%20cx='104'%20cy='312'%20rx='84'%20ry='9'%20fill='%2357ff9a'%20opacity='0.05'/%3E%3Cpath%20d='M76%20300%20L128%20300%20L136%20314%20L68%20314%20Z'%20fill='url(%23ped)'/%3E%3Crect%20x='94'%20y='262'%20width='16'%20height='42'%20fill='url(%23ped)'/%3E%3Cline%20x1='95'%20y1='264'%20x2='95'%20y2='300'%20stroke='%237fe0a8'%20stroke-opacity='0.4'%20stroke-width='1'/%3E%3Crect%20x='50'%20y='24'%20width='108'%20height='250'%20rx='14'%20fill='%23010604'%20opacity='0.9'/%3E%3Crect%20x='54'%20y='20'%20width='100'%20height='250'%20rx='12'%20fill='url(%23steel)'/%3E%3Crect%20x='54'%20y='20'%20width='100'%20height='250'%20rx='12'%20fill='url(%23bodyV)'/%3E%3Cpath%20d='M66%2020%20Q54%2020%2054%2032%20L54%20258%20Q54%20270%2066%20270'%20fill='none'%20stroke='%23aaffcd'%20stroke-opacity='0.85'%20stroke-width='2.6'/%3E%3Cpath%20d='M66%2020%20Q54%2020%2054%2032%20L54%20140'%20fill='none'%20stroke='%23f4fff7'%20stroke-opacity='0.6'%20stroke-width='1.2'/%3E%3Cpath%20d='M154%2036%20L154%20256'%20stroke='%23010604'%20stroke-width='2.6'%20stroke-opacity='0.9'/%3E%3Crect%20x='63'%20y='30'%20width='9'%20height='236'%20rx='4'%20fill='url(%23gleam)'%20opacity='0.5'/%3E%3Cpath%20d='M66%2022%20L146%2022'%20stroke='%2366c48c'%20stroke-opacity='0.55'%20stroke-width='1.6'%20stroke-linecap='round'/%3E%3Crect%20x='70'%20y='30'%20width='72'%20height='11'%20rx='2'%20fill='%230a1c12'%20stroke='%23246a44'%20stroke-width='0.8'/%3E%3Crect%20x='74'%20y='33'%20width='38'%20height='2'%20rx='1'%20fill='%2366e69a'%20opacity='0.55'/%3E%3Crect%20x='74'%20y='37'%20width='28'%20height='1.6'%20rx='0.8'%20fill='%2366e69a'%20opacity='0.32'/%3E%3Crect%20x='70'%20y='48'%20width='72'%20height='24'%20rx='3'%20fill='%23020c07'/%3E%3Cellipse%20cx='106'%20cy='60'%20rx='52'%20ry='22'%20fill='url(%23dispbloom)'/%3E%3Crect%20x='73'%20y='51'%20width='66'%20height='18'%20rx='2'%20fill='%2304190e'%20stroke='%2357ff9a'%20stroke-opacity='0.6'%20stroke-width='0.9'/%3E%3Crect%20x='77'%20y='55'%20width='38'%20height='9'%20rx='1'%20fill='url(%23disp)'/%3E%3Crect%20x='119'%20y='56'%20width='9'%20height='7'%20rx='1'%20fill='%2372ffab'%20opacity='0.55'/%3E%3Crect%20x='131'%20y='56'%20width='6'%20height='7'%20rx='1'%20fill='%2372ffab'%20opacity='0.32'/%3E%3Cpath%20d='M76%2053%20L136%2053'%20stroke='%23eafff4'%20stroke-opacity='0.35'%20stroke-width='1'/%3E%3Crect%20x='70'%20y='78'%20width='72'%20height='74'%20rx='4'%20fill='%23061710'/%3E%3Crect%20x='70'%20y='78'%20width='72'%20height='74'%20rx='4'%20fill='none'%20stroke='%232a6444'%20stroke-opacity='0.5'%20stroke-width='1'/%3E%3Cg%3E%3Crect%20x='74'%20y='82'%20width='18'%20height='14'%20rx='2.5'%20fill='url(%23keylit)'/%3E%3Crect%20x='96'%20y='82'%20width='18'%20height='14'%20rx='2.5'%20fill='url(%23keylit)'/%3E%3Crect%20x='118'%20y='82'%20width='18'%20height='14'%20rx='2.5'%20fill='url(%23keylit)'/%3E%3Crect%20x='74'%20y='100'%20width='18'%20height='14'%20rx='2.5'%20fill='url(%23keylit)'/%3E%3Crect%20x='118'%20y='100'%20width='18'%20height='14'%20rx='2.5'%20fill='url(%23keylit)'/%3E%3Crect%20x='74'%20y='118'%20width='18'%20height='14'%20rx='2.5'%20fill='url(%23keylit)'/%3E%3Crect%20x='96'%20y='118'%20width='18'%20height='14'%20rx='2.5'%20fill='url(%23keylit)'/%3E%3Crect%20x='118'%20y='118'%20width='18'%20height='14'%20rx='2.5'%20fill='url(%23keylit)'/%3E%3Crect%20x='74'%20y='136'%20width='18'%20height='14'%20rx='2.5'%20fill='url(%23keylit)'/%3E%3Crect%20x='96'%20y='136'%20width='18'%20height='14'%20rx='2.5'%20fill='url(%23keylit)'/%3E%3Crect%20x='118'%20y='136'%20width='18'%20height='14'%20rx='2.5'%20fill='url(%23keylit)'/%3E%3C/g%3E%3Cg%20fill='%23052012'%20fill-opacity='0.82'%20font-family='Osaka-Mono,MS%20Gothic,monospace'%20font-size='8'%20text-anchor='middle'%3E%3Ctext%20x='83'%20y='92'%3E1%3C/text%3E%3Ctext%20x='105'%20y='92'%3E2%3C/text%3E%3Ctext%20x='127'%20y='92'%3E3%3C/text%3E%3Ctext%20x='83'%20y='110'%3E4%3C/text%3E%3Ctext%20x='127'%20y='110'%3E6%3C/text%3E%3Ctext%20x='83'%20y='128'%3E7%3C/text%3E%3Ctext%20x='105'%20y='128'%3E8%3C/text%3E%3Ctext%20x='127'%20y='128'%3E9%3C/text%3E%3Ctext%20x='83'%20y='146'%3E%2A%3C/text%3E%3Ctext%20x='105'%20y='146'%3E0%3C/text%3E%3Ctext%20x='127'%20y='146'%3E%23%3C/text%3E%3C/g%3E%3Cg%20fill='%23eafff4'%20fill-opacity='0.28'%3E%3Crect%20x='75'%20y='83'%20width='16'%20height='2'%20rx='1'/%3E%3Crect%20x='97'%20y='83'%20width='16'%20height='2'%20rx='1'/%3E%3Crect%20x='119'%20y='83'%20width='16'%20height='2'%20rx='1'/%3E%3Crect%20x='75'%20y='101'%20width='16'%20height='2'%20rx='1'/%3E%3Crect%20x='119'%20y='101'%20width='16'%20height='2'%20rx='1'/%3E%3Crect%20x='75'%20y='119'%20width='16'%20height='2'%20rx='1'/%3E%3Crect%20x='97'%20y='119'%20width='16'%20height='2'%20rx='1'/%3E%3Crect%20x='119'%20y='119'%20width='16'%20height='2'%20rx='1'/%3E%3Crect%20x='75'%20y='137'%20width='16'%20height='2'%20rx='1'/%3E%3Crect%20x='97'%20y='137'%20width='16'%20height='2'%20rx='1'/%3E%3Crect%20x='119'%20y='137'%20width='16'%20height='2'%20rx='1'/%3E%3C/g%3E%3Cellipse%20cx='105'%20cy='107'%20rx='19'%20ry='15'%20fill='url(%23keybloom)'%20opacity='0.7'/%3E%3Crect%20x='96'%20y='100'%20width='18'%20height='14'%20rx='2.5'%20fill='url(%23keyhot)'%20stroke='%23ffffff'%20stroke-opacity='0.85'%20stroke-width='1'/%3E%3Ctext%20x='105'%20y='110.5'%20font-family='Osaka-Mono,MS%20Gothic,monospace'%20font-size='9'%20text-anchor='middle'%20fill='%23073016'%20fill-opacity='0.9'%3E5%3C/text%3E%3Crect%20x='97'%20y='101'%20width='14'%20height='2.4'%20rx='1'%20fill='%23ffffff'%20fill-opacity='0.55'/%3E%3Crect%20x='70'%20y='158'%20width='72'%20height='4'%20rx='2'%20fill='%23010604'/%3E%3Crect%20x='72'%20y='158.5'%20width='68'%20height='1'%20rx='0.5'%20fill='%234a9a6c'%20opacity='0.5'/%3E%3Crect%20x='82'%20y='168'%20width='44'%20height='30'%20rx='3'%20fill='url(%23coin)'%20stroke='%23246a44'%20stroke-opacity='0.7'%20stroke-width='0.8'/%3E%3Crect%20x='84'%20y='170'%20width='40'%20height='2'%20rx='1'%20fill='%237fe0a8'%20opacity='0.3'/%3E%3Crect%20x='92'%20y='188'%20width='24'%20height='5'%20rx='2'%20fill='%23010503'/%3E%3Crect%20x='92'%20y='188'%20width='24'%20height='1.5'%20rx='0.7'%20fill='%234a9a6c'%20opacity='0.45'/%3E%3Crect%20x='72'%20y='208'%20width='66'%20height='2'%20rx='1'%20fill='%23163a26'/%3E%3Crect%20x='72'%20y='214'%20width='52'%20height='2'%20rx='1'%20fill='%23122f21'/%3E%3Ctext%20x='106'%20y='238'%20font-family='Osaka-Mono,MS%20Gothic,monospace'%20font-size='9'%20letter-spacing='3.5'%20text-anchor='middle'%20fill='%23a6ffcb'%20fill-opacity='0.72'%3EHARDLINE%3C/text%3E%3Crect%20x='73'%20y='231'%20width='66'%20height='9'%20rx='2'%20fill='none'%20stroke='%2357ff9a'%20stroke-opacity='0.22'%20stroke-width='0.7'/%3E%3Crect%20x='24'%20y='56'%20width='26'%20height='128'%20rx='9'%20fill='%23122f21'/%3E%3Cpath%20d='M30%2062%20L30%20178'%20stroke='%23040d08'%20stroke-width='2'%20opacity='0.8'/%3E%3Cellipse%20cx='38'%20cy='68'%20rx='9'%20ry='6'%20fill='%23030b07'/%3E%3Cellipse%20cx='38'%20cy='172'%20rx='9'%20ry='6'%20fill='%23030b07'/%3E%3Crect%20x='14'%20y='54'%20width='26'%20height='132'%20rx='12'%20fill='url(%23recv)'/%3E%3Cellipse%20cx='27'%20cy='64'%20rx='13'%20ry='10'%20fill='url(%23bake)'/%3E%3Cellipse%20cx='27'%20cy='176'%20rx='13'%20ry='10'%20fill='url(%23bake)'/%3E%3Ccircle%20cx='27'%20cy='64'%20r='6.5'%20fill='%23020a06'/%3E%3Ccircle%20cx='27'%20cy='176'%20r='6.5'%20fill='%23020a06'/%3E%3Cg%3E%3Ccircle%20cx='23'%20cy='62'%20r='0.9'%20fill='%2366e69a'%20opacity='0.28'/%3E%3Ccircle%20cx='30'%20cy='62'%20r='0.9'%20fill='%2366e69a'%20opacity='0.28'/%3E%3Ccircle%20cx='27'%20cy='66'%20r='0.9'%20fill='%2366e69a'%20opacity='0.28'/%3E%3Ccircle%20cx='23'%20cy='174'%20r='0.9'%20fill='%2366e69a'%20opacity='0.28'/%3E%3Ccircle%20cx='30'%20cy='174'%20r='0.9'%20fill='%2366e69a'%20opacity='0.28'/%3E%3Ccircle%20cx='27'%20cy='178'%20r='0.9'%20fill='%2366e69a'%20opacity='0.28'/%3E%3C/g%3E%3Cpath%20d='M17%2058%20Q12%20120%2015%20182'%20fill='none'%20stroke='%23d6ffe8'%20stroke-opacity='0.8'%20stroke-width='2'%20stroke-linecap='round'/%3E%3Cellipse%20cx='20'%20cy='72'%20rx='3.5'%20ry='9'%20fill='%23f4fff7'%20opacity='0.4'/%3E%3Cpath%20d='M27%20186%20q-10%208%20-1%2015%20q11%206%201%2014%20q-11%206%20-1%2014%20q11%206%201%2014%20q-11%206%200%2013%20q11%207%2016%205%20l20%20-1'%20fill='none'%20stroke='%23020a06'%20stroke-width='4'%20stroke-linecap='round'/%3E%3Cpath%20d='M27%20186%20q-10%208%20-1%2015%20q11%206%201%2014%20q-11%206%20-1%2014%20q11%206%201%2014%20q-11%206%200%2013'%20fill='none'%20stroke='%2372ffab'%20stroke-opacity='0.4'%20stroke-width='1.1'%20stroke-linecap='round'/%3E%3Cellipse%20cx='58'%20cy='150'%20rx='40'%20ry='128'%20fill='%2357ff9a'%20opacity='0.06'/%3E%3C/svg%3E") center bottom / contain no-repeat;
}

/* ═══ THE WHITE RABBIT — bolts out of the lane's edge into the left wall
   of rain, six steps() teleport hops (≈1.4 hops/s, NOT a continuous
   mover — no will-change spent), then gone for half a minute. */
head::after {
  content: "";
  display: var(--cipher-scenery, block);
  position: fixed;
  left: 4vw;
  bottom: 2.5vh;
  width: 46px;
  height: 50px;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  background: url("data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2052%2056'%3E%3Cellipse%20cx%3D'24'%20cy%3D'36'%20rx%3D'20'%20ry%3D'16'%20fill%3D'%23f4fff7'%20opacity%3D'.1'%2F%3E%3Cellipse%20cx%3D'23'%20cy%3D'52'%20rx%3D'15'%20ry%3D'2.4'%20fill%3D'%2357ff9a'%20opacity%3D'.18'%2F%3E%3Cpath%20d%3D'M33%2012%20Q31%202%2036%201%20Q40%201%2038%2012%20L36%2018%20Z'%20fill%3D'%23f4fff7'%2F%3E%3Cpath%20d%3D'M27%2013%20Q22%204%2026%202%20Q30%201%2031%2012%20L30%2018%20Z'%20fill%3D'%23eafcf0'%2F%3E%3Ccircle%20cx%3D'33'%20cy%3D'22'%20r%3D'7'%20fill%3D'%23f4fff7'%2F%3E%3Cpath%20d%3D'M39.5%2021.5%20Q42%2022%2041%2024'%20fill%3D'none'%20stroke%3D'%23eafcf0'%20stroke-width%3D'1.2'%20stroke-linecap%3D'round'%2F%3E%3Cellipse%20cx%3D'22'%20cy%3D'36'%20rx%3D'13'%20ry%3D'10.5'%20fill%3D'%23f4fff7'%2F%3E%3Ccircle%20cx%3D'14'%20cy%3D'38'%20r%3D'9'%20fill%3D'%23ffffff'%2F%3E%3Ccircle%20cx%3D'8'%20cy%3D'34'%20r%3D'3.2'%20fill%3D'%23ffffff'%2F%3E%3Cellipse%20cx%3D'30'%20cy%3D'47.5'%20rx%3D'7'%20ry%3D'3'%20fill%3D'%23eafcf0'%2F%3E%3Cellipse%20cx%3D'14'%20cy%3D'48.5'%20rx%3D'5.5'%20ry%3D'2.6'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E") center / contain no-repeat;
  animation: cipher-rabbit 36s steps(1, end) infinite;
}

/* ═══ THE MESSAGE — once a cycle the rain stops being noise: a phrase
   materializes low in the left gutter in white-hot lead-glyph light,
   holds a breath, and is gone before you're sure you read it. Timed to
   PRECEDE the rabbit's dash on the same 36s clock (message ~27-38%,
   rabbit bolts at 60%), so the two beats read as one story: the code
   speaks, then the rabbit runs. steps(1) opacity only, ~7 paints per
   36s — not a continuous mover, no will-change spent. */
head link { display: var(--cipher-scenery, block); }
head link::before {
  content: "follow the white rabbit.";
  display: var(--cipher-scenery, block);
  position: fixed;
  left: 3vw;
  top: 60vh;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  font-family: var(--cipher-mono);
  font-size: 1rem;
  letter-spacing: 0.3em;
  text-transform: lowercase;
  white-space: nowrap;
  color: var(--cipher-white);
  text-shadow:
    0 0 3px rgba(244, 255, 247, 0.9),
    0 0 14px rgba(87, 255, 154, 0.55),
    0 0 34px rgba(87, 255, 154, 0.3),
    var(--credits-shadow);
  animation: cipher-message 36s steps(1, end) infinite;
}

/* ═══ landing pools: the rain accumulates as soft light on the gutter
   floors — coarse, low alpha, static. */
head meta { display: var(--cipher-scenery, block); }
head meta:first-of-type::before {
  content: "";
  display: var(--cipher-scenery, block);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 20vh;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background:
    radial-gradient(ellipse 19vw 10vh at 8% 100%, rgba(87, 255, 154, 0.2), rgba(87, 255, 154, 0) 74%),
    radial-gradient(ellipse 19vw 10vh at 92% 100%, rgba(87, 255, 154, 0.2), rgba(87, 255, 154, 0) 74%),
    linear-gradient(180deg, rgba(0, 3, 2, 0) 0%, rgba(0, 3, 2, 0.4) 100%);
}

/* ═══ corner HUD tags: the construct's chrome, pinned in the top corners
   (corners are L6-legal), dim mono, static. */
head meta:first-of-type::after {
  content: "\\25C9  construct 7y-11 :: online";
  display: var(--cipher-scenery, block);
  position: fixed;
  top: 2.4vh;
  left: 1.6vw;
  z-index: 0;
  pointer-events: none;
  font-family: var(--cipher-mono);
  font-size: 0.62rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: rgba(190, 255, 216, 0.9);
  padding: 0.42em 0.85em 0.42em 0.72em;
  border-left: 2px solid rgba(87, 255, 154, 0.8);
  border-top: 1px solid rgba(87, 255, 154, 0.28);
  border-right: 1px solid rgba(87, 255, 154, 0.18);
  border-bottom: 1px solid rgba(87, 255, 154, 0.28);
  border-radius: 2px;
  /* solid plate so the rain wall can never punch bright glyphs through the
     tag: a near-opaque dark fill + a faint phosphor tint, promoted so it
     composites cleanly above the scenery */
  background:
    linear-gradient(90deg, rgba(87, 255, 154, 0.12), rgba(87, 255, 154, 0.02) 92%),
    linear-gradient(0deg, rgba(1, 8, 5, 0.94), rgba(1, 8, 5, 0.94));
  box-shadow: 0 0 14px rgba(0, 4, 2, 0.9), inset 0 0 12px rgba(0, 6, 3, 0.6);
  text-shadow: 0 0 8px rgba(87, 255, 154, 0.35), 0 1px 3px rgba(0, 4, 2, 0.95);
}
head meta:last-of-type::before {
  content: "trace rt :: 312.555.0690  \\25C9";
  display: var(--cipher-scenery, block);
  position: fixed;
  top: 2.4vh;
  right: 1.6vw;
  z-index: 0;
  pointer-events: none;
  font-family: var(--cipher-mono);
  font-size: 0.62rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: rgba(190, 255, 216, 0.9);
  padding: 0.42em 0.72em 0.42em 0.85em;
  border-right: 2px solid rgba(87, 255, 154, 0.8);
  border-top: 1px solid rgba(87, 255, 154, 0.28);
  border-left: 1px solid rgba(87, 255, 154, 0.18);
  border-bottom: 1px solid rgba(87, 255, 154, 0.28);
  border-radius: 2px;
  background:
    linear-gradient(270deg, rgba(87, 255, 154, 0.12), rgba(87, 255, 154, 0.02) 92%),
    linear-gradient(0deg, rgba(1, 8, 5, 0.94), rgba(1, 8, 5, 0.94));
  box-shadow: 0 0 14px rgba(0, 4, 2, 0.9), inset 0 0 12px rgba(0, 6, 3, 0.6);
  text-shadow: 0 0 8px rgba(87, 255, 154, 0.35), 0 1px 3px rgba(0, 4, 2, 0.95);
}

/* ═══ the hardline rings: a small glow over the phone double-pulses on a
   10s ring cadence — steps(1), ~4 paints/s inside the pulse (small box,
   under the 5/s ceiling), dark the rest of the cycle. */
head meta:last-of-type::after {
  content: "";
  display: var(--cipher-scenery, block);
  position: fixed;
  right: calc(3.4vw + 28px);
  bottom: calc(3vh + 205px);
  width: 130px;
  height: 130px;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  background: radial-gradient(circle closest-side, rgba(143, 255, 190, 0.35), rgba(143, 255, 190, 0.1) 55%, rgba(143, 255, 190, 0) 100%);
  animation: cipher-ring 10s steps(1, end) infinite;
}

/* ═══ SHINE LAYER — data-glints riding the roll. Because this pseudo is a
   child of .credits-roll it scrolls WITH the tracked glyphs (zero slide =
   zero flicker → L6-legal by clause (b)), so it can carry both coarse soft
   glints AND a few crisp specular star-points without ever twinkling.
   The soft glints (≥60px, gentle falloff) read as luminous residue catching
   the operator's beam; the star-points are the sparkle proper — tiny
   phosphor specks with a cross-flare, kept to the gutter margins of each
   tile so they sit off the names, and drifting past because they ride. */
.credits-roll::before,
.credits-slideshow::before {
  content: "";
  display: var(--cipher-scenery, block);
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.85;
  background-image:
    /* coarse soft glints — big, gentle, ambient shine catching the beam */
    radial-gradient(circle 60px at 20% 16%, rgba(87, 255, 154, 0.1), rgba(87, 255, 154, 0) 70%),
    radial-gradient(circle 72px at 82% 44%, rgba(180, 255, 206, 0.09), rgba(180, 255, 206, 0) 70%),
    radial-gradient(circle 64px at 30% 74%, rgba(87, 255, 154, 0.08), rgba(87, 255, 154, 0) 70%),
    /* specular sparkle-points: a bright hot core inside a soft halo — a few,
       sparse, pinned to the gutter margins (7-14% / 86-93%) so they never
       overlap the center names, and riding the roll so they can only drift,
       never twinkle (L6-clean). Each is a compact soft dot, NOT a full-width
       stripe — so no grid-lines cross the frame. */
    radial-gradient(circle 9px at 8% 28%, rgba(230, 255, 240, 0.55) 0%, rgba(230, 255, 240, 0.14) 24%, rgba(230, 255, 240, 0) 62%),
    radial-gradient(circle 7px at 91% 62%, rgba(180, 255, 206, 0.5) 0%, rgba(180, 255, 206, 0.12) 26%, rgba(180, 255, 206, 0) 64%),
    radial-gradient(circle 6px at 13% 88%, rgba(230, 255, 240, 0.5) 0%, rgba(230, 255, 240, 0.12) 26%, rgba(230, 255, 240, 0) 64%);
  background-repeat: repeat;
  background-size:
    540px 620px, 660px 760px, 600px 700px,
    540px 620px, 660px 760px, 600px 700px;
}

/* ═══ sector ledger: every block is a decrypted sector ═══ */
.credits-block,
.credits-slide:not(.flourish) { counter-increment: cipher-sector; }

/* titles: Rajdhani caps tracked wide, phosphor green with a soft bloom;
   a mono eyebrow prints the sector address above, and the base gold rule
   becomes a katakana decode strip (SVG, block-local — it rides the roll). */
.credits-block__title {
  position: relative;
  font-weight: 700;
  letter-spacing: 0.3em;
  padding-left: 0.3em;
  color: var(--cipher-green);
  text-shadow: 0 0 26px rgba(87, 255, 154, 0.4), 0 0 6px rgba(87, 255, 154, 0.25), var(--credits-shadow);
  margin: 0 0 1.35rem;
}
.credits-block__title::before {
  content: "sector 0x" counter(cipher-sector, cipher-hex) " · decrypted";
  display: block;
  font-family: var(--cipher-mono);
  font-weight: 400;
  font-size: 0.68rem;
  letter-spacing: 0.4em;
  padding-left: 0.4em;
  margin-bottom: 0.7rem;
  text-transform: lowercase;
  color: rgba(143, 255, 190, 0.55);
  text-shadow: 0 0 10px rgba(87, 255, 154, 0.25), var(--credits-shadow);
}
.credits-block__title::after {
  width: min(244px, 56vw);
  height: 18px;
  margin: 0.75rem auto 0;
  opacity: 1;
  background:
    url("data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20244%2018'%3E%3Cg%20font-family%3D'Osaka-Mono%2CMS%20Gothic%2CMeiryo%2Cmonospace'%3E%3Ctext%20x%3D'12'%20y%3D'14'%20font-size%3D'14'%20text-anchor%3D'middle'%20fill%3D'%2357ff9a'%20fill-opacity%3D'0.2'%3E%26%23xFF98%3B%3C%2Ftext%3E%3Ctext%20x%3D'34'%20y%3D'14'%20font-size%3D'14'%20text-anchor%3D'middle'%20fill%3D'%2357ff9a'%20fill-opacity%3D'0.3'%3E%26%23xFF7B%3B%3C%2Ftext%3E%3Ctext%20x%3D'56'%20y%3D'14'%20font-size%3D'14'%20text-anchor%3D'middle'%20fill%3D'%2357ff9a'%20fill-opacity%3D'0.45'%3E%26%23xFF83%3B%3C%2Ftext%3E%3Ctext%20x%3D'78'%20y%3D'14'%20font-size%3D'14'%20text-anchor%3D'middle'%20fill%3D'%2357ff9a'%20fill-opacity%3D'0.62'%3E%26%23xFF71%3B%3C%2Ftext%3E%3Ctext%20x%3D'100'%20y%3D'14'%20font-size%3D'14'%20text-anchor%3D'middle'%20fill%3D'%2357ff9a'%20fill-opacity%3D'0.82'%3E0%3C%2Ftext%3E%3Ctext%20x%3D'122'%20y%3D'14'%20font-size%3D'14'%20text-anchor%3D'middle'%20fill%3D'%23f4fff7'%20fill-opacity%3D'1'%3E%26%23xFF8A%3B%3C%2Ftext%3E%3Ctext%20x%3D'144'%20y%3D'14'%20font-size%3D'14'%20text-anchor%3D'middle'%20fill%3D'%2357ff9a'%20fill-opacity%3D'0.82'%3E%26%23xFF9B%3B%3C%2Ftext%3E%3Ctext%20x%3D'166'%20y%3D'14'%20font-size%3D'14'%20text-anchor%3D'middle'%20fill%3D'%2357ff9a'%20fill-opacity%3D'0.62'%3E1%3C%2Ftext%3E%3Ctext%20x%3D'188'%20y%3D'14'%20font-size%3D'14'%20text-anchor%3D'middle'%20fill%3D'%2357ff9a'%20fill-opacity%3D'0.45'%3E%26%23xFF85%3B%3C%2Ftext%3E%3Ctext%20x%3D'210'%20y%3D'14'%20font-size%3D'14'%20text-anchor%3D'middle'%20fill%3D'%2357ff9a'%20fill-opacity%3D'0.3'%3E%26%23xFF92%3B%3C%2Ftext%3E%3Ctext%20x%3D'232'%20y%3D'14'%20font-size%3D'14'%20text-anchor%3D'middle'%20fill%3D'%2357ff9a'%20fill-opacity%3D'0.2'%3E%26%23xFF73%3B%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fsvg%3E") center / 244px 18px no-repeat,
    linear-gradient(90deg, rgba(87, 255, 154, 0) 0%, rgba(87, 255, 154, 0.4) 30%, rgba(87, 255, 154, 0) 46%, rgba(87, 255, 154, 0) 54%, rgba(87, 255, 154, 0.4) 70%, rgba(87, 255, 154, 0) 100%) center bottom / 100% 1px no-repeat;
}

/* ═══ rows: the extraction log. Names are the signal — clean white with a
   quiet green halo, never clipped; amounts are the payload in phosphor
   mono behind a :: delimiter. */
.credit {
  max-width: min(40rem, 88vw);
  margin-inline: auto;
  min-width: 0;
  overflow-wrap: anywhere;
  font-weight: 500;
  letter-spacing: 0.02em;
}
.credit__name {
  color: var(--cipher-white);
  text-shadow: 0 0 16px rgba(87, 255, 154, 0.3), 0 0 2px rgba(244, 255, 247, 0.4), var(--credits-shadow);
}
.credit__amount {
  opacity: 1;
  font-family: var(--cipher-mono);
  font-size: 0.74em;
  letter-spacing: 0.1em;
  color: var(--cipher-green);
  font-variant-numeric: tabular-nums;
  text-shadow: 0 0 10px rgba(87, 255, 154, 0.3), var(--credits-shadow);
}
.credit__amount::before {
  content: " :: ";
  color: rgba(87, 255, 154, 0.45);
}

/* ═══ flourish cards ═══ */
.flourish--intro { gap: 1.2rem; }

/* badge -> the operator's trace header (copy swap via font-size:0 + ::after) */
.flourish__badge { font-size: 0; border: 0; border-radius: 0; padding: 0; box-shadow: none; }
.flourish__badge::after {
  content: "call trans opt : received";
  display: inline-block;
  font-family: var(--cipher-mono);
  font-size: 0.8rem;
  letter-spacing: 0.4em;
  padding-left: 0.4em;
  text-transform: lowercase;
  color: rgba(143, 255, 190, 0.75);
  text-shadow: 0 0 12px rgba(87, 255, 154, 0.35), var(--credits-shadow);
}

/* the streamer's title is the lead glyph: burned white-hot with a layered
   phosphor bloom — tight white core, mid green halo, wide atmospheric glow —
   sitting on a CRT scanline plate that rides with the text (font-local, so
   the fine lines never sit screen-fixed over the lane: L6-safe). */
.flourish--intro .flourish__title {
  position: relative;
  font-weight: 700;
  letter-spacing: 0.06em;
  line-height: 1.05;
  max-width: min(88vw, 13em);
  padding: 0.18em 0.5em;
  color: var(--cipher-white);
  text-shadow:
    0 0 2px rgba(244, 255, 247, 0.85),
    0 0 7px rgba(180, 255, 206, 0.6),
    0 0 20px rgba(87, 255, 154, 0.45),
    0 0 46px rgba(87, 255, 154, 0.35),
    0 0 80px rgba(57, 200, 120, 0.22),
    var(--credits-shadow);
}
/* recessed monitor plate behind the lead glyph: soft phosphor pool + a
   scanline weave, both riding the roll (moves with the text → no flicker) */
.flourish--intro .flourish__title::before {
  content: "";
  position: absolute;
  inset: -0.15em -0.1em;
  z-index: -1;
  pointer-events: none;
  border-radius: 4px;
  /* Two stacked backgrounds: a scanline weave that reads as a monitor surface
     (gated by --cipher-scenery so transparent/OBS runs never get dark bands),
     and an always-on phosphor pool that lifts the title everywhere. The weave
     is coarsened to a 6px period + very low alpha so, riding the roll, it can
     never shimmer or moiré against the pixel grid (L6 stays clean). */
  background:
    /* a broad specular sweep raking across the monitor glass — a static
       diagonal gleam that rides the roll with the title (no screen-fixed
       fine pattern → L6-safe), reading as light glancing off the screen */
    linear-gradient(114deg, rgba(0, 0, 0, 0) 28%, rgba(214, 255, 232, 0.18) 42%, rgba(244, 255, 247, 0.3) 50%, rgba(214, 255, 232, 0.16) 58%, rgba(0, 0, 0, 0) 72%),
    repeating-linear-gradient(0deg, rgba(0, 5, 3, var(--cipher-scan, 0.14)) 0px, rgba(0, 5, 3, var(--cipher-scan, 0.14)) 3px, rgba(0, 0, 0, 0) 3px, rgba(0, 0, 0, 0) 6px),
    radial-gradient(ellipse 80% 120% at 50% 50%, rgba(87, 255, 154, 0.12) 0%, rgba(87, 255, 154, 0.04) 45%, rgba(0, 0, 0, 0) 78%);
  -webkit-mask-image: radial-gradient(ellipse 90% 130% at 50% 50%, #000 40%, transparent 82%);
  mask-image: radial-gradient(ellipse 90% 130% at 50% 50%, #000 40%, transparent 82%);
}

/* streamer tagline: restyle only — quiet mono transmission */
.flourish__tagline {
  font-family: var(--cipher-mono);
  font-style: normal;
  font-size: 0.92rem;
  letter-spacing: 0.3em;
  padding-left: 0.3em;
  color: rgba(180, 255, 206, 0.66);
  text-shadow: 0 0 10px rgba(87, 255, 154, 0.2), var(--credits-shadow);
}

/* rating -> the running trace (copy swap) */
.flourish__rating { font-size: 0; border: 0; padding: 0; opacity: 1; }
.flourish__rating::after {
  content: "trace program : running";
  display: inline-block;
  font-family: var(--cipher-mono);
  font-size: 0.72rem;
  letter-spacing: 0.34em;
  padding: 0.55em 0.9em 0.55em 1.24em;
  text-transform: lowercase;
  color: var(--cipher-green);
  border: 1px solid rgba(87, 255, 154, 0.4);
  border-radius: 2px;
  background: rgba(87, 255, 154, 0.05);
  box-shadow: 0 0 16px rgba(87, 255, 154, 0.15);
  text-shadow: 0 0 10px rgba(87, 255, 154, 0.4);
}

/* fine print under the intro card */
.flourish--intro::after {
  content: "wake up — the stream has you";
  display: var(--cipher-scenery, block);
  font-family: var(--cipher-mono);
  font-size: 0.66rem;
  letter-spacing: 0.34em;
  padding-left: 0.34em;
  text-transform: lowercase;
  color: rgba(143, 255, 190, 0.35);
}

/* ═══ raid finale: the code notices you. A white flash burns WAKE UP above
   the title on a steps() flicker (~1.25 paints/s — the only animation
   inside the roll, under the 2/s ceiling); the title itself goes white-hot
   and the names catch the flash. */
.credits-block:nth-last-of-type(2) .credits-block__title,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
  color: var(--cipher-white);
  text-shadow: 0 0 34px rgba(87, 255, 154, 0.6), 0 0 10px rgba(244, 255, 247, 0.4), var(--credits-shadow);
}
.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  content: "WAKE UP";
  font-family: var(--credits-title-font);
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.72em;
  padding-left: 0.72em;
  margin-bottom: 0.45rem;
  text-transform: uppercase;
  color: #ffffff;
  text-shadow: 0 0 30px rgba(244, 255, 247, 0.9), 0 0 10px rgba(255, 255, 255, 0.6), 0 0 4px rgba(87, 255, 154, 0.6), var(--credits-shadow);
  animation: cipher-wake 1.6s steps(1, end) infinite;
}
.credits-block:nth-last-of-type(2) {
  background: radial-gradient(ellipse 56% 60% at 50% 34%, rgba(180, 255, 206, 0.13), rgba(180, 255, 206, 0) 72%);
}
.credits-slide:nth-last-of-type(2):not(.flourish) {
  background: radial-gradient(ellipse 60% 56% at 50% 46%, rgba(180, 255, 206, 0.11), rgba(180, 255, 206, 0) 78%);
}
.credits-block:nth-last-of-type(2) .credit,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit {
  font-size: calc(var(--credits-name-size) * 1.1);
}
.credits-block:nth-last-of-type(2) .credit__name,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__name {
  text-shadow: 0 0 22px rgba(87, 255, 154, 0.45), 0 0 3px rgba(244, 255, 247, 0.5), var(--credits-shadow);
}

/* ═══ outro: the admission (copy swaps) ═══ */
.flourish--outro .flourish__title { font-size: 0; }
.flourish--outro .flourish__title::after {
  content: "THERE IS NO STREAM";
  font-family: var(--credits-title-font);
  font-weight: 700;
  font-size: calc(var(--credits-flourish-title-size) * 0.86);
  letter-spacing: 0.1em;
  line-height: 1.1;
  color: var(--cipher-white);
  text-shadow:
    0 0 2px rgba(244, 255, 247, 0.85),
    0 0 7px rgba(180, 255, 206, 0.6),
    0 0 20px rgba(87, 255, 154, 0.45),
    0 0 46px rgba(87, 255, 154, 0.35),
    0 0 80px rgba(57, 200, 120, 0.22),
    var(--credits-shadow);
}
.flourish--outro .flourish__tagline { font-size: 0; }
.flourish--outro .flourish__tagline::after {
  content: "the simulation ends — the gratitude was real";
  font-family: var(--cipher-mono);
  font-size: 0.9rem;
  letter-spacing: 0.26em;
  padding-left: 0.26em;
  text-transform: lowercase;
  color: rgba(180, 255, 206, 0.7);
  text-shadow: 0 0 10px rgba(87, 255, 154, 0.2), var(--credits-shadow);
}
/* the last thing the modem says — the one red accent in the theme */
.flourish--outro::after {
  content: "+++ carrier lost";
  display: var(--cipher-scenery, block);
  font-family: var(--cipher-mono);
  font-size: 0.7rem;
  letter-spacing: 0.4em;
  padding: 0.4rem 0.6rem 0.4rem 1rem;
  margin-top: 0.7rem;
  text-transform: lowercase;
  color: rgba(255, 107, 94, 0.8);
  border: 1px solid rgba(255, 107, 94, 0.35);
  border-radius: 2px;
  text-shadow: 0 0 10px rgba(255, 107, 94, 0.35);
}

/* ═══ slideshow: each slide decodes into place — small one-shot
   opacity/transform settle on top of the base fade. */
.credits-slide {
  transform: translateY(10px);
  transition: opacity 0.7s ease, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}
.credits-slide.is-active { transform: none; }

/* ═══ keyframes (all cipher- prefixed; transform/opacity ONLY) ═══ */
/* rain walls: travel exactly one tile period in glyph-cell hops, so the
   loop wrap is invisible — steps(N, end) lands back on frame zero */
@keyframes cipher-rain-a {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(0, 384px, 0); }
}
@keyframes cipher-rain-b {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(0, 336px, 0); }
}
/* the rabbit: six discrete bounds from the lane edge into the rain wall,
   then nothing — you start to wonder if you saw it at all */
@keyframes cipher-rabbit {
  0%, 59% { transform: translate3d(240px, 0, 0); opacity: 0; }
  60%     { transform: translate3d(240px, 0, 0); opacity: 0.95; }
  62%     { transform: translate3d(196px, -8px, 0); opacity: 0.95; }
  64%     { transform: translate3d(152px, 0, 0); opacity: 0.9; }
  66%     { transform: translate3d(108px, -8px, 0); opacity: 0.85; }
  68%     { transform: translate3d(64px, 0, 0); opacity: 0.7; }
  70%     { transform: translate3d(20px, -6px, 0); opacity: 0.5; }
  72%, 100% { transform: translate3d(0, 0, 0); opacity: 0; }
}
/* the hardline: ring-ring… silence. Two pulses at the top of each 10s
   cycle (4 opacity holds in 0.9s ≈ 4.4/s — small box, under the ceiling) */
@keyframes cipher-ring {
  0%, 85% { opacity: 0; }
  86%     { opacity: 0.9; }
  89%     { opacity: 0; }
  92%     { opacity: 0.9; }
  95%, 100% { opacity: 0; }
}
/* the message: flickers on like a failing tube, holds ~4s, cuts out —
   then the rabbit runs at 60% of the same shared 36s clock */
@keyframes cipher-message {
  0%, 26%   { opacity: 0; }
  27%       { opacity: 0.4; }
  28%       { opacity: 0.08; }
  29%       { opacity: 0.85; }
  30%, 37%  { opacity: 0.95; }
  38%       { opacity: 0.25; }
  39%, 100% { opacity: 0; }
}
/* WAKE UP: two discrete drops per 1.6s = 1.25 paints/s (L5-legal) */
@keyframes cipher-wake {
  0%, 55%  { opacity: 1; }
  60%, 72% { opacity: 0.15; }
  78%, 100% { opacity: 1; }
}

/* ═══ reduced motion: the code holds still — both rain walls freeze
   mid-fall (fully visible), the rabbit sits parked at the lane edge,
   the phone light burns steady, WAKE UP stays lit. */
@media (prefers-reduced-motion: reduce) {
  html::after { animation: none; }
  body::before { animation: none; }
  head link::before { animation: none; opacity: 0.85; }
  head::after { animation: none; opacity: 0.85; transform: translate3d(120px, 0, 0); }
  head meta:last-of-type::after { animation: none; opacity: 0.4; }
  .credits-block:nth-last-of-type(2) .credits-block__title::before,
  .credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
    animation: none;
  }
  .credits-slide { transform: none; transition: opacity 0.8s ease; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--cipher-scenery:none;--cipher-scan:0;}",
};
