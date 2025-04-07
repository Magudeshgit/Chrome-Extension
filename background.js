chrome.runtime.onMessage.addListener((message,sender,sendResponse)=>{
    if (message.target == "BACKGROUND" && message.content == "START_AUTHENTICATION") Initialize_Authentication();
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
        // const doc = 
        console.log("holaa", await create_offscreen())
        chrome.runtime.sendMessage({"content": "START_AUTHENTICATION", "target": "OFFSCREEN"})

    }
}
