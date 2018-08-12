const R = require("ramda");

const EnumGenerator = require("./EnumGenerator.js");
const JSONFileLoader = require("./JSONFileLoader.js");

const XWingConverter = {};

XWingConverter.DEFAULT_OPTIONS = {
   appendFaction: [],
   appendHotr: [],
   appendId: [],
   appendShip: [],
   appendSlot: [],
   createData: card => key => R.assoc("key", key, card),
   determineCardName: card => card.name,
   determineData: data0 => R.sort(enumValueCompare, data0)
};

XWingConverter.convert = function(inputFile, className, options = XWingConverter.DEFAULT_OPTIONS)
{
   XWingConverter.INPUT_FILE = inputFile;
   XWingConverter.CLASS_NAME = className;
   XWingConverter.OPTIONS = options;
   XWingConverter.OUTPUT_FILE = "../" + XWingConverter.CLASS_NAME + ".js";

   JSONFileLoader.loadFile(XWingConverter.INPUT_FILE).then(data =>
   {
      const content = processData(data);
      EnumGenerator.writeFile(XWingConverter.OUTPUT_FILE, content);
   });
};

function createFreezeFunction(className)
{
   return `Object.freeze(${className});`;
}

function enumValueCompare(a, b)
{
   const aValue = EnumGenerator.createEnumValue(XWingConverter.OPTIONS, a);
   const bValue = EnumGenerator.createEnumValue(XWingConverter.OPTIONS, b);

   return (aValue > bValue ? 1 : (aValue < bValue ? -1 : 0));
}

function processData(data0)
{
   const determineData = XWingConverter.OPTIONS.determineData;
   const data = determineData(data0);

   const prefix0 = `const ${XWingConverter.CLASS_NAME} = {`;
   const enums = data.reduce((accumulator, card) =>
   {
      const enumName = EnumGenerator.createEnumName(XWingConverter.OPTIONS, card);
      const enumValue = EnumGenerator.createEnumValue(XWingConverter.OPTIONS, card);
      return accumulator + `
  ${enumName}: "${enumValue}",`;
   }, "");
   const suffix0 = `};`;
   const prefix1 = `
${XWingConverter.CLASS_NAME}.properties = `;
   const enumProperties = {};
   const createData = XWingConverter.OPTIONS.createData;

   data.forEach(card =>
   {
      const key = EnumGenerator.createEnumValue(XWingConverter.OPTIONS, card);
      if (enumProperties[key] !== undefined)
      {
         console.error(`Overwriting card with key ${key} card0 = ${enumProperties[key].name} ${enumProperties[key].xws} ${enumProperties[key].faction} ${enumProperties[key].ship} ${enumProperties[key].slot}`);
         console.error(`Overwriting card with key ${key} card  = ${card.name} ${card.xws} ${card.faction} ${card.ship} ${card.slot}`);
      }
      enumProperties[key] = createData(card)(key);
   });

   const content = JSON.stringify(enumProperties, null, 3) + ";\n";
   const freeze = createFreezeFunction(XWingConverter.CLASS_NAME);
   const suffix1 = `
export default ${XWingConverter.CLASS_NAME};`;

   return `${prefix0}
${enums}
${suffix0}
${prefix1}
${content}
${freeze}
${suffix1}`;
}

module.exports = XWingConverter;