import AgentUtils from "./AgentUtilities.js";
import SimpleAgentStrategy from "./SimpleAgentStrategy.js";

const MediumAgentStrategy = {};

MediumAgentStrategy.chooseAttackDiceModification = (
{
   abilities
}) => new Promise((resolve) =>
{
   resolve(SimpleAgentStrategy.chooseAttackDiceModification(
   {
      abilities: abilities
   }));
});

MediumAgentStrategy.chooseDefenseDiceModification = (
{
   abilities
}) => new Promise((resolve) =>
{
   resolve(SimpleAgentStrategy.chooseDefenseDiceModification(
   {
      abilities: abilities
   }));
});

MediumAgentStrategy.chooseManeuvers = (pilotInstances, pilotToValidManeuvers, inputAreaId) => new Promise((resolve) =>
{
   resolve(SimpleAgentStrategy.chooseManeuvers(pilotInstances, pilotToValidManeuvers, inputAreaId));
});

MediumAgentStrategy.chooseShipAction = (pilotName, abilities, inputAreaId) => new Promise((resolve) =>
{
   resolve(SimpleAgentStrategy.chooseShipAction(pilotName, abilities, inputAreaId));
});

MediumAgentStrategy.chooseWeaponAndDefender = (attackerInstance, weaponToRangeToDefenders /*, inputAreaId*/ ) => new Promise((resolve) =>
{
   let weaponKey0, rangeKey0, defenderId0;
   const weaponKeys = Object.keys(weaponToRangeToDefenders);

   R.forEach(weaponKey =>
   {
      const rangeToDefenders = weaponToRangeToDefenders[weaponKey];
      const rangeDefender = chooseClosestDefender(rangeToDefenders);
      const range0 = XMA.Selector.range(rangeKey0);
      const range = XMA.Selector.range(rangeDefender.rangeKey);

      if (rangeKey0 === undefined || range.maxDistance < range0.maxDistance)
      {
         weaponKey0 = weaponKey;
         rangeKey0 = rangeDefender.rangeKey;
         defenderId0 = rangeDefender.defenderId;
      }
   }, weaponKeys);

   resolve(
   {
      attackerId: attackerInstance.id,
      weaponKey: weaponKey0,
      defenderId: defenderId0
   });
});

MediumAgentStrategy.notifyDamage = () => new Promise((resolve) =>
{
   resolve();
});

MediumAgentStrategy.notifyDamage = props => AgentUtils.notifyDamage(props);

const chooseClosestDefender = rangeToDefenders =>
{
   let rangeKey, defender;

   if (rangeToDefenders !== undefined)
   {
      rangeKey = XMA.Range.ONE;
      const defenders = rangeToDefenders[rangeKey];
      defender = (defenders !== undefined && defenders.length > 0 ? randomElement(defenders) : undefined);

      if (defender === undefined)
      {
         rangeKey = XMA.Range.TWO;
         const defenders = rangeToDefenders[rangeKey];
         defender = (defenders !== undefined && defenders.length > 0 ? randomElement(defenders) : undefined);
      }

      if (defender === undefined)
      {
         rangeKey = XMA.Range.THREE;
         const defenders = rangeToDefenders[rangeKey];
         defender = (defenders !== undefined && defenders.length > 0 ? randomElement(defenders) : undefined);
      }
   }

   return {
      rangeKey: rangeKey,
      defenderId: (defender !== undefined ? defender.id : undefined)
   };
};

const randomElement = array => array[Math.floor(Math.random() * array.length)];

Object.freeze(MediumAgentStrategy);

export default MediumAgentStrategy;