import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. Playbill: an engraved Broadway theatre programme on aged cream stock. */
export const VARIANT: ThemeVariant = {
  key: "playbill",
  name: "Playbill",
  css: `
/* ==========================================================================
   PLAYBILL — a Broadway programme for the end of the stream
   Layered after the base theme. Print stays still; light moves.
   Transparent collapse (OBS): :root{--credits-bg:transparent;--playbill-scenery:none;}
   ========================================================================== */
@import url("https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=Playfair+Display+SC:ital,wght@0,400;0,700&display=swap");

:root {
  color-scheme: light;
  /* Root paints only the solid paper base — cheap to repaint inside the crawl's
     per-frame damage under CPU rendering. The full paper texture lives on the
     PROMOTED html::before frame layer (painted once, composited thereafter);
     unpromoted root texture measured 23fps. The one-line override still
     collapses everything (--credits-bg + --playbill-scenery). */
  --credits-bg: #efe2c2;
  --credits-color: #272019;                          /* warm sepia ink */
  --credits-accent: #8e2130;                         /* deep playbill crimson */
  --credits-font: "EB Garamond", "Iowan Old Style", Georgia, "Times New Roman", serif;
  --credits-title-font: "Playfair Display SC", "Playfair Display", Georgia, "Times New Roman", serif;
  --credits-title-size: clamp(1.3rem, 3vw, 1.85rem);
  --credits-name-size: clamp(1.1rem, 2.6vw, 1.6rem);
  --credits-flourish-title-size: clamp(2.6rem, 8vw, 4.75rem);
  --credits-block-gap: 5.5rem;
  --credits-name-gap: 0.55rem;
  --credits-shadow: 0 1px 0 rgba(255, 253, 244, 0.55); /* letterpress lift, not glow */
  /* Glow no-op: must stay a VALID shadow ("none" in the base's
     "text-shadow: var(--credits-glow), var(--credits-shadow)" list would
     invalidate the whole declaration). */
  --credits-glow: 0 0 0 rgba(0, 0, 0, 0);
  /* theme locals */
  --playbill-display-font: "Playfair Display", Georgia, "Times New Roman", serif;
  --playbill-ink-50: rgba(39, 32, 25, 0.5);
  --playbill-ink-60: rgba(39, 32, 25, 0.6);
  --playbill-ink-80: rgba(39, 32, 25, 0.8);
  --playbill-cream: #f6edd8;
  --playbill-column: min(680px, 86vw);
}

/* --- Paper: full-bleed on <html>; ink keeps the base edge-fade on <body>. --- */
html {
  -webkit-mask-image: none;
  mask-image: none;                 /* paper must reach every screen edge */
  background: var(--credits-bg);
}
body {
  background: transparent;          /* never double-paint (a masked second copy would band) */
  counter-reset: playbill-scene;
  -webkit-font-smoothing: antialiased;
}

/* Printed page frame + the full paper texture, merged on one PROMOTED layer (on
   html so the body mask never fades it). translateZ(0) makes it a cached
   compositor texture: painted once, blended per frame. The 16px gutter outside
   the frame shows the root's matching solid base. z-index -2 keeps the limelight
   (html::after, -1) above the page.
   The frame is now a GOLD-STAMPED double rule (box-shadow rings replace the flat
   border/outline): a thin dark keyline, a gilt band, and a soft gilt bloom, so the
   cover reads as pressed-and-foiled programme stock, not a Word-doc box. */
html::before {
  content: "";
  display: var(--playbill-scenery, block);  /* scenery kill-switch for OBS compositing */
  position: fixed;
  inset: 20px;
  z-index: -2;
  border: 1px solid rgba(39, 32, 25, 0.55);
  border-radius: 2px;
  pointer-events: none;
  /* Gold-leaf stamped frame, painted once as static rings — all specular, no motion (L6 safe). */
  box-shadow:
    inset 0 0 0 4px var(--credits-bg),
    inset 0 0 0 5px rgba(150, 116, 44, 0.55),
    inset 0 0 0 6px rgba(214, 178, 96, 0.85),
    inset 0 0 0 7px rgba(120, 90, 34, 0.6),
    inset 0 0 34px 8px rgba(150, 112, 44, 0.14),
    inset 0 0 3px rgba(255, 246, 214, 0.5);
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.24 0 0 0 0 0.18 0 0 0 0 0.10 0 0 0 0.07 0'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23g)'/%3E%3C/svg%3E") repeat,
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='560'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.022' numOctaves='2' seed='7'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.52 0 0 0 0 0.40 0 0 0 0 0.20 0 0 0 0.07 0'/%3E%3C/filter%3E%3Crect width='560' height='560' filter='url(%23f)'/%3E%3C/svg%3E") repeat,
    radial-gradient(ellipse 120% 90% at 50% 44%, rgba(93, 66, 28, 0) 55%, rgba(84, 58, 24, 0.26) 100%),
    radial-gradient(ellipse 96% 72% at 50% 36%, rgba(255, 250, 234, 0.9) 0%, rgba(255, 250, 234, 0) 62%),
    radial-gradient(ellipse 66% 50% at 10% 97%, rgba(190, 158, 96, 0.34), rgba(190, 158, 96, 0) 55%),
    radial-gradient(ellipse 66% 50% at 92% 3%, rgba(190, 158, 96, 0.3), rgba(190, 158, 96, 0) 55%),
    radial-gradient(ellipse 60% 44% at 88% 94%, rgba(150, 112, 60, 0.22), rgba(150, 112, 60, 0) 55%),
    linear-gradient(180deg, #f4e9cf 0%, #efe2c2 52%, #e7d5ac 100%);
  transform: translateZ(0);
}
/* Limelight, parked STATIC at the midpoint of its old sweep path. Even a
   compositor-only translate of a 160vw x 126vh translucent layer costs a
   full-texture resample every frame when compositing runs on the CPU (OBS with
   hardware acceleration off) — measured 21fps. The 38s drift was imperceptible;
   the warm pool of light is the look, so it stays, painted once.
   Radii 110.4vw x 86.4vh = 46%/36% of the old 240% image; same 72% fade stop.
   z-index:-1 keeps it above the paper but under frame + ink, as before. */
html::after {
  content: "";
  display: var(--playbill-scenery, block);  /* scenery kill-switch for OBS compositing */
  position: fixed;
  left: -80vw;
  top: -63vh;
  width: 160vw;                     /* transparent past the 72% stop, so edges never show */
  height: 126vh;
  z-index: -1;
  pointer-events: none;
  /* Two stacked warm pools + a top proscenium wash: a bright limelight core over a
     broad ambient glow anchors the composition and fills the old dead zones. All
     COARSE and static (painted once) — no fine pattern, L6 safe. */
  background:
    radial-gradient(60vw 30vh at 50% 8%, rgba(255, 244, 214, 0.4), rgba(255, 244, 214, 0) 70%),
    radial-gradient(46vw 40vh at 50% 46%, rgba(255, 251, 232, 0.62), rgba(255, 251, 232, 0) 66%),
    radial-gradient(112vw 88vh at 50% 50%, rgba(255, 248, 224, 0.32), rgba(255, 248, 224, 0) 72%);
  /* translateZ(0) promotes the parked light to a cached texture (blended, never repainted) */
  transform: translate(50vw, 39.2vh) translateZ(0);
}

/* --- Gilt limelight glints that RIDE the crawl (L6 clause b: they move WITH the
   text, so never slide against it) and sit at the FAR edges, off the center lane
   (clause c). COARSE soft pools only (>=40px, soft falloff) — no fine twinkles.
   These are the "shine" catching the printed page as the programme scrolls past. --- */
.credits-roll::before {
  content: "";
  display: var(--playbill-scenery, block);
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(320px 320px at 16% 20%, rgba(255, 236, 190, 0.14), rgba(255, 236, 190, 0) 70%),
    radial-gradient(300px 300px at 85% 52%, rgba(255, 232, 182, 0.13), rgba(255, 232, 182, 0) 70%),
    radial-gradient(360px 360px at 12% 82%, rgba(255, 238, 196, 0.12), rgba(255, 238, 196, 0) 70%);
}

/* --- Scene numbering (slideshow blocks have no .credits-block class!) --- */
.credits-block,
.credits-slide:not(.flourish) { counter-increment: playbill-scene; }
.credits-block::before,
.credits-slide:not(.flourish)::before {
  content: "— Scene " counter(playbill-scene, upper-roman) " —";
  display: block;
  font-family: var(--credits-title-font);
  font-size: 0.85rem;
  letter-spacing: 0.34em;
  color: var(--playbill-ink-60);
  margin-bottom: 1rem;
}

/* --- Section headers: full-column double rules, true small caps, fleurons --- */
.credits-block__title {
  box-sizing: border-box;
  width: var(--playbill-column);
  margin: 0 auto 1.5rem;
  padding: 0.6em 0.5em 0.55em;
  border-top: 4px double var(--playbill-ink-80);
  border-bottom: 1px solid var(--playbill-ink-60);
  color: var(--credits-color);
  font-weight: 700;
  letter-spacing: 0.26em;
  text-transform: none;             /* Playfair Display SC supplies REAL small caps */
  /* A gilt hairline riding just under the double rule = gold-stamped header (static, L6
     safe). Just the thin gilt line — no fill panel, so the header sits cleanly over any
     OBS background when scenery is collapsed. */
  background:
    linear-gradient(rgba(198, 160, 82, 0.8), rgba(198, 160, 82, 0.8)) left 5px / 100% 1px no-repeat;
}
.credits-block__title::before,
.credits-block__title::after {      /* replaces the base gold bar ::after entirely */
  content: "❦";
  display: inline-block;
  width: auto;
  height: auto;
  margin: 0 0.7em;
  background: none;
  opacity: 1;
  /* Gold-stamped fleuron: warm gilt fill with a bright specular top-edge (static, L6 safe). */
  color: #9a6f28;
  text-shadow:
    0 -1px 0 rgba(255, 240, 200, 0.85),
    0 1px 1px rgba(70, 44, 12, 0.45);
  font-size: 0.82em;
  vertical-align: 0.06em;
  letter-spacing: normal;
}
.credits-block__title::before { transform: scaleX(-1); }

/* --- Cast-list rows: name . . . leader . . . amount (the engraved programme row) --- */
.credits-block__list {
  width: var(--playbill-column);
  margin: 0 auto;
}
.credit {
  display: flex;
  align-items: baseline;
  align-items: last baseline;       /* wrapped names hand the leader their LAST line's baseline */
  gap: 0.7ch;
  text-align: left;
  line-height: 1.5;
}
.credit__name {                     /* sacred content: wraps, never clips */
  order: 1;
  min-width: 0;
  overflow-wrap: anywhere;
  font-weight: 500;
}
.credit::before {                   /* leader of REAL periods = perfect print baseline */
  content: "..................................................................................................................";
  order: 2;
  flex: 1 1 3ch;
  min-width: 3ch;
  overflow: hidden;
  white-space: nowrap;
  text-align: left;
  font-size: 0.9em;
  letter-spacing: 0.42em;
  color: var(--playbill-ink-50);
  text-shadow: none;
}
.credit__amount {
  order: 3;
  white-space: nowrap;
  opacity: 1;
  color: var(--credits-accent);
  font-weight: 600;
  font-variant-numeric: oldstyle-nums;
}
.credit__amount::before { content: none; }   /* kill the base " · " separator */
.credit::after {                    /* terminus leaf so amount-less rows still resolve */
  content: "❧";
  order: 4;
  font-size: 0.82em;
  color: #9a6f28;                   /* gilt terminus leaf, specular top-edge (static, L6 safe) */
  text-shadow: 0 -1px 0 rgba(255, 240, 200, 0.7);
  opacity: 0.9;
}
.credit:nth-child(even)::after { transform: scaleX(-1); }
/* Enhancement (Chromium >=105): amount becomes the terminus, leaf retires.
   On older CEF this rule is simply dropped and the leaf caps every row. */
.credit:has(.credit__amount)::after { content: none; }

/* --- Raid finale = Curtain Call.
   The outro flourish <section> is the true last sibling, so target second-to-last. --- */
.credits-block:nth-last-of-type(2)::before,
.credits-slide:nth-last-of-type(2):not(.flourish)::before {
  content: "— Curtain Call —";
  color: var(--credits-accent);
}
.credits-block:nth-last-of-type(2) .credits-block__title,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
  color: var(--credits-accent);
  border-top-color: currentColor;
  border-bottom-color: currentColor;
}
.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-block:nth-last-of-type(2) .credits-block__title::after,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::after {
  content: "✦";                     /* warm marquee bulb: opacity-only twinkle, rides the crawl (L6 b) */
  transform: none;
  color: #d8ad46;                   /* gilt bulb */
  /* soft warm halo = it reads as a lit bulb, not a thin crimson tick (coarse glow, L6 safe) */
  text-shadow:
    0 0 6px rgba(255, 210, 120, 0.9),
    0 0 14px rgba(230, 168, 70, 0.55),
    0 1px 1px rgba(80, 48, 12, 0.4);
  animation: playbill-twinkle 2.4s ease-in-out infinite alternate;
}
.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  animation-delay: -1.2s;
}
.credits-block:nth-last-of-type(2) .credit,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit {
  font-size: calc(var(--credits-name-size) * 1.12);
}
@keyframes playbill-twinkle {
  from { opacity: 0.5; }
  to   { opacity: 1; }
}

/* --- Intro: the programme cover --- */
.flourish--intro { gap: 1.1rem; }
.credits-roll .flourish--intro {    /* scroll only: in slideshow the flourish IS the
                                       inset-0 slide, so width+border would misplace it */
  box-sizing: border-box;
  width: var(--playbill-column);
  border: 1px solid var(--playbill-ink-80);
  border-radius: 3px;
  padding: 1.6rem 2.4rem 2.6rem;
  /* Gilt cover panel: double keyline + soft warm inner glow so the cover reads as a
     pressed programme panel, not a plain box. Static rings only (L6 safe). */
  box-shadow:
    inset 0 0 0 4px var(--credits-bg),
    inset 0 0 0 5px rgba(150, 116, 44, 0.5),
    inset 0 0 0 6px rgba(214, 178, 96, 0.8),
    inset 0 0 44px 6px rgba(150, 112, 44, 0.1),
    inset 0 0 3px rgba(255, 246, 214, 0.55);
}
.flourish--intro::before {          /* crimson masthead band (net-new copy, not a swap) */
  content: "Playbill";
  align-self: stretch;              /* span the cover card = a true title bar, not a floating pill */
  box-sizing: border-box;
  text-align: center;
  font-family: var(--playbill-display-font);
  font-style: italic;
  font-weight: 900;
  font-size: clamp(1.7rem, 3.4vw, 2.5rem);
  letter-spacing: 0.04em;
  text-transform: none;
  color: var(--playbill-cream);
  /* Foil-stamped crimson band: deep-ink base + raised top sheen + a diagonal foil
     glint sweeping across it (all static specular highlights, L6 safe). */
  background:
    linear-gradient(115deg, rgba(255, 255, 255, 0) 34%, rgba(255, 232, 214, 0.22) 47%, rgba(255, 255, 255, 0) 60%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0) 42%),
    linear-gradient(180deg, #a8283a 0%, #8e2130 52%, #6f1826 100%);
  padding: 0.42em 1.4em 0.5em;
  border-radius: 2px;
  box-shadow:
    inset 0 0 0 1px rgba(214, 178, 96, 0.7),
    inset 0 1px 0 rgba(255, 220, 200, 0.35),
    inset 0 -2px 5px rgba(60, 12, 20, 0.5),
    0 1px 2px rgba(60, 20, 12, 0.16);   /* whisper drop = ink pressed into stock, not a floating chip */
  /* letterpress: bright top edge + dark drop = pressed-foil lettering (static, L6 safe) */
  text-shadow: 0 1px 0 rgba(255, 224, 200, 0.35), 0 -1px 0 rgba(60, 12, 20, 0.55);
}
.flourish__badge {
  font-size: 0;                     /* copy swap: text lives in ::after below */
  letter-spacing: normal;
  color: var(--credits-color);
  border: none;
  border-top: 1px solid var(--playbill-ink-60);
  border-bottom: 1px solid var(--playbill-ink-60);
  border-radius: 0;
  box-shadow: none;
  padding: 0.5rem 1.5rem;
  text-transform: none;
}
.flourish__badge::after {
  content: "The Management Proudly Presents";
  font-family: var(--credits-title-font);
  font-size: 0.85rem;
  letter-spacing: 0.3em;            /* re-declared: parent em-tracking computes vs font-size 0 */
}
.flourish__title {                  /* streamer-configurable: restyle ONLY, never swap */
  font-family: var(--playbill-display-font);
  font-weight: 900;
  letter-spacing: 0.06em;
  color: var(--credits-color);
}
.flourish__tagline {                /* streamer-configurable: restyle ONLY, never swap */
  font-size: 1.15rem;
  opacity: 0.8;
  letter-spacing: 0.03em;
}
.flourish__rating {
  font-size: 0;                     /* copy swap: ticket stub */
  letter-spacing: normal;
  border: 1px solid var(--playbill-ink-60);
  border-radius: 0;
  padding: 0.5rem 1.2rem;
  opacity: 1;
  text-transform: none;
}
.flourish__rating::after {
  content: "One Night Only · General Admission";
  font-family: var(--credits-title-font);
  font-size: 0.78rem;
  letter-spacing: 0.22em;
  color: var(--playbill-ink-80);
}

/* --- Outro: curtain call --- */
.flourish--outro::before {          /* gilt rule — bulb — gilt rule */
  content: "✦";
  color: #d8ad46;
  text-shadow:
    0 0 6px rgba(255, 210, 120, 0.9),
    0 0 15px rgba(230, 168, 70, 0.5),
    0 1px 1px rgba(80, 48, 12, 0.4);
  font-size: 1.1rem;
  width: min(380px, 64vw);
  text-align: center;
  background:
    linear-gradient(rgba(160, 124, 52, 0.85), rgba(160, 124, 52, 0.85)) left center / calc(50% - 2em) 1px no-repeat,
    linear-gradient(rgba(160, 124, 52, 0.85), rgba(160, 124, 52, 0.85)) right center / calc(50% - 2em) 1px no-repeat;
}
.flourish--outro .flourish__title { font-size: 0; letter-spacing: 0; }
.flourish--outro .flourish__title::after {
  content: "— Fin —";
  font-family: var(--playbill-display-font);
  font-size: var(--credits-flourish-title-size);
  font-style: italic;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: none;             /* uppercase inherits from the h1 otherwise */
  /* Letterpress emboss: bright top edge + soft ink drop = pressed into the stock (static, L6 safe). */
  text-shadow:
    0 1px 0 rgba(255, 252, 244, 0.85),
    0 -1px 0 rgba(90, 70, 40, 0.28),
    0 3px 6px rgba(60, 44, 20, 0.16);
}
.flourish--outro .flourish__tagline { font-size: 0; }
.flourish--outro .flourish__tagline::after {
  content: "You have been a wonderful audience — good night";
  font-size: 1.15rem;
  font-style: italic;
  letter-spacing: 0.03em;
}
.flourish--outro::after {
  content: "Exeunt Omnes";
  font-family: var(--credits-title-font);
  font-size: 0.8rem;
  letter-spacing: 0.3em;
  color: var(--playbill-ink-60);
  margin-top: 0.5rem;
}

/* --- Slideshow polish: page-settle + column wrapping for long lists ---
   Safe transforms: JS writes inline translateY ONLY on .credits-roll, never slides. */
.credits-slide {
  transform: translateY(10px);
  transition: opacity 0.8s ease, transform 0.9s ease;
}
.credits-slide.is-active { transform: translateY(0); }
body[data-mode="slideshow"] .credits-block__list {
  width: auto;
  max-width: 90vw;
  max-height: 58vh;
  flex-wrap: wrap;
  align-content: center;
  column-gap: 3rem;
}
body[data-mode="slideshow"] .credit {
  box-sizing: border-box;
  width: min(460px, 40vw);
}

@media (prefers-reduced-motion: reduce) {
  .credits-block__title::before,
  .credits-block__title::after { animation: none; }
  .credits-slide { transition: opacity 0.8s ease; transform: none; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--playbill-scenery:none;}",
};
