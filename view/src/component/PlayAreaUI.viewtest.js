import Selector from "../Selector.js";

import PlayAreaUI from "./PlayAreaUI.js";

const pilotInstance1 = {
   id: 1,
   pilotKey: "maulerMithel"
};
const pilotInstance2 = {
   id: 2,
   pilotKey: "darkCurse"
};
const pilotInstance3 = {
   id: 3,
   pilotKey: "lukeSkywalker"
};
const pilotInstances = {};
pilotInstances[1] = pilotInstance1;
pilotInstances[2] = pilotInstance2;
pilotInstances[3] = pilotInstance3;
const position1 = {
   x: 305 + 78,
   y: 120,
   heading: 360 - 45
};
const position2 = {
   x: 610,
   y: 20,
   heading: 90
};
const position3 = {
   x: 458,
   y: 915 - 20,
   heading: 270
};
const pilotToPosition = {};
pilotToPosition[1] = position1;
pilotToPosition[2] = position2;
pilotToPosition[3] = position3;
const scale = 0.75;
const rebelAlliance = Selector.faction(XMA.Faction.REBEL_ALLIANCE);
const explosionPosition = {
   x: 400,
   y: 400,
   heading: 0
};

const maneuver = Selector.maneuver(XMA.Maneuver.TURN_LEFT_1_STANDARD_1TW);
const maneuverFromPosition = {
   x: 305,
   y: 120,
   heading: 45
};
const maneuverShipBase = Selector.shipBase(XMA.ShipBase.SMALL);

const element = React.createElement(PlayAreaUI,
{
   scale: scale,
   width: scale * 915,
   height: scale * 915,
   image: "background/pia13845.jpg",
   pilotInstances: pilotInstances,
   pilotToPosition: pilotToPosition,
   explosion: XMS.ExplosionState.create(
   {
      position: explosionPosition
   }),
   laserBeam: R.merge(XMS.LaserBeamState.create(
   {
      fromPosition: position3,
      toPosition: position2,
      color: rebelAlliance.color
   }),
   {
      audioClip: document.getElementById("xWingLaserAudio"),
   }),
   maneuver: XMS.ManeuverState.create(
   {
      color: PlayAreaUI.HARD_COLOR,
      fromPolygon: XMM.ManeuverComputer.computeFromPolygon(maneuverFromPosition, maneuverShipBase),
      fromPosition: maneuverFromPosition,
      path: XMM.ManeuverComputer.computePath(maneuver, maneuverFromPosition, maneuverShipBase),
      toPolygon: XMM.ManeuverComputer.computeToPolygon(maneuver, maneuverFromPosition, maneuverShipBase)
   }),
});
ReactDOM.render(element, document.getElementById("panel"));