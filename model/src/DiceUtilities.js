import Selector from "./Selector.js";

const { AttackDiceValue, DefenseDiceValue, Range, Stat } = XMA;

const DiceUtilities = {};

const rollDice = valueFunction => count => {
  const answer = [];

  for (let i = 0; i < count; i += 1) {
    answer.push(valueFunction());
  }

  return Immutable(answer);
};

const rollRandomAttackValue = () => {
  const min = 1;
  const max = 8;
  const roll = Math.floor(Math.random() * (max - min + 1)) + min;
  let value;

  // There are 2 focus, 3 hit, 1 critical hit, and 2 blank.
  switch (roll) {
    case 1:
    case 5:
      value = AttackDiceValue.FOCUS;
      break;
    case 2:
    case 6:
    case 8:
      value = AttackDiceValue.HIT;
      break;
    case 3:
      value = AttackDiceValue.CRITICAL_HIT;
      break;
    case 4:
    case 7:
      value = AttackDiceValue.BLANK;
      break;
    default:
      throw new Error(`Unsupported roll: ${roll}`);
  }

  return value;
};

const rollRandomDefenseValue = () => {
  const min = 1;
  const max = 8;
  const roll = Math.floor(Math.random() * (max - min + 1)) + min;
  let value;

  // There are 2 focus, 3 evade, and 3 blank.
  switch (roll) {
    case 1:
    case 4:
      value = DefenseDiceValue.FOCUS;
      break;
    case 2:
    case 5:
    case 7:
      value = DefenseDiceValue.EVADE;
      break;
    case 3:
    case 6:
    case 8:
      value = DefenseDiceValue.BLANK;
      break;
    default:
      throw new Error(`Unsupported roll: ${roll}`);
  }

  return value;
};

// /////////////////////////////////////////////////////////////////////////////////////////////////
DiceUtilities.addValue = (diceKeys, newValue) => {
  const newValues = Immutable.asMutable(diceKeys);
  newValues.push(newValue);

  return Immutable(newValues);
};

DiceUtilities.changeAllToValue = (diceKeys, oldValue, newValue) => {
  const newValues = Immutable.asMutable(diceKeys);

  for (let i = 0; i < diceKeys.length; i += 1) {
    if (diceKeys[i] === oldValue) {
      newValues[i] = newValue;
    }
  }

  return Immutable(newValues);
};

DiceUtilities.computeAttackDiceCount = (activeCombatId, state) => {
  const combatInstance = Selector.combatInstance(activeCombatId, state);
  const attackerInstance = Selector.pilotInstance(combatInstance.attackerId, state);
  const { rangeKey } = combatInstance;

  let answer = Selector.statValueByPilot(attackerInstance.pilotKey, Stat.PRIMARY_WEAPON);

  // Bonus attack die at range one.
  answer += rangeKey === Range.ONE ? 1 : 0;

  return answer;
};

DiceUtilities.computeDefenseDiceCount = (activeCombatId, state) => {
  const combatInstance = state.combatInstances[activeCombatId];
  const attackerInstance = Selector.pilotInstance(combatInstance.attackerId, state);
  const { rangeKey } = combatInstance;

  let answer = Selector.statValueByPilot(attackerInstance.pilotKey, Stat.AGILITY);

  // Bonus defense die at range three, four, and five.
  answer += [Range.THREE, Range.FOUR, Range.FIVE].includes(rangeKey) ? 1 : 0;

  return answer;
};

DiceUtilities.rollAttackDice = count => rollDice(rollRandomAttackValue)(count);

DiceUtilities.rollDefenseDice = count => rollDice(rollRandomDefenseValue)(count);

Object.freeze(DiceUtilities);

export default DiceUtilities;
