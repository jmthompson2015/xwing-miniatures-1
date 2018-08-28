import PilotUtils from "./PilotUtilities.js";

const { ActionCreator } = XMS;

const PC = XMA.PilotCard;
const UC = XMA.UpgradeCard;

const SquadBuilder = {};

const computePoints = pilotAndUpgradeKeys => {
  const upgradeReducer = (accumulator, upgradeKey) => {
    const upgrade = XMA.Selector.upgradeCard(upgradeKey);
    return accumulator + (upgrade !== undefined ? upgrade.points : 0);
  };
  const reducerFunction = (accumulator, element) => {
    const pilotPoints = XMA.Selector.pilotCard(element.pilotKey).points;
    const upgradePoints = R.reduce(upgradeReducer, 0, R.defaultTo([], element.upgradeKeys));
    return accumulator + pilotPoints + upgradePoints;
  };

  return R.reduce(reducerFunction, 0, pilotAndUpgradeKeys);
};

const createPilot = (store, pilotKey) => {
  // Side effects.
  const pilotId = XMS.Selector.nextPilotId(store.getState());

  return XMS.PilotState.create({
    id: pilotId,
    pilotKey
  });
};

const createUpgrade = (store, upgradeKey) => {
  // Side effects.
  const upgradeId = XMS.Selector.nextUpgradeId(store.getState());

  return XMS.UpgradeState.create({
    id: upgradeId,
    upgradeKey
  });
};

const processUpgradeKey = store => (accumulator, upgradeKey) => {
  const tokenCounts = XMS.TokenCountsState.create();

  // Side effects.
  const upgrade = createUpgrade(store, upgradeKey);
  store.dispatch(ActionCreator.setUpgradeInstance(upgrade));
  store.dispatch(ActionCreator.setUpgradeTokenCounts(upgrade.id, tokenCounts));

  return R.append(upgrade.id, accumulator);
};

const processPilotKey = store => (accumulator, pilotObj) => {
  const { pilotKey } = pilotObj;
  const upgradeKeys = R.defaultTo([], pilotObj.upgradeKeys);
  const reducerFunction = processUpgradeKey(store);
  const upgradeIds = R.reduce(reducerFunction, [], upgradeKeys);
  const tokenCounts = R.assoc(
    "shield",
    PilotUtils.statValue("shields", pilotKey),
    XMS.TokenCountsState.create()
  );

  // Side effects.
  const pilot = createPilot(store, pilotKey);
  store.dispatch(ActionCreator.setPilotInstance(pilot));
  store.dispatch(ActionCreator.setPilotTokenCounts(pilot.id, tokenCounts));
  store.dispatch(ActionCreator.setPilotUpgrades(pilot.id, upgradeIds));

  return R.append(pilot.id, accumulator);
};

// /////////////////////////////////////////////////////////////////////////////////////////////////
SquadBuilder.build = (store, name, year, description, squadId, pilotAndUpgradeKeys) => {
  const reducerFunction = processPilotKey(store);
  const pilotIds = pilotAndUpgradeKeys.reduce(reducerFunction, []);
  const points = computePoints(pilotAndUpgradeKeys);

  const answer = XMS.SquadState.create({
    id: squadId,
    name,
    year,
    description,
    points,
    pilots: pilotIds
  });

  store.dispatch(ActionCreator.setSquadInstance(answer));
  store.dispatch(ActionCreator.setSquadPilots(squadId, pilotIds));

  return answer;
};

SquadBuilder.build2017USNationals1 = (store, squadId) => {
  const name = "US Nationals #1";
  const year = 2017;
  const description = "K-Wing; Scurrg";
  const pilotAndUpgradeKeys = [
    {
      pilotKey: PC.MIRANDA_DONI,
      upgradeKeys: [
        UC.TWIN_LASER_TURRET,
        UC.EXTRA_MUNITIONS,
        UC.SABINE_WREN,
        UC.CLUSTER_MINES,
        UC.ION_BOMBS,
        UC.THERMAL_DETONATORS,
        UC.ADVANCED_SLAM
      ]
    },
    {
      pilotKey: PC.CAPTAIN_NYM_REBEL_ALLIANCE,
      upgradeKeys: [
        UC.HAVOC,
        UC.VETERAN_INSTINCTS,
        UC.ADVANCED_SENSORS,
        UC.TWIN_LASER_TURRET,
        UC.BOMBLET_GENERATOR,
        UC.GENIUS,
        UC.ENGINE_UPGRADE
      ]
    }
  ];

  return SquadBuilder.build(store, name, year, description, squadId, pilotAndUpgradeKeys);
};

