import PilotUtils from "./PilotUtilities.js";

QUnit.module("PilotUtilities");

QUnit.test("name() Academy Pilot", assert => {
  // Setup.
  const pilotInstance = {
    id: 1,
    pilotKey: XMA.PilotCard.ACADEMY_PILOT
  };

  // Run.
  const result = PilotUtils.name(pilotInstance);

  // Verify.
  assert.equal(result, "1 Academy Pilot (TIE Fighter)");
});

QUnit.test("name() Luke Skywalker", assert => {
  // Setup.
  const pilotInstance = {
    id: 2,
    pilotKey: XMA.PilotCard.LUKE_SKYWALKER
  };

  // Run.
  const result = PilotUtils.name(pilotInstance);

  // Verify.
  assert.equal(result, "2 \u2022 Luke Skywalker (X-wing)");
});

QUnit.test("name() Luke Skywalker short", assert => {
  // Setup.
  const pilotInstance = {
    id: 2,
    pilotKey: XMA.PilotCard.LUKE_SKYWALKER
  };
  const isShort = true;

  // Run.
  const result = PilotUtils.name(pilotInstance, isShort);

  // Verify.
  assert.equal(result, "2 \u2022 Luke Skywalker");
});

const PilotUtilitiesTest = {};
export default PilotUtilitiesTest;
