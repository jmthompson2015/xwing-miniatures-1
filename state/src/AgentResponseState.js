const AgentResponseState = {};

AgentResponseState.create = ({ agentId, responseKey, payload = {} }) =>
  Immutable({ agentId, responseKey, payload });

Object.freeze(AgentResponseState);

export default AgentResponseState;
