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
    this.rateUpPercent = bannerData[this.bannerType].rateUpChance;
    this.rateUpCategory = bannerData[this.bannerType].rateUpCategory;
    this.sixStarPity = bannerData[this.bannerType].sixStarPity;
    this.fiveStarPity = bannerData[this.bannerType].fiveStarPity;
    this.fiveStarPityType = bannerData[this.bannerType].fiveStarPityType;
    this.sixStarPityType = bannerData[this.bannerType].sixStarPityType;
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
    if(drop.rank === `A` && `constructShard` !== category){
      this.currentFiveStarPity = 0;
    }
    else if(drop.rank === `S` && `constructShard` !== category){
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
      console.log(`six star pity reached`);
      drop = this.pickPity(this.sixStarPityType);
      category = this.sixStarPityType;
    }
    else if(this.currentFiveStarPity === this.fiveStarPity){
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
      if(category === this.pityCategory || `bOrAConstruct` === category){
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
  pickPityDrop(pityCategory){
    //weapon banner must override to deal with offrates
    return database.pickOneFromCategory(pityCategory);
  }
  pickPity(pityCategory) {
    //don't do rate up calculations if it's not the same category. Prevents A selections from stifling S pity drops
    if(pityCategory !== this.rateUpCategory && `bOrAConstruct` !== pityCategory){
      console.log(`${pityCategory} does not have rate up, skip`);
      return database.pickOneFromCategory(pityCategory); 
    }
    let getSelectedRateUp = this.isSuccessRateUp();
    if(`Select` !== this.rateUpSelection && this.rateUpSelection && getSelectedRateUp){
      //rate up is not a lie
      console.log(`Rateup ✅, picking rate up selection ${this.rateUpSelection}`);
      return database.pickSpecificDrop(this.rateUpSelection, pityCategory);
    }
    else if(`Select` !== this.rateUpSelection && this.rateUpSelection && !getSelectedRateUp){
      //rate up is a lie
      //let drop = database.pickOneFromCategory(pityCategory);
      let drop = this.pickPityDrop(false, pityCategory);
      while(drop.name === this.rateUpSelection){
        //drop = database.pickOneFromCategory(pityCategory);
        drop = this.pickPityDrop(false, pityCategory);
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
    if (`Select` !== selection) {
      choiceImage.setAttribute(`src`, `${database.pickSpecificDrop(selection, this.rateUpCategory).assetPath}`);
      choiceImage.style.opacity = 100; // there has to be a smarter way to hide the picture when the choice is select?
    } else {
      choiceImage.setAttribute(`src`, ``);
      choiceImage.style.opacity = 0;
    }
  }
  switchIn(){
    //add event listeners, populateBannerTargetSelect if there are any, update pity display
    //future nice to do is to restore "history" of the last 10 pulls on this banner
    const bannerTargetSelect = document.getElementById(`select-target`);
    this.targetSelectListener = this.changeRateUpSelection.bind(this);
    bannerTargetSelect.addEventListener(`change`, this.targetSelectListener); //https://stackoverflow.com/questions/11565471/removing-event-listener-which-was-added-with-bind
    pityCounter.innerText = `Pity: ${this.currentFiveStarPity} / ${this.currentSixStarPity}`;
    this.populateBannerTargetSelect();

  }
  switchOut(){
    //remove event listeners
    const bannerSelect = document.getElementById(`select-banner`);
    const bannerTargetSelect = document.getElementById(`select-target`);
    bannerTargetSelect.removeEventListener(`change`, this.targetSelectListener);
  }
  populateBannerTargetSelect(){
    let options = [];
    let option = document.createElement(`option`);
    option.text = `Select`;
    options.push(option.outerHTML);
    if(this.rateUpCategory){
      for (const choice of database.getReferenceTable(this.rateUpCategory)) {
        option.text = choice.frame;
        option.value = choice.frame;
        options.push(option.outerHTML);
      }
    }
    const bannerTargetSelect = document.getElementById(`select-target`);
    bannerTargetSelect.options.length = 0;
    bannerTargetSelect.innerHTML = options.join('\n');
    this.changeRateUpSelection({target: {value: bannerTargetSelect.value}});
  }
  
}

export class ConstructBanner extends Banner{
  constructor(bannerType){
    super(bannerType);
  }
}

export class WeaponBanner extends Banner{
  constructor(bannerType){
    super(bannerType);
  }
  pickPityDrop(pityCategory, isRateUp){
    //need to be generalized for both 5 star and 6 star weapons
    //the 6 star weapon array needs to be processed before returning
    return database.pickTargetedWeapon(this.rateUpSelection, pityCategory, isRateUp);
  }
  pickPity(pityCategory) {
    //pity category applies to both 5 and 6 star weapons
    let getSelectedRateUp = this.isSuccessRateUp();
    if(`Select` !== this.rateUpSelection && this.rateUpSelection && getSelectedRateUp){
      //rate up is not a lie
      console.log(`Rateup ✅, picking rate up selection ${this.rateUpSelection}`);
      return this.pickPityDrop(pityCategory, true);
    }
    else if(`Select` !== this.rateUpSelection && this.rateUpSelection && !getSelectedRateUp){
      //rate up is a lie
      let drop = this.pickPityDrop(pityCategory, false);
      while(drop.name === this.rateUpSelection){
        drop = this.pickPityDrop(pityCategory, false);
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
  checkPity(drop, category){
    //need to override for weapon and transcendant banners
    if(`fiveStarWeapon` === category){
      this.currentFiveStarPity = 0;
    }
    else if(`sixStarWeapon` === category){
      this.currentFiveStarPity = 0;
      this.currentSixStarPity = 0;
    }
    if(this.currentFiveStarPity > this.fiveStarPity || this.currentSixStarPity > this.sixStarPity){
      alert(`Pity had a nuclear meltdown. Please take a screenshot of the page and create an issue.`);
    }
  }
  populateBannerTargetSelect(){
    let options = [];
    let option = document.createElement(`option`);
    option.text = `Select`;
    options.push(option.outerHTML);
    if(this.rateUpCategory){
      console.log(this.rateUpCategory);
      for(const key in database.getReferenceTable(this.rateUpCategory)){
        option.text = key;
        option.value = option.text;
        options.push(option.outerHTML);
      }
    }
    const bannerTargetSelect = document.getElementById(`select-target`);
    bannerTargetSelect.options.length = 0;
    bannerTargetSelect.innerHTML = options.join('\n');
    this.changeRateUpSelection({target: {value: bannerTargetSelect.value}});
  }
}

export class TranscendantBanner extends Banner{
  constructor(bannerType){
    super(bannerType);
  }
}