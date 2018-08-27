import AbilityState from "./AbilityState.js";

QUnit.module("AbilityState");

const PROPS = ["sourceName", "sourceKey", "context"];

const createTestState = () => AbilityState.create({ sourceName: 1, sourceKey: 2, context: 3 });

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

const AbilityStateTest = {};
export default AbilityStateTest;
