import AgentUtils from "./AgentUtilities.js";

const HumanAgentStrategy = {};

HumanAgentStrategy.chooseAttackDiceModification = ({
  abilities,
  attackerInstance,
  combatInstance,
  defenderInstance,
  inputAreaId,
  phaseKey
}) =>
  new Promise(resolve => {
    const callback = ability => {
      resolve(ability);
    };

    const dialog = React.createElement(XMV.CombatDialog, {
      abilities,
      attackerInstance,
      combatInstance,
      defenderInstance,
      okFunction: callback,
      phaseKey
    });

    ReactDOM.render(dialog, document.getElementById(inputAreaId));
  });

HumanAgentStrategy.chooseDefenseDiceModification = ({
  abilities,
  attackerInstance,
  combatInstance,
  defenderInstance,
  inputAreaId,
  phaseKey
}) =>
  new Promise(resolve => {
    const callback = ability => {
      resolve(ability);
    };

    const dialog = React.createElement(XMV.CombatDialog, {
      abilities,
      attackerInstance,
      combatInstance,
      defenderInstance,
      okFunction: callback,
      phaseKey
    });

    ReactDOM.render(dialog, document.getElementById(inputAreaId));
  });

HumanAgentStrategy.chooseManeuvers = (pilotInstances, pilotToValidManeuvers, inputAreaId) =>
  new Promise(resolve => {
    const callback = ({ pilotToManeuver }) => {
      AgentUtils.clearInputArea(inputAreaId);
      resolve(pilotToManeuver);
    };

    const dialog = React.createElement(XMV.PlanningDialog, {
      pilotInstances,
      pilotToValidManeuvers,
      callback
    });

    ReactDOM.render(dialog, document.getElementById(inputAreaId));
  });

HumanAgentStrategy.chooseShipAction = (activePilotName, abilities, inputAreaId) =>
  new Promise(resolve => {
    const callback = ability => {
      AgentUtils.clearInputArea(inputAreaId);
      resolve(ability);
    };

    const dialog = React.createElement(XMV.AbilityDialog, {
      abilities,
      activePilotName,
      onChange: callback
    });

    ReactDOM.render(dialog, document.getElementById(inputAreaId));
  });

HumanAgentStrategy.chooseWeaponAndDefender = (
  attackerInstance,
  weaponToRangeToDefenders,
  inputAreaId
) =>
  new Promise(resolve => {
    const weaponKeys = Object.keys(weaponToRangeToDefenders);

    if (weaponKeys.length > 0) {
      const callback = ({ attackerId, weaponKey, defenderId }) => {
        AgentUtils.clearInputArea(inputAreaId);
        resolve({
          attackerId,
          weaponKey,
          defenderId
        });
      };

      const dialog = React.createElement(XMV.WeaponAndDefenderDialog, {
        attackerInstance,
        callback,
        weaponToRangeToDefenders
      });

      ReactDOM.render(dialog, document.getElementById(inputAreaId));
    } else {
      resolve({});
    }
  });

HumanAgentStrategy.notifyDamage = props => AgentUtils.notifyDamage(props);

Object.freeze(HumanAgentStrategy);

export default HumanAgentStrategy;
