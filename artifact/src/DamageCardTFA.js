const DamageCardTFA = {

  BLINDED_PILOT: "blindedPilot",
  CONSOLE_FIRE: "consoleFire",
  DAMAGED_COCKPIT: "damagedCockpit",
  DAMAGED_ENGINE: "damagedEngine",
  DAMAGED_SENSOR_ARRAY: "damagedSensorArray",
  DIRECT_HIT: "directHit",
  LOOSE_STABILIZER: "looseStabilizer",
  MAJOR_EXPLOSION: "majorExplosion",
  MAJOR_HULL_BREACH: "majorHullBreach",
  SHAKEN_PILOT: "shakenPilot",
  STRUCTURAL_DAMAGE: "structuralDamage",
  STUNNED_PILOT: "stunnedPilot",
  THRUST_CONTROL_FIRE: "thrustControlFire",
  WEAPONS_FAILURE: "weaponsFailure",
};

DamageCardTFA.properties = 
{
   "blindedPilot": {
      "name": "Blinded Pilot",
      "amount": 2,
      "type": "Pilot",
      "text": "You cannot perform attacks.<br /><br />After your next opportunity to attack (even if there was no target for an attack), flip this card facedown.",
      "image": "damage-decks/core-tfa/blinded-pilot.png",
      "key": "blindedPilot"
   },
   "consoleFire": {
      "name": "Console Fire",
      "amount": 2,
      "type": "Ship",
      "text": "At the start of each Combat phase, roll 1 attack die. On a [Hit] result, suffer 1 damage.<br /><br /><strong>Action:</strong> Flip this card facedown.",
      "image": "damage-decks/core-tfa/console-fire.png",
      "key": "consoleFire"
   },
   "damagedCockpit": {
      "name": "Damaged Cockpit",
      "amount": 2,
      "type": "Pilot",
      "text": "Starting the round after your receive this card, your pilot skill value is treated as \"0.\"",
      "image": "damage-decks/core-tfa/damaged-cockpit.png",
      "key": "damagedCockpit"
   },
   "damagedEngine": {
      "name": "Damaged Engine",
      "amount": 2,
      "type": "Ship",
      "text": "Treat all turn maneuvers ([Turn Left] or [Turn Right]) as red maneuvers.",
      "image": "damage-decks/core-tfa/damaged-engine.png",
      "key": "damagedEngine"
   },
   "damagedSensorArray": {
      "name": "Damaged Sensor Array",
      "amount": 2,
      "type": "Ship",
      "text": "You cannot perform any actions except actions listed on Damage cards.<br /><br /><strong>Action:</strong> Roll 1 attack die. On a [Hit] or [Critical Hit] result, flip this card facedown.",
      "image": "damage-decks/core-tfa/damaged-sensor-array.png",
      "key": "damagedSensorArray"
   },
   "directHit": {
      "name": "Direct Hit!",
      "amount": 7,
      "type": "Ship",
      "text": "This card counts as <strong>2 damage</strong> against your hull.",
      "image": "damage-decks/core-tfa/direct-hit.png",
      "key": "directHit"
   },
   "looseStabilizer": {
      "name": "Loose Stabilizer",
      "amount": 2,
      "type": "Ship",
      "text": "After you execute a white maneuver, receive 1 stress token.<br /><br /><strong>Action:</strong> Flip this card facedown.",
      "image": "damage-decks/core-tfa/loose-stabilizer.png",
      "key": "looseStabilizer"
   },
   "majorExplosion": {
      "name": "Major Explosion",
      "amount": 2,
      "type": "Ship",
      "text": "Roll 1 attack die. On a [Hit] result, suffer 1 critical damage.<br /><br />Then flip this card facedown.",
      "image": "damage-decks/core-tfa/major-explosion.png",
      "key": "majorExplosion"
   },
   "majorHullBreach": {
      "name": "Major Hull Breach",
      "amount": 2,
      "type": "Ship",
      "text": "Starting the round after you receive this card, all Damage cards dealt to you are dealt faceup.<br /><br /><strong>Action:</strong> Flip this card facedown.",
      "image": "damage-decks/core-tfa/major-hull-breach.png",
      "key": "majorHullBreach"
   },
   "shakenPilot": {
      "name": "Shaken Pilot",
      "amount": 2,
      "type": "Pilot",
      "text": "During the Planning phase, you cannot be assigned straight ([Straight]) maneuvers.<br /><br />When you reveal your dial, flip this card facedown.",
      "image": "damage-decks/core-tfa/shaken-pilot.png",
      "key": "shakenPilot"
   },
   "structuralDamage": {
      "name": "Structural Damage",
      "amount": 2,
      "type": "Ship",
      "text": "Reduce your agility value by 1 (to a minimum of \"0\").<br /><br /><strong>Action:</strong> Roll 1 attack die. On a [Hit] or [Critical Hit] result, flip this card facedown.",
      "image": "damage-decks/core-tfa/structural-damage.png",
      "key": "structuralDamage"
   },
   "stunnedPilot": {
      "name": "Stunned Pilot",
      "amount": 2,
      "type": "Pilot",
      "text": "After you execute a maneuver, if you are touching another ship or overlapping an obstacle token, suffer 1 damage.",
      "image": "damage-decks/core-tfa/stunned-pilot.png",
      "key": "stunnedPilot"
   },
   "thrustControlFire": {
      "name": "Thrust Control Fire",
      "amount": 2,
      "type": "Ship",
      "text": "Receive 1 stress token.<br /><br />Then flip this card facedown.",
      "image": "damage-decks/core-tfa/thrust-control-fire.png",
      "key": "thrustControlFire"
   },
   "weaponsFailure": {
      "name": "Weapons Failure",
      "amount": 2,
      "type": "Ship",
      "text": "When attacking, roll 1 fewer attack die.<br /><br /><strong>Action:</strong> Roll 1 attack die. On a [Hit] or [Critical Hit] result, flip this card facedown.",
      "image": "damage-decks/core-tfa/weapons-failure.png",
      "key": "weaponsFailure"
   }
};

Object.freeze(DamageCardTFA);

export default DamageCardTFA;