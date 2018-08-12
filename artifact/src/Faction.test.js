import EnumTest from "./Enum.test.js";
import Faction from "./Faction.js";

QUnit.module("Faction");

QUnit.test("Faction properties Imperial", function(assert)
{
   const faction = Faction.GALACTIC_EMPIRE;
   const properties = Faction.properties[faction];
   assert.equal(properties.name, "Galactic Empire");
   assert.equal(properties.key, "galacticEmpire");
});

QUnit.test("Faction properties Rebel", function(assert)
{
   const faction = Faction.REBEL_ALLIANCE;
   const properties = Faction.properties[faction];
   assert.equal(properties.name, "Rebel Alliance");
   assert.equal(properties.key, "rebelAlliance");
});

QUnit.test("Faction properties Scum", function(assert)
{
   const faction = Faction.SCUM_AND_VILLAINY;
   const properties = Faction.properties[faction];
   assert.equal(properties.name, "Scum and Villainy");
   assert.equal(properties.key, "scumAndVillainy");
});

QUnit.test("keys and values", function(assert)
{
   EnumTest.keysAndValues(assert, Faction);
});

QUnit.test("keys()", function(assert)
{
   EnumTest.keys(assert, Faction, 5, Faction.FIRST_ORDER, Faction.SCUM_AND_VILLAINY);
});

const FactionTest = {};
export default FactionTest;