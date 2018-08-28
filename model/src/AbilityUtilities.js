/* eslint no-console: ["error", { allow: ["error"] }] */

import ConditionAbility from "./ConditionAbility.js";
import DamageAbility from "./DamageAbility.js";
import PilotAbility from "./PilotAbility.js";
import ModifyDiceAbility from "./ModifyDiceAbility.js";
import Selector from "./Selector.js";
import ShipActionAbility from "./ShipActionAbility.js";
import UpgradeAbility from "./UpgradeAbility.js";

const { ActionCreator } = XMS;

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

  store.dispatch(ActionCreator.clearAgentResponse());
};

// //////////////////////////////////////////////////////////////////////////////
Object.freeze(AbilityUtilities);

export default AbilityUtilities;
