import ActionCreator from "./ActionCreator.js";
import ActionType from "./ActionType.js";
import AgentQueryState from "./AgentQueryState.js";
import AgentResponseState from "./AgentResponseState.js";
import ExplosionState from "./ExplosionState.js";
import LaserBeamState from "./LaserBeamState.js";
import ManeuverState from "./ManeuverState.js";
import PositionState from "./PositionState.js";

QUnit.module("ActionCreator");

QUnit.test("all action types", function(assert)
{
   // Setup.
   const actionTypeKeys = Object.getOwnPropertyNames(ActionType);
   assert.equal(actionTypeKeys.length, 50);

   // Run / Verify.
   actionTypeKeys.forEach(key =>
   {
      assert.ok(ActionCreator[ActionType[key]], "actionType = " + key + " " + ActionType[key]);
   });
});

QUnit.test("addPilotTokenCount()", function(assert)
{
   // Setup.
   const pilotId = 3;
   const tokenKey = "evade";
   const value = 12;

   // Run.
   const result = ActionCreator.addPilotTokenCount(pilotId, tokenKey, value);

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.ADD_PILOT_TOKEN_COUNT);
   assert.equal(result.pilotId, pilotId);
   assert.equal(result.tokenKey, tokenKey);
   assert.equal(result.value, value);
});

QUnit.test("clearActiveAgentId()", function(assert)
{
   // Setup.

   // Run.
   const result = ActionCreator.clearActiveAgentId();

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.CLEAR_ACTIVE_AGENT_ID);
});

QUnit.test("clearActiveCombatId()", function(assert)
{
   // Setup.

   // Run.
   const result = ActionCreator.clearActiveCombatId();

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.CLEAR_ACTIVE_COMBAT_ID);
});

QUnit.test("clearActivePilotId()", function(assert)
{
   // Setup.

   // Run.
   const result = ActionCreator.clearActivePilotId();

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.CLEAR_ACTIVE_PILOT_ID);
});

QUnit.test("clearAgentResponse()", function(assert)
{
   // Setup.

   // Run.
   const result = ActionCreator.clearAgentResponse();

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.CLEAR_AGENT_RESPONSE);
});

QUnit.test("clearDisplayExplosion()", function(assert)
{
   // Setup.

   // Run.
   const result = ActionCreator.clearDisplayExplosion();

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.CLEAR_DISPLAY_EXPLOSION);
});

QUnit.test("clearDisplayLaserBeam()", function(assert)
{
   // Setup.

   // Run.
   const result = ActionCreator.clearDisplayLaserBeam();

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.CLEAR_DISPLAY_LASER_BEAM);
});

QUnit.test("clearDisplayManeuver()", function(assert)
{
   // Setup.

   // Run.
   const result = ActionCreator.clearDisplayManeuver();

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.CLEAR_DISPLAY_MANEUVER);
});

QUnit.test("clearPilotTokenCount()", function(assert)
{
   // Setup.
   const pilotId = 3;
   const tokenKey = "evade";

   // Run.
   const result = ActionCreator.clearPilotTokenCount(pilotId, tokenKey);

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.CLEAR_PILOT_TOKEN_COUNT);
   assert.equal(result.pilotId, pilotId);
   assert.equal(result.tokenKey, tokenKey);
});

QUnit.test("dealCritical()", function(assert)
{
   // Setup.

   // Run.
   const result = ActionCreator.dealCritical();

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.DEAL_CRITICAL);
});

QUnit.test("dealDamage()", function(assert)
{
   // Setup.

   // Run.
   const result = ActionCreator.dealDamage();

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.DEAL_DAMAGE);
});

QUnit.test("dequeueActivation()", function(assert)
{
   // Setup.

   // Run.
   const result = ActionCreator.dequeueActivation();

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.DEQUEUE_ACTIVATION);
});

QUnit.test("dequeueCombat()", function(assert)
{
   // Setup.

   // Run.
   const result = ActionCreator.dequeueCombat();

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.DEQUEUE_COMBAT);
});

QUnit.test("dequeueEnd()", function(assert)
{
   // Setup.

   // Run.
   const result = ActionCreator.dequeueEnd();

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.DEQUEUE_END);
});

QUnit.test("dequeuePlanning()", function(assert)
{
   // Setup.

   // Run.
   const result = ActionCreator.dequeuePlanning();

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.DEQUEUE_PLANNING);
});

