const Range = {
   ONE: "one",
   TWO: "two",
   THREE: "three",
   FOUR: "four",
   FIVE: "five"
};

Range.properties = {
   "one":
   {
      minDistance: 0, // Minimum distance. (mm)
      maxDistance: 100, // Maximum distance. (mm)
      name: "1",
      key: "one"
   },
   "two":
   {
      minDistance: 101, // Minimum distance. (mm)
      maxDistance: 200, // Maximum distance. (mm)
      name: "2",
      key: "two"
   },
   "three":
   {
      minDistance: 201, // Minimum distance. (mm)
      maxDistance: 300, // Maximum distance. (mm)
      name: "3",
      key: "three"
   },
   "four":
   {
      minDistance: 301, // Minimum distance. (mm)
      maxDistance: 400, // Maximum distance. (mm)
      name: "4",
      key: "four"
   },
   "five":
   {
      minDistance: 401, // Minimum distance. (mm)
      maxDistance: 500, // Maximum distance. (mm)
      name: "5",
      key: "five"
   }
};

Object.freeze(Range);

export default Range;