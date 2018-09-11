(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.XMS = {})));
}(this, (function (exports) { 'use strict';

  /*
   * @param source One of [DamageCard, DiceModification, PilotCard, ShipAction, UpgradeCard].
   * @param sourceKey Damage, dice modification, pilot, ship action, or upgrade key.
   * @param context Optional context.
   */
  const AbilityState = {};

  AbilityState.create = ({ sourceName, sourceKey, context }) =>
    Immutable({ sourceName, sourceKey, context });

  Object.freeze(AbilityState);

  const ActionType = {};

  ActionType.ADD_PILOT_TOKEN_COUNT = "addPilotTokenCount";

  ActionType.CLEAR_ACTIVE_AGENT_ID = "clearActiveAgentId";
  ActionType.CLEAR_ACTIVE_COMBAT_ID = "clearActiveCombatId";
  ActionType.CLEAR_ACTIVE_PILOT_ID = "clearActivePilotId";
  ActionType.CLEAR_AGENT_QUERY = "clearAgentQuery";
  ActionType.CLEAR_AGENT_RESPONSE = "clearAgentResponse";
  ActionType.CLEAR_DISPLAY_EXPLOSION = "clearDisplayExplosion";
  ActionType.CLEAR_DISPLAY_LASER_BEAM = "clearDisplayLaserBeam";
  ActionType.CLEAR_DISPLAY_MANEUVER = "clearDisplayManeuver";
  ActionType.CLEAR_PILOT_TOKEN_COUNT = "clearPilotTokenCount";

  ActionType.DEAL_CRITICAL = "dealCritical";
  ActionType.DEAL_DAMAGE = "dealDamage";

  ActionType.DEQUEUE_ACTIVATION = "dequeueActivation";
  ActionType.DEQUEUE_COMBAT = "dequeueCombat";
  ActionType.DEQUEUE_END = "dequeueEnd";
  ActionType.DEQUEUE_PLANNING = "dequeuePlanning";

  ActionType.INCREMENT_ROUND = "incrementRound";

  ActionType.MOVE_PILOT = "movePilot";

  ActionType.SET_ACTIVATION_QUEUE = "setActivationQueue";
  ActionType.SET_ACTIVE_COMBAT_ID = "setActiveCombatId";
  ActionType.SET_ACTIVE_PILOT_ID = "setActivePilotId";
  ActionType.SET_AGENT_INSTANCE = "setAgentInstance";
  ActionType.SET_AGENT_QUERY = "setAgentQuery";
  ActionType.SET_AGENT_RESPONSE = "setAgentResponse";
  ActionType.SET_AGENT_SQUAD = "setAgentSquad";
  ActionType.SET_COMBAT_ATTACK_DICE = "setCombatAttackDice";
  ActionType.SET_COMBAT_CRITICAL_DAMAGE = "setCombatCriticalDamage";
  ActionType.SET_COMBAT_DEFENSE_DICE = "setCombatDefenseDice";
  ActionType.SET_COMBAT_HIT_DAMAGE = "setCombatHitDamage";
  ActionType.SET_COMBAT_INSTANCE = "setCombatInstance";
  ActionType.SET_COMBAT_QUEUE = "setCombatQueue";
  ActionType.SET_COMBAT_SHIELD_DAMAGE = "setCombatShieldDamage";
  ActionType.SET_DAMAGE_DECK = "setDamageDeck";
  ActionType.SET_DAMAGE_INSTANCES = "setDamageInstances";
  ActionType.SET_DISPLAY_EXPLOSION = "setDisplayExplosion";
  ActionType.SET_DISPLAY_LASER_BEAM = "setDisplayLaserBeam";
  ActionType.SET_DISPLAY_MANEUVER = "setDisplayManeuver";
  ActionType.SET_END_QUEUE = "setEndQueue";
  ActionType.SET_GAME_OVER = "setGameOver";
  ActionType.SET_PHASE = "setPhase";
  ActionType.SET_PILOT_INSTANCE = "setPilotInstance";
  ActionType.SET_PILOT_STAT_BONUSES = "setPilotStatBonuses";
  ActionType.SET_PILOT_TO_MANEUVER = "setPilotToManeuver";
  ActionType.SET_PILOT_TOKEN_COUNTS = "setPilotTokenCounts";
  ActionType.SET_PILOT_UPGRADES = "setPilotUpgrades";
  ActionType.SET_PLANNING_QUEUE = "setPlanningQueue";
  ActionType.SET_PLAY_AREA_SCALE = "setPlayAreaScale";
  ActionType.SET_PLAY_AREA_ZOOM_IN_ENABLED = "setPlayAreaZoomInEnabled";
  ActionType.SET_PLAY_AREA_ZOOM_OUT_ENABLED = "setPlayAreaZoomOutEnabled";
  ActionType.SET_SQUAD_INSTANCE = "setSquadInstance";
  ActionType.SET_SQUAD_PILOTS = "setSquadPilots";
  ActionType.SET_TACTICAL_VIEW_SCALE = "setTacticalViewScale";
  ActionType.SET_TACTICAL_VIEW_ZOOM_IN_ENABLED = "setTacticalViewZoomInEnabled";
  ActionType.SET_TACTICAL_VIEW_ZOOM_OUT_ENABLED = "setTacticalViewZoomOutEnabled";
  ActionType.SET_UPGRADE_INSTANCE = "setUpgradeInstance";
  ActionType.SET_UPGRADE_TOKEN_COUNTS = "setUpgradeTokenCounts";
  ActionType.SET_USER_MESSAGE = "setUserMessage";

  Object.freeze(ActionType);

  const ActionCreator = {};

  // See https://redux.js.org/recipes/reducing-boilerplate
  const makeActionCreator = (type, ...argNames) => (...args) => {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };

  ActionCreator.addPilotTokenCount = makeActionCreator(
    ActionType.ADD_PILOT_TOKEN_COUNT,
    "pilotId",
    "tokenKey",
    "value"
  );

  ActionCreator.clearActiveAgentId = makeActionCreator(ActionType.CLEAR_ACTIVE_AGENT_ID);

  ActionCreator.clearActiveCombatId = makeActionCreator(ActionType.CLEAR_ACTIVE_COMBAT_ID);

  ActionCreator.clearActivePilotId = makeActionCreator(ActionType.CLEAR_ACTIVE_PILOT_ID);

  ActionCreator.clearAgentQuery = makeActionCreator(ActionType.CLEAR_AGENT_QUERY);

  ActionCreator.clearAgentResponse = makeActionCreator(ActionType.CLEAR_AGENT_RESPONSE);

  ActionCreator.clearDisplayExplosion = makeActionCreator(ActionType.CLEAR_DISPLAY_EXPLOSION);

  ActionCreator.clearDisplayLaserBeam = makeActionCreator(ActionType.CLEAR_DISPLAY_LASER_BEAM);

  ActionCreator.clearDisplayManeuver = makeActionCreator(ActionType.CLEAR_DISPLAY_MANEUVER);

  ActionCreator.clearPilotTokenCount = makeActionCreator(
    ActionType.CLEAR_PILOT_TOKEN_COUNT,
    "pilotId",
    "tokenKey"
  );

  ActionCreator.dealCritical = makeActionCreator(ActionType.DEAL_CRITICAL, "pilotId");

  ActionCreator.dealDamage = makeActionCreator(ActionType.DEAL_DAMAGE, "pilotId");

  ActionCreator.dequeueActivation = makeActionCreator(ActionType.DEQUEUE_ACTIVATION);

  ActionCreator.dequeueCombat = makeActionCreator(ActionType.DEQUEUE_COMBAT);

  ActionCreator.dequeueEnd = makeActionCreator(ActionType.DEQUEUE_END);

  ActionCreator.dequeuePlanning = makeActionCreator(ActionType.DEQUEUE_PLANNING);

  ActionCreator.incrementRound = makeActionCreator(ActionType.INCREMENT_ROUND);

  ActionCreator.movePilot = makeActionCreator(ActionType.MOVE_PILOT, "pilotId", "toPosition");

  ActionCreator.setActivationQueue = makeActionCreator(
    ActionType.SET_ACTIVATION_QUEUE,
    "activationQueue"
  );

  ActionCreator.setActiveCombatId = makeActionCreator(
    ActionType.SET_ACTIVE_COMBAT_ID,
    "activeCombatId"
  );

  ActionCreator.setActivePilotId = makeActionCreator(ActionType.SET_ACTIVE_PILOT_ID, "activePilotId");

  ActionCreator.setAgentInstance = makeActionCreator(ActionType.SET_AGENT_INSTANCE, "agentInstance");

  ActionCreator.setAgentQuery = makeActionCreator(ActionType.SET_AGENT_QUERY, "agentQuery");

  ActionCreator.setAgentResponse = makeActionCreator(ActionType.SET_AGENT_RESPONSE, "agentResponse");

  ActionCreator.setAgentSquad = makeActionCreator(ActionType.SET_AGENT_SQUAD, "agentId", "squadId");

  ActionCreator.setCombatAttackDice = makeActionCreator(
    ActionType.SET_COMBAT_ATTACK_DICE,
    "combatId",
    "attackDiceKeys"
  );

  ActionCreator.setCombatCriticalDamage = makeActionCreator(
    ActionType.SET_COMBAT_CRITICAL_DAMAGE,
    "combatId",
    "criticalDamage"
  );

  ActionCreator.setCombatDefenseDice = makeActionCreator(
    ActionType.SET_COMBAT_DEFENSE_DICE,
    "combatId",
    "defenseDiceKeys"
  );

  ActionCreator.setCombatHitDamage = makeActionCreator(
    ActionType.SET_COMBAT_HIT_DAMAGE,
    "combatId",
    "hitDamage"
  );

  ActionCreator.setCombatInstance = makeActionCreator(
    ActionType.SET_COMBAT_INSTANCE,
    "combatInstance"
  );

  ActionCreator.setCombatQueue = makeActionCreator(ActionType.SET_COMBAT_QUEUE, "combatQueue");

  ActionCreator.setCombatShieldDamage = makeActionCreator(
    ActionType.SET_COMBAT_SHIELD_DAMAGE,
    "combatId",
    "shieldDamage"
  );

  ActionCreator.setDamageDeck = makeActionCreator(ActionType.SET_DAMAGE_DECK, "damageDeck");

  ActionCreator.setDamageInstances = makeActionCreator(
    ActionType.SET_DAMAGE_INSTANCES,
    "damageInstances"
  );

  ActionCreator.setDisplayExplosion = makeActionCreator(
    ActionType.SET_DISPLAY_EXPLOSION,
    "displayExplosion"
  );

  ActionCreator.setDisplayLaserBeam = makeActionCreator(
    ActionType.SET_DISPLAY_LASER_BEAM,
    "displayLaserBeam"
  );

  ActionCreator.setDisplayManeuver = makeActionCreator(
    ActionType.SET_DISPLAY_MANEUVER,
    "displayManeuver"
  );

  ActionCreator.setEndQueue = makeActionCreator(ActionType.SET_END_QUEUE, "endQueue");

  ActionCreator.setGameOver = makeActionCreator(ActionType.SET_GAME_OVER, "isGameOver");

  ActionCreator.setPhase = makeActionCreator(ActionType.SET_PHASE, "phaseKey");

  ActionCreator.setPilotInstance = makeActionCreator(ActionType.SET_PILOT_INSTANCE, "pilotInstance");

  ActionCreator.setPilotToManeuver = makeActionCreator(
    ActionType.SET_PILOT_TO_MANEUVER,
    "pilotToManeuver"
  );

  ActionCreator.setPilotStatBonuses = makeActionCreator(
    ActionType.SET_PILOT_STAT_BONUSES,
    "pilotId",
    "statBonuses"
  );

  ActionCreator.setPilotTokenCounts = makeActionCreator(
    ActionType.SET_PILOT_TOKEN_COUNTS,
    "pilotId",
    "tokenCounts"
  );

  ActionCreator.setPilotUpgrades = makeActionCreator(
    ActionType.SET_PILOT_UPGRADES,
    "pilotId",
    "upgradeIds"
  );

  ActionCreator.setPlanningQueue = makeActionCreator(ActionType.SET_PLANNING_QUEUE, "planningQueue");

  ActionCreator.setPlayAreaScale = makeActionCreator(ActionType.SET_PLAY_AREA_SCALE, "scale");

  ActionCreator.setPlayAreaZoomInEnabled = makeActionCreator(
    ActionType.SET_PLAY_AREA_ZOOM_IN_ENABLED,
    "enabled"
  );

  ActionCreator.setPlayAreaZoomOutEnabled = makeActionCreator(
    ActionType.SET_PLAY_AREA_ZOOM_OUT_ENABLED,
    "enabled"
  );

  ActionCreator.setSquadInstance = makeActionCreator(ActionType.SET_SQUAD_INSTANCE, "squadInstance");

  ActionCreator.setSquadPilots = makeActionCreator(
    ActionType.SET_SQUAD_PILOTS,
    "squadId",
    "pilotIds"
  );

  ActionCreator.setTacticalViewScale = makeActionCreator(ActionType.SET_TACTICAL_VIEW_SCALE, "scale");

  ActionCreator.setTacticalViewZoomInEnabled = makeActionCreator(
    ActionType.SET_TACTICAL_VIEW_ZOOM_IN_ENABLED,
    "enabled"
  );

  ActionCreator.setTacticalViewZoomOutEnabled = makeActionCreator(
    ActionType.SET_TACTICAL_VIEW_ZOOM_OUT_ENABLED,
    "enabled"
  );

  ActionCreator.setUpgradeInstance = makeActionCreator(
    ActionType.SET_UPGRADE_INSTANCE,
    "upgradeInstance"
  );

  ActionCreator.setUpgradeTokenCounts = makeActionCreator(
    ActionType.SET_UPGRADE_TOKEN_COUNTS,
    "upgradeId",
    "tokenCounts"
  );

  ActionCreator.setUserMessage = makeActionCreator(ActionType.SET_USER_MESSAGE, "userMessage");

  Object.freeze(ActionCreator);

  const AgentQueryState = {};

  AgentQueryState.create = ({ agentId, queryKey, payload = {} }) =>
    Immutable({ agentId, queryKey, payload });

  Object.freeze(AgentQueryState);

  const AgentResponseState = {};

  AgentResponseState.create = ({ agentId, responseKey, payload = {} }) =>
    Immutable({ agentId, responseKey, payload });

  Object.freeze(AgentResponseState);

  const AgentState = {};

  AgentState.create = ({ id, name, strategy = "SimpleAgentStrategy", squad }) =>
    Immutable({ id, name: name || `Agent ${id}`, strategy, squad });

  Object.freeze(AgentState);

  const CombatState = {};

  CombatState.create = ({
    id,
    attackerId,
    defenderId,
    rangeKey,
    weaponKey = "primary",

    criticalDamage = 0,
    hitDamage = 0,
    shieldDamage = 0,

    attackDiceKeys = [],
    defenseDiceKeys = []
  }) =>
    Immutable({
      id: Immutable(id),
      attackerId: Immutable(attackerId),
      defenderId: Immutable(defenderId),
      rangeKey: Immutable(rangeKey),
      weaponKey: Immutable(weaponKey),

      criticalDamage: Immutable(criticalDamage),
      hitDamage: Immutable(hitDamage),
      shieldDamage: Immutable(shieldDamage),

      attackDiceKeys: Immutable(attackDiceKeys),
      defenseDiceKeys: Immutable(defenseDiceKeys)
    });

  Object.freeze(CombatState);

  const DamageState = {};

  DamageState.create = ({ id, damageKey }) => Immutable({ id, damageKey });

  Object.freeze(DamageState);

  const ExplosionState = {};

  ExplosionState.create = ({ position, size = 40 }) => Immutable({ position, size });

  Object.freeze(ExplosionState);

  const PlayAreaState = {};

  PlayAreaState.create = ({ scale = 1.0, zoomInEnabled = false, zoomOutEnabled = true } = {}) =>
    Immutable({ scale, zoomInEnabled, zoomOutEnabled });

  Object.freeze(PlayAreaState);

  const TacticalViewState = {};

  TacticalViewState.create = ({ scale = 1.0, zoomInEnabled = false, zoomOutEnabled = true } = {}) =>
    Immutable({ scale, zoomInEnabled, zoomOutEnabled });

  Object.freeze(TacticalViewState);

  const GameState = {};

  GameState.create = ({
    activeAgentId,
    activeCombatId,
    activePilotId,
    isGameOver = false,
    phaseKey = "setup",
    playFormatKey = "standard",
    round = 0,
    userMessage = "",

    agentQuery,
    agentResponse,
    displayExplosion,
    displayLaserBeam,
    displayManeuver,
    pilotToManeuver = {},
    playArea = PlayAreaState.create(),
    tacticalView = TacticalViewState.create(),

    activationQueue = [],
    combatQueue = [],
    damageDeck = [],
    damageDiscardPile = [],
    endQueue = [],
    planningQueue = [],
    targetLocks = [],

    agentInstances = {},
    combatInstances = {},
    conditionInstances = {},
    damageInstances = {},
    pilotInstances = {},
    squadInstances = {},
    upgradeInstances = {}
  } = {}) =>
    Immutable({
      activeAgentId,
      activeCombatId,
      activePilotId,
      isGameOver,
      phaseKey,
      playFormatKey,
      round,
      userMessage,

      agentQuery: Immutable(agentQuery),
      agentResponse: Immutable(agentResponse),
      displayExplosion: Immutable(displayExplosion),
      displayLaserBeam: Immutable(displayLaserBeam),
      displayManeuver: Immutable(displayManeuver),
      pilotToManeuver: Immutable(pilotToManeuver),
      playArea: Immutable(playArea),
      tacticalView: Immutable(tacticalView),

      activationQueue: Immutable(activationQueue),
      combatQueue: Immutable(combatQueue),
      damageDeck: Immutable(damageDeck),
      damageDiscardPile: Immutable(damageDiscardPile),
      endQueue: Immutable(endQueue),
      planningQueue: Immutable(planningQueue),
      targetLocks: Immutable(targetLocks),

      agentInstances: Immutable(agentInstances),
      combatInstances: Immutable(combatInstances),
      conditionInstances: Immutable(conditionInstances),
      damageInstances: Immutable(damageInstances),
      pilotInstances: Immutable(pilotInstances),
      squadInstances: Immutable(squadInstances),
      upgradeInstances: Immutable(upgradeInstances)
    });

  Object.freeze(GameState);

  const LaserBeamState = {};

  LaserBeamState.create = ({ color, fromPosition, isPrimary = true, toPosition }) =>
    Immutable({ color, fromPosition, isPrimary, toPosition });

  Object.freeze(LaserBeamState);

  const ManeuverState = {};

  ManeuverState.create = ({ color, fromPolygon, fromPosition, path, toPolygon }) =>
    Immutable({ color, fromPolygon, fromPosition, path, toPolygon });

  Object.freeze(ManeuverState);

  const PilotState = {};

  PilotState.create = ({
    id,
    pilotKey,

    criticals,
    damages,
    position,
    statBonuses,
    tokenCounts,
    upgrades
  }) =>
    Immutable({
      id,
      pilotKey,

      criticals: Immutable(criticals),
      damages: Immutable(damages),
      position: Immutable(position),
      statBonuses: Immutable(statBonuses),
      tokenCounts: Immutable(tokenCounts),
      upgrades: Immutable(upgrades)
    });

  Object.freeze(PilotState);

  const PositionState = {};

  PositionState.create = ({ x = 0, y = 0, heading = 0 } = {}) => Immutable({ x, y, heading });

  Object.freeze(PositionState);

  /* eslint no-console: ["error", { allow: ["log"] }] */

  const Reducer = {};

  const assoc = (propertyName, propertyValue, object) =>
    Immutable(R.assoc(propertyName, Immutable(propertyValue), object));

  const assocPath = (propertyPath, propertyValue, object) =>
    Immutable(R.assocPath(propertyPath, Immutable(propertyValue), object));

  const dissoc = (propertyName, object) => Immutable(R.dissoc(propertyName, object));

  Reducer.root = (state, action) => {
    if (typeof state === "undefined") {
      return GameState.create();
    }

    let newActiveAgentId;
    let newActivePilotId;
    let newAgentInstances;
    let newCombatInstances;
    let newDamages1;
    let newDamages2;
    let newPilotInstances;
    let newPilotInstances1;
    let newPilotInstances2;
    let newSquadInstances;
    let newTokenCounts;
    let newUpgradeInstances;
    let newValue;

    switch (action.type) {
      case ActionType.ADD_PILOT_TOKEN_COUNT:
        newValue =
          R.defaultTo(0, state.pilotInstances[action.pilotId].tokenCounts[action.tokenKey]) +
          R.defaultTo(1, action.value);
        return assocPath(
          ["pilotInstances", action.pilotId, "tokenCounts", action.tokenKey],
          newValue,
          state
        );

      case ActionType.CLEAR_ACTIVE_AGENT_ID:
        return dissoc("activeAgentId", state);
      case ActionType.CLEAR_ACTIVE_COMBAT_ID:
        return dissoc("activeCombatId", state);
      case ActionType.CLEAR_ACTIVE_PILOT_ID:
        return dissoc("activePilotId", state);
      case ActionType.CLEAR_AGENT_QUERY:
        return dissoc("agentQuery", state);
      case ActionType.CLEAR_AGENT_RESPONSE:
        return dissoc("agentResponse", state);
      case ActionType.CLEAR_DISPLAY_EXPLOSION:
        return dissoc("displayExplosion", state);
      case ActionType.CLEAR_DISPLAY_LASER_BEAM:
        return dissoc("displayLaserBeam", state);
      case ActionType.CLEAR_DISPLAY_MANEUVER:
        return dissoc("displayManeuver", state);
      case ActionType.CLEAR_PILOT_TOKEN_COUNT:
        newTokenCounts = dissoc(action.tokenKey, state.pilotInstances[action.pilotId].tokenCounts);
        return assocPath(["pilotInstances", action.pilotId, "tokenCounts"], newTokenCounts, state);

      case ActionType.DEAL_CRITICAL:
        newDamages1 = R.append(
          state.damageDeck[0],
          R.defaultTo([], state.pilotInstances[action.pilotId].criticals)
        );
        newPilotInstances1 = assocPath(
          [action.pilotId, "criticals"],
          newDamages1,
          state.pilotInstances
        );
        return assoc(
          "pilotInstances",
          newPilotInstances1,
          assoc("damageDeck", state.damageDeck.slice(1), state)
        );
      case ActionType.DEAL_DAMAGE:
        newDamages2 = R.append(
          state.damageDeck[0],
          R.defaultTo([], state.pilotInstances[action.pilotId].damages)
        );
        newPilotInstances2 = assocPath(
          [action.pilotId, "damages"],
          newDamages2,
          state.pilotInstances
        );
        return assoc(
          "pilotInstances",
          newPilotInstances2,
          assoc("damageDeck", state.damageDeck.slice(1), state)
        );

      case ActionType.DEQUEUE_ACTIVATION:
        [newActivePilotId] = state.activationQueue;
        console.log(
          `Active Pilot ID: ${newActivePilotId} Pilot: ${
          newActivePilotId !== undefined
            ? state.pilotInstances[newActivePilotId].pilotKey
            : undefined
        }`
        );
        return assoc(
          "activePilotId",
          newActivePilotId,
          assoc("activationQueue", state.activationQueue.slice(1), state)
        );
      case ActionType.DEQUEUE_COMBAT:
        [newActivePilotId] = state.combatQueue;
        console.log(
          `Active Pilot ID: ${newActivePilotId} Pilot: ${
          newActivePilotId !== undefined
            ? state.pilotInstances[newActivePilotId].pilotKey
            : undefined
        }`
        );
        return assoc(
          "activePilotId",
          newActivePilotId,
          assoc("combatQueue", state.combatQueue.slice(1), state)
        );
      case ActionType.DEQUEUE_END:
        [newActivePilotId] = state.endQueue;
        console.log(
          `Active Pilot ID: ${newActivePilotId} Pilot: ${
          newActivePilotId !== undefined
            ? state.pilotInstances[newActivePilotId].pilotKey
            : undefined
        }`
        );
        return assoc(
          "activePilotId",
          newActivePilotId,
          assoc("endQueue", state.endQueue.slice(1), state)
        );
      case ActionType.DEQUEUE_PLANNING:
        [newActiveAgentId] = state.planningQueue;
        console.log(
          `Active Agent ID: ${newActiveAgentId} Agent: ${
          newActiveAgentId !== undefined ? state.agentInstances[newActiveAgentId].name : undefined
        }`
        );
        return assoc(
          "activeAgentId",
          newActiveAgentId,
          assoc("planningQueue", state.planningQueue.slice(1), state)
        );

      case ActionType.INCREMENT_ROUND:
        console.log(`Round: ${state.round + 1}`);
        return assoc("round", state.round + 1, state);

      case ActionType.MOVE_PILOT:
        return assocPath(["pilotInstances", action.pilotId, "position"], action.toPosition, state);

      case ActionType.RESET_ACTIVATION_QUEUE:
        return assoc("activationQueue", Immutable([]), state);
      case ActionType.RESET_COMBAT_QUEUE:
        return assoc("combatQueue", Immutable([]), state);

      case ActionType.SET_ACTIVATION_QUEUE:
        return assoc("activationQueue", action.activationQueue, state);
      case ActionType.SET_ACTIVE_COMBAT_ID:
        return assoc("activeCombatId", action.activeCombatId, state);
      case ActionType.SET_ACTIVE_PILOT_ID:
        return assoc("activePilotId", action.activePilotId, state);
      case ActionType.SET_AGENT_INSTANCE:
        newAgentInstances = assoc(
          action.agentInstance.id,
          action.agentInstance,
          state.agentInstances
        );
        return assoc("agentInstances", newAgentInstances, state);
      case ActionType.SET_AGENT_QUERY:
        return assoc("agentQuery", action.agentQuery, state);
      case ActionType.SET_AGENT_RESPONSE:
        return assoc("agentResponse", action.agentResponse, state);
      case ActionType.SET_AGENT_SQUAD:
        return assocPath(["agentInstances", action.agentId, "squad"], action.squadId, state);
      case ActionType.SET_COMBAT_ATTACK_DICE:
        return assocPath(
          ["combatInstances", action.combatId, "attackDiceKeys"],
          action.attackDiceKeys,
          state
        );
      case ActionType.SET_COMBAT_CRITICAL_DAMAGE:
        return assocPath(
          ["combatInstances", action.combatId, "criticalDamage"],
          action.criticalDamage,
          state
        );
      case ActionType.SET_COMBAT_DEFENSE_DICE:
        return assocPath(
          ["combatInstances", action.combatId, "defenseDiceKeys"],
          action.defenseDiceKeys,
          state
        );
      case ActionType.SET_COMBAT_HIT_DAMAGE:
        return assocPath(["combatInstances", action.combatId, "hitDamage"], action.hitDamage, state);
      case ActionType.SET_COMBAT_INSTANCE:
        newCombatInstances = assoc(
          action.combatInstance.id,
          action.combatInstance,
          state.combatInstances
        );
        return assoc("combatInstances", newCombatInstances, state);
      case ActionType.SET_COMBAT_QUEUE:
        return assoc("combatQueue", action.combatQueue, state);
      case ActionType.SET_COMBAT_SHIELD_DAMAGE:
        return assocPath(
          ["combatInstances", action.combatId, "shieldDamage"],
          action.shieldDamage,
          state
        );
      case ActionType.SET_DAMAGE_DECK:
        return assoc("damageDeck", action.damageDeck, state);
      case ActionType.SET_DAMAGE_INSTANCES:
        return assoc("damageInstances", action.damageInstances, state);
      case ActionType.SET_DISPLAY_EXPLOSION:
        return assoc("displayExplosion", action.displayExplosion, state);
      case ActionType.SET_DISPLAY_LASER_BEAM:
        return assoc("displayLaserBeam", action.displayLaserBeam, state);
      case ActionType.SET_DISPLAY_MANEUVER:
        return assoc("displayManeuver", action.displayManeuver, state);
      case ActionType.SET_END_QUEUE:
        return assoc("endQueue", action.endQueue, state);
      case ActionType.SET_GAME_OVER:
        return assoc("isGameOver", action.isGameOver, state);
      case ActionType.SET_PHASE:
        console.log(`Phase: ${action.phaseKey}`);
        return assoc("phaseKey", action.phaseKey, state);
      case ActionType.SET_PILOT_INSTANCE:
        newPilotInstances = assoc(
          action.pilotInstance.id,
          action.pilotInstance,
          state.pilotInstances
        );
        return assoc("pilotInstances", newPilotInstances, state);
      case ActionType.SET_PILOT_TO_MANEUVER:
        return assoc("pilotToManeuver", action.pilotToManeuver, state);
      case ActionType.SET_PILOT_STAT_BONUSES:
        return assocPath(
          ["pilotInstances", action.pilotId, "statBonuses"],
          action.statBonuses,
          state
        );
      case ActionType.SET_PILOT_TOKEN_COUNTS:
        return assocPath(
          ["pilotInstances", action.pilotId, "tokenCounts"],
          action.tokenCounts,
          state
        );
      case ActionType.SET_PILOT_UPGRADES:
        return assocPath(["pilotInstances", action.pilotId, "upgrades"], action.upgradeIds, state);
      case ActionType.SET_PLANNING_QUEUE:
        return assoc("planningQueue", action.planningQueue, state);
      case ActionType.SET_PLAY_AREA_SCALE:
        return assocPath(["playArea", "scale"], action.scale, state);
      case ActionType.SET_PLAY_AREA_ZOOM_IN_ENABLED:
        return assocPath(["playArea", "zoomInEnabled"], action.enabled, state);
      case ActionType.SET_PLAY_AREA_ZOOM_OUT_ENABLED:
        return assocPath(["playArea", "zoomOutEnabled"], action.enabled, state);
      case ActionType.SET_SQUAD_INSTANCE:
        newSquadInstances = assoc(
          action.squadInstance.id,
          action.squadInstance,
          state.squadInstances
        );
        return assoc("squadInstances", newSquadInstances, state);
      case ActionType.SET_SQUAD_PILOTS:
        return assocPath(["squadInstances", action.squadId, "pilots"], action.pilotIds, state);
      case ActionType.SET_TACTICAL_VIEW_SCALE:
        return assocPath(["tacticalView", "scale"], action.scale, state);
      case ActionType.SET_TACTICAL_VIEW_ZOOM_IN_ENABLED:
        return assocPath(["tacticalView", "zoomInEnabled"], action.enabled, state);
      case ActionType.SET_TACTICAL_VIEW_ZOOM_OUT_ENABLED:
        return assocPath(["tacticalView", "zoomOutEnabled"], action.enabled, state);
      case ActionType.SET_UPGRADE_INSTANCE:
        newUpgradeInstances = assoc(
          action.upgradeInstance.id,
          action.upgradeInstance,
          state.upgradeInstances
        );
        return assoc("upgradeInstances", newUpgradeInstances, state);
      case ActionType.SET_UPGRADE_TOKEN_COUNTS:
        return assocPath(
          ["upgradeInstances", action.upgradeId, "tokenCounts"],
          action.tokenCounts,
          state
        );
      case ActionType.SET_USER_MESSAGE:
        return assoc("userMessage", action.userMessage, state);

      default:
        // console.warn("Reducer.root: Unhandled action type: " + action.type);
        return state;
    }
  };

  Object.freeze(Reducer);

  const Selector = {};

  // //////////////////////////////////////////////////////////////////////////////

  Selector.activePilotInstance = state =>
    Selector.pilotInstance(Selector.activePilotId(state), state);

  Selector.agentInstanceByPilot = (pilotId, state) =>
    Selector.agentInstanceBySquad(Selector.squadInstanceByPilot(pilotId, state).id, state);

  Selector.agentInstanceBySquad = (squadId, state) =>
    R.filter(agent => agent.squad === squadId, Selector.agentInstances(state))[0];

  Selector.attackDiceKeysByCombat = (combatId, state) =>
    R.prop("attackDiceKeys", Selector.combatInstance(combatId, state));

  Selector.bonusByPilotStat = (pilotId, statKey, state) =>
    R.defaultTo(0, R.prop(statKey, Selector.bonusesByPilot(pilotId, state)));

  Selector.bonusesByPilot = (pilotId, state) =>
    R.defaultTo({}, R.prop("statBonuses", Selector.pilotInstance(pilotId, state)));

  Selector.combatCriticalDamage = (combatId, state) =>
    R.prop("criticalDamage", Selector.combatInstance(combatId, state));

  Selector.combatHitDamage = (combatId, state) =>
    R.prop("hitDamage", Selector.combatInstance(combatId, state));

  Selector.combatShieldDamage = (combatId, state) =>
    R.prop("shieldDamage", Selector.combatInstance(combatId, state));

  Selector.countByPilotToken = (pilotId, tokenKey, state) =>
    R.defaultTo(0, R.prop(tokenKey, Selector.countsByPilot(pilotId, state)));

  Selector.countByUpgradeToken = (upgradeId, tokenKey, state) =>
    R.defaultTo(0, R.prop(tokenKey, Selector.countsByUpgrade(upgradeId, state)));

  Selector.countsByPilot = (pilotId, state) =>
    R.defaultTo({}, R.prop("tokenCounts", Selector.pilotInstance(pilotId, state)));

  Selector.countsByUpgrade = (upgradeId, state) =>
    R.defaultTo({}, R.prop("tokenCounts", Selector.upgradeInstance(upgradeId, state)));

  Selector.criticalIdsByPilot = (pilotId, state) =>
    R.defaultTo([], R.prop("criticals", Selector.pilotInstance(pilotId, state)));

  Selector.damageIdsByPilot = (pilotId, state) =>
    R.defaultTo([], R.prop("damages", Selector.pilotInstance(pilotId, state)));

  Selector.damageInstancesByIds = (damageIds, state) =>
    R.map(damageId => Selector.damageInstance(damageId, state), damageIds);

  Selector.damageInstancesByPilot = (pilotId, state) =>
    Selector.damageInstancesByIds(Selector.damageIdsByPilot(pilotId, state), state);

  Selector.defenseDiceKeysByCombat = (combatId, state) =>
    R.prop("defenseDiceKeys", Selector.combatInstance(combatId, state));

  Selector.maneuverByPilot = (pilotId, state) => R.path(["pilotToManeuver", pilotId], state);

  Selector.pilotIdsByAgent = (agentId, state) =>
    R.defaultTo(
      [],
      R.prop("pilots", Selector.squadInstance(Selector.squadIdByAgent(agentId, state), state))
    );

  Selector.pilotIdsBySquad = (squadId, state) =>
    R.defaultTo([], R.prop("pilots", Selector.squadInstance(squadId, state)));

  Selector.pilotInstancesByAgent = (agentId, state) =>
    Selector.pilotInstancesByIds(Selector.pilotIdsByAgent(agentId, state), state);

  Selector.pilotInstancesByIds = (pilotIds, state) =>
    R.map(pilotId => Selector.pilotInstance(pilotId, state), pilotIds);

  Selector.pilotInstancesBySquad = (squadId, state) =>
    Selector.pilotInstancesByIds(Selector.pilotIdsBySquad(squadId, state), state);

  Selector.positionByPilot = (pilotId, state) =>
    R.prop("position", Selector.pilotInstance(pilotId, state));

  Selector.squadIdByAgent = (agentId, state) =>
    R.prop("squad", Selector.agentInstance(agentId, state));

  Selector.squadInstanceByAgent = (agentId, state) =>
    Selector.squadInstance(Selector.squadIdByAgent(agentId, state), state);

  Selector.squadInstanceByPilot = (pilotId, state) =>
    R.filter(
      squad => Selector.pilotIdsBySquad(squad.id, state).includes(pilotId),
      Selector.squadInstances(state)
    )[0];

  Selector.targetLocksByAttacker = (attackerId, state) =>
    R.filter(R.propEq("attackerId", attackerId), R.prop("targetLocks", state));

  Selector.targetLocksByDefender = (defenderId, state) =>
    R.filter(R.propEq("defenderId", defenderId), R.prop("targetLocks", state));

  Selector.upgradeIdsByPilot = (pilotId, state) =>
    R.defaultTo([], R.prop("upgrades", Selector.pilotInstance(pilotId, state)));

  Selector.upgradeInstancesByIds = (upgradeIds, state) =>
    R.map(upgradeId => Selector.upgradeInstance(upgradeId, state), upgradeIds);

  Selector.upgradeInstancesByPilot = (pilotId, state) =>
    Selector.upgradeInstancesByIds(Selector.upgradeIdsByPilot(pilotId, state), state);

  // //////////////////////////////////////////////////////////////////////////////

  Selector.activationQueue = state => R.prop("activationQueue", state);

  Selector.activeAgentId = state => R.prop("activeAgentId", state);

  Selector.activeCombatId = state => R.prop("activeCombatId", state);

  Selector.activePilotId = state => R.prop("activePilotId", state);

  Selector.agentQuery = state => R.prop("agentQuery", state);

  Selector.agentResponse = state => R.prop("agentResponse", state);

  Selector.combatQueue = state => R.prop("combatQueue", state);

  Selector.damageDeck = state => R.prop("damageDeck", state);

  Selector.damageDiscardPile = state => R.prop("damageDiscardPile", state);

  Selector.displayExplosion = state => R.prop("displayExplosion", state);

  Selector.displayLaserBeam = state => R.prop("displayLaserBeam", state);

  Selector.displayManeuver = state => R.prop("displayManeuver", state);

  Selector.endQueue = state => R.prop("endQueue", state);

  Selector.phaseKey = state => R.prop("phaseKey", state);

  Selector.pilotToManeuver = state => R.prop("pilotToManeuver", state);

  Selector.planningQueue = state => R.prop("planningQueue", state);

  Selector.playArea = state => R.prop("playArea", state);

  Selector.playFormatKey = state => R.prop("playFormatKey", state);

  Selector.round = state => R.prop("round", state);

  Selector.tacticalView = state => R.prop("tacticalView", state);

  Selector.targetLocks = state => R.prop("targetLocks", state);

  Selector.userMessage = state => R.prop("userMessage", state);

  // //////////////////////////////////////////////////////////////////////////////

  Selector.agentInstances = state => Object.values(R.prop("agentInstances", state));

  Selector.combatInstances = state => Object.values(R.prop("combatInstances", state));

  Selector.conditionInstances = state => Object.values(R.prop("conditionInstances", state));

  Selector.damageInstances = state => Object.values(R.prop("damageInstances", state));

  Selector.pilotInstances = state => Object.values(R.prop("pilotInstances", state));

  Selector.squadInstances = state => Object.values(R.prop("squadInstances", state));

  Selector.upgradeInstances = state => Object.values(R.prop("upgradeInstances", state));

  // //////////////////////////////////////////////////////////////////////////////

  const nextId = instanceMap => {
    const reduceFunction = (accum, key) => Math.max(accum, key);
    const maxId = R.reduce(reduceFunction, 0, Object.keys(instanceMap));

    return (maxId !== undefined ? maxId : 0) + 1;
  };

  Selector.nextAgentId = state => nextId(state.agentInstances);

  Selector.nextCombatId = state => nextId(state.combatInstances);

  Selector.nextConditionId = state => nextId(state.conditionInstances);

  Selector.nextDamageId = state => nextId(state.damageInstances);

  Selector.nextPilotId = state => nextId(state.pilotInstances);

  Selector.nextSquadId = state => nextId(state.squadInstances);

  Selector.nextUpgradeId = state => nextId(state.upgradeInstances);

  // //////////////////////////////////////////////////////////////////////////////

  Selector.agentInstance = (agentId, state) => R.path(["agentInstances", agentId], state);

  Selector.combatInstance = (combatId, state) => R.path(["combatInstances", combatId], state);

  Selector.conditionInstance = (conditionId, state) =>
    R.path(["conditionInstances", conditionId], state);

  Selector.damageInstance = (damageId, state) => R.path(["damageInstances", damageId], state);

  Selector.pilotInstance = (pilotId, state) => R.path(["pilotInstances", pilotId], state);

  Selector.squadInstance = (squadId, state) => R.path(["squadInstances", squadId], state);

  Selector.upgradeInstance = (upgradeId, state) => R.path(["upgradeInstances", upgradeId], state);

  Object.freeze(Selector);

  const SquadState = {};

  SquadState.create = ({
    id,
    name,
    year,
    description,
    points,

    pilots
  }) =>
    Immutable({
      id,
      name,
      year,
      description,
      points,

      pilots: Immutable(pilots)
    });

  Object.freeze(SquadState);

  const StatBonusesState = {};

  StatBonusesState.create = ({ agility, energy, hull, pilotSkill, primaryWeapon, shield } = {}) =>
    Immutable({ agility, energy, hull, pilotSkill, primaryWeapon, shield });

  Object.freeze(StatBonusesState);

  const TargetLockState = {};

  TargetLockState.create = ({ id, attackerId, defenderId }) =>
    Immutable({ id, attackerId, defenderId });

  Object.freeze(TargetLockState);

  const TokenCountsState = {};

  TokenCountsState.create = ({
    cloak,
    energy,
    evade,
    focus,
    ion,
    ordnance,
    reinforce,
    shield,
    stress,
    tractorBeam,
    weaponsDisabled
  } = {}) =>
    Immutable({
      cloak,
      energy,
      evade,
      focus,
      ion,
      ordnance,
      reinforce,
      shield,
      stress,
      tractorBeam,
      weaponsDisabled
    });

  Object.freeze(TokenCountsState);

  const UpgradeState = {};

  UpgradeState.create = ({ id, upgradeKey, tokenCounts }) =>
    Immutable({ id, upgradeKey, tokenCounts: Immutable(tokenCounts) });

  Object.freeze(UpgradeState);

  exports.AbilityState = AbilityState;
  exports.ActionCreator = ActionCreator;
  exports.ActionType = ActionType;
  exports.AgentQueryState = AgentQueryState;
  exports.AgentResponseState = AgentResponseState;
  exports.AgentState = AgentState;
  exports.CombatState = CombatState;
  exports.DamageState = DamageState;
  exports.ExplosionState = ExplosionState;
  exports.GameState = GameState;
  exports.LaserBeamState = LaserBeamState;
  exports.ManeuverState = ManeuverState;
  exports.PilotState = PilotState;
  exports.PositionState = PositionState;
  exports.Reducer = Reducer;
  exports.Selector = Selector;
  exports.SquadState = SquadState;
  exports.StatBonusesState = StatBonusesState;
  exports.TargetLockState = TargetLockState;
  exports.TokenCountsState = TokenCountsState;
  exports.UpgradeState = UpgradeState;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
