import AgentQueryType from "./AgentQueryType.js";
import DamageDeck from "./DamageDeck.js";
import PlanningTask from "./PlanningTask.js";
import SquadBuilder from "./SquadBuilder.js";

const { Maneuver, Phase } = XMA;

const { ActionCreator, Reducer } = XMS;

QUnit.module("PlanningTask");

const createAgent1 = store => {
  const agentId = XMS.Selector.nextAgentId(store.getState());
  const agent = XMS.AgentState.create({
    id: agentId,
    name: "Imperial Agent"
  });
  store.dispatch(ActionCreator.setAgentInstance(agent));

  return agent;
};

const createAgent2 = store => {
  const agentId = XMS.Selector.nextAgentId(store.getState());
  const agent = XMS.AgentState.create({
    id: agentId,
    name: "Rebel Agent"
  });
  store.dispatch(ActionCreator.setAgentInstance(agent));

  return agent;
};

const createDamageDeck = store => {
  const damageObj = DamageDeck.create(XMA.DamageCardTFA);
  store.dispatch(ActionCreator.setDamageInstances(damageObj.damageInstances));
  store.dispatch(ActionCreator.setDamageDeck(damageObj.damageDeck));
};

const createSquad1 = (store, agentId) => SquadBuilder.buildCoreSetImperial(store, agentId);

const createSquad2 = (store, agentId) => SquadBuilder.buildCoreSetRebel(store, agentId);

const initializeGameState = store => {
  const agent1 = createAgent1(store);
  createSquad1(store, agent1.id);
  const agent2 = createAgent2(store);
  createSquad2(store, agent2.id);
  createDamageDeck(store);
};

const setPhase = (store, phaseKey) => store.dispatch(ActionCreator.setPhase(phaseKey));

const verifyActiveAgentId = (assert, store, expected, messagePrefix = "callback ") =>
  assert.equal(store.getState().activeAgentId, expected, `${messagePrefix}activeAgentId`);

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

const verifyPlanningQueue = (assert, store, expected, messagePrefix = "callback ") => {
  const { planningQueue } = store.getState();
  assert.ok(planningQueue, `${messagePrefix}planningQueue`);
  assert.equal(planningQueue.length, expected.length, `${messagePrefix}planningQueue.length`);
  for (let i = 0; i < expected.length; i += 1) {
    assert.equal(planningQueue[i], expected[i], `${messagePrefix}planningQueue[${i}]`);
  }
};

const verifyRound = (assert, store, expected, messagePrefix = "callback ") =>
  assert.equal(store.getState().round, expected, `${messagePrefix}round`);

// /////////////////////////////////////////////////////////////////////////////////////////////////
QUnit.test("doIt() Start", assert => {
  // Setup.
  const store0 = Redux.createStore(Reducer.root);
  initializeGameState(store0);
  store0.dispatch(ActionCreator.setPlanningQueue([1, 2]));
  setPhase(store0, Phase.PLANNING_START);

  // Run.
  const done = assert.async();
  const callback = store => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    verifyRound(assert, store, 1);
    verifyPhaseKey(assert, store, Phase.PLANNING);
    verifyPlanningQueue(assert, store, [1, 2]);
    verifyActiveAgentId(assert, store, undefined);
    verifyAgentQuery(assert, store, undefined);
    verifyAgentResponse(assert, store, undefined);
    done();
  };
  PlanningTask.doIt(store0).then(callback);
});

QUnit.test("doIt() Planning query", assert => {
  // Setup.
  const store0 = Redux.createStore(Reducer.root);
  initializeGameState(store0);
  store0.dispatch(ActionCreator.setPlanningQueue([1, 2]));
  store0.dispatch(ActionCreator.incrementRound());
  setPhase(store0, Phase.PLANNING);
  verifyActiveAgentId(assert, store0, undefined, "");

  // Run.
  const done = assert.async();
  const callback = store => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    verifyRound(assert, store, 1);
    verifyPhaseKey(assert, store, Phase.PLANNING);
    verifyPlanningQueue(assert, store, [2]);
    verifyActiveAgentId(assert, store, 1);
    verifyAgentQuery(assert, store, AgentQueryType.CHOOSE_MANEUVERS);
    verifyAgentResponse(assert, store, undefined);
    done();
  };
  PlanningTask.doIt(store0).then(callback);
});

QUnit.test("doIt() Planning response", assert => {
  // Setup.
  const store0 = Redux.createStore(Reducer.root);
  initializeGameState(store0);
  store0.dispatch(ActionCreator.setPlanningQueue([1, 2]));
  store0.dispatch(ActionCreator.dequeuePlanning());
  const pilotToManeuver = {};
  pilotToManeuver[1] = Maneuver.STRAIGHT_1_STANDARD_1FW;
  pilotToManeuver[2] = Maneuver.STRAIGHT_1_STANDARD_1FW;
  const agentResponse = XMS.AgentResponseState.create({
    agentId: 1,
    responseKey: AgentQueryType.CHOOSE_MANEUVERS,
    payload: {
      pilotToManeuver
    }
  });
  store0.dispatch(ActionCreator.setAgentResponse(agentResponse));
  store0.dispatch(ActionCreator.incrementRound());
  setPhase(store0, Phase.PLANNING);

  // Run.
  const done = assert.async();
  const callback = store => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    verifyRound(assert, store, 1);
    verifyPhaseKey(assert, store, Phase.PLANNING);
    verifyPlanningQueue(assert, store, [2]);
    verifyActiveAgentId(assert, store, 1);
    verifyAgentQuery(assert, store, undefined);
    verifyAgentResponse(assert, store, undefined);
    done();
  };
  PlanningTask.doIt(store0).then(callback);
});

