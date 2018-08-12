import StrategyResolver from "./StrategyResolver.js";

const XWingMiniaturesApp = {};

XWingMiniaturesApp.initialize = () =>
{
   const store = createStore();
   XWingMiniaturesApp.drawView(store);
};

XWingMiniaturesApp.drawView = store =>
{
   XMV.XWingMiniaturesView.drawView(
   {
      gameState: store.getState(),
      document: document,
      resourceBase: LOCAL_RESOURCE
   });

   setTimeout(() => XWingMiniaturesApp.nextGameState(store), DELAY);
};

XWingMiniaturesApp.nextGameState = store =>
{
   const agentQuery = store.getState().agentQuery;

   if (agentQuery !== undefined)
   {
      if (agentQuery.queryKey === XMM.AgentQueryType.CHOOSE_MANEUVERS)
      {
         chooseManeuvers(store);
         return;
      }
      else if (agentQuery.queryKey === XMM.AgentQueryType.CHOOSE_SHIP_ACTION)
      {
         chooseShipAction(store);
         return;
      }
      else if (agentQuery.queryKey === XMM.AgentQueryType.CHOOSE_WEAPON_AND_DEFENDER)
      {
         chooseWeaponAndDefender(store);
         return;
      }
      else if (agentQuery.queryKey === XMM.AgentQueryType.CHOOSE_ATTACK_DICE_MODIFICATION)
      {
         chooseAttackDiceModification(store);
         return;
      }
      else if (agentQuery.queryKey === XMM.AgentQueryType.CHOOSE_DEFENSE_DICE_MODIFICATION)
      {
         chooseDefenseDiceModification(store);
         return;
      }
      else if (agentQuery.queryKey === XMM.AgentQueryType.NOTIFY_DAMAGE)
      {
         notifyDamage(store);
         return;
      }
   }

   const callback = store => XWingMiniaturesApp.drawView(store);
   XMM.XWingMiniaturesModel.nextGameState(
   {
      gameState: store.getState()
   }).then(callback);
};

////////////////////////////////////////////////////////////////////////////////
const DELAY = 500;

const LOCAL_RESOURCE = "../../view/resource/";

const chooseAttackDiceModification = store =>
{
   const agentQuery = store.getState().agentQuery;
   const agentId = agentQuery.agentId;
   const agentInstance = XMM.Selector.agentInstance(agentId, store.getState());
   const strategy = StrategyResolver.resolveStrategy(agentInstance.strategy);

   const combatId = agentQuery.payload.combatId;
   const abilities = agentQuery.payload.abilities;

   const phaseKey = XMM.Selector.phaseKey(store.getState());
   const combatInstance = XMM.Selector.combatInstance(combatId, store.getState());
   const attackerInstance = XMM.Selector.pilotInstance(combatInstance.attackerId, store.getState());
   const defenderInstance = XMM.Selector.pilotInstance(combatInstance.defenderId, store.getState());
   const inputAreaId = determineInputArea(agentId, store.getState());

   strategy.chooseAttackDiceModification(
   {
      abilities: abilities,
      attackerInstance: attackerInstance,
      combatInstance: combatInstance,
      defenderInstance: defenderInstance,
      inputAreaId: inputAreaId,
      phaseKey: phaseKey
   }).then(ability =>
   {
      const agentResponse = XMS.AgentResponseState.create(
      {
         agentId: agentId,
         responseKey: XMM.AgentQueryType.CHOOSE_ATTACK_DICE_MODIFICATION,
         payload:
         {
            pilotId: attackerInstance.id,
            ability: ability
         }
      });

      store.dispatch(XMS.ActionCreator.clearAgentQuery());
      store.dispatch(XMS.ActionCreator.setAgentResponse(agentResponse));
      const callback = store => XWingMiniaturesApp.drawView(store);
      XMM.XWingMiniaturesModel.nextGameState(
      {
         gameState: store.getState()
      }).then(callback);
   });
};

const chooseDefenseDiceModification = store =>
{
   const agentQuery = store.getState().agentQuery;
   const agentId = agentQuery.agentId;
   const agentInstance = XMM.Selector.agentInstance(agentId, store.getState());
   const strategy = StrategyResolver.resolveStrategy(agentInstance.strategy);

   const combatId = agentQuery.payload.combatId;
   const abilities = agentQuery.payload.abilities;

   const phaseKey = XMM.Selector.phaseKey(store.getState());
   const combatInstance = XMM.Selector.combatInstance(combatId, store.getState());
   const attackerInstance = XMM.Selector.pilotInstance(combatInstance.attackerId, store.getState());
   const defenderInstance = XMM.Selector.pilotInstance(combatInstance.defenderId, store.getState());
   const inputAreaId = determineInputArea(agentId, store.getState());

   strategy.chooseDefenseDiceModification(
   {
      abilities: abilities,
      attackerInstance: attackerInstance,
      combatInstance: combatInstance,
      defenderInstance: defenderInstance,
      inputAreaId: inputAreaId,
      phaseKey: phaseKey
   }).then(ability =>
   {
      const agentResponse = XMS.AgentResponseState.create(
      {
         agentId: agentId,
         responseKey: XMM.AgentQueryType.CHOOSE_DEFENSE_DICE_MODIFICATION,
         payload:
         {
            pilotId: defenderInstance.id,
            ability: ability
         }
      });

      store.dispatch(XMS.ActionCreator.clearAgentQuery());
      store.dispatch(XMS.ActionCreator.setAgentResponse(agentResponse));
      const callback = store => XWingMiniaturesApp.drawView(store);
      XMM.XWingMiniaturesModel.nextGameState(
      {
         gameState: store.getState()
      }).then(callback);
   });
};

