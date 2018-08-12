const R = require("ramda");

const EnumGenerator = require("./EnumGenerator.js");
const XWingConverter = require("./XWingConverter.js");

const INPUT_FILE = "https://cdn.jsdelivr.net/npm/xwing-data@1.0.1/data/reference-cards.js";
const CLASS_NAME = "ReferenceCard";

const determineCardName = card => card.title + (card.subtitle !== "Reference Card" ? "_" + card.subtitle : "");

const determineData = data0 =>
{
   let count = data0.length + 1;
   const referenceCard1 = {
      "id": count++,
      "title": "Acquire a Target Lock Action",
      "subtitle": "Reference Card",
      "image": "reference-card/acquire-a-target-lock-action.png",
   };
   const referenceCard2 = {
      "id": count++,
      "title": "Alternate Primary Weapons",
      "subtitle": "Reference Card",
      "image": "reference-card/alternate-primary-weapons.png",
   };
   const referenceCard3 = {
      "id": count++,
      "title": "Barrel Roll Action",
      "subtitle": "Reference Card",
      "image": "reference-card/barrel-roll-action.png",
   };
   const referenceCard4 = {
      "id": count++,
      "title": "Evade Action",
      "subtitle": "Reference Card",
      "image": "reference-card/evade-action.png",
   };
   const referenceCard5 = {
      "id": count++,
      "title": "Focus Action",
      "subtitle": "Reference Card",
      "image": "reference-card/focus-action.png",
   };
   const referenceCard6 = {
      "id": count++,
      "title": "Stress Token",
      "subtitle": "Reference Card",
      "image": "reference-card/stress-token.png",
   };
   const referenceCard7 = {
      "id": count++,
      "title": "The Combat Phase",
      "subtitle": "Reference Card",
      "image": "reference-card/the-combat-phase.png",
   };
   const referenceCard8 = {
      "id": count++,
      "title": "The Game Round",
      "subtitle": "Reference Card",
      "image": "reference-card/the-game-round.png",
   };
   let data = R.append(referenceCard1, data0);
   data = R.append(referenceCard2, data);
   data = R.append(referenceCard3, data);
   data = R.append(referenceCard4, data);
   data = R.append(referenceCard5, data);
   data = R.append(referenceCard6, data);
   data = R.append(referenceCard7, data);
   data = R.append(referenceCard8, data);

   return R.sort(enumValueCompare, data);
};

function enumValueCompare(a, b)
{
   const aValue = EnumGenerator.createEnumValue(XWingConverter.OPTIONS, a);
   const bValue = EnumGenerator.createEnumValue(XWingConverter.OPTIONS, b);

   return (aValue > bValue ? 1 : (aValue < bValue ? -1 : 0));
}

const OPTIONS = R.pipe(
   R.assoc("determineCardName", determineCardName),
   R.assoc("determineData", determineData)
)(XWingConverter.DEFAULT_OPTIONS);

XWingConverter.convert(INPUT_FILE, CLASS_NAME, OPTIONS);