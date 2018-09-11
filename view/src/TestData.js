const {
  ConditionCard,
  DamageCard,
  DiceModification,
  PilotCard,
  ShipAction,
  Stat,
  Token,
  UpgradeCard
} = XMA;

const { StatBonusesState, TokenCountsState } = XMS;

const TestData = {};

const createAbility = (sourceName, sourceKey, context) =>
  XMS.AbilityState.create({ sourceName, sourceKey, context });

TestData.createAbilities = () => {
  const conditionKeys = [ConditionCard.A_DEBT_TO_PAY];
  const conditions = R.map(key => createAbility("ConditionCard", key), conditionKeys);
  const damageKeys = [DamageCard.CONSOLE_FIRE, DamageCard.MINOR_HULL_BREACH];
  const damages = R.map(key => createAbility("DamageCard", key), damageKeys);
  const diceModificationKeys = [
    DiceModification.ATTACK_SPEND_FOCUS,
    DiceModification.DEFENSE_SPEND_EVADE
  ];
  const modifications = R.map(key => createAbility("DiceModification", key), diceModificationKeys);
  const pilotKeys = [PilotCard.AIREN_CRACKEN, PilotCard.BOSSK, PilotCard.CAPTAIN_YORR];
  const pilots = R.map(key => createAbility("PilotCard", key), pilotKeys);
  const shipActionKeys = [ShipAction.EVADE, ShipAction.FOCUS];
  const shipActions = R.map(key => createAbility("ShipAction", key), shipActionKeys);
  const upgradeKeys = [UpgradeCard.LIGHTNING_REFLEXES, UpgradeCard.TIE_X7];
  const upgrades = R.map(key => createAbility("UpgradeCard", key), upgradeKeys);

  return R.pipe(
    R.append(shipActions),
    R.append(modifications),
    R.append(pilots),
    R.append(upgrades),
    R.append(damages),
    R.append(conditions),
    R.flatten
  )([]);
};

TestData.createAgentImperial = (id, squadId, strategy) =>
  XMS.AgentState.create({ id, strategy, squad: squadId });

TestData.createAgentRebel = (id, squadId, strategy) =>
  XMS.AgentState.create({ id, strategy, squad: squadId });

TestData.createDamage = (id, damageKey) => XMS.DamageState.create({ id, damageKey });

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

  return { damageInstances, damageDeck };
};

TestData.createGameState = () => {
  const { damageDeck, damageInstances } = TestData.createDamageDeck();

  const position1 = TestData.createPosition(915 / 3, 20, 90);
  const position2 = TestData.createPosition((915 * 2) / 3, 20, 90);
  const position3 = TestData.createPosition(Math.round(915 / 2), 915 - 20, 270);

  const statBonuses1 = StatBonusesState.create();
  const statBonuses2 = StatBonusesState.create();
  const statBonuses3 = R.assoc(Stat.HULL, 1, StatBonusesState.create());

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
    activePilotId: 1,
    phaseKey: "planningStart",
    round: 1,

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

TestData.createPosition = (x, y, heading) => XMS.PositionState.create({ x, y, heading });

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

TestData.createStore = () => {
  const store = Redux.createStore(XMS.Reducer.root, TestData.createGameState());

  return store;
};

TestData.createTargetLock = (id, attackerId, defenderId) =>
  XMS.TargetLockState.create({ id, attackerId, defenderId });

TestData.createUpgrade = (id, upgradeKey, tokenCounts) =>
  XMS.UpgradeState.create({ id, upgradeKey, tokenCounts });

export default TestData;
