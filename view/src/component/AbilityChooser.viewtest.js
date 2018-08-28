/* eslint no-console: ["error", { allow: ["log"] }] */

import TestData from "../TestData.js";

import AbilityChooser from "./AbilityChooser.js";

const abilities = TestData.createAbilities();

function callback(ability) {
  console.log(`ability = ${JSON.stringify(ability, null, "   ")}`);
}

const element = React.createElement(AbilityChooser, {
  abilities,
  initialAbility: abilities[2],
  onChange: callback
});
ReactDOM.render(element, document.getElementById("inputPanel"));
