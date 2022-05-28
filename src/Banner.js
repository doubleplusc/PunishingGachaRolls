import {database} from "./ItemDatabase.js";
import { bannerData, dropTables } from "./data.js";
export class Banner {
  bannerType;

  sixStarPity; // either S rank or 6* weapon

  currentSixStarPity;

  sixStarPityType;

  fiveStarPity; // either A rank or 5* weapon

  currentFiveStarPity;

  fiveStarPityType;
  
  rateUpPercent;

  rateUpSelection;

  rateUpCategory;

  currentRolls;

  constructor(bannerType) {
    this.bannerType = bannerType;
    this.currentFiveStarPity = 0;
    this.currentSixStarPity = 0;
    this.rateUpPercent = 70;
    this.rateUpCategory = ``;
    this.parseData();
  }

  parseData() {
    //console.log(this.bannerType, bannerData[this.bannerType].rateUpChance, bannerData[this.bannerType].sixStarPity, bannerData[this.bannerType].fiveStarPity);
    this.rateUpPercent = bannerData[this.bannerType].rateUpChance;
    this.sixStarPity = bannerData[this.bannerType].sixStarPity;
    this.fiveStarPity = bannerData[this.bannerType].fiveStarPity;
    this.fiveStarPityType = bannerData[this.bannerType].fiveStarPityType;
    this.sixStarPityType = bannerData[this.bannerType].sixStarPityType;
    this.rateUpCategory = `aConstruct`;
  }

  roll10() {
    let parent = document.createElement(`div`);
    for (let ind = 1; ind <= 10; ind += 1) {
      // use a map on currentRolls with roll1
      let dropObj = this.roll1();
      let imageDiv = document.createElement(`div`);
      imageDiv.setAttribute(`class`, `${dropObj.category} itemDisplay`);
      let dropImage = document.createElement(`img`);
      dropImage.setAttribute(`src`, `${dropObj.drop.assetPath}`);
      dropImage.setAttribute(`class`, `${dropObj.category}`);
      imageDiv.appendChild(dropImage);
      parent.appendChild(imageDiv);
    }
    this.currentRolls = parent;
    let domParent = document.querySelector(`.parent2`);
    domParent.replaceChildren(...parent.childNodes);
    pityCounter.innerText = `Pity: ${this.currentFiveStarPity} / ${this.currentSixStarPity}`;
  }
  checkPity(drop, category){
    //need to override for weapon and transcendant banners
    if(drop.rank === `A` && category !== `constructShard`){
      this.currentFiveStarPity = 0;
    }
    else if(drop.rank === `S` && category !== `constructShard`){
      this.currentFiveStarPity = 0;
      this.currentSixStarPity = 0;
    }
    if(this.currentFiveStarPity > this.fiveStarPity || this.currentSixStarPity > this.sixStarPity){
      alert(`Pity had a nuclear meltdown. Please take a screenshot of the page and create an issue.`);
    }
  }
  roll1() {
    let drop;
    let category;
    this.currentFiveStarPity++;
    this.currentSixStarPity++;
    //need six star pity check first
    //otherwise, can trigger edge case of hitting 5 star pity at 60, giving A construct instead of S construct
    if(this.currentSixStarPity === this.sixStarPity){
      //drop = database.pickOneFromCategory(this.sixStarPityType);
      console.log(`six star pity reached`);
      drop = this.pickPity(this.sixStarPityType);
      category = this.sixStarPityType;
    }
    else if(this.currentFiveStarPity === this.fiveStarPity){
      //drop = database.pickOneFromCategory(this.fiveStarPityType);
      console.log(`five star pity reached`);
      drop = this.pickPity(this.fiveStarPityType);
      category = this.fiveStarPityType;
    }
    else{
      //in case our nonpity drop gave us a lucky early jackpot, we need to apply rate up as well
      category = chance.weighted(
        dropTables[this.bannerType].items,
        dropTables[this.bannerType].rates
      );
      if(category === this.pityCategory || category === `bOrAConstruct`){
        console.log(`Got lucky ${category} drop of rate up category, check rate up success`);
        drop = this.pickPity(category);
      }
      else if(category === this.fiveStarPityType || category === this.sixStarPityType){
        console.log(`Got lucky ${category} drop not of rate up category, pick random`);
        drop = this.pickPity(category);
      }
      else{
        drop = database.pickOneFromCategory(category);
      }
    }
    this.checkPity(drop, category);
    return { drop, category };
  }
  isSuccessRateUp(){
    //weapon banner must override to deal with different rates
    let random = chance.natural({max: 100});
    return random <= this.rateUpPercent;
  }
  pickPityDrop(){
    //weapon banner must override to deal with offrates
  }
  pickPity(pityCategory) {
    //don't do rate up calculations if it's not the same category. Prevents A selections from stifling S pity drops
    if(pityCategory !== this.rateUpCategory && pityCategory !== `bOrAConstruct`){
      console.log(`${pityCategory} does not have rate up, skip`);
      return database.pickOneFromCategory(pityCategory); 
    }
    let getSelectedRateUp = this.isSuccessRateUp();
    if(this.rateUpSelection !== `Select` && this.rateUpSelection && getSelectedRateUp){
      //rate up is not a lie
      console.log(`Rateup ✅, picking rate up selection ${this.rateUpSelection}`);
      return database.pickSpecificDrop(this.rateUpSelection, pityCategory);
    }
    else if(this.rateUpSelection !== `Select` && this.rateUpSelection && !getSelectedRateUp){
      //rate up is a lie
      let drop = database.pickOneFromCategory(pityCategory);
      while(drop.name === this.rateUpSelection){
        drop = database.pickOneFromCategory(pityCategory);
      }
      console.log(`Rateup ❌, picking ${drop.name} instead of ${this.rateUpSelection}`);
      return drop;
    }
    else{
      //no rate up
      console.log(`No rate up, pick something random`);
      return database.pickOneFromCategory(pityCategory);
    }
  }

  clearStats() {
    this.currentSixStarPity = 0;
    this.currentFiveStarPity = 0;
  }

  changeRateUpSelection({target: {value: selection}}) {
    let choiceImage = document.getElementById(`select-target-image`);
    this.rateUpSelection = selection;
    if (selection !== `Select`) {
      choiceImage.setAttribute(`src`, `${database.pickSpecificDrop(selection, this.rateUpCategory).assetPath}`);
      choiceImage.style.opacity = 100; // there has to be a smarter way to hide the picture when the choice is select?
    } else {
      choiceImage.setAttribute(`src`, `${database.pickSpecificDrop(selection, this.rateUpCategory).assetPath}`);
      choiceImage.style.opacity = 0;
    }
  }
  
}

class ConstructBanner extends Banner{
  constructor(bannerType){
    super(bannerType);
  }
}

class WeaponBanner extends Banner{
  constructor(bannerType){
    super(bannerType);
  }
}

class TranscendantBanner extends Banner{
  constructor(bannerType){
    super(bannerType);
  }
}