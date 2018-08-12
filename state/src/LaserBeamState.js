const LaserBeamState = {};

LaserBeamState.create = function(
{
   color,
   fromPosition,
   isPrimary = true,
   toPosition
})
{
   return Immutable(
   {
      color: color,
      fromPosition: fromPosition,
      isPrimary: isPrimary,
      toPosition: toPosition
   });
};

Object.freeze(LaserBeamState);

export default LaserBeamState;