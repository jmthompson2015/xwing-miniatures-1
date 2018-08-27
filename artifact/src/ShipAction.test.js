import EnumTest from "./Enum.test.js";
import ShipAction from "./ShipAction.js";

QUnit.module("ShipAction");

QUnit.test("ShipAction properties Barrel Roll", assert => {
  const shipAction = ShipAction.BARREL_ROLL;
  const properties = ShipAction.properties[shipAction];
  assert.equal(properties.name, "Barrel Roll");
});

QUnit.test("ShipAction properties Evade", assert => {
  const shipAction = ShipAction.EVADE;
  const properties = ShipAction.properties[shipAction];
  assert.equal(properties.name, "Evade");
});

QUnit.test("ShipAction properties Focus", assert => {
  const shipAction = ShipAction.FOCUS;
  const properties = ShipAction.properties[shipAction];
  assert.equal(properties.name, "Focus");
});

QUnit.test("keys and values", assert => {
  EnumTest.keysAndValues(assert, ShipAction);
});

QUnit.test("keys()", assert => {
  EnumTest.keys(assert, ShipAction, 14, ShipAction.BARREL_ROLL, ShipAction.TARGET_LOCK);
});

const ShipActionTest = {};
export default ShipActionTest;
