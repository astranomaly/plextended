// You can clean up your code by splitting things into distinct files, and referencing them in the main app file
class Utils {
    // Simple log replacement
    public static log = (msg: any):void => console.log(`▶️ ${msg}`);

    // Timer using Animation Frames
    public static rafTimer = ():Promise<number> => {
        return new Promise(resolve => requestAnimationFrame(resolve));
    }

    /**
     * Wait for an element to exist, then return it
     * @param selector A DOM selector string
     */
    public static checkElem = async (selector:string):Promise<HTMLElement> => {
        const element:HTMLElement|null = document.querySelector(selector);
        if(element === undefined){
            throw new Error(`▶️ ${selector} is undefined`);
        }else if(element === null){
            // Wait for the timer, then run this function again
            await Utils.rafTimer();
            return await Utils.checkElem(selector);
        }else{
            // When the element exists, return it
            return element;
        }
    };

    /**
     * Run a function when an element mutates
     * @param elem An element to observe
     * @param callback The function that will run when a mutation is observed
     * @param config A MutationObserver configuration. Default: `childList` & `attributes`
     */
    public static observeElem = async ( elem:HTMLElement|null, callback:MutationCallback, config:MutationObserverInit = {
        childList: true,
        attributes: true,
    } ):Promise<MutationObserver> => {
        if( elem === null ) throw new Error(`Couldn't find the element to observe: ${elem}`);
        // Create a new observer
        const observe:MutationObserver = new MutationObserver( callback );
        observe.observe( elem, config );
        return observe;
    }

    /**
     * Converts 24 hour format to 12 hour format
     * @param hour 24-hour formatted number
     */
    public static to12Hour = (hour: number): number => {
        if (hour === 0) return 12;
        else if (hour < 13) return hour;
        else return hour - 12;
    }

    /**
     * Pads a number with filler: https://stackoverflow.com/a/10073788
     * @param num The number to be padded
     * @param len The desired length of the padded number. Default: `2`
     * @param filler What the number should be padded with. Default: `'0'`
     */
    public static pad = (num:number, len:number = 2, filler:string = '0'):string => {
        const stNum:string = `${num}`;
        return stNum.length >= len ? stNum : new Array( len - stNum.length + 1 ).join(filler) + stNum;
    }
}
