import CardInstanceUI from "./CardInstanceUI.js";
import ReactUtilities from "../ReactUtilities.js";

const PilotsUI = props =>
{
   const pilotInstances = props.pilotInstances;

   const pilotCells = pilotInstances.map(function(pilotInstance, i)
   {
      const element = React.createElement(CardInstanceUI,
      {
         cardInstance: pilotInstance,
         damageInstances: props.pilotToDamages[pilotInstance.id],
         statBonuses: props.pilotToStatBonuses[pilotInstance.id],
         tokenCounts: props.pilotToTokenCounts[pilotInstance.id],
         upgradeInstances: props.pilotToUpgrades[pilotInstance.id]
      });
      return ReactUtilities.createCell(element, "pilotCell" + i, "alignTop v-top");
   });

   const row = ReactUtilities.createRow(pilotCells);

   return ReactUtilities.createTable(row, "pilotsUITable", "center");
};

PilotsUI.propTypes = {
   pilotInstances: PropTypes.array.isRequired,

   pilotToDamages: PropTypes.object,
   pilotToStatBonuses: PropTypes.object,
   pilotToTokenCounts: PropTypes.object,
   pilotToUpgrades: PropTypes.object
};

PilotsUI.defaultProps = {
   pilotToDamages:
   {},
   pilotToStatBonuses:
   {},
   pilotToTokenCounts:
   {},
   pilotToUpgrades:
   {}
};

export default PilotsUI;