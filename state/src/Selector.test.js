import CombatState from "./CombatState.js";
import Selector from "./Selector.js";
import PositionState from "./PositionState.js";
import TestData from "./TestData.js";

QUnit.module("Selector");

QUnit.test("activationQueue()", assert => {
  // Setup.
  const gameState = TestData.createGameState();

  // Run.
  const result = Selector.activationQueue(gameState);

  // Verify.
  assert.ok(result);
  assert.equal(Array.isArray(result), true);
  assert.equal(result.length, 0);
});

QUnit.test("activePilotId()", assert => {
  // Setup.
  const gameState = R.assoc("activePilotId", 1, TestData.createGameState());

  // Run.
  const result = Selector.activePilotId(gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result, 1);
});

QUnit.test("activePilotInstance()", assert => {
  // Setup.
  const gameState = R.assoc("activePilotId", 1, TestData.createGameState());

  // Run.
  const result = Selector.activePilotInstance(gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.id, 1);
  assert.equal(result.pilotKey, "maulerMithel");
});

QUnit.test("agentInstance() 1", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const agentId = 1;

  // Run.
  const result = Selector.agentInstance(agentId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.id, agentId);
  assert.equal(result.name, "Imperial Agent");
  assert.equal(result.strategy, "SimpleAgentStrategy");
});

QUnit.test("agentInstance() 2", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const agentId = 2;

  // Run.
  const result = Selector.agentInstance(agentId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.id, agentId);
  assert.equal(result.name, "Rebel Agent");
  assert.equal(result.strategy, "SimpleAgentStrategy");
});

QUnit.test("agentInstanceByPilot() 2", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const pilotId = 2;

  // Run.
  const result = Selector.agentInstanceByPilot(pilotId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.id, 1);
  assert.equal(result.name, "Imperial Agent");
  assert.equal(result.strategy, "SimpleAgentStrategy");
});

QUnit.test("agentInstanceByPilot() 3", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const pilotId = 3;

  // Run.
  const result = Selector.agentInstanceByPilot(pilotId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.id, 2);
  assert.equal(result.name, "Rebel Agent");
  assert.equal(result.strategy, "SimpleAgentStrategy");
});

QUnit.test("agentInstanceBySquad() 1", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const squadId = 1;

  // Run.
  const result = Selector.agentInstanceBySquad(squadId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.id, 1);
  assert.equal(result.name, "Imperial Agent");
  assert.equal(result.strategy, "SimpleAgentStrategy");
});

QUnit.test("agentInstances()", assert => {
  // Setup.
  const gameState = TestData.createGameState();

  // Run.
  const result = Selector.agentInstances(gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 2);
  assert.equal(result[0].id, 1);
  assert.equal(result[1].id, 2);
});

QUnit.test("agentQuery()", assert => {
  // Setup.
  let gameState = TestData.createGameState();

  // Run.
  let result = Selector.agentQuery(gameState);

  // Verify.
  assert.equal(result, undefined);

  // Run.
  const agentId = 1;
  const queryKey = "chooseShipAction";
  const payload = {};
  const agentQuery = {
    agentId,
    queryKey,
    payload
  };
  gameState = R.assoc("agentQuery", agentQuery, gameState);
  result = Selector.agentQuery(gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.agentId, agentId);
  assert.equal(result.queryKey, "chooseShipAction");
  assert.equal(result.payload, payload);
});

QUnit.test("agentResponse()", assert => {
  // Setup.
  let gameState = TestData.createGameState();

  // Run.
  let result = Selector.agentResponse(gameState);

  // Verify.
  assert.equal(result, undefined);

  // Run.
  const agentId = 1;
  const responseKey = "chooseShipAction";
  const payload = {};
  const agentResponse = {
    agentId,
    responseKey,
    payload
  };
  gameState = R.assoc("agentResponse", agentResponse, gameState);
  result = Selector.agentResponse(gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.agentId, agentId);
  assert.equal(result.responseKey, "chooseShipAction");
  assert.equal(result.payload, payload);
});

