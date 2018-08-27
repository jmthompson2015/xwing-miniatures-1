const StatBonusesState = {};

StatBonusesState.create = ({ agility, energy, hull, pilotSkill, primaryWeapon, shield } = {}) =>
  Immutable({ agility, energy, hull, pilotSkill, primaryWeapon, shield });

Object.freeze(StatBonusesState);

export default StatBonusesState;
