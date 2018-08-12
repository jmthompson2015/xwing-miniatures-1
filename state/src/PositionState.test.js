import PositionState from "./PositionState.js";

QUnit.module("PositionState");

const PROPS = ["x", "y", "heading"];

QUnit.test("create()", function(assert)
{
   // Run.
   const position = createTestState();

   // Verify.
   PROPS.forEach((prop, i) =>
   {
      assert.equal(position[prop], i + 1);
   });
});

QUnit.test("create() Default", function(assert)
{
   // Setup.
   const position = PositionState.create();

   // Verify.
   PROPS.forEach(prop =>
   {
      assert.equal(position[prop], 0);
   });
});

QUnit.test("create() immutable", function(assert)
{
   // Setup.
   const position = createTestState();

   // Run / Verify.
   try
   {
      position.x = 12;
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

   return PositionState.create(
   {
      x: i++,
      y: i++,
      heading: i++
   });
}

const PositionStateTest = {};
export default PositionStateTest;