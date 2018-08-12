const PilotCard = XMA.PilotCard;
const Stat = XMA.Stat;
const Token = XMA.Token;
const UpgradeCard = XMA.UpgradeCard;

const StatBonusesState = XMS.StatBonusesState;
const TokenCountsState = XMS.TokenCountsState;

const TestData = {};

TestData.createAgentImperial = function(id, squadId, strategy)
{
   return XMS.AgentState.create(
   {
      id: id,
      strategy: strategy,
      squad: squadId
   });
};

TestData.createAgentRebel = function(id, squadId, strategy)
{
   return XMS.AgentState.create(
   {
      id: id,
      strategy: strategy,
      squad: squadId
   });
};

TestData.createGameState = function()
{
   const damageObj = XMM.DamageDeck.create(XMA.DamageCardTFA);
   const damageInstances = damageObj.damageInstances;
   const damageDeck = damageObj.damageDeck;

   const position1 = TestData.createPosition(915 / 3, 20, 90);
   const position2 = TestData.createPosition(915 * 2 / 3, 20, 90);
   const position3 = TestData.createPosition(Math.round(915 / 2), 915 - 20, 270);

   const statBonuses1 = StatBonusesState.create();
   const statBonuses2 = StatBonusesState.create();
   const statBonuses3 = R.assoc(Stat.HULL, 1, StatBonusesState.create());

   const tokenCounts1 = TokenCountsState.create();
   const tokenCounts2 = TokenCountsState.create();
   const tokenCounts3 = R.assoc(Token.SHIELD, 2, TokenCountsState.create());

   const upgradeInstances = {};
   upgradeInstances[1] = TestData.createUpgrade(1, UpgradeCard.MARKSMANSHIP, TokenCountsState.create());
   upgradeInstances[2] = TestData.createUpgrade(2, UpgradeCard.PROTON_TORPEDOES, TokenCountsState.create());
   upgradeInstances[3] = TestData.createUpgrade(3, UpgradeCard.R2_D2_ASTROMECH, TokenCountsState.create());
   upgradeInstances[4] = TestData.createUpgrade(4, UpgradeCard.HULL_UPGRADE, TokenCountsState.create());

   const pilotInstances = {};
   pilotInstances[1] = TestData.createPilot(1, PilotCard.MAULER_MITHEL, [1], [3], position1, statBonuses1, tokenCounts1, [1]);
   pilotInstances[2] = TestData.createPilot(2, PilotCard.DARK_CURSE, [2], [4], position2, statBonuses2, tokenCounts2, []);
   pilotInstances[3] = TestData.createPilot(3, PilotCard.LUKE_SKYWALKER, [], [], position3, statBonuses3, tokenCounts3, [2, 3, 4]);

   const squadInstances = {
      1: TestData.createSquadCoreSetImperial(1, [1, 2]),
      2: TestData.createSquadCoreSetRebel(2, [3])
   };

   const agentInstances = {};
   agentInstances[1] = TestData.createAgentImperial(1, 1);
   agentInstances[2] = TestData.createAgentRebel(2, 2);

   const targetLocks = [];
   targetLocks.push(TestData.createTargetLock("A", 1, 3));
   targetLocks.push(TestData.createTargetLock("B", 2, 3));
   targetLocks.push(TestData.createTargetLock("C", 3, 1));

   return XMS.GameState.create(
   {
      activePilotId: 1,
      phaseKey: "planningStart",
      round: 1,

      damageDeck: damageDeck,
      targetLocks: targetLocks,

      agentInstances: agentInstances,
      damageInstances: damageInstances,
      pilotInstances: pilotInstances,
      squadInstances: squadInstances,
      upgradeInstances: upgradeInstances
   });
};

TestData.createPilot = function(id, pilotKey, criticals, damages, position, statBonuses, tokenCounts, upgradeIds)
{
   return XMS.PilotState.create(
   {
      id: id,
      pilotKey: pilotKey,

      criticals: criticals,
      damages: damages,
      position: position,
      statBonuses: statBonuses,
      tokenCounts: tokenCounts,
      upgrades: upgradeIds
   });
};

TestData.createPosition = function(x, y, heading)
{
   return XMS.PositionState.create(
   {
      x: x,
      y: y,
      heading: heading
   });
};

TestData.createSquadCoreSetImperial = function(squadId, pilotIds)
{
   return XMS.SquadState.create(
   {
      id: squadId,
      name: "Imperial Core Set: 36 Points",
      year: 2012,
      description: "TIE Fighters x2",
      points: 36,
      pilots: pilotIds
   });
};

TestData.createSquadCoreSetRebel = function(squadId, pilotIds)
{
   return XMS.SquadState.create(
   {
      id: squadId,
      name: "Rebel Core Set: 36 Points",
      year: 2012,
      description: "X-Wing",
      points: 36,
      pilots: pilotIds
   });
};

TestData.createTargetLock = function(id, attackerId, defenderId)
{
   return XMS.TargetLockState.create(
   {
      id: id,
      attackerId: attackerId,
      defenderId: defenderId
   });
};

TestData.createUpgrade = function(id, upgradeKey, tokenCounts)
{
   return XMS.UpgradeState.create(
   {
      id: id,
      upgradeKey: upgradeKey,
      tokenCounts: tokenCounts
   });
};

export default TestData;