const AgentResponseState = {};

AgentResponseState.create = function(
{
   agentId,
   responseKey,
   payload = {}
})
{
   return Immutable(
   {
      agentId: agentId,
      responseKey: responseKey,
      payload: payload
   });
};

Object.freeze(AgentResponseState);

export default AgentResponseState;