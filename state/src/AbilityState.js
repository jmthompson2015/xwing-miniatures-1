/*
 * @param source One of [DamageCard, DiceModification, PilotCard, ShipAction, UpgradeCard].
 * @param sourceKey Damage, dice modification, pilot, ship action, or upgrade key.
 * @param context Optional context.
 */
const AbilityState = {};

AbilityState.create = function(
{
   sourceName,
   sourceKey,
   context
})
{
   return Immutable(
   {
      sourceName: sourceName,
      sourceKey: sourceKey,
      context: context
   });
};

Object.freeze(AbilityState);

export default AbilityState;