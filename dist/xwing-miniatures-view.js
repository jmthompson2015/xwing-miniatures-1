(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.XMV = {})));
}(this, (function (exports) { 'use strict';

  const ReactUtilities = {};

  ReactUtilities.createButton = (element, key, className, props = {}) => {
    const newProps = R.merge(props, {
      key,
      className
    });

    return ReactDOMFactories.button(newProps, element);
  };

  ReactUtilities.createCell = (element, key, className, props = {}) => {
    const newProps = R.merge(props, {
      key,
      className: `dtc${className ? ` ${className}` : ""}`
    });

    return ReactDOMFactories.div(newProps, element);
  };

  ReactUtilities.createFlexbox = (cells, key, className, props = {}) => {
    const newProps = R.merge(props, {
      key,
      className: `flex${className ? ` ${className}` : ""}`
    });

    return ReactDOMFactories.div(newProps, cells);
  };

  ReactUtilities.createFlexboxWrap = (cells, key, className, props = {}) => {
    const newProps = R.merge(props, {
      key,
      className: `flex flex-wrap${className ? ` ${className}` : ""}`
    });

    return ReactDOMFactories.div(newProps, cells);
  };

  ReactUtilities.createImg = (src, key, className, props = {}) => {
    const newProps = R.merge(props, {
      src,
      key,
      className
    });

    return ReactDOMFactories.img(newProps);
  };

  ReactUtilities.createRow = (cells, key, className, props = {}) => {
    const newProps = R.merge(props, {
      key,
      className: `dt-row${className ? ` ${className}` : ""}`
    });

    return ReactDOMFactories.div(newProps, cells);
  };

  ReactUtilities.createSpan = (element, key, className, props = {}) => {
    const newProps = R.merge(props, {
      key,
      className
    });

    return ReactDOMFactories.span(newProps, element);
  };

  ReactUtilities.createTable = (rows, key, className, props = {}) => {
    const newProps = R.merge(props, {
      key,
      className: `dt${className ? ` ${className}` : ""}`
    });

    return ReactDOMFactories.div(newProps, rows);
  };

  const Endpoint = {};

  Endpoint.ARTIFACT_RESOURCE =
    "https://cdn.jsdelivr.net/gh/jmthompson2015/xwing-miniatures-artifact@0.0.2/resource/";
  Endpoint.LOCAL_RESOURCE = "../../resource/";
  Endpoint.XWING_IMAGES = "https://cdn.jsdelivr.net/npm/xwing-data@1.0.1/images/";

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

  class FactionUI extends React.PureComponent {
    render() {
      const { faction, isSmall, resourceBase, showLabel } = this.props;
      const src = resourceBase + faction.image;
      const size = isSmall ? 24 : 32;

      return React.createElement(ImageWithLabelUI, {
        src,
        label: faction.name,
        showLabel,
        width: size
      });
    }
  }

  FactionUI.propTypes = {
    faction: PropTypes.shape().isRequired,

    isSmall: PropTypes.bool,
    resourceBase: PropTypes.string,
    showLabel: PropTypes.bool
  };

  FactionUI.defaultProps = {
    isSmall: false,
    resourceBase: Endpoint.XWING_IMAGES,
    showLabel: false
  };

  class ShipActionUI extends React.Component {
    render() {
      const { shipAction, showLabel } = this.props;
      let className = "center tc v-mid";
      let src = shipAction.key.toLowerCase();

      if (shipAction.key === XMA.ShipAction.DECLOAK) {
        src = "cloak";
        className += " silver";
      }

      const image = ReactDOMFactories.span(
        {
          className,
          title: shipAction.name
        },
        ReactDOMFactories.i({
          className: `xwing-miniatures-font xwing-miniatures-font-${src}`
        })
      );

      let answer = image;

      if (showLabel) {
        answer = ReactDOMFactories.span(
          {
            className: "v-mid"
          },
          image,
          " ",
          shipAction.name
        );
      }

      return answer;
    }
  }

  ShipActionUI.propTypes = {
    shipAction: PropTypes.shape().isRequired,

    showLabel: PropTypes.bool
  };

  ShipActionUI.defaultProps = {
    showLabel: false
  };

  class ShipSilhouetteUI extends React.PureComponent {
    render() {
      const { ship, showLabel } = this.props;
      const shipName = ship.name
        .toLowerCase()
        .replace(/[.]/g, "")
        .replace(/[ /]/g, "-")
        .replace("-(fore)", "")
        .replace("-(aft)", "");
      const src = `${Endpoint.ARTIFACT_RESOURCE}silhouette/${shipName}.png`;
      const label = ship.name;

      return React.createElement(ImageWithLabelUI, {
        src,
        label,
        showLabel
      });
    }
  }

  ShipSilhouetteUI.propTypes = {
    ship: PropTypes.shape().isRequired,

    showLabel: PropTypes.bool
  };

  ShipSilhouetteUI.defaultProps = {
    showLabel: false
  };

  class UpgradeSlotUI extends React.PureComponent {
    render() {
      const { resourceBase, showLabel, upgradeSlot } = this.props;
      const src = resourceBase + upgradeSlot.image;

      return React.createElement(ImageWithLabelUI, {
        src,
        label: upgradeSlot.name,
        showLabel
      });
    }
  }

  UpgradeSlotUI.propTypes = {
    upgradeSlot: PropTypes.shape().isRequired,

    resourceBase: PropTypes.string,
    showLabel: PropTypes.bool
  };

  UpgradeSlotUI.defaultProps = {
    resourceBase: Endpoint.ARTIFACT_RESOURCE,
    showLabel: false
  };

  const { DiceModification, Faction, Maneuver, ShipAction, UpgradeSlot } = XMA;

  const DICE_TO_ACTION = {
    [DiceModification.ATTACK_SPEND_FOCUS]: ShipAction.FOCUS,
    [DiceModification.DEFENSE_SPEND_EVADE]: ShipAction.EVADE,
    [DiceModification.DEFENSE_SPEND_FOCUS]: ShipAction.FOCUS
  };

  const getEntity = (sourceName, sourceKey) => {
    let answer;

    switch (sourceName) {
      case "ConditionCard":
        answer = XMA.Selector.conditionCard(sourceKey);
        break;
      case "DamageCard":
        answer = XMA.Selector.damageCard(sourceKey);
        break;
      case "DiceModification":
        answer = XMA.Selector.diceModification(sourceKey);
        break;
      case "PilotCard":
        answer = XMA.Selector.pilotCard(sourceKey);
        break;
      case "Ship":
        answer = XMA.Selector.ship(sourceKey);
        break;
      case "ShipAction":
        answer = XMA.Selector.shipAction(sourceKey);
        break;
      case "UpgradeCard":
        answer = XMA.Selector.upgradeCard(sourceKey);
        break;
      default:
        throw new Error(`Unknown sourceName: ${sourceName}`);
    }

    return answer;
  };

  const createIcon = (sourceName, sourceKey) => {
    const entity = getEntity(sourceName, sourceKey);
    let answer;
    let filename;
    let myShipActionKey;

    switch (sourceName) {
      case "ConditionCard":
        // FIXME: find an icon for condition card
        break;
      case "DamageCard":
        filename = `${Endpoint.ARTIFACT_RESOURCE}token/critical-damage.png`;
        answer = ReactDOMFactories.img({
          src: filename,
          title: "Critical Damage",
          width: 24
        });
        break;
      case "DiceModification":
        myShipActionKey = DICE_TO_ACTION[sourceKey];
        answer = React.createElement(ShipActionUI, {
          shipAction: XMA.Selector.shipAction(myShipActionKey)
        });
        break;
      case "PilotCard":
        answer = React.createElement(FactionUI, {
          faction: XMA.Selector.findEnumValueByName(entity.faction, Faction),
          isSmall: true
        });
        break;
      case "Ship":
        answer = React.createElement(ShipSilhouetteUI, {
          ship: entity
        });
        break;
      case "ShipAction":
        answer = React.createElement(ShipActionUI, {
          shipAction: entity
        });
        break;
      case "UpgradeCard":
        answer = React.createElement(UpgradeSlotUI, {
          upgradeSlot: XMA.Selector.findEnumValueByName(entity.slot, UpgradeSlot)
        });
        break;
      default:
        throw new Error(`EntityUI: Unknown entity sourceName: ${sourceName}`);
    }

    return answer;
  };

  const createShipActionLabel = (shipAction, context) => {
    let answer;
    let parts;
    const maneuverKey = context !== undefined ? context.maneuverKey : undefined;
    const maneuver = maneuverKey !== undefined ? Maneuver.properties[maneuverKey] : undefined;
    const token = context !== undefined ? context.token : undefined;
    const defender = context !== undefined ? context.defender : undefined;

    switch (shipAction.key) {
      case ShipAction.BARREL_ROLL:
        answer = `Barrel Roll ${context.direction}`;
        break;
      case ShipAction.BOOST:
        parts = maneuver.bearing.split(" ");
        answer = `Boost ${parts[parts.length - 1]}`;
        break;
      case ShipAction.COORDINATE:
        answer = `Coordinate: ${token.name()}`;
        break;
      case ShipAction.DECLOAK:
        answer = `Decloak: ${maneuver.bearing.name} ${maneuver.speed}`;
        break;
      case ShipAction.JAM:
        answer = `Jam: ${defender.name()}`;
        break;
      case ShipAction.RECOVER:
        answer = `Recover${token.parent !== undefined ? `: ${token.name()}` : ""}`;
        break;
      case ShipAction.REINFORCE:
        answer = `Reinforce${token.parent !== undefined ? `: ${token.name()}` : ""}`;
        break;
      case ShipAction.SLAM:
        answer = `SLAM: ${maneuver.bearing.name} ${maneuver.speed}`;
        break;
      case ShipAction.TARGET_LOCK:
        answer = `Target Lock: ${defender.name()}`;
        break;
      default:
        answer = shipAction.name;
    }

    return answer;
  };

  const createLabel = (sourceName, sourceKey, context, title) => {
    const entity = getEntity(sourceName, sourceKey);
    let { name } = entity;

    switch (sourceName) {
      case "ConditionCard":
      case "DamageCard":
      case "DiceModification":
      case "PilotCard":
      case "Ship":
      case "UpgradeCard":
        // name = entity.name;
        break;
      case "ShipAction":
        name = createShipActionLabel(entity, context);
        break;
      default:
        throw new Error(`EntityUI: Unknown entity sourceName: ${sourceName}`);
    }

    return ReactDOMFactories.span(
      {
        key: "labelCell",
        title
      },
      name
    );
  };

  const createTitle = (sourceName, sourceKey) => {
    const entity = getEntity(sourceName, sourceKey);
    let answer = "";

    switch (sourceName) {
      case "DiceModification":
      case "ShipAction":
        answer = entity.description;
        break;
      case "ConditionCard":
      case "DamageCard":
      case "PilotCard":
      case "Ship":
      case "UpgradeCard":
        answer = entity.text;
        break;
      default:
        throw new Error(`EntityUI: Unknown entity sourceName: ${sourceName}`);
    }

    return answer;
  };

  // /////////////////////////////////////////////////////////////////////////////////////////////////
  class EntityUI extends React.Component {
    render() {
      const { context, panelClass, sourceKey, sourceName } = this.props;
      const title = createTitle(sourceName, sourceKey);
      const icon = createIcon(sourceName, sourceKey);
      const label = createLabel(sourceName, sourceKey, context, title);

      const cells = [];
      cells.push(ReactUtilities.createCell(icon, "iconPanel", "v-mid"));
      cells.push(ReactUtilities.createCell(label, "labelPanel", "ph1 v-mid"));
      const row = ReactUtilities.createRow(cells);

      return ReactUtilities.createTable(row, "entityUITable", panelClass);
    }
  }

  EntityUI.propTypes = {
    sourceName: PropTypes.string.isRequired,
    sourceKey: PropTypes.string.isRequired,
    context: PropTypes.string.isRequired,
    panelClass: PropTypes.string
  };

  EntityUI.defaultProps = {
    panelClass: ""
  };

  const labelFunction = ability =>
    React.createElement(EntityUI, { sourceName: ability.sourceName, sourceKey: ability.sourceKey });

  class AbilityChooser extends React.Component {
    constructor(props) {
      super(props);

      const { initialAbility } = this.props;

      this.state = {
        selected: initialAbility
      };

      this.handleChange = this.handleChangeFunction.bind(this);
    }

    handleChangeFunction(event) {
      const { id } = event.target;
      const { abilities, onChange } = this.props;
      const selected = abilities[id];

      this.setState(
        {
          selected
        },
        onChange(selected)
      );
    }

    render() {
      const { abilities, clientProps, panelClass } = this.props;
      const inputProps = R.merge(
        {
          name: "chooseAbility", // needed for radio
          onChange: this.handleChange,
          type: "radio"
        },
        clientProps
      );

      let i = 0;
      const { selected } = this.state;
      const mapFunction = ability => {
        const input = ReactDOMFactories.input(
          R.merge(inputProps, {
            id: i,
            defaultChecked: ability === selected
          })
        );
        const label = labelFunction(ability);
        const cells = [];
        cells.push(ReactUtilities.createCell(input, cells.length, "pa1 v-mid"));
        cells.push(ReactUtilities.createCell(label, cells.length, "pa1 v-mid"));

        i += 1;
        return ReactUtilities.createRow(cells, `row${ability.sourceName}${ability.sourceKey}${i}`);
      };
      const rows = R.map(mapFunction, abilities);

      return ReactUtilities.createTable(rows, undefined, panelClass);
    }
  }

  AbilityChooser.propTypes = {
    onChange: PropTypes.func.isRequired,
    abilities: PropTypes.arrayOf().isRequired,

    clientProps: PropTypes.shape(),
    initialAbility: PropTypes.shape(),
    panelClass: PropTypes.string
  };

  AbilityChooser.defaultProps = {
    clientProps: {},
    initialAbility: undefined,
    panelClass: "bg-xw-light f6"
  };

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

  /* eslint no-console: ["error", { allow: ["log"] }] */

  class AbilityDialog extends React.Component {
    constructor(props) {
      super(props);

      this.myOnChange = this.myOnChangeFunction.bind(this);
      this.ok = this.okFunction.bind(this);
    }

    myOnChangeFunction(selected) {
      console.log(
        `AbilityDialog.myOnChange() selected = ${JSON.stringify(selected)} ${typeof selected}`
      );

      const { onChange } = this.props;
      onChange(selected);
    }

    okFunction() {
      const isAccepted = false;
      const { onChange } = this.props;
      onChange(undefined, undefined, undefined, isAccepted);
    }

    render() {
      const { abilities, activePilotName } = this.props;
      const message = `Active Ship: ${activePilotName}`;
      const okButton = ReactDOMFactories.button(
        {
          key: 0,
          onClick: this.ok
        },
        "Pass"
      );
      const buttons = ReactDOMFactories.span({}, [okButton]);

      const initialInput = React.createElement(AbilityChooser, {
        abilities,
        onChange: this.myOnChange
      });

      const title = "Select Ability";

      return React.createElement(OptionPane, {
        panelClass: "optionPane bg-xw-light",
        title,
        titleClass: "optionPaneTitle bg-moon-gray",
        message,
        messageClass: "combatMessage",
        initialInput,
        buttons,
        buttonsClass: "optionPaneButtons pa2 tr"
      });
    }
  }

  AbilityDialog.propTypes = {
    abilities: PropTypes.arrayOf().isRequired,
    activePilotName: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  class CardImage extends React.PureComponent {
    render() {
      const { card, isFaceUp, resourceBase, width } = this.props;
      const canvasId = `CardImageCanvas${card.key}${isFaceUp}${width}`;
      const src = resourceBase + card.image;

      return ReactDOMFactories.img({
        key: canvasId,
        className: "br3",
        src,
        title: card.name,
        width
      });
    }
  }

  CardImage.propTypes = {
    card: PropTypes.shape().isRequired,

    isFaceUp: PropTypes.bool,
    resourceBase: PropTypes.string,
    width: PropTypes.number
  };

  CardImage.defaultProps = {
    isFaceUp: true,
    resourceBase: Endpoint.XWING_IMAGES,
    width: 250
  };

  const PilotUtilities = {};

  PilotUtilities.name = (pilotInstance, isShort) => {
    const pilotCard = XMA.Selector.pilotCard(pilotInstance.pilotKey);
    let answer = pilotInstance.id + (pilotCard.unique ? " \u2022 " : " ") + pilotCard.name;

    if (!isShort) {
      const ship = XMA.Selector.shipValueByPilot(pilotInstance.pilotKey);
      answer += ` (${ship.name})`;
    }

    return answer;
  };

  Object.freeze(PilotUtilities);

  const Selector = {};

  const mapAttackerTargetLock = gameState => lock => {
    const defenderInstance = XMS.Selector.pilotInstance(lock.defenderId, gameState);

    return {
      id: lock.id,
      defenderName: PilotUtilities.name(defenderInstance)
    };
  };

  const mapDefenderTargetLock = gameState => lock => {
    const attackerInstance = XMS.Selector.pilotInstance(lock.attackerId, gameState);

    return {
      id: lock.id,
      attackerName: PilotUtilities.name(attackerInstance)
    };
  };

  // /////////////////////////////////////////////////////////////////////////////////////////////////
  Selector.countsByPilot = (pilotId, gameState) => XMS.Selector.countsByPilot(pilotId, gameState);

  Selector.damageCard = damageKey => XMA.Selector.damageCard(damageKey);

  Selector.damageInstancesByPilot = (pilotId, gameState) =>
    XMS.Selector.damageInstancesByPilot(pilotId, gameState);

  Selector.faction = factionKey => XMA.Selector.faction(factionKey);

  Selector.factionValueByPilot = pilotKey => XMA.Selector.factionValueByPilot(pilotKey);

  Selector.firingArc = firingArcKey => XMA.Selector.firingArc(firingArcKey);

  Selector.firingArcKeysByShip = shipKey => XMA.Selector.firingArcKeysByShip(shipKey);

  Selector.maneuver = maneuverKey => XMA.Selector.maneuver(maneuverKey);

  Selector.phase = phaseKey => XMA.Selector.phase(phaseKey);

  Selector.pilotCard = pilotKey => XMA.Selector.pilotCard(pilotKey);

  Selector.pilotInstances = gameState => XMS.Selector.pilotInstances(gameState);

  Selector.pilotInstancesByAgent = (agentId, gameState) =>
    XMS.Selector.pilotInstancesByAgent(agentId, gameState);

  Selector.playFormat = gameState => XMA.Selector.playFormat(XMS.Selector.playFormatKey(gameState));

  Selector.positionByPilot = (pilotId, gameState) => XMS.Selector.positionByPilot(pilotId, gameState);

  Selector.referenceCard = referenceKey => XMA.Selector.referenceCard(referenceKey);

  Selector.ship = shipKey => XMA.Selector.ship(shipKey);

  Selector.shipBase = shipBaseKey => XMA.Selector.shipBase(shipBaseKey);

  Selector.shipBaseValueByShip = shipKey => XMA.Selector.shipBaseValueByShip(shipKey);

  Selector.shipKeyByPilot = pilotKey => XMA.Selector.shipKeyByPilot(pilotKey);

  Selector.shipValueByPilot = pilotKey => XMA.Selector.shipValueByPilot(pilotKey);

  Selector.targetLocksByAttacker = (attackerId, gameState) => {
    const targetLocks = XMS.Selector.targetLocksByAttacker(attackerId, gameState);

    return R.map(mapAttackerTargetLock(gameState), targetLocks);
  };

  Selector.targetLocksByDefender = (defenderId, gameState) => {
    const targetLocks = XMS.Selector.targetLocksByDefender(defenderId, gameState);

    return R.map(mapDefenderTargetLock(gameState), targetLocks);
  };

  Selector.upgradeCard = upgradeKey => XMA.Selector.upgradeCard(upgradeKey);

  Selector.upgradeInstances = (pilotId, gameState) =>
    R.defaultTo([], XMS.Selector.upgradesByPilot(pilotId, gameState));

  Selector.upgradeInstancesByPilot = (pilotId, gameState) =>
    XMS.Selector.upgradeInstancesByPilot(pilotId, gameState);

  Selector.upgradeSlot = slotKey => XMA.Selector.upgradeSlot(slotKey);

  Selector.userMessage = gameState => XMS.Selector.userMessage(gameState);

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

  class LabeledImage extends React.PureComponent {
    createContainerStyle() {
      const { height, image, resourceBase, width } = this.props;
      const backgroundImage = `url(${resourceBase}${image})`;
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
    }

    render() {
      let answer;
      const { label, labelClass, showOne, title } = this.props;
      const containerStyle = this.createContainerStyle(this.props);

      if (!showOne && label === "1") {
        answer = ReactDOMFactories.div({
          title,
          style: containerStyle
        });
      } else {
        const cell = ReactDOMFactories.div(
          {
            className: labelClass,
            style: {
              display: "table-cell",
              verticalAlign: "middle"
            }
          },
          label
        );

        answer = ReactDOMFactories.div(
          {
            title,
            style: containerStyle
          },
          cell
        );
      }

      return answer;
    }
  }

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
    labelClass: undefined,
    resourceBase: Endpoint.ARTIFACT_RESOURCE,
    showOne: false,
    title: undefined,
    width: 32
  };

  const maybeAddBonus = (rows, count, src, title, labelClass) => {
    if (count !== undefined && count !== 0) {
      const value = (count > 0 ? "+" : "") + count;
      const symbol = ReactDOMFactories.span(
        {
          key: "symbol",
          className: `f6 ${labelClass}`
        },
        ReactDOMFactories.i({
          className: `xwing-miniatures-font xwing-miniatures-font-${src}`
        })
      );

      const cell = ReactUtilities.createCell(
        [value, symbol],
        `bonusCell${title}${rows.length}`,
        "tc v-mid",
        {
          title
        }
      );
      rows.push(ReactUtilities.createRow(cell, `bonusRow${title}${rows.length}`, "tc v-mid"));
    }
  };

  class TokenPanel extends React.PureComponent {
    addTargetLock(rows, targetLock, src, title) {
      const { resourceBase } = this.props;
      const element = React.createElement(LabeledImage, {
        image: src,
        resourceBase,
        label: targetLock.id,
        labelClass: "b f5 white",
        title,
        width: 38
      });

      const key = `targetLock${targetLock.attackerName}${targetLock.defenderName}`;
      const cell = ReactUtilities.createCell(element, key, "tc v-mid");
      rows.push(ReactUtilities.createRow(cell, key, "tc v-mid"));
    }

    maybeAddToken(rows, count, src, title, labelClassIn) {
      const { resourceBase } = this.props;

      if (count !== undefined && count !== 0) {
        const labelClass = labelClassIn !== undefined ? labelClassIn : "b white";
        const labeledImage = React.createElement(LabeledImage, {
          image: src,
          label: `${count}`,
          labelClass,
          resourceBase,
          title
        });

        const cell = ReactUtilities.createCell(
          labeledImage,
          `tokenCell${title}${rows.length}`,
          "tc v-mid"
        );

        rows.push(ReactUtilities.createRow(cell, `tokenRow${title}${rows.length}`, "tc v-mid"));
      }
    }

    render() {
      const {
        attackerTargetLocks,
        defenderTargetLocks,
        myKey,
        statBonuses,
        tokenCounts
      } = this.props;

      const rows = [];

      maybeAddBonus(rows, statBonuses.pilotSkill, "elite", "Pilot Skill", "orange");
      maybeAddBonus(rows, statBonuses.primaryWeapon, "attack", "Primary Weapon", "red");
      maybeAddBonus(rows, statBonuses.energy, "energy", "Energy", "xw-violet");
      maybeAddBonus(rows, statBonuses.agility, "agility", "Agility", "xw-green");
      maybeAddBonus(rows, statBonuses.hull, "hull", "Hull", "yellow");
      maybeAddBonus(rows, statBonuses.shield, "shield", "Shield", "xw-cyan");

      this.maybeAddToken(rows, tokenCounts.cloak, "token/cloak.png", "Cloak");
      this.maybeAddToken(rows, tokenCounts.energy, "token/energy.png", "Energy");
      this.maybeAddToken(rows, tokenCounts.evade, "token/evade.png", "Evade");
      this.maybeAddToken(rows, tokenCounts.focus, "token/focus.png", "Focus");
      this.maybeAddToken(rows, tokenCounts.ion, "token/ion.png", "Ion");
      this.maybeAddToken(rows, tokenCounts.ordnance, "token/ordnance.png", "Ordnance");
      this.maybeAddToken(rows, tokenCounts.reinforce, "token/reinforce.png", "Reinforce");
      this.maybeAddToken(rows, tokenCounts.shield, "token/shield.png", "Shield");
      this.maybeAddToken(rows, tokenCounts.stress, "token/stress.png", "Stress");
      this.maybeAddToken(rows, tokenCounts.tractorBeam, "token/tractor-beam.png", "Tractor Beam");
      this.maybeAddToken(
        rows,
        tokenCounts.weaponsDisabled,
        "token/weapons-disabled.png",
        "Weapons Disabled"
      );

      attackerTargetLocks.forEach(targetLock => {
        const title = `Target Lock to ${targetLock.defenderName}`;
        this.addTargetLock(rows, targetLock, "token/target-lock-attack.png", title);
      });

      defenderTargetLocks.forEach(targetLock => {
        const title = `Target Lock from ${targetLock.attackerName}`;
        this.addTargetLock(rows, targetLock, "token/target-lock-defend.png", title);
      });

      this.maybeAddToken(rows, tokenCounts.damage, "token/damage.png", "Damage", "b black");
      this.maybeAddToken(
        rows,
        tokenCounts.criticalDamage,
        "token/critical-damage.png",
        "Critical Damage",
        "b black"
      );

      return ReactUtilities.createFlexboxWrap(
        rows,
        myKey,
        "content-center flex-column justify-center"
      );
    }
  }

  TokenPanel.propTypes = {
    attackerTargetLocks: PropTypes.arrayOf(),
    defenderTargetLocks: PropTypes.arrayOf(),
    myKey: PropTypes.string,
    resourceBase: PropTypes.string,
    statBonuses: PropTypes.shape(),
    tokenCounts: PropTypes.shape()
  };

  TokenPanel.defaultProps = {
    attackerTargetLocks: [],
    defenderTargetLocks: [],
    myKey: "tokenPanel",
    resourceBase: Endpoint.ARTIFACT_RESOURCE,
    statBonuses: {},
    tokenCounts: {}
  };

  class CardInstanceUI extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isSmall: true
      };

      this.toggleSize = this.toggleSizeFunction.bind(this);
    }

    toggleSizeFunction() {
      const { isSmallOld } = this.state;
      this.setState({
        isSmall: !isSmallOld
      });
    }

    createAttachmentPanel(columns) {
      const attachments = [];
      const { damageInstances: damages, upgradeInstances: upgrades } = this.props;

      if (upgrades.length > 0) {
        for (let i = 0; i < upgrades.length; i += 1) {
          const upgradeInstance = upgrades[i];
          const upgradeUI = this.createAttachmentUI(upgradeInstance);
          attachments.push(upgradeUI);
        }
      }

      if (damages.length > 0) {
        for (let j = 0; j < damages.length; j += 1) {
          const damageInstance = damages[j];
          const damageUI = this.createAttachmentUI(damageInstance);
          attachments.push(damageUI);
        }
      }

      columns.push(
        React.createElement(CardInstancesArea, {
          key: "attachmentPanel",
          cardInstanceUIs: attachments,
          isExpanded: false
        })
      );
    }

    createAttachmentUI(cardInstance) {
      const { width } = this.props;
      return React.createElement(CardInstanceUI, {
        key: `attachment${cardInstance.id}`,
        cardInstance,
        width: width / 1.4
      });
    }

    createCardImage(cardInstance) {
      let { width } = this.props;
      const { isSmall } = this.state;

      if (isSmall) {
        width /= 2;
      }

      let card;

      if (cardInstance.pilotKey !== undefined) {
        card = Selector.pilotCard(cardInstance.pilotKey);
      } else if (cardInstance.upgradeKey !== undefined) {
        card = Selector.upgradeCard(cardInstance.upgradeKey);
      } else if (cardInstance.damageKey !== undefined) {
        card = Selector.damageCard(cardInstance.damageKey);
      }

      return React.createElement(CardImage, {
        card,
        width
      });
    }

    createTokenPanel(cardId) {
      const { attackerTargetLocks, defenderTargetLocks, statBonuses, tokenCounts } = this.props;
      const props = {
        key: `token${cardId}`,
        attackerTargetLocks,
        defenderTargetLocks,
        statBonuses,
        tokenCounts
      };

      return React.createElement(TokenPanel, props);
    }

    render() {
      const columns = [];
      const { cardInstance } = this.props;

      if (cardInstance) {
        const image = this.createCardImage(cardInstance);
        const tokenPanel = this.createTokenPanel(cardInstance.id);
        const cell = ReactDOMFactories.div(
          {
            key: `imagePanel${columns.length}`,
            className: "v-mid",
            onClick: this.toggleSize
          },
          image
        );

        columns.push(cell);
        columns.push(tokenPanel);
        this.createAttachmentPanel(columns);
      }

      return ReactUtilities.createFlexboxWrap(
        columns,
        "cardInstanceUI",
        "bg-xw-medium items-center justify-center ma0 pa0"
      );
    }
  }

  CardInstanceUI.propTypes = {
    attackerTargetLocks: PropTypes.arrayOf(),
    cardInstance: PropTypes.shape(),
    damageInstances: PropTypes.arrayOf(),
    defenderTargetLocks: PropTypes.arrayOf(),
    statBonuses: PropTypes.shape(),
    tokenCounts: PropTypes.shape(),
    upgradeInstances: PropTypes.arrayOf(),
    width: PropTypes.number
  };

  CardInstanceUI.defaultProps = {
    attackerTargetLocks: [],
    cardInstance: undefined,
    damageInstances: [],
    defenderTargetLocks: [],
    statBonuses: {},
    tokenCounts: {},
    upgradeInstances: [],
    width: 250
  };

  /*
   * Provides a user interface for damage.
   */
  class CombatDamageUI extends React.Component {
    render() {
      const { criticalDamage, hitDamage, shieldDamage } = this.props;
      const shieldImage = ReactDOMFactories.span(
        {
          className: "f4 xw-cyan"
        },
        ReactDOMFactories.i({
          className: "xwing-miniatures-font xwing-miniatures-font-shield"
        })
      );

      const hitFilename = `${Endpoint.ARTIFACT_RESOURCE}token/damage.png`;
      const hitImage = ReactUtilities.createImg(hitFilename, undefined, "pa1 v-mid", {
        title: "Damage",
        width: 32
      });

      const criticalFilename = `${Endpoint.ARTIFACT_RESOURCE}token/critical-damage.png`;
      const criticalImage = ReactUtilities.createImg(criticalFilename, undefined, "pa1 v-mid", {
        title: "Critical Damage",
        width: 32
      });

      const cells = [];
      cells.push(ReactUtilities.createCell(ReactUtilities.createSpan("Damage: "), cells.length));
      cells.push(ReactUtilities.createCell(shieldImage, cells.length, "pa1 v-mid"));
      cells.push(ReactUtilities.createCell(ReactUtilities.createSpan(shieldDamage), cells.length, "v-mid"));
      cells.push(ReactUtilities.createCell(hitImage, cells.length));
      cells.push(ReactUtilities.createCell(ReactUtilities.createSpan(hitDamage), cells.length, "v-mid"));
      cells.push(ReactUtilities.createCell(criticalImage, cells.length));
      cells.push(ReactUtilities.createCell(ReactUtilities.createSpan(criticalDamage), cells.length, "v-mid"));

      return ReactUtilities.createTable(ReactUtilities.createRow(cells), "damageTable", "center");
    }
  }

  CombatDamageUI.propTypes = {
    criticalDamage: PropTypes.number.isRequired,
    hitDamage: PropTypes.number.isRequired,
    shieldDamage: PropTypes.number.isRequired
  };

  /* eslint no-console: ["error", { allow: ["log"] }] */

  class CombatModifyAttackUI extends React.Component {
    constructor(props) {
      super(props);

      this.myOnChange = this.myOnChangeFunction.bind(this);
    }

    myOnChangeFunction(selected) {
      console.log(
        `CombatModifyAttackUI.myOnChange() selected = ${JSON.stringify(selected)} ${typeof selected}`
      );
      const { onChange } = this.props;
      onChange(selected);
    }

    render() {
      const { abilities } = this.props;

      return React.createElement(AbilityChooser, {
        abilities,
        onChange: this.myOnChange
      });
    }
  }

  CombatModifyAttackUI.propTypes = {
    abilities: PropTypes.arrayOf().isRequired,
    onChange: PropTypes.func.isRequired
  };

  /* eslint no-console: ["error", { allow: ["log"] }] */

  class CombatModifyDefenseUI extends React.Component {
    constructor(props) {
      super(props);

      this.myOnChange = this.myOnChangeFunction.bind(this);
    }

    myOnChangeFunction(selected) {
      console.log(
        `CombatModifyDefenseUI.myOnChange() selected = ${JSON.stringify(selected)} ${typeof selected}`
      );
      const { onChange } = this.props;
      onChange(selected);
    }

    render() {
      const { abilities } = this.props;

      return React.createElement(AbilityChooser, {
        abilities,
        onChange: this.myOnChange
      });
    }
  }

  CombatModifyDefenseUI.propTypes = {
    abilities: PropTypes.arrayOf().isRequired,
    onChange: PropTypes.func.isRequired
  };

  const diceKeyToValue = enumClass =>
    enumClass === XMA.AttackDiceValue ? XMA.Selector.attackDiceValue : XMA.Selector.defenseDiceValue;

  const sortDiceValues = R.sortBy(R.prop("sortOrder"));

  const createImage = (enumClass, diceKey) => {
    const diceValue = diceKeyToValue(enumClass)(diceKey);
    const source = Endpoint.ARTIFACT_RESOURCE + diceValue.image;

    return ReactUtilities.createImg(source, undefined, undefined, {
      width: 32
    });
  };

  const diceKeysToValues = enumClass => R.map(diceKeyToValue(enumClass));

  const diceValuesToKeys = R.map(value => value.key);

  const sortDiceKeys = enumClass => diceKeys =>
    R.pipe(
      diceKeysToValues(enumClass),
      sortDiceValues,
      diceValuesToKeys
    )(diceKeys);

  // /////////////////////////////////////////////////////////////////////////////////////////////////
  class DicePanel extends React.Component {
    render() {
      const { diceKeys, enumClass } = this.props;
      const sortedKeys = sortDiceKeys(enumClass)(diceKeys);
      let count = 0;
      const mapFunction = diceKey => {
        count += 1;
        return ReactUtilities.createCell(createImage(enumClass, diceKey), count, "pa1");
      };
      const cells = R.map(mapFunction, sortedKeys);

      const row = ReactUtilities.createRow(cells);

      return ReactUtilities.createTable(row, undefined, "center");
    }
  }

  DicePanel.propTypes = {
    enumClass: PropTypes.shape().isRequired,

    diceKeys: PropTypes.shape()
  };

  DicePanel.defaultProps = {
    diceKeys: []
  };

  const { Phase } = XMA;

  const PHASE_TO_TITLE = {
    [Phase.COMBAT_MODIFY_ATTACK_DICE]: "Modify Attack Dice",
    [Phase.COMBAT_MODIFY_DEFENSE_DICE]: "Modify Defense Dice",
    [Phase.COMBAT_NOTIFY_DAMAGE]: "Deal Damage"
  };

  class CombatDialog extends React.Component {
    constructor(props) {
      super(props);

      this.ok = this.okFunction.bind(this);
    }

    okFunction(ability) {
      let answer;

      if (ability && ability.sourceName) {
        answer = ability;
      }

      const { okFunction: myOkFunction } = this.props;
      myOkFunction(answer);
    }

    render() {
      const {
        abilities,
        attackerInstance,
        combatInstance,
        defenderInstance,
        phaseKey,
        resourceBase
      } = this.props;

      const attackerCard = XMA.Selector.pilotCard(attackerInstance.pilotKey);
      const defenderCard = XMA.Selector.pilotCard(defenderInstance.pilotKey);
      const weaponValue =
        combatInstance.weaponKey === "primary"
          ? {
              name: "Primary Weapon"
            }
          : XMA.Selector.upgradeCard(combatInstance.weaponKey);

      const rows = [];

      // Attacker label.
      const cell0 = ReactUtilities.createCell(ReactUtilities.createSpan(`Attacker: ${attackerCard.name}`));
      rows.push(ReactUtilities.createRow(cell0, rows.length));

      // Weapon label.
      const cell1 = ReactUtilities.createCell(ReactUtilities.createSpan(`Weapon: ${weaponValue.name}`));
      rows.push(ReactUtilities.createRow(cell1, rows.length));

      // Attack Dice panel.
      const attackPanel = React.createElement(DicePanel, {
        enumClass: XMA.AttackDiceValue,
        diceKeys: combatInstance.attackDiceKeys
      });
      const cell2 = ReactUtilities.createCell(attackPanel);
      rows.push(ReactUtilities.createRow(cell2, rows.length));

      if (phaseKey === Phase.COMBAT_MODIFY_ATTACK_DICE && abilities.length > 0) {
        // Modify Attack Dice panel.
        const modifyAttackPanel = React.createElement(CombatModifyAttackUI, {
          attacker: attackerInstance,
          resourceBase,
          abilities,
          onChange: this.ok
        });

        const cell3 = ReactUtilities.createCell(modifyAttackPanel);
        rows.push(ReactUtilities.createRow(cell3, rows.length));
      }

      // Defender label.
      const cell4 = ReactUtilities.createCell(ReactUtilities.createSpan(`Defender: ${defenderCard.name}`));
      rows.push(ReactUtilities.createRow(cell4, rows.length));

      if (combatInstance.defenseDiceKeys.length > 0) {
        // Defense Dice panel.
        const defensePanel = React.createElement(DicePanel, {
          enumClass: XMA.DefenseDiceValue,
          diceKeys: combatInstance.defenseDiceKeys
        });

        const cell5 = ReactUtilities.createCell(defensePanel);
        rows.push(ReactUtilities.createRow(cell5, rows.length));

        if (phaseKey === Phase.COMBAT_MODIFY_DEFENSE_DICE && abilities.length > 0) {
          // Modify Defense Dice panel.
          const modifyDefensePanel = React.createElement(CombatModifyDefenseUI, {
            defender: defenderInstance,
            resourceBase,
            abilities,
            onChange: this.ok
          });

          const cell6 = ReactUtilities.createCell(modifyDefensePanel);
          rows.push(ReactUtilities.createRow(cell6, rows.length));
        }
      }

      if (phaseKey === Phase.COMBAT_NOTIFY_DAMAGE) {
        // Damage panel.
        const damagePanel = React.createElement(CombatDamageUI, {
          criticalDamage: combatInstance.criticalDamage,
          hitDamage: combatInstance.hitDamage,
          shieldDamage: combatInstance.shieldDamage
        });

        const cell7 = ReactUtilities.createCell(damagePanel);
        rows.push(ReactUtilities.createRow(cell7, rows.length));
      }

      const message = ReactUtilities.createTable(rows, "combatDialogTable", "center");
      const okButton = ReactUtilities.createButton("OK", "okButton", undefined, {
        onClick: this.ok
      });
      const buttons = ReactUtilities.createSpan([okButton]);

      return React.createElement(OptionPane, {
        title: `Combat: ${PHASE_TO_TITLE[phaseKey]}`,
        message,
        buttons
      });
    }
  }

  CombatDialog.propTypes = {
    combatInstance: PropTypes.shape().isRequired,
    attackerInstance: PropTypes.shape().isRequired,
    defenderInstance: PropTypes.shape().isRequired,
    okFunction: PropTypes.func.isRequired,
    phaseKey: PropTypes.string.isRequired,

    abilities: PropTypes.arrayOf(),
    resourceBase: PropTypes.string
  };

  CombatDialog.defaultProps = {
    abilities: [],
    resourceBase: undefined
  };

  const BEARING_TO_FONT = {
    "Turn Left": "turnleft",
    "Turn Right": "turnright",
    "Segnor's Loop Left": "sloopleft",
    "Segnor's Loop Right": "sloopright",
    "Tallon Roll Left": "trollleft",
    "Tallon Roll Right": "trollright",
    "Koiogran Turn": "kturn"
  };

  const STATIONARY_MANEUVER = XMA.Selector.maneuver(XMA.Maneuver.STATIONARY_0_HARD_0OR);

  const regex = cls => new RegExp(`(\\s|^)${cls}(\\s|$)`);

  const hasClass = (element, cls) => element.className.match(regex(cls));

  const addClass = (element, cls) => element.className + (hasClass(element, cls) ? "" : ` ${cls}`);

  const removeClass = (element, cls) =>
    element.className +
    (hasClass(element, cls) ? element.className.replace(regex(cls), " ") : element.className);

  const createManeuverIcon = (bearing0, speed0, difficulty) => {
    const defaultSrc = (bearing, speed) =>
      speed === 0
        ? "stop"
        : (speed === -1 ? "reverse" : "") + bearing.toLowerCase().replace(/ /g, "");
    const src = R.defaultTo(defaultSrc(bearing0, speed0), BEARING_TO_FONT[bearing0]);
    let difficultyClass = "";
    if (difficulty === "Easy") {
      difficultyClass = " green";
    } else if (difficulty === "Hard") {
      difficultyClass = " red";
    }
    const className = `xw-f8${difficultyClass}`;

    return ReactDOMFactories.span(
      {
        className
      },
      ReactDOMFactories.i({
        className: `xwing-miniatures-font xwing-miniatures-font-${src}`
      })
    );
  };

  const maneuverBearing = maneuver =>
    maneuver.bearing.startsWith("Reverse")
      ? maneuver.bearing.substring("Reverse ".length)
      : maneuver.bearing;

  const maneuverSpeed = maneuver =>
    (maneuver.bearing.startsWith("Reverse") ? -1 : 1) * maneuver.speed;

  const findManeuver = (maneuvers, bearingIn, speedIn) => {
    const isBearing = maneuver => R.equals(maneuverBearing(maneuver), bearingIn);
    const isSpeed = maneuver => R.equals(maneuverSpeed(maneuver), speedIn);

    return R.find(R.both(isBearing, isSpeed), maneuvers);
  };

  const determineMaximumSpeed = maneuvers =>
    R.reduce(
      (accum, maneuver) => Math.max(accum, maneuverSpeed(maneuver)),
      Number.NEGATIVE_INFINITY,
      maneuvers
    );

  const determineMinimumSpeed = maneuvers =>
    R.reduce(
      (accum, maneuver) => Math.min(accum, maneuverSpeed(maneuver)),
      Number.POSITIVE_INFINITY,
      maneuvers
    );

  // /////////////////////////////////////////////////////////////////////////////////////////////////
  class ManeuverChooser extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        element: undefined
      };

      this.selectionChanged = this.selectionChangedFunction.bind(this);
    }

    bearingFunction0(cells, speed) {
      const { isEditable, pilotId } = this.props;
      const maneuver = STATIONARY_MANEUVER;
      const { difficulty } = maneuver;
      const image = createManeuverIcon(undefined, speed, difficulty);

      cells.push(ReactUtilities.createCell(" ", cells.length, "b--xw-medium"));
      cells.push(ReactUtilities.createCell(" ", cells.length, "b--xw-medium"));
      cells.push(
        ReactUtilities.createCell(image, cells.length, "b--xw-medium xw-min-w1-5", {
          onClick: isEditable ? this.selectionChanged : undefined,
          "data-pilotid": pilotId,
          "data-maneuverkey": maneuver.key
        })
      );
      cells.push(ReactUtilities.createCell(" ", cells.length, "b--xw-medium"));
      cells.push(ReactUtilities.createCell(" ", cells.length, "b--xw-medium"));
    }

    bearingFunction(maneuverBearings, cells, speed, bearingValue) {
      if (maneuverBearings.includes(bearingValue)) {
        const { isEditable, maneuvers, pilotId } = this.props;
        const maneuver = findManeuver(maneuvers, bearingValue, speed);

        if (maneuver !== undefined) {
          const { difficulty } = maneuver;
          const image = createManeuverIcon(bearingValue, speed, difficulty);
          cells.push(
            ReactUtilities.createCell(image, cells.length, "b--xw-medium tc xw-min-w1-5", {
              onClick: isEditable ? this.selectionChanged : undefined,
              "data-pilotid": pilotId,
              "data-maneuverkey": maneuver.key
            })
          );
        } else {
          cells.push(ReactUtilities.createCell(" ", cells.length, "b--xw-medium xw-min-w1-5"));
        }
      }
    }

    selectionChangedFunction(event) {
      const { element: oldElement } = this.state;

      if (oldElement) {
        oldElement.className = removeClass(oldElement, "bg-xw-medium");
      }

      const element = event.currentTarget;
      const pilotId = element.dataset.pilotid;
      const maneuverKey = element.dataset.maneuverkey;
      this.setState({
        element
      });
      element.className = addClass(element, "bg-xw-medium");

      const { callback } = this.props;

      if (callback) {
        callback({
          pilotId,
          maneuverKey
        });
      }
    }

    render() {
      const { maneuvers, pilotName, shipName } = this.props;
      const minSpeed = determineMinimumSpeed(maneuvers);
      const maxSpeed = determineMaximumSpeed(maneuvers);
      const bearingValues = [
        "Turn Left",
        "Bank Left",
        "Straight",
        "Bank Right",
        "Turn Right",
        "Segnor's Loop Left",
        "Tallon Roll Left",
        "Koiogran Turn",
        "Segnor's Loop Right",
        "Tallon Roll Right"
      ];
      const maneuverBearings = R.map(R.prop("bearing"), maneuvers);
      const rows0 = [];

      if (pilotName !== undefined) {
        rows0.push(
          ReactUtilities.createRow(ReactUtilities.createCell(pilotName), rows0.length, "bg-xw-light black f6")
        );
      }

      if (shipName !== undefined) {
        rows0.push(
          ReactUtilities.createRow(ReactUtilities.createCell(shipName), rows0.length, "bg-xw-light black f6")
        );
      }

      const rows = [];

      for (let speed = maxSpeed; speed >= minSpeed; speed -= 1) {
        const cells = [];
        cells.push(ReactUtilities.createCell(speed, cells.length, "b--xw-medium center"));

        if (speed === 0 && maneuvers.includes(STATIONARY_MANEUVER)) {
          this.bearingFunction0(cells, speed);
        } else {
          bearingValues.forEach(bearingValue =>
            this.bearingFunction(maneuverBearings, cells, speed, bearingValue)
          );
        }

        rows.push(ReactUtilities.createRow(cells, rows.length));
      }

      const table = ReactUtilities.createTable(
        rows,
        rows0.length,
        "b--xw-medium bg-black tc w-100 white"
      );
      rows0.push(table);

      return ReactUtilities.createTable(rows0, undefined, "b--xw-medium bg-black center tc white");
    }
  }

  ManeuverChooser.propTypes = {
    maneuvers: PropTypes.arrayOf().isRequired,
    shipName: PropTypes.string.isRequired,

    callback: PropTypes.func,
    isEditable: PropTypes.bool,
    pilotName: PropTypes.string,
    pilotId: PropTypes.number
  };

  ManeuverChooser.defaultProps = {
    callback: undefined,
    isEditable: true,
    pilotName: undefined,
    pilotId: undefined
  };

  class PilotsUI extends React.PureComponent {
    render() {
      const {
        pilotInstances,
        pilotToDamages,
        pilotToStatBonuses,
        pilotToTokenCounts,
        pilotToUpgrades
      } = this.props;

      const pilotCells = pilotInstances.map((pilotInstance, i) => {
        const element = React.createElement(CardInstanceUI, {
          cardInstance: pilotInstance,
          damageInstances: pilotToDamages[pilotInstance.id],
          statBonuses: pilotToStatBonuses[pilotInstance.id],
          tokenCounts: pilotToTokenCounts[pilotInstance.id],
          upgradeInstances: pilotToUpgrades[pilotInstance.id]
        });
        return ReactUtilities.createCell(element, `pilotCell${i}`, "alignTop v-top");
      });

      const row = ReactUtilities.createRow(pilotCells);

      return ReactUtilities.createTable(row, "pilotsUITable", "center");
    }
  }

  PilotsUI.propTypes = {
    pilotInstances: PropTypes.arrayOf().isRequired,

    pilotToDamages: PropTypes.shape(),
    pilotToStatBonuses: PropTypes.shape(),
    pilotToTokenCounts: PropTypes.shape(),
    pilotToUpgrades: PropTypes.shape()
  };

  PilotsUI.defaultProps = {
    pilotToDamages: {},
    pilotToStatBonuses: {},
    pilotToTokenCounts: {},
    pilotToUpgrades: {}
  };

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
          pilotName: PilotUtilities.name(pilotInstance, true),
          shipName: pilotCard.ship,
          pilotId: pilotInstance.id,
          callback: this.selectionChanged
        });
        cells.push(ReactUtilities.createCell(element, cells.length, "v-top"));
      });

      const initialInput = ReactUtilities.createTable(ReactUtilities.createRow(cells));
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

  const ShipImage = {};

  const DEG_TO_RADIANS = Math.PI / 180.0;

  ShipImage.draw = (
    context0,
    scale,
    id,
    image,
    position,
    shipBase,
    factionColor,
    primaryFiringArcKey,
    auxiliaryFiringArcKey
  ) => {
    // Setup.
    const { height, width } = shipBase;
    const { x, y, heading } = position;
    const angle = heading * DEG_TO_RADIANS;
    const primaryFiringArc = Selector.firingArc(primaryFiringArcKey);
    const auxiliaryFiringArc = Selector.firingArc(auxiliaryFiringArcKey);

    const context = context0;
    context.save();
    context.scale(scale, scale);
    context.translate(x, y);
    context.rotate(angle);

    // Draw background square.
    context.fillStyle = "rgba(255,255,255,0.4)";
    context.fillRect(-width / 2, -height / 2, width, height);
    context.fillStyle = "rgba(255,255,255,0.2)";
    context.strokeStyle = factionColor;

    // Draw the auxiliary firing arc.
    if (auxiliaryFiringArc) {
      context.setLineDash([5, 4]);
      ShipImage.drawFiringArc(context, auxiliaryFiringArc.key, width, height);
      context.setLineDash([]);
    }

    // Draw the primary firing arc.
    if (primaryFiringArc) {
      ShipImage.drawFiringArc(context, primaryFiringArc.key, width, height);
    }

    // Draw ship image.
    let myWidth = width;
    let myHeight = height;

    if ([XMA.ShipBase.SMALL, XMA.ShipBase.LARGE].includes(shipBase.key)) {
      if (image.width < image.height) {
        myWidth = (width * image.width) / image.height;
      } else if (image.width > image.height) {
        myHeight = (height * image.height) / image.width;
      }
    }

    context.drawImage(image, -myWidth / 2, -myHeight / 2, myWidth, myHeight);

    if (id !== undefined) {
      // Draw the token ID.
      context.rotate(90 * DEG_TO_RADIANS);
      context.fillStyle = factionColor;
      context.font = "14px sans-serif";
      context.fillText(id, -height / 2, width / 2);
      context.rotate(-90 * DEG_TO_RADIANS);
    }

    // Cleanup.
    context.restore();
  };

  ShipImage.drawFiringArc = (context, firingArcKey, width, height) => {
    // Draw the firing arc.
    switch (firingArcKey) {
      case XMA.FiringArc.AUXILIARY_180:
        context.beginPath();
        context.moveTo(0, -height / 2);
        context.lineTo(0, 0);
        context.lineTo(0, height / 2);
        context.stroke();
        context.lineTo(width / 2, height / 2);
        context.lineTo(width / 2, -height / 2);
        context.fill();
        break;
      case XMA.FiringArc.AUXILIARY_REAR:
        context.beginPath();
        context.moveTo(-width / 2, -height / 2);
        context.lineTo(0, 0);
        context.lineTo(-width / 2, height / 2);
        context.fill();
        context.stroke();
        break;
      case XMA.FiringArc.BULLSEYE:
        context.beginPath();
        context.moveTo(8, -8);
        context.lineTo(width / 2, -8);
        context.moveTo(width / 2, 8);
        context.lineTo(8, 8);
        context.fill();
        context.stroke();
        break;
      case XMA.FiringArc.FRONT:
        context.beginPath();
        context.moveTo(width / 2, -height / 2);
        context.lineTo(0, 0);
        context.lineTo(width / 2, height / 2);
        context.fill();
        context.stroke();
        break;
      default:
        throw new Error(`Unknown firingArc: ${firingArcKey}`);
    }
  };

  const paintPathComponent = (path, context0, strokeStyle) => {
    if (path.length >= 2) {
      const context = context0;
      context.beginPath();
      context.moveTo(path[0], path[1]);

      for (let i = 2; i < path.length; i += 2) {
        context.lineTo(path[i], path[i + 1]);
      }

      context.strokeStyle = strokeStyle;
      context.stroke();
    }
  };

  class PlayAreaUI extends React.Component {
    constructor(props) {
      super(props);

      this.explosionImage = undefined;
      this.factionShipToImage = {};
    }

    componentDidMount() {
      this.loadImages();
      this.paint();
    }

    componentDidUpdate() {
      this.paint();
    }

    createShipIcon(faction, ship) {
      const image = new Image();
      image.onload = () => this.forceUpdate();

      const index = ship.faction.indexOf(faction.name);
      const filename = ship.images[index];
      image.src = Endpoint.ARTIFACT_RESOURCE + filename;

      return image;
    }

    drawExplosion(context) {
      const { explosion, scale } = this.props;

      if (explosion) {
        const { position, size } = explosion;
        const audioClip = document.getElementById("explosionAudio");

        const { x, y } = position;
        const width = size;
        const height = size;

        context.save();
        context.scale(scale, scale);
        context.translate(x, y);
        context.drawImage(this.explosionImage, -width / 2, -height / 2, width, height);

        audioClip.play();

        // Cleanup.
        context.restore();
      }
    }

    drawLaserBeam(context0) {
      const { laserBeam, scale } = this.props;

      if (laserBeam) {
        const { audioClip, color, fromPosition, isPrimary, toPosition } = laserBeam;

        const context = context0;
        context.save();
        context.scale(scale, scale);
        context.lineWidth = 3;
        context.strokeStyle = color;

        if (!isPrimary) {
          const lineDashSegments = [10, 5];
          context.setLineDash(lineDashSegments);
        }

        context.beginPath();
        context.moveTo(fromPosition.x, fromPosition.y);
        context.lineTo(toPosition.x, toPosition.y);
        context.stroke();

        if (audioClip) {
          audioClip.play();
        }

        // Cleanup.
        context.restore();
      }
    }

    drawManeuver(context0) {
      const { maneuver: maneuverObj, scale } = this.props;

      if (maneuverObj) {
        const { color, fromPosition, toPolygon } = maneuverObj;

        const context = context0;
        context.save();
        context.scale(scale, scale);

        // Mark the center.
        context.fillStyle = PlayAreaUI.FOREGROUND_COLOR;
        const radius = 4;
        context.beginPath();
        context.arc(fromPosition.x, fromPosition.y, radius, 0, 2 * Math.PI);
        context.fill();

        // Draw from ship base.
        paintPathComponent(maneuverObj.fromPolygon, context, PlayAreaUI.FOREGROUND_COLOR);

        if (toPolygon) {
          // Draw to ship base.
          paintPathComponent(toPolygon, context, PlayAreaUI.FOREGROUND_COLOR);
        }

        // Draw maneuver path.
        paintPathComponent(maneuverObj.path, context, color);

        // Cleanup.
        context.restore();
      }
    }

    drawShips(context) {
      const { pilotInstances, pilotToPosition, scale } = this.props;

      Object.values(pilotInstances).forEach(pilotInstance => {
        const { id } = pilotInstance;
        const faction = Selector.factionValueByPilot(pilotInstance.pilotKey);
        const shipKey = Selector.shipKeyByPilot(pilotInstance.pilotKey);
        const image = this.factionShipToImage[`${faction.key}|${shipKey}`];
        const position = pilotToPosition[pilotInstance.id];
        const shipBase = Selector.shipBaseValueByShip(shipKey);
        const factionColor = faction.color;
        const firingArcs = Selector.firingArcKeysByShip(shipKey);
        const primaryFiringArcKey = firingArcs.length > 0 ? firingArcs[0] : undefined;
        const auxiliaryFiringArcKey = firingArcs.length > 1 ? firingArcs[1] : undefined;

        ShipImage.draw(
          context,
          scale,
          id,
          image,
          position,
          shipBase,
          factionColor,
          primaryFiringArcKey,
          auxiliaryFiringArcKey
        );
      }, this);
    }

    loadImages() {
      const { pilotInstances } = this.props;
      const factionShips = [];

      Object.values(pilotInstances).forEach(pilotInstance => {
        const faction = Selector.factionValueByPilot(pilotInstance.pilotKey);
        const shipKey = Selector.shipKeyByPilot(pilotInstance.pilotKey);
        const factionShip = `${faction.key}|${shipKey}`;
        if (!factionShips.includes(factionShip)) {
          factionShips.push(factionShip);
        }
      });

      for (let i = 0; i < factionShips.length; i += 1) {
        const factionShip = factionShips[i];
        const faction = Selector.faction(factionShip.split("|")[0]);
        const ship = Selector.ship(factionShip.split("|")[1]);
        this.factionShipToImage[factionShip] = this.createShipIcon(faction, ship);
      }

      this.explosionImage = this.createExplosionImage();
    }

    paint() {
      const { height, width } = this.props;
      const canvas = document.getElementById("playAreaCanvas");
      const context = canvas.getContext("2d");

      context.clearRect(0, 0, width, height);

      this.drawShips(context);
      this.drawManeuver(context);
      this.drawLaserBeam(context);
      this.drawExplosion(context);
    }

    render() {
      const { height, image, resourceBase, width } = this.props;
      const imageSrc = resourceBase + image;

      return ReactDOMFactories.canvas({
        id: "playAreaCanvas",
        style: {
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: "100%"
        },
        width,
        height
      });
    }
  }

  PlayAreaUI.prototype.createExplosionImage = () => {
    const image = new Image();
    image.src = `${Endpoint.ARTIFACT_RESOURCE}ship/explosion.png`;

    return image;
  };

  PlayAreaUI.FOREGROUND_COLOR = "white";
  PlayAreaUI.EASY_COLOR = "lime";
  PlayAreaUI.HARD_COLOR = "red";

  PlayAreaUI.propTypes = {
    pilotInstances: PropTypes.shape().isRequired,
    pilotToPosition: PropTypes.shape().isRequired,

    height: PropTypes.number,
    image: PropTypes.string,
    resourceBase: PropTypes.string,
    scale: PropTypes.number,
    width: PropTypes.number,

    explosion: PropTypes.shape(),
    laserBeam: PropTypes.shape(),
    maneuver: PropTypes.shape()
  };

  PlayAreaUI.defaultProps = {
    height: 915,
    image: "background/pia13845.jpg",
    resourceBase: Endpoint.LOCAL_RESOURCE,
    scale: 1.0,
    width: 915,

    explosion: undefined,
    laserBeam: undefined,
    maneuver: undefined
  };

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

  const defenderInstancesForEach = (
    self,
    selectedWeaponKey,
    selectedDefenderId,
    rows
  ) => weaponKey => defenderInstance => {
    const input = ReactDOMFactories.input({
      key: 0,
      type: "radio",
      defaultChecked: weaponKey === selectedWeaponKey && defenderInstance.id === selectedDefenderId,
      onClick: self.selectionChanged,
      name: "weaponChooserRadioButtons",
      "data-weapon-key": weaponKey,
      "data-defender-id": defenderInstance.id
    });
    const span = ReactDOMFactories.span(
      {
        key: 1
      },
      PilotUtilities.name(defenderInstance)
    );
    const label = ReactDOMFactories.label({}, input, " ", span);
    const cell = ReactUtilities.createCell(label, undefined, "tl");
    rows.push(ReactUtilities.createRow(cell, rows.length));
  };

  const rangeKeysForEach = (rows, defenderInstancesForEach2) => (
    weaponKey,
    rangeToDefenders
  ) => rangeKey => {
    const rangeName = XMA.Selector.range(rangeKey).name;

    const cell = ReactUtilities.createCell(`Range ${rangeName}`, undefined, "bg-xw-medium");
    rows.push(ReactUtilities.createRow(cell, rows.length));

    const defenderInstances = rangeToDefenders[rangeKey];

    R.forEach(defenderInstancesForEach2(weaponKey), defenderInstances);
  };

  const weaponKeysForEach = (weaponToRangeToDefenders, rows, rangeKeysForEach2) => weaponKey => {
    const weaponName =
      weaponKey === "primary" ? "Primary Weapon" : XMA.Selector.upgradeCard(weaponKey).name;

    const cell = ReactUtilities.createCell(weaponName, undefined, "bg-xw-dark pv1 white");
    rows.push(ReactUtilities.createRow(cell, rows.length));

    const rangeToDefenders = weaponToRangeToDefenders[weaponKey];
    const rangeKeys = Object.keys(rangeToDefenders);

    R.forEach(rangeKeysForEach2(weaponKey, rangeToDefenders), rangeKeys);
  };

  // /////////////////////////////////////////////////////////////////////////////////////////////////
  class WeaponAndDefenderDialog extends React.Component {
    constructor(props) {
      super(props);

      let weaponKey;
      let defenderId;

      const { weaponToRangeToDefenders } = this.props;
      const weaponKeys = Object.keys(weaponToRangeToDefenders);

      if (weaponKeys.length > 0) {
        [weaponKey] = weaponKeys;
        const rangeToDefenders = weaponToRangeToDefenders[weaponKey];
        const rangeKeys = Object.keys(rangeToDefenders);

        if (rangeKeys.length > 0) {
          const rangeKey = rangeKeys[0];
          const defenders = rangeToDefenders[rangeKey];

          if (defenders.length > 0) {
            defenderId = defenders[0].id;
          }
        }
      }

      this.state = {
        weaponKey,
        defenderId
      };

      this.cancel = this.cancelFunction.bind(this);
      this.ok = this.okFunction.bind(this);
      this.selectionChanged = this.selectionChangedFunction.bind(this);
    }

    cancelFunction() {
      const { attackerInstance, callback } = this.props;
      callback({
        attackerId: attackerInstance.id
      });
    }

    okFunction() {
      const { attackerInstance, callback } = this.props;
      const { defenderId, weaponKey } = this.state;
      callback({
        attackerId: attackerInstance.id,
        weaponKey,
        defenderId
      });
    }

    selectionChangedFunction(event) {
      const { defenderId, weaponKey } = event.currentTarget.dataset;
      this.setState({
        weaponKey,
        defenderId
      });
    }

    render() {
      const { attackerInstance, weaponToRangeToDefenders } = this.props;
      const message = ReactDOMFactories.div({}, `Attacker: ${PilotUtilities.name(attackerInstance)}`);
      const { defenderId: selectedDefenderId, weaponKey: selectedWeaponKey } = this.state;
      const self = this;
      const rows = [];
      const weaponKeys = Object.keys(weaponToRangeToDefenders);

      const myDefenderInstancesForEach = defenderInstancesForEach(
        self,
        selectedWeaponKey,
        selectedDefenderId,
        rows
      );
      const myRangeKeysForEach = rangeKeysForEach(rows, myDefenderInstancesForEach);
      const myWeaponKeysForEach = weaponKeysForEach(
        weaponToRangeToDefenders,
        rows,
        myRangeKeysForEach
      );
      R.forEach(myWeaponKeysForEach, weaponKeys);

      const initialInput = ReactUtilities.createTable(rows, undefined, "f6");
      const cancelButton = ReactDOMFactories.button(
        {
          key: "cancelButton",
          onClick: self.cancel
        },
        "Cancel"
      );
      const okButton = ReactDOMFactories.button(
        {
          key: "okButton",
          onClick: self.ok
        },
        "OK"
      );
      const buttons = ReactDOMFactories.span({}, cancelButton, " ", okButton);

      return React.createElement(OptionPane, {
        panelClass: "optionPane",
        title: "Combat: Select Weapon and Defender",
        titleClass: "optionPaneTitle",
        message,
        messageClass: "optionPaneMessage",
        initialInput,
        buttons,
        buttonsClass: "optionPaneButtons"
      });
    }
  }

  WeaponAndDefenderDialog.propTypes = {
    attackerInstance: PropTypes.shape().isRequired,
    weaponToRangeToDefenders: PropTypes.arrayOf().isRequired,
    callback: PropTypes.func.isRequired
  };

  const reduceDamage = gameState => (accumulator, pilotInstance) => {
    const pilotId = pilotInstance.id;
    const newPilotToDamages = {};
    newPilotToDamages[pilotId] = Selector.damageInstancesByPilot(pilotId, gameState);
    return R.merge(accumulator, newPilotToDamages);
  };

  const reduceTokenCounts = gameState => (accumulator, pilotInstance) => {
    const pilotId = pilotInstance.id;
    const newPilotToTokenCounts = {};
    newPilotToTokenCounts[pilotId] = Selector.countsByPilot(pilotId, gameState);
    return R.merge(accumulator, newPilotToTokenCounts);
  };

  const reduceUpgrade = gameState => (accumulator, pilotInstance) => {
    const pilotId = pilotInstance.id;
    const newPilotToUpgrades = {};
    newPilotToUpgrades[pilotId] = Selector.upgradeInstancesByPilot(pilotId, gameState);
    return R.merge(accumulator, newPilotToUpgrades);
  };

  // /////////////////////////////////////////////////////////////////////////////////////////////////
  const PilotsContainer = (gameState, ownProps = {}) => {
    const { agentId } = ownProps;
    const pilotInstances = Selector.pilotInstancesByAgent(agentId, gameState);
    const pilotToDamages = R.reduce(reduceDamage(gameState), {}, pilotInstances);
    const pilotToTokenCounts = R.reduce(reduceTokenCounts(gameState), {}, pilotInstances);
    const pilotToUpgrades = R.reduce(reduceUpgrade(gameState), {}, pilotInstances);

    return React.createElement(PilotsUI, {
      pilotInstances,
      pilotToDamages,
      pilotToTokenCounts,
      pilotToUpgrades
    });
  };

  const createLaserBeam = laserBeamState => {
    // FIXME: choose audio clip by ship.
    const audioClip = document.getElementById("xWingLaserAudio");

    return R.merge(laserBeamState, {
      audioClip
    });
  };

  const PlayAreaContainer = (gameState, ownProps = {}) => {
    const playFormat = Selector.playFormat(gameState);
    const image = `background/${
    playFormat.key === XMA.PlayFormat.STANDARD ? "pia13845.jpg" : "horsehead_nebula_02092008.jpg"
  }`;
    const scale = ownProps !== undefined ? ownProps.scale : 1.0;

    const pilotToPosition = R.reduce(
      (accum, pilot) => R.assoc(pilot.id, pilot.position, accum),
      {},
      Selector.pilotInstances(gameState)
    );

    const { displayExplosion, displayLaserBeam, displayManeuver } = gameState;

    const laserBeam = displayLaserBeam !== undefined ? createLaserBeam(displayLaserBeam) : undefined;

    return React.createElement(PlayAreaUI, {
      height: playFormat.height,
      image,
      pilotInstances: gameState.pilotInstances,
      pilotToPosition,
      scale,
      width: playFormat.width,

      explosion: displayExplosion,
      laserBeam,
      maneuver: displayManeuver,
      resourceBase: ownProps.resourceBase
    });
  };

  const StatusBarContainer = (gameState, ownProps = {}) => {
    const { activePilotId, phaseKey, pilotInstances, round } = gameState;
    const activePilotInstance =
      activePilotId !== undefined ? pilotInstances[activePilotId] : undefined;
    const activeShipName =
      activePilotInstance !== undefined ? PilotUtilities.name(activePilotInstance) : "";
    const phaseName = Selector.phase(phaseKey).name;
    const { helpBase } = ownProps;

    return React.createElement(StatusBarUI, {
      activeShipName,
      phaseName,
      round,
      userMessage: Selector.userMessage(gameState),
      helpBase
    });
  };

  const XWingMiniaturesView = {};

  XWingMiniaturesView.drawView = ({ gameState, document, resourceBase = "../resource/" }) => {
    const statusBarContainer = StatusBarContainer(gameState);
    ReactDOM.render(statusBarContainer, document.getElementById("statusBarContainer"));

    const pilotArea1 = PilotsContainer(gameState, {
      agentId: 1
    });
    ReactDOM.render(pilotArea1, document.getElementById("pilotArea1"));

    // FIXME: display firstPilotInputArea

    const playAreaContainer = PlayAreaContainer(gameState, {
      resourceBase
    });
    ReactDOM.render(playAreaContainer, document.getElementById("playAreaContainer"));

    // FIXME: display secondPilotInputArea

    const pilotArea2 = PilotsContainer(gameState, {
      agentId: 2
    });
    ReactDOM.render(pilotArea2, document.getElementById("pilotArea2"));
  };

  exports.AbilityChooser = AbilityChooser;
  exports.AbilityDialog = AbilityDialog;
  exports.CardImage = CardImage;
  exports.CardInstancesArea = CardInstancesArea;
  exports.CardInstanceUI = CardInstanceUI;
  exports.CombatDialog = CombatDialog;
  exports.DicePanel = DicePanel;
  exports.EntityUI = EntityUI;
  exports.FactionUI = FactionUI;
  exports.ImageWithLabelUI = ImageWithLabelUI;
  exports.LabeledImage = LabeledImage;
  exports.ManeuverChooser = ManeuverChooser;
  exports.PilotsUI = PilotsUI;
  exports.PlanningDialog = PlanningDialog;
  exports.PlayAreaUI = PlayAreaUI;
  exports.ShipActionUI = ShipActionUI;
  exports.ShipImage = ShipImage;
  exports.ShipSilhouetteUI = ShipSilhouetteUI;
  exports.StatusBarUI = StatusBarUI;
  exports.TokenPanel = TokenPanel;
  exports.UpgradeSlotUI = UpgradeSlotUI;
  exports.WeaponAndDefenderDialog = WeaponAndDefenderDialog;
  exports.PilotsContainer = PilotsContainer;
  exports.PlayAreaContainer = PlayAreaContainer;
  exports.StatusBarContainer = StatusBarContainer;
  exports.Endpoint = Endpoint;
  exports.PilotUtilities = PilotUtilities;
  exports.ReactUtilities = ReactUtilities;
  exports.Selector = Selector;
  exports.XWingMiniaturesView = XWingMiniaturesView;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
