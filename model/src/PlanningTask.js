import AgentQueryType from "./AgentQueryType.js";
import AgentUtils from "./AgentUtilities.js";
import Selector from "./Selector.js";

const { Phase } = XMA;

const { ActionCreator } = XMS;

const PlanningTask = {};
const PHASE_TO_CONFIG = {};

const setPhase = (store, phaseKey) => store.dispatch(ActionCreator.setPhase(phaseKey));

const setPlanningQueue = store => {
  const agents = Selector.agentInstances(store.getState());
  const queue = R.map(agent => agent.id, agents);
  store.dispatch(ActionCreator.setPlanningQueue(queue));
};

const start = store =>
  new Promise(resolve => {
    store.dispatch(ActionCreator.incrementRound());
    setPlanningQueue(store);
    setPhase(store, Phase.PLANNING);

    resolve(store);
  });

const end = store =>
  new Promise(resolve => {
    setPhase(store, Phase.ACTIVATION_START);

    resolve(store);
  });

const processPhase = ({ phaseKey, processFunction, responseKey, responseFunction }) => store =>
  new Promise((resolve, reject) => {
    const agentQuery = Selector.agentQuery(store.getState());
    const agentResponse = Selector.agentResponse(store.getState());

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
        store.dispatch(ActionCreator.clearAgentResponse());
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

// /////////////////////////////////////////////////////////////////////////////////////////////////
PlanningTask.doIt = store => {
  let answer;
  let config;
  const phaseKey = Selector.phaseKey(store.getState());

  switch (phaseKey) {
    case Phase.PLANNING_START:
      answer = start(store);
      break;
    case Phase.PLANNING_END:
      answer = end(store);
      break;
    default:
      config = PHASE_TO_CONFIG[phaseKey];
      answer = processPhase({
        phaseKey,
        responseKey: config.responseKey,
        responseFunction: config.responseFunction,
        processFunction: config.processFunction
      })(store);
  }

  return answer;
};

// //////////////////////////////////////////////////////////////////////////////
PHASE_TO_CONFIG[Phase.PLANNING] = {
  processFunction: store => {
    const planningQueue = Selector.planningQueue(store.getState());

    if (planningQueue.length > 0) {
      store.dispatch(ActionCreator.dequeuePlanning());
      const activeAgentId = Selector.activeAgentId(store.getState());
      const pilots = Selector.pilotInstancesByAgent(activeAgentId, store.getState());
      const reducerFunction = (accumulator, pilot) => {
        const shipKey = Selector.shipByPilot(pilot.id, store.getState()).key;
        const maneuvers = AgentUtils.determineValidManeuvers(shipKey);
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
      store.dispatch(ActionCreator.setAgentQuery(newAgentQuery));
    } else {
      store.dispatch(ActionCreator.clearActiveAgentId());
      store.dispatch(ActionCreator.setPhase(Phase.PLANNING_END));
    }
  },
  responseKey: AgentQueryType.CHOOSE_MANEUVERS,
  responseFunction: store => {
    const agentResponse = Selector.agentResponse(store.getState());
    const pilotToManeuver0 = Selector.pilotToManeuver(store.getState());
    const pilotToManeuver1 = agentResponse.payload.pilotToManeuver;
    const pilotToManeuver = R.merge(pilotToManeuver0, pilotToManeuver1);
    store.dispatch(ActionCreator.setPilotToManeuver(pilotToManeuver));
    store.dispatch(ActionCreator.clearAgentResponse());
  }
};

Object.freeze(PlanningTask);

export default PlanningTask;
