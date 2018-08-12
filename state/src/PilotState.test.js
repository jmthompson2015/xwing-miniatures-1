import PilotState from "./PilotState.js";

QUnit.module("PilotState");

const PROPS = ["id", "pilotKey"];

QUnit.test("create()", function(assert)
{
   // Run.
   const pilot = createTestState();

   // Verify.
   PROPS.forEach((prop, i) =>
   {
      assert.equal(pilot[prop], i + 1);
   });
});

QUnit.test("create() immutable", function(assert)
{
   // Setup.
   const pilot = createTestState();

   // Run / Verify.
   try
   {
      pilot.id = 12;
      assert.ok(false, "Should have thrown an exception");
   }
   catch (e)
   {
      assert.ok(true);
   }
});

function createTestState()
{
   let i = 1;

   return PilotState.create(
   {
      id: i++,
      pilotKey: i++
   });
}

const PilotStateTest = {};
export default PilotStateTest;