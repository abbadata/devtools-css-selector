// keep track of connections to content scripts
var sidebarConn = {};

chrome.runtime.onConnect.addListener(function (port) {
  var extensionListener = function (message, sender, sendResponse) {
    // The original connection event doesn't include the tab ID of the
    // DevTools page, so we need to send it explicitly.
    if (message.name == "sidebarinit") {
      sidebarConn[message.tabId] = port;
      port.postMessage({ status: "OK" });
    }
  };

  // Listen to messages sent from the DevTools page
  port.onMessage.addListener(extensionListener);

  port.onDisconnect.addListener(function (port) {
    port.onMessage.removeListener(extensionListener);

    var tabs = Object.keys(sidebarConn);
    for (var i = 0, len = tabs.length; i < len; i++) {
      if (sidebarConn[tabs[i]] == port) {
        delete sidebarConn[tabs[i]];
        break;
      }
    }
  });
});

// Receive message from content script and relay to the CSS Selector sidebar pane for the current tab
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (sender.tab) {
    var tabId = sender.tab.id;
    if (tabId in sidebarConn) {
      sidebarConn[tabId].postMessage(request);
    } else {
      console.error("Tab not found in connection list.");
    }
  } else {
    console.error("sender.tab not defined.");
  }
  return true;
});
