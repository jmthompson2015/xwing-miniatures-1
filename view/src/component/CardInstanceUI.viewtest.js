import CardInstanceUI from "./CardInstanceUI.js";

const cells = [];

const pilotInstance0 = {
   id: 1,
   pilotKey: "maulerMithel"
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

addCardInstanceUI(cells, pilotInstance0, tokenCounts0, upgradeInstances0, damageInstances0);
addCardInstanceUI(cells, pilotInstance2, tokenCounts2, upgradeInstances2, damageInstances2);

ReactDOM.render(ReactDOMFactories.div(
{}, cells), document.getElementById("panel"));

function addCardInstanceUI(cells, cardInstance, tokenCounts, upgradeInstances, damageInstances)
{
   const element = React.createElement(CardInstanceUI,
   {
      cardInstance: cardInstance,
      damageInstances: damageInstances,
      tokenCounts: tokenCounts,
      upgradeInstances: upgradeInstances
   });

   cells.push(ReactDOMFactories.div(
   {
      key: "card" + cells.length,
      className: "v-top",
   }, element));
}