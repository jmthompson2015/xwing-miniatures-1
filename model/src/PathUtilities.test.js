import PathUtils from "./PathUtilities.js";

QUnit.module("PathUtilities");

const round = (number, digits) => {
  // const factor = Math.pow(10.0, digits);
  const factor = 10.0 ** digits;

  return Math.round(factor * number) / factor;
};

// /////////////////////////////////////////////////////////////////////////////////////////////////
QUnit.test("close()", assert => {
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

QUnit.test("doPolygonsCollide() yes 1", assert => {
  // Setup.
  const polygon0 = PathUtils.rectanglePath(10, 10);
  const polygon1 = PathUtils.translate(PathUtils.rectanglePath(10, 20), 5, 0);

  // Run.
  const result = PathUtils.doPolygonsCollide(polygon0, polygon1);

  // Verify.
  assert.equal(result, true);
});

QUnit.test("doPolygonsCollide() yes 2", assert => {
  // Setup.
  const polygon0 = PathUtils.rectanglePath(10, 20);
  let polygon1 = PathUtils.rectanglePath(10, 10);
  polygon1 = PathUtils.translate(polygon1, 5, 0);

  // Run.
  const result = PathUtils.doPolygonsCollide(polygon0, polygon1);

  // Verify.
  assert.equal(result, true);
});

QUnit.test("doPolygonsCollide() yes 3", assert => {
  // Setup.
  const polygon0 = PathUtils.rectanglePath(40, 40);
  let polygon1 = PathUtils.rectanglePath(40, 40);
  polygon1 = PathUtils.rotate(polygon1, (45.0 * Math.PI) / 180.0);

  // Run.
  const result = PathUtils.doPolygonsCollide(polygon0, polygon1);

  // Verify.
  assert.equal(result, true);
});

QUnit.test("doPolygonsCollide() no right", assert => {
  // Setup.
  const polygon0 = PathUtils.rectanglePath(10, 10);
  let polygon1 = PathUtils.rectanglePath(10, 20);
  polygon1 = PathUtils.translate(polygon1, 15, 0);

  // Run.
  const result = PathUtils.doPolygonsCollide(polygon0, polygon1);

  // Verify.
  assert.equal(result, false);
});

QUnit.test("doPolygonsCollide() no above", assert => {
  // Setup.
  const polygon0 = PathUtils.rectanglePath(10, 10);
  let polygon1 = PathUtils.rectanglePath(10, 20);
  polygon1 = PathUtils.translate(polygon1, 0, 25);

  // Run.
  const result = PathUtils.doPolygonsCollide(polygon0, polygon1);

  // Verify.
  assert.equal(result, false);
});

QUnit.test("isPointInPolygon()", assert => {
  // Setup.
  let polygon = PathUtils.rectanglePath(20, 30);
  polygon = PathUtils.rotate(polygon, (30.0 * Math.PI) / 180.0);
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

QUnit.test("rectanglePath()", assert => {
  // Setup.
  const width = 40;
  const height = 40;

  // Run.
  const result = PathUtils.rectanglePath(width, height);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(result.length, 10);
  assert.equal(result[0], 20);
  assert.equal(result[1], -20);
  assert.equal(result[2], 20);
  assert.equal(result[3], 20);
  assert.equal(result[4], -20);
  assert.equal(result[5], 20);
  assert.equal(result[6], -20);
  assert.equal(result[7], -20);
  assert.equal(result[8], 20);
  assert.equal(result[9], -20);
});

QUnit.test("rotate()", assert => {
  // Setup.
  const path = PathUtils.close([10, -20, 10, 20, -10, 20, -10, -20]);

  // Run.
  const result = PathUtils.rotate(path, (30.0 * Math.PI) / 180.0);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(round(result[0], 2), 18.66);
  assert.equal(round(result[1], 2), -12.32);
  assert.equal(round(result[2], 2), -1.34);
  assert.equal(round(result[3], 2), 22.32);
  assert.equal(round(result[4], 2), -18.66);
  assert.equal(round(result[5], 2), 12.32);
  assert.equal(round(result[6], 2), 1.34);
  assert.equal(round(result[7], 2), -22.32);
  assert.equal(round(result[8], 2), 18.66);
  assert.equal(round(result[9], 2), -12.32);
});

QUnit.test("rotate() Rectangle Path", assert => {
  // Setup.
  const path = PathUtils.rectanglePath(20, 40);

  // Run.
  const result = PathUtils.rotate(path, (30.0 * Math.PI) / 180.0);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(round(result[0], 2), 18.66);
  assert.equal(round(result[1], 2), -12.32);
  assert.equal(round(result[2], 2), -1.34);
  assert.equal(round(result[3], 2), 22.32);
  assert.equal(round(result[4], 2), -18.66);
  assert.equal(round(result[5], 2), 12.32);
  assert.equal(round(result[6], 2), 1.34);
  assert.equal(round(result[7], 2), -22.32);
  assert.equal(round(result[8], 2), 18.66);
  assert.equal(round(result[9], 2), -12.32);
});

QUnit.test("translate()", assert => {
  // Setup.
  const path = PathUtils.close([10, -20, 11, 21, -10, 20, -11, -21]);

  // Run.
  const result = PathUtils.translate(path, 5, 6);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(result[0], 15);
  assert.equal(result[1], -14);
  assert.equal(result[2], 16);
  assert.equal(result[3], 27);
  assert.equal(result[4], -5);
  assert.equal(result[5], 26);
  assert.equal(result[6], -6);
  assert.equal(result[7], -15);
  assert.equal(result[8], 15);
  assert.equal(result[9], -14);
});

QUnit.test("translate() Rectangle Path", assert => {
  // Setup.
  const path = PathUtils.rectanglePath(20, 40);

  // Run.
  const result = PathUtils.translate(path, 5, 6);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(result[0], 15);
  assert.equal(result[1], -14);
  assert.equal(result[2], 15);
  assert.equal(result[3], 26);
  assert.equal(result[4], -5);
  assert.equal(result[5], 26);
  assert.equal(result[6], -5);
  assert.equal(result[7], -14);
  assert.equal(result[8], 15);
  assert.equal(result[9], -14);
});

// //////////////////////////////////////////////////////////////////////////////
QUnit.test("boundingBox()", assert => {
  // Setup.
  const path = PathUtils.close([10, -20, 11, 21, -10, 20, -11, -21]);

  // Run.
  const result = PathUtils.boundingBox(path);

  // Verify.
  assert.ok(result);
  assert.equal(Immutable.isImmutable(result), true);
  assert.equal(result.minX, -11);
  assert.equal(result.minY, -21);
  assert.equal(result.maxX, 11);
  assert.equal(result.maxY, 21);
  assert.equal(result.area, 924);
});

QUnit.test("boundingBox() degenerate", assert => {
  // Setup.
  const path = [];

  // Run.
  const result = PathUtils.boundingBox(path);

  // Verify.
  assert.equal(result, undefined);
});

QUnit.test("determineWindingNumber()", assert => {
  // Setup.
  let polygon = PathUtils.rectanglePath(20, 30);
  polygon = PathUtils.rotate(polygon, (30.0 * Math.PI) / 180.0);
  polygon = PathUtils.translate(polygon, 10, 20);

  // Run / Verify.
  assert.equal(PathUtils.determineWindingNumber(-10, 0, polygon), 0);
  assert.equal(PathUtils.determineWindingNumber(-10, 10, polygon), 0);
  assert.equal(PathUtils.determineWindingNumber(-10, 20, polygon), 0);
  assert.equal(PathUtils.determineWindingNumber(-10, 30, polygon), 0);
  assert.equal(PathUtils.determineWindingNumber(-10, 40, polygon), 0);

  assert.equal(PathUtils.determineWindingNumber(0, 0, polygon), 0);
  assert.equal(PathUtils.determineWindingNumber(0, 10, polygon), 0);
  assert.equal(PathUtils.determineWindingNumber(0, 20, polygon), 1);
  assert.equal(PathUtils.determineWindingNumber(0, 30, polygon), 1);
  assert.equal(PathUtils.determineWindingNumber(0, 40, polygon), 0);

  assert.equal(PathUtils.determineWindingNumber(10, 0, polygon), 0);
  assert.equal(PathUtils.determineWindingNumber(10, 10, polygon), 1);
  assert.equal(PathUtils.determineWindingNumber(10, 20, polygon), 1);
  assert.equal(PathUtils.determineWindingNumber(10, 30, polygon), 1);
  assert.equal(PathUtils.determineWindingNumber(10, 40, polygon), 0);

  assert.equal(PathUtils.determineWindingNumber(20, 0, polygon), 0);
  assert.equal(PathUtils.determineWindingNumber(20, 10, polygon), 1);
  assert.equal(PathUtils.determineWindingNumber(20, 20, polygon), 1);
  assert.equal(PathUtils.determineWindingNumber(20, 30, polygon), 0);
  assert.equal(PathUtils.determineWindingNumber(20, 40, polygon), 0);

  assert.equal(PathUtils.determineWindingNumber(30, 0, polygon), 0);
  assert.equal(PathUtils.determineWindingNumber(30, 10, polygon), 0);
  assert.equal(PathUtils.determineWindingNumber(30, 20, polygon), 0);
  assert.equal(PathUtils.determineWindingNumber(30, 30, polygon), 0);
  assert.equal(PathUtils.determineWindingNumber(30, 40, polygon), 0);
});

QUnit.test("isLeft()", assert => {
  // Run / Verify.
  assert.ok(PathUtils.isLeft(10, 20, 30, 40, 10, 30) > 0);
  assert.ok(PathUtils.isLeft(10, 20, 30, 40, 20, 30) === 0);
  assert.ok(PathUtils.isLeft(10, 20, 30, 40, 40, 30) < 0);
});

const PathUtilitiesTest = {};
export default PathUtilitiesTest;
