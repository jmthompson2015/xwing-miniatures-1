const AgentState = {};

AgentState.create = ({ id, name, strategy = "SimpleAgentStrategy", squad }) =>
  Immutable({ id, name: name || `Agent ${id}`, strategy, squad });

Object.freeze(AgentState);

export default AgentState;
