import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. flag{...}: the last hour of a CTF final on a modern dark-IDE workstation — every viewer is a captured flag, every section a shell command, and the raid is a red root-shell alert on the scoreboard. */
export const VARIANT: ThemeVariant = {
  key: "pwned",
  name: "flag{...} — CTF Finals",
  css: `
/* ================================================================
   FLAG{...} — layered after the base theme.
   Fiction: 23:59 on the finals clock. The venue lights are off; the
   only glow is this workstation — a modern dark-IDE terminal (NOT a
   phosphor tube; crt-terminal owns that). The credits are the flag
   submission log: every viewer name arrives wrapped as flag{name},
   every section title is the shell command that harvested it, and
   points ride along as [500 pts]. A tmux status bar holds the bottom
   edge, the live scoreboard chip holds the top-right, and an exploit
   pane in the top-left has just printed the line that matters:
   root shell acquired. When the raid block rolls past, the log goes
   red. Then the remote host closes the connection. gg.
   Layer map (all scenery kill-switched via --pwned-scenery):
     html bg (--credits-bg)   flat #0d1117 IDE night (cheap linear)
     html::before             LIGHT STORY — monitor bloom top-center
                              (cool blue), purple ambient lower-left,
                              green seep over the status bar, corner
                              vignette. STATIC, promoted
     html::after              PCB traces climbing both side edges out
                              of the status bar (SVG data-URI, lit
                              vias). Edges only per L6. STATIC, promoted
     head::before             tmux bar: bar chrome + left window list
     head::after              tmux bar: right status segment
     meta#1::before           scoreboard chip, top-right. STATIC
     meta#1::after            the chip's LIVE dot — steps() pulse
     meta#2::before           exploit pane, top-left (designed fiction
                              block). STATIC
     meta#2::after            its block cursor — steps() blink
     body::before             one packet — a 6px mote exfiltrating up
                              the right-edge trace (the ONLY continuous
                              mover; will-change budget: 1)
     body::after              center-lane readability scrim. STATIC
     .credits-roll::before    editor row-stripes riding the roll
     .credits-slideshow::before  same, static per L6
   ================================================================ */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,700;0,800;1,400&display=swap');

:root {
  --pwned-scenery: block; /* set to none to strip every scenery layer */
  /* ── palette: GitHub-dark syntax ── */
  --pwned-panel: #161b22;
  --pwned-border: #30363d;
  --pwned-dim: #8b949e;
  --pwned-bright: #e6edf3;
  --pwned-blue: #79c0ff;
  --pwned-string: #a5d6ff;
  --pwned-red: #ff7b72;
  --pwned-green: #7ee787;
  --pwned-purple: #d2a8ff;
  --pwned-orange: #ffa657;

  /* ── base hooks ── */
  /* cheap IDE night: one linear ramp, barely lifting toward the glow zones
     (L3: all real light lives on the promoted html::before) */
  --credits-bg: linear-gradient(180deg, #090c12 0%, #0d1117 26%, #0d1117 62%, #0e1219 84%, #101620 100%);
  --credits-color: var(--pwned-bright);
  --credits-accent: var(--pwned-green);
  --credits-font: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  --credits-title-font: "JetBrains Mono", ui-monospace, Menlo, Consolas, monospace;
  --credits-title-size: clamp(1.02rem, 2.3vw, 1.45rem);
  --credits-name-size: clamp(1rem, 2.4vw, 1.42rem);
  --credits-flourish-title-size: clamp(2.2rem, 7vw, 4.5rem);
  --credits-block-gap: 4.75rem;
  --credits-name-gap: 0.55rem;
  --credits-shadow: 0 2px 12px rgba(4, 7, 12, 0.85);
  /* no-op — NEVER "none": base composes "var(--credits-glow), var(--credits-shadow)" */
  --credits-glow: 0 0 0 rgba(0, 0, 0, 0);
}

/* scenery is full-bleed: html drops the base edge-fade; body keeps it so
   names still dissolve at top and bottom (before they touch the tmux bar) */
html { -webkit-mask-image: none; mask-image: none; }
body { background: transparent; counter-reset: pwned-job; }

/* ═══ LIGHT STORY — one static promoted layer. The monitor is the only
   light in the venue: a cool blue bloom washes down from top-center, twin
   god-ray shafts fan out of it into the haze, a purple ambient pools
   lower-left (the RGB strip behind the desk), an orange echo warms the
   lower-right desk, a green breath rises off the status bar, and the
   corners fall away into an aggressive vignette. Everything coarse, soft,
   low alpha — nothing here can flicker (L6). ═══ */
html::before {
  content: "";
  display: var(--pwned-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -3;
  pointer-events: none;
  transform: translateZ(0);
  /* the attack-graph hologram (first layer) is placed center-upper and drawn
     once; every gradient layer below fills the frame (auto = full-bleed on a
     fixed inset:0 box). Sizes/positions are listed per background layer. */
  background-repeat: no-repeat;
  background-position: center 32%, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0;
  background-size: min(1320px, 94vw) auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto;
  /* (16 background layers below: 1 hologram + 15 gradients — position/size lists match) */
  background-image:
    /* ── ATTACK-GRAPH HOLOGRAM ── the CTF war-room isn't a flat dotted map any
       more: it's a live network-topology projection floating in the dead
       centre band. A bright locked "flagship" target sits mid-frame inside a
       reticle + concentric range rings, satellite host nodes orbit it, lit
       attack-path arcs sweep between them carrying directional payload dots,
       and a faint hex-cell backing gives it holographic body. Everything is
       COARSE (rings/arcs are big soft strokes, nodes have >=24px soft halos,
       hex cells are large) and STATIC — no fine screen-fixed grain, so it is
       L6-safe, and the readability scrim over the lane keeps it behind text. ══ */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1320' height='620' viewBox='0 0 1320 620'%3E%3Cdefs%3E%3CradialGradient id='hub' cx='0.5' cy='0.5' r='0.5'%3E%3Cstop offset='0' stop-color='%23baffc7' stop-opacity='.95'/%3E%3Cstop offset='.45' stop-color='%237ee787' stop-opacity='.5'/%3E%3Cstop offset='1' stop-color='%237ee787' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='gnode' cx='0.5' cy='0.5' r='0.5'%3E%3Cstop offset='0' stop-color='%237ee787' stop-opacity='.85'/%3E%3Cstop offset='1' stop-color='%237ee787' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='bnode' cx='0.5' cy='0.5' r='0.5'%3E%3Cstop offset='0' stop-color='%2379c0ff' stop-opacity='.85'/%3E%3Cstop offset='1' stop-color='%2379c0ff' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='rnode' cx='0.5' cy='0.5' r='0.5'%3E%3Cstop offset='0' stop-color='%23ff9d97' stop-opacity='.8'/%3E%3Cstop offset='1' stop-color='%23ff7b72' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='picn' cx='0.5' cy='0.5' r='0.5'%3E%3Cstop offset='0' stop-color='%237ee787' stop-opacity='.16'/%3E%3Cstop offset='1' stop-color='%237ee787' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cg opacity='.5'%3E%3Cg fill='none' stroke='%235a86b8' stroke-opacity='.09' stroke-width='1'%3E%3Cpath d='M120 300 l34 -20 l34 20 l0 40 l-34 20 l-34 -20 z'/%3E%3Cpath d='M188 260 l34 -20 l34 20 l0 40 l-34 20 l-34 -20 z'/%3E%3Cpath d='M188 340 l34 -20 l34 20 l0 40 l-34 20 l-34 -20 z'/%3E%3Cpath d='M256 300 l34 -20 l34 20 l0 40 l-34 20 l-34 -20 z'/%3E%3Cpath d='M1064 300 l34 -20 l34 20 l0 40 l-34 20 l-34 -20 z'/%3E%3Cpath d='M1132 260 l34 -20 l34 20 l0 40 l-34 20 l-34 -20 z'/%3E%3Cpath d='M1132 340 l34 -20 l34 20 l0 40 l-34 20 l-34 -20 z'/%3E%3C/g%3E%3C/g%3E%3Cg fill='none' stroke='%2379c0ff' stroke-opacity='.22' stroke-width='1.4'%3E%3Ccircle cx='660' cy='320' r='96'/%3E%3Ccircle cx='660' cy='320' r='168'/%3E%3Ccircle cx='660' cy='320' r='250' stroke-opacity='.1'/%3E%3C/g%3E%3Cg fill='none' stroke='%237ee787' stroke-opacity='.52' stroke-width='2.2' stroke-linecap='round'%3E%3Cpath d='M300 250 Q470 150 610 300'/%3E%3Cpath d='M660 452 Q660 540 900 500 Q1030 476 1030 360'/%3E%3Cpath d='M718 300 Q900 170 1030 330'/%3E%3C/g%3E%3Cg fill='none' stroke='%2379c0ff' stroke-opacity='.38' stroke-width='1.8' stroke-linecap='round'%3E%3Cpath d='M300 250 Q210 380 320 470'/%3E%3Cpath d='M1030 330 Q1160 400 1050 500'/%3E%3C/g%3E%3Cg fill='none' stroke='%23ff7b72' stroke-opacity='.42' stroke-width='2' stroke-dasharray='7 9' stroke-linecap='round'%3E%3Cpath d='M320 470 Q490 560 610 356'/%3E%3C/g%3E%3Cg fill='%237ee787'%3E%3Ccircle cx='452' cy='196' r='3'/%3E%3Ccircle cx='512' cy='224' r='2.4' fill-opacity='.7'/%3E%3Ccircle cx='900' cy='232' r='3'/%3E%3Ccircle cx='965' cy='262' r='2.4' fill-opacity='.7'/%3E%3C/g%3E%3Ccircle cx='300' cy='250' r='28' fill='url(%23bnode)'/%3E%3Ccircle cx='300' cy='250' r='7' fill='none' stroke='%2379c0ff' stroke-opacity='.7' stroke-width='1.4'/%3E%3Ccircle cx='300' cy='250' r='2.4' fill='%23eaf4ff'/%3E%3Ccircle cx='320' cy='470' r='26' fill='url(%23rnode)'/%3E%3Ccircle cx='320' cy='470' r='6.5' fill='none' stroke='%23ff9d97' stroke-opacity='.75' stroke-width='1.4'/%3E%3Ccircle cx='320' cy='470' r='2.2' fill='%23ffe1de'/%3E%3Ccircle cx='1030' cy='330' r='30' fill='url(%23gnode)'/%3E%3Ccircle cx='1030' cy='330' r='7.5' fill='none' stroke='%237ee787' stroke-opacity='.75' stroke-width='1.4'/%3E%3Ccircle cx='1030' cy='330' r='2.4' fill='%23e6ffe9'/%3E%3Ccircle cx='1030' cy='500' r='22' fill='url(%23bnode)'/%3E%3Ccircle cx='1030' cy='500' r='2' fill='%23eaf4ff'/%3E%3Ccircle cx='900' cy='500' r='20' fill='url(%23gnode)'/%3E%3Ccircle cx='900' cy='500' r='2' fill='%23e6ffe9'/%3E%3Ccircle cx='660' cy='320' r='150' fill='url(%23picn)'/%3E%3Ccircle cx='660' cy='320' r='58' fill='url(%23hub)'/%3E%3Cg fill='none' stroke='%23baffc7' stroke-opacity='.85' stroke-width='2.4'%3E%3Ccircle cx='660' cy='320' r='30'/%3E%3C/g%3E%3Cg stroke='%237ee787' stroke-opacity='.8' stroke-width='2.4' stroke-linecap='round'%3E%3Cpath d='M660 276 v16 M660 348 v16 M616 320 h16 M688 320 h16'/%3E%3Cpath d='M628 292 l10 10 M692 292 l-10 10 M628 348 l10 -10 M692 348 l-10 -10' stroke-opacity='.5'/%3E%3C/g%3E%3Ccircle cx='660' cy='320' r='5' fill='%23eaffee'/%3E%3Ccircle cx='660' cy='320' r='11' fill='none' stroke='%23d6ffdb' stroke-opacity='.6' stroke-width='1'/%3E%3Cg opacity='.7'%3E%3Cpath d='M660 296 L663 320 L660 344 L657 320 Z' fill='%23eaffee' fill-opacity='.5'/%3E%3Cpath d='M636 320 L660 317 L684 320 L660 323 Z' fill='%23eaffee' fill-opacity='.5'/%3E%3Cpath d='M660 288 L661.4 320 L660 352 L658.6 320 Z' fill='%23f4fff6' fill-opacity='.35'/%3E%3Cpath d='M628 320 L660 318.6 L692 320 L660 321.4 Z' fill='%23f4fff6' fill-opacity='.35'/%3E%3C/g%3E%3Cg opacity='.55'%3E%3Cpath d='M1030 312 L1032 330 L1030 348 L1028 330 Z' fill='%23e6ffe9' fill-opacity='.5'/%3E%3Cpath d='M1012 330 L1030 328 L1048 330 L1030 332 Z' fill='%23e6ffe9' fill-opacity='.5'/%3E%3C/g%3E%3Cg opacity='.5'%3E%3Cpath d='M300 234 L302 250 L300 266 L298 250 Z' fill='%23eaf4ff' fill-opacity='.5'/%3E%3Cpath d='M284 250 L300 248 L316 250 L300 252 Z' fill='%23eaf4ff' fill-opacity='.5'/%3E%3C/g%3E%3C/svg%3E"),
    /* corner vignette — the venue is dark, corners fall hard */
    radial-gradient(ellipse 132% 118% at 50% 34%, rgba(2, 4, 8, 0) 46%, rgba(2, 4, 8, 0.42) 82%, rgba(1, 2, 5, 0.8) 100%),
    /* twin volumetric god-ray shafts fanning down out of the monitor bloom,
       plus a soft central cone — coarse, very low alpha; reads as light in
       haze, cannot flicker (L6). Lifted alpha so the shafts actually register
       against the dead band. */
    linear-gradient(199deg, rgba(121, 192, 255, 0) 34%, rgba(121, 192, 255, 0.09) 50%, rgba(121, 192, 255, 0) 64%),
    linear-gradient(161deg, rgba(88, 166, 255, 0) 34%, rgba(88, 166, 255, 0.08) 50%, rgba(88, 166, 255, 0) 64%),
    linear-gradient(180deg, rgba(121, 192, 255, 0) 30%, rgba(121, 192, 255, 0.05) 47%, rgba(121, 192, 255, 0) 62%),
    conic-gradient(from 180deg at 50% -8%, rgba(121, 192, 255, 0) 74deg, rgba(121, 192, 255, 0.07) 90deg, rgba(121, 192, 255, 0) 106deg),
    /* monitor glare: cool blue bloom from the top edge — deeper + reaching
       further down so the void just under the panels is lit, not black */
    radial-gradient(ellipse 74vw 52vh at 50% -6%, rgba(56, 139, 253, 0.22), rgba(56, 139, 253, 0.07) 48%, rgba(56, 139, 253, 0) 80%),
    /* a second, tighter core so the bloom has a hot centre */
    radial-gradient(ellipse 34vw 22vh at 50% -3%, rgba(121, 192, 255, 0.16), rgba(121, 192, 255, 0) 70%),
    /* a broad, LIFTED mid-height haze so the dead band between panels and the
       lane reads as lit atmosphere — this is the void-killer */
    radial-gradient(ellipse 104vw 46vh at 50% 30%, rgba(46, 84, 134, 0.15), rgba(46, 84, 134, 0.04) 54%, rgba(40, 74, 120, 0) 80%),
    /* holo-projection glow: a soft teal-green bloom pooling around the attack
       graph so the hologram reads as a LIT volumetric projection floating in
       the room, not a flat decal — coarse + soft, cannot flicker (L6) */
    radial-gradient(ellipse 58vw 40vh at 50% 34%, rgba(90, 200, 150, 0.10), rgba(70, 170, 140, 0.03) 50%, rgba(60, 150, 130, 0) 78%),
    /* keyboard RGB bleed — a warm-cool wash rising off the desk at bottom
       centre, grounding the workstation and filling the lower dead space */
    radial-gradient(ellipse 60vw 24vh at 50% 108%, rgba(88, 166, 255, 0.10), rgba(88, 166, 255, 0.03) 46%, rgba(88, 166, 255, 0) 74%),
    radial-gradient(ellipse 30vw 16vh at 38% 110%, rgba(210, 168, 255, 0.08), rgba(210, 168, 255, 0) 66%),
    radial-gradient(ellipse 30vw 16vh at 62% 110%, rgba(126, 231, 135, 0.07), rgba(126, 231, 135, 0) 66%),
    /* RGB desk strip: purple ambient pooling up the lower-left corner */
    radial-gradient(ellipse 44vw 34vh at 2% 92%, rgba(210, 168, 255, 0.12), rgba(210, 168, 255, 0.035) 46%, rgba(210, 168, 255, 0) 74%),
    /* warm desk-lamp echo washing the lower-right */
    radial-gradient(ellipse 38vw 26vh at 98% 94%, rgba(255, 166, 87, 0.09), rgba(255, 166, 87, 0) 68%),
    /* green breath off the status bar */
    linear-gradient(0deg, rgba(126, 231, 135, 0.09) 0%, rgba(126, 231, 135, 0.03) 7%, rgba(126, 231, 135, 0) 16%);
}

/* ═══ PCB traces — the machine's guts climb both side edges out of the
   status bar: straight runs, 45-degree jogs, via pads, gold fingers,
   surface-mount chips and lit vias (green exfil route on the left, blue on
   the right). Traces are two-tone (a lighter copper core over a dark base
   so they read as etched metal, not a hairline). Thin lines, so they live
   at the EDGES only (L6). STATIC, promoted. Wider band (210px) so the
   board has real presence without entering the lane. ═══ */
html::after {
  content: "";
  display: var(--pwned-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  opacity: 0.92;
  background-repeat: no-repeat;
  background-position: left bottom, right bottom;
  background-size: 210px auto, 210px auto;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='210' height='940' viewBox='0 0 210 940'%3E%3Cdefs%3E%3CradialGradient id='lvia' cx='0.5' cy='0.5' r='0.5'%3E%3Cstop offset='0' stop-color='%237ee787' stop-opacity='.7'/%3E%3Cstop offset='1' stop-color='%237ee787' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='lvia2' cx='0.5' cy='0.5' r='0.5'%3E%3Cstop offset='0' stop-color='%237ee787' stop-opacity='.5'/%3E%3Cstop offset='1' stop-color='%237ee787' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='lgf' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23f4d98a'/%3E%3Cstop offset='.5' stop-color='%23c9a24a'/%3E%3Cstop offset='1' stop-color='%238a6c2c'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%237ee787' fill-opacity='.05'%3E%3Crect x='16' y='760' width='84' height='180'/%3E%3C/g%3E%3Cg stroke='%237ee787' stroke-opacity='.06' stroke-width='1'%3E%3Cpath d='M20 780 L96 780 M20 795 L96 795 M20 810 L96 810 M20 825 L96 825 M20 840 L96 840 M20 855 L96 855'/%3E%3C/g%3E%3Cg fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cg stroke='%231a2634' stroke-width='5'%3E%3Cpath d='M30 940 L30 640 L58 612 L58 400'/%3E%3Cpath d='M64 940 L64 720 L40 696 L40 540'/%3E%3Cpath d='M98 940 L98 780 L128 750 L128 620'/%3E%3Cpath d='M44 940 L44 830 L20 806 L20 700'/%3E%3Cpath d='M82 940 L82 686 L104 664 L104 560'/%3E%3Cpath d='M58 480 L92 480 L106 466'/%3E%3C/g%3E%3Cg stroke='%234a708c' stroke-width='2'%3E%3Cpath d='M30 940 L30 640 L58 612 L58 400'/%3E%3Cpath d='M64 940 L64 720 L40 696 L40 540' stroke-opacity='.8'/%3E%3Cpath d='M98 940 L98 780 L128 750 L128 620'/%3E%3Cpath d='M44 940 L44 830 L20 806 L20 700' stroke-opacity='.7'/%3E%3Cpath d='M82 940 L82 686 L104 664 L104 560' stroke-opacity='.65'/%3E%3Cpath d='M58 480 L92 480 L106 466' stroke-opacity='.7'/%3E%3C/g%3E%3Cg stroke='%23aecbe0' stroke-width='.7'%3E%3Cpath d='M30 640 L58 612 L58 400' stroke-opacity='.55'/%3E%3Cpath d='M64 720 L40 696 L40 540' stroke-opacity='.4'/%3E%3Cpath d='M98 780 L128 750 L128 620' stroke-opacity='.42'/%3E%3C/g%3E%3Cg stroke='%23233241' stroke-width='2.4'%3E%3Cpath d='M132 940 L132 840 L150 822'/%3E%3Cpath d='M14 940 L14 880'/%3E%3Cpath d='M116 940 L116 900'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3Crect x='66' y='694' width='52' height='70' rx='3' fill='%23141d29' stroke='%2334506a' stroke-width='1.2'/%3E%3Crect x='67' y='695' width='50' height='2.5' rx='1' fill='%235a7ea0' fill-opacity='.7'/%3E%3Crect x='67' y='761' width='50' height='2' rx='1' fill='%23070c12' fill-opacity='.7'/%3E%3Ccircle cx='73' cy='701' r='1.8' fill='%233a5772'/%3E%3Crect x='76' y='712' width='34' height='4' rx='1' fill='%23335070'/%3E%3Crect x='76' y='722' width='26' height='3' rx='1' fill='%232a4159'/%3E%3Crect x='76' y='730' width='32' height='3' rx='1' fill='%232a4159'/%3E%3Crect x='76' y='738' width='22' height='3' rx='1' fill='%232a4159'/%3E%3Crect x='76' y='746' width='28' height='3' rx='1' fill='%232a4159'/%3E%3Cg fill='%23486a86'%3E%3Crect x='61' y='702' width='6' height='2.6'/%3E%3Crect x='61' y='710' width='6' height='2.6'/%3E%3Crect x='61' y='718' width='6' height='2.6'/%3E%3Crect x='61' y='726' width='6' height='2.6'/%3E%3Crect x='61' y='734' width='6' height='2.6'/%3E%3Crect x='61' y='742' width='6' height='2.6'/%3E%3Crect x='61' y='750' width='6' height='2.6'/%3E%3Crect x='117' y='702' width='6' height='2.6'/%3E%3Crect x='117' y='712' width='6' height='2.6'/%3E%3Crect x='117' y='722' width='6' height='2.6'/%3E%3Crect x='117' y='734' width='6' height='2.6'/%3E%3Crect x='117' y='746' width='6' height='2.6'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3Crect x='34' y='604' width='18' height='11' rx='1.5' fill='%23182230' stroke='%2330465e' stroke-width='.8'/%3E%3Crect x='37' y='606.5' width='3' height='6' fill='url(%23lgf)'/%3E%3Crect x='45' y='606.5' width='3' height='6' fill='url(%23lgf)'/%3E%3C/g%3E%3Cg fill='%2324313f' stroke='%23466480' stroke-width='1'%3E%3Ccircle cx='58' cy='400' r='5'/%3E%3Ccircle cx='40' cy='540' r='5'/%3E%3Ccircle cx='128' cy='620' r='5'/%3E%3Ccircle cx='104' cy='560' r='4.5'/%3E%3Ccircle cx='20' cy='700' r='4.5'/%3E%3C/g%3E%3Cg fill='%23bcd6ea' fill-opacity='.45'%3E%3Ccircle cx='56.4' cy='398.4' r='1.3'/%3E%3Ccircle cx='38.4' cy='538.4' r='1.3'/%3E%3Ccircle cx='126.4' cy='618.4' r='1.2'/%3E%3C/g%3E%3Ccircle cx='40' cy='696' r='13' fill='url(%23lvia2)'/%3E%3Ccircle cx='40' cy='696' r='4.5' fill='%23132018' stroke='%237ee787' stroke-opacity='.55' stroke-width='1.3'/%3E%3Ccircle cx='40' cy='696' r='1.8' fill='%237ee787' fill-opacity='.8'/%3E%3Ccircle cx='58' cy='480' r='20' fill='url(%23lvia)'/%3E%3Ccircle cx='58' cy='480' r='6.5' fill='%23132018' stroke='%237ee787' stroke-opacity='.75' stroke-width='1.6'/%3E%3Ccircle cx='58' cy='480' r='3' fill='%237ee787' fill-opacity='.95'/%3E%3Ccircle cx='56.6' cy='478.6' r='1.2' fill='%23eaffee'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='210' height='940' viewBox='0 0 210 940'%3E%3Cdefs%3E%3CradialGradient id='rvia' cx='0.5' cy='0.5' r='0.5'%3E%3Cstop offset='0' stop-color='%2379c0ff' stop-opacity='.7'/%3E%3Cstop offset='1' stop-color='%2379c0ff' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='rvia2' cx='0.5' cy='0.5' r='0.5'%3E%3Cstop offset='0' stop-color='%2379c0ff' stop-opacity='.5'/%3E%3Cstop offset='1' stop-color='%2379c0ff' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='rgf' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23f4d98a'/%3E%3Cstop offset='.5' stop-color='%23c9a24a'/%3E%3Cstop offset='1' stop-color='%238a6c2c'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%2379c0ff' fill-opacity='.045'%3E%3Crect x='108' y='740' width='90' height='200'/%3E%3C/g%3E%3Cg stroke='%2379c0ff' stroke-opacity='.055' stroke-width='1'%3E%3Cpath d='M112 760 L196 760 M112 775 L196 775 M112 790 L196 790 M112 805 L196 805 M112 820 L196 820 M112 835 L196 835'/%3E%3C/g%3E%3Cg fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cg stroke='%231a2634' stroke-width='5'%3E%3Cpath d='M150 940 L150 220'/%3E%3Cpath d='M180 940 L180 700 L154 674 L154 540'/%3E%3Cpath d='M112 940 L112 820 L138 792 L138 700'/%3E%3Cpath d='M196 940 L196 760 L172 736 L172 600'/%3E%3Cpath d='M128 940 L128 700 L106 678 L106 560'/%3E%3Cpath d='M150 400 L120 400 L104 414'/%3E%3C/g%3E%3Cg stroke='%234a708c' stroke-width='2'%3E%3Cpath d='M150 940 L150 220'/%3E%3Cpath d='M180 940 L180 700 L154 674 L154 540' stroke-opacity='.8'/%3E%3Cpath d='M112 940 L112 820 L138 792 L138 700' stroke-opacity='.7'/%3E%3Cpath d='M196 940 L196 760 L172 736 L172 600' stroke-opacity='.6'/%3E%3Cpath d='M128 940 L128 700 L106 678 L106 560' stroke-opacity='.55'/%3E%3Cpath d='M150 400 L120 400 L104 414' stroke-opacity='.7'/%3E%3C/g%3E%3Cg stroke='%23aecbe0' stroke-width='.7'%3E%3Cpath d='M150 940 L150 220' stroke-opacity='.5'/%3E%3Cpath d='M180 700 L154 674 L154 540' stroke-opacity='.42'/%3E%3Cpath d='M112 820 L138 792 L138 700' stroke-opacity='.4'/%3E%3C/g%3E%3Cg stroke='%23233241' stroke-width='2.4'%3E%3Cpath d='M78 940 L78 860 L96 842'/%3E%3Cpath d='M196 940 L196 890'/%3E%3Cpath d='M92 940 L92 902'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3Crect x='90' y='604' width='60' height='50' rx='3' fill='%23141d29' stroke='%2334506a' stroke-width='1.2'/%3E%3Crect x='91' y='605' width='58' height='2.5' rx='1' fill='%235a7ea0' fill-opacity='.7'/%3E%3Crect x='91' y='651' width='58' height='2' rx='1' fill='%23070c12' fill-opacity='.7'/%3E%3Ccircle cx='97' cy='611' r='1.8' fill='%233a5772'/%3E%3Crect x='100' y='614' width='42' height='5' rx='1' fill='%23335070'/%3E%3Crect x='100' y='624' width='34' height='3' rx='1' fill='%232a4159'/%3E%3Crect x='100' y='632' width='40' height='3' rx='1' fill='%232a4159'/%3E%3Crect x='100' y='640' width='28' height='3' rx='1' fill='%232a4159'/%3E%3Cg fill='%23486a86'%3E%3Crect x='85' y='610' width='6' height='2.6'/%3E%3Crect x='85' y='620' width='6' height='2.6'/%3E%3Crect x='85' y='630' width='6' height='2.6'/%3E%3Crect x='85' y='640' width='6' height='2.6'/%3E%3Crect x='149' y='610' width='6' height='2.6'/%3E%3Crect x='149' y='622' width='6' height='2.6'/%3E%3Crect x='149' y='634' width='6' height='2.6'/%3E%3Crect x='149' y='646' width='6' height='2.6'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3Crect x='156' y='498' width='11' height='19' rx='1.5' fill='%23182230' stroke='%2330465e' stroke-width='.8'/%3E%3Crect x='158.5' y='500.5' width='6' height='3' fill='url(%23rgf)'/%3E%3Crect x='158.5' y='509.5' width='6' height='3' fill='url(%23rgf)'/%3E%3C/g%3E%3Cg fill='%2324313f' stroke='%23466480' stroke-width='1'%3E%3Ccircle cx='150' cy='220' r='5'/%3E%3Ccircle cx='154' cy='540' r='5'/%3E%3Ccircle cx='138' cy='700' r='5'/%3E%3Ccircle cx='172' cy='600' r='4.5'/%3E%3Ccircle cx='106' cy='560' r='4.5'/%3E%3C/g%3E%3Cg fill='%23bcd6ea' fill-opacity='.45'%3E%3Ccircle cx='148.4' cy='218.4' r='1.3'/%3E%3Ccircle cx='152.4' cy='538.4' r='1.3'/%3E%3Ccircle cx='136.4' cy='698.4' r='1.2'/%3E%3C/g%3E%3Cg fill='url(%23rgf)'%3E%3Crect x='166' y='902' width='6' height='38'/%3E%3Crect x='176' y='902' width='6' height='38'/%3E%3Crect x='186' y='902' width='6' height='38'/%3E%3Crect x='196' y='902' width='6' height='38'/%3E%3C/g%3E%3Ccircle cx='138' cy='700' r='13' fill='url(%23rvia2)'/%3E%3Ccircle cx='138' cy='700' r='4.5' fill='%23111c26' stroke='%2379c0ff' stroke-opacity='.55' stroke-width='1.3'/%3E%3Ccircle cx='138' cy='700' r='1.8' fill='%2379c0ff' fill-opacity='.8'/%3E%3Ccircle cx='150' cy='400' r='20' fill='url(%23rvia)'/%3E%3Ccircle cx='150' cy='400' r='6.5' fill='%23111c26' stroke='%2379c0ff' stroke-opacity='.75' stroke-width='1.6'/%3E%3Ccircle cx='150' cy='400' r='3' fill='%2379c0ff' fill-opacity='.95'/%3E%3Ccircle cx='148.6' cy='398.6' r='1.2' fill='%23eaf4ff'/%3E%3C/svg%3E");
}


/* ═══ tmux status bar — holds the bottom edge, out of the lane (body's
   mask fades names before they reach it). ::before is the bar chrome +
   left window list; ::after is the right status segment. STATIC. ═══ */
head { display: var(--pwned-scenery, block); }
head::before {
  content: "                  0:recon  1:exploit*  2:loot  3:flags";
  display: var(--pwned-scenery, block);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 30px;
  z-index: 2;
  pointer-events: none;
  box-sizing: border-box;
  padding-left: 0;
  font-family: "JetBrains Mono", ui-monospace, Menlo, Consolas, monospace;
  font-size: 12.5px;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: 0.02em;
  text-align: left;
  white-space: pre;
  color: rgba(126, 231, 135, 0.82);
  background-color: #161b22;
  background-repeat: no-repeat;
  background-position: left top, left top;
  background-size: auto 30px, 100% 100%;
  /* powerline session block — "ctf-finals" baked dark on the green segment
     with a chevron tail, plus a soft base wash so the bar reads as a real
     tmux status line, not a flat strip. The window list starts after the
     block (leading spaces clear it). ═ */
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='130' height='30' viewBox='0 0 130 30'%3E%3Crect width='112' height='30' fill='%237ee787'/%3E%3Cpath d='M112 0 L127 15 L112 30 Z' fill='%237ee787'/%3E%3Crect width='112' height='1.5' fill='%23b6f5bb'/%3E%3Crect y='28.5' width='112' height='1.5' fill='%2352b862'/%3E%3Ctext x='12' y='20' font-family='ui-monospace,Menlo,monospace' font-size='13' font-weight='700' fill='%230b1410'%3Ectf-finals%3C/text%3E%3C/svg%3E"),
    linear-gradient(180deg, #1c232d 0%, #161b22 55%, #131920 100%);
  border-top: 1px solid #3a4656;
  box-shadow: inset 0 1px 0 rgba(126, 231, 135, 0.05);
  text-shadow: none;
}
head::after {
  content: "root@pwnbox  10.13.37.7 · utf-8            ";
  display: var(--pwned-scenery, block);
  position: fixed;
  right: 0;
  bottom: 0;
  height: 30px;
  z-index: 3;
  pointer-events: none;
  padding-right: 14px;
  font-family: "JetBrains Mono", ui-monospace, Menlo, Consolas, monospace;
  font-size: 12.5px;
  line-height: 30px;
  letter-spacing: 0.02em;
  white-space: pre;
  color: var(--pwned-dim);
  background-repeat: no-repeat;
  background-position: right top;
  background-size: auto 30px;
  /* right powerline: a chevron head opening a dark-green clock segment with
     "23:59:59" baked in — mirrors the left session block so the bar reads
     balanced end to end */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='108' height='30' viewBox='0 0 108 30'%3E%3Cpath d='M14 0 L0 15 L14 30 Z' fill='%231d3324'/%3E%3Crect x='14' width='94' height='30' fill='%231d3324'/%3E%3Crect x='14' width='94' height='1.5' fill='%232f5238'/%3E%3Ctext x='28' y='20' font-family='ui-monospace,Menlo,monospace' font-size='13' font-weight='700' fill='%237ee787'%3E23:59:59%3C/text%3E%3C/svg%3E");
  text-shadow: none;
}

/* ═══ scoreboard chip, top-right — the live leaderboard, and of course
   team_pwned holds #1. Baked as one SVG so it can be a REAL three-place
   board with depth: a gold header strip (beveled medal with a specular
   arc + a "SCOREBOARD" label + a LIVE tag), then the #1 row lit bright on
   a green highlight plate with a gold rank badge, and 2nd/3rd rows fading
   back (dimmer text, cooler, no plate — atmospheric perspective inside the
   panel so the eye reads a stack receding, not three equal pills). A green
   left accent bar and green ambient glow sell "lit leaderboard". The LIVE
   dot pulses on a slow steps() clock. ═══ */
head meta { display: var(--pwned-scenery, block); }
head meta:first-of-type::before {
  content: "";
  display: var(--pwned-scenery, block);
  position: fixed;
  top: 20px;
  right: 22px;
  width: 224px;
  height: 132px;
  z-index: 2;
  pointer-events: none;
  box-sizing: border-box;
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: top left;
  background-size: 224px 132px;
  /* whole leaderboard baked: header (medal + label + LIVE) · #1 lit plate ·
     #2 / #3 receding rows · left accent bar · glass sheen */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='224' height='132' viewBox='0 0 224 132'%3E%3Cdefs%3E%3ClinearGradient id='sb-body' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23161d27'/%3E%3Cstop offset='1' stop-color='%230f151e'/%3E%3C/linearGradient%3E%3ClinearGradient id='sb-hdr' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23342c18'/%3E%3Cstop offset='1' stop-color='%23241d10'/%3E%3C/linearGradient%3E%3CradialGradient id='medal' cx='0.35' cy='0.3' r='0.8'%3E%3Cstop offset='0' stop-color='%23ffe9a8'/%3E%3Cstop offset='.5' stop-color='%23d9b24e'/%3E%3Cstop offset='1' stop-color='%238f6a1f'/%3E%3C/radialGradient%3E%3ClinearGradient id='plate' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%237ee787' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%237ee787' stop-opacity='.02'/%3E%3C/linearGradient%3E%3CradialGradient id='sb-sheen' cx='0.1' cy='0.05' r='0.6'%3E%3Cstop offset='0' stop-color='%23cfe6ff' stop-opacity='.1'/%3E%3Cstop offset='1' stop-color='%23cfe6ff' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect x='.5' y='.5' width='223' height='131' rx='9' fill='url(%23sb-body)' stroke='%23394a5c' stroke-width='1'/%3E%3Cpath d='M1 10 a9 9 0 0 1 9 -9 h204 a9 9 0 0 1 9 9 v18 h-222 z' fill='url(%23sb-hdr)'/%3E%3Crect x='1' y='28' width='222' height='1' fill='%23c9a24a' fill-opacity='.4'/%3E%3Crect x='1' y='1' width='3' height='130' fill='%237ee787' fill-opacity='.55'/%3E%3Ccircle cx='18' cy='15' r='8' fill='url(%23medal)'/%3E%3Cpath d='M12 11 a8 8 0 0 1 11 -1' fill='none' stroke='%23fff4d0' stroke-opacity='.7' stroke-width='1.2'/%3E%3Ctext x='18' y='19' font-family='ui-monospace,Menlo,monospace' font-size='10' font-weight='700' fill='%23372a0a' text-anchor='middle'%3E1%3C/text%3E%3Ctext x='34' y='19' font-family='ui-monospace,Menlo,monospace' font-size='10.5' font-weight='700' fill='%23f0d488' letter-spacing='2'%3ESCOREBOARD%3C/text%3E%3Ctext x='195' y='19' font-family='ui-monospace,Menlo,monospace' font-size='8' font-weight='700' fill='%237ee787' letter-spacing='1.5'%3ELIVE%3C/text%3E%3Crect x='7' y='36' width='210' height='28' rx='5' fill='url(%23plate)'/%3E%3Crect x='7' y='36' width='2.5' height='28' rx='1' fill='%237ee787' fill-opacity='.8'/%3E%3Ctext x='16' y='54' font-family='ui-monospace,Menlo,monospace' font-size='11' font-weight='700' fill='%23c9a24a'%3E1%3C/text%3E%3Ctext x='30' y='54' font-family='ui-monospace,Menlo,monospace' font-size='12' font-weight='700' fill='%237ee787'%3Eteam_pwned%3C/text%3E%3Ctext x='210' y='54' font-family='ui-monospace,Menlo,monospace' font-size='11.5' font-weight='700' fill='%23e6edf3' text-anchor='end'%3E13,337%3C/text%3E%3Ctext x='16' y='84' font-family='ui-monospace,Menlo,monospace' font-size='11' font-weight='500' fill='%235b6775'%3E2%3C/text%3E%3Ctext x='30' y='84' font-family='ui-monospace,Menlo,monospace' font-size='11.5' fill='%238b949e'%3Eroot_cause%3C/text%3E%3Ctext x='210' y='84' font-family='ui-monospace,Menlo,monospace' font-size='11' fill='%237d8896' text-anchor='end'%3E11,204%3C/text%3E%3Ctext x='16' y='108' font-family='ui-monospace,Menlo,monospace' font-size='11' font-weight='500' fill='%234c5763'%3E3%3C/text%3E%3Ctext x='30' y='108' font-family='ui-monospace,Menlo,monospace' font-size='11.5' fill='%236b7682'%3Eseg_fault%3C/text%3E%3Ctext x='210' y='108' font-family='ui-monospace,Menlo,monospace' font-size='11' fill='%235f6975' text-anchor='end'%3E9,981%3C/text%3E%3Crect x='14' y='120' width='196' height='1' fill='%232a3644'/%3E%3Ctext x='16' y='127' font-family='ui-monospace,Menlo,monospace' font-size='7.5' fill='%235f6975' letter-spacing='1'%3E38 TEAMS %C2%B7 4 FLAGS LEFT%3C/text%3E%3Crect x='1.5' y='1.5' width='221' height='129' rx='8' fill='url(%23sb-sheen)'/%3E%3Crect x='10' y='2.4' width='96' height='1' rx='.5' fill='%23eaf4ff' fill-opacity='.4'/%3E%3Ccircle cx='14.5' cy='11.5' r='2.4' fill='%23fff8e0' fill-opacity='.5'/%3E%3C/svg%3E");
  border-radius: 9px;
  box-shadow:
    0 18px 40px rgba(0, 2, 6, 0.58),
    0 4px 12px rgba(0, 2, 6, 0.5),
    0 0 34px rgba(126, 231, 135, 0.06);
}
head meta:first-of-type::after {
  content: "";
  display: var(--pwned-scenery, block);
  position: fixed;
  top: 29px;
  right: 66px;
  width: 5px;
  height: 5px;
  z-index: 3;
  pointer-events: none;
  border-radius: 50%;
  background: var(--pwned-green);
  box-shadow: 0 0 8px rgba(126, 231, 135, 0.9), 0 0 2px rgba(230, 255, 233, 0.9);
  animation: pwned-live 2.4s steps(1, end) infinite;
}

/* ═══ exploit pane, top-left — THE hero fiction block, drawn as a full
   IDE terminal window. Everything is baked into one SVG so the code can
   carry real multi-color syntax highlighting (green prompt, orange flags,
   blue paths, red CVE, purple keywords) that a CSS content string — one
   color only — could never give. The window has: a macOS title bar BEVELED
   traffic lights (each button a tiny sphere: rim + specular hotspot), an
   "exploit.py — zsh" tab, a line-number gutter with a subtle divider rule,
   eight syntax-lit code rows telling the privesc story, and a git-branch
   status footer (branch chip + ahead/behind + a red "compromised" tag).
   A curved-glass specular sheen rakes the top-left corner. Fixed size so
   the SVG maps 1:1 and the blinking block cursor lands on the # prompt.
   L6-safe corner placement. ═══ */
head meta:last-of-type::before {
  content: "";
  display: var(--pwned-scenery, block);
  position: fixed;
  top: 22px;
  left: 22px;
  width: 336px;
  height: 226px;
  z-index: 2;
  pointer-events: none;
  box-sizing: border-box;
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: top left;
  background-size: 336px 226px;
  /* full window baked as one SVG: title bar (beveled lights + tab) · line
     gutter · syntax-lit privesc log · git status footer · glass sheen */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='336' height='226' viewBox='0 0 336 226'%3E%3Cdefs%3E%3ClinearGradient id='bar' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23283340'/%3E%3Cstop offset='.5' stop-color='%231d2530'/%3E%3Cstop offset='1' stop-color='%23151c25'/%3E%3C/linearGradient%3E%3ClinearGradient id='body' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23111823'/%3E%3Cstop offset='1' stop-color='%230b1019'/%3E%3C/linearGradient%3E%3ClinearGradient id='gut' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23121a25'/%3E%3Cstop offset='1' stop-color='%230d141d'/%3E%3C/linearGradient%3E%3CradialGradient id='sheen' cx='0.12' cy='0.06' r='0.7'%3E%3Cstop offset='0' stop-color='%23cfe6ff' stop-opacity='.12'/%3E%3Cstop offset='.4' stop-color='%23cfe6ff' stop-opacity='.03'/%3E%3Cstop offset='1' stop-color='%23cfe6ff' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='tl-r' cx='0.35' cy='0.3' r='0.75'%3E%3Cstop offset='0' stop-color='%23ff9d97'/%3E%3Cstop offset='.55' stop-color='%23ff5f57'/%3E%3Cstop offset='1' stop-color='%23c1352f'/%3E%3C/radialGradient%3E%3CradialGradient id='tl-y' cx='0.35' cy='0.3' r='0.75'%3E%3Cstop offset='0' stop-color='%23ffe08a'/%3E%3Cstop offset='.55' stop-color='%23febc2e'/%3E%3Cstop offset='1' stop-color='%23c68a17'/%3E%3C/radialGradient%3E%3CradialGradient id='tl-g' cx='0.35' cy='0.3' r='0.75'%3E%3Cstop offset='0' stop-color='%238bf29b'/%3E%3Cstop offset='.55' stop-color='%2328c840'/%3E%3Cstop offset='1' stop-color='%23169a2c'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect x='.5' y='.5' width='335' height='225' rx='10' fill='url(%23body)' stroke='%23394a5c' stroke-width='1'/%3E%3Cpath d='M1 11 a10 10 0 0 1 10 -10 h314 a10 10 0 0 1 10 10 v20 h-334 z' fill='url(%23bar)'/%3E%3Crect x='1' y='30' width='334' height='1' fill='%23090d13'/%3E%3Crect x='1' y='31' width='334' height='1' fill='%233a4a5c' fill-opacity='.35'/%3E%3Ccircle cx='19' cy='16' r='6' fill='url(%23tl-r)'/%3E%3Ccircle cx='17' cy='14' r='1.7' fill='%23ffd7d3' fill-opacity='.85'/%3E%3Ccircle cx='39' cy='16' r='6' fill='url(%23tl-y)'/%3E%3Ccircle cx='37' cy='14' r='1.7' fill='%23fff0c4' fill-opacity='.85'/%3E%3Ccircle cx='59' cy='16' r='6' fill='url(%23tl-g)'/%3E%3Ccircle cx='57' cy='14' r='1.7' fill='%23d4ffd9' fill-opacity='.85'/%3E%3Ctext x='168' y='20' font-family='ui-monospace,Menlo,monospace' font-size='11' fill='%238b949e' text-anchor='middle' letter-spacing='.5'%3E%E2%97%89 exploit.py %E2%80%94 zsh%3C/text%3E%3Crect x='1' y='32' width='30' height='168' fill='url(%23gut)'/%3E%3Cline x1='31' y1='32' x2='31' y2='200' stroke='%232a3947' stroke-width='1'/%3E%3Cg font-family='ui-monospace,Menlo,monospace' font-size='11' fill='%234a5b6d' text-anchor='end'%3E%3Ctext x='25' y='51'%3E1%3C/text%3E%3Ctext x='25' y='70'%3E2%3C/text%3E%3Ctext x='25' y='89'%3E3%3C/text%3E%3Ctext x='25' y='108'%3E4%3C/text%3E%3Ctext x='25' y='127'%3E5%3C/text%3E%3Ctext x='25' y='146'%3E6%3C/text%3E%3Ctext x='25' y='165'%3E7%3C/text%3E%3Ctext x='25' y='184'%3E8%3C/text%3E%3C/g%3E%3Cg font-family='ui-monospace,Menlo,monospace' font-size='11.5'%3E%3Ctext x='40' y='51'%3E%3Ctspan fill='%237ee787'%3E$%3C/tspan%3E%3Ctspan fill='%23e6edf3'%3E ./exploit.py %3C/tspan%3E%3Ctspan fill='%23ffa657'%3E--target%3C/tspan%3E%3Ctspan fill='%23a5d6ff'%3E flagship%3C/tspan%3E%3C/text%3E%3Ctext x='40' y='70'%3E%3Ctspan fill='%237ee787'%3E[+]%3C/tspan%3E%3Ctspan fill='%238b949e'%3E payload %3C/tspan%3E%3Ctspan fill='%23d2a8ff'%3Edelivered%3C/tspan%3E%3C/text%3E%3Ctext x='40' y='89'%3E%3Ctspan fill='%237ee787'%3E[+]%3C/tspan%3E%3Ctspan fill='%238b949e'%3E privesc %3C/tspan%3E%3Ctspan fill='%23ff7b72'%3ECVE-2026-1337%3C/tspan%3E%3Ctspan fill='%238b949e'%3E: %3C/tspan%3E%3Ctspan fill='%237ee787'%3Eok%3C/tspan%3E%3C/text%3E%3Ctext x='40' y='108'%3E%3Ctspan fill='%237ee787'%3E[+]%3C/tspan%3E%3Ctspan fill='%238b949e'%3E dumping %3C/tspan%3E%3Ctspan fill='%23a5d6ff'%3E/etc/shadow%3C/tspan%3E%3Ctspan fill='%238b949e'%3E %E2%86%92 %3C/tspan%3E%3Ctspan fill='%2379c0ff'%3E1874%3C/tspan%3E%3Ctspan fill='%238b949e'%3E rows%3C/tspan%3E%3C/text%3E%3Ctext x='40' y='127'%3E%3Ctspan fill='%237ee787'%3E[+]%3C/tspan%3E%3Ctspan fill='%238b949e'%3E bypass %3C/tspan%3E%3Ctspan fill='%23d2a8ff'%3Eevery %3C/tspan%3E%3Ctspan fill='%238b949e'%3Eguard%3C/tspan%3E%3C/text%3E%3Ctext x='40' y='146'%3E%3Ctspan fill='%23ffa657'%3E[!]%3C/tspan%3E%3Ctspan fill='%238b949e'%3E flag %3C/tspan%3E%3Ctspan fill='%237ee787'%3Efound%3C/tspan%3E%3Ctspan fill='%238b949e'%3E in %3C/tspan%3E%3Ctspan fill='%23a5d6ff'%3E./loot/%3C/tspan%3E%3C/text%3E%3Ctext x='40' y='165'%3E%3Ctspan fill='%237ee787' font-weight='700'%3E[+] root shell acquired%3C/tspan%3E%3C/text%3E%3Ctext x='40' y='184'%3E%3Ctspan fill='%237ee787'%3E%23%3C/tspan%3E%3C/text%3E%3C/g%3E%3Crect x='1' y='200' width='334' height='25' fill='%230c1420'/%3E%3Crect x='1' y='200' width='334' height='1' fill='%232a3947'/%3E%3Cpath d='M8 205 h56 l6 7 l-6 7 h-56 z' fill='%237ee787' fill-opacity='.14'/%3E%3Ctext x='13' y='216' font-family='ui-monospace,Menlo,monospace' font-size='10.5' fill='%237ee787'%3E%E2%8E%87 pwned%3C/text%3E%3Ctext x='84' y='217' font-family='ui-monospace,Menlo,monospace' font-size='10' fill='%238b949e'%3E%E2%86%915 %E2%86%930%3C/text%3E%3Ctext x='262' y='217' font-family='ui-monospace,Menlo,monospace' font-size='10' fill='%23ff7b72' letter-spacing='.5'%3ECOMPROMISED%3C/text%3E%3Ccircle cx='11' cy='85' r='4.6' fill='%23ff5f57' fill-opacity='.22'/%3E%3Ccircle cx='11' cy='85' r='2.7' fill='%23ff5f57'/%3E%3Ccircle cx='10.1' cy='84.1' r='.9' fill='%23ffd7d3' fill-opacity='.85'/%3E%3Crect x='321' y='32' width='14' height='168' fill='%230d141d'/%3E%3Cline x1='321' y1='32' x2='321' y2='200' stroke='%232a3947' stroke-width='1'/%3E%3Cg%3E%3Crect x='324' y='49' width='7' height='2' fill='%237ee787' fill-opacity='.55'/%3E%3Crect x='324' y='60' width='9' height='2' fill='%238b949e' fill-opacity='.4'/%3E%3Crect x='324' y='71' width='8' height='2' fill='%23ff7b72' fill-opacity='.55'/%3E%3Crect x='324' y='82' width='9' height='2' fill='%2379c0ff' fill-opacity='.5'/%3E%3Crect x='324' y='93' width='6' height='2' fill='%23d2a8ff' fill-opacity='.5'/%3E%3Crect x='324' y='104' width='8' height='2' fill='%23ffa657' fill-opacity='.55'/%3E%3Crect x='324' y='115' width='9' height='2' fill='%237ee787' fill-opacity='.6'/%3E%3Crect x='324' y='126' width='4' height='2' fill='%238b949e' fill-opacity='.4'/%3E%3Crect x='324' y='137' width='7' height='2' fill='%2379c0ff' fill-opacity='.4'/%3E%3Crect x='324' y='148' width='9' height='2' fill='%237ee787' fill-opacity='.5'/%3E%3Crect x='324' y='159' width='5' height='2' fill='%23d2a8ff' fill-opacity='.4'/%3E%3Crect x='324' y='170' width='8' height='2' fill='%238b949e' fill-opacity='.35'/%3E%3Crect x='324' y='181' width='6' height='2' fill='%237ee787' fill-opacity='.5'/%3E%3C/g%3E%3Crect x='321.5' y='140' width='13' height='38' fill='%23cfe6ff' fill-opacity='.07' stroke='%234a5b6d' stroke-opacity='.55' stroke-width='.6'/%3E%3Crect x='1.5' y='1.5' width='333' height='224' rx='9' fill='url(%23sheen)'/%3E%3Cpath d='M11 2 h150 q-70 6 -150 22 z' fill='%23eaf4ff' fill-opacity='.14'/%3E%3Crect x='11' y='2.4' width='120' height='1' rx='.5' fill='%23f2f8ff' fill-opacity='.5'/%3E%3C/svg%3E");
  border-radius: 10px;
  box-shadow:
    0 22px 50px rgba(0, 2, 6, 0.62),
    0 6px 16px rgba(0, 2, 6, 0.5),
    0 0 40px rgba(56, 139, 253, 0.05);
}
/* the block cursor rides the # prompt on the last code row (row 8).
   Aligned to the '#' cell: the SVG '#' baseline is y=184 (screen 206) with a
   ~10px cap; the cursor was 14px tall starting at 199 so it hung ~5px below the
   baseline and read misaligned. 197px + 11px seats it as a proper cell block
   bottom-aligned to the prompt. */
head meta:last-of-type::after {
  content: "";
  display: var(--pwned-scenery, block);
  position: fixed;
  top: 197px;
  left: 70px;
  width: 8px;
  height: 11px;
  z-index: 3;
  pointer-events: none;
  background: var(--pwned-green);
  box-shadow: 0 0 8px rgba(126, 231, 135, 0.7);
  animation: pwned-cursor 1.1s steps(1, end) infinite;
}

/* ═══ one packet exfiltrating up the right-edge trace — the ONLY
   continuous mover (6px mote, will-change budget: 1). It rides the long
   straight run the blue via sits on. ═══ */
body::before {
  content: "";
  display: var(--pwned-scenery, block);
  position: fixed;
  right: 57px;
  bottom: 40px;
  width: 6px;
  height: 6px;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  border-radius: 50%;
  background: var(--pwned-blue);
  box-shadow: 0 0 6px rgba(121, 192, 255, 0.8), 0 0 14px rgba(121, 192, 255, 0.4);
  will-change: transform;
  animation: pwned-packet 7s linear infinite;
}

/* ═══ the lane + CRT glass: a quiet dark scrim under the center column so
   flags stay readable over the bloom, PLUS the curved-glass read of the
   monitor — a soft specular sheen raking the top-left corner and a gentle
   anti-glare darkening in the far corners. All coarse, soft, STATIC —
   nothing here has fine structure, so it cannot flicker (L6). ═══ */
body::after {
  content: "";
  display: var(--pwned-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* glass specular: a broad soft sheen raking off the top-left, the way
       overhead venue light catches curved monitor glass */
    linear-gradient(128deg, rgba(214, 232, 255, 0.05) 0%, rgba(214, 232, 255, 0.018) 12%, rgba(214, 232, 255, 0) 30%),
    /* a second, cooler cross-sheen off the top-right for glass curvature */
    linear-gradient(212deg, rgba(150, 200, 255, 0.028) 0%, rgba(150, 200, 255, 0) 22%),
    /* anti-glare edge darkening (glass eats light at the bezel) */
    radial-gradient(ellipse 118% 108% at 50% 46%, rgba(4, 7, 12, 0) 62%, rgba(4, 7, 12, 0.28) 100%),
    /* the readability lane */
    linear-gradient(90deg,
      rgba(6, 9, 14, 0) 8%, rgba(6, 9, 14, 0.40) 28%, rgba(6, 9, 14, 0.48) 50%,
      rgba(6, 9, 14, 0.40) 72%, rgba(6, 9, 14, 0) 92%);
}

/* ═══ editor row-stripes — coarse alternate-line tint riding the roll
   (>= 40px bands, ~1.5% alpha: L6-legal even in the lane). The bands ride
   the roll so they scroll WITH the content (never a screen-fixed fine
   pattern), reinforcing the IDE read. ═══ */
.credits-roll::before,
.credits-slideshow::before {
  content: "";
  display: var(--pwned-scenery, block);
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: repeating-linear-gradient(180deg,
    rgba(201, 209, 217, 0.016) 0 3.25rem, rgba(201, 209, 217, 0) 3.25rem 6.5rem);
}

/* ═══ the submission log: every section is a job ═══ */
.credits-block,
.credits-slide:not(.flourish) { counter-increment: pwned-job; }

/* job eyebrow above each command */
.credits-block::before,
.credits-slide:not(.flourish)::before {
  content: "# job " counter(pwned-job, decimal-leading-zero) " · accepted";
  display: block;
  margin-bottom: 0.55rem;
  font-family: var(--credits-font);
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.32em;
  padding-left: 0.32em;
  color: var(--pwned-dim);
  opacity: 0.85;
}

/* syntax cycle — command + flag-brace color per section: blue, purple,
   orange (red is reserved for the finale). Intro is section 1, so the
   first block lands on 3n+2 = blue. Content-agnostic, custom types safe. */
.credits-block:nth-of-type(3n + 2),
.credits-slide:nth-of-type(3n + 2) {
  --pwned-syn: var(--pwned-blue);
  --pwned-cmd: '$ grep -ri "';
  --pwned-cmd-end: '" ./loot/';
}
.credits-block:nth-of-type(3n),
.credits-slide:nth-of-type(3n) {
  --pwned-syn: var(--pwned-purple);
  --pwned-cmd: '$ ./submit --category "';
  --pwned-cmd-end: '"';
}
.credits-block:nth-of-type(3n + 1),
.credits-slide:nth-of-type(3n + 1) {
  --pwned-syn: var(--pwned-orange);
  --pwned-cmd: '$ strings dump.bin | grep "';
  --pwned-cmd-end: '"';
}

/* ═══ titles: shell commands with syntax coloring. The dynamic title is
   the quoted search string; prefix/suffix carry the command around it. ═══ */
.credits-block__title {
  font-family: var(--credits-title-font);
  font-weight: 600;
  letter-spacing: 0.01em;
  text-transform: lowercase;
  color: var(--pwned-string);
  text-shadow: var(--credits-shadow);
  margin: 0 0 1.5rem;
}
.credits-block__title::before {
  content: var(--pwned-cmd, '$ grep -ri "');
  color: var(--pwned-syn, var(--pwned-blue));
  font-weight: 700;
}
/* reset the base gold rule, then use ::after as the command suffix */
.credits-block__title::after {
  content: var(--pwned-cmd-end, '" ./loot/');
  display: inline;
  width: auto;
  height: auto;
  margin: 0;
  background: none;
  opacity: 1;
  color: var(--pwned-dim);
  font-weight: 400;
}

/* ═══ rows: the flags. flag{Username} — braces in the section's syntax
   color, the handle itself in terminal green. Never clipped. ═══ */
.credit {
  max-width: min(46rem, 92vw);
  margin-inline: auto;
  min-width: 0;
  overflow-wrap: anywhere;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 1.6;
}
.credit__name {
  color: var(--pwned-green);
  text-shadow: 0 0 14px rgba(126, 231, 135, 0.14), var(--credits-shadow);
}
.credit__name::before {
  content: "flag{";
  color: var(--pwned-syn, var(--pwned-purple));
  font-weight: 400;
  opacity: 0.95;
}
.credit__name::after {
  content: "}";
  color: var(--pwned-syn, var(--pwned-purple));
  font-weight: 400;
  opacity: 0.95;
}
.credit__amount {
  opacity: 1;
  font-size: 0.76em;
  font-weight: 500;
  color: var(--pwned-blue);
  font-variant-numeric: tabular-nums;
}
.credit__amount::before { content: "  ["; color: var(--pwned-dim); }
.credit__amount::after { content: " pts]"; color: var(--pwned-dim); }

/* ═══ flourish cards ═══ */
.flourish--intro { gap: 1.2rem; }

/* badge -> the live event chip (copy swap via font-size:0 + ::after) */
.flourish__badge { font-size: 0; border: 0; border-radius: 0; padding: 0; box-shadow: none; }
.flourish__badge::after {
  content: "● live — capture the stream finals";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.78rem;
  letter-spacing: 0.3em;
  padding: 0.55em 1em 0.55em 1.3em;
  text-transform: uppercase;
  color: var(--pwned-green);
  background: rgba(126, 231, 135, 0.06);
  border: 1px solid rgba(126, 231, 135, 0.4);
  border-radius: 6px;
  text-shadow: 0 0 10px rgba(126, 231, 135, 0.4);
}

/* the streamer's title: gradient ident, mono 800, lit like glass — a soft
   blue ambient bloom + a dark contact drop so the letters sit on the panel
   rather than floating flat (the shadow renders behind the transparent
   fill, giving depth without touching the crisp gradient face) */
.flourish--intro .flourish__title {
  font-weight: 800;
  letter-spacing: -0.01em;
  line-height: 1.1;
  max-width: min(90vw, 14em);
  color: var(--pwned-blue);
  /* extruded-glass ident: a hot near-white specular at the very top edge
     (light from above) melting into the cool-blue face, then a purple bevel
     at the foot — reads as lit acrylic, not a flat gradient */
  background: linear-gradient(176deg,
    #f2f8ff 0%, #dcecff 8%, #9bd0ff 30%, #79c0ff 50%,
    #8fb8ff 70%, #b79bff 90%, #d2a8ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow:
    0 0 40px rgba(88, 166, 255, 0.30),
    0 0 14px rgba(121, 192, 255, 0.24),
    0 1px 0 rgba(210, 232, 255, 0.18),
    0 3px 20px rgba(2, 8, 20, 0.72);
}

/* streamer tagline: restyle only — a code comment */
.flourish__tagline {
  font-style: italic;
  font-size: 1rem;
  letter-spacing: 0.06em;
  color: var(--pwned-dim);
  opacity: 1;
}
.flourish__tagline::before { content: "# "; opacity: 0.7; }

/* rating -> id(1) output (copy swap) */
.flourish__rating { font-size: 0; border: 0; padding: 0; opacity: 1; }
.flourish__rating::after {
  content: "uid=0(root) gid=0(root) groups=0(root)";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 500;
  font-size: 0.74rem;
  letter-spacing: 0.14em;
  text-transform: none;
  padding: 0.5em 1em;
  color: var(--pwned-orange);
  border: 1px dashed rgba(139, 148, 158, 0.45);
  border-radius: 4px;
}

/* connection fine print */
.flourish--intro::after {
  content: "ssh -p 31337 · tls 1.3 · sha256:c0ffee… verified";
  display: var(--pwned-scenery, block);
  font-family: var(--credits-font);
  font-size: 0.66rem;
  letter-spacing: 0.28em;
  padding-left: 0.28em;
  color: rgba(139, 148, 158, 0.55);
}

/* outro: the remote host hangs up (copy swap) */
.flourish--outro::before {
  content: "[ process exited with code 0 ]";
  display: var(--pwned-scenery, block);
  font-family: var(--credits-font);
  font-size: 0.72rem;
  letter-spacing: 0.3em;
  padding-left: 0.3em;
  color: rgba(126, 231, 135, 0.6);
}
/* the finale needs a STAGE, not a floating word. gg gets a victory-bloom
   platform baked behind it: a broad soft green light disk (coarse, static —
   L6-safe) that reads as the flag-capture glow flooding the screen when the
   whole board finally falls. position: relative here only anchors the ::before
   stage — it stays in normal flow, so slideshow flex-centering is untouched
   (verified); the ONLY forbidden move is position:absolute/fixed on the
   subject, which we do NOT do. */
.flourish--outro .flourish__title {
  font-size: 0;
  position: relative;
  isolation: isolate;
}
/* the victory-bloom stage — a soft coarse radial disk + a laurel-bracket
   frame baked as one SVG, sitting behind gg. It is a decorative pseudo that
   does NOT drive layout (absolute, centred on the collapsed title box),
   large + soft, static → cannot flicker (L6). */
.flourish--outro .flourish__title::before {
  content: "";
  display: var(--pwned-scenery, block);
  position: absolute;
  left: 50%;
  top: 50%;
  width: 640px;
  height: 420px;
  transform: translate(-50%, -50%);
  z-index: -1;
  pointer-events: none;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%,
    min(560px, 84vw) auto;
  background-image:
    /* broad soft victory glow flooding out behind the word */
    radial-gradient(ellipse 50% 46% at 50% 46%, rgba(126, 231, 135, 0.16), rgba(110, 224, 207, 0.06) 44%, rgba(121, 192, 255, 0.02) 66%, rgba(121, 192, 255, 0) 82%),
    /* laurel brackets + a fine capture-ledger line, drawn once, coarse */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='300' viewBox='0 0 560 300'%3E%3Cg fill='none' stroke='%237ee787' stroke-opacity='.5' stroke-width='2.4' stroke-linecap='round'%3E%3Cpath d='M96 78 v-30 a12 12 0 0 1 12 -12 h34'/%3E%3Cpath d='M464 78 v-30 a12 12 0 0 0 -12 -12 h-34'/%3E%3Cpath d='M96 222 v30 a12 12 0 0 0 12 12 h34'/%3E%3Cpath d='M464 222 v30 a12 12 0 0 0 -12 12 h-34'/%3E%3C/g%3E%3Cg fill='%237ee787' fill-opacity='.85'%3E%3Ccircle cx='108' cy='36' r='2.6'/%3E%3Ccircle cx='452' cy='36' r='2.6'/%3E%3Ccircle cx='108' cy='264' r='2.6'/%3E%3Ccircle cx='452' cy='264' r='2.6'/%3E%3C/g%3E%3Cg fill='%236fe0cf' fill-opacity='.55'%3E%3Ccircle cx='140' cy='36' r='1.6'/%3E%3Ccircle cx='420' cy='36' r='1.6'/%3E%3C/g%3E%3C/svg%3E");
}
.flourish--outro .flourish__title::after {
  content: "gg";
  display: inline-block;
  position: relative;
  z-index: 1;
  text-transform: none;
  font-family: var(--credits-title-font);
  font-weight: 800;
  font-size: calc(var(--credits-flourish-title-size) * 1.42);
  letter-spacing: 0.02em;
  line-height: 1;
  color: var(--pwned-green);
  /* matching extruded-glass ident, green→cyan→blue: hot near-white spec at
     the top edge, terminal-green face, cooling to blue at the foot */
  background: linear-gradient(176deg,
    #f4fff6 0%, #c6ffce 10%, #7ee787 34%, #6fe0cf 62%,
    #8fd4ff 84%, #79c0ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow:
    0 0 64px rgba(126, 231, 135, 0.42),
    0 0 28px rgba(126, 231, 135, 0.34),
    0 0 12px rgba(110, 224, 207, 0.3),
    0 1px 0 rgba(210, 255, 220, 0.22),
    0 6px 30px rgba(2, 10, 6, 0.78);
}
.flourish--outro .flourish__tagline { font-size: 0; font-style: normal; }
.flourish--outro .flourish__tagline::before { content: none; }
.flourish--outro .flourish__tagline::after {
  content: "connection closed by remote host.";
  font-family: var(--credits-font);
  font-size: 0.95rem;
  letter-spacing: 0.18em;
  color: rgba(139, 148, 158, 0.9);
}
.flourish--outro::after {
  content: "❯ exit";
  display: var(--pwned-scenery, block);
  margin-top: 0.5rem;
  font-family: var(--credits-font);
  font-size: 0.78rem;
  letter-spacing: 0.22em;
  color: rgba(139, 148, 158, 0.55);
}

/* ═══ raid finale: root shell acquired — RAID INCOMING. The whole job
   goes red; the eyebrow blinks on a steps() clock (~1.25 paints/s, the
   only animation inside the roll; L5 ceiling is 2/s). ═══ */
.credits-block:nth-last-of-type(2),
.credits-slide:nth-last-of-type(2):not(.flourish) {
  --pwned-syn: var(--pwned-red);
  --pwned-cmd: '$ wall "';
  --pwned-cmd-end: '"';
}
.credits-block:nth-last-of-type(2) {
  padding: 1.4rem 1rem 1.9rem;
  border-radius: 14px;
  background:
    /* hot core of the klaxon */
    radial-gradient(ellipse 46% 50% at 50% 38%, rgba(255, 123, 114, 0.18), rgba(255, 123, 114, 0) 66%),
    /* broader red wash so the whole job glows alarm-red */
    radial-gradient(ellipse 72% 78% at 50% 42%, rgba(255, 92, 82, 0.10), rgba(180, 40, 34, 0) 78%),
    /* a faint dark plate under it so the red reads as lit, not washed */
    linear-gradient(180deg, rgba(30, 10, 10, 0.32), rgba(24, 8, 9, 0.16));
  box-shadow: inset 0 0 0 1px rgba(255, 123, 114, 0.14), inset 0 0 60px rgba(255, 90, 82, 0.06);
}
.credits-slide:nth-last-of-type(2):not(.flourish) {
  background:
    radial-gradient(ellipse 52% 48% at 50% 44%, rgba(255, 123, 114, 0.16), rgba(255, 123, 114, 0) 70%),
    radial-gradient(ellipse 80% 82% at 50% 46%, rgba(255, 92, 82, 0.09), rgba(180, 40, 34, 0) 82%);
}
.credits-block:nth-last-of-type(2)::before,
.credits-slide:nth-last-of-type(2):not(.flourish)::before {
  content: "[!] root shell acquired — RAID INCOMING";
  color: var(--pwned-red);
  opacity: 1;
  font-weight: 700;
  text-shadow: 0 0 12px rgba(255, 123, 114, 0.5), var(--credits-shadow);
  animation: pwned-alert 1.6s steps(1, end) infinite;
}
.credits-block:nth-last-of-type(2) .credits-block__title,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
  color: #ffd7d3;
  text-shadow: 0 0 18px rgba(255, 123, 114, 0.35), var(--credits-shadow);
}
.credits-block:nth-last-of-type(2) .credit,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit {
  font-size: calc(var(--credits-name-size) * 1.08);
}
.credits-block:nth-last-of-type(2) .credit__name,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__name {
  text-shadow: 0 0 16px rgba(255, 123, 114, 0.3), var(--credits-shadow);
}

/* ═══ slideshow: panes switch with a small settle ═══ */
.credits-slide {
  transform: translateY(10px);
  transition: opacity 0.7s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
.credits-slide.is-active { transform: none; }

/* ═══ keyframes (all pwned- prefixed; transform/opacity ONLY) ═══ */
/* block cursor: classic terminal blink (~1.8 paints/s, tiny element) */
@keyframes pwned-cursor {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
/* LIVE dot: slow confidence pulse */
@keyframes pwned-live {
  0%, 58% { opacity: 1; }
  59%, 100% { opacity: 0.35; }
}
/* raid alert eyebrow: 2 discrete dips per 1.6s */
@keyframes pwned-alert {
  0%, 54% { opacity: 1; }
  55%, 100% { opacity: 0.45; }
}
/* the packet: one mote exfiltrating up the right-edge trace, absorbed at
   the lit via (~41vh above its start on a 1080p frame) */
@keyframes pwned-packet {
  0% { transform: translate3d(0, 0, 0); opacity: 0; }
  6% { opacity: 0.9; }
  80% { opacity: 0.9; }
  90% { transform: translate3d(0, -41vh, 0); opacity: 0; }
  100% { transform: translate3d(0, -41vh, 0); opacity: 0; }
}

/* ═══ reduced motion: the workstation holds still — cursor parked solid,
   LIVE dot steady, the packet resting mid-trace, alert steady red ═══ */
@media (prefers-reduced-motion: reduce) {
  head meta:last-of-type::after { animation: none; opacity: 1; }
  head meta:first-of-type::after { animation: none; opacity: 1; }
  body::before { animation: none; opacity: 0.5; transform: translate3d(0, -28vh, 0); }
  .credits-block:nth-last-of-type(2)::before,
  .credits-slide:nth-last-of-type(2):not(.flourish)::before { animation: none; }
  .credits-slide { transform: none; transition: opacity 0.7s ease; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--pwned-scenery:none;}",
};
