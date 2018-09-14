import ReactUtils from "../ReactUtilities.js";

import FactionUI from "./FactionUI.js";
import ShipSilhouetteUI from "./ShipSilhouetteUI.js";
import UpgradeSlotUI from "./UpgradeSlotUI.js";

const NUMBER_CLASS = "ba pa1 tr";
const TEXT_CLASS = "ba pa1 tl";

const determinePilotStat = property => pilotCard => {
  let answer = R.prop(property, pilotCard);

  if (answer === undefined) {
    const ship = XMA.Selector.shipValueByPilot(pilotCard.key);
    answer = R.prop(property, ship);
  }

  if (answer === undefined) {
    answer = 0;
  }

  return answer;
};

const determineUpgradeStat = property => upgradeCard => {
  let answer = R.prop(property, upgradeCard);

  if (answer === undefined) {
    answer = 0;
  }

  return answer;
};

const computeAgility = determinePilotStat("agility");
const computeAttack = determinePilotStat("attack");
const computeHull = determinePilotStat("hull");
const computeShield = determinePilotStat("shields");
const computeSkill = determinePilotStat("skill");

const createFooterRow = (pilots, pilotToUpgrades) => {
  const mapFunction1 = pilot => XMA.Selector.pilotCard(pilot.pilotKey);
  const pilotCards = R.map(mapFunction1, pilots);
  const skill1 = R.sum(R.map(computeSkill, pilotCards));
  const attack1 = R.sum(R.map(computeAttack, pilotCards));
  const agility1 = R.sum(R.map(computeAgility, pilotCards));
  const hull1 = R.sum(R.map(computeHull, pilotCards));
  const shield1 = R.sum(R.map(computeShield, pilotCards));
  const points1 = R.sum(R.map(R.prop("points"), pilotCards));

  const mapFunction2 = upgrade => XMA.Selector.upgradeCard(upgrade.upgradeKey);
  const mapFunction22 = R.map(mapFunction2);
  const reduceFunction2 = (accum, pilot) =>
    R.concat(mapFunction22(pilotToUpgrades[pilot.id]), accum);
  const upgradeCards = R.reduce(reduceFunction2, [], pilots);
  const skill2 = R.sum(R.map(determineUpgradeStat("skill"), upgradeCards));
  const attack2 = R.sum(R.map(determineUpgradeStat("attack"), upgradeCards));
  const agility2 = R.sum(R.map(determineUpgradeStat("agility"), upgradeCards));
  const hull2 = R.sum(R.map(determineUpgradeStat("hull"), upgradeCards));
  const shield2 = R.sum(R.map(determineUpgradeStat("shields"), upgradeCards));
  const points2 = R.sum(R.map(R.prop("points"), upgradeCards));

  const className = `b--black ${NUMBER_CLASS}`;
  const cells = [
    ReactUtils.createCell("Totals", "nameCell", className),
    ReactUtils.createCell(skill1 + skill2, "skillCell", className),
    ReactUtils.createCell(attack1 + attack2, "attackCell", className),
    ReactUtils.createCell(agility1 + agility2, "agilityCell", className),
    ReactUtils.createCell(hull1 + hull2, "hullCell", className),
    ReactUtils.createCell(shield1 + shield2, "shieldCell", className),
    ReactUtils.createCell(points1 + points2, "pointsCell", className)
  ];
  return ReactUtils.createRow(cells, "footerRow", "bg-xw-dark white");
};

const createHeaderRow = () => {
  const className = "b--black ba pa1";
  const cells = [
    ReactUtils.createCell("Ship / Pilot / Upgrade", "nameCell", className),
    ReactUtils.createCell("Skill", "skillCell", className),
    ReactUtils.createCell("Attack", "attackCell", className),
    ReactUtils.createCell("Agility", "agilityCell", className),
    ReactUtils.createCell("Hull", "hullCell", className),
    ReactUtils.createCell("Shield", "shieldCell", className),
    ReactUtils.createCell("Points", "pointsCell", className)
  ];
  return ReactUtils.createRow(cells, "headerRow", "b bg-xw-dark tc white");
};

