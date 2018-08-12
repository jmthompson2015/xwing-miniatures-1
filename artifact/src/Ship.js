const Ship = {

  A_WING: "aWing",
  AGGRESSOR: "aggressor",
  ALPHA_CLASS_STAR_WING: "alphaClassStarWing",
  ARC_170: "arc170",
  ATTACK_SHUTTLE: "attackShuttle",
  AUZITUCK_GUNSHIP: "auzituckGunship",
  B_SF_17_BOMBER: "bSf17Bomber",
  B_WING: "bWing",
  C_ROC_CRUISER: "cRocCruiser",
  CR90_CORVETTE_AFT: "cr90CorvetteAft",
  CR90_CORVETTE_FORE: "cr90CorvetteFore",
  E_WING: "eWing",
  FIRESPRAY_31: "firespray31",
  G_1A_STARFIGHTER: "g1aStarfighter",
  GOZANTI_CLASS_CRUISER: "gozantiClassCruiser",
  GR_75_MEDIUM_TRANSPORT: "gr75MediumTransport",
  HWK_290: "hwk290",
  JUMPMASTER_5000: "jumpmaster5000",
  K_WING: "kWing",
  KIHRAXZ_FIGHTER: "kihraxzFighter",
  LAMBDA_CLASS_SHUTTLE: "lambdaClassShuttle",
  LANCER_CLASS_PURSUIT_CRAFT: "lancerClassPursuitCraft",
  M12_L_KIMOGILA_FIGHTER: "m12LKimogilaFighter",
  M3_A_INTERCEPTOR: "m3AInterceptor",
  PROTECTORATE_STARFIGHTER: "protectorateStarfighter",
  QUADJUMPER: "quadjumper",
  RAIDER_CLASS_CORVETTE_AFT: "raiderClassCorvetteAft",
  RAIDER_CLASS_CORVETTE_FORE: "raiderClassCorvetteFore",
  SCURRG_H_6_BOMBER: "scurrgH6Bomber",
  SHEATHIPEDE_CLASS_SHUTTLE: "sheathipedeClassShuttle",
  STARVIPER: "starviper",
  T_70_X_WING: "t70XWing",
  TIE_ADV_PROTOTYPE: "tieAdvPrototype",
  TIE_ADVANCED: "tieAdvanced",
  TIE_AGGRESSOR: "tieAggressor",
  TIE_BOMBER: "tieBomber",
  TIE_DEFENDER: "tieDefender",
  TIE_FIGHTER: "tieFighter",
  TIE_FO_FIGHTER: "tieFoFighter",
  TIE_INTERCEPTOR: "tieInterceptor",
  TIE_PHANTOM: "tiePhantom",
  TIE_PUNISHER: "tiePunisher",
  TIE_REAPER: "tieReaper",
  TIE_SF_FIGHTER: "tieSfFighter",
  TIE_SILENCER: "tieSilencer",
  TIE_STRIKER: "tieStriker",
  U_WING: "uWing",
  UPSILON_CLASS_SHUTTLE: "upsilonClassShuttle",
  VCX_100: "vcx100",
  VT_49_DECIMATOR: "vt49Decimator",
  X_WING: "xWing",
  Y_WING: "yWing",
  YT_1300: "yt1300",
  YT_2400: "yt2400",
  YV_666: "yv666",
  Z_95_HEADHUNTER: "z95Headhunter",
};

