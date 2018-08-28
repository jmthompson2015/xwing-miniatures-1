import Selector from "./Selector.js";
import TestData from "./TestData.js";
import XWingMiniaturesModel from "./XWingMiniaturesModel.js";

const { Maneuver, Phase, Range } = XMA;

const { ActionCreator, Reducer } = XMS;

QUnit.module("XWingMiniaturesModel");

const addCombatInstance = store => {
  const combatInstance = XMS.CombatState.create({
    id: 1,
    attackerId: 3,
    defenderId: 2,
    rangeKey: Range.TWO
  });
  store.dispatch(ActionCreator.setActiveCombatId(1));
  store.dispatch(ActionCreator.setCombatInstance(combatInstance));
};

const addPilotToManeuver = store => {
  store.dispatch(
    ActionCreator.setPilotToManeuver({
      1: Maneuver.BANK_LEFT_1_STANDARD_1BW,
      2: Maneuver.STRAIGHT_1_STANDARD_1FW,
      3: Maneuver.TURN_RIGHT_1_STANDARD_1YW
    })
  );
};

function initializeStore() {
  const store = Redux.createStore(Reducer.root, TestData.createGameState());

  return store;
}

// /////////////////////////////////////////////////////////////////////////////////////////////////
QUnit.test("nextGameState() Setup", assert => {
  // Setup.
  const store = initializeStore();
  const gameState0 = store.getState();

  // Run.
  const done = assert.async();
  const callback = result => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(result);
    const gameState = result.getState();
    assert.ok(gameState);
    assert.equal(gameState.phaseKey, Phase.PLANNING_START, "phaseKey");
    assert.equal(gameState.round, 0, "round");
    assert.equal(gameState.userMessage, "");

    assert.equal(gameState.damageDeck.length, 33, "damageDeck length");
    assert.equal(Object.keys(gameState.pilotToManeuver).length, 0, "pilotToManeuver length");

    assert.equal(Object.keys(gameState.agentInstances).length, 2, "agentInstances length");
    assert.equal(Object.keys(gameState.damageInstances).length, 33, "damageInstances length");
    assert.equal(Object.keys(gameState.pilotInstances).length, 3, "pilotInstances length");
    assert.equal(Object.keys(gameState.upgradeInstances).length, 4, "upgradeInstances length");
    done();
  };
  XWingMiniaturesModel.nextGameState({
    gameState: gameState0
  }).then(callback);
});

QUnit.test("nextGameState() Planning Start", assert => {
  // Setup.
  const store = initializeStore();
  store.dispatch(ActionCreator.setPhase(Phase.PLANNING_START));
  const gameState0 = store.getState();

  // Run.
  const done = assert.async();
  const callback = result => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(result);
    const gameState = result.getState();
    assert.ok(gameState);
    assert.equal(gameState.phaseKey, Phase.PLANNING, "phaseKey");
    assert.equal(gameState.round, 1, "round");
    assert.equal(gameState.userMessage, "", "userMessage");

    assert.equal(gameState.damageDeck.length, 33, "damageDeck");
    assert.equal(Object.keys(gameState.pilotToManeuver).length, 0, "pilotToManeuver");

    assert.equal(Object.keys(gameState.agentInstances).length, 2, "agentInstances");
    assert.equal(Object.keys(gameState.damageInstances).length, 33, "damageInstances");
    assert.equal(Object.keys(gameState.pilotInstances).length, 3, "pilotInstances");
    assert.equal(Object.keys(gameState.upgradeInstances).length, 4, "upgradeInstances");
    done();
  };
  XWingMiniaturesModel.nextGameState({
    gameState: gameState0
  }).then(callback);
});

