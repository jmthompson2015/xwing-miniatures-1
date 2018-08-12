const R = require("ramda");

const EnumGenerator = require("./EnumGenerator.js");
const XWingConverter = require("./XWingConverter.js");

const INPUT_FILE = "https://cdn.jsdelivr.net/npm/xwing-data@1.0.1/data/ships.js";
const CLASS_NAME = "FiringArc";

const createData = card => key =>
{
   let minAngle;
   let maxAngle;

   switch (key)
   {
      case "auxiliary180":
         minAngle = 360 - 90;
         maxAngle = 90;
         break;
      case "auxiliaryRear":
         minAngle = 180 - 45;
         maxAngle = 180 + 45;
         break;
      case "front":
         minAngle = 360 - 45;
         maxAngle = 45;
         break;
      case "turret":
         minAngle = 0;
         maxAngle = 359;
         break;
   }

   return (
   {
      name: card,
      minAngle: minAngle,
      maxAngle: maxAngle,
      key: key,
   });
};

function determineData(data)
{
   const answer = data.reduce((accumulator, card) =>
   {
      if (card.firing_arcs !== undefined)
      {
         card.firing_arcs.forEach(firingArc =>
         {
            accumulator = EnumGenerator.pushUnique(accumulator, firingArc);
         });
      }
      return accumulator;
   }, []);
   answer.sort();

   return answer;
}

// xws values.
const OPTIONS = R.pipe(
   R.assoc("determineData", determineData),
   R.assoc("createData", createData)
)(XWingConverter.DEFAULT_OPTIONS);

XWingConverter.convert(INPUT_FILE, CLASS_NAME, OPTIONS);