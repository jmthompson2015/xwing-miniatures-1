import PilotUtilities from "../PilotUtilities.js";
import Selector from "../Selector.js";

import StatusBarUI from "../component/StatusBarUI.js";

const StatusBarContainer = (gameState, ownProps = {}) => {
  const { activePilotId, phaseKey, pilotInstances, round } = gameState;
  const activePilotInstance =
    activePilotId !== undefined ? pilotInstances[activePilotId] : undefined;
  const activeShipName =
    activePilotInstance !== undefined ? PilotUtilities.name(activePilotInstance) : "";
  const phaseName = Selector.phase(phaseKey).name;
  const { helpBase } = ownProps;

  return React.createElement(StatusBarUI, {
    activeShipName,
    phaseName,
    round,
    userMessage: Selector.userMessage(gameState),
    helpBase
  });
};

export default StatusBarContainer;
