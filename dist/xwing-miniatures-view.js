(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
   typeof define === 'function' && define.amd ? define(['exports'], factory) :
   (factory((global.XMV = {})));
}(this, (function (exports) { 'use strict';

   const ReactUtilities = {};

   ReactUtilities.createButton = function(element, key, className, props = {})
   {
      const newProps = R.merge(props,
      {
         key: key,
         className: className
      });

      return ReactDOMFactories.button(newProps, element);
   };

   ReactUtilities.createCell = function(element, key, className, props = {})
   {
      const newProps = R.merge(props,
      {
         key: key,
         className: "dtc" + (className ? " " + className : "")
      });

      return ReactDOMFactories.div(newProps, element);
   };

   ReactUtilities.createFlexbox = function(cells, key, className, props = {})
   {
      const newProps = R.merge(props,
      {
         key: key,
         className: "flex" + (className ? " " + className : "")
      });

      return ReactDOMFactories.div(newProps, cells);
   };

   ReactUtilities.createFlexboxWrap = function(cells, key, className, props = {})
   {
      const newProps = R.merge(props,
      {
         key: key,
         className: "flex flex-wrap" + (className ? " " + className : "")
      });

      return ReactDOMFactories.div(newProps, cells);
   };

   ReactUtilities.createImg = function(src, key, className, props = {})
   {
      const newProps = R.merge(props,
      {
         src: src,
         key: key,
         className: className
      });

      return ReactDOMFactories.img(newProps);
   };

   ReactUtilities.createRow = function(cells, key, className, props = {})
   {
      const newProps = R.merge(props,
      {
         key: key,
         className: "dt-row" + (className ? " " + className : "")
      });

      return ReactDOMFactories.div(newProps, cells);
   };

   ReactUtilities.createSpan = function(element, key, className, props = {})
   {
      const newProps = R.merge(props,
      {
         key: key,
         className: className
      });

      return ReactDOMFactories.span(newProps, element);
   };

   ReactUtilities.createTable = function(rows, key, className, props = {})
   {
      const newProps = R.merge(props,
      {
         key: key,
         className: "dt" + (className ? " " + className : "")
      });

      return ReactDOMFactories.div(newProps, rows);
   };

   const Endpoint = {};

   Endpoint.ARTIFACT_RESOURCE = "https://cdn.jsdelivr.net/gh/jmthompson2015/xwing-miniatures-artifact@0.0.2/resource/";
   Endpoint.LOCAL_RESOURCE = "../../resource/";
   Endpoint.XWING_IMAGES = "https://cdn.jsdelivr.net/npm/xwing-data@1.0.1/images/";

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

   const FactionUI = props =>
   {
      const faction = props.faction;
      const src = props.resourceBase + faction.image;
      const size = (props.isSmall ? 24 : 32);

      return React.createElement(ImageWithLabelUI,
      {
         src: src,
         label: faction.name,
         showLabel: props.showLabel,
         width: size
      });
   };

   FactionUI.propTypes = {
      faction: PropTypes.object.isRequired,

      isSmall: PropTypes.bool,
      resourceBase: PropTypes.string,
      showLabel: PropTypes.bool
   };

   FactionUI.defaultProps = {
      isSmall: false,
      resourceBase: Endpoint.XWING_IMAGES,
      showLabel: false
   };

   class ShipActionUI extends React.Component
   {
      render()
      {
         const shipAction = this.props.shipAction;
         let className = "center tc v-mid";
         let src = shipAction.key.toLowerCase();

         if (shipAction.key === XMA.ShipAction.DECLOAK)
         {
            src = "cloak";
            className += " silver";
         }

         const image = ReactDOMFactories.span(
         {
            className: className,
            title: shipAction.name,
         }, ReactDOMFactories.i(
         {
            className: "xwing-miniatures-font xwing-miniatures-font-" + src,
         }));

         let answer = image;

         if (this.props.showLabel)
         {
            answer = ReactDOMFactories.span(
            {
               className: "v-mid",
            }, image, " ", shipAction.name);
         }

         return answer;
      }
   }

   ShipActionUI.propTypes = {
      shipAction: PropTypes.object.isRequired,

      showLabel: PropTypes.bool,
   };

   ShipActionUI.defaultProps = {
      showLabel: false,
   };

   class ShipSilhouetteUI extends React.Component
   {
      render()
      {
         const ship = this.props.ship;
         const shipName = ship.name.toLowerCase().replace(/[\.]/g, "").replace(/[ \/]/g, "-").replace("-(fore)", "").replace("-(aft)", "");
         const src = Endpoint.ARTIFACT_RESOURCE + "silhouette/" + shipName + ".png";
         const label = ship.name;

         return React.createElement(ImageWithLabelUI,
         {
            src: src,
            label: label,
            showLabel: this.props.showLabel,
         });
      }
   }

   ShipSilhouetteUI.propTypes = {
      ship: PropTypes.object.isRequired,
      resourceBase: PropTypes.string.isRequired,

      showLabel: PropTypes.bool,
   };

   ShipSilhouetteUI.defaultProps = {
      showLabel: false,
   };

   const UpgradeSlotUI = props =>
   {
      const upgradeSlot = props.upgradeSlot;
      const src = props.resourceBase + upgradeSlot.image;

      return React.createElement(ImageWithLabelUI,
      {
         src: src,
         label: upgradeSlot.name,
         showLabel: props.showLabel
      });
   };

   UpgradeSlotUI.propTypes = {
      upgradeSlot: PropTypes.object.isRequired,

      resourceBase: PropTypes.string,
      showLabel: PropTypes.bool
   };

   UpgradeSlotUI.defaultProps = {
      resourceBase: Endpoint.ARTIFACT_RESOURCE,
      showLabel: false
   };

   const DiceModification = XMA.DiceModification;
   const Faction = XMA.Faction;
   const Maneuver = XMA.Maneuver;
   const ShipAction = XMA.ShipAction;
   const UpgradeSlot = XMA.UpgradeSlot;

   class EntityUI extends React.Component
   {
      render()
      {
         const sourceName = this.props.sourceName;
         const sourceKey = this.props.sourceKey;
         const context = this.props.context;
         const title = createTitle(sourceName, sourceKey);
         const icon = createIcon(sourceName, sourceKey);
         const label = createLabel(sourceName, sourceKey, context, title);

         const cells = [];
         cells.push(ReactUtilities.createCell(icon, "iconPanel", "v-mid"));
         cells.push(ReactUtilities.createCell(label, "labelPanel", "ph1 v-mid"));
         const row = ReactUtilities.createRow(cells);

         return ReactUtilities.createTable(row, "entityUITable", this.props.panelClass);
      }
   }

   const DICE_TO_ACTION = {
     [DiceModification.ATTACK_SPEND_FOCUS]: ShipAction.FOCUS,
     [DiceModification.DEFENSE_SPEND_EVADE]: ShipAction.EVADE,
     [DiceModification.DEFENSE_SPEND_FOCUS]: ShipAction.FOCUS
   };

   const createIcon = function(sourceName, sourceKey)
   {
      const entity = getEntity(sourceName, sourceKey);
      let answer;

      switch (sourceName)
      {
         case "ConditionCard":
            // FIXME: find an icon for condition card
            break;
         case "DamageCard":
            const filename = Endpoint.ARTIFACT_RESOURCE + "token/critical-damage.png";
            answer = ReactDOMFactories.img(
            {
               src: filename,
               title: "Critical Damage",
               width: 24
            });
            break;
         case "DiceModification":
            const myShipActionKey = DICE_TO_ACTION[sourceKey];
            answer = React.createElement(ShipActionUI,
            {
               shipAction: XMA.Selector.shipAction(myShipActionKey)
            });
            break;
         case "PilotCard":
            answer = React.createElement(FactionUI,
            {
               faction: XMA.Selector.findEnumValueByName(entity.faction, Faction),
               isSmall: true
            });
            break;
         case "Ship":
            answer = React.createElement(ShipSilhouetteUI,
            {
               ship: entity
            });
            break;
         case "ShipAction":
            answer = React.createElement(ShipActionUI,
            {
               shipAction: entity
            });
            break;
         case "UpgradeCard":
            answer = React.createElement(UpgradeSlotUI,
            {
               upgradeSlot: XMA.Selector.findEnumValueByName(entity.slot, UpgradeSlot)
            });
            break;
         default:
            throw "EntityUI: Unknown entity sourceName: " + sourceName;
      }

      return answer;
   };

   const createLabel = (sourceName, sourceKey, context, title) =>
   {
      const entity = getEntity(sourceName, sourceKey);
      let name;

      switch (sourceName)
      {
         case "ConditionCard":
         case "DamageCard":
         case "DiceModification":
         case "PilotCard":
         case "Ship":
         case "UpgradeCard":
            name = entity.name;
            break;
         case "ShipAction":
            name = createShipActionLabel(entity, context);
            break;
         default:
            throw "EntityUI: Unknown entity sourceName: " + sourceName;
      }

      return ReactDOMFactories.span(
      {
         key: "labelCell",
         title: title,
      }, name);
   };

   const createShipActionLabel = function(shipAction, context)
   {
      let answer;
      const maneuverKey = (context !== undefined ? context.maneuverKey : undefined);
      const maneuver = (maneuverKey !== undefined ? Maneuver.properties[maneuverKey] : undefined);
      const token = (context !== undefined ? context.token : undefined);
      const defender = (context !== undefined ? context.defender : undefined);

      switch (shipAction.key)
      {
         case ShipAction.BARREL_ROLL:
            answer = "Barrel Roll " + context.direction;
            break;
         case ShipAction.BOOST:
            const parts = maneuver.bearing.split(" ");
            answer = "Boost " + parts[parts.length - 1];
            break;
         case ShipAction.COORDINATE:
            answer = "Coordinate: " + token.name();
            break;
         case ShipAction.DECLOAK:
            answer = "Decloak: " + maneuver.bearing.name + " " + maneuver.speed;
            break;
         case ShipAction.JAM:
            answer = "Jam: " + defender.name();
            break;
         case ShipAction.RECOVER:
            answer = "Recover" + (token.parent !== undefined ? ": " + token.name() : "");
            break;
         case ShipAction.REINFORCE:
            answer = "Reinforce" + (token.parent !== undefined ? ": " + token.name() : "");
            break;
         case ShipAction.SLAM:
            answer = "SLAM: " + maneuver.bearing.name + " " + maneuver.speed;
            break;
         case ShipAction.TARGET_LOCK:
            answer = "Target Lock: " + defender.name();
            break;
         default:
            answer = shipAction.name;
      }

      return answer;
   };

   const createTitle = function(sourceName, sourceKey)
   {
      const entity = getEntity(sourceName, sourceKey);
      let answer = "";

      switch (sourceName)
      {
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
            throw "EntityUI: Unknown entity sourceName: " + sourceName;
      }

      return answer;
   };

   const getEntity = (sourceName, sourceKey) =>
   {
      let answer;

      switch (sourceName)
      {
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
      }

      return answer;
   };

   EntityUI.propTypes = {
      sourceName: PropTypes.string.isRequired,
      sourceKey: PropTypes.string.isRequired,
      context: PropTypes.string.isRequired
   };

   class AbilityChooser extends React.Component
   {
      constructor(props)
      {
         super(props);

         this.state = {
            selected: this.props.initialAbility
         };

         this.handleChange = this.handleChangeFunction.bind(this);
      }

      render()
      {
         const abilities = this.props.abilities;
         const inputProps = R.merge(
         {
            name: "chooseAbility", // needed for radio
            onChange: this.handleChange,
            type: "radio"
         }, this.props.clientProps);

         let i = 0;
         const selected = this.state.selected;
         const mapFunction = ability =>
         {
            const input = ReactDOMFactories.input(R.merge(inputProps,
            {
               id: i,
               defaultChecked: (ability === selected)
            }));
            const label = labelFunction(ability);
            const cells = [];
            cells.push(ReactUtilities.createCell(input, cells.length, "pa1 v-mid"));
            cells.push(ReactUtilities.createCell(label, cells.length, "pa1 v-mid"));

            return ReactUtilities.createRow(cells, "row" + ability.sourceName + ability.sourceKey + i++);
         };
         const rows = R.map(mapFunction, abilities);

         return ReactUtilities.createTable(rows, undefined, this.props.panelClass);
      }
   }

   AbilityChooser.prototype.handleChangeFunction = function(event)
   {
      const id = event.target.id;
      const selected = this.props.abilities[id];

      this.setState(
         {
            selected: selected,
         },
         this.props.onChange(selected));
   };

   const labelFunction = function(ability)
   {
      return React.createElement(EntityUI,
      {
         sourceName: ability.sourceName,
         sourceKey: ability.sourceKey
      });
   };

   AbilityChooser.propTypes = {
      onChange: PropTypes.func.isRequired,
      abilities: PropTypes.array.isRequired,

      clientProps: PropTypes.object,
      initialAbility: PropTypes.object,
      panelClass: PropTypes.string,
   };

   AbilityChooser.defaultProps = {
      clientProps:
      {},
      panelClass: "bg-xw-light f6"
   };

   /*
    * Provides a React component which emulates a Java
    * <a href="http://docs.oracle.com/javase/6/docs/api/javax/swing/JOptionPane.html">JOptionPane</a>.
    */
   class OptionPane extends React.Component
   {
      constructor(props)
      {
         super(props);

         this.state = {
            input: this.props.initialInput
         };
      }

      render()
      {
         const rows = [];

         const cell0 = ReactDOMFactories.td(
         {
            colSpan: 2,
            className: "optionPaneTitle bg-xw-medium tc",
         }, this.props.title);
         rows.push(ReactDOMFactories.tr(
         {
            key: 0
         }, cell0));

         const cell10 = ReactDOMFactories.td(
         {
            key: 0,
            rowSpan: 2,
         }, this.props.icon);
         const cell11 = ReactDOMFactories.td(
         {
            key: 1,
            className: "optionPaneMessage",
         }, this.props.message);
         rows.push(ReactDOMFactories.tr(
         {
            key: 1
         }, [cell10, cell11]));

         const cell2 = ReactDOMFactories.td(
         {}, this.state.input);
         rows.push(ReactDOMFactories.tr(
         {
            key: 2
         }, cell2));

         const cell3 = ReactDOMFactories.td(
         {
            colSpan: 2,
            className: "optionPaneButtons pa2 tr",
         }, this.props.buttons);
         rows.push(ReactDOMFactories.tr(
         {
            key: 3
         }, cell3));

         return ReactDOMFactories.table(
         {
            className: "optionPane ba b--xw-medium bg-xw-light center v-top",
         }, ReactDOMFactories.tbody(
         {}, rows));
      }
   }

   OptionPane.propTypes = {
      buttons: PropTypes.object.isRequired,
      message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
      title: PropTypes.string.isRequired,

      initialInput: PropTypes.object,
      icon: PropTypes.object,
   };

   class AbilityDialog extends React.Component
   {
      constructor(props)
      {
         super(props);

         this.myOnChange = this.myOnChangeFunction.bind(this);
         this.ok = this.okFunction.bind(this);
      }

      render()
      {
         const activePilotName = this.props.activePilotName;
         const message = "Active Ship: " + activePilotName;
         const okButton = ReactDOMFactories.button(
         {
            key: 0,
            onClick: this.ok,
         }, "Pass");
         const buttons = ReactDOMFactories.span(
         {}, [okButton]);

         const initialInput = React.createElement(AbilityChooser,
         {
            abilities: this.props.abilities,
            onChange: this.myOnChange,
         });

         const title = "Select Ability";

         return React.createElement(OptionPane,
         {
            panelClass: "optionPane bg-xw-light",
            title: title,
            titleClass: "optionPaneTitle bg-moon-gray",
            message: message,
            messageClass: "combatMessage",
            initialInput: initialInput,
            buttons: buttons,
            buttonsClass: "optionPaneButtons pa2 tr",
         });
      }
   }

   AbilityDialog.prototype.myOnChangeFunction = function(selected)
   {
      console.log("AbilityDialog.myOnChange() selected = " + JSON.stringify(selected) + " " + (typeof selected));

      this.props.onChange(selected);
   };

   AbilityDialog.prototype.okFunction = function()
   {
      const isAccepted = false;
      this.props.onChange(undefined, undefined, undefined, isAccepted);
   };

   AbilityDialog.propTypes = {
      abilities: PropTypes.array.isRequired,
      activePilotName: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired
   };

   const CardImage = props =>
   {
      const card = props.card;
      const width = props.width;
      const canvasId = "CardImageCanvas" + card.key + props.isFaceUp + width;
      const src = props.resourceBase + card.image;

      return ReactDOMFactories.img(
      {
         key: canvasId,
         className: "br3",
         src: src,
         title: card.name,
         width: width,
      });
   };

   CardImage.propTypes = {
      card: PropTypes.object.isRequired,

      isFaceUp: PropTypes.bool,
      resourceBase: PropTypes.string,
      width: PropTypes.number,
   };

   CardImage.defaultProps = {
      isFaceUp: true,
      resourceBase: Endpoint.XWING_IMAGES,
      width: 250
   };

   const PilotUtilities = {};

   PilotUtilities.name = (pilotInstance, isShort) =>
   {
      const pilotCard = XMA.Selector.pilotCard(pilotInstance.pilotKey);
      let answer = pilotInstance.id + (pilotCard.unique ? " \u2022 " : " ") + pilotCard.name;

      if (!isShort)
      {
         const ship = XMA.Selector.shipValueByPilot(pilotInstance.pilotKey);
         answer += " (" + ship.name + ")";
      }

      return answer;
   };

   Object.freeze(PilotUtilities);

   const Selector = {};

   Selector.countsByPilot = (pilotId, gameState) => XMS.Selector.countsByPilot(pilotId, gameState);

   Selector.damageCard = damageKey => XMA.Selector.damageCard(damageKey);

   Selector.damageInstancesByPilot = (pilotId, gameState) => XMS.Selector.damageInstancesByPilot(pilotId, gameState);

   Selector.faction = factionKey => XMA.Selector.faction(factionKey);

   Selector.factionValueByPilot = pilotKey => XMA.Selector.factionValueByPilot(pilotKey);

   Selector.firingArc = firingArcKey => XMA.Selector.firingArc(firingArcKey);

   Selector.firingArcKeysByShip = shipKey => XMA.Selector.firingArcKeysByShip(shipKey);

   Selector.maneuver = maneuverKey => XMA.Selector.maneuver(maneuverKey);

   Selector.phase = phaseKey => XMA.Selector.phase(phaseKey);

   Selector.pilotCard = pilotKey => XMA.Selector.pilotCard(pilotKey);

   Selector.pilotInstances = gameState => XMS.Selector.pilotInstances(gameState);

   Selector.pilotInstancesByAgent = (agentId, gameState) => XMS.Selector.pilotInstancesByAgent(agentId, gameState);

   Selector.playFormat = gameState => XMA.Selector.playFormat(XMS.Selector.playFormatKey(gameState));

   Selector.positionByPilot = (pilotId, gameState) => XMS.Selector.positionByPilot(pilotId, gameState);

   Selector.referenceCard = referenceKey => XMA.Selector.referenceCard(referenceKey);

   Selector.ship = shipKey => XMA.Selector.ship(shipKey);

   Selector.shipBase = shipBaseKey => XMA.Selector.shipBase(shipBaseKey);

   Selector.shipBaseValueByShip = shipKey => XMA.Selector.shipBaseValueByShip(shipKey);

   Selector.shipKeyByPilot = pilotKey => XMA.Selector.shipKeyByPilot(pilotKey);

   Selector.shipValueByPilot = pilotKey => XMA.Selector.shipValueByPilot(pilotKey);

   Selector.targetLocksByAttacker = (attackerId, gameState) =>
   {
      const targetLocks = XMS.Selector.targetLocksByAttacker(attackerId, gameState);

      return R.map(mapAttackerTargetLock(gameState), targetLocks);
   };

   Selector.targetLocksByDefender = (defenderId, gameState) =>
   {
      const targetLocks = XMS.Selector.targetLocksByDefender(defenderId, gameState);

      return R.map(mapDefenderTargetLock(gameState), targetLocks);
   };

   Selector.upgradeCard = upgradeKey => XMA.Selector.upgradeCard(upgradeKey);

   Selector.upgradeInstances = (pilotId, gameState) => R.defaultTo([], XMS.Selector.upgradesByPilot(pilotId, gameState));

   Selector.upgradeInstancesByPilot = (pilotId, gameState) => XMS.Selector.upgradeInstancesByPilot(pilotId, gameState);

   Selector.upgradeSlot = slotKey => XMA.Selector.upgradeSlot(slotKey);

   Selector.userMessage = gameState => XMS.Selector.userMessage(gameState);

   const mapAttackerTargetLock = gameState => lock =>
   {
      const defenderInstance = XMS.Selector.pilotInstance(lock.defenderId, gameState);

      return (
      {
         id: lock.id,
         defenderName: PilotUtilities.name(defenderInstance)
      });
   };

   const mapDefenderTargetLock = gameState => lock =>
   {
      const attackerInstance = XMS.Selector.pilotInstance(lock.attackerId, gameState);

      return (
      {
         id: lock.id,
         attackerName: PilotUtilities.name(attackerInstance)
      });
   };

   class CardInstancesArea extends React.Component
   {
      constructor(props)
      {
         super(props);

         this.state = {
            isExpanded: this.props.isExpanded,
         };

         this.toggleExpand = this.toggleExpandFunction.bind(this);
      }

      render()
      {
         const rows = [];

         rows.push(this.createLabelUI());
         rows.push(this.createCardInstanceCells());

         return ReactUtilities.createTable(rows, undefined);
      }
   }

   CardInstancesArea.prototype.createCardInstanceCells = function()
   {
      const cardInstanceUIs = this.props.cardInstanceUIs;
      const isExpanded = this.state.isExpanded;

      const cells = cardInstanceUIs.map(function(cardInstanceUI, i)
      {
         let myClassName;

         if (isExpanded || i === cardInstanceUIs.length - 1)
         {
            myClassName = "dtc pa1 v-mid";
         }
         else if (i < cardInstanceUIs.length - 1)
         {
            myClassName = "dn";
         }

         return ReactDOMFactories.div(
         {
            key: "cardCell" + i,
            className: myClassName,
         }, cardInstanceUI);
      });

      const cell = ReactUtilities.createCell(cells);

      return ReactUtilities.createRow(cell, "mainRow");
   };

   CardInstancesArea.prototype.createLabelUI = function()
   {
      const label = ReactUtilities.createCell(this.props.label, "labelCell", "b tc");

      const cardCount = this.props.cardInstanceUIs.length;
      const isExpanded = this.state.isExpanded;
      const expandLabel = (cardCount > 1 ? (isExpanded ? "\u25B6" : "\u25BC") : "");
      const expandControl = ReactDOMFactories.div(
      {
         key: "expandCell",
         onClick: this.toggleExpand,
      }, expandLabel);

      const row = ReactUtilities.createRow([label, expandControl], "labelExpandRow");
      const table = ReactUtilities.createTable(row, "labelExpandTable", "w-100");

      const tableCell = ReactUtilities.createCell(table, "tableCell");
      return ReactUtilities.createRow(tableCell, "labelRow");
   };

   CardInstancesArea.prototype.toggleExpandFunction = function()
   {
      this.setState(
      {
         isExpanded: !this.state.isExpanded,
      });
   };

   CardInstancesArea.propTypes = {
      cardInstanceUIs: PropTypes.array.isRequired,

      isExpanded: PropTypes.bool,
      label: PropTypes.string, // default: undefined
   };

   CardInstancesArea.defaultProps = {
      isExpanded: true,
   };

   const LabeledImage = props =>
   {
      let answer;
      const label = props.label;
      const containerStyle = LabeledImage.createContainerStyle(props);

      if (!props.showOne && label === "1")
      {
         answer = ReactDOMFactories.div(
         {
            title: props.title,
            style: containerStyle
         });
      }
      else
      {
         const cell = ReactDOMFactories.div(
         {
            className: props.labelClass,
            style:
            {
               display: "table-cell",
               verticalAlign: "middle"
            },
         }, label);

         answer = ReactDOMFactories.div(
         {
            title: props.title,
            style: containerStyle
         }, cell);
      }

      return answer;
   };

   LabeledImage.createContainerStyle = function(props)
   {
      const backgroundImage = 'url(' + props.resourceBase + props.image + ')';
      const height = props.height;
      const width = props.width;
      const backgroundSize = width + "px " + height + "px";

      return (
      {
         backgroundImage: backgroundImage,
         backgroundPosition: "alignCenter",
         backgroundRepeat: "no-repeat",
         backgroundSize: backgroundSize,
         display: "table",
         minHeight: height,
         minWidth: width
      });
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

   const TokenPanel = props =>
   {
      const rows = [];

      const statBonuses = props.statBonuses;
      TokenPanel.maybeAddBonus(rows, statBonuses.pilotSkill, "elite", "Pilot Skill", "orange");
      TokenPanel.maybeAddBonus(rows, statBonuses.primaryWeapon, "attack", "Primary Weapon", "red");
      TokenPanel.maybeAddBonus(rows, statBonuses.energy, "energy", "Energy", "xw-violet");
      TokenPanel.maybeAddBonus(rows, statBonuses.agility, "agility", "Agility", "xw-green");
      TokenPanel.maybeAddBonus(rows, statBonuses.hull, "hull", "Hull", "yellow");
      TokenPanel.maybeAddBonus(rows, statBonuses.shield, "shield", "Shield", "xw-cyan");

      const tokenCounts = props.tokenCounts;
      TokenPanel.maybeAddToken(props, rows, tokenCounts.cloak, "token/cloak.png", "Cloak");
      TokenPanel.maybeAddToken(props, rows, tokenCounts.energy, "token/energy.png", "Energy");
      TokenPanel.maybeAddToken(props, rows, tokenCounts.evade, "token/evade.png", "Evade");
      TokenPanel.maybeAddToken(props, rows, tokenCounts.focus, "token/focus.png", "Focus");
      TokenPanel.maybeAddToken(props, rows, tokenCounts.ion, "token/ion.png", "Ion");
      TokenPanel.maybeAddToken(props, rows, tokenCounts.ordnance, "token/ordnance.png", "Ordnance");
      TokenPanel.maybeAddToken(props, rows, tokenCounts.reinforce, "token/reinforce.png", "Reinforce");
      TokenPanel.maybeAddToken(props, rows, tokenCounts.shield, "token/shield.png", "Shield");
      TokenPanel.maybeAddToken(props, rows, tokenCounts.stress, "token/stress.png", "Stress");
      TokenPanel.maybeAddToken(props, rows, tokenCounts.tractorBeam, "token/tractor-beam.png", "Tractor Beam");
      TokenPanel.maybeAddToken(props, rows, tokenCounts.weaponsDisabled, "token/weapons-disabled.png", "Weapons Disabled");

      const attackerTargetLocks = props.attackerTargetLocks;

      attackerTargetLocks.forEach(function(targetLock)
      {
         const title = "Target Lock to " + targetLock.defenderName;
         TokenPanel.addTargetLock(props, rows, targetLock, "token/target-lock-attack.png", title);
      });

      const defenderTargetLocks = props.defenderTargetLocks;

      defenderTargetLocks.forEach(function(targetLock)
      {
         const title = "Target Lock from " + targetLock.attackerName;
         TokenPanel.addTargetLock(props, rows, targetLock, "token/target-lock-defend.png", title);
      });

      TokenPanel.maybeAddToken(props, rows, tokenCounts.damage, "token/damage.png", "Damage", "b black");
      TokenPanel.maybeAddToken(props, rows, tokenCounts.criticalDamage, "token/critical-damage.png", "Critical Damage", "b black");

      return ReactUtilities.createFlexboxWrap(rows, props.myKey, "content-center flex-column justify-center");
   };

   TokenPanel.addTargetLock = function(props, rows, targetLock, src, title)
   {
      const element = React.createElement(LabeledImage,
      {
         image: src,
         resourceBase: props.resourceBase,
         label: targetLock.id,
         labelClass: "b f5 white",
         title: title,
         width: 38
      });

      const key = "targetLock" + targetLock.attackerName + targetLock.defenderName;
      const cell = ReactUtilities.createCell(element, key, "tc v-mid");
      rows.push(ReactUtilities.createRow(cell, key, "tc v-mid"));
   };

   TokenPanel.maybeAddBonus = function(rows, count, src, title, labelClass)
   {
      if (count !== undefined && count !== 0)
      {
         const value = (count > 0 ? "+" : "") + count;
         const symbol = ReactDOMFactories.span(
         {
            key: "symbol",
            className: "f6 " + labelClass
         }, ReactDOMFactories.i(
         {
            className: "xwing-miniatures-font xwing-miniatures-font-" + src
         }));

         const cell = ReactUtilities.createCell([value, symbol], "bonusCell" + title + rows.length, "tc v-mid",
         {
            title: title
         });
         rows.push(ReactUtilities.createRow(cell, "bonusRow" + title + rows.length, "tc v-mid"));
      }
   };

   TokenPanel.maybeAddToken = function(props, rows, count, src, title, labelClassIn)
   {
      if (count !== undefined && count !== 0)
      {
         const labelClass = (labelClassIn !== undefined ? labelClassIn : "b white");
         const labeledImage = React.createElement(LabeledImage,
         {
            image: src,
            label: "" + count,
            labelClass: labelClass,
            resourceBase: props.resourceBase,
            title: title
         });

         const cell = ReactUtilities.createCell(labeledImage, "tokenCell" + title + rows.length, "tc v-mid");
         rows.push(ReactUtilities.createRow(cell, "tokenRow" + title + rows.length, "tc v-mid"));
      }
   };

   TokenPanel.propTypes = {
      resourceBase: PropTypes.string.isRequired,

      attackerTargetLocks: PropTypes.array,
      defenderTargetLocks: PropTypes.array,
      myKey: PropTypes.string,
      statBonuses: PropTypes.object,
      tokenCounts: PropTypes.object
   };

   TokenPanel.defaultProps = {
      attackerTargetLocks: [],
      defenderTargetLocks: [],
      myKey: "tokenPanel",
      resourceBase: Endpoint.ARTIFACT_RESOURCE,
      statBonuses:
      {},
      tokenCounts:
      {}
   };

   class CardInstanceUI extends React.Component
   {
      constructor(props)
      {
         super(props);

         this.state = {
            isSmall: true,
         };

         this.toggleSize = this.toggleSizeFunction.bind(this);
      }

      render()
      {
         const columns = [];
         const cardInstance = this.props.cardInstance;

         if (cardInstance)
         {
            const image = this.createCardImage(cardInstance);
            const tokenPanel = this.createTokenPanel(cardInstance.id);
            const cell = ReactDOMFactories.div(
            {
               key: "imagePanel" + columns.length,
               className: "v-mid",
               onClick: this.toggleSize,
            }, image);

            columns.push(cell);
            columns.push(tokenPanel);
            this.createAttachmentPanel(columns);
         }

         return ReactUtilities.createFlexboxWrap(columns, "cardInstanceUI", "bg-xw-medium items-center justify-center ma0 pa0");
      }
   }

   CardInstanceUI.prototype.toggleSizeFunction = function()
   {
      this.setState(
      {
         isSmall: !this.state.isSmall,
      });
   };

   CardInstanceUI.prototype.createAttachmentPanel = function(columns)
   {
      const attachments = [];
      const upgrades = this.props.upgradeInstances;

      if (upgrades.length > 0)
      {
         for (let i = 0; i < upgrades.length; i++)
         {
            const upgradeInstance = upgrades[i];
            const upgradeUI = this.createAttachmentUI(upgradeInstance);
            attachments.push(upgradeUI);
         }
      }

      const damages = this.props.damageInstances;

      if (damages.length > 0)
      {
         for (let j = 0; j < damages.length; j++)
         {
            const damageInstance = damages[j];
            const damageUI = this.createAttachmentUI(damageInstance);
            attachments.push(damageUI);
         }
      }

      columns.push(React.createElement(CardInstancesArea,
      {
         key: "attachmentPanel",
         cardInstanceUIs: attachments,
         isExpanded: false
      }));
   };

   CardInstanceUI.prototype.createAttachmentUI = function(cardInstance)
   {
      return React.createElement(CardInstanceUI,
      {
         key: "attachment" + cardInstance.id,
         cardInstance: cardInstance,
         width: this.props.width / 1.4,
      });
   };

   CardInstanceUI.prototype.createCardImage = function(cardInstance)
   {
      let width = this.props.width;

      if (this.state.isSmall)
      {
         width /= 2;
      }

      let card;

      if (cardInstance.pilotKey !== undefined)
      {
         card = Selector.pilotCard(cardInstance.pilotKey);
      }
      else if (cardInstance.upgradeKey !== undefined)
      {
         card = Selector.upgradeCard(cardInstance.upgradeKey);
      }
      else if (cardInstance.damageKey !== undefined)
      {
         card = Selector.damageCard(cardInstance.damageKey);
      }

      return React.createElement(CardImage,
      {
         card: card,
         width: width
      });
   };

   CardInstanceUI.prototype.createTokenPanel = function(cardId)
   {
      let props = {
         key: "token" + cardId,
         attackerTargetLocks: this.props.attackerTargetLocks,
         defenderTargetLocks: this.props.defenderTargetLocks,
         statBonuses: this.props.statBonuses,
         tokenCounts: this.props.tokenCounts
      };

      return React.createElement(TokenPanel, props);
   };

   CardInstanceUI.propTypes = {
      attackerTargetLocks: PropTypes.array,
      cardInstance: PropTypes.object,
      damageInstances: PropTypes.array,
      defenderTargetLocks: PropTypes.array,
      statBonuses: PropTypes.object,
      tokenCounts: PropTypes.object,
      upgradeInstances: PropTypes.array,
      width: PropTypes.number
   };

   CardInstanceUI.defaultProps = {
      attackerTargetLocks: [],
      damageInstances: [],
      defenderTargetLocks: [],
      statBonuses:
      {},
      tokenCounts:
      {},
      upgradeInstances: [],
      width: 250
   };

   class DicePanel extends React.Component
   {
      render()
      {
         const enumClass = this.props.enumClass;
         const diceKeys = this.props.diceKeys;
         const sortedKeys = sortDiceKeys(enumClass)(diceKeys);
         let count = 0;
         const mapFunction = diceKey => ReactUtilities.createCell(createImage(enumClass, diceKey), count++, "pa1");
         const cells = R.map(mapFunction, sortedKeys);

         const row = ReactUtilities.createRow(cells);

         return ReactUtilities.createTable(row, undefined, "center");
      }
   }

   const createImage = function(enumClass, diceKey)
   {
      const diceValue = diceKeyToValue(enumClass)(diceKey);
      const source = Endpoint.ARTIFACT_RESOURCE + diceValue.image;

      return ReactUtilities.createImg(source, undefined, undefined,
      {
         width: 32
      });
   };

   const diceKeyToValue = enumClass => (enumClass === XMA.AttackDiceValue ? XMA.Selector.attackDiceValue : XMA.Selector.defenseDiceValue);

   const diceKeysToValues = enumClass => R.map(diceKeyToValue(enumClass));

   const diceValuesToKeys = R.map(value => value.key);

   const sortDiceKeys = enumClass => diceKeys => R.pipe(diceKeysToValues(enumClass), sortDiceValues, diceValuesToKeys)(diceKeys);

   const sortDiceValues = R.sortBy(R.prop("sortOrder"));

   DicePanel.propTypes = {
      enumClass: PropTypes.object.isRequired,

      diceKeys: PropTypes.object
   };

   DicePanel.defaultProps = {
      diceKeys: []
   };

   const Phase = XMA.Phase;

   class CombatDialog extends React.Component
   {
      constructor(props)
      {
         super(props);

         this.ok = this.okFunction.bind(this);
      }

      render()
      {
         const phaseKey = this.props.phaseKey;
         const combatInstance = this.props.combatInstance;
         const attackerInstance = this.props.attackerInstance;
         const defenderInstance = this.props.defenderInstance;
         const abilities = this.props.abilities;

         const attackerCard = XMA.Selector.pilotCard(attackerInstance.pilotKey);
         const defenderCard = XMA.Selector.pilotCard(defenderInstance.pilotKey);
         const weaponValue = (combatInstance.weaponKey === "primary" ?
         {
            name: "Primary Weapon"
         } : XMA.Selector.upgradeCard(combatInstance.weaponKey));

         const rows = [];

         // Attacker label.
         const cell0 = ReactUtilities.createCell(ReactUtilities.createSpan("Attacker: " + attackerCard.name));
         rows.push(ReactUtilities.createRow(cell0, rows.length));

         // Weapon label.
         const cell1 = ReactUtilities.createCell(ReactUtilities.createSpan("Weapon: " + weaponValue.name));
         rows.push(ReactUtilities.createRow(cell1, rows.length));

         // Attack Dice panel.
         const attackPanel = React.createElement(DicePanel,
         {
            enumClass: XMA.AttackDiceValue,
            diceKeys: combatInstance.attackDiceKeys,
         });
         const cell2 = ReactUtilities.createCell(attackPanel);
         rows.push(ReactUtilities.createRow(cell2, rows.length));

         if (phaseKey === Phase.COMBAT_MODIFY_ATTACK_DICE && abilities.length > 0)
         {
            // Modify Attack Dice panel.
            const modifyAttackPanel = React.createElement(CombatDialog.ModifyAttackUI,
            {
               attacker: attackerInstance,
               resourceBase: this.props.resourceBase,
               abilities: abilities,
               onChange: this.ok,
            });

            const cell3 = ReactUtilities.createCell(modifyAttackPanel);
            rows.push(ReactUtilities.createRow(cell3, rows.length));
         }

         // Defender label.
         const cell4 = ReactUtilities.createCell(ReactUtilities.createSpan("Defender: " + defenderCard.name));
         rows.push(ReactUtilities.createRow(cell4, rows.length));

         if (combatInstance.defenseDiceKeys.length > 0)
         {
            // Defense Dice panel.
            const defensePanel = React.createElement(DicePanel,
            {
               enumClass: XMA.DefenseDiceValue,
               diceKeys: combatInstance.defenseDiceKeys,
            });

            const cell5 = ReactUtilities.createCell(defensePanel);
            rows.push(ReactUtilities.createRow(cell5, rows.length));

            if (phaseKey === Phase.COMBAT_MODIFY_DEFENSE_DICE && abilities.length > 0)
            {
               // Modify Defense Dice panel.
               const modifyDefensePanel = React.createElement(CombatDialog.ModifyDefenseUI,
               {
                  defender: defenderInstance,
                  resourceBase: this.props.resourceBase,
                  abilities: abilities,
                  onChange: this.ok,
               });

               const cell6 = ReactUtilities.createCell(modifyDefensePanel);
               rows.push(ReactUtilities.createRow(cell6, rows.length));
            }
         }

         if (phaseKey === Phase.COMBAT_NOTIFY_DAMAGE)
         {
            // Damage panel.
            const damagePanel = React.createElement(CombatDialog.DamageUI,
            {
               criticalDamage: combatInstance.criticalDamage,
               hitDamage: combatInstance.hitDamage,
               shieldDamage: combatInstance.shieldDamage
            });

            const cell7 = ReactUtilities.createCell(damagePanel);
            rows.push(ReactUtilities.createRow(cell7, rows.length));
         }

         const message = ReactUtilities.createTable(rows, "combatDialogTable", "center");
         const okButton = ReactUtilities.createButton("OK", "okButton", undefined,
         {
            onClick: this.ok
         });
         const buttons = ReactUtilities.createSpan([okButton]);

         return React.createElement(OptionPane,
         {
            title: "Combat: " + PHASE_TO_TITLE[phaseKey],
            message: message,
            buttons: buttons,
         });
      }
   }

   CombatDialog.prototype.okFunction = function(ability)
   {
      let answer;

      if (ability && ability.sourceName)
      {
         answer = ability;
      }

      const myOkFunction = this.props.okFunction;
      myOkFunction(answer);
   };

   class ModifyAttackUI extends React.Component
   {
      constructor(props)
      {
         super(props);

         this.myOnChange = this.myOnChangeFunction.bind(this);
      }

      render()
      {
         const abilities = this.props.abilities;

         return React.createElement(AbilityChooser,
         {
            abilities: abilities,
            onChange: this.myOnChange
         });
      }
   }

   ModifyAttackUI.prototype.myOnChangeFunction = function(selected)
   {
      console.log("ModifyAttackUI.myOnChange() selected = " + JSON.stringify(selected) + " " + (typeof selected));
      this.props.onChange(selected);
   };

   ModifyAttackUI.propTypes = {
      abilities: PropTypes.array.isRequired,
      onChange: PropTypes.func.isRequired
   };

   CombatDialog.ModifyAttackUI = ModifyAttackUI;

   class ModifyDefenseUI extends React.Component
   {
      constructor(props)
      {
         super(props);

         this.myOnChange = this.myOnChangeFunction.bind(this);
      }

      render()
      {
         const abilities = this.props.abilities;

         return React.createElement(AbilityChooser,
         {
            abilities: abilities,
            onChange: this.myOnChange
         });
      }
   }

   ModifyDefenseUI.prototype.myOnChangeFunction = function(selected)
   {
      console.log("ModifyDefenseUI.myOnChange() selected = " + JSON.stringify(selected) + " " + (typeof selected));
      this.props.onChange(selected);
   };

   ModifyDefenseUI.propTypes = {
      abilities: PropTypes.array.isRequired,
      onChange: PropTypes.func.isRequired,
   };

   CombatDialog.ModifyDefenseUI = ModifyDefenseUI;

   /*
    * Provides a user interface for damage.
    */
   class DamageUI extends React.Component
   {
      render()
      {
         const shieldDamage = this.props.shieldDamage;
         const shieldImage = ReactDOMFactories.span(
         {
            className: "f4 xw-cyan",
         }, ReactDOMFactories.i(
         {
            className: "xwing-miniatures-font xwing-miniatures-font-shield",
         }));

         const hitDamage = this.props.hitDamage;
         const hitFilename = Endpoint.ARTIFACT_RESOURCE + "token/damage.png";
         const hitImage = ReactUtilities.createImg(hitFilename, undefined, "pa1 v-mid",
         {
            title: "Damage",
            width: 32
         });

         const criticalDamage = this.props.criticalDamage;
         const criticalFilename = Endpoint.ARTIFACT_RESOURCE + "token/critical-damage.png";
         const criticalImage = ReactUtilities.createImg(criticalFilename, undefined, "pa1 v-mid",
         {
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

   DamageUI.propTypes = {
      criticalDamage: PropTypes.number.isRequired,
      hitDamage: PropTypes.number.isRequired,
      shieldDamage: PropTypes.number.isRequired
   };

   CombatDialog.DamageUI = DamageUI;

   const PHASE_TO_TITLE = {
     [Phase.COMBAT_MODIFY_ATTACK_DICE]: "Modify Attack Dice",
     [Phase.COMBAT_MODIFY_DEFENSE_DICE]: "Modify Defense Dice",
     [Phase.COMBAT_NOTIFY_DAMAGE]: "Deal Damage"
   };

   CombatDialog.propTypes = {
      combatInstance: PropTypes.object.isRequired,
      attackerInstance: PropTypes.object.isRequired,
      defenderInstance: PropTypes.object.isRequired,
      okFunction: PropTypes.func.isRequired,
      phaseKey: PropTypes.string.isRequired,

      abilities: PropTypes.array,
   };

   CombatDialog.defaultProps = {
      abilities: []
   };

   class ManeuverChooser extends React.Component
   {
      constructor(props)
      {
         super(props);

         this.state = {
            element: undefined,
         };

         this.selectionChanged = this.selectionChangedFunction.bind(this);
      }

      render()
      {
         const maneuvers = this.props.maneuvers;
         const minSpeed = determineMinimumSpeed(maneuvers);
         const maxSpeed = determineMaximumSpeed(maneuvers);
         const bearingValues = ["Turn Left", "Bank Left", "Straight", "Bank Right", "Turn Right",
           "Segnor's Loop Left", "Tallon Roll Left", "Koiogran Turn", "Segnor's Loop Right", "Tallon Roll Right"];
         const maneuverBearings = R.map(R.prop("bearing"), maneuvers);
         const self = this;
         const rows0 = [];

         if (this.props.pilotName !== undefined)
         {
            rows0.push(ReactUtilities.createRow(ReactUtilities.createCell(this.props.pilotName), rows0.length, "bg-xw-light black f6"));
         }

         if (this.props.shipName !== undefined)
         {
            rows0.push(ReactUtilities.createRow(ReactUtilities.createCell(this.props.shipName), rows0.length, "bg-xw-light black f6"));
         }

         const rows = [];

         for (let speed = maxSpeed; speed >= minSpeed; speed--)
         {
            const cells = [];
            cells.push(ReactUtilities.createCell(speed, cells.length, "b--xw-medium center"));

            if (speed === 0 && maneuvers.includes(STATIONARY_MANEUVER))
            {
               bearingFunction0(self)(cells)(speed);
            }
            else
            {
               R.forEach(bearingFunction(maneuverBearings)(self)(cells)(speed), bearingValues);
            }

            rows.push(ReactUtilities.createRow(cells, rows.length));
         }

         const table = ReactUtilities.createTable(rows, rows0.length, "b--xw-medium bg-black tc w-100 white");
         rows0.push(table);

         return ReactUtilities.createTable(rows0, undefined, "b--xw-medium bg-black center tc white");
      }
   }

   ManeuverChooser.prototype.selectionChangedFunction = function(event)
   {
      const oldElement = this.state.element;

      if (oldElement)
      {
         removeClass(oldElement, "bg-xw-medium");
      }

      const element = event.currentTarget;
      const pilotId = element.dataset.pilotid;
      const maneuverKey = element.dataset.maneuverkey;
      this.setState(
      {
         element: element,
      });
      addClass(element, "bg-xw-medium");

      const callback = this.props.callback;

      if (callback)
      {
         callback(
         {
            pilotId: pilotId,
            maneuverKey: maneuverKey
         });
      }
   };

   ////////////////////////////////////////////////////////////////////////////////
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

   const addClass = (element, cls) =>
   {
      element.className += (hasClass(element, cls) ? "" : " " + cls);
   };

   const bearingFunction0 = self => cells => speed =>
   {
      const isEditable = self.props.isEditable;
      const pilotId = self.props.pilotId;
      const maneuver = STATIONARY_MANEUVER;
      const difficulty = maneuver.difficulty;
      const image = createManeuverIcon(undefined, speed, difficulty);

      cells.push(ReactUtilities.createCell(" ", cells.length, "b--xw-medium"));
      cells.push(ReactUtilities.createCell(" ", cells.length, "b--xw-medium"));
      cells.push(ReactUtilities.createCell(image, cells.length, "b--xw-medium xw-min-w1-5",
      {
         onClick: (isEditable ? self.selectionChanged : undefined),
         "data-pilotid": pilotId,
         "data-maneuverkey": maneuver.key,
      }));
      cells.push(ReactUtilities.createCell(" ", cells.length, "b--xw-medium"));
      cells.push(ReactUtilities.createCell(" ", cells.length, "b--xw-medium"));
   };

   const bearingFunction = maneuverBearings => self => cells => speed => bearingValue =>
   {
      if (maneuverBearings.includes(bearingValue))
      {
         const isEditable = self.props.isEditable;
         const pilotId = self.props.pilotId;
         const maneuvers = self.props.maneuvers;
         const maneuver = findManeuver(maneuvers, bearingValue, speed);

         if (maneuver !== undefined)
         {
            const difficulty = maneuver.difficulty;
            const image = createManeuverIcon(bearingValue, speed, difficulty);
            cells.push(ReactUtilities.createCell(image, cells.length, "b--xw-medium tc xw-min-w1-5",
            {
               onClick: (isEditable ? self.selectionChanged : undefined),
               "data-pilotid": pilotId,
               "data-maneuverkey": maneuver.key,
            }));
         }
         else
         {
            cells.push(ReactUtilities.createCell(" ", cells.length, "b--xw-medium xw-min-w1-5"));
         }
      }
   };

   const createManeuverIcon = function(bearing, speed, difficulty)
   {
      const defaultSrc = (bearing, speed) => (speed === 0 ? "stop" : (speed === -1 ? "reverse" : "") + bearing.toLowerCase().replace(/ /g, ""));
      const src = R.defaultTo(defaultSrc(bearing, speed), BEARING_TO_FONT[bearing]);
      const className = "xw-f8" + (difficulty === "Easy" ? " green" : (difficulty === "Hard" ? " red" : ""));

      return ReactDOMFactories.span(
      {
         className: className,
      }, ReactDOMFactories.i(
      {
         className: "xwing-miniatures-font xwing-miniatures-font-" + src,
      }));
   };

   const determineMaximumSpeed = maneuvers => R.reduce((accum, maneuver) => Math.max(accum, maneuverSpeed(maneuver)), Number.NEGATIVE_INFINITY, maneuvers);

   const determineMinimumSpeed = maneuvers => R.reduce((accum, maneuver) => Math.min(accum, maneuverSpeed(maneuver)), Number.POSITIVE_INFINITY, maneuvers);

   const findManeuver = function(maneuvers, bearingIn, speedIn)
   {
      const isBearing = maneuver => R.equals(maneuverBearing(maneuver), bearingIn);
      const isSpeed = maneuver => R.equals(maneuverSpeed(maneuver), speedIn);

      return R.find(R.both(isBearing, isSpeed), maneuvers);
   };

   const hasClass = (element, cls) => element.className.match(regex(cls));

   const maneuverBearing = maneuver => (maneuver.bearing.startsWith("Reverse") ? maneuver.bearing.substring("Reverse ".length) : maneuver.bearing);

   const maneuverSpeed = maneuver => (maneuver.bearing.startsWith("Reverse") ? -1 : 1) * maneuver.speed;

   const regex = cls => new RegExp('(\\s|^)' + cls + '(\\s|$)');

   const removeClass = (element, cls) =>
   {
      element.className = (hasClass(element, cls) ? element.className.replace(regex(cls), ' ') : element.className);
   };

   ManeuverChooser.propTypes = {
      maneuvers: PropTypes.array.isRequired,
      shipName: PropTypes.string.isRequired,

      callback: PropTypes.func,
      isEditable: PropTypes.bool,
      pilotName: PropTypes.string,
      pilotId: PropTypes.number,
   };

   ManeuverChooser.defaultProps = {
      isEditable: true
   };

   const PilotsUI = props =>
   {
      const pilotInstances = props.pilotInstances;

      const pilotCells = pilotInstances.map(function(pilotInstance, i)
      {
         const element = React.createElement(CardInstanceUI,
         {
            cardInstance: pilotInstance,
            damageInstances: props.pilotToDamages[pilotInstance.id],
            statBonuses: props.pilotToStatBonuses[pilotInstance.id],
            tokenCounts: props.pilotToTokenCounts[pilotInstance.id],
            upgradeInstances: props.pilotToUpgrades[pilotInstance.id]
         });
         return ReactUtilities.createCell(element, "pilotCell" + i, "alignTop v-top");
      });

      const row = ReactUtilities.createRow(pilotCells);

      return ReactUtilities.createTable(row, "pilotsUITable", "center");
   };

   PilotsUI.propTypes = {
      pilotInstances: PropTypes.array.isRequired,

      pilotToDamages: PropTypes.object,
      pilotToStatBonuses: PropTypes.object,
      pilotToTokenCounts: PropTypes.object,
      pilotToUpgrades: PropTypes.object
   };

   PilotsUI.defaultProps = {
      pilotToDamages:
      {},
      pilotToStatBonuses:
      {},
      pilotToTokenCounts:
      {},
      pilotToUpgrades:
      {}
   };

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
               pilotName: PilotUtilities.name(pilotInstance, true),
               shipName: pilotCard.ship,
               pilotId: pilotInstance.id,
               callback: this.selectionChanged
            });
            cells.push(ReactUtilities.createCell(element, cells.length, "v-top"));
         });

         const initialInput = ReactUtilities.createTable(ReactUtilities.createRow(cells));
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

   const ShipImage = {};

   const DEG_TO_RADIANS = Math.PI / 180.0;

   ShipImage.draw = function(context, scale, id, image, position, shipBase, factionColor, primaryFiringArcKey, auxiliaryFiringArcKey)
   {
      // Setup.
      const width = shipBase.width;
      const height = shipBase.height;
      const x = position.x;
      const y = position.y;
      const angle = position.heading * DEG_TO_RADIANS;
      const primaryFiringArc = Selector.firingArc(primaryFiringArcKey);
      const auxiliaryFiringArc = Selector.firingArc(auxiliaryFiringArcKey);

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
      if (auxiliaryFiringArc)
      {
         context.setLineDash([5, 4]);
         ShipImage.drawFiringArc(context, auxiliaryFiringArc.key, width, height);
         context.setLineDash([]);
      }

      // Draw the primary firing arc.
      if (primaryFiringArc)
      {
         ShipImage.drawFiringArc(context, primaryFiringArc.key, width, height);
      }

      // Draw ship image.
      let myWidth = width;
      let myHeight = height;

      if ([XMA.ShipBase.SMALL, XMA.ShipBase.LARGE].includes(shipBase.key))
      {
         if (image.width < image.height)
         {
            myWidth = width * image.width / image.height;
         }
         else if (image.width > image.height)
         {
            myHeight = height * image.height / image.width;
         }
      }

      context.drawImage(image, -myWidth / 2, -myHeight / 2, myWidth, myHeight);

      if (id !== undefined)
      {
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

   ShipImage.drawFiringArc = function(context, firingArcKey, width, height)
   {
      // Draw the firing arc.
      switch (firingArcKey)
      {
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
            throw "Unknown firingArc: " + firingArcKey;
      }
   };

   class PlayAreaUI extends React.Component
   {
      constructor(props)
      {
         super(props);

         this.explosionImage = undefined;
         this.factionShipToImage = {};
      }

      componentDidMount()
      {
         this.loadImages();
         this.paint();
      }

      componentDidUpdate()
      {
         this.paint();
      }

      render()
      {
         const imageSrc = this.props.resourceBase + this.props.image;

         return ReactDOMFactories.canvas(
         {
            id: "playAreaCanvas",
            style:
            {
               backgroundImage: "url(" + imageSrc + ")",
               backgroundSize: "100%",
            },
            width: this.props.width,
            height: this.props.height,
         });
      }
   }

   PlayAreaUI.prototype.createExplosionImage = function()
   {
      const image = new Image();
      image.src = Endpoint.ARTIFACT_RESOURCE + "ship/explosion.png";

      return image;
   };

   PlayAreaUI.prototype.createShipIcon = function(faction, ship)
   {
      const image = new Image();
      image.onload = function()
      {
         this.forceUpdate();
      }.bind(this);

      const index = ship.faction.indexOf(faction.name);
      const filename = ship.images[index];
      image.src = Endpoint.ARTIFACT_RESOURCE + filename;

      return image;
   };

   PlayAreaUI.prototype.drawExplosion = function(context)
   {
      const explosion = this.props.explosion;

      if (explosion)
      {
         const position = explosion.position;
         const size = explosion.size;
         const audioClip = document.getElementById("explosionAudio");

         const x = position.x;
         const y = position.y;
         const width = size;
         const height = size;

         context.save();
         context.scale(this.props.scale, this.props.scale);
         context.translate(x, y);
         context.drawImage(this.explosionImage, -width / 2, -height / 2, width, height);

         audioClip.play();

         // Cleanup.
         context.restore();
      }
   };

   PlayAreaUI.prototype.drawLaserBeam = function(context)
   {
      const laserBeam = this.props.laserBeam;

      if (laserBeam)
      {
         const audioClip = laserBeam.audioClip;
         const color = laserBeam.color;
         const fromPosition = laserBeam.fromPosition;
         const isPrimary = laserBeam.isPrimary;
         const toPosition = laserBeam.toPosition;

         context.save();
         context.scale(this.props.scale, this.props.scale);
         context.lineWidth = 3;
         context.strokeStyle = color;

         if (!isPrimary)
         {
            const lineDashSegments = [10, 5];
            context.setLineDash(lineDashSegments);
         }

         context.beginPath();
         context.moveTo(fromPosition.x, fromPosition.y);
         context.lineTo(toPosition.x, toPosition.y);
         context.stroke();

         if (audioClip)
         {
            audioClip.play();
         }

         // Cleanup.
         context.restore();
      }
   };

   PlayAreaUI.FOREGROUND_COLOR = "white";
   PlayAreaUI.EASY_COLOR = "lime";
   PlayAreaUI.HARD_COLOR = "red";

   PlayAreaUI.prototype.drawManeuver = function(context)
   {
      const maneuverObj = this.props.maneuver;

      if (maneuverObj)
      {
         const color = maneuverObj.color;
         const fromPosition = maneuverObj.fromPosition;
         const toPolygon = maneuverObj.toPolygon;

         context.save();
         context.scale(this.props.scale, this.props.scale);

         // Mark the center.
         context.fillStyle = PlayAreaUI.FOREGROUND_COLOR;
         const radius = 4;
         context.beginPath();
         context.arc(fromPosition.x, fromPosition.y, radius, 0, 2 * Math.PI);
         context.fill();

         // Draw from ship base.
         paintPathComponent(maneuverObj.fromPolygon, context, PlayAreaUI.FOREGROUND_COLOR);

         if (toPolygon)
         {
            // Draw to ship base.
            paintPathComponent(toPolygon, context, PlayAreaUI.FOREGROUND_COLOR);
         }

         // Draw maneuver path.
         paintPathComponent(maneuverObj.path, context, color);

         // Cleanup.
         context.restore();
      }
   };

   PlayAreaUI.prototype.drawShips = function(context)
   {
      const scale = this.props.scale;
      const pilotInstances = this.props.pilotInstances;
      const pilotToPosition = this.props.pilotToPosition;

      Object.values(pilotInstances).forEach(pilotInstance =>
      {
         const id = pilotInstance.id;
         const faction = Selector.factionValueByPilot(pilotInstance.pilotKey);
         const shipKey = Selector.shipKeyByPilot(pilotInstance.pilotKey);
         const image = this.factionShipToImage[faction.key + "|" + shipKey];
         const position = pilotToPosition[pilotInstance.id];
         const shipBase = Selector.shipBaseValueByShip(shipKey);
         const factionColor = faction.color;
         const firingArcs = Selector.firingArcKeysByShip(shipKey);
         const primaryFiringArcKey = (firingArcs.length > 0 ? firingArcs[0] : undefined);
         const auxiliaryFiringArcKey = (firingArcs.length > 1 ? firingArcs[1] : undefined);

         ShipImage.draw(context, scale, id, image, position, shipBase, factionColor, primaryFiringArcKey, auxiliaryFiringArcKey);
      }, this);
   };

   PlayAreaUI.prototype.loadImages = function()
   {
      const pilotInstances = this.props.pilotInstances;
      const factionShips = [];

      Object.values(pilotInstances).forEach(pilotInstance =>
      {
         const faction = Selector.factionValueByPilot(pilotInstance.pilotKey);
         const shipKey = Selector.shipKeyByPilot(pilotInstance.pilotKey);
         const factionShip = faction.key + "|" + shipKey;
         if (!factionShips.includes(factionShip))
         {
            factionShips.push(factionShip);
         }
      });

      for (let i = 0; i < factionShips.length; i++)
      {
         const factionShip = factionShips[i];
         const faction = Selector.faction(factionShip.split("|")[0]);
         const ship = Selector.ship(factionShip.split("|")[1]);
         this.factionShipToImage[factionShip] = this.createShipIcon(faction, ship);
      }

      this.explosionImage = this.createExplosionImage();
   };

   PlayAreaUI.prototype.paint = function()
   {
      const canvas = document.getElementById("playAreaCanvas");
      const context = canvas.getContext("2d");

      context.clearRect(0, 0, this.props.width, this.props.height);

      this.drawShips(context);
      this.drawManeuver(context);
      this.drawLaserBeam(context);
      this.drawExplosion(context);
   };

   const paintPathComponent = function(path, context, strokeStyle)
   {
      if (path.length >= 2)
      {
         context.beginPath();
         context.moveTo(path[0], path[1]);

         for (let i = 2; i < path.length; i += 2)
         {
            context.lineTo(path[i], path[i + 1]);
         }

         context.strokeStyle = strokeStyle;
         context.stroke();
      }
   };

   PlayAreaUI.propTypes = {
      pilotInstances: PropTypes.object.isRequired,
      pilotToPosition: PropTypes.object.isRequired,

      height: PropTypes.number,
      image: PropTypes.string,
      resourceBase: PropTypes.string,
      scale: PropTypes.number,
      width: PropTypes.number,

      explosion: PropTypes.object,
      laserBeam: PropTypes.object,
      maneuver: PropTypes.object
   };

   PlayAreaUI.defaultProps = {
      height: 915,
      image: "background/pia13845.jpg",
      resourceBase: Endpoint.LOCAL_RESOURCE,
      scale: 1.0,
      width: 915
   };

   const StatusBarUI = props =>
   {
      const helpLinkUI = ReactDOMFactories.a(
      {
         href: props.helpBase + "Help.html",
         target: "_blank",
      }, "Help");

      let i = 0;
      const cellClassName = "ba";

      const roundCell = ReactUtilities.createCell(["Round: ", props.round], i++, cellClassName,
      {
         title: "Round"
      });
      const phaseCell = ReactUtilities.createCell(["Phase: ", props.phaseName], i++, cellClassName,
      {
         title: "Phase"
      });
      const activeShipCell = ReactUtilities.createCell(["Active Ship: ", props.activeShipName], i++, cellClassName,
      {
         title: "Active Ship"
      });
      const userMessageCell = ReactUtilities.createCell(props.userMessage, i++, cellClassName,
      {
         title: "User Message"
      });
      const helpCell = ReactUtilities.createCell(helpLinkUI, i++, cellClassName);

      const cells = [roundCell, phaseCell, activeShipCell, userMessageCell, helpCell];
      const row = ReactUtilities.createRow(cells);

      return ReactUtilities.createTable(row, "statusBarUITable", "bg-xw-light collapse ma0 tc v-mid w-100");
   };

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

   class WeaponAndDefenderDialog extends React.Component
   {
      constructor(props)
      {
         super(props);

         let weaponKey;
         let defenderId;

         const weaponToRangeToDefenders = this.props.weaponToRangeToDefenders;
         const weaponKeys = Object.keys(weaponToRangeToDefenders);

         if (weaponKeys.length > 0)
         {
            weaponKey = weaponKeys[0];
            const rangeToDefenders = weaponToRangeToDefenders[weaponKey];
            const rangeKeys = Object.keys(rangeToDefenders);

            if (rangeKeys.length > 0)
            {
               const rangeKey = rangeKeys[0];
               const defenders = rangeToDefenders[rangeKey];

               if (defenders.length > 0)
               {
                  defenderId = defenders[0].id;
               }
            }
         }

         this.state = {
            weaponKey: weaponKey,
            defenderId: defenderId
         };

         this.cancel = this.cancelFunction.bind(this);
         this.ok = this.okFunction.bind(this);
         this.selectionChanged = this.selectionChangedFunction.bind(this);
      }

      render()
      {
         const attackerInstance = this.props.attackerInstance;
         const message = ReactDOMFactories.div(
         {}, "Attacker: " + PilotUtilities.name(attackerInstance));
         const selectedWeaponKey = this.state.weaponKey;
         const selectedDefenderId = this.state.defenderId;
         const weaponToRangeToDefenders = this.props.weaponToRangeToDefenders;
         const self = this;
         const rows = [];
         const weaponKeys = Object.keys(weaponToRangeToDefenders);

         const myDefenderInstancesForEach = defenderInstancesForEach(self, selectedWeaponKey, selectedDefenderId, rows);
         const myRangeKeysForEach = rangeKeysForEach(rows, myDefenderInstancesForEach);
         const myWeaponKeysForEach = weaponKeysForEach(weaponToRangeToDefenders, rows, myRangeKeysForEach);
         R.forEach(myWeaponKeysForEach, weaponKeys);

         const initialInput = ReactUtilities.createTable(rows, undefined, "f6");
         const cancelButton = ReactDOMFactories.button(
         {
            key: "cancelButton",
            onClick: self.cancel
         }, "Cancel");
         const okButton = ReactDOMFactories.button(
         {
            key: "okButton",
            onClick: self.ok
         }, "OK");
         const buttons = ReactDOMFactories.span(
         {}, cancelButton, " ", okButton);

         return React.createElement(OptionPane,
         {
            panelClass: "optionPane",
            title: "Combat: Select Weapon and Defender",
            titleClass: "optionPaneTitle",
            message: message,
            messageClass: "optionPaneMessage",
            initialInput: initialInput,
            buttons: buttons,
            buttonsClass: "optionPaneButtons"
         });
      }
   }

   WeaponAndDefenderDialog.prototype.cancelFunction = function()
   {
      // console.log("cancel()");
      this.props.callback(
      {
         attackerId: this.props.attackerInstance.id
      });
   };

   WeaponAndDefenderDialog.prototype.okFunction = function()
   {
      // console.log("ok() attackerId = " + this.props.attackerInstance.id + " weaponKey = " + this.state.weaponKey + " defenderId = " + this.state.defenderId);
      this.props.callback(
      {
         attackerId: this.props.attackerInstance.id,
         weaponKey: this.state.weaponKey,
         defenderId: this.state.defenderId
      });
   };

   WeaponAndDefenderDialog.prototype.selectionChangedFunction = function(event)
   {
      const weaponKey = event.currentTarget.dataset.weaponKey;
      const defenderId = event.currentTarget.dataset.defenderId;
      // console.log("selectionChanged() weaponKey = " + weaponKey + " defenderId = " + defenderId);
      this.setState(
      {
         weaponKey: weaponKey,
         defenderId: defenderId
      });
   };

   ////////////////////////////////////////////////////////////////////////////////
   const defenderInstancesForEach = (self, selectedWeaponKey, selectedDefenderId, rows) => weaponKey => defenderInstance =>
   {
      const input = ReactDOMFactories.input(
      {
         key: 0,
         type: "radio",
         defaultChecked: (weaponKey === selectedWeaponKey && defenderInstance.id === selectedDefenderId),
         onClick: self.selectionChanged,
         name: "weaponChooserRadioButtons",
         "data-weapon-key": weaponKey,
         "data-defender-id": defenderInstance.id
      });
      const span = ReactDOMFactories.span(
      {
         key: 1
      }, PilotUtilities.name(defenderInstance));
      const label = ReactDOMFactories.label(
      {}, input, " ", span);
      const cell = ReactUtilities.createCell(label, undefined, "tl");
      rows.push(ReactUtilities.createRow(cell, rows.length));
   };

   const rangeKeysForEach = (rows, defenderInstancesForEach) => (weaponKey, rangeToDefenders) => rangeKey =>
   {
      const rangeName = XMA.Selector.range(rangeKey).name;

      const cell = ReactUtilities.createCell("Range " + rangeName, undefined, "bg-xw-medium");
      rows.push(ReactUtilities.createRow(cell, rows.length));

      const defenderInstances = rangeToDefenders[rangeKey];

      R.forEach(defenderInstancesForEach(weaponKey), defenderInstances);
   };

   const weaponKeysForEach = (weaponToRangeToDefenders, rows, rangeKeysForEach) => weaponKey =>
   {
      const weaponName = (weaponKey === "primary" ? "Primary Weapon" : XMA.Selector.upgradeCard(weaponKey).name);

      const cell = ReactUtilities.createCell(weaponName, undefined, "bg-xw-dark pv1 white");
      rows.push(ReactUtilities.createRow(cell, rows.length));

      const rangeToDefenders = weaponToRangeToDefenders[weaponKey];
      const rangeKeys = Object.keys(rangeToDefenders);

      R.forEach(rangeKeysForEach(weaponKey, rangeToDefenders), rangeKeys);
   };

   WeaponAndDefenderDialog.propTypes = {
      attackerInstance: PropTypes.object.isRequired,
      weaponToRangeToDefenders: PropTypes.array.isRequired,
      callback: PropTypes.func.isRequired
   };

   const PilotsContainer = (gameState, ownProps = {}) =>
   {
      const agentId = ownProps.agentId;
      const pilotInstances = Selector.pilotInstancesByAgent(agentId, gameState);
      const pilotToDamages = R.reduce(reduceDamage(gameState),
      {}, pilotInstances);
      const pilotToTokenCounts = R.reduce(reduceTokenCounts(gameState),
      {}, pilotInstances);
      const pilotToUpgrades = R.reduce(reduceUpgrade(gameState),
      {}, pilotInstances);

      return React.createElement(PilotsUI,
      {
         pilotInstances: pilotInstances,
         pilotToDamages: pilotToDamages,
         pilotToTokenCounts: pilotToTokenCounts,
         pilotToUpgrades: pilotToUpgrades
      });
   };

   const reduceDamage = gameState => (accumulator, pilotInstance) =>
   {
      const pilotId = pilotInstance.id;
      const newPilotToDamages = {};
      newPilotToDamages[pilotId] = Selector.damageInstancesByPilot(pilotId, gameState);
      return R.merge(accumulator, newPilotToDamages);
   };

   const reduceTokenCounts = gameState => (accumulator, pilotInstance) =>
   {
      const pilotId = pilotInstance.id;
      const newPilotToTokenCounts = {};
      newPilotToTokenCounts[pilotId] = Selector.countsByPilot(pilotId, gameState);
      return R.merge(accumulator, newPilotToTokenCounts);
   };

   const reduceUpgrade = gameState => (accumulator, pilotInstance) =>
   {
      const pilotId = pilotInstance.id;
      const newPilotToUpgrades = {};
      newPilotToUpgrades[pilotId] = Selector.upgradeInstancesByPilot(pilotId, gameState);
      return R.merge(accumulator, newPilotToUpgrades);
   };

   const PlayAreaContainer = (gameState, ownProps = {}) =>
   {
      const playFormat = Selector.playFormat(gameState);
      const image = "background/" + (playFormat.key === XMA.PlayFormat.STANDARD ? "pia13845.jpg" : "horsehead_nebula_02092008.jpg");
      const scale = (ownProps !== undefined ? ownProps.scale : 1.0);

      const pilotToPosition = R.reduce((accum, pilot) => R.assoc(pilot.id, pilot.position, accum),
      {}, Selector.pilotInstances(gameState));

      const displayExplosion = gameState.displayExplosion;
      const displayLaserBeam = gameState.displayLaserBeam;
      const displayManeuver = gameState.displayManeuver;

      const laserBeam = (displayLaserBeam !== undefined ? createLaserBeam(displayLaserBeam) : undefined);

      return React.createElement(PlayAreaUI,
      {
         height: playFormat.height,
         image: image,
         pilotInstances: gameState.pilotInstances,
         pilotToPosition: pilotToPosition,
         scale: scale,
         width: playFormat.width,

         explosion: displayExplosion,
         laserBeam: laserBeam,
         maneuver: displayManeuver,
         resourceBase: ownProps.resourceBase
      });
   };

   const createLaserBeam = laserBeamState =>
   {
      // FIXME: choose audio clip by ship.
      const audioClip = document.getElementById("xWingLaserAudio");

      return R.merge(laserBeamState,
      {
         audioClip: audioClip
      });
   };

   const StatusBarContainer = (gameState, ownProps = {}) =>
   {
      const activePilotId = gameState.activePilotId;
      const activePilotInstance = (activePilotId !== undefined ? gameState.pilotInstances[activePilotId] : undefined);
      const activeShipName = (activePilotInstance !== undefined ? PilotUtilities.name(activePilotInstance) : "");
      const phaseName = Selector.phase(gameState.phaseKey).name;

      return React.createElement(StatusBarUI,
      {
         activeShipName: activeShipName,
         phaseName: phaseName,
         round: gameState.round,
         userMessage: Selector.userMessage(gameState),
         helpBase: ownProps.helpBase
      });
   };

   const XWingMiniaturesView = {};

   XWingMiniaturesView.drawView = (
   {
      gameState,
      document,
      resourceBase = "../resource/"
   }) =>
   {
      const statusBarContainer = StatusBarContainer(gameState);
      ReactDOM.render(statusBarContainer, document.getElementById("statusBarContainer"));

      const pilotArea1 = PilotsContainer(gameState,
      {
         agentId: 1
      });
      ReactDOM.render(pilotArea1, document.getElementById("pilotArea1"));

      // FIXME: display firstPilotInputArea

      const playAreaContainer = PlayAreaContainer(gameState,
      {
         resourceBase: resourceBase
      });
      ReactDOM.render(playAreaContainer, document.getElementById("playAreaContainer"));

      // FIXME: display secondPilotInputArea

      const pilotArea2 = PilotsContainer(gameState,
      {
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
