import AttackDiceValue from "./AttackDiceValue.js";
import EnumTest from "./Enum.test.js";

QUnit.module("AttackDiceValue");

QUnit.test("AttackDiceValue properties Critical Hit", assert => {
  const dieKey = AttackDiceValue.CRITICAL_HIT;
  const properties = AttackDiceValue.properties[dieKey];
  assert.equal(properties.name, "Critical Hit");
  assert.equal(properties.sortOrder, 1);
  assert.equal(properties.image, "dice/attack-critical-hit.png");
  assert.equal(properties.key, dieKey);
});

QUnit.test("keys and values", assert => {
  EnumTest.keysAndValues(assert, AttackDiceValue);
});

QUnit.test("keys()", assert => {
  EnumTest.keys(assert, AttackDiceValue, 4, AttackDiceValue.HIT, AttackDiceValue.BLANK);
});

const AttackDiceValueTest = {};
export default AttackDiceValueTest;
