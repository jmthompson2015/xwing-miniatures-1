import ActivationTask from "./ActivationTask.js";
import AgentQueryType from "./AgentQueryType.js";
import TestData from "./TestData.js";

const { Maneuver, Phase, ShipAction } = XMA;

const { ActionCreator, Reducer } = XMS;

QUnit.module("ActivationTask");

const addPilotToManeuver = store => {
  const maneuver1 = Maneuver.BANK_LEFT_1_STANDARD_1BW;
  const maneuver2 = Maneuver.STRAIGHT_1_STANDARD_1FW;
  const maneuver3 = Maneuver.TURN_RIGHT_1_STANDARD_1YW;

  store.dispatch(
    ActionCreator.setPilotToManeuver({
      1: maneuver1,
      2: maneuver2,
      3: maneuver3
    })
  );
};

const initializeStore = () => Redux.createStore(Reducer.root, TestData.createGameState());

const setPhase = (store, phaseKey) => store.dispatch(ActionCreator.setPhase(phaseKey));

const verifyActivationQueue = (assert, store, expected, messagePrefix = "callback ") => {
  const { activationQueue } = store.getState();
  assert.ok(activationQueue, `${messagePrefix}activationQueue`);
  assert.equal(activationQueue.length, expected.length, `${messagePrefix}activationQueue.length`);
  for (let i = 0; i < expected.length; i += 1) {
    assert.equal(activationQueue[i], expected[i], `${messagePrefix}activationQueue[${i}]`);
  }
};

const verifyActivePilotId = (assert, store, expected, messagePrefix = "callback ") =>
  assert.equal(store.getState().activePilotId, expected, `${messagePrefix}activePilotId`);

const verifyAgentQuery = (assert, store, expected, messagePrefix = "callback ") => {
  if (expected === undefined) {
    assert.equal(store.getState().agentQuery, expected, `${messagePrefix}agentQuery`);
  } else {
    const { agentQuery } = store.getState();
    assert.ok(agentQuery, `${messagePrefix}agentQuery`);
    assert.equal(agentQuery.queryKey, expected, `${messagePrefix}agentQuery.queryKey`);
  }
};

const verifyAgentResponse = (assert, store, expected, messagePrefix = "callback ") =>
  assert.equal(store.getState().agentResponse, expected, `${messagePrefix}agentResponse`);

const verifyPhaseKey = (assert, store, expected, messagePrefix = "callback ") =>
  assert.equal(store.getState().phaseKey, expected, `${messagePrefix}phaseKey`);

// /////////////////////////////////////////////////////////////////////////////////////////////////
QUnit.test("doIt() Start", assert => {
  // Setup.
  const store0 = initializeStore();
  setPhase(store0, Phase.ACTIVATION_START);

  // Run.
  const done = assert.async();
  const callback = store => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    verifyPhaseKey(assert, store, Phase.ACTIVATION_REVEAL_DIAL);
    verifyActivationQueue(assert, store, [2, 1, 3]);
    verifyActivePilotId(assert, store, undefined);
    verifyAgentQuery(assert, store, undefined);
    verifyAgentResponse(assert, store, undefined);
    done();
  };
  ActivationTask.doIt(store0).then(callback);
});

QUnit.test("doIt() Reveal Dial", assert => {
  // Setup.
  const store0 = initializeStore();
  store0.dispatch(ActionCreator.setActivationQueue([2, 1, 3]));
  addPilotToManeuver(store0);
  setPhase(store0, Phase.ACTIVATION_REVEAL_DIAL);
  assert.equal(store0.getState().activePilotId, undefined);

  // Run.
  const done = assert.async();
  const callback = store => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    verifyPhaseKey(assert, store, Phase.ACTIVATION_SET_TEMPLATE);
    verifyActivationQueue(assert, store, [1, 3]);
    verifyActivePilotId(assert, store, 2);
    verifyAgentQuery(assert, store, undefined);
    verifyAgentResponse(assert, store, undefined);
    done();
  };
  ActivationTask.doIt(store0).then(callback);
});

