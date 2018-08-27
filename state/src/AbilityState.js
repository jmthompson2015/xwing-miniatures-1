/*
 * @param source One of [DamageCard, DiceModification, PilotCard, ShipAction, UpgradeCard].
 * @param sourceKey Damage, dice modification, pilot, ship action, or upgrade key.
 * @param context Optional context.
 */
const AbilityState = {};

AbilityState.create = ({ sourceName, sourceKey, context }) =>
  Immutable({ sourceName, sourceKey, context });

Object.freeze(AbilityState);

export default AbilityState;
