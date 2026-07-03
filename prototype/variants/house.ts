import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. 33 1/3 — Deep House: crate-digger liner notes crawling through a warm chocolate basement — sunburst arcs on the walls, a corner vinyl spinning unhurried under a resting tonearm, a speaker cabinet with leaned 12-inch sleeves holding down the lower-left, and dust drifting through the lamp beam. */
export const VARIANT: ThemeVariant = {
  key: "house",
  name: "33⅓ — Deep House",
  css: `/* ================================================================
   33 1/3 — DEEP HOUSE (layered AFTER the base sheet)
   Fiction: the credits are the back-sleeve tracklist of a live-to-tape
   house session. Blocks are record sides (SIDE A, SIDE B...), rows are
   catalog entries (A1, A2...), the raid finale is the bonus cut, a
   vinyl disc spins in the corner of the listening room, and the other
   corner holds the speaker cabinet with tonight's sleeves leaned on it.
   Transparent collapse is ONE line (see transparentOverride):
   :root { --credits-bg: transparent; --house-scenery: none; }
   ================================================================ */
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700&family=Fredoka:wght@500;600;700&display=swap');

:root {
  /* -- palette: cream / burnt orange / chocolate / sienna -- */
  --house-cream: #f4e8d0;
  --house-orange: #d97b29;
  --house-amber: #eda45f;
  --house-sienna: #8c4f2b;
  --house-choc: #4a2c17;
  --house-ink: #140903;
  --house-scenery: block; /* set to none to strip every scenery layer */

  /* -- base hooks -- */
  --credits-color: var(--house-cream);
  --credits-accent: var(--house-orange);
  --credits-font: "Baloo 2", "Trebuchet MS", Verdana, sans-serif;
  --credits-title-font: "Fredoka", "Baloo 2", "Trebuchet MS", sans-serif;
  --credits-title-size: clamp(1.6rem, 4.6vw, 2.6rem);
  --credits-name-size: clamp(1.1rem, 2.8vw, 1.6rem);
  --credits-flourish-title-size: clamp(2.4rem, 8vw, 5rem);
  --credits-block-gap: 5rem;
  --credits-name-gap: 0.55rem;
  --credits-shadow: 0 2px 10px rgba(20, 9, 3, 0.7);
  /* warm amp-glow on titles; never "none" — the base composes
     "text-shadow: var(--credits-glow), var(--credits-shadow)" */
  --credits-glow: 0 0 20px rgba(217, 123, 41, 0.3);

  /* CHEAP 4-stop chocolate ground, near-black at the foot (root bg
     repaints inside the crawl damage every frame — texture lives on
     the promoted html::before) */
  --credits-bg: linear-gradient(160deg, #382110 0%, #261307 42%, #180b04 72%, #0d0501 100%);
}

/* ---- canvas split: scenery paints full-bleed on <html> (unmasked);
   body KEEPS the base edge-fade so names still ease in/out. ---- */
html { -webkit-mask-image: none; mask-image: none; }
body { background: transparent; }

/* ---- the listening room, PINNED STATIC + PROMOTED (translateZ(0)
   caches it as one compositor texture). Light story, top to bottom:
   1 center-lane scrim (cream names always read), 2 warm lamp glow
   pouring in from upper-left (5 soft stops), 3 floor shadow grounding
   the bottom edge, 4-6 warm ember pockets tucked into the corners so
   the vignette never goes cold, 7 vignette pulling every edge toward
   warm near-black, 8 warm ambient pocket behind the lane, 9+10 the
   70s sunburst arcs.
   Screen-fixed is safe per the flicker law: every band is coarse
   (>= 6vmin ~ 65px) with soft ramps and low alpha. ---- */
html::before {
  content: "";
  display: var(--house-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background:
    linear-gradient(90deg, transparent 8%, rgba(16, 7, 2, 0.3) 30%,
      rgba(16, 7, 2, 0.44) 50%, rgba(16, 7, 2, 0.3) 70%, transparent 92%),
    /* WALL WOOD-PANELLING — coarse soft vertical seams (~7vw pitch, well
       above the flicker-law fine threshold, very low alpha) give the room
       walls a real panelled-basement material instead of a flat field.
       The seams fall off toward the lit corner so the panelling reads as
       receding into the warm light. Screen-fixed is safe: coarse + low
       alpha + on the promoted pseudo. */
    linear-gradient(90deg,
      rgba(255, 236, 205, 0.012) 0, rgba(0,0,0,0) 1.5vw,
      rgba(10, 4, 1, 0.05) 3.4vw, rgba(0,0,0,0) 3.9vw, rgba(0,0,0,0) 7vw),
    /* WARM BOUNCE POOL — a broad soft pool of reflected lamp-light spilled
       across the upper-mid wall so the big dead centre reads as a lit room
       corner, not an empty brown field. Warm, coarse, low-alpha. */
    radial-gradient(ellipse 66% 52% at 40% 16%,
      rgba(237, 164, 95, 0.1) 0%, rgba(217, 123, 41, 0.045) 34%, rgba(217, 123, 41, 0) 70%),
    /* FAR-CORNER COOL HAZE — atmospheric perspective: the far (right) wall
       depth reads a touch cooler and hazier than the warm near corner, so
       the room has real depth rather than one flat temperature. */
    radial-gradient(ellipse 54% 66% at 96% 34%,
      rgba(70, 74, 92, 0.07) 0%, rgba(50, 52, 66, 0.03) 40%, rgba(50, 52, 66, 0) 72%),
    /* VOLUMETRIC LAMP SHAFT — a committed cone of light pouring from the
       pendant bulb (~9% 15%) and raking DOWN-AND-RIGHT across the big
       centre wall, so the dead field the crawl passes through now carries
       a real god-ray instead of flat brown. A hot narrow core wrapped in
       a broad soft falloff gives the shaft body; both are coarse wedges
       anchored to the bulb and feather out well before the text lane, so
       per the flicker law this is a coarse soft glint, never a fine
       pattern over the names. Radial masks taper the rays so they fade
       into the room rather than banding a hard edge across it. */
    conic-gradient(from 118deg at 9% 15%,
      rgba(255, 244, 214, 0) 0deg, rgba(255, 244, 214, 0.05) 5deg,
      rgba(255, 247, 222, 0.14) 11deg, rgba(255, 250, 232, 0.3) 16deg,
      rgba(255, 247, 222, 0.14) 21deg, rgba(255, 244, 214, 0.05) 28deg,
      rgba(255, 244, 214, 0) 34deg),
    conic-gradient(from 108deg at 8% 13%,
      rgba(255, 238, 204, 0) 0deg, rgba(255, 238, 204, 0.09) 14deg,
      rgba(255, 240, 210, 0.14) 26deg, rgba(255, 238, 204, 0.07) 40deg,
      rgba(255, 238, 204, 0) 54deg),
    radial-gradient(ellipse 82% 74% at 9% 2%,
      rgba(255, 238, 204, 0.26) 0%, rgba(248, 216, 168, 0.16) 15%,
      rgba(237, 164, 95, 0.1) 31%, rgba(217, 123, 41, 0.045) 49%,
      rgba(217, 123, 41, 0) 68%),
    /* warm spill pooling DOWN and out from the pendant bulb (~7% 14%) so
       the light reads as pouring off the fixture into the room, tying the
       lamp SVG's tight glow to the broad room bloom */
    radial-gradient(ellipse 46% 60% at 7% 15%,
      rgba(255, 226, 176, 0.16) 0%, rgba(237, 164, 95, 0.07) 34%, rgba(217, 123, 41, 0) 66%),
    linear-gradient(180deg, rgba(0, 0, 0, 0) 0% 72%, rgba(22, 9, 3, 0.28) 86%, rgba(22, 9, 3, 0.52) 100%),
    radial-gradient(circle at 100% 100%, rgba(140, 79, 43, 0.2) 0 9vmin, rgba(140, 79, 43, 0) 28vmin),
    radial-gradient(circle at 0% 100%, rgba(217, 123, 41, 0.16) 0 12vmin, rgba(217, 123, 41, 0) 34vmin),
    radial-gradient(circle at 100% 0%, rgba(237, 164, 95, 0.09) 0 8vmin, rgba(237, 164, 95, 0) 26vmin),
    radial-gradient(ellipse 108% 88% at 50% 40%,
      rgba(0, 0, 0, 0) 46%, rgba(30, 13, 4, 0.32) 74%, rgba(16, 6, 1, 0.62) 100%),
    radial-gradient(ellipse 70% 50% at 50% 42%, rgba(217, 123, 41, 0.11) 0%, rgba(217, 123, 41, 0) 70%),
    radial-gradient(circle at 6% 108%,
      rgba(217, 123, 41, 0.42) 0 15vmin, rgba(217, 123, 41, 0.08) 22vmin,
      rgba(244, 232, 208, 0.18) 29vmin, rgba(244, 232, 208, 0.04) 36vmin,
      rgba(140, 79, 43, 0.32) 43vmin, rgba(140, 79, 43, 0.06) 51vmin,
      rgba(217, 123, 41, 0.19) 59vmin, rgba(217, 123, 41, 0) 70vmin),
    radial-gradient(circle at 97% -10%,
      rgba(140, 79, 43, 0.3) 0 11vmin, rgba(140, 79, 43, 0.06) 17vmin,
      rgba(217, 123, 41, 0.18) 24vmin, rgba(217, 123, 41, 0.04) 31vmin,
      rgba(244, 232, 208, 0.11) 38vmin, rgba(244, 232, 208, 0) 50vmin);
}

/* ---- BEAM DUST: a sparse scatter of soft warm motes suspended in the
   lamp shaft, screen-fixed but ALL kept in the upper-left cone (x<44%,
   y<58%) so they never form a fine pattern over the center text lane
   (flicker law: corner/edge-only, soft halos >= 3px, low alpha). This
   is the volumetric "dust in the light" the shaft needs to read as
   volume rather than a flat glow. Promoted so it stays a cached
   texture and never repaints under the crawl. ---- */
body::before {
  content: "";
  display: var(--house-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background-image:
    radial-gradient(circle at 14% 12%, rgba(255, 244, 214, 0.5) 0 1.4px, rgba(255, 244, 214, 0) 4px),
    radial-gradient(circle at 27% 9%, rgba(255, 240, 208, 0.34) 0 1px, rgba(255, 240, 208, 0) 3px),
    radial-gradient(circle at 9% 26%, rgba(255, 238, 204, 0.4) 0 1.2px, rgba(255, 238, 204, 0) 3.4px),
    radial-gradient(circle at 22% 22%, rgba(255, 246, 220, 0.3) 0 1.6px, rgba(255, 246, 220, 0) 4.4px),
    radial-gradient(circle at 34% 16%, rgba(248, 220, 176, 0.26) 0 1px, rgba(248, 220, 176, 0) 3px),
    radial-gradient(circle at 18% 38%, rgba(255, 240, 208, 0.3) 0 1.3px, rgba(255, 240, 208, 0) 3.6px),
    radial-gradient(circle at 6% 46%, rgba(248, 216, 172, 0.24) 0 1px, rgba(248, 216, 172, 0) 3px),
    radial-gradient(circle at 31% 33%, rgba(255, 244, 214, 0.22) 0 1.5px, rgba(255, 244, 214, 0) 4px),
    radial-gradient(circle at 40% 27%, rgba(248, 220, 176, 0.2) 0 1px, rgba(248, 220, 176, 0) 3px),
    radial-gradient(circle at 24% 50%, rgba(255, 240, 208, 0.2) 0 1.1px, rgba(255, 240, 208, 0) 3.4px);
  /* soft-fade the cluster into the shaft so no mote sits on a hard edge */
  -webkit-mask-image: radial-gradient(ellipse 60% 62% at 12% 6%, #000 0 40%, rgba(0,0,0,0) 100%);
  mask-image: radial-gradient(ellipse 60% 62% at 12% 6%, #000 0 40%, rgba(0,0,0,0) 100%);
}

/* ---- sleeve dust + lamp motes: warm grain and drifting dust specks
   RIDE THE CONTENT (roll/slideshow pseudo, static, never animated —
   screen-fixed fine grain would flicker across tracked glyphs; a roll
   descendant animation would trash the cached crawl texture). The
   motes are 1-2px warm points with soft halos — hanging in the lamp
   beam, carried along with the names. Grain alpha is baked into the
   SVG matrix (0.035) so the motes can keep their own brighter alphas
   in the same layer stack. ---- */
.credits-roll::before,
.credits-slideshow::before {
  content: "";
  display: var(--house-scenery, block);
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  background-image:
    radial-gradient(circle at 22% 28%, rgba(246, 228, 190, 0.42) 0 1.6px, rgba(246, 228, 190, 0) 3.6px),
    radial-gradient(circle at 71% 64%, rgba(237, 164, 95, 0.35) 0 1.1px, rgba(237, 164, 95, 0) 2.6px),
    radial-gradient(circle at 44% 86%, rgba(246, 228, 190, 0.3) 0 1px, rgba(246, 228, 190, 0) 2.4px),
    radial-gradient(circle at 86% 14%, rgba(246, 228, 190, 0.24) 0 2.2px, rgba(246, 228, 190, 0) 5px),
    radial-gradient(circle at 8% 58%, rgba(237, 164, 95, 0.26) 0 1.3px, rgba(237, 164, 95, 0) 3px),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.956 0 0 0 0 0.910 0 0 0 0 0.816 0 0 0 0.035 0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23g)'/%3E%3C/svg%3E");
  background-size: 340px 340px, 260px 260px, 300px 300px, 460px 460px, 380px 380px, 300px 300px;
  /* fade the pseudo's own top/bottom so its edge never draws a
     full-width tonal seam mid-screen while the roll is entering */
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 480px, #000 calc(100% - 480px), transparent 100%);
  mask-image: linear-gradient(to bottom, transparent 0, #000 480px, #000 calc(100% - 480px), transparent 100%);
}

/* ---- THE CENTERPIECE: a 560px platter parked in the bottom-right
   corner, deliberately cropped by both edges (center sits 130px in).
   The platter itself is STATIC — grooves and label rings are radially
   symmetric so spinning them is invisible; instead a small transparent
   layer above (head::after) carries the asymmetric label art and THAT
   rotates, so the spin reads while the only continuous mover stays
   186px. Baked into this static disc, top to bottom: conic lamp sheen
   sweeping the grooves (upper-left wedge + lower-right answer), a
   specular kiss toward the lamp, a form shadow rolling the far side
   into the dark, spindle, paper label base, dead-wax track separators,
   rim, and the groove rings (fine, but static and corner-parked — the
   flicker law allows edges/corners). Offset box-shadows are safe now
   that nothing here transforms. ---- */
html::after {
  content: "";
  display: var(--house-scenery, block);
  position: fixed;
  right: -150px;
  bottom: -150px;
  width: 560px;
  height: 560px;
  z-index: 20;
  pointer-events: none;
  border-radius: 50%;
  transform: translateZ(0);
  background:
    /* 0 RIM SPARKLE: a crisp specular point where the lamp catches the
       raised near rim-bead — the single hottest glint on the pressing's
       edge, the "star" that says glossy vinyl. Static specular baked on
       a prop = always flicker-safe (L6d), corner-parked off the lane. */
    radial-gradient(circle at 27% 12%, rgba(255, 255, 252, 0.95) 0 2.5px, rgba(255, 252, 242, 0.4) 6px, rgba(255, 252, 242, 0) 15px),
    radial-gradient(ellipse 5% 2.4% at 27% 12%, rgba(255, 255, 252, 0.7) 0%, rgba(255, 255, 252, 0) 100%),
    /* 1 broad ambient sheen toward the lamp (upper-left) — soft vinyl
       gloss giving the near shoulder its roundness between arc passes */
    radial-gradient(circle at 30% 22%, rgba(255, 246, 224, 0.3) 0 44px, rgba(255, 243, 219, 0.12) 130px, rgba(255, 243, 219, 0) 230px),
    /* 1b a tight specular hotspot on the near shoulder — the single
       brightest kiss of the lamp on the glossy black shoulder, giving
       the vinyl its wet-plastic sheen (a real disc shows one sharp
       point-light glint, not just a broad wash). Brighter + a small
       secondary catch below it so the shoulder reads as wet, rounded
       gloss, not a matte plate. Static specular = flicker-safe. */
    radial-gradient(ellipse 11% 8% at 33% 25%, rgba(255, 253, 248, 0.72) 0%, rgba(255, 249, 232, 0.2) 40%, rgba(255, 249, 232, 0) 72%),
    radial-gradient(ellipse 7% 5% at 27% 40%, rgba(255, 250, 238, 0.34) 0%, rgba(255, 249, 232, 0.08) 44%, rgba(255, 249, 232, 0) 76%),
    /* 2 STATIC groove sheen bowtie: the always-there glint the moving arc
       rides over — two soft opposed wedges toward/away from the lamp so
       the disc never looks matte between arc passes */
    conic-gradient(from 118deg at 50% 50%,
      rgba(255, 246, 224, 0) 0deg, rgba(255, 246, 224, 0.04) 10deg,
      rgba(255, 246, 224, 0.15) 24deg, rgba(255, 246, 224, 0.04) 38deg,
      rgba(255, 246, 224, 0) 52deg 168deg, rgba(255, 246, 224, 0.04) 192deg,
      rgba(255, 246, 224, 0.1) 204deg, rgba(255, 246, 224, 0.04) 216deg,
      rgba(255, 246, 224, 0) 236deg),
    /* 3 form shadow rolling the far side (lower-right) into the dark —
       deeper now so the disc reads as a rounded solid, not a flat plate */
    radial-gradient(circle at 68% 78%, rgba(0, 0, 0, 0) 0 34%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0.58) 100%),
    /* 4 spindle: brass pin + drilled hole with a lit upper lip */
    radial-gradient(circle at 46% 42%, #f0dcac 0 1.6px, #e8d3a4 1.6px 2px, #b58c52 2px 3px, #120802 3px 6.5px, rgba(0, 0, 0, 0) 6.5px),
    /* 5 paper label: printed concentric print rings, a lit near edge and
       a dead-wax shine ring where the grooves stop. Deeper, more
       saturated sunburst press so it reads as ink on paper, not a glow;
       an inner ambient-occlusion dip where the label meets the deadwax */
    radial-gradient(circle at center,
      rgba(0, 0, 0, 0) 0 6px, #f6e6c6 6px 10px,
      #a55412 10px 11.5px, #e2872c 11.5px 33.5px,
      #f8d59d 33.5px 35px, #cf6f1a 35px 57px,
      #fbe3b4 57px 58.5px, #dd8128 58.5px 78.5px,
      #a04c0a 78.5px 80px, #e0862c 80px 84px,
      #a35820 84px 87px, #79431f 87px 92px,
      #281409 92px 94px, #160b04 94px 96px, rgba(0, 0, 0, 0) 96px),
    /* 5b label lamp-gradient: a warm-to-cool ramp across the paper so the
       near (lamp) side of the label is brighter than the far side —
       printed paper catching a single light, not glowing on its own. A
       lit near-crescent + a faint far-side occlusion sells the roundness */
    radial-gradient(ellipse 120% 120% at 30% 24%,
      rgba(255, 246, 220, 0.34) 0 30px, rgba(255, 242, 208, 0.08) 66px, rgba(255, 240, 205, 0) 92px),
    radial-gradient(ellipse 120% 120% at 72% 82%,
      rgba(60, 26, 6, 0.3) 0 30px, rgba(60, 26, 6, 0) 84px),
    /* 6 three archival marker rings printed onto the black vinyl —
       side-lit: a fine dark groove-shadow paired with a lit crest so the
       track separators read as real pressed rings, not flat strokes */
    radial-gradient(circle at center,
      rgba(0, 0, 0, 0) 0 137px, rgba(0, 0, 0, 0.4) 137px 138px,
      rgba(255, 244, 216, 0.1) 138.5px 140px, rgba(0, 0, 0, 0.4) 140.5px 141.5px,
      rgba(0, 0, 0, 0) 141.5px 185px, rgba(0, 0, 0, 0.4) 185px 186px,
      rgba(255, 244, 216, 0.1) 186.5px 188px, rgba(0, 0, 0, 0.4) 188.5px 189.5px,
      rgba(0, 0, 0, 0) 189.5px 233px, rgba(0, 0, 0, 0.4) 233px 234px,
      rgba(255, 244, 216, 0.1) 234.5px 236px, rgba(0, 0, 0, 0.4) 236.5px 237.5px,
      rgba(0, 0, 0, 0) 237.5px),
    /* 7 outer rim: a fat lit bead then the black shoulder falling deep to
       the edge — a heavy 180g pressing, not a thin plate. Two beads (a
       bright edge catch + an inner reflected bounce) with a wide dark
       shoulder between them */
    radial-gradient(circle at center,
      rgba(0, 0, 0, 0) 0 258px, rgba(255, 243, 219, 0.08) 260px 262px,
      rgba(0, 0, 0, 0) 262px 267px, rgba(255, 246, 224, 0.24) 269px 272px,
      rgba(255, 243, 219, 0.1) 272px 274px,
      rgba(24, 12, 4, 0.92) 275px 279px, rgba(8, 3, 1, 0.99) 279px 280px, rgba(0, 0, 0, 0) 280px),
    /* 8 FINE groove bed: crisp micro-rings with a lit crest + dark valley
       per ring (~2.6px pitch) — ambient occlusion baked between grooves so
       the surface reads as concentric channels; THIS is the surface the
       moving specular arc lights up */
    repeating-radial-gradient(circle at center,
      #0f0602 0 0.5px, #241206 0.5px 1.3px, #38200f 1.3px 1.7px, #241206 1.7px 2.5px);
  box-shadow:
    inset 0 0 0 2px rgba(10, 4, 1, 0.95),
    inset 0 0 44px rgba(0, 0, 0, 0.55),
    0 0 60px 12px rgba(7, 3, 1, 0.6),
    -30px -24px 90px rgba(5, 2, 0, 0.42);
}

/* ---- THE MOVING SPECULAR ARC: the named hero effect. A disc-sized
   circle parked EXACTLY over html::after's groove bed, carrying only a
   narrow bright conic wedge, radial-masked to the groove annulus
   (label edge ~96px out to the rim ~268px). It rotates slowly so a
   crescent of highlight sweeps the micro-grooves — the way light rakes
   a spinning record. Promoted, will-change:transform, and the disc's
   own form-shadow (html::after #3, painted ABOVE via z-order) still
   darkens the far side so the arc reads brightest on the lamp side.
   Blessed by the deep-artistry brief ("groove micro-rings catching a
   moving specular arc") as THE figurative motion for this theme. ---- */
body::after {
  content: "";
  display: var(--house-scenery, block);
  position: fixed;
  right: -150px;
  bottom: -150px;
  width: 560px;
  height: 560px;
  z-index: 20;
  pointer-events: none;
  border-radius: 50%;
  transform: translateZ(0);
  /* a leading bright crescent + a softer trailing one (a real disc
     shows a primary glint and a fainter secondary). The primary now has
     a sharp hot core (a real specular streak flares narrow-and-bright)
     wrapped in soft falloff, and a faint tertiary so the raking light
     reads as it rounds the disc, not as one lonely wedge */
  background:
    conic-gradient(from 0deg at 50% 50%,
      rgba(255, 249, 232, 0) 0deg,
      rgba(255, 249, 232, 0.1) 5deg,
      rgba(255, 250, 236, 0.4) 10deg,
      rgba(255, 254, 250, 0.92) 15deg,
      rgba(255, 250, 236, 0.4) 20deg,
      rgba(255, 249, 232, 0.1) 27deg,
      rgba(255, 249, 232, 0) 38deg 148deg,
      rgba(255, 249, 232, 0.05) 158deg,
      rgba(255, 249, 232, 0.16) 167deg,
      rgba(255, 251, 240, 0.38) 176deg,
      rgba(255, 249, 232, 0.16) 185deg,
      rgba(255, 249, 232, 0.05) 194deg,
      rgba(255, 249, 232, 0) 204deg 318deg,
      rgba(255, 249, 232, 0.06) 330deg,
      rgba(255, 249, 232, 0.14) 340deg,
      rgba(255, 249, 232, 0.06) 350deg,
      rgba(255, 249, 232, 0) 358deg);
  /* mask to the groove annulus (label edge ~96px out to rim ~268px),
     softly feathered at both radial ends so the arc fades into the
     deadwax and the rim instead of drawing a hard-edged ring band */
  -webkit-mask-image: radial-gradient(circle at center,
    transparent 0 92px, #000 108px 150px, #000 232px, rgba(0,0,0,0.35) 256px, transparent 268px);
  mask-image: radial-gradient(circle at center,
    transparent 0 92px, #000 108px 150px, #000 232px, rgba(0,0,0,0.35) 256px, transparent 268px);
  will-change: transform;
  animation: house-sheen 9s linear infinite;
}

/* head opts in as a render node (all its children stay display:none
   per the UA sheet) to unlock three more corner-chrome boxes — the
   same trick vhs uses for its REC dot. head itself is the tonearm
   PIVOT BASE: a machined puck at the platter's upper-right, catching
   the lamp on its 10-o'clock shoulder. NO transform here — a
   transformed head would become the containing block for its
   fixed-position pseudos and strand the arm mid-air. ---- */
head {
  display: var(--house-scenery, block);
  position: fixed;
  right: 26px;
  bottom: 370px;
  width: 76px;
  height: 76px;
  z-index: 23;
  pointer-events: none;
  border-radius: 50%;
  background:
    radial-gradient(circle at 33% 27%, rgba(255, 240, 214, 0.42) 0 6px, rgba(255, 240, 214, 0) 22px),
    radial-gradient(circle at 50% 50%,
      #c9ad7e 0 4px, #331c0d 4px 7px, #96703f 7px 14px,
      #452817 14px 25px, #24110a 25px 33px, #453022 33px 35px, #150a04 35px 38px);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.55), inset 0 2px 3px rgba(255, 240, 214, 0.22);
}

/* ---- the rotating label art: a 186px transparent circle sitting
   exactly on the label, carrying only the asymmetric printed marks
   (title block + catalog line). The ONE continuous mover — small,
   will-change: transform, 6s/rev (33 1/3 pitched down, unhurried). ---- */
head::after {
  content: "";
  display: var(--house-scenery, block);
  position: fixed;
  right: 37px;
  bottom: 37px;
  width: 186px;
  height: 186px;
  z-index: 21;
  pointer-events: none;
  border-radius: 50%;
  /* the printed side, drawn crisp in one SVG so type + ticks stay sharp:
     a two-tone printed sweep (darker press side), a wordmark set on a
     curved top arc, a catalog line on a bottom arc, a ring of fine
     registration ticks, a small deadwax ring near the spindle, and a
     lit paper grain wash — asymmetric so the whole group visibly orbits
     and sells the 33 1/3. Center hole left transparent for the brass
     spindle beneath. ONE unbroken line (a newline here kills the sheet). */
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 186 186'%3E%3Cdefs%3E%3Cpath id='top' d='M31 93 A62 62 0 0 1 155 93' fill='none'/%3E%3Cpath id='bot' d='M41 93 A52 52 0 0 0 145 93' fill='none'/%3E%3CradialGradient id='pg' cx='36%25' cy='30%25' r='78%25'%3E%3Cstop offset='0' stop-color='%23fff' stop-opacity='.2'/%3E%3Cstop offset='.5' stop-color='%23fff' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='.2'/%3E%3C/radialGradient%3E%3Cfilter id='pf'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.62' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.29 0 0 0 0 0.15 0 0 0 0 0.05 0 0 0 0.05 0'/%3E%3C/filter%3E%3C/defs%3E%3Ccircle cx='93' cy='93' r='74' fill='%23000' opacity='0' /%3E%3Cpath d='M93 93 m0 -74 a74 74 0 0 1 0 148 z' fill='%235c3213' opacity='.16'/%3E%3Ccircle cx='93' cy='93' r='74' filter='url(%23pf)' opacity='.7'/%3E%3Ccircle cx='93' cy='93' r='74' fill='url(%23pg)'/%3E%3Cg stroke='%233c1e08' stroke-width='1.4' opacity='.6'%3E%3Cline x1='93' y1='21' x2='93' y2='28'/%3E%3Cline x1='129' y1='31' x2='125.5' y2='37'/%3E%3Cline x1='155' y1='57' x2='149' y2='60.5'/%3E%3Cline x1='165' y1='93' x2='158' y2='93'/%3E%3Cline x1='155' y1='129' x2='149' y2='125.5'/%3E%3Cline x1='129' y1='155' x2='125.5' y2='149'/%3E%3Cline x1='93' y1='165' x2='93' y2='158'/%3E%3Cline x1='57' y1='155' x2='60.5' y2='149'/%3E%3Cline x1='31' y1='129' x2='37' y2='125.5'/%3E%3Cline x1='21' y1='93' x2='28' y2='93'/%3E%3Cline x1='31' y1='57' x2='37' y2='60.5'/%3E%3Cline x1='57' y1='31' x2='60.5' y2='37'/%3E%3C/g%3E%3Ccircle cx='93' cy='93' r='30' fill='none' stroke='%233c1e08' stroke-width='1.4' opacity='.55'/%3E%3Ccircle cx='93' cy='93' r='30.8' fill='none' stroke='%23ffe9c4' stroke-width='.7' opacity='.28'/%3E%3Ccircle cx='93' cy='93' r='16' fill='none' stroke='%233c1e08' stroke-width='1.1' opacity='.48'/%3E%3Ctext fill='%23ffe6bd' font-family='Fredoka, sans-serif' font-weight='700' letter-spacing='3' font-size='11.2' opacity='.28'%3E%3CtextPath href='%23top' startOffset='50%25' text-anchor='middle'%3EDEEP HOUSE%3C/textPath%3E%3C/text%3E%3Ctext fill='%23411e07' font-family='Fredoka, sans-serif' font-weight='700' letter-spacing='3' font-size='11' opacity='.92'%3E%3CtextPath href='%23top' startOffset='50%25' text-anchor='middle'%3EDEEP HOUSE%3C/textPath%3E%3C/text%3E%3Ctext fill='%235a2f10' font-family='Baloo 2, sans-serif' font-weight='600' letter-spacing='2.5' font-size='7.5'%3E%3CtextPath href='%23bot' startOffset='50%25' text-anchor='middle'%3EHR-33 %C2%B7 A SIDE %C2%B7 45RPM%3C/textPath%3E%3C/text%3E%3Ccircle cx='93' cy='52' r='2.6' fill='%23411e07' opacity='.78'/%3E%3Ccircle cx='92.2' cy='51.2' r='.9' fill='%23ffe9c4' opacity='.5'/%3E%3C/svg%3E") center / contain no-repeat;
  will-change: transform;
  animation: house-spin 6s linear infinite;
}

/* ---- the TONEARM: one SVG box rotated about the pivot. In local
   coordinates (372x58, tube axis at y=32): the brushed-aluminium S-tube
   with its top-rail highlight, the pivot gimbal bearing, the knurled
   counterweight barrel past the pivot, and — at the disc end — a black
   headshell carrying a cartridge body, a finger-lift tab, and a fine
   diamond stylus touching the groove. drop-shadow (applied to the whole
   box) lays the arm's soft shadow onto the vinyl. Static — the record
   turns, the arm holds still. ---- */
head::before {
  content: "";
  display: var(--house-scenery, block);
  position: fixed;
  right: -14px;
  bottom: 379px;
  width: 372px;
  height: 58px;
  z-index: 22;
  pointer-events: none;
  transform-origin: 294px 32px;
  transform: rotate(-29.4deg) translateZ(0);
  /* redrawn crisp in one SVG so the machined parts read as distinct
     objects with their own material: brushed-aluminium S-tube (top
     rail highlight + underside shadow), a black headshell carrying a
     cartridge body + a fine diamond stylus + a finger-lift at the
     far (disc) end, the pivot bearing gimbal, and the counterweight
     barrel with knurled grip rings past the pivot. The tube axis sits
     at y=32 (the transform-origin), matching the pivot puck beneath.
     ONE unbroken line. drop-shadow casts the arm onto the vinyl. */
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 372 58'%3E%3Cdefs%3E%3ClinearGradient id='al' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23fffaf0'/%3E%3Cstop offset='.22' stop-color='%23e2d4b6'/%3E%3Cstop offset='.44' stop-color='%23bcac8a'/%3E%3Cstop offset='.6' stop-color='%23948468'/%3E%3Cstop offset='.8' stop-color='%235c4e38'/%3E%3Cstop offset='1' stop-color='%23201408'/%3E%3C/linearGradient%3E%3ClinearGradient id='cw' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23f2e6cc'/%3E%3Cstop offset='.28' stop-color='%23b09a72'/%3E%3Cstop offset='.58' stop-color='%235a4326'/%3E%3Cstop offset='.82' stop-color='%232a1c0d'/%3E%3Cstop offset='1' stop-color='%23100a03'/%3E%3C/linearGradient%3E%3ClinearGradient id='hs' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23484034'/%3E%3Cstop offset='.35' stop-color='%231d1712'/%3E%3Cstop offset='1' stop-color='%23050301'/%3E%3C/linearGradient%3E%3ClinearGradient id='cart' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23e7ddce'/%3E%3Cstop offset='.28' stop-color='%23c7bba6'/%3E%3Cstop offset='.6' stop-color='%238a7c64'/%3E%3Cstop offset='1' stop-color='%233e3323'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cellipse cx='300' cy='31.5' rx='11' ry='13' fill='%23120a04'/%3E%3Crect x='296' y='18' width='70' height='27' rx='12' fill='url(%23cw)'/%3E%3Crect x='298' y='19' width='66' height='3' rx='1.5' fill='%23fffaf0' opacity='.55'/%3E%3Crect x='298' y='41.5' width='66' height='2.4' rx='1.2' fill='%23000' opacity='.4'/%3E%3Cg stroke='%23120a04' stroke-width='1.2' opacity='.6'%3E%3Cline x1='320' y1='20' x2='320' y2='43'/%3E%3Cline x1='328' y1='20' x2='328' y2='43'/%3E%3Cline x1='336' y1='20' x2='336' y2='43'/%3E%3Cline x1='344' y1='20' x2='344' y2='43'/%3E%3Cline x1='352' y1='20' x2='352' y2='43'/%3E%3C/g%3E%3Cg stroke='%23fff3d8' stroke-width='.6' opacity='.3'%3E%3Cline x1='323' y1='20' x2='323' y2='30'/%3E%3Cline x1='331' y1='20' x2='331' y2='30'/%3E%3Cline x1='339' y1='20' x2='339' y2='30'/%3E%3Cline x1='347' y1='20' x2='347' y2='30'/%3E%3C/g%3E%3Ccircle cx='300' cy='31.5' r='9.5' fill='%232a2018'/%3E%3Ccircle cx='300' cy='31.5' r='9.5' fill='none' stroke='%23e7d7b4' stroke-width='1.5' opacity='.55'/%3E%3Ccircle cx='300' cy='31.5' r='6' fill='%23181009'/%3E%3Ccircle cx='297.2' cy='28.4' r='2.6' fill='%23fbf1d6' opacity='.72'/%3E%3Cpath d='M60 32.5 Q176 23 292 29.5 L292 34.5 Q176 30 60 38 Z' fill='url(%23al)'/%3E%3Cpath d='M60 32.5 Q176 23 292 29.5' fill='none' stroke='%23fffdf6' stroke-width='1.1' opacity='.85'/%3E%3Cpath d='M60 38 Q176 30 292 34.5' fill='none' stroke='%23120a04' stroke-width='.8' opacity='.5'/%3E%3Cg transform='rotate(-19 58 35)'%3E%3Crect x='39' y='22.5' width='18' height='7' rx='2' fill='%23281d13'/%3E%3Crect x='41' y='23.1' width='14' height='2.2' rx='1.1' fill='%237a6a52' opacity='.8'/%3E%3Cpath d='M56 24 L64 20 L66 23 L58 27 Z' fill='%23342617'/%3E%3Crect x='28' y='29.5' width='34' height='15' rx='2.5' fill='url(%23hs)'/%3E%3Crect x='30' y='30.8' width='30' height='2.8' rx='1.4' fill='%23655849' opacity='.9'/%3E%3Crect x='29' y='42' width='32' height='2.4' rx='1.2' fill='%23000' opacity='.5'/%3E%3Crect x='31' y='44.5' width='24' height='8' rx='1.5' fill='url(%23cart)'/%3E%3Crect x='32.5' y='45' width='21' height='1.8' rx='.9' fill='%23fdf6e6' opacity='.7'/%3E%3Ctext x='43' y='51' font-family='Baloo 2, sans-serif' font-size='4.4' font-weight='700' fill='%232a2013' text-anchor='middle' opacity='.75'%3E33%3C/text%3E%3Cpath d='M42.5 52.5 L41 58' stroke='%23c9ccd2' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpath d='M42.5 52.5 L41 58' stroke='%23fffdf6' stroke-width='.5' stroke-linecap='round' opacity='.8'/%3E%3Ccircle cx='41' cy='58' r='1.3' fill='%23fffdf6'/%3E%3Ccircle cx='41' cy='58' r='2.4' fill='%23fff' opacity='.25'/%3E%3C/g%3E%3Ccircle cx='300' cy='31.5' r='3.6' fill='%23e7d7b4'/%3E%3Ccircle cx='298.8' cy='30.3' r='1.3' fill='%23fffaf0'/%3E%3C/svg%3E") center / contain no-repeat;
  filter: drop-shadow(7px 15px 8px rgba(8, 3, 1, 0.55));
}

/* ---- THE SPEAKER STACK: the void-element trick — meta is display:none
   per the UA sheet, but opted back in it renders nothing itself while
   its pseudos become two more fixed prop layers. meta:first-of-type::before
   is the bass cabinet anchoring the lower-left: walnut box lit hard on
   its top edge by the lamp directly above, cream rim light down the
   near edge, tweeter/mid/woofer with COARSE concentric cone rings
   (corner-parked per the flicker law), pearl dust caps catching the
   lamp on their 10 o'clock, and tonight's 12-inch sleeves leaned
   against its right side — chocolate ring, cream half-moon, burnt
   orange stripe — each with a rim-lit top edge and a shared floor
   shadow pooling away from the light. One SVG so the objects stay
   CONNECTED: sleeves touch cabinet, everything shares the floor.
   STATIC, promoted. ---- */
head meta:first-of-type { display: var(--house-scenery, block); }
head meta:first-of-type::before {
  content: "";
  display: var(--house-scenery, block);
  position: fixed;
  left: 26px;
  bottom: 0;
  width: 380px;
  height: 332px;
  z-index: 18;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 380 332'%3E%3Cdefs%3E%3ClinearGradient id='wd' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%239a6330'/%3E%3Cstop offset='.28' stop-color='%236f4420'/%3E%3Cstop offset='.55' stop-color='%234c2c13'/%3E%3Cstop offset='.8' stop-color='%23301b0a'/%3E%3Cstop offset='1' stop-color='%231a0c04'/%3E%3C/linearGradient%3E%3ClinearGradient id='tg' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23c8905a' stop-opacity='.85'/%3E%3Cstop offset='1' stop-color='%23c8905a' stop-opacity='0'/%3E%3C/linearGradient%3E%3CradialGradient id='cl' cx='36%25' cy='26%25' r='85%25'%3E%3Cstop offset='0' stop-color='%232f180a'/%3E%3Cstop offset='.6' stop-color='%231e0e05'/%3E%3Cstop offset='1' stop-color='%23120702'/%3E%3C/radialGradient%3E%3CradialGradient id='cn' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0' stop-color='%23140901'/%3E%3Cstop offset='.62' stop-color='%232a1507'/%3E%3Cstop offset='.9' stop-color='%234c2c11'/%3E%3Cstop offset='1' stop-color='%23231106'/%3E%3C/radialGradient%3E%3CradialGradient id='cp' cx='36%25' cy='30%25' r='75%25'%3E%3Cstop offset='0' stop-color='%23c1924f'/%3E%3Cstop offset='.45' stop-color='%236f4218'/%3E%3Cstop offset='1' stop-color='%2326120a'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='128' cy='320' rx='150' ry='11' fill='%23050200' opacity='.6'/%3E%3Cellipse cx='298' cy='324' rx='76' ry='8' fill='%23050200' opacity='.5'/%3E%3Crect x='18' y='22' width='192' height='296' rx='7' fill='url(%23wd)'/%3E%3Cg stroke='%232a1608' stroke-width='1.1' fill='none' opacity='.3'%3E%3Cpath d='M26 26 Q22 160 27 314'/%3E%3Cpath d='M201 26 Q205 160 200 314'/%3E%3C/g%3E%3Cg stroke='%23a06834' stroke-width='.8' fill='none' opacity='.28'%3E%3Cpath d='M23 26 Q19 160 24 314'/%3E%3Cpath d='M204 26 Q208 160 203 314'/%3E%3C/g%3E%3Crect x='22' y='25' width='184' height='18' rx='6' fill='url(%23tg)'/%3E%3Cg stroke='%232a1608' stroke-width='1' fill='none' opacity='.26'%3E%3Cpath d='M40 33 Q112 29 188 33'/%3E%3Cpath d='M40 38 Q112 42 188 38'/%3E%3C/g%3E%3Cpath d='M22 24 L206 24' stroke='%23f2d9ac' stroke-width='2.5' stroke-linecap='round' opacity='.6'/%3E%3Cpath d='M19.5 32 L19.5 304' stroke='%23d9a86b' stroke-width='1.6' stroke-linecap='round' opacity='.3'/%3E%3Crect x='34' y='40' width='160' height='264' rx='5' fill='%230d0502'/%3E%3Crect x='38' y='44' width='152' height='256' rx='4' fill='url(%23cl)'/%3E%3Ccircle cx='114' cy='82' r='17' fill='%230a0401'/%3E%3Ccircle cx='114' cy='82' r='14' fill='%231c0d05'/%3E%3Ccircle cx='114' cy='82' r='7' fill='url(%23cp)'/%3E%3Ccircle cx='111.5' cy='79.5' r='1.8' fill='%23f6e3bd' opacity='.85'/%3E%3Ccircle cx='114' cy='158' r='40' fill='%230a0401'/%3E%3Ccircle cx='114' cy='158' r='36' fill='%23160a04'/%3E%3Cpath d='M88.5 132.5 A36 36 0 0 1 132 127' stroke='%23caa06a' stroke-width='2.5' fill='none' opacity='.22'/%3E%3Ccircle cx='114' cy='158' r='30' fill='url(%23cn)'/%3E%3Ccircle cx='114' cy='158' r='16' stroke='%23f0d6a8' stroke-opacity='.1' stroke-width='1.6' fill='none'/%3E%3Ccircle cx='114' cy='158' r='23' stroke='%23f0d6a8' stroke-opacity='.08' stroke-width='1.6' fill='none'/%3E%3Ccircle cx='114' cy='158' r='9.5' fill='url(%23cp)'/%3E%3Ccircle cx='111' cy='155' r='2' fill='%23f6e3bd' opacity='.7'/%3E%3Ccircle cx='114' cy='252' r='57' fill='%230a0401'/%3E%3Cg fill='%2343301c'%3E%3Ccircle cx='114' cy='198.5' r='2.2'/%3E%3Ccircle cx='114' cy='305.5' r='2.2'/%3E%3Ccircle cx='60.5' cy='252' r='2.2'/%3E%3Ccircle cx='167.5' cy='252' r='2.2'/%3E%3C/g%3E%3Ccircle cx='114' cy='252' r='52' fill='%23150a04'/%3E%3Cpath d='M76 216 A52 52 0 0 1 143 209' stroke='%23caa06a' stroke-width='3' fill='none' opacity='.2'/%3E%3Ccircle cx='114' cy='252' r='44' fill='url(%23cn)'/%3E%3Ccircle cx='114' cy='252' r='19' stroke='%23f0d6a8' stroke-opacity='.11' stroke-width='2' fill='none'/%3E%3Ccircle cx='114' cy='252' r='27' stroke='%23f0d6a8' stroke-opacity='.09' stroke-width='2' fill='none'/%3E%3Ccircle cx='114' cy='252' r='35' stroke='%23f0d6a8' stroke-opacity='.07' stroke-width='2' fill='none'/%3E%3Cpath d='M84 284 A44 44 0 0 0 152 270' stroke='%23e9c48f' stroke-width='5' fill='none' opacity='.12'/%3E%3Ccircle cx='114' cy='252' r='13' fill='url(%23cp)'/%3E%3Cellipse cx='110' cy='247' rx='3.4' ry='2.4' fill='%23f6e3bd' opacity='.75'/%3E%3Crect x='46' y='288' width='26' height='8' rx='2' fill='%23caa06a' opacity='.55'/%3E%3Crect x='50' y='291' width='14' height='2.4' rx='1.2' fill='%231d0e04'/%3E%3Crect x='208' y='206' width='10' height='110' rx='1' fill='%237d4e20' transform='rotate(-3 210 316)'/%3E%3Cg transform='rotate(-6 218 318)'%3E%3Cpath d='M338 196 L346 200 L346 320 L338 318 Z' fill='%23301a0a'/%3E%3Crect x='218' y='196' width='122' height='122' rx='2' fill='%234f2a11' stroke='%23120802' stroke-opacity='.6' stroke-width='1'/%3E%3Crect x='218' y='196' width='122' height='122' rx='2' fill='url(%23cl)' opacity='.28'/%3E%3Cpath d='M220 197.5 L338 197.5' stroke='%23f0cd94' stroke-width='2.4' opacity='.65'/%3E%3Cpath d='M220 199.5 L338 199.5' stroke='%23120802' stroke-width='1' opacity='.4'/%3E%3Ccircle cx='292' cy='225' r='27' stroke='%23e6d2a6' stroke-width='5.5' fill='none' opacity='.82'/%3E%3Ccircle cx='292' cy='225' r='27' stroke='%23120802' stroke-width='1' fill='none' opacity='.3'/%3E%3Ccircle cx='292' cy='225' r='8' fill='%23e6d2a6' opacity='.7'/%3E%3Ccircle cx='289' cy='222' r='2.4' fill='%23fff3d8' opacity='.6'/%3E%3Cpath d='M234 300 L326 300' stroke='%23c99a5e' stroke-width='2.5' opacity='.4'/%3E%3Cpath d='M234 307 L306 307' stroke='%23a87c46' stroke-width='2' opacity='.32'/%3E%3C/g%3E%3Cg transform='rotate(-15 272 324)'%3E%3Cpath d='M356 240 L362 244 L362 324 L356 324 Z' fill='%23a88a58'/%3E%3Crect x='272' y='240' width='84' height='84' rx='2' fill='%23e2cda1' stroke='%23140a03' stroke-opacity='.55' stroke-width='1.5'/%3E%3Crect x='272' y='240' width='84' height='84' rx='2' fill='url(%23cl)' opacity='.14'/%3E%3Cpath d='M274 241.5 L354 241.5' stroke='%23fdf3da' stroke-width='2.4' opacity='.95'/%3E%3Crect x='273' y='241' width='5' height='82' fill='%23c2a06e'/%3E%3Crect x='273' y='241' width='2' height='82' fill='%23fdf3da' opacity='.5'/%3E%3Cellipse cx='320' cy='236' rx='34' ry='9' fill='%23080402' opacity='.5'/%3E%3Cpath d='M286 240 A34 34 0 0 1 354 240 Z' fill='%23120a05'/%3E%3Cpath d='M289 240 A31 31 0 0 1 351 240 Z' fill='%231d0f06'/%3E%3Cpath d='M292 240 A28 28 0 0 1 348 240' fill='none' stroke='%23473019' stroke-width='.8' opacity='.5'/%3E%3Cpath d='M300 240 A20 20 0 0 1 340 240 Z' fill='%23c96f24'/%3E%3Cpath d='M300 240 A20 20 0 0 1 340 240' fill='none' stroke='%23f4cd93' stroke-width='1' opacity='.6'/%3E%3Ccircle cx='320' cy='240' r='2.6' fill='%23f6e3bd'/%3E%3Ccircle cx='320' cy='240' r='1' fill='%23241206'/%3E%3Ccircle cx='302' cy='285' r='15' fill='none' stroke='%23c96f24' stroke-width='3.5' opacity='.85'/%3E%3Crect x='291' y='305' width='50' height='3.4' rx='1.7' fill='%23b08a52' opacity='.7'/%3E%3Crect x='291' y='312' width='38' height='2.8' rx='1.4' fill='%23b08a52' opacity='.5'/%3E%3C/g%3E%3C/svg%3E") center bottom / contain no-repeat;
}

/* ---- THE PENDANT LAMP: the second pseudo on the speaker's meta node.
   This is the light SOURCE the whole scene answers to — an enamel dome
   shade hung on a braided cord in the top-left corner, its warm bulb
   glowing under the lip and pouring the shaft that rakes the room. Now
   the volumetric beam has a visible origin instead of appearing from
   nowhere, and the big top-left dead space carries a hero prop. Enamel
   shade material: dark green-black outside with a hard top rim-light,
   a lit inner reflector, a brass fitting collar, and a hot filament
   bulb. STATIC, corner-parked (flicker-safe), one unbroken SVG line. ---- */
head meta:first-of-type::after {
  content: "";
  display: var(--house-scenery, block);
  position: fixed;
  left: -46px;
  top: -72px;
  width: 300px;
  height: 330px;
  z-index: 17;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 330'%3E%3Cdefs%3E%3CradialGradient id='glow' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0' stop-color='%23fff3d2' stop-opacity='.85'/%3E%3Cstop offset='.28' stop-color='%23ffd98f' stop-opacity='.4'/%3E%3Cstop offset='.6' stop-color='%23e0932f' stop-opacity='.12'/%3E%3Cstop offset='1' stop-color='%23e0932f' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='shade' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%235a4a2c'/%3E%3Cstop offset='.32' stop-color='%23352712'/%3E%3Cstop offset='.62' stop-color='%231c1206'/%3E%3Cstop offset='1' stop-color='%23100a03'/%3E%3C/linearGradient%3E%3CradialGradient id='refl' cx='50%25' cy='96%25' r='62%25'%3E%3Cstop offset='0' stop-color='%23fff0cf'/%3E%3Cstop offset='.4' stop-color='%23f0b25a'/%3E%3Cstop offset='.8' stop-color='%236e3f14'/%3E%3Cstop offset='1' stop-color='%23281607'/%3E%3C/radialGradient%3E%3ClinearGradient id='brass' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23e8c98a'/%3E%3Cstop offset='.5' stop-color='%23a4762f'/%3E%3Cstop offset='1' stop-color='%234a3113'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cellipse cx='138' cy='210' rx='128' ry='118' fill='url(%23glow)'/%3E%3Crect x='134' y='0' width='4' height='96' fill='%23241a0e'/%3E%3Crect x='135' y='0' width='1.4' height='96' fill='%236a5636' opacity='.6'/%3E%3Crect x='128' y='92' width='20' height='14' rx='3' fill='url(%23brass)'/%3E%3Crect x='130' y='93' width='16' height='2.4' rx='1.2' fill='%23fff0cf' opacity='.7'/%3E%3Cpath d='M138 104 C 96 104 58 132 46 176 L 230 176 C 218 132 180 104 138 104 Z' fill='url(%23shade)'/%3E%3Cpath d='M138 105 C 104 105 72 127 56 166' fill='none' stroke='%23e9d3a0' stroke-width='2.4' opacity='.55'/%3E%3Cpath d='M46 176 L230 176 L226 186 L50 186 Z' fill='url(%23refl)' opacity='.92'/%3E%3Cellipse cx='138' cy='186' rx='90' ry='13' fill='%23fff2d0' opacity='.5'/%3E%3Cellipse cx='138' cy='190' rx='40' ry='9' fill='%23fff7e2'/%3E%3Ccircle cx='138' cy='196' r='15' fill='%23fff4d6'/%3E%3Ccircle cx='138' cy='196' r='8' fill='%23fffdf4'/%3E%3Cpath d='M133 196 Q138 188 143 196' fill='none' stroke='%23fff' stroke-width='1.4' opacity='.85'/%3E%3C/svg%3E") left top / contain no-repeat;
}

/* ---- THE SUNBURST GIG-POSTER: the room's HERO WALL PIECE, filling the
   big center-left dead field the crawl passes through. A framed 70s
   sunburst print — the theme's promised "sunburst" delivered as a real
   pressed object, not a gradient smear — hung on the panelled wall, lit
   from the upper-left lamp (bright top-left, shadowed lower-right) with
   a soft specular sheen across its glass (static specular = flicker-safe).
   Void-element trick: the second <meta> renders nothing but its pseudos
   become fixed prop layers. STATIC, promoted, one unbroken SVG line. ---- */
head meta:last-of-type { display: var(--house-scenery, block); }
head meta:last-of-type::before {
  content: "";
  display: var(--house-scenery, block);
  position: fixed;
  left: 8.5vw;
  top: 4.5vh;
  width: 340px;
  height: 442px;
  z-index: 15;
  pointer-events: none;
  transform: translateZ(0) rotate(-1deg);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 360 468'%3E%3Cdefs%3E%3ClinearGradient id='fr' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%236b4523'/%3E%3Cstop offset='.3' stop-color='%234e2f16'/%3E%3Cstop offset='.7' stop-color='%23331d0c'/%3E%3Cstop offset='1' stop-color='%231c0f05'/%3E%3C/linearGradient%3E%3CradialGradient id='mat' cx='34%25' cy='26%25' r='90%25'%3E%3Cstop offset='0' stop-color='%23f6e8cc'/%3E%3Cstop offset='.6' stop-color='%23ecd9b0'/%3E%3Cstop offset='1' stop-color='%23d8bd8e'/%3E%3C/radialGradient%3E%3CradialGradient id='burst' cx='50%25' cy='50%25' r='62%25'%3E%3Cstop offset='0' stop-color='%23ffd38a'/%3E%3Cstop offset='.5' stop-color='%23ffd38a' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='lampfall' cx='30%25' cy='16%25' r='95%25'%3E%3Cstop offset='0' stop-color='%23fff2d2' stop-opacity='.42'/%3E%3Cstop offset='.45' stop-color='%23fff2d2' stop-opacity='0'/%3E%3Cstop offset='.8' stop-color='%23000000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23120802' stop-opacity='.5'/%3E%3C/radialGradient%3E%3CclipPath id='poster'%3E%3Crect x='30' y='30' width='300' height='356' rx='4'/%3E%3C/clipPath%3E%3C/defs%3E%3Crect x='22' y='30' width='330' height='420' rx='10' fill='%23070300' opacity='.5'/%3E%3Crect x='10' y='12' width='340' height='420' rx='9' fill='url(%23fr)'/%3E%3Crect x='10' y='12' width='340' height='420' rx='9' fill='none' stroke='%23100a04' stroke-opacity='.6' stroke-width='1.5'/%3E%3Cpath d='M14 16 L346 16' stroke='%23c99a5e' stroke-width='2.4' opacity='.75'/%3E%3Cpath d='M14 16 L14 428' stroke='%23a87c46' stroke-width='2' opacity='.5'/%3E%3Crect x='28' y='28' width='304' height='360' rx='5' fill='none' stroke='%23140a04' stroke-width='3' opacity='.55'/%3E%3Crect x='24' y='24' width='312' height='386' rx='6' fill='url(%23mat)'/%3E%3Cg clip-path='url(%23poster)'%3E%3Crect x='30' y='30' width='300' height='356' fill='%23b5601a'/%3E%3Cpath d='M180 206 L480.0 206.0 L476.3 252.9 Z' fill='%23e08a30'/%3E%3Cpath d='M180 206 L476.3 252.9 L465.3 298.7 Z' fill='%23c56a1c'/%3E%3Cpath d='M180 206 L465.3 298.7 L447.3 342.2 Z' fill='%23e08a30'/%3E%3Cpath d='M180 206 L447.3 342.2 L422.7 382.3 Z' fill='%23c56a1c'/%3E%3Cpath d='M180 206 L422.7 382.3 L392.1 418.1 Z' fill='%23e08a30'/%3E%3Cpath d='M180 206 L392.1 418.1 L356.3 448.7 Z' fill='%23c56a1c'/%3E%3Cpath d='M180 206 L356.3 448.7 L316.2 473.3 Z' fill='%23e08a30'/%3E%3Cpath d='M180 206 L316.2 473.3 L272.7 491.3 Z' fill='%23c56a1c'/%3E%3Cpath d='M180 206 L272.7 491.3 L226.9 502.3 Z' fill='%23e08a30'/%3E%3Cpath d='M180 206 L226.9 502.3 L180.0 506.0 Z' fill='%23c56a1c'/%3E%3Cpath d='M180 206 L180.0 506.0 L133.1 502.3 Z' fill='%23e08a30'/%3E%3Cpath d='M180 206 L133.1 502.3 L87.3 491.3 Z' fill='%23c56a1c'/%3E%3Cpath d='M180 206 L87.3 491.3 L43.8 473.3 Z' fill='%23e08a30'/%3E%3Cpath d='M180 206 L43.8 473.3 L3.7 448.7 Z' fill='%23c56a1c'/%3E%3Cpath d='M180 206 L3.7 448.7 L-32.1 418.1 Z' fill='%23e08a30'/%3E%3Cpath d='M180 206 L-32.1 418.1 L-62.7 382.3 Z' fill='%23c56a1c'/%3E%3Cpath d='M180 206 L-62.7 382.3 L-87.3 342.2 Z' fill='%23e08a30'/%3E%3Cpath d='M180 206 L-87.3 342.2 L-105.3 298.7 Z' fill='%23c56a1c'/%3E%3Cpath d='M180 206 L-105.3 298.7 L-116.3 252.9 Z' fill='%23e08a30'/%3E%3Cpath d='M180 206 L-116.3 252.9 L-120.0 206.0 Z' fill='%23c56a1c'/%3E%3Cpath d='M180 206 L-120.0 206.0 L-116.3 159.1 Z' fill='%23e08a30'/%3E%3Cpath d='M180 206 L-116.3 159.1 L-105.3 113.3 Z' fill='%23c56a1c'/%3E%3Cpath d='M180 206 L-105.3 113.3 L-87.3 69.8 Z' fill='%23e08a30'/%3E%3Cpath d='M180 206 L-87.3 69.8 L-62.7 29.7 Z' fill='%23c56a1c'/%3E%3Cpath d='M180 206 L-62.7 29.7 L-32.1 -6.1 Z' fill='%23e08a30'/%3E%3Cpath d='M180 206 L-32.1 -6.1 L3.7 -36.7 Z' fill='%23c56a1c'/%3E%3Cpath d='M180 206 L3.7 -36.7 L43.8 -61.3 Z' fill='%23e08a30'/%3E%3Cpath d='M180 206 L43.8 -61.3 L87.3 -79.3 Z' fill='%23c56a1c'/%3E%3Cpath d='M180 206 L87.3 -79.3 L133.1 -90.3 Z' fill='%23e08a30'/%3E%3Cpath d='M180 206 L133.1 -90.3 L180.0 -94.0 Z' fill='%23c56a1c'/%3E%3Cpath d='M180 206 L180.0 -94.0 L226.9 -90.3 Z' fill='%23e08a30'/%3E%3Cpath d='M180 206 L226.9 -90.3 L272.7 -79.3 Z' fill='%23c56a1c'/%3E%3Cpath d='M180 206 L272.7 -79.3 L316.2 -61.3 Z' fill='%23e08a30'/%3E%3Cpath d='M180 206 L316.2 -61.3 L356.3 -36.7 Z' fill='%23c56a1c'/%3E%3Cpath d='M180 206 L356.3 -36.7 L392.1 -6.1 Z' fill='%23e08a30'/%3E%3Cpath d='M180 206 L392.1 -6.1 L422.7 29.7 Z' fill='%23c56a1c'/%3E%3Cpath d='M180 206 L422.7 29.7 L447.3 69.8 Z' fill='%23e08a30'/%3E%3Cpath d='M180 206 L447.3 69.8 L465.3 113.3 Z' fill='%23c56a1c'/%3E%3Cpath d='M180 206 L465.3 113.3 L476.3 159.1 Z' fill='%23e08a30'/%3E%3Cpath d='M180 206 L476.3 159.1 L480.0 206.0 Z' fill='%23c56a1c'/%3E%3Crect x='30' y='30' width='300' height='356' fill='url(%23burst)'/%3E%3Ccircle cx='180' cy='206' r='52' fill='%23140a04'/%3E%3Ccircle cx='180' cy='206' r='52' fill='none' stroke='%23fff0cf' stroke-opacity='.25' stroke-width='1'/%3E%3Ccircle cx='180' cy='206' r='30' fill='%23e0862c'/%3E%3Ccircle cx='180' cy='206' r='30' fill='none' stroke='%23fbe3b4' stroke-width='1' opacity='.5'/%3E%3Ccircle cx='180' cy='206' r='6' fill='%23140a04'/%3E%3Ctext x='180' y='84' font-family='Fredoka, sans-serif' font-weight='700' font-size='34' fill='%23140a04' text-anchor='middle' letter-spacing='1'%3EDEEP%3C/text%3E%3Ctext x='180' y='120' font-family='Fredoka, sans-serif' font-weight='700' font-size='34' fill='%23140a04' text-anchor='middle' letter-spacing='1'%3EHOUSE%3C/text%3E%3Crect x='30' y='320' width='300' height='66' fill='%23140a04' opacity='.9'/%3E%3Ctext x='180' y='348' font-family='Baloo 2, sans-serif' font-weight='700' font-size='17' fill='%23f6e8cc' text-anchor='middle' letter-spacing='3'%3ELIVE TO TAPE%3C/text%3E%3Ctext x='180' y='372' font-family='Baloo 2, sans-serif' font-weight='600' font-size='11' fill='%23eda45f' text-anchor='middle' letter-spacing='4'%3EONE NIGHT ONLY%3C/text%3E%3C/g%3E%3Crect x='30' y='30' width='300' height='356' rx='4' fill='none' stroke='%23000000' stroke-opacity='.19' stroke-width='2'/%3E%3Cpath d='M24 24 L150 24 L64 410 L24 410 Z' fill='%23ffffff' opacity='.06'/%3E%3Cpath d='M120 24 L176 24 L92 410 L44 410 Z' fill='%23ffffff' opacity='.045'/%3E%3Crect x='10' y='12' width='340' height='420' rx='9' fill='url(%23lampfall)'/%3E%3Cpath d='M120 12 L180 -6 L240 12' fill='none' stroke='%23241a0e' stroke-width='1.6' opacity='.7'/%3E%3Ccircle cx='180' cy='-7' r='3' fill='%23b58c52'/%3E%3Ccircle cx='178.5' cy='-8.5' r='1' fill='%23fff0cf'/%3E%3C/svg%3E") left top / contain no-repeat;
  filter: drop-shadow(10px 16px 22px rgba(6, 2, 0, 0.55));
}

/* ---- THE RECORD SHELF: the right-wall answer to the poster, so the
   room reads as a balanced listening room instead of one lit corner.
   A floating wall shelf carrying a row of leaned LP spines, a framed
   45 propped at the end, iron brackets, and a trailing pothos — the
   crate-digger's collection on the wall. Lit from the upper-left lamp,
   static, promoted, one unbroken SVG line. Sits above the turntable so
   it never crowds the lane. ---- */
head meta:last-of-type::after {
  content: "";
  display: var(--house-scenery, block);
  position: fixed;
  right: 3.4vw;
  top: 15vh;
  width: 366px;
  height: 240px;
  z-index: 15;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 380 250'%3E%3Cdefs%3E%3ClinearGradient id='shelf' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%238a5a2e'/%3E%3Cstop offset='.4' stop-color='%235c3819'/%3E%3Cstop offset='1' stop-color='%232e1a0b'/%3E%3C/linearGradient%3E%3ClinearGradient id='lean' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23f2e3c4'/%3E%3Cstop offset='1' stop-color='%23c9a86e'/%3E%3C/linearGradient%3E%3CradialGradient id='sfall' cx='24%25' cy='10%25' r='120%25'%3E%3Cstop offset='0' stop-color='%23fff2d2' stop-opacity='.28'/%3E%3Cstop offset='.5' stop-color='%23fff2d2' stop-opacity='0'/%3E%3Cstop offset='.85' stop-color='%23120802' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect x='40' y='40' width='8' height='166' rx='1.5' fill='%239a5a2c'/%3E%3Crect x='40' y='40' width='8' height='2' rx='1' fill='%23fff0cf' opacity='0.40'/%3E%3Crect x='40' y='40' width='1.6' height='166' fill='%23fff0cf' opacity='0.30'/%3E%3Crect x='46.6' y='40' width='1.4' height='166' fill='%230a0401' opacity='.4'/%3E%3Crect x='40' y='82' width='8' height='11' fill='%23eda45f' opacity='.9'/%3E%3Crect x='41.5' y='130' width='5' height='1.6' fill='%23140a04' opacity='.35'/%3E%3Crect x='41.5' y='152' width='5' height='1.6' fill='%23140a04' opacity='.28'/%3E%3Crect x='50.6' y='34' width='9' height='172' rx='1.5' fill='%23d97b29'/%3E%3Crect x='50.6' y='34' width='9' height='2' rx='1' fill='%23fff0cf' opacity='0.39'/%3E%3Crect x='50.6' y='34' width='1.6' height='172' fill='%23fff0cf' opacity='0.29'/%3E%3Crect x='58.2' y='34' width='1.4' height='172' fill='%230a0401' opacity='.4'/%3E%3Crect x='50.6' y='76' width='9' height='11' fill='%23f4e8d0' opacity='.9'/%3E%3Crect x='52.1' y='124' width='6' height='1.6' fill='%23140a04' opacity='.35'/%3E%3Crect x='52.1' y='146' width='6' height='1.6' fill='%23140a04' opacity='.28'/%3E%3Crect x='62.2' y='46' width='10' height='160' rx='1.5' fill='%234a2c17'/%3E%3Crect x='62.2' y='46' width='10' height='2' rx='1' fill='%23fff0cf' opacity='0.38'/%3E%3Crect x='62.2' y='46' width='1.6' height='160' fill='%23fff0cf' opacity='0.29'/%3E%3Crect x='70.8' y='46' width='1.4' height='160' fill='%230a0401' opacity='.4'/%3E%3Crect x='62.2' y='88' width='10' height='11' fill='%23d97b29' opacity='.9'/%3E%3Crect x='63.7' y='136' width='7' height='1.6' fill='%23140a04' opacity='.35'/%3E%3Crect x='63.7' y='158' width='7' height='1.6' fill='%23140a04' opacity='.28'/%3E%3Crect x='74.8' y='38' width='8' height='168' rx='1.5' fill='%23eda45f'/%3E%3Crect x='74.8' y='38' width='8' height='2' rx='1' fill='%23fff0cf' opacity='0.38'/%3E%3Crect x='74.8' y='38' width='1.6' height='168' fill='%23fff0cf' opacity='0.28'/%3E%3Crect x='81.39999999999999' y='38' width='1.4' height='168' fill='%230a0401' opacity='.4'/%3E%3Crect x='74.8' y='80' width='8' height='11' fill='%234a2c17' opacity='.9'/%3E%3Crect x='76.3' y='128' width='5' height='1.6' fill='%23140a04' opacity='.35'/%3E%3Crect x='76.3' y='150' width='5' height='1.6' fill='%23140a04' opacity='.28'/%3E%3Crect x='85.39999999999999' y='30' width='9' height='176' rx='1.5' fill='%23a9531f'/%3E%3Crect x='85.39999999999999' y='30' width='9' height='2' rx='1' fill='%23fff0cf' opacity='0.37'/%3E%3Crect x='85.39999999999999' y='30' width='1.6' height='176' fill='%23fff0cf' opacity='0.28'/%3E%3Crect x='92.99999999999999' y='30' width='1.4' height='176' fill='%230a0401' opacity='.4'/%3E%3Crect x='85.39999999999999' y='72' width='9' height='11' fill='%23f4e8d0' opacity='.9'/%3E%3Crect x='86.89999999999999' y='120' width='6' height='1.6' fill='%23140a04' opacity='.35'/%3E%3Crect x='86.89999999999999' y='142' width='6' height='1.6' fill='%23140a04' opacity='.28'/%3E%3Crect x='96.99999999999999' y='48' width='10' height='158' rx='1.5' fill='%236f3d1c'/%3E%3Crect x='96.99999999999999' y='48' width='10' height='2' rx='1' fill='%23fff0cf' opacity='0.36'/%3E%3Crect x='96.99999999999999' y='48' width='1.6' height='158' fill='%23fff0cf' opacity='0.27'/%3E%3Crect x='105.59999999999998' y='48' width='1.4' height='158' fill='%230a0401' opacity='.4'/%3E%3Crect x='96.99999999999999' y='90' width='10' height='11' fill='%23eda45f' opacity='.9'/%3E%3Crect x='98.49999999999999' y='138' width='7' height='1.6' fill='%23140a04' opacity='.35'/%3E%3Crect x='98.49999999999999' y='160' width='7' height='1.6' fill='%23140a04' opacity='.28'/%3E%3Crect x='109.59999999999998' y='36' width='8' height='170' rx='1.5' fill='%23c56a1c'/%3E%3Crect x='109.59999999999998' y='36' width='8' height='2' rx='1' fill='%23fff0cf' opacity='0.35'/%3E%3Crect x='109.59999999999998' y='36' width='1.6' height='170' fill='%23fff0cf' opacity='0.26'/%3E%3Crect x='116.19999999999997' y='36' width='1.4' height='170' fill='%230a0401' opacity='.4'/%3E%3Crect x='109.59999999999998' y='78' width='8' height='11' fill='%234a2c17' opacity='.9'/%3E%3Crect x='111.09999999999998' y='126' width='5' height='1.6' fill='%23140a04' opacity='.35'/%3E%3Crect x='111.09999999999998' y='148' width='5' height='1.6' fill='%23140a04' opacity='.28'/%3E%3Crect x='120.19999999999997' y='42' width='9' height='164' rx='1.5' fill='%237a4322'/%3E%3Crect x='120.19999999999997' y='42' width='9' height='2' rx='1' fill='%23fff0cf' opacity='0.34'/%3E%3Crect x='120.19999999999997' y='42' width='1.6' height='164' fill='%23fff0cf' opacity='0.26'/%3E%3Crect x='127.79999999999998' y='42' width='1.4' height='164' fill='%230a0401' opacity='.4'/%3E%3Crect x='120.19999999999997' y='84' width='9' height='11' fill='%23eda45f' opacity='.9'/%3E%3Crect x='121.69999999999997' y='132' width='6' height='1.6' fill='%23140a04' opacity='.35'/%3E%3Crect x='121.69999999999997' y='154' width='6' height='1.6' fill='%23140a04' opacity='.28'/%3E%3Crect x='131.79999999999998' y='32' width='10' height='174' rx='1.5' fill='%23e0862c'/%3E%3Crect x='131.79999999999998' y='32' width='10' height='2' rx='1' fill='%23fff0cf' opacity='0.34'/%3E%3Crect x='131.79999999999998' y='32' width='1.6' height='174' fill='%23fff0cf' opacity='0.25'/%3E%3Crect x='140.39999999999998' y='32' width='1.4' height='174' fill='%230a0401' opacity='.4'/%3E%3Crect x='131.79999999999998' y='74' width='10' height='11' fill='%234a2c17' opacity='.9'/%3E%3Crect x='133.29999999999998' y='122' width='7' height='1.6' fill='%23140a04' opacity='.35'/%3E%3Crect x='133.29999999999998' y='144' width='7' height='1.6' fill='%23140a04' opacity='.28'/%3E%3Crect x='144.39999999999998' y='46' width='8' height='160' rx='1.5' fill='%235a3016'/%3E%3Crect x='144.39999999999998' y='46' width='8' height='2' rx='1' fill='%23fff0cf' opacity='0.33'/%3E%3Crect x='144.39999999999998' y='46' width='1.6' height='160' fill='%23fff0cf' opacity='0.25'/%3E%3Crect x='150.99999999999997' y='46' width='1.4' height='160' fill='%230a0401' opacity='.4'/%3E%3Crect x='144.39999999999998' y='88' width='8' height='11' fill='%23d97b29' opacity='.9'/%3E%3Crect x='145.89999999999998' y='136' width='5' height='1.6' fill='%23140a04' opacity='.35'/%3E%3Crect x='145.89999999999998' y='158' width='5' height='1.6' fill='%23140a04' opacity='.28'/%3E%3Crect x='154.99999999999997' y='38' width='9' height='168' rx='1.5' fill='%23b5601a'/%3E%3Crect x='154.99999999999997' y='38' width='9' height='2' rx='1' fill='%23fff0cf' opacity='0.32'/%3E%3Crect x='154.99999999999997' y='38' width='1.6' height='168' fill='%23fff0cf' opacity='0.24'/%3E%3Crect x='162.59999999999997' y='38' width='1.4' height='168' fill='%230a0401' opacity='.4'/%3E%3Crect x='154.99999999999997' y='80' width='9' height='11' fill='%23f4e8d0' opacity='.9'/%3E%3Crect x='156.49999999999997' y='128' width='6' height='1.6' fill='%23140a04' opacity='.35'/%3E%3Crect x='156.49999999999997' y='150' width='6' height='1.6' fill='%23140a04' opacity='.28'/%3E%3Crect x='166.59999999999997' y='34' width='10' height='172' rx='1.5' fill='%238c4f2b'/%3E%3Crect x='166.59999999999997' y='34' width='10' height='2' rx='1' fill='%23fff0cf' opacity='0.31'/%3E%3Crect x='166.59999999999997' y='34' width='1.6' height='172' fill='%23fff0cf' opacity='0.23'/%3E%3Crect x='175.19999999999996' y='34' width='1.4' height='172' fill='%230a0401' opacity='.4'/%3E%3Crect x='166.59999999999997' y='76' width='10' height='11' fill='%23eda45f' opacity='.9'/%3E%3Crect x='168.09999999999997' y='124' width='7' height='1.6' fill='%23140a04' opacity='.35'/%3E%3Crect x='168.09999999999997' y='146' width='7' height='1.6' fill='%23140a04' opacity='.28'/%3E%3Crect x='179.19999999999996' y='44' width='8' height='162' rx='1.5' fill='%23c77024'/%3E%3Crect x='179.19999999999996' y='44' width='8' height='2' rx='1' fill='%23fff0cf' opacity='0.30'/%3E%3Crect x='179.19999999999996' y='44' width='1.6' height='162' fill='%23fff0cf' opacity='0.23'/%3E%3Crect x='185.79999999999995' y='44' width='1.4' height='162' fill='%230a0401' opacity='.4'/%3E%3Crect x='179.19999999999996' y='86' width='8' height='11' fill='%234a2c17' opacity='.9'/%3E%3Crect x='180.69999999999996' y='134' width='5' height='1.6' fill='%23140a04' opacity='.35'/%3E%3Crect x='180.69999999999996' y='156' width='5' height='1.6' fill='%23140a04' opacity='.28'/%3E%3Crect x='189.79999999999995' y='36' width='9' height='170' rx='1.5' fill='%234a2c17'/%3E%3Crect x='189.79999999999995' y='36' width='9' height='2' rx='1' fill='%23fff0cf' opacity='0.30'/%3E%3Crect x='189.79999999999995' y='36' width='1.6' height='170' fill='%23fff0cf' opacity='0.22'/%3E%3Crect x='197.39999999999995' y='36' width='1.4' height='170' fill='%230a0401' opacity='.4'/%3E%3Crect x='189.79999999999995' y='78' width='9' height='11' fill='%23eda45f' opacity='.9'/%3E%3Crect x='191.29999999999995' y='126' width='6' height='1.6' fill='%23140a04' opacity='.35'/%3E%3Crect x='191.29999999999995' y='148' width='6' height='1.6' fill='%23140a04' opacity='.28'/%3E%3Cg transform='rotate(6 300 130)'%3E%3Crect x='276' y='70' width='72' height='128' rx='2' fill='%23241206'/%3E%3Crect x='276' y='70' width='72' height='128' rx='2' fill='none' stroke='%23c99a5e' stroke-opacity='.4' stroke-width='1'/%3E%3Crect x='282' y='76' width='60' height='94' fill='%23b5601a'/%3E%3Ccircle cx='312' cy='123' r='26' fill='%23140a04'/%3E%3Ccircle cx='312' cy='123' r='13' fill='%23e0862c'/%3E%3Ccircle cx='312' cy='123' r='3' fill='%23140a04'/%3E%3Crect x='282' y='176' width='60' height='16' fill='%23140a04' opacity='.85'/%3E%3Cpath d='M278 72 L346 72' stroke='%23f2d9ac' stroke-width='1.6' opacity='.55'/%3E%3C/g%3E%3Crect x='24' y='198' width='340' height='16' rx='2' fill='url(%23shelf)'/%3E%3Crect x='24' y='198' width='340' height='2.4' fill='%23c9a86e' opacity='.6'/%3E%3Crect x='24' y='213' width='340' height='4' fill='%230a0401' opacity='.5'/%3E%3Cpath d='M60 214 L60 240 L84 214 Z' fill='%231a0f06'/%3E%3Cpath d='M304 214 L304 240 L328 214 Z' fill='%231a0f06'/%3E%3Cellipse cx='194' cy='224' rx='180' ry='8' fill='%23050200' opacity='.4'/%3E%3Cg fill='%233f5a2c' opacity='.9'%3E%3Cpath d='M40 200 Q26 220 30 244' stroke='%233f5a2c' stroke-width='2.4' fill='none'/%3E%3Cellipse cx='27' cy='222' rx='7' ry='4' transform='rotate(-30 27 222)'/%3E%3Cellipse cx='33' cy='236' rx='6.5' ry='4' transform='rotate(20 33 236)'/%3E%3Cellipse cx='24' cy='240' rx='6' ry='3.6' transform='rotate(-40 24 240)'/%3E%3C/g%3E%3Cg fill='%235a7a3c' opacity='.5'%3E%3Cellipse cx='28.5' cy='220' rx='2.4' ry='1.6' transform='rotate(-30 28.5 220)'/%3E%3C/g%3E%3C/svg%3E") right top / contain no-repeat;
  filter: drop-shadow(8px 14px 18px rgba(6, 2, 0, 0.5));
}

/* the hi-fi corners need room; on narrow canvases the turntable and
   the speaker stack (under head) would crowd the lane, so they sit
   out (kill-switch still rules everywhere else). The pendant lamp stays
   — it never crowds the lane and it motivates the light on mobile too. */
@media (max-width: 860px) {
  html::after, head, head::before, head::after { display: none; }
}

/* ---- record sides: SIDE A / SIDE B... via counters, so custom credit
   types anywhere mid-roll just become the next side. Slideshow blocks
   carry only .credits-slide, hence the :not(.flourish) arm. ---- */
.credits-roll, .credits-slideshow { counter-reset: house-side; }
.credits-block, .credits-slide:not(.flourish) { counter-increment: house-side; }

.credits-block__title {
  font-weight: 600;
  letter-spacing: 0.08em;
}
.credits-block__title::before {
  content: "SIDE " counter(house-side, upper-alpha);
  display: block;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.82rem;
  letter-spacing: 0.5em;
  margin-bottom: 0.7rem;
  color: rgba(244, 232, 208, 0.72);
}
/* base gold rule becomes a fat rounded groove-bar */
.credits-block__title::after {
  width: 6.5rem;
  height: 6px;
  border-radius: 999px;
  margin: 0.6rem auto 0;
  opacity: 0.9;
  background: linear-gradient(90deg, #8c4f2b, #d97b29 30% 70%, #8c4f2b);
}

/* ---- tracklist rows: A1  NAME .......... 500 (centered SIDE header,
   left-ragged entries, like the back of the sleeve). Names are sacred:
   min-width 0 + overflow-wrap so long handles wrap, never clip. ---- */
.credits-block__list {
  box-sizing: border-box;
  width: min(32rem, 86vw);
  margin-inline: auto;
  text-align: left;
  counter-reset: house-track;
}
.credit {
  display: flex;
  align-items: center;
  width: 100%;
  counter-increment: house-track;
}
.credit::before {
  content: counter(house-side, upper-alpha) counter(house-track);
  flex: 0 0 auto;
  min-width: 2.4em;
  font-weight: 700;
  font-size: 0.8em;
  letter-spacing: 0.06em;
  font-variant-numeric: tabular-nums;
  color: var(--house-orange);
}
.credit__name {
  min-width: 0;
  overflow-wrap: anywhere;
  font-weight: 600;
}
.credit__amount {
  flex: 1;
  display: flex;
  align-items: center;
  min-width: 0;
  opacity: 1;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--house-amber);
}
/* groove-dot leader replaces the base " · " (absent rows stay plain) */
.credit__amount::before {
  content: "";
  flex: 1 1 1.5rem;
  min-width: 1.5rem;
  margin: 0 0.65em;
  border-bottom: 3px dotted rgba(244, 232, 208, 0.3);
  position: relative;
  top: 0.3em;
}

/* ---- intro: the center label / liner-notes card. Cream paper — kill
   the bloom with the transparent-shadow no-op (NEVER "none"). Streamer
   title + tagline are only restyled; badge and rating are ours. ---- */
.flourish--intro {
  --credits-glow: 0 0 0 rgba(0, 0, 0, 0);
  --credits-shadow: 0 1px 0 rgba(255, 255, 255, 0.35);
  gap: 1.05rem;
  color: var(--house-choc);
  background:
    radial-gradient(circle at 84% -12%, rgba(217, 123, 41, 0.32) 0 9rem, rgba(217, 123, 41, 0.1) 13rem, rgba(217, 123, 41, 0) 18rem),
    linear-gradient(165deg, #f8ead0 0%, #f5e3c2 55%, #efd9b2 100%);
}
/* scroll = rotated sleeve card; slideshow slide is inset:0 = full-bleed */
body[data-mode="scroll"] .flourish--intro {
  box-sizing: border-box;
  position: relative;
  width: min(30rem, 85vw);
  padding: 3rem 2.2rem 2.6rem;
  border: 5px solid var(--house-orange);
  border-radius: 24px;
  transform: rotate(-1.2deg);
  box-shadow: 0 30px 60px rgba(6, 2, 0, 0.6), 0 10px 24px rgba(6, 2, 0, 0.42);
}
/* second inner hairline — the printed trim line inside the sleeve edge */
body[data-mode="scroll"] .flourish--intro::after {
  content: "";
  position: absolute;
  inset: 9px;
  border: 1px solid rgba(140, 79, 43, 0.45);
  border-radius: 13px;
  pointer-events: none;
}
.flourish--intro .flourish__title {
  font-weight: 700;
  text-transform: none;
  letter-spacing: 0.01em;
  font-size: clamp(2.2rem, 6.5vw, 3.8rem);
  color: var(--house-choc);
}
.flourish--intro .flourish__badge { font-size: 0; border: 0; padding: 0; box-shadow: none; }
/* double space after hex escapes is intentional: the first space terminates the escape */
.flourish--intro .flourish__badge::after {
  content: "33\\2153  RPM \\00B7  STEREO \\00B7  LONG PLAY";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 0.32em;
  padding: 0.5rem 1rem 0.5rem 1.32em;
  color: var(--house-sienna);
  border: 2px solid var(--house-orange);
  border-radius: 999px;
}
.flourish--intro .flourish__tagline {
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--house-sienna);
  opacity: 1;
}
.flourish--intro .flourish__rating { font-size: 0; border: 0; padding: 0; opacity: 1; }
.flourish--intro .flourish__rating::after {
  content: "RECORDED LIVE \\2014  NO OVERDUBS";
  font-family: var(--credits-font);
  font-weight: 600;
  font-size: 0.78rem;
  letter-spacing: 0.3em;
  padding: 0.3rem 0.8rem;
  border: 1px solid rgba(74, 44, 23, 0.55);
  border-radius: 4px;
}

/* ---- outro: the run-out groove (copy swap via font-size:0 trick) ---- */
.flourish--outro .flourish__title { font-size: 0; }
.flourish--outro .flourish__title::after {
  content: "RUN IT BACK";
  font-size: var(--credits-flourish-title-size);
  letter-spacing: 0.06em;
  color: var(--house-cream);
  text-shadow: 3px 3px 0 var(--house-choc), 0 0 26px rgba(217, 123, 41, 0.45);
}
.flourish--outro .flourish__tagline { font-size: 0; font-style: normal; }
.flourish--outro .flourish__tagline::after {
  content: "b-side coming soon \\00B7  thanks for spinning";
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  color: var(--house-amber);
}

/* ---- raid finale: the bonus cut. Outro flourish is the true last
   sibling in both modes, so raids are always nth-last-of-type(2).
   The marker blink is steps() at ~1.1 paints/s — the only animation
   inside the roll (finale-siren budget). ---- */
.credits-block:nth-last-of-type(2) .credits-block__title,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
  color: var(--house-cream);
  text-shadow: 0 0 26px rgba(217, 123, 41, 0.55), var(--credits-shadow);
}
.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  content: "BONUS CUT \\00B7  EXTENDED MIX";
  color: var(--house-amber);
  animation: house-bonus 1.8s steps(1, end) infinite;
}
.credits-block:nth-last-of-type(2) .credits-block__title::after,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::after {
  width: 9rem;
  background: linear-gradient(90deg, #d97b29, #f4e8d0 50%, #d97b29);
}
.credits-block:nth-last-of-type(2) .credit,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit {
  font-size: calc(var(--credits-name-size) * 1.1);
}
.credits-block:nth-last-of-type(2) .credit__amount::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__amount::before {
  border-bottom-color: rgba(237, 164, 95, 0.5);
}

/* ---- slideshow: the next record settles onto the platter — a tiny
   scale/rotate ease layered on the base fade (transform+opacity only,
   transition-driven, never continuous) ---- */
.credits-slide {
  transform: scale(0.97) rotate(0.6deg);
  transition: opacity 0.8s ease, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}
.credits-slide.is-active { transform: scale(1) rotate(0deg); }

/* ---- keyframes (all house- prefixed; transform/opacity only) ---- */
@keyframes house-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes house-sheen {
  from { transform: translateZ(0) rotate(0deg); }
  to   { transform: translateZ(0) rotate(360deg); }
}
@keyframes house-bonus {
  0%, 55%   { opacity: 1; }
  56%, 100% { opacity: 0.4; }
}

/* ---- reduced motion: the needle lifts — label art parks, marker
   holds, slides plain-fade ---- */
@media (prefers-reduced-motion: reduce) {
  head::after { animation: none; }
  body::after { animation: none; }
  .credits-block:nth-last-of-type(2) .credits-block__title::before,
  .credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
    animation: none;
  }
  .credits-slide { transform: none; transition: opacity 0.8s ease; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--house-scenery:none;}",
};
