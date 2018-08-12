const AgentQueryState = {};

AgentQueryState.create = function(
{
   agentId,
   queryKey,
   payload = {}
})
{
   return Immutable(
   {
      agentId: agentId,
      queryKey: queryKey,
      payload: payload
   });
};

Object.freeze(AgentQueryState);

export default AgentQueryState;