import EnumTest from "./Enum.test.js";
import EnumUtilities from "./EnumUtilities.js";
import UpgradeCard from "./UpgradeCard.js";

QUnit.module("UpgradeCard");

QUnit.test("UpgradeCard properties Adrenaline Rush", assert => {
  const upgrade = UpgradeCard.ADRENALINE_RUSH;
  const properties = UpgradeCard.properties[upgrade];
  assert.equal(properties.name, "Adrenaline Rush");
  assert.equal(properties.slot, "Elite");
  assert.equal(properties.points, 1);
  assert.equal(properties.key, "adrenalineRush");
});

QUnit.test("UpgradeCard properties C-3PO", assert => {
  // Setup.
  const upgradeCard = UpgradeCard.C_3PO;

  // Run.
  const result = UpgradeCard.properties[upgradeCard];

  // Verify.
  assert.ok(result);
  assert.equal(result.name, "C-3PO");
  assert.equal(result.slot, "Crew");
  assert.equal(result.points, 3);
  assert.equal(result.key, upgradeCard);
});

QUnit.test("keys and values", assert => {
  EnumTest.keysAndValues(assert, UpgradeCard);
});

QUnit.test("keys()", assert => {
  EnumTest.keys(assert, UpgradeCard, 367, UpgradeCard.A_SCORE_TO_SETTLE, UpgradeCard.ZUCKUSS);
});

QUnit.test("required properties", assert => {
  EnumUtilities.values(UpgradeCard).forEach(upgrade => {
    assert.ok(upgrade.name, `Missing name for ${upgrade.name}`);
    assert.ok(upgrade.slot, `Missing slot for ${upgrade.name}`);
    assert.ok(upgrade.image, `Missing image for ${upgrade.name}`);
    assert.equal(upgrade.points !== undefined, true, `Missing points for ${upgrade.name}`);
    assert.ok(upgrade.key, `Missing key for ${upgrade.name}`);
  });
});

const UpgradeTypeTest = {};
export default UpgradeTypeTest;
