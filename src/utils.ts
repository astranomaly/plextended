// You can clean up your code by splitting things into distinct files, and referencing them in the main app file
class Utils {
    // Simple log replacement
    public static log = (msg: string):void => console.log(`▶️ ${msg}`);

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
            throw new Error(`${selector} is undefined`);
        }else if(element === null){
            // Wait for the timer, then run this function again
            await Utils.rafTimer();
            return await Utils.checkElem(selector);
        }else{
            // When the element exists, return it
            return element;
        }
    };
}
