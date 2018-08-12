(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
   typeof define === 'function' && define.amd ? define(factory) :
   (global.XMApp = factory());
}(this, (function () { 'use strict';

   const AgentUtilities = {};

   AgentUtilities.clearInputArea = inputAreaId => ReactDOM.render(ReactDOMFactories.span(""), document.getElementById(inputAreaId));

   AgentUtilities.notifyDamage = (
   {
      attackerInstance,
      combatInstance,
      defenderInstance,
      inputAreaId,
      phaseKey
   }) => new Promise((resolve) =>
   {
      const callback = () =>
      {
         AgentUtilities.clearInputArea(inputAreaId);
         resolve();
      };

      const dialog = React.createElement(XMV.CombatDialog,
      {
         combatInstance: combatInstance,
         attackerInstance: attackerInstance,
         defenderInstance: defenderInstance,
         phaseKey: phaseKey,
         okFunction: callback
      });

      ReactDOM.render(dialog, document.getElementById(inputAreaId));
   });

   Object.freeze(AgentUtilities);

   const HumanAgentStrategy = {};

   HumanAgentStrategy.chooseAttackDiceModification = (
   {
      abilities,
      attackerInstance,
      combatInstance,
      defenderInstance,
      inputAreaId,
      phaseKey
   }) => new Promise((resolve) =>
   {
      const callback = ability =>
      {
         resolve(ability);
      };

      const dialog = React.createElement(XMV.CombatDialog,
      {
         abilities: abilities,
         attackerInstance: attackerInstance,
         combatInstance: combatInstance,
         defenderInstance: defenderInstance,
         okFunction: callback,
         phaseKey: phaseKey
      });

      ReactDOM.render(dialog, document.getElementById(inputAreaId));
   });

   HumanAgentStrategy.chooseDefenseDiceModification = (
   {
      abilities,
      attackerInstance,
      combatInstance,
      defenderInstance,
      inputAreaId,
      phaseKey
   }) => new Promise((resolve) =>
   {
      const callback = (ability) =>
      {
         resolve(ability);
      };

      const dialog = React.createElement(XMV.CombatDialog,
      {
         abilities: abilities,
         attackerInstance: attackerInstance,
         combatInstance: combatInstance,
         defenderInstance: defenderInstance,
         okFunction: callback,
         phaseKey: phaseKey
      });

      ReactDOM.render(dialog, document.getElementById(inputAreaId));
   });

   HumanAgentStrategy.chooseManeuvers = (pilotInstances, pilotToValidManeuvers, inputAreaId) => new Promise((resolve) =>
   {
      const callback = (
      {
         pilotToManeuver
      }) =>
      {
         AgentUtilities.clearInputArea(inputAreaId);
         resolve(pilotToManeuver);
      };

      const dialog = React.createElement(XMV.PlanningDialog,
      {
         pilotInstances: pilotInstances,
         pilotToValidManeuvers,
         callback: callback
      });

      ReactDOM.render(dialog, document.getElementById(inputAreaId));
   });

   HumanAgentStrategy.chooseShipAction = (activePilotName, abilities, inputAreaId) => new Promise((resolve) =>
   {
      const callback = ability =>
      {
         AgentUtilities.clearInputArea(inputAreaId);
         resolve(ability);
      };

      const dialog = React.createElement(XMV.AbilityDialog,
      {
         abilities: abilities,
         activePilotName: activePilotName,
         onChange: callback
      });

      ReactDOM.render(dialog, document.getElementById(inputAreaId));
   });

   HumanAgentStrategy.chooseWeaponAndDefender = (attackerInstance, weaponToRangeToDefenders, inputAreaId) => new Promise((resolve) =>
   {
      const weaponKeys = Object.keys(weaponToRangeToDefenders);

      if (weaponKeys.length > 0)
      {
         const callback = (
         {
            attackerId,
            weaponKey,
            defenderId
         }) =>
         {
            AgentUtilities.clearInputArea(inputAreaId);
            resolve(
            {
               attackerId: attackerId,
               weaponKey: weaponKey,
               defenderId: defenderId
            });
         };

         const dialog = React.createElement(XMV.WeaponAndDefenderDialog,
         {
            attackerInstance: attackerInstance,
            callback: callback,
            weaponToRangeToDefenders: weaponToRangeToDefenders
         });

         ReactDOM.render(dialog, document.getElementById(inputAreaId));
      }
      else
      {
         resolve(
         {});
      }
   });

   HumanAgentStrategy.notifyDamage = props => AgentUtilities.notifyDamage(props);

   Object.freeze(HumanAgentStrategy);

   const SimpleAgentStrategy = {};

   SimpleAgentStrategy.chooseAttackDiceModification = (
   {
      abilities = []
   }) => new Promise((resolve) =>
   {
      resolve(randomElement(abilities));
   });

   SimpleAgentStrategy.chooseDefenseDiceModification = (
   {
      abilities = []
   }) => new Promise((resolve) =>
   {
      resolve(randomElement(abilities));
   });

   SimpleAgentStrategy.chooseManeuvers = (pilotInstances, pilotToValidManeuvers /*, inputAreaId*/ ) => new Promise((resolve) =>
   {
      const pilotIds = Object.keys(pilotToValidManeuvers);
      const reduceFunction = (accumulator, pilotId) =>
      {
         const maneuverKeys = pilotToValidManeuvers[pilotId];
         return R.assoc(pilotId, randomElement(maneuverKeys), accumulator);
      };
      const pilotToManeuver = R.reduce(reduceFunction,
      {})(pilotIds);

      resolve(pilotToManeuver);
   });

   SimpleAgentStrategy.chooseShipAction = (pilotName, abilities = [] /*, inputAreaId*/ ) => new Promise((resolve) =>
   {
      resolve(randomElement(abilities));
   });

   SimpleAgentStrategy.chooseWeaponAndDefender = (attackerInstance, weaponToRangeToDefenders /*, inputAreaId*/ ) => new Promise((resolve) =>
   {
      let weaponKey, defenderId;
      const weaponKeys = Object.keys(weaponToRangeToDefenders);

      if (weaponKeys.length > 0)
      {
         weaponKey = randomElement(weaponKeys);

         const rangeToDefenders = weaponToRangeToDefenders[weaponKey];
         const rangeKeys = Object.keys(rangeToDefenders);

         if (rangeKeys.length > 0)
         {
            const rangeKey = randomElement(rangeKeys);
            const defenders = rangeToDefenders[rangeKey];

            if (defenders.length > 0)
            {
               const defender = randomElement(defenders);
               defenderId = defender.id;
            }
         }
      }

      resolve(
      {
         attackerId: attackerInstance.id,
         weaponKey: weaponKey,
         defenderId: defenderId
      });
   });

   SimpleAgentStrategy.notifyDamage = props => AgentUtilities.notifyDamage(props);

   const randomElement = array => array[Math.floor(Math.random() * array.length)];

   Object.freeze(SimpleAgentStrategy);

   const MediumAgentStrategy = {};

   MediumAgentStrategy.chooseAttackDiceModification = (
   {
      abilities
   }) => new Promise((resolve) =>
   {
      resolve(SimpleAgentStrategy.chooseAttackDiceModification(
      {
         abilities: abilities
      }));
   });

   MediumAgentStrategy.chooseDefenseDiceModification = (
   {
      abilities
   }) => new Promise((resolve) =>
   {
      resolve(SimpleAgentStrategy.chooseDefenseDiceModification(
      {
         abilities: abilities
      }));
   });

   MediumAgentStrategy.chooseManeuvers = (pilotInstances, pilotToValidManeuvers, inputAreaId) => new Promise((resolve) =>
   {
      resolve(SimpleAgentStrategy.chooseManeuvers(pilotInstances, pilotToValidManeuvers, inputAreaId));
   });

   MediumAgentStrategy.chooseShipAction = (pilotName, abilities, inputAreaId) => new Promise((resolve) =>
   {
      resolve(SimpleAgentStrategy.chooseShipAction(pilotName, abilities, inputAreaId));
   });

   MediumAgentStrategy.chooseWeaponAndDefender = (attackerInstance, weaponToRangeToDefenders /*, inputAreaId*/ ) => new Promise((resolve) =>
   {
      let weaponKey0, rangeKey0, defenderId0;
      const weaponKeys = Object.keys(weaponToRangeToDefenders);

      R.forEach(weaponKey =>
      {
         const rangeToDefenders = weaponToRangeToDefenders[weaponKey];
         const rangeDefender = chooseClosestDefender(rangeToDefenders);
         const range0 = XMA.Selector.range(rangeKey0);
         const range = XMA.Selector.range(rangeDefender.rangeKey);

         if (rangeKey0 === undefined || range.maxDistance < range0.maxDistance)
         {
            weaponKey0 = weaponKey;
            rangeKey0 = rangeDefender.rangeKey;
            defenderId0 = rangeDefender.defenderId;
         }
      }, weaponKeys);

      resolve(
      {
         attackerId: attackerInstance.id,
         weaponKey: weaponKey0,
         defenderId: defenderId0
      });
   });

   MediumAgentStrategy.notifyDamage = () => new Promise((resolve) =>
   {
      resolve();
   });

   MediumAgentStrategy.notifyDamage = props => AgentUtilities.notifyDamage(props);

   const chooseClosestDefender = rangeToDefenders =>
   {
      let rangeKey, defender;

      if (rangeToDefenders !== undefined)
      {
         rangeKey = XMA.Range.ONE;
         const defenders = rangeToDefenders[rangeKey];
         defender = (defenders !== undefined && defenders.length > 0 ? randomElement$1(defenders) : undefined);

         if (defender === undefined)
         {
            rangeKey = XMA.Range.TWO;
            const defenders = rangeToDefenders[rangeKey];
            defender = (defenders !== undefined && defenders.length > 0 ? randomElement$1(defenders) : undefined);
         }

         if (defender === undefined)
         {
            rangeKey = XMA.Range.THREE;
            const defenders = rangeToDefenders[rangeKey];
            defender = (defenders !== undefined && defenders.length > 0 ? randomElement$1(defenders) : undefined);
         }
      }

      return {
         rangeKey: rangeKey,
         defenderId: (defender !== undefined ? defender.id : undefined)
      };
   };

   const randomElement$1 = array => array[Math.floor(Math.random() * array.length)];

   Object.freeze(MediumAgentStrategy);

   const StrategyResolver = {};

   StrategyResolver.clearInputArea = inputAreaId => ReactDOM.render(ReactDOMFactories.span(""), document.getElementById(inputAreaId));

   StrategyResolver.resolveStrategy = strategyName =>
      R.cond([
       [R.equals("HumanAgentStrategy"), R.always(HumanAgentStrategy)],
       [R.equals("MediumAgentStrategy"), R.always(MediumAgentStrategy)],
       [R.equals("SimpleAgentStrategy"), R.always(SimpleAgentStrategy)],
       [R.T, name => console.error("Unknown agent strategy " + name)]
      ])(strategyName);

   Object.freeze(StrategyResolver);

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

   return XWingMiniaturesApp;

})));
