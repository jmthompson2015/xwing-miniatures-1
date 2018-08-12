const Stat = {
   AGILITY: "agility",
   ENERGY: "energy",
   HULL: "hull",
   PILOT_SKILL: "pilotSkill",
   PRIMARY_WEAPON: "primaryWeapon",
   SHIELD: "shield",
};

Stat.properties = {
   "agility":
   {
      name: "Agility",
      grant: "agility",
      key: "agility"
   },
   "energy":
   {
      name: "Energy",
      grant: "energy",
      key: "energy"
   },
   "hull":
   {
      name: "Hull",
      grant: "hull",
      key: "hull"
   },
   "pilotSkill":
   {
      name: "Pilot Skill",
      grant: "skill",
      key: "pilotSkill"
   },
   "primaryWeapon":
   {
      name: "Primary Weapon",
      grant: "attack",
      key: "primaryWeapon"
   },
   "shield":
   {
      name: "Shield",
      grant: "shields",
      key: "shield"
   }
};

Object.freeze(Stat);

export default Stat;