import PathUtils from "./PathUtilities.js";

QUnit.module("PathUtilities");

QUnit.test("close()", function(assert)
{
   // Setup.
   const path = [20, -20, 20, 20, -20, 20, -20, -20];

   // Run.
   const result = PathUtils.close(path);

   // Verify.
   assert.ok(result);
   assert.equal(Immutable.isImmutable(result), true);
   const length = 10;
   assert.equal(result.length, length);
   assert.equal(result[length - 2], 20);
   assert.equal(result[length - 1], -20);
});

QUnit.test("doPolygonsCollide() yes 1", function(assert)
{
   // Setup.
   const polygon0 = PathUtils.rectanglePath(10, 10);
   const polygon1 = PathUtils.translate(PathUtils.rectanglePath(10, 20), 5, 0);

   // Run.
   const result = PathUtils.doPolygonsCollide(polygon0, polygon1);

   // Verify.
   assert.equal(result, true);
});

QUnit.test("doPolygonsCollide() yes 2", function(assert)
{
   // Setup.
   const polygon0 = PathUtils.rectanglePath(10, 20);
   let polygon1 = PathUtils.rectanglePath(10, 10);
   polygon1 = PathUtils.translate(polygon1, 5, 0);

   // Run.
   const result = PathUtils.doPolygonsCollide(polygon0, polygon1);

   // Verify.
   assert.equal(result, true);
});

QUnit.test("doPolygonsCollide() yes 3", function(assert)
{
   // Setup.
   const polygon0 = PathUtils.rectanglePath(40, 40);
   let polygon1 = PathUtils.rectanglePath(40, 40);
   polygon1 = PathUtils.rotate(polygon1, 45.0 * Math.PI / 180.0);

   // Run.
   const result = PathUtils.doPolygonsCollide(polygon0, polygon1);

   // Verify.
   assert.equal(result, true);
});

QUnit.test("doPolygonsCollide() no right", function(assert)
{
   // Setup.
   const polygon0 = PathUtils.rectanglePath(10, 10);
   let polygon1 = PathUtils.rectanglePath(10, 20);
   polygon1 = PathUtils.translate(polygon1, 15, 0);

   // Run.
   const result = PathUtils.doPolygonsCollide(polygon0, polygon1);

   // Verify.
   assert.equal(result, false);
});

QUnit.test("doPolygonsCollide() no above", function(assert)
{
   // Setup.
   const polygon0 = PathUtils.rectanglePath(10, 10);
   let polygon1 = PathUtils.rectanglePath(10, 20);
   polygon1 = PathUtils.translate(polygon1, 0, 25);

   // Run.
   const result = PathUtils.doPolygonsCollide(polygon0, polygon1);

   // Verify.
   assert.equal(result, false);
});

QUnit.test("isPointInPolygon()", function(assert)
{
   // Setup.
   let polygon = PathUtils.rectanglePath(20, 30);
   polygon = PathUtils.rotate(polygon, 30.0 * Math.PI / 180.0);
   polygon = PathUtils.translate(polygon, 10, 20);

   // Run / Verify.
   assert.ok(!PathUtils.isPointInPolygon(-10, 0, polygon));
   assert.ok(!PathUtils.isPointInPolygon(-10, 10, polygon));
   assert.ok(!PathUtils.isPointInPolygon(-10, 20, polygon));
   assert.ok(!PathUtils.isPointInPolygon(-10, 30, polygon));
   assert.ok(!PathUtils.isPointInPolygon(-10, 40, polygon));

   assert.ok(!PathUtils.isPointInPolygon(0, 0, polygon));
   assert.ok(!PathUtils.isPointInPolygon(0, 10, polygon));
   assert.ok(PathUtils.isPointInPolygon(0, 20, polygon));
   assert.ok(PathUtils.isPointInPolygon(0, 30, polygon));
   assert.ok(!PathUtils.isPointInPolygon(0, 40, polygon));

   assert.ok(!PathUtils.isPointInPolygon(10, 0, polygon));
   assert.ok(PathUtils.isPointInPolygon(10, 10, polygon));
   assert.ok(PathUtils.isPointInPolygon(10, 20, polygon));
   assert.ok(PathUtils.isPointInPolygon(10, 30, polygon));
   assert.ok(!PathUtils.isPointInPolygon(10, 40, polygon));

   assert.ok(!PathUtils.isPointInPolygon(20, 0, polygon));
   assert.ok(PathUtils.isPointInPolygon(20, 10, polygon));
   assert.ok(PathUtils.isPointInPolygon(20, 20, polygon));
   assert.ok(!PathUtils.isPointInPolygon(20, 30, polygon));
   assert.ok(!PathUtils.isPointInPolygon(20, 40, polygon));

   assert.ok(!PathUtils.isPointInPolygon(30, 0, polygon));
   assert.ok(!PathUtils.isPointInPolygon(30, 10, polygon));
   assert.ok(!PathUtils.isPointInPolygon(30, 20, polygon));
   assert.ok(!PathUtils.isPointInPolygon(30, 30, polygon));
   assert.ok(!PathUtils.isPointInPolygon(30, 40, polygon));
});

