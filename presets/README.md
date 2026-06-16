# Example Firebot Setup — stream-end sequence

`stream-end-sequence.firebotsetup` is an importable [Firebot **Setup**](https://firebot.app) that
scaffolds the full **stream-end sequence** for this script, so you don't have to assemble it by hand.

## What it imports

- **Stream End Sequence** — the live preset effect list, in order:
  1. `Stream Credits: Generate Credits` (scroll) → outputs the credits URL
  2. `Set OBS Browser Source URL` → `$effectOutput[creditsUrl]`
  3. `Change Scene` → your ending/credits scene (**reveal**)
  4. `Send Discord Message` → body `$gratitudeSummary[discord]` (the **gratitude post**)
  5. `Show HTML` on a dedicated overlay instance (the **farewell**)
- **Stream End Sequence (OFFLINE Test)** — the same credits reveal with **no Discord message and no
  farewell**, pre-loaded with sample credits. Run it to test safely without going live or posting to
  a Discord server.
- A **Credits Ended** event handler that `Change Scene`s back when the roll finishes (auto-return).

## Import it

1. Install + enable the script first (see [docs/INSTALL.md](../docs/INSTALL.md)) — the setup
   references effects/events this script registers (`stream-end-credits:*`).
2. Firebot ▸ **Settings ▸ General ▸ Import a Setup** (or the **Setups** area) and pick this file.
3. Firebot asks a few questions; the defaults match the install guide:
   - **Credits browser source name** (default `Credits`)
   - **Ending/credits scene** (default `Ending Credits Roll`)
   - **Return scene** after credits finish (default `Starting Soon`)
   - **Farewell overlay instance** (default `farewell`)

   > The OBS scene/source fields are also **live dropdowns inside each effect** — after import you can
   > pick them there instead (Firebot's import prompts can only be typed text, not live lists). The
   > **Discord channel** is always picked from its dropdown (see below).

## Test first (safely)

Run **Stream End Sequence (OFFLINE Test)** to verify the credits roll in OBS. It uses sample credits
and leaves out the Discord post and farewell, so you can run it repeatedly without going live.

> ⚠️ The live **Stream End Sequence** posts to your Discord channel every time it runs — don't use it
> for testing. Use the OFFLINE Test preset.

## Finish wiring (not auto-filled)

- **Discord:** open the imported *Send Discord Message* effect and **select your channel** (the body
  is already `$gratitudeSummary[discord]`).
- **Farewell:** replace the placeholder *Show HTML* content with your own; create the `farewell`
  overlay instance in **Settings ▸ Overlay** (see [docs/INSTALL.md](../docs/INSTALL.md)). Until it
  exists the farewell shows on your default overlay.

This is a **generic example** — adapt it freely. It's a separate artifact from the bundled script
`.js`, so it does not affect the single-bundle install.
