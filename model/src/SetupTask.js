const { ActionCreator } = XMS;

const SetupTask = {};

SetupTask.doIt = store =>
  new Promise(resolve => {
    store.dispatch(ActionCreator.setPhase(XMA.Phase.PLANNING_START));

    resolve(store);
  });

Object.freeze(SetupTask);

export default SetupTask;
