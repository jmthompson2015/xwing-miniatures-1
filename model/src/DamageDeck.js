const DamageDeck = {};

DamageDeck.create = function(enumClass = XMA.DamageCard)
{
   // There are two of each, except seven of Direct Hit!
   const keys = XMA.EnumUtilities.keys(enumClass);
   let count = 1;

   const damageInstances = keys.reduce(function(accumulator, damageKey)
   {
      accumulator[count] = createDamage(count++, damageKey);
      accumulator[count] = createDamage(count++, damageKey);
      return accumulator;
   },
   {});

   for (let i = 0; i < 5; i++)
   {
      damageInstances[count] = createDamage(count++, enumClass.DIRECT_HIT);
   }

   const answer = Object.values(damageInstances).map(damage => damage.id);

   // Shuffle.
   answer.sort(() => Math.random() - 0.5);

   return (
   {
      damageInstances: damageInstances,
      damageDeck: answer
   });
};

function createDamage(id, damageKey)
{
   return XMS.DamageState.create(
   {
      id: id,
      damageKey: damageKey
   });
}

Object.freeze(DamageDeck);

export default DamageDeck;