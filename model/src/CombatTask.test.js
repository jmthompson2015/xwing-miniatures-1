import AgentQueryType from "./AgentQueryType.js";
import CombatTask from "./CombatTask.js";
import TestData from "./TestData.js";

const AttackDiceValue = XMA.AttackDiceValue;
const DefenseDiceValue = XMA.DefenseDiceValue;
const Phase = XMA.Phase;
const Range = XMA.Range;

const ActionCreator = XMS.ActionCreator;
const Reducer = XMS.Reducer;

QUnit.module("CombatTask");

QUnit.test("doIt() Start", function(assert)
{
   // Setup.
   const store = initializeStore();
   store.dispatch(ActionCreator.setPhase(Phase.COMBAT_START));

   const callback = store =>
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      verifyPhaseKey(assert, store, Phase.COMBAT_DECLARE_TARGET);
      verifyCombatQueue(assert, store, [3, 1, 2]);
      verifyActivePilotId(assert, store, undefined);
      verifyAgentQuery(assert, store, undefined);
      verifyAgentResponse(assert, store, undefined);
      done();
   };

   // Run.
   const done = assert.async();
   CombatTask.doIt(store).then(callback);
});

QUnit.test("doIt() Declare Target query", function(assert)
{
   // Setup.
   const store = initializeStore();
   store.dispatch(ActionCreator.setCombatQueue([3, 1, 2]));
   setPhase(store, Phase.COMBAT_DECLARE_TARGET);
   verifyActivePilotId(assert, store, undefined, "");

   const callback = store =>
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      verifyPhaseKey(assert, store, Phase.COMBAT_DECLARE_TARGET);
      verifyCombatQueue(assert, store, [1, 2]);
      verifyActivePilotId(assert, store, 3);
      verifyAgentQuery(assert, store, AgentQueryType.CHOOSE_WEAPON_AND_DEFENDER);
      verifyAgentResponse(assert, store, undefined);
      done();
   };

   // Run.
   const done = assert.async();
   CombatTask.doIt(store).then(callback);
});

QUnit.test("doIt() Declare Target response", function(assert)
{
   // Setup.
   const store = initializeStore();
   store.dispatch(ActionCreator.setCombatQueue([3, 1, 2]));
   store.dispatch(ActionCreator.dequeueCombat());
   const agentResponse = XMS.AgentResponseState.create(
   {
      agentId: 2,
      responseKey: AgentQueryType.CHOOSE_WEAPON_AND_DEFENDER,
      payload:
      {
         attackerId: 3,
         weaponKey: "primary",
         defenderId: 2
      }
   });
   store.dispatch(ActionCreator.setAgentResponse(agentResponse));
   setPhase(store, Phase.COMBAT_DECLARE_TARGET);
   verifyActivePilotId(assert, store, 3, "");

   const callback = store =>
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      verifyPhaseKey(assert, store, Phase.COMBAT_ROLL_ATTACK_DICE);
      verifyCombatQueue(assert, store, [1, 2]);
      verifyActivePilotId(assert, store, 3);
      verifyAgentQuery(assert, store, undefined);
      verifyAgentResponse(assert, store, undefined);
      done();
   };

   // Run.
   const done = assert.async();
   CombatTask.doIt(store).then(callback);
});

QUnit.test("doIt() Roll Attack Dice", function(assert)
{
   // Setup.
   const store = initializeStore();
   store.dispatch(ActionCreator.setCombatQueue([3, 1, 2]));
   store.dispatch(ActionCreator.dequeueCombat());
   addCombatInstance(store);
   setPhase(store, Phase.COMBAT_ROLL_ATTACK_DICE);
   verifyActivePilotId(assert, store, 3, "");

   const callback = store =>
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      verifyPhaseKey(assert, store, Phase.COMBAT_MODIFY_ATTACK_DICE);
      verifyCombatQueue(assert, store, [1, 2]);
      verifyActivePilotId(assert, store, 3, "");
      verifyAgentQuery(assert, store, undefined);
      verifyAgentResponse(assert, store, undefined);
      verifyActiveCombatId(assert, store, 1);
      verifyAttackDiceKeys(assert, store, 3);
      done();
   };

   // Run.
   const done = assert.async();
   CombatTask.doIt(store).then(callback);
});

QUnit.test("doIt() Modify Attack Dice query", function(assert)
{
   // Setup.
   const store = initializeStore();
   store.dispatch(ActionCreator.setCombatQueue([3, 1, 2]));
   store.dispatch(ActionCreator.dequeueCombat());
   addCombatInstance(store);
   addAttackDice(store);
   setPhase(store, Phase.COMBAT_MODIFY_ATTACK_DICE);
   verifyActivePilotId(assert, store, 3, "");

   const callback = store =>
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      verifyPhaseKey(assert, store, Phase.COMBAT_MODIFY_ATTACK_DICE);
      verifyCombatQueue(assert, store, [1, 2]);
      verifyActivePilotId(assert, store, 3);
      verifyAgentQuery(assert, store, AgentQueryType.CHOOSE_ATTACK_DICE_MODIFICATION);
      verifyAgentResponse(assert, store, undefined);
      verifyActiveCombatId(assert, store, 1);
      verifyAttackDiceKeys(assert, store, 4);
      done();
   };

   // Run.
   const done = assert.async();
   CombatTask.doIt(store).then(callback);
});

