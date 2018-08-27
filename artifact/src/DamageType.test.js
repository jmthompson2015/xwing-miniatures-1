import DamageType from "./DamageType.js";
import EnumTest from "./Enum.test.js";

QUnit.module("DamageType");

QUnit.test("keys and values", assert => {
  EnumTest.keysAndValues(assert, DamageType);
});

QUnit.test("keys()", assert => {
  EnumTest.keys(assert, DamageType, 2, DamageType.PILOT, DamageType.SHIP);
});

const DamageCardTraitTest = {};
export default DamageCardTraitTest;
