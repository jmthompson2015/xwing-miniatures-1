import UpgradeState from "./UpgradeState.js";

QUnit.module("UpgradeState");

const PROPS = ["id", "upgradeKey", "tokenCounts"];

const createTestState = () => UpgradeState.create({ id: 1, upgradeKey: 2, tokenCounts: 3 });

QUnit.test("create()", assert => {
  // Run.
  const upgrade = createTestState();

  // Verify.
  PROPS.forEach((prop, i) => {
    assert.equal(upgrade[prop], i + 1);
  });
});

QUnit.test("create() immutable", assert => {
  // Setup.
  const upgrade = createTestState();

  // Run / Verify.
  try {
    upgrade.id = 12;
    assert.ok(false, "Should have thrown an exception");
  } catch (e) {
    assert.ok(true);
  }
});

const UpgradeStateTest = {};
export default UpgradeStateTest;
