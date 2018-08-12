const R = require("ramda");

const EnumGenerator = require("./EnumGenerator.js");
const XWingConverter = require("./XWingConverter.js");

const INPUT_FILE = "https://cdn.jsdelivr.net/npm/xwing-data@1.0.1/data/ships.js";
const CLASS_NAME = "Ship";

const createData = card => key =>
{
   let answer = card;
   const shipName = card.name.toLowerCase().replace(/[.()]/g, "").replace(/[ /]/g, "-");

   if (card.faction !== undefined)
   {
      const mapFunction = faction =>
      {
         const factionName = faction.toLowerCase().replace(/[ ]/g, "-");
         return "ship/" + factionName + "/" + shipName + ".png";
      };
      const images = R.map(mapFunction, card.faction);

      answer = R.assoc("images", images, card);
   }

   const silhouette = "silhouette/" + shipName + ".png";
   answer = R.assoc("silhouette", silhouette, answer);

   return R.assoc("key", key, answer);
};

const determineData = data => R.pipe(R.map(mapFunction), sortFunction)(data);

const mapFunction = card => R.dissoc("maneuvers", card);
const sortFunction = R.sort(enumValueCompare);

function enumValueCompare(a, b)
{
   const aValue = EnumGenerator.createEnumValue(XWingConverter.OPTIONS, a);
   const bValue = EnumGenerator.createEnumValue(XWingConverter.OPTIONS, b);

   return (aValue > bValue ? 1 : (aValue < bValue ? -1 : 0));
}

const OPTIONS = R.pipe(
   R.assoc("createData", createData),
   R.assoc("determineData", determineData)
)(XWingConverter.DEFAULT_OPTIONS);

XWingConverter.convert(INPUT_FILE, CLASS_NAME, OPTIONS);