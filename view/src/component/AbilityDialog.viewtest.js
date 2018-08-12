import TestData from "../TestData.js";

import AbilityDialog from "./AbilityDialog.js";

const abilities = TestData.createAbilities();
const activePilotName = "activePilotName";

const element = React.createElement(AbilityDialog,
{
   abilities: abilities,
   activePilotName: activePilotName,
   onChange: myCallback,
});
ReactDOM.render(element, document.getElementById("inputPanel"));

function myCallback(ability)
{
   console.log("myCallback() ability = " + JSON.stringify(ability));
}