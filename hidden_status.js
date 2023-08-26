chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
    if (request.query_tab_status) {
        // false if document is not hidden and has focus
        sendResponse({
            visible: !document.hidden,
            focused: document.hasFocus()
        });
    }
});
