const { origin } = new URL(window.location.toString());

function initialiseBgScript(){  
  chrome.runtime.sendMessage({ type: "INITIALISE", payload: { origin } });
}

const main = () => {
  console.log('Network Chunks content.ts Main');
  initialiseBgScript();
};

window.addEventListener("beforeunload", () => {
  // chrome.runtime.sendMessage({ type: "CLEAR", payload: { host }});
}, {capture: true});

main();

export {}