QUnit.test("rectanglePath()", function(assert)
{
   // Setup.
   const width = 40;
   const height = 40;

   // Run.
   const result = PathUtils.rectanglePath(width, height);

   // Verify.
   assert.ok(result);
   assert.equal(Immutable.isImmutable(result), true);
   assert.equal(result.length, 10);
   let i = 0;
   assert.equal(result[i++], 20);
   assert.equal(result[i++], -20);
   assert.equal(result[i++], 20);
   assert.equal(result[i++], 20);
   assert.equal(result[i++], -20);
   assert.equal(result[i++], 20);
   assert.equal(result[i++], -20);
   assert.equal(result[i++], -20);
   assert.equal(result[i++], 20);
   assert.equal(result[i++], -20);
});

QUnit.test("rotate()", function(assert)
{
   // Setup.
   const path = PathUtils.close([10, -20, 10, 20, -10, 20, -10, -20]);

   // Run.
   const result = PathUtils.rotate(path, 30.0 * Math.PI / 180.0);

   // Verify.
   assert.ok(result);
   assert.equal(Immutable.isImmutable(result), true);
   let i = 0;
   assert.equal(round(result[i++], 2), 18.66);
   assert.equal(round(result[i++], 2), -12.32);
   assert.equal(round(result[i++], 2), -1.34);
   assert.equal(round(result[i++], 2), 22.32);
   assert.equal(round(result[i++], 2), -18.66);
   assert.equal(round(result[i++], 2), 12.32);
   assert.equal(round(result[i++], 2), 1.34);
   assert.equal(round(result[i++], 2), -22.32);
   assert.equal(round(result[i++], 2), 18.66);
   assert.equal(round(result[i++], 2), -12.32);
});

QUnit.test("rotate() Rectangle Path", function(assert)
{
   // Setup.
   const path = PathUtils.rectanglePath(20, 40);

   // Run.
   const result = PathUtils.rotate(path, 30.0 * Math.PI / 180.0);

   // Verify.
   assert.ok(result);
   let i = 0;
   assert.equal(Immutable.isImmutable(result), true);
   assert.equal(round(result[i++], 2), 18.66);
   assert.equal(round(result[i++], 2), -12.32);
   assert.equal(round(result[i++], 2), -1.34);
   assert.equal(round(result[i++], 2), 22.32);
   assert.equal(round(result[i++], 2), -18.66);
   assert.equal(round(result[i++], 2), 12.32);
   assert.equal(round(result[i++], 2), 1.34);
   assert.equal(round(result[i++], 2), -22.32);
   assert.equal(round(result[i++], 2), 18.66);
   assert.equal(round(result[i++], 2), -12.32);
});

QUnit.test("translate()", function(assert)
{
   // Setup.
   const path = PathUtils.close([10, -20, 11, 21, -10, 20, -11, -21]);

   // Run.
   const result = PathUtils.translate(path, 5, 6);

   // Verify.
   assert.ok(result);
   assert.equal(Immutable.isImmutable(result), true);
   let i = 0;
   assert.equal(result[i++], 15);
   assert.equal(result[i++], -14);
   assert.equal(result[i++], 16);
   assert.equal(result[i++], 27);
   assert.equal(result[i++], -5);
   assert.equal(result[i++], 26);
   assert.equal(result[i++], -6);
   assert.equal(result[i++], -15);
   assert.equal(result[i++], 15);
   assert.equal(result[i++], -14);
});

