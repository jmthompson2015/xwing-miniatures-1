import ConditionCard from "./ConditionCard.js";
import EnumTest from "./Enum.test.js";

QUnit.module("ConditionCard");

QUnit.test("ConditionCard properties Fanatical Devotion", assert => {
  const upgrade = ConditionCard.FANATICAL_DEVOTION;
  const properties = ConditionCard.properties[upgrade];
  assert.equal(properties.name, "Fanatical Devotion");
  assert.equal(properties.key, "fanaticalDevotion");
});

QUnit.test("keys and values", assert => {
  EnumTest.keysAndValues(assert, ConditionCard);
});

QUnit.test("keys()", assert => {
  EnumTest.keys(
    assert,
    ConditionCard,
    10,
    ConditionCard.A_DEBT_TO_PAY,
    ConditionCard.SUPPRESSIVE_FIRE
  );
});

const ConditionCardTest = {};
export default ConditionCardTest;
