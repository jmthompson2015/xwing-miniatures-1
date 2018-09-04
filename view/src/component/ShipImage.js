import Selector from "../Selector.js";

const ShipImage = {};

const DEG_TO_RADIANS = Math.PI / 180.0;

ShipImage.draw = (
  context0,
  scale,
  id,
  image,
  position,
  shipBase,
  factionColor,
  primaryFiringArcKey,
  auxiliaryFiringArcKey
) => {
  // Setup.
  const { height, width } = shipBase;
  const { x, y, heading } = position;
  const angle = heading * DEG_TO_RADIANS;
  const primaryFiringArc = Selector.firingArc(primaryFiringArcKey);
  const auxiliaryFiringArc = Selector.firingArc(auxiliaryFiringArcKey);

  const context = context0;
  context.save();
  context.scale(scale, scale);
  context.translate(x, y);
  context.rotate(angle);

  // Draw background square.
  context.fillStyle = "rgba(255,255,255,0.4)";
  context.fillRect(-width / 2, -height / 2, width, height);
  context.fillStyle = "rgba(255,255,255,0.2)";
  context.strokeStyle = factionColor;

  // Draw the auxiliary firing arc.
  if (auxiliaryFiringArc) {
    context.setLineDash([5, 4]);
    ShipImage.drawFiringArc(context, auxiliaryFiringArc.key, width, height);
    context.setLineDash([]);
  }

  // Draw the primary firing arc.
  if (primaryFiringArc) {
    ShipImage.drawFiringArc(context, primaryFiringArc.key, width, height);
  }

  // Draw ship image.
  let myWidth = width;
  let myHeight = height;

  if ([XMA.ShipBase.SMALL, XMA.ShipBase.LARGE].includes(shipBase.key)) {
    if (image.width < image.height) {
      myWidth = (width * image.width) / image.height;
    } else if (image.width > image.height) {
      myHeight = (height * image.height) / image.width;
    }
  }

  context.drawImage(image, -myWidth / 2, -myHeight / 2, myWidth, myHeight);

  if (id !== undefined) {
    // Draw the token ID.
    context.rotate(90 * DEG_TO_RADIANS);
    context.fillStyle = factionColor;
    context.font = "14px sans-serif";
    context.fillText(id, -height / 2, width / 2);
    context.rotate(-90 * DEG_TO_RADIANS);
  }

  // Cleanup.
  context.restore();
};

ShipImage.drawFiringArc = (context, firingArcKey, width, height) => {
  // Draw the firing arc.
  switch (firingArcKey) {
    case XMA.FiringArc.AUXILIARY_180:
      context.beginPath();
      context.moveTo(0, -height / 2);
      context.lineTo(0, 0);
      context.lineTo(0, height / 2);
      context.stroke();
      context.lineTo(width / 2, height / 2);
      context.lineTo(width / 2, -height / 2);
      context.fill();
      break;
    case XMA.FiringArc.AUXILIARY_REAR:
      context.beginPath();
      context.moveTo(-width / 2, -height / 2);
      context.lineTo(0, 0);
      context.lineTo(-width / 2, height / 2);
      context.fill();
      context.stroke();
      break;
    case XMA.FiringArc.BULLSEYE:
      context.beginPath();
      context.moveTo(8, -8);
      context.lineTo(width / 2, -8);
      context.moveTo(width / 2, 8);
      context.lineTo(8, 8);
      context.fill();
      context.stroke();
      break;
    case XMA.FiringArc.FRONT:
      context.beginPath();
      context.moveTo(width / 2, -height / 2);
      context.lineTo(0, 0);
      context.lineTo(width / 2, height / 2);
      context.fill();
      context.stroke();
      break;
    case XMA.FiringArc.MOBILE:
    case XMA.FiringArc.TURRET:
      break;
    default:
      throw new Error(`Unknown firingArc: ${firingArcKey}`);
  }
};

export default ShipImage;