QUnit.test("translate() Rectangle Path", function(assert)
{
   // Setup.
   const path = PathUtils.rectanglePath(20, 40);

   // Run.
   const result = PathUtils.translate(path, 5, 6);

   // Verify.
   assert.ok(result);
   assert.equal(Immutable.isImmutable(result), true);
   let i = 0;
   assert.equal(result[i++], 15);
   assert.equal(result[i++], -14);
   assert.equal(result[i++], 15);
   assert.equal(result[i++], 26);
   assert.equal(result[i++], -5);
   assert.equal(result[i++], 26);
   assert.equal(result[i++], -5);
   assert.equal(result[i++], -14);
   assert.equal(result[i++], 15);
   assert.equal(result[i++], -14);
});

////////////////////////////////////////////////////////////////////////////////
QUnit.test("_boundingBox()", function(assert)
{
   // Setup.
   const path = PathUtils.close([10, -20, 11, 21, -10, 20, -11, -21]);

   // Run.
   const result = PathUtils._boundingBox(path);

   // Verify.
   assert.ok(result);
   assert.equal(Immutable.isImmutable(result), true);
   assert.equal(result.minX, -11);
   assert.equal(result.minY, -21);
   assert.equal(result.maxX, 11);
   assert.equal(result.maxY, 21);
   assert.equal(result.area, 924);
});

QUnit.test("_boundingBox() degenerate", function(assert)
{
   // Setup.
   const path = [];

   // Run.
   const result = PathUtils._boundingBox(path);

   // Verify.
   assert.equal(result, undefined);
});

QUnit.test("_determineWindingNumber()", function(assert)
{
   // Setup.
   let polygon = PathUtils.rectanglePath(20, 30);
   polygon = PathUtils.rotate(polygon, 30.0 * Math.PI / 180.0);
   polygon = PathUtils.translate(polygon, 10, 20);

   // Run / Verify.
   assert.equal(PathUtils._determineWindingNumber(-10, 0, polygon), 0);
   assert.equal(PathUtils._determineWindingNumber(-10, 10, polygon), 0);
   assert.equal(PathUtils._determineWindingNumber(-10, 20, polygon), 0);
   assert.equal(PathUtils._determineWindingNumber(-10, 30, polygon), 0);
   assert.equal(PathUtils._determineWindingNumber(-10, 40, polygon), 0);

   assert.equal(PathUtils._determineWindingNumber(0, 0, polygon), 0);
   assert.equal(PathUtils._determineWindingNumber(0, 10, polygon), 0);
   assert.equal(PathUtils._determineWindingNumber(0, 20, polygon), 1);
   assert.equal(PathUtils._determineWindingNumber(0, 30, polygon), 1);
   assert.equal(PathUtils._determineWindingNumber(0, 40, polygon), 0);

   assert.equal(PathUtils._determineWindingNumber(10, 0, polygon), 0);
   assert.equal(PathUtils._determineWindingNumber(10, 10, polygon), 1);
   assert.equal(PathUtils._determineWindingNumber(10, 20, polygon), 1);
   assert.equal(PathUtils._determineWindingNumber(10, 30, polygon), 1);
   assert.equal(PathUtils._determineWindingNumber(10, 40, polygon), 0);

   assert.equal(PathUtils._determineWindingNumber(20, 0, polygon), 0);
   assert.equal(PathUtils._determineWindingNumber(20, 10, polygon), 1);
   assert.equal(PathUtils._determineWindingNumber(20, 20, polygon), 1);
   assert.equal(PathUtils._determineWindingNumber(20, 30, polygon), 0);
   assert.equal(PathUtils._determineWindingNumber(20, 40, polygon), 0);

   assert.equal(PathUtils._determineWindingNumber(30, 0, polygon), 0);
   assert.equal(PathUtils._determineWindingNumber(30, 10, polygon), 0);
   assert.equal(PathUtils._determineWindingNumber(30, 20, polygon), 0);
   assert.equal(PathUtils._determineWindingNumber(30, 30, polygon), 0);
   assert.equal(PathUtils._determineWindingNumber(30, 40, polygon), 0);
});

QUnit.test("_isLeft()", function(assert)
{
   // Run / Verify.
   assert.ok(PathUtils._isLeft(10, 20, 30, 40, 10, 30) > 0);
   assert.ok(PathUtils._isLeft(10, 20, 30, 40, 20, 30) === 0);
   assert.ok(PathUtils._isLeft(10, 20, 30, 40, 40, 30) < 0);
});

////////////////////////////////////////////////////////////////////////////////
const round = function(number, digits)
{
   const factor = Math.pow(10.0, digits);

   return Math.round(factor * number) / factor;
};

const PathUtilitiesTest = {};
export default PathUtilitiesTest;