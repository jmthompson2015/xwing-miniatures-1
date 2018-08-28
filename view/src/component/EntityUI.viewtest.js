import ReactUtils from "../ReactUtilities.js";

import EntityUI from "./EntityUI.js";

const {
  ConditionCard,
  DamageCard,
  DiceModification,
  PilotCard,
  Ship,
  ShipAction,
  UpgradeCard
} = XMA;

const sources = [
  {
    name: "ConditionCard",
    key: ConditionCard.A_DEBT_TO_PAY
  },
  {
    name: "DamageCard",
    key: DamageCard.CONSOLE_FIRE
  },
  {
    name: "DiceModification",
    key: DiceModification.ATTACK_SPEND_FOCUS
  },
  {
    name: "PilotCard",
    key: PilotCard.LUKE_SKYWALKER
  },
  {
    name: "Ship",
    key: Ship.TIE_FIGHTER
  },
  {
    name: "ShipAction",
    key: ShipAction.EVADE
  },
  {
    name: "UpgradeCard",
    key: UpgradeCard.LIGHTNING_REFLEXES
  }
];

const rows = sources.map((source, i) => {
  const key = `childDiv${i}`;
  const element = React.createElement(EntityUI, {
    key,
    sourceName: source.name,
    sourceKey: source.key,
    panelClass: "dtc pa1"
  });
  return ReactUtils.createRow(element, `inputRow${i}`, "mv1");
});

ReactDOM.render(
  ReactDOMFactories.div(
    {
      className: "bg-near-white dt f6 mb1"
    },
    rows
  ),
  document.getElementById("panel")
);
