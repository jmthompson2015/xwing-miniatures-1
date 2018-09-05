import TacticalView from "./TacticalView.js";

const { PilotCard } = XMA;
const { PilotState, PositionState } = XMS;

const activePilotId = 1;
const scale = 1.0;

const pilotInstances = {};
pilotInstances[1] = PilotState.create({ id: 1, pilotKey: PilotCard.LUKE_SKYWALKER });
pilotInstances[2] = PilotState.create({ id: 2, pilotKey: PilotCard.MAULER_MITHEL });
pilotInstances[3] = PilotState.create({ id: 3, pilotKey: PilotCard.BOSSK });
pilotInstances[4] = PilotState.create({ id: 4, pilotKey: PilotCard.DARK_CURSE });

const pilotToPosition = {};
pilotToPosition[1] = PositionState.create({ x: 400, y: 400, heading: 0 });
pilotToPosition[2] = PositionState.create({ x: 500, y: 400, heading: 180 });
pilotToPosition[3] = PositionState.create({ x: 400, y: 600, heading: 270 });
pilotToPosition[4] = PositionState.create({ x: 100, y: 400, heading: 0 });

const element = React.createElement(TacticalView, {
  activePilotId,
  scale,
  width: scale * 600,
  height: scale * 600,
  pilotInstances,
  pilotToPosition
});
ReactDOM.render(element, document.getElementById("panel"));
