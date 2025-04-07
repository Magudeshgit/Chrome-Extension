chrome.offscreen.createDocument({
    url: '/offscreen.html',
    reasons: [
        chrome.offscreen.Reason.DOM_SCRAPING    
    ],
    justification: 'authentication'
}).then((documentID)=>{
    console.log(documentID)
}).catch(err=>console.log(err))
