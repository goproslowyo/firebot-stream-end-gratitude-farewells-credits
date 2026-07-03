import { BASE_THEME_CSS, buildThemeCss } from "./theme";

describe("theme css", () => {
  it("exposes themeable CSS custom properties in the base stylesheet", () => {
    expect(BASE_THEME_CSS).toContain("--credits-bg");
    expect(BASE_THEME_CSS).toContain("--credits-color");
    expect(BASE_THEME_CSS).toContain("--credits-font");
  });

  it("returns just the base stylesheet when there is no preset or custom css", () => {
    const css = buildThemeCss("", "");
    expect(css).toContain(".credits-roll");
    expect(css).not.toContain("Theme preset");
    expect(css).not.toContain("Custom CSS");
  });

  it("layers base < preset < custom so each later layer overrides", () => {
    const preset = ".credit { color: rebeccapurple; }";
    const custom = ".credit { color: hotpink; }";
    const css = buildThemeCss(preset, custom);
    const iBase = css.indexOf("--credits-bg");
    const iPreset = css.indexOf(preset);
    const iCustom = css.indexOf(custom);
    expect(iBase).toBeGreaterThanOrEqual(0);
    expect(iBase).toBeLessThan(iPreset);
    expect(iPreset).toBeLessThan(iCustom);
  });

  it("hoists @import rules (from preset and custom) above the base rules", () => {
    const preset =
      "@import url('https://fonts.googleapis.com/css2?family=Foo:wght@400;700');\n.credit{color:red}";
    const custom =
      "@import url('https://fonts.googleapis.com/css2?family=Bar');\n.credit{color:blue}";
    const css = buildThemeCss(preset, custom);
    // Both imports appear before the base, and before any non-import rule.
    const iFoo = css.indexOf("family=Foo");
    const iBar = css.indexOf("family=Bar");
    const iBase = css.indexOf("--credits-bg");
    expect(iFoo).toBeGreaterThanOrEqual(0);
    expect(iBar).toBeGreaterThanOrEqual(0);
    expect(iFoo).toBeLessThan(iBase);
    expect(iBar).toBeLessThan(iBase);
    // The full Google-Fonts URL (with its internal semicolons) survives hoisting intact.
    expect(css).toContain("family=Foo:wght@400;700");
    // The import lines are lifted out of the layered bodies (no stray @import mid-sheet).
    expect(css.slice(iBase)).not.toContain("@import");
  });
});
