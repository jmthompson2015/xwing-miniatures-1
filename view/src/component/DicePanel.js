import Endpoint from "../Endpoint.js";
import ReactUtils from "../ReactUtilities.js";

const diceKeyToValue = enumClass =>
  enumClass === XMA.AttackDiceValue ? XMA.Selector.attackDiceValue : XMA.Selector.defenseDiceValue;

const sortDiceValues = R.sortBy(R.prop("sortOrder"));

const createImage = (enumClass, diceKey) => {
  const diceValue = diceKeyToValue(enumClass)(diceKey);
  const source = Endpoint.ARTIFACT_RESOURCE + diceValue.image;

  return ReactUtils.createImg(source, undefined, undefined, {
    width: 32
  });
};

const diceKeysToValues = enumClass => R.map(diceKeyToValue(enumClass));

const diceValuesToKeys = R.map(value => value.key);

const sortDiceKeys = enumClass => diceKeys =>
  R.pipe(
    diceKeysToValues(enumClass),
    sortDiceValues,
    diceValuesToKeys
  )(diceKeys);

// /////////////////////////////////////////////////////////////////////////////////////////////////
class DicePanel extends React.Component {
  render() {
    const { diceKeys, enumClass } = this.props;
    const sortedKeys = sortDiceKeys(enumClass)(diceKeys);
    let count = 0;
    const mapFunction = diceKey => {
      count += 1;
      return ReactUtils.createCell(createImage(enumClass, diceKey), count, "pa1");
    };
    const cells = R.map(mapFunction, sortedKeys);

    const row = ReactUtils.createRow(cells);

    return ReactUtils.createTable(row, undefined, "center");
  }
}

DicePanel.propTypes = {
  enumClass: PropTypes.shape().isRequired,

  diceKeys: PropTypes.shape()
};

DicePanel.defaultProps = {
  diceKeys: []
};

export default DicePanel;
