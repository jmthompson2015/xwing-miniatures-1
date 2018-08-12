import Endpoint from "../Endpoint.js";
import ReactUtils from "../ReactUtilities.js";

class DicePanel extends React.Component
{
   render()
   {
      const enumClass = this.props.enumClass;
      const diceKeys = this.props.diceKeys;
      const sortedKeys = sortDiceKeys(enumClass)(diceKeys);
      let count = 0;
      const mapFunction = diceKey => ReactUtils.createCell(createImage(enumClass, diceKey), count++, "pa1");
      const cells = R.map(mapFunction, sortedKeys);

      const row = ReactUtils.createRow(cells);

      return ReactUtils.createTable(row, undefined, "center");
   }
}

const createImage = function(enumClass, diceKey)
{
   const diceValue = diceKeyToValue(enumClass)(diceKey);
   const source = Endpoint.ARTIFACT_RESOURCE + diceValue.image;

   return ReactUtils.createImg(source, undefined, undefined,
   {
      width: 32
   });
};

const diceKeyToValue = enumClass => (enumClass === XMA.AttackDiceValue ? XMA.Selector.attackDiceValue : XMA.Selector.defenseDiceValue);

const diceKeysToValues = enumClass => R.map(diceKeyToValue(enumClass));

const diceValuesToKeys = R.map(value => value.key);

const sortDiceKeys = enumClass => diceKeys => R.pipe(diceKeysToValues(enumClass), sortDiceValues, diceValuesToKeys)(diceKeys);

const sortDiceValues = R.sortBy(R.prop("sortOrder"));

DicePanel.propTypes = {
   enumClass: PropTypes.object.isRequired,

   diceKeys: PropTypes.object
};

DicePanel.defaultProps = {
   diceKeys: []
};

export default DicePanel;