import DefenseDiceValue from "./DefenseDiceValue.js";
import EnumTest from "./Enum.test.js";

QUnit.module("DefenseDiceValue");

QUnit.test("DefenseDiceValue properties Evade", assert => {
  const dieKey = DefenseDiceValue.EVADE;
  const properties = DefenseDiceValue.properties[dieKey];
  assert.equal(properties.name, "Evade");
  assert.equal(properties.sortOrder, 0);
  assert.equal(properties.image, "dice/defense-evade.png");
  assert.equal(properties.key, dieKey);
});

QUnit.test("keys and values", assert => {
  EnumTest.keysAndValues(assert, DefenseDiceValue);
});

QUnit.test("keys()", assert => {
  EnumTest.keys(assert, DefenseDiceValue, 3, DefenseDiceValue.EVADE, DefenseDiceValue.BLANK);
});

const DefenseDiceValueTest = {};
export default DefenseDiceValueTest;
