const R = require("ramda");

const EnumGenerator = require("./EnumGenerator.js");
const XWingConverter = require("./XWingConverter.js");

const INPUT_FILE = "https://cdn.jsdelivr.net/npm/xwing-data@1.0.1/data/ships.js";
const CLASS_NAME = "Maneuver";
const BEARING_MAP = {
   "T": "Turn Left",
   "B": "Bank Left",
   "F": "Straight",
   "N": "Bank Right",
   "Y": "Turn Right",
   "K": "Koiogran Turn",
   "R": "Tallon Roll Right",
   "E": "Tallon Roll Left",
   "L": "Segnor's Loop Left",
   "P": "Segnor's Loop Right",
   "A": "Reverse Bank Left",
   "D": "Reverse Bank Right",
   "S": "Reverse Straight",
   "O": "Stationary",
};
const DIFFICULTY_MAP = {
   "G": "Easy",
   "W": "Standard",
   "R": "Hard"
};

const createData = card => key =>
{
   const parts = card.split(" ");
   let index = parts.length - 1;
   const dial = parts[index--];
   const difficulty = parts[index--];
   const speed = parseInt(parts[index--]);
   let bearing = "";
   for (let i = 0; i <= index; i++)
   {
      bearing += parts[i];
      bearing += (i < index ? " " : "");
   }

   return (
   {
      name: card,
      speed: speed,
      bearing: bearing,
      difficulty: difficulty,
      dial: dial,
      key: key,
   });
};

function determineData(data)
{
   const answer = data.reduce((accumulator, card) =>
   {
      if (card.dial !== undefined)
      {
         card.dial.forEach(element =>
         {
            const speed = parseInt(element.charAt(0));
            const bearing = BEARING_MAP[element.charAt(1)];
            const difficulty = DIFFICULTY_MAP[element.charAt(2)];
            accumulator = EnumGenerator.pushUnique(accumulator, bearing + " " + speed + " " + difficulty + " " + element);
         });
      }
      else
      {
         console.log("Missing dial for ship " + card.name);
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