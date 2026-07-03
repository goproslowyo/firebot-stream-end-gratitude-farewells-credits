import type { ThemeVariant } from "./variant";
/** PROTOTYPE — throwaway. Blocklight — Voxel Sunset: dusk over a blockworld — a square sun sinks behind stepped terrain, giant pixel clouds catch pink underlight, floating cubes hold the last warm rays, and the credits post like a day-complete summary with XP bars and a hearts/armor HUD. */
export const VARIANT: ThemeVariant = {
  key: "voxel",
  name: "Blocklight",
  css: `
/* ================================================================
   BLOCKLIGHT — layered after the base theme.
   Fiction: day 4096 in a blockworld, the minute before nightfall.
   A square sun sinks behind a stepped violet ridge on the left; the
   sky runs indigo -> coral -> gold; giant pixel clouds hang with
   pink underlight; floating cubes catch the last warm rays (sunlit
   face toward the sun, skylit lavender top, indigo shadow face); on
   the ground a torch gutters, a hut's window burns warm, a blocky
   tree stands dark. The hearts/armor HUD still shows in the corner.
   Credits read as the day-complete summary: each section is a chunk,
   every title carries an XP bar, amounts stack as x64. Raids are the
   NIGHT RAID. Then: day complete — sleep well.
   Light story: ONE source — the setting sun at 28vw/77vh. Everything
   warm faces it; everything away falls to indigo.
   Layer map (all scenery kill-switched via --voxel-scenery):
     html bg (--credits-bg)   the dusk sky itself (cheap linear ramp)
     html::before             SUN — nested-square blocky sun + bloom +
                              horizon glow + corner vignette. STATIC,
                              promoted
     html::after              GIANT PIXEL CLOUDS — coarse 64px-cell
                              rect clouds w/ pink underlit lips.
                              STATIC, promoted
     head::before             HERO CUBE upper-right + cubelet (bob —
                              continuous mover #1, will-change)
     head::after              CUBE PAIR left-mid (bob, offset phase —
                              continuous mover #2, will-change)
     meta#1::before           HUD — hearts row, armor row, XP sliver,
                              top-left corner. STATIC, promoted
     meta#1::after            one small pixel cloud drifting west in
                              steps(1) hops (1 hop / ~3s — NOT a
                              continuous mover, no will-change)
     meta#2::before           torch glow on the terrain — steps()
                              flicker at ~0.55 paints/s
     meta#2::after            TERRAIN — stepped 48px+ silhouette band
                              (tree, torch, hut w/ lit window, hero
                              cube's grounded shadow). STATIC, promoted.
                              Lives head-side because body pseudos
                              inherit the base bottom edge-fade mask —
                              a masked ground would dissolve into sky
     body::before             distant floating island silhouette,
                              upper-right (the mask is opaque there).
                              STATIC, promoted
     body::after              center-lane readability scrim (the coral
                              band is bright). STATIC, promoted
     .credits-roll::before    sparse dusk sparkles — the only fine
     .credits-slideshow::before  pattern, so it RIDES THE ROLL
   ================================================================ */
@import url('https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&family=Outfit:wght@400;500;700&display=swap');

:root {
  /* -- palette: the last minute of daylight -- */
  --voxel-scenery: block; /* set to none to strip every scenery layer */
  --voxel-xp-green: #8cf554;
  --voxel-amber: #ffbe5c;
  --voxel-lavender: #cf9bff;
  --voxel-cream: #fff1dc;
  --voxel-ink: #221042;

  /* -- base hooks -- */
  /* Cheap sky: ONE linear ramp, indigo through coral to horizon gold
     (L3: the sun, clouds and vignette live on promoted fixed pseudos). */
  --credits-bg: linear-gradient(180deg, #171034 0%, #2c1a52 20%, #4b2364 40%, #83345f 56%, #c94f46 68%, #f27a38 78%, #ffb35c 86%, #ffd27e 100%);
  --credits-color: var(--voxel-cream);
  --credits-accent: var(--voxel-xp-green);
  --credits-font: "Outfit", "Avenir Next", "Segoe UI", "Helvetica Neue", sans-serif;
  --credits-title-font: "Silkscreen", "Courier New", monospace;
  --credits-title-size: clamp(1.02rem, 2.6vw, 1.58rem);
  --credits-name-size: clamp(1.02rem, 2.6vw, 1.5rem);
  --credits-flourish-title-size: clamp(1.6rem, 5.2vw, 3.4rem);
  --credits-block-gap: 5.25rem;
  --credits-name-gap: 0.65rem;
  --credits-shadow: 0 2px 12px rgba(10, 5, 26, 0.8);
  /* glow no-op — never "none" (a "none" inside the composed shadow list
     invalidates the whole declaration); Blocklight glows are bespoke. */
  --credits-glow: 0 0 0 rgba(0, 0, 0, 0);
}

/* Scenery is full-bleed: html drops the base edge-fade; body keeps the
   base mask so names still ease in at the floor and out at the ceiling. */
html { -webkit-mask-image: none; mask-image: none; }
body { background: transparent; counter-reset: voxel-chunk; }

/* === THE SUN — a blocky nested-square sun half-set behind the ridge
   plateau at 25vw/77vh, its soft bloom, a wide horizon glow, and a cool
   vignette pulling the top corners down to night. Paint order matters:
   the sun squares sit FIRST (topmost) so the vignette can never mute the
   light source. One STATIC promoted layer; soft features are huge and
   low-alpha, the sun is one coarse object (squares >= 100px) parked
   outside the text lane. === */
html::before {
  content: "";
  display: var(--voxel-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background-image:
    /* the square sun: nested squares = blocky banded glow, now with a
       molten core and a warm halo square for more material depth */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'%3E%3Cdefs%3E%3ClinearGradient id='gh' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%23fffbe8' stop-opacity='0'/%3E%3Cstop offset='.5' stop-color='%23fffbe8' stop-opacity='.85'/%3E%3Cstop offset='1' stop-color='%23fffbe8' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='gv' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23fffbe8' stop-opacity='0'/%3E%3Cstop offset='.5' stop-color='%23fffbe8' stop-opacity='.8'/%3E%3Cstop offset='1' stop-color='%23fffbe8' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='2' y='2' width='176' height='176' fill='%23ff8a44' opacity='.12'/%3E%3Crect x='12' y='12' width='156' height='156' fill='%23ff9a4c' opacity='.24'/%3E%3Crect x='24' y='24' width='132' height='132' fill='%23ffb35c' opacity='.5'/%3E%3Crect x='38' y='38' width='104' height='104' fill='%23ffcf76' opacity='.9'/%3E%3Crect x='52' y='52' width='76' height='76' fill='%23ffe6a8'/%3E%3Crect x='64' y='64' width='52' height='52' fill='%23fff2ca'/%3E%3Crect x='74' y='74' width='32' height='32' fill='%23fffbe8'/%3E%3Cg fill='%23ffe6a8' opacity='.5'%3E%3Crect x='38' y='38' width='16' height='16'/%3E%3Crect x='126' y='38' width='16' height='16'/%3E%3Crect x='38' y='126' width='16' height='16'/%3E%3Crect x='126' y='126' width='16' height='16'/%3E%3C/g%3E%3Cg fill='%23fff2ca' opacity='.55'%3E%3Crect x='2' y='84' width='12' height='12'/%3E%3Crect x='166' y='84' width='12' height='12'/%3E%3Crect x='84' y='2' width='12' height='12'/%3E%3C/g%3E%3C!--baked lens-star gleam off the molten core (static, L6-safe)--%3E%3Crect x='4' y='87' width='172' height='6' fill='url(%23gh)' opacity='.7'/%3E%3Crect x='87' y='24' width='6' height='132' fill='url(%23gv)' opacity='.6'/%3E%3Crect x='84' y='84' width='12' height='12' fill='%23fffef8'/%3E%3C/svg%3E"),
    /* VOLUMETRIC GOD-RAYS — broad soft warm shafts fanning UP and OUT from
       the setting sun itself (convergence at viewBox 250,871 = screen ~25vw/
       77vh under xMidYMax slice). Rays radiate outward through a full arc so
       the fan reads as sunlight leaving the horizon, never a detached spotlight
       cone. Coarse by construction (wide low-alpha bands, no thin lines), so
       they cross the lane without tripping the flicker law; STATIC. */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000' preserveAspectRatio='xMidYMax slice'%3E%3Cdefs%3E%3ClinearGradient id='r' x1='0' y1='1' x2='0' y2='0'%3E%3Cstop offset='0' stop-color='%23ffd98f' stop-opacity='.42'/%3E%3Cstop offset='.42' stop-color='%23ffc879' stop-opacity='.2'/%3E%3Cstop offset='.78' stop-color='%23ffbf78' stop-opacity='.05'/%3E%3Cstop offset='1' stop-color='%23ffbf78' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='rw' x1='0' y1='1' x2='0' y2='0'%3E%3Cstop offset='0' stop-color='%23fff0c4' stop-opacity='.52'/%3E%3Cstop offset='.5' stop-color='%23ffe4a0' stop-opacity='.18'/%3E%3Cstop offset='.85' stop-color='%23ffe6b0' stop-opacity='.03'/%3E%3Cstop offset='1' stop-color='%23ffe6b0' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='rcol' x1='0' y1='1' x2='0' y2='0'%3E%3Cstop offset='0' stop-color='%23fff6da' stop-opacity='.6'/%3E%3Cstop offset='.55' stop-color='%23ffe6a8' stop-opacity='.16'/%3E%3Cstop offset='1' stop-color='%23ffe6a8' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='url(%23r)'%3E%3Cpolygon points='250,871 -250,-60 -60,-60'/%3E%3Cpolygon points='250,871 -20,-60 150,-60'/%3E%3Cpolygon points='250,871 300,-60 470,-60'/%3E%3Cpolygon points='250,871 640,-60 850,-30'/%3E%3Cpolygon points='250,871 920,80 1080,170'/%3E%3Cpolygon points='250,871 990,380 1130,520'/%3E%3C/g%3E%3Cg fill='url(%23rw)'%3E%3Cpolygon points='250,871 80,-60 200,-60'/%3E%3Cpolygon points='250,871 490,-60 610,-50'/%3E%3Cpolygon points='250,871 780,-20 930,50'/%3E%3C/g%3E%3C!--bright central column of light rising straight off the sun--%3E%3Cpolygon points='250,871 210,-60 290,-60' fill='url(%23rcol)'/%3E%3C/svg%3E"),
    /* the sun's bloom — a bright molten core halo (hero bloom) */
    radial-gradient(circle 130px at 25vw 76vh, rgba(255, 248, 224, 0.55), rgba(255, 226, 150, 0.28) 60%, rgba(255, 200, 110, 0) 100%),
    radial-gradient(circle 340px at 25vw 77vh, rgba(255, 222, 150, 0.44), rgba(255, 180, 90, 0.14) 55%, rgba(255, 180, 90, 0) 76%),
    /* wide dusk glow hugging the horizon around the sun */
    radial-gradient(ellipse 68vw 26vh at 25vw 81vh, rgba(255, 150, 74, 0.26), rgba(255, 150, 74, 0) 72%),
    /* a cool counter-glow high on the right — the sky opposite the sun keeps
       a last violet luminance so the upper-right isn't a dead flat field */
    radial-gradient(ellipse 60vw 40vh at 88vw 8vh, rgba(120, 96, 190, 0.2), rgba(120, 96, 190, 0) 70%),
    /* night already owns the top corners */
    radial-gradient(ellipse 140% 120% at 50% 46%, rgba(9, 5, 22, 0) 56%, rgba(7, 4, 20, 0.56) 100%);
  background-position: calc(25vw - 90px) calc(77vh - 90px), 0 0, 0 0, 0 0, 0 0, 0 0, 0 0;
  background-size: 180px 180px, 100% 100%, auto, auto, auto, auto, auto;
  background-repeat: no-repeat;
}

/* === GIANT VOXEL CLOUDS — chunky cloud MASSES built as stacked voxel
   blocks with a full four-value model per mass: a HOT lit crown (warm
   sky-catch where the last light grazes the top edge), a bright upper
   body, a mid dusk-lavender body, a deep shadow underhang that reads the
   cloud's volume, and a multi-step glowing UNDERSIDE lip where the setting
   sun uplights the belly. Static specular glint blocks ride the crowns
   (L6-safe — baked highlights, never moving). Coarse by construction
   (blocks >= 44px), soft alpha, STATIC, promoted. Atmospheric perspective:
   the left cloud (nearest the sun, lowest) runs warmest + highest contrast;
   the far-right cloud is cooler, hazier, lower contrast; the small center
   wisp is distant and faint. === */
html::after {
  content: "";
  display: var(--voxel-scenery, block);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 46vh;
  z-index: -2;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 500' preserveAspectRatio='none'%3E%3Cdefs%3E%3ClinearGradient id='cl-crown' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23ffe6c0'/%3E%3Cstop offset='1' stop-color='%23e6bfc4'/%3E%3C/linearGradient%3E%3ClinearGradient id='cl-hi' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23cdaad6'/%3E%3Cstop offset='1' stop-color='%23a487bf'/%3E%3C/linearGradient%3E%3ClinearGradient id='cl-bod' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%237e69ac'/%3E%3Cstop offset='1' stop-color='%23574682'/%3E%3C/linearGradient%3E%3ClinearGradient id='cl-sh' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%233f3268'/%3E%3Cstop offset='1' stop-color='%2329204a'/%3E%3C/linearGradient%3E%3ClinearGradient id='cl-bel' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23ffb87e'/%3E%3Cstop offset='.5' stop-color='%23f0806e'/%3E%3Cstop offset='1' stop-color='%23c25370'/%3E%3C/linearGradient%3E%3ClinearGradient id='fl-top' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23b6a3d0'/%3E%3Cstop offset='1' stop-color='%238575ad'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg%3E%3C!--upper turret--%3E%3Crect x='300' y='62' width='104' height='16' fill='url(%23cl-crown)'/%3E%3Crect x='300' y='78' width='104' height='18' fill='url(%23cl-hi)'/%3E%3Crect x='300' y='96' width='104' height='30' fill='url(%23cl-bod)'/%3E%3Crect x='382' y='78' width='22' height='48' fill='url(%23cl-sh)'/%3E%3Crect x='176' y='96' width='116' height='14' fill='url(%23cl-crown)'/%3E%3Crect x='176' y='110' width='116' height='16' fill='url(%23cl-hi)'/%3E%3Crect x='176' y='126' width='116' height='22' fill='url(%23cl-bod)'/%3E%3C!--main crown ridge--%3E%3Crect x='120' y='128' width='320' height='14' fill='url(%23cl-crown)'/%3E%3Crect x='428' y='132' width='122' height='12' fill='url(%23cl-crown)' opacity='.85'/%3E%3Crect x='120' y='142' width='430' height='16' fill='url(%23cl-hi)'/%3E%3C!--main body--%3E%3Crect x='120' y='158' width='430' height='34' fill='url(%23cl-bod)'/%3E%3Crect x='120' y='158' width='22' height='34' fill='%238b76bd'/%3E%3Crect x='528' y='158' width='22' height='34' fill='url(%23cl-sh)'/%3E%3Crect x='300' y='158' width='104' height='34' fill='%23514279' opacity='.5'/%3E%3C!--lower shelf, widest--%3E%3Crect x='82' y='168' width='156' height='12' fill='url(%23cl-crown)'/%3E%3Crect x='82' y='180' width='156' height='12' fill='url(%23cl-hi)'/%3E%3Crect x='300' y='176' width='250' height='10' fill='url(%23cl-hi)' opacity='.75'/%3E%3Crect x='82' y='192' width='490' height='46' fill='url(%23cl-bod)'/%3E%3Crect x='82' y='192' width='24' height='46' fill='%238b76bd'/%3E%3Crect x='548' y='192' width='24' height='46' fill='url(%23cl-sh)'/%3E%3C!--interior shadow pockets = volume--%3E%3Crect x='452' y='158' width='120' height='80' fill='url(%23cl-sh)' opacity='.5'/%3E%3Crect x='188' y='204' width='128' height='30' fill='url(%23cl-sh)' opacity='.55'/%3E%3Crect x='372' y='202' width='96' height='34' fill='url(%23cl-sh)' opacity='.5'/%3E%3C!--glowing belly lip, blocky multi-step uplight (segmented so it reads as an uplit belly, not a neon bar)--%3E%3Crect x='82' y='238' width='490' height='12' fill='url(%23cl-bel)'/%3E%3Cg fill='%23ffd9a0'%3E%3Crect x='82' y='238' width='68' height='12' opacity='.92'/%3E%3Crect x='210' y='238' width='96' height='11' opacity='.72'/%3E%3Crect x='360' y='238' width='120' height='11' opacity='.66'/%3E%3C/g%3E%3Cg fill='%23ff8f7e' opacity='.6'%3E%3Crect x='96' y='250' width='120' height='7'/%3E%3Crect x='250' y='250' width='150' height='7'/%3E%3Crect x='430' y='250' width='110' height='7'/%3E%3C/g%3E%3Crect x='150' y='257' width='300' height='4' fill='%23e8657e' opacity='.4'/%3E%3C!--baked specular glints on the crowns (static, L6-safe)--%3E%3Cg fill='%23fff6e2'%3E%3Crect x='128' y='130' width='30' height='6' opacity='.9'/%3E%3Crect x='312' y='64' width='24' height='6' opacity='.85'/%3E%3Crect x='90' y='170' width='26' height='5' opacity='.8'/%3E%3Crect x='188' y='98' width='22' height='5' opacity='.75'/%3E%3C/g%3E%3C/g%3E%3Cg opacity='.72'%3E%3C!--far-right cloud, cooler/hazier--%3E%3Crect x='1360' y='36' width='236' height='12' fill='url(%23fl-top)'/%3E%3Crect x='1280' y='68' width='156' height='11' fill='url(%23fl-top)'/%3E%3Crect x='1430' y='68' width='306' height='11' fill='url(%23fl-top)'/%3E%3Crect x='1360' y='48' width='236' height='20' fill='%23554789'/%3E%3Crect x='1280' y='79' width='456' height='34' fill='url(%23cl-bod)'/%3E%3Crect x='1280' y='79' width='18' height='34' fill='%23615293' opacity='.7'/%3E%3Crect x='1718' y='79' width='18' height='34' fill='url(%23cl-sh)'/%3E%3Crect x='1216' y='113' width='566' height='30' fill='%23473a76'/%3E%3Crect x='1216' y='113' width='300' height='8' fill='url(%23fl-top)' opacity='.6'/%3E%3Crect x='1500' y='124' width='120' height='18' fill='url(%23cl-sh)' opacity='.55'/%3E%3Crect x='1216' y='143' width='566' height='11' fill='%23d07a86' opacity='.5'/%3E%3Crect x='1216' y='154' width='566' height='5' fill='%23b06078' opacity='.32'/%3E%3Crect x='1372' y='38' width='26' height='5' fill='%23e8dcff' opacity='.7'/%3E%3C/g%3E%3Cg opacity='.42'%3E%3C!--faint center wisp--%3E%3Crect x='808' y='18' width='150' height='7' fill='%23a897c8'/%3E%3Crect x='744' y='25' width='280' height='24' fill='%23554789'/%3E%3Crect x='744' y='49' width='280' height='7' fill='%23ff9484' opacity='.42'/%3E%3C/g%3E%3C/svg%3E") 0 0 / 100% 100% no-repeat;
}

/* === TERRAIN — the stepped silhouette band. Far ridge in dusk violet
   (the sun sets behind the 384-576 plateau, whose rim burns), near ground
   in deep indigo with grass lips that run warm near the sun and cool away
   from it. Set dressing: a torch, a blocky tree far left, a hut with one
   lit window, the hero cube's grounded shadow. Steps are 48px+ = coarse.
   STATIC, promoted, and head-side: body pseudos inherit the base bottom
   edge-fade mask, which would dissolve the ground into the bright sky.
   z:-1 keeps it under the torch glow (z:0). === */
head meta:last-of-type::after {
  content: "";
  display: var(--voxel-scenery, block);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 24vh;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 260' preserveAspectRatio='none'%3E%3Cpath d='M0 120 L96 120 L96 72 L240 72 L240 120 L336 120 L336 168 L384 168 L384 40 L576 40 L576 120 L720 120 L720 88 L864 88 L864 136 L1056 136 L1056 72 L1200 72 L1200 120 L1392 120 L1392 56 L1536 56 L1536 104 L1680 104 L1680 136 L1920 136 L1920 260 L0 260 Z' fill='%23241b42'/%3E%3Crect x='384' y='40' width='192' height='6' fill='%23e8934e' opacity='.8'/%3E%3Crect x='96' y='72' width='144' height='5' fill='%23594a8f' opacity='.45'/%3E%3Crect x='1056' y='72' width='144' height='5' fill='%23594a8f' opacity='.35'/%3E%3Crect x='1392' y='56' width='144' height='5' fill='%23594a8f' opacity='.4'/%3E%3Cpath d='M0 168 L144 168 L144 208 L336 208 L336 184 L528 184 L528 216 L768 216 L768 184 L912 184 L912 208 L1104 208 L1104 176 L1248 176 L1248 208 L1440 208 L1440 192 L1632 192 L1632 216 L1920 216 L1920 260 L0 260 Z' fill='%23110c22'/%3E%3Cg%3E%3Crect x='0' y='168' width='144' height='5' fill='%23a07444' opacity='.6'/%3E%3Crect x='144' y='208' width='192' height='5' fill='%23907040' opacity='.5'/%3E%3Crect x='336' y='184' width='192' height='5' fill='%23705e42' opacity='.5'/%3E%3Crect x='528' y='216' width='240' height='5' fill='%234a5c42' opacity='.45'/%3E%3Crect x='768' y='184' width='144' height='5' fill='%23415a44' opacity='.5'/%3E%3Crect x='912' y='208' width='192' height='5' fill='%233c5640' opacity='.45'/%3E%3Crect x='1104' y='176' width='144' height='5' fill='%23415a44' opacity='.5'/%3E%3Crect x='1248' y='208' width='192' height='5' fill='%233a5340' opacity='.45'/%3E%3Crect x='1440' y='192' width='192' height='5' fill='%23415a44' opacity='.45'/%3E%3Crect x='1632' y='216' width='288' height='5' fill='%233a5340' opacity='.4'/%3E%3C/g%3E%3Crect x='88' y='164' width='20' height='44' fill='%23070510'/%3E%3Crect x='40' y='100' width='116' height='68' fill='%23172c1f'/%3E%3Crect x='40' y='100' width='116' height='10' fill='%23486d3f' opacity='.55'/%3E%3Crect x='146' y='100' width='10' height='68' fill='%23a06a35' opacity='.4'/%3E%3Crect x='430' y='170' width='20' height='14' fill='%23090617'/%3E%3Crect x='800' y='170' width='26' height='14' fill='%23090617'/%3E%3Ccircle cx='300' cy='163' r='26' fill='%23ffc46b' opacity='.14'/%3E%3Crect x='297' y='168' width='7' height='40' fill='%23050308'/%3E%3Crect x='294' y='156' width='13' height='13' fill='%23ffc46b'/%3E%3Crect x='297' y='159' width='7' height='6' fill='%23fff1c4'/%3E%3Cellipse cx='1420' cy='214' rx='64' ry='10' fill='%23050310' opacity='.5'/%3E%3Crect x='1584' y='136' width='182' height='14' fill='%230d0a1e'/%3E%3Crect x='1616' y='122' width='118' height='14' fill='%230d0a1e'/%3E%3Crect x='1648' y='108' width='54' height='14' fill='%230d0a1e'/%3E%3Crect x='1600' y='150' width='150' height='66' fill='%23140f2c'/%3E%3Ccircle cx='1665' cy='181' r='30' fill='%23ffb35c' opacity='.16'/%3E%3Crect x='1652' y='168' width='26' height='26' fill='%23ffca6e'/%3E%3Crect x='1663' y='168' width='3' height='26' fill='%23140f2c'/%3E%3Crect x='1652' y='179' width='26' height='3' fill='%23140f2c'/%3E%3Crect x='1700' y='176' width='22' height='40' fill='%23090617'/%3E%3C/svg%3E") 0 0 / 100% 100% no-repeat;
}

/* === the lane: names cross the bright coral band, so the center column
   gets a quiet indigo scrim — coarse, soft, STATIC. It dies before the
   edges so the sun and the cubes keep their light. === */
body::after {
  content: "";
  display: var(--voxel-scenery, block);
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  transform: translateZ(0);
  background: linear-gradient(90deg,
    rgba(12, 8, 28, 0) 24%, rgba(12, 8, 28, 0.42) 36%, rgba(12, 8, 28, 0.5) 50%,
    rgba(12, 8, 28, 0.42) 64%, rgba(12, 8, 28, 0) 76%);
}

/* === HERO CUBE — floating upper-right with a small satellite cubelet.
   Sun is far to its left: warm gradient on the sunward face, skylit
   lavender top, indigo shadow face, gold rim light down the lit edges,
   a specular patch, faint under-glow; its cast shadow is grounded on the
   terrain layer directly below. Continuous mover #1 (12px bob,
   will-change). === */
head { display: var(--voxel-scenery, block); }
head::before {
  content: "";
  display: var(--voxel-scenery, block);
  position: fixed;
  left: calc(74vw - 100px);
  top: 19vh;
  width: 200px;
  height: 230px;
  z-index: 0;
  pointer-events: none;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 230'%3E%3Cdefs%3E%3ClinearGradient id='wm' x1='0' y1='.1' x2='1' y2='.9'%3E%3Cstop offset='0' stop-color='%23ffe2ab'/%3E%3Cstop offset='.42' stop-color='%23e79a52'/%3E%3Cstop offset='1' stop-color='%23a04e28'/%3E%3C/linearGradient%3E%3ClinearGradient id='tp' x1='.15' y1='0' x2='.85' y2='1'%3E%3Cstop offset='0' stop-color='%23a99ce0'/%3E%3Cstop offset='.5' stop-color='%23837bc4'/%3E%3Cstop offset='1' stop-color='%23574a95'/%3E%3C/linearGradient%3E%3ClinearGradient id='dk' x1='0' y1='0' x2='.4' y2='1'%3E%3Cstop offset='0' stop-color='%23342559'/%3E%3Cstop offset='1' stop-color='%23120a28'/%3E%3C/linearGradient%3E%3CradialGradient id='ao' cx='.5' cy='.5' r='.5'%3E%3Cstop offset='0' stop-color='%23060312' stop-opacity='.42'/%3E%3Cstop offset='.7' stop-color='%23060312' stop-opacity='.22'/%3E%3Cstop offset='1' stop-color='%23060312' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='glow' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23ffb35c' stop-opacity='.22'/%3E%3Cstop offset='1' stop-color='%23ffb35c' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cellipse cx='100' cy='207' rx='62' ry='14' fill='url(%23ao)'/%3E%3Cpath d='M30 138 L100 173 L100 186 L30 151 Z' fill='url(%23glow)'/%3E%3Cpath d='M100 90 L170 55 L170 135 L100 170 Z' fill='url(%23dk)'/%3E%3Cpath d='M30 55 L100 90 L100 170 L30 135 Z' fill='url(%23wm)'/%3E%3Cpath d='M100 20 L170 55 L100 90 L30 55 Z' fill='url(%23tp)'/%3E%3Cg opacity='.13' stroke='%23fff' stroke-width='.6'%3E%3Cpath d='M52 47 L122 82'/%3E%3Cpath d='M74 39 L144 74'/%3E%3Cpath d='M96 29 L166 64'/%3E%3C/g%3E%3Cg opacity='.16' stroke='%230f0a24' stroke-width='.6'%3E%3Cpath d='M65 55 L100 72'/%3E%3Cpath d='M100 37 L135 55'/%3E%3C/g%3E%3Cpath d='M52 46 L82 60 L64 69 L34 55 Z' fill='%23b3a6e6' opacity='.35'/%3E%3Cpath d='M36 66 L54 75 L54 95 L36 86 Z' fill='%23fff6df' opacity='.6'/%3E%3Cpath d='M39 70 L50 75 L50 90 L39 84 Z' fill='%23fffdf4' opacity='.35'/%3E%3Cpath d='M40 92 L50 97 L50 104 L40 99 Z' fill='%23fff6df' opacity='.25'/%3E%3Cpath d='M30 55 L30 135' stroke='%23fff0c8' stroke-width='2.6' stroke-linecap='round'/%3E%3Cpath d='M30 55 L100 20' stroke='%23ffe6a4' stroke-width='2.1' opacity='.85' stroke-linecap='round'/%3E%3Cpath d='M100 20 L170 55' stroke='%23c9bdf0' stroke-width='1.6' opacity='.6' stroke-linecap='round'/%3E%3Cpath d='M30 135 L100 170' stroke='%23ffcf8a' stroke-width='1.4' opacity='.5' stroke-linecap='round'/%3E%3Cpath d='M100 90 L100 170' stroke='%23100a26' stroke-width='1.6' opacity='.65'/%3E%3Cpath d='M100 90 L170 55' stroke='%23120b2c' stroke-width='1' opacity='.5'/%3E%3Cellipse cx='168' cy='200' rx='24' ry='6' fill='url(%23ao)'/%3E%3Cpath d='M158 170 L176 179 L158 188 L140 179 Z' fill='%238476b8'/%3E%3Cpath d='M140 179 L158 188 L158 210 L140 201 Z' fill='%23e3a05c'/%3E%3Cpath d='M158 188 L176 179 L176 201 L158 210 Z' fill='%23241740'/%3E%3Cpath d='M140 179 L140 201' stroke='%23fff0c8' stroke-width='1.3' opacity='.9'/%3E%3Cpath d='M140 179 L158 170' stroke='%23e6dbff' stroke-width='1' opacity='.6'/%3E%3C/svg%3E"),
    /* coarse soft warm bloom behind the hero cube — rides the prop (moves
       with it), >=40px soft falloff, so L6-legal (no fine screen-fixed
       twinkle over the lane) */
    radial-gradient(circle 120px at 42% 46%, rgba(255, 198, 120, 0.22), rgba(255, 180, 90, 0.06) 55%, rgba(255, 180, 90, 0) 78%);
  background-position: center, center;
  background-size: contain, 100% 100%;
  background-repeat: no-repeat, no-repeat;
  will-change: transform;
  animation: voxel-bob 6.5s ease-in-out infinite;
}

/* === CUBE PAIR — two smaller cubes floating left-of-lane, sun to their
   RIGHT: warm right faces, dark left faces (the one light story).
   Continuous mover #2 — same bob keyframe, slower, phase-offset. === */
head::after {
  content: "";
  display: var(--voxel-scenery, block);
  position: fixed;
  left: 4vw;
  top: 40vh;
  width: 240px;
  height: 270px;
  z-index: 0;
  pointer-events: none;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 270'%3E%3Cdefs%3E%3ClinearGradient id='wr' x1='0' y1='.9' x2='1' y2='.1'%3E%3Cstop offset='0' stop-color='%23a04e28'/%3E%3Cstop offset='.55' stop-color='%23e79a52'/%3E%3Cstop offset='1' stop-color='%23ffe2ab'/%3E%3C/linearGradient%3E%3ClinearGradient id='tq' x1='.15' y1='0' x2='.85' y2='1'%3E%3Cstop offset='0' stop-color='%239b8fd6'/%3E%3Cstop offset='.5' stop-color='%23786fbb'/%3E%3Cstop offset='1' stop-color='%234f438d'/%3E%3C/linearGradient%3E%3ClinearGradient id='dl' x1='0' y1='0' x2='.4' y2='1'%3E%3Cstop offset='0' stop-color='%232c1e50'/%3E%3Cstop offset='1' stop-color='%230e0824'/%3E%3C/linearGradient%3E%3CradialGradient id='ao2' cx='.5' cy='.5' r='.5'%3E%3Cstop offset='0' stop-color='%23050310' stop-opacity='.34'/%3E%3Cstop offset='1' stop-color='%23050310' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Cellipse cx='70' cy='181' rx='50' ry='11' fill='url(%23ao2)'/%3E%3Cpath d='M6 52 L70 84 L70 164 L6 132 Z' fill='url(%23dl)'/%3E%3Cpath d='M70 84 L134 52 L134 132 L70 164 Z' fill='url(%23wr)'/%3E%3Cpath d='M70 20 L134 52 L70 84 L6 52 Z' fill='url(%23tq)'/%3E%3Cg opacity='.14' stroke='%23fff' stroke-width='.6'%3E%3Cpath d='M22 50 L86 82'/%3E%3Cpath d='M44 42 L108 74'/%3E%3C/g%3E%3Cpath d='M134 52 L134 132' stroke='%23fff0c8' stroke-width='2.3' stroke-linecap='round'/%3E%3Cpath d='M134 52 L70 20' stroke='%23ffe6a4' stroke-width='1.7' opacity='.8' stroke-linecap='round'/%3E%3Cpath d='M70 20 L6 52' stroke='%23c9bdf0' stroke-width='1.3' opacity='.55' stroke-linecap='round'/%3E%3Cpath d='M70 84 L70 164' stroke='%230e0824' stroke-width='1.4' opacity='.6'/%3E%3Cpath d='M112 66 L128 58 L128 78 L112 86 Z' fill='%23fff6df' opacity='.5'/%3E%3Cpath d='M116 92 L124 88 L124 96 L116 100 Z' fill='%23fff6df' opacity='.22'/%3E%3Cellipse cx='180' cy='250' rx='34' ry='8' fill='url(%23ao2)'/%3E%3Cpath d='M140 180 L180 200 L180 248 L140 228 Z' fill='url(%23dl)'/%3E%3Cpath d='M180 200 L220 180 L220 228 L180 248 Z' fill='url(%23wr)'/%3E%3Cpath d='M180 160 L220 180 L180 200 L140 180 Z' fill='url(%23tq)'/%3E%3Cpath d='M220 180 L220 228' stroke='%23fff0c8' stroke-width='1.7' stroke-linecap='round'/%3E%3Cpath d='M220 180 L180 160' stroke='%23ffe6a4' stroke-width='1.3' opacity='.75' stroke-linecap='round'/%3E%3Cpath d='M180 200 L180 248' stroke='%230e0824' stroke-width='1.2' opacity='.55'/%3E%3C/svg%3E") center / contain no-repeat;
  will-change: transform;
  animation: voxel-bob 9s ease-in-out -3.2s infinite;
}

/* === extra prop layers: the two <meta> void elements render nothing
   themselves; their fixed pseudos are free canvases. === */
head meta { display: var(--voxel-scenery, block); }

/* === HUD — hearts row (four full, one half), armor row (three plates
   left), XP sliver. Pixel cells >= 3px but the whole cluster lives in the
   top-left CORNER (L6-legal), far off the lane. STATIC, promoted. === */
head meta:first-of-type::before {
  content: "";
  display: var(--voxel-scenery, block);
  position: fixed;
  left: 22px;
  top: 20px;
  width: 250px;
  height: 80px;
  z-index: 0;
  pointer-events: none;
  opacity: 0.95;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 96'%3E%3Cdefs%3E%3Cg id='hf'%3E%3Crect x='2' y='0' width='6' height='4' fill='%23ff5560'/%3E%3Crect x='12' y='0' width='6' height='4' fill='%23ff5560'/%3E%3Crect x='0' y='4' width='20' height='6' fill='%23ff5560'/%3E%3Crect x='2' y='10' width='16' height='3' fill='%23e03d50'/%3E%3Crect x='5' y='13' width='10' height='3' fill='%23c22f44'/%3E%3Crect x='8' y='16' width='4' height='2' fill='%23c22f44'/%3E%3Crect x='3' y='2' width='3' height='3' fill='%23ffd9dd' opacity='.85'/%3E%3C/g%3E%3Cg id='he'%3E%3Crect x='2' y='0' width='6' height='4' fill='%23372339'/%3E%3Crect x='12' y='0' width='6' height='4' fill='%23372339'/%3E%3Crect x='0' y='4' width='20' height='6' fill='%23372339'/%3E%3Crect x='2' y='10' width='16' height='3' fill='%232c1b2e'/%3E%3Crect x='5' y='13' width='10' height='3' fill='%232c1b2e'/%3E%3Crect x='8' y='16' width='4' height='2' fill='%232c1b2e'/%3E%3C/g%3E%3Cg id='af'%3E%3Crect x='0' y='2' width='5' height='8' fill='%23808ca6'/%3E%3Crect x='15' y='2' width='5' height='8' fill='%23808ca6'/%3E%3Crect x='4' y='4' width='12' height='12' fill='%23b6c1d8'/%3E%3Crect x='4' y='13' width='12' height='3' fill='%23808ca6'/%3E%3Crect x='5' y='5' width='3' height='3' fill='%23ffffff' opacity='.55'/%3E%3C/g%3E%3Cg id='ae'%3E%3Crect x='0' y='2' width='5' height='8' fill='%23262038'/%3E%3Crect x='15' y='2' width='5' height='8' fill='%23262038'/%3E%3Crect x='4' y='4' width='12' height='12' fill='%23332c4d'/%3E%3C/g%3E%3C/defs%3E%3Cuse href='%23hf' x='4' y='4'/%3E%3Cuse href='%23hf' x='30' y='4'/%3E%3Cuse href='%23hf' x='56' y='4'/%3E%3Cuse href='%23hf' x='82' y='4'/%3E%3Cuse href='%23he' x='108' y='4'/%3E%3Crect x='110' y='4' width='6' height='4' fill='%23ff5560'/%3E%3Crect x='108' y='8' width='10' height='6' fill='%23ff5560'/%3E%3Crect x='110' y='14' width='8' height='3' fill='%23e03d50'/%3E%3Crect x='113' y='17' width='5' height='3' fill='%23c22f44'/%3E%3Crect x='111' y='6' width='3' height='3' fill='%23ffd9dd' opacity='.85'/%3E%3Cuse href='%23af' x='4' y='34'/%3E%3Cuse href='%23af' x='30' y='34'/%3E%3Cuse href='%23af' x='56' y='34'/%3E%3Cuse href='%23ae' x='82' y='34'/%3E%3Cuse href='%23ae' x='108' y='34'/%3E%3Crect x='2' y='68' width='236' height='9' fill='%230d2012'/%3E%3Crect x='2' y='68' width='148' height='9' fill='%2377e63d'/%3E%3Crect x='2' y='68' width='148' height='3' fill='%23aef77a' opacity='.9'/%3E%3Cg fill='%23081409' opacity='.75'%3E%3Crect x='26' y='68' width='2' height='9'/%3E%3Crect x='50' y='68' width='2' height='9'/%3E%3Crect x='74' y='68' width='2' height='9'/%3E%3Crect x='98' y='68' width='2' height='9'/%3E%3Crect x='122' y='68' width='2' height='9'/%3E%3Crect x='146' y='68' width='2' height='9'/%3E%3Crect x='170' y='68' width='2' height='9'/%3E%3Crect x='194' y='68' width='2' height='9'/%3E%3Crect x='218' y='68' width='2' height='9'/%3E%3C/g%3E%3C/svg%3E") 0 0 / contain no-repeat;
}

/* === one small pixel cloud drifting west through the clear mid-left
   sky (above the cube pair, below the big cloud) — steps(1) teleport
   hops (one hop / ~3s, far under the 5/s cap; NOT a continuous mover,
   so no will-change spent). === */
head meta:first-of-type::after {
  content: "";
  display: var(--voxel-scenery, block);
  position: fixed;
  top: 30vh;
  left: 24vw;
  width: 130px;
  height: 60px;
  z-index: -1;
  pointer-events: none;
  opacity: 0;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 130 60'%3E%3Crect x='24' y='2' width='56' height='6' fill='%23a08fc8' opacity='.55'/%3E%3Crect x='24' y='8' width='56' height='16' fill='%23594a8f' opacity='.5'/%3E%3Crect x='0' y='22' width='30' height='6' fill='%238877b0' opacity='.5'/%3E%3Crect x='0' y='28' width='120' height='18' fill='%23544588' opacity='.55'/%3E%3Crect x='0' y='46' width='120' height='6' fill='%23ff9a72' opacity='.42'/%3E%3Crect x='0' y='52' width='120' height='3' fill='%23ff7d8a' opacity='.3'/%3E%3C/svg%3E") center / contain no-repeat;
  animation: voxel-drift 36s steps(1, end) infinite;
}

/* === torch glow breathing on the terrain — a small fixed box over the
   torch baked into the silhouette; steps(1) opacity, 5 discrete levels
   over 9s = ~0.55 paints/s. Not a continuous mover. === */
head meta:last-of-type::before {
  content: "";
  display: var(--voxel-scenery, block);
  position: fixed;
  left: calc(15.6vw - 11vh);
  bottom: -1.5vh;
  width: 22vh;
  height: 22vh;
  z-index: 0;
  pointer-events: none;
  opacity: 0.85;
  background:
    radial-gradient(circle 2.4vh at 50% 44%, rgba(255, 232, 180, 0.35), rgba(255, 232, 180, 0) 100%),
    radial-gradient(circle closest-side at 50% 50%, rgba(255, 190, 110, 0.26) 0 40%, rgba(255, 170, 90, 0.11) 68%, rgba(255, 170, 90, 0) 100%);
  animation: voxel-torch 9s steps(1, end) infinite;
}

/* === distant floating island — a dark stepped slab hanging in the
   upper-right sky between the big cloud and the hero cube, vines and one
   tiny tree on top, warm rim on its sun side (the sun is far below-left).
   On body::before: the base mask is fully opaque at this height. STATIC,
   promoted. === */
body::before {
  content: "";
  display: var(--voxel-scenery, block);
  position: fixed;
  left: 84vw;
  top: 25vh;
  width: 210px;
  height: 132px;
  z-index: -1;
  pointer-events: none;
  opacity: 0.92;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 -14 240 164'%3E%3Cdefs%3E%3ClinearGradient id='isle' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%232f2550'/%3E%3Cstop offset='1' stop-color='%23150e2c'/%3E%3C/linearGradient%3E%3ClinearGradient id='grass' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%236f9a54'/%3E%3Cstop offset='1' stop-color='%233a5640'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cellipse cx='120' cy='128' rx='96' ry='9' fill='%23070414' opacity='.32'/%3E%3C!--tree: lit crown, mid body, shadow side, trunk--%3E%3Crect x='118' y='6' width='9' height='18' fill='%23241a12'/%3E%3Crect x='121' y='6' width='4' height='18' fill='%233a2a18' opacity='.7'/%3E%3Crect x='102' y='-8' width='44' height='9' fill='%236a9450'/%3E%3Crect x='102' y='1' width='44' height='10' fill='%234a7040'/%3E%3Crect x='102' y='11' width='44' height='9' fill='%232c4a2c'/%3E%3Crect x='102' y='-8' width='7' height='28' fill='%237fa858' opacity='.85'/%3E%3Crect x='139' y='-8' width='7' height='28' fill='%231d3020'/%3E%3Crect x='103' y='-7' width='16' height='4' fill='%23b7d68a' opacity='.7'/%3E%3C!--top grass slab (stepped), brighter with value steps--%3E%3Crect x='118' y='34' width='60' height='16' fill='url(%23isle)'/%3E%3Crect x='118' y='34' width='60' height='7' fill='url(%23grass)'/%3E%3Crect x='118' y='34' width='60' height='2' fill='%2384ad64' opacity='.85'/%3E%3Crect x='16' y='46' width='208' height='22' fill='url(%23isle)'/%3E%3Crect x='16' y='46' width='208' height='8' fill='url(%23grass)'/%3E%3Crect x='16' y='46' width='208' height='2' fill='%2384ad64' opacity='.7'/%3E%3C!--tapered underside--%3E%3Crect x='40' y='68' width='158' height='20' fill='%23241a44'/%3E%3Crect x='64' y='88' width='104' height='18' fill='%231b1436'/%3E%3Crect x='96' y='106' width='44' height='14' fill='%23140d28'/%3E%3Cg fill='%231e1640' opacity='.6'%3E%3Crect x='58' y='68' width='3' height='34'/%3E%3Crect x='110' y='68' width='3' height='50'/%3E%3Crect x='162' y='68' width='3' height='36'/%3E%3C/g%3E%3C!--warm sun-rim wrapping the left face + underside corner (sun far below-left)--%3E%3Crect x='16' y='46' width='6' height='42' fill='%23f0a256' opacity='.72'/%3E%3Crect x='16' y='84' width='30' height='5' fill='%23e6934a' opacity='.5'/%3E%3Crect x='16' y='63' width='4' height='26' fill='%23ffb870' opacity='.55'/%3E%3Crect x='40' y='84' width='96' height='4' fill='%23c47a3f' opacity='.3'/%3E%3C!--specular glint on grass edge (static, L6-safe)--%3E%3Crect x='24' y='47' width='30' height='3' fill='%23fff2cc' opacity='.7'/%3E%3C/svg%3E") center / contain no-repeat;
}

/* === MID-RIGHT floating island — a larger, nearer stepped isle filling the
   dead right-of-center field, hung below the far island / left of the hero
   cube. Closer = higher contrast + a proper warm sun-rim on its left face,
   a chunky underside, a tiny tree + lantern-lit hut, and a soft grounded
   shadow below it. Painted on head <title>'s free pseudo (title is set to
   display:block; it is NOT transformed, so position:fixed anchors to the
   viewport — unlike .credits-roll, whose per-frame transform would make a
   fixed child ride the crawl). STATIC, promoted. === */
head title { display: var(--voxel-scenery, block); }
head title::after {
  content: "";
  display: var(--voxel-scenery, block);
  position: fixed;
  left: 63vw;
  top: 44vh;
  width: 290px;
  height: 184px;
  z-index: -1;
  pointer-events: none;
  opacity: 0.95;
  transform: translateZ(0);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 -20 300 210'%3E%3Cdefs%3E%3ClinearGradient id='is2' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%233b3060'/%3E%3Cstop offset='1' stop-color='%23180f32'/%3E%3C/linearGradient%3E%3ClinearGradient id='gr2' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0' stop-color='%2382a862'/%3E%3Cstop offset='1' stop-color='%233c5a40'/%3E%3C/linearGradient%3E%3C/defs%3E%3C!--tree: lit crown / mid / shadow, trunk--%3E%3Crect x='70' y='-6' width='10' height='22' fill='%23241a12'/%3E%3Crect x='73' y='-6' width='4' height='22' fill='%233a2a18' opacity='.7'/%3E%3Crect x='50' y='-22' width='50' height='10' fill='%237aa858'/%3E%3Crect x='50' y='-12' width='50' height='11' fill='%234f7844'/%3E%3Crect x='50' y='-1' width='50' height='9' fill='%232e4c30'/%3E%3Crect x='50' y='-22' width='8' height='30' fill='%238cb862' opacity='.85'/%3E%3Crect x='92' y='-22' width='8' height='30' fill='%23223a24'/%3E%3Crect x='51' y='-21' width='18' height='4' fill='%23c2df94' opacity='.7'/%3E%3C!--lantern hut with lit window + warm cast--%3E%3Crect x='196' y='-2' width='58' height='10' fill='%231e1636'/%3E%3Crect x='204' y='8' width='42' height='28' fill='%23261b40'/%3E%3Crect x='204' y='8' width='42' height='5' fill='%234e4278'/%3E%3Crect x='204' y='8' width='6' height='28' fill='%23f0a256' opacity='.5'/%3E%3Crect x='215' y='18' width='16' height='16' fill='%23ffcf7a'/%3E%3Crect x='218' y='21' width='10' height='10' fill='%23fff0c4'/%3E%3Crect x='220' y='23' width='5' height='4' fill='%23fffdf4'/%3E%3C!--island top grass slab (stepped), brighter with value steps--%3E%3Crect x='40' y='14' width='150' height='20' fill='url(%23is2)'/%3E%3Crect x='40' y='14' width='150' height='9' fill='url(%23gr2)'/%3E%3Crect x='40' y='14' width='150' height='3' fill='%2398c070' opacity='.85'/%3E%3Crect x='16' y='34' width='268' height='30' fill='url(%23is2)'/%3E%3Crect x='16' y='34' width='268' height='10' fill='url(%23gr2)'/%3E%3Crect x='16' y='34' width='268' height='3' fill='%2398c070' opacity='.7'/%3E%3C!--tapered underside chunks--%3E%3Crect x='44' y='64' width='210' height='28' fill='%23261c48'/%3E%3Crect x='74' y='92' width='150' height='26' fill='%231d1640'/%3E%3Crect x='108' y='118' width='82' height='24' fill='%23160f30'/%3E%3Crect x='132' y='142' width='40' height='20' fill='%23110b26'/%3E%3C!--hanging root/vine ticks--%3E%3Cg fill='%231e1640' opacity='.6'%3E%3Crect x='96' y='64' width='4' height='44'/%3E%3Crect x='150' y='64' width='4' height='66'/%3E%3Crect x='206' y='64' width='4' height='46'/%3E%3C/g%3E%3C!--strong warm sun-rim on the left face (sun far below-left)--%3E%3Crect x='16' y='34' width='8' height='58' fill='%23f5a85c' opacity='.72'/%3E%3Crect x='16' y='58' width='185' height='5' fill='%23eb9c50' opacity='.5'/%3E%3Crect x='44' y='86' width='130' height='5' fill='%23c47a3f' opacity='.32'/%3E%3C!--specular glints (static, L6-safe)--%3E%3Crect x='26' y='35' width='40' height='3' fill='%23fff2cc' opacity='.72'/%3E%3Crect x='52' y='15' width='26' height='3' fill='%23f4ffde' opacity='.6'/%3E%3C/svg%3E") center / contain no-repeat;
}

/* === dusk sparkles — the only fine pattern, so it RIDES THE ROLL (zero
   slide against the tracked glyphs = zero flicker). Static, behind the
   names inside the roll's own stacking context. === */
.credits-roll::before,
.credits-slideshow::before {
  content: "";
  display: var(--voxel-scenery, block);
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.3;
  background-image:
    radial-gradient(circle at 26% 36%, rgba(255, 220, 150, 0.85) 0 1px, rgba(255, 220, 150, 0) 2px),
    radial-gradient(circle at 74% 14%, rgba(190, 170, 250, 0.75) 0 1px, rgba(190, 170, 250, 0) 2px),
    radial-gradient(circle at 12% 80%, rgba(150, 245, 130, 0.6) 0 1px, rgba(150, 245, 130, 0) 2px);
  background-size: 320px 320px, 260px 260px, 420px 420px;
}

/* === day-complete summary: every section is a loaded chunk === */
.credits-block,
.credits-slide:not(.flourish) { counter-increment: voxel-chunk; }

/* hue cycle — amber, XP green, lavender, repeat (intro is section 1, so
   the first block lands on 3n+2 = amber). Content-agnostic, custom
   credit types are safe anywhere in the roll. */
.credits-block:nth-of-type(3n + 2),
.credits-slide:nth-of-type(3n + 2) { --voxel-title: var(--voxel-amber); --voxel-xp: 46%; }
.credits-block:nth-of-type(3n),
.credits-slide:nth-of-type(3n) { --voxel-title: var(--voxel-xp-green); --voxel-xp: 72%; }
.credits-block:nth-of-type(3n + 1),
.credits-slide:nth-of-type(3n + 1) { --voxel-title: var(--voxel-lavender); --voxel-xp: 88%; }

/* === titles: Silkscreen pixel caps with a hard blocky drop, a chunk
   counter above, and the XP bar below (fill % cycles with the hue). === */
.credits-block__title {
  position: relative;
  width: fit-content;
  max-width: 88vw;
  margin: 0 auto 1.4rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--voxel-title, var(--voxel-amber));
  text-shadow: 0.14em 0.14em 0 rgba(34, 16, 66, 0.92);
}
.credits-block__title::before {
  content: "chunk " counter(voxel-chunk, decimal-leading-zero) " loaded";
  position: absolute;
  left: 50%;
  bottom: calc(100% + 0.7em);
  transform: translateX(-50%);
  font-size: 0.56rem;
  font-weight: 400;
  letter-spacing: 0.32em;
  white-space: nowrap;
  text-transform: lowercase;
  color: rgba(140, 245, 84, 0.85);
  text-shadow: 0 1px 8px rgba(10, 5, 26, 0.8);
}
/* the XP bar: dark trough, hard-stop green fill, segment notches riding
   the roll (in-roll fine detail is L6-legal because it never slides
   against the glyphs) */
.credits-block__title::after {
  content: "";
  display: block;
  width: min(240px, 58vw);
  height: 12px;
  margin: 0.75rem auto 0;
  opacity: 1;
  border: 2px solid #071108;
  box-sizing: border-box;
  background-image:
    repeating-linear-gradient(90deg, rgba(6, 12, 7, 0) 0 22px, rgba(6, 12, 7, 0.6) 22px 24px),
    linear-gradient(180deg, #b7f97e 0 3px, #6edd33 3px),
    linear-gradient(#0f2214, #0f2214);
  background-size: 100% 100%, var(--voxel-xp, 62%) 100%, 100% 100%;
  background-repeat: no-repeat;
  box-shadow: 0 2px 0 rgba(10, 5, 25, 0.6), inset 0 0 0 1px rgba(140, 245, 84, 0.22);
}

/* === rows: clean Outfit names (deliberate contrast with the pixel
   titles), amounts stacked as x64 in Silkscreen green. Names are sacred —
   wrap, never clip. === */
.credit {
  max-width: min(42rem, 92vw);
  margin-inline: auto;
  min-width: 0;
  overflow-wrap: anywhere;
  font-weight: 500;
  letter-spacing: 0.01em;
}
.credit__name { color: var(--voxel-cream); }
.credit__amount {
  opacity: 1;
  font-family: var(--credits-title-font);
  font-size: 0.58em;
  font-weight: 400;
  letter-spacing: 0.05em;
  color: var(--voxel-xp-green);
  vertical-align: 0.08em;
  text-shadow: 0 0 10px rgba(140, 245, 84, 0.3), var(--credits-shadow);
}
.credit__amount::before {
  content: "x";
  color: rgba(140, 245, 84, 0.7);
  margin: 0 0.12em 0 0.9em;
}

/* === flourish cards === */
.flourish--intro { gap: 1.3rem; }

/* badge -> the day counter chip (copy swap via font-size:0 + ::after) */
.flourish__badge { font-size: 0; border: 0; border-radius: 0; padding: 0; box-shadow: none; }
.flourish__badge::after {
  content: "day 4096 — dusk";
  display: inline-block;
  font-family: var(--credits-title-font);
  font-weight: 400;
  font-size: 0.68rem;
  letter-spacing: 0.32em;
  padding: 0.6em 0.8em 0.6em 1.12em;
  text-transform: lowercase;
  color: var(--voxel-xp-green);
  border: 1px solid rgba(140, 245, 84, 0.55);
  background: rgba(140, 245, 84, 0.07);
  box-shadow: 0 0 14px rgba(140, 245, 84, 0.18);
  text-shadow: 0 0 8px rgba(140, 245, 84, 0.4);
}

/* the streamer's title: pixel caps, cream, hard violet block-drop plus a
   soft last-light glow (restyle only — this is their copy) */
.flourish--intro .flourish__title {
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1.22;
  max-width: min(92vw, 14em);
  color: #fff3d9;
  text-shadow: 0.1em 0.1em 0 rgba(60, 31, 94, 0.95), 0 0 34px rgba(255, 180, 90, 0.4);
}

/* streamer tagline: restyle only */
.flourish__tagline {
  font-style: normal;
  font-weight: 400;
  font-size: 0.95rem;
  letter-spacing: 0.28em;
  padding-left: 0.28em;
  text-transform: lowercase;
  color: rgba(255, 228, 190, 0.85);
}

/* rating -> the save-file stamp (copy swap) */
.flourish__rating { font-size: 0; border: 0; padding: 0; opacity: 1; }
.flourish__rating::after {
  content: "difficulty: cozy · autosave: on";
  display: inline-block;
  font-family: var(--credits-title-font);
  font-weight: 400;
  font-size: 0.6rem;
  letter-spacing: 0.26em;
  padding: 0.6em 0.8em 0.6em 1.06em;
  text-transform: lowercase;
  color: #ffce7c;
  border: 1px solid rgba(255, 190, 92, 0.5);
  border-radius: 2px;
}

/* world fine print under the intro card */
.flourish--intro::after {
  content: "seed 84120 · render distance: max · smooth lighting: on";
  display: var(--voxel-scenery, block);
  font-weight: 500;
  font-size: 0.64rem;
  letter-spacing: 0.28em;
  padding-left: 0.28em;
  text-transform: lowercase;
  color: rgba(207, 155, 255, 0.55);
}

/* outro: DAY COMPLETE — sleep well (copy swaps; first stars overhead,
   then the save chip) */
.flourish--outro::before {
  content: "\\2726 \\2726 \\2726";
  display: var(--voxel-scenery, block);
  font-size: 0.7rem;
  letter-spacing: 0.85em;
  padding-left: 0.85em;
  color: var(--voxel-lavender);
  opacity: 0.8;
  text-shadow: 0 0 10px rgba(207, 155, 255, 0.5);
}
.flourish--outro .flourish__title { font-size: 0; }
.flourish--outro .flourish__title::after {
  content: "DAY COMPLETE";
  display: inline-block;
  font-family: var(--credits-title-font);
  font-weight: 700;
  font-size: calc(var(--credits-flourish-title-size) * 0.9);
  letter-spacing: 0.05em;
  color: var(--voxel-xp-green);
  text-shadow: 0.1em 0.1em 0 rgba(34, 16, 66, 0.95), 0 0 30px rgba(140, 245, 84, 0.35);
}
.flourish--outro .flourish__tagline { font-size: 0; }
.flourish--outro .flourish__tagline::after {
  content: "sleep well";
  font-family: var(--credits-font);
  font-weight: 400;
  font-size: 1rem;
  letter-spacing: 0.34em;
  padding-left: 0.34em;
  text-transform: lowercase;
  color: rgba(203, 184, 239, 0.9);
}
.flourish--outro::after {
  content: "progress saved";
  display: var(--voxel-scenery, block);
  font-family: var(--credits-title-font);
  font-size: 0.58rem;
  letter-spacing: 0.3em;
  padding: 0.55em 0.7em 0.55em 1em;
  margin-top: 0.6rem;
  color: rgba(140, 245, 84, 0.85);
  border: 1px solid rgba(140, 245, 84, 0.45);
  text-transform: lowercase;
}

/* === raid finale: THE NIGHT RAID. Amber-hot title, red warning eyebrow
   blinking on steps(1) (~0.8 paints/s — the only animation inside the
   roll, well under the 2/s ceiling), XP bar slammed to 100% and glowing,
   names a step larger. Declared after the parity tints so it wins. === */
.credits-block:nth-last-of-type(2),
.credits-slide:nth-last-of-type(2):not(.flourish) {
  /* near-white title: the finale parks over the bright coral band, where
     an amber title would melt into the sky behind it */
  --voxel-title: #fff0d2;
  --voxel-xp: 100%;
}
.credits-block:nth-last-of-type(2) {
  background: radial-gradient(ellipse 55% 58% at 50% 38%, rgba(255, 110, 80, 0.12), rgba(255, 110, 80, 0) 74%);
}
.credits-slide:nth-last-of-type(2):not(.flourish) {
  background: radial-gradient(ellipse 62% 56% at 50% 46%, rgba(255, 110, 80, 0.11), rgba(255, 110, 80, 0) 80%);
}
.credits-block:nth-last-of-type(2) .credits-block__title,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title {
  text-shadow: 0.14em 0.14em 0 rgba(90, 20, 40, 0.95), 0 0 26px rgba(255, 170, 90, 0.45);
}
.credits-block:nth-last-of-type(2) .credits-block__title::before,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
  content: "! night raid incoming !";
  font-size: 0.62rem;
  font-weight: 700;
  color: #ff9284;
  text-shadow: 0 1px 6px rgba(40, 5, 12, 0.9), 0 0 14px rgba(255, 90, 70, 0.55);
  animation: voxel-raid 2.4s steps(1, end) infinite;
}
.credits-block:nth-last-of-type(2) .credits-block__title::after,
.credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::after {
  box-shadow: 0 2px 0 rgba(10, 5, 25, 0.6), inset 0 0 0 1px rgba(140, 245, 84, 0.35), 0 0 16px rgba(140, 245, 84, 0.45);
}
.credits-block:nth-last-of-type(2) .credit,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit {
  font-size: calc(var(--credits-name-size) * 1.08);
}
.credits-block:nth-last-of-type(2) .credit__name,
.credits-slide:nth-last-of-type(2):not(.flourish) .credit__name {
  text-shadow: 0 0 16px rgba(255, 190, 92, 0.35), var(--credits-shadow);
}

/* === slideshow: slides land like placed blocks — a small settle drop
   layered on the base fade === */
.credits-slide {
  transform: translateY(14px);
  transition: opacity 0.8s ease, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}
.credits-slide.is-active { transform: none; }

/* === keyframes (all voxel- prefixed; transform/opacity ONLY) === */
/* the float: 12px of lift and back, continuous (both cube layers share it
   at different durations/phases) */
@keyframes voxel-bob {
  0%   { transform: translate3d(0, 0, 0); }
  50%  { transform: translate3d(0, -12px, 0); }
  100% { transform: translate3d(0, 0, 0); }
}
/* the drifting cloud: fade in, five 64px teleport hops west (one / ~3s),
   fade out, leave the sky empty a while */
@keyframes voxel-drift {
  0%   { transform: translate3d(0, 0, 0); opacity: 0; }
  4%   { transform: translate3d(0, 0, 0); opacity: 0.75; }
  12%  { transform: translate3d(-64px, 0, 0); opacity: 0.75; }
  20%  { transform: translate3d(-128px, 0, 0); opacity: 0.75; }
  28%  { transform: translate3d(-192px, 0, 0); opacity: 0.75; }
  36%  { transform: translate3d(-256px, 0, 0); opacity: 0.75; }
  44%  { transform: translate3d(-320px, 0, 0); opacity: 0.75; }
  52%  { transform: translate3d(-320px, 0, 0); opacity: 0; }
  100% { transform: translate3d(-320px, 0, 0); opacity: 0; }
}
/* the torch: five held brightness levels over 9s — a flame settling in
   for the night, never a strobe */
@keyframes voxel-torch {
  0%   { opacity: 0.85; }
  18%  { opacity: 0.6; }
  40%  { opacity: 0.95; }
  62%  { opacity: 0.68; }
  82%  { opacity: 0.9; }
  100% { opacity: 0.85; }
}
/* raid warning: two discrete dips per 2.4s — a klaxon breathing, not a
   blink (~0.8 paints/s) */
@keyframes voxel-raid {
  0%, 55%   { opacity: 1; }
  60%, 72%  { opacity: 0.62; }
  78%, 100% { opacity: 1; }
}

/* === reduced motion: the world holds still at dusk — cubes park at
   their resting height (visible), the little cloud parks mid-sky, the
   torch burns steady, the raid warning stops blinking, slides fall back
   to the base fade. === */
@media (prefers-reduced-motion: reduce) {
  head::before,
  head::after { animation: none; }
  head meta:first-of-type::after {
    animation: none;
    opacity: 0.75;
    transform: translate3d(-192px, 0, 0);
  }
  head meta:last-of-type::before { animation: none; }
  .credits-block:nth-last-of-type(2) .credits-block__title::before,
  .credits-slide:nth-last-of-type(2):not(.flourish) .credits-block__title::before {
    animation: none;
  }
  .credits-slide { transform: none; transition: opacity 0.8s ease; }
}
`,
  transparentOverride: ":root{--credits-bg:transparent;--voxel-scenery:none;}",
};
