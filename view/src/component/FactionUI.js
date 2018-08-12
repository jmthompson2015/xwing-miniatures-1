import Endpoint from "../Endpoint.js";
import ImageWithLabelUI from "./ImageWithLabelUI.js";

const FactionUI = props =>
{
   const faction = props.faction;
   const src = props.resourceBase + faction.image;
   const size = (props.isSmall ? 24 : 32);

   return React.createElement(ImageWithLabelUI,
   {
      src: src,
      label: faction.name,
      showLabel: props.showLabel,
      width: size
   });
};

FactionUI.propTypes = {
   faction: PropTypes.object.isRequired,

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