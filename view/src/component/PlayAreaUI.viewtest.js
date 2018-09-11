import PlayAreaUI from "./PlayAreaUI.js";

const { Faction, Maneuver, PilotCard, Selector, ShipBase } = XMA;
const { ExplosionState, LaserBeamState, ManeuverState, PilotState, PositionState } = XMS;
const { ManeuverComputer } = XMM;

const position1 = PositionState.create({ x: 305 + 78, y: 120, heading: 360 - 45 });
const position2 = PositionState.create({ x: 610, y: 20, heading: 90 });
const position3 = PositionState.create({ x: 458, y: 915 - 20, heading: 270 });

const pilotInstances = {
  1: PilotState.create({ id: 1, pilotKey: PilotCard.MAULER_MITHEL, position: position1 }),
  2: PilotState.create({ id: 2, pilotKey: PilotCard.DARK_CURSE, position: position2 }),
  3: PilotState.create({ id: 3, pilotKey: PilotCard.LUKE_SKYWALKER, position: position3 })
};

const maneuver = Selector.maneuver(Maneuver.TURN_LEFT_1_STANDARD_1TW);
const maneuverFromPosition = PositionState.create({ x: 305, y: 120, heading: 45 });
const maneuverShipBase = Selector.shipBase(ShipBase.SMALL);

const element = React.createElement(PlayAreaUI, {
  scale: 0.75,
  image: "background/pia13845.jpg",
  pilotInstances,

  explosion: ExplosionState.create({ position: PositionState.create({ x: 400, y: 400 }) }),
  laserBeam: R.merge(
    LaserBeamState.create({
      fromPosition: position3,
      toPosition: position2,
      color: Selector.faction(Faction.REBEL_ALLIANCE).color
    }),
    { audioClip: document.getElementById("xWingLaserAudio") }
  ),
  maneuver: ManeuverState.create({
    color: PlayAreaUI.HARD_COLOR,
    fromPolygon: ManeuverComputer.computeFromPolygon(maneuverFromPosition, maneuverShipBase),
    fromPosition: maneuverFromPosition,
    path: ManeuverComputer.computePath(maneuver, maneuverFromPosition, maneuverShipBase),
    toPolygon: ManeuverComputer.computeToPolygon(maneuver, maneuverFromPosition, maneuverShipBase)
  })
});
ReactDOM.render(element, document.getElementById("panel"));
