import ActivationTask from "./ActivationTask.js";
import CombatTask from "./CombatTask.js";
import EndTask from "./EndTask.js";
import PlanningTask from "./PlanningTask.js";
import Selector from "./Selector.js";
import SetupTask from "./SetupTask.js";

const ActionCreator = XMS.ActionCreator;
const Reducer = XMS.Reducer;

const XWingMiniaturesModel = {};

XWingMiniaturesModel.nextGameState = (
{
   gameState
}) =>
{
   // Initialize.
   const store = Redux.createStore(Reducer.root, gameState);
   let answer;

   if (isGameOver(store))
   {
      answer = new Promise((resolve) =>
      {
         processGameOver(store);
         resolve(store);
      });
   }
   else
   {
      const phaseKey = gameState.phaseKey;
      let taskClass;

      if (phaseKey === "setup")
      {
         taskClass = SetupTask;
      }
      else if (phaseKey.startsWith("planning"))
      {
         taskClass = PlanningTask;
      }
      else if (phaseKey.startsWith("activation"))
      {
         taskClass = ActivationTask;
      }
      else if (phaseKey.startsWith("combat"))
      {
         taskClass = CombatTask;
      }
      else if (phaseKey.startsWith("end"))
      {
         taskClass = EndTask;
      }

      answer = taskClass.doIt(store);
   }

   return answer;
};

const determineWinner = store =>
{
   let answer;

   const state = store.getState();
   const firstCount = Selector.pilotInstancesBySquad(1, state).length;
   const secondCount = Selector.pilotInstancesBySquad(2, state).length;

   if (firstCount === 0)
   {
      answer = Selector.agentInstanceBySquad(1).id;
   }
   else if (secondCount === 0)
   {
      answer = Selector.agentInstanceBySquad(2).id;
   }

   return answer;
};

const isGameOver = store =>
{
   let answer = false;

   const state = store.getState();
   const firstCount = Selector.pilotInstancesBySquad(1, state).length;

   answer = (firstCount === 0);

   if (!answer)
   {
      const secondCount = Selector.pilotInstancesBySquad(2, state).length;
      answer = (secondCount === 0);
   }

   return answer;
};

const processGameOver = store =>
{
   const winner = determineWinner(store);
   store.dispatch(ActionCreator.setGameOver(winner));

   const message = (winner === undefined ? "Game is a draw." : winner.name() + " won! ");
   store.dispatch(ActionCreator.setUserMessage(message));
};

Object.freeze(XWingMiniaturesModel);

export default XWingMiniaturesModel;