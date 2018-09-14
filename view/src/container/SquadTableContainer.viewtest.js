import TestData from "../TestData.js";

import SquadTableContainer from "./SquadTableContainer.js";

const { SquadBuilder } = XMM;

const store = TestData.createStore();

SquadBuilder.build2013Worlds4(store, 1);
SquadBuilder.build2017USNationals2(store, 2);
SquadBuilder.build2017USNationals4(store, 3);

const gameState = store.getState();

const container1 = SquadTableContainer(gameState, { squadId: 1 });
ReactDOM.render(container1, document.getElementById("panel1"));

const container2 = SquadTableContainer(gameState, { squadId: 2 });
ReactDOM.render(container2, document.getElementById("panel2"));

const container3 = SquadTableContainer(gameState, { squadId: 3 });
ReactDOM.render(container3, document.getElementById("panel3"));
