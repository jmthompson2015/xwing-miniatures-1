import AgentState from "./AgentState.js";
import DamageState from "./DamageState.js";
import GameState from "./GameState.js";
import PilotState from "./PilotState.js";
import PositionState from "./PositionState.js";
import SquadState from "./SquadState.js";
import StatBonusesState from "./StatBonusesState.js";
import TargetLockState from "./TargetLockState.js";
import TokenCountsState from "./TokenCountsState.js";
import UpgradeState from "./UpgradeState.js";

const TestData = {};

TestData.createAgentImperial = function(id, squadId, strategy)
{
   return AgentState.create(
   {
      id: id,
      name: "Imperial Agent",
      strategy: strategy,
      squad: squadId
   });
};

TestData.createAgentRebel = function(id, squadId, strategy)
{
   return AgentState.create(
   {
      id: id,
      name: "Rebel Agent",
      strategy: strategy,
      squad: squadId
   });
};

TestData.createDamage = function(id, damageKey)
{
   return DamageState.create(
   {
      id: id,
      damageKey: damageKey
   });
};

TestData.createDamageDeck = function()
{
   // There are two of each, except seven of Direct Hit!
   const keys = ["blindedPilot", "consoleFire", "damagedCockpit", "damagedEngine", "damagedSensorArray", "directHit", "injuredPilot", "minorExplosion", "minorHullBreach", "munitionsFailure", "structuralDamage", "stunnedPilot", "thrustControlFire", "weaponMalfunction"];
   let count = 1;

   const damageInstances = keys.reduce(function(accumulator, damageKey)
   {
      accumulator[count] = TestData.createDamage(count++, damageKey);
      accumulator[count] = TestData.createDamage(count++, damageKey);
      return accumulator;
   },
   {});

   for (let i = 0; i < 5; i++)
   {
      damageInstances[count] = TestData.createDamage(count++, "directHit");
   }

   const damageDeck = Object.values(damageInstances).map(damage => damage.id);

   // Shuffle.
   damageDeck.sort(() => Math.random() - 0.5);

   return (
   {
      damageInstances: damageInstances,
      damageDeck: damageDeck
   });
};

TestData.createGameState = function()
{
   const damageObj = TestData.createDamageDeck();
   const damageInstances = damageObj.damageInstances;
   const damageDeck = damageObj.damageDeck;

   const position1 = TestData.createPosition(915 / 3, 20, 90);
   const position2 = TestData.createPosition(915 * 2 / 3, 20, 90);
   const position3 = TestData.createPosition(Math.round(915 / 2), 915 - 20, 270);

   const statBonuses1 = StatBonusesState.create();
   const statBonuses2 = StatBonusesState.create();
   const statBonuses3 = R.assoc("hull", 1, StatBonusesState.create());

   const tokenCounts1 = TokenCountsState.create();
   const tokenCounts2 = TokenCountsState.create();
   const tokenCounts3 = R.assoc("shield", 2, TokenCountsState.create());

   const upgradeInstances = {};
   upgradeInstances[1] = TestData.createUpgrade(1, "marksmanship", TokenCountsState.create());
   upgradeInstances[2] = TestData.createUpgrade(2, "protonTorpedoes", TokenCountsState.create());
   upgradeInstances[3] = TestData.createUpgrade(3, "r2D2_astromech", TokenCountsState.create());

   const pilotInstances = {};
   pilotInstances[1] = TestData.createPilot(1, "maulerMithel", [1], [3], position1, statBonuses1, tokenCounts1, [1]);
   pilotInstances[2] = TestData.createPilot(2, "darkCurse", [2], [4], position2, statBonuses2, tokenCounts2, []);
   pilotInstances[3] = TestData.createPilot(3, "lukeSkywalker", [], [], position3, statBonuses3, tokenCounts3, [2, 3]);

   const squadInstances = {
      1: TestData.createSquadCoreSetImperial(1, [1, 2]),
      2: TestData.createSquadCoreSetRebel(2, [3])
   };

   const agentInstances = {};
   agentInstances[1] = TestData.createAgentImperial(1, 1);
   agentInstances[2] = TestData.createAgentRebel(2, 2);

   const targetLocks = [];
   targetLocks.push(TestData.createTargetLock("A", 1, 3));
   targetLocks.push(TestData.createTargetLock("B", 2, 3));
   targetLocks.push(TestData.createTargetLock("C", 3, 1));

   return GameState.create(
   {
      phaseKey: "planningStart",
      round: 1,
      userMessage: "This is some user message.",

      damageDeck: damageDeck,
      targetLocks: targetLocks,

      agentInstances: agentInstances,
      damageInstances: damageInstances,
      pilotInstances: pilotInstances,
      squadInstances: squadInstances,
      upgradeInstances: upgradeInstances
   });
};

TestData.createPilot = function(id, pilotKey, criticals, damages, position, statBonuses, tokenCounts, upgradeIds)
{
   return PilotState.create(
   {
      id: id,
      pilotKey: pilotKey,

      criticals: criticals,
      damages: damages,
      position: position,
      statBonuses: statBonuses,
      tokenCounts: tokenCounts,
      upgrades: upgradeIds
   });
};

TestData.createPosition = function(x, y, heading)
{
   return PositionState.create(
   {
      x: x,
      y: y,
      heading: heading
   });
};

TestData.createSquadCoreSetImperial = function(squadId, pilotIds)
{
   return SquadState.create(
   {
      id: squadId,
      name: "Imperial Core Set: 36 Points",
      year: 2012,
      description: "TIE Fighters x2",
      points: 36,
      pilots: pilotIds
   });
};

TestData.createSquadCoreSetRebel = function(squadId, pilotIds)
{
   return SquadState.create(
   {
      id: squadId,
      name: "Rebel Core Set: 36 Points",
      year: 2012,
      description: "X-Wing",
      points: 36,
      pilots: pilotIds
   });
};

TestData.createTargetLock = function(id, attackerId, defenderId)
{
   return TargetLockState.create(
   {
      id: id,
      attackerId: attackerId,
      defenderId: defenderId
   });
};

TestData.createUpgrade = function(id, upgradeKey, tokenCounts)
{
   return UpgradeState.create(
   {
      id: id,
      upgradeKey: upgradeKey,
      tokenCounts: tokenCounts
   });
};

export default TestData;