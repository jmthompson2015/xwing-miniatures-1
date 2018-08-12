import ShipActionAbility from "./ShipActionAbility.js";
import Selector from "./Selector.js";
import TestData from "./TestData.js";

const ShipAction = XMA.ShipAction;
const Token = XMA.Token;

const ActionCreator = XMS.ActionCreator;
const Reducer = XMS.Reducer;

QUnit.module("ShipActionAbility");

// QUnit.test("barrel roll", function(assert)
// {
//    // Setup.
//    const environment = EnvironmentFactory.createCoreSetEnvironment();
//    const store = environment.store();
//    const token = environment.pilotInstances()[2]; // X-Wing
//    const tokenPosition = environment.getPositionFor(token);
//    environment.moveToken(tokenPosition, new Position(458, 890, 270));
//    const ability = ShipActionAbility[ShipActionAbility.ABILITY_KEY][ShipAction.BARREL_ROLL];
//    const callback = function()
//    {
//       // Verify.
//       assert.ok(true, "test resumed from async operation");
//       position = environment.getPositionFor(token);
//       assert.equal(position.x(), 458 - 80);
//       assert.equal(position.y(), 890);
//       assert.equal(position.heading(), 270);
//       done();
//    };
//    const context = {
//       maneuverKey: Maneuver.BARREL_ROLL_LEFT_1_STANDARD,
//    };
//
//    // Run.
//    let position = environment.getPositionFor(token);
//    assert.equal(position.x(), 458);
//    assert.equal(position.y(), 890);
//    assert.equal(position.heading(), 270);
//    const done = assert.async();
//    ability.consequent(store, token, callback, context);
// });

// QUnit.test("boost", function(assert)
// {
//    // Setup.
//    const environment = EnvironmentFactory.createCoreSetEnvironment();
//    const store = environment.store();
//    const token = environment.pilotInstances()[2]; // X-Wing
//    const tokenPosition = environment.getPositionFor(token);
//    environment.moveToken(tokenPosition, new Position(458, 890, 270));
//    const ability = ShipActionAbility[ShipActionAbility.ABILITY_KEY][ShipAction.BOOST];
//    const callback = function()
//    {
//       // Verify.
//       assert.ok(true, "test resumed from async operation");
//       position = environment.getPositionFor(token);
//       assert.equal(position.x(), 458 + 80);
//       assert.equal(position.y(), 890);
//       assert.equal(position.heading(), 270);
//       done();
//    };
//    const context = {
//       maneuverKey: Maneuver.BARREL_ROLL_RIGHT_1_STANDARD,
//    };
//
//    // Run.
//    let position = environment.getPositionFor(token);
//    assert.equal(position.x(), 458);
//    assert.equal(position.y(), 890);
//    assert.equal(position.heading(), 270);
//    const done = assert.async();
//    ability.consequent(store, token, callback, context);
// });

// QUnit.test("cloak", function(assert)
// {
//    // Setup.
//    const environment = EnvironmentFactory.createCoreSetEnvironment();
//    const store = environment.store();
//    const token = environment.pilotInstances()[2]; // X-Wing
//    const ability = ShipActionAbility[ShipActionAbility.ABILITY_KEY][ShipAction.CLOAK];
//    const callback = function()
//    {
//       // Verify.
//       assert.ok(true, "test resumed from async operation");
//       assert.equal(token.cloakCount(), 1);
//       done();
//    };
//    assert.equal(token.cloakCount(), 0);
//
//    // Run.
//    const done = assert.async();
//    ability.consequent(store, token, callback);
// });

// QUnit.test("decloak left", function(assert)
// {
//    // Setup.
//    const environment = EnvironmentFactory.createCoreSetEnvironment();
//    const store = environment.store();
//    const token = environment.pilotInstances()[2]; // X-Wing
//    const tokenPosition = environment.getPositionFor(token);
//    environment.moveToken(tokenPosition, new Position(458, 890, 270));
//    store.dispatch(CardAction.addCloakCount(token));
//    const ability = ShipActionAbility[ShipActionAbility.ABILITY_KEY][ShipAction.DECLOAK];
//    const callback = function()
//    {
//       // Verify.
//       assert.ok(true, "test resumed from async operation");
//       assert.equal(token.cloakCount(), 0);
//       position = environment.getPositionFor(token);
//       assert.equal(position.x(), 458 - 120);
//       assert.equal(position.y(), 890);
//       assert.equal(position.heading(), 270);
//       done();
//    };
//    const context = {
//       maneuverKey: Maneuver.BARREL_ROLL_LEFT_2_STANDARD,
//    };
//    assert.equal(token.cloakCount(), 1);
//    let position = environment.getPositionFor(token);
//    assert.equal(position.x(), 458);
//    assert.equal(position.y(), 890);
//    assert.equal(position.heading(), 270);
//
//    // Run.
//    const done = assert.async();
//    ability.consequent(store, token, callback, context);
// });

QUnit.test("evade", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const pilotId = 3;
   store.dispatch(ActionCreator.setActivePilotId(pilotId));
   const ability = ShipActionAbility[ShipAction.EVADE];
   const callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      assert.equal(Selector.countByPilotToken(pilotId, Token.EVADE, store.getState()), 1, "evade token count");
      assert.equal(Selector.countByPilotToken(pilotId, Token.FOCUS, store.getState()), 0, "focus token count");
      done();
   };

   // Run.
   const done = assert.async();
   const conditionPassed = ability.condition(pilotId, store.getState());
   assert.equal(conditionPassed, true, "conditionPassed");

   if (conditionPassed)
   {
      ability.consequent(pilotId, store).then(callback);
   }
});