QUnit.test("doIt() Set Template", assert => {
  // Setup.
  const store0 = initializeStore();
  store0.dispatch(ActionCreator.setActivationQueue([2, 1, 3]));
  store0.dispatch(ActionCreator.dequeueActivation());
  addPilotToManeuver(store0);
  setPhase(store0, Phase.ACTIVATION_SET_TEMPLATE);
  verifyActivePilotId(assert, store0, 2, "");

  // Run.
  const done = assert.async();
  const callback = store => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    verifyPhaseKey(assert, store, Phase.ACTIVATION_EXECUTE_MANEUVER);
    verifyActivationQueue(assert, store, [1, 3]);
    verifyActivePilotId(assert, store, 2);
    verifyAgentQuery(assert, store, undefined);
    verifyAgentResponse(assert, store, undefined);
    done();
  };
  ActivationTask.doIt(store0).then(callback);
});

QUnit.test("doIt() Execute Maneuver", assert => {
  // Setup.
  const store0 = initializeStore();
  store0.dispatch(ActionCreator.setActivationQueue([2, 1, 3]));
  store0.dispatch(ActionCreator.dequeueActivation());
  addPilotToManeuver(store0);
  setPhase(store0, Phase.ACTIVATION_EXECUTE_MANEUVER);
  verifyActivePilotId(assert, store0, 2, "");

  // Run.
  const done = assert.async();
  const callback = store => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    verifyPhaseKey(assert, store, Phase.ACTIVATION_CHECK_PILOT_STRESS);
    verifyActivationQueue(assert, store, [1, 3]);
    verifyActivePilotId(assert, store, 2);
    verifyAgentQuery(assert, store, undefined);
    verifyAgentResponse(assert, store, undefined);
    done();
  };
  ActivationTask.doIt(store0).then(callback);
});

QUnit.test("doIt() Check Pilot Stress", assert => {
  // Setup.
  const store0 = initializeStore();
  store0.dispatch(ActionCreator.setActivationQueue([2, 1, 3]));
  store0.dispatch(ActionCreator.dequeueActivation());
  addPilotToManeuver(store0);
  setPhase(store0, Phase.ACTIVATION_CHECK_PILOT_STRESS);
  verifyActivePilotId(assert, store0, 2, "");

  // Run.
  const done = assert.async();
  const callback = store => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    verifyPhaseKey(assert, store, Phase.ACTIVATION_CLEAN_UP);
    verifyActivationQueue(assert, store, [1, 3]);
    verifyActivePilotId(assert, store, 2);
    verifyAgentQuery(assert, store, undefined);
    verifyAgentResponse(assert, store, undefined);
    done();
  };
  ActivationTask.doIt(store0).then(callback);
});

QUnit.test("doIt() Perform Action query", assert => {
  // Setup.
  const store0 = initializeStore();
  store0.dispatch(ActionCreator.setActivationQueue([2, 1, 3]));
  store0.dispatch(ActionCreator.dequeueActivation());
  addPilotToManeuver(store0);
  setPhase(store0, Phase.ACTIVATION_PERFORM_ACTION);
  verifyActivePilotId(assert, store0, 2, "");

  // Run.
  const done = assert.async();
  const callback = store => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    verifyPhaseKey(assert, store, Phase.ACTIVATION_PERFORM_ACTION);
    verifyActivationQueue(assert, store, [1, 3]);
    verifyActivePilotId(assert, store, 2);
    verifyAgentQuery(assert, store, AgentQueryType.CHOOSE_SHIP_ACTION);
    verifyAgentResponse(assert, store, undefined);
    done();
  };
  ActivationTask.doIt(store0).then(callback);
});

QUnit.test("doIt() Perform Action response", assert => {
  // Setup.
  const store0 = initializeStore();
  store0.dispatch(ActionCreator.setActivationQueue([2, 1, 3]));
  store0.dispatch(ActionCreator.dequeueActivation());
  addPilotToManeuver(store0);
  const agentResponse = XMS.AgentResponseState.create({
    agentId: 1,
    responseKey: AgentQueryType.CHOOSE_SHIP_ACTION,
    payload: {
      pilotId: 2,
      shipActionKey: ShipAction.FOCUS
    }
  });
  store0.dispatch(ActionCreator.setAgentResponse(agentResponse));
  setPhase(store0, Phase.ACTIVATION_PERFORM_ACTION);
  verifyActivePilotId(assert, store0, 2, "");

  // Run.
  const done = assert.async();
  const callback = store => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    verifyPhaseKey(assert, store, Phase.ACTIVATION_REVEAL_DIAL);
    verifyActivationQueue(assert, store, [1, 3]);
    verifyActivePilotId(assert, store, 2);
    verifyAgentQuery(assert, store, undefined);
    verifyAgentResponse(assert, store, undefined);
    done();
  };
  ActivationTask.doIt(store0).then(callback);
});

