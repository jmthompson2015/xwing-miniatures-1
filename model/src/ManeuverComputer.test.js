import ManeuverComputer from "./ManeuverComputer.js";

const { Maneuver, ShipBase } = XMA;

QUnit.module("ManeuverComputer");

const myRound = value => {
  const factor = 10000;
  return Math.round(value * factor) / factor;
};

QUnit.test("ManeuverComputer.computeFromPolygon() 0 Standard", assert => {
  // Setup.
  const fromPosition = XMS.PositionState.create({
    x: 10,
    y: 20,
    heading: 0
  });
  const shipBase = XMA.Selector.shipBase(ShipBase.SMALL);

  // Run.
  const result = ManeuverComputer.computeFromPolygon(fromPosition, shipBase);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(result.length, 10);

  assert.equal(result[0], fromPosition.x + 20.0);
  assert.equal(result[1], fromPosition.y - 20.0);

  assert.equal(result[2], fromPosition.x + 20.0);
  assert.equal(result[3], fromPosition.y + 20.0);

  assert.equal(result[4], fromPosition.x - 20.0);
  assert.equal(result[5], fromPosition.y + 20.0);

  assert.equal(result[6], fromPosition.x - 20.0);
  assert.equal(result[7], fromPosition.y - 20.0);

  assert.equal(result[8], fromPosition.x + 20.0);
  assert.equal(result[9], fromPosition.y - 20.0);
});

QUnit.test("ManeuverComputer.computePath() Straight1Easy 0 Standard", assert => {
  // Setup.
  const fromPosition = XMS.PositionState.create({
    x: 10,
    y: 20,
    heading: 0
  });
  const maneuver = XMA.Selector.maneuver(Maneuver.STRAIGHT_1_EASY_1FG);
  const shipBase = XMA.Selector.shipBase(ShipBase.SMALL);

  // Run.
  const result = ManeuverComputer.computePath(maneuver, fromPosition, shipBase);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(result.length, 8);

  assert.equal(result[0], fromPosition.x + 0.0);
  assert.equal(result[1], fromPosition.y + 0.0);

  assert.equal(result[2], fromPosition.x + 20.0);
  assert.equal(result[3], fromPosition.y + 0.0);

  assert.equal(result[4], fromPosition.x + 60.0);
  assert.equal(result[5], fromPosition.y + 0.0);

  assert.equal(result[6], fromPosition.x + 80.0);
  assert.equal(result[7], fromPosition.y + 0.0);
});

QUnit.test("ManeuverComputer.computePath() Straight1Easy 30 Standard", assert => {
  // Setup.
  const fromPosition = XMS.PositionState.create({
    x: 0,
    y: 0,
    heading: 30
  });
  const maneuver = XMA.Selector.maneuver(Maneuver.STRAIGHT_1_EASY_1FG);
  const shipBase = XMA.Selector.shipBase(ShipBase.SMALL);

  // Run.
  const result = ManeuverComputer.computePath(maneuver, fromPosition, shipBase);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(result.length, 8);

  assert.equal(result[0], fromPosition.x + 0.0);
  assert.equal(result[1], fromPosition.y + 0.0);

  assert.equal(myRound(result[2]), fromPosition.x + 17.3205);
  assert.equal(myRound(result[3]), fromPosition.y + 10.0);

  assert.equal(myRound(result[4]), fromPosition.x + 51.9615);
  assert.equal(myRound(result[5]), fromPosition.y + 30.0);

  assert.equal(myRound(result[6]), fromPosition.x + 69.282);
  assert.equal(myRound(result[7]), fromPosition.y + 40.0);
});

