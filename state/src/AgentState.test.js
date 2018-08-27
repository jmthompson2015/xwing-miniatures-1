import AgentState from "./AgentState.js";
import TestData from "./TestData.js";

QUnit.module("AgentState");

const PROPS = ["id", "name", "strategy", "squad"];

const createTestData = () => AgentState.create({ id: 1, name: 2, strategy: 3, squad: 4 });

QUnit.test("create()", assert => {
  // Run.
  const agent = createTestData();

  // Verify.
  PROPS.forEach((prop, i) => {
    assert.equal(agent[prop], i + 1);
  });
});

QUnit.test("create() full", assert => {
  // Setup.
  const id = 1;
  const strategy = "SimpleAgentStrategy";

  // Run.
  const agent = TestData.createAgentRebel(id, strategy);

  // Verify.
  assert.ok(agent);
  assert.equal(agent.id, 1);
  assert.equal(agent.name, "Rebel Agent");
  assert.equal(agent.strategy, strategy);
});

QUnit.test("create() immutable", assert => {
  // Setup.
  const agent = createTestData();

  // Run / Verify.
  try {
    agent.id = 12;
    assert.ok(false, "Should have thrown an exception");
  } catch (e) {
    assert.ok(true);
  }
});

const AgentStateTest = {};
export default AgentStateTest;
