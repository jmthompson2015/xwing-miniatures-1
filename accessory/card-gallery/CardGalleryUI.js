const { CardImage, ReactUtilities: ReactUtils } = XMV;

class CardGalleryUI extends React.PureComponent {
  render() {
    const { cards, width } = this.props;

    const mapFunction = card => {
      const element = React.createElement(CardImage, {
        card,
        width
      });
      return ReactUtils.createCell(element, card.key);
    };

    const cells = cards.map(mapFunction);

    return ReactUtils.createFlexboxWrap(cells);
  }
}

CardGalleryUI.propTypes = {
  cards: PropTypes.arrayOf().isRequired,

  width: PropTypes.number
};

CardGalleryUI.defaultProps = {
  width: 200
};

export default CardGalleryUI;
