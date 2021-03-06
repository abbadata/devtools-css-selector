# CSS Selector Finder for Chrome Devtools

Find CSS Selectors directly from the Chrome Devtools Elements Panel Sidebar.

- Unique CSS selectors are continuously generated as the selection is changed in the Chrome Devtools Elements panel
- Highly configurable. Settings can easily be changed interactively and results can be seen immediately.
  - Enable/Disable usage of IDs, Class names, and Tag names for selector generation
  - Filter out specific values of IDs, Class names, and Tag names
  - Use custom attribute names and attribute name/value pairs
  - Various settings to control robustness and optimization of selectors

[Project home page](https://abbadata.com/devtools_selector_finder.html)

## Installation

Install the Chrome Extension: 
[CSS Selector Finder for Chrome Devtools](https://chrome.google.com/webstore/detail/css-selector-finder-for-c/mbeedbpphndkijipfcklhlgmoolapiml)

## 1-Minute Demo

<a href="http://www.youtube.com/watch?feature=player_embedded&v=cWtvF4ys9Cc" target="_blank"><img src="http://img.youtube.com/vi/cWtvF4ys9Cc/0.jpg" 
alt="1-Minute Demo" width="240" height="180" border="10" /></a>

## Running

- Open the Chrome Devtools by inspecting a page element. (Right click on a page element and click "Inspect")
- There will be a "CSS Selectors" option on the sidebar. Click this.
- Click on DOM elements in the Elements panel. The CSS Selector will be updated dynamically.
- Customize CSS Selector generation by enabling/disabling ID/Class/Tags, filtering out specific values of ID/Class/Tags, and using custom attributes.
- Customize CSS Selector generation using settings to control robustness and optimization. Please see [GitHub](https://github.com/antonmedv/finder) for setting details.
- Click "Generate" to regenerate the selector after settings are changed or after navigating to a different page

## Limitations

- Does not work with IFRAMEs

## Development

### Building

1. Clone this project
2. npm install
3. npm run build-dev
4. The built files will be created in the <project>/dist directory

### Loading

1. Navigate to chrome://extensions
2. Click the "Developer mode" switch if not already enabled
3. Click "Load unpacked". Select the <project>/dist directory as the extension directory.

### Screenshots

<img
src="docs/screenshot3.png"
raw=true
alt="Screenshot"
style="margin-right: 10px;"
/>
<img
src="docs/screenshot4.png"
raw=true
alt="Screenshot"
style="margin-right: 10px;"
/>

### Credits

This extension uses Anton Medvedev's CSS Generator tool
[GitHub](https://github.com/antonmedv/finder)

## Changelog

v0.1
Initial release
