import DamageState from "./DamageState.js";

QUnit.module("DamageState");

const PROPS = ["id", "damageKey"];

QUnit.test("create()", function(assert)
{
   // Run.
   const damage = createTestData();

   // Verify.
   PROPS.forEach((prop, i) =>
   {
      assert.equal(damage[prop], i + 1);
   });
});

QUnit.test("create() immutable", function(assert)
{
   // Setup.
   const damage = createTestData();

   // Run / Verify.
   try
   {
      damage.id = 12;
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

   return DamageState.create(
   {
      id: i++,
      damageKey: i++
   });
}

const DamageStateTest = {};
export default DamageStateTest;