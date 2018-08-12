import AbilityState from "./AbilityState.js";

QUnit.module("AbilityState");

const PROPS = ["sourceName", "sourceKey", "context"];

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

   return AbilityState.create(
   {
      sourceName: i++,
      sourceKey: i++,
      context: i++
   });
}

const AbilityStateTest = {};
export default AbilityStateTest;