QUnit.test("movePilot()", function(assert)
{
   // Setup.
   const pilotId = 1;
   const toPosition = PositionState.create();

   // Run.
   const result = ActionCreator.movePilot(pilotId, toPosition);

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.MOVE_PILOT);
   assert.equal(result.pilotId, pilotId);
   assert.equal(result.toPosition, toPosition);
});

QUnit.test("setActivationQueue()", function(assert)
{
   // Setup.
   const queue = [1, 2, 3];

   // Run.
   const result = ActionCreator.setActivationQueue(queue);

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.SET_ACTIVATION_QUEUE);
   assert.equal(result.activationQueue, queue);
});

QUnit.test("setActiveCombatId()", function(assert)
{
   // Setup.
   const activeCombatId = 12;

   // Run.
   const result = ActionCreator.setActiveCombatId(activeCombatId);

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.SET_ACTIVE_COMBAT_ID);
   assert.equal(result.activeCombatId, activeCombatId);
});

QUnit.test("setAgentQuery()", function(assert)
{
   // Setup.
   const agentId = 1;
   const queryKey = "chooseShipAction";
   const payload = {};
   const agentQuery = AgentQueryState.create(
   {
      agentId: agentId,
      queryKey: queryKey,
      payload: payload
   });

   // Run.
   const result = ActionCreator.setAgentQuery(agentQuery);

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.SET_AGENT_QUERY);
   assert.equal(result.agentQuery.agentId, agentId);
   assert.equal(result.agentQuery.queryKey, queryKey);
   assert.ok(result.agentQuery.queryKey);
});

QUnit.test("setAgentResponse()", function(assert)
{
   // Setup.
   const agentId = 1;
   const responseKey = "chooseShipAction";
   const payload = {};
   const agentResponse = AgentResponseState.create(
   {
      agentId: agentId,
      responseKey: responseKey,
      payload: payload
   });

   // Run.
   const result = ActionCreator.setAgentResponse(agentResponse);

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.SET_AGENT_RESPONSE);
   assert.equal(result.agentResponse.agentId, agentId);
   assert.equal(result.agentResponse.responseKey, responseKey);
   assert.ok(result.agentResponse.payload);
});

QUnit.test("setCombatAttackDice()", function(assert)
{
   // Setup.
   const combatId = 12;
   const attackDiceKeys = [1, 2, 3];

   // Run.
   const result = ActionCreator.setCombatAttackDice(combatId, attackDiceKeys);

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.SET_COMBAT_ATTACK_DICE);
   assert.equal(result.combatId, combatId);
   assert.equal(result.attackDiceKeys, attackDiceKeys);
});

QUnit.test("setCombatCriticalDamage()", function(assert)
{
   // Setup.
   const combatId = 12;
   const criticalDamage = 5;

   // Run.
   const result = ActionCreator.setCombatCriticalDamage(combatId, criticalDamage);

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.SET_COMBAT_CRITICAL_DAMAGE);
   assert.equal(result.combatId, combatId);
   assert.equal(result.criticalDamage, criticalDamage);
});

QUnit.test("setCombatDefenseDice()", function(assert)
{
   // Setup.
   const combatId = 12;
   const defenseDiceKeys = [1, 2];

   // Run.
   const result = ActionCreator.setCombatDefenseDice(combatId, defenseDiceKeys);

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.SET_COMBAT_DEFENSE_DICE);
   assert.equal(result.combatId, combatId);
   assert.equal(result.defenseDiceKeys, defenseDiceKeys);
});

QUnit.test("setCombatHitDamage()", function(assert)
{
   // Setup.
   const combatId = 12;
   const hitDamage = 4;

   // Run.
   const result = ActionCreator.setCombatHitDamage(combatId, hitDamage);

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.SET_COMBAT_HIT_DAMAGE);
   assert.equal(result.combatId, combatId);
   assert.equal(result.hitDamage, hitDamage);
});

QUnit.test("setCombatInstance()", function(assert)
{
   // Setup.
   const combatInstance = 1;

   // Run.
   const result = ActionCreator.setCombatInstance(combatInstance);

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.SET_COMBAT_INSTANCE);
   assert.equal(result.combatInstance, combatInstance);
});

QUnit.test("setCombatQueue()", function(assert)
{
   // Setup.
   const queue = [1, 2, 3];

   // Run.
   const result = ActionCreator.setCombatQueue(queue);

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.SET_COMBAT_QUEUE);
   assert.equal(result.combatQueue, queue);
});

