/* eslint no-console: ["error", { allow: ["log"] }] */

import EnumClassSelect from "./EnumClassSelect.js";

const myOnChange = enumClass => {
  console.log(`enumClass === DamageCard ? ${enumClass === XMA.DamageCard}`);
  console.log(`enumClass === PilotCard ? ${enumClass === XMA.PilotCard}`);
  console.log(`enumClass === UpgradeCard ? ${enumClass === XMA.UpgradeCard}`);
};

const cardTypeSelect = React.createElement(EnumClassSelect, {
  onChange: myOnChange
});

ReactDOM.render(cardTypeSelect, document.getElementById("panel"));
