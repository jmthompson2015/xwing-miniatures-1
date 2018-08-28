const Selector = {};

Selector.activationQueue = state => XMS.Selector.activationQueue(state);

Selector.activeAgentId = state => XMS.Selector.activeAgentId(state);

Selector.activeCombatId = state => XMS.Selector.activeCombatId(state);

Selector.activePilotId = state => XMS.Selector.activePilotId(state);

Selector.activePilotInstance = state => XMS.Selector.activePilotInstance(state);

Selector.agentInstance = (agentId, state) => XMS.Selector.agentInstance(agentId, state);

Selector.agentInstanceByPilot = (pilotId, state) =>
  XMS.Selector.agentInstanceByPilot(pilotId, state);

Selector.agentInstanceBySquad = (squadId, state) =>
  XMS.Selector.agentInstanceBySquad(squadId, state);

Selector.agentInstances = state => XMS.Selector.agentInstances(state);

Selector.agentQuery = state => XMS.Selector.agentQuery(state);

Selector.agentResponse = state => XMS.Selector.agentResponse(state);

Selector.attackDiceKeysByCombat = (combatId, state) =>
  XMS.Selector.attackDiceKeysByCombat(combatId, state);

Selector.attackDiceValueCount = (combatId, valueKey, state) =>
  Selector.diceValueCount(valueKey)(Selector.attackDiceKeysByCombat(combatId, state));

Selector.bonusByPilotStat = (pilotId, statKey, state) =>
  R.defaultTo(0, XMS.Selector.bonusByPilotStat(pilotId, statKey, state));

Selector.combatInstance = (combatId, state) => XMS.Selector.combatInstance(combatId, state);

Selector.combatQueue = state => XMS.Selector.combatQueue(state);

Selector.conditionCard = (conditionId, state) => {
  const conditionInstance = Selector.conditionInstance(conditionId, state);
  return conditionInstance !== undefined
    ? XMA.Selector.conditionCard(conditionInstance.conditionKey)
    : undefined;
};

Selector.conditionInstance = (conditionId, state) =>
  XMS.Selector.conditionInstance(conditionId, state);

Selector.countByPilotToken = (pilotId, tokenKey, state) =>
  R.defaultTo(0, XMS.Selector.countByPilotToken(pilotId, tokenKey, state));

Selector.countByUpgradeToken = (upgradeId, tokenKey, state) =>
  R.defaultTo(0, XMS.Selector.countByUpgradeToken(upgradeId, tokenKey, state));

Selector.damageCard = (damageId, state) =>
  XMA.Selector.damageCard(Selector.damageInstance(damageId, state).damageKey);

Selector.damageDeck = state => XMS.Selector.damageDeck(state);

Selector.damageDiscardPile = state => XMS.Selector.damageDiscardPile(state);

Selector.damageIdsByPilot = (pilotId, state) => XMS.Selector.damageIdsByPilot(pilotId, state);

Selector.damageInstance = (damageId, state) => XMS.Selector.damageInstance(damageId, state);

Selector.damageInstancesByPilot = (pilotId, state) =>
  XMS.Selector.damageInstancesByPilot(pilotId, state);

Selector.defenseDiceKeysByCombat = (combatId, state) =>
  XMS.Selector.defenseDiceKeysByCombat(combatId, state);

Selector.defenseDiceValueCount = (combatId, valueKey, state) =>
  Selector.diceValueCount(valueKey)(Selector.defenseDiceKeysByCombat(combatId, state));

Selector.diceValueCount = valueKey => diceKeys =>
  R.reduce((accumulator, diceKey) => accumulator + (diceKey === valueKey ? 1 : 0), 0)(diceKeys);

Selector.displayExplosion = state => XMS.Selector.displayExplosion(state);

Selector.displayLaserBeam = state => XMS.Selector.displayLaserBeam(state);

Selector.displayManeuver = state => XMS.Selector.displayManeuver(state);

Selector.endQueue = state => XMS.Selector.endQueue(state);

Selector.factionValueByPilot = (pilotId, state) =>
  XMA.Selector.factionValueByPilot(Selector.pilotKey(pilotId, state));

Selector.maneuverByPilot = (pilotId, state) => XMS.Selector.maneuverByPilot(pilotId, state);

