import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. Victory Fanfare: the final boss is down and the 16-bit menu is open — deep blue windows with white double borders on a quiet overworld night, glove cursors down the party roster, EXP tallies, a LEVEL UP! burst, and SAVE COMPLETE before the screen goes dark. */
export const VARIANT: ThemeVariant = {
  key: "rpg",
  name: "Victory Fanfare",
  css: `
/* ================================================================
   VICTORY FANFARE — layered after the base theme.
   Fiction: the last encounter of tonight's session just ended. The
   party is camped on the overworld at night — a full pixel moon, a
   sleeping kingdom on the far ridge — and the victory menu is open:
   every credits section is a quest turned in, every viewer a party
   member on the roster, every amount an EXP award. The finale is
   the LEVEL UP! screen; the outro is the save prompt.
   The background stays QUIET: the deep-blue menu windows are the
   stars — everything behind them is dim set dressing.
   Layer map (all scenery kill-switched via --rpg-scenery):
     html bg (--credits-bg)   near-black indigo night (one cheap linear)
     html::before             LIGHT STORY — moon bloom upper-left, faint
                              starlight band, horizon glow, ground light
                              pools under chest + crystal, corner
                              vignette. STATIC, promoted
     html::after              THE OVERWORLD — SVG horizon band: far ridge
                              with a castle (lit windows), rolling near
                              hills, pines. STATIC, promoted
     body::before             two huge soft night clouds, upper sky.
                              STATIC, promoted
     head::before             SAVE CRYSTAL — floating gem, lower-right;
                              the ONLY continuous mover (small bob,
                              will-change budget: 1 of 2)
     head::after              TREASURE CHEST — opened, gold light
                              spilling out, lower-left. STATIC, promoted
     meta#1::before           loot glints above the chest — static
                              4-point sparkles
     meta#1::after            twinkle overlay — alternate glints,
                              steps(1) swap ~0.77 paints/s
     meta#2::before           PIXEL MOON — full moon with craters and
                              dither, top-left corner. STATIC, promoted
     meta#2::after            corner status window "GOLD / TIME",
                              top-right — menu chrome, STATIC
     .credits-roll::before    pixel starfield — the only fine pattern,
     .credits-slideshow::before  so it RIDES THE ROLL (static)
   ================================================================ */
@import url('https://fonts.googleapis.com/css2?family=DotGothic16&family=Silkscreen:wght@400;700&display=swap');

:root {
  --rpg-scenery: block; /* set to none to strip every scenery layer */
  /* ── palette: 16-bit menu ── */
  --rpg-white: #f4f6ff;
  --rpg-blue-hi: #3752d6;
  --rpg-blue: #2439b4;
  --rpg-blue-deep: #101c74;
  --rpg-navy: #0a1148;
  --rpg-gold: #ffd257;
  --rpg-gold-deep: #b8821c;
  --rpg-cyan: #8ee6ff;
  --rpg-ink: #2f1d03;

  /* ── base hooks ── */
  /* Quiet night: ONE cheap linear — near-black indigo lifting to a deep
     blue midfield and falling back to black at the ground (L3: all the
     interesting light lives on the promoted html::before). */
  --credits-bg: linear-gradient(180deg, #030614 0%, #050a24 26%, #081030 52%, #0a1334 70%, #060c26 87%, #04071a 100%);
  --credits-color: var(--rpg-white);
  --credits-accent: var(--rpg-gold);
  --credits-font: "DotGothic16", "MS Gothic", "Courier New", monospace;
  --credits-title-font: "Silkscreen", "Courier New", monospace;
  --credits-title-size: clamp(0.95rem, 2.2vw, 1.3rem);
  --credits-name-size: clamp(0.98rem, 2.3vw, 1.35rem);
  --credits-flourish-title-size: clamp(1.9rem, 6vw, 3.7rem);
  --credits-block-gap: 4.75rem;
  --credits-name-gap: 0.5rem;
  /* hard pixel drop, not film blur */
  --credits-shadow: 0.09em 0.09em 0 rgba(5, 9, 34, 0.8);
  /* glow no-op — NEVER "none": base composes "var(--credits-glow),
     var(--credits-shadow)" and a "none" invalidates the whole list. */
  --credits-glow: 0 0 0 rgba(0, 0, 0, 0);
}

/* Full-bleed scenery: html drops the base edge-fade; body keeps it so the
   windows still ease in at the floor and out at the ceiling. */
html { -webkit-mask-image: none; mask-image: none; }
body { background: transparent; }

/* ═══ THE LIGHT STORY — static, promoted (L3). One moon, upper-left: its
   bloom washes that corner, a faint starlight band crosses the sky, the
   horizon breathes a low blue glow, and two warm/cool pools mark where
   the chest light and the save crystal touch the ground. Everything is
   huge, soft, and dim — the menu must stay the brightest thing. */
html::before {
  content: "";
  display: var(--rpg-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* corner vignette — night swallows the edges */
    radial-gradient(ellipse 145% 120% at 50% 34%, rgba(1, 2, 9, 0) 56%, rgba(1, 2, 9, 0.55) 100%),
    /* moon bloom, upper-left */
    radial-gradient(ellipse 30vw 24vh at 10% 9%, rgba(190, 214, 255, 0.12), rgba(190, 214, 255, 0) 70%),
    /* faint starlight band leaning across the sky */
    linear-gradient(112deg, rgba(120, 150, 240, 0) 34%, rgba(120, 150, 240, 0.04) 46%, rgba(160, 185, 255, 0.06) 52%, rgba(120, 150, 240, 0.04) 58%, rgba(120, 150, 240, 0) 70%),
    /* gold pool under the open chest, lower-left */
    radial-gradient(ellipse 24vw 8vh at 10% 97%, rgba(255, 199, 92, 0.16), rgba(255, 199, 92, 0) 72%),
    /* cyan pool under the save crystal, lower-right — brighter + a tight
       contact glow so the gem plants on the ground instead of hovering */
    radial-gradient(ellipse 6vw 1.6vh at 88.5% 90%, rgba(150, 236, 255, 0.3), rgba(150, 236, 255, 0) 74%),
    radial-gradient(ellipse 19vw 8vh at 88% 94%, rgba(120, 226, 255, 0.2), rgba(120, 226, 255, 0) 72%),
    /* the horizon exhales a low blue glow behind the hills */
    linear-gradient(180deg, rgba(90, 130, 255, 0) 66%, rgba(90, 130, 255, 0.05) 84%, rgba(120, 160, 255, 0.09) 100%);
}

/* ═══ THE OVERWORLD — one wide SVG band built in true atmospheric layers:
   a HAZY far ridge (lowest contrast, coolest — distant peaks + a tiny
   watchtower), a MID ridge carrying the sleeping castle (a real keep with
   battlements, flanking towers, a gatehouse + portcullis, two banners, the
   great-hall window still lit warm, moonlit rim on the left faces), NEAR
   rim-lit pine stands, and a thin moat sliver at the base catching a broken
   moon reflection. One committed light: the moon at upper-left rims every
   left face cool-white; windows push warm amber the other way. STATIC,
   promoted. */
html::after {
  content: "";
  display: var(--rpg-scenery, block);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 24vh;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 240' preserveAspectRatio='none'%3E%3Cdefs%3E%3ClinearGradient id='haze' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%231a2a63' stop-opacity='.55'/%3E%3Cstop offset='1' stop-color='%23111d4e' stop-opacity='.75'/%3E%3C/linearGradient%3E%3ClinearGradient id='mid' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%2313215a'/%3E%3Cstop offset='1' stop-color='%230b1440'/%3E%3C/linearGradient%3E%3ClinearGradient id='keepL' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23324a9c'/%3E%3Cstop offset='.5' stop-color='%231c2e74'/%3E%3Cstop offset='1' stop-color='%23111f56'/%3E%3C/linearGradient%3E%3ClinearGradient id='towerL' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%233a54ad'/%3E%3Cstop offset='.55' stop-color='%23213676'/%3E%3Cstop offset='1' stop-color='%23162656'/%3E%3C/linearGradient%3E%3CradialGradient id='hallglow' cx='50%25' cy='50%25' r='60%25'%3E%3Cstop offset='0' stop-color='%23ffd487' stop-opacity='.5'/%3E%3Cstop offset='1' stop-color='%23ffd487' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cpath d='M0 118 Q150 96 300 108 L340 92 380 108 Q520 122 660 104 Q820 84 980 104 Q1140 122 1300 100 Q1440 84 1600 102 L1600 240 L0 240 Z' fill='url(%23haze)'/%3E%3Cg fill='%231d2f6c' opacity='.5'%3E%3Crect x='336' y='78' width='8' height='24'/%3E%3Cpolygon points='333,78 340,68 347,78'/%3E%3Crect x='337' y='84' width='2.4' height='3' fill='%23ffcf7e' opacity='.7'/%3E%3C/g%3E%3Cpath d='M0 118 Q150 96 300 108 L340 92 380 108 Q520 122 660 104 Q820 84 980 104 Q1140 122 1300 100 Q1440 84 1600 102' fill='none' stroke='%234a63bd' stroke-opacity='.28' stroke-width='1.5'/%3E%3Cpath d='M0 150 Q220 128 440 140 Q640 150 840 132 Q1060 112 1280 138 Q1440 156 1600 134 L1600 240 L0 240 Z' fill='url(%23mid)'/%3E%3Cg transform='translate(1088,26)'%3E%3Cellipse cx='118' cy='118' rx='150' ry='30' fill='%23070d2c' opacity='.55'/%3E%3Cg fill='%23131f52'%3E%3Crect x='6' y='72' width='30' height='52'/%3E%3Crect x='210' y='66' width='32' height='58'/%3E%3C/g%3E%3Crect x='6' y='72' width='11' height='52' fill='%232c4290' opacity='.6'/%3E%3Crect x='210' y='66' width='11' height='58' fill='%232c4290' opacity='.6'/%3E%3Cg fill='%230d1740'%3E%3Crect x='4' y='68' width='6' height='6'/%3E%3Crect x='14' y='68' width='6' height='6'/%3E%3Crect x='24' y='68' width='6' height='6'/%3E%3Crect x='32' y='68' width='6' height='6'/%3E%3Crect x='208' y='62' width='6' height='6'/%3E%3Crect x='218' y='62' width='6' height='6'/%3E%3Crect x='228' y='62' width='6' height='6'/%3E%3Crect x='238' y='62' width='6' height='6'/%3E%3C/g%3E%3Crect x='58' y='58' width='60' height='66' fill='url(%23towerL)'/%3E%3Crect x='128' y='58' width='60' height='66' fill='url(%23towerL)'/%3E%3Cg fill='%230d1740'%3E%3Crect x='56' y='52' width='9' height='9'/%3E%3Crect x='71' y='52' width='9' height='9'/%3E%3Crect x='86' y='52' width='9' height='9'/%3E%3Crect x='101' y='52' width='9' height='9'/%3E%3Crect x='111' y='52' width='9' height='9'/%3E%3Crect x='126' y='52' width='9' height='9'/%3E%3Crect x='141' y='52' width='9' height='9'/%3E%3Crect x='156' y='52' width='9' height='9'/%3E%3Crect x='171' y='52' width='9' height='9'/%3E%3Crect x='181' y='52' width='9' height='9'/%3E%3C/g%3E%3Crect x='86' y='16' width='74' height='108' fill='url(%23keepL)'/%3E%3Crect x='86' y='16' width='13' height='108' fill='%233b57b4' opacity='.55'/%3E%3Cg fill='%230b1338'%3E%3Crect x='84' y='10' width='10' height='10'/%3E%3Crect x='100' y='10' width='10' height='10'/%3E%3Crect x='116' y='10' width='10' height='10'/%3E%3Crect x='132' y='10' width='10' height='10'/%3E%3Crect x='148' y='10' width='10' height='10'/%3E%3C/g%3E%3Cpolygon points='60,58 88,30 116,58' fill='%231a2a68'/%3E%3Cpolygon points='130,58 158,30 186,58' fill='%231a2a68'/%3E%3Cpolygon points='60,58 88,30 92,32 66,58' fill='%234058a8' opacity='.5'/%3E%3Cpolygon points='130,58 158,30 162,32 136,58' fill='%234058a8' opacity='.5'/%3E%3Cpath d='M112 124 L112 96 Q123 84 134 96 L134 124 Z' fill='%23060b26'/%3E%3Cg fill='%236f8ce0' opacity='.28'%3E%3Crect x='113' y='98' width='1.6' height='24'/%3E%3Crect x='120' y='94' width='1.6' height='28'/%3E%3Crect x='127' y='94' width='1.6' height='28'/%3E%3Crect x='132.4' y='98' width='1.6' height='24'/%3E%3C/g%3E%3Ccircle cx='123' cy='118' r='1.4' fill='%23ffe6a0'/%3E%3Ccircle cx='123' cy='60' r='24' fill='url(%23hallglow)'/%3E%3Cpath d='M110 66 L136 66 L136 54 Q123 42 110 54 Z' fill='%236b3d17'/%3E%3Cpath d='M112 64 L134 64 L134 54 Q123 44 112 54 Z' fill='%23ffd487'/%3E%3Cpath d='M123 46 L123 64 M114 58 L132 58' stroke='%238a5410' stroke-width='1.3' opacity='.6'/%3E%3Cpolygon points='123,44 121,52 125,52' fill='%23fff3c9' opacity='.8'/%3E%3Cg fill='%23ffcf7e'%3E%3Crect x='68' y='78' width='6' height='9' rx='1'/%3E%3Crect x='102' y='78' width='6' height='9' rx='1' opacity='.9'/%3E%3Crect x='138' y='78' width='6' height='9' rx='1'/%3E%3Crect x='170' y='78' width='6' height='9' rx='1' opacity='.85'/%3E%3Crect x='16' y='90' width='5' height='8' rx='1' opacity='.8'/%3E%3Crect x='222' y='86' width='5' height='8' rx='1' opacity='.85'/%3E%3Crect x='96' y='96' width='5.5' height='8' rx='1' opacity='.75'/%3E%3Crect x='145' y='96' width='5.5' height='8' rx='1' opacity='.7'/%3E%3C/g%3E%3Cg fill='%23ffcf7e' opacity='.18'%3E%3Crect x='66' y='87' width='10' height='5'/%3E%3Crect x='136' y='87' width='10' height='5'/%3E%3Crect x='108' y='60' width='30' height='9'/%3E%3C/g%3E%3Cline x1='72' y1='30' x2='72' y2='6' stroke='%230d1740' stroke-width='2'/%3E%3Cpath d='M72 7 L94 12 L72 19 Z' fill='%23b5432e'/%3E%3Cpath d='M72 7 L94 12 L83 9.5 Z' fill='%23d85e42' opacity='.7'/%3E%3Cline x1='174' y1='30' x2='174' y2='6' stroke='%230d1740' stroke-width='2'/%3E%3Cpath d='M174 7 L196 12 L174 19 Z' fill='%23b5432e'/%3E%3Cpath d='M174 7 L196 12 L185 9.5 Z' fill='%23d85e42' opacity='.7'/%3E%3C/g%3E%3Cpath d='M0 150 Q220 128 440 140 Q640 150 840 132 Q1060 112 1280 138 Q1440 156 1600 134' fill='none' stroke='%234863c0' stroke-opacity='.25' stroke-width='1.6'/%3E%3Cpath d='M0 182 Q200 158 400 170 Q620 182 840 164 Q1080 144 1300 168 Q1460 182 1600 164 L1600 240 L0 240 Z' fill='%23081035'/%3E%3Cg fill='%23050a26'%3E%3Cpolygon points='118,180 136,132 154,180'/%3E%3Cpolygon points='142,182 156,144 170,182'/%3E%3Cpolygon points='104,184 116,152 128,184'/%3E%3Cpolygon points='596,172 614,128 632,172'/%3E%3Cpolygon points='624,174 640,138 656,174'/%3E%3Cpolygon points='1016,174 1036,130 1056,174'/%3E%3Cpolygon points='1044,176 1058,140 1072,176'/%3E%3Cpolygon points='1030,178 1042,150 1054,178'/%3E%3C/g%3E%3Cg stroke='%235774d0' stroke-opacity='.32' stroke-width='1.4' stroke-linecap='round'%3E%3Cpath d='M136 132 L143 152'/%3E%3Cpath d='M614 128 L621 148'/%3E%3Cpath d='M1036 130 L1043 150'/%3E%3C/g%3E%3Cpath d='M0 182 Q200 158 400 170 Q620 182 840 164 Q1080 144 1300 168 Q1460 182 1600 164' fill='none' stroke='%234863c0' stroke-opacity='.22' stroke-width='1.6'/%3E%3Cpath d='M0 216 Q260 204 520 210 Q800 216 1060 208 Q1320 200 1600 210 L1600 240 L0 240 Z' fill='%23030617'/%3E%3Cg stroke='%236e8ce8' stroke-opacity='.14' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='M1200 224 L1214 224'/%3E%3Cpath d='M1232 227 L1244 227'/%3E%3Cpath d='M300 226 L312 226'/%3E%3C/g%3E%3C/svg%3E") 0 0 / 100% 100% no-repeat;
}

/* ═══ MID-SKY ATMOSPHERE — the old dead zone between the star band and the
   horizon is now a living night: two huge soft night clouds up high, plus a
   pair of slow VICTORY AURORA ribbons (cool teal→violet magic light) draped
   down the LEFT and RIGHT flanks of the mid-frame, and coarse soft light
   pools that give the middle depth. Every bright mark hugs the outer thirds
   (<=~30% and >=~70%) so nothing lands on the centre text lane (L6). All
   gradients — cheap, huge, soft, STATIC, promoted. */
body::before {
  content: "";
  display: var(--rpg-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* two huge soft night clouds, high sky */
    radial-gradient(ellipse 36vw 9vh at 68% 12%, rgba(130, 155, 235, 0.06), rgba(130, 155, 235, 0) 72%),
    radial-gradient(ellipse 30vw 8vh at 28% 22%, rgba(130, 155, 235, 0.05), rgba(130, 155, 235, 0) 74%),
    /* LEFT aurora ribbon — a teal magic curtain hanging through the mid-frame,
       far off the lane. Two overlaid ellipses give it a soft vertical drape. */
    radial-gradient(ellipse 15vw 34vh at 15% 46%, rgba(96, 214, 200, 0.11), rgba(96, 214, 200, 0) 68%),
    radial-gradient(ellipse 9vw 26vh at 20% 40%, rgba(150, 236, 255, 0.09), rgba(150, 236, 255, 0) 70%),
    /* RIGHT aurora ribbon — a violet counter-curtain, cooler and dimmer */
    radial-gradient(ellipse 15vw 32vh at 85% 50%, rgba(150, 130, 240, 0.10), rgba(150, 130, 240, 0) 68%),
    radial-gradient(ellipse 8vw 24vh at 80% 44%, rgba(120, 170, 255, 0.08), rgba(120, 170, 255, 0) 70%),
    /* mid-frame depth pools — lift the flanks so the void reads as sky, not black */
    radial-gradient(ellipse 26vw 30vh at 12% 58%, rgba(48, 68, 150, 0.10), rgba(48, 68, 150, 0) 74%),
    radial-gradient(ellipse 24vw 28vh at 88% 62%, rgba(48, 68, 150, 0.09), rgba(48, 68, 150, 0) 74%);
}

/* ═══ NIGHT SKY STORY — the upper AND mid sky get real content now: two
   constellations (a drawn 'victory blade' asterism upper-left, a shield
   asterism right), a distant shooting star, a scatter of margin stars, and —
   filling the old mid-frame void — two coarse VICTORY AURORA curtains draped
   down the flanks (soft teal-left / violet-right ribbons, painted broad and
   dim). STATIC, promoted. Every mark sits in the left/right thirds, well
   CLEAR of the centre text lane, so this coarse detail never crosses the
   crawl (L6). Now runs to 80vh so the aurora reaches the mid-band. */
body::after {
  content: "";
  display: var(--rpg-scenery, block);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 80vh;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  opacity: 0.85;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3CradialGradient id='star' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='.4' stop-color='%23dbe6ff'/%3E%3Cstop offset='1' stop-color='%23dbe6ff' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='neb' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0' stop-color='%237e93e0' stop-opacity='.16'/%3E%3Cstop offset='.6' stop-color='%236878c8' stop-opacity='.05'/%3E%3Cstop offset='1' stop-color='%236878c8' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='trail' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23eaf2ff' stop-opacity='0'/%3E%3Cstop offset='.85' stop-color='%23eaf2ff' stop-opacity='.55'/%3E%3Cstop offset='1' stop-color='%23ffffff' stop-opacity='.9'/%3E%3C/linearGradient%3E%3ClinearGradient id='aurL' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%2360d6c8' stop-opacity='0'/%3E%3Cstop offset='.35' stop-color='%2360d6c8' stop-opacity='.5'/%3E%3Cstop offset='.7' stop-color='%2396ecff' stop-opacity='.32'/%3E%3Cstop offset='1' stop-color='%2396ecff' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='aurR' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%239a86f0' stop-opacity='0'/%3E%3Cstop offset='.4' stop-color='%239a86f0' stop-opacity='.42'/%3E%3Cstop offset='.72' stop-color='%237aaaff' stop-opacity='.26'/%3E%3Cstop offset='1' stop-color='%237aaaff' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='none' stroke='%238fa8e8' stroke-width='1.4' stroke-opacity='.32' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M210 150 L250 210 L232 270 L280 250 L246 330 M250 210 L206 244'/%3E%3C/g%3E%3Cg fill='url(%23star)'%3E%3Ccircle cx='210' cy='150' r='9'/%3E%3Ccircle cx='250' cy='210' r='11'/%3E%3Ccircle cx='232' cy='270' r='8'/%3E%3Ccircle cx='280' cy='250' r='7'/%3E%3Ccircle cx='246' cy='330' r='9'/%3E%3Ccircle cx='206' cy='244' r='6'/%3E%3C/g%3E%3Cg fill='%23ffffff'%3E%3Ccircle cx='210' cy='150' r='2.4'/%3E%3Ccircle cx='250' cy='210' r='2.8'/%3E%3Ccircle cx='246' cy='330' r='2.4'/%3E%3C/g%3E%3Cpath d='M1330 120 L1450 60' stroke='url(%23trail)' stroke-width='3' stroke-linecap='round'/%3E%3Ccircle cx='1450' cy='60' r='4.5' fill='%23ffffff'/%3E%3Ccircle cx='1450' cy='60' r='10' fill='url(%23star)' opacity='.7'/%3E%3Cg opacity='.85'%3E%3Cpath d='M150 360 Q120 500 176 640 Q210 720 190 800 Q150 700 128 620 Q96 500 118 400 Z' fill='url(%23aurL)'/%3E%3Cpath d='M262 380 Q236 520 288 660 Q312 730 296 812 Q262 720 244 640 Q214 520 236 420 Z' fill='url(%23aurL)' opacity='.7'/%3E%3Cpath d='M1416 350 Q1452 500 1400 640 Q1372 720 1392 806 Q1436 700 1458 610 Q1490 490 1462 390 Z' fill='url(%23aurR)'/%3E%3Cpath d='M1300 388 Q1330 520 1286 656 Q1262 726 1282 808 Q1316 720 1334 636 Q1362 510 1332 424 Z' fill='url(%23aurR)' opacity='.66'/%3E%3C/g%3E%3Cg fill='url(%23star)' opacity='.7'%3E%3Ccircle cx='1420' cy='300' r='4'/%3E%3Ccircle cx='360' cy='120' r='4'/%3E%3Ccircle cx='150' cy='360' r='4'/%3E%3Ccircle cx='1500' cy='420' r='4'/%3E%3Ccircle cx='1240' cy='180' r='4'/%3E%3Ccircle cx='320' cy='420' r='4'/%3E%3Ccircle cx='210' cy='560' r='3.6'/%3E%3Ccircle cx='400' cy='620' r='3.4'/%3E%3Ccircle cx='1360' cy='560' r='3.6'/%3E%3Ccircle cx='1220' cy='640' r='3.4'/%3E%3Ccircle cx='120' cy='700' r='3.2'/%3E%3Ccircle cx='1480' cy='680' r='3.2'/%3E%3C/g%3E%3Cg fill='%23cdd8f5' opacity='.5'%3E%3Ccircle cx='110' cy='200' r='2.4'/%3E%3Ccircle cx='1360' cy='440' r='2.4'/%3E%3Ccircle cx='400' cy='250' r='2.4'/%3E%3Ccircle cx='1300' cy='260' r='2.4'/%3E%3Ccircle cx='300' cy='540' r='2.2'/%3E%3Ccircle cx='150' cy='620' r='2.2'/%3E%3Ccircle cx='1420' cy='500' r='2.2'/%3E%3Ccircle cx='1280' cy='560' r='2.2'/%3E%3Ccircle cx='230' cy='680' r='2'/%3E%3Ccircle cx='1340' cy='700' r='2'/%3E%3C/g%3E%3Cg%3E%3Cellipse cx='1180' cy='150' rx='260' ry='90' fill='url(%23neb)' transform='rotate(-24 1180 150)'/%3E%3Cellipse cx='1330' cy='90' rx='150' ry='54' fill='url(%23neb)' transform='rotate(-24 1330 90)'/%3E%3C/g%3E%3Cg fill='none' stroke='%238fa8e8' stroke-width='1.2' stroke-opacity='.24' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M1120 300 L1180 336 L1250 322 L1234 392 M1180 336 L1206 400'/%3E%3C/g%3E%3Cg fill='url(%23star)'%3E%3Ccircle cx='1120' cy='300' r='7'/%3E%3Ccircle cx='1180' cy='336' r='8.5'/%3E%3Ccircle cx='1250' cy='322' r='6'/%3E%3Ccircle cx='1234' cy='392' r='7'/%3E%3Ccircle cx='1206' cy='400' r='5'/%3E%3C/g%3E%3Cg fill='%23ffffff'%3E%3Ccircle cx='1180' cy='336' r='2.2'/%3E%3Ccircle cx='1234' cy='392' r='1.9'/%3E%3C/g%3E%3C/svg%3E") 0 0 / 100% 100% no-repeat;
}

/* ═══ SAVE CRYSTAL — the party's way home, floating lower-right above its
   cyan pool. Faceted gem: top-lit from the moon side, bright left rim,
   dark right flank, a hot inner glint, two motes in orbit. The ONLY
   continuous mover: a slow 9px bob (L2 small mover, will-change 1/2). */
head { display: var(--rpg-scenery, block); }
head::before {
  content: "";
  display: var(--rpg-scenery, block);
  position: fixed;
  right: 9vw;
  bottom: 12vh;
  width: 92px;
  height: 138px;
  z-index: -1;
  pointer-events: none;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 150'%3E%3Cdefs%3E%3CradialGradient id='g' cx='50%25' cy='40%25' r='60%25'%3E%3Cstop offset='0' stop-color='%23d4f7ff' stop-opacity='.4'/%3E%3Cstop offset='.5' stop-color='%236fc9f2' stop-opacity='.12'/%3E%3Cstop offset='1' stop-color='%236fc9f2' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='core' cx='44%25' cy='40%25' r='42%25'%3E%3Cstop offset='0' stop-color='%23fbffff' stop-opacity='.95'/%3E%3Cstop offset='.5' stop-color='%23bdeeff' stop-opacity='.35'/%3E%3Cstop offset='1' stop-color='%23bdeeff' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='cLit' x1='0' y1='0' x2='.6' y2='1'%3E%3Cstop offset='0' stop-color='%23fbffff'/%3E%3Cstop offset='.45' stop-color='%23d2f2ff'/%3E%3Cstop offset='1' stop-color='%2392d4f4'/%3E%3C/linearGradient%3E%3ClinearGradient id='cShad' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%2378c2ee'/%3E%3Cstop offset='.5' stop-color='%234f9bd8'/%3E%3Cstop offset='1' stop-color='%232f6cae'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cellipse cx='50' cy='62' rx='48' ry='60' fill='url(%23g)'/%3E%3Cpolygon points='50,4 80,44 68,108 50,126 32,108 20,44' fill='%233f8ecb'/%3E%3Cpolygon points='50,4 20,44 50,64 Z' fill='url(%23cLit)'/%3E%3Cpolygon points='50,4 50,64 80,44 Z' fill='url(%23cShad)' opacity='.92'/%3E%3Cpolygon points='20,44 50,64 32,108 Z' fill='url(%23cLit)' opacity='.92'/%3E%3Cpolygon points='80,44 50,64 68,108 Z' fill='%232f6cae'/%3E%3Cpolygon points='32,108 50,64 50,126 Z' fill='%238ecdf0' opacity='.9'/%3E%3Cpolygon points='68,108 50,64 50,126 Z' fill='%23295da2'/%3E%3Cpolygon points='50,4 20,44 30,42 50,10 Z' fill='%23fbffff' opacity='.85'/%3E%3Cpolygon points='20,44 32,108 36,104 26,48 Z' fill='%23eafdff' opacity='.45'/%3E%3Cpath d='M50 4 L50 64 L50 126 M50 4 L20 44 M50 4 L80 44 M20 44 L50 64 L80 44 M32 108 L50 64 L68 108' stroke='%23eafcff' stroke-opacity='.5' stroke-width='.9' fill='none'/%3E%3Cpath d='M50 4 L20 44 L32 108 L50 126' stroke='%23fbffff' stroke-opacity='.95' stroke-width='2' fill='none' stroke-linejoin='round'/%3E%3Cellipse cx='46' cy='52' rx='16' ry='22' fill='url(%23core)'/%3E%3Cg fill='%23ffffff'%3E%3Cpolygon points='42,28 45,40 42,52 39,40'/%3E%3Cpolygon points='42,40 33,43 42,40 51,43' opacity='.9'/%3E%3C/g%3E%3Cellipse cx='40' cy='32' rx='2.6' ry='4.4' fill='%23ffffff' opacity='.85'/%3E%3Ccircle cx='42' cy='40' r='1.8' fill='%23ffffff'/%3E%3Cg stroke='%23fbffff' stroke-opacity='.6' stroke-width='1.4' stroke-linecap='round'%3E%3Cpath d='M50 86 L50 100'/%3E%3Cpath d='M43 93 L57 93'/%3E%3C/g%3E%3Ccircle cx='13' cy='84' r='2.4' fill='%238ee6ff' opacity='.75'/%3E%3Ccircle cx='89' cy='54' r='2' fill='%23dff6ff' opacity='.6'/%3E%3Ccircle cx='52' cy='142' r='1.8' fill='%238ee6ff' opacity='.55'/%3E%3Ccircle cx='24' cy='120' r='1.3' fill='%23b8f2ff' opacity='.5'/%3E%3Cpath d='M6 78 L10 82 M6 82 L10 78' stroke='%23d4f7ff' stroke-width='1' stroke-opacity='.6' stroke-linecap='round'/%3E%3Cg%3E%3Ccircle cx='41' cy='30' r='9' fill='%23ffffff' opacity='.18'/%3E%3Cpath d='M41 15 L44 27 L56 30 L44 33 L41 45 L38 33 L26 30 L38 27 Z' fill='%23ffffff' opacity='.92'/%3E%3Cpath d='M41 22 L43 29 L41 37 L39 29 Z' fill='%23ffffff'/%3E%3Cpath d='M41 30 L48 30 M41 30 L34 30' stroke='%23ffffff' stroke-width='.8' stroke-opacity='.7'/%3E%3C/g%3E%3C/svg%3E") center / contain no-repeat;
  will-change: transform;
  animation: rpg-crystal 5.5s ease-in-out infinite;
}

/* ═══ TREASURE CHEST — the loot from tonight's run, lower-left. Open lid
   tipped back, gold light climbing out of it, coin pile catching the glow,
   iron-gold straps with a specular bite, a cast shadow pinning it to the
   grass. STATIC, promoted. */
head::after {
  content: "";
  display: var(--rpg-scenery, block);
  position: fixed;
  left: 3.5vw;
  bottom: 2.5vh;
  width: 220px;
  height: 190px;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 190'%3E%3Cdefs%3E%3CradialGradient id='lg' cx='50%25' cy='50%25' r='58%25'%3E%3Cstop offset='0' stop-color='%23fff1c4' stop-opacity='.5'/%3E%3Cstop offset='.4' stop-color='%23ffcf6e' stop-opacity='.2'/%3E%3Cstop offset='1' stop-color='%23ffcf6e' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='bloom' cx='50%25' cy='100%25' r='75%25'%3E%3Cstop offset='0' stop-color='%23fff3c4' stop-opacity='.9'/%3E%3Cstop offset='.35' stop-color='%23ffd873' stop-opacity='.45'/%3E%3Cstop offset='1' stop-color='%23ffcf6e' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='ray' x1='0' y1='1' x2='0' y2='0'%3E%3Cstop offset='0' stop-color='%23fff2c0' stop-opacity='.55'/%3E%3Cstop offset='1' stop-color='%23fff2c0' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='wd' x1='0' y1='0' x2='.15' y2='1'%3E%3Cstop offset='0' stop-color='%239a5f2b'/%3E%3Cstop offset='.35' stop-color='%236b3d17'/%3E%3Cstop offset='.72' stop-color='%234a2a0e'/%3E%3Cstop offset='1' stop-color='%232a1707'/%3E%3C/linearGradient%3E%3ClinearGradient id='lidin' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%231c0f05'/%3E%3Cstop offset='.6' stop-color='%233a2410'/%3E%3Cstop offset='1' stop-color='%237a5220'/%3E%3C/linearGradient%3E%3CradialGradient id='in' cx='50%25' cy='96%25' r='88%25'%3E%3Cstop offset='0' stop-color='%23fffbe0'/%3E%3Cstop offset='.3' stop-color='%23ffe07a'/%3E%3Cstop offset='.65' stop-color='%23f0a92e'/%3E%3Cstop offset='1' stop-color='%238a5410'/%3E%3C/radialGradient%3E%3ClinearGradient id='st' x1='0' y1='0' x2='.3' y2='1'%3E%3Cstop offset='0' stop-color='%23ffe89a'/%3E%3Cstop offset='.3' stop-color='%23d8a441'/%3E%3Cstop offset='.62' stop-color='%23a3721f'/%3E%3Cstop offset='1' stop-color='%235e3d0c'/%3E%3C/linearGradient%3E%3ClinearGradient id='cface' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23fff2b8'/%3E%3Cstop offset='.35' stop-color='%23ffd45e'/%3E%3Cstop offset='.7' stop-color='%23e6a92e'/%3E%3Cstop offset='1' stop-color='%23a86f16'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cellipse cx='108' cy='177' rx='94' ry='12' fill='%23010309' opacity='.65'/%3E%3Cellipse cx='108' cy='84' rx='98' ry='70' fill='url(%23lg)'/%3E%3Cellipse cx='108' cy='86' rx='70' ry='44' fill='url(%23bloom)' opacity='.75'/%3E%3Cpath d='M86 86 L96 86 L88 4 L82 4 Z' fill='url(%23ray)' opacity='.6'/%3E%3Cpath d='M104 86 L112 86 L110 -6 L106 -6 Z' fill='url(%23ray)' opacity='.7'/%3E%3Cpath d='M122 86 L132 86 L138 8 L130 8 Z' fill='url(%23ray)' opacity='.55'/%3E%3Cpath d='M40 100 L40 56 Q40 18 108 18 Q176 18 176 56 L176 100 Z' fill='url(%23wd)'/%3E%3Cpath d='M50 98 L50 58 Q50 30 108 30 Q166 30 166 58 L166 98 Z' fill='url(%23lidin)'/%3E%3Cpath d='M50 58 Q50 30 108 30 Q166 30 166 58 Q108 44 50 58 Z' fill='%23120a03' opacity='.7'/%3E%3Cg fill='none' stroke='%232c1809' stroke-width='1' opacity='.5'%3E%3Cpath d='M56 96 Q54 56 60 24'/%3E%3Cpath d='M78 98 Q77 54 80 22'/%3E%3Cpath d='M138 98 Q140 54 138 22'/%3E%3Cpath d='M160 96 Q162 56 156 26'/%3E%3C/g%3E%3Cpath d='M40 56 Q40 18 108 18 Q176 18 176 56' fill='none' stroke='%23c78a41' stroke-width='2' stroke-opacity='.75'/%3E%3Cpath d='M46 40 Q80 22 108 22' fill='none' stroke='%23e0aa5e' stroke-width='2.5' stroke-opacity='.4' stroke-linecap='round'/%3E%3Cpath d='M50 96 Q108 70 166 96 L166 100 L50 100 Z' fill='url(%23in)'/%3E%3Cpath d='M50 96 Q108 74 166 96' fill='none' stroke='%23fffbe6' stroke-width='1.2' stroke-opacity='.5'/%3E%3Crect x='99' y='22' width='18' height='9' rx='2' fill='url(%23st)' stroke='%235c3c0a' stroke-width='1.2'/%3E%3Ccircle cx='103' cy='26' r='1.2' fill='%23fff3c9'/%3E%3Ccircle cx='113' cy='26' r='1.2' fill='%23fff3c9'/%3E%3Cg stroke='%238a5a10' stroke-width='1'%3E%3Cg transform='translate(66,98)'%3E%3Cellipse cx='0' cy='0' rx='8' ry='7.2' fill='url(%23cface)'/%3E%3Cpath d='M-8 0 A8 7.2 0 0 0 8 0 L8 2.6 A8 7.2 0 0 1 -8 2.6 Z' fill='%23935e12'/%3E%3Crect x='-4' y='-4.4' width='8' height='2' rx='1' fill='%23fff6cf' opacity='.85'/%3E%3Cellipse cx='0' cy='.5' rx='3.6' ry='3' fill='none' stroke='%23a8760f' stroke-width='1.2' opacity='.5'/%3E%3C/g%3E%3Cg transform='translate(86,101)'%3E%3Cellipse cx='0' cy='0' rx='8.4' ry='7.6' fill='url(%23cface)'/%3E%3Cpath d='M-8.4 0 A8.4 7.6 0 0 0 8.4 0 L8.4 2.8 A8.4 7.6 0 0 1 -8.4 2.8 Z' fill='%23935e12'/%3E%3Crect x='-4' y='-4.6' width='8.4' height='2' rx='1' fill='%23fff6cf' opacity='.85'/%3E%3Cpath d='M-2 -3 L-2 3 M2 -3 L2 3 M-3 0 L3 0' stroke='%23a8760f' stroke-width='1' opacity='.45'/%3E%3C/g%3E%3Cg transform='translate(107,99)'%3E%3Cellipse cx='0' cy='0' rx='8.4' ry='7.6' fill='url(%23cface)'/%3E%3Cpath d='M-8.4 0 A8.4 7.6 0 0 0 8.4 0 L8.4 2.8 A8.4 7.6 0 0 1 -8.4 2.8 Z' fill='%23935e12'/%3E%3Crect x='-4' y='-4.6' width='8.4' height='2' rx='1' fill='%23fffbe6' opacity='.9'/%3E%3Cellipse cx='0' cy='.5' rx='3.6' ry='3' fill='none' stroke='%23a8760f' stroke-width='1.2' opacity='.5'/%3E%3C/g%3E%3Cg transform='translate(128,101)'%3E%3Cellipse cx='0' cy='0' rx='8.4' ry='7.6' fill='url(%23cface)'/%3E%3Cpath d='M-8.4 0 A8.4 7.6 0 0 0 8.4 0 L8.4 2.8 A8.4 7.6 0 0 1 -8.4 2.8 Z' fill='%23935e12'/%3E%3Crect x='-4' y='-4.6' width='8.4' height='2' rx='1' fill='%23fff6cf' opacity='.85'/%3E%3Cpath d='M-2 -3 L-2 3 M2 -3 L2 3 M-3 0 L3 0' stroke='%23a8760f' stroke-width='1' opacity='.45'/%3E%3C/g%3E%3Cg transform='translate(148,98)'%3E%3Cellipse cx='0' cy='0' rx='8' ry='7.2' fill='url(%23cface)'/%3E%3Cpath d='M-8 0 A8 7.2 0 0 0 8 0 L8 2.6 A8 7.2 0 0 1 -8 2.6 Z' fill='%23935e12'/%3E%3Crect x='-4' y='-4.4' width='8' height='2' rx='1' fill='%23fff6cf' opacity='.85'/%3E%3Cellipse cx='0' cy='.5' rx='3.6' ry='3' fill='none' stroke='%23a8760f' stroke-width='1.2' opacity='.5'/%3E%3C/g%3E%3Cg transform='translate(77,88)'%3E%3Cellipse cx='0' cy='0' rx='7.2' ry='6.6' fill='url(%23cface)'/%3E%3Cpath d='M-7.2 0 A7.2 6.6 0 0 0 7.2 0 L7.2 2.4 A7.2 6.6 0 0 1 -7.2 2.4 Z' fill='%23935e12'/%3E%3Crect x='-3.6' y='-4' width='7.2' height='1.8' rx='1' fill='%23fff6cf' opacity='.85'/%3E%3C/g%3E%3Cg transform='translate(97,86)'%3E%3Cellipse cx='0' cy='0' rx='7.4' ry='6.8' fill='url(%23cface)'/%3E%3Cpath d='M-7.4 0 A7.4 6.8 0 0 0 7.4 0 L7.4 2.4 A7.4 6.8 0 0 1 -7.4 2.4 Z' fill='%23935e12'/%3E%3Crect x='-3.6' y='-4.2' width='7.4' height='1.8' rx='1' fill='%23fffbe6' opacity='.9'/%3E%3Cellipse cx='0' cy='.4' rx='3' ry='2.6' fill='none' stroke='%23a8760f' stroke-width='1' opacity='.5'/%3E%3C/g%3E%3Cg transform='translate(118,87)'%3E%3Cellipse cx='0' cy='0' rx='7.4' ry='6.8' fill='url(%23cface)'/%3E%3Cpath d='M-7.4 0 A7.4 6.8 0 0 0 7.4 0 L7.4 2.4 A7.4 6.8 0 0 1 -7.4 2.4 Z' fill='%23935e12'/%3E%3Crect x='-3.6' y='-4.2' width='7.4' height='1.8' rx='1' fill='%23fff6cf' opacity='.85'/%3E%3C/g%3E%3Cg transform='translate(138,88)'%3E%3Cellipse cx='0' cy='0' rx='7.2' ry='6.6' fill='url(%23cface)'/%3E%3Cpath d='M-7.2 0 A7.2 6.6 0 0 0 7.2 0 L7.2 2.4 A7.2 6.6 0 0 1 -7.2 2.4 Z' fill='%23935e12'/%3E%3Crect x='-3.6' y='-4' width='7.2' height='1.8' rx='1' fill='%23fff6cf' opacity='.85'/%3E%3C/g%3E%3Cg transform='translate(108,76) rotate(-12)'%3E%3Cellipse cx='0' cy='0' rx='6.8' ry='6.2' fill='url(%23cface)'/%3E%3Cpath d='M-6.8 0 A6.8 6.2 0 0 0 6.8 0 L6.8 2.2 A6.8 6.2 0 0 1 -6.8 2.2 Z' fill='%23935e12'/%3E%3Crect x='-3.4' y='-3.8' width='6.8' height='1.7' rx='1' fill='%23fffbe6' opacity='.9'/%3E%3C/g%3E%3C/g%3E%3Cg fill='%23fffef4'%3E%3Ccircle cx='96' cy='83' r='1.9' opacity='.95'/%3E%3Ccircle cx='104' cy='97' r='1.7' opacity='.85'/%3E%3Ccircle cx='131' cy='99' r='1.5' opacity='.8'/%3E%3C/g%3E%3Cpath d='M32 104 L184 104 L179 168 L37 168 Z' fill='url(%23wd)'/%3E%3Cpath d='M32 104 L184 104 L183 112 L33 112 Z' fill='%23ffe6a0' opacity='.5'/%3E%3Cg stroke='%23241103' stroke-width='2' opacity='.55'%3E%3Cpath d='M60 112 L60 166 M84 112 L84 167 M108 112 L108 168 M132 112 L132 167 M156 112 L156 166'/%3E%3C/g%3E%3Cg stroke='%237a4a1e' stroke-width='1' opacity='.35'%3E%3Cpath d='M62 112 L62 166 M86 112 L86 167 M110 112 L110 168 M134 112 L134 167 M158 112 L158 166'/%3E%3C/g%3E%3Cg stroke='%235a3416' stroke-width='.8' opacity='.4'%3E%3Cpath d='M46 130 L178 130 M44 148 L180 148'/%3E%3C/g%3E%3Cpath d='M46 100 L64 100 L61 172 L44 172 Z' fill='url(%23st)'/%3E%3Cpath d='M156 100 L174 100 L176 172 L159 172 Z' fill='url(%23st)'/%3E%3Cpath d='M49 102 L49 170' stroke='%23fff3c9' stroke-width='2' opacity='.7'/%3E%3Cpath d='M159 102 L159 170' stroke='%23fff3c9' stroke-width='1.8' opacity='.55'/%3E%3Cg fill='%235c3c0a'%3E%3Ccircle cx='53' cy='116' r='1.8'/%3E%3Ccircle cx='53' cy='140' r='1.8'/%3E%3Ccircle cx='53' cy='164' r='1.8'/%3E%3Ccircle cx='167' cy='116' r='1.8'/%3E%3Ccircle cx='167' cy='140' r='1.8'/%3E%3Ccircle cx='167' cy='164' r='1.8'/%3E%3C/g%3E%3Cg fill='%23ffe89a' opacity='.6'%3E%3Ccircle cx='52' cy='115' r='.7'/%3E%3Ccircle cx='52' cy='139' r='.7'/%3E%3Ccircle cx='166' cy='115' r='.7'/%3E%3C/g%3E%3Crect x='97' y='110' width='22' height='30' rx='3' fill='url(%23st)' stroke='%235c3c0a' stroke-width='1.5'/%3E%3Cpath d='M99 112 L117 112' stroke='%23fff3c9' stroke-width='1.4' opacity='.7'/%3E%3Ccircle cx='108' cy='121' r='3.6' fill='%23472708'/%3E%3Cpath d='M108 123 L108 133' stroke='%23472708' stroke-width='3.2' stroke-linecap='round'/%3E%3Ccircle cx='174' cy='66' r='2' fill='%23fff0b0' opacity='.85'/%3E%3Ccircle cx='50' cy='50' r='1.6' fill='%23ffe085' opacity='.7'/%3E%3C/svg%3E") center bottom / contain no-repeat;
}

/* ═══ loot glints — 4-point gold sparkles rising IN the chest's gold plume,
   directly above the open lid (not stray sky stars anymore). Coarse, bright,
   soft-cored, clustered in the gold column; left edge, never in the lane.
   STATIC set... */
head meta { display: var(--rpg-scenery, block); }
head meta:first-of-type::before {
  content: "";
  display: var(--rpg-scenery, block);
  position: fixed;
  left: 1.6vw;
  bottom: 13vh;
  width: 230px;
  height: 210px;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 230 210'%3E%3Cdefs%3E%3CradialGradient id='sg' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0' stop-color='%23fffbe6'/%3E%3Cstop offset='.5' stop-color='%23ffe9a8' stop-opacity='.5'/%3E%3Cstop offset='1' stop-color='%23ffe9a8' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cg%3E%3Ccircle cx='120' cy='150' r='16' fill='url(%23sg)' opacity='.7'/%3E%3Cpath d='M120 132 L125 148 L141 150 L125 152 L120 168 L115 152 L99 150 L115 148 Z' fill='%23fff6d8'/%3E%3Cpath d='M120 138 L123 149 L120 162 L117 149 Z' fill='%23ffffff'/%3E%3C/g%3E%3Cg%3E%3Ccircle cx='168' cy='96' r='12' fill='url(%23sg)' opacity='.6'/%3E%3Cpath d='M168 82 L171 93 L182 96 L171 99 L168 110 L165 99 L154 96 L165 93 Z' fill='%23ffe9a8'/%3E%3Cpath d='M168 87 L170 95 L168 105 L166 95 Z' fill='%23fffbe6'/%3E%3C/g%3E%3Cg%3E%3Ccircle cx='80' cy='72' r='9' fill='url(%23sg)' opacity='.55'/%3E%3Cpath d='M80 62 L82 70 L90 72 L82 74 L80 82 L78 74 L70 72 L78 70 Z' fill='%23ffe9a8' opacity='.9'/%3E%3C/g%3E%3Ccircle cx='150' cy='128' r='2.4' fill='%23fffbe6' opacity='.8'/%3E%3Ccircle cx='96' cy='108' r='1.8' fill='%23fff3c9' opacity='.7'/%3E%3C/svg%3E") center / contain no-repeat;
}

/* ...and the twinkle overlay: alternate glints that swap in on a slow
   steps(1) beat (2 paints per 2.6s ≈ 0.77/s — L2-legal, no will-change). */
head meta:first-of-type::after {
  content: "";
  display: var(--rpg-scenery, block);
  position: fixed;
  left: 1.6vw;
  bottom: 13vh;
  width: 230px;
  height: 210px;
  z-index: -1;
  pointer-events: none;
  opacity: 0.15;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 230 210'%3E%3Cdefs%3E%3CradialGradient id='sg2' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0' stop-color='%23fffbe6'/%3E%3Cstop offset='.5' stop-color='%23fff3c9' stop-opacity='.5'/%3E%3Cstop offset='1' stop-color='%23fff3c9' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cg%3E%3Ccircle cx='146' cy='124' r='13' fill='url(%23sg2)' opacity='.7'/%3E%3Cpath d='M146 108 L149 120 L163 124 L149 128 L146 140 L143 128 L129 124 L143 120 Z' fill='%23fff6d8'/%3E%3Cpath d='M146 114 L148 123 L146 132 L144 123 Z' fill='%23ffffff'/%3E%3C/g%3E%3Cg%3E%3Ccircle cx='96' cy='96' r='11' fill='url(%23sg2)' opacity='.6'/%3E%3Cpath d='M96 82 L98 92 L108 96 L98 100 L96 110 L94 100 L84 96 L94 92 Z' fill='%23ffe9a8'/%3E%3C/g%3E%3Cg%3E%3Ccircle cx='176' cy='150' r='8' fill='url(%23sg2)' opacity='.5'/%3E%3Cpath d='M176 141 L178 148 L185 150 L178 152 L176 159 L174 152 L167 150 L174 148 Z' fill='%23ffe9a8' opacity='.9'/%3E%3C/g%3E%3Ccircle cx='118' cy='80' r='2.2' fill='%23fffbe6' opacity='.8'/%3E%3C/svg%3E") center / contain no-repeat;
  animation: rpg-twinkle 2.6s steps(1, end) infinite;
}

/* ═══ PIXEL MOON — full moon in the top-left corner (corners are L6-legal),
   craters and a dithered shadow edge, soft bloom baked in. STATIC, promoted. */
head meta:last-of-type::before {
  content: "";
  display: var(--rpg-scenery, block);
  position: fixed;
  left: 5vw;
  top: 6vh;
  width: 96px;
  height: 96px;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'%3E%3Cdefs%3E%3CradialGradient id='mb' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0' stop-color='%23c4d6ff' stop-opacity='.38'/%3E%3Cstop offset='.66' stop-color='%23bcd2ff' stop-opacity='.08'/%3E%3Cstop offset='1' stop-color='%23bcd2ff' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='mf' cx='34%25' cy='30%25' r='80%25'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='.45' stop-color='%23e6edff'/%3E%3Cstop offset='.8' stop-color='%23c3d0f2'/%3E%3Cstop offset='1' stop-color='%239aabdd'/%3E%3C/radialGradient%3E%3CradialGradient id='mcr' cx='42%25' cy='38%25' r='62%25'%3E%3Cstop offset='0' stop-color='%238e9fce'/%3E%3Cstop offset='1' stop-color='%23b8c6ee'/%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='48' cy='48' r='45' fill='url(%23mb)'/%3E%3Ccircle cx='48' cy='48' r='27' fill='url(%23mf)'/%3E%3Cpath d='M62 27 A27 27 0 0 1 62 69 A21 21 0 0 0 62 27 Z' fill='%237e91c8' opacity='.32'/%3E%3Cg fill='%237c8fc4' opacity='.55'%3E%3Crect x='66' y='38' width='2.4' height='2.4'/%3E%3Crect x='69' y='44' width='2.4' height='2.4'/%3E%3Crect x='67' y='50' width='2.4' height='2.4'/%3E%3Crect x='64' y='56' width='2.4' height='2.4'/%3E%3Crect x='70' y='40' width='1.8' height='1.8'/%3E%3Crect x='71' y='52' width='1.8' height='1.8'/%3E%3Crect x='61' y='61' width='1.8' height='1.8'/%3E%3C/g%3E%3Cg%3E%3Ccircle cx='40' cy='37' r='5' fill='url(%23mcr)'/%3E%3Cpath d='M40 32 A5 5 0 0 1 44.4 39.4 A5 5 0 0 0 36 34 Z' fill='%236e82ba' opacity='.5'/%3E%3Cpath d='M35.6 35.6 A5 5 0 0 0 43 41.6' fill='none' stroke='%23fbfdff' stroke-width='1.1' stroke-opacity='.55'/%3E%3C/g%3E%3Cg%3E%3Ccircle cx='55' cy='52' r='4' fill='url(%23mcr)'/%3E%3Cpath d='M55 48 A4 4 0 0 1 58.5 54 A4 4 0 0 0 52 49.5 Z' fill='%236e82ba' opacity='.5'/%3E%3Cpath d='M51.8 50.5 A4 4 0 0 0 57.6 55.4' fill='none' stroke='%23fbfdff' stroke-width='1' stroke-opacity='.5'/%3E%3C/g%3E%3Cg%3E%3Ccircle cx='42' cy='59' r='2.6' fill='url(%23mcr)'/%3E%3Cpath d='M40.2 57.2 A2.6 2.6 0 0 0 44 61' fill='none' stroke='%23fbfdff' stroke-width='.9' stroke-opacity='.5'/%3E%3C/g%3E%3Ccircle cx='58' cy='36' r='2' fill='url(%23mcr)'/%3E%3Ccircle cx='33' cy='48' r='1.8' fill='url(%23mcr)'/%3E%3Ccircle cx='37' cy='33' r='3' fill='%23ffffff' opacity='.85'/%3E%3Ccircle cx='34' cy='30' r='1.4' fill='%23ffffff' opacity='.9'/%3E%3Cpath d='M24 42 A27 27 0 0 1 40 23' fill='none' stroke='%23ffffff' stroke-width='1.6' stroke-opacity='.4' stroke-linecap='round'/%3E%3C/svg%3E") center / contain no-repeat;
}

/* ═══ corner status window — the world-map HUD, top-right: menu chrome in
   miniature (same double border), GOLD and TIME still ticking. STATIC. */
head meta:last-of-type::after {
  content: "GOLD  65535\\A TIME  99:59";
  display: var(--rpg-scenery, block);
  position: fixed;
  right: 2.5vw;
  top: 4vh;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  white-space: pre;
  font-family: var(--credits-title-font);
  font-size: 0.6rem;
  line-height: 1.9;
  letter-spacing: 0.12em;
  text-align: left;
  color: var(--rpg-white);
  text-shadow: 1px 1px 0 rgba(5, 9, 34, 0.9);
  padding: 0.5rem 0.85rem;
  background: linear-gradient(180deg, var(--rpg-blue-hi) 0%, var(--rpg-blue) 24%, #182a96 60%, var(--rpg-blue-deep) 100%);
  border: 2px solid var(--rpg-white);
  border-radius: 7px;
  box-shadow:
    0 0 0 2px var(--rpg-navy),
    0 0 0 4px var(--rpg-white),
    0 0 0 6px rgba(4, 7, 26, 0.85),
    0 6px 14px rgba(1, 3, 12, 0.6),
    inset 0 0 0 2px rgba(9, 15, 64, 0.55),
    inset 0 8px 12px rgba(255, 255, 255, 0.08);
}

/* ═══ THE ADVENTURING PARTY — a proper lineup camped on the overworld for
   the night: a plumed knight with sword + shield, a mage with a glowing
   staff, a hooded ranger with bow + quiver, a white-and-gold cleric with a
   lantern stave, and a slime pet — all sharing one ground line, cool moon-
   rim on their lit edges, gathered around a warm campfire pool. STATIC and
   centered at the bottom edge: head-side so the base bottom mask never
   dissolves them, z:-1 so the crawl reads over the top, no mover spent. */
head link { display: var(--rpg-scenery, block); }
head link::before {
  content: "";
  display: var(--rpg-scenery, block);
  position: fixed;
  left: 50%;
  bottom: 1.6vh;
  width: 300px;
  height: 79px;
  z-index: -1;
  pointer-events: none;
  transform: translate3d(-50%, 0, 0);
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 320 84' xmlns='http://www.w3.org/2000/svg' shape-rendering='crispEdges'%3E%3C!-- contact shadows on shared ground y=77 --%3E%3Cg fill='%23020617' opacity='.55'%3E%3Cellipse cx='46' cy='78' rx='19' ry='3.2'/%3E%3Cellipse cx='116' cy='78' rx='16' ry='3'/%3E%3Cellipse cx='188' cy='78' rx='16' ry='3'/%3E%3Cellipse cx='256' cy='78' rx='15' ry='2.8'/%3E%3Cellipse cx='300' cy='78' rx='11' ry='2.4'/%3E%3C/g%3E%3C!-- ============ KNIGHT (tank, lead) feet-%3E77 ============ --%3E%3Cg transform='translate(0,9)'%3E%3Crect x='52' y='18' width='4' height='42' fill='%23c9d8f4'/%3E%3Crect x='52' y='18' width='2' height='42' fill='%23ffffff'/%3E%3Crect x='49' y='58' width='10' height='3' fill='%23ffd257'/%3E%3Crect x='52' y='61' width='4' height='4' fill='%238a6034'/%3E%3Crect x='40' y='26' width='4' height='10' fill='%23d85e42'/%3E%3Crect x='41' y='24' width='3' height='4' fill='%23f08060'/%3E%3Crect x='34' y='30' width='16' height='10' fill='%239db4e4'/%3E%3Crect x='34' y='30' width='4' height='10' fill='%23c9d8f4'/%3E%3Crect x='45' y='33' width='4' height='4' fill='%230a1148'/%3E%3Crect x='31' y='40' width='22' height='16' fill='%235570b8'/%3E%3Crect x='31' y='40' width='4' height='16' fill='%238aa2d8'/%3E%3Crect x='49' y='40' width='4' height='16' fill='%232c3f86'/%3E%3Crect x='29' y='41' width='6' height='6' fill='%236f8ad0'/%3E%3Crect x='49' y='41' width='6' height='6' fill='%233a4f94'/%3E%3Crect x='31' y='52' width='22' height='3' fill='%23ffd257'/%3E%3Crect x='26' y='44' width='7' height='12' fill='%23c0392b'/%3E%3Crect x='27' y='45' width='5' height='10' fill='%23e0503c'/%3E%3Crect x='28' y='47' width='3' height='6' fill='%23ffd257'/%3E%3Crect x='34' y='56' width='7' height='10' fill='%232c3f86'/%3E%3Crect x='44' y='56' width='7' height='10' fill='%232c3f86'/%3E%3Crect x='33' y='66' width='9' height='3' fill='%230a1148'/%3E%3Crect x='44' y='66' width='9' height='3' fill='%230a1148'/%3E%3C/g%3E%3C!-- ============ MAGE feet-%3E77 ============ --%3E%3Cg transform='translate(0,6)'%3E%3Crect x='132' y='24' width='3' height='46' fill='%238a6034'/%3E%3Ccircle cx='133.5' cy='24' r='7' fill='%238ee6ff' opacity='.35'/%3E%3Crect x='130' y='20' width='7' height='7' fill='%238ee6ff'/%3E%3Crect x='131' y='21' width='3' height='3' fill='%23d4f7ff'/%3E%3Cpath d='M116 16 L128 40 L104 40 Z' fill='%237a5fd0'/%3E%3Cpath d='M116 16 L122 28 L110 28 Z' fill='%239a82e0'/%3E%3Crect x='102' y='39' width='28' height='4' fill='%234a3690'/%3E%3Crect x='107' y='42' width='14' height='7' fill='%23e8b890'/%3E%3Crect x='107' y='42' width='14' height='2' fill='%230a1148' opacity='.3'/%3E%3Crect x='104' y='49' width='24' height='20' fill='%236a4fc0'/%3E%3Crect x='104' y='49' width='5' height='20' fill='%239a82e0'/%3E%3Crect x='123' y='49' width='5' height='20' fill='%234a3690'/%3E%3Crect x='104' y='64' width='24' height='3' fill='%23ffd257'/%3E%3Crect x='106' y='69' width='8' height='3' fill='%230a1148'/%3E%3Crect x='118' y='69' width='8' height='3' fill='%230a1148'/%3E%3C/g%3E%3C!-- ============ RANGER feet-%3E77 ============ --%3E%3Cg transform='translate(0,5)'%3E%3Cpath d='M206 30 Q216 46 206 62' fill='none' stroke='%238a6034' stroke-width='3'/%3E%3Cpath d='M207 31 L207 61' stroke='%23d8c090' stroke-width='1'/%3E%3Cpath d='M176 34 Q188 26 200 34 L200 44 L176 44 Z' fill='%233a6b4a'/%3E%3Cpath d='M176 34 Q188 26 200 34 L200 38 L176 38 Z' fill='%234f8a5e'/%3E%3Crect x='182' y='41' width='10' height='6' fill='%23e8b890'/%3E%3Crect x='178' y='46' width='20' height='19' fill='%233a6b4a'/%3E%3Crect x='178' y='46' width='4' height='19' fill='%2357946a'/%3E%3Crect x='196' y='46' width='4' height='21' fill='%23264d34'/%3E%3Crect x='178' y='58' width='20' height='3' fill='%23a0703a'/%3E%3Crect x='197' y='34' width='2' height='10' fill='%23d8c090'/%3E%3Crect x='200' y='33' width='2' height='10' fill='%23e8d4a0'/%3E%3Crect x='180' y='65' width='7' height='8' fill='%23264d34'/%3E%3Crect x='190' y='65' width='7' height='8' fill='%23264d34'/%3E%3Crect x='179' y='72' width='9' height='3' fill='%230a1148'/%3E%3Crect x='190' y='72' width='9' height='3' fill='%230a1148'/%3E%3C/g%3E%3C!-- ============ HEALER (cleric) feet-%3E77 ============ --%3E%3Cg transform='translate(0,4)'%3E%3Crect x='272' y='28' width='2' height='40' fill='%238a6034'/%3E%3Ccircle cx='273' cy='32' r='8' fill='%23ffd257' opacity='.28'/%3E%3Crect x='270' y='28' width='6' height='8' fill='%23ffd257'/%3E%3Crect x='271' y='29' width='2' height='3' fill='%23fff6d8'/%3E%3Crect x='248' y='34' width='14' height='5' fill='%23ffd257'/%3E%3Crect x='248' y='37' width='14' height='4' fill='%23e8b890'/%3E%3Crect x='247' y='39' width='16' height='3' fill='%23c98a4e'/%3E%3Crect x='246' y='42' width='20' height='25' fill='%23dbe2f8'/%3E%3Crect x='246' y='42' width='4' height='25' fill='%23f4f6ff'/%3E%3Crect x='262' y='42' width='4' height='25' fill='%23a8b4dc'/%3E%3Crect x='246' y='60' width='20' height='3' fill='%23ffd257'/%3E%3Crect x='254' y='47' width='4' height='9' fill='%23ffd257'/%3E%3Crect x='252' y='49' width='8' height='4' fill='%23ffd257'/%3E%3Crect x='248' y='67' width='8' height='3' fill='%230a1148'/%3E%3Crect x='258' y='67' width='6' height='3' fill='%230a1148'/%3E%3C/g%3E%3C!-- SLIME pet lives on its own hopping layer (title::before) --%3E%3C!-- ===== COOL MOON RIM on left/top edges ===== --%3E%3Cg fill='%23cfe0ff' opacity='.45'%3E%3Crect x='34' y='39' width='4' height='2'/%3E%3Crect x='31' y='49' width='3' height='3'/%3E%3Crect x='104' y='49' width='3' height='10'/%3E%3Crect x='176' y='39' width='3' height='10'/%3E%3Crect x='178' y='51' width='3' height='2'/%3E%3Crect x='246' y='46' width='3' height='12'/%3E%3C/g%3E%3C/svg%3E") center bottom / contain no-repeat;
}
/* the campfire the party is gathered around — a warm ground pool giving the
   lineup somewhere to stand (soft, static, kill-switched). */
head link::after {
  content: "";
  display: var(--rpg-scenery, block);
  position: fixed;
  left: 50%;
  bottom: 0;
  width: 360px;
  height: 66px;
  z-index: -1;
  pointer-events: none;
  transform: translate3d(-50%, 0, 0);
  background: radial-gradient(ellipse 46% 76% at 50% 100%, rgba(255, 201, 120, 0.15), rgba(255, 180, 90, 0.05) 54%, rgba(255, 180, 90, 0) 78%);
  /* the fire breathes: a slow steps() flicker of the ground pool (opacity only,
     ~0.66 paints/s — no will-change, L2/L5-legal). */
  animation: rpg-campfire 4.5s steps(1, end) infinite;
}

/* ═══ THE SLIME — the party's pet, the charming JRPG beat. It hops in place on
   a squash-and-stretch (its ground shadow stays baked in the party art). A small
   transform-only mover: anticipation squash -> stretch up -> land squash ->
   settle, then a beat of rest. will-change budget: 2 of 2. Off the lane, parked
   under reduced motion. */
head title { display: var(--rpg-scenery, block); font-size: 0; color: transparent; }
head title::before {
  content: "";
  display: var(--rpg-scenery, block);
  position: fixed;
  left: calc(50% + 118px);
  bottom: 1.4vh;
  width: 46px;
  height: 44px;
  z-index: -1;
  pointer-events: none;
  transform-origin: 50% 100%;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 46 44'%3E%3Cdefs%3E%3CradialGradient id='sl' cx='40%25' cy='34%25' r='72%25'%3E%3Cstop offset='0' stop-color='%23bafcd8'/%3E%3Cstop offset='.5' stop-color='%235fd890'/%3E%3Cstop offset='1' stop-color='%232f9d64'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cpath d='M4 40 Q4 13 23 13 Q42 13 42 40 Q42 43 23 43 Q4 43 4 40 Z' fill='url(%23sl)'/%3E%3Cpath d='M10 25 Q16 17 25 19' fill='none' stroke='%23d4ffe8' stroke-width='2.6' stroke-linecap='round' opacity='.85'/%3E%3Cellipse cx='16' cy='30' rx='3' ry='4.6' fill='%230a1148'/%3E%3Cellipse cx='30' cy='30' rx='3' ry='4.6' fill='%230a1148'/%3E%3Ccircle cx='17.2' cy='28.4' r='1.05' fill='%23ffffff'/%3E%3Ccircle cx='31.2' cy='28.4' r='1.05' fill='%23ffffff'/%3E%3Cpath d='M19 37 Q23 39 27 37' fill='none' stroke='%230a1148' stroke-width='1.4' stroke-linecap='round' opacity='.6'/%3E%3C/svg%3E") center bottom / contain no-repeat;
  will-change: transform;
  animation: rpg-slime-hop 2.6s ease-in-out infinite;
}

/* ═══ FIREFLIES — a few warm motes drifting up off the campfire, ambient life
   at the party's feet. A SMALL layer (transform/opacity only, no will-change),
   coarse soft dots, centered on the fire and clear of the lane. */
head title::after {
  content: "";
  display: var(--rpg-scenery, block);
  position: fixed;
  left: 50%;
  bottom: 1vh;
  width: 240px;
  height: 150px;
  z-index: -1;
  pointer-events: none;
  transform: translate3d(-50%, 0, 0);
  opacity: 0.9;
  background:
    radial-gradient(circle at 24% 72%, rgba(255, 236, 150, 0.95) 0 1.4px, rgba(255, 208, 90, 0.5) 3px, rgba(255, 208, 90, 0) 7px),
    radial-gradient(circle at 68% 58%, rgba(210, 255, 170, 0.9) 0 1.2px, rgba(150, 230, 110, 0.45) 2.6px, rgba(150, 230, 110, 0) 6px),
    radial-gradient(circle at 46% 40%, rgba(255, 230, 140, 0.8) 0 1px, rgba(255, 200, 90, 0.4) 2.2px, rgba(255, 200, 90, 0) 6px),
    radial-gradient(circle at 82% 78%, rgba(255, 236, 150, 0.7) 0 0.9px, rgba(255, 208, 90, 0) 5px),
    radial-gradient(circle at 12% 46%, rgba(210, 255, 170, 0.6) 0 0.9px, rgba(150, 230, 110, 0) 5px);
  background-repeat: no-repeat;
  animation: rpg-fireflies 9s ease-in-out infinite;
}

/* ═══ pixel starfield — the only fine pattern, so it RIDES THE ROLL (zero
   slide against tracked glyphs = zero flicker). Behind the windows. */
.credits-roll::before,
.credits-slideshow::before {
  content: "";
  display: var(--rpg-scenery, block);
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.5;
  background-image:
    radial-gradient(circle at 24% 26%, rgba(244, 246, 255, 0.9) 0 1px, rgba(244, 246, 255, 0) 1.8px),
    radial-gradient(circle at 78% 14%, rgba(190, 210, 255, 0.8) 0 1px, rgba(190, 210, 255, 0) 1.8px),
    radial-gradient(circle at 55% 64%, rgba(255, 226, 150, 0.55) 0 1px, rgba(255, 226, 150, 0) 1.8px),
    radial-gradient(circle at 8% 82%, rgba(244, 246, 255, 0.7) 0 1px, rgba(244, 246, 255, 0) 1.8px);
  background-size: 300px 300px, 250px 250px, 380px 380px, 330px 330px;
}

/* ═══════════ THE MENU ═══════════ */

/* every section list is a menu window: deep blue vertical gradient inside
   a crisp white DOUBLE border (white ring / dark gap / white ring / dark
   edge), rounded corners, a top sheen and a floor shade for volume. */
.credits-block__list {
  width: min(30rem, 86vw);
  margin: 0 auto;
  padding: 1.1rem 1.35rem 1.2rem;
  gap: 0.55rem;
  background:
    /* corner gems — a tiny faceted gold stud set into each corner of the
       window skin (static props riding the roll, L6-safe) */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpolygon points='6,0.5 11.5,6 6,11.5 0.5,6' fill='%23b8821c' stroke='%233a2605' stroke-width='1'/%3E%3Cpolygon points='6,1.8 10.2,6 6,6 1.8,6' fill='%23ffd257'/%3E%3Cpolygon points='6,1.8 8,3.8 6,6 4,3.8' fill='%23fff0b0'/%3E%3Ccircle cx='4.6' cy='3.9' r='1' fill='%23fffdf2'/%3E%3C/svg%3E") left 7px top 7px / 11px 11px no-repeat,
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpolygon points='6,0.5 11.5,6 6,11.5 0.5,6' fill='%23b8821c' stroke='%233a2605' stroke-width='1'/%3E%3Cpolygon points='6,1.8 10.2,6 6,6 1.8,6' fill='%23ffd257'/%3E%3Cpolygon points='6,1.8 8,3.8 6,6 4,3.8' fill='%23fff0b0'/%3E%3Ccircle cx='4.6' cy='3.9' r='1' fill='%23fffdf2'/%3E%3C/svg%3E") right 7px top 7px / 11px 11px no-repeat,
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpolygon points='6,0.5 11.5,6 6,11.5 0.5,6' fill='%23b8821c' stroke='%233a2605' stroke-width='1'/%3E%3Cpolygon points='6,1.8 10.2,6 6,6 1.8,6' fill='%23ffd257'/%3E%3Cpolygon points='6,1.8 8,3.8 6,6 4,3.8' fill='%23fff0b0'/%3E%3Ccircle cx='4.6' cy='3.9' r='1' fill='%23fffdf2'/%3E%3C/svg%3E") left 7px bottom 7px / 11px 11px no-repeat,
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpolygon points='6,0.5 11.5,6 6,11.5 0.5,6' fill='%23b8821c' stroke='%233a2605' stroke-width='1'/%3E%3Cpolygon points='6,1.8 10.2,6 6,6 1.8,6' fill='%23ffd257'/%3E%3Cpolygon points='6,1.8 8,3.8 6,6 4,3.8' fill='%23fff0b0'/%3E%3Ccircle cx='4.6' cy='3.9' r='1' fill='%23fffdf2'/%3E%3C/svg%3E") right 7px bottom 7px / 11px 11px no-repeat,
    /* static glass sheen — light catching the top-left of the menu window,
       a soft diagonal specular band + a corner glint. Baked, never animated
       (a prop highlight = always L6-safe). */
    radial-gradient(ellipse 55% 42% at 22% 0%, rgba(190, 214, 255, 0.16), rgba(190, 214, 255, 0) 70%),
    linear-gradient(122deg, rgba(255, 255, 255, 0) 30%, rgba(198, 220, 255, 0.1) 40%, rgba(255, 255, 255, 0) 47%),
    linear-gradient(180deg, var(--rpg-blue-hi) 0%, var(--rpg-blue) 22%, #182a96 58%, var(--rpg-blue-deep) 100%);
  border: 3px solid var(--rpg-white);
  border-radius: 11px;
  box-shadow:
    0 0 0 3px var(--rpg-navy),
    0 0 0 5px var(--rpg-white),
    0 0 0 7px rgba(4, 7, 26, 0.9),
    0 12px 26px rgba(1, 3, 12, 0.6),
    inset 0 0 0 2px rgba(9, 15, 64, 0.55),
    inset 0 12px 20px rgba(255, 255, 255, 0.09),
    inset 0 -14px 24px rgba(3, 6, 30, 0.5);
}

/* rows: the roster. Glove cursor at the left, name left-aligned, EXP award
   pushed to the right column — a real menu line, not a centered caption. */
.credit {
  display: flex;
  align-items: baseline;
  gap: 0.9rem;
  position: relative;
  padding-left: 1.55em;
  text-align: left;
  letter-spacing: 0.02em;
  line-height: 1.4;
}
.credit::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.18em;
  width: 1.15em;
  height: 0.85em;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 22 15'%3E%3Crect x='1' y='4' width='4.5' height='8' rx='1' fill='%232f47c6' stroke='%230d1440' stroke-width='1'/%3E%3Crect x='5' y='2.5' width='8.5' height='11' rx='3' fill='%23f6f7ff' stroke='%23101a4a' stroke-width='1.2'/%3E%3Crect x='11' y='5.2' width='10' height='4.2' rx='2.1' fill='%23f6f7ff' stroke='%23101a4a' stroke-width='1.2'/%3E%3Cpath d='M8.5 6 L8.5 11 M11 6.5 L11 11.5' stroke='%23c7cdf0' stroke-width='1' stroke-linecap='round'/%3E%3C/svg%3E") center / contain no-repeat;
  opacity: 0.9;
}
.credit__name {
  min-width: 0;
  overflow-wrap: anywhere;
  color: var(--rpg-white);
}
.credit__amount {
  margin-left: auto;
  padding-left: 0.6rem;
  opacity: 1;
  font-size: 0.82em;
  color: var(--rpg-gold);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.credit__amount::before {
  content: "EXP +";
  margin: 0;
  color: var(--rpg-gold);
  opacity: 0.85;
}

/* ═══ section titles: quest-complete banners — a gold plaque with a pixel
   bevel and a hard drop, a tiny gem hanging under it, and the eyebrow
   stamped above. */
.credits-block__title {
  position: relative;
  width: fit-content;
  max-width: 84vw;
  margin: 1.5rem auto 1.1rem;
  padding: 0.55em 1.3em 0.5em;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--rpg-ink);
  background: linear-gradient(180deg, #ffe9a3 0%, var(--rpg-gold) 26%, #e2a52e 62%, #a86f12 100%);
  border: 2px solid #3a2605;
  border-radius: 3px;
  box-shadow:
    inset 0 2px 0 rgba(255, 248, 220, 0.9),
    inset 0 -3px 0 rgba(118, 70, 8, 0.6),
    0 4px 0 rgba(4, 7, 26, 0.8);
  text-shadow: 0 1px 0 rgba(255, 244, 205, 0.6);
}
.credits-block__title::before {
  content: "\\2726\\a0 QUEST COMPLETE \\2726";
  position: absolute;
  left: 50%;
  bottom: calc(100% + 0.9em);
  transform: translateX(-50%);
  font-family: var(--credits-title-font);
  font-weight: 400;
  font-size: 0.62rem;
  letter-spacing: 0.34em;
  padding-left: 0.34em;
  white-space: nowrap;
  color: var(--rpg-gold);
  text-shadow: 1px 1px 0 rgba(5, 9, 34, 0.9);
}
/* the base gold rule becomes a small gem hanging off the plaque */
.credits-block__title::after {
  width: 0.5em;
  height: 0.5em;
  margin: 0;
  position: absolute;
  left: 50%;
  top: calc(100% + 0.45em);
  opacity: 1;
  background: linear-gradient(135deg, #fff0b0 0%, var(--rpg-gold) 45%, var(--rpg-gold-deep) 100%);
  border: 2px solid #3a2605;
  transform: translateX(-50%) rotate(45deg);
}

/* ═══════════ FLOURISH CARDS ═══════════ */
.flourish--intro { gap: 1.15rem; }

/* badge -> the fanfare line (copy swap via font-size:0 + ::after) */
.flourish__badge { font-size: 0; border: 0; border-radius: 0; padding: 0; box-shadow: none; }
.flourish__badge::after {
  content: "\\25C6\\a0 VICTORY! \\25C6";
  display: inline-block;
  font-family: var(--credits-title-font);
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.4em;
  padding-left: 0.4em;
  color: var(--rpg-gold);
  text-shadow: 0 0 14px rgba(255, 210, 87, 0.35), 2px 2px 0 rgba(5, 9, 34, 0.85);
}

/* the streamer's title, set like a title-screen logo: chunky pixel type,
   white face, hard blue-steel offsets stepping back into the night */
.flourish--intro .flourish__title {
  font-family: var(--credits-font);
  font-weight: 400;
  letter-spacing: 0.04em;
  line-height: 1.12;
  max-width: min(90vw, 16em);
  color: var(--rpg-white);
  text-shadow:
    0.055em 0.055em 0 #2439b4,
    0.11em 0.11em 0 rgba(5, 9, 34, 0.9);
}

/* tagline is streamer copy: restyle only */
.flourish__tagline {
  font-style: normal;
  font-size: 1rem;
  letter-spacing: 0.14em;
  padding-left: 0.14em;
  color: rgba(190, 214, 255, 0.85);
}

/* rating -> the EXP bar + clear-file chip. The rating box becomes a small
   stacked column: an authentic "EXP TO NEXT LEVEL" gauge on top (a beveled
   track with a gold fill, a bright top sheen line and a glossy specular
   sweep frozen mid-bar), then the NEW GAME+ chip below it. */
.flourish__rating {
  font-size: 0;
  border: 0;
  padding: 0;
  opacity: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
}
/* the EXP gauge */
.flourish__rating::before {
  content: "";
  display: block;
  width: min(20rem, 62vw);
  height: 0.92rem;
  border-radius: 4px;
  /* track: recessed dark slot with a beveled lip; the gold fill runs to ~78%
     then the empty remainder is a dim inset groove. A hard color stop makes
     the fill edge crisp like a pixel gauge, and the top ~40% is a lighter
     band = the glossy sheen on the liquid gold. */
  background:
    /* twin specular glints — a bright crisp streak + a thin trailing one, riding
       the front of the fill like light sliding off liquid gold */
    linear-gradient(114deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.95) 43%, rgba(255,255,255,0) 45.5%, rgba(255,255,255,0) 49%, rgba(255,255,255,0.55) 50.5%, rgba(255,255,255,0) 52.5%) left / 78% 100% no-repeat,
    /* the fill: gold with a bright top-sheen band and a floor shade */
    linear-gradient(180deg, #fffbe0 0%, #ffe888 22%, #f2b93a 60%, #b8821c 100%) left / 78% 100% no-repeat,
    /* empty-groove tick notches — thin dark segments reading as a pixel gauge scale */
    repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, rgba(0,0,0,0) 1px 13px) right / 22% 100% no-repeat,
    /* the empty remainder groove */
    linear-gradient(180deg, #0a1550 0%, #060d38 100%);
  border: 2px solid var(--rpg-white);
  box-shadow:
    0 0 0 2px var(--rpg-navy),
    0 2px 6px rgba(1, 3, 12, 0.6),
    inset 0 1px 0 rgba(255, 248, 220, 0.8),
    inset 0 -2px 3px rgba(3, 6, 30, 0.6);
}
.flourish__rating::after {
  content: "\\2726\\a0 NEW GAME+ UNLOCKED \\2726";
  display: inline-block;
  font-family: var(--credits-title-font);
  font-size: 0.62rem;
  letter-spacing: 0.3em;
  padding: 0.6em 0.9em 0.55em 1.2em;
  color: var(--rpg-cyan);
  border: 1px solid rgba(142, 230, 255, 0.5);
  border-radius: 3px;
  text-shadow: 1px 1px 0 rgba(5, 9, 34, 0.9);
}

/* the classic prompt under the intro card — a slow menu blink (steps,
   ~1.5 paints/s: L5-legal in-roll) */
.flourish--intro::after {
  content: "\\25B6\\a0 PRESS START";
  display: block;
  font-family: var(--credits-title-font);
  font-size: 0.78rem;
  letter-spacing: 0.34em;
  padding-left: 0.34em;
  margin-top: 0.5rem;
  color: var(--rpg-white);
  text-shadow: 2px 2px 0 rgba(5, 9, 34, 0.9);
  animation: rpg-blink 1.3s steps(1, end) infinite;
}

/* ═══ outro: the save prompt. Eyebrow slot label, SAVE COMPLETE inside its
   own menu window, the sign-off line, and a blinking continue caret. */
.flourish--outro::before {
  content: "SLOT 01 \\2014\\a0 DATA WRITTEN";
  display: block;
  font-family: var(--credits-title-font);
  font-size: 0.62rem;
  letter-spacing: 0.34em;
  padding-left: 0.34em;
  color: var(--rpg-gold);
  text-shadow: 1px 1px 0 rgba(5, 9, 34, 0.9);
}
.flourish--outro .flourish__title { font-size: 0; }
.flourish--outro .flourish__title::after {
  content: "SAVE COMPLETE";
  display: inline-block;
  font-family: var(--credits-title-font);
  font-weight: 700;
  font-size: calc(var(--credits-flourish-title-size) * 0.62);
  letter-spacing: 0.1em;
  line-height: 1.2;
  padding: 0.55em 0.9em 0.5em 1em;
  color: var(--rpg-white);
  text-shadow: 0.07em 0.07em 0 rgba(5, 9, 34, 0.9);
  background: linear-gradient(180deg, var(--rpg-blue-hi) 0%, var(--rpg-blue) 24%, #182a96 60%, var(--rpg-blue-deep) 100%);
  border: 3px solid var(--rpg-white);
  border-radius: 11px;
  box-shadow:
    0 0 0 3px var(--rpg-navy),
    0 0 0 5px var(--rpg-white),
    0 0 0 7px rgba(4, 7, 26, 0.9),
    0 12px 26px rgba(1, 3, 12, 0.6),
    inset 0 0 0 2px rgba(9, 15, 64, 0.55),
    inset 0 10px 16px rgba(255, 255, 255, 0.09);
}
.flourish--outro .flourish__tagline { font-size: 0; }
.flourish--outro .flourish__tagline::after {
  content: "see you next session";
  font-family: var(--credits-font);
  font-size: 1.05rem;
  letter-spacing: 0.14em;
  padding-left: 0.14em;
  color: rgba(190, 214, 255, 0.9);
  text-shadow: 2px 2px 0 rgba(5, 9, 34, 0.8);
}
.flourish--outro::after {
  content: "\\25BC";
  display: block;
  margin-top: 0.4rem;
  font-size: 0.85rem;
  color: var(--rpg-white);
  text-shadow: 2px 2px 0 rgba(5, 9, 34, 0.9);
  animation: rpg-blink 1.3s steps(1, end) infinite;
}

/* ═══ raid finale: LEVEL UP! The banner goes molten, a static gold ray
   burst blooms behind the block (rides the roll — content-attached, so no
   screen-fixed pattern), rows step up a size, and the eyebrow shimmers on
   a steps() beat (~0.9 paints/s — the only other in-roll animation). */
.credits-block:nth-last-of-type(2) {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640'%3E%3Cdefs%3E%3CradialGradient id='core' gradientUnits='userSpaceOnUse' cx='320' cy='320' r='170'%3E%3Cstop offset='0' stop-color='%23fffdf2' stop-opacity='.85'/%3E%3Cstop offset='.22' stop-color='%23fff0b0' stop-opacity='.55'/%3E%3Cstop offset='.55' stop-color='%23ffd257' stop-opacity='.2'/%3E%3Cstop offset='1' stop-color='%23ffd257' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='halo' gradientUnits='userSpaceOnUse' cx='320' cy='320' r='300'%3E%3Cstop offset='0' stop-color='%23ffe796' stop-opacity='0'/%3E%3Cstop offset='.62' stop-color='%23ffe796' stop-opacity='0'/%3E%3Cstop offset='.74' stop-color='%23fff3c9' stop-opacity='.28'/%3E%3Cstop offset='.8' stop-color='%23ffe796' stop-opacity='.1'/%3E%3Cstop offset='1' stop-color='%23ffe796' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='rayG' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23fff6d8' stop-opacity='0'/%3E%3Cstop offset='.55' stop-color='%23ffe085' stop-opacity='.6'/%3E%3Cstop offset='1' stop-color='%23ffcf57' stop-opacity='.85'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='320' cy='320' r='300' fill='url(%23halo)'/%3E%3Cg fill='url(%23rayG)'%3E%3Cg%3E%3Cpolygon points='320,320 306,-4 334,-4'/%3E%3Cpolygon points='320,320 546,94 566,114'/%3E%3Cpolygon points='320,320 644,306 644,334'/%3E%3Cpolygon points='320,320 546,546 566,526'/%3E%3Cpolygon points='320,320 306,644 334,644'/%3E%3Cpolygon points='320,320 94,546 74,526'/%3E%3Cpolygon points='320,320 -4,306 -4,334'/%3E%3Cpolygon points='320,320 94,94 74,114'/%3E%3C/g%3E%3Cg opacity='.5'%3E%3Cpolygon points='320,320 200,20 240,10'/%3E%3Cpolygon points='320,320 440,20 400,10'/%3E%3Cpolygon points='320,320 620,200 630,240'/%3E%3Cpolygon points='320,320 620,440 630,400'/%3E%3Cpolygon points='320,320 440,620 400,630'/%3E%3Cpolygon points='320,320 200,620 240,630'/%3E%3Cpolygon points='320,320 20,440 10,400'/%3E%3Cpolygon points='320,320 20,200 10,240'/%3E%3C/g%3E%3C/g%3E%3Ccircle cx='320' cy='320' r='170' fill='url(%23core)'/%3E%3Ccircle cx='320' cy='320' r='150' fill='none' stroke='%23fff3c9' stroke-width='2' stroke-opacity='.35'/%3E%3C/svg%3E") center -228px / 640px 640px no-repeat;
}
.credits-slide:nth-last-of-type(2):not(.flourish) {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640'%3E%3Cdefs%3E%3CradialGradient id='core' gradientUnits='userSpaceOnUse' cx='320' cy='320' r='170'%3E%3Cstop offset='0' stop-color='%23fffdf2' stop-opacity='.85'/%3E%3Cstop offset='.22' stop-color='%23fff0b0' stop-opacity='.55'/%3E%3Cstop offset='.55' stop-color='%23ffd257' stop-opacity='.2'/%3E%3Cstop offset='1' stop-color='%23ffd257' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='halo' gradientUnits='userSpaceOnUse' cx='320' cy='320' r='300'%3E%3Cstop offset='0' stop-color='%23ffe796' stop-opacity='0'/%3E%3Cstop offset='.62' stop-color='%23ffe796' stop-opacity='0'/%3E%3Cstop offset='.74' stop-color='%23fff3c9' stop-opacity='.28'/%3E%3Cstop offset='.8' stop-color='%23ffe796' stop-opacity='.1'/%3E%3Cstop offset='1' stop-color='%23ffe796' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='rayG' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23fff6d8' stop-opacity='0'/%3E%3Cstop offset='.55' stop-color='%23ffe085' stop-opacity='.6'/%3E%3Cstop offset='1' stop-color='%23ffcf57' stop-opacity='.85'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='320' cy='320' r='300' fill='url(%23halo)'/%3E%3Cg fill='url(%23rayG)'%3E%3Cg%3E%3Cpolygon points='320,320 306,-4 334,-4'/%3E%3Cpolygon points='320,320 546,94 566,114'/%3E%3Cpolygon points='320,320 644,306 644,334'/%3E%3Cpolygon points='320,320 546,546 566,526'/%3E%3Cpolygon points='320,320 306,644 334,644'/%3E%3Cpolygon points='320,320 94,546 74,526'/%3E%3Cpolygon points='320,320 -4,306 -4,334'/%3E%3Cpolygon points='320,320 94,94 74,114'/%3E%3C/g%3E%3Cg opacity='.5'%3E%3Cpolygon points='320,320 200,20 240,10'/%3E%3Cpolygon points='320,320 440,20 400,10'/%3E%3Cpolygon points='320,320 620,200 630,240'/%3E%3Cpolygon points='320,320 620,440 630,400'/%3E%3Cpolygon points='320,320 440,620 400,630'/%3E%3Cpolygon points='320,320 200,620 240,630'/%3E%3Cpolygon points='320,320 20,440 10,400'/%3E%3Cpolygon points='320,320 20,200 10,240'/%3E%3C/g%3E%3C/g%3E%3Ccircle cx='320' cy='320' r='170' fill='url(%23core)'/%3E%3Ccircle cx='320' cy='320' r='150' fill='none' stroke='%23fff3c9' stroke-width='2' stroke-opacity='.35'/%3E%3C/svg%3E") center 26% / 640px 640px no-repeat;
}
.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  content: "\\2605\\a0 LEVEL UP! \\2605";
  font-size: 0.85rem;
  color: #ffe796;
  text-shadow: 0 0 16px rgba(255, 210, 87, 0.6), 1px 1px 0 rgba(5, 9, 34, 0.9);
  animation: rpg-levelup 2.2s steps(1, end) infinite;
}
.credits-block:nth-last-of-type(2) .credits-block__title,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
  background: linear-gradient(180deg, #fff3c2 0%, #ffdf72 24%, #f2b93a 60%, #b8821c 100%);
  box-shadow:
    inset 0 2px 0 rgba(255, 252, 235, 0.95),
    inset 0 -3px 0 rgba(118, 70, 8, 0.6),
    0 4px 0 rgba(4, 7, 26, 0.8),
    0 0 26px rgba(255, 210, 87, 0.35);
}
.credits-block:nth-last-of-type(2) .credits-block__list,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__list {
  border-color: #ffe9a3;
  box-shadow:
    0 0 0 3px var(--rpg-navy),
    0 0 0 5px var(--rpg-gold),
    0 0 0 7px rgba(4, 7, 26, 0.9),
    0 12px 30px rgba(1, 3, 12, 0.6),
    0 0 30px rgba(255, 210, 87, 0.18),
    inset 0 0 0 2px rgba(9, 15, 64, 0.55),
    inset 0 12px 20px rgba(255, 236, 170, 0.12),
    inset 0 -14px 24px rgba(3, 6, 30, 0.5);
}
.credits-block:nth-last-of-type(2) .credit,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit {
  font-size: calc(var(--credits-name-size) * 1.08);
}
.credits-block:nth-last-of-type(2) .credit__name,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__name {
  text-shadow: 0 0 14px rgba(255, 210, 87, 0.3), var(--credits-shadow);
}

/* ═══ slideshow: windows pop open the way menus do — a fast small scale
   settle on top of the base fade. */
.credits-slide {
  transform: scale(0.965);
  transition: opacity 0.55s steps(4, end), transform 0.55s steps(4, end);
}
.credits-slide.is-active { transform: scale(1); }

/* ═══ keyframes (all rpg- prefixed; transform/opacity ONLY) ═══ */
/* the save crystal breathes: a slow 9px float */
@keyframes rpg-crystal {
  0%   { transform: translate3d(0, 0, 0); }
  50%  { transform: translate3d(0, -9px, 0); }
  100% { transform: translate3d(0, 0, 0); }
}
/* the party's road: -10vw to 106vw in 180 hops = 2 hops/s, ~12px a hop */
/* stride swap, welded to the hop beat */
@keyframes rpg-step-inv {
  0%, 49%   { opacity: 1; }
  50%, 100% { opacity: 0; }
}
/* loot twinkle: alternate glints swap in — 2 paints per 2.6s */
@keyframes rpg-twinkle {
  0%, 46%   { opacity: 0.15; }
  50%, 96%  { opacity: 0.9; }
  100%      { opacity: 0.15; }
}
/* menu blink: PRESS START / continue caret — 2 paints per 1.3s */
@keyframes rpg-blink {
  0%, 55%  { opacity: 1; }
  60%, 95% { opacity: 0.12; }
  100%     { opacity: 1; }
}
/* level-up shimmer: two discrete dips per 2.2s */
@keyframes rpg-levelup {
  0%, 60%  { opacity: 1; }
  66%, 80% { opacity: 0.55; }
  86%, 100% { opacity: 1; }
}
/* the slime's hop: anticipate squash -> stretch up -> land squash -> settle,
   then rest. Squash-and-stretch preserves the footprint (origin at the feet). */
@keyframes rpg-slime-hop {
  0%   { transform: translate3d(0, 0, 0) scale(1, 1); }
  10%  { transform: translate3d(0, 0, 0) scale(1.16, 0.8); }
  20%  { transform: translate3d(0, -6px, 0) scale(0.92, 1.14); }
  34%  { transform: translate3d(0, -17px, 0) scale(0.9, 1.16); }
  48%  { transform: translate3d(0, 0, 0) scale(1.14, 0.84); }
  58%  { transform: translate3d(0, 0, 0) scale(0.98, 1.02); }
  66%, 100% { transform: translate3d(0, 0, 0) scale(1, 1); }
}
/* fireflies drift: a slow lazy rise-and-sway of the whole mote cluster, with a
   gentle opacity breathe so they read as blinking bugs, not a fixed glow. */
@keyframes rpg-fireflies {
  0%   { transform: translate3d(-50%, 0, 0); opacity: 0.5; }
  25%  { transform: translate3d(calc(-50% + 8px), -10px, 0); opacity: 0.95; }
  50%  { transform: translate3d(calc(-50% - 6px), -20px, 0); opacity: 0.65; }
  75%  { transform: translate3d(calc(-50% + 4px), -10px, 0); opacity: 0.9; }
  100% { transform: translate3d(-50%, 0, 0); opacity: 0.5; }
}
/* campfire flicker: two discrete brightness steps per 4.5s (~0.66 paints/s) */
@keyframes rpg-campfire {
  0%, 44%  { opacity: 1; }
  50%, 82% { opacity: 0.72; }
  88%, 100% { opacity: 1; }
}

/* ═══ reduced motion: the night holds still — the crystal parks at rest
   height, both glint sets burn steady, the prompts stay lit, the level-up
   eyebrow stops shimmering, slides fall back to a plain fade. */
@media (prefers-reduced-motion: reduce) {
  head::before { animation: none; }
  head meta:first-of-type::after { animation: none; opacity: 0.7; }
  head link::after { animation: none; opacity: 1; }
  head title::before { animation: none; transform: none; }
  head title::after { animation: none; opacity: 0.7; transform: translate3d(-50%, -10px, 0); }
  .flourish--intro::after,
  .flourish--outro::after { animation: none; }
  .credits-block:nth-last-of-type(2) .credits-block__title::before,
  .credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
    animation: none;
  }
  .credits-slide { transform: none; transition: opacity 0.8s ease; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--rpg-scenery:none;}",
};
