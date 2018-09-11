import PlayAreaUI from "../component/PlayAreaUI.js";

const createLaserBeam = laserBeamState => {
  // FIXME: choose audio clip by ship.
  const audioClip = document.getElementById("xWingLaserAudio");

  return R.merge(laserBeamState, {
    audioClip
  });
};

const PlayAreaContainer = (gameState, ownProps = {}) => {
  const {
    displayExplosion,
    displayLaserBeam,
    displayManeuver,
    pilotInstances,
    playAreaScale,
    playFormatKey
  } = gameState;
  const { resourceBase } = ownProps;

  const image = `background/${
    playFormatKey === XMA.PlayFormat.STANDARD ? "pia13845.jpg" : "horsehead_nebula_02092008.jpg"
  }`;
  const laserBeam = displayLaserBeam !== undefined ? createLaserBeam(displayLaserBeam) : undefined;

  return React.createElement(PlayAreaUI, {
    image,
    pilotInstances,
    playFormatKey,
    resourceBase,
    scale: playAreaScale,

    explosion: displayExplosion,
    laserBeam,
    maneuver: displayManeuver
  });
};

export default PlayAreaContainer;
