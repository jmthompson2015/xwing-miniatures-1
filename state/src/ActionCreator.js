import ActionType from "./ActionType.js";

const ActionCreator = {};

ActionCreator.addPilotTokenCount = makeActionCreator(ActionType.ADD_PILOT_TOKEN_COUNT, "pilotId", "tokenKey", "value");

ActionCreator.clearActiveAgentId = makeActionCreator(ActionType.CLEAR_ACTIVE_AGENT_ID);

ActionCreator.clearActiveCombatId = makeActionCreator(ActionType.CLEAR_ACTIVE_COMBAT_ID);

ActionCreator.clearActivePilotId = makeActionCreator(ActionType.CLEAR_ACTIVE_PILOT_ID);

ActionCreator.clearAgentQuery = makeActionCreator(ActionType.CLEAR_AGENT_QUERY);

ActionCreator.clearAgentResponse = makeActionCreator(ActionType.CLEAR_AGENT_RESPONSE);

ActionCreator.clearDisplayExplosion = makeActionCreator(ActionType.CLEAR_DISPLAY_EXPLOSION);

ActionCreator.clearDisplayLaserBeam = makeActionCreator(ActionType.CLEAR_DISPLAY_LASER_BEAM);

ActionCreator.clearDisplayManeuver = makeActionCreator(ActionType.CLEAR_DISPLAY_MANEUVER);

ActionCreator.clearPilotTokenCount = makeActionCreator(ActionType.CLEAR_PILOT_TOKEN_COUNT, "pilotId", "tokenKey");

ActionCreator.dealCritical = makeActionCreator(ActionType.DEAL_CRITICAL, "pilotId");

ActionCreator.dealDamage = makeActionCreator(ActionType.DEAL_DAMAGE, "pilotId");

ActionCreator.dequeueActivation = makeActionCreator(ActionType.DEQUEUE_ACTIVATION);

ActionCreator.dequeueCombat = makeActionCreator(ActionType.DEQUEUE_COMBAT);

ActionCreator.dequeueEnd = makeActionCreator(ActionType.DEQUEUE_END);

ActionCreator.dequeuePlanning = makeActionCreator(ActionType.DEQUEUE_PLANNING);

ActionCreator.incrementNextAgentId = makeActionCreator(ActionType.INCREMENT_NEXT_AGENT_ID);

ActionCreator.incrementNextCombatId = makeActionCreator(ActionType.INCREMENT_NEXT_COMBAT_ID);

ActionCreator.incrementNextConditionId = makeActionCreator(ActionType.INCREMENT_NEXT_CONDITION_ID);

ActionCreator.incrementNextDamageId = makeActionCreator(ActionType.INCREMENT_NEXT_DAMAGE_ID);

ActionCreator.incrementNextPilotId = makeActionCreator(ActionType.INCREMENT_NEXT_PILOT_ID);

ActionCreator.incrementNextSquadId = makeActionCreator(ActionType.INCREMENT_NEXT_SQUAD_ID);

ActionCreator.incrementNextUpgradeId = makeActionCreator(ActionType.INCREMENT_NEXT_UPGRADE_ID);

ActionCreator.incrementRound = makeActionCreator(ActionType.INCREMENT_ROUND);

ActionCreator.movePilot = makeActionCreator(ActionType.MOVE_PILOT, "pilotId", "toPosition");

ActionCreator.setActivationQueue = makeActionCreator(ActionType.SET_ACTIVATION_QUEUE, "activationQueue");

ActionCreator.setActiveCombatId = makeActionCreator(ActionType.SET_ACTIVE_COMBAT_ID, "activeCombatId");

ActionCreator.setActivePilotId = makeActionCreator(ActionType.SET_ACTIVE_PILOT_ID, "activePilotId");

ActionCreator.setAgentInstance = makeActionCreator(ActionType.SET_AGENT_INSTANCE, "agentInstance");

ActionCreator.setAgentQuery = makeActionCreator(ActionType.SET_AGENT_QUERY, "agentQuery");

ActionCreator.setAgentResponse = makeActionCreator(ActionType.SET_AGENT_RESPONSE, "agentResponse");