QUnit.test("doIt() Modify Attack Dice response", function(assert)
{
   // Setup.
   const store = initializeStore();
   store.dispatch(ActionCreator.setCombatQueue([3, 1, 2]));
   store.dispatch(ActionCreator.dequeueCombat());
   addCombatInstance(store);
   addAttackDice(store);
   const agentResponse = XMS.AgentResponseState.create(
   {
      agentId: 2,
      responseKey: AgentQueryType.CHOOSE_ATTACK_DICE_MODIFICATION,
   });
   store.dispatch(ActionCreator.setAgentResponse(agentResponse));
   setPhase(store, Phase.COMBAT_MODIFY_ATTACK_DICE);
   verifyActivePilotId(assert, store, 3, "");

   const callback = store =>
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      verifyPhaseKey(assert, store, Phase.COMBAT_ROLL_DEFENSE_DICE);
      verifyCombatQueue(assert, store, [1, 2]);
      verifyActivePilotId(assert, store, 3);
      verifyAgentQuery(assert, store, undefined);
      verifyAgentResponse(assert, store, undefined);
      verifyActiveCombatId(assert, store, 1);
      verifyAttackDiceKeys(assert, store, 4);
      done();
   };

   // Run.
   const done = assert.async();
   CombatTask.doIt(store).then(callback);
});

QUnit.test("doIt() Roll Defense Dice", function(assert)
{
   const store = initializeStore();
   store.dispatch(ActionCreator.setCombatQueue([3, 1, 2]));
   store.dispatch(ActionCreator.dequeueCombat());
   addCombatInstance(store);
   addAttackDice(store);
   setPhase(store, Phase.COMBAT_ROLL_DEFENSE_DICE);
   verifyActivePilotId(assert, store, 3, "");

   const callback = store =>
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      verifyPhaseKey(assert, store, Phase.COMBAT_MODIFY_DEFENSE_DICE);
      verifyCombatQueue(assert, store, [1, 2]);
      verifyActivePilotId(assert, store, 3, "");
      verifyAgentQuery(assert, store, undefined);
      verifyAgentResponse(assert, store, undefined);
      verifyActiveCombatId(assert, store, 1);
      verifyAttackDiceKeys(assert, store, 4);
      verifyDefenseDiceKeys(assert, store, 2);
      done();
   };

   // Run.
   const done = assert.async();
   CombatTask.doIt(store).then(callback);
});

QUnit.test("doIt() Modify Defense Dice query", function(assert)
{
   // Setup.
   const store = initializeStore();
   store.dispatch(ActionCreator.setCombatQueue([3, 1, 2]));
   store.dispatch(ActionCreator.dequeueCombat());
   addCombatInstance(store);
   addAttackDice(store);
   addDefenseDice(store);
   setPhase(store, Phase.COMBAT_MODIFY_DEFENSE_DICE);
   verifyActivePilotId(assert, store, 3, "");

   const callback = store =>
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      verifyPhaseKey(assert, store, Phase.COMBAT_MODIFY_DEFENSE_DICE);
      verifyCombatQueue(assert, store, [1, 2]);
      verifyActivePilotId(assert, store, 3);
      verifyAgentQuery(assert, store, AgentQueryType.CHOOSE_DEFENSE_DICE_MODIFICATION);
      verifyAgentResponse(assert, store, undefined);
      verifyActiveCombatId(assert, store, 1);
      verifyAttackDiceKeys(assert, store, 4);
      verifyDefenseDiceKeys(assert, store, 3);
      done();
   };

   // Run.
   const done = assert.async();
   CombatTask.doIt(store).then(callback);
});

QUnit.test("doIt() Modify Defense Dice response", function(assert)
{
   // Setup.
   const store = initializeStore();
   store.dispatch(ActionCreator.setCombatQueue([3, 1, 2]));
   store.dispatch(ActionCreator.dequeueCombat());
   addCombatInstance(store);
   addAttackDice(store);
   addDefenseDice(store);
   const agentResponse = XMS.AgentResponseState.create(
   {
      agentId: 2,
      responseKey: AgentQueryType.CHOOSE_DEFENSE_DICE_MODIFICATION,
   });
   store.dispatch(ActionCreator.setAgentResponse(agentResponse));
   setPhase(store, Phase.COMBAT_MODIFY_DEFENSE_DICE);
   verifyActivePilotId(assert, store, 3, "");

   const callback = store =>
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      verifyPhaseKey(assert, store, Phase.COMBAT_COMPARE_RESULTS);
      verifyCombatQueue(assert, store, [1, 2]);
      verifyActivePilotId(assert, store, 3);
      verifyAgentQuery(assert, store, undefined);
      verifyAgentResponse(assert, store, undefined);
      verifyActiveCombatId(assert, store, 1);
      verifyAttackDiceKeys(assert, store, 4);
      verifyDefenseDiceKeys(assert, store, 3);
      done();
   };

   // Run.
   const done = assert.async();
   CombatTask.doIt(store).then(callback);
});

