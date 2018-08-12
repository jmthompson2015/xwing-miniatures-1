import ManeuverState from "./ManeuverState.js";

QUnit.module("ManeuverState");

const PROPS = ["color", "fromPolygon", "fromPosition", "path", "toPolygon"];

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

   return ManeuverState.create(
   {
      color: i++,
      fromPolygon: i++,
      fromPosition: i++,
      path: i++,
      toPolygon: i++
   });
}

const ManeuverStateTest = {};
export default ManeuverStateTest;