import Endpoint from "../Endpoint.js";
import LabeledImage from "./LabeledImage.js";
import ReactUtilities from "../ReactUtilities.js";

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

export default TokenPanel;
