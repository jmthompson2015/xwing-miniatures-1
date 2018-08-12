import PilotUtils from "./PilotUtilities.js";
import Selector from "./Selector.js";

const Range = XMA.Range;

const AgentUtilities = {};

AgentUtilities.determineValidAttackModifications = () =>
{
   const modificationKeys = XMA.Selector.enumKeys(XMA.DiceModification).filter(key => key.startsWith("attack"));

   return modificationKeys;
};

AgentUtilities.determineValidDefenseModifications = () =>
{
   const modificationKeys = XMA.Selector.enumKeys(XMA.DiceModification).filter(key => key.startsWith("defense"));

   return modificationKeys;
};

AgentUtilities.determineValidManeuvers = shipKey =>
{
   const maneuverKeys = XMA.Selector.maneuverKeysByShip(shipKey);

   // FIXME: filter maneuvers that take the ship out-of-bounds.

   return maneuverKeys;
};

AgentUtilities.determineValidShipActions = shipKey =>
{
   const shipActionKeys = XMA.Selector.shipActionKeysByShip(shipKey);

   // FIXME: filter ship actions that aren't valid.

   return shipActionKeys;
};

AgentUtilities.determineWeaponToRangeToDefenders = (pilotInstance, state) =>
{
   // Primary weapon.
   const pilotToRange = PilotUtils.createPilotToRange(state, pilotInstance.id);
   const pilotToBearing = PilotUtils.createPilotToBearing(state, pilotInstance.id);
   const ship = XMA.Selector.shipValueByPilot(pilotInstance.pilotKey);
   const firingArcKeys = XMA.Selector.firingArcKeysByShip(ship.key);
   const squadId = XMS.Selector.squadInstanceByPilot(pilotInstance.id, state).id;
   const myWeaponRangeDefendersReduce = weaponRangeDefendersReduce(squadId, state, pilotToRange, pilotToBearing, firingArcKeys);
   const pilotIds = R.map(id => parseInt(id), Object.keys(pilotToRange));

   const rangeToDefenders0 = R.reduce(myWeaponRangeDefendersReduce(PRIMARY_RANGES),
   {}, pilotIds);

   const weaponToRangeToDefenders = {};

   if (Object.keys(rangeToDefenders0).length > 0)
   {
      weaponToRangeToDefenders.primary = rangeToDefenders0;
   }

   // Secondary weapons.
   const upgradeInstances = Selector.weaponUpgradeInstancesByPilot(pilotInstance.id, state);
   const upgradeForEach = upgradeInstance =>
   {
      const rangesByUpgrade = XMA.Selector.rangesByUpgrade(upgradeInstance.upgradeKey);

      const rangeToDefenders = R.reduce(myWeaponRangeDefendersReduce(rangesByUpgrade),
      {}, pilotIds);

      if (Object.keys(rangeToDefenders).length > 0)
      {
         weaponToRangeToDefenders[upgradeInstance.upgradeKey] = rangeToDefenders;
      }
   };

   R.forEach(upgradeForEach, upgradeInstances);

   return weaponToRangeToDefenders;
};

////////////////////////////////////////////////////////////////////////////////
const PRIMARY_RANGES = [Range.ONE, Range.TWO, Range.THREE];

const weaponRangeDefendersReduce = (squadId0, state, pilotToRange, pilotToBearing, firingArcKeys) => ranges => (accum, pilotId) =>
{
   const squadId = XMS.Selector.squadInstanceByPilot(pilotId, state).id;

   if (squadId !== squadId0)
   {
      const rangeKey = pilotToRange[pilotId];

      if (rangeKey !== undefined && ranges.includes(rangeKey))
      {
         const bearing = pilotToBearing[pilotId];
         const isInFiringArc = firingArcKeys.some(firingArcKey => PilotUtils.isInFiringArc(bearing, firingArcKey));

         if (isInFiringArc)
         {
            const myPilotIds = accum[rangeKey];
            accum = R.assoc(rangeKey, (myPilotIds === undefined ? [pilotId] : R.append(pilotId, myPilotIds)), accum);
         }
      }
   }

   return accum;
};

Object.freeze(AgentUtilities);

export default AgentUtilities;