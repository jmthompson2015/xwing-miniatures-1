import SquadTable from "./SquadTable.js";

const { Reducer, Selector } = XMS;
const { SquadBuilder } = XMM;

const createTable = (squadInstance, state) => {
  const pilotInstances = Selector.pilotInstancesBySquad(squadInstance.id, state);

  const pilotIds = R.map(pilotInstance => pilotInstance.id, pilotInstances);
  const reduceFunction0 = (accum, pilotId) =>
    R.assoc(pilotId, Selector.upgradeInstancesByPilot(pilotId, state), accum);
  const pilotToUpgrades = R.reduce(reduceFunction0, {}, pilotIds);

  return React.createElement(SquadTable, {
    pilotInstances,
    pilotToUpgrades
  });
};

const store = Redux.createStore(Reducer.root);

const squadInstance1 = SquadBuilder.build2013Worlds4(store, 1);
const squadInstance2 = SquadBuilder.build2017USNationals2(store, 2);
const squadInstance3 = SquadBuilder.build2017USNationals4(store, 3);

const table1 = createTable(squadInstance1, store.getState());
ReactDOM.render(table1, document.getElementById("panel1"));

const table2 = createTable(squadInstance2, store.getState());
ReactDOM.render(table2, document.getElementById("panel2"));

const table3 = createTable(squadInstance3, store.getState());
ReactDOM.render(table3, document.getElementById("panel3"));
