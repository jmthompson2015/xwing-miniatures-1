import AgentResponseState from "./AgentResponseState.js";

QUnit.module("AgentResponseState");

const PROPS = ["agentId", "responseKey", "payload"];

QUnit.test("create()", function(assert)
{
   // Run.
   const response = createTestState();

   // Verify.
   PROPS.forEach((prop, i) =>
   {
      assert.equal(response[prop], i + 1);
   });
});

QUnit.test("create() full", function(assert)
{
   // Run.
   const response = AgentResponseState.create(
   {
      agentId: 1,
      responseKey: "planningManeuvers"
   });

   // Verify.
   assert.ok(response);
   assert.equal(response.agentId, 1);
   assert.equal(response.responseKey, "planningManeuvers");
});

QUnit.test("create() immutable", function(assert)
{
   // Setup.
   const response = createTestState();

   // Run / Verify.
   try
   {
      response.agentId = 12;
      assert.ok(false, "Should have thrown an exception");
   }
   catch (e)
   {
      assert.ok(true);
   }
});

function createTestState()
{
   let i = 1;

   return AgentResponseState.create(
   {
      agentId: i++,
      responseKey: i++,
      payload: i++
   });
}

const AgentResponseStateTest = {};
export default AgentResponseStateTest;