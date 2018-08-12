import PilotUtils from "../PilotUtilities.js";
import ReactUtils from "../ReactUtilities.js";

import OptionPane from "./OptionPane.js";

class WeaponAndDefenderDialog extends React.Component
{
   constructor(props)
   {
      super(props);

      let weaponKey;
      let defenderId;

      const weaponToRangeToDefenders = this.props.weaponToRangeToDefenders;
      const weaponKeys = Object.keys(weaponToRangeToDefenders);

      if (weaponKeys.length > 0)
      {
         weaponKey = weaponKeys[0];
         const rangeToDefenders = weaponToRangeToDefenders[weaponKey];
         const rangeKeys = Object.keys(rangeToDefenders);

         if (rangeKeys.length > 0)
         {
            const rangeKey = rangeKeys[0];
            const defenders = rangeToDefenders[rangeKey];

            if (defenders.length > 0)
            {
               defenderId = defenders[0].id;
            }
         }
      }

      this.state = {
         weaponKey: weaponKey,
         defenderId: defenderId
      };

      this.cancel = this.cancelFunction.bind(this);
      this.ok = this.okFunction.bind(this);
      this.selectionChanged = this.selectionChangedFunction.bind(this);
   }

   render()
   {
      const attackerInstance = this.props.attackerInstance;
      const message = ReactDOMFactories.div(
      {}, "Attacker: " + PilotUtils.name(attackerInstance));
      const selectedWeaponKey = this.state.weaponKey;
      const selectedDefenderId = this.state.defenderId;
      const weaponToRangeToDefenders = this.props.weaponToRangeToDefenders;
      const self = this;
      const rows = [];
      const weaponKeys = Object.keys(weaponToRangeToDefenders);

      const myDefenderInstancesForEach = defenderInstancesForEach(self, selectedWeaponKey, selectedDefenderId, rows);
      const myRangeKeysForEach = rangeKeysForEach(rows, myDefenderInstancesForEach);
      const myWeaponKeysForEach = weaponKeysForEach(weaponToRangeToDefenders, rows, myRangeKeysForEach);
      R.forEach(myWeaponKeysForEach, weaponKeys);

      const initialInput = ReactUtils.createTable(rows, undefined, "f6");
      const cancelButton = ReactDOMFactories.button(
      {
         key: "cancelButton",
         onClick: self.cancel
      }, "Cancel");
      const okButton = ReactDOMFactories.button(
      {
         key: "okButton",
         onClick: self.ok
      }, "OK");
      const buttons = ReactDOMFactories.span(
      {}, cancelButton, " ", okButton);

      return React.createElement(OptionPane,
      {
         panelClass: "optionPane",
         title: "Combat: Select Weapon and Defender",
         titleClass: "optionPaneTitle",
         message: message,
         messageClass: "optionPaneMessage",
         initialInput: initialInput,
         buttons: buttons,
         buttonsClass: "optionPaneButtons"
      });
   }
}

WeaponAndDefenderDialog.prototype.cancelFunction = function()
{
   // console.log("cancel()");
   this.props.callback(
   {
      attackerId: this.props.attackerInstance.id
   });
};

WeaponAndDefenderDialog.prototype.okFunction = function()
{
   // console.log("ok() attackerId = " + this.props.attackerInstance.id + " weaponKey = " + this.state.weaponKey + " defenderId = " + this.state.defenderId);
   this.props.callback(
   {
      attackerId: this.props.attackerInstance.id,
      weaponKey: this.state.weaponKey,
      defenderId: this.state.defenderId
   });
};

WeaponAndDefenderDialog.prototype.selectionChangedFunction = function(event)
{
   const weaponKey = event.currentTarget.dataset.weaponKey;
   const defenderId = event.currentTarget.dataset.defenderId;
   // console.log("selectionChanged() weaponKey = " + weaponKey + " defenderId = " + defenderId);
   this.setState(
   {
      weaponKey: weaponKey,
      defenderId: defenderId
   });
};

////////////////////////////////////////////////////////////////////////////////
const defenderInstancesForEach = (self, selectedWeaponKey, selectedDefenderId, rows) => weaponKey => defenderInstance =>
{
   const input = ReactDOMFactories.input(
   {
      key: 0,
      type: "radio",
      defaultChecked: (weaponKey === selectedWeaponKey && defenderInstance.id === selectedDefenderId),
      onClick: self.selectionChanged,
      name: "weaponChooserRadioButtons",
      "data-weapon-key": weaponKey,
      "data-defender-id": defenderInstance.id
   });
   const span = ReactDOMFactories.span(
   {
      key: 1
   }, PilotUtils.name(defenderInstance));
   const label = ReactDOMFactories.label(
   {}, input, " ", span);
   const cell = ReactUtils.createCell(label, undefined, "tl");
   rows.push(ReactUtils.createRow(cell, rows.length));
};

const rangeKeysForEach = (rows, defenderInstancesForEach) => (weaponKey, rangeToDefenders) => rangeKey =>
{
   const rangeName = XMA.Selector.range(rangeKey).name;

   const cell = ReactUtils.createCell("Range " + rangeName, undefined, "bg-xw-medium");
   rows.push(ReactUtils.createRow(cell, rows.length));

   const defenderInstances = rangeToDefenders[rangeKey];

   R.forEach(defenderInstancesForEach(weaponKey), defenderInstances);
};

const weaponKeysForEach = (weaponToRangeToDefenders, rows, rangeKeysForEach) => weaponKey =>
{
   const weaponName = (weaponKey === "primary" ? "Primary Weapon" : XMA.Selector.upgradeCard(weaponKey).name);

   const cell = ReactUtils.createCell(weaponName, undefined, "bg-xw-dark pv1 white");
   rows.push(ReactUtils.createRow(cell, rows.length));

   const rangeToDefenders = weaponToRangeToDefenders[weaponKey];
   const rangeKeys = Object.keys(rangeToDefenders);

   R.forEach(rangeKeysForEach(weaponKey, rangeToDefenders), rangeKeys);
};

WeaponAndDefenderDialog.propTypes = {
   attackerInstance: PropTypes.object.isRequired,
   weaponToRangeToDefenders: PropTypes.array.isRequired,
   callback: PropTypes.func.isRequired
};

export default WeaponAndDefenderDialog;