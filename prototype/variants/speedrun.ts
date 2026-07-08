import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. PB Splits: the stream was a run and the credits are the splits — a dark timer app on PB pace, viewers as segments, amounts as green deltas, and one gold WORLD RECORD flood before the timer stops. */
export const VARIANT: ThemeVariant = {
  key: "speedrun",
  name: "PB Splits",
  css: `
@import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@500;600;700;800&family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Rajdhani:wght@500;600;700&display=swap');
/* ================================================================
   PB SPLITS — layered after the base theme.
   Fiction: the stream WAS the run. A dark speedrun-timer app fills
   the frame: the RTA clock burns green in the top-right (colons
   blinking on the half-second), the attempt counter and its shameful
   reset tally sit top-left, a segment-pace graph hums bottom-left,
   sum-of-best and the rival's WR park bottom-right, and a thin
   run-progress strip rides the bottom edge with a gold marker at
   87% done. Every credit block is a SPLIT: header bar with a game
   icon and a delta tag, rows as segments — viewer left, dotted
   leader, amount right styled as a timing delta. Split accents
   cycle AHEAD-green / GOLD-split / BEHIND-red. The raid finale goes
   NEW WORLD RECORD under a breathing gold flood, and the run ends
   on "thanks for watching the grind".
   Layer map (all scenery kill-switched via --speedrun-scenery):
     html bg (--credits-bg)   near-black app desktop (1 radial + 1 linear)
     html::before             THE APP WINDOW — header band, footer band,
                              center lane scrim, gold PB bloom top-right,
                              green pace seep at the floor, corner
                              vignette. STATIC, promoted
     html::after              run-progress strip on the bottom edge:
                              green bar to a gold marker at 87%. STATIC
     body::before             SEGMENT PACE graph panel, bottom-left —
                              SVG: axis, WR dashline, green pace line,
                              one red dip, gold end dot. STATIC, promoted
     body::after              SUM OF BEST / WR chip, bottom-right. STATIC
     head::before             THE TIMER — chip body + static digits
                              "3 57 41.2" (colons live on the twin layer)
     head::after              colon twin — same box, same mono metrics,
                              only ":  :" — steps() blink at 1Hz
     meta#1::before           ATTEMPT #1,247 chip, top-left. STATIC
     meta#1::after            PB PACE -4.8s gold pill under the timer —
                              steps() breath (~0.4 paints/s)
     meta#2::before           RESETS 1,246 tally in behind-red. STATIC
     meta#2::after            the WR crown, tipped on the timer chip's
                              shoulder — gold SVG, rim light, gem row,
                              cast shadow onto the chip. STATIC
   In-roll: split panels, row separators and dotted leaders all RIDE
   THE ROLL (L6); the only in-roll animation is the finale's gold
   flood at ~0.9 paints/s (L5).
   ================================================================ */

:root {
  /* ── palette: LiveSplit after midnight ── */
  --speedrun-scenery: block; /* set to none to strip every scenery layer */
  --spd-green: #3ddc68;
  --spd-green-hot: #6ef59a;
  --spd-gold: #ffd75e;
  --spd-red: #ff5d6c;
  --spd-silver: #e8edf7;
  --spd-dim: #8a94ac;
  --spd-line: rgba(70, 80, 104, 0.55);

  /* ── base hooks ── */
  /* cheap desktop: one faint gold breath where the timer lives + a
     5-stop slate fall to black (L3: the app chrome lives on the
     promoted html::before) */
  --credits-bg:
    radial-gradient(ellipse 42% 30% at 88% 0%, rgba(255, 215, 94, 0.05), rgba(255, 215, 94, 0) 70%),
    linear-gradient(180deg, #07090d 0%, #0b0e15 28%, #0d1119 52%, #0a0d13 78%, #05070b 100%);
  --credits-color: var(--spd-silver);
  --credits-accent: var(--spd-green);
  --credits-font: "Rajdhani", "Avenir Next Condensed", "Arial Narrow", sans-serif;
  --credits-title-font: "Oxanium", "Trebuchet MS", Verdana, sans-serif;
  --credits-title-size: clamp(1rem, 2.3vw, 1.3rem);
  --credits-name-size: clamp(1.05rem, 2.5vw, 1.5rem);
  --credits-flourish-title-size: clamp(2.2rem, 6.6vw, 4.4rem);
  --credits-block-gap: 3.6rem;
  --credits-name-gap: 0;
  --credits-shadow: 0 1px 6px rgba(2, 4, 8, 0.7);
  /* glow no-op — never "none" (a "none" in the composed shadow list
     invalidates the whole declaration); PB Splits glows are bespoke. */
  --credits-glow: 0 0 0 rgba(0, 0, 0, 0);
  --spd-mono: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  --spd-panel-w: min(33rem, 92vw);
}

/* Scenery is full-bleed: html drops the base edge-fade; body keeps the
   base mask so segments still ease in at the floor and out at the top. */
html { -webkit-mask-image: none; mask-image: none; }
body { background: transparent; counter-reset: speedrun-split; }

/* ═══ THE APP WINDOW — one static promoted layer (L3). Header band up
   top (the chips dock into it), footer band at the floor, a soft dark
   scrim down the center lane so silver names never fight the desktop,
   a gold bloom where the PB clock burns, green pace light seeping up
   from the progress strip, and a vignette to swallow the corners.
   Everything huge and soft — nothing here can flicker against glyphs. */
html::before {
  content: "";
  display: var(--speedrun-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* INPUT DISPLAY — the runner's key viewer docked into the left widget
       column: a WASD cluster of machined keycaps, W held (lit ahead-green
       with a phosphor bloom), the rest resting slate. One static SVG prop,
       corner-parked, off the lane. */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 92'%3E%3Cdefs%3E%3ClinearGradient id='k' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23262e3c'/%3E%3Cstop offset='.5' stop-color='%23181e29'/%3E%3Cstop offset='1' stop-color='%230e1219'/%3E%3C/linearGradient%3E%3ClinearGradient id='kg' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%232c5a3c'/%3E%3Cstop offset='.5' stop-color='%231d4a2e'/%3E%3Cstop offset='1' stop-color='%23113322'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='64' cy='24' r='22' fill='%233ddc68' opacity='.14'/%3E%3Cg%3E%3Crect x='48' y='8' width='32' height='32' rx='6' fill='url(%23kg)' stroke='%233ddc68' stroke-opacity='.75' stroke-width='1.4'/%3E%3Crect x='50' y='9.5' width='28' height='3' rx='1.5' fill='%236ef59a' opacity='.3'/%3E%3Ctext x='64' y='30' text-anchor='middle' font-family='Arial,Helvetica,sans-serif' font-weight='bold' font-size='15' fill='%23b6ffce'%3EW%3C/text%3E%3C/g%3E%3Cg%3E%3Crect x='10' y='48' width='32' height='32' rx='6' fill='url(%23k)' stroke='%23343e4e' stroke-width='1.2'/%3E%3Crect x='12' y='49.5' width='28' height='3' rx='1.5' fill='%23ffffff' opacity='.08'/%3E%3Ctext x='26' y='70' text-anchor='middle' font-family='Arial,Helvetica,sans-serif' font-weight='bold' font-size='15' fill='%238a94ac'%3EA%3C/text%3E%3C/g%3E%3Cg%3E%3Crect x='48' y='48' width='32' height='32' rx='6' fill='url(%23k)' stroke='%23343e4e' stroke-width='1.2'/%3E%3Crect x='50' y='49.5' width='28' height='3' rx='1.5' fill='%23ffffff' opacity='.08'/%3E%3Ctext x='64' y='70' text-anchor='middle' font-family='Arial,Helvetica,sans-serif' font-weight='bold' font-size='15' fill='%238a94ac'%3ES%3C/text%3E%3C/g%3E%3Cg%3E%3Crect x='86' y='48' width='32' height='32' rx='6' fill='url(%23k)' stroke='%23343e4e' stroke-width='1.2'/%3E%3Crect x='88' y='49.5' width='28' height='3' rx='1.5' fill='%23ffffff' opacity='.08'/%3E%3Ctext x='102' y='70' text-anchor='middle' font-family='Arial,Helvetica,sans-serif' font-weight='bold' font-size='15' fill='%238a94ac'%3ED%3C/text%3E%3C/g%3E%3Ctext x='64' y='90' text-anchor='middle' font-family='Arial,Helvetica,sans-serif' font-size='7' letter-spacing='3' fill='%235a6478'%3EINPUT%3C/text%3E%3C/svg%3E") left calc(1.5vw + 60px) top 60vh / 128px 92px no-repeat,
    /* corner vignette — warmed a hair toward slate-blue so corners read as
       a lit desktop falling to black, not flat crush */
    radial-gradient(ellipse 138% 118% at 50% 40%, rgba(3, 5, 9, 0) 55%, rgba(2, 3, 6, 0.4) 82%, rgba(1, 2, 4, 0.66) 100%),
    /* gold PB bloom behind the timer chip */
    radial-gradient(ellipse 30vw 20vh at 90% 2%, rgba(255, 215, 94, 0.10), rgba(255, 215, 94, 0) 70%),
    /* green pace light off the progress strip */
    radial-gradient(ellipse 52vw 12vh at 50% 103%, rgba(61, 220, 104, 0.09), rgba(61, 220, 104, 0) 74%),
    /* UPPER-CENTRE AMBIENT DOME — a large soft cool pool that lifts the
       dead void above the splits column into a lit workspace. Coarse and
       low-alpha: no fine structure, L6-safe, and it dies out before the
       text lane's centre. */
    radial-gradient(ellipse 60vw 42vh at 50% 22%, rgba(74, 112, 150, 0.09), rgba(74, 112, 150, 0.03) 46%, rgba(74, 112, 150, 0) 74%),
    /* DESK SHEEN — a broad diagonal raking light across the whole surface,
       so the desktop reads as a physical lit plane rather than pure black.
       Huge and soft (L6-safe). */
    linear-gradient(118deg, rgba(90, 120, 158, 0) 0%, rgba(90, 120, 158, 0.045) 34%, rgba(90, 120, 158, 0.02) 50%, rgba(90, 120, 158, 0) 70%),
    /* header band — the chips dock here */
    linear-gradient(180deg, rgba(5, 7, 11, 0.85) 0%, rgba(5, 7, 11, 0.5) 7vh, rgba(5, 7, 11, 0) 15vh),
    /* footer band */
    linear-gradient(0deg, rgba(4, 6, 10, 0.85) 0%, rgba(4, 6, 10, 0.45) 9vh, rgba(4, 6, 10, 0) 18vh),
    /* the splits column: soft dark scrim under the text lane — sits ABOVE
       the workspace grid so the coarse lattice never reaches the glyphs */
    linear-gradient(90deg, rgba(6, 8, 12, 0) 10%, rgba(6, 8, 12, 0.5) 26%, rgba(6, 8, 12, 0.6) 50%, rgba(6, 8, 12, 0.5) 74%, rgba(6, 8, 12, 0) 90%),
    /* left workspace pool — cool light where the pace graph docks */
    radial-gradient(ellipse 26vw 34vh at 6% 88%, rgba(58, 96, 128, 0.08), rgba(58, 96, 128, 0) 72%),
    /* right workspace pool — faint gold where the SoB / WR chip lives */
    radial-gradient(ellipse 24vw 30vh at 96% 88%, rgba(255, 215, 94, 0.05), rgba(255, 215, 94, 0) 72%),
    /* THE APP CANVAS — a coarse blueprint grid with major/minor cells. The
       minor 48px lattice reads as fine work-surface ruling; a brighter
       240px major grid (every 5 cells) gives the desktop scale and depth.
       All lines hair-thin, very-low-alpha, >=48px cells & soft (L6-safe);
       the centre scrim above hides it from the text lane. */
    repeating-linear-gradient(90deg, rgba(126, 158, 198, 0.07) 0 1px, rgba(0, 0, 0, 0) 1px 240px),
    repeating-linear-gradient(0deg, rgba(126, 158, 198, 0.06) 0 1px, rgba(0, 0, 0, 0) 1px 240px),
    repeating-linear-gradient(90deg, rgba(120, 150, 190, 0.045) 0 1px, rgba(0, 0, 0, 0) 1px 48px),
    repeating-linear-gradient(0deg, rgba(120, 150, 190, 0.038) 0 1px, rgba(0, 0, 0, 0) 1px 48px);
}

/* ═══ run-progress strip on the bottom edge — green to the gold marker
   at 87% of the run, dim rail after it. Coarse bar + soft marker halo,
   parked at the very edge (L6-legal territory). STATIC, promoted. */
html::after {
  content: "";
  display: var(--speedrun-scenery, block);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 30px;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background:
    radial-gradient(circle at 86.5% 50%, #fff3cd 0 2px, #ffd75e 2px 4.5px, rgba(255, 215, 94, 0.45) 6px, rgba(255, 215, 94, 0) 8px),
    radial-gradient(ellipse 120px 24px at 86.5% 50%, rgba(255, 215, 94, 0.22), rgba(255, 215, 94, 0) 70%),
    linear-gradient(90deg, rgba(47, 158, 91, 0.85) 0%, rgba(61, 220, 104, 0.9) 70%, #ffd75e 86.5%, rgba(42, 50, 66, 0.9) 87% 100%) 0 50% / 100% 4px no-repeat,
    linear-gradient(90deg, rgba(61, 220, 104, 0.12) 0 87%, rgba(61, 220, 104, 0) 87%) 0 50% / 100% 14px no-repeat;
}

/* ═══ SEGMENT PACE — the graph panel, bottom-left. A recessed glass
   read-out set in a slate frame: the chart is one rich SVG (gridline
   lattice, gold WR dashline, glowing green pace trace over a graded
   fill, one red under-pace dip, a "now" marker and a bright gold end
   dot with specular). A faint panel-local scanline glazes the glass;
   the frame carries a rim light and cast shadow. Everything fine lives
   in the corner, off the lane — L6-legal. STATIC, promoted. */
body::before {
  content: "";
  display: var(--speedrun-scenery, block);
  position: fixed;
  left: 1.5vw;
  bottom: 4.2vh;
  width: 306px;
  height: 122px;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  border: 5px solid transparent;
  border-radius: 12px;
  box-shadow:
    0 16px 34px rgba(0, 0, 0, 0.55),
    inset 0 1px 0 rgba(255, 255, 255, 0.16),
    inset 0 -1px 0 rgba(0, 0, 0, 0.55),
    inset 0 0 0 5px rgba(0, 0, 0, 0.5),
    inset 0 5px 10px rgba(0, 0, 0, 0.6);
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 116'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%233ddc68' stop-opacity='.42'/%3E%3Cstop offset='1' stop-color='%233ddc68' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='ln' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%232fae67'/%3E%3Cstop offset='1' stop-color='%236ef59a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg stroke='%232a3346' stroke-width='1'%3E%3Cpath d='M14 40 H286 M14 53 H286 M14 79 H286'/%3E%3C/g%3E%3Cg stroke='%23222a3a' stroke-width='1'%3E%3Cpath d='M62 32 V92 M110 32 V92 M158 32 V92 M206 32 V92 M254 32 V92'/%3E%3C/g%3E%3Cpath d='M14 66 H286' stroke='%233a4458' stroke-width='1'/%3E%3Ctext x='14' y='20' font-family='Arial,Helvetica,sans-serif' font-size='9' letter-spacing='3' fill='%239aa4bc'%3ESEGMENT PACE%3C/text%3E%3Crect x='236' y='11' width='52' height='13' rx='3' fill='%23ffd75e' fill-opacity='.1' stroke='%23ffd75e' stroke-opacity='.4' stroke-width='.8'/%3E%3Ctext x='262' y='20.5' text-anchor='middle' font-family='Arial,Helvetica,sans-serif' font-weight='bold' font-size='9' letter-spacing='.5' fill='%23ffe08a'%3EPB -4.8s%3C/text%3E%3Cpath d='M14 40 H286' stroke='%23ffd75e' stroke-opacity='.3' stroke-width='1' stroke-dasharray='4 5'/%3E%3Ctext x='16' y='38' font-family='Arial,Helvetica,sans-serif' font-size='7' letter-spacing='2' fill='%23ffd75e' opacity='.6'%3EWR%3C/text%3E%3Cpath d='M14 62 L44 52 L74 58 L104 42 L134 50 L164 34 L194 54 L214 74 L236 58 L262 40 L286 30 L286 90 L14 90 Z' fill='url(%23a)'/%3E%3Cpath d='M14 62 L44 52 L74 58 L104 42 L134 50 L164 34 L194 54' fill='none' stroke='%2318381f' stroke-width='4.4' stroke-linejoin='round' stroke-linecap='round' opacity='.6'/%3E%3Cpath d='M14 62 L44 52 L74 58 L104 42 L134 50 L164 34 L194 54' fill='none' stroke='url(%23ln)' stroke-width='2.4' stroke-linejoin='round' stroke-linecap='round'/%3E%3Cpath d='M194 54 L214 74 L236 58' fill='none' stroke='%23ff5d6c' stroke-width='2.4' stroke-linejoin='round' stroke-linecap='round'/%3E%3Cpath d='M236 58 L262 40 L286 30' fill='none' stroke='url(%23ln)' stroke-width='2.4' stroke-linejoin='round' stroke-linecap='round'/%3E%3Ccircle cx='214' cy='74' r='2' fill='%23ff8a95'/%3E%3Cpath d='M286 26 V96' stroke='%23ffd75e' stroke-opacity='.25' stroke-width='1' stroke-dasharray='2 3'/%3E%3Ccircle cx='286' cy='30' r='11' fill='%23ffd75e' opacity='.18'/%3E%3Ccircle cx='286' cy='30' r='4' fill='%23ffd75e'/%3E%3Ccircle cx='284.6' cy='28.6' r='1.3' fill='%23fffbe8'/%3E%3Cg stroke='%232f394d' stroke-width='1'%3E%3Cpath d='M14 98 V102 M62 98 V103 M110 98 V102 M158 98 V103 M206 98 V102 M254 98 V103 M286 98 V102'/%3E%3C/g%3E%3C/svg%3E") center / 100% 100% no-repeat padding-box,
    repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.22) 0 1px, rgba(255, 255, 255, 0) 1px 3px) padding-box,
    radial-gradient(120% 140% at 50% 0%, rgba(30, 60, 44, 0.28), rgba(0, 0, 0, 0) 60%) padding-box,
    linear-gradient(180deg, #12161f 0%, #0d1017 60%, #090c11 100%) padding-box,
    linear-gradient(160deg, #333b4a 0%, #212734 40%, #161b24 100%) border-box;
}

/* ═══ SUM OF BEST / WR chip, bottom-right — the number the whole grind
   is chasing, and the rival who holds it. A recessed glass read-out in
   a slate frame, matching the timer and pace panel. STATIC. */
body::after {
  content: "SUM OF BEST   3:52:07.9\\A WR  3:49:58.0 — moonveil";
  display: var(--speedrun-scenery, block);
  position: fixed;
  right: 1.5vw;
  bottom: 4.2vh;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  white-space: pre;
  text-align: right;
  font-family: var(--spd-mono);
  font-weight: 500;
  font-size: 0.72rem;
  line-height: 1.9;
  letter-spacing: 0.16em;
  color: #b6c0d4;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
  padding: 0.66em 1em;
  border: 4px solid transparent;
  border-radius: 11px;
  background:
    /* glass top reflection */
    linear-gradient(180deg, rgba(140, 170, 200, 0.13) 0 8%, rgba(255, 255, 255, 0) 30%) padding-box,
    /* recessed-screen scanline weave (coarse, corner, off-lane) */
    repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0 1px, rgba(255, 255, 255, 0) 1px 3px) padding-box,
    /* faint gold screen-cast — this read-out holds the rival's WR */
    radial-gradient(130% 150% at 100% 0%, rgba(120, 96, 40, 0.32), rgba(0, 0, 0, 0) 58%) padding-box,
    linear-gradient(180deg, #14192400 0%, #0d1017 100%) padding-box,
    linear-gradient(180deg, #141924 0%, #0d1017 100%) padding-box,
    linear-gradient(160deg, #38414f 0%, #232a37 42%, #141a23 100%) border-box;
  box-shadow:
    0 16px 32px rgba(0, 0, 0, 0.52),
    inset 0 1px 0 rgba(255, 255, 255, 0.18),
    inset 0 -1px 0 rgba(0, 0, 0, 0.55),
    inset 0 0 0 4px rgba(0, 0, 0, 0.42),
    inset 0 5px 9px rgba(0, 0, 0, 0.5);
}

/* ═══ THE TIMER — hero prop, top-right. A real speedrun-timer module:
   a brushed-aluminium bezel with a recessed glass VFD screen set into
   it, the RTA digits glowing ahead-green behind the glass. The bezel
   carries a top rim light, a corner specular, machined edge, and a
   cast shadow; the screen is a dark inset with an inner bevel shadow,
   a faint scanline weave (coarse, panel-local, off-lane — L6-safe), a
   glassy top reflection, and the phosphor bloom of the digits. Colons
   are blanks here; the twin layer carries them so only they blink.
   white-space: pre keeps the mono columns honest on both layers.
   STATIC (bezel + screen). */
head { display: var(--speedrun-scenery, block); }
head::before,
head::after {
  display: var(--speedrun-scenery, block);
  position: fixed;
  top: 2.3vh;
  right: 1.5vw;
  z-index: 1;
  pointer-events: none;
  transform: translateZ(0);
  padding: 0.34em 0.66em 0.7em;
  border-radius: 16px;
  font-family: var(--spd-mono);
  font-weight: 700;
  font-size: clamp(2rem, 3.2vw, 2.9rem);
  line-height: 1;
  letter-spacing: 0.05em;
  white-space: pre;
  /* VFD phosphor: a near-white hot core, a tight green corona, a wide
     screen bloom, and a thin dark keel so the segments sit crisp on the
     glass. Layered so the digits read as emissive, not painted-on. */
  color: #b6ffce;
  text-shadow:
    0 0 1px rgba(235, 255, 242, 1),
    0 0 5px rgba(120, 255, 170, 0.95),
    0 0 12px rgba(61, 220, 104, 0.85),
    0 0 26px rgba(61, 220, 104, 0.5),
    0 0 46px rgba(61, 220, 104, 0.28),
    0 1px 1px rgba(0, 0, 0, 0.9);
}
head::before {
  content: "3 57 41.2";
  /* THE TIMER MODULE — a machined-aluminium bezel wrapping a recessed VFD
     screen. Material stack, front to back: sub-split sparkline (data on
     the glass) -> etched "RTA" bezel label -> glass top reflection ->
     screen green-cast -> screen scanline weave -> bezel corner specular
     -> brushed-metal hair lattice -> bezel volume. All corner-local and
     off-lane (L6-safe). STATIC. */
  background:
    /* sub-split sparkline: a bright micro-trace pinned across the base of
       the screen, on its own faint baseline rule — the run breathing in
       data under the digits. One SVG, panel-local, off-lane. */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 26'%3E%3Cdefs%3E%3ClinearGradient id='s' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%233ddc68' stop-opacity='.55'/%3E%3Cstop offset='1' stop-color='%233ddc68' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='sl' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%232fae67'/%3E%3Cstop offset='1' stop-color='%236ef59a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M2 22 H238' stroke='%233ddc68' stroke-opacity='.16' stroke-width='1' stroke-dasharray='2 4'/%3E%3Cpath d='M2 15 L22 12 L42 17 L62 9 L82 13 L102 6 L122 15 L142 10 L162 5 L182 13 L202 6 L222 10 L238 3 L238 26 L2 26 Z' fill='url(%23s)'/%3E%3Cpath d='M2 15 L22 12 L42 17 L62 9 L82 13 L102 6 L122 15 L142 10 L162 5 L182 13 L202 6 L222 10 L238 3' fill='none' stroke='url(%23sl)' stroke-width='1.7' stroke-linejoin='round' stroke-linecap='round'/%3E%3Ccircle cx='238' cy='3' r='5' fill='%233ddc68' opacity='.28'/%3E%3Ccircle cx='238' cy='3' r='2.4' fill='%23eafff0'/%3E%3Ccircle cx='237.2' cy='2.3' r='.9' fill='%23ffffff'/%3E%3C/svg%3E") no-repeat left 0.66em bottom 0.14em / calc(100% - 1.32em) 0.62em padding-box,
    /* etched RTA label — a machined tag on the bezel's lower-left keel */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 12'%3E%3Ctext x='0' y='9' font-family='Arial,Helvetica,sans-serif' font-weight='bold' font-size='8' letter-spacing='2' fill='%23aeb8cc' fill-opacity='.5'%3ERTA%3C/text%3E%3C/svg%3E") no-repeat left 0.7em top 0.16em / 34px 10px border-box,
    /* glass top reflection — a bright raking glaze fading down the face */
    linear-gradient(168deg, rgba(150, 180, 205, 0.28) 0 5%, rgba(120, 150, 175, 0.08) 15%, rgba(255, 255, 255, 0) 32%) padding-box,
    /* screen green-cast: brightest along the digit band, sinking to near-black */
    radial-gradient(130% 130% at 50% 34%, rgba(40, 82, 58, 0.62), rgba(14, 26, 19, 0.72) 44%, rgba(5, 11, 8, 0.98) 78%) padding-box,
    /* fine scanline weave inside the screen (2px lines, panel-local, corner) */
    repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.32) 0 1px, rgba(255, 255, 255, 0) 1px 3px) padding-box,
    /* bezel corner specular — a raking machined glint across the top-left */
    linear-gradient(150deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.06) 12%, rgba(255, 255, 255, 0) 30%) border-box,
    /* brushed-metal hair lattice on the bezel frame (fine vertical grain) */
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.06) 0 1px, rgba(0, 0, 0, 0.08) 1px 2px, rgba(255, 255, 255, 0) 2px 3px) border-box,
    /* bezel volume: cool machined aluminium, cross-lit corner to corner */
    linear-gradient(158deg, #454f61 0%, #333c4b 22%, #232a37 52%, #171d26 78%, #0d1119 100%) border-box;
  /* wide slate border reads as the physical bezel wall */
  border: 7px solid transparent;
  box-shadow:
    /* drop shadow of the whole module + a faint green ground-glow */
    0 18px 44px rgba(0, 0, 0, 0.66),
    0 6px 24px rgba(61, 220, 104, 0.1),
    /* bezel top rim light + machined lower keel */
    inset 0 1.5px 0 rgba(255, 255, 255, 0.26),
    inset 0 -1px 0 rgba(0, 0, 0, 0.62),
    /* screen recess: deep inner bevel so the glass sits BELOW the frame */
    inset 0 0 0 7px rgba(0, 0, 0, 0.58),
    inset 0 8px 14px rgba(0, 0, 0, 0.74),
    inset 0 -6px 14px rgba(0, 0, 0, 0.52),
    /* phosphor spill: green bloom off the digits onto the glass */
    inset 0 0 34px rgba(61, 220, 104, 0.16);
}
/* colon twin: identical box metrics, colons only, 1Hz half-dim blink
   (2 discrete paints/s on a small fixed chip — steps, not a mover). The
   twin is transparent so only the colon glyphs show over the screen. */
head::after {
  content: " :  :    ";
  border: 7px solid transparent;
  background: none;
  box-shadow: none;
  animation: speedrun-colon 1s steps(1, end) infinite;
}

/* ═══ extra HUD chips on the head's void elements ═══ */
head meta { display: var(--speedrun-scenery, block); }

/* ATTEMPT counter, top-left — the other end of the header bar. STATIC. */
head meta:first-of-type::before {
  content: "ATTEMPT #1,247";
  display: var(--speedrun-scenery, block);
  position: fixed;
  top: 2.8vh;
  left: 1.5vw;
  z-index: 1;
  pointer-events: none;
  transform: translateZ(0);
  font-family: var(--spd-mono);
  font-weight: 600;
  font-size: 0.8rem;
  letter-spacing: 0.26em;
  color: #d9e2f0;
  text-shadow: 0 0 8px rgba(120, 150, 190, 0.25), 0 1px 2px rgba(0, 0, 0, 0.8);
  padding: 0.58em 0.7em 0.58em 1.5em;
  border: 4px solid transparent;
  border-radius: 9px;
  background:
    /* live status LED — a small green pip inset on the left, glowing */
    radial-gradient(circle at 0.7em 50%, #9dffc2 0 1.4px, #3ddc68 1.4px 3px, rgba(61, 220, 104, 0.35) 3px 5px, rgba(61, 220, 104, 0) 6px) padding-box,
    /* glass top reflection */
    linear-gradient(180deg, rgba(140, 170, 200, 0.14) 0 10%, rgba(255, 255, 255, 0) 36%) padding-box,
    /* faint recessed-screen scanline weave (coarse, corner, off-lane) */
    repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.22) 0 1px, rgba(255, 255, 255, 0) 1px 3px) padding-box,
    /* screen cast */
    radial-gradient(120% 140% at 50% 0%, rgba(40, 58, 82, 0.5), rgba(0, 0, 0, 0) 60%) padding-box,
    linear-gradient(180deg, #141926 0%, #0d111a 100%) padding-box,
    linear-gradient(160deg, #38414f 0%, #232a37 42%, #141a23 100%) border-box;
  box-shadow:
    0 12px 26px rgba(0, 0, 0, 0.48),
    inset 0 1px 0 rgba(255, 255, 255, 0.16),
    inset 0 -1px 0 rgba(0, 0, 0, 0.5),
    inset 0 0 0 4px rgba(0, 0, 0, 0.4),
    inset 0 5px 9px rgba(0, 0, 0, 0.48);
}

/* PB PACE pill under the timer — gold, breathing on a slow steps()
   cycle (~0.4 paints/s): the run is alive, the pace is good. */
head meta:first-of-type::after {
  content: "PB PACE  -4.8s";
  display: var(--speedrun-scenery, block);
  position: fixed;
  top: calc(2.3vh + 5.6rem);
  right: 1.5vw;
  z-index: 1;
  pointer-events: none;
  transform: translateZ(0);
  font-family: var(--spd-mono);
  font-weight: 700;
  font-size: 0.78rem;
  letter-spacing: 0.22em;
  color: var(--spd-gold);
  text-shadow: 0 0 12px rgba(255, 215, 94, 0.45);
  padding: 0.45em 0.7em 0.45em 0.92em;
  border: 1px solid rgba(255, 215, 94, 0.5);
  border-radius: 999px;
  background: rgba(255, 215, 94, 0.07);
  box-shadow: 0 0 16px rgba(255, 215, 94, 0.16);
  animation: speedrun-pace 4.5s steps(1, end) infinite;
}

/* RESETS tally in behind-red, hanging under the attempt chip — the
   honest number. Bare text, no chip: a scar, not a feature. STATIC. */
head meta:last-of-type::before {
  content: "RESETS 1,246 · PBs 14";
  display: var(--speedrun-scenery, block);
  position: fixed;
  top: calc(2.8vh + 3.6rem);
  left: calc(1.5vw + 0.3em);
  z-index: 1;
  pointer-events: none;
  transform: translateZ(0);
  font-family: var(--spd-mono);
  font-weight: 500;
  font-size: 0.66rem;
  letter-spacing: 0.3em;
  color: rgba(255, 124, 138, 0.75);
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8);
}

/* ═══ the WR crown — the trophy the timer is chasing, PERCHED ON TOP of
   the timer module's crown rail (centred over the digits, tipped a touch
   so it reads as a real object set down on the bezel, not a decal). Big
   enough to read as jewellery: five faceted gold peaks with a rim light,
   a gem-set base band, a faceted ruby centre flanked by emeralds, and
   STATIC specular star-glints baked onto the metal (L6: static highlights
   on a prop are always safe). Casts a soft shadow + gold ground-glow onto
   the bezel below. STATIC. */
head meta:last-of-type::after {
  content: "";
  display: var(--speedrun-scenery, block);
  position: fixed;
  top: calc(2.3vh - 30px);
  right: calc(1.5vw + 132px);
  width: 92px;
  height: 68px;
  z-index: 2;
  pointer-events: none;
  transform: translateZ(0) rotate(-7deg);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 70'%3E%3Cdefs%3E%3ClinearGradient id='gl' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23fff6d6'/%3E%3Cstop offset='.35' stop-color='%23ffdd83'/%3E%3Cstop offset='1' stop-color='%23cf8f24'/%3E%3C/linearGradient%3E%3ClinearGradient id='gd' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23f0c968'/%3E%3Cstop offset='1' stop-color='%23935e14'/%3E%3C/linearGradient%3E%3ClinearGradient id='gb' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23ffedb0'/%3E%3Cstop offset='.42' stop-color='%23eeb23c'/%3E%3Cstop offset='1' stop-color='%238a570f'/%3E%3C/linearGradient%3E%3CradialGradient id='rj' cx='.38' cy='.32' r='.72'%3E%3Cstop offset='0' stop-color='%23ff98a2'/%3E%3Cstop offset='.5' stop-color='%23e0455a'/%3E%3Cstop offset='1' stop-color='%23931c2c'/%3E%3C/radialGradient%3E%3CradialGradient id='ej' cx='.38' cy='.32' r='.72'%3E%3Cstop offset='0' stop-color='%23a9ffcb'/%3E%3Cstop offset='.5' stop-color='%2334c877'/%3E%3Cstop offset='1' stop-color='%23106b3a'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='48' cy='66' rx='30' ry='3.4' fill='%23000000' opacity='.4'/%3E%3C!-- back/side lit facets --%3E%3Cpath d='M16 54 L10 20 L30 35 L48 12 Z' fill='url(%23gl)'/%3E%3Cpath d='M48 12 L66 35 L86 20 L80 54 Z' fill='url(%23gd)'/%3E%3C!-- centre facet catches most light --%3E%3Cpath d='M30 35 L48 12 L66 35 L56 54 L40 54 Z' fill='url(%23gl)'/%3E%3C!-- facet seams --%3E%3Cg stroke='%238a570f' stroke-width='1' opacity='.5' stroke-linejoin='round'%3E%3Cpath d='M30 35 L16 54 M66 35 L80 54 M48 12 L40 54 M48 12 L56 54'/%3E%3C/g%3E%3C!-- crown-tip rim light --%3E%3Cpath d='M10 20 L30 35 L48 12 L66 35 L86 20' fill='none' stroke='%23fff8e0' stroke-width='2' opacity='.9' stroke-linejoin='round' stroke-linecap='round'/%3E%3C!-- base band with top sheen + lower keel --%3E%3Crect x='13' y='52' width='70' height='12' rx='4' fill='url(%23gb)'/%3E%3Crect x='13' y='52' width='70' height='3.6' rx='1.8' fill='%23fff3c4' opacity='.65'/%3E%3Crect x='13' y='61' width='70' height='2.6' rx='1.3' fill='%23000000' opacity='.28'/%3E%3C!-- point orbs --%3E%3Ccircle cx='10' cy='19' r='4.4' fill='url(%23gl)' stroke='%238a570f' stroke-width='.6'/%3E%3Ccircle cx='8.4' cy='17.4' r='1.4' fill='%23fffbe8'/%3E%3Ccircle cx='48' cy='10' r='5' fill='url(%23gl)' stroke='%238a570f' stroke-width='.6'/%3E%3Ccircle cx='46' cy='8.2' r='1.7' fill='%23fffbe8'/%3E%3Ccircle cx='86' cy='19' r='4.4' fill='url(%23gd)' stroke='%238a570f' stroke-width='.6'/%3E%3Ccircle cx='84.4' cy='17.4' r='1.2' fill='%23fff1bd'/%3E%3C!-- centre ruby jewel, faceted --%3E%3Ccircle cx='48' cy='58' r='4.6' fill='url(%23rj)' stroke='%23fff' stroke-opacity='.35' stroke-width='.7'/%3E%3Cpath d='M48 54 L52 58 L48 62 L44 58 Z' fill='%23ffc3cb' opacity='.3'/%3E%3Ccircle cx='46.2' cy='56.2' r='1.2' fill='%23ffe0e4'/%3E%3C!-- flanking emerald jewels --%3E%3Ccircle cx='28' cy='58.4' r='3.2' fill='url(%23ej)' stroke='%23093' stroke-opacity='.5' stroke-width='.5'/%3E%3Ccircle cx='26.7' cy='57.1' r='.9' fill='%23d6ffe6'/%3E%3Ccircle cx='68' cy='58.4' r='3.2' fill='url(%23ej)' stroke='%23093' stroke-opacity='.5' stroke-width='.5'/%3E%3Ccircle cx='66.7' cy='57.1' r='.9' fill='%23d6ffe6'/%3E%3C!-- STATIC specular star-glints on the crown (baked highlights, L6-safe) --%3E%3Cg fill='%23fffefb'%3E%3Cpath d='M47 3 L48.4 8 L53 9.4 L48.4 10.8 L47 15.6 L45.6 10.8 L41 9.4 L45.6 8 Z' opacity='.95'/%3E%3Cpath d='M84 12 L84.9 15 L88 15.9 L84.9 16.8 L84 19.8 L83.1 16.8 L80 15.9 L83.1 15 Z' opacity='.7'/%3E%3Cpath d='M48 51.5 L48.7 54 L51 54.7 L48.7 55.4 L48 57.8 L47.3 55.4 L45 54.7 L47.3 54 Z' opacity='.85'/%3E%3C/g%3E%3C/svg%3E") center / contain no-repeat;
  filter:
    drop-shadow(0 6px 5px rgba(0, 0, 0, 0.55))
    drop-shadow(0 0 16px rgba(255, 215, 94, 0.4));
}

/* ═══ ATTEMPT HISTORY — the run-history column chart, MID-LEFT. Fills the
   big dead void on the left of the frame with real speedrun-overlay
   furniture: a recessed glass panel (matching the pace graph + SoB chip)
   holding a bar chart of recent attempt times — mostly slow/red resets,
   one gold PB column that breaks the WR line, a hatched "reset zone" and
   a dashed target line. Corner-parked, far off the text lane. The lone
   ::before/::after pair on the head's single <link> void element (both
   promoted fixed pseudos; the link is promoted to a box first). STATIC. */
head link { display: var(--speedrun-scenery, block); }
head link:first-of-type::before {
  content: "";
  display: var(--speedrun-scenery, block);
  position: fixed;
  left: 1.5vw;
  top: 41vh;
  width: 250px;
  height: 150px;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  border: 5px solid transparent;
  border-radius: 12px;
  box-shadow:
    0 16px 34px rgba(0, 0, 0, 0.55),
    inset 0 1px 0 rgba(255, 255, 255, 0.16),
    inset 0 -1px 0 rgba(0, 0, 0, 0.55),
    inset 0 0 0 5px rgba(0, 0, 0, 0.5),
    inset 0 5px 10px rgba(0, 0, 0, 0.6);
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 244 144'%3E%3Cdefs%3E%3ClinearGradient id='rb' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23ff8593'/%3E%3Cstop offset='1' stop-color='%238f2634'/%3E%3C/linearGradient%3E%3ClinearGradient id='gcol' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23fff0b4'/%3E%3Cstop offset='.5' stop-color='%23ffd75e'/%3E%3Cstop offset='1' stop-color='%23b6801f'/%3E%3C/linearGradient%3E%3Cpattern id='hz' width='6' height='6' patternTransform='rotate(45)' patternUnits='userSpaceOnUse'%3E%3Crect width='6' height='6' fill='%23ff5d6c' fill-opacity='.05'/%3E%3Cline x1='0' y1='0' x2='0' y2='6' stroke='%23ff5d6c' stroke-opacity='.14' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Ctext x='14' y='20' font-family='Arial,Helvetica,sans-serif' font-size='9' letter-spacing='3' fill='%239aa4bc'%3EATTEMPT HISTORY%3C/text%3E%3Crect x='188' y='11' width='42' height='13' rx='3' fill='%233ddc68' fill-opacity='.1' stroke='%233ddc68' stroke-opacity='.4' stroke-width='.8'/%3E%3Ctext x='209' y='20.5' text-anchor='middle' font-family='Arial,Helvetica,sans-serif' font-weight='bold' font-size='8' letter-spacing='.5' fill='%237cf3a6'%3EPB %2314%3C/text%3E%3Crect x='14' y='30' width='216' height='30' fill='url(%23hz)'/%3E%3Ctext x='16' y='42' font-family='Arial,Helvetica,sans-serif' font-size='7' letter-spacing='1.5' fill='%23ff5d6c' fill-opacity='.55'%3ERESET ZONE%3C/text%3E%3Cg stroke='%232a3346' stroke-width='1'%3E%3Cpath d='M14 60 H230 M14 88 H230 M14 116 H230'/%3E%3C/g%3E%3Cpath d='M14 60 H230' stroke='%23ffd75e' stroke-opacity='.32' stroke-width='1' stroke-dasharray='4 5'/%3E%3Ctext x='214' y='57' font-family='Arial,Helvetica,sans-serif' font-size='7' letter-spacing='1' fill='%23ffd75e' opacity='.6'%3EWR%3C/text%3E%3Cg fill='url(%23rb)'%3E%3Crect x='20' y='40' width='11' height='84' rx='1.5'/%3E%3Crect x='36' y='52' width='11' height='72' rx='1.5'/%3E%3Crect x='52' y='36' width='11' height='88' rx='1.5'/%3E%3Crect x='68' y='58' width='11' height='66' rx='1.5'/%3E%3Crect x='84' y='47' width='11' height='77' rx='1.5'/%3E%3Crect x='100' y='64' width='11' height='60' rx='1.5'/%3E%3Crect x='116' y='44' width='11' height='80' rx='1.5'/%3E%3Crect x='132' y='70' width='11' height='54' rx='1.5'/%3E%3Crect x='148' y='55' width='11' height='69' rx='1.5'/%3E%3Crect x='180' y='38' width='11' height='86' rx='1.5'/%3E%3Crect x='196' y='62' width='11' height='62' rx='1.5'/%3E%3Crect x='212' y='50' width='11' height='74' rx='1.5'/%3E%3C/g%3E%3C!-- the PB column: breaks the WR line, gold, with a bright cap glint --%3E%3Crect x='164' y='56' width='11' height='68' rx='1.5' fill='url(%23gcol)'/%3E%3Crect x='164' y='56' width='11' height='3' rx='1.5' fill='%23fffbe8' opacity='.9'/%3E%3Ccircle cx='169.5' cy='55' r='6' fill='%23ffd75e' opacity='.28'/%3E%3Ccircle cx='169.5' cy='55' r='2.2' fill='%23fffbe8'/%3E%3Cpath d='M14 124 H230' stroke='%233a4458' stroke-width='1'/%3E%3C/svg%3E") center / 100% 100% no-repeat padding-box,
    repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.22) 0 1px, rgba(255, 255, 255, 0) 1px 3px) padding-box,
    radial-gradient(120% 140% at 50% 0%, rgba(58, 40, 30, 0.26), rgba(0, 0, 0, 0) 60%) padding-box,
    linear-gradient(180deg, #12161f 0%, #0d1017 60%, #090c11 100%) padding-box,
    linear-gradient(160deg, #333b4a 0%, #212734 40%, #161b24 100%) border-box;
}

/* ═══ GOLD SPLITS — the best-segments board, MID-RIGHT. Balances the
   history panel and fills the right dead void: a recessed glass read-out
   listing the segments where a personal-best time was set, each with its
   gold delta. Same material family as every other read-out. STATIC. */
head link:first-of-type::after {
  content: "GOLD SPLITS\\A ─────────────\\A intro       -0.9\\A mods        -1.4\\A cheers      -2.1\\A raids  ★    -4.8";
  display: var(--speedrun-scenery, block);
  position: fixed;
  right: 1.5vw;
  top: 44vh;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  white-space: pre;
  text-align: left;
  font-family: var(--spd-mono);
  font-weight: 500;
  font-size: 0.72rem;
  line-height: 1.85;
  letter-spacing: 0.08em;
  color: #d7b761;
  text-shadow: 0 0 10px rgba(255, 215, 94, 0.25), 0 1px 2px rgba(0, 0, 0, 0.75);
  padding: 0.7em 1.1em 0.8em;
  border: 4px solid transparent;
  border-radius: 11px;
  background:
    linear-gradient(180deg, rgba(180, 150, 90, 0.16) 0 8%, rgba(255, 255, 255, 0) 30%) padding-box,
    repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0 1px, rgba(255, 255, 255, 0) 1px 3px) padding-box,
    radial-gradient(130% 150% at 0% 0%, rgba(120, 96, 40, 0.34), rgba(0, 0, 0, 0) 58%) padding-box,
    linear-gradient(180deg, #14192400 0%, #0d1017 100%) padding-box,
    linear-gradient(180deg, #171a1e 0%, #0d1017 100%) padding-box,
    linear-gradient(160deg, #4a4132 0%, #2a2417 42%, #171a12 100%) border-box;
  box-shadow:
    0 16px 32px rgba(0, 0, 0, 0.52),
    inset 0 1px 0 rgba(255, 236, 180, 0.2),
    inset 0 -1px 0 rgba(0, 0, 0, 0.55),
    inset 0 0 0 4px rgba(0, 0, 0, 0.42),
    inset 0 5px 9px rgba(0, 0, 0, 0.5);
}

/* ═══ THE SPLITS — every block is a segment panel that rides the roll.
   Header bar (h2) docks onto the list panel (ul); the eyebrow above
   numbers the split. All separators/leaders are in-roll (L6). ═══ */
.credits-block,
.credits-slide:not(.flourish) { counter-increment: speedrun-split; }

/* delta cycle — AHEAD-green, GOLD-split, BEHIND-red (intro is section 1,
   so the first block lands on 3n+2 = green). Content-agnostic.
   Each cycle carries: --spd-acc (line/text), --spd-acc-glow (bloom, low a),
   --spd-acc-lit (bright convex top), --spd-acc-deep (saturated base). The
   lit/deep pair gives the status pills real convex volume. */
.credits-block:nth-of-type(3n + 2),
.credits-slide:nth-of-type(3n + 2) {
  --spd-acc: var(--spd-green); --spd-acc-glow: rgba(61, 220, 104, 0.35);
  --spd-acc-lit: #7cf3a6; --spd-acc-deep: #1f7a42;
}
.credits-block:nth-of-type(3n),
.credits-slide:nth-of-type(3n) {
  --spd-acc: var(--spd-gold); --spd-acc-glow: rgba(255, 215, 94, 0.35);
  --spd-acc-lit: #ffe9a6; --spd-acc-deep: #b6801f;
}
.credits-block:nth-of-type(3n + 1),
.credits-slide:nth-of-type(3n + 1) {
  --spd-acc: var(--spd-red); --spd-acc-glow: rgba(255, 93, 108, 0.3);
  --spd-acc-lit: #ff97a2; --spd-acc-deep: #a82f3d;
}

/* split eyebrow: "SPLIT 02" in the block accent */
.credits-block::before,
.credits-slide:not(.flourish)::before {
  content: "SPLIT " counter(speedrun-split, decimal-leading-zero);
  display: block;
  box-sizing: border-box;
  width: var(--spd-panel-w);
  margin: 0 auto 0.55rem;
  padding-left: 0.2em;
  text-align: left;
  font-family: var(--spd-mono);
  font-weight: 600;
  font-size: 0.68rem;
  letter-spacing: 0.42em;
  color: var(--spd-acc, var(--spd-green));
  text-shadow: 0 0 10px var(--spd-acc-glow, rgba(61, 220, 104, 0.35)), 0 1px 4px rgba(0, 0, 0, 0.8);
  opacity: 0.9;
}

/* header bar: game-icon square + segment label + delta tag, flush left.
   Reads as a machined module header: brushed-metal top strip over a slate
   volume, an accent hairline where it meets the list body, and a dark
   groove beneath so the panel below sits recessed. */
.credits-block__title {
  display: flex;
  align-items: center;
  gap: 0.6em;
  box-sizing: border-box;
  width: var(--spd-panel-w);
  margin: 0 auto;
  padding: 0.6em 0.95em 0.56em;
  text-align: left;
  font-weight: 700;
  font-size: var(--credits-title-size);
  letter-spacing: 0.12em;
  color: #e2e8f4;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.75);
  background:
    /* faint brushed grain along the header (coarse, corner-safe scale) */
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.028) 0 1px, rgba(0, 0, 0, 0) 1px 4px),
    /* top sheen glazing the metal */
    linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0 8%, rgba(255, 255, 255, 0) 30%),
    /* slate volume */
    linear-gradient(180deg, #232a39 0%, #1a2130 46%, #12172200 100%),
    linear-gradient(180deg, #1c2230 0%, #131824 100%);
  border: 1px solid var(--spd-line);
  border-bottom: 0;
  border-radius: 11px 11px 0 0;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.09),
    /* accent seam kissing the top of the list body */
    inset 0 -2px 0 rgba(0, 0, 0, 0.5),
    inset 0 -3px 0 var(--spd-acc-deep, #1f7a42);
}
/* the game icon: a small glossy convex gem, lit top-left with a specular */
.credits-block__title::before {
  content: "";
  flex: none;
  width: 0.95em;
  height: 0.95em;
  border-radius: 4px;
  background:
    radial-gradient(90% 90% at 30% 24%, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0) 42%),
    linear-gradient(150deg, var(--spd-acc-lit, #7cf3a6) 0%, var(--spd-acc, var(--spd-green)) 45%, var(--spd-acc-deep, #1f7a42) 100%);
  box-shadow:
    0 0 12px var(--spd-acc-glow, rgba(61, 220, 104, 0.35)),
    inset 0 1px 1px rgba(255, 255, 255, 0.5),
    inset 0 -2px 3px rgba(0, 0, 0, 0.4),
    inset 0 0 0 1px rgba(0, 0, 0, 0.4);
}
/* base gold rule -> the delta tag: a convex glossy status chip pushed to
   the bar's right edge. Bright specular cap, saturated base, dark legible
   text, accent bloom (green AHEAD / gold GOLD / red BEHIND). */
.credits-block__title::after {
  content: "- AHEAD";
  display: inline-block;
  width: auto;
  height: auto;
  margin: 0 0 0 auto;
  padding: 0.36em 0.66em 0.34em;
  opacity: 1;
  font-family: var(--spd-mono);
  font-weight: 800;
  font-size: 0.56em;
  letter-spacing: 0.16em;
  color: rgba(12, 16, 14, 0.9);
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.28);
  border: 1px solid var(--spd-acc-deep, #1f7a42);
  border-top-color: var(--spd-acc-lit, #7cf3a6);
  border-radius: 999px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 40%),
    linear-gradient(180deg, var(--spd-acc-lit, #7cf3a6) 0%, var(--spd-acc, var(--spd-green)) 52%, var(--spd-acc-deep, #1f7a42) 100%);
  box-shadow:
    0 0 14px var(--spd-acc-glow, rgba(61, 220, 104, 0.35)),
    0 1px 2px rgba(0, 0, 0, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.5),
    inset 0 -2px 4px rgba(0, 0, 0, 0.22);
}
.credits-block:nth-of-type(3n) .credits-block__title::after,
.credits-slide:nth-of-type(3n) .credits-block__title::after { content: "★ GOLD"; }
.credits-block:nth-of-type(3n + 1) .credits-block__title::after,
.credits-slide:nth-of-type(3n + 1) .credits-block__title::after { content: "+ BEHIND"; }

/* the segment list: recessed glass panel body docked under the header bar.
   A faint accent seep at the top edge (light from the header's accent seam)
   over a graded slate glass, with an inner top-shadow so the body sits
   below the header lip. */
.credits-block__list {
  box-sizing: border-box;
  width: var(--spd-panel-w);
  margin: 0 auto;
  padding: 0.2rem 0 0.34rem;
  gap: 0;
  background:
    radial-gradient(120% 60% at 50% 0%, var(--spd-acc-glow, rgba(61, 220, 104, 0.35)), rgba(0, 0, 0, 0) 42%),
    linear-gradient(180deg, rgba(24, 29, 40, 0.95) 0%, rgba(15, 19, 27, 0.95) 46%, rgba(11, 14, 20, 0.96) 100%);
  background-blend-mode: soft-light, normal;
  border: 1px solid var(--spd-line);
  border-top: 0;
  border-radius: 0 0 11px 11px;
  box-shadow:
    0 18px 34px rgba(0, 0, 0, 0.5),
    inset 0 6px 10px rgba(0, 0, 0, 0.4),
    inset 0 -1px 0 rgba(255, 255, 255, 0.03);
}

/* rows: viewer left, dotted leader, delta right — a splits table */
.credit {
  display: flex;
  align-items: baseline;
  gap: 0.7em;
  box-sizing: border-box;
  width: 100%;
  padding: 0.42em 1.05em;
  text-align: left;
  line-height: 1.35;
}
.credit + .credit { border-top: 1px solid rgba(46, 54, 72, 0.45); }
.credit:nth-child(even) { background: rgba(255, 255, 255, 0.025); }
.credit::after {
  content: "";
  order: 2;
  flex: 1 1 auto;
  min-width: 1.2em;
  border-bottom: 1px dotted rgba(106, 118, 144, 0.35);
  transform: translateY(-0.32em);
}
.credit__name {
  order: 1;
  min-width: 0;
  overflow-wrap: anywhere;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--spd-silver);
}
.credit__amount {
  order: 3;
  flex: none;
  opacity: 1;
  font-family: var(--spd-mono);
  font-weight: 600;
  font-size: 0.68em;
  letter-spacing: 0.04em;
  font-variant-numeric: tabular-nums;
  color: var(--spd-acc, var(--spd-green));
  text-shadow: 0 0 10px var(--spd-acc-glow, rgba(61, 220, 104, 0.35)), 0 1px 3px rgba(0, 0, 0, 0.7);
}
.credit__amount::before { content: "- "; }
.credits-block:nth-of-type(3n + 1) .credit__amount::before,
.credits-slide:nth-of-type(3n + 1) .credit__amount::before { content: "+ "; }

/* ═══ flourish cards ═══ */
.flourish--intro { gap: 1.2rem; }

/* badge -> the run header chip (copy swap via font-size:0 + ::after) */
.flourish__badge { font-size: 0; border: 0; border-radius: 0; padding: 0; box-shadow: none; }
.flourish__badge::after {
  content: "ATTEMPT #1,247 — ANY% NO RESETS";
  display: inline-block;
  font-family: var(--spd-mono);
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 0.3em;
  padding: 0.55em 0.8em 0.55em 1.1em;
  color: var(--spd-green);
  border: 1px solid rgba(61, 220, 104, 0.5);
  border-radius: 4px;
  background: rgba(61, 220, 104, 0.06);
  box-shadow: 0 0 18px rgba(61, 220, 104, 0.16);
  text-shadow: 0 0 10px rgba(61, 220, 104, 0.5);
}

/* streamer title: restyle only — the run title as a machined chrome
   wordmark. A cool brushed-steel gradient clipped to the glyphs (bright
   crown, a raking specular band, cool steel base), an emboss edge drawn
   into the faces, and a soft green rim glow tying it to the timer. The
   drop-shadow filter carries the outer glow the clipped text can't. */
.flourish--intro .flourish__title {
  font-weight: 800;
  letter-spacing: 0.06em;
  line-height: 1.08;
  max-width: min(88vw, 14em);
  color: #eef2fa;
  /* polished-chrome wordmark: a warm-white crown, a deep steel shoulder,
     a HOT near-white raking specular band (tight, for real metal pop), then
     a saturated cool-steel base with a bright reflected-light kick at the
     very foot — the classic chrome value curve, higher-contrast so it reads
     as struck metal, not flat grey. */
  background: linear-gradient(178deg,
    #fdfefe 0%,
    #dfe8f4 17%,
    #9fb2ca 38%,
    #ffffff 49%,
    #eff5fd 53%,
    #7f93af 60%,
    #52627d 82%,
    #aebfd6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow:
    0 1px 0 rgba(255, 255, 255, 0.5),
    0 -1px 0 rgba(16, 24, 36, 0.5),
    0 2px 10px rgba(2, 4, 8, 0.5);
  filter:
    drop-shadow(0 0 30px rgba(61, 220, 104, 0.34))
    drop-shadow(0 0 6px rgba(180, 210, 255, 0.35))
    drop-shadow(0 3px 10px rgba(2, 4, 8, 0.7));
}
/* segment progress underline: a real splits progress bar set in a machined
   slate track — green complete run, a gold current split, dim remainder,
   divided into 8 segments by dark bevel notches, a glossy top sheen, and a
   bright chrome playhead cap with a lens-star glint at the live boundary. */
.flourish--intro .flourish__title::after {
  content: "";
  display: block;
  width: 64%;
  height: 9px;
  margin: 0.5em auto 0;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.6);
  background:
    /* chrome playhead cap: a bright vertical sliver + soft star-glint at the
       green→gold boundary (static specular, L6-safe) */
    radial-gradient(ellipse 7px 11px at 62% 50%, rgba(255, 255, 255, 0.95) 0 30%, rgba(255, 245, 205, 0.55) 55%, rgba(255, 245, 205, 0) 100%),
    linear-gradient(90deg, rgba(255, 255, 255, 0) calc(62% - 1.5px), rgba(255, 255, 255, 0.95) 62%, rgba(255, 255, 255, 0) calc(62% + 1.5px)),
    /* top gloss sheen + a thin bottom re-light */
    linear-gradient(180deg, rgba(255, 255, 255, 0.42) 0 18%, rgba(255, 255, 255, 0) 52%, rgba(255, 255, 255, 0.08) 100%),
    /* segment bevel notches (8 divisions: dark groove + light riser) */
    repeating-linear-gradient(90deg, rgba(0, 0, 0, 0) 0 calc(12.5% - 2px), rgba(3, 6, 10, 0.6) calc(12.5% - 2px) calc(12.5% - 1px), rgba(255, 255, 255, 0.12) calc(12.5% - 1px) 12.5%),
    /* the fill: green complete, gold current split, dim to-go */
    linear-gradient(90deg, #2fae67 0%, var(--spd-green-hot) 40%, var(--spd-green) 55%, var(--spd-gold) 62%, #ffe08a 70%, var(--spd-gold) 78%, rgba(122, 132, 150, 0.2) 78% 100%);
  box-shadow:
    0 0 16px rgba(61, 220, 104, 0.45),
    0 0 10px rgba(255, 215, 94, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    inset 0 -2px 4px rgba(0, 0, 0, 0.45);
}

/* tagline is streamer copy: restyle only — the category line */
.flourish__tagline {
  font-family: var(--spd-mono);
  font-style: normal;
  font-size: 0.92rem;
  letter-spacing: 0.3em;
  padding-left: 0.3em;
  text-transform: uppercase;
  color: rgba(170, 180, 200, 0.85);
}

/* rating -> the verification stamp (copy swap) */
.flourish__rating { font-size: 0; border: 0; padding: 0; opacity: 1; }
.flourish__rating::after {
  content: "RTA VERIFIED · SPLITS SYNCED TO CHAT";
  display: inline-block;
  font-family: var(--spd-mono);
  font-weight: 500;
  font-size: 0.68rem;
  letter-spacing: 0.26em;
  padding: 0.5em 0.7em 0.5em 0.96em;
  color: var(--spd-dim);
  border: 1px solid rgba(106, 118, 144, 0.45);
  border-radius: 4px;
}

/* loader fine print under the intro card */
.flourish--intro::after {
  content: "timer starts on gain of control";
  display: var(--speedrun-scenery, block);
  font-family: var(--spd-mono);
  font-size: 0.64rem;
  letter-spacing: 0.34em;
  padding-left: 0.34em;
  text-transform: lowercase;
  color: rgba(138, 148, 172, 0.55);
}

/* outro: the timer stops. Final time above, RUN ENDS in gold, the
   grind line under it (title+tagline copy swap allowed here). */
.flourish--outro::before {
  content: "FINAL TIME  3:57:41.2 — NEW PB";
  display: var(--speedrun-scenery, block);
  font-family: var(--spd-mono);
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.3em;
  padding-left: 0.3em;
  color: var(--spd-green-hot);
  text-shadow: 0 0 16px rgba(61, 220, 104, 0.5), 0 1px 4px rgba(0, 0, 0, 0.8);
}
.flourish--outro .flourish__title {
  font-size: 0;
  position: relative;
}
/* soft gold halo behind the wordmark — a bloom the clipped-text glyphs
   sit inside (background-clip:text can't cast its own outer glow), plus a
   pair of coarse gold specular glints and small static lens-stars flanking
   the wordmark. All ride the outro card with the roll (L6-safe: option b —
   moves with the text, no screen-fixed twinkle — and coarse soft falloff). */
.flourish--outro .flourish__title::before {
  content: "";
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 22em;
  height: 4em;
  transform: translate(-50%, -50%);
  z-index: -1;
  pointer-events: none;
  background:
    /* small static lens-stars — coarse soft points at the wordmark shoulders */
    radial-gradient(circle at 20% 40%, rgba(255, 250, 225, 0.85) 0 1px, rgba(255, 235, 170, 0) 5px),
    radial-gradient(circle at 82% 62%, rgba(255, 250, 225, 0.7) 0 1px, rgba(255, 235, 170, 0) 4px),
    /* two coarse gold glints (>=40px, soft) that read as light catching gold */
    radial-gradient(ellipse 60px 40px at 22% 42%, rgba(255, 224, 130, 0.4), rgba(255, 224, 130, 0) 70%),
    radial-gradient(ellipse 52px 36px at 80% 60%, rgba(255, 224, 130, 0.32), rgba(255, 224, 130, 0) 70%),
    /* the main bloom */
    radial-gradient(ellipse 50% 52% at 50% 50%, rgba(255, 215, 94, 0.3), rgba(255, 215, 94, 0) 70%);
}
.flourish--outro .flourish__title::after {
  content: "RUN ENDS";
  display: inline-block;
  font-family: var(--credits-title-font);
  font-weight: 800;
  font-size: calc(var(--credits-flourish-title-size) * 0.94);
  letter-spacing: 0.1em;
  line-height: 1.08;
  /* struck-gold wordmark: a machined metallic gradient clipped to the
     glyphs — bright crown, a TIGHT hot near-white specular band for real
     polished-gold pop, then a deep amber base with a reflected-light kick. */
  color: var(--spd-gold);
  background: linear-gradient(180deg, #fff8dc 0%, #ffe89a 26%, #f4b83e 44%, #fffdf2 50%, #ffe38c 56%, #e8a028 74%, #a9691a 92%, #f0c060 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  /* emboss: a bright top edge + dark keel drawn into the glyph faces */
  text-shadow:
    0 1px 0 rgba(255, 250, 220, 0.4),
    0 -1px 0 rgba(120, 70, 10, 0.5),
    0 3px 12px rgba(2, 4, 8, 0.7);
  filter: drop-shadow(0 0 22px rgba(255, 215, 94, 0.32));
}
.flourish--outro .flourish__tagline { font-size: 0; }
.flourish--outro .flourish__tagline::after {
  content: "thanks for watching the grind";
  font-family: var(--spd-mono);
  font-style: italic;
  font-size: 0.95rem;
  letter-spacing: 0.24em;
  padding-left: 0.24em;
  text-transform: none;
  color: rgba(212, 220, 236, 0.8);
}
.flourish--outro::after {
  content: "resets 1,246 · worth it";
  display: var(--speedrun-scenery, block);
  margin-top: 0.5rem;
  font-family: var(--spd-mono);
  font-size: 0.64rem;
  letter-spacing: 0.34em;
  padding-left: 0.34em;
  color: rgba(138, 148, 172, 0.55);
}

/* ═══ raid finale: NEW WORLD RECORD — the whole panel goes gold and a
   soft flood breathes behind it on steps (~0.9 paints/s: the ONLY
   animation inside the roll, L5-legal). Declared after the cycle
   rules so gold wins the cascade. ═══ */
.credits-block:nth-last-of-type(2),
.credits-slide:nth-last-of-type(2):not(.flourish) {
  --spd-acc: var(--spd-gold);
  --spd-acc-glow: rgba(255, 215, 94, 0.4);
  --spd-acc-lit: #fff0b8;
  --spd-acc-deep: #c88a1c;
}
.credits-block:nth-last-of-type(2) { position: relative; }
.credits-block:nth-last-of-type(2)::after {
  content: "";
  display: var(--speedrun-scenery, block);
  position: absolute;
  inset: -3rem -11vw;
  z-index: -1;
  pointer-events: none;
  background:
    /* WR CONFETTI — a burst of gold/green/silver flecks and curling
       streamers on each flank of the gold panel (static SVG props that
       ride the roll and breathe with the flood — L6-safe, off the lane). */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 260'%3E%3Cg fill='%23ffd75e'%3E%3Crect x='30' y='22' width='9' height='5' transform='rotate(28 34 24)'/%3E%3Crect x='96' y='60' width='8' height='5' transform='rotate(-40 100 62)'/%3E%3Crect x='52' y='118' width='9' height='5' transform='rotate(64 56 120)'/%3E%3Crect x='110' y='170' width='7' height='4' transform='rotate(-18 113 172)'/%3E%3Crect x='24' y='208' width='8' height='5' transform='rotate(42 28 210)'/%3E%3C/g%3E%3Cg fill='%233ddc68'%3E%3Crect x='72' y='34' width='7' height='4' transform='rotate(-52 75 36)'/%3E%3Crect x='18' y='96' width='8' height='4' transform='rotate(20 22 98)'/%3E%3Crect x='88' y='140' width='7' height='4' transform='rotate(70 91 142)'/%3E%3Crect x='48' y='226' width='7' height='4' transform='rotate(-30 51 228)'/%3E%3C/g%3E%3Cg fill='%23e8edf7'%3E%3Crect x='56' y='70' width='6' height='4' transform='rotate(48 59 72)'/%3E%3Crect x='118' y='108' width='6' height='4' transform='rotate(-64 121 110)'/%3E%3Crect x='36' y='160' width='6' height='4' transform='rotate(12 39 162)'/%3E%3C/g%3E%3Cg fill='%23ff8a58'%3E%3Crect x='104' y='28' width='6' height='4' transform='rotate(80 107 30)'/%3E%3Crect x='68' y='188' width='6' height='4' transform='rotate(-44 71 190)'/%3E%3C/g%3E%3Cg fill='none' stroke-width='2.4' stroke-linecap='round'%3E%3Cpath d='M42 46 Q50 54 44 64 Q38 74 46 82' stroke='%23ffd75e' opacity='.85'/%3E%3Cpath d='M100 86 Q108 94 102 104' stroke='%236ef59a' opacity='.7'/%3E%3Cpath d='M62 142 Q70 150 64 160 Q58 170 66 178' stroke='%23ffe08a' opacity='.75'/%3E%3Cpath d='M28 118 Q34 126 30 134' stroke='%23e8edf7' opacity='.5'/%3E%3C/g%3E%3C/svg%3E") left 1% top 8% / 150px 260px no-repeat,
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 260'%3E%3Cg fill='%23ffd75e'%3E%3Crect x='108' y='30' width='9' height='5' transform='rotate(-32 112 32)'/%3E%3Crect x='40' y='68' width='8' height='5' transform='rotate(48 44 70)'/%3E%3Crect x='92' y='126' width='9' height='5' transform='rotate(-58 96 128)'/%3E%3Crect x='30' y='178' width='7' height='4' transform='rotate(24 33 180)'/%3E%3Crect x='114' y='214' width='8' height='5' transform='rotate(-46 118 216)'/%3E%3C/g%3E%3Cg fill='%233ddc68'%3E%3Crect x='66' y='40' width='7' height='4' transform='rotate(58 69 42)'/%3E%3Crect x='122' y='90' width='8' height='4' transform='rotate(-22 126 92)'/%3E%3Crect x='52' y='150' width='7' height='4' transform='rotate(-74 55 152)'/%3E%3Crect x='90' y='232' width='7' height='4' transform='rotate(36 93 234)'/%3E%3C/g%3E%3Cg fill='%23e8edf7'%3E%3Crect x='86' y='74' width='6' height='4' transform='rotate(-50 89 76)'/%3E%3Crect x='26' y='112' width='6' height='4' transform='rotate(66 29 114)'/%3E%3Crect x='106' y='166' width='6' height='4' transform='rotate(-10 109 168)'/%3E%3C/g%3E%3Cg fill='%23ff8a58'%3E%3Crect x='44' y='24' width='6' height='4' transform='rotate(-78 47 26)'/%3E%3Crect x='78' y='196' width='6' height='4' transform='rotate(50 81 198)'/%3E%3C/g%3E%3Cg fill='none' stroke-width='2.4' stroke-linecap='round'%3E%3Cpath d='M104 50 Q96 58 102 68 Q108 78 100 86' stroke='%23ffd75e' opacity='.85'/%3E%3Cpath d='M48 92 Q40 100 46 110' stroke='%236ef59a' opacity='.7'/%3E%3Cpath d='M84 148 Q76 156 82 166 Q88 176 80 184' stroke='%23ffe08a' opacity='.75'/%3E%3Cpath d='M118 122 Q112 130 116 138' stroke='%23e8edf7' opacity='.5'/%3E%3C/g%3E%3C/svg%3E") right 1% top 12% / 150px 260px no-repeat,
    /* WR celebration sparkle — coarse soft gold glints + small static
       lens-stars hugging the FLANKS of the gold panel, clear of the centre
       name column. They ride the finale block with the roll and only rise
       and fall in opacity with the flood (L6-safe: rides the roll, coarse
       soft falloff, off the text lane). */
    radial-gradient(circle at 12% 30%, rgba(255, 252, 228, 0.95) 0 2px, rgba(255, 240, 180, 0) 7px),
    radial-gradient(circle at 90% 40%, rgba(255, 252, 228, 0.9) 0 2px, rgba(255, 240, 180, 0) 7px),
    radial-gradient(circle at 18% 74%, rgba(255, 252, 228, 0.8) 0 1.5px, rgba(255, 240, 180, 0) 6px),
    radial-gradient(circle at 84% 78%, rgba(255, 252, 228, 0.85) 0 1.5px, rgba(255, 240, 180, 0) 6px),
    radial-gradient(ellipse 110px 80px at 12% 30%, rgba(255, 224, 130, 0.4), rgba(255, 224, 130, 0) 70%),
    radial-gradient(ellipse 104px 74px at 90% 40%, rgba(255, 224, 130, 0.36), rgba(255, 224, 130, 0) 70%),
    radial-gradient(ellipse 88px 64px at 18% 74%, rgba(255, 224, 130, 0.3), rgba(255, 224, 130, 0) 72%),
    radial-gradient(ellipse 94px 66px at 84% 78%, rgba(255, 224, 130, 0.32), rgba(255, 224, 130, 0) 72%),
    radial-gradient(ellipse 62% 68% at 50% 42%, rgba(255, 215, 94, 0.2), rgba(255, 215, 94, 0.07) 55%, rgba(255, 215, 94, 0) 78%);
  animation: speedrun-flood 3.2s steps(1, end) infinite;
}
/* slideshow: the slide IS the viewport — static gold wash, no second
   animator needed (the eyebrow carries the moment) */
.credits-slide:nth-last-of-type(2):not(.flourish) {
  background: radial-gradient(ellipse 70% 62% at 50% 44%, rgba(255, 215, 94, 0.13), rgba(255, 215, 94, 0.04) 60%, rgba(255, 215, 94, 0) 80%);
}
.credits-block:nth-last-of-type(2)::before,
.credits-slide:nth-last-of-type(2):not(.flourish)::before {
  content: "★ NEW WORLD RECORD ★";
  text-align: center;
  padding-left: 0.55em;
  letter-spacing: 0.55em;
  font-size: 0.82rem;
  color: var(--spd-gold);
  text-shadow: 0 0 16px rgba(255, 215, 94, 0.55), 0 1px 4px rgba(0, 0, 0, 0.8);
  opacity: 1;
}
.credits-block:nth-last-of-type(2) .credits-block__title,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
  color: #ffe9ad;
  border-color: rgba(255, 215, 94, 0.4);
  text-shadow: 0 0 14px rgba(255, 215, 94, 0.3), 0 1px 4px rgba(0, 0, 0, 0.7);
}
.credits-block:nth-last-of-type(2) .credits-block__title::after,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::after { content: "★ WR"; }
.credits-block:nth-last-of-type(2) .credits-block__list,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__list {
  border-color: rgba(255, 215, 94, 0.35);
}
.credits-block:nth-last-of-type(2) .credit,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit {
  font-size: calc(var(--credits-name-size) * 1.08);
}
.credits-block:nth-last-of-type(2) .credit__name,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__name {
  color: #fff3cd;
  text-shadow: 0 0 14px rgba(255, 215, 94, 0.3), var(--credits-shadow);
}
/* a record is AHEAD by definition — never let the red-cycle "+" leak in */
.credits-block:nth-last-of-type(2) .credit__amount::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__amount::before { content: "- "; }

/* ═══ slideshow: splits confirm with a small settle ═══ */
.credits-slide:not(.flourish) { gap: 0; }
.credits-slide {
  transform: translateY(12px);
  transition: opacity 0.8s ease, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}
.credits-slide.is-active { transform: none; }

/* ═══ keyframes (all speedrun- prefixed; opacity ONLY) ═══ */
/* the colon heartbeat: on the second, half-dim on the half-second */
@keyframes speedrun-colon {
  0%, 49%   { opacity: 1; }
  50%, 100% { opacity: 0.22; }
}
/* PB pill breath: two discrete dips per 4.5s */
@keyframes speedrun-pace {
  0%, 62%   { opacity: 1; }
  63%, 84%  { opacity: 0.62; }
  85%, 100% { opacity: 1; }
}
/* WR gold flood: swells and settles, ~3 discrete levels per 3.2s */
@keyframes speedrun-flood {
  0%, 44%   { opacity: 0.55; }
  45%, 76%  { opacity: 1; }
  77%, 100% { opacity: 0.55; }
}

/* ═══ reduced motion: the timer holds — colons burn steady, the PB
   pill rests bright, the flood parks at full gold. ═══ */
@media (prefers-reduced-motion: reduce) {
  head::after { animation: none; }
  head meta:first-of-type::after { animation: none; }
  .credits-block:nth-last-of-type(2)::after { animation: none; opacity: 1; }
  .credits-slide { transform: none; transition: opacity 0.8s ease; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--speedrun-scenery:none;}",
};