Ship.properties = 
{
   "aWing": {
      "name": "A-wing",
      "faction": [
         "Rebel Alliance"
      ],
      "attack": 2,
      "agility": 3,
      "hull": 2,
      "shields": 2,
      "actions": [
         "Focus",
         "Target Lock",
         "Boost",
         "Evade"
      ],
      "size": "small",
      "xws": "awing",
      "id": 2,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "1TW",
         "1YW",
         "2TG",
         "2BG",
         "2FG",
         "2NG",
         "2YG",
         "3TW",
         "3BW",
         "3FG",
         "3NW",
         "3YW",
         "3KR",
         "4FG",
         "5FG",
         "5KR"
      ],
      "images": [
         "ship/rebel-alliance/a-wing.png"
      ],
      "silhouette": "silhouette/a-wing.png",
      "key": "aWing"
   },
   "aggressor": {
      "name": "Aggressor",
      "faction": [
         "Scum and Villainy"
      ],
      "attack": 3,
      "agility": 3,
      "hull": 4,
      "shields": 4,
      "actions": [
         "Focus",
         "Target Lock",
         "Boost",
         "Evade"
      ],
      "size": "large",
      "xws": "aggressor",
      "id": 23,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "1TW",
         "1BG",
         "1FG",
         "1NG",
         "1YW",
         "2TW",
         "2BG",
         "2FG",
         "2NG",
         "2YW",
         "3BG",
         "3FG",
         "3NG",
         "3LR",
         "3PR",
         "4KR"
      ],
      "images": [
         "ship/scum-and-villainy/aggressor.png"
      ],
      "silhouette": "silhouette/aggressor.png",
      "key": "aggressor"
   },
   "alphaClassStarWing": {
      "name": "Alpha-class Star Wing",
      "xws": "alphaclassstarwing",
      "faction": [
         "Galactic Empire"
      ],
      "actions": [
         "Focus",
         "Reload",
         "SLAM",
         "Target Lock"
      ],
      "size": "small",
      "attack": 2,
      "agility": 2,
      "hull": 4,
      "shields": 3,
      "id": 50,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "1BW",
         "1FG",
         "1NW",
         "2TW",
         "2BG",
         "2FG",
         "2NG",
         "2YW",
         "3TW",
         "3BW",
         "3FW",
         "3NW",
         "3YW",
         "4FR"
      ],
      "images": [
         "ship/galactic-empire/alpha-class-star-wing.png"
      ],
      "silhouette": "silhouette/alpha-class-star-wing.png",
      "key": "alphaClassStarWing"
   },
   "arc170": {
      "name": "ARC-170",
      "xws": "arc170",
      "faction": [
         "Rebel Alliance"
      ],
      "actions": [
         "Focus",
         "Target Lock"
      ],
      "size": "small",
      "attack": 2,
      "agility": 1,
      "hull": 6,
      "shields": 3,
      "id": 38,
      "firing_arcs": [
         "Auxiliary Rear",
         "Front"
      ],
      "dial": [
         "1BG",
         "1FG",
         "1NG",
         "2TW",
         "2BG",
         "2FG",
         "2NG",
         "2YW",
         "3TR",
         "3BW",
         "3FW",
         "3NW",
         "3YR",
         "4FR",
         "4KR"
      ],
      "images": [
         "ship/rebel-alliance/arc-170.png"
      ],
      "silhouette": "silhouette/arc-170.png",
      "key": "arc170"
   },
   "attackShuttle": {
      "name": "Attack Shuttle",
      "faction": [
         "Rebel Alliance"
      ],
      "attack": 3,
      "agility": 2,
      "hull": 2,
      "shields": 2,
      "actions": [
         "Barrel Roll",
         "Evade",
         "Focus"
      ],
      "size": "small",
      "xws": "attackshuttle",
      "id": 33,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "1TR",
         "1BG",
         "1FG",
         "1NG",
         "1YR",
         "2TW",
         "2BW",
         "2FG",
         "2NW",
         "2YW",
         "3TR",
         "3BW",
         "3FW",
         "3NW",
         "3YR",
         "4FW",
         "4KR"
      ],
      "images": [
         "ship/rebel-alliance/attack-shuttle.png"
      ],
      "silhouette": "silhouette/attack-shuttle.png",
      "key": "attackShuttle"
   },
   "auzituckGunship": {
      "name": "Auzituck Gunship",
      "xws": "auzituckgunship",
      "faction": [
         "Rebel Alliance"
      ],
      "actions": [
         "Focus",
         "Reinforce"
      ],
      "size": "small",
      "attack": 3,
      "agility": 1,
      "hull": 6,
      "shields": 3,
      "id": 47,
      "firing_arcs": [
         "Auxiliary 180",
         "Front"
      ],
      "dial": [
         "1BG",
         "1FG",
         "1NG",
         "2TW",
         "2BW",
         "2FG",
         "2NW",
         "2YW",
         "3TW",
         "3BW",
         "3FG",
         "3NW",
         "3YW",
         "4FW",
         "5FR"
      ],
      "images": [
         "ship/rebel-alliance/auzituck-gunship.png"
      ],
      "silhouette": "silhouette/auzituck-gunship.png",
      "key": "auzituckGunship"
   },
   "bSf17Bomber": {
      "name": "B/SF-17 Bomber",
      "xws": "bsf17bomber",
      "faction": [
         "Resistance"
      ],
      "actions": [
         "Focus",
         "Target Lock"
      ],
      "size": "large",
      "attack": 2,
      "agility": 1,
      "hull": 9,
      "shields": 3,
      "firing_arcs": [
         "Front",
         "Turret"
      ],
      "id": 54,
      "dial": [
         "0OR",
         "1TR",
         "1BG",
         "1FG",
         "1NG",
         "1YR",
         "2TW",
         "2BW",
         "2FG",
         "2NW",
         "2YW",
         "3BW",
         "3FW",
         "3NW"
      ],
      "images": [
         "ship/resistance/b-sf-17-bomber.png"
      ],
      "silhouette": "silhouette/b-sf-17-bomber.png",
      "key": "bSf17Bomber"
   },
   "bWing": {
      "name": "B-wing",
      "faction": [
         "Rebel Alliance"
      ],
      "attack": 3,
      "agility": 1,
      "hull": 3,
      "shields": 5,
      "actions": [
         "Focus",
         "Target Lock",
         "Barrel Roll"
      ],
      "size": "small",
      "xws": "bwing",
      "id": 10,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "1TR",
         "1BG",
         "1FG",
         "1NG",
         "1YR",
         "2TW",
         "2BW",
         "2FG",
         "2NW",
         "2YW",
         "2KR",
         "3BR",
         "3FW",
         "3NR",
         "4FR"
      ],
      "images": [
         "ship/rebel-alliance/b-wing.png"
      ],
      "silhouette": "silhouette/b-wing.png",
      "key": "bWing"
   },
   "cRocCruiser": {
      "name": "C-ROC Cruiser",
      "xws": "croccruiser",
      "faction": [
         "Scum and Villainy"
      ],
      "actions": [
         "Jam",
         "Recover",
         "Reinforce",
         "Target Lock"
      ],
      "size": "huge",
      "energy": 4,
      "agility": 0,
      "hull": 10,
      "shields": 4,
      "maneuvers_energy": [
         [
            0,
            0,
            0,
            0,
            0,
            0
         ],
         [
            0,
            2,
            3,
            2,
            0,
            0
         ],
         [
            0,
            1,
            2,
            1,
            0,
            0
         ],
         [
            0,
            0,
            2,
            0,
            0,
            0
         ],
         [
            0,
            0,
            1,
            0,
            0,
            0
         ]
      ],
      "id": 46,
      "images": [
         "ship/scum-and-villainy/c-roc-cruiser.png"
      ],
      "silhouette": "silhouette/c-roc-cruiser.png",
      "key": "cRocCruiser"
   },
   "cr90CorvetteAft": {
      "name": "CR90 Corvette (Aft)",
      "faction": [
         "Rebel Alliance"
      ],
      "energy": 5,
      "agility": 0,
      "hull": 8,
      "shields": 3,
      "actions": [
         "Recover",
         "Reinforce"
      ],
      "epic_points": 1.5,
      "maneuvers_energy": [
         [
            0,
            0,
            0,
            0,
            0,
            0
         ],
         [
            0,
            3,
            0,
            3,
            0,
            0
         ],
         [
            0,
            2,
            3,
            2,
            0,
            0
         ],
         [
            0,
            0,
            2,
            0,
            0,
            0
         ],
         [
            0,
            0,
            1,
            0,
            0,
            0
         ]
      ],
      "size": "huge",
      "xws": "cr90corvetteaft",
      "id": 18,
      "images": [
         "ship/rebel-alliance/cr90-corvette-aft.png"
      ],
      "silhouette": "silhouette/cr90-corvette-aft.png",
      "key": "cr90CorvetteAft"
   },
   "cr90CorvetteFore": {
      "name": "CR90 Corvette (Fore)",
      "faction": [
         "Rebel Alliance"
      ],
      "attack": 4,
      "agility": 0,
      "hull": 8,
      "shields": 5,
      "actions": [
         "Coordinate",
         "Target Lock"
      ],
      "epic_points": 1.5,
      "maneuvers_energy": [
         [
            0,
            0,
            0,
            0,
            0,
            0
         ],
         [
            0,
            3,
            0,
            3,
            0,
            0
         ],
         [
            0,
            2,
            3,
            2,
            0,
            0
         ],
         [
            0,
            0,
            2,
            0,
            0,
            0
         ],
         [
            0,
            0,
            1,
            0,
            0,
            0
         ]
      ],
      "size": "huge",
      "xws": "cr90corvettefore",
      "id": 17,
      "images": [
         "ship/rebel-alliance/cr90-corvette-fore.png"
      ],
      "silhouette": "silhouette/cr90-corvette-fore.png",
      "key": "cr90CorvetteFore"
   },
   "eWing": {
      "name": "E-wing",
      "faction": [
         "Rebel Alliance"
      ],
      "attack": 3,
      "agility": 3,
      "hull": 2,
      "shields": 3,
      "actions": [
         "Focus",
         "Target Lock",
         "Barrel Roll",
         "Evade"
      ],
      "size": "small",
      "xws": "ewing",
      "id": 15,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "1BW",
         "1FG",
         "1NW",
         "2TW",
         "2BG",
         "2FG",
         "2NG",
         "2YW",
         "3TW",
         "3BW",
         "3FG",
         "3NW",
         "3YW",
         "3KR",
         "4FW",
         "4KR",
         "5FW"
      ],
      "images": [
         "ship/rebel-alliance/e-wing.png"
      ],
      "silhouette": "silhouette/e-wing.png",
      "key": "eWing"
   },
   "firespray31": {
      "name": "Firespray-31",
      "faction": [
         "Galactic Empire",
         "Scum and Villainy"
      ],
      "attack": 3,
      "agility": 2,
      "hull": 6,
      "shields": 4,
      "actions": [
         "Focus",
         "Target Lock",
         "Evade"
      ],
      "size": "large",
      "xws": "firespray31",
      "id": 7,
      "firing_arcs": [
         "Auxiliary Rear",
         "Front"
      ],
      "dial": [
         "1BG",
         "1FG",
         "1NG",
         "2TW",
         "2BW",
         "2FG",
         "2NW",
         "2YW",
         "3TW",
         "3BW",
         "3FW",
         "3NW",
         "3YW",
         "3KR",
         "4FW",
         "4KR"
      ],
      "images": [
         "ship/galactic-empire/firespray-31.png",
         "ship/scum-and-villainy/firespray-31.png"
      ],
      "silhouette": "silhouette/firespray-31.png",
      "key": "firespray31"
   },
   "g1aStarfighter": {
      "name": "G-1A Starfighter",
      "faction": [
         "Scum and Villainy"
      ],
      "actions": [
         "Evade",
         "Focus",
         "Target Lock"
      ],
      "attack": 3,
      "agility": 1,
      "hull": 4,
      "shields": 4,
      "size": "small",
      "xws": "g1astarfighter",
      "id": 35,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "1TR",
         "1BG",
         "1FG",
         "1NG",
         "1YR",
         "2TW",
         "2BW",
         "2FG",
         "2NW",
         "2YW",
         "3BR",
         "3FG",
         "3NR",
         "3KR",
         "4FW",
         "4KR"
      ],
      "images": [
         "ship/scum-and-villainy/g-1a-starfighter.png"
      ],
      "silhouette": "silhouette/g-1a-starfighter.png",
      "key": "g1aStarfighter"
   },
   "gozantiClassCruiser": {
      "name": "Gozanti-class Cruiser",
      "faction": [
         "Galactic Empire"
      ],
      "actions": [
         "Coordinate",
         "Recover",
         "Reinforce",
         "Target Lock"
      ],
      "agility": 0,
      "hull": 9,
      "shields": 5,
      "energy": 4,
      "size": "huge",
      "epic_points": 2,
      "maneuvers_energy": [
         [
            0,
            0,
            0,
            0,
            0
         ],
         [
            0,
            2,
            3,
            2,
            0
         ],
         [
            0,
            1,
            2,
            1,
            0
         ],
         [
            0,
            0,
            1,
            0,
            0
         ],
         [
            0,
            0,
            1,
            0,
            0
         ]
      ],
      "xws": "gozanticlasscruiser",
      "id": 37,
      "images": [
         "ship/galactic-empire/gozanti-class-cruiser.png"
      ],
      "silhouette": "silhouette/gozanti-class-cruiser.png",
      "key": "gozantiClassCruiser"
   },
   "gr75MediumTransport": {
      "name": "GR-75 Medium Transport",
      "faction": [
         "Rebel Alliance"
      ],
      "energy": 4,
      "agility": 0,
      "hull": 8,
      "shields": 4,
      "actions": [
         "Recover",
         "Reinforce",
         "Coordinate",
         "Jam"
      ],
      "epic_points": 2,
      "maneuvers_energy": [
         [
            0,
            0,
            0,
            0,
            0,
            0
         ],
         [
            0,
            2,
            3,
            2,
            0,
            0
         ],
         [
            0,
            1,
            2,
            1,
            0,
            0
         ],
         [
            0,
            0,
            1,
            0,
            0,
            0
         ],
         [
            0,
            0,
            0,
            0,
            0,
            0
         ]
      ],
      "size": "huge",
      "xws": "gr75mediumtransport",
      "id": 12,
      "images": [
         "ship/rebel-alliance/gr-75-medium-transport.png"
      ],
      "silhouette": "silhouette/gr-75-medium-transport.png",
      "key": "gr75MediumTransport"
   },
   "hwk290": {
      "name": "HWK-290",
      "faction": [
         "Rebel Alliance",
         "Scum and Villainy"
      ],
      "attack": 1,
      "agility": 2,
      "hull": 4,
      "shields": 1,
      "actions": [
         "Focus",
         "Target Lock"
      ],
      "size": "small",
      "xws": "hwk290",
      "id": 8,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "1BG",
         "1FG",
         "1NG",
         "2TW",
         "2BW",
         "2FG",
         "2NW",
         "2YW",
         "3BR",
         "3FW",
         "3NR",
         "4FR"
      ],
      "images": [
         "ship/rebel-alliance/hwk-290.png",
         "ship/scum-and-villainy/hwk-290.png"
      ],
      "silhouette": "silhouette/hwk-290.png",
      "key": "hwk290"
   },
   "jumpmaster5000": {
      "name": "JumpMaster 5000",
      "faction": [
         "Scum and Villainy"
      ],
      "actions": [
         "Barrel Roll",
         "Focus",
         "Target Lock"
      ],
      "attack": 2,
      "agility": 2,
      "hull": 5,
      "shields": 4,
      "size": "large",
      "xws": "jumpmaster5000",
      "id": 34,
      "firing_arcs": [
         "Front",
         "Turret"
      ],
      "dial": [
         "1TG",
         "1BG",
         "1FG",
         "1NW",
         "1YW",
         "2TG",
         "2BG",
         "2FG",
         "2NW",
         "2YW",
         "2LW",
         "2PR",
         "3BW",
         "3FW",
         "3NW",
         "4FW",
         "4KR"
      ],
      "images": [
         "ship/scum-and-villainy/jumpmaster-5000.png"
      ],
      "silhouette": "silhouette/jumpmaster-5000.png",
      "key": "jumpmaster5000"
   },
   "kWing": {
      "name": "K-wing",
      "faction": [
         "Rebel Alliance"
      ],
      "attack": 2,
      "agility": 1,
      "hull": 5,
      "shields": 4,
      "actions": [
         "Focus",
         "Target Lock",
         "SLAM"
      ],
      "size": "small",
      "xws": "kwing",
      "id": 28,
      "firing_arcs": [
         "Front",
         "Turret"
      ],
      "dial": [
         "1BG",
         "1FG",
         "1NG",
         "2TW",
         "2BW",
         "2FG",
         "2NW",
         "2YW",
         "3BW",
         "3FW",
         "3NW"
      ],
      "images": [
         "ship/rebel-alliance/k-wing.png"
      ],
      "silhouette": "silhouette/k-wing.png",
      "key": "kWing"
   },
   "kihraxzFighter": {
      "name": "Kihraxz Fighter",
      "faction": [
         "Scum and Villainy"
      ],
      "attack": 3,
      "agility": 2,
      "hull": 4,
      "shields": 1,
      "actions": [
         "Focus",
         "Target Lock"
      ],
      "size": "small",
      "xws": "kihraxzfighter",
      "id": 27,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "1TW",
         "1BG",
         "1NG",
         "1YW",
         "2TW",
         "2BG",
         "2FG",
         "2NG",
         "2YW",
         "3BW",
         "3FW",
         "3NW",
         "4FW",
         "4KR",
         "5KR"
      ],
      "images": [
         "ship/scum-and-villainy/kihraxz-fighter.png"
      ],
      "silhouette": "silhouette/kihraxz-fighter.png",
      "key": "kihraxzFighter"
   },
   "lambdaClassShuttle": {
      "name": "Lambda-class Shuttle",
      "faction": [
         "Galactic Empire"
      ],
      "attack": 3,
      "agility": 1,
      "hull": 5,
      "shields": 5,
      "actions": [
         "Focus",
         "Target Lock"
      ],
      "size": "large",
      "xws": "lambdaclassshuttle",
      "id": 9,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "0OR",
         "1BG",
         "1FG",
         "1NG",
         "2TR",
         "2BW",
         "2FG",
         "2NW",
         "2YR",
         "3BR",
         "3FW",
         "3NR"
      ],
      "images": [
         "ship/galactic-empire/lambda-class-shuttle.png"
      ],
      "silhouette": "silhouette/lambda-class-shuttle.png",
      "key": "lambdaClassShuttle"
   },
   "lancerClassPursuitCraft": {
      "name": "Lancer-class Pursuit Craft",
      "xws": "lancerclasspursuitcraft",
      "faction": [
         "Scum and Villainy"
      ],
      "actions": [
         "Focus",
         "Evade",
         "Rotate Arc",
         "Target Lock"
      ],
      "size": "large",
      "attack": 3,
      "agility": 2,
      "hull": 7,
      "shields": 3,
      "id": 41,
      "firing_arcs": [
         "Front",
         "Mobile"
      ],
      "dial": [
         "1BW",
         "1FW",
         "1NW",
         "2TW",
         "2BW",
         "2FG",
         "2NW",
         "2YW",
         "3TG",
         "3BG",
         "3FG",
         "3NG",
         "3YG",
         "4FG",
         "5FW",
         "5KR"
      ],
      "images": [
         "ship/scum-and-villainy/lancer-class-pursuit-craft.png"
      ],
      "silhouette": "silhouette/lancer-class-pursuit-craft.png",
      "key": "lancerClassPursuitCraft"
   },
   "m12LKimogilaFighter": {
      "name": "M12-L Kimogila Fighter",
      "xws": "m12lkimogilafighter",
      "faction": [
         "Scum and Villainy"
      ],
      "actions": [
         "Barrel Roll",
         "Focus",
         "Reload",
         "Target Lock"
      ],
      "size": "small",
      "attack": 3,
      "agility": 1,
      "hull": 6,
      "shields": 2,
      "id": 51,
      "firing_arcs": [
         "Bullseye",
         "Front"
      ],
      "dial": [
         "1TR",
         "1BW",
         "1FG",
         "1NW",
         "1YR",
         "2TR",
         "2BG",
         "2FG",
         "2NG",
         "2YR",
         "3TW",
         "3BW",
         "3FG",
         "3NW",
         "3YW",
         "4KR"
      ],
      "images": [
         "ship/scum-and-villainy/m12-l-kimogila-fighter.png"
      ],
      "silhouette": "silhouette/m12-l-kimogila-fighter.png",
      "key": "m12LKimogilaFighter"
   },
   "m3AInterceptor": {
      "name": "M3-A Interceptor",
      "faction": [
         "Scum and Villainy"
      ],
      "attack": 2,
      "agility": 3,
      "hull": 2,
      "shields": 1,
      "actions": [
         "Focus",
         "Target Lock",
         "Barrel Roll",
         "Evade"
      ],
      "size": "small",
      "xws": "m3ainterceptor",
      "id": 22,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "1TW",
         "1BG",
         "1NG",
         "1YW",
         "2TW",
         "2BG",
         "2FG",
         "2NG",
         "2YW",
         "3BW",
         "3FG",
         "3NW",
         "3KR",
         "4FW",
         "5KR"
      ],
      "images": [
         "ship/scum-and-villainy/m3-a-interceptor.png"
      ],
      "silhouette": "silhouette/m3-a-interceptor.png",
      "key": "m3AInterceptor"
   },
   "protectorateStarfighter": {
      "name": "Protectorate Starfighter",
      "xws": "protectoratestarfighter",
      "faction": [
         "Scum and Villainy"
      ],
      "actions": [
         "Barrel Roll",
         "Boost",
         "Focus",
         "Target Lock"
      ],
      "size": "small",
      "attack": 3,
      "agility": 3,
      "hull": 4,
      "shields": 0,
      "id": 40,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "1TW",
         "1YW",
         "2ER",
         "2TG",
         "2BG",
         "2FG",
         "2NG",
         "2YG",
         "2RR",
         "3TW",
         "3BW",
         "3FG",
         "3NW",
         "3YW",
         "4FW",
         "4KR",
         "5FW"
      ],
      "images": [
         "ship/scum-and-villainy/protectorate-starfighter.png"
      ],
      "silhouette": "silhouette/protectorate-starfighter.png",
      "key": "protectorateStarfighter"
   },
   "quadjumper": {
      "name": "Quadjumper",
      "xws": "quadjumper",
      "faction": [
         "Scum and Villainy"
      ],
      "actions": [
         "Barrel Roll",
         "Focus"
      ],
      "size": "small",
      "attack": 2,
      "agility": 2,
      "hull": 5,
      "shields": 0,
      "id": 43,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "1AR",
         "1SR",
         "1DR",
         "1TW",
         "1FW",
         "1YW",
         "2TW",
         "2BG",
         "2FG",
         "2NG",
         "2YW",
         "2LR",
         "2PR",
         "3BW",
         "3FG",
         "3NW"
      ],
      "images": [
         "ship/scum-and-villainy/quadjumper.png"
      ],
      "silhouette": "silhouette/quadjumper.png",
      "key": "quadjumper"
   },
   "raiderClassCorvetteAft": {
      "name": "Raider-class Corvette (Aft)",
      "faction": [
         "Galactic Empire"
      ],
      "energy": 6,
      "agility": 0,
      "hull": 8,
      "shields": 4,
      "actions": [
         "Target Lock",
         "Coordinate"
      ],
      "epic_points": 1.5,
      "maneuvers_energy": [
         [
            0,
            0,
            0,
            0,
            0,
            0
         ],
         [
            0,
            3,
            3,
            3,
            0,
            0
         ],
         [
            0,
            2,
            3,
            2,
            0,
            0
         ],
         [
            0,
            0,
            2,
            0,
            0,
            0
         ],
         [
            0,
            0,
            2,
            0,
            0,
            0
         ]
      ],
      "size": "huge",
      "xws": "raiderclasscorvetteaft",
      "id": 25,
      "images": [
         "ship/galactic-empire/raider-class-corvette-aft.png"
      ],
      "silhouette": "silhouette/raider-class-corvette-aft.png",
      "key": "raiderClassCorvetteAft"
   },
   "raiderClassCorvetteFore": {
      "name": "Raider-class Corvette (Fore)",
      "faction": [
         "Galactic Empire"
      ],
      "attack": 4,
      "agility": 0,
      "hull": 8,
      "shields": 6,
      "actions": [
         "Recover",
         "Reinforce"
      ],
      "epic_points": 1.5,
      "maneuvers_energy": [
         [
            0,
            0,
            0,
            0,
            0,
            0
         ],
         [
            0,
            3,
            3,
            3,
            0,
            0
         ],
         [
            0,
            2,
            3,
            2,
            0,
            0
         ],
         [
            0,
            0,
            2,
            0,
            0,
            0
         ],
         [
            0,
            0,
            2,
            0,
            0,
            0
         ]
      ],
      "size": "huge",
      "xws": "raiderclasscorvettefore",
      "id": 24,
      "images": [
         "ship/galactic-empire/raider-class-corvette-fore.png"
      ],
      "silhouette": "silhouette/raider-class-corvette-fore.png",
      "key": "raiderClassCorvetteFore"
   },
   "scurrgH6Bomber": {
      "name": "Scurrg H-6 Bomber",
      "xws": "scurrgh6bomber",
      "faction": [
         "Rebel Alliance",
         "Scum and Villainy"
      ],
      "actions": [
         "Barrel Roll",
         "Focus",
         "Target Lock"
      ],
      "size": "small",
      "attack": 3,
      "agility": 1,
      "hull": 5,
      "shields": 5,
      "id": 49,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "1BW",
         "1FG",
         "1NW",
         "2TW",
         "2BG",
         "2FG",
         "2NG",
         "2YW",
         "3ER",
         "3TR",
         "3BW",
         "3FG",
         "3NW",
         "3YR",
         "3RR",
         "4FW",
         "5FR"
      ],
      "images": [
         "ship/rebel-alliance/scurrg-h-6-bomber.png",
         "ship/scum-and-villainy/scurrg-h-6-bomber.png"
      ],
      "silhouette": "silhouette/scurrg-h-6-bomber.png",
      "key": "scurrgH6Bomber"
   },
   "sheathipedeClassShuttle": {
      "name": "Sheathipede-class Shuttle",
      "xws": "sheathipedeclassshuttle",
      "faction": [
         "Rebel Alliance"
      ],
      "actions": [
         "Coordinate",
         "Focus",
         "Target Lock"
      ],
      "size": "small",
      "attack": 2,
      "agility": 2,
      "hull": 4,
      "shields": 1,
      "id": 52,
      "firing_arcs": [
         "Auxiliary Rear",
         "Front"
      ],
      "dial": [
         "1BW",
         "1FG",
         "1NW",
         "2TW",
         "2BG",
         "2FG",
         "2NG",
         "2YW",
         "3TR",
         "3BW",
         "3FG",
         "3NW",
         "3YR",
         "3KR",
         "4FR"
      ],
      "images": [
         "ship/rebel-alliance/sheathipede-class-shuttle.png"
      ],
      "silhouette": "silhouette/sheathipede-class-shuttle.png",
      "key": "sheathipedeClassShuttle"
   },
   "starviper": {
      "name": "StarViper",
      "faction": [
         "Scum and Villainy"
      ],
      "attack": 3,
      "agility": 3,
      "hull": 4,
      "shields": 1,
      "actions": [
         "Focus",
         "Target Lock",
         "Barrel Roll",
         "Boost"
      ],
      "size": "small",
      "xws": "starviper",
      "id": 21,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "1TW",
         "1BG",
         "1FG",
         "1NG",
         "1YW",
         "2TW",
         "2BW",
         "2FG",
         "2NW",
         "2YW",
         "3BW",
         "3FG",
         "3NW",
         "3LR",
         "3PR",
         "4FW"
      ],
      "images": [
         "ship/scum-and-villainy/starviper.png"
      ],
      "silhouette": "silhouette/starviper.png",
      "key": "starviper"
   },
   "t70XWing": {
      "name": "T-70 X-wing",
      "faction": [
         "Resistance"
      ],
      "attack": 3,
      "agility": 2,
      "hull": 3,
      "shields": 3,
      "actions": [
         "Focus",
         "Target Lock",
         "Boost"
      ],
      "size": "small",
      "xws": "t70xwing",
      "id": 30,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "1BG",
         "1FG",
         "1NG",
         "2TW",
         "2BW",
         "2FG",
         "2NW",
         "2YW",
         "3ER",
         "3TW",
         "3BW",
         "3FG",
         "3NW",
         "3YW",
         "3RR",
         "4FW",
         "4KR"
      ],
      "images": [
         "ship/resistance/t-70-x-wing.png"
      ],
      "silhouette": "silhouette/t-70-x-wing.png",
      "key": "t70XWing"
   },
   "tieAdvPrototype": {
      "name": "TIE Adv. Prototype",
      "faction": [
         "Galactic Empire"
      ],
      "actions": [
         "Barrel Roll",
         "Boost",
         "Focus",
         "Target Lock"
      ],
      "attack": 2,
      "agility": 3,
      "hull": 2,
      "shields": 2,
      "size": "small",
      "xws": "tieadvprototype",
      "id": 36,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "1TG",
         "1BG",
         "1NG",
         "1YG",
         "2TW",
         "2BW",
         "2FG",
         "2NW",
         "2YW",
         "3TW",
         "3BW",
         "3FG",
         "3NW",
         "3YW",
         "4FG",
         "4KR",
         "5FW"
      ],
      "images": [
         "ship/galactic-empire/tie-adv-prototype.png"
      ],
      "silhouette": "silhouette/tie-adv-prototype.png",
      "key": "tieAdvPrototype"
   },
   "tieAdvanced": {
      "name": "TIE Advanced",
      "faction": [
         "Galactic Empire"
      ],
      "attack": 2,
      "agility": 3,
      "hull": 3,
      "shields": 2,
      "actions": [
         "Focus",
         "Target Lock",
         "Barrel Roll",
         "Evade"
      ],
      "size": "small",
      "xws": "tieadvanced",
      "id": 5,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "1BG",
         "1NG",
         "2TW",
         "2BW",
         "2FG",
         "2NW",
         "2YW",
         "3TW",
         "3BW",
         "3FG",
         "3NW",
         "3YW",
         "4FW",
         "4KR",
         "5FW"
      ],
      "images": [
         "ship/galactic-empire/tie-advanced.png"
      ],
      "silhouette": "silhouette/tie-advanced.png",
      "key": "tieAdvanced"
   },
   "tieAggressor": {
      "name": "TIE Aggressor",
      "xws": "tieaggressor",
      "faction": [
         "Galactic Empire"
      ],
      "actions": [
         "Barrel Roll",
         "Focus",
         "Target Lock"
      ],
      "size": "small",
      "attack": 2,
      "agility": 2,
      "hull": 4,
      "shields": 1,
      "id": 48,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "1BW",
         "1FG",
         "1NW",
         "2TW",
         "2BG",
         "2FG",
         "2NG",
         "2YW",
         "3TW",
         "3BW",
         "3FG",
         "3NW",
         "3YW",
         "4FW",
         "4KR"
      ],
      "images": [
         "ship/galactic-empire/tie-aggressor.png"
      ],
      "silhouette": "silhouette/tie-aggressor.png",
      "key": "tieAggressor"
   },
   "tieBomber": {
      "name": "TIE Bomber",
      "faction": [
         "Galactic Empire"
      ],
      "attack": 2,
      "agility": 2,
      "hull": 6,
      "shields": 0,
      "actions": [
         "Focus",
         "Target Lock",
         "Barrel Roll"
      ],
      "size": "small",
      "xws": "tiebomber",
      "id": 11,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "1BW",
         "1FG",
         "1NW",
         "2TR",
         "2BG",
         "2FG",
         "2NG",
         "2YR",
         "3TW",
         "3BW",
         "3FG",
         "3NW",
         "3YW",
         "4FW",
         "5KR"
      ],
      "images": [
         "ship/galactic-empire/tie-bomber.png"
      ],
      "silhouette": "silhouette/tie-bomber.png",
      "key": "tieBomber"
   },
   "tieDefender": {
      "name": "TIE Defender",
      "faction": [
         "Galactic Empire"
      ],
      "attack": 3,
      "agility": 3,
      "hull": 3,
      "shields": 3,
      "actions": [
         "Focus",
         "Target Lock",
         "Barrel Roll"
      ],
      "size": "small",
      "xws": "tiedefender",
      "id": 14,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "1TR",
         "1BW",
         "1NW",
         "1YR",
         "2TR",
         "2BW",
         "2FG",
         "2NW",
         "2YR",
         "3TW",
         "3BW",
         "3FG",
         "3NW",
         "3YW",
         "4FG",
         "4KW",
         "5FG"
      ],
      "images": [
         "ship/galactic-empire/tie-defender.png"
      ],
      "silhouette": "silhouette/tie-defender.png",
      "key": "tieDefender"
   },
   "tieFighter": {
      "name": "TIE Fighter",
      "faction": [
         "Galactic Empire",
         "Rebel Alliance"
      ],
      "attack": 2,
      "agility": 3,
      "hull": 3,
      "shields": 0,
      "actions": [
         "Focus",
         "Barrel Roll",
         "Evade"
      ],
      "size": "small",
      "xws": "tiefighter",
      "id": 4,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "1TW",
         "1YW",
         "2TW",
         "2BG",
         "2FG",
         "2NG",
         "2YW",
         "3TW",
         "3BW",
         "3FG",
         "3NW",
         "3YW",
         "3KR",
         "4FW",
         "4KR",
         "5FW"
      ],
      "images": [
         "ship/galactic-empire/tie-fighter.png",
         "ship/rebel-alliance/tie-fighter.png"
      ],
      "silhouette": "silhouette/tie-fighter.png",
      "key": "tieFighter"
   },
   "tieFoFighter": {
      "name": "TIE/fo Fighter",
      "faction": [
         "First Order"
      ],
      "attack": 2,
      "agility": 3,
      "hull": 3,
      "shields": 1,
      "actions": [
         "Focus",
         "Target Lock",
         "Barrel Roll",
         "Evade"
      ],
      "size": "small",
      "xws": "tiefofighter",
      "id": 31,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "1TW",
         "1YW",
         "2LR",
         "2TG",
         "2BG",
         "2FG",
         "2NG",
         "2YG",
         "2PR",
         "3TW",
         "3BW",
         "3FG",
         "3NW",
         "3YW",
         "4FW",
         "4KR",
         "5FW"
      ],
      "images": [
         "ship/first-order/tie-fo-fighter.png"
      ],
      "silhouette": "silhouette/tie-fo-fighter.png",
      "key": "tieFoFighter"
   },
   "tieInterceptor": {
      "name": "TIE Interceptor",
      "faction": [
         "Galactic Empire"
      ],
      "attack": 3,
      "agility": 3,
      "hull": 3,
      "shields": 0,
      "actions": [
         "Focus",
         "Barrel Roll",
         "Boost",
         "Evade"
      ],
      "size": "small",
      "xws": "tieinterceptor",
      "id": 6,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "1TW",
         "1YW",
         "2TG",
         "2BG",
         "2FG",
         "2NG",
         "2YG",
         "3TW",
         "3BW",
         "3FG",
         "3NW",
         "3YW",
         "3KR",
         "4FG",
         "5FW",
         "5KR"
      ],
      "images": [
         "ship/galactic-empire/tie-interceptor.png"
      ],
      "silhouette": "silhouette/tie-interceptor.png",
      "key": "tieInterceptor"
   },
   "tiePhantom": {
      "name": "TIE Phantom",
      "faction": [
         "Galactic Empire"
      ],
      "attack": 4,
      "agility": 2,
      "hull": 2,
      "shields": 2,
      "actions": [
         "Focus",
         "Barrel Roll",
         "Evade",
         "Cloak"
      ],
      "size": "small",
      "xws": "tiephantom",
      "id": 16,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "1TW",
         "1YW",
         "2TW",
         "2BG",
         "2FG",
         "2NG",
         "2YW",
         "3TW",
         "3BW",
         "3FG",
         "3NW",
         "3YW",
         "3KR",
         "4FW",
         "4KR"
      ],
      "images": [
         "ship/galactic-empire/tie-phantom.png"
      ],
      "silhouette": "silhouette/tie-phantom.png",
      "key": "tiePhantom"
   },
   "tiePunisher": {
      "name": "TIE Punisher",
      "faction": [
         "Galactic Empire"
      ],
      "attack": 2,
      "agility": 1,
      "hull": 6,
      "shields": 3,
      "actions": [
         "Focus",
         "Target Lock",
         "Boost"
      ],
      "size": "small",
      "xws": "tiepunisher",
      "id": 29,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "1BG",
         "1FG",
         "1NG",
         "2TR",
         "2BW",
         "2FG",
         "2NW",
         "2YR",
         "3TW",
         "3BW",
         "3FW",
         "3NW",
         "3YW",
         "4KR"
      ],
      "images": [
         "ship/galactic-empire/tie-punisher.png"
      ],
      "silhouette": "silhouette/tie-punisher.png",
      "key": "tiePunisher"
   },
   "tieReaper": {
      "name": "TIE Reaper",
      "xws": "tiereaper",
      "faction": [
         "Galactic Empire"
      ],
      "actions": [
         "Evade",
         "Focus",
         "Jam"
      ],
      "size": "small",
      "attack": 3,
      "agility": 1,
      "hull": 6,
      "shields": 2,
      "firing_arcs": [
         "Front"
      ],
      "id": 55,
      "dial": [
         "0OR",
         "1LR",
         "1TW",
         "1BW",
         "1FG",
         "1NW",
         "1YW",
         "1PR",
         "2TR",
         "2BG",
         "2FG",
         "2NG",
         "2YR",
         "3BR",
         "3FG",
         "3NR"
      ],
      "images": [
         "ship/galactic-empire/tie-reaper.png"
      ],
      "silhouette": "silhouette/tie-reaper.png",
      "key": "tieReaper"
   },
   "tieSfFighter": {
      "name": "TIE/sf Fighter",
      "xws": "tiesffighter",
      "faction": [
         "First Order"
      ],
      "actions": [
         "Barrel Roll",
         "Focus",
         "Target Lock"
      ],
      "size": "small",
      "attack": 2,
      "agility": 2,
      "hull": 3,
      "shields": 3,
      "id": 39,
      "firing_arcs": [
         "Auxiliary Rear",
         "Front"
      ],
      "dial": [
         "1TR",
         "1BG",
         "1FG",
         "1NG",
         "1YR",
         "2TW",
         "2BW",
         "2FG",
         "2NW",
         "2YW",
         "3LR",
         "3TR",
         "3BW",
         "3FG",
         "3NW",
         "3YR",
         "3PR",
         "4FW"
      ],
      "images": [
         "ship/first-order/tie-sf-fighter.png"
      ],
      "silhouette": "silhouette/tie-sf-fighter.png",
      "key": "tieSfFighter"
   },
   "tieSilencer": {
      "name": "TIE Silencer",
      "xws": "tiesilencer",
      "faction": [
         "First Order"
      ],
      "actions": [
         "Barrel Roll",
         "Boost",
         "Focus",
         "Target Lock"
      ],
      "size": "small",
      "attack": 3,
      "agility": 3,
      "hull": 4,
      "shields": 2,
      "firing_arcs": [
         "Front"
      ],
      "id": 53,
      "dial": [
         "1TW",
         "1YW",
         "2TG",
         "2BG",
         "2FG",
         "2NG",
         "2YG",
         "3ER",
         "3TW",
         "3BG",
         "3FG",
         "3NG",
         "3YW",
         "3RR",
         "4FG",
         "4KR",
         "5FG"
      ],
      "images": [
         "ship/first-order/tie-silencer.png"
      ],
      "silhouette": "silhouette/tie-silencer.png",
      "key": "tieSilencer"
   },
   "tieStriker": {
      "name": "TIE Striker",
      "xws": "tiestriker",
      "faction": [
         "Galactic Empire"
      ],
      "actions": [
         "Barrel Roll",
         "Evade",
         "Focus"
      ],
      "size": "small",
      "attack": 3,
      "agility": 2,
      "hull": 4,
      "shields": 0,
      "id": 44,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "1TW",
         "1BG",
         "1FG",
         "1NG",
         "1YW",
         "2TW",
         "2BW",
         "2FG",
         "2NW",
         "2YW",
         "2LR",
         "2KR",
         "2PR",
         "3BW",
         "3FG",
         "3NW"
      ],
      "images": [
         "ship/galactic-empire/tie-striker.png"
      ],
      "silhouette": "silhouette/tie-striker.png",
      "key": "tieStriker"
   },
   "uWing": {
      "name": "U-wing",
      "xws": "uwing",
      "faction": [
         "Rebel Alliance"
      ],
      "actions": [
         "Target Lock",
         "Focus"
      ],
      "size": "large",
      "attack": 3,
      "agility": 1,
      "hull": 4,
      "shields": 4,
      "id": 45,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "0OR",
         "1BG",
         "1FG",
         "1NG",
         "2TW",
         "2BG",
         "2FG",
         "2NG",
         "2YW",
         "3BW",
         "3FW",
         "3NW",
         "4FW"
      ],
      "images": [
         "ship/rebel-alliance/u-wing.png"
      ],
      "silhouette": "silhouette/u-wing.png",
      "key": "uWing"
   },
   "upsilonClassShuttle": {
      "name": "Upsilon-class Shuttle",
      "xws": "upsilonclassshuttle",
      "faction": [
         "First Order"
      ],
      "actions": [
         "Coordinate",
         "Focus",
         "Target Lock"
      ],
      "size": "large",
      "attack": 4,
      "agility": 1,
      "hull": 6,
      "shields": 6,
      "id": 42,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "0OR",
         "1TR",
         "1BW",
         "1FG",
         "1NW",
         "1YR",
         "2TW",
         "2BG",
         "2FG",
         "2NG",
         "2YW",
         "3TR",
         "3BW",
         "3FW",
         "3NW",
         "3YR"
      ],
      "images": [
         "ship/first-order/upsilon-class-shuttle.png"
      ],
      "silhouette": "silhouette/upsilon-class-shuttle.png",
      "key": "upsilonClassShuttle"
   },
   "vcx100": {
      "name": "VCX-100",
      "faction": [
         "Rebel Alliance"
      ],
      "actions": [
         "Focus",
         "Evade",
         "Target Lock"
      ],
      "attack": 4,
      "agility": 0,
      "hull": 10,
      "shields": 6,
      "size": "large",
      "xws": "vcx100",
      "id": 32,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "1TR",
         "1BW",
         "1FG",
         "1NW",
         "1YR",
         "2TW",
         "2BG",
         "2FG",
         "2NG",
         "2YW",
         "3TR",
         "3BW",
         "3FW",
         "3NW",
         "3YR",
         "4FW",
         "5KR"
      ],
      "images": [
         "ship/rebel-alliance/vcx-100.png"
      ],
      "silhouette": "silhouette/vcx-100.png",
      "key": "vcx100"
   },
   "vt49Decimator": {
      "name": "VT-49 Decimator",
      "faction": [
         "Galactic Empire"
      ],
      "attack": 3,
      "agility": 0,
      "hull": 12,
      "shields": 4,
      "actions": [
         "Focus",
         "Target Lock"
      ],
      "size": "large",
      "xws": "vt49decimator",
      "id": 20,
      "firing_arcs": [
         "Front",
         "Turret"
      ],
      "dial": [
         "1BW",
         "1FW",
         "1NW",
         "2TW",
         "2BG",
         "2FG",
         "2NG",
         "2YW",
         "3TW",
         "3BW",
         "3FG",
         "3NW",
         "3YW",
         "4FW"
      ],
      "images": [
         "ship/galactic-empire/vt-49-decimator.png"
      ],
      "silhouette": "silhouette/vt-49-decimator.png",
      "key": "vt49Decimator"
   },
   "xWing": {
      "name": "X-wing",
      "faction": [
         "Rebel Alliance"
      ],
      "attack": 3,
      "agility": 2,
      "hull": 3,
      "shields": 2,
      "actions": [
         "Focus",
         "Target Lock"
      ],
      "size": "small",
      "xws": "xwing",
      "id": 0,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "1BG",
         "1FG",
         "1NG",
         "2TW",
         "2BW",
         "2FG",
         "2NW",
         "2YW",
         "3TW",
         "3BW",
         "3FW",
         "3NW",
         "3YW",
         "4FW",
         "4KR"
      ],
      "images": [
         "ship/rebel-alliance/x-wing.png"
      ],
      "silhouette": "silhouette/x-wing.png",
      "key": "xWing"
   },
   "yWing": {
      "name": "Y-wing",
      "faction": [
         "Rebel Alliance",
         "Scum and Villainy"
      ],
      "attack": 2,
      "agility": 1,
      "hull": 5,
      "shields": 3,
      "actions": [
         "Focus",
         "Target Lock"
      ],
      "size": "small",
      "xws": "ywing",
      "id": 1,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "1BW",
         "1FG",
         "1NW",
         "2TW",
         "2BW",
         "2FG",
         "2NW",
         "2YW",
         "3TR",
         "3BW",
         "3FW",
         "3NW",
         "3YR",
         "4FR",
         "4KR"
      ],
      "images": [
         "ship/rebel-alliance/y-wing.png",
         "ship/scum-and-villainy/y-wing.png"
      ],
      "silhouette": "silhouette/y-wing.png",
      "key": "yWing"
   },
   "yt1300": {
      "name": "YT-1300",
      "faction": [
         "Rebel Alliance",
         "Resistance"
      ],
      "attack": 3,
      "agility": 1,
      "hull": 8,
      "shields": 5,
      "actions": [
         "Focus",
         "Target Lock"
      ],
      "size": "large",
      "xws": "yt1300",
      "id": 3,
      "firing_arcs": [
         "Front",
         "Turret"
      ],
      "dial": [
         "1TW",
         "1BG",
         "1FG",
         "1NG",
         "1YW",
         "2TW",
         "2BW",
         "2FG",
         "2NW",
         "2YW",
         "3BW",
         "3FW",
         "3NW",
         "3KR",
         "4FW",
         "4KR"
      ],
      "images": [
         "ship/rebel-alliance/yt-1300.png",
         "ship/resistance/yt-1300.png"
      ],
      "silhouette": "silhouette/yt-1300.png",
      "key": "yt1300"
   },
   "yt2400": {
      "name": "YT-2400",
      "faction": [
         "Rebel Alliance"
      ],
      "attack": 2,
      "agility": 2,
      "hull": 5,
      "shields": 5,
      "actions": [
         "Focus",
         "Target Lock",
         "Barrel Roll"
      ],
      "size": "large",
      "xws": "yt2400",
      "id": 19,
      "firing_arcs": [
         "Front",
         "Turret"
      ],
      "dial": [
         "1TW",
         "1BG",
         "1FG",
         "1NG",
         "1YW",
         "2TW",
         "2BW",
         "2FG",
         "2NW",
         "2YW",
         "3TW",
         "3BW",
         "3FW",
         "3NW",
         "3YW",
         "4FW",
         "4KR"
      ],
      "images": [
         "ship/rebel-alliance/yt-2400.png"
      ],
      "silhouette": "silhouette/yt-2400.png",
      "key": "yt2400"
   },
   "yv666": {
      "name": "YV-666",
      "faction": [
         "Scum and Villainy"
      ],
      "attack": 3,
      "agility": 1,
      "hull": 6,
      "shields": 6,
      "actions": [
         "Focus",
         "Target Lock"
      ],
      "size": "large",
      "xws": "yv666",
      "id": 26,
      "firing_arcs": [
         "Auxiliary 180",
         "Front"
      ],
      "dial": [
         "0OR",
         "1BG",
         "1FG",
         "1NG",
         "2TR",
         "2BW",
         "2FG",
         "2NW",
         "2YR",
         "3TW",
         "3BW",
         "3FG",
         "3NW",
         "3YW",
         "4FW"
      ],
      "images": [
         "ship/scum-and-villainy/yv-666.png"
      ],
      "silhouette": "silhouette/yv-666.png",
      "key": "yv666"
   },
   "z95Headhunter": {
      "name": "Z-95 Headhunter",
      "faction": [
         "Rebel Alliance",
         "Scum and Villainy"
      ],
      "attack": 2,
      "agility": 2,
      "hull": 2,
      "shields": 2,
      "actions": [
         "Focus",
         "Target Lock"
      ],
      "size": "small",
      "xws": "z95headhunter",
      "id": 13,
      "firing_arcs": [
         "Front"
      ],
      "dial": [
         "1BW",
         "1FG",
         "1NW",
         "2TW",
         "2BG",
         "2FG",
         "2NG",
         "2YW",
         "3TW",
         "3BW",
         "3FW",
         "3NW",
         "3YW",
         "3KR",
         "4FW"
      ],
      "images": [
         "ship/rebel-alliance/z-95-headhunter.png",
         "ship/scum-and-villainy/z-95-headhunter.png"
      ],
      "silhouette": "silhouette/z-95-headhunter.png",
      "key": "z95Headhunter"
   }
};

Object.freeze(Ship);

export default Ship;