QUnit.test("attackDiceKeysByCombat() 3", assert => {
  // Setup.
  const combatId = 3;
  const attackerId = 3;
  const defenderId = 2;
  const attackDiceKeys = [1, 2, 3];
  const defenseDiceKeys = [4, 5];
  const combatInstance = CombatState.create({
    id: combatId,
    attackerId,
    defenderId,
    attackDiceKeys,
    defenseDiceKeys
  });
  const gameState = R.assocPath(
    ["combatInstances", combatId],
    combatInstance,
    TestData.createGameState()
  );

  // Run.
  const result = Selector.attackDiceKeysByCombat(combatId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, attackDiceKeys.length);
  assert.equal(result[0], attackDiceKeys[0]);
  assert.equal(result[1], attackDiceKeys[1]);
  assert.equal(result[2], attackDiceKeys[2]);
});

QUnit.test("bonusByPilotStat() 1 pilotSkill", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const pilotId = 1;
  const statKey = "pilotSkill";

  // Run.
  const result = Selector.bonusByPilotStat(pilotId, statKey, gameState);

  // Verify.
  assert.equal(result, 0);
});

QUnit.test("bonusByPilotStat() 3 hull", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const pilotId = 3;
  const statKey = "hull";

  // Run.
  const result = Selector.bonusByPilotStat(pilotId, statKey, gameState);

  // Verify.
  assert.equal(result, 1);
});

QUnit.test("bonusesByPilot() 3", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const pilotId = 3;

  // Run.
  const result = Selector.bonusesByPilot(pilotId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.agility, undefined);
  assert.equal(result.energy, undefined);
  assert.equal(result.hull, 1);
  assert.equal(result.pilotSkill, undefined);
  assert.equal(result.primaryWeapon, undefined);
  assert.equal(result.shield, undefined);
});

QUnit.test("combatCriticalDamage()", assert => {
  // Setup.
  const combatId = 4;
  const combatInstance = CombatState.create({
    id: combatId,
    attackerId: 3,
    defenderId: 2,
    criticalDamage: 12
  });
  const gameState = R.assocPath(
    ["combatInstances", combatId],
    combatInstance,
    TestData.createGameState()
  );

  // Run.
  const result = Selector.combatCriticalDamage(combatId, gameState);

  // Verify.
  assert.equal(result, 12);
});

QUnit.test("combatHitDamage()", assert => {
  // Setup.
  const combatId = 4;
  const combatInstance = CombatState.create({
    id: combatId,
    attackerId: 3,
    defenderId: 2,
    hitDamage: 6
  });
  const gameState = R.assocPath(
    ["combatInstances", combatId],
    combatInstance,
    TestData.createGameState()
  );

  // Run.
  const result = Selector.combatHitDamage(combatId, gameState);

  // Verify.
  assert.equal(result, 6);
});

QUnit.test("combatInstance() 3", assert => {
  // Setup.
  const combatId = 3;
  const attackerId = 3;
  const defenderId = 2;
  const combatInstance = CombatState.create({
    id: combatId,
    attackerId,
    defenderId
  });
  const gameState = R.assocPath(
    ["combatInstances", combatId],
    combatInstance,
    TestData.createGameState()
  );

  // Run.
  const result = Selector.combatInstance(combatId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.id, combatId);
  assert.equal(result.attackerId, attackerId);
  assert.equal(result.defenderId, defenderId);
});

QUnit.test("combatQueue()", assert => {
  // Setup.
  const gameState = TestData.createGameState();

  // Run.
  const result = Selector.combatQueue(gameState);

  // Verify.
  assert.ok(result);
  assert.equal(Array.isArray(result), true);
  assert.equal(result.length, 0);
});

QUnit.test("combatShieldDamage()", assert => {
  // Setup.
  const combatId = 4;
  const combatInstance = CombatState.create({
    id: combatId,
    attackerId: 3,
    defenderId: 2,
    shieldDamage: 3
  });
  const gameState = R.assocPath(
    ["combatInstances", combatId],
    combatInstance,
    TestData.createGameState()
  );

  // Run.
  const result = Selector.combatShieldDamage(combatId, gameState);

  // Verify.
  assert.equal(result, 3);
});

QUnit.test("conditionInstance() 1", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const conditionId = 1;

  // Run.
  const result = Selector.conditionInstance(conditionId, gameState);

  // Verify.
  assert.equal(result, undefined);
});

