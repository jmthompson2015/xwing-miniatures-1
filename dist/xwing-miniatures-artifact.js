(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.XMA = {})));
}(this, (function (exports) { 'use strict';

  const AttackDiceValue = {
    HIT: "hit",
    CRITICAL_HIT: "criticalHit",
    FOCUS: "focus",
    BLANK: "blank"
  };

  AttackDiceValue.properties = {
    hit: {
      name: "Hit",
      sortOrder: 0,
      image: "dice/attack-hit.png",
      key: "hit"
    },
    criticalHit: {
      name: "Critical Hit",
      sortOrder: 1,
      image: "dice/attack-critical-hit.png",
      key: "criticalHit"
    },
    focus: {
      name: "Focus",
      sortOrder: 2,
      image: "dice/attack-focus.png",
      key: "focus"
    },
    blank: {
      name: "Blank",
      sortOrder: 3,
      image: "dice/attack-blank.png",
      key: "blank"
    }
  };

  Object.freeze(AttackDiceValue);

  const ConditionCard = {

    A_DEBT_TO_PAY: "aDebtToPay",
    FANATICAL_DEVOTION: "fanaticalDevotion",
    HARPOONED: "harpooned",
    ILL_SHOW_YOU_THE_DARK_SIDE: "illShowYouTheDarkSide",
    MIMICKED: "mimicked",
    OPTIMIZED_PROTOTYPE: "optimizedPrototype",
    RATTLED: "rattled",
    SCRAMBLED: "scrambled",
    SHADOWED: "shadowed",
    SUPPRESSIVE_FIRE: "suppressiveFire",
  };

  ConditionCard.properties = 
  {
     "aDebtToPay": {
        "image": "conditions/a-debt-to-pay.png",
        "text": "When attacking a ship that has the \"A Score to Settle\" Upgrade card, you may change 1 [Focus] result to a [Critical Hit] result.",
        "name": "A Debt to Pay",
        "xws": "adebttopay",
        "unique": true,
        "id": 3,
        "key": "aDebtToPay"
     },
     "fanaticalDevotion": {
        "image": "conditions/fanatical-devotion.png",
        "text": "When defending, you cannot spend focus tokens.<br /><br />When attacking, if you spend a focus token to change all [Focus] results to [Hit] results, set aside the first [Focus] result that you change. The set-aside [Hit] result cannot be canceled by defense dice, but the defender may cancel [Critical Hit] results before it.<br /><br />During the End phase, remove this card.",
        "name": "Fanatical Devotion",
        "xws": "fanaticaldevotion",
        "unique": true,
        "id": 1,
        "key": "fanaticalDevotion"
     },
     "harpooned": {
        "image": "conditions/harpooned.png",
        "text": "When you are hit by an attack, if there is at least 1 uncancelled [Critical Hit] result, each other ship at range 1 suffers 1 damage. Then discard this card and receive one facedown Damage card.<br /><br />When you are destroyed, each ship at Range 1 of you suffers 1 damage.<br /><br /><strong>Action:</strong> Discard this card. Then roll 1 attack die. On a [Hit] or [Critical Hit] result, suffer 1 damage.",
        "name": "Harpooned!",
        "xws": "harpooned",
        "id": 6,
        "unique": false,
        "key": "harpooned"
     },
     "illShowYouTheDarkSide": {
        "image": "conditions/ill-show-you-the-dark-side.png",
        "name": "I'll Show You the Dark Side",
        "xws": "illshowyouthedarkside",
        "text": "When this card is assigned, if it is not already in play, the player who assigned it searches the Damage deck for 1 Damage card with the <strong>Pilot</strong> trait and may place it faceup on this card. Then shuffle the damage deck.<br /><br />When you suffer critical damage during an attack, you are instead dealt the chosen faceup Damage card.<br /><br />When there is no Damage card on this card, remove it.",
        "unique": true,
        "id": 0,
        "key": "illShowYouTheDarkSide"
     },
     "mimicked": {
        "image": "conditions/mimicked.png",
        "text": "\"Thweek\" is treated as having your pilot ability.<br /><br />\"Thweek\" cannot apply a Condition card by using your pilot ability.<br /><br />\"Thweek\" does not lose your pilot ability if you are destroyed.",
        "name": "Mimicked",
        "xws": "mimicked",
        "unique": true,
        "id": 4,
        "key": "mimicked"
     },
     "optimizedPrototype": {
        "image": "conditions/optimized-prototype.png",
        "text": "Increase your shield value by 1.<br /><br />Once per round, when performing a primary weapon attack, you may spend 1 die result to remove 1 shield from the defender.<br /><br />After you perform a primary weapon attack, a friendly ship at Range 1-2 equipped with the \"Director Krennic\" Upgrade card may acquire a target lock on the defender.",
        "name": "Optimized Prototype",
        "xws": "optimizedprototype",
        "unique": true,
        "id": 9,
        "key": "optimizedPrototype"
     },
     "rattled": {
        "text": "When you suffer damage from a bomb, you suffer 1 additional critical damage. Then, remove this card.<br /><br /><strong>Action:</strong> Roll 1 attack die. On a [Focus] or [Hit] result, remove this card.",
        "name": "Rattled",
        "xws": "rattled",
        "unique": true,
        "id": 7,
        "image": "conditions/rattled.png",
        "key": "rattled"
     },
     "scrambled": {
        "image": "conditions/scrambled.png",
        "text": "When attacking a ship at Range 1 that is equipped with the \"Targeting Scrambler\" upgrade, you cannot modify your attack dice.<br /><br />At the end of the Combat phase, remove this card.",
        "name": "Scrambled",
        "xws": "scrambled",
        "unique": true,
        "id": 8,
        "key": "scrambled"
     },
     "shadowed": {
        "image": "conditions/shadowed.png",
        "text": "\"Thweek\" is treated as having the pilot skill value you had after setup.<br /><br />This pilot skill value of \"Thweek\" does not change if your pilot skill value changes or you are destroyed.",
        "name": "Shadowed",
        "xws": "shadowed",
        "unique": true,
        "id": 5,
        "key": "shadowed"
     },
     "suppressiveFire": {
        "image": "conditions/suppressive-fire.png",
        "text": "When attacking a ship other than \"Captain Rex,\" roll 1 fewer attack die.<br /><br />When you declare an attack targeting \"Captain Rex\" or when \"Captain Rex\" is destroyed, remove this card.<br /><br />At the end of the Combat phase, if \"Captain Rex\" did not perform an attack this phase, remove this card.",
        "name": "Suppressive Fire",
        "xws": "suppressivefire",
        "unique": true,
        "id": 2,
        "key": "suppressiveFire"
     }
  };

  Object.freeze(ConditionCard);

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

  const DamageType = {

    PILOT: "pilot",
    SHIP: "ship",
  };

  DamageType.properties = 
  {
     "pilot": {
        "name": "Pilot",
        "key": "pilot"
     },
     "ship": {
        "name": "Ship",
        "key": "ship"
     }
  };

  Object.freeze(DamageType);

  const DefenseDiceValue = {
    EVADE: "evade",
    FOCUS: "focus",
    BLANK: "blank"
  };

  DefenseDiceValue.properties = {
    evade: {
      name: "Evade",
      sortOrder: 0,
      image: "dice/defense-evade.png",
      key: "evade"
    },
    focus: {
      name: "Focus",
      sortOrder: 1,
      image: "dice/defense-focus.png",
      key: "focus"
    },
    blank: {
      name: "Blank",
      sortOrder: 2,
      image: "dice/defense-blank.png",
      key: "blank"
    }
  };

  Object.freeze(DefenseDiceValue);

  const DiceModification = {
    ATTACK_SPEND_FOCUS: "attackSpendFocus",
    ATTACK_SPEND_TARGET_LOCK: "attackSpendTargetLock",
    DEFENSE_SPEND_EVADE: "defenseSpendEvade",
    DEFENSE_SPEND_FOCUS: "defenseSpendFocus"
  };

  DiceModification.properties = {
    attackSpendFocus: {
      name: "Spend a Focus token",
      description: "Spend a focus token to change all focus results to hit results on attack dice.",
      key: "attackSpendFocus"
    },
    attackSpendTargetLock: {
      name: "Spend Target Lock tokens",
      description: "Spend a target lock on the defender to reroll any number of attack dice.",
      key: "attackSpendTargetLock"
    },
    defenseSpendEvade: {
      name: "Spend an Evade token",
      description: "Spend an evade token to add one additional evade result to defense dice.",
      key: "defenseSpendEvade"
    },
    defenseSpendFocus: {
      name: "Spend a Focus token",
      description:
        "Spend a focus token to change all focus results to evade results on defense dice.",
      key: "defenseSpendFocus"
    }
  };

  Object.freeze(DiceModification);

  const EnumUtilities = {};

  EnumUtilities.findByName = (name, enumClass) => EnumUtilities.findByProp("name", name, enumClass);

  EnumUtilities.findByProp = (propertyName, propertyValue, enumClass) =>
    R.find(R.propEq(propertyName, propertyValue), EnumUtilities.values(enumClass));

  EnumUtilities.keys = enumClass => Object.keys(enumClass.properties);

  EnumUtilities.values = enumClass => Object.values(enumClass.properties);

  Object.freeze(EnumUtilities);

  const Faction = {

    FIRST_ORDER: "firstOrder",
    GALACTIC_EMPIRE: "galacticEmpire",
    REBEL_ALLIANCE: "rebelAlliance",
    RESISTANCE: "resistance",
    SCUM_AND_VILLAINY: "scumAndVillainy",
  };

  Faction.properties = 
  {
     "firstOrder": {
        "name": "First Order",
        "shortName": "FirstOrder",
        "color": "rgb(0, 255, 0)",
        "image": "factions/first-order.png",
        "key": "firstOrder"
     },
     "galacticEmpire": {
        "name": "Galactic Empire",
        "shortName": "Imperial",
        "color": "rgb(0, 255, 0)",
        "image": "factions/galactic-empire.png",
        "key": "galacticEmpire"
     },
     "rebelAlliance": {
        "name": "Rebel Alliance",
        "shortName": "Rebel",
        "color": "red",
        "image": "factions/rebel-alliance.png",
        "key": "rebelAlliance"
     },
     "resistance": {
        "name": "Resistance",
        "shortName": "Resistance",
        "color": "red",
        "image": "factions/resistance.png",
        "key": "resistance"
     },
     "scumAndVillainy": {
        "name": "Scum and Villainy",
        "shortName": "Scum",
        "color": "rgb(255, 215, 0)",
        "image": "factions/scum-and-villainy.png",
        "key": "scumAndVillainy"
     }
  };

  Object.freeze(Faction);

  const FiringArc = {

    AUXILIARY_180: "auxiliary180",
    AUXILIARY_REAR: "auxiliaryRear",
    BULLSEYE: "bullseye",
    FRONT: "front",
    MOBILE: "mobile",
    TURRET: "turret",
  };

  FiringArc.properties = 
  {
     "auxiliary180": {
        "name": "Auxiliary 180",
        "minAngle": 270,
        "maxAngle": 90,
        "key": "auxiliary180"
     },
     "auxiliaryRear": {
        "name": "Auxiliary Rear",
        "minAngle": 135,
        "maxAngle": 225,
        "key": "auxiliaryRear"
     },
     "bullseye": {
        "name": "Bullseye",
        "key": "bullseye"
     },
     "front": {
        "name": "Front",
        "minAngle": 315,
        "maxAngle": 45,
        "key": "front"
     },
     "mobile": {
        "name": "Mobile",
        "key": "mobile"
     },
     "turret": {
        "name": "Turret",
        "minAngle": 0,
        "maxAngle": 359,
        "key": "turret"
     }
  };

  Object.freeze(FiringArc);

  const Maneuver = {

    BANK_LEFT_1_EASY_1BG: "bankLeft1Easy1bg",
    BANK_LEFT_1_STANDARD_1BW: "bankLeft1Standard1bw",
    BANK_LEFT_2_EASY_2BG: "bankLeft2Easy2bg",
    BANK_LEFT_2_STANDARD_2BW: "bankLeft2Standard2bw",
    BANK_LEFT_3_EASY_3BG: "bankLeft3Easy3bg",
    BANK_LEFT_3_HARD_3BR: "bankLeft3Hard3br",
    BANK_LEFT_3_STANDARD_3BW: "bankLeft3Standard3bw",
    BANK_RIGHT_1_EASY_1NG: "bankRight1Easy1ng",
    BANK_RIGHT_1_STANDARD_1NW: "bankRight1Standard1nw",
    BANK_RIGHT_2_EASY_2NG: "bankRight2Easy2ng",
    BANK_RIGHT_2_STANDARD_2NW: "bankRight2Standard2nw",
    BANK_RIGHT_3_EASY_3NG: "bankRight3Easy3ng",
    BANK_RIGHT_3_HARD_3NR: "bankRight3Hard3nr",
    BANK_RIGHT_3_STANDARD_3NW: "bankRight3Standard3nw",
    KOIOGRAN_TURN_2_HARD_2KR: "koiogranTurn2Hard2kr",
    KOIOGRAN_TURN_3_HARD_3KR: "koiogranTurn3Hard3kr",
    KOIOGRAN_TURN_4_HARD_4KR: "koiogranTurn4Hard4kr",
    KOIOGRAN_TURN_4_STANDARD_4KW: "koiogranTurn4Standard4kw",
    KOIOGRAN_TURN_5_HARD_5KR: "koiogranTurn5Hard5kr",
    REVERSE_BANK_LEFT_1_HARD_1AR: "reverseBankLeft1Hard1ar",
    REVERSE_BANK_RIGHT_1_HARD_1DR: "reverseBankRight1Hard1dr",
    REVERSE_STRAIGHT_1_HARD_1SR: "reverseStraight1Hard1sr",
    SEGNORS_LOOP_LEFT_1_HARD_1LR: "segnorsLoopLeft1Hard1lr",
    SEGNORS_LOOP_LEFT_2_HARD_2LR: "segnorsLoopLeft2Hard2lr",
    SEGNORS_LOOP_LEFT_2_STANDARD_2LW: "segnorsLoopLeft2Standard2lw",
    SEGNORS_LOOP_LEFT_3_HARD_3LR: "segnorsLoopLeft3Hard3lr",
    SEGNORS_LOOP_RIGHT_1_HARD_1PR: "segnorsLoopRight1Hard1pr",
    SEGNORS_LOOP_RIGHT_2_HARD_2PR: "segnorsLoopRight2Hard2pr",
    SEGNORS_LOOP_RIGHT_3_HARD_3PR: "segnorsLoopRight3Hard3pr",
    STATIONARY_0_HARD_0OR: "stationary0Hard0or",
    STRAIGHT_1_EASY_1FG: "straight1Easy1fg",
    STRAIGHT_1_STANDARD_1FW: "straight1Standard1fw",
    STRAIGHT_2_EASY_2FG: "straight2Easy2fg",
    STRAIGHT_3_EASY_3FG: "straight3Easy3fg",
    STRAIGHT_3_STANDARD_3FW: "straight3Standard3fw",
    STRAIGHT_4_EASY_4FG: "straight4Easy4fg",
    STRAIGHT_4_HARD_4FR: "straight4Hard4fr",
    STRAIGHT_4_STANDARD_4FW: "straight4Standard4fw",
    STRAIGHT_5_EASY_5FG: "straight5Easy5fg",
    STRAIGHT_5_HARD_5FR: "straight5Hard5fr",
    STRAIGHT_5_STANDARD_5FW: "straight5Standard5fw",
    TALLON_ROLL_LEFT_2_HARD_2ER: "tallonRollLeft2Hard2er",
    TALLON_ROLL_LEFT_3_HARD_3ER: "tallonRollLeft3Hard3er",
    TALLON_ROLL_RIGHT_2_HARD_2RR: "tallonRollRight2Hard2rr",
    TALLON_ROLL_RIGHT_3_HARD_3RR: "tallonRollRight3Hard3rr",
    TURN_LEFT_1_EASY_1TG: "turnLeft1Easy1tg",
    TURN_LEFT_1_HARD_1TR: "turnLeft1Hard1tr",
    TURN_LEFT_1_STANDARD_1TW: "turnLeft1Standard1tw",
    TURN_LEFT_2_EASY_2TG: "turnLeft2Easy2tg",
    TURN_LEFT_2_HARD_2TR: "turnLeft2Hard2tr",
    TURN_LEFT_2_STANDARD_2TW: "turnLeft2Standard2tw",
    TURN_LEFT_3_EASY_3TG: "turnLeft3Easy3tg",
    TURN_LEFT_3_HARD_3TR: "turnLeft3Hard3tr",
    TURN_LEFT_3_STANDARD_3TW: "turnLeft3Standard3tw",
    TURN_RIGHT_1_EASY_1YG: "turnRight1Easy1yg",
    TURN_RIGHT_1_HARD_1YR: "turnRight1Hard1yr",
    TURN_RIGHT_1_STANDARD_1YW: "turnRight1Standard1yw",
    TURN_RIGHT_2_EASY_2YG: "turnRight2Easy2yg",
    TURN_RIGHT_2_HARD_2YR: "turnRight2Hard2yr",
    TURN_RIGHT_2_STANDARD_2YW: "turnRight2Standard2yw",
    TURN_RIGHT_3_EASY_3YG: "turnRight3Easy3yg",
    TURN_RIGHT_3_HARD_3YR: "turnRight3Hard3yr",
    TURN_RIGHT_3_STANDARD_3YW: "turnRight3Standard3yw",
  };

  Maneuver.properties = 
  {
     "bankLeft1Easy1bg": {
        "name": "Bank Left 1 Easy 1BG",
        "speed": 1,
        "bearing": "Bank Left",
        "difficulty": "Easy",
        "dial": "1BG",
        "key": "bankLeft1Easy1bg"
     },
     "bankLeft1Standard1bw": {
        "name": "Bank Left 1 Standard 1BW",
        "speed": 1,
        "bearing": "Bank Left",
        "difficulty": "Standard",
        "dial": "1BW",
        "key": "bankLeft1Standard1bw"
     },
     "bankLeft2Easy2bg": {
        "name": "Bank Left 2 Easy 2BG",
        "speed": 2,
        "bearing": "Bank Left",
        "difficulty": "Easy",
        "dial": "2BG",
        "key": "bankLeft2Easy2bg"
     },
     "bankLeft2Standard2bw": {
        "name": "Bank Left 2 Standard 2BW",
        "speed": 2,
        "bearing": "Bank Left",
        "difficulty": "Standard",
        "dial": "2BW",
        "key": "bankLeft2Standard2bw"
     },
     "bankLeft3Easy3bg": {
        "name": "Bank Left 3 Easy 3BG",
        "speed": 3,
        "bearing": "Bank Left",
        "difficulty": "Easy",
        "dial": "3BG",
        "key": "bankLeft3Easy3bg"
     },
     "bankLeft3Hard3br": {
        "name": "Bank Left 3 Hard 3BR",
        "speed": 3,
        "bearing": "Bank Left",
        "difficulty": "Hard",
        "dial": "3BR",
        "key": "bankLeft3Hard3br"
     },
     "bankLeft3Standard3bw": {
        "name": "Bank Left 3 Standard 3BW",
        "speed": 3,
        "bearing": "Bank Left",
        "difficulty": "Standard",
        "dial": "3BW",
        "key": "bankLeft3Standard3bw"
     },
     "bankRight1Easy1ng": {
        "name": "Bank Right 1 Easy 1NG",
        "speed": 1,
        "bearing": "Bank Right",
        "difficulty": "Easy",
        "dial": "1NG",
        "key": "bankRight1Easy1ng"
     },
     "bankRight1Standard1nw": {
        "name": "Bank Right 1 Standard 1NW",
        "speed": 1,
        "bearing": "Bank Right",
        "difficulty": "Standard",
        "dial": "1NW",
        "key": "bankRight1Standard1nw"
     },
     "bankRight2Easy2ng": {
        "name": "Bank Right 2 Easy 2NG",
        "speed": 2,
        "bearing": "Bank Right",
        "difficulty": "Easy",
        "dial": "2NG",
        "key": "bankRight2Easy2ng"
     },
     "bankRight2Standard2nw": {
        "name": "Bank Right 2 Standard 2NW",
        "speed": 2,
        "bearing": "Bank Right",
        "difficulty": "Standard",
        "dial": "2NW",
        "key": "bankRight2Standard2nw"
     },
     "bankRight3Easy3ng": {
        "name": "Bank Right 3 Easy 3NG",
        "speed": 3,
        "bearing": "Bank Right",
        "difficulty": "Easy",
        "dial": "3NG",
        "key": "bankRight3Easy3ng"
     },
     "bankRight3Hard3nr": {
        "name": "Bank Right 3 Hard 3NR",
        "speed": 3,
        "bearing": "Bank Right",
        "difficulty": "Hard",
        "dial": "3NR",
        "key": "bankRight3Hard3nr"
     },
     "bankRight3Standard3nw": {
        "name": "Bank Right 3 Standard 3NW",
        "speed": 3,
        "bearing": "Bank Right",
        "difficulty": "Standard",
        "dial": "3NW",
        "key": "bankRight3Standard3nw"
     },
     "koiogranTurn2Hard2kr": {
        "name": "Koiogran Turn 2 Hard 2KR",
        "speed": 2,
        "bearing": "Koiogran Turn",
        "difficulty": "Hard",
        "dial": "2KR",
        "key": "koiogranTurn2Hard2kr"
     },
     "koiogranTurn3Hard3kr": {
        "name": "Koiogran Turn 3 Hard 3KR",
        "speed": 3,
        "bearing": "Koiogran Turn",
        "difficulty": "Hard",
        "dial": "3KR",
        "key": "koiogranTurn3Hard3kr"
     },
     "koiogranTurn4Hard4kr": {
        "name": "Koiogran Turn 4 Hard 4KR",
        "speed": 4,
        "bearing": "Koiogran Turn",
        "difficulty": "Hard",
        "dial": "4KR",
        "key": "koiogranTurn4Hard4kr"
     },
     "koiogranTurn4Standard4kw": {
        "name": "Koiogran Turn 4 Standard 4KW",
        "speed": 4,
        "bearing": "Koiogran Turn",
        "difficulty": "Standard",
        "dial": "4KW",
        "key": "koiogranTurn4Standard4kw"
     },
     "koiogranTurn5Hard5kr": {
        "name": "Koiogran Turn 5 Hard 5KR",
        "speed": 5,
        "bearing": "Koiogran Turn",
        "difficulty": "Hard",
        "dial": "5KR",
        "key": "koiogranTurn5Hard5kr"
     },
     "reverseBankLeft1Hard1ar": {
        "name": "Reverse Bank Left 1 Hard 1AR",
        "speed": 1,
        "bearing": "Reverse Bank Left",
        "difficulty": "Hard",
        "dial": "1AR",
        "key": "reverseBankLeft1Hard1ar"
     },
     "reverseBankRight1Hard1dr": {
        "name": "Reverse Bank Right 1 Hard 1DR",
        "speed": 1,
        "bearing": "Reverse Bank Right",
        "difficulty": "Hard",
        "dial": "1DR",
        "key": "reverseBankRight1Hard1dr"
     },
     "reverseStraight1Hard1sr": {
        "name": "Reverse Straight 1 Hard 1SR",
        "speed": 1,
        "bearing": "Reverse Straight",
        "difficulty": "Hard",
        "dial": "1SR",
        "key": "reverseStraight1Hard1sr"
     },
     "segnorsLoopLeft1Hard1lr": {
        "name": "Segnor's Loop Left 1 Hard 1LR",
        "speed": 1,
        "bearing": "Segnor's Loop Left",
        "difficulty": "Hard",
        "dial": "1LR",
        "key": "segnorsLoopLeft1Hard1lr"
     },
     "segnorsLoopLeft2Hard2lr": {
        "name": "Segnor's Loop Left 2 Hard 2LR",
        "speed": 2,
        "bearing": "Segnor's Loop Left",
        "difficulty": "Hard",
        "dial": "2LR",
        "key": "segnorsLoopLeft2Hard2lr"
     },
     "segnorsLoopLeft2Standard2lw": {
        "name": "Segnor's Loop Left 2 Standard 2LW",
        "speed": 2,
        "bearing": "Segnor's Loop Left",
        "difficulty": "Standard",
        "dial": "2LW",
        "key": "segnorsLoopLeft2Standard2lw"
     },
     "segnorsLoopLeft3Hard3lr": {
        "name": "Segnor's Loop Left 3 Hard 3LR",
        "speed": 3,
        "bearing": "Segnor's Loop Left",
        "difficulty": "Hard",
        "dial": "3LR",
        "key": "segnorsLoopLeft3Hard3lr"
     },
     "segnorsLoopRight1Hard1pr": {
        "name": "Segnor's Loop Right 1 Hard 1PR",
        "speed": 1,
        "bearing": "Segnor's Loop Right",
        "difficulty": "Hard",
        "dial": "1PR",
        "key": "segnorsLoopRight1Hard1pr"
     },
     "segnorsLoopRight2Hard2pr": {
        "name": "Segnor's Loop Right 2 Hard 2PR",
        "speed": 2,
        "bearing": "Segnor's Loop Right",
        "difficulty": "Hard",
        "dial": "2PR",
        "key": "segnorsLoopRight2Hard2pr"
     },
     "segnorsLoopRight3Hard3pr": {
        "name": "Segnor's Loop Right 3 Hard 3PR",
        "speed": 3,
        "bearing": "Segnor's Loop Right",
        "difficulty": "Hard",
        "dial": "3PR",
        "key": "segnorsLoopRight3Hard3pr"
     },
     "stationary0Hard0or": {
        "name": "Stationary 0 Hard 0OR",
        "speed": 0,
        "bearing": "Stationary",
        "difficulty": "Hard",
        "dial": "0OR",
        "key": "stationary0Hard0or"
     },
     "straight1Easy1fg": {
        "name": "Straight 1 Easy 1FG",
        "speed": 1,
        "bearing": "Straight",
        "difficulty": "Easy",
        "dial": "1FG",
        "key": "straight1Easy1fg"
     },
     "straight1Standard1fw": {
        "name": "Straight 1 Standard 1FW",
        "speed": 1,
        "bearing": "Straight",
        "difficulty": "Standard",
        "dial": "1FW",
        "key": "straight1Standard1fw"
     },
     "straight2Easy2fg": {
        "name": "Straight 2 Easy 2FG",
        "speed": 2,
        "bearing": "Straight",
        "difficulty": "Easy",
        "dial": "2FG",
        "key": "straight2Easy2fg"
     },
     "straight3Easy3fg": {
        "name": "Straight 3 Easy 3FG",
        "speed": 3,
        "bearing": "Straight",
        "difficulty": "Easy",
        "dial": "3FG",
        "key": "straight3Easy3fg"
     },
     "straight3Standard3fw": {
        "name": "Straight 3 Standard 3FW",
        "speed": 3,
        "bearing": "Straight",
        "difficulty": "Standard",
        "dial": "3FW",
        "key": "straight3Standard3fw"
     },
     "straight4Easy4fg": {
        "name": "Straight 4 Easy 4FG",
        "speed": 4,
        "bearing": "Straight",
        "difficulty": "Easy",
        "dial": "4FG",
        "key": "straight4Easy4fg"
     },
     "straight4Hard4fr": {
        "name": "Straight 4 Hard 4FR",
        "speed": 4,
        "bearing": "Straight",
        "difficulty": "Hard",
        "dial": "4FR",
        "key": "straight4Hard4fr"
     },
     "straight4Standard4fw": {
        "name": "Straight 4 Standard 4FW",
        "speed": 4,
        "bearing": "Straight",
        "difficulty": "Standard",
        "dial": "4FW",
        "key": "straight4Standard4fw"
     },
     "straight5Easy5fg": {
        "name": "Straight 5 Easy 5FG",
        "speed": 5,
        "bearing": "Straight",
        "difficulty": "Easy",
        "dial": "5FG",
        "key": "straight5Easy5fg"
     },
     "straight5Hard5fr": {
        "name": "Straight 5 Hard 5FR",
        "speed": 5,
        "bearing": "Straight",
        "difficulty": "Hard",
        "dial": "5FR",
        "key": "straight5Hard5fr"
     },
     "straight5Standard5fw": {
        "name": "Straight 5 Standard 5FW",
        "speed": 5,
        "bearing": "Straight",
        "difficulty": "Standard",
        "dial": "5FW",
        "key": "straight5Standard5fw"
     },
     "tallonRollLeft2Hard2er": {
        "name": "Tallon Roll Left 2 Hard 2ER",
        "speed": 2,
        "bearing": "Tallon Roll Left",
        "difficulty": "Hard",
        "dial": "2ER",
        "key": "tallonRollLeft2Hard2er"
     },
     "tallonRollLeft3Hard3er": {
        "name": "Tallon Roll Left 3 Hard 3ER",
        "speed": 3,
        "bearing": "Tallon Roll Left",
        "difficulty": "Hard",
        "dial": "3ER",
        "key": "tallonRollLeft3Hard3er"
     },
     "tallonRollRight2Hard2rr": {
        "name": "Tallon Roll Right 2 Hard 2RR",
        "speed": 2,
        "bearing": "Tallon Roll Right",
        "difficulty": "Hard",
        "dial": "2RR",
        "key": "tallonRollRight2Hard2rr"
     },
     "tallonRollRight3Hard3rr": {
        "name": "Tallon Roll Right 3 Hard 3RR",
        "speed": 3,
        "bearing": "Tallon Roll Right",
        "difficulty": "Hard",
        "dial": "3RR",
        "key": "tallonRollRight3Hard3rr"
     },
     "turnLeft1Easy1tg": {
        "name": "Turn Left 1 Easy 1TG",
        "speed": 1,
        "bearing": "Turn Left",
        "difficulty": "Easy",
        "dial": "1TG",
        "key": "turnLeft1Easy1tg"
     },
     "turnLeft1Hard1tr": {
        "name": "Turn Left 1 Hard 1TR",
        "speed": 1,
        "bearing": "Turn Left",
        "difficulty": "Hard",
        "dial": "1TR",
        "key": "turnLeft1Hard1tr"
     },
     "turnLeft1Standard1tw": {
        "name": "Turn Left 1 Standard 1TW",
        "speed": 1,
        "bearing": "Turn Left",
        "difficulty": "Standard",
        "dial": "1TW",
        "key": "turnLeft1Standard1tw"
     },
     "turnLeft2Easy2tg": {
        "name": "Turn Left 2 Easy 2TG",
        "speed": 2,
        "bearing": "Turn Left",
        "difficulty": "Easy",
        "dial": "2TG",
        "key": "turnLeft2Easy2tg"
     },
     "turnLeft2Hard2tr": {
        "name": "Turn Left 2 Hard 2TR",
        "speed": 2,
        "bearing": "Turn Left",
        "difficulty": "Hard",
        "dial": "2TR",
        "key": "turnLeft2Hard2tr"
     },
     "turnLeft2Standard2tw": {
        "name": "Turn Left 2 Standard 2TW",
        "speed": 2,
        "bearing": "Turn Left",
        "difficulty": "Standard",
        "dial": "2TW",
        "key": "turnLeft2Standard2tw"
     },
     "turnLeft3Easy3tg": {
        "name": "Turn Left 3 Easy 3TG",
        "speed": 3,
        "bearing": "Turn Left",
        "difficulty": "Easy",
        "dial": "3TG",
        "key": "turnLeft3Easy3tg"
     },
     "turnLeft3Hard3tr": {
        "name": "Turn Left 3 Hard 3TR",
        "speed": 3,
        "bearing": "Turn Left",
        "difficulty": "Hard",
        "dial": "3TR",
        "key": "turnLeft3Hard3tr"
     },
     "turnLeft3Standard3tw": {
        "name": "Turn Left 3 Standard 3TW",
        "speed": 3,
        "bearing": "Turn Left",
        "difficulty": "Standard",
        "dial": "3TW",
        "key": "turnLeft3Standard3tw"
     },
     "turnRight1Easy1yg": {
        "name": "Turn Right 1 Easy 1YG",
        "speed": 1,
        "bearing": "Turn Right",
        "difficulty": "Easy",
        "dial": "1YG",
        "key": "turnRight1Easy1yg"
     },
     "turnRight1Hard1yr": {
        "name": "Turn Right 1 Hard 1YR",
        "speed": 1,
        "bearing": "Turn Right",
        "difficulty": "Hard",
        "dial": "1YR",
        "key": "turnRight1Hard1yr"
     },
     "turnRight1Standard1yw": {
        "name": "Turn Right 1 Standard 1YW",
        "speed": 1,
        "bearing": "Turn Right",
        "difficulty": "Standard",
        "dial": "1YW",
        "key": "turnRight1Standard1yw"
     },
     "turnRight2Easy2yg": {
        "name": "Turn Right 2 Easy 2YG",
        "speed": 2,
        "bearing": "Turn Right",
        "difficulty": "Easy",
        "dial": "2YG",
        "key": "turnRight2Easy2yg"
     },
     "turnRight2Hard2yr": {
        "name": "Turn Right 2 Hard 2YR",
        "speed": 2,
        "bearing": "Turn Right",
        "difficulty": "Hard",
        "dial": "2YR",
        "key": "turnRight2Hard2yr"
     },
     "turnRight2Standard2yw": {
        "name": "Turn Right 2 Standard 2YW",
        "speed": 2,
        "bearing": "Turn Right",
        "difficulty": "Standard",
        "dial": "2YW",
        "key": "turnRight2Standard2yw"
     },
     "turnRight3Easy3yg": {
        "name": "Turn Right 3 Easy 3YG",
        "speed": 3,
        "bearing": "Turn Right",
        "difficulty": "Easy",
        "dial": "3YG",
        "key": "turnRight3Easy3yg"
     },
     "turnRight3Hard3yr": {
        "name": "Turn Right 3 Hard 3YR",
        "speed": 3,
        "bearing": "Turn Right",
        "difficulty": "Hard",
        "dial": "3YR",
        "key": "turnRight3Hard3yr"
     },
     "turnRight3Standard3yw": {
        "name": "Turn Right 3 Standard 3YW",
        "speed": 3,
        "bearing": "Turn Right",
        "difficulty": "Standard",
        "dial": "3YW",
        "key": "turnRight3Standard3yw"
     }
  };

  Object.freeze(Maneuver);

  const StringUtilities = {};

  StringUtilities.toCamelCase = str =>
    str
      .split(" ")
      .map((word, index) => {
        // If it is the first word make sure to lowercase all the chars.
        if (index === 0) {
          return word.toLowerCase();
        }

        // If it is not the first word only upper case the first char and lowercase the rest.
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join("");

  const ManeuverUtilities = {};

  const BEARING_MAP = {
    T: "Turn Left",
    B: "Bank Left",
    F: "Straight",
    N: "Bank Right",
    Y: "Turn Right",
    K: "Koiogran Turn",
    R: "Tallon Roll Right",
    E: "Tallon Roll Left",
    L: "Segnors Loop Left",
    P: "Segnors Loop Right",
    A: "Reverse Bank Left",
    D: "Reverse Bank Right",
    S: "Reverse Straight",
    O: "Stationary"
  };
  const DIFFICULTY_MAP = {
    G: "Easy",
    W: "Standard",
    R: "Hard"
  };

  ManeuverUtilities.dialToManeuver = dial => {
    const speed = parseInt(dial.charAt(0), 10);
    const bearing = BEARING_MAP[dial.charAt(1)];
    const difficulty = DIFFICULTY_MAP[dial.charAt(2)];
    const name = `${bearing} ${speed} ${difficulty} ${dial}`;

    return StringUtilities.toCamelCase(name);
  };

  const Phase = {
    SETUP: "setup",

    PLANNING_START: "planningStart",
    PLANNING: "planning",
    PLANNING_END: "planningEnd",

    ACTIVATION_START: "activationStart",
    ACTIVATION_REVEAL_DIAL: "activationRevealDial",
    ACTIVATION_SET_TEMPLATE: "activationSetTemplate",
    ACTIVATION_EXECUTE_MANEUVER: "activationExecuteManeuver",
    ACTIVATION_CHECK_PILOT_STRESS: "activationCheckPilotStress",
    ACTIVATION_CLEAN_UP: "activationCleanUp",
    ACTIVATION_GAIN_ENERGY: "activationGainEnergy",
    ACTIVATION_ALLOCATE_ENERGY: "activationAllocateEnergy",
    ACTIVATION_USE_ENERGY: "activationUseEnergy",
    ACTIVATION_PERFORM_ACTION: "activationPerformAction",
    ACTIVATION_END: "activationEnd",

    COMBAT_START: "combatStart",
    COMBAT_DECLARE_TARGET: "combatDeclareTarget",
    COMBAT_ROLL_ATTACK_DICE: "combatRollAttackDice",
    COMBAT_MODIFY_ATTACK_DICE: "combatModifyAttackDice",
    COMBAT_ROLL_DEFENSE_DICE: "combatRollDefenseDice",
    COMBAT_MODIFY_DEFENSE_DICE: "combatModifyDefenseDice",
    COMBAT_COMPARE_RESULTS: "combatCompareResults",
    COMBAT_NOTIFY_DAMAGE: "combatNotifyDamage",
    COMBAT_DEAL_DAMAGE: "combatDealDamage",
    COMBAT_AFTER_DEAL_DAMAGE: "combatAfterDealDamage",
    COMBAT_END: "combatEnd",

    END_START: "endStart",
    END_CLEAN_UP: "endCleanUp",
    END_ROUND_END: "endRoundEnd",
    END_END: "endEnd"
  };

  Phase.properties = {
    setup: {
      name: "Setup",
      key: "setup"
    },
    planningStart: {
      name: "Planning (start)",
      key: "planningStart"
    },
    planning: {
      name: "Planning",
      key: "planning"
    },
    planningEnd: {
      name: "Planning (end)",
      key: "planningEnd"
    },
    activationStart: {
      name: "Activation (start)",
      key: "activationStart"
    },
    activationRevealDial: {
      name: "Activation (reveal dial)",
      key: "activationRevealDial"
    },
    activationSetTemplate: {
      name: "Activation (set template)",
      key: "activationSetTemplate"
    },
    activationExecuteManeuver: {
      name: "Activation (execute maneuver)",
      key: "activationExecuteManeuver"
    },
    activationCheckPilotStress: {
      name: "Activation (check pilot stress)",
      key: "activationCheckPilotStress"
    },
    activationCleanUp: {
      name: "Activation (clean up)",
      key: "activationCleanUp"
    },
    activationGainEnergy: {
      name: "Activation (gain energy)",
      key: "activationGainEnergy"
    },
    activationAllocateEnergy: {
      name: "Activation (allocate energy)",
      key: "activationAllocateEnergy"
    },
    activationUseEnergy: {
      name: "Activation (use energy)",
      key: "activationUseEnergy"
    },
    activationPerformAction: {
      name: "Activation (perform action)",
      key: "activationPerformAction"
    },
    activationEnd: {
      name: "Activation (end)",
      key: "activationEnd"
    },
    combatStart: {
      name: "Combat (start)",
      key: "combatStart"
    },
    combatDeclareTarget: {
      name: "Combat (declare target)",
      key: "combatDeclareTarget"
    },
    combatRollAttackDice: {
      name: "Combat (roll attack dice)",
      key: "combatRollAttackDice"
    },
    combatModifyAttackDice: {
      name: "Combat (modify attack dice)",
      key: "combatModifyAttackDice"
    },
    combatRollDefenseDice: {
      name: "Combat (roll defense dice)",
      key: "combatRollDefenseDice"
    },
    combatModifyDefenseDice: {
      name: "Combat (modify defense dice)",
      key: "combatModifyDefenseDice"
    },
    combatCompareResults: {
      name: "Combat (compare results)",
      key: "combatCompareResults"
    },
    combatNotifyDamage: {
      name: "Combat (notify damage)",
      key: "combatNotifyDamage"
    },
    combatDealDamage: {
      name: "Combat (deal damage)",
      key: "combatDealDamage"
    },
    combatAfterDealDamage: {
      name: "Combat (after deal damage)",
      key: "combatAfterDealDamage"
    },
    combatEnd: {
      name: "Combat (end)",
      key: "combatEnd"
    },
    endStart: {
      name: "End (start)",
      key: "endStart"
    },
    endCleanUp: {
      name: "End (clean up)",
      key: "endCleanUp"
    },
    endRoundEnd: {
      name: "End (round end)",
      key: "endRoundEnd"
    },
    endEnd: {
      name: "End (end)",
      key: "endEnd"
    }
  };

  Object.freeze(Phase);

  const PilotCard = {

    ACADEMY_PILOT: "academyPilot",
    AHSOKA_TANO: "ahsokaTano",
    AIREN_CRACKEN: "airenCracken",
    ALPHA_SQUADRON_PILOT: "alphaSquadronPilot",
    AP_5: "ap5",
    ARVEL_CRYNYD: "arvelCrynyd",
    ASAJJ_VENTRESS: "asajjVentress",
    AVENGER_SQUADRON_PILOT: "avengerSquadronPilot",
    BACKDRAFT: "backdraft",
    BACKSTABBER: "backstabber",
    BANDIT_SQUADRON_PILOT: "banditSquadronPilot",
    BARON_OF_THE_EMPIRE: "baronOfTheEmpire",
    BENTHIC_TWO_TUBES: "benthicTwoTubes",
    BIGGS_DARKLIGHTER: "biggsDarklighter",
    BINAYRE_PIRATE: "binayrePirate",
    BLACK_EIGHT_SQUADRON_PILOT: "blackEightSquadronPilot",
    BLACK_SQUADRON_PILOT: "blackSquadronPilot",
    BLACK_SQUADRON_SCOUT: "blackSquadronScout",
    BLACK_SUN_ACE: "blackSunAce",
    BLACK_SUN_ASSASSIN: "blackSunAssassin",
    BLACK_SUN_ENFORCER: "blackSunEnforcer",
    BLACK_SUN_SOLDIER: "blackSunSoldier",
    BLACK_SUN_VIGO: "blackSunVigo",
    BLACKMOON_SQUADRON_PILOT: "blackmoonSquadronPilot",
    BLUE_ACE: "blueAce",
    BLUE_SQUADRON_NOVICE: "blueSquadronNovice",
    BLUE_SQUADRON_PATHFINDER: "blueSquadronPathfinder",
    BLUE_SQUADRON_PILOT: "blueSquadronPilot",
    BOBA_FETT_GALACTIC_EMPIRE: "bobaFett_galacticEmpire",
    BOBA_FETT_SCUM_AND_VILLAINY: "bobaFett_scumAndVillainy",
    BODHI_ROOK: "bodhiRook",
    BOSSK: "bossk",
    BOUNTY_HUNTER: "bountyHunter",
    BRAYLEN_STRAMM: "braylenStramm",
    C_ROC_CRUISER: "cRocCruiser",
    CAPTAIN_FEROPH: "captainFeroph",
    CAPTAIN_JONUS: "captainJonus",
    CAPTAIN_JOSTERO: "captainJostero",
    CAPTAIN_KAGI: "captainKagi",
    CAPTAIN_NYM_REBEL_ALLIANCE: "captainNym_rebelAlliance",
    CAPTAIN_NYM_SCUM_AND_VILLAINY: "captainNym_scumAndVillainy",
    CAPTAIN_OICUNN: "captainOicunn",
    CAPTAIN_REX: "captainRex",
    CAPTAIN_YORR: "captainYorr",
    CARNOR_JAX: "carnorJax",
    CARTEL_BRUTE: "cartelBrute",
    CARTEL_EXECUTIONER: "cartelExecutioner",
    CARTEL_MARAUDER: "cartelMarauder",
    CARTEL_SPACER: "cartelSpacer",
    CASSIAN_ANDOR: "cassianAndor",
    CAVERN_ANGELS_ZEALOT: "cavernAngelsZealot",
    CHASER: "chaser",
    CHEWBACCA_REBEL_ALLIANCE: "chewbacca_rebelAlliance",
    CHEWBACCA_RESISTANCE: "chewbacca_resistance",
    CHOPPER: "chopper",
    COBALT_LEADER: "cobaltLeader",
    COLONEL_JENDON: "colonelJendon",
    COLONEL_VESSERY: "colonelVessery",
    COMMANDER_ALOZEN: "commanderAlozen",
    COMMANDER_KENKIRK: "commanderKenkirk",
    CONCORD_DAWN_ACE: "concordDawnAce",
    CONCORD_DAWN_VETERAN: "concordDawnVeteran",
    CONSTABLE_ZUVIO: "constableZuvio",
    CONTRACTED_SCOUT: "contractedScout",
    CORRAN_HORN: "corranHorn",
    COUNTDOWN: "countdown",
    COUNTESS_RYAD: "countessRyad",
    CR90_CORVETTE_AFT: "cr90CorvetteAft",
    CR90_CORVETTE_FORE: "cr90CorvetteFore",
    CRIMSON_LEADER: "crimsonLeader",
    CRIMSON_SPECIALIST: "crimsonSpecialist",
    CRIMSON_SQUADRON_PILOT: "crimsonSquadronPilot",
    CUTLASS_SQUADRON_PILOT: "cutlassSquadronPilot",
    DACE_BONEARM: "daceBonearm",
    DAGGER_SQUADRON_PILOT: "daggerSquadronPilot",
    DALAN_OBEROS_M12_L_KIMOGILA_FIGHTER: "dalanOberos_m12LKimogilaFighter",
    DALAN_OBEROS_STARVIPER: "dalanOberos_starviper",
    DARK_CURSE: "darkCurse",
    DARTH_VADER: "darthVader",
    DASH_RENDAR: "dashRendar",
    DEATHFIRE: "deathfire",
    DEATHRAIN: "deathrain",
    DELTA_SQUADRON_PILOT: "deltaSquadronPilot",
    DENGAR: "dengar",
    DOUBLE_EDGE: "doubleEdge",
    DREA_RENTHAL: "dreaRenthal",
    DUCHESS: "duchess",
    DUTCH_VANDER: "dutchVander",
    EADEN_VRILL: "eadenVrill",
    ECHO: "echo",
    EDRIO_TWO_TUBES: "edrioTwoTubes",
    ELLO_ASTY: "elloAsty",
    EMON_AZZAMEEN: "emonAzzameen",
    EPSILON_ACE: "epsilonAce",
    EPSILON_LEADER: "epsilonLeader",
    EPSILON_SQUADRON_PILOT: "epsilonSquadronPilot",
    ESEGE_TUKETU: "esegeTuketu",
    ETAHN_ABAHT: "etahnAbaht",
    EZRA_BRIDGER_ATTACK_SHUTTLE: "ezraBridger_attackShuttle",
    EZRA_BRIDGER_SHEATHIPEDE_CLASS_SHUTTLE: "ezraBridger_sheathipedeClassShuttle",
    FELS_WRATH: "felsWrath",
    FENN_RAU_REBEL_ALLIANCE: "fennRau_rebelAlliance",
    FENN_RAU_SCUM_AND_VILLAINY: "fennRau_scumAndVillainy",
    FIRST_ORDER_TEST_PILOT: "firstOrderTestPilot",
    FOUR_LOM: "fourLom",
    GAMMA_SQUADRON_PILOT: "gammaSquadronPilot",
    GAMMA_SQUADRON_VETERAN: "gammaSquadronVeteran",
    GAND_FINDSMAN: "gandFindsman",
    GARVEN_DREIS: "garvenDreis",
    GEMMER_SOJAN: "gemmerSojan",
    GENESIS_RED: "genesisRed",
    GLAIVE_SQUADRON_PILOT: "glaiveSquadronPilot",
    GOLD_SQUADRON_PILOT: "goldSquadronPilot",
    GOZANTI_CLASS_CRUISER: "gozantiClassCruiser",
    GR_75_MEDIUM_TRANSPORT: "gr75MediumTransport",
    GRAY_SQUADRON_PILOT: "graySquadronPilot",
    GRAZ_THE_HUNTER: "grazTheHunter",
    GREEN_SQUADRON_PILOT: "greenSquadronPilot",
    GUARDIAN_SQUADRON_PILOT: "guardianSquadronPilot",
    GURI: "guri",
    HAN_SOLO_REBEL_ALLIANCE: "hanSolo_rebelAlliance",
    HAN_SOLO_RESISTANCE: "hanSolo_resistance",
    HEFF_TOBBER: "heffTobber",
    HERA_SYNDULLA_ATTACK_SHUTTLE: "heraSyndulla_attackShuttle",
    HERA_SYNDULLA_VCX_100: "heraSyndulla_vcx100",
    HIRED_GUN: "hiredGun",
    HOBBIE_KLIVIAN: "hobbieKlivian",
    HORTON_SALM: "hortonSalm",
    HOWLRUNNER: "howlrunner",
    IBTISAM: "ibtisam",
    IG_88A: "ig88a",
    IG_88B: "ig88b",
    IG_88C: "ig88c",
    IG_88D: "ig88d",
    IMPERIAL_TRAINEE: "imperialTrainee",
    INALDRA: "inaldra",
    JAKE_FARRELL: "jakeFarrell",
    JAKKU_GUNRUNNER: "jakkuGunrunner",
    JAN_ORS: "janOrs",
    JEK_PORKINS: "jekPorkins",
    JESS_PAVA: "jessPava",
    JUNO_ECLIPSE: "junoEclipse",
    KAATO_LEEACHOS: "kaatoLeeachos",
    KAD_SOLUS: "kadSolus",
    KANAN_JARRUS: "kananJarrus",
    KARTHAKK_PIRATE: "karthakkPirate",
    KASHYYYK_DEFENDER: "kashyyykDefender",
    KATH_SCARLET_GALACTIC_EMPIRE: "kathScarlet_galacticEmpire",
    KATH_SCARLET_SCUM_AND_VILLAINY: "kathScarlet_scumAndVillainy",
    KAVIL: "kavil",
    KETSU_ONYO: "ketsuOnyo",
    KEYAN_FARLANDER: "keyanFarlander",
    KIR_KANOS: "kirKanos",
    KNAVE_SQUADRON_PILOT: "knaveSquadronPilot",
    KRASSIS_TRELIX: "krassisTrelix",
    KULLBEE_SPERADO: "kullbeeSperado",
    KYLE_KATARN: "kyleKatarn",
    KYLO_REN_TIE_SILENCER: "kyloRen_tieSilencer",
    KYLO_REN_UPSILON_CLASS_SHUTTLE: "kyloRen_upsilonClassShuttle",
    LAETIN_ASHERA: "laetinAshera",
    LANDO_CALRISSIAN: "landoCalrissian",
    LATTS_RAZZI: "lattsRazzi",
    LEEBO: "leebo",
    LEEVAN_TENZA: "leevanTenza",
    LIEUTENANT_BLOUNT: "lieutenantBlount",
    LIEUTENANT_COLZET: "lieutenantColzet",
    LIEUTENANT_DORMITZ: "lieutenantDormitz",
    LIEUTENANT_KARSABI: "lieutenantKarsabi",
    LIEUTENANT_KESTAL: "lieutenantKestal",
    LIEUTENANT_LORRIR: "lieutenantLorrir",
    LOK_REVENANT: "lokRevenant",
    LOTHAL_REBEL: "lothalRebel",
    LOWHHRICK: "lowhhrick",
    LUKE_SKYWALKER: "lukeSkywalker",
    MAAREK_STELE_TIE_ADVANCED: "maarekStele_tieAdvanced",
    MAAREK_STELE_TIE_DEFENDER: "maarekStele_tieDefender",
    MAGVA_YARRO: "magvaYarro",
    MAJOR_RHYMER: "majorRhymer",
    MAJOR_STRIDAN: "majorStridan",
    MAJOR_VERMEIL: "majorVermeil",
    MAJOR_VYNDER: "majorVynder",
    MANAROO: "manaroo",
    MANDALORIAN_MERCENARY: "mandalorianMercenary",
    MAULER_MITHEL: "maulerMithel",
    MIRANDA_DONI: "mirandaDoni",
    MORALO_EVAL: "moraloEval",
    NASHTAH_PUP_PILOT: "nashtahPupPilot",
    NDRU_SUHLAK: "ndruSuhlak",
    NERA_DANTELS: "neraDantels",
    NIEN_NUNB: "nienNunb",
    NIGHT_BEAST: "nightBeast",
    NORRA_WEXLEY: "norraWexley",
    NU_SQUADRON_PILOT: "nuSquadronPilot",
    OBSIDIAN_SQUADRON_PILOT: "obsidianSquadronPilot",
    OLD_TEROCH: "oldTeroch",
    OMEGA_ACE: "omegaAce",
    OMEGA_LEADER: "omegaLeader",
    OMEGA_SPECIALIST: "omegaSpecialist",
    OMEGA_SQUADRON_PILOT: "omegaSquadronPilot",
    OMICRON_GROUP_PILOT: "omicronGroupPilot",
    ONYX_SQUADRON_ESCORT: "onyxSquadronEscort",
    ONYX_SQUADRON_PILOT: "onyxSquadronPilot",
    OUTER_RIM_SMUGGLER: "outerRimSmuggler",
    PALOB_GODALHI: "palobGodalhi",
    PARTISAN_RENEGADE: "partisanRenegade",
    PATROL_LEADER: "patrolLeader",
    POE_DAMERON: "poeDameron",
    POE_DAMERON_HOTR: "poeDameron_hotr",
    PRINCE_XIZOR: "princeXizor",
    PROTOTYPE_PILOT: "prototypePilot",
    PURE_SABACC: "pureSabacc",
    QUICKDRAW: "quickdraw",
    QUINN_JAST: "quinnJast",
    RAIDER_CLASS_CORVETTE_AFT: "raiderClassCorvetteAft",
    RAIDER_CLASS_CORVETTE_FORE: "raiderClassCorvetteFore",
    REAR_ADMIRAL_CHIRANEAU: "rearAdmiralChiraneau",
    REBEL_OPERATIVE: "rebelOperative",
    RED_ACE: "redAce",
    RED_SQUADRON_PILOT: "redSquadronPilot",
    RED_SQUADRON_VETERAN: "redSquadronVeteran",
    REDLINE: "redline",
    RESISTANCE_SYMPATHIZER: "resistanceSympathizer",
    REXLER_BRATH: "rexlerBrath",
    REY: "rey",
    RHO_SQUADRON_VETERAN: "rhoSquadronVeteran",
    ROARK_GARNET: "roarkGarnet",
    ROOKIE_PILOT: "rookiePilot",
    ROYAL_GUARD_PILOT: "royalGuardPilot",
    RUTHLESS_FREELANCER: "ruthlessFreelancer",
    SABER_SQUADRON_PILOT: "saberSquadronPilot",
    SABINE_WREN_ATTACK_SHUTTLE: "sabineWren_attackShuttle",
    SABINE_WREN_LANCER_CLASS_PURSUIT_CRAFT: "sabineWren_lancerClassPursuitCraft",
    SABINE_WREN_TIE_FIGHTER: "sabineWren_tieFighter",
    SARCO_PLANK: "sarcoPlank",
    SAW_GERRERA: "sawGerrera",
    SCARIF_BASE_PILOT: "scarifBasePilot",
    SCARIF_DEFENDER: "scarifDefender",
    SCIMITAR_SQUADRON_PILOT: "scimitarSquadronPilot",
    SCOURGE: "scourge",
    SERISSU: "serissu",
    SHADOW_SQUADRON_PILOT: "shadowSquadronPilot",
    SHADOWPORT_HUNTER: "shadowportHunter",
    SHARA_BEY: "sharaBey",
    SIENAR_JAEMUS_ANALYST: "sienarJaemusAnalyst",
    SIENAR_SPECIALIST: "sienarSpecialist",
    SIENAR_TEST_PILOT: "sienarTestPilot",
    SIGMA_SQUADRON_PILOT: "sigmaSquadronPilot",
    SNAP_WEXLEY: "snapWexley",
    SOL_SIXXA: "solSixxa",
    SOONTIR_FEL: "soontirFel",
    SPICE_RUNNER: "spiceRunner",
    STARKILLER_BASE_PILOT: "starkillerBasePilot",
    STORM_SQUADRON_PILOT: "stormSquadronPilot",
    SUNNY_BOUNDER: "sunnyBounder",
    SYNDICATE_THUG: "syndicateThug",
    TALA_SQUADRON_PILOT: "talaSquadronPilot",
    TALONBANE_COBRA: "talonbaneCobra",
    TANSARII_POINT_VETERAN: "tansariiPointVeteran",
    TARN_MISON: "tarnMison",
    TEL_TREVURA: "telTrevura",
    TEMPEST_SQUADRON_PILOT: "tempestSquadronPilot",
    TEN_NUMB: "tenNumb",
    TEST_PILOT_BLACKOUT: "testPilotBlackout",
    TETRAN_COWALL: "tetranCowall",
    THANE_KYRELL: "thaneKyrell",
    THE_INQUISITOR: "theInquisitor",
    THWEEK: "thweek",
    TOMAX_BREN: "tomaxBren",
    TORANI_KULDA: "toraniKulda",
    TORKIL_MUX: "torkilMux",
    TRANDOSHAN_SLAVER: "trandoshanSlaver",
    TURR_PHENNIR: "turrPhennir",
    TYCHO_CELCHU: "tychoCelchu",
    UNKAR_PLUTT: "unkarPlutt",
    VALEN_RUDOR: "valenRudor",
    VIKTOR_HEL: "viktorHel",
    VIZIER: "vizier",
    WAMPA: "wampa",
    WARDEN_SQUADRON_PILOT: "wardenSquadronPilot",
    WEDGE_ANTILLES: "wedgeAntilles",
    WES_JANSON: "wesJanson",
    WHISPER: "whisper",
    WILD_SPACE_FRINGER: "wildSpaceFringer",
    WINGED_GUNDARK: "wingedGundark",
    WOOKIEE_LIBERATOR: "wookieeLiberator",
    WULLFFWARRO: "wullffwarro",
    YOUNGSTER: "youngster",
    ZEALOUS_RECRUIT: "zealousRecruit",
    ZEB_ORRELIOS_ATTACK_SHUTTLE: "zebOrrelios_attackShuttle",
    ZEB_ORRELIOS_SHEATHIPEDE_CLASS_SHUTTLE: "zebOrrelios_sheathipedeClassShuttle",
    ZEB_ORRELIOS_TIE_FIGHTER: "zebOrrelios_tieFighter",
    ZERTIK_STROM: "zertikStrom",
    ZETA_ACE: "zetaAce",
    ZETA_LEADER: "zetaLeader",
    ZETA_SPECIALIST: "zetaSpecialist",
    ZETA_SQUADRON_PILOT: "zetaSquadronPilot",
    ZUCKUSS: "zuckuss",
  };

  PilotCard.properties = 
  {
     "academyPilot": {
        "name": "Academy Pilot",
        "id": 10,
        "ship": "TIE Fighter",
        "skill": 1,
        "points": 12,
        "slots": [],
        "image": "pilots/Galactic Empire/TIE Fighter/academy-pilot.png",
        "faction": "Galactic Empire",
        "xws": "academypilot",
        "key": "academyPilot"
     },
     "ahsokaTano": {
        "image": "pilots/Rebel Alliance/TIE Fighter/ahsoka-tano.png",
        "text": "At the start of the Combat phase, you may spend 1 focus token to choose a friendly ship at Range 1. It may perform 1 free action.",
        "name": "Ahsoka Tano",
        "xws": "ahsokatano",
        "ship": "TIE Fighter",
        "unique": true,
        "skill": 7,
        "points": 17,
        "faction": "Rebel Alliance",
        "slots": [
           "Elite"
        ],
        "id": 225,
        "key": "ahsokaTano"
     },
     "airenCracken": {
        "name": "Airen Cracken",
        "id": 66,
        "unique": true,
        "ship": "Z-95 Headhunter",
        "skill": 8,
        "points": 19,
        "slots": [
           "Elite",
           "Missile"
        ],
        "text": "After you perform an attack, you may choose another friendly ship at Range 1.  That ship may perform 1 free action.",
        "image": "pilots/Rebel Alliance/Z-95 Headhunter/airen-cracken.png",
        "faction": "Rebel Alliance",
        "xws": "airencracken",
        "key": "airenCracken"
     },
     "alphaSquadronPilot": {
        "name": "Alpha Squadron Pilot",
        "id": 23,
        "ship": "TIE Interceptor",
        "skill": 1,
        "points": 18,
        "slots": [],
        "image": "pilots/Galactic Empire/TIE Interceptor/alpha-squadron-pilot.png",
        "faction": "Galactic Empire",
        "xws": "alphasquadronpilot",
        "key": "alphaSquadronPilot"
     },
     "ap5": {
        "image": "pilots/Rebel Alliance/Sheathipede-class Shuttle/ap-5.png",
        "text": "When you perform the coordinate action, after you choose a friendly ship and before it performs a free action, you may receive 2 stress tokens to remove 1 stress token from it.",
        "name": "AP-5",
        "xws": "ap5",
        "ship": "Sheathipede-class Shuttle",
        "unique": true,
        "skill": 1,
        "points": 15,
        "faction": "Rebel Alliance",
        "slots": [
           "Astromech",
           "Crew"
        ],
        "id": 277,
        "key": "ap5"
     },
     "arvelCrynyd": {
        "name": "Arvel Crynyd",
        "id": 30,
        "unique": true,
        "ship": "A-wing",
        "skill": 6,
        "points": 23,
        "slots": [
           "Missile"
        ],
        "text": "You may declare an enemy ship inside your firing arc that you are touching as the target of your attack.",
        "image": "pilots/Rebel Alliance/A-wing/arvel-crynyd.png",
        "faction": "Rebel Alliance",
        "xws": "arvelcrynyd",
        "key": "arvelCrynyd"
     },
     "asajjVentress": {
        "image": "pilots/Scum and Villainy/Lancer-class Pursuit Craft/asajj-ventress.png",
        "text": "At the start of the Combat phase, you may choose a ship at Range 1-2. If it is inside your mobile firing arc, assign 1 stress token to it.",
        "name": "Asajj Ventress",
        "xws": "asajjventress",
        "ship": "Lancer-class Pursuit Craft",
        "unique": true,
        "skill": 6,
        "points": 37,
        "faction": "Scum and Villainy",
        "slots": [
           "Crew",
           "Elite",
           "Illicit",
           "Illicit"
        ],
        "id": 211,
        "key": "asajjVentress"
     },
     "avengerSquadronPilot": {
        "name": "Avenger Squadron Pilot",
        "id": 24,
        "ship": "TIE Interceptor",
        "skill": 3,
        "points": 20,
        "slots": [],
        "image": "pilots/Galactic Empire/TIE Interceptor/avenger-squadron-pilot.png",
        "faction": "Galactic Empire",
        "xws": "avengersquadronpilot",
        "key": "avengerSquadronPilot"
     },
     "backdraft": {
        "image": "pilots/First Order/TIE-sf Fighter/backdraft.png",
        "text": "When attacking a ship inside your auxiliary firing arc, you may add 1 [Critical Hit] result.",
        "name": "\"Backdraft\"",
        "xws": "backdraft",
        "ship": "TIE/sf Fighter",
        "unique": true,
        "skill": 7,
        "points": 27,
        "faction": "First Order",
        "slots": [
           "Elite",
           "Missile",
           "System",
           "Tech"
        ],
        "id": 205,
        "key": "backdraft"
     },
     "backstabber": {
        "name": "\"Backstabber\"",
        "id": 15,
        "unique": true,
        "ship": "TIE Fighter",
        "skill": 6,
        "points": 16,
        "slots": [],
        "text": "When attacking from outside the defender's firing arc, roll 1 additional attack die.",
        "image": "pilots/Galactic Empire/TIE Fighter/backstabber.png",
        "faction": "Galactic Empire",
        "xws": "backstabber",
        "key": "backstabber"
     },
     "banditSquadronPilot": {
        "name": "Bandit Squadron Pilot",
        "id": 63,
        "ship": "Z-95 Headhunter",
        "skill": 2,
        "points": 12,
        "slots": [
           "Missile"
        ],
        "image": "pilots/Rebel Alliance/Z-95 Headhunter/bandit-squadron-pilot.png",
        "faction": "Rebel Alliance",
        "xws": "banditsquadronpilot",
        "key": "banditSquadronPilot"
     },
     "baronOfTheEmpire": {
        "name": "Baron of the Empire",
        "xws": "baronoftheempire",
        "ship": "TIE Adv. Prototype",
        "skill": 4,
        "points": 19,
        "faction": "Galactic Empire",
        "slots": [
           "Missile",
           "Elite"
        ],
        "id": 187,
        "image": "pilots/Galactic Empire/TIE Adv. Prototype/baron-of-the-empire.png",
        "key": "baronOfTheEmpire"
     },
     "benthicTwoTubes": {
        "image": "pilots/Rebel Alliance/U-wing/benthic-two-tubes.png",
        "text": "After you perform a focus action, you may remove 1 of your focus tokens to assign it to a friendly ship at Range 1-2.",
        "name": "Benthic Two Tubes",
        "xws": "benthictwotubes",
        "ship": "U-wing",
        "unique": true,
        "skill": 4,
        "points": 24,
        "faction": "Rebel Alliance",
        "slots": [
           "Crew",
           "Crew",
           "System",
           "Torpedo"
        ],
        "id": 288,
        "key": "benthicTwoTubes"
     },
     "biggsDarklighter": {
        "name": "Biggs Darklighter",
        "id": 4,
        "unique": true,
        "ship": "X-wing",
        "skill": 5,
        "points": 25,
        "slots": [
           "Torpedo",
           "Astromech"
        ],
        "text": "Once per game, at the start of the Combat phase, you may choose that until the end of the round, other friendly ships at Range 1 cannot be targeted by attacks if the attacker could target you instead.",
        "image": "pilots/Rebel Alliance/X-wing/biggs-darklighter.png",
        "faction": "Rebel Alliance",
        "xws": "biggsdarklighter",
        "key": "biggsDarklighter"
     },
     "binayrePirate": {
        "name": "Binayre Pirate",
        "id": 107,
        "ship": "Z-95 Headhunter",
        "skill": 1,
        "points": 12,
        "slots": [
           "Missile",
           "Illicit"
        ],
        "faction": "Scum and Villainy",
        "image": "pilots/Scum and Villainy/Z-95 Headhunter/binayre-pirate.png",
        "xws": "binayrepirate",
        "key": "binayrePirate"
     },
     "blackEightSquadronPilot": {
        "name": "Black Eight Squadron Pilot",
        "id": 145,
        "ship": "TIE Punisher",
        "skill": 4,
        "points": 23,
        "slots": [
           "System",
           "Torpedo",
           "Torpedo",
           "Missile",
           "Missile",
           "Bomb",
           "Bomb"
        ],
        "image": "pilots/Galactic Empire/TIE Punisher/black-eight-squadron-pilot.png",
        "faction": "Galactic Empire",
        "xws": "blackeightsqpilot",
        "key": "blackEightSquadronPilot"
     },
     "blackSquadronPilot": {
        "name": "Black Squadron Pilot",
        "id": 12,
        "ship": "TIE Fighter",
        "skill": 4,
        "points": 14,
        "slots": [
           "Elite"
        ],
        "image": "pilots/Galactic Empire/TIE Fighter/black-squadron-pilot.png",
        "faction": "Galactic Empire",
        "xws": "blacksquadronpilot",
        "key": "blackSquadronPilot"
     },
     "blackSquadronScout": {
        "name": "Black Squadron Scout",
        "xws": "blacksquadronscout",
        "ship": "TIE Striker",
        "skill": 4,
        "points": 20,
        "faction": "Galactic Empire",
        "slots": [
           "Elite"
        ],
        "id": 239,
        "image": "pilots/Galactic Empire/TIE Striker/black-squadron-scout.png",
        "key": "blackSquadronScout"
     },
     "blackSunAce": {
        "name": "Black Sun Ace",
        "id": 136,
        "ship": "Kihraxz Fighter",
        "skill": 5,
        "points": 23,
        "slots": [
           "Elite",
           "Missile",
           "Illicit"
        ],
        "image": "pilots/Scum and Villainy/Kihraxz Fighter/black-sun-ace.png",
        "faction": "Scum and Villainy",
        "xws": "blacksunace",
        "ship_image": "ships/Scum and Villainy/kihraxz-fighter-v2.png",
        "key": "blackSunAce"
     },
     "blackSunAssassin": {
        "image": "pilots/Scum and Villainy/StarViper/black-sun-assassin.png",
        "name": "Black Sun Assassin",
        "xws": "blacksunassassin",
        "ship": "StarViper",
        "skill": 5,
        "points": 28,
        "faction": "Scum and Villainy",
        "slots": [
           "Elite",
           "Torpedo"
        ],
        "id": 261,
        "ship_image": "ships/Scum and Villainy/starviper-v2.png",
        "key": "blackSunAssassin"
     },
     "blackSunEnforcer": {
        "name": "Black Sun Enforcer",
        "id": 119,
        "ship": "StarViper",
        "skill": 1,
        "points": 25,
        "slots": [
           "Torpedo"
        ],
        "image": "pilots/Scum and Villainy/StarViper/black-sun-enforcer.png",
        "faction": "Scum and Villainy",
        "xws": "blacksunenforcer",
        "key": "blackSunEnforcer"
     },
     "blackSunSoldier": {
        "name": "Black Sun Soldier",
        "id": 108,
        "ship": "Z-95 Headhunter",
        "skill": 3,
        "points": 13,
        "slots": [
           "Missile",
           "Illicit"
        ],
        "faction": "Scum and Villainy",
        "image": "pilots/Scum and Villainy/Z-95 Headhunter/black-sun-soldier.png",
        "xws": "blacksunsoldier",
        "key": "blackSunSoldier"
     },
     "blackSunVigo": {
        "name": "Black Sun Vigo",
        "id": 118,
        "ship": "StarViper",
        "skill": 3,
        "points": 27,
        "slots": [
           "Torpedo"
        ],
        "image": "pilots/Scum and Villainy/StarViper/black-sun-vigo.png",
        "faction": "Scum and Villainy",
        "xws": "blacksunvigo",
        "key": "blackSunVigo"
     },
     "blackmoonSquadronPilot": {
        "name": "Blackmoon Squadron Pilot",
        "id": 72,
        "ship": "E-wing",
        "skill": 3,
        "points": 29,
        "slots": [
           "System",
           "Torpedo",
           "Astromech"
        ],
        "image": "pilots/Rebel Alliance/E-wing/blackmoon-squadron-pilot.png",
        "faction": "Rebel Alliance",
        "xws": "blackmoonsquadronpilot",
        "key": "blackmoonSquadronPilot"
     },
     "blueAce": {
        "name": "\"Blue Ace\"",
        "unique": true,
        "id": 159,
        "ship": "T-70 X-wing",
        "skill": 5,
        "points": 27,
        "slots": [
           "Torpedo",
           "Astromech",
           "Tech"
        ],
        "text": "When performing a boost action, you may use the ([Turn Left] 1) or ([Turn Right] 1) template.",
        "faction": "Resistance",
        "image": "pilots/Resistance/T-70 X-wing/blue-ace.png",
        "xws": "blueace",
        "key": "blueAce"
     },
     "blueSquadronNovice": {
        "name": "Blue Squadron Novice",
        "id": 155,
        "ship": "T-70 X-wing",
        "skill": 2,
        "points": 24,
        "slots": [
           "Torpedo",
           "Astromech",
           "Tech"
        ],
        "image": "pilots/Resistance/T-70 X-wing/blue-squadron-novice.png",
        "faction": "Resistance",
        "xws": "bluesquadronnovice",
        "key": "blueSquadronNovice"
     },
     "blueSquadronPathfinder": {
        "image": "pilots/Rebel Alliance/U-wing/blue-squadron-pathfinder.png",
        "name": "Blue Squadron Pathfinder",
        "xws": "bluesquadronpathfinder",
        "ship": "U-wing",
        "unique": false,
        "skill": 2,
        "points": 23,
        "faction": "Rebel Alliance",
        "slots": [
           "Crew",
           "Crew",
           "System",
           "Torpedo"
        ],
        "id": 227,
        "key": "blueSquadronPathfinder"
     },
     "blueSquadronPilot": {
        "name": "Blue Squadron Pilot",
        "id": 44,
        "ship": "B-wing",
        "skill": 2,
        "points": 22,
        "slots": [
           "System",
           "Cannon",
           "Torpedo",
           "Torpedo"
        ],
        "image": "pilots/Rebel Alliance/B-wing/blue-squadron-pilot.png",
        "faction": "Rebel Alliance",
        "xws": "bluesquadronpilot",
        "key": "blueSquadronPilot"
     },
     "bobaFett_galacticEmpire": {
        "name": "Boba Fett",
        "id": 38,
        "unique": true,
        "ship": "Firespray-31",
        "skill": 8,
        "points": 39,
        "slots": [
           "Elite",
           "Cannon",
           "Bomb",
           "Crew",
           "Missile"
        ],
        "text": "When you reveal a bank maneuver ([Bank Left] or [Bank Right]), you may rotate your dial to the other bank maneuver of the same speed.",
        "image": "pilots/Galactic Empire/Firespray-31/boba-fett.png",
        "faction": "Galactic Empire",
        "xws": "bobafett",
        "key": "bobaFett_galacticEmpire"
     },
     "bobaFett_scumAndVillainy": {
        "name": "Boba Fett",
        "id": 97,
        "unique": true,
        "ship": "Firespray-31",
        "skill": 8,
        "points": 39,
        "slots": [
           "Elite",
           "Cannon",
           "Bomb",
           "Crew",
           "Missile",
           "Illicit"
        ],
        "text": "When attacking or defending, you may reroll 1 of your dice for each enemy ship at Range 1.",
        "image": "pilots/Scum and Villainy/Firespray-31/boba-fett.png",
        "faction": "Scum and Villainy",
        "xws": "bobafett",
        "key": "bobaFett_scumAndVillainy"
     },
     "bodhiRook": {
        "image": "pilots/Rebel Alliance/U-wing/bodhi-rook.png",
        "text": "When a friendly ship acquires a target lock, that ship can lock onto an enemy ship at Range 1-3 of any friendly ship.",
        "name": "Bodhi Rook",
        "xws": "bodhirook",
        "ship": "U-wing",
        "unique": true,
        "skill": 4,
        "points": 25,
        "faction": "Rebel Alliance",
        "slots": [
           "System",
           "Torpedo",
           "Crew",
           "Crew"
        ],
        "id": 231,
        "key": "bodhiRook"
     },
     "bossk": {
        "name": "Bossk",
        "id": 133,
        "unique": true,
        "ship": "YV-666",
        "skill": 7,
        "points": 35,
        "slots": [
           "Elite",
           "Cannon",
           "Missile",
           "Crew",
           "Crew",
           "Crew",
           "Illicit"
        ],
        "text": "When you perform an attack that hits, before dealing damage, you may cancel 1 of your [Critical Hit] results to add 2 [Hit] results.",
        "image": "pilots/Scum and Villainy/YV-666/bossk.png",
        "faction": "Scum and Villainy",
        "xws": "bossk",
        "key": "bossk"
     },
     "bountyHunter": {
        "name": "Bounty Hunter",
        "id": 40,
        "ship": "Firespray-31",
        "skill": 3,
        "points": 33,
        "slots": [
           "Cannon",
           "Bomb",
           "Crew",
           "Missile"
        ],
        "image": "pilots/Galactic Empire/Firespray-31/bounty-hunter.png",
        "faction": "Galactic Empire",
        "xws": "bountyhunter",
        "key": "bountyHunter"
     },
     "braylenStramm": {
        "image": "pilots/Rebel Alliance/ARC-170/braylen-stramm.png",
        "text": "After you execute a maneuver, you may roll an attack die. On a [Hit] or [Critical Hit] result, remove 1 stress token from your ship.",
        "name": "Braylen Stramm",
        "xws": "braylenstramm",
        "ship": "ARC-170",
        "unique": true,
        "skill": 3,
        "points": 25,
        "faction": "Rebel Alliance",
        "slots": [
           "Astromech",
           "Crew",
           "Torpedo"
        ],
        "id": 201,
        "key": "braylenStramm"
     },
     "cRocCruiser": {
        "image": "pilots/Scum and Villainy/C-ROC Cruiser/c-roc-cruiser.png",
        "name": "C-ROC Cruiser",
        "xws": "croccruiser",
        "ship": "C-ROC Cruiser",
        "skill": 1,
        "points": 35,
        "faction": "Scum and Villainy",
        "slots": [
           "Crew",
           "Crew",
           "Hardpoint",
           "Team",
           "Cargo",
           "Cargo",
           "Cargo"
        ],
        "id": 238,
        "key": "cRocCruiser"
     },
     "captainFeroph": {
        "image": "pilots/Galactic Empire/TIE Reaper/captain-feroph.png",
        "text": "When defending, if the attacker is jammed, add 1 [Evade] result to your roll.",
        "name": "Captain Feroph",
        "xws": "captainferoph",
        "ship": "TIE Reaper",
        "unique": true,
        "skill": 4,
        "points": 24,
        "faction": "Galactic Empire",
        "slots": [
           "Crew",
           "Crew",
           "Elite"
        ],
        "id": 290,
        "key": "captainFeroph"
     },
     "captainJonus": {
        "name": "Captain Jonus",
        "id": 51,
        "unique": true,
        "ship": "TIE Bomber",
        "skill": 6,
        "points": 22,
        "slots": [
           "Elite",
           "Torpedo",
           "Torpedo",
           "Missile",
           "Missile",
           "Bomb"
        ],
        "text": "When another friendly ship at Range 1 attacks with a secondary weapon, it may reroll up to 2 attack dice.",
        "image": "pilots/Galactic Empire/TIE Bomber/captain-jonus.png",
        "faction": "Galactic Empire",
        "xws": "captainjonus",
        "key": "captainJonus"
     },
     "captainJostero": {
        "image": "pilots/Scum and Villainy/Kihraxz Fighter/captain-jostero.png",
        "text": "Once per round, after an enemy ship that is not defending from an attack suffers damage, you may perform an attack against that ship.",
        "name": "Captain Jostero",
        "xws": "captainjostero",
        "ship": "Kihraxz Fighter",
        "unique": true,
        "skill": 4,
        "points": 24,
        "faction": "Scum and Villainy",
        "slots": [
           "Elite",
           "Illicit",
           "Missile"
        ],
        "id": 264,
        "ship_image": "ships/Scum and Villainy/kihraxz-fighter-v2.png",
        "key": "captainJostero"
     },
     "captainKagi": {
        "name": "Captain Kagi",
        "id": 53,
        "unique": true,
        "ship": "Lambda-class Shuttle",
        "skill": 8,
        "points": 27,
        "slots": [
           "System",
           "Cannon",
           "Crew",
           "Crew"
        ],
        "text": "When an enemy ship acquires a target lock, it must lock onto your ship if able.",
        "image": "pilots/Galactic Empire/Lambda-class Shuttle/captain-kagi.png",
        "faction": "Galactic Empire",
        "xws": "captainkagi",
        "key": "captainKagi"
     },
     "captainNym_rebelAlliance": {
        "image": "pilots/Rebel Alliance/Scurrg H-6 Bomber/captain-nym.png",
        "text": "Once per round, you may prevent a friendly bomb from detonating.",
        "name": "Captain Nym",
        "xws": "captainnym",
        "ship": "Scurrg H-6 Bomber",
        "unique": true,
        "skill": 8,
        "points": 30,
        "faction": "Rebel Alliance",
        "slots": [
           "Bomb",
           "Bomb",
           "Crew",
           "Elite",
           "Missile",
           "Torpedo",
           "Turret"
        ],
        "id": 257,
        "key": "captainNym_rebelAlliance"
     },
     "captainNym_scumAndVillainy": {
        "image": "pilots/Scum and Villainy/Scurrg H-6 Bomber/captain-nym.png",
        "text": "You may ignore friendly bombs. When a friendly ship is defending, if the attacker measures range through a friendly bomb token, the defender may add 1 [Evade] result.",
        "name": "Captain Nym",
        "xws": "captainnym",
        "ship": "Scurrg H-6 Bomber",
        "unique": true,
        "skill": 8,
        "points": 30,
        "faction": "Scum and Villainy",
        "slots": [
           "Bomb",
           "Bomb",
           "Crew",
           "Elite",
           "Missile",
           "Torpedo",
           "Turret"
        ],
        "id": 256,
        "key": "captainNym_scumAndVillainy"
     },
     "captainOicunn": {
        "name": "Captain Oicunn",
        "id": 91,
        "unique": true,
        "ship": "VT-49 Decimator",
        "skill": 4,
        "points": 42,
        "slots": [
           "Elite",
           "Torpedo",
           "Crew",
           "Crew",
           "Crew",
           "Bomb"
        ],
        "text": "After executing a maneuver, each enemy ship you are touching suffers 1 damage.",
        "image": "pilots/Galactic Empire/VT-49 Decimator/captain-oicunn.png",
        "faction": "Galactic Empire",
        "xws": "captainoicunn",
        "key": "captainOicunn"
     },
     "captainRex": {
        "image": "pilots/Rebel Alliance/TIE Fighter/captain-rex.png",
        "text": "After you perform an attack, assign the \"Suppressive Fire\" Condition card to the defender.",
        "name": "Captain Rex",
        "xws": "captainrex",
        "ship": "TIE Fighter",
        "unique": true,
        "skill": 4,
        "points": 14,
        "faction": "Rebel Alliance",
        "slots": [],
        "id": 226,
        "conditions": [
           "Suppressive Fire"
        ],
        "key": "captainRex"
     },
     "captainYorr": {
        "name": "Captain Yorr",
        "id": 55,
        "unique": true,
        "ship": "Lambda-class Shuttle",
        "skill": 4,
        "points": 24,
        "slots": [
           "System",
           "Cannon",
           "Crew",
           "Crew"
        ],
        "text": "When another friendly ship at Range 1-2 would receive a stress token, if you have 2 or fewer stress tokens, you may receive that token instead.",
        "image": "pilots/Galactic Empire/Lambda-class Shuttle/captain-yorr.png",
        "faction": "Galactic Empire",
        "xws": "captainyorr",
        "key": "captainYorr"
     },
     "carnorJax": {
        "name": "Carnor Jax",
        "id": 61,
        "unique": true,
        "ship": "TIE Interceptor",
        "skill": 8,
        "points": 26,
        "slots": [
           "Elite"
        ],
        "text": "Enemy ships at Range 1 cannot perform focus or evade actions and cannot spend focus or evade tokens.",
        "image": "pilots/Galactic Empire/TIE Interceptor/carnor-jax.png",
        "faction": "Galactic Empire",
        "xws": "carnorjax",
        "ship_image": "ships/Galactic Empire/tie-interceptor-v3.png",
        "key": "carnorJax"
     },
     "cartelBrute": {
        "image": "pilots/Scum and Villainy/M12-L Kimogila Fighter/cartel-brute.png",
        "name": "Cartel Brute",
        "xws": "cartelbrute",
        "ship": "M12-L Kimogila Fighter",
        "skill": 3,
        "points": 22,
        "faction": "Scum and Villainy",
        "slots": [
           "Illicit",
           "Missile",
           "Salvaged Astromech",
           "Torpedo"
        ],
        "id": 273,
        "key": "cartelBrute"
     },
     "cartelExecutioner": {
        "name": "Cartel Executioner",
        "xws": "cartelexecutioner",
        "ship": "M12-L Kimogila Fighter",
        "skill": 5,
        "points": 24,
        "faction": "Scum and Villainy",
        "slots": [
           "Elite",
           "Missile",
           "Torpedo",
           "Illicit",
           "Salvaged Astromech"
        ],
        "id": 282,
        "image": "pilots/Scum and Villainy/M12-L Kimogila Fighter/cartel-executioner.png",
        "key": "cartelExecutioner"
     },
     "cartelMarauder": {
        "name": "Cartel Marauder",
        "id": 135,
        "ship": "Kihraxz Fighter",
        "skill": 2,
        "points": 20,
        "slots": [
           "Missile",
           "Illicit"
        ],
        "image": "pilots/Scum and Villainy/Kihraxz Fighter/cartel-marauder.png",
        "faction": "Scum and Villainy",
        "xws": "cartelmarauder",
        "ship_image": "ships/Scum and Villainy/kihraxz-fighter-v2.png",
        "key": "cartelMarauder"
     },
     "cartelSpacer": {
        "name": "Cartel Spacer",
        "id": 122,
        "ship": "M3-A Interceptor",
        "skill": 2,
        "points": 14,
        "slots": [],
        "faction": "Scum and Villainy",
        "image": "pilots/Scum and Villainy/M3-A Interceptor/cartel-spacer.png",
        "xws": "cartelspacer",
        "key": "cartelSpacer"
     },
     "cassianAndor": {
        "text": "At the start of the Activation phase, you may remove 1 stress token from 1 other friendly ship at Range 1-2.",
        "name": "Cassian Andor",
        "xws": "cassianandor",
        "ship": "U-wing",
        "unique": true,
        "skill": 6,
        "points": 27,
        "faction": "Rebel Alliance",
        "slots": [
           "Crew",
           "Crew",
           "Elite",
           "System",
           "Torpedo"
        ],
        "id": 217,
        "image": "pilots/Rebel Alliance/U-wing/cassian-andor.png",
        "key": "cassianAndor"
     },
     "cavernAngelsZealot": {
        "name": "Cavern Angels Zealot",
        "id": 293,
        "ship": "X-wing",
        "skill": 1,
        "points": 22,
        "slots": [
           "Torpedo",
           "Astromech",
           "Elite"
        ],
        "faction": "Rebel Alliance",
        "xws": "cavernangelszealot",
        "image": "pilots/Rebel Alliance/X-wing/cavern-angels-zealot.png",
        "key": "cavernAngelsZealot"
     },
     "chaser": {
        "image": "pilots/Galactic Empire/TIE Fighter/chaser.png",
        "text": "When another friendly ship at Range 1 spends a focus token, assign a focus token to your ship.",
        "name": "\"Chaser\"",
        "ship": "TIE Fighter",
        "unique": true,
        "skill": 3,
        "points": 14,
        "faction": "Galactic Empire",
        "slots": [],
        "id": 168,
        "xws": "chaser",
        "key": "chaser"
     },
     "chewbacca_rebelAlliance": {
        "name": "Chewbacca",
        "id": 34,
        "unique": true,
        "ship": "YT-1300",
        "skill": 5,
        "points": 42,
        "slots": [
           "Elite",
           "Missile",
           "Crew",
           "Crew"
        ],
        "text": "When you are dealt a faceup Damage card, immediately flip it facedown (without resolving its ability).",
        "image": "pilots/Rebel Alliance/YT-1300/chewbacca.png",
        "faction": "Rebel Alliance",
        "xws": "chewbacca",
        "key": "chewbacca_rebelAlliance"
     },
     "chewbacca_resistance": {
        "image": "pilots/Resistance/YT-1300/chewbacca.png",
        "text": "After another friendly ship at Range 1-3 is destroyed (but has not fled the battlefield), you may perform an attack.",
        "name": "Chewbacca",
        "xws": "chewbacca-swx57",
        "ship": "YT-1300",
        "unique": true,
        "skill": 5,
        "points": 42,
        "faction": "Resistance",
        "slots": [
           "Crew",
           "Crew",
           "Elite",
           "Missile"
        ],
        "id": 220,
        "key": "chewbacca_resistance"
     },
     "chopper": {
        "image": "pilots/Rebel Alliance/VCX-100/chopper.png",
        "text": "At the start of the Combat phase, each enemy ship you are touching receives 1 stress token.",
        "name": "\"Chopper\"",
        "ship": "VCX-100",
        "unique": true,
        "skill": 4,
        "points": 37,
        "faction": "Rebel Alliance",
        "slots": [
           "System",
           "Turret",
           "Torpedo",
           "Torpedo",
           "Crew",
           "Crew"
        ],
        "id": 172,
        "xws": "chopper",
        "grants": [
           {
              "type": "firing_arc",
              "name": "Auxiliary Rear",
              "slot": "Torpedo"
           }
        ],
        "key": "chopper"
     },
     "cobaltLeader": {
        "name": "\"Cobalt Leader\"",
        "xws": "cobaltleader",
        "text": "When attacking, if the defender is at range 1 of a bomb token, the defender rolls 1 fewer defense die (to a minimum of 0).",
        "ship": "B/SF-17 Bomber",
        "unique": true,
        "skill": 6,
        "points": 28,
        "faction": "Resistance",
        "slots": [
           "Bomb",
           "Bomb",
           "System",
           "Tech"
        ],
        "id": 280,
        "image": "pilots/Resistance/B-SF-17 Bomber/cobalt-leader.png",
        "key": "cobaltLeader"
     },
     "colonelJendon": {
        "name": "Colonel Jendon",
        "id": 54,
        "unique": true,
        "ship": "Lambda-class Shuttle",
        "skill": 6,
        "points": 26,
        "slots": [
           "System",
           "Cannon",
           "Crew",
           "Crew"
        ],
        "text": "At the start of the Combat phase, you may assign 1 of your blue target lock tokens to a friendly ship at Range 1 if it does not have a blue target lock token.",
        "image": "pilots/Galactic Empire/Lambda-class Shuttle/colonel-jendon.png",
        "faction": "Galactic Empire",
        "xws": "coloneljendon",
        "key": "colonelJendon"
     },
     "colonelVessery": {
        "name": "Colonel Vessery",
        "id": 69,
        "unique": true,
        "ship": "TIE Defender",
        "skill": 6,
        "points": 35,
        "slots": [
           "Elite",
           "Cannon",
           "Missile"
        ],
        "text": "When attacking, immediately after you roll attack dice, you may acquire a target lock on the defender if it already has a red target lock token.",
        "image": "pilots/Galactic Empire/TIE Defender/colonel-vessery.png",
        "faction": "Galactic Empire",
        "xws": "colonelvessery",
        "key": "colonelVessery"
     },
     "commanderAlozen": {
        "name": "Commander Alozen",
        "id": 120,
        "unique": true,
        "ship": "TIE Advanced",
        "skill": 5,
        "points": 25,
        "slots": [
           "Elite",
           "Missile"
        ],
        "text": "At the start of the Combat phase, you may acquire a target lock on an enemy ship at Range 1.",
        "image": "pilots/Galactic Empire/TIE Advanced/commander-alozen.png",
        "faction": "Galactic Empire",
        "xws": "commanderalozen",
        "key": "commanderAlozen"
     },
     "commanderKenkirk": {
        "name": "Commander Kenkirk",
        "id": 94,
        "unique": true,
        "ship": "VT-49 Decimator",
        "skill": 6,
        "points": 44,
        "slots": [
           "Elite",
           "Torpedo",
           "Crew",
           "Crew",
           "Crew",
           "Bomb"
        ],
        "text": "If you have no shields and at least 1 Damage card assigned to you, increase your agility value by 1.",
        "image": "pilots/Galactic Empire/VT-49 Decimator/commander-kenkirk.png",
        "faction": "Galactic Empire",
        "xws": "commanderkenkirk",
        "key": "commanderKenkirk"
     },
     "concordDawnAce": {
        "image": "pilots/Scum and Villainy/Protectorate Starfighter/concord-dawn-ace.png",
        "name": "Concord Dawn Ace",
        "xws": "concorddawnace",
        "ship": "Protectorate Starfighter",
        "unique": false,
        "skill": 5,
        "points": 23,
        "faction": "Scum and Villainy",
        "slots": [
           "Elite",
           "Torpedo"
        ],
        "id": 207,
        "key": "concordDawnAce"
     },
     "concordDawnVeteran": {
        "image": "pilots/Scum and Villainy/Protectorate Starfighter/concord-dawn-veteran.png",
        "name": "Concord Dawn Veteran",
        "xws": "concorddawnveteran",
        "ship": "Protectorate Starfighter",
        "skill": 3,
        "points": 22,
        "faction": "Scum and Villainy",
        "slots": [
           "Elite",
           "Torpedo"
        ],
        "id": 208,
        "key": "concordDawnVeteran"
     },
     "constableZuvio": {
        "image": "pilots/Scum and Villainy/Quadjumper/constable-zuvio.png",
        "text": "When you reveal a reverse maneuver, you may drop a bomb using your front guides (including a bomb with the \"<strong>Action:</strong>\" header).",
        "name": "Constable Zuvio",
        "xws": "constablezuvio",
        "ship": "Quadjumper",
        "unique": true,
        "skill": 7,
        "points": 19,
        "faction": "Scum and Villainy",
        "slots": [
           "Bomb",
           "Crew",
           "Elite",
           "Illicit",
           "Tech"
        ],
        "id": 233,
        "key": "constableZuvio"
     },
     "contractedScout": {
        "image": "pilots/Scum and Villainy/JumpMaster 5000/contracted-scout.png",
        "name": "Contracted Scout",
        "xws": "contractedscout",
        "ship": "JumpMaster 5000",
        "skill": 3,
        "points": 25,
        "faction": "Scum and Villainy",
        "slots": [
           "Crew",
           "Elite",
           "Illicit"
        ],
        "id": 183,
        "key": "contractedScout"
     },
     "corranHorn": {
        "name": "Corran Horn",
        "id": 74,
        "unique": true,
        "ship": "E-wing",
        "skill": 8,
        "points": 35,
        "slots": [
           "Elite",
           "System",
           "Torpedo",
           "Astromech"
        ],
        "text": "At the start of the End phase, you may perform one attack. You cannot attack during the next round.",
        "image": "pilots/Rebel Alliance/E-wing/corran-horn.png",
        "faction": "Rebel Alliance",
        "xws": "corranhorn",
        "key": "corranHorn"
     },
     "countdown": {
        "image": "pilots/Galactic Empire/TIE Striker/countdown.png",
        "text": "When defending, if you are not stressed, during the \"Compare Results\" step, you may suffer 1 damage to cancel <strong>all</strong> dice results. If you do, receive 1 stress token.",
        "name": "\"Countdown\"",
        "xws": "countdown",
        "ship": "TIE Striker",
        "unique": true,
        "skill": 5,
        "points": 20,
        "faction": "Galactic Empire",
        "slots": [],
        "id": 235,
        "key": "countdown"
     },
     "countessRyad": {
        "image": "pilots/Galactic Empire/TIE Defender/countess-ryad.png",
        "text": "When you reveal a [Straight] maneuver, you may treat it as a [Koiogran Turn] maneuver.",
        "name": "Countess Ryad",
        "xws": "countessryad",
        "ship": "TIE Defender",
        "unique": true,
        "skill": 5,
        "points": 34,
        "faction": "Galactic Empire",
        "slots": [
           "Cannon",
           "Elite",
           "Missile"
        ],
        "id": 193,
        "ship_image": "ships/Galactic Empire/tie-defender-v2.png",
        "key": "countessRyad"
     },
     "cr90CorvetteAft": {
        "name": "CR90 Corvette (Aft)",
        "id": 80,
        "ship": "CR90 Corvette (Aft)",
        "skill": 4,
        "points": 40,
        "slots": [
           "Crew",
           "Hardpoint",
           "Team",
           "Cargo"
        ],
        "image": "pilots/Rebel Alliance/CR90 Corvette/cr90-corvette-aft.png",
        "faction": "Rebel Alliance",
        "xws": "cr90corvetteaft",
        "key": "cr90CorvetteAft"
     },
     "cr90CorvetteFore": {
        "name": "CR90 Corvette (Fore)",
        "id": 79,
        "ship": "CR90 Corvette (Fore)",
        "skill": 4,
        "points": 50,
        "slots": [
           "Crew",
           "Hardpoint",
           "Hardpoint",
           "Team",
           "Team",
           "Cargo"
        ],
        "range": "3-5",
        "text": "When attacking with your primary weapon, you may spend 1 energy to roll 1 additional attack die.",
        "image": "pilots/Rebel Alliance/CR90 Corvette/cr90-corvette-fore.png",
        "faction": "Rebel Alliance",
        "xws": "cr90corvettefore",
        "key": "cr90CorvetteFore"
     },
     "crimsonLeader": {
        "text": "When attacking, if the defender is inside your firing arc, you may spend 1 [Hit] or [Critical Hit] result to assign the \"Rattled\" Condition to the defender.",
        "name": "\"Crimson Leader\"",
        "xws": "crimsonleader",
        "ship": "B/SF-17 Bomber",
        "unique": true,
        "skill": 7,
        "points": 29,
        "faction": "Resistance",
        "slots": [
           "Bomb",
           "Bomb",
           "System",
           "Tech"
        ],
        "id": 269,
        "conditions": [
           "Rattled"
        ],
        "image": "pilots/Resistance/B-SF-17 Bomber/crimson-leader.png",
        "key": "crimsonLeader"
     },
     "crimsonSpecialist": {
        "text": "When placing a bomb token you dropped after revealing your manuever dial, you may place the bomb token anywhere on the play area touching your ship.",
        "name": "\"Crimson Specialist\"",
        "xws": "crimsonspecialist",
        "ship": "B/SF-17 Bomber",
        "unique": true,
        "skill": 4,
        "points": 27,
        "faction": "Resistance",
        "slots": [
           "Bomb",
           "Bomb",
           "System",
           "Tech"
        ],
        "id": 279,
        "image": "pilots/Resistance/B-SF-17 Bomber/crimson-specialist.png",
        "key": "crimsonSpecialist"
     },
     "crimsonSquadronPilot": {
        "name": "Crimson Squadron Pilot",
        "xws": "crimsonsquadronpilot",
        "ship": "B/SF-17 Bomber",
        "skill": 1,
        "points": 25,
        "faction": "Resistance",
        "slots": [
           "Bomb",
           "Bomb",
           "System",
           "Tech"
        ],
        "id": 278,
        "image": "pilots/Resistance/B-SF-17 Bomber/crimson-squadron-pilot.png",
        "key": "crimsonSquadronPilot"
     },
     "cutlassSquadronPilot": {
        "name": "Cutlass Squadron Pilot",
        "id": 144,
        "ship": "TIE Punisher",
        "skill": 2,
        "points": 21,
        "slots": [
           "System",
           "Torpedo",
           "Torpedo",
           "Missile",
           "Missile",
           "Bomb",
           "Bomb"
        ],
        "image": "pilots/Galactic Empire/TIE Punisher/cutlass-squadron-pilot.png",
        "faction": "Galactic Empire",
        "xws": "cutlasssquadronpilot",
        "key": "cutlassSquadronPilot"
     },
     "daceBonearm": {
        "name": "Dace Bonearm",
        "id": 114,
        "unique": true,
        "ship": "HWK-290",
        "skill": 7,
        "points": 23,
        "slots": [
           "Elite",
           "Turret",
           "Crew",
           "Illicit"
        ],
        "text": "When an enemy ship at Range 1-3 receives at least 1 ion token, if you are not stressed, you may receive 1 stress token to cause that ship to suffer 1 damage.",
        "image": "pilots/Scum and Villainy/HWK-290/dace-bonearm.png",
        "faction": "Scum and Villainy",
        "xws": "dacebonearm",
        "key": "daceBonearm"
     },
     "daggerSquadronPilot": {
        "name": "Dagger Squadron Pilot",
        "id": 43,
        "ship": "B-wing",
        "skill": 4,
        "points": 24,
        "slots": [
           "System",
           "Cannon",
           "Torpedo",
           "Torpedo"
        ],
        "image": "pilots/Rebel Alliance/B-wing/dagger-squadron-pilot.png",
        "faction": "Rebel Alliance",
        "xws": "daggersquadronpilot",
        "ship_image": "ships/Rebel Alliance/b-wing-v2.png",
        "key": "daggerSquadronPilot"
     },
     "dalanOberos_m12LKimogilaFighter": {
        "image": "pilots/Scum and Villainy/M12-L Kimogila Fighter/dalan-oberos.png",
        "text": "At the start of the Combat phase, you may acquire a target lock on an enemy ship inside your bullseye firing arc at Range 1-3.",
        "name": "Dalan Oberos",
        "xws": "dalanoberos",
        "ship": "M12-L Kimogila Fighter",
        "unique": true,
        "skill": 7,
        "points": 25,
        "faction": "Scum and Villainy",
        "slots": [
           "Illicit",
           "Elite",
           "Missile",
           "Salvaged Astromech",
           "Torpedo"
        ],
        "id": 274,
        "key": "dalanOberos_m12LKimogilaFighter"
     },
     "dalanOberos_starviper": {
        "image": "pilots/Scum and Villainy/StarViper/dalan-oberos.png",
        "text": "If you are not stressed, when you reveal a turn, bank, or Segnor's Loop maneuver, you may instead treat it as a red Tallon Roll maneuver of the same direction (left or right) using the template of the original revealed maneuver.",
        "name": "Dalan Oberos",
        "xws": "dalanoberos",
        "ship": "StarViper",
        "unique": true,
        "skill": 6,
        "points": 30,
        "faction": "Scum and Villainy",
        "slots": [
           "Elite",
           "Torpedo"
        ],
        "id": 262,
        "key": "dalanOberos_starviper"
     },
     "darkCurse": {
        "name": "\"Dark Curse\"",
        "id": 16,
        "unique": true,
        "ship": "TIE Fighter",
        "skill": 6,
        "points": 16,
        "slots": [],
        "text": "When defending, ships attacking you cannot spend focus tokens or reroll attack dice.",
        "image": "pilots/Galactic Empire/TIE Fighter/dark-curse.png",
        "faction": "Galactic Empire",
        "xws": "darkcurse",
        "key": "darkCurse"
     },
     "darthVader": {
        "name": "Darth Vader",
        "id": 22,
        "unique": true,
        "ship": "TIE Advanced",
        "skill": 9,
        "points": 29,
        "slots": [
           "Elite",
           "Missile"
        ],
        "text": "During your \"Perform Action\" step, you may perform 2 actions.",
        "image": "pilots/Galactic Empire/TIE Advanced/darth-vader.png",
        "faction": "Galactic Empire",
        "xws": "darthvader",
        "key": "darthVader"
     },
     "dashRendar": {
        "name": "Dash Rendar",
        "id": 89,
        "unique": true,
        "ship": "YT-2400",
        "skill": 7,
        "points": 36,
        "slots": [
           "Elite",
           "Cannon",
           "Missile",
           "Crew"
        ],
        "text": "You may ignore obstacles during the Activation phase and when performing actions.",
        "image": "pilots/Rebel Alliance/YT-2400/dash-rendar.png",
        "faction": "Rebel Alliance",
        "xws": "dashrendar",
        "key": "dashRendar"
     },
     "deathfire": {
        "image": "pilots/Galactic Empire/TIE Bomber/deathfire.png",
        "text": "When you reveal your maneuver dial or after you perform an action, you may perform a [Bomb] Upgrade card action as a free action.",
        "name": "\"Deathfire\"",
        "xws": "deathfire",
        "ship": "TIE Bomber",
        "unique": true,
        "skill": 3,
        "points": 17,
        "faction": "Galactic Empire",
        "slots": [
           "Bomb",
           "Missile",
           "Missile",
           "Torpedo",
           "Torpedo"
        ],
        "id": 190,
        "ship_image": "ships/Galactic Empire/tie-bomber-v2.png",
        "key": "deathfire"
     },
     "deathrain": {
        "name": "\"Deathrain\"",
        "id": 143,
        "unique": true,
        "ship": "TIE Punisher",
        "skill": 6,
        "points": 26,
        "slots": [
           "System",
           "Torpedo",
           "Torpedo",
           "Missile",
           "Missile",
           "Bomb",
           "Bomb"
        ],
        "text": "When dropping a bomb, you may use the front guides of your ship. After dropping a bomb, you may perform a free barrel roll action.",
        "image": "pilots/Galactic Empire/TIE Punisher/deathrain.png",
        "faction": "Galactic Empire",
        "xws": "deathrain",
        "key": "deathrain"
     },
     "deltaSquadronPilot": {
        "name": "Delta Squadron Pilot",
        "id": 67,
        "ship": "TIE Defender",
        "skill": 1,
        "points": 30,
        "slots": [
           "Cannon",
           "Missile"
        ],
        "image": "pilots/Galactic Empire/TIE Defender/delta-squadron-pilot.png",
        "faction": "Galactic Empire",
        "xws": "deltasquadronpilot",
        "key": "deltaSquadronPilot"
     },
     "dengar": {
        "image": "pilots/Scum and Villainy/JumpMaster 5000/dengar.png",
        "name": "Dengar",
        "text": "Once per round after defending, if the attacker is inside your firing arc, you may perform an attack against that ship.",
        "unique": true,
        "skill": 9,
        "points": 33,
        "faction": "Scum and Villainy",
        "slots": [
           "Elite",
           "Crew",
           "Illicit"
        ],
        "id": 161,
        "ship": "JumpMaster 5000",
        "xws": "dengar",
        "key": "dengar"
     },
     "doubleEdge": {
        "image": "pilots/Galactic Empire/TIE Aggressor/double-edge.png",
        "text": "Once per round, after you perform a secondary weapon attack that does not hit, you may perform an attack with a different weapon.",
        "name": "\"Double Edge\"",
        "xws": "doubleedge",
        "ship": "TIE Aggressor",
        "unique": true,
        "skill": 4,
        "points": 19,
        "faction": "Galactic Empire",
        "slots": [
           "Elite",
           "Missile",
           "Missile",
           "Turret"
        ],
        "id": 252,
        "key": "doubleEdge"
     },
     "dreaRenthal": {
        "name": "Drea Renthal",
        "id": 109,
        "unique": true,
        "ship": "Y-wing",
        "skill": 5,
        "points": 22,
        "slots": [
           "Turret",
           "Torpedo",
           "Torpedo",
           "Salvaged Astromech"
        ],
        "text": "After you spend a target lock, you may receive 1 stress token to acquire a target lock.",
        "faction": "Scum and Villainy",
        "image": "pilots/Scum and Villainy/Y-wing/drea-renthal.png",
        "xws": "drearenthal",
        "key": "dreaRenthal"
     },
     "duchess": {
        "image": "pilots/Galactic Empire/TIE Striker/duchess.png",
        "text": "While you have the \"Adaptive Ailerons\" Upgrade card equipped, you may choose to ignore its card ability.",
        "name": "\"Duchess\"",
        "xws": "duchess",
        "ship": "TIE Striker",
        "unique": true,
        "skill": 8,
        "points": 23,
        "faction": "Galactic Empire",
        "slots": [
           "Elite"
        ],
        "id": 218,
        "key": "duchess"
     },
     "dutchVander": {
        "name": "\"Dutch\" Vander",
        "id": 7,
        "unique": true,
        "ship": "Y-wing",
        "skill": 6,
        "points": 23,
        "slots": [
           "Turret",
           "Torpedo",
           "Torpedo",
           "Astromech"
        ],
        "text": "After acquiring a target lock, choose another friendly ship at Range 1-2.  The chosen ship may immediately acquire a target lock.",
        "image": "pilots/Rebel Alliance/Y-wing/dutch-vander.png",
        "faction": "Rebel Alliance",
        "xws": "dutchvander",
        "key": "dutchVander"
     },
     "eadenVrill": {
        "name": "Eaden Vrill",
        "id": 93,
        "unique": true,
        "ship": "YT-2400",
        "skill": 3,
        "points": 32,
        "slots": [
           "Cannon",
           "Missile",
           "Crew"
        ],
        "text": "When performing a primary weapon attack against a stressed ship, roll 1 additional attack die.",
        "image": "pilots/Rebel Alliance/YT-2400/eaden-vrill.png",
        "faction": "Rebel Alliance",
        "xws": "eadenvrill",
        "key": "eadenVrill"
     },
     "echo": {
        "name": "\"Echo\"",
        "id": 77,
        "unique": true,
        "ship": "TIE Phantom",
        "skill": 6,
        "points": 30,
        "slots": [
           "Elite",
           "System",
           "Crew"
        ],
        "text": "When you decloak, you must use the ([Bank Left] 2) or ([Bank Right] 2) template instead of the ([Straight] 2) template.",
        "image": "pilots/Galactic Empire/TIE Phantom/echo.png",
        "faction": "Galactic Empire",
        "xws": "echo",
        "key": "echo"
     },
     "edrioTwoTubes": {
        "text": "When you become the active ship during the Activation phase, if you have 1 or more focus tokens, you may perform a free action.",
        "name": "Edrio Two Tubes",
        "xws": "edriotwotubes",
        "ship": "X-wing",
        "unique": true,
        "skill": 4,
        "points": 24,
        "faction": "Rebel Alliance",
        "slots": [
           "Astromech",
           "Elite",
           "Torpedo"
        ],
        "id": 294,
        "image": "pilots/Rebel Alliance/X-wing/edrio-two-tubes.png",
        "key": "edrioTwoTubes"
     },
     "elloAsty": {
        "image": "pilots/Resistance/T-70 X-wing/ello-asty.png",
        "text": "While you are not stressed, you may treat your [Tallon Roll Left] and [Tallon Roll Right] maneuvers as white maneuvers.",
        "name": "Ello Asty",
        "ship": "T-70 X-wing",
        "unique": true,
        "skill": 7,
        "points": 30,
        "faction": "Resistance",
        "slots": [
           "Astromech",
           "Elite",
           "Tech",
           "Torpedo"
        ],
        "id": 179,
        "xws": "elloasty",
        "key": "elloAsty"
     },
     "emonAzzameen": {
        "name": "Emon Azzameen",
        "id": 100,
        "unique": true,
        "ship": "Firespray-31",
        "skill": 6,
        "points": 36,
        "slots": [
           "Cannon",
           "Bomb",
           "Crew",
           "Missile",
           "Illicit"
        ],
        "text": "When dropping a bomb, you may use the ([Turn Left] 3), ([Straight] 3) or ([Turn Right] 3) template instead of the ([Straight] 1) template.",
        "faction": "Scum and Villainy",
        "image": "pilots/Scum and Villainy/Firespray-31/emon-azzameen.png",
        "xws": "emonazzameen",
        "key": "emonAzzameen"
     },
     "epsilonAce": {
        "image": "pilots/First Order/TIE-fo Fighter/epsilon-ace.png",
        "text": "While you do not have any Damage cards, treat your pilot skill value as \"12.\"",
        "name": "\"Epsilon Ace\"",
        "ship": "TIE/fo Fighter",
        "unique": true,
        "skill": 4,
        "points": 17,
        "faction": "First Order",
        "slots": [
           "Tech"
        ],
        "id": 170,
        "xws": "epsilonace",
        "key": "epsilonAce"
     },
     "epsilonLeader": {
        "name": "\"Epsilon Leader\"",
        "unique": true,
        "id": 148,
        "ship": "TIE/fo Fighter",
        "skill": 6,
        "points": 19,
        "slots": [
           "Tech"
        ],
        "text": "At the start of the Combat phase, remove 1 stress token from each friendly ship at Range 1.",
        "image": "pilots/First Order/TIE-fo Fighter/epsilon-leader.png",
        "faction": "First Order",
        "xws": "epsilonleader",
        "key": "epsilonLeader"
     },
     "epsilonSquadronPilot": {
        "name": "Epsilon Squadron Pilot",
        "id": 149,
        "ship": "TIE/fo Fighter",
        "skill": 1,
        "points": 15,
        "slots": [
           "Tech"
        ],
        "image": "pilots/First Order/TIE-fo Fighter/epsilon-squadron-pilot.png",
        "faction": "First Order",
        "xws": "epsilonsquadronpilot",
        "key": "epsilonSquadronPilot"
     },
     "esegeTuketu": {
        "name": "Esege Tuketu",
        "id": 140,
        "unique": true,
        "ship": "K-wing",
        "skill": 6,
        "points": 28,
        "slots": [
           "Turret",
           "Torpedo",
           "Torpedo",
           "Missile",
           "Crew",
           "Bomb",
           "Bomb"
        ],
        "text": "When another friendly ship at Range 1-2 is attacking, it may treat your focus tokens as its own.",
        "image": "pilots/Rebel Alliance/K-wing/esege-tuketu.png",
        "faction": "Rebel Alliance",
        "xws": "esegetuketu",
        "key": "esegeTuketu"
     },
     "etahnAbaht": {
        "name": "Etahn A'baht",
        "id": 73,
        "unique": true,
        "ship": "E-wing",
        "skill": 5,
        "points": 32,
        "slots": [
           "Elite",
           "System",
           "Torpedo",
           "Astromech"
        ],
        "text": "When an enemy ship inside your firing arc at Range 1-3 is defending, the attacker may change 1 of its [Hit] results to a [Critical Hit] result.",
        "image": "pilots/Rebel Alliance/E-wing/etahn-a-baht.png",
        "faction": "Rebel Alliance",
        "xws": "etahnabaht",
        "key": "etahnAbaht"
     },
     "ezraBridger_attackShuttle": {
        "image": "pilots/Rebel Alliance/Attack Shuttle/ezra-bridger.png",
        "text": "When defending, if you are stressed, you may change up to 2 of your [Focus] results to [Evade] results.",
        "name": "Ezra Bridger",
        "ship": "Attack Shuttle",
        "unique": true,
        "skill": 4,
        "points": 20,
        "faction": "Rebel Alliance",
        "slots": [
           "Turret",
           "Crew",
           "Elite"
        ],
        "id": 169,
        "xws": "ezrabridger",
        "key": "ezraBridger_attackShuttle"
     },
     "ezraBridger_sheathipedeClassShuttle": {
        "image": "pilots/Rebel Alliance/Sheathipede-class Shuttle/ezra-bridger.png",
        "text": "When defending, if you are stressed, you may change up to 2 of your [Focus] results to [Evade] results.",
        "name": "Ezra Bridger",
        "xws": "ezrabridger",
        "ship": "Sheathipede-class Shuttle",
        "unique": true,
        "skill": 5,
        "points": 17,
        "faction": "Rebel Alliance",
        "slots": [
           "Astromech",
           "Crew",
           "Elite"
        ],
        "id": 275,
        "key": "ezraBridger_sheathipedeClassShuttle"
     },
     "felsWrath": {
        "name": "\"Fel's Wrath\"",
        "id": 26,
        "unique": true,
        "ship": "TIE Interceptor",
        "skill": 5,
        "points": 23,
        "slots": [],
        "text": "When the number of Damage cards assigned to you equals or exceeds your hull value, you are not destroyed until the end of the Combat phase.",
        "image": "pilots/Galactic Empire/TIE Interceptor/fel-s-wrath.png",
        "faction": "Galactic Empire",
        "xws": "felswrath",
        "ship_image": "ships/Galactic Empire/tie-interceptor-v2.png",
        "key": "felsWrath"
     },
     "fennRau_rebelAlliance": {
        "text": "When an enemy ship inside your firing arc at Range 1-3 becomes the active ship during the Combat phase, if you are not stressed, you may receive 1 stress token. If you do, that ship cannot spend tokens to modify its dice when attacking this round.",
        "name": "Fenn Rau",
        "xws": "fennrau",
        "ship": "Sheathipede-class Shuttle",
        "unique": true,
        "skill": 9,
        "points": 20,
        "faction": "Rebel Alliance",
        "slots": [
           "Astromech",
           "Crew",
           "Elite"
        ],
        "id": 267,
        "image": "pilots/Rebel Alliance/Sheathipede-class Shuttle/fenn-rau.png",
        "key": "fennRau_rebelAlliance"
     },
     "fennRau_scumAndVillainy": {
        "image": "pilots/Scum and Villainy/Protectorate Starfighter/fenn-rau.png",
        "text": "When attacking or defending, if the enemy is at Range 1, you may roll 1 additional die.",
        "name": "Fenn Rau",
        "xws": "fennrau",
        "ship": "Protectorate Starfighter",
        "unique": true,
        "skill": 9,
        "points": 28,
        "faction": "Scum and Villainy",
        "slots": [
           "Elite",
           "Torpedo"
        ],
        "id": 197,
        "key": "fennRau_scumAndVillainy"
     },
     "firstOrderTestPilot": {
        "name": "First Order Test Pilot",
        "xws": "firstordertestpilot",
        "ship": "TIE Silencer",
        "skill": 6,
        "points": 29,
        "faction": "First Order",
        "slots": [
           "Elite",
           "System",
           "Tech"
        ],
        "id": 284,
        "image": "pilots/First Order/TIE Silencer/first-order-test-pilot.png",
        "key": "firstOrderTestPilot"
     },
     "fourLom": {
        "image": "pilots/Scum and Villainy/G-1A Starfighter/4-lom.png",
        "text": "At the start of the End phase, you may assign 1 of your stress tokens to another ship at Range 1.",
        "name": "4-LOM",
        "xws": "4lom",
        "ship": "G-1A Starfighter",
        "unique": true,
        "skill": 6,
        "points": 27,
        "faction": "Scum and Villainy",
        "slots": [
           "Crew",
           "Elite",
           "Illicit",
           "System"
        ],
        "id": 182,
        "key": "fourLom"
     },
     "gammaSquadronPilot": {
        "name": "Gamma Squadron Pilot",
        "id": 50,
        "ship": "TIE Bomber",
        "skill": 4,
        "points": 18,
        "slots": [
           "Torpedo",
           "Torpedo",
           "Missile",
           "Missile",
           "Bomb"
        ],
        "image": "pilots/Galactic Empire/TIE Bomber/gamma-squadron-pilot.png",
        "faction": "Galactic Empire",
        "xws": "gammasquadronpilot",
        "key": "gammaSquadronPilot"
     },
     "gammaSquadronVeteran": {
        "name": "Gamma Squadron Veteran",
        "ship": "TIE Bomber",
        "unique": false,
        "skill": 5,
        "points": 19,
        "faction": "Galactic Empire",
        "image": "pilots/Galactic Empire/TIE Bomber/gamma-squadron-veteran.png",
        "slots": [
           "Bomb",
           "Elite",
           "Missile",
           "Missile",
           "Torpedo",
           "Torpedo"
        ],
        "id": 178,
        "xws": "gammasquadronveteran",
        "ship_image": "ships/Galactic Empire/tie-bomber-v2.png",
        "key": "gammaSquadronVeteran"
     },
     "gandFindsman": {
        "name": "Gand Findsman",
        "xws": "gandfindsman",
        "ship": "G-1A Starfighter",
        "skill": 5,
        "points": 25,
        "slots": [
           "Crew",
           "Elite",
           "Illicit",
           "System"
        ],
        "id": 188,
        "faction": "Scum and Villainy",
        "image": "pilots/Scum and Villainy/G-1A Starfighter/gand-findsman.png",
        "key": "gandFindsman"
     },
     "garvenDreis": {
        "name": "Garven Dreis",
        "id": 1,
        "unique": true,
        "ship": "X-wing",
        "skill": 6,
        "points": 26,
        "slots": [
           "Torpedo",
           "Astromech"
        ],
        "text": "After spending a focus token, you may place that token on any other friendly ship at Range 1-2 (instead of discarding it).",
        "image": "pilots/Rebel Alliance/X-wing/garven-dreis.png",
        "faction": "Rebel Alliance",
        "xws": "garvendreis",
        "key": "garvenDreis"
     },
     "gemmerSojan": {
        "name": "Gemmer Sojan",
        "id": 86,
        "unique": true,
        "ship": "A-wing",
        "skill": 5,
        "points": 22,
        "slots": [
           "Missile"
        ],
        "text": "While you are at Range 1 of at least 1 enemy ship, increase your agility value by 1.",
        "image": "pilots/Rebel Alliance/A-wing/gemmer-sojan.png",
        "faction": "Rebel Alliance",
        "xws": "gemmersojan",
        "ship_image": "ships/Rebel Alliance/a-wing-v2.png",
        "key": "gemmerSojan"
     },
     "genesisRed": {
        "image": "pilots/Scum and Villainy/M3-A Interceptor/genesis-red.png",
        "text": "After you acquire a target lock, assign focus and evade tokens to your ship until you have the same number of each token as the locked ship.",
        "name": "Genesis Red",
        "xws": "genesisred",
        "ship": "M3-A Interceptor",
        "unique": true,
        "skill": 7,
        "points": 19,
        "faction": "Scum and Villainy",
        "slots": [
           "Elite"
        ],
        "id": 243,
        "ship_image": "ships/Scum and Villainy/m3-a-interceptor-v2.png",
        "key": "genesisRed"
     },
     "glaiveSquadronPilot": {
        "image": "pilots/Galactic Empire/TIE Defender/glaive-squadron-pilot.png",
        "name": "Glaive Squadron Pilot",
        "xws": "glaivesquadronpilot",
        "ship": "TIE Defender",
        "unique": false,
        "skill": 6,
        "points": 34,
        "faction": "Galactic Empire",
        "slots": [
           "Elite",
           "Missile",
           "Cannon"
        ],
        "id": 191,
        "ship_image": "ships/Galactic Empire/tie-defender-v2.png",
        "key": "glaiveSquadronPilot"
     },
     "goldSquadronPilot": {
        "name": "Gold Squadron Pilot",
        "id": 9,
        "ship": "Y-wing",
        "skill": 2,
        "points": 18,
        "slots": [
           "Turret",
           "Torpedo",
           "Torpedo",
           "Astromech"
        ],
        "image": "pilots/Rebel Alliance/Y-wing/gold-squadron-pilot.png",
        "faction": "Rebel Alliance",
        "xws": "goldsquadronpilot",
        "key": "goldSquadronPilot"
     },
     "gozantiClassCruiser": {
        "image": "pilots/Galactic Empire/Gozanti-class Cruiser/gozanti-class-cruiser.png",
        "name": "Gozanti-class Cruiser",
        "text": "After you execute a maneuver, you may deploy up to 2 docked ships.",
        "ship": "Gozanti-class Cruiser",
        "skill": 2,
        "points": 40,
        "faction": "Galactic Empire",
        "slots": [
           "Crew",
           "Crew",
           "Hardpoint",
           "Team",
           "Cargo",
           "Cargo"
        ],
        "id": 164,
        "xws": "gozanticlasscruiser",
        "key": "gozantiClassCruiser"
     },
     "gr75MediumTransport": {
        "name": "GR-75 Medium Transport",
        "id": 62,
        "ship": "GR-75 Medium Transport",
        "skill": 3,
        "points": 30,
        "slots": [
           "Crew",
           "Crew",
           "Cargo",
           "Cargo",
           "Cargo"
        ],
        "image": "pilots/Rebel Alliance/GR-75 Medium Transport/gr-75-medium-transport.png",
        "faction": "Rebel Alliance",
        "xws": "gr75mediumtransport",
        "key": "gr75MediumTransport"
     },
     "graySquadronPilot": {
        "name": "Gray Squadron Pilot",
        "id": 6,
        "ship": "Y-wing",
        "skill": 4,
        "points": 20,
        "slots": [
           "Turret",
           "Torpedo",
           "Torpedo",
           "Astromech"
        ],
        "image": "pilots/Rebel Alliance/Y-wing/gray-squadron-pilot.png",
        "faction": "Rebel Alliance",
        "xws": "graysquadronpilot",
        "key": "graySquadronPilot"
     },
     "grazTheHunter": {
        "name": "Graz the Hunter",
        "id": 137,
        "unique": true,
        "ship": "Kihraxz Fighter",
        "skill": 6,
        "points": 25,
        "slots": [
           "Missile",
           "Illicit"
        ],
        "text": "When defending, if the attacker is inside your firing arc, roll 1 additional defense die.",
        "image": "pilots/Scum and Villainy/Kihraxz Fighter/graz-the-hunter.png",
        "faction": "Scum and Villainy",
        "xws": "grazthehunter",
        "key": "grazTheHunter"
     },
     "greenSquadronPilot": {
        "name": "Green Squadron Pilot",
        "id": 31,
        "ship": "A-wing",
        "skill": 3,
        "points": 19,
        "slots": [
           "Elite",
           "Missile"
        ],
        "image": "pilots/Rebel Alliance/A-wing/green-squadron-pilot.png",
        "faction": "Rebel Alliance",
        "xws": "greensquadronpilot",
        "key": "greenSquadronPilot"
     },
     "guardianSquadronPilot": {
        "name": "Guardian Squadron Pilot",
        "id": 147,
        "ship": "K-wing",
        "skill": 4,
        "points": 25,
        "slots": [
           "Turret",
           "Torpedo",
           "Torpedo",
           "Missile",
           "Crew",
           "Bomb",
           "Bomb"
        ],
        "image": "pilots/Rebel Alliance/K-wing/guardian-squadron-pilot.png",
        "faction": "Rebel Alliance",
        "xws": "guardiansquadronpilot",
        "key": "guardianSquadronPilot"
     },
     "guri": {
        "name": "Guri",
        "id": 117,
        "unique": true,
        "ship": "StarViper",
        "skill": 5,
        "points": 30,
        "slots": [
           "Elite",
           "Torpedo"
        ],
        "text": "At the start of the Combat phase, if you are at Range 1 of an enemy ship, you may assign 1 focus token to your ship.",
        "image": "pilots/Scum and Villainy/StarViper/guri.png",
        "faction": "Scum and Villainy",
        "xws": "guri",
        "key": "guri"
     },
     "hanSolo_rebelAlliance": {
        "name": "Han Solo",
        "id": 36,
        "unique": true,
        "ship": "YT-1300",
        "skill": 9,
        "points": 46,
        "slots": [
           "Elite",
           "Missile",
           "Crew",
           "Crew"
        ],
        "text": "When attacking, you may reroll all of your dice. If you choose to do so, you must reroll as many of your dice as possible.",
        "image": "pilots/Rebel Alliance/YT-1300/han-solo.png",
        "faction": "Rebel Alliance",
        "xws": "hansolo",
        "key": "hanSolo_rebelAlliance"
     },
     "hanSolo_resistance": {
        "image": "pilots/Resistance/YT-1300/han-solo.png",
        "text": "When you are placed during setup, you can be placed anywhere in the play area beyond Range 3 of enemy ships.",
        "name": "Han Solo",
        "xws": "hansolo-swx57",
        "ship": "YT-1300",
        "unique": true,
        "skill": 9,
        "points": 46,
        "faction": "Resistance",
        "slots": [
           "Elite",
           "Crew",
           "Crew",
           "Missile"
        ],
        "id": 219,
        "key": "hanSolo_resistance"
     },
     "heffTobber": {
        "image": "pilots/Rebel Alliance/U-wing/heff-tobber.png",
        "text": "After an enemy ship executes a maneuver that causes it to overlap your ship, you may perform a free action.",
        "name": "Heff Tobber",
        "xws": "hefftobber",
        "ship": "U-wing",
        "unique": true,
        "skill": 3,
        "points": 24,
        "faction": "Rebel Alliance",
        "slots": [
           "System",
           "Crew",
           "Crew",
           "Torpedo"
        ],
        "id": 232,
        "key": "heffTobber"
     },
     "heraSyndulla_attackShuttle": {
        "image": "pilots/Rebel Alliance/Attack Shuttle/hera-syndulla.png",
        "text": "When you reveal a green or red maneuver, you may rotate your dial to another maneuver of the same difficulty.",
        "name": "Hera Syndulla",
        "ship": "Attack Shuttle",
        "unique": true,
        "skill": 7,
        "points": 22,
        "faction": "Rebel Alliance",
        "slots": [
           "Elite",
           "Turret",
           "Crew"
        ],
        "id": 174,
        "xws": "herasyndulla",
        "key": "heraSyndulla_attackShuttle"
     },
     "heraSyndulla_vcx100": {
        "name": "Hera Syndulla",
        "ship": "VCX-100",
        "unique": true,
        "skill": 7,
        "points": 40,
        "faction": "Rebel Alliance",
        "id": 160,
        "text": "When you reveal a green or red maneuver, you may rotate your dial to another maneuver of the same difficulty.",
        "slots": [
           "Crew",
           "Crew",
           "System",
           "Torpedo",
           "Torpedo",
           "Turret"
        ],
        "image": "pilots/Rebel Alliance/VCX-100/hera-syndulla.png",
        "xws": "herasyndulla",
        "grants": [
           {
              "type": "firing_arc",
              "name": "Auxiliary Rear",
              "slot": "Torpedo"
           }
        ],
        "key": "heraSyndulla_vcx100"
     },
     "hiredGun": {
        "name": "Hired Gun",
        "id": 126,
        "ship": "Y-wing",
        "skill": 4,
        "points": 20,
        "slots": [
           "Turret",
           "Torpedo",
           "Torpedo",
           "Salvaged Astromech"
        ],
        "faction": "Scum and Villainy",
        "image": "pilots/Scum and Villainy/Y-wing/hired-gun.png",
        "xws": "hiredgun",
        "key": "hiredGun"
     },
     "hobbieKlivian": {
        "name": "\"Hobbie\" Klivian",
        "id": 83,
        "unique": true,
        "ship": "X-wing",
        "skill": 5,
        "points": 25,
        "slots": [
           "Torpedo",
           "Astromech"
        ],
        "text": "When you acquire or spend a target lock, you may remove 1 stress token from your ship.",
        "image": "pilots/Rebel Alliance/X-wing/hobbie-klivian.png",
        "faction": "Rebel Alliance",
        "xws": "hobbieklivian",
        "key": "hobbieKlivian"
     },
     "hortonSalm": {
        "name": "Horton Salm",
        "id": 8,
        "unique": true,
        "ship": "Y-wing",
        "skill": 8,
        "points": 25,
        "slots": [
           "Turret",
           "Torpedo",
           "Torpedo",
           "Astromech"
        ],
        "text": "When attacking at Range 2-3, you may reroll any of your blank results.",
        "image": "pilots/Rebel Alliance/Y-wing/horton-salm.png",
        "faction": "Rebel Alliance",
        "xws": "hortonsalm",
        "key": "hortonSalm"
     },
     "howlrunner": {
        "name": "\"Howlrunner\"",
        "id": 18,
        "unique": true,
        "ship": "TIE Fighter",
        "skill": 8,
        "points": 18,
        "slots": [
           "Elite"
        ],
        "text": "When another friendly ship at Range 1 is attacking with its primary weapon, it may reroll 1 attack die.",
        "image": "pilots/Galactic Empire/TIE Fighter/howlrunner.png",
        "faction": "Galactic Empire",
        "xws": "howlrunner",
        "key": "howlrunner"
     },
     "ibtisam": {
        "name": "Ibtisam",
        "id": 42,
        "unique": true,
        "ship": "B-wing",
        "skill": 6,
        "points": 28,
        "slots": [
           "Elite",
           "System",
           "Cannon",
           "Torpedo",
           "Torpedo"
        ],
        "text": "When attacking or defending, if you have at least 1 stress token, you may reroll 1 of your dice.",
        "image": "pilots/Rebel Alliance/B-wing/ibtisam.png",
        "faction": "Rebel Alliance",
        "xws": "ibtisam",
        "key": "ibtisam"
     },
     "ig88a": {
        "name": "IG-88A",
        "id": 103,
        "unique": true,
        "ship": "Aggressor",
        "skill": 6,
        "points": 36,
        "slots": [
           "Elite",
           "System",
           "Cannon",
           "Cannon",
           "Bomb",
           "Illicit"
        ],
        "text": "After you perform an attack that destroys the defender, you may recover 1 shield.",
        "faction": "Scum and Villainy",
        "image": "pilots/Scum and Villainy/Aggressor/ig-88a.png",
        "xws": "ig88a",
        "key": "ig88a"
     },
     "ig88b": {
        "name": "IG-88B",
        "id": 104,
        "unique": true,
        "ship": "Aggressor",
        "skill": 6,
        "points": 36,
        "slots": [
           "Elite",
           "System",
           "Cannon",
           "Cannon",
           "Bomb",
           "Illicit"
        ],
        "text": "Once per round, after you perform an attack that does not hit, you may perform an attack with an equipped [Cannon] secondary weapon.",
        "faction": "Scum and Villainy",
        "image": "pilots/Scum and Villainy/Aggressor/ig-88b.png",
        "xws": "ig88b",
        "key": "ig88b"
     },
     "ig88c": {
        "name": "IG-88C",
        "id": 105,
        "unique": true,
        "ship": "Aggressor",
        "skill": 6,
        "points": 36,
        "slots": [
           "Elite",
           "System",
           "Cannon",
           "Cannon",
           "Bomb",
           "Illicit"
        ],
        "text": "After you perform a boost action, you may perform a free evade action.",
        "faction": "Scum and Villainy",
        "image": "pilots/Scum and Villainy/Aggressor/ig-88c.png",
        "xws": "ig88c",
        "key": "ig88c"
     },
     "ig88d": {
        "name": "IG-88D",
        "id": 106,
        "unique": true,
        "ship": "Aggressor",
        "skill": 6,
        "points": 36,
        "slots": [
           "Elite",
           "System",
           "Cannon",
           "Cannon",
           "Bomb",
           "Illicit"
        ],
        "text": "You may execute the ([Segnor's Loop Left] 3) or ([Segnor's Loop Right] 3) maneuver using the corresponding ([Turn Left] 3) or ([Turn Right] 3) template.",
        "faction": "Scum and Villainy",
        "image": "pilots/Scum and Villainy/Aggressor/ig-88d.png",
        "xws": "ig88d",
        "key": "ig88d"
     },
     "imperialTrainee": {
        "image": "pilots/Galactic Empire/TIE Striker/imperial-trainee.png",
        "name": "Imperial Trainee",
        "xws": "imperialtrainee",
        "ship": "TIE Striker",
        "unique": false,
        "skill": 1,
        "points": 17,
        "faction": "Galactic Empire",
        "slots": [],
        "id": 237,
        "key": "imperialTrainee"
     },
     "inaldra": {
        "image": "pilots/Scum and Villainy/M3-A Interceptor/inaldra.png",
        "text": "When attacking or defending, you may spend 1 shield to reroll any number of your dice.",
        "name": "Inaldra",
        "xws": "inaldra",
        "ship": "M3-A Interceptor",
        "unique": true,
        "skill": 3,
        "points": 15,
        "faction": "Scum and Villainy",
        "slots": [
           "Elite"
        ],
        "id": 244,
        "ship_image": "ships/Scum and Villainy/m3-a-interceptor-v2.png",
        "key": "inaldra"
     },
     "jakeFarrell": {
        "name": "Jake Farrell",
        "id": 85,
        "unique": true,
        "ship": "A-wing",
        "skill": 7,
        "points": 24,
        "slots": [
           "Elite",
           "Missile"
        ],
        "text": "After you perform a focus action or are assigned a focus token, you may perform a free boost or barrel roll action.",
        "image": "pilots/Rebel Alliance/A-wing/jake-farrell.png",
        "faction": "Rebel Alliance",
        "xws": "jakefarrell",
        "ship_image": "ships/Rebel Alliance/a-wing-v2.png",
        "key": "jakeFarrell"
     },
     "jakkuGunrunner": {
        "image": "pilots/Scum and Villainy/Quadjumper/jakku-gunrunner.png",
        "name": "Jakku Gunrunner",
        "xws": "jakkugunrunner",
        "ship": "Quadjumper",
        "unique": false,
        "skill": 1,
        "points": 15,
        "faction": "Scum and Villainy",
        "slots": [
           "Bomb",
           "Crew",
           "Illicit",
           "Tech"
        ],
        "id": 234,
        "key": "jakkuGunrunner"
     },
     "janOrs": {
        "name": "Jan Ors",
        "id": 48,
        "unique": true,
        "ship": "HWK-290",
        "skill": 8,
        "points": 25,
        "slots": [
           "Elite",
           "Turret",
           "Crew"
        ],
        "text": "When another friendly ship at Range 1-3 is attacking, if you have no stress tokens, you may receive 1 stress token to allow that ship to roll 1 additional attack die.",
        "image": "pilots/Rebel Alliance/HWK-290/jan-ors.png",
        "faction": "Rebel Alliance",
        "xws": "janors",
        "key": "janOrs"
     },
     "jekPorkins": {
        "name": "Jek Porkins",
        "id": 82,
        "unique": true,
        "ship": "X-wing",
        "skill": 7,
        "points": 26,
        "slots": [
           "Elite",
           "Torpedo",
           "Astromech"
        ],
        "text": "When you receive a stress token, you may remove it and roll 1 attack die.  On a [Hit] result, deal 1 facedown Damage card to this ship.",
        "image": "pilots/Rebel Alliance/X-wing/jek-porkins.png",
        "faction": "Rebel Alliance",
        "xws": "jekporkins",
        "key": "jekPorkins"
     },
     "jessPava": {
        "image": "pilots/Resistance/T-70 X-wing/jess-pava.png",
        "text": "When attacking or defending, you may reroll 1 of your dice for each other friendly ship at Range 1.",
        "name": "Jess Pava",
        "xws": "jesspava",
        "ship": "T-70 X-wing",
        "unique": true,
        "skill": 3,
        "points": 25,
        "faction": "Resistance",
        "slots": [
           "Astromech",
           "Tech",
           "Torpedo"
        ],
        "id": 221,
        "ship_image": "ships/Resistance/t-70-x-wing-v2.png",
        "key": "jessPava"
     },
     "junoEclipse": {
        "name": "Juno Eclipse",
        "id": 130,
        "unique": true,
        "ship": "TIE Advanced",
        "skill": 8,
        "points": 28,
        "slots": [
           "Elite",
           "Missile"
        ],
        "text": "When you reveal your maneuver, you may increase or decrease its speed by 1 (to a minimum of 1).",
        "image": "pilots/Galactic Empire/TIE Advanced/juno-eclipse.png",
        "faction": "Galactic Empire",
        "xws": "junoeclipse",
        "key": "junoEclipse"
     },
     "kaatoLeeachos": {
        "name": "Kaa'to Leeachos",
        "id": 110,
        "unique": true,
        "ship": "Z-95 Headhunter",
        "skill": 5,
        "points": 15,
        "slots": [
           "Elite",
           "Missile",
           "Illicit"
        ],
        "text": "At the start of the Combat phase, you may remove 1 focus or evade token from another friendly ship at Range 1-2 and assign it to yourself.",
        "faction": "Scum and Villainy",
        "image": "pilots/Scum and Villainy/Z-95 Headhunter/kaa-to-leeachos.png",
        "xws": "kaatoleeachos",
        "key": "kaatoLeeachos"
     },
     "kadSolus": {
        "image": "pilots/Scum and Villainy/Protectorate Starfighter/kad-solus.png",
        "text": "After you execute a red maneuver, assign 2 focus tokens to your ship.",
        "name": "Kad Solus",
        "xws": "kadsolus",
        "ship": "Protectorate Starfighter",
        "unique": true,
        "skill": 6,
        "points": 25,
        "faction": "Scum and Villainy",
        "slots": [
           "Torpedo",
           "Elite"
        ],
        "id": 206,
        "key": "kadSolus"
     },
     "kananJarrus": {
        "image": "pilots/Rebel Alliance/VCX-100/kanan-jarrus.png",
        "text": "When an enemy ship at Range 1-2 is attacking, you may spend a focus token. If you do, the attacker rolls 1 fewer attack die.",
        "name": "Kanan Jarrus",
        "ship": "VCX-100",
        "unique": true,
        "skill": 5,
        "points": 38,
        "faction": "Rebel Alliance",
        "slots": [
           "Turret",
           "Torpedo",
           "Torpedo",
           "System",
           "Crew",
           "Crew"
        ],
        "id": 173,
        "xws": "kananjarrus",
        "grants": [
           {
              "type": "firing_arc",
              "name": "Auxiliary Rear",
              "slot": "Torpedo"
           }
        ],
        "key": "kananJarrus"
     },
     "karthakkPirate": {
        "name": "Karthakk Pirate",
        "xws": "karthakkpirate",
        "ship": "Scurrg H-6 Bomber",
        "skill": 1,
        "points": 24,
        "faction": "Scum and Villainy",
        "slots": [
           "Bomb",
           "Bomb",
           "Crew",
           "Missile",
           "Torpedo",
           "Turret"
        ],
        "id": 247,
        "image": "pilots/Scum and Villainy/Scurrg H-6 Bomber/karthakk-pirate.png",
        "key": "karthakkPirate"
     },
     "kashyyykDefender": {
        "image": "pilots/Rebel Alliance/Auzituck Gunship/kashyyyk-defender.png",
        "name": "Kashyyyk Defender",
        "xws": "kashyyykdefender",
        "ship": "Auzituck Gunship",
        "skill": 1,
        "points": 24,
        "faction": "Rebel Alliance",
        "slots": [
           "Crew",
           "Crew"
        ],
        "id": 249,
        "key": "kashyyykDefender"
     },
     "kathScarlet_galacticEmpire": {
        "name": "Kath Scarlet",
        "id": 37,
        "unique": true,
        "ship": "Firespray-31",
        "skill": 7,
        "points": 38,
        "slots": [
           "Elite",
           "Cannon",
           "Bomb",
           "Crew",
           "Missile"
        ],
        "text": "When attacking, the defender receives 1 stress token if he cancels at least 1 [Critical Hit] result.",
        "image": "pilots/Galactic Empire/Firespray-31/kath-scarlet.png",
        "faction": "Galactic Empire",
        "xws": "kathscarlet",
        "key": "kathScarlet_galacticEmpire"
     },
     "kathScarlet_scumAndVillainy": {
        "name": "Kath Scarlet",
        "id": 99,
        "unique": true,
        "ship": "Firespray-31",
        "skill": 7,
        "points": 38,
        "slots": [
           "Elite",
           "Cannon",
           "Bomb",
           "Crew",
           "Missile",
           "Illicit"
        ],
        "text": "When attacking a ship inside your auxiliary firing arc, roll 1 additional attack die.",
        "image": "pilots/Scum and Villainy/Firespray-31/kath-scarlet.png",
        "faction": "Scum and Villainy",
        "xws": "kathscarlet",
        "key": "kathScarlet_scumAndVillainy"
     },
     "kavil": {
        "name": "Kavil",
        "id": 111,
        "unique": true,
        "ship": "Y-wing",
        "skill": 7,
        "points": 24,
        "slots": [
           "Elite",
           "Turret",
           "Torpedo",
           "Torpedo",
           "Salvaged Astromech"
        ],
        "text": "When attacking a ship outside your firing arc, roll 1 additional attack die.",
        "faction": "Scum and Villainy",
        "image": "pilots/Scum and Villainy/Y-wing/kavil.png",
        "xws": "kavil",
        "key": "kavil"
     },
     "ketsuOnyo": {
        "text": "At the start of the Combat phase, you may choose a ship at Range 1. If it is inside your primary <strong>and</strong> mobile firing arcs, assign 1 tractor beam token to it.",
        "name": "Ketsu Onyo",
        "xws": "ketsuonyo",
        "ship": "Lancer-class Pursuit Craft",
        "unique": true,
        "skill": 7,
        "points": 38,
        "faction": "Scum and Villainy",
        "slots": [
           "Crew",
           "Elite",
           "Illicit",
           "Illicit"
        ],
        "id": 200,
        "image": "pilots/Scum and Villainy/Lancer-class Pursuit Craft/ketsu-onyo.png",
        "key": "ketsuOnyo"
     },
     "keyanFarlander": {
        "name": "Keyan Farlander",
        "id": 87,
        "unique": true,
        "ship": "B-wing",
        "skill": 7,
        "points": 29,
        "slots": [
           "Elite",
           "System",
           "Cannon",
           "Torpedo",
           "Torpedo"
        ],
        "text": "When attacking, you may remove 1 stress token to change all of your [Focus] results to [Hit] results.",
        "image": "pilots/Rebel Alliance/B-wing/keyan-farlander.png",
        "faction": "Rebel Alliance",
        "xws": "keyanfarlander",
        "ship_image": "ships/Rebel Alliance/b-wing-v2.png",
        "key": "keyanFarlander"
     },
     "kirKanos": {
        "name": "Kir Kanos",
        "id": 60,
        "unique": true,
        "ship": "TIE Interceptor",
        "skill": 6,
        "points": 24,
        "slots": [],
        "text": "When attacking at Range 2-3, you may spend 1 evade token to add 1 [Hit] result to your roll.",
        "image": "pilots/Galactic Empire/TIE Interceptor/kir-kanos.png",
        "faction": "Galactic Empire",
        "xws": "kirkanos",
        "ship_image": "ships/Galactic Empire/tie-interceptor-v3.png",
        "key": "kirKanos"
     },
     "knaveSquadronPilot": {
        "name": "Knave Squadron Pilot",
        "id": 71,
        "ship": "E-wing",
        "skill": 1,
        "points": 27,
        "slots": [
           "System",
           "Torpedo",
           "Astromech"
        ],
        "image": "pilots/Rebel Alliance/E-wing/knave-squadron-pilot.png",
        "faction": "Rebel Alliance",
        "xws": "knavesquadronpilot",
        "key": "knaveSquadronPilot"
     },
     "krassisTrelix": {
        "name": "Krassis Trelix",
        "id": 39,
        "unique": true,
        "ship": "Firespray-31",
        "skill": 5,
        "points": 36,
        "slots": [
           "Cannon",
           "Bomb",
           "Crew",
           "Missile"
        ],
        "text": "When attacking with a secondary weapon, you may reroll 1 attack die.",
        "image": "pilots/Galactic Empire/Firespray-31/krassis-trelix.png",
        "faction": "Galactic Empire",
        "xws": "krassistrelix",
        "key": "krassisTrelix"
     },
     "kullbeeSperado": {
        "name": "Kullbee Sperado",
        "xws": "kullbeesperado",
        "text": "After you perform a boost or barrel roll action, you may flip your equipped \"Servomotor S-foils\" Upgrade card.",
        "ship": "X-wing",
        "unique": true,
        "skill": 7,
        "points": 26,
        "faction": "Rebel Alliance",
        "slots": [
           "Astromech",
           "Elite",
           "Torpedo"
        ],
        "id": 285,
        "image": "pilots/Rebel Alliance/X-wing/kullbee-sperado.png",
        "key": "kullbeeSperado"
     },
     "kyleKatarn": {
        "name": "Kyle Katarn",
        "id": 47,
        "unique": true,
        "ship": "HWK-290",
        "skill": 6,
        "points": 21,
        "slots": [
           "Elite",
           "Turret",
           "Crew"
        ],
        "text": "At the start of the Combat phase, you may assign 1 of your focus tokens to another friendly ship at Range 1-3.",
        "image": "pilots/Rebel Alliance/HWK-290/kyle-katarn.png",
        "faction": "Rebel Alliance",
        "xws": "kylekatarn",
        "key": "kyleKatarn"
     },
     "kyloRen_tieSilencer": {
        "image": "pilots/First Order/TIE Silencer/kylo-ren.png",
        "text": "The first time you are hit by an attack each round, assign the \"I'll Show You the Dark Side\" Condition card to the defender.",
        "name": "Kylo Ren",
        "xws": "kyloren",
        "ship": "TIE Silencer",
        "unique": true,
        "skill": 9,
        "points": 35,
        "faction": "First Order",
        "conditions": [
           "I'll Show You the Dark Side"
        ],
        "slots": [
           "Elite",
           "System",
           "Tech"
        ],
        "id": 268,
        "key": "kyloRen_tieSilencer"
     },
     "kyloRen_upsilonClassShuttle": {
        "text": "The first time you are hit by an attack each round, assign the \"I'll Show You the Dark Side\" Condition card to the defender.",
        "name": "Kylo Ren",
        "xws": "kyloren",
        "ship": "Upsilon-class Shuttle",
        "unique": true,
        "skill": 6,
        "points": 34,
        "faction": "First Order",
        "slots": [
           "Elite",
           "System",
           "Crew",
           "Crew",
           "Tech",
           "Tech"
        ],
        "id": 215,
        "image": "pilots/First Order/Upsilon-class Shuttle/kylo-ren.png",
        "conditions": [
           "I'll Show You the Dark Side"
        ],
        "key": "kyloRen_upsilonClassShuttle"
     },
     "laetinAshera": {
        "name": "Laetin A'shera",
        "id": 121,
        "unique": true,
        "ship": "M3-A Interceptor",
        "skill": 6,
        "points": 18,
        "slots": [],
        "text": "After you defend against an attack, if the attack did not hit, you may assign 1 evade token to your ship.",
        "faction": "Scum and Villainy",
        "image": "pilots/Scum and Villainy/M3-A Interceptor/laetin-a-shera.png",
        "xws": "laetinashera",
        "key": "laetinAshera"
     },
     "landoCalrissian": {
        "name": "Lando Calrissian",
        "id": 35,
        "unique": true,
        "ship": "YT-1300",
        "skill": 7,
        "points": 44,
        "slots": [
           "Elite",
           "Missile",
           "Crew",
           "Crew"
        ],
        "image": "pilots/Rebel Alliance/YT-1300/lando-calrissian.png",
        "text": "After you execute a green maneuver, choose 1 other friendly ship at Range 1.  That ship may perform 1 free action shown on its action bar.",
        "faction": "Rebel Alliance",
        "xws": "landocalrissian",
        "key": "landoCalrissian"
     },
     "lattsRazzi": {
        "name": "Latts Razzi",
        "id": 132,
        "unique": true,
        "ship": "YV-666",
        "skill": 5,
        "points": 33,
        "slots": [
           "Cannon",
           "Missile",
           "Crew",
           "Crew",
           "Crew",
           "Illicit"
        ],
        "text": "When a friendly ship declares an attack, you may spend a target lock you have on the defender to reduce its agility by 1 for that attack.",
        "image": "pilots/Scum and Villainy/YV-666/latts-razzi.png",
        "faction": "Scum and Villainy",
        "xws": "lattsrazzi",
        "key": "lattsRazzi"
     },
     "leebo": {
        "name": "\"Leebo\"",
        "id": 92,
        "unique": true,
        "ship": "YT-2400",
        "skill": 5,
        "points": 34,
        "slots": [
           "Elite",
           "Cannon",
           "Missile",
           "Crew"
        ],
        "text": "When you are dealt a faceup Damage card, draw 1 additional Damage card, choose 1 to resolve, and discard the other.",
        "image": "pilots/Rebel Alliance/YT-2400/leebo.png",
        "faction": "Rebel Alliance",
        "xws": "leebo",
        "key": "leebo"
     },
     "leevanTenza": {
        "image": "pilots/Rebel Alliance/X-wing/leevan-tenza.png",
        "text": "After you perform a boost action, you may receive 1 stress token to receive 1 evade token.",
        "name": "Leevan Tenza",
        "xws": "leevantenza",
        "ship": "X-wing",
        "unique": true,
        "skill": 5,
        "points": 25,
        "faction": "Rebel Alliance",
        "slots": [
           "Astromech",
           "Elite",
           "Torpedo"
        ],
        "id": 289,
        "key": "leevanTenza"
     },
     "lieutenantBlount": {
        "name": "Lieutenant Blount",
        "id": 65,
        "unique": true,
        "ship": "Z-95 Headhunter",
        "skill": 6,
        "points": 17,
        "slots": [
           "Elite",
           "Missile"
        ],
        "text": "When attacking, the defender is hit by your attack, even if he does not suffer any damage.",
        "image": "pilots/Rebel Alliance/Z-95 Headhunter/lieutenant-blount.png",
        "faction": "Rebel Alliance",
        "xws": "lieutenantblount",
        "key": "lieutenantBlount"
     },
     "lieutenantColzet": {
        "name": "Lieutenant Colzet",
        "id": 128,
        "unique": true,
        "ship": "TIE Advanced",
        "skill": 3,
        "points": 23,
        "slots": [
           "Missile"
        ],
        "text": "At the start of the End phase, you may spend a target lock you have on an enemy ship to flip 1 random facedown Damage card assigned to it faceup.",
        "image": "pilots/Galactic Empire/TIE Advanced/lieutenant-colzet.png",
        "faction": "Galactic Empire",
        "xws": "lieutenantcolzet",
        "key": "lieutenantColzet"
     },
     "lieutenantDormitz": {
        "image": "pilots/First Order/Upsilon-class Shuttle/lieutenant-dormitz.png",
        "text": "During setup, friendly ships may be placed anywhere in the play area at Range 1-2 of you.",
        "name": "Lieutenant Dormitz",
        "xws": "lieutenantdormitz",
        "ship": "Upsilon-class Shuttle",
        "unique": true,
        "points": 31,
        "skill": 3,
        "faction": "First Order",
        "slots": [
           "Crew",
           "Crew",
           "System",
           "Tech",
           "Tech"
        ],
        "id": 229,
        "key": "lieutenantDormitz"
     },
     "lieutenantKarsabi": {
        "image": "pilots/Galactic Empire/Alpha-class Star Wing/lieutenant-karsabi.png",
        "text": "When you receive a weapons disabled token, if you are not stressed, you may receive 1 stress token to remove it.",
        "name": "Lieutenant Karsabi",
        "xws": "lieutenantkarsabi",
        "ship": "Alpha-class Star Wing",
        "unique": true,
        "skill": 5,
        "points": 24,
        "faction": "Galactic Empire",
        "slots": [
           "Elite",
           "Missile",
           "Torpedo"
        ],
        "id": 272,
        "key": "lieutenantKarsabi"
     },
     "lieutenantKestal": {
        "image": "pilots/Galactic Empire/TIE Aggressor/lieutenant-kestal.png",
        "text": "When attacking, you may spend 1 focus token to cancel all of the defender's blank and [Focus] results.",
        "name": "Lieutenant Kestal",
        "xws": "lieutenantkestal",
        "ship": "TIE Aggressor",
        "unique": true,
        "skill": 7,
        "points": 22,
        "faction": "Galactic Empire",
        "slots": [
           "Elite",
           "Missile",
           "Missile",
           "Turret"
        ],
        "id": 251,
        "key": "lieutenantKestal"
     },
     "lieutenantLorrir": {
        "name": "Lieutenant Lorrir",
        "id": 57,
        "unique": true,
        "ship": "TIE Interceptor",
        "skill": 5,
        "points": 23,
        "slots": [],
        "text": "When performing a barrel roll action, you may receive 1 stress token to use the ([Bank Left] 1) or ([Bank Right] 1) template instead of the ([Straight] 1) template.",
        "image": "pilots/Galactic Empire/TIE Interceptor/lieutenant-lorrir.png",
        "faction": "Galactic Empire",
        "xws": "lieutenantlorrir",
        "ship_image": "ships/Galactic Empire/tie-interceptor-v2.png",
        "key": "lieutenantLorrir"
     },
     "lokRevenant": {
        "image": "pilots/Scum and Villainy/Scurrg H-6 Bomber/lok-revenant.png",
        "name": "Lok Revenant",
        "xws": "lokrevenant",
        "ship": "Scurrg H-6 Bomber",
        "skill": 3,
        "points": 26,
        "faction": "Scum and Villainy",
        "slots": [
           "Bomb",
           "Bomb",
           "Crew",
           "Elite",
           "Missile",
           "Torpedo",
           "Turret"
        ],
        "id": 260,
        "key": "lokRevenant"
     },
     "lothalRebel": {
        "image": "pilots/Rebel Alliance/VCX-100/lothal-rebel.png",
        "name": "Lothal Rebel",
        "xws": "lothalrebel",
        "ship": "VCX-100",
        "skill": 3,
        "points": 35,
        "faction": "Rebel Alliance",
        "slots": [
           "Crew",
           "Crew",
           "System",
           "Torpedo",
           "Torpedo",
           "Turret"
        ],
        "id": 186,
        "grants": [
           {
              "type": "firing_arc",
              "name": "Auxiliary Rear",
              "slot": "Torpedo"
           }
        ],
        "key": "lothalRebel"
     },
     "lowhhrick": {
        "image": "pilots/Rebel Alliance/Auzituck Gunship/lowhhrick.png",
        "text": "When another friendly ship at Range 1 is defending, you may spend 1 reinforce token. If you do, the defender adds 1 [Evade] result.",
        "name": "Lowhhrick",
        "xws": "lowhhrick",
        "ship": "Auzituck Gunship",
        "skill": 5,
        "points": 28,
        "faction": "Rebel Alliance",
        "slots": [
           "Crew",
           "Crew",
           "Elite"
        ],
        "id": 254,
        "unique": true,
        "key": "lowhhrick"
     },
     "lukeSkywalker": {
        "name": "Luke Skywalker",
        "id": 5,
        "unique": true,
        "ship": "X-wing",
        "skill": 8,
        "points": 28,
        "slots": [
           "Elite",
           "Torpedo",
           "Astromech"
        ],
        "text": "When defending, you may change 1 of your [Focus] results to a [Evade] result.",
        "image": "pilots/Rebel Alliance/X-wing/luke-skywalker.png",
        "faction": "Rebel Alliance",
        "xws": "lukeskywalker",
        "key": "lukeSkywalker"
     },
     "maarekStele_tieAdvanced": {
        "name": "Maarek Stele",
        "id": 19,
        "unique": true,
        "ship": "TIE Advanced",
        "skill": 7,
        "points": 27,
        "slots": [
           "Elite",
           "Missile"
        ],
        "text": "When your attack deals a faceup Damage card to the defender, instead draw 3 Damage cards, choose 1 to deal, and discard the others.",
        "image": "pilots/Galactic Empire/TIE Advanced/maarek-stele.png",
        "faction": "Galactic Empire",
        "xws": "maarekstele",
        "key": "maarekStele_tieAdvanced"
     },
     "maarekStele_tieDefender": {
        "image": "pilots/Galactic Empire/TIE Defender/maarek-stele.png",
        "text": "When your attack deals a faceup Damage card to the defender, instead draw 3 Damage cards, choose 1 to deal, and discard the others.",
        "name": "Maarek Stele",
        "xws": "maarekstele",
        "ship": "TIE Defender",
        "unique": true,
        "skill": 7,
        "points": 35,
        "faction": "Galactic Empire",
        "slots": [
           "Elite",
           "Cannon",
           "Missile"
        ],
        "id": 192,
        "key": "maarekStele_tieDefender"
     },
     "magvaYarro": {
        "text": "When another ship at Range 1-2 is defending, the attacker cannot reroll more than 1 attack die.",
        "name": "Magva Yarro",
        "xws": "magvayarro",
        "ship": "U-wing",
        "unique": true,
        "skill": 5,
        "points": 25,
        "faction": "Rebel Alliance",
        "slots": [
           "Crew",
           "Crew",
           "Torpedo",
           "System"
        ],
        "id": 296,
        "image": "pilots/Rebel Alliance/U-wing/magva-yarro.png",
        "key": "magvaYarro"
     },
     "majorRhymer": {
        "name": "Major Rhymer",
        "id": 52,
        "unique": true,
        "ship": "TIE Bomber",
        "skill": 7,
        "points": 26,
        "slots": [
           "Elite",
           "Torpedo",
           "Torpedo",
           "Missile",
           "Missile",
           "Bomb"
        ],
        "text": "When attacking with a secondary weapon, you may increase or decrease the weapon range by 1 to a limit of Range 1-3.",
        "image": "pilots/Galactic Empire/TIE Bomber/major-rhymer.png",
        "faction": "Galactic Empire",
        "xws": "majorrhymer",
        "key": "majorRhymer"
     },
     "majorStridan": {
        "image": "pilots/First Order/Upsilon-class Shuttle/major-stridan.png",
        "text": "For the purpose of your actions and Upgrade cards, you may treat friendly ships at Range 2-3 as being at Range 1.",
        "name": "Major Stridan",
        "xws": "majorstridan",
        "ship": "Upsilon-class Shuttle",
        "unique": true,
        "points": 32,
        "faction": "First Order",
        "slots": [
           "Crew",
           "Crew",
           "System",
           "Tech",
           "Tech"
        ],
        "id": 228,
        "skill": 4,
        "key": "majorStridan"
     },
     "majorVermeil": {
        "text": "When attacking, if the defender does not have a focus or evade token, you may change 1 of your blank or [Focus] results to a [Hit] result.",
        "name": "Major Vermeil",
        "xws": "majorvermeil",
        "ship": "TIE Reaper",
        "unique": true,
        "skill": 6,
        "points": 26,
        "faction": "Galactic Empire",
        "slots": [
           "Crew",
           "Crew",
           "Elite"
        ],
        "id": 286,
        "image": "pilots/Galactic Empire/TIE Reaper/major-vermeil.png",
        "key": "majorVermeil"
     },
     "majorVynder": {
        "text": "When defending, if you have a weapons disabled token, roll 1 additional defense die.",
        "name": "Major Vynder",
        "xws": "majorvynder",
        "ship": "Alpha-class Star Wing",
        "unique": true,
        "skill": 7,
        "points": 26,
        "faction": "Galactic Empire",
        "slots": [
           "Elite",
           "Missile",
           "Torpedo"
        ],
        "id": 265,
        "image": "pilots/Galactic Empire/Alpha-class Star Wing/major-vynder.png",
        "key": "majorVynder"
     },
     "manaroo": {
        "image": "pilots/Scum and Villainy/JumpMaster 5000/manaroo.png",
        "text": "At the start of the Combat phase, you may assign all focus, evade, and target lock tokens assigned to you to another friendly ship at Range 1.",
        "name": "Manaroo",
        "xws": "manaroo",
        "ship": "JumpMaster 5000",
        "unique": true,
        "skill": 4,
        "points": 27,
        "faction": "Scum and Villainy",
        "slots": [
           "Elite",
           "Illicit",
           "Crew"
        ],
        "id": 184,
        "key": "manaroo"
     },
     "mandalorianMercenary": {
        "name": "Mandalorian Mercenary",
        "id": 113,
        "ship": "Firespray-31",
        "skill": 5,
        "points": 35,
        "slots": [
           "Elite",
           "Cannon",
           "Bomb",
           "Crew",
           "Missile",
           "Illicit"
        ],
        "faction": "Scum and Villainy",
        "image": "pilots/Scum and Villainy/Firespray-31/mandalorian-mercenary.png",
        "xws": "mandalorianmercenary",
        "key": "mandalorianMercenary"
     },
     "maulerMithel": {
        "name": "\"Mauler Mithel\"",
        "id": 17,
        "unique": true,
        "ship": "TIE Fighter",
        "skill": 7,
        "points": 17,
        "slots": [
           "Elite"
        ],
        "text": "When attacking at Range 1, roll 1 additional attack die.",
        "image": "pilots/Galactic Empire/TIE Fighter/mauler-mithel.png",
        "faction": "Galactic Empire",
        "xws": "maulermithel",
        "key": "maulerMithel"
     },
     "mirandaDoni": {
        "name": "Miranda Doni",
        "id": 141,
        "unique": true,
        "ship": "K-wing",
        "skill": 8,
        "points": 29,
        "slots": [
           "Turret",
           "Torpedo",
           "Torpedo",
           "Missile",
           "Crew",
           "Bomb",
           "Bomb"
        ],
        "text": "Once per round when attacking, you may either spend 1 shield to roll 1 additional attack die <strong>or</strong> roll 1 fewer attack die to recover 1 shield.",
        "image": "pilots/Rebel Alliance/K-wing/miranda-doni.png",
        "faction": "Rebel Alliance",
        "xws": "mirandadoni",
        "key": "mirandaDoni"
     },
     "moraloEval": {
        "name": "Moralo Eval",
        "id": 146,
        "unique": true,
        "ship": "YV-666",
        "skill": 6,
        "points": 34,
        "slots": [
           "Cannon",
           "Missile",
           "Crew",
           "Crew",
           "Crew",
           "Illicit"
        ],
        "text": "You can perform [Cannon] secondary weapon attacks against ships inside your auxiliary firing arc.",
        "image": "pilots/Scum and Villainy/YV-666/moralo-eval.png",
        "faction": "Scum and Villainy",
        "xws": "moraloeval",
        "grants": [
           {
              "type": "firing_arc",
              "name": "Auxiliary 180",
              "slot": "Cannon"
           }
        ],
        "key": "moraloEval"
     },
     "nashtahPupPilot": {
        "name": "Nashtah Pup Pilot",
        "id": 134,
        "unique": true,
        "ship": "Z-95 Headhunter",
        "skill": "?",
        "points": "?",
        "slots": [],
        "text": "You have the pilot skill and pilot ability of the friendly destroyed ship equipped with the <em>Hound's Tooth</em> Upgrade card.",
        "image": "pilots/Scum and Villainy/Z-95 Headhunter/nashtah-pup.png",
        "faction": "Scum and Villainy",
        "xws": "nashtahpuppilot",
        "key": "nashtahPupPilot"
     },
     "ndruSuhlak": {
        "name": "N'dru Suhlak",
        "id": 101,
        "unique": true,
        "ship": "Z-95 Headhunter",
        "skill": 7,
        "points": 17,
        "slots": [
           "Elite",
           "Missile",
           "Illicit"
        ],
        "text": "When attacking, if there are no other friendly ships at Range 1-2, roll 1 additional attack die.",
        "faction": "Scum and Villainy",
        "image": "pilots/Scum and Villainy/Z-95 Headhunter/n-dru-suhlak.png",
        "xws": "ndrusuhlak",
        "key": "ndruSuhlak"
     },
     "neraDantels": {
        "name": "Nera Dantels",
        "id": 88,
        "unique": true,
        "ship": "B-wing",
        "skill": 5,
        "points": 26,
        "slots": [
           "Elite",
           "System",
           "Cannon",
           "Torpedo",
           "Torpedo"
        ],
        "text": "You can perform [Torpedo] secondary weapon attacks against enemy ships outside your firing arc.",
        "image": "pilots/Rebel Alliance/B-wing/nera-dantels.png",
        "faction": "Rebel Alliance",
        "xws": "neradantels",
        "grants": [
           {
              "type": "firing_arc",
              "name": "Turret",
              "slot": "Torpedo"
           }
        ],
        "ship_image": "ships/Rebel Alliance/b-wing-v2.png",
        "key": "neraDantels"
     },
     "nienNunb": {
        "image": "pilots/Resistance/T-70 X-wing/nien-nunb.png",
        "text": "When you receive a stress token, if there is an enemy ship inside your firing arc at Range 1, you may discard that stress token.",
        "name": "Nien Nunb",
        "xws": "niennunb",
        "ship": "T-70 X-wing",
        "unique": true,
        "skill": 7,
        "points": 29,
        "faction": "Resistance",
        "slots": [
           "Astromech",
           "Elite",
           "Tech",
           "Torpedo"
        ],
        "id": 222,
        "ship_image": "ships/Resistance/t-70-x-wing-v2.png",
        "key": "nienNunb"
     },
     "nightBeast": {
        "name": "\"Night Beast\"",
        "id": 14,
        "unique": true,
        "ship": "TIE Fighter",
        "skill": 5,
        "points": 15,
        "slots": [],
        "text": "After executing a green maneuver, you may perform a free focus action.",
        "image": "pilots/Galactic Empire/TIE Fighter/night-beast.png",
        "faction": "Galactic Empire",
        "xws": "nightbeast",
        "key": "nightBeast"
     },
     "norraWexley": {
        "image": "pilots/Rebel Alliance/ARC-170/norra-wexley.png",
        "text": "When attacking or defending, you may spend a target lock you have on the enemy ship to add 1 [Focus] result to your roll.",
        "name": "Norra Wexley",
        "xws": "norrawexley",
        "ship": "ARC-170",
        "unique": true,
        "skill": 7,
        "points": 29,
        "faction": "Rebel Alliance",
        "slots": [
           "Astromech",
           "Crew",
           "Elite",
           "Torpedo"
        ],
        "id": 203,
        "key": "norraWexley"
     },
     "nuSquadronPilot": {
        "image": "pilots/Galactic Empire/Alpha-class Star Wing/nu-squadron-pilot.png",
        "name": "Nu Squadron Pilot",
        "xws": "nusquadronpilot",
        "ship": "Alpha-class Star Wing",
        "skill": 2,
        "points": 18,
        "faction": "Galactic Empire",
        "slots": [
           "Missile",
           "Torpedo"
        ],
        "id": 270,
        "key": "nuSquadronPilot"
     },
     "obsidianSquadronPilot": {
        "name": "Obsidian Squadron Pilot",
        "id": 11,
        "ship": "TIE Fighter",
        "skill": 3,
        "points": 13,
        "slots": [],
        "image": "pilots/Galactic Empire/TIE Fighter/obsidian-squadron-pilot.png",
        "faction": "Galactic Empire",
        "xws": "obsidiansquadronpilot",
        "key": "obsidianSquadronPilot"
     },
     "oldTeroch": {
        "image": "pilots/Scum and Villainy/Protectorate Starfighter/old-teroch.png",
        "text": "At the start of the Combat phase, you may choose 1 enemy ship at Range 1. If you are inside its firing arc, it discards all focus and evade tokens.",
        "name": "Old Teroch",
        "xws": "oldteroch",
        "ship": "Protectorate Starfighter",
        "unique": true,
        "skill": 7,
        "points": 26,
        "faction": "Scum and Villainy",
        "slots": [
           "Elite",
           "Torpedo"
        ],
        "id": 209,
        "key": "oldTeroch"
     },
     "omegaAce": {
        "name": "\"Omega Ace\"",
        "unique": true,
        "id": 150,
        "ship": "TIE/fo Fighter",
        "skill": 7,
        "points": 20,
        "slots": [
           "Elite",
           "Tech"
        ],
        "text": "When attacking, you may spend a focus token and a target lock you have on the defender to change all of your results to [Critical Hit] results.",
        "image": "pilots/First Order/TIE-fo Fighter/omega-ace.png",
        "faction": "First Order",
        "xws": "omegaace",
        "key": "omegaAce"
     },
     "omegaLeader": {
        "name": "\"Omega Leader\"",
        "unique": true,
        "id": 151,
        "ship": "TIE/fo Fighter",
        "skill": 8,
        "points": 21,
        "slots": [
           "Elite",
           "Tech"
        ],
        "text": "Enemy ships that you have locked cannot modify any dice when attacking you or defending against your attacks.",
        "image": "pilots/First Order/TIE-fo Fighter/omega-leader.png",
        "faction": "First Order",
        "xws": "omegaleader",
        "key": "omegaLeader"
     },
     "omegaSpecialist": {
        "name": "Omega Specialist",
        "xws": "omegaspecialist",
        "ship": "TIE/sf Fighter",
        "skill": 5,
        "points": 25,
        "faction": "First Order",
        "slots": [
           "Elite",
           "Missile",
           "System",
           "Tech"
        ],
        "id": 212,
        "image": "pilots/First Order/TIE-sf Fighter/omega-specialist.png",
        "key": "omegaSpecialist"
     },
     "omegaSquadronPilot": {
        "name": "Omega Squadron Pilot",
        "id": 154,
        "ship": "TIE/fo Fighter",
        "skill": 4,
        "points": 17,
        "slots": [
           "Elite",
           "Tech"
        ],
        "faction": "First Order",
        "image": "pilots/First Order/TIE-fo Fighter/omega-squadron-pilot.png",
        "xws": "omegasquadronpilot",
        "key": "omegaSquadronPilot"
     },
     "omicronGroupPilot": {
        "name": "Omicron Group Pilot",
        "id": 56,
        "ship": "Lambda-class Shuttle",
        "skill": 2,
        "points": 21,
        "slots": [
           "System",
           "Cannon",
           "Crew",
           "Crew"
        ],
        "image": "pilots/Galactic Empire/Lambda-class Shuttle/omicron-group-pilot.png",
        "faction": "Galactic Empire",
        "xws": "omicrongrouppilot",
        "key": "omicronGroupPilot"
     },
     "onyxSquadronEscort": {
        "image": "pilots/Galactic Empire/TIE Aggressor/onyx-squadron-escort.png",
        "name": "Onyx Squadron Escort",
        "xws": "onyxsquadronescort",
        "ship": "TIE Aggressor",
        "skill": 5,
        "points": 19,
        "faction": "Galactic Empire",
        "slots": [
           "Missile",
           "Missile",
           "Turret"
        ],
        "id": 250,
        "key": "onyxSquadronEscort"
     },
     "onyxSquadronPilot": {
        "name": "Onyx Squadron Pilot",
        "id": 68,
        "ship": "TIE Defender",
        "skill": 3,
        "points": 32,
        "slots": [
           "Cannon",
           "Missile"
        ],
        "image": "pilots/Galactic Empire/TIE Defender/onyx-squadron-pilot.png",
        "faction": "Galactic Empire",
        "xws": "onyxsquadronpilot",
        "key": "onyxSquadronPilot"
     },
     "outerRimSmuggler": {
        "name": "Outer Rim Smuggler",
        "id": 33,
        "ship": "YT-1300",
        "skill": 1,
        "points": 27,
        "slots": [
           "Crew",
           "Crew"
        ],
        "ship_override": {
           "attack": 2,
           "agility": 1,
           "hull": 6,
           "shields": 4
        },
        "image": "pilots/Rebel Alliance/YT-1300/outer-rim-smuggler.png",
        "faction": "Rebel Alliance",
        "xws": "outerrimsmuggler",
        "key": "outerRimSmuggler"
     },
     "palobGodalhi": {
        "name": "Palob Godalhi",
        "id": 115,
        "unique": true,
        "ship": "HWK-290",
        "skill": 5,
        "points": 20,
        "slots": [
           "Elite",
           "Turret",
           "Crew",
           "Illicit"
        ],
        "text": "At the start of the Combat phase, you may remove 1 focus or evade token from an enemy ship at Range 1-2 and assign it to yourself.",
        "image": "pilots/Scum and Villainy/HWK-290/palob-godalhi.png",
        "faction": "Scum and Villainy",
        "xws": "palobgodalhi",
        "key": "palobGodalhi"
     },
     "partisanRenegade": {
        "name": "Partisan Renegade",
        "xws": "partisanrenegade",
        "ship": "U-wing",
        "unique": false,
        "skill": 1,
        "points": 22,
        "faction": "Rebel Alliance",
        "slots": [
           "Crew",
           "Crew",
           "System",
           "Torpedo"
        ],
        "id": 295,
        "image": "pilots/Rebel Alliance/U-wing/partisan-renegade.png",
        "key": "partisanRenegade"
     },
     "patrolLeader": {
        "name": "Patrol Leader",
        "id": 95,
        "ship": "VT-49 Decimator",
        "skill": 3,
        "points": 40,
        "slots": [
           "Torpedo",
           "Crew",
           "Crew",
           "Crew",
           "Bomb"
        ],
        "faction": "Galactic Empire",
        "image": "pilots/Galactic Empire/VT-49 Decimator/patrol-leader.png",
        "xws": "patrolleader",
        "key": "patrolLeader"
     },
     "poeDameron": {
        "name": "Poe Dameron",
        "unique": true,
        "id": 156,
        "ship": "T-70 X-wing",
        "skill": 8,
        "points": 31,
        "slots": [
           "Elite",
           "Torpedo",
           "Astromech",
           "Tech"
        ],
        "text": "While attacking or defending, if you have a focus token, you may change 1 of your [Focus] results to a [Hit] or [Evade] result.",
        "image": "pilots/Resistance/T-70 X-wing/poe-dameron.png",
        "faction": "Resistance",
        "xws": "poedameron",
        "key": "poeDameron"
     },
     "poeDameron_hotr": {
        "image": "pilots/Resistance/T-70 X-wing/poe-dameron-hotr.png",
        "text": "While attacking or defending, if you have a focus token, you may change 1 of your [Focus] results to a [Hit] or [Evade] result.",
        "name": "Poe Dameron",
        "xws": "poedameron-swx57",
        "ship": "T-70 X-wing",
        "unique": true,
        "skill": 9,
        "points": 33,
        "faction": "Resistance",
        "slots": [
           "Elite",
           "Astromech",
           "Tech",
           "Torpedo"
        ],
        "id": 194,
        "ship_image": "ships/Resistance/t-70-x-wing-v2.png",
        "key": "poeDameron_hotr"
     },
     "princeXizor": {
        "name": "Prince Xizor",
        "id": 98,
        "unique": true,
        "ship": "StarViper",
        "skill": 7,
        "points": 31,
        "slots": [
           "Elite",
           "Torpedo"
        ],
        "text": "When defending, a friendly ship at Range 1 may suffer 1 uncanceled [Hit] or [Critical Hit] result instead of you.",
        "image": "pilots/Scum and Villainy/StarViper/prince-xizor.png",
        "faction": "Scum and Villainy",
        "xws": "princexizor",
        "key": "princeXizor"
     },
     "prototypePilot": {
        "name": "Prototype Pilot",
        "id": 32,
        "ship": "A-wing",
        "skill": 1,
        "points": 17,
        "slots": [
           "Missile"
        ],
        "image": "pilots/Rebel Alliance/A-wing/prototype-pilot.png",
        "faction": "Rebel Alliance",
        "xws": "prototypepilot",
        "ship_image": "ships/Rebel Alliance/a-wing-v2.png",
        "key": "prototypePilot"
     },
     "pureSabacc": {
        "image": "pilots/Galactic Empire/TIE Striker/pure-sabacc.png",
        "text": "When attacking, if you have 1 or fewer Damage cards, roll 1 additional attack die.",
        "name": "\"Pure Sabacc\"",
        "xws": "puresabacc",
        "ship": "TIE Striker",
        "unique": true,
        "skill": 6,
        "points": 22,
        "faction": "Galactic Empire",
        "slots": [
           "Elite"
        ],
        "id": 236,
        "key": "pureSabacc"
     },
     "quickdraw": {
        "text": "Once per round, when you lose a shield token, you may perform a primary weapon attack.",
        "name": "\"Quickdraw\"",
        "xws": "quickdraw",
        "ship": "TIE/sf Fighter",
        "unique": true,
        "skill": 9,
        "points": 29,
        "faction": "First Order",
        "slots": [
           "Elite",
           "Tech",
           "System",
           "Missile"
        ],
        "id": 199,
        "image": "pilots/First Order/TIE-sf Fighter/quickdraw.png",
        "key": "quickdraw"
     },
     "quinnJast": {
        "image": "pilots/Scum and Villainy/M3-A Interceptor/quinn-jast.png",
        "text": "At the start of the Combat phase, you may receive a weapons disabled token to flip one of your discarded [Torpedo] or [Missile] Upgrade cards faceup.",
        "name": "Quinn Jast",
        "xws": "quinnjast",
        "ship": "M3-A Interceptor",
        "unique": true,
        "skill": 6,
        "points": 18,
        "faction": "Scum and Villainy",
        "slots": [
           "Elite"
        ],
        "id": 245,
        "ship_image": "ships/Scum and Villainy/m3-a-interceptor-v2.png",
        "key": "quinnJast"
     },
     "raiderClassCorvetteAft": {
        "name": "Raider-class Corvette (Aft)",
        "id": 124,
        "ship": "Raider-class Corvette (Aft)",
        "skill": 4,
        "points": 50,
        "slots": [
           "Crew",
           "Crew",
           "Hardpoint",
           "Hardpoint",
           "Team",
           "Team",
           "Cargo"
        ],
        "faction": "Galactic Empire",
        "image": "pilots/Galactic Empire/Raider-class Corvette/raider-class-corv-aft.png",
        "xws": "raiderclasscorvetteaft",
        "key": "raiderClassCorvetteAft"
     },
     "raiderClassCorvetteFore": {
        "name": "Raider-class Corvette (Fore)",
        "id": 123,
        "ship": "Raider-class Corvette (Fore)",
        "skill": 4,
        "points": 50,
        "slots": [
           "Hardpoint",
           "Team",
           "Cargo"
        ],
        "range": "2-4",
        "text": "Once per round, after you perform a primary weapon attack, you may spend 2 energy to perform another primary weapon attack.",
        "faction": "Galactic Empire",
        "image": "pilots/Galactic Empire/Raider-class Corvette/raider-class-corv-fore.png",
        "xws": "raiderclasscorvettefore",
        "key": "raiderClassCorvetteFore"
     },
     "rearAdmiralChiraneau": {
        "name": "Rear Admiral Chiraneau",
        "id": 90,
        "unique": true,
        "ship": "VT-49 Decimator",
        "skill": 8,
        "points": 46,
        "slots": [
           "Elite",
           "Torpedo",
           "Crew",
           "Crew",
           "Crew",
           "Bomb"
        ],
        "text": "When attacking at Range 1-2, you may change one of your [Focus] results to a [Critical Hit] result.",
        "image": "pilots/Galactic Empire/VT-49 Decimator/rear-admiral-chiraneau.png",
        "faction": "Galactic Empire",
        "xws": "rearadmiralchiraneau",
        "key": "rearAdmiralChiraneau"
     },
     "rebelOperative": {
        "name": "Rebel Operative",
        "id": 45,
        "ship": "HWK-290",
        "skill": 2,
        "points": 16,
        "slots": [
           "Turret",
           "Crew"
        ],
        "image": "pilots/Rebel Alliance/HWK-290/rebel-operative.png",
        "faction": "Rebel Alliance",
        "xws": "rebeloperative",
        "key": "rebelOperative"
     },
     "redAce": {
        "name": "\"Red Ace\"",
        "unique": true,
        "id": 157,
        "ship": "T-70 X-wing",
        "skill": 6,
        "points": 29,
        "slots": [
           "Torpedo",
           "Astromech",
           "Tech"
        ],
        "text": "The first time you remove a shield token from your ship each round, assign 1 evade token to your ship.",
        "image": "pilots/Resistance/T-70 X-wing/red-ace.png",
        "faction": "Resistance",
        "xws": "redace",
        "key": "redAce"
     },
     "redSquadronPilot": {
        "name": "Red Squadron Pilot",
        "id": 2,
        "ship": "X-wing",
        "skill": 4,
        "points": 23,
        "slots": [
           "Torpedo",
           "Astromech"
        ],
        "image": "pilots/Rebel Alliance/X-wing/red-squadron-pilot.png",
        "faction": "Rebel Alliance",
        "xws": "redsquadronpilot",
        "key": "redSquadronPilot"
     },
     "redSquadronVeteran": {
        "name": "Red Squadron Veteran",
        "id": 158,
        "ship": "T-70 X-wing",
        "skill": 4,
        "points": 26,
        "slots": [
           "Elite",
           "Torpedo",
           "Astromech",
           "Tech"
        ],
        "image": "pilots/Resistance/T-70 X-wing/red-squadron-veteran.png",
        "faction": "Resistance",
        "xws": "redsquadronveteran",
        "key": "redSquadronVeteran"
     },
     "redline": {
        "name": "\"Redline\"",
        "id": 142,
        "unique": true,
        "ship": "TIE Punisher",
        "skill": 7,
        "points": 27,
        "slots": [
           "System",
           "Torpedo",
           "Torpedo",
           "Missile",
           "Missile",
           "Bomb",
           "Bomb"
        ],
        "text": "You may maintain 2 target locks on the same ship. When you acquire a target lock, you may acquire a second lock on that same ship.",
        "image": "pilots/Galactic Empire/TIE Punisher/redline.png",
        "faction": "Galactic Empire",
        "xws": "redline",
        "key": "redline"
     },
     "resistanceSympathizer": {
        "name": "Resistance Sympathizer",
        "xws": "resistancesympathizer",
        "ship": "YT-1300",
        "skill": 3,
        "points": 38,
        "faction": "Resistance",
        "slots": [
           "Crew",
           "Crew",
           "Missile"
        ],
        "id": 224,
        "image": "pilots/Resistance/YT-1300/resistance-sympathizer.png",
        "key": "resistanceSympathizer"
     },
     "rexlerBrath": {
        "name": "Rexler Brath",
        "id": 70,
        "unique": true,
        "ship": "TIE Defender",
        "skill": 8,
        "points": 37,
        "slots": [
           "Elite",
           "Cannon",
           "Missile"
        ],
        "text": "After you perform an attack that deals at least 1 Damage card to the defender, you may spend a focus token to flip those cards faceup.",
        "image": "pilots/Galactic Empire/TIE Defender/rexler-brath.png",
        "faction": "Galactic Empire",
        "xws": "rexlerbrath",
        "key": "rexlerBrath"
     },
     "rey": {
        "image": "pilots/Resistance/YT-1300/rey.png",
        "text": "When attacking or defending, if the enemy ship is inside your firing arc, you may reroll up to 2 of your blank results.",
        "name": "Rey",
        "xws": "rey",
        "ship": "YT-1300",
        "unique": true,
        "skill": 8,
        "points": 45,
        "faction": "Resistance",
        "slots": [
           "Crew",
           "Crew",
           "Elite",
           "Missile"
        ],
        "id": 195,
        "key": "rey"
     },
     "rhoSquadronVeteran": {
        "image": "pilots/Galactic Empire/Alpha-class Star Wing/rho-squadron-veteran.png",
        "name": "Rho Squadron Veteran",
        "xws": "rhosquadronveteran",
        "ship": "Alpha-class Star Wing",
        "skill": 4,
        "points": 21,
        "faction": "Galactic Empire",
        "slots": [
           "Elite",
           "Missile",
           "Torpedo"
        ],
        "id": 271,
        "key": "rhoSquadronVeteran"
     },
     "roarkGarnet": {
        "name": "Roark Garnet",
        "id": 46,
        "unique": true,
        "ship": "HWK-290",
        "skill": 4,
        "points": 19,
        "slots": [
           "Turret",
           "Crew"
        ],
        "text": "At the start of the Combat phase, choose 1 other friendly ship at Range 1-3.  Until the end of the phase, treat that ship's pilot skill value as \"12.\"",
        "image": "pilots/Rebel Alliance/HWK-290/roark-garnet.png",
        "faction": "Rebel Alliance",
        "xws": "roarkgarnet",
        "key": "roarkGarnet"
     },
     "rookiePilot": {
        "name": "Rookie Pilot",
        "id": 3,
        "ship": "X-wing",
        "skill": 2,
        "points": 21,
        "slots": [
           "Torpedo",
           "Astromech"
        ],
        "image": "pilots/Rebel Alliance/X-wing/rookie-pilot.png",
        "faction": "Rebel Alliance",
        "xws": "rookiepilot",
        "key": "rookiePilot"
     },
     "royalGuardPilot": {
        "name": "Royal Guard Pilot",
        "id": 58,
        "ship": "TIE Interceptor",
        "skill": 6,
        "points": 22,
        "slots": [
           "Elite"
        ],
        "image": "pilots/Galactic Empire/TIE Interceptor/royal-guard-pilot.png",
        "faction": "Galactic Empire",
        "xws": "royalguardpilot",
        "ship_image": "ships/Galactic Empire/tie-interceptor-v3.png",
        "key": "royalGuardPilot"
     },
     "ruthlessFreelancer": {
        "name": "Ruthless Freelancer",
        "xws": "ruthlessfreelancer",
        "ship": "G-1A Starfighter",
        "skill": 3,
        "points": 23,
        "faction": "Scum and Villainy",
        "slots": [
           "Illicit",
           "Crew",
           "System"
        ],
        "id": 189,
        "image": "pilots/Scum and Villainy/G-1A Starfighter/ruthless-freelancer.png",
        "key": "ruthlessFreelancer"
     },
     "saberSquadronPilot": {
        "name": "Saber Squadron Pilot",
        "id": 25,
        "ship": "TIE Interceptor",
        "skill": 4,
        "points": 21,
        "slots": [
           "Elite"
        ],
        "image": "pilots/Galactic Empire/TIE Interceptor/saber-squadron-pilot.png",
        "faction": "Galactic Empire",
        "xws": "sabersquadronpilot",
        "ship_image": "ships/Galactic Empire/tie-interceptor-v2.png",
        "key": "saberSquadronPilot"
     },
     "sabineWren_attackShuttle": {
        "image": "pilots/Rebel Alliance/Attack Shuttle/sabine-wren.png",
        "text": "Immediately before you reveal your maneuver, you may perform a free boost or barrel roll action.",
        "name": "Sabine Wren",
        "ship": "Attack Shuttle",
        "unique": true,
        "skill": 5,
        "points": 21,
        "faction": "Rebel Alliance",
        "slots": [
           "Turret",
           "Crew",
           "Elite"
        ],
        "id": 175,
        "xws": "sabinewren",
        "key": "sabineWren_attackShuttle"
     },
     "sabineWren_lancerClassPursuitCraft": {
        "name": "Sabine Wren",
        "xws": "sabinewren",
        "text": "When defending against an enemy ship inside your mobile firing arc at Range 1-2, you may add 1 [Focus] result to your roll.",
        "image": "pilots/Scum and Villainy/Lancer-class Pursuit Craft/sabine-wren.png",
        "ship": "Lancer-class Pursuit Craft",
        "unique": true,
        "skill": 5,
        "points": 35,
        "faction": "Scum and Villainy",
        "slots": [
           "Crew",
           "Illicit",
           "Illicit"
        ],
        "id": 198,
        "key": "sabineWren_lancerClassPursuitCraft"
     },
     "sabineWren_tieFighter": {
        "image": "pilots/Rebel Alliance/TIE Fighter/sabine-wren.png",
        "text": "Immediately before you reveal your maneuver, you may perform a free boost or barrel roll action.",
        "name": "Sabine Wren",
        "xws": "sabinewren",
        "ship": "TIE Fighter",
        "unique": true,
        "skill": 5,
        "points": 15,
        "faction": "Rebel Alliance",
        "slots": [
           "Elite"
        ],
        "id": 214,
        "key": "sabineWren_tieFighter"
     },
     "sarcoPlank": {
        "text": "When defending, instead of using your agility value, you may roll a number of defense dice equal to the speed of the maneuver you executed this round.",
        "name": "Sarco Plank",
        "xws": "sarcoplank",
        "ship": "Quadjumper",
        "unique": true,
        "skill": 5,
        "points": 18,
        "faction": "Scum and Villainy",
        "slots": [
           "Crew",
           "Elite",
           "Bomb",
           "Illicit",
           "Tech"
        ],
        "id": 242,
        "image": "pilots/Scum and Villainy/Quadjumper/sarco-plank.png",
        "key": "sarcoPlank"
     },
     "sawGerrera": {
        "image": "pilots/Rebel Alliance/U-wing/saw-gerrera.png",
        "text": "When a friendly ship at Range 1-2 attacks, if it is stressed or has at least 1 Damage card, it may reroll 1 attack die.",
        "name": "Saw Gerrera",
        "xws": "sawgerrera",
        "ship": "U-wing",
        "unique": true,
        "skill": 6,
        "points": 26,
        "faction": "Rebel Alliance",
        "slots": [
           "Crew",
           "Crew",
           "Elite",
           "System",
           "Torpedo"
        ],
        "id": 287,
        "key": "sawGerrera"
     },
     "scarifBasePilot": {
        "image": "pilots/Galactic Empire/TIE Reaper/scarif-base-pilot.png",
        "name": "Scarif Base Pilot",
        "xws": "scarifbasepilot",
        "ship": "TIE Reaper",
        "skill": 1,
        "points": 22,
        "faction": "Galactic Empire",
        "slots": [
           "Crew",
           "Crew"
        ],
        "id": 291,
        "key": "scarifBasePilot"
     },
     "scarifDefender": {
        "name": "Scarif Defender",
        "xws": "scarifdefender",
        "ship": "TIE Striker",
        "skill": 3,
        "points": 18,
        "faction": "Galactic Empire",
        "slots": [],
        "id": 240,
        "image": "pilots/Galactic Empire/TIE Striker/scarif-defender.png",
        "key": "scarifDefender"
     },
     "scimitarSquadronPilot": {
        "name": "Scimitar Squadron Pilot",
        "id": 49,
        "ship": "TIE Bomber",
        "skill": 2,
        "points": 16,
        "slots": [
           "Torpedo",
           "Torpedo",
           "Missile",
           "Missile",
           "Bomb"
        ],
        "image": "pilots/Galactic Empire/TIE Bomber/scimitar-squadron-pilot.png",
        "faction": "Galactic Empire",
        "xws": "scimitarsquadronpilot",
        "key": "scimitarSquadronPilot"
     },
     "scourge": {
        "image": "pilots/Galactic Empire/TIE Fighter/scourge.png",
        "text": "When attacking a defender that has 1 or more Damage cards, roll 1 additional attack die.",
        "name": "\"Scourge\"",
        "ship": "TIE Fighter",
        "unique": true,
        "skill": 7,
        "points": 17,
        "faction": "Galactic Empire",
        "slots": [
           "Elite"
        ],
        "id": 165,
        "xws": "scourge",
        "key": "scourge"
     },
     "serissu": {
        "name": "Serissu",
        "id": 102,
        "unique": true,
        "ship": "M3-A Interceptor",
        "skill": 8,
        "points": 20,
        "slots": [
           "Elite"
        ],
        "text": "When another friendly ship at Range 1 is defending it may reroll 1 defense die.",
        "faction": "Scum and Villainy",
        "image": "pilots/Scum and Villainy/M3-A Interceptor/serissu.png",
        "xws": "serissu",
        "key": "serissu"
     },
     "shadowSquadronPilot": {
        "name": "Shadow Squadron Pilot",
        "id": 76,
        "ship": "TIE Phantom",
        "skill": 5,
        "points": 27,
        "slots": [
           "System",
           "Crew"
        ],
        "image": "pilots/Galactic Empire/TIE Phantom/shadow-squadron-pilot.png",
        "faction": "Galactic Empire",
        "xws": "shadowsquadronpilot",
        "key": "shadowSquadronPilot"
     },
     "shadowportHunter": {
        "name": "Shadowport Hunter",
        "xws": "shadowporthunter",
        "ship": "Lancer-class Pursuit Craft",
        "skill": 2,
        "points": 33,
        "faction": "Scum and Villainy",
        "slots": [
           "Crew",
           "Illicit",
           "Illicit"
        ],
        "id": 213,
        "image": "pilots/Scum and Villainy/Lancer-class Pursuit Craft/shadowport-hunter.png",
        "key": "shadowportHunter"
     },
     "sharaBey": {
        "image": "pilots/Rebel Alliance/ARC-170/shara-bey.png",
        "text": "When another friendly ship at Range 1-2 is attacking, it may treat your blue target lock tokens as its own.",
        "name": "Shara Bey",
        "xws": "sharabey",
        "ship": "ARC-170",
        "unique": true,
        "skill": 6,
        "points": 28,
        "faction": "Rebel Alliance",
        "slots": [
           "Crew",
           "Elite",
           "Torpedo",
           "Astromech"
        ],
        "id": 196,
        "key": "sharaBey"
     },
     "sienarJaemusAnalyst": {
        "name": "Sienar-Jaemus Analyst",
        "xws": "sienarjaemusanalyst",
        "ship": "TIE Silencer",
        "skill": 4,
        "points": 26,
        "faction": "First Order",
        "slots": [
           "System",
           "Tech"
        ],
        "id": 283,
        "image": "pilots/First Order/TIE Silencer/sienar-jaemus-analyst.png",
        "key": "sienarJaemusAnalyst"
     },
     "sienarSpecialist": {
        "name": "Sienar Specialist",
        "xws": "sienarspecialist",
        "ship": "TIE Aggressor",
        "skill": 2,
        "points": 17,
        "faction": "Galactic Empire",
        "slots": [
           "Missile",
           "Missile",
           "Turret"
        ],
        "id": 248,
        "image": "pilots/Galactic Empire/TIE Aggressor/sienar-specialist.png",
        "key": "sienarSpecialist"
     },
     "sienarTestPilot": {
        "image": "pilots/Galactic Empire/TIE Adv. Prototype/sienar-test-pilot.png",
        "name": "Sienar Test Pilot",
        "ship": "TIE Adv. Prototype",
        "skill": 2,
        "points": 16,
        "faction": "Galactic Empire",
        "slots": [
           "Missile"
        ],
        "id": 181,
        "xws": "sienartestpilot",
        "key": "sienarTestPilot"
     },
     "sigmaSquadronPilot": {
        "name": "Sigma Squadron Pilot",
        "id": 75,
        "ship": "TIE Phantom",
        "skill": 3,
        "points": 25,
        "slots": [
           "System",
           "Crew"
        ],
        "image": "pilots/Galactic Empire/TIE Phantom/sigma-squadron-pilot.png",
        "faction": "Galactic Empire",
        "xws": "sigmasquadronpilot",
        "key": "sigmaSquadronPilot"
     },
     "snapWexley": {
        "image": "pilots/Resistance/T-70 X-wing/snap-wexley.png",
        "text": "After you execute a 2-, 3-, or 4-speed maneuver, if you are not touching a ship, you may perform a free boost action.",
        "name": "\"Snap\" Wexley",
        "xws": "snapwexley",
        "ship": "T-70 X-wing",
        "unique": true,
        "skill": 6,
        "points": 28,
        "faction": "Resistance",
        "slots": [
           "Astromech",
           "Elite",
           "Tech",
           "Torpedo"
        ],
        "id": 223,
        "ship_image": "ships/Resistance/t-70-x-wing-v2.png",
        "key": "snapWexley"
     },
     "solSixxa": {
        "image": "pilots/Scum and Villainy/Scurrg H-6 Bomber/sol-sixxa.png",
        "text": "When dropping a bomb, you may use the ([Turn Left] 1) or ([Turn Right] 1) template instead of the ([Straight] 1) template.",
        "name": "Sol Sixxa",
        "xws": "solsixxa",
        "ship": "Scurrg H-6 Bomber",
        "unique": true,
        "skill": 6,
        "points": 28,
        "faction": "Scum and Villainy",
        "slots": [
           "Bomb",
           "Bomb",
           "Crew",
           "Elite",
           "Missile",
           "Torpedo",
           "Turret"
        ],
        "id": 258,
        "key": "solSixxa"
     },
     "soontirFel": {
        "name": "Soontir Fel",
        "id": 28,
        "unique": true,
        "ship": "TIE Interceptor",
        "skill": 9,
        "points": 27,
        "slots": [
           "Elite"
        ],
        "text": "When you receive a stress token, you may assign 1 focus token to your ship.",
        "image": "pilots/Galactic Empire/TIE Interceptor/soontir-fel.png",
        "faction": "Galactic Empire",
        "xws": "soontirfel",
        "ship_image": "ships/Galactic Empire/tie-interceptor-v2.png",
        "key": "soontirFel"
     },
     "spiceRunner": {
        "name": "Spice Runner",
        "id": 127,
        "ship": "HWK-290",
        "skill": 1,
        "points": 16,
        "slots": [
           "Turret",
           "Crew",
           "Illicit"
        ],
        "faction": "Scum and Villainy",
        "image": "pilots/Scum and Villainy/HWK-290/spice-runner.png",
        "xws": "spicerunner",
        "key": "spiceRunner"
     },
     "starkillerBasePilot": {
        "image": "pilots/First Order/Upsilon-class Shuttle/starkiller-base-pilot.png",
        "name": "Starkiller Base Pilot",
        "xws": "starkillerbasepilot",
        "ship": "Upsilon-class Shuttle",
        "skill": 2,
        "points": 30,
        "slots": [
           "Crew",
           "Crew",
           "System",
           "Tech",
           "Tech"
        ],
        "id": 230,
        "faction": "First Order",
        "key": "starkillerBasePilot"
     },
     "stormSquadronPilot": {
        "name": "Storm Squadron Pilot",
        "id": 21,
        "ship": "TIE Advanced",
        "skill": 4,
        "points": 23,
        "slots": [
           "Missile"
        ],
        "image": "pilots/Galactic Empire/TIE Advanced/storm-squadron-pilot.png",
        "faction": "Galactic Empire",
        "xws": "stormsquadronpilot",
        "key": "stormSquadronPilot"
     },
     "sunnyBounder": {
        "image": "pilots/Scum and Villainy/M3-A Interceptor/sunny-bounder.png",
        "text": "Once per round, after you roll or reroll dice, if you have the same result on each of your dice, you may add 1 matching result.",
        "name": "Sunny Bounder",
        "xws": "sunnybounder",
        "ship": "M3-A Interceptor",
        "unique": true,
        "skill": 1,
        "points": 14,
        "faction": "Scum and Villainy",
        "slots": [],
        "id": 246,
        "ship_image": "ships/Scum and Villainy/m3-a-interceptor-v2.png",
        "key": "sunnyBounder"
     },
     "syndicateThug": {
        "name": "Syndicate Thug",
        "id": 112,
        "ship": "Y-wing",
        "skill": 2,
        "points": 18,
        "slots": [
           "Turret",
           "Torpedo",
           "Torpedo",
           "Salvaged Astromech"
        ],
        "faction": "Scum and Villainy",
        "image": "pilots/Scum and Villainy/Y-wing/syndicate-thug.png",
        "xws": "syndicatethug",
        "key": "syndicateThug"
     },
     "talaSquadronPilot": {
        "name": "Tala Squadron Pilot",
        "id": 64,
        "ship": "Z-95 Headhunter",
        "skill": 4,
        "points": 13,
        "slots": [
           "Missile"
        ],
        "image": "pilots/Rebel Alliance/Z-95 Headhunter/tala-squadron-pilot.png",
        "faction": "Rebel Alliance",
        "xws": "talasquadronpilot",
        "key": "talaSquadronPilot"
     },
     "talonbaneCobra": {
        "name": "Talonbane Cobra",
        "id": 138,
        "unique": true,
        "ship": "Kihraxz Fighter",
        "skill": 9,
        "points": 28,
        "slots": [
           "Elite",
           "Missile",
           "Illicit"
        ],
        "text": "When attacking or defending, double the effect of your range combat bonuses.",
        "image": "pilots/Scum and Villainy/Kihraxz Fighter/talonbane-cobra.png",
        "faction": "Scum and Villainy",
        "xws": "talonbanecobra",
        "key": "talonbaneCobra"
     },
     "tansariiPointVeteran": {
        "name": "Tansarii Point Veteran",
        "id": 125,
        "ship": "M3-A Interceptor",
        "skill": 5,
        "points": 17,
        "slots": [
           "Elite"
        ],
        "faction": "Scum and Villainy",
        "image": "pilots/Scum and Villainy/M3-A Interceptor/tansarii-point-veteran.png",
        "xws": "tansariipointveteran",
        "key": "tansariiPointVeteran"
     },
     "tarnMison": {
        "name": "Tarn Mison",
        "id": 84,
        "unique": true,
        "ship": "X-wing",
        "skill": 3,
        "points": 23,
        "slots": [
           "Torpedo",
           "Astromech"
        ],
        "text": "When an enemy ship declares you as the target of an attack, you may acquire a target lock on that ship.",
        "image": "pilots/Rebel Alliance/X-wing/tarn-mison.png",
        "faction": "Rebel Alliance",
        "xws": "tarnmison",
        "key": "tarnMison"
     },
     "telTrevura": {
        "image": "pilots/Scum and Villainy/JumpMaster 5000/tel-trevura.png",
        "text": "The first time you would be destroyed, instead cancel any remaining damage, discard all Damage cards, and deal 4 facedown Damage cards to this ship.",
        "name": "Tel Trevura",
        "xws": "teltrevura",
        "ship": "JumpMaster 5000",
        "unique": true,
        "skill": 7,
        "points": 30,
        "faction": "Scum and Villainy",
        "slots": [
           "Crew",
           "Elite",
           "Illicit"
        ],
        "id": 185,
        "key": "telTrevura"
     },
     "tempestSquadronPilot": {
        "name": "Tempest Squadron Pilot",
        "id": 20,
        "ship": "TIE Advanced",
        "skill": 2,
        "points": 21,
        "slots": [
           "Missile"
        ],
        "image": "pilots/Galactic Empire/TIE Advanced/tempest-squadron-pilot.png",
        "faction": "Galactic Empire",
        "xws": "tempestsquadronpilot",
        "key": "tempestSquadronPilot"
     },
     "tenNumb": {
        "name": "Ten Numb",
        "id": 41,
        "unique": true,
        "ship": "B-wing",
        "skill": 8,
        "points": 31,
        "slots": [
           "Elite",
           "System",
           "Cannon",
           "Torpedo",
           "Torpedo"
        ],
        "text": "When attacking, 1 of your [Critical Hit] results cannot be canceled by defense dice.",
        "image": "pilots/Rebel Alliance/B-wing/ten-numb.png",
        "faction": "Rebel Alliance",
        "xws": "tennumb",
        "key": "tenNumb"
     },
     "testPilotBlackout": {
        "image": "pilots/First Order/TIE Silencer/test-pilot-blackout.png",
        "text": "When attacking, if the attack is obstructed, the defender rolls 2 fewer defense dice (to a minimum of 0).",
        "name": "Test Pilot \"Blackout\"",
        "xws": "testpilotblackout",
        "ship": "TIE Silencer",
        "unique": true,
        "skill": 7,
        "points": 31,
        "faction": "First Order",
        "slots": [
           "Elite",
           "System",
           "Tech"
        ],
        "id": 281,
        "key": "testPilotBlackout"
     },
     "tetranCowall": {
        "name": "Tetran Cowall",
        "id": 59,
        "unique": true,
        "ship": "TIE Interceptor",
        "skill": 7,
        "points": 24,
        "slots": [
           "Elite"
        ],
        "text": "When you reveal a [Koiogran Turn] maneuver, you may treat the speed of that maneuver as \"1,\" \"3,\" or \"5\".",
        "image": "pilots/Galactic Empire/TIE Interceptor/tetran-cowall.png",
        "faction": "Galactic Empire",
        "xws": "tetrancowall",
        "ship_image": "ships/Galactic Empire/tie-interceptor-v2.png",
        "key": "tetranCowall"
     },
     "thaneKyrell": {
        "image": "pilots/Rebel Alliance/ARC-170/thane-kyrell.png",
        "text": "After an enemy ship inside your firing arc at Range 1-3 attacks another friendly ship, you may perform a free action.",
        "name": "Thane Kyrell",
        "xws": "thanekyrell",
        "ship": "ARC-170",
        "unique": true,
        "skill": 4,
        "points": 26,
        "faction": "Rebel Alliance",
        "slots": [
           "Astromech",
           "Crew",
           "Torpedo"
        ],
        "id": 202,
        "key": "thaneKyrell"
     },
     "theInquisitor": {
        "image": "pilots/Galactic Empire/TIE Adv. Prototype/the-inquisitor.png",
        "text": "When attacking with your primary weapon at Range 2-3, treat the range of the attack as Range 1.",
        "name": "The Inquisitor",
        "ship": "TIE Adv. Prototype",
        "unique": true,
        "skill": 8,
        "points": 25,
        "faction": "Galactic Empire",
        "slots": [
           "Elite",
           "Missile"
        ],
        "id": 163,
        "xws": "theinquisitor",
        "key": "theInquisitor"
     },
     "thweek": {
        "image": "pilots/Scum and Villainy/StarViper/thweek.png",
        "text": "During setup, before the \"Place Forces\" step, you may choose 1 enemy ship and assign the \"Shadowed\" or \"Mimicked\" Condition card to it.",
        "name": "Thweek",
        "xws": "thweek",
        "ship": "StarViper",
        "unique": true,
        "skill": 4,
        "points": 28,
        "faction": "Scum and Villainy",
        "slots": [
           "Torpedo"
        ],
        "id": 263,
        "conditions": [
           "Mimicked",
           "Shadowed"
        ],
        "ship_image": "ships/Scum and Villainy/starviper-v2.png",
        "key": "thweek"
     },
     "tomaxBren": {
        "name": "Tomax Bren",
        "text": "Once per round, after you discard an [Elite] Upgrade card, flip that card faceup.",
        "ship": "TIE Bomber",
        "unique": true,
        "skill": 8,
        "points": 24,
        "faction": "Galactic Empire",
        "slots": [
           "Bomb",
           "Elite",
           "Torpedo",
           "Torpedo",
           "Missile",
           "Missile"
        ],
        "id": 177,
        "xws": "tomaxbren",
        "image": "pilots/Galactic Empire/TIE Bomber/tomax-bren.png",
        "ship_image": "ships/Galactic Empire/tie-bomber-v2.png",
        "key": "tomaxBren"
     },
     "toraniKulda": {
        "text": "After you perform an attack, each enemy ship inside your bullseye firing arc at Range 1-3 must choose to suffer 1 damage or remove all of its focus and evade tokens.",
        "name": "Torani Kulda",
        "xws": "toranikulda",
        "ship": "M12-L Kimogila Fighter",
        "unique": true,
        "skill": 8,
        "points": 27,
        "faction": "Scum and Villainy",
        "slots": [
           "Elite",
           "Illicit",
           "Missile",
           "Salvaged Astromech",
           "Torpedo"
        ],
        "id": 266,
        "image": "pilots/Scum and Villainy/M12-L Kimogila Fighter/torani-kulda.png",
        "key": "toraniKulda"
     },
     "torkilMux": {
        "name": "Torkil Mux",
        "id": 116,
        "unique": true,
        "ship": "HWK-290",
        "skill": 3,
        "points": 19,
        "slots": [
           "Turret",
           "Crew",
           "Illicit"
        ],
        "text": "At the end of the Activation phase, choose 1 enemy ship at Range 1-2. Until the end of the Combat phase, treat that ship's pilot skill value as \"0\".",
        "image": "pilots/Scum and Villainy/HWK-290/torkil-mux.png",
        "faction": "Scum and Villainy",
        "xws": "torkilmux",
        "key": "torkilMux"
     },
     "trandoshanSlaver": {
        "name": "Trandoshan Slaver",
        "id": 131,
        "ship": "YV-666",
        "skill": 2,
        "points": 29,
        "slots": [
           "Cannon",
           "Missile",
           "Crew",
           "Crew",
           "Crew",
           "Illicit"
        ],
        "image": "pilots/Scum and Villainy/YV-666/trandoshan-slaver.png",
        "faction": "Scum and Villainy",
        "xws": "trandoshanslaver",
        "key": "trandoshanSlaver"
     },
     "turrPhennir": {
        "name": "Turr Phennir",
        "id": 27,
        "unique": true,
        "ship": "TIE Interceptor",
        "skill": 7,
        "points": 25,
        "slots": [
           "Elite"
        ],
        "text": "After you perform an attack, you may perform a free boost or barrel roll action.",
        "image": "pilots/Galactic Empire/TIE Interceptor/turr-phennir.png",
        "faction": "Galactic Empire",
        "xws": "turrphennir",
        "ship_image": "ships/Galactic Empire/tie-interceptor-v2.png",
        "key": "turrPhennir"
     },
     "tychoCelchu": {
        "name": "Tycho Celchu",
        "id": 29,
        "unique": true,
        "ship": "A-wing",
        "skill": 8,
        "points": 26,
        "slots": [
           "Elite",
           "Missile"
        ],
        "text": "You may perform actions even while you have stress tokens.",
        "image": "pilots/Rebel Alliance/A-wing/tycho-celchu.png",
        "faction": "Rebel Alliance",
        "xws": "tychocelchu",
        "key": "tychoCelchu"
     },
     "unkarPlutt": {
        "text": "At the end of the Activation phase, you <strong>must</strong> assign a tractor beam token to each ship you are touching.",
        "name": "Unkar Plutt",
        "xws": "unkarplutt",
        "ship": "Quadjumper",
        "unique": true,
        "skill": 3,
        "points": 17,
        "faction": "Scum and Villainy",
        "slots": [
           "Bomb",
           "Crew",
           "Illicit",
           "Tech"
        ],
        "id": 216,
        "image": "pilots/Scum and Villainy/Quadjumper/unkar-plutt.png",
        "key": "unkarPlutt"
     },
     "valenRudor": {
        "image": "pilots/Galactic Empire/TIE Adv. Prototype/valen-rudor.png",
        "text": "After defending, you may perform a free action.",
        "name": "Valen Rudor",
        "ship": "TIE Adv. Prototype",
        "unique": true,
        "skill": 6,
        "points": 22,
        "faction": "Galactic Empire",
        "slots": [
           "Elite",
           "Missile"
        ],
        "id": 180,
        "xws": "valenrudor",
        "key": "valenRudor"
     },
     "viktorHel": {
        "image": "pilots/Scum and Villainy/Kihraxz Fighter/viktor-hel.png",
        "text": "After defending, if you did not roll exactly 2 defense dice, the attacker receives 1 stress token.",
        "name": "Viktor Hel",
        "xws": "viktorhel",
        "ship": "Kihraxz Fighter",
        "unique": true,
        "skill": 7,
        "points": 25,
        "faction": "Scum and Villainy",
        "slots": [
           "Elite",
           "Missile",
           "Illicit"
        ],
        "id": 253,
        "ship_image": "ships/Scum and Villainy/kihraxz-fighter-v2.png",
        "key": "viktorHel"
     },
     "vizier": {
        "image": "pilots/Galactic Empire/TIE Reaper/vizier.png",
        "text": "After a friendly ship executes a 1-speed maneuver, if it is at Range 1 and did not overlap a ship, you may assign 1 of your focus or evade tokens to it.",
        "name": "\"Vizier\"",
        "xws": "vizier",
        "ship": "TIE Reaper",
        "unique": true,
        "skill": 3,
        "points": 23,
        "slots": [
           "Crew",
           "Crew"
        ],
        "id": 292,
        "faction": "Galactic Empire",
        "key": "vizier"
     },
     "wampa": {
        "image": "pilots/Galactic Empire/TIE Fighter/wampa.png",
        "name": "\"Wampa\"",
        "text": "When attacking, you may cancel all dice results. If you cancel a [Critical Hit] result, deal 1 facedown Damage card to the defender.",
        "ship": "TIE Fighter",
        "unique": true,
        "skill": 4,
        "points": 14,
        "faction": "Galactic Empire",
        "slots": [],
        "id": 166,
        "xws": "wampa",
        "key": "wampa"
     },
     "wardenSquadronPilot": {
        "name": "Warden Squadron Pilot",
        "id": 139,
        "ship": "K-wing",
        "skill": 2,
        "points": 23,
        "slots": [
           "Turret",
           "Torpedo",
           "Torpedo",
           "Missile",
           "Crew",
           "Bomb",
           "Bomb"
        ],
        "image": "pilots/Rebel Alliance/K-wing/warden-squadron-pilot.png",
        "faction": "Rebel Alliance",
        "xws": "wardensquadronpilot",
        "key": "wardenSquadronPilot"
     },
     "wedgeAntilles": {
        "name": "Wedge Antilles",
        "id": 0,
        "unique": true,
        "ship": "X-wing",
        "skill": 9,
        "points": 29,
        "slots": [
           "Elite",
           "Torpedo",
           "Astromech"
        ],
        "text": "When attacking, reduce the defender's agility value by 1 (to a minimum of \"0\").",
        "image": "pilots/Rebel Alliance/X-wing/wedge-antilles.png",
        "faction": "Rebel Alliance",
        "xws": "wedgeantilles",
        "key": "wedgeAntilles"
     },
     "wesJanson": {
        "name": "Wes Janson",
        "id": 81,
        "unique": true,
        "ship": "X-wing",
        "skill": 8,
        "points": 29,
        "slots": [
           "Elite",
           "Torpedo",
           "Astromech"
        ],
        "text": "After you perform an attack, you may remove 1 focus, evade, or blue target lock token from the defender.",
        "image": "pilots/Rebel Alliance/X-wing/wes-janson.png",
        "faction": "Rebel Alliance",
        "xws": "wesjanson",
        "key": "wesJanson"
     },
     "whisper": {
        "name": "\"Whisper\"",
        "id": 78,
        "unique": true,
        "ship": "TIE Phantom",
        "skill": 7,
        "points": 32,
        "slots": [
           "Elite",
           "System",
           "Crew"
        ],
        "text": "After you perform an attack that hits, you may assign 1 focus token to your ship.",
        "image": "pilots/Galactic Empire/TIE Phantom/whisper.png",
        "faction": "Galactic Empire",
        "xws": "whisper",
        "key": "whisper"
     },
     "wildSpaceFringer": {
        "name": "Wild Space Fringer",
        "id": 96,
        "ship": "YT-2400",
        "skill": 2,
        "points": 30,
        "slots": [
           "Cannon",
           "Missile",
           "Crew"
        ],
        "faction": "Rebel Alliance",
        "image": "pilots/Rebel Alliance/YT-2400/wild-space-fringer.png",
        "xws": "wildspacefringer",
        "key": "wildSpaceFringer"
     },
     "wingedGundark": {
        "name": "\"Winged Gundark\"",
        "id": 13,
        "unique": true,
        "ship": "TIE Fighter",
        "skill": 5,
        "points": 15,
        "slots": [],
        "text": "When attacking at Range 1, you may change 1 of your [Hit] results to a [Critical Hit] result.",
        "image": "pilots/Galactic Empire/TIE Fighter/winged-gundark.png",
        "faction": "Galactic Empire",
        "xws": "wingedgundark",
        "key": "wingedGundark"
     },
     "wookieeLiberator": {
        "image": "pilots/Rebel Alliance/Auzituck Gunship/wookiee-liberator.png",
        "name": "Wookiee Liberator",
        "xws": "wookieeliberator",
        "ship": "Auzituck Gunship",
        "skill": 3,
        "points": 26,
        "faction": "Rebel Alliance",
        "slots": [
           "Crew",
           "Crew",
           "Elite"
        ],
        "id": 259,
        "key": "wookieeLiberator"
     },
     "wullffwarro": {
        "image": "pilots/Rebel Alliance/Auzituck Gunship/wullffwarro.png",
        "text": "When attacking, if you have no shields and at least 1 Damage card assigned to you, roll 1 additional attack die.",
        "name": "Wullffwarro",
        "xws": "wullffwarro",
        "ship": "Auzituck Gunship",
        "unique": true,
        "skill": 7,
        "points": 30,
        "faction": "Rebel Alliance",
        "slots": [
           "Crew",
           "Crew",
           "Elite"
        ],
        "id": 255,
        "key": "wullffwarro"
     },
     "youngster": {
        "image": "pilots/Galactic Empire/TIE Fighter/youngster.png",
        "text": "Friendly TIE fighters at Range 1-3 may perform the action on your equipped [Elite] Upgrade card.",
        "name": "\"Youngster\"",
        "ship": "TIE Fighter",
        "unique": true,
        "skill": 6,
        "points": 15,
        "faction": "Galactic Empire",
        "slots": [
           "Elite"
        ],
        "id": 167,
        "xws": "youngster",
        "key": "youngster"
     },
     "zealousRecruit": {
        "image": "pilots/Scum and Villainy/Protectorate Starfighter/zealous-recruit.png",
        "name": "Zealous Recruit",
        "xws": "zealousrecruit",
        "ship": "Protectorate Starfighter",
        "skill": 1,
        "points": 20,
        "faction": "Scum and Villainy",
        "slots": [
           "Torpedo"
        ],
        "id": 210,
        "key": "zealousRecruit"
     },
     "zebOrrelios_attackShuttle": {
        "image": "pilots/Rebel Alliance/Attack Shuttle/zeb-orrelios.png",
        "text": "When defending, you may cancel [Critical Hit] results before [Hit] results.",
        "name": "\"Zeb\" Orrelios",
        "ship": "Attack Shuttle",
        "unique": true,
        "skill": 3,
        "points": 18,
        "faction": "Rebel Alliance",
        "slots": [
           "Crew",
           "Turret"
        ],
        "id": 176,
        "xws": "zeborrelios",
        "key": "zebOrrelios_attackShuttle"
     },
     "zebOrrelios_sheathipedeClassShuttle": {
        "image": "pilots/Rebel Alliance/Sheathipede-class Shuttle/zeb-orrelios.png",
        "text": "When defending, you may cancel [Critical Hit] results before [Hit] results.",
        "name": "\"Zeb\" Orrelios",
        "xws": "zeborrelios",
        "ship": "Sheathipede-class Shuttle",
        "unique": true,
        "skill": 3,
        "points": 16,
        "faction": "Rebel Alliance",
        "slots": [
           "Astromech",
           "Crew"
        ],
        "id": 276,
        "key": "zebOrrelios_sheathipedeClassShuttle"
     },
     "zebOrrelios_tieFighter": {
        "text": "When defending, you may cancel [Critical Hit] results before [Hit] results.",
        "name": "\"Zeb\" Orrelios",
        "xws": "zeborrelios",
        "ship": "TIE Fighter",
        "unique": true,
        "skill": 3,
        "points": 13,
        "faction": "Rebel Alliance",
        "slots": [],
        "id": 241,
        "image": "pilots/Rebel Alliance/TIE Fighter/zeb-orrelios.png",
        "key": "zebOrrelios_tieFighter"
     },
     "zertikStrom": {
        "name": "Zertik Strom",
        "id": 129,
        "unique": true,
        "ship": "TIE Advanced",
        "skill": 6,
        "points": 26,
        "slots": [
           "Elite",
           "Missile"
        ],
        "text": "Enemy ships at Range 1 cannot add their range combat bonus when attacking.",
        "image": "pilots/Galactic Empire/TIE Advanced/zertik-strom.png",
        "faction": "Galactic Empire",
        "xws": "zertikstrom",
        "key": "zertikStrom"
     },
     "zetaAce": {
        "name": "\"Zeta Ace\"",
        "unique": true,
        "id": 152,
        "ship": "TIE/fo Fighter",
        "skill": 5,
        "points": 18,
        "slots": [
           "Elite",
           "Tech"
        ],
        "text": "When performing a barrel roll, you may use the ([Straight] 2) template (instead of the ([Straight] 1) template).",
        "image": "pilots/First Order/TIE-fo Fighter/zeta-ace.png",
        "faction": "First Order",
        "xws": "zetaace",
        "key": "zetaAce"
     },
     "zetaLeader": {
        "image": "pilots/First Order/TIE-fo Fighter/zeta-leader.png",
        "text": "When attacking, if you are not stressed, you may receive 1 stress token to roll 1 additional attack die.",
        "name": "\"Zeta Leader\"",
        "ship": "TIE/fo Fighter",
        "unique": true,
        "skill": 7,
        "points": 20,
        "faction": "First Order",
        "slots": [
           "Elite",
           "Tech"
        ],
        "id": 171,
        "xws": "zetaleader",
        "key": "zetaLeader"
     },
     "zetaSpecialist": {
        "image": "pilots/First Order/TIE-sf Fighter/zeta-specialist.png",
        "name": "Zeta Specialist",
        "xws": "zetaspecialist",
        "ship": "TIE/sf Fighter",
        "skill": 3,
        "points": 23,
        "faction": "First Order",
        "slots": [
           "Missile",
           "System",
           "Tech"
        ],
        "id": 204,
        "key": "zetaSpecialist"
     },
     "zetaSquadronPilot": {
        "name": "Zeta Squadron Pilot",
        "id": 153,
        "ship": "TIE/fo Fighter",
        "skill": 3,
        "points": 16,
        "slots": [
           "Tech"
        ],
        "image": "pilots/First Order/TIE-fo Fighter/zeta-squadron-pilot.png",
        "faction": "First Order",
        "xws": "zetasquadronpilot",
        "key": "zetaSquadronPilot"
     },
     "zuckuss": {
        "text": "When attacking you may roll 1 additional attack die. If you do, the defender rolls 1 additional defense die.",
        "name": "Zuckuss",
        "ship": "G-1A Starfighter",
        "unique": true,
        "skill": 7,
        "points": 28,
        "faction": "Scum and Villainy",
        "slots": [
           "Crew",
           "Elite",
           "Illicit",
           "System"
        ],
        "id": 162,
        "xws": "zuckuss",
        "image": "pilots/Scum and Villainy/G-1A Starfighter/zuckuss.png",
        "key": "zuckuss"
     }
  };

  Object.freeze(PilotCard);

  const PlayFormat = {
    EPIC: "epic",
    STANDARD: "standard"
  };

  PlayFormat.properties = {
    epic: {
      name: "Epic",
      width: 1830, // mm
      height: 915, // mm
      key: "epic"
    },
    standard: {
      name: "Standard",
      width: 915, // mm
      height: 915, // mm
      key: "standard"
    }
  };

  Object.freeze(PlayFormat);

  const Range = {
    ONE: "one",
    TWO: "two",
    THREE: "three",
    FOUR: "four",
    FIVE: "five"
  };

  Range.properties = {
    one: {
      minDistance: 0, // Minimum distance. (mm)
      maxDistance: 100, // Maximum distance. (mm)
      name: "1",
      key: "one"
    },
    two: {
      minDistance: 101, // Minimum distance. (mm)
      maxDistance: 200, // Maximum distance. (mm)
      name: "2",
      key: "two"
    },
    three: {
      minDistance: 201, // Minimum distance. (mm)
      maxDistance: 300, // Maximum distance. (mm)
      name: "3",
      key: "three"
    },
    four: {
      minDistance: 301, // Minimum distance. (mm)
      maxDistance: 400, // Maximum distance. (mm)
      name: "4",
      key: "four"
    },
    five: {
      minDistance: 401, // Minimum distance. (mm)
      maxDistance: 500, // Maximum distance. (mm)
      name: "5",
      key: "five"
    }
  };

  Object.freeze(Range);

  const ReferenceCard = {

    ACQUIRE_A_TARGET_LOCK_ACTION: "acquireATargetLockAction",
    ALTERNATE_PRIMARY_WEAPONS: "alternatePrimaryWeapons",
    AUXILIARY_FIRING_ARC: "auxiliaryFiringArc",
    BARREL_ROLL_ACTION: "barrelRollAction",
    BOMB_TOKENS_REFERENCE_CARD_01: "bombTokens_referenceCard01",
    BOMB_TOKENS_REFERENCE_CARD_02: "bombTokens_referenceCard02",
    BOMB_TOKENS_REFERENCE_CARD_03: "bombTokens_referenceCard03",
    BOMB_TOKENS_REFERENCE_CARD_04: "bombTokens_referenceCard04",
    BOMB_TOKENS_REFERENCE_CARD_05: "bombTokens_referenceCard05",
    BOMB_TOKENS_REFERENCE_CARD_06: "bombTokens_referenceCard06",
    BOMB_TOKENS_REFERENCE_CARD_07: "bombTokens_referenceCard07",
    BOMB_TOKENS_REFERENCE_CARD_08: "bombTokens_referenceCard08",
    BOOST_ACTION: "boostAction",
    BULLSEYE_FIRING_ARC: "bullseyeFiringArc",
    CLOAK_ACTION: "cloakAction",
    CONDITIONS: "conditions",
    COORDINATE_AND_DOCKING: "coordinateAndDocking",
    DEBRIS_CLOUD_TOKENS: "debrisCloudTokens",
    DECLOAK: "decloak",
    DUAL_UPGRADE_CARDS: "dualUpgradeCards",
    EVADE_ACTION: "evadeAction",
    FOCUS_ACTION: "focusAction",
    ION_TOKEN: "ionToken",
    MODIFICATIONS_AND_TITLES: "modificationsAndTitles",
    MODIFICATIONS_AND_UPGRADES: "modificationsAndUpgrades",
    REINFORCE_ACTION: "reinforceAction",
    RELOAD_ACTION_AND_JAM_TOKENS: "reloadActionAndJamTokens",
    REVERSE_MANEUVER: "reverseManeuver",
    SEGNORS_LOOP: "segnorsLoop",
    SLAM_ACTION: "slamAction",
    STRESS_TOKEN: "stressToken",
    TALLON_ROLL: "tallonRoll",
    THE_COMBAT_PHASE: "theCombatPhase",
    THE_GAME_ROUND: "theGameRound",
    TITLES: "titles",
    TITLES_AND_UPGRADES: "titlesAndUpgrades",
    TRACTOR_BEAM_TOKEN: "tractorBeamToken",
    TURRET_PRIMARY_WEAPON: "turretPrimaryWeapon",
    USING_BOMBS: "usingBombs",
    USING_CARGO: "usingCargo",
    USING_CLUSTER_MINES: "usingClusterMines",
  };

  ReferenceCard.properties = 
  {
     "acquireATargetLockAction": {
        "id": 34,
        "title": "Acquire a Target Lock Action",
        "subtitle": "Reference Card",
        "image": "reference-card/acquire-a-target-lock-action.png",
        "key": "acquireATargetLockAction"
     },
     "alternatePrimaryWeapons": {
        "id": 35,
        "title": "Alternate Primary Weapons",
        "subtitle": "Reference Card",
        "image": "reference-card/alternate-primary-weapons.png",
        "key": "alternatePrimaryWeapons"
     },
     "auxiliaryFiringArc": {
        "id": 20,
        "title": "Auxiliary Firing Arc",
        "subtitle": "Reference Card",
        "image": "reference-cards/AuxiliaryFiringArc.png",
        "key": "auxiliaryFiringArc"
     },
     "barrelRollAction": {
        "id": 36,
        "title": "Barrel Roll Action",
        "subtitle": "Reference Card",
        "image": "reference-card/barrel-roll-action.png",
        "key": "barrelRollAction"
     },
     "bombTokens_referenceCard01": {
        "id": 1,
        "title": "Bomb Tokens",
        "subtitle": "Reference Card #01",
        "image": "reference-cards/BombTokens.png",
        "key": "bombTokens_referenceCard01"
     },
     "bombTokens_referenceCard02": {
        "id": 5,
        "title": "Bomb Tokens",
        "subtitle": "Reference Card #02",
        "image": "reference-cards/BombTokens-02.png",
        "key": "bombTokens_referenceCard02"
     },
     "bombTokens_referenceCard03": {
        "id": 13,
        "title": "Bomb Tokens",
        "subtitle": "Reference Card #03",
        "image": "reference-cards/BombTokens-03.png",
        "key": "bombTokens_referenceCard03"
     },
     "bombTokens_referenceCard04": {
        "id": 9,
        "title": "Bomb Tokens",
        "subtitle": "Reference Card #04",
        "image": "reference-cards/BombTokens-04.png",
        "key": "bombTokens_referenceCard04"
     },
     "bombTokens_referenceCard05": {
        "id": 15,
        "title": "Bomb Tokens",
        "subtitle": "Reference Card #05",
        "image": "reference-cards/BombTokens-05.png",
        "key": "bombTokens_referenceCard05"
     },
     "bombTokens_referenceCard06": {
        "id": 17,
        "title": "Bomb Tokens",
        "subtitle": "Reference Card #06",
        "image": "reference-cards/BombTokens-06.png",
        "key": "bombTokens_referenceCard06"
     },
     "bombTokens_referenceCard07": {
        "id": 27,
        "title": "Bomb Tokens",
        "subtitle": "Reference Card #07",
        "image": "reference-cards/BombTokens-07.png",
        "key": "bombTokens_referenceCard07"
     },
     "bombTokens_referenceCard08": {
        "id": 24,
        "title": "Bomb Tokens",
        "subtitle": "Reference Card #08",
        "image": "reference-cards/BombTokens-08.png",
        "key": "bombTokens_referenceCard08"
     },
     "boostAction": {
        "id": 2,
        "title": "Boost Action",
        "subtitle": "Reference Card",
        "image": "reference-cards/BoostAction.png",
        "key": "boostAction"
     },
     "bullseyeFiringArc": {
        "id": 25,
        "title": "Bullseye Firing Arc",
        "subtitle": "Reference Card",
        "image": "reference-cards/BullseyeFiringArc.png",
        "key": "bullseyeFiringArc"
     },
     "cloakAction": {
        "id": 6,
        "title": "Cloak Action",
        "subtitle": "Reference Card",
        "image": "reference-cards/CloakAction.png",
        "key": "cloakAction"
     },
     "conditions": {
        "id": 22,
        "title": "Conditions",
        "subtitle": "Reference Card",
        "image": "reference-cards/Conditions.png",
        "key": "conditions"
     },
     "coordinateAndDocking": {
        "id": 28,
        "title": "Coordinate and Docking",
        "subtitle": "Reference Card",
        "image": "reference-cards/CoordinateAndDocking.png",
        "key": "coordinateAndDocking"
     },
     "debrisCloudTokens": {
        "id": 19,
        "title": "Debris Cloud Tokens",
        "subtitle": "Reference Card",
        "image": "reference-cards/DebrisCloudTokens.png",
        "key": "debrisCloudTokens"
     },
     "decloak": {
        "id": 7,
        "title": "Decloak",
        "subtitle": "Reference Card",
        "image": "reference-cards/Decloak.png",
        "key": "decloak"
     },
     "dualUpgradeCards": {
        "id": 16,
        "title": "Dual Upgrade Cards",
        "subtitle": "Reference Card",
        "image": "reference-cards/DualUpgradeCards.png",
        "key": "dualUpgradeCards"
     },
     "evadeAction": {
        "id": 37,
        "title": "Evade Action",
        "subtitle": "Reference Card",
        "image": "reference-card/evade-action.png",
        "key": "evadeAction"
     },
     "focusAction": {
        "id": 38,
        "title": "Focus Action",
        "subtitle": "Reference Card",
        "image": "reference-card/focus-action.png",
        "key": "focusAction"
     },
     "ionToken": {
        "id": 0,
        "title": "Ion Token",
        "subtitle": "Reference Card",
        "image": "reference-cards/IonToken.png",
        "key": "ionToken"
     },
     "modificationsAndTitles": {
        "id": 3,
        "title": "Modifications and Titles",
        "subtitle": "Reference Card",
        "image": "reference-cards/ModificationsAndTitles.png",
        "key": "modificationsAndTitles"
     },
     "modificationsAndUpgrades": {
        "id": 29,
        "title": "Modifications and Upgrades",
        "subtitle": "Reference Card",
        "image": "reference-cards/ModificationsAndUpgrades.png",
        "key": "modificationsAndUpgrades"
     },
     "reinforceAction": {
        "id": 23,
        "title": "Reinforce Action",
        "subtitle": "Reference Card",
        "image": "reference-cards/ReinforceAction.png",
        "key": "reinforceAction"
     },
     "reloadActionAndJamTokens": {
        "id": 26,
        "title": "Reload Action and Jam Tokens",
        "subtitle": "Reference Card",
        "image": "reference-cards/ReloadActionAndJamTokens.png",
        "key": "reloadActionAndJamTokens"
     },
     "reverseManeuver": {
        "id": 30,
        "title": "Reverse Maneuver",
        "subtitle": "Reference Card",
        "image": "reference-cards/ReverseManeuver.png",
        "key": "reverseManeuver"
     },
     "segnorsLoop": {
        "id": 8,
        "title": "Segnor’s Loop",
        "subtitle": "Reference Card",
        "image": "reference-cards/SegnorsLoop.png",
        "key": "segnorsLoop"
     },
     "slamAction": {
        "id": 11,
        "title": "SLAM Action",
        "subtitle": "Reference Card",
        "image": "reference-cards/SlamAction.png",
        "key": "slamAction"
     },
     "stressToken": {
        "id": 39,
        "title": "Stress Token",
        "subtitle": "Reference Card",
        "image": "reference-card/stress-token.png",
        "key": "stressToken"
     },
     "tallonRoll": {
        "id": 21,
        "title": "Tallon Roll",
        "subtitle": "Reference Card",
        "image": "reference-cards/TallonRoll.png",
        "key": "tallonRoll"
     },
     "theCombatPhase": {
        "id": 40,
        "title": "The Combat Phase",
        "subtitle": "Reference Card",
        "image": "reference-card/the-combat-phase.png",
        "key": "theCombatPhase"
     },
     "theGameRound": {
        "id": 41,
        "title": "The Game Round",
        "subtitle": "Reference Card",
        "image": "reference-card/the-game-round.png",
        "key": "theGameRound"
     },
     "titles": {
        "id": 31,
        "title": "Titles",
        "subtitle": "Reference Card",
        "image": "reference-cards/Titles.png",
        "key": "titles"
     },
     "titlesAndUpgrades": {
        "id": 32,
        "title": "Titles and Upgrades",
        "subtitle": "Reference Card",
        "image": "reference-cards/TitlesAndUpgrades.png",
        "key": "titlesAndUpgrades"
     },
     "tractorBeamToken": {
        "id": 14,
        "title": "Tractor Beam Token",
        "subtitle": "Reference Card",
        "image": "reference-cards/TractorBeamToken.png",
        "key": "tractorBeamToken"
     },
     "turretPrimaryWeapon": {
        "id": 12,
        "title": "Turret Primary Weapon",
        "subtitle": "Reference Card",
        "image": "reference-cards/TurretPrimaryWeapon.png",
        "key": "turretPrimaryWeapon"
     },
     "usingBombs": {
        "id": 4,
        "title": "Using Bombs",
        "subtitle": "Reference Card",
        "image": "reference-cards/UsingBombs.png",
        "key": "usingBombs"
     },
     "usingCargo": {
        "id": 18,
        "title": "Using Cargo",
        "subtitle": "Reference Card",
        "image": "reference-cards/UsingCargo.png",
        "key": "usingCargo"
     },
     "usingClusterMines": {
        "id": 10,
        "title": "Using Cluster Mines",
        "subtitle": "Reference Card",
        "image": "reference-cards/UsingClusterMines.png",
        "key": "usingClusterMines"
     }
  };

  Object.freeze(ReferenceCard);

  const Ship = {

    A_WING: "aWing",
    AGGRESSOR: "aggressor",
    ALPHA_CLASS_STAR_WING: "alphaClassStarWing",
    ARC_170: "arc170",
    ATTACK_SHUTTLE: "attackShuttle",
    AUZITUCK_GUNSHIP: "auzituckGunship",
    B_SF_17_BOMBER: "bSf17Bomber",
    B_WING: "bWing",
    C_ROC_CRUISER: "cRocCruiser",
    CR90_CORVETTE_AFT: "cr90CorvetteAft",
    CR90_CORVETTE_FORE: "cr90CorvetteFore",
    E_WING: "eWing",
    FIRESPRAY_31: "firespray31",
    G_1A_STARFIGHTER: "g1aStarfighter",
    GOZANTI_CLASS_CRUISER: "gozantiClassCruiser",
    GR_75_MEDIUM_TRANSPORT: "gr75MediumTransport",
    HWK_290: "hwk290",
    JUMPMASTER_5000: "jumpmaster5000",
    K_WING: "kWing",
    KIHRAXZ_FIGHTER: "kihraxzFighter",
    LAMBDA_CLASS_SHUTTLE: "lambdaClassShuttle",
    LANCER_CLASS_PURSUIT_CRAFT: "lancerClassPursuitCraft",
    M12_L_KIMOGILA_FIGHTER: "m12LKimogilaFighter",
    M3_A_INTERCEPTOR: "m3AInterceptor",
    PROTECTORATE_STARFIGHTER: "protectorateStarfighter",
    QUADJUMPER: "quadjumper",
    RAIDER_CLASS_CORVETTE_AFT: "raiderClassCorvetteAft",
    RAIDER_CLASS_CORVETTE_FORE: "raiderClassCorvetteFore",
    SCURRG_H_6_BOMBER: "scurrgH6Bomber",
    SHEATHIPEDE_CLASS_SHUTTLE: "sheathipedeClassShuttle",
    STARVIPER: "starviper",
    T_70_X_WING: "t70XWing",
    TIE_ADV_PROTOTYPE: "tieAdvPrototype",
    TIE_ADVANCED: "tieAdvanced",
    TIE_AGGRESSOR: "tieAggressor",
    TIE_BOMBER: "tieBomber",
    TIE_DEFENDER: "tieDefender",
    TIE_FIGHTER: "tieFighter",
    TIE_FO_FIGHTER: "tieFoFighter",
    TIE_INTERCEPTOR: "tieInterceptor",
    TIE_PHANTOM: "tiePhantom",
    TIE_PUNISHER: "tiePunisher",
    TIE_REAPER: "tieReaper",
    TIE_SF_FIGHTER: "tieSfFighter",
    TIE_SILENCER: "tieSilencer",
    TIE_STRIKER: "tieStriker",
    U_WING: "uWing",
    UPSILON_CLASS_SHUTTLE: "upsilonClassShuttle",
    VCX_100: "vcx100",
    VT_49_DECIMATOR: "vt49Decimator",
    X_WING: "xWing",
    Y_WING: "yWing",
    YT_1300: "yt1300",
    YT_2400: "yt2400",
    YV_666: "yv666",
    Z_95_HEADHUNTER: "z95Headhunter",
  };

  Ship.properties = 
  {
     "aWing": {
        "name": "A-wing",
        "faction": [
           "Rebel Alliance"
        ],
        "attack": 2,
        "agility": 3,
        "hull": 2,
        "shields": 2,
        "actions": [
           "Focus",
           "Target Lock",
           "Boost",
           "Evade"
        ],
        "size": "small",
        "xws": "awing",
        "id": 2,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "1TW",
           "1YW",
           "2TG",
           "2BG",
           "2FG",
           "2NG",
           "2YG",
           "3TW",
           "3BW",
           "3FG",
           "3NW",
           "3YW",
           "3KR",
           "4FG",
           "5FG",
           "5KR"
        ],
        "images": [
           "ship/rebel-alliance/a-wing.png"
        ],
        "silhouette": "silhouette/a-wing.png",
        "key": "aWing"
     },
     "aggressor": {
        "name": "Aggressor",
        "faction": [
           "Scum and Villainy"
        ],
        "attack": 3,
        "agility": 3,
        "hull": 4,
        "shields": 4,
        "actions": [
           "Focus",
           "Target Lock",
           "Boost",
           "Evade"
        ],
        "size": "large",
        "xws": "aggressor",
        "id": 23,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "1TW",
           "1BG",
           "1FG",
           "1NG",
           "1YW",
           "2TW",
           "2BG",
           "2FG",
           "2NG",
           "2YW",
           "3BG",
           "3FG",
           "3NG",
           "3LR",
           "3PR",
           "4KR"
        ],
        "images": [
           "ship/scum-and-villainy/aggressor.png"
        ],
        "silhouette": "silhouette/aggressor.png",
        "key": "aggressor"
     },
     "alphaClassStarWing": {
        "name": "Alpha-class Star Wing",
        "xws": "alphaclassstarwing",
        "faction": [
           "Galactic Empire"
        ],
        "actions": [
           "Focus",
           "Reload",
           "SLAM",
           "Target Lock"
        ],
        "size": "small",
        "attack": 2,
        "agility": 2,
        "hull": 4,
        "shields": 3,
        "id": 50,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "1BW",
           "1FG",
           "1NW",
           "2TW",
           "2BG",
           "2FG",
           "2NG",
           "2YW",
           "3TW",
           "3BW",
           "3FW",
           "3NW",
           "3YW",
           "4FR"
        ],
        "images": [
           "ship/galactic-empire/alpha-class-star-wing.png"
        ],
        "silhouette": "silhouette/alpha-class-star-wing.png",
        "key": "alphaClassStarWing"
     },
     "arc170": {
        "name": "ARC-170",
        "xws": "arc170",
        "faction": [
           "Rebel Alliance"
        ],
        "actions": [
           "Focus",
           "Target Lock"
        ],
        "size": "small",
        "attack": 2,
        "agility": 1,
        "hull": 6,
        "shields": 3,
        "id": 38,
        "firing_arcs": [
           "Auxiliary Rear",
           "Front"
        ],
        "dial": [
           "1BG",
           "1FG",
           "1NG",
           "2TW",
           "2BG",
           "2FG",
           "2NG",
           "2YW",
           "3TR",
           "3BW",
           "3FW",
           "3NW",
           "3YR",
           "4FR",
           "4KR"
        ],
        "images": [
           "ship/rebel-alliance/arc-170.png"
        ],
        "silhouette": "silhouette/arc-170.png",
        "key": "arc170"
     },
     "attackShuttle": {
        "name": "Attack Shuttle",
        "faction": [
           "Rebel Alliance"
        ],
        "attack": 3,
        "agility": 2,
        "hull": 2,
        "shields": 2,
        "actions": [
           "Barrel Roll",
           "Evade",
           "Focus"
        ],
        "size": "small",
        "xws": "attackshuttle",
        "id": 33,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "1TR",
           "1BG",
           "1FG",
           "1NG",
           "1YR",
           "2TW",
           "2BW",
           "2FG",
           "2NW",
           "2YW",
           "3TR",
           "3BW",
           "3FW",
           "3NW",
           "3YR",
           "4FW",
           "4KR"
        ],
        "images": [
           "ship/rebel-alliance/attack-shuttle.png"
        ],
        "silhouette": "silhouette/attack-shuttle.png",
        "key": "attackShuttle"
     },
     "auzituckGunship": {
        "name": "Auzituck Gunship",
        "xws": "auzituckgunship",
        "faction": [
           "Rebel Alliance"
        ],
        "actions": [
           "Focus",
           "Reinforce"
        ],
        "size": "small",
        "attack": 3,
        "agility": 1,
        "hull": 6,
        "shields": 3,
        "id": 47,
        "firing_arcs": [
           "Auxiliary 180",
           "Front"
        ],
        "dial": [
           "1BG",
           "1FG",
           "1NG",
           "2TW",
           "2BW",
           "2FG",
           "2NW",
           "2YW",
           "3TW",
           "3BW",
           "3FG",
           "3NW",
           "3YW",
           "4FW",
           "5FR"
        ],
        "images": [
           "ship/rebel-alliance/auzituck-gunship.png"
        ],
        "silhouette": "silhouette/auzituck-gunship.png",
        "key": "auzituckGunship"
     },
     "bSf17Bomber": {
        "name": "B/SF-17 Bomber",
        "xws": "bsf17bomber",
        "faction": [
           "Resistance"
        ],
        "actions": [
           "Focus",
           "Target Lock"
        ],
        "size": "large",
        "attack": 2,
        "agility": 1,
        "hull": 9,
        "shields": 3,
        "firing_arcs": [
           "Front",
           "Turret"
        ],
        "id": 54,
        "dial": [
           "0OR",
           "1TR",
           "1BG",
           "1FG",
           "1NG",
           "1YR",
           "2TW",
           "2BW",
           "2FG",
           "2NW",
           "2YW",
           "3BW",
           "3FW",
           "3NW"
        ],
        "images": [
           "ship/resistance/b-sf-17-bomber.png"
        ],
        "silhouette": "silhouette/b-sf-17-bomber.png",
        "key": "bSf17Bomber"
     },
     "bWing": {
        "name": "B-wing",
        "faction": [
           "Rebel Alliance"
        ],
        "attack": 3,
        "agility": 1,
        "hull": 3,
        "shields": 5,
        "actions": [
           "Focus",
           "Target Lock",
           "Barrel Roll"
        ],
        "size": "small",
        "xws": "bwing",
        "id": 10,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "1TR",
           "1BG",
           "1FG",
           "1NG",
           "1YR",
           "2TW",
           "2BW",
           "2FG",
           "2NW",
           "2YW",
           "2KR",
           "3BR",
           "3FW",
           "3NR",
           "4FR"
        ],
        "images": [
           "ship/rebel-alliance/b-wing.png"
        ],
        "silhouette": "silhouette/b-wing.png",
        "key": "bWing"
     },
     "cRocCruiser": {
        "name": "C-ROC Cruiser",
        "xws": "croccruiser",
        "faction": [
           "Scum and Villainy"
        ],
        "actions": [
           "Jam",
           "Recover",
           "Reinforce",
           "Target Lock"
        ],
        "size": "huge",
        "energy": 4,
        "agility": 0,
        "hull": 10,
        "shields": 4,
        "maneuvers_energy": [
           [
              0,
              0,
              0,
              0,
              0,
              0
           ],
           [
              0,
              2,
              3,
              2,
              0,
              0
           ],
           [
              0,
              1,
              2,
              1,
              0,
              0
           ],
           [
              0,
              0,
              2,
              0,
              0,
              0
           ],
           [
              0,
              0,
              1,
              0,
              0,
              0
           ]
        ],
        "id": 46,
        "images": [
           "ship/scum-and-villainy/c-roc-cruiser.png"
        ],
        "silhouette": "silhouette/c-roc-cruiser.png",
        "key": "cRocCruiser"
     },
     "cr90CorvetteAft": {
        "name": "CR90 Corvette (Aft)",
        "faction": [
           "Rebel Alliance"
        ],
        "energy": 5,
        "agility": 0,
        "hull": 8,
        "shields": 3,
        "actions": [
           "Recover",
           "Reinforce"
        ],
        "epic_points": 1.5,
        "maneuvers_energy": [
           [
              0,
              0,
              0,
              0,
              0,
              0
           ],
           [
              0,
              3,
              0,
              3,
              0,
              0
           ],
           [
              0,
              2,
              3,
              2,
              0,
              0
           ],
           [
              0,
              0,
              2,
              0,
              0,
              0
           ],
           [
              0,
              0,
              1,
              0,
              0,
              0
           ]
        ],
        "size": "huge",
        "xws": "cr90corvetteaft",
        "id": 18,
        "images": [
           "ship/rebel-alliance/cr90-corvette-aft.png"
        ],
        "silhouette": "silhouette/cr90-corvette-aft.png",
        "key": "cr90CorvetteAft"
     },
     "cr90CorvetteFore": {
        "name": "CR90 Corvette (Fore)",
        "faction": [
           "Rebel Alliance"
        ],
        "attack": 4,
        "agility": 0,
        "hull": 8,
        "shields": 5,
        "actions": [
           "Coordinate",
           "Target Lock"
        ],
        "epic_points": 1.5,
        "maneuvers_energy": [
           [
              0,
              0,
              0,
              0,
              0,
              0
           ],
           [
              0,
              3,
              0,
              3,
              0,
              0
           ],
           [
              0,
              2,
              3,
              2,
              0,
              0
           ],
           [
              0,
              0,
              2,
              0,
              0,
              0
           ],
           [
              0,
              0,
              1,
              0,
              0,
              0
           ]
        ],
        "size": "huge",
        "xws": "cr90corvettefore",
        "id": 17,
        "images": [
           "ship/rebel-alliance/cr90-corvette-fore.png"
        ],
        "silhouette": "silhouette/cr90-corvette-fore.png",
        "key": "cr90CorvetteFore"
     },
     "eWing": {
        "name": "E-wing",
        "faction": [
           "Rebel Alliance"
        ],
        "attack": 3,
        "agility": 3,
        "hull": 2,
        "shields": 3,
        "actions": [
           "Focus",
           "Target Lock",
           "Barrel Roll",
           "Evade"
        ],
        "size": "small",
        "xws": "ewing",
        "id": 15,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "1BW",
           "1FG",
           "1NW",
           "2TW",
           "2BG",
           "2FG",
           "2NG",
           "2YW",
           "3TW",
           "3BW",
           "3FG",
           "3NW",
           "3YW",
           "3KR",
           "4FW",
           "4KR",
           "5FW"
        ],
        "images": [
           "ship/rebel-alliance/e-wing.png"
        ],
        "silhouette": "silhouette/e-wing.png",
        "key": "eWing"
     },
     "firespray31": {
        "name": "Firespray-31",
        "faction": [
           "Galactic Empire",
           "Scum and Villainy"
        ],
        "attack": 3,
        "agility": 2,
        "hull": 6,
        "shields": 4,
        "actions": [
           "Focus",
           "Target Lock",
           "Evade"
        ],
        "size": "large",
        "xws": "firespray31",
        "id": 7,
        "firing_arcs": [
           "Auxiliary Rear",
           "Front"
        ],
        "dial": [
           "1BG",
           "1FG",
           "1NG",
           "2TW",
           "2BW",
           "2FG",
           "2NW",
           "2YW",
           "3TW",
           "3BW",
           "3FW",
           "3NW",
           "3YW",
           "3KR",
           "4FW",
           "4KR"
        ],
        "images": [
           "ship/galactic-empire/firespray-31.png",
           "ship/scum-and-villainy/firespray-31.png"
        ],
        "silhouette": "silhouette/firespray-31.png",
        "key": "firespray31"
     },
     "g1aStarfighter": {
        "name": "G-1A Starfighter",
        "faction": [
           "Scum and Villainy"
        ],
        "actions": [
           "Evade",
           "Focus",
           "Target Lock"
        ],
        "attack": 3,
        "agility": 1,
        "hull": 4,
        "shields": 4,
        "size": "small",
        "xws": "g1astarfighter",
        "id": 35,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "1TR",
           "1BG",
           "1FG",
           "1NG",
           "1YR",
           "2TW",
           "2BW",
           "2FG",
           "2NW",
           "2YW",
           "3BR",
           "3FG",
           "3NR",
           "3KR",
           "4FW",
           "4KR"
        ],
        "images": [
           "ship/scum-and-villainy/g-1a-starfighter.png"
        ],
        "silhouette": "silhouette/g-1a-starfighter.png",
        "key": "g1aStarfighter"
     },
     "gozantiClassCruiser": {
        "name": "Gozanti-class Cruiser",
        "faction": [
           "Galactic Empire"
        ],
        "actions": [
           "Coordinate",
           "Recover",
           "Reinforce",
           "Target Lock"
        ],
        "agility": 0,
        "hull": 9,
        "shields": 5,
        "energy": 4,
        "size": "huge",
        "epic_points": 2,
        "maneuvers_energy": [
           [
              0,
              0,
              0,
              0,
              0
           ],
           [
              0,
              2,
              3,
              2,
              0
           ],
           [
              0,
              1,
              2,
              1,
              0
           ],
           [
              0,
              0,
              1,
              0,
              0
           ],
           [
              0,
              0,
              1,
              0,
              0
           ]
        ],
        "xws": "gozanticlasscruiser",
        "id": 37,
        "images": [
           "ship/galactic-empire/gozanti-class-cruiser.png"
        ],
        "silhouette": "silhouette/gozanti-class-cruiser.png",
        "key": "gozantiClassCruiser"
     },
     "gr75MediumTransport": {
        "name": "GR-75 Medium Transport",
        "faction": [
           "Rebel Alliance"
        ],
        "energy": 4,
        "agility": 0,
        "hull": 8,
        "shields": 4,
        "actions": [
           "Recover",
           "Reinforce",
           "Coordinate",
           "Jam"
        ],
        "epic_points": 2,
        "maneuvers_energy": [
           [
              0,
              0,
              0,
              0,
              0,
              0
           ],
           [
              0,
              2,
              3,
              2,
              0,
              0
           ],
           [
              0,
              1,
              2,
              1,
              0,
              0
           ],
           [
              0,
              0,
              1,
              0,
              0,
              0
           ],
           [
              0,
              0,
              0,
              0,
              0,
              0
           ]
        ],
        "size": "huge",
        "xws": "gr75mediumtransport",
        "id": 12,
        "images": [
           "ship/rebel-alliance/gr-75-medium-transport.png"
        ],
        "silhouette": "silhouette/gr-75-medium-transport.png",
        "key": "gr75MediumTransport"
     },
     "hwk290": {
        "name": "HWK-290",
        "faction": [
           "Rebel Alliance",
           "Scum and Villainy"
        ],
        "attack": 1,
        "agility": 2,
        "hull": 4,
        "shields": 1,
        "actions": [
           "Focus",
           "Target Lock"
        ],
        "size": "small",
        "xws": "hwk290",
        "id": 8,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "1BG",
           "1FG",
           "1NG",
           "2TW",
           "2BW",
           "2FG",
           "2NW",
           "2YW",
           "3BR",
           "3FW",
           "3NR",
           "4FR"
        ],
        "images": [
           "ship/rebel-alliance/hwk-290.png",
           "ship/scum-and-villainy/hwk-290.png"
        ],
        "silhouette": "silhouette/hwk-290.png",
        "key": "hwk290"
     },
     "jumpmaster5000": {
        "name": "JumpMaster 5000",
        "faction": [
           "Scum and Villainy"
        ],
        "actions": [
           "Barrel Roll",
           "Focus",
           "Target Lock"
        ],
        "attack": 2,
        "agility": 2,
        "hull": 5,
        "shields": 4,
        "size": "large",
        "xws": "jumpmaster5000",
        "id": 34,
        "firing_arcs": [
           "Front",
           "Turret"
        ],
        "dial": [
           "1TG",
           "1BG",
           "1FG",
           "1NW",
           "1YW",
           "2TG",
           "2BG",
           "2FG",
           "2NW",
           "2YW",
           "2LW",
           "2PR",
           "3BW",
           "3FW",
           "3NW",
           "4FW",
           "4KR"
        ],
        "images": [
           "ship/scum-and-villainy/jumpmaster-5000.png"
        ],
        "silhouette": "silhouette/jumpmaster-5000.png",
        "key": "jumpmaster5000"
     },
     "kWing": {
        "name": "K-wing",
        "faction": [
           "Rebel Alliance"
        ],
        "attack": 2,
        "agility": 1,
        "hull": 5,
        "shields": 4,
        "actions": [
           "Focus",
           "Target Lock",
           "SLAM"
        ],
        "size": "small",
        "xws": "kwing",
        "id": 28,
        "firing_arcs": [
           "Front",
           "Turret"
        ],
        "dial": [
           "1BG",
           "1FG",
           "1NG",
           "2TW",
           "2BW",
           "2FG",
           "2NW",
           "2YW",
           "3BW",
           "3FW",
           "3NW"
        ],
        "images": [
           "ship/rebel-alliance/k-wing.png"
        ],
        "silhouette": "silhouette/k-wing.png",
        "key": "kWing"
     },
     "kihraxzFighter": {
        "name": "Kihraxz Fighter",
        "faction": [
           "Scum and Villainy"
        ],
        "attack": 3,
        "agility": 2,
        "hull": 4,
        "shields": 1,
        "actions": [
           "Focus",
           "Target Lock"
        ],
        "size": "small",
        "xws": "kihraxzfighter",
        "id": 27,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "1TW",
           "1BG",
           "1NG",
           "1YW",
           "2TW",
           "2BG",
           "2FG",
           "2NG",
           "2YW",
           "3BW",
           "3FW",
           "3NW",
           "4FW",
           "4KR",
           "5KR"
        ],
        "images": [
           "ship/scum-and-villainy/kihraxz-fighter.png"
        ],
        "silhouette": "silhouette/kihraxz-fighter.png",
        "key": "kihraxzFighter"
     },
     "lambdaClassShuttle": {
        "name": "Lambda-class Shuttle",
        "faction": [
           "Galactic Empire"
        ],
        "attack": 3,
        "agility": 1,
        "hull": 5,
        "shields": 5,
        "actions": [
           "Focus",
           "Target Lock"
        ],
        "size": "large",
        "xws": "lambdaclassshuttle",
        "id": 9,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "0OR",
           "1BG",
           "1FG",
           "1NG",
           "2TR",
           "2BW",
           "2FG",
           "2NW",
           "2YR",
           "3BR",
           "3FW",
           "3NR"
        ],
        "images": [
           "ship/galactic-empire/lambda-class-shuttle.png"
        ],
        "silhouette": "silhouette/lambda-class-shuttle.png",
        "key": "lambdaClassShuttle"
     },
     "lancerClassPursuitCraft": {
        "name": "Lancer-class Pursuit Craft",
        "xws": "lancerclasspursuitcraft",
        "faction": [
           "Scum and Villainy"
        ],
        "actions": [
           "Focus",
           "Evade",
           "Rotate Arc",
           "Target Lock"
        ],
        "size": "large",
        "attack": 3,
        "agility": 2,
        "hull": 7,
        "shields": 3,
        "id": 41,
        "firing_arcs": [
           "Front",
           "Mobile"
        ],
        "dial": [
           "1BW",
           "1FW",
           "1NW",
           "2TW",
           "2BW",
           "2FG",
           "2NW",
           "2YW",
           "3TG",
           "3BG",
           "3FG",
           "3NG",
           "3YG",
           "4FG",
           "5FW",
           "5KR"
        ],
        "images": [
           "ship/scum-and-villainy/lancer-class-pursuit-craft.png"
        ],
        "silhouette": "silhouette/lancer-class-pursuit-craft.png",
        "key": "lancerClassPursuitCraft"
     },
     "m12LKimogilaFighter": {
        "name": "M12-L Kimogila Fighter",
        "xws": "m12lkimogilafighter",
        "faction": [
           "Scum and Villainy"
        ],
        "actions": [
           "Barrel Roll",
           "Focus",
           "Reload",
           "Target Lock"
        ],
        "size": "small",
        "attack": 3,
        "agility": 1,
        "hull": 6,
        "shields": 2,
        "id": 51,
        "firing_arcs": [
           "Bullseye",
           "Front"
        ],
        "dial": [
           "1TR",
           "1BW",
           "1FG",
           "1NW",
           "1YR",
           "2TR",
           "2BG",
           "2FG",
           "2NG",
           "2YR",
           "3TW",
           "3BW",
           "3FG",
           "3NW",
           "3YW",
           "4KR"
        ],
        "images": [
           "ship/scum-and-villainy/m12-l-kimogila-fighter.png"
        ],
        "silhouette": "silhouette/m12-l-kimogila-fighter.png",
        "key": "m12LKimogilaFighter"
     },
     "m3AInterceptor": {
        "name": "M3-A Interceptor",
        "faction": [
           "Scum and Villainy"
        ],
        "attack": 2,
        "agility": 3,
        "hull": 2,
        "shields": 1,
        "actions": [
           "Focus",
           "Target Lock",
           "Barrel Roll",
           "Evade"
        ],
        "size": "small",
        "xws": "m3ainterceptor",
        "id": 22,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "1TW",
           "1BG",
           "1NG",
           "1YW",
           "2TW",
           "2BG",
           "2FG",
           "2NG",
           "2YW",
           "3BW",
           "3FG",
           "3NW",
           "3KR",
           "4FW",
           "5KR"
        ],
        "images": [
           "ship/scum-and-villainy/m3-a-interceptor.png"
        ],
        "silhouette": "silhouette/m3-a-interceptor.png",
        "key": "m3AInterceptor"
     },
     "protectorateStarfighter": {
        "name": "Protectorate Starfighter",
        "xws": "protectoratestarfighter",
        "faction": [
           "Scum and Villainy"
        ],
        "actions": [
           "Barrel Roll",
           "Boost",
           "Focus",
           "Target Lock"
        ],
        "size": "small",
        "attack": 3,
        "agility": 3,
        "hull": 4,
        "shields": 0,
        "id": 40,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "1TW",
           "1YW",
           "2ER",
           "2TG",
           "2BG",
           "2FG",
           "2NG",
           "2YG",
           "2RR",
           "3TW",
           "3BW",
           "3FG",
           "3NW",
           "3YW",
           "4FW",
           "4KR",
           "5FW"
        ],
        "images": [
           "ship/scum-and-villainy/protectorate-starfighter.png"
        ],
        "silhouette": "silhouette/protectorate-starfighter.png",
        "key": "protectorateStarfighter"
     },
     "quadjumper": {
        "name": "Quadjumper",
        "xws": "quadjumper",
        "faction": [
           "Scum and Villainy"
        ],
        "actions": [
           "Barrel Roll",
           "Focus"
        ],
        "size": "small",
        "attack": 2,
        "agility": 2,
        "hull": 5,
        "shields": 0,
        "id": 43,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "1AR",
           "1SR",
           "1DR",
           "1TW",
           "1FW",
           "1YW",
           "2TW",
           "2BG",
           "2FG",
           "2NG",
           "2YW",
           "2LR",
           "2PR",
           "3BW",
           "3FG",
           "3NW"
        ],
        "images": [
           "ship/scum-and-villainy/quadjumper.png"
        ],
        "silhouette": "silhouette/quadjumper.png",
        "key": "quadjumper"
     },
     "raiderClassCorvetteAft": {
        "name": "Raider-class Corvette (Aft)",
        "faction": [
           "Galactic Empire"
        ],
        "energy": 6,
        "agility": 0,
        "hull": 8,
        "shields": 4,
        "actions": [
           "Target Lock",
           "Coordinate"
        ],
        "epic_points": 1.5,
        "maneuvers_energy": [
           [
              0,
              0,
              0,
              0,
              0,
              0
           ],
           [
              0,
              3,
              3,
              3,
              0,
              0
           ],
           [
              0,
              2,
              3,
              2,
              0,
              0
           ],
           [
              0,
              0,
              2,
              0,
              0,
              0
           ],
           [
              0,
              0,
              2,
              0,
              0,
              0
           ]
        ],
        "size": "huge",
        "xws": "raiderclasscorvetteaft",
        "id": 25,
        "images": [
           "ship/galactic-empire/raider-class-corvette-aft.png"
        ],
        "silhouette": "silhouette/raider-class-corvette-aft.png",
        "key": "raiderClassCorvetteAft"
     },
     "raiderClassCorvetteFore": {
        "name": "Raider-class Corvette (Fore)",
        "faction": [
           "Galactic Empire"
        ],
        "attack": 4,
        "agility": 0,
        "hull": 8,
        "shields": 6,
        "actions": [
           "Recover",
           "Reinforce"
        ],
        "epic_points": 1.5,
        "maneuvers_energy": [
           [
              0,
              0,
              0,
              0,
              0,
              0
           ],
           [
              0,
              3,
              3,
              3,
              0,
              0
           ],
           [
              0,
              2,
              3,
              2,
              0,
              0
           ],
           [
              0,
              0,
              2,
              0,
              0,
              0
           ],
           [
              0,
              0,
              2,
              0,
              0,
              0
           ]
        ],
        "size": "huge",
        "xws": "raiderclasscorvettefore",
        "id": 24,
        "images": [
           "ship/galactic-empire/raider-class-corvette-fore.png"
        ],
        "silhouette": "silhouette/raider-class-corvette-fore.png",
        "key": "raiderClassCorvetteFore"
     },
     "scurrgH6Bomber": {
        "name": "Scurrg H-6 Bomber",
        "xws": "scurrgh6bomber",
        "faction": [
           "Rebel Alliance",
           "Scum and Villainy"
        ],
        "actions": [
           "Barrel Roll",
           "Focus",
           "Target Lock"
        ],
        "size": "small",
        "attack": 3,
        "agility": 1,
        "hull": 5,
        "shields": 5,
        "id": 49,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "1BW",
           "1FG",
           "1NW",
           "2TW",
           "2BG",
           "2FG",
           "2NG",
           "2YW",
           "3ER",
           "3TR",
           "3BW",
           "3FG",
           "3NW",
           "3YR",
           "3RR",
           "4FW",
           "5FR"
        ],
        "images": [
           "ship/rebel-alliance/scurrg-h-6-bomber.png",
           "ship/scum-and-villainy/scurrg-h-6-bomber.png"
        ],
        "silhouette": "silhouette/scurrg-h-6-bomber.png",
        "key": "scurrgH6Bomber"
     },
     "sheathipedeClassShuttle": {
        "name": "Sheathipede-class Shuttle",
        "xws": "sheathipedeclassshuttle",
        "faction": [
           "Rebel Alliance"
        ],
        "actions": [
           "Coordinate",
           "Focus",
           "Target Lock"
        ],
        "size": "small",
        "attack": 2,
        "agility": 2,
        "hull": 4,
        "shields": 1,
        "id": 52,
        "firing_arcs": [
           "Auxiliary Rear",
           "Front"
        ],
        "dial": [
           "1BW",
           "1FG",
           "1NW",
           "2TW",
           "2BG",
           "2FG",
           "2NG",
           "2YW",
           "3TR",
           "3BW",
           "3FG",
           "3NW",
           "3YR",
           "3KR",
           "4FR"
        ],
        "images": [
           "ship/rebel-alliance/sheathipede-class-shuttle.png"
        ],
        "silhouette": "silhouette/sheathipede-class-shuttle.png",
        "key": "sheathipedeClassShuttle"
     },
     "starviper": {
        "name": "StarViper",
        "faction": [
           "Scum and Villainy"
        ],
        "attack": 3,
        "agility": 3,
        "hull": 4,
        "shields": 1,
        "actions": [
           "Focus",
           "Target Lock",
           "Barrel Roll",
           "Boost"
        ],
        "size": "small",
        "xws": "starviper",
        "id": 21,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "1TW",
           "1BG",
           "1FG",
           "1NG",
           "1YW",
           "2TW",
           "2BW",
           "2FG",
           "2NW",
           "2YW",
           "3BW",
           "3FG",
           "3NW",
           "3LR",
           "3PR",
           "4FW"
        ],
        "images": [
           "ship/scum-and-villainy/starviper.png"
        ],
        "silhouette": "silhouette/starviper.png",
        "key": "starviper"
     },
     "t70XWing": {
        "name": "T-70 X-wing",
        "faction": [
           "Resistance"
        ],
        "attack": 3,
        "agility": 2,
        "hull": 3,
        "shields": 3,
        "actions": [
           "Focus",
           "Target Lock",
           "Boost"
        ],
        "size": "small",
        "xws": "t70xwing",
        "id": 30,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "1BG",
           "1FG",
           "1NG",
           "2TW",
           "2BW",
           "2FG",
           "2NW",
           "2YW",
           "3ER",
           "3TW",
           "3BW",
           "3FG",
           "3NW",
           "3YW",
           "3RR",
           "4FW",
           "4KR"
        ],
        "images": [
           "ship/resistance/t-70-x-wing.png"
        ],
        "silhouette": "silhouette/t-70-x-wing.png",
        "key": "t70XWing"
     },
     "tieAdvPrototype": {
        "name": "TIE Adv. Prototype",
        "faction": [
           "Galactic Empire"
        ],
        "actions": [
           "Barrel Roll",
           "Boost",
           "Focus",
           "Target Lock"
        ],
        "attack": 2,
        "agility": 3,
        "hull": 2,
        "shields": 2,
        "size": "small",
        "xws": "tieadvprototype",
        "id": 36,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "1TG",
           "1BG",
           "1NG",
           "1YG",
           "2TW",
           "2BW",
           "2FG",
           "2NW",
           "2YW",
           "3TW",
           "3BW",
           "3FG",
           "3NW",
           "3YW",
           "4FG",
           "4KR",
           "5FW"
        ],
        "images": [
           "ship/galactic-empire/tie-advanced-prototype.png"
        ],
        "silhouette": "silhouette/tie-advanced-prototype.png",
        "key": "tieAdvPrototype"
     },
     "tieAdvanced": {
        "name": "TIE Advanced",
        "faction": [
           "Galactic Empire"
        ],
        "attack": 2,
        "agility": 3,
        "hull": 3,
        "shields": 2,
        "actions": [
           "Focus",
           "Target Lock",
           "Barrel Roll",
           "Evade"
        ],
        "size": "small",
        "xws": "tieadvanced",
        "id": 5,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "1BG",
           "1NG",
           "2TW",
           "2BW",
           "2FG",
           "2NW",
           "2YW",
           "3TW",
           "3BW",
           "3FG",
           "3NW",
           "3YW",
           "4FW",
           "4KR",
           "5FW"
        ],
        "images": [
           "ship/galactic-empire/tie-advanced.png"
        ],
        "silhouette": "silhouette/tie-advanced.png",
        "key": "tieAdvanced"
     },
     "tieAggressor": {
        "name": "TIE Aggressor",
        "xws": "tieaggressor",
        "faction": [
           "Galactic Empire"
        ],
        "actions": [
           "Barrel Roll",
           "Focus",
           "Target Lock"
        ],
        "size": "small",
        "attack": 2,
        "agility": 2,
        "hull": 4,
        "shields": 1,
        "id": 48,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "1BW",
           "1FG",
           "1NW",
           "2TW",
           "2BG",
           "2FG",
           "2NG",
           "2YW",
           "3TW",
           "3BW",
           "3FG",
           "3NW",
           "3YW",
           "4FW",
           "4KR"
        ],
        "images": [
           "ship/galactic-empire/tie-aggressor.png"
        ],
        "silhouette": "silhouette/tie-aggressor.png",
        "key": "tieAggressor"
     },
     "tieBomber": {
        "name": "TIE Bomber",
        "faction": [
           "Galactic Empire"
        ],
        "attack": 2,
        "agility": 2,
        "hull": 6,
        "shields": 0,
        "actions": [
           "Focus",
           "Target Lock",
           "Barrel Roll"
        ],
        "size": "small",
        "xws": "tiebomber",
        "id": 11,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "1BW",
           "1FG",
           "1NW",
           "2TR",
           "2BG",
           "2FG",
           "2NG",
           "2YR",
           "3TW",
           "3BW",
           "3FG",
           "3NW",
           "3YW",
           "4FW",
           "5KR"
        ],
        "images": [
           "ship/galactic-empire/tie-bomber.png"
        ],
        "silhouette": "silhouette/tie-bomber.png",
        "key": "tieBomber"
     },
     "tieDefender": {
        "name": "TIE Defender",
        "faction": [
           "Galactic Empire"
        ],
        "attack": 3,
        "agility": 3,
        "hull": 3,
        "shields": 3,
        "actions": [
           "Focus",
           "Target Lock",
           "Barrel Roll"
        ],
        "size": "small",
        "xws": "tiedefender",
        "id": 14,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "1TR",
           "1BW",
           "1NW",
           "1YR",
           "2TR",
           "2BW",
           "2FG",
           "2NW",
           "2YR",
           "3TW",
           "3BW",
           "3FG",
           "3NW",
           "3YW",
           "4FG",
           "4KW",
           "5FG"
        ],
        "images": [
           "ship/galactic-empire/tie-defender.png"
        ],
        "silhouette": "silhouette/tie-defender.png",
        "key": "tieDefender"
     },
     "tieFighter": {
        "name": "TIE Fighter",
        "faction": [
           "Galactic Empire",
           "Rebel Alliance"
        ],
        "attack": 2,
        "agility": 3,
        "hull": 3,
        "shields": 0,
        "actions": [
           "Focus",
           "Barrel Roll",
           "Evade"
        ],
        "size": "small",
        "xws": "tiefighter",
        "id": 4,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "1TW",
           "1YW",
           "2TW",
           "2BG",
           "2FG",
           "2NG",
           "2YW",
           "3TW",
           "3BW",
           "3FG",
           "3NW",
           "3YW",
           "3KR",
           "4FW",
           "4KR",
           "5FW"
        ],
        "images": [
           "ship/galactic-empire/tie-fighter.png",
           "ship/rebel-alliance/tie-fighter.png"
        ],
        "silhouette": "silhouette/tie-fighter.png",
        "key": "tieFighter"
     },
     "tieFoFighter": {
        "name": "TIE/fo Fighter",
        "faction": [
           "First Order"
        ],
        "attack": 2,
        "agility": 3,
        "hull": 3,
        "shields": 1,
        "actions": [
           "Focus",
           "Target Lock",
           "Barrel Roll",
           "Evade"
        ],
        "size": "small",
        "xws": "tiefofighter",
        "id": 31,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "1TW",
           "1YW",
           "2LR",
           "2TG",
           "2BG",
           "2FG",
           "2NG",
           "2YG",
           "2PR",
           "3TW",
           "3BW",
           "3FG",
           "3NW",
           "3YW",
           "4FW",
           "4KR",
           "5FW"
        ],
        "images": [
           "ship/first-order/tie-fo-fighter.png"
        ],
        "silhouette": "silhouette/tie-fo-fighter.png",
        "key": "tieFoFighter"
     },
     "tieInterceptor": {
        "name": "TIE Interceptor",
        "faction": [
           "Galactic Empire"
        ],
        "attack": 3,
        "agility": 3,
        "hull": 3,
        "shields": 0,
        "actions": [
           "Focus",
           "Barrel Roll",
           "Boost",
           "Evade"
        ],
        "size": "small",
        "xws": "tieinterceptor",
        "id": 6,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "1TW",
           "1YW",
           "2TG",
           "2BG",
           "2FG",
           "2NG",
           "2YG",
           "3TW",
           "3BW",
           "3FG",
           "3NW",
           "3YW",
           "3KR",
           "4FG",
           "5FW",
           "5KR"
        ],
        "images": [
           "ship/galactic-empire/tie-interceptor.png"
        ],
        "silhouette": "silhouette/tie-interceptor.png",
        "key": "tieInterceptor"
     },
     "tiePhantom": {
        "name": "TIE Phantom",
        "faction": [
           "Galactic Empire"
        ],
        "attack": 4,
        "agility": 2,
        "hull": 2,
        "shields": 2,
        "actions": [
           "Focus",
           "Barrel Roll",
           "Evade",
           "Cloak"
        ],
        "size": "small",
        "xws": "tiephantom",
        "id": 16,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "1TW",
           "1YW",
           "2TW",
           "2BG",
           "2FG",
           "2NG",
           "2YW",
           "3TW",
           "3BW",
           "3FG",
           "3NW",
           "3YW",
           "3KR",
           "4FW",
           "4KR"
        ],
        "images": [
           "ship/galactic-empire/tie-phantom.png"
        ],
        "silhouette": "silhouette/tie-phantom.png",
        "key": "tiePhantom"
     },
     "tiePunisher": {
        "name": "TIE Punisher",
        "faction": [
           "Galactic Empire"
        ],
        "attack": 2,
        "agility": 1,
        "hull": 6,
        "shields": 3,
        "actions": [
           "Focus",
           "Target Lock",
           "Boost"
        ],
        "size": "small",
        "xws": "tiepunisher",
        "id": 29,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "1BG",
           "1FG",
           "1NG",
           "2TR",
           "2BW",
           "2FG",
           "2NW",
           "2YR",
           "3TW",
           "3BW",
           "3FW",
           "3NW",
           "3YW",
           "4KR"
        ],
        "images": [
           "ship/galactic-empire/tie-punisher.png"
        ],
        "silhouette": "silhouette/tie-punisher.png",
        "key": "tiePunisher"
     },
     "tieReaper": {
        "name": "TIE Reaper",
        "xws": "tiereaper",
        "faction": [
           "Galactic Empire"
        ],
        "actions": [
           "Evade",
           "Focus",
           "Jam"
        ],
        "size": "small",
        "attack": 3,
        "agility": 1,
        "hull": 6,
        "shields": 2,
        "firing_arcs": [
           "Front"
        ],
        "id": 55,
        "dial": [
           "0OR",
           "1LR",
           "1TW",
           "1BW",
           "1FG",
           "1NW",
           "1YW",
           "1PR",
           "2TR",
           "2BG",
           "2FG",
           "2NG",
           "2YR",
           "3BR",
           "3FG",
           "3NR"
        ],
        "images": [
           "ship/galactic-empire/tie-reaper.png"
        ],
        "silhouette": "silhouette/tie-reaper.png",
        "key": "tieReaper"
     },
     "tieSfFighter": {
        "name": "TIE/sf Fighter",
        "xws": "tiesffighter",
        "faction": [
           "First Order"
        ],
        "actions": [
           "Barrel Roll",
           "Focus",
           "Target Lock"
        ],
        "size": "small",
        "attack": 2,
        "agility": 2,
        "hull": 3,
        "shields": 3,
        "id": 39,
        "firing_arcs": [
           "Auxiliary Rear",
           "Front"
        ],
        "dial": [
           "1TR",
           "1BG",
           "1FG",
           "1NG",
           "1YR",
           "2TW",
           "2BW",
           "2FG",
           "2NW",
           "2YW",
           "3LR",
           "3TR",
           "3BW",
           "3FG",
           "3NW",
           "3YR",
           "3PR",
           "4FW"
        ],
        "images": [
           "ship/first-order/tie-sf-fighter.png"
        ],
        "silhouette": "silhouette/tie-sf-fighter.png",
        "key": "tieSfFighter"
     },
     "tieSilencer": {
        "name": "TIE Silencer",
        "xws": "tiesilencer",
        "faction": [
           "First Order"
        ],
        "actions": [
           "Barrel Roll",
           "Boost",
           "Focus",
           "Target Lock"
        ],
        "size": "small",
        "attack": 3,
        "agility": 3,
        "hull": 4,
        "shields": 2,
        "firing_arcs": [
           "Front"
        ],
        "id": 53,
        "dial": [
           "1TW",
           "1YW",
           "2TG",
           "2BG",
           "2FG",
           "2NG",
           "2YG",
           "3ER",
           "3TW",
           "3BG",
           "3FG",
           "3NG",
           "3YW",
           "3RR",
           "4FG",
           "4KR",
           "5FG"
        ],
        "images": [
           "ship/first-order/tie-silencer.png"
        ],
        "silhouette": "silhouette/tie-silencer.png",
        "key": "tieSilencer"
     },
     "tieStriker": {
        "name": "TIE Striker",
        "xws": "tiestriker",
        "faction": [
           "Galactic Empire"
        ],
        "actions": [
           "Barrel Roll",
           "Evade",
           "Focus"
        ],
        "size": "small",
        "attack": 3,
        "agility": 2,
        "hull": 4,
        "shields": 0,
        "id": 44,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "1TW",
           "1BG",
           "1FG",
           "1NG",
           "1YW",
           "2TW",
           "2BW",
           "2FG",
           "2NW",
           "2YW",
           "2LR",
           "2KR",
           "2PR",
           "3BW",
           "3FG",
           "3NW"
        ],
        "images": [
           "ship/galactic-empire/tie-striker.png"
        ],
        "silhouette": "silhouette/tie-striker.png",
        "key": "tieStriker"
     },
     "uWing": {
        "name": "U-wing",
        "xws": "uwing",
        "faction": [
           "Rebel Alliance"
        ],
        "actions": [
           "Target Lock",
           "Focus"
        ],
        "size": "large",
        "attack": 3,
        "agility": 1,
        "hull": 4,
        "shields": 4,
        "id": 45,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "0OR",
           "1BG",
           "1FG",
           "1NG",
           "2TW",
           "2BG",
           "2FG",
           "2NG",
           "2YW",
           "3BW",
           "3FW",
           "3NW",
           "4FW"
        ],
        "images": [
           "ship/rebel-alliance/u-wing.png"
        ],
        "silhouette": "silhouette/u-wing.png",
        "key": "uWing"
     },
     "upsilonClassShuttle": {
        "name": "Upsilon-class Shuttle",
        "xws": "upsilonclassshuttle",
        "faction": [
           "First Order"
        ],
        "actions": [
           "Coordinate",
           "Focus",
           "Target Lock"
        ],
        "size": "large",
        "attack": 4,
        "agility": 1,
        "hull": 6,
        "shields": 6,
        "id": 42,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "0OR",
           "1TR",
           "1BW",
           "1FG",
           "1NW",
           "1YR",
           "2TW",
           "2BG",
           "2FG",
           "2NG",
           "2YW",
           "3TR",
           "3BW",
           "3FW",
           "3NW",
           "3YR"
        ],
        "images": [
           "ship/first-order/upsilon-class-shuttle.png"
        ],
        "silhouette": "silhouette/upsilon-class-shuttle.png",
        "key": "upsilonClassShuttle"
     },
     "vcx100": {
        "name": "VCX-100",
        "faction": [
           "Rebel Alliance"
        ],
        "actions": [
           "Focus",
           "Evade",
           "Target Lock"
        ],
        "attack": 4,
        "agility": 0,
        "hull": 10,
        "shields": 6,
        "size": "large",
        "xws": "vcx100",
        "id": 32,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "1TR",
           "1BW",
           "1FG",
           "1NW",
           "1YR",
           "2TW",
           "2BG",
           "2FG",
           "2NG",
           "2YW",
           "3TR",
           "3BW",
           "3FW",
           "3NW",
           "3YR",
           "4FW",
           "5KR"
        ],
        "images": [
           "ship/rebel-alliance/vcx-100.png"
        ],
        "silhouette": "silhouette/vcx-100.png",
        "key": "vcx100"
     },
     "vt49Decimator": {
        "name": "VT-49 Decimator",
        "faction": [
           "Galactic Empire"
        ],
        "attack": 3,
        "agility": 0,
        "hull": 12,
        "shields": 4,
        "actions": [
           "Focus",
           "Target Lock"
        ],
        "size": "large",
        "xws": "vt49decimator",
        "id": 20,
        "firing_arcs": [
           "Front",
           "Turret"
        ],
        "dial": [
           "1BW",
           "1FW",
           "1NW",
           "2TW",
           "2BG",
           "2FG",
           "2NG",
           "2YW",
           "3TW",
           "3BW",
           "3FG",
           "3NW",
           "3YW",
           "4FW"
        ],
        "images": [
           "ship/galactic-empire/vt-49-decimator.png"
        ],
        "silhouette": "silhouette/vt-49-decimator.png",
        "key": "vt49Decimator"
     },
     "xWing": {
        "name": "X-wing",
        "faction": [
           "Rebel Alliance"
        ],
        "attack": 3,
        "agility": 2,
        "hull": 3,
        "shields": 2,
        "actions": [
           "Focus",
           "Target Lock"
        ],
        "size": "small",
        "xws": "xwing",
        "id": 0,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "1BG",
           "1FG",
           "1NG",
           "2TW",
           "2BW",
           "2FG",
           "2NW",
           "2YW",
           "3TW",
           "3BW",
           "3FW",
           "3NW",
           "3YW",
           "4FW",
           "4KR"
        ],
        "images": [
           "ship/rebel-alliance/x-wing.png"
        ],
        "silhouette": "silhouette/x-wing.png",
        "key": "xWing"
     },
     "yWing": {
        "name": "Y-wing",
        "faction": [
           "Rebel Alliance",
           "Scum and Villainy"
        ],
        "attack": 2,
        "agility": 1,
        "hull": 5,
        "shields": 3,
        "actions": [
           "Focus",
           "Target Lock"
        ],
        "size": "small",
        "xws": "ywing",
        "id": 1,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "1BW",
           "1FG",
           "1NW",
           "2TW",
           "2BW",
           "2FG",
           "2NW",
           "2YW",
           "3TR",
           "3BW",
           "3FW",
           "3NW",
           "3YR",
           "4FR",
           "4KR"
        ],
        "images": [
           "ship/rebel-alliance/y-wing.png",
           "ship/scum-and-villainy/y-wing.png"
        ],
        "silhouette": "silhouette/y-wing.png",
        "key": "yWing"
     },
     "yt1300": {
        "name": "YT-1300",
        "faction": [
           "Rebel Alliance",
           "Resistance"
        ],
        "attack": 3,
        "agility": 1,
        "hull": 8,
        "shields": 5,
        "actions": [
           "Focus",
           "Target Lock"
        ],
        "size": "large",
        "xws": "yt1300",
        "id": 3,
        "firing_arcs": [
           "Front",
           "Turret"
        ],
        "dial": [
           "1TW",
           "1BG",
           "1FG",
           "1NG",
           "1YW",
           "2TW",
           "2BW",
           "2FG",
           "2NW",
           "2YW",
           "3BW",
           "3FW",
           "3NW",
           "3KR",
           "4FW",
           "4KR"
        ],
        "images": [
           "ship/rebel-alliance/yt-1300.png",
           "ship/resistance/yt-1300.png"
        ],
        "silhouette": "silhouette/yt-1300.png",
        "key": "yt1300"
     },
     "yt2400": {
        "name": "YT-2400",
        "faction": [
           "Rebel Alliance"
        ],
        "attack": 2,
        "agility": 2,
        "hull": 5,
        "shields": 5,
        "actions": [
           "Focus",
           "Target Lock",
           "Barrel Roll"
        ],
        "size": "large",
        "xws": "yt2400",
        "id": 19,
        "firing_arcs": [
           "Front",
           "Turret"
        ],
        "dial": [
           "1TW",
           "1BG",
           "1FG",
           "1NG",
           "1YW",
           "2TW",
           "2BW",
           "2FG",
           "2NW",
           "2YW",
           "3TW",
           "3BW",
           "3FW",
           "3NW",
           "3YW",
           "4FW",
           "4KR"
        ],
        "images": [
           "ship/rebel-alliance/yt-2400.png"
        ],
        "silhouette": "silhouette/yt-2400.png",
        "key": "yt2400"
     },
     "yv666": {
        "name": "YV-666",
        "faction": [
           "Scum and Villainy"
        ],
        "attack": 3,
        "agility": 1,
        "hull": 6,
        "shields": 6,
        "actions": [
           "Focus",
           "Target Lock"
        ],
        "size": "large",
        "xws": "yv666",
        "id": 26,
        "firing_arcs": [
           "Auxiliary 180",
           "Front"
        ],
        "dial": [
           "0OR",
           "1BG",
           "1FG",
           "1NG",
           "2TR",
           "2BW",
           "2FG",
           "2NW",
           "2YR",
           "3TW",
           "3BW",
           "3FG",
           "3NW",
           "3YW",
           "4FW"
        ],
        "images": [
           "ship/scum-and-villainy/yv-666.png"
        ],
        "silhouette": "silhouette/yv-666.png",
        "key": "yv666"
     },
     "z95Headhunter": {
        "name": "Z-95 Headhunter",
        "faction": [
           "Rebel Alliance",
           "Scum and Villainy"
        ],
        "attack": 2,
        "agility": 2,
        "hull": 2,
        "shields": 2,
        "actions": [
           "Focus",
           "Target Lock"
        ],
        "size": "small",
        "xws": "z95headhunter",
        "id": 13,
        "firing_arcs": [
           "Front"
        ],
        "dial": [
           "1BW",
           "1FG",
           "1NW",
           "2TW",
           "2BG",
           "2FG",
           "2NG",
           "2YW",
           "3TW",
           "3BW",
           "3FW",
           "3NW",
           "3YW",
           "3KR",
           "4FW"
        ],
        "images": [
           "ship/rebel-alliance/z-95-headhunter.png",
           "ship/scum-and-villainy/z-95-headhunter.png"
        ],
        "silhouette": "silhouette/z-95-headhunter.png",
        "key": "z95Headhunter"
     }
  };

  Object.freeze(Ship);

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

  const ShipBase = {

    HUGE: "huge",
    LARGE: "large",
    SMALL: "small",
  };

  ShipBase.properties = 
  {
     "huge": {
        "name": "huge",
        "width": 192,
        "height": 80,
        "key": "huge"
     },
     "large": {
        "name": "large",
        "width": 80,
        "height": 80,
        "key": "large"
     },
     "small": {
        "name": "small",
        "width": 40,
        "height": 40,
        "key": "small"
     }
  };

  Object.freeze(ShipBase);

  const Source = {

    A_WING_EXPANSION_PACK: "aWingExpansionPack",
    ALPHA_CLASS_STAR_WING_EXPANSION_PACK: "alphaClassStarWingExpansionPack",
    ARC_170_EXPANSION_PACK: "arc170ExpansionPack",
    AUZITUCK_GUNSHIP_EXPANSION_PACK: "auzituckGunshipExpansionPack",
    B_WING_EXPANSION_PACK: "bWingExpansionPack",
    C_ROC_CRUISER_EXPANSION_PACK: "cRocCruiserExpansionPack",
    CORE_SET: "coreSet",
    E_WING_EXPANSION_PACK: "eWingExpansionPack",
    GHOST_EXPANSION_PACK: "ghostExpansionPack",
    GUNS_FOR_HIRE_EXPANSION_PACK: "gunsForHireExpansionPack",
    HEROES_OF_THE_RESISTANCE_EXPANSION_PACK: "heroesOfTheResistanceExpansionPack",
    HOUNDS_TOOTH_EXPANSION_PACK: "houndsToothExpansionPack",
    HWK_290_EXPANSION_PACK: "hwk290ExpansionPack",
    IG_2000_EXPANSION_PACK: "ig2000ExpansionPack",
    IMPERIAL_ACES_EXPANSION_PACK: "imperialAcesExpansionPack",
    IMPERIAL_ASSAULT_CARRIER_EXPANSION_PACK: "imperialAssaultCarrierExpansionPack",
    IMPERIAL_RAIDER_EXPANSION_PACK: "imperialRaiderExpansionPack",
    IMPERIAL_VETERANS_EXPANSION_PACK: "imperialVeteransExpansionPack",
    INQUISITORS_TIE_EXPANSION_PACK: "inquisitorsTieExpansionPack",
    K_WING_EXPANSION_PACK: "kWingExpansionPack",
    KIHRAXZ_FIGHTER_EXPANSION_PACK: "kihraxzFighterExpansionPack",
    LAMBDA_CLASS_SHUTTLE_EXPANSION_PACK: "lambdaClassShuttleExpansionPack",
    M12_L_KIMOGILA_FIGHTER_EXPANSION_PACK: "m12LKimogilaFighterExpansionPack",
    M3_A_INTERCEPTOR_EXPANSION_PACK: "m3AInterceptorExpansionPack",
    MILLENNIUM_FALCON_EXPANSION_PACK: "millenniumFalconExpansionPack",
    MIST_HUNTER_EXPANSION_PACK: "mistHunterExpansionPack",
    MOST_WANTED_EXPANSION_PACK: "mostWantedExpansionPack",
    PHANTOM_II_EXPANSION_PACK: "phantomIiExpansionPack",
    PROTECTORATE_STARFIGHTER_EXPANSION_PACK: "protectorateStarfighterExpansionPack",
    PUNISHING_ONE_EXPANSION_PACK: "punishingOneExpansionPack",
    QUADJUMPER_EXPANSION_PACK: "quadjumperExpansionPack",
    REBEL_ACES_EXPANSION_PACK: "rebelAcesExpansionPack",
    REBEL_TRANSPORT_EXPANSION_PACK: "rebelTransportExpansionPack",
    RESISTANCE_BOMBER_EXPANSION_PACK: "resistanceBomberExpansionPack",
    SABINES_TIE_FIGHTER_EXPANSION_PACK: "sabinesTieFighterExpansionPack",
    SAWS_RENEGADES_EXPANSION_PACK: "sawsRenegadesExpansionPack",
    SCURRG_H_6_BOMBER_EXPANSION_PACK: "scurrgH6BomberExpansionPack",
    SHADOW_CASTER_EXPANSION_PACK: "shadowCasterExpansionPack",
    SLAVE_I_EXPANSION_PACK: "slaveIExpansionPack",
    SPECIAL_FORCES_TIE_EXPANSION_PACK: "specialForcesTieExpansionPack",
    STARVIPER_EXPANSION_PACK: "starviperExpansionPack",
    T_70_X_WING_EXPANSION_PACK: "t70XWingExpansionPack",
    TANTIVE_IV_EXPANSION_PACK: "tantiveIvExpansionPack",
    THE_FORCE_AWAKENS_CORE_SET: "theForceAwakensCoreSet",
    TIE_ADVANCED_EXPANSION_PACK: "tieAdvancedExpansionPack",
    TIE_AGGRESSOR_EXPANSION_PACK: "tieAggressorExpansionPack",
    TIE_BOMBER_EXPANSION_PACK: "tieBomberExpansionPack",
    TIE_DEFENDER_EXPANSION_PACK: "tieDefenderExpansionPack",
    TIE_FIGHTER_EXPANSION_PACK: "tieFighterExpansionPack",
    TIE_FO_FIGHTER_EXPANSION_PACK: "tieFoFighterExpansionPack",
    TIE_INTERCEPTOR_EXPANSION_PACK: "tieInterceptorExpansionPack",
    TIE_PHANTOM_EXPANSION_PACK: "tiePhantomExpansionPack",
    TIE_PUNISHER_EXPANSION_PACK: "tiePunisherExpansionPack",
    TIE_REAPER_EXPANSION_PACK: "tieReaperExpansionPack",
    TIE_SILENCER_EXPANSION_PACK: "tieSilencerExpansionPack",
    TIE_STRIKER_EXPANSION_PACK: "tieStrikerExpansionPack",
    U_WING_EXPANSION_PACK: "uWingExpansionPack",
    UPSILON_CLASS_SHUTTLE_EXPANSION_PACK: "upsilonClassShuttleExpansionPack",
    VT_49_DECIMATOR_EXPANSION_PACK: "vt49DecimatorExpansionPack",
    X_WING_EXPANSION_PACK: "xWingExpansionPack",
    Y_WING_EXPANSION_PACK: "yWingExpansionPack",
    YT_2400_FREIGHTER_EXPANSION_PACK: "yt2400FreighterExpansionPack",
    Z_95_HEADHUNTER_EXPANSION_PACK: "z95HeadhunterExpansionPack",
  };

  Source.properties = 
  {
     "aWingExpansionPack": {
        "id": 6,
        "name": "A-wing Expansion Pack",
        "thumb": "sources/a-wing-expansion-pack-thumb.jpg",
        "image": "sources/a-wing-expansion-pack-product.png",
        "wave": 2,
        "released": true,
        "contents": {
           "ships": {
              "2": 1
           },
           "pilots": {
              "29": 1,
              "30": 1,
              "31": 1,
              "32": 1
           },
           "upgrades": {
              "13": 1,
              "14": 1,
              "17": 1,
              "18": 1,
              "19": 1
           },
           "reference-cards": [
              2
           ]
        },
        "sku": "SWX08",
        "release_date": "2013-02-28",
        "announcement_date": "2012-09-14",
        "key": "aWingExpansionPack"
     },
     "alphaClassStarWingExpansionPack": {
        "name": "Alpha-class Star Wing Expansion Pack",
        "wave": 12,
        "sku": "SWX69",
        "announcement_date": "2017-08-21",
        "released": true,
        "id": 56,
        "thumb": "sources/swx69-thumb.jpg",
        "image": "sources/swx69-product.png",
        "contents": {
           "pilots": {
              "265": 1,
              "270": 1,
              "271": 1,
              "272": 1
           },
           "upgrades": {
              "189": 1,
              "328": 1,
              "331": 1,
              "338": 1,
              "339": 1,
              "340": 1,
              "341": 1
           },
           "ships": {
              "50": 1
           },
           "reference-cards": [
              3,
              11,
              26
           ]
        },
        "release_date": "2017-12-08",
        "key": "alphaClassStarWingExpansionPack"
     },
     "arc170ExpansionPack": {
        "name": "ARC-170 Expansion Pack",
        "wave": 9,
        "contents": {
           "ships": {
              "38": 1
           },
           "pilots": {
              "196": 1,
              "201": 1,
              "202": 1,
              "203": 1
           },
           "upgrades": {
              "38": 1,
              "42": 1,
              "246": 1,
              "250": 2,
              "251": 2,
              "252": 1,
              "259": 1
           },
           "reference-cards": [
              20
           ]
        },
        "image": "sources/arc-170-expansion-pack-product.png",
        "id": 42,
        "thumb": "sources/arc-170-expansion-pack-thumb.jpg",
        "released": true,
        "sku": "SWX53",
        "release_date": "2016-09-22",
        "announcement_date": "2016-06-02",
        "key": "arc170ExpansionPack"
     },
     "auzituckGunshipExpansionPack": {
        "name": "Auzituck Gunship Expansion Pack",
        "wave": 11,
        "contents": {
           "ships": {
              "47": 1
           },
           "upgrades": {
              "61": 1,
              "103": 1,
              "179": 1,
              "315": 1,
              "322": 1,
              "323": 1
           },
           "pilots": {
              "249": 1,
              "254": 1,
              "255": 1,
              "259": 1
           },
           "reference-cards": [
              3,
              20,
              23
           ]
        },
        "id": 52,
        "image": "sources/swx64-product.png",
        "thumb": "sources/swx64-thumb.jpg",
        "sku": "SWX64",
        "announcement_date": "2017-03-15",
        "release_date": "2017-07-13",
        "released": true,
        "key": "auzituckGunshipExpansionPack"
     },
     "bWingExpansionPack": {
        "id": 9,
        "name": "B-wing Expansion Pack",
        "image": "sources/b-wing-expansion-pack-product.jpg",
        "thumb": "sources/b-wing-expansion-pack-thumb.jpg",
        "wave": 3,
        "released": true,
        "contents": {
           "ships": {
              "10": 1
           },
           "pilots": {
              "41": 1,
              "42": 1,
              "43": 1,
              "44": 1
           },
           "upgrades": {
              "1": 1,
              "22": 1,
              "34": 1,
              "35": 1,
              "36": 1
           },
           "reference-cards": [
              0
           ]
        },
        "sku": "SWX14",
        "release_date": "2013-09-12",
        "announcement_date": "2013-05-04",
        "key": "bWingExpansionPack"
     },
     "cRocCruiserExpansionPack": {
        "name": "C-ROC Cruiser Expansion Pack",
        "wave": "Iconic Starships",
        "sku": "SWX58",
        "contents": {
           "ships": {
              "22": 1,
              "46": 1
           },
           "pilots": {
              "122": 1,
              "125": 1,
              "238": 1,
              "243": 1,
              "244": 1,
              "245": 1,
              "246": 1
           },
           "upgrades": {
              "165": 1,
              "299": 1,
              "300": 1,
              "301": 1,
              "302": 1,
              "303": 6,
              "305": 1,
              "306": 1,
              "307": 2,
              "308": 1,
              "309": 5,
              "310": 5,
              "311": 5,
              "316": 1,
              "321": 1
           },
           "reference-cards": []
        },
        "id": 51,
        "image": "sources/swx58-product.png",
        "thumb": "sources/swx58-thumb.jpg",
        "announcement_date": "2017-01-09",
        "release_date": "2017-06-08",
        "released": true,
        "key": "cRocCruiserExpansionPack"
     },
     "coreSet": {
        "id": 0,
        "name": "Core Set",
        "image": "sources/core-product.jpg",
        "thumb": "sources/core-thumb.jpg",
        "wave": 0,
        "released": true,
        "contents": {
           "ships": {
              "0": 1,
              "4": 2
           },
           "pilots": {
              "2": 1,
              "3": 1,
              "4": 1,
              "5": 1,
              "10": 2,
              "11": 2,
              "12": 2,
              "14": 1,
              "16": 1,
              "17": 1
           },
           "upgrades": {
              "1": 1,
              "3": 1,
              "4": 1,
              "8": 1,
              "12": 1
           },
           "reference-cards": []
        },
        "sku": "SWX01",
        "release_date": "2012-09-14",
        "announcement_date": "2011-08-02",
        "key": "coreSet"
     },
     "eWingExpansionPack": {
        "id": 16,
        "name": "E-wing Expansion Pack",
        "image": "sources/e-wing-expansion-pack-product.jpg",
        "thumb": "sources/e-wing-expansion-pack-thumb.jpg",
        "wave": 4,
        "released": true,
        "contents": {
           "ships": {
              "15": 1
           },
           "pilots": {
              "71": 1,
              "72": 1,
              "73": 1,
              "74": 1
           },
           "upgrades": {
              "43": 1,
              "56": 1,
              "58": 1,
              "59": 1,
              "60": 1
           },
           "reference-cards": [
              2
           ]
        },
        "sku": "SWX18",
        "release_date": "2014-06-26",
        "announcement_date": "2014-02-07",
        "key": "eWingExpansionPack"
     },
     "ghostExpansionPack": {
        "name": "Ghost Expansion Pack",
        "wave": 8,
        "image": "sources/ghost-expansion-pack-product.jpg",
        "thumb": "sources/ghost-expansion-pack-thumb.jpg",
        "id": 38,
        "contents": {
           "ships": {
              "32": 1,
              "33": 1
           },
           "pilots": {
              "160": 1,
              "169": 1,
              "172": 1,
              "173": 1,
              "174": 1,
              "175": 1,
              "176": 1,
              "186": 1
           },
           "upgrades": {
              "34": 1,
              "57": 1,
              "135": 1,
              "139": 1,
              "197": 1,
              "198": 1,
              "210": 1,
              "211": 1,
              "212": 2,
              "213": 1,
              "215": 1,
              "216": 1,
              "217": 1,
              "218": 1,
              "242": 1
           },
           "reference-cards": [
              9,
              10,
              15
           ]
        },
        "released": true,
        "sku": "SWX39",
        "release_date": "2016-03-17",
        "announcement_date": "2015-07-31",
        "key": "ghostExpansionPack"
     },
     "gunsForHireExpansionPack": {
        "name": "Guns for Hire Expansion Pack",
        "wave": "Iconic Starships",
        "sku": "SWX73",
        "contents": {
           "ships": {
              "21": 1,
              "27": 1
           },
           "upgrades": {
              "174": 1,
              "251": 1,
              "309": 2,
              "319": 2,
              "320": 2,
              "329": 2,
              "330": 2
           },
           "pilots": {
              "253": 1,
              "261": 2,
              "262": 1,
              "263": 1,
              "264": 1
           },
           "conditions": {
              "4": 1,
              "5": 1,
              "6": 2
           }
        },
        "id": 55,
        "image": "sources/swx73-product.png",
        "thumb": "sources/swx73-thumb.jpg",
        "announcement_date": "2017-05-30",
        "released": true,
        "release_date": "2017-10-26",
        "key": "gunsForHireExpansionPack"
     },
     "heroesOfTheResistanceExpansionPack": {
        "wave": "Iconic Starships",
        "name": "Heroes of the Resistance Expansion Pack",
        "contents": {
           "ships": {
              "3": 1,
              "30": 1
           },
           "pilots": {
              "155": 1,
              "158": 1,
              "194": 1,
              "195": 1,
              "219": 1,
              "220": 1,
              "221": 1,
              "222": 1,
              "223": 1,
              "224": 1
           },
           "upgrades": {
              "193": 2,
              "243": 1,
              "244": 1,
              "273": 1,
              "274": 2,
              "275": 1,
              "276": 1,
              "277": 1,
              "278": 2,
              "279": 2,
              "280": 1,
              "281": 1,
              "282": 2
           },
           "reference-cards": []
        },
        "image": "sources/heroes-of-the-resistance-expansion-pack-product.png",
        "id": 41,
        "thumb": "sources/heroes-of-the-resistance-expansion-pack-thumb.jpg",
        "sku": "SWX57",
        "released": true,
        "release_date": "2016-10-27",
        "announcement_date": "2016-05-04",
        "key": "heroesOfTheResistanceExpansionPack"
     },
     "houndsToothExpansionPack": {
        "id": 28,
        "name": "Hound's Tooth Expansion Pack",
        "image": "sources/hounds-tooth-expansion-pack-product.jpg",
        "thumb": "sources/hounds-tooth-expansion-pack-thumb.jpg",
        "wave": 7,
        "released": true,
        "contents": {
           "ships": {
              "26": 1
           },
           "pilots": {
              "131": 1,
              "132": 1,
              "133": 1,
              "134": 1,
              "146": 1
           },
           "upgrades": {
              "23": 1,
              "96": 1,
              "99": 1,
              "119": 1,
              "120": 1,
              "130": 1,
              "131": 1,
              "132": 1,
              "141": 1,
              "176": 1,
              "191": 1,
              "192": 2
           },
           "reference-cards": [
              0,
              2
           ]
        },
        "sku": "SWX31",
        "release_date": "2015-08-25",
        "announcement_date": "2015-04-20",
        "key": "houndsToothExpansionPack"
     },
     "hwk290ExpansionPack": {
        "id": 10,
        "name": "HWK-290 Expansion Pack",
        "image": "sources/hwk-290-expansion-pack-product.jpg",
        "thumb": "sources/hwk-290-expansion-pack-thumb.jpg",
        "wave": 3,
        "released": true,
        "contents": {
           "ships": {
              "8": 1
           },
           "pilots": {
              "45": 1,
              "46": 1,
              "47": 1,
              "48": 1
           },
           "upgrades": {
              "0": 1,
              "37": 1,
              "38": 1,
              "39": 1,
              "40": 1,
              "153": 1
           },
           "reference-cards": [
              0,
              3
           ]
        },
        "sku": "SWX12",
        "release_date": "2013-09-12",
        "announcement_date": "2013-05-04",
        "key": "hwk290ExpansionPack"
     },
     "ig2000ExpansionPack": {
        "id": 26,
        "name": "IG-2000 Expansion Pack",
        "image": "sources/ig-2000-expansion-pack-product.jpg",
        "thumb": "sources/ig-2000-expansion-pack-thumb.jpg",
        "wave": 6,
        "released": true,
        "contents": {
           "ships": {
              "23": 1
           },
           "pilots": {
              "103": 1,
              "104": 1,
              "105": 1,
              "106": 1
           },
           "upgrades": {
              "24": 1,
              "28": 1,
              "35": 1,
              "106": 1,
              "107": 1,
              "113": 2,
              "114": 2,
              "115": 1,
              "124": 1,
              "166": 1
           },
           "reference-cards": [
              1,
              8
           ]
        },
        "sku": "SWX27",
        "release_date": "2015-02-26",
        "announcement_date": "2014-08-15",
        "key": "ig2000ExpansionPack"
     },
     "imperialAcesExpansionPack": {
        "id": 13,
        "name": "Imperial Aces Expansion Pack",
        "image": "sources/imperial-aces-expansion-pack-product.jpg",
        "thumb": "sources/imperial-aces-expansion-pack-thumb.jpg",
        "wave": "Iconic Starships",
        "released": true,
        "contents": {
           "ships": {
              "6": 2
           },
           "pilots": {
              "25": 2,
              "57": 1,
              "58": 2,
              "59": 1,
              "60": 1,
              "61": 1
           },
           "upgrades": {
              "18": 2,
              "49": 2,
              "155": 2,
              "175": 2,
              "178": 2,
              "179": 2
           },
           "reference-cards": []
        },
        "sku": "SWX21",
        "release_date": "2014-03-14",
        "announcement_date": "2013-09-16",
        "key": "imperialAcesExpansionPack"
     },
     "imperialAssaultCarrierExpansionPack": {
        "name": "Imperial Assault Carrier Expansion Pack",
        "wave": "Iconic Starships",
        "image": "sources/imperial-assault-carrier-expansion-pack-product.jpg",
        "thumb": "sources/imperial-assault-carrier-expansion-pack-thumb.jpg",
        "id": 39,
        "contents": {
           "ships": {
              "4": 2,
              "37": 1
           },
           "pilots": {
              "10": 2,
              "11": 2,
              "12": 2,
              "164": 1,
              "165": 1,
              "166": 1,
              "167": 1,
              "168": 1
           },
           "upgrades": {
              "11": 1,
              "12": 1,
              "14": 1,
              "17": 1,
              "20": 1,
              "104": 1,
              "200": 1,
              "201": 2,
              "202": 3,
              "203": 3,
              "204": 2,
              "205": 1,
              "206": 1,
              "207": 1,
              "223": 2,
              "224": 1,
              "225": 2,
              "226": 1,
              "227": 1,
              "228": 1
           },
           "reference-cards": []
        },
        "released": true,
        "sku": "SWX35",
        "release_date": "2015-12-21",
        "announcement_date": "2015-07-31",
        "key": "imperialAssaultCarrierExpansionPack"
     },
     "imperialRaiderExpansionPack": {
        "id": 27,
        "name": "Imperial Raider Expansion Pack",
        "image": "sources/imperial-raider-expansion-pack-product.jpg",
        "thumb": "sources/imperial-raider-expansion-pack-thumb.jpg",
        "wave": "Iconic Starships",
        "released": true,
        "contents": {
           "ships": {
              "5": 1,
              "24": 1,
              "25": 1
           },
           "pilots": {
              "20": 1,
              "21": 1,
              "120": 1,
              "123": 1,
              "124": 1,
              "128": 1,
              "129": 1,
              "130": 1
           },
           "upgrades": {
              "14": 1,
              "50": 1,
              "64": 2,
              "65": 2,
              "66": 1,
              "68": 1,
              "73": 1,
              "90": 1,
              "91": 1,
              "92": 1,
              "121": 4,
              "122": 4,
              "126": 1,
              "127": 1,
              "128": 1,
              "129": 1,
              "143": 1,
              "170": 4,
              "171": 1,
              "172": 1,
              "173": 1
           },
           "reference-cards": [
              0
           ]
        },
        "sku": "SWX30",
        "release_date": "2015-08-13",
        "announcement_date": "2014-12-19",
        "key": "imperialRaiderExpansionPack"
     },
     "imperialVeteransExpansionPack": {
        "name": "Imperial Veterans Expansion Pack",
        "wave": "Iconic Starships",
        "image": "sources/imperial-veterans-expansion-pack-product.jpg",
        "thumb": "sources/imperial-veterans-expansion-pack-thumb.jpg",
        "id": 40,
        "contents": {
           "ships": {
              "11": 1,
              "14": 1
           },
           "pilots": {
              "177": 1,
              "178": 2,
              "190": 1,
              "191": 2,
              "192": 1,
              "193": 1
           },
           "upgrades": {
              "28": 1,
              "139": 1,
              "141": 1,
              "195": 1,
              "219": 2,
              "220": 2,
              "221": 2,
              "222": 2,
              "245": 1
           },
           "reference-cards": [
              10,
              14,
              17
           ]
        },
        "released": true,
        "sku": "SWX52",
        "release_date": "2016-06-30",
        "announcement_date": "2015-12-14",
        "key": "imperialVeteransExpansionPack"
     },
     "inquisitorsTieExpansionPack": {
        "name": "Inquisitor's TIE Expansion Pack",
        "wave": 8,
        "image": "sources/inquisitors-tie-expansion-pack-product.jpg",
        "thumb": "sources/inquisitors-tie-expansion-pack-thumb.jpg",
        "id": 37,
        "contents": {
           "ships": {
              "36": 1
           },
           "pilots": {
              "163": 1,
              "180": 1,
              "181": 1,
              "187": 1
           },
           "upgrades": {
              "17": 1,
              "19": 1,
              "199": 1,
              "208": 1,
              "229": 1
           },
           "reference-cards": [
              2,
              3
           ]
        },
        "released": true,
        "sku": "SWX40",
        "release_date": "2016-03-17",
        "announcement_date": "2015-07-31",
        "key": "inquisitorsTieExpansionPack"
     },
     "kWingExpansionPack": {
        "id": 30,
        "name": "K-wing Expansion Pack",
        "image": "sources/k-wing-expansion-pack-product.jpg",
        "thumb": "sources/k-wing-expansion-pack-thumb.jpg",
        "wave": 7,
        "released": true,
        "contents": {
           "ships": {
              "28": 1
           },
           "pilots": {
              "139": 1,
              "140": 1,
              "141": 1,
              "147": 1
           },
           "upgrades": {
              "134": 1,
              "135": 1,
              "136": 1,
              "137": 1,
              "138": 2,
              "140": 1,
              "142": 1,
              "189": 1
           },
           "reference-cards": [
              0,
              3,
              4,
              11,
              12,
              13
           ]
        },
        "sku": "SWX33",
        "release_date": "2015-08-25",
        "announcement_date": "2015-04-20",
        "key": "kWingExpansionPack"
     },
     "kihraxzFighterExpansionPack": {
        "id": 29,
        "name": "Kihraxz Fighter Expansion Pack",
        "image": "sources/kihraxz-fighter-expansion-pack-product.jpg",
        "thumb": "sources/kihraxz-fighter-expansion-pack-thumb.jpg",
        "wave": 7,
        "released": true,
        "contents": {
           "ships": {
              "27": 1
           },
           "pilots": {
              "135": 1,
              "136": 1,
              "137": 1,
              "138": 1
           },
           "upgrades": {
              "17": 1,
              "57": 1,
              "130": 1,
              "133": 1,
              "141": 1
           },
           "reference-cards": []
        },
        "sku": "SWX32",
        "release_date": "2015-08-25",
        "announcement_date": "2015-04-20",
        "key": "kihraxzFighterExpansionPack"
     },
     "lambdaClassShuttleExpansionPack": {
        "id": 12,
        "name": "Lambda-class Shuttle Expansion Pack",
        "image": "sources/lambda-class-shuttle-expansion-pack-product.jpg",
        "thumb": "sources/lambda-class-shuttle-expansion-pack-thumb.jpg",
        "wave": 3,
        "released": true,
        "contents": {
           "ships": {
              "9": 1
           },
           "pilots": {
              "53": 1,
              "54": 1,
              "55": 1,
              "56": 1
           },
           "upgrades": {
              "23": 1,
              "29": 1,
              "40": 1,
              "43": 1,
              "44": 1,
              "45": 1,
              "46": 1,
              "47": 1,
              "48": 1,
              "154": 1,
              "177": 2
           },
           "reference-cards": []
        },
        "sku": "SWX13",
        "release_date": "2013-09-12",
        "announcement_date": "2013-05-04",
        "key": "lambdaClassShuttleExpansionPack"
     },
     "m12LKimogilaFighterExpansionPack": {
        "name": "M12-L Kimogila Fighter Expansion Pack",
        "wave": 12,
        "sku": "SWX70",
        "announcement_date": "2017-08-21",
        "released": true,
        "image": "sources/swx70-product.png",
        "thumb": "sources/swx70-thumb.jpg",
        "id": 57,
        "contents": {
           "ships": {
              "51": 1
           },
           "upgrades": {
              "113": 1,
              "136": 1,
              "332": 1,
              "341": 2,
              "342": 2,
              "352": 2,
              "353": 1
           },
           "pilots": {
              "266": 1,
              "273": 1,
              "274": 1,
              "282": 1
           },
           "reference-cards": [
              3,
              25,
              26
           ]
        },
        "release_date": "2017-12-08",
        "key": "m12LKimogilaFighterExpansionPack"
     },
     "m3AInterceptorExpansionPack": {
        "id": 25,
        "name": "M3-A Interceptor Expansion Pack",
        "image": "sources/m3-a-interceptor-expansion-pack-product.jpg",
        "thumb": "sources/m3-a-interceptor-expansion-pack-thumb.jpg",
        "wave": 6,
        "released": true,
        "contents": {
           "ships": {
              "22": 1
           },
           "pilots": {
              "102": 1,
              "121": 1,
              "122": 1,
              "125": 1
           },
           "upgrades": {
              "22": 1,
              "123": 1,
              "124": 1,
              "165": 1,
              "174": 1
           },
           "reference-cards": [
              0,
              3
           ]
        },
        "sku": "SWX26",
        "release_date": "2015-02-26",
        "announcement_date": "2014-08-15",
        "key": "m3AInterceptorExpansionPack"
     },
     "millenniumFalconExpansionPack": {
        "id": 7,
        "name": "Millennium Falcon Expansion Pack",
        "image": "sources/millennium-falcon-expansion-pack-product.png",
        "thumb": "sources/millennium-falcon-expansion-pack-thumb.jpg",
        "wave": 2,
        "released": true,
        "contents": {
           "ships": {
              "3": 1
           },
           "pilots": {
              "33": 1,
              "34": 1,
              "35": 1,
              "36": 1
           },
           "upgrades": {
              "13": 1,
              "16": 1,
              "26": 1,
              "27": 1,
              "29": 1,
              "30": 1,
              "31": 1,
              "32": 1,
              "33": 1,
              "152": 1,
              "175": 2,
              "176": 2
           },
           "reference-cards": [
              2
           ]
        },
        "sku": "SWX06",
        "release_date": "2013-02-28",
        "announcement_date": "2012-09-14",
        "key": "millenniumFalconExpansionPack"
     },
     "mistHunterExpansionPack": {
        "name": "Mist Hunter Expansion Pack",
        "wave": 8,
        "image": "sources/mist-hunter-expansion-pack-product.jpg",
        "thumb": "sources/mist-hunter-expansion-pack-thumb.jpg",
        "id": 36,
        "contents": {
           "ships": {
              "35": 1
           },
           "pilots": {
              "162": 1,
              "182": 1,
              "188": 1,
              "189": 1
           },
           "upgrades": {
              "195": 1,
              "196": 1,
              "209": 1,
              "230": 1,
              "231": 1,
              "232": 2,
              "233": 2,
              "234": 2
           },
           "reference-cards": [
              0,
              3,
              6,
              7,
              14,
              16
           ]
        },
        "released": true,
        "sku": "SWX41",
        "release_date": "2016-03-17",
        "announcement_date": "2015-07-31",
        "key": "mistHunterExpansionPack"
     },
     "mostWantedExpansionPack": {
        "id": 23,
        "name": "Most Wanted Expansion Pack",
        "image": "sources/most-wanted-expansion-pack-product.jpg",
        "thumb": "sources/most-wanted-expansion-pack-thumb.jpg",
        "wave": 6,
        "released": true,
        "contents": {
           "ships": {
              "1": 1,
              "13": 2
           },
           "pilots": {
              "97": 1,
              "99": 1,
              "100": 1,
              "101": 1,
              "107": 2,
              "108": 2,
              "109": 1,
              "110": 1,
              "111": 1,
              "112": 2,
              "113": 1,
              "114": 1,
              "115": 1,
              "116": 1,
              "126": 2,
              "127": 1
           },
           "upgrades": {
              "105": 1,
              "109": 2,
              "110": 1,
              "111": 2,
              "112": 2,
              "115": 1,
              "116": 2,
              "117": 2,
              "118": 1,
              "119": 1,
              "120": 1,
              "168": 1,
              "169": 2
           },
           "reference-cards": []
        },
        "sku": "SWX28",
        "release_date": "2015-02-26",
        "announcement_date": "2014-08-15",
        "key": "mostWantedExpansionPack"
     },
     "phantomIiExpansionPack": {
        "name": "Phantom II Expansion Pack",
        "wave": 12,
        "sku": "SWX72",
        "announcement_date": "2017-08-21",
        "image": "sources/swx72-product.png",
        "id": 58,
        "contents": {
           "ships": {
              "52": 1
           },
           "pilots": {
              "267": 1,
              "275": 1,
              "276": 1,
              "277": 1
           },
           "upgrades": {
              "333": 1,
              "334": 1,
              "343": 1,
              "344": 1,
              "345": 1,
              "346": 1
           },
           "reference-cards": [
              20,
              26
           ]
        },
        "thumb": "sources/swx72-thumb.png",
        "released": true,
        "release_date": "2017-12-08",
        "key": "phantomIiExpansionPack"
     },
     "protectorateStarfighterExpansionPack": {
        "name": "Protectorate Starfighter Expansion Pack",
        "wave": 9,
        "contents": {
           "ships": {
              "40": 1
           },
           "pilots": {
              "197": 1,
              "206": 1,
              "207": 1,
              "208": 1,
              "209": 1,
              "210": 1
           },
           "upgrades": {
              "248": 1,
              "255": 1
           },
           "reference-cards": [
              2,
              21
           ]
        },
        "image": "sources/protectorate-starfighter-expansion-pack-product.png",
        "thumb": "sources/protectorate-starfighter-expansion-pack-thumb.jpg",
        "id": 44,
        "released": true,
        "sku": "SWX55",
        "release_date": "2016-09-22",
        "announcement_date": "2016-06-02",
        "key": "protectorateStarfighterExpansionPack"
     },
     "punishingOneExpansionPack": {
        "name": "Punishing One Expansion Pack",
        "wave": 8,
        "image": "sources/punishing-one-expansion-pack-product.jpg",
        "thumb": "sources/punishing-one-expansion-pack-thumb.jpg",
        "id": 35,
        "contents": {
           "ships": {
              "34": 1
           },
           "pilots": {
              "161": 1,
              "183": 1,
              "184": 1,
              "185": 1
           },
           "upgrades": {
              "114": 1,
              "136": 1,
              "194": 1,
              "229": 2,
              "235": 1,
              "236": 2,
              "237": 1,
              "238": 1,
              "239": 1,
              "240": 1,
              "241": 2
           },
           "reference-cards": []
        },
        "released": true,
        "sku": "SWX42",
        "release_date": "2016-03-17",
        "announcement_date": "2015-07-31",
        "key": "punishingOneExpansionPack"
     },
     "quadjumperExpansionPack": {
        "name": "Quadjumper Expansion Pack",
        "wave": 10,
        "id": 48,
        "contents": {
           "ships": {
              "43": 1
           },
           "pilots": {
              "216": 1,
              "233": 1,
              "234": 1,
              "242": 1
           },
           "upgrades": {
              "242": 1,
              "265": 1,
              "267": 1,
              "289": 1,
              "293": 1,
              "294": 1,
              "304": 1
           },
           "conditions": {
              "3": 1
           },
           "reference-cards": []
        },
        "image": "sources/swx61-product.png",
        "thumb": "sources/swx61-thumb.jpg",
        "sku": "SWX61",
        "release_date": "2017-02-02",
        "announcement_date": "2016-08-05",
        "released": true,
        "key": "quadjumperExpansionPack"
     },
     "rebelAcesExpansionPack": {
        "id": 18,
        "name": "Rebel Aces Expansion Pack",
        "image": "sources/rebel-aces-expansion-pack-product.png",
        "thumb": "sources/rebel-aces-expansion-pack-thumb.jpg",
        "wave": "Iconic Starships",
        "released": true,
        "contents": {
           "ships": {
              "2": 1,
              "10": 1
           },
           "pilots": {
              "31": 1,
              "32": 1,
              "43": 1,
              "44": 1,
              "85": 1,
              "86": 1,
              "87": 1,
              "88": 1
           },
           "upgrades": {
              "71": 2,
              "72": 3,
              "73": 2,
              "74": 1,
              "75": 1,
              "157": 2,
              "184": 2
           },
           "reference-cards": [
              2
           ]
        },
        "sku": "SWX29",
        "release_date": "2014-09-25",
        "announcement_date": "2014-03-18",
        "key": "rebelAcesExpansionPack"
     },
     "rebelTransportExpansionPack": {
        "id": 20,
        "name": "Rebel Transport Expansion Pack",
        "image": "sources/rebel-transport-expansion-pack-product.png",
        "thumb": "sources/rebel-transport-expansion-pack-thumb.jpg",
        "wave": "Iconic Starships",
        "released": true,
        "contents": {
           "ships": {
              "0": 1,
              "12": 1
           },
           "pilots": {
              "2": 1,
              "3": 1,
              "62": 1,
              "81": 1,
              "82": 1,
              "83": 1,
              "84": 1
           },
           "upgrades": {
              "50": 1,
              "51": 1,
              "52": 1,
              "58": 3,
              "66": 1,
              "68": 1,
              "69": 1,
              "70": 1,
              "76": 1,
              "77": 1,
              "78": 1,
              "79": 1,
              "80": 1,
              "81": 1,
              "82": 1,
              "83": 1,
              "84": 1,
              "85": 1,
              "159": 1,
              "160": 1,
              "161": 1,
              "183": 1
           },
           "reference-cards": [
              0
           ]
        },
        "sku": "SWX11",
        "release_date": "2014-04-30",
        "announcement_date": "2013-08-20",
        "key": "rebelTransportExpansionPack"
     },
     "resistanceBomberExpansionPack": {
        "name": "Resistance Bomber Expansion Pack",
        "wave": 13,
        "sku": "SWX67",
        "announcement_date": "2017-09-08",
        "image": "sources/swx67-product.png",
        "thumb": "sources/swx67-thumb.jpg",
        "contents": {
           "ships": {
              "54": 1
           },
           "upgrades": {
              "24": 1,
              "135": 2,
              "242": 1,
              "288": 1,
              "335": 1,
              "336": 3,
              "347": 2,
              "348": 1,
              "349": 1
           },
           "conditions": {
              "7": 1
           },
           "pilots": {
              "269": 1,
              "278": 1,
              "279": 1,
              "280": 1
           }
        },
        "id": 60,
        "release_date": "2017-12-08",
        "released": true,
        "key": "resistanceBomberExpansionPack"
     },
     "sabinesTieFighterExpansionPack": {
        "name": "Sabine's TIE Fighter Expansion Pack",
        "wave": 10,
        "contents": {
           "ships": {
              "4": 1
           },
           "pilots": {
              "214": 1,
              "225": 1,
              "226": 1,
              "241": 1
           },
           "upgrades": {
              "27": 1,
              "263": 1,
              "283": 1,
              "284": 1,
              "285": 1
           },
           "conditions": {
              "2": 1
           },
           "reference-cards": [
              0,
              3,
              22
           ]
        },
        "id": 46,
        "image": "sources/swx59-product.png",
        "thumb": "sources/swx59-thumb.jpg",
        "sku": "SWX59",
        "release_date": "2017-02-02",
        "announcement_date": "2016-08-05",
        "released": true,
        "key": "sabinesTieFighterExpansionPack"
     },
     "sawsRenegadesExpansionPack": {
        "name": "Saw's Renegades Expansion Pack",
        "wave": 14,
        "sku": "SWX74",
        "announcement_date": "2018-02-13",
        "contents": {
           "ships": {
              "0": 1,
              "45": 1
           },
           "upgrades": {
              "141": 1,
              "271": 1,
              "272": 1,
              "346": 1,
              "354": 1,
              "355": 1,
              "358": 1,
              "359": 3,
              "360": 3,
              "361": 3,
              "366": 2
           },
           "conditions": {
              "8": 1
           },
           "pilots": {
              "285": 1,
              "287": 1,
              "288": 1,
              "289": 1,
              "293": 3,
              "294": 1,
              "295": 1,
              "296": 1
           }
        },
        "id": 61,
        "image": "sources/swx74-product.png",
        "thumb": "sources/swx74-thumb.jpg",
        "release_date": "2018-06-21",
        "released": true,
        "key": "sawsRenegadesExpansionPack"
     },
     "scurrgH6BomberExpansionPack": {
        "name": "Scurrg H-6 Bomber Expansion Pack",
        "wave": 11,
        "contents": {
           "ships": {
              "49": 1
           },
           "upgrades": {
              "133": 1,
              "259": 1,
              "313": 1,
              "314": 1,
              "324": 1,
              "325": 1,
              "326": 1,
              "327": 1,
              "328": 2
           },
           "pilots": {
              "247": 1,
              "256": 1,
              "257": 1,
              "258": 1,
              "260": 1
           },
           "reference-cards": [
              3,
              4,
              21,
              24
           ]
        },
        "sku": "SWX65",
        "image": "sources/swx65-product.png",
        "thumb": "sources/swx65-thumb.jpg",
        "id": 54,
        "announcement_date": "2017-03-15",
        "release_date": "2017-07-13",
        "released": true,
        "key": "scurrgH6BomberExpansionPack"
     },
     "shadowCasterExpansionPack": {
        "name": "Shadow Caster Expansion Pack",
        "wave": 9,
        "contents": {
           "ships": {
              "41": 1
           },
           "pilots": {
              "198": 1,
              "200": 1,
              "211": 1,
              "213": 1
           },
           "upgrades": {
              "27": 1,
              "186": 1,
              "187": 2,
              "249": 1,
              "256": 1,
              "257": 1,
              "258": 1,
              "260": 1,
              "261": 1,
              "262": 2
           },
           "reference-cards": [
              18,
              19
           ]
        },
        "image": "sources/shadow-caster-expansion-pack-product.png",
        "thumb": "sources/shadow-caster-expansion-pack-thumb.jpg",
        "id": 45,
        "released": true,
        "sku": "SWX56",
        "release_date": "2016-09-22",
        "announcement_date": "2016-06-02",
        "key": "shadowCasterExpansionPack"
     },
     "slaveIExpansionPack": {
        "id": 8,
        "name": "Slave I Expansion Pack",
        "image": "sources/slave-i-expansion-pack-product.png",
        "thumb": "sources/slave-i-expansion-pack-thumb.jpg",
        "wave": 2,
        "released": true,
        "contents": {
           "ships": {
              "7": 1
           },
           "pilots": {
              "37": 1,
              "38": 1,
              "39": 1,
              "40": 1
           },
           "upgrades": {
              "17": 1,
              "20": 1,
              "21": 1,
              "22": 1,
              "23": 1,
              "24": 1,
              "25": 1,
              "26": 1,
              "27": 1,
              "28": 1,
              "151": 1,
              "174": 2
           },
           "reference-cards": [
              0,
              1
           ]
        },
        "sku": "SWX07",
        "release_date": "2013-02-28",
        "announcement_date": "2012-09-14",
        "key": "slaveIExpansionPack"
     },
     "specialForcesTieExpansionPack": {
        "name": "Special Forces TIE Expansion Pack",
        "wave": 9,
        "contents": {
           "ships": {
              "39": 1
           },
           "pilots": {
              "199": 1,
              "204": 1,
              "205": 1,
              "212": 1
           },
           "upgrades": {
              "148": 1,
              "247": 1,
              "253": 1,
              "254": 2
           },
           "reference-cards": [
              20
           ]
        },
        "image": "sources/special-forces-tie-expansion-pack-product.png",
        "id": 43,
        "released": true,
        "sku": "SWX54",
        "release_date": "2016-09-22",
        "announcement_date": "2016-06-02",
        "thumb": "sources/swx54-thumb.png",
        "key": "specialForcesTieExpansionPack"
     },
     "starviperExpansionPack": {
        "id": 24,
        "name": "StarViper Expansion Pack",
        "image": "sources/starviper-expansion-pack-product.jpg",
        "thumb": "sources/starviper-expansion-pack-thumb.jpg",
        "wave": 6,
        "released": true,
        "contents": {
           "ships": {
              "21": 1
           },
           "pilots": {
              "98": 1,
              "117": 1,
              "118": 1,
              "119": 1
           },
           "upgrades": {
              "104": 1,
              "106": 1,
              "107": 1,
              "108": 1,
              "125": 1,
              "167": 1,
              "179": 1,
              "188": 2
           },
           "reference-cards": [
              0,
              2,
              3,
              8
           ]
        },
        "sku": "SWX25",
        "release_date": "2015-02-26",
        "announcement_date": "2014-08-15",
        "key": "starviperExpansionPack"
     },
     "t70XWingExpansionPack": {
        "id": 33,
        "name": "T-70 X-wing Expansion Pack",
        "image": "sources/t-70-x-wing-expansion-pack-product.jpg",
        "thumb": "sources/t-70-x-wing-expansion-pack-thumb.jpg",
        "wave": 8,
        "released": true,
        "contents": {
           "ships": {
              "30": 1
           },
           "pilots": {
              "155": 1,
              "157": 1,
              "158": 1,
              "179": 1
           },
           "upgrades": {
              "34": 1,
              "146": 1,
              "150": 1,
              "193": 1,
              "214": 1
           },
           "reference-cards": []
        },
        "sku": "SWX37",
        "release_date": "2015-12-17",
        "announcement_date": "2015-09-10",
        "key": "t70XWingExpansionPack"
     },
     "tantiveIvExpansionPack": {
        "id": 19,
        "name": "Tantive IV Expansion Pack",
        "image": "sources/tantive-iv-expansion-pack-product.png",
        "thumb": "sources/tantive-iv-expansion-pack-thumb.jpg",
        "wave": "Iconic Starships",
        "released": true,
        "contents": {
           "ships": {
              "17": 1,
              "18": 1
           },
           "pilots": {
              "79": 1,
              "80": 1
           },
           "upgrades": {
              "50": 2,
              "62": 1,
              "63": 1,
              "64": 3,
              "65": 3,
              "66": 1,
              "67": 1,
              "68": 1,
              "83": 1,
              "86": 1,
              "87": 1,
              "88": 1,
              "89": 1,
              "90": 1,
              "91": 1,
              "92": 1,
              "156": 1,
              "158": 1,
              "162": 1
           },
           "reference-cards": [
              0
           ]
        },
        "sku": "SWX22",
        "release_date": "2014-05-22",
        "announcement_date": "2013-08-20",
        "key": "tantiveIvExpansionPack"
     },
     "theForceAwakensCoreSet": {
        "id": 32,
        "name": "The Force Awakens Core Set",
        "image": "sources/the-force-awakens-core-set-product.jpg",
        "thumb": "sources/the-force-awakens-core-set-thumb.jpg",
        "wave": 0,
        "released": true,
        "contents": {
           "ships": {
              "30": 1,
              "31": 2
           },
           "pilots": {
              "148": 1,
              "149": 2,
              "150": 1,
              "152": 1,
              "153": 2,
              "154": 2,
              "155": 1,
              "156": 1,
              "158": 1,
              "159": 1
           },
           "upgrades": {
              "1": 1,
              "144": 1,
              "145": 1,
              "148": 1,
              "150": 1
           },
           "reference-cards": []
        },
        "sku": "SWX36",
        "release_date": "2015-09-04",
        "announcement_date": "2015-09-03",
        "key": "theForceAwakensCoreSet"
     },
     "tieAdvancedExpansionPack": {
        "id": 4,
        "name": "TIE Advanced Expansion Pack",
        "image": "sources/tie-advanced-expansion-pack-product.jpg",
        "thumb": "sources/tie-advanced-expansion-pack-thumb.jpg",
        "wave": 1,
        "released": true,
        "contents": {
           "ships": {
              "5": 1
           },
           "pilots": {
              "19": 1,
              "20": 1,
              "21": 1,
              "22": 1
           },
           "upgrades": {
              "9": 1,
              "10": 1,
              "11": 1,
              "13": 1,
              "14": 1
           },
           "reference-cards": []
        },
        "sku": "SWX05",
        "release_date": "2012-09-14",
        "announcement_date": "2012-04-17",
        "key": "tieAdvancedExpansionPack"
     },
     "tieAggressorExpansionPack": {
        "name": "TIE Aggressor Expansion Pack",
        "wave": 11,
        "contents": {
           "ships": {
              "48": 1
           },
           "upgrades": {
              "138": 1,
              "296": 1,
              "312": 1,
              "314": 1,
              "317": 1,
              "318": 1
           },
           "pilots": {
              "248": 1,
              "250": 1,
              "251": 1,
              "252": 1
           },
           "reference-cards": [
              3,
              16
           ]
        },
        "id": 53,
        "image": "sources/swx66-product.png",
        "thumb": "sources/swx66-thumb.jpg",
        "sku": "SWX66",
        "announcement_date": "2017-03-15",
        "release_date": "2017-07-13",
        "released": true,
        "key": "tieAggressorExpansionPack"
     },
     "tieBomberExpansionPack": {
        "id": 11,
        "name": "TIE Bomber Expansion Pack",
        "image": "sources/tie-bomber-expansion-pack-product.jpg",
        "thumb": "sources/tie-bomber-expansion-pack-thumb.jpg",
        "wave": 3,
        "released": true,
        "contents": {
           "ships": {
              "11": 1
           },
           "pilots": {
              "49": 1,
              "50": 1,
              "51": 1,
              "52": 1
           },
           "upgrades": {
              "24": 1,
              "26": 1,
              "34": 1,
              "41": 1,
              "42": 1
           },
           "reference-cards": [
              4,
              5
           ]
        },
        "sku": "SWX15",
        "release_date": "2013-09-12",
        "announcement_date": "2013-05-04",
        "key": "tieBomberExpansionPack"
     },
     "tieDefenderExpansionPack": {
        "id": 15,
        "name": "TIE Defender Expansion Pack",
        "image": "sources/tie-defender-expansion-pack-product.jpg",
        "thumb": "sources/tie-defender-expansion-pack-thumb.jpg",
        "wave": 4,
        "released": true,
        "contents": {
           "ships": {
              "14": 1
           },
           "pilots": {
              "67": 1,
              "68": 1,
              "69": 1,
              "70": 1
           },
           "upgrades": {
              "22": 1,
              "53": 1,
              "56": 1,
              "57": 1,
              "180": 1
           },
           "reference-cards": [
              0,
              3
           ]
        },
        "sku": "SWX17",
        "release_date": "2014-06-26",
        "announcement_date": "2014-02-07",
        "key": "tieDefenderExpansionPack"
     },
     "tieFighterExpansionPack": {
        "id": 3,
        "name": "TIE Fighter Expansion Pack",
        "image": "sources/tie-fighter-expansion-pack-product.jpg",
        "thumb": "sources/tie-fighter-expansion-pack-thumb.jpg",
        "wave": 1,
        "released": true,
        "contents": {
           "ships": {
              "4": 1
           },
           "pilots": {
              "10": 1,
              "11": 1,
              "12": 1,
              "13": 1,
              "15": 1,
              "18": 1
           },
           "upgrades": {
              "8": 1,
              "9": 1
           },
           "reference-cards": []
        },
        "sku": "SWX03",
        "release_date": "2012-09-14",
        "announcement_date": "2012-04-17",
        "key": "tieFighterExpansionPack"
     },
     "tieFoFighterExpansionPack": {
        "id": 34,
        "name": "TIE/fo Fighter Expansion Pack",
        "image": "sources/tiefo-fighter-expansion-pack-product.jpg",
        "thumb": "sources/tiefo-fighter-expansion-pack-thumb.jpg",
        "wave": 8,
        "released": true,
        "contents": {
           "ships": {
              "31": 1
           },
           "pilots": {
              "149": 1,
              "151": 1,
              "153": 1,
              "154": 1,
              "170": 1,
              "171": 1
           },
           "upgrades": {
              "147": 1,
              "149": 1
           },
           "reference-cards": []
        },
        "sku": "SWX38",
        "release_date": "2015-12-17",
        "announcement_date": "2015-09-10",
        "key": "tieFoFighterExpansionPack"
     },
     "tieInterceptorExpansionPack": {
        "id": 5,
        "name": "TIE Interceptor Expansion Pack",
        "image": "sources/tie-interceptor-expansion-pack-product.png",
        "thumb": "sources/tie-interceptor-expansion-pack-thumb.jpg",
        "wave": 2,
        "released": true,
        "contents": {
           "ships": {
              "6": 1
           },
           "pilots": {
              "23": 1,
              "24": 1,
              "25": 1,
              "26": 1,
              "27": 1,
              "28": 1
           },
           "upgrades": {
              "15": 1,
              "16": 1
           },
           "reference-cards": [
              2
           ]
        },
        "sku": "SWX09",
        "release_date": "2013-02-28",
        "announcement_date": "2012-09-14",
        "key": "tieInterceptorExpansionPack"
     },
     "tiePhantomExpansionPack": {
        "id": 17,
        "name": "TIE Phantom Expansion Pack",
        "image": "sources/tie-phantom-expansion-pack-product.jpg",
        "thumb": "sources/tie-phantom-expansion-pack-thumb.jpg",
        "wave": 4,
        "released": true,
        "contents": {
           "ships": {
              "16": 1
           },
           "pilots": {
              "75": 1,
              "76": 1,
              "77": 1,
              "78": 1
           },
           "upgrades": {
              "36": 1,
              "38": 1,
              "61": 1,
              "181": 1,
              "182": 1
           },
           "reference-cards": [
              3,
              6,
              7
           ]
        },
        "sku": "SWX19",
        "release_date": "2014-06-26",
        "announcement_date": "2014-02-07",
        "key": "tiePhantomExpansionPack"
     },
     "tiePunisherExpansionPack": {
        "id": 31,
        "name": "TIE Punisher Expansion Pack",
        "image": "sources/tie-punisher-expansion-pack-product.jpg",
        "thumb": "sources/tie-punisher-expansion-pack-thumb.jpg",
        "wave": 7,
        "released": true,
        "contents": {
           "ships": {
              "29": 1
           },
           "pilots": {
              "142": 1,
              "143": 1,
              "144": 1,
              "145": 1
           },
           "upgrades": {
              "58": 1,
              "71": 1,
              "134": 1,
              "136": 1,
              "137": 1,
              "139": 1,
              "142": 1,
              "190": 2
           },
           "reference-cards": [
              0,
              2,
              3,
              4,
              9,
              10
           ]
        },
        "sku": "SWX34",
        "release_date": "2015-08-25",
        "announcement_date": "2015-04-20",
        "key": "tiePunisherExpansionPack"
     },
     "tieReaperExpansionPack": {
        "name": "TIE Reaper Expansion Pack",
        "wave": 14,
        "sku": "SWX75",
        "announcement_date": "2018-02-13",
        "image": "sources/swx75-product.png",
        "thumb": "sources/swx75-thumb.jpg",
        "id": 62,
        "contents": {
           "ships": {
              "55": 1
           },
           "upgrades": {
              "55": 1,
              "245": 2,
              "356": 1,
              "357": 1,
              "362": 1,
              "363": 2,
              "364": 1,
              "365": 1
           },
           "pilots": {
              "286": 1,
              "290": 1,
              "291": 1,
              "292": 1
           },
           "conditions": {
              "9": 1
           }
        },
        "release_date": "2018-06-21",
        "released": true,
        "key": "tieReaperExpansionPack"
     },
     "tieSilencerExpansionPack": {
        "name": "TIE Silencer Expansion Pack",
        "wave": 13,
        "sku": "SWX68",
        "announcement_date": "2017-09-08",
        "id": 59,
        "contents": {
           "pilots": {
              "268": 1,
              "281": 1,
              "283": 1,
              "284": 1
           },
           "conditions": {
              "0": 1
           },
           "upgrades": {
              "44": 1,
              "188": 2,
              "277": 2,
              "337": 1,
              "347": 2,
              "350": 2,
              "351": 2
           },
           "ships": {
              "53": 1
           }
        },
        "image": "sources/swx68-product.png",
        "thumb": "sources/swx68-thumb.jpg",
        "release_date": "2017-12-08",
        "released": true,
        "key": "tieSilencerExpansionPack"
     },
     "tieStrikerExpansionPack": {
        "name": "TIE Striker Expansion Pack",
        "wave": 10,
        "id": 50,
        "image": "sources/swx63-product.png",
        "contents": {
           "ships": {
              "44": 1
           },
           "pilots": {
              "218": 1,
              "235": 1,
              "236": 1,
              "237": 1,
              "239": 1,
              "240": 1
           },
           "upgrades": {
              "270": 1,
              "295": 1,
              "296": 1
           },
           "reference-cards": []
        },
        "sku": "SWX63",
        "release_date": "2016-12-15",
        "announcement_date": "2016-09-02",
        "released": true,
        "thumb": "sources/swx63-thumb.png",
        "key": "tieStrikerExpansionPack"
     },
     "uWingExpansionPack": {
        "name": "U-wing Expansion Pack",
        "wave": 10,
        "id": 49,
        "contents": {
           "ships": {
              "45": 1
           },
           "pilots": {
              "217": 1,
              "227": 1,
              "231": 1,
              "232": 1
           },
           "upgrades": {
              "44": 1,
              "58": 1,
              "174": 2,
              "268": 1,
              "269": 1,
              "271": 1,
              "272": 1,
              "290": 1,
              "291": 1,
              "292": 2,
              "297": 2,
              "298": 1
           },
           "reference-cards": []
        },
        "image": "sources/swx62-product.png",
        "thumb": "sources/swx62-thumb.jpg",
        "sku": "SWX62",
        "release_date": "2016-12-15",
        "announcement_date": "2016-09-02",
        "released": true,
        "key": "uWingExpansionPack"
     },
     "upsilonClassShuttleExpansionPack": {
        "name": "Upsilon-class Shuttle Expansion Pack",
        "wave": 10,
        "id": 47,
        "contents": {
           "ships": {
              "42": 1
           },
           "pilots": {
              "215": 1,
              "228": 1,
              "229": 1,
              "230": 1
           },
           "upgrades": {
              "192": 2,
              "264": 1,
              "266": 1,
              "279": 2,
              "286": 1,
              "287": 2,
              "288": 2,
              "289": 2
           },
           "conditions": {
              "0": 1,
              "1": 1
           },
           "reference-cards": []
        },
        "image": "sources/swx60-product.png",
        "thumb": "sources/swx60-thumb.jpg",
        "sku": "SWX60",
        "release_date": "2017-02-02",
        "announcement_date": "2016-08-05",
        "released": true,
        "key": "upsilonClassShuttleExpansionPack"
     },
     "vt49DecimatorExpansionPack": {
        "id": 22,
        "name": "VT-49 Decimator Expansion Pack",
        "image": "sources/vt-49-decimator-expansion-pack-product.jpg",
        "thumb": "sources/vt-49-decimator-expansion-pack-thumb.jpg",
        "wave": 5,
        "released": true,
        "contents": {
           "ships": {
              "20": 1
           },
           "pilots": {
              "90": 1,
              "91": 1,
              "94": 1,
              "95": 1
           },
           "upgrades": {
              "41": 1,
              "94": 1,
              "95": 1,
              "100": 1,
              "101": 1,
              "102": 2,
              "103": 1,
              "104": 2,
              "164": 1,
              "187": 2
           },
           "reference-cards": [
              0,
              4,
              5
           ]
        },
        "sku": "SWX24",
        "release_date": "2014-11-26",
        "announcement_date": "2014-06-13",
        "key": "vt49DecimatorExpansionPack"
     },
     "xWingExpansionPack": {
        "id": 1,
        "name": "X-wing Expansion Pack",
        "image": "sources/x-wing-expansion-pack-product.jpg",
        "thumb": "sources/x-wing-expansion-pack-thumb.jpg",
        "wave": 1,
        "released": true,
        "contents": {
           "ships": {
              "0": 1
           },
           "pilots": {
              "0": 1,
              "1": 1,
              "2": 1,
              "3": 1
           },
           "upgrades": {
              "1": 1,
              "6": 1,
              "7": 1,
              "11": 1,
              "12": 1
           },
           "reference-cards": []
        },
        "sku": "SWX02",
        "release_date": "2012-09-14",
        "announcement_date": "2012-04-17",
        "key": "xWingExpansionPack"
     },
     "yWingExpansionPack": {
        "id": 2,
        "name": "Y-wing Expansion Pack",
        "image": "sources/y-wing-expansion-pack-product.jpg",
        "thumb": "sources/y-wing-expansion-pack-thumb.jpg",
        "wave": 1,
        "released": true,
        "contents": {
           "ships": {
              "1": 1
           },
           "pilots": {
              "6": 1,
              "7": 1,
              "8": 1,
              "9": 1
           },
           "upgrades": {
              "0": 1,
              "1": 2,
              "2": 1,
              "5": 1
           },
           "reference-cards": [
              0
           ]
        },
        "sku": "SWX04",
        "release_date": "2012-09-14",
        "announcement_date": "2012-04-17",
        "key": "yWingExpansionPack"
     },
     "yt2400FreighterExpansionPack": {
        "id": 21,
        "name": "YT-2400 Freighter Expansion Pack",
        "image": "sources/yt-2400-freighter-expansion-pack-product.jpg",
        "thumb": "sources/yt-2400-freighter-expansion-pack-thumb.jpg",
        "wave": 5,
        "released": true,
        "contents": {
           "ships": {
              "19": 1
           },
           "pilots": {
              "89": 1,
              "92": 1,
              "93": 1,
              "96": 1
           },
           "upgrades": {
              "21": 1,
              "23": 1,
              "25": 1,
              "73": 1,
              "93": 1,
              "96": 1,
              "97": 1,
              "98": 1,
              "99": 1,
              "163": 1,
              "185": 1,
              "186": 2
           },
           "reference-cards": [
              0,
              2
           ]
        },
        "sku": "SWX23",
        "release_date": "2014-11-26",
        "announcement_date": "2014-06-13",
        "key": "yt2400FreighterExpansionPack"
     },
     "z95HeadhunterExpansionPack": {
        "id": 14,
        "name": "Z-95 Headhunter Expansion Pack",
        "image": "sources/z-95-headhunter-expansion-pack-product.jpg",
        "thumb": "sources/z-95-headhunter-expansion-pack-thumb.jpg",
        "wave": 4,
        "released": true,
        "contents": {
           "ships": {
              "13": 1
           },
           "pilots": {
              "63": 1,
              "64": 1,
              "65": 1,
              "66": 1
           },
           "upgrades": {
              "26": 1,
              "53": 1,
              "54": 1,
              "55": 1,
              "180": 1
           },
           "reference-cards": [
              0,
              3
           ]
        },
        "sku": "SWX16",
        "release_date": "2014-06-26",
        "announcement_date": "2014-02-07",
        "key": "z95HeadhunterExpansionPack"
     }
  };

  Object.freeze(Source);

  const Stat = {
    AGILITY: "agility",
    ENERGY: "energy",
    HULL: "hull",
    PILOT_SKILL: "pilotSkill",
    PRIMARY_WEAPON: "primaryWeapon",
    SHIELD: "shield"
  };

  Stat.properties = {
    agility: {
      name: "Agility",
      grant: "agility",
      key: "agility"
    },
    energy: {
      name: "Energy",
      grant: "energy",
      key: "energy"
    },
    hull: {
      name: "Hull",
      grant: "hull",
      key: "hull"
    },
    pilotSkill: {
      name: "Pilot Skill",
      grant: "skill",
      key: "pilotSkill"
    },
    primaryWeapon: {
      name: "Primary Weapon",
      grant: "attack",
      key: "primaryWeapon"
    },
    shield: {
      name: "Shield",
      grant: "shields",
      key: "shield"
    }
  };

  Object.freeze(Stat);

  const Token = {
    CLOAK: "cloak",
    CRITICAL_DAMAGE: "criticalDamage",
    DAMAGE: "damage",
    ENERGY: "energy",
    EVADE: "evade",
    FOCUS: "focus",
    ION: "ion",
    ORDNANCE: "ordnance",
    REINFORCE: "reinforce",
    SHIELD: "shield",
    STRESS: "stress",
    TARGET_LOCK_ATTACK: "targetLockAttack",
    TARGET_LOCK_DEFEND: "targetLockDefend",
    TRACTOR_BEAM: "tractorBeam",
    WEAPONS_DISABLED: "weaponsDisabled"
  };

  Token.properties = {
    cloak: {
      name: "Cloak",
      image: "token/cloak.png",
      key: "cloak"
    },
    criticalDamage: {
      name: "Critical Damage",
      image: "token/critical-damage.png",
      key: "criticalDamage"
    },
    damage: {
      name: "Damage",
      image: "token/damage.png",
      key: "damage"
    },
    energy: {
      name: "Energy",
      image: "token/energy.png",
      key: "energy"
    },
    evade: {
      name: "Evade",
      image: "token/evade.png",
      key: "evade"
    },
    focus: {
      name: "Focus",
      image: "token/focus.png",
      key: "focus"
    },
    ion: {
      name: "Ion",
      image: "token/ion.png",
      key: "ion"
    },
    ordnance: {
      name: "Ordnance",
      image: "token/ordnance.png",
      key: "ordnance"
    },
    reinforce: {
      name: "Reinforce",
      image: "token/reinforce.png",
      key: "reinforce"
    },
    shield: {
      name: "Shield",
      image: "token/shield.png",
      key: "shield"
    },
    stress: {
      name: "Stress",
      image: "token/stress.png",
      key: "stress"
    },
    targetLockAttack: {
      name: "Target Lock (Attack)",
      image: "token/target-lock-attack.png",
      key: "targetLockAttack"
    },
    targetLockDefend: {
      name: "Target Lock (Defend)",
      image: "token/target-lock-defend.png",
      key: "targetLockDefend"
    },
    tractorBeam: {
      name: "Tractor Beam",
      image: "token/tractor-beam.png",
      key: "tractorBeam"
    },
    weaponsDisabled: {
      name: "Weapons Disabled",
      image: "token/weapons-disabled.png",
      key: "weaponsDisabled"
    }
  };

  Object.freeze(Token);

  const UpgradeCard = {

    A_SCORE_TO_SETTLE: "aScoreToSettle",
    A_WING_TEST_PILOT: "aWingTestPilot",
    ACCURACY_CORRECTOR: "accuracyCorrector",
    ADAPTABILITY_DECREASE: "adaptabilityDecrease",
    ADAPTABILITY_INCREASE: "adaptabilityIncrease",
    ADAPTIVE_AILERONS: "adaptiveAilerons",
    ADMIRAL_OZZEL: "admiralOzzel",
    ADRENALINE_RUSH: "adrenalineRush",
    ADVANCED_AILERONS: "advancedAilerons",
    ADVANCED_CLOAKING_DEVICE: "advancedCloakingDevice",
    ADVANCED_HOMING_MISSILES: "advancedHomingMissiles",
    ADVANCED_OPTICS: "advancedOptics",
    ADVANCED_PROTON_TORPEDOES: "advancedProtonTorpedoes",
    ADVANCED_SENSORS: "advancedSensors",
    ADVANCED_SLAM: "advancedSlam",
    ADVANCED_TARGETING_COMPUTER: "advancedTargetingComputer",
    AGENT_KALLUS: "agentKallus",
    ALLIANCE_OVERHAUL: "allianceOverhaul",
    ANDRASTA: "andrasta",
    ANTI_PURSUIT_LASERS: "antiPursuitLasers",
    ARC_CASTER: "arcCaster",
    ARC_CASTER_RECHARGING: "arcCasterRecharging",
    ASSAILER: "assailer",
    ASSAULT_MISSILES: "assaultMissiles",
    ATTANNI_MINDLINK: "attanniMindlink",
    AUTOBLASTER: "autoblaster",
    AUTOBLASTER_TURRET: "autoblasterTurret",
    AUTOMATED_PROTOCOLS: "automatedProtocols",
    AUTOTHRUSTERS: "autothrusters",
    AZMORIGAN: "azmorigan",
    B_WING_E2: "bWingE2",
    BACKUP_SHIELD_GENERATOR: "backupShieldGenerator",
    BAZE_MALBUS: "bazeMalbus",
    BB_8: "bb8",
    BISTAN: "bistan",
    BLACK_MARKET_SLICER_TOOLS: "blackMarketSlicerTools",
    BLACK_ONE: "blackOne",
    BLASTER_TURRET: "blasterTurret",
    BOBA_FETT: "bobaFett",
    BODHI_ROOK: "bodhiRook",
    BODYGUARD: "bodyguard",
    BOMB_LOADOUT: "bombLoadout",
    BOMBARDIER: "bombardier",
    BOMBLET_GENERATOR: "bombletGenerator",
    BOSHEK: "boshek",
    BOSSK: "bossk",
    BREACH_SPECIALIST: "breachSpecialist",
    BRIGHT_HOPE: "brightHope",
    BROADCAST_ARRAY: "broadcastArray",
    BROKEN_HORN: "brokenHorn",
    BTL_A4_Y_WING: "btlA4YWing",
    BURNOUT_SLAM: "burnoutSlam",
    C_3PO: "c3po",
    CAD_BANE: "cadBane",
    CALCULATION: "calculation",
    CAPTAIN_NEEDA: "captainNeeda",
    CAPTAIN_REX: "captainRex",
    CAPTURED_TIE: "capturedTie",
    CARLIST_RIEEKAN: "carlistRieekan",
    CASSIAN_ANDOR: "cassianAndor",
    CHARDAAN_REFIT: "chardaanRefit",
    CHEWBACCA: "chewbacca",
    CHOPPER_ASTROMECH: "chopper_astromech",
    CHOPPER_CREW: "chopper_crew",
    CIKATRO_VIZAGO: "cikatroVizago",
    CLOAKING_DEVICE: "cloakingDevice",
    CLUSTER_BOMBS: "clusterBombs",
    CLUSTER_MINES: "clusterMines",
    CLUSTER_MISSILES: "clusterMissiles",
    COLLISION_DETECTOR: "collisionDetector",
    COMBAT_RETROFIT: "combatRetrofit",
    COMM_RELAY: "commRelay",
    COMMS_BOOSTER: "commsBooster",
    CONCORD_DAWN_PROTECTOR: "concordDawnProtector",
    CONCUSSION_MISSILES: "concussionMissiles",
    CONNER_NET: "connerNet",
    CONSTRUCTION_DROID: "constructionDroid",
    CONTRABAND_CYBERNETICS: "contrabandCybernetics",
    COOL_HAND: "coolHand",
    COUNTERMEASURES: "countermeasures",
    COURIER_DROID: "courierDroid",
    CRACK_SHOT: "crackShot",
    CROSSFIRE_FORMATION: "crossfireFormation",
    CRUISE_MISSILES: "cruiseMissiles",
    DAREDEVIL: "daredevil",
    DARTH_VADER: "darthVader",
    DASH_RENDAR: "dashRendar",
    DAUNTLESS: "dauntless",
    DEAD_MANS_SWITCH: "deadMansSwitch",
    DEADEYE: "deadeye",
    DEATH_TROOPERS: "deathTroopers",
    DEBRIS_GAMBIT: "debrisGambit",
    DECOY: "decoy",
    DEFLECTIVE_PLATING: "deflectivePlating",
    DENGAR: "dengar",
    DETERMINATION: "determination",
    DIRECTOR_KRENNIC: "directorKrennic",
    DOCKING_CLAMPS: "dockingClamps",
    DODONNAS_PRIDE: "dodonnasPride",
    DORSAL_TURRET: "dorsalTurret",
    DRAW_THEIR_FIRE: "drawTheirFire",
    DUAL_LASER_TURRET: "dualLaserTurret",
    DUTYFREE: "dutyfree",
    ELECTRONIC_BAFFLE: "electronicBaffle",
    ELUSIVENESS: "elusiveness",
    EM_EMITTER: "emEmitter",
    EMP_DEVICE: "empDevice",
    EMPEROR_PALPATINE: "emperorPalpatine",
    ENFORCER: "enforcer",
    ENGINE_BOOSTER: "engineBooster",
    ENGINE_UPGRADE: "engineUpgrade",
    ENGINEERING_TEAM: "engineeringTeam",
    ENHANCED_SCOPES: "enhancedScopes",
    EXPANDED_CARGO_HOLD: "expandedCargoHold",
    EXPERIMENTAL_INTERFACE: "experimentalInterface",
    EXPERT_HANDLING: "expertHandling",
    EXPERTISE: "expertise",
    EXPOSE: "expose",
    EXTRA_MUNITIONS: "extraMunitions",
    EZRA_BRIDGER: "ezraBridger",
    FEARLESSNESS: "fearlessness",
    FEEDBACK_ARRAY: "feedbackArray",
    FINN: "finn",
    FIRE_CONTROL_SYSTEM: "fireControlSystem",
    FIRST_ORDER_VANGUARD: "firstOrderVanguard",
    FLECHETTE_CANNON: "flechetteCannon",
    FLECHETTE_TORPEDOES: "flechetteTorpedoes",
    FLEET_OFFICER: "fleetOfficer",
    FLIGHT_ASSIST_ASTROMECH: "flightAssistAstromech",
    FLIGHT_INSTRUCTOR: "flightInstructor",
    FOUR_LOM: "fourLom",
    FREQUENCY_JAMMER: "frequencyJammer",
    GENERAL_HUX: "generalHux",
    GENIUS: "genius",
    GHOST_198: "ghost_198",
    GHOST_333: "ghost_333",
    GLITTERSTIM: "glitterstim",
    GONK: "gonk",
    GRAND_MOFF_TARKIN: "grandMoffTarkin",
    GREEDO: "greedo",
    GUIDANCE_CHIPS: "guidanceChips",
    GUNNER: "gunner",
    GUNNERY_TEAM: "gunneryTeam",
    GYROSCOPIC_TARGETING: "gyroscopicTargeting",
    HAN_SOLO: "hanSolo",
    HARPOON_MISSILES: "harpoonMissiles",
    HAVOC: "havoc",
    HEAVY_LASER_CANNON: "heavyLaserCannon",
    HEAVY_LASER_TURRET: "heavyLaserTurret",
    HEAVY_SCYK_INTERCEPTOR: "heavyScykInterceptor",
    HERA_SYNDULLA: "heraSyndulla",
    HOMING_MISSILES: "homingMissiles",
    HOT_SHOT_BLASTER: "hotShotBlaster",
    HOTSHOT_CO_PILOT: "hotshotCoPilot",
    HOUNDS_TOOTH: "houndsTooth",
    HULL_UPGRADE: "hullUpgrade",
    HYPERWAVE_COMM_SCANNER: "hyperwaveCommScanner",
    IG_2000: "ig2000",
    IG_88D: "ig88d",
    IG_RM_THUG_DROIDS: "igRmThugDroids",
    IMPETUOUS: "impetuous",
    INERTIAL_DAMPENERS: "inertialDampeners",
    INSATIABLE_WORRT: "insatiableWorrt",
    INSPIRING_RECRUIT: "inspiringRecruit",
    INSTIGATOR: "instigator",
    INTEGRATED_ASTROMECH: "integratedAstromech",
    INTELLIGENCE_AGENT: "intelligenceAgent",
    INTENSITY: "intensity",
    INTENSITY_EXHAUSTED: "intensityExhausted",
    INTIMIDATION: "intimidation",
    ION_BOMBS: "ionBombs",
    ION_CANNON: "ionCannon",
    ION_CANNON_BATTERY: "ionCannonBattery",
    ION_CANNON_TURRET: "ionCannonTurret",
    ION_DISCHARGERS: "ionDischargers",
    ION_PROJECTOR: "ionProjector",
    ION_PULSE_MISSILES: "ionPulseMissiles",
    ION_TORPEDOES: "ionTorpedoes",
    IONIZATION_REACTOR: "ionizationReactor",
    ISB_SLICER: "isbSlicer",
    JABBA_THE_HUTT: "jabbaTheHutt",
    JAINAS_LIGHT: "jainasLight",
    JAMMING_BEAM: "jammingBeam",
    JAN_DODONNA: "janDodonna",
    JAN_ORS: "janOrs",
    JUKE: "juke",
    JYN_ERSO: "jynErso",
    K4_SECURITY_DROID: "k4SecurityDroid",
    KANAN_JARRUS: "kananJarrus",
    KETSU_ONYO: "ketsuOnyo",
    KYLE_KATARN: "kyleKatarn",
    KYLO_REN: "kyloRen",
    KYLO_RENS_SHUTTLE: "kyloRensShuttle",
    LANDO_CALRISSIAN: "landoCalrissian",
    LATTS_RAZZI: "lattsRazzi",
    LEEBO: "leebo",
    LEIA_ORGANA: "leiaOrgana",
    LIGHT_SCYK_INTERCEPTOR: "lightScykInterceptor",
    LIGHTNING_REFLEXES: "lightningReflexes",
    LIGHTWEIGHT_FRAME: "lightweightFrame",
    LINKED_BATTERY: "linkedBattery",
    LONE_WOLF: "loneWolf",
    LONG_RANGE_SCANNERS: "longRangeScanners",
    LUKE_SKYWALKER: "lukeSkywalker",
    M9_G8: "m9G8",
    MAGVA_YARRO: "magvaYarro",
    MANEUVERING_FINS: "maneuveringFins",
    MANGLER_CANNON: "manglerCannon",
    MARA_JADE: "maraJade",
    MARKSMANSHIP: "marksmanship",
    MAUL: "maul",
    MERCENARY_COPILOT: "mercenaryCopilot",
    MERCHANT_ONE: "merchantOne",
    MILLENNIUM_FALCON: "millenniumFalcon",
    MILLENNIUM_FALCON_HOTR: "millenniumFalcon_hotr",
    MINEFIELD_MAPPER: "minefieldMapper",
    MIST_HUNTER: "mistHunter",
    MOFF_JERJERROD: "moffJerjerrod",
    MOLDY_CROW: "moldyCrow",
    MULTI_SPECTRAL_CAMOUFLAGE: "multiSpectralCamouflage",
    MUNITIONS_FAILSAFE: "munitionsFailsafe",
    NAVIGATOR: "navigator",
    NIEN_NUNB: "nienNunb",
    OPERATIONS_SPECIALIST: "operationsSpecialist",
    OPPORTUNIST: "opportunist",
    OPTIMIZED_GENERATORS: "optimizedGenerators",
    ORDNANCE_EXPERTS: "ordnanceExperts",
    ORDNANCE_SILOS: "ordnanceSilos",
    ORDNANCE_TUBES: "ordnanceTubes",
    OS_1_ARSENAL_LOADOUT: "os1ArsenalLoadout",
    OUTLAW_TECH: "outlawTech",
    OUTMANEUVER: "outmaneuver",
    OUTRIDER: "outrider",
    OVERCLOCKED_R4: "overclockedR4",
    PATTERN_ANALYZER: "patternAnalyzer",
    PHANTOM: "phantom",
    PHANTOM_II: "phantomIi",
    PIVOT_WING_ATTACK: "pivotWingAttack",
    PIVOT_WING_LANDING: "pivotWingLanding",
    PLASMA_TORPEDOES: "plasmaTorpedoes",
    PREDATOR: "predator",
    PRIMED_THRUSTERS: "primedThrusters",
    PROTON_BOMBS: "protonBombs",
    PROTON_ROCKETS: "protonRockets",
    PROTON_TORPEDOES: "protonTorpedoes",
    PROXIMITY_MINES: "proximityMines",
    PULSED_RAY_SHIELD: "pulsedRayShield",
    PUNISHING_ONE: "punishingOne",
    PUSH_THE_LIMIT: "pushTheLimit",
    QUAD_LASER_CANNONS: "quadLaserCannons",
    QUANTUM_STORM: "quantumStorm",
    QUICK_RELEASE_CARGO_LOCKS: "quickReleaseCargoLocks",
    R2_ASTROMECH: "r2Astromech",
    R2_D2_ASTROMECH: "r2D2_astromech",
    R2_D2_CREW: "r2D2_crew",
    R2_D6: "r2D6",
    R2_F2: "r2F2",
    R3_A2: "r3A2",
    R3_ASTROMECH: "r3Astromech",
    R4_AGROMECH: "r4Agromech",
    R4_B11: "r4B11",
    R4_D6: "r4D6",
    R4_E1: "r4E1",
    R5_ASTROMECH: "r5Astromech",
    R5_D8: "r5D8",
    R5_K6: "r5K6",
    R5_P8: "r5P8",
    R5_P9: "r5P9",
    R5_TK: "r5Tk",
    R5_X3: "r5X3",
    R7_ASTROMECH: "r7Astromech",
    R7_T1: "r7T1",
    RAGE: "rage",
    RAYMUS_ANTILLES: "raymusAntilles",
    REAR_ADMIRAL_CHIRANEAU: "rearAdmiralChiraneau",
    REBEL_CAPTIVE: "rebelCaptive",
    RECON_SPECIALIST: "reconSpecialist",
    REINFORCED_DEFLECTORS: "reinforcedDeflectors",
    RENEGADE_REFIT: "renegadeRefit",
    REQUIEM: "requiem",
    REY: "rey",
    RIGGED_CARGO_CHUTE: "riggedCargoChute",
    ROYAL_GUARD_TIE: "royalGuardTie",
    RUTHLESSNESS: "ruthlessness",
    SABINE_WREN: "sabineWren",
    SABINES_MASTERPIECE: "sabinesMasterpiece",
    SABOTEUR: "saboteur",
    SALVAGED_ASTROMECH: "salvagedAstromech",
    SATURATION_SALVO: "saturationSalvo",
    SAW_GERRERA: "sawGerrera",
    SCAVENGER_CRANE: "scavengerCrane",
    SCRAMBLER_MISSILES: "scramblerMissiles",
    SEISMIC_CHARGES: "seismicCharges",
    SEISMIC_TORPEDO: "seismicTorpedo",
    SELFLESSNESS: "selflessness",
    SENSOR_CLUSTER: "sensorCluster",
    SENSOR_JAMMER: "sensorJammer",
    SENSOR_TEAM: "sensorTeam",
    SERVOMOTOR_S_FOILS_ATTACK: "servomotorSFoilsAttack",
    SERVOMOTOR_S_FOILS_CLOSED: "servomotorSFoilsClosed",
    SHADOW_CASTER: "shadowCaster",
    SHIELD_PROJECTOR: "shieldProjector",
    SHIELD_TECHNICIAN: "shieldTechnician",
    SHIELD_UPGRADE: "shieldUpgrade",
    SINGLE_TURBOLASERS: "singleTurbolasers",
    SLAVE_I: "slaveI",
    SLICER_TOOLS: "slicerTools",
    SMUGGLING_COMPARTMENT: "smugglingCompartment",
    SNAP_SHOT: "snapShot",
    SPACETUG_TRACTOR_ARRAY: "spacetugTractorArray",
    SPECIAL_OPS_TRAINING: "specialOpsTraining",
    SQUAD_LEADER: "squadLeader",
    ST_321: "st321",
    STARVIPER_MKII: "starviperMkii",
    STAY_ON_TARGET: "stayOnTarget",
    STEALTH_DEVICE: "stealthDevice",
    STYGIUM_PARTICLE_ACCELERATOR: "stygiumParticleAccelerator",
    SUPERCHARGED_POWER_CELLS: "superchargedPowerCells",
    SUPPRESSOR: "suppressor",
    SWARM_LEADER: "swarmLeader",
    SWARM_TACTICS: "swarmTactics",
    SYNCED_TURRET: "syncedTurret",
    SYSTEMS_OFFICER: "systemsOfficer",
    TACTICAL_JAMMER: "tacticalJammer",
    TACTICAL_OFFICER: "tacticalOfficer",
    TACTICIAN: "tactician",
    TAIL_GUNNER: "tailGunner",
    TANTIVE_IV: "tantiveIv",
    TARGETING_ASTROMECH: "targetingAstromech",
    TARGETING_COMPUTER: "targetingComputer",
    TARGETING_COORDINATOR: "targetingCoordinator",
    TARGETING_SCRAMBLER: "targetingScrambler",
    TARGETING_SYNCHRONIZER: "targetingSynchronizer",
    THERMAL_DETONATORS: "thermalDetonators",
    THREAT_TRACKER: "threatTracker",
    THRUST_CORRECTOR: "thrustCorrector",
    TIBANNA_GAS_SUPPLIES: "tibannaGasSupplies",
    TIE_D: "tieD",
    TIE_SHUTTLE: "tieShuttle",
    TIE_V1: "tieV1",
    TIE_X1: "tieX1",
    TIE_X7: "tieX7",
    TORYN_FARR: "torynFarr",
    TRACTOR_BEAM: "tractorBeam",
    TRAJECTORY_SIMULATOR: "trajectorySimulator",
    TRICK_SHOT: "trickShot",
    TWIN_ION_ENGINE_MK_II: "twinIonEngineMkIi",
    TWIN_LASER_TURRET: "twinLaserTurret",
    UNGUIDED_ROCKETS: "unguidedRockets",
    UNHINGED_ASTROMECH: "unhingedAstromech",
    UNKAR_PLUTT: "unkarPlutt",
    VAKSAI: "vaksai",
    VECTOR: "vector",
    VECTORED_THRUSTERS: "vectoredThrusters",
    VETERAN_INSTINCTS: "veteranInstincts",
    VIRAGO: "virago",
    WEAPONS_ENGINEER: "weaponsEngineer",
    WEAPONS_GUIDANCE: "weaponsGuidance",
    WED_15_REPAIR_DROID: "wed15RepairDroid",
    WINGMAN: "wingman",
    WIRED: "wired",
    WOOKIEE_COMMANDOS: "wookieeCommandos",
    XG_1_ASSAULT_CONFIGURATION: "xg1AssaultConfiguration",
    XX_23_S_THREAD_TRACERS: "xx23SThreadTracers",
    YSANNE_ISARD: "ysanneIsard",
    ZEB_ORRELIOS: "zebOrrelios",
    ZUCKUSS: "zuckuss",
  };

  UpgradeCard.properties = 
  {
     "aScoreToSettle": {
        "text": "During setup, before the \"Place Forces\" step, choose 1 enemy ship and assign the \"A Debt to Pay\" Condition card to it.<br /><br />When attacking a ship that has the \"A Debt to Pay\" Condition card, you may change 1 [Focus] result to a [Critical Hit] result.",
        "name": "A Score to Settle",
        "xws": "ascoretosettle",
        "unique": true,
        "points": 0,
        "slot": "Elite",
        "id": 267,
        "image": "upgrades/Elite/a-score-to-settle.png",
        "conditions": [
           "A Debt to Pay"
        ],
        "key": "aScoreToSettle"
     },
     "aWingTestPilot": {
        "name": "A-wing Test Pilot",
        "id": 157,
        "slot": "Title",
        "points": 0,
        "ship": [
           "A-wing"
        ],
        "text": "Your upgrade bar gains 1 [Elite] upgrade icon.<br /><br />You cannot equip 2 of the same [Elite] Upgrade cards. You cannot equip this if your pilot skill value is \"1\" or lower.",
        "image": "upgrades/Title/a-wing-test-pilot.png",
        "grants": [
           {
              "type": "slot",
              "name": "Elite"
           }
        ],
        "xws": "awingtestpilot",
        "key": "aWingTestPilot"
     },
     "accuracyCorrector": {
        "name": "Accuracy Corrector",
        "id": 106,
        "slot": "System",
        "points": 3,
        "text": "When attacking, during the “Modify Attack Dice” step, you may cancel all of your dice results. Then, you may add 2 [Hit] results to your roll.<br /><br />Your dice cannot be modified again during this attack.",
        "image": "upgrades/System/accuracy-corrector.png",
        "xws": "accuracycorrector",
        "key": "accuracyCorrector"
     },
     "adaptabilityDecrease": {
        "image": "upgrades/Elite/adaptability-decrease.png",
        "text": "Decrease your pilot skill value by 1.",
        "name": "Adaptability (-1)",
        "xws": "adaptability",
        "points": 0,
        "slot": "Elite",
        "id": 232,
        "dualCard": 233,
        "key": "adaptabilityDecrease"
     },
     "adaptabilityIncrease": {
        "image": "upgrades/Elite/adaptability-increase.png",
        "text": "Increase your pilot skill value by 1.",
        "name": "Adaptability (+1)",
        "xws": "adaptability",
        "points": 0,
        "slot": "Elite",
        "id": 233,
        "dualCard": 232,
        "key": "adaptabilityIncrease"
     },
     "adaptiveAilerons": {
        "image": "upgrades/Title/adaptive-ailerons.png",
        "text": "Immediately before you reveal your dial, if you are not stressed, you <strong>must</strong> execute a white ([Bank Left] 1), ([Straight] 1), or ([Bank Right] 1) maneuver.",
        "name": "Adaptive Ailerons",
        "xws": "adaptiveailerons",
        "points": 0,
        "slot": "Title",
        "ship": [
           "TIE Striker"
        ],
        "id": 270,
        "key": "adaptiveAilerons"
     },
     "admiralOzzel": {
        "name": "Admiral Ozzel",
        "id": 128,
        "unique": true,
        "faction": "Galactic Empire",
        "size": [
           "huge"
        ],
        "slot": "Crew",
        "points": 2,
        "text": "<strong>Energy:</strong> You may remove up to 3 shields from your ship. For each shield removed, gain 1 energy.",
        "image": "upgrades/Crew/admiral-ozzel.png",
        "xws": "admiralozzel",
        "key": "admiralOzzel"
     },
     "adrenalineRush": {
        "name": "Adrenaline Rush",
        "id": 42,
        "slot": "Elite",
        "points": 1,
        "text": "When you reveal a red maneuver, you may discard this card to treat that maneuver as a white maneuver until the end of the Activation phase.",
        "image": "upgrades/Elite/adrenaline-rush.png",
        "xws": "adrenalinerush",
        "key": "adrenalineRush"
     },
     "advancedAilerons": {
        "image": "upgrades/Title/advanced-ailerons.png",
        "text": "Treat your ([Bank Left] 3) and ([Bank Right] 3) maneuvers as white.<br /><br />Immediately before you reveal your dial, if you are not stressed, you must execute a white ([Bank Left] 1), ([Straight] 1), or ([Bank Right] 1) maneuver.",
        "name": "Advanced Ailerons",
        "xws": "advancedailerons",
        "points": 0,
        "slot": "Title",
        "ship": [
           "TIE Reaper"
        ],
        "id": 362,
        "key": "advancedAilerons"
     },
     "advancedCloakingDevice": {
        "name": "Advanced Cloaking Device",
        "id": 182,
        "slot": "Modification",
        "points": 4,
        "text": "After you perform an attack, you may perform a free cloak action.",
        "ship": [
           "TIE Phantom"
        ],
        "image": "upgrades/Modification/advanced-cloaking-device.png",
        "xws": "advancedcloakingdevice",
        "key": "advancedCloakingDevice"
     },
     "advancedHomingMissiles": {
        "name": "Advanced Homing Missiles",
        "id": 142,
        "slot": "Missile",
        "attack": 3,
        "range": "2",
        "points": 3,
        "text": "<strong>Attack (target lock):</strong> Discard this card to perform this attack.<br /><br />If this attack hits, deal 1 faceup Damage card to the defender. Then cancel <strong>all</strong> dice results.",
        "image": "upgrades/Missile/advanced-homing-missiles.png",
        "xws": "advhomingmissiles",
        "key": "advancedHomingMissiles"
     },
     "advancedOptics": {
        "name": "Advanced Optics",
        "xws": "advancedoptics",
        "text": "You cannot have more than 1 focus token.<br /><br />During the End phase, do not remove an unused focus token from your ship.",
        "points": 2,
        "slot": "Tech",
        "id": 347,
        "image": "upgrades/Tech/advanced-optics.png",
        "key": "advancedOptics"
     },
     "advancedProtonTorpedoes": {
        "name": "Advanced Proton Torpedoes",
        "id": 34,
        "slot": "Torpedo",
        "attack": 5,
        "range": "1",
        "points": 6,
        "text": "<strong>Attack (target lock):</strong> Spend your target lock and discard this card to perform this attack.<br /><br />You may change up to 3 of your blank results to [Focus] results.",
        "image": "upgrades/Torpedo/advanced-proton-torpedoes.png",
        "xws": "advprotontorpedoes",
        "key": "advancedProtonTorpedoes"
     },
     "advancedSensors": {
        "name": "Advanced Sensors",
        "id": 43,
        "slot": "System",
        "points": 3,
        "text": "Immediately before you reveal your maneuver, you may perform 1 free action.<br /><br />If you use this ability, you must skip your \"Perform Action\" step during this round.",
        "image": "upgrades/System/advanced-sensors.png",
        "xws": "advancedsensors",
        "key": "advancedSensors"
     },
     "advancedSlam": {
        "name": "Advanced SLAM",
        "id": 189,
        "slot": "Modification",
        "points": 2,
        "text": "After performing a SLAM action, if you did not overlap an obstacle or another ship, you may perform a free action on your action bar.",
        "image": "upgrades/Modification/advanced-slam.png",
        "xws": "advancedslam",
        "key": "advancedSlam"
     },
     "advancedTargetingComputer": {
        "name": "Advanced Targeting Computer",
        "id": 121,
        "slot": "System",
        "ship": [
           "TIE Advanced"
        ],
        "points": 5,
        "text": "When attacking with your primary weapon, if you have a target lock on the defender, you may add 1 [Critical Hit] result to your roll. If you do, you cannot spend target locks during this attack.",
        "image": "upgrades/System/advanced-targeting-computer.png",
        "xws": "advtargetingcomputer",
        "key": "advancedTargetingComputer"
     },
     "agentKallus": {
        "image": "upgrades/Crew/agent-kallus.png",
        "text": "At the start of the first round, choose 1 enemy small or large ship. When attacking or defending against that ship, you may change 1 of your [Focus] results to a [Hit] or [Evade] result.",
        "name": "Agent Kallus",
        "unique": true,
        "points": 2,
        "slot": "Crew",
        "faction": "Galactic Empire",
        "id": 200,
        "xws": "agentkallus",
        "key": "agentKallus"
     },
     "allianceOverhaul": {
        "image": "upgrades/Title/alliance-overhaul.png",
        "text": "When attacking with a primary weapon from your primary firing arc, you may roll 1 additional attack die. When attacking from your auxiliary firing arc, you may change 1 of your [Focus] results to a [Critical Hit] result.",
        "name": "Alliance Overhaul",
        "xws": "allianceoverhaul",
        "points": 0,
        "slot": "Title",
        "ship": [
           "ARC-170"
        ],
        "id": 246,
        "key": "allianceOverhaul"
     },
     "andrasta": {
        "name": "Andrasta",
        "id": 168,
        "slot": "Title",
        "unique": true,
        "points": 0,
        "ship": [
           "Firespray-31"
        ],
        "text": "Your upgrade bar gains two additional [Bomb] upgrade icons.",
        "image": "upgrades/Title/andrasta.png",
        "grants": [
           {
              "type": "slot",
              "name": "Bomb"
           },
           {
              "type": "slot",
              "name": "Bomb"
           }
        ],
        "xws": "andrasta",
        "key": "andrasta"
     },
     "antiPursuitLasers": {
        "name": "Anti-Pursuit Lasers",
        "id": 177,
        "slot": "Modification",
        "points": 2,
        "text": "After an enemy ship executes a maneuver that causes it to overlap your ship, roll 1 attack die.  On a [Hit] or [Critical Hit] result, the enemy ship suffers 1 damage.",
        "size": [
           "large"
        ],
        "image": "upgrades/Modification/anti-pursuit-lasers.png",
        "xws": "antipursuitlasers",
        "key": "antiPursuitLasers"
     },
     "arcCaster": {
        "image": "upgrades/Cannon/arc-caster.png",
        "text": "<strong>Attack:</strong> Attack 1 ship. If this attack hits, you must choose 1 other ship at Range 1 of the defender to suffer 1 damage.<br /><br />Then flip this card.",
        "name": "ARC Caster",
        "xws": "arccaster",
        "points": 2,
        "slot": "Cannon",
        "range": "1",
        "attack": 4,
        "faction": "Scum and Villainy",
        "id": 310,
        "dualCard": 311,
        "key": "arcCaster"
     },
     "arcCasterRecharging": {
        "image": "upgrades/Cannon/arc-caster-recharging.png",
        "text": "At the start of the Combat phase, you may receive a weapons disabled token to flip this card.",
        "name": "ARC Caster (Recharging)",
        "xws": "arccaster",
        "points": 2,
        "slot": "Cannon",
        "faction": "Scum and Villainy",
        "id": 311,
        "dualCard": 310,
        "key": "arcCasterRecharging"
     },
     "assailer": {
        "name": "Assailer",
        "id": 171,
        "slot": "Title",
        "unique": true,
        "points": 2,
        "ship": [
           "Raider-class Corvette (Aft)"
        ],
        "text": "When defending, if the targeted section has a reinforce token, you may change 1 [Focus] result to a [Evade] result.",
        "image": "upgrades/Title/assailer.png",
        "xws": "assailer",
        "key": "assailer"
     },
     "assaultMissiles": {
        "name": "Assault Missiles",
        "id": 26,
        "slot": "Missile",
        "points": 5,
        "attack": 4,
        "range": "2-3",
        "text": "<strong>Attack (target lock):</strong> Spend your target lock and discard this card to perform this attack.<br /><br />If this attack hits, each other ship at Range 1 of the defender suffers 1 damage.",
        "image": "upgrades/Missile/assault-missiles.png",
        "xws": "assaultmissiles",
        "key": "assaultMissiles"
     },
     "attanniMindlink": {
        "image": "upgrades/Elite/attanni-mindlink.png",
        "name": "Attanni Mindlink",
        "xws": "attannimindlink",
        "text": "Each time you are assigned a focus or stress token, each other friendly ship with Attanni Mindlink must also be assigned the same type of token if it does not already have one.",
        "points": 1,
        "slot": "Elite",
        "faction": "Scum and Villainy",
        "squadLimited": 2,
        "id": 236,
        "key": "attanniMindlink"
     },
     "autoblaster": {
        "name": "Autoblaster",
        "id": 35,
        "slot": "Cannon",
        "attack": 3,
        "range": "1",
        "points": 5,
        "text": "<strong>Attack:</strong> Attack 1 ship.<br /><br />Your [Hit] results cannot be canceled by defense dice.<br /><br />The defender may cancel [Critical Hit] results before [Hit] results.",
        "image": "upgrades/Cannon/autoblaster.png",
        "xws": "autoblaster",
        "key": "autoblaster"
     },
     "autoblasterTurret": {
        "name": "Autoblaster Turret",
        "id": 116,
        "slot": "Turret",
        "points": 2,
        "attack": 2,
        "range": "1",
        "text": "<strong>Attack:</strong> Attack 1 ship (even a ship outside your firing arc).<br /><br />Your [Hit] results cannot be canceled by defense dice. The defender may cancel [Critical Hit] results before [Hit] results.",
        "image": "upgrades/Turret/autoblaster-turret.png",
        "xws": "autoblasterturret",
        "key": "autoblasterTurret"
     },
     "automatedProtocols": {
        "image": "upgrades/Modification/automated-protocols.png",
        "text": "Once per round, after you perform an action that is not a recover or reinforce action, you may spend 1 energy to perform a free recover or reinforce action.",
        "name": "Automated Protocols",
        "points": 5,
        "slot": "Modification",
        "size": [
           "huge"
        ],
        "id": 202,
        "xws": "automatedprotocols",
        "key": "automatedProtocols"
     },
     "autothrusters": {
        "name": "Autothrusters",
        "id": 188,
        "slot": "Modification",
        "points": 2,
        "text": "When defending, if you are inside the attacker’s firing arc beyond Range 2 or outside the attacker’s firing arc, you may change 1 of your blank results to a [Evade] result. You can equip this card only if you have the [Boost] action icon.",
        "image": "upgrades/Modification/autothrusters.png",
        "xws": "autothrusters",
        "key": "autothrusters"
     },
     "azmorigan": {
        "image": "upgrades/Crew/azmorigan.png",
        "text": "At the start of the End phase, you may spend 1 energy to replace a faceup [Crew] or [Team] Upgrade card you have equipped with another Upgrade card of the same type of equal or fewer squad points.",
        "name": "Azmorigan",
        "xws": "azmorigan",
        "unique": true,
        "points": 2,
        "slot": "Crew",
        "ship": [
           "CR90 Corvette (Fore)"
        ],
        "size": [
           "huge"
        ],
        "faction": "Scum and Villainy",
        "id": 301,
        "key": "azmorigan"
     },
     "bWingE2": {
        "name": "B-wing/E2",
        "id": 184,
        "slot": "Modification",
        "points": 1,
        "text": "Your upgrade bar gains the [Crew] upgrade icon.",
        "ship": [
           "B-wing"
        ],
        "image": "upgrades/Modification/b-wing-e2.png",
        "grants": [
           {
              "type": "slot",
              "name": "Crew"
           }
        ],
        "xws": "bwinge2",
        "key": "bWingE2"
     },
     "backupShieldGenerator": {
        "name": "Backup Shield Generator",
        "id": 83,
        "slot": "Cargo",
        "limited": true,
        "points": 3,
        "text": "At the end of each round, you may spend 1 energy to recover 1 shield (up to your shield value).",
        "image": "upgrades/Cargo/backup-shield-generator.png",
        "xws": "backupshieldgenerator",
        "key": "backupShieldGenerator"
     },
     "bazeMalbus": {
        "image": "upgrades/Crew/baze-malbus.png",
        "text": "After you perform an attack that does not hit, you may immediately perform a primary weapon attack against a different ship. You cannot perform another attack this round.",
        "name": "Baze Malbus",
        "xws": "bazemalbus",
        "unique": true,
        "points": 3,
        "slot": "Crew",
        "faction": "Rebel Alliance",
        "id": 291,
        "key": "bazeMalbus"
     },
     "bb8": {
        "name": "BB-8",
        "id": 144,
        "unique": true,
        "slot": "Astromech",
        "points": 2,
        "text": "When you reveal a green maneuver, you may perform a free barrel roll action.",
        "image": "upgrades/Astromech/bb-8.png",
        "xws": "bb8",
        "key": "bb8"
     },
     "bistan": {
        "text": "When attacking at Range 1-2, you may change 1 of your [Hit] results to a [Critical Hit] result.",
        "name": "Bistan",
        "xws": "bistan",
        "unique": true,
        "points": 2,
        "slot": "Crew",
        "faction": "Rebel Alliance",
        "id": 298,
        "image": "upgrades/Crew/bistan.png",
        "key": "bistan"
     },
     "blackMarketSlicerTools": {
        "text": "<strong>Action:</strong> Choose a stressed enemy ship at Range 1-2 and roll 1 attack die. On a [Hit] or [Critical Hit] result, remove 1 stress token and deal it 1 facedown Damage card.",
        "name": "Black Market Slicer Tools",
        "xws": "blackmarketslicertools",
        "points": 1,
        "slot": "Illicit",
        "id": 262,
        "image": "upgrades/Illicit/black-market-slicer-tools.png",
        "key": "blackMarketSlicerTools"
     },
     "blackOne": {
        "text": "After you perform a boost or barrel roll action, you may remove 1 enemy target lock from a friendly ship at Range 1. You cannot equip this card if your pilot skill is \"6\" or lower.",
        "name": "Black One",
        "xws": "blackone",
        "unique": true,
        "points": 1,
        "slot": "Title",
        "ship": [
           "T-70 X-wing"
        ],
        "id": 244,
        "image": "upgrades/Title/black-one.png",
        "key": "blackOne"
     },
     "blasterTurret": {
        "name": "Blaster Turret",
        "id": 37,
        "slot": "Turret",
        "points": 4,
        "attack": 3,
        "range": "1-2",
        "text": "<strong>Attack (focus):</strong> Spend 1 focus token to perform this attack against 1 ship (even a ship outside your firing arc).",
        "image": "upgrades/Turret/blaster-turret.png",
        "xws": "blasterturret",
        "key": "blasterTurret"
     },
     "bobaFett": {
        "image": "upgrades/Crew/boba-fett.png",
        "text": "After performing an attack, if the defender was dealt a faceup Damage card, you may discard this card to choose and discard 1 of the defender's Upgrade cards.",
        "name": "Boba Fett",
        "xws": "bobafett",
        "unique": true,
        "points": 1,
        "slot": "Crew",
        "faction": "Scum and Villainy",
        "id": 238,
        "key": "bobaFett"
     },
     "bodhiRook": {
        "image": "upgrades/Crew/bodhi-rook.png",
        "text": "When you acquire a target lock, you can lock onto an enemy ship at Range 1-3 of any friendly ship.",
        "name": "Bodhi Rook",
        "xws": "bodhirook",
        "unique": true,
        "points": 1,
        "slot": "Crew",
        "faction": "Rebel Alliance",
        "id": 290,
        "key": "bodhiRook"
     },
     "bodyguard": {
        "name": "Bodyguard",
        "id": 108,
        "slot": "Elite",
        "unique": true,
        "faction": "Scum and Villainy",
        "points": 2,
        "text": "At the start of the Combat phase, you may spend a focus token to choose a friendly ship at Range 1 with higher pilot skill than you. Increase its agility value by 1 until the end of the round.",
        "image": "upgrades/Elite/bodyguard.png",
        "xws": "bodyguard",
        "key": "bodyguard"
     },
     "bombLoadout": {
        "name": "Bomb Loadout",
        "id": 111,
        "limited": true,
        "ship": [
           "Y-wing"
        ],
        "slot": "Torpedo",
        "points": 0,
        "text": "Your upgrade bar gains the [Bomb] icon.",
        "image": "upgrades/Torpedo/bomb-loadout.png",
        "xws": "bombloadout",
        "grants": [
           {
              "type": "slot",
              "name": "Bomb"
           }
        ],
        "key": "bombLoadout"
     },
     "bombardier": {
        "name": "Bombardier",
        "id": 140,
        "slot": "Crew",
        "points": 1,
        "text": "When dropping a bomb, you may use the ([Straight] 2) template instead of the ([Straight] 1) template.",
        "image": "upgrades/Crew/bombardier.png",
        "xws": "bombardier",
        "key": "bombardier"
     },
     "bombletGenerator": {
        "image": "upgrades/Bomb/bomblet-generator.png",
        "text": "When you reveal your maneuver, you may <strong>drop</strong> 1 bomblet token.<br /><br />This token <strong>detonates</strong> at the end of the Activation phase.",
        "name": "Bomblet Generator",
        "xws": "bombletgenerator",
        "unique": true,
        "points": 3,
        "slot": "Bomb",
        "effect": "When this token detonates, each ship at Range 1 of the token rolls 2 attack dice and suffers all damage ([Hit]) and critical damage ([Critical Hit]) rolled. Then discard this token.",
        "id": 324,
        "key": "bombletGenerator"
     },
     "boshek": {
        "image": "upgrades/Crew/boshek.png",
        "text": "When a ship you are touching activates, you may look at its chosen maneuver. If you do, its owner <strong>must</strong> rotate the dial to an adjacent maneuver. The ship can reveal and execute that maneuver even while stressed.",
        "name": "BoShek",
        "xws": "boshek",
        "unique": true,
        "points": 2,
        "slot": "Crew",
        "id": 304,
        "key": "boshek"
     },
     "bossk": {
        "name": "Bossk",
        "unique": true,
        "id": 131,
        "slot": "Crew",
        "points": 2,
        "text": "After you perform an attack that does not hit, if you are not stressed, you <strong>must</strong> receive 1 stress token. Then assign 1 focus token to your ship and acquire a target lock on the defender.",
        "image": "upgrades/Crew/bossk.png",
        "faction": "Scum and Villainy",
        "xws": "bossk",
        "key": "bossk"
     },
     "breachSpecialist": {
        "image": "upgrades/Crew/breach-specialist.png",
        "text": "When you are dealt a faceup Damage card, you may spend 1 reinforce token to flip it facedown (without resolving its effect). If you do, until the end of the round, when you are dealt a faceup Damage card, flip it facedown (without resolving its effect).",
        "name": "Breach Specialist",
        "xws": "breachspecialist",
        "points": 1,
        "slot": "Crew",
        "id": 323,
        "key": "breachSpecialist"
     },
     "brightHope": {
        "name": "Bright Hope",
        "id": 159,
        "unique": true,
        "slot": "Title",
        "points": 5,
        "energy": 2,
        "ship": [
           "GR-75 Medium Transport"
        ],
        "text": "A reinforce token assigned to your fore section acts as 2 [Evade] results (instead of one).",
        "image": "upgrades/Title/bright-hope.png",
        "xws": "brighthope",
        "key": "brightHope"
     },
     "broadcastArray": {
        "image": "upgrades/Cargo/broadcast-array.png",
        "text": "Your action bar gains the [Jam] action icon.",
        "name": "Broadcast Array",
        "points": 2,
        "slot": "Cargo",
        "ship": [
           "Gozanti-class Cruiser"
        ],
        "id": 205,
        "xws": "broadcastarray",
        "grants": [
           {
              "type": "action",
              "name": "Jam"
           }
        ],
        "key": "broadcastArray"
     },
     "brokenHorn": {
        "image": "upgrades/Title/broken-horn.png",
        "text": "When defending, if you have a reinforce token, you may add 1 additional [Evade] result. If you do, after defending, discard your reinforce token.",
        "name": "Broken Horn",
        "xws": "brokenhorn",
        "unique": true,
        "points": 5,
        "slot": "Title",
        "ship": [
           "C-ROC Cruiser"
        ],
        "id": 305,
        "energy": 2,
        "key": "brokenHorn"
     },
     "btlA4YWing": {
        "name": "BTL-A4 Y-wing",
        "id": 169,
        "slot": "Title",
        "points": 0,
        "ship": [
           "Y-wing"
        ],
        "text": "You cannot attack ships outside your firing arc. After you perform a primary weapon attack, you may immediately perform an attack with a [Turret] secondary weapon.",
        "image": "upgrades/Title/btl-a4-y-wing.png",
        "xws": "btla4ywing",
        "key": "btlA4YWing"
     },
     "burnoutSlam": {
        "image": "upgrades/Illicit/burnout-slam.png",
        "text": "Your action bar gains the [SLAM] action icon.<br /><br />After you perform a SLAM action, discard this card.",
        "name": "Burnout SLAM",
        "xws": "burnoutslam",
        "points": 1,
        "slot": "Illicit",
        "size": [
           "large"
        ],
        "id": 274,
        "grants": [
           {
              "type": "action",
              "name": "SLAM"
           }
        ],
        "key": "burnoutSlam"
     },
     "c3po": {
        "name": "C-3PO",
        "unique": true,
        "id": 63,
        "slot": "Crew",
        "points": 3,
        "faction": "Rebel Alliance",
        "text": "Once per round, before you roll 1 or more defense dice, you may guess aloud a number of [Evade] results.  If you roll that many [Evade] results (before modifying dice), add 1 [Evade] result.",
        "image": "upgrades/Crew/c-3po.png",
        "xws": "c3po",
        "key": "c3po"
     },
     "cadBane": {
        "image": "upgrades/Crew/cad-bane.png",
        "text": "Your upgrade bar gains the [Bomb] upgrade icon. Once per round, when an enemy ship rolls attack dice due to a friendly bomb detonating, you may choose any number of [Focus] and blank results. It must reroll those results.",
        "name": "Cad Bane",
        "xws": "cadbane",
        "unique": true,
        "points": 2,
        "slot": "Crew",
        "faction": "Scum and Villainy",
        "id": 325,
        "grants": [
           {
              "type": "slot",
              "name": "Bomb"
           }
        ],
        "key": "cadBane"
     },
     "calculation": {
        "name": "Calculation",
        "id": 125,
        "slot": "Elite",
        "points": 1,
        "text": "When attacking, you may spend a focus token to change 1 of your [Focus] results to a [Critical Hit] result.",
        "image": "upgrades/Elite/calculation.png",
        "xws": "calculation",
        "key": "calculation"
     },
     "captainNeeda": {
        "name": "Captain Needa",
        "id": 127,
        "unique": true,
        "faction": "Galactic Empire",
        "size": [
           "huge"
        ],
        "slot": "Crew",
        "points": 2,
        "text": "If you overlap an obstacle during the Activation phase, do not suffer 1 faceup damage card. Instead, roll 1 attack die. On a [Hit] or [Critical Hit] result, suffer 1 damage.",
        "image": "upgrades/Crew/captain-needa.png",
        "xws": "captainneeda",
        "key": "captainNeeda"
     },
     "captainRex": {
        "image": "upgrades/Crew/captain-rex.png",
        "text": "After you perform an attack that does not hit, you may assign 1 focus token to your ship.",
        "name": "Captain Rex",
        "xws": "captainrex",
        "unique": true,
        "points": 2,
        "slot": "Crew",
        "faction": "Rebel Alliance",
        "id": 285,
        "key": "captainRex"
     },
     "capturedTie": {
        "image": "upgrades/Modification/captured-tie.png",
        "text": "Enemy ships with a pilot skill value lower than yours cannot declare you as the target of an attack. After you perform an attack or when you are the only remaining friendly ship in play, discard this card.",
        "name": "Captured TIE",
        "xws": "capturedtie",
        "unique": true,
        "points": 1,
        "slot": "Modification",
        "ship": [
           "TIE Fighter"
        ],
        "faction": "Rebel Alliance",
        "id": 284,
        "key": "capturedTie"
     },
     "carlistRieekan": {
        "name": "Carlist Rieekan",
        "id": 80,
        "unique": true,
        "slot": "Crew",
        "points": 3,
        "faction": "Rebel Alliance",
        "text": "At the start of the Activation phase, you may discard this card to treat each friendly ship's pilot skill value as \"12\" until the end of the phase.",
        "size": [
           "huge"
        ],
        "image": "upgrades/Crew/carlist-rieekan.png",
        "xws": "carlistrieekan",
        "key": "carlistRieekan"
     },
     "cassianAndor": {
        "image": "upgrades/Crew/cassian-andor.png",
        "text": "At the end of the Planning phase, you may choose an enemy ship at Range 1-2. Guess aloud that ship's bearing and speed, then look at its dial. If you are correct, you may rotate your dial to another maneuver.",
        "name": "Cassian Andor",
        "xws": "cassianandor",
        "unique": true,
        "points": 2,
        "slot": "Crew",
        "faction": "Rebel Alliance",
        "id": 269,
        "key": "cassianAndor"
     },
     "chardaanRefit": {
        "name": "Chardaan Refit",
        "id": 72,
        "slot": "Missile",
        "points": -2,
        "text": "This card has a negative squad point cost.",
        "ship": [
           "A-wing"
        ],
        "image": "upgrades/Missile/chardaan-refit.png",
        "xws": "chardaanrefit",
        "key": "chardaanRefit"
     },
     "chewbacca": {
        "name": "Chewbacca",
        "id": 33,
        "unique": true,
        "faction": "Rebel Alliance",
        "slot": "Crew",
        "points": 4,
        "text": "When you are dealt a Damage card, you may immediately discard that card and recover 1 shield.<br /><br />Then, discard this Upgrade card.",
        "image": "upgrades/Crew/chewbacca.png",
        "xws": "chewbacca",
        "key": "chewbacca"
     },
     "chopper_astromech": {
        "image": "upgrades/Astromech/chopper.png",
        "text": "<strong>Action:</strong> Discard 1 other equipped Upgrade card to recover 1 shield.",
        "name": "\"Chopper\"",
        "xws": "chopper-swx72",
        "unique": true,
        "points": 1,
        "slot": "Astromech",
        "id": 345,
        "key": "chopper_astromech"
     },
     "chopper_crew": {
        "image": "upgrades/Crew/chopper.png",
        "text": "You may perform actions even while you are stressed.<br /><br />After you perform an action while you are stressed, suffer 1 damage.",
        "name": "\"Chopper\"",
        "unique": true,
        "points": 0,
        "slot": "Crew",
        "faction": "Rebel Alliance",
        "id": 216,
        "xws": "chopper",
        "key": "chopper_crew"
     },
     "cikatroVizago": {
        "image": "upgrades/Crew/cikatro-vizago.png",
        "text": "At the start of the End phase, you may discard this card to replace a faceup [Illicit] or [Cargo] Upgrade card you have equipped with another Upgrade card of the same type of equal or fewer squad points.",
        "name": "Cikatro Vizago",
        "xws": "cikatrovizago",
        "unique": true,
        "points": 0,
        "slot": "Crew",
        "faction": "Scum and Villainy",
        "id": 300,
        "key": "cikatroVizago"
     },
     "cloakingDevice": {
        "image": "upgrades/Illicit/cloaking-device.png",
        "text": "<strong>Action:</strong> Perform a free cloak action.<br /><br />At the end of each round, roll 1 attack die. On a [Focus] result, discard this card, then decloak or discard your cloak token.",
        "name": "Cloaking Device",
        "unique": true,
        "points": 2,
        "slot": "Illicit",
        "size": [
           "small"
        ],
        "id": 196,
        "xws": "cloakingdevice",
        "key": "cloakingDevice"
     },
     "clusterBombs": {
        "text": "After defending, you may discard this card. If you do, each other ship at Range 1 of the defending section rolls 2 attack dice, suffering all damage ([Hit]) and critical damage ([Critical Hit]) rolled.",
        "name": "Cluster Bombs",
        "points": 4,
        "slot": "Cargo",
        "id": 225,
        "xws": "clusterbombs",
        "image": "upgrades/Cargo/cluster-bombs.png",
        "key": "clusterBombs"
     },
     "clusterMines": {
        "name": "Cluster Mines",
        "id": 139,
        "slot": "Bomb",
        "points": 4,
        "text": "<strong>Action:</strong> Discard this card to <strong>drop</strong> 1 cluster mine token set.<br /><br />When a ship's base or maneuver template overlaps a cluster mine token, that token <strong>detonates</strong>.",
        "effect": "<strong>Bomb Token:</strong> When one of these bomb token detonates, the ship that moved through or overlapped that token rolls 2 attack dice and suffers 1 damage for each [Hit] and [Critical Hit] rolled. Then discard that token.",
        "image": "upgrades/Bomb/cluster-mines.png",
        "xws": "clustermines",
        "key": "clusterMines"
     },
     "clusterMissiles": {
        "name": "Cluster Missiles",
        "id": 14,
        "slot": "Missile",
        "points": 4,
        "attack": 3,
        "range": "1-2",
        "text": "<strong>Attack (target lock):</strong> Spend your target lock and discard this card to perform this attack twice.",
        "image": "upgrades/Missile/cluster-missiles.png",
        "xws": "clustermissiles",
        "key": "clusterMissiles"
     },
     "collisionDetector": {
        "image": "upgrades/System/collision-detector.png",
        "text": "When performing a boost, barrel roll, or decloak, your ship and maneuver template can overlap obstacles.<br /><br />When rolling for obstacle damage, ignore all [Critical Hit] results.",
        "name": "Collision Detector",
        "xws": "collisiondetector",
        "points": 0,
        "slot": "System",
        "id": 253,
        "key": "collisionDetector"
     },
     "combatRetrofit": {
        "name": "Combat Retrofit",
        "id": 183,
        "slot": "Modification",
        "points": 10,
        "text": "Increase your hull value by 2 and your shield value by 1.",
        "ship": [
           "GR-75 Medium Transport"
        ],
        "size": [
           "huge"
        ],
        "image": "upgrades/Modification/combat-retrofit.png",
        "xws": "combatretrofit",
        "grants": [
           {
              "type": "stats",
              "name": "hull",
              "value": 2
           },
           {
              "type": "stats",
              "name": "shields",
              "value": 1
           }
        ],
        "key": "combatRetrofit"
     },
     "commRelay": {
        "name": "Comm Relay",
        "id": 149,
        "slot": "Tech",
        "points": 3,
        "text": "You cannot have more than 1 evade token.<br /><br />During the End phase, do not remove an unused evade token from your ship.",
        "image": "upgrades/Tech/comm-relay.png",
        "xws": "commrelay",
        "key": "commRelay"
     },
     "commsBooster": {
        "name": "Comms Booster",
        "id": 50,
        "slot": "Cargo",
        "points": 4,
        "text": "<strong>Energy:</strong> Spend 1 energy to remove all stress tokens from a friendly ship at Range 1-3.  Then assign 1 focus token to that ship.",
        "image": "upgrades/Cargo/comms-booster.png",
        "xws": "commsbooster",
        "key": "commsBooster"
     },
     "concordDawnProtector": {
        "text": "When defending, if you are inside the attacker's firing arc and at Range 1 and the attacker is inside your firing arc, add 1 [Evade] result.",
        "name": "Concord Dawn Protector",
        "xws": "concorddawnprotector",
        "points": 1,
        "slot": "Title",
        "ship": [
           "Protectorate Starfighter"
        ],
        "id": 248,
        "image": "upgrades/Title/concord-dawn-protector.png",
        "key": "concordDawnProtector"
     },
     "concussionMissiles": {
        "name": "Concussion Missiles",
        "id": 13,
        "slot": "Missile",
        "points": 4,
        "attack": 4,
        "range": "2-3",
        "text": "<strong>Attack (target lock):</strong>  Spend your target lock and discard this card to perform this attack.<br /><br />You may change 1 of your blank results to a [Hit] result.",
        "image": "upgrades/Missile/concussion-missiles.png",
        "xws": "concussionmissiles",
        "key": "concussionMissiles"
     },
     "connerNet": {
        "name": "Conner Net",
        "id": 135,
        "slot": "Bomb",
        "points": 4,
        "text": "<strong>Action:</strong> Discard this card to <strong>drop</strong> 1 Conner net token.<br /><br />When a ship's base or maneuver template overlaps this token, this token <strong>detonates</strong>.",
        "effect": "<strong>Bomb Token:</strong> When this bomb token detonates, the ship that moved through or overlapped this token suffers 1 damage, receives 2 ion tokens and must skip its \"Perform Action\" step. Then discard this token.",
        "image": "upgrades/Bomb/conner-net.png",
        "xws": "connernet",
        "key": "connerNet"
     },
     "constructionDroid": {
        "text": "When you perform a recover action, you may spend 1 energy to discard 1 facedown Damage card.",
        "name": "Construction Droid",
        "limited": true,
        "points": 3,
        "slot": "Crew",
        "size": [
           "huge"
        ],
        "id": 223,
        "xws": "constructiondroid",
        "image": "upgrades/Crew/construction-droid.png",
        "key": "constructionDroid"
     },
     "contrabandCybernetics": {
        "image": "upgrades/Illicit/contraband-cybernetics.png",
        "text": "When you become the active ship during the Activation phase, you may discard this card and receive 1 stress token. If you do, until the end of the round, you may perform actions and red maneuvers even while you are stressed.",
        "name": "Contraband Cybernetics",
        "xws": "contrabandcybernetics",
        "points": 1,
        "slot": "Illicit",
        "id": 342,
        "key": "contrabandCybernetics"
     },
     "coolHand": {
        "name": "Cool Hand",
        "id": 146,
        "slot": "Elite",
        "points": 1,
        "text": "When you receive a stress token, you may discard this card to assign 1 focus or evade token to your ship.",
        "image": "upgrades/Elite/cool-hand.png",
        "xws": "coolhand",
        "key": "coolHand"
     },
     "countermeasures": {
        "name": "Countermeasures",
        "id": 186,
        "slot": "Modification",
        "points": 3,
        "text": "At the start of the Combat phase, you may discard this card to increase your agility value by 1 until the end of the round. Then you may remove 1 enemy target lock from your ship.",
        "image": "upgrades/Modification/countermeasures.png",
        "size": [
           "large"
        ],
        "xws": "countermeasures",
        "key": "countermeasures"
     },
     "courierDroid": {
        "image": "upgrades/Crew/courier-droid.png",
        "text": "At the start of the \"Place Forces\" step, you may choose to treat your pilot skill value as \"0\" or \"8\" until the end of the step.",
        "name": "Courier Droid",
        "xws": "courierdroid",
        "limited": true,
        "points": 0,
        "slot": "Crew",
        "id": 344,
        "key": "courierDroid"
     },
     "crackShot": {
        "name": "Crack Shot",
        "id": 141,
        "slot": "Elite",
        "points": 1,
        "text": "When attacking a ship inside your firing arc, at the start of the 'Compare Results' step, you may discard this card to cancel 1 of the defender's [Evade] results.",
        "image": "upgrades/Elite/crack-shot.png",
        "xws": "crackshot",
        "key": "crackShot"
     },
     "crossfireFormation": {
        "name": "Crossfire Formation",
        "xws": "crossfireformation",
        "text": "When defending, if there is at least 1 other friendly Resistance ship at Range 1-2 of the attacker, you may add one [Focus] result to your roll.",
        "points": 2,
        "slot": "Title",
        "ship": [
           "B/SF-17 Bomber"
        ],
        "id": 348,
        "image": "upgrades/Title/crossfire-formation.png",
        "key": "crossfireFormation"
     },
     "cruiseMissiles": {
        "text": "<strong>Attack (Target Lock):</strong> Discard this card to perform this attack.<br /><br />You may roll additional attack dice equal to the speed of the maneuver you executed this round, to a maximum of 4 additional dice.",
        "name": "Cruise Missiles",
        "xws": "cruisemissiles",
        "points": 3,
        "slot": "Missile",
        "range": "2-3",
        "attack": 1,
        "id": 328,
        "image": "upgrades/Missile/cruise-missiles.png",
        "key": "cruiseMissiles"
     },
     "daredevil": {
        "name": "Daredevil",
        "id": 15,
        "slot": "Elite",
        "points": 3,
        "text": "<strong>Action:</strong> Execute a white ([Turn Left] 1) or ([Turn Right] 1) maneuver. Then, receive 1 stress token. Then, if you do not have the [Boost] action icon, roll 2 attack dice.  Suffer any damage ([Hit]) and any critical damage ([Critical Hit]) rolled.",
        "image": "upgrades/Elite/daredevil.png",
        "xws": "daredevil",
        "key": "daredevil"
     },
     "darthVader": {
        "name": "Darth Vader",
        "id": 45,
        "unique": true,
        "faction": "Galactic Empire",
        "slot": "Crew",
        "points": 3,
        "text": "After you perform an attack against an enemy ship, you may suffer 2 damage to cause that ship to suffer 1 critical damage.",
        "image": "upgrades/Crew/darth-vader.png",
        "xws": "darthvader",
        "key": "darthVader"
     },
     "dashRendar": {
        "name": "Dash Rendar",
        "id": 97,
        "slot": "Crew",
        "unique": true,
        "faction": "Rebel Alliance",
        "points": 2,
        "text": "You may perform attacks while overlapping an obstacle.<br /><br />Your attacks cannot be obstructed.",
        "image": "upgrades/Crew/dash-rendar.png",
        "xws": "dashrendar",
        "key": "dashRendar"
     },
     "dauntless": {
        "name": "Dauntless",
        "id": 164,
        "slot": "Title",
        "unique": true,
        "points": 2,
        "ship": [
           "VT-49 Decimator"
        ],
        "text": "After you execute a maneuver that causes you to overlap another ship, you may perform 1 free action. Then receive 1 stress token.",
        "image": "upgrades/Title/dauntless.png",
        "xws": "dauntless",
        "key": "dauntless"
     },
     "deadMansSwitch": {
        "name": "Dead Man's Switch",
        "id": 113,
        "slot": "Illicit",
        "points": 2,
        "text": "When you are destroyed, each ship at Range 1 suffers 1 damage.",
        "image": "upgrades/Illicit/dead-man-s-switch.png",
        "xws": "deadmansswitch",
        "key": "deadMansSwitch"
     },
     "deadeye": {
        "name": "Deadeye",
        "id": 19,
        "slot": "Elite",
        "points": 1,
        "text": "You may treat the <strong>Attack (target lock):</strong> header as <strong>Attack (focus):</strong>.<br /><br />When an attack instructs you to spend a target lock, you may spend a focus token instead.",
        "image": "upgrades/Elite/deadeye.png",
        "xws": "deadeye",
        "size": [
           "small"
        ],
        "key": "deadeye"
     },
     "deathTroopers": {
        "image": "upgrades/Crew/death-troopers.png",
        "text": "After another friendly ship at Range 1 becomes the defender, if you are inside the attacker's firing arc at Range 1-3, the attacker receives 1 stress token.",
        "name": "Death Troopers",
        "xws": "deathtroopers",
        "unique": true,
        "points": 2,
        "slot": "Crew",
        "faction": "Galactic Empire",
        "id": 357,
        "key": "deathTroopers"
     },
     "debrisGambit": {
        "image": "upgrades/Elite/debris-gambit.png",
        "text": "<strong>Action:</strong> Assign 1 evade token to your ship for each obstacle at Range 1, to a maximum of 2 evade tokens.",
        "name": "Debris Gambit",
        "xws": "debrisgambit",
        "points": 2,
        "slot": "Elite",
        "size": [
           "small"
        ],
        "id": 350,
        "key": "debrisGambit"
     },
     "decoy": {
        "name": "Decoy",
        "id": 55,
        "slot": "Elite",
        "points": 2,
        "text": "At the start of the Combat phase, you may choose 1 friendly ship at Range 1-2. Exchange your pilot skill with that ship's pilot skill until the end of the phase.",
        "image": "upgrades/Elite/decoy.png",
        "xws": "decoy",
        "key": "decoy"
     },
     "deflectivePlating": {
        "text": "When a friendly bomb token detonates, you may choose not to suffer its effects. If you do, roll an attack die. on a [Hit] result, discard this card.",
        "name": "Deflective Plating",
        "xws": "deflectiveplating",
        "points": 1,
        "slot": "Modification",
        "ship": [
           "B/SF-17 Bomber"
        ],
        "id": 349,
        "image": "upgrades/Modification/deflective-plating.png",
        "key": "deflectivePlating"
     },
     "dengar": {
        "image": "upgrades/Crew/dengar.png",
        "text": "When attacking, you may reroll 1 attack die. If the defender is a unique pilot, you may instead reroll up to 2 attack dice.",
        "name": "Dengar",
        "xws": "dengar",
        "unique": true,
        "points": 3,
        "slot": "Crew",
        "faction": "Scum and Villainy",
        "id": 240,
        "key": "dengar"
     },
     "determination": {
        "name": "Determination",
        "id": 8,
        "slot": "Elite",
        "points": 1,
        "text": "When you are dealt a faceup Damage card with the <strong>Pilot</strong> trait, discard it immediately without resolving its effect.",
        "image": "upgrades/Elite/determination.png",
        "xws": "determination",
        "key": "determination"
     },
     "directorKrennic": {
        "text": "During setup, before the \"Place Forces\" step, assign the \"Optimized Prototype\" Condition to a friendly Galactic Empire ship with 3 or fewer shields.",
        "name": "Director Krennic",
        "xws": "directorkrennic",
        "unique": true,
        "points": 5,
        "slot": "Crew",
        "faction": "Galactic Empire",
        "id": 356,
        "image": "upgrades/Crew/director-krennic.png",
        "conditions": [
           "Optimized Prototype"
        ],
        "key": "directorKrennic"
     },
     "dockingClamps": {
        "image": "upgrades/Cargo/docking-clamps.png",
        "text": "You may dock up to 4 TIE fighters, TIE Interceptors, TIE bombers, or TIE Advanced to this ship. All of these ships must have the same ship type.",
        "name": "Docking Clamps",
        "limited": true,
        "points": 0,
        "slot": "Cargo",
        "ship": [
           "Gozanti-class Cruiser"
        ],
        "id": 206,
        "xws": "dockingclamps",
        "key": "dockingClamps"
     },
     "dodonnasPride": {
        "name": "Dodonna's Pride",
        "id": 156,
        "unique": true,
        "slot": "Title",
        "points": 4,
        "ship": [
           "CR90 Corvette (Fore)"
        ],
        "text": "When you perform a coordinate action, you may choose 2 friendly ships (instead of 1).  Those ships may each perform 1 free action.",
        "image": "upgrades/Title/dodonna-s-pride.png",
        "xws": "dodonnaspride",
        "key": "dodonnasPride"
     },
     "dorsalTurret": {
        "image": "upgrades/Turret/dorsal-turret.png",
        "text": "<strong>Attack:</strong> Attack 1 ship (even a ship outside your firing arc).<br /><br />If the target of this attack is at Range 1, roll 1 additional attack die.",
        "name": "Dorsal Turret",
        "points": 3,
        "slot": "Turret",
        "attack": 2,
        "range": "1-2",
        "id": 212,
        "xws": "dorsalturret",
        "key": "dorsalTurret"
     },
     "drawTheirFire": {
        "name": "Draw Their Fire",
        "id": 30,
        "slot": "Elite",
        "points": 1,
        "text": "When a friendly ship at Range 1 is hit by an attack, you may suffer 1 of the uncanceled [Critical Hit] results instead of the target ship.",
        "image": "upgrades/Elite/draw-their-fire.png",
        "xws": "drawtheirfire",
        "key": "drawTheirFire"
     },
     "dualLaserTurret": {
        "image": "upgrades/Hardpoint/dual-laser-turret.png",
        "text": "<strong>Attack (Energy):</strong> Spend 1 energy from this card to perform this attack against 1 ship (even a ship outside of your firing arc).",
        "name": "Dual Laser Turret",
        "points": 5,
        "slot": "Hardpoint",
        "range": "1-3",
        "attack": 3,
        "ship": [
           "Gozanti-class Cruiser"
        ],
        "id": 207,
        "energy": 1,
        "xws": "duallaserturret",
        "key": "dualLaserTurret"
     },
     "dutyfree": {
        "name": "Dutyfree",
        "id": 161,
        "energy": 0,
        "unique": true,
        "slot": "Title",
        "points": 2,
        "ship": [
           "GR-75 Medium Transport"
        ],
        "text": "When performing a jam action, you may choose an enemy ship at Range 1-3 (instead of at Range 1-2).",
        "image": "upgrades/Title/dutyfree.png",
        "xws": "dutyfree",
        "key": "dutyfree"
     },
     "electronicBaffle": {
        "image": "upgrades/System/electronic-baffle.png",
        "text": "When you receive a stress token or an ion token, you may suffer 1 damage to discard that token.",
        "name": "Electronic Baffle",
        "xws": "electronicbaffle",
        "points": 1,
        "slot": "System",
        "id": 234,
        "key": "electronicBaffle"
     },
     "elusiveness": {
        "name": "Elusiveness",
        "id": 16,
        "slot": "Elite",
        "points": 2,
        "text": "When defending, you may receive 1 stress token to choose 1 attack die.  The attacker must reroll that die.<br /><br />If you have at least 1 stress token, you cannot use this ability.",
        "image": "upgrades/Elite/elusiveness.png",
        "xws": "elusiveness",
        "key": "elusiveness"
     },
     "emEmitter": {
        "name": "EM Emitter",
        "id": 84,
        "slot": "Cargo",
        "limited": true,
        "points": 3,
        "text": "When you obstruct an attack, the defender rolls 3 additional defense dice (instead of 1).",
        "image": "upgrades/Cargo/em-emitter.png",
        "xws": "ememitter",
        "key": "emEmitter"
     },
     "empDevice": {
        "image": "upgrades/Illicit/emp-device.png",
        "text": "During the Combat phase, instead of performing any attacks, you may discard this card to assign 2 ion tokens to each ship at Range 1.",
        "name": "EMP Device",
        "xws": "empdevice",
        "unique": true,
        "points": 2,
        "slot": "Illicit",
        "id": 283,
        "key": "empDevice"
     },
     "emperorPalpatine": {
        "name": "Emperor Palpatine",
        "id": 129,
        "unique": true,
        "faction": "Galactic Empire",
        "slot": "Crew",
        "points": 8,
        "text": "Once per round, before a friendly ship rolls dice, you may name a die result. After rolling, you must change 1 of your dice results to the named result. That die result cannot be modified again.",
        "image": "upgrades/Crew/emperor-palpatine.png",
        "xws": "emperorpalpatine",
        "key": "emperorPalpatine"
     },
     "enforcer": {
        "text": "After defending, if the attacker is inside your bullseye firing arc, it receives 1 stress token.",
        "name": "Enforcer",
        "xws": "enforcer",
        "unique": true,
        "points": 1,
        "slot": "Title",
        "ship": [
           "M12-L Kimogila Fighter"
        ],
        "id": 332,
        "image": "upgrades/Title/enforcer.png",
        "key": "enforcer"
     },
     "engineBooster": {
        "name": "Engine Booster",
        "id": 68,
        "slot": "Cargo",
        "points": 3,
        "limited": true,
        "text": "Immediately before you reveal your maneuver dial, you may spend 1 energy to execute a white ([Straight] 1) maneuver.  You cannot use this ability if you would overlap another ship.",
        "image": "upgrades/Cargo/engine-booster.png",
        "xws": "enginebooster",
        "key": "engineBooster"
     },
     "engineUpgrade": {
        "name": "Engine Upgrade",
        "id": 176,
        "points": 4,
        "slot": "Modification",
        "text": "Your action bar gains the [Boost] action icon.",
        "image": "upgrades/Modification/engine-upgrade.png",
        "xws": "engineupgrade",
        "grants": [
           {
              "type": "action",
              "name": "Boost"
           }
        ],
        "key": "engineUpgrade"
     },
     "engineeringTeam": {
        "name": "Engineering Team",
        "id": 92,
        "slot": "Team",
        "limited": true,
        "points": 4,
        "text": "During the Activation phase, when you reveal a [Straight] maneuver, gain 1 additional energy during the \"Gain Energy\" step.",
        "image": "upgrades/Team/engineering-team.png",
        "xws": "engineeringteam",
        "key": "engineeringTeam"
     },
     "enhancedScopes": {
        "name": "Enhanced Scopes",
        "id": 71,
        "slot": "System",
        "points": 1,
        "text": "During the Activation phase, treat your pilot skill value as \"0\".",
        "image": "upgrades/System/enhanced-scopes.png",
        "xws": "enhancedscopes",
        "key": "enhancedScopes"
     },
     "expandedCargoHold": {
        "name": "Expanded Cargo Hold",
        "id": 82,
        "slot": "Cargo",
        "points": 1,
        "ship": [
           "GR-75 Medium Transport"
        ],
        "text": "Once per round, when you would be dealt a faceup Damage card, you may draw that card from either the fore or aft Damage deck.",
        "image": "upgrades/Cargo/expanded-cargo-hold.png",
        "xws": "expandedcargohold",
        "key": "expandedCargoHold"
     },
     "experimentalInterface": {
        "name": "Experimental Interface",
        "id": 185,
        "slot": "Modification",
        "unique": true,
        "points": 3,
        "text": "Once per round, after you perform an action, you may perform 1 free action from an equipped Upgrade card with the \"<strong>Action:</strong>\" header. Then receive 1 stress token.",
        "image": "upgrades/Modification/experimental-interface.png",
        "xws": "experimentalinterface",
        "key": "experimentalInterface"
     },
     "expertHandling": {
        "name": "Expert Handling",
        "id": 11,
        "slot": "Elite",
        "points": 2,
        "text": "<strong>Action:</strong> Perform a free barrel roll action. If you do not have the [Barrel Roll] action icon, receive 1 stress token. You may then remove 1 enemy target lock from your ship",
        "image": "upgrades/Elite/expert-handling.png",
        "xws": "experthandling",
        "key": "expertHandling"
     },
     "expertise": {
        "text": "When attacking, if you are not stressed, you may change all of your [Focus] results to [Hit] results.",
        "name": "Expertise",
        "xws": "expertise",
        "points": 4,
        "slot": "Elite",
        "id": 297,
        "image": "upgrades/Elite/expertise.png",
        "key": "expertise"
     },
     "expose": {
        "name": "Expose",
        "id": 20,
        "slot": "Elite",
        "points": 4,
        "text": "<strong>Action:</strong> Until the end of the round, increase your primary weapon value by 1 and decrease your agility value by 1.",
        "image": "upgrades/Elite/expose.png",
        "xws": "expose",
        "key": "expose"
     },
     "extraMunitions": {
        "name": "Extra Munitions",
        "id": 137,
        "limited": true,
        "slot": "Torpedo",
        "points": 2,
        "text": "When you equip this card, place 1 ordnance token on each equipped [Torpedo], [Missile], and [Bomb] Upgrade card. When you are instructed to discard an Upgrade card, you may discard 1 ordnance token on that card instead.",
        "image": "upgrades/Torpedo/extra-munitions.png",
        "xws": "extramunitions",
        "key": "extraMunitions"
     },
     "ezraBridger": {
        "image": "upgrades/Crew/ezra-bridger.png",
        "text": "When attacking, if you are stressed, you may change 1 of your [Focus] results to a [Critical Hit] result.",
        "name": "Ezra Bridger",
        "unique": true,
        "points": 3,
        "slot": "Crew",
        "faction": "Rebel Alliance",
        "id": 215,
        "xws": "ezrabridger",
        "key": "ezraBridger"
     },
     "fearlessness": {
        "image": "upgrades/Elite/fearlessness.png",
        "text": "When attacking, if you are inside the defender's firing arc at Range 1 and the defender is inside your firing arc, you may add 1 [Hit] result to your roll.",
        "name": "Fearlessness",
        "xws": "fearlessness",
        "points": 1,
        "slot": "Elite",
        "faction": "Scum and Villainy",
        "id": 255,
        "key": "fearlessness"
     },
     "feedbackArray": {
        "name": "Feedback Array",
        "id": 114,
        "slot": "Illicit",
        "points": 2,
        "text": "During the Combat phase, instead of performing any attacks, you may receive 1 ion token and suffer 1 damage to choose 1 enemy ship at Range 1. That ship suffers 1 damage.",
        "image": "upgrades/Illicit/feedback-array.png",
        "xws": "feedbackarray",
        "key": "feedbackArray"
     },
     "finn": {
        "image": "upgrades/Crew/finn.png",
        "text": "When attacking with a primary weapon or defending, if the enemy ship is inside your firing arc, you may add 1 blank result to your roll.",
        "name": "Finn",
        "xws": "finn",
        "unique": true,
        "points": 5,
        "slot": "Crew",
        "faction": "Rebel Alliance",
        "id": 276,
        "key": "finn"
     },
     "fireControlSystem": {
        "name": "Fire-Control System",
        "id": 36,
        "slot": "System",
        "points": 2,
        "text": "After you perform an attack, you may acquire a target lock on the defender.",
        "image": "upgrades/System/fire-control-system.png",
        "xws": "firecontrolsystem",
        "key": "fireControlSystem"
     },
     "firstOrderVanguard": {
        "text": "When attacking, if the defender is the only ship in your firing arc at Range 1-3, you may reroll 1 attack die.<br /><br />When defending, you may discard this card to reroll all of your defense dice.",
        "name": "First Order Vanguard",
        "xws": "firstordervanguard",
        "unique": true,
        "points": 2,
        "slot": "Title",
        "ship": [
           "TIE Silencer"
        ],
        "id": 337,
        "image": "upgrades/Title/first-order-vanguard.png",
        "key": "firstOrderVanguard"
     },
     "flechetteCannon": {
        "name": "Flechette Cannon",
        "id": 123,
        "slot": "Cannon",
        "points": 2,
        "attack": 3,
        "range": "1-3",
        "text": "<strong>Attack:</strong> Attack 1 ship.<br /><br />If this attack hits, the defender suffers 1 damage and, if the defender is not stressed, it also receives 1 stress token. Then cancel <strong>all</strong> dice results.",
        "image": "upgrades/Cannon/flechette-cannon.png",
        "xws": "flechettecannon",
        "key": "flechetteCannon"
     },
     "flechetteTorpedoes": {
        "name": "Flechette Torpedoes",
        "id": 58,
        "slot": "Torpedo",
        "points": 2,
        "attack": 3,
        "range": "2-3",
        "text": "<strong>Attack (target lock):</strong> Discard this card and spend your target lock to perform this attack.<br /><br />After you perform this attack, the defender receives 1 stress token if its hull value is \"4\" or lower.",
        "image": "upgrades/Torpedo/flechette-torpedoes.png",
        "xws": "flechettetorpedoes",
        "key": "flechetteTorpedoes"
     },
     "fleetOfficer": {
        "name": "Fleet Officer",
        "id": 95,
        "slot": "Crew",
        "faction": "Galactic Empire",
        "points": 3,
        "text": "<strong>Action:</strong> Choose up to 2 friendly ships within Range 1-2 and assign 1 focus token to each of those ships. Then receive 1 stress token.",
        "image": "upgrades/Crew/fleet-officer.png",
        "xws": "fleetofficer",
        "key": "fleetOfficer"
     },
     "flightAssistAstromech": {
        "image": "upgrades/Astromech/flight-assist-astromech.png",
        "text": "You cannot attack ships outside your firing arc.<br /><br />After you execute a maneuver, if you did not overlap a ship or obstacle and there are no enemy ships inside your firing arc at Range 1-3, you may perform a free boost or barrel roll action.",
        "name": "Flight-Assist Astromech",
        "xws": "flightassistastromech",
        "points": 1,
        "slot": "Astromech",
        "id": 346,
        "key": "flightAssistAstromech"
     },
     "flightInstructor": {
        "name": "Flight Instructor",
        "id": 47,
        "slot": "Crew",
        "points": 4,
        "text": "When defending, you may reroll 1 of your [Focus] results.  If the attacker's pilot skill value is \"2\" or lower, you may reroll 1 of your blank results instead.",
        "image": "upgrades/Crew/flight-instructor.png",
        "xws": "flightinstructor",
        "key": "flightInstructor"
     },
     "fourLom": {
        "image": "upgrades/Crew/4-lom.png",
        "text": "When attacking, during the \"Modify Attack Dice\" step, you may receive 1 ion token to choose 1 of the defender's focus or evade tokens. That token cannot be spent during this attack.",
        "name": "4-LOM",
        "xws": "4lom",
        "unique": true,
        "points": 1,
        "slot": "Crew",
        "faction": "Scum and Villainy",
        "id": 231,
        "key": "fourLom"
     },
     "frequencyJammer": {
        "name": "Frequency Jammer",
        "id": 85,
        "slot": "Cargo",
        "limited": true,
        "points": 4,
        "text": "When you perform a jam action, choose 1 enemy ship that does not have a stress token and is at Range 1 of the jammed ship. The chosen ship receives 1 stress token.",
        "image": "upgrades/Cargo/frequency-jammer.png",
        "xws": "frequencyjammer",
        "key": "frequencyJammer"
     },
     "generalHux": {
        "image": "upgrades/Crew/general-hux.png",
        "text": "<strong>Action:</strong> Choose up to 3 friendly ships at Range 1-2. Assign 1 focus token to each of those ships and assign the \"Fanatical Devotion\" Condition card to 1 of them. Then receive 1 stress token.",
        "name": "General Hux",
        "xws": "generalhux",
        "unique": true,
        "points": 5,
        "slot": "Crew",
        "faction": "Galactic Empire",
        "id": 286,
        "conditions": [
           "Fanatical Devotion"
        ],
        "key": "generalHux"
     },
     "genius": {
        "name": "\"Genius\"",
        "id": 110,
        "unique": true,
        "slot": "Salvaged Astromech",
        "points": 0,
        "text": "After you reveal and execute a maneuver, if you did not overlap a ship, you may discard 1 of your equipped [Bomb] Upgrade cards without the \"<strong>Action:</strong>\" header to drop the corresponding bomb token.",
        "image": "upgrades/Salvaged Astromech/genius.png",
        "xws": "genius",
        "key": "genius"
     },
     "ghost_198": {
        "image": "upgrades/Title/ghost.png",
        "text": "Equip the <em>Phantom</em> title card to a friendly Attack Shuttle and dock it to this ship.<br /><br />After you execute a maneuver, you may deploy it from your rear guides.",
        "name": "Ghost",
        "unique": true,
        "points": 0,
        "slot": "Title",
        "ship": [
           "VCX-100"
        ],
        "id": 198,
        "xws": "ghost",
        "key": "ghost_198"
     },
     "ghost_333": {
        "image": "upgrades/Title/ghost-swx72.png",
        "text": "Equip the <em>Phantom II</em> title card to a friendly Sheathipede-class shuttle and dock it to this ship.<br /><br />After you execute a maneuver, you may deploy it from your rear guides.",
        "name": "Ghost",
        "xws": "ghost-swx72",
        "unique": true,
        "points": 0,
        "slot": "Title",
        "ship": [
           "VCX-100"
        ],
        "id": 333,
        "key": "ghost_333"
     },
     "glitterstim": {
        "name": "Glitterstim",
        "id": 130,
        "slot": "Illicit",
        "points": 2,
        "text": "At the start of the Combat phase, you may discard this card and receive 1 stress token. If you do, until the end of the round, when attacking or defending, you may change all of your [Focus] results to [Hit] or [Evade] results.",
        "image": "upgrades/Illicit/glitterstim.png",
        "xws": "glitterstim",
        "key": "glitterstim"
     },
     "gonk": {
        "image": "upgrades/Crew/gonk.png",
        "text": "<strong>Action:</strong> Place 1 shield token on this card.<br /><br /><strong>Action:</strong> Remove 1 shield token from this card to recover 1 shield (up to your shield value).",
        "name": "\"Gonk\"",
        "xws": "gonk",
        "unique": true,
        "points": 2,
        "slot": "Crew",
        "faction": "Scum and Villainy",
        "id": 239,
        "key": "gonk"
     },
     "grandMoffTarkin": {
        "name": "Grand Moff Tarkin",
        "id": 126,
        "unique": true,
        "faction": "Galactic Empire",
        "size": [
           "huge"
        ],
        "slot": "Crew",
        "points": 6,
        "text": "At the start of the Combat phase, you may choose another ship at Range 1-4. Either remove 1 focus token from the chosen ship or assign 1 focus token to that ship.",
        "image": "upgrades/Crew/grand-moff-tarkin.png",
        "xws": "grandmofftarkin",
        "key": "grandMoffTarkin"
     },
     "greedo": {
        "name": "Greedo",
        "id": 105,
        "slot": "Crew",
        "unique": true,
        "faction": "Scum and Villainy",
        "points": 1,
        "text": "The first time you attack each round and the first time you defend each round, the first Damage card dealt is dealt faceup.",
        "image": "upgrades/Crew/greedo.png",
        "xws": "greedo",
        "key": "greedo"
     },
     "guidanceChips": {
        "image": "upgrades/Modification/guidance-chips.png",
        "text": "Once per round, when attacking with a [Torpedo] or [Missile] secondary weapon, you may change 1 die result to a [Hit] result (or a [Critical Hit] result if your primary weapon value is \"3\" or higher).",
        "name": "Guidance Chips",
        "points": 0,
        "slot": "Modification",
        "id": 229,
        "xws": "guidancechips",
        "key": "guidanceChips"
     },
     "gunner": {
        "name": "Gunner",
        "id": 21,
        "slot": "Crew",
        "points": 5,
        "text": "After you perform an attack that does not hit, you may immediately perform a primary weapon attack. You cannot perform another attack this round.",
        "image": "upgrades/Crew/gunner.png",
        "xws": "gunner",
        "key": "gunner"
     },
     "gunneryTeam": {
        "name": "Gunnery Team",
        "id": 90,
        "slot": "Team",
        "limited": true,
        "points": 4,
        "text": "Once per round, when attacking with a secondary weapon, you may spend 1 energy to change 1 of your blank results to a [Hit] result.",
        "image": "upgrades/Team/gunnery-team.png",
        "xws": "gunneryteam",
        "key": "gunneryTeam"
     },
     "gyroscopicTargeting": {
        "text": "At the end of the Combat phase, if you executed a 3-, 4-, or 5-speed maneuver that round, you may rotate your mobile firing arc.",
        "name": "Gyroscopic Targeting",
        "xws": "gyroscopictargeting",
        "points": 2,
        "slot": "Modification",
        "ship": [
           "Lancer-class Pursuit Craft"
        ],
        "id": 261,
        "image": "upgrades/Modification/gyroscopic-targeting.png",
        "key": "gyroscopicTargeting"
     },
     "hanSolo": {
        "name": "Han Solo",
        "id": 86,
        "slot": "Crew",
        "unique": true,
        "faction": "Rebel Alliance",
        "points": 2,
        "text": "When attacking, if you have a target lock on the defender, you may spend that target lock to change all of your [Focus] results to [Hit] results.",
        "image": "upgrades/Crew/han-solo.png",
        "xws": "hansolo",
        "key": "hanSolo"
     },
     "harpoonMissiles": {
        "image": "upgrades/Missile/harpoon-missiles.png",
        "text": "<strong>Attack (target lock):</strong> Discard this card to perform this attack.<br /><br />If this attack hits, after the attack resolves, assign the \"Harpooned\" Condition to the defender.",
        "name": "Harpoon Missiles",
        "xws": "harpoonmissiles",
        "points": 4,
        "slot": "Missile",
        "range": "2-3",
        "attack": 4,
        "id": 330,
        "conditions": [
           "Harpooned!"
        ],
        "key": "harpoonMissiles"
     },
     "havoc": {
        "image": "upgrades/Title/havoc.png",
        "text": "Your upgrade bar gains the [System] and [Salvaged Astromech] upgrade icons and loses the [Crew] upgrade icon.<br /><br />You cannot equip non-unique [Salvaged Astromech] Upgrade cards.",
        "name": "Havoc",
        "xws": "havoc",
        "unique": true,
        "points": 0,
        "slot": "Title",
        "ship": [
           "Scurrg H-6 Bomber"
        ],
        "grants": [
           {
              "type": "slot",
              "name": "System"
           },
           {
              "type": "slot",
              "name": "Salvaged Astromech"
           }
        ],
        "id": 313,
        "key": "havoc"
     },
     "heavyLaserCannon": {
        "name": "Heavy Laser Cannon",
        "id": 23,
        "slot": "Cannon",
        "points": 7,
        "attack": 4,
        "range": "2-3",
        "text": "<strong>Attack:</strong> Attack 1 ship.<br /><br />Immediately after rolling your attack dice, you must change all of your [Critical Hit] results to [Hit] results.",
        "image": "upgrades/Cannon/heavy-laser-cannon.png",
        "xws": "heavylasercannon",
        "key": "heavyLaserCannon"
     },
     "heavyLaserTurret": {
        "image": "upgrades/Hardpoint/heavy-laser-turret.png",
        "text": "<strong>Attack (energy):</strong> Spend 2 energy from this card to perform this attack against 1 ship (even a ship outside of your firing arc).",
        "name": "Heavy Laser Turret",
        "xws": "heavylaserturret",
        "points": 5,
        "slot": "Hardpoint",
        "range": "2-3",
        "attack": 4,
        "energy": 2,
        "ship": [
           "C-ROC Cruiser"
        ],
        "id": 299,
        "key": "heavyLaserTurret"
     },
     "heavyScykInterceptor": {
        "name": "\"Heavy Scyk\" Interceptor",
        "id": 165,
        "slot": "Title",
        "points": 2,
        "ship": [
           "M3-A Interceptor"
        ],
        "text": "Your upgrade bar gains the [Cannon], [Torpedo] or [Missile] upgrade icon.<br /><br />Increase your hull value by 1.",
        "image": "upgrades/Title/heavy-scyk-interceptor.png",
        "xws": "heavyscykinterceptor",
        "grants": [
           {
              "type": "stats",
              "name": "hull",
              "value": 1
           }
        ],
        "key": "heavyScykInterceptor"
     },
     "heraSyndulla": {
        "image": "upgrades/Crew/hera-syndulla.png",
        "text": "You can reveal and execute red maneuvers even while you are stressed.",
        "name": "Hera Syndulla",
        "unique": true,
        "points": 1,
        "slot": "Crew",
        "faction": "Rebel Alliance",
        "id": 217,
        "xws": "herasyndulla",
        "key": "heraSyndulla"
     },
     "homingMissiles": {
        "name": "Homing Missiles",
        "id": 17,
        "slot": "Missile",
        "attack": 4,
        "range": "2-3",
        "points": 5,
        "text": "<strong>Attack (target lock):</strong> Discard this card to perform this attack.<br /><br />The defender cannot spend evade tokens during this attack.",
        "image": "upgrades/Missile/homing-missiles.png",
        "xws": "homingmissiles",
        "key": "homingMissiles"
     },
     "hotShotBlaster": {
        "name": "\"Hot Shot\" Blaster",
        "id": 115,
        "slot": "Illicit",
        "points": 3,
        "attack": 3,
        "range": "1-2",
        "text": "<strong>Attack:</strong> Discard this card to attack 1 ship (even a ship outside your firing arc).",
        "image": "upgrades/Illicit/hot-shot-blaster.png",
        "xws": "hotshotblaster",
        "key": "hotShotBlaster"
     },
     "hotshotCoPilot": {
        "name": "Hotshot Co-pilot",
        "xws": "hotshotcopilot",
        "text": "When attacking with a primary weapon, the defender must spend 1 focus token if able.<br /><br />When defending, the attacker must spend 1 focus token if able.",
        "points": 4,
        "slot": "Crew",
        "id": 281,
        "image": "upgrades/Crew/hotshot-co-pilot.png",
        "key": "hotshotCoPilot"
     },
     "houndsTooth": {
        "name": "Hound's Tooth",
        "unique": true,
        "id": 132,
        "slot": "Title",
        "points": 6,
        "text": "After you are destroyed, before you are removed from the play area, you may <strong>deploy</strong> the <em>Nastah Pup</em> Pilot.<br /><br />It cannot attack this round.",
        "image": "upgrades/Title/hounds-tooth.png",
        "ship": [
           "YV-666"
        ],
        "xws": "houndstooth",
        "key": "houndsTooth"
     },
     "hullUpgrade": {
        "name": "Hull Upgrade",
        "id": 179,
        "slot": "Modification",
        "points": 3,
        "text": "Increase your hull value by 1.",
        "image": "upgrades/Modification/hull-upgrade.png",
        "xws": "hullupgrade",
        "grants": [
           {
              "type": "stats",
              "name": "hull",
              "value": 1
           }
        ],
        "key": "hullUpgrade"
     },
     "hyperwaveCommScanner": {
        "image": "upgrades/Tech/hyperwave-comm-scanner.png",
        "text": "At the start of the \"Place Forces\" step, you may choose to treat your pilot skill value as \"0\", \"6\", or \"12\" until the end of the step.<br /><br />During setup, after another friendly ship is placed at Range 1-2, you may assign 1 focus or evade token to it.",
        "name": "Hyperwave Comm Scanner",
        "xws": "hyperwavecommscanner",
        "slot": "Tech",
        "points": 1,
        "id": 289,
        "key": "hyperwaveCommScanner"
     },
     "ig2000": {
        "name": "IG-2000",
        "id": 166,
        "slot": "Title",
        "points": 0,
        "ship": [
           "Aggressor"
        ],
        "text": "You have the pilot ability of each other friendly ship with the IG-2000 Upgrade card (in addition to your own pilot ability).",
        "image": "upgrades/Title/ig-2000.png",
        "xws": "ig2000",
        "faction": "Scum and Villainy",
        "key": "ig2000"
     },
     "ig88d": {
        "image": "upgrades/Crew/ig-88d.png",
        "text": "You have the pilot ability of each friendly ship with the <em>IG-2000</em> Upgrade card (in addition to your own pilot ability).",
        "name": "IG-88D",
        "xws": "ig88d",
        "unique": true,
        "points": 1,
        "slot": "Crew",
        "faction": "Scum and Villainy",
        "id": 256,
        "key": "ig88d"
     },
     "igRmThugDroids": {
        "text": "When attacking, you may change 1 of your [Hit] results to a [Critical Hit] result.",
        "name": "IG-RM Thug Droids",
        "xws": "igrmthugdroids",
        "points": 1,
        "slot": "Team",
        "id": 321,
        "image": "upgrades/Team/ig-rm-thug-droids.png",
        "key": "igRmThugDroids"
     },
     "impetuous": {
        "name": "Impetuous",
        "id": 173,
        "slot": "Title",
        "unique": true,
        "points": 3,
        "ship": [
           "Raider-class Corvette (Aft)"
        ],
        "text": "After you perform an attack that destroys an enemy ship, you may acquire a target lock.",
        "image": "upgrades/Title/impetuous.png",
        "xws": "impetuous",
        "key": "impetuous"
     },
     "inertialDampeners": {
        "name": "Inertial Dampeners",
        "id": 107,
        "slot": "Illicit",
        "points": 1,
        "text": "When you reveal your maneuver, you may discard this card to instead perform a white ([Stop] 0) maneuver. Then receive 1 stress token.",
        "image": "upgrades/Illicit/inertial-dampeners.png",
        "xws": "inertialdampeners",
        "key": "inertialDampeners"
     },
     "insatiableWorrt": {
        "image": "upgrades/Title/insatiable-worrt.png",
        "text": "After your perform the recover action, gain 3 energy.",
        "name": "Insatiable Worrt",
        "xws": "insatiableworrt",
        "unique": true,
        "points": 1,
        "slot": "Title",
        "energy": -1,
        "ship": [
           "C-ROC Cruiser"
        ],
        "id": 306,
        "key": "insatiableWorrt"
     },
     "inspiringRecruit": {
        "image": "upgrades/Crew/inspiring-recruit.png",
        "text": "Once per round, when a friendly ship at Range 1-2 removes a stress token, it may remove 1 additional stress token.",
        "name": "Inspiring Recruit",
        "xws": "inspiringrecruit",
        "points": 1,
        "slot": "Crew",
        "id": 292,
        "key": "inspiringRecruit"
     },
     "instigator": {
        "name": "Instigator",
        "id": 172,
        "slot": "Title",
        "unique": true,
        "points": 4,
        "ship": [
           "Raider-class Corvette (Aft)"
        ],
        "text": "After you perform a recover action, recover 1 additional shield.",
        "image": "upgrades/Title/instigator.png",
        "xws": "instigator",
        "key": "instigator"
     },
     "integratedAstromech": {
        "name": "Integrated Astromech",
        "id": 193,
        "slot": "Modification",
        "points": 0,
        "ship": [
           "X-wing",
           "T-70 X-wing"
        ],
        "text": "When you are dealt a Damage card, you may discard 1 of your [Astromech] Upgrade cards to discard that Damage card (without resolving its effect).",
        "image": "upgrades/Modification/integrated-astromech.png",
        "xws": "integratedastromech",
        "key": "integratedAstromech"
     },
     "intelligenceAgent": {
        "name": "Intelligence Agent",
        "id": 40,
        "slot": "Crew",
        "points": 1,
        "text": "At the start of the Activation phase, choose 1 enemy ship at Range 1-2.  You may look at that ship's chosen maneuver.",
        "image": "upgrades/Crew/intelligence-agent.png",
        "xws": "intelligenceagent",
        "key": "intelligenceAgent"
     },
     "intensity": {
        "image": "upgrades/Elite/intensity.png",
        "text": "After you perform a boost or barrel roll action, you may assign 1 focus or evade token to your ship. If you do, flip this card.",
        "name": "Intensity",
        "xws": "intensity",
        "points": 2,
        "slot": "Elite",
        "id": 317,
        "size": [
           "small"
        ],
        "dualCard": 318,
        "key": "intensity"
     },
     "intensityExhausted": {
        "image": "upgrades/Elite/intensity-exhausted.png",
        "text": "At the end of the Combat phase, you may spend 1 focus or evade token to flip this card.",
        "name": "Intensity (Exhausted)",
        "xws": "intensity",
        "points": 2,
        "slot": "Elite",
        "size": [
           "small"
        ],
        "id": 318,
        "dualCard": 317,
        "key": "intensityExhausted"
     },
     "intimidation": {
        "name": "Intimidation",
        "id": 103,
        "slot": "Elite",
        "points": 2,
        "text": "While you are touching an enemy ship, reduce that ship's agility value by 1.",
        "image": "upgrades/Elite/intimidation.png",
        "xws": "intimidation",
        "key": "intimidation"
     },
     "ionBombs": {
        "name": "Ion Bombs",
        "id": 134,
        "slot": "Bomb",
        "points": 2,
        "text": "When you reveal your maneuver dial, you may discard this card to <strong>drop</strong> 1 ion bomb token.<br /><br />This token <strong>detonates</strong> at the end of the Activation phase.",
        "effect": "<strong>Bomb Token:</strong> When this bomb token detonates, each ship at Range 1 of the token receives 2 ion tokens. Then discard this token.",
        "image": "upgrades/Bomb/ion-bombs.png",
        "xws": "ionbombs",
        "key": "ionBombs"
     },
     "ionCannon": {
        "name": "Ion Cannon",
        "id": 22,
        "slot": "Cannon",
        "points": 3,
        "attack": 3,
        "range": "1-3",
        "text": "<strong>Attack:</strong> Attack 1 ship.<br /><br />If this attack hits, the defender suffers 1 damage and receives 1 ion token. Then cancel <strong>all</strong> dice results.",
        "image": "upgrades/Cannon/ion-cannon.png",
        "xws": "ioncannon",
        "key": "ionCannon"
     },
     "ionCannonBattery": {
        "name": "Ion Cannon Battery",
        "id": 122,
        "slot": "Hardpoint",
        "points": 6,
        "energy": 2,
        "attack": 4,
        "range": "2-4",
        "text": "<strong>Attack (Energy):</strong> Spend 2 energy from this card to perform this attack. If this attack hits, the defender suffers 1 critical damage and receives 1 ion token. Then cancel <strong>all</strong> dice results.",
        "image": "upgrades/Hardpoint/ion-cannon-battery.png",
        "xws": "ioncannonbattery",
        "key": "ionCannonBattery"
     },
     "ionCannonTurret": {
        "name": "Ion Cannon Turret",
        "id": 0,
        "slot": "Turret",
        "points": 5,
        "attack": 3,
        "range": "1-2",
        "text": "<strong>Attack:</strong> Attack 1 ship (even a ship outside your firing arc).<br /><br />If this attack hits the target ship, the ship suffers 1 damage and receives 1 ion token.  Then cancel <strong>all</strong> dice results.",
        "image": "upgrades/Turret/ion-cannon-turret.png",
        "xws": "ioncannonturret",
        "key": "ionCannonTurret"
     },
     "ionDischargers": {
        "image": "upgrades/Illicit/ion-dischargers.png",
        "text": "After you receive an ion token, you may choose an enemy ship at Range 1. If you do, remove that ion token. Then that ship may choose to receive 1 ion token. If it does, discard this card.",
        "name": "Ion Dischargers",
        "xws": "iondischargers",
        "points": 2,
        "slot": "Illicit",
        "id": 329,
        "key": "ionDischargers"
     },
     "ionProjector": {
        "name": "Ion Projector",
        "id": 192,
        "slot": "Modification",
        "points": 2,
        "size": [
           "large"
        ],
        "text": "After an enemy ship executes a maneuver that causes it to overlap your ship, roll 1 attack die. On a [Hit] or [Critical Hit] result, the enemy ship receives 1 ion token.",
        "image": "upgrades/Modification/ion-projector.png",
        "xws": "ionprojector",
        "key": "ionProjector"
     },
     "ionPulseMissiles": {
        "name": "Ion Pulse Missiles",
        "id": 53,
        "slot": "Missile",
        "points": 3,
        "attack": 3,
        "range": "2-3",
        "text": "<strong>Attack (target lock):</strong> Discard this card to perform this attack.<br /><br />If this attack hits, the defender suffers 1 damage and receives 2 ion tokens.  Then cancel <strong>all</strong> dice results.",
        "image": "upgrades/Missile/ion-pulse-missiles.png",
        "xws": "ionpulsemissiles",
        "key": "ionPulseMissiles"
     },
     "ionTorpedoes": {
        "name": "Ion Torpedoes",
        "id": 104,
        "attack": 4,
        "range": "2-3",
        "slot": "Torpedo",
        "points": 5,
        "text": "<strong>Attack (target lock):</strong> Spend your target lock and discard this card to perform this attack.<br /><br />If this attack hits, the defender and each ship at Range 1 of it receives 1 ion token.",
        "image": "upgrades/Torpedo/ion-torpedoes.png",
        "xws": "iontorpedoes",
        "key": "ionTorpedoes"
     },
     "ionizationReactor": {
        "name": "Ionization Reactor",
        "id": 67,
        "slot": "Cargo",
        "points": 4,
        "energy": 5,
        "limited": true,
        "text": "<strong>Energy:</strong> Spend 5 energy from this card and discard this card to cause each other ship at Range 1 to suffer 1 damage and receive 1 ion token.",
        "image": "upgrades/Cargo/ionization-reactor.png",
        "xws": "ionizationreactor",
        "key": "ionizationReactor"
     },
     "isbSlicer": {
        "image": "upgrades/Crew/isb-slicer.png",
        "text": "After you perform a jam action against an enemy ship, you may choose a ship at Range 1 of that ship that is not jammed and assign it 1 jam token.",
        "name": "ISB Slicer",
        "xws": "isbslicer",
        "points": 2,
        "slot": "Crew",
        "faction": "Galactic Empire",
        "id": 364,
        "key": "isbSlicer"
     },
     "jabbaTheHutt": {
        "image": "upgrades/Crew/jabba-the-hutt.png",
        "text": "When you equip this card, place 1 illicit token on each [Illicit] Upgrade card in your squad. When you are instructed to discard an Upgrade card, you may discard 1 illicit token on that card instead.",
        "name": "Jabba the Hutt",
        "xws": "jabbathehutt",
        "unique": true,
        "points": 5,
        "slot": "Crew",
        "faction": "Scum and Villainy",
        "id": 316,
        "key": "jabbaTheHutt"
     },
     "jainasLight": {
        "name": "Jaina's Light",
        "id": 162,
        "unique": true,
        "slot": "Title",
        "points": 2,
        "ship": [
           "CR90 Corvette (Fore)"
        ],
        "text": "When defending, once per attack, if you are dealt a faceup Damage card, you may discard it and draw another faceup Damage card.",
        "image": "upgrades/Title/jaina-s-light.png",
        "xws": "jainaslight",
        "key": "jainasLight"
     },
     "jammingBeam": {
        "image": "upgrades/Cannon/jamming-beam.png",
        "text": "<strong>Attack:</strong> Attack 1 ship.<br /><br />If this attack hits, assign the defender 1 jam token. Then cancel <strong>all</strong> dice results.",
        "name": "Jamming Beam",
        "xws": "jammingbeam",
        "points": 1,
        "slot": "Cannon",
        "range": "1-2",
        "attack": 3,
        "id": 339,
        "key": "jammingBeam"
     },
     "janDodonna": {
        "name": "Jan Dodonna",
        "id": 81,
        "unique": true,
        "slot": "Crew",
        "points": 6,
        "faction": "Rebel Alliance",
        "text": "When another friendly ship at Range 1 is attacking, it may change 1 of its [Hit] results to a [Critical Hit].",
        "size": [
           "huge"
        ],
        "image": "upgrades/Crew/jan-dodonna.png",
        "xws": "jandodonna",
        "key": "janDodonna"
     },
     "janOrs": {
        "name": "Jan Ors",
        "id": 75,
        "unique": true,
        "slot": "Crew",
        "points": 2,
        "text": "Once per round, when a friendly ship at Range 1-3 performs a focus action or would be assigned a focus token, you may assign that ship an evade token instead.",
        "faction": "Rebel Alliance",
        "image": "upgrades/Crew/jan-ors.png",
        "xws": "janors",
        "key": "janOrs"
     },
     "juke": {
        "name": "Juke",
        "id": 147,
        "slot": "Elite",
        "points": 2,
        "size": [
           "small"
        ],
        "text": "When attacking, if you have an evade token, you may change 1 of the defender's [Evade] results to a [Focus] result.",
        "image": "upgrades/Elite/juke.png",
        "xws": "juke",
        "key": "juke"
     },
     "jynErso": {
        "image": "upgrades/Crew/jyn-erso.png",
        "name": "Jyn Erso",
        "xws": "jynerso",
        "text": "<strong>Action:</strong> Choose 1 friendly ship at Range 1-2. Assign 1 focus token to that ship for each enemy ship inside your firing arc at Range 1-3. You cannot assign more than 3 tokens in this way.",
        "unique": true,
        "points": 2,
        "slot": "Crew",
        "faction": "Rebel Alliance",
        "id": 268,
        "key": "jynErso"
     },
     "k4SecurityDroid": {
        "name": "K4 Security Droid",
        "id": 120,
        "slot": "Crew",
        "points": 3,
        "text": "After executing a green maneuver, you may acquire a target lock.",
        "faction": "Scum and Villainy",
        "image": "upgrades/Crew/k4-security-droid.png",
        "xws": "k4securitydroid",
        "key": "k4SecurityDroid"
     },
     "kananJarrus": {
        "image": "upgrades/Crew/kanan-jarrus.png",
        "text": "Once per round, after a friendly ship at Range 1-2 executes a white maneuver, you may remove 1 stress token from that ship.",
        "name": "Kanan Jarrus",
        "unique": true,
        "points": 3,
        "slot": "Crew",
        "faction": "Rebel Alliance",
        "id": 210,
        "xws": "kananjarrus",
        "key": "kananJarrus"
     },
     "ketsuOnyo": {
        "image": "upgrades/Crew/ketsu-onyo.png",
        "text": "At the start of the End phase, you may choose 1 enemy ship inside your firing arc at Range 1-2. That ship does not remove its tractor beam tokens.",
        "name": "Ketsu Onyo",
        "xws": "ketsuonyo",
        "unique": true,
        "points": 1,
        "slot": "Crew",
        "faction": "Scum and Villainy",
        "id": 258,
        "key": "ketsuOnyo"
     },
     "kyleKatarn": {
        "name": "Kyle Katarn",
        "id": 74,
        "unique": true,
        "slot": "Crew",
        "points": 3,
        "text": "After you remove a stress token from your ship, you may assign a focus token to your ship.",
        "faction": "Rebel Alliance",
        "image": "upgrades/Crew/kyle-katarn.png",
        "xws": "kylekatarn",
        "key": "kyleKatarn"
     },
     "kyloRen": {
        "image": "upgrades/Crew/kylo-ren.png",
        "text": "<strong>Action:</strong> Assign the \"I'll Show You the Dark Side\" Condition card to an enemy ship at Range 1-3.",
        "name": "Kylo Ren",
        "xws": "kyloren",
        "unique": true,
        "points": 3,
        "slot": "Crew",
        "faction": "Galactic Empire",
        "id": 264,
        "conditions": [
           "I'll Show You the Dark Side"
        ],
        "key": "kyloRen"
     },
     "kyloRensShuttle": {
        "text": "At the end of the Combat phase, choose an unstressed enemy ship at Range 1-2. The owner must assign a stress token to it or assign a stress token to another ship at Range 1-2 of you that that player controls.",
        "name": "Kylo Ren's Shuttle",
        "xws": "kylorensshuttle",
        "unique": true,
        "points": 2,
        "slot": "Title",
        "ship": [
           "Upsilon-class Shuttle"
        ],
        "id": 266,
        "image": "upgrades/Title/kylo-rens-shuttle.png",
        "key": "kyloRensShuttle"
     },
     "landoCalrissian": {
        "name": "Lando Calrissian",
        "id": 93,
        "slot": "Crew",
        "unique": true,
        "faction": "Rebel Alliance",
        "points": 3,
        "text": "<strong>Action:</strong> Roll 2 defense dice. For each [Focus] result, assign 1 focus token to your ship. For each [Evade] result, assign 1 evade token to your ship.",
        "image": "upgrades/Crew/lando-calrissian.png",
        "xws": "landocalrissian",
        "key": "landoCalrissian"
     },
     "lattsRazzi": {
        "image": "upgrades/Crew/latts-razzi.png",
        "text": "When defending, you may remove 1 stress token from the attacker to add 1 [Evade] result to your roll.",
        "name": "Latts Razzi",
        "xws": "lattsrazzi",
        "unique": true,
        "points": 2,
        "slot": "Crew",
        "faction": "Scum and Villainy",
        "id": 257,
        "key": "lattsRazzi"
     },
     "leebo": {
        "name": "\"Leebo\"",
        "id": 98,
        "slot": "Crew",
        "unique": true,
        "faction": "Rebel Alliance",
        "points": 2,
        "text": "<strong>Action:</strong> Perform a free boost action. Then receive 1 ion token.",
        "image": "upgrades/Crew/leebo.png",
        "xws": "leebo",
        "key": "leebo"
     },
     "leiaOrgana": {
        "name": "Leia Organa",
        "id": 87,
        "slot": "Crew",
        "unique": true,
        "faction": "Rebel Alliance",
        "points": 4,
        "text": "At the start of the Activation phase, you may discard this card to allow all friendly ships that reveal a red maneuver to treat that maneuver as a white maneuver until the end of the phase.",
        "image": "upgrades/Crew/leia-organa.png",
        "xws": "leiaorgana",
        "key": "leiaOrgana"
     },
     "lightScykInterceptor": {
        "image": "upgrades/Title/light-scyk-interceptor.png",
        "text": "All Damage cards dealt to you are dealt faceup. You may treat all bank maneuvers ([Bank Left] or [Bank Right]) as green maneuvers. You cannot equip Modification upgrades.",
        "name": "\"Light Scyk\" Interceptor",
        "xws": "lightscykinterceptor",
        "points": -2,
        "slot": "Title",
        "ship": [
           "M3-A Interceptor"
        ],
        "id": 303,
        "key": "lightScykInterceptor"
     },
     "lightningReflexes": {
        "name": "Lightning Reflexes",
        "id": 133,
        "slot": "Elite",
        "points": 1,
        "text": "After you execute a white or green maneuver on your dial, you may discard this card to rotate your ship 180&deg;. Then receive 1 stress token <strong>after</strong> the \"Check Pilot Stress\" step.",
        "image": "upgrades/Elite/lightning-reflexes.png",
        "size": [
           "small"
        ],
        "xws": "lightningreflexes",
        "key": "lightningReflexes"
     },
     "lightweightFrame": {
        "image": "upgrades/Modification/lightweight-frame.png",
        "text": "When defending, after rolling defense dice, if there are more attack dice than defense dice, roll 1 additional defense die.<br /><br />You cannot equip this card if your agility value is \"3\" or higher.",
        "name": "Lightweight Frame",
        "xws": "lightweightframe",
        "points": 2,
        "slot": "Modification",
        "ship": [
           "TIE Aggressor",
           "TIE Bomber",
           "TIE Phantom",
           "TIE Punisher",
           "TIE Reaper",
           "TIE Striker",
           "TIE/sf Fighter"
        ],
        "id": 296,
        "key": "lightweightFrame"
     },
     "linkedBattery": {
        "image": "upgrades/Cannon/linked-battery.png",
        "text": "When attacking with a primary weapon or [Cannon] seconday weapon, you may reroll 1 attack die.",
        "name": "Linked Battery",
        "xws": "linkedbattery",
        "limited": true,
        "points": 2,
        "slot": "Cannon",
        "size": [
           "small"
        ],
        "id": 340,
        "key": "linkedBattery"
     },
     "loneWolf": {
        "name": "Lone Wolf",
        "id": 99,
        "slot": "Elite",
        "unique": true,
        "points": 2,
        "text": "When attacking or defending, if there are no other friendly ships at Range 1–2, you may reroll 1 of your blank results.",
        "image": "upgrades/Elite/lone-wolf.png",
        "xws": "lonewolf",
        "key": "loneWolf"
     },
     "longRangeScanners": {
        "image": "upgrades/Modification/long-range-scanners.png",
        "text": "You may acquire target locks on ships at Range 3 and beyond. You cannot acquire target locks on ships at Range 1-2. You can equip this card only if you have [Torpedo] and [Missile] in your upgrade bar.",
        "name": "Long-Range Scanners",
        "points": 0,
        "slot": "Modification",
        "id": 222,
        "xws": "longrangescanners",
        "key": "longRangeScanners"
     },
     "lukeSkywalker": {
        "name": "Luke Skywalker",
        "id": 31,
        "unique": true,
        "faction": "Rebel Alliance",
        "slot": "Crew",
        "points": 7,
        "text": "After you perform an attack that does not hit, you may immediately perform a primary weapon attack. You may change 1 [Focus] result to a [Hit] result.  You cannot perform another attack this round.",
        "image": "upgrades/Crew/luke-skywalker.png",
        "xws": "lukeskywalker",
        "key": "lukeSkywalker"
     },
     "m9G8": {
        "image": "upgrades/Astromech/m9-g8.png",
        "text": "When a ship you have locked is attacking, you may choose 1 attack die. The attacker must reroll that die.<br /><br />You can acquire target locks on other friendly ships.",
        "name": "M9-G8",
        "xws": "m9g8",
        "unique": true,
        "points": 3,
        "slot": "Astromech",
        "id": 280,
        "key": "m9G8"
     },
     "magvaYarro": {
        "image": "upgrades/Crew/magva-yarro.png",
        "text": "After defending, you may acquire a target lock on the attacker.",
        "name": "Magva Yarro",
        "xws": "magvayarro",
        "unique": true,
        "points": 2,
        "slot": "Crew",
        "faction": "Rebel Alliance",
        "id": 358,
        "key": "magvaYarro"
     },
     "maneuveringFins": {
        "name": "Maneuvering Fins",
        "id": 191,
        "slot": "Modification",
        "points": 1,
        "ship": [
           "YV-666"
        ],
        "text": "When you reveal a turn maneuver ([Turn Left] or [Turn Right]), you may rotate your dial to the corresponding bank maneuver ([Bank Left] or [Bank Right]) of the same speed.",
        "image": "upgrades/Modification/maneuvering-fins.png",
        "xws": "maneuveringfins",
        "key": "maneuveringFins"
     },
     "manglerCannon": {
        "name": "\"Mangler\" Cannon",
        "id": 124,
        "slot": "Cannon",
        "points": 4,
        "attack": 3,
        "range": "1-3",
        "text": "<strong>Attack:</strong> Attack 1 ship.<br /><br />When attacking, you may change 1 of your [Hit] results to a [Critical Hit] result.",
        "image": "upgrades/Cannon/mangler-cannon.png",
        "xws": "manglercannon",
        "key": "manglerCannon"
     },
     "maraJade": {
        "name": "Mara Jade",
        "id": 94,
        "slot": "Crew",
        "unique": true,
        "faction": "Galactic Empire",
        "points": 3,
        "text": "At the end of the Combat phase, each enemy ship at Range 1 that does not have a stress token receives 1 stress token.",
        "image": "upgrades/Crew/mara-jade.png",
        "xws": "marajade",
        "key": "maraJade"
     },
     "marksmanship": {
        "name": "Marksmanship",
        "id": 12,
        "slot": "Elite",
        "points": 3,
        "text": "<strong>Action:</strong> When attacking this round, you may change 1 of your [Focus] results to a [Critical Hit] result and all of your other [Focus] results to [Hit] results.",
        "image": "upgrades/Elite/marksmanship.png",
        "xws": "marksmanship",
        "key": "marksmanship"
     },
     "maul": {
        "image": "upgrades/Crew/maul.png",
        "text": "When attacking, if you are not stressed, you may receive any number of stress tokens to reroll that many attack dice.<br /><br />After performing an attack that hits, you may remove 1 of your stress tokens.",
        "name": "Maul",
        "xws": "maul",
        "unique": true,
        "points": 3,
        "slot": "Crew",
        "faction": "Scum and Villainy",
        "id": 343,
        "key": "maul"
     },
     "mercenaryCopilot": {
        "name": "Mercenary Copilot",
        "id": 25,
        "slot": "Crew",
        "points": 2,
        "text": "When attacking at Range 3, you may change 1 of your [Hit] results to a [Critical Hit] result.",
        "image": "upgrades/Crew/mercenary-copilot.png",
        "xws": "mercenarycopilot",
        "key": "mercenaryCopilot"
     },
     "merchantOne": {
        "image": "upgrades/Title/merchant-one.png",
        "text": "Your upgrade bar gains 1 additional [Crew] upgrade icon and 1 additional [Team] upgrade icon and loses 1 [Cargo] upgrade icon.",
        "name": "Merchant One",
        "xws": "merchantone",
        "unique": true,
        "points": 2,
        "slot": "Title",
        "energy": 1,
        "ship": [
           "C-ROC Cruiser"
        ],
        "id": 302,
        "grants": [
           {
              "type": "slot",
              "name": "Crew"
           },
           {
              "type": "slot",
              "name": "Team"
           }
        ],
        "key": "merchantOne"
     },
     "millenniumFalcon": {
        "name": "Millennium Falcon",
        "id": 152,
        "slot": "Title",
        "unique": true,
        "points": 1,
        "ship": [
           "YT-1300"
        ],
        "grants": [
           {
              "type": "action",
              "name": "Evade"
           }
        ],
        "text": "Your action bar gains the [Evade] action icon.",
        "image": "upgrades/Title/millennium-falcon.png",
        "xws": "millenniumfalcon",
        "key": "millenniumFalcon"
     },
     "millenniumFalcon_hotr": {
        "name": "Millennium Falcon",
        "xws": "millenniumfalcon-swx57",
        "image": "upgrades/Title/millennium-falcon-hotr.png",
        "text": "After you execute a 3-speed bank maneuver ([Bank Left] or [Bank Right]), if you are not touching another ship and you are not stressed, you may receive 1 stress token to rotate your ship 180&deg;.",
        "unique": true,
        "points": 1,
        "slot": "Title",
        "ship": [
           "YT-1300"
        ],
        "id": 243,
        "key": "millenniumFalcon_hotr"
     },
     "minefieldMapper": {
        "image": "upgrades/System/minefield-mapper.png",
        "text": "During setup, after the \"Place Forces\" step, you may discard any number of your equipped [Bomb] Upgrade cards. Place all corresponding bomb tokens in the play area beyond Range 3 of enemy ships.",
        "name": "Minefield Mapper",
        "xws": "minefieldmapper",
        "points": 0,
        "slot": "System",
        "id": 326,
        "key": "minefieldMapper"
     },
     "mistHunter": {
        "text": "Your action bar gains the [Barrel Roll] action icon.<br /><br />You <strong>must</strong> equip 1 \"Tractor Beam\" Upgrade card (paying its squad point cost as normal).",
        "name": "Mist Hunter",
        "unique": true,
        "points": 0,
        "slot": "Title",
        "ship": [
           "G-1A Starfighter"
        ],
        "id": 209,
        "xws": "misthunter",
        "image": "upgrades/Title/mist-hunter.png",
        "grants": [
           {
              "type": "action",
              "name": "Barrel Roll"
           }
        ],
        "key": "mistHunter"
     },
     "moffJerjerrod": {
        "name": "Moff Jerjerrod",
        "id": 101,
        "slot": "Crew",
        "unique": true,
        "faction": "Galactic Empire",
        "points": 2,
        "text": "When you are dealt a faceup Damage card, you may discard this Upgrade card or another [Crew] Upgrade card to flip that Damage card facedown (without resolving its effect.)",
        "image": "upgrades/Crew/moff-jerjerrod.png",
        "xws": "moffjerjerrod",
        "key": "moffJerjerrod"
     },
     "moldyCrow": {
        "name": "Moldy Crow",
        "id": 153,
        "slot": "Title",
        "unique": true,
        "points": 3,
        "ship": [
           "HWK-290"
        ],
        "text": "During the End phase, do not remove unused focus tokens from your ship.",
        "image": "upgrades/Title/moldy-crow.png",
        "xws": "moldycrow",
        "key": "moldyCrow"
     },
     "multiSpectralCamouflage": {
        "text": "After you receive a red target lock token, if you have only 1 red target lock token, roll 1 defense die. On an [Evade] result, remove 1 red target lock token.",
        "name": "Multi-spectral Camouflage",
        "xws": "multispectralcamouflage",
        "unique": true,
        "points": 1,
        "slot": "Modification",
        "size": [
           "small"
        ],
        "id": 365,
        "image": "upgrades/Modification/multi-spectral-camouflage.png",
        "key": "multiSpectralCamouflage"
     },
     "munitionsFailsafe": {
        "name": "Munitions Failsafe",
        "id": 180,
        "slot": "Modification",
        "points": 1,
        "text": "When attacking with a secondary weapon that instructs you to discard it to perform the attack, do not discard it unless the attack hits.",
        "image": "upgrades/Modification/munitions-failsafe.png",
        "xws": "munitionsfailsafe",
        "key": "munitionsFailsafe"
     },
     "navigator": {
        "name": "Navigator",
        "id": 48,
        "slot": "Crew",
        "points": 3,
        "text": "When you reveal a maneuver, you may rotate your dial to another maneuver with the same bearing.<br /><br />You cannot rotate to a red maneuver if you have any stress tokens.",
        "size": [
           "small",
           "large"
        ],
        "image": "upgrades/Crew/navigator.png",
        "xws": "navigator",
        "key": "navigator"
     },
     "nienNunb": {
        "name": "Nien Nunb",
        "id": 32,
        "unique": true,
        "faction": "Rebel Alliance",
        "slot": "Crew",
        "points": 1,
        "text": "You may treat all [Straight] maneuvers as green maneuvers.",
        "image": "upgrades/Crew/nien-nunb.png",
        "xws": "niennunb",
        "key": "nienNunb"
     },
     "operationsSpecialist": {
        "image": "upgrades/Crew/operations-specialist.png",
        "text": "After a friendly ship at Range 1-2 performs an attack that does not hit, you may assign 1 focus token to a friendly ship at Range 1-3 of the attacker.",
        "name": "Operations Specialist",
        "xws": "operationsspecialist",
        "limited": true,
        "points": 3,
        "slot": "Crew",
        "id": 287,
        "key": "operationsSpecialist"
     },
     "opportunist": {
        "name": "Opportunist",
        "id": 49,
        "slot": "Elite",
        "points": 4,
        "text": "When attacking, if the defender does not have any focus or evade tokens, you may receive 1 stress token to roll 1 additional attack die.<br /><br />You cannot use this ability if you have any stress tokens.",
        "image": "upgrades/Elite/opportunist.png",
        "xws": "opportunist",
        "key": "opportunist"
     },
     "optimizedGenerators": {
        "image": "upgrades/Modification/optimized-generators.png",
        "text": "Once per round, when you assign energy to an equipped Upgrade card, gain 2 energy.",
        "name": "Optimized Generators",
        "points": 5,
        "slot": "Modification",
        "size": [
           "huge"
        ],
        "id": 203,
        "xws": "optimizedgenerators",
        "key": "optimizedGenerators"
     },
     "ordnanceExperts": {
        "image": "upgrades/Team/ordnance-experts.png",
        "text": "Once per round, when a friendly ship at Range 1-3 performs an attack with a [Torpedo] or [Missile] secondary weapon, it may change 1 of its blank results to a [Hit] result.",
        "name": "Ordnance Experts",
        "limited": true,
        "points": 5,
        "slot": "Team",
        "id": 201,
        "xws": "ordnanceexperts",
        "key": "ordnanceExperts"
     },
     "ordnanceSilos": {
        "image": "upgrades/Bomb/ordnance-silos.png",
        "text": "When you equip this card, place 3 ordnance tokens on each other equipped [Bomb] Upgrade card. When you are instructed to discard an Upgrade card, you may discard 1 ordnance token on that card instead.",
        "name": "Ordnance Silos",
        "xws": "ordnancesilos",
        "points": 2,
        "slot": "Bomb",
        "ship": [
           "B/SF-17 Bomber"
        ],
        "id": 335,
        "key": "ordnanceSilos"
     },
     "ordnanceTubes": {
        "image": "upgrades/Modification/ordnance-tubes.png",
        "text": "You may treat each of your [Hardpoint] upgrade icons as a [Torpedo] or [Missile] upgrade icon.<br /><br />When you are instructed to discard a [Torpedo] or [Missile] Upgrade card, do not discard it.",
        "name": "Ordnance Tubes",
        "points": 5,
        "slot": "Modification",
        "size": [
           "huge"
        ],
        "id": 204,
        "xws": "ordnancetubes",
        "key": "ordnanceTubes"
     },
     "os1ArsenalLoadout": {
        "image": "upgrades/Title/os-1-arsenal-loadout.png",
        "text": "Your upgrade bar gains the [Torpedo] and [Missile] upgrade icons.<br /><br />You may perform attacks with [Torpedo] and [Missile] secondary weapons against ships you have locked even while you have a weapons disabled token.",
        "name": "Os-1 Arsenal Loadout",
        "xws": "os1arsenalloadout",
        "points": 2,
        "slot": "Title",
        "ship": [
           "Alpha-class Star Wing"
        ],
        "id": 338,
        "key": "os1ArsenalLoadout"
     },
     "outlawTech": {
        "name": "Outlaw Tech",
        "id": 119,
        "limited": true,
        "slot": "Crew",
        "points": 2,
        "text": "After you execute a red maneuver, you may assign 1 focus token to your ship.",
        "faction": "Scum and Villainy",
        "image": "upgrades/Crew/outlaw-tech.png",
        "xws": "outlawtech",
        "key": "outlawTech"
     },
     "outmaneuver": {
        "name": "Outmaneuver",
        "id": 56,
        "slot": "Elite",
        "points": 3,
        "text": "When attacking a ship inside your firing arc, if you are not inside that ship's firing arc, reduce its agility value by 1 (to a minimum of 0).",
        "image": "upgrades/Elite/outmaneuver.png",
        "xws": "outmaneuver",
        "key": "outmaneuver"
     },
     "outrider": {
        "name": "Outrider",
        "id": 163,
        "slot": "Title",
        "unique": true,
        "points": 5,
        "ship": [
           "YT-2400"
        ],
        "text": "While you have a [Cannon] Upgrade card equipped, you <strong>cannot</strong> perform primary weapon attacks and you may perform [Cannon] secondary weapon attacks against ships outside your firing arc.",
        "image": "upgrades/Title/outrider.png",
        "xws": "outrider",
        "key": "outrider"
     },
     "overclockedR4": {
        "text": "During the Combat phase, when you spend a focus token, you may receive 1 stress token to assign 1 focus token to your ship.",
        "name": "Overclocked R4",
        "xws": "overclockedr4",
        "points": 1,
        "slot": "Salvaged Astromech",
        "id": 241,
        "image": "upgrades/Salvaged Astromech/overclocked-r4.png",
        "key": "overclockedR4"
     },
     "patternAnalyzer": {
        "text": "When executing a maneuver, you may resolve the \"Check Pilot Stress\" step after the \"Perform Action\" step (instead of before that step).",
        "image": "upgrades/Tech/pattern-analyzer.png",
        "name": "Pattern Analyzer",
        "xws": "patternanalyzer",
        "points": 2,
        "slot": "Tech",
        "id": 278,
        "key": "patternAnalyzer"
     },
     "phantom": {
        "image": "upgrades/Title/phantom.png",
        "text": "While you are docked, the <em>Ghost</em> can perform primary weapon attacks from its special firing arc and, at the end of the Combat phase, it may perform an additional attack with an equipped [Turret]. If it performs this attack, it cannot attack again this round.",
        "name": "Phantom",
        "unique": true,
        "points": 0,
        "slot": "Title",
        "ship": [
           "Attack Shuttle"
        ],
        "id": 197,
        "xws": "phantom",
        "key": "phantom"
     },
     "phantomIi": {
        "image": "upgrades/Title/phantom-ii.png",
        "text": "While you are docked, the <em>Ghost</em> can perform primary weapon attacks from its special firing arc.<br /><br />While you are docked, at the end of the Activation phase, the <em>Ghost</em> may perform a free coordinate action.",
        "name": "Phantom II",
        "xws": "phantomii",
        "unique": true,
        "points": 0,
        "slot": "Title",
        "ship": [
           "Sheathipede-class Shuttle"
        ],
        "id": 334,
        "key": "phantomIi"
     },
     "pivotWingAttack": {
        "image": "upgrades/Title/pivot-wing-attack.png",
        "text": "Increase your agility value by 1.<br /><br />After you execute a maneuver, you may flip this card.",
        "name": "Pivot Wing (Attack)",
        "xws": "pivotwing",
        "points": 0,
        "slot": "Title",
        "ship": [
           "U-wing"
        ],
        "id": 271,
        "dualCard": 272,
        "key": "pivotWingAttack"
     },
     "pivotWingLanding": {
        "image": "upgrades/Title/pivot-wing-landing.png",
        "text": "When you reveal a (0 [Stop]) maneuver, you may rotate your ship 180&deg;.<br /><br />After you execute a maneuver, you may flip this card.",
        "name": "Pivot Wing (Landing)",
        "xws": "pivotwing",
        "points": 0,
        "slot": "Title",
        "ship": [
           "U-wing"
        ],
        "id": 272,
        "dualCard": 271,
        "key": "pivotWingLanding"
     },
     "plasmaTorpedoes": {
        "name": "Plasma Torpedoes",
        "id": 136,
        "slot": "Torpedo",
        "points": 3,
        "text": "<strong>Attack (target lock):</strong> Spend your target lock and discard this card to perform this attack.<br /><br />If this attack hits, after dealing damage, remove 1 shield token from the defender.",
        "image": "upgrades/Torpedo/plasma-torpedoes.png",
        "xws": "plasmatorpedoes",
        "range": "2-3",
        "attack": 4,
        "key": "plasmaTorpedoes"
     },
     "predator": {
        "name": "Predator",
        "id": 57,
        "slot": "Elite",
        "points": 3,
        "text": "When attacking, you may reroll 1 attack die. If the defender's pilot skill value is \"2\" or lower, you may instead reroll up to 2 attack dice.",
        "image": "upgrades/Elite/predator.png",
        "xws": "predator",
        "key": "predator"
     },
     "primedThrusters": {
        "image": "upgrades/Tech/primed-thrusters.png",
        "text": "Stress tokens do not prevent you from performing boost or barrel roll actions unless you have 3 or more stress tokens.",
        "name": "Primed Thrusters",
        "xws": "primedthrusters",
        "points": 1,
        "slot": "Tech",
        "size": [
           "small"
        ],
        "id": 277,
        "key": "primedThrusters"
     },
     "protonBombs": {
        "name": "Proton Bombs",
        "id": 41,
        "slot": "Bomb",
        "points": 5,
        "text": "When you reveal your maneuver dial, you may discard this card to <strong>drop</strong> 1 proton bomb token.<br /><br />This token <strong>detonates</strong> at the end of the Activation phase.",
        "effect": "<strong>Bomb Token:</strong> When this bomb token detonates, deal 1 <strong>faceup</strong> Damage card to each ship at Range 1 of the token. Then discard this token.",
        "image": "upgrades/Bomb/proton-bombs.png",
        "xws": "protonbombs",
        "key": "protonBombs"
     },
     "protonRockets": {
        "name": "Proton Rockets",
        "id": 73,
        "slot": "Missile",
        "points": 3,
        "attack": 2,
        "range": "1",
        "text": "<strong>Attack (focus):</strong> Discard this card to perform this attack.<br /><br />You may roll additional attack dice equal to your agility value, to a maximum of 3 additional dice.",
        "image": "upgrades/Missile/proton-rockets.png",
        "xws": "protonrockets",
        "key": "protonRockets"
     },
     "protonTorpedoes": {
        "name": "Proton Torpedoes",
        "id": 1,
        "slot": "Torpedo",
        "points": 4,
        "attack": 4,
        "range": "2-3",
        "text": "<strong>Attack (target lock):</strong> Spend your target lock and discard this card to perform this attack.<br /><br />You may change 1 of your [Focus] results to a [Critical Hit] result.",
        "image": "upgrades/Torpedo/proton-torpedoes.png",
        "xws": "protontorpedoes",
        "key": "protonTorpedoes"
     },
     "proximityMines": {
        "name": "Proximity Mines",
        "id": 28,
        "slot": "Bomb",
        "points": 3,
        "text": "<strong>Action:</strong> Discard this card to drop 1 proximity mine token. When a ship's base or maneuver template overlaps this token, this token <strong>detonates</strong>.",
        "effect": "<strong>Bomb Token:</strong> When this bomb token detonates, the ship that moved through or overlapped this token rolls 3 attack dice and suffers all damage [Hit] and critical damage [Critical Hit] rolled. Then discard this token.",
        "image": "upgrades/Bomb/proximity-mines.png",
        "xws": "proximitymines",
        "key": "proximityMines"
     },
     "pulsedRayShield": {
        "image": "upgrades/Modification/pulsed-ray-shield.png",
        "text": "During the End phase, you may receive 1 ion token to recover 1 shield (up to your shield value). You can equip this card only if your shield value is \"1\".",
        "name": "Pulsed Ray Shield",
        "xws": "pulsedrayshield",
        "points": 2,
        "slot": "Modification",
        "faction": "Scum and Villainy",
        "id": 309,
        "key": "pulsedRayShield"
     },
     "punishingOne": {
        "image": "upgrades/Title/punishing-one.png",
        "text": "Increase your primary weapon value by 1.",
        "name": "Punishing One",
        "unique": true,
        "points": 12,
        "slot": "Title",
        "ship": [
           "JumpMaster 5000"
        ],
        "id": 194,
        "xws": "punishingone",
        "grants": [
           {
              "type": "stats",
              "name": "attack",
              "value": 1
           }
        ],
        "key": "punishingOne"
     },
     "pushTheLimit": {
        "name": "Push the Limit",
        "id": 18,
        "slot": "Elite",
        "points": 3,
        "text": "Once per round, after you perform an action, you may perform 1 free action shown in your action bar.<br /><br />Then receive 1 stress token.",
        "image": "upgrades/Elite/push-the-limit.png",
        "xws": "pushthelimit",
        "key": "pushTheLimit"
     },
     "quadLaserCannons": {
        "name": "Quad Laser Cannons",
        "id": 65,
        "slot": "Hardpoint",
        "points": 6,
        "energy": 2,
        "attack": 3,
        "range": "1-2",
        "text": "<strong>Attack (Energy):</strong> Spend 1 energy from this card to perform this attack.  If this attack does not hit, you may immediately spend 1 energy from this card to perform this attack again.",
        "image": "upgrades/Hardpoint/quad-laser-cannons.png",
        "xws": "quadlasercannons",
        "key": "quadLaserCannons"
     },
     "quantumStorm": {
        "name": "Quantum Storm",
        "id": 160,
        "energy": 1,
        "unique": true,
        "slot": "Title",
        "points": 4,
        "ship": [
           "GR-75 Medium Transport"
        ],
        "text": "At the start of the End phase, if you have 1 or fewer energy tokens, gain 1 energy token.",
        "image": "upgrades/Title/quantum-storm.png",
        "xws": "quantumstorm",
        "key": "quantumStorm"
     },
     "quickReleaseCargoLocks": {
        "image": "upgrades/Cargo/quick-release-cargo-locks.png",
        "text": "At the end of the Activation phase, you may discard this card to <strong>place</strong> 1 container token.",
        "name": "Quick-release Cargo Locks",
        "xws": "quickreleasecargolocks",
        "limited": true,
        "points": 2,
        "slot": "Cargo",
        "ship": [
           "C-ROC Cruiser",
           "GR-75 Medium Transport"
        ],
        "id": 308,
        "key": "quickReleaseCargoLocks"
     },
     "r2Astromech": {
        "name": "R2 Astromech",
        "id": 2,
        "slot": "Astromech",
        "points": 1,
        "text": "You may treat all 1- and 2-speed maneuvers as green maneuvers.",
        "image": "upgrades/Astromech/r2-astromech.png",
        "xws": "r2astromech",
        "key": "r2Astromech"
     },
     "r2D2_astromech": {
        "name": "R2-D2",
        "id": 3,
        "unique": true,
        "slot": "Astromech",
        "points": 4,
        "text": "After executing a green maneuver, you may recover 1 shield (up to your shield value).",
        "image": "upgrades/Astromech/r2-d2.png",
        "xws": "r2d2",
        "key": "r2D2_astromech"
     },
     "r2D2_crew": {
        "name": "R2-D2",
        "id": 62,
        "unique": true,
        "slot": "Crew",
        "points": 4,
        "faction": "Rebel Alliance",
        "text": "At the end of the End phase, if you have no shields, you may recover 1 shield and roll 1 attack die.  On a [Hit] result, randomly flip 1 of your facedown Damage cards faceup and resolve it.",
        "image": "upgrades/Crew/r2-d2.png",
        "xws": "r2d2-swx22",
        "key": "r2D2_crew"
     },
     "r2D6": {
        "name": "R2-D6",
        "id": 70,
        "unique": true,
        "slot": "Astromech",
        "points": 1,
        "text": "Your upgrade bar gains the [Elite] upgrade icon.<br /><br />You cannot equip this upgrade if you already have a [Elite] upgrade icon or if your pilot skill value is \"2\" or lower.",
        "image": "upgrades/Astromech/r2-d6.png",
        "xws": "r2d6",
        "grants": [
           {
              "type": "slot",
              "name": "Elite"
           }
        ],
        "key": "r2D6"
     },
     "r2F2": {
        "name": "R2-F2",
        "id": 4,
        "unique": true,
        "slot": "Astromech",
        "points": 3,
        "text": "<strong>Action:</strong> Increase your agility value by 1 until the end of this game round.",
        "image": "upgrades/Astromech/r2-f2.png",
        "xws": "r2f2",
        "key": "r2F2"
     },
     "r3A2": {
        "name": "R3-A2",
        "id": 69,
        "unique": true,
        "slot": "Astromech",
        "points": 2,
        "text": "When you declare the target of your attack, if the defender is inside your firing arc, you may receive 1 stress token to cause the defender to receive 1 stress token.",
        "image": "upgrades/Astromech/r3-a2.png",
        "xws": "r3a2",
        "key": "r3A2"
     },
     "r3Astromech": {
        "image": "upgrades/Astromech/r3-astromech.png",
        "text": "Once per round, when attacking with a primary weapon, you may cancel 1 of your [Focus] results during the \"Modify Attack Dice\" step to assign 1 evade token to your ship.",
        "name": "R3 Astromech",
        "xws": "r3astromech",
        "points": 2,
        "slot": "Astromech",
        "id": 250,
        "key": "r3Astromech"
     },
     "r4Agromech": {
        "name": "R4 Agromech",
        "id": 117,
        "slot": "Salvaged Astromech",
        "points": 2,
        "text": "When attacking, after you spend a focus token, you may acquire a target lock on the defender.",
        "image": "upgrades/Salvaged Astromech/r4-agromech.png",
        "xws": "r4agromech",
        "key": "r4Agromech"
     },
     "r4B11": {
        "name": "R4-B11",
        "id": 118,
        "unique": true,
        "slot": "Salvaged Astromech",
        "points": 3,
        "text": "When attacking, if you have a target lock on the defender, you may spend the target lock to choose any or all defense dice. The defender must reroll the chosen dice.",
        "image": "upgrades/Salvaged Astromech/r4-b11.png",
        "xws": "r4b11",
        "key": "r4B11"
     },
     "r4D6": {
        "name": "R4-D6",
        "id": 77,
        "unique": true,
        "slot": "Astromech",
        "points": 1,
        "text": "When you are hit by an attack and there are at least 3 uncanceled [Hit] results, you may choose to cancel those results until there are 2 remaining. For each result canceled this way, receive 1 stress token.",
        "image": "upgrades/Astromech/r4-d6.png",
        "xws": "r4d6",
        "key": "r4D6"
     },
     "r4E1": {
        "name": "R4-E1",
        "xws": "r4e1",
        "text": "You can perform actions on your [Torpedo] and [Bomb] Upgrade cards even if you are stressed. After you perform an action in this way, you may discard this card to remove 1 stress token from your ship.",
        "points": 1,
        "slot": "Salvaged Astromech",
        "id": 327,
        "image": "upgrades/Salvaged Astromech/r4-e1.png",
        "key": "r4E1"
     },
     "r5Astromech": {
        "name": "R5 Astromech",
        "id": 7,
        "slot": "Astromech",
        "points": 1,
        "text": "During the End phase, you may choose 1 of your faceup Damage cards with the <strong>Ship</strong> trait and flip it facedown.",
        "image": "upgrades/Astromech/r5-astromech.png",
        "xws": "r5astromech",
        "key": "r5Astromech"
     },
     "r5D8": {
        "name": "R5-D8",
        "id": 5,
        "unique": true,
        "slot": "Astromech",
        "points": 3,
        "text": "<strong>Action:</strong> Roll 1 defense die.<br /><br />On a [Evade] or [Focus] result, discard 1 of your facedown Damage cards.",
        "image": "upgrades/Astromech/r5-d8.png",
        "xws": "r5d8",
        "key": "r5D8"
     },
     "r5K6": {
        "name": "R5-K6",
        "id": 6,
        "unique": true,
        "slot": "Astromech",
        "points": 2,
        "text": "After spending your target lock, roll 1 defense die.<br /><br />On a [Evade] result, immediately acquire a target lock on that same ship.  You cannot spend this target lock during this attack.",
        "image": "upgrades/Astromech/r5-k6.png",
        "xws": "r5k6",
        "key": "r5K6"
     },
     "r5P8": {
        "image": "upgrades/Salvaged Astromech/r5-p8.png",
        "text": "Once per round, after defending, you may roll 1 attack die. On a [Hit] result, the attacker suffers 1 damage. On a [Critical Hit] result, you and the attacker each suffer 1 damage.",
        "name": "R5-P8",
        "xws": "r5p8",
        "unique": true,
        "points": 3,
        "slot": "Salvaged Astromech",
        "id": 237,
        "key": "r5P8"
     },
     "r5P9": {
        "name": "R5-P9",
        "id": 78,
        "unique": true,
        "slot": "Astromech",
        "points": 3,
        "text": "At the end of the Combat phase, you may spend 1 of your focus tokens to recover 1 shield (up to your shield value).",
        "image": "upgrades/Astromech/r5-p9.png",
        "xws": "r5p9",
        "key": "r5P9"
     },
     "r5Tk": {
        "text": "You can acquire target locks on friendly ships.<br /><br />You can attack friendly ships.",
        "name": "R5-TK",
        "xws": "r5tk",
        "unique": true,
        "points": 0,
        "slot": "Salvaged Astromech",
        "id": 353,
        "image": "upgrades/Salvaged Astromech/r5-tk.png",
        "key": "r5Tk"
     },
     "r5X3": {
        "name": "R5-X3",
        "id": 145,
        "unique": true,
        "slot": "Astromech",
        "points": 1,
        "text": "Before you reveal your maneuver, you may discard this card to ignore obstacles until the end of the round.",
        "image": "upgrades/Astromech/r5-x3.png",
        "xws": "r5x3",
        "key": "r5X3"
     },
     "r7Astromech": {
        "name": "R7 Astromech",
        "id": 59,
        "slot": "Astromech",
        "points": 2,
        "text": "Once per round when defending, if you have a target lock on the attacker, you may spend the target lock to choose any or all attack dice. The attacker must reroll the chosen dice.",
        "image": "upgrades/Astromech/r7-astromech.png",
        "xws": "r7astromech",
        "key": "r7Astromech"
     },
     "r7T1": {
        "name": "R7-T1",
        "id": 60,
        "unique": true,
        "slot": "Astromech",
        "points": 3,
        "text": "<strong>Action:</strong> Choose an enemy ship at Range 1-2.  If you are inside that ship's firing arc, you may acquire a target lock on that ship. Then, you may perform a free boost action.",
        "image": "upgrades/Astromech/r7-t1.png",
        "xws": "r7t1",
        "key": "r7T1"
     },
     "rage": {
        "image": "upgrades/Elite/rage.png",
        "text": "<strong>Action:</strong> Assign 1 focus token to your ship and receive 2 stress tokens. Until the end of the round, when attacking, you may reroll up to 3 attack dice.",
        "name": "Rage",
        "xws": "rage",
        "points": 1,
        "slot": "Elite",
        "id": 235,
        "key": "rage"
     },
     "raymusAntilles": {
        "name": "Raymus Antilles",
        "id": 89,
        "slot": "Crew",
        "unique": true,
        "faction": "Rebel Alliance",
        "points": 6,
        "text": "At the start of the Activation phase, choose 1 enemy ship at Range 1-3. You may look at that ship's chosen maneuver. If the maneuver is white, assign that ship 1 stress token.",
        "size": [
           "huge"
        ],
        "image": "upgrades/Crew/raymus-antilles.png",
        "xws": "raymusantilles",
        "key": "raymusAntilles"
     },
     "rearAdmiralChiraneau": {
        "text": "<strong>Action:</strong> Execute a white ([Straight] 1) maneuver.",
        "name": "Rear Admiral Chiraneau",
        "unique": true,
        "points": 3,
        "slot": "Crew",
        "faction": "Galactic Empire",
        "id": 224,
        "xws": "rearadmiralchiraneau",
        "image": "upgrades/Crew/rear-admiral-chiraneau.png",
        "key": "rearAdmiralChiraneau"
     },
     "rebelCaptive": {
        "name": "Rebel Captive",
        "id": 46,
        "unique": true,
        "faction": "Galactic Empire",
        "slot": "Crew",
        "points": 3,
        "text": "Once per round, the first ship that declares you as the target of an attack immediately receives 1 stress token.",
        "image": "upgrades/Crew/rebel-captive.png",
        "xws": "rebelcaptive",
        "key": "rebelCaptive"
     },
     "reconSpecialist": {
        "name": "Recon Specialist",
        "id": 38,
        "slot": "Crew",
        "points": 3,
        "text": "When you perform a focus action, assign 1 additional focus token to your ship.",
        "image": "upgrades/Crew/recon-specialist.png",
        "xws": "reconspecialist",
        "key": "reconSpecialist"
     },
     "reinforcedDeflectors": {
        "image": "upgrades/System/reinforced-deflectors.png",
        "text": "After defending, if you suffered a combination of 3 or more damage and critical damage during the attack, recover 1 shield (up to your shield value).",
        "name": "Reinforced Deflectors",
        "points": 3,
        "slot": "System",
        "size": [
           "large"
        ],
        "id": 213,
        "xws": "reinforceddeflectors",
        "key": "reinforcedDeflectors"
     },
     "renegadeRefit": {
        "image": "upgrades/Torpedo/renegade-refit.png",
        "text": "You may equip up to 2 different Modification upgrades.<br /><br />The squad point cost of your equipped [Elite] upgrades is reduced by 1 (to a minimum of 0).",
        "name": "Renegade Refit",
        "xws": "renegaderefit",
        "points": -2,
        "slot": "Torpedo",
        "ship": [
           "U-wing",
           "X-wing"
        ],
        "id": 359,
        "key": "renegadeRefit"
     },
     "requiem": {
        "text": "When you deploy a ship, treat its pilot skill value as \"8\" until the end of the round.",
        "name": "Requiem",
        "unique": true,
        "points": 4,
        "slot": "Title",
        "energy": 0,
        "ship": [
           "Gozanti-class Cruiser"
        ],
        "id": 226,
        "image": "upgrades/Title/requiem.png",
        "xws": "requiem",
        "key": "requiem"
     },
     "rey": {
        "image": "upgrades/Crew/rey.png",
        "text": "At the start of the End phase, you may place 1 of your ship's focus tokens on this card. At the start of the Combat phase, you may assign 1 of those tokens to your ship.",
        "name": "Rey",
        "xws": "rey",
        "unique": true,
        "points": 2,
        "slot": "Crew",
        "faction": "Rebel Alliance",
        "id": 275,
        "key": "rey"
     },
     "riggedCargoChute": {
        "image": "upgrades/Illicit/rigged-cargo-chute.png",
        "text": "<strong>Action:</strong> Discard this card to <strong>drop</strong> one cargo token.",
        "name": "Rigged Cargo Chute",
        "xws": "riggedcargochute",
        "size": [
           "large"
        ],
        "id": 260,
        "slot": "Illicit",
        "points": 1,
        "key": "riggedCargoChute"
     },
     "royalGuardTie": {
        "name": "Royal Guard TIE",
        "id": 155,
        "slot": "Title",
        "points": 0,
        "ship": [
           "TIE Interceptor"
        ],
        "text": "You may equip up to 2 different Modification upgrades (instead of 1).<br /><br />You cannot equip this card if your pilot skill value is \"4\" or lower.",
        "image": "upgrades/Title/royal-guard-tie.png",
        "grants": [
           {
              "type": "slot",
              "name": "Modification"
           }
        ],
        "xws": "royalguardtie",
        "key": "royalGuardTie"
     },
     "ruthlessness": {
        "name": "Ruthlessness",
        "id": 102,
        "slot": "Elite",
        "faction": "Galactic Empire",
        "points": 3,
        "text": "After you perform an attack that hits, you <strong>must</strong> choose 1 other ship at Range 1 of the defender (other than yourself). That ship suffers 1 damage.",
        "image": "upgrades/Elite/ruthlessness.png",
        "xws": "ruthlessness",
        "key": "ruthlessness"
     },
     "sabineWren": {
        "image": "upgrades/Crew/sabine-wren.png",
        "text": "Your upgrade bar gains the [Bomb] upgrade icon. Once per round, before a friendly bomb token is removed, choose 1 enemy ship at Range 1 of that token. That ship suffers 1 damage.",
        "name": "Sabine Wren",
        "unique": true,
        "points": 2,
        "slot": "Crew",
        "faction": "Rebel Alliance",
        "id": 218,
        "xws": "sabinewren",
        "grants": [
           {
              "type": "slot",
              "name": "Bomb"
           }
        ],
        "key": "sabineWren"
     },
     "sabinesMasterpiece": {
        "image": "upgrades/Title/sabines-masterpiece.png",
        "text": "Your upgrade bar gains the [Crew] and [Illicit] upgrade icons.",
        "name": "Sabine's Masterpiece",
        "xws": "sabinesmasterpiece",
        "unique": true,
        "points": 1,
        "slot": "Title",
        "ship": [
           "TIE Fighter"
        ],
        "faction": "Rebel Alliance",
        "id": 263,
        "grants": [
           {
              "type": "slot",
              "name": "Crew"
           },
           {
              "type": "slot",
              "name": "Illicit"
           }
        ],
        "key": "sabinesMasterpiece"
     },
     "saboteur": {
        "name": "Saboteur",
        "id": 39,
        "slot": "Crew",
        "points": 2,
        "text": "<strong>Action:</strong> Choose 1 enemy ship at Range 1 and roll 1 attack die.  On a [Hit] or [Critical Hit] result, choose 1 random facedown Damage card assigned to that ship, flip it faceup, and resolve it.",
        "image": "upgrades/Crew/saboteur.png",
        "xws": "saboteur",
        "key": "saboteur"
     },
     "salvagedAstromech": {
        "name": "Salvaged Astromech",
        "id": 112,
        "slot": "Salvaged Astromech",
        "points": 2,
        "text": "When you are dealt a faceup Damage card with the <strong>Ship</strong> trait, you may immediately discard that card (before resolving its effect).<br /><br />Then, discard this Upgrade card.",
        "image": "upgrades/Salvaged Astromech/salvaged-astromech.png",
        "xws": "salvagedastromech",
        "key": "salvagedAstromech"
     },
     "saturationSalvo": {
        "image": "upgrades/Elite/saturation-salvo.png",
        "text": "After you perform an attack with a [Torpedo] or [Missile] secondary weapon that does not hit, each ship at Range 1 of the defender with an agility value lower than the squad point cost of the [Torpedo] or [Missile] Upgrade card must roll 1 attack die and suffer any damage ([Hit]) or critical damage ([Critical Hit]) rolled.",
        "name": "Saturation Salvo",
        "xws": "saturationsalvo",
        "points": 1,
        "slot": "Elite",
        "id": 341,
        "key": "saturationSalvo"
     },
     "sawGerrera": {
        "text": "When attacking, you may suffer 1 damage to change all of your [Focus] results to [Critical Hit] results.",
        "name": "Saw Gerrera",
        "xws": "sawgerrera",
        "unique": true,
        "points": 1,
        "slot": "Crew",
        "faction": "Rebel Alliance",
        "id": 355,
        "image": "upgrades/Crew/saw-gerrera.png",
        "key": "sawGerrera"
     },
     "scavengerCrane": {
        "image": "upgrades/Illicit/scavenger-crane.png",
        "text": "After a ship at Range 1-2 is destroyed, you may choose a discarded [Torpedo], [Missile], [Bomb], [Cannon], [Turret], or Modification Upgrade card that was equipped to your ship and flip it faceup. Then roll 1 attack die. On a blank result, discard Scavenger Crane.",
        "name": "Scavenger Crane",
        "xws": "scavengercrane",
        "points": 2,
        "slot": "Illicit",
        "id": 293,
        "key": "scavengerCrane"
     },
     "scramblerMissiles": {
        "text": "<strong>Attack (target lock):</strong> Discard this card to perform this attack.<br /><br />If this attack hits, the defender and each other ship at Range 1 receive 1 jam token. Then cancel <strong>all</strong> results.",
        "name": "Scrambler Missiles",
        "xws": "scramblermissiles",
        "points": 2,
        "slot": "Missile",
        "range": "2-3",
        "attack": 3,
        "id": 352,
        "image": "upgrades/Missile/scrambler-missiles.png",
        "key": "scramblerMissiles"
     },
     "seismicCharges": {
        "name": "Seismic Charges",
        "id": 24,
        "slot": "Bomb",
        "points": 2,
        "text": "When you reveal your maneuver dial, you may discard this card to drop 1 seismic charge token.<br /><br />This token detonates at the end of the Activation phase.",
        "effect": "<strong>Bomb Token:</strong> When this bomb token detonates, each ship at Range 1 of the token suffers 1 damage. Then discard this token.",
        "image": "upgrades/Bomb/seismic-charges.png",
        "xws": "seismiccharges",
        "key": "seismicCharges"
     },
     "seismicTorpedo": {
        "image": "upgrades/Torpedo/seismic-torpedo.png",
        "text": "<strong>Action:</strong> Discard this card to choose an obstacle at Range 1-2 and inside your primary firing arc. Each ship at Range 1 of the obstacle rolls 1 attack die and suffers any damage ([Hit]) and critical damage ([Critical Hit]) rolled. Then remove the obstacle.",
        "name": "Seismic Torpedo",
        "xws": "seismictorpedo",
        "points": 2,
        "slot": "Torpedo",
        "id": 259,
        "key": "seismicTorpedo"
     },
     "selflessness": {
        "image": "upgrades/Elite/selflessness.png",
        "text": "When a friendly ship at Range 1 is hit by an attack, you may discard this card to suffer all uncanceled [Hit] results instead of the target ship.",
        "name": "Selflessness",
        "xws": "selflessness",
        "unique": true,
        "points": 1,
        "slot": "Elite",
        "size": [
           "small"
        ],
        "faction": "Rebel Alliance",
        "id": 322,
        "key": "selflessness"
     },
     "sensorCluster": {
        "image": "upgrades/Tech/sensor-cluster.png",
        "text": "When defending, you may spend a focus token to change 1 of your blank results to an [Evade] result.",
        "name": "Sensor Cluster",
        "xws": "sensorcluster",
        "points": 2,
        "slot": "Tech",
        "id": 254,
        "key": "sensorCluster"
     },
     "sensorJammer": {
        "name": "Sensor Jammer",
        "id": 44,
        "slot": "System",
        "points": 4,
        "text": "When defending, you may change 1 of the attacker's [Hit] results into a [Focus] result.<br /><br />The attacker cannot reroll the die with the changed result.",
        "image": "upgrades/System/sensor-jammer.png",
        "xws": "sensorjammer",
        "key": "sensorJammer"
     },
     "sensorTeam": {
        "name": "Sensor Team",
        "id": 91,
        "slot": "Team",
        "points": 4,
        "text": "When acquiring a target lock, you may lock onto an enemy ship at Range 1-5 (instead of Range 1-3).",
        "image": "upgrades/Team/sensor-team.png",
        "xws": "sensorteam",
        "key": "sensorTeam"
     },
     "servomotorSFoilsAttack": {
        "image": "upgrades/Modification/servomotor-s-foils-attack.png",
        "text": "Your action bar gains [Barrel Roll].<br /><br />If you are not stressed, when you reveal a ([Turn Left] 3) or (3 [Turn Right]) maneuver, you may treat it as a red ([Tallon Roll Left] 3) or ([Tallon Roll Right] 3) in the same direction.<br /><br />At the start of the Activation phase, you may flip this card.",
        "name": "Servomotor S-foils (Attack)",
        "xws": "servomotorsfoils",
        "points": 0,
        "slot": "Modification",
        "ship": [
           "X-wing"
        ],
        "id": 360,
        "dualCard": 361,
        "grants": [
           {
              "type": "action",
              "name": "Barrel Roll"
           }
        ],
        "key": "servomotorSFoilsAttack"
     },
     "servomotorSFoilsClosed": {
        "image": "upgrades/Modification/servomotor-s-foils-closed.png",
        "text": "Reduce your primary attack value by 1. Your action bar gains [Boost]. Treat your ([Bank Left] 2) and ([Bank Right] 2) maneuvers as green.<br /><br />At the start of the Activation phase, you may flip this card.",
        "name": "Servomotor S-foils (Closed)",
        "xws": "servomotorsfoils",
        "points": 0,
        "slot": "Modification",
        "ship": [
           "X-wing"
        ],
        "id": 361,
        "dualCard": 360,
        "grants": [
           {
              "type": "action",
              "name": "Boost"
           }
        ],
        "key": "servomotorSFoilsClosed"
     },
     "shadowCaster": {
        "text": "After you perform an attack that hits, if the defender is inside your mobile firing arc and at Range 1-2, you may assign the defender 1 tractor beam token.",
        "name": "Shadow Caster",
        "xws": "shadowcaster",
        "unique": true,
        "points": 3,
        "slot": "Title",
        "ship": [
           "Lancer-class Pursuit Craft"
        ],
        "id": 249,
        "image": "upgrades/Title/shadow-caster.png",
        "key": "shadowCaster"
     },
     "shieldProjector": {
        "name": "Shield Projector",
        "id": 52,
        "slot": "Cargo",
        "points": 4,
        "text": "When an enemy ship is declaring either a small or large ship as the target of its attack, you may spend 3 energy to force that ship to target you if possible.",
        "image": "upgrades/Cargo/shield-projector.png",
        "xws": "shieldprojector",
        "key": "shieldProjector"
     },
     "shieldTechnician": {
        "name": "Shield Technician",
        "id": 143,
        "size": [
           "huge"
        ],
        "slot": "Crew",
        "points": 1,
        "text": "When you perform a recover action, instead of spending all of your energy, you can choose any amount of energy to spend.",
        "image": "upgrades/Crew/shield-technician.png",
        "xws": "shieldtechnician",
        "key": "shieldTechnician"
     },
     "shieldUpgrade": {
        "name": "Shield Upgrade",
        "id": 175,
        "points": 4,
        "slot": "Modification",
        "text": "Increase your shield value by 1.",
        "image": "upgrades/Modification/shield-upgrade.png",
        "xws": "shieldupgrade",
        "grants": [
           {
              "type": "stats",
              "name": "shields",
              "value": 1
           }
        ],
        "key": "shieldUpgrade"
     },
     "singleTurbolasers": {
        "name": "Single Turbolasers",
        "id": 64,
        "slot": "Hardpoint",
        "points": 8,
        "energy": 2,
        "attack": 4,
        "range": "3-5",
        "text": "<strong>Attack (Energy):</strong> Spend 2 energy from this card to perform this attack.  The defender doubles his agility value against this attack.  You may change 1 of your [Focus] results to a [Hit] result.",
        "image": "upgrades/Hardpoint/single-turbolasers.png",
        "xws": "singleturbolasers",
        "key": "singleTurbolasers"
     },
     "slaveI": {
        "name": "Slave I",
        "id": 151,
        "slot": "Title",
        "unique": true,
        "points": 0,
        "ship": [
           "Firespray-31"
        ],
        "text": "Your upgrade bar gains the [Torpedo] upgrade icon.",
        "image": "upgrades/Title/slave-i.png",
        "grants": [
           {
              "type": "slot",
              "name": "Torpedo"
           }
        ],
        "xws": "slavei",
        "key": "slaveI"
     },
     "slicerTools": {
        "name": "Slicer Tools",
        "id": 51,
        "slot": "Cargo",
        "points": 7,
        "text": "<strong>Action:</strong> Choose 1 or more ships at Range 1-3 that have a stress token.  For each ship chosen, you may spend 1 energy to cause that ship to suffer 1 damage.",
        "image": "upgrades/Cargo/slicer-tools.png",
        "xws": "slicertools",
        "key": "slicerTools"
     },
     "smugglingCompartment": {
        "image": "upgrades/Modification/smuggling-compartment.png",
        "text": "Your upgrade bar gains the [Illicit] upgrade icon.<br /><br />You may equip 1 additional Modification upgrade that costs 3 or fewer squad points.",
        "name": "Smuggling Compartment",
        "xws": "smugglingcompartment",
        "limited": true,
        "points": 0,
        "slot": "Modification",
        "ship": [
           "YT-1300",
           "YT-2400"
        ],
        "id": 273,
        "grants": [
           {
              "type": "slot",
              "name": "Illicit"
           }
        ],
        "key": "smugglingCompartment"
     },
     "snapShot": {
        "image": "upgrades/Elite/snap-shot.png",
        "text": "After an enemy ship executes a maneuver, you may perform this attack against that ship.<br /><br /><strong>Attack:</strong> Attack 1 ship. You cannot modify your attack dice and cannot attack again this phase.",
        "name": "Snap Shot",
        "xws": "snapshot",
        "points": 2,
        "slot": "Elite",
        "range": "1",
        "attack": 2,
        "id": 279,
        "key": "snapShot"
     },
     "spacetugTractorArray": {
        "image": "upgrades/Modification/spacetug-tractor-array.png",
        "text": "<strong>Action:</strong> Choose a ship inside your firing arc at Range 1 and assign a tractor beam token to it. If it is a friendly ship, resolve the effect of the tractor beam token a though it were an enemy ship.",
        "name": "Spacetug Tractor Array",
        "xws": "spacetugtractorarray",
        "points": 2,
        "ship": [
           "Quadjumper"
        ],
        "id": 294,
        "slot": "Modification",
        "key": "spacetugTractorArray"
     },
     "specialOpsTraining": {
        "name": "Special Ops Training",
        "xws": "specialopstraining",
        "image": "upgrades/Title/special-ops-training.png",
        "text": "When attacking with a primary weapon from your primary firing arc, you may roll 1 additional attack die. If you do not, you may perform an additional attack from your auxiliary firing arc.",
        "points": 0,
        "slot": "Title",
        "ship": [
           "TIE/sf Fighter"
        ],
        "id": 247,
        "key": "specialOpsTraining"
     },
     "squadLeader": {
        "name": "Squad Leader",
        "id": 10,
        "unique": true,
        "slot": "Elite",
        "points": 2,
        "text": "<strong>Action:</strong> Choose 1 ship at Range 1-2 that has a lower pilot skill than you.<br /><br />The chosen ship may immediately perform 1 free action.",
        "image": "upgrades/Elite/squad-leader.png",
        "xws": "squadleader",
        "key": "squadLeader"
     },
     "st321": {
        "name": "ST-321",
        "id": 154,
        "slot": "Title",
        "unique": true,
        "points": 3,
        "ship": [
           "Lambda-class Shuttle"
        ],
        "text": "When acquiring a target lock, you may lock onto any enemy ship in the play area.",
        "image": "upgrades/Title/st-321.png",
        "xws": "st321",
        "key": "st321"
     },
     "starviperMkii": {
        "image": "upgrades/Title/starviper-mk-ii.png",
        "text": "You may equip up to 2 different Title upgrades.<br /><br />When performing a barrel roll action, you <strong>must</strong> use the ([Bank Left] 1) or ([Bank Right] 1) template instead of the ([Straight] 1) template.",
        "name": "StarViper Mk.II",
        "xws": "starvipermkii",
        "points": -3,
        "slot": "Title",
        "ship": [
           "StarViper"
        ],
        "id": 320,
        "key": "starviperMkii"
     },
     "stayOnTarget": {
        "name": "Stay on Target",
        "id": 96,
        "slot": "Elite",
        "points": 2,
        "text": "When you reveal a maneuver, you may rotate your dial to another maneuver with the same speed. Treat your maneuver as a red maneuver.",
        "image": "upgrades/Elite/stay-on-target.png",
        "xws": "stayontarget",
        "key": "stayOnTarget"
     },
     "stealthDevice": {
        "name": "Stealth Device",
        "id": 174,
        "points": 3,
        "slot": "Modification",
        "text": "Increase your agility value by 1. If you are hit by an attack, discard this card.",
        "image": "upgrades/Modification/stealth-device.png",
        "xws": "stealthdevice",
        "grants": [
           {
              "type": "stats",
              "name": "agility",
              "value": 1
           }
        ],
        "key": "stealthDevice"
     },
     "stygiumParticleAccelerator": {
        "name": "Stygium Particle Accelerator",
        "id": 181,
        "slot": "Modification",
        "points": 2,
        "text": "When you either decloak or perform a cloak action, you may perform a free evade action.",
        "image": "upgrades/Modification/stygium-particle-accelerator.png",
        "xws": "stygiumparticleaccelerator",
        "key": "stygiumParticleAccelerator"
     },
     "superchargedPowerCells": {
        "image": "upgrades/Cargo/supercharged-power-cells.png",
        "text": "When attacking, you may discard this card to roll 2 additional attack dice.",
        "name": "Supercharged Power Cells",
        "xws": "superchargedpowercells",
        "limited": true,
        "points": 3,
        "slot": "Cargo",
        "id": 307,
        "key": "superchargedPowerCells"
     },
     "suppressor": {
        "text": "Once per round, after you acquire a target lock on an enemy ship, you may remove 1 focus, evade, or blue target lock token from that ship.",
        "name": "Suppressor",
        "unique": true,
        "points": 6,
        "slot": "Title",
        "energy": 2,
        "ship": [
           "Gozanti-class Cruiser"
        ],
        "id": 228,
        "image": "upgrades/Title/suppressor.png",
        "xws": "suppressor",
        "key": "suppressor"
     },
     "swarmLeader": {
        "image": "upgrades/Elite/swarm-leader.png",
        "text": "When performing a primary weapon attack, choose up to 2 other friendly ships that have the defender inside their firing arcs at Range 1-3. Remove 1 evade token from each chosen ship to roll 1 additional attack die for each token removed.",
        "name": "Swarm Leader",
        "xws": "swarmleader",
        "unique": true,
        "points": 3,
        "slot": "Elite",
        "id": 295,
        "key": "swarmLeader"
     },
     "swarmTactics": {
        "name": "Swarm Tactics",
        "id": 9,
        "slot": "Elite",
        "points": 2,
        "text": "At the start of the Combat phase,  you may choose 1 friendly ship at Range 1.<br /><br />Until the end of this phase, treat the chosen ship as if its pilot skill were equal to your pilot skill.",
        "image": "upgrades/Elite/swarm-tactics.png",
        "xws": "swarmtactics",
        "key": "swarmTactics"
     },
     "syncedTurret": {
        "image": "upgrades/Turret/synced-turret.png",
        "text": "<strong>Attack (target lock):</strong> Attack 1 ship (even a ship outside your firing arc).<br /><br />If the defender is inside your primary firing arc, you may reroll a number of attack dice up to your primary weapon value.",
        "name": "Synced Turret",
        "xws": "syncedturret",
        "points": 4,
        "slot": "Turret",
        "range": "1-2",
        "attack": 3,
        "id": 314,
        "key": "syncedTurret"
     },
     "systemsOfficer": {
        "image": "upgrades/Crew/systems-officer.png",
        "text": "After you execute a green maneuver, choose another friendly ship at Range 1. That ship may acquire a target lock.",
        "name": "Systems Officer",
        "xws": "systemsofficer",
        "limited": true,
        "points": 2,
        "slot": "Crew",
        "faction": "Galactic Empire",
        "id": 245,
        "key": "systemsOfficer"
     },
     "tacticalJammer": {
        "name": "Tactical Jammer",
        "id": 187,
        "slot": "Modification",
        "points": 1,
        "text": "Your ship can obstruct enemy attacks.",
        "image": "upgrades/Modification/tactical-jammer.png",
        "size": [
           "large"
        ],
        "xws": "tacticaljammer",
        "key": "tacticalJammer"
     },
     "tacticalOfficer": {
        "image": "upgrades/Crew/tactical-officer.png",
        "text": "Your action bar gains [Coordinate].",
        "name": "Tactical Officer",
        "xws": "tacticalofficer",
        "points": 2,
        "slot": "Crew",
        "faction": "Galactic Empire",
        "id": 363,
        "key": "tacticalOfficer"
     },
     "tactician": {
        "name": "Tactician",
        "id": 61,
        "slot": "Crew",
        "points": 2,
        "text": "After you perform an attack against a ship inside your firing arc at Range 2, that ship receives 1 stress token.",
        "image": "upgrades/Crew/tactician.png",
        "xws": "tactician",
        "limited": true,
        "key": "tactician"
     },
     "tailGunner": {
        "image": "upgrades/Crew/tail-gunner.png",
        "text": "When attacking from your rear-facing auxiliary firing arc, reduce the defender's agility by 1 (to a minimum of \"0\").",
        "name": "Tail Gunner",
        "xws": "tailgunner",
        "limited": true,
        "points": 2,
        "slot": "Crew",
        "id": 252,
        "key": "tailGunner"
     },
     "tantiveIv": {
        "name": "Tantive IV",
        "id": 158,
        "unique": true,
        "slot": "Title",
        "points": 4,
        "ship": [
           "CR90 Corvette (Fore)"
        ],
        "text": "Your fore section upgrade bar gains 1 additional [Crew] and 1 additional [Team] upgrade icon.",
        "image": "upgrades/Title/tantive-iv.png",
        "xws": "tantiveiv",
        "grants": [
           {
              "type": "slot",
              "name": "Crew"
           },
           {
              "type": "slot",
              "name": "Team"
           }
        ],
        "key": "tantiveIv"
     },
     "targetingAstromech": {
        "image": "upgrades/Astromech/targeting-astromech.png",
        "text": "After you execute a red maneuver, you may acquire a target lock.",
        "name": "Targeting Astromech",
        "points": 2,
        "slot": "Astromech",
        "id": 214,
        "xws": "targetingastromech",
        "key": "targetingAstromech"
     },
     "targetingComputer": {
        "name": "Targeting Computer",
        "id": 178,
        "slot": "Modification",
        "points": 2,
        "text": "Your action bar gains the [Target Lock] action icon.",
        "image": "upgrades/Modification/targeting-computer.png",
        "xws": "targetingcomputer",
        "grants": [
           {
              "type": "action",
              "name": "Target Lock"
           }
        ],
        "key": "targetingComputer"
     },
     "targetingCoordinator": {
        "name": "Targeting Coordinator",
        "id": 88,
        "slot": "Crew",
        "limited": true,
        "points": 4,
        "text": "<strong>Energy:</strong> You may spend 1 energy to choose 1 friendly ship at Range 1-2. Acquire a target lock, then assign the blue target lock token to the chosen ship.",
        "image": "upgrades/Crew/targeting-coordinator.png",
        "xws": "targetingcoordinator",
        "key": "targetingCoordinator"
     },
     "targetingScrambler": {
        "image": "upgrades/System/targeting-scrambler.png",
        "text": "At the start of the Planning phase, you may receive a weapons disabled token to choose a ship at Range 1-3 and assign it the \"Scrambled\" Condition.",
        "name": "Targeting Scrambler",
        "xws": "targetingscrambler",
        "unique": true,
        "points": 0,
        "slot": "System",
        "conditions": [
           "Scrambled"
        ],
        "id": 354,
        "key": "targetingScrambler"
     },
     "targetingSynchronizer": {
        "image": "upgrades/Tech/targeting-synchronizer.png",
        "text": "When a friendly ship at Range 1-2 is attacking a ship you have locked, the friendly ship treats the \"<strong>Attack (target lock):</strong>\" header as \"<strong>Attack:</strong>.\" If a game effect instructs that ship to spend a target lock, it may spend your target lock instead.",
        "name": "Targeting Synchronizer",
        "xws": "targetingsynchronizer",
        "points": 3,
        "slot": "Tech",
        "id": 288,
        "key": "targetingSynchronizer"
     },
     "thermalDetonators": {
        "text": "When you reveal your maneuver dial, you may discard this card to <strong>drop</strong> 1 thermal detonator token.<br /><br />This token <strong>detonates</strong> at the end of the Activation phase.",
        "name": "Thermal Detonators",
        "xws": "thermaldetonators",
        "points": 3,
        "slot": "Bomb",
        "id": 242,
        "effect": "When this bomb token detonates, each ship at Range 1 of the token suffers 1 damage and receives 1 stress token. Then discard this token.",
        "image": "upgrades/Bomb/thermal-detonators.png",
        "key": "thermalDetonators"
     },
     "threatTracker": {
        "image": "upgrades/Tech/threat-tracker.png",
        "text": "When an enemy ship inside your firing arc at Range 1-2 becomes the active ship during the Combat phase, you may spend your target lock on that ship to perform a free boost or barrel roll action if that action is on your action bar.",
        "name": "Threat Tracker",
        "xws": "threattracker",
        "points": 3,
        "slot": "Tech",
        "size": [
           "small"
        ],
        "id": 351,
        "key": "threatTracker"
     },
     "thrustCorrector": {
        "name": "Thrust Corrector",
        "xws": "thrustcorrector",
        "text": "When defending, if you have 3 or fewer stress tokens, you may receive 1 stress token to cancel all of your dice results. If you do, add 1 [Evade] result to your roll. Your dice cannot be modified again during this attack. You can equip this Upgrade only if your hull value is \"4\" or lower.",
        "points": 1,
        "slot": "System",
        "id": 366,
        "image": "upgrades/System/thrust-corrector.png",
        "key": "thrustCorrector"
     },
     "tibannaGasSupplies": {
        "name": "Tibanna Gas Supplies",
        "id": 66,
        "slot": "Cargo",
        "points": 4,
        "limited": true,
        "text": "<strong>Energy:</strong> You may discard this card to gain 3 energy.",
        "image": "upgrades/Cargo/tibanna-gas-supplies.png",
        "xws": "tibannagassupplies",
        "key": "tibannaGasSupplies"
     },
     "tieD": {
        "image": "upgrades/Title/tie-d.png",
        "text": "Once per round, after you perform an attack with a [Cannon] secondary weapon that costs 3 or fewer squad points, you may perform a primary weapon attack.",
        "name": "TIE/D",
        "points": 0,
        "slot": "Title",
        "ship": [
           "TIE Defender"
        ],
        "id": 220,
        "xws": "tied",
        "key": "tieD"
     },
     "tieShuttle": {
        "text": "Your upgrade bar loses all [Torpedo], [Missile] and [Bomb] upgrade icons and gains 2 [Crew] upgrade icons. You cannot equip a [Crew] Upgrade card that costs more than 4 squad points.",
        "name": "TIE Shuttle",
        "points": 0,
        "slot": "Title",
        "ship": [
           "TIE Bomber"
        ],
        "id": 221,
        "xws": "tieshuttle",
        "image": "upgrades/Title/tie-shuttle.png",
        "grants": [
           {
              "type": "slot",
              "name": "Crew"
           },
           {
              "type": "slot",
              "name": "Crew"
           }
        ],
        "key": "tieShuttle"
     },
     "tieV1": {
        "text": "After you acquire a target lock, you may perform a free evade action.",
        "name": "TIE/v1",
        "points": 1,
        "slot": "Title",
        "ship": [
           "TIE Adv. Prototype"
        ],
        "id": 208,
        "image": "upgrades/Title/tie-v1.png",
        "xws": "tiev1",
        "key": "tieV1"
     },
     "tieX1": {
        "name": "TIE/x1",
        "id": 170,
        "slot": "Title",
        "points": 0,
        "ship": [
           "TIE Advanced"
        ],
        "text": "Your upgrade bar gains the [System] upgrade icon.<br /><br />If you equip a [System] upgrade, its squad point cost is reduced by 4 (to a minimum of 0).",
        "image": "upgrades/Title/tie-x1.png",
        "grants": [
           {
              "type": "slot",
              "name": "System"
           }
        ],
        "xws": "tiex1",
        "key": "tieX1"
     },
     "tieX7": {
        "image": "upgrades/Title/tie-x7.png",
        "text": "Your upgrade bar loses the [Cannon] and [Missile] upgrade icons.<br /><br />After executing a 3-, 4-, or 5-speed maneuver, if you did not overlap an obstacle or ship, you may perform a free evade action.",
        "name": "TIE/x7",
        "unique": false,
        "points": -2,
        "slot": "Title",
        "ship": [
           "TIE Defender"
        ],
        "id": 219,
        "xws": "tiex7",
        "key": "tieX7"
     },
     "torynFarr": {
        "name": "Toryn Farr",
        "id": 76,
        "unique": true,
        "slot": "Crew",
        "points": 6,
        "text": "<strong>Action:</strong> Spend any amount of energy to choose that many enemy ships at Range 1-2. Remove all focus, evade, and blue target lock tokens from those ships.",
        "faction": "Rebel Alliance",
        "size": [
           "huge"
        ],
        "image": "upgrades/Crew/toryn-farr.png",
        "xws": "torynfarr",
        "key": "torynFarr"
     },
     "tractorBeam": {
        "image": "upgrades/Cannon/tractor-beam.png",
        "text": "<strong>Attack:</strong> Attack 1 ship.<br /><br />If this attack hits, the defender receives 1 tractor beam token. Then cancel <strong>all</strong> dice results.",
        "name": "Tractor Beam",
        "points": 1,
        "slot": "Cannon",
        "range": "1-3",
        "attack": 3,
        "id": 195,
        "xws": "tractorbeam",
        "key": "tractorBeam"
     },
     "trajectorySimulator": {
        "image": "upgrades/System/trajectory-simulator.png",
        "text": "You may launch bombs using the ([Straight] 5) template instead of dropping them. You cannot launch bombs with the \"<strong>Action:</strong>\" header in this way.",
        "name": "Trajectory Simulator",
        "xws": "trajectorysimulator",
        "points": 1,
        "slot": "System",
        "id": 336,
        "key": "trajectorySimulator"
     },
     "trickShot": {
        "text": "When attacking, if the attack is obstructed, you may roll 1 additional attack die.",
        "name": "Trick Shot",
        "xws": "trickshot",
        "points": 0,
        "slot": "Elite",
        "id": 282,
        "image": "upgrades/Elite/trick-shot.png",
        "key": "trickShot"
     },
     "twinIonEngineMkIi": {
        "name": "Twin Ion Engine Mk. II",
        "id": 190,
        "slot": "Modification",
        "points": 1,
        "ship": [
           "TIE Adv. Prototype",
           "TIE Advanced",
           "TIE Aggressor",
           "TIE Bomber",
           "TIE Defender",
           "TIE Fighter",
           "TIE Interceptor",
           "TIE Phantom",
           "TIE Punisher",
           "TIE Reaper",
           "TIE Silencer",
           "TIE Striker",
           "TIE/fo Fighter",
           "TIE/sf Fighter"
        ],
        "image": "upgrades/Modification/twin-ion-engine-mkii.png",
        "text": "You may treat all bank maneuvers ([Bank Left] or [Bank Right]) as green maneuvers.",
        "xws": "twinionenginemkii",
        "key": "twinIonEngineMkIi"
     },
     "twinLaserTurret": {
        "name": "Twin Laser Turret",
        "id": 138,
        "range": "2-3",
        "slot": "Turret",
        "points": 6,
        "text": "<strong>Attack:</strong> Perform this attack <strong>twice</strong> (even against a ship outside your firing arc).<br /><br />Each time this attack hits, the defender suffers 1 damage. Then cancel <strong>all</strong> dice results.",
        "image": "upgrades/Turret/twin-laser-turret.png",
        "xws": "twinlaserturret",
        "key": "twinLaserTurret"
     },
     "unguidedRockets": {
        "image": "upgrades/Missile/unguided-rockets.png",
        "text": "<strong>Attack (focus):</strong> Attack 1 ship.<br /><br />Your attack dice can be modified only by spending a focus token for its standard effect.",
        "name": "Unguided Rockets",
        "xws": "unguidedrockets",
        "points": 2,
        "slot": "Missile",
        "range": "1-3",
        "attack": 3,
        "id": 312,
        "key": "unguidedRockets"
     },
     "unhingedAstromech": {
        "name": "Unhinged Astromech",
        "id": 109,
        "slot": "Salvaged Astromech",
        "points": 1,
        "text": "You may treat all 3-speed maneuvers as green maneuvers.",
        "image": "upgrades/Salvaged Astromech/unhinged-astromech.png",
        "xws": "unhingedastromech",
        "key": "unhingedAstromech"
     },
     "unkarPlutt": {
        "image": "upgrades/Crew/unkar-plutt.png",
        "text": "After executing a maneuver that causes you to overlap an enemy ship, you may suffer 1 damage to perform 1 free action.",
        "name": "Unkar Plutt",
        "xws": "unkarplutt",
        "unique": true,
        "points": 1,
        "slot": "Crew",
        "faction": "Scum and Villainy",
        "id": 265,
        "key": "unkarPlutt"
     },
     "vaksai": {
        "image": "upgrades/Title/vaksai.png",
        "text": "The squad point cost of each of your equipped upgrades is reduced by 1 (to a minimum of 0).<br /><br />You may equip up to 3 different Modification upgrades.",
        "name": "Vaksai",
        "xws": "vaksai",
        "points": 0,
        "slot": "Title",
        "ship": [
           "Kihraxz Fighter"
        ],
        "id": 319,
        "key": "vaksai"
     },
     "vector": {
        "text": "After you execute a maneuver, you may deploy up to 4 docked ships (instead of 2).",
        "name": "Vector",
        "unique": true,
        "points": 2,
        "slot": "Title",
        "energy": 1,
        "ship": [
           "Gozanti-class Cruiser"
        ],
        "id": 227,
        "image": "upgrades/Title/vector.png",
        "xws": "vector",
        "key": "vector"
     },
     "vectoredThrusters": {
        "image": "upgrades/Modification/vectored-thrusters.png",
        "text": "Your action bar gains the [Barrel Roll] action icon.",
        "name": "Vectored Thrusters",
        "xws": "vectoredthrusters",
        "points": 2,
        "slot": "Modification",
        "size": [
           "small"
        ],
        "id": 251,
        "grants": [
           {
              "type": "action",
              "name": "Barrel Roll"
           }
        ],
        "key": "vectoredThrusters"
     },
     "veteranInstincts": {
        "name": "Veteran Instincts",
        "id": 27,
        "slot": "Elite",
        "points": 1,
        "text": "Increase your pilot skill value by 2.",
        "image": "upgrades/Elite/veteran-instincts.png",
        "xws": "veteraninstincts",
        "grants": [
           {
              "type": "stats",
              "name": "skill",
              "value": 2
           }
        ],
        "key": "veteranInstincts"
     },
     "virago": {
        "name": "Virago",
        "id": 167,
        "slot": "Title",
        "unique": true,
        "points": 1,
        "ship": [
           "StarViper"
        ],
        "text": "Your upgrade bar gains the [System] and [Illicit] upgrade icons.<br /><br />You cannot equip this card if your pilot skill value is \"3\" or lower.",
        "image": "upgrades/Title/virago.png",
        "grants": [
           {
              "type": "slot",
              "name": "System"
           },
           {
              "type": "slot",
              "name": "Illicit"
           }
        ],
        "xws": "virago",
        "key": "virago"
     },
     "weaponsEngineer": {
        "name": "Weapons Engineer",
        "id": 29,
        "slot": "Crew",
        "points": 3,
        "text": "You may maintain 2 target locks (only 1 per enemy ship).<br /><br />When you acquire a target lock, you may lock onto 2 different ships.",
        "image": "upgrades/Crew/weapons-engineer.png",
        "xws": "weaponsengineer",
        "key": "weaponsEngineer"
     },
     "weaponsGuidance": {
        "name": "Weapons Guidance",
        "id": 150,
        "slot": "Tech",
        "points": 2,
        "text": "When attacking, you may spend a focus token to change 1 of your blank results to a [Hit] result.",
        "image": "upgrades/Tech/weapons-guidance.png",
        "xws": "weaponsguidance",
        "key": "weaponsGuidance"
     },
     "wed15RepairDroid": {
        "name": "WED-15 Repair Droid",
        "id": 79,
        "slot": "Crew",
        "points": 2,
        "text": "<strong>Action:</strong> Spend 1 energy to discard 1 of your facedown Damage cards, or spend 3 energy to discard 1 of your faceup Damage cards.",
        "size": [
           "huge"
        ],
        "image": "upgrades/Crew/wed-15-repair-droid.png",
        "xws": "wed15repairdroid",
        "key": "wed15RepairDroid"
     },
     "wingman": {
        "name": "Wingman",
        "id": 54,
        "slot": "Elite",
        "points": 2,
        "text": "At the start of the Combat phase, remove 1 stress token from another friendly ship at Range 1.",
        "image": "upgrades/Elite/wingman.png",
        "xws": "wingman",
        "key": "wingman"
     },
     "wired": {
        "name": "Wired",
        "id": 148,
        "slot": "Elite",
        "points": 1,
        "text": "When attacking or defending, if you are stressed, you may reroll 1 or more of your [Focus] results.",
        "image": "upgrades/Elite/wired.png",
        "xws": "wired",
        "key": "wired"
     },
     "wookieeCommandos": {
        "image": "upgrades/Crew/wookiee-commandos.png",
        "text": "When attacking, you may reroll your [Focus] results.",
        "name": "Wookiee Commandos",
        "xws": "wookieecommandos",
        "points": 1,
        "slot": "Crew",
        "faction": "Rebel Alliance",
        "id": 315,
        "key": "wookieeCommandos"
     },
     "xg1AssaultConfiguration": {
        "image": "upgrades/Title/xg-1-assault-configuration.png",
        "text": "Your upgrade bar gains 2 [Cannon] upgrade icons.<br /><br />You may perform attacks with [Cannon] secondary weapons that cost 2 or fewer squad points even while you have a weapons disabled token.",
        "name": "Xg-1 Assault Configuration",
        "xws": "xg1assaultconfiguration",
        "unique": false,
        "points": 1,
        "slot": "Title",
        "ship": [
           "Alpha-class Star Wing"
        ],
        "grants": [
           {
              "type": "slot",
              "name": "Cannon"
           },
           {
              "type": "slot",
              "name": "Cannon"
           }
        ],
        "id": 331,
        "key": "xg1AssaultConfiguration"
     },
     "xx23SThreadTracers": {
        "image": "upgrades/Missile/xx-23-s-thread-tracers.png",
        "text": "<strong>Attack (Focus):</strong> Discard this card to perform this attack. If this attack hits, each friendly ship at Range 1-2 of you may acquire a target lock on the defender. Then cancel <strong>all</strong> dice results.",
        "name": "XX-23 S-Thread Tracers",
        "points": 1,
        "slot": "Missile",
        "range": "1-3",
        "attack": 3,
        "id": 199,
        "xws": "xx23sthreadtracers",
        "key": "xx23SThreadTracers"
     },
     "ysanneIsard": {
        "name": "Ysanne Isard",
        "id": 100,
        "slot": "Crew",
        "unique": true,
        "faction": "Galactic Empire",
        "points": 4,
        "text": "At the start of the Combat phase, if you have no shields and at least 1 Damage card assigned to your ship, you may perform a free evade action.",
        "image": "upgrades/Crew/ysanne-isard.png",
        "xws": "ysanneisard",
        "key": "ysanneIsard"
     },
     "zebOrrelios": {
        "image": "upgrades/Crew/zeb-orrelios.png",
        "text": "Enemy ships inside your firing arc that you are touching are not considered to be touching you when either you or they activate during the Combat phase.",
        "name": "\"Zeb\" Orrelios",
        "unique": true,
        "points": 1,
        "slot": "Crew",
        "faction": "Rebel Alliance",
        "id": 211,
        "xws": "zeborrelios",
        "key": "zebOrrelios"
     },
     "zuckuss": {
        "image": "upgrades/Crew/zuckuss.png",
        "text": "When attacking, if you are not stressed, you may receive any number of stress tokens to choose an equal number of defense dice. The defender must reroll those dice.",
        "name": "Zuckuss",
        "xws": "zuckuss",
        "unique": true,
        "points": 1,
        "slot": "Crew",
        "faction": "Scum and Villainy",
        "id": 230,
        "key": "zuckuss"
     }
  };

  Object.freeze(UpgradeCard);

  const UpgradeSlot = {

    ASTROMECH: "astromech",
    BOMB: "bomb",
    CANNON: "cannon",
    CARGO: "cargo",
    CREW: "crew",
    ELITE: "elite",
    HARDPOINT: "hardpoint",
    ILLICIT: "illicit",
    MISSILE: "missile",
    MODIFICATION: "modification",
    SALVAGED_ASTROMECH: "salvagedAstromech",
    SYSTEM: "system",
    TEAM: "team",
    TECH: "tech",
    TITLE: "title",
    TORPEDO: "torpedo",
    TURRET: "turret",
  };

  UpgradeSlot.properties = 
  {
     "astromech": {
        "name": "Astromech",
        "image": "upgrade-slot/astromech.png",
        "key": "astromech"
     },
     "bomb": {
        "name": "Bomb",
        "image": "upgrade-slot/bomb.png",
        "key": "bomb"
     },
     "cannon": {
        "name": "Cannon",
        "image": "upgrade-slot/cannon.png",
        "key": "cannon"
     },
     "cargo": {
        "name": "Cargo",
        "image": "upgrade-slot/cargo.png",
        "key": "cargo"
     },
     "crew": {
        "name": "Crew",
        "image": "upgrade-slot/crew.png",
        "key": "crew"
     },
     "elite": {
        "name": "Elite",
        "image": "upgrade-slot/elite.png",
        "key": "elite"
     },
     "hardpoint": {
        "name": "Hardpoint",
        "image": "upgrade-slot/hardpoint.png",
        "key": "hardpoint"
     },
     "illicit": {
        "name": "Illicit",
        "image": "upgrade-slot/illicit.png",
        "key": "illicit"
     },
     "missile": {
        "name": "Missile",
        "image": "upgrade-slot/missile.png",
        "key": "missile"
     },
     "modification": {
        "name": "Modification",
        "image": "upgrade-slot/modification.png",
        "key": "modification"
     },
     "salvagedAstromech": {
        "name": "Salvaged Astromech",
        "image": "upgrade-slot/salvaged-astromech.png",
        "key": "salvagedAstromech"
     },
     "system": {
        "name": "System",
        "image": "upgrade-slot/system.png",
        "key": "system"
     },
     "team": {
        "name": "Team",
        "image": "upgrade-slot/team.png",
        "key": "team"
     },
     "tech": {
        "name": "Tech",
        "image": "upgrade-slot/tech.png",
        "key": "tech"
     },
     "title": {
        "name": "Title",
        "image": "upgrade-slot/title.png",
        "key": "title"
     },
     "torpedo": {
        "name": "Torpedo",
        "image": "upgrade-slot/torpedo.png",
        "key": "torpedo"
     },
     "turret": {
        "name": "Turret",
        "image": "upgrade-slot/turret.png",
        "key": "turret"
     }
  };

  Object.freeze(UpgradeSlot);

  const Selector = {};

  const STRING_TO_RANGES = {
    "1": [Range.ONE],
    "1-2": [Range.ONE, Range.TWO],
    "1-3": [Range.ONE, Range.TWO, Range.THREE],
    "2": [Range.TWO],
    "2-3": [Range.TWO, Range.THREE],
    "2-4": [Range.TWO, Range.THREE, Range.FOUR],
    "3-5": [Range.THREE, Range.FOUR, Range.FIVE]
  };

  const dialToManeuver = dial => ManeuverUtilities.dialToManeuver(dial);

  const keysByName = (enumClass, names) => {
    const mapFunction = name => {
      const enumValue = Selector.findEnumValueByName(name, enumClass);
      return enumValue !== undefined ? enumValue.key : undefined;
    };
    return R.map(mapFunction, names);
  };

  const valueByKey = (enumClass, key) => enumClass.properties[key];

  // /////////////////////////////////////////////////////////////////////////////////////////////////
  Selector.enumKeys = enumClass => EnumUtilities.keys(enumClass);

  Selector.enumValues = enumClass => EnumUtilities.values(enumClass);

  Selector.factionKeysByShip = shipKey => keysByName(Faction, Selector.ship(shipKey).faction);

  Selector.factionValueByPilot = pilotKey =>
    Selector.findEnumValueByName(Selector.pilotCard(pilotKey).faction, Faction);

  Selector.findEnumValueByName = (name, enumClass) => EnumUtilities.findByName(name, enumClass);

  Selector.firingArcKeysByShip = shipKey => keysByName(FiringArc, Selector.ship(shipKey).firing_arcs);

  Selector.grantByStat = statKey => R.prop("grant", Selector.stat(statKey));

  Selector.maneuverKeysByShip = shipKey =>
    R.map(dial => dialToManeuver(dial), Selector.ship(shipKey).dial);

  Selector.rangesByUpgrade = upgradeKey => STRING_TO_RANGES[Selector.upgradeCard(upgradeKey).range];

  Selector.shipActionKeysByShip = shipKey => keysByName(ShipAction, Selector.ship(shipKey).actions);

  Selector.shipBaseValueByShip = shipKey => Selector.shipBase(Selector.ship(shipKey).size);

  Selector.shipKeyByPilot = pilotKey => Selector.shipValueByPilot(pilotKey).key;

  Selector.shipValueByPilot = pilotKey =>
    Selector.findEnumValueByName(Selector.pilotCard(pilotKey).ship, Ship);

  Selector.statValueByPilot = (pilotKey, statKey) =>
    R.prop(Selector.grantByStat(statKey), Selector.pilotCard(pilotKey));

  Selector.statValueByShip = (shipKey, statKey) =>
    R.prop(Selector.grantByStat(statKey), Selector.ship(shipKey));

  Selector.upgradeSlotKeysByPilot = pilotKey =>
    keysByName(UpgradeSlot, Selector.pilotCard(pilotKey).slots);

  Selector.upgradeSlotValueByUpgrade = upgradeKey =>
    Selector.findEnumValueByName(Selector.upgradeCard(upgradeKey).slot, UpgradeSlot);

  // //////////////////////////////////////////////////////////////////////////////
  Selector.attackDiceValue = key => valueByKey(AttackDiceValue, key);

  Selector.conditionCard = key => valueByKey(ConditionCard, key);

  Selector.damageCard = key => valueByKey(DamageCard, key);

  Selector.damageCardTFA = key => valueByKey(DamageCardTFA, key);

  Selector.defenseDiceValue = key => valueByKey(DefenseDiceValue, key);

  Selector.diceModification = key => valueByKey(DiceModification, key);

  Selector.faction = key => valueByKey(Faction, key);

  Selector.firingArc = key => valueByKey(FiringArc, key);

  Selector.maneuver = key => valueByKey(Maneuver, key);

  Selector.phase = key => valueByKey(Phase, key);

  Selector.pilotCard = key => valueByKey(PilotCard, key);

  Selector.playFormat = key => valueByKey(PlayFormat, key);

  Selector.range = key => valueByKey(Range, key);

  Selector.referenceCard = key => valueByKey(ReferenceCard, key);

  Selector.ship = key => valueByKey(Ship, key);

  Selector.shipAction = key => valueByKey(ShipAction, key);

  Selector.shipBase = key => valueByKey(ShipBase, key);

  Selector.source = key => valueByKey(Source, key);

  Selector.stat = key => valueByKey(Stat, key);

  Selector.token = key => valueByKey(Token, key);

  Selector.upgradeCard = key => valueByKey(UpgradeCard, key);

  Selector.upgradeSlot = key => valueByKey(UpgradeSlot, key);

  Object.freeze(Selector);

  exports.AttackDiceValue = AttackDiceValue;
  exports.ConditionCard = ConditionCard;
  exports.DamageCard = DamageCard;
  exports.DamageCardTFA = DamageCardTFA;
  exports.DamageType = DamageType;
  exports.DefenseDiceValue = DefenseDiceValue;
  exports.DiceModification = DiceModification;
  exports.EnumUtilities = EnumUtilities;
  exports.Faction = Faction;
  exports.FiringArc = FiringArc;
  exports.Maneuver = Maneuver;
  exports.ManeuverUtilities = ManeuverUtilities;
  exports.Phase = Phase;
  exports.PilotCard = PilotCard;
  exports.PlayFormat = PlayFormat;
  exports.Range = Range;
  exports.ReferenceCard = ReferenceCard;
  exports.Selector = Selector;
  exports.Ship = Ship;
  exports.ShipAction = ShipAction;
  exports.ShipBase = ShipBase;
  exports.Source = Source;
  exports.Stat = Stat;
  exports.StringUtilities = StringUtilities;
  exports.Token = Token;
  exports.UpgradeCard = UpgradeCard;
  exports.UpgradeSlot = UpgradeSlot;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
