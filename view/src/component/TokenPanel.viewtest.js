import TokenPanel from "./TokenPanel.js";

const attackerTargetLocks = [
   {
      id: "A",
      defenderName: "36 \u2022 Luke Skywalker (X-Wing)"
   }
];
const defenderTargetLocks = [
   {
      id: "B",
      attackerName: "36 \u2022 Luke Skywalker (X-Wing)"
   }
];

let i = 1;
const tokenCounts = {
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
   weaponsDisabled: i++,
   damage: i++,
   criticalDamage: i++
};

let j = 1;
const statBonuses = {
   pilotSkill: j++,
   primaryWeapon: j++,
   energy: j++,
   agility: j++,
   hull: j++,
   shield: j++
};

const element = React.createElement(TokenPanel,
{
   statBonuses: statBonuses,
   tokenCounts: tokenCounts,
   attackerTargetLocks: attackerTargetLocks,
   defenderTargetLocks: defenderTargetLocks
});

ReactDOM.render(element, document.getElementById("panel"));