import AgentState from "./AgentState.js";
import DamageState from "./DamageState.js";
import GameState from "./GameState.js";
import PilotState from "./PilotState.js";
import PositionState from "./PositionState.js";
import SquadState from "./SquadState.js";
import StatBonusesState from "./StatBonusesState.js";
import TargetLockState from "./TargetLockState.js";
import TokenCountsState from "./TokenCountsState.js";
import UpgradeState from "./UpgradeState.js";

const TestData = {};

TestData.createAgentImperial = (id, squadId, strategy) =>
  AgentState.create({ id, name: "Imperial Agent", strategy, squad: squadId });

TestData.createAgentRebel = (id, squadId, strategy) =>
  AgentState.create({ id, name: "Rebel Agent", strategy, squad: squadId });

TestData.createDamage = (id, damageKey) => DamageState.create({ id, damageKey });

TestData.createDamageDeck = () => {
  // There are two of each, except seven of Direct Hit!
  const keys = [
    "blindedPilot",
    "consoleFire",
    "damagedCockpit",
    "damagedEngine",
    "damagedSensorArray",
    "directHit",
    "injuredPilot",
    "minorExplosion",
    "minorHullBreach",
    "munitionsFailure",
    "structuralDamage",
    "stunnedPilot",
    "thrustControlFire",
    "weaponMalfunction"
  ];
  let count = 1;

  const damageInstances = keys.reduce((accumulator, damageKey) => {
    accumulator[count] = TestData.createDamage(count, damageKey);
    count += 1;
    accumulator[count] = TestData.createDamage(count, damageKey);
    count += 1;
    return accumulator;
  }, {});

  for (let i = 0; i < 5; i += 1) {
    damageInstances[count] = TestData.createDamage(count, "directHit");
    count += 1;
  }

  const damageDeck = Object.values(damageInstances).map(damage => damage.id);

  // Shuffle.
  damageDeck.sort(() => Math.random() - 0.5);

  return {
    damageInstances,
    damageDeck
  };
};

TestData.createGameState = () => {
  const { damageDeck, damageInstances } = TestData.createDamageDeck();

  const position1 = TestData.createPosition(915 / 3, 20, 90);
  const position2 = TestData.createPosition((915 * 2) / 3, 20, 90);
  const position3 = TestData.createPosition(Math.round(915 / 2), 915 - 20, 270);

  const statBonuses1 = StatBonusesState.create();
  const statBonuses2 = StatBonusesState.create();
  const statBonuses3 = R.assoc("hull", 1, StatBonusesState.create());

  const tokenCounts1 = TokenCountsState.create();
  const tokenCounts2 = TokenCountsState.create();
  const tokenCounts3 = R.assoc("shield", 2, TokenCountsState.create());

  const upgradeInstances = {};
  upgradeInstances[1] = TestData.createUpgrade(1, "marksmanship", TokenCountsState.create());
  upgradeInstances[2] = TestData.createUpgrade(2, "protonTorpedoes", TokenCountsState.create());
  upgradeInstances[3] = TestData.createUpgrade(3, "r2D2_astromech", TokenCountsState.create());

  const pilotInstances = {};
  pilotInstances[1] = TestData.createPilot(
    1,
    "maulerMithel",
    [1],
    [3],
    position1,
    statBonuses1,
    tokenCounts1,
    [1]
  );
  pilotInstances[2] = TestData.createPilot(
    2,
    "darkCurse",
    [2],
    [4],
    position2,
    statBonuses2,
    tokenCounts2,
    []
  );
  pilotInstances[3] = TestData.createPilot(
    3,
    "lukeSkywalker",
    [],
    [],
    position3,
    statBonuses3,
    tokenCounts3,
    [2, 3]
  );

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

  return GameState.create({
    phaseKey: "planningStart",
    round: 1,
    userMessage: "This is some user message.",

    damageDeck,
    targetLocks,

    agentInstances,
    damageInstances,
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
  PilotState.create({
    id,
    pilotKey,

    criticals,
    damages,
    position,
    statBonuses,
    tokenCounts,
    upgrades: upgradeIds
  });

TestData.createPosition = (x, y, heading) => PositionState.create({ x, y, heading });

TestData.createSquadCoreSetImperial = (squadId, pilotIds) =>
  SquadState.create({
    id: squadId,
    name: "Imperial Core Set: 36 Points",
    year: 2012,
    description: "TIE Fighters x2",
    points: 36,
    pilots: pilotIds
  });

TestData.createSquadCoreSetRebel = (squadId, pilotIds) =>
  SquadState.create({
    id: squadId,
    name: "Rebel Core Set: 36 Points",
    year: 2012,
    description: "X-Wing",
    points: 36,
    pilots: pilotIds
  });

TestData.createTargetLock = (id, attackerId, defenderId) =>
  TargetLockState.create({ id, attackerId, defenderId });

TestData.createUpgrade = (id, upgradeKey, tokenCounts) =>
  UpgradeState.create({ id, upgradeKey, tokenCounts });

export default TestData;
