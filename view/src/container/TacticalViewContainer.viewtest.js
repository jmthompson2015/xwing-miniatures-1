import TestData from "../TestData.js";

import TacticalViewContainer from "./TacticalViewContainer.js";

const { ActionCreator, PositionState } = XMS;

const position1 = PositionState.create({ x: 500, y: 400, heading: 180 });
const position2 = PositionState.create({ x: 400, y: 600, heading: 270 });
const position3 = PositionState.create({ x: 400, y: 400 });

const store = TestData.createStore();

store.dispatch(ActionCreator.movePilot(1, position1));
store.dispatch(ActionCreator.movePilot(2, position2));
store.dispatch(ActionCreator.movePilot(3, position3));
store.dispatch(ActionCreator.setActivePilotId(3));

const container = TacticalViewContainer(store.getState());

ReactDOM.render(container, document.getElementById("panel"));
