import ManeuverChooser from "./ManeuverChooser.js";

let pilotCard = XMA.Selector.pilotCard(XMA.PilotCard.ACADEMY_PILOT);
let ship = XMA.Selector.shipValueByPilot(pilotCard.key);
let maneuverKeys = XMA.Selector.maneuverKeysByShip(ship.key);
let maneuvers = R.map(maneuverKey => XMA.Selector.maneuver(maneuverKey), maneuverKeys);
let element = React.createElement(ManeuverChooser,
{
   pilotName: pilotCard.name,
   shipName: ship.name,
   maneuvers: maneuvers,
   pilotId: 1,
   callback: myCallback
});
ReactDOM.render(element, document.getElementById("inputArea0"));

pilotCard = XMA.Selector.pilotCard(XMA.PilotCard.CAPTAIN_KAGI);
ship = XMA.Selector.shipValueByPilot(pilotCard.key);
maneuverKeys = XMA.Selector.maneuverKeysByShip(ship.key);
maneuvers = R.map(maneuverKey => XMA.Selector.maneuver(maneuverKey), maneuverKeys);
element = React.createElement(ManeuverChooser,
{
   pilotName: pilotCard.name,
   shipName: ship.name,
   maneuvers: maneuvers,
   pilotId: 2,
   callback: myCallback
});
ReactDOM.render(element, document.getElementById("inputArea1"));

pilotCard = XMA.Selector.pilotCard(XMA.PilotCard.ROOKIE_PILOT);
ship = XMA.Selector.shipValueByPilot(pilotCard.key);
maneuverKeys = XMA.Selector.maneuverKeysByShip(ship.key);
maneuvers = R.map(maneuverKey => XMA.Selector.maneuver(maneuverKey), maneuverKeys);
element = React.createElement(ManeuverChooser,
{
   pilotName: pilotCard.name,
   shipName: ship.name,
   maneuvers: maneuvers,
   pilotId: 3,
   callback: myCallback
});
ReactDOM.render(element, document.getElementById("inputArea2"));

pilotCard = XMA.Selector.pilotCard(XMA.PilotCard.POE_DAMERON);
ship = XMA.Selector.shipValueByPilot(pilotCard.key);
maneuverKeys = XMA.Selector.maneuverKeysByShip(ship.key);
maneuvers = R.map(maneuverKey => XMA.Selector.maneuver(maneuverKey), maneuverKeys);
element = React.createElement(ManeuverChooser,
{
   pilotName: pilotCard.name,
   shipName: ship.name,
   maneuvers: maneuvers,
   pilotId: 4,
   callback: myCallback
});
ReactDOM.render(element, document.getElementById("inputArea3"));

pilotCard = XMA.Selector.pilotCard(XMA.PilotCard.UNKAR_PLUTT);
ship = XMA.Selector.shipValueByPilot(pilotCard.key);
maneuverKeys = XMA.Selector.maneuverKeysByShip(ship.key);
maneuvers = R.map(maneuverKey => XMA.Selector.maneuver(maneuverKey), maneuverKeys);
element = React.createElement(ManeuverChooser,
{
   pilotName: pilotCard.name,
   shipName: ship.name,
   maneuvers: maneuvers,
   pilotId: 5,
   callback: myCallback
});
ReactDOM.render(element, document.getElementById("inputArea4"));

function myCallback(
{
   pilotId,
   maneuverKey
})
{
   console.log("myCallback() pilotId = " + pilotId + " maneuverKey = " + maneuverKey);
}