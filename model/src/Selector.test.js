import Selector from "./Selector.js";
import TestData from "./TestData.js";

const {
  AttackDiceValue,
  DamageCard,
  DefenseDiceValue,
  Faction,
  Phase,
  PilotCard,
  PlayFormat,
  Range,
  Token,
  UpgradeCard
} = XMA;

const { ActionCreator, Reducer } = XMS;

QUnit.module("Selector");

const addAttackDice = store => {
  const { activeCombatId } = store.getState();
  const attackDice = Immutable([
    AttackDiceValue.BLANK,
    AttackDiceValue.FOCUS,
    AttackDiceValue.HIT,
    AttackDiceValue.CRITICAL_HIT
  ]);
  store.dispatch(ActionCreator.setCombatAttackDice(activeCombatId, attackDice));
};

const addCombatInstance = store => {
  const combatInstance = XMS.CombatState.create({
    id: 1,
    attackerId: 3,
    defenderId: 2,
    rangeKey: Range.TWO
  });
  store.dispatch(ActionCreator.setActiveCombatId(1));
  store.dispatch(ActionCreator.setCombatInstance(combatInstance));
};

const addDefenseDice = store => {
  const { activeCombatId } = store.getState();
  const defenseDice = Immutable([
    DefenseDiceValue.BLANK,
    DefenseDiceValue.EVADE,
    DefenseDiceValue.FOCUS
  ]);
  store.dispatch(ActionCreator.setCombatDefenseDice(activeCombatId, defenseDice));
};

// /////////////////////////////////////////////////////////////////////////////////////////////////
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

QUnit.test("activeAgentId()", assert => {
  // Setup.
  const store = Redux.createStore(
    Reducer.root,
    R.assoc("activeAgentId", 2, TestData.createGameState())
  );

  // Run.
  const result = Selector.activeAgentId(store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result, 2);
});

QUnit.test("activeCombatId()", assert => {
  // Setup.
  const store = Redux.createStore(
    Reducer.root,
    R.assoc("activeCombatId", 1, TestData.createGameState())
  );

  // Run.
  const result = Selector.activeCombatId(store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result, 1);
});

QUnit.test("activePilotId()", assert => {
  // Setup.
  const store = Redux.createStore(
    Reducer.root,
    R.assoc("activePilotId", 1, TestData.createGameState())
  );

  // Run.
  const result = Selector.activePilotId(store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result, 1);
});

QUnit.test("agentInstance() 1", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const agentId = 1;

  // Run.
  const result = Selector.agentInstance(agentId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.id, agentId);
  assert.equal(result.name, "Agent 1");
  assert.equal(result.strategy, "SimpleAgentStrategy");
});

QUnit.test("agentInstance() 2", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const agentId = 2;

  // Run.
  const result = Selector.agentInstance(agentId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.id, agentId);
  assert.equal(result.name, "Agent 2");
  assert.equal(result.strategy, "SimpleAgentStrategy");
});

QUnit.test("agentInstanceByPilot() 2", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const pilotId = 2;

  // Run.
  const result = Selector.agentInstanceByPilot(pilotId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.id, 1);
  assert.equal(result.name, "Agent 1");
  assert.equal(result.strategy, "SimpleAgentStrategy");
});

QUnit.test("agentInstanceByPilot() 3", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const pilotId = 3;

  // Run.
  const result = Selector.agentInstanceByPilot(pilotId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.id, 2);
  assert.equal(result.name, "Agent 2");
  assert.equal(result.strategy, "SimpleAgentStrategy");
});

QUnit.test("agentInstances()", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());

  // Run.
  const result = Selector.agentInstances(store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 2);
  assert.equal(result[0].name, "Agent 1");
  assert.equal(result[1].name, "Agent 2");
});

QUnit.test("attackDiceKeysByCombat()", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  addCombatInstance(store);
  addAttackDice(store);
  const activeCombatId = Selector.activeCombatId(store.getState());

  // Run.
  const result = Selector.attackDiceKeysByCombat(activeCombatId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 4);
  assert.equal(result[0], AttackDiceValue.BLANK);
  assert.equal(result[1], AttackDiceValue.FOCUS);
  assert.equal(result[2], AttackDiceValue.HIT);
  assert.equal(result[3], AttackDiceValue.CRITICAL_HIT);
});

