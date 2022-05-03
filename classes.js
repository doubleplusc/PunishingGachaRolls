class Banner{
  bannerType;
  pity;
  currentPity;
  rateUpPercent;
  rateUpSelection;
  dropTable;
  currentRolls;
  constructor(bannerType){
    this.bannerType = bannerType;
    this.parseData();
  }
  parseData(){
    this.rateUpPercent = bannerData[this.bannerType][`rateUpChance`];
    this.currentPity = 0;
  }
  roll10(){
    for(let ind = 0; ind < 10; ind++){
      //use a map on currentRolls with roll1
    }
  }
  roll1(){
    if(currentPity === pity){
      this.pickPity();
    }
  }
  pickPity(){
    //
  }
  clearStats(){
    currentPity = 0;
  }
  changeRateUpSelection(selection){

  }
}

class BaseConstructBanner extends Banner{
  constructor(bannerType){
    super(bannerType);
  }
}

class CustomLists{
  lists;
  constructor(category){
    //Creates and saves custom lists, e.g. bOrAConstruct, constructShard, etc. Must be a category with filterable parameters.
    //Additionally, if the requested category does not need a custom table, redirect to the corresponding object
    generateCustomLists();
  }
  generateCustomLists(){
    lists = {};
    lists[`sConstruct`] = makeList(/S/, unitData, `rank`);
    lists[`bOrAConstruct`] = makeList(/B|A/, unitData, `rank`);
    lists[`constructShard`] = makeList(/B|A|S/, unitData, `rank`);
  }
  findListForCategory(category){
    switch(category){
      case `sConstruct`:
        return pickOne(lists[category]);
      case `sixStarWeapon`:
      case `fiveStarWeapon`:
      case `fourStarWeapon`:
      case `threeStarWeapon`:
        return pickOne(weaponData[category]);
      case `cogs`:
      case `exp`:
      case `overclock`:
        break;
      case `transcendant`:
        break;
      default:
        console.log(`${selectedTable} not found.`);
        break;
    }
  }
}

function pickOne(data){
  if(data instanceof Array){
    let ind = Math.floor(Math.random() * data.length);
    return data[ind];
  }
  else if(data instanceof Object){
    let keys = data.keys(data);
    return data[keys[Math.floor(Math.random() * keys.length)]];
  }
}

/*
function makeList(filterRegex, dataList, property){
  let customList = dataList.filter(element => filterRegex.test(element[property]));
  return function pickOne(){
    let ind = Math.floor(Math.random() * (customList.length - 1));
    return customList[ind];
  }
}
*/

class DropCategorySelector{
  cumulativeWeightTable;
  rateUpPercent;
  rateUpSelection;
  constructor(bannerType, rateUpPercent){
    this.generateWeightTable(bannerType)
    this.rateUpPercent = rateUpPercent;
  }
  generateWeightTable(bannerType){
    this.cumulativeWeightTable = dropTables[bannerType][`rates`];
    for(let ind = 1; ind < referenceTable.length; ind++)
      this.cumulativeWeightTable[ind] += this.cumulativeWeightTable[ind - 1];
  }
  pickDropTable(){
    //using the rates in dropTables' classes, find the right item type. (This only gives the pool to draw from. Another selection is needed to pick an item from that item pool)
    let val = Math.floor(Math.random() * (this.cumulativeWeightTable.length - 1));
    let selectedTable;
    for(let ind = 0; ind < this.cumulativeWeightTable.length; ind++){
      if(val <= this.cumulativeWeightTable[ind]){
        selectedTable = this.cumulativeWeightTable[ind];
      }
    }
  }
}