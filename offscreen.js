import { initializeApp } from "firebase/app"
import {fire_config} from './firebase.config'
import {  } from "firebase/auth"

chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    console.log(message)
    if (message.target == 'OFFSCREEN' && message.content == 'START_AUTHENTICATION')
    {
        invoke_security(sendResponse)
    }
    else if(message.target == 'OFFSCREEN' && message.content == 'CHECK_AUTH_STATE')
    {
        check_auth_state()
    }
})

async function invoke_security(sendResponse) {
    console.log("INITIATING")
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
async function check_auth_state() {
    console.log("Checking")
}