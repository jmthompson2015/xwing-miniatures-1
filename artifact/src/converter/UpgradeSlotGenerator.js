const R = require("ramda");

const EnumGenerator = require("./EnumGenerator.js");
const XWingConverter = require("./XWingConverter.js");

const INPUT_FILE = "https://cdn.jsdelivr.net/npm/xwing-data@1.0.1/data/upgrades.js";
const CLASS_NAME = "UpgradeSlot";

const createData = card => key =>
{
   const slotName = card.toLowerCase().replace(/[.()]/g, "").replace(/[ /]/g, "-");
   const image = (slotName !== undefined ? "upgrade-slot/" + slotName + ".png" : undefined);

   return (
   {
      name: card,
      image: image,
      key: key,
   });
};

function determineData(data)
{
   const answer = data.reduce((accumulator, card) => EnumGenerator.pushUnique(accumulator, card.slot), []);
   answer.sort();

   return answer;
}

// xws values.
const OPTIONS = R.pipe(
   R.assoc("determineData", determineData),
   R.assoc("createData", createData)
)(XWingConverter.DEFAULT_OPTIONS);

XWingConverter.convert(INPUT_FILE, CLASS_NAME, OPTIONS);