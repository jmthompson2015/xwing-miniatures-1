const TokenCountsState = {};

TokenCountsState.create = function(
{
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
} = {})
{
   return Immutable(
   {
      cloak: cloak,
      energy: energy,
      evade: evade,
      focus: focus,
      ion: ion,
      ordnance: ordnance,
      reinforce: reinforce,
      shield: shield,
      stress: stress,
      tractorBeam: tractorBeam,
      weaponsDisabled: weaponsDisabled
   });
};

Object.freeze(TokenCountsState);

export default TokenCountsState;