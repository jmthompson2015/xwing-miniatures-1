const PilotState = {};

PilotState.create = function(
{
   id,
   pilotKey,

   criticals,
   damages,
   position,
   statBonuses,
   tokenCounts,
   upgrades
})
{
   return Immutable(
   {
      id: id,
      pilotKey: pilotKey,

      criticals: Immutable(criticals),
      damages: Immutable(damages),
      position: Immutable(position),
      statBonuses: Immutable(statBonuses),
      tokenCounts: Immutable(tokenCounts),
      upgrades: Immutable(upgrades)
   });
};

Object.freeze(PilotState);

export default PilotState;