QUnit.test("countByPilotToken() 1 ion", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const pilotId = 1;
  const tokenKey = "ion";

  // Run.
  const result = Selector.countByPilotToken(pilotId, tokenKey, gameState);

  // Verify.
  assert.equal(result, 0);
});

QUnit.test("countByPilotToken() 3 shield", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const pilotId = 3;
  const tokenKey = "shield";

  // Run.
  const result = Selector.countByPilotToken(pilotId, tokenKey, gameState);

  // Verify.
  assert.equal(result, 2);
});

QUnit.test("countByUpgradeToken() 1 ion", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const tokenKey = "ion";
  const upgradeId = 1;

  // Run.
  const result = Selector.countByUpgradeToken(upgradeId, tokenKey, gameState);

  // Verify.
  assert.equal(result, 0);
});

QUnit.test("countsByPilot() 3", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const pilotId = 3;

  // Run.
  const result = Selector.countsByPilot(pilotId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.cloak, undefined);
  assert.equal(result.energy, undefined);
  assert.equal(result.evade, undefined);
  assert.equal(result.focus, undefined);
  assert.equal(result.ion, undefined);
  assert.equal(result.ordnance, undefined);
  assert.equal(result.reinforce, undefined);
  assert.equal(result.shield, 2);
  assert.equal(result.stress, undefined);
  assert.equal(result.tractorBeam, undefined);
  assert.equal(result.weaponsDisabled, undefined);
});

QUnit.test("countsByUpgrade() 1", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const upgradeId = 1;

  // Run.
  const result = Selector.countsByUpgrade(upgradeId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.cloak, undefined);
  assert.equal(result.energy, undefined);
  assert.equal(result.evade, undefined);
  assert.equal(result.focus, undefined);
  assert.equal(result.ion, undefined);
  assert.equal(result.ordnance, undefined);
  assert.equal(result.reinforce, undefined);
  assert.equal(result.shield, undefined);
  assert.equal(result.stress, undefined);
  assert.equal(result.tractorBeam, undefined);
  assert.equal(result.weaponsDisabled, undefined);
});

QUnit.test("criticalIdsByPilot() 1", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const pilotId = 1;

  // Run.
  const result = Selector.criticalIdsByPilot(pilotId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 1);
  assert.equal(result[0], 1);
});

QUnit.test("damageDeck()", assert => {
  // Setup.
  const gameState = TestData.createGameState();

  // Run.
  const result = Selector.damageDeck(gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 33);
});

QUnit.test("damageDiscardPile()", assert => {
  // Setup.
  const gameState = TestData.createGameState();

  // Run.
  const result = Selector.damageDiscardPile(gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 0);
});

QUnit.test("damageIdsByPilot() 1", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const pilotId = 1;

  // Run.
  const result = Selector.damageIdsByPilot(pilotId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 1);
  assert.equal(result[0], 3);
});

QUnit.test("damageInstance() 1", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const damageId = 1;

  // Run.
  const result = Selector.damageInstance(damageId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.id, damageId);
  assert.equal(result.damageKey, "blindedPilot");
});

QUnit.test("damageInstancesByIds()", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const damageIds = [1, 3];

  // Run.
  const result = Selector.damageInstancesByIds(damageIds, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 2);
  assert.equal(result[0].id, 1);
  assert.equal(result[0].damageKey, "blindedPilot");
  assert.equal(result[1].id, 3);
  assert.equal(result[1].damageKey, "consoleFire");
});

QUnit.test("damageInstancesByPilot() 1", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const pilotId = 1;

  // Run.
  const result = Selector.damageInstancesByPilot(pilotId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 3);
  assert.equal(result[0].damageKey, "consoleFire");
});

QUnit.test("damageInstancesByPilot() 3", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const pilotId = 3;

  // Run.
  const result = Selector.damageInstancesByPilot(pilotId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 0);
});

QUnit.test("defenseDiceKeysByCombat() 3", assert => {
  // Setup.
  const combatId = 3;
  const attackerId = 3;
  const defenderId = 2;
  const attackDiceKeys = [1, 2, 3];
  const defenseDiceKeys = [4, 5];
  const combatInstance = CombatState.create({
    id: combatId,
    attackerId,
    defenderId,
    attackDiceKeys,
    defenseDiceKeys
  });
  const gameState = R.assocPath(
    ["combatInstances", combatId],
    combatInstance,
    TestData.createGameState()
  );

  // Run.
  const result = Selector.defenseDiceKeysByCombat(combatId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, defenseDiceKeys.length);
  assert.equal(result[0], defenseDiceKeys[0]);
  assert.equal(result[1], defenseDiceKeys[1]);
});

