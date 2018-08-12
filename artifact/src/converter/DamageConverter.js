const XWingConverter = require("./XWingConverter.js");

const INPUT_FILE = "https://cdn.jsdelivr.net/npm/xwing-data@1.0.1/data/damage-deck-core.js";
const CLASS_NAME = "DamageCard";

XWingConverter.convert(INPUT_FILE, CLASS_NAME);