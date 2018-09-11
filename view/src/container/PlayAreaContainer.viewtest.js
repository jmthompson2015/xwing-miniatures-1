import TestData from "../TestData.js";

import PlayAreaContainer from "./PlayAreaContainer.js";

const { ActionCreator, ExplosionState, LaserBeamState, ManeuverState, PositionState } = XMS;

const store = TestData.createStore();

const position1 = { x: 305 + 78, y: 120, heading: 360 - 45 };
store.dispatch(ActionCreator.movePilot(1, position1));

const position2 = XMS.Selector.positionByPilot(2, store.getState());
const position3 = XMS.Selector.positionByPilot(3, store.getState());

const explosion = ExplosionState.create({
  position: PositionState.create({
    x: 400,
    y: 400,
    heading: 0
  })
});
store.dispatch(ActionCreator.setDisplayExplosion(explosion));

const laserBeam = LaserBeamState.create({
  color: "red",
  fromPosition: position3,
  toPosition: position2
});
store.dispatch(ActionCreator.setDisplayLaserBeam(laserBeam));

const maneuver0 = XMA.Selector.maneuver(XMA.Maneuver.TURN_LEFT_1_EASY_1TG);
const maneuverFromPosition = {
  x: 305,
  y: 120,
  heading: 45
};
const maneuverShipBase = XMA.Selector.shipBase(XMA.ShipBase.SMALL);
const maneuver = ManeuverState.create({
  color: "rgb(0, 255, 0)",
  fromPolygon: XMM.ManeuverComputer.computeFromPolygon(maneuverFromPosition, maneuverShipBase),
  fromPosition: maneuverFromPosition,
  path: XMM.ManeuverComputer.computePath(maneuver0, maneuverFromPosition, maneuverShipBase),
  toPolygon: XMM.ManeuverComputer.computeToPolygon(
    maneuver0,
    maneuverFromPosition,
    maneuverShipBase
  )
});
store.dispatch(ActionCreator.setDisplayManeuver(maneuver));

const container = PlayAreaContainer(store.getState());

ReactDOM.render(container, document.getElementById("panel"));
