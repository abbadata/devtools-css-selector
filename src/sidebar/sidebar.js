import sidebar from "./sidebar.css";

var idEnabled = true;
var classEnabled = true;
var tagEnabled = true;
var customEnabled = false;
var idFilter = [];
var classFilter = [];
var tagFilter = [];
var customFilter = [];
var seedMinLength = 1;
var optimizedMinLength = 2;
var threshhold = 1000;
var maxNumberOfTries = 10000;

var backgroundPageConnection = chrome.runtime.connect({
  name: "sidebar",
});

backgroundPageConnection.postMessage({
  name: "sidebarinit",
  tabId: chrome.devtools.inspectedWindow.tabId,
});

backgroundPageConnection.onMessage.addListener(function (msg) {
  if (msg.status == "SELECTOR_OK") {
    document.getElementById("selector").classList.remove("loading");
    let selector = document.getElementById("selector");
    if (selector) {
      selector.value = msg.selector;
    } else {
      console.error("No selector field.");
    }
  } else if (msg.status == "SELECTOR_ERROR") {
    // set selector to "" if error
    document.getElementById("selector").classList.remove("loading");
    document.getElementById("selector").value = "";
  }
});

// Listen for selection changes on Elements pane
chrome.devtools.panels.elements.onSelectionChanged.addListener(function () {
  regenerate();
});

function initialize() {
  document.getElementById("enable_id").checked = idEnabled;
  document.getElementById("enable_class").checked = classEnabled;
  document.getElementById("enable_tag").checked = tagEnabled;
  document.getElementById("enable_custom").checked = customEnabled;
  document.getElementById("field_seed_min_length").value = seedMinLength;
  document.getElementById("field_opt_min_length").value = optimizedMinLength;
  document.getElementById("field_threshhold").value = threshhold;
  document.getElementById("field_max_num_tries").value = maxNumberOfTries;

  if (!idEnabled) {
    hideDiv("id_filter_pane");
  }
  if (!classEnabled) {
    hideDiv("class_filter_pane");
  }
  if (!tagEnabled) {
    hideDiv("tag_filter_pane");
  }
  if (!customEnabled) {
    hideDiv("custom_filter_pane");
  }
  updateList("id_filter_list", idFilter, deleteIdListItem);
  updateList("class_filter_list", classFilter, deleteClassListItem);
  updateList("tag_filter_list", tagFilter, deleteTagListItem);
}

