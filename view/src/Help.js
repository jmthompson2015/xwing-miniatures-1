import Endpoint from "./Endpoint.js";
import Selector from "./Selector.js";

import CardImage from "./component/CardImage.js";

const Help = {};

const referenceKeys = XMA.EnumUtilities.keys(XMA.ReferenceCard);

const rows = referenceKeys.map(referenceKey => {
  const referenceCard = Selector.referenceCard(referenceKey);
  const resourceBase = referenceCard.image.startsWith("reference-card/")
    ? Endpoint.ARTIFACT_RESOURCE
    : undefined;

  return React.createElement(CardImage, {
    key: `referenceCard${referenceKey}`,
    card: referenceCard,
    resourceBase
  });
});

const mainPanel = ReactDOMFactories.div({}, rows);
ReactDOM.render(mainPanel, document.getElementById("mainPanel"));

export default Help;
