import Endpoint from "../Endpoint.js";

const CardImage = props =>
{
   const card = props.card;
   const width = props.width;
   const canvasId = "CardImageCanvas" + card.key + props.isFaceUp + width;
   const src = props.resourceBase + card.image;

   return ReactDOMFactories.img(
   {
      key: canvasId,
      className: "br3",
      src: src,
      title: card.name,
      width: width,
   });
};

CardImage.propTypes = {
   card: PropTypes.object.isRequired,

   isFaceUp: PropTypes.bool,
   resourceBase: PropTypes.string,
   width: PropTypes.number,
};

CardImage.defaultProps = {
   isFaceUp: true,
   resourceBase: Endpoint.XWING_IMAGES,
   width: 250
};

export default CardImage;