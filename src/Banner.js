class Banner {
  bannerType;

  sixStarPity; // either S rank or 6* weapon

  currentSixStarPity;

  fiveStarPity; // either A rank or 5* weapon

  currentFiveStarPity;

  rateUpPercent;

  rateUpSelection;

  currentRolls;

  constructor(bannerType) {
    this.bannerType = bannerType;
    this.parseData();
    this.fiveStarPity = 10;
    this.currentFiveStarPity = 0;
  }

  parseData() {
    this.rateUpPercent = bannerData[this.bannerType].rateUpChance;
    this.currentSixStarPity = 0;
    this.currentFiveStarPity = 0;
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
      imageDiv.appendChild(dropImage);
      parent.appendChild(imageDiv);
    }
    let domParent = document.querySelector(`.parent2`);
    domParent.replaceChildren(...parent.childNodes);
  }

  roll1() {
    if (
      true
      // this.currentFiveStarPity !== this.fiveStarPity &&
      // this.currentSixStarPity !== this.fiveStarPity
    ) {
      let category = chance.weighted(
        dropTables[this.bannerType].items,
        dropTables[this.bannerType].rates
      );
      return {
        drop: database.pickOneFromCategory(category),
        category,
      };
    }

    // pick pity
  }

  pickPity() {
    // 0 for onbanner selection, 1 for offrate1, 2 for offrate2
    return chance.integer({ min: 0, max: 2 });
  }

  clearStats() {
    this.currentSixStarPity = 0;
    this.currentFiveStarPity = 0;
  }

  changeRateUpSelection(selection) {}
}
