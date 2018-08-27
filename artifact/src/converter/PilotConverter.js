const R = require("ramda");

const XWingConverter = require("./XWingConverter.js");

const INPUT_FILE = "https://cdn.jsdelivr.net/npm/xwing-data@1.0.1/data/pilots.js";
const CLASS_NAME = "PilotCard";

const APPEND_V2 = [
  "blackSunAce",
  "blackSunAssassin",
  "captainJostero",
  "cartelMarauder",
  "countessRyad",
  "daggerSquadronPilot",
  "dalanOberos_starViper",
  "deathfire",
  "felsWrath",
  "gammaSquadronVeteran",
  "gemmerSojan",
  "genesisRed",
  "glaiveSquadronPilot",
  "inaldra",
  "jakeFarrell",
  "jessPava",
  "keyanFarlander",
  "lieutenantLorrir",
  "neraDantels",
  "nienNunb",
  "poeDameron_hotr",
  "prototypePilot",
  "quinnJast",
  "saberSquadronPilot",
  "snapWexley",
  "soontirFel",
  "sunnyBounder",
  "tetranCowall",
  "thweek",
  "tomaxBren",
  "turrPhennir",
  "viktorHel"
];
const APPEND_V3 = ["carnorJax", "kirKanos", "royalGuardPilot"];

const appendToImage = image => suffix => {
  const index = image.lastIndexOf(".");
  return R.concat(image.substring(0, index), R.concat(suffix, image.substring(index)));
};

const contains = key => array => R.always(R.contains(key, array));

const createShipImage = card => {
  const shipName = card.ship
    .toLowerCase()
    .replace(/[.()]/g, "")
    .replace(/[ /]/g, "-");
  return R.concat("ships/", R.concat(card.faction, R.concat("/", R.concat(shipName, ".png"))));
};

const createData = card => key => {
  const shipImage = createShipImage(card);
  const assocShipImage = suffix => R.assoc("ship_image", appendToImage(shipImage)(suffix));

  let answer = R.ifElse(contains(key)(APPEND_V2), assocShipImage("-v2"), R.identity)(card);
  answer = R.ifElse(contains(key)(APPEND_V3), assocShipImage("-v3"), R.always(answer))(card);

  return R.assoc("key", key, answer);
};

// xws values.
const OPTIONS = R.pipe(
  R.assoc("appendFaction", [
    "bobafett",
    "captainnym",
    "chewbacca",
    "chewbacca-swx57",
    "fennrau",
    "hansolo",
    "hansolo-swx57",
    "kathscarlet"
  ]),
  R.assoc("appendHotr", ["poedameron-swx57"]),
  R.assoc("appendShip", [
    "dalanoberos",
    "ezrabridger",
    "herasyndulla",
    "kyloren",
    "maarekstele",
    "sabinewren",
    "zeborrelios"
  ]),
  R.assoc("createData", createData)
)(XWingConverter.DEFAULT_OPTIONS);

XWingConverter.convert(INPUT_FILE, CLASS_NAME, OPTIONS);
