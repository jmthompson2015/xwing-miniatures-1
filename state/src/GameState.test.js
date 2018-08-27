import GameState from "./GameState.js";

QUnit.module("GameState");

const PROPS = [
  "activeAgentId",
  "activeCombatId",
  "activePilotId",
  "isGameOver",
  "phaseKey",
  "playFormatKey",
  "round",
  "userMessage",
  "agentQuery",
  "agentResponse",
  "displayExplosion",
  "displayLaserBeam",
  "displayManeuver",
  "pilotToManeuver",
  "activationQueue",
  "combatQueue",
  "damageDeck",
  "damageDiscardPile",
  "endQueue",
  "planningQueue",
  "targetLocks",
  "agentInstances",
  "combatInstances",
  "conditionInstances",
  "damageInstances",
  "pilotInstances",
  "squadInstances",
  "upgradeInstances"
];

const createTestState = () =>
  GameState.create({
    activeAgentId: 1,
    activeCombatId: 2,
    activePilotId: 3,
    isGameOver: 4,
    phaseKey: 5,
    playFormatKey: 6,
    round: 7,
    userMessage: 8,

    agentQuery: 9,
    agentResponse: 10,
    displayExplosion: 11,
    displayLaserBeam: 12,
    displayManeuver: 13,
    pilotToManeuver: 14,

    activationQueue: 15,
    combatQueue: 16,
    damageDeck: 17,
    damageDiscardPile: 18,
    endQueue: 19,
    planningQueue: 20,
    targetLocks: 21,

    agentInstances: 22,
    combatInstances: 23,
    conditionInstances: 24,
    damageInstances: 25,
    pilotInstances: 26,
    squadInstances: 27,
    upgradeInstances: 28
  });

QUnit.test("create()", assert => {
  // Run.
  const game = createTestState();

  // Verify.
  PROPS.forEach((prop, i) => {
    assert.equal(game[prop], i + 1);
  });
});

QUnit.test("create() immutable", assert => {
  // Setup.
  const game = createTestState();

  // Run / Verify.
  try {
    game.round = 12;
    assert.ok(false, "Should have thrown an exception");
  } catch (e) {
    assert.ok(true);
  }
});

// QUnit.skip("toString()", assert => {
//   // Setup.
//   const game = TestData.createGameState();
//
//   // Run.
//   console.log(`gameState = ${JSON.stringify(game, null, "   ")}`);
//
//   // Verify.
//   assert.ok(true);
// });

const GameStateTest = {};
export default GameStateTest;
