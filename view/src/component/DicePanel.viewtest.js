import DicePanel from "./DicePanel.js";

const attackDiceCount = 4;
const attackDiceKeys = XMM.DiceUtilities.rollAttackDice(attackDiceCount);

const element0 = React.createElement(DicePanel,
{
   enumClass: XMA.AttackDiceValue,
   diceKeys: attackDiceKeys
});
ReactDOM.render(element0, document.getElementById("inputArea0"));

const defenseDiceCount = 3;
const defenseDiceKeys = XMM.DiceUtilities.rollDefenseDice(defenseDiceCount);

const element1 = React.createElement(DicePanel,
{
   enumClass: XMA.DefenseDiceValue,
   diceKeys: defenseDiceKeys
});
ReactDOM.render(element1, document.getElementById("inputArea1"));