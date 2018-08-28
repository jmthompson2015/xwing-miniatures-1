import AgentUtils from "./AgentUtilities.js";

const SimpleAgentStrategy = {};

const randomElement = array => array[Math.floor(Math.random() * array.length)];

SimpleAgentStrategy.chooseAttackDiceModification = ({ abilities = [] }) =>
  new Promise(resolve => {
    resolve(randomElement(abilities));
  });

SimpleAgentStrategy.chooseDefenseDiceModification = ({ abilities = [] }) =>
  new Promise(resolve => {
    resolve(randomElement(abilities));
  });

SimpleAgentStrategy.chooseManeuvers = (pilotInstances, pilotToValidManeuvers /* , inputAreaId */) =>
  new Promise(resolve => {
    const pilotIds = Object.keys(pilotToValidManeuvers);
    const reduceFunction = (accumulator, pilotId) => {
      const maneuverKeys = pilotToValidManeuvers[pilotId];
      return R.assoc(pilotId, randomElement(maneuverKeys), accumulator);
    };
    const pilotToManeuver = R.reduce(reduceFunction, {})(pilotIds);

    resolve(pilotToManeuver);
  });

SimpleAgentStrategy.chooseShipAction = (pilotName, abilities = [] /* , inputAreaId */) =>
  new Promise(resolve => {
    resolve(randomElement(abilities));
  });

SimpleAgentStrategy.chooseWeaponAndDefender = (
  attackerInstance,
  weaponToRangeToDefenders /* , inputAreaId */
) =>
  new Promise(resolve => {
    let weaponKey;
    let defenderId;
    const weaponKeys = Object.keys(weaponToRangeToDefenders);

    if (weaponKeys.length > 0) {
      weaponKey = randomElement(weaponKeys);

      const rangeToDefenders = weaponToRangeToDefenders[weaponKey];
      const rangeKeys = Object.keys(rangeToDefenders);

      if (rangeKeys.length > 0) {
        const rangeKey = randomElement(rangeKeys);
        const defenders = rangeToDefenders[rangeKey];

        if (defenders.length > 0) {
          const defender = randomElement(defenders);
          defenderId = defender.id;
        }
      }
    }

    resolve({
      attackerId: attackerInstance.id,
      weaponKey,
      defenderId
    });
  });

SimpleAgentStrategy.notifyDamage = props => AgentUtils.notifyDamage(props);

Object.freeze(SimpleAgentStrategy);

export default SimpleAgentStrategy;
