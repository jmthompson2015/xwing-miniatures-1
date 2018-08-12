const R = require("ramda");

const EnumGenerator = require("./EnumGenerator.js");
const XWingConverter = require("./XWingConverter.js");

const INPUT_FILE = "https://cdn.jsdelivr.net/npm/xwing-data@1.0.1/data/pilots.js";
const CLASS_NAME = "Faction";

const createData = card => key =>
{
   const shortName = R.cond([
     [R.equals("firstOrder"), R.always("FirstOrder")], // First Order
     [R.equals("galacticEmpire"), R.always("Imperial")], // Imperial
     [R.equals("rebelAlliance"), R.always("Rebel")], // Rebel
     [R.equals("resistance"), R.always("Resistance")], // Resistance
     [R.equals("scumAndVillainy"), R.always("Scum")]
   ])(key);
   const color = R.cond([
    [R.either(R.equals("galacticEmpire"), R.equals("firstOrder")), R.always("rgb(0, 255, 0)")], // Imperial
    [R.either(R.equals("rebelAlliance"), R.equals("resistance")), R.always("red")], // Rebel
    [R.equals("scumAndVillainy"), R.always("rgb(255, 215, 0)")]
   ])(key);
   const image = "factions/" + card.toLowerCase().replace(/ /g, "-") + ".png";

   return (
   {
      name: card,
      shortName: shortName,
      color: color,
      image: image,
      key: key,
   });
};

function determineData(data)
{
   const answer = data.reduce((accumulator, card) => EnumGenerator.pushUnique(accumulator, card.faction), []);
   answer.sort();

   return answer;
}

// xws values.
const OPTIONS = R.pipe(
   R.assoc("determineData", determineData),
   R.assoc("createData", createData)
)(XWingConverter.DEFAULT_OPTIONS);

XWingConverter.convert(INPUT_FILE, CLASS_NAME, OPTIONS);