import Endpoint from "../Endpoint.js";
import ReactUtils from "../ReactUtilities.js";

/*
 * Provides a user interface for damage.
 */
class CombatDamageUI extends React.Component {
  render() {
    const { criticalDamage, hitDamage, shieldDamage } = this.props;
    const shieldImage = ReactDOMFactories.span(
      {
        className: "f4 xw-cyan"
      },
      ReactDOMFactories.i({
        className: "xwing-miniatures-font xwing-miniatures-font-shield"
      })
    );

    const hitFilename = `${Endpoint.ARTIFACT_RESOURCE}token/damage.png`;
    const hitImage = ReactUtils.createImg(hitFilename, undefined, "pa1 v-mid", {
      title: "Damage",
      width: 32
    });

    const criticalFilename = `${Endpoint.ARTIFACT_RESOURCE}token/critical-damage.png`;
    const criticalImage = ReactUtils.createImg(criticalFilename, undefined, "pa1 v-mid", {
      title: "Critical Damage",
      width: 32
    });

    const cells = [];
    cells.push(ReactUtils.createCell(ReactUtils.createSpan("Damage: "), cells.length));
    cells.push(ReactUtils.createCell(shieldImage, cells.length, "pa1 v-mid"));
    cells.push(ReactUtils.createCell(ReactUtils.createSpan(shieldDamage), cells.length, "v-mid"));
    cells.push(ReactUtils.createCell(hitImage, cells.length));
    cells.push(ReactUtils.createCell(ReactUtils.createSpan(hitDamage), cells.length, "v-mid"));
    cells.push(ReactUtils.createCell(criticalImage, cells.length));
    cells.push(ReactUtils.createCell(ReactUtils.createSpan(criticalDamage), cells.length, "v-mid"));

    return ReactUtils.createTable(ReactUtils.createRow(cells), "damageTable", "center");
  }
}

CombatDamageUI.propTypes = {
  criticalDamage: PropTypes.number.isRequired,
  hitDamage: PropTypes.number.isRequired,
  shieldDamage: PropTypes.number.isRequired
};

export default CombatDamageUI;
