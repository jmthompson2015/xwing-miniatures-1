const UpgradeState = {};

UpgradeState.create = function(
{
   id,
   upgradeKey,

   tokenCounts
})
{
   return Immutable(
   {
      id: id,
      upgradeKey: upgradeKey,

      tokenCounts: Immutable(tokenCounts)
   });
};

Object.freeze(UpgradeState);

export default UpgradeState;