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

export default PilotAbility;
