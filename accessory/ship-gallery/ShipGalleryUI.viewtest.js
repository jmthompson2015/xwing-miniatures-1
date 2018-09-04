import ShipGalleryUI from "./ShipGalleryUI.js";

const { Faction, Selector, Ship } = XMA;

const ships = [Selector.ship(Ship.TIE_FIGHTER), Selector.ship(Ship.X_WING)];

const cardGalleryUI = React.createElement(ShipGalleryUI, {
  faction: Selector.faction(Faction.GALACTIC_EMPIRE),
  ships
});

ReactDOM.render(cardGalleryUI, document.getElementById("panel"));
