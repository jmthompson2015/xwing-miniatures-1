import TestData from "../TestData.js";

import GamePanelContainer from "./GamePanelContainer.js";

const { ActionCreator } = XMS;

const store = TestData.createStore();

const createContainer = () => {
  const playAreaZoomIn = () => {
    store.dispatch(ActionCreator.setPlayAreaScale(1.0));
    store.dispatch(ActionCreator.setPlayAreaZoomInEnabled(false));
    store.dispatch(ActionCreator.setPlayAreaZoomOutEnabled(true));
    createContainer();
  };

  const playAreaZoomOut = () => {
    store.dispatch(ActionCreator.setPlayAreaScale(0.052)); // 48 px / 915 px
    store.dispatch(ActionCreator.setPlayAreaZoomInEnabled(true));
    store.dispatch(ActionCreator.setPlayAreaZoomOutEnabled(false));
    createContainer();
  };

  const tacticalViewZoomIn = () => {
    store.dispatch(ActionCreator.setTacticalViewScale(1.0));
    store.dispatch(ActionCreator.setTacticalViewZoomInEnabled(false));
    store.dispatch(ActionCreator.setTacticalViewZoomOutEnabled(true));
    createContainer();
  };

  const tacticalViewZoomOut = () => {
    store.dispatch(ActionCreator.setTacticalViewScale(0.08)); // 48 px / 600 px
    store.dispatch(ActionCreator.setTacticalViewZoomInEnabled(true));
    store.dispatch(ActionCreator.setTacticalViewZoomOutEnabled(false));
    createContainer();
  };

  const container = GamePanelContainer(store.getState(), {
    playAreaZoomIn,
    playAreaZoomOut,
    tacticalViewZoomIn,
    tacticalViewZoomOut
  });

  ReactDOM.render(container, document.getElementById("panel"));
};

createContainer();
