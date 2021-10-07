## logseq-custom-js 

Autoamtically include `logseq/custom.js` from your graph folder into the app. Use it to register custom html elements that have access to db and can render any html you want.

### Usage

- `git clone https://github.com/Inviz/logseq-custom-js.git`
- open Logseq Desktop client and turn on `Developer mode` in user settings panel
- open the toolbar dot menus and navigate to plugins page
- click `Load unpacked package` button, then select the `logseq-custom-js` directory to load it
- create `logseq/custom.js` in your logseq graph folder (see example in [./custom.js])
- now you can do anything in there. Try registering web component.
- style it via `custom.css`

# logseq-custom-js
