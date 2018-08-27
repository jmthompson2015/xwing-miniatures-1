import EnumTest from "./Enum.test.js";
import EnumUtilities from "./EnumUtilities.js";
import Source from "./Source.js";

QUnit.module("Source");

QUnit.test("Source properties A-wing Expansion Pack", assert => {
  const source = Source.A_WING_EXPANSION_PACK;
  const properties = Source.properties[source];
  assert.equal(properties.name, "A-wing Expansion Pack");
  assert.equal(properties.sku, "SWX08");
  assert.equal(properties.release_date, "2013-02-28");
  assert.equal(properties.key, "aWingExpansionPack");
});

QUnit.test("keys and values", assert => {
  EnumTest.keysAndValues(assert, Source);
});

QUnit.test("keys()", assert => {
  EnumTest.keys(
    assert,
    Source,
    63,
    Source.A_WING_EXPANSION_PACK,
    Source.Z_95_HEADHUNTER_EXPANSION_PACK
  );
});

QUnit.test("required properties", assert => {
  EnumUtilities.values(Source).forEach(source => {
    assert.ok(source.name, `Missing name for ${source.name}`);
    assert.ok(source.release_date, `Missing release_date for ${source.name}`);
    assert.ok(source.key, `Missing key for ${source.name}`);
  });
});

const ShipTest = {};
export default ShipTest;
