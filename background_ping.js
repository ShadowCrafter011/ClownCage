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

    let num_tabs = 0;
    let visible_tabs = 0;
    let active = false;
    for (let tab of tabs) {
        try {
            let extension_status = await chrome.tabs.sendMessage(tab.id, { query_tab_status: true });
            num_tabs++;
            visible_tabs += extension_status.visible;
            if (extension_status.focused) active = true;
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
            visible_tabs: visible_tabs,
            has_active: active
        })
    }
    socket.send(JSON.stringify(ping_request));
}
