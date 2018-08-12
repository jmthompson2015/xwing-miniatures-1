import UpgradeState from "./UpgradeState.js";

QUnit.module("UpgradeState");

const PROPS = ["id", "upgradeKey", "tokenCounts"];

QUnit.test("create()", function(assert)
{
   // Run.
   const upgrade = createTestState();

   // Verify.
   PROPS.forEach((prop, i) =>
   {
      assert.equal(upgrade[prop], i + 1);
   });
});

QUnit.test("create() immutable", function(assert)
{
   // Setup.
   const upgrade = createTestState();

   // Run / Verify.
   try
   {
      upgrade.id = 12;
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

   return UpgradeState.create(
   {
      id: i++,
      upgradeKey: i++,
      tokenCounts: i++
   });
}

const UpgradeStateTest = {};
export default UpgradeStateTest;