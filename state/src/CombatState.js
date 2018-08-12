const CombatState = {};

CombatState.create = function(
{
   id,
   attackerId,
   defenderId,
   rangeKey,
   weaponKey = "primary",

   criticalDamage = 0,
   hitDamage = 0,
   shieldDamage = 0,

   attackDiceKeys = [],
   defenseDiceKeys = [],
})
{
   return Immutable(
   {
      id: Immutable(id),
      attackerId: Immutable(attackerId),
      defenderId: Immutable(defenderId),
      rangeKey: Immutable(rangeKey),
      weaponKey: Immutable(weaponKey),

      criticalDamage: Immutable(criticalDamage),
      hitDamage: Immutable(hitDamage),
      shieldDamage: Immutable(shieldDamage),

      attackDiceKeys: Immutable(attackDiceKeys),
      defenseDiceKeys: Immutable(defenseDiceKeys),
   });
};

Object.freeze(CombatState);

export default CombatState;