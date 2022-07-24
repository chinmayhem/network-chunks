import {write} from './storageService';

let originToUrls = new Map<string, Set<string>>();

console.log('background loaded');

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if(request) {
        if (request.type == "CLEAR") {
            originToUrls.set(request.payload.origin, new Set())
            await write([], request.payload.origin);
            sendResponse({ type: 'CLEAR_SUCCESSFUL' });
            console.log('--------CLEARED--------');
        } else if(request.type == "INITIALISE"){
            originToUrls.set(request.payload.origin, new Set())
        }
    }
});

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        const result = details.url.match(/_next\/static\/chunks\/([a-zA-Z-]*)\./)?.[1];
        const origin = (details.initiator || 'INITIATOR');
        const urls = originToUrls.get(origin);
        if(result && urls) {
            console.log(result);
            urls.add(result);
            write([...urls], origin);
        }
    },
    {urls: ["*://*.sprinklr.com/*"]}
);


export {};