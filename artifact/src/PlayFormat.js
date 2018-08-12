const PlayFormat = {
   EPIC: "epic",
   STANDARD: "standard"
};

PlayFormat.properties = {
   "epic":
   {
      name: "Epic",
      width: 1830, // mm
      height: 915, // mm
      key: "epic",
   },
   "standard":
   {
      name: "Standard",
      width: 915, // mm
      height: 915, // mm
      key: "standard"
   }
};

Object.freeze(PlayFormat);

export default PlayFormat;