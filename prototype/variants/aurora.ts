import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. Aurora — Northern Lights: one tiny witness under an enormous dancing sky. Three vast curtain bands sweep and cross overhead; on a bare snow ridge a lone figure and their dog stand beside a glowing tent and a campfire, heads tipped back, watching. */
export const VARIANT: ThemeVariant = {
  key: "aurora",
  name: "Aurora — Northern Lights",
  css: `
/* ================================================================
   AURORA — NORTHERN LIGHTS (radical rebuild: AWE + A WITNESS).
   Fiction: far above the treeline, KP 7, -24°C. The sky is the
   protagonist — a colossal aurora storm: a grand green curtain
   sweeps a diagonal S across the whole sky (folded drapes, blazing
   mint hems, a nitrogen-pink fringe), a violet counter-drape
   crosses it higher up, and the distant "quiet arc" burns low over
   the horizon. Each band dances on its OWN period, so the sky
   never moves in lockstep — it breathes like weather. Below, the
   land is nothing but a dark snow ridge... and THE WITNESS: a tiny
   figure and their dog beside a glowing tent and a campfire — the
   only warm light in a hundred kilometres. The scale gap between
   that small warm camp and the vast cold sky is the whole point.
   The names rise through the dark centre of the sky; the curtains
   thin over the lane and a soft scrim keeps every glyph clean.
   Layer map (paint order bottom→top; all kill-switched):
     html bg (--credits-bg)     polar night gradient
     html::before  z-2  STATIC  starfield glints + milky way + corner falloff
     html::after   z-2  11s     THE QUIET ARC low over the horizon (SVG band)
     head::before  z-2  23s     CURTAIN B — high violet counter-drape (SVG)
     head::after   z-2  17s     CURTAIN A — the grand green S-sweep (SVG)
     meta#1::before z-1 STATIC  the snow RIDGE silhouette (full-width SVG)
     meta#1::after  z-1 steps   campfire GLOW pool breathing on the snow
     meta#2::before z-1 STATIC  THE WITNESS CAMP: figure + dog + tent + fire
     meta#2::after  z-2 steps   one meteor every ~17s, upper right, off-lane
     body::after    z-1 STATIC  centre-lane readability scrim
     .credits-roll::before      fine starfield RIDES THE ROLL (zero flicker)
   Perf: the 3 movers (arc, B, A) are transform/opacity-only on
   promoted layers (3 × will-change = budget). Fire + meteor are
   steps() paints on small layers. Everything else static.
   ================================================================ */
@import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Josefin+Sans:wght@300;400;600&display=swap');

:root {
  --aurora-scenery: block; /* set to none to strip every scenery layer */
  --aurora-green: #4dffb4;   /* the dominant curtain green */
  --aurora-teal: #58e0e8;    /* glacial teal */
  --aurora-violet: #b689ff;  /* high-altitude violet crown */
  --aurora-magenta: #ff77b8; /* nitrogen fringe on the lower hems */
  --aurora-snow: #eaf3ff;    /* moonlit snow */
  --aurora-ice: #cfe6ff;     /* pale ice blue */
  --aurora-ember: #ffcf8a;   /* tent + fire — the one warm note */

  --credits-bg:
    radial-gradient(ellipse 60% 40% at 50% 4%, rgba(77, 255, 180, 0.06) 0%, rgba(88, 224, 232, 0.02) 48%, rgba(6, 12, 22, 0) 74%),
    linear-gradient(180deg, #020409 0%, #040a16 26%, #071324 55%, #081a2c 78%, #050d1a 100%);
  --credits-color: var(--aurora-snow);
  --credits-accent: var(--aurora-teal);
  --credits-font: "Jost", "Avenir Next", "Segoe UI", "Helvetica Neue", sans-serif;
  --credits-title-font: "Josefin Sans", "Jost", "Trebuchet MS", sans-serif;
  --credits-title-size: clamp(1.3rem, 3.4vw, 2.05rem);
  --credits-name-size: clamp(1.05rem, 2.6vw, 1.55rem);
  --credits-flourish-title-size: clamp(2.3rem, 7.6vw, 4.6rem);
  --credits-block-gap: 5.25rem;
  --credits-name-gap: 0.72rem;
  --credits-shadow: 0 2px 14px rgba(2, 6, 14, 0.85);
  /* no-op glow — NEVER "none" (a "none" in the composed shadow list
     invalidates the whole declaration); Aurora glows are bespoke. */
  --credits-glow: 0 0 0 rgba(0, 0, 0, 0);
}

/* scenery is full-bleed: html drops the base edge-fade; body keeps it so
   crawling names dissolve before the top of the sky and never fight the
   brightest curtains. */
html { -webkit-mask-image: none; mask-image: none; }
body {
  background: transparent;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 15%, #000 88%, transparent 100%);
  mask-image: linear-gradient(to bottom, transparent 0%, #000 15%, #000 88%, transparent 100%);
}

/* ═══ THE NIGHT SKY (html::before, z-2): individually-placed star glints
   (side thirds + top band, all off the readable lane), four first-magnitude
   stars with soft coloured blooms, a milky-way dust arc, and a corner
   falloff that keeps the zenith deep. STATIC, promoted. ═══ */
html::before {
  content: "";
  display: var(--aurora-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background:
    radial-gradient(ellipse 56vw 40vh at 0% 0%, rgba(2, 5, 12, 0.4) 0%, rgba(2, 5, 12, 0) 66%),
    radial-gradient(ellipse 56vw 40vh at 100% 0%, rgba(2, 5, 12, 0.38) 0%, rgba(2, 5, 12, 0) 66%),
    /* first-magnitude glints + blooms (off-lane corners) */
    radial-gradient(circle at 14% 10%, rgba(255, 255, 255, 1) 0 1.9px, rgba(234, 243, 255, 0.5) 2.6px, rgba(234, 243, 255, 0) 4.2px),
    radial-gradient(ellipse 92px 70px at 14% 10%, rgba(180, 220, 255, 0.09) 0%, rgba(180, 220, 255, 0) 70%),
    radial-gradient(circle at 82% 7%, rgba(255, 253, 246, 0.95) 0 1.7px, rgba(240, 248, 255, 0) 3.4px),
    radial-gradient(ellipse 84px 64px at 82% 7%, rgba(190, 240, 225, 0.08) 0%, rgba(190, 240, 225, 0) 70%),
    radial-gradient(circle at 93% 34%, rgba(255, 250, 255, 0.85) 0 1.6px, rgba(240, 248, 255, 0) 3.2px),
    radial-gradient(ellipse 88px 66px at 93% 34%, rgba(182, 137, 255, 0.08) 0%, rgba(182, 137, 255, 0) 70%),
    radial-gradient(circle at 7% 40%, rgba(255, 246, 232, 0.8) 0 1.5px, rgba(255, 246, 232, 0) 3px),
    radial-gradient(ellipse 74px 58px at 7% 40%, rgba(255, 214, 190, 0.06) 0%, rgba(255, 214, 190, 0) 70%),
    /* smaller glints sprinkled through the top band + side gutters */
    radial-gradient(circle at 32% 6%, rgba(234, 243, 255, 0.8) 0 1.3px, rgba(234, 243, 255, 0) 2.7px),
    radial-gradient(circle at 47% 11%, rgba(214, 234, 255, 0.7) 0 1.2px, rgba(214, 234, 255, 0) 2.5px),
    radial-gradient(circle at 60% 5%, rgba(255, 255, 255, 0.75) 0 1.2px, rgba(255, 255, 255, 0) 2.5px),
    radial-gradient(circle at 71% 16%, rgba(214, 234, 255, 0.6) 0 1.1px, rgba(214, 234, 255, 0) 2.4px),
    radial-gradient(circle at 22% 20%, rgba(255, 255, 255, 0.6) 0 1.1px, rgba(255, 255, 255, 0) 2.4px),
    radial-gradient(circle at 10% 62%, rgba(214, 234, 255, 0.5) 0 1.1px, rgba(214, 234, 255, 0) 2.3px),
    radial-gradient(circle at 18% 46%, rgba(234, 243, 255, 0.55) 0 1px, rgba(234, 243, 255, 0) 2.2px),
    radial-gradient(circle at 88% 52%, rgba(234, 243, 255, 0.5) 0 1px, rgba(234, 243, 255, 0) 2.2px),
    radial-gradient(circle at 96% 20%, rgba(255, 255, 255, 0.6) 0 1.1px, rgba(255, 255, 255, 0) 2.3px),
    radial-gradient(circle at 78% 44%, rgba(214, 234, 255, 0.45) 0 1px, rgba(214, 234, 255, 0) 2.1px),
    radial-gradient(circle at 4% 22%, rgba(234, 243, 255, 0.6) 0 1.2px, rgba(234, 243, 255, 0) 2.5px),
    /* the milky way: a soft dust band arcing down from upper-left */
    linear-gradient(118deg, rgba(150, 200, 220, 0) 30%, rgba(168, 214, 224, 0.045) 42%, rgba(214, 234, 245, 0.08) 50%, rgba(190, 208, 240, 0.05) 58%, rgba(150, 200, 220, 0) 72%),
    radial-gradient(ellipse 44vw 24vh at 28% 16%, rgba(200, 220, 245, 0.04) 0%, rgba(200, 220, 245, 0) 68%);
}

/* ═══ THE QUIET ARC (html::after, z-2): the distant low aurora band that
   hugs the horizon on every clear KP night — a soft green rampart behind
   the ridge with a few tall diffuse rays. It sways on its own 11s period.
   OVERSCAN: any horizontally-animated sky layer bleeds ≥10vw past both
   edges so the sweep can never expose an unpainted strip (the old
   black-side-bars bug). ═══ */
html::after {
  content: "";
  display: var(--aurora-scenery, block);
  position: fixed;
  left: -10vw;
  right: -10vw;
  bottom: 15vh;
  height: 27vh;
  z-index: -2;
  pointer-events: none;
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 300' preserveAspectRatio='none'%3E%3Cdefs%3E%3ClinearGradient id='arcG' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%2352ffb0' stop-opacity='0'/%3E%3Cstop offset='.7' stop-color='%2352ffb0' stop-opacity='.4'/%3E%3Cstop offset='1' stop-color='%23c9ffe6' stop-opacity='.8'/%3E%3C/linearGradient%3E%3ClinearGradient id='arcB' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%237cf7c8' stop-opacity='.5'/%3E%3Cstop offset='1' stop-color='%234de8f0' stop-opacity='0'/%3E%3C/linearGradient%3E%3Cfilter id='fa' x='-15%' y='-15%' width='130%' height='130%'%3E%3CfeGaussianBlur stdDeviation='5'/%3E%3C/filter%3E%3C/defs%3E%3Cg filter='url(%23fa)'%3E%3Cpath d='M-79 71 L-94 201 L-64 201 Z' fill='url(%23arcG)' opacity='0.16'/%3E%3Cpath d='M549 60 L533 157 L564 157 Z' fill='url(%23arcG)' opacity='0.17'/%3E%3Cpath d='M672 -8 L662 151 L681 151 Z' fill='url(%23arcG)' opacity='0.21'/%3E%3Cpath d='M1382 -82 L1362 161 L1403 161 Z' fill='url(%23arcG)' opacity='0.14'/%3E%3Cpath d='M1819 31 L1810 193 L1829 193 Z' fill='url(%23arcG)' opacity='0.23'/%3E%3Cpath d='M1920 -20 L1907 201 L1934 201 Z' fill='url(%23arcG)' opacity='0.15'/%3E%3Cpath d='M1041 -110 L1033 147 L1050 147 Z' fill='url(%23arcG)' opacity='0.27'/%3E%3Cpath d='M1750 1 L1741 188 L1759 188 Z' fill='url(%23arcG)' opacity='0.27'/%3E%3Cpath d='M825 -47 L810 147 L839 147 Z' fill='url(%23arcG)' opacity='0.13'/%3E%3Cpath d='M1574 -18 L1559 174 L1588 174 Z' fill='url(%23arcG)' opacity='0.13'/%3E%3Cpath d='M1141 52 L1124 149 L1159 149 Z' fill='url(%23arcG)' opacity='0.19'/%3E%3Cpath d='M1654 -80 L1636 180 L1671 180 Z' fill='url(%23arcG)' opacity='0.23'/%3E%3Cpath d='M1998 116 L1988 206 L2008 206 Z' fill='url(%23arcG)' opacity='0.16'/%3E%3C/g%3E%3Cpath d='M -160 197 L -120 195 L -80 193 L -40 191 L 0 188 L 40 185 L 80 182 L 120 179 L 160 176 L 200 173 L 240 170 L 280 167 L 320 165 L 360 162 L 400 159 L 440 156 L 480 153 L 520 151 L 560 148 L 600 146 L 640 144 L 680 143 L 720 141 L 760 140 L 800 139 L 840 139 L 880 138 L 920 138 L 960 138 L 1000 138 L 1040 139 L 1080 140 L 1120 141 L 1160 142 L 1200 143 L 1240 145 L 1280 147 L 1320 149 L 1360 152 L 1400 155 L 1440 157 L 1480 160 L 1520 163 L 1560 165 L 1600 168 L 1640 171 L 1680 174 L 1720 177 L 1760 180 L 1800 184 L 1840 187 L 1880 190 L 1920 193 L 1960 196 L 2000 198 L 2040 200 L 2080 202 L 2080 214 L 2040 212 L 2000 210 L 1960 208 L 1920 205 L 1880 202 L 1840 199 L 1800 196 L 1760 192 L 1720 189 L 1680 186 L 1640 183 L 1600 180 L 1560 177 L 1520 175 L 1480 172 L 1440 169 L 1400 167 L 1360 164 L 1320 161 L 1280 159 L 1240 157 L 1200 155 L 1160 154 L 1120 153 L 1080 152 L 1040 151 L 1000 150 L 960 150 L 920 150 L 880 150 L 840 151 L 800 151 L 760 152 L 720 153 L 680 155 L 640 156 L 600 158 L 560 160 L 520 163 L 480 165 L 440 168 L 400 171 L 360 174 L 320 177 L 280 179 L 240 182 L 200 185 L 160 188 L 120 191 L 80 194 L 40 197 L 0 200 L -40 203 L -80 205 L -120 207 L -160 209 Z' fill='%23a8ffd9' filter='url(%23fa)' opacity='.4'/%3E%3Cpath d='M -160 207 L -120 205 L -80 203 L -40 201 L 0 198 L 40 195 L 80 192 L 120 189 L 160 186 L 200 183 L 240 180 L 280 177 L 320 175 L 360 172 L 400 169 L 440 166 L 480 163 L 520 161 L 560 158 L 600 156 L 640 154 L 680 153 L 720 151 L 760 150 L 800 149 L 840 149 L 880 148 L 920 148 L 960 148 L 1000 148 L 1040 149 L 1080 150 L 1120 151 L 1160 152 L 1200 153 L 1240 155 L 1280 157 L 1320 159 L 1360 162 L 1400 165 L 1440 167 L 1480 170 L 1520 173 L 1560 175 L 1600 178 L 1640 181 L 1680 184 L 1720 187 L 1760 190 L 1800 194 L 1840 197 L 1880 200 L 1920 203 L 1960 206 L 2000 208 L 2040 210 L 2080 212 L 2080 272 L 2040 270 L 2000 268 L 1960 266 L 1920 263 L 1880 260 L 1840 257 L 1800 254 L 1760 250 L 1720 247 L 1680 244 L 1640 241 L 1600 238 L 1560 235 L 1520 233 L 1480 230 L 1440 227 L 1400 225 L 1360 222 L 1320 219 L 1280 217 L 1240 215 L 1200 213 L 1160 212 L 1120 211 L 1080 210 L 1040 209 L 1000 208 L 960 208 L 920 208 L 880 208 L 840 209 L 800 209 L 760 210 L 720 211 L 680 213 L 640 214 L 600 216 L 560 218 L 520 221 L 480 223 L 440 226 L 400 229 L 360 232 L 320 235 L 280 237 L 240 240 L 200 243 L 160 246 L 120 249 L 80 252 L 40 255 L 0 258 L -40 261 L -80 263 L -120 265 L -160 267 Z' fill='url(%23arcB)' filter='url(%23fa)' opacity='.55'/%3E%3C/svg%3E") bottom center / 100% 100% no-repeat,
    radial-gradient(ellipse 58vw 15vh at 36% 100%, rgba(126, 247, 196, 0.16) 0%, rgba(126, 247, 196, 0) 70%),
    radial-gradient(ellipse 46vw 12vh at 72% 100%, rgba(88, 224, 232, 0.12) 0%, rgba(88, 224, 232, 0) 72%);
  will-change: transform;
  animation: aurora-arc 11s ease-in-out infinite;
}

/* ═══ CURTAIN B (head::before, z-2): the high violet counter-drape — a
   diffuse veil crossing the main band's sweep (high left, dipping right),
   drifting the OPPOSITE way on a 23s period. Coarse, soft, low alpha.
   Overscans 10vw. ═══ */
head { display: var(--aurora-scenery, block); }
head::before {
  content: "";
  display: var(--aurora-scenery, block);
  position: fixed;
  top: 0;
  bottom: 0;
  left: -10vw;
  right: -10vw;
  z-index: -2;
  pointer-events: none;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 760' preserveAspectRatio='xMidYMin slice'%3E%3Cdefs%3E%3ClinearGradient id='sheetB' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23c86bff' stop-opacity='0'/%3E%3Cstop offset='.4' stop-color='%239d7bff' stop-opacity='.34'/%3E%3Cstop offset='.8' stop-color='%2359e8e0' stop-opacity='.5'/%3E%3Cstop offset='.97' stop-color='%23cfeeff' stop-opacity='.4'/%3E%3C/linearGradient%3E%3ClinearGradient id='frB' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23ff6fd8' stop-opacity='.36'/%3E%3Cstop offset='1' stop-color='%23ff6fd8' stop-opacity='0'/%3E%3C/linearGradient%3E%3Cfilter id='f8b' x='-15%' y='-15%' width='130%' height='130%'%3E%3CfeGaussianBlur stdDeviation='8'/%3E%3C/filter%3E%3C/defs%3E%3Cg filter='url(%23f8b)'%3E%3Cpath d='M-154 136 L-58 123 L-112 323 L-208 336 Z' fill='url(%23sheetB)' opacity='0.17'/%3E%3Cpath d='M-112 131 L-16 114 L-64 314 L-160 331 Z' fill='url(%23sheetB)' opacity='0.24'/%3E%3Cpath d='M-70 121 L26 100 L-16 303 L-112 323 Z' fill='url(%23sheetB)' opacity='0.33'/%3E%3Cpath d='M-15 82 L81 61 L32 293 L-64 314 Z' fill='url(%23sheetB)' opacity='0.40'/%3E%3Cpath d='M28 14 L124 -5 L80 283 L-16 303 Z' fill='url(%23sheetB)' opacity='0.45'/%3E%3Cpath d='M70 12 L166 -5 L128 276 L32 293 Z' fill='url(%23sheetB)' opacity='0.45'/%3E%3Cpath d='M115 -45 L211 -58 L176 270 L80 283 Z' fill='url(%23sheetB)' opacity='0.43'/%3E%3Cpath d='M162 -37 L258 -49 L224 264 L128 276 Z' fill='url(%23sheetB)' opacity='0.40'/%3E%3Cpath d='M213 -35 L309 -46 L272 259 L176 270 Z' fill='url(%23sheetB)' opacity='0.39'/%3E%3Cpath d='M255 -34 L351 -43 L320 255 L224 264 Z' fill='url(%23sheetB)' opacity='0.40'/%3E%3Cpath d='M302 -41 L398 -48 L368 253 L272 259 Z' fill='url(%23sheetB)' opacity='0.43'/%3E%3Cpath d='M343 -9 L439 -12 L416 253 L320 255 Z' fill='url(%23sheetB)' opacity='0.47'/%3E%3Cpath d='M387 0 L483 2 L464 255 L368 253 Z' fill='url(%23sheetB)' opacity='0.51'/%3E%3Cpath d='M437 -51 L533 -44 L512 260 L416 253 Z' fill='url(%23sheetB)' opacity='0.48'/%3E%3Cpath d='M477 -21 L573 -8 L560 267 L464 255 Z' fill='url(%23sheetB)' opacity='0.43'/%3E%3Cpath d='M536 -23 L632 -5 L608 278 L512 260 Z' fill='url(%23sheetB)' opacity='0.34'/%3E%3Cpath d='M577 -31 L673 -9 L656 290 L560 267 Z' fill='url(%23sheetB)' opacity='0.25'/%3E%3Cpath d='M626 -17 L722 8 L704 303 L608 278 Z' fill='url(%23sheetB)' opacity='0.17'/%3E%3Cpath d='M666 8 L762 35 L752 317 L656 290 Z' fill='url(%23sheetB)' opacity='0.13'/%3E%3Cpath d='M712 59 L808 86 L800 330 L704 303 Z' fill='url(%23sheetB)' opacity='0.11'/%3E%3Cpath d='M757 55 L853 83 L848 344 L752 317 Z' fill='url(%23sheetB)' opacity='0.11'/%3E%3Cpath d='M799 130 L895 160 L896 360 L800 330 Z' fill='url(%23sheetB)' opacity='0.12'/%3E%3Cpath d='M845 144 L941 176 L944 376 L848 344 Z' fill='url(%23sheetB)' opacity='0.13'/%3E%3Cpath d='M901 160 L997 193 L992 393 L896 360 Z' fill='url(%23sheetB)' opacity='0.12'/%3E%3Cpath d='M940 176 L1036 210 L1040 410 L944 376 Z' fill='url(%23sheetB)' opacity='0.12'/%3E%3Cpath d='M986 193 L1082 225 L1088 425 L992 393 Z' fill='url(%23sheetB)' opacity='0.12'/%3E%3Cpath d='M1037 210 L1133 240 L1136 440 L1040 410 Z' fill='url(%23sheetB)' opacity='0.12'/%3E%3Cpath d='M1075 225 L1171 252 L1184 452 L1088 425 Z' fill='url(%23sheetB)' opacity='0.13'/%3E%3Cpath d='M1120 240 L1216 264 L1232 464 L1136 440 Z' fill='url(%23sheetB)' opacity='0.16'/%3E%3Cpath d='M1177 252 L1273 276 L1280 476 L1184 452 Z' fill='url(%23sheetB)' opacity='0.22'/%3E%3Cpath d='M1224 227 L1320 249 L1328 486 L1232 464 Z' fill='url(%23sheetB)' opacity='0.30'/%3E%3Cpath d='M1270 276 L1366 295 L1376 495 L1280 476 Z' fill='url(%23sheetB)' opacity='0.39'/%3E%3Cpath d='M1315 254 L1411 269 L1424 502 L1328 486 Z' fill='url(%23sheetB)' opacity='0.46'/%3E%3Cpath d='M1359 261 L1455 272 L1472 505 L1376 495 Z' fill='url(%23sheetB)' opacity='0.50'/%3E%3Cpath d='M1396 262 L1492 266 L1520 506 L1424 502 Z' fill='url(%23sheetB)' opacity='0.50'/%3E%3Cpath d='M1443 281 L1539 278 L1568 502 L1472 505 Z' fill='url(%23sheetB)' opacity='0.46'/%3E%3Cpath d='M1495 246 L1591 236 L1616 495 L1520 506 Z' fill='url(%23sheetB)' opacity='0.41'/%3E%3Cpath d='M1532 246 L1628 230 L1664 486 L1568 502 Z' fill='url(%23sheetB)' opacity='0.37'/%3E%3Cpath d='M1589 214 L1685 194 L1712 475 L1616 495 Z' fill='url(%23sheetB)' opacity='0.35'/%3E%3Cpath d='M1633 139 L1729 117 L1760 464 L1664 486 Z' fill='url(%23sheetB)' opacity='0.36'/%3E%3Cpath d='M1671 139 L1767 117 L1808 453 L1712 475 Z' fill='url(%23sheetB)' opacity='0.38'/%3E%3Cpath d='M1726 102 L1822 80 L1856 442 L1760 464 Z' fill='url(%23sheetB)' opacity='0.39'/%3E%3Cpath d='M1762 114 L1858 88 L1904 427 L1808 453 Z' fill='url(%23sheetB)' opacity='0.38'/%3E%3Cpath d='M1812 108 L1908 78 L1952 412 L1856 442 Z' fill='url(%23sheetB)' opacity='0.33'/%3E%3Cpath d='M1855 89 L1951 57 L2000 396 L1904 427 Z' fill='url(%23sheetB)' opacity='0.26'/%3E%3Cpath d='M1908 123 L2004 93 L2048 381 L1952 412 Z' fill='url(%23sheetB)' opacity='0.18'/%3E%3Cpath d='M1955 169 L2051 144 L2096 370 L2000 396 Z' fill='url(%23sheetB)' opacity='0.13'/%3E%3C/g%3E%3C/svg%3E") top center / 100% auto no-repeat;
  opacity: 0.9;
  will-change: transform;
  animation: aurora-dance-b 23s ease-in-out infinite;
}

/* ═══ CURTAIN A (head::after, z-2): THE GRAND CURTAIN — a folded drape
   sheet sweeping one huge diagonal S across the whole sky: bright combed
   rays, blazing mint feet, a nitrogen-magenta fringe under the hem, green
   core climbing to a violet crown. Geometry is a single generated SVG
   (60+ gradient quads); the layer itself dances: a slow lateral drift +
   ripple (skew) on a 17s period, transform/opacity only, GPU-composited.
   Displacement (≤2vw) stays far inside the 10vw overscan — verified at
   both sweep extremes. ═══ */
head::after {
  content: "";
  display: var(--aurora-scenery, block);
  position: fixed;
  top: 0;
  bottom: 0;
  left: -10vw;
  right: -10vw;
  z-index: -2;
  pointer-events: none;
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 900' preserveAspectRatio='xMidYMin slice'%3E%3Cdefs%3E%3ClinearGradient id='sheetA' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23a05dff' stop-opacity='0'/%3E%3Cstop offset='.22' stop-color='%238e6bff' stop-opacity='.3'/%3E%3Cstop offset='.5' stop-color='%2331e89c' stop-opacity='.5'/%3E%3Cstop offset='.78' stop-color='%234dffb4' stop-opacity='.72'/%3E%3Cstop offset='.96' stop-color='%23eafff2' stop-opacity='.95'/%3E%3C/linearGradient%3E%3ClinearGradient id='frA' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23ff77b8' stop-opacity='.6'/%3E%3Cstop offset='1' stop-color='%23ff5fae' stop-opacity='0'/%3E%3C/linearGradient%3E%3Cfilter id='f5' x='-15%' y='-15%' width='130%' height='130%'%3E%3CfeGaussianBlur stdDeviation='2.6'/%3E%3C/filter%3E%3Cfilter id='f8' x='-15%' y='-15%' width='130%' height='130%'%3E%3CfeGaussianBlur stdDeviation='8'/%3E%3C/filter%3E%3C/defs%3E%3Cg filter='url(%23f8)'%3E%3Cpath d='M-262 317 L-170 350 L-114 559 L-206 526 Z' fill='url(%23sheetA)' opacity='0.21'/%3E%3Cpath d='M-227 291 L-135 335 L-72 581 L-164 537 Z' fill='url(%23sheetA)' opacity='0.29'/%3E%3Cpath d='M-179 248 L-87 297 L-30 604 L-122 555 Z' fill='url(%23sheetA)' opacity='0.42'/%3E%3Cpath d='M-131 248 L-39 297 L12 625 L-80 576 Z' fill='url(%23sheetA)' opacity='0.56'/%3E%3Cpath d='M-90 194 L2 239 L54 644 L-38 599 Z' fill='url(%23sheetA)' opacity='0.66'/%3E%3Cpath d='M-44 171 L48 207 L96 658 L4 622 Z' fill='url(%23sheetA)' opacity='0.70'/%3E%3Cpath d='M-5 140 L87 171 L138 672 L46 641 Z' fill='url(%23sheetA)' opacity='0.69'/%3E%3Cpath d='M45 152 L137 182 L180 685 L88 655 Z' fill='url(%23sheetA)' opacity='0.64'/%3E%3Cpath d='M81 133 L173 160 L222 696 L130 669 Z' fill='url(%23sheetA)' opacity='0.60'/%3E%3Cpath d='M131 149 L223 171 L264 705 L172 683 Z' fill='url(%23sheetA)' opacity='0.60'/%3E%3Cpath d='M180 159 L272 175 L306 711 L214 694 Z' fill='url(%23sheetA)' opacity='0.64'/%3E%3Cpath d='M220 236 L312 244 L348 712 L256 704 Z' fill='url(%23sheetA)' opacity='0.70'/%3E%3Cpath d='M267 215 L359 215 L390 710 L298 710 Z' fill='url(%23sheetA)' opacity='0.75'/%3E%3Cpath d='M310 250 L402 242 L432 704 L340 712 Z' fill='url(%23sheetA)' opacity='0.75'/%3E%3Cpath d='M358 240 L450 226 L474 696 L382 710 Z' fill='url(%23sheetA)' opacity='0.68'/%3E%3Cpath d='M395 266 L487 247 L516 686 L424 705 Z' fill='url(%23sheetA)' opacity='0.54'/%3E%3Cpath d='M439 223 L531 199 L558 674 L466 698 Z' fill='url(%23sheetA)' opacity='0.38'/%3E%3Cpath d='M483 242 L575 214 L600 660 L508 688 Z' fill='url(%23sheetA)' opacity='0.26'/%3E%3Cpath d='M527 205 L619 174 L642 645 L550 676 Z' fill='url(%23sheetA)' opacity='0.19'/%3E%3Cpath d='M575 159 L667 122 L684 625 L592 663 Z' fill='url(%23sheetA)' opacity='0.18'/%3E%3Cpath d='M624 167 L716 121 L726 602 L634 648 Z' fill='url(%23sheetA)' opacity='0.22'/%3E%3Cpath d='M660 212 L752 159 L768 576 L676 629 Z' fill='url(%23sheetA)' opacity='0.27'/%3E%3Cpath d='M707 196 L799 139 L810 550 L718 607 Z' fill='url(%23sheetA)' opacity='0.30'/%3E%3Cpath d='M747 225 L839 167 L852 524 L760 581 Z' fill='url(%23sheetA)' opacity='0.30'/%3E%3Cpath d='M790 219 L882 163 L894 499 L802 555 Z' fill='url(%23sheetA)' opacity='0.27'/%3E%3Cpath d='M838 271 L930 218 L936 476 L844 529 Z' fill='url(%23sheetA)' opacity='0.23'/%3E%3Cpath d='M890 264 L982 212 L978 452 L886 504 Z' fill='url(%23sheetA)' opacity='0.21'/%3E%3Cpath d='M924 271 L1016 219 L1020 428 L928 480 Z' fill='url(%23sheetA)' opacity='0.21'/%3E%3Cpath d='M970 256 L1062 206 L1062 406 L970 456 Z' fill='url(%23sheetA)' opacity='0.28'/%3E%3Cpath d='M1016 227 L1108 179 L1104 386 L1012 433 Z' fill='url(%23sheetA)' opacity='0.37'/%3E%3Cpath d='M1062 183 L1154 140 L1146 368 L1054 410 Z' fill='url(%23sheetA)' opacity='0.46'/%3E%3Cpath d='M1102 114 L1194 77 L1188 352 L1096 389 Z' fill='url(%23sheetA)' opacity='0.54'/%3E%3Cpath d='M1150 47 L1242 14 L1230 337 L1138 371 Z' fill='url(%23sheetA)' opacity='0.58'/%3E%3Cpath d='M1197 8 L1289 -22 L1272 325 L1180 355 Z' fill='url(%23sheetA)' opacity='0.57'/%3E%3Cpath d='M1239 -11 L1331 -37 L1314 314 L1222 340 Z' fill='url(%23sheetA)' opacity='0.51'/%3E%3Cpath d='M1286 -24 L1378 -44 L1356 307 L1264 327 Z' fill='url(%23sheetA)' opacity='0.44'/%3E%3Cpath d='M1326 -60 L1418 -74 L1398 302 L1306 316 Z' fill='url(%23sheetA)' opacity='0.38'/%3E%3Cpath d='M1368 -49 L1460 -56 L1440 301 L1348 308 Z' fill='url(%23sheetA)' opacity='0.37'/%3E%3Cpath d='M1414 -42 L1506 -41 L1482 304 L1390 303 Z' fill='url(%23sheetA)' opacity='0.40'/%3E%3Cpath d='M1459 -30 L1551 -22 L1524 309 L1432 301 Z' fill='url(%23sheetA)' opacity='0.45'/%3E%3Cpath d='M1510 -67 L1602 -54 L1566 316 L1474 303 Z' fill='url(%23sheetA)' opacity='0.48'/%3E%3Cpath d='M1554 -45 L1646 -27 L1608 325 L1516 307 Z' fill='url(%23sheetA)' opacity='0.46'/%3E%3Cpath d='M1592 -70 L1684 -48 L1650 336 L1558 314 Z' fill='url(%23sheetA)' opacity='0.39'/%3E%3Cpath d='M1632 -106 L1724 -81 L1692 349 L1600 323 Z' fill='url(%23sheetA)' opacity='0.31'/%3E%3Cpath d='M1678 -189 L1770 -158 L1734 365 L1642 334 Z' fill='url(%23sheetA)' opacity='0.24'/%3E%3Cpath d='M1721 -193 L1813 -157 L1776 383 L1684 346 Z' fill='url(%23sheetA)' opacity='0.23'/%3E%3Cpath d='M1772 -194 L1864 -154 L1818 402 L1726 362 Z' fill='url(%23sheetA)' opacity='0.29'/%3E%3Cpath d='M1821 -168 L1913 -128 L1860 420 L1768 379 Z' fill='url(%23sheetA)' opacity='0.41'/%3E%3Cpath d='M1865 -189 L1957 -150 L1902 437 L1810 398 Z' fill='url(%23sheetA)' opacity='0.55'/%3E%3Cpath d='M1909 -148 L2001 -109 L1944 456 L1852 416 Z' fill='url(%23sheetA)' opacity='0.68'/%3E%3Cpath d='M1945 -89 L2037 -47 L1986 476 L1894 434 Z' fill='url(%23sheetA)' opacity='0.76'/%3E%3Cpath d='M1989 15 L2081 58 L2028 495 L1936 452 Z' fill='url(%23sheetA)' opacity='0.76'/%3E%3Cpath d='M2030 71 L2122 111 L2070 512 L1978 472 Z' fill='url(%23sheetA)' opacity='0.72'/%3E%3Cpath d='M2077 92 L2169 125 L2112 524 L2020 492 Z' fill='url(%23sheetA)' opacity='0.65'/%3E%3C/g%3E%3Cg filter='url(%23f5)'%3E%3Cpath d='M-120 -0 L-74 586 L-44 586 Z' fill='url(%23sheetA)' opacity='0.79'/%3E%3Cpath d='M1721 -431 L1663 342 L1692 342 Z' fill='url(%23sheetA)' opacity='0.80'/%3E%3Cpath d='M1737 -216 L1680 348 L1706 348 Z' fill='url(%23sheetA)' opacity='0.64'/%3E%3Cpath d='M31 58 L74 652 L93 652 Z' fill='url(%23sheetA)' opacity='0.77'/%3E%3Cpath d='M1008 -127 L992 434 L1018 434 Z' fill='url(%23sheetA)' opacity='0.24'/%3E%3Cpath d='M134 173 L172 683 L190 683 Z' fill='url(%23sheetA)' opacity='0.59'/%3E%3Cpath d='M1392 -350 L1354 303 L1381 303 Z' fill='url(%23sheetA)' opacity='0.65'/%3E%3Cpath d='M1 -57 L45 642 L66 642 Z' fill='url(%23sheetA)' opacity='0.63'/%3E%3Cpath d='M1540 -459 L1498 304 L1516 304 Z' fill='url(%23sheetA)' opacity='0.69'/%3E%3Cpath d='M1927 -41 L1860 423 L1885 423 Z' fill='url(%23sheetA)' opacity='0.84'/%3E%3Cpath d='M160 139 L193 690 L217 690 Z' fill='url(%23sheetA)' opacity='0.82'/%3E%3Cpath d='M1434 -474 L1393 300 L1422 300 Z' fill='url(%23sheetA)' opacity='0.55'/%3E%3Cpath d='M274 -37 L302 709 L324 709 Z' fill='url(%23sheetA)' opacity='0.73'/%3E%3Cpath d='M1514 -245 L1469 302 L1496 302 Z' fill='url(%23sheetA)' opacity='0.78'/%3E%3Cpath d='M1947 -287 L1881 431 L1901 431 Z' fill='url(%23sheetA)' opacity='0.69'/%3E%3C/g%3E%3Cpath d='M -160 538 L -120 556 L -80 576 L -40 598 L 0 620 L 40 638 L 80 653 L 120 666 L 160 679 L 200 691 L 240 700 L 280 708 L 320 711 L 360 712 L 400 709 L 440 703 L 480 695 L 520 685 L 560 673 L 600 660 L 640 646 L 680 627 L 720 605 L 760 581 L 800 556 L 840 531 L 880 507 L 920 485 L 960 462 L 1000 439 L 1040 418 L 1080 397 L 1120 378 L 1160 362 L 1200 347 L 1240 334 L 1280 322 L 1320 313 L 1360 306 L 1400 302 L 1440 301 L 1480 303 L 1520 308 L 1560 315 L 1600 323 L 1640 333 L 1680 345 L 1720 359 L 1760 376 L 1800 394 L 1840 411 L 1880 428 L 1920 445 L 1960 464 L 2000 483 L 2040 500 L 2080 515 L 2080 563 L 2040 548 L 2000 531 L 1960 512 L 1920 493 L 1880 476 L 1840 459 L 1800 442 L 1760 424 L 1720 407 L 1680 393 L 1640 381 L 1600 371 L 1560 363 L 1520 356 L 1480 351 L 1440 349 L 1400 350 L 1360 354 L 1320 361 L 1280 370 L 1240 382 L 1200 395 L 1160 410 L 1120 426 L 1080 445 L 1040 466 L 1000 487 L 960 510 L 920 533 L 880 555 L 840 579 L 800 604 L 760 629 L 720 653 L 680 675 L 640 694 L 600 708 L 560 721 L 520 733 L 480 743 L 440 751 L 400 757 L 360 760 L 320 759 L 280 756 L 240 748 L 200 739 L 160 727 L 120 714 L 80 701 L 40 686 L 0 668 L -40 646 L -80 624 L -120 604 L -160 586 Z' fill='url(%23frA)' filter='url(%23f8)' opacity='.6'/%3E%3Cg filter='url(%23f8)'%3E%3Cellipse cx='-100' cy='560' rx='120' ry='26' fill='%23d9ffef' opacity='0.13'/%3E%3Cellipse cx='60' cy='640' rx='120' ry='26' fill='%23d9ffef' opacity='0.31'/%3E%3Cellipse cx='220' cy='690' rx='120' ry='26' fill='%23d9ffef' opacity='0.42'/%3E%3Cellipse cx='380' cy='704' rx='120' ry='26' fill='%23d9ffef' opacity='0.34'/%3E%3Cellipse cx='540' cy='673' rx='120' ry='26' fill='%23d9ffef' opacity='0.13'/%3E%3Cellipse cx='700' cy='611' rx='120' ry='26' fill='%23d9ffef' opacity='0.05'/%3E%3Cellipse cx='860' cy='513' rx='120' ry='26' fill='%23d9ffef' opacity='0.07'/%3E%3Cellipse cx='1020' cy='422' rx='120' ry='26' fill='%23d9ffef' opacity='0.13'/%3E%3Cellipse cx='1180' cy='349' rx='120' ry='26' fill='%23d9ffef' opacity='0.25'/%3E%3Cellipse cx='1340' cy='303' rx='120' ry='26' fill='%23d9ffef' opacity='0.24'/%3E%3Cellipse cx='1500' cy='299' rx='120' ry='26' fill='%23d9ffef' opacity='0.12'/%3E%3Cellipse cx='1660' cy='333' rx='120' ry='26' fill='%23d9ffef' opacity='0.06'/%3E%3Cellipse cx='1820' cy='396' rx='120' ry='26' fill='%23d9ffef' opacity='0.19'/%3E%3Cellipse cx='1980' cy='467' rx='120' ry='26' fill='%23d9ffef' opacity='0.37'/%3E%3C/g%3E%3C/svg%3E") top center / 100% auto no-repeat,
    /* a broad even airglow so the sky between drapes never falls to pure black */
    linear-gradient(180deg, rgba(96, 220, 205, 0.07) 0%, rgba(96, 190, 215, 0.045) 38%, rgba(110, 150, 210, 0.02) 62%, rgba(110, 150, 210, 0) 78%),
    radial-gradient(ellipse 50vw 30vh at 46% -6%, rgba(182, 137, 255, 0.12) 0%, rgba(182, 137, 255, 0) 68%);
  will-change: transform;
  animation: aurora-dance-a 17s ease-in-out infinite;
}

/* extra prop layers: the two <meta> void elements render nothing but their
   fixed pseudos are free canvases. */
head meta { display: var(--aurora-scenery, block); }

/* ═══ THE RIDGE (meta#1::before, z-1): the entire landscape is ONE dark
   snow ridge — near-black, a starlit crest line, an aurora-green kiss on
   the camp knoll, faint sky-sheen on the snowfield. Minimal on purpose:
   the land is small and quiet so the sky can be enormous. STATIC. ═══ */
head meta:first-of-type::before {
  content: "";
  display: var(--aurora-scenery, block);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 20vh;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 260' preserveAspectRatio='none'%3E%3Cdefs%3E%3ClinearGradient id='bk' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%2312233c'/%3E%3Cstop offset='1' stop-color='%23081226'/%3E%3C/linearGradient%3E%3ClinearGradient id='ft' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23071020'/%3E%3Cstop offset='.25' stop-color='%23040910'/%3E%3Cstop offset='1' stop-color='%2302040a'/%3E%3C/linearGradient%3E%3Cfilter id='rb' x='-20%' y='-20%' width='140%' height='140%'%3E%3CfeGaussianBlur stdDeviation='3'/%3E%3C/filter%3E%3C/defs%3E%3C!-- far ridge: hazier blue --%3E%3Cpath d='M0 132 C 240 96, 420 108, 620 138 C 860 174, 1040 158, 1240 126 C 1440 96, 1640 102, 1920 134 L1920 260 L0 260 Z' fill='url(%23bk)' opacity='.85'/%3E%3Cpath d='M0 132 C 240 96, 420 108, 620 138 C 860 174, 1040 158, 1240 126 C 1440 96, 1640 102, 1920 134' fill='none' stroke='%239fc0e8' stroke-opacity='.18' stroke-width='2.5'/%3E%3C!-- near ridge: near-black, camp knoll left at x≈420 --%3E%3Cpath d='M0 104 C 130 74, 300 52, 430 56 C 530 60, 620 92, 740 126 C 930 176, 1120 186, 1320 158 C 1520 132, 1720 124, 1920 146 L1920 260 L0 260 Z' fill='url(%23ft)'/%3E%3C!-- crest snow light: cold starlit line + aurora-green kiss on the knoll --%3E%3Cpath d='M0 104 C 130 74, 300 52, 430 56 C 530 60, 620 92, 740 126 C 930 176, 1120 186, 1320 158 C 1520 132, 1720 124, 1920 146' fill='none' stroke='%23e6f2ff' stroke-opacity='.30' stroke-width='2.6'/%3E%3Cpath d='M180 66 C 300 52, 380 52, 430 56 C 500 59, 560 76, 620 92' fill='none' stroke='%237ef7c4' stroke-opacity='.28' stroke-width='5' filter='url(%23rb)'/%3E%3Cpath d='M1240 168 C 1400 146, 1560 130, 1720 124' fill='none' stroke='%23b689ff' stroke-opacity='.2' stroke-width='5' filter='url(%23rb)'/%3E%3C!-- wind-carved drift shadows on the near slope --%3E%3Cg fill='%230c1a30' opacity='.5' filter='url(%23rb)'%3E%3Cpath d='M240 96 Q330 84 420 88 L410 102 Q320 96 250 106 Z'/%3E%3Cpath d='M760 150 Q880 172 1000 178 L990 190 Q870 184 750 162 Z'/%3E%3Cpath d='M1380 168 Q1500 152 1620 144 L1612 156 Q1500 162 1390 178 Z'/%3E%3C/g%3E%3C!-- faint aurora light pooling on the snow crest --%3E%3Cg filter='url(%23rb)'%3E%3Cellipse cx='430' cy='60' rx='190' ry='12' fill='%237ef7c4' opacity='.10'/%3E%3Cellipse cx='1520' cy='132' rx='200' ry='12' fill='%23b689ff' opacity='.08'/%3E%3C/g%3E%3C!-- faint sky-sheen on the broad snowfield (kills the dead-black foreground) --%3E%3Cg filter='url(%23rb)'%3E%3Cellipse cx='1000' cy='215' rx='420' ry='34' fill='%233a7f8f' opacity='.10'/%3E%3Cellipse cx='1560' cy='200' rx='300' ry='28' fill='%235d6bb0' opacity='.08'/%3E%3Cellipse cx='430' cy='170' rx='260' ry='26' fill='%234d9f8f' opacity='.09'/%3E%3C/g%3E%3C/svg%3E") bottom center / 100% 100% no-repeat;
}

/* ═══ CAMPFIRE GLOW (meta#1::after, z-1): the warm pool the fire throws
   across the snow, breathing on a steps() flicker (~1.3 paints/s, small
   layer). Sits between the ridge and the camp props. ═══ */
head meta:first-of-type::after {
  content: "";
  display: var(--aurora-scenery, block);
  position: fixed;
  left: calc(13vw + 26px);
  bottom: 10.5vh;
  width: 330px;
  height: 220px;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(ellipse 46% 30% at 52% 82%, rgba(255, 190, 112, 0.34) 0%, rgba(255, 157, 74, 0.14) 48%, rgba(255, 157, 74, 0) 76%),
    radial-gradient(ellipse 70% 52% at 50% 80%, rgba(255, 170, 90, 0.1) 0%, rgba(255, 170, 90, 0) 70%);
  animation: aurora-fire 3.8s steps(1, end) infinite;
}

/* ═══ THE WITNESS CAMP (meta#2::before, z-1): the tiny warm heart of the
   scene — a glowing dome tent, a live campfire, and the witness: one small
   figure, head tipped back, dog sitting at their side, both watching the
   sky. Fire-side rim light, aurora rim on the sky side, breath hanging in
   the cold, footprints trailing off. STATIC prop on the knoll. ═══ */
head meta:last-of-type::before {
  content: "";
  display: var(--aurora-scenery, block);
  position: fixed;
  left: 13vw;
  bottom: 12.2vh;
  width: 340px;
  height: 220px;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 340 220'%3E%3Cdefs%3E%3CradialGradient id='tg' cx='46%' cy='62%' r='70%'%3E%3Cstop offset='0' stop-color='%23fff4d8'/%3E%3Cstop offset='.35' stop-color='%23ffd98f'/%3E%3Cstop offset='.75' stop-color='%23f0a04e'/%3E%3Cstop offset='1' stop-color='%23b5652a'/%3E%3C/radialGradient%3E%3CradialGradient id='fp' cx='50%' cy='50%' r='50%'%3E%3Cstop offset='0' stop-color='%23ffd28a' stop-opacity='.5'/%3E%3Cstop offset='.5' stop-color='%23ff9d4a' stop-opacity='.2'/%3E%3Cstop offset='1' stop-color='%23ff9d4a' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='fl' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23ffdf9a'/%3E%3Cstop offset='.6' stop-color='%23ffab52'/%3E%3Cstop offset='1' stop-color='%23e2622a'/%3E%3C/linearGradient%3E%3Cfilter id='cb' x='-40%' y='-40%' width='180%' height='180%'%3E%3CfeGaussianBlur stdDeviation='3'/%3E%3C/filter%3E%3Cfilter id='cb6' x='-60%' y='-60%' width='220%' height='220%'%3E%3CfeGaussianBlur stdDeviation='6'/%3E%3C/filter%3E%3C/defs%3E%3C!-- warm light pools: tent + fire cast on snow --%3E%3Cellipse cx='105' cy='196' rx='86' ry='16' fill='url(%23fp)' filter='url(%23cb)'/%3E%3Cellipse cx='196' cy='200' rx='70' ry='13' fill='url(%23fp)'/%3E%3C!-- long cool cast shadows away from the fire --%3E%3Cg fill='%2301040a' opacity='.55' filter='url(%23cb)'%3E%3Cellipse cx='262' cy='203' rx='34' ry='4.5'/%3E%3Cellipse cx='300' cy='205' rx='22' ry='3.5'/%3E%3C/g%3E%3C!-- THE TENT: glowing dome, lit from inside --%3E%3Cellipse cx='105' cy='176' rx='52' ry='26' fill='%23ffb861' opacity='.28' filter='url(%23cb6)'/%3E%3Cpath d='M56 192 Q66 138 105 132 Q144 138 154 192 Z' fill='url(%23tg)'/%3E%3C!-- pole seams --%3E%3Cpath d='M105 132 Q100 162 96 192 M105 132 Q112 162 117 192 M78 143 Q72 168 68 192 M132 143 Q139 168 143 192' stroke='%237a4218' stroke-opacity='.55' stroke-width='1.6' fill='none'/%3E%3C!-- door flap: brightest panel --%3E%3Cpath d='M92 192 Q105 148 118 192 Z' fill='%23fff6dd' opacity='.92'/%3E%3Cpath d='M105 150 L105 192' stroke='%23e8a95e' stroke-width='1.2'/%3E%3C!-- snow piled on the windward skirt --%3E%3Cpath d='M56 192 Q70 186 88 189 Q120 194 154 192 L154 196 L56 196 Z' fill='%23cfe2f8' opacity='.5'/%3E%3C!-- guy lines + stake --%3E%3Cpath d='M56 192 L34 200 M154 192 L176 201' stroke='%23dfeeff' stroke-opacity='.35' stroke-width='1'/%3E%3C!-- THE FIRE: crossed logs, live flame, spark --%3E%3Cpath d='M186 205 L208 199 M188 199 L206 205' stroke='%23140b06' stroke-width='3.4' stroke-linecap='round'/%3E%3Cpath d='M197 200 Q191 190 197 181 Q199 177 198 172 Q204 178 203 186 Q209 181 207 174 Q212 182 209 191 Q206 198 197 200 Z' fill='url(%23fl)'/%3E%3Cpath d='M197 198 Q194 191 198 185 Q201 181 200 178 Q204 184 202 192 Q200 197 197 198 Z' fill='%23fff1c4' opacity='.9'/%3E%3Ccircle cx='205' cy='168' r='1.3' fill='%23ffce7a' opacity='.85'/%3E%3Ccircle cx='193' cy='163' r='1' fill='%23ffb861' opacity='.6'/%3E%3Cellipse cx='197' cy='203' rx='16' ry='3.4' fill='%23ffce7a' opacity='.4' filter='url(%23cb)'/%3E%3C!-- THE WITNESS: standing figure, head tipped back, hands in pockets, fire-side rim light --%3E%3Cg%3E%3Ccircle cx='252' cy='140' r='6.2' fill='%2305080e'/%3E%3C!-- upturned face wedge (gazing up-left at the crest? no—the sky crest is BEHIND/right; they gaze up-LEFT toward the bright hem) --%3E%3Cpath d='M247.5 136.5 L243 133.5 Q246 130.5 249.5 132.2 Z' fill='%2305080e'/%3E%3C!-- body: parka silhouette, slight lean back --%3E%3Cpath d='M245.5 148 Q246 146 248.5 145.4 L256 145.4 Q259.5 146.5 260 150 L261.5 168 Q261.7 171 259 171.6 L258 171.6 Q257 171.4 256.8 169 L255.8 187 L258.5 205 L254.5 205 L251.6 188 L250.4 188 L248.6 205 L244.6 205 L246.2 186 L245.6 168 Q245.3 152 245.5 148 Z' fill='%2305080e'/%3E%3C!-- fire-side rim light (left edge) --%3E%3Cpath d='M246 148 Q245.4 160 245.7 170 M247 186 L245.4 203' stroke='%23ffbe70' stroke-opacity='.6' stroke-width='1.2' fill='none' stroke-linecap='round'/%3E%3Cpath d='M247 134.5 Q245.5 137.5 246.6 140.5' stroke='%23ffbe70' stroke-opacity='.5' stroke-width='1' fill='none' stroke-linecap='round'/%3E%3C!-- aurora rim on the sky side (right edge) --%3E%3Cpath d='M260 150 L261.5 168 M256.5 172 L255.9 186' stroke='%237ef7c4' stroke-opacity='.4' stroke-width='1' fill='none' stroke-linecap='round'/%3E%3C/g%3E%3C!-- THE DOG: sitting, muzzle to the sky --%3E%3Cg fill='%2305080e'%3E%3Cpath d='M288 174.5 Q284.4 172 284.8 168.6 L290.6 163.2 Q292.4 162 293.4 163.4 L295.8 167 Q296 168.4 294.6 169.2 Z'/%3E%3Cpath d='M290.5 163.8 L289 159.6 L292.6 162.2 Z'/%3E%3Cpath d='M282 205 Q279.4 196 281.4 188 Q283 181 288 176.6 Q292.6 180.4 293.4 188 Q294.2 197 292 205 Z'/%3E%3Cpath d='M281.6 202 Q276.6 200.4 275.4 195.4 Q279.8 194.6 282.2 197.4 Z'/%3E%3C/g%3E%3Cpath d='M281.8 188 Q283.4 181.6 288 177.2' stroke='%23ffbe70' stroke-opacity='.5' stroke-width='1' fill='none' stroke-linecap='round'/%3E%3Cpath d='M293 188 Q292.6 181.8 288.6 177.4' stroke='%237ef7c4' stroke-opacity='.35' stroke-width='.9' fill='none' stroke-linecap='round'/%3E%3C!-- breath in the cold, drifting from the upturned face --%3E%3Cg fill='%23cfe6ff' filter='url(%23cb)'%3E%3Cellipse cx='239' cy='128' rx='5' ry='2.6' opacity='.16'/%3E%3Cellipse cx='232' cy='124' rx='3.4' ry='2' opacity='.1'/%3E%3C/g%3E%3C!-- footprints trailing away behind the witness --%3E%3Cg fill='%230e1c30' opacity='.8'%3E%3Cellipse cx='268' cy='208' rx='2.4' ry='1.1'/%3E%3Cellipse cx='276' cy='211' rx='2.4' ry='1.1'/%3E%3Cellipse cx='285' cy='213' rx='2.2' ry='1'/%3E%3Cellipse cx='294' cy='215' rx='2.2' ry='1'/%3E%3C/g%3E%3C/svg%3E") center bottom / contain no-repeat;
}

/* ═══ METEOR (meta#2::after, z-2): one meteor every ~17s, three quick
   steps() postures down the upper-right sky, off-lane. NOT a continuous
   mover. ═══ */
head meta:last-of-type::after {
  content: "";
  display: var(--aurora-scenery, block);
  position: fixed;
  top: 9vh;
  right: 12vw;
  width: 180px;
  height: 110px;
  z-index: -2;
  pointer-events: none;
  opacity: 0;
  background: linear-gradient(56deg, rgba(234, 243, 255, 0) 38%, rgba(234, 243, 255, 0.55) 64%, rgba(255, 255, 255, 1) 86%, rgba(255, 255, 255, 0) 100%) center / 100% 2.4px no-repeat;
  filter: drop-shadow(0 0 6px rgba(198, 236, 255, 0.5));
  animation: aurora-meteor 17s steps(1, end) infinite;
}

/* ═══ CENTER-LANE READABILITY SCRIM (body::after, z-1): a soft dark veil
   down the middle third where the names crawl — the curtains already thin
   over the lane (their geometry parts around it); this guarantees the
   glyphs win even at the folds' brightest posture. STATIC, promoted. ═══ */
body::after {
  content: "";
  display: var(--aurora-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background:
    linear-gradient(90deg, rgba(4, 9, 18, 0) 21%, rgba(4, 9, 18, 0.26) 40%, rgba(4, 9, 18, 0.32) 50%, rgba(4, 9, 18, 0.26) 60%, rgba(4, 9, 18, 0) 79%);
}

/* ═══ fine starfield: the ONLY fine pattern, so it RIDES THE ROLL (zero
   motion relative to the tracked glyphs = zero flicker) + coarse soft
   aurora gleams drifting up with the names. ═══ */
.credits-roll::before,
.credits-slideshow::before {
  content: "";
  display: var(--aurora-scenery, block);
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.55;
  background-image:
    radial-gradient(circle at 12% 34%, rgba(77, 255, 180, 0.3) 0 6px, rgba(77, 255, 180, 0.09) 34px, rgba(77, 255, 180, 0) 64px),
    radial-gradient(circle at 90% 20%, rgba(88, 224, 232, 0.28) 0 6px, rgba(88, 224, 232, 0.08) 32px, rgba(88, 224, 232, 0) 60px),
    radial-gradient(circle at 84% 78%, rgba(182, 137, 255, 0.26) 0 6px, rgba(182, 137, 255, 0.08) 34px, rgba(182, 137, 255, 0) 62px),
    radial-gradient(circle at 8% 88%, rgba(255, 119, 184, 0.18) 0 5px, rgba(255, 119, 184, 0.06) 28px, rgba(255, 119, 184, 0) 54px),
    radial-gradient(circle at 20% 26%, rgba(234, 243, 255, 0.9) 0 1px, rgba(234, 243, 255, 0) 2px),
    radial-gradient(circle at 74% 14%, rgba(200, 235, 240, 0.8) 0 1px, rgba(200, 235, 240, 0) 2px),
    radial-gradient(circle at 52% 64%, rgba(182, 137, 255, 0.55) 0 1px, rgba(182, 137, 255, 0) 2px),
    radial-gradient(circle at 10% 82%, rgba(234, 243, 255, 0.7) 0 1px, rgba(234, 243, 255, 0) 2px),
    radial-gradient(circle at 88% 56%, rgba(200, 235, 240, 0.6) 0 1px, rgba(200, 235, 240, 0) 2px),
    radial-gradient(circle at 38% 40%, rgba(234, 243, 255, 0.5) 0 1px, rgba(234, 243, 255, 0) 2px);
  background-size: 760px 900px, 900px 820px, 820px 880px, 700px 840px, 300px 300px, 250px 250px, 360px 360px, 320px 320px, 280px 280px, 340px 340px;
}

/* ═══ section titles: thin elegant Josefin Sans caps, wide tracking, with
   a subtle STATIC aurora gradient text fill (green->teal->violet). Hue
   cycles down the roll so custom blocks inherit a coherent tint. ═══ */
.credits-block__title {
  font-family: var(--credits-title-font);
  font-weight: 600;
  letter-spacing: 0.34em;
  padding-left: 0.34em;
  text-transform: uppercase;
  color: var(--aurora-ice);
  background-image: linear-gradient(96deg, var(--aurora-green) 0%, var(--aurora-teal) 46%, var(--aurora-violet) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none;
  filter: drop-shadow(0 2px 10px rgba(2, 6, 14, 0.85)) drop-shadow(0 0 18px rgba(77, 255, 180, 0.22));
}
.credits-block:nth-of-type(3n) .credits-block__title { background-image: linear-gradient(96deg, var(--aurora-teal) 0%, var(--aurora-violet) 52%, var(--aurora-green) 100%); }
.credits-block:nth-of-type(3n + 1) .credits-block__title { background-image: linear-gradient(96deg, var(--aurora-violet) 0%, var(--aurora-green) 50%, var(--aurora-teal) 100%); }
.credits-block__title::after {
  width: min(220px, 52vw);
  height: 2px;
  margin: 0.7rem auto 0;
  opacity: 1;
  background: linear-gradient(90deg, rgba(77, 255, 180, 0) 0%, rgba(77, 255, 180, 0.6) 24%, rgba(88, 224, 232, 0.7) 50%, rgba(182, 137, 255, 0.6) 76%, rgba(182, 137, 255, 0) 100%);
}

/* ═══ rows: names are sacred — wrap, never clip. Cool snow-white with a
   faint ice glow; amounts in glacial teal behind a snowflake tick. ═══ */
.credit {
  max-width: min(42rem, 92vw);
  margin-inline: auto;
  min-width: 0;
  overflow-wrap: anywhere;
  font-weight: 400;
  letter-spacing: 0.03em;
  line-height: 1.55;
}
.credit__name {
  color: var(--aurora-snow);
  text-shadow: 0 0 16px rgba(88, 224, 232, 0.14), var(--credits-shadow);
}
.credit__amount {
  opacity: 1;
  font-size: 0.76em;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: var(--aurora-teal);
  font-variant-numeric: tabular-nums;
  text-shadow: 0 0 12px rgba(88, 224, 232, 0.22), var(--credits-shadow);
}
.credit__amount::before {
  content: "\\2744";
  font-size: 0.62em;
  color: rgba(126, 247, 196, 0.7);
  margin: 0 0.5em 0 0.7em;
  vertical-align: 0.14em;
}

/* ═══ flourish cards ═══ */
.flourish--intro { gap: 1.2rem; }
.flourish__title {
  font-family: var(--credits-title-font);
  font-weight: 600;
  letter-spacing: 0.12em;
  line-height: 1.12;
  color: var(--aurora-ice);
  background-image: linear-gradient(100deg, var(--aurora-green) 0%, var(--aurora-teal) 40%, var(--aurora-violet) 82%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none;
  filter: drop-shadow(0 2px 14px rgba(2, 6, 14, 0.9)) drop-shadow(0 0 26px rgba(77, 255, 180, 0.3));
}

/* badge -> the watch ident (copy swap via font-size:0 + ::after) */
.flourish__badge { font-size: 0; border: 0; padding: 0; box-shadow: none; }
.flourish__badge::after {
  content: "UNDER THE LIGHTS \\2022 69\\00B0 N";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 500;
  font-size: 0.8rem;
  letter-spacing: 0.4em;
  padding: 0.5rem 1rem 0.5rem 1.4rem;
  color: var(--aurora-green);
  border: 1px solid rgba(126, 247, 196, 0.4);
  border-radius: 2px;
  background:
    linear-gradient(108deg, rgba(255, 255, 255, 0) 30%, rgba(230, 255, 246, 0.16) 46%, rgba(255, 255, 255, 0) 58%),
    rgba(126, 247, 196, 0.05);
  box-shadow: 0 0 20px rgba(126, 247, 196, 0.12), inset 0 1px 0 rgba(230, 255, 246, 0.22);
  text-shadow: 0 0 10px rgba(126, 247, 196, 0.4);
}

/* tagline is streamer copy: restyle only — a quiet thin italic */
.flourish__tagline {
  font-family: var(--credits-font);
  font-style: italic;
  font-weight: 300;
  letter-spacing: 0.16em;
  padding-left: 0.16em;
  font-size: 1rem;
  color: rgba(207, 230, 255, 0.82);
}

/* rating -> the sky report (copy swap): cold ice-blue, clipped card */
.flourish__rating { font-size: 0; border: 0; padding: 0; opacity: 1; }
.flourish__rating::after {
  content: "AURORA WATCH \\2022 CLEAR SKIES";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 500;
  font-size: 0.74rem;
  letter-spacing: 0.3em;
  padding: 0.42rem 0.8rem 0.42rem 1.1rem;
  color: var(--aurora-ice);
  border: 1px solid rgba(207, 230, 255, 0.35);
  border-radius: 3px;
  background: linear-gradient(108deg, rgba(255, 255, 255, 0) 32%, rgba(224, 240, 255, 0.14) 48%, rgba(255, 255, 255, 0) 60%);
  box-shadow: inset 0 1px 0 rgba(224, 240, 255, 0.2);
  text-shadow: 0 0 10px rgba(88, 224, 232, 0.3);
}

/* a small coordinate line under the intro card, field-notes flavor */
.flourish--intro::after {
  content: "LAT 69.65 \\2022 LON 18.96 \\2022 KP 7 \\2022 -24\\00B0C";
  display: var(--aurora-scenery, block);
  font-family: var(--credits-font);
  font-weight: 400;
  font-size: 0.64rem;
  letter-spacing: 0.28em;
  padding-left: 0.28em;
  color: rgba(207, 230, 255, 0.42);
  font-variant-numeric: tabular-nums;
}

/* outro: THE LIGHTS FADE / stay warm out there (copy swap) */
.flourish--outro::before {
  content: "\\2744 \\2744 \\2744";
  display: var(--aurora-scenery, block);
  font-size: 0.72rem;
  letter-spacing: 0.7em;
  padding-left: 0.7em;
  color: rgba(126, 247, 196, 0.6);
}
.flourish--outro .flourish__title { font-size: 0; }
.flourish--outro .flourish__title::after {
  content: "THE LIGHTS FADE";
  display: inline-block;
  font-family: var(--credits-title-font);
  font-weight: 600;
  font-size: var(--credits-flourish-title-size);
  letter-spacing: 0.1em;
  line-height: 1.12;
  background-image: linear-gradient(100deg, var(--aurora-green) 0%, var(--aurora-teal) 44%, var(--aurora-violet) 88%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 14px rgba(2, 6, 14, 0.9)) drop-shadow(0 0 22px rgba(77, 255, 180, 0.26));
}
.flourish--outro .flourish__tagline { font-size: 0; }
.flourish--outro .flourish__tagline::after {
  content: "stay warm out there";
  font-family: var(--credits-font);
  font-style: italic;
  font-weight: 300;
  font-size: 1rem;
  letter-spacing: 0.18em;
  padding-left: 0.18em;
  color: rgba(207, 230, 255, 0.72);
}

/* ═══ raid finale: THE SUBSTORM. The sky flares — a green/violet corona
   wash blooms behind the block, the title burns brighter, the eyebrow
   announces the substorm. The pulse rides ::before so only the WASH
   breathes — names stay at full opacity. steps() at ~1.4 paints/s. ═══ */
.credits-block:nth-last-of-type(2),
.credits-slide:nth-last-of-type(2):not(.flourish) {
  position: relative;
}
.credits-block:nth-last-of-type(2)::before {
  content: "";
  display: block;
  position: absolute;
  inset: -1.5rem -8% -1rem;
  z-index: -1;
  pointer-events: none;
  background: radial-gradient(ellipse 60% 62% at 50% 40%, rgba(77, 255, 180, 0.16), rgba(182, 137, 255, 0.06) 54%, rgba(77, 255, 180, 0) 76%);
  animation: aurora-substorm 4.2s steps(1, end) infinite;
}
.credits-slide:nth-last-of-type(2):not(.flourish)::before {
  content: "";
  display: block;
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: radial-gradient(ellipse 66% 60% at 50% 44%, rgba(77, 255, 180, 0.14), rgba(182, 137, 255, 0.06) 60%, rgba(77, 255, 180, 0) 82%);
  animation: aurora-substorm 4.2s steps(1, end) infinite;
}
.credits-block:nth-last-of-type(2) .credits-block__title,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
  background-image: linear-gradient(96deg, var(--aurora-green) 0%, #d8fff0 50%, var(--aurora-violet) 100%);
  filter: drop-shadow(0 2px 10px rgba(2, 6, 14, 0.85)) drop-shadow(0 0 26px rgba(77, 255, 180, 0.5));
}
.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  content: "\\2726 SUBSTORM \\2022 CORONA OVERHEAD \\2726";
  display: block;
  font-family: var(--credits-font);
  font-weight: 600;
  font-size: 0.72rem;
  letter-spacing: 0.36em;
  padding-left: 0.36em;
  margin-bottom: 0.8rem;
  -webkit-text-fill-color: initial;
  color: var(--aurora-violet);
  text-shadow: 0 0 14px rgba(182, 137, 255, 0.5), var(--credits-shadow);
}
.credits-block:nth-last-of-type(2) .credit,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit {
  font-size: calc(var(--credits-name-size) * 1.1);
}
.credits-block:nth-last-of-type(2) .credit__name,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__name {
  text-shadow: 0 0 20px rgba(77, 255, 180, 0.4), var(--credits-shadow);
}

/* ═══ slideshow: each slide settles like the sky clearing ═══ */
.credits-slide {
  transform: scale(1.015);
  transition: opacity 0.9s ease, transform 1.1s cubic-bezier(0.22, 1, 0.36, 1);
}
.credits-slide.is-active { transform: scale(1); }

/* ═══ keyframes (all aurora- prefixed; transform/opacity ONLY) ═══ */
/* CURTAIN A dances: slow lateral drift + ripple; the folds visibly stream.
   Displacement ≤2vw, far inside the 10vw overscan. */
@keyframes aurora-dance-a {
  0%   { opacity: 0.88; transform: translate3d(-1.8vw, 0, 0) skewX(1.1deg); }
  26%  { opacity: 1;    transform: translate3d(0.5vw, 0, 0) skewX(-0.4deg); }
  50%  { opacity: 0.8;  transform: translate3d(2vw, 0.4vh, 0) skewX(-1.2deg); }
  74%  { opacity: 0.96; transform: translate3d(0.2vw, 0, 0) skewX(0.5deg); }
  100% { opacity: 0.88; transform: translate3d(-1.8vw, 0, 0) skewX(1.1deg); }
}
/* CURTAIN B drifts counter to A on its own longer period */
@keyframes aurora-dance-b {
  0%   { opacity: 0.72; transform: translate3d(1.6vw, 0, 0) skewX(-0.8deg); }
  36%  { opacity: 0.95; transform: translate3d(-0.8vw, -0.4vh, 0) skewX(0.5deg); }
  68%  { opacity: 0.62; transform: translate3d(-1.6vw, 0, 0) skewX(0.9deg); }
  100% { opacity: 0.72; transform: translate3d(1.6vw, 0, 0) skewX(-0.8deg); }
}
/* the quiet arc breathes on its own 11s cadence */
@keyframes aurora-arc {
  0%   { opacity: 0.78; transform: translate3d(1vw, 0, 0); }
  38%  { opacity: 1;    transform: translate3d(-0.8vw, 0, 0); }
  70%  { opacity: 0.66; transform: translate3d(0.4vw, 0, 0); }
  100% { opacity: 0.78; transform: translate3d(1vw, 0, 0); }
}
/* campfire: discrete brightness postures, ~1.3 paints/s on a small layer */
@keyframes aurora-fire {
  0%   { opacity: 0.75; transform: scale(1); }
  21%  { opacity: 1;    transform: scale(1.04); }
  42%  { opacity: 0.82; transform: scale(0.98); }
  58%  { opacity: 0.95; transform: scale(1.02); }
  79%  { opacity: 0.7;  transform: scale(0.97); }
  100% { opacity: 0.75; transform: scale(1); }
}
/* meteor: dark 88% of the cycle, then three quick steps down the sky */
@keyframes aurora-meteor {
  0%, 88%  { opacity: 0; transform: translate3d(0, 0, 0) rotate(-16deg); }
  89%      { opacity: 0.9; transform: translate3d(0, 0, 0) rotate(-16deg); }
  92%      { opacity: 0.85; transform: translate3d(-5vw, 4vh, 0) rotate(-16deg); }
  95%      { opacity: 0.6; transform: translate3d(-10vw, 8vh, 0) rotate(-16deg); }
  97%      { opacity: 0; transform: translate3d(-13vw, 11vh, 0) rotate(-16deg); }
  100%     { opacity: 0; transform: translate3d(0, 0, 0) rotate(-16deg); }
}
/* finale substorm: 4 discrete brightness stops per 4.2s (~1.4 paints/s) */
@keyframes aurora-substorm {
  0%, 46%  { opacity: 1; }
  52%, 66% { opacity: 0.72; }
  72%, 86% { opacity: 1; }
  90%, 96% { opacity: 0.85; }
  100%     { opacity: 1; }
}

/* ═══ reduced motion: the night holds still — every band parks at a bright
   posture, the fire holds its warm pool, the meteor stays dark, the
   substorm rests, slides fall back to the base fade. Parks at MATCHING
   specificity. ═══ */
@media (prefers-reduced-motion: reduce) {
  html::after { animation: none; opacity: 1; transform: none; }
  head::before { animation: none; opacity: 0.85; transform: none; }
  head::after { animation: none; opacity: 0.95; transform: none; }
  head meta:first-of-type::after { animation: none; opacity: 0.85; transform: none; }
  head meta:last-of-type::after { animation: none; opacity: 0; }
  .credits-block:nth-last-of-type(2)::before,
  .credits-slide:nth-last-of-type(2):not(.flourish)::before { animation: none; opacity: 1; }
  .credits-slide { transform: none; transition: opacity 0.8s ease; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--aurora-scenery:none;}",
};
