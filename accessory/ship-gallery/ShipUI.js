const { ReactUtilities: ReactUtils, ShipImage } = XMV;

class ShipUI extends React.PureComponent {
  constructor(props) {
    super(props);

    const { resourceBase, ship } = this.props;
    const image = new Image();
    image.onload = () => {
      const { isImageLoaded } = this.state;
      if (!isImageLoaded) {
        this.setState({
          isImageLoaded: true
        });
      }
    };

    image.src = `${resourceBase}${ship.images[0]}`;

    this.state = {
      image,
      isImageLoaded: false
    };
  }

  componentDidMount() {
    this.paint();
  }

  componentDidUpdate() {
    this.paint();
  }

  paint() {
    const {
      auxiliaryFiringArcKey,
      canvasId,
      faction,
      position,
      primaryFiringArcKey,
      shipBase
    } = this.props;
    const canvas = document.getElementById(canvasId);
    const context = canvas.getContext("2d");
    const scale = 1.0;
    let id;
    const { image } = this.state;
    const factionColor = faction.color;

    context.clearRect(0, 0, shipBase.width, shipBase.height);

    ShipImage.draw(
      context,
      scale,
      id,
      image,
      position,
      shipBase,
      factionColor,
      primaryFiringArcKey,
      auxiliaryFiringArcKey
    );
  }

  render() {
    const { canvasId, shipBase, ship } = this.props;

    const canvas = ReactDOMFactories.canvas({
      id: canvasId,
      width: shipBase.width,
      height: shipBase.height,
      title: ship.name
    });

    const shipName = ship.name;
    const silhouette = React.createElement(XMV.ShipSilhouetteUI, {
      ship
    });
    const label = ReactDOMFactories.span({
      dangerouslySetInnerHTML: { __html: shipName }
    });
    const imageLabel = ReactDOMFactories.span(
      {
        className: "v-mid"
      },
      silhouette,
      " ",
      label
    );

    const maneuverKeys = XMA.Selector.maneuverKeysByShip(ship.key);
    const maneuvers = R.map(maneuverKey => XMA.Selector.maneuver(maneuverKey), maneuverKeys);
    const maneuverUI = React.createElement(XMV.ManeuverChooser, {
      maneuvers,
      pilotId: 2
    });

    const rows = [
      ReactUtils.createRow(ReactUtils.createCell(canvas, "shipUICanvas", "pa1"), "shipUICanvasRow"),
      ReactUtils.createRow(
        ReactUtils.createCell(imageLabel, "shipUILabel", "bg-white f6 pa1 tc v-mid"),
        "shipUILabelRow"
      ),
      ReactUtils.createRow(
        ReactUtils.createCell(maneuverUI, "shipUIManeuvers"),
        "shipUIManeuversRow"
      )
    ];

    return ReactUtils.createTable(rows, "shipUITable", "ba b--white bg-black center tc");
  }
}

ShipUI.propTypes = {
  auxiliaryFiringArcKey: PropTypes.string.isRequired,
  canvasId: PropTypes.string.isRequired,
  faction: PropTypes.shape().isRequired,
  position: PropTypes.shape().isRequired,
  primaryFiringArcKey: PropTypes.string.isRequired,
  resourceBase: PropTypes.string.isRequired,
  ship: PropTypes.shape().isRequired,
  shipBase: PropTypes.shape().isRequired
};

export default ShipUI;
