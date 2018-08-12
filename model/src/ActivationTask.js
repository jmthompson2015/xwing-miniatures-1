import AbilityUtils from "./AbilityUtilities.js";
import AgentQueryType from "./AgentQueryType.js";
import AgentUtils from "./AgentUtilities.js";
import ManeuverComputer from "./ManeuverComputer.js";
import PilotUtils from "./PilotUtilities.js";
import Selector from "./Selector.js";

const Phase = XMA.Phase;
const Token = XMA.Token;

const ActionCreator = XMS.ActionCreator;

const ActivationTask = {};
const PHASE_TO_CONFIG = {};

ActivationTask.doIt = store =>
{
   let answer;
   const phaseKey = Selector.phaseKey(store.getState());

   switch (phaseKey)
   {
      case Phase.ACTIVATION_START:
         answer = start(store);
         break;
      case Phase.ACTIVATION_END:
         answer = end(store);
         break;
      default:
         const config = PHASE_TO_CONFIG[phaseKey];
         answer = processPhase(
         {
            phaseKey: phaseKey,
            processFunction: config.processFunction,
            responseKey: config.responseKey,
            responseFunction: config.responseFunction
         })(store);
   }

   return answer;
};

////////////////////////////////////////////////////////////////////////////////
const start = store => new Promise((resolve) =>
{
   setActivationQueue(store);
   setPhase(store, Phase.ACTIVATION_REVEAL_DIAL);

   resolve(store);
});

PHASE_TO_CONFIG[Phase.ACTIVATION_REVEAL_DIAL] = {
   processFunction: store =>
   {
      const activationQueue = Selector.activationQueue(store.getState());

      if (activationQueue.length > 0)
      {
         store.dispatch(ActionCreator.dequeueActivation());

         setPhase(store, Phase.ACTIVATION_SET_TEMPLATE);
      }
      else
      {
         store.dispatch(ActionCreator.clearActivePilotId());
         store.dispatch(ActionCreator.setPhase(Phase.ACTIVATION_END));
      }
   }
};

PHASE_TO_CONFIG[Phase.ACTIVATION_SET_TEMPLATE] = {
   processFunction: store =>
   {
      setPhase(store, Phase.ACTIVATION_EXECUTE_MANEUVER);
   }
};

PHASE_TO_CONFIG[Phase.ACTIVATION_EXECUTE_MANEUVER] = {
   processFunction: store =>
   {
      const pilotId = Selector.activePilotId(store.getState());
      const maneuverKey = Selector.maneuverByPilot(pilotId, store.getState());
      const maneuver = XMA.Selector.maneuver(maneuverKey);
      const fromPosition = Selector.positionByPilot(pilotId, store.getState());
      const shipBase = Selector.shipBaseValueByPilot(pilotId, store.getState());
      const toPosition = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);
      store.dispatch(ActionCreator.movePilot(pilotId, toPosition));
      const color = R.defaultTo("white", R.prop(maneuver.difficulty, DIFFICULTY_TO_COLOR));
      store.dispatch(ActionCreator.setDisplayManeuver(XMS.ManeuverState.create(
      {
         color: color,
         fromPolygon: ManeuverComputer.computeFromPolygon(fromPosition, shipBase),
         fromPosition: fromPosition,
         path: ManeuverComputer.computePath(maneuver, fromPosition, shipBase),
         toPolygon: ManeuverComputer.computeToPolygon(maneuver, fromPosition, shipBase)
      })));
      setPhase(store, Phase.ACTIVATION_CHECK_PILOT_STRESS);
   }
};

PHASE_TO_CONFIG[Phase.ACTIVATION_CHECK_PILOT_STRESS] = {
   processFunction: store =>
   {
      const pilotId = Selector.activePilotId(store.getState());
      const maneuverKey = Selector.maneuverByPilot(pilotId, store.getState());
      const maneuver = XMA.Selector.maneuver(maneuverKey);
      const difficulty = maneuver.difficulty;

      if (difficulty === "Easy")
      {
         const stressCount = Selector.countByPilotToken(pilotId, Token.STRESS, store.getState());

         if (stressCount > 0)
         {
            store.dispatch(ActionCreator.addPilotTokenCount(pilotId, Token.STRESS, -1));
         }
      }
      else if (difficulty === "Hard")
      {
         store.dispatch(ActionCreator.addPilotTokenCount(pilotId, Token.STRESS, 1));
      }
      setPhase(store, Phase.ACTIVATION_CLEAN_UP);
   }
};

PHASE_TO_CONFIG[Phase.ACTIVATION_CLEAN_UP] = {
   processFunction: store =>
   {
      setPhase(store, Phase.ACTIVATION_PERFORM_ACTION);
   },
};

PHASE_TO_CONFIG[Phase.ACTIVATION_PERFORM_ACTION] = {
   processFunction: store =>
   {
      const pilotId = Selector.activePilotId(store.getState());
      const agent = Selector.agentInstanceByPilot(pilotId, store.getState());
      const ship = Selector.shipByPilot(pilotId, store.getState());
      const shipActionKeys = AgentUtils.determineValidShipActions(ship.key);
      const reduceFunction = (accum, key) =>
      {
         const ability = AbilityUtils.ability("ShipAction", key);

         if (ability !== undefined && ability.condition(pilotId, store.getState()))
         {
            accum.push(XMS.AbilityState.create(
            {
               sourceName: "ShipAction",
               sourceKey: key
            }));
         }

         return accum;
      };
      const abilities = R.reduce(reduceFunction, [], shipActionKeys);

      const agentQuery = XMS.AgentQueryState.create(
      {
         agentId: agent.id,
         queryKey: AgentQueryType.CHOOSE_SHIP_ACTION,
         payload:
         {
            pilotId: pilotId,
            abilities: abilities
         }
      });
      store.dispatch(ActionCreator.setAgentQuery(agentQuery));
   },
   responseKey: AgentQueryType.CHOOSE_SHIP_ACTION,
   responseFunction: store =>
   {
      AbilityUtils.processAgentResponse(store);
      setPhase(store, Phase.ACTIVATION_REVEAL_DIAL);
   }
};

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

const end = store => new Promise((resolve) =>
{
   store.dispatch(ActionCreator.clearDisplayManeuver());
   setPhase(store, Phase.COMBAT_START);

   resolve(store);
});

////////////////////////////////////////////////////////////////////////////////
const DIFFICULTY_TO_COLOR = {
   "Easy": "rgb(0, 255, 0)",
   "Hard": "red"
};

const comparator = R.comparator((a, b) =>
{
   const pilotSkillA = PilotUtils.statValue("skill", a.pilotKey, Selector.upgradeInstancesByPilot(a.id));
   const pilotSkillB = PilotUtils.statValue("skill", b.pilotKey, Selector.upgradeInstancesByPilot(b.id));

   // FIXME: sort same pilot skill by initiative
   return pilotSkillA < pilotSkillB;
});

const setActivationQueue = store =>
{
   const pilots = Selector.pilotInstances(store.getState());
   const queue = R.sort(comparator, pilots).map(pilot => pilot.id);
   store.dispatch(ActionCreator.setActivationQueue(queue));
};

const setPhase = (store, phaseKey) => store.dispatch(ActionCreator.setPhase(phaseKey));

Object.freeze(ActivationTask);

export default ActivationTask;