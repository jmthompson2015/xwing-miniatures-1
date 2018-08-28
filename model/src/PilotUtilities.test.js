import PilotUtilities from "./PilotUtilities.js";
import TestData from "./TestData.js";

const { FiringArc, PilotCard, Range, Stat, UpgradeCard } = XMA;

const { ActionCreator, Reducer } = XMS;

QUnit.module("PilotUtilities");

const createStore = () => {
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

  return store;
};

// /////////////////////////////////////////////////////////////////////////////////////////////////
QUnit.test("baseStat() agility", assert => {
  // Setup.
  const statKey = XMA.Selector.stat(Stat.AGILITY).grant;
  const pilotKey = PilotCard.LUKE_SKYWALKER;

  // Run.
  const result = PilotUtilities.baseStat(statKey, pilotKey);

  // Verify.
  assert.equal(result, 2);
});

QUnit.test("baseStat() hull", assert => {
  // Setup.
  const statKey = XMA.Selector.stat(Stat.HULL).grant;
  const pilotKey = PilotCard.LUKE_SKYWALKER;

  // Run.
  const result = PilotUtilities.baseStat(statKey, pilotKey);

  // Verify.
  assert.equal(result, 3);
});

QUnit.test("baseStat() pilot skill", assert => {
  // Setup.
  const statKey = XMA.Selector.stat(Stat.PILOT_SKILL).grant;
  const pilotKey = PilotCard.LUKE_SKYWALKER;

  // Run.
  const result = PilotUtilities.baseStat(statKey, pilotKey);

  // Verify.
  assert.equal(result, 8);
});

QUnit.test("baseStat() primary weapon", assert => {
  // Setup.
  const statKey = XMA.Selector.stat(Stat.PRIMARY_WEAPON).grant;
  const pilotKey = PilotCard.LUKE_SKYWALKER;

  // Run.
  const result = PilotUtilities.baseStat(statKey, pilotKey);

  // Verify.
  assert.equal(result, 3);
});

QUnit.test("baseStat() shields", assert => {
  // Setup.
  const statKey = XMA.Selector.stat(Stat.SHIELD).grant;
  const pilotKey = PilotCard.LUKE_SKYWALKER;

  // Run.
  const result = PilotUtilities.baseStat(statKey, pilotKey);

  // Verify.
  assert.equal(result, 2);
});

QUnit.test("bonusStat() agility", assert => {
  // Setup.
  const statKey = XMA.Selector.stat(Stat.AGILITY).grant;
  const upgradeKeys = [UpgradeCard.PROTON_TORPEDOES, UpgradeCard.SHIELD_UPGRADE];

  // Run.
  const result = PilotUtilities.bonusStat(statKey, upgradeKeys);

  // Verify.
  assert.equal(result, 0);
});

QUnit.test("bonusStat() hull", assert => {
  // Setup.
  const statKey = XMA.Selector.stat(Stat.HULL).grant;
  const upgradeKeys = [UpgradeCard.HULL_UPGRADE];

  // Run.
  const result = PilotUtilities.bonusStat(statKey, upgradeKeys);

  // Verify.
  assert.equal(result, 1);
});

QUnit.test("bonusStat() pilot skill", assert => {
  // Setup.
  const statKey = XMA.Selector.stat(Stat.PILOT_SKILL).grant;
  const upgradeKeys = [UpgradeCard.HULL_UPGRADE];

  // Run.
  const result = PilotUtilities.bonusStat(statKey, upgradeKeys);

  // Verify.
  assert.equal(result, 0);
});

QUnit.test("bonusStat() primary weapon", assert => {
  // Setup.
  const statKey = XMA.Selector.stat(Stat.PRIMARY_WEAPON).grant;
  const upgradeKeys = [UpgradeCard.HULL_UPGRADE];

  // Run.
  const result = PilotUtilities.bonusStat(statKey, upgradeKeys);

  // Verify.
  assert.equal(result, 0);
});

