const chance = new Chance();
class Banner{
  bannerType;
  sixStarPity; //either S rank or 6* weapon
  currentSixStarPity;
  fiveStarPity; //either A rank or 5* weapon
  currentFiveStarPity;
  rateUpPercent;
  rateUpSelection;
  currentRolls;

  constructor(bannerType){
    this.bannerType = bannerType;
    this.parseData();
    this.fiveStarPity = 10;
    this.currentFiveStarPity = 0;
  }
  parseData(){
    this.rateUpPercent = bannerData[this.bannerType][`rateUpChance`];
    this.currentSixStarPity = 0;
    this.currentFiveStarPity = 0;
  }
  roll10(){
    let parent = document.createElement(`div`);
    for(let ind = 1; ind <= 10; ind++){
      //use a map on currentRolls with roll1
      let drop = this.roll1();
      var imageDiv = document.createElement(`div`);
      imageDiv.setAttribute(`class`, `div${ind}`);
      let dropImage = document.createElement(`img`);
      dropImage.setAttribute(`src`, `${drop[`assetPath`]}`);
      imageDiv.appendChild(dropImage);
      parent.appendChild(imageDiv);
    }
    let domParent = document.querySelector(`.parent2`);
    domParent.replaceChildren(...(parent.childNodes));
  }
  roll1(){
    if((this.currentFiveStarPity !== this.fiveStarPity) && this.currentSixStarPity !== this.fiveStarPity){
      let category = chance.weighted(dropTables[this.bannerType][`items`], dropTables[this.bannerType][`rates`]);
      return database.pickOneFromCategory(category);
    }
    else{
      //pick pity
    }
  }
  pickPity(){
    //0 for onbanner selection, 1 for offrate1, 2 for offrate2
    return chance.integer({min: 0, max: 2});
  }
  clearStats(){
    this.currentSixStarPity = 0;
    this.currentFiveStarPity = 0;
  }
  changeRateUpSelection(selection){

  }
}

class ItemDatabase{
  lists;
  constructor(){
    //Creates and saves custom lists, e.g. bOrAConstruct, constructShard, etc. Must be a category with filterable parameters.
    //Additionally, if the requested category does not need a custom table, redirect to the corresponding object
    this.generateCustomLists();
  }
  generateCustomLists(){
    this.lists = {};
    this.lists[`bOrAConstruct`] = unitData[`bConstruct`].concat(unitData[`aConstruct`]);
    this.lists[`constructShard`] = this.lists[`bOrAConstruct`].concat(unitData[`sConstruct`]);
  }
  pickOneFromCategory(category){
    let drop;
    let name;
    switch(category){
      case `bOrAConstruct`:
      case `constructShard`:
        drop = chance.pickone(this.lists[category]);
        name = drop[`frame`];
        return {"name": name, "assetPath": `${unitData[`assetPath`]}${name}.png`};
      case `aConstruct`:
      case `sConstruct`:
      case `transcendant`:
        drop = chance.pickone(unitData[category]);
        name = drop[`frame`];
        return {"name": name, "assetPath": `${unitData[`assetPath`]}${name}.png`};
      case `sixStarWeapon`:
        drop = chance.pickone(weaponData[category]);
        name = Object.values(drop)[0];
        return {"name": name, "assetPath": `${weaponData[`assetPath`]}${name}.png`};
      case `fiveStarWeapon`:
      case `fourStarWeapon`:
      case `threeStarWeapon`:
      case `twoStarWeapon`:
        drop = chance.pickone(weaponData[category]);
        return {"name": drop, "assetPath": `${weaponData[`assetPath`]}${name}.png`};
      case `cogs`:
      case `exp`:
      case `overclock`:
      case `fourStarEquipment`:
        return {"name": category, "assetPath": ""};
      default:
        console.log(`${category} is not a valid category. Please create an issue`);
        break;
    }
  }
}

const baseMemberBanner = new Banner(`baseMember`);
const database = new ItemDatabase();

//debug stuff
let a = document.querySelector(`.parent2`);