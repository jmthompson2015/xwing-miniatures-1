import AttackDiceValue from "./AttackDiceValue.js";
import ConditionCard from "./ConditionCard.js";
import DamageCard from "./DamageCard.js";
import DamageCardTFA from "./DamageCardTFA.js";
import DefenseDiceValue from "./DefenseDiceValue.js";
import DiceModification from "./DiceModification.js";
import EnumUtils from "./EnumUtilities.js";
import Faction from "./Faction.js";
import FiringArc from "./FiringArc.js";
import Maneuver from "./Maneuver.js";
import ManeuverUtils from "./ManeuverUtilities.js";
import Phase from "./Phase.js";
import PilotCard from "./PilotCard.js";
import PlayFormat from "./PlayFormat.js";
import Range from "./Range.js";
import ReferenceCard from "./ReferenceCard.js";
import Ship from "./Ship.js";
import ShipAction from "./ShipAction.js";
import ShipBase from "./ShipBase.js";
import Source from "./Source.js";
import Stat from "./Stat.js";
import Token from "./Token.js";
import UpgradeCard from "./UpgradeCard.js";
import UpgradeSlot from "./UpgradeSlot.js";

const Selector = {};

const STRING_TO_RANGES = {
  "1": [Range.ONE],
  "1-2": [Range.ONE, Range.TWO],
  "1-3": [Range.ONE, Range.TWO, Range.THREE],
  "2": [Range.TWO],
  "2-3": [Range.TWO, Range.THREE],
  "2-4": [Range.TWO, Range.THREE, Range.FOUR],
  "3-5": [Range.THREE, Range.FOUR, Range.FIVE]
};

const dialToManeuver = dial => ManeuverUtils.dialToManeuver(dial);

const keysByName = (enumClass, names) => {
  const mapFunction = name => {
    const enumValue = Selector.findEnumValueByName(name, enumClass);
    return enumValue !== undefined ? enumValue.key : undefined;
  };
  return R.map(mapFunction, names);
};

const valueByKey = (enumClass, key) => enumClass.properties[key];

// /////////////////////////////////////////////////////////////////////////////////////////////////
Selector.enumKeys = enumClass => EnumUtils.keys(enumClass);

Selector.enumValues = enumClass => EnumUtils.values(enumClass);

Selector.factionKeysByShip = shipKey => keysByName(Faction, Selector.ship(shipKey).faction);

Selector.factionValueByPilot = pilotKey =>
  Selector.findEnumValueByName(Selector.pilotCard(pilotKey).faction, Faction);

Selector.findEnumValueByName = (name, enumClass) => EnumUtils.findByName(name, enumClass);

Selector.firingArcKeysByShip = shipKey => keysByName(FiringArc, Selector.ship(shipKey).firing_arcs);

Selector.grantByStat = statKey => R.prop("grant", Selector.stat(statKey));

Selector.maneuverKeysByShip = shipKey =>
  R.map(dial => dialToManeuver(dial), Selector.ship(shipKey).dial);

Selector.rangesByUpgrade = upgradeKey => STRING_TO_RANGES[Selector.upgradeCard(upgradeKey).range];

Selector.shipActionKeysByShip = shipKey => keysByName(ShipAction, Selector.ship(shipKey).actions);

Selector.shipBaseValueByShip = shipKey => Selector.shipBase(Selector.ship(shipKey).size);

Selector.shipKeyByPilot = pilotKey => Selector.shipValueByPilot(pilotKey).key;

Selector.shipValueByPilot = pilotKey =>
  Selector.findEnumValueByName(Selector.pilotCard(pilotKey).ship, Ship);

Selector.statValueByPilot = (pilotKey, statKey) =>
  R.prop(Selector.grantByStat(statKey), Selector.pilotCard(pilotKey));

Selector.statValueByShip = (shipKey, statKey) =>
  R.prop(Selector.grantByStat(statKey), Selector.ship(shipKey));

Selector.upgradeSlotKeysByPilot = pilotKey =>
  keysByName(UpgradeSlot, Selector.pilotCard(pilotKey).slots);

Selector.upgradeSlotValueByUpgrade = upgradeKey =>
  Selector.findEnumValueByName(Selector.upgradeCard(upgradeKey).slot, UpgradeSlot);

// //////////////////////////////////////////////////////////////////////////////
Selector.attackDiceValue = key => valueByKey(AttackDiceValue, key);

Selector.conditionCard = key => valueByKey(ConditionCard, key);

Selector.damageCard = key => valueByKey(DamageCard, key);

Selector.damageCardTFA = key => valueByKey(DamageCardTFA, key);

Selector.defenseDiceValue = key => valueByKey(DefenseDiceValue, key);

Selector.diceModification = key => valueByKey(DiceModification, key);

Selector.faction = key => valueByKey(Faction, key);

Selector.firingArc = key => valueByKey(FiringArc, key);

Selector.maneuver = key => valueByKey(Maneuver, key);

Selector.phase = key => valueByKey(Phase, key);

Selector.pilotCard = key => valueByKey(PilotCard, key);

Selector.playFormat = key => valueByKey(PlayFormat, key);

Selector.range = key => valueByKey(Range, key);

Selector.referenceCard = key => valueByKey(ReferenceCard, key);

Selector.ship = key => valueByKey(Ship, key);

Selector.shipAction = key => valueByKey(ShipAction, key);

Selector.shipBase = key => valueByKey(ShipBase, key);

Selector.source = key => valueByKey(Source, key);

Selector.stat = key => valueByKey(Stat, key);

Selector.token = key => valueByKey(Token, key);

Selector.upgradeCard = key => valueByKey(UpgradeCard, key);

Selector.upgradeSlot = key => valueByKey(UpgradeSlot, key);

Object.freeze(Selector);

export default Selector;
