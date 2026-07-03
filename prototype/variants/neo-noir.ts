import type { ThemeVariant } from "./variant";

/** PROTOTYPE — throwaway. Neo-Noir: a rain-slick case file typed at 3 a.m. — silver names in slatted light, one red word saved for the end. */
export const VARIANT: ThemeVariant = {
  key: "neo-noir",
  name: "Neo-Noir — Smoke & Venetian Blinds",
  css: `
/* ==================================================================
   NEO-NOIR — smoke & venetian blinds
   Layered AFTER the base stylesheet (Custom CSS param). CSS only.
   Go transparent for OBS compositing (one line):
   :root { --credits-bg: transparent; --neo-noir-scenery: none; }
   ================================================================== */
@import url('https://fonts.googleapis.com/css2?family=Special+Elite&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap');

:root {
  --credits-bg: #050506;
  --credits-color: #e8e8ec;
  --credits-accent: #9b9ba4;
  --credits-font: "Courier Prime", "Courier New", ui-monospace, Menlo, monospace;
  --credits-title-font: "Special Elite", "Courier Prime", "Courier New", ui-monospace, monospace;
  --credits-title-size: clamp(1rem, 2.2vw, 1.35rem);
  --credits-name-size: clamp(1.1rem, 2.6vw, 1.6rem);
  --credits-flourish-title-size: clamp(2.2rem, 6.5vw, 4.25rem);
  --credits-block-gap: 5.5rem;
  --credits-name-gap: 0.55rem;
  --credits-shadow: 0 1px 0 rgba(0, 0, 0, 0.8);
  /* No-op glow: base composes "text-shadow: var(--credits-glow), var(--credits-shadow)".
     'none' inside a shadow list invalidates the whole declaration — keep a transparent shadow. */
  --credits-glow: 0 0 0 rgba(0,0,0,0);
  /* theme-local knobs */
  --noir-ink-dim: #9b9ba4;
  --noir-ink-faint: #6f6f78;
  --noir-red: #d21f3c;
  --noir-left: clamp(3rem, 14vw, 16rem);
  /* Keep the ledger clear of the rain-slick window on the right (~44vw wide):
     the column ends before the glass so names/amounts never run under the frame. */
  --noir-col: min(46ch, calc(54vw - var(--noir-left)));
}

/* Scenery lives on <html> + promoted void-element pseudos; the edge-fade mask
   stays on <body> only, so names fade at the frame edges but the night never does. */
html { -webkit-mask-image: none; mask-image: none; }
body {
  background: transparent; /* scenery paints on html — avoid double-painting */
  text-align: left;
  counter-reset: noir-case;
  -webkit-font-smoothing: antialiased;
}

/* Void-element trick: promote <head>/<meta>/<link> so their pseudos can host
   the fixed hero prop (rain-slick window + skyline) that fills the right frame.
   NB: head::after proved unreliable across engines (head::before paints, its
   ::after does not) — so the hero window rides a META void-element pseudo, which
   is the blessed, reliable host.  Every one keys to the single kill-switch (L7). */
head { display: var(--neo-noir-scenery, block); }
head meta, head link { display: var(--neo-noir-scenery, block); }

/* ---- Scenery (all layers keyed to the one kill-switch) ------------
   L0 — the city at night: a warm streetlamp/neon horizon low-right (the window's
   world), cold key bleed high-right, deep vignette, black.  The gradients place a
   real light SOURCE in the lower-right so the whole frame reads as lit-from-there
   instead of an even void. */
html::before {
  content: "";
  display: var(--neo-noir-scenery, block);
  position: fixed; inset: 0; z-index: -3; pointer-events: none;
  background:
    /* warm streetlamp horizon low-right (the window's world) */
    radial-gradient(ellipse 46% 40% at 82% 96%, rgba(214, 150, 74, 0.20), rgba(214,150,74,0.05) 34%, transparent 66%),
    /* coarse warm HALO seating the window in a pool of streetlamp light — big &
       soft (>>40px), static, behind the glass (L6-safe), off the left text lane */
    radial-gradient(ellipse 40% 52% at 82% 46%, rgba(224, 168, 98, 0.13), rgba(224,168,98,0.03) 46%, transparent 72%),
    /* cold key bleed high-right */
    radial-gradient(ellipse 40% 34% at 78% 8%, rgba(150, 176, 214, 0.10), transparent 62%),
    /* a faint desk-lamp pool over the LEFT rail so the names' world is lit too,
       not a void — coarse + soft (L6-safe), warm to match the streetlamp key */
    radial-gradient(ellipse 40% 52% at 20% 40%, rgba(196, 158, 108, 0.065), transparent 66%),
    radial-gradient(ellipse 132% 100% at 44% 46%, transparent 36%, rgba(0, 0, 0, 0.62) 100%),
    linear-gradient(178deg, #080810 0%, #06060a 46%, #030305 78%, #010102 100%);
}

/* L1 — RAIN-SLICK WINDOW, the hero prop: a detective's office window on the
   right, muntins dividing four panes, wet glass with a cold specular sheen and
   static rain rivulets streaking down, a lit skyline behind the glass.  Baked
   into ONE SVG on html::after — the RELIABLE render host (head::after and the
   meta void-pseudo both silently failed to paint in Chrome; html::after paints
   every time).  Full-screen box, the 860x1080 window pinned to the RIGHT via
   background-position, scaled to full height so it OWNS the once-dead right
   frame.  Static — no motion budget, no flicker. Data-URI ONE unbroken line. */
html::after {
  content: "";
  display: var(--neo-noir-scenery, block);
  position: fixed; inset: 0; z-index: -1; pointer-events: none; transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='860' height='1080'%3E%3Crect x='150' y='70' width='700' height='940' fill='%231b2236'/%3E%3Crect x='150' y='70' width='700' height='470' fill='%2321283c'/%3E%3Crect x='430' y='70' width='420' height='560' fill='%232c2417'/%3E%3Crect x='500' y='120' width='300' height='360' fill='%233a2c17'/%3E%3Crect x='560' y='170' width='200' height='240' fill='%23473413'/%3E%3Crect x='170' y='560' width='90' height='450' fill='%23090a14'/%3E%3Crect x='275' y='500' width='70' height='510' fill='%230b0c16'/%3E%3Crect x='360' y='610' width='105' height='400' fill='%23080913'/%3E%3Crect x='480' y='540' width='80' height='470' fill='%230a0b15'/%3E%3Crect x='575' y='470' width='110' height='540' fill='%23090a14'/%3E%3Crect x='700' y='580' width='130' height='430' fill='%230b0c16'/%3E%3Crect x='300' y='500' width='120' height='60' fill='%23090a14'/%3E%3Crect x='540' y='470' width='120' height='70' fill='%23090a14'/%3E%3Cg fill='%23ffca6e'%3E%3Crect x='188' y='600' width='11' height='15'/%3E%3Crect x='212' y='600' width='11' height='15'/%3E%3Crect x='188' y='642' width='11' height='15'/%3E%3Crect x='234' y='682' width='11' height='15'/%3E%3Crect x='293' y='540' width='11' height='15'/%3E%3Crect x='317' y='540' width='11' height='15'/%3E%3Crect x='293' y='602' width='11' height='15'/%3E%3Crect x='380' y='650' width='11' height='15'/%3E%3Crect x='427' y='650' width='11' height='15'/%3E%3Crect x='380' y='712' width='11' height='15'/%3E%3Crect x='500' y='580' width='11' height='15'/%3E%3Crect x='524' y='622' width='11' height='15'/%3E%3Crect x='595' y='510' width='11' height='15'/%3E%3Crect x='642' y='510' width='11' height='15'/%3E%3Crect x='595' y='572' width='11' height='15'/%3E%3Crect x='619' y='652' width='11' height='15'/%3E%3Crect x='720' y='620' width='11' height='15'/%3E%3Crect x='767' y='662' width='11' height='15'/%3E%3Crect x='720' y='702' width='11' height='15'/%3E%3Crect x='560' y='500' width='11' height='15'/%3E%3Crect x='600' y='500' width='11' height='15'/%3E%3Crect x='330' y='522' width='11' height='15'/%3E%3Crect x='370' y='522' width='11' height='15'/%3E%3C/g%3E%3Cg fill='%2394b6e6'%3E%3Crect x='212' y='682' width='11' height='15'/%3E%3Crect x='339' y='602' width='11' height='15'/%3E%3Crect x='427' y='712' width='11' height='15'/%3E%3Crect x='547' y='580' width='11' height='15'/%3E%3Crect x='642' y='652' width='11' height='15'/%3E%3Crect x='767' y='622' width='11' height='15'/%3E%3C/g%3E%3Cpolygon points='430,70 560,70 260,1010 150,1010 150,880' fill='%23ffffff' opacity='0.10'/%3E%3Cpolygon points='470,70 540,70 300,1010 250,1010' fill='%23ffffff' opacity='0.06'/%3E%3Cg stroke='%23eef4ff' stroke-width='2.5' fill='none' opacity='0.5'%3E%3Cpath d='M250 90 q-16 240 6 470 q-12 260 8 470'/%3E%3Cpath d='M300 90 q12 200 -4 400 q14 300 2 540'/%3E%3Cpath d='M430 90 q-10 300 8 560 q-8 220 4 380'/%3E%3Cpath d='M560 90 q14 180 -6 420 q12 300 0 540'/%3E%3Cpath d='M690 90 q-12 260 6 500 q-10 240 6 440'/%3E%3Cpath d='M770 90 q10 220 -4 460 q12 280 -2 480'/%3E%3C/g%3E%3Cg fill='%23ffffff' opacity='0.7'%3E%3Ccircle cx='330' cy='240' r='2.6'/%3E%3Ccircle cx='470' cy='360' r='2.1'/%3E%3Ccircle cx='600' cy='190' r='2.6'/%3E%3Ccircle cx='720' cy='430' r='1.9'/%3E%3Ccircle cx='390' cy='560' r='2.3'/%3E%3Ccircle cx='540' cy='700' r='2.1'/%3E%3Ccircle cx='680' cy='790' r='2.6'/%3E%3Ccircle cx='300' cy='860' r='2.1'/%3E%3C/g%3E%3Crect x='170' y='90' width='340' height='430' fill='%23ffffff' opacity='0.03'/%3E%3Crect x='150' y='70' width='700' height='940' fill='none' stroke='%2314141c' stroke-width='42'/%3E%3Crect x='150' y='70' width='700' height='940' fill='none' stroke='%233d3d48' stroke-width='3'/%3E%3Crect x='171' y='91' width='658' height='898' fill='none' stroke='%23e8e8ec' stroke-width='1.5' opacity='0.16'/%3E%3Crect x='171' y='91' width='658' height='898' fill='none' stroke='%23000' stroke-width='2'/%3E%3Crect x='488' y='70' width='24' height='940' fill='%2318181f'/%3E%3Crect x='150' y='528' width='700' height='26' fill='%2318181f'/%3E%3Crect x='488' y='70' width='24' height='3' fill='%234a4a58'/%3E%3Crect x='150' y='528' width='700' height='3' fill='%234a4a58'/%3E%3Crect x='509' y='70' width='2' height='940' fill='%23000' opacity='0.6'/%3E%3Crect x='150' y='551' width='700' height='2' fill='%23000' opacity='0.6'/%3E%3Crect x='120' y='1006' width='760' height='36' fill='%2320202a'/%3E%3Crect x='120' y='1006' width='760' height='3' fill='%23555562'/%3E%3C/svg%3E") no-repeat right center;
  background-size: auto 100%;
}

/* L1b — WARM KEY BLOOM behind the window: a coarse (>>40px) soft streetlamp
   glow that breathes on opacity only.  L6-legal sparkle: coarse + soft-falloff +
   opacity-only + parked off the CENTER text lane (it sits behind the right-hand
   window, the text rides the left rail). */
head::before {
  content: "";
  display: var(--neo-noir-scenery, block);
  position: fixed; top: 2%; right: -8vw; width: 50vw; height: 66vh;
  z-index: -1; pointer-events: none; transform: translateZ(0); will-change: opacity;
  background: radial-gradient(ellipse 58% 58% at 58% 40%, rgba(232, 184, 116, 0.26), rgba(226,178,110,0.08) 44%, transparent 72%);
  animation: neonoir-lamp 9s ease-in-out infinite;
}

/* L2 — VENETIAN BLINDS, rebuilt: crisp warm-cored slats raking from the window's
   light, with a soft shadow gap between each — the theme's namesake, now legible.
   Two stacked repeating gradients give each slat a bright inner edge (specular
   top of the slat) fading to a soft shadow, so it reads as real dimensional
   light, not a flat smear.  Warm-tinted to match the streetlamp key. Static. */
body::before {
  content: "";
  display: var(--neo-noir-scenery, block);
  position: fixed; inset: -14%; z-index: 5; pointer-events: none;
  background:
    repeating-linear-gradient(109deg,
      rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0) 92px,
      rgba(0, 0, 0, 0.22) 104px, rgba(0, 0, 0, 0.28) 116px,
      rgba(0, 0, 0, 0) 130px, rgba(0, 0, 0, 0) 176px),
    repeating-linear-gradient(109deg,
      rgba(240, 224, 196, 0) 0px, rgba(240, 224, 196, 0) 116px,
      rgba(240, 224, 196, 0.05) 132px, rgba(248, 232, 205, 0.13) 146px,
      rgba(240, 224, 196, 0.05) 160px, rgba(240, 224, 196, 0) 176px);
  -webkit-mask-image: radial-gradient(ellipse 120% 100% at 78% 34%, #000 0%, rgba(0,0,0,0.55) 52%, rgba(0,0,0,0.18) 100%);
  mask-image: radial-gradient(ellipse 120% 100% at 78% 34%, #000 0%, rgba(0,0,0,0.55) 52%, rgba(0,0,0,0.18) 100%);
  /* Mask concentrates the light where the window is (upper-right) and lets it
     fall off across the room — the slats are brightest at the source. Static. */
}

/* L2b — SMOKE / room haze: a coarse soft volume drifting up near the window,
   plus a floor-shadow that seats the whole scene.  Static, big-and-soft (L2/L6
   safe: no fine pattern, no motion). Sits below the blinds, above the skyline. */
body::after {
  content: "";
  display: var(--neo-noir-scenery, block);
  position: fixed; inset: 0; z-index: 4; pointer-events: none;
  background:
    radial-gradient(ellipse 34% 46% at 72% 62%, rgba(150, 150, 168, 0.05), transparent 68%),
    radial-gradient(ellipse 90% 40% at 50% 108%, rgba(0, 0, 0, 0.5), transparent 70%);
}

/* L3 — film grain ON THE PRINT (the roll), not the screen (flicker root-cause
   fix: screen-fixed grain slides across eye-tracked crawling text at ~20Hz).
   Riding the roll it scrolls with the footage — grain-in-the-print fiction —
   and is STATIC: jitter hops would damage the crawl's cached texture from
   inside, and at 6% alpha static grain reads as a worn print. */
.credits-roll::before,
.credits-slideshow::before {
  content: "";
  display: var(--neo-noir-scenery, block);
  position: absolute; inset: 0; z-index: 5; pointer-events: none; opacity: 0.06;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.9  0 0 0 0 0.9  0 0 0 0 0.92  0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E") repeat;
  background-size: 300px 300px;
}

/* L3b — WET-GLINT SHEEN riding the roll: coarse (>=120px) soft warm/cold glints
   that scroll WITH the names, so they NEVER slide across the eye-tracked lane
   (L6-legal via .credits-roll::before ride-along).  A separate pseudo so it
   blends normally over the grain's low opacity — reads as stray reflections
   caught on the wet print as it crawls.  Static + coarse-soft = zero flicker. */
.credits-roll::after,
.credits-slideshow::after {
  content: "";
  display: var(--neo-noir-scenery, block);
  position: absolute; inset: 0; z-index: 5; pointer-events: none;
  background:
    radial-gradient(circle 90px at 46% 12%, rgba(226, 190, 130, 0.05), transparent 70%),
    radial-gradient(circle 130px at 60% 44%, rgba(150, 176, 214, 0.045), transparent 72%),
    radial-gradient(circle 100px at 42% 76%, rgba(226, 190, 130, 0.045), transparent 70%);
}

/* L1 — the text itself. NEVER put a transform on .credits-roll (JS owns it per frame). */
.credits-roll, .credits-slideshow { z-index: 1; }

/* ---- Dossier layout: everything types down the left rail ---- */
.credits-roll {
  align-items: flex-start;
  padding: 4.5rem 1.5rem 4.5rem var(--noir-left);
}
[data-mode="slideshow"] .credits-slide {
  align-items: flex-start;
  text-align: left;
  padding-left: var(--noir-left);
}

/* ---- Case-file section titles (small tabs; the names outrank them) ---- */
.credits-block { counter-increment: noir-case; }
.credits-slide:not(.flourish) { counter-increment: noir-case; } /* slideshow has no .credits-block wrapper */

.credits-block__title {
  color: var(--noir-ink-dim);
  letter-spacing: 0.3em;
  text-shadow: var(--credits-shadow);
  margin: 0 0 1.4rem;
}
.credits-block__title::before {
  content: "CASE " counter(noir-case, decimal-leading-zero) " / ";
  color: var(--noir-ink-faint);
}
.credits-block__title::after {
  width: 7.5rem; height: 1px;
  margin: 0.75rem 0 0; /* kill the base auto-centering */
  background: linear-gradient(to right, rgba(232, 232, 236, 0.45), rgba(232, 232, 236, 0));
  opacity: 1;
}

/* ---- Evidence ledger: name .... amount, dots only when an amount exists.
   Names are sacred: they wrap (overflow-wrap), never clip or ellipsize. ---- */
.credits-block__list { width: var(--noir-col); }
.credit { display: flex; align-items: baseline; letter-spacing: 0.02em; }
.credit__name {
  display: flex; flex: 1; min-width: 0; align-items: baseline;
  overflow-wrap: anywhere;
}
.credit__name:not(:only-child)::after { /* amount-less rows (follows/mods/VIPs) get no orphaned dots */
  content: ""; flex: 1; min-width: 2ch;
  border-bottom: 1px dotted rgba(155, 155, 164, 0.35);
  margin: 0 1ch 0.33em;
}
.credit__amount { opacity: 1; color: var(--noir-ink-faint); font-variant-numeric: tabular-nums; }
.credit__amount::before { content: ""; } /* kill the base " . " separator */

/* ---- Flourish cards: typed case-file cover + closing page ---- */
.flourish { align-items: flex-start; text-align: left; padding: 3rem 0; gap: 1.1rem; }
.flourish__title { font-weight: 400; } /* Special Elite has no bold; avoid faux-bold smear */

.flourish__badge { /* rubber stamp, not a pill — never wraps */
  font-size: 0;
  color: var(--noir-ink-dim);
  border: 1px solid rgba(155, 155, 164, 0.55);
  border-radius: 2px;
  padding: 0.5rem 1.1rem;
  /* a faint diagonal light-streak crosses the stamp (static specular = L6-safe) */
  background: linear-gradient(118deg, transparent 38%, rgba(232,232,236,0.05) 49%, transparent 60%);
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.4), 0 1px 0 rgba(232,232,236,0.06);
  transform: rotate(-1.6deg);
  white-space: nowrap;
}
.flourish__badge::after {
  content: "CASE FILE — EYES ONLY";
  display: block; white-space: nowrap;
  font-size: 0.82rem; letter-spacing: 0.3em; margin-right: -0.3em;
}

.flourish--intro .flourish__title { letter-spacing: 0.05em; } /* streamer copy: restyled, never swapped */
.flourish--intro .flourish__title::after { /* someone is typing this report */
  content: "▍"; margin-left: 0.1em; color: var(--noir-ink-dim);
  animation: neonoir-cursor 1.2s steps(1) infinite;
}
.flourish__tagline { color: var(--noir-ink-faint); font-size: 1rem; letter-spacing: 0.04em; }

.flourish__rating { font-size: 0; border-radius: 2px; opacity: 0.75; white-space: nowrap; }
.flourish__rating::after {
  content: "RATED N — FOR NOIR";
  display: block; white-space: nowrap;
  font-size: 0.8rem; letter-spacing: 0.18em; margin-right: -0.18em;
}

.flourish--outro .flourish__title { font-size: 0; }
.flourish--outro .flourish__title::after {
  content: "THE CITY SLEEPS";
  font-size: var(--credits-flourish-title-size);
  letter-spacing: 0.12em; line-height: 1.1;
  /* Rain-slick sheen baked on the hero title: a wet cold-light rim on top, a
     warm streetlamp under-glow — static specular, always L6-safe. */
  color: transparent;
  background: linear-gradient(178deg, #ffffff 0%, #e6e6ec 40%, #c7cad3 62%, #d8b483 100%);
  -webkit-background-clip: text; background-clip: text;
  text-shadow: 0 1px 0 rgba(0,0,0,0.85), 0 0 34px rgba(226,178,110,0.14);
}
.flourish--outro .flourish__tagline { font-size: 0; }
.flourish--outro .flourish__tagline::after {
  content: "case closed — thanks for watching";
  font-size: 1.05rem; letter-spacing: 0.05em; text-transform: lowercase;
}

/* ---- RAID FINALE: the only red in the city ----
   Every sibling is a <section> and the outro flourish is the true last one,
   so :nth-last-of-type(2) is the selector that actually fires in both modes. */
.credits-block:nth-last-of-type(2) { /* scroll mode: red case spine, wet-lit */
  border-left: none;
  padding-left: 1.5rem;
  position: relative;
}
/* The spine as a lit neon rail: a red core with a bright specular highlight
   running down it (static gradient = always-safe shine on a prop). */
.credits-block:nth-last-of-type(2)::before {
  content: "";
  position: absolute; left: 0; top: 0.1em; bottom: 0.1em; width: 4px;
  border-radius: 2px;
  /* the one live neon in the city: a bright specular core down a red rail */
  background: linear-gradient(90deg, rgba(255,150,170,1), rgba(224,40,72,1) 42%, rgba(140,12,30,1));
  box-shadow: 0 0 16px rgba(224, 40, 72, 0.7), 0 0 3px rgba(255,170,185,0.9);
}
.credits-block:nth-last-of-type(2) .credits-block__title,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
  color: var(--noir-red);
  /* Glow is painted ONCE (static text-shadow); the breathe is a compositor-only
     opacity pulse — animating the shadow itself repainted the whole roll layer
     every frame while the JS crawl was moving it. */
  text-shadow: 0 0 18px rgba(210, 31, 60, 0.5), 0 1px 0 rgba(0, 0, 0, 0.8);
  animation: neonoir-pulse 4.5s ease-in-out infinite;
}
.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  content: "CLOSING CASE " counter(noir-case, decimal-leading-zero) " / ";
  color: rgba(210, 31, 60, 0.7);
}
.credits-block:nth-last-of-type(2) .credits-block__title::after,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::after {
  background: linear-gradient(to right, rgba(210, 31, 60, 0.7), rgba(210, 31, 60, 0));
}
.credits-block:nth-last-of-type(2) .credit__name:not(:only-child)::after,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__name:not(:only-child)::after {
  border-bottom-color: rgba(210, 31, 60, 0.3);
}
.credits-block:nth-last-of-type(2) .credit__amount,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__amount {
  color: rgba(210, 31, 60, 0.85);
}

/* ---- Motion (budget: ZERO continuous animations on big layers — rain and the
   blind drift were cut for CPU-compositing perf; grain + cursor are steps(),
   the finale pulse cross-fades a pre-rendered static glow) ---- */
@keyframes neonoir-cursor { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
@keyframes neonoir-pulse { /* red title breathes; glow itself never repaints */
  0%, 100% { opacity: 0.72; }
  50%      { opacity: 1; }
}
/* Streetlamp key breathes — COARSE soft glow, opacity-only, off the text lane.
   The one continuous mover (budget 1, big-but-soft, will-change: opacity). */
@keyframes neonoir-lamp {
  0%, 100% { opacity: 0.72; }
  50%      { opacity: 1; }
}

/* Still night: no blink, no pulse, lamp parked visibly mid-glow (grain static). */
@media (prefers-reduced-motion: reduce) {
  .flourish--intro .flourish__title::after,
  .credits-block__title,
  head::before { animation: none !important; }
  head::before { opacity: 0.85 !important; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--neo-noir-scenery:none;}",
};
