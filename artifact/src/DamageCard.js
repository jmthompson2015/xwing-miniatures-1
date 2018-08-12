const DamageCard = {

  BLINDED_PILOT: "blindedPilot",
  CONSOLE_FIRE: "consoleFire",
  DAMAGED_COCKPIT: "damagedCockpit",
  DAMAGED_ENGINE: "damagedEngine",
  DAMAGED_SENSOR_ARRAY: "damagedSensorArray",
  DIRECT_HIT: "directHit",
  INJURED_PILOT: "injuredPilot",
  MINOR_EXPLOSION: "minorExplosion",
  MINOR_HULL_BREACH: "minorHullBreach",
  MUNITIONS_FAILURE: "munitionsFailure",
  STRUCTURAL_DAMAGE: "structuralDamage",
  STUNNED_PILOT: "stunnedPilot",
  THRUST_CONTROL_FIRE: "thrustControlFire",
  WEAPON_MALFUNCTION: "weaponMalfunction",
};

DamageCard.properties = 
{
   "blindedPilot": {
      "name": "Blinded Pilot",
      "amount": 2,
      "type": "Pilot",
      "text": "The next time you attack, do not roll any attack dice.<br /><br />Then flip this card facedown.",
      "image": "damage-decks/core/blinded-pilot.png",
      "key": "blindedPilot"
   },
   "consoleFire": {
      "name": "Console Fire",
      "amount": 2,
      "type": "Ship",
      "text": "At the start of each Combat phase, roll 1 attack die. On a [Hit] result, suffer 1 damage.<br /><br /><strong>Action:</strong> Flip this card facedown.",
      "image": "damage-decks/core/console-fire.png",
      "key": "consoleFire"
   },
   "damagedCockpit": {
      "name": "Damaged Cockpit",
      "amount": 2,
      "type": "Pilot",
      "text": "After the round in which you receive this card, treat your pilot skill value as \"0\".",
      "image": "damage-decks/core/damaged-cockpit.png",
      "key": "damagedCockpit"
   },
   "damagedEngine": {
      "name": "Damaged Engine",
      "amount": 2,
      "type": "Ship",
      "text": "Treat all turn maneuvers ([Turn Left] or [Turn Right]) as red maneuvers.",
      "image": "damage-decks/core/damaged-engine.png",
      "key": "damagedEngine"
   },
   "damagedSensorArray": {
      "name": "Damaged Sensor Array",
      "amount": 2,
      "type": "Ship",
      "text": "You cannot perform the actions listed in your action bar.<br /><br /><strong>Action:</strong> Roll 1 attack die. On a [Hit] results, flip this card facedown.",
      "image": "damage-decks/core/damaged-sensor-array.png",
      "key": "damagedSensorArray"
   },
   "directHit": {
      "name": "Direct Hit!",
      "amount": 7,
      "type": "Ship",
      "text": "This card counts as <strong>2 damage</strong> against your hull.",
      "image": "damage-decks/core/direct-hit.png",
      "key": "directHit"
   },
   "injuredPilot": {
      "name": "Injured Pilot",
      "amount": 2,
      "type": "Pilot",
      "text": "All players must ignore your pilot ability and all of your [Elite] Upgrade cards.",
      "image": "damage-decks/core/injured-pilot.png",
      "key": "injuredPilot"
   },
   "minorExplosion": {
      "name": "Minor Explosion",
      "amount": 2,
      "type": "Ship",
      "text": "Immediately roll 1 attack die. On a [Hit] result, suffer 1 damage.<br /><br />Then flip this card facedown.",
      "image": "damage-decks/core/minor-explosion.png",
      "key": "minorExplosion"
   },
   "minorHullBreach": {
      "name": "Minor Hull Breach",
      "amount": 2,
      "type": "Ship",
      "text": "After executing a red maneuver, roll 1 attack die.<br /><br />On a [Hit] result, suffer 1 damage.",
      "image": "damage-decks/core/minor-hull-breach.png",
      "key": "minorHullBreach"
   },
   "munitionsFailure": {
      "name": "Munitions Failure",
      "amount": 2,
      "type": "Ship",
      "text": "Immediately choose 1 of your secondary weapon Upgrade cards and discard it.<br /><br />Then flip this card facedown.",
      "image": "damage-decks/core/munitions-failure.png",
      "key": "munitionsFailure"
   },
   "structuralDamage": {
      "name": "Structural Damage",
      "amount": 2,
      "type": "Ship",
      "text": "Reduce your agility value by 1 (to a minimum of \"0\").<br /><br /><strong>Action:</strong> Roll 1 attack die. On a [Hit] result, flip this card facedown.",
      "image": "damage-decks/core/structural-damage.png",
      "key": "structuralDamage"
   },
   "stunnedPilot": {
      "name": "Stunned Pilot",
      "amount": 2,
      "type": "Pilot",
      "text": "After you execute a maneuver that causes you to overlap either another ship or an obstacle token, suffer 1 damage.",
      "image": "damage-decks/core/stunned-pilot.png",
      "key": "stunnedPilot"
   },
   "thrustControlFire": {
      "name": "Thrust Control Fire",
      "amount": 2,
      "type": "Ship",
      "text": "Immediately receive 1 stress token.<br /><br />Then flip this card facedown.",
      "image": "damage-decks/core/thrust-control-fire.png",
      "key": "thrustControlFire"
   },
   "weaponMalfunction": {
      "name": "Weapon Malfunction",
      "amount": 2,
      "type": "Ship",
      "text": "Reduce your primary weapon value by 1 (to a minimum of \"0\").<br /><br /><strong>Action:</strong> Roll 1 attack die. On a [Hit] or [Critical Hit] result, flip this card facedown.",
      "image": "damage-decks/core/weapon-malfunction.png",
      "key": "weaponMalfunction"
   }
};

Object.freeze(DamageCard);

export default DamageCard;