QUnit.test("ManeuverComputer.computePath() BankRight1Standard 0 Standard", assert => {
  // Setup.
  const fromPosition = XMS.PositionState.create();
  const maneuver = XMA.Selector.maneuver(Maneuver.BANK_RIGHT_1_STANDARD_1NW);
  const shipBase = XMA.Selector.shipBase(ShipBase.SMALL);

  // Run.
  const result = ManeuverComputer.computePath(maneuver, fromPosition, shipBase);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(result.length, 14);

  assert.equal(result[0], fromPosition.x + 0.0);
  assert.equal(result[1], fromPosition.y + 0.0);

  assert.equal(myRound(result[2]), fromPosition.x + 20.0);
  assert.equal(myRound(result[3]), fromPosition.y + 0.0);

  assert.equal(myRound(result[4]), fromPosition.x + 36.1145);
  assert.equal(myRound(result[5]), fromPosition.y + 1.5871);

  assert.equal(myRound(result[6]), fromPosition.x + 51.6097);
  assert.equal(myRound(result[7]), fromPosition.y + 6.2876);

  assert.equal(myRound(result[8]), fromPosition.x + 65.8901);
  assert.equal(myRound(result[9]), fromPosition.y + 13.9206);

  assert.equal(myRound(result[10]), fromPosition.x + 78.407);
  assert.equal(myRound(result[11]), fromPosition.y + 24.193);

  assert.equal(myRound(result[12]), fromPosition.x + 92.1421);
  assert.equal(myRound(result[13]), fromPosition.y + 38.1421);
});

QUnit.test("ManeuverComputer.computePath() BankRight3Standard 0 Standard", assert => {
  // Setup.
  const fromPosition = XMS.PositionState.create();
  const maneuver = XMA.Selector.maneuver(Maneuver.BANK_RIGHT_3_STANDARD_3NW);
  const shipBase = XMA.Selector.shipBase(ShipBase.SMALL);

  // Run.
  const result = ManeuverComputer.computePath(maneuver, fromPosition, shipBase);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(result.length, 18);

  assert.equal(result[0], fromPosition.x + 0.0);
  assert.equal(result[1], fromPosition.y + 0.0);

  assert.equal(myRound(result[2]), fromPosition.x + 20.0);
  assert.equal(myRound(result[3]), fromPosition.y + 0.0);

  assert.equal(myRound(result[4]), fromPosition.x + 43.2076);
  assert.equal(myRound(result[5]), fromPosition.y + 1.5211);

  assert.equal(myRound(result[6]), fromPosition.x + 66.018);
  assert.equal(myRound(result[7]), fromPosition.y + 6.0584);

  assert.equal(myRound(result[8]), fromPosition.x + 88.0411);
  assert.equal(myRound(result[9]), fromPosition.y + 13.5342);

  assert.equal(myRound(result[10]), fromPosition.x + 108.9);
  assert.equal(myRound(result[11]), fromPosition.y + 23.8207);

  assert.equal(myRound(result[12]), fromPosition.x + 128.2378);
  assert.equal(myRound(result[13]), fromPosition.y + 36.7418);

  assert.equal(myRound(result[14]), fromPosition.x + 145.7236);
  assert.equal(myRound(result[15]), fromPosition.y + 52.0764);

  assert.equal(myRound(result[16]), fromPosition.x + 160.1421);
  assert.equal(myRound(result[17]), fromPosition.y + 66.1421);
});

QUnit.test("ManeuverComputer.computePath() SegnorsLoopRight3Hard 0 Standard", assert => {
  // Setup.
  const fromPosition = XMS.PositionState.create();
  const maneuver = XMA.Selector.maneuver(Maneuver.SEGNORS_LOOP_RIGHT_3_HARD_3PR);
  const shipBase = XMA.Selector.shipBase(ShipBase.SMALL);

  // Run.
  const result = ManeuverComputer.computePath(maneuver, fromPosition, shipBase);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(result.length, 18);

  assert.equal(result[0], fromPosition.x + 0.0);
  assert.equal(result[1], fromPosition.y + 0.0);

  assert.equal(myRound(result[2]), fromPosition.x + 20.0);
  assert.equal(myRound(result[3]), fromPosition.y + 0.0);

  assert.equal(myRound(result[4]), fromPosition.x + 43.2076);
  assert.equal(myRound(result[5]), fromPosition.y + 1.5211);

  assert.equal(myRound(result[6]), fromPosition.x + 66.018);
  assert.equal(myRound(result[7]), fromPosition.y + 6.0584);

  assert.equal(myRound(result[8]), fromPosition.x + 88.0411);
  assert.equal(myRound(result[9]), fromPosition.y + 13.5342);

  assert.equal(myRound(result[10]), fromPosition.x + 108.9);
  assert.equal(myRound(result[11]), fromPosition.y + 23.8207);

  assert.equal(myRound(result[12]), fromPosition.x + 128.2378);
  assert.equal(myRound(result[13]), fromPosition.y + 36.7418);

  assert.equal(myRound(result[14]), fromPosition.x + 145.7236);
  assert.equal(myRound(result[15]), fromPosition.y + 52.0764);

  assert.equal(myRound(result[16]), fromPosition.x + 160.1421);
  assert.equal(myRound(result[17]), fromPosition.y + 66.1421);
});

