/* eslint no-console: ["error", { allow: ["log"] }] */

import TestData from "../TestData.js";

import CombatDialog from "./CombatDialog.js";

function myOK0(ability) {
  console.log(`myOK0() ability = ${JSON.stringify(ability)} ${typeof ability}`);
}

function myOK1(ability) {
  console.log(`myOK1() ability = ${JSON.stringify(ability)} ${typeof ability}`);
}

function myOK2() {
  console.log("myOK2()");
}

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

const combatId = 1;
const attackerInstance = gameState.pilotInstances[3];
const defenderInstance = gameState.pilotInstances[1];

const combatInstance = XMS.CombatState.create({
  id: combatId,
  attackerId: 3,
  defenderId: 1
});
gameState = R.assocPath(["combatInstances", combatId], combatInstance, gameState);

const createAbility = (sourceName, sourceKey, context) =>
  XMS.AbilityState.create({
    sourceName,
    sourceKey,
    context
  });

const attackDiceCount = XMM.DiceUtilities.computeAttackDiceCount(combatId, gameState);
const attackDiceKeys = XMM.DiceUtilities.rollAttackDice(attackDiceCount);
gameState = R.assocPath(["combatInstances", combatId, "attackDiceKeys"], attackDiceKeys, gameState);

const combatInstance0 = gameState.combatInstances[combatId];
const abilities0 = [createAbility("DiceModification", XMA.DiceModification.ATTACK_SPEND_FOCUS)];

const element0 = React.createElement(CombatDialog, {
  attackerInstance,
  combatInstance: combatInstance0,
  defenderInstance,
  abilities: abilities0,
  okFunction: myOK0,
  phaseKey: XMA.Phase.COMBAT_MODIFY_ATTACK_DICE
});
ReactDOM.render(element0, document.getElementById("inputArea0"));

const defenseDiceCount = XMM.DiceUtilities.computeDefenseDiceCount(combatId, gameState);
const defenseDiceKeys = XMM.DiceUtilities.rollDefenseDice(defenseDiceCount);
gameState = R.assocPath(
  ["combatInstances", combatId, "defenseDiceKeys"],
  defenseDiceKeys,
  gameState
);

const combatInstance1 = gameState.combatInstances[combatId];
const abilities1 = [
  createAbility("DiceModification", XMA.DiceModification.DEFENSE_SPEND_EVADE),
  createAbility("DiceModification", XMA.DiceModification.DEFENSE_SPEND_FOCUS)
];

const element1 = React.createElement(CombatDialog, {
  attackerInstance,
  combatInstance: combatInstance1,
  defenderInstance,
  abilities: abilities1,
  okFunction: myOK1,
  phaseKey: XMA.Phase.COMBAT_MODIFY_DEFENSE_DICE
});
ReactDOM.render(element1, document.getElementById("inputArea1"));

const hitCount = XMM.Selector.diceValueCount(XMA.AttackDiceValue.HIT)(attackDiceKeys);
const criticalCount = XMM.Selector.diceValueCount(XMA.AttackDiceValue.CRITICAL_HIT)(attackDiceKeys);
const evadeCount = XMM.Selector.diceValueCount(XMA.DefenseDiceValue.EVADE)(attackDiceKeys);
console.log(`hitCount = ${hitCount} criticalCount = ${criticalCount} evadeCount = ${evadeCount}`);
gameState = R.assocPath(["combatInstances", combatId, "hitDamage"], hitCount, gameState);
gameState = R.assocPath(["combatInstances", combatId, "criticalDamage"], criticalCount, gameState);
const combatInstance2 = gameState.combatInstances[combatId];

const element2 = React.createElement(CombatDialog, {
  attackerInstance,
  combatInstance: combatInstance2,
  defenderInstance,
  okFunction: myOK2,
  phaseKey: XMA.Phase.COMBAT_NOTIFY_DAMAGE
});
ReactDOM.render(element2, document.getElementById("inputArea2"));
