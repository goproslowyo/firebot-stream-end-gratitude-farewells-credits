# Installing Stream-End Credits

A complete, front-to-back guide to set up the stream-end credits sequence: install the script, import
the ready-made effects, connect it to OBS, and roll your first credits. No coding needed, and you can
test the whole thing safely without going live.

There are **two files** in each release:

- **`firebot-stream-end-credits.js`** — the script (the engine). Installs into Firebot.
- **`stream-end-sequence.firebotsetup`** — a ready-made **Setup** you import into Firebot. It builds
  the whole end-of-stream sequence for you (plus a safe offline test), so you don't have to wire it
  by hand.

---

## Before you start

Have these ready first — the sequence relies on them:

- **Firebot 5.65 or newer**, installed and connected to your Twitch account, on your **streaming
  machine** (the guide calls it your "laptop").
- **OBS on a separate machine**, with **Firebot connected to OBS** (via OBS WebSocket — Firebot ▸
  Settings ▸ Integrations / Setup). Firebot needs this connection to change scenes and set the
  credits browser source. *(If OBS is on the same machine as Firebot, that's fine too — use
  `localhost` wherever the guide says to use your laptop's IP.)*
- **Both machines on the same home network.**
- **(Optional, for the Discord thank-you)** Firebot's **Discord integration** set up — the same
  channel/webhook you use for go-live posts. Skip this if you don't want the Discord message.

---

## 1. Get the files

From the project's **Releases**, download both:

- `firebot-stream-end-credits.js`
- `stream-end-sequence.firebotsetup`

<details>
<summary>Building from source (developers only)</summary>

From the project root run `npm install` then `npm run build`. The script is written to
`dist/firebot-stream-end-credits.js`; the setup file lives at `presets/stream-end-sequence.firebotsetup`.
</details>

## 2. Install the script (on the laptop)

1. In Firebot: **File ▸ Open Data Folder**, then open the **`scripts`** subfolder.
2. Copy **`firebot-stream-end-credits.js`** into that `scripts` folder.
3. In Firebot: **Settings ▸ Scripts**, and turn on **Custom Scripts** (accept the security warning).
4. Still under **Settings ▸ Scripts ▸ Startup Scripts**, click **Add New Script**, choose
   `firebot-stream-end-credits.js`, and set the options:
   - **Enabled** — the master on/off switch (leave it on).
   - **Web Server Host** — your laptop's **IP address on your home network** (e.g. `192.168.1.50`),
     so OBS on the other machine can reach it. Leave it as `localhost` **only** if OBS is on the same
     machine. (Not sure of your IP? It's in your computer's Wi-Fi/network settings.)
   - Leave the rest at their defaults for now (look and speed are covered in step 9).
5. **Restart Firebot** so the script loads.

<details>
<summary>Optional: confirm it loaded</summary>

If something seems off later, open Firebot's log (the scrolling text in the Firebot window) and look
for a line like `[stream-end-credits] ... loaded (enabled=true)`.
</details>

## 3. Open the firewall (on the laptop)

So OBS on the other machine can reach Firebot:

- Allow **incoming connections on port 7472 (TCP)** through the laptop's firewall.
- **Home network only** — never open port 7472 to the public internet.
- Give the laptop a **fixed IP address** (a "reserved"/"static" lease in your router, or a stable
  computer name) so the address doesn't change and break the OBS link.

## 4. Check that OBS can reach Firebot

This quick check saves a lot of headaches — do it before anything else.

1. **On the OBS machine**, open a web browser and go to:
   `http://<your-laptop-IP>:7472/integrations/stream-end-credits/view`
   (use the IP from step 2, e.g. `http://192.168.1.50:7472/...`).
2. You should see a credits page. It's empty until you add credits — that's expected.

If the page loads, networking is good. If it **doesn't**, fix that first: re-check the firewall
(step 3) and that **Web Server Host** is your laptop's IP, not `localhost`. *(The same link with
`localhost` always works in a browser on the laptop itself — handy for previewing.)*

## 5. Set up OBS (browser source + a credits scene)

On the **OBS machine**:

1. Add a **Browser Source** — name it something like **`Credits`**.
   - The URL can be anything for now (the script replaces it on each roll). Size it to your canvas
     (e.g. 1920×1080). The background is transparent.
   - ✅ Turn on **"Shutdown source when not visible"** (important — it makes the credits start from
     the top exactly when shown, and ensures the finish is detected correctly).
   - ✅ Turn on **"Refresh browser when scene becomes active"**.
2. Create a **scene** to show the credits on (e.g. **`Ending Credits Roll`**) and put the `Credits`
   browser source in it. Note the **exact name** — you'll enter it when you import the setup.
3. Note the name of the scene you'll return to afterward (e.g. your "Starting Soon" / outro scene).

## 6. Import the stream-end setup

