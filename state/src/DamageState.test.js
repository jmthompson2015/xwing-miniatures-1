import DamageState from "./DamageState.js";

QUnit.module("DamageState");

const PROPS = ["id", "damageKey"];

const createTestData = () => DamageState.create({ id: 1, damageKey: 2 });

QUnit.test("create()", assert => {
  // Run.
  const damage = createTestData();

  // Verify.
  PROPS.forEach((prop, i) => {
    assert.equal(damage[prop], i + 1);
  });
});

QUnit.test("create() immutable", assert => {
  // Setup.
  const damage = createTestData();

  // Run / Verify.
  try {
    damage.id = 12;
    assert.ok(false, "Should have thrown an exception");
  } catch (e) {
    assert.ok(true);
  }
});

const DamageStateTest = {};
export default DamageStateTest;
