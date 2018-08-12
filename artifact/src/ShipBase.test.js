import EnumTest from "./Enum.test.js";
import ShipBase from "./ShipBase.js";

QUnit.module("ShipBase");

QUnit.test("ShipBase properties Large", function(assert)
{
   const shipBase = ShipBase.LARGE;
   const properties = ShipBase.properties[shipBase];
   assert.equal(properties.width, 80);
   assert.equal(properties.height, 80);
   assert.equal(properties.key, shipBase);
});

QUnit.test("ShipBase properties Small", function(assert)
{
   const shipBase = ShipBase.SMALL;
   const properties = ShipBase.properties[shipBase];
   assert.equal(properties.width, 40);
   assert.equal(properties.height, 40);
   assert.equal(properties.key, shipBase);
});

QUnit.test("keys and values", function(assert)
{
   EnumTest.keysAndValues(assert, ShipBase);
});

QUnit.test("keys()", function(assert)
{
   EnumTest.keys(assert, ShipBase, 3, ShipBase.HUGE, ShipBase.SMALL);
});

const ShipBaseTest = {};
export default ShipBaseTest;