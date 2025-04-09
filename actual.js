// chrome.extension.getBackgroundPage().Initialize_Authentication()
chrome.runtime.sendMessage({target: "BACKGROUND", "content": "CHECK_AUTH_STATE"}).then(e=>console.log("HOLA", e))
chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    console.log(message)
    if (message.target !== "POPUP") return;
    console.log("BLAH", message)
})