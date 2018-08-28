import PilotUtils from "../PilotUtilities.js";
import ReactUtils from "../ReactUtilities.js";

import OptionPane from "./OptionPane.js";

const defenderInstancesForEach = (
  self,
  selectedWeaponKey,
  selectedDefenderId,
  rows
) => weaponKey => defenderInstance => {
  const input = ReactDOMFactories.input({
    key: 0,
    type: "radio",
    defaultChecked: weaponKey === selectedWeaponKey && defenderInstance.id === selectedDefenderId,
    onClick: self.selectionChanged,
    name: "weaponChooserRadioButtons",
    "data-weapon-key": weaponKey,
    "data-defender-id": defenderInstance.id
  });
  const span = ReactDOMFactories.span(
    {
      key: 1
    },
    PilotUtils.name(defenderInstance)
  );
  const label = ReactDOMFactories.label({}, input, " ", span);
  const cell = ReactUtils.createCell(label, undefined, "tl");
  rows.push(ReactUtils.createRow(cell, rows.length));
};

const rangeKeysForEach = (rows, defenderInstancesForEach2) => (
  weaponKey,
  rangeToDefenders
) => rangeKey => {
  const rangeName = XMA.Selector.range(rangeKey).name;

  const cell = ReactUtils.createCell(`Range ${rangeName}`, undefined, "bg-xw-medium");
  rows.push(ReactUtils.createRow(cell, rows.length));

  const defenderInstances = rangeToDefenders[rangeKey];

  R.forEach(defenderInstancesForEach2(weaponKey), defenderInstances);
};

const weaponKeysForEach = (weaponToRangeToDefenders, rows, rangeKeysForEach2) => weaponKey => {
  const weaponName =
    weaponKey === "primary" ? "Primary Weapon" : XMA.Selector.upgradeCard(weaponKey).name;

  const cell = ReactUtils.createCell(weaponName, undefined, "bg-xw-dark pv1 white");
  rows.push(ReactUtils.createRow(cell, rows.length));

  const rangeToDefenders = weaponToRangeToDefenders[weaponKey];
  const rangeKeys = Object.keys(rangeToDefenders);

  R.forEach(rangeKeysForEach2(weaponKey, rangeToDefenders), rangeKeys);
};

// /////////////////////////////////////////////////////////////////////////////////////////////////
class WeaponAndDefenderDialog extends React.Component {
  constructor(props) {
    super(props);

    let weaponKey;
    let defenderId;

    const { weaponToRangeToDefenders } = this.props;
    const weaponKeys = Object.keys(weaponToRangeToDefenders);

    if (weaponKeys.length > 0) {
      [weaponKey] = weaponKeys;
      const rangeToDefenders = weaponToRangeToDefenders[weaponKey];
      const rangeKeys = Object.keys(rangeToDefenders);

      if (rangeKeys.length > 0) {
        const rangeKey = rangeKeys[0];
        const defenders = rangeToDefenders[rangeKey];

        if (defenders.length > 0) {
          defenderId = defenders[0].id;
        }
      }
    }

    this.state = {
      weaponKey,
      defenderId
    };

    this.cancel = this.cancelFunction.bind(this);
    this.ok = this.okFunction.bind(this);
    this.selectionChanged = this.selectionChangedFunction.bind(this);
  }

  cancelFunction() {
    const { attackerInstance, callback } = this.props;
    callback({
      attackerId: attackerInstance.id
    });
  }

  okFunction() {
    const { attackerInstance, callback } = this.props;
    const { defenderId, weaponKey } = this.state;
    callback({
      attackerId: attackerInstance.id,
      weaponKey,
      defenderId
    });
  }

  selectionChangedFunction(event) {
    const { defenderId, weaponKey } = event.currentTarget.dataset;
    this.setState({
      weaponKey,
      defenderId
    });
  }

  render() {
    const { attackerInstance, weaponToRangeToDefenders } = this.props;
    const message = ReactDOMFactories.div({}, `Attacker: ${PilotUtils.name(attackerInstance)}`);
    const { defenderId: selectedDefenderId, weaponKey: selectedWeaponKey } = this.state;
    const self = this;
    const rows = [];
    const weaponKeys = Object.keys(weaponToRangeToDefenders);

    const myDefenderInstancesForEach = defenderInstancesForEach(
      self,
      selectedWeaponKey,
      selectedDefenderId,
      rows
    );
    const myRangeKeysForEach = rangeKeysForEach(rows, myDefenderInstancesForEach);
    const myWeaponKeysForEach = weaponKeysForEach(
      weaponToRangeToDefenders,
      rows,
      myRangeKeysForEach
    );
    R.forEach(myWeaponKeysForEach, weaponKeys);

    const initialInput = ReactUtils.createTable(rows, undefined, "f6");
    const cancelButton = ReactDOMFactories.button(
      {
        key: "cancelButton",
        onClick: self.cancel
      },
      "Cancel"
    );
    const okButton = ReactDOMFactories.button(
      {
        key: "okButton",
        onClick: self.ok
      },
      "OK"
    );
    const buttons = ReactDOMFactories.span({}, cancelButton, " ", okButton);

    return React.createElement(OptionPane, {
      panelClass: "optionPane",
      title: "Combat: Select Weapon and Defender",
      titleClass: "optionPaneTitle",
      message,
      messageClass: "optionPaneMessage",
      initialInput,
      buttons,
      buttonsClass: "optionPaneButtons"
    });
  }
}

WeaponAndDefenderDialog.propTypes = {
  attackerInstance: PropTypes.shape().isRequired,
  weaponToRangeToDefenders: PropTypes.arrayOf().isRequired,
  callback: PropTypes.func.isRequired
};

export default WeaponAndDefenderDialog;
