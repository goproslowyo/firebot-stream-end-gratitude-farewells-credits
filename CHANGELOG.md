# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-06-16

First public release.

### Added

- **Credit store** with **Register Event** (automatic from Firebot event metadata, and manual),
  **Generate Credits**, and **Clear Credits** effects; built-in and custom credit types.
- **Credits view** served over Firebot's embedded web server for OBS as a **URL browser source**
  (works across a split host); **scroll** and **slideshow** modes; a live `/view` preview that
  re-renders the current credit store on each request.
- **Film-style credits** — in-code flourish cards (studio-ident intro, "The End" outro), film
  typography; configurable title/tagline; **tunable scroll speed and slideshow timing** via script
  params; fully themeable via a **Custom CSS** param.
- **Credits Ended** custom event for auto-hiding the source when the roll finishes.
- **`$gratitudeSummary`** replace variable: per-type counts, top-N names, or a rich Discord post with
  emoji sections and amounts — including an `all` cap to thank everyone with no truncation.
- Deliberate **gratitude crescendo** ordering shared by the credits view and the Discord post.
- Importable **`stream-end-sequence.firebotsetup`** with two presets: the live sequence and an
  **OFFLINE Test** (no Discord, no farewell) for safe testing.
- End-user **install guide** (`docs/INSTALL.md`) and GitHub Actions for **CI** and **tagged
  releases** (which attach the bundled `.js` and the `.firebotsetup`).

[Unreleased]: https://github.com/goproslowyo/firebot-stream-end-gratitude-farewells-credits/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/goproslowyo/firebot-stream-end-gratitude-farewells-credits/releases/tag/v0.1.0