QUnit.test("nextGameState() Planning AgentQuery 1", assert => {
  // Setup.
  const store = initializeStore();
  store.dispatch(ActionCreator.setPlanningQueue([1, 2]));
  store.dispatch(ActionCreator.incrementRound());
  store.dispatch(ActionCreator.setPhase(Phase.PLANNING));
  const gameState0 = store.getState();

  // Run.
  const done = assert.async();
  const callback = result => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(result);
    const gameState = result.getState();
    assert.ok(gameState);
    assert.ok(gameState.agentQuery);
    done();
  };
  XWingMiniaturesModel.nextGameState({
    gameState: gameState0
  }).then(callback);
});

QUnit.test("nextGameState() Planning AgentQuery 2", assert => {
  // Setup.
  const store = initializeStore();
  const pilotToManeuver = {};
  pilotToManeuver[1] = Maneuver.STRAIGHT_1_STANDARD_1FW;
  pilotToManeuver[2] = Maneuver.STRAIGHT_1_STANDARD_1FW;
  store.dispatch(ActionCreator.setPilotToManeuver(pilotToManeuver));
  store.dispatch(ActionCreator.setPlanningQueue([2]));
  store.dispatch(ActionCreator.incrementRound());
  store.dispatch(ActionCreator.setPhase(Phase.PLANNING));
  const gameState0 = store.getState();

  // Run.
  const done = assert.async();
  const callback = result => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(result);
    const gameState = result.getState();
    assert.ok(gameState);
    assert.ok(gameState.agentQuery);
    done();
  };
  XWingMiniaturesModel.nextGameState({
    gameState: gameState0
  }).then(callback);
});

QUnit.test("nextGameState() Planning", assert => {
  // Setup.
  const store = initializeStore();
  addPilotToManeuver(store);
  store.dispatch(ActionCreator.incrementRound());
  store.dispatch(ActionCreator.setPhase(Phase.PLANNING));
  const gameState0 = store.getState();

  // Run.
  const done = assert.async();
  const callback = result => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(result);
    const gameState = result.getState();
    assert.ok(gameState);
    assert.equal(gameState.agentQuery, undefined);
    assert.equal(gameState.phaseKey, Phase.PLANNING_END, "phaseKey");
    assert.equal(gameState.round, 1, "round");
    assert.equal(gameState.userMessage, "", "userMessage");

    assert.equal(gameState.damageDeck.length, 33, "damageDeck");
    assert.equal(Object.keys(gameState.pilotToManeuver).length, 3, "pilotToManeuver");

    assert.equal(Object.keys(gameState.agentInstances).length, 2, "agentInstances");
    assert.equal(Object.keys(gameState.damageInstances).length, 33, "damageInstances");
    assert.equal(Object.keys(gameState.pilotInstances).length, 3, "pilotInstances");
    assert.equal(Object.keys(gameState.upgradeInstances).length, 4, "upgradeInstances");
    done();
  };
  XWingMiniaturesModel.nextGameState({
    gameState: gameState0
  }).then(callback);
});

QUnit.test("nextGameState() Planning End", assert => {
  // Setup.
  const store = initializeStore();
  store.dispatch(ActionCreator.incrementRound());
  store.dispatch(ActionCreator.setPhase(Phase.PLANNING_END));
  const gameState0 = store.getState();

  // Run.
  const done = assert.async();
  const callback = result => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(result);
    const gameState = result.getState();
    assert.ok(gameState);
    assert.equal(gameState.phaseKey, Phase.ACTIVATION_START, "phaseKey");
    assert.equal(gameState.round, 1, "round");
    assert.equal(gameState.userMessage, "", "userMessage");

    assert.equal(gameState.damageDeck.length, 33, "damageDeck");
    assert.equal(Object.keys(gameState.pilotToManeuver).length, 0, "pilotToManeuver");

    assert.equal(Object.keys(gameState.agentInstances).length, 2, "agentInstances");
    assert.equal(Object.keys(gameState.damageInstances).length, 33, "damageInstances");
    assert.equal(Object.keys(gameState.pilotInstances).length, 3, "pilotInstances");
    assert.equal(Object.keys(gameState.upgradeInstances).length, 4, "upgradeInstances");
    done();
  };
  XWingMiniaturesModel.nextGameState({
    gameState: gameState0
  }).then(callback);
});

