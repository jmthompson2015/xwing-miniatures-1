import Endpoint from "../Endpoint.js";
import ReactUtilities from "../ReactUtilities.js";
import Selector from "../Selector.js";

import ImageWithLabelUI from "./ImageWithLabelUI.js";

const faction = Selector.faction(XMA.Faction.GALACTIC_EMPIRE);
const upgradeSlot = Selector.upgradeSlot(XMA.UpgradeSlot.ELITE);
const typeName = upgradeSlot.name.toLowerCase().replace(/ /g, "-");
const className = "ba b--silver bg-near-white f6 pa1 tl v-mid";
const rows = [];

const image0 = React.createElement(ImageWithLabelUI, {
  src: Endpoint.XWING_IMAGES + faction.image,
  label: faction.name
});

const image1 = React.createElement(ImageWithLabelUI, {
  src: Endpoint.XWING_IMAGES + faction.image,
  label: faction.name,
  showLabel: true
});

let cells = [];

cells.push(ReactUtilities.createCell(image0, "standard", className));
cells.push(ReactUtilities.createCell(image1, "standard+label", className));

rows.push(ReactUtilities.createRow(cells, rows.length));

const image2 = React.createElement(ImageWithLabelUI, {
  src: `${Endpoint.ARTIFACT_RESOURCE}upgrade-slot/${typeName}.png`,
  label: upgradeSlot.name
});

const image3 = React.createElement(ImageWithLabelUI, {
  src: `${Endpoint.ARTIFACT_RESOURCE}upgrade-slot/${typeName}.png`,
  label: upgradeSlot.name,
  showLabel: true
});

cells = [];

cells.push(ReactUtilities.createCell(image2, "standard", className));
cells.push(ReactUtilities.createCell(image3, "standard+label", className));

rows.push(ReactUtilities.createRow(cells, rows.length));

ReactDOM.render(ReactUtilities.createTable(rows), document.getElementById("upgradeSlotPanel"));
