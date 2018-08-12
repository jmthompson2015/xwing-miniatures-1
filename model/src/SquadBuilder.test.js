import SquadBuilder from "./SquadBuilder.js";

const PilotCard = XMA.PilotCard;
const UpgradeCard = XMA.UpgradeCard;

const Reducer = XMS.Reducer;

QUnit.module("SquadBuilder");

QUnit.test("build() Core Set Imperial", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const squadId = 1;
   const name = "Imperial Core Set: 36 Points";
   const year = 2012;
   const description = "TIE Fighters x2";
   const pilotAndUpgradeKeys = [];
   pilotAndUpgradeKeys.push(
   {
      pilotKey: PilotCard.MAULER_MITHEL,
      upgradeKeys: [UpgradeCard.MARKSMANSHIP]
   });
   pilotAndUpgradeKeys.push(
   {
      pilotKey: PilotCard.DARK_CURSE
   });

   // Run.
   const result = SquadBuilder.build(store, name, year, description, squadId, pilotAndUpgradeKeys);

   // Verify.
   assert.ok(result);
   assert.equal(result.id, squadId, "squad.id");
   assert.equal(result.name, name, "squad.name");
   assert.equal(result.year, year, "squad.year");
   assert.equal(result.description, description, "squad.description");
   assert.equal(result.points, 36, "squad.points");
   assert.equal(result.pilots.join(), [1, 2].join(), "squad.pilots");

   const pilotInstances = store.getState().pilotInstances;
   assert.ok(pilotInstances);
   assert.equal(Object.keys(pilotInstances).length, 2, "pilotInstances.length === 2");
   assert.equal(pilotInstances[1].pilotKey, PilotCard.MAULER_MITHEL);
   assert.equal(pilotInstances[2].pilotKey, PilotCard.DARK_CURSE);

   const upgradeInstances = store.getState().upgradeInstances;
   assert.ok(upgradeInstances);
   assert.equal(Object.keys(upgradeInstances).length, 1, "upgradeInstances.length === 1");
   assert.equal(upgradeInstances[1].upgradeKey, UpgradeCard.MARKSMANSHIP);

   const pilotTokenCounts1 = pilotInstances[1].tokenCounts;
   assert.ok(pilotTokenCounts1, "pilotTokenCounts1");
   assert.equal(pilotTokenCounts1.shield, 0, "pilotTokenCounts1.shield === 0");

   const pilotTokenCounts2 = pilotInstances[2].tokenCounts;
   assert.ok(pilotTokenCounts2);
   assert.equal(pilotTokenCounts2.shield, 0, "pilotTokenCounts2.shield === 0");

   const pilotUpgrades1 = pilotInstances[1].upgrades;
   assert.ok(pilotUpgrades1);
   assert.equal(pilotUpgrades1.length, 1, "pilotUpgrades1.length === 1");
   assert.equal(pilotUpgrades1[0], 1);

   const pilotUpgrades2 = pilotInstances[2].upgrades;
   assert.ok(pilotUpgrades2);
   assert.equal(pilotUpgrades2.length, 0, "pilotUpgrades2.length === 0");
});

