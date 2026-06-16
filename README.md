# firebot-stream-end-gratitude-farewells-credits

Firebot custom script (TypeScript) for the **stream-end sequence**: rolling end-credits served
over Firebot's embedded web server (consumed by OBS as a **URL browser source**), a **farewell**
on a dedicated Firebot **overlay instance**, and a **Discord gratitude** post via Firebot's
built-in *Send Discord Message* effect.

Firebot and OBS run on separate machines here, which is why credits are delivered by URL rather
than a local file.

> Status: feature-complete (credits engine, view, server, Credits Ended event, gratitude variable,
> film-look credits, tunable timing, importable preset). Remaining work is live verification on a
> real two-machine + Discord setup.

## Develop

```
npm install
npm run typecheck   # tsc --noEmit
npm test            # jest
npm run lint        # biome
npm run build       # bundles to dist/firebot-stream-end-credits.js
```

## Install into Firebot

Build (or download) the bundled `.js` into your Firebot scripts folder (File > Open Data Folder >
`scripts`), then Settings > Scripts > Manage Startup Scripts > Add New Script, and restart Firebot.
Full split-host setup, theming, timing params, and the stream-end automation: see
[`docs/INSTALL.md`](docs/INSTALL.md). To import the ready-made stream-end sequence instead of
building it by hand, see [`presets/`](presets/).

## License

GPL-3.0 — see `LICENSE`.
