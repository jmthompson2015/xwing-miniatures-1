import EnumTest from "./Enum.test.js";
import PlayFormat from "./PlayFormat.js";

QUnit.module("PlayFormat");

QUnit.test("PlayFormat properties Standard", assert => {
  const type = PlayFormat.STANDARD;
  const properties = PlayFormat.properties[type];
  assert.equal(properties.name, "Standard");
  assert.equal(properties.key, "standard");
});

QUnit.test("keys and values", assert => {
  EnumTest.keysAndValues(assert, PlayFormat);
});

QUnit.test("keys()", assert => {
  EnumTest.keys(assert, PlayFormat, 2, PlayFormat.EPIC, PlayFormat.STANDARD);
});

const PlayFormatTest = {};
export default PlayFormatTest;
