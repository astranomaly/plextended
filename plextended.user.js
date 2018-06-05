// ==UserScript==
// @name         Plextended
// @namespace    https://github.com/astranomaly
// @version      0.0.2
// @description  Tweaks for the Plex web interface
// @author       Astranomaly
// @include      https://app.plex.tv/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_deleteValue
// @grant        GM_addStyle
// @grant        GM_info
// ==/UserScript==

console.log('[plxd] ping');

var PLXD = {};

function clog(inp) {
  return console.log("[plxd] "+inp);
}
function padder(num){
  if(num < 10){
    num = '0'+num;
  }
  return num;
}

// Doesn't run except when page is refreshed. Force-run on change in navigation
// Uses timer instead of load event to trigger
// No graceful fallback
// No logic for choosing total/played time (only works on played currently)

PLXD = {
  VERSION: GM_info.script.version,
  pagePath: window.location.pathname,
  run: function() {
    clog("Welcome to Plextended v" + this.VERSION + "!");

    setTimeout(function(){
      clog('Getting current vid length...');
      let curDate = new Date();
      let hour   = curDate.getHours();
      let mins    = curDate.getMinutes();
      let vidLength = document.querySelector('span[class^=PrePlayTertiaryTitleSpacer] span:not([class^=PrePlayDashSeparator]):last-of-type').innerText;

      vidLength = Number(vidLength.match(/\d+/)[0]);

      hour = Math.abs(hour - 12);

      let upDate = mins + vidLength;
      if( upDate >= 60 ){
        upDate = upDate - 60;
        hour += 1;
        if (hour == 13){ hour = 1; }
      }

      let target   = document.querySelector('span[class^=PrePlayTertiaryTitleSpacer]');

      let phraseSpot = document.createElement('span');
      phraseSpot.id = 'phraseSpot'
      target.appendChild(phraseSpot);
      phraseSpot.innerText = " · Done at "+padder(hour)+":"+padder(upDate);
    },5000)

  }
};

PLXD.run();