QUnit.test("ManeuverComputer.computePath() TurnRight1Standard 0 Standard", assert => {
  // Setup.
  const fromPosition = XMS.PositionState.create();
  const maneuver = XMA.Selector.maneuver(Maneuver.TURN_RIGHT_1_STANDARD_1YW);
  const shipBase = XMA.Selector.shipBase(ShipBase.SMALL);

  // Run.
  const result = ManeuverComputer.computePath(maneuver, fromPosition, shipBase);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(result.length, 18);

  assert.equal(result[0], fromPosition.x + 0.0);
  assert.equal(result[1], fromPosition.y + 0.0);

  assert.equal(myRound(result[2]), fromPosition.x + 20.0);
  assert.equal(myRound(result[3]), fromPosition.y + 0.0);

  assert.equal(myRound(result[4]), fromPosition.x + 28.8775);
  assert.equal(myRound(result[5]), fromPosition.y + 1.1687);

  assert.equal(myRound(result[6]), fromPosition.x + 37.15);
  assert.equal(myRound(result[7]), fromPosition.y + 4.5953);

  assert.equal(myRound(result[8]), fromPosition.x + 44.2538);
  assert.equal(myRound(result[9]), fromPosition.y + 10.0462);

  assert.equal(myRound(result[10]), fromPosition.x + 49.7047);
  assert.equal(myRound(result[11]), fromPosition.y + 17.15);

  assert.equal(myRound(result[12]), fromPosition.x + 53.1313);
  assert.equal(myRound(result[13]), fromPosition.y + 25.4225);

  assert.equal(myRound(result[14]), fromPosition.x + 54.3);
  assert.equal(myRound(result[15]), fromPosition.y + 34.3);

  assert.equal(myRound(result[16]), fromPosition.x + 54.0);
  assert.equal(myRound(result[17]), fromPosition.y + 54.0);
});

QUnit.test("ManeuverComputer.computePath() Stationary0Hard 0 Standard", assert => {
  // Setup.
  const fromPosition = XMS.PositionState.create();
  const maneuver = XMA.Selector.maneuver(Maneuver.STATIONARY_0_HARD_0OR);
  const shipBase = XMA.Selector.shipBase(ShipBase.SMALL);

  // Run.
  const result = ManeuverComputer.computePath(maneuver, fromPosition, shipBase);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(result.length, 2);

  assert.equal(result[0], fromPosition.x + 0.0);
  assert.equal(result[1], fromPosition.y + 0.0);
});

QUnit.test("computePolygon() Standard", assert => {
  // Setup.
  const shipBase = XMA.Selector.shipBase(ShipBase.SMALL);

  // Run.
  const result = ManeuverComputer.computePolygon(shipBase, 0, 0, 0);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(result.length, 10);

  assert.equal(result[0], 20);
  assert.equal(result[1], -20);
  assert.equal(result[2], 20);
  assert.equal(result[3], 20);
  assert.equal(result[4], -20);
  assert.equal(result[5], 20);
  assert.equal(result[6], -20);
  assert.equal(result[7], -20);
  assert.equal(result[8], 20);
  assert.equal(result[9], -20);
});

QUnit.test("computePolygon() Standard 0", assert => {
  // Setup.
  const shipBase = XMA.Selector.shipBase(ShipBase.SMALL);

  // Run.
  const result = ManeuverComputer.computePolygon(shipBase, 10, 20, 0);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(result.length, 10);

  assert.equal(result[0], 30);
  assert.equal(result[1], 0);
  assert.equal(result[2], 30);
  assert.equal(result[3], 40);
  assert.equal(result[4], -10);
  assert.equal(result[5], 40);
  assert.equal(result[6], -10);
  assert.equal(result[7], 0);
  assert.equal(result[8], 30);
  assert.equal(result[9], 0);
});

