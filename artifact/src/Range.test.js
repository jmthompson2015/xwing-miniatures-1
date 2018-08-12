import EnumTest from "./Enum.test.js";
import Range from "./Range.js";

QUnit.module("Range");

QUnit.test("keys and values", function(assert)
{
   EnumTest.keysAndValues(assert, Range);
});

QUnit.test("keys()", function(assert)
{
   EnumTest.keys(assert, Range, 5, Range.ONE, Range.FIVE);
});

const RangeTest = {};
export default RangeTest;