QUnit.test("doIt() Compare Results", function(assert)
{
   const store = initializeStore();
   store.dispatch(ActionCreator.setCombatQueue([3, 1, 2]));
   store.dispatch(ActionCreator.dequeueCombat());
   addCombatInstance(store);
   addAttackDice(store);
   addDefenseDice(store);
   setPhase(store, Phase.COMBAT_COMPARE_RESULTS);
   verifyActivePilotId(assert, store, 3, "");

   const callback = store =>
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      verifyPhaseKey(assert, store, Phase.COMBAT_NOTIFY_DAMAGE);
      verifyCombatQueue(assert, store, [1, 2]);
      verifyActivePilotId(assert, store, 3, "");
      verifyAgentQuery(assert, store, undefined);
      verifyAgentResponse(assert, store, undefined);
      verifyActiveCombatId(assert, store, 1);
      verifyAttackDiceKeys(assert, store, 4);
      verifyDefenseDiceKeys(assert, store, 3);
      const combatInstance = XMS.Selector.combatInstance(XMS.Selector.activeCombatId(store.getState()), store.getState());
      assert.equal(combatInstance.shieldDamage, 0, "callback combatInstance.shieldDamage");
      assert.equal(combatInstance.hitDamage, 0, "callback combatInstance.hitDamage");
      assert.equal(combatInstance.criticalDamage, 1, "callback combatInstance.criticalDamage");
      done();
   };

   // Run.
   const done = assert.async();
   CombatTask.doIt(store).then(callback);
});

QUnit.test("doIt() Notify Damage query", function(assert)
{
   // Setup.
   const store = initializeStore();
   store.dispatch(ActionCreator.setCombatQueue([3, 1, 2]));
   store.dispatch(ActionCreator.dequeueCombat());
   addCombatInstance(store);
   addAttackDice(store);
   addDefenseDice(store);
   setPhase(store, Phase.COMBAT_NOTIFY_DAMAGE);
   verifyActivePilotId(assert, store, 3, "");

   const callback = store =>
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      verifyPhaseKey(assert, store, Phase.COMBAT_NOTIFY_DAMAGE);
      verifyCombatQueue(assert, store, [1, 2]);
      verifyActivePilotId(assert, store, 3);
      verifyAgentQuery(assert, store, AgentQueryType.NOTIFY_DAMAGE);
      verifyAgentResponse(assert, store, undefined);
      verifyActiveCombatId(assert, store, 1);
      verifyAttackDiceKeys(assert, store, 4);
      verifyDefenseDiceKeys(assert, store, 3);
      done();
   };

   // Run.
   const done = assert.async();
   CombatTask.doIt(store).then(callback);
});

QUnit.test("doIt() Modify Defense Dice response", function(assert)
{
   // Setup.
   const store = initializeStore();
   store.dispatch(ActionCreator.setCombatQueue([3, 1, 2]));
   store.dispatch(ActionCreator.dequeueCombat());
   addCombatInstance(store);
   addAttackDice(store);
   addDefenseDice(store);
   const agentResponse = XMS.AgentResponseState.create(
   {
      agentId: 2,
      responseKey: AgentQueryType.NOTIFY_DAMAGE,
   });
   store.dispatch(ActionCreator.setAgentResponse(agentResponse));
   setPhase(store, Phase.COMBAT_NOTIFY_DAMAGE);
   verifyActivePilotId(assert, store, 3, "");

   const callback = store =>
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      verifyPhaseKey(assert, store, Phase.COMBAT_DEAL_DAMAGE);
      verifyCombatQueue(assert, store, [1, 2]);
      verifyActivePilotId(assert, store, 3);
      verifyAgentQuery(assert, store, undefined);
      verifyAgentResponse(assert, store, undefined);
      verifyActiveCombatId(assert, store, 1);
      verifyAttackDiceKeys(assert, store, 4);
      verifyDefenseDiceKeys(assert, store, 3);
      done();
   };

   // Run.
   const done = assert.async();
   CombatTask.doIt(store).then(callback);
});