QUnit.test("computePolygon() Standard 45", assert => {
  // Setup.
  const shipBase = XMA.Selector.shipBase(ShipBase.SMALL);

  // Run.
  const result = ManeuverComputer.computePolygon(shipBase, 10, 20, 45);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(result.length, 10);

  assert.equal(myRound(result[0]), 38.2843);
  assert.equal(myRound(result[1]), 20);
  assert.equal(myRound(result[2]), 10);
  assert.equal(myRound(result[3]), 48.2843);
  assert.equal(myRound(result[4]), -18.2843);
  assert.equal(myRound(result[5]), 20);
  assert.equal(myRound(result[6]), 10);
  assert.equal(myRound(result[7]), -8.2843);
  assert.equal(myRound(result[8]), 38.2843);
  assert.equal(myRound(result[9]), 20);
});

QUnit.test("ManeuverComputer.computeToPolygon() Straight1Standard 0 Standard", assert => {
  // Setup.
  const fromPosition = XMS.PositionState.create({
    x: 10,
    y: 20,
    heading: 0
  });
  const maneuver = XMA.Selector.maneuver(Maneuver.STRAIGHT_1_STANDARD_1FW);
  const shipBase = XMA.Selector.shipBase(ShipBase.SMALL);

  // Run.
  const result = ManeuverComputer.computeToPolygon(maneuver, fromPosition, shipBase);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(result.length, 10);

  assert.equal(result[0], fromPosition.x + 100.0);
  assert.equal(result[1], fromPosition.y - 20.0);

  assert.equal(result[2], fromPosition.x + 100.0);
  assert.equal(result[3], fromPosition.y + 20.0);

  assert.equal(result[4], fromPosition.x + 60.0);
  assert.equal(result[5], fromPosition.y + 20.0);

  assert.equal(result[6], fromPosition.x + 60.0);
  assert.equal(result[7], fromPosition.y - 20.0);

  assert.equal(result[8], fromPosition.x + 100.0);
  assert.equal(result[9], fromPosition.y - 20.0);
});

QUnit.test("ManeuverComputer.computeToPosition() BankLeft1Easy Standard", assert => {
  // Setup.
  const fromPosition = XMS.PositionState.create({
    x: 10,
    y: 200,
    heading: 0
  });
  const maneuver = XMA.Selector.maneuver(Maneuver.BANK_LEFT_1_EASY_1BG);
  const shipBase = XMA.Selector.shipBase(ShipBase.SMALL);

  // Run.
  const result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(result.x, fromPosition.x + 93);
  assert.equal(result.y, fromPosition.y - 38);
  assert.equal(result.heading, fromPosition.heading + 315);
});

QUnit.test("ManeuverComputer.computeToPosition() BankLeft3Standard Standard", assert => {
  // Setup.
  const fromPosition = XMS.PositionState.create({
    x: 0,
    y: 400,
    heading: 0
  });
  const maneuver = XMA.Selector.maneuver(Maneuver.BANK_LEFT_3_STANDARD_3BW);
  const shipBase = XMA.Selector.shipBase(ShipBase.SMALL);

  // Run.
  const result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(result.x, fromPosition.x + 160);
  assert.equal(result.y, fromPosition.y - 66);
  assert.equal(result.heading, fromPosition.heading + 315);
});

QUnit.test("ManeuverComputer.computeToPosition() BankRight1Easy Standard", assert => {
  // Setup.
  const fromPosition = XMS.PositionState.create({
    x: 10,
    y: 20,
    heading: 0
  });
  const maneuver = XMA.Selector.maneuver(Maneuver.BANK_RIGHT_1_EASY_1NG);
  const shipBase = XMA.Selector.shipBase(ShipBase.SMALL);

  // Run.
  const result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(result.x, fromPosition.x + 93);
  assert.equal(result.y, fromPosition.y + 38);
  assert.equal(result.heading, fromPosition.heading + 45);
});

QUnit.test("ManeuverComputer.computeToPosition() BankRight3Standard Standard", assert => {
  // Setup.
  const fromPosition = XMS.PositionState.create({
    x: 0,
    y: 0,
    heading: 0
  });
  const maneuver = XMA.Selector.maneuver(Maneuver.BANK_RIGHT_3_STANDARD_3NW);
  const shipBase = XMA.Selector.shipBase(ShipBase.SMALL);

  // Run.
  const result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(result.x, fromPosition.x + 160);
  assert.equal(result.y, fromPosition.y + 66);
  assert.equal(result.heading, fromPosition.heading + 45);
});

