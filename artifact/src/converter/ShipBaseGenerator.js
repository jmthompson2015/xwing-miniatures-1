const R = require("ramda");

const EnumGenerator = require("./EnumGenerator.js");
const XWingConverter = require("./XWingConverter.js");

const INPUT_FILE = "https://cdn.jsdelivr.net/npm/xwing-data@1.0.1/data/ships.js";
const CLASS_NAME = "ShipBase";

const createData = card => key =>
{
   const width = R.cond([
     [R.equals("small"), R.always(40)], // small
     [R.equals("large"), R.always(80)], // large
     [R.equals("huge"), R.always(192)]
   ])(card);
   const height = R.cond([
     [R.equals("small"), R.always(40)], // small
     [R.either(R.equals("large"), R.equals("huge")), R.always(80)]
   ])(card);

   return (
   {
      name: card,
      width: width,
      height: height,
      key: key,
   });
};

function determineData(data)
{
   const answer = data.reduce((accumulator, card) => EnumGenerator.pushUnique(accumulator, card.size), []);
   answer.sort();

   return answer;
}

// xws values.
const OPTIONS = R.pipe(
   R.assoc("determineData", determineData),
   R.assoc("createData", createData)
)(XWingConverter.DEFAULT_OPTIONS);

XWingConverter.convert(INPUT_FILE, CLASS_NAME, OPTIONS);