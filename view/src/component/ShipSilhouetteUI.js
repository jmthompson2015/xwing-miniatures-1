import Endpoint from "../Endpoint.js";

import ImageWithLabelUI from "./ImageWithLabelUI.js";

class ShipSilhouetteUI extends React.PureComponent {
  render() {
    const { ship, showLabel } = this.props;
    const shipName = ship.name
      .toLowerCase()
      .replace(/[.]/g, "")
      .replace(/[ /]/g, "-")
      .replace("-(fore)", "")
      .replace("-(aft)", "");
    const src = `${Endpoint.ARTIFACT_RESOURCE}silhouette/${shipName}.png`;
    const label = ship.name;

    return React.createElement(ImageWithLabelUI, {
      src,
      label,
      showLabel
    });
  }
}

ShipSilhouetteUI.propTypes = {
  ship: PropTypes.shape().isRequired,

  showLabel: PropTypes.bool
};

ShipSilhouetteUI.defaultProps = {
  showLabel: false
};

export default ShipSilhouetteUI;
