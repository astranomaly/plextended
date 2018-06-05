# Plextended

An extension to tweak aspects of the Plex web player.

## Installation

**Direct installation link pending.** Popular browser extensions include:
- [Tampermonkey](https://tampermonkey.net/): Recommended for Firefox v57+. Works in most browsers.
- [Violentmonkey](https://violentmonkey.github.io/get-it/): Recommended for Chrome. Not currently working in Firefox.
- Greasemonkey: Required for Firefox versions prior to v57

Plextended only officially supports the most recent versions of Chrome & Firefox, but other modern browsers with userscript support should theoretically work.

## Modification & Contribution

In case you want to modify the script and/or contribute to it, follow the below instructions. These instructions are for Chrome using Violentmonkey, as it's the easiest way to test scripts.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- Gulp: `npm install -g gulp-cli`
- Google Chrome with [Violentmonkey](https://violentmonkey.github.io/get-it/)

### Instructions

#### First-time setup
- Make sure the prerequisites are installed on your system
- Clone this project to your computer
- Open a terminal window in your project folder, and run `npm install`
- On the Chrome extensions page (found at chrome://extensions), ensure that the Violentmonkey extension has access to file URLs

#### Workflow
- Make sure your terminal window is open to this project folder, and run `gulp`
- Drag and drop the resulting `plextended.user.js` file from `build/dev/` to your browser
- On the installation page, click `Options` and select `Track local file`
- Click `Confirm Installation` and **do not close the installation page**
- As long as `gulp` is running and the installation page is open, any changes you save will be compiled automatically. Simply refresh the browser to see your changes
- When the script is ready to be released, run `gulp release`
