/* eslint no-console: ["error", { allow: ["log"] }] */

import AbilityChooser from "./AbilityChooser.js";

class CombatModifyDefenseUI extends React.Component {
  constructor(props) {
    super(props);

    this.myOnChange = this.myOnChangeFunction.bind(this);
  }

  myOnChangeFunction(selected) {
    console.log(
      `CombatModifyDefenseUI.myOnChange() selected = ${JSON.stringify(selected)} ${typeof selected}`
    );
    const { onChange } = this.props;
    onChange(selected);
  }

  render() {
    const { abilities } = this.props;

    return React.createElement(AbilityChooser, {
      abilities,
      onChange: this.myOnChange
    });
  }
}

CombatModifyDefenseUI.propTypes = {
  abilities: PropTypes.arrayOf().isRequired,
  onChange: PropTypes.func.isRequired
};

export default CombatModifyDefenseUI;
