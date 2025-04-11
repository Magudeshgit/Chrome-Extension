// chrome.extension.getBackgroundPage().Initialize_Authentication()
chrome.runtime.sendMessage({target: "BACKGROUND", content: "CHECK_AUTH_STATE"})
chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if (message.target == 'POPUP' && message.content == "USER") process_user_info(message.data.user)
})
function process_user_info(user)
{
    document.querySelector('.info').innerText = user.fullname
}