QUnit.test("attackDiceValueCount()", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  addCombatInstance(store);
  addAttackDice(store);
  const combatId = Selector.activeCombatId(store.getState());

  // Run / Verify.
  assert.equal(Selector.attackDiceValueCount(combatId, AttackDiceValue.HIT, store.getState()), 1);
  assert.equal(
    Selector.attackDiceValueCount(combatId, AttackDiceValue.CRITICAL_HIT, store.getState()),
    1
  );
  assert.equal(Selector.attackDiceValueCount(combatId, AttackDiceValue.FOCUS, store.getState()), 1);
  assert.equal(Selector.attackDiceValueCount(combatId, AttackDiceValue.BLANK, store.getState()), 1);
});

QUnit.test("bonusByPilotStat() 3 hull", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const pilotId = 3;
  const statKey = XMA.Stat.HULL;

  // Run.
  const result = Selector.bonusByPilotStat(pilotId, statKey, store.getState());

  // Verify.
  assert.equal(result, 1);
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

QUnit.test("conditionCard() 1", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const conditionId = 1;

  // Run.
  const result = Selector.conditionCard(conditionId, store.getState());

  // Verify.
  // assert.ok(result);
  // assert.equal(result, ConditionCard.properties[ConditionCard.MARKSMANSHIP]);
  assert.equal(result, undefined);
});

QUnit.test("countByPilotToken() 3 shield", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const pilotId = 3;
  const tokenKey = Token.SHIELD;

  // Run.
  const result = Selector.countByPilotToken(pilotId, tokenKey, store.getState());

  // Verify.
  assert.equal(result, 2);
});

QUnit.test("countByUpgradeToken() 1 ion", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const upgradeId = 1;
  const tokenKey = Token.ION;

  // Run.
  const result = Selector.countByUpgradeToken(upgradeId, tokenKey, store.getState());

  // Verify.
  assert.equal(result, 0);
});

QUnit.test("damageCard() 1", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const damageId = 1;

  // Run.
  const result = Selector.damageCard(damageId, store.getState());

  // Verify.
  assert.ok(result);
  // assert.equal(result, DamageCard.properties[DamageCard.MARKSMANSHIP]);
});

QUnit.test("damageDeck()", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());

  // Run.
  const result = Selector.damageDeck(store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 33);
});

QUnit.test("damageDiscardPile()", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());

  // Run.
  const result = Selector.damageDiscardPile(store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 0);
});

QUnit.test("damageIdsByPilot() 1", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const pilotId = 1;

  // Run.
  const result = Selector.damageIdsByPilot(pilotId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 1);
  assert.equal(result[0], 3);
});

QUnit.test("damageIdsByPilot() 2", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const pilotId = 2;

  // Run.
  const result = Selector.damageIdsByPilot(pilotId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 1);
  assert.equal(result[0], 4);
});

QUnit.test("damageInstance() 1", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const damageId = 1;

  // Run.
  const result = Selector.damageInstance(damageId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.id, damageId);
  assert.equal(result.damageKey, DamageCard.BLINDED_PILOT);
});

QUnit.test("defenseDiceKeysByCombat()", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  addCombatInstance(store);
  addDefenseDice(store);
  const activeCombatId = Selector.activeCombatId(store.getState());

  // Run.
  const result = Selector.defenseDiceKeysByCombat(activeCombatId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 3);
  assert.equal(result[0], DefenseDiceValue.BLANK);
  assert.equal(result[1], DefenseDiceValue.EVADE);
  assert.equal(result[2], DefenseDiceValue.FOCUS);
});

QUnit.test("defenseDiceValueCount()", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  addCombatInstance(store);
  addAttackDice(store);
  addDefenseDice(store);
  const combatId = Selector.activeCombatId(store.getState());

  // Run / Verify.
  assert.equal(
    Selector.defenseDiceValueCount(combatId, DefenseDiceValue.EVADE, store.getState()),
    1
  );
  assert.equal(
    Selector.defenseDiceValueCount(combatId, DefenseDiceValue.FOCUS, store.getState()),
    1
  );
  assert.equal(
    Selector.defenseDiceValueCount(combatId, DefenseDiceValue.BLANK, store.getState()),
    1
  );
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

QUnit.test("factionValueByPilot() 3", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const pilotId = 3;

  // Run.
  const result = Selector.factionValueByPilot(pilotId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.key, Faction.REBEL_ALLIANCE);
});

