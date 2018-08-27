const AgentQueryState = {};

AgentQueryState.create = ({ agentId, queryKey, payload = {} }) =>
  Immutable({ agentId, queryKey, payload });

Object.freeze(AgentQueryState);

export default AgentQueryState;
