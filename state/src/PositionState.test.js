import PositionState from "./PositionState.js";

QUnit.module("PositionState");

const PROPS = ["x", "y", "heading"];

const createTestState = () => PositionState.create({ x: 1, y: 2, heading: 3 });

QUnit.test("create()", assert => {
  // Run.
  const position = createTestState();

  // Verify.
  PROPS.forEach((prop, i) => {
    assert.equal(position[prop], i + 1);
  });
});

QUnit.test("create() Default", assert => {
  // Setup.
  const position = PositionState.create();

  // Verify.
  PROPS.forEach(prop => {
    assert.equal(position[prop], 0);
  });
});

QUnit.test("create() immutable", assert => {
  // Setup.
  const position = createTestState();

  // Run / Verify.
  try {
    position.x = 12;
    assert.ok(false, "Should have thrown an exception");
  } catch (e) {
    assert.ok(true);
  }
});

const PositionStateTest = {};
export default PositionStateTest;
