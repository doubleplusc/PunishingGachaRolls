// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"iMkX8":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "c31efe9e6350fc33";
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {};
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else if ('reload' in location) location.reload();
            else {
                // Web extension context
                var ext = typeof chrome === 'undefined' ? typeof browser === 'undefined' ? null : browser : chrome;
                if (ext && ext.runtime && ext.runtime.reload) ext.runtime.reload();
            }
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                var oldDeps = modules[asset.id][1];
                for(var dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    var id = oldDeps[dep];
                    var parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    var modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        var deps = modules[id1][1];
        var orphans = [];
        for(var dep in deps){
            var parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach(function(id) {
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    var parents = getParents(module.bundle.root, id);
    var accepted = false;
    while(parents.length > 0){
        var v = parents.shift();
        var a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            var p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push.apply(parents, _toConsumableArray(p));
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"jabKH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Banner", ()=>Banner
);
parcelHelpers.export(exports, "ConstructBanner", ()=>ConstructBanner
);
parcelHelpers.export(exports, "WeaponBanner", ()=>WeaponBanner
);
parcelHelpers.export(exports, "TranscendantBanner", ()=>TranscendantBanner
);
var _itemDatabaseJs = require("./ItemDatabase.js");
var _dataJs = require("./data.js");
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
    rateUpCategory;
    currentRolls;
    constructor(bannerType){
        this.bannerType = bannerType;
        this.currentFiveStarPity = 0;
        this.currentSixStarPity = 0;
        this.rateUpPercent = 70;
        this.rateUpCategory = ``;
        this.parseData();
    }
    parseData() {
        this.rateUpPercent = _dataJs.bannerData[this.bannerType].rateUpChance;
        this.rateUpCategory = _dataJs.bannerData[this.bannerType].rateUpCategory;
        this.sixStarPity = _dataJs.bannerData[this.bannerType].sixStarPity;
        this.fiveStarPity = _dataJs.bannerData[this.bannerType].fiveStarPity;
        this.fiveStarPityType = _dataJs.bannerData[this.bannerType].fiveStarPityType;
        this.sixStarPityType = _dataJs.bannerData[this.bannerType].sixStarPityType;
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
        pityCounter.innerText = `Pity: ${this.currentFiveStarPity} / ${this.currentSixStarPity}`;
    }
    checkPity(drop, category) {
        //need to override for weapon and transcendant banners
        if (drop.rank === `A` && `constructShard` !== category) this.currentFiveStarPity = 0;
        else if (drop.rank === `S` && `constructShard` !== category) {
            this.currentFiveStarPity = 0;
            this.currentSixStarPity = 0;
        }
        if (this.currentFiveStarPity > this.fiveStarPity || this.currentSixStarPity > this.sixStarPity) alert(`Pity had a nuclear meltdown. Please take a screenshot of the page and create an issue.`);
    }
    roll1() {
        let drop;
        let category;
        this.currentFiveStarPity++;
        this.currentSixStarPity++;
        //need six star pity check first
        //otherwise, can trigger edge case of hitting 5 star pity at 60, giving A construct instead of S construct
        if (this.currentSixStarPity === this.sixStarPity) {
            console.log(`six star pity reached`);
            drop = this.pickPity(this.sixStarPityType);
            category = this.sixStarPityType;
        } else if (this.currentFiveStarPity === this.fiveStarPity) {
            console.log(`five star pity reached`);
            drop = this.pickPity(this.fiveStarPityType);
            category = this.fiveStarPityType;
        } else {
            //in case our nonpity drop gave us a lucky early jackpot, we need to apply rate up as well
            category = chance.weighted(_dataJs.dropTables[this.bannerType].items, _dataJs.dropTables[this.bannerType].rates);
            if (category === this.pityCategory || `bOrAConstruct` === category) {
                console.log(`Got lucky ${category} drop of rate up category, check rate up success`);
                drop = this.pickPity(category);
            } else if (category === this.fiveStarPityType || category === this.sixStarPityType) {
                console.log(`Got lucky ${category} drop not of rate up category, pick random`);
                drop = this.pickPity(category);
            } else drop = _itemDatabaseJs.database.pickOneFromCategory(category);
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
        return random <= this.rateUpPercent;
    }
    pickPityDrop(pityCategory) {
        //weapon banner must override to deal with offrates
        return _itemDatabaseJs.database.pickOneFromCategory(pityCategory);
    }
    pickPity(pityCategory) {
        //don't do rate up calculations if it's not the same category. Prevents A selections from stifling S pity drops
        if (pityCategory !== this.rateUpCategory && `bOrAConstruct` !== pityCategory) {
            console.log(`${pityCategory} does not have rate up, skip`);
            return _itemDatabaseJs.database.pickOneFromCategory(pityCategory);
        }
        let getSelectedRateUp = this.isSuccessRateUp();
        if (`Select` !== this.rateUpSelection && this.rateUpSelection && getSelectedRateUp) {
            //rate up is not a lie
            console.log(`Rateup ✅, picking rate up selection ${this.rateUpSelection}`);
            return _itemDatabaseJs.database.pickSpecificDrop(this.rateUpSelection, pityCategory);
        } else if (`Select` !== this.rateUpSelection && this.rateUpSelection && !getSelectedRateUp) {
            //rate up is a lie
            //let drop = database.pickOneFromCategory(pityCategory);
            let drop = this.pickPityDrop(pityCategory);
            while(drop.name === this.rateUpSelection)//drop = database.pickOneFromCategory(pityCategory);
            drop = this.pickPityDrop(pityCategory);
            console.log(`Rateup ❌, picking ${drop.name} instead of ${this.rateUpSelection}`);
            return drop;
        } else {
            //no rate up
            console.log(`No rate up, pick something random`);
            return _itemDatabaseJs.database.pickOneFromCategory(pityCategory);
        }
    }
    clearStats() {
        this.currentSixStarPity = 0;
        this.currentFiveStarPity = 0;
    }
    changeRateUpSelection({ target: { value: selection  }  }) {
        let choiceImage = document.getElementById(`select-target-image`);
        this.rateUpSelection = selection;
        if (`Select` !== selection) {
            choiceImage.setAttribute(`src`, `${_itemDatabaseJs.database.pickSpecificDrop(selection, this.rateUpCategory).assetPath}`);
            choiceImage.style.opacity = 100; // there has to be a smarter way to hide the picture when the choice is select?
        } else {
            choiceImage.setAttribute(`src`, ``);
            choiceImage.style.opacity = 0;
        }
    }
    switchIn() {
        //add event listeners, populateBannerTargetSelect if there are any, update pity display
        //future nice to do is to restore "history" of the last 10 pulls on this banner
        const bannerTargetSelect = document.getElementById(`select-target`);
        this.targetSelectListener = this.changeRateUpSelection.bind(this);
        bannerTargetSelect.addEventListener(`change`, this.targetSelectListener); //https://stackoverflow.com/questions/11565471/removing-event-listener-which-was-added-with-bind
        pityCounter.innerText = `Pity: ${this.currentFiveStarPity} / ${this.currentSixStarPity}`;
        this.populateBannerTargetSelect();
    }
    switchOut() {
        //remove event listeners
        const bannerSelect = document.getElementById(`select-banner`);
        const bannerTargetSelect = document.getElementById(`select-target`);
        bannerTargetSelect.removeEventListener(`change`, this.targetSelectListener);
    }
    populateBannerTargetSelect() {
        let options = [];
        let option = document.createElement(`option`);
        option.text = `Select`;
        options.push(option.outerHTML);
        if (this.rateUpCategory) for (const choice of _itemDatabaseJs.database.getReferenceTable(this.rateUpCategory)){
            option.text = choice.frame;
            option.value = choice.frame;
            options.push(option.outerHTML);
        }
        const bannerTargetSelect = document.getElementById(`select-target`);
        bannerTargetSelect.options.length = 0;
        bannerTargetSelect.innerHTML = options.join('\n');
        this.changeRateUpSelection({
            target: {
                value: bannerTargetSelect.value
            }
        });
    }
}
class ConstructBanner extends Banner {
    constructor(bannerType){
        super(bannerType);
    }
}
class WeaponBanner extends Banner {
    constructor(bannerType){
        super(bannerType);
    }
    pickPityDrop(pityCategory, isRateUp) {
        //need to be generalized for both 5 star and 6 star weapons
        //the 6 star weapon array needs to be processed before returning
        return _itemDatabaseJs.database.pickTargetedWeapon(this.rateUpSelection, pityCategory, isRateUp);
    }
    pickPity(pityCategory) {
        //pity category applies to both 5 and 6 star weapons
        let getSelectedRateUp = this.isSuccessRateUp();
        if (`Select` !== this.rateUpSelection && this.rateUpSelection && getSelectedRateUp) {
            //rate up is not a lie
            console.log(`Rateup ✅, picking rate up selection ${this.rateUpSelection}`);
            return this.pickPityDrop(pityCategory, true);
        } else if (`Select` !== this.rateUpSelection && this.rateUpSelection && !getSelectedRateUp) {
            //rate up is a lie
            let drop = this.pickPityDrop(pityCategory, false);
            while(drop.name === this.rateUpSelection)drop = this.pickPityDrop(pityCategory, false);
            console.log(`Rateup ❌, picking ${drop.name} instead of ${this.rateUpSelection}`);
            return drop;
        } else {
            //no rate up
            console.log(`No rate up, pick something random`);
            return _itemDatabaseJs.database.pickOneFromCategory(pityCategory);
        }
    }
    checkPity(drop, category) {
        //need to override for weapon and transcendant banners
        if (`fiveStarWeapon` === category) this.currentFiveStarPity = 0;
        else if (`sixStarWeapon` === category) {
            this.currentFiveStarPity = 0;
            this.currentSixStarPity = 0;
        }
        if (this.currentFiveStarPity > this.fiveStarPity || this.currentSixStarPity > this.sixStarPity) alert(`Pity had a nuclear meltdown. Please take a screenshot of the page and create an issue.`);
    }
    populateBannerTargetSelect() {
        let options = [];
        let option = document.createElement(`option`);
        option.text = `Select`;
        options.push(option.outerHTML);
        if (this.rateUpCategory) {
            console.log(this.rateUpCategory);
            for(const key in _itemDatabaseJs.database.getReferenceTable(this.rateUpCategory)){
                option.text = key;
                option.value = option.text;
                options.push(option.outerHTML);
            }
        }
        const bannerTargetSelect = document.getElementById(`select-target`);
        bannerTargetSelect.options.length = 0;
        bannerTargetSelect.innerHTML = options.join('\n');
        this.changeRateUpSelection({
            target: {
                value: bannerTargetSelect.value
            }
        });
    }
}
class TranscendantBanner extends Banner {
    constructor(bannerType){
        super(bannerType);
    }
}

},{"./ItemDatabase.js":"c1GiK","./data.js":"9kapS","@parcel/transformer-js/src/esmodule-helpers.js":"h2BEm"}],"c1GiK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "database", ()=>database
);
var _dataJs = require("./data.js");
var _dropSelectorJs = require("./DropSelector.js");
class ItemDatabase {
    lookupTable;
    constructor(){
        this.generateLookupTable();
    }
    categoryToClass(category) {
        switch(category){
            case `bOrAConstruct`:
                return _dropSelectorJs.BOrAConstructSelector;
            case `constructShard`:
                return _dropSelectorJs.ConstructShardSelector;
            case `bConstruct`:
            case `aConstruct`:
            case `sConstruct`:
            case `transcendant`:
                return _dropSelectorJs.ConstructSelector;
            case `sixStarWeapon`:
            case `fiveStarWeapon`:
            case `fourStarWeapon`:
            case `threeStarWeapon`:
            case `twoStarWeapon`:
                return _dropSelectorJs.WeaponSelector;
            case `cogs`:
            case `exp`:
            case `overclock`:
            case `fourStarEquipment`:
                return _dropSelectorJs.ItemSelector;
            default:
                console.log(`categoryToClass: ${category} is not a valid category. Please create an issue.`);
                break;
        }
    }
    generateLookupTable() {
        this.lookupTable = {};
        for(const banner in _dataJs.dropTables)_dataJs.dropTables[banner].items.forEach((category)=>{
            if (!(category in this.lookupTable)) this.lookupTable[`${category}`] = new (this.categoryToClass(category))(category);
        });
    }
    pickOneFromCategory(category) {
        try {
            //console.log(`Database pick one from ${category}`);
            return this.lookupTable[category].pickOneFromCategory();
        } catch (err) {
            console.log(category, err);
        }
    }
    pickSpecificDrop(selection, category, isRateUp = true) {
        try {
            return this.lookupTable[category].pickSpecificDrop(selection, category, isRateUp);
        } catch (err) {
            console.log(category, err);
        }
    }
    getReferenceTable(category) {
        return this.lookupTable[category].getReferenceTable();
    }
    pickTargetedWeapon(rateUpSelection, category, isRateUp) {
        return this.lookupTable[category].pickSpecificDrop(rateUpSelection, category, isRateUp);
    }
}
const database = new ItemDatabase();

},{"./data.js":"9kapS","./DropSelector.js":"k9xpp","@parcel/transformer-js/src/esmodule-helpers.js":"h2BEm"}],"k9xpp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ConstructSelector", ()=>ConstructSelector
);
parcelHelpers.export(exports, "BOrAConstructSelector", ()=>BOrAConstructSelector
);
parcelHelpers.export(exports, "ConstructShardSelector", ()=>ConstructShardSelector
);
parcelHelpers.export(exports, "WeaponSelector", ()=>WeaponSelector
);
parcelHelpers.export(exports, "ItemSelector", ()=>ItemSelector
);
var _dataJs = require("./data.js");
class BaseSelector {
    dataTable;
    category;
    //baseSelector is for constructs. Weapon banner needs to override as needed
    constructor(category){
        this.category = category;
    }
    generateCustomList() {
    //don't call from constructor unless it's needed
    }
    getReferenceTable(category = this.category) {
        //some banners need to override this to return its own custom array
        return this.dataTable[category];
    }
    packReturnObject(drop) {
        return {
            name: drop.name,
            assetPath: `${this.dataTable.assetPath}${drop.name}.png`,
            rank: drop.rank
        };
    }
    pick() {
        return chance.pickone(this.getReferenceTable());
    }
    pickOneFromCategory() {
        let drop = this.pick();
        return this.packReturnObject(drop);
    }
    pickSpecificDrop(selection, category, isRateUp) {
        let drop = this.getReferenceTable().find((obj)=>obj.frame === selection
        );
        return this.packReturnObject(drop);
    }
}
class ConstructSelector extends BaseSelector {
    constructor(category){
        super(category);
        this.dataTable = _dataJs.unitData;
    }
    packReturnObject(drop) {
        return {
            name: drop.frame,
            assetPath: `${this.dataTable.assetPath}${drop.frame}.png`,
            rank: drop.rank
        };
    }
}
class BOrAConstructSelector extends ConstructSelector {
    list;
    constructor(category){
        super(category);
        this.generateCustomList();
    }
    generateCustomList() {
        this.list = [];
        this.list.push(..._dataJs.unitData.bConstruct, ..._dataJs.unitData.aConstruct);
    }
    getReferenceTable() {
        //some banners need to override this to return its own custom array
        return this.list;
    }
}
class ConstructShardSelector extends ConstructSelector {
    list;
    constructor(category){
        super(category);
        this.generateCustomList();
    }
    generateCustomList() {
        this.list = [];
        this.list.push(..._dataJs.unitData.bConstruct, ..._dataJs.unitData.aConstruct, ..._dataJs.unitData.sConstruct);
    }
    getReferenceTable() {
        //some banners need to override this to return its own custom array
        return this.list;
    }
}
class WeaponSelector extends BaseSelector {
    constructor(category){
        super(category);
        this.dataTable = _dataJs.weaponData;
    }
    packReturnObject(drop) {
        if (`sixStarWeapon` === this.category) drop = this.getReferenceTable()[drop][0];
        return {
            name: drop,
            assetPath: `${this.dataTable.assetPath}${drop}.png`
        };
    }
    pickSpecificDrop(selection, category, isRateUp) {
        //only used in targeted weapon banner for 5 and 6 star weapon drops
        /*
    Since the dropdown menu choices have spaces but the filenames do not, multi-word six star weapon keys do not match the filenames
    The offrate five star weapons need to reference the offrate array. Therefore we are forced to set up the six star weapon data array to match the dropdown menu's string (which is why offrates have spaces) so the offrate object can be referenced
    Procedure is as such:
    1. Get onrate array.
    2. If offrate, get the string of the offrate weapon from the onrate array.
    3. Use offrate weapon string to get offrate array. This guarantees the next step will reference the correct weapon array
    4. Check if a five star weapon should be returned. If so return the last element. If not, return the first element.
    */ let drop = this.getReferenceTable(`sixStarWeapon`)[selection];
        if (!isRateUp) {
            drop = this.getReferenceTable(`sixStarWeapon`)[selection][chance.integer({
                min: 1,
                max: 2
            })]; //get offrate weapon string
            drop = this.getReferenceTable(`sixStarWeapon`)[drop]; //get the offrate array
        }
        //we will always have the correct weapon array here
        if (`fiveStarWeapon` === category) drop = drop[3];
        else drop = drop[0];
        //console.log(`WeaponSelector returning object ${drop} path ${this.dataTable.assetPath}${drop}.png}`);
        return {
            name: drop,
            assetPath: `${this.dataTable.assetPath}${drop}.png`
        };
    }
    pick() {
        if (`sixStarWeapon` === this.category) return chance.pickone(Object.keys(this.getReferenceTable()));
        else return super.pick();
    }
}
class ItemSelector extends BaseSelector {
    constructor(category){
        super(category);
        this.dataTable = _dataJs.itemData;
    }
    packReturnObject(drop) {
        return {
            name: drop,
            assetPath: `${this.dataTable.assetPath}${drop}.png`
        };
    }
}

},{"./data.js":"9kapS","@parcel/transformer-js/src/esmodule-helpers.js":"h2BEm"}]},["iMkX8","jabKH"], "jabKH", "parcelRequire7423")

//# sourceMappingURL=index.6350fc33.js.map
