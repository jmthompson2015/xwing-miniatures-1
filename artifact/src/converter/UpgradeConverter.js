const R = require("ramda");

const XWingConverter = require("./XWingConverter.js");

const INPUT_FILE = "https://cdn.jsdelivr.net/npm/xwing-data@1.0.1/data/upgrades.js";
const CLASS_NAME = "UpgradeCard";

// xws values.
const OPTIONS = R.pipe(
  R.assoc("appendHotr", ["millenniumfalcon-swx57"]),
  R.assoc("appendId", ["ghost", "ghost-swx72"]),
  R.assoc("appendSlot", ["chopper", "chopper-swx72", "r2d2", "r2d2-swx22"])
)(XWingConverter.DEFAULT_OPTIONS);

XWingConverter.convert(INPUT_FILE, CLASS_NAME, OPTIONS);
