import Selector from "./Selector.js";

const { Faction } = XMA;

const SquadUtils = {};

const firstOrderPrecedence = R.ifElse(
  R.equals(Faction.FIRST_ORDER),
  R.identity,
  R.always(Faction.GALACTIC_EMPIRE)
);

const resistancePrecedence = R.ifElse(
  R.equals(Faction.RESISTANCE),
  R.identity,
  R.always(Faction.REBEL_ALLIANCE)
);

// /////////////////////////////////////////////////////////////////////////////////////////////////
SquadUtils.determineFaction = (state, squadId) => {
  const reducerFunction = (accumulator, pilotId) => {
    const pilotCard = Selector.pilotCard(pilotId, state);
    const factionName = pilotCard.faction;
    const faction = XMA.EnumUtilities.findByName(factionName, XMA.Faction);
    const factionKey = faction.key;

    return R.cond([
      [R.equals(Faction.FIRST_ORDER), R.always(Faction.FIRST_ORDER)],
      [R.equals(Faction.GALACTIC_EMPIRE), R.always(firstOrderPrecedence(accumulator))],
      [R.equals(Faction.RESISTANCE), R.always(Faction.RESISTANCE)],
      [R.equals(Faction.REBEL_ALLIANCE), R.always(resistancePrecedence(accumulator))],
      [R.equals(Faction.SCUM_AND_VILLAINY), R.always(Faction.SCUM_AND_VILLAINY)],
      [R.T, R.always(`Unknown factionKey ${factionKey} for factionName ${factionName}`)]
    ])(factionKey);
  };

  const pilotIds = Selector.pilotIdsBySquad(squadId, state);

  return pilotIds.reduce(reducerFunction, Faction.GALACTIC_EMPIRE);
};

Object.freeze(SquadUtils);

export default SquadUtils;
