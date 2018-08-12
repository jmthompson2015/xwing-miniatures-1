const PositionState = {};

PositionState.create = function(
{
   x = 0,
   y = 0,
   heading = 0
} = {})
{
   return Immutable(
   {
      x: x,
      y: y,
      heading: heading
   });
};

Object.freeze(PositionState);

export default PositionState;