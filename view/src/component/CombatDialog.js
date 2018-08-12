import Endpoint from "../Endpoint.js";
import ReactUtils from "../ReactUtilities.js";

import AbilityChooser from "./AbilityChooser.js";
import DicePanel from "./DicePanel.js";
import OptionPane from "./OptionPane.js";

const Phase = XMA.Phase;

class CombatDialog extends React.Component
{
   constructor(props)
   {
      super(props);

      this.ok = this.okFunction.bind(this);
   }

   render()
   {
      const phaseKey = this.props.phaseKey;
      const combatInstance = this.props.combatInstance;
      const attackerInstance = this.props.attackerInstance;
      const defenderInstance = this.props.defenderInstance;
      const abilities = this.props.abilities;

      const attackerCard = XMA.Selector.pilotCard(attackerInstance.pilotKey);
      const defenderCard = XMA.Selector.pilotCard(defenderInstance.pilotKey);
      const weaponValue = (combatInstance.weaponKey === "primary" ?
      {
         name: "Primary Weapon"
      } : XMA.Selector.upgradeCard(combatInstance.weaponKey));

      const rows = [];

      // Attacker label.
      const cell0 = ReactUtils.createCell(ReactUtils.createSpan("Attacker: " + attackerCard.name));
      rows.push(ReactUtils.createRow(cell0, rows.length));

      // Weapon label.
      const cell1 = ReactUtils.createCell(ReactUtils.createSpan("Weapon: " + weaponValue.name));
      rows.push(ReactUtils.createRow(cell1, rows.length));

      // Attack Dice panel.
      const attackPanel = React.createElement(DicePanel,
      {
         enumClass: XMA.AttackDiceValue,
         diceKeys: combatInstance.attackDiceKeys,
      });
      const cell2 = ReactUtils.createCell(attackPanel);
      rows.push(ReactUtils.createRow(cell2, rows.length));

      if (phaseKey === Phase.COMBAT_MODIFY_ATTACK_DICE && abilities.length > 0)
      {
         // Modify Attack Dice panel.
         const modifyAttackPanel = React.createElement(CombatDialog.ModifyAttackUI,
         {
            attacker: attackerInstance,
            resourceBase: this.props.resourceBase,
            abilities: abilities,
            onChange: this.ok,
         });

         const cell3 = ReactUtils.createCell(modifyAttackPanel);
         rows.push(ReactUtils.createRow(cell3, rows.length));
      }

      // Defender label.
      const cell4 = ReactUtils.createCell(ReactUtils.createSpan("Defender: " + defenderCard.name));
      rows.push(ReactUtils.createRow(cell4, rows.length));

      if (combatInstance.defenseDiceKeys.length > 0)
      {
         // Defense Dice panel.
         const defensePanel = React.createElement(DicePanel,
         {
            enumClass: XMA.DefenseDiceValue,
            diceKeys: combatInstance.defenseDiceKeys,
         });

         const cell5 = ReactUtils.createCell(defensePanel);
         rows.push(ReactUtils.createRow(cell5, rows.length));

         if (phaseKey === Phase.COMBAT_MODIFY_DEFENSE_DICE && abilities.length > 0)
         {
            // Modify Defense Dice panel.
            const modifyDefensePanel = React.createElement(CombatDialog.ModifyDefenseUI,
            {
               defender: defenderInstance,
               resourceBase: this.props.resourceBase,
               abilities: abilities,
               onChange: this.ok,
            });

            const cell6 = ReactUtils.createCell(modifyDefensePanel);
            rows.push(ReactUtils.createRow(cell6, rows.length));
         }
      }

      if (phaseKey === Phase.COMBAT_NOTIFY_DAMAGE)
      {
         // Damage panel.
         const damagePanel = React.createElement(CombatDialog.DamageUI,
         {
            criticalDamage: combatInstance.criticalDamage,
            hitDamage: combatInstance.hitDamage,
            shieldDamage: combatInstance.shieldDamage
         });

         const cell7 = ReactUtils.createCell(damagePanel);
         rows.push(ReactUtils.createRow(cell7, rows.length));
      }

      const message = ReactUtils.createTable(rows, "combatDialogTable", "center");
      const okButton = ReactUtils.createButton("OK", "okButton", undefined,
      {
         onClick: this.ok
      });
      const buttons = ReactUtils.createSpan([okButton]);

      return React.createElement(OptionPane,
      {
         title: "Combat: " + PHASE_TO_TITLE[phaseKey],
         message: message,
         buttons: buttons,
      });
   }
}