QUnit.test("build() Core Set Rebel", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const squadId = 2;
   const name = "Rebel Core Set: 36 Points";
   const year = 2012;
   const description = "X-Wing";
   const pilotAndUpgradeKeys = [];
   pilotAndUpgradeKeys.push(
   {
      pilotKey: PilotCard.LUKE_SKYWALKER,
      upgradeKeys: [UpgradeCard.PROTON_TORPEDOES, UpgradeCard.R2_D2_ASTROMECH]
   });

   // Run.
   const result = SquadBuilder.build(store, name, year, description, squadId, pilotAndUpgradeKeys);

   // Verify.
   assert.ok(result);
   assert.equal(result.id, squadId, "squad.id");
   assert.equal(result.name, name, "squad.name");
   assert.equal(result.year, year, "squad.year");
   assert.equal(result.description, description, "squad.description");
   assert.equal(result.points, 36, "squad.points");
   assert.equal(result.pilots.join(), [1].join(), "squad.pilots");

   const pilotInstances = store.getState().pilotInstances;
   assert.ok(pilotInstances);
   assert.equal(Object.keys(pilotInstances).length, 1, "pilotInstances.length === 1");
   assert.equal(pilotInstances[1].pilotKey, PilotCard.LUKE_SKYWALKER);

   const upgradeInstances = store.getState().upgradeInstances;
   assert.ok(upgradeInstances);
   assert.equal(Object.keys(upgradeInstances).length, 2, "upgradeInstances.length === 2");
   assert.equal(upgradeInstances[1].upgradeKey, UpgradeCard.PROTON_TORPEDOES);
   assert.equal(upgradeInstances[2].upgradeKey, UpgradeCard.R2_D2_ASTROMECH);

   const pilotTokenCounts1 = XMS.Selector.countsByPilot(1, store.getState());
   assert.ok(pilotTokenCounts1);
   assert.equal(pilotTokenCounts1.shield, 2, "pilotTokenCounts1.shield === 2");

   const pilotUpgrades1 = XMS.Selector.upgradeIdsByPilot(1, store.getState());
   assert.ok(pilotUpgrades1);
   assert.equal(pilotUpgrades1.length, 2, "pilotUpgrades1.length === 2");
   assert.equal(pilotUpgrades1[0], 1);
   assert.equal(pilotUpgrades1[1], 2);
});

QUnit.test("buildCoreSetImperial()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const squadId = 1;

   // Run.
   const result = SquadBuilder.buildCoreSetImperial(store, squadId);

   // Verify.
   assert.ok(result);
   assert.equal(result.id, squadId, "squad.id");
   assert.equal(result.name, "Imperial Core Set: 36 Points", "squad.name");
   assert.equal(result.year, 2012, "squad.year");
   assert.equal(result.description, "TIE Fighters x2", "squad.description");
   assert.equal(result.points, 36, "squad.points");

   const pilotIds = store.getState().squadInstances[squadId].pilots;
   assert.equal(pilotIds.length, 2, "squad.pilotIds.length");
   assert.equal(pilotIds[0], 1, "squad.pilotIds[0]");
   assert.equal(pilotIds[1], 2, "squad.pilotIds[1]");

   const pilotInstances = store.getState().pilotInstances;
   assert.ok(pilotInstances);
   assert.equal(Object.keys(pilotInstances).length, 2, "pilotInstances.length === 2");
   assert.equal(pilotInstances[1].pilotKey, PilotCard.MAULER_MITHEL);
   assert.equal(pilotInstances[2].pilotKey, PilotCard.DARK_CURSE);

   const upgradeInstances = store.getState().upgradeInstances;
   assert.ok(upgradeInstances);
   assert.equal(Object.keys(upgradeInstances).length, 1, "upgradeInstances.length === 1");
   assert.equal(upgradeInstances[1].upgradeKey, UpgradeCard.MARKSMANSHIP);

   const pilotTokenCounts1 = store.getState().pilotInstances[1].tokenCounts;
   assert.ok(pilotTokenCounts1);
   assert.equal(pilotTokenCounts1.shield, 0, "pilotTokenCounts1.shield === 0");

   const pilotTokenCounts2 = store.getState().pilotInstances[2].tokenCounts;
   assert.ok(pilotTokenCounts2);
   assert.equal(pilotTokenCounts2.shield, 0, "pilotTokenCounts2.shield === 0");

   const pilotUpgrades1 = store.getState().pilotInstances[1].upgrades;
   assert.ok(pilotUpgrades1);
   assert.equal(pilotUpgrades1.length, 1, "pilotUpgrades1.length === 1");
   assert.equal(pilotUpgrades1[0], 1);

   const pilotUpgrades2 = store.getState().pilotInstances[2].upgrades;
   assert.ok(pilotUpgrades2);
   assert.equal(pilotUpgrades2.length, 0, "pilotUpgrades2.length === 0");
});

