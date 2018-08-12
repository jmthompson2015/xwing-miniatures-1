import AgentQueryState from "./AgentQueryState.js";

QUnit.module("AgentQueryState");

const PROPS = ["agentId", "queryKey", "payload"];

QUnit.test("create()", function(assert)
{
   // Run.
   const query = createTestState();

   // Verify.
   PROPS.forEach((prop, i) =>
   {
      assert.equal(query[prop], i + 1);
   });
});

QUnit.test("create() full", function(assert)
{
   // Run.
   const query = AgentQueryState.create(
   {
      agentId: 1,
      queryKey: "planningManeuvers"
   });

   // Verify.
   assert.ok(query);
   assert.equal(query.agentId, 1);
   assert.equal(query.queryKey, "planningManeuvers");
});

QUnit.test("create() immutable", function(assert)
{
   // Setup.
   const query = createTestState();

   // Run / Verify.
   try
   {
      query.agentId = 12;
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

   return AgentQueryState.create(
   {
      agentId: i++,
      queryKey: i++,
      payload: i++
   });
}

const AgentQueryStateTest = {};
export default AgentQueryStateTest;