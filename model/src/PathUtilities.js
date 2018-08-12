const PathUtilities = {};

PathUtilities.close = function(path)
{
   const points = pointsFromPath(path);

   if (points.length >= 2)
   {
      points.push(points[0]);
      points.push(points[1]);
   }

   return Immutable(points);
};

PathUtilities.doPolygonsCollide = function(polygon0, polygon1)
{
   let answer;
   const b0 = PathUtilities._boundingBox(polygon0);
   const b1 = PathUtilities._boundingBox(polygon1);

   if ((b1.maxX < b0.minX || b0.maxX < b1.minX) && // b1 is left or right of b0
      (b1.maxY < b0.minY || b0.maxY < b1.minY) // b1 is below or above b0
   )
   {
      answer = false;
   }
   else
   {
      answer = false;
      const bb = (b0.area < b1.area ? b0 : b1);

      // Check if any point in bb is in both polygon0 and polygon1.
      const startX = round(bb.minX, 0);
      const startY = round(bb.minY, 0);
      const endX = round(bb.maxX, 0);
      const endY = round(bb.maxY, 0);

      for (let y = startY; !answer && y <= endY; y++)
      {
         for (let x = startX; !answer && x <= endX; x++)
         {
            answer = PathUtilities.isPointInPolygon(x, y, polygon0) && PathUtilities.isPointInPolygon(x, y, polygon1);
         }
      }
   }

   return answer;
};

PathUtilities.isPointInPolygon = function(x, y, polygon)
{
   const wn = PathUtilities._determineWindingNumber(x, y, polygon);

   return (wn % 2) !== 0;
};

PathUtilities.rectanglePath = (width, height) =>
{
   if (width < 0)
   {
      throw "width must be positive: " + width;
   }
   if (height < 0)
   {
      throw "height must be positive: " + height;
   }

   const x = -width / 2;
   const y = -height / 2;

   return PathUtilities.close([
     x + width, y, // forward port
     x + width, y + height, // forward starboard
     x, y + height, // aft starboard
     x, y // aft port
   ]);
};

/*
 * Rotate about the given point.
 */
PathUtilities.rotate = function(path, angle, centerX, centerY)
{
   const points = pointsFromPath(path);
   const cx = centerX || 0;
   const cy = centerY || 0;
   const sin = Math.sin(angle);
   const cos = Math.cos(angle);

   for (let i = 0; i < points.length; i += 2)
   {
      const x = points[i] - cx;
      const y = points[i + 1] - cy;

      points[i] = (x * cos - y * sin) + cx;
      points[i + 1] = (x * sin + y * cos) + cy;
   }

   return Immutable(points);
};

PathUtilities.translate = function(path, dx, dy)
{
   const points = pointsFromPath(path);

   for (let i = 0; i < points.length; i += 2)
   {
      points[i] = points[i] + dx;
      points[i + 1] = points[i + 1] + dy;
   }

   return Immutable(points);
};

////////////////////////////////////////////////////////////////////////////////
PathUtilities._boundingBox = function(path)
{
   let answer;
   const points = pointsFromPath(path);

   if (points.length > 1)
   {
      let minX = points[0];
      let minY = points[1];
      let maxX = minX;
      let maxY = minY;

      for (let i = 2; i < points.length; i += 2)
      {
         const x = points[i];
         const y = points[i + 1];

         minX = Math.min(x, minX);
         minY = Math.min(y, minY);
         maxX = Math.max(x, maxX);
         maxY = Math.max(y, maxY);
      }

      answer = {
         minX: minX,
         minY: minY,
         maxX: maxX,
         maxY: maxY,
         area: (maxX - minX) * (maxY - minY),
      };
   }

   return Immutable(answer);
};

/*
 * winding number test for a point in a polygon
 *
 * Input: P = a point,
 *
 * V[] = vertex points of a polygon V[n+1] with V[n]=V[0]
 *
 * Return: wn = the winding number (=0 only when P is outside)
 */
PathUtilities._determineWindingNumber = function(x, y, polygon)
{
   let wn = 0; // the winding number counter
   const points = pointsFromPath(polygon);
   const n = points.length - 2;

   // loop through all edges of the polygon
   for (let i = 0; i < n; i += 2)
   {
      // edge from V[i] to V[i+1]
      if (points[i + 1] <= y)
      {
         // start y <= P.y
         if (points[i + 3] > y) // an upward crossing
         {
            if (PathUtilities._isLeft(points[i], points[i + 1], points[i + 2], points[i + 3], x, y) > 0) // P
            // left of edge
            {
               ++wn; // have a valid up intersect
            }
         }
      }
      else
      {
         // start y > P.y (no test needed)
         if (points[i + 3] <= y) // a downward crossing
         {
            if (PathUtilities._isLeft(points[i], points[i + 1], points[i + 2], points[i + 3], x, y) < 0) // P
            // right of edge
            {
               --wn; // have a valid down intersect
            }
         }
      }
   }

   return wn;
};

/*
 * Tests if a point is Left|On|Right of an infinite line.
 *
 * Input: three points P0, P1, and P2
 *
 * Return:
 *
 * >0 for P2 left of the line through P0 and P1
 *
 * =0 for P2 on the line
 *
 * <0 for P2 right of the line
 *
 * See: Algorithm 1 <a href="http://geomalgorithms.com/a01-_area.html">"Area of Triangles and Polygons"</a>
 */
PathUtilities._isLeft = function(x0, y0, x1, y1, x2, y2)
{
   return ((x1 - x0) * (y2 - y0) - (x2 - x0) * (y1 - y0));
};

////////////////////////////////////////////////////////////////////////////////
const pointsFromPath = path => (Immutable.isImmutable(path) ? path.asMutable() : path.slice());

const round = function(number, digits)
{
   const factor = Math.pow(10.0, digits);

   return Math.round(factor * number) / factor;
};

Object.freeze(PathUtilities);

export default PathUtilities;