SquadBuilder.build2017USNationals2 = (store, squadId) => {
  const name = "US Nationals #2";
  const year = 2017;
  const description = "Auzituck; K-Wing; X-Wing";
  const pilotAndUpgradeKeys = [
    {
      pilotKey: PC.LOWHHRICK,
      upgradeKeys: [UC.DRAW_THEIR_FIRE, UC.WOOKIEE_COMMANDOS]
    },
    {
      pilotKey: PC.MIRANDA_DONI,
      upgradeKeys: [
        UC.TWIN_LASER_TURRET,
        UC.CONCUSSION_MISSILES,
        UC.SABINE_WREN,
        UC.BOMBLET_GENERATOR,
        UC.LONG_RANGE_SCANNERS
      ]
    },
    {
      pilotKey: PC.BIGGS_DARKLIGHTER,
      upgradeKeys: [UC.R4_D6, UC.INTEGRATED_ASTROMECH]
    }
  ];

  return SquadBuilder.build(store, name, year, description, squadId, pilotAndUpgradeKeys);
};

SquadBuilder.build2017USNationals3 = (store, squadId) => {
  const name = "US Nationals #3";
  const year = 2017;
  const description = "Auzituck; K-Wing; X-Wing";
  const pilotAndUpgradeKeys = [
    {
      pilotKey: PC.LOWHHRICK,
      upgradeKeys: [UC.SELFLESSNESS, UC.WOOKIEE_COMMANDOS]
    },
    {
      pilotKey: PC.MIRANDA_DONI,
      upgradeKeys: [
        UC.TWIN_LASER_TURRET,
        UC.CONCUSSION_MISSILES,
        UC.SABINE_WREN,
        UC.BOMBLET_GENERATOR,
        UC.LONG_RANGE_SCANNERS
      ]
    },
    {
      pilotKey: PC.BIGGS_DARKLIGHTER,
      upgradeKeys: [UC.R4_D6, UC.INTEGRATED_ASTROMECH]
    }
  ];

  return SquadBuilder.build(store, name, year, description, squadId, pilotAndUpgradeKeys);
};

SquadBuilder.build2017USNationals4 = (store, squadId) => {
  const name = "US Nationals #4";
  const year = 2017;
  const description = "JumpMasters x3";
  const contractedScout1 = {
    pilotKey: PC.CONTRACTED_SCOUT,
    upgradeKeys: [
      UC.ATTANNI_MINDLINK,
      UC.EXTRA_MUNITIONS,
      UC.PLASMA_TORPEDOES,
      UC.INTELLIGENCE_AGENT,
      UC.R4_AGROMECH,
      UC.GUIDANCE_CHIPS
    ]
  };
  const pilotAndUpgradeKeys = [
    contractedScout1,
    contractedScout1,
    {
      pilotKey: PC.CONTRACTED_SCOUT,
      upgradeKeys: [
        UC.ATTANNI_MINDLINK,
        UC.PLASMA_TORPEDOES,
        UC.INTELLIGENCE_AGENT,
        UC.R4_AGROMECH,
        UC.GUIDANCE_CHIPS
      ]
    }
  ];

  return SquadBuilder.build(store, name, year, description, squadId, pilotAndUpgradeKeys);
};

SquadBuilder.build2017USNationals5 = (store, squadId) => {
  const name = "US Nationals #5";
  const year = 2017;
  const description = "JumpMasters x3";
  const contractedScout1 = {
    pilotKey: PC.CONTRACTED_SCOUT,
    upgradeKeys: [
      UC.ATTANNI_MINDLINK,
      UC.EXTRA_MUNITIONS,
      UC.PLASMA_TORPEDOES,
      UC.INTELLIGENCE_AGENT,
      UC.R4_AGROMECH,
      UC.GUIDANCE_CHIPS
    ]
  };
  const pilotAndUpgradeKeys = [
    contractedScout1,
    contractedScout1,
    {
      pilotKey: PC.CONTRACTED_SCOUT,
      upgradeKeys: [
        UC.ATTANNI_MINDLINK,
        UC.PLASMA_TORPEDOES,
        UC.INTELLIGENCE_AGENT,
        UC.R4_AGROMECH,
        UC.GUIDANCE_CHIPS
      ]
    }
  ];

  return SquadBuilder.build(store, name, year, description, squadId, pilotAndUpgradeKeys);
};

