const fs = require('fs');
const R = require("ramda");

const EnumGenerator = {};

EnumGenerator.createEnumName = function(options, card)
{
   let name = card;

   if (typeof card === "object")
   {
      name = options.determineCardName(card);
      name = (R.contains(card.xws, options.appendFaction) ? append(card.faction)(name) : name);
      name = (R.contains(card.xws, options.appendHotr) ? appendHotr(name) : name);
      name = (R.contains(card.xws, options.appendId) ? append(card.id)(name) : name);
      name = (R.contains(card.xws, options.appendShip) ? append(card.ship)(name) : name);
      name = (R.contains(card.xws, options.appendSlot) ? append(card.slot)(name) : name);
   }

   const answer = R.pipe(
      R.replace("(-1)", "decrease"),
      R.replace("(+1)", "increase"),
      R.replace(/[().!#'"’]/g, ""),
      R.replace(/[- /]/g, "_"),
      R.toUpper,
      R.replace("4_LOM", "FOUR_LOM")
   )(name);

   return answer;
};

EnumGenerator.createEnumValue = function(options, card)
{
   let name = card;

   if (typeof card === "object")
   {
      name = options.determineCardName(card);
      name = (R.contains(card.xws, options.appendFaction) ? append(card.faction)(name) : name);
      name = (R.contains(card.xws, options.appendHotr) ? appendHotr(name) : name);
      name = (R.contains(card.xws, options.appendId) ? append(card.id)(name) : name);
      name = (R.contains(card.xws, options.appendShip) ? append(card.ship)(name) : name);
      name = (R.contains(card.xws, options.appendSlot) ? append(card.slot)(name) : name);
   }

   const answer = R.pipe(
      R.replace("(-1)", "decrease"),
      R.replace("(+1)", "increase"),
      R.replace(/[().!#'"’]/g, ""),
      R.replace(/[-/]/g, " "),
      R.replace("4 LOM", "four lom")
   )(name);

   return toCamelCase(answer);
};

EnumGenerator.pushUnique = function(array, element)
{
   let answer = array;

   if (!array.includes(element))
   {
      answer = array.slice();
      answer.push(element);
   }

   return answer;
};

EnumGenerator.writeFile = function(outputFile, content)
{
   fs.writeFile(outputFile, content, err =>
   {
      // throws an error, you could also catch it here
      if (err)
      {
         throw err;
      }

      // success case, the file was saved
      console.log(`${outputFile} saved`);
   });
};

const append = value => name => name + "_" + value;

const appendHotr = name => append("hotr")(name);

function toCamelCase(str)
{
   return str.split(' ').map(function(word, index)
   {
      // If it is the first word make sure to lowercase all the chars.
      if (index == 0)
      {
         return word.toLowerCase();
      }

      // If it is not the first word only upper case the first char and lowercase the rest.
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
   }).join('');
}

module.exports = EnumGenerator;