const FiringArc = {

  AUXILIARY_180: "auxiliary180",
  AUXILIARY_REAR: "auxiliaryRear",
  BULLSEYE: "bullseye",
  FRONT: "front",
  MOBILE: "mobile",
  TURRET: "turret",
};

FiringArc.properties = 
{
   "auxiliary180": {
      "name": "Auxiliary 180",
      "minAngle": 270,
      "maxAngle": 90,
      "key": "auxiliary180"
   },
   "auxiliaryRear": {
      "name": "Auxiliary Rear",
      "minAngle": 135,
      "maxAngle": 225,
      "key": "auxiliaryRear"
   },
   "bullseye": {
      "name": "Bullseye",
      "key": "bullseye"
   },
   "front": {
      "name": "Front",
      "minAngle": 315,
      "maxAngle": 45,
      "key": "front"
   },
   "mobile": {
      "name": "Mobile",
      "key": "mobile"
   },
   "turret": {
      "name": "Turret",
      "minAngle": 0,
      "maxAngle": 359,
      "key": "turret"
   }
};

Object.freeze(FiringArc);

export default FiringArc;