QUnit.test("buildCoreSetRebel()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const squadId = 2;

   // Run.
   const result = SquadBuilder.buildCoreSetRebel(store, squadId);

   // Verify.
   assert.ok(result);
   assert.equal(result.id, squadId, "squad.id");
   assert.equal(result.name, "Rebel Core Set: 36 Points", "squad.name");
   assert.equal(result.year, 2012, "squad.year");
   assert.equal(result.description, "X-Wing", "squad.description");
   assert.equal(result.points, 36, "squad.points");

   const pilotIds = store.getState().squadInstances[squadId].pilots;
   assert.equal(pilotIds.length, 1, "squad.pilotIds.length");
   assert.equal(pilotIds[0], 1, "squad.pilotIds[0]");

   const pilotInstances = store.getState().pilotInstances;
   assert.ok(pilotInstances);
   assert.equal(Object.keys(pilotInstances).length, 1, "pilotInstances.length === 1");
   assert.equal(pilotInstances[1].pilotKey, PilotCard.LUKE_SKYWALKER);

   const upgradeInstances = store.getState().upgradeInstances;
   assert.ok(upgradeInstances);
   assert.equal(Object.keys(upgradeInstances).length, 2, "upgradeInstances.length === 2");
   assert.equal(upgradeInstances[1].upgradeKey, UpgradeCard.PROTON_TORPEDOES);
   assert.equal(upgradeInstances[2].upgradeKey, UpgradeCard.R2_D2_ASTROMECH);

   const pilotTokenCounts1 = store.getState().pilotInstances[1].tokenCounts;
   assert.ok(pilotTokenCounts1);
   assert.equal(pilotTokenCounts1.shield, 2, "pilotTokenCounts1.shield === 2");

   const pilotUpgrades1 = store.getState().pilotInstances[1].upgrades;
   assert.ok(pilotUpgrades1);
   assert.equal(pilotUpgrades1.length, 2, "pilotUpgrades1.length === 2");
   assert.equal(pilotUpgrades1[0], 1);
   assert.equal(pilotUpgrades1[1], 2);
});

QUnit.test("build2017USNationals1()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const squadId = 1;

   // Run.
   const result = SquadBuilder.build2017USNationals1(store, squadId);

   // Verify.
   assert.ok(result);
   assert.equal(result.id, squadId, "squad.id");
   assert.equal(result.name, "US Nationals #1", "squad.name");
   assert.equal(result.year, 2017, "squad.year");
   assert.equal(result.description, "K-Wing; Scurrg", "squad.description");
   assert.equal(result.points, 97, "squad.points");

   const pilotIds = store.getState().squadInstances[squadId].pilots;
   assert.equal(pilotIds.length, 2, "squad.pilotIds.length");
});

QUnit.test("build2013Worlds4()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const squadId = 1;

   // Run.
   const result = SquadBuilder.build2013Worlds4(store, squadId);

   // Verify.
   assert.ok(result);
   assert.equal(result.id, squadId, "squad.id");
   assert.equal(result.name, "Worlds #4", "squad.name");
   assert.equal(result.year, 2013, "squad.year");
   assert.equal(result.description, "TIE Fighters x7", "squad.description");
   assert.equal(result.points, 100, "squad.points");

   const pilotIds = store.getState().squadInstances[squadId].pilots;
   assert.equal(pilotIds.length, 7, "squad.pilotIds.length");
});

QUnit.test("build2013Worlds5()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const squadId = 1;

   // Run.
   const result = SquadBuilder.build2013Worlds5(store, squadId);

   // Verify.
   assert.ok(result);
   assert.equal(result.id, squadId, "squad.id");
   assert.equal(result.name, "Worlds #5", "squad.name");
   assert.equal(result.year, 2013, "squad.year");
   assert.equal(result.description, "B-Wing; X-Wings x2; Y-Wings x2", "squad.description");
   assert.equal(result.points, 100, "squad.points");

   const pilotIds = store.getState().squadInstances[squadId].pilots;
   assert.equal(pilotIds.length, 5, "squad.pilotIds.length");
});

const SquadBuilderTest = {};
export default SquadBuilderTest;