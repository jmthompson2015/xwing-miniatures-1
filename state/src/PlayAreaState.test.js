import PlayAreaState from "./PlayAreaState.js";

QUnit.module("PlayAreaState");

const PROPS = ["scale", "zoomInEnabled", "zoomOutEnabled"];

const createTestState = () =>
  PlayAreaState.create({ scale: 1, zoomInEnabled: 2, zoomOutEnabled: 3 });

QUnit.test("create()", assert => {
  // Run.
  const playArea = createTestState();

  // Verify.
  PROPS.forEach((prop, i) => {
    assert.equal(playArea[prop], i + 1);
  });
});

QUnit.test("create() immutable", assert => {
  // Setup.
  const playArea = createTestState();

  // Run / Verify.
  try {
    playArea.scale = 12;
    assert.ok(false, "Should have thrown an exception");
  } catch (e) {
    assert.ok(true);
  }
});

const PlayAreaStateTest = {};
export default PlayAreaStateTest;
