import ActionCreator from "./ActionCreator.js";
import AgentQueryState from "./AgentQueryState.js";
import AgentResponseState from "./AgentResponseState.js";
import AgentState from "./AgentState.js";
import CombatState from "./CombatState.js";
import ExplosionState from "./ExplosionState.js";
import LaserBeamState from "./LaserBeamState.js";
import ManeuverState from "./ManeuverState.js";
import PilotState from "./PilotState.js";
import PositionState from "./PositionState.js";
import Reducer from "./Reducer.js";
import SquadState from "./SquadState.js";
import StatBonusesState from "./StatBonusesState.js";
import TestData from "./TestData.js";
import TokenCountsState from "./TokenCountsState.js";
import UpgradeState from "./UpgradeState.js";

QUnit.module("Reducer");

QUnit.test("addPilotTokenCount()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const pilotId = 2;
   const tokenKey = "evade";
   assert.equal(store.getState().pilotInstances[pilotId].tokenCounts[tokenKey], undefined);

   // Run.
   store.dispatch(ActionCreator.addPilotTokenCount(pilotId, tokenKey));

   // Verify.
   assert.equal(store.getState().pilotInstances[pilotId].tokenCounts[tokenKey], 1);

   // Run.
   store.dispatch(ActionCreator.addPilotTokenCount(pilotId, tokenKey));

   // Verify.
   assert.equal(store.getState().pilotInstances[pilotId].tokenCounts[tokenKey], 2);
});

QUnit.test("clearActivePilotId()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const queue = [1, 2, 3];
   store.dispatch(ActionCreator.setActivationQueue(queue));
   store.dispatch(ActionCreator.dequeueActivation());
   assert.equal(store.getState().activePilotId, 1);

   // Run.
   store.dispatch(ActionCreator.clearActivePilotId());

   // Verify.
   assert.equal(store.getState().activePilotId, undefined);
});

QUnit.test("clearAgentQuery()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const agentId = 1;
   const queryKey = "chooseShipAction";
   const payload = {};
   const agentQuery = AgentQueryState.create(
   {
      agentId: agentId,
      queryKey: queryKey,
      payload: payload
   });
   store.dispatch(ActionCreator.setAgentQuery(agentQuery));
   assert.ok(store.getState().agentQuery);

   // Run.
   store.dispatch(ActionCreator.clearAgentQuery());

   // Verify.
   assert.equal(store.getState().agentQuery, undefined);
});

QUnit.test("clearAgentResponse()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const agentId = 1;
   const responseKey = "chooseShipAction";
   const payload = {};
   const agentResponse = AgentResponseState.create(
   {
      agentId: agentId,
      responseKey: responseKey,
      payload: payload
   });
   store.dispatch(ActionCreator.setAgentResponse(agentResponse));
   assert.ok(store.getState().agentResponse);

   // Run.
   store.dispatch(ActionCreator.clearAgentResponse());

   // Verify.
   assert.equal(store.getState().agentResponse, undefined);
});

QUnit.test("clearDisplayExplosion()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const position = PositionState.create();
   const displayExplosion = ExplosionState.create(
   {
      position: position
   });
   store.dispatch(ActionCreator.setDisplayExplosion(displayExplosion));
   assert.ok(store.getState().displayExplosion);

   // Run.
   store.dispatch(ActionCreator.clearDisplayExplosion());

   // Verify.
   assert.equal(store.getState().displayExplosion, undefined);
});

QUnit.test("clearDisplayLaserBeam()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const color = "green";
   const fromPosition = store.getState().pilotInstances[1].position;
   const toPosition = store.getState().pilotInstances[3].position;
   const displayLaserBeam = LaserBeamState.create(
   {
      color: color,
      fromPosition: fromPosition,
      toPosition: toPosition
   });
   store.dispatch(ActionCreator.setDisplayLaserBeam(displayLaserBeam));
   assert.ok(store.getState().displayLaserBeam);

   // Run.
   store.dispatch(ActionCreator.clearDisplayLaserBeam());

   // Verify.
   assert.equal(store.getState().displayLaserBeam, undefined);
});

