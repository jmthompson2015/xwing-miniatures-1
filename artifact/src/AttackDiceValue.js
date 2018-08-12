const AttackDiceValue = {
   HIT: "hit",
   CRITICAL_HIT: "criticalHit",
   FOCUS: "focus",
   BLANK: "blank"
};

AttackDiceValue.properties = {
   "hit":
   {
      name: "Hit",
      sortOrder: 0,
      image: "dice/attack-hit.png",
      key: "hit"
   },
   "criticalHit":
   {
      name: "Critical Hit",
      sortOrder: 1,
      image: "dice/attack-critical-hit.png",
      key: "criticalHit"
   },
   "focus":
   {
      name: "Focus",
      sortOrder: 2,
      image: "dice/attack-focus.png",
      key: "focus"
   },
   "blank":
   {
      name: "Blank",
      sortOrder: 3,
      image: "dice/attack-blank.png",
      key: "blank"
   }
};

Object.freeze(AttackDiceValue);

export default AttackDiceValue;