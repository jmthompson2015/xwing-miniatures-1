/* eslint no-console: ["error", { allow: ["log"] }] */

const R = require("ramda");

const EnumGenerator = require("./EnumGenerator.js");
const XWingConverter = require("./XWingConverter.js");

const INPUT_FILE = "https://cdn.jsdelivr.net/npm/xwing-data@1.0.1/data/ships.js";
const CLASS_NAME = "Maneuver";
const BEARING_MAP = {
  T: "Turn Left",
  B: "Bank Left",
  F: "Straight",
  N: "Bank Right",
  Y: "Turn Right",
  K: "Koiogran Turn",
  R: "Tallon Roll Right",
  E: "Tallon Roll Left",
  L: "Segnor's Loop Left",
  P: "Segnor's Loop Right",
  A: "Reverse Bank Left",
  D: "Reverse Bank Right",
  S: "Reverse Straight",
  O: "Stationary"
};
const DIFFICULTY_MAP = {
  G: "Easy",
  W: "Standard",
  R: "Hard"
};

const createData = card => key => {
  const parts = card.split(" ");
  let index = parts.length - 1;
  const dial = parts[index];
  index -= 1;
  const difficulty = parts[index];
  index -= 1;
  const speed = parseInt(parts[index], 10);
  index -= 1;
  let bearing = "";
  for (let i = 0; i <= index; i += 1) {
    bearing += parts[i];
    bearing += i < index ? " " : "";
  }

  return {
    name: card,
    speed,
    bearing,
    difficulty,
    dial,
    key
  };
};

function determineData(data) {
  const answer = data.reduce((accumulator, card) => {
    let accum = accumulator;
    if (card.dial !== undefined) {
      card.dial.forEach(element => {
        const speed = parseInt(element.charAt(0), 10);
        const bearing = BEARING_MAP[element.charAt(1)];
        const difficulty = DIFFICULTY_MAP[element.charAt(2)];
        accum = EnumGenerator.pushUnique(accum, `${bearing} ${speed} ${difficulty} ${element}`);
      });
    } else {
      console.log(`Missing dial for ship ${card.name}`);
    }
    return accum;
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
