function e(e,a,r,n){Object.defineProperty(e,a,{get:r,set:n,enumerable:!0,configurable:!0})}var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},o=a.parcelRequire7423;null==o&&((o=function(e){if(e in r)return r[e].exports;if(e in n){var a=n[e];delete n[e];var o={id:e,exports:{}};return r[e]=o,a.call(o.exports,o,o.exports),o.exports}var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}).register=function(e,a){n[e]=a},a.parcelRequire7423=o),o.register("3ESMo",(function(a,r){e(a.exports,"bannerData",(()=>n)),e(a.exports,"dropTables",(()=>o)),e(a.exports,"itemData",(()=>t)),e(a.exports,"unitData",(()=>i)),e(a.exports,"weaponData",(()=>s));const n={baseMember:{name:"Base Member Recruit",fiveStarPityType:"aConstruct",sixStarPityType:"sConstruct",rateUpCategory:"aConstruct",rateUpChance:80,fiveStarPity:10,sixStarPity:60},themedConstruct:{name:"Themed Construct",fiveStarPityType:"aConstruct",sixStarPityType:"sConstruct",rateUpCategory:"sConstruct",rateUpChance:80,fiveStarPity:10,sixStarPity:60},baseWeapon:{name:"Base Weapon Research",fiveStarPityType:"fiveStarWeapon",sixStarPityType:"sixStarWeapon",rateUpChance:0,fiveStarPity:10,sixStarPity:30},targetWeapon:{name:"Target Weapon Research",fiveStarPityType:"fiveStarWeapon",sixStarPityType:"sixStarWeapon",rateUpCategory:"sixStarWeapon",rateUpChance:80,fiveStarPity:10,sixStarPity:30},transcendant:{name:"Transcendants",sixStarPityType:"transcendant",rateUpCategory:"transcendant",rateUpChance:80}},o={baseMember:{rates:[.5,13.95,22.11,28.39,14.42,4.81,14.42,0,0],items:["sConstruct","bOrAConstruct","constructShard","fourStarEquipment","overclock","exp","cogs","bConstruct","aConstruct"]},themedConstruct:{rates:[.5,13.95,22.11,28.39,14.42,4.81,14.42,0,0],items:["sConstruct","bOrAConstruct","constructShard","fourStarEquipment","overclock","exp","cogs","bConstruct","aConstruct"]},baseWeapon:{rates:[5,15,33.4,27.9,9.35,9.35],items:["sixStarWeapon","fiveStarWeapon","fourStarWeapon","threeStarWeapon","cogs","overclock"]},targetWeapon:{rates:[4,12,.5,1.5,.5,1.5,33.4,27.9,9.35,9.35],items:["sixStarWeapon","fiveStarWeapon","sixStarWeapon","fiveStarWeapon","sixStarWeapon","fiveStarWeapon","fourStarWeapon","threeStarWeapon","cogs","overclock"]},transcendant:{rates:[5,28.21,26.45,6.44,26.45],items:["transcendant","fourStarEquipment","overclock","exp","cogs"]},test:{rates:[1],items:["constructShard"]}},t={assetPath:"./assets/items/",items:["CogPackXL","CogPackXXL","Alice","Archimedes","Cunningham","Edison","EXPPodL","MajorOverclockAlloy","MemoryOverclockCircuitII"],fourStarEquipment:["Alice","Archimedes","Cunningham","Edison","MajorOverclockAlloy","MemoryOverclockCircuitII"],cogs:["CogPackXL","CogPackXXL"],exp:["EXPPodL"],overclock:["MajorOverclockAlloy","MemoryOverclockCircuitII"]},i={assetPath:"./assets/units/",aConstruct:[{name:"Lucia",frame:"Dawn",rank:"A"},{name:"Liv",frame:"Lux",rank:"A"},{name:"Lee",frame:"Palefire",rank:"A"},{name:"Watanabe",frame:"Nightblade",rank:"A"},{name:"Bianca",frame:"Zero",rank:"A"},{name:"Karenina",frame:"Blast",rank:"A"},{name:"Kamui",frame:"Bastion",rank:"A"},{name:"Watanabe",frame:"Astral",rank:"A"},{name:"Ayla",frame:"Brilliance",rank:"A"},{name:"Sophia",frame:"Silverfang",rank:"A"},{name:"Chrome",frame:"Arclight",rank:"A"},{name:"Vera",frame:"Rozen",rank:"A"},{name:"Changyu",frame:"Qilin",rank:"A"},{name:"Wanshi",frame:"Fate",rank:"A"},{name:"No.21",frame:"XXI",rank:"A"}],bConstruct:[{name:"Lucia",frame:"Lotus",rank:"B"},{name:"Liv",frame:"Eclipse",rank:"B"},{name:"Nanami",frame:"Storm",rank:"B"}],sConstruct:[{name:"Liv",frame:"Luminance",rank:"S"},{name:"Lee",frame:"Entropy",rank:"S"},{name:"Karenina",frame:"Ember",rank:"S"},{name:"Nanami",frame:"Pulse",rank:"S"},{name:"Kamui",frame:"Tenebrion",rank:"S"},{name:"Lucia",frame:"CrimsonAbyss",rank:"S"},{name:"Bianca",frame:"Veritas",rank:"S"},{name:"Lucia",frame:"Plume",rank:"S"},{name:"Rosetta",frame:"Rigor",rank:"S"},{name:"Luna",frame:"Laurel",rank:"S"},{name:"2B",frame:"2B",rank:"S"},{name:"9S",frame:"9S",rank:"S"},{name:"A2",frame:"A2",rank:"S"},{name:"Chrome",frame:"Glory",rank:"S"},{name:"Vera",frame:"Flare",rank:"S"},{name:"Liv",frame:"Solaeter",rank:"S"},{name:"Selena",frame:"Capriccio",rank:"S"},{name:"Nanami",frame:"RemoteStar",rank:"S"},{name:"Karenina",frame:"RadiantDaybreak",rank:"S"}],transcendant:[{name:"Camu",frame:"Crocotta",rank:"Transcendant"},{name:"Qu",frame:"Peafowl",rank:"Transcendant"},{name:"Selena",frame:"Tempest",rank:"Transcendant"},{name:"Roland",frame:"TheatricalFlame",rank:"Transcendant"},{name:"Pulao",frame:"OrnateBell",rank:"Transcendant"},{name:"Haicma",frame:"VeiledStar",rank:"Transcendant"}]},s={assetPath:"./assets/weapons/",sixStarWeapon:[{"Wolf Fang":["WolfFang","BerserkFusion","Benediction","Gloomlight"]},{"Zero Scale":["ZeroScale","BerserkFusion","Benediction","Gloomlight"]},{Scion:["Scion","HydroHeat","Sakura","Gloomlight"]},{"Lotus Berserker":["LotusBerserker","SoulRipper","Darkness","KujiNoSada"]},{"Inverse Shadow":["InverseShadow","InverseChimera","BigKamui","KujiNoSada"]},{Sakura:["Sakura","WolfFang","TypeZero","KujiNoSada"]},{"Crimson Birch":["CrimsonBirch","HydroHeat","FusionDragon","KujiNoSada"]},{Sariel:["Sariel","StElmo","Tonitrus","KujiNoSada"]},{"Type Zero":["TypeZero","Ramiel","BerserkFusion","GuardianMount"]},{Benediction:["Benediction","WolfFang","LotusBerserker","GuardianMount"]},{"Dragon Wind":["DragonWind","BigKamui","Ramiel","GuardianMount"]},{Ramiel:["Ramiel","LotusBerserker","SoulRipper","FalconE3320"]},{Tonitrus:["Tonitrus","FusionDragon","PurplePeony","FalconE3320"]},{"Inverse Chimera":["InverseChimera","InverseShadow","SoulRipper","LightningSpark"]},{"Hydro Heat":["HydroHeat","Darkness","SoulRipper","LightningSpark"]},{Darkness:["Darkness","Benediction","InverseChimera","DynamoGreatsword"]},{"Big Kamui":["BigKamui","TypeZero","WolfFang","DynamoGreatsword"]},{"Berserk Fusion":["BerserkFusion","DragonWind","InverseShadow","MagmaPillar"]},{"Fusion Dragon":["FusionDragon","DragonWind","InverseShadow","MagmaPillar"]},{"Soul Ripper":["SoulRipper","Darkness","TypeZero","StoneHeart"]},{Peacemaker:["Peacemaker","FusionDragon","HydroHeat","StoneHeart"]},{"Purple Peony":["PurplePeony","BigKamui","Ramiel","FadedColor"]},{"St Elmo":["StElmo","Peacemaker","Scion","FadedColor"]},{Galatea:["Galatea","Apollo","MistressOfTheWoods","FadedColor"]},{Gungnir:["Gungnir","Crimson Birch","ZeroScale","RL03CBlackSpike"]},{Baji:["Baji","Benediction","Tonitrus","WhiteQilin"]},{Ozma:["Ozma","Gungnir","PurplePeony","CrownLure"]},{Auncel:["Auncel","Peacemaker","CrimsonBirch","FA2DAP"]},{Apollo:["Apollo","Sariel","Gungnir","KalaType1Gunblade"]},{Growl:["Growl","StElmo","Ozma","Animus"]},{Phoenix:["Phoenix","Apollo","Baji","CrimsonKnight"]},{Hestia:["Hestia","Growl","Ozma","BipolarStar"]},{Sarastro:["Sarastro","Auncel","Durandel","NeopolitanSolo"]},{Implosion:["Implosion","Sarastro","Qinghe","Redshift"]},{"Silent Flash":["SilentFlash","Baji","Hestia","DireCrusher"]},{Thanatos:["Thanatos","Peacemaker","Scion","Glimpse"]},{Qinghe:["Qinghe","Thanatos","Sariel","Guiyun"]},{"Mistress of the Woods":["MistressOfTheWoods","InverseChimera","Sakura","Odette"]},{Durandal:["Durandal","Qinghe","MistressOfTheWoods","ComplexRoses"]},{Boundless:["Boundless","Thanatos","Phoenix","FrostRuler"]},{"Virtuous Contract Kai":["VirtuousContractKai","Type4OLanceKai","CruelOathKai","VirtuousContract"]},{"Type-4O Lance Kai":["Type4OLanceKai","VirtuousContractKai","CruelOathKai","Type4OLance"]},{"Cruel Oath Kai":["CruelOathKai","VirtuousContractKai","Type4OLanceKai","CruelOath"]}],fiveStarWeapon:["Gloomlight","KujiNoSada","GuardianMount","FalconE3320","LightningSpark","DynamoGreatsword","MagmaPillar","StoneHeart","FadedColor","RL03CBlackSpike","WhiteQilin","CrownLure","FA2DAP","KalaType1Gunblade","Animus","CrimsonKnight","BipolarStar","NeopolitanSolo","Redshift","DireCrusher","Glimpse","Guiyun","Odette","ComplexRoses","FrostRuler","CruelOath","VirtuousContract","Type4OLance"],fourStarWeapon:["Tokarev","UnbrandedBlade","FishMount","PulleyBow","Noise","Suppressor","RifledGun","HunterKnife","BleakScythe","AstrayExplorer","ArmorBreakTypeIX","Genesis","BulletAnt","StandardGunblade","Collaborator","TasseledBannerSpear","Apocalypse","BaselineModus","FuriousGale","PrototypeSledgehammerModel","Photophage","IronStarTypeVI","Overture","Groundbreaker","Greysteel"],threeStarWeapon:["StandardPistol","CombatKnife","SemiAutoTurret","PracticeBow","Chainsaw","Greatsword","Bazooka","Machete","StandardScythe"],twoStarWeapon:["StandardKnife","Levitator"]}})),o("3ESMo");
//# sourceMappingURL=index.bd91a90b.js.map
