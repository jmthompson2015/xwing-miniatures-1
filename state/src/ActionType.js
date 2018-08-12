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

ActionType.INCREMENT_NEXT_AGENT_ID = "incrementNextAgentId";
ActionType.INCREMENT_NEXT_COMBAT_ID = "incrementNextCombatId";
ActionType.INCREMENT_NEXT_CONDITION_ID = "incrementNextConditionId";
ActionType.INCREMENT_NEXT_DAMAGE_ID = "incrementNextDamageId";
ActionType.INCREMENT_NEXT_PILOT_ID = "incrementNextPilotId";
ActionType.INCREMENT_NEXT_SQUAD_ID = "incrementNextSquadId";
ActionType.INCREMENT_NEXT_UPGRADE_ID = "incrementNextUpgradeId";
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
ActionType.SET_SQUAD_INSTANCE = "setSquadInstance";
ActionType.SET_SQUAD_PILOTS = "setSquadPilots";
ActionType.SET_UPGRADE_INSTANCE = "setUpgradeInstance";
ActionType.SET_UPGRADE_TOKEN_COUNTS = "setUpgradeTokenCounts";

Object.freeze(ActionType);

export default ActionType;