SquadBuilder.build2017Worlds2 = (store, squadId) => {
  const name = "Worlds #2";
  const year = 2017;
  const description = "K-Wing; T-70; X-Wing";
  const pilotAndUpgradeKeys = [
    {
      pilotKey: PC.MIRANDA_DONI,
      upgradeKeys: [
        UC.AUTOBLASTER_TURRET,
        UC.PLASMA_TORPEDOES,
        UC.EXTRA_MUNITIONS,
        UC.REY,
        UC.ION_BOMBS,
        UC.CLUSTER_MINES,
        UC.GUIDANCE_CHIPS
      ]
    },
    {
      pilotKey: PC.BIGGS_DARKLIGHTER,
      upgradeKeys: [UC.R4_D6, UC.INTEGRATED_ASTROMECH]
    },
    {
      pilotKey: PC.JESS_PAVA,
      upgradeKeys: [UC.M9_G8, UC.PATTERN_ANALYZER, UC.INTEGRATED_ASTROMECH]
    }
  ];

  return SquadBuilder.build(store, name, year, description, squadId, pilotAndUpgradeKeys);
};

SquadBuilder.build2016Worlds3 = (store, squadId) => {
  const name = "Worlds #3";
  const year = 2016;
  const description = "K-Wing; T-70; X-Wing";
  const pilotAndUpgradeKeys = [
    {
      pilotKey: PC.OMEGA_LEADER,
      upgradeKeys: [UC.JUKE, UC.COMM_RELAY, UC.SHIELD_UPGRADE]
    },
    {
      pilotKey: PC.COLONEL_VESSERY,
      upgradeKeys: [UC.TIE_X7, UC.JUKE, UC.TWIN_ION_ENGINE_MKII]
    },
    {
      pilotKey: PC.OMICRON_GROUP_PILOT,
      upgradeKeys: [UC.SENSOR_JAMMER, UC.EMPEROR_PALPATINE]
    }
  ];

  return SquadBuilder.build(store, name, year, description, squadId, pilotAndUpgradeKeys);
};

SquadBuilder.build2013Worlds4 = (store, squadId) => {
  const name = "Worlds #4";
  const year = 2013;
  const description = "TIE Fighters x7";
  const obsidianSquadronPilot = {
    pilotKey: PC.OBSIDIAN_SQUADRON_PILOT
  };
  const academyPilot = {
    pilotKey: PC.ACADEMY_PILOT
  };
  const pilotAndUpgradeKeys = [
    {
      pilotKey: PC.HOWLRUNNER,
      upgradeKeys: [UC.STEALTH_DEVICE]
    },
    {
      pilotKey: PC.BACKSTABBER
    },
    obsidianSquadronPilot,
    obsidianSquadronPilot,
    obsidianSquadronPilot,
    academyPilot,
    academyPilot
  ];

  return SquadBuilder.build(store, name, year, description, squadId, pilotAndUpgradeKeys);
};

SquadBuilder.build2013Worlds5 = (store, squadId) => {
  const name = "Worlds #5";
  const year = 2013;
  const description = "B-Wing; X-Wings x2; Y-Wings x2";
  const rookiePilot = {
    pilotKey: PC.ROOKIE_PILOT
  };
  const goldSquadronPilot = {
    pilotKey: PC.GOLD_SQUADRON_PILOT
  };
  const pilotAndUpgradeKeys = [
    {
      pilotKey: PC.BLUE_SQUADRON_PILOT
    },
    rookiePilot,
    rookiePilot,
    goldSquadronPilot,
    goldSquadronPilot
  ];

  return SquadBuilder.build(store, name, year, description, squadId, pilotAndUpgradeKeys);
};

SquadBuilder.buildCoreSetImperial = (store, squadId) => {
  const name = "Imperial Core Set: 36 Points";
  const year = 2012;
  const description = "TIE Fighters x2";
  const pilotAndUpgradeKeys = [
    {
      pilotKey: PC.MAULER_MITHEL,
      upgradeKeys: [UC.MARKSMANSHIP]
    },
    {
      pilotKey: PC.DARK_CURSE
    }
  ];

  return SquadBuilder.build(store, name, year, description, squadId, pilotAndUpgradeKeys);
};

SquadBuilder.buildCoreSetRebel = (store, squadId) => {
  const name = "Rebel Core Set: 36 Points";
  const year = 2012;
  const description = "X-Wing";
  const pilotAndUpgradeKeys = [
    {
      pilotKey: PC.LUKE_SKYWALKER,
      upgradeKeys: [UC.PROTON_TORPEDOES, UC.R2_D2_ASTROMECH]
    }
  ];

  return SquadBuilder.build(store, name, year, description, squadId, pilotAndUpgradeKeys);
};

Object.freeze(SquadBuilder);

export default SquadBuilder;
