const ShipAction = {

  BARREL_ROLL: "barrelRoll",
  BOOST: "boost",
  CLOAK: "cloak",
  COORDINATE: "coordinate",
  DECLOAK: "decloak",
  EVADE: "evade",
  FOCUS: "focus",
  JAM: "jam",
  RECOVER: "recover",
  REINFORCE: "reinforce",
  RELOAD: "reload",
  ROTATE_ARC: "rotateArc",
  SLAM: "slam",
  TARGET_LOCK: "targetLock",
};

ShipAction.properties = 
{
   "barrelRoll": {
      "name": "Barrel Roll",
      "key": "barrelRoll"
   },
   "boost": {
      "name": "Boost",
      "key": "boost"
   },
   "cloak": {
      "name": "Cloak",
      "key": "cloak"
   },
   "coordinate": {
      "name": "Coordinate",
      "key": "coordinate"
   },
   "decloak": {
      "name": "Decloak",
      "key": "decloak"
   },
   "evade": {
      "name": "Evade",
      "key": "evade"
   },
   "focus": {
      "name": "Focus",
      "key": "focus"
   },
   "jam": {
      "name": "Jam",
      "key": "jam"
   },
   "recover": {
      "name": "Recover",
      "key": "recover"
   },
   "reinforce": {
      "name": "Reinforce",
      "key": "reinforce"
   },
   "reload": {
      "name": "Reload",
      "key": "reload"
   },
   "rotateArc": {
      "name": "Rotate Arc",
      "key": "rotateArc"
   },
   "slam": {
      "name": "SLAM",
      "key": "slam"
   },
   "targetLock": {
      "name": "Target Lock",
      "key": "targetLock"
   }
};

Object.freeze(ShipAction);

export default ShipAction;