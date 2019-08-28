/// <reference path="utils.ts" />
/// <reference path="finishTime.ts" />

class PLXD {
    private _TIMESTAMP: string = '##timestamp##';
    private _VERSION: string = GM_info.script.version;

    constructor(){
        Utils.log(`Welcome to Plextended v${this._VERSION}! Last updated on ${this._TIMESTAMP}.`);
        let page: HTMLDivElement | null = document.querySelector('#content');

        // Start Features
        new FinishTime();
        // Check if page content changes
        if (page !== null) {
            Utils.observeElem(page, () => {
                // Re-run Features when page changes
                new FinishTime();
            } );
        }
    }
}

// Run the extension
new PLXD();
