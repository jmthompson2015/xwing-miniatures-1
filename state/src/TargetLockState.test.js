import TargetLockState from "./TargetLockState.js";

QUnit.module("TargetLockState");

const PROPS = ["id", "attackerId", "defenderId"];

QUnit.test("create()", function(assert)
{
   // Run.
   const targetLock = createTestState();

   // Verify.
   PROPS.forEach((prop, i) =>
   {
      assert.equal(targetLock[prop], i + 1);
   });
});

QUnit.test("create() immutable", function(assert)
{
   // Setup.
   const targetLock = createTestState();

   // Run / Verify.
   try
   {
      targetLock.id = 12;
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

   return TargetLockState.create(
   {
      id: i++,
      attackerId: i++,
      defenderId: i++
   });
}

const TargetLockStateTest = {};
export default TargetLockStateTest;