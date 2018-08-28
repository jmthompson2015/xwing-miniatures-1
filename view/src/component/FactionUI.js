import Endpoint from "../Endpoint.js";
import ImageWithLabelUI from "./ImageWithLabelUI.js";

const FactionUI = props => {
  const { faction, isSmall, resourceBase, showLabel } = props;
  const src = resourceBase + faction.image;
  const size = isSmall ? 24 : 32;

  return React.createElement(ImageWithLabelUI, {
    src,
    label: faction.name,
    showLabel,
    width: size
  });
};

FactionUI.propTypes = {
  faction: PropTypes.shape().isRequired,

  isSmall: PropTypes.bool,
  resourceBase: PropTypes.string,
  showLabel: PropTypes.bool
};

FactionUI.defaultProps = {
  isSmall: false,
  resourceBase: Endpoint.XWING_IMAGES,
  showLabel: false
};

export default FactionUI;
