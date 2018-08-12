import AttackDiceValue from "./AttackDiceValue.js";
import ConditionCard from "./ConditionCard.js";
import DamageCard from "./DamageCard.js";
import DamageCardTFA from "./DamageCardTFA.js";
import DefenseDiceValue from "./DefenseDiceValue.js";
import Faction from "./Faction.js";
import FiringArc from "./FiringArc.js";
import Maneuver from "./Maneuver.js";
import Phase from "./Phase.js";
import PilotCard from "./PilotCard.js";
import PlayFormat from "./PlayFormat.js";
import Range from "./Range.js";
import ReferenceCard from "./ReferenceCard.js";
import Selector from "./Selector.js";
import Ship from "./Ship.js";
import ShipAction from "./ShipAction.js";
import ShipBase from "./ShipBase.js";
import Source from "./Source.js";
import Stat from "./Stat.js";
import Token from "./Token.js";
import UpgradeCard from "./UpgradeCard.js";
import UpgradeSlot from "./UpgradeSlot.js";

QUnit.module("Selector");

QUnit.test("attackDiceValue()", function(assert)
{
   // Setup.
   const diceKey = AttackDiceValue.HIT;

   // Run.
   const result = Selector.attackDiceValue(diceKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.key, diceKey);
});

QUnit.test("conditionCard()", function(assert)
{
   // Setup.
   const conditionKey = ConditionCard.A_DEBT_TO_PAY;

   // Run.
   const result = Selector.conditionCard(conditionKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.key, conditionKey);
});

QUnit.test("damageCard()", function(assert)
{
   // Setup.
   const damageKey = DamageCard.BLINDED_PILOT;

   // Run.
   const result = Selector.damageCard(damageKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.key, damageKey);
});

QUnit.test("damageCardTFA()", function(assert)
{
   // Setup.
   const damageKey = DamageCardTFA.BLINDED_PILOT;

   // Run.
   const result = Selector.damageCardTFA(damageKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.key, damageKey);
});

QUnit.test("defenseDiceValue()", function(assert)
{
   // Setup.
   const diceKey = DefenseDiceValue.EVADE;

   // Run.
   const result = Selector.defenseDiceValue(diceKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.key, diceKey);
});

QUnit.test("faction()", function(assert)
{
   // Setup.
   const factionKey = Faction.GALACTIC_EMPIRE;

   // Run.
   const result = Selector.faction(factionKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.key, factionKey);
});

QUnit.test("factionKeysByShip()", function(assert)
{
   // Setup.
   const shipKey = Ship.FIRESPRAY_31;

   // Run.
   const result = Selector.factionKeysByShip(shipKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.length, 2);
   let i = 0;
   assert.equal(result[i++], Faction.GALACTIC_EMPIRE);
   assert.equal(result[i++], Faction.SCUM_AND_VILLAINY);
});

QUnit.test("factionValueByPilot()", function(assert)
{
   // Setup.
   const pilotKey = PilotCard.ACADEMY_PILOT;

   // Run.
   const result = Selector.factionValueByPilot(pilotKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.key, Faction.GALACTIC_EMPIRE);
});

QUnit.test("firingArc()", function(assert)
{
   // Setup.
   const arcKey = FiringArc.FRONT;

   // Run.
   const result = Selector.firingArc(arcKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.key, arcKey);
});

QUnit.test("firingArcKeysByShip()", function(assert)
{
   // Setup.
   const shipKey = Ship.FIRESPRAY_31;

   // Run.
   const result = Selector.firingArcKeysByShip(shipKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.length, 2);
   let i = 0;
   assert.equal(result[i++], FiringArc.AUXILIARY_REAR);
   assert.equal(result[i++], FiringArc.FRONT);
});

QUnit.test("maneuver()", function(assert)
{
   // Setup.
   const maneuverKey = Maneuver.BANK_LEFT_1_EASY_1BG;

   // Run.
   const result = Selector.maneuver(maneuverKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.key, maneuverKey);
});

QUnit.test("maneuverKeysByShip()", function(assert)
{
   // Setup.
   const shipKey = Ship.X_WING;

   // Run.
   const result = Selector.maneuverKeysByShip(shipKey);

   // Verify.
   assert.ok(result);
   const length = 15;
   assert.equal(result.length, length);
   assert.equal(result[0], Maneuver.BANK_LEFT_1_EASY_1BG);
   assert.equal(result[length - 1], Maneuver.KOIOGRAN_TURN_4_HARD_4KR);
});

QUnit.test("phase()", function(assert)
{
   // Setup.
   const phaseKey = Phase.PLANNING_START;

   // Run.
   const result = Selector.phase(phaseKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.key, phaseKey);
});

QUnit.test("pilotCard()", function(assert)
{
   // Setup.
   const pilotKey = PilotCard.ACADEMY_PILOT;

   // Run.
   const result = Selector.pilotCard(pilotKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.key, pilotKey);
});

QUnit.test("playFormat()", function(assert)
{
   // Setup.
   const formatKey = PlayFormat.STANDARD;

   // Run.
   const result = Selector.playFormat(formatKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.key, formatKey);
});

QUnit.test("range()", function(assert)
{
   // Setup.
   const rangeKey = Range.TWO;

   // Run.
   const result = Selector.range(rangeKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.key, rangeKey);
});

QUnit.test("rangesByUpgrade() Hot Shot Blaster", function(assert)
{
   // Setup.
   const upgradeKey = UpgradeCard.HOT_SHOT_BLASTER;

   // Run.
   const result = Selector.rangesByUpgrade(upgradeKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.length, 2);
   let i = 0;
   assert.equal(result[i++], Range.ONE);
   assert.equal(result[i++], Range.TWO);
});

