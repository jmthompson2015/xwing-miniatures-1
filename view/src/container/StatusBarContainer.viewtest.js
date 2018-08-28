import TestData from "../TestData.js";

import StatusBarContainer from "./StatusBarContainer.js";

let gameState = TestData.createGameState();
gameState = R.assoc("activePilotId", 3, gameState);
gameState = R.assoc("userMessage", "Somebody attacked someone.", gameState);

const container = StatusBarContainer(gameState, {
  helpBase: "../"
});

ReactDOM.render(container, document.getElementById("panel"));
