import AbilityChooser from "./AbilityChooser.js";
import OptionPane from "./OptionPane.js";

class AbilityDialog extends React.Component
{
   constructor(props)
   {
      super(props);

      this.myOnChange = this.myOnChangeFunction.bind(this);
      this.ok = this.okFunction.bind(this);
   }

   render()
   {
      const activePilotName = this.props.activePilotName;
      const message = "Active Ship: " + activePilotName;
      const okButton = ReactDOMFactories.button(
      {
         key: 0,
         onClick: this.ok,
      }, "Pass");
      const buttons = ReactDOMFactories.span(
      {}, [okButton]);

      const initialInput = React.createElement(AbilityChooser,
      {
         abilities: this.props.abilities,
         onChange: this.myOnChange,
      });

      const title = "Select Ability";

      return React.createElement(OptionPane,
      {
         panelClass: "optionPane bg-xw-light",
         title: title,
         titleClass: "optionPaneTitle bg-moon-gray",
         message: message,
         messageClass: "combatMessage",
         initialInput: initialInput,
         buttons: buttons,
         buttonsClass: "optionPaneButtons pa2 tr",
      });
   }
}

AbilityDialog.prototype.myOnChangeFunction = function(selected)
{
   console.log("AbilityDialog.myOnChange() selected = " + JSON.stringify(selected) + " " + (typeof selected));

   this.props.onChange(selected);
};

AbilityDialog.prototype.okFunction = function()
{
   const isAccepted = false;
   this.props.onChange(undefined, undefined, undefined, isAccepted);
};

AbilityDialog.propTypes = {
   abilities: PropTypes.array.isRequired,
   activePilotName: PropTypes.string.isRequired,
   onChange: PropTypes.func.isRequired
};

export default AbilityDialog;