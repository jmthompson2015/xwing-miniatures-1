const TargetLockState = {};

TargetLockState.create = function(
{
   id,
   attackerId,
   defenderId
})
{
   return Immutable(
   {
      id: id,
      attackerId: attackerId,
      defenderId: defenderId
   });
};

Object.freeze(TargetLockState);

export default TargetLockState;