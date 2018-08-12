import ReactUtils from "../ReactUtilities.js";

import ShipSilhouetteUI from "./ShipSilhouetteUI.js";

const Ship = XMA.Ship;

const className0 = "ba bg-near-white tl";
const className1 = "ba bg-near-white f6 tl";
const ships = XMA.Selector.enumValues(Ship);

const rows = R.map(ship =>
{
   const image0 = React.createElement(ShipSilhouetteUI,
   {
      ship: ship
   });
   const image1 = React.createElement(ShipSilhouetteUI,
   {
      ship: ship,
      showLabel: true
   });

   const cells = [];
   cells.push(ReactUtils.createCell(image0, cells.length, className0));
   cells.push(ReactUtils.createCell(image1, cells.length, className1));

   return ReactUtils.createRow(cells, ship.name);
})(ships);

const table = ReactUtils.createTable(rows);

ReactDOM.render(table, document.getElementById("panel"));