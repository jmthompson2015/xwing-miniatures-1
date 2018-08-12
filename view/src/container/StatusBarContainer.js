import PilotUtilities from "../PilotUtilities.js";
import Selector from "../Selector.js";

import StatusBarUI from "../component/StatusBarUI.js";

const StatusBarContainer = (gameState, ownProps = {}) =>
{
   const activePilotId = gameState.activePilotId;
   const activePilotInstance = (activePilotId !== undefined ? gameState.pilotInstances[activePilotId] : undefined);
   const activeShipName = (activePilotInstance !== undefined ? PilotUtilities.name(activePilotInstance) : "");
   const phaseName = Selector.phase(gameState.phaseKey).name;

   return React.createElement(StatusBarUI,
   {
      activeShipName: activeShipName,
      phaseName: phaseName,
      round: gameState.round,
      userMessage: Selector.userMessage(gameState),
      helpBase: ownProps.helpBase
   });
};

export default StatusBarContainer;