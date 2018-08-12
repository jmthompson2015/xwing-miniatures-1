import EndTask from "./EndTask.js";
import Selector from "./Selector.js";
import TestData from "./TestData.js";

const Phase = XMA.Phase;

const ActionCreator = XMS.ActionCreator;
const Reducer = XMS.Reducer;

QUnit.module("EndTask");

QUnit.test("doIt() Start", function(assert)
{
   // Setup.
   const store = initializeStore();
   setPhase(store, Phase.END_START);

   const callback = store =>
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      verifyPhaseKey(assert, store, Phase.END_CLEAN_UP);
      done();
   };

   // Run.
   const done = assert.async();
   EndTask.doIt(store).then(callback);
});

QUnit.test("doIt() Clean Up", function(assert)
{
   // Setup.
   const store = initializeStore();
   const pilotIds = Selector.pilotIds(store.getState());
   const tokenKeys = XMA.EnumUtilities.keys(XMA.Token);
   const forEachFunction1 = pilotId => tokenKey => store.dispatch(ActionCreator.addPilotTokenCount(pilotId, tokenKey));
   const forEachFunction2 = pilotId => R.forEach(forEachFunction1(pilotId), tokenKeys);
   R.forEach(forEachFunction2, pilotIds);
   setPhase(store, Phase.END_CLEAN_UP);

   const callback = store =>
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      verifyPhaseKey(assert, store, Phase.END_ROUND_END);
      const forEachFunction3 = pilotId =>
      {
         const tokenCounts = XMS.Selector.countsByPilot(pilotId, store.getState());
         assert.equal(tokenCounts.cloak, 1, "cloak");
         assert.equal(tokenCounts.energy, 1, "energy");
         assert.equal(tokenCounts.evade, undefined, "evade");
         assert.equal(tokenCounts.focus, undefined, "focus");
         assert.equal(tokenCounts.ion, 1, "ion");
         assert.equal(tokenCounts.ordnance, 1, "ordnance");
         assert.equal(tokenCounts.reinforce, undefined, "reinforce");
         assert.equal(tokenCounts.shield, (pilotId === 3 ? 3 : 1), "shield");
         assert.equal(tokenCounts.stress, 1, "stress");
         assert.equal(tokenCounts.tractorBeam, undefined, "tractorBeam");
         assert.equal(tokenCounts.weaponsDisabled, undefined, "weaponsDisabled");
      };
      R.forEach(forEachFunction3, pilotIds);

      verifyAgentQuery(assert, store, undefined);
      verifyAgentResponse(assert, store, undefined);
      done();
   };

   // Run.
   const done = assert.async();
   EndTask.doIt(store).then(callback);
});

QUnit.test("doIt() Round End", function(assert)
{
   // Setup.
   const store = initializeStore();
   setPhase(store, Phase.END_ROUND_END);

   const callback = store =>
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      verifyPhaseKey(assert, store, Phase.END_END);

      const pilotIds = Selector.pilotIds(store.getState());
      const forEachFunction = pilotId =>
      {
         assert.equal(store.getState().pilotToManeuver[pilotId], undefined);
      };
      R.forEach(forEachFunction, pilotIds);

      verifyAgentQuery(assert, store, undefined);
      verifyAgentResponse(assert, store, undefined);
      done();
   };

   // Run.
   const done = assert.async();
   EndTask.doIt(store).then(callback);
});

QUnit.test("doIt() End", function(assert)
{
   // Setup.
   const store = initializeStore();
   setPhase(store, Phase.END_END);

   const callback = store =>
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      verifyPhaseKey(assert, store, Phase.PLANNING_START);
      done();
   };

   // Run.
   const done = assert.async();
   EndTask.doIt(store).then(callback);
});

////////////////////////////////////////////////////////////////////////////////
const initializeStore = () =>
{
   const store = Redux.createStore(Reducer.root, TestData.createGameState());

   return store;
};

const setPhase = (store, phaseKey) => store.dispatch(ActionCreator.setPhase(phaseKey));

const verifyAgentQuery = (assert, store, expected, messagePrefix = "callback ") =>
{
   if (expected === undefined)
   {
      assert.equal(store.getState().agentQuery, expected, messagePrefix + "agentQuery");
   }
   else
   {
      const agentQuery = store.getState().agentQuery;
      assert.ok(agentQuery, messagePrefix + "agentQuery");
      assert.equal(agentQuery.queryKey, expected, messagePrefix + "agentQuery.queryKey");
   }
};

const verifyAgentResponse = (assert, store, expected, messagePrefix = "callback ") => assert.equal(store.getState().agentResponse, expected, messagePrefix + "agentResponse");

const verifyPhaseKey = (assert, store, expected, messagePrefix = "callback ") => assert.equal(store.getState().phaseKey, expected, messagePrefix + "phaseKey");

const EndTaskTest = {};
export default EndTaskTest;