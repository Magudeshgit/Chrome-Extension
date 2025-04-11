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
        chrome.offscreen.createDocument({
            url: 'offscreen.html',
            reasons: ['DOM_PARSER'],
            justification: "social authentication"
        }).then(()=>{resolve(true);console.log("GOOD")}).catch(()=>{reject(false); console.log("BAD")})
    })
    return await pr
}
async function Initialize_Authentication()
{
    const pr = new Promise(async (resolve, reject)=>{
        if (await offscreen_exists())
        {
            console.log("BAD")
            reject(false)
        }
        else
        {
            console.log("STARTING")
            await create_offscreen()
            await chrome.runtime.sendMessage({"content": "START_AUTHENTICATION", "target": "OFFSCREEN"})   
            resolve(true)
        }
    })
    return await pr
}
async function Process_Auth_Complete(message, sendResponse)
{
    console.log("messagesend", message)
    const userObj = {
        user: {
            fullname: message.user.displayName,
            mail: message.user.email,
            photoURL: message.user.photoURL,
        },
        uid: message.user.uid,
        idToken: message._tokenResponse.idToken,
        authProvider: message._tokenResponse.providerId
    }

    chrome.storage.local.set(userObj)
    chrome.offscreen.closeDocument();
    updateUIAuth(userObj)
}

async function Check_Auth_State_Persistence()
{
    chrome.storage.local.get('user', async (response)=>{
         console.log(response)
        if (response.user)
        {
            // Success Flow
            console.log("Y",response)
            updateUIAuth(response)
        }
        else
        {
            console.log("N")
            const po = await Initialize_Authentication()
            console.log(po)
        }
    })
}

async function updateUIAuth(_data) {
    chrome.runtime.sendMessage({target: "POPUP", content: "USER", data: _data})
}
