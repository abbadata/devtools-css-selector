# Chrome Devtools Elements Panel - CSS Selector Finder

Find CSS Selectors easily by using the Chrome Devtools Elements Panel to navigate DOM elements.

## Installation

Install the Chrome Extension

## Running

- Open the Chrome Devtools. (Right click on page element and click "Inspect")
- There will be a "CSS Selectors" option on the sidebar. Click this.
- Click on DOM elements in the Elements panel. The CSS Selector will be updated dynamically.
- Customize CSS Selector generation by enabling/disabling ID/Class/Tags, custom attributes, filtered values

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

### Credits

This extension uses Anton Medvedev's CSS Generator tool
[GitHub](https://github.com/antonmedv/finder)

## Changelog

v0.1
Initial release
