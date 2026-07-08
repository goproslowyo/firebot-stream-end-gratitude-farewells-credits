# Credits Themes

The stream-end credits view ships with **38 built-in themes** plus a **🎲 Random / Shuffle**
option. Pick one from the **Theme** dropdown in the script's startup settings (Firebot ▸ Settings ▸
Scripts ▸ Startup Scripts) — no rebuilding. **Classic Film** is the default; **🎲 Random / Shuffle**
rolls a different theme every time you generate credits. Your **Custom CSS** is layered on top of
the chosen theme and always wins, so you can tweak any look without editing code.

Every theme is a self-contained CSS "look" over the same credit data, tuned for OBS's Chromium
browser source at 60fps. Each entry below shows its **intro** (left) and **outro** (right) frame —
skim the index, then jump to any theme for the pair. Row and finale treatments vary per theme too.

> Tip: for the smoothest crawl, set the OBS browser source to **60 FPS** with hardware
> acceleration on. See [`docs/INSTALL.md`](docs/INSTALL.md) for the full theming + speed options.

## Index

| | Theme | The look |
|:--:|:--|:--|
| <a href="#classic-film"><img src="docs/themes/base.webp" width="150" alt="Classic Film"></a> | **[Classic Film](#classic-film)**<br><sub>CINEMATIC & CLASSIC</sub> | The default: a warm gold-on-black movie crawl with a Playfair serif, glowing section titles, and film-style intro/outro flourish cards. |
| <a href="#space-crawl"><img src="docs/themes/space-crawl.webp" width="150" alt="Space Crawl"></a> | **[Space Crawl](#space-crawl)**<br><sub>CINEMATIC & CLASSIC</sub> | The space-opera homage — golden text recedes up a steeply tilted plane, converging to a true vanishing-point apex in a deep starfield toward a glowing galactic core. |
| <a href="#mission-control"><img src="docs/themes/rocket.webp" width="150" alt="Mission Control"></a> | **[Mission Control](#mission-control)**<br><sub>CINEMATIC & CLASSIC</sub> | Apollo-era launch: a Saturn V climbs the left third on a flame, live telemetry (`T+ / ALT / VEL`) in the corner, an Earth-limb sunrise across the bottom. |
| <a href="#broadway-playbill"><img src="docs/themes/playbill.webp" width="150" alt="Broadway Playbill"></a> | **[Broadway Playbill](#broadway-playbill)**<br><sub>CINEMATIC & CLASSIC</sub> | An engraved theatre programme on gold-stamped cream stock, framed by velvet legs and valance — a roving follow-spot, a footlight twinkle chase, the one light theme. |
| <a href="#quest-log"><img src="docs/themes/quest-log.webp" width="150" alt="Quest Log"></a> | **[Quest Log](#quest-log)**<br><sub>CINEMATIC & CLASSIC</sub> | A candlelit tavern ledger on night-stained parchment — a flickering candle and drifting embers, blackletter quest headings with an illuminated drop-cap, ruled sign-in rows with "× N" tallies, a wax-seal outro. |
| <a href="#neon-night-drive"><img src="docs/themes/synthwave.webp" width="150" alt="Neon Night Drive"></a> | **[Neon Night Drive](#neon-night-drive)**<br><sub>RETRO, SYNTH & TERMINAL</sub> | OutRun at 2AM: a hero coupe drives toward the vanishing point over a neon road grid, palms rushing past, a striped sun and city-and-mountain skyline behind, twin 3-beam lasers scissoring magenta and cyan, a high-score-style roster, neon-tube outro. |
| <a href="#vhs-home-video"><img src="docs/themes/vhs.webp" width="150" alt="VHS Home Video"></a> | **[VHS Home Video](#vhs-home-video)**<br><sub>RETRO, SYNTH & TERMINAL</sub> | A taped-off-air family recording — soft white text with chromatic fringing, VCR OSD chrome (`▶ PLAY`, blinking `● REC`, a 1994 timestamp), a periodic tracking-glitch band. |
| <a href="#phosphor-terminal"><img src="docs/themes/crt-terminal.webp" width="150" alt="Phosphor Terminal"></a> | **[Phosphor Terminal](#phosphor-terminal)**<br><sub>RETRO, SYNTH & TERMINAL</sub> | A hacker's CRT tty: green-phosphor monospace transcript, `$ cat subscribers.log` section commands, `cat -n` line numbers, scanlines, an amber `tail -f raids.log` finale. |
| <a href="#arcade-high-score"><img src="docs/themes/arcade.webp" width="150" alt="Arcade High Score"></a> | **[Arcade High Score](#arcade-high-score)**<br><sub>RETRO, SYNTH & TERMINAL</sub> | An arcade in attract mode: a flanking cabinet running a Space-Invaders demo, a back wall of distant cabinets over a neon floor fan, Press Start 2P ranked HIGH SCORES panels with `PTS`, a blinking `INSERT COIN` badge, a `GAME OVER` outro. |
| <a href="#dot-matrix"><img src="docs/themes/handheld.webp" width="150" alt="Dot Matrix"></a> | **[Dot Matrix](#dot-matrix)**<br><sub>RETRO, SYNTH & TERMINAL</sub> | The 4-shade olive-green handheld LCD — chunky pixel font, a faint dot-grid over the roll, a molded console bezel with A/B buttons, `THANKS FOR PLAYING!` outro. |
| <a href="#roller-disco"><img src="docs/themes/roller-disco.webp" width="150" alt="Roller Disco"></a> | **[Roller Disco](#roller-disco)**<br><sub>MUSIC & DJ</sub> | A full rink under a mirror ball — an ensemble of **seven** hand-drawn skaters strides, weaves, high-fives and near-misses across a 2.5D checkered floor, sparkle bursts and all. |
| <a href="#on-deck"><img src="docs/themes/cdj.webp" width="150" alt="On Deck"></a> | **[On Deck](#on-deck)**<br><sub>MUSIC & DJ</sub> | A club DJ booth close-up: a photoreal CDJ jog wheel with a lit `126.0 BPM` display, a mixer strip with VU meters, waveform ribbons, `DECK A / DECK B` sections, tracks tagged with key + BPM. |
| <a href="#warehouse-rave"><img src="docs/themes/techno.webp" width="150" alt="Warehouse Rave"></a> | **[Warehouse Rave](#warehouse-rave)**<br><sub>MUSIC & DJ</sub> | A Berlin-industrial concrete room: monolithic white type under volumetric beam shafts full of dust, a rim-lit DJ booth, catwalk and PA stacks, a 132-BPM beat dot, a curfew outro. |
| <a href="#deep-house"><img src="docs/themes/house.webp" width="150" alt="Deep House (33⅓)"></a> | **[Deep House (33⅓)](#deep-house)**<br><sub>MUSIC & DJ</sub> | A crate-digger's basement: a spinning corner turntable with a real pivoted tonearm, warm lamp light and dust, blocks as record SIDE A/B tracklists. |
| <a href="#junglist"><img src="docs/themes/dnb.webp" width="150" alt="Junglist"></a> | **[Junglist](#junglist)**<br><sub>MUSIC & DJ</sub> | Acid-green pirate-radio signal: oscilloscope waveform dividers under stencil titles, a `174 BPM / SIGNAL LOCKED` HUD, a spectrum analyzer pumping like live audio, `>> ON AIR` chip. |
| <a href="#block-party"><img src="docs/themes/boombox.webp" width="150" alt="Block Party"></a> | **[Block Party](#block-party)**<br><sub>MUSIC & DJ</sub> | A 90s stoop jam: a detailed boombox against a graffiti wall — a `THE AVE` burner and a teal `FRESH` throwie with drips and overspray — a chunky fire hydrant, laced sneakers slung on the wire, string lights, cassette-tape dividers, `SOUND CLASH` finale. |
| <a href="#mainstage"><img src="docs/themes/mainstage.webp" width="150" alt="Mainstage"></a> | **[Mainstage](#mainstage)**<br><sub>MUSIC & DJ</sub> | The credits as a festival poster: an LED-wall stage cycling CO2 jets and firework bursts, volumetric laser fans, a phone-lit crowd silhouette, smooth desynced confetti, stage-name sections, a headliner finale. |
| <a href="#sunrise-set"><img src="docs/themes/melodic.webp" width="150" alt="Sunrise Set"></a> | **[Sunrise Set](#sunrise-set)**<br><sub>MUSIC & DJ</sub> | A 6am hillside set — a soft rising sun with god-rays, skeins of gulls gliding across a dawn-warmed sky, a crowd with raised hands and twinkling phone-lights, drifting lantern orbs, airy lowercase type. |
| <a href="#blue-note"><img src="docs/themes/jazz.webp" width="150" alt="Blue Note"></a> | **[Blue Note](#blue-note)**<br><sub>MUSIC & DJ</sub> | A smoky basement jazz club at last call — Reid-Miles color-block titles, a brass saxophone in a spotlight pool, a bassist in the shadows, drifting smoke. |
| <a href="#final-round"><img src="docs/themes/fighter.webp" width="150" alt="Final Round"></a> | **[Final Round](#final-round)**<br><sub>GAMING</sub> | Arcade fighting-game energy: two redrawn fighters — one in a forward guard, one throwing a high kick — trade blows with impact sparks in the gutters, ink brush-slash accents, roster rows with health bars, `ROUND N / FIGHT!` sections and a `K.O.!!` finale. |
| <a href="#victory-fanfare"><img src="docs/themes/rpg.webp" width="150" alt="Victory Fanfare"></a> | **[Victory Fanfare](#victory-fanfare)**<br><sub>GAMING</sub> | A classic 16-bit JRPG menu: beveled blue window-skin panels, an adventuring party lined up below (knight, mage, ranger, cleric) with a hopping slime pet and campfire fireflies, a hand cursor on rows, `EXP +500` amounts, a `LEVEL UP!` finale. |
| <a href="#personal-best"><img src="docs/themes/speedrun.webp" width="150" alt="Personal Best"></a> | **[Personal Best](#personal-best)**<br><sub>GAMING</sub> | A speedrunner's split timer: dark timer UI, blocks as split segments with green/gold/red deltas, a big monospace timer, a `WORLD RECORD` finale. |
| <a href="#blocklight"><img src="docs/themes/voxel.webp" width="150" alt="Blocklight"></a> | **[Blocklight](#blocklight)**<br><sub>GAMING</sub> | A blocky-world dusk: big pixel clouds, floating light-catching cubes, a chunky terrain silhouette, an XP bar under titles, a heart/armor HUD, `x64`-style amounts. |
| <a href="#grand-finals"><img src="docs/themes/esports.webp" width="150" alt="Grand Finals"></a> | **[Grand Finals](#grand-finals)**<br><sub>GAMING</sub> | An esports grand-final overlay: a championship-gold title, a jumbotron champion crest over a floodlit crowd firing camera flashes, a pulsing `LIVE` dot, glossy angular lower-thirds, team-tag rows and an `MVP` finale. |
| <a href="#chequered-flag"><img src="docs/themes/grandprix.webp" width="150" alt="Chequered Flag"></a> | **[Chequered Flag](#chequered-flag)**<br><sub>GAMING</sub> | A night-race world feed: a timing tower (position, name, gap), a floodlit grandstand, a marshal waving the chequered flag as a spin-blurred car streaks the pit straight, a second car on the far straight, `CHEQUERED FLAG — P1` finale. |
| <a href="#capture-the-flag"><img src="docs/themes/pwned.webp" width="150" alt="Capture the Flag"></a> | **[Capture the Flag](#capture-the-flag)**<br><sub>CYBER & CTF</sub> | A hacker's IDE: syntax-highlighted terminal, every name wrapped as `flag{Username}`, section titles as shell commands, points like `[500 pts]`, a `root shell acquired` raid alert. |
| <a href="#netrunner"><img src="docs/themes/netrunner.webp" width="150" alt="Netrunner"></a> | **[Netrunner](#netrunner)**<br><sub>CYBER & CTF</sub> | A holographic AR HUD over a neon city: neon vertical signage and rain-slick street reflections behind glassmorphic panels, angular corner brackets, teal/magenta duotone, an oscilloscope data card, an `INTRUSION DETECTED` finale. |
| <a href="#digital-rain"><img src="docs/themes/cipher.webp" width="150" alt="Digital Rain"></a> | **[Digital Rain](#digital-rain)**<br><sub>CYBER & CTF</sub> | The code-rain homage done cleanly — falling glyph columns kept in the side gutters with white-hot lead glyphs, crisp readable white names in the center, a `WAKE UP` flash. |
| <a href="#neo-noir"><img src="docs/themes/neo-noir.webp" width="150" alt="Neo-Noir"></a> | **[Neo-Noir](#neo-noir)**<br><sub>NIGHT, SCENE & NOSTALGIA</sub> | Rain-slick monochrome — a detective's desk corner (rotary phone, case file, ashtray, amber glass) under a warm lamp, structured venetian light shafts, film grain, typewriter case-file rows, one red word for the raid, an ivory `THE CITY SLEEPS` outro. |
| <a href="#silver-nocturne"><img src="docs/themes/luna.webp" width="150" alt="Silver Nocturne"></a> | **[Silver Nocturne](#silver-nocturne)**<br><sub>NIGHT, SCENE & NOSTALGIA</sub> | A cool moonlit nocturne — a redrawn cratered moon with a small companion crescent over a still sea, a shimmering moonglade, a drifting lantern boat, occasional shooting stars, thin elegant serif. |
| <a href="#aurora"><img src="docs/themes/aurora.webp" width="150" alt="Aurora"></a> | **[Aurora](#aurora)**<br><sub>NIGHT, SCENE & NOSTALGIA</sub> | Vast layered aurora curtains — green, violet and magenta drapes with blazing hems — dance over a near-black snowy ridge, where a lone silhouetted witness and their dog sit by a glowing tent and campfire; meteors streak the `UNDER THE LIGHTS · 69°N` sky. |
| <a href="#the-abyss"><img src="docs/themes/abyss.webp" width="150" alt="The Abyss"></a> | **[The Abyss](#the-abyss)**<br><sub>NIGHT, SCENE & NOSTALGIA</sub> | A submarine descent into crushing dark: fading god-rays, drifting plankton, a passing whale, jellyfish and darting school, glowing vents, an anglerfish making one brief early pass, a depth-gauge HUD, a `LEVIATHAN SIGHTED` finale. |
| <a href="#close-encounter"><img src="docs/themes/ufo.webp" width="150" alt="Close Encounter"></a> | **[Close Encounter](#close-encounter)**<br><sub>NIGHT, SCENE & NOSTALGIA</sub> | A 1950s drive-in flying saucer over a desert night — a chrome saucer with porthole lights, a green abduction beam, a `ROUTE 51` shield standing before the hills, and a cow that gets taken every 18 seconds. |
| <a href="#lo-fi-room"><img src="docs/themes/lofi.webp" width="150" alt="Lo-Fi Room"></a> | **[Lo-Fi Room](#lo-fi-room)**<br><sub>NIGHT, SCENE & NOSTALGIA</sub> | A cozy study room — warm desk-lamp glow, a rainy night window, books, a mug, a sleeping cat, handwritten titles and sticky notes. |
| <a href="#blue-plate-diner"><img src="docs/themes/diner.webp" width="150" alt="Blue Plate Diner"></a> | **[Blue Plate Diner](#blue-plate-diner)**<br><sub>NIGHT, SCENE & NOSTALGIA</sub> | The credits as a 50s diner menu: chrome and red vinyl, an `OPEN 24H` neon sign, a tall jukebox and counter stools, menu rows with dot-leaders to prices (bits as cents!), counter-scale pie-and-coffee. |
| <a href="#end-of-broadcast"><img src="docs/themes/signoff.webp" width="150" alt="End of Broadcast"></a> | **[End of Broadcast](#end-of-broadcast)**<br><sub>NIGHT, SCENE & NOSTALGIA</sub> | A dark living room at 3 a.m. lit only by a walnut console TV — rabbit ears, SMPTE bars cycling through `PLEASE STAND BY` to rolling static — a sleeping cat on the couch, venetian blinds framing the moon and a blinking transmitter tower, an `END OF TRANSMISSION` collapse-to-a-dot outro. |
| <a href="#corkboard"><img src="docs/themes/scrapbook.webp" width="150" alt="Corkboard"></a> | **[Corkboard](#corkboard)**<br><sub>NIGHT, SCENE & NOSTALGIA</sub> | The memory wall at 1 a.m.: a dusk-plum bedroom wall of pinned polaroids under twinkling fairy-light swags, neon marker doodles (`best stream ever!!`, `gg!`), red threads meeting a `THANK YOU!` card, names on lit-wire polaroid cards, a gold-star finale. |
| <a href="#the-crew"><img src="docs/themes/heist.webp" width="150" alt="The Crew"></a> | **[The Crew](#the-crew)**<br><sub>NIGHT, SCENE & NOSTALGIA</sub> | The end-credits as a heist crew reveal: a flashlight cone panning a navy blueprint, a brushed-steel vault with a clicking dial and gold gleam, red laser tripwires, roles as section eyebrows, cuts of the take as amounts, a `THE SCORE` finale. |

---

## Cinematic & classic

### Classic Film
<img src="docs/themes/base.webp" alt="Classic Film — intro" width="49%"><img src="docs/themes/base-outro.webp" alt="Classic Film — outro" width="49%">

The default: a warm gold-on-black movie crawl with a Playfair serif, glowing section titles, and film-style intro/outro flourish cards. Understated and universal.
*Palette: black + film-gold · Serif display · "The End" outro.*

### Space Crawl
<img src="docs/themes/space-crawl.webp" alt="Space Crawl — intro" width="49%"><img src="docs/themes/space-crawl-outro.webp" alt="Space Crawl — outro" width="49%">

The space-opera homage — golden text recedes up a steeply tilted plane, converging to a true vanishing-point apex, into a deep starfield toward a glowing galactic core. The only theme that changes the physics of the crawl.
*Palette: #FFE81F on deep space · News Gothic · 3D perspective tilt (`--space-crawl-tilt` knob).*

### Mission Control
<img src="docs/themes/rocket.webp" alt="Mission Control — intro" width="49%"><img src="docs/themes/rocket-outro.webp" alt="Mission Control — outro" width="49%">

Apollo-era launch: a Saturn V climbs the left third on a flame, live telemetry (`T+ / ALT / VEL`) in the corner, an Earth-limb sunrise across the bottom. Sections are mission stages.
*Palette: deep-space blue + NASA red + amber · Michroma / IBM Plex Mono · ascending rocket.*

### Broadway Playbill
<img src="docs/themes/playbill.webp" alt="Broadway Playbill — intro" width="49%"><img src="docs/themes/playbill-outro.webp" alt="Broadway Playbill — outro" width="49%">

An engraved theatre programme on aged, gold-stamped cream stock, framed by rich velvet legs and a valance — the one light theme. A roving follow-spot sweeps the page, footlights twinkle in a chase, cast-list rows run dotted leaders under small-caps headers.
*Palette: cream paper + crimson + gilt + velvet · Playfair / EB Garamond · dot-leader cast list.*

### Quest Log
<img src="docs/themes/quest-log.webp" alt="Quest Log — intro" width="49%"><img src="docs/themes/quest-log-outro.webp" alt="Quest Log — outro" width="49%">

A candlelit tavern ledger on night-stained parchment — a flickering candle flame (the scribe's light) throws drifting embers over blackletter quest headings led by an illuminated drop-cap, ruled sign-in rows with "× N" tallies, a wax-seal outro.
*Palette: night-tavern leather + parchment + wax red · blackletter · ruled ledger rows.*

## Retro, synth & terminal

### Neon Night Drive
<img src="docs/themes/synthwave.webp" alt="Neon Night Drive — intro" width="49%"><img src="docs/themes/synthwave-outro.webp" alt="Neon Night Drive — outro" width="49%">

A full OutRun scene: a striped sun (with rolling blinds) as the rearmost backdrop, city and mountain silhouettes, and a hero coupe driving toward the vanishing point above a neon road grid, palms rushing past on either side. Two 3-beam lasers scissor on independent periods, cycling magenta and cyan; a high-score-style roster and a neon-tube outro.
*Palette: indigo night + magenta/cyan neon + gold sun · Audiowide/Orbitron · driving coupe + grid + lasers.*

### VHS Home Video
<img src="docs/themes/vhs.webp" alt="VHS Home Video — intro" width="49%"><img src="docs/themes/vhs-outro.webp" alt="VHS Home Video — outro" width="49%">

A taped-off-air family recording — soft white text with chromatic fringing, VCR OSD chrome (`▶ PLAY`, blinking `● REC`, a 1994 timestamp), a periodic tracking-glitch band.
*Palette: warm tape blacks + red REC · VT323 · camcorder OSD + tracking glitch.*

### Phosphor Terminal
<img src="docs/themes/crt-terminal.webp" alt="Phosphor Terminal — intro" width="49%"><img src="docs/themes/crt-terminal-outro.webp" alt="Phosphor Terminal — outro" width="49%">

A hacker's CRT tty: green-phosphor monospace transcript, `$ cat subscribers.log` section commands, `cat -n` line numbers, scanlines, an amber `tail -f raids.log` finale.
*Palette: phosphor green on black · IBM Plex Mono / VT323 · terminal transcript.*

### Arcade High Score
<img src="docs/themes/arcade.webp" alt="Arcade High Score — intro" width="49%"><img src="docs/themes/arcade-outro.webp" alt="Arcade High Score — outro" width="49%">

An arcade in attract mode: the left flanking cabinet plays a Space-Invaders attract demo, a rank of distant cabinets lines the back wall over a neon floor fan. Press Start 2P pixel font, ranked `HIGH SCORES` panels with dot leaders and `PTS`, per-section hue cycling, a blinking `INSERT COIN` badge and a `GAME OVER` outro.
*Palette: neon-on-purple + scanlines · Press Start 2P · high-score panels.*

### Dot Matrix
<img src="docs/themes/handheld.webp" alt="Dot Matrix — intro" width="49%"><img src="docs/themes/handheld-outro.webp" alt="Dot Matrix — outro" width="49%">

The 4-shade olive-green handheld LCD — chunky pixel font, a faint dot-grid over the roll, a molded console bezel with A/B buttons, `THANKS FOR PLAYING!` outro.
*Palette: 4-shade LCD green · pixel font · handheld bezel.*

## Music & DJ

### Roller Disco
<img src="docs/themes/roller-disco.webp" alt="Roller Disco — intro" width="49%"><img src="docs/themes/roller-disco-outro.webp" alt="Roller Disco — outro" width="49%">

A full rink under a mirror ball — an ensemble of **seven** hand-drawn skaters strides, weaves, high-fives and near-misses across a 2.5D checkered floor, sparkle bursts and all.
*Palette: hot pink + gold + purple glam · Righteous · choreographed skating ensemble.*

### On Deck
<img src="docs/themes/cdj.webp" alt="On Deck — intro" width="49%"><img src="docs/themes/cdj-outro.webp" alt="On Deck — outro" width="49%">

A club DJ booth close-up: a photoreal CDJ jog wheel with a lit `126.0 BPM` display, a mixer strip with VU meters, waveform ribbons, `DECK A / DECK B` sections, tracks tagged with key + BPM.
*Palette: amber/blue LEDs on near-black · condensed sans · jog-wheel hero.*

### Warehouse Rave
<img src="docs/themes/techno.webp" alt="Warehouse Rave — intro" width="49%"><img src="docs/themes/techno-outro.webp" alt="Warehouse Rave — outro" width="49%">

A Berlin-industrial concrete room: monolithic white type under volumetric beam shafts full of dust, a rim-lit DJ booth, catwalk and PA stacks, a 132-BPM beat dot, a curfew outro.
*Palette: cold concrete + acid green + red · Archivo Black · volumetric warehouse.*

### Deep House
<img src="docs/themes/house.webp" alt="Deep House (33⅓) — intro" width="49%"><img src="docs/themes/house-outro.webp" alt="Deep House (33⅓) — outro" width="49%">

A crate-digger's basement: a spinning corner turntable with a real pivoted tonearm, warm lamp light and dust, blocks as record SIDE A/B tracklists.
*Palette: cream + burnt orange + chocolate · Fredoka / Baloo · turntable + tracklist.*

### Junglist
<img src="docs/themes/dnb.webp" alt="Junglist — intro" width="49%"><img src="docs/themes/dnb-outro.webp" alt="Junglist — outro" width="49%">

Acid-green pirate-radio signal: oscilloscope waveform dividers under stencil titles, a `174 BPM / SIGNAL LOCKED` HUD, a spectrum analyzer that pumps like live audio (interleaved bar groups running at different rhythms), a `>> ON AIR` chip.
*Palette: acid green + teal on black-green · Chakra Petch · waveform dividers.*

### Block Party
<img src="docs/themes/boombox.webp" alt="Block Party — intro" width="49%"><img src="docs/themes/boombox-outro.webp" alt="Block Party — outro" width="49%">

A 90s stoop jam: a detailed boombox in front of a graffiti wall — a leaning `THE AVE` burner on the left, a teal `FRESH` throwie on the right, both dripping with overspray. A chunky fire hydrant, laced sneakers slung over the wire, brick and string lights, cassette-tape dividers, a `SOUND CLASH` finale.
*Palette: brick + marker black/red + teal `FRESH` · spray-paint display · graffiti wall + boombox.*

### Mainstage
<img src="docs/themes/mainstage.webp" alt="Mainstage — intro" width="49%"><img src="docs/themes/mainstage-outro.webp" alt="Mainstage — outro" width="49%">

The credits as a festival poster: an LED-wall stage with CO2 jets and firework bursts cycling on the beat, volumetric laser fans, a phone-lit crowd silhouette, smooth desynced confetti falling, stage-name sections, a headliner finale.
*Palette: night + coral/violet/laser-green · poster display · festival stage.*

### Sunrise Set
<img src="docs/themes/melodic.webp" alt="Sunrise Set — intro" width="49%"><img src="docs/themes/melodic-outro.webp" alt="Sunrise Set — outro" width="49%">

A 6am hillside set — a soft rising sun with god-rays over a dawn-warmed sky, skeins of gulls gliding past, a crowd with raised hands and twinkling phone-lights, dawn shimmer on the haze, drifting lantern orbs, airy lowercase type. The calm one.
*Palette: indigo-teal dawn → peach · Josefin Sans / Quicksand · sunrise + crowd.*

### Blue Note
<img src="docs/themes/jazz.webp" alt="Blue Note — intro" width="49%"><img src="docs/themes/jazz-outro.webp" alt="Blue Note — outro" width="49%">

A smoky basement jazz club at last call — Reid-Miles color-block titles, a brass saxophone in a spotlight pool, a bassist in the shadows, drifting smoke.
*Palette: midnight blue + brass + bordeaux · Archivo / Fraunces italic · Blue-Note album styling.*

## Gaming

### Final Round
<img src="docs/themes/fighter.webp" alt="Final Round — intro" width="49%"><img src="docs/themes/fighter-outro.webp" alt="Final Round — outro" width="49%">

Arcade fighting-game energy: two redrawn fighters — a forward guard versus a high kick — trade periodic blows, impact sparks bursting in the gutters. Ink brush-slash accents, roster rows with health bars, `ROUND N / FIGHT!` sections and a `K.O.!!` finale.
*Palette: dojo night + red/gold · heavy slanted display · VS energy.*

### Victory Fanfare
<img src="docs/themes/rpg.webp" alt="Victory Fanfare — intro" width="49%"><img src="docs/themes/rpg-outro.webp" alt="Victory Fanfare — outro" width="49%">

A classic 16-bit JRPG menu: beveled blue window-skin panels with double borders, a spaced adventuring party lined up beneath — knight, mage, ranger, cleric — with a hopping slime pet and campfire fireflies. A hand cursor on rows, `EXP +500` amounts, quest-complete banners, a `LEVEL UP!` finale.
*Palette: gradient menu-blue + white · bitmap-style menu font · RPG window boxes.*

### Personal Best
<img src="docs/themes/speedrun.webp" alt="Personal Best — intro" width="49%"><img src="docs/themes/speedrun-outro.webp" alt="Personal Best — outro" width="49%">

A speedrunner's split timer: dark timer UI, blocks as split segments with green/gold/red deltas, a big monospace timer, a `WORLD RECORD` finale.
*Palette: dark UI + delta green/gold/red · monospace · LiveSplit-style rows.*

### Blocklight
<img src="docs/themes/voxel.webp" alt="Blocklight — intro" width="49%"><img src="docs/themes/voxel-outro.webp" alt="Blocklight — outro" width="49%">

A blocky-world dusk: big pixel clouds, floating light-catching cubes, a chunky terrain silhouette, an XP bar under titles, a heart/armor HUD, `x64`-style amounts.
*Palette: voxel-sunset violet→amber · clean sans · floating cubes.*

### Grand Finals
<img src="docs/themes/esports.webp" alt="Grand Finals — intro" width="49%"><img src="docs/themes/esports-outro.webp" alt="Grand Finals — outro" width="49%">

An esports broadcast overlay: a championship-gold title, glossy angular lower-thirds, a jumbotron champion crest above a floodlit arena crowd popping camera flashes, a pulsing `LIVE` dot, hex accents, a scoreline, team-tag rows and an `MVP` finale.
*Palette: navy + electric blue/white + gold · condensed sans · broadcast package.*

### Chequered Flag
<img src="docs/themes/grandprix.webp" alt="Chequered Flag — intro" width="49%"><img src="docs/themes/grandprix-outro.webp" alt="Chequered Flag — outro" width="49%">

A night-race world feed: a timing tower (position, name, gap), a floodlit grandstand crowd, and a marshal waving a black-and-white chequered flag as an F1 car streaks the pit straight — wheels spin-blurred, speed streaks trailing — while a second car runs the far straight. A chequered-flag band and a `CHEQUERED FLAG — P1` finale.
*Palette: racing red + amber + gold + carbon · Chakra Petch · timing tower.*

## Cyber & CTF

### Capture the Flag
<img src="docs/themes/pwned.webp" alt="Capture the Flag — intro" width="49%"><img src="docs/themes/pwned-outro.webp" alt="Capture the Flag — outro" width="49%">

A hacker's IDE: syntax-highlighted terminal, every name wrapped as `flag{Username}`, section titles as shell commands, points like `[500 pts]`, a `root shell acquired` raid alert.
*Palette: dark IDE + syntax colors · monospace · flag{} rows.*

### Netrunner
<img src="docs/themes/netrunner.webp" alt="Netrunner — intro" width="49%"><img src="docs/themes/netrunner-outro.webp" alt="Netrunner — outro" width="49%">

A holographic AR HUD over a neon city: glassmorphic panels and angular corner brackets float over neon vertical signage and rain-slick street reflections, teal/magenta duotone, monospace stat chips, an oscilloscope data card, an `INTRUSION DETECTED` finale.
*Palette: teal + magenta on near-black · techy sans · holo-glass panels.*

### Digital Rain
<img src="docs/themes/cipher.webp" alt="Digital Rain — intro" width="49%"><img src="docs/themes/cipher-outro.webp" alt="Digital Rain — outro" width="49%">

The code-rain homage done cleanly — falling glyph columns kept in the side gutters with white-hot lead glyphs, crisp readable white names in the center, a `WAKE UP` flash.
*Palette: phosphor green + white-hot · monospace · gutter glyph rain.*

## Night, scene & nostalgia

### Neo-Noir
<img src="docs/themes/neo-noir.webp" alt="Neo-Noir — intro" width="49%"><img src="docs/themes/neo-noir-outro.webp" alt="Neo-Noir — outro" width="49%">

Rain-slick monochrome: a detective's desk-corner vignette — rotary phone, case file, ashtray, amber glass — pooled under a warm lamp, structured venetian light shafts and film grain over typewriter case-file rows. Exactly one red word, saved for the raid finale; a solid ivory `THE CITY SLEEPS` outro.
*Palette: black + silver + one red · Special Elite / Courier Prime · desk vignette + blinds.*

### Silver Nocturne
<img src="docs/themes/luna.webp" alt="Silver Nocturne — intro" width="49%"><img src="docs/themes/luna-outro.webp" alt="Silver Nocturne — outro" width="49%">

A cool moonlit nocturne — a redrawn cratered moon with a small companion crescent above a still sea, a shimmering moonglade, drifting clouds, and a lone lantern boat. Occasional shooting stars, thin elegant serif, moon-phase ornaments. Near-stillness.
*Palette: ink navy + moon silver · Cormorant Garamond · cratered moon + moonglade.*

### Aurora
<img src="docs/themes/aurora.webp" alt="Aurora — intro" width="49%"><img src="docs/themes/aurora-outro.webp" alt="Aurora — outro" width="49%">

Vast layered aurora curtains — folded green, violet and magenta drapes with blazing hems — dance on independent periods over a near-black snowy ridge. A tiny silhouetted witness and their dog sit beside a glowing tent and a flickering campfire, the only warm light in the scene; meteors streak past under an `UNDER THE LIGHTS · 69°N` fiction.
*Palette: near-black night + green/violet/magenta aurora + campfire amber · thin sans · layered curtains.*

### The Abyss
<img src="docs/themes/abyss.webp" alt="The Abyss — intro" width="49%"><img src="docs/themes/abyss-outro.webp" alt="The Abyss — outro" width="49%">

A submarine descent into crushing dark: fading god-rays and drifting bioluminescent plankton up top, a passing whale, a pulsing jellyfish, a darting school and glowing hydrothermal vents below. An anglerfish cruises one smooth pass early in each loop (mostly off-screen), a depth-gauge HUD ticks down, a `LEVIATHAN SIGHTED` finale.
*Palette: near-black blue + cyan glow · cool sans · deep-sea life + anglerfish.*

### Close Encounter
<img src="docs/themes/ufo.webp" alt="Close Encounter — intro" width="49%"><img src="docs/themes/ufo-outro.webp" alt="Close Encounter — outro" width="49%">

A 1950s drive-in flying saucer over a desert night — a chrome saucer with porthole lights, a green abduction beam, a `ROUTE 51` shield standing clearly in front of the hills, and a cow that gets taken every 18 seconds.
*Palette: green-black night + amber + chrome · Zen Dots · saucer + beam + cow.*

### Lo-Fi Room
<img src="docs/themes/lofi.webp" alt="Lo-Fi Room — intro" width="49%"><img src="docs/themes/lofi-outro.webp" alt="Lo-Fi Room — outro" width="49%">

A cozy study room — warm desk-lamp glow, a rainy night window, books, a mug, a sleeping cat, handwritten titles and sticky notes. Beats to relax to.
*Palette: warm room browns + lamp glow · Caveat / soft sans · desk scene + cat.*

### Blue Plate Diner
<img src="docs/themes/diner.webp" alt="Blue Plate Diner — intro" width="49%"><img src="docs/themes/diner-outro.webp" alt="Blue Plate Diner — outro" width="49%">

The credits as a 50s diner menu: chrome and red vinyl, an `OPEN 24H` neon sign, a tall jukebox and counter-height stools framing the room, menu rows with dot-leaders to prices (bits as cents!), counter-scale pie-and-coffee illustrations.
*Palette: cream + red vinyl + chrome + teal · script neon · diner menu.*

### End of Broadcast
<img src="docs/themes/signoff.webp" alt="End of Broadcast — intro" width="49%"><img src="docs/themes/signoff-outro.webp" alt="End of Broadcast — outro" width="49%">

A dark living room at 3 a.m., lit only by a walnut console TV — rabbit ears up, its glow re-lighting the room as it cycles SMPTE bars → `PLEASE STAND BY` → rolling static. A cat sleeps on the couch; venetian blinds frame the moon and a red-blinking transmitter tower outside. A `KSGN-TV 9` test-card intro, a `SPECIAL BULLETIN` raid block, an `END OF TRANSMISSION` collapse-to-a-dot outro.
*Palette: 3 a.m. living-room dark + phosphor TV glow · caption sans · console TV + collapse-to-dot.*

### Corkboard
<img src="docs/themes/scrapbook.webp" alt="Corkboard — intro" width="49%"><img src="docs/themes/scrapbook-outro.webp" alt="Corkboard — outro" width="49%">

The memory wall, 1 a.m. — a dusk-plum bedroom wall covered in colorful pinned polaroids of stream memories, twinkling fairy-light swags going soft-bokeh, neon marker doodles (`best stream ever!!`, `gg!`), and a corkboard patch where red threads meet a `THANK YOU!` card, all under a warm desk-lamp pool. Names ride polaroid cards strung on a lit wire, with an occasional new-photo drop-in.
*Palette: dusk-plum wall + polaroid white + fairy-light glow · Caveat / Kalam · pinned photos + red threads.*

### The Crew
<img src="docs/themes/heist.webp" alt="The Crew — intro" width="49%"><img src="docs/themes/heist-outro.webp" alt="The Crew — outro" width="49%">

The end-credits as a heist crew reveal: a flashlight cone pans a navy blueprint, a brushed-steel vault door with a clicking dial and a gleam of gold behind it, red laser tripwires crossing the dark. Roles as section eyebrows, cuts of the take as amounts, a `THE SCORE` finale.
*Palette: blueprint navy + gold + laser red · widescreen serif/sans · vault + lasers.*

---

*Themes are generated from the theme lab in `prototype/` and shipped from `src/view/themes/`.
Regenerate the shots and this gallery after any theme change.*