ActionCreator.setAgentSquad = makeActionCreator(ActionType.SET_AGENT_SQUAD, "agentId", "squadId");

ActionCreator.setCombatAttackDice = makeActionCreator(ActionType.SET_COMBAT_ATTACK_DICE, "combatId", "attackDiceKeys");

ActionCreator.setCombatCriticalDamage = makeActionCreator(ActionType.SET_COMBAT_CRITICAL_DAMAGE, "combatId", "criticalDamage");

ActionCreator.setCombatDefenseDice = makeActionCreator(ActionType.SET_COMBAT_DEFENSE_DICE, "combatId", "defenseDiceKeys");

ActionCreator.setCombatHitDamage = makeActionCreator(ActionType.SET_COMBAT_HIT_DAMAGE, "combatId", "hitDamage");

ActionCreator.setCombatInstance = makeActionCreator(ActionType.SET_COMBAT_INSTANCE, "combatInstance");

ActionCreator.setCombatQueue = makeActionCreator(ActionType.SET_COMBAT_QUEUE, "combatQueue");

ActionCreator.setCombatShieldDamage = makeActionCreator(ActionType.SET_COMBAT_SHIELD_DAMAGE, "combatId", "shieldDamage");

ActionCreator.setDamageDeck = makeActionCreator(ActionType.SET_DAMAGE_DECK, "damageDeck");

ActionCreator.setDamageInstances = makeActionCreator(ActionType.SET_DAMAGE_INSTANCES, "damageInstances");

ActionCreator.setDisplayExplosion = makeActionCreator(ActionType.SET_DISPLAY_EXPLOSION, "displayExplosion");

ActionCreator.setDisplayLaserBeam = makeActionCreator(ActionType.SET_DISPLAY_LASER_BEAM, "displayLaserBeam");

ActionCreator.setDisplayManeuver = makeActionCreator(ActionType.SET_DISPLAY_MANEUVER, "displayManeuver");

ActionCreator.setEndQueue = makeActionCreator(ActionType.SET_END_QUEUE, "endQueue");

ActionCreator.setGameOver = makeActionCreator(ActionType.SET_GAME_OVER, "isGameOver");

ActionCreator.setPhase = makeActionCreator(ActionType.SET_PHASE, "phaseKey");

ActionCreator.setPilotInstance = makeActionCreator(ActionType.SET_PILOT_INSTANCE, "pilotInstance");

ActionCreator.setPilotToManeuver = makeActionCreator(ActionType.SET_PILOT_TO_MANEUVER, "pilotToManeuver");

ActionCreator.setPilotStatBonuses = makeActionCreator(ActionType.SET_PILOT_STAT_BONUSES, "pilotId", "statBonuses");

ActionCreator.setPilotTokenCounts = makeActionCreator(ActionType.SET_PILOT_TOKEN_COUNTS, "pilotId", "tokenCounts");

ActionCreator.setPilotUpgrades = makeActionCreator(ActionType.SET_PILOT_UPGRADES, "pilotId", "upgradeIds");

ActionCreator.setPlanningQueue = makeActionCreator(ActionType.SET_PLANNING_QUEUE, "planningQueue");

ActionCreator.setSquadInstance = makeActionCreator(ActionType.SET_SQUAD_INSTANCE, "squadInstance");

ActionCreator.setSquadPilots = makeActionCreator(ActionType.SET_SQUAD_PILOTS, "squadId", "pilotIds");

ActionCreator.setUpgradeInstance = makeActionCreator(ActionType.SET_UPGRADE_INSTANCE, "upgradeInstance");

ActionCreator.setUpgradeTokenCounts = makeActionCreator(ActionType.SET_UPGRADE_TOKEN_COUNTS, "upgradeId", "tokenCounts");

// See https://redux.js.org/recipes/reducing-boilerplate
function makeActionCreator(type, ...argNames)
{
   return function(...args)
   {
      const action = {
         type
      };
      argNames.forEach((arg, index) =>
      {
         action[argNames[index]] = args[index];
      });
      return action;
   };
}

Object.freeze(ActionCreator);

export default ActionCreator;