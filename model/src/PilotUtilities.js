/* eslint no-underscore-dangle: ["error", { "allow": ["__"] }] */

import Selector from "./Selector.js";

const { FiringArc } = XMA;

const PilotUtilities = {};

const isName = statKey => R.propEq("name", statKey);
const isTypeStats = R.propEq("type", "stats");
const isMatchingGrant = statKey => R.both(isTypeStats, isName(statKey));
const findStatGrant = statKey => R.ifElse(R.isNil, R.identity, R.find(isMatchingGrant(statKey)));
const statFromGrant = R.ifElse(R.isNil, R.identity, R.prop("value"));
const isInRange = range => R.both(R.lte(range.minDistance), R.gte(range.maxDistance));
const statGrantName = enumKey => XMA.Selector.stat(enumKey).grant;

const baseStatFromPilot = statKey => pilotKey => R.prop(statKey, XMA.Selector.pilotCard(pilotKey));
const baseStatFromShip = statKey => pilotKey =>
  R.prop(statKey, XMA.Selector.shipValueByPilot(pilotKey));
const bonusStatFromGrants = statKey =>
  R.pipe(
    findStatGrant(statKey),
    statFromGrant
  );

const computeBearing = position0 => position1 => {
  const dx = position1.x - position0.x;
  const dy = position1.y - position0.y;
  const angle = (Math.atan2(dy, dx) * 180.0) / Math.PI;

  return R.compose(
    PilotUtilities.normalizeAngle,
    R.subtract(R.__, position0.heading),
    Math.round
  )(angle);
};

const computeDistance = position0 => position1 => {
  const dx = position1.x - position0.x;
  const dy = position1.y - position0.y;

  return Math.sqrt(dx * dx + dy * dy);
};

const determineRange = distance => {
  let answer;
  const ranges = XMA.EnumUtilities.values(XMA.Range);
  const someFunction = range => {
    answer = isInRange(range)(distance) ? range.key : undefined;
    return answer !== undefined;
  };
  ranges.some(someFunction);

  return answer;
};

const reduceStat = upgradeKeys => (accumulator, enumKey) =>
  R.assoc(enumKey, PilotUtilities.bonusStat(statGrantName(enumKey), upgradeKeys), accumulator);
const sumStat = statKey => (accumulator, upgradeKey) => {
  const upgradeCard = XMA.Selector.upgradeCard(upgradeKey);
  const upgradeStat = R.defaultTo(
    bonusStatFromGrants(statKey)(upgradeCard.grants),
    R.prop(statKey, upgradeCard)
  );
  return accumulator + (upgradeStat !== undefined ? upgradeStat : 0);
};

// /////////////////////////////////////////////////////////////////////////////////////////////////
PilotUtilities.baseStat = (statKey, pilotKey) =>
  R.defaultTo(baseStatFromShip(statKey)(pilotKey), baseStatFromPilot(statKey)(pilotKey));

PilotUtilities.bonusStat = (statKey, upgradeKeys = []) =>
  statKey !== "attack" ? R.reduce(sumStat(statKey), 0)(upgradeKeys) : 0;

PilotUtilities.createPilotToRange = (state, pilotId) => {
  const position0 = Selector.positionByPilot(pilotId, state);
  const pilotIds = Selector.pilotIds(state).filter(id => pilotId !== id);
  const myComputeDistance = computeDistance(position0);
  const reduceFunction = (accumulator, id) => {
    const position1 = Selector.positionByPilot(id, state);
    const rangeKey = R.compose(
      determineRange,
      myComputeDistance
    )(position1);
    return R.assoc(id, rangeKey, accumulator);
  };

  return pilotIds.reduce(reduceFunction, {});
};

PilotUtilities.createPilotToBearing = (state, pilotId) => {
  const position0 = Selector.positionByPilot(pilotId, state);
  const pilotIds = Selector.pilotIds(state).filter(id => pilotId !== id);
  const myComputeBearing = computeBearing(position0);
  const reduceFunction = (accumulator, id) => {
    const position1 = Selector.positionByPilot(id, state);
    const bearing = myComputeBearing(position1);
    return R.assoc(id, bearing, accumulator);
  };

  return pilotIds.reduce(reduceFunction, {});
};

PilotUtilities.createStatBonuses = (upgradeKeys = []) =>
  XMA.EnumUtilities.keys(XMA.Stat).reduce(reduceStat(upgradeKeys), {});

PilotUtilities.isInFiringArc = (bearing, firingArcKey) => {
  let answer = false;
  const firingArc = XMA.Selector.firingArc(firingArcKey);

  switch (firingArcKey) {
    case FiringArc.AUXILIARY_180:
    case FiringArc.FRONT:
      answer = firingArc.minAngle <= bearing || bearing <= firingArc.maxAngle;
      break;
    case FiringArc.AUXILIARY_REAR:
    case FiringArc.TURRET:
      answer = firingArc.minAngle <= bearing && bearing <= firingArc.maxAngle;
      break;
    default:
      throw new Error(`Unknown firingArcKey: ${firingArcKey}`);
  }

  return answer;
};

PilotUtilities.normalizeAngle = angle => {
  let answer = angle;

  while (answer < 0) {
    answer += 360;
  }

  answer %= 360;

  return answer;
};

PilotUtilities.statValue = (statKey, pilotKey, upgradeKeys = []) =>
  R.add(PilotUtilities.baseStat(statKey, pilotKey), PilotUtilities.bonusStat(statKey, upgradeKeys));

Object.freeze(PilotUtilities);

export default PilotUtilities;
