/* eslint no-console: ["error", { allow: ["log"] }] */

import StrategyResolver from "./StrategyResolver.js";

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
      const agentResponse = XMS.AgentResponseState.create({
        agentId,
        responseKey: XMM.AgentQueryType.CHOOSE_ATTACK_DICE_MODIFICATION,
        payload: {
          pilotId: attackerInstance.id,
          ability
        }
      });

      store.dispatch(XMS.ActionCreator.clearAgentQuery());
      store.dispatch(XMS.ActionCreator.setAgentResponse(agentResponse));
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
      const agentResponse = XMS.AgentResponseState.create({
        agentId,
        responseKey: XMM.AgentQueryType.CHOOSE_DEFENSE_DICE_MODIFICATION,
        payload: {
          pilotId: defenderInstance.id,
          ability
        }
      });

      store.dispatch(XMS.ActionCreator.clearAgentQuery());
      store.dispatch(XMS.ActionCreator.setAgentResponse(agentResponse));
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
      const agentResponse = XMS.AgentResponseState.create({
        agentId,
        responseKey: XMM.AgentQueryType.CHOOSE_MANEUVERS,
        payload: {
          pilotToManeuver
        }
      });

      store.dispatch(XMS.ActionCreator.clearAgentQuery());
      store.dispatch(XMS.ActionCreator.setAgentResponse(agentResponse));
      const callback = store2 => XWingMiniaturesApp.drawView(store2);
      XMM.XWingMiniaturesModel.nextGameState({
        gameState: store.getState()
      }).then(callback);
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
    const agentResponse = XMS.AgentResponseState.create({
      agentId,
      responseKey: XMM.AgentQueryType.CHOOSE_SHIP_ACTION,
      payload: {
        pilotId,
        ability
      }
    });

    store.dispatch(XMS.ActionCreator.clearAgentQuery());
    store.dispatch(XMS.ActionCreator.setAgentResponse(agentResponse));
    const callback = store2 => XWingMiniaturesApp.drawView(store2);
    XMM.XWingMiniaturesModel.nextGameState({
      gameState: store.getState()
    }).then(callback);
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
      const agentResponse = XMS.AgentResponseState.create({
        agentId,
        responseKey: XMM.AgentQueryType.CHOOSE_WEAPON_AND_DEFENDER,
        payload: {
          attackerId: attackerId2,
          weaponKey,
          defenderId
        }
      });

      store.dispatch(XMS.ActionCreator.clearAgentQuery());
      store.dispatch(XMS.ActionCreator.setAgentResponse(agentResponse));
      const callback = store2 => XWingMiniaturesApp.drawView(store2);
      XMM.XWingMiniaturesModel.nextGameState({
        gameState: store.getState()
      }).then(callback);
    });
};

const createStore = () => {
  const store = Redux.createStore(XMS.Reducer.root);
  const agentId1 = XMS.Selector.nextAgentId(store.getState());
  store.dispatch(
    XMS.ActionCreator.setAgentInstance(
      XMS.AgentState.create({
        id: agentId1,
        name: "Imperial Agent",
        strategy: "HumanAgentStrategy"
      })
    )
  );
  const agentId2 = XMS.Selector.nextAgentId(store.getState());
  store.dispatch(
    XMS.ActionCreator.setAgentInstance(
      XMS.AgentState.create({
        id: agentId2,
        name: "Rebel Agent"
      })
    )
  );
  const squadId1 = XMS.Selector.nextSquadId(store.getState());
  store.dispatch(
    XMS.ActionCreator.setSquadInstance(XMM.SquadBuilder.buildCoreSetImperial(store, squadId1))
  );
  const squadId2 = XMS.Selector.nextSquadId(store.getState());
  store.dispatch(
    XMS.ActionCreator.setSquadInstance(XMM.SquadBuilder.buildCoreSetRebel(store, squadId2))
  );

  store.dispatch(XMS.ActionCreator.setAgentSquad(agentId1, squadId1));
  store.dispatch(XMS.ActionCreator.setAgentSquad(agentId2, squadId2));

  store.dispatch(
    XMS.ActionCreator.movePilot(
      1,
      XMS.PositionState.create({
        x: 915 / 3,
        y: 20,
        heading: 90
      })
    )
  );
  store.dispatch(
    XMS.ActionCreator.movePilot(
      2,
      XMS.PositionState.create({
        x: (915 * 2) / 3,
        y: 20,
        heading: 90
      })
    )
  );
  store.dispatch(
    XMS.ActionCreator.movePilot(
      3,
      XMS.PositionState.create({
        x: 915 / 2,
        // y: 915 - 20,
        y: 400,
        heading: 270
      })
    )
  );

  const damageObj = XMM.DamageDeck.create(XMA.DamageCardTFA);
  store.dispatch(XMS.ActionCreator.setDamageDeck(damageObj.damageDeck));
  store.dispatch(XMS.ActionCreator.setDamageInstances(damageObj.damageInstances));

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
      const agentResponse = XMS.AgentResponseState.create({
        agentId,
        responseKey: XMM.AgentQueryType.NOTIFY_DAMAGE,
        payload: {
          combatId
        }
      });

      store.dispatch(XMS.ActionCreator.clearAgentQuery());
      store.dispatch(XMS.ActionCreator.setAgentResponse(agentResponse));
      const callback = store2 => XWingMiniaturesApp.drawView(store2);
      XMM.XWingMiniaturesModel.nextGameState({
        gameState: store.getState()
      }).then(callback);
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
    if (agentQuery.queryKey === XMM.AgentQueryType.CHOOSE_MANEUVERS) {
      chooseManeuvers(store);
      return;
    }
    if (agentQuery.queryKey === XMM.AgentQueryType.CHOOSE_SHIP_ACTION) {
      chooseShipAction(store);
      return;
    }
    if (agentQuery.queryKey === XMM.AgentQueryType.CHOOSE_WEAPON_AND_DEFENDER) {
      chooseWeaponAndDefender(store);
      return;
    }
    if (agentQuery.queryKey === XMM.AgentQueryType.CHOOSE_ATTACK_DICE_MODIFICATION) {
      chooseAttackDiceModification(store);
      return;
    }
    if (agentQuery.queryKey === XMM.AgentQueryType.CHOOSE_DEFENSE_DICE_MODIFICATION) {
      chooseDefenseDiceModification(store);
      return;
    }
    if (agentQuery.queryKey === XMM.AgentQueryType.NOTIFY_DAMAGE) {
      notifyDamage(store);
      return;
    }
  }

  const callback = store2 => XWingMiniaturesApp.drawView(store2);
  XMM.XWingMiniaturesModel.nextGameState({
    gameState: store.getState()
  }).then(callback);
};

XWingMiniaturesApp.initialize();

Object.freeze(XWingMiniaturesApp);

export default XWingMiniaturesApp;
