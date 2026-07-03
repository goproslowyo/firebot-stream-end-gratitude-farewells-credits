import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. Luna: a silver nocturne — one cratered, earthshine-limbed moon over a still sea, a rowboat adrift on the moonglade, pines dark on the shore, one rare shooting star, names drifting through the quiet hours. */
export const VARIANT: ThemeVariant = {
  key: "luna",
  name: "Luna — Silver Nocturne",
  css: `/* ================================================================
   LUNA — SILVER NOCTURNE (layered AFTER the base sheet)
   Fiction: the stream ends and the night takes over. A cratered
   moon hangs in the upper-left third over a still black sea; its
   moonglade shimmers in coarse static bands below the horizon; two
   thin cloud layers cross the sky in slow discrete hops (time-lapse
   stillness, one hop every ~3s); three stars share one steps()
   twinkle. Near-stillness IS the design: ZERO continuous movers.
   The one warm note (#ffd9a0) is saved for the raid finale.
   Layer map (all scenery kill-switched via --luna-scenery):
     html bg (--credits-bg)   ink-navy vertical nocturne (ONE linear)
     html::before  z-2        THE NIGHT: static stars + moon-sky bloom
                              + horizon glow + moonglade bands + sea.
                              STATIC, promoted
     head::before  z-1        THE MOON — SVG data-URI sphere: volume
                              gradient, maria, rim-lit craters + peaks
                              + ray system, curved terminator,
                              EARTHSHINE lifting the dark limb; halo
                              via outset box-shadow. STATIC, promoted
     meta#1::before z-1       PINE HEADLAND — bottom-right corner:
                              far ridge + near shore, moon-side rim
                              light on the two hero pines. STATIC
     meta#1::after z-1        THE ROWBOAT — tiny still silhouette on
                              the moonglade, lit gunwale + broken
                              reflection. STATIC
     meta#2::before z-1       ONE shooting star — three steps() states
                              once per 31s, upper-right, off-lane
     head::after   z-1        far cloud sheet, steps() ~1 hop/3s
     body::before  z-1        near cloud sheet, steps() ~1 hop/3s
     body::after   z-1        3 twinkle stars, shared steps() opacity
     html::after   z-1        center-lane readability scrim, STATIC,
                              masked open over the moonglade
   ================================================================ */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');

:root {
  /* ── palette ── */
  --luna-scenery: block; /* set to none to strip every scenery layer */
  --luna-ink: #0a0e1a;
  --luna-deep: #060912;
  --luna-silver: #dfe6f0;
  --luna-steel: #9fb6d9;
  --luna-star: #ffd9a0; /* the ONE warm note — raid finale only */
  --luna-text: #e9eef6;

  /* ── base hooks ── */
  /* Cheap sky: ONE vertical linear — cold zenith easing into ink,
     the faintest steel lift low where the sea will catch the moon
     (L3: root bg stays simple; every texture lives on promoted
     fixed pseudos). */
  --credits-bg: linear-gradient(180deg, #0d1226 0%, #0a0e1a 24%, #080c16 46%, #070a13 64%, #081020 78%, #060912 100%);
  --credits-color: var(--luna-text);
  --credits-accent: var(--luna-steel);
  --credits-font: "Cormorant Garamond", "Didot", Georgia, "Times New Roman", serif;
  --credits-title-font: "Cormorant Garamond", "Didot", Georgia, "Times New Roman", serif;
  --credits-title-size: clamp(1.5rem, 3.8vw, 2.3rem);
  --credits-name-size: clamp(1.2rem, 3vw, 1.85rem);
  --credits-flourish-title-size: clamp(2.7rem, 8.2vw, 5.2rem);
  --credits-block-gap: 5.5rem; /* wide, unhurried — nocturne pacing */
  --credits-name-gap: 0.7rem;
  --credits-shadow: 0 1px 12px rgba(3, 6, 12, 0.75);
  /* quiet STATIC steel glow on titles (never animated; never "none") */
  --credits-glow: 0 0 22px rgba(159, 182, 217, 0.3);
}

/* canvas split: sky paints once on <html>, unmasked; body keeps the
   base edge-fade so names still surface from the sea and dissolve
   into the zenith. */
html { -webkit-mask-image: none; mask-image: none; }
body { background: transparent; }

/* ═══ THE NIGHT (html::before, z-2): one static promoted bundle —
   sparse single stars (edges + very top only, L6: no fine pattern in
   the text lane), the sky bloom behind the moon, the horizon glow,
   the moonglade (coarse soft bands >= 12px rendered, low alpha) and
   the still sea. Paints once. ═══ */
html::before {
  content: "";
  display: var(--luna-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* ── STAR SPARKLE: static specular diffraction-glints baked on the
       brightest beacons (upper-right + upper-left corners, well off the
       center text lane). STATIC — always L6-safe. A full-viewport SVG
       drawn topmost so the four-point spikes crown the field stars. ── */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000' preserveAspectRatio='none'%3E%3Cdefs%3E%3ClinearGradient id='sv' x1='0.5' y1='0' x2='0.5' y2='1'%3E%3Cstop offset='0' stop-color='%23fff' stop-opacity='0'/%3E%3Cstop offset='0.5' stop-color='%23f4f9ff' stop-opacity='0.95'/%3E%3Cstop offset='1' stop-color='%23fff' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='sh' x1='0' y1='0.5' x2='1' y2='0.5'%3E%3Cstop offset='0' stop-color='%23fff' stop-opacity='0'/%3E%3Cstop offset='0.5' stop-color='%23f4f9ff' stop-opacity='0.95'/%3E%3Cstop offset='1' stop-color='%23fff' stop-opacity='0'/%3E%3C/linearGradient%3E%3CradialGradient id='sc' cx='0.5' cy='0.5' r='0.5'%3E%3Cstop offset='0' stop-color='%23ffffff' stop-opacity='1'/%3E%3Cstop offset='0.4' stop-color='%23d6e6fb' stop-opacity='0.5'/%3E%3Cstop offset='1' stop-color='%239fb6d9' stop-opacity='0'/%3E%3C/radialGradient%3E%3Cg id='star'%3E%3Ccircle r='9' fill='url(%23sc)'/%3E%3Crect x='-1.1' y='-30' width='2.2' height='60' fill='url(%23sv)'/%3E%3Crect x='-30' y='-1.1' width='60' height='2.2' fill='url(%23sh)'/%3E%3Crect x='-0.7' y='-17' width='1.4' height='34' fill='url(%23sv)' transform='rotate(45)'/%3E%3Crect x='-17' y='-0.7' width='34' height='1.4' fill='url(%23sh)' transform='rotate(45)'/%3E%3Ccircle r='2.2' fill='%23ffffff'/%3E%3C/g%3E%3C/defs%3E%3Cuse href='%23star' transform='translate(180 55) scale(1.15)' opacity='0.92'/%3E%3Cuse href='%23star' transform='translate(760 180)' opacity='0.85'/%3E%3Cuse href='%23star' transform='translate(830 90) scale(0.9)' opacity='0.9'/%3E%3Cuse href='%23star' transform='translate(900 290) scale(0.78)' opacity='0.8'/%3E%3Cuse href='%23star' transform='translate(560 30) scale(0.7)' opacity='0.7'/%3E%3C/svg%3E") 0 0 / 100% 100% no-repeat,
    /* moonglade — ONE coherent ribbon of reflected light: a continuous
       bright vertical spine (a soft-edged wedge widening toward the
       viewer) carrying wide edge-to-edge glint bars that overlap so the
       path never breaks into disconnected pills. L6-safe: every bar is
       a coarse soft feature spanning most of the width, no fine cells. */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='spineX' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23dfe4dc' stop-opacity='0'/%3E%3Cstop offset='0.5' stop-color='%23eef0e8' stop-opacity='1'/%3E%3Cstop offset='1' stop-color='%23dfe4dc' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='spineY' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23fff' stop-opacity='0.62'/%3E%3Cstop offset='0.5' stop-color='%23fff' stop-opacity='0.34'/%3E%3Cstop offset='0.82' stop-color='%23fff' stop-opacity='0.16'/%3E%3Cstop offset='1' stop-color='%23fff' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='coreY' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23fdf6e8' stop-opacity='0'/%3E%3Cstop offset='0.12' stop-color='%23fdf6e8' stop-opacity='0.7'/%3E%3Cstop offset='0.4' stop-color='%23f6efe0' stop-opacity='0.5'/%3E%3Cstop offset='0.8' stop-color='%23eef0e8' stop-opacity='0.2'/%3E%3Cstop offset='1' stop-color='%23eef0e8' stop-opacity='0'/%3E%3C/linearGradient%3E%3CradialGradient id='barG' cx='0.5' cy='0.5' r='0.5'%3E%3Cstop offset='0' stop-color='%23f2f4ec' stop-opacity='1'/%3E%3Cstop offset='0.6' stop-color='%23e6ebe0' stop-opacity='0.4'/%3E%3Cstop offset='1' stop-color='%23e6ebe0' stop-opacity='0'/%3E%3C/radialGradient%3E%3Cmask id='spineMask'%3E%3Crect x='0' y='0' width='200' height='200' fill='url(%23spineY)'/%3E%3C/mask%3E%3C/defs%3E%3Cg mask='url(%23spineMask)'%3E%3C!-- the wedge body: narrow at horizon, flaring toward viewer --%3E%3Cpath d='M92 0 L108 0 L150 200 L50 200 Z' fill='url(%23spineX)' opacity='0.5'/%3E%3C!-- overlapping coarse glint bars, each spanning the ribbon width so there is no gap --%3E%3Cellipse cx='100' cy='8' rx='22' ry='4.2' fill='url(%23barG)' opacity='0.62'/%3E%3Cellipse cx='97' cy='24' rx='26' ry='4.6' fill='url(%23barG)' opacity='0.5'/%3E%3Cellipse cx='103' cy='40' rx='30' ry='5' fill='url(%23barG)' opacity='0.58'/%3E%3Cellipse cx='96' cy='58' rx='34' ry='5.4' fill='url(%23barG)' opacity='0.46'/%3E%3Cellipse cx='104' cy='76' rx='40' ry='6' fill='url(%23barG)' opacity='0.54'/%3E%3Cellipse cx='97' cy='96' rx='46' ry='6.6' fill='url(%23barG)' opacity='0.44'/%3E%3Cellipse cx='102' cy='118' rx='54' ry='7.4' fill='url(%23barG)' opacity='0.5'/%3E%3Cellipse cx='96' cy='142' rx='62' ry='8' fill='url(%23barG)' opacity='0.4'/%3E%3Cellipse cx='103' cy='166' rx='70' ry='8.6' fill='url(%23barG)' opacity='0.44'/%3E%3Cellipse cx='99' cy='190' rx='80' ry='9.2' fill='url(%23barG)' opacity='0.34'/%3E%3C/g%3E%3C!-- the bright warm core spine: a soft-shouldered ribbon (wider feathered shoulder + narrow bright spine) keeping the path whole down its middle --%3E%3Cpath d='M96 20 L104 20 L118 200 L82 200 Z' fill='url(%23coreY)' opacity='0.5'/%3E%3Crect x='96.5' y='0' width='7' height='200' fill='url(%23coreY)' opacity='0.85' rx='3'/%3E%3C!-- specular sparkle glints riding the core: coarse soft points where moonlight catches wavelets (all >= ~9px rendered, L6-safe) --%3E%3Cellipse cx='100' cy='10' rx='6' ry='2.4' fill='%23fffdf6' opacity='0.85'/%3E%3Cellipse cx='97' cy='46' rx='5' ry='2' fill='%23fffdf6' opacity='0.6'/%3E%3Cellipse cx='103' cy='92' rx='5.5' ry='2.2' fill='%23fffbf2' opacity='0.55'/%3E%3Cellipse cx='98' cy='140' rx='5' ry='2' fill='%23fdf8ee' opacity='0.42'/%3E%3C/svg%3E") 12vw 76.5vh / 26vw 24vh no-repeat,
    /* the glade's binder column — one soft vertical wash under the bands */
    radial-gradient(ellipse 6vw 20vh at 25vw 88vh, rgba(230, 228, 218, 0.07) 0%, rgba(230, 228, 218, 0) 70%),
    /* the bright water-line where the glade meets the horizon — warm at
       the moon's foot, cooling out to the wings */
    radial-gradient(ellipse 26vw 1.4vh at 25vw 77.2vh, rgba(238, 230, 210, 0.36) 0%, rgba(210, 216, 232, 0.12) 55%, rgba(200, 216, 238, 0) 100%),
    /* wide horizon airglow */
    radial-gradient(ellipse 62vw 6vh at 28vw 77vh, rgba(159, 182, 217, 0.14) 0%, rgba(159, 182, 217, 0.04) 60%, rgba(159, 182, 217, 0) 100%),
    /* sky bloom behind the moon — the air remembers the light */
    radial-gradient(ellipse 34vw 30vh at 25vw 22vh, rgba(159, 182, 217, 0.12) 0%, rgba(159, 182, 217, 0) 70%),
    /* MILKY WAY — a faint galactic haze arcing through the empty upper-right
       sky (coarse + very low alpha so L6 holds; two overlapped soft ellipses
       give it an uneven, cloudy body, not a clean band) */
    radial-gradient(ellipse 30vw 12vh at 82vw 14vh, rgba(190, 200, 224, 0.07) 0%, rgba(190, 200, 224, 0.025) 55%, rgba(190, 200, 224, 0) 100%),
    radial-gradient(ellipse 22vw 9vh at 68vw 24vh, rgba(176, 190, 220, 0.055) 0%, rgba(176, 190, 220, 0) 70%),
    radial-gradient(ellipse 18vw 26vh at 93vw 34vh, rgba(184, 196, 222, 0.05) 0%, rgba(184, 196, 222, 0) 72%),
    /* ── STAR FIELD: varied magnitudes at edges + the very top (L6:
       nothing fine over the center lane). A handful of bright beacons
       carry a wider cool bloom; two warm stars (amber/rose) add colour
       temperature; the rest are faint field dust. ── */
    /* bright beacons — bigger core + soft cool bloom */
    radial-gradient(circle at 18vw 5.5vh, rgba(246, 250, 255, 0.92) 0 1.7px, rgba(210, 224, 244, 0.5) 2.8px, rgba(159, 182, 217, 0.22) 4.6px, rgba(159, 182, 217, 0) 6.4px),
    radial-gradient(circle at 76vw 18vh, rgba(246, 250, 255, 0.88) 0 1.6px, rgba(210, 224, 244, 0.46) 2.7px, rgba(159, 182, 217, 0.2) 4.4px, rgba(159, 182, 217, 0) 6.2px),
    radial-gradient(circle at 90vw 29vh, rgba(244, 249, 255, 0.82) 0 1.5px, rgba(200, 216, 240, 0.4) 2.6px, rgba(159, 182, 217, 0.18) 4.2px, rgba(159, 182, 217, 0) 5.8px),
    /* extra beacons enriching the upper-right galactic haze */
    radial-gradient(circle at 83vw 9vh, rgba(246, 250, 255, 0.9) 0 1.7px, rgba(210, 224, 244, 0.48) 2.9px, rgba(159, 182, 217, 0.2) 4.6px, rgba(159, 182, 217, 0) 6.4px),
    radial-gradient(circle at 70vw 27vh, rgba(255, 244, 222, 0.78) 0 1.5px, rgba(240, 210, 168, 0.34) 2.7px, rgba(240, 210, 168, 0) 4.4px),
    radial-gradient(circle at 95vw 20vh, rgba(244, 249, 255, 0.78) 0 1.4px, rgba(200, 216, 240, 0.36) 2.5px, rgba(159, 182, 217, 0.16) 4px, rgba(159, 182, 217, 0) 5.6px),
    /* two warm stars — the sky is not all one temperature */
    radial-gradient(circle at 56vw 3vh, rgba(255, 240, 214, 0.8) 0 1.4px, rgba(240, 206, 158, 0.34) 2.6px, rgba(240, 206, 158, 0) 4.2px),
    radial-gradient(circle at 9vw 55vh, rgba(255, 226, 210, 0.55) 0 1.1px, rgba(226, 174, 160, 0.24) 2.1px, rgba(226, 174, 160, 0) 3.4px),
    /* mid field stars */
    radial-gradient(circle at 6vw 12vh, rgba(232, 238, 248, 0.55) 0 1.3px, rgba(159, 182, 217, 0.25) 2.4px, rgba(159, 182, 217, 0) 3.6px),
    radial-gradient(circle at 12vw 33vh, rgba(232, 238, 248, 0.4) 0 1px, rgba(159, 182, 217, 0.18) 2px, rgba(159, 182, 217, 0) 3px),
    radial-gradient(circle at 22vw 46vh, rgba(232, 238, 248, 0.28) 0 0.9px, rgba(159, 182, 217, 0.13) 1.8px, rgba(159, 182, 217, 0) 2.8px),
    radial-gradient(circle at 41vw 4.5vh, rgba(232, 238, 248, 0.42) 0 1.1px, rgba(159, 182, 217, 0.2) 2px, rgba(159, 182, 217, 0) 3.1px),
    radial-gradient(circle at 67vw 7vh, rgba(232, 238, 248, 0.36) 0 1px, rgba(159, 182, 217, 0.16) 1.9px, rgba(159, 182, 217, 0) 2.9px),
    radial-gradient(circle at 84vw 8vh, rgba(232, 238, 248, 0.45) 0 1.1px, rgba(159, 182, 217, 0.2) 2.1px, rgba(159, 182, 217, 0) 3.2px),
    radial-gradient(circle at 87vw 47vh, rgba(232, 238, 248, 0.3) 0 1px, rgba(159, 182, 217, 0.14) 1.9px, rgba(159, 182, 217, 0) 2.9px),
    radial-gradient(circle at 95vw 13vh, rgba(232, 238, 248, 0.48) 0 1.2px, rgba(159, 182, 217, 0.22) 2.2px, rgba(159, 182, 217, 0) 3.4px),
    radial-gradient(circle at 80vw 38vh, rgba(232, 238, 248, 0.28) 0 0.9px, rgba(159, 182, 217, 0.13) 1.8px, rgba(159, 182, 217, 0) 2.8px),
    /* faint field dust — the far, dim stars (extra grains scattered through the
       upper-right galactic haze give it granular star density) */
    radial-gradient(circle at 78vw 6vh, rgba(226, 234, 246, 0.24) 0 0.7px, rgba(159, 182, 217, 0.1) 1.4px, rgba(159, 182, 217, 0) 2.2px),
    radial-gradient(circle at 88vw 16vh, rgba(226, 234, 246, 0.22) 0 0.7px, rgba(159, 182, 217, 0.1) 1.3px, rgba(159, 182, 217, 0) 2.1px),
    radial-gradient(circle at 73vw 20vh, rgba(226, 234, 246, 0.2) 0 0.6px, rgba(159, 182, 217, 0.09) 1.2px, rgba(159, 182, 217, 0) 2px),
    radial-gradient(circle at 97vw 30vh, rgba(226, 234, 246, 0.22) 0 0.7px, rgba(159, 182, 217, 0.1) 1.3px, rgba(159, 182, 217, 0) 2.1px),
    radial-gradient(circle at 65vw 15vh, rgba(226, 234, 246, 0.2) 0 0.6px, rgba(159, 182, 217, 0.09) 1.2px, rgba(159, 182, 217, 0) 2px),
    radial-gradient(circle at 92vw 40vh, rgba(226, 234, 246, 0.2) 0 0.6px, rgba(159, 182, 217, 0.09) 1.2px, rgba(159, 182, 217, 0) 2px),
    radial-gradient(circle at 3.5vw 26vh, rgba(226, 234, 246, 0.22) 0 0.7px, rgba(159, 182, 217, 0.1) 1.4px, rgba(159, 182, 217, 0) 2.2px),
    radial-gradient(circle at 15vw 60vh, rgba(226, 234, 246, 0.2) 0 0.7px, rgba(159, 182, 217, 0.09) 1.3px, rgba(159, 182, 217, 0) 2.1px),
    radial-gradient(circle at 33vw 8vh, rgba(226, 234, 246, 0.2) 0 0.7px, rgba(159, 182, 217, 0.09) 1.3px, rgba(159, 182, 217, 0) 2.1px),
    radial-gradient(circle at 63vw 11vh, rgba(226, 234, 246, 0.24) 0 0.8px, rgba(159, 182, 217, 0.1) 1.4px, rgba(159, 182, 217, 0) 2.2px),
    radial-gradient(circle at 71vw 27vh, rgba(226, 234, 246, 0.2) 0 0.7px, rgba(159, 182, 217, 0.09) 1.3px, rgba(159, 182, 217, 0) 2.1px),
    radial-gradient(circle at 93vw 40vh, rgba(226, 234, 246, 0.22) 0 0.7px, rgba(159, 182, 217, 0.1) 1.4px, rgba(159, 182, 217, 0) 2.2px),
    radial-gradient(circle at 97vw 24vh, rgba(226, 234, 246, 0.2) 0 0.7px, rgba(159, 182, 217, 0.09) 1.3px, rgba(159, 182, 217, 0) 2.1px),
    /* the still sea — moonlit steel at the horizon deepening to the hull of night */
    linear-gradient(180deg, rgba(6, 10, 20, 0) 76.1%, #16233c 77%, #0d1930 80%, #091326 86%, #050b16 93%, #03060e 100%);
}

/* ═══ THE MOON (head::before, z-1): the hero prop. One SVG data-URI
   sphere — volume gradient lit from upper-left, four maria, craters
   with offset rim highlights (light underlay peeking on the lit-away
   edge), one bright young crater with a bloom, a curved terminator
   hugging the lower-right limb (its dark side faces the text lane),
   and limb darkening. Halo = two nested outset shadows (the "two
   nested radials behind"). STATIC; promoted by its 3d transform.
   head opts in as a render node (children stay display:none). ═══ */
head { display: var(--luna-scenery, block); }
head::before {
  content: "";
  display: var(--luna-scenery, block);
  position: fixed;
  top: 7vh;
  left: 25vw;
  width: 34vmin;
  height: 34vmin;
  z-index: -1;
  pointer-events: none;
  border-radius: 50%;
  transform: translate3d(-50%, 0, 0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'%3E%3Cdefs%3E%3CradialGradient id='sph' cx='0.37' cy='0.32' r='0.98'%3E%3Cstop offset='0' stop-color='%23f7f4ed'/%3E%3Cstop offset='0.22' stop-color='%23e9e4d9'/%3E%3Cstop offset='0.4' stop-color='%23d2cdc1'/%3E%3Cstop offset='0.56' stop-color='%23b4b0a6'/%3E%3Cstop offset='0.72' stop-color='%2390918b'/%3E%3Cstop offset='0.86' stop-color='%236f7278'/%3E%3Cstop offset='0.95' stop-color='%2354565f'/%3E%3Cstop offset='1' stop-color='%23414350'/%3E%3C/radialGradient%3E%3CradialGradient id='mare' cx='0.42' cy='0.4' r='0.62'%3E%3Cstop offset='0' stop-color='%233f4557' stop-opacity='0.7'/%3E%3Cstop offset='0.55' stop-color='%23434a5c' stop-opacity='0.66'/%3E%3Cstop offset='0.86' stop-color='%23485061' stop-opacity='0.5'/%3E%3Cstop offset='1' stop-color='%234a5264' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='mareB' cx='0.42' cy='0.4' r='0.62'%3E%3Cstop offset='0' stop-color='%23474e60' stop-opacity='0.64'/%3E%3Cstop offset='0.55' stop-color='%234b5366' stop-opacity='0.6'/%3E%3Cstop offset='0.86' stop-color='%234e566a' stop-opacity='0.44'/%3E%3Cstop offset='1' stop-color='%234e566a' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='mareW' cx='0.42' cy='0.4' r='0.62'%3E%3Cstop offset='0' stop-color='%234a4d55' stop-opacity='0.6'/%3E%3Cstop offset='0.55' stop-color='%234d5059' stop-opacity='0.56'/%3E%3Cstop offset='0.86' stop-color='%2350535d' stop-opacity='0.4'/%3E%3Cstop offset='1' stop-color='%2350535d' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='mareCore' cx='0.46' cy='0.44' r='0.66'%3E%3Cstop offset='0' stop-color='%23343a4b' stop-opacity='0.5'/%3E%3Cstop offset='0.6' stop-color='%23383f52' stop-opacity='0.32'/%3E%3Cstop offset='1' stop-color='%233a4154' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='term' cx='0.33' cy='0.29' r='1.02'%3E%3Cstop offset='0.36' stop-color='%230a0e18' stop-opacity='0'/%3E%3Cstop offset='0.58' stop-color='%2309101f' stop-opacity='0.14'/%3E%3Cstop offset='0.76' stop-color='%23070c1a' stop-opacity='0.42'/%3E%3Cstop offset='0.9' stop-color='%2305080f' stop-opacity='0.72'/%3E%3Cstop offset='1' stop-color='%2302040a' stop-opacity='0.92'/%3E%3C/radialGradient%3E%3CradialGradient id='earth' cx='0.82' cy='0.82' r='0.62'%3E%3Cstop offset='0' stop-color='%238ea4cc' stop-opacity='0.3'/%3E%3Cstop offset='0.5' stop-color='%238ea4cc' stop-opacity='0.1'/%3E%3Cstop offset='0.8' stop-color='%238ea4cc' stop-opacity='0.02'/%3E%3Cstop offset='1' stop-color='%238ea4cc' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='limbwarm' cx='0.28' cy='0.24' r='0.62'%3E%3Cstop offset='0' stop-color='%23fffaf0' stop-opacity='0.5'/%3E%3Cstop offset='0.5' stop-color='%23fdf6e8' stop-opacity='0.12'/%3E%3Cstop offset='1' stop-color='%23fdf6e8' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='hi' cx='0.5' cy='0.5' r='0.5'%3E%3Cstop offset='0' stop-color='%23fdfbf5' stop-opacity='0.2'/%3E%3Cstop offset='1' stop-color='%23fdfbf5' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='tycho' cx='0.5' cy='0.5' r='0.5'%3E%3Cstop offset='0' stop-color='%23fbf6ec' stop-opacity='0.4'/%3E%3Cstop offset='0.5' stop-color='%23f2ece0' stop-opacity='0.1'/%3E%3Cstop offset='1' stop-color='%23f2ece0' stop-opacity='0'/%3E%3C/radialGradient%3E%3Cfilter id='soft' x='-25%25' y='-25%25' width='150%25' height='150%25'%3E%3CfeGaussianBlur stdDeviation='1.1'/%3E%3C/filter%3E%3Cfilter id='soft2' x='-20%25' y='-20%25' width='140%25' height='140%25'%3E%3CfeGaussianBlur stdDeviation='1.2'/%3E%3C/filter%3E%3CclipPath id='disc'%3E%3Ccircle cx='120' cy='120' r='119.5'/%3E%3C/clipPath%3E%3C/defs%3E%3Ccircle cx='120' cy='120' r='119.5' fill='url(%23sph)'/%3E%3Cellipse cx='84' cy='76' rx='58' ry='52' fill='url(%23hi)'/%3E%3Cg clip-path='url(%23disc)'%3E%3Cg filter='url(%23soft)'%3E%3C!-- MARE IMBRIUM — the great NW basin, large + lobed --%3E%3Cpath d='M40 66 Q46 44 70 40 Q96 36 116 48 Q128 58 124 76 Q120 94 100 100 Q78 106 58 98 Q40 90 34 76 Q34 70 40 66 Z' fill='url(%23mareCore)'/%3E%3Cpath d='M40 66 Q46 44 70 40 Q96 36 116 48 Q128 58 124 76 Q120 94 100 100 Q78 106 58 98 Q40 90 34 76 Q34 70 40 66 Z' fill='url(%23mare)'/%3E%3C!-- MARE SERENITATIS — merges into Imbrium's east shore --%3E%3Cpath d='M112 54 Q136 46 158 58 Q174 68 170 90 Q164 108 142 108 Q120 106 112 88 Q106 70 112 54 Z' fill='url(%23mareCore)'/%3E%3Cpath d='M112 54 Q136 46 158 58 Q174 68 170 90 Q164 108 142 108 Q120 106 112 88 Q106 70 112 54 Z' fill='url(%23mareB)'/%3E%3C!-- MARE TRANQUILLITATIS — the lower basin, hangs off Serenitatis --%3E%3Cpath d='M132 100 Q158 96 172 112 Q182 126 174 144 Q162 160 142 156 Q124 150 122 130 Q124 108 132 100 Z' fill='url(%23mareCore)'/%3E%3Cpath d='M132 100 Q158 96 172 112 Q182 126 174 144 Q162 160 142 156 Q124 150 122 130 Q124 108 132 100 Z' fill='url(%23mareW)' opacity='0.9'/%3E%3C!-- MARE NUBIUM / central — under Imbrium, ties the face together --%3E%3Cpath d='M88 98 Q112 94 124 108 Q132 122 122 138 Q108 152 86 146 Q68 138 68 116 Q72 102 88 98 Z' fill='url(%23mareCore)'/%3E%3Cpath d='M88 98 Q112 94 124 108 Q132 122 122 138 Q108 152 86 146 Q68 138 68 116 Q72 102 88 98 Z' fill='url(%23mare)' opacity='0.9'/%3E%3C!-- OCEANUS PROCELLARUM — the vast western dark plain along the limb --%3E%3Cpath d='M44 96 Q60 90 70 104 Q78 118 72 142 Q64 168 44 172 Q26 170 22 146 Q22 118 34 104 Q38 98 44 96 Z' fill='url(%23mareCore)'/%3E%3Cpath d='M44 96 Q60 90 70 104 Q78 118 72 142 Q64 168 44 172 Q26 170 22 146 Q22 118 34 104 Q38 98 44 96 Z' fill='url(%23mare)' opacity='0.86'/%3E%3C!-- MARE CRISIUM — the detached round sea near the E limb --%3E%3Cellipse cx='196' cy='86' rx='15' ry='18' fill='url(%23mareCore)' transform='rotate(-12 196 86)'/%3E%3Cellipse cx='196' cy='86' rx='15' ry='18' fill='url(%23mareB)' transform='rotate(-12 196 86)'/%3E%3C!-- MARE FECUNDITATIS — SE, hangs off Tranquillitatis --%3E%3Cpath d='M158 130 Q178 128 186 144 Q190 158 178 168 Q164 174 154 160 Q150 144 158 130 Z' fill='url(%23mareW)' opacity='0.7'/%3E%3C/g%3E%3C!-- mare shorelines: a faint sunward light rim so the seas read as sunken plains --%3E%3Cg fill='none' stroke='%23d7d3c8' stroke-opacity='0.13' stroke-width='1.1' filter='url(%23soft2)'%3E%3Cpath d='M40 66 Q46 44 70 40 Q96 36 116 48'/%3E%3Cpath d='M112 54 Q136 46 158 58'/%3E%3Cpath d='M44 96 Q60 90 70 104'/%3E%3C/g%3E%3Cg filter='url(%23soft2)' opacity='0.28'%3E%3Cellipse cx='62' cy='72' rx='13' ry='10' fill='%233a404c' transform='rotate(-24 62 72)'/%3E%3Cellipse cx='104' cy='118' rx='11' ry='9' fill='%2339404a' transform='rotate(30 104 118)'/%3E%3Cellipse cx='160' cy='138' rx='10' ry='8' fill='%2338404a' transform='rotate(18 160 138)'/%3E%3Cellipse cx='50' cy='150' rx='9' ry='8' fill='%233a404a'/%3E%3C/g%3E%3Cg%3E%3Ccircle cx='96.0' cy='198.0' r='6.1' fill='%23413c31' opacity='0.29'/%3E%3Ccircle cx='96.0' cy='198.0' r='6.5' fill='none' stroke='%23f6f1e6' stroke-opacity='0.31' stroke-width='2.55'/%3E%3Ccircle cx='96.0' cy='198.0' r='7.7' fill='none' stroke='%23262219' stroke-opacity='0.14' stroke-width='1.05'/%3E%3Ccircle cx='150.0' cy='196.0' r='5.7' fill='%23413c31' opacity='0.27'/%3E%3Ccircle cx='150.0' cy='196.0' r='6.0' fill='none' stroke='%23f6f1e6' stroke-opacity='0.29' stroke-width='2.38'/%3E%3Ccircle cx='150.0' cy='196.0' r='7.1' fill='none' stroke='%23262219' stroke-opacity='0.14' stroke-width='0.98'/%3E%3Ccircle cx='58.0' cy='152.0' r='4.9' fill='%23413c31' opacity='0.26'/%3E%3Ccircle cx='58.0' cy='152.0' r='5.2' fill='none' stroke='%23f6f1e6' stroke-opacity='0.28' stroke-width='2.04'/%3E%3Ccircle cx='58.0' cy='152.0' r='6.1' fill='none' stroke='%23262219' stroke-opacity='0.13' stroke-width='0.84'/%3E%3Ccircle cx='110.0' cy='168.0' r='3.6' fill='%23413c31' opacity='0.23'/%3E%3Ccircle cx='110.0' cy='168.0' r='3.8' fill='none' stroke='%23f6f1e6' stroke-opacity='0.24' stroke-width='1.50'/%3E%3Ccircle cx='110.0' cy='168.0' r='4.5' fill='none' stroke='%23262219' stroke-opacity='0.12' stroke-width='0.62'/%3E%3Ccircle cx='128.0' cy='140.0' r='3.3' fill='%23413c31' opacity='0.22'/%3E%3Ccircle cx='128.0' cy='140.0' r='3.4' fill='none' stroke='%23f6f1e6' stroke-opacity='0.23' stroke-width='1.36'/%3E%3Ccircle cx='128.0' cy='140.0' r='4.1' fill='none' stroke='%23262219' stroke-opacity='0.11' stroke-width='0.56'/%3E%3Ccircle cx='78.0' cy='182.0' r='3.8' fill='%23413c31' opacity='0.23'/%3E%3Ccircle cx='78.0' cy='182.0' r='4.0' fill='none' stroke='%23f6f1e6' stroke-opacity='0.24' stroke-width='1.56'/%3E%3Ccircle cx='78.0' cy='182.0' r='4.7' fill='none' stroke='%23262219' stroke-opacity='0.12' stroke-width='0.64'/%3E%3Ccircle cx='190.0' cy='168.0' r='5.2' fill='%2337332a' opacity='0.36'/%3E%3Cellipse cx='188.8' cy='166.4' rx='3.7' ry='3.4' fill='%23191712' opacity='0.45'/%3E%3Cellipse cx='186.9' cy='163.9' rx='2.4' ry='1.7' fill='%23fbf6ec' opacity='0.27'/%3E%3Ccircle cx='190.0' cy='168.0' r='6.0' fill='none' stroke='%23fdf9ef' stroke-opacity='0.20' stroke-width='0.96'/%3E%3Ccircle cx='204.0' cy='140.0' r='4.3' fill='%2337332a' opacity='0.34'/%3E%3Cellipse cx='203.0' cy='138.6' rx='3.1' ry='2.8' fill='%23191712' opacity='0.42'/%3E%3Cellipse cx='201.4' cy='136.6' rx='2.0' ry='1.4' fill='%23fbf6ec' opacity='0.26'/%3E%3Ccircle cx='204.0' cy='140.0' r='5.0' fill='none' stroke='%23fdf9ef' stroke-opacity='0.19' stroke-width='0.80'/%3E%3Ccircle cx='176.0' cy='190.0' r='4.0' fill='%2337332a' opacity='0.33'/%3E%3Cellipse cx='175.1' cy='188.7' rx='2.9' ry='2.6' fill='%23191712' opacity='0.41'/%3E%3Cellipse cx='173.6' cy='186.8' rx='1.8' ry='1.3' fill='%23fbf6ec' opacity='0.25'/%3E%3Ccircle cx='176.0' cy='190.0' r='4.6' fill='none' stroke='%23fdf9ef' stroke-opacity='0.18' stroke-width='0.74'/%3E%3Ccircle cx='200.0' cy='116.0' r='3.4' fill='%2337332a' opacity='0.30'/%3E%3Cellipse cx='199.2' cy='114.9' rx='2.5' ry='2.2' fill='%23191712' opacity='0.38'/%3E%3Cellipse cx='197.9' cy='113.2' rx='1.6' ry='1.1' fill='%23fbf6ec' opacity='0.22'/%3E%3Ccircle cx='200.0' cy='116.0' r='4.0' fill='none' stroke='%23fdf9ef' stroke-opacity='0.17' stroke-width='0.64'/%3E%3Ccircle cx='72.0' cy='180.0' r='2.4' fill='%233d382e' opacity='0.14'/%3E%3Ccircle cx='72.0' cy='180.0' r='2.6' fill='none' stroke='%23f2ede2' stroke-opacity='0.12' stroke-width='0.78'/%3E%3Ccircle cx='132.0' cy='178.0' r='2.2' fill='%233d382e' opacity='0.14'/%3E%3Ccircle cx='132.0' cy='178.0' r='2.4' fill='none' stroke='%23f2ede2' stroke-opacity='0.12' stroke-width='0.73'/%3E%3Ccircle cx='168.0' cy='150.0' r='2.2' fill='%233d382e' opacity='0.14'/%3E%3Ccircle cx='168.0' cy='150.0' r='2.3' fill='none' stroke='%23f2ede2' stroke-opacity='0.12' stroke-width='0.70'/%3E%3Ccircle cx='46.0' cy='128.0' r='2.1' fill='%233d382e' opacity='0.14'/%3E%3Ccircle cx='46.0' cy='128.0' r='2.2' fill='none' stroke='%23f2ede2' stroke-opacity='0.12' stroke-width='0.68'/%3E%3Ccircle cx='90.0' cy='126.0' r='1.9' fill='%233d382e' opacity='0.14'/%3E%3Ccircle cx='90.0' cy='126.0' r='2.1' fill='none' stroke='%23f2ede2' stroke-opacity='0.12' stroke-width='0.62'/%3E%3Ccircle cx='118.0' cy='124.0' r='1.8' fill='%233d382e' opacity='0.14'/%3E%3Ccircle cx='118.0' cy='124.0' r='2.0' fill='none' stroke='%23f2ede2' stroke-opacity='0.12' stroke-width='0.60'/%3E%3Ccircle cx='152.0' cy='116.0' r='1.8' fill='%233d382e' opacity='0.14'/%3E%3Ccircle cx='152.0' cy='116.0' r='2.0' fill='none' stroke='%23f2ede2' stroke-opacity='0.12' stroke-width='0.60'/%3E%3Ccircle cx='100.0' cy='148.0' r='1.9' fill='%233d382e' opacity='0.14'/%3E%3Ccircle cx='100.0' cy='148.0' r='2.1' fill='none' stroke='%23f2ede2' stroke-opacity='0.12' stroke-width='0.62'/%3E%3Ccircle cx='66.0' cy='110.0' r='1.8' fill='%233d382e' opacity='0.14'/%3E%3Ccircle cx='66.0' cy='110.0' r='1.9' fill='none' stroke='%23f2ede2' stroke-opacity='0.12' stroke-width='0.57'/%3E%3Ccircle cx='138.0' cy='206.0' r='1.8' fill='%233d382e' opacity='0.14'/%3E%3Ccircle cx='138.0' cy='206.0' r='2.0' fill='none' stroke='%23f2ede2' stroke-opacity='0.12' stroke-width='0.60'/%3E%3Ccircle cx='80.0' cy='206.0' r='1.8' fill='%233d382e' opacity='0.14'/%3E%3Ccircle cx='80.0' cy='206.0' r='1.9' fill='none' stroke='%23f2ede2' stroke-opacity='0.12' stroke-width='0.57'/%3E%3Ccircle cx='54.0' cy='176.0' r='1.7' fill='%233d382e' opacity='0.14'/%3E%3Ccircle cx='54.0' cy='176.0' r='1.8' fill='none' stroke='%23f2ede2' stroke-opacity='0.12' stroke-width='0.55'/%3E%3Ccircle cx='126.0' cy='152.0' r='1.6' fill='%233d382e' opacity='0.14'/%3E%3Ccircle cx='126.0' cy='152.0' r='1.7' fill='none' stroke='%23f2ede2' stroke-opacity='0.12' stroke-width='0.52'/%3E%3Ccircle cx='104.0' cy='118.0' r='1.6' fill='%233d382e' opacity='0.14'/%3E%3Ccircle cx='104.0' cy='118.0' r='1.7' fill='none' stroke='%23f2ede2' stroke-opacity='0.12' stroke-width='0.52'/%3E%3Ccircle cx='160.0' cy='176.0' r='1.8' fill='%233d382e' opacity='0.14'/%3E%3Ccircle cx='160.0' cy='176.0' r='1.9' fill='none' stroke='%23f2ede2' stroke-opacity='0.12' stroke-width='0.57'/%3E%3C/g%3E%3Cg fill='%2334312b' opacity='0.16'%3E%3Ccircle cx='104' cy='176' r='0.6'/%3E%3Ccircle cx='150' cy='168' r='0.8'/%3E%3Ccircle cx='186' cy='150' r='0.9'/%3E%3Ccircle cx='70' cy='140' r='0.9'/%3E%3Ccircle cx='128' cy='190' r='1.0'/%3E%3Ccircle cx='60' cy='168' r='0.9'/%3E%3Ccircle cx='196' cy='128' r='0.6'/%3E%3Ccircle cx='92' cy='150' r='0.7'/%3E%3Ccircle cx='160' cy='140' r='0.8'/%3E%3Ccircle cx='112' cy='178' r='0.8'/%3E%3Ccircle cx='80' cy='120' r='0.8'/%3E%3Ccircle cx='178' cy='168' r='1.0'/%3E%3Ccircle cx='136' cy='160' r='1.1'/%3E%3Ccircle cx='206' cy='158' r='0.8'/%3E%3Ccircle cx='118' cy='196' r='0.8'/%3E%3C/g%3E%3Ccircle cx='122' cy='206' r='24' fill='url(%23tycho)'/%3E%3Cg stroke='%23f5f0e6' fill='none' stroke-linecap='round' opacity='0.5'%3E%3Cpath d='M131.6 194.5 L235.8 70.4' stroke-width='0.8' stroke-opacity='0.07'/%3E%3Cpath d='M136.8 203.4 L314.0 172.1' stroke-width='0.8' stroke-opacity='0.07'/%3E%3Cpath d='M133.5 215.6 L257.6 319.8' stroke-width='0.7' stroke-opacity='0.07'/%3E%3Cpath d='M122.0 221.0 L122.0 365.0' stroke-width='0.7' stroke-opacity='0.07'/%3E%3Cpath d='M109.0 213.5 L-0.1 276.5' stroke-width='0.6' stroke-opacity='0.07'/%3E%3Cpath d='M109.0 198.5 L-15.7 126.5' stroke-width='0.6' stroke-opacity='0.07'/%3E%3Cpath d='M116.9 191.9 L73.8 73.5' stroke-width='0.6' stroke-opacity='0.07'/%3E%3C/g%3E%3Ccircle cx='122.0' cy='206.0' r='4.1' fill='%23413c31' opacity='0.34'/%3E%3Ccircle cx='122.0' cy='206.0' r='4.3' fill='none' stroke='%23f6f1e6' stroke-opacity='0.36' stroke-width='1.70'/%3E%3Ccircle cx='122.0' cy='206.0' r='5.1' fill='none' stroke='%23262219' stroke-opacity='0.17' stroke-width='0.70'/%3E%3Ccircle cx='96' cy='150' r='16' fill='url(%23tycho)' opacity='0.7'/%3E%3Ccircle cx='96.0' cy='150.0' r='3.7' fill='%23413c31' opacity='0.32'/%3E%3Ccircle cx='96.0' cy='150.0' r='3.9' fill='none' stroke='%23f6f1e6' stroke-opacity='0.34' stroke-width='1.53'/%3E%3Ccircle cx='96.0' cy='150.0' r='4.6' fill='none' stroke='%23262219' stroke-opacity='0.16' stroke-width='0.63'/%3E%3Cellipse cx='94.4' cy='148.2' rx='1.5' ry='1.1' fill='%23fffdf6' opacity='0.9' transform='rotate(-32 94.4 148.2)'/%3E%3C/g%3E%3Ccircle cx='120' cy='120' r='119.5' fill='url(%23term)'/%3E%3Ccircle cx='120' cy='120' r='119.5' fill='url(%23earth)'/%3E%3Ccircle cx='120' cy='120' r='119.5' fill='url(%23limbwarm)'/%3E%3Cpath d='M14 96 A119.5 119.5 0 0 1 96 14' fill='none' stroke='%23fffdf6' stroke-opacity='0.16' stroke-width='2'/%3E%3Cpath d='M226 150 A119.5 119.5 0 0 1 150 226' fill='none' stroke='%239db2d6' stroke-opacity='0.13' stroke-width='2'/%3E%3C/svg%3E") center / contain no-repeat;
  /* atmospheric bloom: a warm-neutral inner corona bleeding into the
     cool sky-scatter outer halo (moonlight is warm at the disc, the
     air scatters it cool) — three nested breaths */
  box-shadow:
    0 0 30px 6px rgba(246, 240, 228, 0.16),
    0 0 70px 20px rgba(214, 222, 236, 0.13),
    0 0 150px 60px rgba(159, 182, 217, 0.1),
    0 0 260px 120px rgba(120, 150, 200, 0.06);
}

/* ═══ void-element prop layers: the two <meta> tags opt in as empty
   render boxes (they draw nothing themselves) so their pseudos can
   carry the shore props. ═══ */
head meta:first-of-type,
head meta:last-of-type { display: var(--luna-scenery, block); }

/* ═══ PINE HEADLAND (meta#1::before, z-1): a dark shore climbs out of
   the bottom-right corner — far ridge of small blue-navy pines behind,
   a near-black crest in front, a dense stand of foreground pines whose
   three tallest catch moonlight on their left (moon-side) edges via an
   offset light underlay peeking past the dark silhouette. Foreground =
   darkest. STATIC, promoted, corner-only (L6: never reaches the
   center lane). ═══ */
head meta:first-of-type::before {
  content: "";
  display: var(--luna-scenery, block);
  position: fixed;
  right: 0;
  bottom: 0;
  width: 31vw;
  height: 34vh;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 480 300' preserveAspectRatio='none'%3E%3Cdefs%3E%3ClinearGradient id='hill' x1='0' y1='0' x2='0.4' y2='1'%3E%3Cstop offset='0' stop-color='%23050810'/%3E%3Cstop offset='1' stop-color='%23020409'/%3E%3C/linearGradient%3E%3ClinearGradient id='mtn' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%231a2740' stop-opacity='0.55'/%3E%3Cstop offset='1' stop-color='%230e1830' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3ClinearGradient id='mtn2' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23141f36' stop-opacity='0.7'/%3E%3Cstop offset='1' stop-color='%230a1428' stop-opacity='0.65'/%3E%3C/linearGradient%3E%3ClinearGradient id='hfade' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23fff' stop-opacity='0'/%3E%3Cstop offset='0.42' stop-color='%23fff' stop-opacity='1'/%3E%3Cstop offset='1' stop-color='%23fff' stop-opacity='1'/%3E%3C/linearGradient%3E%3Cmask id='mfade'%3E%3Crect x='0' y='0' width='480' height='300' fill='url(%23hfade)'/%3E%3C/mask%3E%3C/defs%3E%3Cg mask='url(%23mfade)'%3E%3Cpath d='M-20 150 Q120 96 200 120 Q260 138 320 108 Q380 84 480 116 L480 300 L-20 300 Z' fill='url(%23mtn)'/%3E%3Cpath d='M20 143 Q120 96 200 120 Q260 138 320 108 Q380 84 480 116' fill='none' stroke='%237e93b8' stroke-opacity='0.14' stroke-width='2'/%3E%3Cpath d='M-20 186 Q200 150 270 166 Q330 178 400 150 Q440 136 480 150 L480 300 L-20 300 Z' fill='url(%23mtn2)'/%3E%3Cpath d='M60 180 Q200 150 270 166 Q330 178 400 150 Q440 136 480 150' fill='none' stroke='%238ea3c6' stroke-opacity='0.12' stroke-width='1.4'/%3E%3C/g%3E%3Cg fill='%230f1a30' fill-opacity='0.85'%3E%3Cpath d='M300.0 152.0 L302.7 159.0 L301.8 160.6 L304.5 165.5 L303.0 167.1 L306.2 172.0 L304.1 173.6 L308.0 178.5 L305.3 180.1 L301.1 178.0 L298.9 178.0 L294.7 180.1 L292.0 178.5 L295.9 173.6 L293.8 172.0 L297.0 167.1 L295.5 165.5 L298.2 160.6 L297.3 159.0 Z'/%3E%3Cpath d='M330.0 136.0 L333.1 144.1 L332.0 145.9 L335.0 151.6 L333.3 153.4 L337.0 159.1 L334.6 160.9 L339.0 166.6 L335.9 168.4 L331.3 166.0 L328.7 166.0 L324.1 168.4 L321.0 166.6 L325.4 160.9 L323.0 159.1 L326.7 153.4 L325.0 151.6 L328.0 145.9 L326.9 144.1 Z'/%3E%3Cpath d='M366.0 148.0 L368.6 154.5 L367.7 155.9 L370.2 160.5 L368.8 161.9 L371.9 166.5 L369.9 167.9 L373.5 172.5 L370.9 173.9 L367.1 172.0 L364.9 172.0 L361.1 173.9 L358.5 172.5 L362.1 167.9 L360.1 166.5 L363.2 161.9 L361.8 160.5 L364.3 155.9 L363.4 154.5 Z'/%3E%3Cpath d='M404.0 118.0 L407.4 126.6 L406.2 128.6 L409.6 134.6 L407.7 136.6 L411.8 142.6 L409.1 144.6 L414.0 150.6 L410.6 152.6 L405.4 150.0 L402.6 150.0 L397.4 152.6 L394.0 150.6 L398.9 144.6 L396.2 142.6 L400.3 136.6 L398.4 134.6 L401.8 128.6 L400.6 126.6 Z'/%3E%3Cpath d='M440.0 130.0 L442.7 137.0 L441.8 138.6 L444.5 143.5 L443.0 145.1 L446.2 150.0 L444.1 151.6 L448.0 156.5 L445.3 158.1 L441.1 156.0 L438.9 156.0 L434.7 158.1 L432.0 156.5 L435.9 151.6 L433.8 150.0 L437.0 145.1 L435.5 143.5 L438.2 138.6 L437.3 137.0 Z'/%3E%3Cpath d='M462.0 122.0 L464.9 129.6 L463.9 131.2 L466.8 136.6 L465.1 138.2 L468.6 143.6 L466.4 145.2 L470.5 150.6 L467.6 152.2 L463.2 150.0 L460.8 150.0 L456.4 152.2 L453.5 150.6 L457.6 145.2 L455.4 143.6 L458.9 138.2 L457.2 136.6 L460.1 131.2 L459.1 129.6 Z'/%3E%3C/g%3E%3Cg fill='none' stroke='%239fb6d9' stroke-opacity='0.16' stroke-width='0.8' stroke-linecap='round'%3E%3Cpath d='M300.0 152.0 L297.3 159.0 L298.2 160.6 L295.5 165.5 L297.0 167.1 L293.8 172.0 L295.9 173.6 L292.0 178.5 L294.7 180.1'/%3E%3Cpath d='M330.0 136.0 L326.9 144.1 L328.0 145.9 L325.0 151.6 L326.7 153.4 L323.0 159.1 L325.4 160.9 L321.0 166.6 L324.1 168.4'/%3E%3Cpath d='M404.0 118.0 L400.6 126.6 L401.8 128.6 L398.4 134.6 L400.3 136.6 L396.2 142.6 L398.9 144.6 L394.0 150.6 L397.4 152.6'/%3E%3C/g%3E%3Cpath d='M480 300 L480 176 Q444 168 408 174 Q352 170 310 186 Q264 196 228 218 Q188 242 158 268 Q132 290 112 300 Z' fill='url(%23hill)'/%3E%3Cpath d='M480 176 Q444 168 408 174 Q352 170 310 186 Q264 196 228 218 Q188 242 158 268' fill='none' stroke='%239fb6d9' stroke-opacity='0.18' stroke-width='1.3'/%3E%3Cg stroke='%239fb6d9' stroke-opacity='0.12' stroke-width='0.8' stroke-linecap='round'%3E%3Cpath d='M300 188 l-3 -5'/%3E%3Cpath d='M276 196 l-3 -5'/%3E%3Cpath d='M252 206 l-3 -5'/%3E%3Cpath d='M336 180 l-3 -5'/%3E%3Cpath d='M360 178 l-3 -5'/%3E%3C/g%3E%3Cg fill='%23030509'%3E%3Cpath d='M300.0 142.0 L306.8 159.3 L304.5 163.1 L311.2 175.3 L307.4 179.1 L315.6 191.3 L310.3 195.1 L320.0 207.3 L313.2 211.1 L302.8 206.0 L297.2 206.0 L286.8 211.1 L280.0 207.3 L289.7 195.1 L284.4 191.3 L292.6 179.1 L288.8 175.3 L295.5 163.1 L293.2 159.3 Z'/%3E%3Cpath d='M340.0 106.0 L348.8 128.7 L345.8 133.7 L354.6 149.7 L349.6 154.7 L360.3 170.7 L353.4 175.7 L366.0 191.7 L357.2 196.7 L343.6 190.0 L336.4 190.0 L322.8 196.7 L314.0 191.7 L326.6 175.7 L319.7 170.7 L330.4 154.7 L325.4 149.7 L334.2 133.7 L331.2 128.7 Z'/%3E%3Cpath d='M392.0 74.0 L402.5 102.1 L399.0 108.3 L409.4 128.1 L403.5 134.3 L416.2 154.1 L408.0 160.3 L423.0 180.1 L412.5 186.3 L396.3 178.0 L387.7 178.0 L371.5 186.3 L361.0 180.1 L376.0 160.3 L367.8 154.1 L380.5 134.3 L374.6 128.1 L385.0 108.3 L381.5 102.1 Z'/%3E%3Cpath d='M446.0 116.0 L454.5 137.6 L451.6 142.4 L460.0 157.6 L455.2 162.4 L465.5 177.6 L458.9 182.4 L471.0 197.6 L462.5 202.4 L449.5 196.0 L442.5 196.0 L429.5 202.4 L421.0 197.6 L433.1 182.4 L426.5 177.6 L436.8 162.4 L432.0 157.6 L440.4 142.4 L437.5 137.6 Z'/%3E%3Cpath d='M232.0 184.0 L237.1 197.0 L235.4 199.8 L240.4 209.0 L237.5 211.8 L243.7 221.0 L239.7 223.8 L247.0 233.0 L241.9 235.8 L234.1 232.0 L229.9 232.0 L222.1 235.8 L217.0 233.0 L224.3 223.8 L220.3 221.0 L226.5 211.8 L223.6 209.0 L228.6 199.8 L226.9 197.0 Z'/%3E%3Cpath d='M188.0 220.0 L192.1 230.3 L190.7 232.5 L194.7 239.8 L192.4 242.0 L197.4 249.3 L194.2 251.5 L200.0 258.8 L195.9 261.0 L189.7 258.0 L186.3 258.0 L180.1 261.0 L176.0 258.8 L181.8 251.5 L178.6 249.3 L183.6 242.0 L181.3 239.8 L185.3 232.5 L183.9 230.3 Z'/%3E%3C/g%3E%3Cg fill='none' stroke='%23cdd9ee' stroke-opacity='0.5' stroke-width='1.1' stroke-linecap='round'%3E%3Cpath d='M300.0 142.0 L293.2 159.3 L295.5 163.1 L288.8 175.3 L292.6 179.1 L284.4 191.3 L289.7 195.1 L280.0 207.3 L286.8 211.1'/%3E%3Cpath d='M340.0 106.0 L331.2 128.7 L334.2 133.7 L325.4 149.7 L330.4 154.7 L319.7 170.7 L326.6 175.7 L314.0 191.7 L322.8 196.7'/%3E%3Cpath d='M392.0 74.0 L381.5 102.1 L385.0 108.3 L374.6 128.1 L380.5 134.3 L367.8 154.1 L376.0 160.3 L361.0 180.1 L371.5 186.3'/%3E%3Cpath d='M446.0 116.0 L437.5 137.6 L440.4 142.4 L432.0 157.6 L436.8 162.4 L426.5 177.6 L433.1 182.4 L421.0 197.6 L429.5 202.4'/%3E%3Cpath d='M232.0 184.0 L226.9 197.0 L228.6 199.8 L223.6 209.0 L226.5 211.8 L220.3 221.0 L224.3 223.8 L217.0 233.0 L222.1 235.8'/%3E%3Cpath d='M188.0 220.0 L183.9 230.3 L185.3 232.5 L181.3 239.8 L183.6 242.0 L178.6 249.3 L181.8 251.5 L176.0 258.8 L180.1 261.0'/%3E%3C/g%3E%3Cg fill='none' stroke='%239fb6d9' stroke-opacity='0.16' stroke-width='2.4' stroke-linecap='round'%3E%3Cpath d='M300.0 142.0 L293.2 159.3 L295.5 163.1 L288.8 175.3 L292.6 179.1 L284.4 191.3 L289.7 195.1 L280.0 207.3 L286.8 211.1'/%3E%3Cpath d='M340.0 106.0 L331.2 128.7 L334.2 133.7 L325.4 149.7 L330.4 154.7 L319.7 170.7 L326.6 175.7 L314.0 191.7 L322.8 196.7'/%3E%3Cpath d='M392.0 74.0 L381.5 102.1 L385.0 108.3 L374.6 128.1 L380.5 134.3 L367.8 154.1 L376.0 160.3 L361.0 180.1 L371.5 186.3'/%3E%3Cpath d='M446.0 116.0 L437.5 137.6 L440.4 142.4 L432.0 157.6 L436.8 162.4 L426.5 177.6 L433.1 182.4 L421.0 197.6 L429.5 202.4'/%3E%3C/g%3E%3C/svg%3E") right bottom / 100% 100% no-repeat;
}

/* ═══ THE ROWBOAT (meta#1::after, z-1): a tiny still silhouette
   adrift on the moonglade — moonlit gunwale, shipped oar, broken
   dark reflection in the bright water. STATIC, promoted. ═══ */
head meta:first-of-type::after {
  content: "";
  display: var(--luna-scenery, block);
  position: fixed;
  left: 25vw;
  top: 82.3vh;
  width: 104px;
  height: 49px;
  margin-left: -52px;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 56'%3E%3Cpath d='M6 16 Q10 20 18 22 L100 22 Q110 20 114 15 Q112 26 100 31 Q80 36 56 36 Q30 36 16 29 Q8 24 6 16 Z' fill='%23070c16'/%3E%3Cpath d='M46 20.5 L72 17.5' stroke='%23070c16' stroke-width='1.6' stroke-linecap='round'/%3E%3Cpath d='M6 16 Q10 20 18 22 L100 22 Q110 20 114 15' fill='none' stroke='%23e6edf7' stroke-opacity='0.75' stroke-width='1.4' stroke-linecap='round'/%3E%3Crect x='20' y='37.5' width='78' height='1.2' fill='%23dfe6f0' opacity='0.3' rx='0.6'/%3E%3Cg fill='%23081020' opacity='0.45'%3E%3Cpath d='M16 40 Q40 46 60 46 Q84 46 104 40 Q84 44 60 44 Q36 44 16 40 Z'/%3E%3Crect x='30' y='49' width='58' height='2.6' rx='1.3'/%3E%3Crect x='42' y='53' width='34' height='2' rx='1'/%3E%3C/g%3E%3Cdefs%3E%3ClinearGradient id='bg1' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23fff' stop-opacity='0'/%3E%3Cstop offset='0.5' stop-color='%23fbfdff' stop-opacity='1'/%3E%3Cstop offset='1' stop-color='%23fff' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='bg2' x1='0.5' y1='0' x2='0.5' y2='1'%3E%3Cstop offset='0' stop-color='%23fff' stop-opacity='0'/%3E%3Cstop offset='0.5' stop-color='%23fbfdff' stop-opacity='1'/%3E%3Cstop offset='1' stop-color='%23fff' stop-opacity='0'/%3E%3C/linearGradient%3E%3CradialGradient id='bgc' cx='0.5' cy='0.5' r='0.5'%3E%3Cstop offset='0' stop-color='%23fff' stop-opacity='0.9'/%3E%3Cstop offset='1' stop-color='%23cfe0f6' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3C!-- specular wet-gunwale glint: a crisp star-catch where moonlight hits the rail --%3E%3Cg transform='translate(30 20.5)'%3E%3Ccircle r='4' fill='url(%23bgc)'/%3E%3Crect x='-6' y='-0.55' width='12' height='1.1' fill='url(%23bg1)'/%3E%3Crect x='-0.55' y='-4' width='1.1' height='8' fill='url(%23bg2)'/%3E%3Ccircle r='0.9' fill='%23ffffff'/%3E%3C/g%3E%3C!-- brighter bow specular point --%3E%3Cg transform='translate(6.5 16)'%3E%3Ccircle r='3' fill='url(%23bgc)'/%3E%3Crect x='-4.5' y='-0.45' width='9' height='0.9' fill='url(%23bg1)'/%3E%3Ccircle r='0.8' fill='%23ffffff'/%3E%3C/g%3E%3C/svg%3E") center / contain no-repeat;
}

/* ═══ ONE shooting star (meta#2::before, z-1): a rare event, not a
   mover — three discrete steps() states once per 31s cycle (~1s
   visible), upper-right sky, off the text lane. Transform hops total
   58px. ═══ */
head meta:last-of-type::before {
  content: "";
  display: var(--luna-scenery, block);
  position: fixed;
  left: 66vw;
  top: 7vh;
  width: 250px;
  height: 96px;
  z-index: -1;
  pointer-events: none;
  opacity: 0;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 260 100'%3E%3Cdefs%3E%3ClinearGradient id='tg' gradientUnits='userSpaceOnUse' x1='10' y1='16' x2='222' y2='78'%3E%3Cstop offset='0' stop-color='%23dfe6f0' stop-opacity='0'/%3E%3Cstop offset='0.6' stop-color='%23dfe6f0' stop-opacity='0.2'/%3E%3Cstop offset='0.85' stop-color='%23f2f7ff' stop-opacity='0.7'/%3E%3Cstop offset='1' stop-color='%23ffffff' stop-opacity='0.95'/%3E%3C/linearGradient%3E%3CradialGradient id='hb' cx='0.5' cy='0.5' r='0.5'%3E%3Cstop offset='0' stop-color='%23f8fbff' stop-opacity='0.45'/%3E%3Cstop offset='1' stop-color='%23f8fbff' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cpath d='M10 16 L222 78' stroke='url(%23tg)' stroke-width='2' stroke-linecap='round'/%3E%3Ccircle cx='224' cy='78.6' r='10' fill='url(%23hb)'/%3E%3Ccircle cx='224' cy='78.6' r='2.2' fill='%23f8fbff'/%3E%3C/svg%3E") center / contain no-repeat;
  animation: luna-meteor 31s steps(1, end) infinite;
}

/* ═══ far cloud sheet (head::after, z-1): big soft blobs, so motion
   is discrete — steps() per segment, one hop every ~3s (L2). It
   fades in/out (also in hops) so the loop wrap never shows. ═══ */
head::after {
  content: "";
  display: var(--luna-scenery, block);
  position: fixed;
  top: 3vh;
  left: -30vw;
  width: 80vw;
  height: 22vh;
  z-index: -1;
  pointer-events: none;
  opacity: 0;
  background:
    radial-gradient(ellipse 38% 30% at 30% 52%, rgba(186, 200, 222, 0.09) 0 45%, rgba(186, 200, 222, 0) 100%),
    radial-gradient(ellipse 30% 24% at 52% 40%, rgba(196, 209, 228, 0.08) 0 45%, rgba(196, 209, 228, 0) 100%),
    radial-gradient(ellipse 26% 22% at 68% 58%, rgba(176, 192, 216, 0.07) 0 45%, rgba(176, 192, 216, 0) 100%),
    radial-gradient(ellipse 44% 18% at 48% 66%, rgba(10, 15, 30, 0.16) 0 50%, rgba(10, 15, 30, 0) 100%);
  animation: luna-cloud-far 168s linear infinite;
}

/* ═══ near cloud sheet (body::before, z-1): lower, larger, a touch
   brighter (closer to the moonlight), slightly faster hops. ═══ */
body::before {
  content: "";
  display: var(--luna-scenery, block);
  position: fixed;
  top: 16vh;
  left: -40vw;
  width: 95vw;
  height: 26vh;
  z-index: -1;
  pointer-events: none;
  opacity: 0;
  background:
    radial-gradient(ellipse 40% 26% at 34% 44%, rgba(207, 219, 236, 0.12) 0 42%, rgba(207, 219, 236, 0) 100%),
    radial-gradient(ellipse 32% 30% at 56% 56%, rgba(178, 194, 218, 0.1) 0 45%, rgba(178, 194, 218, 0) 100%),
    radial-gradient(ellipse 24% 22% at 74% 42%, rgba(196, 209, 228, 0.09) 0 45%, rgba(196, 209, 228, 0) 100%),
    radial-gradient(ellipse 50% 20% at 50% 70%, rgba(8, 12, 24, 0.2) 0 50%, rgba(8, 12, 24, 0) 100%);
  animation: luna-cloud-near 126s linear infinite;
}

/* ═══ three twinkle stars (body::after, z-1): ONE shared layer, ONE
   steps() opacity loop (~0.4 hops/s). No continuous motion. ═══ */
body::after {
  content: "";
  display: var(--luna-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.9;
  background:
    radial-gradient(circle at 13vw 20vh, rgba(240, 245, 252, 0.85) 0 1.4px, rgba(159, 182, 217, 0.3) 2.6px, rgba(159, 182, 217, 0) 4.2px),
    radial-gradient(circle at 88vw 35vh, rgba(240, 245, 252, 0.75) 0 1.2px, rgba(159, 182, 217, 0.26) 2.4px, rgba(159, 182, 217, 0) 3.8px),
    radial-gradient(circle at 72vw 12vh, rgba(240, 245, 252, 0.8) 0 1.3px, rgba(159, 182, 217, 0.28) 2.5px, rgba(159, 182, 217, 0) 4px);
  animation: luna-twinkle 11s steps(1, end) infinite;
}

/* ═══ lane scrim (html::after, z-1, last in tree order = topmost
   scenery): a quiet ink column behind the names; the mask releases
   it over the horizon band so the moonglade keeps its shine where
   the names have already edge-faded. STATIC, promoted. ═══ */
html::after {
  content: "";
  display: var(--luna-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background: linear-gradient(90deg,
    rgba(4, 7, 14, 0) 10%, rgba(4, 7, 14, 0.28) 32%, rgba(4, 7, 14, 0.4) 50%,
    rgba(4, 7, 14, 0.28) 68%, rgba(4, 7, 14, 0) 90%);
  -webkit-mask-image: linear-gradient(180deg, #fff 0 76%, rgba(255, 255, 255, 0.35) 88%, rgba(255, 255, 255, 0) 100%);
  mask-image: linear-gradient(180deg, #fff 0 76%, rgba(255, 255, 255, 0.35) 88%, rgba(255, 255, 255, 0) 100%);
}

/* ═══ movement titles: thin lowercase serif, wide tracked, under a
   thin crescent arc (a ring segment dipping into the rule box) with
   a small moonstone at its lowest point. ═══ */
.credits-block__title {
  font-weight: 400;
  text-transform: lowercase;
  letter-spacing: 0.3em;
  padding-left: 0.3em; /* re-center the trailing tracking space */
  color: var(--luna-silver);
  margin: 0 0 1.5rem;
}
.credits-block__title::after {
  width: min(200px, 50vw);
  height: 14px;
  margin: 0.7rem auto 0;
  opacity: 1;
  background:
    radial-gradient(circle 5px at 50% 9.5px, rgba(248, 251, 255, 0.95) 0 1.8px, rgba(159, 182, 217, 0.4) 3px, rgba(159, 182, 217, 0) 5px),
    radial-gradient(ellipse 110px 56px at 50% -46px, rgba(159, 182, 217, 0) 102px, rgba(159, 182, 217, 0.65) 103.4px 104.6px, rgba(159, 182, 217, 0) 106px);
}

/* ═══ rows: roomy, serifed, sacred names — wrap, never clip ═══ */
.credit {
  max-width: min(42rem, 88vw);
  margin-inline: auto;
  min-width: 0;
  overflow-wrap: anywhere;
  font-weight: 500;
  letter-spacing: 0.04em;
  line-height: 1.5;
}
.credit__name { color: #edf2f9; }
.credit__amount {
  font-style: italic;
  font-size: 0.8em;
  letter-spacing: 0.07em;
  opacity: 1;
  color: var(--luna-steel);
}
.credit__amount::before { content: " · "; font-style: normal; opacity: 0.6; }

/* ═══ flourish cards ═══ */
/* intro sits below the moon's altitude so the title never fights the disc */
.flourish--intro { padding-top: 13vh; gap: 1.3rem; }
.flourish__title {
  font-weight: 300;
  text-transform: lowercase;
  letter-spacing: 0.1em;
  line-height: 1.06;
  color: #eef3fb;
  text-shadow: 0 0 34px rgba(159, 182, 217, 0.4), var(--credits-shadow);
}
/* streamer tagline: restyle ONLY — italic silver whisper */
.flourish__tagline {
  font-style: italic;
  font-weight: 400;
  letter-spacing: 0.24em;
  padding-left: 0.24em;
  font-size: 1rem;
  color: var(--luna-steel);
  opacity: 0.95;
}

/* a thin waxing crescent above the badge (inset-shadow crescent) */
.flourish--intro::before {
  content: "";
  display: var(--luna-scenery, block);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: transparent;
  box-shadow: inset 11px -8px 0 1px var(--luna-silver); /* glow would halo the whole
    disc and reveal the dark ball — the crescent carries its own light */
  transform: rotate(-12deg);
}
/* hairline horizon under the card */
.flourish--intro::after {
  content: "";
  display: var(--luna-scenery, block);
  width: min(320px, 68vw);
  height: 1px;
  background: linear-gradient(90deg, rgba(159, 182, 217, 0) 0%, rgba(159, 182, 217, 0.55) 25% 75%, rgba(159, 182, 217, 0) 100%);
}

/* badge -> concert-bill line (copy swap via font-size:0 + ::after) */
.flourish__badge {
  font-size: 0;
  border: 1px solid rgba(159, 182, 217, 0.45);
  border-radius: 999px;
  padding: 0.55rem 1.5rem;
  box-shadow: 0 0 18px rgba(159, 182, 217, 0.18);
  color: var(--luna-silver);
}
.flourish__badge::after {
  content: "nocturne in silver · op. 22";
  font-family: var(--credits-font);
  font-style: italic;
  font-weight: 400;
  font-size: 0.85rem;
  letter-spacing: 0.26em;
  padding-left: 0.26em; /* optical centering of the tracked line */
  text-transform: lowercase;
}

/* rating -> the fine print (copy swap) */
.flourish__rating {
  font-size: 0;
  border-color: rgba(159, 182, 217, 0.35);
  border-radius: 999px;
  opacity: 0.9;
}
.flourish__rating::after {
  content: "for night owls · quiet hours";
  font-family: var(--credits-font);
  font-size: 0.78rem;
  letter-spacing: 0.28em;
  padding-left: 0.28em;
  text-transform: lowercase;
  color: var(--luna-steel);
}

/* outro: the moon keeps watch — a small full moon above "goodnight" */
.flourish--outro::before {
  content: "";
  display: var(--luna-scenery, block);
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background:
    radial-gradient(circle at 62% 58%, rgba(120, 110, 92, 0.5) 0 3.6px, rgba(120, 110, 92, 0) 5.4px),
    radial-gradient(circle at 40% 68%, rgba(120, 110, 92, 0.4) 0 2.8px, rgba(120, 110, 92, 0) 4.4px),
    radial-gradient(circle at 55% 34%, rgba(120, 110, 92, 0.35) 0 2.2px, rgba(120, 110, 92, 0) 3.8px),
    radial-gradient(circle at 38% 34%, #fdfcf9 0%, #e7e2d9 45%, #b4ada3 80%, #8a8178 100%);
  box-shadow: 0 0 26px rgba(246, 240, 228, 0.42), 0 0 74px rgba(159, 182, 217, 0.24);
}
.flourish--outro .flourish__title { font-size: 0; }
.flourish--outro .flourish__title::after {
  content: "goodnight";
  font-family: var(--credits-title-font);
  font-weight: 300;
  font-size: var(--credits-flourish-title-size);
  letter-spacing: 0.14em; /* re-declared: em collapses at parent font-size:0 */
  padding-left: 0.14em;
  text-transform: lowercase;
  color: #eef3fb;
  text-shadow: 0 0 36px rgba(159, 182, 217, 0.45), var(--credits-shadow);
}
.flourish--outro .flourish__tagline { font-size: 0; }
.flourish--outro .flourish__tagline::after {
  content: "☾ the moon keeps watch";
  font-style: italic;
  font-size: 1rem;
  letter-spacing: 0.28em;
  padding-left: 0.28em;
  text-transform: lowercase;
  color: var(--luna-steel);
}

/* ═══ raid finale — FULL MOON: the single warm note of the night.
   Kicker + title + arc turn starlight-warm with the brightest glow;
   the kicker breathes in two discrete steps per 5s (~0.4 paints/s,
   the only animation inside the roll — L5). ═══ */
.credits-block:nth-last-of-type(2) .credits-block__title,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
  color: var(--luna-star);
  text-shadow: 0 0 18px rgba(255, 217, 160, 0.55), 0 0 46px rgba(255, 217, 160, 0.28), var(--credits-shadow);
}
.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  content: "full moon";
  display: block;
  font-family: var(--credits-font);
  font-style: italic;
  font-weight: 400;
  font-size: 0.85rem;
  letter-spacing: 0.5em;
  padding-left: 0.5em;
  text-transform: lowercase;
  margin-bottom: 0.8rem;
  color: rgba(255, 217, 160, 0.9);
  text-shadow: 0 0 14px rgba(255, 217, 160, 0.4);
  animation: luna-fullmoon 5s steps(1, end) infinite;
}
.credits-block:nth-last-of-type(2) .credits-block__title::after,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::after {
  background:
    radial-gradient(circle 5px at 50% 9.5px, rgba(255, 236, 204, 1) 0 2px, rgba(255, 217, 160, 0.45) 3.2px, rgba(255, 217, 160, 0) 5.2px),
    radial-gradient(ellipse 110px 56px at 50% -46px, rgba(255, 217, 160, 0) 102px, rgba(255, 217, 160, 0.7) 103.4px 104.6px, rgba(255, 217, 160, 0) 106px);
}
.credits-block:nth-last-of-type(2) .credit,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit {
  font-size: calc(var(--credits-name-size) * 1.08);
}
.credits-block:nth-last-of-type(2) .credit__name,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__name {
  text-shadow: 0 0 18px rgba(223, 230, 240, 0.4), var(--credits-shadow);
}

/* ═══ slideshow: slides surface like slow breath — one-shot
   opacity/transform transitions on top of the base fade ═══ */
.credits-slide {
  transform: translateY(12px);
  transition: opacity 1.2s ease, transform 1.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.credits-slide.is-active { transform: none; }

/* ═══ keyframes (all luna- prefixed; transform/opacity ONLY).
   Cloud segments each carry their own steps() so every hop stays at
   ~1 per 3s across fade-in, drift and fade-out. ═══ */
@keyframes luna-cloud-far {
  0%   { transform: translate3d(0, 0, 0); opacity: 0; animation-timing-function: steps(4, end); }
  8%   { transform: translate3d(2.7vw, 0, 0); opacity: 0.9; animation-timing-function: steps(47, end); }
  92%  { transform: translate3d(31.3vw, 0, 0); opacity: 0.9; animation-timing-function: steps(4, end); }
  100% { transform: translate3d(34vw, 0, 0); opacity: 0; }
}
@keyframes luna-cloud-near {
  0%   { transform: translate3d(0, 0, 0); opacity: 0; animation-timing-function: steps(4, end); }
  10%  { transform: translate3d(4.6vw, 0, 0); opacity: 0.95; animation-timing-function: steps(34, end); }
  90%  { transform: translate3d(41.4vw, 0, 0); opacity: 0.95; animation-timing-function: steps(4, end); }
  100% { transform: translate3d(46vw, 0, 0); opacity: 0; }
}
/* four discrete glints per 11s — a slow breath, not a blink */
@keyframes luna-twinkle {
  0%, 45%  { opacity: 0.9; }
  50%, 58% { opacity: 0.35; }
  63%, 80% { opacity: 0.8; }
  85%, 90% { opacity: 0.45; }
  95%, 100% { opacity: 0.9; }
}
/* the full-moon kicker breathes: two hops per cycle */
@keyframes luna-fullmoon {
  0%, 55%  { opacity: 1; }
  62%, 74% { opacity: 0.55; }
  80%, 100% { opacity: 1; }
}
/* the shooting star: dark for ~28s, then three held states (flash,
   fading hop, ember) — a time-lapse meteor in the cloud-hop language */
@keyframes luna-meteor {
  0%, 90.2% { opacity: 0; transform: translate3d(0, 0, 0); }
  90.5% { opacity: 0.95; transform: translate3d(0, 0, 0); }
  91.6% { opacity: 0.5; transform: translate3d(30px, 14px, 0); }
  92.7% { opacity: 0.22; transform: translate3d(58px, 27px, 0); }
  93.6%, 100% { opacity: 0; transform: translate3d(58px, 27px, 0); }
}

/* ═══ reduced motion: the night holds still — clouds park mid-sky
   beside the moon, the stars keep a steady shine, the kicker rests,
   slides fall back to the base fade ═══ */
@media (prefers-reduced-motion: reduce) {
  head::after {
    animation: none;
    opacity: 0.9;
    transform: translate3d(14vw, 0, 0);
  }
  body::before {
    animation: none;
    opacity: 0.95;
    transform: translate3d(22vw, 0, 0);
  }
  body::after { animation: none; opacity: 0.85; }
  /* the meteor parks visibly as the faintest high wisp — no event, no motion */
  head meta:last-of-type::before {
    animation: none;
    opacity: 0.22;
    transform: translate3d(30px, 14px, 0);
  }
  .credits-block:nth-last-of-type(2) .credits-block__title::before,
  .credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
    animation: none;
  }
  .credits-slide { transform: none; transition: opacity 0.8s ease; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--luna-scenery:none;}",
};
