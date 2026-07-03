import {
  DEFAULT_THEME_ID,
  RANDOM_THEME_NAME,
  THEME_OPTION_NAMES,
  THEME_PRESETS,
  isRandomTheme,
  pickRandomTheme,
  resolveTheme,
} from "./index";

describe("theme presets registry", () => {
  it("ships a substantial set of presets with the classic-film default first", () => {
    expect(THEME_PRESETS.length).toBeGreaterThanOrEqual(30);
    expect(THEME_PRESETS[0].id).toBe(DEFAULT_THEME_ID);
    // The default (Classic Film) is the empty layer — today's look, byte-for-byte.
    expect(THEME_PRESETS.find((p) => p.id === DEFAULT_THEME_ID)?.css).toBe("");
  });

  it("has unique ids and unique display names", () => {
    const ids = THEME_PRESETS.map((p) => p.id);
    const names = THEME_PRESETS.map((p) => p.name);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(names).size).toBe(names.length);
  });

  it("offers every preset name plus Random as dropdown options, Random near the top", () => {
    for (const p of THEME_PRESETS) {
      expect(THEME_OPTION_NAMES).toContain(p.name);
    }
    expect(THEME_OPTION_NAMES).toContain(RANDOM_THEME_NAME);
    expect(THEME_OPTION_NAMES[0]).toBe(THEME_PRESETS[0].name); // Classic Film first
    expect(THEME_OPTION_NAMES[1]).toBe(RANDOM_THEME_NAME); // then Random
    expect(THEME_OPTION_NAMES.length).toBe(THEME_PRESETS.length + 1);
  });

  it("resolves by display name, by id, and falls back to the default", () => {
    const preset = THEME_PRESETS.find((p) => p.id !== DEFAULT_THEME_ID);
    if (!preset) {
      throw new Error("expected at least one non-default preset");
    }
    expect(resolveTheme(preset.name).id).toBe(preset.id);
    expect(resolveTheme(preset.id).id).toBe(preset.id);
    expect(resolveTheme(`  ${preset.name}  `).id).toBe(preset.id); // trims
    expect(resolveTheme(undefined).id).toBe(DEFAULT_THEME_ID);
    expect(resolveTheme("").id).toBe(DEFAULT_THEME_ID);
    expect(resolveTheme("no such theme").id).toBe(DEFAULT_THEME_ID);
  });

  it("recognises the Random sentinel and picks a styled (non-default) theme for it", () => {
    expect(isRandomTheme(RANDOM_THEME_NAME)).toBe(true);
    expect(isRandomTheme("Classic Film")).toBe(false);
    expect(isRandomTheme(undefined)).toBe(false);
    for (let i = 0; i < 50; i++) {
      expect(pickRandomTheme().id).not.toBe(DEFAULT_THEME_ID);
    }
  });
});