QUnit.test("bonusStat() shields", assert => {
  // Setup.
  const statKey = XMA.Selector.stat(Stat.SHIELD).grant;
  const upgradeKeys = [UpgradeCard.PROTON_TORPEDOES, UpgradeCard.SHIELD_UPGRADE];

  // Run.
  const result = PilotUtilities.bonusStat(statKey, upgradeKeys);

  // Verify.
  assert.equal(result, 1);
});

QUnit.test("createPilotToRange() 3", assert => {
  // Setup.
  const store = createStore();
  const pilotId = 3;

  // Run.
  const result = PilotUtilities.createPilotToRange(store.getState(), pilotId);

  // Verify.
  assert.ok(result);
  assert.equal(Object.keys(result).length, 2);
  assert.equal(result[1], Range.TWO);
  assert.equal(result[2], Range.THREE);
  assert.equal(result[3], undefined);
});

QUnit.test("createPilotToBearing() 3", assert => {
  // Setup.
  const store = createStore();
  const pilotId = 3;

  // Run.
  const result = PilotUtilities.createPilotToBearing(store.getState(), pilotId);

  // Verify.
  assert.ok(result);
  assert.equal(Object.keys(result).length, 2);
  assert.equal(result[1], 316);
  assert.equal(result[2], 44);
  assert.equal(result[3], undefined);
});

QUnit.test("createStatBonuses()", assert => {
  // Setup.
  const upgradeKeys = [
    UpgradeCard.HULL_UPGRADE,
    UpgradeCard.SHIELD_UPGRADE,
    UpgradeCard.VETERAN_INSTINCTS
  ];

  // Run.
  const result = PilotUtilities.createStatBonuses(upgradeKeys);

  // Verify.
  assert.ok(result);
  assert.equal(result.agility, 0, "agility");
  assert.equal(result.energy, 0, "energy");
  assert.equal(result.hull, 1, "hull");
  assert.equal(result.pilotSkill, 2, "pilotSkill");
  assert.equal(result.primaryWeapon, 0, "primaryWeapon");
  assert.equal(result.shield, 1, "shield");
});

QUnit.test("isInFiringArc() Auxiliary 180", assert => {
  // Setup.
  const firingArcKey = FiringArc.AUXILIARY_180;

  // Run / Verify.
  assert.equal(PilotUtilities.isInFiringArc(269, firingArcKey), false);
  assert.equal(PilotUtilities.isInFiringArc(270, firingArcKey), true);
  assert.equal(PilotUtilities.isInFiringArc(0, firingArcKey), true);
  assert.equal(PilotUtilities.isInFiringArc(90, firingArcKey), true);
  assert.equal(PilotUtilities.isInFiringArc(91, firingArcKey), false);
});

QUnit.test("isInFiringArc() Auxiliary Rear", assert => {
  // Setup.
  const firingArcKey = FiringArc.AUXILIARY_REAR;

  // Run / Verify.
  assert.equal(PilotUtilities.isInFiringArc(134, firingArcKey), false);
  assert.equal(PilotUtilities.isInFiringArc(135, firingArcKey), true);
  assert.equal(PilotUtilities.isInFiringArc(180, firingArcKey), true);
  assert.equal(PilotUtilities.isInFiringArc(225, firingArcKey), true);
  assert.equal(PilotUtilities.isInFiringArc(226, firingArcKey), false);
});

QUnit.test("isInFiringArc() Front", assert => {
  // Setup.
  const firingArcKey = FiringArc.FRONT;

  // Run / Verify.
  assert.equal(PilotUtilities.isInFiringArc(314, firingArcKey), false);
  assert.equal(PilotUtilities.isInFiringArc(315, firingArcKey), true);
  assert.equal(PilotUtilities.isInFiringArc(0, firingArcKey), true);
  assert.equal(PilotUtilities.isInFiringArc(45, firingArcKey), true);
  assert.equal(PilotUtilities.isInFiringArc(46, firingArcKey), false);
});

