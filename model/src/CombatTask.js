import AbilityUtils from "./AbilityUtilities.js";
import AgentQueryType from "./AgentQueryType.js";
import AgentUtils from "./AgentUtilities.js";
import DiceUtils from "./DiceUtilities.js";
import PilotUtils from "./PilotUtilities.js";
import Selector from "./Selector.js";
import TaskUtils from "./TaskUtilities.js";

const { AttackDiceValue, DefenseDiceValue, Phase, Token } = XMA;

const { ActionCreator } = XMS;

const CombatTask = {};

const PHASE_TO_CONFIG = {};

// /////////////////////////////////////////////////////////////////////////////////////////////////
const comparator = R.comparator((a, b) => {
  const pilotSkillA = PilotUtils.statValue(
    "skill",
    a.pilotKey,
    Selector.upgradeInstancesByPilot(a.id)
  );
  const pilotSkillB = PilotUtils.statValue(
    "skill",
    b.pilotKey,
    Selector.upgradeInstancesByPilot(b.id)
  );

  // FIXME: sort same pilot skill by initiative
  return pilotSkillA > pilotSkillB;
});

const setPhase = (store, phaseKey) => store.dispatch(ActionCreator.setPhase(phaseKey));

const setCombatQueue = store => {
  const pilots = Selector.pilotInstances(store.getState());
  const queue = R.sort(comparator, pilots).map(pilot => pilot.id);
  store.dispatch(ActionCreator.setCombatQueue(queue));
};

const start = store =>
  new Promise(resolve => {
    setCombatQueue(store);
    setPhase(store, Phase.COMBAT_DECLARE_TARGET);

    resolve(store);
  });

const end = store =>
  new Promise(resolve => {
    setPhase(store, Phase.END_START);
    resolve(store);
  });

// /////////////////////////////////////////////////////////////////////////////////////////////////
CombatTask.doIt = store => {
  let answer;
  let config;
  const phaseKey = Selector.phaseKey(store.getState());

  switch (phaseKey) {
    case Phase.COMBAT_START:
      answer = start(store);
      break;
    case Phase.COMBAT_END:
      answer = end(store);
      break;
    default:
      config = PHASE_TO_CONFIG[phaseKey];
      answer = TaskUtils.processPhase({
        phaseKey,
        responseKey: config.responseKey,
        responseFunction: config.responseFunction,
        processFunction: config.processFunction
      })(store);
  }

  return answer;
};

// /////////////////////////////////////////////////////////////////////////////////////////////////
PHASE_TO_CONFIG[Phase.COMBAT_DECLARE_TARGET] = {
  processFunction: store => {
    const combatQueue = Selector.combatQueue(store.getState());

    if (combatQueue.length > 0) {
      store.dispatch(ActionCreator.dequeueCombat());
      const activePilotId = Selector.activePilotId(store.getState());
      const agent = Selector.agentInstanceByPilot(activePilotId, store.getState());
      const pilot = Selector.pilotInstance(activePilotId, store.getState());
      const weaponToRangeToDefenders = AgentUtils.determineWeaponToRangeToDefenders(
        pilot,
        store.getState()
      );

      const agentQuery = XMS.AgentQueryState.create({
        agentId: agent.id,
        queryKey: AgentQueryType.CHOOSE_WEAPON_AND_DEFENDER,
        payload: {
          attackerId: activePilotId,
          weaponToRangeToDefenders
        }
      });
      store.dispatch(ActionCreator.setAgentQuery(agentQuery));
    } else {
      store.dispatch(ActionCreator.clearActivePilotId());
      setPhase(store, Phase.COMBAT_END);
    }
  },
  responseKey: AgentQueryType.CHOOSE_WEAPON_AND_DEFENDER,
  responseFunction: store => {
    const agentResponse = Selector.agentResponse(store.getState());
    const { attackerId, defenderId, rangeKey, weaponKey } = agentResponse.payload;

    if (defenderId !== undefined) {
      const combatId = XMS.Selector.nextCombatId(store.getState());
      store.dispatch(ActionCreator.setActiveCombatId(combatId));

      const combatInstance = XMS.CombatState.create({
        id: combatId,
        attackerId,
        defenderId,
        rangeKey,
        weaponKey
      });
      store.dispatch(ActionCreator.setCombatInstance(combatInstance));

      const attackerFaction = Selector.factionValueByPilot(attackerId, store.getState());
      const attackerPosition = Selector.positionByPilot(attackerId, store.getState());
      const defenderPosition = Selector.positionByPilot(defenderId, store.getState());
      const laserBeam = XMS.LaserBeamState.create({
        color: attackerFaction.color,
        fromPosition: attackerPosition,
        isPrimary: weaponKey === "primary",
        toPosition: defenderPosition
      });
      store.dispatch(ActionCreator.setDisplayLaserBeam(laserBeam));
      setPhase(store, Phase.COMBAT_ROLL_ATTACK_DICE);
    } else {
      // No attack.
      setPhase(store, Phase.COMBAT_DECLARE_TARGET);
    }

    store.dispatch(ActionCreator.clearAgentResponse());
  }
};

