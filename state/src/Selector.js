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

export default Selector;