QUnit.test("nextGameState() Activation Start", assert => {
  // Setup.
  const store = initializeStore();
  addPilotToManeuver(store);
  store.dispatch(ActionCreator.incrementRound());
  store.dispatch(ActionCreator.setPhase(Phase.ACTIVATION_START));
  const gameState0 = store.getState();

  // Run.
  const done = assert.async();
  const callback = result => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(result);
    const gameState = result.getState();
    assert.ok(gameState);
    assert.equal(gameState.phaseKey, Phase.ACTIVATION_REVEAL_DIAL, "phaseKey");
    done();
  };
  XWingMiniaturesModel.nextGameState({
    gameState: gameState0
  }).then(callback);
});

QUnit.test("nextGameState() Activation Reveal Dial", assert => {
  // Setup.
  const store = initializeStore();
  addPilotToManeuver(store);
  store.dispatch(ActionCreator.setActivationQueue([2, 1, 3]));
  store.dispatch(ActionCreator.incrementRound());
  store.dispatch(ActionCreator.setPhase(Phase.ACTIVATION_REVEAL_DIAL));
  const gameState0 = store.getState();

  // Run.
  const done = assert.async();
  const callback = result => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(result);
    const gameState = result.getState();
    assert.ok(gameState);
    assert.equal(gameState.phaseKey, Phase.ACTIVATION_SET_TEMPLATE, "phaseKey");
    done();
  };
  XWingMiniaturesModel.nextGameState({
    gameState: gameState0
  }).then(callback);
});

QUnit.test("nextGameState() Activation Perform Action", assert => {
  // Setup.
  const store = initializeStore();
  addPilotToManeuver(store);
  store.dispatch(ActionCreator.setActivationQueue([2, 1, 3]));
  store.dispatch(ActionCreator.dequeueActivation());
  store.dispatch(ActionCreator.incrementRound());
  store.dispatch(ActionCreator.setPhase(Phase.ACTIVATION_PERFORM_ACTION));
  const gameState0 = store.getState();

  // Run.
  const done = assert.async();
  const callback = result => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(result);
    const gameState = result.getState();
    assert.ok(gameState);
    assert.equal(gameState.phaseKey, Phase.ACTIVATION_PERFORM_ACTION, "phaseKey");
    done();
  };
  XWingMiniaturesModel.nextGameState({
    gameState: gameState0
  }).then(callback);
});

QUnit.test("nextGameState() Activation End", assert => {
  // Setup.
  const store = initializeStore();
  store.dispatch(ActionCreator.incrementRound());
  store.dispatch(ActionCreator.setPhase(Phase.ACTIVATION_END));
  const gameState0 = store.getState();

  // Run.
  const done = assert.async();
  const callback = result => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(result);
    const gameState = result.getState();
    assert.ok(gameState);
    assert.equal(gameState.phaseKey, Phase.COMBAT_START, "phaseKey");
    assert.equal(gameState.round, 1, "round");
    assert.equal(gameState.userMessage, "", "userMessage");

    assert.equal(gameState.damageDeck.length, 33, "damageDeck");

    assert.equal(Object.keys(gameState.agentInstances).length, 2, "agentInstances");
    assert.equal(Object.keys(gameState.damageInstances).length, 33, "damageInstances");
    assert.equal(Object.keys(gameState.pilotInstances).length, 3, "pilotInstances");
    assert.equal(Object.keys(gameState.upgradeInstances).length, 4, "upgradeInstances");
    done();
  };
  XWingMiniaturesModel.nextGameState({
    gameState: gameState0
  }).then(callback);
});

