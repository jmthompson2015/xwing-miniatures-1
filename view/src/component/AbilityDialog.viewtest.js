/* eslint no-console: ["error", { allow: ["log"] }] */

import TestData from "../TestData.js";

import AbilityDialog from "./AbilityDialog.js";

const abilities = TestData.createAbilities();
const activePilotName = "activePilotName";

function myCallback(ability) {
  console.log(`myCallback() ability = ${JSON.stringify(ability)}`);
}

const element = React.createElement(AbilityDialog, {
  abilities,
  activePilotName,
  onChange: myCallback
});
ReactDOM.render(element, document.getElementById("inputPanel"));