QUnit.test("isInFiringArc() Front", assert => {
  // Setup.
  const firingArcKey = FiringArc.TURRET;

  // Run / Verify.
  assert.equal(PilotUtilities.isInFiringArc(0, firingArcKey), true);
  assert.equal(PilotUtilities.isInFiringArc(45, firingArcKey), true);
  assert.equal(PilotUtilities.isInFiringArc(90, firingArcKey), true);
  assert.equal(PilotUtilities.isInFiringArc(135, firingArcKey), true);
  assert.equal(PilotUtilities.isInFiringArc(180, firingArcKey), true);
  assert.equal(PilotUtilities.isInFiringArc(225, firingArcKey), true);
  assert.equal(PilotUtilities.isInFiringArc(270, firingArcKey), true);
  assert.equal(PilotUtilities.isInFiringArc(315, firingArcKey), true);
  assert.equal(PilotUtilities.isInFiringArc(359, firingArcKey), true);
});

QUnit.test("normalizeAngle()", assert => {
  assert.equal(PilotUtilities.normalizeAngle(3), 3);
  assert.equal(PilotUtilities.normalizeAngle(363), 3);
  assert.equal(PilotUtilities.normalizeAngle(-357), 3);
});

QUnit.test("statValue() agility", assert => {
  // Setup.
  const statKey = XMA.Selector.stat(Stat.AGILITY).grant;
  const pilotKey = PilotCard.LUKE_SKYWALKER;
  const upgradeKeys = [UpgradeCard.PROTON_TORPEDOES, UpgradeCard.R2_D2_ASTROMECH];

  // Run.
  const result = PilotUtilities.statValue(statKey, pilotKey, upgradeKeys);

  // Verify.
  assert.equal(result, 2);
});

QUnit.test("statValue() hull", assert => {
  // Setup.
  const statKey = XMA.Selector.stat(Stat.HULL).grant;
  const pilotKey = PilotCard.LUKE_SKYWALKER;
  const upgradeKeys = [
    UpgradeCard.PROTON_TORPEDOES,
    UpgradeCard.R2_D2_ASTROMECH,
    UpgradeCard.HULL_UPGRADE
  ];

  // Run.
  const result = PilotUtilities.statValue(statKey, pilotKey, upgradeKeys);

  // Verify.
  assert.equal(result, 4);
});

QUnit.test("statValue() pilot skill", assert => {
  // Setup.
  const statKey = XMA.Selector.stat(Stat.PILOT_SKILL).grant;
  const pilotKey = PilotCard.LUKE_SKYWALKER;
  const upgradeKeys = [
    UpgradeCard.PROTON_TORPEDOES,
    UpgradeCard.R2_D2_ASTROMECH,
    UpgradeCard.HULL_UPGRADE
  ];

  // Run.
  const result = PilotUtilities.statValue(statKey, pilotKey, upgradeKeys);

  // Verify.
  assert.equal(result, 8);
});

QUnit.test("statValue() primary weapon", assert => {
  // Setup.
  const statKey = XMA.Selector.stat(Stat.PRIMARY_WEAPON).grant;
  const pilotKey = PilotCard.LUKE_SKYWALKER;
  const upgradeKeys = [
    UpgradeCard.PROTON_TORPEDOES,
    UpgradeCard.R2_D2_ASTROMECH,
    UpgradeCard.HULL_UPGRADE
  ];

  // Run.
  const result = PilotUtilities.statValue(statKey, pilotKey, upgradeKeys);

  // Verify.
  assert.equal(result, 3);
});

QUnit.test("statValue() shields", assert => {
  // Setup.
  const statKey = XMA.Selector.stat(Stat.SHIELD).grant;
  const pilotKey = PilotCard.LUKE_SKYWALKER;
  const upgradeKeys = [
    UpgradeCard.PROTON_TORPEDOES,
    UpgradeCard.R2_D2_ASTROMECH,
    UpgradeCard.SHIELD_UPGRADE
  ];

  // Run.
  const result = PilotUtilities.statValue(statKey, pilotKey, upgradeKeys);

  // Verify.
  assert.equal(result, 3);
});

const PilotUtilitiesTest = {};
export default PilotUtilitiesTest;
