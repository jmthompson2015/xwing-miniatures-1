const TacticalViewState = {};

TacticalViewState.create = ({ scale = 1.0, zoomInEnabled = false, zoomOutEnabled = true } = {}) =>
  Immutable({ scale, zoomInEnabled, zoomOutEnabled });

Object.freeze(TacticalViewState);

export default TacticalViewState;
