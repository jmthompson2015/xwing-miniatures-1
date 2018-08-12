import AbilityUtils from "./AbilityUtilities.js";

QUnit.module("AbilityUtilities");

QUnit.test("ability() Dice Modification Attack Spend Focus", function(assert)
{
   // Run.
   const result = AbilityUtils.ability("DiceModification", XMA.DiceModification.ATTACK_SPEND_FOCUS);

   // Verify.
   assert.ok(result);
   assert.ok(result.condition);
   assert.ok(result.consequent);
});

QUnit.test("ability() Dice Modification Defense Spend Evade", function(assert)
{
   // Run.
   const result = AbilityUtils.ability("DiceModification", XMA.DiceModification.DEFENSE_SPEND_EVADE);

   // Verify.
   assert.ok(result);
   assert.ok(result.condition);
   assert.ok(result.consequent);
});

QUnit.test("ability() Dice Modification Defense Spend Focus", function(assert)
{
   // Run.
   const result = AbilityUtils.ability("DiceModification", XMA.DiceModification.DEFENSE_SPEND_FOCUS);

   // Verify.
   assert.ok(result);
   assert.ok(result.condition);
   assert.ok(result.consequent);
});

QUnit.test("ability() Ship Action Evade", function(assert)
{
   // Run.
   const result = AbilityUtils.ability("ShipAction", XMA.ShipAction.EVADE);

   // Verify.
   assert.ok(result);
   assert.ok(result.condition);
   assert.ok(result.consequent);
});

QUnit.test("ability() Ship Action Focus", function(assert)
{
   // Run.
   const result = AbilityUtils.ability("ShipAction", XMA.ShipAction.FOCUS);

   // Verify.
   assert.ok(result);
   assert.ok(result.condition);
   assert.ok(result.consequent);
});

const AbilityUtilitiesTest = {};
export default AbilityUtilitiesTest;