QUnit.test("doIt() End", assert => {
  // Setup.
  const store0 = Redux.createStore(Reducer.root);
  initializeGameState(store0);
  store0.dispatch(ActionCreator.incrementRound());
  setPhase(store0, Phase.PLANNING_END);

  // Run.
  const done = assert.async();
  const callback = store => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    verifyRound(assert, store, 1);
    verifyPhaseKey(assert, store, Phase.ACTIVATION_START);
    verifyPlanningQueue(assert, store, []);
    verifyActiveAgentId(assert, store, undefined);
    verifyAgentQuery(assert, store, undefined);
    verifyAgentResponse(assert, store, undefined);
    done();
  };
  PlanningTask.doIt(store0).then(callback);
});

QUnit.test("doIt() Full Cycle", assert => {
  // Setup.
  const store0 = Redux.createStore(Reducer.root);
  initializeGameState(store0);
  store0.dispatch(ActionCreator.setPlanningQueue([1, 2]));
  setPhase(store0, Phase.PLANNING_START);

  // Run.
  const done = assert.async();
  const callback06 = store => {
    verifyPhaseKey(assert, store, Phase.PLANNING_END, "callback06 ");
    verifyPlanningQueue(assert, store, [], "callback06 ");
    verifyActiveAgentId(assert, store, undefined, "callback06 ");
    verifyAgentQuery(assert, store, undefined, "callback06 ");
    verifyAgentResponse(assert, store, undefined, "callback06 ");
    assert.equal(
      store.getState().pilotToManeuver[1],
      Maneuver.BANK_LEFT_1_STANDARD_1BW,
      "callback06 pilot1 maneuver"
    );
    assert.equal(
      store.getState().pilotToManeuver[2],
      Maneuver.STRAIGHT_1_STANDARD_1FW,
      "callback06 pilot2 maneuver"
    );
    assert.equal(
      store.getState().pilotToManeuver[3],
      Maneuver.TURN_RIGHT_1_STANDARD_1YW,
      "callback06 pilot3 maneuver"
    );
    done();
  };

  const callback05 = store => {
    verifyPhaseKey(assert, store, Phase.PLANNING, "callback05 ");
    verifyPlanningQueue(assert, store, [], "callback05 ");
    verifyActiveAgentId(assert, store, 2, "callback05 ");
    verifyAgentQuery(assert, store, undefined, "callback05 ");
    verifyAgentResponse(assert, store, undefined, "callback05 ");
    PlanningTask.doIt(store).then(callback06);
  };

  const callback04 = store => {
    verifyPhaseKey(assert, store, Phase.PLANNING, "callback04 ");
    verifyPlanningQueue(assert, store, [], "callback04 ");
    verifyActiveAgentId(assert, store, 2, "callback04 ");
    verifyAgentQuery(assert, store, AgentQueryType.CHOOSE_MANEUVERS, "callback04 ");
    const { agentQuery } = store.getState();
    const pilotToManeuver = {};
    pilotToManeuver[3] = Maneuver.TURN_RIGHT_1_STANDARD_1YW;
    const agentResponse = XMS.AgentResponseState.create({
      agentId: agentQuery.agentId,
      responseKey: AgentQueryType.CHOOSE_MANEUVERS,
      payload: {
        pilotToManeuver
      }
    });
    store.dispatch(ActionCreator.clearAgentQuery());
    store.dispatch(ActionCreator.setAgentResponse(agentResponse));
    PlanningTask.doIt(store).then(callback05);
  };

  const callback03 = store => {
    verifyPhaseKey(assert, store, Phase.PLANNING, "callback03 ");
    verifyPlanningQueue(assert, store, [2], "callback03 ");
    verifyActiveAgentId(assert, store, 1, "callback03 ");
    verifyAgentQuery(assert, store, undefined, "callback03 ");
    verifyAgentResponse(assert, store, undefined, "callback03 ");
    PlanningTask.doIt(store).then(callback04);
  };

  const callback02 = store => {
    verifyPhaseKey(assert, store, Phase.PLANNING, "callback02 ");
    verifyPlanningQueue(assert, store, [2], "callback02 ");
    verifyActiveAgentId(assert, store, 1, "callback02 ");
    verifyAgentQuery(assert, store, AgentQueryType.CHOOSE_MANEUVERS, "callback02 ");
    const { agentQuery } = store.getState();
    const pilotToManeuver = {};
    pilotToManeuver[1] = Maneuver.BANK_LEFT_1_STANDARD_1BW;
    pilotToManeuver[2] = Maneuver.STRAIGHT_1_STANDARD_1FW;
    const agentResponse = XMS.AgentResponseState.create({
      agentId: agentQuery.agentId,
      responseKey: AgentQueryType.CHOOSE_MANEUVERS,
      payload: {
        pilotToManeuver
      }
    });
    store.dispatch(ActionCreator.clearAgentQuery());
    store.dispatch(ActionCreator.setAgentResponse(agentResponse));
    PlanningTask.doIt(store).then(callback03);
  };

  const callback01 = store => {
    verifyPhaseKey(assert, store, Phase.PLANNING, "callback01 ");
    verifyPlanningQueue(assert, store, [1, 2], "callback01 ");
    verifyActiveAgentId(assert, store, undefined, "callback01 ");
    verifyAgentQuery(assert, store, undefined, "callback01 ");
    verifyAgentResponse(assert, store, undefined, "callback01 ");
    PlanningTask.doIt(store).then(callback02);
  };

  PlanningTask.doIt(store0).then(callback01);
});

const PlanningTaskTest = {};
export default PlanningTaskTest;
