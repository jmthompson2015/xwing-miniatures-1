import CardGalleryUI from "./CardGalleryUI.js";

const cards = [
  XMA.Selector.damageCard(XMA.DamageCard.BLINDED_PILOT),
  XMA.Selector.pilotCard(XMA.PilotCard.ACADEMY_PILOT),
  XMA.Selector.upgradeCard(XMA.UpgradeCard.VETERAN_INSTINCTS)
];
const width = 200;

const cardGalleryUI = React.createElement(CardGalleryUI, {
  cards,
  width
});

ReactDOM.render(cardGalleryUI, document.getElementById("panel"));
