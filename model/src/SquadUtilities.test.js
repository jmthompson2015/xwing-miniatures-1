import SquadBuilder from "./SquadBuilder.js";
import SquadUtilities from "./SquadUtilities.js";

const Faction = XMA.Faction;

const Reducer = XMS.Reducer;

QUnit.module("SquadUtilities");

QUnit.test("determineFaction() First Order", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const squad = SquadBuilder.build2016Worlds3(store, 1);

   // Run.
   const result = SquadUtilities.determineFaction(store.getState(), squad.id);

   // Verify.
   assert.ok(result);
   assert.equal(result, Faction.FIRST_ORDER);
});

QUnit.test("determineFaction() Core Set Imperial", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const squad = SquadBuilder.buildCoreSetImperial(store, 1);

   // Run.
   const result = SquadUtilities.determineFaction(store.getState(), squad.id);

   // Verify.
   assert.ok(result);
   assert.equal(result, Faction.GALACTIC_EMPIRE);
});

QUnit.test("determineFaction() Core Set Rebel", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const squad = SquadBuilder.buildCoreSetRebel(store, 1);

   // Run.
   const result = SquadUtilities.determineFaction(store.getState(), squad.id);

   // Verify.
   assert.ok(result);
   assert.equal(result, Faction.REBEL_ALLIANCE);
});

QUnit.test("determineFaction() Resistance", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const squad = SquadBuilder.build2017Worlds2(store, 1);

   // Run.
   const result = SquadUtilities.determineFaction(store.getState(), squad.id);

   // Verify.
   assert.ok(result);
   assert.equal(result, Faction.RESISTANCE);
});

const SquadUtilitiesTest = {};
export default SquadUtilitiesTest;