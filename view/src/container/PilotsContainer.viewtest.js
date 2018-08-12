import TestData from "../TestData.js";

import PilotsContainer from "./PilotsContainer.js";

let gameState = TestData.createGameState();

gameState = R.assocPath(["pilotToTokenCounts", "1", "focus"], 1, gameState);

gameState = R.assocPath(["pilotToTokenCounts", "2", "ion"], 1, gameState);
gameState = R.assocPath(["pilotToTokenCounts", "2", "stress"], 1, gameState);

const container1 = PilotsContainer(gameState,
{
   agentId: 1
});

ReactDOM.render(container1, document.getElementById("panel1"));

const container2 = PilotsContainer(gameState,
{
   agentId: 2
});

ReactDOM.render(container2, document.getElementById("panel2"));