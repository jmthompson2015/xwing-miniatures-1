const TargetLockState = {};

TargetLockState.create = ({ id, attackerId, defenderId }) =>
  Immutable({ id, attackerId, defenderId });

Object.freeze(TargetLockState);

export default TargetLockState;
