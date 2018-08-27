import SquadState from "./SquadState.js";

QUnit.module("SquadState");

const PROPS = ["id", "name", "year", "description", "points", "pilots"];

const createTestData = () =>
  SquadState.create({ id: 1, name: 2, year: 3, description: 4, points: 5, pilots: 6 });

QUnit.test("create()", assert => {
  // Run.
  const squad = createTestData();

  // Verify.
  PROPS.forEach((prop, i) => {
    assert.equal(squad[prop], i + 1);
  });
});

QUnit.test("create() immutable", assert => {
  // Setup.
  const squad = createTestData();

  // Run / Verify.
  try {
    squad.faction = 12;
    assert.ok(false, "Should have thrown an exception");
  } catch (e) {
    assert.ok(true);
  }
});

const SquadStateTest = {};
export default SquadStateTest;