const chooseManeuvers = store =>
{
   const agentQuery = store.getState().agentQuery;
   const agentId = agentQuery.agentId;
   const agentInstance = XMM.Selector.agentInstance(agentQuery.agentId, store.getState());
   const strategy = StrategyResolver.resolveStrategy(agentInstance.strategy);

   const pilotInstances = XMM.Selector.pilotInstancesByAgent(agentId, store.getState());
   const pilotToValidManeuvers = agentQuery.payload.pilotToValidManeuvers;
   const inputAreaId = determineInputArea(agentId, store.getState());

   strategy.chooseManeuvers(pilotInstances, pilotToValidManeuvers, inputAreaId).then(pilotToManeuver =>
   {
      const agentResponse = XMS.AgentResponseState.create(
      {
         agentId: agentId,
         responseKey: XMM.AgentQueryType.CHOOSE_MANEUVERS,
         payload:
         {
            pilotToManeuver: pilotToManeuver
         }
      });

      store.dispatch(XMS.ActionCreator.clearAgentQuery());
      store.dispatch(XMS.ActionCreator.setAgentResponse(agentResponse));
      const callback = store => XWingMiniaturesApp.drawView(store);
      XMM.XWingMiniaturesModel.nextGameState(
      {
         gameState: store.getState()
      }).then(callback);
   });
};

const chooseShipAction = store =>
{
   const agentQuery = store.getState().agentQuery;
   const agentId = agentQuery.agentId;
   const agentInstance = XMM.Selector.agentInstance(agentId, store.getState());
   const strategy = StrategyResolver.resolveStrategy(agentInstance.strategy);

   const pilotId = agentQuery.payload.pilotId;
   const pilotInstance = XMM.Selector.pilotInstance(pilotId, store.getState());
   const pilotName = XMV.PilotUtilities.name(pilotInstance);
   const abilities = agentQuery.payload.abilities;
   const inputAreaId = determineInputArea(agentId, store.getState());

   strategy.chooseShipAction(pilotName, abilities, inputAreaId).then(ability =>
   {
      console.log("XWingMiniaturesApp.chooseShipAction() callback ability = " + JSON.stringify(ability));
      const agentResponse = XMS.AgentResponseState.create(
      {
         agentId: agentId,
         responseKey: XMM.AgentQueryType.CHOOSE_SHIP_ACTION,
         payload:
         {
            pilotId: pilotId,
            ability: ability
         }
      });

      store.dispatch(XMS.ActionCreator.clearAgentQuery());
      store.dispatch(XMS.ActionCreator.setAgentResponse(agentResponse));
      const callback = store => XWingMiniaturesApp.drawView(store);
      XMM.XWingMiniaturesModel.nextGameState(
      {
         gameState: store.getState()
      }).then(callback);
   });
};

const chooseWeaponAndDefender = store =>
{
   const agentQuery = store.getState().agentQuery;
   const agentId = agentQuery.agentId;
   const agentInstance = XMM.Selector.agentInstance(agentId, store.getState());
   const strategy = StrategyResolver.resolveStrategy(agentInstance.strategy);

   const attackerId = agentQuery.payload.attackerId;
   const attackerInstance = XMS.Selector.pilotInstance(attackerId, store.getState());
   const weaponToRangeToDefenders0 = agentQuery.payload.weaponToRangeToDefenders;
   const weaponToRangeToDefenders = convertWeaponRangeDefenders(weaponToRangeToDefenders0, store.getState());
   const inputAreaId = determineInputArea(agentId, store.getState());

   strategy.chooseWeaponAndDefender(attackerInstance, weaponToRangeToDefenders, inputAreaId).then((
   {
      attackerId,
      weaponKey,
      defenderId
   }) =>
   {
      const agentResponse = XMS.AgentResponseState.create(
      {
         agentId: agentId,
         responseKey: XMM.AgentQueryType.CHOOSE_WEAPON_AND_DEFENDER,
         payload:
         {
            attackerId: attackerId,
            weaponKey: weaponKey,
            defenderId: defenderId
         }
      });

      store.dispatch(XMS.ActionCreator.clearAgentQuery());
      store.dispatch(XMS.ActionCreator.setAgentResponse(agentResponse));
      const callback = store => XWingMiniaturesApp.drawView(store);
      XMM.XWingMiniaturesModel.nextGameState(
      {
         gameState: store.getState()
      }).then(callback);
   });
};

