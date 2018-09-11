import CardInstanceUI from "./CardInstanceUI.js";
import ReactUtilities from "../ReactUtilities.js";

class PilotsUI extends React.PureComponent {
  render() {
    const { pilotInstances, pilotToDamages, pilotToUpgrades } = this.props;

    const pilotCells = pilotInstances.map((pilotInstance, i) => {
      const element = React.createElement(CardInstanceUI, {
        cardInstance: pilotInstance,
        damageInstances: pilotToDamages[pilotInstance.id],
        statBonuses: pilotInstance.statBonuses,
        tokenCounts: pilotInstance.tokenCounts,
        upgradeInstances: pilotToUpgrades[pilotInstance.id]
      });
      return ReactUtilities.createCell(element, `pilotCell${i}`, "alignTop v-top");
    });

    const row = ReactUtilities.createRow(pilotCells);

    return ReactUtilities.createTable(row, "pilotsUITable", "center");
  }
}

PilotsUI.propTypes = {
  pilotInstances: PropTypes.arrayOf().isRequired,

  pilotToDamages: PropTypes.shape(),
  pilotToUpgrades: PropTypes.shape()
};

PilotsUI.defaultProps = {
  pilotToDamages: {},
  pilotToUpgrades: {}
};

export default PilotsUI;
