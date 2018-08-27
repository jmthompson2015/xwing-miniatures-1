import ManeuverState from "./ManeuverState.js";

QUnit.module("ManeuverState");

const PROPS = ["color", "fromPolygon", "fromPosition", "path", "toPolygon"];

const createTestState = () =>
  ManeuverState.create({ color: 1, fromPolygon: 2, fromPosition: 3, path: 4, toPolygon: 5 });

QUnit.test("create()", assert => {
  // Run.
  const display = createTestState();

  // Verify.
  PROPS.forEach((prop, i) => {
    assert.equal(display[prop], i + 1);
  });
});

QUnit.test("create() immutable", assert => {
  // Setup.
  const pilot = createTestState();

  // Run / Verify.
  try {
    pilot.id = 12;
    assert.ok(false, "Should have thrown an exception");
  } catch (e) {
    assert.ok(true);
  }
});

const ManeuverStateTest = {};
export default ManeuverStateTest;