QUnit.test("endQueue()", assert => {
  // Setup.
  const gameState = TestData.createGameState();

  // Run.
  const result = Selector.endQueue(gameState);

  // Verify.
  assert.ok(result);
  assert.equal(Array.isArray(result), true);
  assert.equal(result.length, 0);
});

QUnit.test("maneuverByPilot() 1", assert => {
  // Setup.
  const gameState = R.assocPath(
    ["pilotToManeuver", 1],
    "myBestManeuver",
    TestData.createGameState()
  );
  const pilotId = 1;

  // Run.
  const result = Selector.maneuverByPilot(pilotId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result, "myBestManeuver");
});

QUnit.test("nextAgentId()", assert => {
  // Setup.
  const gameState = TestData.createGameState();

  // Run.
  const result = Selector.nextAgentId(gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result, 3);
});

QUnit.test("nextCombatId()", assert => {
  // Setup.
  const gameState = TestData.createGameState();

  // Run.
  const result = Selector.nextCombatId(gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result, 1);
});

QUnit.test("nextConditionId()", assert => {
  // Setup.
  const gameState = TestData.createGameState();

  // Run.
  const result = Selector.nextConditionId(gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result, 1);
});

QUnit.test("nextDamageId()", assert => {
  // Setup.
  const gameState = TestData.createGameState();

  // Run.
  const result = Selector.nextDamageId(gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result, 34);
});

QUnit.test("nextPilotId()", assert => {
  // Setup.
  const gameState = TestData.createGameState();

  // Run.
  const result = Selector.nextPilotId(gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result, 4);
});

QUnit.test("nextSquadId()", assert => {
  // Setup.
  const gameState = TestData.createGameState();

  // Run.
  const result = Selector.nextSquadId(gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result, 3);
});

QUnit.test("nextUpgradeId()", assert => {
  // Setup.
  const gameState = TestData.createGameState();

  // Run.
  const result = Selector.nextUpgradeId(gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result, 4);
});

QUnit.test("phaseKey()", assert => {
  // Setup.
  const gameState = TestData.createGameState();

  // Run.
  const result = Selector.phaseKey(gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result, "planningStart");
});

QUnit.test("pilotIdsByAgent() 1", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const agentId = 1;

  // Run.
  const result = Selector.pilotIdsByAgent(agentId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 2);
  assert.equal(result[0], 1);
  assert.equal(result[1], 2);
});

QUnit.test("pilotIdsByAgent() 2", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const agentId = 2;

  // Run.
  const result = Selector.pilotIdsByAgent(agentId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 1);
  assert.equal(result[0], 3);
});

QUnit.test("pilotIdsBySquad() 1", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const squadId = 1;

  // Run.
  const result = Selector.pilotIdsBySquad(squadId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 2);
  assert.equal(result[0], 1);
  assert.equal(result[1], 2);
});

QUnit.test("pilotIdsBySquad() 2", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const squadId = 2;

  // Run.
  const result = Selector.pilotIdsBySquad(squadId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 1);
  assert.equal(result[0], 3);
});

QUnit.test("pilotInstance() 1", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const pilotId = 1;

  // Run.
  const result = Selector.pilotInstance(pilotId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.id, pilotId);
  assert.equal(result.pilotKey, "maulerMithel");
});

QUnit.test("pilotInstance() 3", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const pilotId = 3;

  // Run.
  const result = Selector.pilotInstance(pilotId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.id, pilotId);
  assert.equal(result.pilotKey, "lukeSkywalker");
});

QUnit.test("pilotInstances()", assert => {
  // Setup.
  const gameState = TestData.createGameState();

  // Run.
  const result = Selector.pilotInstances(gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 3);
  assert.equal(result[0].pilotKey, "maulerMithel");
  assert.equal(result[1].pilotKey, "darkCurse");
  assert.equal(result[2].pilotKey, "lukeSkywalker");
});