QUnit.test("clearDisplayManeuver()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const color = "red";
   const fromPosition = store.getState().pilotInstances[1].position;
   const maneuverKey = "straight1Standard1fw";
   const displayManeuver = ManeuverState.create(
   {
      color: color,
      fromPosition: fromPosition,
      maneuverKey: maneuverKey
   });
   store.dispatch(ActionCreator.setDisplayManeuver(displayManeuver));
   assert.ok(store.getState().displayManeuver);

   // Run.
   store.dispatch(ActionCreator.clearDisplayManeuver());

   // Verify.
   assert.equal(store.getState().displayManeuver, undefined);
});

QUnit.test("clearPilotTokenCount()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const pilotId = 2;
   const tokenKey = "evade";
   store.dispatch(ActionCreator.addPilotTokenCount(pilotId, tokenKey));
   assert.equal(store.getState().pilotInstances[pilotId].tokenCounts[tokenKey], 1);

   // Run.
   store.dispatch(ActionCreator.clearPilotTokenCount(pilotId, tokenKey));

   // Verify.
   assert.equal(store.getState().pilotInstances[pilotId].tokenCounts[tokenKey], undefined);
});

QUnit.test("dealCritical()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const pilotId = 1;
   assert.equal(store.getState().damageDeck.length, 33);
   assert.equal(store.getState().pilotInstances[pilotId].criticals.length, 1);

   // Run.
   store.dispatch(ActionCreator.dealCritical(pilotId));

   // Verify.
   assert.equal(store.getState().damageDeck.length, 32);
   const criticals = store.getState().pilotInstances[pilotId].criticals;
   assert.equal(criticals.length, 2);
   let i = 0;
   assert.equal(criticals[i++], 1);
   assert.equal(criticals[i++] > 0, true);
});

QUnit.test("dealDamage()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const pilotId = 1;
   assert.equal(store.getState().damageDeck.length, 33);
   assert.equal(store.getState().pilotInstances[pilotId].damages.length, 1);

   // Run.
   store.dispatch(ActionCreator.dealDamage(pilotId));

   // Verify.
   assert.equal(store.getState().damageDeck.length, 32);
   const damages = store.getState().pilotInstances[pilotId].damages;
   assert.equal(damages.length, 2);
   let i = 0;
   assert.equal(damages[i++], 3);
   assert.equal(damages[i++] > 0, true);
});

QUnit.test("dequeueActivation()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const queue = [1, 2, 3];
   store.dispatch(ActionCreator.setActivationQueue(queue));
   assert.equal(store.getState().activePilotId, undefined);
   assert.equal(store.getState().activationQueue.length, 3);

   // Run.
   store.dispatch(ActionCreator.dequeueActivation());

   // Verify.
   assert.equal(store.getState().activePilotId, 1);
   assert.equal(store.getState().activationQueue.length, 2);
});

QUnit.test("dequeueCombat()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const queue = [3, 2, 1];
   store.dispatch(ActionCreator.setCombatQueue(queue));
   assert.equal(store.getState().activePilotId, undefined);
   assert.equal(store.getState().combatQueue.length, 3);

   // Run.
   store.dispatch(ActionCreator.dequeueCombat());

   // Verify.
   assert.equal(store.getState().activePilotId, 3);
   assert.equal(store.getState().combatQueue.length, 2);
});

QUnit.test("dequeueEnd()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const queue = [1, 2, 3];
   store.dispatch(ActionCreator.setEndQueue(queue));
   assert.equal(store.getState().activePilotId, undefined);
   assert.equal(store.getState().endQueue.length, 3);

   // Run.
   store.dispatch(ActionCreator.dequeueEnd());

   // Verify.
   assert.equal(store.getState().activePilotId, 1);
   assert.equal(store.getState().endQueue.length, 2);
});

QUnit.test("dequeuePlanning()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const queue = [1, 2];
   store.dispatch(ActionCreator.setPlanningQueue(queue));
   assert.equal(store.getState().activeAgentId, undefined);
   assert.equal(store.getState().planningQueue.length, 2);

   // Run.
   store.dispatch(ActionCreator.dequeuePlanning());

   // Verify.
   assert.equal(store.getState().activeAgentId, 1);
   assert.equal(store.getState().planningQueue.length, 1);
});

