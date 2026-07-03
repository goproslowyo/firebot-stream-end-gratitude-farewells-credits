import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. T-Minus: Apollo-era mission control — a Saturn-V climbs the left third past the glowing limb of the Earth while amber telemetry counts the names through each mission phase. */
export const VARIANT: ThemeVariant = {
  key: "rocket",
  name: "T-Minus",
  css: `
/* ================================================================
   T-MINUS — layered after the base theme.
   Fiction: 1969, a night ascent to orbit. The camera hangs downrange:
   the Earth's limb curves across the very bottom (amber terminator
   burning on the left, ice-blue airglow line along the arc), hard
   black space above. Every ~26s a Saturn-V climbs the left third on
   a slow gravity turn, F-1 plume flickering, and the names roll up
   the middle like a flight roster while mission control's amber
   telemetry frames the corners.
   Layer map (all scenery kill-switched via --rocket-scenery):
     html bg (--credits-bg)   deep space, 6-stop linear (cheap)
     html::before             EARTH LIMB arc + atmosphere line +
                              amber terminator + moon + edge stars,
                              STATIC, promoted
     html::after              telemetry cursor — tiny amber block,
                              steps() blink (~0.9 paints/s)
     body::before             lane scrim + telemetry panel + readout
                              text (top-left, below the mask fade),
                              STATIC, promoted
     body::after              "GO FOR LAUNCH" chip (top-right), STATIC
     head::before/::after     THE ROCKET, two flame poses = the whole
                              2-mover budget (120x310, will-change)
     meta#1::before           LAUNCH GANTRY — the umbilical tower the
                              Saturn-V lifts past, bottom-left. STATIC
     meta#1::after            MISSION PATCH roundel below the telemetry
                              panel. STATIC, promoted
     meta#2::before           CSM capsule coasting in high orbit. STATIC
     meta#2::after            the CSM window glint — steps() twinkle
     link::before             gantry beacon — slow steps() aviation blink
     .credits-roll::before    sparse starfield, RIDES THE ROLL
     .credits-slideshow::before  same starfield for slide mode
   ================================================================ */
@import url('https://fonts.googleapis.com/css2?family=Michroma&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');

:root {
  --rocket-scenery: block; /* set to none to strip every scenery layer */
  --rocket-space: #0b1026;
  --rocket-paper: #f4f4f2;
  --rocket-red: #fc3d21;
  --rocket-silver: #c7ccd6;
  --rocket-amber: #ffb000;

  /* deep space: near-black at the zenith warming to launch-night blue
     at the horizon (L3: root bg stays one simple linear gradient) */
  --credits-bg: linear-gradient(180deg, #04060d 0%, #05070f 18%, #070c1c 42%, #0b1026 66%, #0f1734 85%, #131c3f 100%);
  --credits-color: var(--rocket-paper);
  --credits-accent: var(--rocket-amber);
  --credits-font: "IBM Plex Mono", "SF Mono", "Menlo", "Consolas", monospace;
  --credits-title-font: "Michroma", "Eurostile", "Verdana", sans-serif;
  --credits-title-size: clamp(1.25rem, 3.1vw, 1.95rem);
  --credits-name-size: clamp(1rem, 2.5vw, 1.5rem);
  --credits-flourish-title-size: clamp(1.8rem, 5.6vw, 3.7rem);
  --credits-block-gap: 5rem;
  --credits-name-gap: 0.7rem;
  --credits-shadow: 0 2px 12px rgba(2, 4, 10, 0.85);
  /* glow no-op — NEVER "none" (a none in the base's composed
     text-shadow list would invalidate the whole declaration) */
  --credits-glow: 0 0 0 rgba(0, 0, 0, 0);
}

/* scenery is full-bleed on <html>; body keeps the base edge-fade so
   names still ease in over the limb and out into space */
html { -webkit-mask-image: none; mask-image: none; }
body { background: transparent; }

/* mission-phase counter: every credit block is a STAGE */
.credits-roll, .credits-slideshow { counter-reset: rocket-stage; }
.credits-block, .credits-slide:not(.flourish) { counter-increment: rocket-stage; }

/* ---- EARTH LIMB + sky: ONE static promoted layer. The limb is a huge
   circle (radius 150vw, center far below the viewport) so its top edge
   arcs gently across the bottom ~12vh; the atmosphere line is a 3px
   bright core with wide soft shoulders (coarse per the flicker law).
   The amber terminator glow burns on the left (the sun is about to
   rise behind the planet — it hands its warmth to the rocket plume);
   a waning moon and a few soft stars sit in the side thirds, never
   over the center lane. ---- */
html::before {
  content: "";
  display: var(--rocket-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* MOON HALO ONLY — the moon body itself is now a crisp SVG prop on
       head link::after (a proper lit sphere with real maria + terminator,
       replacing the old stacked-radial blob that read as a lumpy potato).
       Here we keep just the soft cool halo it sits in, so the disc has a
       breath of atmosphere-free scatter around it. Coarse, off-lane, L6-safe. */
    radial-gradient(circle 70px at 82.6vw 15.5vh, rgba(198, 216, 244, 0.13) 0%, rgba(198, 216, 244, 0.04) 54%, rgba(198, 216, 244, 0) 100%),
    /* ---- SHINE & SPARKLE (all coarse-soft >=40px + STATIC = flicker-law
       safe). (1) the SUN cresting the limb on the left: a hot coarse gleam
       where the terminator burns brightest, a specular kiss of dawn on the
       atmosphere. Off the vertical text lane (x=22vw), soft falloff. ---- */
    radial-gradient(circle 46px at 22vw 90.5vh, rgba(255, 244, 214, 0.5) 0%, rgba(255, 206, 130, 0.24) 42%, rgba(255, 176, 0, 0) 100%),
    radial-gradient(ellipse 240px 90px at 22vw 91vh, rgba(255, 214, 150, 0.16) 0%, rgba(255, 190, 110, 0) 72%),
    /* (2) a COARSE LENS-GLINT on the brightest right-side star (88vw 38vh) —
       a soft 44px bloom + a wide horizontal flare bar, both off-lane, static:
       reads as a bright near star catching the camera, never a fine twinkle. */
    radial-gradient(circle 22px at 88vw 38vh, rgba(226, 238, 255, 0.4) 0%, rgba(200, 222, 255, 0.12) 45%, rgba(200, 222, 255, 0) 100%),
    linear-gradient(90deg, rgba(224, 236, 255, 0) 0%, rgba(224, 236, 255, 0.32) 50%, rgba(224, 236, 255, 0) 100%) calc(88vw - 34px) 38vh / 68px 2px no-repeat,
    /* (3) a soft coarse glint on the moon's sunward limb — a specular kiss of
       sun on the lower-left edge (static, coarse) */
    radial-gradient(circle 26px at 80.4vw 17vh, rgba(255, 248, 224, 0.26) 0%, rgba(255, 240, 200, 0) 100%),
    /* hand-set stars — side thirds only (fine detail stays off-lane) */
    radial-gradient(circle 4px at 7vw 22vh, rgba(244, 244, 242, 0.9) 0 1.4px, rgba(244, 244, 242, 0) 4px),
    radial-gradient(circle 3px at 13vw 9vh, rgba(199, 214, 246, 0.8) 0 1.1px, rgba(199, 214, 246, 0) 3px),
    radial-gradient(circle 4px at 18vw 48vh, rgba(244, 244, 242, 0.7) 0 1.2px, rgba(244, 244, 242, 0) 4px),
    radial-gradient(circle 2.4px at 24vw 17vh, rgba(199, 214, 246, 0.6) 0 0.8px, rgba(199, 214, 246, 0) 2.4px),
    radial-gradient(circle 2.6px at 10vw 40vh, rgba(244, 244, 242, 0.55) 0 0.9px, rgba(244, 244, 242, 0) 2.6px),
    radial-gradient(circle 3px at 5vw 64vh, rgba(255, 214, 140, 0.75) 0 1.1px, rgba(255, 214, 140, 0) 3px),
    radial-gradient(circle 4px at 88vw 38vh, rgba(244, 244, 242, 0.85) 0 1.3px, rgba(244, 244, 242, 0) 4px),
    radial-gradient(circle 3px at 94vw 12vh, rgba(199, 214, 246, 0.7) 0 1px, rgba(199, 214, 246, 0) 3px),
    radial-gradient(circle 3px at 92vw 58vh, rgba(255, 214, 140, 0.65) 0 1px, rgba(255, 214, 140, 0) 3px),
    radial-gradient(circle 2.4px at 96vw 30vh, rgba(199, 214, 246, 0.55) 0 0.8px, rgba(199, 214, 246, 0) 2.4px),
    radial-gradient(circle 2.6px at 90vw 72vh, rgba(244, 244, 242, 0.5) 0 0.9px, rgba(244, 244, 242, 0) 2.6px),
    /* faint diffraction spikes on the two brightest side stars — a cheap,
       coarse cross that makes them read as real bright stars, not dots. Off
       the lane (x<28vw / x>88vw), soft and low-alpha so flicker-law-safe. */
    linear-gradient(rgba(224, 232, 250, 0.5), rgba(224, 232, 250, 0)) 7vw 15vh / 1px 28px no-repeat,
    linear-gradient(90deg, rgba(224, 232, 250, 0) 0%, rgba(224, 232, 250, 0.5) 50%, rgba(224, 232, 250, 0) 100%) calc(7vw - 14px) 22vh / 28px 1px no-repeat,
    linear-gradient(rgba(224, 232, 250, 0.45), rgba(224, 232, 250, 0)) 88vw 31vh / 1px 26px no-repeat,
    linear-gradient(90deg, rgba(224, 232, 250, 0) 0%, rgba(224, 232, 250, 0.45) 50%, rgba(224, 232, 250, 0) 100%) calc(88vw - 13px) 38vh / 26px 1px no-repeat,
    /* MILKY-WAY band — a coarse, low-alpha galactic river raked diagonally
       through the empty zenith from upper-left down toward the right, with a
       warmer dust-lane core and cool star-cloud shoulders. Soft >300px blobs
       stacked so they never resolve into a fine pattern: flicker-law-safe on
       the fixed layer even where it grazes the top of the lane (that band is
       under the mask's 0-11% fade, so no live text sits in it). Kills the dead
       black void that read as "unfinished" before. */
    radial-gradient(ellipse 900px 320px at 20vw 8vh, rgba(150, 140, 200, 0.11) 0%, rgba(150, 140, 200, 0) 70%),
    radial-gradient(ellipse 760px 260px at 46vw 4vh, rgba(120, 130, 190, 0.09) 0%, rgba(120, 130, 190, 0) 70%),
    radial-gradient(ellipse 820px 300px at 74vw 10vh, rgba(110, 128, 185, 0.1) 0%, rgba(110, 128, 185, 0) 70%),
    radial-gradient(ellipse 620px 220px at 95vw 22vh, rgba(96, 122, 175, 0.09) 0%, rgba(96, 122, 175, 0) 72%),
    radial-gradient(ellipse 520px 200px at 3vw 30vh, rgba(150, 118, 158, 0.07) 0%, rgba(150, 118, 158, 0) 72%),
    radial-gradient(ellipse 700px 210px at 40vw 6vh, rgba(180, 150, 170, 0.055) 0%, rgba(180, 150, 170, 0) 66%),
    /* one distant nebula bloom breaking the dead upper-centre void — huge,
       very soft, very low alpha so it never resolves as a fine pattern over
       the scrolling names (L6): reads as far-off gas, not a hotspot */
    radial-gradient(ellipse 560px 300px at 56vw 20vh, rgba(96, 110, 165, 0.06) 0%, rgba(96, 110, 165, 0.02) 55%, rgba(96, 110, 165, 0) 78%),
    /* ---- SUNRISE GLARE breaking the dead centre-right void: the sun is
       about to crest the limb on the left, throwing a huge coarse wash of
       warm-then-cool scattered light diagonally across the whole right half
       of the frame. This is the single biggest fix for the flat black
       middle band — it gives the empty mid-frame real atmospheric depth and
       reinforces the "dawn ascent" fiction. Enormous (>900px) and very low
       alpha so it stays a soft field, never a fine pattern: L6-safe even
       where its soft shoulder grazes the lane edges. ---- */
    radial-gradient(ellipse 1200px 820px at 118vw 74vh, rgba(255, 176, 96, 0.09) 0%, rgba(255, 150, 90, 0.045) 30%, rgba(150, 140, 190, 0.02) 62%, rgba(120, 130, 180, 0) 82%),
    radial-gradient(ellipse 1000px 900px at 108vw 44vh, rgba(120, 150, 205, 0.06) 0%, rgba(110, 135, 195, 0.02) 55%, rgba(110, 135, 195, 0) 80%),
    /* ---- DISTANT NEBULA in the right-centre void — a coarse two-tone gas
       cloud (cool teal core, faint magenta shoulder) filling the dead band
       between the moon and the limb. Soft >400px blobs, low alpha, off the
       text lane (x>66vw): reads as far-off structure, not a hotspot. ---- */
    radial-gradient(ellipse 520px 380px at 84vw 50vh, rgba(90, 150, 175, 0.07) 0%, rgba(90, 150, 175, 0.025) 52%, rgba(90, 150, 175, 0) 78%),
    radial-gradient(ellipse 440px 300px at 90vw 44vh, rgba(150, 110, 175, 0.05) 0%, rgba(150, 110, 175, 0) 72%),
    radial-gradient(ellipse 360px 460px at 77vw 58vh, rgba(96, 122, 175, 0.055) 0%, rgba(96, 122, 175, 0) 74%),
    /* ---- a small faint CONSTELLATION (a lyre-like asterism) in the right
       void — real deep-space furniture that fills the emptiness with intent.
       Baked as one SVG tile: organic diagonal star-links + soft star cores,
       200x180 pinned around 84vw 50vh (off the >72vw lane). Thin STATIC lines
       + coarse soft glows, no repeating pattern: L6-safe. ---- */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 180'%3E%3Cg stroke='%23c8d8f4' stroke-width='0.9' opacity='0.34' fill='none' stroke-linecap='round'%3E%3Cpath d='M34 26 L96 40 L150 22 L168 84 L104 120 L96 40 M104 120 L150 22'/%3E%3C/g%3E%3Cg fill='%23e6eefc'%3E%3Ccircle cx='34' cy='26' r='2.6' opacity='.85'/%3E%3Ccircle cx='96' cy='40' r='3.2' opacity='.9'/%3E%3Ccircle cx='150' cy='22' r='2.2' opacity='.78'/%3E%3Ccircle cx='168' cy='84' r='2.4' opacity='.8'/%3E%3Ccircle cx='104' cy='120' r='2' opacity='.72'/%3E%3C/g%3E%3Ccircle cx='96' cy='40' r='6' fill='%23bcd0f2' opacity='.28'/%3E%3Ccircle cx='150' cy='22' r='5' fill='%23ffe6be' opacity='.22'/%3E%3C/svg%3E") 84vw 50vh / 220px 198px no-repeat,
    /* star-cloud sparkle — a dusting of tiny cool motes riding the Milky-Way
       band, clustered in the top corners only (off the vertical lane) */
    radial-gradient(circle 1.6px at 15vw 5vh, rgba(224, 232, 250, 0.7) 0 0.7px, rgba(224, 232, 250, 0) 1.6px),
    radial-gradient(circle 1.4px at 22vw 11vh, rgba(224, 232, 250, 0.6) 0 0.6px, rgba(224, 232, 250, 0) 1.4px),
    radial-gradient(circle 1.5px at 9vw 8vh, rgba(214, 224, 248, 0.65) 0 0.6px, rgba(214, 224, 248, 0) 1.5px),
    radial-gradient(circle 1.4px at 80vw 6vh, rgba(224, 232, 250, 0.6) 0 0.6px, rgba(224, 232, 250, 0) 1.4px),
    radial-gradient(circle 1.6px at 85vw 13vh, rgba(214, 224, 248, 0.7) 0 0.7px, rgba(214, 224, 248, 0) 1.6px),
    radial-gradient(circle 1.4px at 91vw 5vh, rgba(224, 232, 250, 0.55) 0 0.6px, rgba(224, 232, 250, 0) 1.4px),
    /* city lights asleep on the dark limb — warm coastal clusters hugging
       the bottom edge (below the 89% mask fade, so never under live text);
       soft halos with a few 2px cores, L6-legal at the screen edge */
    radial-gradient(ellipse 56px 14px at 43vw 95.2vh, rgba(255, 190, 120, 0.3) 0%, rgba(255, 190, 120, 0) 70%),
    radial-gradient(circle 2px at 41.8vw 94.9vh, rgba(255, 220, 160, 0.95) 0 1px, rgba(255, 220, 160, 0) 2px),
    radial-gradient(circle 2px at 43vw 95.4vh, rgba(255, 220, 160, 0.8) 0 0.9px, rgba(255, 220, 160, 0) 2px),
    radial-gradient(circle 2px at 44.3vw 95.8vh, rgba(255, 220, 160, 0.85) 0 1px, rgba(255, 220, 160, 0) 2px),
    radial-gradient(ellipse 70px 16px at 64vw 95.8vh, rgba(255, 190, 120, 0.26) 0%, rgba(255, 190, 120, 0) 70%),
    radial-gradient(circle 2px at 62.4vw 95.4vh, rgba(255, 220, 160, 0.9) 0 1px, rgba(255, 220, 160, 0) 2px),
    radial-gradient(circle 2px at 63.6vw 95.8vh, rgba(255, 220, 160, 0.75) 0 0.9px, rgba(255, 220, 160, 0) 2px),
    radial-gradient(circle 2px at 65.4vw 96.4vh, rgba(255, 220, 160, 0.85) 0 1px, rgba(255, 220, 160, 0) 2px),
    radial-gradient(circle 2px at 66.6vw 96.9vh, rgba(255, 220, 160, 0.65) 0 0.9px, rgba(255, 220, 160, 0) 2px),
    radial-gradient(ellipse 44px 11px at 72.5vw 97.4vh, rgba(255, 190, 120, 0.2) 0%, rgba(255, 190, 120, 0) 70%),
    radial-gradient(circle 2px at 72vw 97.2vh, rgba(255, 220, 160, 0.7) 0 0.9px, rgba(255, 220, 160, 0) 2px),
    /* amber terminator — sunrise about to break behind the limb, left */
    radial-gradient(ellipse 40vw 17vh at 26% 92vh, rgba(255, 176, 0, 0.42) 0%, rgba(252, 123, 33, 0.2) 45%, rgba(252, 61, 33, 0) 75%),
    /* HIGH-ALTITUDE AIRGLOW — a second, cooler, fainter band riding above the
       bright limb line; real night limbs stack a mesospheric arc over the
       tropospheric one. Concentric with the planet, ~9-40px outside its edge,
       so it reads as a distinct upper atmosphere layer, not a blur. Coarse
       soft band => flicker-law safe on the fixed layer. */
    radial-gradient(circle 150vw at 50% calc(88.5vh + 150vw),
      rgba(120, 180, 235, 0) calc(150vw + 8px),
      rgba(140, 195, 240, 0.16) calc(150vw + 20px),
      rgba(120, 175, 230, 0.09) calc(150vw + 40px),
      rgba(120, 175, 230, 0) calc(150vw + 78px)),
    /* faint GREEN airglow (OI 557nm) hugging the horizon on the left where the
       sun is closest — the real night-sky glow, low alpha and cool */
    radial-gradient(circle 150vw at 50% calc(88.5vh + 150vw),
      rgba(120, 220, 180, 0) calc(150vw - 26px),
      rgba(150, 235, 190, 0.12) calc(150vw - 8px),
      rgba(150, 235, 190, 0.05) calc(150vw + 4px),
      rgba(150, 235, 190, 0) calc(150vw + 22px)),
    /* the planet: dark body -> blue haze -> bright airglow line -> soft
       outer glow fading into space */
    radial-gradient(circle 150vw at 50% calc(88.5vh + 150vw),
      #05070f 0,
      #060c1e calc(150vw - 220px),
      #0a1633 calc(150vw - 64px),
      #16305e calc(150vw - 24px),
      #3c6ea8 calc(150vw - 11px),
      #9fd0f0 calc(150vw - 4px),
      #d9f0ff calc(150vw - 1px),
      #cfeaff 150vw,
      rgba(122, 180, 235, 0.55) calc(150vw + 7px),
      rgba(90, 150, 220, 0.22) calc(150vw + 28px),
      rgba(70, 120, 200, 0.08) calc(150vw + 64px),
      rgba(70, 120, 200, 0) calc(150vw + 118px));
}

/* ---- telemetry cursor: an 8x14 amber block at the end of the readout,
   blinking on steps(1) (~0.9 paints/s; opacity only; tiny element) ---- */
html::after {
  content: "";
  display: var(--rocket-scenery, block);
  position: fixed;
  left: 170px;
  top: calc(13vh + 64px);
  width: 8px;
  height: 14px;
  z-index: 0;
  pointer-events: none;
  background: var(--rocket-amber);
  box-shadow: 0 0 8px rgba(255, 176, 0, 0.55);
  animation: rocket-cursor 1.1s steps(1, end) infinite;
}

/* ---- lane scrim + mission clock: STATIC, promoted. The scrim deepens
   the center column so paper-white names hold against the limb glow;
   the readout panel sits at 13vh (below the base mask's top fade) with
   a NASA-red header rule. Multi-line text via \\A + white-space:pre. ---- */
body::before {
  content: "T+   00:07:23\\A ALT  067 KM\\A VEL  7.4 KM-S";
  display: var(--rocket-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  text-align: left;
  white-space: pre;
  padding: calc(13vh + 16px) 0 0 44px;
  font: 500 13px/22px "IBM Plex Mono", "Menlo", monospace;
  letter-spacing: 0.12em;
  color: var(--rocket-amber);
  text-shadow: 0 0 8px rgba(255, 176, 0, 0.35);
  background:
    linear-gradient(#fc3d21, #fc3d21) 28px 13vh / 224px 2px no-repeat,
    linear-gradient(rgba(255, 176, 0, 0.35), rgba(255, 176, 0, 0.35)) 28px calc(13vh + 2px) / 1px 88px no-repeat,
    linear-gradient(180deg, rgba(6, 10, 20, 0.72), rgba(6, 10, 20, 0.45)) 28px calc(13vh + 2px) / 224px 88px no-repeat,
    linear-gradient(90deg, rgba(2, 4, 10, 0) 8%, rgba(2, 4, 10, 0.42) 30% 70%, rgba(2, 4, 10, 0) 92%);
}

/* ---- GO FOR LAUNCH chip: static, top-right, aligned with the clock ---- */
body::after {
  content: "GO FOR LAUNCH";
  display: var(--rocket-scenery, block);
  position: fixed;
  top: 13vh;
  right: 28px;
  z-index: -1;
  pointer-events: none;
  padding: 10px 14px 9px 30px;
  font: 600 11px/1 "IBM Plex Mono", "Menlo", monospace;
  letter-spacing: 0.26em;
  color: var(--rocket-amber);
  border: 1px solid rgba(255, 176, 0, 0.5);
  border-radius: 2px;
  text-shadow: 0 0 8px rgba(255, 176, 0, 0.4);
  background:
    radial-gradient(circle 4px at 16px 50%, #ffd25e 0 2.2px, rgba(255, 176, 0, 0.3) 2.8px, rgba(255, 176, 0, 0) 4px),
    linear-gradient(180deg, rgba(18, 13, 2, 0.78), rgba(8, 6, 2, 0.78));
  box-shadow: 0 0 18px rgba(255, 176, 0, 0.12), inset 0 0 12px rgba(255, 176, 0, 0.08);
}

/* ---- void-element prop layers: meta/link render nothing themselves but
   their pseudos carry the ground-support fiction (kill-switched like all
   scenery) ---- */
head meta, head link { display: var(--rocket-scenery, block); }

/* ---- LAUNCH GANTRY: the umbilical tower the Saturn-V lifts past —
   bottom-left, anchored to the rocket's 16vw flight line so the swing
   arms (already rotated back for launch) reach toward the hull without
   touching it. Near-black steel truss with X-bracing, hammerhead crane,
   service lamps; the right edge catches the amber terminator burning
   low on the left, the crane top catches the cold airglow. STATIC,
   promoted; pad steam + amber ground bloom ride the same layer. ---- */
head meta:first-of-type::before {
  content: "";
  display: var(--rocket-scenery, block);
  position: fixed;
  left: calc(16vw - 148px);
  bottom: 0;
  width: 190px;
  height: 520px;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 190 520'%3E%3Crect x='44' y='60' width='52' height='430' fill='%230a0e18'/%3E%3Cpath d='M44 60 L96 103 M96 60 L44 103 M44 103 L96 146 M96 103 L44 146 M44 146 L96 189 M96 146 L44 189 M44 189 L96 232 M96 189 L44 232 M44 232 L96 275 M96 232 L44 275 M44 275 L96 318 M96 275 L44 318 M44 318 L96 361 M96 318 L44 361 M44 361 L96 404 M96 361 L44 404 M44 404 L96 447 M96 404 L44 447 M44 447 L96 490 M96 447 L44 490' stroke='%231f2735' stroke-width='1.5'/%3E%3Cpath d='M44 103 L96 103 M44 146 L96 146 M44 189 L96 189 M44 232 L96 232 M44 275 L96 275 M44 318 L96 318 M44 361 L96 361 M44 404 L96 404 M44 447 L96 447' stroke='%23161d2a' stroke-width='1.5'/%3E%3Cg transform='rotate(-12 96 128)'%3E%3Crect x='96' y='123.5' width='62' height='9' rx='2' fill='%230c1120'/%3E%3Cpath d='M96 123.5 L158 132.5 M96 132.5 L158 123.5' stroke='%231f2735' stroke-width='1'/%3E%3Ccircle cx='156' cy='128' r='1.8' fill='%23ffb000' opacity='.75'/%3E%3C/g%3E%3Cg transform='rotate(-9 96 198)'%3E%3Crect x='96' y='193.5' width='62' height='9' rx='2' fill='%230c1120'/%3E%3Cpath d='M96 193.5 L158 202.5 M96 202.5 L158 193.5' stroke='%231f2735' stroke-width='1'/%3E%3Ccircle cx='156' cy='198' r='1.8' fill='%23ffb000' opacity='.7'/%3E%3C/g%3E%3Cg transform='rotate(-13 96 266)'%3E%3Crect x='96' y='261.5' width='62' height='9' rx='2' fill='%230c1120'/%3E%3Cpath d='M96 261.5 L158 270.5 M96 270.5 L158 261.5' stroke='%231f2735' stroke-width='1'/%3E%3Ccircle cx='156' cy='266' r='1.8' fill='%23ffb000' opacity='.75'/%3E%3C/g%3E%3Cg transform='rotate(-8 96 334)'%3E%3Crect x='96' y='329.5' width='62' height='9' rx='2' fill='%230c1120'/%3E%3Cpath d='M96 329.5 L158 338.5 M96 338.5 L158 329.5' stroke='%231f2735' stroke-width='1'/%3E%3Ccircle cx='156' cy='334' r='1.8' fill='%23ffb000' opacity='.7'/%3E%3C/g%3E%3Cg transform='rotate(-11 96 402)'%3E%3Crect x='96' y='397.5' width='62' height='9' rx='2' fill='%230c1120'/%3E%3Cpath d='M96 397.5 L158 406.5 M96 406.5 L158 397.5' stroke='%231f2735' stroke-width='1'/%3E%3Ccircle cx='156' cy='402' r='1.8' fill='%23ffb000' opacity='.75'/%3E%3C/g%3E%3Cpolygon points='58 60 68 48 122 48 130 60' fill='%230a0e18'/%3E%3Crect x='18' y='34' width='150' height='14' fill='%230a0e18'/%3E%3Cpath d='M30 34 L44 48 M44 34 L30 48 M58 34 L72 48 M72 34 L58 48 M86 34 L100 48 M100 34 L86 48 M114 34 L128 48 M128 34 L114 48 M142 34 L156 48 M156 34 L142 48' stroke='%231f2735' stroke-width='1'/%3E%3Cpath d='M18 34 L168 34' stroke='%239fd0f0' stroke-opacity='.2' stroke-width='1.2'/%3E%3Crect x='100' y='48' width='13' height='11' rx='1' fill='%230c1120' stroke='%23232c3e' stroke-width='.8'/%3E%3Crect x='103' y='51' width='4' height='3' fill='%23ffb000' opacity='.55'/%3E%3Cpath d='M138 48 L138 84' stroke='%231c2432' stroke-width='1.3'/%3E%3Crect x='133.5' y='84' width='9' height='11' fill='%230c1120'/%3E%3Cpath d='M133.5 86 L142.5 86' stroke='%23232c3e' stroke-width='1'/%3E%3Crect x='92' y='15' width='3' height='19' fill='%2310141d'/%3E%3Ccircle cx='93.5' cy='13' r='2.6' fill='%23331014'/%3E%3Cpath d='M95.5 130 L95.5 490' stroke='%23ffb000' stroke-opacity='.26' stroke-width='1.4'/%3E%3Cpath d='M95.5 370 L95.5 490' stroke='%23ffb000' stroke-opacity='.5' stroke-width='1.5'/%3E%3Cpath d='M44.5 60 L44.5 210' stroke='%239fd0f0' stroke-opacity='.14' stroke-width='1'/%3E%3Ccircle cx='47' cy='175' r='1.7' fill='%23ffb000' opacity='.55'/%3E%3Ccircle cx='47' cy='330' r='1.7' fill='%23ffb000' opacity='.5'/%3E%3Ccircle cx='47' cy='470' r='1.7' fill='%23ffb000' opacity='.6'/%3E%3Cpath d='M96 470 Q120 476 138 491' stroke='%230c1120' stroke-width='2.5' fill='none'/%3E%3Crect x='118' y='478' width='5' height='13' fill='%23060a12'/%3E%3Crect x='138' y='478' width='5' height='13' fill='%23060a12'/%3E%3Cpath d='M6 520 L6 501 L34 491 L156 491 L184 501 L184 520 Z' fill='%2304060c'/%3E%3Cpath d='M6 501 L34 491 L156 491 L184 501' stroke='%23232c3e' stroke-width='1.3' fill='none'/%3E%3Cpath d='M156 491 L184 501' stroke='%23ffb000' stroke-opacity='.45' stroke-width='1.3'/%3E%3Ccircle cx='72' cy='494.5' r='1.5' fill='%23ffb000' opacity='.6'/%3E%3Ccircle cx='112' cy='494.5' r='1.5' fill='%23ffb000' opacity='.5'/%3E%3Ccircle cx='150' cy='494.5' r='1.5' fill='%23ffb000' opacity='.65'/%3E%3C/svg%3E") center bottom / 190px 520px no-repeat,
    radial-gradient(ellipse 90px 26px at 68% 96%, rgba(200, 210, 225, 0.08) 0%, rgba(200, 210, 225, 0) 70%),
    radial-gradient(ellipse 130px 60px at 50% 100%, rgba(255, 176, 0, 0.1) 0%, rgba(255, 176, 0, 0) 70%);
}

/* ---- gantry beacon: 8px aviation lamp on the crane mast — dim ember
   that flashes once per 3.2s cycle (steps, opacity-only, ~0.6 paints/s) ---- */
head link::before {
  content: "";
  display: var(--rocket-scenery, block);
  position: fixed;
  left: calc(16vw - 58.5px);
  bottom: 503px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  z-index: -1;
  pointer-events: none;
  background: radial-gradient(circle, #ff8f7a 0 2px, rgba(252, 61, 33, 0.8) 3px, rgba(252, 61, 33, 0) 4px);
  box-shadow: 0 0 10px rgba(252, 61, 33, 0.6);
  animation: rocket-beacon 3.2s steps(1, end) infinite;
}

/* ---- THE MOON: a proper waning-gibbous sphere, hand-illustrated as an SVG
   prop (replacing the old stacked-radial blob that read as a lumpy potato).
   Sun grazes from the lower-left so the terminator crescent falls on the
   right limb; the near-side maria (Imbrium / Serenitatis / Tranquillitatis /
   Crisium) give it a recognisable face, three ray-craters (Tycho, Copernicus,
   Kepler) carry sunlit rims, cool earthshine fills the shadow so it never
   reads as a hard-clipped crescent, and a single specular glint sits on the
   sunward limb (STATIC specular highlight = always flicker-law-safe). Pinned
   at 82.6vw/15.5vh (off the >72vw lane), sitting in the html::before halo. ---- */
head link::after {
  content: "";
  display: var(--rocket-scenery, block);
  position: fixed;
  left: 82.6vw;
  top: 15.5vh;
  width: 96px;
  height: 96px;
  margin: -48px 0 0 -48px;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3CradialGradient id='mhalo' cx='.5' cy='.5' r='.5'%3E%3Cstop offset='.78' stop-color='%23c6d8f4' stop-opacity='0'/%3E%3Cstop offset='.9' stop-color='%23c6d8f4' stop-opacity='.12'/%3E%3Cstop offset='1' stop-color='%23c6d8f4' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='mbody' cx='.4' cy='.62' r='.66'%3E%3Cstop offset='0' stop-color='%23fdfdfb'/%3E%3Cstop offset='.32' stop-color='%23edf0f4'/%3E%3Cstop offset='.6' stop-color='%23d2d8e2'/%3E%3Cstop offset='.82' stop-color='%23a9b1c1'/%3E%3Cstop offset='1' stop-color='%237e8698'/%3E%3C/radialGradient%3E%3CradialGradient id='mterm' cx='.82' cy='.5' r='.62'%3E%3Cstop offset='0' stop-color='%23070b16' stop-opacity='.96'/%3E%3Cstop offset='.34' stop-color='%230a0f1e' stop-opacity='.9'/%3E%3Cstop offset='.66' stop-color='%230d1424' stop-opacity='.5'/%3E%3Cstop offset='1' stop-color='%230d1424' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='mearth' cx='.86' cy='.5' r='.28'%3E%3Cstop offset='0' stop-color='%233a5178' stop-opacity='.42'/%3E%3Cstop offset='1' stop-color='%233a5178' stop-opacity='0'/%3E%3C/radialGradient%3E%3CclipPath id='mclip'%3E%3Ccircle cx='50' cy='50' r='44'/%3E%3C/clipPath%3E%3C/defs%3E%3Ccircle cx='50' cy='50' r='50' fill='url(%23mhalo)'/%3E%3Ccircle cx='50' cy='50' r='44' fill='url(%23mbody)'/%3E%3Cg clip-path='url(%23mclip)'%3E%3Cpath d='M24 28 Q40 20 52 28 Q58 38 50 46 Q36 50 28 42 Q20 34 24 28 Z' fill='%236b7689' opacity='.26'/%3E%3Cellipse cx='32' cy='58' rx='11' ry='13' fill='%23707b8f' opacity='.2' transform='rotate(12 32 58)'/%3E%3Cpath d='M48 56 Q60 52 64 60 Q62 70 52 70 Q44 66 48 56 Z' fill='%236d7789' opacity='.19'/%3E%3Cellipse cx='60' cy='34' rx='8' ry='6' fill='%23687284' opacity='.17'/%3E%3Cellipse cx='40' cy='40' rx='6' ry='7' fill='%236c7688' opacity='.15' transform='rotate(-10 40 40)'/%3E%3Cellipse cx='26' cy='72' rx='6' ry='4' fill='%236f7a8d' opacity='.15' transform='rotate(-18 26 72)'/%3E%3Ccircle cx='40' cy='74' r='4' fill='none' stroke='%23fbfcfe' stroke-width='1' opacity='.6'/%3E%3Ccircle cx='40' cy='74' r='2' fill='%238b95a8' opacity='.4'/%3E%3Cpath d='M40 70 L37.5 65 M40 70 L45 66 M40 70 L35 72 M40 70 L46 73' stroke='%23e8ecf3' stroke-width='.6' opacity='.36'/%3E%3Ccircle cx='56' cy='48' r='2.4' fill='%238b95a8' opacity='.32'/%3E%3Ccircle cx='55' cy='47' r='1' fill='%23e6ebf3' opacity='.4'/%3E%3Ccircle cx='34' cy='38' r='1.8' fill='%238b95a8' opacity='.3'/%3E%3Cpath d='M11 62 A44 44 0 0 0 40 92' fill='none' stroke='%23fff2d8' stroke-width='1.6' opacity='.5'/%3E%3Crect x='0' y='0' width='100' height='100' fill='url(%23mearth)'/%3E%3Crect x='0' y='0' width='100' height='100' fill='url(%23mterm)'/%3E%3Cpath d='M71 13 A44 44 0 0 1 71 87' fill='none' stroke='%23cfe0f5' stroke-width='1' opacity='.45'/%3E%3C/g%3E%3Ccircle cx='31' cy='41' r='2.2' fill='%23ffffff' opacity='.9'/%3E%3Cellipse cx='30' cy='56' rx='2.4' ry='6' fill='%23f4f7fc' opacity='.34' transform='rotate(-26 30 56)'/%3E%3C/svg%3E") center / contain no-repeat;
}

/* ---- MISSION PATCH: embroidered roundel pinned below the telemetry
   panel — silver-bound navy ring with stitched edge, Menlo ring text,
   and inside: the night limb with its own city lights, a dashed
   translunar arc from Earth to a waning moon, and a tiny climbing
   rocket. STATIC, promoted. ---- */
head meta:first-of-type::after {
  content: "";
  display: var(--rocket-scenery, block);
  position: fixed;
  left: 30px;
  top: calc(13vh + 106px);
  width: 92px;
  height: 92px;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'%3E%3Cdefs%3E%3CradialGradient id='pg' cx='.5' cy='.5' r='.5'%3E%3Cstop offset='.7' stop-color='%23ffb000' stop-opacity='0'/%3E%3Cstop offset='.92' stop-color='%23ffb000' stop-opacity='.1'/%3E%3Cstop offset='1' stop-color='%23ffb000' stop-opacity='0'/%3E%3C/radialGradient%3E%3CclipPath id='dc'%3E%3Ccircle cx='60' cy='60' r='41.5'/%3E%3C/clipPath%3E%3C/defs%3E%3Ccircle cx='60' cy='60' r='60' fill='url(%23pg)'/%3E%3Ccircle cx='60' cy='60' r='57' fill='%230b1026' stroke='%23c7ccd6' stroke-width='2.4'/%3E%3Ccircle cx='60' cy='60' r='53.5' fill='none' stroke='%238b95a6' stroke-width='1' stroke-dasharray='2 3' opacity='.4'/%3E%3Ccircle cx='60' cy='60' r='41.5' fill='%23060a18' stroke='%23fc3d21' stroke-width='1.6'/%3E%3Cpath id='tr' d='M60 12.5 a47.5 47.5 0 1 1 -.1 0' fill='none'/%3E%3Ctext font-family='Menlo,Consolas,monospace' font-size='8.4' letter-spacing='2.1' fill='%23c7ccd6'%3E%3CtextPath href='%23tr'%3EMISSION GRATITUDE %E2%98%85 AD ASTRA %E2%98%85 MMLXIX%3C/textPath%3E%3C/text%3E%3Cg clip-path='url(%23dc)'%3E%3Ccircle cx='60' cy='134' r='62' fill='%2310223f'/%3E%3Ccircle cx='60' cy='134' r='62' fill='none' stroke='%239fd0f0' stroke-width='1.6' opacity='.85'/%3E%3Cellipse cx='40' cy='74' rx='14' ry='5' fill='%23ffb000' opacity='.3'/%3E%3Ccircle cx='47' cy='80' r='.9' fill='%23ffd28f' opacity='.9'/%3E%3Ccircle cx='68' cy='79' r='.9' fill='%23ffd28f' opacity='.8'/%3E%3Ccircle cx='76' cy='83' r='.8' fill='%23ffd28f' opacity='.7'/%3E%3C/g%3E%3Ccircle cx='44' cy='36' r='1.2' fill='%23f4f4f2' opacity='.85'/%3E%3Ccircle cx='73' cy='50' r='1' fill='%23f4f4f2' opacity='.7'/%3E%3Ccircle cx='52' cy='58' r='.9' fill='%23f4f4f2' opacity='.6'/%3E%3Ccircle cx='84' cy='33' r='4.2' fill='%23c7ccd6'/%3E%3Ccircle cx='82.6' cy='31.8' r='1.1' fill='%2398a2b2'/%3E%3Cpath d='M40 71 Q52 36 79 34' stroke='%23f4f4f2' stroke-width='1.1' stroke-dasharray='3 2.6' fill='none' opacity='.8'/%3E%3Cg transform='rotate(56 60 41)'%3E%3Crect x='59' y='36' width='2.4' height='7.5' rx='1.2' fill='%23f4f4f2'/%3E%3Ccircle cx='60.2' cy='45.4' r='1' fill='%23ffb000'/%3E%3C/g%3E%3C/svg%3E") center / contain no-repeat;
}

/* ---- CSM in high orbit: the tiny command/service module coasting far
   downrange, upper right — silver cone catching the coming sunrise on
   its underside, cold earthshine on top, engine quiet. STATIC. ---- */
head meta:last-of-type::before {
  content: "";
  display: var(--rocket-scenery, block);
  position: fixed;
  left: 68vw;
  top: 29vh;
  width: 84px;
  height: 42px;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0) rotate(-15deg);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 112 56'%3E%3Cdefs%3E%3ClinearGradient id='sm' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%232b3548'/%3E%3Cstop offset='.42' stop-color='%234a5570'/%3E%3Cstop offset='.72' stop-color='%23707e96'/%3E%3Cstop offset='1' stop-color='%23343d52'/%3E%3C/linearGradient%3E%3ClinearGradient id='cm' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%237e8a9e'/%3E%3Cstop offset='.4' stop-color='%23d6dce6'/%3E%3Cstop offset='.62' stop-color='%23f4f7fb'/%3E%3Cstop offset='.82' stop-color='%23ffe9c6'/%3E%3Cstop offset='1' stop-color='%23e0b578'/%3E%3C/linearGradient%3E%3ClinearGradient id='dish' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23cdd4e0'/%3E%3Cstop offset='.5' stop-color='%23eef2f7'/%3E%3Cstop offset='1' stop-color='%239aa3b4'/%3E%3C/linearGradient%3E%3CradialGradient id='cg' cx='.5' cy='.5' r='.5'%3E%3Cstop offset='0' stop-color='%239fd0f0' stop-opacity='.12'/%3E%3Cstop offset='1' stop-color='%239fd0f0' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='56' cy='28' rx='54' ry='24' fill='url(%23cg)'/%3E%3Cpath d='M94 28 L104 20' stroke='%236c7688' stroke-width='1' opacity='.8'/%3E%3Cg fill='url(%23dish)' stroke='%236c7688' stroke-width='.4' transform='translate(105 17) rotate(18)'%3E%3Cellipse cx='0' cy='-5' rx='5' ry='4'/%3E%3Cellipse cx='5' cy='0' rx='5' ry='4'/%3E%3Cellipse cx='-5' cy='0' rx='5' ry='4'/%3E%3Cellipse cx='0' cy='5' rx='5' ry='4'/%3E%3C/g%3E%3Cpath d='M100 10 L108 15' stroke='%23ffe0b0' stroke-opacity='.65' stroke-width='.7'/%3E%3Crect x='28' y='14' width='44' height='28' rx='2' fill='url(%23sm)'/%3E%3Crect x='28' y='14' width='44' height='2.4' fill='%239fc4e8' opacity='.6'/%3E%3Crect x='28' y='39.6' width='44' height='2.4' fill='%23ffcf8a' opacity='.7'/%3E%3Cg stroke='%2318202e' stroke-width='.8' opacity='.7'%3E%3Cline x1='40' y1='14' x2='40' y2='42'/%3E%3Cline x1='52' y1='14' x2='52' y2='42'/%3E%3Cline x1='62' y1='14' x2='62' y2='42'/%3E%3C/g%3E%3Crect x='31' y='18' width='7' height='5' rx='.6' fill='%23161d29' opacity='.75'/%3E%3Crect x='31' y='33' width='7' height='5' rx='.6' fill='%23161d29' opacity='.6'/%3E%3Crect x='72' y='20' width='4' height='16' fill='%233b4457'/%3E%3Cpath d='M72 20 L76 20' stroke='%23ffd9a8' stroke-opacity='.7' stroke-width='1'/%3E%3Cpath d='M76 22 L88 17 L88 39 L76 34 Z' fill='%23222a39'/%3E%3Cpath d='M76 22 L88 17 M76 34 L88 39' stroke='%236c7688' stroke-width='.6' opacity='.7'/%3E%3Cellipse cx='88' cy='28' rx='2.6' ry='11' fill='%230c1018'/%3E%3Cellipse cx='88' cy='28' rx='1.4' ry='7' fill='%23ff8a3a' opacity='.5'/%3E%3Cpolygon points='28 14 12 22 12 34 28 42' fill='url(%23cm)'/%3E%3Cpath d='M28 14 L12 22' stroke='%23fff4dc' stroke-width='1' opacity='.85'/%3E%3Cpath d='M28 42 L12 34' stroke='%23c98a4a' stroke-width='1' opacity='.6'/%3E%3Cellipse cx='22' cy='28' rx='2.4' ry='3.4' fill='%230b1026'/%3E%3Cellipse cx='21.4' cy='26.8' rx='.9' ry='1.3' fill='%239fd0f0' opacity='.9'/%3E%3C/svg%3E") center / contain no-repeat;
}

/* ---- the CSM window glint: a 16px four-point star that twinkles as
   the capsule's window sweeps the coming sun — steps(), opacity-only,
   ~0.5 paints/s, off most of the cycle ---- */
head meta:last-of-type::after {
  content: "";
  display: var(--rocket-scenery, block);
  position: fixed;
  left: calc(68vw + 9px);
  top: calc(29vh + 11px);
  width: 16px;
  height: 16px;
  z-index: -1;
  pointer-events: none;
  opacity: 0;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8 0 L9.3 6.7 L16 8 L9.3 9.3 L8 16 L6.7 9.3 L0 8 L6.7 6.7 Z' fill='%23fff7dc'/%3E%3Ccircle cx='8' cy='8' r='1.6' fill='%23ffffff'/%3E%3C/svg%3E") center / contain no-repeat;
  animation: rocket-glint 9s steps(1, end) infinite;
}

/* ---- THE SATURN-V: hero object, not a diagram — silver-white hull
   shaded left-to-right (shadow / paper / specular / shade), black
   roll-pattern bands, US flag + USA mark, red-gradient fins with a
   warm rim, three F-1 bells with flame-lit lips, baked plume + glow
   + thin exhaust trail. Two pose SVGs on head::before/::after — the
   whole small-mover budget (120x310, will-change) — climbing bottom
   to top up the left third on ONE 26s keyframe (slow off the pad,
   accelerating, 5.5deg gravity lean; on screen ~12s, parked
   off-screen ~14s). The plume flickers by a steps() opacity swap
   between the poses, skater-stride style. z-index 0 lifts the ship
   above the scrim but under the roll text. ---- */
head { display: var(--rocket-scenery, block); }
head::before,
head::after {
  content: "";
  display: var(--rocket-scenery, block);
  position: fixed;
  left: 16vw;
  top: 100vh;
  width: 120px;
  height: 310px;
  z-index: 0;
  pointer-events: none;
  background-repeat: no-repeat;
  background-position: center top;
  background-size: contain;
  transform-origin: 50% 80%;
  will-change: transform;
  animation: rocket-climb 26s linear infinite, rocket-flame-a 0.54s steps(1, end) infinite;
}
head::before {
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 310'><defs><linearGradient id='cyl' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='%234c5464'/><stop offset='.08' stop-color='%23838d9d'/><stop offset='.2' stop-color='%23d3d9e2'/><stop offset='.33' stop-color='%23f2f4f8'/><stop offset='.44' stop-color='%23ffffff'/><stop offset='.5' stop-color='%23fbfcfe'/><stop offset='.62' stop-color='%23dde2ea'/><stop offset='.78' stop-color='%23aab2c0'/><stop offset='.9' stop-color='%237c8494'/><stop offset='1' stop-color='%23545c6b'/></linearGradient><linearGradient id='spec' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='%23ffffff' stop-opacity='0'/><stop offset='.4' stop-color='%23ffffff' stop-opacity='0'/><stop offset='.47' stop-color='%23ffffff' stop-opacity='.95'/><stop offset='.53' stop-color='%23ffffff' stop-opacity='0'/><stop offset='1' stop-color='%23ffffff' stop-opacity='0'/></linearGradient><linearGradient id='rim' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='%23ffdca0' stop-opacity='0'/><stop offset='.88' stop-color='%23ffdca0' stop-opacity='0'/><stop offset='1' stop-color='%23ffe6b8' stop-opacity='.8'/></linearGradient><linearGradient id='cold' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='%239fc4e8' stop-opacity='.5'/><stop offset='.28' stop-color='%239fc4e8' stop-opacity='0'/></linearGradient><linearGradient id='blk' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='%2305070d'/><stop offset='.45' stop-color='%231e2331'/><stop offset='.55' stop-color='%232b3141'/><stop offset='1' stop-color='%23080b12'/></linearGradient><linearGradient id='fin' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%23545c6b'/><stop offset='.45' stop-color='%232f3542'/><stop offset='1' stop-color='%23161a24'/></linearGradient><linearGradient id='bell' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%232c313d'/><stop offset='.4' stop-color='%23474e5d'/><stop offset='.7' stop-color='%236b5636'/><stop offset='.9' stop-color='%23c98a3e'/><stop offset='1' stop-color='%23ffd27a'/></linearGradient><radialGradient id='fglow' cx='.5' cy='.34' r='.6'><stop offset='0' stop-color='%23ffe08a' stop-opacity='.6'/><stop offset='.45' stop-color='%23ff9a34' stop-opacity='.28'/><stop offset='1' stop-color='%23ff7a1e' stop-opacity='0'/></radialGradient><radialGradient id='thr' cx='.5' cy='.2' r='.85'><stop offset='0' stop-color='%23ffffff'/><stop offset='.28' stop-color='%23fff2c4'/><stop offset='.6' stop-color='%23ffc94e'/><stop offset='1' stop-color='%23ff8a24'/></radialGradient></defs><ellipse cx='60' cy='268' rx='36' ry='48' fill='url(%23fglow)'/><path d='M53 258 C43 288 52 318 60 332 C68 318 77 288 67 258 Z' fill='%23ff8420' opacity='.32'/><path d='M53.6 258 C47 282 52 306 60 320 C68 306 73 282 66.4 258 Z' fill='%23ff7a1a' opacity='.8'/><path d='M55 258 C50 278 54 296 60 308 C66 296 70 278 65 258 Z' fill='%23ffab34'/><path d='M56.6 258 C53 274 56 289 60 298 C64 289 67 274 63.4 258 Z' fill='%23ffd35a'/><path d='M58 258 C56 270 58 283 60 291 C62 283 64 270 62 258 Z' fill='url(%23thr)'/><ellipse cx='60' cy='268' rx='2.4' ry='3.4' fill='%23ffffff'/><ellipse cx='60' cy='279' rx='2' ry='2.8' fill='%23fff6d8' opacity='.92'/><ellipse cx='60' cy='289' rx='1.5' ry='2.2' fill='%23fff0c4' opacity='.72'/><ellipse cx='60' cy='298' rx='1' ry='1.6' fill='%23ffe6a4' opacity='.5'/><rect x='45' y='236' width='30' height='3.5' fill='%23252a35'/><rect x='45' y='236' width='30' height='1' fill='%236a7386' opacity='.8'/><rect x='45' y='238.5' width='30' height='1' fill='%23000000' opacity='.4'/><path d='M45 239.5 L75 239.5 L72 246 L48 246 Z' fill='%23161a22'/><path d='M45 239.5 L48 246' stroke='%237e879a' stroke-width='.5' opacity='.4'/><path d='M46 246 L51.5 246 L49.5 258 L43.5 257.5 Z' fill='url(%23bell)'/><path d='M68.5 246 L74 246 L76.5 257.5 L70.5 258 Z' fill='url(%23bell)'/><path d='M52.5 246 L58 246 L57 259 L50 258.5 Z' fill='url(%23bell)'/><path d='M62 246 L67.5 246 L70 258.5 L63 259 Z' fill='url(%23bell)'/><path d='M57.6 246 L62.4 246 L63.2 260 L56.8 260 Z' fill='url(%23bell)'/><g stroke='%23202631' stroke-width='.5' opacity='.55'><path d='M47 250 L50.6 250 M46.4 254 L50.1 254 M63.4 250 L67 250 M63.2 254 L67.2 254 M54 250 L57.6 250 M53.6 255 L57.3 255 M63 250 L66.7 250 M62.8 255 L66.6 255 M58 250 L62 250 M57.6 255 L62.4 255'/></g><path d='M43.5 257.5 L49.5 258 M50 258.5 L57 259 M56.8 260 L63.2 260 M63 259 L70 258.5 M70.5 258 L76.5 257.5' stroke='%23ffd782' stroke-width='1.5' opacity='.95'/><rect x='43' y='168' width='34' height='68' fill='url(%23cyl)'/><rect x='43' y='168' width='34' height='68' fill='url(%23rim)'/><rect x='43' y='168' width='34' height='68' fill='url(%23cold)'/><g stroke='%23aab2c0' stroke-width='.3' opacity='.32'><path d='M47 168 L47 236 M51 168 L51 236 M55 168 L55 236 M59 168 L59 236 M63 168 L63 236 M67 168 L67 236 M71 168 L71 236 M75 168 L75 236'/></g><rect x='53' y='168' width='3.2' height='68' fill='url(%23spec)'/><rect x='44.5' y='172' width='11' height='16' rx='.6' fill='url(%23blk)'/><rect x='64.5' y='172' width='11' height='16' rx='.6' fill='url(%23blk)'/><rect x='44.5' y='172' width='11' height='1.2' fill='%23000000' opacity='.5'/><rect x='64.5' y='172' width='11' height='1.2' fill='%23000000' opacity='.5'/><rect x='43' y='168' width='34' height='2.6' fill='%23101520'/><rect x='43' y='170' width='34' height='.8' fill='%235b6577' opacity='.6'/><rect x='43' y='196' width='34' height='1.6' fill='%23101520'/><rect x='51.5' y='202' width='9' height='6' fill='%23eef1f5'/><rect x='51.5' y='202' width='9' height='1' fill='%23c8341f'/><rect x='51.5' y='203.8' width='9' height='1' fill='%23c8341f'/><rect x='51.5' y='205.6' width='9' height='1' fill='%23c8341f'/><rect x='51.5' y='202' width='3.6' height='3' fill='%231d2f6b'/><text x='60' y='222' font-family='Menlo,Consolas,monospace' font-size='9' font-weight='700' letter-spacing='1.6' fill='%23151a24' text-anchor='middle'>USA</text><rect x='43' y='196' width='7' height='40' fill='%23000000' opacity='.28'/><rect x='73.5' y='170' width='3.5' height='66' fill='%23000000' opacity='.2'/><rect x='75.4' y='170' width='1.3' height='66' fill='%23ffe0b0' opacity='.6'/><rect x='43' y='230' width='34' height='6' fill='%23000000' opacity='.24'/><rect x='46' y='108' width='28' height='52' fill='url(%23cyl)'/><rect x='46' y='108' width='28' height='52' fill='url(%23rim)'/><rect x='46' y='108' width='28' height='52' fill='url(%23cold)'/><g stroke='%23aab2c0' stroke-width='.3' opacity='.34'><path d='M50 108 L50 160 M54 108 L54 160 M58 108 L58 160 M62 108 L62 160 M66 108 L66 160 M70 108 L70 160'/></g><rect x='55' y='108' width='2.6' height='52' fill='url(%23spec)'/><rect x='46' y='108' width='28' height='2.6' fill='%23101520'/><rect x='46' y='110' width='28' height='.8' fill='%235b6577' opacity='.55'/><rect x='46' y='156' width='28' height='4' fill='%23101520'/><rect x='47.5' y='120' width='8' height='30' rx='.6' fill='url(%23blk)'/><rect x='64.5' y='120' width='8' height='30' rx='.6' fill='url(%23blk)'/><rect x='46' y='108' width='28' height='1.4' fill='%23000000' opacity='.28'/><rect x='72.3' y='110' width='1.2' height='48' fill='%23ffe0b0' opacity='.5'/><rect x='46' y='108' width='6' height='52' fill='%23000000' opacity='.2'/><path d='M46 160 L74 160 L77 168 L43 168 Z' fill='url(%23cyl)'/><path d='M46 160 L60 160 L51.5 168 L43 168 Z' fill='%23ffffff' opacity='.12'/><path d='M74 160 L77 168 L68.5 168 L60.6 160 Z' fill='%2333394a' opacity='.5'/><rect x='48.5' y='66' width='23' height='34' fill='url(%23cyl)'/><rect x='48.5' y='66' width='23' height='34' fill='url(%23rim)'/><rect x='48.5' y='66' width='23' height='34' fill='url(%23cold)'/><g stroke='%23aab2c0' stroke-width='.3' opacity='.36'><path d='M52 66 L52 100 M56 66 L56 100 M60 66 L60 100 M64 66 L64 100 M68 66 L68 100'/></g><rect x='56' y='66' width='2.2' height='34' fill='url(%23spec)'/><rect x='48.5' y='76' width='23' height='1.4' fill='%23101520'/><rect x='48.5' y='98' width='23' height='2.4' fill='%23101520'/><path d='M48.5 100 L71.5 100 L74 108 L46 108 Z' fill='url(%23cyl)'/><path d='M48.5 100 L60 100 L53 108 L46 108 Z' fill='%23ffffff' opacity='.12'/><path d='M71.5 100 L74 108 L67 108 L60.6 100 Z' fill='%2333394a' opacity='.5'/><path d='M55.5 36 L64.5 36 L61.5 52 L58.5 52 Z' fill='url(%23cyl)'/><path d='M55.5 36 L60 36 L59 52 L58.5 52 Z' fill='%23ffffff' opacity='.26'/><path d='M64.5 36 L61.5 52 L61.5 52 L63 40 Z' fill='%23383e4d' opacity='.5'/><path d='M58.5 52 L61.5 52 L71.5 66 L48.5 66 Z' fill='url(%23cyl)'/><path d='M58.5 52 L60 52 L54 66 L48.5 66 Z' fill='%23ffffff' opacity='.14'/><path d='M61.5 52 L71.5 66 L67 66 L60.6 52 Z' fill='%2333394a' opacity='.55'/><rect x='48.5' y='64' width='23' height='2.4' fill='%231c2230'/><rect x='48.5' y='64' width='23' height='.7' fill='%23bcdcf5' opacity='.4'/><rect x='59.3' y='3' width='1.4' height='12' fill='%23161b24'/><rect x='58.4' y='14' width='3.2' height='3' fill='%23262c3a'/><path d='M57.7 17 h4.6 l-.7 7 h-3.2 Z' fill='%23c7ccd6'/><path d='M57.7 17 h2.3 l-.35 7 h-1.6 Z' fill='%23eef1f6'/><rect x='58.4' y='16.4' width='3.2' height='1.1' fill='%23e63a1e'/><path d='M58 24 L57 36 M62 24 L63 36 M60 24 L60 36' stroke='%232a3140' stroke-width='.8'/><path d='M57.4 28 L62.6 28 M57.2 32 L62.8 32' stroke='%232a3140' stroke-width='.7'/><path d='M44 210 L36 226 L32.5 236 L44 232 Z' fill='url(%23fin)'/><path d='M76 210 L84 226 L87.5 236 L76 232 Z' fill='url(%23fin)'/><path d='M44 210 L44 232 L41 233 L44 212 Z' fill='%23c8341f' opacity='.9'/><path d='M76 210 L76 232 L79 233 L76 212 Z' fill='%23c8341f' opacity='.9'/><path d='M84 226 L87.5 236' stroke='%23ffd79a' stroke-width='1' opacity='.7' fill='none'/><path d='M36 226 L32.5 236' stroke='%239fc4e8' stroke-width='.8' opacity='.5' fill='none'/></svg>");
}
head::after {
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 310'><defs><linearGradient id='cyl' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='%234c5464'/><stop offset='.08' stop-color='%23838d9d'/><stop offset='.2' stop-color='%23d3d9e2'/><stop offset='.33' stop-color='%23f2f4f8'/><stop offset='.44' stop-color='%23ffffff'/><stop offset='.5' stop-color='%23fbfcfe'/><stop offset='.62' stop-color='%23dde2ea'/><stop offset='.78' stop-color='%23aab2c0'/><stop offset='.9' stop-color='%237c8494'/><stop offset='1' stop-color='%23545c6b'/></linearGradient><linearGradient id='spec' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='%23ffffff' stop-opacity='0'/><stop offset='.4' stop-color='%23ffffff' stop-opacity='0'/><stop offset='.47' stop-color='%23ffffff' stop-opacity='.95'/><stop offset='.53' stop-color='%23ffffff' stop-opacity='0'/><stop offset='1' stop-color='%23ffffff' stop-opacity='0'/></linearGradient><linearGradient id='rim' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='%23ffdca0' stop-opacity='0'/><stop offset='.88' stop-color='%23ffdca0' stop-opacity='0'/><stop offset='1' stop-color='%23ffe6b8' stop-opacity='.8'/></linearGradient><linearGradient id='cold' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='%239fc4e8' stop-opacity='.5'/><stop offset='.28' stop-color='%239fc4e8' stop-opacity='0'/></linearGradient><linearGradient id='blk' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='%2305070d'/><stop offset='.45' stop-color='%231e2331'/><stop offset='.55' stop-color='%232b3141'/><stop offset='1' stop-color='%23080b12'/></linearGradient><linearGradient id='fin' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%23545c6b'/><stop offset='.45' stop-color='%232f3542'/><stop offset='1' stop-color='%23161a24'/></linearGradient><linearGradient id='bell' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%232c313d'/><stop offset='.4' stop-color='%23474e5d'/><stop offset='.7' stop-color='%236b5636'/><stop offset='.9' stop-color='%23c98a3e'/><stop offset='1' stop-color='%23ffd27a'/></linearGradient><radialGradient id='fglow' cx='.5' cy='.34' r='.6'><stop offset='0' stop-color='%23ffe08a' stop-opacity='.68'/><stop offset='.45' stop-color='%23ff9a34' stop-opacity='.32'/><stop offset='1' stop-color='%23ff7a1e' stop-opacity='0'/></radialGradient><radialGradient id='thr' cx='.5' cy='.2' r='.85'><stop offset='0' stop-color='%23ffffff'/><stop offset='.28' stop-color='%23fff2c4'/><stop offset='.6' stop-color='%23ffc94e'/><stop offset='1' stop-color='%23ff8a24'/></radialGradient></defs><ellipse cx='60' cy='272' rx='39' ry='54' fill='url(%23fglow)'/><path d='M52 258 C40 296 51 334 60 350 C69 334 80 296 68 258 Z' fill='%23ff8420' opacity='.34'/><path d='M53 258 C45 288 51 318 60 336 C69 318 75 288 67 258 Z' fill='%23ff7a1a' opacity='.82'/><path d='M54.6 258 C49 282 53 306 60 322 C67 306 71 282 65.4 258 Z' fill='%23ffab34'/><path d='M56.4 258 C53 278 56 297 60 310 C64 297 67 278 63.6 258 Z' fill='%23ffd35a'/><path d='M58 258 C56 274 58 291 60 302 C62 291 64 274 62 258 Z' fill='url(%23thr)'/><ellipse cx='60' cy='270' rx='2.6' ry='3.8' fill='%23ffffff'/><ellipse cx='60' cy='283' rx='2.2' ry='3' fill='%23fff6d8' opacity='.92'/><ellipse cx='60' cy='295' rx='1.7' ry='2.4' fill='%23fff0c4' opacity='.72'/><ellipse cx='60' cy='306' rx='1.2' ry='1.9' fill='%23ffe6a4' opacity='.5'/><rect x='45' y='236' width='30' height='3.5' fill='%23252a35'/><rect x='45' y='236' width='30' height='1' fill='%236a7386' opacity='.8'/><rect x='45' y='238.5' width='30' height='1' fill='%23000000' opacity='.4'/><path d='M45 239.5 L75 239.5 L72 246 L48 246 Z' fill='%23161a22'/><path d='M45 239.5 L48 246' stroke='%237e879a' stroke-width='.5' opacity='.4'/><path d='M46 246 L51.5 246 L49.5 258 L43.5 257.5 Z' fill='url(%23bell)'/><path d='M68.5 246 L74 246 L76.5 257.5 L70.5 258 Z' fill='url(%23bell)'/><path d='M52.5 246 L58 246 L57 259 L50 258.5 Z' fill='url(%23bell)'/><path d='M62 246 L67.5 246 L70 258.5 L63 259 Z' fill='url(%23bell)'/><path d='M57.6 246 L62.4 246 L63.2 260 L56.8 260 Z' fill='url(%23bell)'/><g stroke='%23202631' stroke-width='.5' opacity='.55'><path d='M47 250 L50.6 250 M46.4 254 L50.1 254 M63.4 250 L67 250 M63.2 254 L67.2 254 M54 250 L57.6 250 M53.6 255 L57.3 255 M63 250 L66.7 250 M62.8 255 L66.6 255 M58 250 L62 250 M57.6 255 L62.4 255'/></g><path d='M43.5 257.5 L49.5 258 M50 258.5 L57 259 M56.8 260 L63.2 260 M63 259 L70 258.5 M70.5 258 L76.5 257.5' stroke='%23ffe4a0' stroke-width='1.6' opacity='1'/><rect x='43' y='168' width='34' height='68' fill='url(%23cyl)'/><rect x='43' y='168' width='34' height='68' fill='url(%23rim)'/><rect x='43' y='168' width='34' height='68' fill='url(%23cold)'/><g stroke='%23aab2c0' stroke-width='.3' opacity='.32'><path d='M47 168 L47 236 M51 168 L51 236 M55 168 L55 236 M59 168 L59 236 M63 168 L63 236 M67 168 L67 236 M71 168 L71 236 M75 168 L75 236'/></g><rect x='53' y='168' width='3.2' height='68' fill='url(%23spec)'/><rect x='44.5' y='172' width='11' height='16' rx='.6' fill='url(%23blk)'/><rect x='64.5' y='172' width='11' height='16' rx='.6' fill='url(%23blk)'/><rect x='44.5' y='172' width='11' height='1.2' fill='%23000000' opacity='.5'/><rect x='64.5' y='172' width='11' height='1.2' fill='%23000000' opacity='.5'/><rect x='43' y='168' width='34' height='2.6' fill='%23101520'/><rect x='43' y='170' width='34' height='.8' fill='%235b6577' opacity='.6'/><rect x='43' y='196' width='34' height='1.6' fill='%23101520'/><rect x='51.5' y='202' width='9' height='6' fill='%23eef1f5'/><rect x='51.5' y='202' width='9' height='1' fill='%23c8341f'/><rect x='51.5' y='203.8' width='9' height='1' fill='%23c8341f'/><rect x='51.5' y='205.6' width='9' height='1' fill='%23c8341f'/><rect x='51.5' y='202' width='3.6' height='3' fill='%231d2f6b'/><text x='60' y='222' font-family='Menlo,Consolas,monospace' font-size='9' font-weight='700' letter-spacing='1.6' fill='%23151a24' text-anchor='middle'>USA</text><rect x='43' y='196' width='7' height='40' fill='%23000000' opacity='.28'/><rect x='73.5' y='170' width='3.5' height='66' fill='%23000000' opacity='.2'/><rect x='75.4' y='170' width='1.3' height='66' fill='%23ffe0b0' opacity='.6'/><rect x='43' y='230' width='34' height='6' fill='%23000000' opacity='.24'/><rect x='46' y='108' width='28' height='52' fill='url(%23cyl)'/><rect x='46' y='108' width='28' height='52' fill='url(%23rim)'/><rect x='46' y='108' width='28' height='52' fill='url(%23cold)'/><g stroke='%23aab2c0' stroke-width='.3' opacity='.34'><path d='M50 108 L50 160 M54 108 L54 160 M58 108 L58 160 M62 108 L62 160 M66 108 L66 160 M70 108 L70 160'/></g><rect x='55' y='108' width='2.6' height='52' fill='url(%23spec)'/><rect x='46' y='108' width='28' height='2.6' fill='%23101520'/><rect x='46' y='110' width='28' height='.8' fill='%235b6577' opacity='.55'/><rect x='46' y='156' width='28' height='4' fill='%23101520'/><rect x='47.5' y='120' width='8' height='30' rx='.6' fill='url(%23blk)'/><rect x='64.5' y='120' width='8' height='30' rx='.6' fill='url(%23blk)'/><rect x='46' y='108' width='28' height='1.4' fill='%23000000' opacity='.28'/><rect x='72.3' y='110' width='1.2' height='48' fill='%23ffe0b0' opacity='.5'/><rect x='46' y='108' width='6' height='52' fill='%23000000' opacity='.2'/><path d='M46 160 L74 160 L77 168 L43 168 Z' fill='url(%23cyl)'/><path d='M46 160 L60 160 L51.5 168 L43 168 Z' fill='%23ffffff' opacity='.12'/><path d='M74 160 L77 168 L68.5 168 L60.6 160 Z' fill='%2333394a' opacity='.5'/><rect x='48.5' y='66' width='23' height='34' fill='url(%23cyl)'/><rect x='48.5' y='66' width='23' height='34' fill='url(%23rim)'/><rect x='48.5' y='66' width='23' height='34' fill='url(%23cold)'/><g stroke='%23aab2c0' stroke-width='.3' opacity='.36'><path d='M52 66 L52 100 M56 66 L56 100 M60 66 L60 100 M64 66 L64 100 M68 66 L68 100'/></g><rect x='56' y='66' width='2.2' height='34' fill='url(%23spec)'/><rect x='48.5' y='76' width='23' height='1.4' fill='%23101520'/><rect x='48.5' y='98' width='23' height='2.4' fill='%23101520'/><path d='M48.5 100 L71.5 100 L74 108 L46 108 Z' fill='url(%23cyl)'/><path d='M48.5 100 L60 100 L53 108 L46 108 Z' fill='%23ffffff' opacity='.12'/><path d='M71.5 100 L74 108 L67 108 L60.6 100 Z' fill='%2333394a' opacity='.5'/><path d='M55.5 36 L64.5 36 L61.5 52 L58.5 52 Z' fill='url(%23cyl)'/><path d='M55.5 36 L60 36 L59 52 L58.5 52 Z' fill='%23ffffff' opacity='.26'/><path d='M64.5 36 L61.5 52 L61.5 52 L63 40 Z' fill='%23383e4d' opacity='.5'/><path d='M58.5 52 L61.5 52 L71.5 66 L48.5 66 Z' fill='url(%23cyl)'/><path d='M58.5 52 L60 52 L54 66 L48.5 66 Z' fill='%23ffffff' opacity='.14'/><path d='M61.5 52 L71.5 66 L67 66 L60.6 52 Z' fill='%2333394a' opacity='.55'/><rect x='48.5' y='64' width='23' height='2.4' fill='%231c2230'/><rect x='48.5' y='64' width='23' height='.7' fill='%23bcdcf5' opacity='.4'/><rect x='59.3' y='3' width='1.4' height='12' fill='%23161b24'/><rect x='58.4' y='14' width='3.2' height='3' fill='%23262c3a'/><path d='M57.7 17 h4.6 l-.7 7 h-3.2 Z' fill='%23c7ccd6'/><path d='M57.7 17 h2.3 l-.35 7 h-1.6 Z' fill='%23eef1f6'/><rect x='58.4' y='16.4' width='3.2' height='1.1' fill='%23e63a1e'/><path d='M58 24 L57 36 M62 24 L63 36 M60 24 L60 36' stroke='%232a3140' stroke-width='.8'/><path d='M57.4 28 L62.6 28 M57.2 32 L62.8 32' stroke='%232a3140' stroke-width='.7'/><path d='M44 210 L36 226 L32.5 236 L44 232 Z' fill='url(%23fin)'/><path d='M76 210 L84 226 L87.5 236 L76 232 Z' fill='url(%23fin)'/><path d='M44 210 L44 232 L41 233 L44 212 Z' fill='%23c8341f' opacity='.9'/><path d='M76 210 L76 232 L79 233 L76 212 Z' fill='%23c8341f' opacity='.9'/><path d='M84 226 L87.5 236' stroke='%23ffd79a' stroke-width='1' opacity='.7' fill='none'/><path d='M36 226 L32.5 236' stroke='%239fc4e8' stroke-width='.8' opacity='.5' fill='none'/></svg>");
  animation-name: rocket-climb, rocket-flame-b;
}

/* ---- sparse stars RIDE THE ROLL (fine pattern moves with the tracked
   glyphs = zero relative slide, zero flicker). Static, painted once. ---- */
.credits-roll::before,
.credits-slideshow::before {
  content: "";
  display: var(--rocket-scenery, block);
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.6;
  background-image:
    radial-gradient(circle at 22% 33%, rgba(244, 244, 242, 0.9) 0 1px, rgba(244, 244, 242, 0) 1.8px),
    radial-gradient(circle at 78% 12%, rgba(199, 214, 246, 0.8) 0 1.2px, rgba(199, 214, 246, 0) 2px),
    radial-gradient(circle at 55% 65%, rgba(244, 244, 242, 0.7) 0 1px, rgba(244, 244, 242, 0) 1.7px),
    radial-gradient(circle at 8% 79%, rgba(255, 214, 140, 0.8) 0 1.1px, rgba(255, 214, 140, 0) 1.9px),
    radial-gradient(circle at 92% 48%, rgba(244, 244, 242, 0.65) 0 0.9px, rgba(244, 244, 242, 0) 1.6px);
  background-size: 340px 340px, 420px 420px, 300px 300px, 380px 380px, 460px 460px;
}

/* ---- section titles: mission phases. Amber mono eyebrow counts the
   stages; Michroma panel type below; red block over a silver hairline
   replaces the base gold bar. ---- */
.credits-block__title {
  font-weight: 400; /* Michroma ships one weight — never faux-bold */
  letter-spacing: 0.26em;
  padding-left: 0.26em; /* recenter the trailing tracking space */
  /* brushed-titanium fill, matching the flourish display type so the whole
     type system reads as machined hull metal, not flat paper */
  color: var(--rocket-paper);
  background: linear-gradient(180deg, #ffffff 0%, #eef2f7 32%, #cdd4e0 56%, #f0f3f8 80%, #b6bece 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 22px rgba(120, 170, 255, 0.18), var(--credits-shadow);
  margin: 0 0 1.4rem;
}
.credits-block__title::before {
  content: "STAGE " counter(rocket-stage, decimal-leading-zero) " / GO";
  display: block;
  font-family: var(--credits-font);
  font-weight: 600;
  font-size: 0.72rem;
  letter-spacing: 0.5em;
  padding-left: 0.5em;
  margin-bottom: 0.85rem;
  /* reset the titanium clip inherited from the h2 so the amber eyebrow shows */
  background: none;
  color: var(--rocket-amber);
  -webkit-text-fill-color: var(--rocket-amber);
  text-shadow: 0 0 10px rgba(255, 176, 0, 0.35);
}
.credits-block__title::after {
  width: min(220px, 52vw);
  height: 5px;
  margin: 0.9rem auto 0;
  opacity: 1;
  /* the rule is a coloured graphic — do NOT clip its background to (absent)
     text; reset the inherited background-clip so the red bar renders */
  -webkit-background-clip: border-box;
  background-clip: border-box;
  background:
    linear-gradient(#fc3d21, #fc3d21) center / 56px 5px no-repeat,
    linear-gradient(90deg, rgba(199, 204, 214, 0) 0%, rgba(199, 204, 214, 0.55) 18% 82%, rgba(199, 204, 214, 0) 100%) center / 100% 1px no-repeat;
}

/* ---- rows: flight-roster mono. Names are sacred — wrap, never clip;
   amounts read as instrument values. ---- */
.credit {
  max-width: min(46rem, 92vw);
  margin-inline: auto;
  min-width: 0;
  overflow-wrap: anywhere;
  font-weight: 500;
  letter-spacing: 0.02em;
  line-height: 1.55;
}
.credit__name {
  color: var(--rocket-paper);
  text-shadow: 0 1px 8px rgba(2, 4, 10, 0.9);
}
.credit__amount {
  opacity: 1;
  font-size: 0.78em;
  letter-spacing: 0.18em;
  font-variant-numeric: tabular-nums;
  color: var(--rocket-amber);
  text-shadow: 0 0 10px rgba(255, 176, 0, 0.3);
}
.credit__amount::before { content: " / "; color: #8b95a6; }

/* ---- flourish cards ---- */
.flourish__title {
  font-weight: 400;
  letter-spacing: 0.12em;
  padding-left: 0.12em;
  line-height: 1.2;
  /* brushed-titanium display type: a cool top-lit gradient fill through the
     glyphs (spacecraft-hull metal, not flat paper), with an embossed
     highlight/shadow pair + the launch-blue halo */
  color: var(--rocket-paper);
  background: linear-gradient(180deg, #ffffff 0%, #eef2f7 30%, #cdd4e0 55%, #f4f6fa 78%, #b9c1d0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 34px rgba(120, 170, 255, 0.22), var(--credits-shadow);
  filter: drop-shadow(0 1px 0 rgba(255, 255, 255, 0.35)) drop-shadow(0 -1px 0 rgba(10, 16, 34, 0.6));
}

/* intro: countdown readout above the badge, calibration stripe below the
   rating — both static, riding the roll */
.flourish--intro { gap: 1.15rem; }
.flourish--intro::before {
  content: "T-MINUS 00:00:10";
  display: var(--rocket-scenery, block);
  order: -1;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 1.15rem;
  letter-spacing: 0.34em;
  padding: 0.65rem 0.9rem 0.65rem 1.24rem;
  color: var(--rocket-amber);
  border: 1px solid rgba(255, 176, 0, 0.45);
  border-radius: 2px;
  background: rgba(6, 10, 20, 0.6);
  text-shadow: 0 0 14px rgba(255, 176, 0, 0.45);
}
.flourish--intro::after {
  content: "";
  display: var(--rocket-scenery, block);
  width: min(288px, 62vw);
  height: 8px;
  border-radius: 2px;
  background: repeating-linear-gradient(90deg, #fc3d21 0 16px, #f4f4f2 16px 32px);
  opacity: 0.85;
}

/* badge -> mission control tag (copy swap via font-size:0 + ::after) */
.flourish__badge {
  font-size: 0;
  padding: 0.6rem 1.15rem;
  border: 1px solid rgba(252, 61, 33, 0.65);
  border-radius: 2px;
  background: rgba(252, 61, 33, 0.1);
  box-shadow: 0 0 20px rgba(252, 61, 33, 0.18);
}
.flourish__badge::after {
  content: "MISSION CONTROL — APOLLO ERA";
  font-family: var(--credits-font);
  font-weight: 600;
  font-size: 0.78rem;
  letter-spacing: 0.34em;
  padding-left: 0.34em;
  color: #ff8a70;
}

/* tagline is streamer copy: restyle only */
.flourish__tagline {
  font-style: normal;
  text-transform: uppercase;
  letter-spacing: 0.28em;
  padding-left: 0.28em;
  font-size: 0.92rem;
  color: var(--rocket-silver);
  opacity: 0.92;
}

/* rating -> systems check chip (copy swap) */
.flourish__rating {
  font-size: 0;
  border: 1px solid rgba(255, 176, 0, 0.5);
  border-radius: 2px;
  opacity: 1;
}
.flourish__rating::after {
  content: "ALL SYSTEMS NOMINAL";
  font-family: var(--credits-font);
  font-weight: 600;
  font-size: 0.72rem;
  letter-spacing: 0.3em;
  padding-left: 0.3em;
  color: var(--rocket-amber);
  text-shadow: 0 0 10px rgba(255, 176, 0, 0.4);
}

/* outro: the capsule comes home — three chutes + command module (static
   SVG prop), title swaps to SPLASHDOWN */
.flourish--outro { gap: 1.1rem; }
.flourish--outro::before {
  content: "";
  display: var(--rocket-scenery, block);
  order: -1;
  width: 132px;
  height: 128px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 116'%3E%3Cdefs%3E%3ClinearGradient id='cm' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%235a6274'/%3E%3Cstop offset='.4' stop-color='%23e2e6ec'/%3E%3Cstop offset='.6' stop-color='%23ffffff'/%3E%3Cstop offset='.8' stop-color='%23cbd2dc'/%3E%3Cstop offset='1' stop-color='%237c8698'/%3E%3C/linearGradient%3E%3ClinearGradient id='hs' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23b57a3a'/%3E%3Cstop offset='1' stop-color='%235e3a17'/%3E%3C/linearGradient%3E%3CradialGradient id='cglow' cx='.5' cy='.42' r='.55'%3E%3Cstop offset='0' stop-color='%23ffcf6a' stop-opacity='.22'/%3E%3Cstop offset='.6' stop-color='%23ffb000' stop-opacity='.08'/%3E%3Cstop offset='1' stop-color='%23ffb000' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='60' cy='52' rx='56' ry='50' fill='url(%23cglow)'/%3E%3Cpath d='M28 44 L56 74 M60 30 L58 72 M92 44 L64 74 M20 46 L55 76 M100 46 L65 76' stroke='%23aeb6c4' stroke-width='.6' opacity='.75' fill='none'/%3E%3Cpath d='M38 31 A22 15 0 0 1 82 31 Q60 35 38 31 Z' fill='%23f4f4f2'/%3E%3Cpath d='M44.2 22.0 A15.8 10.8 0 0 1 75.8 22.0 L74.5 27.7 Q60 29.5 45.5 27.7 Z' fill='%23fc7b21'/%3E%3Cpath d='M49.0 21.2 Q56.7 16.8 63.3 19.0' stroke='%23ffffff' stroke-width='1.4' opacity='.7' fill='none' stroke-linecap='round'/%3E%3Cpath d='M60.0 17.0 Q51.3 23.5 45.5 30.0' stroke='%23c9d0dc' stroke-width='.5' opacity='.55' fill='none'/%3E%3Cpath d='M60.0 17.0 Q55.6 23.5 52.7 30.0' stroke='%23c9d0dc' stroke-width='.5' opacity='.55' fill='none'/%3E%3Cpath d='M60.0 17.0 Q60.0 23.5 60.0 30.0' stroke='%23c9d0dc' stroke-width='.5' opacity='.55' fill='none'/%3E%3Cpath d='M60.0 17.0 Q64.4 23.5 67.3 30.0' stroke='%23c9d0dc' stroke-width='.5' opacity='.55' fill='none'/%3E%3Cpath d='M60.0 17.0 Q68.7 23.5 74.5 30.0' stroke='%23c9d0dc' stroke-width='.5' opacity='.55' fill='none'/%3E%3Cpath d='M60 31 A22 15 0 0 1 82 31 L77.6 31 Q68.8 33.0 60 31 Z' fill='%23000000' opacity='.08'/%3E%3Cpath d='M11 40 A15 10 0 0 1 41 40 Q26 44 11 40 Z' fill='%23f4f4f2'/%3E%3Cpath d='M15.2 34.0 A10.8 7.2 0 0 1 36.8 34.0 L35.9 37.8 Q26 39.0 16.1 37.8 Z' fill='%23fc7b21'/%3E%3Cpath d='M18.5 33.5 Q23.8 30.5 28.2 32.0' stroke='%23ffffff' stroke-width='1.4' opacity='.7' fill='none' stroke-linecap='round'/%3E%3Cpath d='M26.0 31.0 Q20.1 35.0 16.1 39.0' stroke='%23c9d0dc' stroke-width='.5' opacity='.55' fill='none'/%3E%3Cpath d='M26.0 31.0 Q23.0 35.0 21.1 39.0' stroke='%23c9d0dc' stroke-width='.5' opacity='.55' fill='none'/%3E%3Cpath d='M26.0 31.0 Q26.0 35.0 26.0 39.0' stroke='%23c9d0dc' stroke-width='.5' opacity='.55' fill='none'/%3E%3Cpath d='M26.0 31.0 Q29.0 35.0 30.9 39.0' stroke='%23c9d0dc' stroke-width='.5' opacity='.55' fill='none'/%3E%3Cpath d='M26.0 31.0 Q31.9 35.0 35.9 39.0' stroke='%23c9d0dc' stroke-width='.5' opacity='.55' fill='none'/%3E%3Cpath d='M26 40 A15 10 0 0 1 41 40 L38.0 40 Q32.0 42.0 26 40 Z' fill='%23000000' opacity='.08'/%3E%3Cpath d='M79 40 A15 10 0 0 1 109 40 Q94 44 79 40 Z' fill='%23f4f4f2'/%3E%3Cpath d='M83.2 34.0 A10.8 7.2 0 0 1 104.8 34.0 L103.9 37.8 Q94 39.0 84.1 37.8 Z' fill='%23fc7b21'/%3E%3Cpath d='M86.5 33.5 Q91.8 30.5 96.2 32.0' stroke='%23ffffff' stroke-width='1.4' opacity='.7' fill='none' stroke-linecap='round'/%3E%3Cpath d='M94.0 31.0 Q88.1 35.0 84.1 39.0' stroke='%23c9d0dc' stroke-width='.5' opacity='.55' fill='none'/%3E%3Cpath d='M94.0 31.0 Q91.0 35.0 89.0 39.0' stroke='%23c9d0dc' stroke-width='.5' opacity='.55' fill='none'/%3E%3Cpath d='M94.0 31.0 Q94.0 35.0 94.0 39.0' stroke='%23c9d0dc' stroke-width='.5' opacity='.55' fill='none'/%3E%3Cpath d='M94.0 31.0 Q97.0 35.0 99.0 39.0' stroke='%23c9d0dc' stroke-width='.5' opacity='.55' fill='none'/%3E%3Cpath d='M94.0 31.0 Q99.9 35.0 103.9 39.0' stroke='%23c9d0dc' stroke-width='.5' opacity='.55' fill='none'/%3E%3Cpath d='M94 40 A15 10 0 0 1 109 40 L106.0 40 Q100.0 42.0 94 40 Z' fill='%23000000' opacity='.08'/%3E%3Cpolygon points='55 71 65 71 71 90 49 90' fill='url(%23cm)'/%3E%3Cpolygon points='55 71 58.5 71 54 90 51 90' fill='%23ffffff' opacity='.4'/%3E%3Cpolygon points='63 71 65 71 71 90 67.5 90' fill='%23303845' opacity='.45'/%3E%3Cpath d='M55 71 L49 90' stroke='%23dbeaff' stroke-width='.8' opacity='.6'/%3E%3Cpath d='M65 71 L71 90' stroke='%23ffd9a8' stroke-width='.8' opacity='.55'/%3E%3Ccircle cx='57.5' cy='80' r='1.4' fill='%230b1026'/%3E%3Ccircle cx='57' cy='79.5' r='.5' fill='%239fd0f0'/%3E%3Cpath d='M49 90 L71 90 Q60 96 49 90 Z' fill='url(%23hs)'/%3E%3Cpath d='M49 90 L71 90' stroke='%23e0a45a' stroke-width='.7' opacity='.6'/%3E%3Cellipse cx='60' cy='103' rx='27' ry='4' fill='none' stroke='%234a7fb0' stroke-width='1' opacity='.4'/%3E%3Cellipse cx='60' cy='103.5' rx='17' ry='2.6' fill='%232c5a8c' opacity='.5'/%3E%3Cellipse cx='60' cy='103' rx='9' ry='1.6' fill='%236fa8d8' opacity='.55'/%3E%3Cellipse cx='60' cy='102' rx='3' ry='1' fill='%23cfe6f7' opacity='.7'/%3E%3C/svg%3E") center / contain no-repeat;
}
.flourish--outro .flourish__title { font-size: 0; }
.flourish--outro .flourish__title::after {
  content: "SPLASHDOWN";
  font-family: var(--credits-title-font);
  font-weight: 400;
  font-size: var(--credits-flourish-title-size);
  letter-spacing: 0.14em;
  padding-left: 0.14em;
  color: var(--rocket-paper);
  background: linear-gradient(180deg, #ffffff 0%, #eef2f7 30%, #cdd4e0 55%, #f4f6fa 78%, #b9c1d0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 34px rgba(120, 170, 255, 0.22), var(--credits-shadow);
  filter: drop-shadow(0 1px 0 rgba(255, 255, 255, 0.35)) drop-shadow(0 -1px 0 rgba(10, 16, 34, 0.6));
}
.flourish--outro .flourish__tagline { font-size: 0; }
.flourish--outro .flourish__tagline::after {
  content: "crew recovered safely — see you next launch";
  font-size: 0.92rem;
  letter-spacing: 0.26em;
  padding-left: 0.26em;
  text-transform: lowercase;
  color: var(--rocket-silver);
}

/* ---- raid finale: DOCKING CONFIRMED. Amber alert treatment — the
   eyebrow swaps copy and pulses on steps(1) (~1.3 paints/s, the only
   animation inside the roll); the rule becomes a caution stripe. ---- */
.credits-block:nth-last-of-type(2) .credits-block__title,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
  /* the docking alert is amber, not metal — drop the titanium clip so the
     amber fill shows through */
  background: none;
  color: var(--rocket-amber);
  -webkit-text-fill-color: var(--rocket-amber);
  text-shadow: 0 0 26px rgba(255, 176, 0, 0.35), var(--credits-shadow);
}
.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  content: "DOCKING CONFIRMED — WELCOME ABOARD";
  color: var(--rocket-amber);
  text-shadow: 0 0 12px rgba(255, 176, 0, 0.55);
  animation: rocket-dock 2.4s steps(1, end) infinite;
}
.credits-block:nth-last-of-type(2) .credits-block__title::after,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::after {
  background:
    repeating-linear-gradient(135deg, #ffb000 0 8px, #2c2206 8px 16px) center / 88px 5px no-repeat,
    linear-gradient(90deg, rgba(255, 176, 0, 0) 0%, rgba(255, 176, 0, 0.5) 18% 82%, rgba(255, 176, 0, 0) 100%) center / 100% 1px no-repeat;
}
.credits-block:nth-last-of-type(2) .credit,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit {
  font-size: calc(var(--credits-name-size) * 1.08);
}
.credits-block:nth-last-of-type(2) .credit__name,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__name {
  text-shadow: 0 0 16px rgba(255, 176, 0, 0.3), var(--credits-shadow);
}

/* ---- slideshow: panels light up — a short lift on the base fade ---- */
.credits-slide {
  transform: translateY(14px) scale(0.99);
  transition: opacity 0.7s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
.credits-slide.is-active { transform: none; }

/* ---- keyframes (all rocket- prefixed; transform/opacity ONLY) ---- */
/* one launch every 26s: slow off the pad, accelerating hard (per-segment
   cubic-bezier), drifting 2.5vw downrange with a 5.5deg gravity lean;
   46%..100% parks it above the viewport (~14s off screen) */
@keyframes rocket-climb {
  0% {
    transform: translate3d(0, 0, 0) rotate(0deg);
    animation-timing-function: cubic-bezier(0.55, 0.04, 0.7, 0.4);
  }
  46% { transform: translate3d(2.5vw, calc(-100vh - 330px), 0) rotate(5.5deg); }
  100% { transform: translate3d(2.5vw, calc(-100vh - 330px), 0) rotate(5.5deg); }
}
/* F-1 plume flicker: pose A first half, pose B second half (~1.85Hz swap
   on two promoted layers — composite-only) */
@keyframes rocket-flame-a {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
@keyframes rocket-flame-b {
  0%, 49% { opacity: 0; }
  50%, 100% { opacity: 1; }
}
/* telemetry cursor: terminal blink, ~0.9 paints/s */
@keyframes rocket-cursor {
  0%, 54% { opacity: 1; }
  55%, 100% { opacity: 0; }
}
/* docking alert: two discrete dips per 2.4s cycle (~1.3 paints/s) */
@keyframes rocket-dock {
  0%, 55% { opacity: 1; }
  60%, 74% { opacity: 0.45; }
  78%, 100% { opacity: 1; }
}
/* gantry beacon: ember most of the cycle, one bright flash (~0.6 paints/s) */
@keyframes rocket-beacon {
  0%, 72% { opacity: 0.15; }
  74%, 86% { opacity: 1; }
  88%, 100% { opacity: 0.15; }
}
/* CSM window glint: dark ride, then a double sparkle (~0.55 paints/s) */
@keyframes rocket-glint {
  0%, 85% { opacity: 0; }
  86%, 89% { opacity: 0.95; }
  90%, 92% { opacity: 0.25; }
  93%, 95% { opacity: 0.8; }
  96%, 100% { opacity: 0; }
}

/* ---- reduced motion: the stack holds attitude — rocket parks mid-climb
   on the left (pose A, engine steady), cursor holds lit, no pulses ---- */
@media (prefers-reduced-motion: reduce) {
  head::before,
  head::after {
    animation: none;
    transform: translate3d(0, -52vh, 0) rotate(0deg);
  }
  head::after { opacity: 0; }
  html::after { animation: none; opacity: 1; }
  head link::before { animation: none; opacity: 0.9; }
  head meta:last-of-type::after { animation: none; opacity: 0; }
  .credits-block:nth-last-of-type(2) .credits-block__title::before,
  .credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
    animation: none;
  }
  .credits-slide { transform: none; transition: opacity 0.8s ease; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--rocket-scenery:none;}",
};
