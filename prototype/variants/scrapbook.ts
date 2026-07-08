import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. Corkboard: THE MEMORY WALL, 1 A.M. — a dusk-dark bedroom wall covered in the stream's history: colorful pinned snapshots, fairy lights strung across with warm bokeh, neon-marker doodles ("best stream ever!!"), a corkboard section with red threads converging on a THANK YOU card, and the desk lamp below pooling warm light up the wall. Each credits block is a polaroid hung on the light string. */
export const VARIANT: ThemeVariant = {
  key: "scrapbook",
  name: "Corkboard",
  css: `
/* ================================================================
   CORKBOARD — "the memory wall, late at night".
   Fiction: 1 A.M. The streamer's bedroom wall, every inch covered in
   the stream's history. Two strings of fairy lights swag across the
   top and pour warm bokeh down the wall. Colorful snapshots — a
   sunset, a pixel game clip, the raid party, the night sky — hang at
   lively angles under pins and neon washi. A small corkboard carries
   red threads from its pins to a hand-inked THANK YOU card. The desk
   lamp below throws a warm pool up the plum-dark wall. The credits
   themselves are polaroids strung on a fairy-light wire: warm-white
   frames, real dusk photos inside, captions in marker, heart-counts.
   Layer map (all scenery kill-switched via --scrapbook-scenery):
     html bg (--credits-bg)   the dusk wall: deep blue/plum gradient,
                              coarse tonal zones, warm lamp lift low
     html::before             LIGHT STORY — warm fairy band along the
                              top, the lamp's pool rising from the
                              lower-right, plum ambient, vignette.
                              STATIC, promoted, all coarse
     html::after              THE FAIRY-LIGHT STRINGS — two swags of
                              dark wire with glowing warm bulbs (a few
                              pink/mint), full-width top. STATIC
     head title::before       NEON DOODLES — "best stream ever!!",
                              "gg!", hearts, stars, arrows, washi.
                              Gutters/edges only. STATIC, promoted
     head title::after        THE PHOTO WALL — ten colorful pinned
                              snapshots clustered in both gutters.
                              STATIC, promoted
     head::before             the CORKBOARD SECTION, lower-left: red
                              threads pin-to-pin converging on a
                              THANK YOU card. STATIC, promoted
     head::after              the DESK LAMP from below, lower-right:
                              shade tipped up, hot bulb, light cone up
                              the wall, desk edge. STATIC, promoted
     meta#1::before           BOKEH SET A — soft warm light orbs high
                              on the wall; steps() opacity twinkle
     meta#1::after            BOKEH SET B — alternate-phase twinkle
     meta#2::before           the DROP-IN — every ~30s a new snapshot
                              drops onto the wall and settles, then
                              fades for the next one (small box)
     meta#2::after            a DANGLING PHOTO swinging on its pin
                              under string B (small box)
     body::before             warm lamp dust — 3 huge soft motes,
                              steps(1) drift, one hop per 5s
     body::after              center-lane readability scrim. STATIC
     .credits-roll::before    faint wall-grain print riding the roll
   will-change budget: 2 (swing, drop-in)
   ================================================================ */
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Kalam:wght@300;400;700&family=Nunito+Sans:ital,wght@0,600;0,800;1,600&display=swap');

:root {
  /* ── palette: the wall at night ── */
  --scrapbook-scenery: block; /* set to none to strip every scenery layer */
  --sb-wall: #201d3c;
  --sb-wall-deep: #14112a;
  --sb-paper: #fdf8ec;
  --sb-ink: #2c3038;          /* marker midnight */
  --sb-fairy: #ffd98a;        /* warm bulb glow */
  --sb-pink: #ff5fa2;         /* neon marker pink */
  --sb-cyan: #4fe3d9;         /* neon marker cyan */
  --sb-gold: #ffd45e;         /* star gold */
  --sb-thread: #ff5964;       /* corkboard thread red */
  --sb-heart: #ff6f8e;        /* heart-count pink */

  /* ── the developed instant-photos each polaroid holds — three
     distinct dusk memories, cycled per block (see nth-of-type below).
     Each is one unbroken data-URI line. ── */
  --sb-photo: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' preserveAspectRatio='xMidYMid slice'%3E %3Cdefs%3E %3ClinearGradient id='skyA' x1='0' y1='0' x2='0' y2='1'%3E %3Cstop offset='0' stop-color='%233a5170'/%3E%3Cstop offset='.34' stop-color='%237d6f8e'/%3E%3Cstop offset='.56' stop-color='%23c98d76'/%3E%3Cstop offset='.72' stop-color='%23e6a878'/%3E%3Cstop offset='1' stop-color='%23f0c489'/%3E %3C/linearGradient%3E %3CradialGradient id='sunA' cx='50%25' cy='70%25' r='42%25'%3E %3Cstop offset='0' stop-color='%23fff3d4'/%3E%3Cstop offset='.3' stop-color='%23ffd9a0' stop-opacity='.85'/%3E%3Cstop offset='1' stop-color='%23ffd9a0' stop-opacity='0'/%3E %3C/radialGradient%3E %3ClinearGradient id='ah3' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%239a8fa2'/%3E%3Cstop offset='1' stop-color='%238a8098'/%3E%3C/linearGradient%3E %3ClinearGradient id='ah2' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%236a5f72'/%3E%3Cstop offset='1' stop-color='%23514a5e'/%3E%3C/linearGradient%3E %3ClinearGradient id='ah1' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23332b3a'/%3E%3Cstop offset='1' stop-color='%231c1824'/%3E%3C/linearGradient%3E %3CradialGradient id='vigA' cx='50%25' cy='46%25' r='62%25'%3E%3Cstop offset='.5' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%230a0710' stop-opacity='.5'/%3E%3C/radialGradient%3E %3Cfilter id='grA'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='4' result='n'/%3E%3CfeColorMatrix in='n' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0'/%3E%3C/filter%3E %3C/defs%3E %3Crect width='400' height='300' fill='url(%23skyA)'/%3E %3Ccircle cx='200' cy='210' r='150' fill='url(%23sunA)'/%3E %3Cpath d='M0 150 Q80 128 150 144 T300 140 T400 148 L400 300 L0 300 Z' fill='url(%23ah3)' opacity='.7'/%3E %3Cpath d='M0 182 Q90 158 180 176 T340 172 L400 180 L400 300 L0 300 Z' fill='url(%23ah2)' opacity='.85'/%3E %3Cpath d='M0 216 Q110 192 210 214 T400 210 L400 300 L0 300 Z' fill='url(%23ah1)'/%3E %3Crect width='400' height='300' fill='url(%23vigA)'/%3E %3Crect width='400' height='300' filter='url(%23grA)'/%3E %3C/svg%3E");
  --sb-photo-b: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' preserveAspectRatio='xMidYMid slice'%3E %3Cdefs%3E %3ClinearGradient id='skyB' x1='0' y1='0' x2='0' y2='1'%3E %3Cstop offset='0' stop-color='%2333474a'/%3E%3Cstop offset='.4' stop-color='%235f7d76'/%3E%3Cstop offset='.7' stop-color='%23b8b183'/%3E%3Cstop offset='1' stop-color='%23e4d29a'/%3E %3C/linearGradient%3E %3CradialGradient id='sunB' cx='42%25' cy='64%25' r='40%25'%3E %3Cstop offset='0' stop-color='%23fdf6d8'/%3E%3Cstop offset='.4' stop-color='%23f0e3a8' stop-opacity='.7'/%3E%3Cstop offset='1' stop-color='%23f0e3a8' stop-opacity='0'/%3E %3C/radialGradient%3E %3ClinearGradient id='r3' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%238fa39a'/%3E%3Cstop offset='1' stop-color='%237e948b'/%3E%3C/linearGradient%3E %3ClinearGradient id='r2' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%234f665c'/%3E%3Cstop offset='1' stop-color='%233c524a'/%3E%3C/linearGradient%3E %3ClinearGradient id='r1' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23212f2a'/%3E%3Cstop offset='1' stop-color='%23141d1a'/%3E%3C/linearGradient%3E %3CradialGradient id='vigB' cx='50%25' cy='46%25' r='62%25'%3E %3Cstop offset='.5' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%230a0710' stop-opacity='.5'/%3E %3C/radialGradient%3E %3Cfilter id='grB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='4' result='n'/%3E%3CfeColorMatrix in='n' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0'/%3E%3C/filter%3E %3C/defs%3E %3Crect width='400' height='300' fill='url(%23skyB)'/%3E %3Ccircle cx='168' cy='192' r='120' fill='url(%23sunB)'/%3E %3Cpath d='M0 152 L26 132 L44 150 L70 126 L92 150 L116 130 L140 152 L400 150 L400 300 L0 300 Z' fill='url(%23r3)' opacity='.55'/%3E %3Cpath d='M0 186 L34 158 L58 184 L86 156 L118 186 L150 160 L182 188 L400 182 L400 300 L0 300 Z' fill='url(%23r2)' opacity='.8'/%3E %3Cpath d='M0 222 L40 194 L74 222 L110 192 L150 224 L196 196 L240 224 L400 216 L400 300 L0 300 Z' fill='url(%23r1)'/%3E %3Crect width='400' height='300' fill='url(%23vigB)'/%3E %3Crect width='400' height='300' filter='url(%23grB)'/%3E %3C/svg%3E");
  --sb-photo-c: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' preserveAspectRatio='xMidYMid slice'%3E %3Cdefs%3E %3ClinearGradient id='skyC' x1='0' y1='0' x2='0' y2='1'%3E %3Cstop offset='0' stop-color='%236a4a6a'/%3E%3Cstop offset='.35' stop-color='%23c56f5a'/%3E%3Cstop offset='.62' stop-color='%23eea24e'/%3E%3Cstop offset='1' stop-color='%23f6cf6e'/%3E %3C/linearGradient%3E %3CradialGradient id='sunC' cx='52%25' cy='78%25' r='40%25'%3E %3Cstop offset='0' stop-color='%23fffbe4'/%3E%3Cstop offset='.35' stop-color='%23ffe08a' stop-opacity='.85'/%3E%3Cstop offset='1' stop-color='%23ffe08a' stop-opacity='0'/%3E %3C/radialGradient%3E %3ClinearGradient id='seaC' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23c98a54'/%3E%3Cstop offset='.5' stop-color='%237a5560'/%3E%3Cstop offset='1' stop-color='%233a2c42'/%3E%3C/linearGradient%3E %3CradialGradient id='vigC' cx='50%25' cy='46%25' r='62%25'%3E %3Cstop offset='.5' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%230a0710' stop-opacity='.5'/%3E%3C/radialGradient%3E %3Cfilter id='grC'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='4' result='n'/%3E%3CfeColorMatrix in='n' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0'/%3E%3C/filter%3E %3C/defs%3E %3Crect width='400' height='300' fill='url(%23skyC)'/%3E %3Ccircle cx='208' cy='196' r='30' fill='%23fff4cc'/%3E %3Ccircle cx='208' cy='196' r='120' fill='url(%23sunC)'/%3E %3Crect x='0' y='196' width='400' height='104' fill='url(%23seaC)'/%3E %3Cpath d='M188 196 h40 l30 104 h-100 Z' fill='%23ffe8a4' opacity='.4'/%3E %3Cg fill='%23ffe8a4' opacity='.5'%3E%3Crect x='150' y='212' width='100' height='2'/%3E%3Crect x='120' y='230' width='160' height='2.4'/%3E%3Crect x='96' y='250' width='208' height='2.6'/%3E%3Crect x='80' y='274' width='240' height='3'/%3E%3C/g%3E %3Cpath d='M0 194 Q40 186 78 192 L78 200 L0 200 Z' fill='%232c2438' opacity='.5'/%3E %3Crect width='400' height='300' fill='url(%23vigC)'/%3E %3Crect width='400' height='300' filter='url(%23grC)'/%3E %3C/svg%3E");

  /* ── base hooks ── */
  /* The wall itself: a deep dusk blue/plum field falling darker toward
     the corners, a plum ambient bloom mid-left, and a warm lift low on
     the wall where the lamp light lands. All coarse — never flickers. */
  --credits-bg:
    radial-gradient(ellipse 60vw 46vh at 82% 100%, rgba(255, 176, 108, 0.16), rgba(255, 176, 108, 0) 70%),
    radial-gradient(ellipse 54vw 40vh at 18% 92%, rgba(214, 140, 96, 0.07), rgba(214, 140, 96, 0) 68%),
    radial-gradient(ellipse 70vw 50vh at 30% 30%, rgba(96, 74, 148, 0.14), rgba(96, 74, 148, 0) 70%),
    radial-gradient(ellipse 46vw 36vh at 70% 22%, rgba(70, 96, 158, 0.12), rgba(70, 96, 158, 0) 68%),
    linear-gradient(168deg, #262a4c 0%, #272148 22%, #221d40 45%, #1b1836 66%, #151228 85%, #0e0c1e 100%);
  --credits-color: #f6ecd8;
  --credits-accent: var(--sb-pink);
  --credits-font: "Kalam", "Comic Sans MS", "Segoe Print", cursive;
  --credits-title-font: "Caveat", "Bradley Hand", "Segoe Script", cursive;
  --credits-title-size: clamp(1.9rem, 4.6vw, 3rem);
  --credits-name-size: clamp(1.05rem, 2.5vw, 1.5rem);
  --credits-flourish-title-size: clamp(2.6rem, 9vw, 5.4rem);
  --credits-block-gap: 5.5rem;
  --credits-name-gap: 0.5rem;
  --credits-shadow: 0 1px 6px rgba(6, 4, 16, 0.5);
  /* glow no-op — never "none" (a "none" in the composed shadow list
     invalidates the whole declaration); Corkboard glows are bespoke. */
  --credits-glow: 0 0 0 rgba(0, 0, 0, 0);
}

/* Scenery is full-bleed: drop the base edge-fade on html ONLY; body keeps
   the base mask so the polaroids ease in at the bottom and out at the top. */
html { -webkit-mask-image: none; mask-image: none; }
body { background: transparent; }

/* ═══ THE LIGHT STORY — one static promoted layer. The fairy strings
   breathe a warm band along the top of the wall; the desk lamp pours
   its pool up from the lower-right; a soft plum ambient keeps the
   mid-wall alive; the corners fall to night. Everything huge and
   soft — nothing can flicker. */
html::before {
  content: "";
  display: var(--scrapbook-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background:
    /* corner vignette — the night presses in, eased, no mid-frame shelf */
    radial-gradient(ellipse 136% 130% at 50% 40%, rgba(6, 4, 16, 0) 58%, rgba(6, 4, 16, 0.24) 82%, rgba(4, 2, 12, 0.55) 100%),
    /* fairy band: warm light hugging the top of the wall */
    linear-gradient(180deg, rgba(255, 214, 140, 0.13) 0%, rgba(255, 214, 140, 0.05) 12%, rgba(255, 214, 140, 0) 26%),
    /* glow pools directly under the brightest bulb runs */
    radial-gradient(ellipse 24vw 16vh at 26% 12%, rgba(255, 217, 138, 0.14), rgba(255, 217, 138, 0) 70%),
    radial-gradient(ellipse 22vw 14vh at 55% 8%, rgba(255, 217, 138, 0.11), rgba(255, 217, 138, 0) 70%),
    radial-gradient(ellipse 24vw 15vh at 82% 14%, rgba(255, 217, 138, 0.13), rgba(255, 217, 138, 0) 70%),
    /* THE LAMP POOL: warm light climbing the wall from the lower-right */
    radial-gradient(ellipse 40vw 52vh at 84% 102%, rgba(255, 196, 120, 0.30), rgba(255, 188, 114, 0.10) 52%, rgba(255, 188, 114, 0) 78%),
    /* its long soft carry across the lower wall */
    radial-gradient(ellipse 70vw 44vh at 55% 100%, rgba(240, 168, 110, 0.10), rgba(240, 168, 110, 0) 72%),
    /* plum ambient so the mid-wall never goes dead */
    radial-gradient(ellipse 56vw 48vh at 34% 46%, rgba(110, 86, 168, 0.10), rgba(110, 86, 168, 0) 70%);
}

/* ═══ THE FAIRY-LIGHT STRINGS — two swags of dark wire across the top
   of the wall, hung with warm glowing bulbs (two pink, two mint for
   personality). The source of the night's light. STATIC, promoted. */
html::after {
  content: "";
  display: var(--scrapbook-scenery, block);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 340px;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% auto;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 320' width='1920' height='320'%3E%3Cdefs%3E%3CradialGradient id='gw' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0' stop-color='%23ffe9b0' stop-opacity='.9'/%3E%3Cstop offset='.35' stop-color='%23ffd98a' stop-opacity='.38'/%3E%3Cstop offset='1' stop-color='%23ffd98a' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='gp' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0' stop-color='%23ffc9df' stop-opacity='.9'/%3E%3Cstop offset='.35' stop-color='%23ff8fc2' stop-opacity='.34'/%3E%3Cstop offset='1' stop-color='%23ff8fc2' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='gc' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0' stop-color='%23d2fff7' stop-opacity='.9'/%3E%3Cstop offset='.35' stop-color='%237deede' stop-opacity='.32'/%3E%3Cstop offset='1' stop-color='%237deede' stop-opacity='0'/%3E%3C/radialGradient%3E%3Cg id='bw'%3E%3Ccircle r='20' fill='url(%23gw)'/%3E%3Crect x='-2.4' y='-14' width='4.8' height='7.5' rx='1.6' fill='%232a2444'/%3E%3Ccircle r='4.6' fill='%23fff3c9'/%3E%3Ccircle cx='-1.4' cy='-1.4' r='1.4' fill='%23ffffff'/%3E%3C/g%3E%3Cg id='bp'%3E%3Ccircle r='19' fill='url(%23gp)'/%3E%3Crect x='-2.4' y='-14' width='4.8' height='7.5' rx='1.6' fill='%232a2444'/%3E%3Ccircle r='4.4' fill='%23ffd4e6'/%3E%3Ccircle cx='-1.4' cy='-1.4' r='1.4' fill='%23ffffff'/%3E%3C/g%3E%3Cg id='bc'%3E%3Ccircle r='19' fill='url(%23gc)'/%3E%3Crect x='-2.4' y='-14' width='4.8' height='7.5' rx='1.6' fill='%232a2444'/%3E%3Ccircle r='4.4' fill='%23d9fff6'/%3E%3Ccircle cx='-1.4' cy='-1.4' r='1.4' fill='%23ffffff'/%3E%3C/g%3E%3C/defs%3E%3C!-- wires --%3E%3Cpath d='M-20 60 Q480 214 970 112 Q1460 6 1940 150' fill='none' stroke='%23131022' stroke-width='3.2'/%3E%3Cpath d='M-20 59 Q480 213 970 111 Q1460 5 1940 149' fill='none' stroke='%235a4d7a' stroke-width='1' opacity='.4'/%3E%3Cpath d='M-20 176 Q500 74 1000 192 Q1500 306 1940 86' fill='none' stroke='%23131022' stroke-width='3.2'/%3E%3Cpath d='M-20 175 Q500 73 1000 191 Q1500 305 1940 85' fill='none' stroke='%235a4d7a' stroke-width='1' opacity='.4'/%3E%3C!-- bulbs, string A --%3E%3Cuse href='%23bw' x='150' y='118'/%3E%3Cuse href='%23bw' x='320' y='168'/%3E%3Cuse href='%23bp' x='500' y='188'/%3E%3Cuse href='%23bw' x='680' y='178'/%3E%3Cuse href='%23bw' x='840' y='150'/%3E%3Cuse href='%23bw' x='1010' y='112'/%3E%3Cuse href='%23bw' x='1180' y='84'/%3E%3Cuse href='%23bc' x='1350' y='68'/%3E%3Cuse href='%23bw' x='1520' y='70'/%3E%3Cuse href='%23bw' x='1700' y='102'/%3E%3Cuse href='%23bw' x='1860' y='138'/%3E%3C!-- bulbs, string B --%3E%3Cuse href='%23bw' x='120' y='156'/%3E%3Cuse href='%23bc' x='300' y='130'/%3E%3Cuse href='%23bw' x='480' y='126'/%3E%3Cuse href='%23bw' x='660' y='140'/%3E%3Cuse href='%23bp' x='830' y='166'/%3E%3Cuse href='%23bw' x='1000' y='200'/%3E%3Cuse href='%23bw' x='1170' y='232'/%3E%3Cuse href='%23bw' x='1340' y='252'/%3E%3Cuse href='%23bw' x='1500' y='256'/%3E%3Cuse href='%23bw' x='1660' y='224'/%3E%3Cuse href='%23bw' x='1830' y='156'/%3E%3C/svg%3E");
}

/* ═══ NEON DOODLES — the marker layer, riding the <title> void element
   (font-size 0 so the document title's text node never paints). "best
   stream ever!!" in hot pink, "gg!" in cyan by the game clip, hearts,
   stars, arrows, sparkles, neon washi at the edges — ALL gutters/edges,
   never the centre text lane. STATIC, promoted. ═══ */
head title { display: var(--scrapbook-scenery, block); font-size: 0; color: transparent; }
head title::before {
  content: "";
  display: var(--scrapbook-scenery, block);
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080' preserveAspectRatio='xMidYMid slice'%3E%3C!-- best stream ever!! in hot pink marker, right-mid --%3E%3Cg transform='rotate(-6 1600 720)' font-family='Comic Sans MS, Chalkboard SE, cursive' font-weight='bold' font-size='46' text-anchor='middle'%3E%3Ctext x='1610' y='724' fill='none' stroke='%23ff5fa2' stroke-width='9' stroke-linejoin='round' opacity='.22'%3Ebest stream ever!!%3C/text%3E%3Ctext x='1610' y='724' fill='%23ff8fc2'%3Ebest stream ever!!%3C/text%3E%3C/g%3E%3Cpath d='M1420 752 Q1610 782 1800 744' fill='none' stroke='%234fe3d9' stroke-width='5' stroke-linecap='round' opacity='.75'/%3E%3Cpath d='M1440 766 Q1612 792 1784 760' fill='none' stroke='%234fe3d9' stroke-width='3' stroke-linecap='round' opacity='.45'/%3E%3C!-- gg! in cyan by the pixel clip, upper-left --%3E%3Cg transform='rotate(8 500 200)' font-family='Comic Sans MS, Chalkboard SE, cursive' font-weight='bold' font-size='40' text-anchor='middle'%3E%3Ctext x='500' y='208' fill='none' stroke='%234fe3d9' stroke-width='8' stroke-linejoin='round' opacity='.2'%3Egg!%3C/text%3E%3Ctext x='500' y='208' fill='%237deede'%3Egg!%3C/text%3E%3C/g%3E%3C!-- curvy arrow from the doodle toward the kart clip --%3E%3Cg fill='none' stroke='%23ff8fc2' stroke-width='4' stroke-linecap='round' opacity='.7'%3E%3Cpath d='M1470 690 Q1440 640 1478 590'/%3E%3Cpath d='M1462 612 L1478 590 L1494 612'/%3E%3C/g%3E%3C!-- pink marker hearts near the duo photo --%3E%3Cg fill='%23ff6f8e' opacity='.8'%3E%3Cpath d='M1680 306 C1674 295 1658 296 1658 309 C1658 318 1671 326 1680 333 C1689 326 1702 318 1702 309 C1702 296 1686 295 1680 306 Z' transform='rotate(10 1680 314)'/%3E%3Cpath d='M1716 348 C1712 341 1702 342 1702 350 C1702 356 1710 361 1716 365 C1722 361 1730 356 1730 350 C1730 342 1720 341 1716 348 Z'/%3E%3C/g%3E%3C!-- small heart, lower-left by the cat photo --%3E%3Cpath d='M560 700 C555 691 542 692 542 703 C542 711 553 718 560 724 C567 718 578 711 578 703 C578 692 565 691 560 700 Z' fill='%23ff6f8e' opacity='.6'/%3E%3C!-- gold marker stars --%3E%3Cg fill='none' stroke='%23ffd45e' stroke-width='3.4' stroke-linejoin='round' opacity='.8'%3E%3Cpath d='M478 300 L487 324 L512 325 L492 340 L500 365 L478 350 L456 365 L464 340 L444 325 L469 324 Z' transform='rotate(-12 478 332)'/%3E%3C/g%3E%3Cg fill='none' stroke='%23ffd45e' stroke-width='2.6' stroke-linejoin='round' opacity='.6'%3E%3Cpath d='M1270 424 L1276 439 L1292 440 L1279 450 L1284 466 L1270 456 L1256 466 L1261 450 L1248 440 L1264 439 Z' transform='rotate(14 1270 444)'/%3E%3C/g%3E%3C!-- cyan sparkle asterisks --%3E%3Cg stroke='%234fe3d9' stroke-width='3' stroke-linecap='round' opacity='.55'%3E%3Cpath d='M640 236 L640 264 M626 250 L654 250 M630 240 L650 260 M650 240 L630 260'/%3E%3C/g%3E%3Cg stroke='%23ff8fc2' stroke-width='2.4' stroke-linecap='round' opacity='.5'%3E%3Cpath d='M1290 196 L1290 220 M1278 208 L1302 208 M1282 199 L1298 217 M1298 199 L1282 217'/%3E%3C/g%3E%3Cg stroke='%23ffd45e' stroke-width='2.4' stroke-linecap='round' opacity='.45'%3E%3Cpath d='M120 560 L120 584 M108 572 L132 572 M112 563 L128 581 M128 563 L112 581'/%3E%3C/g%3E%3C!-- xoxo, lower-left under the cat photo --%3E%3Cg stroke='%23ff8fc2' stroke-width='3.4' stroke-linecap='round' fill='none' opacity='.6'%3E%3Cpath d='M508 866 L530 890 M530 866 L508 890'/%3E%3Ccircle cx='554' cy='878' r='12'/%3E%3Cpath d='M578 866 L600 890 M600 866 L578 890'/%3E%3C/g%3E%3C!-- neon washi strips at the screen edges --%3E%3Cg opacity='.85'%3E%3Crect x='560' y='-10' width='84' height='26' rx='2' fill='%23ff6fae' opacity='.6' transform='rotate(5 600 3)'/%3E%3Crect x='1852' y='500' width='86' height='26' rx='2' fill='%234fe3d9' opacity='.5' transform='rotate(-9 1894 513)'/%3E%3Crect x='-16' y='390' width='86' height='26' rx='2' fill='%23ffd45e' opacity='.5' transform='rotate(11 26 403)'/%3E%3C/g%3E%3C!-- tally marks: counting streams together --%3E%3Cg stroke='%23c9bfe8' stroke-width='2.8' stroke-linecap='round' opacity='.5'%3E%3Cpath d='M1622 470 L1626 508 M1638 468 L1642 506 M1654 467 L1658 505 M1670 466 L1674 504 M1612 506 L1682 472'/%3E%3C/g%3E%3C/svg%3E");
}

/* ═══ THE PHOTO WALL — ten colorful snapshots pinned in both gutters:
   a sunset, a pixel-game clip, the night sky, the raid party confetti,
   the neon city, the duo, the kart clip, the cat asleep on the desk...
   each with its own scene, tilt, pin or washi. STATIC, promoted. ═══ */
head title::after {
  content: "";
  display: var(--scrapbook-scenery, block);
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080' preserveAspectRatio='xMidYMid slice'%3E%3Cdefs%3E%3ClinearGradient id='fr' x1='0' y1='0' x2='.2' y2='1'%3E%3Cstop offset='0' stop-color='%23fffdf7'/%3E%3Cstop offset='1' stop-color='%23e9e0cb'/%3E%3C/linearGradient%3E%3ClinearGradient id='sun1' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%232b3f66'/%3E%3Cstop offset='.55' stop-color='%23c96f5a'/%3E%3Cstop offset='1' stop-color='%23f6b26b'/%3E%3C/linearGradient%3E%3ClinearGradient id='cty' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%230b0e20'/%3E%3Cstop offset='1' stop-color='%23181d3a'/%3E%3C/linearGradient%3E%3ClinearGradient id='duo' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23904a7c'/%3E%3Cstop offset='1' stop-color='%23e0795c'/%3E%3C/linearGradient%3E%3CradialGradient id='pk' cx='36%25' cy='30%25' r='70%25'%3E%3Cstop offset='0' stop-color='%23ffc9df'/%3E%3Cstop offset='.5' stop-color='%23ff6fae'/%3E%3Cstop offset='1' stop-color='%23b03a72'/%3E%3C/radialGradient%3E%3CradialGradient id='pc' cx='36%25' cy='30%25' r='70%25'%3E%3Cstop offset='0' stop-color='%23c9fff4'/%3E%3Cstop offset='.5' stop-color='%234fd8ca'/%3E%3Cstop offset='1' stop-color='%23227a70'/%3E%3C/radialGradient%3E%3CradialGradient id='pg' cx='36%25' cy='30%25' r='70%25'%3E%3Cstop offset='0' stop-color='%23ffe79a'/%3E%3Cstop offset='.5' stop-color='%23f4c430'/%3E%3Cstop offset='1' stop-color='%23a37c10'/%3E%3C/radialGradient%3E%3Cg id='pinA'%3E%3Cellipse cx='1.5' cy='7' rx='9' ry='3.4' fill='%23060412' opacity='.5'/%3E%3Ccircle r='8' fill='url(%23pk)'/%3E%3Cellipse cx='-3' cy='-3' rx='2.6' ry='2' fill='%23fff' opacity='.7'/%3E%3C/g%3E%3Cg id='pinB'%3E%3Cellipse cx='1.5' cy='7' rx='9' ry='3.4' fill='%23060412' opacity='.5'/%3E%3Ccircle r='8' fill='url(%23pc)'/%3E%3Cellipse cx='-3' cy='-3' rx='2.6' ry='2' fill='%23fff' opacity='.7'/%3E%3C/g%3E%3Cg id='pinC'%3E%3Cellipse cx='1.5' cy='7' rx='9' ry='3.4' fill='%23060412' opacity='.5'/%3E%3Ccircle r='8' fill='url(%23pg)'/%3E%3Cellipse cx='-3' cy='-3' rx='2.6' ry='2' fill='%23fff' opacity='.7'/%3E%3C/g%3E%3C/defs%3E%3C!-- P1 sunset, top-left --%3E%3Cg transform='rotate(-8 165 260)'%3E%3Crect x='86' y='168' width='166' height='198' rx='4' fill='%23060412' opacity='.55' transform='translate(7 10)'/%3E%3Crect x='80' y='160' width='166' height='198' rx='4' fill='url(%23fr)'/%3E%3Crect x='92' y='172' width='142' height='140' fill='url(%23sun1)'/%3E%3Ccircle cx='163' cy='268' r='26' fill='%23ffe9ad'/%3E%3Crect x='92' y='276' width='142' height='36' fill='%23372a44'/%3E%3Cpath d='M150 276 h26 l10 36 h-42 Z' fill='%23ffe9ad' opacity='.35'/%3E%3Cpath d='M100 330 q56 -8 116 0' fill='none' stroke='%23b6613f' stroke-width='3' stroke-linecap='round' opacity='.7'/%3E%3C/g%3E%3Cuse href='%23pinA' x='158' y='158'/%3E%3C!-- P2 pixel game clip, upper-left --%3E%3Cg transform='rotate(6 355 300)'%3E%3Crect x='286' y='222' width='146' height='172' rx='4' fill='%23060412' opacity='.55' transform='translate(6 9)'/%3E%3Crect x='280' y='214' width='146' height='172' rx='4' fill='url(%23fr)'/%3E%3Crect x='291' y='225' width='124' height='120' fill='%2316204a'/%3E%3Cg fill='%23ffffff'%3E%3Crect x='300' y='234' width='3' height='3'/%3E%3Crect x='340' y='246' width='3' height='3'/%3E%3Crect x='390' y='236' width='3' height='3'/%3E%3Crect x='370' y='262' width='3' height='3'/%3E%3C/g%3E%3Cg fill='%233fae5a'%3E%3Crect x='291' y='325' width='124' height='20'/%3E%3Crect x='352' y='305' width='24' height='20'/%3E%3C/g%3E%3Crect x='352' y='297' width='24' height='8' fill='%235ed67c'/%3E%3Crect x='308' y='305' width='14' height='20' fill='%23ff9d3b'/%3E%3Crect x='308' y='297' width='14' height='8' fill='%23ffbf7d'/%3E%3Ccircle cx='344' cy='280' r='6' fill='%23ffd45e'/%3E%3Ccircle cx='366' cy='268' r='6' fill='%23ffd45e'/%3E%3Cpath d='M300 372 q52 -7 106 0' fill='none' stroke='%232c3038' stroke-width='3' stroke-linecap='round' opacity='.5'/%3E%3C/g%3E%3Cg transform='rotate(6 355 300)' opacity='.75'%3E%3Crect x='324' y='206' width='58' height='18' rx='2' fill='%234fe3d9' opacity='.55'/%3E%3C/g%3E%3C!-- P3 night sky, mid-left --%3E%3Cg transform='rotate(-4 180 480)'%3E%3Crect x='116' y='406' width='136' height='160' rx='4' fill='%23060412' opacity='.55' transform='translate(6 9)'/%3E%3Crect x='110' y='398' width='136' height='160' rx='4' fill='url(%23fr)'/%3E%3Crect x='121' y='409' width='114' height='112' fill='%2306040f'/%3E%3Cg fill='%23ffffff'%3E%3Ccircle cx='140' cy='428' r='1.6'/%3E%3Ccircle cx='170' cy='420' r='1.2'/%3E%3Ccircle cx='205' cy='432' r='1.8'/%3E%3Ccircle cx='222' cy='458' r='1.2'/%3E%3Ccircle cx='150' cy='466' r='1.4'/%3E%3Ccircle cx='188' cy='476' r='1.1'/%3E%3Ccircle cx='132' cy='496' r='1.3'/%3E%3C/g%3E%3Ccircle cx='196' cy='452' r='16' fill='%23e08b4a'/%3E%3Cellipse cx='196' cy='452' rx='27' ry='6' fill='none' stroke='%23d9c9a8' stroke-width='2.4' transform='rotate(-18 196 452)'/%3E%3Cpath d='M154 502 q22 12 48 2' fill='none' stroke='%237d6f8e' stroke-width='2' opacity='.7'/%3E%3C/g%3E%3Cuse href='%23pinB' x='178' y='396'/%3E%3C!-- P4 raid party confetti, left --%3E%3Cg transform='rotate(9 380 530)'%3E%3Crect x='312' y='448' width='152' height='178' rx='4' fill='%23060412' opacity='.55' transform='translate(6 10)'/%3E%3Crect x='306' y='440' width='152' height='178' rx='4' fill='url(%23fr)'/%3E%3Crect x='317' y='451' width='130' height='124' fill='%23241539'/%3E%3Cg%3E%3Crect x='330' y='466' width='6' height='6' fill='%23ff5fa2' transform='rotate(20 333 469)'/%3E%3Crect x='366' y='458' width='6' height='6' fill='%234fe3d9' transform='rotate(-15 369 461)'/%3E%3Crect x='402' y='470' width='6' height='6' fill='%23ffd45e' transform='rotate(30 405 473)'/%3E%3Crect x='348' y='492' width='6' height='6' fill='%239d7bff' transform='rotate(-25 351 495)'/%3E%3Crect x='420' y='496' width='6' height='6' fill='%23ff5fa2' transform='rotate(12 423 499)'/%3E%3Crect x='384' y='508' width='6' height='6' fill='%23ffd45e' transform='rotate(-8 387 511)'/%3E%3Ccircle cx='340' cy='514' r='3' fill='%234fe3d9'/%3E%3Ccircle cx='408' cy='520' r='3' fill='%239d7bff'/%3E%3Ccircle cx='372' cy='476' r='3' fill='%23ffd45e'/%3E%3C/g%3E%3Cg fill='%23100b1e'%3E%3Ccircle cx='344' cy='566' r='16'/%3E%3Ccircle cx='378' cy='560' r='19'/%3E%3Ccircle cx='414' cy='566' r='16'/%3E%3C/g%3E%3Cpath d='M326 600 q56 -8 112 0' fill='none' stroke='%23b6437c' stroke-width='3' stroke-linecap='round' opacity='.7'/%3E%3C/g%3E%3Cuse href='%23pinC' x='382' y='438'/%3E%3C!-- P5 cat on the desk, lower-left of lane --%3E%3Cg transform='rotate(-7 570 800)'%3E%3Crect x='508' y='728' width='132' height='156' rx='4' fill='%23060412' opacity='.55' transform='translate(6 9)'/%3E%3Crect x='502' y='720' width='132' height='156' rx='4' fill='url(%23fr)'/%3E%3Crect x='513' y='731' width='110' height='108' fill='%23225059'/%3E%3Ccircle cx='596' cy='752' r='11' fill='%23f2ead0'/%3E%3Cpath d='M530 816 q4 -22 26 -22 q10 -12 20 -2 q16 -4 20 12 q4 12 -8 14 Z' fill='%2312101e'/%3E%3Cpath d='M556 792 l-5 -9 l9 2 Z M568 790 l2 -10 l7 7 Z' fill='%2312101e'/%3E%3Cpath d='M596 812 q12 -6 6 -18' fill='none' stroke='%2312101e' stroke-width='5' stroke-linecap='round'/%3E%3C/g%3E%3Cuse href='%23pinA' x='566' y='718'/%3E%3C!-- P6 neon city, top-right --%3E%3Cg transform='rotate(7 1590 270)'%3E%3Crect x='1512' y='178' width='166' height='198' rx='4' fill='%23060412' opacity='.55' transform='translate(7 10)'/%3E%3Crect x='1506' y='170' width='166' height='198' rx='4' fill='url(%23fr)'/%3E%3Crect x='1518' y='182' width='142' height='140' fill='url(%23cty)'/%3E%3Ccircle cx='1642' cy='202' r='9' fill='%23f2ead0'/%3E%3Cg fill='%23151a33'%3E%3Crect x='1526' y='232' width='30' height='90'/%3E%3Crect x='1562' y='212' width='34' height='110'/%3E%3Crect x='1602' y='244' width='28' height='78'/%3E%3Crect x='1634' y='226' width='22' height='96'/%3E%3C/g%3E%3Cg fill='%23ffd45e'%3E%3Crect x='1532' y='242' width='4' height='4'/%3E%3Crect x='1542' y='256' width='4' height='4'/%3E%3Crect x='1570' y='222' width='4' height='4'/%3E%3Crect x='1584' y='240' width='4' height='4'/%3E%3Crect x='1608' y='254' width='4' height='4'/%3E%3Crect x='1640' y='238' width='4' height='4'/%3E%3C/g%3E%3Cg fill='%234fe3d9'%3E%3Crect x='1578' y='262' width='4' height='4'/%3E%3Crect x='1620' y='270' width='4' height='4'/%3E%3C/g%3E%3Crect x='1566' y='206' width='26' height='7' rx='2' fill='%23ff5fa2'/%3E%3Cpath d='M1526 340 q56 -8 116 0' fill='none' stroke='%232c3038' stroke-width='3' stroke-linecap='round' opacity='.5'/%3E%3C/g%3E%3Cuse href='%23pinB' x='1586' y='168'/%3E%3C!-- P7 the duo at golden hour, right --%3E%3Cg transform='rotate(-6 1770 430)'%3E%3Crect x='1702' y='356' width='146' height='172' rx='4' fill='%23060412' opacity='.55' transform='translate(6 9)'/%3E%3Crect x='1696' y='348' width='146' height='172' rx='4' fill='url(%23fr)'/%3E%3Crect x='1707' y='359' width='124' height='120' fill='url(%23duo)'/%3E%3Ccircle cx='1769' cy='394' r='18' fill='%23ffe9ad' opacity='.7'/%3E%3Cg fill='%2320142a'%3E%3Ccircle cx='1748' cy='442' r='13'/%3E%3Crect x='1735' y='452' width='26' height='27' rx='8'/%3E%3Ccircle cx='1786' cy='446' r='11'/%3E%3Crect x='1775' y='455' width='22' height='24' rx='7'/%3E%3C/g%3E%3Cpath d='M1716 506 q52 -7 106 0' fill='none' stroke='%23b6437c' stroke-width='3' stroke-linecap='round' opacity='.7'/%3E%3C/g%3E%3Cg transform='rotate(-6 1770 430)' opacity='.75'%3E%3Crect x='1740' y='340' width='58' height='18' rx='2' fill='%23ff6fae' opacity='.55'/%3E%3C/g%3E%3C!-- P8 kart clip, right --%3E%3Cg transform='rotate(-9 1590 540)'%3E%3Crect x='1522' y='466' width='146' height='170' rx='4' fill='%23060412' opacity='.55' transform='translate(6 9)'/%3E%3Crect x='1516' y='458' width='146' height='170' rx='4' fill='url(%23fr)'/%3E%3Crect x='1527' y='469' width='124' height='118' fill='%2314343f'/%3E%3Cpath d='M1527 587 L1651 587 L1651 535 Q1590 517 1527 549 Z' fill='%233a3f4c'/%3E%3Cpath d='M1544 580 L1560 546 M1584 574 L1596 540 M1622 570 L1630 538' stroke='%23ffe9ad' stroke-width='3' stroke-dasharray='7 8' fill='none' opacity='.8'/%3E%3Crect x='1568' y='548' width='26' height='15' rx='4' fill='%23ff4d4d'/%3E%3Ccircle cx='1574' cy='565' r='5' fill='%2312101e'/%3E%3Ccircle cx='1590' cy='565' r='5' fill='%2312101e'/%3E%3Ccircle cx='1581' cy='543' r='6' fill='%23ffbf7d'/%3E%3Cpath d='M1536 612 q52 -7 106 0' fill='none' stroke='%232c3038' stroke-width='3' stroke-linecap='round' opacity='.5'/%3E%3C/g%3E%3Cuse href='%23pinC' x='1586' y='454'/%3E%3C!-- P9 small sunset, top-right high --%3E%3Cg transform='rotate(10 1790 180)'%3E%3Crect x='1736' y='118' width='112' height='134' rx='4' fill='%23060412' opacity='.5' transform='translate(5 8)'/%3E%3Crect x='1730' y='110' width='112' height='134' rx='4' fill='url(%23fr)'/%3E%3Crect x='1739' y='119' width='94' height='92' fill='url(%23sun1)'/%3E%3Ccircle cx='1786' cy='184' r='16' fill='%23ffe9ad'/%3E%3Crect x='1739' y='188' width='94' height='23' fill='%23372a44'/%3E%3C/g%3E%3Cuse href='%23pinA' x='1786' y='108'/%3E%3C!-- P10 confetti mini, right of lane low --%3E%3Cg transform='rotate(5 1330 760)'%3E%3Crect x='1276' y='698' width='118' height='140' rx='4' fill='%23060412' opacity='.5' transform='translate(5 8)'/%3E%3Crect x='1270' y='690' width='118' height='140' rx='4' fill='url(%23fr)'/%3E%3Crect x='1279' y='699' width='100' height='96' fill='%232a1a44'/%3E%3Cg%3E%3Crect x='1292' y='712' width='5' height='5' fill='%23ffd45e' transform='rotate(18 1294 714)'/%3E%3Crect x='1322' y='706' width='5' height='5' fill='%23ff5fa2' transform='rotate(-12 1324 708)'/%3E%3Crect x='1352' y='716' width='5' height='5' fill='%234fe3d9' transform='rotate(24 1354 718)'/%3E%3Ccircle cx='1308' cy='740' r='2.6' fill='%234fe3d9'/%3E%3Ccircle cx='1344' cy='748' r='2.6' fill='%23ff5fa2'/%3E%3Ccircle cx='1364' cy='736' r='2.6' fill='%239d7bff'/%3E%3C/g%3E%3Cpath d='M1300 786 l14 -18 l14 18 Z' fill='%23ffd45e' opacity='.9'/%3E%3Ccircle cx='1348' cy='776' r='9' fill='%23ffbf7d'/%3E%3C/g%3E%3Cuse href='%23pinB' x='1328' y='688'/%3E%3C/svg%3E");
}

/* ═══ THE CORKBOARD SECTION — lower-left: a small framed cork panel,
   red threads running pin-to-pin, all converging on a hand-inked
   THANK YOU card at its centre. The heart of the wall. STATIC. ═══ */
head { display: var(--scrapbook-scenery, block); }
head::before {
  content: "";
  display: var(--scrapbook-scenery, block);
  position: fixed;
  left: 2vw;
  top: 52vh;
  width: 400px;
  height: 362px;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0) rotate(-1.5deg);
  background-repeat: no-repeat;
  background-position: left top;
  background-size: contain;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 420 380'%3E%3Cdefs%3E%3ClinearGradient id='ck' x1='0' y1='0' x2='.3' y2='1'%3E%3Cstop offset='0' stop-color='%23bb9057'/%3E%3Cstop offset='1' stop-color='%23875f30'/%3E%3C/linearGradient%3E%3ClinearGradient id='wd' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23705031'/%3E%3Cstop offset='1' stop-color='%23472f18'/%3E%3C/linearGradient%3E%3CradialGradient id='cwm' cx='30%25' cy='10%25' r='90%25'%3E%3Cstop offset='0' stop-color='%23ffdf9e' stop-opacity='.22'/%3E%3Cstop offset='1' stop-color='%23ffdf9e' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='kp1' cx='36%25' cy='30%25' r='70%25'%3E%3Cstop offset='0' stop-color='%23ffb3a6'/%3E%3Cstop offset='.5' stop-color='%23ef5a48'/%3E%3Cstop offset='1' stop-color='%23962c1e'/%3E%3C/radialGradient%3E%3CradialGradient id='kp2' cx='36%25' cy='30%25' r='70%25'%3E%3Cstop offset='0' stop-color='%23c9fff4'/%3E%3Cstop offset='.5' stop-color='%234fd8ca'/%3E%3Cstop offset='1' stop-color='%23227a70'/%3E%3C/radialGradient%3E%3CradialGradient id='kp3' cx='36%25' cy='30%25' r='70%25'%3E%3Cstop offset='0' stop-color='%23ffe79a'/%3E%3Cstop offset='.5' stop-color='%23f4c430'/%3E%3Cstop offset='1' stop-color='%23a37c10'/%3E%3C/radialGradient%3E%3Cg id='kpin'%3E%3Cellipse cx='1.5' cy='8' rx='10' ry='3.6' fill='%23060412' opacity='.45'/%3E%3Ccircle r='8.5' fill='url(%23kp1)'/%3E%3Cellipse cx='-3' cy='-3' rx='2.8' ry='2.2' fill='%23fff' opacity='.7'/%3E%3C/g%3E%3C/defs%3E%3C!-- panel shadow on the wall --%3E%3Crect x='16' y='18' width='396' height='356' rx='10' fill='%23060412' opacity='.5'/%3E%3C!-- wood frame + cork --%3E%3Crect x='4' y='4' width='400' height='360' rx='10' fill='url(%23wd)'/%3E%3Crect x='18' y='18' width='372' height='332' rx='5' fill='url(%23ck)'/%3E%3Crect x='18' y='18' width='372' height='332' rx='5' fill='none' stroke='%23301f0c' stroke-width='3' opacity='.5'/%3E%3Crect x='18' y='18' width='372' height='332' rx='5' fill='url(%23cwm)'/%3E%3C!-- thread shadows --%3E%3Cg fill='none' stroke='%23200a0c' stroke-width='2.6' opacity='.35' transform='translate(2 3)'%3E%3Cpath d='M62 56 Q106 118 148 156'/%3E%3Cpath d='M348 52 Q296 112 262 152'/%3E%3Cpath d='M54 322 Q100 276 146 234'/%3E%3Cpath d='M356 318 Q306 272 264 236'/%3E%3Cpath d='M204 40 Q205 92 205 148'/%3E%3C/g%3E%3C!-- the red threads --%3E%3Cg fill='none' stroke='%23ff5964' stroke-width='2.4' stroke-linecap='round'%3E%3Cpath d='M62 56 Q106 118 148 156'/%3E%3Cpath d='M348 52 Q296 112 262 152'/%3E%3Cpath d='M54 322 Q100 276 146 234'/%3E%3Cpath d='M356 318 Q306 272 264 236'/%3E%3Cpath d='M204 40 Q205 92 205 148'/%3E%3C/g%3E%3Cg fill='none' stroke='%23ffb0b6' stroke-width='1' stroke-dasharray='2 8' opacity='.6'%3E%3Cpath d='M62 56 Q106 118 148 156'/%3E%3Cpath d='M348 52 Q296 112 262 152'/%3E%3Cpath d='M54 322 Q100 276 146 234'/%3E%3Cpath d='M356 318 Q306 272 264 236'/%3E%3C/g%3E%3C!-- THANK YOU card --%3E%3Cg transform='rotate(-3 205 196)'%3E%3Crect x='132' y='156' width='150' height='86' rx='4' fill='%23060412' opacity='.5' transform='translate(5 7)'/%3E%3Crect x='128' y='150' width='150' height='86' rx='4' fill='%23fdf8ec'/%3E%3Cg font-family='Comic Sans MS, Chalkboard SE, cursive' font-weight='bold' text-anchor='middle' fill='%23e0344a'%3E%3Ctext x='203' y='188' font-size='30'%3ETHANK%3C/text%3E%3Ctext x='196' y='222' font-size='30'%3EYOU!%3C/text%3E%3C/g%3E%3Cpath d='M248 210 C244 203 234 204 234 212 C234 218 242 223 248 227 C254 223 262 218 262 212 C262 204 252 203 248 210 Z' fill='%23ff6f8e'/%3E%3C/g%3E%3C!-- pins over the thread ends --%3E%3Cuse href='%23kpin' x='62' y='56'/%3E%3Cg transform='translate(348 52)'%3E%3Cellipse cx='1.5' cy='8' rx='10' ry='3.6' fill='%23060412' opacity='.45'/%3E%3Ccircle r='8.5' fill='url(%23kp2)'/%3E%3Cellipse cx='-3' cy='-3' rx='2.8' ry='2.2' fill='%23fff' opacity='.7'/%3E%3C/g%3E%3Cg transform='translate(54 322)'%3E%3Cellipse cx='1.5' cy='8' rx='10' ry='3.6' fill='%23060412' opacity='.45'/%3E%3Ccircle r='8.5' fill='url(%23kp3)'/%3E%3Cellipse cx='-3' cy='-3' rx='2.8' ry='2.2' fill='%23fff' opacity='.7'/%3E%3C/g%3E%3Cuse href='%23kpin' x='356' y='318'/%3E%3Cg transform='translate(204 40)'%3E%3Cellipse cx='1.5' cy='8' rx='10' ry='3.6' fill='%23060412' opacity='.45'/%3E%3Ccircle r='8.5' fill='url(%23kp2)'/%3E%3Cellipse cx='-3' cy='-3' rx='2.8' ry='2.2' fill='%23fff' opacity='.7'/%3E%3C/g%3E%3Cg transform='rotate(-3 205 196)'%3E%3Cuse href='%23kpin' x='205' y='156'/%3E%3C/g%3E%3C/svg%3E");
}

/* ═══ THE DESK LAMP FROM BELOW — lower-right: the desk edge, a lamp
   with its shade tipped up the wall, hot bulb, baked light fan, and a
   sleeping mug beside it. The warm counterweight to the fairy lights.
   STATIC, promoted. ═══ */
head::after {
  content: "";
  display: var(--scrapbook-scenery, block);
  position: fixed;
  right: 0;
  bottom: 0;
  width: 620px;
  height: 480px;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: contain;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 620 480'%3E%3Cdefs%3E%3ClinearGradient id='fan' x1='.5' y1='1' x2='.35' y2='0'%3E%3Cstop offset='0' stop-color='%23ffd98a' stop-opacity='.4'/%3E%3Cstop offset='.5' stop-color='%23ffd08a' stop-opacity='.12'/%3E%3Cstop offset='1' stop-color='%23ffcf8a' stop-opacity='0'/%3E%3C/linearGradient%3E%3CradialGradient id='hot' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0' stop-color='%23fffef8'/%3E%3Cstop offset='.4' stop-color='%23ffedb8'/%3E%3Cstop offset='1' stop-color='%23ffdf9e' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='shd' x1='0' y1='0' x2='1' y2='.4'%3E%3Cstop offset='0' stop-color='%233c3352'/%3E%3Cstop offset='.5' stop-color='%23231d38'/%3E%3Cstop offset='1' stop-color='%23131022'/%3E%3C/linearGradient%3E%3ClinearGradient id='dsk' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23281f38'/%3E%3Cstop offset='1' stop-color='%23120e1e'/%3E%3C/linearGradient%3E%3ClinearGradient id='mgb' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23a05a3c'/%3E%3Cstop offset='.4' stop-color='%23e08a5a'/%3E%3Cstop offset='1' stop-color='%23703c26'/%3E%3C/linearGradient%3E%3C/defs%3E%3C!-- baked light fan up the wall --%3E%3Cpath d='M430 300 L160 -40 L620 -40 L620 300 Z' fill='url(%23fan)'/%3E%3C!-- the desk edge --%3E%3Crect x='0' y='402' width='620' height='78' fill='url(%23dsk)'/%3E%3Crect x='0' y='400' width='620' height='4' fill='%23453a5e' opacity='.8'/%3E%3Cellipse cx='452' cy='404' rx='150' ry='7' fill='%23ffd98a' opacity='.22'/%3E%3C!-- lamp cast shadow on the desk --%3E%3Cellipse cx='438' cy='420' rx='110' ry='13' fill='%23060412' opacity='.55'/%3E%3C!-- lamp base + stem --%3E%3Cellipse cx='452' cy='412' rx='56' ry='12' fill='%231b1630'/%3E%3Cellipse cx='452' cy='407' rx='56' ry='12' fill='url(%23shd)'/%3E%3Cellipse cx='452' cy='404' rx='38' ry='7' fill='%23342b4e'/%3E%3Cpath d='M446 404 Q440 340 448 300 L462 300 Q456 340 460 404 Z' fill='url(%23shd)'/%3E%3Cpath d='M449 396 Q444 344 451 304' fill='none' stroke='%23685a8a' stroke-width='2' opacity='.7'/%3E%3C!-- shade tipped up-left --%3E%3Cg transform='rotate(-24 452 274)'%3E%3Cpath d='M406 286 L498 286 L478 226 L426 226 Z' fill='url(%23shd)'/%3E%3Cpath d='M406 286 L498 286 L494 274 L410 274 Z' fill='%23131022'/%3E%3Cpath d='M426 226 L478 226 L474 218 L430 218 Z' fill='%23453a5e'/%3E%3Cellipse cx='452' cy='222' rx='24' ry='6' fill='%23ffedb8'/%3E%3Cpath d='M412 282 L430 230' stroke='%23685a8a' stroke-width='2' fill='none' opacity='.6'/%3E%3C/g%3E%3C!-- hot bulb glow at the shade mouth --%3E%3Cellipse cx='432' cy='236' rx='58' ry='42' fill='url(%23hot)' opacity='.9'/%3E%3Cellipse cx='430' cy='240' rx='16' ry='11' fill='%23fffdf2'/%3E%3C!-- warm rim on the shade's lit edge --%3E%3Cpath d='M400 262 Q420 236 452 230' fill='none' stroke='%23ffd98a' stroke-width='3' stroke-linecap='round' opacity='.8'/%3E%3C!-- the mug, asleep beside the lamp --%3E%3Cellipse cx='320' cy='420' rx='44' ry='8' fill='%23060412' opacity='.5'/%3E%3Crect x='286' y='360' width='64' height='56' rx='7' fill='url(%23mgb)'/%3E%3Cpath d='M350 372 q20 2 20 18 q0 16 -20 18' fill='none' stroke='%23a05a3c' stroke-width='8'/%3E%3Cellipse cx='318' cy='361' rx='32' ry='7' fill='%23c9744a'/%3E%3Cellipse cx='318' cy='361' rx='26' ry='5' fill='%23301c10'/%3E%3Cellipse cx='308' cy='360' rx='9' ry='2' fill='%23ffce9c' opacity='.7'/%3E%3Crect x='292' y='366' width='6' height='42' rx='3' fill='%23ffce9c' opacity='.4'/%3E%3C!-- a pencil resting on the desk --%3E%3Cg transform='rotate(-4 180 432)'%3E%3Crect x='120' y='428' width='120' height='7' rx='3' fill='%23f4c430'/%3E%3Cpath d='M240 428 l16 3.5 l-16 3.5 Z' fill='%23e8c9a0'/%3E%3Cpath d='M252 430.2 l4 1.3 l-4 1.3 Z' fill='%232c3038'/%3E%3Crect x='120' y='428' width='10' height='7' rx='3' fill='%23ff6f8e'/%3E%3C/g%3E%3C/svg%3E");
}

/* ═══ BOKEH SET A — soft out-of-focus light orbs high on the wall,
   the fairy lights' depth. Coarse (36-90px), low alpha, promoted.
   Twinkles on a steps() opacity cycle (~1 change/s). ═══ */
head meta { display: var(--scrapbook-scenery, block); }
head meta:first-of-type::before {
  content: "";
  display: var(--scrapbook-scenery, block);
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  background:
    radial-gradient(48px at 9% 7%, rgba(255, 217, 138, 0.22), rgba(255, 217, 138, 0) 70%),
    radial-gradient(34px at 28% 16%, rgba(255, 217, 138, 0.18), rgba(255, 217, 138, 0) 70%),
    radial-gradient(60px at 47% 5%, rgba(255, 217, 138, 0.16), rgba(255, 217, 138, 0) 70%),
    radial-gradient(38px at 66% 13%, rgba(255, 143, 194, 0.14), rgba(255, 143, 194, 0) 70%),
    radial-gradient(52px at 87% 9%, rgba(255, 217, 138, 0.20), rgba(255, 217, 138, 0) 70%),
    radial-gradient(44px at 96% 32%, rgba(255, 217, 138, 0.13), rgba(255, 217, 138, 0) 70%),
    radial-gradient(40px at 4% 36%, rgba(125, 238, 222, 0.11), rgba(125, 238, 222, 0) 70%);
  animation: scrapbook-bokeh-a 7.3s steps(1, end) infinite;
}

/* ═══ BOKEH SET B — the alternate phase, so the twinkle never syncs. */
head meta:first-of-type::after {
  content: "";
  display: var(--scrapbook-scenery, block);
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  transform: translateZ(0);
  background:
    radial-gradient(42px at 18% 11%, rgba(255, 217, 138, 0.18), rgba(255, 217, 138, 0) 70%),
    radial-gradient(56px at 38% 8%, rgba(255, 217, 138, 0.15), rgba(255, 217, 138, 0) 70%),
    radial-gradient(36px at 57% 16%, rgba(255, 217, 138, 0.17), rgba(255, 217, 138, 0) 70%),
    radial-gradient(64px at 77% 6%, rgba(255, 217, 138, 0.14), rgba(255, 217, 138, 0) 70%),
    radial-gradient(34px at 92% 18%, rgba(125, 238, 222, 0.12), rgba(125, 238, 222, 0) 70%),
    radial-gradient(46px at 6% 22%, rgba(255, 143, 194, 0.12), rgba(255, 143, 194, 0) 70%),
    radial-gradient(52px at 97% 48%, rgba(255, 200, 130, 0.10), rgba(255, 200, 130, 0) 70%);
  animation: scrapbook-bokeh-b 9.1s steps(1, end) infinite;
}

/* ═══ THE DROP-IN — the wall is still being assembled: every ~30s a
   fresh snapshot (tonight's clip) drops onto the wall left of the
   lane, overshoots, settles on its pin, holds, then fades to make
   room for the next. Small box; will-change budget 1 of 2. ═══ */
head meta:last-of-type::before {
  content: "";
  display: var(--scrapbook-scenery, block);
  position: fixed;
  left: 26vw;
  top: 40vh;
  width: 124px;
  height: 158px;
  z-index: 0;
  pointer-events: none;
  transform-origin: 50% 10px;
  opacity: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 130 166'%3E%3Cdefs%3E%3ClinearGradient id='df' x1='0' y1='0' x2='.2' y2='1'%3E%3Cstop offset='0' stop-color='%23fffdf7'/%3E%3Cstop offset='1' stop-color='%23e9e0cb'/%3E%3C/linearGradient%3E%3CradialGradient id='dpin' cx='36%25' cy='30%25' r='70%25'%3E%3Cstop offset='0' stop-color='%23ffe79a'/%3E%3Cstop offset='.5' stop-color='%23f4c430'/%3E%3Cstop offset='1' stop-color='%23a37c10'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cg%3E%3Crect x='12' y='24' width='106' height='128' rx='4' fill='%23060412' opacity='.5' transform='translate(5 8)'/%3E%3Crect x='8' y='18' width='106' height='128' rx='4' fill='url(%23df)'/%3E%3Crect x='17' y='27' width='88' height='86' fill='%23331c4a'/%3E%3Cg%3E%3Crect x='28' y='38' width='5' height='5' fill='%23ffd45e' transform='rotate(20 30 40)'/%3E%3Crect x='58' y='32' width='5' height='5' fill='%23ff5fa2' transform='rotate(-14 60 34)'/%3E%3Crect x='86' y='42' width='5' height='5' fill='%234fe3d9' transform='rotate(28 88 44)'/%3E%3Ccircle cx='42' cy='58' r='2.6' fill='%234fe3d9'/%3E%3Ccircle cx='74' cy='52' r='2.6' fill='%239d7bff'/%3E%3Ccircle cx='92' cy='64' r='2.6' fill='%23ff5fa2'/%3E%3C/g%3E%3Cpath d='M38 96 Q60 76 84 96' fill='none' stroke='%23ffd45e' stroke-width='4' stroke-linecap='round'/%3E%3Ccircle cx='47' cy='86' r='3' fill='%23fffdf2'/%3E%3Ccircle cx='75' cy='86' r='3' fill='%23fffdf2'/%3E%3Cpath d='M26 134 q34 -6 70 0' fill='none' stroke='%23b6437c' stroke-width='3' stroke-linecap='round' opacity='.7'/%3E%3C/g%3E%3Ccircle cx='61' cy='16' r='8' fill='url(%23dpin)'/%3E%3Cellipse cx='58' cy='13' rx='2.6' ry='2' fill='%23fff' opacity='.7'/%3E%3C/svg%3E");
  will-change: transform;
  animation: scrapbook-dropin 31s ease-out infinite;
}

/* ═══ a DANGLING PHOTO swinging gently on its pin under string B —
   a draft caught it. Small box; will-change budget 2 of 2. ═══ */
head meta:last-of-type::after {
  content: "";
  display: var(--scrapbook-scenery, block);
  position: fixed;
  right: 26.5vw;
  top: 22vh;
  width: 118px;
  height: 168px;
  z-index: 0;
  pointer-events: none;
  transform-origin: 76% 8px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 130 184'%3E %3Cdefs%3E %3ClinearGradient id='dp' x1='0' y1='0' x2='.3' y2='1'%3E %3Cstop offset='0' stop-color='%23fffdf7'/%3E%3Cstop offset='1' stop-color='%23e4dbc6'/%3E %3C/linearGradient%3E %3ClinearGradient id='dsky' x1='0' y1='0' x2='0' y2='1'%3E %3Cstop offset='0' stop-color='%234a4a72'/%3E%3Cstop offset='.45' stop-color='%23b06c72'/%3E %3Cstop offset='.7' stop-color='%23e0955f'/%3E%3Cstop offset='1' stop-color='%23f2c078'/%3E %3C/linearGradient%3E %3CradialGradient id='dsun' cx='60%25' cy='74%25' r='45%25'%3E %3Cstop offset='0' stop-color='%23fff2cf'/%3E%3Cstop offset='.4' stop-color='%23ffd89a' stop-opacity='.7'/%3E%3Cstop offset='1' stop-color='%23ffd89a' stop-opacity='0'/%3E %3C/radialGradient%3E %3CradialGradient id='pinT' cx='36%25' cy='30%25' r='70%25'%3E %3Cstop offset='0' stop-color='%23ffe79a'/%3E%3Cstop offset='.5' stop-color='%23f4c430'/%3E%3Cstop offset='1' stop-color='%23a37c10'/%3E %3C/radialGradient%3E %3ClinearGradient id='dgl' x1='0' y1='0' x2='1' y2='1'%3E %3Cstop offset='0' stop-color='%23fff' stop-opacity='.5'/%3E%3Cstop offset='.3' stop-color='%23fff' stop-opacity='0'/%3E %3C/linearGradient%3E %3C/defs%3E %3Cg transform='translate(6 14)'%3E %3Crect x='8' y='6' width='102' height='120' rx='4' fill='url(%23dp)'/%3E %3Crect x='18' y='16' width='82' height='72' fill='url(%23dsky)'/%3E %3Ccircle cx='66' cy='68' r='30' fill='url(%23dsun)'/%3E %3Cpath d='M18 60 Q40 50 62 58 T100 56 L100 88 L18 88 Z' fill='%236a5a6e' opacity='.8'/%3E %3Cpath d='M18 70 Q46 62 74 70 T100 68 L100 88 L18 88 Z' fill='%232c2230'/%3E %3Crect x='18' y='16' width='82' height='72' fill='url(%23dgl)' opacity='.5'/%3E %3Cpath d='M22 104 q26 -7 62 0' fill='none' stroke='%23b6613f' stroke-width='3' stroke-linecap='round' opacity='.75'/%3E %3Cpath d='M22 112 q20 -4 44 0' fill='none' stroke='%23c98a66' stroke-width='2' stroke-linecap='round' opacity='.55'/%3E %3C/g%3E %3Ccircle cx='99' cy='16' r='11' fill='url(%23pinT)'/%3E %3Cellipse cx='95' cy='12' rx='3.4' ry='2.6' fill='%23fff' opacity='.6'/%3E %3Ccircle cx='99' cy='16' r='3.8' fill='%23806010'/%3E %3C/svg%3E");
  will-change: transform;
  animation: scrapbook-swing 6.5s ease-in-out infinite;
}

/* ═══ warm lamp dust — three huge soft motes drifting in the light.
   Viewport-sized, so motion is steps(1, end): one hop every 5s. Coarse
   and low-alpha — cannot flicker. */
body::before {
  content: "";
  display: var(--scrapbook-scenery, block);
  position: fixed;
  top: 0;
  bottom: 0;
  left: -20vw;
  right: -20vw;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(ellipse 30vw 12vh at 30% 30%, rgba(255, 226, 172, 0.05), rgba(255, 226, 172, 0) 70%),
    radial-gradient(ellipse 36vw 13vh at 64% 60%, rgba(255, 210, 160, 0.05), rgba(255, 210, 160, 0) 72%),
    radial-gradient(ellipse 26vw 10vh at 48% 82%, rgba(255, 200, 150, 0.045), rgba(255, 200, 150, 0) 70%);
  animation: scrapbook-dust 40s steps(1, end) infinite;
}

/* ═══ the lane: a quiet night scrim down the center column so the
   crawl always reads over the busy wall — coarse, soft, STATIC. */
body::after {
  content: "";
  display: var(--scrapbook-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background: linear-gradient(90deg,
    rgba(8, 6, 20, 0) 12%, rgba(8, 6, 20, 0.26) 32%, rgba(8, 6, 20, 0.36) 50%,
    rgba(8, 6, 20, 0.26) 68%, rgba(8, 6, 20, 0) 88%);
}

/* ═══ faint wall-grain print — the only fine pattern, so it RIDES THE
   ROLL (moves lockstep with the text = zero subpixel beat, L6-safe).
   z:-1 keeps it behind the polaroids inside the roll's own stacking
   context. Data-URI is one unbroken line. */
.credits-roll::before,
.credits-slideshow::before {
  content: "";
  display: var(--scrapbook-scenery, block);
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.22;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='c' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85 0.5' numOctaves='4' seed='11' stitchTiles='stitch' result='n'/%3E%3CfeColorMatrix in='n' type='matrix' values='0 0 0 0 0.06  0 0 0 0 0.05  0 0 0 0 0.12  0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23c)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
}

/* ═══ POLAROID anatomy: each credits BLOCK is an instant photo ═══ */

/* alternating tilt down the roll (content-agnostic nth-of-type) so the
   wall feels hand-pinned, never gridded. Washi hue cycles neon pink,
   mint, gold; the developed PHOTO cycles three dusk memories so no two
   neighbours show the same snapshot. Intro is section 1, first
   block = 3n+2. */
.credits-block:nth-of-type(3n + 2),
.credits-slide:nth-of-type(3n + 2) { --sb-tilt: -2.4deg; --sb-tape: #ff6fae; --sb-tape-hi: #ffb3d4; --sb-photo: var(--sb-photo-b); }
.credits-block:nth-of-type(3n),
.credits-slide:nth-of-type(3n)     { --sb-tilt: 2deg;    --sb-tape: #45d8cc; --sb-tape-hi: #b8f3ec; --sb-photo: var(--sb-photo-c); }
.credits-block:nth-of-type(3n + 1),
.credits-slide:nth-of-type(3n + 1) { --sb-tilt: -1.4deg; --sb-tape: #ffd45e; --sb-tape-hi: #ffe9a8; }

/* the polaroid frame: warm-white card popping off the dark wall, the
   classic tall bottom lip, a soft sheen, and a deep night shadow. It
   rides the roll, so the shadow moves WITH the names (no flicker).

   Scroll mode: the whole .credits-block IS the card (an in-flow block).
   Slideshow mode: the base .credits-slide is a full-viewport absolutely
   positioned centering flex box — so we DON'T touch the slide (touching
   its position pulls every slide into a shrinking row-flex). Instead the
   inner .credits-block__list becomes the card there (see the __list rule,
   which is width-capped and centered). This keeps the frame identical in
   both modes. */
.credits-roll .credits-block {
  position: relative;
  box-sizing: border-box;
  width: min(30rem, 84vw);
  margin: 0 auto;
  padding: 1.5rem 1.4rem 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background:
    /* fine paper fibre so the frame reads as pressed card, not plastic */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='p' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7 0.9' numOctaves='3' seed='5' stitchTiles='stitch' result='n'/%3E%3CfeColorMatrix in='n' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23p)'/%3E%3C/svg%3E"),
    /* a soft diagonal sheen band raking across the frame (glossy card) */
    linear-gradient(122deg, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0.5) 44%, rgba(255, 255, 255, 0.08) 52%, rgba(255, 255, 255, 0) 64%),
    /* the classic top-left corner catch-light */
    linear-gradient(158deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 20%),
    /* warm-white card stock, its shadowed edge cooling toward the wall's
       plum instead of brown — the card lives in THIS room's light */
    linear-gradient(150deg, #fffdf7 0%, #f9f3e6 46%, #ece2d2 78%, #ded4cb 100%);
  background-size: 220px 220px, cover, cover, cover;
  border-radius: 3px;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.75) inset,
    0 0 0 1px rgba(60, 48, 88, 0.18),
    0 16px 30px rgba(6, 4, 16, 0.6),
    0 3px 9px rgba(6, 4, 16, 0.45);
  transform: rotate(var(--sb-tilt, -1.5deg));
}

/* the photo mat: a REAL developed instant-photo the polaroid holds — a
   dusk landscape baked as a data-URI, framed in warm white. Over the
   scene sit a readability scrim (so cream names hold against the sky's
   warm band), a soft top gloss, and an inset border. */
.credits-block__list {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 1.15rem 1.1rem 1.25rem;
  background:
    /* classic album photo-corner mounts hugging the print's corners */
    linear-gradient(135deg, #efe4c8 0 44%, #c2ad82 44% 52%, rgba(194, 173, 130, 0) 52%),
    linear-gradient(225deg, #ece0c2 0 44%, #bda877 44% 52%, rgba(189, 168, 119, 0) 52%),
    linear-gradient(45deg, #e6d9b8 0 44%, #b39d6e 44% 52%, rgba(179, 157, 110, 0) 52%),
    linear-gradient(315deg, #e2d4b2 0 44%, #ab9566 44% 52%, rgba(171, 149, 102, 0) 52%),
    /* readability scrim: darken the middle band where names land, ease
       off top/bottom so the sky-warmth and hill-dark still read */
    linear-gradient(180deg, rgba(14, 16, 26, 0.42) 0%, rgba(14, 16, 26, 0.14) 24%, rgba(14, 16, 26, 0.26) 52%, rgba(10, 10, 20, 0.5) 100%),
    /* glossy instant-film sheen raking the top-left of the print */
    linear-gradient(128deg, rgba(255, 255, 255, 0) 26%, rgba(255, 255, 255, 0.14) 38%, rgba(255, 255, 255, 0.03) 46%, rgba(255, 255, 255, 0) 58%),
    /* chemical corner vignette on top of the print */
    radial-gradient(ellipse 140% 120% at 50% 46%, rgba(8, 8, 16, 0) 54%, rgba(8, 8, 16, 0.42) 100%),
    /* soft developed-photo top gloss */
    radial-gradient(ellipse 120% 70% at 34% 4%, rgba(255, 236, 200, 0.16), rgba(255, 236, 200, 0) 52%),
    /* the photograph itself — cycled per block via --sb-photo so
       consecutive cards hold DIFFERENT memories */
    var(--sb-photo);
  background-repeat: no-repeat;
  background-size: 26px 26px, 26px 26px, 26px 26px, 26px 26px, auto, cover, auto, auto, cover;
  background-position: 0 0, 100% 0, 0 100%, 100% 100%, center, center, center, center, center 42%;
  border-radius: 2px;
  box-shadow:
    0 0 0 1px rgba(20, 30, 40, 0.55) inset,
    0 2px 8px rgba(10, 14, 22, 0.5) inset;
  display: flex;
  flex-direction: column;
  gap: var(--credits-name-gap);
}

/* Slideshow: the base .credits-slide is a full-viewport centering flex
   box — leave its position alone. Here the LIST becomes the whole
   polaroid: the dark mat wrapped in a thick warm-white border with the
   classic tall bottom lip, width-capped and centered by the slide. */
.credits-slideshow .credits-block__list {
  box-sizing: border-box;
  width: min(30rem, 84vw);
  margin: 0 auto;
  border: 0.95rem solid #fbf6ea;
  border-bottom-width: 2.4rem;
  border-radius: 4px;
  box-shadow:
    0 0 0 1px rgba(20, 30, 40, 0.5) inset,
    0 2px 6px rgba(20, 28, 38, 0.4) inset,
    0 18px 34px rgba(6, 4, 16, 0.6),
    0 3px 9px rgba(6, 4, 16, 0.45);
  transform: rotate(var(--sb-tilt, -1.5deg));
}

/* the handwritten caption: the block title inked in marker on the
   polaroid's bottom lip, sitting below the photo mat. Caveat, tipped a
   touch, in ballpoint midnight. The base accent rule is dropped. */
.credits-block__title {
  order: 2;
  margin: 0.7rem 0 0.35rem;
  padding: 0;
  font-family: var(--credits-title-font);
  font-weight: 700;
  font-size: var(--credits-title-size);
  line-height: 1;
  letter-spacing: 0.01em;
  text-transform: none;
  color: var(--sb-ink);
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  transform: rotate(-1.2deg);
}
/* a hand-drawn felt-tip underline under the caption — a double marker
   swoosh in neon pink, the wall's signature pen. */
.credits-block__title::after {
  content: "";
  display: block;
  width: 4.6rem;
  height: 0.7rem;
  margin: 0.12rem auto 0;
  /* background-color MUST be cleared: the base rule sets
     background:var(--credits-accent) (a solid fill) which this longhand
     image alone would not override. */
  background-color: transparent;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='18' viewBox='0 0 120 18'%3E%3Cpath d='M6 8 Q40 3 74 6 Q98 8 114 5' fill='none' stroke='%23ff5fa2' stroke-width='3.4' stroke-linecap='round' opacity='.92'/%3E%3Cpath d='M10 12 Q44 9 78 11 Q96 12 108 10' fill='none' stroke='%23ff8fc2' stroke-width='2' stroke-linecap='round' opacity='.6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  opacity: 1;
  transform: rotate(-0.8deg);
}

/* the tape strip: a short piece of candy-striped neon washi holding
   the photo up, slapped over the top edge at a jaunty angle.
   Scroll: on the block. Slideshow: on the list (the card there). */
.credits-roll .credits-block::before,
.credits-slideshow .credits-block__list::before {
  content: "";
  display: var(--scrapbook-scenery, block);
  position: absolute;
  top: -0.85rem;
  left: 50%;
  width: 5.5rem;
  height: 1.7rem;
  z-index: 3;
  pointer-events: none;
  background:
    repeating-linear-gradient(48deg, var(--sb-tape, #ff6fae) 0 8px, var(--sb-tape-hi, #ffb3d4) 8px 16px);
  opacity: 0.85;
  box-shadow: 0 3px 7px rgba(6, 4, 16, 0.45);
  transform: translateX(-50%) rotate(-4deg);
  /* soft torn ends via a mask so the tape looks ripped, not cut */
  -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%);
  mask-image: linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%);
}
/* slideshow tape sits above the white frame border */
.credits-slideshow .credits-block__list::before { top: -1.75rem; }

/* slideshow caption: ride the title UP onto the polaroid's white bottom
   lip (the list's tall bottom border) so it reads as inked on the frame,
   not floating beneath the card */
.credits-slideshow .credits-block__title {
  margin-top: -2.15rem;
  position: relative;
  z-index: 2;
  transform: rotate(calc(var(--sb-tilt, -1.5deg) - 1.2deg));
}

/* the string between cards: the fairy-light wire the polaroids hang
   from — a dark cable swagging card to card with five warm glowing
   bulbs along it. Scroll only. STATIC (rides the roll). */
.credits-roll .credits-block::after {
  content: "";
  display: var(--scrapbook-scenery, block);
  position: absolute;
  top: -2.5rem;
  left: -6%;
  width: 112%;
  height: 2.6rem;
  z-index: -1;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 60' preserveAspectRatio='none'%3E%3Cdefs%3E%3CradialGradient id='g2' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0' stop-color='%23ffe9b0' stop-opacity='.85'/%3E%3Cstop offset='.4' stop-color='%23ffd98a' stop-opacity='.3'/%3E%3Cstop offset='1' stop-color='%23ffd98a' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cpath d='M8 12 Q200 78 392 12' fill='none' stroke='%23000' stroke-width='5' stroke-linecap='round' opacity='0.25' transform='translate(1 3)'/%3E%3Cpath d='M8 12 Q200 78 392 12' fill='none' stroke='%23131022' stroke-width='3.2' stroke-linecap='round'/%3E%3Cpath d='M8 11 Q200 77 392 11' fill='none' stroke='%235a4d7a' stroke-width='1' stroke-linecap='round' opacity='.4'/%3E%3Cg%3E%3Ccircle cx='80' cy='36' r='11' fill='url(%23g2)'/%3E%3Ccircle cx='80' cy='36' r='3' fill='%23fff3c9'/%3E%3Ccircle cx='140' cy='52' r='11' fill='url(%23g2)'/%3E%3Ccircle cx='140' cy='52' r='3' fill='%23fff3c9'/%3E%3Ccircle cx='200' cy='58' r='11' fill='url(%23g2)'/%3E%3Ccircle cx='200' cy='58' r='3' fill='%23ffd4e6'/%3E%3Ccircle cx='260' cy='52' r='11' fill='url(%23g2)'/%3E%3Ccircle cx='260' cy='52' r='3' fill='%23fff3c9'/%3E%3Ccircle cx='320' cy='36' r='11' fill='url(%23g2)'/%3E%3Ccircle cx='320' cy='36' r='3' fill='%23fff3c9'/%3E%3C/g%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

/* ═══ rows: photo captions. Cream ink on the dark mat; the name in a
   readable hand, the amount as a little inked heart-count beside it.
   Names are sacred — wrap, never clip. ═══ */
.credit {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.5em;
  max-width: 100%;
  min-width: 0;
  color: #f4ecdb;
  text-shadow: 0 1px 2px rgba(12, 20, 28, 0.6);
  font-weight: 400;
  font-size: var(--credits-name-size);
  letter-spacing: 0.01em;
  line-height: 1.4;
}
.credit__name {
  min-width: 0;
  overflow-wrap: anywhere;
  color: #f6efe0;
}
/* the amount is a heart-count: a small inked heart then the number */
.credit__amount {
  display: inline-flex;
  align-items: baseline;
  flex: 0 0 auto;
  white-space: nowrap;
  opacity: 1;
  font-size: 0.82em;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #ffcfd8;
  font-variant-numeric: tabular-nums;
  text-shadow: 0 1px 2px rgba(12, 20, 28, 0.55);
}
.credit__amount::before {
  content: "\\2665";
  margin-right: 0.28em;
  font-size: 0.92em;
  color: var(--sb-heart);
  text-shadow: 0 0 5px rgba(255, 111, 142, 0.5);
  vertical-align: baseline;
}

/* ═══ flourish cards: the wall's opening and closing notes ═══ */
/* position is scoped to the ROLL only — in slideshow mode the flourish
   IS the .credits-slide (position:absolute; inset:0), and overriding its
   position pulls both flourish slides into the slideshow's flex flow,
   parking the intro left-of-centre and the outro right-of-centre. */
.credits-roll .flourish { position: relative; }
.flourish--intro { gap: 1.1rem; padding-top: 4rem; }

/* a small fan of loose instant-photos pinned above the title —
   establishes the fiction on the opening shot and fills the intro's
   upper negative space. Decorative → kill-switched. */
.flourish--intro::before {
  content: "";
  display: var(--scrapbook-scenery, block);
  position: absolute;
  top: -5.5rem;
  left: 50%;
  width: 15rem;
  height: 8.5rem;
  z-index: 1;
  pointer-events: none;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 170' width='300' height='170'%3E%3Cdefs%3E%3ClinearGradient id='pf' x1='0' y1='0' x2='0.2' y2='1'%3E%3Cstop offset='0' stop-color='%23fffdf7'/%3E%3Cstop offset='1' stop-color='%23e8dfc9'/%3E%3C/linearGradient%3E%3ClinearGradient id='s1' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%233a5170'/%3E%3Cstop offset='0.6' stop-color='%23c98d76'/%3E%3Cstop offset='1' stop-color='%23f0c489'/%3E%3C/linearGradient%3E%3ClinearGradient id='s2' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%2333474a'/%3E%3Cstop offset='0.6' stop-color='%237e948b'/%3E%3Cstop offset='1' stop-color='%23e4d29a'/%3E%3C/linearGradient%3E%3ClinearGradient id='s3' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%236a4a6a'/%3E%3Cstop offset='0.55' stop-color='%23eea24e'/%3E%3Cstop offset='1' stop-color='%23f6cf6e'/%3E%3C/linearGradient%3E%3CradialGradient id='pinr' cx='36%25' cy='30%25' r='70%25'%3E%3Cstop offset='0' stop-color='%23ffc9df'/%3E%3Cstop offset='0.5' stop-color='%23ff6fae'/%3E%3Cstop offset='1' stop-color='%23b03a72'/%3E%3C/radialGradient%3E%3C/defs%3E%3C!-- back photo, tilted left --%3E%3Cg transform='rotate(-11 90 100)'%3E%3Crect x='40' y='46' width='96' height='112' rx='4' fill='url(%23pf)'/%3E%3Crect x='48' y='54' width='80' height='76' fill='url(%23s1)'/%3E%3Ccircle cx='98' cy='104' r='16' fill='%23ffe8a4' opacity='0.55'/%3E%3Crect x='48' y='54' width='80' height='76' fill='%23fff' opacity='0.06'/%3E%3C/g%3E%3C!-- middle photo, tilted right --%3E%3Cg transform='rotate(9 210 96)'%3E%3Crect x='150' y='42' width='96' height='112' rx='4' fill='url(%23pf)'/%3E%3Crect x='158' y='50' width='80' height='76' fill='url(%23s3)'/%3E%3Ccircle cx='208' cy='104' r='12' fill='%23fff4cc'/%3E%3Crect x='158' y='50' width='80' height='76' fill='%23fff' opacity='0.06'/%3E%3C/g%3E%3C!-- front photo, near-straight, on top --%3E%3Cg transform='rotate(-2 150 90)'%3E%3Crect x='104' y='34' width='94' height='110' rx='4' fill='url(%23pf)'/%3E%3Crect x='112' y='42' width='78' height='74' fill='url(%23s2)'/%3E%3Cpath d='M112 96 Q140 84 170 94 T190 92 L190 116 L112 116 Z' fill='%233c524a' opacity='0.8'/%3E%3Crect x='112' y='42' width='78' height='74' fill='%23fff' opacity='0.07'/%3E%3C/g%3E%3C!-- neon pin holding the front photo --%3E%3Cellipse cx='150' cy='40' rx='9' ry='3' fill='%23060412' opacity='0.4'/%3E%3Ccircle cx='149' cy='34' r='8' fill='url(%23pinr)'/%3E%3Cellipse cx='146' cy='31' rx='2.6' ry='2' fill='%23fff' opacity='0.7'/%3E%3C/svg%3E") no-repeat center / contain;
  transform: translateX(-50%) rotate(-1deg);
  filter: drop-shadow(0 10px 18px rgba(4, 2, 12, 0.6));
}
/* slideshow: the flourish is the full-viewport slide itself, so the fan's
   roll-mode offset (top:-5.5rem) would park it above the screen — pin it
   into the slide's upper third instead, above the centred title. */
.credits-slideshow .flourish--intro::before { top: 13vh; }

/* badge -> a sticker note on the wall (copy swap) */
.flourish__badge { font-size: 0; border: 0; border-radius: 0; padding: 0; box-shadow: none; }
.flourish__badge::after {
  content: "our little corner of the internet";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.06em;
  padding: 0.5em 1.1em;
  text-transform: none;
  color: var(--sb-ink);
  background: #fdf8ec;
  border-radius: 3px;
  box-shadow: 0 6px 14px rgba(6, 4, 16, 0.55), 0 0 0 1px rgba(60, 48, 88, 0.2) inset;
  transform: rotate(-2deg);
  text-shadow: none;
}

/* the streamer's title, hand-lettered big across the wall (restyle
   only — this is streamer copy). Caveat, warm cream, a fairy glow. */
.flourish--intro .flourish__title {
  font-family: var(--credits-title-font);
  font-weight: 700;
  text-transform: none;
  letter-spacing: 0.005em;
  line-height: 0.98;
  max-width: min(90vw, 12em);
  color: #fdf3dc;
  text-shadow: 0 0 22px rgba(255, 190, 120, 0.35), 0 2px 0 rgba(40, 24, 60, 0.7), 0 8px 24px rgba(4, 2, 12, 0.7);
  transform: rotate(-1.5deg);
}

/* streamer tagline: restyle only — a felt-tip note under the title */
.flourish__tagline {
  font-family: var(--credits-font);
  font-style: normal;
  font-weight: 400;
  font-size: 1.15rem;
  letter-spacing: 0.02em;
  color: rgba(250, 238, 216, 0.92);
  text-shadow: 0 1px 5px rgba(4, 2, 12, 0.7);
  transform: rotate(0.6deg);
}

/* rating -> a "do not bend" postal stamp (copy swap) */
.flourish__rating { font-size: 0; border: 0; padding: 0; opacity: 1; }
.flourish__rating::after {
  content: "photos \\00B7 do not bend \\00B7 keep forever";
  display: inline-block;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.74rem;
  letter-spacing: 0.14em;
  padding: 0.45em 0.9em;
  text-transform: uppercase;
  color: #ffd4e2;
  border: 2px dashed rgba(255, 111, 174, 0.7);
  border-radius: 4px;
  transform: rotate(1.5deg);
  text-shadow: 0 1px 3px rgba(4, 2, 12, 0.6);
}

/* cover fine print — a pencil note along the wall's edge */
.flourish--intro::after {
  content: "vol. i \\00B7 assembled by hand \\00B7 est. tonight";
  display: var(--scrapbook-scenery, block);
  font-family: var(--credits-font);
  font-weight: 400;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: lowercase;
  color: rgba(250, 238, 216, 0.6);
  transform: rotate(-0.6deg);
}

/* outro: lights out on the memory wall (copy swaps). */
.flourish--outro::before {
  content: "\\2665 \\2665 \\2665";
  display: var(--scrapbook-scenery, block);
  font-size: 0.9rem;
  letter-spacing: 0.5em;
  padding-left: 0.5em;
  color: var(--sb-heart);
  opacity: 0.9;
  text-shadow: 0 0 8px rgba(255, 111, 142, 0.45);
}
.flourish--outro .flourish__title { font-size: 0; }
.flourish--outro .flourish__title::after {
  content: "goodnight, memory wall";
  display: inline-block;
  font-family: var(--credits-title-font);
  font-weight: 700;
  text-transform: none;
  font-size: var(--credits-flourish-title-size);
  line-height: 0.98;
  color: #fdf3dc;
  text-shadow: 0 0 22px rgba(255, 190, 120, 0.35), 0 2px 0 rgba(40, 24, 60, 0.7), 0 8px 24px rgba(4, 2, 12, 0.7);
  transform: rotate(-1.5deg);
}
.flourish--outro .flourish__tagline { font-size: 0; }
.flourish--outro .flourish__tagline::after {
  content: "thanks for the memories";
  font-family: var(--credits-font);
  font-style: normal;
  font-size: 1.15rem;
  letter-spacing: 0.02em;
  color: rgba(250, 238, 216, 0.92);
  text-shadow: 0 1px 5px rgba(4, 2, 12, 0.7);
}
/* the closing sticker under the tagline */
.flourish--outro::after {
  content: "see you next time \\00B7 \\2661";
  display: var(--scrapbook-scenery, block);
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  padding: 0.45em 0.9em;
  margin-top: 0.5rem;
  text-transform: none;
  color: var(--sb-ink);
  background: #fdf8ec;
  border-radius: 3px;
  box-shadow: 0 5px 12px rgba(6, 4, 16, 0.55);
  transform: rotate(2deg);
  text-shadow: none;
}

/* ═══ raid finale: THE GOLD-STAR SHOT — the best photo of the night
   gets the gold-star burst sticker slapped in the corner. The frame
   warms, the sticker breathes on a steps() glow (~0.5 paints/s — the
   only animation inside the roll). Declared after the parity tints so
   it wins. ═══ */
.credits-block:nth-last-of-type(2),
.credits-slide:nth-last-of-type(2):not(.flourish) {
  --sb-tape: #ffd45e;
  --sb-tape-hi: #ffe9a8;
}
/* warm the polaroid's frame + a soft gold halo behind the card */
.credits-block:nth-last-of-type(2) {
  background:
    radial-gradient(ellipse 70% 60% at 50% 30%, rgba(255, 212, 94, 0.18), rgba(255, 212, 94, 0) 72%),
    linear-gradient(158deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 22%),
    linear-gradient(178deg, #fdf8ea 0%, #f8f0d8 72%, #f1e6c4 100%);
}
.credits-slide:nth-last-of-type(2):not(.flourish) {
  background:
    radial-gradient(ellipse 76% 60% at 50% 40%, rgba(255, 212, 94, 0.16), rgba(255, 212, 94, 0) 80%),
    linear-gradient(158deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 22%),
    linear-gradient(178deg, #fdf8ea 0%, #f8f0d8 72%, #f1e6c4 100%);
}
/* the gold-star burst sticker over the top-right corner of the photo */
.credits-block:nth-last-of-type(2) .credits-block__list::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__list::before {
  content: "";
  display: var(--scrapbook-scenery, block);
  position: absolute;
  top: -2rem;
  right: -1.9rem;
  width: 4.4rem;
  height: 4.4rem;
  z-index: 4;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3CradialGradient id='foil' cx='40%25' cy='34%25' r='72%25'%3E%3Cstop offset='0' stop-color='%23fff6cf'/%3E%3Cstop offset='.45' stop-color='%23f4c430'/%3E%3Cstop offset='1' stop-color='%23b8860b'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cg fill='%23fbe9a4'%3E%3Cpath d='M50 4 L58 20 L74 12 L70 30 L88 30 L74 42 L92 52 L72 56 L80 74 L62 66 L58 86 L50 70 L42 86 L38 66 L20 74 L28 56 L8 52 L26 42 L12 30 L30 30 L26 12 L42 20 Z'/%3E%3C/g%3E%3Ccircle cx='50' cy='50' r='30' fill='url(%23foil)'/%3E%3Ccircle cx='50' cy='50' r='30' fill='none' stroke='%23fff3c4' stroke-width='1.5' opacity='.7'/%3E%3Cpath d='M50 30 L56 44 L71 44 L59 53 L64 68 L50 59 L36 68 L41 53 L29 44 L44 44 Z' fill='%23fffef2'/%3E%3Cellipse cx='40' cy='40' rx='9' ry='5' fill='%23fff' opacity='.5'/%3E%3C!-- static specular sparkles on the gold foil (ride the roll, L6-safe) --%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M38 38 Q39 33 40 38 Q45 39 40 40 Q39 45 38 40 Q33 39 38 38 Z'/%3E%3Cpath d='M67 27 Q67.6 24 68 27 Q71 27.4 68 28 Q67.6 31 67 28 Q64 27.4 67 27 Z' opacity='.9'/%3E%3Cpath d='M78 62 Q78.5 59.5 79 62 Q81.5 62.5 79 63 Q78.5 65.5 78 63 Q75.5 62.5 78 62 Z' opacity='.85'/%3E%3C/g%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: contain;
  transform: rotate(14deg);
  animation: scrapbook-star 5s steps(1, end) infinite;
}
.credits-block:nth-last-of-type(2) .credits-block__title::after,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::after {
  content: "best in show \\2605";
  display: block;
  width: auto;
  height: auto;
  margin: 0.2rem 0 0;
  border-radius: 0;
  background: none;
  opacity: 1;
  font-family: var(--credits-font);
  font-weight: 700;
  font-size: 0.5em;
  letter-spacing: 0.1em;
  color: #b8860b;
  text-shadow: none;
}
.credits-block:nth-last-of-type(2) .credit,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit {
  font-size: calc(var(--credits-name-size) * 1.06);
}

/* ═══ slideshow: each photo is laid onto the wall; keep the tilt and
   settle it like a card set down. ═══ */
.credits-slide:not(.flourish) {
  padding: 1.6rem 1.5rem 0.8rem;
}
.credits-slide {
  transform: translateY(12px) rotate(var(--sb-tilt, -1.5deg));
  transition: opacity 0.8s ease, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}
.credits-slide.is-active { transform: rotate(var(--sb-tilt, -1.5deg)); }
.credits-slide.flourish { transform: translateY(12px); }
.credits-slide.flourish.is-active { transform: none; }

/* ═══ keyframes (all scrapbook- prefixed; transform/opacity ONLY) ═══ */
/* the dangling photo: a slow gentle rock about its pin, a couple of
   degrees each way — a draft caught it, not a pendulum */
@keyframes scrapbook-swing {
  0%   { transform: rotate(-3.2deg); }
  50%  { transform: rotate(3.4deg); }
  100% { transform: rotate(-3.2deg); }
}
/* lamp dust: eight held positions over 40s = one hop every 5s */
@keyframes scrapbook-dust {
  0%    { transform: translate3d(0, 0, 0); }
  12.5% { transform: translate3d(1.6vw, -0.6vh, 0); }
  25%   { transform: translate3d(3vw, -1.1vh, 0); }
  37.5% { transform: translate3d(1.5vw, -1.7vh, 0); }
  50%   { transform: translate3d(-0.7vw, -1.1vh, 0); }
  62.5% { transform: translate3d(-2.4vw, -0.4vh, 0); }
  75%   { transform: translate3d(-1.6vw, 0.6vh, 0); }
  87.5% { transform: translate3d(0.5vw, 0.4vh, 0); }
  100%  { transform: translate3d(0, 0, 0); }
}
/* bokeh twinkles: held opacity levels, never synced (7.3s vs 9.1s) */
@keyframes scrapbook-bokeh-a {
  0%   { opacity: 0.5; }
  18%  { opacity: 0.9; }
  34%  { opacity: 0.6; }
  52%  { opacity: 1; }
  68%  { opacity: 0.65; }
  84%  { opacity: 0.9; }
  100% { opacity: 0.5; }
}
@keyframes scrapbook-bokeh-b {
  0%   { opacity: 0.95; }
  15%  { opacity: 0.6; }
  33%  { opacity: 0.9; }
  49%  { opacity: 0.55; }
  66%  { opacity: 1; }
  85%  { opacity: 0.7; }
  100% { opacity: 0.95; }
}
/* the drop-in: hidden most of the cycle, then a new snapshot drops
   onto the wall, overshoots, settles on its pin, holds, and fades */
@keyframes scrapbook-dropin {
  0%, 78%    { opacity: 0; transform: translateY(-130%) rotate(-14deg); }
  80.5%      { opacity: 1; transform: translateY(4%) rotate(6deg); }
  82%        { opacity: 1; transform: translateY(-2%) rotate(-3deg); }
  83.5%      { opacity: 1; transform: translateY(0) rotate(2deg); }
  96%        { opacity: 1; transform: translateY(0) rotate(2deg); }
  100%       { opacity: 0; transform: translateY(0) rotate(2deg); }
}
/* the gold star: two soft brightness dips per 5s — foil catching the
   light, never a strobe (~0.5 paints/s) */
@keyframes scrapbook-star {
  0%, 54%   { opacity: 1; }
  60%, 76%  { opacity: 0.72; }
  82%, 100% { opacity: 1; }
}

/* ═══ reduced motion: the wall holds still — bokeh parks mid-glow, the
   drop-in photo rests pinned, the dangling photo parks at a slight
   tilt, the dust hangs, the gold star burns steady, slides fall back
   to the base fade (keeping their pinned tilt). ═══ */
@media (prefers-reduced-motion: reduce) {
  head meta:first-of-type::before { animation: none; opacity: 0.8; }
  head meta:first-of-type::after { animation: none; opacity: 0.8; }
  head meta:last-of-type::before { animation: none; opacity: 1; transform: rotate(2deg); }
  head meta:last-of-type::after { animation: none; transform: rotate(1.5deg); }
  body::before { animation: none; }
  .credits-block:nth-last-of-type(2) .credits-block__list::before,
  .credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__list::before {
    animation: none;
  }
  .credits-slide { transition: opacity 0.8s ease; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--scrapbook-scenery:none;}",
};
