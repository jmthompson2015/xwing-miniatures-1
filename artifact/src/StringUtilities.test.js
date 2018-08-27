import StringUtils from "./StringUtilities.js";

QUnit.module("StringUtilities");

QUnit.test("toCamelCase()", assert => {
  assert.equal(StringUtils.toCamelCase("Bank Left 1 Easy 1BG"), "bankLeft1Easy1bg");
  assert.equal(StringUtils.toCamelCase("Turn Right 3 Standard 3YW"), "turnRight3Standard3yw");
});

const StringUtilitiesTest = {};
export default StringUtilitiesTest;
