const DamageDeck = {};

const createDamage = (id, damageKey) =>
  XMS.DamageState.create({
    id,
    damageKey
  });

DamageDeck.create = (enumClass = XMA.DamageCard) => {
  // There are two of each, except seven of Direct Hit!
  const keys = XMA.EnumUtilities.keys(enumClass);
  let count = 1;

  const damageInstances = keys.reduce((accumulator, damageKey) => {
    accumulator[count] = createDamage(count, damageKey);
    count += 1;
    accumulator[count] = createDamage(count, damageKey);
    count += 1;
    return accumulator;
  }, {});

  for (let i = 0; i < 5; i += 1) {
    damageInstances[count] = createDamage(count, enumClass.DIRECT_HIT);
    count += 1;
  }

  const answer = Object.values(damageInstances).map(damage => damage.id);

  // Shuffle.
  answer.sort(() => Math.random() - 0.5);

  return {
    damageInstances,
    damageDeck: answer
  };
};

Object.freeze(DamageDeck);

export default DamageDeck;
