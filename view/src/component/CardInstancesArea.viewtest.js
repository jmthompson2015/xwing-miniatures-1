import CardInstancesArea from "./CardInstancesArea.js";
import CardInstanceUI from "./CardInstanceUI.js";

const cells = [];

const pilotInstance0 = {
   id: 1,
   pilotKey: "maulerMithel"
};
let j = 0;
const statBonuses0 = {
   agility: j++,
   energy: j++,
   hull: j++,
   pilotSkill: j++,
   primaryWeapon: j++,
   shield: j++
};
let i = 0;
const tokenCounts0 = {
   cloak: i++,
   energy: i++,
   evade: i++,
   focus: i++,
   ion: i++,
   ordnance: i++,
   reinforce: i++,
   shield: i++,
   stress: i++,
   tractorBeam: i++,
   weaponsDisabled: i++
};
const upgradeInstances0 = [
   {
      id: 1,
      upgradeKey: "marksmanship"
   }];
const damageInstances0 = [
   {
      id: 1,
      damageKey: "blindedPilot"
   }];
const pilotInstance2 = {
   id: 3,
   pilotKey: "lukeSkywalker"
};
j = 6;
const statBonuses2 = {
   agility: j--,
   energy: j--,
   hull: j--,
   pilotSkill: j--,
   primaryWeapon: j--,
   shield: j--,
};
i = 11;
const tokenCounts2 = {
   cloak: i--,
   energy: i--,
   evade: i--,
   focus: i--,
   ion: i--,
   ordnance: i--,
   reinforce: i--,
   shield: i--,
   stress: i--,
   tractorBeam: i--,
   weaponsDisabled: i--
};
const upgradeInstances2 = [
   {
      id: 2,
      upgradeKey: "protonTorpedoes"
   },
   {
      id: 3,
      upgradeKey: "r2D2_astromech"
   }];
const damageInstances2 = [
   {
      id: 2,
      damageKey: "consoleFire"
   }];

const cardInstanceUIs = [
   React.createElement(CardInstanceUI,
   {
      cardInstance: pilotInstance0,
      damageInstances: damageInstances0,
      statBonuses: statBonuses0,
      tokenCounts: tokenCounts0,
      upgradeInstances: upgradeInstances0
   }),
   React.createElement(CardInstanceUI,
   {
      cardInstance: pilotInstance2,
      damageInstances: damageInstances2,
      statBonuses: statBonuses2,
      tokenCounts: tokenCounts2,
      upgradeInstances: upgradeInstances2
   })
];
addCardInstancesArea(cells, cardInstanceUIs);

ReactDOM.render(ReactDOMFactories.div(
{}, cells), document.getElementById("panel"));

function addCardInstancesArea(cells, cardInstanceUIs)
{
   const element = React.createElement(CardInstancesArea,
   {
      cardInstanceUIs: cardInstanceUIs
   });

   cells.push(ReactDOMFactories.div(
   {
      key: "card" + cells.length,
      className: "v-top",
   }, element));
}