QUnit.test("setCombatShieldDamage()", function(assert)
{
   // Setup.
   const combatId = 12;
   const shieldDamage = 4;

   // Run.
   const result = ActionCreator.setCombatShieldDamage(combatId, shieldDamage);

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.SET_COMBAT_SHIELD_DAMAGE);
   assert.equal(result.combatId, combatId);
   assert.equal(result.shieldDamage, shieldDamage);
});

QUnit.test("setDisplayExplosion()", function(assert)
{
   // Setup.
   const position = 1;
   const displayExplosion = ExplosionState.create(
   {
      position: position
   });

   // Run.
   const result = ActionCreator.setDisplayExplosion(displayExplosion);

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.SET_DISPLAY_EXPLOSION);
   assert.equal(result.displayExplosion.position.x, position.x);
   assert.equal(result.displayExplosion.position.y, position.y);
   assert.equal(result.displayExplosion.position.heading, position.heading);
   assert.equal(result.displayExplosion.size, 40);
});

QUnit.test("setDisplayLaserBeam()", function(assert)
{
   // Setup.
   const color = 1;
   const fromPosition = 2;
   const toPosition = 3;
   const displayLaserBeam = LaserBeamState.create(
   {
      color: color,
      fromPosition: fromPosition,
      toPosition: toPosition
   });

   // Run.
   const result = ActionCreator.setDisplayLaserBeam(displayLaserBeam);

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.SET_DISPLAY_LASER_BEAM);
   assert.equal(result.displayLaserBeam.color, color);
   assert.equal(result.displayLaserBeam.fromPosition, fromPosition);
   assert.equal(result.displayLaserBeam.isPrimary, true);
   assert.equal(result.displayLaserBeam.toPosition, toPosition);
});

QUnit.test("setDisplayManeuver()", function(assert)
{
   // Setup.
   const color = 1;
   const fromPosition = 2;
   const fromPolygon = 3;
   const path = 4;
   const toPolygon = 5;
   const displayManeuver = ManeuverState.create(
   {
      color: color,
      fromPolygon: fromPolygon,
      fromPosition: fromPosition,
      path: path,
      toPolygon: toPolygon
   });

   // Run.
   const result = ActionCreator.setDisplayManeuver(displayManeuver);

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.SET_DISPLAY_MANEUVER);
   assert.equal(result.displayManeuver.color, color);
   assert.equal(result.displayManeuver.fromPolygon, fromPolygon);
   assert.equal(result.displayManeuver.fromPosition, fromPosition);
   assert.equal(result.displayManeuver.path, path);
   assert.equal(result.displayManeuver.toPolygon, toPolygon);
});

QUnit.test("setEndQueue()", function(assert)
{
   // Setup.
   const queue = [1, 2, 3];

   // Run.
   const result = ActionCreator.setEndQueue(queue);

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.SET_END_QUEUE);
   assert.equal(result.endQueue, queue);
});

QUnit.test("setGameOver()", function(assert)
{
   // Setup.
   const isGameOver = true;

   // Run.
   const result = ActionCreator.setGameOver(isGameOver);

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.SET_GAME_OVER);
   assert.equal(result.isGameOver, isGameOver);
});

QUnit.test("setPilotInstance()", function(assert)
{
   // Setup.
   const pilotInstance = 1;

   // Run.
   const result = ActionCreator.setPilotInstance(pilotInstance);

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.SET_PILOT_INSTANCE);
   assert.equal(result.pilotInstance, pilotInstance);
});

QUnit.test("setPlanningQueue()", function(assert)
{
   // Setup.
   const queue = [1, 2];

   // Run.
   const result = ActionCreator.setPlanningQueue(queue);

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.SET_PLANNING_QUEUE);
   assert.equal(result.planningQueue, queue);
});

QUnit.test("setSquadInstance()", function(assert)
{
   // Setup.
   const squadInstance = 1;

   // Run.
   const result = ActionCreator.setSquadInstance(squadInstance);

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.SET_SQUAD_INSTANCE);
   assert.equal(result.squadInstance, squadInstance);
});

QUnit.test("setSquadPilots()", function(assert)
{
   // Setup.
   const squadId = 5;
   const pilotIds = 1;

   // Run.
   const result = ActionCreator.setSquadPilots(squadId, pilotIds);

   // Verify.
   assert.ok(result);
   assert.equal(result.type, ActionType.SET_SQUAD_PILOTS);
   assert.equal(result.squadId, squadId);
   assert.equal(result.pilotIds, pilotIds);
});

const ActionCreatorTest = {};
export default ActionCreatorTest;