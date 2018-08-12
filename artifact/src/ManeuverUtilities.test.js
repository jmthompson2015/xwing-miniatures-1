import Maneuver from "./Maneuver.js";
import ManeuverUtils from "./ManeuverUtilities.js";

QUnit.module("ManeuverUtilities");

QUnit.test("dialToManeuver() 1FG", function(assert)
{
   // Setup.
   const dial = "1FG";

   // Run.
   const result = ManeuverUtils.dialToManeuver(dial);

   // Verify.
   assert.ok(result);
   assert.equal(result, Maneuver.STRAIGHT_1_EASY_1FG);
});

QUnit.test("dialToManeuver() 2TW", function(assert)
{
   // Setup.
   const dial = "2TW";

   // Run.
   const result = ManeuverUtils.dialToManeuver(dial);

   // Verify.
   assert.ok(result);
   assert.equal(result, Maneuver.TURN_LEFT_2_STANDARD_2TW);
});

QUnit.test("dialToManeuver() 4KR", function(assert)
{
   // Setup.
   const dial = "4KR";

   // Run.
   const result = ManeuverUtils.dialToManeuver(dial);

   // Verify.
   assert.ok(result);
   assert.equal(result, Maneuver.KOIOGRAN_TURN_4_HARD_4KR);
});

QUnit.test("dialToManeuver() 2LR", function(assert)
{
   // Setup.
   const dial = "2LR";

   // Run.
   const result = ManeuverUtils.dialToManeuver(dial);

   // Verify.
   assert.ok(result);
   assert.equal(result, Maneuver.SEGNORS_LOOP_LEFT_2_HARD_2LR);
});

QUnit.test("dialToManeuver() 3ER", function(assert)
{
   // Setup.
   const dial = "3ER";

   // Run.
   const result = ManeuverUtils.dialToManeuver(dial);

   // Verify.
   assert.ok(result);
   assert.equal(result, Maneuver.TALLON_ROLL_LEFT_3_HARD_3ER);
});

const ManeuverUtilitiesTest = {};
export default ManeuverUtilitiesTest;