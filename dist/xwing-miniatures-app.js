(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.XMApp = factory());
}(this, (function () { 'use strict';

  const AgentUtilities = {};

  AgentUtilities.clearInputArea = inputAreaId => {
    ReactDOM.render(ReactDOMFactories.span(""), document.getElementById(inputAreaId));
  };

  AgentUtilities.notifyDamage = ({
    attackerInstance,
    combatInstance,
    defenderInstance,
    inputAreaId,
    phaseKey
  }) =>
    new Promise(resolve => {
      const callback = () => {
        AgentUtilities.clearInputArea(inputAreaId);
        resolve();
      };

      const dialog = React.createElement(XMV.CombatDialog, {
        combatInstance,
        attackerInstance,
        defenderInstance,
        phaseKey,
        okFunction: callback
      });

      ReactDOM.render(dialog, document.getElementById(inputAreaId));
    });

  Object.freeze(AgentUtilities);

  const HumanAgentStrategy = {};

  HumanAgentStrategy.chooseAttackDiceModification = ({
    abilities,
    attackerInstance,
    combatInstance,
    defenderInstance,
    inputAreaId,
    phaseKey
  }) =>
    new Promise(resolve => {
      const callback = ability => {
        resolve(ability);
      };

      const dialog = React.createElement(XMV.CombatDialog, {
        abilities,
        attackerInstance,
        combatInstance,
        defenderInstance,
        okFunction: callback,
        phaseKey
      });

      ReactDOM.render(dialog, document.getElementById(inputAreaId));
    });

  HumanAgentStrategy.chooseDefenseDiceModification = ({
    abilities,
    attackerInstance,
    combatInstance,
    defenderInstance,
    inputAreaId,
    phaseKey
  }) =>
    new Promise(resolve => {
      const callback = ability => {
        resolve(ability);
      };

      const dialog = React.createElement(XMV.CombatDialog, {
        abilities,
        attackerInstance,
        combatInstance,
        defenderInstance,
        okFunction: callback,
        phaseKey
      });

      ReactDOM.render(dialog, document.getElementById(inputAreaId));
    });

  HumanAgentStrategy.chooseManeuvers = (pilotInstances, pilotToValidManeuvers, inputAreaId) =>
    new Promise(resolve => {
      const callback = ({ pilotToManeuver }) => {
        AgentUtilities.clearInputArea(inputAreaId);
        resolve(pilotToManeuver);
      };

      const dialog = React.createElement(XMV.PlanningDialog, {
        pilotInstances,
        pilotToValidManeuvers,
        callback
      });

      ReactDOM.render(dialog, document.getElementById(inputAreaId));
    });

  HumanAgentStrategy.chooseShipAction = (activePilotName, abilities, inputAreaId) =>
    new Promise(resolve => {
      const callback = ability => {
        AgentUtilities.clearInputArea(inputAreaId);
        resolve(ability);
      };

      const dialog = React.createElement(XMV.AbilityDialog, {
        abilities,
        activePilotName,
        onChange: callback
      });

      ReactDOM.render(dialog, document.getElementById(inputAreaId));
    });

  HumanAgentStrategy.chooseWeaponAndDefender = (
    attackerInstance,
    weaponToRangeToDefenders,
    inputAreaId
  ) =>
    new Promise(resolve => {
      const weaponKeys = Object.keys(weaponToRangeToDefenders);

      if (weaponKeys.length > 0) {
        const callback = ({ attackerId, weaponKey, defenderId }) => {
          AgentUtilities.clearInputArea(inputAreaId);
          resolve({
            attackerId,
            weaponKey,
            defenderId
          });
        };

        const dialog = React.createElement(XMV.WeaponAndDefenderDialog, {
          attackerInstance,
          callback,
          weaponToRangeToDefenders
        });

        ReactDOM.render(dialog, document.getElementById(inputAreaId));
      } else {
        resolve({});
      }
    });

  HumanAgentStrategy.notifyDamage = props => AgentUtilities.notifyDamage(props);

  Object.freeze(HumanAgentStrategy);

  const SimpleAgentStrategy = {};

  const randomElement = array => array[Math.floor(Math.random() * array.length)];

  SimpleAgentStrategy.chooseAttackDiceModification = ({ abilities = [] }) =>
    new Promise(resolve => {
      resolve(randomElement(abilities));
    });

  SimpleAgentStrategy.chooseDefenseDiceModification = ({ abilities = [] }) =>
    new Promise(resolve => {
      resolve(randomElement(abilities));
    });

  SimpleAgentStrategy.chooseManeuvers = (pilotInstances, pilotToValidManeuvers /* , inputAreaId */) =>
    new Promise(resolve => {
      const pilotIds = Object.keys(pilotToValidManeuvers);
      const reduceFunction = (accumulator, pilotId) => {
        const maneuverKeys = pilotToValidManeuvers[pilotId];
        return R.assoc(pilotId, randomElement(maneuverKeys), accumulator);
      };
      const pilotToManeuver = R.reduce(reduceFunction, {})(pilotIds);

      resolve(pilotToManeuver);
    });

  SimpleAgentStrategy.chooseShipAction = (pilotName, abilities = [] /* , inputAreaId */) =>
    new Promise(resolve => {
      resolve(randomElement(abilities));
    });

  SimpleAgentStrategy.chooseWeaponAndDefender = (
    attackerInstance,
    weaponToRangeToDefenders /* , inputAreaId */
  ) =>
    new Promise(resolve => {
      let weaponKey;
      let defenderId;
      const weaponKeys = Object.keys(weaponToRangeToDefenders);

      if (weaponKeys.length > 0) {
        weaponKey = randomElement(weaponKeys);

        const rangeToDefenders = weaponToRangeToDefenders[weaponKey];
        const rangeKeys = Object.keys(rangeToDefenders);

        if (rangeKeys.length > 0) {
          const rangeKey = randomElement(rangeKeys);
          const defenders = rangeToDefenders[rangeKey];

          if (defenders.length > 0) {
            const defender = randomElement(defenders);
            defenderId = defender.id;
          }
        }
      }

      resolve({
        attackerId: attackerInstance.id,
        weaponKey,
        defenderId
      });
    });

  SimpleAgentStrategy.notifyDamage = props => AgentUtilities.notifyDamage(props);

  Object.freeze(SimpleAgentStrategy);

  const MediumAgentStrategy = {};

  const randomElement$1 = array => array[Math.floor(Math.random() * array.length)];

  const chooseClosestDefender = rangeToDefenders => {
    let rangeKey;
    let defender;

    if (rangeToDefenders !== undefined) {
      rangeKey = XMA.Range.ONE;
      const defenders1 = rangeToDefenders[rangeKey];
      defender =
        defenders1 !== undefined && defenders1.length > 0 ? randomElement$1(defenders1) : undefined;

      if (defender === undefined) {
        rangeKey = XMA.Range.TWO;
        const defenders2 = rangeToDefenders[rangeKey];
        defender =
          defenders2 !== undefined && defenders2.length > 0 ? randomElement$1(defenders2) : undefined;
      }

      if (defender === undefined) {
        rangeKey = XMA.Range.THREE;
        const defenders3 = rangeToDefenders[rangeKey];
        defender =
          defenders3 !== undefined && defenders3.length > 0 ? randomElement$1(defenders3) : undefined;
      }
    }

    return {
      rangeKey,
      defenderId: defender !== undefined ? defender.id : undefined
    };
  };

  // /////////////////////////////////////////////////////////////////////////////////////////////////
  MediumAgentStrategy.chooseAttackDiceModification = ({ abilities }) =>
    new Promise(resolve => {
      resolve(
        SimpleAgentStrategy.chooseAttackDiceModification({
          abilities
        })
      );
    });

  MediumAgentStrategy.chooseDefenseDiceModification = ({ abilities }) =>
    new Promise(resolve => {
      resolve(
        SimpleAgentStrategy.chooseDefenseDiceModification({
          abilities
        })
      );
    });

  MediumAgentStrategy.chooseManeuvers = (pilotInstances, pilotToValidManeuvers, inputAreaId) =>
    new Promise(resolve => {
      resolve(
        SimpleAgentStrategy.chooseManeuvers(pilotInstances, pilotToValidManeuvers, inputAreaId)
      );
    });

  MediumAgentStrategy.chooseShipAction = (pilotName, abilities, inputAreaId) =>
    new Promise(resolve => {
      resolve(SimpleAgentStrategy.chooseShipAction(pilotName, abilities, inputAreaId));
    });

  MediumAgentStrategy.chooseWeaponAndDefender = (
    attackerInstance,
    weaponToRangeToDefenders /* , inputAreaId */
  ) =>
    new Promise(resolve => {
      let weaponKey0;
      let rangeKey0;
      let defenderId0;
      const weaponKeys = Object.keys(weaponToRangeToDefenders);

      R.forEach(weaponKey => {
        const rangeToDefenders = weaponToRangeToDefenders[weaponKey];
        const rangeDefender = chooseClosestDefender(rangeToDefenders);
        const range0 = XMA.Selector.range(rangeKey0);
        const range = XMA.Selector.range(rangeDefender.rangeKey);

        if (rangeKey0 === undefined || range.maxDistance < range0.maxDistance) {
          weaponKey0 = weaponKey;
          rangeKey0 = rangeDefender.rangeKey;
          defenderId0 = rangeDefender.defenderId;
        }
      }, weaponKeys);

      resolve({
        attackerId: attackerInstance.id,
        weaponKey: weaponKey0,
        defenderId: defenderId0
      });
    });

  MediumAgentStrategy.notifyDamage = () =>
    new Promise(resolve => {
      resolve();
    });

  MediumAgentStrategy.notifyDamage = props => AgentUtilities.notifyDamage(props);

  Object.freeze(MediumAgentStrategy);

  /* eslint no-console: ["error", { allow: ["error"] }] */

  const StrategyResolver = {};

  StrategyResolver.clearInputArea = inputAreaId => {
    ReactDOM.render(ReactDOMFactories.span(""), document.getElementById(inputAreaId));
  };

  StrategyResolver.resolveStrategy = strategyName =>
    R.cond([
      [R.equals("HumanAgentStrategy"), R.always(HumanAgentStrategy)],
      [R.equals("MediumAgentStrategy"), R.always(MediumAgentStrategy)],
      [R.equals("SimpleAgentStrategy"), R.always(SimpleAgentStrategy)],
      [R.T, name => console.error(`Unknown agent strategy ${name}`)]
    ])(strategyName);

  Object.freeze(StrategyResolver);

  /* eslint no-console: ["error", { allow: ["log"] }] */

  const { ActionCreator, AgentResponseState, AgentState, PositionState, Reducer } = XMS;
  const { AgentQueryType } = XMM;

  const XWingMiniaturesApp = {};

  const DELAY = 500;
  const LOCAL_RESOURCE = "../../view/resource/";

  const convertWeaponRangeDefenders = (weaponToRangeToDefenders, state) => {
    let answer = weaponToRangeToDefenders;
    const weaponKeys = Object.keys(weaponToRangeToDefenders);

    R.forEach(weaponKey => {
      const rangeToDefenders = weaponToRangeToDefenders[weaponKey];
      const rangeKeys = Object.keys(rangeToDefenders);

      R.forEach(rangeKey => {
        const defenderIds = rangeToDefenders[rangeKey];
        const defenderInstances = R.map(id => XMS.Selector.pilotInstance(id, state), defenderIds);
        answer = R.assocPath([weaponKey, rangeKey], defenderInstances, answer);
      }, rangeKeys);
    }, weaponKeys);

    return answer;
  };

  const determineInputArea = (agentId, state) => {
    const agentIds = R.map(agent => agent.id, XMS.Selector.agentInstances(state));
    const agentIndex = agentIds.indexOf(agentId);

    return `agentInputArea${agentIndex + 1}`;
  };

  const chooseAttackDiceModification = store => {
    const { agentQuery } = store.getState();
    const { agentId } = agentQuery;
    const agentInstance = XMM.Selector.agentInstance(agentId, store.getState());
    const strategy = StrategyResolver.resolveStrategy(agentInstance.strategy);

    const { abilities, combatId } = agentQuery.payload;

    const phaseKey = XMM.Selector.phaseKey(store.getState());
    const combatInstance = XMM.Selector.combatInstance(combatId, store.getState());
    const attackerInstance = XMM.Selector.pilotInstance(combatInstance.attackerId, store.getState());
    const defenderInstance = XMM.Selector.pilotInstance(combatInstance.defenderId, store.getState());
    const inputAreaId = determineInputArea(agentId, store.getState());

    strategy
      .chooseAttackDiceModification({
        abilities,
        attackerInstance,
        combatInstance,
        defenderInstance,
        inputAreaId,
        phaseKey
      })
      .then(ability => {
        const agentResponse = AgentResponseState.create({
          agentId,
          responseKey: AgentQueryType.CHOOSE_ATTACK_DICE_MODIFICATION,
          payload: { pilotId: attackerInstance.id, ability }
        });

        store.dispatch(ActionCreator.clearAgentQuery());
        store.dispatch(ActionCreator.setAgentResponse(agentResponse));
        const callback = store2 => XWingMiniaturesApp.drawView(store2);
        XMM.XWingMiniaturesModel.nextGameState({
          gameState: store.getState()
        }).then(callback);
      });
  };

  const chooseDefenseDiceModification = store => {
    const { agentQuery } = store.getState();
    const { agentId } = agentQuery;
    const agentInstance = XMM.Selector.agentInstance(agentId, store.getState());
    const strategy = StrategyResolver.resolveStrategy(agentInstance.strategy);

    const { abilities, combatId } = agentQuery.payload;

    const phaseKey = XMM.Selector.phaseKey(store.getState());
    const combatInstance = XMM.Selector.combatInstance(combatId, store.getState());
    const attackerInstance = XMM.Selector.pilotInstance(combatInstance.attackerId, store.getState());
    const defenderInstance = XMM.Selector.pilotInstance(combatInstance.defenderId, store.getState());
    const inputAreaId = determineInputArea(agentId, store.getState());

    strategy
      .chooseDefenseDiceModification({
        abilities,
        attackerInstance,
        combatInstance,
        defenderInstance,
        inputAreaId,
        phaseKey
      })
      .then(ability => {
        const agentResponse = AgentResponseState.create({
          agentId,
          responseKey: AgentQueryType.CHOOSE_DEFENSE_DICE_MODIFICATION,
          payload: { pilotId: defenderInstance.id, ability }
        });

        store.dispatch(ActionCreator.clearAgentQuery());
        store.dispatch(ActionCreator.setAgentResponse(agentResponse));
        const callback = store2 => XWingMiniaturesApp.drawView(store2);
        XMM.XWingMiniaturesModel.nextGameState({
          gameState: store.getState()
        }).then(callback);
      });
  };

  const chooseManeuvers = store => {
    const { agentQuery } = store.getState();
    const { agentId } = agentQuery;
    const agentInstance = XMM.Selector.agentInstance(agentQuery.agentId, store.getState());
    const strategy = StrategyResolver.resolveStrategy(agentInstance.strategy);

    const pilotInstances = XMM.Selector.pilotInstancesByAgent(agentId, store.getState());
    const { pilotToValidManeuvers } = agentQuery.payload;
    const inputAreaId = determineInputArea(agentId, store.getState());

    strategy
      .chooseManeuvers(pilotInstances, pilotToValidManeuvers, inputAreaId)
      .then(pilotToManeuver => {
        const agentResponse = AgentResponseState.create({
          agentId,
          responseKey: AgentQueryType.CHOOSE_MANEUVERS,
          payload: { pilotToManeuver }
        });

        store.dispatch(ActionCreator.clearAgentQuery());
        store.dispatch(ActionCreator.setAgentResponse(agentResponse));
        const callback = store2 => XWingMiniaturesApp.drawView(store2);
        XMM.XWingMiniaturesModel.nextGameState({ gameState: store.getState() }).then(callback);
      });
  };

  const chooseShipAction = store => {
    const { agentQuery } = store.getState();
    const { agentId } = agentQuery;
    const agentInstance = XMM.Selector.agentInstance(agentId, store.getState());
    const strategy = StrategyResolver.resolveStrategy(agentInstance.strategy);

    const { abilities, pilotId } = agentQuery.payload;
    const pilotInstance = XMM.Selector.pilotInstance(pilotId, store.getState());
    const pilotName = XMV.PilotUtilities.name(pilotInstance);
    const inputAreaId = determineInputArea(agentId, store.getState());

    strategy.chooseShipAction(pilotName, abilities, inputAreaId).then(ability => {
      console.log(
        `XWingMiniaturesApp.chooseShipAction() callback ability = ${JSON.stringify(ability)}`
      );
      const agentResponse = AgentResponseState.create({
        agentId,
        responseKey: AgentQueryType.CHOOSE_SHIP_ACTION,
        payload: { pilotId, ability }
      });

      store.dispatch(ActionCreator.clearAgentQuery());
      store.dispatch(ActionCreator.setAgentResponse(agentResponse));
      const callback = store2 => XWingMiniaturesApp.drawView(store2);
      XMM.XWingMiniaturesModel.nextGameState({ gameState: store.getState() }).then(callback);
    });
  };

  const chooseWeaponAndDefender = store => {
    const { agentQuery } = store.getState();
    const { agentId } = agentQuery;
    const agentInstance = XMM.Selector.agentInstance(agentId, store.getState());
    const strategy = StrategyResolver.resolveStrategy(agentInstance.strategy);

    const { attackerId } = agentQuery.payload;
    const attackerInstance = XMS.Selector.pilotInstance(attackerId, store.getState());
    const weaponToRangeToDefenders0 = agentQuery.payload.weaponToRangeToDefenders;
    const weaponToRangeToDefenders = convertWeaponRangeDefenders(
      weaponToRangeToDefenders0,
      store.getState()
    );
    const inputAreaId = determineInputArea(agentId, store.getState());

    strategy
      .chooseWeaponAndDefender(attackerInstance, weaponToRangeToDefenders, inputAreaId)
      .then(({ attackerId2, weaponKey, defenderId }) => {
        const agentResponse = AgentResponseState.create({
          agentId,
          responseKey: AgentQueryType.CHOOSE_WEAPON_AND_DEFENDER,
          payload: { attackerId: attackerId2, weaponKey, defenderId }
        });

        store.dispatch(ActionCreator.clearAgentQuery());
        store.dispatch(ActionCreator.setAgentResponse(agentResponse));
        const callback = store2 => XWingMiniaturesApp.drawView(store2);
        XMM.XWingMiniaturesModel.nextGameState({ gameState: store.getState() }).then(callback);
      });
  };

  const createStore = () => {
    const store = Redux.createStore(Reducer.root);
    const agentId1 = XMS.Selector.nextAgentId(store.getState());
    store.dispatch(
      ActionCreator.setAgentInstance(
        AgentState.create({ id: agentId1, name: "Imperial Agent", strategy: "HumanAgentStrategy" })
      )
    );
    const agentId2 = XMS.Selector.nextAgentId(store.getState());
    store.dispatch(
      ActionCreator.setAgentInstance(AgentState.create({ id: agentId2, name: "Rebel Agent" }))
    );
    const squadId1 = XMS.Selector.nextSquadId(store.getState());
    store.dispatch(
      ActionCreator.setSquadInstance(XMM.SquadBuilder.buildCoreSetImperial(store, squadId1))
    );
    const squadId2 = XMS.Selector.nextSquadId(store.getState());
    store.dispatch(
      ActionCreator.setSquadInstance(XMM.SquadBuilder.buildCoreSetRebel(store, squadId2))
    );

    store.dispatch(ActionCreator.setAgentSquad(agentId1, squadId1));
    store.dispatch(ActionCreator.setAgentSquad(agentId2, squadId2));

    store.dispatch(
      ActionCreator.movePilot(1, PositionState.create({ x: 915 / 3, y: 20, heading: 90 }))
    );
    store.dispatch(
      ActionCreator.movePilot(2, PositionState.create({ x: (915 * 2) / 3, y: 20, heading: 90 }))
    );
    store.dispatch(
      ActionCreator.movePilot(3, PositionState.create({ x: 915 / 2, y: 400, heading: 270 }))
    );

    const damageObj = XMM.DamageDeck.create(XMA.DamageCardTFA);
    store.dispatch(ActionCreator.setDamageDeck(damageObj.damageDeck));
    store.dispatch(ActionCreator.setDamageInstances(damageObj.damageInstances));

    // console.log("XWingMiniaturesApp.createGameState() gameState = \n" +
    //  JSON.stringify(store.getState(), null, "   "));

    return store;
  };

  const notifyDamage = store => {
    const { agentQuery } = store.getState();
    const { agentId } = agentQuery;
    const agentInstance = XMM.Selector.agentInstance(agentId, store.getState());
    const strategy = StrategyResolver.resolveStrategy(agentInstance.strategy);

    const { combatId } = agentQuery.payload;

    const phaseKey = XMM.Selector.phaseKey(store.getState());
    const combatInstance = XMM.Selector.combatInstance(combatId, store.getState());
    const attackerInstance = XMM.Selector.pilotInstance(combatInstance.attackerId, store.getState());
    const defenderInstance = XMM.Selector.pilotInstance(combatInstance.defenderId, store.getState());
    const inputAreaId = determineInputArea(agentId, store.getState());

    strategy
      .notifyDamage({
        combatInstance,
        attackerInstance,
        defenderInstance,
        phaseKey,
        inputAreaId
      })
      .then(() => {
        const agentResponse = AgentResponseState.create({
          agentId,
          responseKey: AgentQueryType.NOTIFY_DAMAGE,
          payload: { combatId }
        });

        store.dispatch(ActionCreator.clearAgentQuery());
        store.dispatch(ActionCreator.setAgentResponse(agentResponse));
        const callback = store2 => XWingMiniaturesApp.drawView(store2);
        XMM.XWingMiniaturesModel.nextGameState({ gameState: store.getState() }).then(callback);
      });
  };

  // /////////////////////////////////////////////////////////////////////////////////////////////////
  XWingMiniaturesApp.initialize = () => {
    const store = createStore();
    XWingMiniaturesApp.drawView(store);
  };

  XWingMiniaturesApp.drawView = store => {
    XMV.XWingMiniaturesView.drawView({
      gameState: store.getState(),
      document,
      resourceBase: LOCAL_RESOURCE
    });

    setTimeout(() => XWingMiniaturesApp.nextGameState(store), DELAY);
  };

  XWingMiniaturesApp.nextGameState = store => {
    const { agentQuery } = store.getState();

    if (agentQuery !== undefined) {
      if (agentQuery.queryKey === AgentQueryType.CHOOSE_MANEUVERS) {
        chooseManeuvers(store);
        return;
      }
      if (agentQuery.queryKey === AgentQueryType.CHOOSE_SHIP_ACTION) {
        chooseShipAction(store);
        return;
      }
      if (agentQuery.queryKey === AgentQueryType.CHOOSE_WEAPON_AND_DEFENDER) {
        chooseWeaponAndDefender(store);
        return;
      }
      if (agentQuery.queryKey === AgentQueryType.CHOOSE_ATTACK_DICE_MODIFICATION) {
        chooseAttackDiceModification(store);
        return;
      }
      if (agentQuery.queryKey === AgentQueryType.CHOOSE_DEFENSE_DICE_MODIFICATION) {
        chooseDefenseDiceModification(store);
        return;
      }
      if (agentQuery.queryKey === AgentQueryType.NOTIFY_DAMAGE) {
        notifyDamage(store);
        return;
      }
    }

    const callback = store2 => XWingMiniaturesApp.drawView(store2);
    XMM.XWingMiniaturesModel.nextGameState({ gameState: store.getState() }).then(callback);
  };

  XWingMiniaturesApp.initialize();

  Object.freeze(XWingMiniaturesApp);

  return XWingMiniaturesApp;

})));
