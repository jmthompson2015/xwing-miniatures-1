import Selector from "../Selector.js";

import PilotsUI from "../component/PilotsUI.js";

const reduceDamage = gameState => (accumulator, pilotInstance) => {
  const pilotId = pilotInstance.id;
  const newPilotToDamages = {};
  newPilotToDamages[pilotId] = Selector.damageInstancesByPilot(pilotId, gameState);
  return R.merge(accumulator, newPilotToDamages);
};

const reduceTokenCounts = gameState => (accumulator, pilotInstance) => {
  const pilotId = pilotInstance.id;
  const newPilotToTokenCounts = {};
  newPilotToTokenCounts[pilotId] = Selector.countsByPilot(pilotId, gameState);
  return R.merge(accumulator, newPilotToTokenCounts);
};

const reduceUpgrade = gameState => (accumulator, pilotInstance) => {
  const pilotId = pilotInstance.id;
  const newPilotToUpgrades = {};
  newPilotToUpgrades[pilotId] = Selector.upgradeInstancesByPilot(pilotId, gameState);
  return R.merge(accumulator, newPilotToUpgrades);
};

// /////////////////////////////////////////////////////////////////////////////////////////////////
const PilotsContainer = (gameState, ownProps = {}) => {
  const { agentId } = ownProps;
  const pilotInstances = Selector.pilotInstancesByAgent(agentId, gameState);
  const pilotToDamages = R.reduce(reduceDamage(gameState), {}, pilotInstances);
  const pilotToTokenCounts = R.reduce(reduceTokenCounts(gameState), {}, pilotInstances);
  const pilotToUpgrades = R.reduce(reduceUpgrade(gameState), {}, pilotInstances);

  return React.createElement(PilotsUI, {
    pilotInstances,
    pilotToDamages,
    pilotToTokenCounts,
    pilotToUpgrades
  });
};

export default PilotsContainer;
