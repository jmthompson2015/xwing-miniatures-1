import AgentQueryType from "./AgentQueryType.js";

QUnit.module("AgentQueryType");

QUnit.test("AgentQueryType properties Choose Maneuvers", function(assert)
{
   const type = AgentQueryType.CHOOSE_MANEUVERS;
   const properties = AgentQueryType.properties[type];
   assert.equal(properties.name, "Choose Maneuvers");
   assert.equal(properties.key, type);
});

QUnit.test("AgentQueryType properties Choose Ship Action", function(assert)
{
   const type = AgentQueryType.CHOOSE_SHIP_ACTION;
   const properties = AgentQueryType.properties[type];
   assert.equal(properties.name, "Choose Ship Action");
   assert.equal(properties.key, type);
});

QUnit.test("keys and values", function(assert)
{
   keysAndValues(assert, AgentQueryType);
});

QUnit.test("keys()", function(assert)
{
   keys(assert, AgentQueryType, 6, AgentQueryType.CHOOSE_ATTACK_DICE_MODIFICATION, AgentQueryType.NOTIFY_DAMAGE);
});

const keysAndValues = function(assert, enumClass)
{
   // Run.
   const result = XMA.EnumUtilities.keys(enumClass);
   const ownPropertyNames = Object.getOwnPropertyNames(enumClass);

   // Verify.
   ownPropertyNames.forEach(function(key)
   {
      const key2 = enumClass[key];

      if (key !== "properties" && typeof key2 === "string")
      {
         assert.ok(enumClass.properties[key2], "Missing value for key = " + key);
      }
   });

   result.forEach(function(value)
   {
      const p = ownPropertyNames.filter(function(key)
      {
         return enumClass[key] === value;
      });

      assert.equal(p.length, 1, "Missing key for value = " + value);
   });
};

const keys = function(assert, enumClass, length, firstElement, lastElement)
{
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

const AgentQueryTypeTest = {};
export default AgentQueryTypeTest;