/* eslint no-console: ["error", { allow: ["log"] }] */

import ActionType from "./ActionType.js";
import GameState from "./GameState.js";

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

export default Reducer;