const createPilotRow = pilot => {
  const pilotCard = XMA.Selector.pilotCard(pilot.pilotKey);
  const faction = XMA.Selector.factionValueByPilot(pilot.pilotKey);
  const factionUI = React.createElement(FactionUI, { faction, isSmall: true });
  const imageWithLabelUI = ReactDOMFactories.span({}, factionUI, " ", pilotCard.name);
  const cells = [
    ReactUtils.createCell(imageWithLabelUI, "nameCell", TEXT_CLASS, { title: pilotCard.text }),
    ReactUtils.createCell(computeSkill(pilotCard), "skillCell", NUMBER_CLASS),
    ReactUtils.createCell(computeAttack(pilotCard), "attackCell", NUMBER_CLASS),
    ReactUtils.createCell(computeAgility(pilotCard), "agilityCell", NUMBER_CLASS),
    ReactUtils.createCell(computeHull(pilotCard), "hullCell", NUMBER_CLASS),
    ReactUtils.createCell(computeShield(pilotCard), "shieldCell", NUMBER_CLASS),
    ReactUtils.createCell(pilotCard.points, "pointsCell", NUMBER_CLASS)
  ];
  const key = `pilotRow${pilot.id}`;

  return ReactUtils.createRow(cells, key);
};

const createShipRow = pilot => {
  const ship = XMA.Selector.shipValueByPilot(pilot.pilotKey);
  const silhouette = React.createElement(ShipSilhouetteUI, { ship });
  const imageWithLabelUI = ReactDOMFactories.span({}, silhouette, " ", ship.name);
  const cells = [
    ReactUtils.createCell(imageWithLabelUI, "nameCell", "pa1 tl"),
    ReactUtils.createCell("", "skillCell"),
    ReactUtils.createCell("", "attackCell"),
    ReactUtils.createCell("", "agilityCell"),
    ReactUtils.createCell("", "hullCell"),
    ReactUtils.createCell("", "shieldCell"),
    ReactUtils.createCell("", "pointsCell")
  ];
  const key = `shipRow${pilot.id}`;

  return ReactUtils.createRow(cells, key, "bg-xw-medium");
};

const createUpgradeRows = (upgradeInstances, key) =>
  R.map(upgrade => {
    const upgradeCard = XMA.Selector.upgradeCard(upgrade.upgradeKey);
    const upgradeSlot = XMA.Selector.upgradeSlotValueByUpgrade(upgrade.upgradeKey);
    const upgradeSlotUI = React.createElement(UpgradeSlotUI, { upgradeSlot, isSmall: true });
    const imageWithLabelUI = ReactDOMFactories.span({}, upgradeSlotUI, " ", upgradeCard.name);
    const cells = [
      ReactUtils.createCell(imageWithLabelUI, "nameCell", TEXT_CLASS),
      ReactUtils.createCell(upgradeCard.skill, "skillCell", NUMBER_CLASS),
      ReactUtils.createCell(upgradeCard.attack, "attackCell", NUMBER_CLASS),
      ReactUtils.createCell(upgradeCard.agility, "agilityCell", NUMBER_CLASS),
      ReactUtils.createCell(upgradeCard.hull, "hullCell", NUMBER_CLASS),
      ReactUtils.createCell(upgradeCard.shields, "shieldCell", NUMBER_CLASS),
      ReactUtils.createCell(upgradeCard.points, "pointsCell", NUMBER_CLASS)
    ];

    return ReactUtils.createRow(cells, key + upgrade.id, "", { title: upgradeCard.text });
  }, upgradeInstances);

// /////////////////////////////////////////////////////////////////////////////////////////////////
class SquadTable extends React.PureComponent {
  render() {
    const { pilotInstances, pilotToUpgrades } = this.props;

    const reduceFunction1 = (accum, pilot) => {
      const shipRow = createShipRow(pilot);
      const pilotRow = createPilotRow(pilot);
      const key = `upgradeRow${pilot.id}`;
      const upgradeRows = createUpgradeRows(pilotToUpgrades[pilot.id], key);
      const myRows = R.concat([shipRow], R.concat([pilotRow], upgradeRows));
      return R.append(myRows, accum);
    };
    const rows1 = R.reduce(reduceFunction1, [], pilotInstances);

    const headerRow = createHeaderRow();
    const footerRow = createFooterRow(pilotInstances, pilotToUpgrades);
    const rows = R.concat([headerRow], R.concat(rows1, [footerRow]));

    return ReactUtils.createTable(rows, "squadTable", "ba b--black bg-xw-light collapse fl f6");
  }
}

SquadTable.propTypes = {
  pilotInstances: PropTypes.arrayOf().isRequired,
  pilotToUpgrades: PropTypes.shape().isRequired
};

SquadTable.defaultProps = {};

export default SquadTable;
