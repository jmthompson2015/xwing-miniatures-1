import SquadState from "./SquadState.js";

QUnit.module("SquadState");

const PROPS = ["id", "name", "year", "description", "points", "pilots"];

QUnit.test("create()", function(assert)
{
   // Run.
   const squad = createTestData();

   // Verify.
   PROPS.forEach((prop, i) =>
   {
      assert.equal(squad[prop], i + 1);
   });
});

QUnit.test("create() immutable", function(assert)
{
   // Setup.
   const squad = createTestData();

   // Run / Verify.
   try
   {
      squad.faction = 12;
      assert.ok(false, "Should have thrown an exception");
   }
   catch (e)
   {
      assert.ok(true);
   }
});

function createTestData()
{
   let i = 1;

   return SquadState.create(
   {
      id: i++,
      name: i++,
      year: i++,
      description: i++,
      points: i++,
      pilots: i++
   });
}

const SquadStateTest = {};
export default SquadStateTest;