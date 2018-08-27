import DiceModification from "./DiceModification.js";
import EnumTest from "./Enum.test.js";

QUnit.module("DiceModification");

QUnit.test("DiceModification properties Target Lock Acquired", assert => {
  const modificationKey = DiceModification.ATTACK_SPEND_FOCUS;
  const properties = DiceModification.properties[modificationKey];
  assert.equal(properties.name, "Spend a Focus token");
  assert.equal(properties.key, modificationKey);
});

QUnit.test("keys and values", assert => {
  EnumTest.keysAndValues(assert, DiceModification);
});

QUnit.test("keys()", assert => {
  EnumTest.keys(
    assert,
    DiceModification,
    4,
    DiceModification.ATTACK_SPEND_FOCUS,
    DiceModification.DEFENSE_SPEND_FOCUS
  );
});

const DiceModificationTest = {};
export default DiceModificationTest;
