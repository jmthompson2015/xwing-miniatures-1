import TacticalView from "./TacticalView.js";

const { PilotCard } = XMA;
const { PilotState, PositionState } = XMS;

const activePilotId = 1;
const scale = 1.0;

const position1 = PositionState.create({ x: 400, y: 400, heading: 0 });
const position2 = PositionState.create({ x: 500, y: 400, heading: 180 });
const position3 = PositionState.create({ x: 400, y: 600, heading: 270 });
const position4 = PositionState.create({ x: 100, y: 400, heading: 0 });

const pilotInstances = {
  1: PilotState.create({ id: 1, pilotKey: PilotCard.LUKE_SKYWALKER, position: position1 }),
  2: PilotState.create({ id: 2, pilotKey: PilotCard.MAULER_MITHEL, position: position2 }),
  3: PilotState.create({ id: 3, pilotKey: PilotCard.BOSSK, position: position3 }),
  4: PilotState.create({ id: 4, pilotKey: PilotCard.DARK_CURSE, position: position4 })
};

const element = React.createElement(TacticalView, {
  activePilotId,
  pilotInstances,
  scale
});
ReactDOM.render(element, document.getElementById("panel"));
