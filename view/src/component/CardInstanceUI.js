import ReactUtilities from "../ReactUtilities.js";
import Selector from "../Selector.js";

import CardImage from "./CardImage.js";
import CardInstancesArea from "./CardInstancesArea.js";
import TokenPanel from "./TokenPanel.js";

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

export default CardInstanceUI;
