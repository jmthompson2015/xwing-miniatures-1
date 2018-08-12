import Endpoint from "../Endpoint.js";
import ReactUtils from "../ReactUtilities.js";

import FactionUI from "./FactionUI.js";
import ShipActionUI from "./ShipActionUI.js";
import ShipSilhouetteUI from "./ShipSilhouetteUI.js";
import UpgradeSlotUI from "./UpgradeSlotUI.js";

const DiceModification = XMA.DiceModification;
const Faction = XMA.Faction;
const Maneuver = XMA.Maneuver;
const ShipAction = XMA.ShipAction;
const UpgradeSlot = XMA.UpgradeSlot;

class EntityUI extends React.Component
{
   render()
   {
      const sourceName = this.props.sourceName;
      const sourceKey = this.props.sourceKey;
      const context = this.props.context;
      const title = createTitle(sourceName, sourceKey);
      const icon = createIcon(sourceName, sourceKey);
      const label = createLabel(sourceName, sourceKey, context, title);

      const cells = [];
      cells.push(ReactUtils.createCell(icon, "iconPanel", "v-mid"));
      cells.push(ReactUtils.createCell(label, "labelPanel", "ph1 v-mid"));
      const row = ReactUtils.createRow(cells);

      return ReactUtils.createTable(row, "entityUITable", this.props.panelClass);
   }
}

const DICE_TO_ACTION = {
  [DiceModification.ATTACK_SPEND_FOCUS]: ShipAction.FOCUS,
  [DiceModification.DEFENSE_SPEND_EVADE]: ShipAction.EVADE,
  [DiceModification.DEFENSE_SPEND_FOCUS]: ShipAction.FOCUS
};

const createIcon = function(sourceName, sourceKey)
{
   const entity = getEntity(sourceName, sourceKey);
   let answer;

   switch (sourceName)
   {
      case "ConditionCard":
         // FIXME: find an icon for condition card
         break;
      case "DamageCard":
         const filename = Endpoint.ARTIFACT_RESOURCE + "token/critical-damage.png";
         answer = ReactDOMFactories.img(
         {
            src: filename,
            title: "Critical Damage",
            width: 24
         });
         break;
      case "DiceModification":
         const myShipActionKey = DICE_TO_ACTION[sourceKey];
         answer = React.createElement(ShipActionUI,
         {
            shipAction: XMA.Selector.shipAction(myShipActionKey)
         });
         break;
      case "PilotCard":
         answer = React.createElement(FactionUI,
         {
            faction: XMA.Selector.findEnumValueByName(entity.faction, Faction),
            isSmall: true
         });
         break;
      case "Ship":
         answer = React.createElement(ShipSilhouetteUI,
         {
            ship: entity
         });
         break;
      case "ShipAction":
         answer = React.createElement(ShipActionUI,
         {
            shipAction: entity
         });
         break;
      case "UpgradeCard":
         answer = React.createElement(UpgradeSlotUI,
         {
            upgradeSlot: XMA.Selector.findEnumValueByName(entity.slot, UpgradeSlot)
         });
         break;
      default:
         throw "EntityUI: Unknown entity sourceName: " + sourceName;
   }

   return answer;
};

const createLabel = (sourceName, sourceKey, context, title) =>
{
   const entity = getEntity(sourceName, sourceKey);
   let name;

   switch (sourceName)
   {
      case "ConditionCard":
      case "DamageCard":
      case "DiceModification":
      case "PilotCard":
      case "Ship":
      case "UpgradeCard":
         name = entity.name;
         break;
      case "ShipAction":
         name = createShipActionLabel(entity, context);
         break;
      default:
         throw "EntityUI: Unknown entity sourceName: " + sourceName;
   }

   return ReactDOMFactories.span(
   {
      key: "labelCell",
      title: title,
   }, name);
};

const createShipActionLabel = function(shipAction, context)
{
   let answer;
   const maneuverKey = (context !== undefined ? context.maneuverKey : undefined);
   const maneuver = (maneuverKey !== undefined ? Maneuver.properties[maneuverKey] : undefined);
   const token = (context !== undefined ? context.token : undefined);
   const defender = (context !== undefined ? context.defender : undefined);

   switch (shipAction.key)
   {
      case ShipAction.BARREL_ROLL:
         answer = "Barrel Roll " + context.direction;
         break;
      case ShipAction.BOOST:
         const parts = maneuver.bearing.split(" ");
         answer = "Boost " + parts[parts.length - 1];
         break;
      case ShipAction.COORDINATE:
         answer = "Coordinate: " + token.name();
         break;
      case ShipAction.DECLOAK:
         answer = "Decloak: " + maneuver.bearing.name + " " + maneuver.speed;
         break;
      case ShipAction.JAM:
         answer = "Jam: " + defender.name();
         break;
      case ShipAction.RECOVER:
         answer = "Recover" + (token.parent !== undefined ? ": " + token.name() : "");
         break;
      case ShipAction.REINFORCE:
         answer = "Reinforce" + (token.parent !== undefined ? ": " + token.name() : "");
         break;
      case ShipAction.SLAM:
         answer = "SLAM: " + maneuver.bearing.name + " " + maneuver.speed;
         break;
      case ShipAction.TARGET_LOCK:
         answer = "Target Lock: " + defender.name();
         break;
      default:
         answer = shipAction.name;
   }

   return answer;
};

const createTitle = function(sourceName, sourceKey)
{
   const entity = getEntity(sourceName, sourceKey);
   let answer = "";

   switch (sourceName)
   {
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
         throw "EntityUI: Unknown entity sourceName: " + sourceName;
   }

   return answer;
};

const getEntity = (sourceName, sourceKey) =>
{
   let answer;

   switch (sourceName)
   {
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
   }

   return answer;
};

EntityUI.propTypes = {
   sourceName: PropTypes.string.isRequired,
   sourceKey: PropTypes.string.isRequired,
   context: PropTypes.string.isRequired
};

export default EntityUI;