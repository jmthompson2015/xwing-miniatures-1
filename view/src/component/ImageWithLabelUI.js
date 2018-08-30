class ImageWithLabelUI extends React.PureComponent {
  render() {
    const { label, showLabel, src, width } = this.props;
    const image = ReactDOMFactories.img({
      className: "v-mid",
      src,
      title: label,
      width
    });

    let answer = image;

    if (showLabel) {
      answer = ReactDOMFactories.span({}, image, " ", label);
    }

    return answer;
  }
}

ImageWithLabelUI.propTypes = {
  src: PropTypes.string.isRequired,

  label: PropTypes.string,
  showLabel: PropTypes.bool,
  width: PropTypes.number
};

ImageWithLabelUI.defaultProps = {
  label: "",
  showLabel: false,
  width: 24
};

export default ImageWithLabelUI;
