const TokenCountsState = {};

TokenCountsState.create = ({
  cloak,
  energy,
  evade,
  focus,
  ion,
  ordnance,
  reinforce,
  shield,
  stress,
  tractorBeam,
  weaponsDisabled
} = {}) =>
  Immutable({
    cloak,
    energy,
    evade,
    focus,
    ion,
    ordnance,
    reinforce,
    shield,
    stress,
    tractorBeam,
    weaponsDisabled
  });

Object.freeze(TokenCountsState);

export default TokenCountsState;
