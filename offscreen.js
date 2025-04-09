import { initializeApp } from "firebase/app"
import {fire_config} from './firebase.config'
import {  } from "firebase/auth"

chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
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
    const body = document.querySelector('#body')
    const iframe = document.createElement('iframe')
    iframe.setAttribute('src', 'http://localhost:5500/signin.html')
    body.append(iframe)

    globalThis.addEventListener('message', ({data})=>{    
        if (data.startsWith('!_{')) return;
        data = JSON.parse(data)
        data.target = "BACKGROUND"
        console.log(data)
        chrome.runtime.sendMessage(data)
    }, false)
}
async function check_auth_state() {
    initializeApp(fire_config)
    const auth = getAuth()
    console.log(auth.currentUser)
}