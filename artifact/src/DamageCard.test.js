import DamageCard from "./DamageCard.js";
import EnumTest from "./Enum.test.js";

QUnit.module("DamageCard");

QUnit.test("DamageCard properties Blinded Pilot", function(assert)
{
   const damage = DamageCard.BLINDED_PILOT;
   const properties = DamageCard.properties[damage];
   assert.equal(properties.name, "Blinded Pilot");
   assert.equal(properties.type, "Pilot");
   assert.equal(properties.key, damage);
});

QUnit.test("DamageCard properties Console Fire", function(assert)
{
   const damage = DamageCard.CONSOLE_FIRE;
   const properties = DamageCard.properties[damage];
   assert.equal(properties.name, "Console Fire");
   assert.equal(properties.type, "Ship");
   assert.equal(properties.key, damage);
});

QUnit.test("keys and values", function(assert)
{
   EnumTest.keysAndValues(assert, DamageCard);
});

QUnit.test("keys()", function(assert)
{
   EnumTest.keys(assert, DamageCard, 14, DamageCard.BLINDED_PILOT, DamageCard.WEAPON_MALFUNCTION);
});

const DamageCardTest = {};
export default DamageCardTest;