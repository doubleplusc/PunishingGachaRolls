import {unitData, bannerData, weaponData} from "./data.js";
import {Banner, ConstructBanner, TranscendantBanner, WeaponBanner} from "./Banner.js";
const bannerSelect = document.getElementById(`select-banner`);
const bannerTargetSelect = document.getElementById(`select-target`);
let pityCounter = document.getElementById(`pityCounter`);
const roll10Button = document.getElementById(`roll10`);

const bannerLookup = {
  baseMember: ConstructBanner,
  themedConstruct: ConstructBanner,
  arrival: ConstructBanner,
  transcendant: TranscendantBanner,
  baseWeapon: WeaponBanner,
  targetWeapon: WeaponBanner,
  nierCollab: ConstructBanner,
};

chance = new Chance();
const bannerTable = new Map();
for(let bannerType of bannerSelect.options){
  let val = bannerType.value;
  bannerTable.set(val, new (bannerLookup[val])(val));
}

let currentBanner = bannerTable.get(bannerSelect.value);
bannerSelect.addEventListener(`change`, changeBannerType);
currentBanner.switchIn();

function changeBannerType(e){
  currentBanner.switchOut();
  currentBanner = bannerTable.get(e.target.value);
  currentBanner.switchIn();
}


