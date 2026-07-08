/**
 * Generates src/view/themes/presets.ts from the prototype theme lab (prototype/variants/*).
 * Run after any theme edit: `npm run gen:presets` (then `npm test` / `npm run build`).
 *
 * The prototype switcher labels are working titles; SHIP_NAMES maps each variant key to
 * its user-facing dropdown label, and SHIP_ORDER is the dropdown order (Classic Film first).
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { VARIANTS } from "./variants";

const SHIP_NAMES: Record<string, string> = {
  base: "Classic Film",
  synthwave: "Neon Night Drive",
  "neo-noir": "Neo-Noir",
  vhs: "VHS Home Video",
  "crt-terminal": "Phosphor Terminal",
  cipher: "Digital Rain",
  netrunner: "Netrunner",
  pwned: "Capture the Flag",
  "roller-disco": "Roller Disco",
  cdj: "On Deck",
  mainstage: "Mainstage",
  techno: "Warehouse Rave",
  house: "Deep House (33⅓)",
  dnb: "Junglist",
  boombox: "Block Party",
  melodic: "Sunrise Set",
  luna: "Silver Nocturne",
  lofi: "Lo-Fi Room",
  jazz: "Blue Note",
  arcade: "Arcade High Score",
  fighter: "Final Round",
  rpg: "Victory Fanfare",
  handheld: "Dot Matrix",
  speedrun: "Personal Best",
  voxel: "Blocklight",
  esports: "Grand Finals",
  grandprix: "Chequered Flag",
  "space-crawl": "Space Crawl",
  ufo: "Close Encounter",
  rocket: "Mission Control",
  abyss: "The Abyss",
  aurora: "Aurora",
  heist: "The Crew",
  signoff: "End of Broadcast",
  diner: "Blue Plate Diner",
  scrapbook: "Corkboard",
  playbill: "Broadway Playbill",
  "quest-log": "Quest Log",
};

const SHIP_ORDER: readonly string[] = Object.keys(SHIP_NAMES);

const missing = VARIANTS.filter((v) => !(v.key in SHIP_NAMES)).map((v) => v.key);
const unknown = SHIP_ORDER.filter((key) => !VARIANTS.some((v) => v.key === key));
if (missing.length > 0 || unknown.length > 0) {
  throw new Error(
    `gen-presets: SHIP_NAMES out of sync with prototype/variants — missing: [${missing.join(", ")}], unknown: [${unknown.join(", ")}]`,
  );
}

const entries = SHIP_ORDER.map((key) => {
  const variant = VARIANTS.find((v) => v.key === key);
  if (!variant) throw new Error(`gen-presets: variant not found: ${key}`);
  const css = key === "base" ? "" : variant.css;
  return `  { id: ${JSON.stringify(key)}, name: ${JSON.stringify(SHIP_NAMES[key])}, css: ${JSON.stringify(css)} },`;
});

const file = `/**
 * GENERATED from the prototype theme lab (prototype/variants/*). Do not hand-edit —
 * regenerate with \`npm run gen:presets\` after any theme change under prototype/variants.
 * Each preset's \`css\` layers AFTER BASE_THEME_CSS (see buildThemeCss); \`id\` is the
 * stable slug, \`name\` is the user-facing dropdown label. Classic Film (id "base") is
 * the empty layer = today's default look.
 */
import type { ThemePreset } from "./index";

export const RAW_PRESETS: ReadonlyArray<ThemePreset> = [
${entries.join("\n")}
];
`;

const out = resolve(__dirname, "../src/view/themes/presets.ts");
writeFileSync(out, file, "utf8");
console.log(`gen-presets: wrote ${out} (${VARIANTS.length} presets)`);
