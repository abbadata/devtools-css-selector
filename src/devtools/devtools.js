console.log("Devtools page started: " + new Date());

function createPane() {
  chrome.devtools.panels.elements.createSidebarPane("CSS Selector", function (
    sidebar
  ) {
    sidebar.setPage("sidebar.html");
  });
}

createPane();
