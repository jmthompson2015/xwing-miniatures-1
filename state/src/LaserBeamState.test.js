import LaserBeamState from "./LaserBeamState.js";

QUnit.module("LaserBeamState");

const PROPS = ["color", "fromPosition", "isPrimary", "toPosition"];

const createTestState = () =>
  LaserBeamState.create({ color: 1, fromPosition: 2, isPrimary: 3, toPosition: 4 });

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

const LaserBeamStateTest = {};
export default LaserBeamStateTest;