QUnit.test("focus", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root, TestData.createGameState());
   const pilotId = 3;
   store.dispatch(ActionCreator.setActivePilotId(pilotId));
   const ability = ShipActionAbility[ShipAction.FOCUS];
   const callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      assert.equal(Selector.countByPilotToken(pilotId, Token.EVADE, store.getState()), 0, "evade token count");
      assert.equal(Selector.countByPilotToken(pilotId, Token.FOCUS, store.getState()), 1, "focus token count");
      done();
   };

   // Run.
   const done = assert.async();
   const conditionPassed = ability.condition(pilotId, store.getState());
   assert.equal(conditionPassed, true, "conditionPassed");

   if (conditionPassed)
   {
      ability.consequent(pilotId, store).then(callback);
   }
});

// QUnit.test("jam", function(assert)
// {
//    // Setup.
//    const environment = EnvironmentFactory.createCoreSetEnvironment();
//    const store = environment.store();
//    const attacker = environment.pilotInstances()[2]; // X-Wing
//    const defender = environment.pilotInstances()[0]; // TIE Fighter
//    const ability = ShipActionAbility[ShipActionAbility.ABILITY_KEY][ShipAction.JAM];
//    const callback = function()
//    {
//       // Verify.
//       assert.ok(true, "test resumed from async operation");
//       assert.equal(defender.stressCount(), 2);
//       done();
//    };
//    const context = {
//       defender: defender,
//    };
//    assert.equal(defender.stressCount(), 0);
//
//    // Run.
//    const done = assert.async();
//    ability.consequent(store, attacker, callback, context);
// });

// QUnit.test("reinforce", function(assert)
// {
//    // Setup.
//    const environment = EnvironmentFactory.createCoreSetEnvironment();
//    const store = environment.store();
//    const token = environment.pilotInstances()[2]; // X-Wing
//    const ability = ShipActionAbility[ShipActionAbility.ABILITY_KEY][ShipAction.REINFORCE];
//    const callback = function()
//    {
//       // Verify.
//       assert.ok(true, "test resumed from async operation");
//       assert.equal(token.reinforceCount(), 1);
//       done();
//    };
//    assert.equal(token.reinforceCount(), 0);
//
//    // Run.
//    const done = assert.async();
//    ability.consequent(store, token, callback);
// });

// QUnit.test("slam", function(assert)
// {
//    // Setup.
//    const environment = EnvironmentFactory.createCoreSetEnvironment();
//    const store = environment.store();
//    const token = environment.pilotInstances()[2]; // X-Wing
//    const ability = ShipActionAbility[ShipActionAbility.ABILITY_KEY][ShipAction.SLAM];
//    const callback = function()
//    {
//       // Verify.
//       assert.ok(true, "test resumed from async operation");
//       position = environment.getPositionFor(token);
//       assert.equal(position.x(), 458);
//       assert.equal(position.y(), 895 - 120);
//       assert.equal(position.heading(), 270);
//       done();
//    };
//    const context = {
//       maneuverKey: Maneuver.STRAIGHT_2_STANDARD,
//    };
//
//    // Run.
//    let position = environment.getPositionFor(token);
//    assert.equal(position.x(), 458);
//    assert.equal(position.y(), 895);
//    assert.equal(position.heading(), 270);
//    const done = assert.async();
//    ability.consequent(store, token, callback, context);
// });

// QUnit.test("target lock", function(assert)
// {
//    // Setup.
//    const environment = EnvironmentFactory.createCoreSetEnvironment();
//    const store = environment.store();
//    const defender = environment.pilotInstances()[0]; // TIE Fighter
//    const attacker = environment.pilotInstances()[2]; // X-Wing
//    const ability = ShipActionAbility[ShipActionAbility.ABILITY_KEY][ShipAction.TARGET_LOCK];
//    assert.equal(store.getState().targetLocks.size, 0);
//    assert.ok(TargetLock.getFirst(store, attacker, defender) === undefined);
//    const callback = function()
//    {
//       // Verify.
//       assert.ok(true, "test resumed from async operation");
//       assert.equal(store.getState().targetLocks.size, 1);
//       assert.ok(TargetLock.getFirst(store, attacker, defender) !== undefined);
//       done();
//    };
//    const context = {
//       defender: defender,
//    };
//
//    // Run.
//    const done = assert.async();
//    ability.consequent(store, attacker, callback, context);
// });

// function createEnvironment()
// {
//    const environment = EnvironmentFactory.createCoreSetEnvironment();
//    const store = environment.store();
//    const attacker = environment.pilotInstances()[2]; // X-Wing.
//    const weapon = attacker.primaryWeapon();
//    const defender = environment.pilotInstances()[0]; // TIE Fighter.
//    const callback = function()
//    {
//       LOGGER.info("in callback()");
//    };
//
//    environment.setActiveToken(attacker);
//    store.dispatch(CardAction.addFocusCount(attacker));
//    store.dispatch(CardAction.addStressCount(attacker));
//
//    store.dispatch(Action.setTokenAttackDice(attacker.id(), (new MockAttackDice(store, attacker.id())).values()));
//    store.dispatch(Action.setTokenDefenseDice(attacker.id(), (new MockDefenseDice(store, attacker.id())).values()));
//    store.dispatch(Action.setTokenInFiringArc(attacker, true));
//
//    const combatAction = new CombatAction(store, attacker, weapon, defender, callback, MockAttackDice, MockDefenseDice);
//    store.dispatch(Action.setTokenCombatAction(attacker, combatAction));
//
//    return environment;
// }

const ShipActionAbilityTest = {};
export default ShipActionAbilityTest;