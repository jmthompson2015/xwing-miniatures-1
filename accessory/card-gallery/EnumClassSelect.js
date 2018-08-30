const labelToEnumClass = {
  Damage: XMA.DamageCard,
  Pilot: XMA.PilotCard,
  Upgrade: XMA.UpgradeCard
};

class EnumClassSelect extends React.PureComponent {
  constructor(props) {
    super(props);

    const { initialSelectedValue } = this.props;

    this.state = {
      selectedValue: initialSelectedValue
    };

    this.handleChange = this.handleChangeFunction.bind(this);
  }

  handleChangeFunction(event) {
    const selectedValue = event.target.value;
    this.setState({
      selectedValue
    });
    const reduceFunction = (accum, label) =>
      label === selectedValue ? labelToEnumClass[label] : accum;
    const enumClass = R.reduce(reduceFunction, undefined, Object.keys(labelToEnumClass));
    const { onChange } = this.props;
    onChange(enumClass);
  }

  render() {
    const { selectedValue } = this.state;
    const mapFunction = label => ReactDOMFactories.option({ key: label }, label);
    const options = R.map(mapFunction, Object.keys(labelToEnumClass));

    return ReactDOMFactories.select(
      {
        value: selectedValue,
        onChange: this.handleChange
      },
      options
    );
  }
}

EnumClassSelect.propTypes = {
  onChange: PropTypes.func.isRequired,

  initialSelectedValue: PropTypes.string
};

EnumClassSelect.defaultProps = {
  initialSelectedValue: "Damage"
};

export default EnumClassSelect;
