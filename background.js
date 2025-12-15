chrome.runtime.onMessage.addListener((message,sender, sendResponse)=>{
    if (message.target == "BACKGROUND" && message.content == "START_AUTHENTICATION") Initialize_Authentication();
    if (message.target == "BACKGROUND" && message.content == "AUTHENTICATION_COMPLETED") Process_Auth_Complete(message);
    if (message.target == "BACKGROUND" && message.content == "CHECK_AUTH_STATE") Check_Auth_State_Persistence();
})

chrome.sidePanel
.setPanelBehavior({ openPanelOnActionClick: true })
.catch((error) => console.error(error));

async function offscreen_exists()
{
    const isthere = await chrome.runtime.getContexts({
        contextTypes: ['OFFSCREEN_DOCUMENT'], 
        documentUrls: [chrome.runtime.getURL('offscreen.html')]
    })
    return (isthere.length > 0)? true : false
}
async function create_offscreen()
{
    const pr = new Promise(async (resolve, reject)=>{
        const res = chrome.offscreen.createDocument({
            url: 'offscreen.html',
            reasons: ['DOM_PARSER'],
            justification: "social authentication"
        })
        .then(async ()=>{resolve(true);console.log("offscreen created")}).catch((e)=>{reject(false); console.log("offscreen not created",e)})
    })
    return await pr
}
async function Initialize_Authentication()
{
    const pr = new Promise(async (resolve, reject)=>{
        if (await offscreen_exists())
        {
            reject(false)
        }
        else
        {
            await create_offscreen()
            resolve(true)
        }
    })
    return await pr
}
async function Process_Auth_Complete(message, sendResponse)
{
    // console.log("messagesend", message)
    chrome.offscreen.closeDocument();
    console.log(message)
    if (message.error) {
        chrome.runtime.sendMessage({target: "POPUP", content: "AUTH_FAILED"})
        return
    };

    const userObj = {
        user: {
            fullname: message.user.displayName,
            mail: message.user.email,
            photoURL: message.user.photoURL,
        },
        uid: message.user.uid,
        idToken: message._tokenResponse.idToken,
        refreshToken: message._tokenResponse.refreshToken,
        authProvider: message._tokenResponse.providerId
    }
    console.log(message._tokenResponse)

    chrome.storage.local.set(userObj)
    chrome.runtime.sendMessage({target: "POPUP", content: "AUTH_SUCCESS", user: userObj})
}
async function updateUIAuth(_data) {
}
