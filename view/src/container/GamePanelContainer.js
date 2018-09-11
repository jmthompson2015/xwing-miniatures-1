import PilotUtils from "../PilotUtilities.js";

import GamePanel from "../component/GamePanel.js";

const GamePanelContainer = (gameState, ownProps = {}) => {
  const {
    activePilotId,
    displayExplosion,
    displayLaserBeam,
    displayManeuver,
    phaseKey,
    playArea,
    playFormatKey,
    round,
    userMessage,
    tacticalView
  } = gameState;
  const {
    playAreaZoomIn,
    playAreaZoomOut,
    resourceBase,
    tacticalViewZoomIn,
    tacticalViewZoomOut
  } = ownProps;

  const damageReduceFunction = (accum, pilotInstance) => {
    const damageInstances = XMS.Selector.damageInstancesByPilot(pilotInstance.id, gameState);
    return R.assoc(pilotInstance.id, damageInstances, accum);
  };

  const upgradeReduceFunction = (accum, pilotInstance) => {
    const upgradeInstances = XMS.Selector.upgradeInstancesByPilot(pilotInstance.id, gameState);
    return R.assoc(pilotInstance.id, upgradeInstances, accum);
  };

  const pilotInstances1 = XMS.Selector.pilotInstancesByAgent(1, gameState);
  const pilotToDamages1 = R.reduce(damageReduceFunction, {}, pilotInstances1);
  const pilotToUpgrades1 = R.reduce(upgradeReduceFunction, {}, pilotInstances1);
  const pilotInstances2 = XMS.Selector.pilotInstancesByAgent(2, gameState);
  const pilotToDamages2 = R.reduce(damageReduceFunction, {}, pilotInstances2);
  const pilotToUpgrades2 = R.reduce(upgradeReduceFunction, {}, pilotInstances2);

  const image = `background/${
    playFormatKey === XMA.PlayFormat.STANDARD ? "pia13845.jpg" : "horsehead_nebula_02092008.jpg"
  }`;

  const activePilotInstance = XMS.Selector.activePilotInstance(gameState);
  const activeShipName =
    activePilotInstance !== undefined ? PilotUtils.name(activePilotInstance) : "";

  return React.createElement(GamePanel, {
    resourceBase,

    // Pilots UI.
    pilotInstances1,
    pilotToDamages1,
    pilotToUpgrades1,
    pilotInstances2,
    pilotToDamages2,
    pilotToUpgrades2,

    // Play area UI buttons.
    playAreaZoomIn,
    playAreaZoomOut,

    // Play area UI.
    playAreaState: playArea,
    image,
    explosion: displayExplosion,
    laserBeam: displayLaserBeam,
    maneuver: displayManeuver,

    // Status bar.
    activeShipName,
    phaseKey,
    round,
    userMessage,

    // Tactical view buttons.
    tacticalViewZoomIn,
    tacticalViewZoomOut,

    // Tactical view.
    activePilotId,
    tacticalViewState: tacticalView
  });
};

export default GamePanelContainer;
