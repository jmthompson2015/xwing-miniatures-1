import Endpoint from "../Endpoint.js";

import ShipImage from "./ShipImage.js";

const DEG_TO_RADIANS = Math.PI / 180.0;

const drawCircle = (context0, radius) => {
  const context = context0;
  context.beginPath();
  context.arc(0, 0, radius, 0, 2 * Math.PI);
  context.fill();
};

const drawLine = (context0, angle) => {
  const r = 300;
  const a = angle * DEG_TO_RADIANS;
  const context = context0;
  context.beginPath();
  context.moveTo(-r * Math.cos(a), -r * Math.sin(a));
  context.lineTo(r * Math.cos(a), r * Math.sin(a));
  context.stroke();
};

const subtract = (position1, position2) =>
  XMS.PositionState.create({
    x: position2.x - position1.x,
    y: position2.y - position1.y,
    heading: position2.heading
  });

// /////////////////////////////////////////////////////////////////////////////////////////////////
class TacticalView extends React.Component {
  constructor(props) {
    super(props);

    this.explosionImage = undefined;
    this.factionShipToImage = {};
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
    const { activePilotId, pilotInstances, pilotToPosition } = this.props;
    const position0 = pilotToPosition[activePilotId];

    Object.values(pilotInstances).forEach(pilotInstance => {
      const { id } = pilotInstance;
      const scale = 1.0;
      const faction = XMA.Selector.factionValueByPilot(pilotInstance.pilotKey);
      const shipKey = XMA.Selector.shipKeyByPilot(pilotInstance.pilotKey);
      const image = this.factionShipToImage[`${faction.key}|${shipKey}`];
      const position = subtract(position0, pilotToPosition[pilotInstance.id]);
      const shipBase = XMA.Selector.shipBaseValueByShip(shipKey);
      const factionColor = faction.color;
      const firingArcs = XMA.Selector.firingArcKeysByShip(shipKey);
      const primaryFiringArcKey = firingArcs.length > 0 ? firingArcs[0] : undefined;
      const auxiliaryFiringArcKey = firingArcs.length > 1 ? firingArcs[1] : undefined;

      ShipImage.draw(
        context,
        scale,
        id,
        image,
        position,
        shipBase,
        factionColor,
        primaryFiringArcKey,
        auxiliaryFiringArcKey
      );
    }, this);
  }

  loadImages() {
    const { pilotInstances } = this.props;
    const factionShips = [];

    Object.values(pilotInstances).forEach(pilotInstance => {
      const faction = XMA.Selector.factionValueByPilot(pilotInstance.pilotKey);
      const shipKey = XMA.Selector.shipKeyByPilot(pilotInstance.pilotKey);
      const factionShip = `${faction.key}|${shipKey}`;
      if (!factionShips.includes(factionShip)) {
        factionShips.push(factionShip);
      }
    });

    for (let i = 0; i < factionShips.length; i += 1) {
      const factionShip = factionShips[i];
      const faction = XMA.Selector.faction(factionShip.split("|")[0]);
      const ship = XMA.Selector.ship(factionShip.split("|")[1]);
      this.factionShipToImage[factionShip] = this.createShipIcon(faction, ship);
    }
  }

  paint() {
    const { activePilotId, pilotInstances, pilotToPosition, scale } = this.props;
    const activePilotInstance = pilotInstances[activePilotId];
    const faction = XMA.Selector.factionValueByPilot(activePilotInstance.pilotKey);
    const factionColor = faction.color;
    const position0 = pilotToPosition[activePilotId];
    const size = this.size();
    const canvas = document.getElementById("playAreaCanvas");
    const context = canvas.getContext("2d");

    context.save();
    context.clearRect(0, 0, 2 * size, 2 * size);
    context.scale(scale, scale);
    context.translate(300, 300);
    context.rotate((270 - position0.heading) * DEG_TO_RADIANS);
    context.fillStyle = `${factionColor}30`;
    drawCircle(context, 300);
    drawCircle(context, 200);
    drawCircle(context, 100);
    context.strokeStyle = "#FFFFFFC0";
    drawLine(context, 0);
    drawLine(context, 90);
    context.setLineDash([5, 4]);
    drawLine(context, 45);
    drawLine(context, 135);

    this.drawShips(context);

    // Cleanup.
    context.restore();
  }

  size() {
    const { scale } = this.props;

    return scale * 300;
  }

  render() {
    const size = this.size();

    return ReactDOMFactories.canvas({
      id: "playAreaCanvas",
      width: 2 * size,
      height: 2 * size,
      style: {
        background: "black"
      }
    });
  }
}

TacticalView.propTypes = {
  activePilotId: PropTypes.number.isRequired,
  pilotInstances: PropTypes.shape().isRequired,
  pilotToPosition: PropTypes.shape().isRequired,

  scale: PropTypes.number
};

TacticalView.defaultProps = {
  scale: 1.0
};

export default TacticalView;
