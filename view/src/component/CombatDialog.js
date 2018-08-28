import ReactUtils from "../ReactUtilities.js";

import CombatDamageUI from "./CombatDamageUI.js";
import CombatModifyAttackUI from "./CombatModifyAttackUI.js";
import CombatModifyDefenseUI from "./CombatModifyDefenseUI.js";
import DicePanel from "./DicePanel.js";
import OptionPane from "./OptionPane.js";

const { Phase } = XMA;

const PHASE_TO_TITLE = {
  [Phase.COMBAT_MODIFY_ATTACK_DICE]: "Modify Attack Dice",
  [Phase.COMBAT_MODIFY_DEFENSE_DICE]: "Modify Defense Dice",
  [Phase.COMBAT_NOTIFY_DAMAGE]: "Deal Damage"
};

class CombatDialog extends React.Component {
  constructor(props) {
    super(props);

    this.ok = this.okFunction.bind(this);
  }

  okFunction(ability) {
    let answer;

    if (ability && ability.sourceName) {
      answer = ability;
    }

    const { okFunction: myOkFunction } = this.props;
    myOkFunction(answer);
  }

  render() {
    const {
      abilities,
      attackerInstance,
      combatInstance,
      defenderInstance,
      phaseKey,
      resourceBase
    } = this.props;

    const attackerCard = XMA.Selector.pilotCard(attackerInstance.pilotKey);
    const defenderCard = XMA.Selector.pilotCard(defenderInstance.pilotKey);
    const weaponValue =
      combatInstance.weaponKey === "primary"
        ? {
            name: "Primary Weapon"
          }
        : XMA.Selector.upgradeCard(combatInstance.weaponKey);

    const rows = [];

    // Attacker label.
    const cell0 = ReactUtils.createCell(ReactUtils.createSpan(`Attacker: ${attackerCard.name}`));
    rows.push(ReactUtils.createRow(cell0, rows.length));

    // Weapon label.
    const cell1 = ReactUtils.createCell(ReactUtils.createSpan(`Weapon: ${weaponValue.name}`));
    rows.push(ReactUtils.createRow(cell1, rows.length));

    // Attack Dice panel.
    const attackPanel = React.createElement(DicePanel, {
      enumClass: XMA.AttackDiceValue,
      diceKeys: combatInstance.attackDiceKeys
    });
    const cell2 = ReactUtils.createCell(attackPanel);
    rows.push(ReactUtils.createRow(cell2, rows.length));

    if (phaseKey === Phase.COMBAT_MODIFY_ATTACK_DICE && abilities.length > 0) {
      // Modify Attack Dice panel.
      const modifyAttackPanel = React.createElement(CombatModifyAttackUI, {
        attacker: attackerInstance,
        resourceBase,
        abilities,
        onChange: this.ok
      });

      const cell3 = ReactUtils.createCell(modifyAttackPanel);
      rows.push(ReactUtils.createRow(cell3, rows.length));
    }

    // Defender label.
    const cell4 = ReactUtils.createCell(ReactUtils.createSpan(`Defender: ${defenderCard.name}`));
    rows.push(ReactUtils.createRow(cell4, rows.length));

    if (combatInstance.defenseDiceKeys.length > 0) {
      // Defense Dice panel.
      const defensePanel = React.createElement(DicePanel, {
        enumClass: XMA.DefenseDiceValue,
        diceKeys: combatInstance.defenseDiceKeys
      });

      const cell5 = ReactUtils.createCell(defensePanel);
      rows.push(ReactUtils.createRow(cell5, rows.length));

      if (phaseKey === Phase.COMBAT_MODIFY_DEFENSE_DICE && abilities.length > 0) {
        // Modify Defense Dice panel.
        const modifyDefensePanel = React.createElement(CombatModifyDefenseUI, {
          defender: defenderInstance,
          resourceBase,
          abilities,
          onChange: this.ok
        });

        const cell6 = ReactUtils.createCell(modifyDefensePanel);
        rows.push(ReactUtils.createRow(cell6, rows.length));
      }
    }

    if (phaseKey === Phase.COMBAT_NOTIFY_DAMAGE) {
      // Damage panel.
      const damagePanel = React.createElement(CombatDamageUI, {
        criticalDamage: combatInstance.criticalDamage,
        hitDamage: combatInstance.hitDamage,
        shieldDamage: combatInstance.shieldDamage
      });

      const cell7 = ReactUtils.createCell(damagePanel);
      rows.push(ReactUtils.createRow(cell7, rows.length));
    }

    const message = ReactUtils.createTable(rows, "combatDialogTable", "center");
    const okButton = ReactUtils.createButton("OK", "okButton", undefined, {
      onClick: this.ok
    });
    const buttons = ReactUtils.createSpan([okButton]);

    return React.createElement(OptionPane, {
      title: `Combat: ${PHASE_TO_TITLE[phaseKey]}`,
      message,
      buttons
    });
  }
}

CombatDialog.propTypes = {
  combatInstance: PropTypes.shape().isRequired,
  attackerInstance: PropTypes.shape().isRequired,
  defenderInstance: PropTypes.shape().isRequired,
  okFunction: PropTypes.func.isRequired,
  phaseKey: PropTypes.string.isRequired,

  abilities: PropTypes.arrayOf(),
  resourceBase: PropTypes.string
};

CombatDialog.defaultProps = {
  abilities: [],
  resourceBase: undefined
};

export default CombatDialog;
