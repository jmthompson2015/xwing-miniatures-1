const UpgradeState = {};

UpgradeState.create = ({ id, upgradeKey, tokenCounts }) =>
  Immutable({ id, upgradeKey, tokenCounts: Immutable(tokenCounts) });

Object.freeze(UpgradeState);

export default UpgradeState;