QUnit.test("doIt() Deal Damage", function(assert)
{
   const store = initializeStore();
   store.dispatch(ActionCreator.setCombatQueue([3, 1, 2]));
   store.dispatch(ActionCreator.dequeueCombat());
   addCombatInstance(store);
   addAttackDice(store);
   addDefenseDice(store);
   store.dispatch(ActionCreator.setCombatShieldDamage(1, 0));
   store.dispatch(ActionCreator.setCombatHitDamage(1, 0));
   store.dispatch(ActionCreator.setCombatCriticalDamage(1, 1));
   setPhase(store, Phase.COMBAT_DEAL_DAMAGE);
   verifyActivePilotId(assert, store, 3, "");
   const combatInstance0 = XMS.Selector.combatInstance(XMS.Selector.activeCombatId(store.getState()), store.getState());
   const defenderInstance0 = XMS.Selector.pilotInstance(combatInstance0.defenderId, store.getState());
   assert.equal(defenderInstance0.damages.length, 1, "pilot damages");
   assert.equal(defenderInstance0.criticals.length, 1, "pilot criticals");

   const callback = store =>
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      verifyPhaseKey(assert, store, Phase.COMBAT_DECLARE_TARGET);
      verifyCombatQueue(assert, store, [1, 2]);
      verifyActivePilotId(assert, store, 3, "");
      verifyAgentQuery(assert, store, undefined);
      verifyAgentResponse(assert, store, undefined);
      verifyActiveCombatId(assert, store, 1);
      verifyAttackDiceKeys(assert, store, 4);
      verifyDefenseDiceKeys(assert, store, 3);
      const combatInstance = XMS.Selector.combatInstance(XMS.Selector.activeCombatId(store.getState()), store.getState());
      assert.equal(combatInstance.shieldDamage, 0, "callback combatInstance.shieldDamage");
      assert.equal(combatInstance.hitDamage, 0, "callback combatInstance.hitDamage");
      assert.equal(combatInstance.criticalDamage, 1, "callback combatInstance.criticalDamage");
      const defenderInstance = XMS.Selector.pilotInstance(combatInstance.defenderId, store.getState());
      assert.equal(defenderInstance.damages.length, 1, "callback pilot damages");
      assert.equal(defenderInstance.criticals.length, 2, "callback pilot criticals");
      done();
   };

   // Run.
   const done = assert.async();
   CombatTask.doIt(store).then(callback);
});

QUnit.test("doIt() End", function(assert)
{
   // Setup.
   const store = initializeStore();
   setPhase(store, Phase.COMBAT_END);

   const callback = store =>
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      verifyPhaseKey(assert, store, Phase.END_START);
      verifyCombatQueue(assert, store, []);
      verifyActivePilotId(assert, store, undefined, "");
      verifyAgentQuery(assert, store, undefined);
      verifyAgentResponse(assert, store, undefined);
      done();
   };

   // Run.
   const done = assert.async();
   CombatTask.doIt(store).then(callback);
});

