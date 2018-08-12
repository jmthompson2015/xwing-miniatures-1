import AgentState from "./AgentState.js";
import TestData from "./TestData.js";

QUnit.module("AgentState");

const PROPS = ["id", "name", "strategy", "squad"];

QUnit.test("create()", function(assert)
{
   // Run.
   const agent = createTestData();

   // Verify.
   PROPS.forEach((prop, i) =>
   {
      assert.equal(agent[prop], i + 1);
   });
});

QUnit.test("create() full", function(assert)
{
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

QUnit.test("create() immutable", function(assert)
{
   // Setup.
   const agent = createTestData();

   // Run / Verify.
   try
   {
      agent.id = 12;
      assert.ok(false, "Should have thrown an exception");
   }
   catch (e)
   {
      assert.ok(true);
   }
});

function createTestData()
{
   let i = 1;

   return AgentState.create(
   {
      id: i++,
      name: i++,
      strategy: i++,
      squad: i++
   });
}

const AgentStateTest = {};
export default AgentStateTest;