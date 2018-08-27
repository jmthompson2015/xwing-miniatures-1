const PositionState = {};

PositionState.create = ({ x = 0, y = 0, heading = 0 } = {}) => Immutable({ x, y, heading });

Object.freeze(PositionState);

export default PositionState;
