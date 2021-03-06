import DiceUtils from "./DiceUtilities.js";
import Selector from "./Selector.js";
import TestData from "./TestData.js";

const { AttackDiceValue, DefenseDiceValue, Range } = XMA;

const { ActionCreator, Reducer } = XMS;

QUnit.module("DiceUtilities");

const createStore = rangeKey => {
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const combatId = XMS.Selector.nextCombatId(store.getState());
  store.dispatch(ActionCreator.setActiveCombatId(combatId));
  const attackerId = 3;
  const defenderId = 2;

  const combatInstance = XMS.CombatState.create({
    id: combatId,
    attackerId,
    defenderId,
    rangeKey
  });
  store.dispatch(ActionCreator.setCombatInstance(combatInstance));

  return store;
};

// /////////////////////////////////////////////////////////////////////////////////////////////////
QUnit.test("addValue()", assert => {
  // Setup.
  const diceKeys = [DefenseDiceValue.EVADE, DefenseDiceValue.FOCUS, DefenseDiceValue.BLANK];
  assert.equal(Selector.diceValueCount(DefenseDiceValue.EVADE)(diceKeys), 1);
  assert.equal(Selector.diceValueCount(DefenseDiceValue.FOCUS)(diceKeys), 1);
  assert.equal(Selector.diceValueCount(DefenseDiceValue.BLANK)(diceKeys), 1);

  // Run.
  const result = DiceUtils.addValue(diceKeys, DefenseDiceValue.EVADE);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(Selector.diceValueCount(DefenseDiceValue.EVADE)(result), 2);
  assert.equal(Selector.diceValueCount(DefenseDiceValue.FOCUS)(result), 1);
  assert.equal(Selector.diceValueCount(DefenseDiceValue.BLANK)(result), 1);
});

QUnit.test("changeAllToValue()", assert => {
  // Setup.
  const diceKeys = [
    DefenseDiceValue.EVADE,
    DefenseDiceValue.FOCUS,
    DefenseDiceValue.BLANK,
    DefenseDiceValue.FOCUS
  ];
  assert.equal(Selector.diceValueCount(DefenseDiceValue.EVADE)(diceKeys), 1);
  assert.equal(Selector.diceValueCount(DefenseDiceValue.FOCUS)(diceKeys), 2);
  assert.equal(Selector.diceValueCount(DefenseDiceValue.BLANK)(diceKeys), 1);

  // Run.
  const result = DiceUtils.changeAllToValue(
    diceKeys,
    DefenseDiceValue.FOCUS,
    DefenseDiceValue.EVADE
  );

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(Selector.diceValueCount(DefenseDiceValue.EVADE)(result), 3);
  assert.equal(Selector.diceValueCount(DefenseDiceValue.FOCUS)(result), 0);
  assert.equal(Selector.diceValueCount(DefenseDiceValue.BLANK)(result), 1);
});

QUnit.test("computeAttackDiceCount() Range One", assert => {
  // Setup.
  const store = createStore(Range.ONE);
  const combatId = store.getState().activeCombatId;

  // Run.
  const result = DiceUtils.computeAttackDiceCount(combatId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result, 4);
});

QUnit.test("computeAttackDiceCount() Range Two", assert => {
  // Setup.
  const store = createStore(Range.TWO);
  const combatId = store.getState().activeCombatId;

  // Run.
  const result = DiceUtils.computeAttackDiceCount(combatId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result, 3);
});

QUnit.test("computeDefenseDiceCount() Range Two", assert => {
  // Setup.
  const store = createStore(Range.TWO);
  const combatId = store.getState().activeCombatId;

  // Run.
  const result = DiceUtils.computeDefenseDiceCount(combatId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result, 2);
});

QUnit.test("computeDefenseDiceCount() Range Three", assert => {
  // Setup.
  const store = createStore(Range.THREE);
  const combatId = store.getState().activeCombatId;

  // Run.
  const result = DiceUtils.computeDefenseDiceCount(combatId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result, 3);
});

QUnit.test("rollAttackDice()", assert => {
  // Setup.
  const count = 3;

  // Run.
  const result = DiceUtils.rollAttackDice(count);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, count);
  const attackDiceKeys = XMA.EnumUtilities.keys(AttackDiceValue);
  for (let i = 0; i < count; i += 1) {
    assert.equal(attackDiceKeys.includes(result[i]), true);
  }
});

QUnit.test("rollDefenseDice()", assert => {
  // Setup.
  const count = 2;

  // Run.
  const result = DiceUtils.rollDefenseDice(count);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, count);
  const defenseDiceKeys = XMA.EnumUtilities.keys(DefenseDiceValue);
  for (let i = 0; i < count; i += 1) {
    assert.equal(defenseDiceKeys.includes(result[i]), true);
  }
});

const DiceUtilitiesTest = {};
export default DiceUtilitiesTest;
