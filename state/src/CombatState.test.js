import CombatState from "./CombatState.js";

QUnit.module("CombatState");

const PROPS = ["id", "attackerId", "defenderId", "rangeKey", "weaponKey",
  "criticalDamage", "hitDamage", "shieldDamage",
  "attackDiceKeys", "defenseDiceKeys"];

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

   return CombatState.create(
   {
      id: i++,
      attackerId: i++,
      defenderId: i++,
      rangeKey: i++,
      weaponKey: i++,

      criticalDamage: i++,
      hitDamage: i++,
      shieldDamage: i++,

      attackDiceKeys: i++,
      defenseDiceKeys: i++,
   });
}

const CombatStateTest = {};
export default CombatStateTest;