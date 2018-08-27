import PilotState from "./PilotState.js";

QUnit.module("PilotState");

const PROPS = ["id", "pilotKey"];

const createTestState = () => PilotState.create({ id: 1, pilotKey: 2 });

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

const PilotStateTest = {};
export default PilotStateTest;
