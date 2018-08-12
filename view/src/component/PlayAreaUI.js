import Endpoint from "../Endpoint.js";
import Selector from "../Selector.js";

import ShipImage from "./ShipImage.js";

class PlayAreaUI extends React.Component
{
   constructor(props)
   {
      super(props);

      this.explosionImage = undefined;
      this.factionShipToImage = {};
   }

   componentDidMount()
   {
      this.loadImages();
      this.paint();
   }

   componentDidUpdate()
   {
      this.paint();
   }

   render()
   {
      const imageSrc = this.props.resourceBase + this.props.image;

      return ReactDOMFactories.canvas(
      {
         id: "playAreaCanvas",
         style:
         {
            backgroundImage: "url(" + imageSrc + ")",
            backgroundSize: "100%",
         },
         width: this.props.width,
         height: this.props.height,
      });
   }
}

PlayAreaUI.prototype.createExplosionImage = function()
{
   const image = new Image();
   image.src = Endpoint.ARTIFACT_RESOURCE + "ship/explosion.png";

   return image;
};

PlayAreaUI.prototype.createShipIcon = function(faction, ship)
{
   const image = new Image();
   image.onload = function()
   {
      this.forceUpdate();
   }.bind(this);

   const index = ship.faction.indexOf(faction.name);
   const filename = ship.images[index];
   image.src = Endpoint.ARTIFACT_RESOURCE + filename;

   return image;
};

PlayAreaUI.prototype.drawExplosion = function(context)
{
   const explosion = this.props.explosion;

   if (explosion)
   {
      const position = explosion.position;
      const size = explosion.size;
      const audioClip = document.getElementById("explosionAudio");

      const x = position.x;
      const y = position.y;
      const width = size;
      const height = size;

      context.save();
      context.scale(this.props.scale, this.props.scale);
      context.translate(x, y);
      context.drawImage(this.explosionImage, -width / 2, -height / 2, width, height);

      audioClip.play();

      // Cleanup.
      context.restore();
   }
};

PlayAreaUI.prototype.drawLaserBeam = function(context)
{
   const laserBeam = this.props.laserBeam;

   if (laserBeam)
   {
      const audioClip = laserBeam.audioClip;
      const color = laserBeam.color;
      const fromPosition = laserBeam.fromPosition;
      const isPrimary = laserBeam.isPrimary;
      const toPosition = laserBeam.toPosition;

      context.save();
      context.scale(this.props.scale, this.props.scale);
      context.lineWidth = 3;
      context.strokeStyle = color;

      if (!isPrimary)
      {
         const lineDashSegments = [10, 5];
         context.setLineDash(lineDashSegments);
      }

      context.beginPath();
      context.moveTo(fromPosition.x, fromPosition.y);
      context.lineTo(toPosition.x, toPosition.y);
      context.stroke();

      if (audioClip)
      {
         audioClip.play();
      }

      // Cleanup.
      context.restore();
   }
};

PlayAreaUI.FOREGROUND_COLOR = "white";
PlayAreaUI.EASY_COLOR = "lime";
PlayAreaUI.HARD_COLOR = "red";

PlayAreaUI.prototype.drawManeuver = function(context)
{
   const maneuverObj = this.props.maneuver;

   if (maneuverObj)
   {
      const color = maneuverObj.color;
      const fromPosition = maneuverObj.fromPosition;
      const toPolygon = maneuverObj.toPolygon;

      context.save();
      context.scale(this.props.scale, this.props.scale);

      // Mark the center.
      context.fillStyle = PlayAreaUI.FOREGROUND_COLOR;
      const radius = 4;
      context.beginPath();
      context.arc(fromPosition.x, fromPosition.y, radius, 0, 2 * Math.PI);
      context.fill();

      // Draw from ship base.
      paintPathComponent(maneuverObj.fromPolygon, context, PlayAreaUI.FOREGROUND_COLOR);

      if (toPolygon)
      {
         // Draw to ship base.
         paintPathComponent(toPolygon, context, PlayAreaUI.FOREGROUND_COLOR);
      }

      // Draw maneuver path.
      paintPathComponent(maneuverObj.path, context, color);

      // Cleanup.
      context.restore();
   }
};

PlayAreaUI.prototype.drawShips = function(context)
{
   const scale = this.props.scale;
   const pilotInstances = this.props.pilotInstances;
   const pilotToPosition = this.props.pilotToPosition;

   Object.values(pilotInstances).forEach(pilotInstance =>
   {
      const id = pilotInstance.id;
      const faction = Selector.factionValueByPilot(pilotInstance.pilotKey);
      const shipKey = Selector.shipKeyByPilot(pilotInstance.pilotKey);
      const image = this.factionShipToImage[faction.key + "|" + shipKey];
      const position = pilotToPosition[pilotInstance.id];
      const shipBase = Selector.shipBaseValueByShip(shipKey);
      const factionColor = faction.color;
      const firingArcs = Selector.firingArcKeysByShip(shipKey);
      const primaryFiringArcKey = (firingArcs.length > 0 ? firingArcs[0] : undefined);
      const auxiliaryFiringArcKey = (firingArcs.length > 1 ? firingArcs[1] : undefined);

      ShipImage.draw(context, scale, id, image, position, shipBase, factionColor, primaryFiringArcKey, auxiliaryFiringArcKey);
   }, this);
};

PlayAreaUI.prototype.loadImages = function()
{
   const pilotInstances = this.props.pilotInstances;
   const factionShips = [];

   Object.values(pilotInstances).forEach(pilotInstance =>
   {
      const faction = Selector.factionValueByPilot(pilotInstance.pilotKey);
      const shipKey = Selector.shipKeyByPilot(pilotInstance.pilotKey);
      const factionShip = faction.key + "|" + shipKey;
      if (!factionShips.includes(factionShip))
      {
         factionShips.push(factionShip);
      }
   });

   for (let i = 0; i < factionShips.length; i++)
   {
      const factionShip = factionShips[i];
      const faction = Selector.faction(factionShip.split("|")[0]);
      const ship = Selector.ship(factionShip.split("|")[1]);
      this.factionShipToImage[factionShip] = this.createShipIcon(faction, ship);
   }

   this.explosionImage = this.createExplosionImage();
};

PlayAreaUI.prototype.paint = function()
{
   const canvas = document.getElementById("playAreaCanvas");
   const context = canvas.getContext("2d");

   context.clearRect(0, 0, this.props.width, this.props.height);

   this.drawShips(context);
   this.drawManeuver(context);
   this.drawLaserBeam(context);
   this.drawExplosion(context);
};

const paintPathComponent = function(path, context, strokeStyle)
{
   if (path.length >= 2)
   {
      context.beginPath();
      context.moveTo(path[0], path[1]);

      for (let i = 2; i < path.length; i += 2)
      {
         context.lineTo(path[i], path[i + 1]);
      }

      context.strokeStyle = strokeStyle;
      context.stroke();
   }
};

PlayAreaUI.propTypes = {
   pilotInstances: PropTypes.object.isRequired,
   pilotToPosition: PropTypes.object.isRequired,

   height: PropTypes.number,
   image: PropTypes.string,
   resourceBase: PropTypes.string,
   scale: PropTypes.number,
   width: PropTypes.number,

   explosion: PropTypes.object,
   laserBeam: PropTypes.object,
   maneuver: PropTypes.object
};

PlayAreaUI.defaultProps = {
   height: 915,
   image: "background/pia13845.jpg",
   resourceBase: Endpoint.LOCAL_RESOURCE,
   scale: 1.0,
   width: 915
};

export default PlayAreaUI;