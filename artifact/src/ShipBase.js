const ShipBase = {

  HUGE: "huge",
  LARGE: "large",
  SMALL: "small",
};

ShipBase.properties = 
{
   "huge": {
      "name": "huge",
      "width": 192,
      "height": 80,
      "key": "huge"
   },
   "large": {
      "name": "large",
      "width": 80,
      "height": 80,
      "key": "large"
   },
   "small": {
      "name": "small",
      "width": 40,
      "height": 40,
      "key": "small"
   }
};

Object.freeze(ShipBase);

export default ShipBase;