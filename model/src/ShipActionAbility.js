import Selector from "./Selector.js";

const ShipAction = XMA.ShipAction;
const Token = XMA.Token;

const ActionCreator = XMS.ActionCreator;

const ShipActionAbility = {};

////////////////////////////////////////////////////////////////////////
// ShipActionAbility[ShipAction.BARREL_ROLL] = {
//    // Perform the barrel roll action to move laterally and adjust their position.
//    condition: function(store, token)
//    {
//       return isActiveToken(store, token);
//    },
//    consequent: function(store, token, callback, context)
//    {
//       const maneuverKey = context.maneuverKey;
//       const maneuverAction = new ManeuverAction(store, token.id(), maneuverKey);
//       maneuverAction.doIt();
//       notifyEvent(store, token, callback, ShipAction.BARREL_ROLL);
//    },
// };

// ShipActionAbility[ShipAction.BOOST] = {
//    // Perform the boost action to adjust their position.
//    condition: function(store, token)
//    {
//       return isActiveToken(store, token);
//    },
//    consequent: function(store, token, callback, context)
//    {
//       const maneuverKey = context.maneuverKey;
//       const maneuverAction = new ManeuverAction(store, token.id(), maneuverKey);
//       maneuverAction.doIt();
//       notifyEvent(store, token, callback, ShipAction.BOOST);
//    },
// };

// ShipActionAbility[ShipAction.CLOAK] = {
//    // Assign one cloak token to that ship.
//    condition: function(store, token)
//    {
//       return isActiveToken(store, token);
//    },
//    consequent: function(store, token, callback)
//    {
//       store.dispatch(CardAction.addCloakCount(token));
//       notifyEvent(store, token, callback, ShipAction.CLOAK);
//    },
// };

// ShipActionAbility[ShipAction.COORDINATE] = {
//    // Choose another friendly ship at Range 1-2. That ship may immediately perform one free action.
//    condition: function(store, token)
//    {
//       return isActiveToken(store, token);
//    },
//    consequent: function(store, token, callback)
//    {
//       LOGGER.warn("ShipActionAbility Coordinate not yet implemented.");
//       notifyEvent(store, token, callback, ShipAction.COORDINATE);
//    },
// };

// ShipActionAbility[ShipAction.DECLOAK] = {
//    // Spend a cloak token to decloak.
//    condition: function(store, token)
//    {
//       return isActiveToken(store, token);
//    },
//    consequent: function(store, token, callback, context)
//    {
//       const maneuverKey = context.maneuverKey;
//       const maneuverAction = new ManeuverAction(store, token.id(), maneuverKey);
//       maneuverAction.doIt();
//       store.dispatch(CardAction.addCloakCount(token, -1));
//       notifyEvent(store, token, callback, ShipAction.DECLOAK);
//    },
// };

ShipActionAbility[ShipAction.EVADE] = {
   // Assign one evade token to the ship.
   condition: (pilotId, state) =>
   {
      return isActivePilot(pilotId, state);
   },
   consequent: (pilotId, store) => new Promise((resolve) =>
   {
      store.dispatch(ActionCreator.addPilotTokenCount(pilotId, Token.EVADE, 1));
      resolve(store);
   })
};

ShipActionAbility[ShipAction.FOCUS] = {
   // Assign one focus token to the ship.
   condition: (pilotId, state) =>
   {
      return isActivePilot(pilotId, state);
   },
   consequent: (pilotId, store) => new Promise((resolve) =>
   {
      store.dispatch(ActionCreator.addPilotTokenCount(pilotId, Token.FOCUS, 1));
      resolve(store);
   })
};

// ShipActionAbility[ShipAction.JAM] = {
//    // Choose one enemy ship at Range 1-2 and assign Stress tokens until the ship has 2 total stress tokens.
//    condition: function(store, token)
//    {
//       return isActiveToken(store, token);
//    },
//    consequent: function(store, token, callback, context)
//    {
//       const defender = context.defender;
//       if (defender.stressCount() < 2)
//       {
//          defender.receiveStress();
//       }
//       if (defender.stressCount() < 2)
//       {
//          defender.receiveStress();
//       }
//       notifyEvent(store, token, callback, ShipAction.JAM);
//    },
// };

// ShipActionAbility[ShipAction.RECOVER] = {
//    // Remove all energy tokens from the corresponding ship card. For each energy token removed, the ship recovers one shield, up to its maximum shield value.
//    condition: function(store, token)
//    {
//       return isActiveToken(store, token);
//    },
//    consequent: function(store, token, callback)
//    {
//       LOGGER.warn("ShipActionAbility Recover not yet implemented.");
//       notifyEvent(store, token, callback, ShipAction.RECOVER);
//    },
// };

// ShipActionAbility[ShipAction.REINFORCE] = {
//    // Choose either the fore or aft side of a double-sided reinforce token and place the token with that side faceup near its ship token.
//    condition: function(store, token)
//    {
//       return isActiveToken(store, token);
//    },
//    consequent: function(store, token, callback)
//    {
//       store.dispatch(CardAction.addReinforceCount(token));
//       notifyEvent(store, token, callback, ShipAction.REINFORCE);
//    },
// };

// ShipActionAbility[ShipAction.SLAM] = {
//    // Perform a SLAM (SubLight Acceleration Motor) action.
//    condition: function(store, token)
//    {
//       return isActiveToken(store, token);
//    },
//    consequent: function(store, token, callback, context)
//    {
//       const maneuverKey = context.maneuverKey;
//       const maneuverAction = new ManeuverAction(store, token.id(), maneuverKey);
//       maneuverAction.doIt();
//       store.dispatch(CardAction.addWeaponsDisabledCount(token));
//       notifyEvent(store, token, callback, ShipAction.SLAM);
//    },
// };

// ShipActionAbility[ShipAction.TARGET_LOCK] = {
//    // Acquire a target lock on an enemy ship.
//    condition: function(store, token)
//    {
//       return isActiveToken(store, token);
//    },
//    consequent: function(store, attacker, callback, context)
//    {
//       const oldTargetLocks = TargetLock.getByAttacker(store, attacker);
//       if (oldTargetLocks.length > 0)
//       {
//          oldTargetLocks[0].delete();
//       }
//       const defender = context.defender;
//       TargetLock.newInstance(store, attacker, defender);
//       notifyEvent(store, attacker, callback, ShipAction.TARGET_LOCK);
//    },
// };

////////////////////////////////////////////////////////////////////////
// function getActiveToken(store)
// {
//    InputValidator.validateNotNull("store", store);
//
//    const environment = store.getState().environment;
//
//    return environment.activeCardInstance();
// }

const isActivePilot = (pilotId, state) => pilotId === Selector.activePilotId(state);

// function isActiveToken(store, token)
// {
//    const activeToken = getActiveToken(store);
//
//    return token.equals(activeToken);
// }
//
// ShipActionAbility.toString = function()
// {
//    return "model/ShipActionAbility";
// };
//
// function notifyEvent(store, eventToken, eventCallback, shipActionKey)
// {
//    InputValidator.validateNotNull("store", store);
//    InputValidator.validateNotNull("eventToken", eventToken);
//    InputValidator.validateNotNull("eventCallback", eventCallback);
//    InputValidator.validateNotNull("shipActionKey", shipActionKey);
//
//    // Issue event.
//    const eventKey = Event.SHIP_ACTION_PERFORMED;
//    const eventContext = {
//       shipActionKey: shipActionKey,
//    };
//    store.dispatch(Action.enqueueEvent(eventKey, eventToken, eventCallback, eventContext));
// }

Object.freeze(ShipActionAbility);

export default ShipActionAbility;