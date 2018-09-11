import ReactUtils from "../ReactUtilities.js";

import PilotsUI from "./PilotsUI.js";
import PlayAreaUI from "./PlayAreaUI.js";
import StatusBarUI from "./StatusBarUI.js";
import TacticalView from "./TacticalView.js";

const { Selector } = XMA;
const { PlayAreaState, TacticalViewState } = XMS;

class GamePanel extends React.Component {
  createPilotMap() {
    const { pilotInstances1, pilotInstances2 } = this.props;
    const instances = R.concat(pilotInstances1, pilotInstances2);
    const reduceFunction = (accum, instance) => R.assoc(instance.id, instance, accum);

    return R.reduce(reduceFunction, {}, instances);
  }

  createPilotsUI1() {
    const { pilotInstances1, pilotToDamages1, pilotToUpgrades1 } = this.props;

    return React.createElement(PilotsUI, {
      pilotInstances: pilotInstances1,
      pilotToDamages: pilotToDamages1,
      pilotToUpgrades: pilotToUpgrades1
    });
  }

  createPilotsUI2() {
    const { pilotInstances2, pilotToDamages2, pilotToUpgrades2 } = this.props;

    return React.createElement(PilotsUI, {
      pilotInstances: pilotInstances2,
      pilotToDamages: pilotToDamages2,
      pilotToUpgrades: pilotToUpgrades2
    });
  }

  createPlayAreaButtons() {
    const { playAreaState, playAreaZoomIn, playAreaZoomOut, resourceBase } = this.props;
    const zoomInButton = ReactDOMFactories.button(
      {
        disabled: !playAreaState.zoomInEnabled,
        onClick: playAreaZoomIn,
        title: "Zoom In"
      },
      ReactDOMFactories.img({ src: `${resourceBase}/icon/zoom_in.png` })
    );
    const zoomOutButton = ReactDOMFactories.button(
      {
        disabled: !playAreaState.zoomOutEnabled,
        onClick: playAreaZoomOut,
        title: "Zoom Out"
      },
      ReactDOMFactories.img({ src: `${resourceBase}/icon/zoom_out.png` })
    );

    return ReactDOMFactories.span({}, zoomOutButton, zoomInButton);
  }

  createPlayAreaUI() {
    const { explosion, laserBeam, maneuver, playAreaState, image } = this.props;
    const pilotMap = this.createPilotMap();

    return React.createElement(PlayAreaUI, {
      image,
      pilotInstances: pilotMap,
      scale: playAreaState.scale,
      explosion,
      laserBeam,
      maneuver
    });
  }

  createStatusBarUI() {
    const { activeShipName, phaseKey, round, userMessage } = this.props;

    return React.createElement(StatusBarUI, {
      activeShipName,
      phaseName: Selector.phase(phaseKey).name,
      round,
      userMessage
    });
  }

  createTacticalViewButtons() {
    const { resourceBase, tacticalViewState, tacticalViewZoomIn, tacticalViewZoomOut } = this.props;
    const zoomInButton = ReactDOMFactories.button(
      {
        disabled: !tacticalViewState.zoomInEnabled,
        onClick: tacticalViewZoomIn,
        title: "Zoom In"
      },
      ReactDOMFactories.img({ src: `${resourceBase}/icon/zoom_in.png` })
    );
    const zoomOutButton = ReactDOMFactories.button(
      {
        disabled: !tacticalViewState.zoomOutEnabled,
        onClick: tacticalViewZoomOut,
        title: "Zoom Out"
      },
      ReactDOMFactories.img({ src: `${resourceBase}/icon/zoom_out.png` })
    );

    return ReactDOMFactories.span({}, zoomOutButton, zoomInButton);
  }

  createTacticalView() {
    const { activePilotId, tacticalViewState } = this.props;
    const pilotMap = this.createPilotMap();

    return React.createElement(TacticalView, {
      activePilotId,
      pilotInstances: pilotMap,
      scale: tacticalViewState.scale
    });
  }

