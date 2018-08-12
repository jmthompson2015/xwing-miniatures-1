import ReactUtils from "../ReactUtilities.js";

import ShipActionUI from "./ShipActionUI.js";

const shipActions = XMA.Selector.enumValues(XMA.ShipAction);
const className = "ba bg-near-white f6 tl v-mid";

const rows = R.map(shipAction =>
{
   const image0 = React.createElement(ShipActionUI,
   {
      shipAction: shipAction
   });
   const image1 = React.createElement(ShipActionUI,
   {
      shipAction: shipAction,
      showLabel: true
   });

   const cells = [];
   cells.push(ReactUtils.createCell(image0, cells.length, className));
   cells.push(ReactUtils.createCell(image1, cells.length, className));

   return ReactUtils.createRow(cells, shipAction.name);
})(shipActions);

const table = ReactUtils.createTable(rows);

ReactDOM.render(table, document.getElementById("panel"));