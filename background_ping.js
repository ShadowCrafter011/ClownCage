// Activate service worker on chrome startup
chrome.runtime.onStartup.addListener(() => {});

const socket = new WebSocket("wss://salbot.ch/cable");

let uuid_container = null;

socket.onopen = () => {
    const subscribe_request = {
        command: "subscribe",
        identifier: JSON.stringify({
            channel: "ConsumerChannel"
        })
    }
    socket.send(JSON.stringify(subscribe_request));

    ping();
};

socket.onmessage = async event => {
    const data = JSON.parse(event.data);
    if (data.type == "ping") return;
    const message = data.message;
    if (!message) return;
    if (message.type != "change_uuid") return;

    await chrome.storage.sync.set({ uuid: message.uuid });
};

function ping() {
    if (socket) ping_core();

    const pingIntervalId = setInterval(async () => {
        if (!socket) {
            clearInterval(pingIntervalId);
            return;
        }

        ping_core();
    }, 3000);
}

async function ping_core() {
    uuid_container = await chrome.storage.sync.get(["uuid"]);

    let uuid = uuid_container.uuid;
    if (!uuid) return;
    
    let tabs = await chrome.tabs.query({});
    let [active_tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    let hidden_status = { hidden: true }

    try {
        hidden_status = await chrome.tabs.sendMessage(active_tab.id, { query_hidden_status: true });
    } catch (error) {}

    let num_tabs = 0;
    for (let tab of tabs) {
        try {
            let extension_status = await chrome.tabs.sendMessage(tab.id, { query_extension: true });
            if (extension_status.extension_active) {
                num_tabs++;
            }
        } catch (error) {}
    }

    const ping_request = {
        command: "message",
        identifier: JSON.stringify({
            channel: "ConsumerChannel"
        }),
        data: JSON.stringify({
            action: "ping",
            uuid: uuid,
            num_tabs: num_tabs,
            has_active: !hidden_status.hidden
        })
    }
    socket.send(JSON.stringify(ping_request));
}
