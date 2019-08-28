// ==UserScript==
// @name         plextended
// @namespace    https://github.com/astranomaly
// @version      0.2.0
// @description  Tweaks for the Plex web interface
// @author       The Outpost
// @include      https://app.plex.tv/*
// @include      http://app.plex.tv/*
// @icon         https://cdn-images-1.medium.com/max/1187/1*JsyV8lXMuTbRVLQ2FPYWAg.png
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_deleteValue
// @grant        GM_addStyle
// @grant        GM_info
// ==/UserScript==
"use strict";var __awaiter=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))(function(r,s){function o(e){try{a(i.next(e))}catch(e){s(e)}}function l(e){try{a(i.throw(e))}catch(e){s(e)}}function a(e){e.done?r(e.value):new n(function(t){t(e.value)}).then(o,l)}a((i=i.apply(e,t||[])).next())})};class Utils{}Utils.log=(e=>console.log(`▶️ ${e}`)),Utils.rafTimer=(()=>new Promise(e=>requestAnimationFrame(e))),Utils.checkElem=(e=>__awaiter(this,void 0,void 0,function*(){const t=document.querySelector(e);if(void 0===t)throw new Error(`▶️ ${e} is undefined`);return null===t?(yield Utils.rafTimer(),yield Utils.checkElem(e)):t})),Utils.to12Hour=(e=>0===e?12:e<13?e:e-12),Utils.pad=((e,t=2,n="0")=>{const i=`${e}`;return i.length>=t?i:new Array(t-i.length+1).join(n)+i});class FinishTime{constructor(){this._getTimeInfo=(()=>__awaiter(this,void 0,void 0,function*(){const e=new Date,t=Utils.to12Hour(e.getHours()),n=e.getMinutes(),i=document.querySelectorAll("span[class^=PrePlayTertiaryTitleSpacer] span:not([class^=PrePlayDashSeparator])");let r=0;if(null===i)throw new Error("▶️ Couldn't find video info");return i.forEach(e=>{if(null!==e.innerText){let t=e.innerText;r=Number(t.match(/\d+/)[0])}}),{hour:t,mins:n,len:r}})),this._getFinishTime=(e=>__awaiter(this,void 0,void 0,function*(){let t={bulkMins:e.mins+e.len,newHour:e.hour,newMins:"error"};if(t.bulkMins>=60)for(t.newHour=e.hour+Math.floor(t.bulkMins/60),t.newMins=Utils.pad(t.bulkMins%60);t.newHour>12;)t.newHour=t.newHour-12;return`${t.newHour}:${t.newMins}`})),this._insertFinishTime=(e=>{const t=document.querySelector("span[class^=PrePlayTertiaryTitleSpacer]");if(null===t)throw new Error("Couldn't place timestamp, target was null");{const n=document.createElement("span");return n.id="plxd_stampSpot",t.appendChild(n),n.innerHTML=`<span style="margin:0 4px">&middot;</span>Finish by ${e}`,!0}}),Utils.checkElem("[data-qa-id=metadataTitleLink]").then(()=>this._getTimeInfo()).then(e=>this._getFinishTime(e)).then(e=>this._insertFinishTime(e))}}class PLXD{constructor(){this._TIMESTAMP="Aug 28",this._VERSION=GM_info.script.version,Utils.log(`Welcome to Plextended v${this._VERSION}! Last updated on ${this._TIMESTAMP}.`),new FinishTime}}new PLXD;