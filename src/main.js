import { unitData, bannerData } from "./data.js";
import { Banner } from "./Banner.js";
const bannerSelect = document.getElementById(`select-banner`);
const bannerTargetSelect = document.getElementById(`select-target`);
let pityCounter = document.getElementById(`pityCounter`);
const roll10Button = document.getElementById(`roll10`);

// need to programmatically set the selectable targets for the different banners. Can use a single helper function that uses callbacks on the different banners to generate
chance = new Chance();
export const bannerTable = [];
for(const bannerType in bannerData){
  bannerTable.push(new Banner(bannerType));
}

let currentBanner = bannerTable[0];
bannerSelect.addEventListener(`change`, changeBannerType);
bannerTargetSelect.addEventListener(`change`, currentBanner.changeRateUpSelection.bind(currentBanner));
roll10Button.addEventListener(`click`, roll10OfBanner);

populateBannerTargetSelect();

function changeBannerType(e){

}

//put this in Banner
function populateBannerTargetSelect(){
  let bannerVal = bannerSelect.value;
  let options = [];
  let option = document.createElement(`option`);
  option.text = `Select`;
  options.push(option.outerHTML);
  for (const choice of unitData[bannerData[bannerVal][`rateUpCategory`]]) {
    option.text = choice.frame;
    option.value = choice.frame;
    options.push(option.outerHTML);
  }
  bannerTargetSelect.insertAdjacentHTML(`beforeEnd`, options.join(`\n`));
}

function roll10OfBanner(e) {
  e.preventDefault();
  currentBanner.roll10();
}

