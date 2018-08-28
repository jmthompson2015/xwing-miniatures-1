/* eslint no-console: ["error", { allow: ["log"] }] */

import AbilityChooser from "./AbilityChooser.js";
import OptionPane from "./OptionPane.js";

class AbilityDialog extends React.Component {
  constructor(props) {
    super(props);

    this.myOnChange = this.myOnChangeFunction.bind(this);
    this.ok = this.okFunction.bind(this);
  }

  myOnChangeFunction(selected) {
    console.log(
      `AbilityDialog.myOnChange() selected = ${JSON.stringify(selected)} ${typeof selected}`
    );

    const { onChange } = this.props;
    onChange(selected);
  }

  okFunction() {
    const isAccepted = false;
    const { onChange } = this.props;
    onChange(undefined, undefined, undefined, isAccepted);
  }

  render() {
    const { abilities, activePilotName } = this.props;
    const message = `Active Ship: ${activePilotName}`;
    const okButton = ReactDOMFactories.button(
      {
        key: 0,
        onClick: this.ok
      },
      "Pass"
    );
    const buttons = ReactDOMFactories.span({}, [okButton]);

    const initialInput = React.createElement(AbilityChooser, {
      abilities,
      onChange: this.myOnChange
    });

    const title = "Select Ability";

    return React.createElement(OptionPane, {
      panelClass: "optionPane bg-xw-light",
      title,
      titleClass: "optionPaneTitle bg-moon-gray",
      message,
      messageClass: "combatMessage",
      initialInput,
      buttons,
      buttonsClass: "optionPaneButtons pa2 tr"
    });
  }
}

AbilityDialog.propTypes = {
  abilities: PropTypes.arrayOf().isRequired,
  activePilotName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default AbilityDialog;
