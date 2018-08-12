/*
 * Small ship base is 40mm x 40mm.
 * <p>Bearing straight, speed one maneuver is 40mm long. Other straight maneuvers are multiples of this.</p>
 */

import PathUtils from "./PathUtilities.js";
import PilotUtils from "./PilotUtilities.js";

const Maneuver = XMA.Maneuver;

const ManeuverComputer = {};

ManeuverComputer.computeFromPolygon = function(fromPosition, shipBase)
{
   return ManeuverComputer.computePolygon(shipBase, fromPosition.x, fromPosition.y, fromPosition.heading);
};

ManeuverComputer.computePolygon = function(shipBase, x, y, heading)
{
   let answer = PathUtils.rectanglePath(shipBase.width, shipBase.height);

   answer = PathUtils.rotate(answer, heading * Math.PI / 180);
   answer = PathUtils.translate(answer, x, y);

   return answer;
};

ManeuverComputer.computeToPolygon = function(maneuver, fromPosition, shipBase)
{
   const toPosition = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

   let answer;

   if (toPosition)
   {
      answer = ManeuverComputer.computePolygon(shipBase, toPosition.x, toPosition.y, toPosition.heading);
   }

   return answer;
};

ManeuverComputer.computePath = function(maneuver, fromPosition, shipBase)
{
   const speed = maneuver.speed;
   let answer = [];

   // Initial point.
   answer.push(0.0, 0.0);

   // First segment: move base center.
   const baseSize = shipBase.height / 2.0;
   let last, lastX, lastY;
   let x, y, factor;

   if (maneuver.key !== Maneuver.STATIONARY_0_HARD_0OR)
   {
      x = baseSize;
      answer.push(x, 0.0);
      lastX = x;
      lastY = 0.0;
   }

   if (speed !== 0)
   {
      // Middle segments: follow the arc.
      if (isStraight(maneuver))
      {
         x = lastX;
         for (let i = 0; i < speed; i++)
         {
            x += 40;
            answer.push(x, 0.0);
         }
         lastX = x;
      }
      else if (isBank(maneuver))
      {
         last = ManeuverComputer._addSegments(maneuver, answer, lastX, 45, 3 + speed);
         lastX = last.x;
         lastY = last.y;
      }
      else if (isTurn(maneuver))
      {
         last = ManeuverComputer._addSegments(maneuver, answer, lastX, 90, 5 + speed);
         lastX = last.x;
         lastY = last.y;
      }

      // Last segment: move base center.
      if (isStraight(maneuver))
      {
         x = baseSize + lastX;
         answer.push(x, 0.0);
      }
      else if (isBank(maneuver))
      {
         factor = (isRight(maneuver) ? 1.0 : -1.0);
         x = (baseSize * Math.cos(Math.PI / 4.0)) + lastX;
         y = (factor * baseSize * Math.cos(Math.PI / 4.0)) + lastY;
         answer.push(x, y);
      }
      else if (isTurn(maneuver))
      {
         factor = (isRight(maneuver) ? 1.0 : -1.0);
         y = (factor * baseSize) + lastY;
         answer.push(lastX, y);
      }
   }

   // Rotate and translate to fromPosition.
   const angle = fromPosition.heading * Math.PI / 180;
   answer = PathUtils.rotate(answer, angle);
   answer = PathUtils.translate(answer, fromPosition.x, fromPosition.y);

   return answer;
};

ManeuverComputer.computeToPosition = function(maneuver, fromPosition, shipBase)
{
   let answer;

   if ([Maneuver.STATIONARY_0_HARD_0OR].includes(maneuver.key))
   {
      answer = fromPosition;
   }
   else
   {
      if (isStraight(maneuver))
      {
         answer = ManeuverComputer._computeToPositionStraight(maneuver, fromPosition, shipBase);
      }
      else if (isBank(maneuver))
      {
         answer = ManeuverComputer._computeToPositionBank(maneuver, fromPosition, shipBase);
      }
      else if (isTurn(maneuver))
      {
         answer = ManeuverComputer._computeToPositionTurn(maneuver, fromPosition, shipBase);
      }
      else
      {
         throw "Unknown maneuver: " + maneuver.key;
      }
   }

   return answer;
};

