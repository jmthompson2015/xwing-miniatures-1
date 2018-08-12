import LabeledImage from "./LabeledImage.js";

let count = 1;
let element = React.createElement(LabeledImage,
{
   image: "token/cloak.png",
   label: String(count++),
   labelClass: "b f5 white",
   showOne: false,
   title: "Cloak"
});
ReactDOM.render(element, document.getElementById("cloakPanel1"));

element = React.createElement(LabeledImage,
{
   image: "token/cloak.png",
   label: String(count++),
   labelClass: "b f5 white",
   showOne: false,
   title: "Cloak"
});
ReactDOM.render(element, document.getElementById("cloakPanel2"));

element = React.createElement(LabeledImage,
{
   image: "token/evade.png",
   label: String(count++),
   labelClass: "b f5 white",
   title: "Evade"
});
ReactDOM.render(element, document.getElementById("evadePanel"));

element = React.createElement(LabeledImage,
{
   image: "token/focus.png",
   label: String(count++),
   labelClass: "b f5 white",
   title: "Focus"
});
ReactDOM.render(element, document.getElementById("focusPanel"));

element = React.createElement(LabeledImage,
{
   image: "token/shield.png",
   label: String(count++),
   labelClass: "b f5 white",
   title: "Shield"
});
ReactDOM.render(element, document.getElementById("shieldPanel"));

element = React.createElement(LabeledImage,
{
   image: "token/stress.png",
   label: String(count++),
   labelClass: "b f5 white",
   title: "Stress"
});
ReactDOM.render(element, document.getElementById("stressPanel"));

element = React.createElement(LabeledImage,
{
   image: "token/target-lock-attack.png",
   label: "A",
   labelClass: "b f5 white",
   title: "Attacker Target Lock",
   width: 38
});
ReactDOM.render(element, document.getElementById("atlPanel"));

element = React.createElement(LabeledImage,
{
   image: "token/target-lock-defend.png",
   label: "B",
   labelClass: "b f5 white",
   title: "Defender Target Lock",
   width: 38
});
ReactDOM.render(element, document.getElementById("dtlPanel"));

element = React.createElement(LabeledImage,
{
   image: "token/damage.png",
   label: String(count++),
   labelClass: "b f5 black",
   title: "Damage"
});
ReactDOM.render(element, document.getElementById("damagePanel"));

element = React.createElement(LabeledImage,
{
   image: "token/critical-damage.png",
   label: String(count++),
   labelClass: "b f5 black",
   title: "Critical Damage"
});
ReactDOM.render(element, document.getElementById("criticalDamagePanel"));