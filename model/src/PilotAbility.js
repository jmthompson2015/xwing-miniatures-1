const PilotCard = XMA.PilotCard;

const PilotAbility = {};

////////////////////////////////////////////////////////////////////////
PilotAbility[PilotCard.LUKE_SKYWALKER] = {
   condition: (pilotId, state) =>
   {
      return false;
   },
   consequent: (pilotId, store) => new Promise((resolve) =>
   {
      resolve(store);
   })
};

Object.freeze(PilotAbility);

export default PilotAbility;