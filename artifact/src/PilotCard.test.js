import EnumTest from "./Enum.test.js";
import EnumUtilities from "./EnumUtilities.js";
import PilotCard from "./PilotCard.js";

QUnit.module("PilotCard");

QUnit.test("PilotCard properties Academy Pilot", function(assert)
{
   const pilot = PilotCard.ACADEMY_PILOT;
   const properties = PilotCard.properties[pilot];
   assert.equal(properties.name, "Academy Pilot");
   assert.equal(properties.skill, 1);
   assert.equal(properties.points, 12);
   assert.equal(properties.key, PilotCard.ACADEMY_PILOT);
});

QUnit.test("PilotCard properties Bounty Hunter", function(assert)
{
   const pilot = PilotCard.BOUNTY_HUNTER;
   const properties = PilotCard.properties[pilot];
   assert.equal(properties.name, "Bounty Hunter");
   assert.equal(properties.skill, 3);
   assert.equal(properties.points, 33);
   assert.equal(properties.key, "bountyHunter");
});

QUnit.test("PilotCard properties Dutch Vander", function(assert)
{
   const pilot = PilotCard.DUTCH_VANDER;
   const properties = PilotCard.properties[pilot];
   assert.equal(properties.name, "\"Dutch\" Vander");
   assert.equal(properties.skill, 6);
   assert.equal(properties.points, 23);
   assert.equal(properties.key, "dutchVander");
});

QUnit.test("PilotCard properties Rookie Pilot", function(assert)
{
   const pilot = PilotCard.ROOKIE_PILOT;
   const properties = PilotCard.properties[pilot];
   assert.equal(properties.name, "Rookie Pilot");
   assert.equal(properties.skill, 2);
   assert.equal(properties.points, 21);
   assert.equal(properties.key, "rookiePilot");
});

QUnit.test("keys and values", function(assert)
{
   EnumTest.keysAndValues(assert, PilotCard);
});

QUnit.test("keys()", function(assert)
{
   EnumTest.keys(assert, PilotCard, 297, PilotCard.ACADEMY_PILOT, PilotCard.ZUCKUSS);
});

QUnit.test("required properties", function(assert)
{
   EnumUtilities.values(PilotCard).forEach(function(pilot)
   {
      assert.ok(pilot.name, "Missing name for " + pilot.name);
      assert.ok(pilot.key, "Missing key for " + pilot.name);

      if (pilot.fore === undefined && pilot.aft === undefined)
      {
         assert.ok(pilot.image, "Missing image for " + pilot.name);

         if (pilot.key !== PilotCard.NASHTAH_PUP_PILOT)
         {
            assert.ok(pilot.skill, "Missing pilotSkillValue for " + pilot.name);
            assert.ok(pilot.points, "Missing squadPointCost for " + pilot.name);
         }
      }
   });
});

const PilotCardTest = {};
export default PilotCardTest;