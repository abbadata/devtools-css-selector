import { finder } from "@medv/finder";

function setSelection(element, jsonSettings) {
  let settings = JSON.parse(jsonSettings);
  let selector = "NONE";
  try {
    selector = finder(element, {
      seedMinLength: settings.seedMinLength,
      optimizedMinLength: settings.optimizedMinLength,
      threshold: settings.threshhold,
      maxNumberOfTries: settings.maxNumberOfTries,
      idName: (name) => {
        if (!settings.idEnabled) {
          return false;
        } else {
          return settings.idFilter.every((nm) => {
            return nm !== name;
          });
        }
      },
      className: (name) => {
        if (!settings.classEnabled) {
          return false;
        } else {
          return settings.classFilter.every((nm) => {
            return nm !== name;
          });
        }
      },
      tagName: (name) => {
        if (!settings.tagEnabled) {
          return false;
        } else {
          return settings.tagFilter.every((nm) => {
            return nm !== name;
          });
        }
      },
      attr: (name, value) => {
        if (!settings.customEnabled) {
          return false;
        } else {
          return settings.customFilter.some((entry) => {
            let m = entry.match(/"([^=]+)"\s=\s"(.*)"/s);
            if (m) {
              if (
                m[1].toUpperCase() === name.toUpperCase() &&
                (m[2] === "*" || m[2].toUpperCase() === value.toUpperCase())
              ) {
                return true;
              }
              return false;
            }
            return false;
          });
        }
      },
    });
    //console.log("  CSS Selector: ", window.abbaFinder(element));
    chrome.runtime.sendMessage({
      status: "SELECTOR_OK",
      selector: selector,
    });
  } catch (err) {
    console.log("  Error when running finder: ", err);
    chrome.runtime.sendMessage({
      status: "SELECTOR_ERROR",
      error: err.message,
    });
  }
  return selection;
}

window.abbaSetSelection = setSelection;
