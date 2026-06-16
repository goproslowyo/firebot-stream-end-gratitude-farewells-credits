/**
 * Themeable stylesheet for the credits view, served on the `theme.css` custom route so
 * users can restyle without rebuilding the bundle. Override behaviour two ways:
 *
 * 1. **CSS custom properties** (easiest) — redefine any `--credits-*` variable below (colours, fonts,
 *    sizes, the block/name spacing, and the `--credits-glow` / `--credits-shadow` text effects).
 * 2. **Selectors** — target `.credits-roll`, `.credits-block`, `.credits-block__title`,
 *    `.credits-block__list`, `.credit`, `.credit__name`, `.credit__amount`, the slideshow elements
 *    `.credits-slideshow` / `.credits-slide` / `.credits-slide.is-active`, and the film **flourish
 *    cards** `.flourish` / `.flourish--intro` / `.flourish--outro` / `.flourish__badge` /
 *    `.flourish__title` / `.flourish__tagline` / `.flourish__rating`.
 *
 * Put overrides in the script's **Custom CSS** parameter; they are appended after the base so they
 * win. Background defaults to transparent for OBS browser sources.
 */
export const BASE_THEME_CSS = `:root {
  color-scheme: dark;
  --credits-bg: transparent;
  --credits-color: #ffffff;
  --credits-accent: #f5c518;
  --credits-font: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --credits-title-font: "Playfair Display", Georgia, "Times New Roman", serif;
  --credits-title-size: clamp(1.5rem, 5vw, 3rem);
  --credits-name-size: clamp(1rem, 3vw, 1.75rem);
  --credits-flourish-title-size: clamp(2.5rem, 9vw, 5.5rem);
  --credits-block-gap: 4.5rem;
  --credits-name-gap: 0.6rem;
  --credits-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
  --credits-glow: 0 0 24px rgba(245, 197, 24, 0.4);
}

html,
body {
  margin: 0;
  height: 100%;
  overflow: hidden;
  background: var(--credits-bg);
  color: var(--credits-color);
  font-family: var(--credits-font);
  text-align: center;
  text-shadow: var(--credits-shadow);
  /* Cinematic edge fade so names ease in at the bottom and out at the top. */
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 11%, #000 89%, transparent 100%);
  mask-image: linear-gradient(to bottom, transparent 0%, #000 11%, #000 89%, transparent 100%);
}

.credits-block__title {
  font-family: var(--credits-title-font);
  font-size: var(--credits-title-size);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--credits-accent);
  text-shadow: var(--credits-glow), var(--credits-shadow);
  margin: 0 0 1.25rem;
}

/* A short gold rule under each section title — a small piece of flair. */
.credits-block__title::after {
  content: "";
  display: block;
  width: 2.75rem;
  height: 2px;
  margin: 0.65rem auto 0;
  background: var(--credits-accent);
  opacity: 0.65;
}

.credits-block__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--credits-name-gap);
}

.credit {
  font-size: var(--credits-name-size);
  letter-spacing: 0.03em;
  line-height: 1.55;
}

.credit__amount {
  opacity: 0.7;
}

.credit__amount::before {
  content: " · ";
}

/* Scroll mode: a vertical crawl that starts below the viewport. */
.credits-roll {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--credits-block-gap);
  padding: 4.5rem 1rem;
}

/* Slideshow mode: one block per page, only the active slide is shown. */
.credits-slideshow {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.credits-slide {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 3rem 1.5rem;
  opacity: 0;
  transition: opacity 0.8s ease;
}

.credits-slide.is-active {
  opacity: 1;
}

/* Film flourish cards: studio-ident intro + "The End" outro, drawn in code. */
.flourish {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  padding: 3.5rem 1.5rem;
}

.flourish__badge {
  font-size: 0.9rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--credits-accent);
  border: 2px solid var(--credits-accent);
  border-radius: 999px;
  padding: 0.4rem 1.35rem;
  box-shadow: var(--credits-glow);
}

.flourish__title {
  font-family: var(--credits-title-font);
  font-size: var(--credits-flourish-title-size);
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-shadow: var(--credits-glow), var(--credits-shadow);
  margin: 0;
}

.flourish__tagline {
  font-style: italic;
  font-size: 1.1rem;
  opacity: 0.85;
  margin: 0;
}

.flourish__rating {
  font-size: 0.85rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  border: 1px solid currentColor;
  border-radius: 0.25rem;
  padding: 0.3rem 0.75rem;
  opacity: 0.8;
}
`;

/** Compose the served stylesheet: base first, then user Custom CSS so overrides win. */
export function buildThemeCss(customCss: string): string {
  const custom = customCss.trim();
  return custom.length > 0
    ? `${BASE_THEME_CSS}\n/* --- Custom CSS --- */\n${custom}\n`
    : BASE_THEME_CSS;
}
