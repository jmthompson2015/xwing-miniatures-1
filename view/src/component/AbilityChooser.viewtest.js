import TestData from "../TestData.js";

import AbilityChooser from "./AbilityChooser.js";

const abilities = TestData.createAbilities();

const element = React.createElement(AbilityChooser,
{
   abilities: abilities,
   initialAbility: abilities[2],
   onChange: callback
});
ReactDOM.render(element, document.getElementById("inputPanel"));

function callback(ability)
{
   console.log("ability = " + JSON.stringify(ability, null, "   "));
}