import Endpoint from "../Endpoint.js";
import LabeledImage from "./LabeledImage.js";
import ReactUtilities from "../ReactUtilities.js";

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

export default TokenPanel;