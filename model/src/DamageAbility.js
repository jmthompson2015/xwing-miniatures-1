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

export default DamageAbility;