// Generate CSS Selector by calling appropriate function on content script.
function regenerate() {
  let json = JSON.stringify({
    idEnabled,
    classEnabled,
    tagEnabled,
    customEnabled,
    idFilter,
    classFilter,
    tagFilter,
    customFilter,
    seedMinLength,
    optimizedMinLength,
    threshhold,
    maxNumberOfTries,
  }).replace(/\\"/g, '\\\\"');
  document.getElementById("selector").classList.add("loading");
  chrome.devtools.inspectedWindow.eval(
    "window.abbaSetSelection($0,'" + json + "')",
    {
      useContentScriptContext: true,
    }
  );
}

function updateList(listid, list, func) {
  let listElem = document.getElementById(listid);

  listElem.textContent = "";
  list.forEach((item, i) => {
    let lineElem = document.createElement("div");
    let buttonElem = document.createElement("div");
    buttonElem.className = "deletebutton";
    buttonElem.textContent = "X";
    buttonElem.addEventListener("click", () => {
      func(i);
    });
    let entryElem = document.createElement("div");
    entryElem.className = "listentry";
    entryElem.textContent = item;
    lineElem.appendChild(buttonElem);
    lineElem.appendChild(entryElem);
    listElem.appendChild(lineElem);
  });
}

function addIdListItem() {
  let elem = document.getElementById("id_filter_value");
  idFilter.push(elem.value.trim());
  elem.value = "";
  updateList("id_filter_list", idFilter, deleteIdListItem);
}
function deleteIdListItem(index) {
  idFilter.splice(index, 1);
  updateList("id_filter_list", idFilter, deleteIdListItem);
}

function addClassListItem() {
  let elem = document.getElementById("class_filter_value");
  classFilter.push(elem.value.trim());
  elem.value = "";
  updateList("class_filter_list", classFilter, deleteClassListItem);
}
function deleteClassListItem(index) {
  classFilter.splice(index, 1);
  updateList("class_filter_list", classFilter, deleteClassListItem);
}

function addTagListItem() {
  let elem = document.getElementById("tag_filter_value");
  tagFilter.push(elem.value.trim());
  elem.value = "";
  updateList("tag_filter_list", tagFilter, deleteTagListItem);
}
function deleteTagListItem(index) {
  tagFilter.splice(index, 1);
  updateList("tag_filter_list", tagFilter, deleteTagListItem);
}

function addCustomListItem() {
  let nameElem = document.getElementById("custom_filter_name");
  let valueElem = document.getElementById("custom_filter_value");
  let name = nameElem.value.trim();
  let value = valueElem.value.trim();
  if (value === "") {
    value = "*";
  }
  customFilter.push('"' + name + '" = "' + value + '"');
  nameElem.value = "";
  valueElem.value = "";
  updateList("custom_filter_list", customFilter, deleteCustomListItem);
}
function deleteCustomListItem(index) {
  customFilter.splice(index, 1);
  updateList("custom_filter_list", customFilter, deleteCustomListItem);
}

function hideDiv(name) {
  document.getElementById(name).style.display = "none";
}
function unHideDiv(name) {
  document.getElementById(name).style.display = "inline";
}

function clickEnableIdCheckbox() {
  if (this.checked) {
    unHideDiv("id_filter_pane");
    idEnabled = true;
  } else {
    hideDiv("id_filter_pane");
    idEnabled = false;
  }
}

function clickEnableClassCheckbox() {
  if (this.checked) {
    unHideDiv("class_filter_pane");
    classEnabled = true;
  } else {
    hideDiv("class_filter_pane");
    classEnabled = false;
  }
}

function clickEnableTagCheckbox() {
  if (this.checked) {
    unHideDiv("tag_filter_pane");
    tagEnabled = true;
  } else {
    hideDiv("tag_filter_pane");
    tagEnabled = false;
  }
}

function clickEnableCustomCheckbox() {
  if (this.checked) {
    unHideDiv("custom_filter_pane");
    customEnabled = true;
  } else {
    hideDiv("custom_filter_pane");
    customEnabled = false;
  }
}

function changeSeedMinLength() {
  seedMinLength = Number(this.value);
}
function changeOptimizedMinLength() {
  optimizedMinLength = Number(this.value);
}
function changeThreshhold() {
  threshhold = Number(this.value);
}
function changeMaxNumTries() {
  maxNumberOfTries = Number(this.value);
}

// Add all event listeners
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("generate_button")
    .addEventListener("click", regenerate);

  document
    .getElementById("field_seed_min_length")
    .addEventListener("input", changeSeedMinLength);
  document
    .getElementById("field_opt_min_length")
    .addEventListener("input", changeOptimizedMinLength);
  document
    .getElementById("field_threshhold")
    .addEventListener("input", changeThreshhold);
  document
    .getElementById("field_max_num_tries")
    .addEventListener("input", changeMaxNumTries);

  document
    .getElementById("enable_id")
    .addEventListener("click", clickEnableIdCheckbox);
  document
    .getElementById("enable_class")
    .addEventListener("click", clickEnableClassCheckbox);
  document
    .getElementById("enable_tag")
    .addEventListener("click", clickEnableTagCheckbox);
  document
    .getElementById("enable_custom")
    .addEventListener("click", clickEnableCustomCheckbox);

  document
    .getElementById("id_filter_add_button")
    .addEventListener("click", addIdListItem);
  document
    .getElementById("class_filter_add_button")
    .addEventListener("click", addClassListItem);
  document
    .getElementById("tag_filter_add_button")
    .addEventListener("click", addTagListItem);
  document
    .getElementById("custom_filter_add_button")
    .addEventListener("click", addCustomListItem);

  initialize();
});