ManeuverComputer.findCollision = function(shipDataMap, token)
{
   const shipData0 = shipDataMap[token];
   const polygon0 = shipData0.polygon;
   let answer;

   if (polygon0 !== undefined)
   {
      const keys = Object.keys(shipDataMap);

      for (let i = 0; i < keys.length; i++)
      {
         const shipData1 = shipDataMap[keys[i]];

         if (shipData0 !== shipData1)
         {
            const polygon1 = shipData1.polygon;

            if (polygon1 !== undefined && PathUtils.doPolygonsCollide(polygon0, polygon1))
            {
               answer = shipData1;
               break;
            }
         }
      }
   }

   return answer;
};

ManeuverComputer._addSegments = function(maneuver, path, lastX, heading, segmentCount)
{
   const radius = computeRadius(maneuver);

   const factor = (isRight(maneuver) ? 1.0 : -1.0);
   const deltaAngle = (heading * Math.PI / 180) / segmentCount;

   let myLastX = lastX;
   let myLastY = 0.0;

   for (let i = 1; i <= segmentCount; i++)
   {
      const angle = deltaAngle * i;
      const x = lastX + (radius * Math.sin(angle));
      const y = factor * radius * (1.0 - Math.cos(angle));
      path.push(x, y);
      myLastX = x;
      myLastY = y;
   }

   const answer = {};
   answer.x = Math.round(myLastX);
   answer.y = Math.round(myLastY);
   return answer;
};

ManeuverComputer._computeToPositionBank = function(maneuver, fromPosition, shipBase)
{
   const headingChange = computeHeadingChange(maneuver);
   const baseSize = shipBase.height / 2;
   const radius = computeRadius(maneuver);

   // Half base.
   const speedFactor = (isReverse(maneuver) ? -1 : 1);
   const x1 = speedFactor * baseSize;
   const y1 = 0.0;

   // Curve.
   const factor = (isRight(maneuver) ? 1.0 : -1.0);
   const angle = factor * 45.0 * Math.PI / 180.0;
   const x2 = speedFactor * radius * Math.cos(angle);
   const y2 = speedFactor * factor * radius * (1.0 - (Math.sin(angle) * factor));

   // Half base.
   const x3 = speedFactor * baseSize * Math.cos(angle);
   const y3 = speedFactor * baseSize * Math.sin(angle);

   const dx = x1 + x2 + x3;
   const dy = y1 + y2 + y3;

   return ManeuverComputer._createPosition(fromPosition, dx, dy, headingChange);
};

ManeuverComputer._computeToPositionStraight = function(maneuver, fromPosition, shipBase)
{
   let baseSize = shipBase.height / 2;
   const speed = maneuver.speed;
   const speedFactor = (isReverse(maneuver) ? -1 : 1);
   const dx = (2 * speedFactor * baseSize) + (40 * speedFactor * speed);
   const dy = 0;
   const headingChange = computeHeadingChange(maneuver);

   return ManeuverComputer._createPosition(fromPosition, dx, dy, headingChange);
};

ManeuverComputer._computeToPositionTurn = function(maneuver, fromPosition, shipBase)
{
   const baseSize = shipBase.height / 2;
   const radius = computeRadius(maneuver);
   const headingChange = computeHeadingChange(maneuver);

   // Half base.
   const x1 = baseSize;
   const y1 = 0.0;

   // Curve.
   const factor = (isRight(maneuver) ? 1.0 : -1.0);
   const angle = factor * 90.0 * Math.PI / 180.0;
   const x2 = radius;
   const y2 = factor * radius;

   // Half base.
   const x3 = baseSize * Math.cos(angle);
   const y3 = baseSize * Math.sin(angle);

   const dx = x1 + x2 + x3;
   const dy = y1 + y2 + y3;

   return ManeuverComputer._createPosition(fromPosition, dx, dy, headingChange);
};

ManeuverComputer._createPosition = function(fromPosition, dx, dy, headingChange)
{
   const x0 = fromPosition.x;
   const y0 = fromPosition.y;
   const angle = fromPosition.heading * Math.PI / 180;

   const x = Math.round((x0 + (dx * Math.cos(angle))) - (dy * Math.sin(angle)));
   const y = Math.round((y0 + (dx * Math.sin(angle))) + (dy * Math.cos(angle)));
   const heading = fromPosition.heading + headingChange;

   return XMS.PositionState.create(
   {
      x: x,
      y: y,
      heading: heading
   });
};

/*
 * @param x0 Non-collision X coordinate.
 *
 * @param y0 Non-collision Y coordinate.
 *
 * @param x1 Collision X coordinate.
 *
 * @param y1 Collision Y coordinate.
 *
 * @param polygon1 Colliding area.
 *
 * @return the closest non-collision point.
 */
