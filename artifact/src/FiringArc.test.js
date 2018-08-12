import EnumTest from "./Enum.test.js";
import EnumUtilities from "./EnumUtilities.js";
import FiringArc from "./FiringArc.js";

QUnit.module("FiringArc");

QUnit.test("required properties", function(assert)
{
   EnumUtilities.values(FiringArc).forEach(function(firingArc)
   {
      assert.ok(firingArc.name !== undefined, "Missing name for " + firingArc.name);
      assert.ok(firingArc.key !== undefined, "Missing key for " + firingArc.name);
   });
});

QUnit.test("keys and values", function(assert)
{
   EnumTest.keysAndValues(assert, FiringArc);
});

QUnit.test("keys()", function(assert)
{
   EnumTest.keys(assert, FiringArc, 6, FiringArc.AUXILIARY_180, FiringArc.TURRET);
});

const FiringArcTest = {};
export default FiringArcTest;