const Faction = {

  FIRST_ORDER: "firstOrder",
  GALACTIC_EMPIRE: "galacticEmpire",
  REBEL_ALLIANCE: "rebelAlliance",
  RESISTANCE: "resistance",
  SCUM_AND_VILLAINY: "scumAndVillainy",
};

Faction.properties = 
{
   "firstOrder": {
      "name": "First Order",
      "shortName": "FirstOrder",
      "color": "rgb(0, 255, 0)",
      "image": "factions/first-order.png",
      "key": "firstOrder"
   },
   "galacticEmpire": {
      "name": "Galactic Empire",
      "shortName": "Imperial",
      "color": "rgb(0, 255, 0)",
      "image": "factions/galactic-empire.png",
      "key": "galacticEmpire"
   },
   "rebelAlliance": {
      "name": "Rebel Alliance",
      "shortName": "Rebel",
      "color": "red",
      "image": "factions/rebel-alliance.png",
      "key": "rebelAlliance"
   },
   "resistance": {
      "name": "Resistance",
      "shortName": "Resistance",
      "color": "red",
      "image": "factions/resistance.png",
      "key": "resistance"
   },
   "scumAndVillainy": {
      "name": "Scum and Villainy",
      "shortName": "Scum",
      "color": "rgb(255, 215, 0)",
      "image": "factions/scum-and-villainy.png",
      "key": "scumAndVillainy"
   }
};

Object.freeze(Faction);

export default Faction;