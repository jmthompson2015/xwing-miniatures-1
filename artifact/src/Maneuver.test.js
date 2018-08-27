import EnumTest from "./Enum.test.js";
import Maneuver from "./Maneuver.js";

QUnit.module("Maneuver");

QUnit.test("Maneuver properties Bank Left 1 Easy", assert => {
  const shipAction = Maneuver.BANK_LEFT_1_EASY_1BG;
  const properties = Maneuver.properties[shipAction];
  assert.equal(properties.name, "Bank Left 1 Easy 1BG");
  assert.equal(properties.bearing, "Bank Left");
  assert.equal(properties.speed, 1);
  assert.equal(properties.difficulty, "Easy");
});

QUnit.test("keys and values", assert => {
  EnumTest.keysAndValues(assert, Maneuver);
});

QUnit.test("keys()", assert => {
  EnumTest.keys(
    assert,
    Maneuver,
    63,
    Maneuver.BANK_LEFT_1_EASY_1BG,
    Maneuver.TURN_RIGHT_3_STANDARD_3YW
  );
});

const ManeuverTest = {};
export default ManeuverTest;