QUnit.test("nextGameState() Combat Start", assert => {
  // Setup.
  const store = initializeStore();
  store.dispatch(ActionCreator.incrementRound());
  store.dispatch(ActionCreator.setPhase(Phase.COMBAT_START));
  const gameState0 = store.getState();

  // Run.
  const done = assert.async();
  const callback = result => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(result);
    const gameState = result.getState();
    assert.ok(gameState);
    assert.equal(gameState.phaseKey, Phase.COMBAT_DECLARE_TARGET, "phaseKey");
    assert.equal(gameState.round, 1, "round");
    assert.equal(gameState.userMessage, "", "userMessage");

    assert.equal(gameState.damageDeck.length, 33, "damageDeck");

    assert.equal(Object.keys(gameState.agentInstances).length, 2, "agentInstances");
    assert.equal(Object.keys(gameState.damageInstances).length, 33, "damageInstances");
    assert.equal(Object.keys(gameState.pilotInstances).length, 3, "pilotInstances");
    assert.equal(Object.keys(gameState.upgradeInstances).length, 4, "upgradeInstances");
    done();
  };
  XWingMiniaturesModel.nextGameState({
    gameState: gameState0
  }).then(callback);
});

QUnit.test("nextGameState() Combat Declare Target", assert => {
  // Setup.
  const store = initializeStore();
  store.dispatch(ActionCreator.setCombatQueue([3, 1, 2]));
  store.dispatch(ActionCreator.dequeueCombat());
  store.dispatch(ActionCreator.incrementRound());
  store.dispatch(ActionCreator.setPhase(Phase.COMBAT_DECLARE_TARGET));
  const gameState0 = store.getState();

  // Run.
  const done = assert.async();
  const callback = result => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(result);
    const gameState = result.getState();
    assert.ok(gameState);
    assert.equal(gameState.phaseKey, Phase.COMBAT_DECLARE_TARGET, "phaseKey");
    assert.equal(gameState.round, 1, "round");
    assert.equal(gameState.userMessage, "", "userMessage");

    assert.equal(gameState.damageDeck.length, 33, "damageDeck");

    assert.equal(Object.keys(gameState.agentInstances).length, 2, "agentInstances");
    assert.equal(Object.keys(gameState.damageInstances).length, 33, "damageInstances");
    assert.equal(Object.keys(gameState.pilotInstances).length, 3, "pilotInstances");
    assert.equal(Object.keys(gameState.upgradeInstances).length, 4, "upgradeInstances");
    done();
  };
  XWingMiniaturesModel.nextGameState({
    gameState: gameState0
  }).then(callback);
});

QUnit.test("nextGameState() Combat Roll Attack Dice", assert => {
  // Setup.
  const store = initializeStore();
  store.dispatch(ActionCreator.setCombatQueue([3, 1, 2]));
  store.dispatch(ActionCreator.dequeueCombat());
  addCombatInstance(store);
  store.dispatch(ActionCreator.incrementRound());
  store.dispatch(ActionCreator.setPhase(Phase.COMBAT_ROLL_ATTACK_DICE));
  const gameState0 = store.getState();

  // Run.
  const done = assert.async();
  const callback = result => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(result);
    const gameState = result.getState();
    assert.ok(gameState);
    assert.equal(gameState.phaseKey, Phase.COMBAT_MODIFY_ATTACK_DICE, "phaseKey");
    assert.equal(gameState.round, 1, "round");
    assert.equal(gameState.userMessage, "", "userMessage");

    assert.equal(gameState.damageDeck.length, 33, "damageDeck");

    assert.equal(Object.keys(gameState.agentInstances).length, 2, "agentInstances");
    assert.equal(Object.keys(gameState.damageInstances).length, 33, "damageInstances");
    assert.equal(Object.keys(gameState.pilotInstances).length, 3, "pilotInstances");
    assert.equal(Object.keys(gameState.upgradeInstances).length, 4, "upgradeInstances");
    done();
  };
  XWingMiniaturesModel.nextGameState({
    gameState: gameState0
  }).then(callback);
});

