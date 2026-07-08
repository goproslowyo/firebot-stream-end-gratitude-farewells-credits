import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. Dot Matrix: the last save of the night on a chunky olive-green handheld — four shades of LCD, a cartridge critter marching the grass line, BOSS RUSH before the save completes, THANKS FOR PLAYING! */
export const VARIANT: ThemeVariant = {
  key: "handheld",
  name: "Dot Matrix",
  css: `
/* ================================================================
   DOT MATRIX — layered after the base theme.
   Fiction: it's late. The whole viewport IS the reflective LCD of a
   chunky 199X handheld — four shades of olive green, a plastic glare
   leaning in from the upper-left, the bezel's shadow falling onto the
   recessed glass. On screen, the night's save file rolls its credits:
   STAGE 01, STAGE 02... item-count chips for the tallies, BOSS RUSH
   for the raids, THANKS FOR PLAYING! and SAVE COMPLETE at the end.
   A little cartridge critter marches the grass line the whole time.
   Off screen, the shell: dark plum bezel, burgundy A/B buttons in the
   bottom-right corner pod, a d-pad pod bottom-left, and the battery
   LED — which is, of course, running low.
   Palette is LAW: #0f380f / #306230 / #8bac0f / #9bbc0f on screen;
   the shell gets its own dark plastic tones.
   Layer map (all scenery kill-switched via --handheld-scenery):
     html bg (--credits-bg)   the lit LCD — one cheap linear gradient
     html::before   z:-1      LIGHT STORY — plastic glare band from the
                              upper-left, bezel recess shadows (top +
                              left), corner vignette, warm reflection
                              pooling lower-right. STATIC, promoted
     html::after    z:6       THE BEZEL — rounded dark frame hint via
                              inset rings + outer shell fill, rim light
                              where plastic meets glass. STATIC, promoted
     head::after    z:-3      pixel sky — two dithered clouds + a pixel
                              sun, far side of the glass. STATIC, promoted
     head::before   z:-2      pixel terrain strip riding the bottom edge
                              (grass lip, checker dither, dark soil —
                              fine pattern AT THE EDGE, L6-legal).
                              STATIC, promoted
     meta#1::before z:-2      CARTRIDGE CRITTER frame A (left foot
                              forward) — steps() march, 2 hops/s
     meta#1::after  z:-2      frame B (right foot forward), welded to
                              the same walk keyframe; 1s steps() swap
     meta#2::before z:7       battery pod on the left bezel — plate,
                              BATT print, LED with specular. STATIC
     meta#2::after  z:7       the LED's red glow — steps() double-dip
                              every 7s (the battery IS low)
     link::before   z:8       bezel silkscreen print, top edge:
                              "DOT-MATRIX · FOUR-SHADE DISPLAY"
     link::after    z:7       corner pods — d-pad bottom-left, A/B
                              buttons bottom-right (two SVGs, one
                              layer). STATIC, promoted
     .credits-roll::before      THE LCD CELL GRID — the one full-lane
     .credits-slideshow::before fine pattern, so it RIDES THE ROLL
                                (static on the slideshow). z:5, low
                                alpha: glyphs read as clusters of cells
   ================================================================ */
@import url('https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&family=Pixelify+Sans:wght@400..700&display=swap');

:root {
  /* the four shades — everything on-screen is built from these */
  --handheld-g0: #0f380f;
  --handheld-g1: #306230;
  --handheld-g2: #8bac0f;
  --handheld-g3: #9bbc0f;
  /* the shell */
  --handheld-shell: #292434;
  --handheld-shell-dark: #16131d;
  /* ink indirection: dark LCD ink by default; the transparent override flips
     these to the LIT shades so names stay readable once the lit screen is
     stripped (dark ink on an unknown OBS backdrop is a readability fail) */
  --handheld-ink: var(--handheld-g0);
  --handheld-ink-mid: var(--handheld-g1);

  /* base hooks. L3: the bg is ONE cheap gradient — but a real EL-backlit panel
     is lit from a lamp along ONE edge and falls off across the glass, warmest and
     brightest where the light enters, greener-then-cooler as it travels. This is a
     single radial whose heart sits high-left (the lamp corner) so the whole panel
     reads lit-from-within, not a painted swatch. All fine texture lives on the
     promoted fixed pseudos. */
  --credits-bg: radial-gradient(120% 128% at 34% 8%, #a6c516 0%, #9dbe11 26%, #92b40d 55%, #83a60b 82%, #6f9207 100%);
  --credits-color: var(--handheld-ink);
  --credits-accent: var(--handheld-ink);
  --credits-font: "Pixelify Sans", "Trebuchet MS", Verdana, sans-serif;
  --credits-title-font: "Silkscreen", "Courier New", monospace;
  --credits-title-size: clamp(1.05rem, 2.7vw, 1.65rem);
  /* names sized up a step — the pixel face turns ambiguous below ~1.1rem
     (ByteBarista read as "8yte8arista" at the old size) */
  --credits-name-size: clamp(1.1rem, 2.7vw, 1.65rem);
  --credits-flourish-title-size: clamp(1.4rem, 4.6vw, 2.9rem);
  --credits-block-gap: 4.75rem;
  --credits-name-gap: 0.7rem;
  /* LCD ghosting: a two-step SAME-HUE trail that lags to the right and down,
     the way a slow passive-matrix pixel bleeds behind the ink — not a soft blur */
  --credits-shadow: 0.06em 0.06em 0 rgba(15, 56, 15, 0.22), 0.12em 0.12em 0 rgba(15, 56, 15, 0.10);
  /* glow no-op — never "none" (a "none" in the composed list invalidates
     the whole declaration) */
  --credits-glow: 0 0 0 rgba(0, 0, 0, 0);
}

/* scenery is full-bleed: html drops the base edge fade; body keeps it so
   names still dissolve at the ceiling and floor of the glass */
html { -webkit-mask-image: none; mask-image: none; }
body { background: transparent; counter-reset: handheld-stage; }

/* ═══ LIGHT STORY — one static promoted layer. Reflective LCD physics:
   a diagonal plastic glare leans in from the upper-left, the bezel drops
   recess shadows onto the glass along the top and left, the corners fall
   off, and the room's warm lamp pools faintly lower-right. All coarse,
   all soft — nothing here can flicker against glyphs. ═══ */
html::before {
  content: "";
  display: var(--handheld-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* SPECULAR GLARE GLINTS — the shine layer: three COARSE soft blooms where the
       room light pools on the matte-plastic cover (L6-legal: all >=40px with long
       soft falloff, and biased to the glare corners / off the centre text lane).
       One sits high-left at the lamp entry (a bright cover catch), one rides the
       sun corner upper-right so the hero disc looks lit, one warms the low-right
       reflection. STATIC — no slide, no fine points, pure gleam. */
    radial-gradient(circle 90px at 21% 10%, rgba(252, 254, 236, 0.30), rgba(252, 254, 236, 0.09) 44%, rgba(252, 254, 236, 0) 72%),
    radial-gradient(circle 70px at 80% 15%, rgba(250, 253, 224, 0.22), rgba(250, 253, 224, 0.06) 46%, rgba(250, 253, 224, 0) 74%),
    radial-gradient(circle 100px at 84% 92%, rgba(244, 250, 210, 0.18), rgba(244, 250, 210, 0.05) 48%, rgba(244, 250, 210, 0) 76%),
    /* MAIN GLARE — a broad plastic-cover reflection leaning across from the
       upper-left, brightest where it enters, with a crisp leading lip (the hard
       edge of a matte-plastic cover catching the room light) then a long soft
       falloff. This is the single most legible "it's under glass" cue. */
    linear-gradient(122deg, rgba(247, 250, 228, 0) 4%, rgba(247, 250, 228, 0.07) 11%, rgba(248, 251, 231, 0.20) 17%, rgba(248, 251, 231, 0.26) 21%, rgba(247, 250, 228, 0.10) 27%, rgba(247, 250, 228, 0.02) 34%, rgba(247, 250, 228, 0) 42%),
    /* the glare's echo band — a second, fainter parallel streak, the way a thick
       cover throws a soft double reflection */
    linear-gradient(122deg, rgba(247, 250, 228, 0) 44%, rgba(247, 250, 228, 0.06) 49%, rgba(247, 250, 228, 0.02) 53%, rgba(247, 250, 228, 0) 58%),
    /* POLARIZER SHEEN — the faint rainbow-free wash a twisted-nematic panel throws
       back under raking light, a broad cross-diagonal the opposite way */
    linear-gradient(-58deg, rgba(214, 234, 156, 0) 26%, rgba(214, 234, 156, 0.06) 48%, rgba(214, 234, 156, 0.03) 60%, rgba(214, 234, 156, 0) 76%),
    /* HOT-SPOT — the lamp corner: where the backlight enters, a small intense
       warm bloom in the upper-left so the light story has a clear source */
    radial-gradient(ellipse 40vw 34vh at 24% 6%, rgba(226, 240, 158, 0.28), rgba(226, 240, 158, 0.08) 46%, rgba(226, 240, 158, 0) 74%),
    /* the room lamp reflected low-right, a warm pool on the glass */
    radial-gradient(ellipse 34vw 20vh at 82% 95%, rgba(232, 242, 176, 0.18), rgba(232, 242, 176, 0) 70%),
    /* bezel RECESS shadow — the frame's inner wall drops a soft shadow onto the
       glass along the top and left (the glass sits BELOW the plastic lip) */
    linear-gradient(180deg, rgba(12, 46, 12, 0.34) 0%, rgba(12, 46, 12, 0.10) 3.5vh, rgba(12, 46, 12, 0) 9vh),
    linear-gradient(90deg, rgba(12, 46, 12, 0.24) 0%, rgba(12, 46, 12, 0.06) 3vw, rgba(12, 46, 12, 0) 7.5vw),
    linear-gradient(0deg, rgba(12, 46, 12, 0.20) 0%, rgba(12, 46, 12, 0) 6vh),
    /* backlight BLOOM — brightest at the panel's heart, falling to the frame; a
       warm coarse pool that lifts the middle so the glass reads lit-from-behind */
    radial-gradient(ellipse 78% 66% at 46% 40%, rgba(210, 232, 132, 0.24), rgba(210, 232, 132, 0.07) 50%, rgba(210, 232, 132, 0) 76%),
    /* corner VIGNETTE — deeper now, the panel dims hard into its frame so the lit
       centre has real contrast against the edges */
    radial-gradient(ellipse 128% 116% at 48% 44%, rgba(12, 46, 12, 0) 50%, rgba(12, 46, 12, 0.12) 74%, rgba(12, 46, 12, 0.30) 100%);
}

/* ═══ THE BEZEL — a MOLDED plastic frame with real thickness. The screen is a
   window recessed into the shell face, so the frame steps DOWN to the glass:
   outer shell fill → a hard dark edge → the plastic bezel face → a chamfered
   step (dark AO under a bright rim-light lip) → a deep recess shadow spilling
   onto the glass. A background gradient over the frame band gives the plastic a
   directional sheen (lit top-left, shaded bottom-right) so it reads injection-
   molded, not like a flat CSS border. STATIC, promoted, above the glass. ═══ */
html::after {
  content: "";
  display: var(--handheld-scenery, block);
  position: fixed;
  inset: 0;
  z-index: 6;
  pointer-events: none;
  transform: translateZ(0);
  border-radius: 34px;
  /* directional plastic sheen on the frame: a soft cool top-left catch fading to a
     warm-dark bottom-right, matching the room light. The centre is transparent so
     only the ring band (drawn by the box-shadows) is tinted. Molded-shell detail
     rides the same layer: the CARTRIDGE SLOT recessed into the top lip (dark slit,
     chamfered ends, a light riser under it), two SCREW HEADS pinning the top
     corners, and the ribbed CONTRAST WHEEL poking out of the left bezel wall. */
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 190 12'%3E%3Crect x='0' y='2' width='190' height='8' rx='4' fill='%2306040c'/%3E%3Crect x='3' y='3.4' width='184' height='2.6' rx='1.3' fill='%23000000'/%3E%3Crect x='3' y='8.2' width='184' height='2' rx='1' fill='rgba(230,236,208,0.22)'/%3E%3Crect x='0' y='1' width='190' height='1.6' rx='0.8' fill='rgba(0,0,0,0.55)'/%3E%3Crect x='8' y='5' width='12' height='3' rx='1.5' fill='%232e2940'/%3E%3Crect x='170' y='5' width='12' height='3' rx='1.5' fill='%232e2940'/%3E%3C/svg%3E") top 8px center / 210px 13px no-repeat,
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cdefs%3E%3CradialGradient id='s' cx='.4' cy='.35' r='.7'%3E%3Cstop offset='0' stop-color='%234c4460'/%3E%3Cstop offset='1' stop-color='%23161320'/%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='6' cy='6' r='5' fill='url(%23s)' stroke='%23060410' stroke-width='1.2'/%3E%3Ccircle cx='6' cy='6' r='5' fill='none' stroke='rgba(230,236,208,0.18)' stroke-width='.7' stroke-dasharray='4 6'/%3E%3Cpath d='M3 6 h6' stroke='%23060410' stroke-width='1.6'/%3E%3Cpath d='M3 5 h6' stroke='rgba(230,236,208,0.24)' stroke-width='.9'/%3E%3C/svg%3E") top 8px left 44px / 13px 13px no-repeat,
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cdefs%3E%3CradialGradient id='s' cx='.4' cy='.35' r='.7'%3E%3Cstop offset='0' stop-color='%234c4460'/%3E%3Cstop offset='1' stop-color='%23161320'/%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='6' cy='6' r='5' fill='url(%23s)' stroke='%23060410' stroke-width='1.2'/%3E%3Ccircle cx='6' cy='6' r='5' fill='none' stroke='rgba(230,236,208,0.18)' stroke-width='.7' stroke-dasharray='4 6'/%3E%3Cpath d='M3 6 h6' stroke='%23060410' stroke-width='1.6' transform='rotate(64 6 6)'/%3E%3Cpath d='M3 5 h6' stroke='rgba(230,236,208,0.24)' stroke-width='.9' transform='rotate(64 6 6)'/%3E%3C/svg%3E") top 8px right 44px / 13px 13px no-repeat,
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 88'%3E%3Cdefs%3E%3ClinearGradient id='w' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23443e56'/%3E%3Cstop offset='.5' stop-color='%23282338'/%3E%3Cstop offset='1' stop-color='%23100d1a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='0' y='4' width='14' height='80' rx='6' fill='url(%23w)'/%3E%3Crect x='0' y='4' width='14' height='80' rx='6' fill='none' stroke='%23060410' stroke-width='1.6'/%3E%3Cg stroke='%23060410' stroke-width='2.4'%3E%3Cpath d='M0 15 h13 M0 24 h13 M0 33 h13 M0 42 h13 M0 51 h13 M0 60 h13 M0 69 h13'/%3E%3C/g%3E%3Cg stroke='rgba(230,236,208,0.20)' stroke-width='1.1'%3E%3Cpath d='M0 13 h13 M0 31 h13 M0 49 h13 M0 67 h13'/%3E%3C/g%3E%3Crect x='14' y='10' width='4' height='68' rx='2' fill='%23050309'/%3E%3Crect x='1' y='5.5' width='12' height='2' rx='1' fill='rgba(230,236,208,0.14)'/%3E%3C/svg%3E") left 0 top 36vh / 19px 86px no-repeat,
    linear-gradient(133deg, rgba(214, 220, 196, 0.10) 0%, rgba(214, 220, 196, 0) 12%, rgba(0, 0, 0, 0) 88%, rgba(6, 5, 12, 0.28) 100%);
  box-shadow:
    /* the shell plastic beyond the rounded corners */
    0 0 0 160px var(--handheld-shell-dark),
    /* hard outer edge of the moulding */
    inset 0 0 0 3px #08060e,
    /* the bezel FACE — the wide plastic lip around the glass */
    inset 0 0 0 30px var(--handheld-shell),
    /* chamfer: an AO line where the face turns down toward the glass */
    inset 0 0 0 32px #0b0912,
    /* the bright RIM-LIGHT lip catching the backlight right at the glass edge */
    inset 0 0 0 33px rgba(198, 214, 128, 0.22),
    /* deep RECESS shadow spilling onto the glass — top+left stronger (light from
       upper-left), a softer fill all round so the glass sits below the plastic */
    inset 0 30px 40px -18px rgba(10, 40, 10, 0.62),
    inset 22px 0 40px -22px rgba(10, 40, 10, 0.42),
    inset 0 -18px 32px -20px rgba(10, 40, 10, 0.40),
    inset -16px 0 30px -22px rgba(10, 40, 10, 0.34);
}

/* ═══ THE DITHERED LANDSCAPE — the scene on the far side of the glass, built
   in three depth planes with true atmospheric perspective. Everything is drawn
   in the four LAW shades with ORDERED (Bayer-style) dithering so shade steps
   read as stipple, never banding. All coarse (>=8px cells) and low-contrast so
   the crawl reads straight over it (L6). Depth story:
     PLANE 3 (far)   distant ridgeline — g1 at low alpha, hazy, high on screen
     PLANE 2 (mid)   rolling hills — g1 solid with a g2 dither lip catching light
     the SUN         a big pixel disc, g3 core -> g2 dithered corona, low on the
                     left so it motivates the whole glare/light story
     CLOUDS          three chunky pixel banks, g2/g3, dithered undersides
   STATIC, promoted. z:-3 (behind terrain, behind critter). ═══ */
head { display: var(--handheld-scenery, block); }
head::after {
  content: "";
  display: var(--handheld-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -3;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* PLANE 3 — the FAR MOUNTAIN RANGE: now a committed two-tier silhouette that
       actually reads as distant peaks, not a smudge. A pale-cool BACK range (g1
       low alpha) sits highest with a soft haze skirt; a firmer FRONT range steps
       in front of it with a crisp g1 ridge edge and a g2 sunlit rim catching the
       upper-left light along every crest. Atmospheric but legible. Very wide tile. */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 170' shape-rendering='crispEdges'%3E%3Cg fill='%23306230' opacity='.18'%3E%3Cpath d='M0 170 V70 h20 v-8 h20 v-12 h20 v-14 h20 v-10 h20 v-6 h20 v6 h20 v12 h20 v10 h20 v4 h20 v-10 h20 v-16 h20 v-14 h20 v-8 h20 v4 h20 v12 h20 v14 h20 v8 h20 v-6 h20 v-14 h20 v-12 h20 v-6 h20 v8 h20 v14 h20 v10 h20 v6 h20 v-8 h20 v-12 h20 v-6 h20 v10 h20 v14 h20 V170 Z'/%3E%3C/g%3E%3Cg fill='%238bac0f' opacity='.10'%3E%3Crect x='90' y='24' width='10' height='3'/%3E%3Crect x='250' y='16' width='10' height='3'/%3E%3Crect x='430' y='22' width='10' height='3'/%3E%3Crect x='570' y='34' width='10' height='3'/%3E%3C/g%3E%3Cg fill='%23306230' opacity='.14'%3E%3Crect x='0' y='118' width='640' height='52'/%3E%3C/g%3E%3Cg fill='%23306230' opacity='.4'%3E%3Cpath d='M0 170 V104 h16 v-6 h16 v-10 h16 v-10 h16 v-6 h16 v-2 h16 v4 h16 v8 h16 v6 h16 v-8 h16 v-14 h16 v-12 h16 v-6 h16 v4 h16 v12 h16 v10 h16 v6 h16 v-8 h16 v-14 h16 v-10 h16 v-4 h16 v8 h16 v12 h16 v8 h16 v4 h16 v-6 h16 v-12 h16 v-8 h16 v-2 h16 v8 h16 v12 h16 v8 h16 v6 h16 v-4 h16 v-10 h16 v-6 h16 V170 Z'/%3E%3C/g%3E%3Cg fill='%238bac0f' opacity='.34'%3E%3Crect x='112' y='78' width='16' height='3'/%3E%3Crect x='240' y='68' width='16' height='3'/%3E%3Crect x='368' y='72' width='16' height='3'/%3E%3Crect x='512' y='80' width='16' height='3'/%3E%3Crect x='608' y='84' width='16' height='3'/%3E%3C/g%3E%3Cg fill='%239bbc0f' opacity='.2'%3E%3Crect x='240' y='68' width='8' height='2'/%3E%3Crect x='368' y='72' width='8' height='2'/%3E%3C/g%3E%3C/svg%3E") 0 21vh / 1280px auto repeat-x,
    /* PLANE 2 — the MID hills, rebuilt as SOLID ground: a confident dark g1 body
       (high alpha now) with a bold continuous g2 SUNLIT CREST tracing every peak
       (light from the upper-left sun), static g3 specular SPARKLES on the highest
       hilltops (baked highlights, L6-safe), a nearer darker FOOTHILL row stepping
       in front for real depth, and a deep g0 grounding shadow pooling at the feet
       so the grass bank clearly sits in front of it. Varied humps, very wide tile. */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 720 220' shape-rendering='crispEdges'%3E%3Cg fill='%23306230' opacity='.82'%3E%3Cpath d='M0 220 V128 h16 v-10 h16 v-12 h16 v-12 h16 v-8 h16 v-6 h16 v-2 h16 v4 h16 v8 h16 v8 h16 v6 h16 v4 h16 v-2 h16 v-12 h16 v-18 h16 v-16 h16 v-10 h16 v-4 h16 v4 h16 v12 h16 v12 h16 v8 h16 v2 h16 v-6 h16 v-12 h16 v-8 h16 v-2 h16 v6 h16 v12 h16 v14 h16 v10 h16 v4 h16 v-8 h16 v-18 h16 v-20 h16 v-14 h16 v-6 h16 v6 h16 v14 h16 v4 h16 v12 h16 v10 h16 v6 h16 v4 h16 v8 h16 V220 Z'/%3E%3C/g%3E%3Cg fill='%238bac0f' opacity='.78'%3E%3Cpath d='M0 128 h16 v-10 h16 v-12 h16 v-12 h16 v-8 h16 v-6 h16 v-2 h16 v4 h16 v8 h16 v8 h16 v6 h16 v4 h16 v-2 h16 v-12 h16 v-18 h16 v-16 h16 v-10 h16 v-4 h16 v4 h16 v12 h16 v12 h16 v8 h16 v2 h16 v-6 h16 v-12 h16 v-8 h16 v-2 h16 v6 h16 v12 h16 v14 h16 v10 h16 v4 h16 v-8 h16 v-18 h16 v-20 h16 v-14 h16 v-6 h16 v6 h16 v14 h16 v4 h16 v12 h16 v10 h16 v6 h16 v4 h16 v8 h16 v6 H0 Z'/%3E%3C/g%3E%3Cg fill='%239bbc0f'%3E%3Crect x='240' y='60' width='10' height='4'/%3E%3Crect x='250' y='62' width='6' height='4'/%3E%3Crect x='544' y='52' width='10' height='4'/%3E%3Crect x='554' y='54' width='6' height='4'/%3E%3Crect x='128' y='96' width='8' height='4'/%3E%3C/g%3E%3Cg fill='%239bbc0f' opacity='.5'%3E%3Crect x='232' y='64' width='8' height='3'/%3E%3Crect x='536' y='56' width='8' height='3'/%3E%3C/g%3E%3Cg fill='%230f380f' opacity='.3'%3E%3Cpath d='M0 220 V172 h24 v-8 h24 v-10 h24 v-6 h24 v6 h24 v12 h24 v-4 h24 v-14 h24 v-8 h24 v6 h24 v12 h24 v8 h24 v-2 h24 v-12 h24 v-8 h24 v4 h24 v14 h24 v8 h24 v-6 h24 v-12 h24 v-4 h24 v10 h24 v10 h24 v4 h24 v-6 h24 v-10 h24 V220 Z'/%3E%3C/g%3E%3Cg fill='%238bac0f' opacity='.4'%3E%3Crect x='48' y='158' width='24' height='3'/%3E%3Crect x='240' y='150' width='24' height='3'/%3E%3Crect x='456' y='148' width='24' height='3'/%3E%3Crect x='624' y='154' width='24' height='3'/%3E%3C/g%3E%3Cg fill='%230f380f' opacity='.4'%3E%3Crect x='0' y='190' width='720' height='30'/%3E%3C/g%3E%3Cg fill='%230f380f' opacity='.2'%3E%3Crect x='0' y='182' width='720' height='4'/%3E%3Crect x='0' y='188' width='720' height='3'/%3E%3C/g%3E%3C/svg%3E") 0 calc(100vh - 300px) / 1080px auto repeat-x,
    /* THE SUN — the hero prop, an OBJECT the mono-LCD draws in bold outline: a
       thick 3-cell g0 double-ring limb that separates the disc HARD from the
       backlight bloom, a solid g1 body with a g2 sunlit crescent (upper-left) and
       a g0 shade crescent (lower-right), a bold pixel face, and a strong three-
       tier corona (8 long axial rays + 8 medium diagonals + 8 short ticks) so it
       reads as SHINING. A STATIC g3 specular glint arc is baked onto the upper-
       left rim (always-safe highlight, L6). Sits upper-right, clear of the battery
       pod, motivating the whole upper-left-to-here light story. */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' shape-rendering='crispEdges'%3E%3Cg fill='%230f380f'%3E%3Crect x='94' y='0' width='12' height='22'/%3E%3Crect x='94' y='178' width='12' height='22'/%3E%3Crect x='0' y='94' width='22' height='12'/%3E%3Crect x='178' y='94' width='22' height='12'/%3E%3Crect x='30' y='30' width='14' height='14'/%3E%3Crect x='156' y='30' width='14' height='14'/%3E%3Crect x='30' y='156' width='14' height='14'/%3E%3Crect x='156' y='156' width='14' height='14'/%3E%3C/g%3E%3Cg fill='%230f380f'%3E%3Crect x='96' y='26' width='8' height='12'/%3E%3Crect x='96' y='162' width='8' height='12'/%3E%3Crect x='26' y='96' width='12' height='8'/%3E%3Crect x='162' y='96' width='12' height='8'/%3E%3Crect x='53' y='53' width='9' height='9'/%3E%3Crect x='138' y='53' width='9' height='9'/%3E%3Crect x='53' y='138' width='9' height='9'/%3E%3Crect x='138' y='138' width='9' height='9'/%3E%3C/g%3E%3Cg fill='%23306230'%3E%3Crect x='72' y='48' width='56' height='104'/%3E%3Crect x='60' y='60' width='80' height='80'/%3E%3Crect x='52' y='72' width='96' height='56'/%3E%3Crect x='48' y='84' width='104' height='32'/%3E%3C/g%3E%3Cg fill='%230f380f'%3E%3Cpath d='M78 44 h44 v6 h14 v6 h8 v8 h6 v14 h6 v44 h-6 v14 h-6 v8 h-8 v6 h-14 v6 h-44 v-6 h-14 v-6 h-8 v-8 h-6 v-14 h-6 v-44 h6 v-14 h6 v-8 h8 v-6 h14 z M78 52 h-10 v6 h-8 v8 h-6 v10 h-6 v44 h6 v10 h6 v8 h8 v6 h10 v6 h44 v-6 h10 v-6 h8 v-8 h6 v-10 h6 v-44 h-6 v-10 h-6 v-8 h-8 v-6 h-10 v-6 h-44 z'/%3E%3C/g%3E%3Cg fill='%238bac0f'%3E%3Crect x='72' y='54' width='38' height='6'/%3E%3Crect x='60' y='60' width='30' height='6'/%3E%3Crect x='54' y='72' width='10' height='34'/%3E%3Crect x='52' y='78' width='6' height='26'/%3E%3Crect x='64' y='66' width='8' height='8'/%3E%3C/g%3E%3Cg fill='%238bac0f' opacity='.5'%3E%3Crect x='110' y='54' width='24' height='4'/%3E%3Crect x='90' y='60' width='20' height='4'/%3E%3C/g%3E%3Cg fill='%239bbc0f'%3E%3Crect x='58' y='62' width='16' height='6'/%3E%3Crect x='56' y='68' width='6' height='16'/%3E%3Crect x='72' y='54' width='10' height='4'/%3E%3C/g%3E%3Cg fill='%230f380f' opacity='.4'%3E%3Crect x='122' y='120' width='14' height='12'/%3E%3Crect x='108' y='130' width='30' height='8'/%3E%3Crect x='132' y='108' width='10' height='16'/%3E%3C/g%3E%3Cg fill='%230f380f'%3E%3Crect x='80' y='86' width='10' height='16'/%3E%3Crect x='110' y='86' width='10' height='16'/%3E%3Crect x='72' y='112' width='8' height='8'/%3E%3Crect x='80' y='118' width='40' height='8'/%3E%3Crect x='120' y='112' width='8' height='8'/%3E%3C/g%3E%3Cg fill='%23e2542f'%3E%3Crect x='70' y='106' width='10' height='7'/%3E%3Crect x='120' y='106' width='10' height='7'/%3E%3C/g%3E%3Cg fill='%23e2542f' opacity='.5'%3E%3Crect x='68' y='113' width='10' height='3'/%3E%3Crect x='122' y='113' width='10' height='3'/%3E%3C/g%3E%3Cg fill='%239bbc0f'%3E%3Crect x='82' y='86' width='3' height='6'/%3E%3Crect x='112' y='86' width='3' height='6'/%3E%3C/g%3E%3Cg fill='%239bbc0f'%3E%3Crect x='60' y='58' width='8' height='4'/%3E%3Crect x='68' y='52' width='8' height='4'/%3E%3Crect x='52' y='68' width='4' height='8'/%3E%3Crect x='80' y='48' width='6' height='4'/%3E%3C/g%3E%3C/svg%3E") 80% 14vh / 188px 188px no-repeat,
    /* clouds — chunky pixel banks with a g3 sunlit top and a g2 dithered
       underside; three sizes at different depths */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 112 44' shape-rendering='crispEdges'%3E%3Cg fill='%239bbc0f' opacity='.6'%3E%3Crect x='28' y='4' width='24' height='4'/%3E%3Crect x='20' y='8' width='44' height='6'/%3E%3Crect x='64' y='12' width='28' height='4'/%3E%3C/g%3E%3Cg fill='%238bac0f' opacity='.55'%3E%3Crect x='12' y='14' width='76' height='10'/%3E%3Crect x='64' y='14' width='36' height='12'/%3E%3Crect x='8' y='18' width='8' height='8'/%3E%3C/g%3E%3Cg fill='%238bac0f' opacity='.3'%3E%3Crect x='16' y='24' width='8' height='4'/%3E%3Crect x='32' y='24' width='8' height='4'/%3E%3Crect x='48' y='24' width='8' height='4'/%3E%3Crect x='64' y='24' width='8' height='4'/%3E%3Crect x='80' y='24' width='8' height='4'/%3E%3C/g%3E%3C/svg%3E") 12% 11vh / 190px auto no-repeat,
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 112 44' shape-rendering='crispEdges'%3E%3Cg fill='%239bbc0f' opacity='.5'%3E%3Crect x='28' y='4' width='24' height='4'/%3E%3Crect x='20' y='8' width='44' height='6'/%3E%3Crect x='64' y='12' width='28' height='4'/%3E%3C/g%3E%3Cg fill='%238bac0f' opacity='.45'%3E%3Crect x='12' y='14' width='76' height='10'/%3E%3Crect x='64' y='14' width='36' height='12'/%3E%3Crect x='8' y='18' width='8' height='8'/%3E%3C/g%3E%3Cg fill='%238bac0f' opacity='.24'%3E%3Crect x='16' y='24' width='8' height='4'/%3E%3Crect x='32' y='24' width='8' height='4'/%3E%3Crect x='48' y='24' width='8' height='4'/%3E%3Crect x='64' y='24' width='8' height='4'/%3E%3Crect x='80' y='24' width='8' height='4'/%3E%3C/g%3E%3C/svg%3E") 84% 22vh / 132px auto no-repeat,
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 32' shape-rendering='crispEdges'%3E%3Cg fill='%239bbc0f' opacity='.42'%3E%3Crect x='20' y='2' width='20' height='4'/%3E%3Crect x='12' y='6' width='40' height='6'/%3E%3C/g%3E%3Cg fill='%238bac0f' opacity='.4'%3E%3Crect x='8' y='12' width='56' height='8'/%3E%3Crect x='48' y='12' width='24' height='8'/%3E%3C/g%3E%3Cg fill='%238bac0f' opacity='.2'%3E%3Crect x='12' y='20' width='6' height='4'/%3E%3Crect x='28' y='20' width='6' height='4'/%3E%3Crect x='44' y='20' width='6' height='4'/%3E%3Crect x='58' y='20' width='6' height='4'/%3E%3C/g%3E%3C/svg%3E") 62% 8vh / 116px auto no-repeat;
}

/* ═══ pixel terrain: the near grass bank, built as a proper 4-shade descent —
   varied grass blades catching g2 light at the tips, a g1 body, an ordered
   dither transition (g1->g0) into dark g0 soil, plus little pixel wildflowers
   and tufts for storytelling. A fine pattern, but pinned to the very bottom
   EDGE (L6-legal), and the bottom mask fades names before they reach it.
   One 320px tile, repeat-x. STATIC, promoted. ═══ */
head::before {
  content: "";
  display: var(--handheld-scenery, block);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 104px;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 104' shape-rendering='crispEdges'%3E%3Cdefs%3E%3Cpattern id='d1' width='8' height='8' patternUnits='userSpaceOnUse'%3E%3Crect width='4' height='4' fill='%230f380f'/%3E%3Crect x='4' y='4' width='4' height='4' fill='%230f380f'/%3E%3C/pattern%3E%3Cpattern id='d2' width='8' height='8' patternUnits='userSpaceOnUse'%3E%3Crect width='4' height='4' fill='%230f380f'/%3E%3C/pattern%3E%3C/defs%3E%3Crect y='44' width='320' height='60' fill='%23306230'/%3E%3Cg fill='%23306230'%3E%3Crect x='4' y='40' width='10' height='4'/%3E%3Crect x='30' y='38' width='8' height='6'/%3E%3Crect x='58' y='40' width='14' height='4'/%3E%3Crect x='92' y='38' width='8' height='6'/%3E%3Crect x='116' y='40' width='12' height='4'/%3E%3Crect x='150' y='38' width='8' height='6'/%3E%3Crect x='178' y='40' width='14' height='4'/%3E%3Crect x='214' y='38' width='8' height='6'/%3E%3Crect x='242' y='40' width='12' height='4'/%3E%3Crect x='276' y='38' width='8' height='6'/%3E%3Crect x='300' y='40' width='14' height='4'/%3E%3C/g%3E%3Cg fill='%23306230'%3E%3Crect x='34' y='32' width='4' height='6'/%3E%3Crect x='96' y='30' width='4' height='8'/%3E%3Crect x='154' y='32' width='4' height='6'/%3E%3Crect x='218' y='30' width='4' height='8'/%3E%3Crect x='280' y='32' width='4' height='6'/%3E%3C/g%3E%3Cg fill='%238bac0f' opacity='.55'%3E%3Crect x='34' y='30' width='4' height='4'/%3E%3Crect x='96' y='28' width='4' height='4'/%3E%3Crect x='154' y='30' width='4' height='4'/%3E%3Crect x='218' y='28' width='4' height='4'/%3E%3Crect x='280' y='30' width='4' height='4'/%3E%3Crect x='8' y='44' width='300' height='2'/%3E%3C/g%3E%3Cg fill='%238bac0f'%3E%3Crect x='72' y='24' width='4' height='6'/%3E%3Crect x='68' y='22' width='4' height='4'/%3E%3Crect x='76' y='22' width='4' height='4'/%3E%3Crect x='70' y='20' width='6' height='2'/%3E%3Crect x='200' y='26' width='4' height='6'/%3E%3Crect x='196' y='24' width='4' height='4'/%3E%3Crect x='204' y='24' width='4' height='4'/%3E%3C/g%3E%3Cg fill='%239bbc0f'%3E%3Crect x='70' y='22' width='4' height='2'/%3E%3Crect x='198' y='24' width='4' height='2'/%3E%3C/g%3E%3Cg fill='%230f380f'%3E%3Crect x='16' y='54' width='4' height='4'/%3E%3Crect x='52' y='58' width='4' height='4'/%3E%3Crect x='108' y='54' width='4' height='4'/%3E%3Crect x='140' y='60' width='4' height='4'/%3E%3Crect x='188' y='54' width='4' height='4'/%3E%3Crect x='236' y='58' width='4' height='4'/%3E%3Crect x='288' y='54' width='4' height='4'/%3E%3Crect x='84' y='64' width='4' height='4'/%3E%3Crect x='168' y='66' width='4' height='4'/%3E%3Crect x='260' y='64' width='4' height='4'/%3E%3C/g%3E%3Crect y='72' width='320' height='8' fill='url(%23d1)'/%3E%3Crect y='78' width='320' height='6' fill='url(%23d2)'/%3E%3Crect y='82' width='320' height='22' fill='%230f380f'/%3E%3Cg fill='%23306230' opacity='.25'%3E%3Crect x='40' y='88' width='16' height='3'/%3E%3Crect x='160' y='92' width='20' height='3'/%3E%3Crect x='250' y='88' width='14' height='3'/%3E%3C/g%3E%3C/svg%3E") left bottom / 320px 104px repeat-x;
}

/* ═══ CARTRIDGE CRITTER — the mascot: a game cart with a face on its
   label, stub arms, and marching feet. Two welded frames on one walk
   keyframe: steps(140) across 70s = 2 hops/s (~15px a hop — L2's steps
   ceiling is 5/s), while a 1s steps() opacity swap alternates the feet
   exactly on the hop beat. Small layer, no will-change needed. ═══ */
head meta { display: var(--handheld-scenery, block); }
head meta:first-of-type::before,
head meta:first-of-type::after {
  content: "";
  display: var(--handheld-scenery, block);
  position: fixed;
  left: 0;
  bottom: 58px;
  width: 52px;
  height: 60px;
  z-index: -2;
  pointer-events: none;
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: contain;
  transform: translate3d(-6vw, 0, 0);
  animation: handheld-walk 70s steps(140, end) infinite;
}
/* FRAME A — right leg forward, left arm raised. The cart body has a g0 ink
   outline, a g1 fill, a g2 rim-light down the sunlit left spine, a darker g0
   shade on the right, the ridged label slot up top, and a g3 label panel with
   the face + a scan-line. Stub arms and two striding legs. */
head meta:first-of-type::before {
  opacity: 1;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 56' shape-rendering='crispEdges'%3E%3Cellipse cx='24' cy='53' rx='16' ry='2' fill='%230f380f' opacity='.22'/%3E%3Crect x='10' y='2' width='28' height='2' fill='%230f380f'/%3E%3Crect x='8' y='4' width='32' height='2' fill='%230f380f'/%3E%3Crect x='6' y='6' width='36' height='36' fill='%230f380f'/%3E%3Crect x='8' y='8' width='32' height='32' fill='%23306230'/%3E%3Crect x='8' y='8' width='3' height='32' fill='%238bac0f'/%3E%3Crect x='11' y='8' width='2' height='32' fill='%239bbc0f' opacity='.4'/%3E%3Crect x='36' y='10' width='4' height='30' fill='%230f380f' opacity='.35'/%3E%3Crect x='14' y='8' width='4' height='3' fill='%230f380f'/%3E%3Crect x='22' y='8' width='4' height='3' fill='%230f380f'/%3E%3Crect x='30' y='8' width='4' height='3' fill='%230f380f'/%3E%3Crect x='13' y='14' width='24' height='18' fill='%239bbc0f'/%3E%3Crect x='13' y='14' width='24' height='2' fill='%23c3dd4f' opacity='.5'/%3E%3Crect x='17' y='19' width='4' height='5' fill='%230f380f'/%3E%3Crect x='29' y='19' width='4' height='5' fill='%230f380f'/%3E%3Crect x='18' y='20' width='1' height='1' fill='%239bbc0f'/%3E%3Crect x='30' y='20' width='1' height='1' fill='%239bbc0f'/%3E%3Crect x='20' y='27' width='10' height='2' fill='%230f380f'/%3E%3Crect x='19' y='26' width='2' height='2' fill='%230f380f'/%3E%3Crect x='29' y='26' width='2' height='2' fill='%230f380f'/%3E%3Crect x='14' y='34' width='20' height='3' fill='%230f380f' opacity='.4'/%3E%3Crect x='2' y='16' width='4' height='4' fill='%230f380f'/%3E%3Crect x='2' y='20' width='4' height='4' fill='%23306230'/%3E%3Crect x='42' y='22' width='4' height='4' fill='%230f380f'/%3E%3Crect x='42' y='18' width='4' height='4' fill='%230f380f'/%3E%3Crect x='14' y='42' width='7' height='10' fill='%230f380f'/%3E%3Crect x='14' y='42' width='2' height='9' fill='%23306230'/%3E%3Crect x='27' y='42' width='7' height='7' fill='%230f380f'/%3E%3Crect x='27' y='42' width='2' height='6' fill='%23306230'/%3E%3C/svg%3E");
}
/* FRAME B — left leg forward, right arm raised; whole cart bobs down 2px on the
   off-beat for a springy march */
head meta:first-of-type::after {
  opacity: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 56' shape-rendering='crispEdges'%3E%3Cellipse cx='24' cy='53' rx='14' ry='2' fill='%230f380f' opacity='.22'/%3E%3Cg transform='translate(0,2)'%3E%3Crect x='10' y='2' width='28' height='2' fill='%230f380f'/%3E%3Crect x='8' y='4' width='32' height='2' fill='%230f380f'/%3E%3Crect x='6' y='6' width='36' height='36' fill='%230f380f'/%3E%3Crect x='8' y='8' width='32' height='32' fill='%23306230'/%3E%3Crect x='8' y='8' width='3' height='32' fill='%238bac0f'/%3E%3Crect x='11' y='8' width='2' height='32' fill='%239bbc0f' opacity='.4'/%3E%3Crect x='36' y='10' width='4' height='30' fill='%230f380f' opacity='.35'/%3E%3Crect x='14' y='8' width='4' height='3' fill='%230f380f'/%3E%3Crect x='22' y='8' width='4' height='3' fill='%230f380f'/%3E%3Crect x='30' y='8' width='4' height='3' fill='%230f380f'/%3E%3Crect x='13' y='14' width='24' height='18' fill='%239bbc0f'/%3E%3Crect x='13' y='14' width='24' height='2' fill='%23c3dd4f' opacity='.5'/%3E%3Crect x='17' y='19' width='4' height='5' fill='%230f380f'/%3E%3Crect x='29' y='19' width='4' height='5' fill='%230f380f'/%3E%3Crect x='18' y='20' width='1' height='1' fill='%239bbc0f'/%3E%3Crect x='30' y='20' width='1' height='1' fill='%239bbc0f'/%3E%3Crect x='20' y='27' width='10' height='2' fill='%230f380f'/%3E%3Crect x='19' y='26' width='2' height='2' fill='%230f380f'/%3E%3Crect x='29' y='26' width='2' height='2' fill='%230f380f'/%3E%3Crect x='14' y='34' width='20' height='3' fill='%230f380f' opacity='.4'/%3E%3Crect x='2' y='22' width='4' height='4' fill='%230f380f'/%3E%3Crect x='2' y='18' width='4' height='4' fill='%230f380f'/%3E%3Crect x='42' y='16' width='4' height='4' fill='%230f380f'/%3E%3Crect x='42' y='20' width='4' height='4' fill='%23306230'/%3E%3C/g%3E%3Crect x='14' y='44' width='7' height='7' fill='%230f380f'/%3E%3Crect x='14' y='44' width='2' height='6' fill='%23306230'/%3E%3Crect x='27' y='44' width='7' height='10' fill='%230f380f'/%3E%3Crect x='27' y='44' width='2' height='9' fill='%23306230'/%3E%3C/svg%3E");
  animation: handheld-walk 70s steps(140, end) infinite, handheld-step 1s steps(1, end) infinite;
}
/* frame A rides the inverse swap */
head meta:first-of-type::before { animation: handheld-walk 70s steps(140, end) infinite, handheld-step-inv 1s steps(1, end) infinite; }

/* ═══ POWER indicator: a molded plate on the left bezel wall — not a floating
   nub but a housing that clearly belongs to the shell plastic. A pill of the
   shell tone with the same directional sheen as the frame, a recessed LED well
   with a chromed bevel ring, the diode inside, a specular pip, and a "POWER"
   silkscreen. Seated a touch in from the edge so it reads mounted, not clipped.
   STATIC; the glow layer below does the worrying. ═══ */
head meta:last-of-type::before {
  content: "";
  display: var(--handheld-scenery, block);
  position: fixed;
  left: 0;
  top: 15vh;
  width: 74px;
  height: 30px;
  z-index: 7;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 74 30'%3E%3Cdefs%3E%3ClinearGradient id='bp' x1='0' y1='0' x2='.15' y2='1'%3E%3Cstop offset='0' stop-color='%23393143'/%3E%3Cstop offset='.5' stop-color='%23272233'/%3E%3Cstop offset='1' stop-color='%23181523'/%3E%3C/linearGradient%3E%3CradialGradient id='bw' cx='.4' cy='.35' r='.7'%3E%3Cstop offset='0' stop-color='%23070510'/%3E%3Cstop offset='1' stop-color='%23140f1e'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect x='-12' y='2' width='84' height='26' rx='11' fill='url(%23bp)'/%3E%3Crect x='-12' y='2' width='84' height='26' rx='11' fill='none' stroke='%230b0912' stroke-width='1.5'/%3E%3Crect x='-10' y='4' width='80' height='2' rx='1' fill='rgba(230,236,208,0.10)'/%3E%3Crect x='-12' y='26' width='84' height='2' rx='1' fill='rgba(0,0,0,0.35)'/%3E%3Ctext x='9' y='19' font-family='Verdana,Geneva,sans-serif' font-size='7.5' font-weight='bold' letter-spacing='.5' fill='%237b7592'%3EPOWER%3C/text%3E%3Ccircle cx='58' cy='15' r='9' fill='%23060410'/%3E%3Ccircle cx='58' cy='15' r='8' fill='url(%23bw)'/%3E%3Ccircle cx='58' cy='15' r='8' fill='none' stroke='%23514a63' stroke-width='1.2'/%3E%3Ccircle cx='58' cy='15' r='8' fill='none' stroke='%230a0812' stroke-width='.5'/%3E%3Ccircle cx='58' cy='15' r='5' fill='%23e64b40'/%3E%3Ccircle cx='58' cy='15' r='5' fill='none' stroke='%23a02820' stroke-width='.6'/%3E%3Ccircle cx='55.9' cy='12.9' r='1.7' fill='%23ffdcd6' opacity='.9'/%3E%3C/svg%3E") left center / contain no-repeat;
}

/* ═══ the LED glow — a red breath over the diode that double-dips every
   7s (steps(1), ~0.6 paints/s: the battery is low, it is not a strobe) ═══ */
head meta:last-of-type::after {
  content: "";
  display: var(--handheld-scenery, block);
  position: fixed;
  left: 44px;
  top: calc(15vh + 1px);
  width: 28px;
  height: 28px;
  z-index: 7;
  pointer-events: none;
  opacity: 1;
  background: radial-gradient(circle, rgba(255, 92, 74, 0.55) 0%, rgba(255, 92, 74, 0.16) 45%, rgba(255, 92, 74, 0) 70%);
  animation: handheld-batt 7s steps(1, end) infinite;
}

/* ═══ bezel silkscreen print along the top edge ═══ */
head link { display: var(--handheld-scenery, block); }
head link::before {
  content: "DOT-MATRIX · FOUR-SHADE DISPLAY";
  display: var(--handheld-scenery, block);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  z-index: 8;
  pointer-events: none;
  font-family: var(--credits-title-font);
  font-weight: 400;
  font-size: 8px;
  line-height: 21px;
  letter-spacing: 0.5em;
  text-indent: 0.5em;
  text-align: center;
  text-shadow: none;
  color: rgba(202, 206, 224, 0.42);
}

/* ═══ corner pods: d-pad bottom-left, A/B buttons + SPEAKER GRILLE bottom-right
   — two molded-plastic SVG props on one fixed strip. The plastic now has real
   volume (3-stop body gradient, a top rim-light, a diagonal injection sheen, a
   parting-line seam and a fine speckle grain), corner SCREW HEADS with a slot
   and a cast micro-shadow, and — on the right pod — the console's angled dot
   SPEAKER GRILLE. Buttons keep their burgundy volume + specular; the d-pad gets
   bevels, arrow imprints, a center dimple. STATIC, promoted. ═══ */
head link::after {
  content: "";
  display: var(--handheld-scenery, block);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 156px;
  z-index: 7;
  pointer-events: none;
  transform: translateZ(0);
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 124 124'%3E%3Cdefs%3E%3ClinearGradient id='pl' x1='0' y1='0' x2='.25' y2='1'%3E%3Cstop offset='0' stop-color='%23383043'/%3E%3Cstop offset='.4' stop-color='%232a2536'/%3E%3Cstop offset='1' stop-color='%231a1725'/%3E%3C/linearGradient%3E%3ClinearGradient id='she' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23fff' stop-opacity='0'/%3E%3Cstop offset='.42' stop-color='%23fff' stop-opacity='0'/%3E%3Cstop offset='.5' stop-color='%23d8e0c0' stop-opacity='.08'/%3E%3Cstop offset='.58' stop-color='%23fff' stop-opacity='0'/%3E%3C/linearGradient%3E%3CradialGradient id='dm' cx='.5' cy='.5' r='.5'%3E%3Cstop offset='0' stop-color='%230c0a14'/%3E%3Cstop offset='1' stop-color='%230c0a14' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='scr' cx='.4' cy='.35' r='.7'%3E%3Cstop offset='0' stop-color='%23423b4f'/%3E%3Cstop offset='1' stop-color='%23161320'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect x='-24' y='10' width='142' height='140' rx='26' fill='url(%23pl)'/%3E%3Crect x='-24' y='10' width='142' height='140' rx='26' fill='url(%23she)'/%3E%3Crect x='-24' y='10' width='142' height='140' rx='26' fill='none' stroke='%230b0912' stroke-width='2'/%3E%3Crect x='-18' y='13' width='128' height='2.5' rx='1.25' fill='rgba(230,236,208,0.09)'/%3E%3Cpath d='M-24 128 h142' stroke='rgba(0,0,0,0.3)' stroke-width='1'/%3E%3Cpath d='M-24 129 h142' stroke='rgba(230,236,208,0.04)' stroke-width='1'/%3E%3Cg fill='%23fff' fill-opacity='.018'%3E%3Crect x='10' y='30' width='2' height='2'/%3E%3Crect x='40' y='24' width='2' height='2'/%3E%3Crect x='84' y='40' width='2' height='2'/%3E%3Crect x='20' y='96' width='2' height='2'/%3E%3Crect x='70' y='110' width='2' height='2'/%3E%3Crect x='96' y='84' width='2' height='2'/%3E%3C/g%3E%3Ccircle cx='58' cy='68' r='43' fill='%23120f1e'/%3E%3Ccircle cx='58' cy='68' r='43' fill='none' stroke='rgba(0,0,0,0.5)' stroke-width='2'/%3E%3Cpath d='M22 86 A43 43 0 0 0 94 86' stroke='rgba(230,236,208,0.08)' stroke-width='2' fill='none'/%3E%3Cg transform='translate(2,3)' fill='%23070510'%3E%3Crect x='44' y='26' width='28' height='84' rx='6'/%3E%3Crect x='16' y='54' width='84' height='28' rx='6'/%3E%3C/g%3E%3Crect x='44' y='26' width='28' height='84' rx='6' fill='%231e1a2a'/%3E%3Crect x='16' y='54' width='84' height='28' rx='6' fill='%231e1a2a'/%3E%3Crect x='44' y='26' width='28' height='84' rx='6' fill='url(%23she)'/%3E%3Crect x='16' y='54' width='84' height='28' rx='6' fill='url(%23she)'/%3E%3Crect x='46' y='27' width='24' height='3' rx='1.5' fill='rgba(230,236,208,0.11)'/%3E%3Crect x='18' y='55' width='80' height='3' rx='1.5' fill='rgba(230,236,208,0.08)'/%3E%3Cpath d='M58 33 l6 9 h-12 z' fill='%230c0917'/%3E%3Cpath d='M58 103 l-6 -9 h12 z' fill='%230c0917'/%3E%3Cpath d='M23 68 l9 -6 v12 z' fill='%230c0917'/%3E%3Cpath d='M93 68 l-9 -6 v12 z' fill='%230c0917'/%3E%3Ccircle cx='58' cy='68' r='11' fill='url(%23dm)'/%3E%3Ccircle cx='58' cy='68' r='4' fill='%230a0813'/%3E%3Ccircle cx='56.5' cy='66.5' r='1.4' fill='rgba(230,236,208,0.10)'/%3E%3Cg%3E%3Ccircle cx='16' cy='120' r='5' fill='url(%23scr)'/%3E%3Ccircle cx='16' cy='120' r='5' fill='none' stroke='%230a0812' stroke-width='1'/%3E%3Cpath d='M13 120 h6' stroke='%230a0812' stroke-width='1.4'/%3E%3Cpath d='M13 119 h6' stroke='rgba(230,236,208,0.10)' stroke-width='.8'/%3E%3C/g%3E%3C/svg%3E") left 0px bottom -6px / 124px 124px no-repeat,
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 156 116'%3E%3Cdefs%3E%3ClinearGradient id='pl2' x1='0' y1='0' x2='.2' y2='1'%3E%3Cstop offset='0' stop-color='%23383043'/%3E%3Cstop offset='.4' stop-color='%232a2536'/%3E%3Cstop offset='1' stop-color='%231a1725'/%3E%3C/linearGradient%3E%3ClinearGradient id='she2' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23fff' stop-opacity='0'/%3E%3Cstop offset='.4' stop-color='%23fff' stop-opacity='0'/%3E%3Cstop offset='.5' stop-color='%23d8e0c0' stop-opacity='.08'/%3E%3Cstop offset='.6' stop-color='%23fff' stop-opacity='0'/%3E%3C/linearGradient%3E%3CradialGradient id='ba' cx='.35' cy='.3' r='.85'%3E%3Cstop offset='0' stop-color='%23d06e96'/%3E%3Cstop offset='.35' stop-color='%23b04c78'/%3E%3Cstop offset='.7' stop-color='%23923260'/%3E%3Cstop offset='1' stop-color='%234f1834'/%3E%3C/radialGradient%3E%3CradialGradient id='scr2' cx='.4' cy='.35' r='.7'%3E%3Cstop offset='0' stop-color='%23423b4f'/%3E%3Cstop offset='1' stop-color='%23161320'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect x='6' y='8' width='170' height='120' rx='26' fill='url(%23pl2)'/%3E%3Crect x='6' y='8' width='170' height='120' rx='26' fill='url(%23she2)'/%3E%3Crect x='6' y='8' width='170' height='120' rx='26' fill='none' stroke='%230b0912' stroke-width='2'/%3E%3Crect x='14' y='11' width='128' height='2.5' rx='1.25' fill='rgba(230,236,208,0.09)'/%3E%3Cpath d='M6 126 h170' stroke='rgba(0,0,0,0.3)' stroke-width='1'/%3E%3Cg fill='%23fff' fill-opacity='.018'%3E%3Crect x='30' y='30' width='2' height='2'/%3E%3Crect x='120' y='24' width='2' height='2'/%3E%3Crect x='68' y='96' width='2' height='2'/%3E%3Crect x='140' y='70' width='2' height='2'/%3E%3C/g%3E%3Cg fill='%23070510'%3E%3Ccircle cx='58' cy='38' r='5.4'/%3E%3Ccircle cx='74' cy='46' r='5.4'/%3E%3Ccircle cx='90' cy='54' r='5.4'/%3E%3Ccircle cx='42' cy='46' r='5.4'/%3E%3Ccircle cx='58' cy='54' r='5.4'/%3E%3Ccircle cx='74' cy='62' r='5.4'/%3E%3Ccircle cx='26' cy='54' r='5.4'/%3E%3Ccircle cx='42' cy='62' r='5.4'/%3E%3Ccircle cx='58' cy='70' r='5.4'/%3E%3Ccircle cx='26' cy='70' r='5.4'/%3E%3Ccircle cx='42' cy='78' r='5.4'/%3E%3Ccircle cx='26' cy='86' r='5.4'/%3E%3C/g%3E%3Cg fill='rgba(230,236,208,0.05)'%3E%3Ccircle cx='56.5' cy='36.5' r='1.4'/%3E%3Ccircle cx='72.5' cy='44.5' r='1.4'/%3E%3Ccircle cx='88.5' cy='52.5' r='1.4'/%3E%3Ccircle cx='40.5' cy='44.5' r='1.4'/%3E%3Ccircle cx='56.5' cy='52.5' r='1.4'/%3E%3Ccircle cx='24.5' cy='52.5' r='1.4'/%3E%3Ccircle cx='40.5' cy='60.5' r='1.4'/%3E%3Ccircle cx='24.5' cy='68.5' r='1.4'/%3E%3C/g%3E%3Ccircle cx='104' cy='80' r='22' fill='%23110e1c'/%3E%3Cpath d='M86 90 A22 22 0 0 0 122 90' stroke='rgba(230,236,208,0.09)' stroke-width='1.5' fill='none'/%3E%3Ccircle cx='106' cy='83' r='16.5' fill='%23090711'/%3E%3Ccircle cx='103' cy='79' r='16.5' fill='url(%23ba)'/%3E%3Cellipse cx='97' cy='72' rx='6.5' ry='4.5' fill='%23ecc2d4' opacity='.5'/%3E%3Ccircle cx='95' cy='70' r='2' fill='%23f9e8ef' opacity='.92'/%3E%3Ccircle cx='134' cy='46' r='22' fill='%23110e1c'/%3E%3Cpath d='M116 56 A22 22 0 0 0 152 56' stroke='rgba(230,236,208,0.09)' stroke-width='1.5' fill='none'/%3E%3Ccircle cx='136' cy='49' r='16.5' fill='%23090711'/%3E%3Ccircle cx='133' cy='45' r='16.5' fill='url(%23ba)'/%3E%3Cellipse cx='127' cy='38' rx='6.5' ry='4.5' fill='%23ecc2d4' opacity='.5'/%3E%3Ccircle cx='125' cy='36' r='2' fill='%23f9e8ef' opacity='.92'/%3E%3Ctext x='103' y='113' text-anchor='middle' font-family='Verdana,Geneva,sans-serif' font-weight='bold' font-size='11' fill='%23888199'%3EB%3C/text%3E%3Ctext x='133' y='79' text-anchor='middle' font-family='Verdana,Geneva,sans-serif' font-weight='bold' font-size='11' fill='%23888199'%3EA%3C/text%3E%3Cg%3E%3Ccircle cx='148' cy='118' r='5' fill='url(%23scr2)'/%3E%3Ccircle cx='148' cy='118' r='5' fill='none' stroke='%230a0812' stroke-width='1'/%3E%3Cpath d='M145 118 h6' stroke='%230a0812' stroke-width='1.4'/%3E%3Cpath d='M145 117 h6' stroke='rgba(230,236,208,0.10)' stroke-width='.8'/%3E%3C/g%3E%3C/svg%3E") right 0px bottom -4px / 156px 116px no-repeat;
}

/* ═══ THE DOT-MATRIX CELL GRID — the one fine pattern allowed near the lane, so
   it RIDES THE ROLL (zero slide against the tracked glyphs = zero flicker; static
   over the slideshow per L6). Now built as REAL LCD subpixel cells, not flat lines:
   each 5px cell is a faintly lit square (a hair of g3 highlight top-left) sitting
   in dark g0 gutters, so the panel reads as a matrix of pixels the way a mono-LCD
   does. A whisper of horizontal row-banding (passive-matrix rows drive slightly
   unevenly) rides underneath. Whisper alpha overall: cells read, glyphs stay ink. ═══ */
.credits-roll::before,
.credits-slideshow::before {
  content: "";
  display: var(--handheld-scenery, block);
  position: absolute;
  inset: -150vh 0;
  z-index: 5;
  pointer-events: none;
  opacity: 0.6;
  background-image:
    /* dark cell gutters — the grid of unlit gaps between pixels */
    repeating-linear-gradient(0deg, rgba(12, 46, 12, 0.16) 0 1px, rgba(0, 0, 0, 0) 1px 5px),
    repeating-linear-gradient(90deg, rgba(12, 46, 12, 0.16) 0 1px, rgba(0, 0, 0, 0) 1px 5px),
    /* per-cell top-left catch-light — the lit face of each subpixel */
    repeating-linear-gradient(0deg, rgba(190, 214, 108, 0.09) 1px 2px, rgba(0, 0, 0, 0) 2px 5px),
    repeating-linear-gradient(90deg, rgba(190, 214, 108, 0.07) 1px 2px, rgba(0, 0, 0, 0) 2px 5px),
    /* faint passive-matrix row banding — every ~4th pixel-row a touch dimmer */
    repeating-linear-gradient(0deg, rgba(12, 46, 12, 0.05) 0 5px, rgba(0, 0, 0, 0) 5px 20px);
  background-size: 5px 5px, 5px 5px, 5px 5px, 5px 5px, 100% 20px;
}
.credits-slideshow::before { inset: 0; }

/* ═══ the save file: every section is a STAGE ═══ */
.credits-block,
.credits-slide:not(.flourish) { counter-increment: handheld-stage; }

/* titles: chunky Silkscreen ink with a hard g1 print offset and the
   pixel underline. The stage counter sits above like a level card. */
.credits-block__title {
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--handheld-ink);
  text-shadow: 0.07em 0.07em 0 rgba(48, 98, 48, 0.5), 0.14em 0.14em 0 rgba(48, 98, 48, 0.22);
  margin: 0 0 1.35rem;
}
.credits-block__title::before {
  content: "STAGE " counter(handheld-stage, decimal-leading-zero);
  display: block;
  font-family: var(--credits-title-font);
  font-weight: 400;
  /* was 0.62rem in mid-green ink — near-invisible on the lit panel; darkest
     ink + a size step keeps it an eyebrow without it vanishing */
  font-size: 0.78rem;
  letter-spacing: 0.5em;
  text-indent: 0.5em;
  margin-bottom: 0.7rem;
  color: var(--handheld-ink);
  opacity: 0.82;
  text-shadow: none;
}
/* pixel underline, three patterns cycling down the roll (intro is section
   1, so the first block lands on 3n+2). Content-agnostic; custom credit
   types just pick up the next pattern. */
.credits-block__title::after {
  content: "";
  display: block;
  width: min(13em, 72vw);
  height: 6px;
  margin: 0.5em auto 0;
  opacity: 1;
  background:
    repeating-linear-gradient(90deg, var(--handheld-ink) 0 8px, rgba(0, 0, 0, 0) 8px 16px) 0 0 / 100% 3px no-repeat,
    repeating-linear-gradient(90deg, rgba(0, 0, 0, 0) 0 8px, var(--handheld-ink) 8px 16px) 0 3px / 100% 3px no-repeat;
}
.credits-block:nth-of-type(3n) .credits-block__title::after,
.credits-slide:nth-of-type(3n) .credits-block__title::after {
  height: 4px;
  background: repeating-linear-gradient(90deg, var(--handheld-ink) 0 12px, rgba(0, 0, 0, 0) 12px 18px) 0 0 / 100% 4px no-repeat;
}
.credits-block:nth-of-type(3n + 1) .credits-block__title::after,
.credits-slide:nth-of-type(3n + 1) .credits-block__title::after {
  background:
    linear-gradient(var(--handheld-ink), var(--handheld-ink)) 0 0 / 100% 2px no-repeat,
    repeating-linear-gradient(90deg, var(--handheld-ink) 0 4px, rgba(0, 0, 0, 0) 4px 12px) 0 4px / 100% 2px no-repeat;
}

/* ═══ rows: the inventory. Names in Pixelify ink; tallies in an inverted
   item-count chip — ×12, like the pouch screen. Names are sacred: wrap,
   never clip. ═══ */
.credit {
  max-width: min(40rem, 90vw);
  margin-inline: auto;
  min-width: 0;
  overflow-wrap: anywhere;
  font-weight: 500;
  letter-spacing: 0.01em;
  line-height: 1.5;
}
.credit__name { color: var(--handheld-ink); }
.credit__amount {
  opacity: 1;
  font-family: var(--credits-title-font);
  font-weight: 400;
  font-size: 0.6em;
  letter-spacing: 0.08em;
  color: var(--handheld-g3);
  background: var(--handheld-g0);
  padding: 0.22em 0.5em 0.1em;
  margin-left: 0.65em;
  vertical-align: 0.18em;
  text-shadow: none;
  /* an inverted item-count chip with a hair of dimension: a hard g1 pixel drop
     under and right, plus a whisper of lit-cell highlight along the chip's top
     inner edge so it reads as a raised inverted panel, not a flat swatch */
  box-shadow: 2px 2px 0 rgba(48, 98, 48, 0.5), inset 0 1px 0 rgba(155, 188, 15, 0.28);
  font-variant-numeric: tabular-nums;
}
.credit__amount::before { content: "\\00D7"; margin-right: 0.18em; opacity: 0.8; }

/* ═══ flourish cards ═══ */
.flourish--intro { gap: 1.25rem; }

/* badge -> inverted menu header (copy swap via font-size:0 + ::after) */
.flourish__badge { font-size: 0; border: 0; border-radius: 0; padding: 0; box-shadow: none; }
.flourish__badge::after {
  content: "IN GLORIOUS FOUR-SHADE GREEN";
  display: inline-block;
  font-family: var(--credits-title-font);
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.4em;
  padding: 0.6em 0.6em 0.45em 1em;
  color: var(--handheld-g3);
  background: var(--handheld-g0);
  text-shadow: none;
  /* hard g1 pixel drop + a whisper of lit-cell rim along the top inner edge so the
     inverted chip reads as a raised panel catching the backlight (static, safe) */
  box-shadow: 3px 3px 0 rgba(48, 98, 48, 0.55), inset 0 1px 0 rgba(155, 188, 15, 0.3);
}

/* the streamer's title, set as a dialog window: restyle only — thick ink
   border, a gap of panel, a thin outer ring */
.flourish--intro .flourish__title {
  font-weight: 700;
  letter-spacing: 0.02em;
  line-height: 1.4;
  max-width: min(84vw, 15em);
  min-width: 0;
  overflow-wrap: anywhere;
  color: var(--handheld-ink);
  padding: 0.42em 0.6em 0.34em;
  border: 4px solid var(--handheld-ink);
  /* STATIC glass sheen baked on the hero panel — a soft diagonal cover-gleam
     across the top-left corner so the dialog window reads as lit glass, plus a
     thin g3 rim-light along the top inner edge. Always-safe (static, on a prop). */
  background:
    linear-gradient(133deg, rgba(214, 234, 156, 0.16) 0%, rgba(214, 234, 156, 0.05) 16%, rgba(214, 234, 156, 0) 34%),
    linear-gradient(180deg, rgba(155, 188, 15, 0.10) 0%, rgba(155, 188, 15, 0) 22%);
  box-shadow: 0 0 0 3px var(--handheld-g3), 0 0 0 6px var(--handheld-g0), inset 0 2px 0 rgba(155, 188, 15, 0.22);
  text-shadow: 0.06em 0.06em 0 rgba(48, 98, 48, 0.5), 0.12em 0.12em 0 rgba(48, 98, 48, 0.22);
}

/* streamer tagline: restyle only — quiet g1 pixel type */
.flourish__tagline {
  font-family: var(--credits-font);
  font-style: normal;
  font-weight: 500;
  font-size: 1.05rem;
  letter-spacing: 0.18em;
  text-transform: lowercase;
  color: var(--handheld-ink-mid);
  opacity: 1;
}

/* rating -> the battery warning (copy swap), blinking in step with the
   bezel LED (steps(1), ~0.6 paints/s — L5's in-roll ceiling is 2/s) */
.flourish__rating { font-size: 0; border: 0; padding: 0; opacity: 1; }
.flourish__rating::after {
  content: "BATTERY LOW — SAVE YOUR GAME";
  display: inline-block;
  font-family: var(--credits-title-font);
  font-weight: 400;
  font-size: 0.62rem;
  letter-spacing: 0.3em;
  padding: 0.55em 0.7em 0.4em 1em;
  color: var(--handheld-ink);
  border: 2px solid var(--handheld-ink);
  text-shadow: none;
  animation: handheld-batt 7s steps(1, end) infinite;
}

/* cartridge fine print */
.flourish--intro::after {
  content: "©199X GOODNITE SOFT · SAVE 03 · PLAY TIME 99:59";
  display: var(--handheld-scenery, block);
  font-family: var(--credits-title-font);
  font-weight: 400;
  font-size: 0.58rem;
  letter-spacing: 0.3em;
  text-indent: 0.3em;
  color: rgba(15, 56, 15, 0.55);
  text-shadow: none;
}

/* outro: THANKS FOR PLAYING! over a full save bar (copy swaps) */
.flourish--outro::before {
  content: "\\2665 \\2665 \\2665";
  display: var(--handheld-scenery, block);
  font-size: 0.95rem;
  letter-spacing: 0.85em;
  text-indent: 0.85em;
  color: var(--handheld-ink);
  text-shadow: none;
  opacity: 0.9;
}
.flourish--outro .flourish__title { font-size: 0; }
.flourish--outro .flourish__title::after {
  content: "THANKS FOR PLAYING!";
  display: inline-block;
  font-family: var(--credits-title-font);
  font-weight: 700;
  font-size: var(--credits-flourish-title-size);
  letter-spacing: 0.02em;
  line-height: 1.35;
  max-width: 90vw;
  color: var(--handheld-ink);
  text-shadow: 0.07em 0.07em 0 rgba(48, 98, 48, 0.5), 0.14em 0.14em 0 rgba(48, 98, 48, 0.22);
}
.flourish--outro .flourish__tagline { font-size: 0; }
.flourish--outro .flourish__tagline::after {
  content: "game saved — see you next stream";
  font-family: var(--credits-font);
  font-weight: 500;
  font-size: 1.02rem;
  letter-spacing: 0.18em;
  color: var(--handheld-ink-mid);
}
.flourish--outro::after {
  content: "SAVE COMPLETE";
  font-family: var(--credits-title-font);
  font-weight: 400;
  font-size: 0.6rem;
  letter-spacing: 0.34em;
  padding: 0.6em 0.7em 0.45em 1.04em;
  margin-top: 0.55rem;
  color: var(--handheld-g3);
  background: var(--handheld-g0);
  text-shadow: none;
  box-shadow: 0 0 0 3px var(--handheld-g3), 0 0 0 5px var(--handheld-g0), inset 0 1px 0 rgba(155, 188, 15, 0.3);
}

/* ═══ raid finale: BOSS RUSH — the menu inverts. Alert eyebrow blinks on
   steps(1) at 1.25 paints/s (the only other in-roll animation; L5 cap 2/s),
   the title bar goes solid ink, names step up a size. ═══ */
.credits-block:nth-last-of-type(2),
.credits-slide:nth-last-of-type(2):not(.flourish) {
  background: radial-gradient(ellipse 60% 54% at 50% 42%, rgba(15, 56, 15, 0.12), rgba(15, 56, 15, 0) 74%);
}
.credits-block:nth-last-of-type(2) .credits-block__title,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
  background: var(--handheld-g0);
  color: var(--handheld-g3);
  padding: 0.34em 0.9em 0.26em;
  width: fit-content;
  max-width: 86vw;
  margin-inline: auto;
  text-shadow: none;
  /* an alert banner: a g3 ring gap and a g0 outer ring echo the intro dialog's
     framing language, plus the hard g1 pixel drop for weight */
  box-shadow:
    0 0 0 3px var(--handheld-g3),
    0 0 0 6px var(--handheld-g0),
    0.22em 0.28em 0 rgba(48, 98, 48, 0.5);
}
.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  content: "! BOSS RUSH !";
  color: var(--handheld-g3);
  animation: handheld-alert 1.6s steps(1, end) infinite;
}
.credits-block:nth-last-of-type(2) .credits-block__title::after,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::after { display: none; }
.credits-block:nth-last-of-type(2) .credit,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit {
  font-size: calc(var(--credits-name-size) * 1.08);
  font-weight: 600;
}

/* ═══ slideshow: pages flip like frames, not fades — a steps() dissolve ═══ */
.credits-slide { transition: opacity 0.45s steps(4, end); }

/* ═══ keyframes (all handheld- prefixed; transform/opacity ONLY) ═══ */
/* the march: 140 hops across 70s = 2 hops/s, ~15px a hop */
@keyframes handheld-walk {
  0%   { transform: translate3d(-6vw, 0, 0); }
  100% { transform: translate3d(106vw, 0, 0); }
}
/* foot swap, welded to the hop beat: A shows on odd hops, B on even */
@keyframes handheld-step {
  0%, 49%   { opacity: 0; }
  50%, 100% { opacity: 1; }
}
@keyframes handheld-step-inv {
  0%, 49%   { opacity: 1; }
  50%, 100% { opacity: 0; }
}
/* low battery: steady, then a double dip — 4 paint changes per 7s */
@keyframes handheld-batt {
  0%   { opacity: 1; }
  62%  { opacity: 0.3; }
  68%  { opacity: 1; }
  74%  { opacity: 0.3; }
  80%  { opacity: 1; }
  100% { opacity: 1; }
}
/* boss alert: one on/off per 1.6s = 1.25 paints/s */
@keyframes handheld-alert {
  0%   { opacity: 1; }
  50%  { opacity: 0.3; }
  100% { opacity: 1; }
}

/* ═══ reduced motion: the critter parks mid-screen on frame A, the LED
   burns steady, the warnings hold, slides go back to a plain fade ═══ */
@media (prefers-reduced-motion: reduce) {
  head meta:first-of-type::before {
    animation: none;
    transform: translate3d(30vw, 0, 0);
    opacity: 1;
  }
  head meta:first-of-type::after { animation: none; opacity: 0; }
  head meta:last-of-type::after { animation: none; opacity: 0.9; }
  .flourish__rating::after { animation: none; }
  .credits-block:nth-last-of-type(2) .credits-block__title::before,
  .credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
    animation: none;
  }
  .credits-slide { transition: opacity 0.8s ease; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--handheld-scenery:none;--handheld-ink:#9bbc0f;--handheld-ink-mid:#8bac0f;}",
};