QUnit.test("doIt() Full Cycle", function(assert)
{
   // Setup.
   const store = initializeStore();
   store.dispatch(ActionCreator.setPhase(Phase.COMBAT_START));

   const callback01 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_DECLARE_TARGET, "callback01 ");
      verifyCombatQueue(assert, store, [3, 1, 2], "callback01 ");
      verifyAgentQuery(assert, store, undefined, "callback01 ");
      verifyAgentResponse(assert, store, undefined, "callback01 ");
      CombatTask.doIt(store).then(callback02);
   };

   const callback02 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_DECLARE_TARGET, "callback02 ");
      verifyCombatQueue(assert, store, [1, 2], "callback02 ");
      verifyAgentQuery(assert, store, AgentQueryType.CHOOSE_WEAPON_AND_DEFENDER, "callback02 ");
      const agentQuery = XMS.Selector.agentQuery(store.getState());
      const agentResponse = XMS.AgentResponseState.create(
      {
         agentId: agentQuery.agentId,
         responseKey: AgentQueryType.CHOOSE_WEAPON_AND_DEFENDER,
         payload:
         {
            defenderId: 2,
            attackerId: agentQuery.payload.attackerId,
            rangeKey: Range.TWO,
            weaponKey: "primary"
         }
      });
      store.dispatch(ActionCreator.clearAgentQuery());
      store.dispatch(ActionCreator.setAgentResponse(agentResponse));
      CombatTask.doIt(store).then(callback03);
   };

   const callback03 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_ROLL_ATTACK_DICE, "callback03 ");
      verifyCombatQueue(assert, store, [1, 2], "callback03 ");
      verifyAgentQuery(assert, store, undefined, "callback03 ");
      verifyAgentResponse(assert, store, undefined, "callback03 ");
      CombatTask.doIt(store).then(callback04);
   };

   const callback04 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_MODIFY_ATTACK_DICE, "callback04 ");
      verifyCombatQueue(assert, store, [1, 2], "callback04 ");
      verifyAgentQuery(assert, store, undefined, "callback04 ");
      verifyAgentResponse(assert, store, undefined, "callback04 ");
      CombatTask.doIt(store).then(callback05);
   };

   const callback05 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_MODIFY_ATTACK_DICE, "callback05 ");
      verifyCombatQueue(assert, store, [1, 2], "callback05 ");
      verifyAgentQuery(assert, store, AgentQueryType.CHOOSE_ATTACK_DICE_MODIFICATION, "callback05 ");
      const agentQuery = XMS.Selector.agentQuery(store.getState());
      const agentResponse = XMS.AgentResponseState.create(
      {
         agentId: agentQuery.agentId,
         responseKey: AgentQueryType.CHOOSE_ATTACK_DICE_MODIFICATION,
         payload:
         {}
      });
      store.dispatch(ActionCreator.clearAgentQuery());
      store.dispatch(ActionCreator.setAgentResponse(agentResponse));
      CombatTask.doIt(store).then(callback06);
   };

   const callback06 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_ROLL_DEFENSE_DICE, "callback06 ");
      verifyCombatQueue(assert, store, [1, 2], "callback06 ");
      verifyAgentQuery(assert, store, undefined, "callback06 ");
      verifyAgentResponse(assert, store, undefined, "callback06 ");
      CombatTask.doIt(store).then(callback07);
   };

   const callback07 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_MODIFY_DEFENSE_DICE, "callback07 ");
      verifyCombatQueue(assert, store, [1, 2], "callback07 ");
      verifyAgentQuery(assert, store, undefined, "callback07 ");
      verifyAgentResponse(assert, store, undefined, "callback07 ");
      CombatTask.doIt(store).then(callback08);
   };

   const callback08 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_MODIFY_DEFENSE_DICE, "callback08 ");
      verifyCombatQueue(assert, store, [1, 2], "callback08 ");
      verifyAgentQuery(assert, store, AgentQueryType.CHOOSE_DEFENSE_DICE_MODIFICATION, "callback08 ");
      const agentQuery = XMS.Selector.agentQuery(store.getState());
      const agentResponse = XMS.AgentResponseState.create(
      {
         agentId: agentQuery.agentId,
         responseKey: AgentQueryType.CHOOSE_DEFENSE_DICE_MODIFICATION,
         payload:
         {}
      });
      store.dispatch(ActionCreator.clearAgentQuery());
      store.dispatch(ActionCreator.setAgentResponse(agentResponse));
      CombatTask.doIt(store).then(callback09);
   };

   const callback09 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_COMPARE_RESULTS, "callback09 ");
      verifyCombatQueue(assert, store, [1, 2], "callback09 ");
      verifyAgentQuery(assert, store, undefined, "callback09 ");
      verifyAgentResponse(assert, store, undefined, "callback09 ");
      CombatTask.doIt(store).then(callback10);
   };

   const callback10 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_NOTIFY_DAMAGE, "callback10 ");
      verifyCombatQueue(assert, store, [1, 2], "callback10 ");
      verifyAgentQuery(assert, store, undefined, "callback10 ");
      verifyAgentResponse(assert, store, undefined, "callback10 ");
      CombatTask.doIt(store).then(callback11);
   };

   const callback11 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_NOTIFY_DAMAGE, "callback11 ");
      verifyCombatQueue(assert, store, [1, 2], "callback11 ");
      verifyAgentQuery(assert, store, AgentQueryType.NOTIFY_DAMAGE, "callback11 ");
      const agentQuery = XMS.Selector.agentQuery(store.getState());
      const agentResponse = XMS.AgentResponseState.create(
      {
         agentId: agentQuery.agentId,
         responseKey: AgentQueryType.NOTIFY_DAMAGE,
         payload:
         {}
      });
      store.dispatch(ActionCreator.clearAgentQuery());
      store.dispatch(ActionCreator.setAgentResponse(agentResponse));
      CombatTask.doIt(store).then(callback12);
   };

   const callback12 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_DEAL_DAMAGE, "callback12 ");
      verifyCombatQueue(assert, store, [1, 2], "callback12 ");
      verifyAgentQuery(assert, store, undefined, "callback12 ");
      verifyAgentResponse(assert, store, undefined, "callback12 ");
      CombatTask.doIt(store).then(callback13);
   };

   const callback13 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_DECLARE_TARGET, "callback13 ");
      verifyCombatQueue(assert, store, [1, 2], "callback13 ");
      verifyAgentQuery(assert, store, undefined, "callback13 ");
      verifyAgentResponse(assert, store, undefined, "callback13 ");
      CombatTask.doIt(store).then(callback14);
   };

   const callback14 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_DECLARE_TARGET, "callback14 ");
      verifyCombatQueue(assert, store, [2], "callback14 ");
      verifyAgentQuery(assert, store, AgentQueryType.CHOOSE_WEAPON_AND_DEFENDER, "callback14 ");
      const agentQuery = XMS.Selector.agentQuery(store.getState());
      const agentResponse = XMS.AgentResponseState.create(
      {
         agentId: agentQuery.agentId,
         responseKey: AgentQueryType.CHOOSE_WEAPON_AND_DEFENDER,
         payload:
         {
            defenderId: 3,
            attackerId: agentQuery.payload.attackerId,
            rangeKey: Range.TWO,
            weaponKey: "primary"
         }
      });
      store.dispatch(ActionCreator.clearAgentQuery());
      store.dispatch(ActionCreator.setAgentResponse(agentResponse));
      CombatTask.doIt(store).then(callback15);
   };

   const callback15 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_ROLL_ATTACK_DICE, "callback15 ");
      verifyCombatQueue(assert, store, [2], "callback15 ");
      verifyAgentQuery(assert, store, undefined, "callback15 ");
      verifyAgentResponse(assert, store, undefined, "callback15 ");
      CombatTask.doIt(store).then(callback16);
   };

   const callback16 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_MODIFY_ATTACK_DICE, "callback16 ");
      verifyCombatQueue(assert, store, [2], "callback16 ");
      verifyAgentQuery(assert, store, undefined, "callback16 ");
      verifyAgentResponse(assert, store, undefined, "callback16 ");
      CombatTask.doIt(store).then(callback17);
   };

   const callback17 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_MODIFY_ATTACK_DICE, "callback17 ");
      verifyCombatQueue(assert, store, [2], "callback17 ");
      verifyAgentQuery(assert, store, AgentQueryType.CHOOSE_ATTACK_DICE_MODIFICATION, "callback17 ");
      const agentQuery = XMS.Selector.agentQuery(store.getState());
      const agentResponse = XMS.AgentResponseState.create(
      {
         agentId: agentQuery.agentId,
         responseKey: AgentQueryType.CHOOSE_ATTACK_DICE_MODIFICATION,
         payload:
         {}
      });
      store.dispatch(ActionCreator.clearAgentQuery());
      store.dispatch(ActionCreator.setAgentResponse(agentResponse));
      CombatTask.doIt(store).then(callback18);
   };

   const callback18 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_ROLL_DEFENSE_DICE, "callback18 ");
      verifyCombatQueue(assert, store, [2], "callback18 ");
      verifyAgentQuery(assert, store, undefined, "callback18 ");
      verifyAgentResponse(assert, store, undefined, "callback18 ");
      CombatTask.doIt(store).then(callback19);
   };

   const callback19 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_MODIFY_DEFENSE_DICE, "callback19 ");
      verifyCombatQueue(assert, store, [2], "callback19 ");
      verifyAgentQuery(assert, store, undefined, "callback19 ");
      verifyAgentResponse(assert, store, undefined, "callback19 ");
      CombatTask.doIt(store).then(callback20);
   };

   const callback20 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_MODIFY_DEFENSE_DICE, "callback20 ");
      verifyCombatQueue(assert, store, [2], "callback20 ");
      verifyAgentQuery(assert, store, AgentQueryType.CHOOSE_DEFENSE_DICE_MODIFICATION, "callback20 ");
      const agentQuery = XMS.Selector.agentQuery(store.getState());
      const agentResponse = XMS.AgentResponseState.create(
      {
         agentId: agentQuery.agentId,
         responseKey: AgentQueryType.CHOOSE_DEFENSE_DICE_MODIFICATION,
         payload:
         {}
      });
      store.dispatch(ActionCreator.clearAgentQuery());
      store.dispatch(ActionCreator.setAgentResponse(agentResponse));
      CombatTask.doIt(store).then(callback21);
   };

   const callback21 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_COMPARE_RESULTS, "callback21 ");
      verifyCombatQueue(assert, store, [2], "callback21 ");
      verifyAgentQuery(assert, store, undefined, "callback21 ");
      verifyAgentResponse(assert, store, undefined, "callback21 ");
      CombatTask.doIt(store).then(callback22);
   };

   const callback22 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_NOTIFY_DAMAGE, "callback22 ");
      verifyCombatQueue(assert, store, [2], "callback22 ");
      verifyAgentQuery(assert, store, undefined, "callback22 ");
      verifyAgentResponse(assert, store, undefined, "callback22 ");
      CombatTask.doIt(store).then(callback23);
   };

   const callback23 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_NOTIFY_DAMAGE, "callback23 ");
      verifyCombatQueue(assert, store, [2], "callback23 ");
      verifyAgentQuery(assert, store, AgentQueryType.NOTIFY_DAMAGE, "callback23 ");
      const agentQuery = XMS.Selector.agentQuery(store.getState());
      const agentResponse = XMS.AgentResponseState.create(
      {
         agentId: agentQuery.agentId,
         responseKey: AgentQueryType.NOTIFY_DAMAGE,
         payload:
         {}
      });
      store.dispatch(ActionCreator.clearAgentQuery());
      store.dispatch(ActionCreator.setAgentResponse(agentResponse));
      CombatTask.doIt(store).then(callback24);
   };

   const callback24 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_DEAL_DAMAGE, "callback24 ");
      verifyCombatQueue(assert, store, [2], "callback24 ");
      verifyAgentQuery(assert, store, undefined, "callback24 ");
      verifyAgentResponse(assert, store, undefined, "callback24 ");
      CombatTask.doIt(store).then(callback25);
   };

   const callback25 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_DECLARE_TARGET, "callback25 ");
      verifyCombatQueue(assert, store, [2], "callback25 ");
      verifyAgentQuery(assert, store, undefined, "callback25 ");
      verifyAgentResponse(assert, store, undefined, "callback25 ");
      CombatTask.doIt(store).then(callback26);
   };

   const callback26 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_DECLARE_TARGET, "callback26 ");
      verifyCombatQueue(assert, store, [], "callback26 ");
      verifyAgentQuery(assert, store, AgentQueryType.CHOOSE_WEAPON_AND_DEFENDER, "callback26 ");
      const agentQuery = XMS.Selector.agentQuery(store.getState());
      const agentResponse = XMS.AgentResponseState.create(
      {
         agentId: agentQuery.agentId,
         responseKey: AgentQueryType.CHOOSE_WEAPON_AND_DEFENDER,
         payload:
         {
            defenderId: 3,
            attackerId: agentQuery.payload.attackerId,
            rangeKey: Range.TWO,
            weaponKey: "primary"
         }
      });
      store.dispatch(ActionCreator.clearAgentQuery());
      store.dispatch(ActionCreator.setAgentResponse(agentResponse));
      CombatTask.doIt(store).then(callback27);
   };

   const callback27 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_ROLL_ATTACK_DICE, "callback27 ");
      verifyCombatQueue(assert, store, [], "callback27 ");
      verifyAgentQuery(assert, store, undefined, "callback27 ");
      verifyAgentResponse(assert, store, undefined, "callback27 ");
      CombatTask.doIt(store).then(callback28);
   };

   const callback28 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_MODIFY_ATTACK_DICE, "callback28 ");
      verifyCombatQueue(assert, store, [], "callback28 ");
      verifyAgentQuery(assert, store, undefined, "callback28 ");
      verifyAgentResponse(assert, store, undefined, "callback28 ");
      CombatTask.doIt(store).then(callback29);
   };

   const callback29 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_MODIFY_ATTACK_DICE, "callback29 ");
      verifyCombatQueue(assert, store, [], "callback29 ");
      verifyAgentQuery(assert, store, AgentQueryType.CHOOSE_ATTACK_DICE_MODIFICATION, "callback29 ");
      const agentQuery = XMS.Selector.agentQuery(store.getState());
      const agentResponse = XMS.AgentResponseState.create(
      {
         agentId: agentQuery.agentId,
         responseKey: AgentQueryType.CHOOSE_ATTACK_DICE_MODIFICATION,
         payload:
         {}
      });
      store.dispatch(ActionCreator.clearAgentQuery());
      store.dispatch(ActionCreator.setAgentResponse(agentResponse));
      CombatTask.doIt(store).then(callback30);
   };

   const callback30 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_ROLL_DEFENSE_DICE, "callback30 ");
      verifyCombatQueue(assert, store, [], "callback30 ");
      verifyAgentQuery(assert, store, undefined, "callback30 ");
      verifyAgentResponse(assert, store, undefined, "callback30 ");
      CombatTask.doIt(store).then(callback31);
   };

   const callback31 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_MODIFY_DEFENSE_DICE, "callback31 ");
      verifyCombatQueue(assert, store, [], "callback31 ");
      verifyAgentQuery(assert, store, undefined, "callback31 ");
      verifyAgentResponse(assert, store, undefined, "callback31 ");
      CombatTask.doIt(store).then(callback32);
   };

   const callback32 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_MODIFY_DEFENSE_DICE, "callback32 ");
      verifyCombatQueue(assert, store, [], "callback32 ");
      verifyAgentQuery(assert, store, AgentQueryType.CHOOSE_DEFENSE_DICE_MODIFICATION, "callback32 ");
      const agentQuery = XMS.Selector.agentQuery(store.getState());
      const agentResponse = XMS.AgentResponseState.create(
      {
         agentId: agentQuery.agentId,
         responseKey: AgentQueryType.CHOOSE_DEFENSE_DICE_MODIFICATION,
         payload:
         {}
      });
      store.dispatch(ActionCreator.clearAgentQuery());
      store.dispatch(ActionCreator.setAgentResponse(agentResponse));
      CombatTask.doIt(store).then(callback33);
   };

   const callback33 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_COMPARE_RESULTS, "callback33 ");
      verifyCombatQueue(assert, store, [], "callback33 ");
      verifyAgentQuery(assert, store, undefined, "callback33 ");
      verifyAgentResponse(assert, store, undefined, "callback33 ");
      CombatTask.doIt(store).then(callback34);
   };

   const callback34 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_NOTIFY_DAMAGE, "callback34 ");
      verifyCombatQueue(assert, store, [], "callback34 ");
      verifyAgentQuery(assert, store, undefined, "callback34 ");
      verifyAgentResponse(assert, store, undefined, "callback34 ");
      CombatTask.doIt(store).then(callback35);
   };

   const callback35 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_NOTIFY_DAMAGE, "callback35 ");
      verifyCombatQueue(assert, store, [], "callback35 ");
      verifyAgentQuery(assert, store, AgentQueryType.NOTIFY_DAMAGE, "callback35 ");
      const agentQuery = XMS.Selector.agentQuery(store.getState());
      const agentResponse = XMS.AgentResponseState.create(
      {
         agentId: agentQuery.agentId,
         responseKey: AgentQueryType.NOTIFY_DAMAGE,
         payload:
         {}
      });
      store.dispatch(ActionCreator.clearAgentQuery());
      store.dispatch(ActionCreator.setAgentResponse(agentResponse));
      CombatTask.doIt(store).then(callback36);
   };

   const callback36 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_DEAL_DAMAGE, "callback36 ");
      verifyCombatQueue(assert, store, [], "callback36 ");
      verifyAgentQuery(assert, store, undefined, "callback36 ");
      verifyAgentResponse(assert, store, undefined, "callback36 ");
      CombatTask.doIt(store).then(callback37);
   };

   const callback37 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_DECLARE_TARGET, "callback37 ");
      verifyCombatQueue(assert, store, [], "callback37 ");
      verifyAgentQuery(assert, store, undefined, "callback37 ");
      verifyAgentResponse(assert, store, undefined, "callback37 ");
      CombatTask.doIt(store).then(callback38);
   };

   const callback38 = store =>
   {
      // Verify.
      verifyPhaseKey(assert, store, Phase.COMBAT_END, "callback38 ");
      verifyCombatQueue(assert, store, [], "callback38 ");
      verifyAgentQuery(assert, store, undefined, "callback38 ");
      verifyAgentResponse(assert, store, undefined, "callback38 ");
      done();
   };

   // Run.
   const done = assert.async();
   CombatTask.doIt(store).then(callback01);
});

