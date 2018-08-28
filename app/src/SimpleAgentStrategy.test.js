import SimpleAgentStrategy from "./SimpleAgentStrategy.js";
import TestData from "./TestData.js";

const { Reducer } = XMS;

QUnit.module("SimpleAgentStrategy");

const createPilotToValidManeuvers = (pilotInstances, store) => {
  const reducerFunction = (accumulator, pilot) => {
    const shipKey = XMM.Selector.shipByPilot(pilot.id, store.getState()).key;
    const maneuvers = XMM.AgentUtilities.determineValidManeuvers(shipKey);
    return R.assoc(pilot.id, maneuvers, accumulator);
  };

  return R.reduce(reducerFunction, {})(pilotInstances);
};

// /////////////////////////////////////////////////////////////////////////////////////////////////
QUnit.test("chooseAttackDiceModification()", assert => {
  // Setup.
  const abilities = [1, 2, 3];

  // Run.
  const done = assert.async();
  const callback = result => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(result);
    assert.equal(abilities.includes(result), true);
    done();
  };
  SimpleAgentStrategy.chooseAttackDiceModification({
    abilities
  }).then(callback);
});

QUnit.test("chooseDefenseDiceModification()", assert => {
  // Setup.
  const abilities = [1, 2, 3];

  // Run.
  const done = assert.async();
  const callback = result => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(result);
    assert.equal(abilities.includes(result), true);
    done();
  };
  SimpleAgentStrategy.chooseDefenseDiceModification({
    abilities
  }).then(callback);
});

QUnit.test("chooseManeuvers() 1", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const agentId = 1;
  const pilotInstances = XMM.Selector.pilotInstancesByAgent(agentId, store.getState());
  const pilotToValidManeuvers = createPilotToValidManeuvers(pilotInstances, store);

  // Run.
  const done = assert.async();
  const callback = result => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(result);
    assert.equal(Object.keys(result).length, 2);
    assert.equal(result[1] !== undefined, true);
    assert.equal(result[2] !== undefined, true);
    assert.equal(result[3], undefined);
    done();
  };
  SimpleAgentStrategy.chooseManeuvers(pilotInstances, pilotToValidManeuvers).then(callback);
});

QUnit.test("chooseShipAction() 1", assert => {
  // Setup.
  const pilotName = "Academy Pilot";
  const shipKey = XMA.Ship.TIE_FIGHTER;
  const shipActionKeys = XMM.AgentUtilities.determineValidShipActions(shipKey);

  // Run.
  const done = assert.async();
  const callback = result => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(result);
    done();
  };
  SimpleAgentStrategy.chooseShipAction(pilotName, shipActionKeys).then(callback);
});

QUnit.test("chooseWeaponAndDefender()", assert => {
  // Setup.
  const pilotInstance1 = XMS.PilotState.create({
    id: 1,
    pilotKey: XMA.PilotCard.MAULER_MITHEL
  });
  const pilotInstance2 = XMS.PilotState.create({
    id: 2,
    pilotKey: XMA.PilotCard.DARK_CURSE
  });
  const pilotInstance3 = XMS.PilotState.create({
    id: 3,
    pilotKey: XMA.PilotCard.LUKE_SKYWALKER
  });
  const weaponToRangeToDefenders = {
    primary: {
      [XMA.Range.TWO]: [pilotInstance1],
      [XMA.Range.THREE]: [pilotInstance2]
    }
  };

  // Run.
  const done = assert.async();
  const callback = result => {
    // Verify.
    assert.ok(true, "test resumed from async operation");
    assert.ok(result);
    assert.equal(result.weaponKey, "primary");
    assert.equal([1, 2].includes(result.defenderId), true);
    done();
  };
  SimpleAgentStrategy.chooseWeaponAndDefender(pilotInstance3, weaponToRangeToDefenders).then(
    callback
  );
});

const SimpleAgentStrategyTest = {};
export default SimpleAgentStrategyTest;
