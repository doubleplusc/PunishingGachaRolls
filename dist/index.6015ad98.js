var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},a=e.parcelRequire7423;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in n){var a=n[e];delete n[e];var r={id:e,exports:{}};return t[e]=r,a.call(r.exports,r,r.exports),r.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},e.parcelRequire7423=a);var r=a("3ESMo"),o=a("bcFK1");const l=document.getElementById("select-banner"),i=document.getElementById("select-target");document.getElementById("pityCounter");l.addEventListener("change",(function(e){})),i.addEventListener("change",(function(e){let t=e.target.value;u.rateUpSelection=t;let n=document.getElementById("select-target-image");"Select"!==t?(n.setAttribute("src",`${r.unitData.assetPath}${t}.png`),n.style.opacity=100):(n.setAttribute("src",`${r.unitData.assetPath}${t}.png`),n.style.opacity=0)}));document.getElementById("roll10").addEventListener("click",(function(e){e.preventDefault(),u.roll10()})),chance=new Chance;const c=[];for(const e in r.bannerData)c.push(new o.Banner(e));let u=c[0];!function(){let e=l.value,t=[],n=document.createElement("option");n.text="Select",t.push(n.outerHTML);for(const a of r.unitData[r.bannerData[e].rateUpCategory])n.text=a.frame,n.value=a.frame,t.push(n.outerHTML);i.insertAdjacentHTML("beforeEnd",t.join("\n"))}();
//# sourceMappingURL=index.6015ad98.js.map