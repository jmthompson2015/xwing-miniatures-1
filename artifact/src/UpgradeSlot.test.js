import EnumTest from "./Enum.test.js";
import UpgradeSlot from "./UpgradeSlot.js";

QUnit.module("UpgradeSlot");

QUnit.test("UpgradeSlot properties Astromech", function(assert)
{
   const typeKey = UpgradeSlot.ASTROMECH;
   const properties = UpgradeSlot.properties[typeKey];
   assert.equal(properties.name, "Astromech");
   assert.equal(properties.image, "upgrade-slot/astromech.png");
   assert.equal(properties.key, "astromech");
});

QUnit.test("keys and values", function(assert)
{
   EnumTest.keysAndValues(assert, UpgradeSlot);
});

QUnit.test("keys()", function(assert)
{
   EnumTest.keys(assert, UpgradeSlot, 17, UpgradeSlot.ASTROMECH, UpgradeSlot.TURRET);
});

const UpgradeTypeTest = {};
export default UpgradeTypeTest;