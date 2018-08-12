const AgentQueryType = {

   CHOOSE_ATTACK_DICE_MODIFICATION: "chooseAttackDiceModification",
   CHOOSE_DEFENSE_DICE_MODIFICATION: "chooseDefenseDiceModification",
   CHOOSE_MANEUVERS: "chooseManeuvers",
   CHOOSE_SHIP_ACTION: "chooseShipAction",
   CHOOSE_WEAPON_AND_DEFENDER: "chooseWeaponAndDefender",
   NOTIFY_DAMAGE: "notifyDamage"
};

AgentQueryType.properties = {
   "chooseAttackDiceModification":
   {
      "name": "Choose Attack Dice Modification",
      "key": "chooseAttackDiceModification"
   },
   "chooseDefenseDiceModification":
   {
      "name": "Choose Defense Dice Modification",
      "key": "chooseDefenseDiceModification"
   },
   "chooseManeuvers":
   {
      "name": "Choose Maneuvers",
      "key": "chooseManeuvers"
   },
   "chooseShipAction":
   {
      "name": "Choose Ship Action",
      "key": "chooseShipAction"
   },
   "chooseWeaponAndDefender":
   {
      "name": "Choose Weapon and Defender",
      "key": "chooseWeaponAndDefender"
   },
   "notifyDamage":
   {
      "name": "Notify Damage",
      "key": "notifyDamage"
   }
};

Object.freeze(AgentQueryType);

export default AgentQueryType;