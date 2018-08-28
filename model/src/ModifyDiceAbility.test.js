import ModifyDiceAbility from "./ModifyDiceAbility.js";
import Selector from "./Selector.js";
import TestData from "./TestData.js";

const { AttackDiceValue, DefenseDiceValue, DiceModification, Range, Token } = XMA;

const { ActionCreator, Reducer } = XMS;

QUnit.module("ModifyDiceAbility");

const addCombatInstance = store => {
  const combatId = 1;
  const combatInstance = XMS.CombatState.create({
    id: combatId,
    attackerId: 3,
    defenderId: 2,
    rangeKey: Range.TWO,
    attackDiceKeys: [
      AttackDiceValue.HIT,
      AttackDiceValue.CRITICAL_HIT,
      AttackDiceValue.FOCUS,
      AttackDiceValue.BLANK
    ],
    defenseDiceKeys: [DefenseDiceValue.EVADE, DefenseDiceValue.FOCUS, DefenseDiceValue.BLANK]
  });
  store.dispatch(ActionCreator.setActiveCombatId(combatId));
  store.dispatch(ActionCreator.setCombatInstance(combatInstance));
};

// /////////////////////////////////////////////////////////////////////////////////////////////////
QUnit.test("attack spend focus", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  addCombatInstance(store);
  const combatId = 1;
  const attackerId = 3;
  store.dispatch(ActionCreator.addPilotTokenCount(attackerId, Token.FOCUS, 1));
  assert.equal(
    Selector.countByPilotToken(attackerId, Token.FOCUS, store.getState()),
    1,
    "focus token count"
  );
  const ability = ModifyDiceAbility[DiceModification.ATTACK_SPEND_FOCUS];

  // Run.
  const done = assert.async();
  const callback = () => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.equal(
      Selector.countByPilotToken(attackerId, Token.FOCUS, store.getState()),
      0,
      "focus token count"
    );
    assert.equal(
      Selector.attackDiceValueCount(combatId, AttackDiceValue.HIT, store.getState()),
      2,
      "dice hit count"
    );
    assert.equal(
      Selector.attackDiceValueCount(combatId, AttackDiceValue.CRITICAL_HIT, store.getState()),
      1,
      "dice critical hit count"
    );
    assert.equal(
      Selector.attackDiceValueCount(combatId, AttackDiceValue.FOCUS, store.getState()),
      0,
      "dice focus count"
    );
    assert.equal(
      Selector.attackDiceValueCount(combatId, AttackDiceValue.BLANK, store.getState()),
      1,
      "dice blank count"
    );
    done();
  };
  const conditionPassed = ability.condition(attackerId, store.getState());
  assert.equal(conditionPassed, true, "conditionPassed");

  if (conditionPassed) {
    ability.consequent(attackerId, store).then(callback);
  }
});

// QUnit.test("attack spend target lock", function(assert)
// {
//    // Setup.
//    const environment = createEnvironment();
//    const store = environment.store();
//    const attacker = environment.pilotInstances()[2]; // X-Wing.
//    const defender = environment.pilotInstances()[0]; // TIE Fighter.
//    TargetLock.newInstance(store, attacker, defender);
//    const attackDice = AttackDice.get(store, attacker.id());
//    const blankCount0 = attackDice.blankCount();
//    const focusCount0 = attackDice.focusCount();
//    const hitCount0 = attackDice.hitCount();
//    const ability = ModifyDiceAbility[ModifyDiceAbility.ATTACK_KEY]
//      [DiceModification.ATTACK_SPEND_TARGET_LOCK];
//    const callback = function()
//    {
//       // Verify.
//       const attackDice = AttackDice.get(store, attacker.id());
//       assert.ok(attackDice);
//       assert.ok(attackDice.hitCount() >= hitCount0);
//       assert.ok(attackDice.hitCount() <= blankCount0 + focusCount0 + hitCount0);
//    };
//
//    // Run.
//    ability.consequent(store, attacker, callback);
// });

QUnit.test("defense spend evade", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  addCombatInstance(store);
  const combatId = 1;
  const defenderId = 2;
  store.dispatch(ActionCreator.addPilotTokenCount(defenderId, Token.EVADE, 1));
  assert.equal(
    Selector.countByPilotToken(defenderId, Token.EVADE, store.getState()),
    1,
    "evade token count"
  );
  const ability = ModifyDiceAbility[DiceModification.DEFENSE_SPEND_EVADE];

  // Run.
  const done = assert.async();
  const callback = () => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.equal(
      Selector.countByPilotToken(defenderId, Token.FOCUS, store.getState()),
      0,
      "evade token count"
    );
    assert.equal(
      Selector.defenseDiceValueCount(combatId, DefenseDiceValue.EVADE, store.getState()),
      2,
      "dice evade count"
    );
    assert.equal(
      Selector.defenseDiceValueCount(combatId, DefenseDiceValue.FOCUS, store.getState()),
      1,
      "dice focus count"
    );
    assert.equal(
      Selector.defenseDiceValueCount(combatId, DefenseDiceValue.BLANK, store.getState()),
      1,
      "dice blank count"
    );
    done();
  };
  const conditionPassed = ability.condition(defenderId, store.getState());
  assert.equal(conditionPassed, true, "conditionPassed");

  if (conditionPassed) {
    ability.consequent(defenderId, store).then(callback);
  }
});

QUnit.test("defense spend focus", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  addCombatInstance(store);
  const combatId = 1;
  const defenderId = 2;
  store.dispatch(ActionCreator.addPilotTokenCount(defenderId, Token.FOCUS, 1));
  assert.equal(
    Selector.countByPilotToken(defenderId, Token.FOCUS, store.getState()),
    1,
    "focus token count"
  );
  const ability = ModifyDiceAbility[DiceModification.DEFENSE_SPEND_FOCUS];

  // Run.
  const done = assert.async();
  const callback = () => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.equal(
      Selector.countByPilotToken(defenderId, Token.FOCUS, store.getState()),
      0,
      "focus token count"
    );
    assert.equal(
      Selector.defenseDiceValueCount(combatId, DefenseDiceValue.EVADE, store.getState()),
      2,
      "dice evade count"
    );
    assert.equal(
      Selector.defenseDiceValueCount(combatId, DefenseDiceValue.FOCUS, store.getState()),
      0,
      "dice focus count"
    );
    assert.equal(
      Selector.defenseDiceValueCount(combatId, DefenseDiceValue.BLANK, store.getState()),
      1,
      "dice blank count"
    );
    done();
  };
  const conditionPassed = ability.condition(defenderId, store.getState());
  assert.equal(conditionPassed, true, "conditionPassed");

  if (conditionPassed) {
    ability.consequent(defenderId, store).then(callback);
  }
});

const ModifyDiceAbilityTest = {};
export default ModifyDiceAbilityTest;
