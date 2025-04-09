chrome.runtime.onMessage.addListener((message,sender)=>{
    if (message.target == "BACKGROUND" && message.content == "START_AUTHENTICATION") Initialize_Authentication();
    if (message.target == "BACKGROUND" && message.content == "AUTHENTICATION_COMPLETED") Process_Auth_Complete(message);
    if (message.target == "BACKGROUND" && message.content == "CHECK_AUTH_STATE") Check_Auth_State_Persistence();
})

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
    const createdoc = await chrome.offscreen.createDocument({
        url: 'offscreen.html',
        reasons: ['DOM_PARSER'],
        justification: "social authentication"
    })
    return await createdoc
}
async function Initialize_Authentication()
{
    console.log("STARTING AUTH")
    if (await offscreen_exists())
    {
        return
    }
    else
    {
        await create_offscreen()
        const iniitiaiting_auth = await chrome.runtime.sendMessage({"content": "START_AUTHENTICATION", "target": "OFFSCREEN"})   

    }
}
async function Process_Auth_Complete(message, sendResponse)
{
    console.log("messagesend", message)
    message.target = "POPUP"
    chrome.offscreen.closeDocument();
    chrome.runtime.sendMessage(message)
}

async function Check_Auth_State_Persistence()
{
    if (!(await offscreen_exists()))
    {
        await create_offscreen()
    }
    chrome.runtime.sendMessage({target: "OFFSCREEN", content: "CHECK_AUTH_STATE"})
}