QUnit.test("incrementRound()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   assert.equal(store.getState().round, 0);

   // Run.
   store.dispatch(ActionCreator.incrementRound());

   // Verify.
   assert.equal(store.getState().round, 1);
});

QUnit.test("movePilot()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const pilotId = 1;
   const toPosition = PositionState.create(
   {
      x: 100,
      y: 200,
      heading: 120
   });

   // Run.
   store.dispatch(ActionCreator.movePilot(pilotId, toPosition));

   // Verify.
   const result = store.getState().pilotInstances[pilotId].position;
   assert.ok(result);
   assert.equal(result.x, 100);
   assert.equal(result.y, 200);
   assert.equal(result.heading, 120);
});

QUnit.test("setActivationQueue()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const queue = [1, 2, 3];
   assert.equal(store.getState().activationQueue.length, 0);

   // Run.
   store.dispatch(ActionCreator.setActivationQueue(queue));

   // Verify.
   assert.equal(store.getState().activationQueue.length, 3);
});

QUnit.test("setActivePilotId()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const pilotId = 9;
   assert.equal(store.getState().activePilotId, undefined);

   // Run.
   store.dispatch(ActionCreator.setActivePilotId(pilotId));

   // Verify.
   assert.equal(store.getState().activePilotId, pilotId);
});

QUnit.test("setActiveCombatId()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const activeCombatId = 12;
   assert.equal(store.getState().activeCombatId, undefined);

   // Run.
   store.dispatch(ActionCreator.setActiveCombatId(activeCombatId));

   // Verify.
   assert.equal(store.getState().activeCombatId, activeCombatId);
});

QUnit.test("setAgentInstance()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const agentInstance = AgentState.create(
   {
      id: 3
   });

   // Run.
   store.dispatch(ActionCreator.setAgentInstance(agentInstance));

   // Verify.
   const result = store.getState().agentInstances;
   assert.equal(Object.keys(result).length, 3);
   let i = 1;
   assert.equal(result[i].id, 1);
   assert.equal(result[i++].name, "Imperial Agent");
   assert.equal(result[i].id, 2);
   assert.equal(result[i++].name, "Rebel Agent");
   assert.equal(result[i].id, 3);
   assert.equal(result[i++].name, "Agent 3");
});

QUnit.test("setAgentQuery()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const agentQuery = AgentQueryState.create(
   {
      agentId: 1,
      queryKey: "chooseShipAction",
      payload:
      {}
   });
   assert.equal(store.getState().agentQuery, undefined);

   // Run.
   store.dispatch(ActionCreator.setAgentQuery(agentQuery));

   // Verify.
   assert.equal(store.getState().agentQuery, agentQuery);
});

QUnit.test("setAgentResponse()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const agentResponse = AgentResponseState.create(
   {
      agentId: 1,
      responseKey: "chooseShipAction",
      payload:
      {}
   });
   assert.equal(store.getState().agentResponse, undefined);

   // Run.
   store.dispatch(ActionCreator.setAgentResponse(agentResponse));

   // Verify.
   assert.equal(store.getState().agentResponse, agentResponse);
});

QUnit.test("setAgentSquad()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const agentId = 1;
   const squadId = 12;

   // Run.
   store.dispatch(ActionCreator.setAgentSquad(agentId, squadId));

   // Verify.
   const result = store.getState().agentInstances[agentId].squad;
   assert.ok(result);
   assert.equal(result, squadId);
});

