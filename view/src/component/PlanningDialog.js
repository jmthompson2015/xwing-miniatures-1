import PilotUtils from "../PilotUtilities.js";
import ReactUtils from "../ReactUtilities.js";

import ManeuverChooser from "./ManeuverChooser.js";
import OptionPane from "./OptionPane.js";

class PlanningDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pilotToManeuver: {}
    };

    this.ok = this.okFunction.bind(this);
    this.selectionChanged = this.selectionChangedFunction.bind(this);
  }

  okFunction() {
    const { pilotToManeuver } = this.state;
    const { callback } = this.props;

    callback({
      pilotToManeuver
    });
  }

  selectionChangedFunction({ pilotId, maneuverKey }) {
    const { pilotInstances } = this.props;
    const pilotInstance = R.find(R.propEq("id", parseInt(pilotId, 10)))(pilotInstances);
    const { pilotToManeuver } = this.state;
    pilotToManeuver[pilotInstance.id] = maneuverKey;

    this.setState({
      pilotToManeuver
    });
  }

  render() {
    const { pilotInstances, pilotToValidManeuvers } = this.props;
    const pilotIds = R.map(parseInt, Object.keys(pilotToValidManeuvers));
    const cells = [];
    const maneuverMap = maneuverKey => XMA.Selector.maneuver(maneuverKey);

    pilotIds.forEach(pilotId => {
      const pilotInstance = R.find(R.propEq("id", pilotId))(pilotInstances);
      const maneuverKeys = pilotToValidManeuvers[pilotId];
      const pilotCard = XMA.Selector.pilotCard(pilotInstance.pilotKey);
      const maneuvers = R.map(maneuverMap, maneuverKeys);
      const element = React.createElement(ManeuverChooser, {
        maneuvers,
        pilotName: PilotUtils.name(pilotInstance, true),
        shipName: pilotCard.ship,
        pilotId: pilotInstance.id,
        callback: this.selectionChanged
      });
      cells.push(ReactUtils.createCell(element, cells.length, "v-top"));
    });

    const initialInput = ReactUtils.createTable(ReactUtils.createRow(cells));
    const { pilotToManeuver } = this.state;
    const disabled = Object.getOwnPropertyNames(pilotToManeuver).length < pilotIds.length;
    const buttons = ReactDOMFactories.button(
      {
        onClick: this.ok,
        disabled
      },
      "OK"
    );

    return React.createElement(OptionPane, {
      title: "Planning: Select Maneuvers",
      message: "",
      initialInput,
      buttons
    });
  }
}

PlanningDialog.propTypes = {
  pilotInstances: PropTypes.arrayOf().isRequired,
  pilotToValidManeuvers: PropTypes.shape().isRequired,
  callback: PropTypes.func.isRequired
};

export default PlanningDialog;
