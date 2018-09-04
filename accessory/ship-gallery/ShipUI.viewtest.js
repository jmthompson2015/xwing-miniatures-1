import ShipUI from "./ShipUI.js";

const { Faction, Selector, Ship } = XMA;
const { PositionState } = XMS;
const { Endpoint } = XMV;

const resourceBase = Endpoint.ARTIFACT_RESOURCE;

function drawShip(elementId, faction, ship) {
  const shipBase = Selector.shipBaseValueByShip(ship.key);
  const position = PositionState.create({
    x: shipBase.width / 2,
    y: shipBase.height / 2,
    heading: 0
  });
  const firingArcs = Selector.firingArcKeysByShip(ship.key);
  const primaryFiringArcKey = firingArcs.length > 0 ? firingArcs[0] : undefined;
  const auxiliaryFiringArcKey = firingArcs.length > 1 ? firingArcs[1] : undefined;

  const element = React.createElement(ShipUI, {
    auxiliaryFiringArcKey,
    canvasId: ship.name,
    faction,
    position,
    primaryFiringArcKey,
    resourceBase,
    shipBase,
    ship
  });

  ReactDOM.render(element, document.getElementById(elementId));
}

drawShip("panel0", Selector.faction(Faction.GALACTIC_EMPIRE), Selector.ship(Ship.TIE_FIGHTER));
drawShip("panel1", Selector.faction(Faction.REBEL_ALLIANCE), Selector.ship(Ship.X_WING));
