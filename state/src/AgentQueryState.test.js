import AgentQueryState from "./AgentQueryState.js";

QUnit.module("AgentQueryState");

const PROPS = ["agentId", "queryKey", "payload"];

const createTestState = () => AgentQueryState.create({ agentId: 1, queryKey: 2, payload: 3 });

QUnit.test("create()", assert => {
  // Run.
  const query = createTestState();

  // Verify.
  PROPS.forEach((prop, i) => {
    assert.equal(query[prop], i + 1);
  });
});

QUnit.test("create() full", assert => {
  // Run.
  const query = AgentQueryState.create({
    agentId: 1,
    queryKey: "planningManeuvers"
  });

  // Verify.
  assert.ok(query);
  assert.equal(query.agentId, 1);
  assert.equal(query.queryKey, "planningManeuvers");
});

QUnit.test("create() immutable", assert => {
  // Setup.
  const query = createTestState();

  // Run / Verify.
  try {
    query.agentId = 12;
    assert.ok(false, "Should have thrown an exception");
  } catch (e) {
    assert.ok(true);
  }
});

const AgentQueryStateTest = {};
export default AgentQueryStateTest;