CombatDialog.prototype.okFunction = function(ability)
{
   let answer;

   if (ability && ability.sourceName)
   {
      answer = ability;
   }

   const myOkFunction = this.props.okFunction;
   myOkFunction(answer);
};

class ModifyAttackUI extends React.Component
{
   constructor(props)
   {
      super(props);

      this.myOnChange = this.myOnChangeFunction.bind(this);
   }

   render()
   {
      const abilities = this.props.abilities;

      return React.createElement(AbilityChooser,
      {
         abilities: abilities,
         onChange: this.myOnChange
      });
   }
}

ModifyAttackUI.prototype.myOnChangeFunction = function(selected)
{
   console.log("ModifyAttackUI.myOnChange() selected = " + JSON.stringify(selected) + " " + (typeof selected));
   this.props.onChange(selected);
};

ModifyAttackUI.propTypes = {
   abilities: PropTypes.array.isRequired,
   onChange: PropTypes.func.isRequired
};

CombatDialog.ModifyAttackUI = ModifyAttackUI;

class ModifyDefenseUI extends React.Component
{
   constructor(props)
   {
      super(props);

      this.myOnChange = this.myOnChangeFunction.bind(this);
   }

   render()
   {
      const abilities = this.props.abilities;

      return React.createElement(AbilityChooser,
      {
         abilities: abilities,
         onChange: this.myOnChange
      });
   }
}

ModifyDefenseUI.prototype.myOnChangeFunction = function(selected)
{
   console.log("ModifyDefenseUI.myOnChange() selected = " + JSON.stringify(selected) + " " + (typeof selected));
   this.props.onChange(selected);
};

ModifyDefenseUI.propTypes = {
   abilities: PropTypes.array.isRequired,
   onChange: PropTypes.func.isRequired,
};

CombatDialog.ModifyDefenseUI = ModifyDefenseUI;

/*
 * Provides a user interface for damage.
 */
class DamageUI extends React.Component
{
   render()
   {
      const shieldDamage = this.props.shieldDamage;
      const shieldImage = ReactDOMFactories.span(
      {
         className: "f4 xw-cyan",
      }, ReactDOMFactories.i(
      {
         className: "xwing-miniatures-font xwing-miniatures-font-shield",
      }));

      const hitDamage = this.props.hitDamage;
      const hitFilename = Endpoint.ARTIFACT_RESOURCE + "token/damage.png";
      const hitImage = ReactUtils.createImg(hitFilename, undefined, "pa1 v-mid",
      {
         title: "Damage",
         width: 32
      });

      const criticalDamage = this.props.criticalDamage;
      const criticalFilename = Endpoint.ARTIFACT_RESOURCE + "token/critical-damage.png";
      const criticalImage = ReactUtils.createImg(criticalFilename, undefined, "pa1 v-mid",
      {
         title: "Critical Damage",
         width: 32
      });

      const cells = [];
      cells.push(ReactUtils.createCell(ReactUtils.createSpan("Damage: "), cells.length));
      cells.push(ReactUtils.createCell(shieldImage, cells.length, "pa1 v-mid"));
      cells.push(ReactUtils.createCell(ReactUtils.createSpan(shieldDamage), cells.length, "v-mid"));
      cells.push(ReactUtils.createCell(hitImage, cells.length));
      cells.push(ReactUtils.createCell(ReactUtils.createSpan(hitDamage), cells.length, "v-mid"));
      cells.push(ReactUtils.createCell(criticalImage, cells.length));
      cells.push(ReactUtils.createCell(ReactUtils.createSpan(criticalDamage), cells.length, "v-mid"));

      return ReactUtils.createTable(ReactUtils.createRow(cells), "damageTable", "center");
   }
}

DamageUI.propTypes = {
   criticalDamage: PropTypes.number.isRequired,
   hitDamage: PropTypes.number.isRequired,
   shieldDamage: PropTypes.number.isRequired
};

CombatDialog.DamageUI = DamageUI;

const PHASE_TO_TITLE = {
  [Phase.COMBAT_MODIFY_ATTACK_DICE]: "Modify Attack Dice",
  [Phase.COMBAT_MODIFY_DEFENSE_DICE]: "Modify Defense Dice",
  [Phase.COMBAT_NOTIFY_DAMAGE]: "Deal Damage"
};

CombatDialog.propTypes = {
   combatInstance: PropTypes.object.isRequired,
   attackerInstance: PropTypes.object.isRequired,
   defenderInstance: PropTypes.object.isRequired,
   okFunction: PropTypes.func.isRequired,
   phaseKey: PropTypes.string.isRequired,

   abilities: PropTypes.array,
};

CombatDialog.defaultProps = {
   abilities: []
};

export default CombatDialog;