QUnit.test("rangesByUpgrade() Proton Torpedoes", function(assert)
{
   // Setup.
   const upgradeKey = UpgradeCard.PROTON_TORPEDOES;

   // Run.
   const result = Selector.rangesByUpgrade(upgradeKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.length, 2);
   let i = 0;
   assert.equal(result[i++], Range.TWO);
   assert.equal(result[i++], Range.THREE);
});

QUnit.test("referenceCard()", function(assert)
{
   // Setup.
   const referenceKey = ReferenceCard.AUXILIARY_FIRING_ARC;

   // Run.
   const result = Selector.referenceCard(referenceKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.key, referenceKey);
});

QUnit.test("ship()", function(assert)
{
   // Setup.
   const shipKey = Ship.A_WING;

   // Run.
   const result = Selector.ship(shipKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.key, shipKey);
});

QUnit.test("shipAction()", function(assert)
{
   // Setup.
   const actionKey = ShipAction.BARREL_ROLL;

   // Run.
   const result = Selector.shipAction(actionKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.key, actionKey);
});

QUnit.test("shipActionKeysByShip()", function(assert)
{
   // Setup.
   const shipKey = Ship.X_WING;

   // Run.
   const result = Selector.shipActionKeysByShip(shipKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.length, 2);
   let i = 0;
   assert.equal(result[i++], ShipAction.FOCUS);
   assert.equal(result[i++], ShipAction.TARGET_LOCK);
});

QUnit.test("shipBase()", function(assert)
{
   // Setup.
   const baseKey = ShipBase.SMALL;

   // Run.
   const result = Selector.shipBase(baseKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.key, baseKey);
});

QUnit.test("shipBaseValueByShip()", function(assert)
{
   // Setup.
   const shipKey = Ship.X_WING;

   // Run.
   const result = Selector.shipBaseValueByShip(shipKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.key, ShipBase.SMALL);
});

QUnit.test("shipKeyByPilot()", function(assert)
{
   // Setup.
   const pilotKey = PilotCard.ACADEMY_PILOT;

   // Run.
   const result = Selector.shipKeyByPilot(pilotKey);

   // Verify.
   assert.ok(result);
   assert.equal(result, Ship.TIE_FIGHTER);
});

QUnit.test("shipValueByPilot()", function(assert)
{
   // Setup.
   const pilotKey = PilotCard.ACADEMY_PILOT;

   // Run.
   const result = Selector.shipValueByPilot(pilotKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.name, "TIE Fighter");
   assert.equal(result.key, Ship.TIE_FIGHTER);
});

QUnit.test("source()", function(assert)
{
   // Setup.
   const sourceKey = Source.A_WING_EXPANSION_PACK;

   // Run.
   const result = Selector.source(sourceKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.key, sourceKey);
});

QUnit.test("stat() Primary Weapon", function(assert)
{
   // Setup.
   const statKey = Stat.PRIMARY_WEAPON;

   // Run.
   const result = Selector.stat(statKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.name, "Primary Weapon");
   assert.equal(result.key, statKey);
});

QUnit.test("statValueByPilot() Luke Skywalker Primary Weapon", function(assert)
{
   // Setup.
   const pilotKey = PilotCard.LUKE_SKYWALKER;
   const statKey = Stat.PRIMARY_WEAPON;

   // Run.
   const result = Selector.statValueByPilot(pilotKey, statKey);

   // Verify.
   assert.equal(result, undefined);
});

QUnit.test("statValueByShip() X-Wing Primary Weapon", function(assert)
{
   // Setup.
   const shipKey = Ship.X_WING;
   const statKey = Stat.PRIMARY_WEAPON;

   // Run.
   const result = Selector.statValueByShip(shipKey, statKey);

   // Verify.
   assert.equal(result, 3);
});

QUnit.test("token()", function(assert)
{
   // Setup.
   const tokenKey = Token.CLOAK;

   // Run.
   const result = Selector.token(tokenKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.key, tokenKey);
});

QUnit.test("upgradeCard()", function(assert)
{
   // Setup.
   const upgradeKey = UpgradeCard.A_SCORE_TO_SETTLE;

   // Run.
   const result = Selector.upgradeCard(upgradeKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.key, upgradeKey);
});

QUnit.test("upgradeSlot()", function(assert)
{
   // Setup.
   const slotKey = UpgradeSlot.ASTROMECH;

   // Run.
   const result = Selector.upgradeSlot(slotKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.key, slotKey);
});

QUnit.test("upgradeSlotKeysByPilot()", function(assert)
{
   // Setup.
   const pilotKey = PilotCard.LUKE_SKYWALKER;

   // Run.
   const result = Selector.upgradeSlotKeysByPilot(pilotKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.length, 3);
   let i = 0;
   assert.equal(result[i++], UpgradeSlot.ELITE);
   assert.equal(result[i++], UpgradeSlot.TORPEDO);
   assert.equal(result[i++], UpgradeSlot.ASTROMECH);
});

QUnit.test("upgradeSlotValueByUpgrade()", function(assert)
{
   // Setup.
   const upgradeKey = UpgradeCard.A_SCORE_TO_SETTLE;

   // Run.
   const result = Selector.upgradeSlotValueByUpgrade(upgradeKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.key, UpgradeSlot.ELITE);
});

const SelectorTest = {};
export default SelectorTest;