const socket = new WebSocket("wss://salbot.ch/cable");

const action_handler = new ActionHandler();

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

    const identify_request = {
        command: "message",
        identifier: JSON.stringify({
            channel: "ConsumerChannel"
        }),
        data: JSON.stringify({
            action: "identify",
            uuid: uuid_container.uuid
        })
    }
    socket.send(JSON.stringify(identify_request));
};


socket.onmessage = async event => {
    const data = JSON.parse(event.data);
    if (data.type == "ping") return;
    const message = data.message;
    if (!message) return;
    // console.log(`Start ${JSON.stringify(message)}`)

    switch (message.type) {
        case "change_uuid":
            await chrome.storage.sync.set({ uuid: message.uuid });
            break;

        case "dispatched":
            //try {
                socket.send(JSON.stringify({
                    command: "message",
                    identifier: JSON.stringify({
                        channel: "ConsumerChannel"
                    }),
                    data: JSON.stringify({
                        action: "executed_action",
                        callback_uuid: message.callback_uuid
                    })
                }));

                action_handler.execute_command(message.id, message.data);
            /*} catch(error) {
                socket.send(JSON.stringify({
                    command: "message",
                    identifier: JSON.stringify({
                        channel: "ConsumerChannel"
                    }),
                    data: JSON.stringify({
                        action: "error",
                        callback_uuid: message.callback_uuid
                    })
                }))
            }*/
            break;

        case "plugin": case "revoke_plugin":
            handle_plugin(message);
            break;

        default:
            break;
    }
};
