import ExplosionState from "./ExplosionState.js";

QUnit.module("ExplosionState");

const PROPS = ["position", "size"];

QUnit.test("create()", function(assert)
{
   // Run.
   const display = createTestState();

   // Verify.
   PROPS.forEach((prop, i) =>
   {
      assert.equal(display[prop], i + 1);
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

   return ExplosionState.create(
   {
      position: i++,
      size: i++
   });
}

const ExplosionStateTest = {};
export default ExplosionStateTest;