PHASE_TO_CONFIG[Phase.COMBAT_ROLL_ATTACK_DICE] = {
  processFunction: store => {
    if (store.getState().displayLaserBeam !== undefined) {
      store.dispatch(ActionCreator.clearDisplayLaserBeam());
    }

    const combatId = Selector.activeCombatId(store.getState());
    const diceCount = DiceUtils.computeAttackDiceCount(combatId, store.getState());
    const attackDice = DiceUtils.rollAttackDice(diceCount);
    store.dispatch(ActionCreator.setCombatAttackDice(combatId, attackDice));
    store.dispatch(ActionCreator.setPhase(Phase.COMBAT_MODIFY_ATTACK_DICE));
  }
};

PHASE_TO_CONFIG[Phase.COMBAT_MODIFY_ATTACK_DICE] = {
  processFunction: store => {
    const activePilotId = Selector.activePilotId(store.getState());
    const agent = Selector.agentInstanceByPilot(activePilotId, store.getState());
    const combatId = Selector.activeCombatId(store.getState());
    const modificationKeys = AgentUtils.determineValidAttackModifications();
    const reduceFunction = (accum, key) => {
      const ability = AbilityUtils.ability("DiceModification", key);
      if (ability !== undefined && ability.condition(activePilotId, store.getState())) {
        accum.push(
          XMS.AbilityState.create({
            sourceName: "DiceModification",
            sourceKey: key
          })
        );
      }
      return accum;
    };
    const abilities = R.reduce(reduceFunction, [], modificationKeys);

    const agentQuery = XMS.AgentQueryState.create({
      agentId: agent.id,
      queryKey: AgentQueryType.CHOOSE_ATTACK_DICE_MODIFICATION,
      payload: {
        combatId,
        abilities
      }
    });
    store.dispatch(ActionCreator.setAgentQuery(agentQuery));
  },
  responseKey: AgentQueryType.CHOOSE_ATTACK_DICE_MODIFICATION,
  responseFunction: store => {
    AbilityUtils.processAgentResponse(store);
    store.dispatch(ActionCreator.setPhase(Phase.COMBAT_ROLL_DEFENSE_DICE));
  }
};

PHASE_TO_CONFIG[Phase.COMBAT_ROLL_DEFENSE_DICE] = {
  processFunction: store => {
    const combatId = Selector.activeCombatId(store.getState());
    const diceCount = DiceUtils.computeDefenseDiceCount(combatId, store.getState());
    const defenseDice = DiceUtils.rollDefenseDice(diceCount);
    store.dispatch(ActionCreator.setCombatDefenseDice(combatId, defenseDice));
    store.dispatch(ActionCreator.setPhase(Phase.COMBAT_MODIFY_DEFENSE_DICE));
  }
};

PHASE_TO_CONFIG[Phase.COMBAT_MODIFY_DEFENSE_DICE] = {
  processFunction: store => {
    const activePilotId = Selector.activePilotId(store.getState());
    const agent = Selector.agentInstanceByPilot(activePilotId, store.getState());
    const combatId = Selector.activeCombatId(store.getState());
    const modificationKeys = AgentUtils.determineValidDefenseModifications();
    const reduceFunction = (accum, key) => {
      const ability = AbilityUtils.ability("DiceModification", key);
      if (ability !== undefined && ability.condition(activePilotId, store.getState())) {
        accum.push(
          XMS.AbilityState.create({
            sourceName: "DiceModification",
            sourceKey: key
          })
        );
      }
      return accum;
    };
    const abilities = R.reduce(reduceFunction, [], modificationKeys);

    const agentQuery = XMS.AgentQueryState.create({
      agentId: agent.id,
      queryKey: AgentQueryType.CHOOSE_DEFENSE_DICE_MODIFICATION,
      payload: {
        combatId,
        abilities
      }
    });
    store.dispatch(ActionCreator.setAgentQuery(agentQuery));
  },
  responseKey: AgentQueryType.CHOOSE_DEFENSE_DICE_MODIFICATION,
  responseFunction: store => {
    AbilityUtils.processAgentResponse(store);
    setPhase(store, Phase.COMBAT_COMPARE_RESULTS);
  }
};

