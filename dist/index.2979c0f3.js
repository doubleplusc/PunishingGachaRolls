var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},r=e.parcelRequire7423;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in t){var r=t[e];delete t[e];var o={id:e,exports:{}};return n[e]=o,r.call(o.exports,o,o.exports),o.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,n){t[e]=n},e.parcelRequire7423=r),r("3ESMo");var o=r("bcFK1");const a=document.getElementById("select-banner");document.getElementById("select-target");document.getElementById("pityCounter");const l=document.getElementById("roll10");chance=new Chance;const c={baseMember:o.ConstructBanner,baseWeapon:o.WeaponBanner,themedConstruct:o.ConstructBanner,targetWeapon:o.WeaponBanner,transcendant:o.TranscendantBanner},d=new Map;for(let e of a.options){let n=e.value;d.set(n,new c[n](n))}let i=d.get(a.value);a.addEventListener("change",(function(e){i.switchOut(),i=d.get(e.target.value),i.switchIn()})),i.switchIn(),l.addEventListener("click",(function(e){e.preventDefault(),i.roll10()})),i.populateBannerTargetSelect();
//# sourceMappingURL=index.2979c0f3.js.map