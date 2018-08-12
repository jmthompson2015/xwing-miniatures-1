const StatBonusesState = {};

StatBonusesState.create = function(
{
   agility,
   energy,
   hull,
   pilotSkill,
   primaryWeapon,
   shield
} = {})
{
   return Immutable(
   {
      agility: agility,
      energy: energy,
      hull: hull,
      pilotSkill: pilotSkill,
      primaryWeapon: primaryWeapon,
      shield: shield
   });
};

Object.freeze(StatBonusesState);

export default StatBonusesState;