////////////////////////////////////////////////////////////////////////////////
const addAttackDice = store =>
{
   const activeCombatId = XMS.Selector.activeCombatId(store.getState());
   const attackDice = Immutable([AttackDiceValue.BLANK, AttackDiceValue.FOCUS, AttackDiceValue.HIT, AttackDiceValue.CRITICAL_HIT]);
   store.dispatch(ActionCreator.setCombatAttackDice(activeCombatId, attackDice));
};

const addCombatInstance = store =>
{
   const combatInstance = XMS.CombatState.create(
   {
      id: 1,
      attackerId: 3,
      defenderId: 2,
      rangeKey: Range.TWO
   });
   store.dispatch(ActionCreator.setActiveCombatId(1));
   store.dispatch(ActionCreator.setCombatInstance(combatInstance));
};

const addDefenseDice = store =>
{
   const activeCombatId = XMS.Selector.activeCombatId(store.getState());
   const defenseDice = Immutable([DefenseDiceValue.BLANK, DefenseDiceValue.EVADE, DefenseDiceValue.FOCUS]);
   store.dispatch(ActionCreator.setCombatDefenseDice(activeCombatId, defenseDice));
};

const initializeStore = () =>
{
   const store = Redux.createStore(Reducer.root, TestData.createGameState());

   return store;
};

