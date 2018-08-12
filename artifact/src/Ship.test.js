import EnumTest from "./Enum.test.js";
import EnumUtilities from "./EnumUtilities.js";
import Ship from "./Ship.js";
import ShipBase from "./ShipBase.js";

QUnit.module("Ship");

QUnit.test("Ship properties Firespray-31", function(assert)
{
   const ship = Ship.FIRESPRAY_31;
   const properties = Ship.properties[ship];
   assert.equal(properties.name, "Firespray-31");
   assert.equal(properties.agility, 2);
   assert.equal(properties.attack, 3);
   assert.equal(properties.hull, 6);
   assert.equal(properties.shields, 4);
   assert.equal(properties.silhouette, "silhouette/firespray-31.png");
   assert.equal(properties.size, ShipBase.LARGE);
   assert.equal(properties.key, ship);

   assert.ok(properties.actions);
   assert.equal(properties.actions.length, 3);
   assert.equal(properties.actions[0], "Focus");
   assert.equal(properties.actions[1], "Target Lock");
   assert.equal(properties.actions[2], "Evade");
   assert.ok(properties.firing_arcs);
   assert.equal(properties.firing_arcs.length, 2);
   assert.equal(properties.firing_arcs[0], "Auxiliary Rear");
   assert.equal(properties.firing_arcs[1], "Front");
   assert.ok(properties.images);
   assert.equal(properties.images.length, 2);
   assert.equal(properties.images[0], "ship/galactic-empire/firespray-31.png");
   assert.equal(properties.images[1], "ship/scum-and-villainy/firespray-31.png");
});

QUnit.test("Ship properties TIE Fighter", function(assert)
{
   const ship = Ship.TIE_FIGHTER;
   const properties = Ship.properties[ship];
   assert.equal(properties.name, "TIE Fighter");
   assert.equal(properties.agility, 3);
   assert.equal(properties.attack, 2);
   assert.equal(properties.hull, 3);
   assert.equal(properties.shields, 0);
   assert.equal(properties.silhouette, "silhouette/tie-fighter.png");
   assert.equal(properties.size, ShipBase.SMALL);
   assert.equal(properties.key, ship);

   assert.ok(properties.actions);
   assert.equal(properties.actions.length, 3);
   assert.equal(properties.actions[0], "Focus");
   assert.equal(properties.actions[1], "Barrel Roll");
   assert.equal(properties.actions[2], "Evade");
   assert.ok(properties.firing_arcs);
   assert.equal(properties.firing_arcs.length, 1);
   assert.equal(properties.firing_arcs[0], "Front");
   assert.ok(properties.images);
   assert.equal(properties.images.length, 2);
   assert.equal(properties.images[0], "ship/galactic-empire/tie-fighter.png");
   assert.equal(properties.images[1], "ship/rebel-alliance/tie-fighter.png");
});

QUnit.test("Ship properties X-Wing", function(assert)
{
   const ship = Ship.X_WING;
   const properties = Ship.properties[ship];
   assert.equal(properties.name, "X-wing");
   assert.equal(properties.agility, 2);
   assert.equal(properties.attack, 3);
   assert.equal(properties.hull, 3);
   assert.equal(properties.shields, 2);
   assert.equal(properties.silhouette, "silhouette/x-wing.png");
   assert.equal(properties.size, ShipBase.SMALL);
   assert.equal(properties.key, ship);

   assert.ok(properties.actions);
   assert.equal(properties.actions.length, 2);
   assert.equal(properties.actions[0], "Focus");
   assert.equal(properties.actions[1], "Target Lock");
   assert.ok(properties.firing_arcs);
   assert.equal(properties.firing_arcs.length, 1);
   assert.equal(properties.firing_arcs[0], "Front");
   assert.ok(properties.images);
   assert.equal(properties.images.length, 1);
   assert.equal(properties.images[0], "ship/rebel-alliance/x-wing.png");
});

QUnit.test("keys and values", function(assert)
{
   EnumTest.keysAndValues(assert, Ship);
});

QUnit.test("keys()", function(assert)
{
   EnumTest.keys(assert, Ship, 56, Ship.A_WING, Ship.Z_95_HEADHUNTER);
});

QUnit.test("required properties", function(assert)
{
   EnumUtilities.values(Ship).forEach(function(ship)
   {
      assert.ok(ship.name, "Missing name for " + ship.name);
      assert.ok(ship.size, "Missing shipBaseKey for " + ship.name);
      assert.ok(ship.key, "Missing key for " + ship.name);
   });
});

const ShipTest = {};
export default ShipTest;