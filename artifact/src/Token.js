const Token = {
  CLOAK: "cloak",
  CRITICAL_DAMAGE: "criticalDamage",
  DAMAGE: "damage",
  ENERGY: "energy",
  EVADE: "evade",
  FOCUS: "focus",
  ION: "ion",
  ORDNANCE: "ordnance",
  REINFORCE: "reinforce",
  SHIELD: "shield",
  STRESS: "stress",
  TARGET_LOCK_ATTACK: "targetLockAttack",
  TARGET_LOCK_DEFEND: "targetLockDefend",
  TRACTOR_BEAM: "tractorBeam",
  WEAPONS_DISABLED: "weaponsDisabled"
};

Token.properties = {
  cloak: {
    name: "Cloak",
    image: "token/cloak.png",
    key: "cloak"
  },
  criticalDamage: {
    name: "Critical Damage",
    image: "token/critical-damage.png",
    key: "criticalDamage"
  },
  damage: {
    name: "Damage",
    image: "token/damage.png",
    key: "damage"
  },
  energy: {
    name: "Energy",
    image: "token/energy.png",
    key: "energy"
  },
  evade: {
    name: "Evade",
    image: "token/evade.png",
    key: "evade"
  },
  focus: {
    name: "Focus",
    image: "token/focus.png",
    key: "focus"
  },
  ion: {
    name: "Ion",
    image: "token/ion.png",
    key: "ion"
  },
  ordnance: {
    name: "Ordnance",
    image: "token/ordnance.png",
    key: "ordnance"
  },
  reinforce: {
    name: "Reinforce",
    image: "token/reinforce.png",
    key: "reinforce"
  },
  shield: {
    name: "Shield",
    image: "token/shield.png",
    key: "shield"
  },
  stress: {
    name: "Stress",
    image: "token/stress.png",
    key: "stress"
  },
  targetLockAttack: {
    name: "Target Lock (Attack)",
    image: "token/target-lock-attack.png",
    key: "targetLockAttack"
  },
  targetLockDefend: {
    name: "Target Lock (Defend)",
    image: "token/target-lock-defend.png",
    key: "targetLockDefend"
  },
  tractorBeam: {
    name: "Tractor Beam",
    image: "token/tractor-beam.png",
    key: "tractorBeam"
  },
  weaponsDisabled: {
    name: "Weapons Disabled",
    image: "token/weapons-disabled.png",
    key: "weaponsDisabled"
  }
};

Object.freeze(Token);

export default Token;
