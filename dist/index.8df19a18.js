const bannerData = {
    baseMember: {
        name: 'Base Member Recruit',
        rateUpPool: 'aConstruct',
        rateUpChance: 80,
        fiveStarPity: 10,
        sixStarPity: 60
    },
    baseWeapon: {
        name: 'Base Weapon Research',
        rateUpPool: 'weapons',
        rateUpChance: 0,
        fiveStarPity: 10,
        sixStarPity: 30
    },
    targetWeapon: {
        name: 'Target Weapon Research',
        rateUpPool: 'weapons',
        rateUpChance: 80,
        fiveStarPity: 10,
        sixStarPity: 30
    },
    transcendant: {
        name: 'Transcendants',
        rateUpPool: 'transcendants',
        rateUpChance: 80
    },
    test: {
        name: 'Debug Purposes only',
        rateUpPool: 'sConstruct',
        rateUpChance: 80
    }
};
const dropTables = {
    baseMember: {
        //we need the 2 0 rates at the end or the lookup table for B and A constructs won't be created
        rates: [
            0.5,
            13.95,
            22.11,
            28.39,
            14.42,
            4.81,
            14.42,
            0,
            0
        ],
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
        ]
    },
    baseWeapon: {
        rates: [
            5,
            15,
            33.4,
            27.9,
            9.35,
            9.35
        ],
        items: [
            'sixStarWeapon',
            'fiveStarWeapon',
            'fourStarWeapon',
            'threeStarWeapon',
            'cogs',
            'overclock', 
        ]
    },
    targetWeapon: {
        rates: [
            4,
            12,
            0.5,
            1.5,
            0.5,
            1.5,
            33.4,
            27.9,
            9.35,
            9.35
        ],
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
        ]
    },
    transcendant: {
        rates: [
            5,
            28.21,
            26.45,
            6.44,
            26.45
        ],
        items: [
            'transcendant',
            'fourStarEquipment',
            'overclock',
            'exp',
            'cogs'
        ]
    },
    test: {
        rates: [
            1
        ],
        items: [
            'constructShard'
        ]
    }
};
const itemData = {
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
    cogs: [
        'CogPackXL',
        'CogPackXXL'
    ],
    exp: [
        'EXPPodL'
    ],
    overclock: [
        'MajorOverclockAlloy',
        'MemoryOverclockCircuitII'
    ]
};
const unitData = {
    assetPath: './assets/units/',
    aConstruct: [
        {
            name: 'Lucia',
            frame: 'Dawn',
            rank: 'A'
        },
        {
            name: 'Liv',
            frame: 'Lux',
            rank: 'A'
        },
        {
            name: 'Lee',
            frame: 'Palefire',
            rank: 'A'
        },
        {
            name: 'Watanabe',
            frame: 'Nightblade',
            rank: 'A'
        },
        {
            name: 'Bianca',
            frame: 'Zero',
            rank: 'A'
        },
        {
            name: 'Karenina',
            frame: 'Blast',
            rank: 'A'
        },
        {
            name: 'Kamui',
            frame: 'Bastion',
            rank: 'A'
        },
        {
            name: 'Watanabe',
            frame: 'Astral',
            rank: 'A'
        },
        {
            name: 'Ayla',
            frame: 'Brilliance',
            rank: 'A'
        },
        {
            name: 'Sophia',
            frame: 'Silverfang',
            rank: 'A'
        },
        {
            name: 'Chrome',
            frame: 'Arclight',
            rank: 'A'
        },
        {
            name: 'Vera',
            frame: 'Rozen',
            rank: 'A'
        },
        {
            name: 'Changyu',
            frame: 'Qilin',
            rank: 'A'
        },
        {
            name: 'Wanshi',
            frame: 'Fate',
            rank: 'A'
        },
        {
            name: 'No.21',
            frame: 'XXI',
            rank: 'A'
        }, 
    ],
    bConstruct: [
        {
            name: 'Lucia',
            frame: 'Lotus',
            rank: 'B'
        },
        {
            name: 'Liv',
            frame: 'Eclipse',
            rank: 'B'
        },
        {
            name: 'Nanami',
            frame: 'Storm',
            rank: 'B'
        }, 
    ],
    sConstruct: [
        {
            name: 'Liv',
            frame: 'Luminance',
            rank: 'S'
        },
        {
            name: 'Lee',
            frame: 'Entropy',
            rank: 'S'
        },
        {
            name: 'Karenina',
            frame: 'Ember',
            rank: 'S'
        },
        {
            name: 'Nanami',
            frame: 'Pulse',
            rank: 'S'
        },
        {
            name: 'Kamui',
            frame: 'Tenebrion',
            rank: 'S'
        },
        {
            name: 'Lucia',
            frame: 'CrimsonAbyss',
            rank: 'S'
        },
        {
            name: 'Bianca',
            frame: 'Veritas',
            rank: 'S'
        },
        {
            name: 'Lucia',
            frame: 'Plume',
            rank: 'S'
        },
        {
            name: 'Rosetta',
            frame: 'Rigor',
            rank: 'S'
        },
        {
            name: 'Luna',
            frame: 'Laurel',
            rank: 'S'
        },
        {
            name: '2B',
            frame: '2B',
            rank: 'S'
        },
        {
            name: '9S',
            frame: '9S',
            rank: 'S'
        },
        {
            name: 'A2',
            frame: 'A2',
            rank: 'S'
        },
        {
            name: 'Chrome',
            frame: 'Glory',
            rank: 'S'
        },
        {
            name: 'Vera',
            frame: 'Flare',
            rank: 'S'
        },
        {
            name: 'Liv',
            frame: 'Solaeter',
            rank: 'S'
        },
        {
            name: 'Selena',
            frame: 'Capriccio',
            rank: 'S'
        },
        {
            name: 'Nanami',
            frame: 'RemoteStar',
            rank: 'S'
        },
        {
            name: 'Karenina',
            frame: 'RadiantDaybreak',
            rank: 'S'
        }, 
    ],
    transcendant: [
        {
            name: 'Camu',
            frame: 'Crocotta',
            rank: 'Transcendant'
        },
        {
            name: 'Qu',
            frame: 'Peafowl',
            rank: 'Transcendant'
        },
        {
            name: 'Selena',
            frame: 'Tempest',
            rank: 'Transcendant'
        },
        {
            name: 'Roland',
            frame: 'TheatricalFlame',
            rank: 'Transcendant'
        },
        {
            name: 'Pulao',
            frame: 'OrnateBell',
            rank: 'Transcendant'
        },
        {
            name: 'Haicma',
            frame: 'VeiledStar',
            rank: 'Transcendant'
        }, 
    ]
};
const weaponData = {
    assetPath: './assets/weapons/',
    sixStarWeapon: [
        {
            wolfFang: [
                'WolfFang',
                'BerserkFusion',
                'Benediction',
                'Gloomlight'
            ]
        },
        {
            zeroScale: [
                'ZeroScale',
                'BerserkFusion',
                'Benediction',
                'Gloomlight'
            ]
        },
        {
            scion: [
                'Scion',
                'HydroHeat',
                'Sakura',
                'Gloomlight'
            ]
        },
        {
            lotusBerserker: [
                'LotusBerserker',
                'SoulRipper',
                'Darkness',
                'KujiNoSada', 
            ]
        },
        {
            inverseShadow: [
                'InverseShadow',
                'InverseChimera',
                'BigKamui',
                'KujiNoSada', 
            ]
        },
        {
            sakura: [
                'Sakura',
                'WolfFang',
                'TypeZero',
                'KujiNoSada'
            ]
        },
        {
            crimsonBirch: [
                'CrimsonBirch',
                'HydroHeat',
                'FusionDragon',
                'KujiNoSada'
            ]
        },
        {
            sariel: [
                'Sairel',
                'StElmo',
                'Tonitrus',
                'KujiNoSada'
            ]
        },
        {
            typeZero: [
                'TypeZero',
                'Ramiel',
                'BerserkFusion',
                'GuardianMount'
            ]
        },
        {
            benediction: [
                'Benediction',
                'WolfFang',
                'LotusBerserker',
                'GuardianMount', 
            ]
        },
        {
            dragonWind: [
                'DragonWind',
                'BigKamui',
                'Ramiel',
                'GuardianMount'
            ]
        },
        {
            ramiel: [
                'Ramiel',
                'LotusBerserker',
                'SoulRipper',
                'FalconE3320'
            ]
        },
        {
            tonitrus: [
                'Tonitrus',
                'FusionDragon',
                'PurplePeony',
                'FalconE3320'
            ]
        },
        {
            inverseChimera: [
                'InverseChimera',
                'InverseShadow',
                'SoulRipper',
                'LightningSpark', 
            ]
        },
        {
            hydroHeat: [
                'HydroHeat',
                'Darkness',
                'SoulRipper',
                'LightningSpark'
            ]
        },
        {
            darkness: [
                'Darkness',
                'Benediction',
                'InverseChimera',
                'DynamoGreatsword', 
            ]
        },
        {
            bigKamui: [
                'BigKamui',
                'TypeZero',
                'WolfFang',
                'DynamoGreatsword'
            ]
        },
        {
            berserkFusion: [
                'BerserkFusion',
                'DragonWind',
                'InverseShadow',
                'MagmaPillar', 
            ]
        },
        {
            fusionDragon: [
                'FusionDragon',
                'DragonWind',
                'InverseShadow',
                'MagmaPillar', 
            ]
        },
        {
            soulRipper: [
                'SoulRipper',
                'Darkness',
                'TypeZero',
                'StoneHeart'
            ]
        },
        {
            peacemaker: [
                'Peacemaker',
                'FusionDragon',
                'HydroHeat',
                'StoneHeart'
            ]
        },
        {
            purplePeony: [
                'PurplePeony',
                'BigKamui',
                'Ramiel',
                'FadedColor'
            ]
        },
        {
            stElmo: [
                'StElmo',
                'Peacemaker',
                'Scion',
                'FadedColor'
            ]
        },
        {
            galatea: [
                'Galatea',
                'Apollo',
                'MistressOfTheWoods',
                'FadedColor'
            ]
        },
        {
            gungnir: [
                'Gungnir',
                'Crimson Birch',
                'ZeroScale',
                'RL03CBlackSpike'
            ]
        },
        {
            baji: [
                'Baji',
                'Benediction',
                'Tonitrus',
                'WhiteQilin'
            ]
        },
        {
            ozma: [
                'Ozma',
                'Gungnir',
                'PurplePeony',
                'CrownLure'
            ]
        },
        {
            auncel: [
                'Auncel',
                'Peacemaker',
                'CrimsonBirch',
                'FA2DAP'
            ]
        },
        {
            apollo: [
                'Apollo',
                'Sariel',
                'Gungnir',
                'KalaType1Gunblade'
            ]
        },
        {
            growl: [
                'Growl',
                'StElmo',
                'Ozma',
                'Animus'
            ]
        },
        {
            phoenix: [
                'Phoenix',
                'Apollo',
                'Baji',
                'CrimsonKnight'
            ]
        },
        {
            hestia: [
                'Hestia',
                'Growl',
                'Ozma',
                'BipolarStar'
            ]
        },
        {
            sarastro: [
                'Sarastro',
                'Auncel',
                'Durandel',
                'NeopolitanSolo'
            ]
        },
        {
            implosion: [
                'Implosion',
                'Sarastro',
                'Qinghe',
                'Redshift'
            ]
        },
        {
            silentFlash: [
                'SilentFlash',
                'Baji',
                'Hestia',
                'DireCrusher'
            ]
        },
        // transcendant only weapons
        {
            thanatos: [
                'Thanatos',
                'Peacemaker',
                'Scion',
                'Glimpse'
            ]
        },
        {
            qinghe: [
                'Qinghe',
                'Thanatos',
                'Sariel',
                'Guiyun'
            ]
        },
        {
            mistressOfTheWoods: [
                'MistressOfTheWoods',
                'InverseChimera',
                'Sakura',
                'Odette', 
            ]
        },
        {
            durandal: [
                'Durandal',
                'Qinghe',
                'MistressOfTheWoods',
                'ComplexRoses'
            ]
        },
        {
            boundless: [
                'Boundless',
                'Thanatos',
                'Phoenix',
                'FrostRuler'
            ]
        },
        // Nier
        {
            virtuousContractKai: [
                'VirtuousContractKai',
                'Type4OLanceKai',
                'CruelOathKai',
                'VirtuousContract', 
            ]
        },
        {
            type4OLanceKai: [
                'Type4OLanceKai',
                'VirtuousContractKai',
                'CruelOathKai',
                'Type4OLance', 
            ]
        },
        {
            cruelOathKai: [
                'CruelOathKai',
                'VirtuousContractKai',
                'Type4OLanceKai',
                'CruelOath', 
            ]
        }, 
    ],
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
        'TassledBannerSpear',
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
    twoStarWeapon: [
        'StandardKnife',
        'Levitator'
    ]
};

//# sourceMappingURL=index.8df19a18.js.map
