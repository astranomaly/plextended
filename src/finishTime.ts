class FinishTime {
    constructor(){
        Utils.checkElem('[data-qa-id=metadataTitleLink]')
        .then( () => { return this._getTimeInfo() } )
            .then(timeInfo => { /*  */ } )
    }

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
}
