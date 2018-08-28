import CardInstancesArea from "./CardInstancesArea.js";
import CardInstanceUI from "./CardInstanceUI.js";

const cells = [];

const pilotInstance0 = {
  id: 1,
  pilotKey: "maulerMithel"
};
const statBonuses0 = {
  agility: 0,
  energy: 1,
  hull: 2,
  pilotSkill: 3,
  primaryWeapon: 4,
  shield: 5
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
const statBonuses2 = {
  agility: 6,
  energy: 5,
  hull: 4,
  pilotSkill: 3,
  primaryWeapon: 2,
  shield: 1
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

const cardInstanceUIs = [
  React.createElement(CardInstanceUI, {
    cardInstance: pilotInstance0,
    damageInstances: damageInstances0,
    statBonuses: statBonuses0,
    tokenCounts: tokenCounts0,
    upgradeInstances: upgradeInstances0
  }),
  React.createElement(CardInstanceUI, {
    cardInstance: pilotInstance2,
    damageInstances: damageInstances2,
    statBonuses: statBonuses2,
    tokenCounts: tokenCounts2,
    upgradeInstances: upgradeInstances2
  })
];

function addCardInstancesArea(cells2, cardInstanceUIs2) {
  const element = React.createElement(CardInstancesArea, {
    cardInstanceUIs: cardInstanceUIs2
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

addCardInstancesArea(cells, cardInstanceUIs);

ReactDOM.render(ReactDOMFactories.div({}, cells), document.getElementById("panel"));