ManeuverComputer._interpolate = function(x0, y0, x1, y1, polygon1, shipBase)
{
   let answer;

   // Calculate the midpoint.
   const t = 0.5;
   let x01 = x0 + (t * (x1 - x0));
   let y01 = y0 + (t * (y1 - y0));
   let heading;

   if (((round(x0 - x01, 0) === 0) && (round(y0 - y01, 0) === 0)) ||
      ((round(x01 - x1, 0) === 0) && (round(y01 - y1, 0) === 0)))
   {
      heading = computeHeading(x0, y0, x1, y1);
      answer = XMS.PositionState.create(
      {
         x: round(x0, 0),
         y: round(y0, 0),
         heading: heading
      });
   }
   else
   {
      const heading01 = computeHeading(x0, y0, x01, y01);
      const polygon01 = ManeuverComputer.computePolygon(shipBase, round(x01, 0), round(y01, 0), heading01);

      if (PathUtils.doPolygonsCollide(polygon01, polygon1))
      {
         x01 = x0 + (t * (x01 - x0));
         y01 = y0 + (t * (y01 - y0));
         answer = ManeuverComputer._interpolate(x0, y0, x01, y01, polygon1, shipBase);
      }
      else
      {
         x01 = x01 + (t * (x1 - x01));
         y01 = y01 + (t * (y1 - y01));
         answer = ManeuverComputer._interpolate(x01, y01, x1, y1, polygon1, shipBase);
      }
   }

   if (answer === undefined)
   {
      heading = computeHeading(x0, y0, x1, y1);
      answer = XMS.PositionState.create(
      {
         x: parseInt(x1),
         y: parseInt(y1),
         heading: heading
      });
   }

   return answer;
};

const computeHeading = (x1, y1, x2, y2) =>
{
   const dx = x2 - x1;
   const dy = y2 - y1;

   let answer = Math.round(Math.atan2(dy, dx) * 180.0 / Math.PI);

   return PilotUtils.normalizeAngle(answer);
};

const computeHeadingChange = maneuver =>
{
   let answer = 0.0;

   switch (maneuver.bearing)
   {
      case "Bank Left":
      case "Reverse Bank Left":
         answer = 360 - 45;
         break;
      case "Bank Right":
      case "Reverse Bank Right":
         answer = 45;
         break;
      case "Koiogran Turn":
      case "Tallon Roll Left":
      case "Tallon Roll Right":
         answer = 180;
         break;
      case "Segnor's Loop Left":
         answer = 135;
         break;
      case "Segnor's Loop Right":
         answer = 225;
         break;
      case "Turn Left":
         answer = 360 - 90;
         break;
      case "Turn Right":
         answer = 90;
         break;
   }

   return answer;
};

const computeRadius = maneuver =>
{
   let answer = 0.0;

   if (isBank(maneuver))
   {
      switch (maneuver.speed)
      {
         case 1:
            answer = 82.6;
            break;
         case 2:
            answer = 127.0;
            break;
         case 3:
            answer = 177.8;
            break;
      }
   }
   else if (isTurn(maneuver))
   {
      switch (maneuver.speed)
      {
         case 1:
            answer = 34.3;
            break;
         case 2:
            answer = 62.2;
            break;
         case 3:
            answer = 88.9;
            break;
      }
   }

   return answer;
};

const isBank = maneuver => ["Bank Left", "Bank Right", "Reverse Bank Left", "Reverse Bank Right", "Segnor's Loop Left", "Segnor's Loop Right"].includes(maneuver.bearing);

const isReverse = maneuver => ["Reverse Bank Left", "Reverse Bank Right", "Reverse Straight"].includes(maneuver.bearing);

const isRight = maneuver => ["Bank Right", "Reverse Bank Right", "Segnor's Loop Right", "Tallon Roll Right", "Turn Right"].includes(maneuver.bearing);

const isStraight = maneuver => ["Koiogran Turn", "Reverse Straight", "Straight"].includes(maneuver.bearing);

const isTurn = maneuver => ["Tallon Roll Left", "Tallon Roll Right", "Turn Left", "Turn Right"].includes(maneuver.bearing);

const round = function(number, digits)
{
   const factor = Math.pow(10.0, digits);

   return Math.round(factor * number) / factor;
};

if (Object.freeze)
{
   Object.freeze(ManeuverComputer);
}

export default ManeuverComputer;