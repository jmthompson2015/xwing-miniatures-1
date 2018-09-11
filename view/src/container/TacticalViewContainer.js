import TacticalView from "../component/TacticalView.js";

const TacticalViewContainer = gameState => {
  const { activePilotId, pilotInstances, tacticalView } = gameState;

  return React.createElement(TacticalView, {
    activePilotId,
    pilotInstances,
    scale: tacticalView.scale
  });
};

export default TacticalViewContainer;
