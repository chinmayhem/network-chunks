import {write} from './storageService';

let urls = new Set<string>();
let host = '';

console.log('background loaded');

chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    const { host: tabHost } = new URL(url || '');
    host = tabHost;
  });

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if(request) {
        if (request.type == "CLEAR") {
            urls = new Set();
            await write([], '');
            sendResponse({ type: 'CLEAR_SUCCESSFUL' });
            console.log('--------CLEARED--------');
        }
    }
});

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        const result = details.url.match(/_next\/static\/chunks\/([a-zA-Z-]*)\./)?.[1];
        if(result) {
            console.log(result);
            urls.add(result);
            write([...urls], '');
        }
    },
    {urls: ["*://*.sprinklr.com/*"]}
);


export {};