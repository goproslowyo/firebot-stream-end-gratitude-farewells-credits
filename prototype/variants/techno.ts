import type { ThemeVariant } from "./variant";

/** PROTOTYPE — throwaway. Warehouse: Berlin-industrial techno floor meets hypnotic trance — monolithic white type in a concrete room, twin volumetric beam shafts full of dust converging on a rim-lit DJ booth under an overhead I-beam catwalk, a beat dot counting 132, and a curfew that always comes. */
export const VARIANT: ThemeVariant = {
  key: "techno",
  name: "Warehouse — Techno/Trance",
  css: `
/* ==================================================================
   WAREHOUSE — techno/trance. Layered AFTER the base stylesheet.
   Transparent collapse (one line):
   :root { --credits-bg: transparent; --techno-scenery: none; }
   Layer map (all scenery kill-switched via --techno-scenery, L7):
     html bg (--credits-bg)      concrete dark (cheap linear, L3)
     html::before                THE ROOM — one promoted static stack:
                                 raw-concrete back wall (SVG tile: form-
                                 tie dots, shutter seams, water-stains,
                                 grime), overhead I-beam catwalk + hung
                                 cables spanning the top, PA line-array
                                 stacks flanking above the booth, twin
                                 rim-lit truss towers at the edges, the
                                 trance ring crown, TWO hard volumetric
                                 beam shafts with dust banding dropping
                                 from the catwalk to the booth, low
                                 floor haze, cone floor-pools, vignette.
                                 STATIC, promoted (translateZ(0)).
     html::after                 booth HUD text, top-right. STATIC
     body::before                giant WAREHOUSE watermark, left edge
     head::before / head::after  two tiny beat dots @132 BPM (steps)
     head meta:first-of-type::before  DJ BOOTH monolith, bottom center
                                 (SVG: brushed-metal desk, glass CDJ
                                 jog wheels, lit displays, rim light,
                                 contact shadow). STATIC, promoted
     head link:first-of-type::before / ::after  two status LEDs on the
                                 booth face — steps-blinking (tiny)
   Laws honored: scenery static + promoted (L2/L3), root bg cheap (L3),
   nothing animates on body (L4), roll-internal animation is the 1Hz
   steps strobe on the finale title plus a 1 hop/s steps red wash on the
   finale block (L5), every screen-fixed feature is coarse/soft — rings,
   shafts, haze, watermark (coarse-by-size), concrete/trusses/catwalk/
   booth (coarse dark objects at edges or below the lane), vignette (L6).
   No continuous movers: every motion is stepped (beat dots, booth LEDs,
   finale strobe/wash).
   ================================================================== */
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Oswald:wght@300;400;500;600;700&display=swap');

:root {
  /* Cheap root paint (L3): the concrete mood lives on the promoted pseudo.
     Colder, harder grade — the base black is pulled a hair toward blue-steel
     so the whole room reads as a cold concrete box under white rig light. */
  --credits-bg: linear-gradient(178deg, #0b0d12 0%, #070810 50%, #030407 100%);
  --credits-color: #eef1f6;
  --credits-accent: #eef1f6;
  --credits-font: "Oswald", "Arial Narrow", "Helvetica Neue", Arial, sans-serif;
  --credits-title-font: "Archivo Black", "Arial Black", "Franklin Gothic Bold", sans-serif;
  --credits-title-size: clamp(1.5rem, 3.6vw, 2.3rem);
  --credits-name-size: clamp(1.1rem, 2.7vw, 1.65rem);
  --credits-flourish-title-size: clamp(2.6rem, 8.5vw, 5.5rem);
  --credits-block-gap: 5.25rem;
  --credits-name-gap: 0.65rem;
  --credits-shadow: 0 1px 0 rgba(0, 0, 0, 0.9);
  /* No-op glow — brutalism doesn't bloom. NEVER "none": the base composes
     "text-shadow: var(--credits-glow), var(--credits-shadow)". */
  --credits-glow: 0 0 0 rgba(0, 0, 0, 0);
  --techno-red: #ff2b2b;
  --techno-acid: #c8ff00;
  --techno-dim: rgba(236, 240, 247, 0.55);
  --techno-measure: min(38rem, 88vw);
  /* Cold key light the beams carry — a cool white with the faintest steel tint. */
  --techno-key: 232, 240, 255;
  --techno-steel: 198, 210, 230;
}

/* Scenery paints on html (unmasked, full-bleed); body keeps the base
   edge-fade so names still ease in and out of the frame. */
html { -webkit-mask-image: none; mask-image: none; }
body {
  background: transparent; /* html paints --credits-bg; no double paint */
  counter-reset: techno-floor;
}

/* THE ROOM, one PROMOTED static layer (L3), painted once, composited
   forever. Read top of stack (front) to bottom (back):
     1  corner vignette — pulls the eye to center, hides tile seams
     2  ambient occlusion — the room's dark upper corners + floor shadow
     3-4  edge truss towers (rim-lit lattice steel, SVG) pinned L / R
     5  overhead I-BEAM CATWALK + hung cables/PA spanning the top (SVG)
     6-7  two HARD BEAM SHAFTS — bright cores with defined edges (conic),
        a rig bloom where each exits the catwalk, a floor-pool where it
        lands on the booth. The two beams are ASYMMETRIC (different fan
        angle + intensity) so the crossing never reads as a valentine.
     8-9  DUST inside each shaft (striped conics riding the same axis —
        coarse soft banding, reads as motes drifting in the light)
     10 low FLOOR HAZE catching the beams (wide soft ellipse, cool)
     11 TRANCE RING crown over the titles (thin bright rings, cooler
        out — atmospheric perspective; bands >= 40px soft, L6 coarse)
     12 RAW CONCRETE back wall (SVG tile: shutter-board seams, form-tie
        dots, water-stain bleeds, grime pooling, patina mottle) — the
        lit surface behind everything, cool mid-tone
     13 base floor grade + concrete lighting gradient
   Distant/back layers are lower-contrast + cooler (atmospheric
   perspective); the beams carry the cold white key light. */
html::before {
  content: "";
  display: var(--techno-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    /* CENTER READING BAND (topmost) — a soft horizontal scrim over the vertical
       middle where names crawl, so the brightened beams read as intense light
       ABOVE and BELOW the lane but drop back behind the text where they cross it.
       Coarse + soft (>=40px, L6); knocks the beam cores down ~40% right on the
       lane without touching the dramatic upper crossing (L9 readability). */
    linear-gradient(180deg, transparent 33%, rgba(4, 5, 9, 0.42) 44%, rgba(4, 5, 9, 0.5) 50%, rgba(4, 5, 9, 0.42) 56%, transparent 67%),
    radial-gradient(ellipse 116% 94% at 50% 40%, transparent 44%, rgba(0, 0, 4, 0.52) 80%, rgba(0, 0, 3, 0.9) 100%),
    radial-gradient(ellipse 60% 30% at 50% -2%, rgba(0, 0, 4, 0.55), transparent 70%),
    radial-gradient(ellipse 42% 44% at 0% 8%, rgba(0, 0, 3, 0.6), transparent 62%),
    radial-gradient(ellipse 42% 44% at 100% 8%, rgba(0, 0, 3, 0.6), transparent 62%),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 1080' preserveAspectRatio='xMinYMid slice'%3E%3Cdefs%3E%3ClinearGradient id='t1' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23080a0f'/%3E%3Cstop offset='.42' stop-color='%23161a22'/%3E%3Cstop offset='.5' stop-color='%2320252f'/%3E%3Cstop offset='.6' stop-color='%230d1016'/%3E%3Cstop offset='1' stop-color='%23040508'/%3E%3C/linearGradient%3E%3ClinearGradient id='r1' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='rgba(150,172,214,0.02)'/%3E%3Cstop offset='.14' stop-color='rgba(168,190,232,0.5)'/%3E%3Cstop offset='.5' stop-color='rgba(150,174,220,0.42)'/%3E%3Cstop offset='.86' stop-color='rgba(120,142,188,0.28)'/%3E%3Cstop offset='1' stop-color='rgba(90,110,150,0.05)'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='34' y='0' width='30' height='1080' fill='url(%23t1)'/%3E%3Crect x='34' y='0' width='2.8' height='1080' fill='url(%23r1)'/%3E%3Crect x='61.6' y='0' width='2.4' height='1080' fill='rgba(0,0,0,0.7)'/%3E%3Crect x='96' y='0' width='30' height='1080' fill='url(%23t1)'/%3E%3Crect x='96' y='0' width='2.2' height='1080' fill='rgba(174,196,236,0.32)'/%3E%3Crect x='124' y='0' width='2' height='1080' fill='rgba(0,0,0,0.6)'/%3E%3Cg stroke='%23232a36' stroke-width='6'%3E%3Cpath d='M64 30 L96 190'/%3E%3Cpath d='M96 190 L64 350'/%3E%3Cpath d='M64 350 L96 510'/%3E%3Cpath d='M96 510 L64 670'/%3E%3Cpath d='M64 670 L96 830'/%3E%3Cpath d='M96 830 L64 990'/%3E%3Cpath d='M64 990 L96 1080'/%3E%3C/g%3E%3Cg stroke='rgba(196,214,246,0.5)' stroke-width='1.6'%3E%3Cpath d='M65 28 L97 188'/%3E%3Cpath d='M95 192 L63 352'/%3E%3Cpath d='M65 348 L97 508'/%3E%3Cpath d='M95 512 L63 672'/%3E%3Cpath d='M65 668 L97 828'/%3E%3Cpath d='M95 832 L63 992'/%3E%3C/g%3E%3Cg fill='%231d222c'%3E%3Crect x='60' y='186' width='40' height='13' rx='1.5'/%3E%3Crect x='60' y='506' width='40' height='13' rx='1.5'/%3E%3Crect x='60' y='826' width='40' height='13' rx='1.5'/%3E%3C/g%3E%3Cg fill='rgba(210,224,248,0.3)'%3E%3Crect x='60' y='186' width='40' height='2' /%3E%3Crect x='60' y='506' width='40' height='2'/%3E%3Crect x='60' y='826' width='40' height='2'/%3E%3C/g%3E%3Cg fill='rgba(150,170,206,0.5)'%3E%3Ccircle cx='45' cy='192' r='2'/%3E%3Ccircle cx='115' cy='192' r='2'/%3E%3Ccircle cx='45' cy='512' r='2'/%3E%3Ccircle cx='115' cy='512' r='2'/%3E%3Ccircle cx='45' cy='832' r='2'/%3E%3Ccircle cx='115' cy='832' r='2'/%3E%3C/g%3E%3C/svg%3E") left top / auto 100% no-repeat,
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 1080' preserveAspectRatio='xMaxYMid slice'%3E%3Cdefs%3E%3ClinearGradient id='t2' x1='1' y1='0' x2='0' y2='0'%3E%3Cstop offset='0' stop-color='%23080a0f'/%3E%3Cstop offset='.42' stop-color='%23161a22'/%3E%3Cstop offset='.5' stop-color='%2320252f'/%3E%3Cstop offset='.6' stop-color='%230d1016'/%3E%3Cstop offset='1' stop-color='%23040508'/%3E%3C/linearGradient%3E%3ClinearGradient id='r2' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='rgba(150,172,214,0.02)'/%3E%3Cstop offset='.14' stop-color='rgba(168,190,232,0.5)'/%3E%3Cstop offset='.5' stop-color='rgba(150,174,220,0.42)'/%3E%3Cstop offset='.86' stop-color='rgba(120,142,188,0.28)'/%3E%3Cstop offset='1' stop-color='rgba(90,110,150,0.05)'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='86' y='0' width='30' height='1080' fill='url(%23t2)'/%3E%3Crect x='113.2' y='0' width='2.8' height='1080' fill='url(%23r2)'/%3E%3Crect x='86' y='0' width='2.4' height='1080' fill='rgba(0,0,0,0.7)'/%3E%3Crect x='24' y='0' width='30' height='1080' fill='url(%23t2)'/%3E%3Crect x='51.8' y='0' width='2.2' height='1080' fill='rgba(174,196,236,0.32)'/%3E%3Crect x='24' y='0' width='2' height='1080' fill='rgba(0,0,0,0.6)'/%3E%3Cg stroke='%23232a36' stroke-width='6'%3E%3Cpath d='M86 30 L54 190'/%3E%3Cpath d='M54 190 L86 350'/%3E%3Cpath d='M86 350 L54 510'/%3E%3Cpath d='M54 510 L86 670'/%3E%3Cpath d='M86 670 L54 830'/%3E%3Cpath d='M54 830 L86 990'/%3E%3Cpath d='M86 990 L54 1080'/%3E%3C/g%3E%3Cg stroke='rgba(196,214,246,0.5)' stroke-width='1.6'%3E%3Cpath d='M85 28 L53 188'/%3E%3Cpath d='M55 192 L87 352'/%3E%3Cpath d='M85 348 L53 508'/%3E%3Cpath d='M55 512 L87 672'/%3E%3Cpath d='M85 668 L53 828'/%3E%3Cpath d='M55 832 L87 992'/%3E%3C/g%3E%3Cg fill='%231d222c'%3E%3Crect x='50' y='186' width='40' height='13' rx='1.5'/%3E%3Crect x='50' y='506' width='40' height='13' rx='1.5'/%3E%3Crect x='50' y='826' width='40' height='13' rx='1.5'/%3E%3C/g%3E%3Cg fill='rgba(210,224,248,0.3)'%3E%3Crect x='50' y='186' width='40' height='2'/%3E%3Crect x='50' y='506' width='40' height='2'/%3E%3Crect x='50' y='826' width='40' height='2'/%3E%3C/g%3E%3Cg fill='rgba(150,170,206,0.5)'%3E%3Ccircle cx='105' cy='192' r='2'/%3E%3Ccircle cx='35' cy='192' r='2'/%3E%3Ccircle cx='105' cy='512' r='2'/%3E%3Ccircle cx='35' cy='512' r='2'/%3E%3Ccircle cx='105' cy='832' r='2'/%3E%3Ccircle cx='35' cy='832' r='2'/%3E%3C/g%3E%3C/svg%3E") right top / auto 100% no-repeat,
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 170' preserveAspectRatio='xMidYMin slice'%3E%3Cdefs%3E%3ClinearGradient id='ib' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%232c323d'/%3E%3Cstop offset='.14' stop-color='%23191d25'/%3E%3Cstop offset='.16' stop-color='%23383f4c'/%3E%3Cstop offset='.22' stop-color='%2313161d'/%3E%3Cstop offset='.5' stop-color='%230a0c11'/%3E%3Cstop offset='.78' stop-color='%2313161d'/%3E%3Cstop offset='.84' stop-color='%23262c37'/%3E%3Cstop offset='.86' stop-color='%230f1218'/%3E%3Cstop offset='1' stop-color='%23050608'/%3E%3C/linearGradient%3E%3ClinearGradient id='pa' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23202631'/%3E%3Cstop offset='.5' stop-color='%230e1117'/%3E%3Cstop offset='1' stop-color='%23050608'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg stroke='%23060709' stroke-width='2.5' opacity='0.9'%3E%3Cpath d='M120 40 L120 170'/%3E%3Cpath d='M360 40 L360 170'/%3E%3Cpath d='M1080 40 L1080 170'/%3E%3Cpath d='M1320 40 L1320 170'/%3E%3C/g%3E%3Crect x='0' y='40' width='1440' height='58' fill='url(%23ib)'/%3E%3Crect x='0' y='40' width='1440' height='3' fill='rgba(214,226,248,0.42)'/%3E%3Crect x='0' y='95' width='1440' height='3' fill='rgba(0,0,0,0.75)'/%3E%3Cg stroke='%23050608' stroke-width='7'%3E%3Cpath d='M0 96 L120 42'/%3E%3Cpath d='M120 42 L240 96'/%3E%3Cpath d='M240 96 L360 42'/%3E%3Cpath d='M360 42 L480 96'/%3E%3Cpath d='M480 96 L600 42'/%3E%3Cpath d='M600 42 L720 96'/%3E%3Cpath d='M720 96 L840 42'/%3E%3Cpath d='M840 42 L960 96'/%3E%3Cpath d='M960 96 L1080 42'/%3E%3Cpath d='M1080 42 L1200 96'/%3E%3Cpath d='M1200 96 L1320 42'/%3E%3Cpath d='M1320 42 L1440 96'/%3E%3C/g%3E%3Cg stroke='rgba(206,220,248,0.24)' stroke-width='1.6'%3E%3Cpath d='M0 94 L120 44'/%3E%3Cpath d='M120 44 L240 94'/%3E%3Cpath d='M240 94 L360 44'/%3E%3Cpath d='M360 44 L480 94'/%3E%3Cpath d='M480 94 L600 44'/%3E%3Cpath d='M600 44 L720 94'/%3E%3Cpath d='M720 94 L840 44'/%3E%3Cpath d='M840 44 L960 94'/%3E%3Cpath d='M960 94 L1080 44'/%3E%3Cpath d='M1080 44 L1200 94'/%3E%3Cpath d='M1200 94 L1320 44'/%3E%3Cpath d='M1320 44 L1440 94'/%3E%3C/g%3E%3Cg fill='rgba(150,168,206,0.4)'%3E%3Ccircle cx='120' cy='55' r='2.5'/%3E%3Ccircle cx='120' cy='84' r='2.5'/%3E%3Ccircle cx='360' cy='55' r='2.5'/%3E%3Ccircle cx='360' cy='84' r='2.5'/%3E%3Ccircle cx='720' cy='55' r='2.5'/%3E%3Ccircle cx='720' cy='84' r='2.5'/%3E%3Ccircle cx='1080' cy='55' r='2.5'/%3E%3Ccircle cx='1080' cy='84' r='2.5'/%3E%3Ccircle cx='1320' cy='55' r='2.5'/%3E%3Ccircle cx='1320' cy='84' r='2.5'/%3E%3C/g%3E%3Cg stroke='%230a0c11' stroke-width='2.5'%3E%3Cpath d='M250 98 L250 138'/%3E%3Cpath d='M470 98 L470 126'/%3E%3Cpath d='M690 98 L690 150'/%3E%3Cpath d='M770 98 L770 132'/%3E%3Cpath d='M980 98 L980 144'/%3E%3Cpath d='M1190 98 L1190 128'/%3E%3C/g%3E%3Cg%3E%3Cpath d='M394 98 L446 98 L438 116 L402 116 Z' fill='url(%23pa)' stroke='rgba(206,220,248,0.16)' stroke-width='0.8'/%3E%3Cpath d='M402 118 L438 118 L432 134 L408 134 Z' fill='url(%23pa)' stroke='rgba(206,220,248,0.12)' stroke-width='0.8'/%3E%3Cpath d='M408 136 L432 136 L427 150 L413 150 Z' fill='url(%23pa)' stroke='rgba(206,220,248,0.1)' stroke-width='0.8'/%3E%3Cg fill='%23070809'%3E%3Cellipse cx='413' cy='106' rx='4' ry='5'/%3E%3Cellipse cx='427' cy='106' rx='4' ry='5'/%3E%3Cellipse cx='415' cy='125' rx='3.4' ry='4.4'/%3E%3Cellipse cx='425' cy='125' rx='3.4' ry='4.4'/%3E%3C/g%3E%3Crect x='396' y='99' width='48' height='1.6' fill='rgba(214,226,248,0.28)'/%3E%3C/g%3E%3Cg%3E%3Cpath d='M994 98 L1046 98 L1038 116 L1002 116 Z' fill='url(%23pa)' stroke='rgba(206,220,248,0.16)' stroke-width='0.8'/%3E%3Cpath d='M1002 118 L1038 118 L1032 134 L1008 134 Z' fill='url(%23pa)' stroke='rgba(206,220,248,0.12)' stroke-width='0.8'/%3E%3Cpath d='M1008 136 L1032 136 L1027 150 L1013 150 Z' fill='url(%23pa)' stroke='rgba(206,220,248,0.1)' stroke-width='0.8'/%3E%3Cg fill='%23070809'%3E%3Cellipse cx='1013' cy='106' rx='4' ry='5'/%3E%3Cellipse cx='1027' cy='106' rx='4' ry='5'/%3E%3Cellipse cx='1015' cy='125' rx='3.4' ry='4.4'/%3E%3Cellipse cx='1025' cy='125' rx='3.4' ry='4.4'/%3E%3C/g%3E%3Crect x='996' y='99' width='48' height='1.6' fill='rgba(214,226,248,0.28)'/%3E%3C/g%3E%3C/svg%3E") center top / 100% auto no-repeat,
    /* TWO HARD BEAM SHAFTS — bright defined cores with sharp edges, deliberately
       ASYMMETRIC: the left rig sits further out (26%) and fans WIDER + brighter;
       the right sits at 68% and is TIGHTER + dimmer. Different origins + widths
       mean they cross off-centre and never mirror into a valentine.
       Each shaft is built in THREE conic passes for real volumetric depth:
       (1) a razor HOT CENTERLINE — a near-white 1deg spike that gives the beam
       a bright hard spine instead of a gray smear; (2) the BODY — a lit cone
       with a fast ~1deg edge so the shaft has a defined boundary; (3) a soft
       OUTER FLARE hugging the body. Alphas are pushed hard so the beams read as
       cut light, not smoke. */
    conic-gradient(from 0deg at 26% -15%, transparent 149.4deg, rgba(246, 250, 255, 0.5) 150.4deg, rgba(255, 255, 255, 0.72) 151deg, rgba(246, 250, 255, 0.5) 151.6deg, transparent 152.6deg),
    conic-gradient(from 0deg at 68% -15%, transparent 206.6deg, rgba(244, 249, 255, 0.4) 207.4deg, rgba(255, 255, 255, 0.58) 207.9deg, rgba(244, 249, 255, 0.4) 208.4deg, transparent 209.2deg),
    conic-gradient(from 0deg at 26% -15%, transparent 144deg, rgba(var(--techno-key), 0.04) 145.4deg, rgba(var(--techno-key), 0.4) 147deg, rgba(var(--techno-key), 0.5) 151deg, rgba(var(--techno-key), 0.42) 155deg, rgba(var(--techno-key), 0.04) 156.6deg, transparent 158deg),
    conic-gradient(from 0deg at 68% -15%, transparent 202deg, rgba(var(--techno-key), 0.04) 203.4deg, rgba(var(--techno-key), 0.32) 205deg, rgba(var(--techno-key), 0.4) 207.5deg, rgba(var(--techno-key), 0.32) 210deg, rgba(var(--techno-key), 0.04) 211.6deg, transparent 213deg),
    /* faint outer flare hugging each core — soft falloff outside the hard edge
       (kept low so the two shafts stay distinct where they cross, not a bloom) */
    conic-gradient(from 0deg at 26% -15%, transparent 140deg, rgba(var(--techno-key), 0.06) 148deg, rgba(var(--techno-key), 0.1) 152deg, rgba(var(--techno-key), 0.06) 157deg, transparent 164deg),
    conic-gradient(from 0deg at 68% -15%, transparent 199deg, rgba(var(--techno-key), 0.05) 205deg, rgba(var(--techno-key), 0.075) 207.5deg, rgba(var(--techno-key), 0.05) 210deg, transparent 217deg),
    /* dust banding riding each shaft axis — coarse soft ticks, reads as motes
       drifting in the light. Wider + brighter than before so they actually read
       as structure inside the cone (still coarse-soft, L6). */
    conic-gradient(from 0deg at 26% -15%, transparent 146.4deg, rgba(var(--techno-steel), 0.2) 148deg, transparent 149.6deg, transparent 151.2deg, rgba(var(--techno-steel), 0.15) 152.6deg, transparent 154deg, transparent 155deg, rgba(var(--techno-steel), 0.17) 156deg, transparent 157.4deg),
    conic-gradient(from 0deg at 68% -15%, transparent 204deg, rgba(var(--techno-steel), 0.18) 205.4deg, transparent 206.8deg, transparent 208.2deg, rgba(var(--techno-steel), 0.13) 209.4deg, transparent 210.6deg, transparent 211.6deg, rgba(var(--techno-steel), 0.15) 212.6deg, transparent 213.8deg),
    /* HERO GLINT — a coarse warm-white bloom where the two shafts cross, the one
       hot node the eye lands on (>=40px soft radial, off the center text lane at
       48%/40%, L6 legal). This is the beams' shine: cut light meeting cut light. */
    radial-gradient(circle 10vmin at 48% 40%, rgba(255, 255, 255, 0.16), rgba(var(--techno-key), 0.06) 46%, transparent 72%),
    /* rig bloom where each beam exits the catwalk — hotter, tighter core */
    radial-gradient(ellipse 6.4vw 4.6vh at 26% -1%, rgba(255, 255, 255, 0.62), rgba(var(--techno-key), 0.2) 42%, transparent 70%),
    radial-gradient(ellipse 5vw 3.6vh at 68% -1%, rgba(255, 255, 255, 0.5), rgba(var(--techno-key), 0.14) 42%, transparent 70%),
    /* RIG LENS GLINTS — coarse soft star-glints on the moving-head fixtures just
       below the catwalk, the specular sparkle of stage lamps flaring toward the
       lens. Each is a tight hot dot + a soft halo, placed at the beam origins
       (26%/68%, high up, OFF the center text lane). Coarse-soft (>=40px halo),
       static (L6 legal — this is the shine on the rig, not a screen twinkle). */
    radial-gradient(circle 5vmin at 26% 8%, rgba(255, 255, 255, 0.5), rgba(var(--techno-key), 0.12) 26%, transparent 60%),
    radial-gradient(circle 4vmin at 68% 8%, rgba(255, 255, 255, 0.4), rgba(var(--techno-key), 0.1) 26%, transparent 60%),
    /* floor-pools where the beams land on the booth (left lands wider/brighter) */
    radial-gradient(ellipse 16vw 9vh at 44% 96%, rgba(var(--techno-steel), 0.22), transparent 68%),
    radial-gradient(ellipse 12vw 7.5vh at 59% 96%, rgba(var(--techno-steel), 0.15), transparent 68%),
    /* SIDE FLOOR SPLASH — cool light bouncing off the concrete at the base of
       each truss tower, so the lower-left / lower-right corners aren't dead
       black. Wide + soft (L6), well below the text lane. */
    radial-gradient(ellipse 30vw 26vh at 12% 88%, rgba(120, 142, 184, 0.1), transparent 70%),
    radial-gradient(ellipse 26vw 24vh at 88% 88%, rgba(116, 138, 180, 0.085), transparent 70%),
    /* raised the main floor grade so lit concrete reaches the mid-frame, not
       just the very bottom lip — kills the flat lower dead zone. */
    radial-gradient(ellipse 72vw 34vh at 50% 100%, rgba(140, 158, 194, 0.13), transparent 76%),
    radial-gradient(ellipse 96vw 46vh at 50% 112%, rgba(120, 140, 180, 0.09), transparent 70%),
    /* TRANCE RING crown — concentric cool rings hugging the title, the hypnotic
       halo of the trance floor. Three bands now (was two, near-invisible): a soft
       inner glow, a bright hot inner ring, and a cooler wide outer ring for
       atmospheric depth. Alphas lifted so the crown actually reads. Bands >= 40px
       soft, cooler out for atmospheric perspective (L6 coarse). */
    radial-gradient(circle 40vmin at 50% 30%, rgba(var(--techno-steel), 0.07), transparent 66%),
    radial-gradient(circle at 50% 30%, transparent 21.4vmin, rgba(var(--techno-key), 0.18) 24.6vmin, rgba(255, 255, 255, 0.26) 25.6vmin, rgba(var(--techno-key), 0.18) 26.6vmin, transparent 30vmin),
    radial-gradient(circle at 50% 30%, transparent 30.5vmin, rgba(var(--techno-steel), 0.09) 32.8vmin, rgba(var(--techno-steel), 0.12) 33.6vmin, rgba(var(--techno-steel), 0.09) 34.4vmin, transparent 37vmin),
    radial-gradient(circle at 50% 30%, transparent 39vmin, rgba(var(--techno-steel), 0.06) 42vmin, rgba(var(--techno-steel), 0.085) 42.8vmin, rgba(var(--techno-steel), 0.06) 43.6vmin, transparent 47vmin),
    /* central reading scrim — pushes the wall texture back behind the lane
       so names stay crisp; wide + soft (L6). */
    radial-gradient(ellipse 34vw 40vh at 50% 44%, rgba(4, 5, 8, 0.6), rgba(4, 5, 8, 0.28) 55%, transparent 78%),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 1000' preserveAspectRatio='xMidYMid slice'%3E%3Cdefs%3E%3ClinearGradient id='wall' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%2314181f'/%3E%3Cstop offset='.45' stop-color='%230f1218'/%3E%3Cstop offset='1' stop-color='%230a0c11'/%3E%3C/linearGradient%3E%3ClinearGradient id='stain' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='rgba(6,7,10,0.4)'/%3E%3Cstop offset='1' stop-color='rgba(6,7,10,0)'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='0' y='0' width='1200' height='1000' fill='url(%23wall)'/%3E%3Cg stroke='rgba(6,7,10,0.45)' stroke-width='2.5'%3E%3Cpath d='M0 250 L1200 250'/%3E%3Cpath d='M0 560 L1200 560'/%3E%3Cpath d='M0 820 L1200 820'/%3E%3C/g%3E%3Cg stroke='rgba(150,168,200,0.05)' stroke-width='1'%3E%3Cpath d='M0 252 L1200 252'/%3E%3Cpath d='M0 562 L1200 562'/%3E%3Cpath d='M0 822 L1200 822'/%3E%3C/g%3E%3Cg stroke='rgba(6,7,10,0.32)' stroke-width='2'%3E%3Cpath d='M300 0 L300 1000'/%3E%3Cpath d='M780 0 L780 1000'/%3E%3C/g%3E%3Cg fill='rgba(6,7,10,0.5)'%3E%3Ccircle cx='150' cy='125' r='3.5'/%3E%3Ccircle cx='620' cy='140' r='3.5'/%3E%3Ccircle cx='1020' cy='120' r='3.5'/%3E%3Ccircle cx='390' cy='400' r='3.5'/%3E%3Ccircle cx='880' cy='390' r='3.5'/%3E%3Ccircle cx='200' cy='690' r='3.5'/%3E%3Ccircle cx='700' cy='700' r='3.5'/%3E%3Ccircle cx='1080' cy='680' r='3.5'/%3E%3Ccircle cx='460' cy='910' r='3.5'/%3E%3Ccircle cx='950' cy='900' r='3.5'/%3E%3C/g%3E%3Cg fill='rgba(180,196,224,0.04)'%3E%3Ccircle cx='150' cy='122' r='1.8'/%3E%3Ccircle cx='620' cy='137' r='1.8'/%3E%3Ccircle cx='1020' cy='117' r='1.8'/%3E%3Ccircle cx='390' cy='397' r='1.8'/%3E%3Ccircle cx='880' cy='387' r='1.8'/%3E%3Ccircle cx='200' cy='687' r='1.8'/%3E%3Ccircle cx='700' cy='697' r='1.8'/%3E%3C/g%3E%3Cg fill='url(%23stain)'%3E%3Cpath d='M310 250 Q302 420 310 620 Q318 420 310 250 Z'/%3E%3Cpath d='M785 250 Q776 460 785 700 Q794 460 785 250 Z'/%3E%3Cpath d='M980 250 Q974 400 980 540 Q986 400 980 250 Z'/%3E%3Cpath d='M540 560 Q532 700 540 850 Q548 700 540 560 Z'/%3E%3C/g%3E%3Cg fill='rgba(6,7,10,0.22)'%3E%3Cpath d='M0 815 Q240 808 480 815 Q720 822 960 815 Q1100 811 1200 815 L1200 850 Q600 838 0 850 Z'/%3E%3Cellipse cx='260' cy='960' rx='220' ry='44'/%3E%3Cellipse cx='860' cy='975' rx='260' ry='40'/%3E%3C/g%3E%3Cg fill='rgba(180,196,224,0.022)'%3E%3Cellipse cx='470' cy='170' rx='150' ry='70'/%3E%3Cellipse cx='860' cy='620' rx='190' ry='90'/%3E%3Cellipse cx='170' cy='500' rx='120' ry='60'/%3E%3C/g%3E%3C/svg%3E") center top / 96vmin auto repeat,
    linear-gradient(180deg, rgba(18, 22, 30, 0.5) 0%, rgba(11, 14, 19, 0.28) 30%, rgba(6, 8, 11, 0.5) 68%, rgba(3, 4, 6, 0.85) 100%);
  transform: translateZ(0);
}

/* Editorial watermark: one giant vertical WAREHOUSE pinned to the left
   edge. Static text at 3.2% alpha — coarse by sheer size (L6), painted
   once, faded top/bottom by the body edge-mask. Out of the text lane. */
body::before {
  content: "WAREHOUSE";
  display: var(--techno-scenery, block);
  position: fixed;
  top: -1.5vh;
  left: -0.16em;
  z-index: -1;
  pointer-events: none;
  font-family: var(--credits-title-font);
  font-size: 13.5vw;
  line-height: 0.82;
  letter-spacing: -0.02em;
  white-space: nowrap;
  writing-mode: vertical-rl;
  color: rgba(224, 232, 248, 0.05);
  text-shadow: none;
  transform: translateZ(0);
}

/* Booth HUD, top-right, out of the text lane (L6b). Static text. */
html::after {
  content: "WAREHOUSE \\00b7  132 BPM \\00b7  4/4";
  display: var(--techno-scenery, block);
  position: fixed;
  top: clamp(1rem, 3.5vh, 2rem);
  right: clamp(1.2rem, 3.5vw, 2.4rem);
  z-index: 10;
  pointer-events: none;
  font: 500 0.78rem/1 var(--credits-font);
  letter-spacing: 0.34em;
  color: var(--techno-dim);
  text-shadow: var(--credits-shadow);
}

/* The beat: two tiny stacked dots left of the HUD text, stepping at
   132 BPM — the lower one ticks the offbeat at half strength. Tiny
   elements = negligible damage; the only always-running loops here. */
head { display: var(--techno-scenery, block); }
head::before {
  content: "";
  display: var(--techno-scenery, block);
  position: fixed;
  top: clamp(0.95rem, 3.4vh, 1.95rem);
  right: calc(clamp(1.2rem, 3.5vw, 2.4rem) + 15.4rem);
  width: 9px;
  height: 9px;
  z-index: 10;
  pointer-events: none;
  background: var(--techno-acid);
  box-shadow: 0 0 9px rgba(200, 255, 0, 0.55);
  animation: techno-beat 0.4545s steps(1, end) infinite;
}
head::after {
  content: "";
  display: var(--techno-scenery, block);
  position: fixed;
  top: calc(clamp(0.95rem, 3.4vh, 1.95rem) + 1.05rem);
  right: calc(clamp(1.2rem, 3.5vw, 2.4rem) + 15.4rem + 1.5px);
  width: 6px;
  height: 6px;
  z-index: 10;
  pointer-events: none;
  background: rgba(200, 255, 0, 0.5);
  animation: techno-beat 0.4545s steps(1, end) infinite;
  animation-delay: -0.227s;
}

/* THE BOOTH: a coarse dark monolith at bottom center below the lane.
   Rebuilt with material distinction — a brushed-metal angled desk with
   a bright top rim catching the converging beams, ambient-occlusion
   under-shadow, two glass CDJ jog wheels (radial specular + platter
   ring) with a lit pitch strip, a channel mixer with fader posts and a
   glowing meter, side rack panels, cable drops, and a hard contact
   shadow grounding it to the floor. Rides on a head void-element pseudo
   so the body edge-mask never fades it (L6: coarse dark object, names
   crawl OVER it into the bottom fade). STATIC, promoted. */
head meta:first-of-type { display: var(--techno-scenery, block); }
head meta:first-of-type::before {
  content: "";
  display: var(--techno-scenery, block);
  position: fixed;
  left: 50%;
  bottom: 0;
  width: min(640px, 94vw);
  height: 232px;
  z-index: -1;
  pointer-events: none;
  transform: translate(-50%, 0) translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 210'%3E%3Cdefs%3E%3ClinearGradient id='desk' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%232a2f39'/%3E%3Cstop offset='.06' stop-color='%23191d25'/%3E%3Cstop offset='.5' stop-color='%230d0f14'/%3E%3Cstop offset='1' stop-color='%23050506'/%3E%3C/linearGradient%3E%3ClinearGradient id='lip' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23343b47'/%3E%3Cstop offset='.5' stop-color='%231a1e26'/%3E%3Cstop offset='1' stop-color='%230a0c10'/%3E%3C/linearGradient%3E%3ClinearGradient id='body' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23181c23'/%3E%3Cstop offset='.5' stop-color='%230f1218'/%3E%3Cstop offset='1' stop-color='%23090b10'/%3E%3C/linearGradient%3E%3CradialGradient id='key' cx='50%25' cy='30%25' r='64%25'%3E%3Cstop offset='0' stop-color='%23eef4ff' stop-opacity='.26'/%3E%3Cstop offset='.5' stop-color='%23dce8ff' stop-opacity='.08'/%3E%3Cstop offset='1' stop-color='%23dce8ff' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='platter' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0' stop-color='%23252a32'/%3E%3Cstop offset='.62' stop-color='%2316191f'/%3E%3Cstop offset='.82' stop-color='%232d333d'/%3E%3Cstop offset='1' stop-color='%230a0c10'/%3E%3C/radialGradient%3E%3CradialGradient id='glass' cx='40%25' cy='34%25' r='70%25'%3E%3Cstop offset='0' stop-color='%2330363f'/%3E%3Cstop offset='.55' stop-color='%2312151a'/%3E%3Cstop offset='1' stop-color='%23060708'/%3E%3C/radialGradient%3E%3ClinearGradient id='gleam' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23ffffff' stop-opacity='.85'/%3E%3Cstop offset='.4' stop-color='%23ffffff' stop-opacity='.14'/%3E%3Cstop offset='1' stop-color='%23ffffff' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cellipse cx='300' cy='64' rx='330' ry='50' fill='url(%23key)'/%3E%3Cellipse cx='300' cy='205' rx='280' ry='9' fill='%23000000' opacity='.75'/%3E%3Cpath d='M540 116 Q560 158 548 204' stroke='%230d0d11' stroke-width='4.5' fill='none' stroke-linecap='round'/%3E%3Cpath d='M60 116 Q42 156 54 202' stroke='%230b0b0f' stroke-width='4' fill='none' stroke-linecap='round'/%3E%3Cg%3E%3Crect x='92' y='34' width='120' height='48' rx='6' fill='url(%23body)' stroke='rgba(210,220,238,0.12)' stroke-width='1'/%3E%3Crect x='92' y='34' width='120' height='2.4' rx='1' fill='rgba(224,234,252,0.34)'/%3E%3Crect x='100' y='40' width='40' height='15' rx='2' fill='%23070a0d' stroke='rgba(200,255,0,0.22)' stroke-width='0.8'/%3E%3Cpolyline points='103,50 108,44 112,52 116,42 120,51 124,46 128,53 132,45 136,50' fill='none' stroke='rgba(200,255,0,0.7)' stroke-width='1.1'/%3E%3Crect x='100' y='60' width='40' height='16' rx='2' fill='%230a0d10'/%3E%3Cg fill='rgba(120,170,255,0.5)'%3E%3Crect x='103' y='63' width='7' height='4.5' rx='1'/%3E%3Crect x='112' y='63' width='7' height='4.5' rx='1'/%3E%3Crect x='121' y='63' width='7' height='4.5' rx='1'/%3E%3Crect x='130' y='63' width='7' height='4.5' rx='1'/%3E%3Crect x='103' y='69.5' width='7' height='4.5' rx='1'/%3E%3Crect x='112' y='69.5' width='7' height='4.5' rx='1' fill='rgba(200,255,0,0.6)'/%3E%3Crect x='121' y='69.5' width='7' height='4.5' rx='1'/%3E%3Crect x='130' y='69.5' width='7' height='4.5' rx='1'/%3E%3C/g%3E%3Ccircle cx='176' cy='58' r='19' fill='url(%23platter)' stroke='%23050608' stroke-width='1.5'/%3E%3Ccircle cx='176' cy='58' r='19' fill='none' stroke='rgba(214,224,242,0.22)' stroke-width='0.8'/%3E%3Ccircle cx='176' cy='58' r='13.5' fill='url(%23glass)'/%3E%3Ccircle cx='176' cy='58' r='13.5' fill='none' stroke='rgba(206,216,236,0.16)' stroke-width='0.8'/%3E%3Cpath d='M167 49 A13.5 13.5 0 0 1 185 51' fill='none' stroke='url(%23gleam)' stroke-width='3' stroke-linecap='round'/%3E%3Ccircle cx='176' cy='58' r='7' fill='none' stroke='rgba(206,216,236,0.2)' stroke-width='0.8'/%3E%3Ccircle cx='176' cy='58' r='3' fill='%2316191f' stroke='rgba(214,224,242,0.3)' stroke-width='0.7'/%3E%3Ccircle cx='176' cy='58' r='1.4' fill='rgba(200,255,0,0.85)'/%3E%3Cline x1='176' y1='45' x2='176' y2='49' stroke='rgba(255,80,80,0.8)' stroke-width='1.4'/%3E%3Crect x='202' y='40' width='4' height='34' rx='2' fill='%230a0d10' stroke='rgba(206,216,236,0.14)' stroke-width='0.6'/%3E%3Crect x='201' y='54' width='6' height='4' rx='1' fill='rgba(224,234,252,0.75)'/%3E%3C/g%3E%3Cg transform='translate(296,0)'%3E%3Crect x='92' y='34' width='120' height='48' rx='6' fill='url(%23body)' stroke='rgba(210,220,238,0.12)' stroke-width='1'/%3E%3Crect x='92' y='34' width='120' height='2.4' rx='1' fill='rgba(224,234,252,0.34)'/%3E%3Crect x='100' y='40' width='40' height='15' rx='2' fill='%23070a0d' stroke='rgba(200,255,0,0.22)' stroke-width='0.8'/%3E%3Cpolyline points='103,49 107,45 111,51 115,43 119,50 123,47 127,52 131,44 136,49' fill='none' stroke='rgba(200,255,0,0.7)' stroke-width='1.1'/%3E%3Crect x='100' y='60' width='40' height='16' rx='2' fill='%230a0d10'/%3E%3Cg fill='rgba(120,170,255,0.5)'%3E%3Crect x='103' y='63' width='7' height='4.5' rx='1'/%3E%3Crect x='112' y='63' width='7' height='4.5' rx='1' fill='rgba(200,255,0,0.6)'/%3E%3Crect x='121' y='63' width='7' height='4.5' rx='1'/%3E%3Crect x='130' y='63' width='7' height='4.5' rx='1'/%3E%3Crect x='103' y='69.5' width='7' height='4.5' rx='1'/%3E%3Crect x='112' y='69.5' width='7' height='4.5' rx='1'/%3E%3Crect x='121' y='69.5' width='7' height='4.5' rx='1'/%3E%3Crect x='130' y='69.5' width='7' height='4.5' rx='1'/%3E%3C/g%3E%3Ccircle cx='176' cy='58' r='19' fill='url(%23platter)' stroke='%23050608' stroke-width='1.5'/%3E%3Ccircle cx='176' cy='58' r='19' fill='none' stroke='rgba(214,224,242,0.22)' stroke-width='0.8'/%3E%3Ccircle cx='176' cy='58' r='13.5' fill='url(%23glass)'/%3E%3Ccircle cx='176' cy='58' r='13.5' fill='none' stroke='rgba(206,216,236,0.16)' stroke-width='0.8'/%3E%3Cpath d='M167 49 A13.5 13.5 0 0 1 185 51' fill='none' stroke='url(%23gleam)' stroke-width='3' stroke-linecap='round'/%3E%3Ccircle cx='176' cy='58' r='7' fill='none' stroke='rgba(206,216,236,0.2)' stroke-width='0.8'/%3E%3Ccircle cx='176' cy='58' r='3' fill='%2316191f' stroke='rgba(214,224,242,0.3)' stroke-width='0.7'/%3E%3Ccircle cx='176' cy='58' r='1.4' fill='rgba(200,255,0,0.85)'/%3E%3Cline x1='176' y1='45' x2='176' y2='49' stroke='rgba(255,80,80,0.8)' stroke-width='1.4'/%3E%3Crect x='202' y='40' width='4' height='34' rx='2' fill='%230a0d10' stroke='rgba(206,216,236,0.14)' stroke-width='0.6'/%3E%3Crect x='201' y='58' width='6' height='4' rx='1' fill='rgba(224,234,252,0.75)'/%3E%3C/g%3E%3Cg%3E%3Crect x='248' y='32' width='104' height='50' rx='5' fill='url(%23body)' stroke='rgba(210,220,238,0.12)' stroke-width='1'/%3E%3Crect x='248' y='32' width='104' height='2.2' rx='1' fill='rgba(224,234,252,0.3)'/%3E%3Cg fill='%230a0d11' stroke='rgba(206,216,236,0.16)' stroke-width='0.7'%3E%3Ccircle cx='262' cy='44' r='4.6'/%3E%3Ccircle cx='280' cy='44' r='4.6'/%3E%3Ccircle cx='320' cy='44' r='4.6'/%3E%3Ccircle cx='338' cy='44' r='4.6'/%3E%3C/g%3E%3Cg stroke='rgba(224,234,252,0.6)' stroke-width='1'%3E%3Cline x1='262' y1='44' x2='262' y2='40'/%3E%3Cline x1='280' y1='44' x2='283' y2='41'/%3E%3Cline x1='320' y1='44' x2='318' y2='40.5'/%3E%3Cline x1='338' y1='44' x2='340' y2='41'/%3E%3C/g%3E%3Crect x='296' y='38' width='8' height='13' rx='1.5' fill='%23070a0d'/%3E%3Cg fill='rgba(200,255,0,0.85)'%3E%3Crect x='297.5' y='39' width='5' height='1.6'/%3E%3Crect x='297.5' y='41.4' width='5' height='1.6'/%3E%3Crect x='297.5' y='43.8' width='5' height='1.6' fill='rgba(255,190,0,0.85)'/%3E%3Crect x='297.5' y='46.2' width='5' height='1.6' fill='rgba(255,70,70,0.85)'/%3E%3C/g%3E%3Cg stroke='rgba(210,220,238,0.16)' stroke-width='3.4'%3E%3Cpath d='M264 56 L264 76'/%3E%3Cpath d='M282 56 L282 76'/%3E%3Cpath d='M300 56 L300 76'/%3E%3Cpath d='M318 56 L318 76'/%3E%3Cpath d='M336 56 L336 76'/%3E%3C/g%3E%3Cg fill='rgba(238,244,255,0.9)' stroke='rgba(0,0,0,0.5)' stroke-width='0.5'%3E%3Crect x='261' y='67' width='6' height='4' rx='1'/%3E%3Crect x='279' y='61' width='6' height='4' rx='1'/%3E%3Crect x='297' y='69' width='6' height='4' rx='1'/%3E%3Crect x='315' y='58' width='6' height='4' rx='1'/%3E%3Crect x='333' y='64' width='6' height='4' rx='1'/%3E%3C/g%3E%3C/g%3E%3Cpath d='M54 82 L546 82 L572 200 L28 200 Z' fill='url(%23desk)'/%3E%3Cpath d='M54 82 L546 82 L560 146 L40 146 Z' fill='url(%23key)' opacity='.7'/%3E%3Cpath d='M54 82 L546 82 L548 90 L52 90 Z' fill='rgba(232,240,255,0.14)'/%3E%3Cpath d='M54 82 L546 82' stroke='rgba(244,249,255,0.72)' stroke-width='3' stroke-linecap='round'/%3E%3Cpath d='M170 82 L430 82' stroke='rgba(255,255,255,0.92)' stroke-width='1.6' stroke-linecap='round'/%3E%3Cpath d='M54 85 L546 85' stroke='rgba(0,0,0,0.6)' stroke-width='1.4'/%3E%3Cg stroke='rgba(232,240,255,0.05)' stroke-width='1'%3E%3Cpath d='M48 104 L552 104'/%3E%3Cpath d='M44 122 L556 122'/%3E%3Cpath d='M40 140 L560 140'/%3E%3Cpath d='M36 158 L564 158'/%3E%3Cpath d='M32 176 L568 176'/%3E%3C/g%3E%3Cpath d='M54 82 L28 200' stroke='rgba(232,240,255,0.05)' stroke-width='1.5'/%3E%3Cpath d='M546 82 L572 200' stroke='rgba(232,240,255,0.16)' stroke-width='1.5'/%3E%3Cpath d='M300 82 L300 200' stroke='rgba(0,0,0,0.32)' stroke-width='1'/%3E%3Cpath d='M28 200 L572 200 L568 208 L32 208 Z' fill='url(%23lip)'/%3E%3Cpath d='M28 200 L572 200' stroke='rgba(244,249,255,0.5)' stroke-width='1.4'/%3E%3C/svg%3E") center bottom / contain no-repeat;
}

/* Booth status LEDs: two tiny lights low on the desk face — the green
   limiter ticks at half-time, the red REC lamp breathes slow. Tiny
   elements on steps(1) — negligible paint, the booth is alive. */
head link:first-of-type { display: var(--techno-scenery, block); }
head link:first-of-type::before {
  content: "";
  display: var(--techno-scenery, block);
  position: fixed;
  left: calc(50% - 22px);
  bottom: 55px;
  width: 6px;
  height: 6px;
  z-index: -1;
  pointer-events: none;
  background: var(--techno-acid);
  box-shadow: 0 0 8px rgba(200, 255, 0, 0.6);
  animation: techno-beat 0.909s steps(1, end) infinite;
}
head link:first-of-type::after {
  content: "";
  display: var(--techno-scenery, block);
  position: fixed;
  left: calc(50% + 16px);
  bottom: 55px;
  width: 6px;
  height: 6px;
  z-index: -1;
  pointer-events: none;
  background: rgba(255, 43, 43, 0.9);
  box-shadow: 0 0 8px rgba(255, 43, 43, 0.55);
  animation: techno-rec 2s steps(1, end) infinite;
}

/* --- Titles: monolithic uppercase with a floor counter ------------- */
.credits-block,
.credits-slide:not(.flourish) { counter-increment: techno-floor; }

.credits-block__title {
  font-family: var(--credits-title-font);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #f4f6fa;
  /* Crisp monolithic emboss: a hair of top light, a hard black seat. */
  text-shadow: 0 -1px 0 rgba(236, 244, 255, 0.14), 0 1px 0 rgba(0, 0, 0, 0.9), 0 3px 10px rgba(0, 0, 0, 0.55);
  margin: 0 0 1.3rem;
}
.credits-block__title::before {
  content: "FLOOR " counter(techno-floor, decimal-leading-zero) " / ";
  color: var(--techno-dim);
  letter-spacing: 0.09em;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.9);
}
/* Base gold rule -> a machined metal bar with a 1px acid top edge and a
   specular sheen: a bright top face falling to a shadowed underside, plus a
   soft acid bloom under the edge — the bar reads as polished, lit metal. */
.credits-block__title::after {
  width: 3.5rem;
  height: 4px;
  margin: 0.8rem auto 0;
  border-top: 1px solid var(--techno-acid);
  background: linear-gradient(180deg, #ffffff 0%, rgba(244, 246, 250, 0.95) 45%, rgba(150, 158, 172, 0.85) 100%);
  box-shadow: 0 0 10px rgba(200, 255, 0, 0.28), 0 1px 2px rgba(0, 0, 0, 0.6);
  opacity: 1;
}

/* --- Rows: condensed grid, bracketed amounts ----------------------- */
.credits-block__list {
  width: var(--techno-measure);
  margin-inline: auto;
}
.credit {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.8ch;
  letter-spacing: 0.04em;
  line-height: 1.55;
}
.credit__name {
  min-width: 0;
  overflow-wrap: anywhere; /* names are sacred: wrap, never clip */
  font-weight: 500;
}
.credit__amount {
  opacity: 1;
  color: var(--techno-dim);
  font-variant-numeric: tabular-nums;
}
.credit__amount::before { content: "[ "; }
.credit__amount::after { content: " ]"; }

/* --- Intro flourish: lineup card. Rhythm is grouped, not metered —
   badge sits off the title, title+tagline lock tight as one unit, the
   warning chip and door times hang below at a distance. ------------- */
.flourish { gap: 1.85rem; }
.flourish--intro { gap: 1.15rem; }
.flourish__title {
  font-family: var(--credits-title-font);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1.04;
  color: #f4f6fa;
  text-shadow: 0 -1px 0 rgba(236, 244, 255, 0.15), 0 2px 0 rgba(0, 0, 0, 0.9), 0 6px 22px rgba(0, 0, 0, 0.5);
}
.flourish--intro .flourish__badge { margin-bottom: 0.75rem; }
.flourish--intro .flourish__rating { margin-top: 1.3rem; }
/* door times: designed fine print anchoring the card (theme fiction) */
.flourish--intro::after {
  content: "DOORS 23:59 \\00b7  CURFEW 06:00 \\00b7  NO CAMERAS ON THE FLOOR";
  display: var(--techno-scenery, block);
  font: 500 0.68rem/1 var(--credits-font);
  letter-spacing: 0.3em;
  padding-left: 0.3em;
  color: rgba(238, 240, 243, 0.38);
  text-shadow: var(--credits-shadow);
}
.flourish__tagline {
  font-style: normal;
  text-transform: uppercase;
  letter-spacing: 0.44em;
  text-indent: 0.44em; /* balance trailing letter-space; keeps optical center */
  font-size: 0.9rem;
  color: var(--techno-dim);
}
.flourish__badge {
  font-size: 0;
  border: 2px solid #f2f2f2;
  border-radius: 0;
  padding: 0.6rem 1.5rem;
  margin-bottom: 0.35rem;
  box-shadow: none;
  color: #f2f2f2;
}
.flourish__badge::after {
  content: "WAREHOUSE — CLOSING SET";
  font-size: 0.85rem;
  letter-spacing: 0.32em;
  margin-right: -0.32em;
  white-space: nowrap; /* theme copy, never mid-phrase wrapped */
}
.flourish__rating {
  font-size: 0;
  border: 1px solid var(--techno-dim);
  border-radius: 0;
  margin-top: 0.5rem;
  color: var(--techno-dim);
}
.flourish__rating::after {
  content: "STROBE WARNING \\00b7  132 BPM";
  font-size: 0.8rem;
  letter-spacing: 0.22em;
  margin-right: -0.22em;
  white-space: nowrap;
}

/* --- Outro: curfew -------------------------------------------------- */
.flourish--outro .flourish__title { font-size: 0; }
/* Echo the section-title rule above CURFEW: same bar, same acid edge. */
.flourish--outro .flourish__title::before {
  content: "";
  display: block;
  width: 3.5rem;
  height: 4px;
  margin: 0 auto 1.7rem;
  border-top: 1px solid var(--techno-acid);
  background: rgba(244, 246, 250, 0.92);
}
.flourish--outro .flourish__title::after {
  content: "CURFEW";
  font-size: var(--credits-flourish-title-size);
  letter-spacing: 0.14em;
}
.flourish--outro .flourish__tagline { font-size: 0; text-indent: 0; }
.flourish--outro .flourish__tagline::after {
  content: "THE FLOOR NEVER LIES — 06:00";
  font-size: 0.95rem;
  letter-spacing: 0.3em;
  margin-right: -0.3em;
  white-space: nowrap;
}

/* --- Raid finale: final transmission, red strobe (L5: steps, 1Hz) --- */
.credits-block:nth-last-of-type(2),
.credits-slide:nth-last-of-type(2):not(.flourish) { position: relative; }
/* The room answers the alarm: a coarse red edge-wash centred on the
   finale block, pulsing opacity at 1 hop/s via steps(1) (L5 legal —
   composited opacity, no repaints; big soft gradient — L6 fine). Sides
   overshoot the viewport and a vertical mask fades the top/bottom, so
   the element edge never draws a seam on screen. */
.credits-block:nth-last-of-type(2)::before,
.credits-slide:nth-last-of-type(2):not(.flourish)::before {
  content: "";
  display: var(--techno-scenery, block);
  position: absolute;
  left: 50%;
  top: 50%;
  width: 112vw;
  height: 170vh;
  z-index: -1;
  pointer-events: none;
  background: radial-gradient(ellipse 52% 40% at 50% 50%, transparent 30%, rgba(255, 43, 43, 0.09) 54%, rgba(255, 43, 43, 0.2) 78%, rgba(255, 30, 30, 0.36) 100%);
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 26%, #000 74%, transparent 100%);
  mask-image: linear-gradient(180deg, transparent 0%, #000 26%, #000 74%, transparent 100%);
  transform: translate(-50%, -50%);
  animation: techno-redwash 2s steps(1, end) infinite;
}
.credits-block:nth-last-of-type(2) .credits-block__title,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
  color: var(--techno-red);
  animation: techno-strobe 1s steps(1, end) infinite;
}
.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  content: "FINAL TRANSMISSION / ";
  color: var(--techno-red);
}
.credits-block:nth-last-of-type(2) .credits-block__title::after,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::after {
  width: 9rem;
  height: 8px;
  border-top: 0;
  background: repeating-linear-gradient(45deg, var(--techno-acid) 0 10px, #0a0a0b 10px 20px);
  opacity: 1;
}
.credits-block:nth-last-of-type(2) .credit,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit {
  font-size: calc(var(--credits-name-size) * 1.08);
}
/* the red reaches the names too — a static warm rim, no extra motion */
.credits-block:nth-last-of-type(2) .credit__name,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__name {
  text-shadow: 0 0 18px rgba(255, 43, 43, 0.32), var(--credits-shadow);
}
.credits-block:nth-last-of-type(2) .credit__amount,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__amount {
  color: rgba(255, 120, 120, 0.75);
}

/* --- Slideshow: hard industrial cut --------------------------------- */
.credits-slide { transition: opacity 0.25s linear; }

@keyframes techno-beat {
  0%, 45% { opacity: 1; }
  46%, 100% { opacity: 0.15; }
}
@keyframes techno-strobe {
  0%, 62% { opacity: 1; }
  63%, 100% { opacity: 0.55; }
}
@keyframes techno-redwash {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0.55; }
}
@keyframes techno-rec {
  0%, 70% { opacity: 1; }
  71%, 100% { opacity: 0.25; }
}

/* Lights up, strobe off, beat + booth LEDs hold steady lit, red wash
   freezes lit. */
@media (prefers-reduced-motion: reduce) {
  head::before,
  head::after,
  head link:first-of-type::before,
  head link:first-of-type::after,
  .credits-block:nth-last-of-type(2)::before,
  .credits-slide:nth-last-of-type(2):not(.flourish)::before,
  .credits-block:nth-last-of-type(2) .credits-block__title,
  .credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
    animation: none;
  }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--techno-scenery:none;}",
};
