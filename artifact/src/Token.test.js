import Token from "./Token.js";
import EnumTest from "./Enum.test.js";

QUnit.module("Token");

QUnit.test("Token properties Cloak", function(assert)
{
   const property = Token.CLOAK;
   const properties = Token.properties[property];
   assert.equal(properties.name, "Cloak");
   assert.equal(properties.image, "token/cloak.png");
   assert.equal(properties.key, "cloak");
});

QUnit.test("Token properties Energy", function(assert)
{
   const property = Token.ENERGY;
   const properties = Token.properties[property];
   assert.equal(properties.name, "Energy");
   assert.equal(properties.image, "token/energy.png");
   assert.equal(properties.key, "energy");
});

QUnit.test("keys and values", function(assert)
{
   EnumTest.keysAndValues(assert, Token);
});

QUnit.test("keys()", function(assert)
{
   EnumTest.keys(assert, Token, 15, Token.CLOAK, Token.WEAPONS_DISABLED);
});

const TokenTest = {};
export default TokenTest;