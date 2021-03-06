const DiceModification = {
  ATTACK_SPEND_FOCUS: "attackSpendFocus",
  ATTACK_SPEND_TARGET_LOCK: "attackSpendTargetLock",
  DEFENSE_SPEND_EVADE: "defenseSpendEvade",
  DEFENSE_SPEND_FOCUS: "defenseSpendFocus"
};

DiceModification.properties = {
  attackSpendFocus: {
    name: "Spend a Focus token",
    description: "Spend a focus token to change all focus results to hit results on attack dice.",
    key: "attackSpendFocus"
  },
  attackSpendTargetLock: {
    name: "Spend Target Lock tokens",
    description: "Spend a target lock on the defender to reroll any number of attack dice.",
    key: "attackSpendTargetLock"
  },
  defenseSpendEvade: {
    name: "Spend an Evade token",
    description: "Spend an evade token to add one additional evade result to defense dice.",
    key: "defenseSpendEvade"
  },
  defenseSpendFocus: {
    name: "Spend a Focus token",
    description:
      "Spend a focus token to change all focus results to evade results on defense dice.",
    key: "defenseSpendFocus"
  }
};

Object.freeze(DiceModification);

export default DiceModification;