QUnit.test("pilotInstancesByAgent() 1", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const agentId = 1;

  // Run.
  const result = Selector.pilotInstancesByAgent(agentId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 2);
  assert.equal(result[0].id, 1);
  assert.equal(result[0].pilotKey, "maulerMithel");
  assert.equal(result[1].id, 2);
  assert.equal(result[1].pilotKey, "darkCurse");
});

QUnit.test("pilotInstancesByAgent() 2", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const agentId = 2;

  // Run.
  const result = Selector.pilotInstancesByAgent(agentId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 3);
  assert.equal(result[0].pilotKey, "lukeSkywalker");
});

QUnit.test("pilotInstancesByIds() 1", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const pilotIds = [2, 3];

  // Run.
  const result = Selector.pilotInstancesByIds(pilotIds, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 2);
  assert.equal(result[0].id, 2);
  assert.equal(result[0].pilotKey, "darkCurse");
  assert.equal(result[1].id, 3);
  assert.equal(result[1].pilotKey, "lukeSkywalker");
});

QUnit.test("pilotInstancesBySquad() 1", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const squadId = 1;

  // Run.
  const result = Selector.pilotInstancesBySquad(squadId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 2);
  assert.equal(result[0].id, 1);
  assert.equal(result[0].pilotKey, "maulerMithel");
  assert.equal(result[1].id, 2);
  assert.equal(result[1].pilotKey, "darkCurse");
});

QUnit.test("pilotToManeuver()", assert => {
  // Setup.
  const pilotToManeuver = {
    1: "myManeuver1",
    2: "myManeuver2",
    3: "myManeuver3"
  };
  const gameState = R.assoc("pilotToManeuver", pilotToManeuver, TestData.createGameState());

  // Run.
  const result = Selector.pilotToManeuver(gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result, pilotToManeuver);
});

QUnit.test("planningQueue()", assert => {
  // Setup.
  const gameState = TestData.createGameState();

  // Run.
  const result = Selector.planningQueue(gameState);

  // Verify.
  assert.ok(result);
  assert.equal(Array.isArray(result), true);
  assert.equal(result.length, 0);
});

QUnit.test("playArea()", assert => {
  // Setup.
  const gameState = TestData.createGameState();

  // Run.
  const result = Selector.playArea(gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.scale, 1.0);
  assert.equal(result.zoomInEnabled, false);
  assert.equal(result.zoomOutEnabled, true);
});

QUnit.test("playFormatKey()", assert => {
  // Setup.
  const gameState = TestData.createGameState();

  // Run.
  const result = Selector.playFormatKey(gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result, "standard");
});

QUnit.test("positionByPilot() 1", assert => {
  // Setup.
  let gameState = TestData.createGameState();
  const pilotId = 1;
  const toPosition = PositionState.create({
    x: 100,
    y: 200,
    heading: 120
  });
  gameState = R.assocPath(["pilotInstances", pilotId, "position"], toPosition, gameState);

  // Run.
  const result = Selector.positionByPilot(pilotId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.x, 100);
  assert.equal(result.y, 200);
  assert.equal(result.heading, 120);
});

QUnit.test("round()", assert => {
  // Setup.
  const gameState = TestData.createGameState();

  // Run.
  const result = Selector.round(gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result, 1);
});

QUnit.test("squadIdByAgent() 1", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const agentId = 1;

  // Run.
  const result = Selector.squadIdByAgent(agentId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result, 1);
});

QUnit.test("squadIdByAgent() 2", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const agentId = 2;

  // Run.
  const result = Selector.squadIdByAgent(agentId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result, 2);
});

QUnit.test("squadInstance() 1", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const squadId = 1;

  // Run.
  const result = Selector.squadInstance(squadId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.name, "Imperial Core Set: 36 Points");
  assert.equal(result.year, 2012);
});

QUnit.test("squadInstance() 2", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const squadId = 2;

  // Run.
  const result = Selector.squadInstance(squadId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.name, "Rebel Core Set: 36 Points");
  assert.equal(result.year, 2012);
});

QUnit.test("squadInstanceByAgent() 1", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const agentId = 1;

  // Run.
  const result = Selector.squadInstanceByAgent(agentId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.id, 1);
  assert.equal(result.name, "Imperial Core Set: 36 Points");
  assert.equal(result.year, 2012);
});

