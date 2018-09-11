import GamePanelContainer from "./container/GamePanelContainer.js";

const { ActionCreator, Reducer } = XMS;

const XWingMiniaturesView = {};

XWingMiniaturesView.drawView = ({ gameState, document, resourceBase = "../resource/" }) => {
  const store = Redux.createStore(Reducer.root, gameState);

  const createContainer = () => {
    const playAreaZoom = (scale, zoomOutEnabled, zoomInEnabled) => () => {
      store.dispatch(ActionCreator.setPlayAreaScale(scale));
      store.dispatch(ActionCreator.setPlayAreaZoomOutEnabled(zoomOutEnabled));
      store.dispatch(ActionCreator.setPlayAreaZoomInEnabled(zoomInEnabled));
      createContainer();
    };

    const playAreaZoomIn = playAreaZoom(1.0, true, false);
    const playAreaZoomOut = playAreaZoom(0.104918033, false, true); // 96 px / 915 px

    const tacticalViewZoom = (scale, zoomOutEnabled, zoomInEnabled) => () => {
      store.dispatch(ActionCreator.setTacticalViewScale(scale));
      store.dispatch(ActionCreator.setTacticalViewZoomOutEnabled(zoomOutEnabled));
      store.dispatch(ActionCreator.setTacticalViewZoomInEnabled(zoomInEnabled));
      createContainer();
    };

    const tacticalViewZoomIn = tacticalViewZoom(1.0, true, false);
    const tacticalViewZoomOut = tacticalViewZoom(0.16, false, true); // 96 px / 600 px

    const container = GamePanelContainer(store.getState(), {
      playAreaZoomIn,
      playAreaZoomOut,
      resourceBase,
      tacticalViewZoomIn,
      tacticalViewZoomOut
    });

    ReactDOM.render(container, document.getElementById("panel"));
  };

  createContainer();
};

export default XWingMiniaturesView;
