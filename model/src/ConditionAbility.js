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

export default ConditionAbility;