QUnit.test("ManeuverComputer.computeToPosition() KoiogranTurn3Hard Standard", assert => {
  // Setup.
  const fromPosition = XMS.PositionState.create({
    x: 0,
    y: 0,
    heading: 0
  });
  const maneuver = XMA.Selector.maneuver(Maneuver.KOIOGRAN_TURN_3_HARD_3KR);
  const shipBase = XMA.Selector.shipBase(ShipBase.SMALL);

  // Run.
  const result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(result.x, fromPosition.x + 160);
  assert.equal(result.y, fromPosition.y);
  assert.equal(result.heading, fromPosition.heading + 180);
});

QUnit.test("ManeuverComputer.computeToPosition() ReverseBankLeft1Hard Standard", assert => {
  // Setup.
  const fromPosition = XMS.PositionState.create({
    x: 100,
    y: 200,
    heading: 0
  });
  const maneuver = XMA.Selector.maneuver(Maneuver.REVERSE_BANK_LEFT_1_HARD_1AR);
  const shipBase = XMA.Selector.shipBase(ShipBase.SMALL);

  // Run.
  const result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(result.x, fromPosition.x - 93);
  assert.equal(result.y, fromPosition.y + 38);
  assert.equal(result.heading, fromPosition.heading + 315);
});

QUnit.test("ManeuverComputer.computeToPosition() ReverseBankRight1Hard Standard", assert => {
  // Setup.
  const fromPosition = XMS.PositionState.create({
    x: 100,
    y: 200,
    heading: 0
  });
  const maneuver = XMA.Selector.maneuver(Maneuver.REVERSE_BANK_RIGHT_1_HARD_1DR);
  const shipBase = XMA.Selector.shipBase(ShipBase.SMALL);

  // Run.
  const result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(result.x, fromPosition.x - 93);
  assert.equal(result.y, fromPosition.y - 38);
  assert.equal(result.heading, fromPosition.heading + 45);
});

QUnit.test("ManeuverComputer.computeToPosition() ReverseStraight1Hard Standard", assert => {
  // Setup.
  const fromPosition = XMS.PositionState.create({
    x: 100,
    y: 20,
    heading: 0
  });
  const maneuver = XMA.Selector.maneuver(Maneuver.REVERSE_STRAIGHT_1_HARD_1SR);
  const shipBase = XMA.Selector.shipBase(ShipBase.SMALL);

  // Run.
  const result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(result.x, fromPosition.x - 80);
  assert.equal(result.y, fromPosition.y);
  assert.equal(result.heading, fromPosition.heading);
});

QUnit.test("ManeuverComputer.computeToPosition() SegnorsLoopLeft3Hard Standard", assert => {
  // Setup.
  const fromPosition = XMS.PositionState.create({
    x: 0,
    y: 400,
    heading: 0
  });
  const maneuver = XMA.Selector.maneuver(Maneuver.SEGNORS_LOOP_LEFT_3_HARD_3LR);
  const shipBase = XMA.Selector.shipBase(ShipBase.SMALL);

  // Run.
  const result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(result.x, fromPosition.x + 160);
  assert.equal(result.y, fromPosition.y - 66);
  assert.equal(result.heading, fromPosition.heading + 135);
});

QUnit.test("ManeuverComputer.computeToPosition() SegnorsLoopRight3Hard Standard", assert => {
  // Setup.
  const fromPosition = XMS.PositionState.create();
  const maneuver = XMA.Selector.maneuver(Maneuver.SEGNORS_LOOP_RIGHT_3_HARD_3PR);
  const shipBase = XMA.Selector.shipBase(ShipBase.SMALL);

  // Run.
  const result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

  // Verify.
  assert.ok(result);
  assert.equal(result.x, fromPosition.x + 160);
  assert.equal(result.y, fromPosition.y + 66);
  assert.equal(result.heading, fromPosition.heading + 225);
});

