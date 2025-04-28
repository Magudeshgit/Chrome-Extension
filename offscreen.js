async function invoke_security(sendResponse) {
    const body = document.querySelector('#body')
    const iframe = document.createElement('iframe')
    iframe.setAttribute('src', 'http://localhost:5500/signin.html')
    body.append(iframe)

    // Handle Message from IFRAME and send to BG
    globalThis.addEventListener('message', ({data})=>{    
        if (data.startsWith('!_{')) return;
        data = JSON.parse(data)
        data.target = "BACKGROUND"
        chrome.runtime.sendMessage(data)
    }, false)
}
invoke_security()