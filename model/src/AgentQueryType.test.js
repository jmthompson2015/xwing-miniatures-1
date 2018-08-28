import AgentQueryType from "./AgentQueryType.js";

QUnit.module("AgentQueryType");

const keysAndValues = (assert, enumClass) => {
  // Run.
  const result = XMA.EnumUtilities.keys(enumClass);
  const ownPropertyNames = Object.getOwnPropertyNames(enumClass);

  // Verify.
  ownPropertyNames.forEach(key => {
    const key2 = enumClass[key];

    if (key !== "properties" && typeof key2 === "string") {
      assert.ok(enumClass.properties[key2], `Missing value for key = ${key}`);
    }
  });

  result.forEach(value => {
    const p = ownPropertyNames.filter(key => enumClass[key] === value);

    assert.equal(p.length, 1, `Missing key for value = ${value}`);
  });
};

const keys = (assert, enumClass, length, firstElement, lastElement) => {
  // Run.
  const result = XMA.EnumUtilities.keys(enumClass);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, length);
  assert.equal(result[0], firstElement);
  assert.equal(result[length - 1], lastElement);
  assert.ok(!result[length]);

  const properties = Object.getOwnPropertyNames(enumClass);
  const count = properties.length - 1; // properties
  assert.equal(result.length, count);
};

QUnit.test("AgentQueryType properties Choose Maneuvers", assert => {
  const type = AgentQueryType.CHOOSE_MANEUVERS;
  const properties = AgentQueryType.properties[type];
  assert.equal(properties.name, "Choose Maneuvers");
  assert.equal(properties.key, type);
});

QUnit.test("AgentQueryType properties Choose Ship Action", assert => {
  const type = AgentQueryType.CHOOSE_SHIP_ACTION;
  const properties = AgentQueryType.properties[type];
  assert.equal(properties.name, "Choose Ship Action");
  assert.equal(properties.key, type);
});

QUnit.test("keys and values", assert => {
  keysAndValues(assert, AgentQueryType);
});

QUnit.test("keys()", assert => {
  keys(
    assert,
    AgentQueryType,
    6,
    AgentQueryType.CHOOSE_ATTACK_DICE_MODIFICATION,
    AgentQueryType.NOTIFY_DAMAGE
  );
});

const AgentQueryTypeTest = {};
export default AgentQueryTypeTest;
