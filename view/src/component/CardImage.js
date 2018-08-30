import Endpoint from "../Endpoint.js";

class CardImage extends React.PureComponent {
  render() {
    const { card, isFaceUp, resourceBase, width } = this.props;
    const canvasId = `CardImageCanvas${card.key}${isFaceUp}${width}`;
    const src = resourceBase + card.image;

    return ReactDOMFactories.img({
      key: canvasId,
      className: "br3",
      src,
      title: card.name,
      width
    });
  }
}

CardImage.propTypes = {
  card: PropTypes.shape().isRequired,

  isFaceUp: PropTypes.bool,
  resourceBase: PropTypes.string,
  width: PropTypes.number
};

CardImage.defaultProps = {
  isFaceUp: true,
  resourceBase: Endpoint.XWING_IMAGES,
  width: 250
};

export default CardImage;
