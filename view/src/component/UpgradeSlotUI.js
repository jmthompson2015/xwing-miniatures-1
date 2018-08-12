import Endpoint from "../Endpoint.js";
import ImageWithLabelUI from "./ImageWithLabelUI.js";

const UpgradeSlotUI = props =>
{
   const upgradeSlot = props.upgradeSlot;
   const src = props.resourceBase + upgradeSlot.image;

   return React.createElement(ImageWithLabelUI,
   {
      src: src,
      label: upgradeSlot.name,
      showLabel: props.showLabel
   });
};

UpgradeSlotUI.propTypes = {
   upgradeSlot: PropTypes.object.isRequired,

   resourceBase: PropTypes.string,
   showLabel: PropTypes.bool
};

UpgradeSlotUI.defaultProps = {
   resourceBase: Endpoint.ARTIFACT_RESOURCE,
   showLabel: false
};

export default UpgradeSlotUI;