QUnit.test("ManeuverComputer.computeToPosition() Straight1Easy Standard", assert => {
  // Setup.
  const fromPosition = XMS.PositionState.create({
    x: 10,
    y: 20,
    heading: 0
  });
  const maneuver = XMA.Selector.maneuver(Maneuver.STRAIGHT_1_EASY_1FG);
  const shipBase = XMA.Selector.shipBase(ShipBase.SMALL);

  // Run.
  const result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(result.x, fromPosition.x + 80);
  assert.equal(result.y, fromPosition.y);
  assert.equal(result.heading, fromPosition.heading);
});

QUnit.test("ManeuverComputer.computeToPosition() Straight3Standard Standard", assert => {
  // Setup.
  const fromPosition = XMS.PositionState.create({
    x: 10,
    y: 20,
    heading: 0
  });
  const maneuver = XMA.Selector.maneuver(Maneuver.STRAIGHT_3_STANDARD_3FW);
  const shipBase = XMA.Selector.shipBase(ShipBase.SMALL);

  // Run.
  const result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(result.x, fromPosition.x + 160);
  assert.equal(result.y, fromPosition.y);
  assert.equal(result.heading, fromPosition.heading);
});

QUnit.test("ManeuverComputer.computeToPosition() TallonRollLeft3Hard Standard", assert => {
  // Setup.
  const fromPosition = XMS.PositionState.create({
    x: 10,
    y: 300,
    heading: 0
  });
  const maneuver = XMA.Selector.maneuver(Maneuver.TALLON_ROLL_LEFT_3_HARD_3ER);
  const shipBase = XMA.Selector.shipBase(ShipBase.SMALL);

  // Run.
  const result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(result.x, fromPosition.x + 109);
  assert.equal(result.y, fromPosition.y - 109);
  assert.equal(result.heading, fromPosition.heading + 180);
});

QUnit.test("ManeuverComputer.computeToPosition() TallonRollRight3Hard Standard", assert => {
  // Setup.
  const fromPosition = XMS.PositionState.create({
    x: 10,
    y: 300,
    heading: 0
  });
  const maneuver = XMA.Selector.maneuver(Maneuver.TALLON_ROLL_RIGHT_3_HARD_3RR);
  const shipBase = XMA.Selector.shipBase(ShipBase.SMALL);

  // Run.
  const result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(result.x, fromPosition.x + 109);
  assert.equal(result.y, fromPosition.y + 109);
  assert.equal(result.heading, fromPosition.heading + 180);
});

QUnit.test("ManeuverComputer.computeToPosition() TurnLeft1Standard Standard", assert => {
  // Setup.
  const fromPosition = XMS.PositionState.create({
    x: 10,
    y: 60,
    heading: 0
  });
  const maneuver = XMA.Selector.maneuver(Maneuver.TURN_LEFT_1_STANDARD_1TW);
  const shipBase = XMA.Selector.shipBase(ShipBase.SMALL);

  // Run.
  const result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(result.x, fromPosition.x + 54);
  assert.equal(result.y, fromPosition.y - 54);
  assert.equal(result.heading, fromPosition.heading + 270);
});

QUnit.test("ManeuverComputer.computeToPosition() TurnLeft3Standard Standard", assert => {
  // Setup.
  const fromPosition = XMS.PositionState.create({
    x: 10,
    y: 200,
    heading: 0
  });
  const maneuver = XMA.Selector.maneuver(Maneuver.TURN_LEFT_3_STANDARD_3TW);
  const shipBase = XMA.Selector.shipBase(ShipBase.SMALL);

  // Run.
  const result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(result.x, fromPosition.x + 109);
  assert.equal(result.y, fromPosition.y - 109);
  assert.equal(result.heading, fromPosition.heading + 270);
});

QUnit.test("ManeuverComputer.computeToPosition() Stationary0Hard Standard", assert => {
  // Setup.
  const fromPosition = XMS.PositionState.create({
    x: 10,
    y: 20,
    heading: 0
  });
  const maneuver = XMA.Selector.maneuver(Maneuver.STATIONARY_0_HARD_0OR);
  const shipBase = XMA.Selector.shipBase(ShipBase.SMALL);

  // Run.
  const result = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(result.x, fromPosition.x);
  assert.equal(result.y, fromPosition.y);
  assert.equal(result.heading, fromPosition.heading);
});

const ManeuverComputerTest = {};
export default ManeuverComputerTest;
