const main = () => {
  console.log('Network Chunks content.ts Main');
};

window.addEventListener("beforeunload", () => {
  chrome.runtime.sendMessage({ type: "CLEAR" });
}, {capture: true});

main();

export {}