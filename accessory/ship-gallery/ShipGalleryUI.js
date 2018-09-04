import ShipUI from "./ShipUI.js";

const { Selector } = XMA;
const { PositionState } = XMS;
const { Endpoint, ReactUtilities: ReactUtils } = XMV;

class ShipGalleryUI extends React.PureComponent {
  render() {
    const { faction, ships } = this.props;

    let id = 1;
    const mapFunction = ship => {
      const canvasId = faction.key + ship.key + id;
      const shipBase = Selector.shipBaseValueByShip(ship.key);
      const position = PositionState.create({
        x: shipBase.width / 2,
        y: shipBase.height / 2,
        heading: 0
      });
      const firingArcs = Selector.firingArcKeysByShip(ship.key);
      const primaryFiringArcKey = firingArcs.length > 0 ? firingArcs[0] : undefined;
      const auxiliaryFiringArcKey = firingArcs.length > 1 ? firingArcs[1] : undefined;
      const shipUI = React.createElement(ShipUI, {
        auxiliaryFiringArcKey,
        canvasId,
        faction,
        position,
        primaryFiringArcKey,
        resourceBase: Endpoint.ARTIFACT_RESOURCE,
        shipBase,
        ship
      });
      id += 1;

      return ReactUtils.createCell(shipUI, canvasId, "pa1");
    };

    const cells = R.map(mapFunction, ships);

    return ReactUtils.createFlexboxWrap(cells);
  }
}

ShipGalleryUI.propTypes = {
  faction: PropTypes.shape().isRequired,
  ships: PropTypes.arrayOf().isRequired
};

export default ShipGalleryUI;
