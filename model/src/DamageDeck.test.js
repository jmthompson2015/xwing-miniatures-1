import DamageDeck from "./DamageDeck.js";

QUnit.module("DamageDeck");

QUnit.test("create() V1", assert => {
  // Run.
  const result = DamageDeck.create();

  // Verify.
  assert.ok(result);
  assert.ok(result.damageInstances);
  assert.equal(Object.keys(result.damageInstances).length, 33);
  assert.ok(result.damageDeck);
  assert.equal(result.damageDeck.length, 33);
});

QUnit.test("create() V2", assert => {
  // Run.
  const result = DamageDeck.create(XMA.DamageCardTFA);

  // Verify.
  assert.ok(result);
  assert.ok(result.damageInstances);
  assert.equal(Object.keys(result.damageInstances).length, 33);
  assert.ok(result.damageDeck);
  assert.equal(result.damageDeck.length, 33);
});

const DamageDeckTest = {};
export default DamageDeckTest;
