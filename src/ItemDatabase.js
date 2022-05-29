import {dropTables} from "./data.js";
import { BOrAConstructSelector, ConstructShardSelector, ConstructSelector, WeaponSelector, ItemSelector } from "./DropSelector.js";
class ItemDatabase {
  lookupTable;
  constructor() {
    this.generateLookupTable();
  }
  categoryToClass(category){
    switch(category){
      case `bOrAConstruct`:
        return BOrAConstructSelector;
      case `constructShard`:
        return ConstructShardSelector;
      case `bConstruct`:
      case `aConstruct`:
      case `sConstruct`:
      case `transcendant`:
        return ConstructSelector;
      case `sixStarWeapon`:
      case `fiveStarWeapon`:
      case `fourStarWeapon`:
      case `threeStarWeapon`:
      case `twoStarWeapon`:
        return WeaponSelector;
      case `cogs`:
      case `exp`:
      case `overclock`:
      case `fourStarEquipment`:
        return ItemSelector;
      default:
        console.log(
          `categoryToClass: ${category} is not a valid category. Please create an issue.`
        );
        break;
    }
  }
  generateLookupTable(){
    this.lookupTable = {};
    for(const banner in dropTables){
      (dropTables[banner].items).forEach(
        category => {
          if(!(category in this.lookupTable)){
            this.lookupTable[`${category}`] = new (this.categoryToClass(category))(category);
          }
        }
      );
    }
  }
  pickOneFromCategory(category) {
    try{
      //console.log(`Database pick one from ${category}`);
      return this.lookupTable[category].pickOneFromCategory();
    } catch(err){
      console.log(category, err);
    }
  }
  pickSpecificDrop(selection, category) {
    try{
      return this.lookupTable[category].pickSpecificDrop(selection);
    } catch(err){
      console.log(category, err);
    }
  }
  getReferenceTable(category){
    return this.lookupTable[category].getReferenceTable();
  }
  pickTargetedWeapon(isRateUp, rateUpSelection, category){
    return this.this.lookupTable[category].pickTargetedWeapon(isRateUp, rateUpSelection, category);
  }
}

export const database = new ItemDatabase();