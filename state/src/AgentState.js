const AgentState = {};

AgentState.create = function(
{
   id,
   name,
   strategy = "SimpleAgentStrategy",

   squad
})
{
   name = name || "Agent " + id;

   return Immutable(
   {
      id: id,
      name: name,
      strategy: strategy,

      squad: squad
   });
};

Object.freeze(AgentState);

export default AgentState;