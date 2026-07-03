/**
 * PROTOTYPE — throwaway theme-variant contract for the local preview harness.
 * Winners get rewritten properly under src/view/themes/ (stage 2); see prototype/NOTES.md.
 */
export interface ThemeVariant {
  /** URL key used in `?variant=`. */
  key: string;
  /** Display name shown in the switcher bar. */
  name: string;
  /**
   * CSS layered after BASE_THEME_CSS. `@import` lines may appear anywhere in this
   * string — the harness hoists them to the top of the composed sheet so they take
   * effect (CSSOM ignores non-leading @import).
   */
  css: string;
  /**
   * The theme's documented one-line transparent-collapse override (what a streamer
   * would paste to run this theme over their own OBS scene). Applied by the harness
   * when the background-check (B) is on, together with a checkerboard layer.
   */
  transparentOverride?: string;
}
