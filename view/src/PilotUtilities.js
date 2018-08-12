const PilotUtilities = {};

PilotUtilities.name = (pilotInstance, isShort) =>
{
   const pilotCard = XMA.Selector.pilotCard(pilotInstance.pilotKey);
   let answer = pilotInstance.id + (pilotCard.unique ? " \u2022 " : " ") + pilotCard.name;

   if (!isShort)
   {
      const ship = XMA.Selector.shipValueByPilot(pilotInstance.pilotKey);
      answer += " (" + ship.name + ")";
   }

   return answer;
};

Object.freeze(PilotUtilities);

export default PilotUtilities;