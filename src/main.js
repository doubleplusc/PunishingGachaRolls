import { unitData, bannerData, weaponData} from "./data.js";
import { Banner, ConstructBanner, TranscendantBanner, WeaponBanner } from "./Banner.js";
const bannerSelect = document.getElementById(`select-banner`);
const bannerTargetSelect = document.getElementById(`select-target`);
let pityCounter = document.getElementById(`pityCounter`);
const roll10Button = document.getElementById(`roll10`);

chance = new Chance();
const bannerLookup = {
  baseMember: ConstructBanner,
  baseWeapon: WeaponBanner,
  themedConstruct: ConstructBanner,
  targetWeapon: WeaponBanner,
  transcendant: TranscendantBanner,
};
const bannerTable = new Map();
for(let bannerType of bannerSelect.options){
  let val = bannerType.value;
  bannerTable.set(val, new (bannerLookup[val])(val));
}

//let currentBanner = bannerTable.get(bannerSelect.value);
let currentBanner = bannerTable.get(`baseWeapon`);
console.log(currentBanner);
bannerSelect.addEventListener(`change`, changeBannerType);
bannerTargetSelect.addEventListener(`change`, currentBanner.changeRateUpSelection.bind(currentBanner));
roll10Button.addEventListener(`click`, roll10OfBanner);

currentBanner.populateBannerTargetSelect();

function changeBannerType(e){

}

//also shift this to Banner
function roll10OfBanner(e) {
  e.preventDefault();
  currentBanner.roll10();
}

