import { BASE_THEME_CSS, buildThemeCss } from "./theme";

describe("theme css", () => {
  it("exposes themeable CSS custom properties in the base stylesheet", () => {
    expect(BASE_THEME_CSS).toContain("--credits-bg");
    expect(BASE_THEME_CSS).toContain("--credits-color");
    expect(BASE_THEME_CSS).toContain("--credits-font");
  });

  it("returns the base stylesheet when there is no custom css", () => {
    expect(buildThemeCss("")).toContain(".credits-roll");
  });

  it("appends custom css after the base so it can override", () => {
    const custom = ".credit { color: hotpink; }";
    const css = buildThemeCss(custom);
    expect(css.indexOf("--credits-bg")).toBeLessThan(css.indexOf(custom));
    expect(css).toContain(custom);
  });
});
