import TacticalViewState from "./TacticalViewState.js";

QUnit.module("TacticalViewState");

const PROPS = ["scale", "zoomInEnabled", "zoomOutEnabled"];

const createTestState = () =>
  TacticalViewState.create({ scale: 1, zoomInEnabled: 2, zoomOutEnabled: 3 });

QUnit.test("create()", assert => {
  // Run.
  const tacticalView = createTestState();

  // Verify.
  PROPS.forEach((prop, i) => {
    assert.equal(tacticalView[prop], i + 1);
  });
});

QUnit.test("create() immutable", assert => {
  // Setup.
  const tacticalView = createTestState();

  // Run / Verify.
  try {
    tacticalView.scale = 12;
    assert.ok(false, "Should have thrown an exception");
  } catch (e) {
    assert.ok(true);
  }
});

const TacticalViewStateTest = {};
export default TacticalViewStateTest;
