chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
    if (request.query_hidden_status) {
        sendResponse({ hidden: document.hidden });
    } else if (request.query_extension) {
        sendResponse({ extension_active: true });
    }
});
