import PilotUtils from "../PilotUtilities.js";
import ReactUtils from "../ReactUtilities.js";

import ManeuverChooser from "./ManeuverChooser.js";
import OptionPane from "./OptionPane.js";

class PlanningDialog extends React.Component
{
   constructor(props)
   {
      super(props);

      this.state = {
         pilotToManeuver:
         {}
      };

      this.ok = this.okFunction.bind(this);
      this.selectionChanged = this.selectionChangedFunction.bind(this);
   }

   render()
   {
      const pilotInstances = this.props.pilotInstances;
      const pilotToValidManeuvers = this.props.pilotToValidManeuvers;
      const pilotIds = R.map(parseInt, Object.keys(pilotToValidManeuvers));
      const cells = [];
      const maneuverMap = maneuverKey => XMA.Selector.maneuver(maneuverKey);

      pilotIds.forEach(pilotId =>
      {
         const pilotInstance = R.find(R.propEq("id", pilotId))(pilotInstances);
         const maneuverKeys = pilotToValidManeuvers[pilotId];
         const pilotCard = XMA.Selector.pilotCard(pilotInstance.pilotKey);
         const maneuvers = R.map(maneuverMap, maneuverKeys);
         const element = React.createElement(ManeuverChooser,
         {
            maneuvers: maneuvers,
            pilotName: PilotUtils.name(pilotInstance, true),
            shipName: pilotCard.ship,
            pilotId: pilotInstance.id,
            callback: this.selectionChanged
         });
         cells.push(ReactUtils.createCell(element, cells.length, "v-top"));
      });

      const initialInput = ReactUtils.createTable(ReactUtils.createRow(cells));
      const disabled = Object.getOwnPropertyNames(this.state.pilotToManeuver).length < pilotIds.length;
      const buttons = ReactDOMFactories.button(
      {
         onClick: this.ok,
         disabled: disabled
      }, "OK");

      return React.createElement(OptionPane,
      {
         title: "Planning: Select Maneuvers",
         message: "",
         initialInput: initialInput,
         buttons: buttons
      });
   }
}

PlanningDialog.prototype.okFunction = function()
{
   const pilotToManeuver = this.state.pilotToManeuver;
   const callback = this.props.callback;

   callback(
   {
      pilotToManeuver: pilotToManeuver
   });
};

PlanningDialog.prototype.selectionChangedFunction = function(
{
   pilotId,
   maneuverKey
})
{
   const pilotInstances = this.props.pilotInstances;
   const pilotInstance = R.find(R.propEq("id", parseInt(pilotId)))(pilotInstances);
   const pilotToManeuver = this.state.pilotToManeuver;
   pilotToManeuver[pilotInstance.id] = maneuverKey;

   this.setState(
   {
      pilotToManeuver: pilotToManeuver
   });
};

PlanningDialog.propTypes = {
   pilotInstances: PropTypes.array.isRequired,
   pilotToValidManeuvers: PropTypes.object.isRequired,
   callback: PropTypes.func.isRequired
};

export default PlanningDialog;