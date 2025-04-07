chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{    
    if (message.target == 'OFFSCREEN' && message.content == 'START_AUTHENTICATION')
    {
        invoke_security()
    }
})

async function invoke_security() {
    const body = document.querySelector('#body')
    const iframe = document.createElement('iframe')
    iframe.setAttribute('src', 'http://localhost:5500/signin.html')
    body.append(iframe)
}