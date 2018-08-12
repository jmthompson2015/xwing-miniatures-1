import Selector from "../Selector.js";

import StatusBarUI from "./StatusBarUI.js";

const element = React.createElement(StatusBarUI,
{
   activeShipName: "Bob's Fighter",
   phaseName: Selector.phase(XMA.Phase.COMBAT_ROLL_ATTACK_DICE).name,
   round: 12,
   userMessage: "Somebody attacked someone.",
   helpBase: "../"
});
ReactDOM.render(element, document.getElementById("statusBarPanel"));