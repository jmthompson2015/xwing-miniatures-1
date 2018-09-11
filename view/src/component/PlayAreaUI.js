import Endpoint from "../Endpoint.js";
import Selector from "../Selector.js";

import ShipImage from "./ShipImage.js";

const paintPathComponent = (path, context0, strokeStyle) => {
  if (path.length >= 2) {
    const context = context0;
    context.beginPath();
    context.moveTo(path[0], path[1]);

    for (let i = 2; i < path.length; i += 2) {
      context.lineTo(path[i], path[i + 1]);
    }

    context.strokeStyle = strokeStyle;
    context.stroke();
  }
};

class PlayAreaUI extends React.Component {
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

  drawExplosion(context) {
    const { explosion, scale } = this.props;

    if (explosion) {
      const { position, size } = explosion;
      const audioClip = document.getElementById("explosionAudio");

      const { x, y } = position;
      const width = size;
      const height = size;

      context.save();
      context.scale(scale, scale);
      context.translate(x, y);
      context.drawImage(this.explosionImage, -width / 2, -height / 2, width, height);

      audioClip.play();

      // Cleanup.
      context.restore();
    }
  }

  drawLaserBeam(context0) {
    const { laserBeam, scale } = this.props;

    if (laserBeam) {
      const { audioClip, color, fromPosition, isPrimary, toPosition } = laserBeam;

      const context = context0;
      context.save();
      context.scale(scale, scale);
      context.lineWidth = 3;
      context.strokeStyle = color;

      if (!isPrimary) {
        const lineDashSegments = [10, 5];
        context.setLineDash(lineDashSegments);
      }

      context.beginPath();
      context.moveTo(fromPosition.x, fromPosition.y);
      context.lineTo(toPosition.x, toPosition.y);
      context.stroke();

      if (audioClip) {
        audioClip.play();
      }

      // Cleanup.
      context.restore();
    }
  }

  drawManeuver(context0) {
    const { maneuver: maneuverObj, scale } = this.props;

    if (maneuverObj) {
      const { color, fromPosition, toPolygon } = maneuverObj;

      const context = context0;
      context.save();
      context.scale(scale, scale);

      // Mark the center.
      context.fillStyle = PlayAreaUI.FOREGROUND_COLOR;
      const radius = 4;
      context.beginPath();
      context.arc(fromPosition.x, fromPosition.y, radius, 0, 2 * Math.PI);
      context.fill();

      // Draw from ship base.
      paintPathComponent(maneuverObj.fromPolygon, context, PlayAreaUI.FOREGROUND_COLOR);

      if (toPolygon) {
        // Draw to ship base.
        paintPathComponent(toPolygon, context, PlayAreaUI.FOREGROUND_COLOR);
      }

      // Draw maneuver path.
      paintPathComponent(maneuverObj.path, context, color);

      // Cleanup.
      context.restore();
    }
  }

  drawShips(context) {
    const { pilotInstances, scale } = this.props;

    Object.values(pilotInstances).forEach(instance => {
      const { id, pilotKey, position } = instance;
      const faction = Selector.factionValueByPilot(pilotKey);
      const shipKey = Selector.shipKeyByPilot(pilotKey);
      const image = this.factionShipToImage[`${faction.key}|${shipKey}`];
      const shipBase = Selector.shipBaseValueByShip(shipKey);
      const factionColor = faction.color;
      const firingArcs = Selector.firingArcKeysByShip(shipKey);
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

    Object.values(pilotInstances).forEach(instance => {
      const { pilotKey } = instance;
      const faction = Selector.factionValueByPilot(pilotKey);
      const shipKey = Selector.shipKeyByPilot(pilotKey);
      const factionShip = `${faction.key}|${shipKey}`;
      if (!factionShips.includes(factionShip)) {
        factionShips.push(factionShip);
      }
    });

    for (let i = 0; i < factionShips.length; i += 1) {
      const factionShip = factionShips[i];
      const faction = Selector.faction(factionShip.split("|")[0]);
      const ship = Selector.ship(factionShip.split("|")[1]);
      this.factionShipToImage[factionShip] = this.createShipIcon(faction, ship);
    }

    this.explosionImage = this.createExplosionImage();
  }

  paint() {
    const height = this.height();
    const width = this.width();
    const canvas = document.getElementById("playAreaCanvas");
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, width, height);

    this.drawShips(context);
    this.drawManeuver(context);
    this.drawLaserBeam(context);
    this.drawExplosion(context);
  }

  height() {
    const { scale } = this.props;

    return scale * 915;
  }

  width() {
    const { playFormatKey, scale } = this.props;

    return scale * (playFormatKey === "standard" ? 915 : 1830);
  }

  render() {
    const { image, resourceBase } = this.props;
    const imageSrc = resourceBase + image;
    const height = this.height();
    const width = this.width();

    return ReactDOMFactories.canvas({
      id: "playAreaCanvas",
      style: {
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: "100%"
      },
      width,
      height
    });
  }
}

PlayAreaUI.prototype.createExplosionImage = () => {
  const image = new Image();
  image.src = `${Endpoint.ARTIFACT_RESOURCE}ship/explosion.png`;

  return image;
};

PlayAreaUI.FOREGROUND_COLOR = "white";
PlayAreaUI.EASY_COLOR = "lime";
PlayAreaUI.HARD_COLOR = "red";

PlayAreaUI.propTypes = {
  pilotInstances: PropTypes.shape().isRequired,

  image: PropTypes.string,
  playFormatKey: PropTypes.string,
  resourceBase: PropTypes.string,
  scale: PropTypes.number,

  explosion: PropTypes.shape(),
  laserBeam: PropTypes.shape(),
  maneuver: PropTypes.shape()
};

PlayAreaUI.defaultProps = {
  image: "background/pia13845.jpg",
  playFormatKey: "standard",
  resourceBase: Endpoint.LOCAL_RESOURCE,
  scale: 1.0,

  explosion: undefined,
  laserBeam: undefined,
  maneuver: undefined
};

export default PlayAreaUI;
