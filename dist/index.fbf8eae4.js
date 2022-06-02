function t(t,e,r,a){Object.defineProperty(t,e,{get:r,set:a,enumerable:!0,configurable:!0})}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},a={},i=e.parcelRequire7423;null==i&&((i=function(t){if(t in r)return r[t].exports;if(t in a){var e=a[t];delete a[t];var i={id:t,exports:{}};return r[t]=i,e.call(i.exports,i,i.exports),i.exports}var s=new Error("Cannot find module '"+t+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(t,e){a[t]=e},e.parcelRequire7423=i),i.register("bcFK1",(function(e,r){t(e.exports,"ConstructBanner",(()=>c)),t(e.exports,"WeaponBanner",(()=>o)),t(e.exports,"TranscendantBanner",(()=>l));var a=i("7x8Nx"),s=i("3ESMo");class n{bannerType;sixStarPity;currentSixStarPity;sixStarPityType;fiveStarPity;currentFiveStarPity;fiveStarPityType;rateUpPercent;rateUpSelection;rateUpCategory;currentRolls;constructor(t){this.bannerType=t,this.currentFiveStarPity=0,this.currentSixStarPity=0,this.rateUpPercent=70,this.rateUpCategory="",this.parseData()}parseData(){this.rateUpPercent=s.bannerData[this.bannerType].rateUpChance,this.rateUpCategory=s.bannerData[this.bannerType].rateUpCategory,this.sixStarPity=s.bannerData[this.bannerType].sixStarPity,this.fiveStarPity=s.bannerData[this.bannerType].fiveStarPity,this.fiveStarPityType=s.bannerData[this.bannerType].fiveStarPityType,this.sixStarPityType=s.bannerData[this.bannerType].sixStarPityType}updatePityDisplay(){pityCounter.innerText=`Pity: ${this.currentFiveStarPity} / ${this.currentSixStarPity}`}roll10(t){t.preventDefault();let e=document.createElement("div");for(let t=1;t<=10;t+=1){let t=this.roll1(),r=document.createElement("div");r.setAttribute("class",`${t.category} itemDisplay`);let a=document.createElement("img");a.setAttribute("src",`${t.drop.assetPath}`),a.setAttribute("class",`${t.category}`),r.appendChild(a),e.appendChild(r)}this.currentRolls=e,document.querySelector(".parent2").replaceChildren(...e.childNodes),this.updatePityDisplay()}checkPity(t,e){"A"===t.rank&&"constructShard"!==e?this.currentFiveStarPity=0:"S"===t.rank&&"constructShard"!==e&&(this.currentFiveStarPity=0,this.currentSixStarPity=0),(this.currentFiveStarPity>this.fiveStarPity||this.currentSixStarPity>this.sixStarPity)&&alert("Pity had a nuclear meltdown. Please take a screenshot of the page and create an issue.")}incrementPity(){this.currentFiveStarPity++,this.currentSixStarPity++}roll1(){let t,e;return this.incrementPity(),this.currentSixStarPity===this.sixStarPity?(console.log("six star pity reached"),t=this.pickPity(this.sixStarPityType),e=this.sixStarPityType):this.currentFiveStarPity===this.fiveStarPity?(console.log("five star pity reached"),t=this.pickPity(this.fiveStarPityType),e=this.fiveStarPityType):(e=chance.weighted(s.dropTables[this.bannerType].items,s.dropTables[this.bannerType].rates),e===this.pityCategory||"bOrAConstruct"===e?(console.log(`Got lucky ${e} drop of rate up category, check rate up success`),t=this.pickPity(e)):e===this.fiveStarPityType||e===this.sixStarPityType?(console.log(`Got lucky ${e} drop not of rate up category, pick random`),t=this.pickPity(e)):t=a.database.pickOneFromCategory(e)),this.checkPity(t,e),{drop:t,category:e}}isSuccessRateUp(){return chance.natural({max:100})<=this.rateUpPercent}pickPityDrop(t){return a.database.pickOneFromCategory(t)}pickPity(t){if(t!==this.rateUpCategory&&("bOrAConstruct"!==t||"aConstruct"!==this.rateUpCategory))return console.log(`${t} does not have rate up, skip`),a.database.pickOneFromCategory(t);let e=this.isSuccessRateUp();if("Select"!==this.rateUpSelection&&this.rateUpSelection&&e)return console.log(`Rateup ✅, picking rate up selection ${this.rateUpSelection}`),a.database.pickSpecificDrop(this.rateUpSelection,t);if("Select"!==this.rateUpSelection&&this.rateUpSelection&&!e){let e=this.pickPityDrop(t);for(;e.name===this.rateUpSelection;)e=this.pickPityDrop(t);return console.log(`Rateup ❌, picking ${e.name} instead of ${this.rateUpSelection}`),e}return console.log("No rate up, pick something random"),a.database.pickOneFromCategory(t)}clearStats(t){t.preventDefault(),this.currentSixStarPity=0,this.currentFiveStarPity=0,this.updatePityDisplay()}changeRateUpSelection({target:{value:t}}){let e=document.getElementById("select-target-image");this.rateUpSelection=t,"Select"!==t?(e.setAttribute("src",`${a.database.pickSpecificDrop(t,this.rateUpCategory).assetPath}`),e.style.opacity=100):(e.setAttribute("src",""),e.style.opacity=0)}switchIn(){const t=document.getElementById("select-target");this.targetSelectListener=this.changeRateUpSelection,t.addEventListener("change",this.targetSelectListener.bind(this));const e=document.getElementById("clearStats");this.clearStatsListener=this.clearStats,e.addEventListener("click",this.clearStatsListener.bind(this));const r=document.getElementById("roll10");this.roll10Listener=this.roll10,r.addEventListener("click",this.roll10Listener.bind(this)),this.updatePityDisplay(),this.populateBannerTargetSelect()}switchOut(){document.getElementById("select-banner");document.getElementById("select-target").removeEventListener("change",this.targetSelectListener)}populateBannerTargetSelect(){let t=[],e=document.createElement("option");if(e.text="Select",t.push(e.outerHTML),this.rateUpCategory)for(const r of a.database.getReferenceTable(this.rateUpCategory))e.text=r.frame,e.value=r.frame,t.push(e.outerHTML);const r=document.getElementById("select-target");r.options.length=0,r.innerHTML=t.join("\n"),this.changeRateUpSelection({target:{value:r.value}})}}class c extends n{constructor(t){super(t)}}class o extends n{constructor(t){super(t)}pickPityDrop(t,e){return a.database.pickTargetedWeapon(this.rateUpSelection,t,e)}pickPity(t){let e=this.isSuccessRateUp();if("Select"!==this.rateUpSelection&&this.rateUpSelection&&e)return console.log(`Rateup ✅, picking rate up selection ${this.rateUpSelection}`),this.pickPityDrop(t,!0);if("Select"!==this.rateUpSelection&&this.rateUpSelection&&!e){let e=this.pickPityDrop(t,!1);for(;e.name===this.rateUpSelection;)e=this.pickPityDrop(t,!1);return console.log(`Rateup ❌, picking ${e.name} instead of ${this.rateUpSelection}`),e}return console.log("No rate up, pick something random"),a.database.pickOneFromCategory(t)}checkPity(t,e){"fiveStarWeapon"===e?this.currentFiveStarPity=0:"sixStarWeapon"===e&&(this.currentFiveStarPity=0,this.currentSixStarPity=0),(this.currentFiveStarPity>this.fiveStarPity||this.currentSixStarPity>this.sixStarPity)&&alert("Pity had a nuclear meltdown. Please take a screenshot of the page and create an issue.")}populateBannerTargetSelect(){let t=[],e=document.createElement("option");if(e.text="Select",t.push(e.outerHTML),this.rateUpCategory){console.log(this.rateUpCategory);for(const r in a.database.getReferenceTable(this.rateUpCategory))e.text=r,e.value=e.text,t.push(e.outerHTML)}const r=document.getElementById("select-target");r.options.length=0,r.innerHTML=t.join("\n"),this.changeRateUpSelection({target:{value:r.value}})}}class l extends n{constructor(t){super(t),this.currentFiveStarPity=-1}incrementPity(){this.currentSixStarPity++}checkPity(t,e){"transcendant"===e&&(this.currentSixStarPity=0),this.currentSixStarPity>this.sixStarPity&&alert("Pity had a nuclear meltdown. Please take a screenshot of the page and create an issue.")}updatePityDisplay(){pityCounter.innerText=`Pity: ${this.currentSixStarPity}`}}})),i.register("7x8Nx",(function(e,r){t(e.exports,"database",(()=>n));var a=i("3ESMo"),s=i("290LY");const n=new class{lookupTable;constructor(){this.generateLookupTable()}categoryToClass(t){switch(t){case"bOrAConstruct":return s.BOrAConstructSelector;case"constructShard":return s.ConstructShardSelector;case"bConstruct":case"aConstruct":case"sConstruct":case"transcendant":case"nierConstruct":return s.ConstructSelector;case"sixStarWeapon":case"fiveStarWeapon":case"fourStarWeapon":case"threeStarWeapon":case"twoStarWeapon":return s.WeaponSelector;case"cogs":case"exp":case"overclock":case"fourStarEquipment":return s.ItemSelector;default:console.log(`categoryToClass: ${t} is not a valid category. Please create an issue.`)}}generateLookupTable(){this.lookupTable={};for(const t in a.dropTables)a.dropTables[t].items.forEach((t=>{t in this.lookupTable||(this.lookupTable[`${t}`]=new(this.categoryToClass(t))(t))}))}pickOneFromCategory(t){try{return this.lookupTable[t].pickOneFromCategory()}catch(e){console.log(t,e)}}pickSpecificDrop(t,e,r=!0){try{return this.lookupTable[e].pickSpecificDrop(t,e,r)}catch(t){console.log(e,t)}}getReferenceTable(t){return this.lookupTable[t].getReferenceTable()}pickTargetedWeapon(t,e,r){return this.lookupTable[e].pickSpecificDrop(t,e,r)}}})),i.register("290LY",(function(e,r){t(e.exports,"ConstructSelector",(()=>n)),t(e.exports,"BOrAConstructSelector",(()=>c)),t(e.exports,"ConstructShardSelector",(()=>o)),t(e.exports,"WeaponSelector",(()=>l)),t(e.exports,"ItemSelector",(()=>p));var a=i("3ESMo");class s{dataTable;category;constructor(t){this.category=t}generateCustomList(){}getReferenceTable(t=this.category){return this.dataTable[t]}packReturnObject(t){try{return{name:t.name,assetPath:`${this.dataTable.assetPath}${t.name}.png`,rank:t.rank}}catch(t){console.log(category,t)}}pick(){return chance.pickone(this.getReferenceTable())}pickOneFromCategory(){let t=this.pick();return this.packReturnObject(t)}pickSpecificDrop(t,e,r){let a=this.getReferenceTable().find((e=>e.frame===t));return this.packReturnObject(a)}}class n extends s{constructor(t){super(t),this.dataTable=a.unitData}packReturnObject(t){return{name:t.frame,assetPath:`${this.dataTable.assetPath}${t.frame}.png`,rank:t.rank}}}class c extends n{list;constructor(t){super(t),this.generateCustomList()}generateCustomList(){this.list=[],this.list.push(...a.unitData.bConstruct,...a.unitData.aConstruct)}getReferenceTable(){return this.list}}class o extends n{list;constructor(t){super(t),this.generateCustomList()}generateCustomList(){this.list=[],this.list.push(...a.unitData.bConstruct,...a.unitData.aConstruct,...a.unitData.sConstruct)}getReferenceTable(){return this.list}packReturnObject(t){try{return{name:t.name,assetPath:`${this.dataTable.assetPath}shards/InverShard${t.frame}.png`,rank:t.rank}}catch(t){console.log(category,t)}}}class l extends s{constructor(t){super(t),this.dataTable=a.weaponData}packReturnObject(t){return"sixStarWeapon"===this.category&&(t=this.getReferenceTable()[t][0]),{name:t,assetPath:`${this.dataTable.assetPath}${t}.png`}}pickSpecificDrop(t,e,r){let a=this.getReferenceTable("sixStarWeapon")[t];return r||(a=this.getReferenceTable("sixStarWeapon")[t][chance.integer({min:1,max:2})],a=this.getReferenceTable("sixStarWeapon")[a]),a="fiveStarWeapon"===e?a[3]:a[0],{name:a,assetPath:`${this.dataTable.assetPath}${a}.png`}}pick(){return"sixStarWeapon"===this.category?chance.pickone(Object.keys(this.getReferenceTable())):super.pick()}}class p extends s{constructor(t){super(t),this.dataTable=a.itemData}packReturnObject(t){return{name:t,assetPath:`${this.dataTable.assetPath}${t}.png`}}}})),i("bcFK1");
//# sourceMappingURL=index.fbf8eae4.js.map
