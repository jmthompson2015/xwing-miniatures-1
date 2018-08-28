import DamageDeck from "./DamageDeck.js";
import PilotUtils from "./PilotUtilities.js";

const { PilotCard, Token, UpgradeCard } = XMA;

const { AgentState, StatBonusesState, TokenCountsState } = XMS;

const TestData = {};

TestData.createAgentImperial = (id, squadId, strategy) =>
  AgentState.create({
    id,
    strategy,
    squad: squadId
  });

TestData.createAgentRebel = (id, squadId, strategy) =>
  AgentState.create({
    id,
    strategy,
    squad: squadId
  });

TestData.createGameState = () => {
  const damageObj = DamageDeck.create(XMA.DamageCardTFA);

  const position1 = TestData.createPosition(915 / 3, 20, 90);
  const position2 = TestData.createPosition((915 * 2) / 3, 20, 90);
  const position3 = TestData.createPosition(Math.round(915 / 2), 915 - 20, 270);

  const statBonuses1 = StatBonusesState.create();
  const statBonuses2 = StatBonusesState.create();
  const statBonuses3 = StatBonusesState.create();

  const tokenCounts1 = TokenCountsState.create();
  const tokenCounts2 = TokenCountsState.create();
  const tokenCounts3 = R.assoc(Token.SHIELD, 2, TokenCountsState.create());

  const upgradeInstances = {};
  upgradeInstances[1] = TestData.createUpgrade(
    1,
    UpgradeCard.MARKSMANSHIP,
    TokenCountsState.create()
  );
  upgradeInstances[2] = TestData.createUpgrade(
    2,
    UpgradeCard.PROTON_TORPEDOES,
    TokenCountsState.create()
  );
  upgradeInstances[3] = TestData.createUpgrade(
    3,
    UpgradeCard.R2_D2_ASTROMECH,
    TokenCountsState.create()
  );
  upgradeInstances[4] = TestData.createUpgrade(
    4,
    UpgradeCard.HULL_UPGRADE,
    TokenCountsState.create()
  );

  const pilotInstances = {};
  pilotInstances[1] = TestData.createPilot(
    1,
    PilotCard.MAULER_MITHEL,
    [1],
    [3],
    position1,
    statBonuses1,
    tokenCounts1,
    [1]
  );
  pilotInstances[2] = TestData.createPilot(
    2,
    PilotCard.DARK_CURSE,
    [2],
    [4],
    position2,
    statBonuses2,
    tokenCounts2,
    []
  );
  pilotInstances[3] = TestData.createPilot(
    3,
    PilotCard.LUKE_SKYWALKER,
    [],
    [],
    position3,
    statBonuses3,
    tokenCounts3,
    [2, 3, 4]
  );

  const statBonuses11 = PilotUtils.createStatBonuses(
    pilotInstances[1].upgrades.map(upgradeId => upgradeInstances[upgradeId].upgradeKey)
  );
  pilotInstances[1] = R.assoc("statBonuses", statBonuses11, pilotInstances[1]);
  const statBonuses33 = PilotUtils.createStatBonuses(
    pilotInstances[3].upgrades.map(upgradeId => upgradeInstances[upgradeId].upgradeKey)
  );
  pilotInstances[3] = R.assoc("statBonuses", statBonuses33, pilotInstances[3]);

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

  return XMS.GameState.create({
    damageDeck: damageObj.damageDeck,
    targetLocks,

    agentInstances,
    damageInstances: damageObj.damageInstances,
    pilotInstances,
    squadInstances,
    upgradeInstances
  });
};

TestData.createPilot = (
  id,
  pilotKey,
  criticals,
  damages,
  position,
  statBonuses,
  tokenCounts,
  upgradeIds
) =>
  XMS.PilotState.create({
    id,
    pilotKey,

    criticals,
    damages,
    position,
    statBonuses,
    tokenCounts,
    upgrades: upgradeIds
  });

TestData.createPosition = (x, y, heading) =>
  XMS.PositionState.create({
    x,
    y,
    heading
  });

TestData.createSquadCoreSetImperial = (squadId, pilotIds) =>
  XMS.SquadState.create({
    id: squadId,
    name: "Imperial Core Set: 36 Points",
    year: 2012,
    description: "TIE Fighters x2",
    points: 36,
    pilots: pilotIds
  });

TestData.createSquadCoreSetRebel = (squadId, pilotIds) =>
  XMS.SquadState.create({
    id: squadId,
    name: "Rebel Core Set: 36 Points",
    year: 2012,
    description: "X-Wing",
    points: 36,
    pilots: pilotIds
  });

TestData.createTargetLock = (id, attackerId, defenderId) =>
  XMS.TargetLockState.create({
    id,
    attackerId,
    defenderId
  });

TestData.createUpgrade = (id, upgradeKey, tokenCounts) =>
  XMS.UpgradeState.create({
    id,
    upgradeKey,
    tokenCounts
  });

export default TestData;
