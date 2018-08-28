import SquadBuilder from "./SquadBuilder.js";
import SquadUtilities from "./SquadUtilities.js";

const { Faction } = XMA;

const { Reducer } = XMS;

QUnit.module("SquadUtilities");

QUnit.test("determineFaction() First Order", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root);
  const squad = SquadBuilder.build2016Worlds3(store, 1);

  // Run.
  const result = SquadUtilities.determineFaction(store.getState(), squad.id);

  // Verify.
  assert.ok(result);
  assert.equal(result, Faction.FIRST_ORDER);
});

QUnit.test("determineFaction() Core Set Imperial", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root);
  const squad = SquadBuilder.buildCoreSetImperial(store, 1);

  // Run.
  const result = SquadUtilities.determineFaction(store.getState(), squad.id);

  // Verify.
  assert.ok(result);
  assert.equal(result, Faction.GALACTIC_EMPIRE);
});

QUnit.test("determineFaction() Core Set Rebel", assert => {
  // Setup.
  const store = Redux.createStore(Reducer.root);
  const squad = SquadBuilder.buildCoreSetRebel(store, 1);

  // Run.
  const result = SquadUtilities.determineFaction(store.getState(), squad.id);

  // Verify.
  assert.ok(result);
  assert.equal(result, Faction.REBEL_ALLIANCE);
});

QUnit.test("determineFaction() Resistance", assert => {
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
