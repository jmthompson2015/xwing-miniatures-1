import PlayAreaUI from "../component/PlayAreaUI.js";
import Selector from "../Selector.js";

const createLaserBeam = laserBeamState => {
  // FIXME: choose audio clip by ship.
  const audioClip = document.getElementById("xWingLaserAudio");

  return R.merge(laserBeamState, {
    audioClip
  });
};

const PlayAreaContainer = (gameState, ownProps = {}) => {
  const playFormat = Selector.playFormat(gameState);
  const image = `background/${
    playFormat.key === XMA.PlayFormat.STANDARD ? "pia13845.jpg" : "horsehead_nebula_02092008.jpg"
  }`;
  const scale = ownProps !== undefined ? ownProps.scale : 1.0;

  const pilotToPosition = R.reduce(
    (accum, pilot) => R.assoc(pilot.id, pilot.position, accum),
    {},
    Selector.pilotInstances(gameState)
  );

  const { displayExplosion, displayLaserBeam, displayManeuver } = gameState;

  const laserBeam = displayLaserBeam !== undefined ? createLaserBeam(displayLaserBeam) : undefined;

  return React.createElement(PlayAreaUI, {
    height: playFormat.height,
    image,
    pilotInstances: gameState.pilotInstances,
    pilotToPosition,
    scale,
    width: playFormat.width,

    explosion: displayExplosion,
    laserBeam,
    maneuver: displayManeuver,
    resourceBase: ownProps.resourceBase
  });
};

export default PlayAreaContainer;
