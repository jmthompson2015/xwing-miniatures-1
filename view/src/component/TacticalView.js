import Endpoint from "../Endpoint.js";

import ShipImage from "./ShipImage.js";

const { Range, Selector } = XMA;
const { PositionState } = XMS;

const DEG_TO_RADIANS = Math.PI / 180.0;
const SIZE = 300;

const drawDiameter = (context0, angle) => {
  const a = angle * DEG_TO_RADIANS;
  const x = SIZE * Math.cos(a);
  const y = SIZE * Math.sin(a);
  const context = context0;
  context.beginPath();
  context.moveTo(-x, -y);
  context.lineTo(x, y);
  context.stroke();
};

const drawDisc = (context0, radius) => {
  const context = context0;
  context.beginPath();
  context.arc(0, 0, radius, 0, 2 * Math.PI);
  context.fill();
};

const subtract = position1 => position2 =>
  PositionState.create({
    x: position2.x - position1.x,
    y: position2.y - position1.y,
    heading: position2.heading
  });

// /////////////////////////////////////////////////////////////////////////////////////////////////
class TacticalView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      factionShipToImage: {}
    };
  }

  componentDidMount() {
    this.loadImages();
    this.paint();
  }

  componentDidUpdate() {
    this.paint();
  }

  createShipIcon(faction, ship) {
    const image = new Image();
    image.onload = () => this.forceUpdate();

    const index = ship.faction.indexOf(faction.name);
    const filename = ship.images[index];
    image.src = Endpoint.ARTIFACT_RESOURCE + filename;

    return image;
  }

  drawShips(context) {
    const { factionShipToImage } = this.state;

    if (Object.keys(factionShipToImage).length > 0) {
      const { activePilotId, pilotInstances } = this.props;
      const position0 = pilotInstances[activePilotId].position;
      const mySubtract = subtract(position0);
      const forEachFunction = pilotInstance => {
        const { id, pilotKey, position: myPosition } = pilotInstance;
        const faction = Selector.factionValueByPilot(pilotKey);
        const shipKey = Selector.shipKeyByPilot(pilotKey);
        const image = factionShipToImage[`${faction.key}|${shipKey}`];
        const shipBase = Selector.shipBaseValueByShip(shipKey);
        const firingArcs = Selector.firingArcKeysByShip(shipKey);
        const primaryFiringArcKey = firingArcs.length > 0 ? firingArcs[0] : undefined;
        const auxiliaryFiringArcKey = firingArcs.length > 1 ? firingArcs[1] : undefined;

        ShipImage.draw(
          context,
          1.0,
          id,
          image,
          mySubtract(myPosition),
          shipBase,
          faction.color,
          primaryFiringArcKey,
          auxiliaryFiringArcKey
        );
      };
      R.forEach(forEachFunction, Object.values(pilotInstances));
    }
  }

  loadImages() {
    const { pilotInstances } = this.props;

    const reduceFunction1 = (accum, pilotInstance) => {
      const { pilotKey } = pilotInstance;
      const faction = Selector.factionValueByPilot(pilotKey);
      const shipKey = Selector.shipKeyByPilot(pilotKey);
      const factionShip = `${faction.key}|${shipKey}`;
      return accum.includes(factionShip) ? accum : R.append(factionShip, accum);
    };
    const factionShips = R.reduce(reduceFunction1, [], Object.values(pilotInstances));

    const reduceFunction2 = (accum, factionShip) => {
      const faction = Selector.faction(factionShip.split("|")[0]);
      const ship = Selector.ship(factionShip.split("|")[1]);
      const image = this.createShipIcon(faction, ship);
      return R.assoc(factionShip, image, accum);
    };
    const factionShipToImage = R.reduce(reduceFunction2, {}, factionShips);
    this.setState({ factionShipToImage });
  }

  paint() {
    const { activePilotId, pilotInstances, scale } = this.props;
    const activePilotInstance = pilotInstances[activePilotId];
    const faction = Selector.factionValueByPilot(activePilotInstance.pilotKey);
    const factionColor = faction.color;
    const position0 = activePilotInstance.position;
    const size = this.size();
    const canvas = document.getElementById("tacticalViewCanvas");
    const context = canvas.getContext("2d");

    context.save();
    context.clearRect(0, 0, 2 * size, 2 * size);
    context.scale(scale, scale);
    context.translate(SIZE, SIZE);
    context.rotate((270 - position0.heading) * DEG_TO_RADIANS);

    // Range discs.
    context.fillStyle = `${factionColor}30`;
    const forEachFunction = rangeKey => {
      const range = Selector.range(rangeKey);
      drawDisc(context, range.maxDistance);
    };
    R.forEach(forEachFunction, [Range.THREE, Range.TWO, Range.ONE]);

    // Solid lines.
    context.strokeStyle = "#FFFFFFC0";
    drawDiameter(context, 0);
    drawDiameter(context, 90);

    // Dotted lines.
    context.setLineDash([5, 4]);
    drawDiameter(context, 45);
    drawDiameter(context, 135);
    context.setLineDash([]);

    // Ships.
    this.drawShips(context);

    // Cleanup.
    context.restore();
  }

  size() {
    const { scale } = this.props;

    return scale * SIZE;
  }

  render() {
    const size = this.size();

    return ReactDOMFactories.canvas({
      id: "tacticalViewCanvas",
      width: 2 * size,
      height: 2 * size,
      style: { background: "black" }
    });
  }
}

const positionPropType = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  heading: PropTypes.number.isRequired
});

TacticalView.propTypes = {
  activePilotId: PropTypes.number.isRequired,
  pilotInstances: PropTypes.shape({
    id: PropTypes.number.isRequired,
    pilotKey: PropTypes.string.isRequired,
    position: positionPropType.isRequired
  }).isRequired,

  scale: PropTypes.number
};

TacticalView.defaultProps = {
  scale: 1.0
};

export default TacticalView;
