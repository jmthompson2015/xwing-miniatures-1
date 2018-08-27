import ExplosionState from "./ExplosionState.js";

QUnit.module("ExplosionState");

const PROPS = ["position", "size"];

const createTestState = () => ExplosionState.create({ position: 1, size: 2 });

QUnit.test("create()", assert => {
  // Run.
  const display = createTestState();

  // Verify.
  PROPS.forEach((prop, i) => {
    assert.equal(display[prop], i + 1);
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

const ExplosionStateTest = {};
export default ExplosionStateTest;
