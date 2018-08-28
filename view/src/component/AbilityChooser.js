import ReactUtils from "../ReactUtilities.js";

import EntityUI from "./EntityUI.js";

const labelFunction = ability =>
  React.createElement(EntityUI, { sourceName: ability.sourceName, sourceKey: ability.sourceKey });

class AbilityChooser extends React.Component {
  constructor(props) {
    super(props);

    const { initialAbility } = this.props;

    this.state = {
      selected: initialAbility
    };

    this.handleChange = this.handleChangeFunction.bind(this);
  }

  handleChangeFunction(event) {
    const { id } = event.target;
    const { abilities, onChange } = this.props;
    const selected = abilities[id];

    this.setState(
      {
        selected
      },
      onChange(selected)
    );
  }

  render() {
    const { abilities, clientProps, panelClass } = this.props;
    const inputProps = R.merge(
      {
        name: "chooseAbility", // needed for radio
        onChange: this.handleChange,
        type: "radio"
      },
      clientProps
    );

    let i = 0;
    const { selected } = this.state;
    const mapFunction = ability => {
      const input = ReactDOMFactories.input(
        R.merge(inputProps, {
          id: i,
          defaultChecked: ability === selected
        })
      );
      const label = labelFunction(ability);
      const cells = [];
      cells.push(ReactUtils.createCell(input, cells.length, "pa1 v-mid"));
      cells.push(ReactUtils.createCell(label, cells.length, "pa1 v-mid"));

      i += 1;
      return ReactUtils.createRow(cells, `row${ability.sourceName}${ability.sourceKey}${i}`);
    };
    const rows = R.map(mapFunction, abilities);

    return ReactUtils.createTable(rows, undefined, panelClass);
  }
}

AbilityChooser.propTypes = {
  onChange: PropTypes.func.isRequired,
  abilities: PropTypes.arrayOf().isRequired,

  clientProps: PropTypes.shape(),
  initialAbility: PropTypes.shape(),
  panelClass: PropTypes.string
};

AbilityChooser.defaultProps = {
  clientProps: {},
  initialAbility: undefined,
  panelClass: "bg-xw-light f6"
};

export default AbilityChooser;
