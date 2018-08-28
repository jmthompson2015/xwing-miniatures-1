import Endpoint from "../Endpoint.js";
import ReactUtils from "../ReactUtilities.js";

import FactionUI from "./FactionUI.js";
import ShipActionUI from "./ShipActionUI.js";
import ShipSilhouetteUI from "./ShipSilhouetteUI.js";
import UpgradeSlotUI from "./UpgradeSlotUI.js";

const { DiceModification, Faction, Maneuver, ShipAction, UpgradeSlot } = XMA;

const DICE_TO_ACTION = {
  [DiceModification.ATTACK_SPEND_FOCUS]: ShipAction.FOCUS,
  [DiceModification.DEFENSE_SPEND_EVADE]: ShipAction.EVADE,
  [DiceModification.DEFENSE_SPEND_FOCUS]: ShipAction.FOCUS
};

const getEntity = (sourceName, sourceKey) => {
  let answer;

  switch (sourceName) {
    case "ConditionCard":
      answer = XMA.Selector.conditionCard(sourceKey);
      break;
    case "DamageCard":
      answer = XMA.Selector.damageCard(sourceKey);
      break;
    case "DiceModification":
      answer = XMA.Selector.diceModification(sourceKey);
      break;
    case "PilotCard":
      answer = XMA.Selector.pilotCard(sourceKey);
      break;
    case "Ship":
      answer = XMA.Selector.ship(sourceKey);
      break;
    case "ShipAction":
      answer = XMA.Selector.shipAction(sourceKey);
      break;
    case "UpgradeCard":
      answer = XMA.Selector.upgradeCard(sourceKey);
      break;
    default:
      throw new Error(`Unknown sourceName: ${sourceName}`);
  }

  return answer;
};

const createIcon = (sourceName, sourceKey) => {
  const entity = getEntity(sourceName, sourceKey);
  let answer;
  let filename;
  let myShipActionKey;

  switch (sourceName) {
    case "ConditionCard":
      // FIXME: find an icon for condition card
      break;
    case "DamageCard":
      filename = `${Endpoint.ARTIFACT_RESOURCE}token/critical-damage.png`;
      answer = ReactDOMFactories.img({
        src: filename,
        title: "Critical Damage",
        width: 24
      });
      break;
    case "DiceModification":
      myShipActionKey = DICE_TO_ACTION[sourceKey];
      answer = React.createElement(ShipActionUI, {
        shipAction: XMA.Selector.shipAction(myShipActionKey)
      });
      break;
    case "PilotCard":
      answer = React.createElement(FactionUI, {
        faction: XMA.Selector.findEnumValueByName(entity.faction, Faction),
        isSmall: true
      });
      break;
    case "Ship":
      answer = React.createElement(ShipSilhouetteUI, {
        ship: entity
      });
      break;
    case "ShipAction":
      answer = React.createElement(ShipActionUI, {
        shipAction: entity
      });
      break;
    case "UpgradeCard":
      answer = React.createElement(UpgradeSlotUI, {
        upgradeSlot: XMA.Selector.findEnumValueByName(entity.slot, UpgradeSlot)
      });
      break;
    default:
      throw new Error(`EntityUI: Unknown entity sourceName: ${sourceName}`);
  }

  return answer;
};

const createShipActionLabel = (shipAction, context) => {
  let answer;
  let parts;
  const maneuverKey = context !== undefined ? context.maneuverKey : undefined;
  const maneuver = maneuverKey !== undefined ? Maneuver.properties[maneuverKey] : undefined;
  const token = context !== undefined ? context.token : undefined;
  const defender = context !== undefined ? context.defender : undefined;

  switch (shipAction.key) {
    case ShipAction.BARREL_ROLL:
      answer = `Barrel Roll ${context.direction}`;
      break;
    case ShipAction.BOOST:
      parts = maneuver.bearing.split(" ");
      answer = `Boost ${parts[parts.length - 1]}`;
      break;
    case ShipAction.COORDINATE:
      answer = `Coordinate: ${token.name()}`;
      break;
    case ShipAction.DECLOAK:
      answer = `Decloak: ${maneuver.bearing.name} ${maneuver.speed}`;
      break;
    case ShipAction.JAM:
      answer = `Jam: ${defender.name()}`;
      break;
    case ShipAction.RECOVER:
      answer = `Recover${token.parent !== undefined ? `: ${token.name()}` : ""}`;
      break;
    case ShipAction.REINFORCE:
      answer = `Reinforce${token.parent !== undefined ? `: ${token.name()}` : ""}`;
      break;
    case ShipAction.SLAM:
      answer = `SLAM: ${maneuver.bearing.name} ${maneuver.speed}`;
      break;
    case ShipAction.TARGET_LOCK:
      answer = `Target Lock: ${defender.name()}`;
      break;
    default:
      answer = shipAction.name;
  }

  return answer;
};

const createLabel = (sourceName, sourceKey, context, title) => {
  const entity = getEntity(sourceName, sourceKey);
  let { name } = entity;

  switch (sourceName) {
    case "ConditionCard":
    case "DamageCard":
    case "DiceModification":
    case "PilotCard":
    case "Ship":
    case "UpgradeCard":
      // name = entity.name;
      break;
    case "ShipAction":
      name = createShipActionLabel(entity, context);
      break;
    default:
      throw new Error(`EntityUI: Unknown entity sourceName: ${sourceName}`);
  }

  return ReactDOMFactories.span(
    {
      key: "labelCell",
      title
    },
    name
  );
};

const createTitle = (sourceName, sourceKey) => {
  const entity = getEntity(sourceName, sourceKey);
  let answer = "";

  switch (sourceName) {
    case "DiceModification":
    case "ShipAction":
      answer = entity.description;
      break;
    case "ConditionCard":
    case "DamageCard":
    case "PilotCard":
    case "Ship":
    case "UpgradeCard":
      answer = entity.text;
      break;
    default:
      throw new Error(`EntityUI: Unknown entity sourceName: ${sourceName}`);
  }

  return answer;
};

// /////////////////////////////////////////////////////////////////////////////////////////////////
class EntityUI extends React.Component {
  render() {
    const { context, panelClass, sourceKey, sourceName } = this.props;
    const title = createTitle(sourceName, sourceKey);
    const icon = createIcon(sourceName, sourceKey);
    const label = createLabel(sourceName, sourceKey, context, title);

    const cells = [];
    cells.push(ReactUtils.createCell(icon, "iconPanel", "v-mid"));
    cells.push(ReactUtils.createCell(label, "labelPanel", "ph1 v-mid"));
    const row = ReactUtils.createRow(cells);

    return ReactUtils.createTable(row, "entityUITable", panelClass);
  }
}

EntityUI.propTypes = {
  sourceName: PropTypes.string.isRequired,
  sourceKey: PropTypes.string.isRequired,
  context: PropTypes.string.isRequired,
  panelClass: PropTypes.string
};

EntityUI.defaultProps = {
  panelClass: ""
};

export default EntityUI;