QUnit.test("doIt() End", assert => {
  // Setup.
  const store0 = initializeStore();
  store0.dispatch(ActionCreator.setPhase(Phase.ACTIVATION_END));

  // Run.
  const done = assert.async();
  const callback = store => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    verifyPhaseKey(assert, store, Phase.COMBAT_START);
    verifyActivationQueue(assert, store, []);
    verifyActivePilotId(assert, store, undefined);
    verifyAgentQuery(assert, store, undefined);
    verifyAgentResponse(assert, store, undefined);
    done();
  };
  ActivationTask.doIt(store0).then(callback);
});

QUnit.test("doIt() Full Cycle", assert => {
  // Setup.
  const store0 = initializeStore();
  store0.dispatch(ActionCreator.setActivationQueue([2, 1, 3]));
  addPilotToManeuver(store0);
  setPhase(store0, Phase.ACTIVATION_START);
  assert.equal(store0.getState().activePilotId, undefined);

  // Run.
  const done = assert.async();
  const callback23 = store => {
    // Verify.
    verifyPhaseKey(assert, store, Phase.ACTIVATION_END, "callback23 ");
    verifyActivationQueue(assert, store, [], "callback23 ");
    verifyAgentQuery(assert, store, undefined, "callback23 ");
    verifyAgentResponse(assert, store, undefined, "callback23 ");
    done();
  };

  const callback22 = store => {
    // Verify.
    verifyPhaseKey(assert, store, Phase.ACTIVATION_REVEAL_DIAL, "callback22 ");
    verifyActivationQueue(assert, store, [], "callback22 ");
    verifyAgentQuery(assert, store, undefined, "callback22 ");
    verifyAgentResponse(assert, store, undefined, "callback22 ");
    ActivationTask.doIt(store).then(callback23);
  };

  const callback21 = store => {
    // Verify.
    verifyPhaseKey(assert, store, Phase.ACTIVATION_PERFORM_ACTION, "callback21");
    verifyActivationQueue(assert, store, [], "callback21");
    verifyAgentQuery(assert, store, AgentQueryType.CHOOSE_SHIP_ACTION, "callback21");
    const { agentQuery } = store.getState();
    const agentResponse = XMS.AgentResponseState.create({
      agentId: agentQuery.agentId,
      responseKey: AgentQueryType.CHOOSE_SHIP_ACTION,
      payload: {
        pilotId: agentQuery.payload.pilotId,
        shipActionKey: ShipAction.FOCUS
      }
    });
    store.dispatch(ActionCreator.clearAgentQuery());
    store.dispatch(ActionCreator.setAgentResponse(agentResponse));
    ActivationTask.doIt(store).then(callback22);
  };

  const callback20 = store => {
    // Verify.
    verifyPhaseKey(assert, store, Phase.ACTIVATION_PERFORM_ACTION, "callback20");
    verifyActivationQueue(assert, store, [], "callback20");
    verifyAgentQuery(assert, store, undefined, "callback20");
    verifyAgentResponse(assert, store, undefined, "callback20");
    ActivationTask.doIt(store).then(callback21);
  };

  const callback19 = store => {
    // Verify.
    verifyPhaseKey(assert, store, Phase.ACTIVATION_CLEAN_UP, "callback19");
    verifyActivationQueue(assert, store, [], "callback19");
    verifyAgentQuery(assert, store, undefined, "callback19");
    verifyAgentResponse(assert, store, undefined, "callback19");
    ActivationTask.doIt(store).then(callback20);
  };

  const callback18 = store => {
    // Verify.
    verifyPhaseKey(assert, store, Phase.ACTIVATION_CHECK_PILOT_STRESS, "callback18");
    verifyActivationQueue(assert, store, [], "callback18");
    verifyAgentQuery(assert, store, undefined, "callback18");
    verifyAgentResponse(assert, store, undefined, "callback18");
    ActivationTask.doIt(store).then(callback19);
  };

  const callback17 = store => {
    // Verify.
    verifyPhaseKey(assert, store, Phase.ACTIVATION_EXECUTE_MANEUVER, "callback17");
    verifyActivationQueue(assert, store, [], "callback17");
    verifyAgentQuery(assert, store, undefined, "callback17");
    verifyAgentResponse(assert, store, undefined, "callback17");
    ActivationTask.doIt(store).then(callback18);
  };

  const callback16 = store => {
    // Verify.
    verifyPhaseKey(assert, store, Phase.ACTIVATION_SET_TEMPLATE, "callback09");
    verifyActivationQueue(assert, store, [], "callback09");
    verifyAgentQuery(assert, store, undefined, "callback09");
    verifyAgentResponse(assert, store, undefined, "callback09");
    ActivationTask.doIt(store).then(callback17);
  };

  const callback15 = store => {
    // Verify.
    verifyPhaseKey(assert, store, Phase.ACTIVATION_REVEAL_DIAL, "callback15 ");
    verifyActivationQueue(assert, store, [3], "callback15 ");
    verifyAgentQuery(assert, store, undefined, "callback15 ");
    verifyAgentResponse(assert, store, undefined, "callback15 ");
    ActivationTask.doIt(store).then(callback16);
  };

  const callback14 = store => {
    // Verify.
    verifyPhaseKey(assert, store, Phase.ACTIVATION_PERFORM_ACTION, "callback14");
    verifyActivationQueue(assert, store, [3], "callback14");
    verifyAgentQuery(assert, store, AgentQueryType.CHOOSE_SHIP_ACTION, "callback14");
    const { agentQuery } = store.getState();
    const agentResponse = XMS.AgentResponseState.create({
      agentId: agentQuery.agentId,
      responseKey: AgentQueryType.CHOOSE_SHIP_ACTION,
      payload: {
        pilotId: agentQuery.payload.pilotId,
        shipActionKey: ShipAction.FOCUS
      }
    });
    store.dispatch(ActionCreator.clearAgentQuery());
    store.dispatch(ActionCreator.setAgentResponse(agentResponse));
    ActivationTask.doIt(store).then(callback15);
  };

  const callback13 = store => {
    // Verify.
    verifyPhaseKey(assert, store, Phase.ACTIVATION_PERFORM_ACTION, "callback13");
    verifyActivationQueue(assert, store, [3], "callback13");
    verifyAgentQuery(assert, store, undefined, "callback13");
    verifyAgentResponse(assert, store, undefined, "callback13");
    ActivationTask.doIt(store).then(callback14);
  };

  const callback12 = store => {
    // Verify.
    verifyPhaseKey(assert, store, Phase.ACTIVATION_CLEAN_UP, "callback12");
    verifyActivationQueue(assert, store, [3], "callback12");
    verifyAgentQuery(assert, store, undefined, "callback12");
    verifyAgentResponse(assert, store, undefined, "callback12");
    ActivationTask.doIt(store).then(callback13);
  };

  const callback11 = store => {
    // Verify.
    verifyPhaseKey(assert, store, Phase.ACTIVATION_CHECK_PILOT_STRESS, "callback11");
    verifyActivationQueue(assert, store, [3], "callback11");
    verifyAgentQuery(assert, store, undefined, "callback11");
    verifyAgentResponse(assert, store, undefined, "callback11");
    ActivationTask.doIt(store).then(callback12);
  };

  const callback10 = store => {
    // Verify.
    verifyPhaseKey(assert, store, Phase.ACTIVATION_EXECUTE_MANEUVER, "callback10");
    verifyActivationQueue(assert, store, [3], "callback10");
    verifyAgentQuery(assert, store, undefined, "callback10");
    verifyAgentResponse(assert, store, undefined, "callback10");
    ActivationTask.doIt(store).then(callback11);
  };

  const callback09 = store => {
    // Verify.
    verifyPhaseKey(assert, store, Phase.ACTIVATION_SET_TEMPLATE, "callback09");
    verifyActivationQueue(assert, store, [3], "callback09");
    verifyAgentQuery(assert, store, undefined, "callback09");
    verifyAgentResponse(assert, store, undefined, "callback09");
    ActivationTask.doIt(store).then(callback10);
  };

  const callback8 = store => {
    // Verify.
    verifyPhaseKey(assert, store, Phase.ACTIVATION_REVEAL_DIAL, "callback8 ");
    verifyActivationQueue(assert, store, [1, 3], "callback8 ");
    verifyAgentQuery(assert, store, undefined, "callback8 ");
    verifyAgentResponse(assert, store, undefined, "callback8 ");
    ActivationTask.doIt(store).then(callback09);
  };

  const callback7 = store => {
    // Verify.
    verifyPhaseKey(assert, store, Phase.ACTIVATION_PERFORM_ACTION, "callback7");
    verifyActivationQueue(assert, store, [1, 3], "callback7");
    verifyAgentQuery(assert, store, AgentQueryType.CHOOSE_SHIP_ACTION, "callback7");
    const { agentQuery } = store.getState();
    const agentResponse = XMS.AgentResponseState.create({
      agentId: agentQuery.agentId,
      responseKey: AgentQueryType.CHOOSE_SHIP_ACTION,
      payload: {
        pilotId: agentQuery.payload.pilotId,
        shipActionKey: ShipAction.FOCUS
      }
    });
    store.dispatch(ActionCreator.clearAgentQuery());
    store.dispatch(ActionCreator.setAgentResponse(agentResponse));
    ActivationTask.doIt(store).then(callback8);
  };

  const callback6 = store => {
    // Verify.
    verifyPhaseKey(assert, store, Phase.ACTIVATION_PERFORM_ACTION, "callback6");
    verifyActivationQueue(assert, store, [1, 3], "callback6");
    verifyAgentQuery(assert, store, undefined, "callback6");
    verifyAgentResponse(assert, store, undefined, "callback6");
    ActivationTask.doIt(store).then(callback7);
  };

  const callback5 = store => {
    // Verify.
    verifyPhaseKey(assert, store, Phase.ACTIVATION_CLEAN_UP, "callback5");
    verifyActivationQueue(assert, store, [1, 3], "callback5");
    verifyAgentQuery(assert, store, undefined, "callback5");
    verifyAgentResponse(assert, store, undefined, "callback5");
    ActivationTask.doIt(store).then(callback6);
  };

  const callback4 = store => {
    // Verify.
    verifyPhaseKey(assert, store, Phase.ACTIVATION_CHECK_PILOT_STRESS, "callback4");
    verifyActivationQueue(assert, store, [1, 3], "callback4");
    verifyAgentQuery(assert, store, undefined, "callback4");
    verifyAgentResponse(assert, store, undefined, "callback4");
    ActivationTask.doIt(store).then(callback5);
  };

  const callback3 = store => {
    // Verify.
    verifyPhaseKey(assert, store, Phase.ACTIVATION_EXECUTE_MANEUVER, "callback3");
    verifyActivationQueue(assert, store, [1, 3], "callback3");
    verifyAgentQuery(assert, store, undefined, "callback3");
    verifyAgentResponse(assert, store, undefined, "callback3");
    ActivationTask.doIt(store).then(callback4);
  };

  const callback2 = store => {
    // Verify.
    verifyPhaseKey(assert, store, Phase.ACTIVATION_SET_TEMPLATE, "callback2");
    verifyActivationQueue(assert, store, [1, 3], "callback2");
    verifyAgentQuery(assert, store, undefined, "callback2");
    verifyAgentResponse(assert, store, undefined, "callback2");
    ActivationTask.doIt(store).then(callback3);
  };

  const callback1 = store => {
    // Verify.
    verifyPhaseKey(assert, store, Phase.ACTIVATION_REVEAL_DIAL, "callback1 ");
    verifyActivationQueue(assert, store, [2, 1, 3], "callback1 ");
    verifyAgentQuery(assert, store, undefined, "callback1 ");
    verifyAgentResponse(assert, store, undefined, "callback1 ");
    ActivationTask.doIt(store).then(callback2);
  };

  ActivationTask.doIt(store0).then(callback1);
});

const ActivationTaskTest = {};
export default ActivationTaskTest;
