import ReactUtilities from "../ReactUtilities.js";

class CardInstancesArea extends React.Component {
  constructor(props) {
    super(props);

    const { isExpanded } = this.props;

    this.state = {
      isExpanded
    };

    this.toggleExpand = this.toggleExpandFunction.bind(this);
  }

  createCardInstanceCells() {
    const { cardInstanceUIs } = this.props;
    const { isExpanded } = this.state;

    const cells = cardInstanceUIs.map((cardInstanceUI, i) => {
      let myClassName;

      if (isExpanded || i === cardInstanceUIs.length - 1) {
        myClassName = "dtc pa1 v-mid";
      } else if (i < cardInstanceUIs.length - 1) {
        myClassName = "dn";
      }

      return ReactDOMFactories.div(
        {
          key: `cardCell${i}`,
          className: myClassName
        },
        cardInstanceUI
      );
    });

    const cell = ReactUtilities.createCell(cells);

    return ReactUtilities.createRow(cell, "mainRow");
  }

  createLabelUI() {
    const { cardInstanceUIs, label: label0 } = this.props;
    const label = ReactUtilities.createCell(label0, "labelCell", "b tc");

    const cardCount = cardInstanceUIs.length;
    const { isExpanded } = this.state;
    // const expandLabel = cardCount > 1 ? (isExpanded ? "\u25B6" : "\u25BC") : "";
    let expandLabel = "";
    if (cardCount > 1) {
      if (isExpanded) {
        expandLabel = "\u25B6";
      } else {
        expandLabel = "\u25BC";
      }
    }

    const expandControl = ReactDOMFactories.div(
      {
        key: "expandCell",
        onClick: this.toggleExpand
      },
      expandLabel
    );

    const row = ReactUtilities.createRow([label, expandControl], "labelExpandRow");
    const table = ReactUtilities.createTable(row, "labelExpandTable", "w-100");

    const tableCell = ReactUtilities.createCell(table, "tableCell");
    return ReactUtilities.createRow(tableCell, "labelRow");
  }

  toggleExpandFunction() {
    const { isExpanded: isExpandedOld } = this.state;
    this.setState({
      isExpanded: !isExpandedOld
    });
  }

  render() {
    const rows = [];

    rows.push(this.createLabelUI());
    rows.push(this.createCardInstanceCells());

    return ReactUtilities.createTable(rows, undefined);
  }
}

CardInstancesArea.propTypes = {
  cardInstanceUIs: PropTypes.arrayOf().isRequired,

  isExpanded: PropTypes.bool,
  label: PropTypes.string
};

CardInstancesArea.defaultProps = {
  isExpanded: true,
  label: undefined
};

export default CardInstancesArea;
