const AgentUtilities = {};

AgentUtilities.clearInputArea = inputAreaId => ReactDOM.render(ReactDOMFactories.span(""), document.getElementById(inputAreaId));

AgentUtilities.notifyDamage = (
{
   attackerInstance,
   combatInstance,
   defenderInstance,
   inputAreaId,
   phaseKey
}) => new Promise((resolve) =>
{
   const callback = () =>
   {
      AgentUtilities.clearInputArea(inputAreaId);
      resolve();
   };

   const dialog = React.createElement(XMV.CombatDialog,
   {
      combatInstance: combatInstance,
      attackerInstance: attackerInstance,
      defenderInstance: defenderInstance,
      phaseKey: phaseKey,
      okFunction: callback
   });

   ReactDOM.render(dialog, document.getElementById(inputAreaId));
});

Object.freeze(AgentUtilities);

export default AgentUtilities;