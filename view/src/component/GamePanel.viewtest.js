/* eslint no-console: ["error", { allow: ["log"] }] */

import PilotUtils from "../PilotUtilities.js";
import TestData from "../TestData.js";

import GamePanel from "./GamePanel.js";

const gameState = TestData.createGameState();

const playAreaZoomIn = () => {
  console.log(`playAreaZoomIn()`);
};

const playAreaZoomOut = () => {
  console.log(`playAreaZoomOut()`);
};

const tacticalViewZoomIn = () => {
  console.log(`tacticalViewZoomIn()`);
};

const tacticalViewZoomOut = () => {
  console.log(`tacticalViewZoomOut()`);
};

const activePilotId = XMS.Selector.activePilotId(gameState);
const activePilotInstance = XMS.Selector.pilotInstance(activePilotId, gameState);
const activeShipName = PilotUtils.name(activePilotInstance);

const reduceFunction = (accum, pilotInstance) => {
  const upgradeInstances = XMS.Selector.upgradeInstancesByPilot(pilotInstance.id, gameState);
  return R.assoc(pilotInstance.id, upgradeInstances, accum);
};

const pilotInstances1 = XMS.Selector.pilotInstancesByAgent(1, gameState);
const pilotToUpgrades1 = R.reduce(reduceFunction, {}, pilotInstances1);
const pilotInstances2 = XMS.Selector.pilotInstancesByAgent(2, gameState);
const pilotToUpgrades2 = R.reduce(reduceFunction, {}, pilotInstances2);

const gameView = React.createElement(GamePanel, {
  // Pilots UI.
  pilotInstances1,
  pilotToUpgrades1,
  pilotInstances2,
  pilotToUpgrades2,

  // Play area UI buttons.
  playAreaZoomIn,
  playAreaZoomOut,

  // Status bar.
  activeShipName,
  phaseKey: XMS.Selector.phaseKey(gameState),
  round: XMS.Selector.round(gameState),
  userMessage: XMS.Selector.userMessage(gameState),

  // Tactical view buttons.
  tacticalViewZoomIn,
  tacticalViewZoomOut,

  // Tactical view.
  activePilotId
});

ReactDOM.render(gameView, document.getElementById("panel"));
