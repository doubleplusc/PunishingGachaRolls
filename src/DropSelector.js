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
  getReferenceTable(){
    //some banners need to override this to return its own custom array
    return this.dataTable[this.category];
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
  pickOneFromCategoryWithoutRateUp(rateUpSelection){
    let drop = this.pick();
    while(drop.name === rateUpSelection){
      drop = this.pick();
    }
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
    return { name: drop.name, assetPath: `${this.dataTable.assetPath}${drop.name}.png` };
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
