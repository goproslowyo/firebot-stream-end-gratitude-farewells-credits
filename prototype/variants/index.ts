/**
 * PROTOTYPE — ordered variant registry for the preview harness.
 * "base" is today's shipped look (empty CSS layer), then the 8 candidate themes:
 * the user's four picks, then the four designer wildcards.
 */
import { VARIANT as arcade } from "./arcade";
import { VARIANT as crtTerminal } from "./crt-terminal";
import { VARIANT as dnb } from "./dnb";
import { VARIANT as house } from "./house";
import { VARIANT as jazz } from "./jazz";
import { VARIANT as luna } from "./luna";
import { VARIANT as melodic } from "./melodic";
import { VARIANT as neoNoir } from "./neo-noir";
import { VARIANT as playbill } from "./playbill";
import { VARIANT as questLog } from "./quest-log";
import { VARIANT as rocket } from "./rocket";
import { VARIANT as rollerDisco } from "./roller-disco";
import { VARIANT as spaceCrawl } from "./space-crawl";
import { VARIANT as synthwave } from "./synthwave";
import { VARIANT as techno } from "./techno";
import { VARIANT as ufo } from "./ufo";
import type { ThemeVariant } from "./variant";
import { VARIANT as vhs } from "./vhs";
import { VARIANT as fighter } from "./fighter";
import { VARIANT as rpg } from "./rpg";
import { VARIANT as handheld } from "./handheld";
import { VARIANT as speedrun } from "./speedrun";
import { VARIANT as voxel } from "./voxel";
import { VARIANT as esports } from "./esports";
import { VARIANT as pwned } from "./pwned";
import { VARIANT as netrunner } from "./netrunner";
import { VARIANT as cipher } from "./cipher";
import { VARIANT as cdj } from "./cdj";
import { VARIANT as mainstage } from "./mainstage";
import { VARIANT as lofi } from "./lofi";
import { VARIANT as boombox } from "./boombox";
import { VARIANT as diner } from "./diner";
import { VARIANT as signoff } from "./signoff";
import { VARIANT as scrapbook } from "./scrapbook";
import { VARIANT as aurora } from "./aurora";
import { VARIANT as abyss } from "./abyss";
import { VARIANT as heist } from "./heist";
import { VARIANT as grandprix } from "./grandprix";

export type { ThemeVariant } from "./variant";

export const VARIANTS: ReadonlyArray<ThemeVariant> = [
  { key: "base", name: "Classic Film (ship default)", css: "" },
  synthwave,
  crtTerminal,
  arcade,
  spaceCrawl,
  playbill,
  questLog,
  neoNoir,
  vhs,
  // Music set (second round): organic/melodic, techno/trance, house,
  // nu-disco/funk with the 2.5D skater, drum & bass.
  melodic,
  techno,
  house,
  rollerDisco,
  dnb,
  luna,
  jazz,
  ufo,
  rocket,
  // Fourth round: 20 stream-culture themes (DJ / gaming / cyber / everything).
  fighter,
  rpg,
  handheld,
  speedrun,
  voxel,
  esports,
  pwned,
  netrunner,
  cipher,
  cdj,
  mainstage,
  lofi,
  boombox,
  diner,
  signoff,
  scrapbook,
  aurora,
  abyss,
  heist,
  grandprix,
];
