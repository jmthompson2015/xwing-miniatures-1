import DamageCardTFA from "./DamageCardTFA.js";
import EnumTest from "./Enum.test.js";

QUnit.module("DamageCardTFA");

QUnit.test("DamageCardTFA properties Blinded Pilot", function(assert)
{
   const damage = DamageCardTFA.BLINDED_PILOT;
   const properties = DamageCardTFA.properties[damage];
   assert.equal(properties.name, "Blinded Pilot");
   assert.equal(properties.type, "Pilot");
   assert.equal(properties.key, damage);
});

QUnit.test("DamageCardTFA properties Console Fire", function(assert)
{
   const damage = DamageCardTFA.CONSOLE_FIRE;
   const properties = DamageCardTFA.properties[damage];
   assert.equal(properties.name, "Console Fire");
   assert.equal(properties.type, "Ship");
   assert.equal(properties.key, damage);
});

QUnit.test("keys and values", function(assert)
{
   EnumTest.keysAndValues(assert, DamageCardTFA);
});

QUnit.test("keys()", function(assert)
{
   EnumTest.keys(assert, DamageCardTFA, 14, DamageCardTFA.BLINDED_PILOT, DamageCardTFA.WEAPONS_FAILURE);
});

const DamageCardTest = {};
export default DamageCardTest;