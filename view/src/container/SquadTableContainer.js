import SquadTable from "../component/SquadTable.js";

const { Selector } = XMS;

const SquadTableContainer = (gameState, ownProps = {}) => {
  const { squadId } = ownProps;

  const pilotInstances = Selector.pilotInstancesBySquad(squadId, gameState);

  const pilotIds = R.map(pilotInstance => pilotInstance.id, pilotInstances);
  const reduceFunction0 = (accum, pilotId) =>
    R.assoc(pilotId, Selector.upgradeInstancesByPilot(pilotId, gameState), accum);
  const pilotToUpgrades = R.reduce(reduceFunction0, {}, pilotIds);

  return React.createElement(SquadTable, {
    pilotInstances,
    pilotToUpgrades
  });
};

export default SquadTableContainer;
