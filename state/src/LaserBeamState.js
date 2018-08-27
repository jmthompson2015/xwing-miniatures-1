const LaserBeamState = {};

LaserBeamState.create = ({ color, fromPosition, isPrimary = true, toPosition }) =>
  Immutable({ color, fromPosition, isPrimary, toPosition });

Object.freeze(LaserBeamState);

export default LaserBeamState;
