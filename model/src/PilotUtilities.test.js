import PilotUtilities from "./PilotUtilities.js";
import TestData from "./TestData.js";

const FiringArc = XMA.FiringArc;
const PilotCard = XMA.PilotCard;
const Range = XMA.Range;
const Stat = XMA.Stat;
const UpgradeCard = XMA.UpgradeCard;

const ActionCreator = XMS.ActionCreator;
const Reducer = XMS.Reducer;

QUnit.module("PilotUtilities");

QUnit.test("baseStat() agility", function(assert)
{
   // Setup.
   const statKey = XMA.Selector.stat(Stat.AGILITY).grant;
   const pilotKey = PilotCard.LUKE_SKYWALKER;

   // Run.
   const result = PilotUtilities.baseStat(statKey, pilotKey);

   // Verify.
   assert.equal(result, 2);
});

QUnit.test("baseStat() hull", function(assert)
{
   // Setup.
   const statKey = XMA.Selector.stat(Stat.HULL).grant;
   const pilotKey = PilotCard.LUKE_SKYWALKER;

   // Run.
   const result = PilotUtilities.baseStat(statKey, pilotKey);

   // Verify.
   assert.equal(result, 3);
});

QUnit.test("baseStat() pilot skill", function(assert)
{
   // Setup.
   const statKey = XMA.Selector.stat(Stat.PILOT_SKILL).grant;
   const pilotKey = PilotCard.LUKE_SKYWALKER;

   // Run.
   const result = PilotUtilities.baseStat(statKey, pilotKey);

   // Verify.
   assert.equal(result, 8);
});

QUnit.test("baseStat() primary weapon", function(assert)
{
   // Setup.
   const statKey = XMA.Selector.stat(Stat.PRIMARY_WEAPON).grant;
   const pilotKey = PilotCard.LUKE_SKYWALKER;

   // Run.
   const result = PilotUtilities.baseStat(statKey, pilotKey);

   // Verify.
   assert.equal(result, 3);
});

QUnit.test("baseStat() shields", function(assert)
{
   // Setup.
   const statKey = XMA.Selector.stat(Stat.SHIELD).grant;
   const pilotKey = PilotCard.LUKE_SKYWALKER;

   // Run.
   const result = PilotUtilities.baseStat(statKey, pilotKey);

   // Verify.
   assert.equal(result, 2);
});

QUnit.test("bonusStat() agility", function(assert)
{
   // Setup.
   const statKey = XMA.Selector.stat(Stat.AGILITY).grant;
   const upgradeKeys = [UpgradeCard.PROTON_TORPEDOES, UpgradeCard.SHIELD_UPGRADE];

   // Run.
   const result = PilotUtilities.bonusStat(statKey, upgradeKeys);

   // Verify.
   assert.equal(result, 0);
});

QUnit.test("bonusStat() hull", function(assert)
{
   // Setup.
   const statKey = XMA.Selector.stat(Stat.HULL).grant;
   const upgradeKeys = [UpgradeCard.HULL_UPGRADE];

   // Run.
   const result = PilotUtilities.bonusStat(statKey, upgradeKeys);

   // Verify.
   assert.equal(result, 1);
});

QUnit.test("bonusStat() pilot skill", function(assert)
{
   // Setup.
   const statKey = XMA.Selector.stat(Stat.PILOT_SKILL).grant;
   const upgradeKeys = [UpgradeCard.HULL_UPGRADE];

   // Run.
   const result = PilotUtilities.bonusStat(statKey, upgradeKeys);

   // Verify.
   assert.equal(result, 0);
});

QUnit.test("bonusStat() primary weapon", function(assert)
{
   // Setup.
   const statKey = XMA.Selector.stat(Stat.PRIMARY_WEAPON).grant;
   const upgradeKeys = [UpgradeCard.HULL_UPGRADE];

   // Run.
   const result = PilotUtilities.bonusStat(statKey, upgradeKeys);

   // Verify.
   assert.equal(result, 0);
});

QUnit.test("bonusStat() shields", function(assert)
{
   // Setup.
   const statKey = XMA.Selector.stat(Stat.SHIELD).grant;
   const upgradeKeys = [UpgradeCard.PROTON_TORPEDOES, UpgradeCard.SHIELD_UPGRADE];

   // Run.
   const result = PilotUtilities.bonusStat(statKey, upgradeKeys);

   // Verify.
   assert.equal(result, 1);
});

