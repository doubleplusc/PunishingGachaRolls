class Banner {
    bannerType;
    sixStarPity;
    currentSixStarPity;
    sixStarPityType;
    fiveStarPity;
    currentFiveStarPity;
    fiveStarPityType;
    rateUpPercent;
    rateUpSelection;
    currentRolls;
    constructor(bannerType){
        this.bannerType = bannerType;
        this.parseData();
        this.fiveStarPity = 10;
        this.currentFiveStarPity = 0;
        this.fiveStarPityType = 'aConstruct';
        this.sixStarPity = 60;
        this.currentSixStarPity = 0;
        this.sixStarPityType = `sConstruct`;
        this.rateUpPercent = 70;
    }
    parseData() {
        this.rateUpPercent = bannerData[this.bannerType].rateUpChance;
        this.currentSixStarPity = 0;
        this.currentFiveStarPity = 0;
    }
    roll10() {
        let parent = document.createElement(`div`);
        for(let ind = 1; ind <= 10; ind += 1){
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
        pityCounter.innerText = `Pity: ${this.currentSixStarPity}`;
    }
    checkPity(drop, category) {
        //need to override for weapon and transcendant banners
        if (drop.rank === `A` && category !== `constructShard`) this.currentFiveStarPity = 0;
        else if (drop.rank === `S` && category !== `constructShard`) {
            this.currentFiveStarPity = 0;
            this.currentSixStarPity = 0;
        }
    }
    roll1() {
        let drop;
        let category;
        this.currentFiveStarPity++;
        this.currentSixStarPity++;
        //need six star pity check first
        //otherwise, can trigger edge case of hitting 5 star pity at 60, giving A construct instead of S construct
        if (this.currentSixStarPity === this.sixStarPity) {
            drop = database.pickOneFromCategory(this.sixStarPityType);
            category = this.sixStarPityType;
        } else if (this.currentFiveStarPity === this.fiveStarPity) {
            drop = database.pickOneFromCategory(this.fiveStarPityType);
            category = this.fiveStarPityType;
        } else {
            category = chance.weighted(dropTables[this.bannerType].items, dropTables[this.bannerType].rates);
            drop = database.pickOneFromCategory(category);
        }
        this.checkPity(drop, category);
        return {
            drop,
            category
        };
    }
    isSuccessRateUp() {
        //weapon banner must override to deal with different rates
        let random = chance.natural({
            max: 100
        });
        return random >= this.rateUpPercent;
    }
    pickPityDrop() {
    //weapon banner must override to deal with offrates
    }
    pickPity(pityCategory) {
        let getSelectedRateUp = this.isSuccessRateUp();
        if (this.rateUpSelection && getSelectedRateUp) //rate up is not a lie
        return database.pickSpecificDrop();
        else if (this.rateUpSelection && !getSelectedRateUp) {
            //rate up is a lie
            let drop = database.pickOneFromCategory(pityCategory);
            while(drop.name === this.rateUpSelection)drop = database.pickOneFromCategoryWithoutRateUp();
        } else //no rate up
        return database.pickOneFromCategory(pityCategory);
    }
    clearStats() {
        this.currentSixStarPity = 0;
        this.currentFiveStarPity = 0;
    }
    changeRateUpSelection(selection) {}
}

//# sourceMappingURL=index.bd1469e3.js.map
