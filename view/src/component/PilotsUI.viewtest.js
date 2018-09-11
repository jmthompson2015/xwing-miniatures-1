import TestData from "../TestData.js";

import PilotsUI from "./PilotsUI.js";

const { ActionCreator, StatBonusesState, TokenCountsState } = XMS;

const statBonuses1 = StatBonusesState.create({ agility: 1 });
const tokenCounts1 = TokenCountsState.create({ evade: 1, ion: 1 });
const upgradeInstances1 = [{ id: 1, upgradeKey: "marksmanship" }];
const damageInstances1 = [{ id: 1, damageKey: "blindedPilot" }];

const tokenCounts2 = TokenCountsState.create({ focus: 1, stress: 1 });

const statBonuses3 = StatBonusesState.create({ shield: 2 });
const tokenCounts3 = TokenCountsState.create({ evade: 1, focus: 1, shield: 2 });
const upgradeInstances3 = [
  { id: 2, upgradeKey: "protonTorpedoes" },
  { id: 3, upgradeKey: "r2D2_astromech" }
];

const pilotToDamages1 = { 1: damageInstances1 };
const pilotToUpgrades1 = { 1: upgradeInstances1 };
const pilotToUpgrades2 = { 3: upgradeInstances3 };

const store = TestData.createStore();

store.dispatch(ActionCreator.setPilotStatBonuses(1, statBonuses1));
store.dispatch(ActionCreator.setPilotTokenCounts(1, tokenCounts1));

store.dispatch(ActionCreator.setPilotTokenCounts(2, tokenCounts2));

store.dispatch(ActionCreator.setPilotStatBonuses(3, statBonuses3));
store.dispatch(ActionCreator.setPilotTokenCounts(3, tokenCounts3));

const pilotInstances1 = XMS.Selector.pilotInstancesByAgent(1, store.getState());

const element1 = React.createElement(PilotsUI, {
  pilotInstances: pilotInstances1,
  pilotToDamages: pilotToDamages1,
  pilotToUpgrades: pilotToUpgrades1
});
ReactDOM.render(element1, document.getElementById("pilots1"));

const pilotInstances2 = XMS.Selector.pilotInstancesByAgent(2, store.getState());

const element2 = React.createElement(PilotsUI, {
  pilotInstances: pilotInstances2,
  pilotToUpgrades: pilotToUpgrades2
});
ReactDOM.render(element2, document.getElementById("pilots2"));
