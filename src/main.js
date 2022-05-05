// https://stackoverflow.com/questions/19706046/how-to-read-an-external-local-json-file-in-javascript
// https://stackoverflow.com/questions/18417114/add-item-to-dropdown-list-in-html-using-javascript

const bannerTargetSelect = document.getElementById(`select-target`);
let baseMemberA = unitData.aConstruct;
let options = [];
let option = document.createElement(`option`);
option.text = `Select`;
options.push(option.outerHTML);
for (aRank of baseMemberA) {
  option.text = aRank.frame;
  option.value = aRank.frame;
  options.push(option.outerHTML);
}
bannerTargetSelect.insertAdjacentHTML(`beforeEnd`, options.join(`\n`));
bannerTargetSelect.addEventListener(`change`, changeTargetImage);
const roll10Button = document.getElementById(`roll10`);
roll10Button.addEventListener(`click`, roll10OfBanner);
// need to programmatically set the selectable targets for the different banners. Can use a single helper function that uses callbacks on the different banners to generate

function changeTargetImage(e) {
  let choice = e.target.value;
  let choiceImage = document.getElementById(`select-target-image`);
  if (choice !== `Select`) {
    choiceImage.setAttribute(`src`, `${unitData.assetPath}${choice}.png`);
    choiceImage.style.opacity = 100; // there has to be a smarter way to hide the picture when the choice is select?
  } else {
    choiceImage.setAttribute(`src`, `${unitData.assetPath}${choice}.png`);
    choiceImage.style.opacity = 0;
  }
}

function roll10OfBanner(e) {
  e.preventDefault();
  baseMemberBanner.roll10();
}
const chance = new Chance();
const database = new ItemDatabase();
const baseMemberBanner = new Banner(`baseMember`);
