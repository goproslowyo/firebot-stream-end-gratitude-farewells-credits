import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. Junglist: blackout-warehouse liquid DnB — acid-green signal graphics, waveform dividers riding the roll, pirate-radio corner HUD, sub-bass arcs throbbing on the halftime beat. */
export const VARIANT: ThemeVariant = {
  key: "dnb",
  name: "Junglist — Drum & Bass",
  css: `/* ================================================================
   JUNGLIST — DRUM & BASS (layered AFTER the base sheet)
   Fiction: a pirate-radio signal chain. Everything on <html>/<head>
   is the rig's HUD (crisp, unmasked, corner chrome); everything in
   <body> is the transmission itself. Fine signal graphics (waveform
   dividers, scope graticule) are attached INSIDE the roll so they
   move WITH the tracked text — zero relative slide, zero flicker.
   The only screen-fixed scenery is coarse + soft (sub-bass arcs,
   spectrum bridge, fog) or parked in corners, out of the text lane.
   Every animation is a steps() opacity hop locked to ONE clock:
   174 BPM halftime = 87 BPM = 1.379s per beat (2 hops = 1.45/s).
   Layer map (head is display:block; meta/link are void elements —
   they render nothing but donate fixed pseudos):
     html::before             sub-bass arcs, bottom (steps throb)
     html::after              BPM readout HUD, top-right (static)
     head::before             ON AIR chip, top-left (steps blink)
     head::after              SPECTRUM BRIDGE frame A — 24 coarse
                              soft bars across the deck, holds 1
                              beat then swaps (0.725 hops/s)
     meta:first-of-type::before  SPECTRUM frame B, opposite phase
     meta:first-of-type::after   MC shout chip 1 (left, out of lane)
     meta:last-of-type::before   MC shout chip 2 (right)
     meta:last-of-type::after    MC shout chip 3 (left, low)
     link::before             FAR fog + deck glow (static, promoted)
     body::before             NEAR fog wisps (steps(1) drift, 1 hop
                              per 4.8s — the depth pass)
     .credits-roll::before    scope graticule (rides the roll)
   Transparent collapse is ONE line (see transparentOverride):
   :root { --credits-bg: transparent; --dnb-scenery: none; }
   ================================================================ */
@import url('https://fonts.googleapis.com/css2?family=Saira+Stencil+One&family=Share+Tech+Mono&display=swap');

:root {
  /* -- palette: blackout warehouse + acid signal -- */
  --dnb-green: #b6ff2e;
  --dnb-teal: #22d3a6;
  --dnb-ink: #0b0f0a;
  --dnb-text: #e8ffe0;
  --dnb-dim: rgba(232, 255, 224, 0.55);
  --dnb-measure: min(32rem, 88vw);

  /* three oscilloscope waveform tiles (teal echo under a teal-to-acid
     gradient trace), cycled across dividers via nth-of-type so consecutive
     blocks never repeat the same squiggle; every path starts AND ends flat
     on the mid-line so each 170px tile repeats seamlessly.
     wave 1: spiky breakbeat transients */
  --dnb-wave: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='170' height='26' viewBox='0 0 170 26'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%2322d3a6'/%3E%3Cstop offset='.55' stop-color='%2373e766'/%3E%3Cstop offset='1' stop-color='%23b6ff2e'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M0 13 L14 13 18 9 23 17 28 13 38 13 42 4 46 22 50 2 54 24 58 13 72 13 78 10 85 16 91 13 104 13 108 6 112 20 116 13 129 13 135 11 143 15 149 13 170 13' fill='none' stroke='%2322d3a6' stroke-width='2' opacity='.4' transform='translate(2 3)'/%3E%3Cpath d='M0 13 L14 13 18 9 23 17 28 13 38 13 42 4 46 22 50 2 54 24 58 13 72 13 78 10 85 16 91 13 104 13 108 6 112 20 116 13 129 13 135 11 143 15 149 13 170 13' fill='none' stroke='url(%23g)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  /* wave 2: liquid sine rolls with one transient cluster */
  --dnb-wave2: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='170' height='26' viewBox='0 0 170 26'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%2322d3a6'/%3E%3Cstop offset='.55' stop-color='%2373e766'/%3E%3Cstop offset='1' stop-color='%23b6ff2e'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M0 13 L8 13 Q14 2 20 13 Q26 24 32 13 L46 13 Q52 5 58 13 Q64 21 70 13 L82 13 86 4 90 22 94 13 L108 13 Q114 3 120 13 Q126 23 132 13 L146 13 Q152 8 158 13 L170 13' fill='none' stroke='%2322d3a6' stroke-width='2' opacity='.4' transform='translate(2 3)'/%3E%3Cpath d='M0 13 L8 13 Q14 2 20 13 Q26 24 32 13 L46 13 Q52 5 58 13 Q64 21 70 13 L82 13 86 4 90 22 94 13 L108 13 Q114 3 120 13 Q126 23 132 13 L146 13 Q152 8 158 13 L170 13' fill='none' stroke='url(%23g)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  /* wave 3: square-gate LFO steps */
  --dnb-wave3: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='170' height='26' viewBox='0 0 170 26'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%2322d3a6'/%3E%3Cstop offset='.55' stop-color='%2373e766'/%3E%3Cstop offset='1' stop-color='%23b6ff2e'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M0 13 L12 13 12 6 24 6 24 20 36 20 36 13 52 13 52 3 62 3 62 23 72 23 72 13 90 13 90 8 102 8 102 18 114 18 114 13 130 13 130 5 138 5 138 21 146 21 146 13 170 13' fill='none' stroke='%2322d3a6' stroke-width='2' opacity='.4' transform='translate(2 3)'/%3E%3Cpath d='M0 13 L12 13 12 6 24 6 24 20 36 20 36 13 52 13 52 3 62 3 62 23 72 23 72 13 90 13 90 8 102 8 102 18 114 18 114 13 130 13 130 5 138 5 138 21 146 21 146 13 170 13' fill='none' stroke='url(%23g)' stroke-width='2' stroke-linejoin='miter'/%3E%3C/svg%3E");

  /* four interleaved bar-group tiles for the LIVE spectrum analyzer (see the
     SPECTRUM BRIDGE rule). Each tile holds 6 of the 24 bars (indices i%4 == k)
     at baked heights on a 960x200 box stretched to 100vw, with a per-bar acid
     gradient, inner sheen, a top glow bloom, and a baked peak-hold cap. Each
     tile is scaleY-pumped on its own clock so the composite reads like live
     audio -- never a static loop. */
  --dnb-bars1: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 960 200' preserveAspectRatio='none'%3E%3Cdefs%3E%3ClinearGradient id='b' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23f4ffcf'/%3E%3Cstop offset='.06' stop-color='%23d4ff5a'/%3E%3Cstop offset='.16' stop-color='%23b6ff2e'/%3E%3Cstop offset='.40' stop-color='%235fd857'/%3E%3Cstop offset='.66' stop-color='%231ba576'/%3E%3Cstop offset='.88' stop-color='%230e5f47'/%3E%3Cstop offset='1' stop-color='%230a3d30'/%3E%3C/linearGradient%3E%3ClinearGradient id='s' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23ffffff' stop-opacity='0'/%3E%3Cstop offset='.45' stop-color='%23ffffff' stop-opacity='.65'/%3E%3Cstop offset='.7' stop-color='%23eaffcf' stop-opacity='.25'/%3E%3Cstop offset='1' stop-color='%23ffffff' stop-opacity='0'/%3E%3C/linearGradient%3E%3CradialGradient id='h' cx='.5' cy='.5' r='.5'%3E%3Cstop offset='0' stop-color='%23c6ff5a' stop-opacity='.5'/%3E%3Cstop offset='.5' stop-color='%23b6ff2e' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23b6ff2e' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cg%3E%3Cellipse cx='20' cy='41.8' rx='30' ry='26' fill='url(%23h)'/%3E%3Cellipse cx='180' cy='90.2' rx='30' ry='26' fill='url(%23h)'/%3E%3Cellipse cx='340' cy='123.0' rx='30' ry='26' fill='url(%23h)'/%3E%3Cellipse cx='500' cy='91.8' rx='30' ry='26' fill='url(%23h)'/%3E%3Cellipse cx='660' cy='113.6' rx='30' ry='26' fill='url(%23h)'/%3E%3Cellipse cx='820' cy='135.4' rx='30' ry='26' fill='url(%23h)'/%3E%3C/g%3E%3Cg%3E%3Crect x='7' y='41.8' width='26' height='134.2' rx='4' fill='url(%23b)'/%3E%3Crect x='167' y='90.2' width='26' height='85.8' rx='4' fill='url(%23b)'/%3E%3Crect x='327' y='123.0' width='26' height='53.0' rx='4' fill='url(%23b)'/%3E%3Crect x='487' y='91.8' width='26' height='84.2' rx='4' fill='url(%23b)'/%3E%3Crect x='647' y='113.6' width='26' height='62.4' rx='4' fill='url(%23b)'/%3E%3Crect x='807' y='135.4' width='26' height='40.6' rx='4' fill='url(%23b)'/%3E%3C/g%3E%3Cg%3E%3Crect x='11' y='44.8' width='6' height='128.2' rx='3' fill='url(%23s)'/%3E%3Crect x='171' y='93.2' width='6' height='79.8' rx='3' fill='url(%23s)'/%3E%3Crect x='331' y='126.0' width='6' height='47.0' rx='3' fill='url(%23s)'/%3E%3Crect x='491' y='94.8' width='6' height='78.2' rx='3' fill='url(%23s)'/%3E%3Crect x='651' y='116.6' width='6' height='56.4' rx='3' fill='url(%23s)'/%3E%3Crect x='811' y='138.4' width='6' height='34.6' rx='3' fill='url(%23s)'/%3E%3C/g%3E%3Cg%3E%3Crect x='7' y='41.8' width='26' height='7' rx='3.5' fill='%23eaffc4'/%3E%3Crect x='7' y='30.8' width='26' height='4.5' rx='2.25' fill='%23f2ffd8'/%3E%3Crect x='167' y='90.2' width='26' height='7' rx='3.5' fill='%23eaffc4'/%3E%3Crect x='167' y='79.2' width='26' height='4.5' rx='2.25' fill='%23f2ffd8'/%3E%3Crect x='327' y='123.0' width='26' height='7' rx='3.5' fill='%23eaffc4'/%3E%3Crect x='327' y='112.0' width='26' height='4.5' rx='2.25' fill='%23f2ffd8'/%3E%3Crect x='487' y='91.8' width='26' height='7' rx='3.5' fill='%23eaffc4'/%3E%3Crect x='487' y='80.8' width='26' height='4.5' rx='2.25' fill='%23f2ffd8'/%3E%3Crect x='647' y='113.6' width='26' height='7' rx='3.5' fill='%23eaffc4'/%3E%3Crect x='647' y='102.6' width='26' height='4.5' rx='2.25' fill='%23f2ffd8'/%3E%3Crect x='807' y='135.4' width='26' height='7' rx='3.5' fill='%23eaffc4'/%3E%3Crect x='807' y='124.4' width='26' height='4.5' rx='2.25' fill='%23f2ffd8'/%3E%3C/g%3E%3C/svg%3E");
  --dnb-bars2: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 960 200' preserveAspectRatio='none'%3E%3Cdefs%3E%3ClinearGradient id='b' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23f4ffcf'/%3E%3Cstop offset='.06' stop-color='%23d4ff5a'/%3E%3Cstop offset='.16' stop-color='%23b6ff2e'/%3E%3Cstop offset='.40' stop-color='%235fd857'/%3E%3Cstop offset='.66' stop-color='%231ba576'/%3E%3Cstop offset='.88' stop-color='%230e5f47'/%3E%3Cstop offset='1' stop-color='%230a3d30'/%3E%3C/linearGradient%3E%3ClinearGradient id='s' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23ffffff' stop-opacity='0'/%3E%3Cstop offset='.45' stop-color='%23ffffff' stop-opacity='.65'/%3E%3Cstop offset='.7' stop-color='%23eaffcf' stop-opacity='.25'/%3E%3Cstop offset='1' stop-color='%23ffffff' stop-opacity='0'/%3E%3C/linearGradient%3E%3CradialGradient id='h' cx='.5' cy='.5' r='.5'%3E%3Cstop offset='0' stop-color='%23c6ff5a' stop-opacity='.5'/%3E%3Cstop offset='.5' stop-color='%23b6ff2e' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23b6ff2e' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cg%3E%3Cellipse cx='60' cy='23.1' rx='30' ry='26' fill='url(%23h)'/%3E%3Cellipse cx='220' cy='107.4' rx='30' ry='26' fill='url(%23h)'/%3E%3Cellipse cx='380' cy='129.2' rx='30' ry='26' fill='url(%23h)'/%3E%3Cellipse cx='540' cy='113.6' rx='30' ry='26' fill='url(%23h)'/%3E%3Cellipse cx='700' cy='88.6' rx='30' ry='26' fill='url(%23h)'/%3E%3Cellipse cx='860' cy='141.7' rx='30' ry='26' fill='url(%23h)'/%3E%3C/g%3E%3Cg%3E%3Crect x='47' y='23.1' width='26' height='152.9' rx='4' fill='url(%23b)'/%3E%3Crect x='207' y='107.4' width='26' height='68.6' rx='4' fill='url(%23b)'/%3E%3Crect x='367' y='129.2' width='26' height='46.8' rx='4' fill='url(%23b)'/%3E%3Crect x='527' y='113.6' width='26' height='62.4' rx='4' fill='url(%23b)'/%3E%3Crect x='687' y='88.6' width='26' height='87.4' rx='4' fill='url(%23b)'/%3E%3Crect x='847' y='141.7' width='26' height='34.3' rx='4' fill='url(%23b)'/%3E%3C/g%3E%3Cg%3E%3Crect x='51' y='26.1' width='6' height='146.9' rx='3' fill='url(%23s)'/%3E%3Crect x='211' y='110.4' width='6' height='62.6' rx='3' fill='url(%23s)'/%3E%3Crect x='371' y='132.2' width='6' height='40.8' rx='3' fill='url(%23s)'/%3E%3Crect x='531' y='116.6' width='6' height='56.4' rx='3' fill='url(%23s)'/%3E%3Crect x='691' y='91.6' width='6' height='81.4' rx='3' fill='url(%23s)'/%3E%3Crect x='851' y='144.7' width='6' height='28.3' rx='3' fill='url(%23s)'/%3E%3C/g%3E%3Cg%3E%3Crect x='47' y='23.1' width='26' height='7' rx='3.5' fill='%23eaffc4'/%3E%3Crect x='47' y='12.1' width='26' height='4.5' rx='2.25' fill='%23f2ffd8'/%3E%3Crect x='207' y='107.4' width='26' height='7' rx='3.5' fill='%23eaffc4'/%3E%3Crect x='207' y='96.4' width='26' height='4.5' rx='2.25' fill='%23f2ffd8'/%3E%3Crect x='367' y='129.2' width='26' height='7' rx='3.5' fill='%23eaffc4'/%3E%3Crect x='367' y='118.2' width='26' height='4.5' rx='2.25' fill='%23f2ffd8'/%3E%3Crect x='527' y='113.6' width='26' height='7' rx='3.5' fill='%23eaffc4'/%3E%3Crect x='527' y='102.6' width='26' height='4.5' rx='2.25' fill='%23f2ffd8'/%3E%3Crect x='687' y='88.6' width='26' height='7' rx='3.5' fill='%23eaffc4'/%3E%3Crect x='687' y='77.6' width='26' height='4.5' rx='2.25' fill='%23f2ffd8'/%3E%3Crect x='847' y='141.7' width='26' height='7' rx='3.5' fill='%23eaffc4'/%3E%3Crect x='847' y='130.7' width='26' height='4.5' rx='2.25' fill='%23f2ffd8'/%3E%3C/g%3E%3C/svg%3E");
  --dnb-bars3: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 960 200' preserveAspectRatio='none'%3E%3Cdefs%3E%3ClinearGradient id='b' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23f4ffcf'/%3E%3Cstop offset='.06' stop-color='%23d4ff5a'/%3E%3Cstop offset='.16' stop-color='%23b6ff2e'/%3E%3Cstop offset='.40' stop-color='%235fd857'/%3E%3Cstop offset='.66' stop-color='%231ba576'/%3E%3Cstop offset='.88' stop-color='%230e5f47'/%3E%3Cstop offset='1' stop-color='%230a3d30'/%3E%3C/linearGradient%3E%3ClinearGradient id='s' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23ffffff' stop-opacity='0'/%3E%3Cstop offset='.45' stop-color='%23ffffff' stop-opacity='.65'/%3E%3Cstop offset='.7' stop-color='%23eaffcf' stop-opacity='.25'/%3E%3Cstop offset='1' stop-color='%23ffffff' stop-opacity='0'/%3E%3C/linearGradient%3E%3CradialGradient id='h' cx='.5' cy='.5' r='.5'%3E%3Cstop offset='0' stop-color='%23c6ff5a' stop-opacity='.5'/%3E%3Cstop offset='.5' stop-color='%23b6ff2e' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23b6ff2e' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cg%3E%3Cellipse cx='100' cy='51.2' rx='30' ry='26' fill='url(%23h)'/%3E%3Cellipse cx='260' cy='98.0' rx='30' ry='26' fill='url(%23h)'/%3E%3Cellipse cx='420' cy='104.2' rx='30' ry='26' fill='url(%23h)'/%3E%3Cellipse cx='580' cy='123.0' rx='30' ry='26' fill='url(%23h)'/%3E%3Cellipse cx='740' cy='104.2' rx='30' ry='26' fill='url(%23h)'/%3E%3Cellipse cx='900' cy='147.9' rx='30' ry='26' fill='url(%23h)'/%3E%3C/g%3E%3Cg%3E%3Crect x='87' y='51.2' width='26' height='124.8' rx='4' fill='url(%23b)'/%3E%3Crect x='247' y='98.0' width='26' height='78.0' rx='4' fill='url(%23b)'/%3E%3Crect x='407' y='104.2' width='26' height='71.8' rx='4' fill='url(%23b)'/%3E%3Crect x='567' y='123.0' width='26' height='53.0' rx='4' fill='url(%23b)'/%3E%3Crect x='727' y='104.2' width='26' height='71.8' rx='4' fill='url(%23b)'/%3E%3Crect x='887' y='147.9' width='26' height='28.1' rx='4' fill='url(%23b)'/%3E%3C/g%3E%3Cg%3E%3Crect x='91' y='54.2' width='6' height='118.8' rx='3' fill='url(%23s)'/%3E%3Crect x='251' y='101.0' width='6' height='72.0' rx='3' fill='url(%23s)'/%3E%3Crect x='411' y='107.2' width='6' height='65.8' rx='3' fill='url(%23s)'/%3E%3Crect x='571' y='126.0' width='6' height='47.0' rx='3' fill='url(%23s)'/%3E%3Crect x='731' y='107.2' width='6' height='65.8' rx='3' fill='url(%23s)'/%3E%3Crect x='891' y='150.9' width='6' height='22.1' rx='3' fill='url(%23s)'/%3E%3C/g%3E%3Cg%3E%3Crect x='87' y='51.2' width='26' height='7' rx='3.5' fill='%23eaffc4'/%3E%3Crect x='87' y='40.2' width='26' height='4.5' rx='2.25' fill='%23f2ffd8'/%3E%3Crect x='247' y='98.0' width='26' height='7' rx='3.5' fill='%23eaffc4'/%3E%3Crect x='247' y='87.0' width='26' height='4.5' rx='2.25' fill='%23f2ffd8'/%3E%3Crect x='407' y='104.2' width='26' height='7' rx='3.5' fill='%23eaffc4'/%3E%3Crect x='407' y='93.2' width='26' height='4.5' rx='2.25' fill='%23f2ffd8'/%3E%3Crect x='567' y='123.0' width='26' height='7' rx='3.5' fill='%23eaffc4'/%3E%3Crect x='567' y='112.0' width='26' height='4.5' rx='2.25' fill='%23f2ffd8'/%3E%3Crect x='727' y='104.2' width='26' height='7' rx='3.5' fill='%23eaffc4'/%3E%3Crect x='727' y='93.2' width='26' height='4.5' rx='2.25' fill='%23f2ffd8'/%3E%3Crect x='887' y='147.9' width='26' height='7' rx='3.5' fill='%23eaffc4'/%3E%3Crect x='887' y='136.9' width='26' height='4.5' rx='2.25' fill='%23f2ffd8'/%3E%3C/g%3E%3C/svg%3E");
  --dnb-bars4: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 960 200' preserveAspectRatio='none'%3E%3Cdefs%3E%3ClinearGradient id='b' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23f4ffcf'/%3E%3Cstop offset='.06' stop-color='%23d4ff5a'/%3E%3Cstop offset='.16' stop-color='%23b6ff2e'/%3E%3Cstop offset='.40' stop-color='%235fd857'/%3E%3Cstop offset='.66' stop-color='%231ba576'/%3E%3Cstop offset='.88' stop-color='%230e5f47'/%3E%3Cstop offset='1' stop-color='%230a3d30'/%3E%3C/linearGradient%3E%3ClinearGradient id='s' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23ffffff' stop-opacity='0'/%3E%3Cstop offset='.45' stop-color='%23ffffff' stop-opacity='.65'/%3E%3Cstop offset='.7' stop-color='%23eaffcf' stop-opacity='.25'/%3E%3Cstop offset='1' stop-color='%23ffffff' stop-opacity='0'/%3E%3C/linearGradient%3E%3CradialGradient id='h' cx='.5' cy='.5' r='.5'%3E%3Cstop offset='0' stop-color='%23c6ff5a' stop-opacity='.5'/%3E%3Cstop offset='.5' stop-color='%23b6ff2e' stop-opacity='.18'/%3E%3Cstop offset='1' stop-color='%23b6ff2e' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cg%3E%3Cellipse cx='140' cy='73.0' rx='30' ry='26' fill='url(%23h)'/%3E%3Cellipse cx='300' cy='113.6' rx='30' ry='26' fill='url(%23h)'/%3E%3Cellipse cx='460' cy='82.4' rx='30' ry='26' fill='url(%23h)'/%3E%3Cellipse cx='620' cy='132.3' rx='30' ry='26' fill='url(%23h)'/%3E%3Cellipse cx='780' cy='126.1' rx='30' ry='26' fill='url(%23h)'/%3E%3Cellipse cx='940' cy='154.2' rx='30' ry='26' fill='url(%23h)'/%3E%3C/g%3E%3Cg%3E%3Crect x='127' y='73.0' width='26' height='103.0' rx='4' fill='url(%23b)'/%3E%3Crect x='287' y='113.6' width='26' height='62.4' rx='4' fill='url(%23b)'/%3E%3Crect x='447' y='82.4' width='26' height='93.6' rx='4' fill='url(%23b)'/%3E%3Crect x='607' y='132.3' width='26' height='43.7' rx='4' fill='url(%23b)'/%3E%3Crect x='767' y='126.1' width='26' height='49.9' rx='4' fill='url(%23b)'/%3E%3Crect x='927' y='154.2' width='26' height='21.8' rx='4' fill='url(%23b)'/%3E%3C/g%3E%3Cg%3E%3Crect x='131' y='76.0' width='6' height='97.0' rx='3' fill='url(%23s)'/%3E%3Crect x='291' y='116.6' width='6' height='56.4' rx='3' fill='url(%23s)'/%3E%3Crect x='451' y='85.4' width='6' height='87.6' rx='3' fill='url(%23s)'/%3E%3Crect x='611' y='135.3' width='6' height='37.7' rx='3' fill='url(%23s)'/%3E%3Crect x='771' y='129.1' width='6' height='43.9' rx='3' fill='url(%23s)'/%3E%3Crect x='931' y='157.2' width='6' height='15.8' rx='3' fill='url(%23s)'/%3E%3C/g%3E%3Cg%3E%3Crect x='127' y='73.0' width='26' height='7' rx='3.5' fill='%23eaffc4'/%3E%3Crect x='127' y='62.0' width='26' height='4.5' rx='2.25' fill='%23f2ffd8'/%3E%3Crect x='287' y='113.6' width='26' height='7' rx='3.5' fill='%23eaffc4'/%3E%3Crect x='287' y='102.6' width='26' height='4.5' rx='2.25' fill='%23f2ffd8'/%3E%3Crect x='447' y='82.4' width='26' height='7' rx='3.5' fill='%23eaffc4'/%3E%3Crect x='447' y='71.4' width='26' height='4.5' rx='2.25' fill='%23f2ffd8'/%3E%3Crect x='607' y='132.3' width='26' height='7' rx='3.5' fill='%23eaffc4'/%3E%3Crect x='607' y='121.3' width='26' height='4.5' rx='2.25' fill='%23f2ffd8'/%3E%3Crect x='767' y='126.1' width='26' height='7' rx='3.5' fill='%23eaffc4'/%3E%3Crect x='767' y='115.1' width='26' height='4.5' rx='2.25' fill='%23f2ffd8'/%3E%3Crect x='927' y='154.2' width='26' height='7' rx='3.5' fill='%23eaffc4'/%3E%3Crect x='927' y='143.2' width='26' height='4.5' rx='2.25' fill='%23f2ffd8'/%3E%3C/g%3E%3C/svg%3E");

  /* distant EQ echo: a dimmer, cooler, finer spectrum silhouette that sits
     BEHIND the main analyzer for spectral depth — atmospheric perspective
     (further back = lower contrast, cooler, hazier, no material). Painted
     into the far atmosphere layer, top-faded so it dissolves into haze. */
  --dnb-eqecho: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 960 200' preserveAspectRatio='none'%3E%3Cg fill='%23124f45'%3E%3Crect x='6.9' y='119' width='14' height='81' rx='2'/%3E%3Crect x='30.8' y='137' width='14' height='63' rx='2'/%3E%3Crect x='54.8' y='141' width='14' height='59' rx='2'/%3E%3Crect x='78.6' y='134' width='14' height='66' rx='2'/%3E%3Crect x='102.5' y='146' width='14' height='54' rx='2'/%3E%3Crect x='126.5' y='135' width='14' height='65' rx='2'/%3E%3Crect x='150.3' y='105' width='14' height='95' rx='2'/%3E%3Crect x='174.2' y='103' width='14' height='97' rx='2'/%3E%3Crect x='198.1' y='112' width='14' height='88' rx='2'/%3E%3Crect x='222.0' y='101' width='14' height='99' rx='2'/%3E%3Crect x='245.9' y='94' width='14' height='106' rx='2'/%3E%3Crect x='269.8' y='116' width='14' height='84' rx='2'/%3E%3Crect x='293.7' y='139' width='14' height='61' rx='2'/%3E%3Crect x='317.6' y='132' width='14' height='68' rx='2'/%3E%3Crect x='341.5' y='134' width='14' height='66' rx='2'/%3E%3Crect x='365.4' y='148' width='14' height='52' rx='2'/%3E%3Crect x='389.3' y='146' width='14' height='54' rx='2'/%3E%3Crect x='413.2' y='112' width='14' height='88' rx='2'/%3E%3Crect x='437.1' y='101' width='14' height='99' rx='2'/%3E%3Crect x='461.0' y='114' width='14' height='86' rx='2'/%3E%3Crect x='484.9' y='98' width='14' height='102' rx='2'/%3E%3Crect x='508.8' y='88' width='14' height='112' rx='2'/%3E%3Crect x='532.8' y='103' width='14' height='97' rx='2'/%3E%3Crect x='556.6' y='131' width='14' height='69' rx='2'/%3E%3Crect x='580.5' y='136' width='14' height='64' rx='2'/%3E%3Crect x='604.5' y='131' width='14' height='69' rx='2'/%3E%3Crect x='628.4' y='139' width='14' height='61' rx='2'/%3E%3Crect x='652.3' y='147' width='14' height='53' rx='2'/%3E%3Crect x='676.1' y='122' width='14' height='78' rx='2'/%3E%3Crect x='700.0' y='102' width='14' height='98' rx='2'/%3E%3Crect x='724.0' y='108' width='14' height='92' rx='2'/%3E%3Crect x='747.9' y='107' width='14' height='93' rx='2'/%3E%3Crect x='771.8' y='87' width='14' height='113' rx='2'/%3E%3Crect x='795.6' y='105' width='14' height='95' rx='2'/%3E%3Crect x='819.5' y='124' width='14' height='76' rx='2'/%3E%3Crect x='843.5' y='129' width='14' height='71' rx='2'/%3E%3Crect x='867.4' y='126' width='14' height='74' rx='2'/%3E%3Crect x='891.3' y='139' width='14' height='61' rx='2'/%3E%3Crect x='915.1' y='153' width='14' height='47' rx='2'/%3E%3Crect x='939.0' y='124' width='14' height='76' rx='2'/%3E%3C/g%3E%3Cg fill='%232a7a68' fill-opacity='.5'%3E%3Crect x='6.9' y='119' width='14' height='3' rx='1.5'/%3E%3Crect x='30.8' y='137' width='14' height='3' rx='1.5'/%3E%3Crect x='54.8' y='141' width='14' height='3' rx='1.5'/%3E%3Crect x='78.6' y='134' width='14' height='3' rx='1.5'/%3E%3Crect x='102.5' y='146' width='14' height='3' rx='1.5'/%3E%3Crect x='126.5' y='135' width='14' height='3' rx='1.5'/%3E%3Crect x='150.3' y='105' width='14' height='3' rx='1.5'/%3E%3Crect x='174.2' y='103' width='14' height='3' rx='1.5'/%3E%3Crect x='198.1' y='112' width='14' height='3' rx='1.5'/%3E%3Crect x='222.0' y='101' width='14' height='3' rx='1.5'/%3E%3Crect x='245.9' y='94' width='14' height='3' rx='1.5'/%3E%3Crect x='269.8' y='116' width='14' height='3' rx='1.5'/%3E%3Crect x='293.7' y='139' width='14' height='3' rx='1.5'/%3E%3Crect x='317.6' y='132' width='14' height='3' rx='1.5'/%3E%3Crect x='341.5' y='134' width='14' height='3' rx='1.5'/%3E%3Crect x='365.4' y='148' width='14' height='3' rx='1.5'/%3E%3Crect x='389.3' y='146' width='14' height='3' rx='1.5'/%3E%3Crect x='413.2' y='112' width='14' height='3' rx='1.5'/%3E%3Crect x='437.1' y='101' width='14' height='3' rx='1.5'/%3E%3Crect x='461.0' y='114' width='14' height='3' rx='1.5'/%3E%3Crect x='484.9' y='98' width='14' height='3' rx='1.5'/%3E%3Crect x='508.8' y='88' width='14' height='3' rx='1.5'/%3E%3Crect x='532.8' y='103' width='14' height='3' rx='1.5'/%3E%3Crect x='556.6' y='131' width='14' height='3' rx='1.5'/%3E%3Crect x='580.5' y='136' width='14' height='3' rx='1.5'/%3E%3Crect x='604.5' y='131' width='14' height='3' rx='1.5'/%3E%3Crect x='628.4' y='139' width='14' height='3' rx='1.5'/%3E%3Crect x='652.3' y='147' width='14' height='3' rx='1.5'/%3E%3Crect x='676.1' y='122' width='14' height='3' rx='1.5'/%3E%3Crect x='700.0' y='102' width='14' height='3' rx='1.5'/%3E%3Crect x='724.0' y='108' width='14' height='3' rx='1.5'/%3E%3Crect x='747.9' y='107' width='14' height='3' rx='1.5'/%3E%3Crect x='771.8' y='87' width='14' height='3' rx='1.5'/%3E%3Crect x='795.6' y='105' width='14' height='3' rx='1.5'/%3E%3Crect x='819.5' y='124' width='14' height='3' rx='1.5'/%3E%3Crect x='843.5' y='129' width='14' height='3' rx='1.5'/%3E%3Crect x='867.4' y='126' width='14' height='3' rx='1.5'/%3E%3Crect x='891.3' y='139' width='14' height='3' rx='1.5'/%3E%3Crect x='915.1' y='153' width='14' height='3' rx='1.5'/%3E%3Crect x='939.0' y='124' width='14' height='3' rx='1.5'/%3E%3C/g%3E%3C/svg%3E");

  /* concrete-aggregate wall texture (260px tile): angular chips + lit dust
     grains + hairline cracks — the bare underground room the rig sits in.
     Plain shapes only (no SVG filters: renders identically in OBS/CEF). LOW
     alpha; only ever painted in the side gutters, brightest low where the
     deck-glow reaches, so it never enters the fine-pattern flicker zone over
     the center text lane. */
  --dnb-concrete: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260' viewBox='0 0 260 260'%3E%3Cg%3E%3Crect x='209.6' y='-10' width='67.2' height='280' fill='%236b8a6a' fill-opacity='0.040'/%3E%3Crect x='161.5' y='-10' width='38.3' height='280' fill='%236b8a6a' fill-opacity='0.041'/%3E%3Crect x='123.4' y='-10' width='82.5' height='280' fill='%236b8a6a' fill-opacity='0.031'/%3E%3Crect x='79.5' y='-10' width='74.4' height='280' fill='%236b8a6a' fill-opacity='0.052'/%3E%3Crect x='228.5' y='-10' width='65.9' height='280' fill='%236b8a6a' fill-opacity='0.054'/%3E%3Crect x='173.3' y='-10' width='32.1' height='280' fill='%236b8a6a' fill-opacity='0.051'/%3E%3Crect x='246.7' y='-10' width='83.6' height='280' fill='%236b8a6a' fill-opacity='0.024'/%3E%3Crect x='145.9' y='-10' width='54.8' height='280' fill='%236b8a6a' fill-opacity='0.046'/%3E%3C/g%3E%3Cg fill='%23020806'%3E%3Crect x='-8.5' y='-2.2' width='17.0' height='4.4' fill-opacity='0.238' transform='translate(153.6 11.0) rotate(15.1)'/%3E%3Crect x='-7.8' y='-6.8' width='15.5' height='13.6' fill-opacity='0.209' transform='translate(188.7 109.9) rotate(67.8)'/%3E%3Crect x='-6.6' y='-2.6' width='13.2' height='5.2' fill-opacity='0.255' transform='translate(153.6 26.0) rotate(53.0)'/%3E%3Crect x='-6.8' y='-5.0' width='13.6' height='10.1' fill-opacity='0.109' transform='translate(122.9 123.7) rotate(26.9)'/%3E%3Crect x='-4.1' y='-3.8' width='8.2' height='7.5' fill-opacity='0.238' transform='translate(247.4 240.6) rotate(20.8)'/%3E%3Crect x='-4.8' y='-4.3' width='9.6' height='8.6' fill-opacity='0.259' transform='translate(113.9 42.9) rotate(58.3)'/%3E%3Crect x='-5.1' y='-6.1' width='10.2' height='12.2' fill-opacity='0.234' transform='translate(42.7 30.7) rotate(39.0)'/%3E%3Crect x='-6.5' y='-5.0' width='13.1' height='10.0' fill-opacity='0.167' transform='translate(34.8 205.0) rotate(4.1)'/%3E%3Crect x='-6.2' y='-2.8' width='12.3' height='5.5' fill-opacity='0.220' transform='translate(161.7 137.0) rotate(59.0)'/%3E%3Crect x='-3.1' y='-4.8' width='6.2' height='9.6' fill-opacity='0.152' transform='translate(6.8 20.5) rotate(6.0)'/%3E%3Crect x='-8.9' y='-6.7' width='17.8' height='13.3' fill-opacity='0.234' transform='translate(247.9 125.8) rotate(80.4)'/%3E%3Crect x='-6.7' y='-2.3' width='13.4' height='4.5' fill-opacity='0.128' transform='translate(188.4 82.3) rotate(2.2)'/%3E%3Crect x='-7.8' y='-5.0' width='15.7' height='10.0' fill-opacity='0.127' transform='translate(212.0 128.0) rotate(23.7)'/%3E%3Crect x='-9.4' y='-6.5' width='18.8' height='13.1' fill-opacity='0.240' transform='translate(104.5 246.7) rotate(61.6)'/%3E%3Crect x='-3.5' y='-5.8' width='7.0' height='11.7' fill-opacity='0.193' transform='translate(259.4 141.2) rotate(31.4)'/%3E%3Crect x='-8.3' y='-6.7' width='16.5' height='13.3' fill-opacity='0.232' transform='translate(111.9 135.1) rotate(2.4)'/%3E%3Crect x='-9.2' y='-2.7' width='18.3' height='5.4' fill-opacity='0.153' transform='translate(249.9 123.8) rotate(16.0)'/%3E%3Crect x='-2.9' y='-3.9' width='5.8' height='7.8' fill-opacity='0.233' transform='translate(122.0 245.4) rotate(2.6)'/%3E%3Crect x='-8.0' y='-3.3' width='15.9' height='6.6' fill-opacity='0.236' transform='translate(41.2 16.0) rotate(85.0)'/%3E%3Crect x='-6.5' y='-5.2' width='13.1' height='10.4' fill-opacity='0.244' transform='translate(125.8 114.5) rotate(65.4)'/%3E%3Crect x='-6.8' y='-5.5' width='13.6' height='11.1' fill-opacity='0.139' transform='translate(194.7 188.8) rotate(74.5)'/%3E%3Crect x='-8.8' y='-5.5' width='17.7' height='11.0' fill-opacity='0.148' transform='translate(113.5 169.9) rotate(0.4)'/%3E%3Crect x='-6.5' y='-3.6' width='13.1' height='7.3' fill-opacity='0.190' transform='translate(148.8 22.9) rotate(46.2)'/%3E%3Crect x='-4.1' y='-3.3' width='8.2' height='6.6' fill-opacity='0.154' transform='translate(164.0 200.8) rotate(78.9)'/%3E%3Crect x='-4.4' y='-4.0' width='8.8' height='7.9' fill-opacity='0.242' transform='translate(125.7 190.0) rotate(25.7)'/%3E%3Crect x='-6.0' y='-3.0' width='12.0' height='5.9' fill-opacity='0.216' transform='translate(244.4 178.8) rotate(21.3)'/%3E%3Crect x='-5.2' y='-4.2' width='10.4' height='8.4' fill-opacity='0.224' transform='translate(107.4 229.6) rotate(72.2)'/%3E%3Crect x='-5.3' y='-6.3' width='10.6' height='12.6' fill-opacity='0.179' transform='translate(107.0 127.2) rotate(26.8)'/%3E%3Crect x='-6.8' y='-6.3' width='13.5' height='12.5' fill-opacity='0.193' transform='translate(197.1 240.9) rotate(80.6)'/%3E%3Crect x='-4.5' y='-6.0' width='8.9' height='12.1' fill-opacity='0.243' transform='translate(254.0 218.4) rotate(20.5)'/%3E%3Crect x='-2.6' y='-2.5' width='5.3' height='4.9' fill-opacity='0.226' transform='translate(252.0 236.1) rotate(2.3)'/%3E%3Crect x='-5.8' y='-6.7' width='11.6' height='13.3' fill-opacity='0.203' transform='translate(65.1 10.5) rotate(62.5)'/%3E%3Crect x='-6.1' y='-2.6' width='12.2' height='5.2' fill-opacity='0.147' transform='translate(113.0 122.3) rotate(20.9)'/%3E%3Crect x='-6.4' y='-6.8' width='12.8' height='13.7' fill-opacity='0.182' transform='translate(170.7 210.8) rotate(28.9)'/%3E%3Crect x='-9.1' y='-6.5' width='18.1' height='13.1' fill-opacity='0.144' transform='translate(8.1 228.9) rotate(64.1)'/%3E%3Crect x='-5.5' y='-4.5' width='11.0' height='8.9' fill-opacity='0.118' transform='translate(94.2 27.4) rotate(24.8)'/%3E%3Crect x='-9.1' y='-2.8' width='18.1' height='5.6' fill-opacity='0.119' transform='translate(244.3 19.1) rotate(32.3)'/%3E%3Crect x='-4.5' y='-4.5' width='9.0' height='9.0' fill-opacity='0.154' transform='translate(197.2 128.4) rotate(43.4)'/%3E%3Crect x='-7.8' y='-5.0' width='15.6' height='9.9' fill-opacity='0.181' transform='translate(154.5 230.3) rotate(79.8)'/%3E%3Crect x='-9.3' y='-6.5' width='18.5' height='12.9' fill-opacity='0.246' transform='translate(121.3 237.2) rotate(17.3)'/%3E%3Crect x='-6.0' y='-6.4' width='12.1' height='12.8' fill-opacity='0.215' transform='translate(226.4 233.4) rotate(36.6)'/%3E%3Crect x='-3.0' y='-3.0' width='6.0' height='6.0' fill-opacity='0.237' transform='translate(27.9 215.4) rotate(80.0)'/%3E%3Crect x='-6.3' y='-5.0' width='12.7' height='10.1' fill-opacity='0.197' transform='translate(226.4 145.2) rotate(48.8)'/%3E%3Crect x='-9.3' y='-3.1' width='18.5' height='6.3' fill-opacity='0.257' transform='translate(83.1 31.1) rotate(70.3)'/%3E%3Crect x='-3.0' y='-3.0' width='5.9' height='5.9' fill-opacity='0.247' transform='translate(238.7 133.9) rotate(41.7)'/%3E%3Crect x='-6.3' y='-3.6' width='12.6' height='7.2' fill-opacity='0.191' transform='translate(196.9 54.4) rotate(30.3)'/%3E%3Crect x='-9.4' y='-3.6' width='18.8' height='7.3' fill-opacity='0.244' transform='translate(160.5 82.9) rotate(39.6)'/%3E%3Crect x='-4.3' y='-7.1' width='8.7' height='14.2' fill-opacity='0.256' transform='translate(14.1 67.2) rotate(56.8)'/%3E%3Crect x='-8.4' y='-3.0' width='16.9' height='5.9' fill-opacity='0.148' transform='translate(24.6 241.3) rotate(69.6)'/%3E%3Crect x='-2.7' y='-3.5' width='5.4' height='6.9' fill-opacity='0.223' transform='translate(257.3 120.0) rotate(41.1)'/%3E%3Crect x='-4.1' y='-4.0' width='8.2' height='8.0' fill-opacity='0.147' transform='translate(200.6 176.7) rotate(19.6)'/%3E%3Crect x='-7.5' y='-3.3' width='15.0' height='6.6' fill-opacity='0.195' transform='translate(87.2 192.2) rotate(40.8)'/%3E%3Crect x='-7.3' y='-5.8' width='14.7' height='11.6' fill-opacity='0.241' transform='translate(73.7 170.3) rotate(22.7)'/%3E%3Crect x='-6.3' y='-5.2' width='12.5' height='10.3' fill-opacity='0.253' transform='translate(32.5 98.6) rotate(66.6)'/%3E%3Crect x='-7.5' y='-3.8' width='15.1' height='7.5' fill-opacity='0.222' transform='translate(105.7 158.0) rotate(72.6)'/%3E%3Crect x='-6.5' y='-4.3' width='13.0' height='8.7' fill-opacity='0.185' transform='translate(84.6 109.1) rotate(68.9)'/%3E%3Crect x='-8.3' y='-4.3' width='16.6' height='8.7' fill-opacity='0.237' transform='translate(24.4 227.7) rotate(28.0)'/%3E%3Crect x='-2.8' y='-4.8' width='5.5' height='9.7' fill-opacity='0.225' transform='translate(37.7 213.8) rotate(34.9)'/%3E%3Crect x='-7.7' y='-7.2' width='15.4' height='14.4' fill-opacity='0.233' transform='translate(257.7 247.9) rotate(14.8)'/%3E%3Crect x='-3.9' y='-7.2' width='7.8' height='14.4' fill-opacity='0.246' transform='translate(121.0 191.0) rotate(35.4)'/%3E%3Crect x='-7.2' y='-2.7' width='14.4' height='5.4' fill-opacity='0.164' transform='translate(8.0 166.6) rotate(89.8)'/%3E%3Crect x='-3.0' y='-2.8' width='5.9' height='5.6' fill-opacity='0.182' transform='translate(33.4 99.2) rotate(86.2)'/%3E%3Crect x='-7.8' y='-2.5' width='15.7' height='5.0' fill-opacity='0.132' transform='translate(252.0 244.9) rotate(29.0)'/%3E%3Crect x='-3.2' y='-5.2' width='6.4' height='10.3' fill-opacity='0.155' transform='translate(17.0 102.0) rotate(69.8)'/%3E%3C/g%3E%3Cg fill='%2396b590'%3E%3Crect x='-2.9' y='-2.5' width='5.7' height='5.0' fill-opacity='0.114' transform='translate(254.3 37.0) rotate(40.1)'/%3E%3Crect x='-4.3' y='-1.6' width='8.5' height='3.1' fill-opacity='0.075' transform='translate(129.7 156.4) rotate(75.2)'/%3E%3Crect x='-4.0' y='-1.3' width='8.1' height='2.6' fill-opacity='0.096' transform='translate(167.7 188.1) rotate(66.6)'/%3E%3Crect x='-2.4' y='-3.0' width='4.7' height='6.0' fill-opacity='0.112' transform='translate(184.3 163.1) rotate(8.5)'/%3E%3Crect x='-5.4' y='-3.0' width='10.8' height='6.1' fill-opacity='0.067' transform='translate(258.4 12.8) rotate(57.7)'/%3E%3Crect x='-4.2' y='-1.2' width='8.4' height='2.4' fill-opacity='0.064' transform='translate(22.3 199.6) rotate(46.1)'/%3E%3Crect x='-4.0' y='-3.4' width='7.9' height='6.7' fill-opacity='0.091' transform='translate(100.6 257.4) rotate(88.0)'/%3E%3Crect x='-3.8' y='-2.3' width='7.5' height='4.5' fill-opacity='0.098' transform='translate(122.2 5.1) rotate(18.3)'/%3E%3Crect x='-5.0' y='-1.6' width='10.1' height='3.1' fill-opacity='0.116' transform='translate(108.3 234.9) rotate(44.5)'/%3E%3Crect x='-1.9' y='-1.2' width='3.7' height='2.4' fill-opacity='0.065' transform='translate(259.2 66.8) rotate(60.7)'/%3E%3Crect x='-1.9' y='-3.8' width='3.9' height='7.6' fill-opacity='0.094' transform='translate(36.7 169.8) rotate(60.8)'/%3E%3Crect x='-2.4' y='-1.9' width='4.8' height='3.8' fill-opacity='0.144' transform='translate(245.3 227.9) rotate(34.5)'/%3E%3Crect x='-3.8' y='-2.6' width='7.5' height='5.2' fill-opacity='0.098' transform='translate(74.3 150.1) rotate(20.9)'/%3E%3Crect x='-1.9' y='-1.9' width='3.8' height='3.9' fill-opacity='0.095' transform='translate(79.2 116.7) rotate(10.4)'/%3E%3Crect x='-3.1' y='-2.4' width='6.3' height='4.8' fill-opacity='0.146' transform='translate(66.4 151.9) rotate(76.8)'/%3E%3Crect x='-3.8' y='-2.3' width='7.6' height='4.5' fill-opacity='0.066' transform='translate(22.1 45.6) rotate(80.7)'/%3E%3Crect x='-3.3' y='-2.0' width='6.5' height='4.0' fill-opacity='0.144' transform='translate(19.5 207.2) rotate(8.7)'/%3E%3Crect x='-2.4' y='-1.6' width='4.7' height='3.2' fill-opacity='0.133' transform='translate(141.1 52.1) rotate(39.8)'/%3E%3Crect x='-1.5' y='-1.1' width='3.0' height='2.2' fill-opacity='0.089' transform='translate(161.2 108.2) rotate(46.0)'/%3E%3Crect x='-5.0' y='-1.2' width='9.9' height='2.4' fill-opacity='0.091' transform='translate(225.2 17.9) rotate(32.4)'/%3E%3Crect x='-3.2' y='-1.0' width='6.4' height='2.0' fill-opacity='0.097' transform='translate(191.3 188.7) rotate(32.6)'/%3E%3Crect x='-4.3' y='-2.3' width='8.5' height='4.6' fill-opacity='0.106' transform='translate(4.9 229.8) rotate(55.0)'/%3E%3Crect x='-5.1' y='-1.9' width='10.2' height='3.8' fill-opacity='0.061' transform='translate(30.8 106.7) rotate(50.2)'/%3E%3Crect x='-2.0' y='-1.6' width='4.0' height='3.3' fill-opacity='0.099' transform='translate(192.7 248.1) rotate(84.4)'/%3E%3Crect x='-3.2' y='-1.1' width='6.4' height='2.2' fill-opacity='0.133' transform='translate(14.3 158.6) rotate(59.1)'/%3E%3Crect x='-3.0' y='-2.7' width='6.1' height='5.4' fill-opacity='0.134' transform='translate(243.2 256.1) rotate(24.4)'/%3E%3Crect x='-4.2' y='-3.0' width='8.3' height='6.0' fill-opacity='0.100' transform='translate(101.5 99.3) rotate(3.1)'/%3E%3Crect x='-2.9' y='-1.5' width='5.7' height='3.0' fill-opacity='0.117' transform='translate(241.0 26.9) rotate(29.7)'/%3E%3Crect x='-3.3' y='-3.4' width='6.5' height='6.7' fill-opacity='0.095' transform='translate(84.7 127.2) rotate(54.4)'/%3E%3Crect x='-4.9' y='-1.8' width='9.8' height='3.5' fill-opacity='0.133' transform='translate(85.1 69.5) rotate(82.0)'/%3E%3Crect x='-2.8' y='-3.1' width='5.5' height='6.2' fill-opacity='0.154' transform='translate(236.4 180.3) rotate(60.0)'/%3E%3Crect x='-5.5' y='-1.7' width='10.9' height='3.4' fill-opacity='0.078' transform='translate(128.3 222.9) rotate(53.1)'/%3E%3Crect x='-4.2' y='-3.6' width='8.3' height='7.2' fill-opacity='0.128' transform='translate(85.5 251.4) rotate(69.9)'/%3E%3Crect x='-4.4' y='-3.3' width='8.8' height='6.6' fill-opacity='0.069' transform='translate(209.9 128.4) rotate(75.0)'/%3E%3Crect x='-5.3' y='-3.9' width='10.7' height='7.7' fill-opacity='0.091' transform='translate(95.8 79.0) rotate(64.6)'/%3E%3Crect x='-5.0' y='-2.4' width='9.9' height='4.7' fill-opacity='0.126' transform='translate(70.0 98.9) rotate(67.0)'/%3E%3Crect x='-2.8' y='-1.3' width='5.5' height='2.6' fill-opacity='0.119' transform='translate(163.5 11.4) rotate(85.7)'/%3E%3Crect x='-3.5' y='-2.6' width='6.9' height='5.3' fill-opacity='0.072' transform='translate(33.8 186.3) rotate(83.7)'/%3E%3Crect x='-3.0' y='-2.6' width='6.0' height='5.2' fill-opacity='0.122' transform='translate(100.1 230.5) rotate(14.3)'/%3E%3Crect x='-2.2' y='-2.3' width='4.4' height='4.5' fill-opacity='0.085' transform='translate(144.9 255.0) rotate(20.6)'/%3E%3Crect x='-2.6' y='-4.0' width='5.2' height='7.9' fill-opacity='0.152' transform='translate(46.7 4.1) rotate(62.9)'/%3E%3Crect x='-3.6' y='-3.1' width='7.3' height='6.2' fill-opacity='0.105' transform='translate(145.9 32.6) rotate(24.7)'/%3E%3Crect x='-2.3' y='-1.2' width='4.6' height='2.4' fill-opacity='0.130' transform='translate(133.3 1.5) rotate(13.8)'/%3E%3Crect x='-1.9' y='-1.4' width='3.7' height='2.8' fill-opacity='0.080' transform='translate(173.1 257.1) rotate(12.4)'/%3E%3Crect x='-3.8' y='-3.5' width='7.5' height='7.1' fill-opacity='0.157' transform='translate(64.0 112.3) rotate(23.0)'/%3E%3Crect x='-3.4' y='-3.3' width='6.7' height='6.5' fill-opacity='0.091' transform='translate(17.3 119.5) rotate(47.4)'/%3E%3Crect x='-2.2' y='-2.0' width='4.4' height='4.0' fill-opacity='0.100' transform='translate(147.5 93.0) rotate(76.6)'/%3E%3Crect x='-3.0' y='-3.8' width='5.9' height='7.6' fill-opacity='0.116' transform='translate(64.5 52.7) rotate(25.3)'/%3E%3Crect x='-4.0' y='-2.1' width='8.1' height='4.3' fill-opacity='0.076' transform='translate(165.4 30.4) rotate(66.5)'/%3E%3Crect x='-4.7' y='-1.8' width='9.4' height='3.6' fill-opacity='0.094' transform='translate(79.9 255.6) rotate(13.4)'/%3E%3Crect x='-1.6' y='-2.3' width='3.1' height='4.5' fill-opacity='0.064' transform='translate(68.9 18.6) rotate(44.7)'/%3E%3Crect x='-3.8' y='-2.4' width='7.5' height='4.8' fill-opacity='0.115' transform='translate(119.0 232.2) rotate(5.8)'/%3E%3Crect x='-3.3' y='-3.6' width='6.5' height='7.3' fill-opacity='0.129' transform='translate(63.7 66.0) rotate(59.1)'/%3E%3Crect x='-5.4' y='-3.0' width='10.8' height='5.9' fill-opacity='0.154' transform='translate(117.8 5.7) rotate(39.4)'/%3E%3Crect x='-2.1' y='-2.3' width='4.3' height='4.5' fill-opacity='0.139' transform='translate(45.7 20.1) rotate(75.9)'/%3E%3Crect x='-2.8' y='-3.3' width='5.6' height='6.6' fill-opacity='0.104' transform='translate(238.1 96.6) rotate(14.9)'/%3E%3Crect x='-2.8' y='-1.1' width='5.6' height='2.1' fill-opacity='0.089' transform='translate(237.3 138.0) rotate(65.5)'/%3E%3Crect x='-3.9' y='-1.1' width='7.7' height='2.1' fill-opacity='0.089' transform='translate(208.6 16.1) rotate(32.5)'/%3E%3Crect x='-3.0' y='-3.4' width='5.9' height='6.8' fill-opacity='0.087' transform='translate(256.0 138.0) rotate(80.7)'/%3E%3Crect x='-2.1' y='-2.2' width='4.3' height='4.4' fill-opacity='0.065' transform='translate(127.4 31.6) rotate(3.5)'/%3E%3C/g%3E%3Cg stroke='%23020806' stroke-width='1.2' fill='none' stroke-opacity='0.16'%3E%3Cpath d='M40 -5 L52 40 46 70 60 110 54 150 66 200 60 265'/%3E%3Cpath d='M200 -5 L188 34 196 62 182 96 190 140 178 190 186 265'/%3E%3C/g%3E%3C/svg%3E");

  /* god-ray light shafts fanning UP from the DJ rig at bottom-center through
     warehouse haze — the volumetric fill that gives the mid-frame depth. Coarse
     soft wedges (each shaft is tens of px wide when stretched), very low alpha,
     baked + on a promoted static layer => L6-safe even across the center lane. */
  --dnb-rays: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 600' preserveAspectRatio='none'%3E%3Cdefs%3E%3ClinearGradient id='ray' x1='0' y1='1' x2='0' y2='0'%3E%3Cstop offset='0' stop-color='%23bfff5a' stop-opacity='.15'/%3E%3Cstop offset='.28' stop-color='%237fe8bc' stop-opacity='.065'/%3E%3Cstop offset='.62' stop-color='%233fd4cc' stop-opacity='.02'/%3E%3Cstop offset='1' stop-color='%233fd4cc' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='ray2' x1='0' y1='1' x2='0' y2='0'%3E%3Cstop offset='0' stop-color='%2350e4d0' stop-opacity='.10'/%3E%3Cstop offset='.34' stop-color='%2350e4d0' stop-opacity='.04'/%3E%3Cstop offset='1' stop-color='%2350e4d0' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpolygon points='517,620 483,660 -384,-0 -284,-120' fill='url(%23ray2)'/%3E%3Cpolygon points='521,625 479,655 -65,-19 48,-101' fill='url(%23ray)'/%3E%3Cpolygon points='524,630 476,650 158,-36 277,-84' fill='url(%23ray2)'/%3E%3Cpolygon points='526,635 474,645 304,-47 449,-73' fill='url(%23ray)'/%3E%3Cpolygon points='526,641 474,639 458,-62 590,-58' fill='url(%23ray2)'/%3E%3Cpolygon points='525,646 475,634 601,-78 748,-42' fill='url(%23ray)'/%3E%3Cpolygon points='523,652 477,628 796,-91 917,-29' fill='url(%23ray2)'/%3E%3Cpolygon points='520,657 480,623 1048,-112 1169,-8' fill='url(%23ray)'/%3E%3Cpolygon points='515,661 485,619 1419,-121 1508,1' fill='url(%23ray2)'/%3E%3C/svg%3E");

  /* rig-aperture lens flare: the specular BLOOM where the god-ray beams are
     born, bottom-centre (well below the text lane). Bloom core + soft 4-point
     star + anamorphic streak — a static specular highlight on the rig, so it's
     L6-safe (static, coarse-soft, off-lane). This is the sparkle's light source. */
  --dnb-flare: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'%3E%3Cdefs%3E%3CradialGradient id='core' cx='.5' cy='.5' r='.5'%3E%3Cstop offset='0' stop-color='%23ffffff' stop-opacity='.85'/%3E%3Cstop offset='.2' stop-color='%23eaffc0' stop-opacity='.6'/%3E%3Cstop offset='.5' stop-color='%23b6ff2e' stop-opacity='.28'/%3E%3Cstop offset='1' stop-color='%23b6ff2e' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='halo' cx='.5' cy='.5' r='.5'%3E%3Cstop offset='0' stop-color='%23b6ff2e' stop-opacity='.22'/%3E%3Cstop offset='.5' stop-color='%2360d99a' stop-opacity='.07'/%3E%3Cstop offset='1' stop-color='%2360d99a' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='ray' x1='0' y1='.5' x2='1' y2='.5'%3E%3Cstop offset='0' stop-color='%23eaffc0' stop-opacity='0'/%3E%3Cstop offset='.5' stop-color='%23f4ffd8' stop-opacity='.8'/%3E%3Cstop offset='1' stop-color='%23eaffc0' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='vray' x1='.5' y1='0' x2='.5' y2='1'%3E%3Cstop offset='0' stop-color='%23eaffc0' stop-opacity='0'/%3E%3Cstop offset='.5' stop-color='%23f4ffd8' stop-opacity='.7'/%3E%3Cstop offset='1' stop-color='%23eaffc0' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cellipse cx='300' cy='356' rx='210' ry='130' fill='url(%23halo)'/%3E%3Crect x='50' y='352' width='500' height='8' rx='4' fill='url(%23ray)'/%3E%3Crect x='296.5' y='252' width='7' height='208' rx='3.5' fill='url(%23vray)'/%3E%3Cg transform='rotate(45 300 356)'%3E%3Crect x='180' y='353.5' width='240' height='5' rx='2.5' fill='url(%23ray)' opacity='.42'/%3E%3Crect x='297.5' y='236' width='5' height='240' rx='2.5' fill='url(%23vray)' opacity='.42'/%3E%3C/g%3E%3Ccircle cx='300' cy='356' r='48' fill='url(%23core)'/%3E%3C/svg%3E");

  /* -- base hooks -- */
  /* cheap 3-stop gradient ONLY — the root background repaints inside
     the crawl damage every frame; texture lives on promoted pseudos */
  --credits-bg: linear-gradient(180deg, #0e140c 0%, #0b0f0a 52%, #060a05 100%);
  --credits-color: var(--dnb-text);
  --credits-accent: var(--dnb-green);
  --credits-font: "Share Tech Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  --credits-title-font: "Saira Stencil One", "Arial Black", "Trebuchet MS", sans-serif;
  --credits-title-size: clamp(1.55rem, 4.4vw, 2.6rem);
  --credits-name-size: clamp(1.1rem, 2.7vw, 1.55rem);
  --credits-flourish-title-size: clamp(2.5rem, 8vw, 5rem);
  --credits-block-gap: 5rem;
  --credits-name-gap: 0.55rem;
  --credits-shadow: 0 2px 12px rgba(3, 7, 2, 0.85);
  /* real acid glow (static). Where a no-op is needed it must be a
     transparent shadow, NEVER "none" (a "none" in the composed
     shadow list invalidates the whole declaration). */
  --credits-glow: 0 0 20px rgba(182, 255, 46, 0.32);

  /* the ROOFTOP TRANSMISSION TOWER the pirate signal rides out of —
     lattice mast on a parapet skyline with guy-lines, dipole whiskers,
     a side dish, static acid signal arcs off the tip, and a soft teal
     city-glow backlight so the silhouette reads against the blackout.
     (The blinking beacon is a separate tiny mover on body::after.) */
  --dnb-tower: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 340 560'%3E %3Cdefs%3E %3CradialGradient id='glow' cx='50%' cy='58%' r='60%'%3E%3Cstop offset='0' stop-color='%231e9a8a' stop-opacity='.17'/%3E%3Cstop offset='.6' stop-color='%2315665c' stop-opacity='.08'/%3E%3Cstop offset='1' stop-color='%2315665c' stop-opacity='0'/%3E%3C/radialGradient%3E %3C/defs%3E %3Cellipse cx='170' cy='320' rx='170' ry='240' fill='url(%23glow)'/%3E %3Crect x='0' y='474' width='340' height='86' fill='%23060a06'/%3E %3Crect x='0' y='470' width='340' height='6' fill='%230b130b'/%3E %3Crect x='0' y='470' width='340' height='2' fill='rgba(182,255,46,0.13)'/%3E %3Crect x='24' y='448' width='58' height='24' fill='%23060a06'/%3E %3Crect x='28' y='444' width='50' height='5' fill='%230b130b'/%3E %3Crect x='250' y='452' width='44' height='20' fill='%23060a06'/%3E %3Cg stroke='%230f180f' stroke-width='2'%3E%3Cline x1='257' y1='456' x2='257' y2='468'/%3E%3Cline x1='264' y1='456' x2='264' y2='468'/%3E%3Cline x1='271' y1='456' x2='271' y2='468'/%3E%3Cline x1='278' y1='456' x2='278' y2='468'/%3E%3C/g%3E %3Cg stroke='%23060a06' stroke-width='2.4'%3E%3Cline x1='96' y1='470' x2='96' y2='455'/%3E%3Cline x1='118' y1='470' x2='118' y2='455'/%3E%3Cline x1='140' y1='470' x2='140' y2='455'/%3E%3Cline x1='162' y1='470' x2='162' y2='455'/%3E%3Cline x1='90' y1='456' x2='168' y2='456'/%3E%3C/g%3E %3Cg stroke='%23081008' stroke-width='5' fill='none'%3E %3Cpath d='M126 474 L158 96'/%3E %3Cpath d='M214 474 L182 96'/%3E %3C/g%3E %3Cpath d='M127 460 L209 420 L134 380 L203 340 L141 300 L196 260 L147 220 L189 180 L154 140 L183 100' stroke='%23081008' stroke-width='2.6' fill='none'/%3E %3Cg stroke='%23081008' stroke-width='2'%3E %3Cline x1='127' y1='460' x2='213' y2='460'/%3E%3Cline x1='131' y1='420' x2='209' y2='420'/%3E%3Cline x1='134' y1='380' x2='206' y2='380'/%3E%3Cline x1='137' y1='340' x2='203' y2='340'/%3E%3Cline x1='141' y1='300' x2='199' y2='300'/%3E%3Cline x1='144' y1='260' x2='196' y2='260'/%3E%3Cline x1='147' y1='220' x2='193' y2='220'/%3E%3Cline x1='151' y1='180' x2='189' y2='180'/%3E%3Cline x1='154' y1='140' x2='186' y2='140'/%3E%3Cline x1='157' y1='100' x2='183' y2='100'/%3E %3C/g%3E %3Cpath d='M128 474 L160 96' stroke='rgba(182,255,46,0.18)' stroke-width='1.3' fill='none'/%3E %3Crect x='150' y='90' width='40' height='7' fill='%23081008'/%3E %3Cline x1='170' y1='90' x2='170' y2='30' stroke='%23081008' stroke-width='4'/%3E %3Cline x1='170.8' y1='90' x2='170.8' y2='32' stroke='rgba(182,255,46,0.22)' stroke-width='1'/%3E %3Cg stroke='%23081008' stroke-width='3'%3E%3Cline x1='152' y1='118' x2='188' y2='118'/%3E%3Cline x1='156' y1='150' x2='184' y2='150'/%3E%3C/g%3E %3Cg fill='rgba(182,255,46,0.45)'%3E%3Ccircle cx='152' cy='118' r='2.2'/%3E%3Ccircle cx='188' cy='118' r='2.2'/%3E%3Ccircle cx='156' cy='150' r='1.8'/%3E%3Ccircle cx='184' cy='150' r='1.8'/%3E%3C/g%3E %3Cpath d='M205 302 l22 -13 a15 15 0 0 1 -7 24 z' fill='%23081008'/%3E %3Cpath d='M126 474 L58 560' stroke='%23081008' stroke-width='1.6'/%3E %3Cpath d='M214 474 L286 560' stroke='%23081008' stroke-width='1.6'/%3E %3Cg fill='none' stroke-linecap='round'%3E %3Cpath d='M153 18 A20 20 0 0 1 187 18' stroke='rgba(182,255,46,0.5)' stroke-width='2.6'/%3E %3Cpath d='M139 10 A36 36 0 0 1 201 10' stroke='rgba(182,255,46,0.32)' stroke-width='2.2'/%3E %3Cpath d='M125 2 A52 52 0 0 1 215 2' stroke='rgba(182,255,46,0.2)' stroke-width='2'/%3E %3C/g%3E %3Ccircle cx='170' cy='26' r='3' fill='%232a0f0c'/%3E %3C/svg%3E");
  /* tuner-dial chrome under the BPM readout: scale, ticks, lit needle */
  --dnb-dial: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 230 36'%3E %3Ctext x='2' y='9' font-family='monospace' font-size='9' letter-spacing='2' fill='rgba(232,255,224,0.4)'%3EFM 89.7 // PIRATE%3C/text%3E %3Crect x='2' y='19' width='226' height='1.6' fill='rgba(232,255,224,0.26)'/%3E %3Cg stroke='rgba(232,255,224,0.30)' stroke-width='1.6'%3E %3Cline x1='6' y1='13' x2='6' y2='27'/%3E%3Cline x1='34' y1='13' x2='34' y2='27'/%3E%3Cline x1='62' y1='13' x2='62' y2='27'/%3E%3Cline x1='90' y1='13' x2='90' y2='27'/%3E%3Cline x1='118' y1='13' x2='118' y2='27'/%3E%3Cline x1='146' y1='13' x2='146' y2='27'/%3E%3Cline x1='174' y1='13' x2='174' y2='27'/%3E%3Cline x1='202' y1='13' x2='202' y2='27'/%3E%3Cline x1='228' y1='13' x2='228' y2='27'/%3E %3C/g%3E %3Cg stroke='rgba(232,255,224,0.14)' stroke-width='1.2'%3E %3Cline x1='20' y1='16' x2='20' y2='24'/%3E%3Cline x1='48' y1='16' x2='48' y2='24'/%3E%3Cline x1='76' y1='16' x2='76' y2='24'/%3E%3Cline x1='104' y1='16' x2='104' y2='24'/%3E%3Cline x1='132' y1='16' x2='132' y2='24'/%3E%3Cline x1='160' y1='16' x2='160' y2='24'/%3E%3Cline x1='188' y1='16' x2='188' y2='24'/%3E%3Cline x1='216' y1='16' x2='216' y2='24'/%3E %3C/g%3E %3Crect x='160' y='7' width='9' height='26' rx='2' fill='rgba(182,255,46,0.16)'/%3E %3Crect x='163' y='7' width='2.6' height='26' fill='%23b6ff2e'/%3E %3C/svg%3E");
}

/* ---- canvas split: scenery + HUD paint on <html>/<head>, unmasked and
   crisp; <body> keeps the base edge-fade so names ease in/out. ---- */
html { -webkit-mask-image: none; mask-image: none; }
body { background: transparent; }

/* ---- sub-bass arcs: big soft concentric pressure waves rising from the
   bottom of the screen. Coarse (bands 60px+ wide, soft edges, low alpha)
   so screen-fixed is flicker-safe; translateZ(0) caches the texture; the
   throb is a 2-hop steps() opacity pulse on the beat (1.45 hops/s,
   compositor-only on the promoted layer). ---- */
html::before {
  content: "";
  display: var(--dnb-scenery, block);
  position: fixed;
  left: 50%;
  bottom: 0;
  width: 190vmax;
  height: 86vmax;
  z-index: -1;
  pointer-events: none;
  border-radius: 50%;
  transform: translate(-50%, 54%) translateZ(0);
  opacity: 0.95;
  background: radial-gradient(ellipse closest-side at 50% 50%,
    transparent 0 22%,
    rgba(182, 255, 46, 0.13) 30%, transparent 39%,
    rgba(34, 211, 166, 0.11) 48%, transparent 57%,
    rgba(182, 255, 46, 0.085) 66%, transparent 75%,
    rgba(34, 211, 166, 0.06) 83%, transparent 91%);
  animation: dnb-throb 1.379s steps(1, end) infinite;
}

/* ---- rig HUD, top-right: BPM / sample-rate readout (static, corner —
   out of the lane; promoted so the crawl's damage never repaints it) ---- */
html::after {
  content: "174.0 BPM\\A 44.1 kHz / 24-BIT\\A >> SIGNAL LOCKED";
  display: var(--dnb-scenery, block);
  white-space: pre;
  position: fixed;
  top: clamp(1rem, 3.5vh, 2rem);
  right: clamp(1.1rem, 3.5vw, 2.4rem);
  z-index: 40;
  pointer-events: none;
  transform: translateZ(0);
  font-family: var(--credits-font);
  font-size: clamp(0.8rem, 1.6vw, 1rem);
  font-variant-numeric: tabular-nums;
  line-height: 1.6;
  letter-spacing: 0.14em;
  text-align: right;
  color: var(--dnb-green);
  opacity: 0.85;
  text-shadow: 0 0 10px rgba(182, 255, 46, 0.35), 0 1px 6px rgba(3, 7, 2, 0.9);
  /* thin acid rule anchoring the readout: fades in from the left, hard
     against the shared right edge (static texture on the promoted layer) */
  padding-top: 0.6em;
  /* the acid rule up top + the tuner-dial strip hanging under the
     readout — corner chrome, static, well out of the lane */
  padding-bottom: 48px;
  background:
    linear-gradient(90deg, transparent, rgba(182, 255, 46, 0.55)) top right / 100% 1px no-repeat,
    var(--dnb-dial) bottom right / 100% auto no-repeat;
}

/* ---- ON AIR chip, top-left. Both html pseudos are taken, so it gets the
   one other slot OUTSIDE the masked body: <head> (opting head in as a
   render node shows nothing — the UA sheet keeps its children
   display:none — but unlocks head::before). Inverted acid chip, blinking
   on the same 1.379s beat clock. ---- */
head { display: var(--dnb-scenery, block); }
head::before {
  content: ">> ON AIR";
  display: var(--dnb-scenery, block);
  position: fixed;
  top: clamp(1rem, 3.5vh, 2rem);
  left: clamp(1.1rem, 3.5vw, 2.4rem);
  z-index: 40;
  pointer-events: none;
  transform: translateZ(0);
  font-family: var(--credits-font);
  font-size: clamp(0.8rem, 1.6vw, 1rem);
  letter-spacing: 0.26em;
  /* right pad trimmed: trailing tracking after the final R already adds
     0.26em of visual air, so the glyph box sits optically centered */
  padding: 0.4em 0.55em 0.36em 0.8em;
  color: var(--dnb-ink);
  /* glossy broadcast-chip slab: a diagonal specular sheen across the acid
     plastic (static highlight on a corner prop — L6-safe) */
  background:
    linear-gradient(128deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.12) 22%, rgba(255, 255, 255, 0) 44%),
    linear-gradient(0deg, rgba(11, 15, 10, 0.16), rgba(11, 15, 10, 0) 55%),
    var(--dnb-green);
  box-shadow: 0 0 18px rgba(182, 255, 46, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  /* 1px ink pinstripe inset in the acid slab — broadcast-chip chrome */
  outline: 1px solid rgba(11, 15, 10, 0.55);
  outline-offset: -4px;
  animation: dnb-blink 1.379s steps(1, end) infinite;
}

/* ---- the rig's remaining fixed slots: meta/link are void elements — as
   display:block they render nothing themselves but donate 6 pseudos. ---- */
head meta, head link { display: var(--dnb-scenery, block); }

/* ---- SPECTRUM BRIDGE: a LIVE analyzer across the deck. The 24-bar row is
   split into FOUR interleaved bar-group layers (bars i%4 == 0..3), each on its
   own host with its own baked bar-heights art and its own scaleY-from-bottom
   steps() animation at a DIFFERENT period + phase (1.1 / 1.5 / 1.9 / 2.3s).
   Because the groups interleave and pump at coprime rates, neighbouring bars
   are always at different heights + phases -> the composite never visibly loops
   and the bars bounce like a real analyzer (tall kicks, shimmering highs).
   Transform-only (scaleY, origin bottom) on promoted layers, so each hop is a
   compositor recomposite of a cached texture (ZERO repaint); steps() holds each
   level so the row changes ~2.2-4.5x/s per layer -- far calmer than the old
   10Hz two-frame strobe. Peak-hold caps are baked at each bar top and ride it.
   The center mask dips the row under the text lane. ---- */
head title { display: var(--dnb-scenery, block); font-size: 0; color: transparent; }
head::after,
head meta:first-of-type::before,
head title::before,
head title::after {
  content: "";
  display: var(--dnb-scenery, block);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 23.5vh;
  z-index: -1;
  pointer-events: none;
  transform-origin: 50% 100%;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: 100% 100%;
  -webkit-mask-image: linear-gradient(90deg, #000 0 24%, rgba(0, 0, 0, 0.3) 40% 60%, #000 76% 100%);
  mask-image: linear-gradient(90deg, #000 0 24%, rgba(0, 0, 0, 0.3) 40% 60%, #000 76% 100%);
  opacity: 0.9; /* parked (reduced-motion / pre-paint) value */
}
head::after { background-image: var(--dnb-bars1); animation: dnb-eq1 1.1s steps(1, end) infinite; }
head meta:first-of-type::before { background-image: var(--dnb-bars2); animation: dnb-eq2 1.5s steps(1, end) infinite; }
head title::before { background-image: var(--dnb-bars3); animation: dnb-eq3 1.9s steps(1, end) infinite; }
head title::after { background-image: var(--dnb-bars4); animation: dnb-eq4 2.3s steps(1, end) infinite; }

/* ---- MC ON THE MIC: three shout chips parked at the frame edges, out of
   the lane. Radio-chatter captions — dark backing, acid spine, a stencil
   shout. One shared 16-beat cycle (22.064s), each chip gets a 2-beat
   window at a different offset: 2 opacity hops per 22s apiece. ---- */
head meta:first-of-type::after,
head meta:last-of-type::before,
head meta:last-of-type::after {
  display: var(--dnb-scenery, block);
  position: fixed;
  z-index: 40;
  pointer-events: none;
  font-family: var(--credits-font);
  font-size: clamp(0.72rem, 1.4vw, 0.9rem);
  letter-spacing: 0.2em;
  padding: 0.45em 0.75em 0.4em;
  color: var(--dnb-green);
  background: rgba(11, 15, 10, 0.82);
  border: 1px solid rgba(182, 255, 46, 0.35);
  border-left: 3px solid var(--dnb-green);
  text-shadow: 0 0 10px rgba(182, 255, 46, 0.4);
  box-shadow: 0 0 14px rgba(3, 7, 2, 0.7);
  opacity: 0; /* lit only inside its shout window */
  animation: dnb-shout 22.064s steps(1, end) infinite;
}
head meta:first-of-type::after {
  content: "MC: BIG UP YA CHEST!";
  left: clamp(1.1rem, 3.5vw, 2.4rem);
  top: 30vh;
  transform: translateZ(0) rotate(-1.5deg);
}
head meta:last-of-type::before {
  content: "MC: SELECTA, WHEEL IT UP!";
  right: clamp(1.1rem, 3.5vw, 2.4rem);
  top: 55vh;
  transform: translateZ(0) rotate(1.2deg);
  animation-delay: -6.895s; /* 5 beats later */
}
head meta:last-of-type::after {
  content: "MC: HOLD TIGHT, ROLLERS";
  left: clamp(1.1rem, 3.5vw, 2.4rem);
  top: 68vh;
  transform: translateZ(0) rotate(-1deg);
  animation-delay: -15.169s; /* 11 beats later */
}
/* narrow frames: the lane takes the full width — the MC steps off */
@media (max-width: 760px) {
  head meta:first-of-type::after,
  head meta:last-of-type::before,
  head meta:last-of-type::after { display: none; }
}

/* ---- FOG, two depths. Far pass (link::before): static promoted blooms
   pooling low in the warehouse + the acid deck glow the analyzer stands
   in. Near pass (body::before): four wisps drifting one steps(1) hop per
   4.8s (big-layer cap is 5 hops/s), overscanned 20vw so a hop never
   exposes an edge; masked by body so it fades at the frame like the
   names do. All coarse (>= 28vw blobs), all under 8% alpha. ---- */
head link::before {
  content: "";
  display: var(--dnb-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  /* bare-concrete aggregate walls, tiled ONLY in the left/right gutters
     (edge-pinned, 260px tile) — the underground room the rig sits in. Two
     intersecting masks: a horizontal one clips it to ~18vw gutters at each
     edge (clear of the center text lane — L6-safe), and a vertical one fades
     it up from the deck so the walls are brightest where the rig-glow hits
     and dissolve into darkness overhead. The volumetric light lives on the
     sibling ::after layer, unmasked, so the deck-glow fills the frame. */
  background:
    var(--dnb-concrete) left center / 260px 260px repeat-y,
    var(--dnb-concrete) right center / 260px 260px repeat-y;
  -webkit-mask-image:
    linear-gradient(90deg, #000 0 14vw, transparent 20vw 80vw, #000 86vw 100%),
    linear-gradient(180deg, transparent 6%, rgba(0,0,0,0.5) 40%, #000 100%);
  -webkit-mask-composite: source-in;
  mask-image:
    linear-gradient(90deg, #000 0 14vw, transparent 20vw 80vw, #000 86vw 100%),
    linear-gradient(180deg, transparent 6%, rgba(0,0,0,0.5) 40%, #000 100%);
  mask-composite: intersect;
}
/* far-static warehouse atmosphere, painted back-to-front: god-ray columns
   rising off the deck, mid haze pools, a distant cool receding band, and the
   bright acid deck-glow the analyzer stands in. All coarse (>= 20vw), all
   low-alpha, unmasked so the light fills the whole frame. */
head link::after {
  content: "";
  display: var(--dnb-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* PIRATE MAST — the rooftop transmission tower the whole signal
       fiction hangs from, parked in the right gutter clear of the lane.
       Static silhouette; its aircraft beacon blinks on body::after,
       locked to the same 174 clock. */
    var(--dnb-tower) right 8px bottom 0 / 300px auto no-repeat,
    /* RIG-APERTURE LENS FLARE — specular bloom where the beams are born,
       bottom-centre, well under the text lane (static specular = L6-safe) */
    var(--dnb-flare) center bottom / min(52vw, 720px) auto no-repeat,
    /* cool receding band up top: atmospheric perspective, hazes the ceiling */
    radial-gradient(ellipse 52vw 30vh at 50% 2%, rgba(28, 150, 150, 0.05), rgba(28, 150, 150, 0) 72%),
    /* two soft side pools low in the room — kept COOL teal so they never
       muddy to olive against the warm deck-glow below */
    radial-gradient(ellipse 40vw 40vh at 14% 92%, rgba(34, 211, 190, 0.05), rgba(34, 211, 190, 0) 66%),
    radial-gradient(ellipse 34vw 44vh at 86% 96%, rgba(30, 200, 200, 0.045), rgba(30, 200, 200, 0) 68%),
    /* GOD-RAY SHAFTS — the mid-frame volumetric fill fanning off the rig.
       Coarse soft wedges, static, on this promoted layer => flicker-safe even
       across the center lane (L6 permits coarse-soft static scenery). */
    var(--dnb-rays) center bottom / 100% 90% no-repeat,
    /* the bright acid deck-glow the analyzer stands in */
    radial-gradient(ellipse 88vw 26vh at 50% 106%, rgba(182, 255, 46, 0.13), rgba(120, 230, 90, 0.05) 44%, rgba(182, 255, 46, 0) 74%),
    linear-gradient(180deg, rgba(182, 255, 46, 0) 74%, rgba(140, 235, 90, 0.045) 88%, rgba(182, 255, 46, 0.08) 100%),
    /* distant EQ echo, backmost — a hazy cool spectrum standing behind the
       main analyzer (spectral depth via atmospheric perspective). Bottom-
       anchored + shorter; the haze/deck-glow layers above soften its top and
       tint it into the fog so it reads as further back. */
    var(--dnb-eqecho) center bottom / 100% 24vh no-repeat;
}
body::before {
  content: "";
  display: var(--dnb-scenery, block);
  position: fixed;
  top: 0;
  bottom: 0;
  left: -20vw;
  right: -20vw;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(ellipse 36vw 13vh at 22% 68%, rgba(34, 211, 166, 0.085), rgba(34, 211, 166, 0) 70%),
    radial-gradient(ellipse 42vw 15vh at 70% 32%, rgba(34, 211, 166, 0.065), rgba(34, 211, 166, 0) 72%),
    radial-gradient(ellipse 30vw 11vh at 48% 84%, rgba(182, 255, 46, 0.055), rgba(182, 255, 46, 0) 70%),
    radial-gradient(ellipse 28vw 10vh at 84% 60%, rgba(140, 235, 150, 0.055), rgba(140, 235, 150, 0) 70%);
  animation: dnb-fog 48s steps(1, end) infinite;
}

/* ---- the mast's AIRCRAFT BEACON: a tiny red lamp pinned to the tower
   tip (tower art: 300px-wide anchor, right 8px — tip lands 151px in,
   464px up). Double-blinks then holds dark for four beats (5.516s =
   4 x 1.379 — same clock as everything else). The one warm colour in
   the frame, and the story beat that says the rig is transmitting. ---- */
body::after {
  content: "";
  display: var(--dnb-scenery, block);
  position: fixed;
  right: 151px;
  bottom: 464px;
  width: 14px;
  height: 14px;
  z-index: -1;
  pointer-events: none;
  border-radius: 50%;
  background: radial-gradient(circle, #ff6a55 0 3px, rgba(255, 106, 85, 0.5) 5px, rgba(255, 106, 85, 0) 7px);
  box-shadow: 0 0 16px rgba(255, 90, 74, 0.7);
  animation: dnb-beacon 5.516s steps(1, end) infinite;
}

/* ---- scope graticule: a faint measurement grid UNDER the ink (z -1),
   attached to the roll/slideshow so it rides the content — a fine
   screen-fixed grid here would slide across tracked glyphs at ~20Hz
   and paint flicker on the words. Static: never animate a roll
   descendant. ---- */
.credits-roll::before,
.credits-slideshow::before {
  content: "";
  display: var(--dnb-scenery, block);
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    repeating-linear-gradient(to bottom, rgba(34, 211, 166, 0.07) 0 1px, transparent 1px 64px),
    repeating-linear-gradient(to right, rgba(34, 211, 166, 0.055) 0 1px, transparent 1px 64px);
  /* feather the grid's ends so no hard seam crawls with the roll */
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 320px, #000 calc(100% - 320px), transparent 100%);
  mask-image: linear-gradient(to bottom, transparent 0, #000 320px, #000 calc(100% - 320px), transparent 100%);
}

/* ---- tracklist structure: stencil title over a waveform divider,
   left-ragged measure. Works in BOTH modes (slideshow slides have no
   .credits-block wrapper — style title/list directly). ---- */
.credits-block__title,
.credits-block__list {
  box-sizing: border-box;
  width: var(--dnb-measure);
  text-align: left;
}
.credits-block__title {
  font-weight: 400; /* Saira Stencil One ships 400 only — avoid faux-bold smear */
  letter-spacing: 0.22em;
  margin: 0 0 1.1rem;
  /* sharper neon edge on the acid green: a tight near-white core + a hot
     inner ring, then the softer bloom — the section head reads as a lit
     tube, not a flat glowing fill */
  color: #eaffbe;
  text-shadow:
    0 0 1px rgba(255, 255, 255, 0.85),
    0 0 5px rgba(182, 255, 46, 0.9),
    0 0 16px rgba(182, 255, 46, 0.55),
    0 0 40px rgba(140, 235, 70, 0.28),
    var(--credits-shadow);
}
.credits-block__title::before {
  content: ">> ";
  color: var(--dnb-teal);
  text-shadow: 0 0 12px rgba(34, 211, 166, 0.45);
}
/* the title rule IS the waveform: an SVG scope trace that belongs to the
   block, inside the roll, riding the crawl (flicker-safe by construction) */
.credits-block__title::after {
  display: var(--dnb-scenery, block);
  width: 100%;
  height: 26px;
  margin: 0.55rem 0 0;
  opacity: 0.9;
  background: var(--dnb-wave) repeat-x left center / 170px 26px;
  -webkit-mask-image: linear-gradient(to right, #000 72%, transparent 100%);
  mask-image: linear-gradient(to right, #000 72%, transparent 100%);
}
/* cycle the three traces so consecutive blocks never repeat a squiggle
   (slides carry the title directly — no .credits-block wrapper). These sit
   ABOVE the raid override so the finale's ink square-wave still wins. */
.credits-block:nth-of-type(3n + 2) .credits-block__title::after,
.credits-slide:nth-of-type(3n + 2) .credits-block__title::after {
  background-image: var(--dnb-wave2);
}
.credits-block:nth-of-type(3n) .credits-block__title::after,
.credits-slide:nth-of-type(3n) .credits-block__title::after {
  background-image: var(--dnb-wave3);
}

/* ---- rows: rave-tape tracklist. Mono, numbered, amounts as [500]
   levels on the right. Names are sacred: they wrap, never clip. ---- */
.credits-block__list { counter-reset: dnb-track; }
.credit {
  counter-increment: dnb-track;
  display: flex;
  align-items: baseline;
  width: 100%;
}
.credit::before {
  content: counter(dnb-track, decimal-leading-zero);
  flex: none;
  margin-right: 0.9em;
  font-size: 0.78em;
  letter-spacing: 0.12em;
  color: var(--dnb-teal);
  opacity: 0.75;
}
.credit__name {
  min-width: 0;
  overflow-wrap: anywhere;
  padding-right: 1rem;
  letter-spacing: 0.02em;
  text-shadow: 0 0 9px rgba(34, 211, 166, 0.22), var(--credits-shadow);
}
.credit__amount {
  flex: none;
  margin-left: auto;
  opacity: 1;
  color: var(--dnb-green);
  text-shadow: 0 0 10px rgba(182, 255, 46, 0.35), var(--credits-shadow);
}
.credit__amount::before { content: "["; opacity: 0.65; }
.credit__amount::after { content: "]"; opacity: 0.65; }

/* ---- intro: transmission ident. Badge + rating are copy-swappable;
   title/tagline are streamer content — restyle ONLY. ---- */
.flourish--intro::before,
.flourish--intro::after {
  content: "";
  display: var(--dnb-scenery, block);
  width: min(430px, 80vw);
  height: 26px;
  opacity: 0.5;
  background: var(--dnb-wave) repeat-x center / 170px 26px;
}
.flourish--intro::after { background-image: var(--dnb-wave2); } /* vary the exit trace */
.flourish__badge { font-size: 0; border: 0; padding: 0; box-shadow: none; border-radius: 0; position: relative; }
/* faint scope-graticule patch seating the badge — SMALL area behind the
   chip only (never full-screen), coarse 24px cells, radially feathered.
   It rides the roll with the badge: static, flicker-safe by construction. */
.flourish__badge::before {
  content: "";
  display: var(--dnb-scenery, block);
  position: absolute;
  inset: -2.2rem -5.4rem; /* ~430px wide — rhymes with the intro waveforms */
  z-index: -1;
  pointer-events: none;
  background:
    /* scope centre axis, slightly brighter than the cells */
    linear-gradient(to bottom, transparent calc(50% - 1px), rgba(34, 211, 166, 0.4) calc(50% - 1px) calc(50% + 1px), transparent calc(50% + 1px)),
    repeating-linear-gradient(to bottom, rgba(34, 211, 166, 0.26) 0 1px, transparent 1px 24px),
    repeating-linear-gradient(to right, rgba(34, 211, 166, 0.26) 0 1px, transparent 1px 24px);
  -webkit-mask-image: radial-gradient(ellipse 62% 60% at 50% 50%, #000 32%, transparent 76%);
  mask-image: radial-gradient(ellipse 62% 60% at 50% 50%, #000 32%, transparent 76%);
}
.flourish__badge::after {
  content: "TRANSMITTING >> LIVE";
  display: inline-block;
  font-family: var(--credits-font);
  font-size: 0.82rem;
  line-height: 1;
  letter-spacing: 0.34em;
  padding: 0.55rem 0.9rem 0.5rem 1.15rem;
  color: var(--dnb-green);
  border: 1px solid rgba(182, 255, 46, 0.6);
  box-shadow: 0 0 16px rgba(182, 255, 46, 0.25), inset 0 0 10px rgba(182, 255, 46, 0.08);
}
.flourish__title {
  font-weight: 400; /* stencil has no bold */
  letter-spacing: 0.1em;
  line-height: 1.02;
}
/* neon-tube ident: a near-white hot filament core, the saturated acid tube
   glow at mid radius, then a wide low-alpha bloom halo — the tube's light
   spilling into the warehouse haze. Reads as lit glass, not flat text. */
.flourish--intro .flourish__title {
  color: #f4ffd6; /* hot filament core is near-white, not flat acid */
  text-shadow:
    0 0 1px rgba(255, 255, 255, 0.95),
    0 0 3px rgba(224, 255, 150, 0.95),
    0 0 9px rgba(182, 255, 46, 0.9),
    0 0 20px rgba(182, 255, 46, 0.6),
    0 0 44px rgba(150, 240, 80, 0.42),
    0 0 82px rgba(120, 220, 60, 0.24),
    var(--credits-shadow);
}
.flourish--intro .flourish__tagline {
  font-style: normal;
  text-transform: uppercase;
  font-family: var(--credits-font);
  font-size: 0.95rem;
  letter-spacing: 0.3em;
  color: var(--dnb-teal);
  opacity: 0.9;
}
.flourish__rating { font-size: 0; border: 0; padding: 0; opacity: 1; border-radius: 0; }
.flourish__rating::after {
  content: "18+ JUNGLIST BUSINESS";
  display: inline-block;
  font-family: var(--credits-font);
  font-size: 0.78rem;
  letter-spacing: 0.3em;
  padding: 0.35rem 0.8rem;
  color: var(--dnb-teal);
  border: 1px solid rgba(34, 211, 166, 0.55);
}

/* ---- outro: the signal dies. Copy swap allowed here (outro only). ---- */
.flourish--outro::before {
  content: "";
  display: var(--dnb-scenery, block);
  width: min(430px, 78vw);
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(34, 211, 166, 0.85) 18% 82%, transparent);
  box-shadow: 0 0 14px rgba(34, 211, 166, 0.5); /* static flatline glow */
}
.flourish--outro .flourish__title { font-size: 0; }
.flourish--outro .flourish__title::after {
  content: "SIGNAL LOST";
  font-size: var(--credits-flourish-title-size);
  letter-spacing: 0.14em;
  color: var(--dnb-text);
  text-shadow: 0 0 22px rgba(34, 211, 166, 0.4), var(--credits-shadow);
}
.flourish--outro .flourish__tagline { font-size: 0; font-style: normal; }
.flourish--outro .flourish__tagline::after {
  content: "big up the crew — hold tight for the next transmission";
  font-family: var(--credits-font);
  font-size: 1rem;
  letter-spacing: 0.18em;
  color: var(--dnb-dim);
}
.flourish--outro::after {
  content: "NO CARRIER";
  display: var(--dnb-scenery, block);
  font-family: var(--credits-font);
  font-size: 0.72rem;
  letter-spacing: 0.5em;
  color: rgba(232, 255, 224, 0.38);
}

/* ---- raid finale: INCOMING >> RAID. The outro flourish is the true last
   sibling in both modes, so the raid block is nth-last-of-type(2). The
   title inverts into a solid acid block (static — animating background
   would repaint); only the small kicker line blinks, steps() on the beat
   = 1.45 paints/s (inside-roll budget is <= 2). The whole block sits in
   a static acid halo — the desk overloading — and signs off with a
   hazard-taped limiter readout under the names. ---- */
.credits-block:nth-last-of-type(2) {
  background: radial-gradient(ellipse 58% 60% at 50% 38%, rgba(182, 255, 46, 0.10), rgba(182, 255, 46, 0) 74%);
}
.credits-slide:nth-last-of-type(2):not(.flourish) {
  background: radial-gradient(ellipse 62% 56% at 50% 46%, rgba(182, 255, 46, 0.09), rgba(182, 255, 46, 0) 80%);
}
.credits-block:nth-last-of-type(2) .credits-block__title,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
  /* glossy overloaded-alert slab: a diagonal specular sheen across the acid
     plastic (static highlight on a prop — rides the roll, L6-safe) */
  background:
    linear-gradient(122deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.1) 20%, rgba(255, 255, 255, 0) 42%),
    var(--dnb-green);
  color: var(--dnb-ink);
  font-size: calc(var(--credits-title-size) * 1.12); /* the alert shouts */
  padding: 0.2em 0.55em 0.16em 0.5em;
  border-left: 4px solid var(--dnb-teal); /* hard alert spine */
  text-shadow: none;
  box-shadow: 0 0 26px rgba(182, 255, 46, 0.45), 0 0 70px rgba(182, 255, 46, 0.18);
}
.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  content: ">> INCOMING >> RAID >>";
  display: block;
  font-family: var(--credits-font);
  font-size: 0.42em;
  letter-spacing: 0.32em;
  margin-bottom: 0.5em;
  color: var(--dnb-ink);
  text-shadow: none;
  animation: dnb-alert 1.379s steps(1, end) infinite;
}
/* divider inside the acid bar flips to an ink square-wave: the raid is
   clipping the limiter */
.credits-block:nth-last-of-type(2) .credits-block__title::after,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::after {
  height: 5px;
  margin-top: 0.5em;
  opacity: 0.85;
  background: repeating-linear-gradient(90deg, var(--dnb-ink) 0 10px, transparent 10px 20px);
}
.credits-block:nth-last-of-type(2) .credit,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit {
  font-size: calc(var(--credits-name-size) * 1.08);
}
.credits-block:nth-last-of-type(2) .credit__name,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__name {
  text-shadow: 0 0 12px rgba(182, 255, 46, 0.5), var(--credits-shadow);
}
/* raid track numbers run hot; raid levels invert into acid slabs — the
   channel strips are pinned */
.credits-block:nth-last-of-type(2) .credit::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit::before {
  color: var(--dnb-green);
  opacity: 1;
  text-shadow: 0 0 8px rgba(182, 255, 46, 0.45);
}
.credits-block:nth-last-of-type(2) .credit__amount,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__amount {
  color: var(--dnb-ink);
  background: var(--dnb-green);
  padding: 0 0.45em;
  text-shadow: none;
  box-shadow: 0 0 14px rgba(182, 255, 46, 0.35);
}
/* limiter readout under the raid names: hazard tape + status line. It
   rides the roll (static in-roll decor — flicker-safe by construction). */
.credits-block:nth-last-of-type(2) .credits-block__list::after,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__list::after {
  content: "+6 dB >> LIMITER PINNED >> HOLD TIGHT";
  display: var(--dnb-scenery, block);
  margin-top: 1.5rem;
  padding-top: 0.9rem;
  font-size: 0.72rem;
  letter-spacing: 0.3em;
  color: var(--dnb-teal);
  text-shadow: 0 0 10px rgba(34, 211, 166, 0.4);
  background: repeating-linear-gradient(-45deg, rgba(182, 255, 46, 0.7) 0 10px, transparent 10px 20px) top left / 100% 5px no-repeat;
}

/* ---- slideshow: digital dropout cut — the base 0.8s dissolve becomes a
   chunky steps() fade (transient, fires once per slide change) ---- */
.credits-slide { transition: opacity 0.55s steps(6, end); }

/* ---- keyframes (all dnb- prefixed; opacity-only, steps-quantized) ---- */
@keyframes dnb-throb {
  0%, 100% { opacity: 0.95; }
  50%      { opacity: 0.55; }
}
@keyframes dnb-blink {
  0%, 100% { opacity: 1; }
  64%      { opacity: 0.45; }
}
@keyframes dnb-alert {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.22; }
}
/* spectrum bar-group bounce: each layer holds a discrete scaleY level then jumps
   (steps(1) between stops) -- 5 levels per cycle, non-monotonic so bars read like
   live audio. transform-origin bottom keeps them planted on the deck; translateZ(0)
   keeps each layer promoted so the hop is compositor-only. The four layers run
   these at 1.1/1.5/1.9/2.3s (see the rule) so the row never re-aligns. */
@keyframes dnb-eq1 {
  0%  { transform: translateZ(0) scaleY(0.50); }
  20% { transform: translateZ(0) scaleY(1.00); }
  40% { transform: translateZ(0) scaleY(0.68); }
  60% { transform: translateZ(0) scaleY(0.90); }
  80% { transform: translateZ(0) scaleY(0.58); }
  100%{ transform: translateZ(0) scaleY(0.50); }
}
@keyframes dnb-eq2 {
  0%  { transform: translateZ(0) scaleY(0.90); }
  20% { transform: translateZ(0) scaleY(0.52); }
  40% { transform: translateZ(0) scaleY(1.00); }
  60% { transform: translateZ(0) scaleY(0.64); }
  80% { transform: translateZ(0) scaleY(0.80); }
  100%{ transform: translateZ(0) scaleY(0.90); }
}
@keyframes dnb-eq3 {
  0%  { transform: translateZ(0) scaleY(0.60); }
  20% { transform: translateZ(0) scaleY(0.82); }
  40% { transform: translateZ(0) scaleY(0.50); }
  60% { transform: translateZ(0) scaleY(0.95); }
  80% { transform: translateZ(0) scaleY(0.70); }
  100%{ transform: translateZ(0) scaleY(0.60); }
}
@keyframes dnb-eq4 {
  0%  { transform: translateZ(0) scaleY(0.78); }
  20% { transform: translateZ(0) scaleY(0.55); }
  40% { transform: translateZ(0) scaleY(0.92); }
  60% { transform: translateZ(0) scaleY(0.60); }
  80% { transform: translateZ(0) scaleY(1.00); }
  100%{ transform: translateZ(0) scaleY(0.78); }
}
/* MC shout window: dark 2 beats, lit 2 beats, dark 12 = 2 hops / 22s */
@keyframes dnb-shout {
  0%, 100% { opacity: 0; }
  12.5%    { opacity: 1; }
  25%      { opacity: 0; }
}
/* mast beacon: double-blink, then dark for the rest of four beats */
@keyframes dnb-beacon {
  0%, 4%   { opacity: 1; }
  5%, 9%   { opacity: 0.12; }
  10%, 14% { opacity: 1; }
  15%, 100% { opacity: 0.12; }
}
/* near fog: ten held positions over 48s = one hop per 4.8s */
@keyframes dnb-fog {
  0%   { transform: translate3d(0, 0, 0); }
  10%  { transform: translate3d(1.8vw, -0.6vh, 0); }
  20%  { transform: translate3d(3.2vw, -1.2vh, 0); }
  30%  { transform: translate3d(2vw, -1.8vh, 0); }
  40%  { transform: translate3d(-0.5vw, -1.3vh, 0); }
  50%  { transform: translate3d(-2.6vw, -0.5vh, 0); }
  60%  { transform: translate3d(-3.4vw, 0.6vh, 0); }
  70%  { transform: translate3d(-2vw, 1.1vh, 0); }
  80%  { transform: translate3d(0.5vw, 0.9vh, 0); }
  90%  { transform: translate3d(1.4vw, 0.4vh, 0); }
  100% { transform: translate3d(0, 0, 0); }
}

/* ---- reduced motion: the rig holds steady — arcs parked bright, ON AIR
   parked lit, spectrum parked on frame A, MC chips parked faint but
   visible, fog hangs still, raid kicker parked, dissolve smooth ---- */
@media (prefers-reduced-motion: reduce) {
  html::before,
  head::before,
  head::after,
  head meta:first-of-type::before,
  head title::before,
  head title::after,
  body::before,
  body::after,
  .credits-block:nth-last-of-type(2) .credits-block__title::before,
  .credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
    animation: none;
  }
  head meta:first-of-type::after,
  head meta:last-of-type::before,
  head meta:last-of-type::after {
    animation: none;
    opacity: 0.8;
  }
  .credits-slide { transition: opacity 0.8s ease; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--dnb-scenery:none;}",
};
