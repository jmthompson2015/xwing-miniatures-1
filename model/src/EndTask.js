import Selector from "./Selector.js";

const Phase = XMA.Phase;
const Token = XMA.Token;

const ActionCreator = XMS.ActionCreator;

const EndTask = {};
const PHASE_TO_CONFIG = {};

EndTask.doIt = store =>
{
   let answer;
   const phaseKey = Selector.phaseKey(store.getState());

   switch (phaseKey)
   {
      case Phase.END_START:
         answer = start(store);
         break;
      case Phase.END_END:
         answer = end(store);
         break;
      default:
         const config = PHASE_TO_CONFIG[phaseKey];
         answer = processPhase(
         {
            phaseKey: phaseKey,
            responseKey: config.responseKey,
            responseFunction: config.responseFunction,
            processFunction: config.processFunction
         })(store);
   }

   return answer;
};

////////////////////////////////////////////////////////////////////////////////
const start = store => new Promise((resolve) =>
{
   setPhase(store, Phase.END_CLEAN_UP);
   resolve(store);
});

PHASE_TO_CONFIG[Phase.END_CLEAN_UP] = {
   processFunction: store =>
   {
      const pilotIds = Selector.pilotIds(store.getState()).sort();
      store.dispatch(ActionCreator.setEndQueue(pilotIds));

      while (Selector.endQueue(store.getState()).length > 0)
      {
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
   processFunction: store =>
   {
      setPhase(store, Phase.END_END);
   }
};

const end = store => new Promise((resolve) =>
{
   setPhase(store, Phase.PLANNING_START);
   resolve(store);
});

////////////////////////////////////////////////////////////////////////////////
const processPhase = (
{
   phaseKey,
   processFunction,
   responseKey,
   responseFunction
}) => store => new Promise((resolve, reject) =>
{
   const agentQuery = Selector.agentQuery(store.getState());
   const agentResponse = Selector.agentResponse(store.getState());

   if (agentQuery !== undefined)
   {
      reject(new Error("Received agentQuery for phaseKey: " + phaseKey + "\nagentQuery = " + JSON.stringify(agentQuery, null, "   ")));
   }
   else if (agentResponse !== undefined && agentResponse.responseKey === responseKey)
   {
      if (responseFunction !== undefined)
      {
         responseFunction(store);
         store.dispatch(ActionCreator.clearAgentResponse());
         resolve(store);
      }
      else
      {
         reject(new Error("Missing responseFunction for phaseKey: " + phaseKey));
      }
   }
   else
   {
      if (processFunction !== undefined)
      {
         processFunction(store);
         resolve(store);
      }
      else
      {
         reject(new Error("Missing processFunction for phaseKey: " + phaseKey));
      }
   }
});

const setPhase = (store, phaseKey) => store.dispatch(ActionCreator.setPhase(phaseKey));

Object.freeze(EndTask);

export default EndTask;