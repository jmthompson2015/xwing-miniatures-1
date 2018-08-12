const DamageState = {};

DamageState.create = function(
{
   id,
   damageKey
})
{
   return Immutable(
   {
      id: id,
      damageKey: damageKey
   });
};

Object.freeze(DamageState);

export default DamageState;