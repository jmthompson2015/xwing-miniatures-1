const ManeuverState = {};

ManeuverState.create = ({ color, fromPolygon, fromPosition, path, toPolygon }) =>
  Immutable({ color, fromPolygon, fromPosition, path, toPolygon });

Object.freeze(ManeuverState);

export default ManeuverState;
