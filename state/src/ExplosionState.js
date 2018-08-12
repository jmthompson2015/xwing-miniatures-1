const ExplosionState = {};

ExplosionState.create = function(
{
   position,
   size = 40
})
{
   return Immutable(
   {
      position: position,
      size: size
   });
};

Object.freeze(ExplosionState);

export default ExplosionState;