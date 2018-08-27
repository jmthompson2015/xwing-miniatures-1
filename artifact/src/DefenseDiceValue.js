const DefenseDiceValue = {
  EVADE: "evade",
  FOCUS: "focus",
  BLANK: "blank"
};

DefenseDiceValue.properties = {
  evade: {
    name: "Evade",
    sortOrder: 0,
    image: "dice/defense-evade.png",
    key: "evade"
  },
  focus: {
    name: "Focus",
    sortOrder: 1,
    image: "dice/defense-focus.png",
    key: "focus"
  },
  blank: {
    name: "Blank",
    sortOrder: 2,
    image: "dice/defense-blank.png",
    key: "blank"
  }
};

Object.freeze(DefenseDiceValue);

export default DefenseDiceValue;