1. In Firebot: **Settings ▸ General ▸ Import a Setup** (or the **Setups** area), and choose
   **`stream-end-sequence.firebotsetup`**.
2. Firebot asks a few questions. The **defaults match the names from step 5**, so if you used those
   you can just accept them:
   - **Credits browser source name** (default `Credits`)
   - **Ending/credits scene** (default `Ending Credits Roll`)
   - **Return scene** after credits finish (default `Starting Soon`)
   - **Farewell overlay instance** (default `farewell` — only used by the live sequence)

> **Prefer to pick from a list?** Those same fields are **live dropdowns inside each effect**. After
> importing, open a preset and you can choose your scene and browser source from dropdowns populated
> by your connected OBS — the import answers just pre-fill them. (Firebot's import questions can only
> be typed text, so they can't show your OBS list during import — but the effects can, afterward.)
> The **Discord channel** isn't asked during import at all; you always pick it from its dropdown
> (step 8).

This creates two **preset effect lists** and one event handler:

- **Stream End Sequence** — the live sequence: Generate credits → set the OBS browser source URL →
  change to the credits scene → post the Discord thank-you → show the farewell.
- **Stream End Sequence (OFFLINE Test)** — the same credits reveal, but with **no Discord message and
  no farewell**, pre-loaded with sample credits. Safe to run anytime.
- **Credits Ended → switch back** — when the roll finishes, Firebot returns to your return scene.

## 7. Test it safely (offline, no Discord)

Run the **Stream End Sequence (OFFLINE Test)** preset (Preset Effect Lists ▸ run it).

- It clears the list, adds a few sample names, generates the credits, points your `Credits` source at
  them, and switches to your credits scene — then switches back when the roll ends.
- It does **not** post to Discord and does **not** show the farewell, so you can run it as many times
  as you like without going live or cluttering a Discord server.

> ⚠️ **Don't use the live "Stream End Sequence" to test** — it posts the thank-you to your real
> Discord channel every time you run it. Use the OFFLINE Test preset until you're ready for air.

If the credits roll in OBS and it switches back on its own, you're set.

## 8. Finish wiring the live sequence

Before your first real stream end, open the **Stream End Sequence** preset and finish two things the
import can't fill in for you:

- **Discord channel** — open the *Send Discord Message* effect and **select your channel** (the body
  is already `$gratitudeSummary[discord]`). Remove this effect if you don't want a Discord post.
- **Farewell** — replace the placeholder *Show HTML* content with your own goodbye. For best results,
  create a dedicated **overlay instance** named `farewell` (Firebot ▸ Settings ▸ Overlay) and a
  matching OBS browser source for it. Until that instance exists, the farewell shows on your default
  overlay. Remove the *Show HTML* effect if you don't want a farewell.

## 9. Change the look and speed (no rebuilding)

**Colours and fonts** — in **Settings ▸ Scripts ▸ Startup Scripts**, edit the script's **Custom CSS**
option, for example:

```css
:root { --credits-color: #ffd54a; --credits-font: "Comic Sans MS", cursive; }
.credits-block__title { text-transform: uppercase; }
```

Save, then refresh the credits page — the new styling applies right away.

**Speed** — Custom CSS can't change timing, so two more options handle that:

- **Scroll Speed (pixels/sec)** — how fast the crawl moves. Default **70**. Lower is slower and
  easier to read; higher is faster.
- **Slideshow Time Per Slide (seconds)** — how long each slide stays up (slideshow mode). Default
  **5**.

Edit either, save, and run the credits again — the next roll uses the new speed.

> Two display modes: the credits **scroll** by default (the movie crawl). Set Generate Credits to
> **slideshow** to page through one section at a time instead.

## 10. The Discord thank-you message

The live sequence uses **`$gratitudeSummary[discord]`** — a warm, ready-to-post message with an emoji
section per type and the amounts (e.g. `🎁 **Gift subs:** **gail** (20 subs)`, `🚀 **Raids:** **boss**
(412 viewers)`). You can use `$gratitudeSummary` other ways in any text box:

- `$gratitudeSummary` → counts only, e.g. `Followers: 1, Subscribers: 1, Cheers: 1`
- `$gratitudeSummary[names]` → top-5 names per type
- `$gratitudeSummary[names, 3]` → cap each list at 3, adding `…and X more`
- `$gratitudeSummary[discord, 3]` → the Discord message, each section capped at 3
- `$gratitudeSummary[discord, all]` → **thank everyone** — no cap, no `…and X more` (also works as
  `$gratitudeSummary[names, all]`)

> Remember: anywhere the **Send Discord Message** effect runs, it posts **for real**. Test with the
> OFFLINE preset (step 7), which leaves Discord out.

## 11. Collecting credits automatically during the stream

> **Shortcut:** the importable preset now includes a **Stream Credits** Event Set that wires every event below for you (including the role-filtered mod/VIP capture and the gift-sub setup) — import it and you can skip the manual steps in this section. The table below remains as reference and for anyone wiring events by hand.

So the credits fill themselves in, attach **Stream Credits: Register Event** to the Firebot events
you want to thank, and pick the matching **Credit Type** on each. The effect reads the name (and
amount, where it applies) from the event automatically.

| Firebot event | Register Event → Credit Type |
|---|---|
| Follow | `follow` |
| Sub | `sub` |
| Community Subs Gifted | `gift-sub` |
| Sub Gifted | `gift-sub` *(enable the setting below)* |
| Cheer | `cheer` |
| Incoming Raid | `raid` |
| Watch Streak | `watch-streak` |
| Viewer Arrived (role = Moderator) | `mod` |
| Viewer Arrived (role = VIP) | `vip` |

Want only milestone streaks (e.g. ≥5)? Add Firebot's built-in **Watch Streak Count** event filter to the Watch Streak event — the script credits whoever the event reports, so the filter controls who qualifies.

Also attach **Stream Credits: Clear Credits** to your **Stream Online** event, so each stream starts
with an empty list.

### Thanking mods & VIPs (by role, not by event)

There's no event for your *existing* mods/VIPs, so credit them by role:

- **Automatic:** attach **Register Event** to the **Viewer Arrived** event, limited to the role —
  either with the event's **Filters** (a Twitch-role filter for *Moderator* / *VIP*), or a
  **Conditional Effects** effect that checks the viewer's role. Use two: Moderator → `mod`, VIP →
  `vip`.
  - ⚠️ Register Event credits **whoever triggers it** — it doesn't check the role itself. The role
    limit *must* come from the filter/conditional, or **every** arriving viewer becomes a `mod`.
- **Manual (simplest):** drop **Register Event (Manual)** effects (type `mod`/`vip` + usernames) into
  a command you run at stream start. Best for a small fixed team.

> **Accurate gift-sub counts:** the Stream Credits set wires **both** Community Subs Gifted and Sub Gifted to `gift-sub`. This stays accurate because Firebot's **Settings ▸ Triggers ▸ "Ignore Related Gift Sub Events"** (`IgnoreSubsequentSubEventsAfterCommunitySub`) is **on by default** — it suppresses the per-recipient Gift Sub events that belong to a community bundle, so each gifter is credited exactly once (bulk, single-to-community, or a sub gifted directly to one person). Just don't turn that setting off.

## 12. Running it at the end of your stream

Trigger the **Stream End Sequence** preset when you wrap up — most people run it from their
**outgoing raid** event (the one that fires when **you** raid someone, not when someone raids you):

1. Create an Event on the outgoing-raid event.
2. Give it one effect: **Run Preset Effect List → Stream End Sequence**.

That's the whole loop: you raid out → credits roll in OBS → the thank-you posts to Discord → the
farewell shows → Credits Ended switches you back. (The raid event fires the moment you start the
raid, so the credits roll during Twitch's ~90-second raid countdown.)

<details>
<summary>Building the sequence by hand (instead of importing)</summary>

If you'd rather not import the setup, build the live list yourself, in order:

1. **Generate Credits** (scroll or slideshow).
2. **OBS: Set OBS Browser Source URL** — target your `Credits` source, URL `$effectOutput[creditsUrl]`.
3. **OBS: Change Scene** → your credits scene (or **Toggle Source Visibility → Show** the `Credits`
   source if you don't use a dedicated scene).
4. *(optional)* **Send Discord Message** with `$gratitudeSummary[discord]`.
5. *(optional)* **Show HTML** for the farewell on a dedicated overlay instance.

Then add an Event on **Stream-End Credits ▸ Credits Ended** that does the opposite of step 3 (Change
Scene back, or Toggle Source Visibility → Hide).
</details>

---

## Troubleshooting

| Problem | Check |
|---|---|
| The effects aren't in Firebot | Custom Scripts turned on? Added as a **Startup** script? Firebot **restarted**? |
| The preview link works on the laptop but not from OBS | Firewall port 7472 open; **Web Server Host** set to the laptop's IP (not `localhost`). |
| OBS source is blank | The browser source is a **URL** (not a local file); refresh it; the address uses the laptop's IP. |
| Scene won't change / URL won't set | Firebot must be **connected to OBS** (OBS WebSocket). Check Firebot ▸ Settings ▸ Integrations. |
| Credits page is empty | Add credits **before** Generate; types with no credits show nothing. |
| Old credits after a new roll | Use the **new** per-roll link, or turn on OBS "Refresh browser when scene becomes active". |
| Credits Ended never fires | The finish signal must reach the laptop — same IP/firewall as the preview link. |
| Switches back too early / credits half-done when shown | Turn on **"Shutdown source when not visible"** on the `Credits` source. |
| A test posted to Discord | You ran the live **Stream End Sequence** — use **Stream End Sequence (OFFLINE Test)** instead. |
