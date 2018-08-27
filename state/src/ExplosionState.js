const ExplosionState = {};

ExplosionState.create = ({ position, size = 40 }) => Immutable({ position, size });

Object.freeze(ExplosionState);

export default ExplosionState;
