import TargetLockState from "./TargetLockState.js";

QUnit.module("TargetLockState");

const PROPS = ["id", "attackerId", "defenderId"];

const createTestState = () => TargetLockState.create({ id: 1, attackerId: 2, defenderId: 3 });

QUnit.test("create()", assert => {
  // Run.
  const targetLock = createTestState();

  // Verify.
  PROPS.forEach((prop, i) => {
    assert.equal(targetLock[prop], i + 1);
  });
});

QUnit.test("create() immutable", assert => {
  // Setup.
  const targetLock = createTestState();

  // Run / Verify.
  try {
    targetLock.id = 12;
    assert.ok(false, "Should have thrown an exception");
  } catch (e) {
    assert.ok(true);
  }
});

const TargetLockStateTest = {};
export default TargetLockStateTest;
