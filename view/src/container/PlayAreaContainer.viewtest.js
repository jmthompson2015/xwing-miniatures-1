import Selector from "../Selector.js";
import TestData from "../TestData.js";

import PlayAreaContainer from "./PlayAreaContainer.js";

let gameState = TestData.createGameState();
const position1 = {
   x: 305 + 78,
   y: 120,
   heading: 360 - 45
};
gameState = R.assocPath(["pilotInstances", 1, "position"], position1, gameState);
const position2 = Selector.positionByPilot(2, gameState);
const position3 = Selector.positionByPilot(3, gameState);

const explosion = XMS.ExplosionState.create(
{
   position: XMS.PositionState.create(
   {
      x: 400,
      y: 400,
      heading: 0
   })
});
gameState = R.assoc("displayExplosion", explosion, gameState);

const laserBeam = XMS.LaserBeamState.create(
{
   color: "red",
   fromPosition: position3,
   toPosition: position2
});
gameState = R.assoc("displayLaserBeam", laserBeam, gameState);

const maneuver0 = Selector.maneuver(XMA.Maneuver.TURN_LEFT_1_EASY_1TG);
const maneuverFromPosition = {
   x: 305,
   y: 120,
   heading: 45
};
const maneuverShipBase = Selector.shipBase(XMA.ShipBase.SMALL);
const maneuver = XMS.ManeuverState.create(
{
   color: "rgb(0, 255, 0)",
   fromPolygon: XMM.ManeuverComputer.computeFromPolygon(maneuverFromPosition, maneuverShipBase),
   fromPosition: maneuverFromPosition,
   path: XMM.ManeuverComputer.computePath(maneuver0, maneuverFromPosition, maneuverShipBase),
   toPolygon: XMM.ManeuverComputer.computeToPolygon(maneuver0, maneuverFromPosition, maneuverShipBase)
});
gameState = R.assoc("displayManeuver", maneuver, gameState);

const container = PlayAreaContainer(gameState);

ReactDOM.render(container, document.getElementById("panel"));