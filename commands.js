const socket = new WebSocket("wss://salbot.ch/cable");

socket.onopen = async () => {
    const subscribe_request = {
        command: "subscribe",
        identifier: JSON.stringify({
            channel: "ConsumerChannel"
        })
    }
    socket.send(JSON.stringify(subscribe_request));

    // TODO: Remove as it's only for testing
    // await chrome.storage.sync.clear();

    let uuid_container = await chrome.storage.sync.get(["uuid"]);

    // Request a UUID if one isn't stored yet
    if (!uuid_container.uuid) {
        const get_uuid_request = {
            command: "message",
            identifier: JSON.stringify({
                channel: "ConsumerChannel"
            }),
            data: JSON.stringify({
                action: "create_consumer"
            })
        }
        socket.send(JSON.stringify(get_uuid_request));
    } else {
        identify(uuid_container.uuid);
    }
};


socket.onmessage = async event => {
    const data = JSON.parse(event.data);
    if (data.type == "ping") return;
    const message = data.message;
    if (message == null) return;

    switch (message.type) {
        case "uuid_payload":
            await chrome.storage.sync.set({ uuid: message.uuid });
            identify(message.uuid);
            break;
    }
};


function ping(uuid) {
    const ping_request = {
        command: "message",
        identifier: JSON.stringify({
            channel: "ConsumerChannel"
        }),
        data: JSON.stringify({
            action: "ping",
            uuid: uuid,
            active: !document.hidden
        })
    }
    socket.send(JSON.stringify(ping_request));
}


function identify(uuid) {
    // Fail safe incase uuid somehow is null
    if (!uuid) return;

    const identify_request = {
        command: "message",
        identifier: JSON.stringify({
            channel: "ConsumerChannel"
        }),
        data: JSON.stringify({
            action: "identify",
            uuid: uuid
        })
    }
    socket.send(JSON.stringify(identify_request));

    // Start sending pings to the server to update online status
    ping(uuid);
    setInterval(() => ping(uuid), 5000);
}
