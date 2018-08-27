import Stat from "./Stat.js";
import EnumTest from "./Enum.test.js";

QUnit.module("Stat");

QUnit.test("Stat properties Agility", assert => {
  const property = Stat.AGILITY;
  const properties = Stat.properties[property];
  assert.equal(properties.name, "Agility");
  assert.equal(properties.key, "agility");
});

QUnit.test("Stat properties Energy", assert => {
  const property = Stat.ENERGY;
  const properties = Stat.properties[property];
  assert.equal(properties.name, "Energy");
  assert.equal(properties.key, "energy");
});

QUnit.test("keys and values", assert => {
  EnumTest.keysAndValues(assert, Stat);
});

QUnit.test("keys()", assert => {
  EnumTest.keys(assert, Stat, 6, Stat.AGILITY, Stat.SHIELD);
});

const StatTest = {};
export default StatTest;
