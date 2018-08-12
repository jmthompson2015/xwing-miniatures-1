import EnumTest from "./Enum.test.js";
import Phase from "./Phase.js";

QUnit.module("Phase");

QUnit.test("Phase properties Planning (start)", function(assert)
{
   const phase = Phase.PLANNING_START;
   const properties = Phase.properties[phase];
   assert.equal(properties.name, "Planning (start)");
   assert.equal(properties.key, "planningStart");
});

QUnit.test("Phase properties Activation (execute maneuver)", function(assert)
{
   const phase = Phase.ACTIVATION_EXECUTE_MANEUVER;
   const properties = Phase.properties[phase];
   assert.equal(properties.name, "Activation (execute maneuver)");
   assert.equal(properties.key, "activationExecuteManeuver");
});

QUnit.test("keys and values", function(assert)
{
   EnumTest.keysAndValues(assert, Phase);
});

QUnit.test("keys()", function(assert)
{
   EnumTest.keys(assert, Phase, 30, Phase.SETUP, Phase.END_END);
});

const PhaseTest = {};
export default PhaseTest;