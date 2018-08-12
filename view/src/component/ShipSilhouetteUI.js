import Endpoint from "../Endpoint.js";

import ImageWithLabelUI from "./ImageWithLabelUI.js";

class ShipSilhouetteUI extends React.Component
{
   render()
   {
      const ship = this.props.ship;
      const shipName = ship.name.toLowerCase().replace(/[\.]/g, "").replace(/[ \/]/g, "-").replace("-(fore)", "").replace("-(aft)", "");
      const src = Endpoint.ARTIFACT_RESOURCE + "silhouette/" + shipName + ".png";
      const label = ship.name;

      return React.createElement(ImageWithLabelUI,
      {
         src: src,
         label: label,
         showLabel: this.props.showLabel,
      });
   }
}

ShipSilhouetteUI.propTypes = {
   ship: PropTypes.object.isRequired,
   resourceBase: PropTypes.string.isRequired,

   showLabel: PropTypes.bool,
};

ShipSilhouetteUI.defaultProps = {
   showLabel: false,
};

export default ShipSilhouetteUI;