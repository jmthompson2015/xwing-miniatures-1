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

export default GameState;
