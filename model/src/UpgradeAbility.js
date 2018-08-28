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

export default UpgradeAbility;