Selector.phaseKey = state => XMS.Selector.phaseKey(state);

Selector.pilotCard = (pilotId, state) => XMA.Selector.pilotCard(Selector.pilotKey(pilotId, state));

Selector.pilotIds = state => XMS.Selector.pilotInstances(state).map(pilot => pilot.id);

Selector.pilotIdsByAgent = (agentId, state) => XMS.Selector.pilotIdsByAgent(agentId, state);

Selector.pilotIdsBySquad = (squadId, state) => XMS.Selector.pilotIdsBySquad(squadId, state);

Selector.pilotInstance = (pilotId, state) => XMS.Selector.pilotInstance(pilotId, state);

Selector.pilotInstances = state => XMS.Selector.pilotInstances(state);

Selector.pilotInstancesByAgent = (agentId, state) =>
  XMS.Selector.pilotInstancesByAgent(agentId, state);

Selector.pilotInstancesBySquad = (squadId, state) =>
  XMS.Selector.pilotInstancesBySquad(squadId, state);

Selector.pilotKey = (pilotId, state) => R.prop("pilotKey", Selector.pilotInstance(pilotId, state));

Selector.pilotToManeuver = state => XMS.Selector.pilotToManeuver(state);

Selector.planningQueue = state => XMS.Selector.planningQueue(state);

Selector.playFormat = state => XMA.Selector.playFormat(Selector.playFormatKey(state));

Selector.playFormatKey = state => XMS.Selector.playFormatKey(state);

Selector.positionByPilot = (pilotId, state) => XMS.Selector.positionByPilot(pilotId, state);

Selector.round = state => XMS.Selector.round(state);

Selector.shieldByPilot = (pilotId, state) =>
  Selector.countByPilotToken(pilotId, XMA.Token.SHIELD, state);

Selector.shipBaseValueByPilot = (pilotId, state) =>
  XMA.Selector.shipBaseValueByShip(Selector.shipByPilot(pilotId, state).key);

Selector.shipByPilot = (pilotId, state) =>
  XMA.Selector.shipValueByPilot(Selector.pilotKey(pilotId, state));

Selector.shipKeyByPilot = (pilotId, state) => R.prop("key", Selector.shipByPilot(pilotId, state));

Selector.squadInstance = (squadId, state) => XMS.Selector.squadInstance(squadId, state);

Selector.statValueByPilot = (pilotKey, statKey) => {
  const pilotStat = XMA.Selector.statValueByPilot(pilotKey, statKey);
  const shipKey = XMA.Selector.shipKeyByPilot(pilotKey);
  const shipStat = XMA.Selector.statValueByShip(shipKey, statKey);

  return R.defaultTo(shipStat, pilotStat);
};

Selector.targetLocksByAttacker = (attackerId, state) =>
  XMS.Selector.targetLocksByAttacker(attackerId, state);

Selector.targetLocksByDefender = (defenderId, state) =>
  XMS.Selector.targetLocksByDefender(defenderId, state);

Selector.upgradeCard = (upgradeId, state) =>
  XMA.Selector.upgradeCard(Selector.upgradeKey(upgradeId, state));

Selector.upgradeInstance = (upgradeId, state) => XMS.Selector.upgradeInstance(upgradeId, state);

Selector.upgradeInstancesByPilot = (pilotId, state) =>
  XMS.Selector.upgradeInstancesByPilot(pilotId, state);

Selector.upgradeKey = (upgradeId, state) =>
  R.prop("upgradeKey", Selector.upgradeInstance(upgradeId, state));

Selector.upgradeKeysByPilot = (pilotId, state) =>
  R.map(upgrade => upgrade.upgradeKey, Selector.upgradeInstancesByPilot(pilotId, state));

Selector.weaponUpgradeIdsByPilot = (pilotId, state) =>
  R.map(upgrade => upgrade.id, Selector.weaponUpgradeInstancesByPilot(pilotId, state));

Selector.weaponUpgradeInstancesByPilot = (pilotId, state) => {
  const upgradeInstances = Selector.upgradeInstancesByPilot(pilotId, state);
  const filterFunction = instance =>
    XMA.Selector.upgradeCard(instance.upgradeKey).attack !== undefined;

  return upgradeInstances.filter(filterFunction);
};

Object.freeze(Selector);

export default Selector;
