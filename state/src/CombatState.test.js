import CombatState from "./CombatState.js";

QUnit.module("CombatState");

const PROPS = [
  "id",
  "attackerId",
  "defenderId",
  "rangeKey",
  "weaponKey",
  "criticalDamage",
  "hitDamage",
  "shieldDamage",
  "attackDiceKeys",
  "defenseDiceKeys"
];

const createTestState = () =>
  CombatState.create({
    id: 1,
    attackerId: 2,
    defenderId: 3,
    rangeKey: 4,
    weaponKey: 5,

    criticalDamage: 6,
    hitDamage: 7,
    shieldDamage: 8,

    attackDiceKeys: 9,
    defenseDiceKeys: 10
  });

QUnit.test("create()", assert => {
  // Run.
  const pilot = createTestState();

  // Verify.
  PROPS.forEach((prop, i) => {
    assert.equal(pilot[prop], i + 1);
  });
});

QUnit.test("create() immutable", assert => {
  // Setup.
  const pilot = createTestState();

  // Run / Verify.
  try {
    pilot.id = 12;
    assert.ok(false, "Should have thrown an exception");
  } catch (e) {
    assert.ok(true);
  }
});

const CombatStateTest = {};
export default CombatStateTest;
