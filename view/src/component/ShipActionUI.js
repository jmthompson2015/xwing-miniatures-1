class ShipActionUI extends React.Component {
  render() {
    const { shipAction, showLabel } = this.props;
    let className = "center tc v-mid";
    let src = shipAction.key.toLowerCase();

    if (shipAction.key === XMA.ShipAction.DECLOAK) {
      src = "cloak";
      className += " silver";
    }

    const image = ReactDOMFactories.span(
      {
        className,
        title: shipAction.name
      },
      ReactDOMFactories.i({
        className: `xwing-miniatures-font xwing-miniatures-font-${src}`
      })
    );

    let answer = image;

    if (showLabel) {
      answer = ReactDOMFactories.span(
        {
          className: "v-mid"
        },
        image,
        " ",
        shipAction.name
      );
    }

    return answer;
  }
}

ShipActionUI.propTypes = {
  shipAction: PropTypes.shape().isRequired,

  showLabel: PropTypes.bool
};

ShipActionUI.defaultProps = {
  showLabel: false
};

export default ShipActionUI;
