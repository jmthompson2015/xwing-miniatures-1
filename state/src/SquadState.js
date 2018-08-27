const SquadState = {};

SquadState.create = ({
  id,
  name,
  year,
  description,
  points,

  pilots
}) =>
  Immutable({
    id,
    name,
    year,
    description,
    points,

    pilots: Immutable(pilots)
  });

Object.freeze(SquadState);

export default SquadState;
