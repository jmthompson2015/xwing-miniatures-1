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

const tokenCounts = {
  cloak: 1,
  energy: 2,
  evade: 3,
  focus: 4,
  ion: 5,
  ordnance: 6,
  reinforce: 7,
  shield: 8,
  stress: 9,
  tractorBeam: 10,
  weaponsDisabled: 11,
  damage: 12,
  criticalDamage: 13
};

const statBonuses = {
  pilotSkill: 1,
  primaryWeapon: 2,
  energy: 3,
  agility: 4,
  hull: 5,
  shield: 6
};

const element = React.createElement(TokenPanel, {
  statBonuses,
  tokenCounts,
  attackerTargetLocks,
  defenderTargetLocks
});

ReactDOM.render(element, document.getElementById("panel"));
