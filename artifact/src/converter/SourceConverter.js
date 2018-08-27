const XWingConverter = require("./XWingConverter.js");

const INPUT_FILE = "https://cdn.jsdelivr.net/npm/xwing-data@1.0.1/data/sources.js";
const CLASS_NAME = "Source";

XWingConverter.convert(INPUT_FILE, CLASS_NAME);
