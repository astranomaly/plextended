// ==UserScript==
// @name         Plextended
// @namespace    https://github.com/astranomaly
// @version      0.0.3
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

// Stupid/temp console logger so that the log can be filtered for 'plxd'
function clog(inp) {
    return console.log("[plxd] "+inp);
}

// Doesn't run except when page is refreshed. Force-run on change in navigation
// Uses timer instead of load event to trigger
// No logic for choosing total/played time (only works on played currently)

// Extension
PLXD = {
    // Useful info
    VERSION: GM_info.script.version,
    pagePath: window.location.pathname,
    // Initial function
    run: function() {
        clog("Welcome to Plextended v" + this.VERSION + "!");

        try {
            setTimeout(function(){
                clog('Getting current vid length...');
                let curDate   = new Date();
                let curHour   = curDate.getHours();
                let curMins   = curDate.getMinutes();
                let vidLength = document.querySelector('span[class^=PrePlayTertiaryTitleSpacer] span:not([class^=PrePlayDashSeparator]):last-of-type').innerText;
                let newHour = 0;
                let newMins = 0;

                vidLength = Number( vidLength.match(/\d+/)[0] );

                curHour = PLXD.UTILS.hour12( curHour );

                let bulkMins = curMins + vidLength;

                if( bulkMins >= 60 ){
                    newHour = curHour + Math.floor( bulkMins / 60);
                    newMins = bulkMins % 60;
                    while( newHour > 12 ){
                        newHour = newHour - 12;
                    }
                }

                let target = document.querySelector('span[class^=PrePlayTertiaryTitleSpacer]');
                let phraseSpot = document.createElement('span');

                phraseSpot.id = 'phraseSpot'
                target.appendChild(phraseSpot);

                phraseSpot.innerHTML = '<span class="PrePlayDashSeparator-separator-1d01z">&middot;</span>Finish by '+newHour+':'+PLXD.UTILS.pad( newMins, 2);

                clog( 'DONE' );
            },5000)
        } catch (error) {
            console.warn('[plxd] '+error );
        }
    },
    UTILS: {
        // Pads a number with filler
        // https://stackoverflow.com/a/10073788
        pad: function( num, amount, filler ){
            filler = filler || '0';
            num = num + '';
            return num.length >= amount ? num : new Array(amount - num.length + 1).join(filler) + num;
        },
        // Returns hour in 12h format
        hour12: function(hour){
            if( hour === 0 ){ return 12; }
            else if(hour < 13){ return hour; }
            else{ return hour - 12; }
        }
    }
};

try {
    PLXD.run();
} catch (error) {
    console.warn('[plxd] '+error );
}
