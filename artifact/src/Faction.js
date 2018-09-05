const Faction = {
  FIRST_ORDER: "firstOrder",
  GALACTIC_EMPIRE: "galacticEmpire",
  REBEL_ALLIANCE: "rebelAlliance",
  RESISTANCE: "resistance",
  SCUM_AND_VILLAINY: "scumAndVillainy"
};

Faction.properties = {
  firstOrder: {
    name: "First Order",
    shortName: "FirstOrder",
    color: "#00FF00",
    image: "factions/first-order.png",
    key: "firstOrder"
  },
  galacticEmpire: {
    name: "Galactic Empire",
    shortName: "Imperial",
    color: "#00FF00",
    image: "factions/galactic-empire.png",
    key: "galacticEmpire"
  },
  rebelAlliance: {
    name: "Rebel Alliance",
    shortName: "Rebel",
    color: "#FF0000",
    image: "factions/rebel-alliance.png",
    key: "rebelAlliance"
  },
  resistance: {
    name: "Resistance",
    shortName: "Resistance",
    color: "#FF0000",
    image: "factions/resistance.png",
    key: "resistance"
  },
  scumAndVillainy: {
    name: "Scum and Villainy",
    shortName: "Scum",
    color: "#FFD700",
    image: "factions/scum-and-villainy.png",
    key: "scumAndVillainy"
  }
};

Object.freeze(Faction);

export default Faction;
