class ItemDatabase {
  lists;

  constructor() {
    // Creates and saves custom lists, e.g. bOrAConstruct, constructShard, etc. Must be a category with filterable parameters.
    // Additionally, if the requested category does not need a custom table, redirect to the corresponding object
    this.generateCustomLists();
  }

  generateCustomLists() {
    this.lists = {};
    this.lists.bOrAConstruct = unitData.bConstruct.concat(unitData.aConstruct);
    this.lists.constructShard = this.lists.bOrAConstruct.concat(
      unitData.sConstruct
    );
  }

  pickOneFromCategory(category) {
    let drop;
    let name;
    switch (category) {
      case `bOrAConstruct`:
      case `constructShard`:
        drop = chance.pickone(this.lists[category]);
        name = drop.frame;
        return { name, assetPath: `${unitData.assetPath}${name}.png` };
      case `aConstruct`:
      case `sConstruct`:
      case `transcendant`:
        drop = chance.pickone(unitData[category]);
        name = drop.frame;
        return { name, assetPath: `${unitData.assetPath}${name}.png` };
      case `sixStarWeapon`:
        drop = chance.pickone(weaponData[category]);
        name = Object.values(drop)[0];
        return { name, assetPath: `${weaponData.assetPath}${name}.png` };
      case `fiveStarWeapon`:
      case `fourStarWeapon`:
      case `threeStarWeapon`:
      case `twoStarWeapon`:
        drop = chance.pickone(weaponData[category]);
        return { name: drop, assetPath: `${weaponData.assetPath}${name}.png` };
      case `cogs`:
      case `exp`:
      case `overclock`:
      case `fourStarEquipment`:
        drop = chance.pickone(itemData[category]);
        return { name: drop, assetPath: `${itemData.assetPath}${drop}.png` };
      default:
        console.log(
          `${category} is not a valid category. Please create an issue`
        );
        break;
    }
  }
}