QUnit.test("phaseKey()", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root);

  // Run.
  const result = Selector.phaseKey(store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result, Phase.SETUP);
});

QUnit.test("pilotCard() 1", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const pilotId = 1;

  // Run.
  const result = Selector.pilotCard(pilotId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result, PilotCard.properties[PilotCard.MAULER_MITHEL]);
});

QUnit.test("pilotCard() 3", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const pilotId = 3;

  // Run.
  const result = Selector.pilotCard(pilotId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result, PilotCard.properties[PilotCard.LUKE_SKYWALKER]);
});

QUnit.test("pilotIdsByAgent() 1", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const agentId = 1;

  // Run.
  const result = Selector.pilotIdsByAgent(agentId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 2);
  assert.equal(result[0], 1);
  assert.equal(result[1], 2);
});

QUnit.test("pilotIdsByAgent() 2", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const agentId = 2;

  // Run.
  const result = Selector.pilotIdsByAgent(agentId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 1);
  assert.equal(result[0], 3);
});

QUnit.test("pilotIdsBySquad() 1", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const squadId = 1;

  // Run.
  const result = Selector.pilotIdsBySquad(squadId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 2);
  assert.equal(result[0], 1);
  assert.equal(result[1], 2);
});

QUnit.test("pilotIdsBySquad() 2", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const squadId = 2;

  // Run.
  const result = Selector.pilotIdsBySquad(squadId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 1);
  assert.equal(result[0], 3);
});

QUnit.test("pilotInstance() 1", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const pilotId = 1;

  // Run.
  const result = Selector.pilotInstance(pilotId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.id, pilotId);
  assert.equal(result.pilotKey, PilotCard.MAULER_MITHEL);
});

QUnit.test("pilotInstance() 3", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const pilotId = 3;

  // Run.
  const result = Selector.pilotInstance(pilotId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.id, pilotId);
  assert.equal(result.pilotKey, PilotCard.LUKE_SKYWALKER);
});

QUnit.test("pilotInstances()", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());

  // Run.
  const result = Selector.pilotInstances(store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 3);
  assert.equal(result[0].pilotKey, PilotCard.MAULER_MITHEL);
  assert.equal(result[1].pilotKey, PilotCard.DARK_CURSE);
  assert.equal(result[2].pilotKey, PilotCard.LUKE_SKYWALKER);
});

QUnit.test("pilotInstancesByAgent() 1", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const agentId = 1;

  // Run.
  const result = Selector.pilotInstancesByAgent(agentId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 2);
  assert.equal(result[0].pilotKey, PilotCard.MAULER_MITHEL);
  assert.equal(result[1].pilotKey, PilotCard.DARK_CURSE);
});

QUnit.test("pilotInstancesByAgent() 2", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const agentId = 2;

  // Run.
  const result = Selector.pilotInstancesByAgent(agentId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 1);
  assert.equal(result[0].pilotKey, PilotCard.LUKE_SKYWALKER);
});

QUnit.test("pilotInstancesBySquad() 1", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const squadId = 1;

  // Run.
  const result = Selector.pilotInstancesBySquad(squadId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 2);
  assert.equal(result[0].pilotKey, PilotCard.MAULER_MITHEL);
  assert.equal(result[1].pilotKey, PilotCard.DARK_CURSE);
});

QUnit.test("pilotInstancesBySquad() 2", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const squadId = 2;

  // Run.
  const result = Selector.pilotInstancesBySquad(squadId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 1);
  assert.equal(result[0].pilotKey, PilotCard.LUKE_SKYWALKER);
});

QUnit.test("pilotKey() 1", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const pilotId = 1;

  // Run.
  const result = Selector.pilotKey(pilotId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result, PilotCard.MAULER_MITHEL);
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

QUnit.test("playFormatKey()", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root);

  // Run.
  const result = Selector.playFormatKey(store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result, PlayFormat.STANDARD);
});

QUnit.test("positionByPilot()", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const pilotId = 1;
  const toPosition = XMS.PositionState.create({
    x: 100,
    y: 200,
    heading: 120
  });
  store.dispatch(ActionCreator.movePilot(pilotId, toPosition));

  // Run.
  const result = Selector.positionByPilot(pilotId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.x, 100);
  assert.equal(result.y, 200);
  assert.equal(result.heading, 120);
});

QUnit.test("round()", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root);

  // Run.
  const result = Selector.round(store.getState());

  // Verify.
  assert.equal(result, 0);
});

