import HumanAgentStrategy from "./HumanAgentStrategy.js";
import TestData from "./TestData.js";

const convertWeaponRangeDefenders = (weaponToRangeToDefenders, state) =>
{
   let answer = weaponToRangeToDefenders;
   const weaponKeys = Object.keys(weaponToRangeToDefenders);

   R.forEach(weaponKey =>
   {
      const rangeToDefenders = weaponToRangeToDefenders[weaponKey];
      const rangeKeys = Object.keys(rangeToDefenders);

      R.forEach(rangeKey =>
      {
         const defenderIds = rangeToDefenders[rangeKey];
         const defenderInstances = R.map(id => XMS.Selector.pilotInstance(id, state), defenderIds);
         answer = R.assocPath([weaponKey, rangeKey], defenderInstances, answer);
      }, rangeKeys);
   }, weaponKeys);

   return answer;
};

const createPilotToValidManeuvers = R.reduce((accum, pilot) =>
{
   const shipKey = XMA.Selector.shipKeyByPilot(pilot.pilotKey);
   const maneuverKeys = XMA.Selector.maneuverKeysByShip(shipKey);
   return R.assoc(pilot.id, maneuverKeys, accum);
},
{});

{
   const store = Redux.createStore(XMS.Reducer.root, TestData.createGameState());
   const pilotInstances = XMS.Selector.pilotInstancesBySquad(1, store.getState());
   const pilotToValidManeuvers = createPilotToValidManeuvers(pilotInstances);
   HumanAgentStrategy.chooseManeuvers(pilotInstances, pilotToValidManeuvers, "panel1")
      .then(pilotToManeuver => console.log("pilotToManeuver = " + JSON.stringify(pilotToManeuver)));
}

{
   const store = Redux.createStore(XMS.Reducer.root, TestData.createGameState());
   const position1 = XMS.PositionState.create(
   {
      x: 380,
      y: 915 - 100,
      heading: 90
   });
   const position2 = XMS.PositionState.create(
   {
      x: 915 * 2 / 3,
      y: 915 - 180,
      heading: 90
   });
   store.dispatch(XMS.ActionCreator.movePilot(1, position1));
   store.dispatch(XMS.ActionCreator.movePilot(2, position2));

   const attackerInstance = XMS.Selector.pilotInstance(3, store.getState());
   console.log("attackerInstance = " + JSON.stringify(attackerInstance));
   const weaponToRangeToDefenders0 = XMM.AgentUtilities.determineWeaponToRangeToDefenders(attackerInstance, store.getState());
   console.log("weaponToRangeToDefenders0 = " + JSON.stringify(weaponToRangeToDefenders0));
   const weaponToRangeToDefenders = convertWeaponRangeDefenders(weaponToRangeToDefenders0, store.getState());
   console.log("weaponToRangeToDefenders = " + JSON.stringify(weaponToRangeToDefenders));
   HumanAgentStrategy.chooseWeaponAndDefender(attackerInstance, weaponToRangeToDefenders, "panel2").then((
   {
      attackerId,
      weaponKey,
      defenderId
   }) => console.log("attackerId = " + attackerId + " weaponKey = " + weaponKey + " defenderId = " + defenderId));
}