QUnit.test("setCombatAttackDice()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const combatId = 1;
   const combatInstance = CombatState.create(
   {
      id: combatId,
      attackId: 3,
      defenderId: 2,
   });
   store.dispatch(ActionCreator.setCombatInstance(combatInstance));
   assert.equal(store.getState().combatInstances[combatId].attackDiceKeys.length, 0);
   const attackDiceKeys = ["blank", "hit", "criticalHit"];

   // Run.
   store.dispatch(ActionCreator.setCombatAttackDice(combatId, attackDiceKeys));

   // Verify.
   assert.equal(store.getState().combatInstances[combatId].attackDiceKeys.length, attackDiceKeys.length);
   let i = 0;
   assert.equal(store.getState().combatInstances[combatId].attackDiceKeys[i], attackDiceKeys[i++]);
   assert.equal(store.getState().combatInstances[combatId].attackDiceKeys[i], attackDiceKeys[i++]);
   assert.equal(store.getState().combatInstances[combatId].attackDiceKeys[i], attackDiceKeys[i++]);
});

QUnit.test("setCombatCriticalDamage()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const combatId = 1;
   const combatInstance = CombatState.create(
   {
      id: combatId,
      attackId: 3,
      defenderId: 2,
   });
   store.dispatch(ActionCreator.setCombatInstance(combatInstance));
   assert.equal(store.getState().combatInstances[combatId].criticalDamage, 0);
   const criticalDamage = 5;

   // Run.
   store.dispatch(ActionCreator.setCombatCriticalDamage(combatId, criticalDamage));

   // Verify.
   assert.equal(store.getState().combatInstances[combatId].criticalDamage, criticalDamage);
});

QUnit.test("setCombatDefenseDice()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const combatId = 1;
   const combatInstance = CombatState.create(
   {
      id: combatId,
      attackId: 3,
      defenderId: 2,
   });
   store.dispatch(ActionCreator.setCombatInstance(combatInstance));
   assert.equal(store.getState().combatInstances[combatId].defenseDiceKeys.length, 0);
   const defenseDiceKeys = ["blank", "evade", "focus"];

   // Run.
   store.dispatch(ActionCreator.setCombatDefenseDice(combatId, defenseDiceKeys));

   // Verify.
   assert.equal(store.getState().combatInstances[combatId].defenseDiceKeys.length, defenseDiceKeys.length);
   let i = 0;
   assert.equal(store.getState().combatInstances[combatId].defenseDiceKeys[i], defenseDiceKeys[i++]);
   assert.equal(store.getState().combatInstances[combatId].defenseDiceKeys[i], defenseDiceKeys[i++]);
   assert.equal(store.getState().combatInstances[combatId].defenseDiceKeys[i], defenseDiceKeys[i++]);
});

QUnit.test("setCombatHitDamage()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const combatId = 1;
   const combatInstance = CombatState.create(
   {
      id: combatId,
      attackId: 3,
      defenderId: 2,
   });
   store.dispatch(ActionCreator.setCombatInstance(combatInstance));
   assert.equal(store.getState().combatInstances[combatId].hitDamage, 0);
   const hitDamage = 4;

   // Run.
   store.dispatch(ActionCreator.setCombatHitDamage(combatId, hitDamage));

   // Verify.
   assert.equal(store.getState().combatInstances[combatId].hitDamage, hitDamage);
});

QUnit.test("setCombatInstance()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const combatInstance = CombatState.create(
   {
      id: 1,
      attackerId: 3,
      defenderId: 2,
   });

   // Run.
   store.dispatch(ActionCreator.setCombatInstance(combatInstance));

   // Verify.
   const result = store.getState().combatInstances;
   assert.equal(Object.keys(result).length, 1);
   let i = 1;
   assert.equal(result[i].id, 1);
   assert.equal(result[i].attackerId, 3);
   assert.equal(result[i++].defenderId, 2);
});

QUnit.test("setCombatQueue()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const queue = [1, 2, 3];
   assert.equal(store.getState().combatQueue.length, 0);

   // Run.
   store.dispatch(ActionCreator.setCombatQueue(queue));

   // Verify.
   assert.equal(store.getState().combatQueue.length, 3);
});

QUnit.test("setCombatShieldDamage()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const combatId = 1;
   const combatInstance = CombatState.create(
   {
      id: combatId,
      attackId: 3,
      defenderId: 2,
   });
   store.dispatch(ActionCreator.setCombatInstance(combatInstance));
   assert.equal(store.getState().combatInstances[combatId].shieldDamage, 0);
   const shieldDamage = 4;

   // Run.
   store.dispatch(ActionCreator.setCombatShieldDamage(combatId, shieldDamage));

   // Verify.
   assert.equal(store.getState().combatInstances[combatId].shieldDamage, shieldDamage);
});