QUnit.test("createPilotToRange() 3", function(assert)
{
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

QUnit.test("createPilotToBearing() 3", function(assert)
{
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

QUnit.test("createStatBonuses()", function(assert)
{
   // Setup.
   const upgradeKeys = [UpgradeCard.HULL_UPGRADE, UpgradeCard.SHIELD_UPGRADE, UpgradeCard.VETERAN_INSTINCTS];

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

QUnit.test("isInFiringArc() Auxiliary 180", function(assert)
{
   // Setup.
   const firingArcKey = FiringArc.AUXILIARY_180;

   // Run / Verify.
   assert.equal(PilotUtilities.isInFiringArc(269, firingArcKey), false);
   assert.equal(PilotUtilities.isInFiringArc(270, firingArcKey), true);
   assert.equal(PilotUtilities.isInFiringArc(0, firingArcKey), true);
   assert.equal(PilotUtilities.isInFiringArc(90, firingArcKey), true);
   assert.equal(PilotUtilities.isInFiringArc(91, firingArcKey), false);
});

QUnit.test("isInFiringArc() Auxiliary Rear", function(assert)
{
   // Setup.
   const firingArcKey = FiringArc.AUXILIARY_REAR;

   // Run / Verify.
   assert.equal(PilotUtilities.isInFiringArc(134, firingArcKey), false);
   assert.equal(PilotUtilities.isInFiringArc(135, firingArcKey), true);
   assert.equal(PilotUtilities.isInFiringArc(180, firingArcKey), true);
   assert.equal(PilotUtilities.isInFiringArc(225, firingArcKey), true);
   assert.equal(PilotUtilities.isInFiringArc(226, firingArcKey), false);
});

QUnit.test("isInFiringArc() Front", function(assert)
{
   // Setup.
   const firingArcKey = FiringArc.FRONT;

   // Run / Verify.
   assert.equal(PilotUtilities.isInFiringArc(314, firingArcKey), false);
   assert.equal(PilotUtilities.isInFiringArc(315, firingArcKey), true);
   assert.equal(PilotUtilities.isInFiringArc(0, firingArcKey), true);
   assert.equal(PilotUtilities.isInFiringArc(45, firingArcKey), true);
   assert.equal(PilotUtilities.isInFiringArc(46, firingArcKey), false);
});

QUnit.test("isInFiringArc() Front", function(assert)
{
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

QUnit.test("normalizeAngle()", function(assert)
{
   assert.equal(PilotUtilities.normalizeAngle(3), 3);
   assert.equal(PilotUtilities.normalizeAngle(363), 3);
   assert.equal(PilotUtilities.normalizeAngle(-357), 3);
});

QUnit.test("statValue() agility", function(assert)
{
   // Setup.
   const statKey = XMA.Selector.stat(Stat.AGILITY).grant;
   const pilotKey = PilotCard.LUKE_SKYWALKER;
   const upgradeKeys = [UpgradeCard.PROTON_TORPEDOES, UpgradeCard.R2_D2_ASTROMECH];

   // Run.
   const result = PilotUtilities.statValue(statKey, pilotKey, upgradeKeys);

   // Verify.
   assert.equal(result, 2);
});

QUnit.test("statValue() hull", function(assert)
{
   // Setup.
   const statKey = XMA.Selector.stat(Stat.HULL).grant;
   const pilotKey = PilotCard.LUKE_SKYWALKER;
   const upgradeKeys = [UpgradeCard.PROTON_TORPEDOES, UpgradeCard.R2_D2_ASTROMECH, UpgradeCard.HULL_UPGRADE];

   // Run.
   const result = PilotUtilities.statValue(statKey, pilotKey, upgradeKeys);

   // Verify.
   assert.equal(result, 4);
});

QUnit.test("statValue() pilot skill", function(assert)
{
   // Setup.
   const statKey = XMA.Selector.stat(Stat.PILOT_SKILL).grant;
   const pilotKey = PilotCard.LUKE_SKYWALKER;
   const upgradeKeys = [UpgradeCard.PROTON_TORPEDOES, UpgradeCard.R2_D2_ASTROMECH, UpgradeCard.HULL_UPGRADE];

   // Run.
   const result = PilotUtilities.statValue(statKey, pilotKey, upgradeKeys);

   // Verify.
   assert.equal(result, 8);
});

QUnit.test("statValue() primary weapon", function(assert)
{
   // Setup.
   const statKey = XMA.Selector.stat(Stat.PRIMARY_WEAPON).grant;
   const pilotKey = PilotCard.LUKE_SKYWALKER;
   const upgradeKeys = [UpgradeCard.PROTON_TORPEDOES, UpgradeCard.R2_D2_ASTROMECH, UpgradeCard.HULL_UPGRADE];

   // Run.
   const result = PilotUtilities.statValue(statKey, pilotKey, upgradeKeys);

   // Verify.
   assert.equal(result, 3);
});

QUnit.test("statValue() shields", function(assert)
{
   // Setup.
   const statKey = XMA.Selector.stat(Stat.SHIELD).grant;
   const pilotKey = PilotCard.LUKE_SKYWALKER;
   const upgradeKeys = [UpgradeCard.PROTON_TORPEDOES, UpgradeCard.R2_D2_ASTROMECH, UpgradeCard.SHIELD_UPGRADE];

   // Run.
   const result = PilotUtilities.statValue(statKey, pilotKey, upgradeKeys);

   // Verify.
   assert.equal(result, 3);
});

////////////////////////////////////////////////////////////////////////////////
const createStore = () =>
{
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const position1 = XMS.PositionState.create(
   {
      x: 380,
      y: 915 - 100,
      heading: 90
   });
   const position2 = XMS.PositionState.create(
   {
      x: 915 * 2 / 3,
      y: 915 - 180,
      heading: 90
   });
   store.dispatch(ActionCreator.movePilot(1, position1));
   store.dispatch(ActionCreator.movePilot(2, position2));

   return store;
};

const PilotUtilitiesTest = {};
export default PilotUtilitiesTest;