  createViewTable() {
    const playAreaButtons = this.createPlayAreaButtons();
    const tacticalViewButtons = this.createTacticalViewButtons();
    const playAreaUI = this.createPlayAreaUI();
    const tacticalView = this.createTacticalView();

    const buttonCells = [
      ReactUtils.createCell(playAreaButtons, "playAreaButtons", "tc"),
      ReactUtils.createCell(tacticalViewButtons, "tacticalViewButtons", "tc")
    ];

    const canvasCells = [
      ReactUtils.createCell(playAreaUI, "playAreaUI", "pa1 v-top"),
      ReactUtils.createCell(tacticalView, "tacticalView", "pa1 v-top")
    ];

    const viewRows = [
      ReactUtils.createRow(buttonCells, "buttonCellsRow"),
      ReactUtils.createRow(canvasCells, "canvasCellsRow")
    ];

    return ReactUtils.createTable(viewRows, "viewTable", "center");
  }

  render() {
    const statusBar = this.createStatusBarUI();
    const pilotArea1 = this.createPilotsUI1();
    const agentInputArea1 = ReactDOMFactories.div({ id: "agentInputArea1" });
    const viewTable = this.createViewTable();
    const agentInputArea2 = ReactDOMFactories.div({ id: "agentInputArea2" });
    const pilotArea2 = this.createPilotsUI2();

    const rows = [
      ReactUtils.createRow(
        ReactUtils.createCell(statusBar, "statusBarContainer"),
        "statusBarContainerRow"
      ),
      ReactUtils.createRow(ReactUtils.createCell(pilotArea1, "pilotArea1"), "pilotArea1Row"),
      ReactUtils.createRow(
        ReactUtils.createCell(agentInputArea1, "agentInputArea1"),
        "agentInputArea1Row"
      ),
      ReactUtils.createRow(ReactUtils.createCell(viewTable, "viewTable"), "viewTableRow"),
      ReactUtils.createRow(
        ReactUtils.createCell(agentInputArea2, "agentInputArea2"),
        "agentInputArea2Row"
      ),
      ReactUtils.createRow(ReactUtils.createCell(pilotArea2, "pilotArea2"), "pilotArea2Row")
    ];

    return ReactUtils.createTable(rows, "xwingMiniaturesView", "center");
  }
}

GamePanel.propTypes = {
  resourceBase: PropTypes.string,

  // Pilots UI.
  pilotInstances1: PropTypes.shape().isRequired,
  pilotToDamages1: PropTypes.shape(),
  pilotToUpgrades1: PropTypes.shape(),
  pilotInstances2: PropTypes.shape().isRequired,
  pilotToDamages2: PropTypes.shape(),
  pilotToUpgrades2: PropTypes.shape(),

  // Play area UI buttons.
  playAreaZoomIn: PropTypes.func.isRequired,
  playAreaZoomOut: PropTypes.func.isRequired,

  // Play area UI.
  playAreaState: PropTypes.number,
  image: PropTypes.string,
  explosion: PropTypes.shape(),
  laserBeam: PropTypes.shape(),
  maneuver: PropTypes.shape(),

  // Status bar.
  activeShipName: PropTypes.string,
  phaseKey: PropTypes.string,
  round: PropTypes.number,
  userMessage: PropTypes.string,

  // Tactical view buttons.
  tacticalViewZoomIn: PropTypes.func.isRequired,
  tacticalViewZoomOut: PropTypes.func.isRequired,

  // Tactical view.
  activePilotId: PropTypes.number,
  tacticalViewState: PropTypes.number
};

GamePanel.defaultProps = {
  resourceBase: "../../resource/",

  // Pilots UI.
  pilotToDamages1: {},
  pilotToUpgrades1: {},
  pilotToDamages2: {},
  pilotToUpgrades2: {},

  // Play area UI.
  image: "background/pia13845.jpg",
  explosion: undefined,
  laserBeam: undefined,
  maneuver: undefined,
  playAreaState: PlayAreaState.create(),

  // Status bar.
  activeShipName: "",
  phaseKey: "",
  round: 0,
  userMessage: "",

  // Tactical view.
  activePilotId: undefined,
  tacticalViewState: TacticalViewState.create()
};

export default GamePanel;
