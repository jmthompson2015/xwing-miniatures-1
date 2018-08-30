(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.XMM = {})));
}(this, (function (exports) { 'use strict';

  const { ConditionCard } = XMA;

  const ConditionAbility = {};

  // //////////////////////////////////////////////////////////////////////
  ConditionAbility[ConditionCard.A_DEBT_TO_PAY] = {
    condition: (/* pilotId, state */) => false,
    consequent: (pilotId, store) =>
      new Promise(resolve => {
        resolve(store);
      })
  };

  Object.freeze(ConditionAbility);

  const { DamageCard } = XMA;

  const DamageAbility = {};

  // //////////////////////////////////////////////////////////////////////
  DamageAbility[DamageCard.BLINDED_PILOT] = {
    condition: (/* pilotId, state */) => false,
    consequent: (pilotId, store) =>
      new Promise(resolve => {
        resolve(store);
      })
  };

  Object.freeze(DamageAbility);

  const { PilotCard } = XMA;

  const PilotAbility = {};

  // //////////////////////////////////////////////////////////////////////
  PilotAbility[PilotCard.LUKE_SKYWALKER] = {
    condition: (/* pilotId, state */) => false,
    consequent: (pilotId, store) =>
      new Promise(resolve => {
        resolve(store);
      })
  };

  Object.freeze(PilotAbility);

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

  const { AttackDiceValue, DefenseDiceValue, Range, Stat } = XMA;

  const DiceUtilities = {};

  const rollDice = valueFunction => count => {
    const answer = [];

    for (let i = 0; i < count; i += 1) {
      answer.push(valueFunction());
    }

    return Immutable(answer);
  };

  const rollRandomAttackValue = () => {
    const min = 1;
    const max = 8;
    const roll = Math.floor(Math.random() * (max - min + 1)) + min;
    let value;

    // There are 2 focus, 3 hit, 1 critical hit, and 2 blank.
    switch (roll) {
      case 1:
      case 5:
        value = AttackDiceValue.FOCUS;
        break;
      case 2:
      case 6:
      case 8:
        value = AttackDiceValue.HIT;
        break;
      case 3:
        value = AttackDiceValue.CRITICAL_HIT;
        break;
      case 4:
      case 7:
        value = AttackDiceValue.BLANK;
        break;
      default:
        throw new Error(`Unsupported roll: ${roll}`);
    }

    return value;
  };

  const rollRandomDefenseValue = () => {
    const min = 1;
    const max = 8;
    const roll = Math.floor(Math.random() * (max - min + 1)) + min;
    let value;

    // There are 2 focus, 3 evade, and 3 blank.
    switch (roll) {
      case 1:
      case 4:
        value = DefenseDiceValue.FOCUS;
        break;
      case 2:
      case 5:
      case 7:
        value = DefenseDiceValue.EVADE;
        break;
      case 3:
      case 6:
      case 8:
        value = DefenseDiceValue.BLANK;
        break;
      default:
        throw new Error(`Unsupported roll: ${roll}`);
    }

    return value;
  };

  // /////////////////////////////////////////////////////////////////////////////////////////////////
  DiceUtilities.addValue = (diceKeys, newValue) => {
    const newValues = Immutable.asMutable(diceKeys);
    newValues.push(newValue);

    return Immutable(newValues);
  };

  DiceUtilities.changeAllToValue = (diceKeys, oldValue, newValue) => {
    const newValues = Immutable.asMutable(diceKeys);

    for (let i = 0; i < diceKeys.length; i += 1) {
      if (diceKeys[i] === oldValue) {
        newValues[i] = newValue;
      }
    }

    return Immutable(newValues);
  };

  DiceUtilities.computeAttackDiceCount = (activeCombatId, state) => {
    const combatInstance = Selector.combatInstance(activeCombatId, state);
    const attackerInstance = Selector.pilotInstance(combatInstance.attackerId, state);
    const { rangeKey } = combatInstance;

    let answer = Selector.statValueByPilot(attackerInstance.pilotKey, Stat.PRIMARY_WEAPON);

    // Bonus attack die at range one.
    answer += rangeKey === Range.ONE ? 1 : 0;

    return answer;
  };

  DiceUtilities.computeDefenseDiceCount = (activeCombatId, state) => {
    const combatInstance = state.combatInstances[activeCombatId];
    const attackerInstance = Selector.pilotInstance(combatInstance.attackerId, state);
    const { rangeKey } = combatInstance;

    let answer = Selector.statValueByPilot(attackerInstance.pilotKey, Stat.AGILITY);

    // Bonus defense die at range three, four, and five.
    answer += [Range.THREE, Range.FOUR, Range.FIVE].includes(rangeKey) ? 1 : 0;

    return answer;
  };

  DiceUtilities.rollAttackDice = count => rollDice(rollRandomAttackValue)(count);

  DiceUtilities.rollDefenseDice = count => rollDice(rollRandomDefenseValue)(count);

  Object.freeze(DiceUtilities);

  const { AttackDiceValue: AttackDiceValue$1, DefenseDiceValue: DefenseDiceValue$1, DiceModification, Token } = XMA;

  const { ActionCreator } = XMS;

  const ModifyDiceAbility = {};

  const attackDiceFocusCount = state => {
    const combatId = Selector.activeCombatId(state);
    return combatId !== undefined
      ? Selector.attackDiceValueCount(combatId, AttackDiceValue$1.FOCUS, state)
      : 0;
  };

  const defenseDiceFocusCount = state => {
    const combatId = Selector.activeCombatId(state);
    return combatId !== undefined
      ? Selector.defenseDiceValueCount(combatId, DefenseDiceValue$1.FOCUS, state)
      : 0;
  };

  const isActiveCombatAttacker = (attackerId, state) => {
    const combatId = Selector.activeCombatId(state);
    const combatInstance =
      combatId !== undefined ? Selector.combatInstance(combatId, state) : undefined;
    return combatInstance !== undefined && attackerId === combatInstance.attackerId;
  };

  const isActiveCombatDefender = (defenderId, state) => {
    const combatId = Selector.activeCombatId(state);
    const combatInstance =
      combatId !== undefined ? Selector.combatInstance(combatId, state) : undefined;
    return combatInstance !== undefined && defenderId === combatInstance.defenderId;
  };

  // /////////////////////////////////////////////////////////////////////////////////////////////////
  ModifyDiceAbility[DiceModification.ATTACK_SPEND_FOCUS] = {
    // Spend a focus token to change all focus results to hit results on attack dice.
    condition: (attackerId, state) => {
      const focusTokenCount = Selector.countByPilotToken(attackerId, Token.FOCUS, state);
      const diceFocusCount = attackDiceFocusCount(state);
      return isActiveCombatAttacker(attackerId, state) && focusTokenCount > 0 && diceFocusCount > 0;
    },
    consequent: (attackerId, store) =>
      new Promise(resolve => {
        const state = store.getState();
        const combatId = Selector.activeCombatId(state);
        const diceKeys = Selector.attackDiceKeysByCombat(combatId, state);
        const newDiceKeys = DiceUtilities.changeAllToValue(
          diceKeys,
          AttackDiceValue$1.FOCUS,
          AttackDiceValue$1.HIT
        );

        store.dispatch(ActionCreator.setCombatAttackDice(combatId, newDiceKeys));
        store.dispatch(ActionCreator.addPilotTokenCount(attackerId, Token.FOCUS, -1));
        resolve(store);
      })
  };

  ModifyDiceAbility[DiceModification.ATTACK_SPEND_TARGET_LOCK] = {
    // Spend a target lock on the defender to reroll any number of attack dice.
    condition: (/* attackerId, state */) => {
      // FIXME: implement DiceModification.ATTACK_SPEND_TARGET_LOCK condition()
    },
    consequent: (attackerId, store) =>
      new Promise(resolve => {
        // FIXME: implement DiceModification.ATTACK_SPEND_TARGET_LOCK consequent()
        resolve(store);
      })
  };

  // //////////////////////////////////////////////////////////////////////
  ModifyDiceAbility[DiceModification.DEFENSE_SPEND_EVADE] = {
    // Spend an evade token to add one additional evade result to defense dice.
    condition: (defenderId, state) => {
      const evadeTokenCount = Selector.countByPilotToken(defenderId, Token.EVADE, state);
      return isActiveCombatDefender(defenderId, state) && evadeTokenCount > 0;
    },
    consequent: (defenderId, store) =>
      new Promise(resolve => {
        const state = store.getState();
        const combatId = Selector.activeCombatId(state);
        const diceKeys = Selector.defenseDiceKeysByCombat(combatId, state);
        const newDiceKeys = DiceUtilities.addValue(diceKeys, DefenseDiceValue$1.EVADE);

        store.dispatch(ActionCreator.setCombatDefenseDice(combatId, newDiceKeys));
        store.dispatch(ActionCreator.addPilotTokenCount(defenderId, Token.EVADE, -1));
        resolve(store);
      })
  };

  ModifyDiceAbility[DiceModification.DEFENSE_SPEND_FOCUS] = {
    // Spend a focus token to change all focus results to evade results on defense dice.
    condition: (defenderId, state) => {
      const focusTokenCount = Selector.countByPilotToken(defenderId, Token.FOCUS, state);
      const diceFocusCount = defenseDiceFocusCount(state);
      return isActiveCombatDefender(defenderId, state) && focusTokenCount > 0 && diceFocusCount > 0;
    },
    consequent: (defenderId, store) =>
      new Promise(resolve => {
        const state = store.getState();
        const combatId = Selector.activeCombatId(state);
        const diceKeys = Selector.defenseDiceKeysByCombat(combatId, state);
        const newDiceKeys = DiceUtilities.changeAllToValue(
          diceKeys,
          DefenseDiceValue$1.FOCUS,
          DefenseDiceValue$1.EVADE
        );

        store.dispatch(ActionCreator.setCombatDefenseDice(combatId, newDiceKeys));
        store.dispatch(ActionCreator.addPilotTokenCount(defenderId, Token.FOCUS, -1));
        resolve(store);
      })
  };

  Object.freeze(ModifyDiceAbility);

  const { ShipAction, Token: Token$1 } = XMA;

  const { ActionCreator: ActionCreator$1 } = XMS;

  const ShipActionAbility = {};

  const isActivePilot = (pilotId, state) => pilotId === Selector.activePilotId(state);

  // //////////////////////////////////////////////////////////////////////
  // ShipActionAbility[ShipAction.BARREL_ROLL] = {
  //    // Perform the barrel roll action to move laterally and adjust their position.
  //    condition: function(store, token)
  //    {
  //       return isActiveToken(store, token);
  //    },
  //    consequent: function(store, token, callback, context)
  //    {
  //       const maneuverKey = context.maneuverKey;
  //       const maneuverAction = new ManeuverAction(store, token.id(), maneuverKey);
  //       maneuverAction.doIt();
  //       notifyEvent(store, token, callback, ShipAction.BARREL_ROLL);
  //    },
  // };

  // ShipActionAbility[ShipAction.BOOST] = {
  //    // Perform the boost action to adjust their position.
  //    condition: function(store, token)
  //    {
  //       return isActiveToken(store, token);
  //    },
  //    consequent: function(store, token, callback, context)
  //    {
  //       const maneuverKey = context.maneuverKey;
  //       const maneuverAction = new ManeuverAction(store, token.id(), maneuverKey);
  //       maneuverAction.doIt();
  //       notifyEvent(store, token, callback, ShipAction.BOOST);
  //    },
  // };

  // ShipActionAbility[ShipAction.CLOAK] = {
  //    // Assign one cloak token to that ship.
  //    condition: function(store, token)
  //    {
  //       return isActiveToken(store, token);
  //    },
  //    consequent: function(store, token, callback)
  //    {
  //       store.dispatch(CardAction.addCloakCount(token));
  //       notifyEvent(store, token, callback, ShipAction.CLOAK);
  //    },
  // };

  // ShipActionAbility[ShipAction.COORDINATE] = {
  //  // Choose another friendly ship at Range 1-2. That ship may immediately perform one free action.
  //    condition: function(store, token)
  //    {
  //       return isActiveToken(store, token);
  //    },
  //    consequent: function(store, token, callback)
  //    {
  //       LOGGER.warn("ShipActionAbility Coordinate not yet implemented.");
  //       notifyEvent(store, token, callback, ShipAction.COORDINATE);
  //    },
  // };

  // ShipActionAbility[ShipAction.DECLOAK] = {
  //    // Spend a cloak token to decloak.
  //    condition: function(store, token)
  //    {
  //       return isActiveToken(store, token);
  //    },
  //    consequent: function(store, token, callback, context)
  //    {
  //       const maneuverKey = context.maneuverKey;
  //       const maneuverAction = new ManeuverAction(store, token.id(), maneuverKey);
  //       maneuverAction.doIt();
  //       store.dispatch(CardAction.addCloakCount(token, -1));
  //       notifyEvent(store, token, callback, ShipAction.DECLOAK);
  //    },
  // };

  ShipActionAbility[ShipAction.EVADE] = {
    // Assign one evade token to the ship.
    condition: (pilotId, state) => isActivePilot(pilotId, state),
    consequent: (pilotId, store) =>
      new Promise(resolve => {
        store.dispatch(ActionCreator$1.addPilotTokenCount(pilotId, Token$1.EVADE, 1));
        resolve(store);
      })
  };

  ShipActionAbility[ShipAction.FOCUS] = {
    // Assign one focus token to the ship.
    condition: (pilotId, state) => isActivePilot(pilotId, state),
    consequent: (pilotId, store) =>
      new Promise(resolve => {
        store.dispatch(ActionCreator$1.addPilotTokenCount(pilotId, Token$1.FOCUS, 1));
        resolve(store);
      })
  };

  // ShipActionAbility[ShipAction.JAM] = {
  //    // Choose one enemy ship at Range 1-2 and assign Stress tokens until the ship has 2 total
  //    // stress tokens.
  //    condition: function(store, token)
  //    {
  //       return isActiveToken(store, token);
  //    },
  //    consequent: function(store, token, callback, context)
  //    {
  //       const defender = context.defender;
  //       if (defender.stressCount() < 2)
  //       {
  //          defender.receiveStress();
  //       }
  //       if (defender.stressCount() < 2)
  //       {
  //          defender.receiveStress();
  //       }
  //       notifyEvent(store, token, callback, ShipAction.JAM);
  //    },
  // };

  // ShipActionAbility[ShipAction.RECOVER] = {
  //    // Remove all energy tokens from the corresponding ship card. For each energy token removed,
  //    // the ship recovers one shield, up to its maximum shield value.
  //    condition: function(store, token)
  //    {
  //       return isActiveToken(store, token);
  //    },
  //    consequent: function(store, token, callback)
  //    {
  //       LOGGER.warn("ShipActionAbility Recover not yet implemented.");
  //       notifyEvent(store, token, callback, ShipAction.RECOVER);
  //    },
  // };

  // ShipActionAbility[ShipAction.REINFORCE] = {
  //    // Choose either the fore or aft side of a double-sided reinforce token and place the token
  //    // with that side faceup near its ship token.
  //    condition: function(store, token)
  //    {
  //       return isActiveToken(store, token);
  //    },
  //    consequent: function(store, token, callback)
  //    {
  //       store.dispatch(CardAction.addReinforceCount(token));
  //       notifyEvent(store, token, callback, ShipAction.REINFORCE);
  //    },
  // };

  // ShipActionAbility[ShipAction.SLAM] = {
  //    // Perform a SLAM (SubLight Acceleration Motor) action.
  //    condition: function(store, token)
  //    {
  //       return isActiveToken(store, token);
  //    },
  //    consequent: function(store, token, callback, context)
  //    {
  //       const maneuverKey = context.maneuverKey;
  //       const maneuverAction = new ManeuverAction(store, token.id(), maneuverKey);
  //       maneuverAction.doIt();
  //       store.dispatch(CardAction.addWeaponsDisabledCount(token));
  //       notifyEvent(store, token, callback, ShipAction.SLAM);
  //    },
  // };

  // ShipActionAbility[ShipAction.TARGET_LOCK] = {
  //    // Acquire a target lock on an enemy ship.
  //    condition: function(store, token)
  //    {
  //       return isActiveToken(store, token);
  //    },
  //    consequent: function(store, attacker, callback, context)
  //    {
  //       const oldTargetLocks = TargetLock.getByAttacker(store, attacker);
  //       if (oldTargetLocks.length > 0)
  //       {
  //          oldTargetLocks[0].delete();
  //       }
  //       const defender = context.defender;
  //       TargetLock.newInstance(store, attacker, defender);
  //       notifyEvent(store, attacker, callback, ShipAction.TARGET_LOCK);
  //    },
  // };

  // //////////////////////////////////////////////////////////////////////
  // function getActiveToken(store)
  // {
  //    InputValidator.validateNotNull("store", store);
  //
  //    const environment = store.getState().environment;
  //
  //    return environment.activeCardInstance();
  // }

  // function isActiveToken(store, token)
  // {
  //    const activeToken = getActiveToken(store);
  //
  //    return token.equals(activeToken);
  // }
  //
  // ShipActionAbility.toString = function()
  // {
  //    return "model/ShipActionAbility";
  // };
  //
  // function notifyEvent(store, eventToken, eventCallback, shipActionKey)
  // {
  //    InputValidator.validateNotNull("store", store);
  //    InputValidator.validateNotNull("eventToken", eventToken);
  //    InputValidator.validateNotNull("eventCallback", eventCallback);
  //    InputValidator.validateNotNull("shipActionKey", shipActionKey);
  //
  //    // Issue event.
  //    const eventKey = Event.SHIP_ACTION_PERFORMED;
  //    const eventContext = {
  //       shipActionKey: shipActionKey,
  //    };
  //    store.dispatch(Action.enqueueEvent(eventKey, eventToken, eventCallback, eventContext));
  // }

  Object.freeze(ShipActionAbility);

  const { UpgradeCard } = XMA;

  const UpgradeAbility = {};

  // //////////////////////////////////////////////////////////////////////
  UpgradeAbility[UpgradeCard.R2_D2] = {
    condition: (/* pilotId, state */) => false,
    consequent: (pilotId, store) =>
      new Promise(resolve => {
        resolve(store);
      })
  };

  Object.freeze(UpgradeAbility);

  /* eslint no-console: ["error", { allow: ["error"] }] */

  const { ActionCreator: ActionCreator$2 } = XMS;

  const AbilityUtilities = {};

  const NAME_TO_TYPE = {
    ConditionCard: ConditionAbility,
    DamageCard: DamageAbility,
    DiceModification: ModifyDiceAbility,
    PilotCard: PilotAbility,
    ShipAction: ShipActionAbility,
    UpgradeCard: UpgradeAbility
  };

  AbilityUtilities.ability = (sourceName, sourceKey) => {
    const abilityType = NAME_TO_TYPE[sourceName];

    if (abilityType === undefined) {
      console.error(`Missing abilityType for sourceName: ${sourceName} sourceKey: ${sourceKey}`);
    }

    return abilityType[sourceKey];
  };

  AbilityUtilities.processAgentResponse = store => {
    const agentResponse = Selector.agentResponse(store.getState());
    const abilityState = agentResponse.payload.ability;

    if (abilityState !== undefined) {
      const abilityObject = AbilityUtilities.ability(abilityState.sourceName, abilityState.sourceKey);

      if (abilityObject !== undefined) {
        const { pilotId } = agentResponse.payload;
        abilityObject.consequent(pilotId, store);
      }
    }

    store.dispatch(ActionCreator$2.clearAgentResponse());
  };

  // //////////////////////////////////////////////////////////////////////////////
  Object.freeze(AbilityUtilities);

  const AgentQueryType = {
    CHOOSE_ATTACK_DICE_MODIFICATION: "chooseAttackDiceModification",
    CHOOSE_DEFENSE_DICE_MODIFICATION: "chooseDefenseDiceModification",
    CHOOSE_MANEUVERS: "chooseManeuvers",
    CHOOSE_SHIP_ACTION: "chooseShipAction",
    CHOOSE_WEAPON_AND_DEFENDER: "chooseWeaponAndDefender",
    NOTIFY_DAMAGE: "notifyDamage"
  };

  AgentQueryType.properties = {
    chooseAttackDiceModification: {
      name: "Choose Attack Dice Modification",
      key: "chooseAttackDiceModification"
    },
    chooseDefenseDiceModification: {
      name: "Choose Defense Dice Modification",
      key: "chooseDefenseDiceModification"
    },
    chooseManeuvers: {
      name: "Choose Maneuvers",
      key: "chooseManeuvers"
    },
    chooseShipAction: {
      name: "Choose Ship Action",
      key: "chooseShipAction"
    },
    chooseWeaponAndDefender: {
      name: "Choose Weapon and Defender",
      key: "chooseWeaponAndDefender"
    },
    notifyDamage: {
      name: "Notify Damage",
      key: "notifyDamage"
    }
  };

  Object.freeze(AgentQueryType);

  /* eslint no-underscore-dangle: ["error", { "allow": ["__"] }] */

  const { FiringArc } = XMA;

  const PilotUtilities = {};

  const isName = statKey => R.propEq("name", statKey);
  const isTypeStats = R.propEq("type", "stats");
  const isMatchingGrant = statKey => R.both(isTypeStats, isName(statKey));
  const findStatGrant = statKey => R.ifElse(R.isNil, R.identity, R.find(isMatchingGrant(statKey)));
  const statFromGrant = R.ifElse(R.isNil, R.identity, R.prop("value"));
  const isInRange = range => R.both(R.lte(range.minDistance), R.gte(range.maxDistance));
  const statGrantName = enumKey => XMA.Selector.stat(enumKey).grant;

  const baseStatFromPilot = statKey => pilotKey => R.prop(statKey, XMA.Selector.pilotCard(pilotKey));
  const baseStatFromShip = statKey => pilotKey =>
    R.prop(statKey, XMA.Selector.shipValueByPilot(pilotKey));
  const bonusStatFromGrants = statKey =>
    R.pipe(
      findStatGrant(statKey),
      statFromGrant
    );

  const computeBearing = position0 => position1 => {
    const dx = position1.x - position0.x;
    const dy = position1.y - position0.y;
    const angle = (Math.atan2(dy, dx) * 180.0) / Math.PI;

    return R.compose(
      PilotUtilities.normalizeAngle,
      R.subtract(R.__, position0.heading),
      Math.round
    )(angle);
  };

  const computeDistance = position0 => position1 => {
    const dx = position1.x - position0.x;
    const dy = position1.y - position0.y;

    return Math.sqrt(dx * dx + dy * dy);
  };

  const determineRange = distance => {
    let answer;
    const ranges = XMA.EnumUtilities.values(XMA.Range);
    const someFunction = range => {
      answer = isInRange(range)(distance) ? range.key : undefined;
      return answer !== undefined;
    };
    ranges.some(someFunction);

    return answer;
  };

  const reduceStat = upgradeKeys => (accumulator, enumKey) =>
    R.assoc(enumKey, PilotUtilities.bonusStat(statGrantName(enumKey), upgradeKeys), accumulator);
  const sumStat = statKey => (accumulator, upgradeKey) => {
    const upgradeCard = XMA.Selector.upgradeCard(upgradeKey);
    const upgradeStat = R.defaultTo(
      bonusStatFromGrants(statKey)(upgradeCard.grants),
      R.prop(statKey, upgradeCard)
    );
    return accumulator + (upgradeStat !== undefined ? upgradeStat : 0);
  };

  // /////////////////////////////////////////////////////////////////////////////////////////////////
  PilotUtilities.baseStat = (statKey, pilotKey) =>
    R.defaultTo(baseStatFromShip(statKey)(pilotKey), baseStatFromPilot(statKey)(pilotKey));

  PilotUtilities.bonusStat = (statKey, upgradeKeys = []) =>
    statKey !== "attack" ? R.reduce(sumStat(statKey), 0)(upgradeKeys) : 0;

  PilotUtilities.createPilotToRange = (state, pilotId) => {
    const position0 = Selector.positionByPilot(pilotId, state);
    const pilotIds = Selector.pilotIds(state).filter(id => pilotId !== id);
    const myComputeDistance = computeDistance(position0);
    const reduceFunction = (accumulator, id) => {
      const position1 = Selector.positionByPilot(id, state);
      const rangeKey = R.compose(
        determineRange,
        myComputeDistance
      )(position1);
      return R.assoc(id, rangeKey, accumulator);
    };

    return pilotIds.reduce(reduceFunction, {});
  };

  PilotUtilities.createPilotToBearing = (state, pilotId) => {
    const position0 = Selector.positionByPilot(pilotId, state);
    const pilotIds = Selector.pilotIds(state).filter(id => pilotId !== id);
    const myComputeBearing = computeBearing(position0);
    const reduceFunction = (accumulator, id) => {
      const position1 = Selector.positionByPilot(id, state);
      const bearing = myComputeBearing(position1);
      return R.assoc(id, bearing, accumulator);
    };

    return pilotIds.reduce(reduceFunction, {});
  };

  PilotUtilities.createStatBonuses = (upgradeKeys = []) =>
    XMA.EnumUtilities.keys(XMA.Stat).reduce(reduceStat(upgradeKeys), {});

  PilotUtilities.isInFiringArc = (bearing, firingArcKey) => {
    let answer = false;
    const firingArc = XMA.Selector.firingArc(firingArcKey);

    switch (firingArcKey) {
      case FiringArc.AUXILIARY_180:
      case FiringArc.FRONT:
        answer = firingArc.minAngle <= bearing || bearing <= firingArc.maxAngle;
        break;
      case FiringArc.AUXILIARY_REAR:
      case FiringArc.TURRET:
        answer = firingArc.minAngle <= bearing && bearing <= firingArc.maxAngle;
        break;
      default:
        throw new Error(`Unknown firingArcKey: ${firingArcKey}`);
    }

    return answer;
  };

  PilotUtilities.normalizeAngle = angle => {
    let answer = angle;

    while (answer < 0) {
      answer += 360;
    }

    answer %= 360;

    return answer;
  };

  PilotUtilities.statValue = (statKey, pilotKey, upgradeKeys = []) =>
    R.add(PilotUtilities.baseStat(statKey, pilotKey), PilotUtilities.bonusStat(statKey, upgradeKeys));

  Object.freeze(PilotUtilities);

  const { Range: Range$1 } = XMA;

  const AgentUtilities = {};

  const PRIMARY_RANGES = [Range$1.ONE, Range$1.TWO, Range$1.THREE];

  const weaponRangeDefendersReduce = (
    squadId0,
    state,
    pilotToRange,
    pilotToBearing,
    firingArcKeys
  ) => ranges => (accum, pilotId) => {
    let accum2 = accum;
    const squadId = XMS.Selector.squadInstanceByPilot(pilotId, state).id;

    if (squadId !== squadId0) {
      const rangeKey = pilotToRange[pilotId];

      if (rangeKey !== undefined && ranges.includes(rangeKey)) {
        const bearing = pilotToBearing[pilotId];
        const isInFiringArc = firingArcKeys.some(firingArcKey =>
          PilotUtilities.isInFiringArc(bearing, firingArcKey)
        );

        if (isInFiringArc) {
          const myPilotIds = accum2[rangeKey];
          accum2 = R.assoc(
            rangeKey,
            myPilotIds === undefined ? [pilotId] : R.append(pilotId, myPilotIds),
            accum2
          );
        }
      }
    }

    return accum2;
  };

  // /////////////////////////////////////////////////////////////////////////////////////////////////
  AgentUtilities.determineValidAttackModifications = () => {
    const modificationKeys = XMA.Selector.enumKeys(XMA.DiceModification).filter(key =>
      key.startsWith("attack")
    );

    return modificationKeys;
  };

  AgentUtilities.determineValidDefenseModifications = () => {
    const modificationKeys = XMA.Selector.enumKeys(XMA.DiceModification).filter(key =>
      key.startsWith("defense")
    );

    return modificationKeys;
  };

  AgentUtilities.determineValidManeuvers = shipKey => {
    const maneuverKeys = XMA.Selector.maneuverKeysByShip(shipKey);

    // FIXME: filter maneuvers that take the ship out-of-bounds.

    return maneuverKeys;
  };

  AgentUtilities.determineValidShipActions = shipKey => {
    const shipActionKeys = XMA.Selector.shipActionKeysByShip(shipKey);

    // FIXME: filter ship actions that aren't valid.

    return shipActionKeys;
  };

  AgentUtilities.determineWeaponToRangeToDefenders = (pilotInstance, state) => {
    // Primary weapon.
    const pilotToRange = PilotUtilities.createPilotToRange(state, pilotInstance.id);
    const pilotToBearing = PilotUtilities.createPilotToBearing(state, pilotInstance.id);
    const ship = XMA.Selector.shipValueByPilot(pilotInstance.pilotKey);
    const firingArcKeys = XMA.Selector.firingArcKeysByShip(ship.key);
    const squadId = XMS.Selector.squadInstanceByPilot(pilotInstance.id, state).id;
    const myWeaponRangeDefendersReduce = weaponRangeDefendersReduce(
      squadId,
      state,
      pilotToRange,
      pilotToBearing,
      firingArcKeys
    );
    const pilotIds = R.map(id => parseInt(id, 10), Object.keys(pilotToRange));

    const rangeToDefenders0 = R.reduce(myWeaponRangeDefendersReduce(PRIMARY_RANGES), {}, pilotIds);

    const weaponToRangeToDefenders = {};

    if (Object.keys(rangeToDefenders0).length > 0) {
      weaponToRangeToDefenders.primary = rangeToDefenders0;
    }

    // Secondary weapons.
    const upgradeInstances = Selector.weaponUpgradeInstancesByPilot(pilotInstance.id, state);
    const upgradeForEach = upgradeInstance => {
      const rangesByUpgrade = XMA.Selector.rangesByUpgrade(upgradeInstance.upgradeKey);

      const rangeToDefenders = R.reduce(myWeaponRangeDefendersReduce(rangesByUpgrade), {}, pilotIds);

      if (Object.keys(rangeToDefenders).length > 0) {
        weaponToRangeToDefenders[upgradeInstance.upgradeKey] = rangeToDefenders;
      }
    };

    R.forEach(upgradeForEach, upgradeInstances);

    return weaponToRangeToDefenders;
  };

  Object.freeze(AgentUtilities);

  const PathUtilities = {};

  const pointsFromPath = path => (Immutable.isImmutable(path) ? path.asMutable() : path.slice());

  const round = (number, digits) => {
    // const factor = Math.pow(10.0, digits);
    const factor = 10.0 ** digits;

    return Math.round(factor * number) / factor;
  };

  // /////////////////////////////////////////////////////////////////////////////////////////////////
  PathUtilities.close = path => {
    const points = pointsFromPath(path);

    if (points.length >= 2) {
      points.push(points[0]);
      points.push(points[1]);
    }

    return Immutable(points);
  };

  PathUtilities.doPolygonsCollide = (polygon0, polygon1) => {
    let answer;
    const b0 = PathUtilities.boundingBox(polygon0);
    const b1 = PathUtilities.boundingBox(polygon1);

    if (
      (b1.maxX < b0.minX || b0.maxX < b1.minX) && // b1 is left or right of b0
      (b1.maxY < b0.minY || b0.maxY < b1.minY) // b1 is below or above b0
    ) {
      answer = false;
    } else {
      answer = false;
      const bb = b0.area < b1.area ? b0 : b1;

      // Check if any point in bb is in both polygon0 and polygon1.
      const startX = round(bb.minX, 0);
      const startY = round(bb.minY, 0);
      const endX = round(bb.maxX, 0);
      const endY = round(bb.maxY, 0);

      for (let y = startY; !answer && y <= endY; y += 1) {
        for (let x = startX; !answer && x <= endX; x += 1) {
          answer =
            PathUtilities.isPointInPolygon(x, y, polygon0) &&
            PathUtilities.isPointInPolygon(x, y, polygon1);
        }
      }
    }

    return answer;
  };

  PathUtilities.isPointInPolygon = (x, y, polygon) => {
    const wn = PathUtilities.determineWindingNumber(x, y, polygon);

    return wn % 2 !== 0;
  };

  PathUtilities.rectanglePath = (width, height) => {
    if (width < 0) {
      throw new Error(`width must be positive: ${width}`);
    }
    if (height < 0) {
      throw new Error(`height must be positive: ${height}`);
    }

    const x = -width / 2;
    const y = -height / 2;

    return PathUtilities.close([
      x + width,
      y, // forward port
      x + width,
      y + height, // forward starboard
      x,
      y + height, // aft starboard
      x,
      y // aft port
    ]);
  };

  /*
   * Rotate about the given point.
   */
  PathUtilities.rotate = (path, angle, centerX, centerY) => {
    const points = pointsFromPath(path);
    const cx = centerX || 0;
    const cy = centerY || 0;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    for (let i = 0; i < points.length; i += 2) {
      const x = points[i] - cx;
      const y = points[i + 1] - cy;

      points[i] = x * cos - y * sin + cx;
      points[i + 1] = x * sin + y * cos + cy;
    }

    return Immutable(points);
  };

  PathUtilities.translate = (path, dx, dy) => {
    const points = pointsFromPath(path);

    for (let i = 0; i < points.length; i += 2) {
      points[i] += dx;
      points[i + 1] = points[i + 1] + dy;
    }

    return Immutable(points);
  };

  // //////////////////////////////////////////////////////////////////////////////
  PathUtilities.boundingBox = path => {
    let answer;
    const points = pointsFromPath(path);

    if (points.length > 1) {
      let minX = points[0];
      let minY = points[1];
      let maxX = minX;
      let maxY = minY;

      for (let i = 2; i < points.length; i += 2) {
        const x = points[i];
        const y = points[i + 1];

        minX = Math.min(x, minX);
        minY = Math.min(y, minY);
        maxX = Math.max(x, maxX);
        maxY = Math.max(y, maxY);
      }

      answer = {
        minX,
        minY,
        maxX,
        maxY,
        area: (maxX - minX) * (maxY - minY)
      };
    }

    return Immutable(answer);
  };

  /*
   * winding number test for a point in a polygon
   *
   * Input: P = a point,
   *
   * V[] = vertex points of a polygon V[n+1] with V[n]=V[0]
   *
   * Return: wn = the winding number (=0 only when P is outside)
   */
  PathUtilities.determineWindingNumber = (x, y, polygon) => {
    let wn = 0; // the winding number counter
    const points = pointsFromPath(polygon);
    const n = points.length - 2;

    // loop through all edges of the polygon
    for (let i = 0; i < n; i += 2) {
      // edge from V[i] to V[i+1]
      if (points[i + 1] <= y) {
        // start y <= P.y
        if (points[i + 3] > y) {
          // an upward crossing
          if (
            PathUtilities.isLeft(points[i], points[i + 1], points[i + 2], points[i + 3], x, y) > 0
          ) {
            // P
            // left of edge
            wn += 1; // have a valid up intersect
          }
        }
      }
      // start y > P.y (no test needed)
      else if (points[i + 3] <= y) {
        // a downward crossing
        if (PathUtilities.isLeft(points[i], points[i + 1], points[i + 2], points[i + 3], x, y) < 0) {
          // P
          // right of edge
          wn -= 1; // have a valid down intersect
        }
      }
    }

    return wn;
  };

  /*
   * Tests if a point is Left|On|Right of an infinite line.
   *
   * Input: three points P0, P1, and P2
   *
   * Return:
   *
   * >0 for P2 left of the line through P0 and P1
   *
   * =0 for P2 on the line
   *
   * <0 for P2 right of the line
   *
   * See: Algorithm 1 <a href="http://geomalgorithms.com/a01-_area.html">"Area of Triangles and Polygons"</a>
   */
  PathUtilities.isLeft = (x0, y0, x1, y1, x2, y2) => (x1 - x0) * (y2 - y0) - (x2 - x0) * (y1 - y0);

  Object.freeze(PathUtilities);

  /*
   * Small ship base is 40mm x 40mm.
   * <p>Bearing straight, speed one maneuver is 40mm long. Other straight maneuvers are multiples of
   * this.</p>
   */

  const { Maneuver } = XMA;

  const ManeuverComputer = {};

  const computeHeading = (x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;

    const answer = Math.round((Math.atan2(dy, dx) * 180.0) / Math.PI);

    return PilotUtilities.normalizeAngle(answer);
  };

  const computeHeadingChange = maneuver => {
    let answer = 0.0;

    switch (maneuver.bearing) {
      case "Bank Left":
      case "Reverse Bank Left":
        answer = 360 - 45;
        break;
      case "Bank Right":
      case "Reverse Bank Right":
        answer = 45;
        break;
      case "Koiogran Turn":
      case "Tallon Roll Left":
      case "Tallon Roll Right":
        answer = 180;
        break;
      case "Reverse Straight":
      case "Straight":
        // Nothing to do.
        break;
      case "Segnor's Loop Left":
        answer = 135;
        break;
      case "Segnor's Loop Right":
        answer = 225;
        break;
      case "Turn Left":
        answer = 360 - 90;
        break;
      case "Turn Right":
        answer = 90;
        break;
      default:
        throw new Error(`Unknown bearing: ${maneuver.bearing}`);
    }

    return answer;
  };

  const isBank = maneuver =>
    [
      "Bank Left",
      "Bank Right",
      "Reverse Bank Left",
      "Reverse Bank Right",
      "Segnor's Loop Left",
      "Segnor's Loop Right"
    ].includes(maneuver.bearing);

  const isReverse = maneuver =>
    ["Reverse Bank Left", "Reverse Bank Right", "Reverse Straight"].includes(maneuver.bearing);

  const isRight = maneuver =>
    [
      "Bank Right",
      "Reverse Bank Right",
      "Segnor's Loop Right",
      "Tallon Roll Right",
      "Turn Right"
    ].includes(maneuver.bearing);

  const isStraight = maneuver =>
    ["Koiogran Turn", "Reverse Straight", "Straight"].includes(maneuver.bearing);

  const isTurn = maneuver =>
    ["Tallon Roll Left", "Tallon Roll Right", "Turn Left", "Turn Right"].includes(maneuver.bearing);

  const computeRadius = maneuver => {
    let answer = 0.0;

    if (isBank(maneuver)) {
      switch (maneuver.speed) {
        case 1:
          answer = 82.6;
          break;
        case 2:
          answer = 127.0;
          break;
        case 3:
          answer = 177.8;
          break;
        default:
          throw new Error(`Unknown speed: ${maneuver.speed}`);
      }
    } else if (isTurn(maneuver)) {
      switch (maneuver.speed) {
        case 1:
          answer = 34.3;
          break;
        case 2:
          answer = 62.2;
          break;
        case 3:
          answer = 88.9;
          break;
        default:
          throw new Error(`Unknown speed: ${maneuver.speed}`);
      }
    }

    return answer;
  };

  const round$1 = (number, digits) => {
    // const factor = Math.pow(10.0, digits);
    const factor = 10.0 ** digits;

    return Math.round(factor * number) / factor;
  };

  // /////////////////////////////////////////////////////////////////////////////////////////////////
  ManeuverComputer.computeFromPolygon = (fromPosition, shipBase) =>
    ManeuverComputer.computePolygon(shipBase, fromPosition.x, fromPosition.y, fromPosition.heading);

  ManeuverComputer.computePolygon = (shipBase, x, y, heading) => {
    let answer = PathUtilities.rectanglePath(shipBase.width, shipBase.height);

    answer = PathUtilities.rotate(answer, (heading * Math.PI) / 180);
    answer = PathUtilities.translate(answer, x, y);

    return answer;
  };

  ManeuverComputer.computeToPolygon = (maneuver, fromPosition, shipBase) => {
    const toPosition = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

    let answer;

    if (toPosition) {
      answer = ManeuverComputer.computePolygon(
        shipBase,
        toPosition.x,
        toPosition.y,
        toPosition.heading
      );
    }

    return answer;
  };

  ManeuverComputer.computePath = (maneuver, fromPosition, shipBase) => {
    const { speed } = maneuver;
    let answer = [];

    // Initial point.
    answer.push(0.0, 0.0);

    // First segment: move base center.
    const baseSize = shipBase.height / 2.0;
    let last;
    let lastX;
    let lastY;
    let x;
    let y;
    let factor;

    if (maneuver.key !== Maneuver.STATIONARY_0_HARD_0OR) {
      x = baseSize;
      answer.push(x, 0.0);
      lastX = x;
      lastY = 0.0;
    }

    if (speed !== 0) {
      // Middle segments: follow the arc.
      if (isStraight(maneuver)) {
        x = lastX;
        for (let i = 0; i < speed; i += 1) {
          x += 40;
          answer.push(x, 0.0);
        }
        lastX = x;
      } else if (isBank(maneuver)) {
        last = ManeuverComputer.addSegments(maneuver, answer, lastX, 45, 3 + speed);
        lastX = last.x;
        lastY = last.y;
      } else if (isTurn(maneuver)) {
        last = ManeuverComputer.addSegments(maneuver, answer, lastX, 90, 5 + speed);
        lastX = last.x;
        lastY = last.y;
      }

      // Last segment: move base center.
      if (isStraight(maneuver)) {
        x = baseSize + lastX;
        answer.push(x, 0.0);
      } else if (isBank(maneuver)) {
        factor = isRight(maneuver) ? 1.0 : -1.0;
        x = baseSize * Math.cos(Math.PI / 4.0) + lastX;
        y = factor * baseSize * Math.cos(Math.PI / 4.0) + lastY;
        answer.push(x, y);
      } else if (isTurn(maneuver)) {
        factor = isRight(maneuver) ? 1.0 : -1.0;
        y = factor * baseSize + lastY;
        answer.push(lastX, y);
      }
    }

    // Rotate and translate to fromPosition.
    const angle = (fromPosition.heading * Math.PI) / 180;
    answer = PathUtilities.rotate(answer, angle);
    answer = PathUtilities.translate(answer, fromPosition.x, fromPosition.y);

    return answer;
  };

  ManeuverComputer.computeToPosition = (maneuver, fromPosition, shipBase) => {
    let answer;

    if ([Maneuver.STATIONARY_0_HARD_0OR].includes(maneuver.key)) {
      answer = fromPosition;
    } else if (isStraight(maneuver)) {
      answer = ManeuverComputer.computeToPositionStraight(maneuver, fromPosition, shipBase);
    } else if (isBank(maneuver)) {
      answer = ManeuverComputer.computeToPositionBank(maneuver, fromPosition, shipBase);
    } else if (isTurn(maneuver)) {
      answer = ManeuverComputer.computeToPositionTurn(maneuver, fromPosition, shipBase);
    } else {
      throw new Error(`Unknown maneuver: ${maneuver.key}`);
    }

    return answer;
  };

  ManeuverComputer.findCollision = (shipDataMap, token) => {
    const shipData0 = shipDataMap[token];
    const polygon0 = shipData0.polygon;
    let answer;

    if (polygon0 !== undefined) {
      const keys = Object.keys(shipDataMap);

      for (let i = 0; i < keys.length; i += 1) {
        const shipData1 = shipDataMap[keys[i]];

        if (shipData0 !== shipData1) {
          const polygon1 = shipData1.polygon;

          if (polygon1 !== undefined && PathUtilities.doPolygonsCollide(polygon0, polygon1)) {
            answer = shipData1;
            break;
          }
        }
      }
    }

    return answer;
  };

  ManeuverComputer.addSegments = (maneuver, path, lastX, heading, segmentCount) => {
    const radius = computeRadius(maneuver);

    const factor = isRight(maneuver) ? 1.0 : -1.0;
    const deltaAngle = (heading * Math.PI) / 180 / segmentCount;

    let myLastX = lastX;
    let myLastY = 0.0;

    for (let i = 1; i <= segmentCount; i += 1) {
      const angle = deltaAngle * i;
      const x = lastX + radius * Math.sin(angle);
      const y = factor * radius * (1.0 - Math.cos(angle));
      path.push(x, y);
      myLastX = x;
      myLastY = y;
    }

    const answer = {};
    answer.x = Math.round(myLastX);
    answer.y = Math.round(myLastY);
    return answer;
  };

  ManeuverComputer.computeToPositionBank = (maneuver, fromPosition, shipBase) => {
    const headingChange = computeHeadingChange(maneuver);
    const baseSize = shipBase.height / 2;
    const radius = computeRadius(maneuver);

    // Half base.
    const speedFactor = isReverse(maneuver) ? -1 : 1;
    const x1 = speedFactor * baseSize;
    const y1 = 0.0;

    // Curve.
    const factor = isRight(maneuver) ? 1.0 : -1.0;
    const angle = (factor * 45.0 * Math.PI) / 180.0;
    const x2 = speedFactor * radius * Math.cos(angle);
    const y2 = speedFactor * factor * radius * (1.0 - Math.sin(angle) * factor);

    // Half base.
    const x3 = speedFactor * baseSize * Math.cos(angle);
    const y3 = speedFactor * baseSize * Math.sin(angle);

    const dx = x1 + x2 + x3;
    const dy = y1 + y2 + y3;

    return ManeuverComputer.createPosition(fromPosition, dx, dy, headingChange);
  };

  ManeuverComputer.computeToPositionStraight = (maneuver, fromPosition, shipBase) => {
    const baseSize = shipBase.height / 2;
    const { speed } = maneuver;
    const speedFactor = isReverse(maneuver) ? -1 : 1;
    const dx = 2 * speedFactor * baseSize + 40 * speedFactor * speed;
    const dy = 0;
    const headingChange = computeHeadingChange(maneuver);

    return ManeuverComputer.createPosition(fromPosition, dx, dy, headingChange);
  };

  ManeuverComputer.computeToPositionTurn = (maneuver, fromPosition, shipBase) => {
    const baseSize = shipBase.height / 2;
    const radius = computeRadius(maneuver);
    const headingChange = computeHeadingChange(maneuver);

    // Half base.
    const x1 = baseSize;
    const y1 = 0.0;

    // Curve.
    const factor = isRight(maneuver) ? 1.0 : -1.0;
    const angle = (factor * 90.0 * Math.PI) / 180.0;
    const x2 = radius;
    const y2 = factor * radius;

    // Half base.
    const x3 = baseSize * Math.cos(angle);
    const y3 = baseSize * Math.sin(angle);

    const dx = x1 + x2 + x3;
    const dy = y1 + y2 + y3;

    return ManeuverComputer.createPosition(fromPosition, dx, dy, headingChange);
  };

  ManeuverComputer.createPosition = (fromPosition, dx, dy, headingChange) => {
    const x0 = fromPosition.x;
    const y0 = fromPosition.y;
    const angle = (fromPosition.heading * Math.PI) / 180;

    const x = Math.round(x0 + dx * Math.cos(angle) - dy * Math.sin(angle));
    const y = Math.round(y0 + dx * Math.sin(angle) + dy * Math.cos(angle));
    const heading = fromPosition.heading + headingChange;

    return XMS.PositionState.create({
      x,
      y,
      heading
    });
  };

  /*
   * @param x0 Non-collision X coordinate.
   *
   * @param y0 Non-collision Y coordinate.
   *
   * @param x1 Collision X coordinate.
   *
   * @param y1 Collision Y coordinate.
   *
   * @param polygon1 Colliding area.
   *
   * @return the closest non-collision point.
   */
  ManeuverComputer.interpolate = (x0, y0, x1, y1, polygon1, shipBase) => {
    let answer;

    // Calculate the midpoint.
    const t = 0.5;
    let x01 = x0 + t * (x1 - x0);
    let y01 = y0 + t * (y1 - y0);
    let heading;

    if (
      (round$1(x0 - x01, 0) === 0 && round$1(y0 - y01, 0) === 0) ||
      (round$1(x01 - x1, 0) === 0 && round$1(y01 - y1, 0) === 0)
    ) {
      heading = computeHeading(x0, y0, x1, y1);
      answer = XMS.PositionState.create({
        x: round$1(x0, 0),
        y: round$1(y0, 0),
        heading
      });
    } else {
      const heading01 = computeHeading(x0, y0, x01, y01);
      const polygon01 = ManeuverComputer.computePolygon(
        shipBase,
        round$1(x01, 0),
        round$1(y01, 0),
        heading01
      );

      if (PathUtilities.doPolygonsCollide(polygon01, polygon1)) {
        x01 = x0 + t * (x01 - x0);
        y01 = y0 + t * (y01 - y0);
        answer = ManeuverComputer.interpolate(x0, y0, x01, y01, polygon1, shipBase);
      } else {
        x01 += t * (x1 - x01);
        y01 += t * (y1 - y01);
        answer = ManeuverComputer.interpolate(x01, y01, x1, y1, polygon1, shipBase);
      }
    }

    if (answer === undefined) {
      heading = computeHeading(x0, y0, x1, y1);
      answer = XMS.PositionState.create({
        x: parseInt(x1, 10),
        y: parseInt(y1, 10),
        heading
      });
    }

    return answer;
  };

  if (Object.freeze) {
    Object.freeze(ManeuverComputer);
  }

  const { ActionCreator: ActionCreator$3, Selector: Selector$1 } = XMS;

  const TaskUtilities = {};

  TaskUtilities.processPhase = ({
    phaseKey,
    processFunction,
    responseKey,
    responseFunction
  }) => store =>
    new Promise((resolve, reject) => {
      const agentQuery = Selector$1.agentQuery(store.getState());
      const agentResponse = Selector$1.agentResponse(store.getState());

      if (agentQuery !== undefined) {
        reject(
          new Error(
            `Received agentQuery for phaseKey: ${phaseKey}\nagentQuery = ${JSON.stringify(
            agentQuery,
            null,
            "   "
          )}`
          )
        );
      } else if (agentResponse !== undefined && agentResponse.responseKey === responseKey) {
        if (responseFunction !== undefined) {
          responseFunction(store);
          store.dispatch(ActionCreator$3.clearAgentResponse());
          resolve(store);
        } else {
          reject(new Error(`Missing responseFunction for phaseKey: ${phaseKey}`));
        }
      } else if (processFunction !== undefined) {
        processFunction(store);
        resolve(store);
      } else {
        reject(new Error(`Missing processFunction for phaseKey: ${phaseKey}`));
      }
    });

  Object.freeze(TaskUtilities);

  const { Phase, Token: Token$2 } = XMA;

  const { ActionCreator: ActionCreator$4 } = XMS;

  const ActivationTask = {};
  const PHASE_TO_CONFIG = {};

  const DIFFICULTY_TO_COLOR = {
    Easy: "rgb(0, 255, 0)",
    Hard: "red"
  };

  const comparator = R.comparator((a, b) => {
    const pilotSkillA = PilotUtilities.statValue(
      "skill",
      a.pilotKey,
      Selector.upgradeInstancesByPilot(a.id)
    );
    const pilotSkillB = PilotUtilities.statValue(
      "skill",
      b.pilotKey,
      Selector.upgradeInstancesByPilot(b.id)
    );

    // FIXME: sort same pilot skill by initiative
    return pilotSkillA < pilotSkillB;
  });

  const setActivationQueue = store => {
    const pilots = Selector.pilotInstances(store.getState());
    const queue = R.sort(comparator, pilots).map(pilot => pilot.id);
    store.dispatch(ActionCreator$4.setActivationQueue(queue));
  };

  const setPhase = (store, phaseKey) => store.dispatch(ActionCreator$4.setPhase(phaseKey));

  const start = store =>
    new Promise(resolve => {
      setActivationQueue(store);
      setPhase(store, Phase.ACTIVATION_REVEAL_DIAL);

      resolve(store);
    });

  const end = store =>
    new Promise(resolve => {
      store.dispatch(ActionCreator$4.clearDisplayManeuver());
      setPhase(store, Phase.COMBAT_START);

      resolve(store);
    });

  // /////////////////////////////////////////////////////////////////////////////////////////////////
  ActivationTask.doIt = store => {
    let answer;
    let config;
    const phaseKey = Selector.phaseKey(store.getState());

    switch (phaseKey) {
      case Phase.ACTIVATION_START:
        answer = start(store);
        break;
      case Phase.ACTIVATION_END:
        answer = end(store);
        break;
      default:
        config = PHASE_TO_CONFIG[phaseKey];
        answer = TaskUtilities.processPhase({
          phaseKey,
          processFunction: config.processFunction,
          responseKey: config.responseKey,
          responseFunction: config.responseFunction
        })(store);
    }

    return answer;
  };

  // //////////////////////////////////////////////////////////////////////////////
  PHASE_TO_CONFIG[Phase.ACTIVATION_REVEAL_DIAL] = {
    processFunction: store => {
      const activationQueue = Selector.activationQueue(store.getState());

      if (activationQueue.length > 0) {
        store.dispatch(ActionCreator$4.dequeueActivation());

        setPhase(store, Phase.ACTIVATION_SET_TEMPLATE);
      } else {
        store.dispatch(ActionCreator$4.clearActivePilotId());
        store.dispatch(ActionCreator$4.setPhase(Phase.ACTIVATION_END));
      }
    }
  };

  PHASE_TO_CONFIG[Phase.ACTIVATION_SET_TEMPLATE] = {
    processFunction: store => {
      setPhase(store, Phase.ACTIVATION_EXECUTE_MANEUVER);
    }
  };

  PHASE_TO_CONFIG[Phase.ACTIVATION_EXECUTE_MANEUVER] = {
    processFunction: store => {
      const pilotId = Selector.activePilotId(store.getState());
      const maneuverKey = Selector.maneuverByPilot(pilotId, store.getState());
      const maneuver = XMA.Selector.maneuver(maneuverKey);
      const fromPosition = Selector.positionByPilot(pilotId, store.getState());
      const shipBase = Selector.shipBaseValueByPilot(pilotId, store.getState());
      const toPosition = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);
      store.dispatch(ActionCreator$4.movePilot(pilotId, toPosition));
      const color = R.defaultTo("white", R.prop(maneuver.difficulty, DIFFICULTY_TO_COLOR));
      store.dispatch(
        ActionCreator$4.setDisplayManeuver(
          XMS.ManeuverState.create({
            color,
            fromPolygon: ManeuverComputer.computeFromPolygon(fromPosition, shipBase),
            fromPosition,
            path: ManeuverComputer.computePath(maneuver, fromPosition, shipBase),
            toPolygon: ManeuverComputer.computeToPolygon(maneuver, fromPosition, shipBase)
          })
        )
      );
      setPhase(store, Phase.ACTIVATION_CHECK_PILOT_STRESS);
    }
  };

  PHASE_TO_CONFIG[Phase.ACTIVATION_CHECK_PILOT_STRESS] = {
    processFunction: store => {
      const pilotId = Selector.activePilotId(store.getState());
      const maneuverKey = Selector.maneuverByPilot(pilotId, store.getState());
      const maneuver = XMA.Selector.maneuver(maneuverKey);
      const { difficulty } = maneuver;

      if (difficulty === "Easy") {
        const stressCount = Selector.countByPilotToken(pilotId, Token$2.STRESS, store.getState());

        if (stressCount > 0) {
          store.dispatch(ActionCreator$4.addPilotTokenCount(pilotId, Token$2.STRESS, -1));
        }
      } else if (difficulty === "Hard") {
        store.dispatch(ActionCreator$4.addPilotTokenCount(pilotId, Token$2.STRESS, 1));
      }
      setPhase(store, Phase.ACTIVATION_CLEAN_UP);
    }
  };

  PHASE_TO_CONFIG[Phase.ACTIVATION_CLEAN_UP] = {
    processFunction: store => {
      setPhase(store, Phase.ACTIVATION_PERFORM_ACTION);
    }
  };

  PHASE_TO_CONFIG[Phase.ACTIVATION_PERFORM_ACTION] = {
    processFunction: store => {
      const pilotId = Selector.activePilotId(store.getState());
      const agent = Selector.agentInstanceByPilot(pilotId, store.getState());
      const ship = Selector.shipByPilot(pilotId, store.getState());
      const shipActionKeys = AgentUtilities.determineValidShipActions(ship.key);
      const reduceFunction = (accum, key) => {
        const ability = AbilityUtilities.ability("ShipAction", key);

        if (ability !== undefined && ability.condition(pilotId, store.getState())) {
          accum.push(
            XMS.AbilityState.create({
              sourceName: "ShipAction",
              sourceKey: key
            })
          );
        }

        return accum;
      };
      const abilities = R.reduce(reduceFunction, [], shipActionKeys);

      const agentQuery = XMS.AgentQueryState.create({
        agentId: agent.id,
        queryKey: AgentQueryType.CHOOSE_SHIP_ACTION,
        payload: {
          pilotId,
          abilities
        }
      });
      store.dispatch(ActionCreator$4.setAgentQuery(agentQuery));
    },
    responseKey: AgentQueryType.CHOOSE_SHIP_ACTION,
    responseFunction: store => {
      AbilityUtilities.processAgentResponse(store);
      setPhase(store, Phase.ACTIVATION_REVEAL_DIAL);
    }
  };

  Object.freeze(ActivationTask);

  const { AttackDiceValue: AttackDiceValue$2, DefenseDiceValue: DefenseDiceValue$2, Phase: Phase$1, Token: Token$3 } = XMA;

  const { ActionCreator: ActionCreator$5 } = XMS;

  const CombatTask = {};

  const PHASE_TO_CONFIG$1 = {};

  // /////////////////////////////////////////////////////////////////////////////////////////////////
  const comparator$1 = R.comparator((a, b) => {
    const pilotSkillA = PilotUtilities.statValue(
      "skill",
      a.pilotKey,
      Selector.upgradeInstancesByPilot(a.id)
    );
    const pilotSkillB = PilotUtilities.statValue(
      "skill",
      b.pilotKey,
      Selector.upgradeInstancesByPilot(b.id)
    );

    // FIXME: sort same pilot skill by initiative
    return pilotSkillA > pilotSkillB;
  });

  const setPhase$1 = (store, phaseKey) => store.dispatch(ActionCreator$5.setPhase(phaseKey));

  const setCombatQueue = store => {
    const pilots = Selector.pilotInstances(store.getState());
    const queue = R.sort(comparator$1, pilots).map(pilot => pilot.id);
    store.dispatch(ActionCreator$5.setCombatQueue(queue));
  };

  const start$1 = store =>
    new Promise(resolve => {
      setCombatQueue(store);
      setPhase$1(store, Phase$1.COMBAT_DECLARE_TARGET);

      resolve(store);
    });

  const end$1 = store =>
    new Promise(resolve => {
      setPhase$1(store, Phase$1.END_START);
      resolve(store);
    });

  // /////////////////////////////////////////////////////////////////////////////////////////////////
  CombatTask.doIt = store => {
    let answer;
    let config;
    const phaseKey = Selector.phaseKey(store.getState());

    switch (phaseKey) {
      case Phase$1.COMBAT_START:
        answer = start$1(store);
        break;
      case Phase$1.COMBAT_END:
        answer = end$1(store);
        break;
      default:
        config = PHASE_TO_CONFIG$1[phaseKey];
        answer = TaskUtilities.processPhase({
          phaseKey,
          responseKey: config.responseKey,
          responseFunction: config.responseFunction,
          processFunction: config.processFunction
        })(store);
    }

    return answer;
  };

  // /////////////////////////////////////////////////////////////////////////////////////////////////
  PHASE_TO_CONFIG$1[Phase$1.COMBAT_DECLARE_TARGET] = {
    processFunction: store => {
      const combatQueue = Selector.combatQueue(store.getState());

      if (combatQueue.length > 0) {
        store.dispatch(ActionCreator$5.dequeueCombat());
        const activePilotId = Selector.activePilotId(store.getState());
        const agent = Selector.agentInstanceByPilot(activePilotId, store.getState());
        const pilot = Selector.pilotInstance(activePilotId, store.getState());
        const weaponToRangeToDefenders = AgentUtilities.determineWeaponToRangeToDefenders(
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
        store.dispatch(ActionCreator$5.setAgentQuery(agentQuery));
      } else {
        store.dispatch(ActionCreator$5.clearActivePilotId());
        setPhase$1(store, Phase$1.COMBAT_END);
      }
    },
    responseKey: AgentQueryType.CHOOSE_WEAPON_AND_DEFENDER,
    responseFunction: store => {
      const agentResponse = Selector.agentResponse(store.getState());
      const { attackerId, defenderId, rangeKey, weaponKey } = agentResponse.payload;

      if (defenderId !== undefined) {
        const combatId = XMS.Selector.nextCombatId(store.getState());
        store.dispatch(ActionCreator$5.setActiveCombatId(combatId));

        const combatInstance = XMS.CombatState.create({
          id: combatId,
          attackerId,
          defenderId,
          rangeKey,
          weaponKey
        });
        store.dispatch(ActionCreator$5.setCombatInstance(combatInstance));

        const attackerFaction = Selector.factionValueByPilot(attackerId, store.getState());
        const attackerPosition = Selector.positionByPilot(attackerId, store.getState());
        const defenderPosition = Selector.positionByPilot(defenderId, store.getState());
        const laserBeam = XMS.LaserBeamState.create({
          color: attackerFaction.color,
          fromPosition: attackerPosition,
          isPrimary: weaponKey === "primary",
          toPosition: defenderPosition
        });
        store.dispatch(ActionCreator$5.setDisplayLaserBeam(laserBeam));
        setPhase$1(store, Phase$1.COMBAT_ROLL_ATTACK_DICE);
      } else {
        // No attack.
        setPhase$1(store, Phase$1.COMBAT_DECLARE_TARGET);
      }

      store.dispatch(ActionCreator$5.clearAgentResponse());
    }
  };

  PHASE_TO_CONFIG$1[Phase$1.COMBAT_ROLL_ATTACK_DICE] = {
    processFunction: store => {
      if (store.getState().displayLaserBeam !== undefined) {
        store.dispatch(ActionCreator$5.clearDisplayLaserBeam());
      }

      const combatId = Selector.activeCombatId(store.getState());
      const diceCount = DiceUtilities.computeAttackDiceCount(combatId, store.getState());
      const attackDice = DiceUtilities.rollAttackDice(diceCount);
      store.dispatch(ActionCreator$5.setCombatAttackDice(combatId, attackDice));
      store.dispatch(ActionCreator$5.setPhase(Phase$1.COMBAT_MODIFY_ATTACK_DICE));
    }
  };

  PHASE_TO_CONFIG$1[Phase$1.COMBAT_MODIFY_ATTACK_DICE] = {
    processFunction: store => {
      const activePilotId = Selector.activePilotId(store.getState());
      const agent = Selector.agentInstanceByPilot(activePilotId, store.getState());
      const combatId = Selector.activeCombatId(store.getState());
      const modificationKeys = AgentUtilities.determineValidAttackModifications();
      const reduceFunction = (accum, key) => {
        const ability = AbilityUtilities.ability("DiceModification", key);
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
      store.dispatch(ActionCreator$5.setAgentQuery(agentQuery));
    },
    responseKey: AgentQueryType.CHOOSE_ATTACK_DICE_MODIFICATION,
    responseFunction: store => {
      AbilityUtilities.processAgentResponse(store);
      store.dispatch(ActionCreator$5.setPhase(Phase$1.COMBAT_ROLL_DEFENSE_DICE));
    }
  };

  PHASE_TO_CONFIG$1[Phase$1.COMBAT_ROLL_DEFENSE_DICE] = {
    processFunction: store => {
      const combatId = Selector.activeCombatId(store.getState());
      const diceCount = DiceUtilities.computeDefenseDiceCount(combatId, store.getState());
      const defenseDice = DiceUtilities.rollDefenseDice(diceCount);
      store.dispatch(ActionCreator$5.setCombatDefenseDice(combatId, defenseDice));
      store.dispatch(ActionCreator$5.setPhase(Phase$1.COMBAT_MODIFY_DEFENSE_DICE));
    }
  };

  PHASE_TO_CONFIG$1[Phase$1.COMBAT_MODIFY_DEFENSE_DICE] = {
    processFunction: store => {
      const activePilotId = Selector.activePilotId(store.getState());
      const agent = Selector.agentInstanceByPilot(activePilotId, store.getState());
      const combatId = Selector.activeCombatId(store.getState());
      const modificationKeys = AgentUtilities.determineValidDefenseModifications();
      const reduceFunction = (accum, key) => {
        const ability = AbilityUtilities.ability("DiceModification", key);
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
      store.dispatch(ActionCreator$5.setAgentQuery(agentQuery));
    },
    responseKey: AgentQueryType.CHOOSE_DEFENSE_DICE_MODIFICATION,
    responseFunction: store => {
      AbilityUtilities.processAgentResponse(store);
      setPhase$1(store, Phase$1.COMBAT_COMPARE_RESULTS);
    }
  };

  PHASE_TO_CONFIG$1[Phase$1.COMBAT_COMPARE_RESULTS] = {
    processFunction: store => {
      const combatId = Selector.activeCombatId(store.getState());
      let hits = Selector.attackDiceValueCount(combatId, AttackDiceValue$2.HIT, store.getState());
      let criticals = Selector.attackDiceValueCount(
        combatId,
        AttackDiceValue$2.CRITICAL_HIT,
        store.getState()
      );
      let evades = Selector.defenseDiceValueCount(combatId, DefenseDiceValue$2.EVADE, store.getState());

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
        store.dispatch(ActionCreator$5.addPilotTokenCount(defenderId, Token$3.SHIELD, -count));
      }

      if (Selector.shieldByPilot(defenderId, store.getState()) > 0) {
        const count = Math.min(criticals, Selector.shieldByPilot(defenderId, store.getState()));
        criticals -= count;
        shieldDamage += count;
        store.dispatch(ActionCreator$5.addPilotTokenCount(defenderId, Token$3.SHIELD, -count));
      }

      store.dispatch(ActionCreator$5.setCombatShieldDamage(combatId, shieldDamage));
      store.dispatch(ActionCreator$5.setCombatHitDamage(combatId, hits));
      store.dispatch(ActionCreator$5.setCombatCriticalDamage(combatId, criticals));
      setPhase$1(store, Phase$1.COMBAT_NOTIFY_DAMAGE);
    }
  };

  PHASE_TO_CONFIG$1[Phase$1.COMBAT_NOTIFY_DAMAGE] = {
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
      store.dispatch(ActionCreator$5.setAgentQuery(agentQuery));
    },
    responseKey: AgentQueryType.NOTIFY_DAMAGE,
    responseFunction: store => {
      // FIXME: process agent response
      store.dispatch(ActionCreator$5.clearAgentResponse());
      store.dispatch(ActionCreator$5.setPhase(Phase$1.COMBAT_DEAL_DAMAGE));
    }
  };

  PHASE_TO_CONFIG$1[Phase$1.COMBAT_DEAL_DAMAGE] = {
    processFunction: store => {
      const combatId = Selector.activeCombatId(store.getState());
      const combatInstance = Selector.combatInstance(combatId, store.getState());
      const { defenderId } = combatInstance;
      const hits = combatInstance.hitDamage;
      const criticals = combatInstance.criticalDamage;

      for (let i = 0; i < hits; i += 1) {
        store.dispatch(ActionCreator$5.dealDamage(defenderId));
      }

      for (let i = 0; i < criticals; i += 1) {
        store.dispatch(ActionCreator$5.dealCritical(defenderId));
      }

      // Next pilot.
      setPhase$1(store, Phase$1.COMBAT_DECLARE_TARGET);
    }
  };

  Object.freeze(CombatTask);

  const DamageDeck = {};

  const createDamage = (id, damageKey) =>
    XMS.DamageState.create({
      id,
      damageKey
    });

  DamageDeck.create = (enumClass = XMA.DamageCard) => {
    // There are two of each, except seven of Direct Hit!
    const keys = XMA.EnumUtilities.keys(enumClass);
    let count = 1;

    const damageInstances = keys.reduce((accumulator, damageKey) => {
      accumulator[count] = createDamage(count, damageKey);
      count += 1;
      accumulator[count] = createDamage(count, damageKey);
      count += 1;
      return accumulator;
    }, {});

    for (let i = 0; i < 5; i += 1) {
      damageInstances[count] = createDamage(count, enumClass.DIRECT_HIT);
      count += 1;
    }

    const answer = Object.values(damageInstances).map(damage => damage.id);

    // Shuffle.
    answer.sort(() => Math.random() - 0.5);

    return {
      damageInstances,
      damageDeck: answer
    };
  };

  Object.freeze(DamageDeck);

  const { Phase: Phase$2, Token: Token$4 } = XMA;

  const { ActionCreator: ActionCreator$6 } = XMS;

  const EndTask = {};
  const PHASE_TO_CONFIG$2 = {};

  const setPhase$2 = (store, phaseKey) => store.dispatch(ActionCreator$6.setPhase(phaseKey));

  const start$2 = store =>
    new Promise(resolve => {
      setPhase$2(store, Phase$2.END_CLEAN_UP);
      resolve(store);
    });

  const end$2 = store =>
    new Promise(resolve => {
      setPhase$2(store, Phase$2.PLANNING_START);
      resolve(store);
    });

  // /////////////////////////////////////////////////////////////////////////////////////////////////
  EndTask.doIt = store => {
    let answer;
    let config;
    const phaseKey = Selector.phaseKey(store.getState());

    switch (phaseKey) {
      case Phase$2.END_START:
        answer = start$2(store);
        break;
      case Phase$2.END_END:
        answer = end$2(store);
        break;
      default:
        config = PHASE_TO_CONFIG$2[phaseKey];
        answer = TaskUtilities.processPhase({
          phaseKey,
          responseKey: config.responseKey,
          responseFunction: config.responseFunction,
          processFunction: config.processFunction
        })(store);
    }

    return answer;
  };

  // //////////////////////////////////////////////////////////////////////////////
  PHASE_TO_CONFIG$2[Phase$2.END_CLEAN_UP] = {
    processFunction: store => {
      const pilotIds = Selector.pilotIds(store.getState()).sort();
      store.dispatch(ActionCreator$6.setEndQueue(pilotIds));

      while (Selector.endQueue(store.getState()).length > 0) {
        store.dispatch(ActionCreator$6.dequeueEnd());
        const pilotId = Selector.activePilotId(store.getState());
        store.dispatch(ActionCreator$6.clearPilotTokenCount(pilotId, Token$4.EVADE));
        store.dispatch(ActionCreator$6.clearPilotTokenCount(pilotId, Token$4.FOCUS));
        store.dispatch(ActionCreator$6.clearPilotTokenCount(pilotId, Token$4.REINFORCE));
        store.dispatch(ActionCreator$6.clearPilotTokenCount(pilotId, Token$4.TRACTOR_BEAM));
        store.dispatch(ActionCreator$6.clearPilotTokenCount(pilotId, Token$4.WEAPONS_DISABLED));
      }

      setPhase$2(store, Phase$2.END_ROUND_END);
    }
  };

  PHASE_TO_CONFIG$2[Phase$2.END_ROUND_END] = {
    processFunction: store => {
      setPhase$2(store, Phase$2.END_END);
    }
  };

  Object.freeze(EndTask);

  const { Phase: Phase$3 } = XMA;

  const { ActionCreator: ActionCreator$7 } = XMS;

  const PlanningTask = {};
  const PHASE_TO_CONFIG$3 = {};

  const setPhase$3 = (store, phaseKey) => store.dispatch(ActionCreator$7.setPhase(phaseKey));

  const setPlanningQueue = store => {
    const agents = Selector.agentInstances(store.getState());
    const queue = R.map(agent => agent.id, agents);
    store.dispatch(ActionCreator$7.setPlanningQueue(queue));
  };

  const start$3 = store =>
    new Promise(resolve => {
      store.dispatch(ActionCreator$7.incrementRound());
      setPlanningQueue(store);
      setPhase$3(store, Phase$3.PLANNING);

      resolve(store);
    });

  const end$3 = store =>
    new Promise(resolve => {
      setPhase$3(store, Phase$3.ACTIVATION_START);

      resolve(store);
    });

  // /////////////////////////////////////////////////////////////////////////////////////////////////
  PlanningTask.doIt = store => {
    let answer;
    let config;
    const phaseKey = Selector.phaseKey(store.getState());

    switch (phaseKey) {
      case Phase$3.PLANNING_START:
        answer = start$3(store);
        break;
      case Phase$3.PLANNING_END:
        answer = end$3(store);
        break;
      default:
        config = PHASE_TO_CONFIG$3[phaseKey];
        answer = TaskUtilities.processPhase({
          phaseKey,
          responseKey: config.responseKey,
          responseFunction: config.responseFunction,
          processFunction: config.processFunction
        })(store);
    }

    return answer;
  };

  // //////////////////////////////////////////////////////////////////////////////
  PHASE_TO_CONFIG$3[Phase$3.PLANNING] = {
    processFunction: store => {
      const planningQueue = Selector.planningQueue(store.getState());

      if (planningQueue.length > 0) {
        store.dispatch(ActionCreator$7.dequeuePlanning());
        const activeAgentId = Selector.activeAgentId(store.getState());
        const pilots = Selector.pilotInstancesByAgent(activeAgentId, store.getState());
        const reducerFunction = (accumulator, pilot) => {
          const shipKey = Selector.shipByPilot(pilot.id, store.getState()).key;
          const maneuvers = AgentUtilities.determineValidManeuvers(shipKey);
          return R.assoc(pilot.id, maneuvers, accumulator);
        };
        const pilotToValidManeuvers = pilots.reduce(reducerFunction, {});
        const newAgentQuery = XMS.AgentQueryState.create({
          agentId: activeAgentId,
          queryKey: AgentQueryType.CHOOSE_MANEUVERS,
          payload: {
            pilotToValidManeuvers
          }
        });
        store.dispatch(ActionCreator$7.setAgentQuery(newAgentQuery));
      } else {
        store.dispatch(ActionCreator$7.clearActiveAgentId());
        store.dispatch(ActionCreator$7.setPhase(Phase$3.PLANNING_END));
      }
    },
    responseKey: AgentQueryType.CHOOSE_MANEUVERS,
    responseFunction: store => {
      const agentResponse = Selector.agentResponse(store.getState());
      const pilotToManeuver0 = Selector.pilotToManeuver(store.getState());
      const pilotToManeuver1 = agentResponse.payload.pilotToManeuver;
      const pilotToManeuver = R.merge(pilotToManeuver0, pilotToManeuver1);
      store.dispatch(ActionCreator$7.setPilotToManeuver(pilotToManeuver));
      store.dispatch(ActionCreator$7.clearAgentResponse());
    }
  };

  Object.freeze(PlanningTask);

  const { ActionCreator: ActionCreator$8 } = XMS;

  const SetupTask = {};

  SetupTask.doIt = store =>
    new Promise(resolve => {
      store.dispatch(ActionCreator$8.setPhase(XMA.Phase.PLANNING_START));

      resolve(store);
    });

  Object.freeze(SetupTask);

  const { ActionCreator: ActionCreator$9 } = XMS;

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
    store.dispatch(ActionCreator$9.setUpgradeInstance(upgrade));
    store.dispatch(ActionCreator$9.setUpgradeTokenCounts(upgrade.id, tokenCounts));

    return R.append(upgrade.id, accumulator);
  };

  const processPilotKey = store => (accumulator, pilotObj) => {
    const { pilotKey } = pilotObj;
    const upgradeKeys = R.defaultTo([], pilotObj.upgradeKeys);
    const reducerFunction = processUpgradeKey(store);
    const upgradeIds = R.reduce(reducerFunction, [], upgradeKeys);
    const tokenCounts = R.assoc(
      "shield",
      PilotUtilities.statValue("shields", pilotKey),
      XMS.TokenCountsState.create()
    );

    // Side effects.
    const pilot = createPilot(store, pilotKey);
    store.dispatch(ActionCreator$9.setPilotInstance(pilot));
    store.dispatch(ActionCreator$9.setPilotTokenCounts(pilot.id, tokenCounts));
    store.dispatch(ActionCreator$9.setPilotUpgrades(pilot.id, upgradeIds));

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

    store.dispatch(ActionCreator$9.setSquadInstance(answer));
    store.dispatch(ActionCreator$9.setSquadPilots(squadId, pilotIds));

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

  const { Faction } = XMA;

  const SquadUtils = {};

  const firstOrderPrecedence = R.ifElse(
    R.equals(Faction.FIRST_ORDER),
    R.identity,
    R.always(Faction.GALACTIC_EMPIRE)
  );

  const resistancePrecedence = R.ifElse(
    R.equals(Faction.RESISTANCE),
    R.identity,
    R.always(Faction.REBEL_ALLIANCE)
  );

  // /////////////////////////////////////////////////////////////////////////////////////////////////
  SquadUtils.determineFaction = (state, squadId) => {
    const reducerFunction = (accumulator, pilotId) => {
      const pilotCard = Selector.pilotCard(pilotId, state);
      const factionName = pilotCard.faction;
      const faction = XMA.EnumUtilities.findByName(factionName, XMA.Faction);
      const factionKey = faction.key;

      return R.cond([
        [R.equals(Faction.FIRST_ORDER), R.always(Faction.FIRST_ORDER)],
        [R.equals(Faction.GALACTIC_EMPIRE), R.always(firstOrderPrecedence(accumulator))],
        [R.equals(Faction.RESISTANCE), R.always(Faction.RESISTANCE)],
        [R.equals(Faction.REBEL_ALLIANCE), R.always(resistancePrecedence(accumulator))],
        [R.equals(Faction.SCUM_AND_VILLAINY), R.always(Faction.SCUM_AND_VILLAINY)],
        [R.T, R.always(`Unknown factionKey ${factionKey} for factionName ${factionName}`)]
      ])(factionKey);
    };

    const pilotIds = Selector.pilotIdsBySquad(squadId, state);

    return pilotIds.reduce(reducerFunction, Faction.GALACTIC_EMPIRE);
  };

  Object.freeze(SquadUtils);

  const { ActionCreator: ActionCreator$a, Reducer } = XMS;

  const XWingMiniaturesModel = {};

  const determineWinner = store => {
    let answer;

    const state = store.getState();
    const firstCount = Selector.pilotInstancesBySquad(1, state).length;
    const secondCount = Selector.pilotInstancesBySquad(2, state).length;

    if (firstCount === 0) {
      answer = Selector.agentInstanceBySquad(1).id;
    } else if (secondCount === 0) {
      answer = Selector.agentInstanceBySquad(2).id;
    }

    return answer;
  };

  const isGameOver = store => {
    let answer = false;

    const state = store.getState();
    const firstCount = Selector.pilotInstancesBySquad(1, state).length;

    answer = firstCount === 0;

    if (!answer) {
      const secondCount = Selector.pilotInstancesBySquad(2, state).length;
      answer = secondCount === 0;
    }

    return answer;
  };

  const processGameOver = store => {
    const winner = determineWinner(store);
    store.dispatch(ActionCreator$a.setGameOver(winner));

    const message = winner === undefined ? "Game is a draw." : `${winner.name()} won! `;
    store.dispatch(ActionCreator$a.setUserMessage(message));
  };

  // /////////////////////////////////////////////////////////////////////////////////////////////////
  XWingMiniaturesModel.nextGameState = ({ gameState }) => {
    // Initialize.
    const store = Redux.createStore(Reducer.root, gameState);
    let answer;

    if (isGameOver(store)) {
      answer = new Promise(resolve => {
        processGameOver(store);
        resolve(store);
      });
    } else {
      const { phaseKey } = gameState;
      let taskClass;

      if (phaseKey === "setup") {
        taskClass = SetupTask;
      } else if (phaseKey.startsWith("planning")) {
        taskClass = PlanningTask;
      } else if (phaseKey.startsWith("activation")) {
        taskClass = ActivationTask;
      } else if (phaseKey.startsWith("combat")) {
        taskClass = CombatTask;
      } else if (phaseKey.startsWith("end")) {
        taskClass = EndTask;
      }

      answer = taskClass.doIt(store);
    }

    return answer;
  };

  Object.freeze(XWingMiniaturesModel);

  exports.ActivationTask = ActivationTask;
  exports.AgentQueryType = AgentQueryType;
  exports.AgentUtilities = AgentUtilities;
  exports.CombatTask = CombatTask;
  exports.ConditionAbility = ConditionAbility;
  exports.DamageAbility = DamageAbility;
  exports.DamageDeck = DamageDeck;
  exports.DiceUtilities = DiceUtilities;
  exports.EndTask = EndTask;
  exports.ManeuverComputer = ManeuverComputer;
  exports.ModifyDiceAbility = ModifyDiceAbility;
  exports.PathUtilities = PathUtilities;
  exports.PilotAbility = PilotAbility;
  exports.PilotUtilities = PilotUtilities;
  exports.PlanningTask = PlanningTask;
  exports.Selector = Selector;
  exports.SetupTask = SetupTask;
  exports.ShipActionAbility = ShipActionAbility;
  exports.SquadBuilder = SquadBuilder;
  exports.SquadUtilities = SquadUtils;
  exports.UpgradeAbility = UpgradeAbility;
  exports.XWingMiniaturesModel = XWingMiniaturesModel;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
