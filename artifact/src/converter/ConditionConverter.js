const XWingConverter = require("./XWingConverter.js");

const INPUT_FILE = "https://cdn.jsdelivr.net/npm/xwing-data@1.0.1/data/conditions.js";
const CLASS_NAME = "ConditionCard";

XWingConverter.convert(INPUT_FILE, CLASS_NAME);
