import StatBonusesState from "./StatBonusesState.js";

QUnit.module("StatBonusesState");

const PROPS = ["agility", "energy", "hull", "pilotSkill", "primaryWeapon", "shield"];

QUnit.test("create()", function(assert)
{
   // Setup.

   // Run.
   const statBonuses = createTestState();

   // Verify.
   PROPS.forEach((prop, i) =>
   {
      assert.equal(statBonuses[prop], i + 1);
   });
});

QUnit.test("create() Default", function(assert)
{
   // Setup.
   const statBonuses = StatBonusesState.create();

   // Verify.
   PROPS.forEach(prop =>
   {
      assert.equal(statBonuses[prop], undefined);
   });
});

QUnit.test("create() immutable", function(assert)
{
   // Setup.
   const statBonuses = createTestState();

   // Run / Verify.
   try
   {
      statBonuses.agility = 12;
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

   return StatBonusesState.create(
   {
      agility: i++,
      energy: i++,
      hull: i++,
      pilotSkill: i++,
      primaryWeapon: i++,
      shield: i++
   });
}

const StatBonusesStateTest = {};
export default StatBonusesStateTest;