QUnit.test("setDisplayExplosion()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const position = PositionState.create();
   const displayExplosion = ExplosionState.create(
   {
      position: position,
   });

   // Run.
   store.dispatch(ActionCreator.setDisplayExplosion(displayExplosion));

   // Verify.
   const result = store.getState().displayExplosion;
   assert.ok(result);
   assert.equal(result.position, position);
   assert.equal(result.size, 40);
});

QUnit.test("setDisplayLaserBeam()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const color = "green";
   const fromPosition = store.getState().pilotInstances[1].position;
   const toPosition = store.getState().pilotInstances[3].position;
   const displayLaserBeam = LaserBeamState.create(
   {
      color: color,
      fromPosition: fromPosition,
      toPosition: toPosition
   });

   // Run.
   store.dispatch(ActionCreator.setDisplayLaserBeam(displayLaserBeam));

   // Verify.
   const result = store.getState().displayLaserBeam;
   assert.ok(result);
   assert.equal(result.color, color);
   assert.equal(result.fromPosition, fromPosition);
   assert.equal(result.isPrimary, true);
   assert.equal(result.toPosition, toPosition);
});

QUnit.test("setDisplayManeuver()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const color = "red";
   const fromPosition = store.getState().pilotInstances[1].position;
   const fromPolygon = [1, 2, 3, 4];
   const path = [5, 6, 7, 8];
   const toPolygon = [9, 10, 11, 12];
   const displayManeuver = ManeuverState.create(
   {
      color: color,
      fromPolygon: fromPolygon,
      fromPosition: fromPosition,
      path: path,
      toPolygon: toPolygon
   });

   // Run.
   store.dispatch(ActionCreator.setDisplayManeuver(displayManeuver));

   // Verify.
   const result = store.getState().displayManeuver;
   assert.ok(result);
   assert.equal(result.color, color);
   assert.equal(result.fromPolygon.join(), fromPolygon.join());
   assert.equal(result.fromPosition, fromPosition);
   assert.equal(result.path.join(), path.join());
   assert.equal(result.toPolygon.join(), toPolygon.join());
});

QUnit.test("setEndQueue()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const queue = [1, 2, 3];
   assert.equal(store.getState().endQueue.length, 0);

   // Run.
   store.dispatch(ActionCreator.setEndQueue(queue));

   // Verify.
   assert.equal(store.getState().endQueue.length, 3);
});

QUnit.test("setGameOver()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const isGameOver = true;
   assert.equal(store.getState().isGameOver, false);

   // Run.
   store.dispatch(ActionCreator.setGameOver(isGameOver));

   // Verify.
   assert.equal(store.getState().isGameOver, isGameOver);
});

QUnit.test("setPilotInstance()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const pilotInstance = PilotState.create(
   {
      id: 4,
      pilotKey: "hanSolo"
   });

   // Run.
   store.dispatch(ActionCreator.setPilotInstance(pilotInstance));

   // Verify.
   const result = store.getState().pilotInstances;
   assert.equal(Object.keys(result).length, 4);
   let i = 1;
   assert.equal(result[i].id, 1);
   assert.equal(result[i++].pilotKey, "maulerMithel");
   assert.equal(result[i].id, 2);
   assert.equal(result[i++].pilotKey, "darkCurse");
   assert.equal(result[i].id, 3);
   assert.equal(result[i++].pilotKey, "lukeSkywalker");
   assert.equal(result[i].id, 4);
   assert.equal(result[i++].pilotKey, "hanSolo");
});

