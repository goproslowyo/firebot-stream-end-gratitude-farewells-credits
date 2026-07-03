import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. Melodic — Sunrise Set: the 6am closing set on a hillside — lowercase names drifting up a dawn sky past sleeping teal hills, a silhouetted crowd with hands raised to the light, and two lantern orbs, toward a sun that is almost up. */
export const VARIANT: ThemeVariant = {
  key: "melodic",
  name: "Melodic — Sunrise Set",
  css: `/* ================================================================
   MELODIC — SUNRISE SET (layered AFTER the base sheet)
   Fiction: the 6am organic/progressive-house closer on a hillside.
   Indigo-teal night low in the sky warming through rose to a pale
   peach sun halo; hills sleep in translucent teal; the crowd stands
   silhouetted on the foreground crest, hands raised to the light;
   two soft orbs drift up — lanterns the crowd has let go. Serenity
   IS the perf budget: there
   are NO fine-grained patterns anywhere — every scenery feature is
   a coarse soft blob/gradient (L6c), so nothing can flicker over
   tracked glyphs. The only continuous motion is the two small
   promoted orbs (the L2 small-mover budget, both under 300px).
   Transparent collapse is ONE line (see transparentOverride):
   :root { --credits-bg: transparent; --melodic-scenery: none; }
   ================================================================ */
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@200;300;400;600&family=Quicksand:wght@400;500;600&display=swap');

:root {
  /* ── palette ── */
  --melodic-scenery: block; /* set to none to strip every scenery layer */
  --melodic-deep: #0d1b2e;
  --melodic-teal: #1b4b5a;
  --melodic-peach: #e8a87c;
  --melodic-sun: #f6d5b8;
  --melodic-rose: #c96d6e;
  --melodic-ink: #fff8f0;

  /* ── base hooks ── */
  /* Cheap sky: ONE linear gradient, six stops — violet-indigo zenith
     cooling through indigo/deep blue into teal, warming at the horizon
     (L3: root background stays a simple gradient; the peach dawn stack
     lives on the PROMOTED html::before). */
  --credits-bg: linear-gradient(180deg, #251a41 0%, #1d1e3f 15%, #152a4a 35%, #123f57 58%, #1b4b5a 78%, #2e5964 100%);
  --credits-color: var(--melodic-ink);
  --credits-accent: var(--melodic-peach);
  --credits-font: "Quicksand", "Avenir Next", "Segoe UI", "Trebuchet MS", sans-serif;
  --credits-title-font: "Josefin Sans", "Futura", "Century Gothic", "Gill Sans", sans-serif;
  --credits-title-size: clamp(1.3rem, 3.4vw, 2rem);
  --credits-name-size: clamp(1.05rem, 2.7vw, 1.6rem);
  --credits-flourish-title-size: clamp(2.4rem, 7.5vw, 4.6rem);
  --credits-block-gap: 5.5rem;  /* spacious — the set breathes */
  --credits-name-gap: 0.85rem;
  --credits-shadow: 0 1px 14px rgba(6, 14, 24, 0.55);
  /* gentle STATIC warm glow on titles (never animated; never "none") */
  --credits-glow: 0 0 26px rgba(232, 168, 124, 0.32);
}

/* ═══ canvas split: sky paints once on <html>, unmasked; body KEEPS the
   base edge-fade so names still ease in at the horizon and out at the top. */
html { -webkit-mask-image: none; mask-image: none; }
body { background: transparent; }

/* ═══ dawn atmosphere: everything the SKY itself wears, painted on the
   promoted (translateZ(0)) fixed html::before so the base sheet reads UNDER
   it. Coarse, soft, STATIC scenery washes; all features are hundreds of px
   with long low-alpha falloffs — no fine pattern anywhere near the center
   lane (L6c). The LAST listed paints on TOP.
     • high cirrus veil — kills the dead upper sky: soft warm-grey wisps
       drifting across the zenith, catching the first light.
     • god-rays — wide, soft, low-alpha wedges fanning UP and LEFT from the
       sun's position (66% x, low): the atmosphere made visible. Skewed tall
       ellipses read as light shafts; faint so glyphs never fight them.
     • aerial haze band — a luminous desaturated horizon stratum (aerial
       perspective: the far air goes pale where sky meets land).
     • rose dawn dome — the pre-sun blush, broad and soft, leaning toward the
       sun, cooling to plum at its crown.
     • horizon warmth wash — the low sky warming from plum into peach. */
html::before {
  content: "";
  display: var(--melodic-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* high cirrus veil — soft warm wisps across the dead upper sky */
    radial-gradient(ellipse 60% 5% at 34% 15%, rgba(214, 196, 216, 0.10) 0%, rgba(214, 196, 216, 0.05) 46%, rgba(214, 196, 216, 0) 78%),
    radial-gradient(ellipse 52% 4% at 68% 10%, rgba(224, 200, 210, 0.08) 0%, rgba(224, 200, 210, 0.035) 48%, rgba(224, 200, 210, 0) 80%),
    radial-gradient(ellipse 46% 3.4% at 20% 23%, rgba(206, 190, 214, 0.07) 0%, rgba(206, 190, 214, 0) 74%),
    /* god-rays — a TRUE crepuscular fan built from a single conic-gradient
       centred on the sun (66.5% x, 55% y). Radial soft wedges genuinely
       radiate FROM the disc instead of the old parallel vertical smears, so
       the light finally has an origin. The wedges are wide and low-alpha with
       long soft transitions (coarse, static, screen-fixed = L6c-legal — no
       fine pattern), and a vertical mask fades the whole fan out below the
       horizon and up toward the zenith so the shafts read as sky-borne light
       climbing out of the dawn rather than ruled stripes. */
    /* broad warm updraught glow rooting the fan just above the disc */
    radial-gradient(ellipse 30% 34% at 66.5% 60%, rgba(255, 228, 186, 0.16) 0%, rgba(255, 228, 186, 0.06) 46%, rgba(255, 228, 186, 0) 80%),
    /* aerial haze band — a luminous horizon stratum WARMED by the sun: peach
       and brighter on the sun's side (right), cooling to pale blue-grey far
       from it (left), so the air reads as dawn-lit rather than a grey smear */
    radial-gradient(ellipse 70% 15% at 70% 79%, rgba(248, 204, 168, 0.24) 0%, rgba(248, 204, 168, 0.1) 44%, rgba(248, 204, 168, 0) 76%),
    radial-gradient(ellipse 80% 15% at 26% 77%, rgba(178, 176, 196, 0.16) 0%, rgba(178, 176, 196, 0.07) 44%, rgba(178, 176, 196, 0) 76%),
    /* rose dawn dome lifting off the horizon, leaning toward the sun */
    radial-gradient(ellipse 108% 66% at 62% 104%, rgba(248, 216, 186, 0.50) 0%, rgba(240, 186, 144, 0.36) 24%, rgba(210, 122, 114, 0.24) 48%, rgba(152, 90, 120, 0.14) 66%, rgba(152, 90, 120, 0) 82%),
    /* horizon warmth wash */
    linear-gradient(180deg, rgba(13, 27, 46, 0) 38%, rgba(122, 74, 94, 0.18) 68%, rgba(232, 168, 124, 0.24) 100%);
}

/* ═══ the hero plane: sleeping hills, the sun that is almost up, volumetric
   clouds and the hillside crowd — all on the promoted, static html::after.
   FIVE depth reads with aerial perspective: far ridge lightest/coolest/haziest,
   mid ridge sleeping teal, near ridge deep ink, a hazier FAR crowd row, and
   the near CROWD on the foreground crest.

   THE CROWD is one SVG band — believable head-and-shoulder silhouettes (not
   snowmen): each figure is a small head over a torso that flares to the
   shoulders. A hazier, lighter back row sits behind for depth. A few arms
   lift to the light, one couple leans together, and one figure holds a small
   lantern up — it is where the drifting orbs come from. Sun-facing (right)
   crowns carry a warm rim-light arc, brightest nearest the sun and fading
   left; these fine strokes ride the crowd crest at the very bottom band, OUT
   of the readable center lane (L6). Silhouettes are solid ink; features are
   tens of px; the whole thing paints once.

   THE SUN is built for real volume now: a wide graduated CORONA glow, then a
   crisp hot DISC with a burning upper rim, then a flattened specular KISS
   where the disc crests the mid ridge. It paints UNDER the near ridge and
   crowd (which silhouette across its lower half) and OVER the mid/far ridges,
   so the light has a committed direction and the text lane never fights it.

   THE CLOUDS are volumetric trios — a shadowed slate crown, a warm lit
   underbelly catching the sun, and a thin bright under-rim — soft >=8px
   features, low alpha, L6c-coarse — crossing in front of the corona, plus a
   far pale pair low-left for balance. Painter's order: nearest first (top). */
html::after {
  content: "";
  display: var(--melodic-scenery, block);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 46vh;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* the hillside crowd, watching the sun come up (nearest plane) */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 220' preserveAspectRatio='none'%3E%3Cg fill='%230a1a28' opacity='.5'%3E%3Cpath d='M120 150c-10 0-16 8-16 20v50h32v-50c0-12-6-20-16-20z'/%3E%3Ccircle cx='120' cy='140' r='11'/%3E%3Cpath d='M210 152c-11 0-18 8-18 22v46h36v-46c0-14-7-22-18-22z'/%3E%3Ccircle cx='210' cy='142' r='11'/%3E%3Cpath d='M470 150c-10 0-17 8-17 21v49h34v-49c0-13-7-21-17-21z'/%3E%3Ccircle cx='470' cy='140' r='11'/%3E%3Cpath d='M690 154c-10 0-16 7-16 19v47h32v-47c0-12-6-19-16-19z'/%3E%3Ccircle cx='690' cy='144' r='10'/%3E%3Cpath d='M900 152c-11 0-17 8-17 21v47h34v-47c0-13-6-21-17-21z'/%3E%3Ccircle cx='900' cy='142' r='11'/%3E%3Cpath d='M1140 152c-10 0-17 8-17 21v47h34v-47c0-13-7-21-17-21z'/%3E%3Ccircle cx='1140' cy='142' r='11'/%3E%3Cpath d='M1380 150c-11 0-18 8-18 22v48h36v-48c0-14-7-22-18-22z'/%3E%3Ccircle cx='1380' cy='140' r='11'/%3E%3Cpath d='M1600 152c-10 0-17 8-17 21v47h34v-47c0-13-7-21-17-21z'/%3E%3Ccircle cx='1600' cy='142' r='11'/%3E%3Cpath d='M1780 150c-11 0-18 8-18 22v48h36v-48c0-14-7-22-18-22z'/%3E%3Ccircle cx='1780' cy='140' r='11'/%3E%3C/g%3E%3Cg fill='%23050e18'%3E%3Cpath d='M70 168c-14 0-22 11-22 27v25h44v-25c0-16-8-27-22-27z'/%3E%3Ccircle cx='70' cy='154' r='15'/%3E%3Cpath d='M168 172c-13 0-21 10-21 26v22h42v-22c0-16-8-26-21-26z'/%3E%3Ccircle cx='168' cy='158' r='14'/%3E%3Cpath d='M264 162c-15 0-24 11-24 29v27h48v-27c0-18-9-29-24-29z'/%3E%3Ccircle cx='264' cy='146' r='16'/%3E%3Cpath d='M262 148c-3-4-4-9-3-14l-13-30c-2-4 0-8 4-10 4-2 8 0 10 4l14 32z' /%3E%3Ccircle cx='274' cy='96' r='7'/%3E%3Cpath d='M360 172c-13 0-21 10-21 26v22h42v-22c0-16-8-26-21-26z'/%3E%3Ccircle cx='360' cy='158' r='14'/%3E%3Cpath d='M452 166c-14 0-23 11-23 28v26h46v-26c0-17-9-28-23-28z'/%3E%3Ccircle cx='452' cy='151' r='15'/%3E%3Cpath d='M548 174c-13 0-20 10-20 25v21h40v-21c0-15-7-25-20-25z'/%3E%3Ccircle cx='548' cy='160' r='13'/%3E%3Cpath d='M636 170c-13 0-21 10-21 26v24h42v-24c0-16-8-26-21-26z'/%3E%3Ccircle cx='636' cy='156' r='14'/%3E%3Cpath d='M726 176c-12 0-19 9-19 24v20h38v-20c0-15-7-24-19-24z'/%3E%3Ccircle cx='726' cy='162' r='13'/%3E%3Cpath d='M812 172c-13 0-21 10-21 26v22h42v-22c0-16-8-26-21-26z'/%3E%3Ccircle cx='812' cy='158' r='14'/%3E%3Cpath d='M905 168c-14 0-22 11-22 27v24h44v-24c0-16-8-27-22-27z'/%3E%3Ccircle cx='905' cy='153' r='15'/%3E%3Cpath d='M998 174c-12 0-20 9-20 24v20h40v-20c0-15-8-24-20-24z'/%3E%3Ccircle cx='998' cy='160' r='13'/%3E%3Cpath d='M1088 170c-13 0-21 10-21 26v24h42v-24c0-16-8-26-21-26z'/%3E%3Ccircle cx='1088' cy='156' r='14'/%3E%3Cpath d='M1180 166c-14 0-23 11-23 28v26h46v-26c0-17-9-28-23-28z'/%3E%3Ccircle cx='1180' cy='151' r='15'/%3E%3Cpath d='M1268 172c-13 0-21 10-21 26v22h42v-22c0-16-8-26-21-26z'/%3E%3Ccircle cx='1268' cy='158' r='14'/%3E%3Cpath d='M1352 164c-15 0-24 11-24 29v26h48v-26c0-18-9-29-24-29z'/%3E%3Ccircle cx='1352' cy='148' r='16'/%3E%3Cpath d='M1350 150c-3-4-4-9-3-14l-13-30c-2-4 0-8 4-10 4-2 8 0 10 4l14 32z'/%3E%3Ccircle cx='1338' cy='98' r='7'/%3E%3Cpath d='M1430 168c-2-5-2-10 0-15l-6-32c-1-5 2-8 6-9 4-1 8 2 9 6l7 34z'/%3E%3Ccircle cx='1442' cy='100' r='7'/%3E%3Cpath d='M1440 170c-14 0-22 11-22 27v24h44v-24c0-16-8-27-22-27z'/%3E%3Ccircle cx='1440' cy='155' r='15'/%3E%3Cpath d='M1524 174c-13 0-20 10-20 25v21h40v-21c0-15-7-25-20-25z'/%3E%3Ccircle cx='1524' cy='160' r='13'/%3E%3Cpath d='M1560 158c-12 0-19 9-19 24v38h38v-38c0-15-7-24-19-24z'/%3E%3Ccircle cx='1560' cy='144' r='14'/%3E%3Cpath d='M1594 160c-12 0-19 9-19 23v37h38v-37c0-14-7-23-19-23z'/%3E%3Ccircle cx='1596' cy='146' r='13'/%3E%3Cpath d='M1596 148c14-2 22 4 26 12' fill='none' stroke='%23050e18' stroke-width='11' stroke-linecap='round'/%3E%3Cpath d='M1676 170c-13 0-21 10-21 26v24h42v-24c0-16-8-26-21-26z'/%3E%3Ccircle cx='1676' cy='156' r='14'/%3E%3Cpath d='M1662 158c-2-5-1-10 2-14l-4-33c-1-5 2-8 6-8 5-1 8 2 8 7l3 34z'/%3E%3Ccircle cx='1652' cy='104' r='7'/%3E%3Cpath d='M1760 174c-13 0-20 10-20 25v21h40v-21c0-15-7-25-20-25z'/%3E%3Ccircle cx='1760' cy='160' r='13'/%3E%3Cpath d='M1850 168c-14 0-22 11-22 27v25h44v-25c0-16-8-27-22-27z'/%3E%3Ccircle cx='1850' cy='153' r='15'/%3E%3Cpath d='M1868 154c2-5 6-9 11-10l24-18c4-3 8-2 10 2 2 4 1 8-3 10l-26 20z'/%3E%3Ccircle cx='1908' cy='120' r='7'/%3E%3C/g%3E%3Ccircle cx='1908' cy='120' r='13' fill='%23ffca90' opacity='.2'/%3E%3Ccircle cx='1908' cy='120' r='4.5' fill='%23ffe0b4' opacity='.9'/%3E%3Cg fill='none' stroke='%23ffd2a6' stroke-linecap='round'%3E%3Cpath d='M1338 88 A11 11 0 0 1 1349 99' stroke-width='2.5' opacity='.5'/%3E%3Cpath d='M1352 138 A16 16 0 0 1 1368 154' stroke-width='2.6' opacity='.52'/%3E%3Cpath d='M1442 90 A11 11 0 0 1 1453 101' stroke-width='2.5' opacity='.5'/%3E%3Cpath d='M1440 145 A15 15 0 0 1 1455 160' stroke-width='2.6' opacity='.5'/%3E%3Cpath d='M1524 150 A13 13 0 0 1 1537 163' stroke-width='2.4' opacity='.46'/%3E%3Cpath d='M1560 134 A14 14 0 0 1 1574 148' stroke-width='2.4' opacity='.5'/%3E%3Cpath d='M1596 136 A13 13 0 0 1 1609 149' stroke-width='2.3' opacity='.46'/%3E%3Cpath d='M1676 146 A14 14 0 0 1 1690 160' stroke-width='2.4' opacity='.44'/%3E%3Cpath d='M1652 96 A7 7 0 0 1 1659 103' stroke-width='2.2' opacity='.44'/%3E%3Cpath d='M1760 150 A13 13 0 0 1 1773 163' stroke-width='2.3' opacity='.42'/%3E%3Cpath d='M1850 143 A15 15 0 0 1 1865 158' stroke-width='2.5' opacity='.5'/%3E%3Cpath d='M1180 141 A15 15 0 0 1 1195 156' stroke-width='2.3' opacity='.34'/%3E%3Cpath d='M1088 146 A14 14 0 0 1 1102 160' stroke-width='2.2' opacity='.3'/%3E%3Cpath d='M905 143 A15 15 0 0 1 920 158' stroke-width='2.2' opacity='.26'/%3E%3C/g%3E%3C/svg%3E") left bottom / 100% 220px no-repeat,
    /* ground mist catching the dawn */
    linear-gradient(to top, rgba(246, 213, 184, 0.10), rgba(246, 213, 184, 0) 30%),
    /* near ridge — deep ink-teal (closest, darkest) */
    radial-gradient(ellipse 120% 94% at 26% 170%, rgba(9, 25, 37, 0.94) 0 96.5%, rgba(9, 25, 37, 0) 100%),
    radial-gradient(ellipse 110% 96% at 82% 176%, rgba(8, 23, 35, 0.92) 0 96.5%, rgba(8, 23, 35, 0) 100%),
    /* CLOUDS — rebuilt as real volumetric masses instead of ruled thin lines.
       Each cloud is TALL enough to model (rounded, not a hairline) and built
       from three offset lobes: a cool SHADOWED CROWN on top, a warm LIT
       UNDERBELLY nudged down+toward the sun, and a thin bright UNDER-RIM
       catching the dawn — the vertical offset between crown and belly is what
       makes it read as cumulus volume rather than a horizontal smear. Soft
       >=8px features, low alpha, L6c-coarse. Painter's order per cloud: rim,
       belly, crown (crown on top). Nearest/biggest first.

       Cloud A — the big lit anvil drifting left of the sun, over the corona */
    radial-gradient(ellipse 30% 3.4% at 48% 52.6%, rgba(255, 214, 172, 0.16) 0 60%, rgba(255, 214, 172, 0) 100%),
    radial-gradient(ellipse 26% 5.2% at 47% 49.6%, rgba(255, 196, 150, 0.30) 0 58%, rgba(255, 196, 150, 0) 100%),
    radial-gradient(ellipse 30% 6.6% at 46% 46.2%, rgba(52, 42, 78, 0.44) 0 60%, rgba(52, 42, 78, 0) 100%),
    /* Cloud B — a fat cloud upper-left, cooler + lower-contrast (aerial depth) */
    radial-gradient(ellipse 20% 2.8% at 26% 30.4%, rgba(250, 196, 154, 0.14) 0 60%, rgba(250, 196, 154, 0) 100%),
    radial-gradient(ellipse 18% 4.6% at 25% 27.6%, rgba(248, 186, 144, 0.24) 0 58%, rgba(248, 186, 144, 0) 100%),
    radial-gradient(ellipse 21% 5.8% at 24.5% 24.6%, rgba(48, 40, 72, 0.38) 0 60%, rgba(48, 40, 72, 0) 100%),
    /* Cloud C — a small high cloudlet right-of-zenith, farthest + haziest */
    radial-gradient(ellipse 14% 2.2% at 72% 17.2%, rgba(246, 188, 146, 0.12) 0 60%, rgba(246, 188, 146, 0) 100%),
    radial-gradient(ellipse 13% 3.6% at 71.5% 14.8%, rgba(244, 180, 138, 0.2) 0 58%, rgba(244, 180, 138, 0) 100%),
    radial-gradient(ellipse 15% 4.4% at 71% 12.6%, rgba(46, 38, 70, 0.3) 0 60%, rgba(46, 38, 70, 0) 100%),
    /* Cloud D — left horizon cloud bank, a broad rounded mound balancing the
       sun's weight: lit underside, cool crown, low far sliver */
    radial-gradient(ellipse 22% 4.4% at 20% 64.0%, rgba(230, 180, 158, 0.16) 0 58%, rgba(230, 180, 158, 0) 100%),
    radial-gradient(ellipse 24% 7.0% at 18.5% 60.0%, rgba(46, 40, 70, 0.32) 0 60%, rgba(46, 40, 70, 0) 100%),
    radial-gradient(ellipse 30% 2.2% at 23% 66.8%, rgba(238, 188, 160, 0.1) 0 60%, rgba(238, 188, 160, 0) 100%),
    /* Cloud E — a low soft shelf FAR right of the sun (pulled clear of the
       disc so it never crosses the sun's face), catching the sun's side-light */
    radial-gradient(ellipse 18% 3.0% at 90% 66.0%, rgba(246, 194, 156, 0.13) 0 58%, rgba(246, 194, 156, 0) 100%),
    radial-gradient(ellipse 20% 5.2% at 91% 62.6%, rgba(44, 38, 68, 0.24) 0 60%, rgba(44, 38, 68, 0) 100%),
    /* reflected sun-path — the disc's light broken on the ground mist: FLAT
       low glints running down-and-under the disc on its own axis (66.5% x),
       kept deliberately faint and thin so they read as shimmer on the haze,
       NEVER as a rival disc. (The old bright specular pool that competed with
       the hero sun is gone — there is exactly ONE sun now.) */
    radial-gradient(ellipse 13vmin 0.8vmin at 66.5% 72%, rgba(255, 226, 188, 0.10) 0%, rgba(255, 226, 188, 0) 74%),
    radial-gradient(ellipse 8vmin 0.7vmin at 66.5% 67%, rgba(255, 230, 192, 0.14) 0%, rgba(255, 230, 192, 0) 72%),
    /* sun-base kiss — a compact FLATTENED warm burn hugging the disc's foot
       where it meets the ridge crest, so the disc reads as SITTING ON the
       horizon. Wide and thin (not round) and dimmer than the core, so it
       merges into the disc rather than reading as a second light. */
    radial-gradient(ellipse 8vmin 1.2vmin at 66.5% 57.6%, rgba(255, 238, 210, 0.3) 0%, rgba(255, 216, 176, 0.11) 48%, rgba(255, 216, 176, 0) 78%),
    /* SUN LENS-FLARE glints — a string of COARSE soft warm ghosts strung along
       the sun's flare axis (up-left of the disc, into the sky), the tell of a
       lens catching a bright sun. Each is a big soft blob (>=40px, gaussian
       falloff) — static, and set OFF the center text lane (the disc lives at
       66.5% x, low; these climb up-left of it into open right-of-centre sky),
       so they are L6c-legal specular shine, never fine screen-fixed twinkles. */
    radial-gradient(circle 2.6vmin at 62% 45%, rgba(255, 244, 224, 0.22) 0%, rgba(255, 232, 200, 0.08) 46%, rgba(255, 232, 200, 0) 78%),
    radial-gradient(circle 1.7vmin at 58.5% 40%, rgba(255, 240, 214, 0.16) 0%, rgba(255, 226, 190, 0) 74%),
    radial-gradient(circle 3.4vmin at 54% 34%, rgba(255, 236, 206, 0.12) 0%, rgba(255, 222, 184, 0) 76%),
    radial-gradient(circle 1.3vmin at 71% 60%, rgba(255, 240, 216, 0.18) 0%, rgba(255, 226, 192, 0) 72%),
    /* sun crown — a soft warm specular kiss centred on the disc's upper cap
       (a highlight, NOT a full ring), giving the disc a lit top */
    radial-gradient(ellipse 4vmin 2.6vmin at 66.5% 49%, rgba(255, 248, 234, 0.42) 0%, rgba(255, 236, 208, 0.16) 44%, rgba(255, 236, 208, 0) 72%),
    /* sun disc — a committed GOLDEN rising sun: an amber-warm body all the way
       through (NO cold white-blue), bright and saturated so it dominates any
       morning haze crossing it and unmistakably reads as THE sun — the single
       warmest, brightest thing in the frame. Outer stops feather long for a
       soft haze-diffused edge (no hard coin). At 52% (viewport ~78%), cresting
       the far ridge clear of the crowd. */
    radial-gradient(circle 8.6vmin at 66.5% 52%, rgba(255, 250, 238, 1) 0 30%, rgba(255, 236, 200, 1) 46%, rgba(255, 214, 164, 0.95) 58%, rgba(250, 190, 138, 0.58) 70%, rgba(246, 176, 124, 0.2) 84%, rgba(246, 176, 124, 0) 100%),
    /* tight inner corona — a dense warm bloom hugging the disc so its glow
       overrides the cool haze band that drifts across it (keeps the disc read
       as a glowing SUN, not a moon behind cloud) */
    radial-gradient(circle 15vmin at 66.5% 52.6%, rgba(255, 216, 172, 0.5) 0%, rgba(252, 196, 148, 0.3) 34%, rgba(246, 176, 128, 0.12) 62%, rgba(246, 176, 128, 0) 92%),
    /* sun corona — a wide graduated GOLDEN bloom melting into sky (no hard edge) */
    radial-gradient(circle 38vmin at 66.5% 53.4%, rgba(255, 220, 180, 0.42) 0%, rgba(248, 196, 150, 0.26) 24%, rgba(240, 172, 122, 0.14) 50%, rgba(234, 160, 114, 0.05) 76%, rgba(234, 160, 114, 0) 100%),
    /* mid ridge — sleeping teal */
    radial-gradient(ellipse 95% 88% at 10% 140%, rgba(30, 78, 94, 0.64) 0 96%, rgba(30, 78, 94, 0) 100%),
    radial-gradient(ellipse 88% 90% at 94% 146%, rgba(27, 72, 88, 0.60) 0 96%, rgba(27, 72, 88, 0) 100%),
    /* far ridge — lighter, cooler, hazier (farthest) */
    radial-gradient(ellipse 80% 92% at 30% 120%, rgba(100, 150, 162, 0.36) 0 95%, rgba(100, 150, 162, 0) 100%),
    radial-gradient(ellipse 70% 92% at 74% 124%, rgba(92, 142, 156, 0.32) 0 95%, rgba(92, 142, 156, 0) 100%);
}

/* ═══ dawn lane: center-column readability scrim — the sun halo sits exactly
   behind the name column, so the lane gets a quiet teal-ink wash. Coarse,
   soft, STATIC (screen-fixed is fine per L6c). A vertical mask releases the
   scrim over the horizon band, where names have already edge-faded, so the
   cresting sun keeps its heat. */
body::before {
  content: "";
  display: var(--melodic-scenery, block);
  position: fixed;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(90deg,
    rgba(9, 21, 33, 0) 6%, rgba(9, 21, 33, 0.34) 28%, rgba(9, 21, 33, 0.46) 50%,
    rgba(9, 21, 33, 0.34) 72%, rgba(9, 21, 33, 0) 94%);
  -webkit-mask-image: linear-gradient(180deg, #fff 0 72%, rgba(255, 255, 255, 0.3) 86%, rgba(255, 255, 255, 0) 100%);
  mask-image: linear-gradient(180deg, #fff 0 72%, rgba(255, 255, 255, 0.3) 86%, rgba(255, 255, 255, 0) 100%);
}

/* ═══ lantern orbs — the ONLY continuous movers (L2 small-element budget:
   two layers, both < 300px, both promoted). transform/opacity only; they
   drift up the side lanes, never parked over the text column. body::after
   is z:-1 so it rides UNDER the lane scrim and the names. */
body::after {
  content: "";
  display: var(--melodic-scenery, block);
  position: fixed;
  left: 7vw;
  bottom: -4vh;
  width: 230px;
  height: 250px;
  z-index: -1;
  pointer-events: none;
  opacity: 0;
  /* bokeh falloff: no plateau edge — a gaussian-ish fade so it reads as an
     out-of-focus lantern, not a disc. A crisp warm SPECULAR GLEAM sits on the
     upper-left shoulder (paper catching the sun's light) — it is baked into the
     orb gradient so it travels WITH the mover (L6b: rides the element, never a
     screen-fixed twinkle). A dimmer counter-glint anchors the lower-right. */
  background:
    radial-gradient(circle at 41% 37%, rgba(255, 250, 240, 0.5) 0%, rgba(255, 240, 218, 0.18) 5%, rgba(255, 240, 218, 0) 12%),
    radial-gradient(circle at 38% 42%, rgba(255, 228, 200, 0.26) 0%, rgba(250, 214, 182, 0.20) 26%, rgba(244, 196, 158, 0.10) 48%, rgba(244, 196, 158, 0.04) 62%, rgba(244, 196, 158, 0) 76%),
    radial-gradient(circle at 72% 74%, rgba(232, 168, 124, 0.14) 0%, rgba(232, 168, 124, 0.06) 30%, rgba(232, 168, 124, 0) 54%);
  will-change: transform;
  animation: melodic-orb-a 34s ease-in-out infinite;
}

/* Second orb lives on the one other layer OUTSIDE body (vhs's <head> trick):
   opting head in as a render node shows nothing (UA sheet keeps its children
   display:none) but unlocks head::before — unmasked, so its keyframes carry
   their own fade-out before it reaches the top edge. */
head { display: var(--melodic-scenery, block); }
head::before {
  content: "";
  display: var(--melodic-scenery, block);
  position: fixed;
  right: 9vw;
  bottom: -2vh;
  width: 170px;
  height: 190px;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  background:
    /* specular gleam on the paper (rides the mover — L6b) */
    radial-gradient(circle at 44% 40%, rgba(255, 250, 240, 0.42) 0%, rgba(255, 240, 218, 0.14) 6%, rgba(255, 240, 218, 0) 13%),
    radial-gradient(circle at 50% 50%, rgba(255, 226, 196, 0.24) 0%, rgba(248, 210, 176, 0.17) 28%, rgba(242, 192, 152, 0.08) 50%, rgba(242, 192, 152, 0.03) 64%, rgba(242, 192, 152, 0) 78%);
  will-change: transform;
  animation: melodic-orb-b 47s ease-in-out infinite;
}

/* ═══ a distant skein of gulls — STATIC, very low alpha, parked in the side
   sky well OFF the center text lane (soft strokes at the edges are L6-legal).
   One tiny SVG of five soft-shouldered gull glyphs, drawn as smooth double
   arcs (a raised body, two swept wings) rather than masked rings, so each
   reads unmistakably as a bird catching the light. Two loose groups: a
   nearer pair upper-left, a farther trio drifting right of centre-high, all
   above and outside the readable column. Paints once. */
head::after {
  content: "";
  display: var(--melodic-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Cg fill='none' stroke='%23dfe3f2' stroke-linecap='round'%3E%3Cpath d='M330 300 Q346 285 360 299 Q374 285 390 300' stroke-width='3' opacity='.34'/%3E%3Cpath d='M392 268 Q405 255 416 267 Q427 255 440 268' stroke-width='2.6' opacity='.28'/%3E%3Cpath d='M1470 236 Q1483 224 1494 235 Q1505 224 1518 236' stroke-width='2.6' opacity='.3'/%3E%3Cpath d='M1536 262 Q1551 248 1564 261 Q1577 248 1592 262' stroke-width='3' opacity='.34'/%3E%3Cpath d='M1428 292 Q1440 281 1450 291 Q1460 281 1472 292' stroke-width='2.4' opacity='.26'/%3E%3C/g%3E%3C/svg%3E") center / 100% 100% no-repeat,
    /* the last stars before dawn — a scatter of soft glints high in the deep
       indigo zenith, kept to the LEFT and RIGHT of the center column and up in
       the coolest sky where no name reads. Each is a small bright core with a
       LONG soft falloff, so its footprint is coarse and soft (never a hard fine
       dot) — static, screen-fixed COARSE glints are L6c-legal shine. Cool-white
       to match the pre-dawn sky; they fade with the sky as the sun climbs. */
    radial-gradient(circle 32px at 13% 13%, rgba(233, 238, 255, 0.46) 0%, rgba(210, 222, 255, 0.11) 13%, rgba(210, 222, 255, 0) 42%),
    radial-gradient(circle 24px at 21% 25%, rgba(226, 234, 255, 0.32) 0%, rgba(206, 220, 255, 0.07) 15%, rgba(206, 220, 255, 0) 44%),
    radial-gradient(circle 30px at 7% 31%, rgba(230, 236, 255, 0.28) 0%, rgba(206, 220, 255, 0) 42%),
    radial-gradient(circle 20px at 26% 9%, rgba(224, 232, 255, 0.22) 0%, rgba(204, 218, 255, 0) 46%),
    radial-gradient(circle 22px at 17% 20%, rgba(226, 234, 255, 0.18) 0%, rgba(206, 220, 255, 0) 46%),
    radial-gradient(circle 32px at 88% 12%, rgba(233, 238, 255, 0.44) 0%, rgba(210, 222, 255, 0.1) 13%, rgba(210, 222, 255, 0) 42%),
    radial-gradient(circle 24px at 80% 23%, rgba(226, 234, 255, 0.3) 0%, rgba(206, 220, 255, 0) 44%),
    radial-gradient(circle 30px at 94% 27%, rgba(230, 236, 255, 0.26) 0%, rgba(206, 220, 255, 0) 42%),
    radial-gradient(circle 20px at 74% 9%, rgba(224, 232, 255, 0.2) 0%, rgba(204, 218, 255, 0) 46%),
    radial-gradient(circle 22px at 84% 20%, rgba(226, 234, 255, 0.17) 0%, rgba(206, 220, 255, 0) 46%);
}

/* ═══ crepuscular ray-fan — the god-rays proper, on a dedicated void-element
   pseudo so it can carry its OWN masks. A single conic-gradient centred on the
   sun (66.5% x, 55% y) throws wide soft wedges that genuinely RADIATE from the
   disc (the old parallel ellipse-smears are gone). Two masks discipline it:
   (1) a radial mask centred on the sun keeps the shafts bright near the disc
   and dissolves them into open sky before they reach the corners; (2) a linear
   mask fades the fan out over the lower reading lane and up toward the zenith.
   Coarse wide wedges, low alpha, STATIC, screen-fixed = L6c-legal (no fine
   pattern anywhere). Opt the void <meta> in as a render node to unlock it. */
head meta { display: var(--melodic-scenery, block); }
meta:first-of-type::before {
  content: "";
  display: var(--melodic-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background: conic-gradient(from 168deg at 66.5% 78%,
    rgba(255,234,196,0) 0deg,
    rgba(255,234,196,0.11) 7deg, rgba(255,234,196,0) 15deg,
    rgba(255,234,196,0) 22deg,
    rgba(255,238,204,0.14) 29deg, rgba(255,238,204,0) 38deg,
    rgba(255,234,196,0) 47deg,
    rgba(255,240,208,0.09) 53deg, rgba(255,240,208,0) 62deg,
    rgba(255,234,196,0) 300deg,
    rgba(255,238,204,0.08) 310deg, rgba(255,238,204,0) 319deg,
    rgba(255,234,196,0) 327deg,
    rgba(255,240,208,0.13) 334deg, rgba(255,240,208,0) 343deg,
    rgba(255,234,196,0) 350deg,
    rgba(255,238,204,0.1) 355deg, rgba(255,238,204,0) 360deg);
  -webkit-mask-image: radial-gradient(ellipse 60vmin 50vmin at 66.5% 78%, #000 6%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 92%), linear-gradient(180deg, rgba(0,0,0,0) 8%, #000 30%, #000 58%, rgba(0,0,0,0.15) 72%, rgba(0,0,0,0) 80%);
  mask-image: radial-gradient(ellipse 60vmin 50vmin at 66.5% 78%, #000 6%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 92%), linear-gradient(180deg, rgba(0,0,0,0) 8%, #000 30%, #000 58%, rgba(0,0,0,0.15) 72%, rgba(0,0,0,0) 80%);
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
}

/* ═══ set-list titles: airy lowercase, wide tracking, warm static glow ═══ */
.credits-block__title {
  font-weight: 300;
  text-transform: lowercase;
  letter-spacing: 0.34em;
  padding-left: 0.34em; /* re-center the trailing tracking space */
  color: var(--melodic-sun);
  margin: 0 0 1.5rem;
}

/* thin dawn rule: hairline + a tiny warm sun-dot (hot core, peach halo),
   replaces the base gold bar */
.credits-block__title::after {
  width: min(190px, 48vw);
  height: 11px;
  margin: 0.85rem auto 0;
  opacity: 1;
  background:
    radial-gradient(circle, rgba(255, 226, 188, 1) 0 2.2px, rgba(255, 182, 126, 0.55) 3.2px, rgba(255, 182, 126, 0) 5px) center / 11px 11px no-repeat,
    linear-gradient(90deg, rgba(238, 172, 122, 0) 0%, rgba(238, 172, 122, 0.6) 22% 78%, rgba(238, 172, 122, 0) 100%) center / 100% 1px no-repeat;
}

/* ═══ rows: centered, spacious; names are sacred — wrap, never clip ═══ */
.credit {
  max-width: min(40rem, 90vw);
  margin-inline: auto;
  min-width: 0;
  overflow-wrap: anywhere;
  font-weight: 500;
  letter-spacing: 0.06em;
  line-height: 1.6;
}
.credit__name { color: var(--melodic-ink); }
/* soft small numerals, warmed — lifted a step for contrast against the lane */
.credit__amount {
  font-size: 0.72em;
  letter-spacing: 0.14em;
  opacity: 0.96;
  color: #f2b489;
  font-variant-numeric: tabular-nums;
}
.credit__amount::before { content: " · "; opacity: 0.75; }

/* ═══ flourish cards ═══ */
.flourish__title {
  font-weight: 200;
  text-transform: lowercase;
  letter-spacing: 0.14em;
  line-height: 1.08;
  color: var(--melodic-ink);
  /* backlit-by-dawn bloom: a tight bright halo inside a wider warm glow, so the
     thin type reads as catching the sunrise light (static, no-op-safe) */
  text-shadow: 0 0 14px rgba(255, 244, 224, 0.4), 0 0 40px rgba(246, 213, 184, 0.4), var(--credits-shadow);
}
/* streamer-configurable tagline: restyle ONLY, text never swapped
   (padding-left re-centers the trailing tracking space) */
.flourish__tagline {
  font-style: normal;
  text-transform: lowercase;
  letter-spacing: 0.3em;
  padding-left: 0.3em;
  font-size: 0.95rem;
  color: var(--melodic-sun);
  opacity: 0.9;
}

/* badge → set-time laminate (copy swap via font-size:0 + ::after) */
.flourish__badge {
  font-size: 0;
  padding: 0.55rem 1.5rem;
  border: 1px solid rgba(246, 213, 184, 0.5);
  color: var(--melodic-sun);
  box-shadow: 0 0 22px rgba(232, 168, 124, 0.25);
}
.flourish__badge::after {
  content: "sunrise set · hillside stage · 06:04";
  font-family: var(--credits-font);
  font-weight: 500;
  font-size: 0.8rem;
  letter-spacing: 0.3em;
  padding-left: 0.3em; /* balance the trailing tracking space — optically centered in the pill
                          (padding, not negative margin: the pill is shrink-to-fit and a negative
                          margin under-measures it, forcing a wrap) */
  text-transform: lowercase;
}

/* rating → the fine print on the set-time card (copy swap) */
.flourish__rating {
  font-size: 0;
  border-color: rgba(246, 213, 184, 0.4);
  border-radius: 999px;
  opacity: 0.9;
}
.flourish__rating::after {
  content: "extended mix · 122 bpm · plays till the light comes";
  font-family: var(--credits-font);
  font-size: 0.72rem;
  letter-spacing: 0.26em;
  padding-left: 0.26em; /* optical centering, same trick as the badge */
  text-transform: lowercase;
}

/* intro prop: a half-risen sun above the badge + hairline horizon below —
   static in-roll ornaments (no animation inside the roll, L5). The dome now
   carries a graduated warm body with a soft specular kiss at its crown, so
   the prop shares the scenery sun's material language rather than reading flat. */
.flourish--intro::before {
  content: "";
  display: var(--melodic-scenery, block);
  width: 56px;
  height: 28px;
  border-radius: 56px 56px 0 0;
  background:
    radial-gradient(ellipse 40% 60% at 46% 96%, rgba(255, 252, 244, 0.9) 0%, rgba(255, 250, 236, 0) 62%),
    linear-gradient(180deg, #fff4e6 0%, rgba(246, 213, 184, 0.98) 40%, rgba(232, 168, 124, 0.55) 100%);
  box-shadow: 0 0 30px rgba(246, 213, 184, 0.5), 0 0 64px rgba(232, 168, 124, 0.3);
}
.flourish--intro::after {
  content: "";
  display: var(--melodic-scenery, block);
  width: min(320px, 70vw);
  height: 1px;
  background: linear-gradient(90deg, rgba(232, 168, 124, 0) 0%, rgba(232, 168, 124, 0.6) 25% 75%, rgba(232, 168, 124, 0) 100%);
}

/* outro: the sun has fully risen (static disc), copy swapped. A crisp specular
   hotspot sits on the upper-left shoulder (static baked highlight = always safe,
   L6d) so the emblem reads as a lit sphere with real shine, not a flat coin. */
.flourish--outro::before {
  content: "";
  display: var(--melodic-scenery, block);
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background:
    radial-gradient(circle at 37% 32%, rgba(255, 255, 252, 0.95) 0%, rgba(255, 250, 240, 0.5) 8%, rgba(255, 250, 240, 0) 20%),
    radial-gradient(circle at 42% 38%, #ffe9d2 0%, var(--melodic-sun) 55%, var(--melodic-peach) 100%);
  box-shadow: 0 0 34px rgba(246, 213, 184, 0.6), 0 0 90px rgba(232, 168, 124, 0.35);
}
.flourish--outro .flourish__title { font-size: 0; }
.flourish--outro .flourish__title::after {
  content: "the sun is up";
  font-size: var(--credits-flourish-title-size);
  letter-spacing: 0.12em; /* re-declared: em against parent font-size:0 collapses */
  text-shadow: 0 0 40px rgba(246, 213, 184, 0.55), var(--credits-shadow);
}
.flourish--outro .flourish__tagline { font-size: 0; }
.flourish--outro .flourish__tagline::after {
  content: "safe travels home — see you at the next sunrise";
  font-size: 0.95rem;
  letter-spacing: 0.28em;
  padding-left: 0.28em; /* parent's em padding collapses at font-size:0 — recenter here */
  text-transform: lowercase;
}

/* ═══ raid finale: the closing track ═══
   The outro flourish is always the LAST sibling section, so the raid block is
   nth-last-of-type(2); slideshow block slides carry only .credits-slide. */
.credits-block:nth-last-of-type(2) .credits-block__title,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
  color: #ffe3c4;
  text-shadow: 0 0 30px rgba(246, 213, 184, 0.5), var(--credits-shadow);
}
/* label above the title; its glint is steps(1) at ~0.5 paints/s — the only
   animation inside the roll, well under the L5 2-paints/s ceiling */
.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  content: "the closing track";
  display: block;
  font-family: var(--credits-font);
  font-weight: 600;
  font-size: 0.72rem;
  letter-spacing: 0.5em;
  text-transform: lowercase;
  margin-bottom: 0.85rem;
  color: var(--melodic-peach);
  animation: melodic-glint 3.8s steps(1, end) infinite;
}
.credits-block:nth-last-of-type(2) .credits-block__title::after,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::after {
  width: min(280px, 62vw);
  background:
    radial-gradient(circle, rgba(255, 233, 210, 1) 0 3px, rgba(255, 233, 210, 0) 4.5px) center / 11px 11px no-repeat,
    linear-gradient(90deg, rgba(246, 213, 184, 0) 0%, rgba(246, 213, 184, 0.8) 20% 80%, rgba(246, 213, 184, 0) 100%) center / 100% 1px no-repeat;
}
.credits-block:nth-last-of-type(2) .credit,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit {
  font-size: calc(var(--credits-name-size) * 1.08);
}
.credits-block:nth-last-of-type(2) .credit__name,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__name {
  text-shadow: 0 0 18px rgba(246, 213, 184, 0.35), var(--credits-shadow);
}

/* ═══ slideshow: slides surface like a slow filter sweep — one-shot
   opacity/transform transitions layered on the base fade ═══ */
.credits-slide {
  transform: translateY(16px) scale(0.985);
  transition: opacity 1.1s ease, transform 1.1s cubic-bezier(0.22, 1, 0.36, 1);
}
.credits-slide.is-active { transform: none; }

/* ═══ keyframes (all melodic- prefixed; transform/opacity ONLY) ═══ */
@keyframes melodic-orb-a {
  0%   { transform: translate3d(0, 0, 0); opacity: 0; }
  10%  { opacity: 0.55; }
  50%  { transform: translate3d(26px, -34vh, 0); }
  85%  { opacity: 0.4; }
  100% { transform: translate3d(-12px, -68vh, 0); opacity: 0; }
}
@keyframes melodic-orb-b {
  0%   { transform: translate3d(0, 0, 0); opacity: 0; }
  12%  { opacity: 0.45; }
  55%  { transform: translate3d(-30px, -40vh, 0); }
  88%  { opacity: 0.35; }
  100% { transform: translate3d(14px, -76vh, 0); opacity: 0; }
}
/* two discrete hops per 3.8s cycle — a slow warm shimmer, not a blink */
@keyframes melodic-glint {
  0%, 55%  { opacity: 1; }
  60%, 72% { opacity: 0.55; }
  76%, 100% { opacity: 1; }
}

/* ═══ reduced motion: the lanterns hold still (parked softly lit near the
   hillside), the glint rests, slides fall back to the base fade ═══ */
@media (prefers-reduced-motion: reduce) {
  body::after,
  head::before {
    animation: none;
    opacity: 0.35;
  }
  .credits-block:nth-last-of-type(2) .credits-block__title::before,
  .credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
    animation: none;
  }
  .credits-slide { transform: none; transition: opacity 0.8s ease; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--melodic-scenery:none;}",
};
