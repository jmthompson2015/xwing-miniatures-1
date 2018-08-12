import ReactUtilities from "../ReactUtilities.js";
import Selector from "../Selector.js";

import CardImage from "./CardImage.js";
import CardInstancesArea from "./CardInstancesArea.js";
import TokenPanel from "./TokenPanel.js";

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

export default CardInstanceUI;