const createStore = () =>
{
   const store = Redux.createStore(XMS.Reducer.root);
   const agentId1 = store.getState().nextAgentId;
   store.dispatch(XMS.ActionCreator.incrementNextAgentId());
   const agentId2 = store.getState().nextAgentId;
   store.dispatch(XMS.ActionCreator.incrementNextAgentId());
   store.dispatch(XMS.ActionCreator.setAgentInstance(XMS.AgentState.create(
   {
      id: agentId1,
      name: "Imperial Agent",
      strategy: "HumanAgentStrategy"
   })));
   store.dispatch(XMS.ActionCreator.setAgentInstance(XMS.AgentState.create(
   {
      id: agentId2,
      name: "Rebel Agent"
   })));
   const squadId1 = store.getState().nextSquadId;
   store.dispatch(XMS.ActionCreator.incrementNextSquadId());
   store.dispatch(XMS.ActionCreator.setSquadInstance(XMM.SquadBuilder.buildCoreSetImperial(store, squadId1)));
   const squadId2 = store.getState().nextSquadId;
   store.dispatch(XMS.ActionCreator.incrementNextSquadId());
   store.dispatch(XMS.ActionCreator.setSquadInstance(XMM.SquadBuilder.buildCoreSetRebel(store, squadId2)));

   store.dispatch(XMS.ActionCreator.setAgentSquad(agentId1, squadId1));
   store.dispatch(XMS.ActionCreator.setAgentSquad(agentId2, squadId2));

   store.dispatch(XMS.ActionCreator.movePilot(1, XMS.PositionState.create(
   {
      x: 915 / 3,
      y: 20,
      heading: 90
   })));
   store.dispatch(XMS.ActionCreator.movePilot(2, XMS.PositionState.create(
   {
      x: 915 * 2 / 3,
      y: 20,
      heading: 90
   })));
   store.dispatch(XMS.ActionCreator.movePilot(3, XMS.PositionState.create(
   {
      x: 915 / 2,
      // y: 915 - 20,
      y: 400,
      heading: 270
   })));

   const damageObj = XMM.DamageDeck.create(XMA.DamageCardTFA);
   store.dispatch(XMS.ActionCreator.setDamageDeck(damageObj.damageDeck));
   store.dispatch(XMS.ActionCreator.setDamageInstances(damageObj.damageInstances));

   // console.log("XWingMiniaturesApp.createGameState() gameState = \n" + JSON.stringify(store.getState(), null, "   "));

   return store;
};

const convertWeaponRangeDefenders = (weaponToRangeToDefenders, state) =>
{
   let answer = weaponToRangeToDefenders;
   const weaponKeys = Object.keys(weaponToRangeToDefenders);

   R.forEach(weaponKey =>
   {
      const rangeToDefenders = weaponToRangeToDefenders[weaponKey];
      const rangeKeys = Object.keys(rangeToDefenders);

      R.forEach(rangeKey =>
      {
         const defenderIds = rangeToDefenders[rangeKey];
         const defenderInstances = R.map(id => XMS.Selector.pilotInstance(id, state), defenderIds);
         answer = R.assocPath([weaponKey, rangeKey], defenderInstances, answer);
      }, rangeKeys);
   }, weaponKeys);

   return answer;
};

const determineInputArea = (agentId, state) =>
{
   const agentIds = R.map(agent => agent.id, XMS.Selector.agentInstances(state));
   const agentIndex = agentIds.indexOf(agentId);

   return "agentInputArea" + (agentIndex + 1);
};

const notifyDamage = store =>
{
   const agentQuery = store.getState().agentQuery;
   const agentId = agentQuery.agentId;
   const agentInstance = XMM.Selector.agentInstance(agentId, store.getState());
   const strategy = StrategyResolver.resolveStrategy(agentInstance.strategy);

   const combatId = agentQuery.payload.combatId;

   const phaseKey = XMM.Selector.phaseKey(store.getState());
   const combatInstance = XMM.Selector.combatInstance(combatId, store.getState());
   const attackerInstance = XMM.Selector.pilotInstance(combatInstance.attackerId, store.getState());
   const defenderInstance = XMM.Selector.pilotInstance(combatInstance.defenderId, store.getState());
   const inputAreaId = determineInputArea(agentId, store.getState());

   strategy.notifyDamage(
   {
      combatInstance: combatInstance,
      attackerInstance: attackerInstance,
      defenderInstance: defenderInstance,
      phaseKey: phaseKey,
      inputAreaId: inputAreaId
   }).then(() =>
   {
      const agentResponse = XMS.AgentResponseState.create(
      {
         agentId: agentId,
         responseKey: XMM.AgentQueryType.NOTIFY_DAMAGE,
         payload:
         {
            combatId: combatId
         }
      });

      store.dispatch(XMS.ActionCreator.clearAgentQuery());
      store.dispatch(XMS.ActionCreator.setAgentResponse(agentResponse));
      const callback = store => XWingMiniaturesApp.drawView(store);
      XMM.XWingMiniaturesModel.nextGameState(
      {
         gameState: store.getState()
      }).then(callback);
   });
};

XWingMiniaturesApp.initialize();

Object.freeze(XWingMiniaturesApp);

export default XWingMiniaturesApp;