QUnit.test("setPilotStatBonuses()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const pilotId = 1;
   let i = 1;
   const statBonuses = StatBonusesState.create(
   {
      agility: i++,
      energy: i++,
      hull: i++,
      pilotSkill: i++,
      primaryWeapon: i++,
      shield: i++
   });

   // Run.
   store.dispatch(ActionCreator.setPilotStatBonuses(pilotId, statBonuses));

   // Verify.
   const result = store.getState().pilotInstances[pilotId].statBonuses;
   assert.ok(result);
   let j = 1;
   assert.equal(result.agility, j++);
   assert.equal(result.energy, j++);
   assert.equal(result.hull, j++);
   assert.equal(result.pilotSkill, j++);
   assert.equal(result.primaryWeapon, j++);
   assert.equal(result.shield, j++);
});

QUnit.test("setPilotTokenCounts()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const pilotId = 1;
   const statBonuses = TokenCountsState.create(
   {
      evade: 1,
      focus: 2,
      shield: 3,
      stress: 4,
   });

   // Run.
   store.dispatch(ActionCreator.setPilotTokenCounts(pilotId, statBonuses));

   // Verify.
   const result = store.getState().pilotInstances[pilotId].tokenCounts;
   assert.ok(result);
   assert.equal(result.cloak, undefined);
   assert.equal(result.evade, 1);
   assert.equal(result.focus, 2);
   assert.equal(result.shield, 3);
   assert.equal(result.stress, 4);
   assert.equal(result.weaponsDisabled, undefined);
});

QUnit.test("setPlanningQueue()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const queue = [1, 2];
   assert.equal(store.getState().planningQueue.length, 0);

   // Run.
   store.dispatch(ActionCreator.setPlanningQueue(queue));

   // Verify.
   assert.equal(store.getState().planningQueue.length, 2);
});

QUnit.test("setSquadInstance()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const squadId = 12;
   const squadInstance = SquadState.create(
   {
      id: squadId,
      name: "Worlds #5",
      year: 2013,
      description: "B-Wing; X-Wings x2; Y-Wings x2"
   });

   // Run.
   store.dispatch(ActionCreator.setSquadInstance(squadInstance));

   // Verify.
   const result = store.getState().squadInstances[squadId];
   assert.ok(result);
   assert.equal(result.name, "Worlds #5");
   assert.equal(result.year, 2013);
});

QUnit.test("setSquadPilots()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const squadId = 12;
   const pilotIds = [4, 5];

   // Run.
   store.dispatch(ActionCreator.setSquadPilots(squadId, pilotIds));

   // Verify.
   const result = store.getState().squadInstances[squadId].pilots;
   assert.ok(result);
   assert.equal(result.length, pilotIds.length);
   assert.equal(result.join(), pilotIds.join());
});

QUnit.test("setUpgradeInstance()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const upgradeInstance = UpgradeState.create(
   {
      id: 4,
      upgradeKey: "veteranInstincts"
   });

   // Run.
   store.dispatch(ActionCreator.setUpgradeInstance(upgradeInstance));

   // Verify.
   const result = store.getState().upgradeInstances;
   assert.equal(Object.keys(result).length, 4);
   let i = 1;
   assert.equal(result[i].id, 1);
   assert.equal(result[i++].upgradeKey, "marksmanship");
   assert.equal(result[i].id, 2);
   assert.equal(result[i++].upgradeKey, "protonTorpedoes");
   assert.equal(result[i].id, 3);
   assert.equal(result[i++].upgradeKey, "r2D2_astromech");
   assert.equal(result[i].id, 4);
   assert.equal(result[i++].upgradeKey, "veteranInstincts");
});

QUnit.test("setUpgradeTokenCounts()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const upgradeId = 1;
   const statBonuses = TokenCountsState.create(
   {
      evade: 1,
      focus: 2,
      shield: 3,
      stress: 4,
   });

   // Run.
   store.dispatch(ActionCreator.setUpgradeTokenCounts(upgradeId, statBonuses));

   // Verify.
   const result = store.getState().upgradeInstances[upgradeId].tokenCounts;
   assert.ok(result);
   assert.equal(result.cloak, undefined);
   assert.equal(result.evade, 1);
   assert.equal(result.focus, 2);
   assert.equal(result.shield, 3);
   assert.equal(result.stress, 4);
   assert.equal(result.weaponsDisabled, undefined);
});

const ReducerTest = {};
export default ReducerTest;