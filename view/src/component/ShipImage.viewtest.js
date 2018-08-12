import Endpoint from "../Endpoint.js";
import Selector from "../Selector.js";

import ShipImage from "./ShipImage.js";

const galacticEmpire = Selector.faction(XMA.Faction.GALACTIC_EMPIRE);
const rebelAlliance = Selector.faction(XMA.Faction.REBEL_ALLIANCE);
const scumAndVillainy = Selector.faction(XMA.Faction.SCUM_AND_VILLAINY);
const firstOrder = Selector.faction(XMA.Faction.FIRST_ORDER);
const shipBaseSmall = Selector.shipBase(XMA.ShipBase.SMALL);
const shipBaseLarge = Selector.shipBase(XMA.ShipBase.LARGE);
let id = 1;

drawShip("firesprayCanvas", id++, "firespray-31.png", shipBaseLarge, galacticEmpire, XMA.FiringArc.FRONT, XMA.FiringArc.AUXILIARY_REAR);
drawShip("tieDefenderCanvas", id++, "tie-defender-v2.png", shipBaseSmall, galacticEmpire, XMA.FiringArc.FRONT);

drawShip("arc170Canvas", id++, "arc-170.png", shipBaseSmall, rebelAlliance, XMA.FiringArc.FRONT, XMA.FiringArc.AUXILIARY_REAR);
drawShip("vcx100Canvas", id++, "vcx-100.png", shipBaseLarge, rebelAlliance, XMA.FiringArc.FRONT, XMA.FiringArc.AUXILIARY_REAR);

drawShip("firespray2Canvas", id++, "firespray-31.png", shipBaseLarge, scumAndVillainy, XMA.FiringArc.FRONT, XMA.FiringArc.AUXILIARY_REAR);
drawShip("yv666Canvas", id++, "yv-666.png", shipBaseLarge, scumAndVillainy, XMA.FiringArc.FRONT, XMA.FiringArc.AUXILIARY_180);

drawShip("tieSfFighterCanvas", id++, "tie-sf-fighter.png", shipBaseSmall, firstOrder, XMA.FiringArc.FRONT, XMA.FiringArc.AUXILIARY_REAR);

function drawShip(elementId, id, shipImage, shipBase, faction, primaryFiringArcKey, auxiliaryFiringArcKey)
{
   const canvas = document.getElementById(elementId);
   const context = canvas.getContext("2d");
   const scale = 1.0;
   const position = {
      x: 50,
      y: 50,
      heading: 0
   };
   const factionName = faction.name.toLowerCase().replace(/ /g, "-");
   const factionColor = faction.color;
   const image = new Image();
   image.onload = function()
   {
      ShipImage.draw(context, scale, id, image, position, shipBase, factionColor, primaryFiringArcKey, auxiliaryFiringArcKey);
   };
   image.src = Endpoint.ARTIFACT_RESOURCE + "ship/" + factionName + "/" + shipImage;
}