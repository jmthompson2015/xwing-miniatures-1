import ReactUtilities from "../ReactUtilities.js";

class StatusBarUI extends React.PureComponent {
  render() {
    const { activeShipName, helpBase, phaseName, round, userMessage } = this.props;
    const helpLinkUI = ReactDOMFactories.a(
      {
        href: `${helpBase}Help.html`,
        target: "_blank"
      },
      "Help"
    );

    const cellClassName = "ba";

    const roundCell = ReactUtilities.createCell(["Round: ", round], 0, cellClassName, {
      title: "Round"
    });
    const phaseCell = ReactUtilities.createCell(["Phase: ", phaseName], 1, cellClassName, {
      title: "Phase"
    });
    const activeShipCell = ReactUtilities.createCell(
      ["Active Ship: ", activeShipName],
      2,
      cellClassName,
      {
        title: "Active Ship"
      }
    );
    const userMessageCell = ReactUtilities.createCell(userMessage, 3, cellClassName, {
      title: "User Message"
    });
    const helpCell = ReactUtilities.createCell(helpLinkUI, 4, cellClassName);

    const cells = [roundCell, phaseCell, activeShipCell, userMessageCell, helpCell];
    const row = ReactUtilities.createRow(cells);

    return ReactUtilities.createTable(
      row,
      "statusBarUITable",
      "bg-xw-light collapse ma0 tc v-mid w-100"
    );
  }
}

StatusBarUI.propTypes = {
  activeShipName: PropTypes.string.isRequired,
  phaseName: PropTypes.string.isRequired,
  round: PropTypes.number.isRequired,
  userMessage: PropTypes.string.isRequired,

  helpBase: PropTypes.string
};

StatusBarUI.defaultProps = {
  helpBase: "./"
};

export default StatusBarUI;
