const PlayAreaState = {};

PlayAreaState.create = ({ scale = 1.0, zoomInEnabled = false, zoomOutEnabled = true } = {}) =>
  Immutable({ scale, zoomInEnabled, zoomOutEnabled });

Object.freeze(PlayAreaState);

export default PlayAreaState;
