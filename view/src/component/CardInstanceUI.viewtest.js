import CardInstanceUI from "./CardInstanceUI.js";

const cells = [];

const pilotInstance0 = {
  id: 1,
  pilotKey: "maulerMithel"
};
const tokenCounts0 = {
  cloak: 0,
  energy: 1,
  evade: 2,
  focus: 3,
  ion: 4,
  ordnance: 5,
  reinforce: 6,
  shield: 7,
  stress: 8,
  tractorBeam: 9,
  weaponsDisabled: 10
};
const upgradeInstances0 = [
  {
    id: 1,
    upgradeKey: "marksmanship"
  }
];
const damageInstances0 = [
  {
    id: 1,
    damageKey: "blindedPilot"
  }
];
const pilotInstance2 = {
  id: 3,
  pilotKey: "lukeSkywalker"
};
const tokenCounts2 = {
  cloak: 11,
  energy: 10,
  evade: 9,
  focus: 8,
  ion: 7,
  ordnance: 6,
  reinforce: 5,
  shield: 4,
  stress: 3,
  tractorBeam: 2,
  weaponsDisabled: 1
};
const upgradeInstances2 = [
  {
    id: 2,
    upgradeKey: "protonTorpedoes"
  },
  {
    id: 3,
    upgradeKey: "r2D2_astromech"
  }
];
const damageInstances2 = [
  {
    id: 2,
    damageKey: "consoleFire"
  }
];

function addCardInstanceUI(cells2, cardInstance, tokenCounts, upgradeInstances, damageInstances) {
  const element = React.createElement(CardInstanceUI, {
    cardInstance,
    damageInstances,
    tokenCounts,
    upgradeInstances
  });

  cells2.push(
    ReactDOMFactories.div(
      {
        key: `card${cells2.length}`,
        className: "v-top"
      },
      element
    )
  );
}

addCardInstanceUI(cells, pilotInstance0, tokenCounts0, upgradeInstances0, damageInstances0);
addCardInstanceUI(cells, pilotInstance2, tokenCounts2, upgradeInstances2, damageInstances2);

ReactDOM.render(ReactDOMFactories.div({}, cells), document.getElementById("panel"));