PHASE_TO_CONFIG[Phase.COMBAT_COMPARE_RESULTS] = {
  processFunction: store => {
    const combatId = Selector.activeCombatId(store.getState());
    let hits = Selector.attackDiceValueCount(combatId, AttackDiceValue.HIT, store.getState());
    let criticals = Selector.attackDiceValueCount(
      combatId,
      AttackDiceValue.CRITICAL_HIT,
      store.getState()
    );
    let evades = Selector.defenseDiceValueCount(combatId, DefenseDiceValue.EVADE, store.getState());

    if (hits > 0 && evades > 0) {
      const count = Math.min(hits, evades);
      hits -= count;
      evades -= count;
    }

    if (criticals > 0 && evades > 0) {
      const count = Math.min(criticals, evades);
      criticals -= count;
      evades -= count;
    }

    const { defenderId } = Selector.combatInstance(combatId, store.getState());
    let shieldDamage = 0;

    if (Selector.shieldByPilot(defenderId, store.getState()) > 0) {
      const count = Math.min(hits, Selector.shieldByPilot(defenderId, store.getState()));
      hits -= count;
      shieldDamage += count;
      store.dispatch(ActionCreator.addPilotTokenCount(defenderId, Token.SHIELD, -count));
    }

    if (Selector.shieldByPilot(defenderId, store.getState()) > 0) {
      const count = Math.min(criticals, Selector.shieldByPilot(defenderId, store.getState()));
      criticals -= count;
      shieldDamage += count;
      store.dispatch(ActionCreator.addPilotTokenCount(defenderId, Token.SHIELD, -count));
    }

    store.dispatch(ActionCreator.setCombatShieldDamage(combatId, shieldDamage));
    store.dispatch(ActionCreator.setCombatHitDamage(combatId, hits));
    store.dispatch(ActionCreator.setCombatCriticalDamage(combatId, criticals));
    setPhase(store, Phase.COMBAT_NOTIFY_DAMAGE);
  }
};

PHASE_TO_CONFIG[Phase.COMBAT_NOTIFY_DAMAGE] = {
  processFunction: store => {
    const activePilotId = Selector.activePilotId(store.getState());
    const agent = Selector.agentInstanceByPilot(activePilotId, store.getState());
    const combatId = Selector.activeCombatId(store.getState());

    const agentQuery = XMS.AgentQueryState.create({
      agentId: agent.id,
      queryKey: AgentQueryType.NOTIFY_DAMAGE,
      payload: {
        combatId
      }
    });
    store.dispatch(ActionCreator.setAgentQuery(agentQuery));
  },
  responseKey: AgentQueryType.NOTIFY_DAMAGE,
  responseFunction: store => {
    // FIXME: process agent response
    store.dispatch(ActionCreator.clearAgentResponse());
    store.dispatch(ActionCreator.setPhase(Phase.COMBAT_DEAL_DAMAGE));
  }
};

PHASE_TO_CONFIG[Phase.COMBAT_DEAL_DAMAGE] = {
  processFunction: store => {
    const combatId = Selector.activeCombatId(store.getState());
    const combatInstance = Selector.combatInstance(combatId, store.getState());
    const { defenderId } = combatInstance;
    const hits = combatInstance.hitDamage;
    const criticals = combatInstance.criticalDamage;

    for (let i = 0; i < hits; i += 1) {
      store.dispatch(ActionCreator.dealDamage(defenderId));
    }

    for (let i = 0; i < criticals; i += 1) {
      store.dispatch(ActionCreator.dealCritical(defenderId));
    }

    // Next pilot.
    setPhase(store, Phase.COMBAT_DECLARE_TARGET);
  }
};

Object.freeze(CombatTask);

export default CombatTask;
