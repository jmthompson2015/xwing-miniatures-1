const ImageWithLabelUI = props =>
{
   const image = ReactDOMFactories.img(
   {
      className: "v-mid",
      src: props.src,
      title: props.label,
      width: props.width
   });

   let answer = image;

   if (props.showLabel)
   {
      answer = ReactDOMFactories.span(
      {}, image, " ", props.label);
   }

   return answer;
};

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