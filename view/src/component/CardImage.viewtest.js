import Selector from "../Selector.js";

import CardImage from "./CardImage.js";

const cells = [];
addCardImage(cells, Selector.damageCard(XMA.DamageCard.BLINDED_PILOT));
addCardImage(cells, Selector.damageCard(XMA.DamageCard.CONSOLE_FIRE));
addCardImage(cells, Selector.pilotCard(XMA.PilotCard.DARTH_VADER));
addCardImage(cells, Selector.pilotCard(XMA.PilotCard.LUKE_SKYWALKER));
addCardImage(cells, Selector.upgradeCard(XMA.UpgradeCard.A_WING_TEST_PILOT));
addCardImage(cells, Selector.upgradeCard(XMA.UpgradeCard.BACKUP_SHIELD_GENERATOR));

ReactDOM.render(ReactDOMFactories.div(
{}, cells), document.getElementById("panel"));

function addCardImage(cells, card)
{
   const isPilot = (Selector.pilotCard(card.key) !== undefined);

   const element = React.createElement(CardImage,
   {
      card: card,
      width: (isPilot ? 200 : 200 / 1.4)
   });

   cells.push(ReactDOMFactories.div(
   {
      key: "card" + cells.length,
      className: "fl v-top",
   }, element));
}