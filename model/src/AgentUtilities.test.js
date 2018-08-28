import AgentUtilities from "./AgentUtilities.js";
import Selector from "./Selector.js";
import TestData from "./TestData.js";

const { Maneuver, Ship, ShipAction } = XMA;

const { ActionCreator, Reducer } = XMS;

QUnit.module("AgentUtilities");

QUnit.test("determineValidManeuvers() X-Wing", assert => {
  // Setup.
  const shipKey = Ship.X_WING;
  const fromPosition = XMS.PositionState.create({
    x: 0,
    y: 0,
    heading: 0
  });

  // Run.
  const result = AgentUtilities.determineValidManeuvers(shipKey, fromPosition);

  // Verify.
  assert.ok(result);
  const length = 15;
  assert.equal(result.length, length);
  assert.equal(result[0], Maneuver.BANK_LEFT_1_EASY_1BG);
  assert.equal(result[length - 1], Maneuver.KOIOGRAN_TURN_4_HARD_4KR);
});

QUnit.test("determineValidShipActions() X-Wing", assert => {
  // Setup.
  const shipKey = Ship.X_WING;

  // Run.
  const result = AgentUtilities.determineValidShipActions(shipKey);

  // Verify.
  assert.ok(result);
  const length = 2;
  assert.equal(result.length, length);
  assert.equal(result[0], ShipAction.FOCUS);
  assert.equal(result[length - 1], ShipAction.TARGET_LOCK);
});

QUnit.test("determineWeaponToRangeToDefenders() out of range", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const pilotInstance = Selector.pilotInstance(3, store.getState());

  // Run.
  const result = AgentUtilities.determineWeaponToRangeToDefenders(pilotInstance, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(Object.keys(result).length, 0);
});

QUnit.test("determineWeaponToRangeToDefenders() Dark Curse", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const position1 = XMS.PositionState.create({
    x: 380,
    y: 915 - 100,
    heading: 90
  });
  const position2 = XMS.PositionState.create({
    x: (915 * 2) / 3,
    y: 915 - 180,
    heading: 120
  });
  store.dispatch(ActionCreator.movePilot(1, position1));
  store.dispatch(ActionCreator.movePilot(2, position2));
  const attackerInstance = Selector.pilotInstance(2, store.getState());

  // Run.
  const result = AgentUtilities.determineWeaponToRangeToDefenders(
    attackerInstance,
    store.getState()
  );

  // Verify.
  assert.ok(result);
  assert.equal(Object.keys(result).length, 1);
  const rangeToDefenders0 = result.primary;
  assert.ok(rangeToDefenders0, "rangeToDefenders0");
  assert.equal(Object.keys(rangeToDefenders0).length, 1);
  assert.equal(rangeToDefenders0.one, undefined);
  assert.equal(rangeToDefenders0.two, undefined);
  assert.equal(rangeToDefenders0.three, 3);
  assert.equal(rangeToDefenders0.four, undefined);
  assert.equal(rangeToDefenders0.five, undefined);

  const rangeToDefenders1 = result.protonTorpedoes;
  assert.equal(rangeToDefenders1, undefined, "rangeToDefenders1");
});

QUnit.test("determineWeaponToRangeToDefenders() Luke Skywalker", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
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
  store.dispatch(ActionCreator.movePilot(1, position1));
  store.dispatch(ActionCreator.movePilot(2, position2));
  const pilotInstance = Selector.pilotInstance(3, store.getState());

  // Run.
  const result = AgentUtilities.determineWeaponToRangeToDefenders(pilotInstance, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(Object.keys(result).length, 2);
  const rangeToDefenders0 = result.primary;
  assert.ok(rangeToDefenders0, "rangeToDefenders0");
  assert.equal(Object.keys(rangeToDefenders0).length, 2);
  assert.equal(rangeToDefenders0.one, undefined);
  assert.equal(rangeToDefenders0.two, 1);
  assert.equal(rangeToDefenders0.three, 2);
  assert.equal(rangeToDefenders0.four, undefined);
  assert.equal(rangeToDefenders0.five, undefined);

  const rangeToDefenders1 = result.protonTorpedoes;
  assert.ok(rangeToDefenders1, "rangeToDefenders1");
  assert.equal(Object.keys(rangeToDefenders1).length, 2);
  assert.equal(rangeToDefenders1.one, undefined);
  assert.equal(rangeToDefenders1.two, 1);
  assert.equal(rangeToDefenders1.three, 2);
  assert.equal(rangeToDefenders1.four, undefined);
  assert.equal(rangeToDefenders1.five, undefined);
});

const AgentUtilitiesTest = {};
export default AgentUtilitiesTest;
