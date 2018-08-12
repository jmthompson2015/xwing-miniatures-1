import PilotsContainer from "./container/PilotsContainer.js";
import PlayAreaContainer from "./container/PlayAreaContainer.js";
import StatusBarContainer from "./container/StatusBarContainer.js";

const XWingMiniaturesView = {};

XWingMiniaturesView.drawView = (
{
   gameState,
   document,
   resourceBase = "../resource/"
}) =>
{
   const statusBarContainer = StatusBarContainer(gameState);
   ReactDOM.render(statusBarContainer, document.getElementById("statusBarContainer"));

   const pilotArea1 = PilotsContainer(gameState,
   {
      agentId: 1
   });
   ReactDOM.render(pilotArea1, document.getElementById("pilotArea1"));

   // FIXME: display firstPilotInputArea

   const playAreaContainer = PlayAreaContainer(gameState,
   {
      resourceBase: resourceBase
   });
   ReactDOM.render(playAreaContainer, document.getElementById("playAreaContainer"));

   // FIXME: display secondPilotInputArea

   const pilotArea2 = PilotsContainer(gameState,
   {
      agentId: 2
   });
   ReactDOM.render(pilotArea2, document.getElementById("pilotArea2"));
};

export default XWingMiniaturesView;