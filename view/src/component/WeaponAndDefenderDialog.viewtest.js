/* eslint no-console: ["error", { allow: ["log"] }] */

import TestData from "../TestData.js";

import WeaponAndDefenderDialog from "./WeaponAndDefenderDialog.js";

let gameState = TestData.createGameState();
const position1 = XMS.PositionState.create({
  x: 380,
  y: 915 - 100,
  heading: 90
});
const position2 = XMS.PositionState.create({
  x: (915 * 2) / 3,
  y: 915 - 180,
  heading: 90
});
gameState = R.assocPath(["pilotInstances", 1, "position"], position1, gameState);
gameState = R.assocPath(["pilotInstances", 2, "position"], position2, gameState);

const attackerInstance = gameState.pilotInstances[3];
const weaponToRangeToDefenders0 = XMM.AgentUtilities.determineWeaponToRangeToDefenders(
  attackerInstance,
  gameState
);

let weaponToRangeToDefenders = weaponToRangeToDefenders0;
Object.keys(weaponToRangeToDefenders).forEach(weaponKey => {
  const rangeToDefenders = weaponToRangeToDefenders[weaponKey];

  Object.keys(rangeToDefenders).forEach(rangeKey => {
    const defenderIds = rangeToDefenders[rangeKey];
    const newDefenders = R.map(id => XMS.Selector.pilotInstance(id, gameState), defenderIds);
    weaponToRangeToDefenders = R.assocPath(
      [weaponKey, rangeKey],
      newDefenders,
      weaponToRangeToDefenders
    );
  });
});

const myCallback = ({ attackerId, weaponKey, defenderId }) => {
  console.log(
    `myCallback() attackerId = ${attackerId} weaponKey = ${weaponKey} defenderId = ${defenderId}`
  );
};

const element = React.createElement(WeaponAndDefenderDialog, {
  attackerInstance,
  weaponToRangeToDefenders,
  callback: myCallback
});
ReactDOM.render(element, document.getElementById("inputArea1"));
