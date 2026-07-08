# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.0] - 2026-07-08

### Changed

- **All 38 themes visually overhauled.** Every look now has a richer scene, a protagonist with a
  living motion beat (Arcade's cabinet plays its attract demo, The Crew's flashlight pans the
  blueprint, Final Round's fighters trade blows, Quest Log's candle flickers, Victory Fanfare's
  slime pet hops…), and hardened name legibility over bright scenery. Theme ids, names, dropdown
  order, and the Classic Film default are unchanged — existing selections keep working.
- **Neon Night Drive rebuilt** as a full OutRun night-drive: rolling striped sun, silhouetted city
  and mountains, a hero coupe on a neon road grid, rushing palms, and twin lasers whose beams
  scissor independently while cycling complementary hues.
- **Three themes redesigned from scratch**: End of Broadcast (a 3 a.m. living room lit only by a
  console TV cycling test bars → PLEASE STAND BY → static), Corkboard (a fairy-lit polaroid memory
  wall at 1 a.m.), and Aurora (vast dancing aurora curtains over a lone silhouetted witness).
- **Signature moments**: Space Crawl recedes to a true vanishing point; Chequered Flag ends on a
  PODIUM FINISH card; Block Party's wall got real bubble-letter graffiti; The Abyss anglerfish
  swims one smooth early pass; Junglist's spectrum pumps like live audio.
- **Accessibility & performance**: `prefers-reduced-motion` now reliably parks every animation,
  and all motion stays compositor-friendly for OBS browser sources at 60fps.
- **THEMES.md** re-shot for every theme, with scene descriptions rewritten to match.

### Added

- **`npm run gen:presets`** — regenerates `src/view/themes/presets.ts` deterministically from the
  theme lab (`prototype/variants/*`), with a drift guard. Contributor-facing; no runtime change.
- **Preview-harness params panel** (prototype) — the ⚙ button / `S` key opens a modal with a theme
  dropdown and every preview lever (mode, speed, jump, slide, bg check, custom CSS…).

## [0.3.0] - 2026-07-03

### Added

- **38 built-in credits themes**, selectable from a new **Theme** startup-script dropdown — no rebuilding. They span cinematic/classic (Classic Film, Space Crawl, Mission Control, Broadway Playbill, Quest Log), retro/synth/terminal (Neon Night Drive, VHS Home Video, Phosphor Terminal, Arcade High Score, Dot Matrix), music/DJ (Roller Disco with a choreographed seven-skater ensemble, On Deck, Warehouse Rave, Deep House (33⅓), Junglist, Block Party, Mainstage, Sunrise Set, Blue Note), gaming (Final Round, Victory Fanfare, Personal Best, Blocklight, Grand Finals, Chequered Flag), cyber/CTF (Digital Rain, Netrunner, Capture the Flag), sci-fi (Close Encounter, The Abyss, Aurora), and cozy/scene looks (Lo-Fi Room, Blue Plate Diner, Corkboard, The Crew, End of Broadcast, Neo-Noir, Silver Nocturne). Each is a self-contained CSS look tuned for OBS's Chromium browser source at 60fps. **Classic Film** stays the default. Browse the whole gallery — with intro/outro screenshots — in [`THEMES.md`](THEMES.md).
- **🎲 Random / Shuffle** theme option — rolls a different (non-default) theme each time the credits view loads, so every stream-end roll can look different.

### Changed

- **Custom CSS now layers *on top of* the selected theme** (it still always wins), so any built-in theme can be tweaked without rebuilding. Any `@import` rule in a theme or your Custom CSS (e.g. a Google Fonts import) is hoisted to the top of the served stylesheet, so imported fonts load instead of being silently dropped.
- **Smoother, judder-free scroll crawl** — the crawl is now snapped to whole device pixels and composited on its own layer, removing the shimmer/stutter that fine details (scanlines, ruled rows, pixel fonts) could show even at a steady frame rate.
- **Default scroll speed is now 60 px/s** (was 70) — exactly one pixel per frame on a 60 Hz display; multiples of your display's refresh rate (60, 120) give the smoothest crawl. The Scroll Speed param is otherwise unchanged.
- The credits **theme stylesheet is now served with `Cache-Control: no-store`**, so changing the Theme param — and the Random option's per-load re-roll — takes effect on the next credits view load without stale caching.
- **Docs:** the README and `docs/INSTALL.md` now cover picking a theme and theme/Custom CSS layering, and a new [`THEMES.md`](THEMES.md) gallery documents all 38 themes with intro/outro screenshots.

## [0.2.0] - 2026-07-01

### Added

- Added a **Watch Streaks** credit type ("streakers"): viewers who share a Twitch watch streak are credited with their streak count, sorted longest-first, with a 🔥 section in the Discord gratitude post. The credits crescendo now closes on New Followers just before the raid finale.
- Importable preset now ships a **Stream Credits** Event Set that wires every credit-capture event — follow, sub, cheer, raid, watch streak, mod/VIP (by role filter), and both gift-sub events — clears the store at stream start, and starts the credits roll on an outgoing raid. Gifted-sub counts stay accurate because Firebot's **Ignore Related Gift Sub Events** setting (`IgnoreSubsequentSubEventsAfterCommunitySub`) is on by default; `docs/INSTALL.md` notes it.

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

[Unreleased]: https://github.com/goproslowyo/firebot-stream-end-gratitude-farewells-credits/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/goproslowyo/firebot-stream-end-gratitude-farewells-credits/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/goproslowyo/firebot-stream-end-gratitude-farewells-credits/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/goproslowyo/firebot-stream-end-gratitude-farewells-credits/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/goproslowyo/firebot-stream-end-gratitude-farewells-credits/releases/tag/v0.1.0
