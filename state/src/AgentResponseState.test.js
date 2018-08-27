import AgentResponseState from "./AgentResponseState.js";

QUnit.module("AgentResponseState");

const PROPS = ["agentId", "responseKey", "payload"];

const createTestState = () => AgentResponseState.create({ agentId: 1, responseKey: 2, payload: 3 });

QUnit.test("create()", assert => {
  // Run.
  const response = createTestState();

  // Verify.
  PROPS.forEach((prop, i) => {
    assert.equal(response[prop], i + 1);
  });
});

QUnit.test("create() full", assert => {
  // Run.
  const response = AgentResponseState.create({
    agentId: 1,
    responseKey: "planningManeuvers"
  });

  // Verify.
  assert.ok(response);
  assert.equal(response.agentId, 1);
  assert.equal(response.responseKey, "planningManeuvers");
});

QUnit.test("create() immutable", assert => {
  // Setup.
  const response = createTestState();

  // Run / Verify.
  try {
    response.agentId = 12;
    assert.ok(false, "Should have thrown an exception");
  } catch (e) {
    assert.ok(true);
  }
});

const AgentResponseStateTest = {};
export default AgentResponseStateTest;