QUnit.test("shipBaseValueByPilot() 1", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const pilotId = 1;

  // Run.
  const result = Selector.shipBaseValueByPilot(pilotId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.name, "small");
});

QUnit.test("shipByPilot() 1", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const pilotId = 1;

  // Run.
  const result = Selector.shipByPilot(pilotId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.name, "TIE Fighter");
});

QUnit.test("shipByPilot() 3", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const pilotId = 3;

  // Run.
  const result = Selector.shipByPilot(pilotId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.name, "X-wing");
});

QUnit.test("shipKeyByPilot() 1", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const pilotId = 1;

  // Run.
  const result = Selector.shipKeyByPilot(pilotId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result, XMA.Ship.TIE_FIGHTER);
});

QUnit.test("squadInstance() 1", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const squadId = 1;

  // Run.
  const result = Selector.squadInstance(squadId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.id, squadId);
  assert.equal(result.name, "Imperial Core Set: 36 Points");
  assert.equal(result.year, 2012);
  assert.equal(result.description, "TIE Fighters x2");
});

QUnit.test("statValueByPilot() Luke Skywalker Primary Weapon", assert => {
  // Setup.
  const pilotKey = PilotCard.LUKE_SKYWALKER;
  const statKey = XMA.Stat.PRIMARY_WEAPON;

  // Run.
  const result = Selector.statValueByPilot(pilotKey, statKey);

  // Verify.
  assert.equal(result, 3);
});

QUnit.test("targetLocksByAttacker() 1", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const attackerId = 1;

  // Run.
  const result = Selector.targetLocksByAttacker(attackerId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 1);
  assert.equal(result[0].id, "A");
  assert.equal(result[0].attackerId, attackerId);
  assert.equal(result[0].defenderId, 3);
});

QUnit.test("targetLocksByAttacker() 3", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const attackerId = 3;

  // Run.
  const result = Selector.targetLocksByAttacker(attackerId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 1);
  assert.equal(result[0].id, "C");
  assert.equal(result[0].attackerId, attackerId);
  assert.equal(result[0].defenderId, 1);
});

QUnit.test("targetLocksByDefender() 1", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const defenderId = 1;

  // Run.
  const result = Selector.targetLocksByDefender(defenderId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 1);
  assert.equal(result[0].id, "C");
  assert.equal(result[0].attackerId, 3);
  assert.equal(result[0].defenderId, defenderId);
});

QUnit.test("targetLocksByDefender() 3", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const defenderId = 3;

  // Run.
  const result = Selector.targetLocksByDefender(defenderId, store.getState());

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

QUnit.test("upgradeCard() 1", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const upgradeId = 1;

  // Run.
  const result = Selector.upgradeCard(upgradeId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result, UpgradeCard.properties[UpgradeCard.MARKSMANSHIP]);
});

QUnit.test("upgradeInstance() 1", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const upgradeId = 1;

  // Run.
  const result = Selector.upgradeInstance(upgradeId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.id, upgradeId);
  assert.equal(result.upgradeKey, UpgradeCard.MARKSMANSHIP);
});

QUnit.test("upgradeInstancesByPilot() 3", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const pilotId = 3;

  // Run.
  const result = Selector.upgradeInstancesByPilot(pilotId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 3);
  assert.equal(result[0].upgradeKey, UpgradeCard.PROTON_TORPEDOES);
  assert.equal(result[1].upgradeKey, UpgradeCard.R2_D2_ASTROMECH);
  assert.equal(result[2].upgradeKey, UpgradeCard.HULL_UPGRADE);
});

QUnit.test("upgradeKey() 1", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const upgradeId = 1;

  // Run.
  const result = Selector.upgradeKey(upgradeId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result, UpgradeCard.MARKSMANSHIP);
});

QUnit.test("weaponUpgradeIdsByPilot() 3", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const pilotId = 3;

  // Run.
  const result = Selector.weaponUpgradeIdsByPilot(pilotId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 1);
  assert.equal(result[0], 2);
});

QUnit.test("weaponUpgradeInstancesByPilot() 3", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root, TestData.createGameState());
  const pilotId = 3;

  // Run.
  const result = Selector.weaponUpgradeInstancesByPilot(pilotId, store.getState());

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 2);
  assert.equal(result[0].upgradeKey, UpgradeCard.PROTON_TORPEDOES);
});

const SelectorTest = {};
export default SelectorTest;
