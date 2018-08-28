import PilotsUI from "./PilotsUI.js";

const pilotInstance1 = {
  id: 1,
  pilotKey: "maulerMithel"
};
const tokenCounts1 = {
  evadeCount: 1,
  ionCount: 1
};
const upgradeInstances1 = [
  {
    id: 1,
    upgradeKey: "marksmanship"
  }
];
const damageInstances1 = [
  {
    id: 1,
    damageKey: "blindedPilot"
  }
];

const pilotInstance2 = {
  id: 2,
  pilotKey: "darkCurse"
};
const tokenCounts2 = {
  focusCount: 1,
  stressCount: 1
};

const pilotInstances = [pilotInstance1, pilotInstance2];
const pilotToDamages = {};
pilotToDamages[pilotInstance1.id] = damageInstances1;
const pilotToTokenCounts = {};
pilotToTokenCounts[pilotInstance1.id] = tokenCounts1;
pilotToTokenCounts[pilotInstance2.id] = tokenCounts2;
const pilotToUpgrades = {};
pilotToUpgrades[pilotInstance1.id] = upgradeInstances1;

const element1 = React.createElement(PilotsUI, {
  pilotInstances,
  pilotToDamages,
  pilotToTokenCounts,
  pilotToUpgrades
});
ReactDOM.render(element1, document.getElementById("pilots1"));

const pilotInstance3 = {
  id: 3,
  pilotKey: "lukeSkywalker"
};
const tokenCounts3 = {
  evadeCount: 1,
  focusCount: 1,
  shieldCount: 2
};
const upgradeInstances3 = [
  {
    id: 2,
    upgradeKey: "protonTorpedoes"
  },
  {
    id: 3,
    upgradeKey: "r2D2_astromech"
  }
];

const element2 = React.createElement(PilotsUI, {
  pilotInstances: [pilotInstance3],
  pilotToTokenCounts: {
    3: tokenCounts3
  },
  pilotToUpgrades: {
    3: upgradeInstances3
  }
});
ReactDOM.render(element2, document.getElementById("pilots2"));
