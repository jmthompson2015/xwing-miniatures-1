const R = require("ramda");

const EnumGenerator = require("./EnumGenerator.js");
const XWingConverter = require("./XWingConverter.js");

const INPUT_FILE = "https://cdn.jsdelivr.net/npm/xwing-data@1.0.1/data/ships.js";
const CLASS_NAME = "ShipAction";

const createData = card => key => ({
  name: card,
  key
});

function determineData(data) {
  const answer = data.reduce((accumulator, card) => {
    let accum = accumulator;
    card.actions.forEach(action => {
      accum = EnumGenerator.pushUnique(accum, action);
    });
    return accum;
  }, []);
  answer.push("Decloak");
  answer.sort();

  return answer;
}

// xws values.
const OPTIONS = R.pipe(
  R.assoc("determineData", determineData),
  R.assoc("createData", createData)
)(XWingConverter.DEFAULT_OPTIONS);

XWingConverter.convert(INPUT_FILE, CLASS_NAME, OPTIONS);