const setPhase = (store, phaseKey) => store.dispatch(ActionCreator.setPhase(phaseKey));

const verifyActiveCombatId = (assert, store, expected, messagePrefix = "callback ") =>
{
   const activeCombatId = XMS.Selector.activeCombatId(store.getState());
   assert.equal(activeCombatId, expected, messagePrefix + "activeCombatId");
   assert.ok(XMS.Selector.combatInstance(activeCombatId, store.getState()), messagePrefix + "combatInstance");
};

const verifyActivePilotId = (assert, store, expected, messagePrefix = "callback ") => assert.equal(store.getState().activePilotId, expected, messagePrefix + "activePilotId");

const verifyAgentQuery = (assert, store, expected, messagePrefix = "callback ") =>
{
   if (expected === undefined)
   {
      assert.equal(store.getState().agentQuery, expected, messagePrefix + "agentQuery");
   }
   else
   {
      const agentQuery = XMS.Selector.agentQuery(store.getState());
      assert.ok(agentQuery, messagePrefix + "agentQuery");
      assert.equal(agentQuery.queryKey, expected, messagePrefix + "agentQuery.queryKey");
   }
};

const verifyAgentResponse = (assert, store, expected, messagePrefix = "callback ") => assert.equal(store.getState().agentResponse, expected, messagePrefix + "agentResponse");

