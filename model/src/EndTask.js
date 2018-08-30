import Selector from "./Selector.js";
import TaskUtils from "./TaskUtilities.js";

const { Phase, Token } = XMA;

const { ActionCreator } = XMS;

const EndTask = {};
const PHASE_TO_CONFIG = {};

const setPhase = (store, phaseKey) => store.dispatch(ActionCreator.setPhase(phaseKey));

const start = store =>
  new Promise(resolve => {
    setPhase(store, Phase.END_CLEAN_UP);
    resolve(store);
  });

const end = store =>
  new Promise(resolve => {
    setPhase(store, Phase.PLANNING_START);
    resolve(store);
  });

// /////////////////////////////////////////////////////////////////////////////////////////////////
EndTask.doIt = store => {
  let answer;
  let config;
  const phaseKey = Selector.phaseKey(store.getState());

  switch (phaseKey) {
    case Phase.END_START:
      answer = start(store);
      break;
    case Phase.END_END:
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

// //////////////////////////////////////////////////////////////////////////////
PHASE_TO_CONFIG[Phase.END_CLEAN_UP] = {
  processFunction: store => {
    const pilotIds = Selector.pilotIds(store.getState()).sort();
    store.dispatch(ActionCreator.setEndQueue(pilotIds));

    while (Selector.endQueue(store.getState()).length > 0) {
      store.dispatch(ActionCreator.dequeueEnd());
      const pilotId = Selector.activePilotId(store.getState());
      store.dispatch(ActionCreator.clearPilotTokenCount(pilotId, Token.EVADE));
      store.dispatch(ActionCreator.clearPilotTokenCount(pilotId, Token.FOCUS));
      store.dispatch(ActionCreator.clearPilotTokenCount(pilotId, Token.REINFORCE));
      store.dispatch(ActionCreator.clearPilotTokenCount(pilotId, Token.TRACTOR_BEAM));
      store.dispatch(ActionCreator.clearPilotTokenCount(pilotId, Token.WEAPONS_DISABLED));
    }

    setPhase(store, Phase.END_ROUND_END);
  }
};

PHASE_TO_CONFIG[Phase.END_ROUND_END] = {
  processFunction: store => {
    setPhase(store, Phase.END_END);
  }
};

Object.freeze(EndTask);

export default EndTask;
