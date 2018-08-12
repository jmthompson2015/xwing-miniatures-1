const DamageType = {

  PILOT: "pilot",
  SHIP: "ship",
};

DamageType.properties = 
{
   "pilot": {
      "name": "Pilot",
      "key": "pilot"
   },
   "ship": {
      "name": "Ship",
      "key": "ship"
   }
};

Object.freeze(DamageType);

export default DamageType;