// ==UserScript==
// @name         Plextended
// @namespace    https://github.com/astranomaly
// @version      0.0.4
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

// Extension
PLXD = {
    // Useful info
    VERSION: GM_info.script.version,
    pagePath: window.location.pathname,
    // Initial function
    run: function() {
        // Notify of version
        clog("Welcome to Plextended v" + this.VERSION + "!");

        // Wait for the TV show data to load
        this.UTILS.checkElem( '[data-qa-id=metadataTitleLink]' )
        .then( this.getTimeInfo )
        .then( (result) => this.getFinishTime(result) )
        .then( (result) => this.insertFinishTime(result) );
    },
    getTimeInfo: function(){
        // Get the current time
        let curDate = new Date();
        let curHour = PLXD.UTILS.hour12( curDate.getHours() );
        let curMins = curDate.getMinutes();
        // Get the length of the video
        let vidLength = 0;
        let vidInfo = document.querySelectorAll('span[class^=PrePlayTertiaryTitleSpacer] span:not([class^=PrePlayDashSeparator])');

        // Select the valid timestamp
        vidInfo.forEach(item => {
            item = Number( item.innerText.match(/\d+/)[0] );
            if (item !== isNaN) {
                vidLength = item;
            }
        });

        // Return the time info object
        return {hour:curHour, mins:curMins, len:vidLength};
    },
    getFinishTime: function( timeObj ){
        // Determine the cumulative minutes
        timeObj.bulkMins = timeObj.mins + timeObj.len;

        // Increment hours for each extra 60 mins
        if( timeObj.bulkMins >= 60 ){
            timeObj.newHour = timeObj.hour + Math.floor( timeObj.bulkMins / 60);
            timeObj.newMins = this.UTILS.pad( timeObj.bulkMins % 60, 2 );
            while( timeObj.newHour > 12 ){
                timeObj.newHour = timeObj.newHour - 12;
            }
        }
        return `${timeObj.newHour}:${timeObj.newMins}`;
    },
    insertFinishTime: function( timeString ){
        let target = document.querySelector('span[class^=PrePlayTertiaryTitleSpacer]');

        // Create a new span for the Finish Time
        let phraseSpot = document.createElement('span');
        phraseSpot.id = 'plxd_phraseSpot';
        target.appendChild(phraseSpot);
        // Display the Finish Time
        phraseSpot.innerHTML = `<span class="PrePlayDashSeparator-separator-1d01z">&middot;</span>Finish by ${timeString}`;
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
        },
        rafPromise: function(){
            return new Promise( resolve => requestAnimationFrame( resolve ) );
        },
        checkElem: function( selector ){
            if( document.querySelector( selector ) === null ){
                return this.rafPromise().then( () => this.checkElem( selector ) );
            } else {
                return Promise.resolve( selector );
            }
        },
        /* observeElem: function( tar, config){
            if( config === null){
                config = {
                    attributes: true,
                    childList: true,
                    characterData: true,
                    subtree: true,
                };
            }
            let observer = new MutationObserver( function(){ clog('MUTATED'); } );
            observer.observe( tar,config );
            return observer;
        }, */
    }
};

// Attempt to run the extension
try {
    PLXD.run();
} catch (error) {
    console.warn('[plxd] '+error );
}