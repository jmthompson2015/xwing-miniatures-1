const { ActionCreator, Selector } = XMS;

const TaskUtilities = {};

TaskUtilities.processPhase = ({
  phaseKey,
  processFunction,
  responseKey,
  responseFunction
}) => store =>
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

Object.freeze(TaskUtilities);

export default TaskUtilities;
