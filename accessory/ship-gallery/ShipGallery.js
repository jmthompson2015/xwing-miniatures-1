import ShipGalleryUI from "./ShipGalleryUI.js";

const { Faction, Selector, Ship } = XMA;
const { Endpoint } = XMV;

const createHeader = (key, image, label) => {
  const imageUI = ReactDOMFactories.img({
    key: `headerImg${key}`,
    className: "pl2 v-mid",
    src: Endpoint.XWING_IMAGES + image,
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

const determineShipKeys = enumValues => {
  const filenames = [];
  const reduceFunction = (accum, enumValue) => {
    if (!filenames.includes(enumValue.images[0])) {
      filenames.push(enumValue.images[0]);
      return R.append(enumValue, accum);
    }
    return accum;
  };
  const myEnumValues = R.reduce(reduceFunction, [], enumValues);

  return R.map(enumValue => enumValue.key, myEnumValues).sort();
};

const createRows = () => {
  const shipValues = R.filter(ship => ship.size !== "huge", Selector.enumValues(Ship));
  const factionValues = Selector.enumValues(Faction);

  let i = 1;
  const reduceFunction = (accum, faction) => {
    const myShipValues = R.filter(
      enumValue => enumValue.faction.includes(faction.name),
      shipValues
    );
    const shipKeys = determineShipKeys(myShipValues);
    const ships = R.map(Selector.ship, shipKeys);

    const header = createHeader(i, faction.image, faction.name);
    const shipGallery = React.createElement(ShipGalleryUI, {
      key: `shipGallery${i}`,
      faction,
      ships
    });
    i += 1;

    return R.pipe(
      R.append(header),
      R.append(shipGallery)
    )(accum);
  };

  return R.reduce(reduceFunction, [], factionValues);
};

const createGallery = () => {
  const rows = createRows();
  const mainPanel = ReactDOMFactories.div({}, rows);
  ReactDOM.render(mainPanel, document.getElementById("panel"));
};

createGallery();
