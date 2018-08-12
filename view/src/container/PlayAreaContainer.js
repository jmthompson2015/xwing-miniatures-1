import PlayAreaUI from "../component/PlayAreaUI.js";
import Selector from "../Selector.js";

const PlayAreaContainer = (gameState, ownProps = {}) =>
{
   const playFormat = Selector.playFormat(gameState);
   const image = "background/" + (playFormat.key === XMA.PlayFormat.STANDARD ? "pia13845.jpg" : "horsehead_nebula_02092008.jpg");
   const scale = (ownProps !== undefined ? ownProps.scale : 1.0);

   const pilotToPosition = R.reduce((accum, pilot) => R.assoc(pilot.id, pilot.position, accum),
   {}, Selector.pilotInstances(gameState));

   const displayExplosion = gameState.displayExplosion;
   const displayLaserBeam = gameState.displayLaserBeam;
   const displayManeuver = gameState.displayManeuver;

   const laserBeam = (displayLaserBeam !== undefined ? createLaserBeam(displayLaserBeam) : undefined);

   return React.createElement(PlayAreaUI,
   {
      height: playFormat.height,
      image: image,
      pilotInstances: gameState.pilotInstances,
      pilotToPosition: pilotToPosition,
      scale: scale,
      width: playFormat.width,

      explosion: displayExplosion,
      laserBeam: laserBeam,
      maneuver: displayManeuver,
      resourceBase: ownProps.resourceBase
   });
};

const createLaserBeam = laserBeamState =>
{
   // FIXME: choose audio clip by ship.
   const audioClip = document.getElementById("xWingLaserAudio");

   return R.merge(laserBeamState,
   {
      audioClip: audioClip
   });
};

export default PlayAreaContainer;