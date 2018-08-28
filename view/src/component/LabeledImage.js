import Endpoint from "../Endpoint.js";

const LabeledImage = props => {
  let answer;
  const { label } = props;
  const containerStyle = LabeledImage.createContainerStyle(props);

  if (!props.showOne && label === "1") {
    answer = ReactDOMFactories.div({
      title: props.title,
      style: containerStyle
    });
  } else {
    const cell = ReactDOMFactories.div(
      {
        className: props.labelClass,
        style: {
          display: "table-cell",
          verticalAlign: "middle"
        }
      },
      label
    );

    answer = ReactDOMFactories.div(
      {
        title: props.title,
        style: containerStyle
      },
      cell
    );
  }

  return answer;
};

LabeledImage.createContainerStyle = props => {
  const backgroundImage = `url(${props.resourceBase}${props.image})`;
  const { height, width } = props;
  const backgroundSize = `${width}px ${height}px`;

  return {
    backgroundImage,
    backgroundPosition: "alignCenter",
    backgroundRepeat: "no-repeat",
    backgroundSize,
    display: "table",
    minHeight: height,
    minWidth: width
  };
};

LabeledImage.propTypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,

  height: PropTypes.number,
  labelClass: PropTypes.string,
  resourceBase: PropTypes.string,
  showOne: PropTypes.bool,
  title: PropTypes.string,
  width: PropTypes.number
};

LabeledImage.defaultProps = {
  height: 32,
  resourceBase: Endpoint.ARTIFACT_RESOURCE,
  showOne: false,
  width: 32
};

export default LabeledImage;
