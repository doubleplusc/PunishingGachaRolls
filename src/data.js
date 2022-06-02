export const bannerData = {
  baseMember: {
    name: 'Base Member Recruit',
    fiveStarPityType: 'aConstruct',
    sixStarPityType: 'sConstruct',
    rateUpCategory: 'aConstruct',
    rateUpChance: 80,
    fiveStarPity: 10,
    sixStarPity: 60,
  },
  themedConstruct: {
    name: 'Themed Construct',
    fiveStarPityType: 'aConstruct',
    sixStarPityType: 'sConstruct',
    rateUpCategory: 'sConstruct',
    rateUpChance: 100,
    fiveStarPity: 10,
    sixStarPity: 60,
  },
  fateArrival: {
    name: 'Fate Arrival',
    fiveStarPityType: 'aConstruct',
    sixStarPityType: 'sConstruct',
    rateUpCategory: 'sConstruct',
    rateUpChance: 80,
    fiveStarPity: 10,
    sixStarPity: 60,
  },
  baseWeapon: {
    name: 'Base Weapon Research',
    fiveStarPityType: 'fiveStarWeapon',
    sixStarPityType: 'sixStarWeapon',
    rateUpChance: 0,
    fiveStarPity: 10,
    sixStarPity: 30,
  },
  targetWeapon: {
    name: 'Target Weapon Research',
    fiveStarPityType: 'fiveStarWeapon',
    sixStarPityType: 'sixStarWeapon',
    rateUpCategory: 'sixStarWeapon',
    rateUpChance: 80,
    fiveStarPity: 10,
    sixStarPity: 30,
  },
  transcendant: {
    name: 'Transcendants',
    sixStarPityType: 'transcendant',
    rateUpCategory: 'transcendant',
    rateUpChance: 80,
    sixStarPity: 10,
  },
  nierCollab: {
    name: 'Nier Collab',
    fiveStarPityType: 'aConstruct',
    sixStarPityType: 'nierConstruct',
    rateUpCategory: 'nierConstruct',
    rateUpChance: 100,
    fiveStarPity: 10,
    sixStarPity: 60,
  },
};
export const dropTables = {
  baseMember: {
    //we need the 2 0 rates at the end or the lookup table for B and A constructs won't be created
    rates: [0.5, 13.95, 22.11, 28.39, 14.42, 4.81, 14.42, 0, 0],
    items: [
      'sConstruct',
      'bOrAConstruct',
      'constructShard',
      'fourStarEquipment',
      'overclock',
      'exp',
      'cogs',
      'bConstruct',
      'aConstruct'
    ],
  },
  themedConstruct: {
    //we need the 2 0 rates at the end or the lookup table for B and A constructs won't be created
    rates: [0.5, 13.95, 22.11, 28.39, 14.42, 4.81, 14.42, 0, 0],
    items: [
      'sConstruct',
      'bOrAConstruct',
      'constructShard',
      'fourStarEquipment',
      'overclock',
      'exp',
      'cogs',
      'bConstruct',
      'aConstruct'
    ],
  },
  fateArrival: {
    //we need the 2 0 rates at the end or the lookup table for B and A constructs won't be created
    rates: [0.5, 13.95, 22.11, 28.39, 14.42, 4.81, 14.42, 0, 0],
    items: [
      'sConstruct',
      'bOrAConstruct',
      'constructShard',
      'fourStarEquipment',
      'overclock',
      'exp',
      'cogs',
      'bConstruct',
      'aConstruct'
    ],
  },
  baseWeapon: {
    rates: [5, 15, 33.4, 27.9, 9.35, 9.35],
    items: [
      'sixStarWeapon',
      'fiveStarWeapon',
      'fourStarWeapon',
      'threeStarWeapon',
      'cogs',
      'overclock',
    ],
  },
  targetWeapon: {
    rates: [4, 12, 0.5, 1.5, 0.5, 1.5, 33.4, 27.9, 9.35, 9.35],
    items: [
      'sixStarWeapon',
      'fiveStarWeapon',
      'sixStarWeapon',
      'fiveStarWeapon',
      'sixStarWeapon',
      'fiveStarWeapon',
      'fourStarWeapon',
      'threeStarWeapon',
      'cogs',
      'overclock',
    ],
  },
  transcendant: {
    rates: [5, 28.21, 26.45, 6.44, 26.45],
    items: ['transcendant', 'fourStarEquipment', 'overclock', 'exp', 'cogs'],
  },
  nierCollab: {
    //we need the 2 0 rates at the end or the lookup table for B and A constructs won't be created
    rates: [0.5, 13.95, 22.11, 28.39, 14.42, 4.81, 14.42, 0, 0],
    items: [
      'nierConstruct',
      'bOrAConstruct',
      'constructShard',
      'fourStarEquipment',
      'overclock',
      'exp',
      'cogs',
      'bConstruct',
      'aConstruct'
    ],
  },
};
export const itemData = {
  assetPath: './assets/items/',
  items: [
    'CogPackXL',
    'CogPackXXL',
    'Alice',
    'Archimedes',
    'Cunningham',
    'Edison',
    'EXPPodL',
    'MajorOverclockAlloy',
    'MemoryOverclockCircuitII',
  ],
  fourStarEquipment: [
    'Alice',
    'Archimedes',
    'Cunningham',
    'Edison',
    'MajorOverclockAlloy',
    'MemoryOverclockCircuitII',
  ],
  cogs: ['CogPackXL', 'CogPackXXL'],
  exp: ['EXPPodL'],
  overclock: ['MajorOverclockAlloy', 'MemoryOverclockCircuitII'],
};
export const unitData = {
  assetPath: './assets/units/',
  aConstruct: [
    {
      name: 'Lucia',
      frame: 'Dawn',
      rank: 'A',
    },
    {
      name: 'Liv',
      frame: 'Lux',
      rank: 'A',
    },
    {
      name: 'Lee',
      frame: 'Palefire',
      rank: 'A',
    },
    {
      name: 'Watanabe',
      frame: 'Nightblade',
      rank: 'A',
    },
    {
      name: 'Bianca',
      frame: 'Zero',
      rank: 'A',
    },
    {
      name: 'Karenina',
      frame: 'Blast',
      rank: 'A',
    },
    {
      name: 'Kamui',
      frame: 'Bastion',
      rank: 'A',
    },
    {
      name: 'Watanabe',
      frame: 'Astral',
      rank: 'A',
    },
    {
      name: 'Ayla',
      frame: 'Brilliance',
      rank: 'A',
    },
    {
      name: 'Sophia',
      frame: 'Silverfang',
      rank: 'A',
    },
    {
      name: 'Chrome',
      frame: 'Arclight',
      rank: 'A',
    },
    {
      name: 'Vera',
      frame: 'Rozen',
      rank: 'A',
    },
    {
      name: 'Changyu',
      frame: 'Qilin',
      rank: 'A',
    },
    {
      name: 'Wanshi',
      frame: 'Fate',
      rank: 'A',
    },
    {
      name: 'No.21',
      frame: 'XXI',
      rank: 'A',
    },
  ],
  bConstruct: [
    {
      name: 'Lucia',
      frame: 'Lotus',
      rank: 'B',
    },
    {
      name: 'Liv',
      frame: 'Eclipse',
      rank: 'B',
    },
    {
      name: 'Nanami',
      frame: 'Storm',
      rank: 'B',
    },
  ],
  sConstruct: [
    {
      name: 'Liv',
      frame: 'Luminance',
      rank: 'S',
    },
    {
      name: 'Lee',
      frame: 'Entropy',
      rank: 'S',
    },
    {
      name: 'Karenina',
      frame: 'Ember',
      rank: 'S',
    },
    {
      name: 'Nanami',
      frame: 'Pulse',
      rank: 'S',
    },
    {
      name: 'Kamui',
      frame: 'Tenebrion',
      rank: 'S',
    },
    {
      name: 'Lucia',
      frame: 'CrimsonAbyss',
      rank: 'S',
    },
    {
      name: 'Bianca',
      frame: 'Veritas',
      rank: 'S',
    },
    {
      name: 'Lucia',
      frame: 'Plume',
      rank: 'S',
    },
    {
      name: 'Rosetta',
      frame: 'Rigor',
      rank: 'S',
    },
    {
      name: 'Luna',
      frame: 'Laurel',
      rank: 'S',
    },
    {
      name: 'Chrome',
      frame: 'Glory',
      rank: 'S',
    },
    {
      name: 'Vera',
      frame: 'Flare',
      rank: 'S',
    },
    {
      name: 'Liv',
      frame: 'Solaeter',
      rank: 'S',
    },
    {
      name: 'Selena',
      frame: 'Capriccio',
      rank: 'S',
    },
    {
      name: 'Nanami',
      frame: 'RemoteStar',
      rank: 'S',
    },
    {
      name: 'Karenina',
      frame: 'RadiantDaybreak',
      rank: 'S',
    },
  ],
  transcendant: [
    {
      name: 'Camu',
      frame: 'Crocotta',
      rank: 'Transcendant',
    },
    {
      name: 'Qu',
      frame: 'Pavo',
      rank: 'Transcendant',
    },
    {
      name: 'Selena',
      frame: 'Tempest',
      rank: 'Transcendant',
    },
    {
      name: 'Roland',
      frame: 'TheatricalFlame',
      rank: 'Transcendant',
    },
    {
      name: 'Pulao',
      frame: 'OrnateBell',
      rank: 'Transcendant',
    },
    {
      name: 'Haicma',
      frame: 'VeiledStar',
      rank: 'Transcendant',
    },
  ],
  nierConstruct: [
    {
      name: '2B',
      frame: '2B',
      rank: 'S',
    },
    {
      name: '9S',
      frame: '9S',
      rank: 'S',
    },
    {
      name: 'A2',
      frame: 'A2',
      rank: 'S',
    },
  ],
};
export const weaponData = {
  assetPath: './assets/weapons/',
  sixStarWeapon: {
    'Wolf Fang': ['WolfFang', 'Berserk Fusion', 'Benediction', 'Gloomlight'],
    'Zero Scale': ['ZeroScale', 'Berserk Fusion', 'Benediction', 'Gloomlight'],
    'Scion': ['Scion', 'Hydro Heat', 'Sakura', 'Gloomlight'],
    'Lotus Berserker': [
        'LotusBerserker',
        'Soul Ripper',
        'Darkness',
        'KujiNoSada',
      ],
    'Inverse Shadow': [
      'InverseShadow',
      'Inverse Chimera',
      'Big Kamui',
      'KujiNoSada',
    ],
    'Sakura': ['Sakura', 'Wolf Fang', 'Type Zero', 'KujiNoSada'],
    'Crimson Birch': ['CrimsonBirch', 'Hydro Heat', 'Fusion Dragon', 'KujiNoSada'],
    'Sariel': ['Sariel', 'St Elmo', 'Tonitrus', 'KujiNoSada'],
    'Type Zero': ['TypeZero', 'Ramiel', 'Berserk Fusion', 'GuardianMount'],
    'Benediction': [
      'Benediction',
      'Wolf Fang',
      'Lotus Berserker',
      'GuardianMount',
    ],
    'Dragon Wind': ['DragonWind', 'Big Kamui', 'Ramiel', 'GuardianMount'],
    'Ramiel': ['Ramiel', 'Lotus Berserker', 'Soul Ripper', 'FalconE3320'],
    'Tonitrus': ['Tonitrus', 'Fusion Dragon', 'Purple Peony', 'FalconE3320'],
    'Inverse Chimera': [
      'InverseChimera',
      'Inverse Shadow',
      'Soul Ripper',
      'LightningSpark',
    ],
    'Hydro Heat': ['HydroHeat', 'Darkness', 'Soul Ripper', 'LightningSpark'],
    'Darkness': [
      'Darkness',
      'Benediction',
      'Inverse Chimera',
      'DynamoGreatsword',
    ],
    'Big Kamui': ['BigKamui', 'Type Zero', 'Wolf Fang', 'DynamoGreatsword'],
    'Berserk Fusion': [
      'BerserkFusion',
      'Dragon Wind',
      'Inverse Shadow',
      'MagmaPillar',
    ],
    'Fusion Dragon': [
      'FusionDragon',
      'Dragon Wind',
      'Inverse Shadow',
      'MagmaPillar',
    ],
    'Soul Ripper': ['SoulRipper', 'Darkness', 'Type Zero', 'StoneHeart'],
    'Peacemaker': ['Peacemaker', 'Fusion Dragon', 'Hydro Heat', 'StoneHeart'],
    'Purple Peony': ['PurplePeony', 'Big Kamui', 'Ramiel', 'FadedColor'],
    'St Elmo': ['StElmo', 'Peacemaker', 'Scion', 'FadedColor'],
    'Galatea': ['Galatea', 'Apollo', 'Mistress of the Woods', 'FadedColor'],
    'Gungnir': ['Gungnir', 'Crimson Birch', 'Zero Scale', 'RL03CBlackSpike'],
    'Baji': ['Baji', 'Benediction', 'Tonitrus', 'WhiteQilin'],
    'Ozma': ['Ozma', 'Gungnir', 'Purple Peony', 'CrownLure'],
    'Auncel': ['Auncel', 'Peacemaker', 'Crimson Birch', 'FA2DAP'],
    'Apollo': ['Apollo', 'Sariel', 'Gungnir', 'KalaType1Gunblade'],
    'Growl': ['Growl', 'St Elmo', 'Ozma', 'Animus'],
    'Phoenix': ['Phoenix', 'Apollo', 'Baji', 'CrimsonKnight'],
    'Hestia': ['Hestia', 'Growl', 'Ozma', 'BipolarStar'],
    'Sarastro': ['Sarastro', 'Auncel', 'Durandel', 'NeopolitanSolo'],
    'Implosion': ['Implosion', 'Sarastro', 'Qinghe', 'Redshift'],
    'Silent Flash': ['SilentFlash', 'Baji', 'Hestia', 'DireCrusher'],
  // transcendant only weapons
    'Thanatos': ['Thanatos', 'Peacemaker', 'Scion', 'Glimpse'],
    'Qinghe': ['Qinghe', 'Thanatos', 'Sariel', 'Guiyun'],
    'Mistress of the Woods': [
      'MistressOfTheWoods',
      'Inverse Chimera',
      'Sakura',
      'Odette',
    ],
    'Durandal': ['Durandal', 'Qinghe', 'Mistress of the Woods', 'ComplexRoses'],
  
    'Boundless': ['Boundless', 'Thanatos', 'Phoenix', 'FrostRuler'],
  
  // Nier
  
    'Virtuous Contract Kai': [
      'VirtuousContractKai',
      'Type-4O Lance Kai',
      'Cruel Oath Kai',
      'VirtuousContract',
    ],
    'Type-4O Lance Kai': [
      'Type4OLanceKai',
      'Virtuous Contract Kai',
      'Cruel Oath Kai',
      'Type4OLance',
    ],
    'Cruel Oath Kai': [
      'CruelOathKai',
      'Virtuous Contract Kai',
      'Type-4O Lance Kai',
      'CruelOath',
    ],
  },

  fiveStarWeapon: [
    'Gloomlight',
    'KujiNoSada',
    'GuardianMount',
    'FalconE3320',
    'LightningSpark',
    'DynamoGreatsword',
    'MagmaPillar',
    'StoneHeart',
    'FadedColor',
    'RL03CBlackSpike',
    'WhiteQilin',
    'CrownLure',
    'FA2DAP',
    'KalaType1Gunblade',
    'Animus',
    'CrimsonKnight',
    'BipolarStar',
    'NeopolitanSolo',
    'Redshift',
    'DireCrusher',
    'Glimpse',
    'Guiyun',
    'Odette',
    'ComplexRoses',
    'FrostRuler',
    'CruelOath',
    'VirtuousContract',
    'Type4OLance',
  ],

  fourStarWeapon: [
    'Tokarev',
    'UnbrandedBlade',
    'FishMount',
    'PulleyBow',
    'Noise',
    'Suppressor',
    'RifledGun',
    'HunterKnife',
    'BleakScythe',
    'AstrayExplorer',
    'ArmorBreakTypeIX',
    'Genesis',
    'BulletAnt',
    'StandardGunblade',
    'Collaborator',
    'TasseledBannerSpear',
    'Apocalypse',
    'BaselineModus',
    'FuriousGale',
    'PrototypeSledgehammerModel',
    'Photophage',
    'IronStarTypeVI',
    'Overture',
    'Groundbreaker',
    'Greysteel',
  ],
  threeStarWeapon: [
    'StandardPistol',
    'CombatKnife',
    'SemiAutoTurret',
    'PracticeBow',
    'Chainsaw',
    'Greatsword',
    'Bazooka',
    'Machete',
    'StandardScythe',
  ],
  twoStarWeapon: ['StandardKnife', 'Levitator'],
};