QUnit.test("nextGameState() Combat Roll Defense Dice", assert => {
  // Setup.
  const store = initializeStore();
  store.dispatch(ActionCreator.setCombatQueue([3, 1, 2]));
  store.dispatch(ActionCreator.dequeueCombat());
  addCombatInstance(store);
  store.dispatch(ActionCreator.incrementRound());
  store.dispatch(ActionCreator.setPhase(Phase.COMBAT_ROLL_DEFENSE_DICE));
  const gameState0 = store.getState();

  // Run.
  const done = assert.async();
  const callback = result => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(result);
    const gameState = result.getState();
    assert.ok(gameState);
    assert.equal(gameState.phaseKey, Phase.COMBAT_MODIFY_DEFENSE_DICE, "phaseKey");
    assert.equal(gameState.round, 1, "round");
    assert.equal(gameState.userMessage, "", "userMessage");

    assert.equal(gameState.damageDeck.length, 33, "damageDeck");

    assert.equal(Object.keys(gameState.agentInstances).length, 2, "agentInstances");
    assert.equal(Object.keys(gameState.damageInstances).length, 33, "damageInstances");
    assert.equal(Object.keys(gameState.pilotInstances).length, 3, "pilotInstances");
    assert.equal(Object.keys(gameState.upgradeInstances).length, 4, "upgradeInstances");
    done();
  };
  XWingMiniaturesModel.nextGameState({
    gameState: gameState0
  }).then(callback);
});

QUnit.test("nextGameState() Combat Compare Results", assert => {
  // Setup.
  const store = initializeStore();
  store.dispatch(ActionCreator.setCombatQueue([3, 1, 2]));
  store.dispatch(ActionCreator.dequeueCombat());
  addCombatInstance(store);
  store.dispatch(ActionCreator.incrementRound());
  store.dispatch(ActionCreator.setPhase(Phase.COMBAT_COMPARE_RESULTS));
  const gameState0 = store.getState();

  // Run.
  const done = assert.async();
  const callback = result => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(result);
    const gameState = result.getState();
    assert.ok(gameState);
    assert.equal(gameState.phaseKey, Phase.COMBAT_NOTIFY_DAMAGE, "phaseKey");
    assert.equal(gameState.round, 1, "round");
    assert.equal(gameState.userMessage, "", "userMessage");

    assert.equal(gameState.damageDeck.length, 33, "damageDeck");

    assert.equal(Object.keys(gameState.agentInstances).length, 2, "agentInstances");
    assert.equal(Object.keys(gameState.damageInstances).length, 33, "damageInstances");
    assert.equal(Object.keys(gameState.pilotInstances).length, 3, "pilotInstances");
    assert.equal(Object.keys(gameState.upgradeInstances).length, 4, "upgradeInstances");
    done();
  };
  XWingMiniaturesModel.nextGameState({
    gameState: gameState0
  }).then(callback);
});

QUnit.test("nextGameState() Combat Deal Damage", assert => {
  // Setup.
  const store = initializeStore();
  store.dispatch(ActionCreator.setCombatQueue([3, 1, 2]));
  store.dispatch(ActionCreator.dequeueCombat());
  addCombatInstance(store);
  store.dispatch(ActionCreator.incrementRound());
  store.dispatch(ActionCreator.setPhase(Phase.COMBAT_DEAL_DAMAGE));
  const gameState0 = store.getState();

  // Run.
  const done = assert.async();
  const callback = result => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(result);
    const gameState = result.getState();
    assert.ok(gameState);
    assert.equal(gameState.phaseKey, Phase.COMBAT_DECLARE_TARGET, "phaseKey");
    assert.equal(gameState.round, 1, "round");
    assert.equal(gameState.userMessage, "", "userMessage");

    assert.equal(gameState.damageDeck.length, 33, "damageDeck");

    assert.equal(Object.keys(gameState.agentInstances).length, 2, "agentInstances");
    assert.equal(Object.keys(gameState.damageInstances).length, 33, "damageInstances");
    assert.equal(Object.keys(gameState.pilotInstances).length, 3, "pilotInstances");
    assert.equal(Object.keys(gameState.upgradeInstances).length, 4, "upgradeInstances");
    done();
  };
  XWingMiniaturesModel.nextGameState({
    gameState: gameState0
  }).then(callback);
});

