import AgentUtils from "./AgentUtilities.js";

const HumanAgentStrategy = {};

HumanAgentStrategy.chooseAttackDiceModification = (
{
   abilities,
   attackerInstance,
   combatInstance,
   defenderInstance,
   inputAreaId,
   phaseKey
}) => new Promise((resolve) =>
{
   const callback = ability =>
   {
      resolve(ability);
   };

   const dialog = React.createElement(XMV.CombatDialog,
   {
      abilities: abilities,
      attackerInstance: attackerInstance,
      combatInstance: combatInstance,
      defenderInstance: defenderInstance,
      okFunction: callback,
      phaseKey: phaseKey
   });

   ReactDOM.render(dialog, document.getElementById(inputAreaId));
});

HumanAgentStrategy.chooseDefenseDiceModification = (
{
   abilities,
   attackerInstance,
   combatInstance,
   defenderInstance,
   inputAreaId,
   phaseKey
}) => new Promise((resolve) =>
{
   const callback = (ability) =>
   {
      resolve(ability);
   };

   const dialog = React.createElement(XMV.CombatDialog,
   {
      abilities: abilities,
      attackerInstance: attackerInstance,
      combatInstance: combatInstance,
      defenderInstance: defenderInstance,
      okFunction: callback,
      phaseKey: phaseKey
   });

   ReactDOM.render(dialog, document.getElementById(inputAreaId));
});

HumanAgentStrategy.chooseManeuvers = (pilotInstances, pilotToValidManeuvers, inputAreaId) => new Promise((resolve) =>
{
   const callback = (
   {
      pilotToManeuver
   }) =>
   {
      AgentUtils.clearInputArea(inputAreaId);
      resolve(pilotToManeuver);
   };

   const dialog = React.createElement(XMV.PlanningDialog,
   {
      pilotInstances: pilotInstances,
      pilotToValidManeuvers,
      callback: callback
   });

   ReactDOM.render(dialog, document.getElementById(inputAreaId));
});

HumanAgentStrategy.chooseShipAction = (activePilotName, abilities, inputAreaId) => new Promise((resolve) =>
{
   const callback = ability =>
   {
      AgentUtils.clearInputArea(inputAreaId);
      resolve(ability);
   };

   const dialog = React.createElement(XMV.AbilityDialog,
   {
      abilities: abilities,
      activePilotName: activePilotName,
      onChange: callback
   });

   ReactDOM.render(dialog, document.getElementById(inputAreaId));
});

HumanAgentStrategy.chooseWeaponAndDefender = (attackerInstance, weaponToRangeToDefenders, inputAreaId) => new Promise((resolve) =>
{
   const weaponKeys = Object.keys(weaponToRangeToDefenders);

   if (weaponKeys.length > 0)
   {
      const callback = (
      {
         attackerId,
         weaponKey,
         defenderId
      }) =>
      {
         AgentUtils.clearInputArea(inputAreaId);
         resolve(
         {
            attackerId: attackerId,
            weaponKey: weaponKey,
            defenderId: defenderId
         });
      };

      const dialog = React.createElement(XMV.WeaponAndDefenderDialog,
      {
         attackerInstance: attackerInstance,
         callback: callback,
         weaponToRangeToDefenders: weaponToRangeToDefenders
      });

      ReactDOM.render(dialog, document.getElementById(inputAreaId));
   }
   else
   {
      resolve(
      {});
   }
});

HumanAgentStrategy.notifyDamage = props => AgentUtils.notifyDamage(props);

Object.freeze(HumanAgentStrategy);

export default HumanAgentStrategy;