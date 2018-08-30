import Endpoint from "../Endpoint.js";
import ImageWithLabelUI from "./ImageWithLabelUI.js";

class UpgradeSlotUI extends React.PureComponent {
  render() {
    const { resourceBase, showLabel, upgradeSlot } = this.props;
    const src = resourceBase + upgradeSlot.image;

    return React.createElement(ImageWithLabelUI, {
      src,
      label: upgradeSlot.name,
      showLabel
    });
  }
}

UpgradeSlotUI.propTypes = {
  upgradeSlot: PropTypes.shape().isRequired,

  resourceBase: PropTypes.string,
  showLabel: PropTypes.bool
};

UpgradeSlotUI.defaultProps = {
  resourceBase: Endpoint.ARTIFACT_RESOURCE,
  showLabel: false
};

export default UpgradeSlotUI;
