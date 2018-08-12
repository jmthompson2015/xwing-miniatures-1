import StringUtils from "./StringUtilities.js";

const ManeuverUtilities = {};

const BEARING_MAP = {
   "T": "Turn Left",
   "B": "Bank Left",
   "F": "Straight",
   "N": "Bank Right",
   "Y": "Turn Right",
   "K": "Koiogran Turn",
   "R": "Tallon Roll Right",
   "E": "Tallon Roll Left",
   "L": "Segnors Loop Left",
   "P": "Segnors Loop Right",
   "A": "Reverse Bank Left",
   "D": "Reverse Bank Right",
   "S": "Reverse Straight",
   "O": "Stationary",
};
const DIFFICULTY_MAP = {
   "G": "Easy",
   "W": "Standard",
   "R": "Hard"
};

ManeuverUtilities.dialToManeuver = function(dial)
{
   const speed = parseInt(dial.charAt(0));
   const bearing = BEARING_MAP[dial.charAt(1)];
   const difficulty = DIFFICULTY_MAP[dial.charAt(2)];
   const name = bearing + " " + speed + " " + difficulty + " " + dial;

   return StringUtils.toCamelCase(name);
};

export default ManeuverUtilities;