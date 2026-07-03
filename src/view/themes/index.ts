/**
 * Built-in credits **themes**. A theme is a stylesheet that layers AFTER `BASE_THEME_CSS`
 * (see {@link buildThemeCss}); the user picks one from the **Theme** startup-script dropdown.
 * Presets are generated in {@link ./presets} from the prototype theme lab. `Classic Film`
 * (id `base`) is the empty layer — today's default look.
 */
import { RAW_PRESETS } from "./presets";

/** One selectable theme. `css` layers after the base; `id` is the stable slug, `name` the label. */
export interface ThemePreset {
  id: string;
  name: string;
  css: string;
}

/** The default theme id — the plain "Classic Film" look (empty CSS layer). */
export const DEFAULT_THEME_ID = "base";

/** Dropdown label for the shuffle option (a different real theme each roll). */
export const RANDOM_THEME_NAME = "🎲 Random / Shuffle";

/** All built-in theme presets, in dropdown order (Classic Film first). */
export const THEME_PRESETS: ReadonlyArray<ThemePreset> = RAW_PRESETS;

/**
 * The enum options for the Theme param: Classic Film first, then Random (so shuffle is easy
 * to find), then every other preset. Firebot enum options are bare strings, so the stored
 * parameter value IS the display name — {@link resolveTheme} maps it back (by name or id).
 */
export const THEME_OPTION_NAMES: readonly string[] = [
  THEME_PRESETS[0].name,
  RANDOM_THEME_NAME,
  ...THEME_PRESETS.slice(1).map((p) => p.name),
];

const DEFAULT_PRESET = THEME_PRESETS.find((p) => p.id === DEFAULT_THEME_ID) ?? THEME_PRESETS[0];

/** True if the saved value is the shuffle sentinel. */
export function isRandomTheme(value: string | undefined): boolean {
  return (value ?? "").trim() === RANDOM_THEME_NAME;
}

/**
 * Resolve a saved parameter value to a concrete preset. Matches by display **name** first
 * (what Firebot stores) then by **id** (resilient to a future display-name rename), and falls
 * back to the default so a stale/blank/unknown value never yields a broken view. Does NOT
 * resolve the Random sentinel — use {@link pickRandomTheme} for that.
 */
export function resolveTheme(value: string | undefined): ThemePreset {
  const v = (value ?? "").trim();
  if (v.length === 0) {
    return DEFAULT_PRESET;
  }
  return (
    THEME_PRESETS.find((p) => p.name === v) ??
    THEME_PRESETS.find((p) => p.id === v) ??
    DEFAULT_PRESET
  );
}

/** Pick a random *styled* preset (never the plain Classic Film base) — for the shuffle option. */
export function pickRandomTheme(): ThemePreset {
  const styled = THEME_PRESETS.filter((p) => p.id !== DEFAULT_THEME_ID);
  const pool = styled.length > 0 ? styled : THEME_PRESETS;
  return pool[Math.floor(Math.random() * pool.length)];
}
