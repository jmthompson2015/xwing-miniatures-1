import DiceUtils from "./DiceUtilities.js";
import Selector from "./Selector.js";

const AttackDiceValue = XMA.AttackDiceValue;
const DefenseDiceValue = XMA.DefenseDiceValue;
const DiceModification = XMA.DiceModification;
const Token = XMA.Token;

const ActionCreator = XMS.ActionCreator;

const ModifyDiceAbility = {};

////////////////////////////////////////////////////////////////////////
ModifyDiceAbility[DiceModification.ATTACK_SPEND_FOCUS] = {
   // Spend a focus token to change all focus results to hit results on attack dice.
   condition: (attackerId, state) =>
   {
      const focusTokenCount = Selector.countByPilotToken(attackerId, Token.FOCUS, state);
      const diceFocusCount = attackDiceFocusCount(state);
      return isActiveCombatAttacker(attackerId, state) && focusTokenCount > 0 && diceFocusCount > 0;
   },
   consequent: (attackerId, store) => new Promise((resolve) =>
   {
      const state = store.getState();
      const combatId = Selector.activeCombatId(state);
      const diceKeys = Selector.attackDiceKeysByCombat(combatId, state);
      const newDiceKeys = DiceUtils.changeAllToValue(diceKeys, AttackDiceValue.FOCUS, AttackDiceValue.HIT);

      store.dispatch(ActionCreator.setCombatAttackDice(combatId, newDiceKeys));
      store.dispatch(ActionCreator.addPilotTokenCount(attackerId, Token.FOCUS, -1));
      resolve(store);
   })
};

ModifyDiceAbility[DiceModification.ATTACK_SPEND_TARGET_LOCK] = {
   // Spend a target lock on the defender to reroll any number of attack dice.
   condition: (attackerId, state) =>
   {
      // FIXME: implement DiceModification.ATTACK_SPEND_TARGET_LOCK condition()
   },
   consequent: (attackerId, store) => new Promise((resolve) =>
   {
      // FIXME: implement DiceModification.ATTACK_SPEND_TARGET_LOCK consequent()
      resolve(store);
   })
};

////////////////////////////////////////////////////////////////////////
ModifyDiceAbility[DiceModification.DEFENSE_SPEND_EVADE] = {
   // Spend an evade token to add one additional evade result to defense dice.
   condition: (defenderId, state) =>
   {
      const evadeTokenCount = Selector.countByPilotToken(defenderId, Token.EVADE, state);
      return isActiveCombatDefender(defenderId, state) && evadeTokenCount > 0;
   },
   consequent: (defenderId, store) => new Promise((resolve) =>
   {
      const state = store.getState();
      const combatId = Selector.activeCombatId(state);
      const diceKeys = Selector.defenseDiceKeysByCombat(combatId, state);
      const newDiceKeys = DiceUtils.addValue(diceKeys, DefenseDiceValue.EVADE);

      store.dispatch(ActionCreator.setCombatDefenseDice(combatId, newDiceKeys));
      store.dispatch(ActionCreator.addPilotTokenCount(defenderId, Token.EVADE, -1));
      resolve(store);
   })
};

ModifyDiceAbility[DiceModification.DEFENSE_SPEND_FOCUS] = {
   // Spend a focus token to change all focus results to evade results on defense dice.
   condition: (defenderId, state) =>
   {
      const focusTokenCount = Selector.countByPilotToken(defenderId, Token.FOCUS, state);
      const diceFocusCount = defenseDiceFocusCount(state);
      return isActiveCombatDefender(defenderId, state) && focusTokenCount > 0 && diceFocusCount > 0;
   },
   consequent: (defenderId, store) => new Promise((resolve) =>
   {
      const state = store.getState();
      const combatId = Selector.activeCombatId(state);
      const diceKeys = Selector.defenseDiceKeysByCombat(combatId, state);
      const newDiceKeys = DiceUtils.changeAllToValue(diceKeys, DefenseDiceValue.FOCUS, DefenseDiceValue.EVADE);

      store.dispatch(ActionCreator.setCombatDefenseDice(combatId, newDiceKeys));
      store.dispatch(ActionCreator.addPilotTokenCount(defenderId, Token.FOCUS, -1));
      resolve(store);
   })
};

////////////////////////////////////////////////////////////////////////
const attackDiceFocusCount = state =>
{
   const combatId = Selector.activeCombatId(state);
   return (combatId !== undefined ? Selector.attackDiceValueCount(combatId, AttackDiceValue.FOCUS, state) : 0);
};

const defenseDiceFocusCount = state =>
{
   const combatId = Selector.activeCombatId(state);
   return (combatId !== undefined ? Selector.defenseDiceValueCount(combatId, DefenseDiceValue.FOCUS, state) : 0);
};

const isActiveCombatAttacker = (attackerId, state) =>
{
   const combatId = Selector.activeCombatId(state);
   const combatInstance = (combatId !== undefined ? Selector.combatInstance(combatId, state) : undefined);
   return (combatInstance !== undefined && attackerId === combatInstance.attackerId);
};

const isActiveCombatDefender = (defenderId, state) =>
{
   const combatId = Selector.activeCombatId(state);
   const combatInstance = (combatId !== undefined ? Selector.combatInstance(combatId, state) : undefined);
   return (combatInstance !== undefined && defenderId === combatInstance.defenderId);
};

Object.freeze(ModifyDiceAbility);

export default ModifyDiceAbility;