QUnit.test("nextGameState() Combat End", assert => {
  // Setup.
  const store = initializeStore();
  store.dispatch(ActionCreator.incrementRound());
  store.dispatch(ActionCreator.setPhase(Phase.COMBAT_END));
  const gameState0 = store.getState();

  // Run.
  const done = assert.async();
  const callback = result => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(result);
    const gameState = result.getState();
    assert.ok(gameState);
    assert.equal(gameState.phaseKey, Phase.END_START, "phaseKey");
    assert.equal(gameState.round, 1, "round");
    assert.equal(gameState.userMessage, "", "userMessage");

    assert.equal(gameState.damageDeck.length, 33, "damageDeck");

    assert.equal(Object.keys(gameState.agentInstances).length, 2, "agentInstances");
    assert.equal(Object.keys(gameState.damageInstances).length, 33, "damageInstances");
    assert.equal(Object.keys(gameState.pilotInstances).length, 3, "pilotInstances");
    assert.equal(Object.keys(gameState.upgradeInstances).length, 4, "upgradeInstances");
    done();
  };
  XWingMiniaturesModel.nextGameState({
    gameState: gameState0
  }).then(callback);
});

QUnit.test("nextGameState() End Start", assert => {
  // Setup.
  const store = initializeStore();
  store.dispatch(ActionCreator.incrementRound());
  store.dispatch(ActionCreator.setPhase(Phase.END_START));
  const gameState0 = store.getState();

  // Run.
  const done = assert.async();
  const callback = result => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(result);
    const gameState = result.getState();
    assert.ok(gameState);
    assert.equal(gameState.phaseKey, Phase.END_CLEAN_UP, "phaseKey");
    assert.equal(gameState.round, 1, "round");
    assert.equal(gameState.userMessage, "", "userMessage");

    assert.equal(gameState.damageDeck.length, 33, "damageDeck");

    assert.equal(Object.keys(gameState.agentInstances).length, 2, "agentInstances");
    assert.equal(Object.keys(gameState.damageInstances).length, 33, "damageInstances");
    assert.equal(Object.keys(gameState.pilotInstances).length, 3, "pilotInstances");
    assert.equal(Object.keys(gameState.upgradeInstances).length, 4, "upgradeInstances");
    done();
  };
  XWingMiniaturesModel.nextGameState({
    gameState: gameState0
  }).then(callback);
});

