const DamageState = {};

DamageState.create = ({ id, damageKey }) => Immutable({ id, damageKey });

Object.freeze(DamageState);

export default DamageState;
