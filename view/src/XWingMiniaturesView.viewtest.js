import TestData from "./TestData.js";
import XWingMiniaturesView from "./XWingMiniaturesView.js";

let gameState = TestData.createGameState();
const position1 = {
  x: 305,
  y: 120,
  heading: 45
};
gameState = R.assocPath(["pilotInstances", 1, "position"], position1, gameState);
gameState = R.assoc("userMessage", "Initialized.", gameState);

XWingMiniaturesView.drawView({ gameState, document });
