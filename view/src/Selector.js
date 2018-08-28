import PilotUtilities from "./PilotUtilities.js";

const Selector = {};

const mapAttackerTargetLock = gameState => lock => {
  const defenderInstance = XMS.Selector.pilotInstance(lock.defenderId, gameState);

  return {
    id: lock.id,
    defenderName: PilotUtilities.name(defenderInstance)
  };
};

const mapDefenderTargetLock = gameState => lock => {
  const attackerInstance = XMS.Selector.pilotInstance(lock.attackerId, gameState);

  return {
    id: lock.id,
    attackerName: PilotUtilities.name(attackerInstance)
  };
};

// /////////////////////////////////////////////////////////////////////////////////////////////////
Selector.countsByPilot = (pilotId, gameState) => XMS.Selector.countsByPilot(pilotId, gameState);

Selector.damageCard = damageKey => XMA.Selector.damageCard(damageKey);

Selector.damageInstancesByPilot = (pilotId, gameState) =>
  XMS.Selector.damageInstancesByPilot(pilotId, gameState);

Selector.faction = factionKey => XMA.Selector.faction(factionKey);

Selector.factionValueByPilot = pilotKey => XMA.Selector.factionValueByPilot(pilotKey);

Selector.firingArc = firingArcKey => XMA.Selector.firingArc(firingArcKey);

Selector.firingArcKeysByShip = shipKey => XMA.Selector.firingArcKeysByShip(shipKey);

Selector.maneuver = maneuverKey => XMA.Selector.maneuver(maneuverKey);

Selector.phase = phaseKey => XMA.Selector.phase(phaseKey);

Selector.pilotCard = pilotKey => XMA.Selector.pilotCard(pilotKey);

Selector.pilotInstances = gameState => XMS.Selector.pilotInstances(gameState);

Selector.pilotInstancesByAgent = (agentId, gameState) =>
  XMS.Selector.pilotInstancesByAgent(agentId, gameState);

Selector.playFormat = gameState => XMA.Selector.playFormat(XMS.Selector.playFormatKey(gameState));

Selector.positionByPilot = (pilotId, gameState) => XMS.Selector.positionByPilot(pilotId, gameState);

Selector.referenceCard = referenceKey => XMA.Selector.referenceCard(referenceKey);

Selector.ship = shipKey => XMA.Selector.ship(shipKey);

Selector.shipBase = shipBaseKey => XMA.Selector.shipBase(shipBaseKey);

Selector.shipBaseValueByShip = shipKey => XMA.Selector.shipBaseValueByShip(shipKey);

Selector.shipKeyByPilot = pilotKey => XMA.Selector.shipKeyByPilot(pilotKey);

Selector.shipValueByPilot = pilotKey => XMA.Selector.shipValueByPilot(pilotKey);

Selector.targetLocksByAttacker = (attackerId, gameState) => {
  const targetLocks = XMS.Selector.targetLocksByAttacker(attackerId, gameState);

  return R.map(mapAttackerTargetLock(gameState), targetLocks);
};

Selector.targetLocksByDefender = (defenderId, gameState) => {
  const targetLocks = XMS.Selector.targetLocksByDefender(defenderId, gameState);

  return R.map(mapDefenderTargetLock(gameState), targetLocks);
};

Selector.upgradeCard = upgradeKey => XMA.Selector.upgradeCard(upgradeKey);

Selector.upgradeInstances = (pilotId, gameState) =>
  R.defaultTo([], XMS.Selector.upgradesByPilot(pilotId, gameState));

Selector.upgradeInstancesByPilot = (pilotId, gameState) =>
  XMS.Selector.upgradeInstancesByPilot(pilotId, gameState);

Selector.upgradeSlot = slotKey => XMA.Selector.upgradeSlot(slotKey);

Selector.userMessage = gameState => XMS.Selector.userMessage(gameState);

export default Selector;
