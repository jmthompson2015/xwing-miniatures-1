import TokenCountsState from "./TokenCountsState.js";

QUnit.module("TokenCountsState");

const PROPS = [
  "cloak",
  "energy",
  "evade",
  "focus",
  "ion",
  "ordnance",
  "reinforce",
  "shield",
  "stress",
  "tractorBeam",
  "weaponsDisabled"
];

const createTestState = () =>
  TokenCountsState.create({
    cloak: 1,
    energy: 2,
    evade: 3,
    focus: 4,
    ion: 5,
    ordnance: 6,
    reinforce: 7,
    shield: 8,
    stress: 9,
    tractorBeam: 10,
    weaponsDisabled: 11
  });

QUnit.test("create()", assert => {
  // Setup.

  // Run.
  const tokenCount = createTestState();

  // Verify.
  PROPS.forEach((prop, i) => {
    assert.equal(tokenCount[prop], i + 1);
  });
});

QUnit.test("create() Default", assert => {
  // Setup.
  const tokenCount = TokenCountsState.create();

  // Verify.
  PROPS.forEach(prop => {
    assert.equal(tokenCount[prop], undefined);
  });
});

QUnit.test("create() immutable", assert => {
  // Setup.
  const tokenCount = createTestState();

  // Run / Verify.
  try {
    tokenCount.ion = 12;
    assert.ok(false, "Should have thrown an exception");
  } catch (e) {
    assert.ok(true);
  }
});

const TokenCountsStateTest = {};
export default TokenCountsStateTest;