QUnit.test("squadInstanceByAgent() 2", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const agentId = 2;

  // Run.
  const result = Selector.squadInstanceByAgent(agentId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.id, 2);
  assert.equal(result.name, "Rebel Core Set: 36 Points");
  assert.equal(result.year, 2012);
});

QUnit.test("squadInstanceByPilot() 2", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const pilotId = 2;

  // Run.
  const result = Selector.squadInstanceByPilot(pilotId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.id, 1);
  assert.equal(result.name, "Imperial Core Set: 36 Points");
  assert.equal(result.year, 2012);
});

QUnit.test("squadInstanceByPilot() 3", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const pilotId = 3;

  // Run.
  const result = Selector.squadInstanceByPilot(pilotId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.id, 2);
  assert.equal(result.name, "Rebel Core Set: 36 Points");
  assert.equal(result.year, 2012);
});

QUnit.test("tacticalView()", assert => {
  // Setup.
  const gameState = TestData.createGameState();

  // Run.
  const result = Selector.tacticalView(gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.scale, 1.0);
  assert.equal(result.zoomInEnabled, false);
  assert.equal(result.zoomOutEnabled, true);
});

QUnit.test("targetLocks()", assert => {
  // Setup.
  const gameState = TestData.createGameState();

  // Run.
  const result = Selector.targetLocks(gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 3);
  assert.equal(result[0].id, "A");
  assert.equal(result[0].attackerId, 1);
  assert.equal(result[0].defenderId, 3);
  assert.equal(result[1].id, "B");
  assert.equal(result[1].attackerId, 2);
  assert.equal(result[1].defenderId, 3);
  assert.equal(result[2].id, "C");
  assert.equal(result[2].attackerId, 3);
  assert.equal(result[2].defenderId, 1);
});

QUnit.test("targetLocksByAttacker() 1", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const attackerId = 1;

  // Run.
  const result = Selector.targetLocksByAttacker(attackerId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 1);
  assert.equal(result[0].id, "A");
  assert.equal(result[0].attackerId, attackerId);
  assert.equal(result[0].defenderId, 3);
});

QUnit.test("targetLocksByDefender() 3", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const defenderId = 3;

  // Run.
  const result = Selector.targetLocksByDefender(defenderId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 2);
  assert.equal(result[0].id, "A");
  assert.equal(result[0].attackerId, 1);
  assert.equal(result[0].defenderId, defenderId);
  assert.equal(result[1].id, "B");
  assert.equal(result[1].attackerId, 2);
  assert.equal(result[1].defenderId, defenderId);
});

QUnit.test("upgradeIdsByPilot() 3", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const pilotId = 3;

  // Run.
  const result = Selector.upgradeIdsByPilot(pilotId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 2);
  assert.equal(result[0], 2);
  assert.equal(result[1], 3);
});

QUnit.test("upgradeInstance() 1", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const upgradeId = 1;

  // Run.
  const result = Selector.upgradeInstance(upgradeId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.id, upgradeId);
  assert.equal(result.upgradeKey, "marksmanship");
});

QUnit.test("upgradeInstancesByIds()", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const upgradeIds = [1, 3];

  // Run.
  const result = Selector.upgradeInstancesByIds(upgradeIds, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 2);
  assert.equal(result[0].id, 1);
  assert.equal(result[0].upgradeKey, "marksmanship");
  assert.equal(result[1].id, 3);
  assert.equal(result[1].upgradeKey, "r2D2_astromech");
});

QUnit.test("upgradeInstancesByPilot() 3", assert => {
  // Setup.
  const gameState = TestData.createGameState();
  const pilotId = 3;

  // Run.
  const result = Selector.upgradeInstancesByPilot(pilotId, gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 2);
  assert.equal(result[0].id, 2);
  assert.equal(result[0].upgradeKey, "protonTorpedoes");
  assert.equal(result[1].id, 3);
  assert.equal(result[1].upgradeKey, "r2D2_astromech");
});

QUnit.test("userMessage()", assert => {
  // Setup.
  const gameState = TestData.createGameState();

  // Run.
  const result = Selector.userMessage(gameState);

  // Verify.
  assert.ok(result);
  assert.equal(result, "This is some user message.");
});

const SelectorTest = {};
export default SelectorTest;
