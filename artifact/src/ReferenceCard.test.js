import EnumTest from "./Enum.test.js";
import EnumUtilities from "./EnumUtilities.js";
import ReferenceCard from "./ReferenceCard.js";

QUnit.module("ReferenceCard");

QUnit.test("ReferenceCard properties Auxiliary Firing Arc", function(assert)
{
   const reference = ReferenceCard.AUXILIARY_FIRING_ARC;
   const properties = ReferenceCard.properties[reference];
   assert.equal(properties.id, 20);
   assert.equal(properties.title, "Auxiliary Firing Arc");
   assert.equal(properties.subtitle, "Reference Card");
   assert.equal(properties.image, "reference-cards/AuxiliaryFiringArc.png");
   assert.equal(properties.key, ReferenceCard.AUXILIARY_FIRING_ARC);
});

QUnit.test("keys and values", function(assert)
{
   EnumTest.keysAndValues(assert, ReferenceCard);
});

QUnit.test("keys()", function(assert)
{
   EnumTest.keys(assert, ReferenceCard, 41, ReferenceCard.ACQUIRE_A_TARGET_LOCK_ACTION, ReferenceCard.USING_CLUSTER_MINES);
});

QUnit.test("required properties", function(assert)
{
   EnumUtilities.values(ReferenceCard).forEach(function(reference)
   {
      assert.ok(reference.title, "Missing title for " + reference.title);
      assert.ok(reference.subtitle, "Missing subtitle for " + reference.title);
      assert.ok(reference.image, "Missing image for " + reference.title);
      assert.ok(reference.key, "Missing key for " + reference.title);
   });
});

const ReferenceCardTest = {};
export default ReferenceCardTest;