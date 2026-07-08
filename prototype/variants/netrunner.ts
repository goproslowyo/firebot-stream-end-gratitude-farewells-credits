import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. Netrunner — Cyber HUD: you're jacked into the city grid at 03:12, reading the gratitude ledger through an AR visor — glass panels, corner brackets, teal/magenta duotone, a courier drone holding position off your left shoulder. */
export const VARIANT: ThemeVariant = {
  key: "netrunner",
  name: "Netrunner — Cyber HUD",
  css: `
/* ================================================================
   NETRUNNER — CYBER HUD, layered after the base theme.
   Fiction: 03:12, rooftop uplink. You are INSIDE the visor: the
   stream-end gratitude ledger renders as an AR overlay hanging over
   a near-black teal megacity. Every section is a NODE HANDSHAKE on
   a glass panel; amounts arrive as monospace data chips; the raid
   block trips the intrusion alarm; then you jack out clean.
   Duotone law: teal #2de2e6 = system, magenta #ff3864 = alert/ads.
   Layer map (all scenery kill-switched via --netrunner-scenery):
     html bg (--credits-bg)   near-black teal night + city glow (cheap)
     html::before             LIGHT STORY — visor corner brackets, city
                              bloom, magenta mega-ad haze upper-right,
                              coarse static scan diagonals, vignette.
                              STATIC, promoted
     html::after              THE CITY — skyline SVG band: far haze row,
                              near ink row, lit windows on the side
                              towers only, two holo billboards, beacon
                              masts. STATIC, promoted
     body::before             visor scan band — one wide soft diagonal
                              sheet, steps(1) hop every 3s (big layer,
                              never continuous)
     body::after              center-lane readability scrim. STATIC
     head::before             THE DRONE — courier quad hull, upper-left
                              (continuous mover, will-change #1)
     head::after              drone beacon/sensor overlay — same bob
                              keyframe (welded), steps() blink
                              (will-change #2; budget cap respected)
     meta#1::before           telemetry rail — altitude ticks hugging
                              the LEFT EDGE (fine pattern at edge =
                              L6-legal). STATIC, promoted
     meta#1::after            compass roundel upper-right — rings,
                              ticks, blips. STATIC, promoted
     meta#2::before           roundel sweep wedge — steps(1) rotation,
                              one posture per 2s
     meta#2::after            bottom-right grid readout + TRACE bar.
                              STATIC, promoted
     link#1::after            THE FLYBY — AV light-trail streaking the
                              upper sky right-to-left every 27s, nine
                              steps(1) teleport hops (story beat)
     .credits-roll::before    HUD micro-dot mesh (fine pattern RIDES
     .credits-slideshow::before  THE ROLL / static per L6)
   ================================================================ */
@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&display=swap');

:root {
  /* ── palette: system teal / alert magenta / ice text ── */
  --netrunner-scenery: block; /* set to none to strip every scenery layer */
  --netrunner-teal: #2de2e6;
  --netrunner-teal-hi: #9ff3f5;   /* specular / rim */
  --netrunner-teal-dim: rgba(45, 226, 230, 0.35);
  --netrunner-magenta: #ff3864;
  --netrunner-magenta-hi: #ff8fa8;
  --netrunner-ice: #eafcff;
  --netrunner-mono: "Share Tech Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace;

  /* ── base hooks ── */
  /* Cheap night grade (L3 — texture stacks live on the promoted fixed
     pseudos below). Three teal blooms rise from the floor at staggered
     x so the horizon reads as a lit skyline, not one hotspot; a faint
     magenta counter-bloom leans in from upper-right (the off-screen
     mega-ad); an 8-stop near-black vertical carries the temperature
     from deep-space ink at the ceiling down to lit teal haze at the floor. */
  --credits-bg:
    radial-gradient(ellipse 46% 26% at 24% 103%, rgba(45, 226, 230, 0.15) 0%, rgba(45, 226, 230, 0.04) 52%, rgba(45, 226, 230, 0) 76%),
    radial-gradient(ellipse 40% 30% at 78% 104%, rgba(80, 246, 250, 0.13) 0%, rgba(45, 226, 230, 0.03) 54%, rgba(45, 226, 230, 0) 78%),
    radial-gradient(ellipse 90% 40% at 50% 106%, rgba(45, 226, 230, 0.10) 0%, rgba(45, 226, 230, 0.02) 58%, rgba(45, 226, 230, 0) 80%),
    radial-gradient(ellipse 50% 40% at 96% -8%, rgba(255, 56, 100, 0.10) 0%, rgba(255, 56, 100, 0.02) 52%, rgba(255, 56, 100, 0) 74%),
    linear-gradient(178deg, #01060a 0%, #010a10 18%, #020e16 36%, #04141d 54%, #061a25 70%, #082630 84%, #0b3742 94%, #0f4753 100%);
  --credits-color: var(--netrunner-ice);
  --credits-accent: var(--netrunner-teal);
  --credits-font: "Rajdhani", "Avenir Next", "Segoe UI", "Helvetica Neue", sans-serif;
  --credits-title-font: "Chakra Petch", "Trebuchet MS", Verdana, sans-serif;
  --credits-title-size: clamp(1.3rem, 3.2vw, 2rem);
  --credits-name-size: clamp(1.08rem, 2.7vw, 1.6rem);
  --credits-flourish-title-size: clamp(2.2rem, 7vw, 4.4rem);
  --credits-block-gap: 5rem;
  --credits-name-gap: 0.55rem;
  --credits-shadow: 0 2px 12px rgba(1, 6, 9, 0.85);
  /* glow no-op — never "none" (a "none" in the composed shadow list
     invalidates the whole declaration); netrunner glows are bespoke. */
  --credits-glow: 0 0 0 rgba(0, 0, 0, 0);
}

/* Scenery is full-bleed: drop the base edge-fade on html ONLY; body keeps
   the base mask so names still ease in at the floor and out at the ceiling. */
html { -webkit-mask-image: none; mask-image: none; }
body { background: transparent; counter-reset: netrunner-node; }

/* ═══ THE VISOR + LIGHT STORY — one static promoted layer (L3/L6).
   Top of the paint list: the four corner brackets of the visor frame
   (corners are L6-legal). Under them: magenta mega-ad haze bleeding in
   from upper-right (the off-screen billboard), teal city bloom low,
   coarse 150px-period scan diagonals at 3% alpha (wide soft bands only —
   the brief's legal reading of "scanlines"), and a cool vignette. */
html::before {
  content: "";
  display: var(--netrunner-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* ── visor corner brackets — an outer bright hairline + inner dim rail
       + a short right-angle tick, so each corner reads as a milled frame
       fitting rather than a stray line (corners are L6-legal). ── */
    /* top-left */
    linear-gradient(var(--netrunner-teal), var(--netrunner-teal)) 24px 20px / 104px 2px no-repeat,
    linear-gradient(var(--netrunner-teal), var(--netrunner-teal)) 24px 20px / 2px 104px no-repeat,
    linear-gradient(rgba(159,243,245,0.4), rgba(159,243,245,0.4)) 24px 26px / 40px 1px no-repeat,
    linear-gradient(rgba(159,243,245,0.4), rgba(159,243,245,0.4)) 30px 20px / 1px 40px no-repeat,
    /* top-right */
    linear-gradient(var(--netrunner-teal), var(--netrunner-teal)) calc(100% - 24px) 20px / 104px 2px no-repeat,
    linear-gradient(var(--netrunner-teal), var(--netrunner-teal)) calc(100% - 24px) 20px / 2px 104px no-repeat,
    linear-gradient(rgba(159,243,245,0.4), rgba(159,243,245,0.4)) calc(100% - 62px) 26px / 40px 1px no-repeat,
    linear-gradient(rgba(159,243,245,0.4), rgba(159,243,245,0.4)) calc(100% - 30px) 20px / 1px 40px no-repeat,
    /* bottom-left */
    linear-gradient(var(--netrunner-teal), var(--netrunner-teal)) 24px calc(100% - 20px) / 104px 2px no-repeat,
    linear-gradient(var(--netrunner-teal), var(--netrunner-teal)) 24px calc(100% - 20px) / 2px 104px no-repeat,
    /* bottom-right */
    linear-gradient(var(--netrunner-teal), var(--netrunner-teal)) calc(100% - 24px) calc(100% - 20px) / 104px 2px no-repeat,
    linear-gradient(var(--netrunner-teal), var(--netrunner-teal)) calc(100% - 24px) calc(100% - 20px) / 2px 104px no-repeat,
    /* ── SPARKLE: coarse specular glints on the visor's milled corner fittings —
       the visor glass catching the city light where each bracket meets. Each is a
       wide (>=90px) soft radial bloom pinned on a corner junction: STATIC, in the
       CORNERS, well off the text lane = L6-safe (rules c + d). A bright white core
       fading to teal reads as a real specular kiss on the frame. ── */
    radial-gradient(circle 52px at 26px 22px, rgba(224, 251, 252, 0.5), rgba(159, 243, 245, 0.14) 34%, rgba(45, 226, 230, 0) 70%),
    radial-gradient(circle 52px at calc(100% - 26px) 22px, rgba(224, 251, 252, 0.5), rgba(159, 243, 245, 0.14) 34%, rgba(45, 226, 230, 0) 70%),
    radial-gradient(circle 46px at 26px calc(100% - 22px), rgba(159, 243, 245, 0.32), rgba(45, 226, 230, 0.1) 36%, rgba(45, 226, 230, 0) 72%),
    radial-gradient(circle 46px at calc(100% - 26px) calc(100% - 22px), rgba(159, 243, 245, 0.32), rgba(45, 226, 230, 0.1) 36%, rgba(45, 226, 230, 0) 72%),
    /* ── volumetric god-rays: light shafts radiating UP from the city bloom
       at the floor. A conic gradient centred at bottom-centre gives true
       fanning shafts (linear gradients can't); masked so it only lives in
       the lower half where the haze would actually catch the glow. Coarse
       wide wedges, low alpha — L6-safe, and it never touches the text lane
       centre because the wedges straddle the vertical, not cross it. ── */
    conic-gradient(from 176deg at 50% 122%,
      rgba(45, 226, 230, 0) 0deg,
      rgba(45, 226, 230, 0.05) 3deg, rgba(45, 226, 230, 0) 6deg,
      rgba(45, 226, 230, 0) 9deg,
      rgba(80, 246, 250, 0.06) 12deg, rgba(80, 246, 250, 0) 15deg,
      rgba(45, 226, 230, 0) 18deg,
      rgba(45, 226, 230, 0.04) 20deg, rgba(45, 226, 230, 0) 23deg,
      rgba(45, 226, 230, 0) 360deg),
    /* corner vignette — the visor swallows its edges, cool and heavy */
    radial-gradient(ellipse 138% 128% at 50% 40%, rgba(1, 4, 6, 0) 54%, rgba(1, 4, 6, 0.32) 82%, rgba(0, 2, 4, 0.62) 100%),
    /* the mega-ad: magenta haze washing in from upper-right */
    radial-gradient(ellipse 42vw 32vh at 97% -6%, rgba(255, 56, 100, 0.14), rgba(255, 56, 100, 0.045) 52%, rgba(255, 56, 100, 0) 76%),
    /* answering teal spill upper-left, much quieter */
    radial-gradient(ellipse 28vw 20vh at 1% 3%, rgba(45, 226, 230, 0.08), rgba(45, 226, 230, 0) 72%),
    /* HUD depth-plane GLOW — the soft light the crisp SVG reticle (link::before)
       casts into the void. THREE brighter coarse ring-glows feathered over wide
       gaps (coarse, L6-safe) that back the sharp SVG strokes so the instrument
       reads as a lit hologram, not a decal. Parked in the UPPER void where the
       crawl is sparse. Boosted ~2.4x from before so it stops reading as a smudge. */
    radial-gradient(circle 34vmax at 50% 42%,
      rgba(45, 226, 230, 0) 0, rgba(45, 226, 230, 0) 32.6%,
      rgba(120, 250, 253, 0.16) 34.4%, rgba(45, 226, 230, 0) 36.4%,
      rgba(45, 226, 230, 0) 47.4%,
      rgba(90, 240, 244, 0.12) 49%, rgba(45, 226, 230, 0) 51%,
      rgba(45, 226, 230, 0) 62.4%,
      rgba(45, 226, 230, 0.085) 64%, rgba(45, 226, 230, 0) 66%,
      rgba(45, 226, 230, 0) 100%),
    /* center-void atmosphere — a faint teal data-haze so the lane is never a
       dead black rectangle; wide, low, soft, coarse (L6-safe, no fine detail) */
    radial-gradient(ellipse 58vw 46vh at 50% 52%, rgba(24, 120, 130, 0.13), rgba(16, 80, 90, 0.04) 46%, rgba(45, 226, 230, 0) 72%),
    /* coarse static scan diagonals — 150px period, soft, 3% alpha */
    repeating-linear-gradient(115deg, rgba(45, 226, 230, 0) 0px, rgba(45, 226, 230, 0.028) 75px, rgba(45, 226, 230, 0) 150px),
    /* city bloom above the skyline — brighter core, wide falloff */
    radial-gradient(ellipse 74vw 22vh at 50% 90%, rgba(45, 226, 230, 0.14), rgba(45, 226, 230, 0.03) 48%, rgba(45, 226, 230, 0) 76%);
}

/* ═══ THE CITY — one skyline SVG band pinned to the floor. Far row in
   hazy teal (atmosphere), near row in ink; lit windows and the two holo
   billboards live on the SIDE towers only — the center third stays dark
   so nothing fine sits under the text lane (L6). STATIC, promoted. */
html::after {
  content: "";
  display: var(--netrunner-scenery, block);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 27vh;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 320' preserveAspectRatio='none'><defs><linearGradient id='sky' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%232de2e6' stop-opacity='0'/><stop offset='.5' stop-color='%23155f6a' stop-opacity='.14'/><stop offset='1' stop-color='%2352e9ec' stop-opacity='.3'/></linearGradient><linearGradient id='haze' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%232de2e6' stop-opacity='0'/><stop offset='.55' stop-color='%23237d88' stop-opacity='.16'/><stop offset='1' stop-color='%232de2e6' stop-opacity='0'/></linearGradient><linearGradient id='far' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%23124450'/><stop offset='1' stop-color='%230d3742'/></linearGradient><linearGradient id='mid' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%230b3039'/><stop offset='.55' stop-color='%23061d26'/><stop offset='1' stop-color='%23031118'/></linearGradient><linearGradient id='near' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%23092530'/><stop offset='.42' stop-color='%23040f16'/><stop offset='1' stop-color='%2301080b'/></linearGradient><linearGradient id='rim' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%237df6f9' stop-opacity='.85'/><stop offset='.14' stop-color='%232de2e6' stop-opacity='0'/></linearGradient><linearGradient id='rimf' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%235bf0f3' stop-opacity='.45'/><stop offset='.16' stop-color='%232de2e6' stop-opacity='0'/></linearGradient><linearGradient id='street' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%232de2e6' stop-opacity='0'/><stop offset='.5' stop-color='%2378f6f9' stop-opacity='.5'/><stop offset='1' stop-color='%232de2e6' stop-opacity='0'/></linearGradient></defs><rect x='0' y='120' width='1600' height='200' fill='url(%23sky)'/><rect x='0' y='150' width='1600' height='170' fill='url(%23haze)'/><ellipse cx='260' cy='300' rx='320' ry='120' fill='%232de2e6' opacity='.05'/><ellipse cx='1340' cy='300' rx='320' ry='120' fill='%232de2e6' opacity='.05'/><g fill='url(%23far)' opacity='.42'><rect x='0' y='158' width='118' height='162'/><rect x='96' y='120' width='64' height='200'/><rect x='188' y='166' width='84' height='154'/><rect x='296' y='138' width='58' height='182'/><rect x='376' y='176' width='104' height='144'/><rect x='510' y='158' width='76' height='162'/><rect x='620' y='184' width='96' height='136'/><rect x='748' y='170' width='66' height='150'/><rect x='846' y='186' width='88' height='134'/><rect x='962' y='160' width='58' height='160'/><rect x='1044' y='178' width='104' height='142'/><rect x='1186' y='134' width='76' height='186'/><rect x='1300' y='164' width='86' height='156'/><rect x='1416' y='144' width='184' height='176'/></g><g fill='url(%23rimf)' opacity='.5'><rect x='96' y='120' width='64' height='16'/><rect x='296' y='138' width='58' height='16'/><rect x='1186' y='134' width='76' height='16'/><rect x='1416' y='144' width='184' height='16'/></g><g fill='url(%23mid)'><rect x='40' y='128' width='96' height='192'/><rect x='168' y='138' width='72' height='182'/><rect x='300' y='152' width='70' height='168'/><rect x='430' y='164' width='90' height='156'/><rect x='560' y='146' width='64' height='174'/><rect x='700' y='170' width='84' height='150'/><rect x='820' y='154' width='72' height='166'/><rect x='950' y='168' width='88' height='152'/><rect x='1090' y='142' width='76' height='178'/><rect x='1230' y='160' width='80' height='160'/><rect x='1360' y='148' width='92' height='172'/><rect x='1490' y='132' width='110' height='188'/></g><path d='M92 128 L92 96 L100 96 L100 128 Z' fill='url(%23mid)'/><path d='M1540 132 L1540 104 L1548 104 L1548 132 Z' fill='url(%23mid)'/><path d='M584 146 L594 122 L604 146 Z' fill='url(%23mid)'/><g fill='url(%23rim)' opacity='.65'><rect x='40' y='128' width='96' height='13'/><rect x='168' y='138' width='72' height='13'/><rect x='300' y='152' width='70' height='13'/><rect x='430' y='164' width='90' height='13'/><rect x='560' y='146' width='64' height='13'/><rect x='700' y='170' width='84' height='13'/><rect x='820' y='154' width='72' height='13'/><rect x='950' y='168' width='88' height='13'/><rect x='1090' y='142' width='76' height='13'/><rect x='1230' y='160' width='80' height='13'/><rect x='1360' y='148' width='92' height='13'/><rect x='1490' y='132' width='110' height='13'/></g><rect x='0' y='300' width='1600' height='20' fill='url(%23street)'/><g fill='url(%23near)'><rect x='-10' y='182' width='96' height='138'/><rect x='84' y='126' width='116' height='194'/><rect x='228' y='196' width='84' height='124'/><rect x='338' y='174' width='120' height='146'/><rect x='480' y='210' width='94' height='110'/><rect x='600' y='226' width='144' height='94'/><rect x='758' y='212' width='106' height='108'/><rect x='896' y='198' width='120' height='122'/><rect x='1046' y='186' width='94' height='134'/><rect x='1168' y='138' width='130' height='182'/><rect x='1322' y='190' width='100' height='130'/><rect x='1446' y='166' width='160' height='154'/></g><path d='M120 126 L120 100 L164 100 L164 126 Z' fill='url(%23near)'/><path d='M1210 138 L1210 108 L1256 108 L1256 138 Z' fill='url(%23near)'/><g fill='%235bf0f3' opacity='.12'><rect x='-10' y='182' width='96' height='1.5'/><rect x='84' y='126' width='116' height='1.5'/><rect x='228' y='196' width='84' height='1.5'/><rect x='338' y='174' width='120' height='1.5'/><rect x='480' y='210' width='94' height='1.5'/><rect x='600' y='226' width='144' height='1.5'/><rect x='758' y='212' width='106' height='1.5'/><rect x='896' y='198' width='120' height='1.5'/><rect x='1046' y='186' width='94' height='1.5'/><rect x='1168' y='138' width='130' height='1.5'/><rect x='1322' y='190' width='100' height='1.5'/><rect x='1446' y='166' width='160' height='1.5'/></g><g fill='%232de2e6' opacity='.1'><rect x='500' y='200' width='5' height='3'/><rect x='522' y='212' width='5' height='3'/><rect x='712' y='194' width='5' height='3'/><rect x='956' y='182' width='5' height='3'/><rect x='1096' y='162' width='5' height='3'/><rect x='1364' y='170' width='5' height='3'/><rect x='356' y='194' width='5' height='3'/><rect x='588' y='240' width='5' height='3'/></g><g fill='%232de2e6' opacity='.42'><rect x='96' y='140' width='6' height='4'/><rect x='116' y='140' width='6' height='4'/><rect x='156' y='140' width='6' height='4'/><rect x='96' y='154' width='6' height='4'/><rect x='136' y='154' width='6' height='4'/><rect x='156' y='154' width='6' height='4'/><rect x='96' y='168' width='6' height='4'/><rect x='136' y='168' width='6' height='4'/><rect x='176' y='168' width='6' height='4'/><rect x='96' y='182' width='6' height='4'/><rect x='136' y='182' width='6' height='4'/><rect x='176' y='182' width='6' height='4'/><rect x='116' y='196' width='6' height='4'/><rect x='136' y='196' width='6' height='4'/><rect x='176' y='196' width='6' height='4'/><rect x='116' y='210' width='6' height='4'/><rect x='156' y='210' width='6' height='4'/><rect x='176' y='210' width='6' height='4'/><rect x='116' y='224' width='6' height='4'/><rect x='156' y='224' width='6' height='4'/><rect x='96' y='238' width='6' height='4'/><rect x='116' y='238' width='6' height='4'/><rect x='156' y='238' width='6' height='4'/><rect x='96' y='252' width='6' height='4'/><rect x='136' y='252' width='6' height='4'/><rect x='156' y='252' width='6' height='4'/><rect x='96' y='266' width='6' height='4'/><rect x='136' y='266' width='6' height='4'/><rect x='176' y='266' width='6' height='4'/><rect x='96' y='280' width='6' height='4'/><rect x='136' y='280' width='6' height='4'/><rect x='176' y='280' width='6' height='4'/></g><g fill='%23ffb27d' opacity='.32'><rect x='102' y='146' width='6' height='4'/><rect x='170' y='146' width='6' height='4'/><rect x='136' y='192' width='6' height='4'/><rect x='102' y='216' width='6' height='4'/><rect x='170' y='240' width='6' height='4'/><rect x='136' y='264' width='6' height='4'/><rect x='116' y='118' width='6' height='4'/></g><g fill='%232de2e6' opacity='.38'><rect x='1178' y='150' width='6' height='4'/><rect x='1222' y='150' width='6' height='4'/><rect x='1244' y='150' width='6' height='4'/><rect x='1266' y='150' width='6' height='4'/><rect x='1222' y='165' width='6' height='4'/><rect x='1266' y='165' width='6' height='4'/><rect x='1178' y='180' width='6' height='4'/><rect x='1200' y='180' width='6' height='4'/><rect x='1266' y='180' width='6' height='4'/><rect x='1200' y='195' width='6' height='4'/><rect x='1222' y='195' width='6' height='4'/><rect x='1244' y='195' width='6' height='4'/><rect x='1200' y='210' width='6' height='4'/><rect x='1244' y='210' width='6' height='4'/><rect x='1266' y='210' width='6' height='4'/><rect x='1178' y='225' width='6' height='4'/><rect x='1244' y='225' width='6' height='4'/><rect x='1178' y='240' width='6' height='4'/><rect x='1200' y='240' width='6' height='4'/><rect x='1222' y='240' width='6' height='4'/><rect x='1178' y='255' width='6' height='4'/><rect x='1222' y='255' width='6' height='4'/><rect x='1244' y='255' width='6' height='4'/><rect x='1266' y='255' width='6' height='4'/><rect x='1222' y='270' width='6' height='4'/><rect x='1266' y='270' width='6' height='4'/><rect x='1178' y='285' width='6' height='4'/><rect x='1200' y='285' width='6' height='4'/><rect x='1266' y='285' width='6' height='4'/><rect x='1224' y='118' width='6' height='4'/></g><g fill='%23ff8fa8' opacity='.26'><rect x='1222' y='156' width='6' height='4'/><rect x='1184' y='184' width='6' height='4'/><rect x='1260' y='212' width='6' height='4'/><rect x='1222' y='240' width='6' height='4'/></g><path d='M142 126 L142 62' stroke='%23041016' stroke-width='4'/><circle cx='142' cy='58' r='12' fill='%23ff3864' opacity='.28'/><circle cx='142' cy='58' r='6' fill='%23ff3864' opacity='.5'/><circle cx='142' cy='58' r='2.8' fill='%23ffb6c7'/><path d='M1233 138 L1233 70' stroke='%23041016' stroke-width='4'/><circle cx='1233' cy='66' r='12' fill='%232de2e6' opacity='.28'/><circle cx='1233' cy='66' r='6' fill='%232de2e6' opacity='.5'/><circle cx='1233' cy='66' r='2.8' fill='%23c8fafb'/><path d='M96 96 L96 78' stroke='%23041016' stroke-width='2.5'/><circle cx='96' cy='76' r='3' fill='%23ff3864' opacity='.4'/><path d='M1544 104 L1544 88' stroke='%23041016' stroke-width='2.5'/><circle cx='1544' cy='86' r='3' fill='%232de2e6' opacity='.4'/><ellipse cx='169' cy='183' rx='44' ry='52' fill='%23ff3864' opacity='.09'/><rect x='148' y='150' width='42' height='66' fill='%23ff3864' opacity='.2'/><rect x='148' y='150' width='42' height='66' fill='none' stroke='%23ff5d80' stroke-opacity='.95' stroke-width='1.8'/><rect x='148' y='150' width='42' height='18' fill='%23ff3864' opacity='.34'/><g stroke='%23ffb6c7' stroke-opacity='1' stroke-width='2.8'><path d='M155 162 L185 162'/><path d='M155 174 L177 174'/><path d='M155 186 L185 186'/><path d='M155 198 L168 198'/></g><circle cx='181' cy='206' r='2.4' fill='%23ffe4ea'/><rect x='146' y='218' width='46' height='10' fill='%23ff3864' opacity='.12'/><ellipse cx='1217' cy='187' rx='40' ry='44' fill='%232de2e6' opacity='.09'/><rect x='1198' y='160' width='38' height='54' fill='%232de2e6' opacity='.2'/><rect x='1198' y='160' width='38' height='54' fill='none' stroke='%235bf0f3' stroke-opacity='.9' stroke-width='1.8'/><rect x='1198' y='160' width='38' height='16' fill='%232de2e6' opacity='.34'/><g stroke='%23c8fafb' stroke-opacity='1' stroke-width='2.8'><path d='M1205 170 L1229 170'/><path d='M1205 182 L1220 182'/><path d='M1205 194 L1229 194'/><path d='M1205 204 L1214 204'/></g><circle cx='1226' cy='204' r='2.2' fill='%23eafcff'/><g><ellipse cx='429' cy='236' rx='30' ry='62' fill='%232de2e6' opacity='.06'/><rect x='420' y='186' width='18' height='100' fill='%23071a20' opacity='.9'/><rect x='420' y='186' width='18' height='100' fill='none' stroke='%232de2e6' stroke-opacity='.7' stroke-width='1.2'/><rect x='420' y='186' width='18' height='5' fill='%235bf0f3' opacity='.5'/><path d='M418 186 L429 177 L440 186' fill='none' stroke='%232de2e6' stroke-opacity='.4' stroke-width='1'/><g stroke='%237df6f9' stroke-opacity='.9' stroke-width='1.3' fill='none'><path d='M423 196 L435 196 M423 201 L435 201 M429 193 L429 205'/><rect x='423' y='212' width='12' height='11'/><path d='M423 217 L435 217'/><path d='M429 231 L423 243 M429 231 L435 243 M425 238 L433 238'/><path d='M423 254 L435 254 M423 259 L435 259 M423 264 L435 264'/></g><ellipse cx='1269' cy='196' rx='28' ry='60' fill='%23ff3864' opacity='.06'/><rect x='1260' y='150' width='18' height='100' fill='%23140810' opacity='.9'/><rect x='1260' y='150' width='18' height='100' fill='none' stroke='%23ff3864' stroke-opacity='.65' stroke-width='1.2'/><rect x='1260' y='150' width='18' height='5' fill='%23ff8fa8' opacity='.5'/><path d='M1258 150 L1269 141 L1280 150' fill='none' stroke='%23ff3864' stroke-opacity='.4' stroke-width='1'/><g stroke='%23ff9db4' stroke-opacity='.9' stroke-width='1.3' fill='none'><rect x='1263' y='157' width='12' height='11'/><path d='M1269 157 L1269 168'/><path d='M1263 176 L1275 176 M1263 181 L1275 181 M1263 186 L1275 186'/><path d='M1263 194 L1275 194 M1269 192 L1269 206 M1263 206 L1275 206'/><path d='M1269 214 L1263 226 M1269 214 L1275 226'/></g><rect x='300' y='158' width='54' height='13' fill='%232de2e6' opacity='.14'/><rect x='300' y='158' width='54' height='13' fill='none' stroke='%235bf0f3' stroke-opacity='.5' stroke-width='.8'/><g stroke='%23c8fafb' stroke-opacity='.7' stroke-width='1' fill='none'><path d='M306 164 L322 164 M328 161 L328 168 M334 161 L348 161 M334 168 L348 168'/></g></g><g><rect x='150' y='300' width='38' height='20' fill='%23ff3864' opacity='.12'/><rect x='166' y='300' width='8' height='20' fill='%23ff8fa8' opacity='.16'/><rect x='421' y='300' width='16' height='20' fill='%232de2e6' opacity='.12'/><rect x='426' y='300' width='5' height='20' fill='%237df6f9' opacity='.18'/><rect x='1199' y='300' width='36' height='20' fill='%232de2e6' opacity='.12'/><rect x='1212' y='300' width='7' height='20' fill='%237df6f9' opacity='.16'/><rect x='1261' y='300' width='16' height='20' fill='%23ff3864' opacity='.11'/><rect x='1266' y='300' width='5' height='20' fill='%23ff8fa8' opacity='.16'/><rect x='137' y='300' width='10' height='20' fill='%23ff3864' opacity='.12'/><rect x='1228' y='300' width='10' height='20' fill='%232de2e6' opacity='.12'/></g></svg>") 0 0 / 100% 100% no-repeat;
}

/* ═══ visor scan band — one wide soft diagonal sheet drifting across the
   glass. Viewport-sized layer, so motion is steps(1, end): one hop every
   3s (far under the 5 hops/s cap); box overscans 45vw so hops never
   expose an edge. */
body::before {
  content: "";
  display: var(--netrunner-scenery, block);
  position: fixed;
  top: 0;
  bottom: 0;
  left: -45vw;
  right: -45vw;
  z-index: -1;
  pointer-events: none;
  background: linear-gradient(115deg,
    rgba(45, 226, 230, 0) 40%, rgba(45, 226, 230, 0.045) 46%,
    rgba(159, 243, 245, 0.06) 50%, rgba(45, 226, 230, 0.045) 54%,
    rgba(45, 226, 230, 0) 60%);
  animation: netrunner-scan 36s steps(1, end) infinite;
}

/* ═══ the lane: ice names over teal glow need a quiet scrim — coarse,
   soft, STATIC. Fades before the edges so the drone and HUD keep their
   light. */
body::after {
  content: "";
  display: var(--netrunner-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background: linear-gradient(90deg,
    rgba(1, 6, 9, 0) 10%, rgba(1, 6, 9, 0.34) 30%, rgba(1, 6, 9, 0.42) 50%,
    rgba(1, 6, 9, 0.34) 70%, rgba(1, 6, 9, 0) 90%);
}

/* ═══ THE RETICLE — the crisp targeting instrument the visor projects onto the
   void, floating far behind the lane so you read "looking THROUGH the visor".
   A dedicated SVG on link::before (the one <link> = first-of-type): three ruled
   rings, a graduated bearing bezel, callout brackets at the LEFT/RIGHT/TOP
   shoulders (never a bottom vertical — that would cut the title lane), two live
   contact pips, and a soft data-lock crosshair. STATIC (zero relative motion =
   L6-safe regardless of detail), promoted, centred at 50% 42% to sit above the
   dense crawl. Backed by the ring-glow in html::before so it reads as lit holo. */
head link { display: var(--netrunner-scenery, block); }
link:first-of-type::before {
  content: "";
  display: var(--netrunner-scenery, block);
  position: fixed;
  left: 50%;
  top: 42%;
  width: 62vmax;
  height: 62vmax;
  transform: translate(-50%, -50%) translateZ(0);
  z-index: -1;
  pointer-events: none;
  opacity: 0.82;
  background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 620 620'><defs><radialGradient id='rlock' cx='50%25' cy='50%25' r='50%25'><stop offset='0' stop-color='%235bf0f3' stop-opacity='.5'/><stop offset='1' stop-color='%235bf0f3' stop-opacity='0'/></radialGradient></defs><g fill='none' stroke='%232de2e6' stroke-opacity='.5' stroke-width='1.4'><circle cx='310' cy='310' r='300'/></g><circle cx='310' cy='310' r='300' fill='none' stroke='%239ff3f5' stroke-opacity='.22' stroke-width='.7'/><circle cx='310' cy='310' r='294' fill='none' stroke='%232de2e6' stroke-opacity='.16' stroke-width='.7'/><circle cx='310' cy='310' r='206' fill='none' stroke='%232de2e6' stroke-opacity='.34' stroke-width='1.1'/><circle cx='310' cy='310' r='118' fill='none' stroke='%232de2e6' stroke-opacity='.22' stroke-width='1' stroke-dasharray='3 9'/><g stroke='%232de2e6' stroke-opacity='.4' stroke-width='1.4'><path d='M310 10 L310 30'/><path d='M310 590 L310 610'/><path d='M10 310 L30 310'/><path d='M590 310 L610 310'/></g><g stroke='%232de2e6' stroke-opacity='.24' stroke-width='1'><path d='M456 56 L446 74'/><path d='M164 56 L174 74'/><path d='M564 456 L546 446'/><path d='M56 456 L74 446'/><path d='M564 164 L546 174'/><path d='M56 164 L74 174'/></g><g stroke='%239ff3f5' stroke-opacity='.6' stroke-width='2'><path d='M40 84 L40 40 L84 40'/><path d='M580 84 L580 40 L536 40'/><path d='M40 536 L40 580 L84 580'/><path d='M580 536 L580 580 L536 580'/></g><g stroke='%232de2e6' stroke-opacity='.5' stroke-width='2.2' stroke-linecap='round'><path d='M96 310 L150 310'/><path d='M470 310 L524 310'/><path d='M310 96 L310 150'/></g><circle cx='310' cy='310' r='40' fill='url(%23rlock)'/><circle cx='310' cy='310' r='4' fill='%239ff3f5' fill-opacity='.85'/><circle cx='310' cy='310' r='9' fill='none' stroke='%232de2e6' stroke-opacity='.5' stroke-width='1'/><circle cx='456' cy='214' r='9' fill='none' stroke='%232de2e6' stroke-opacity='.55' stroke-width='1.4'/><circle cx='456' cy='214' r='3.4' fill='%235bf0f3'/><circle cx='456' cy='214' r='14' fill='%232de2e6' fill-opacity='.12'/><circle cx='176' cy='420' r='7' fill='none' stroke='%23ff3864' stroke-opacity='.5' stroke-width='1.2'/><circle cx='176' cy='420' r='2.6' fill='%23ff8fa8'/><circle cx='176' cy='420' r='11' fill='%23ff3864' fill-opacity='.1'/></svg>") center / contain no-repeat;
}

/* ═══ THE FLYBY — the story beat: every 27s an AV courier streaks across
   the upper sky lane right-to-left, read as a light-trail (hot white-teal
   head, long ion wake, magenta tail lamp). It teleports in nine steps(1)
   hops (~2 hops/s, small element, NOT a continuous mover — no will-change
   spent) and is gone in five seconds, leaving the night quiet again. */
link:first-of-type::after {
  content: "";
  display: var(--netrunner-scenery, block);
  position: fixed;
  right: -170px;
  top: 10.5vh;
  width: 160px;
  height: 22px;
  z-index: -1;
  pointer-events: none;
  opacity: 0;
  background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 22'><defs><linearGradient id='wake' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='%232de2e6' stop-opacity='0'/><stop offset='.55' stop-color='%232de2e6' stop-opacity='.28'/><stop offset='.85' stop-color='%237df6f9' stop-opacity='.6'/><stop offset='1' stop-color='%23eafcff' stop-opacity='.9'/></linearGradient></defs><rect x='6' y='9.5' width='138' height='3' rx='1.5' fill='url(%23wake)'/><rect x='36' y='10.4' width='100' height='1.2' rx='.6' fill='%23c8fafb' fill-opacity='.35'/><ellipse cx='143' cy='11' rx='9' ry='4' fill='%237df6f9' fill-opacity='.35'/><circle cx='146' cy='11' r='2.6' fill='%23eafcff'/><circle cx='146' cy='11' r='4.6' fill='%237df6f9' fill-opacity='.4'/><circle cx='134' cy='11' r='1.6' fill='%23ff3864' fill-opacity='.85'/><circle cx='134' cy='11' r='3' fill='%23ff3864' fill-opacity='.25'/></svg>") center / contain no-repeat;
  animation: netrunner-flyby 27s steps(1, end) infinite;
}

/* ═══ THE DRONE — courier quad holding position off your left shoulder.
   Rebuilt as machined hardware: a carbon-fibre-panelled chassis lit from the
   city below (teal rim + magenta counter-rim), four motor pods on splayed
   arms with crisp motion-blur rotor arcs, a Fresnel glass canopy, a clamped
   payload pod (it IS a courier), landing skids, and a teal underglow pool it
   casts on the haze. The ONLY continuous mover (small element + will-change
   #1). Overlay (::after) carries the hot lights on the SAME bob keyframe. */
head { display: var(--netrunner-scenery, block); }
head::before,
head::after {
  content: "";
  display: var(--netrunner-scenery, block);
  position: fixed;
  left: 4vw;
  top: 7vh;
  width: 256px;
  height: 176px;
  z-index: 0;
  pointer-events: none;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  will-change: transform;
  animation: netrunner-drone 6.5s ease-in-out infinite;
}
head::before {
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 176'><defs><linearGradient id='hull' x1='.24' y1='.02' x2='.5' y2='1'><stop offset='0' stop-color='%23a8ecef'/><stop offset='.1' stop-color='%235fb0b9'/><stop offset='.26' stop-color='%23357a84'/><stop offset='.46' stop-color='%231d4650'/><stop offset='.68' stop-color='%23112c34'/><stop offset='.86' stop-color='%230a1e25'/><stop offset='1' stop-color='%2304121a'/></linearGradient><linearGradient id='belly' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%231d454d'/><stop offset='.5' stop-color='%230c2530'/><stop offset='1' stop-color='%23040f15'/></linearGradient><linearGradient id='pod' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%2358a3ad'/><stop offset='.4' stop-color='%23285a64'/><stop offset='1' stop-color='%23081b21'/></linearGradient><linearGradient id='arm' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%233c6d76'/><stop offset='.5' stop-color='%23193740'/><stop offset='1' stop-color='%230a1c22'/></linearGradient><linearGradient id='glass' x1='.12' y1='0' x2='.52' y2='1'><stop offset='0' stop-color='%23ffffff'/><stop offset='.18' stop-color='%23b6ecf1'/><stop offset='.44' stop-color='%234fb0bb'/><stop offset='.72' stop-color='%23144049'/><stop offset='1' stop-color='%23061c23'/></linearGradient><radialGradient id='rotor' cx='50%25' cy='50%25' r='50%25'><stop offset='0' stop-color='%23e6feff' stop-opacity='.6'/><stop offset='.36' stop-color='%235bf0f3' stop-opacity='.32'/><stop offset='.72' stop-color='%232de2e6' stop-opacity='.12'/><stop offset='1' stop-color='%232de2e6' stop-opacity='0'/></radialGradient><radialGradient id='under' cx='50%25' cy='40%25' r='60%25'><stop offset='0' stop-color='%237df6f9' stop-opacity='.72'/><stop offset='.5' stop-color='%232de2e6' stop-opacity='.2'/><stop offset='1' stop-color='%232de2e6' stop-opacity='0'/></radialGradient><radialGradient id='ao' cx='50%25' cy='50%25' r='50%25'><stop offset='0' stop-color='%23010507' stop-opacity='.55'/><stop offset='1' stop-color='%23010507' stop-opacity='0'/></radialGradient><linearGradient id='cf' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%23ffffff' stop-opacity='.08'/><stop offset='1' stop-color='%23ffffff' stop-opacity='0'/></linearGradient><radialGradient id='domespec' cx='38%25' cy='20%25' r='42%25'><stop offset='0' stop-color='%23ffffff' stop-opacity='.9'/><stop offset='.5' stop-color='%23dffbfc' stop-opacity='.25'/><stop offset='1' stop-color='%23dffbfc' stop-opacity='0'/></radialGradient></defs><ellipse cx='128' cy='150' rx='58' ry='12' fill='url(%23ao)'/><ellipse cx='128' cy='138' rx='54' ry='16' fill='url(%23under)'/><g stroke-linecap='round'><path d='M96 78 L44 58 M160 78 L212 58' stroke='%23071a20' stroke-width='9'/><path d='M96 78 L44 58 M160 78 L212 58' stroke='url(%23arm)' stroke-width='6.5'/><path d='M95 73 L45 54' stroke='%237df6f9' stroke-opacity='.55' stroke-width='1.4'/><path d='M161 73 L211 54' stroke='%237df6f9' stroke-opacity='.55' stroke-width='1.4'/><path d='M104 84 L64 92 M152 84 L192 92' stroke='%23071a20' stroke-width='8'/><path d='M104 84 L64 92 M152 84 L192 92' stroke='url(%23arm)' stroke-width='5.5'/><path d='M104 83 L64 91' stroke='%235bf0f3' stroke-opacity='.4' stroke-width='1'/><path d='M152 83 L192 91' stroke='%235bf0f3' stroke-opacity='.4' stroke-width='1'/></g><g><ellipse cx='44' cy='56' rx='42' ry='9.5' fill='url(%23rotor)'/><ellipse cx='44' cy='56' rx='42' ry='9.5' fill='none' stroke='%23e6feff' stroke-opacity='.45' stroke-width='.9'/><path d='M6 56 A42 9.5 0 0 1 82 56' fill='none' stroke='%23f2feff' stroke-opacity='.6' stroke-width='1.6' stroke-linecap='round'/><ellipse cx='44' cy='56' rx='28' ry='6' fill='none' stroke='%239ff3f5' stroke-opacity='.24' stroke-width='.7'/><ellipse cx='212' cy='56' rx='42' ry='9.5' fill='url(%23rotor)'/><ellipse cx='212' cy='56' rx='42' ry='9.5' fill='none' stroke='%23e6feff' stroke-opacity='.45' stroke-width='.9'/><path d='M174 56 A42 9.5 0 0 1 250 56' fill='none' stroke='%23f2feff' stroke-opacity='.6' stroke-width='1.6' stroke-linecap='round'/><ellipse cx='212' cy='56' rx='28' ry='6' fill='none' stroke='%239ff3f5' stroke-opacity='.24' stroke-width='.7'/><ellipse cx='64' cy='94' rx='36' ry='8.5' fill='url(%23rotor)'/><ellipse cx='64' cy='94' rx='36' ry='8.5' fill='none' stroke='%23e6feff' stroke-opacity='.4' stroke-width='.8'/><path d='M28 94 A36 8.5 0 0 1 100 94' fill='none' stroke='%23f2feff' stroke-opacity='.5' stroke-width='1.3' stroke-linecap='round'/><ellipse cx='192' cy='94' rx='36' ry='8.5' fill='url(%23rotor)'/><ellipse cx='192' cy='94' rx='36' ry='8.5' fill='none' stroke='%23e6feff' stroke-opacity='.4' stroke-width='.8'/><path d='M156 94 A36 8.5 0 0 1 228 94' fill='none' stroke='%23f2feff' stroke-opacity='.5' stroke-width='1.3' stroke-linecap='round'/></g><g><ellipse cx='44' cy='56' rx='11' ry='6' fill='url(%23pod)'/><ellipse cx='44' cy='55' rx='11' ry='6' fill='none' stroke='%237df6f9' stroke-opacity='.5' stroke-width='.9'/><ellipse cx='41' cy='53.4' rx='4' ry='1.6' fill='%23e6feff' opacity='.7'/><circle cx='44' cy='55' r='2.4' fill='%23081b21'/><circle cx='44' cy='54.4' r='1' fill='%235bf0f3' opacity='.8'/><ellipse cx='212' cy='56' rx='11' ry='6' fill='url(%23pod)'/><ellipse cx='212' cy='55' rx='11' ry='6' fill='none' stroke='%237df6f9' stroke-opacity='.5' stroke-width='.9'/><ellipse cx='209' cy='53.4' rx='4' ry='1.6' fill='%23e6feff' opacity='.7'/><circle cx='212' cy='55' r='2.4' fill='%23081b21'/><circle cx='212' cy='54.4' r='1' fill='%235bf0f3' opacity='.8'/><ellipse cx='64' cy='94' rx='10' ry='5.4' fill='url(%23pod)'/><ellipse cx='64' cy='93' rx='10' ry='5.4' fill='none' stroke='%237df6f9' stroke-opacity='.42' stroke-width='.8'/><ellipse cx='61.6' cy='91.8' rx='3.4' ry='1.3' fill='%23e6feff' opacity='.6'/><circle cx='64' cy='93' r='2' fill='%23081b21'/><ellipse cx='192' cy='94' rx='10' ry='5.4' fill='url(%23pod)'/><ellipse cx='192' cy='93' rx='10' ry='5.4' fill='none' stroke='%237df6f9' stroke-opacity='.42' stroke-width='.8'/><ellipse cx='189.6' cy='91.8' rx='3.4' ry='1.3' fill='%23e6feff' opacity='.6'/><circle cx='192' cy='93' r='2' fill='%23081b21'/></g><path d='M128 60 C168 60 182 74 182 92 C182 112 158 122 128 122 C98 122 74 112 74 92 C74 74 88 60 128 60 Z' fill='url(%23hull)'/><path d='M128 60 C168 60 182 74 182 92 C182 112 158 122 128 122 C98 122 74 112 74 92 C74 74 88 60 128 60 Z' fill='url(%23cf)'/><ellipse cx='114' cy='72' rx='30' ry='11' fill='url(%23domespec)'/><path d='M128 60 C168 60 182 74 182 92 C182 112 158 122 128 122 C98 122 74 112 74 92 C74 74 88 60 128 60 Z' fill='none' stroke='%237df6f9' stroke-opacity='.26' stroke-width='1'/><path d='M84 78 C82 70 92 62 108 60' fill='none' stroke='%23c8fafb' stroke-opacity='.5' stroke-width='1.4' stroke-linecap='round'/><path d='M90 71 C104 63 152 63 166 71' fill='none' stroke='%23f2feff' stroke-width='2.4' stroke-opacity='.95' stroke-linecap='round'/><path d='M181 82 C186 90 185 102 178 110 C173 114 168 113 165 109 C173 100 173 91 168 83 Z' fill='%23ff3864' opacity='.28'/><path d='M180 80 C185 88 184 100 178 108' fill='none' stroke='%23ff8fa8' stroke-opacity='.55' stroke-width='1.3' stroke-linecap='round'/><path d='M78 88 C76 94 78 102 82 108' fill='none' stroke='%235bf0f3' stroke-opacity='.4' stroke-width='1.2'/><g stroke='%23071a20' stroke-width='1' stroke-opacity='.5'><path d='M128 66 L128 118'/><path d='M100 70 L108 114'/><path d='M156 70 L148 114'/><path d='M82 92 L174 92'/></g><g stroke='%237df6f9' stroke-opacity='.16' stroke-width='.6'><path d='M100.6 70 L108.6 114'/><path d='M156.6 70 L148.6 114'/></g><ellipse cx='128' cy='84' rx='30' ry='15' fill='url(%23glass)'/><ellipse cx='128' cy='84' rx='30' ry='15' fill='none' stroke='%237df6f9' stroke-opacity='.6' stroke-width='1.2'/><path d='M104 82 Q128 68 152 82' stroke='%23c8fafb' stroke-width='1' fill='none' opacity='.6'/><path d='M108 79 Q126 70 144 76' stroke='%23ffffff' stroke-width='2.6' fill='none' opacity='.95' stroke-linecap='round'/><ellipse cx='116' cy='79' rx='6' ry='2.4' fill='%23ffffff' opacity='.85'/><ellipse cx='113' cy='78' rx='2.2' ry='1' fill='%23ffffff'/><path d='M150 90 Q156 92 152 96' stroke='%235bf0f3' stroke-width='1' fill='none' opacity='.5'/><g stroke-linecap='round'><path d='M104 116 L92 142 M152 116 L164 142' stroke='%23081519' stroke-width='4.5'/><path d='M104 116 L92 142 M152 116 L164 142' stroke='%232de2e6' stroke-opacity='.3' stroke-width='1'/><path d='M80 143 L112 143 M144 143 L176 143' stroke='%23081519' stroke-width='4'/><path d='M80 143 L112 143 M144 143 L176 143' stroke='%232de2e6' stroke-opacity='.4' stroke-width='1'/></g><rect x='112' y='116' width='32' height='22' rx='3' fill='url(%23belly)' stroke='%232de2e6' stroke-opacity='.45' stroke-width='.9'/><rect x='112' y='116' width='32' height='5' rx='2' fill='%237df6f9' opacity='.2'/><path d='M118 138 L118 145 M138 138 L138 145' stroke='%23081519' stroke-width='2.4'/><rect x='120' y='125' width='16' height='5' rx='1' fill='%23ff3864' opacity='.7'/><rect x='120' y='125' width='16' height='5' rx='1' fill='none' stroke='%23ff8fa8' stroke-opacity='.6' stroke-width='.6'/><circle cx='128' cy='104' r='11' fill='%23081a20'/><circle cx='128' cy='104' r='11' fill='none' stroke='%232de2e6' stroke-opacity='.5' stroke-width='1'/><circle cx='128' cy='104' r='7.5' fill='%23031318'/><circle cx='128' cy='104' r='5.4' fill='%232de2e6' opacity='.9'/><circle cx='125.4' cy='101.4' r='1.8' fill='%23eafcff'/></svg>");
}
/* beacon + hot sensor overlay: identical geometry, the SAME bob keyframe
   (stays welded to the hull), steps() blink = the nav light. Top strobe +
   the hot teal sensor eye + a magenta payload-status LED. */
head::after {
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 176'><rect x='126.4' y='52' width='3.2' height='9' fill='%23081519'/><circle cx='128' cy='50' r='13' fill='%23ff3864' opacity='.35'/><circle cx='128' cy='50' r='6' fill='%23ff3864' opacity='.6'/><circle cx='128' cy='50' r='3.6' fill='%23ff9db4'/><circle cx='126.6' cy='48.6' r='1.4' fill='%23ffe4ea'/><circle cx='128' cy='104' r='9' fill='%232de2e6' opacity='.6'/><circle cx='128' cy='104' r='4.6' fill='%237df6f9'/><circle cx='128' cy='104' r='2.4' fill='%23eafcff'/><circle cx='126.4' cy='102.4' r='1.1' fill='%23ffffff'/></svg>");
  animation: netrunner-drone 6.5s ease-in-out infinite, netrunner-navlight 2.4s steps(1, end) infinite;
}

/* ═══ telemetry rail — altitude ruler hugging the LEFT EDGE (fine pattern
   at the edge is L6-legal; the lane never reaches it). Pure gradients:
   spine + long ticks every 44px + short ticks between. STATIC, promoted. */
head meta { display: var(--netrunner-scenery, block); }
head meta:first-of-type::before {
  content: "";
  display: var(--netrunner-scenery, block);
  position: fixed;
  left: 1.4vw;
  top: 18vh;
  width: 30px;
  height: 62vh;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  opacity: 0.8;
  background:
    linear-gradient(rgba(45, 226, 230, 0.35), rgba(45, 226, 230, 0.35)) 0 0 / 2px 100% no-repeat,
    repeating-linear-gradient(180deg, rgba(45, 226, 230, 0.45) 0 2px, rgba(45, 226, 230, 0) 2px 44px) 0 0 / 18px 100% no-repeat,
    repeating-linear-gradient(180deg, rgba(45, 226, 230, 0.22) 0 1.5px, rgba(45, 226, 230, 0) 1.5px 11px) 0 0 / 9px 100% no-repeat;
}

/* ═══ compass roundel — upper-right corner HUD instrument: two rings, a
   dashed orbit, 12 bearing ticks, heading marker, two contact blips.
   STATIC, promoted (the sweep below animates over it). */
head meta:first-of-type::after {
  content: "";
  display: var(--netrunner-scenery, block);
  position: fixed;
  right: 2.2vw;
  top: 5vh;
  width: 170px;
  height: 170px;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  opacity: 0.9;
  background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'><defs><radialGradient id='disc' cx='42%25' cy='38%25' r='68%25'><stop offset='0' stop-color='%230c3540' stop-opacity='.42'/><stop offset='.6' stop-color='%2306222a' stop-opacity='.28'/><stop offset='1' stop-color='%2303141a' stop-opacity='.4'/></radialGradient><radialGradient id='sheen' cx='38%25' cy='30%25' r='40%25'><stop offset='0' stop-color='%239ff3f5' stop-opacity='.14'/><stop offset='1' stop-color='%239ff3f5' stop-opacity='0'/></radialGradient></defs><circle cx='90' cy='90' r='83' fill='url(%23disc)'/><circle cx='90' cy='90' r='83' fill='url(%23sheen)'/><circle cx='90' cy='90' r='82' fill='none' stroke='%232de2e6' stroke-opacity='.42' stroke-width='1.8'/><circle cx='90' cy='90' r='80' fill='none' stroke='%2303141a' stroke-opacity='.5' stroke-width='1.2'/><circle cx='90' cy='90' r='84.5' fill='none' stroke='%239ff3f5' stroke-opacity='.16' stroke-width='.8'/><path d='M35 52 A82 82 0 0 1 78 12' fill='none' stroke='%23eafcff' stroke-opacity='.85' stroke-width='2.2' stroke-linecap='round'/><path d='M28 66 A82 82 0 0 1 40 46' fill='none' stroke='%239ff3f5' stroke-opacity='.45' stroke-width='1.4' stroke-linecap='round'/><circle cx='90' cy='90' r='64' fill='none' stroke='%232de2e6' stroke-opacity='.2' stroke-width='1' stroke-dasharray='2 8'/><circle cx='90' cy='90' r='40' fill='none' stroke='%232de2e6' stroke-opacity='.26' stroke-width='1'/><circle cx='90' cy='90' r='20' fill='none' stroke='%232de2e6' stroke-opacity='.16' stroke-width='.8'/><g stroke='%232de2e6' stroke-opacity='.22' stroke-width='.8'><path d='M90 30 L90 150'/><path d='M30 90 L150 90'/></g><circle cx='90' cy='90' r='2.6' fill='%232de2e6' opacity='.85'/><g><path d='M90.0 14.0 L90.0 8.0' stroke='%232de2e6' stroke-opacity='.5' stroke-width='1.6'/><path d='M110.4 13.7 L111.2 10.8' stroke='%232de2e6' stroke-opacity='.3' stroke-width='1'/><path d='M128.0 24.2 L131.0 19.0' stroke='%232de2e6' stroke-opacity='.5' stroke-width='1.6'/><path d='M145.9 34.1 L148.0 32.0' stroke='%232de2e6' stroke-opacity='.3' stroke-width='1'/><path d='M155.8 52.0 L161.0 49.0' stroke='%232de2e6' stroke-opacity='.5' stroke-width='1.6'/><path d='M166.3 69.6 L169.2 68.8' stroke='%232de2e6' stroke-opacity='.3' stroke-width='1'/><path d='M166.0 90.0 L172.0 90.0' stroke='%232de2e6' stroke-opacity='.5' stroke-width='1.6'/><path d='M166.3 110.4 L169.2 111.2' stroke='%232de2e6' stroke-opacity='.3' stroke-width='1'/><path d='M155.8 128.0 L161.0 131.0' stroke='%232de2e6' stroke-opacity='.5' stroke-width='1.6'/><path d='M145.9 145.9 L148.0 148.0' stroke='%232de2e6' stroke-opacity='.3' stroke-width='1'/><path d='M128.0 155.8 L131.0 161.0' stroke='%232de2e6' stroke-opacity='.5' stroke-width='1.6'/><path d='M110.4 166.3 L111.2 169.2' stroke='%232de2e6' stroke-opacity='.3' stroke-width='1'/><path d='M90.0 166.0 L90.0 172.0' stroke='%232de2e6' stroke-opacity='.5' stroke-width='1.6'/><path d='M69.6 166.3 L68.8 169.2' stroke='%232de2e6' stroke-opacity='.3' stroke-width='1'/><path d='M52.0 155.8 L49.0 161.0' stroke='%232de2e6' stroke-opacity='.5' stroke-width='1.6'/><path d='M34.1 145.9 L32.0 148.0' stroke='%232de2e6' stroke-opacity='.3' stroke-width='1'/><path d='M24.2 128.0 L19.0 131.0' stroke='%232de2e6' stroke-opacity='.5' stroke-width='1.6'/><path d='M13.7 110.4 L10.8 111.2' stroke='%232de2e6' stroke-opacity='.3' stroke-width='1'/><path d='M14.0 90.0 L8.0 90.0' stroke='%232de2e6' stroke-opacity='.5' stroke-width='1.6'/><path d='M13.7 69.6 L10.8 68.8' stroke='%232de2e6' stroke-opacity='.3' stroke-width='1'/><path d='M24.2 52.0 L19.0 49.0' stroke='%232de2e6' stroke-opacity='.5' stroke-width='1.6'/><path d='M34.1 34.1 L32.0 32.0' stroke='%232de2e6' stroke-opacity='.3' stroke-width='1'/><path d='M52.0 24.2 L49.0 19.0' stroke='%232de2e6' stroke-opacity='.5' stroke-width='1.6'/><path d='M69.6 13.7 L68.8 10.8' stroke='%232de2e6' stroke-opacity='.3' stroke-width='1'/></g><path d='M90 6 L96 17 L84 17 Z' fill='%23ff3864' opacity='.85'/><path d='M90 9 L93.5 16 L86.5 16 Z' fill='%23ff8fa8' opacity='.7'/><circle cx='118' cy='62' r='7' fill='%232de2e6' opacity='.18'/><circle cx='118' cy='62' r='3' fill='%239ff3f5' opacity='.9'/><circle cx='62' cy='120' r='5' fill='%23ff3864' opacity='.16'/><circle cx='62' cy='120' r='2.2' fill='%23ff8fa8' opacity='.85'/><path d='M90 90 L118 62' stroke='%232de2e6' stroke-opacity='.2' stroke-width='.8'/></svg>") center / contain no-repeat;
}

/* ═══ roundel sweep — a soft teal wedge turning inside the rings.
   steps(1): one posture per 2s (0.5 paints/s; not a continuous mover, so
   no will-change spent). Masked to die inside the outer ring. */
head meta:last-of-type::before {
  content: "";
  display: var(--netrunner-scenery, block);
  position: fixed;
  right: 2.2vw;
  top: 5vh;
  width: 170px;
  height: 170px;
  z-index: 0;
  pointer-events: none;
  opacity: 0.75;
  background: conic-gradient(from 0deg at 50% 50%,
    rgba(45, 226, 230, 0.28) 0deg, rgba(45, 226, 230, 0.10) 32deg,
    rgba(45, 226, 230, 0) 70deg 360deg);
  -webkit-mask-image: radial-gradient(circle at 50% 50%, #000 0 45%, transparent 46%);
  mask-image: radial-gradient(circle at 50% 50%, #000 0 45%, transparent 46%);
  animation: netrunner-sweep 24s steps(1, end) infinite;
}

/* ═══ grid readout — bottom-right AR data card floating over the city:
   grid id, coordinates, and the TRACE bar sitting at 12%. STATIC,
   promoted. (SVG text falls back to system mono — it is set dressing,
   not copy.) */
head meta:last-of-type::after {
  content: "";
  display: var(--netrunner-scenery, block);
  position: fixed;
  right: 1.6vw;
  bottom: 2.4vh;
  width: 250px;
  height: 100px;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  opacity: 0.92;
  background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 260 108'><defs><linearGradient id='gcard' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%230a2e38' stop-opacity='.62'/><stop offset='.5' stop-color='%2305191f' stop-opacity='.55'/><stop offset='1' stop-color='%23030f14' stop-opacity='.6'/></linearGradient></defs><rect x='1' y='1' width='258' height='106' rx='2' fill='url(%23gcard)' stroke='%232de2e6' stroke-opacity='.32' stroke-width='1.4'/><rect x='2.4' y='2.4' width='255.2' height='2' fill='%239ff3f5' fill-opacity='.14'/><g fill='none' stroke='%239ff3f5' stroke-opacity='.85' stroke-width='2'><path d='M2 12 L2 2 L12 2'/><path d='M258 12 L258 2 L248 2'/><path d='M2 96 L2 106 L12 106'/><path d='M258 96 L258 106 L248 106'/></g><circle cx='244' cy='14' r='2.4' fill='%232de2e6'/><circle cx='244' cy='14' r='4.5' fill='%232de2e6' fill-opacity='.25'/><text x='14' y='24' font-family='Courier New,monospace' font-size='12.5' letter-spacing='1' fill='%239ff3f5' fill-opacity='.95'>GRID 7497 // SECTOR K-9</text><line x1='14' y1='30' x2='232' y2='30' stroke='%232de2e6' stroke-opacity='.2' stroke-width='1'/><text x='14' y='44' font-family='Courier New,monospace' font-size='11' letter-spacing='1' fill='%232de2e6' fill-opacity='.6'>LAT 35.6595  LON 139.7005</text><rect x='14' y='50' width='232' height='26' fill='%23041318' fill-opacity='.5' stroke='%232de2e6' stroke-opacity='.24' stroke-width='.8'/><line x1='14' y1='63' x2='246' y2='63' stroke='%232de2e6' stroke-opacity='.16' stroke-width='.7'/><polyline points='16,63 30,63 36,55 42,71 48,59 54,63 74,63 82,53 90,73 98,63 120,63 126,57 132,69 138,61 144,63 168,63 176,56 184,70 192,63 214,63 220,59 226,67 232,63 246,63' fill='none' stroke='%235bf0f3' stroke-opacity='.8' stroke-width='1.3' stroke-linejoin='round'/><circle cx='246' cy='63' r='2' fill='%23eafcff'/><rect x='14' y='86' width='170' height='11' fill='none' stroke='%23ff3864' stroke-opacity='.5' stroke-width='1'/><g fill='%23ff3864' fill-opacity='.8'><rect x='16' y='88' width='6' height='7'/><rect x='24' y='88' width='6' height='7'/><rect x='32' y='88' width='6' height='7'/></g><g fill='%23ff3864' fill-opacity='.12'><rect x='40' y='88' width='6' height='7'/><rect x='48' y='88' width='6' height='7'/><rect x='56' y='88' width='6' height='7'/><rect x='64' y='88' width='6' height='7'/><rect x='72' y='88' width='6' height='7'/><rect x='80' y='88' width='6' height='7'/><rect x='88' y='88' width='6' height='7'/><rect x='96' y='88' width='6' height='7'/><rect x='104' y='88' width='6' height='7'/><rect x='112' y='88' width='6' height='7'/><rect x='120' y='88' width='6' height='7'/><rect x='128' y='88' width='6' height='7'/><rect x='136' y='88' width='6' height='7'/><rect x='144' y='88' width='6' height='7'/><rect x='152' y='88' width='6' height='7'/><rect x='160' y='88' width='6' height='7'/><rect x='168' y='88' width='6' height='7'/><rect x='176' y='88' width='6' height='7'/></g><text x='194' y='95' font-family='Courier New,monospace' font-size='11' fill='%23ff8fa8' fill-opacity='.85'>TRACE 12%25</text></svg>") center / contain no-repeat;
}

/* ═══ HUD micro-dot mesh + SPARKLE data-motes — the only fine pattern, so it
   RIDES THE ROLL (zero slide against tracked glyphs = zero flicker). The three
   fine dot meshes are the AR grain; layered under them, three COARSE soft glint
   blooms (>=60px) drift with the text as floating data-motes catching the visor
   light — coarse AND roll-riding = doubly L6-safe. Static. */
.credits-roll::before,
.credits-slideshow::before {
  content: "";
  display: var(--netrunner-scenery, block);
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.4;
  background-image:
    radial-gradient(circle at 30% 40%, rgba(45, 226, 230, 0.8) 0 1px, rgba(45, 226, 230, 0) 1.8px),
    radial-gradient(circle at 74% 16%, rgba(159, 243, 245, 0.6) 0 1px, rgba(159, 243, 245, 0) 1.8px),
    radial-gradient(circle at 12% 80%, rgba(255, 56, 100, 0.5) 0 1px, rgba(255, 56, 100, 0) 1.8px),
    radial-gradient(circle 34px at 18% 30%, rgba(159, 243, 245, 0.28), rgba(45, 226, 230, 0) 72%),
    radial-gradient(circle 30px at 82% 62%, rgba(224, 251, 252, 0.24), rgba(45, 226, 230, 0) 72%),
    radial-gradient(circle 26px at 60% 88%, rgba(255, 143, 168, 0.18), rgba(255, 56, 100, 0) 74%);
  background-size: 300px 300px, 260px 260px, 420px 420px, 760px 900px, 680px 820px, 900px 1040px;
}

/* ═══ the ledger: every block is a node handshake ═══ */
.credits-block,
.credits-slide:not(.flourish) { counter-increment: netrunner-node; }

/* duotone alternation — teal nodes, magenta nodes (intro is section 1, so
   the first block lands on even). Content-agnostic; custom types safe. */
.credits-block,
.credits-slide {
  --nr-title: var(--netrunner-teal);
  --nr-title-glow: rgba(45, 226, 230, 0.35);
  --nr-brk: rgba(45, 226, 230, 0.65);
}
.credits-block:nth-of-type(odd),
.credits-slide:nth-of-type(odd) {
  --nr-title: #ff6d8d;
  --nr-title-glow: rgba(255, 56, 100, 0.35);
  --nr-brk: rgba(255, 56, 100, 0.6);
}

/* ═══ glass panels — the AR cards the ledger renders on. Layered as real
   frosted glass: four L-brackets (bright rail + dim inner rail per corner),
   an inner border-glow that bleeds off the frame, a diagonal frosted sheen
   sweeping across the top, an edge-light gradient, and the base glass tint.
   The box-shadow does the volume: crisp top+left edge-light, a soft inner
   bottom shadow (glass has thickness), a deep drop shadow, and a wide teal
   ambient bloom so the panel sits IN the neon haze, not on top of black.
   Scroll mode panels the whole block; slideshow panels the list. */
.credits-block,
.credits-slide:not(.flourish) .credits-block__list {
  position: relative;
  box-sizing: border-box;
  width: min(46rem, 90vw);
  padding: 2.3rem 2.5rem 2.4rem;
  border-radius: 3px;
  background:
    /* corner brackets — bright outer rail */
    linear-gradient(var(--nr-brk), var(--nr-brk)) left top / 30px 2px no-repeat,
    linear-gradient(var(--nr-brk), var(--nr-brk)) left top / 2px 30px no-repeat,
    linear-gradient(var(--nr-brk), var(--nr-brk)) right top / 30px 2px no-repeat,
    linear-gradient(var(--nr-brk), var(--nr-brk)) right top / 2px 30px no-repeat,
    linear-gradient(var(--nr-brk), var(--nr-brk)) left bottom / 30px 2px no-repeat,
    linear-gradient(var(--nr-brk), var(--nr-brk)) left bottom / 2px 30px no-repeat,
    linear-gradient(var(--nr-brk), var(--nr-brk)) right bottom / 30px 2px no-repeat,
    linear-gradient(var(--nr-brk), var(--nr-brk)) right bottom / 2px 30px no-repeat,
    /* corner brackets — dim inner rail, insets the L a touch */
    linear-gradient(rgba(159,243,245,0.3), rgba(159,243,245,0.3)) 6px 6px / 18px 1px no-repeat,
    linear-gradient(rgba(159,243,245,0.3), rgba(159,243,245,0.3)) 6px 6px / 1px 18px no-repeat,
    /* inner border-glow bleeding inward from the frame edge (frosted refraction) */
    linear-gradient(180deg, rgba(45,226,230,0.15), rgba(45,226,230,0) 18%),
    /* SPARKLE: crisp specular streak — a bright glass highlight raking across the
       top-left, selling the pane's thickness (glass catching the visor light). This
       whole panel rides the roll (moves with the crawl) so the gleam is L6-safe. A
       hot narrow core + a soft twin gleam trailing it = the polished-glass sparkle. */
    linear-gradient(122deg, rgba(240,254,255,0) 8%, rgba(240,254,255,0.15) 12%, rgba(240,254,255,0.04) 15%, rgba(240,254,255,0) 19%),
    linear-gradient(122deg, rgba(224,251,252,0) 23%, rgba(224,251,252,0.05) 26%, rgba(224,251,252,0) 30%),
    /* diagonal frosted sheen — a soft glass highlight raking the top-left */
    linear-gradient(128deg, rgba(159,243,245,0.10) 0%, rgba(159,243,245,0.03) 18%, rgba(159,243,245,0) 36%),
    /* edge-light + base glass tint */
    linear-gradient(163deg, rgba(45, 226, 230, 0.10) 0%, rgba(45, 226, 230, 0.03) 22%, rgba(4, 16, 20, 0.50) 46%, rgba(3, 13, 18, 0.58) 76%, rgba(255, 56, 100, 0.05) 100%);
  border: 1px solid rgba(45, 226, 230, 0.28);
  box-shadow:
    inset 0 1px 0 rgba(159, 243, 245, 0.28),
    inset 1px 0 0 rgba(159, 243, 245, 0.12),
    inset 0 -18px 34px rgba(0, 6, 9, 0.38),
    0 18px 52px rgba(0, 4, 6, 0.55),
    0 0 60px rgba(45, 226, 230, 0.06);
}
.credits-slide:not(.flourish) .credits-block__list { margin-inline: auto; }
/* slideshow: pull the bracketed title down toward its panel */
.credits-slide:not(.flourish) .credits-block__title { margin-bottom: 0.5rem; }

/* ═══ titles: Chakra Petch caps inside AR corner brackets, with a mono
   node-counter eyebrow above (the handshake log line). */
.credits-block__title {
  position: relative;
  width: fit-content;
  max-width: 82vw;
  margin: 0 auto 1.6rem;
  padding: 0.4em 1em 0.36em;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-indent: 0.2em;
  color: var(--nr-title, var(--netrunner-teal));
  text-shadow: 0 0 18px var(--nr-title-glow, rgba(45, 226, 230, 0.35)), var(--credits-shadow);
  background:
    linear-gradient(var(--nr-brk), var(--nr-brk)) left top / 16px 2px no-repeat,
    linear-gradient(var(--nr-brk), var(--nr-brk)) left top / 2px 16px no-repeat,
    linear-gradient(var(--nr-brk), var(--nr-brk)) right top / 16px 2px no-repeat,
    linear-gradient(var(--nr-brk), var(--nr-brk)) right top / 2px 16px no-repeat,
    linear-gradient(var(--nr-brk), var(--nr-brk)) left bottom / 16px 2px no-repeat,
    linear-gradient(var(--nr-brk), var(--nr-brk)) left bottom / 2px 16px no-repeat,
    linear-gradient(var(--nr-brk), var(--nr-brk)) right bottom / 16px 2px no-repeat,
    linear-gradient(var(--nr-brk), var(--nr-brk)) right bottom / 2px 16px no-repeat;
}
.credits-block__title::after { display: none; }
.credits-block__title::before {
  content: "node " counter(netrunner-node, decimal-leading-zero) " // handshake ok";
  position: absolute;
  left: 50%;
  bottom: calc(100% + 0.6em);
  transform: translateX(-50%);
  font-family: var(--netrunner-mono);
  font-weight: 400;
  font-size: 0.64rem;
  letter-spacing: 0.32em;
  text-indent: 0.32em;
  text-transform: uppercase;
  white-space: nowrap;
  color: rgba(159, 243, 245, 0.7);
  text-shadow: var(--credits-shadow);
}

/* ═══ rows: names in Rajdhani (never clipped), amounts in mono chips. */
.credit {
  max-width: min(40rem, 86vw);
  margin-inline: auto;
  min-width: 0;
  overflow-wrap: anywhere;
  font-weight: 600;
  letter-spacing: 0.025em;
  line-height: 1.5;
}
.credit__name {
  color: var(--netrunner-ice);
  text-shadow: 0 0 14px rgba(45, 226, 230, 0.16), var(--credits-shadow);
}
.credit__amount {
  opacity: 1;
  font-family: var(--netrunner-mono);
  font-weight: 400;
  font-size: 0.68em;
  letter-spacing: 0.06em;
  color: #a7f6f8;
  background: rgba(45, 226, 230, 0.09);
  border: 1px solid rgba(45, 226, 230, 0.35);
  padding: 0.06em 0.5em 0.1em;
  margin-left: 0.75em;
  vertical-align: 0.12em;
  font-variant-numeric: tabular-nums;
  text-shadow: none;
}
.credit__amount::before {
  content: "+";
  margin: 0 0.3em 0 0;
  color: var(--netrunner-magenta);
  opacity: 0.9;
}

/* ═══ flourish cards ═══ */
.flourish--intro { gap: 1.2rem; }

/* badge -> uplink chip (copy swap via font-size:0 + ::after). A framed HUD
   chip: corner-bracket rails top-left + bottom-right, a live status LED, and
   an inner glow so it reads as a lit readout, not a plain outline. */
.flourish__badge { font-size: 0; border: 0; border-radius: 0; padding: 0; box-shadow: none; }
.flourish__badge::after {
  content: "◈ LINK ESTABLISHED — AR OVERLAY 2.6";
  display: inline-block;
  font-family: var(--netrunner-mono);
  font-size: 0.78rem;
  letter-spacing: 0.32em;
  padding: 0.58em 0.9em 0.58em 1.02em;
  color: var(--netrunner-teal);
  border: 1px solid rgba(45, 226, 230, 0.5);
  background:
    linear-gradient(var(--netrunner-teal-hi), var(--netrunner-teal-hi)) left top / 12px 1px no-repeat,
    linear-gradient(var(--netrunner-teal-hi), var(--netrunner-teal-hi)) left top / 1px 12px no-repeat,
    linear-gradient(var(--netrunner-teal-hi), var(--netrunner-teal-hi)) right bottom / 12px 1px no-repeat,
    linear-gradient(var(--netrunner-teal-hi), var(--netrunner-teal-hi)) right bottom / 1px 12px no-repeat,
    linear-gradient(180deg, rgba(45, 226, 230, 0.12), rgba(45, 226, 230, 0.04));
  box-shadow: 0 0 18px rgba(45, 226, 230, 0.2), inset 0 0 14px rgba(45, 226, 230, 0.08);
  text-shadow: 0 0 10px rgba(45, 226, 230, 0.5);
}

/* streamer's title: ice caps with a static chromatic split (magenta ghost
   left, teal ghost right — the visor mis-registering) over a brushed-chrome
   vertical gradient clipped to the glyphs, plus a layered neon bloom. The
   solid color remains as the fallback where background-clip:text is unsupported. */
.flourish__title {
  font-weight: 700;
  letter-spacing: 0.06em;
  line-height: 1.08;
  max-width: min(88vw, 16em);
  color: #f2feff;
  background: linear-gradient(178deg, #ffffff 0%, #eafcff 28%, #b8ebf0 52%, #f2feff 68%, #cdf2f5 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow:
    -2px 0 rgba(255, 56, 100, 0.42),
    2px 0 rgba(45, 226, 230, 0.48),
    0 0 20px rgba(159, 243, 245, 0.5),
    0 0 44px rgba(45, 226, 230, 0.32),
    var(--credits-shadow);
}

/* streamer tagline: restyle only — a mono comm line */
.flourish__tagline {
  font-family: var(--netrunner-mono);
  font-style: normal;
  font-size: 0.92rem;
  letter-spacing: 0.2em;
  text-indent: 0.2em;
  text-transform: lowercase;
  color: rgba(232, 251, 255, 0.75);
}

/* rating -> ICE warning chip (copy swap) */
.flourish__rating { font-size: 0; border: 0; padding: 0; opacity: 1; }
.flourish__rating::after {
  content: "ICE RATING: BLACK — RUN AT OWN RISK";
  display: inline-block;
  font-family: var(--netrunner-mono);
  font-size: 0.7rem;
  letter-spacing: 0.26em;
  padding: 0.5em 0.7em 0.5em 0.96em;
  color: #ff7d99;
  border: 1px solid rgba(255, 56, 100, 0.5);
  background: rgba(255, 56, 100, 0.06);
  text-shadow: 0 0 10px rgba(255, 56, 100, 0.4);
}

/* boot-log fine print under the intro card */
.flourish--intro::after {
  content: "biometrics nominal · trace 0.00% · uplink 7497";
  display: var(--netrunner-scenery, block);
  font-family: var(--netrunner-mono);
  font-size: 0.64rem;
  letter-spacing: 0.28em;
  text-indent: 0.28em;
  text-transform: lowercase;
  color: rgba(159, 243, 245, 0.45);
}

/* outro: JACK OUT / stay safe, runner (copy swaps) */
.flourish--outro .flourish__title { font-size: 0; max-width: none; }
.flourish--outro .flourish__title::after {
  content: "JACK OUT";
  white-space: nowrap;
  font-family: var(--credits-title-font);
  font-weight: 700;
  font-size: var(--credits-flourish-title-size);
  letter-spacing: 0.12em;
  text-indent: 0.12em;
  color: var(--netrunner-ice);
  background: linear-gradient(178deg, #ffffff 0%, #eafcff 28%, #b8ebf0 52%, #f2feff 68%, #cdf2f5 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow:
    -2px 0 rgba(255, 56, 100, 0.42),
    2px 0 rgba(45, 226, 230, 0.48),
    0 0 22px rgba(159, 243, 245, 0.52),
    0 0 50px rgba(45, 226, 230, 0.36),
    var(--credits-shadow);
}
.flourish--outro .flourish__tagline { font-size: 0; }
.flourish--outro .flourish__tagline::after {
  content: "stay safe, runner — link terminated";
  font-family: var(--netrunner-mono);
  font-size: 0.9rem;
  letter-spacing: 0.22em;
  text-indent: 0.22em;
  text-transform: lowercase;
  color: rgba(232, 251, 255, 0.72);
}
/* the sign-off chip under the tagline */
.flourish--outro::after {
  content: "CONNECTION CLOSED · 00 TRACES";
  font-family: var(--netrunner-mono);
  font-size: 0.66rem;
  letter-spacing: 0.3em;
  padding: 0.45em 0.6em 0.45em 0.9em;
  margin-top: 0.5rem;
  color: rgba(45, 226, 230, 0.75);
  border: 1px solid rgba(45, 226, 230, 0.4);
  text-shadow: 0 0 10px rgba(45, 226, 230, 0.35);
}

/* ═══ raid finale: INTRUSION DETECTED — the one place magenta takes the
   whole panel. Eyebrow swaps to the alarm line and blinks on steps(1) at
   ~1.1 paints/s (the only animation inside the roll; L5 ceiling is 2/s).
   Declared after the parity tints so it wins the cascade. */
.credits-block:nth-last-of-type(2),
.credits-slide:nth-last-of-type(2):not(.flourish) {
  --nr-title: #ff5d80;
  --nr-title-glow: rgba(255, 56, 100, 0.5);
  --nr-brk: rgba(255, 56, 100, 0.85);
}
.credits-block:nth-last-of-type(2),
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__list {
  border-color: rgba(255, 56, 100, 0.45);
  background:
    linear-gradient(var(--nr-brk), var(--nr-brk)) left top / 26px 2px no-repeat,
    linear-gradient(var(--nr-brk), var(--nr-brk)) left top / 2px 26px no-repeat,
    linear-gradient(var(--nr-brk), var(--nr-brk)) right bottom / 26px 2px no-repeat,
    linear-gradient(var(--nr-brk), var(--nr-brk)) right bottom / 2px 26px no-repeat,
    linear-gradient(165deg, rgba(255, 56, 100, 0.1) 0%, rgba(255, 56, 100, 0.03) 20%, rgba(16, 3, 8, 0.55) 45%, rgba(16, 3, 8, 0.6) 75%, rgba(45, 226, 230, 0.04) 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 143, 168, 0.2),
    0 14px 44px rgba(6, 0, 2, 0.55);
}
.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  content: "// intrusion detected //";
  color: #ff89a4;
  text-shadow: 0 0 12px rgba(255, 56, 100, 0.6), var(--credits-shadow);
  animation: netrunner-alarm 2.8s steps(1, end) infinite;
}
.credits-block:nth-last-of-type(2) .credit,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit {
  font-size: calc(var(--credits-name-size) * 1.1);
}
.credits-block:nth-last-of-type(2) .credit__name,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__name {
  text-shadow: 0 0 18px rgba(255, 56, 100, 0.35), var(--credits-shadow);
}
.credits-block:nth-last-of-type(2) .credit__amount,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__amount {
  color: #ffc3d1;
  border-color: rgba(255, 56, 100, 0.45);
  background: rgba(255, 56, 100, 0.1);
}
.credits-block:nth-last-of-type(2) .credit__amount::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__amount::before {
  color: var(--netrunner-teal);
}

/* ═══ slideshow: panels boot in — a small rise layered on the base fade */
.credits-slide {
  transform: translateY(10px);
  transition: opacity 0.7s ease, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}
.credits-slide.is-active { transform: none; }

/* ═══ keyframes (all netrunner- prefixed; transform/opacity ONLY) ═══ */
/* drone: small hover — 8px lift with a half-degree lean */
@keyframes netrunner-drone {
  0%   { transform: translate3d(0, 0, 0) rotate(0deg); }
  25%  { transform: translate3d(3px, -5px, 0) rotate(0.6deg); }
  50%  { transform: translate3d(0, -8px, 0) rotate(0deg); }
  75%  { transform: translate3d(-3px, -4px, 0) rotate(-0.6deg); }
  100% { transform: translate3d(0, 0, 0) rotate(0deg); }
}
/* nav light: two flips per 2.4s (~0.8 paints/s) */
@keyframes netrunner-navlight {
  0%, 45%   { opacity: 1; }
  50%, 95%  { opacity: 0.15; }
  100%      { opacity: 1; }
}
/* visor scan band: twelve held positions over 36s = one hop every 3s */
@keyframes netrunner-scan {
  0%    { transform: translate3d(-30vw, 0, 0); }
  8.3%  { transform: translate3d(-24vw, 0, 0); }
  16.6% { transform: translate3d(-18vw, 0, 0); }
  25%   { transform: translate3d(-12vw, 0, 0); }
  33.3% { transform: translate3d(-6vw, 0, 0); }
  41.6% { transform: translate3d(0, 0, 0); }
  50%   { transform: translate3d(6vw, 0, 0); }
  58.3% { transform: translate3d(12vw, 0, 0); }
  66.6% { transform: translate3d(18vw, 0, 0); }
  75%   { transform: translate3d(24vw, 0, 0); }
  83.3% { transform: translate3d(30vw, 0, 0); }
  91.6% { transform: translate3d(-30vw, 0, 0); }
  100%  { transform: translate3d(-30vw, 0, 0); }
}
/* roundel sweep: twelve postures per 24s = 0.5 paints/s */
@keyframes netrunner-sweep {
  0%    { transform: rotate(0deg); }
  8.3%  { transform: rotate(30deg); }
  16.6% { transform: rotate(60deg); }
  25%   { transform: rotate(90deg); }
  33.3% { transform: rotate(120deg); }
  41.6% { transform: rotate(150deg); }
  50%   { transform: rotate(180deg); }
  58.3% { transform: rotate(210deg); }
  66.6% { transform: rotate(240deg); }
  75%   { transform: rotate(270deg); }
  83.3% { transform: rotate(300deg); }
  91.6% { transform: rotate(330deg); }
  100%  { transform: rotate(360deg); }
}
/* the flyby: nine teleport hops right-to-left across the upper sky in
   ~5s (2% of 27s per hop ≈ 1.85 hops/s), dark the other 22 seconds. A
   half-vh sag across the crossing reads as the AV banking down-lane. */
@keyframes netrunner-flyby {
  0%, 79%   { transform: translate3d(0, 0, 0); opacity: 0; }
  80%       { transform: translate3d(-12vw, 0, 0); opacity: 0.9; }
  82%       { transform: translate3d(-24vw, 0.1vh, 0); opacity: 0.95; }
  84%       { transform: translate3d(-36vw, 0.2vh, 0); opacity: 0.95; }
  86%       { transform: translate3d(-48vw, 0.3vh, 0); opacity: 0.9; }
  88%       { transform: translate3d(-60vw, 0.4vh, 0); opacity: 0.85; }
  90%       { transform: translate3d(-72vw, 0.5vh, 0); opacity: 0.8; }
  92%       { transform: translate3d(-84vw, 0.6vh, 0); opacity: 0.7; }
  94%       { transform: translate3d(-96vw, 0.7vh, 0); opacity: 0.55; }
  96%       { transform: translate3d(-108vw, 0.8vh, 0); opacity: 0.4; }
  98%, 100% { transform: translate3d(0, 0, 0); opacity: 0; }
}
/* intrusion alarm: three dips per 2.8s (~1.1 paints/s, L5-legal) */
@keyframes netrunner-alarm {
  0%, 50%   { opacity: 1; }
  54%, 68%  { opacity: 0.4; }
  72%, 88%  { opacity: 1; }
  92%, 98%  { opacity: 0.55; }
  100%      { opacity: 1; }
}

/* ═══ reduced motion: the HUD holds — drone parks mid-hover with its nav
   light on, the scan band hangs mid-glass, the sweep freezes mid-bearing,
   the alarm burns steady. All parked VISIBLE. */
@media (prefers-reduced-motion: reduce) {
  head::before,
  head::after { animation: none; }
  body::before { animation: none; }
  link:first-of-type::after { animation: none; opacity: 0; }
  head meta:last-of-type::before { animation: none; transform: rotate(210deg); }
  .credits-block:nth-last-of-type(2) .credits-block__title::before,
  .credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
    animation: none;
  }
  .credits-slide { transform: none; transition: opacity 0.8s ease; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--netrunner-scenery:none;}",
};
