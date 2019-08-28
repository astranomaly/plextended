class FinishTime {
    constructor(){
        Utils.checkElem('[data-qa-id=metadataTitleLink]')
        .then( () => { return this._getTimeInfo(); } )
        .then( timeInfo => { return this._getFinishTime(timeInfo); } )
        .then( finishTime => { return this._insertFinishTime(finishTime) } )
    }

    /**
     * Extracts raw time data from the `Date()` and from Plex
     */
    private _getTimeInfo = async ():Promise<TimeInfo> => {
        // Get the current timestamp
        const curDate:Date = new Date();
        const curHour:number = Utils.to12Hour( curDate.getHours() );
        const curMins:number = curDate.getMinutes();
        // Get the length of the video
        // FIXME: this doesn't parse `X hr Y min` strings yet
        const vidInfo:NodeListOf<HTMLSpanElement>|null = document.querySelectorAll('span[class^=PrePlayTertiaryTitleSpacer] span:not([class^=PrePlayDashSeparator])' );
        let vidLength:number = 0;

        // Select a valid timestamp from the video info
        if (vidInfo === null){
            throw new Error(`▶️ Couldn't find video info`)
        }else{
            vidInfo.forEach( item => {
                if(item.innerText !== null){
                    let innerVal: string = item.innerText;
                    vidLength = Number( innerVal.match(/\d+/)![0] );
                }
            } );
        }
        // Return a TimeInfo object
        return {hour:curHour, mins:curMins, len:vidLength}
    }

    /**
     * Process time data into a future timestamp
     * @param timeObj An object containing the current `hour`, `mins`, and the length (`len`) of the video
     */
    private _getFinishTime = async ( timeObj:TimeInfo ):Promise<string> => {
        // Determine cumulative minutes and prepare variables
        let finishTime:FinishInfo = {
            "bulkMins": timeObj.mins + timeObj.len,
            "newHour": timeObj.hour,
            "newMins": 'ERROR',
        }

        // By default the new minute amount is the bulk minutes
        finishTime.newMins = `${finishTime.bulkMins}`;

        // Increment hours for each extra 60 mins
        if( finishTime.bulkMins >= 60 ){
            finishTime.newHour = timeObj.hour + Math.floor( finishTime.bulkMins / 60 );
            finishTime.newMins = Utils.pad( finishTime.bulkMins % 60 );
            while( finishTime.newHour > 12 ){
                // The clock only displays 12hr timeblocks
                finishTime.newHour = finishTime.newHour - 12;
            }
        }
        return `${finishTime.newHour}:${finishTime.newMins}`;
    }

    /**
     * Adds the Finish Time timestamp into the DOM
     */
    private _insertFinishTime = ( timestamp:string ):boolean => {
        // Choose where to insert the timestamp
        const tar:HTMLSpanElement|null = document.querySelector('span[class^=PrePlayTertiaryTitleSpacer]');
        if( tar !== null ){
            // Build a new location for the timestamp
            const stampSpot: HTMLSpanElement = document.createElement('span');
            stampSpot.id = 'plxd_stampSpot';
            tar.appendChild(stampSpot);
            // Display the timestamp info
            stampSpot.innerHTML = `<span style="margin:0 4px">&middot;</span>Finish by ${timestamp}`;

            return true;
        }else{
            return false;
        }
    }
}
