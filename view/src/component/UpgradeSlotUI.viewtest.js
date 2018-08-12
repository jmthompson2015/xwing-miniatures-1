import ReactUtilities from "../ReactUtilities.js";
import UpgradeSlotUI from "./UpgradeSlotUI.js";

const values = XMA.EnumUtilities.values(XMA.UpgradeSlot);
const className = "ba b--silver bg-near-white f6 pa1 tl";
const rows = [];

values.forEach(function(upgradeSlot)
{
   const image0 = React.createElement(UpgradeSlotUI,
   {
      upgradeSlot: upgradeSlot
   });

   const image1 = React.createElement(UpgradeSlotUI,
   {
      upgradeSlot: upgradeSlot,
      showLabel: true
   });

   const cell0 = ReactUtilities.createCell(image0, "standard", className);
   const cell1 = ReactUtilities.createCell(image1, "standard+name", className);
   const cells = [cell0, cell1];
   rows.push(ReactUtilities.createRow(cells, rows.length));
});

ReactDOM.render(ReactUtilities.createTable(rows), document.getElementById("upgradeSlotPanel"));