/* eslint no-console: ["error", { allow: ["log"] }] */

import CardGalleryUI from "./CardGalleryUI.js";
import EnumClassSelect from "./EnumClassSelect.js";

const WIDTH = 225;

const determineWidth = enumClass => {
  let answer;

  switch (enumClass) {
    case XMA.PilotCard:
      answer = WIDTH;
      break;
    case XMA.DamageCard:
    case XMA.UpgradeCard:
      answer = WIDTH / 1.4;
      break;
    default:
      throw new Error(`Unknown enumClass: ${enumClass}`);
  }

  return answer;
};

const createDamageRows = () => {
  const enumClass = XMA.DamageCard;
  const enumValues = XMA.Selector.enumValues(enumClass);
  const enumKeys = enumValues.map(enumValue => enumValue.key);
  const cards = R.map(XMA.Selector.damageCard, enumKeys);
  const width = determineWidth(enumClass);

  const rows = [];
  rows.push(
    React.createElement(CardGalleryUI, {
      key: `cardGallery${rows.length}`,
      cards,
      width
    })
  );

  return rows;
};

const createHeader = (key, image, label, resourceBase = XMV.Endpoint.XWING_IMAGES) => {
  const imageUI = ReactDOMFactories.img({
    key: `headerImg${key}`,
    className: "pl2 v-mid",
    src: resourceBase + image,
    width: 32
  });

  return ReactDOMFactories.h2(
    {
      key: `headerLabel${key}`,
      className: "v-mid"
    },
    " ",
    imageUI,
    " ",
    label
  );
};

const createPilotRows = () => {
  const enumClass = XMA.PilotCard;
  const enumValues = XMA.Selector.enumValues(enumClass);
  const width = determineWidth(enumClass);
  const rows = [];
  const factionValues = XMA.Selector.enumValues(XMA.Faction);

  factionValues.forEach(faction => {
    const myEnumValues = enumValues.filter(enumValue => enumValue.faction === faction.name);
    const enumKeys = myEnumValues.map(enumValue => enumValue.key);
    const cards = R.map(XMA.Selector.pilotCard, enumKeys);

    rows.push(createHeader(rows.length, faction.image, faction.name));

    rows.push(
      React.createElement(CardGalleryUI, {
        key: `cardGallery${rows.length}`,
        cards,
        width
      })
    );
  });

  return rows;
};

const createUpgradeRows = () => {
  const enumClass = XMA.UpgradeCard;
  const enumValues = XMA.Selector.enumValues(enumClass);
  const width = determineWidth(enumClass);
  const rows = [];
  const slotValues = XMA.Selector.enumValues(XMA.UpgradeSlot);

  slotValues.forEach(slot => {
    const myEnumValues = enumValues.filter(enumValue => enumValue.slot === slot.name);
    const enumKeys = myEnumValues.map(enumValue => enumValue.key);
    const cards = R.map(XMA.Selector.upgradeCard, enumKeys);

    rows.push(createHeader(rows.length, slot.image, slot.name, XMV.Endpoint.ARTIFACT_RESOURCE));

    rows.push(
      React.createElement(CardGalleryUI, {
        key: `cardGallery${rows.length}`,
        cards,
        width
      })
    );
  });

  return rows;
};

const createGallery = enumClass => {
  let rows = [];
  if (enumClass === XMA.DamageCard) {
    rows = createDamageRows();
  } else if (enumClass === XMA.PilotCard) {
    rows = createPilotRows();
  } else if (enumClass === XMA.UpgradeCard) {
    rows = createUpgradeRows();
  }

  const mainPanel = ReactDOMFactories.div({}, rows);
  ReactDOM.render(mainPanel, document.getElementById("mainPanel"));
};

const myOnChange = enumClass => {
  createGallery(enumClass);
};

const initialSelectedValue = "Pilot";
const cardTypeSelect = React.createElement(EnumClassSelect, {
  initialSelectedValue,
  onChange: myOnChange
});
const selectPanel = ReactDOMFactories.div(
  {
    className: "pb3 tc"
  },
  "Card Type: ",
  cardTypeSelect
);
ReactDOM.render(selectPanel, document.getElementById("selectPanel"));

createGallery(XMA.PilotCard);