QUnit.test("nextGameState() End Clean Up", assert => {
  // Setup.
  const store = initializeStore();
  const pilotIds = Selector.pilotIds(store.getState());
  const tokenKeys = XMA.EnumUtilities.keys(XMA.Token);
  pilotIds.forEach(pilotId =>
    tokenKeys.forEach(tokenKey =>
      store.dispatch(ActionCreator.addPilotTokenCount(pilotId, tokenKey))
    )
  );
  store.dispatch(ActionCreator.incrementRound());
  store.dispatch(ActionCreator.setPhase(Phase.END_CLEAN_UP));
  const gameState0 = store.getState();

  // Run.
  const done = assert.async();
  const callback = result => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(store);
    const gameState = result.getState();
    assert.ok(gameState);
    assert.equal(gameState.phaseKey, Phase.END_ROUND_END, "phaseKey");
    assert.equal(gameState.round, 1, "round");
    assert.equal(gameState.userMessage, "", "userMessage");

    assert.equal(gameState.damageDeck.length, 33, "damageDeck");

    assert.equal(Object.keys(gameState.agentInstances).length, 2, "agentInstances");
    assert.equal(Object.keys(gameState.damageInstances).length, 33, "damageInstances");
    assert.equal(Object.keys(gameState.pilotInstances).length, 3, "pilotInstances");
    assert.equal(Object.keys(gameState.upgradeInstances).length, 4, "upgradeInstances");

    pilotIds.forEach(pilotId => {
      const { tokenCounts } = gameState.pilotInstances[pilotId];
      assert.equal(tokenCounts.cloak, 1, "cloak");
      assert.equal(tokenCounts.energy, 1, "energy");
      assert.equal(tokenCounts.evade, undefined, "evade");
      assert.equal(tokenCounts.focus, undefined, "focus");
      assert.equal(tokenCounts.ion, 1, "ion");
      assert.equal(tokenCounts.ordnance, 1, "ordnance");
      assert.equal(tokenCounts.reinforce, undefined, "reinforce");
      assert.equal(tokenCounts.shield, pilotId === 3 ? 3 : 1, "shield");
      assert.equal(tokenCounts.stress, 1, "stress");
      assert.equal(tokenCounts.tractorBeam, undefined, "tractorBeam");
      assert.equal(tokenCounts.weaponsDisabled, undefined, "weaponsDisabled");
    });

    done();
  };
  XWingMiniaturesModel.nextGameState({
    gameState: gameState0
  }).then(callback);
});

QUnit.test("nextGameState() End Round End", assert => {
  // Setup.
  const store = initializeStore();
  store.dispatch(ActionCreator.incrementRound());
  store.dispatch(ActionCreator.setPhase(Phase.END_ROUND_END));
  const gameState0 = store.getState();

  // Run.
  const done = assert.async();
  const callback = result => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(store);
    const gameState = result.getState();
    assert.ok(gameState);
    assert.equal(gameState.phaseKey, Phase.END_END, "phaseKey");
    assert.equal(gameState.round, 1, "round");
    assert.equal(gameState.userMessage, "", "userMessage");

    assert.equal(gameState.damageDeck.length, 33, "damageDeck");

    assert.equal(Object.keys(gameState.agentInstances).length, 2, "agentInstances");
    assert.equal(Object.keys(gameState.damageInstances).length, 33, "damageInstances");
    assert.equal(Object.keys(gameState.pilotInstances).length, 3, "pilotInstances");
    assert.equal(Object.keys(gameState.upgradeInstances).length, 4, "upgradeInstances");

    const pilotIds = Selector.pilotIds(store.getState());

    pilotIds.forEach(pilotId => {
      assert.equal(gameState.pilotToManeuver[pilotId], undefined);
    });

    done();
  };
  XWingMiniaturesModel.nextGameState({
    gameState: gameState0
  }).then(callback);
});

QUnit.test("nextGameState() End End", assert => {
  // Setup.
  const store = initializeStore();
  store.dispatch(ActionCreator.incrementRound());
  store.dispatch(ActionCreator.setPhase(Phase.END_END));
  const gameState0 = store.getState();

  // Run.
  const done = assert.async();
  const callback = result => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(result);
    const gameState = result.getState();
    assert.ok(gameState);
    assert.equal(gameState.phaseKey, Phase.PLANNING_START, "phaseKey");
    assert.equal(gameState.round, 1, "round");
    assert.equal(gameState.userMessage, "", "userMessage");

    assert.equal(gameState.damageDeck.length, 33, "damageDeck");

    assert.equal(Object.keys(gameState.agentInstances).length, 2, "agentInstances");
    assert.equal(Object.keys(gameState.damageInstances).length, 33, "damageInstances");
    assert.equal(Object.keys(gameState.pilotInstances).length, 3, "pilotInstances");
    assert.equal(Object.keys(gameState.upgradeInstances).length, 4, "upgradeInstances");
    done();
  };
  XWingMiniaturesModel.nextGameState({
    gameState: gameState0
  }).then(callback);
});

const XWingMiniaturesModelTest = {};
export default XWingMiniaturesModelTest;
