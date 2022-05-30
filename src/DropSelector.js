import {unitData, itemData, weaponData} from "./data.js";
class BaseSelector{
  dataTable;
  category;

  //baseSelector is for constructs. Weapon banner needs to override as needed
  constructor(category){
    this.category = category;
  }
  generateCustomList(){
    //don't call from constructor unless it's needed
  }
  getReferenceTable(category = this.category){
    //some banners need to override this to return its own custom array
    return this.dataTable[category];
  }
  packReturnObject(drop){
    return { name: drop.name, assetPath: `${this.dataTable.assetPath}${drop.name}.png`, rank: drop.rank };
  }
  pick(){
    return chance.pickone(this.getReferenceTable());
  }
  pickOneFromCategory(){
    let drop = this.pick();
    return this.packReturnObject(drop);
  }
  pickSpecificDrop(selection, category, isRateUp){
    let drop = this.getReferenceTable().find(obj => obj.frame === selection);
    return this.packReturnObject(drop);
  }
}

export class ConstructSelector extends BaseSelector{
  constructor(category){
    super(category);
    this.dataTable = unitData;
  }
  packReturnObject(drop){
    return { name: drop.frame, assetPath: `${this.dataTable.assetPath}${drop.frame}.png`, rank: drop.rank };
  }
}

export class BOrAConstructSelector extends ConstructSelector{
  list;
  constructor(category){
    super(category);
    this.generateCustomList();
  }
  generateCustomList(){
    this.list = [];
    this.list.push(...(unitData.bConstruct), ...(unitData.aConstruct));
  }
  getReferenceTable(){
    //some banners need to override this to return its own custom array
    return this.list;
  }
}

export class ConstructShardSelector extends ConstructSelector{
  list;
  constructor(category){
    super(category);
    this.generateCustomList();
  }
  generateCustomList(){
    this.list = [];
    this.list.push(...(unitData.bConstruct), ...(unitData.aConstruct), ...(unitData.sConstruct));
  }
  getReferenceTable(){
    //some banners need to override this to return its own custom array
    return this.list;
  }
}

export class WeaponSelector extends BaseSelector{
  constructor(category){
    super(category);
    this.dataTable = weaponData;
  }
  packReturnObject(drop){
    if(`sixStarWeapon` === this.category){
      drop = this.getReferenceTable()[drop][0];
    }
    return { name: drop, assetPath: `${this.dataTable.assetPath}${drop}.png` };
  }
  pickSpecificDrop(selection, category, isRateUp){
    //only used in targeted weapon banner for 5 and 6 star weapon drops
    /*
    Since the dropdown menu choices have spaces but the filenames do not, multi-word six star weapon keys do not match the filenames
    The offrate five star weapons need to reference the offrate array. Therefore we are forced to set up the six star weapon data array to match the dropdown menu's string (which is why offrates have spaces) so the offrate object can be referenced
    Procedure is as such:
    1. Get onrate array.
    2. If offrate, get the string of the offrate weapon from the onrate array.
    3. Use offrate weapon string to get offrate array. This guarantees the next step will reference the correct weapon array
    4. Check if a five star weapon should be returned. If so return the last element. If not, return the first element.
    */
    let drop = this.getReferenceTable(`sixStarWeapon`)[selection];
    if(!isRateUp){
      drop = this.getReferenceTable(`sixStarWeapon`)[selection][chance.integer({min: 1, max: 2})]; //get offrate weapon string
      drop = this.getReferenceTable(`sixStarWeapon`)[drop]; //get the offrate array
    }
    //we will always have the correct weapon array here
    if(`fiveStarWeapon` === category){
      drop = drop[3];
    }
    else{
      drop = drop[0];
    }
    //console.log(`WeaponSelector returning object ${drop} path ${this.dataTable.assetPath}${drop}.png}`);
    return { name: drop, assetPath: `${this.dataTable.assetPath}${drop}.png` };
  }
  pick(){
    if(`sixStarWeapon` === this.category){
      return chance.pickone(Object.keys(this.getReferenceTable()));
    }
    else{
      return super.pick();
    }
  }
}

export class ItemSelector extends BaseSelector{
  constructor(category){
    super(category);
    this.dataTable = itemData;
  }
  packReturnObject(drop){
    return { name: drop, assetPath: `${this.dataTable.assetPath}${drop}.png` };
  }
}
