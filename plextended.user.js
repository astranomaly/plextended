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

var PLXD = {};

// Stupid/temp console logger so that the log can be filtered for 'plxd'
function clog(inp) {
    return console.log("[plxd] "+inp);
}

// FIXME: Doesn't run except when page is refreshed. Force-run on change in navigation
// FIXME: Uses timer instead of load event to trigger

// Extension
PLXD = {
    // Useful info
    VERSION: GM_info.script.version,
    pagePath: window.location.pathname,
    // Initial function
    run: function() {
        clog("Welcome to Plextended v" + this.VERSION + "!");

        try {
            clog('Getting current vid length...');
            setTimeout(function(){


                let curDate = new Date();
                let curHour = curDate.getHours();
                let curMins = curDate.getMinutes();
                let vidInfo = document.querySelectorAll('span[class^=PrePlayTertiaryTitleSpacer] span:not([class^=PrePlayDashSeparator])');
                let newHour = 0;
                let newMins = 0;
                let vidLength = 0;

                vidInfo.forEach(item => {
                    item = Number( item.innerText.match(/\d+/)[0] );
                    if (item !== isNaN) {
                        vidLength = item;
                    }
                });

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

                phraseSpot.id = 'phraseSpot';
                target.appendChild(phraseSpot);

                phraseSpot.innerHTML = '<span class="PrePlayDashSeparator-separator-1d01z">&middot;</span>Finish by '+newHour+':'+PLXD.UTILS.pad( newMins, 2);
            },5000);
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

// Attempt to run the extension
try {
    PLXD.run();
} catch (error) {
    console.warn('[plxd] '+error );
}
