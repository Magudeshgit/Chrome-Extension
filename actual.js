// chrome.extension.getBackgroundPage().Initialize_Authentication()
chrome.runtime.sendMessage({target: "BACKGROUND", "content": "START_AUTHENTICATION"})