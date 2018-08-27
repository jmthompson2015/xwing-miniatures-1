import StatBonusesState from "./StatBonusesState.js";

QUnit.module("StatBonusesState");

const PROPS = ["agility", "energy", "hull", "pilotSkill", "primaryWeapon", "shield"];

const createTestState = () =>
  StatBonusesState.create({
    agility: 1,
    energy: 2,
    hull: 3,
    pilotSkill: 4,
    primaryWeapon: 5,
    shield: 6
  });

QUnit.test("create()", assert => {
  // Setup.

  // Run.
  const statBonuses = createTestState();

  // Verify.
  PROPS.forEach((prop, i) => {
    assert.equal(statBonuses[prop], i + 1);
  });
});

QUnit.test("create() Default", assert => {
  // Setup.
  const statBonuses = StatBonusesState.create();

  // Verify.
  PROPS.forEach(prop => {
    assert.equal(statBonuses[prop], undefined);
  });
});

QUnit.test("create() immutable", assert => {
  // Setup.
  const statBonuses = createTestState();

  // Run / Verify.
  try {
    statBonuses.agility = 12;
    assert.ok(false, "Should have thrown an exception");
  } catch (e) {
    assert.ok(true);
  }
});

const StatBonusesStateTest = {};
export default StatBonusesStateTest;
