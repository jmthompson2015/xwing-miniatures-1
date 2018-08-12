import Selector from "../Selector.js";
import TestData from "../TestData.js";

import PlanningDialog from "./PlanningDialog.js";

const myCallback = function(
{
   pilotToManeuver
})
{
   console.log("myCallback() pilotToManeuver = " + JSON.stringify(pilotToManeuver));
};
const gameState = TestData.createGameState();

const createPilotToValidManeuvers = R.reduce((accum, pilot) =>
{
   const shipKey = XMA.Selector.shipKeyByPilot(pilot.pilotKey);
   const maneuverKeys = XMA.Selector.maneuverKeysByShip(shipKey);
   return R.assoc(pilot.id, maneuverKeys, accum);
},
{});

const pilotInstances1 = Selector.pilotInstancesByAgent(1, gameState);
const pilotToValidManeuvers1 = createPilotToValidManeuvers(pilotInstances1);
const element1 = React.createElement(PlanningDialog,
{
   callback: myCallback,
   pilotInstances: pilotInstances1,
   pilotToValidManeuvers: pilotToValidManeuvers1
});
ReactDOM.render(element1, document.getElementById("inputArea1"));

const pilotInstances2 = Selector.pilotInstancesByAgent(2, gameState);
const pilotToValidManeuvers2 = createPilotToValidManeuvers(pilotInstances2);
const element2 = React.createElement(PlanningDialog,
{
   callback: myCallback,
   pilotInstances: pilotInstances2,
   pilotToValidManeuvers: pilotToValidManeuvers2
});
ReactDOM.render(element2, document.getElementById("inputArea2"));