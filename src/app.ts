/// <reference path="utils.ts" />

class PLXD {
    private _TIMESTAMP: string = '##timestamp##';
    private _VERSION: string = GM_info.script.version;
    // private _PAGE_PATH: string = window.location.pathname;

    constructor(){
        Utils.log(`Welcome to Plextended v${this._VERSION}! Last updated on ${this._TIMESTAMP}.`);
    }
}

// Run the extension
new PLXD();
