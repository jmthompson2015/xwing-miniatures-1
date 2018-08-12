const DamageCard = XMA.DamageCard;

const DamageAbility = {};

////////////////////////////////////////////////////////////////////////
DamageAbility[DamageCard.BLINDED_PILOT] = {
   condition: (pilotId, state) =>
   {
      return false;
   },
   consequent: (pilotId, store) => new Promise((resolve) =>
   {
      resolve(store);
   })
};

Object.freeze(DamageAbility);

export default DamageAbility;