const verifyAttackDiceKeys = (assert, store, expected, messagePrefix = "callback ") =>
{
   const activeCombatId = store.getState().activeCombatId;
   const combatInstance = store.getState().combatInstances[activeCombatId];
   const attackDiceKeys = combatInstance.attackDiceKeys;
   assert.ok(attackDiceKeys, messagePrefix + "attackDiceKeys");
   assert.equal(attackDiceKeys.length, expected, messagePrefix + "attackDiceKeys.length");
};

const verifyDefenseDiceKeys = (assert, store, expected, messagePrefix = "callback ") =>
{
   const activeCombatId = store.getState().activeCombatId;
   const combatInstance = store.getState().combatInstances[activeCombatId];
   const defenseDiceKeys = combatInstance.defenseDiceKeys;
   assert.ok(defenseDiceKeys, messagePrefix + "defenseDiceKeys");
   assert.equal(defenseDiceKeys.length, expected, messagePrefix + "defenseDiceKeys.length");
};

const verifyCombatQueue = (assert, store, expected, messagePrefix = "callback ") =>
{
   const combatQueue = store.getState().combatQueue;
   assert.ok(combatQueue, messagePrefix + "combatQueue");
   assert.equal(combatQueue.length, expected.length, messagePrefix + "combatQueue.length");
   for (let i = 0; i < expected.length; i++)
   {
      assert.equal(combatQueue[i], expected[i], messagePrefix + "combatQueue[" + i + "]");
   }
};

const verifyPhaseKey = (assert, store, expected, messagePrefix = "callback ") => assert.equal(store.getState().phaseKey, expected, messagePrefix + "phaseKey");

const CombatTaskTest = {};
export default CombatTaskTest;