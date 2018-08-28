/*
 * Provides a React component which emulates a Java
 * <a href="http://docs.oracle.com/javase/6/docs/api/javax/swing/JOptionPane.html">JOptionPane</a>.
 */
class OptionPane extends React.Component {
  constructor(props) {
    super(props);

    const { initialInput } = this.props;

    this.state = {
      input: initialInput
    };
  }

  render() {
    const { buttons, icon, message, title } = this.props;
    const rows = [];

    const cell0 = ReactDOMFactories.td(
      {
        colSpan: 2,
        className: "optionPaneTitle bg-xw-medium tc"
      },
      title
    );
    rows.push(
      ReactDOMFactories.tr(
        {
          key: 0
        },
        cell0
      )
    );

    const cell10 = ReactDOMFactories.td(
      {
        key: 0,
        rowSpan: 2
      },
      icon
    );
    const cell11 = ReactDOMFactories.td(
      {
        key: 1,
        className: "optionPaneMessage"
      },
      message
    );
    rows.push(
      ReactDOMFactories.tr(
        {
          key: 1
        },
        [cell10, cell11]
      )
    );

    const { input } = this.state;
    const cell2 = ReactDOMFactories.td({}, input);
    rows.push(
      ReactDOMFactories.tr(
        {
          key: 2
        },
        cell2
      )
    );

    const cell3 = ReactDOMFactories.td(
      {
        colSpan: 2,
        className: "optionPaneButtons pa2 tr"
      },
      buttons
    );
    rows.push(
      ReactDOMFactories.tr(
        {
          key: 3
        },
        cell3
      )
    );

    return ReactDOMFactories.table(
      {
        className: "optionPane ba b--xw-medium bg-xw-light center v-top"
      },
      ReactDOMFactories.tbody({}, rows)
    );
  }
}

OptionPane.propTypes = {
  buttons: PropTypes.shape().isRequired,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]).isRequired,
  title: PropTypes.string.isRequired,

  initialInput: PropTypes.shape(),
  icon: PropTypes.shape()
};

OptionPane.defaultProps = {
  initialInput: undefined,
  icon: undefined
};

export default OptionPane;
