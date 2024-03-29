import { ActionHandler } from "./action_handler";

export class Salbot {
    websocket: WebSocket | null;
    message_callbacks: Function[];
    open_callbacks: Function[];
    action_handler: ActionHandler;
    ping_interval: NodeJS.Timeout | null;

    constructor(action_handler: ActionHandler) {
        try {
            this.websocket = new WebSocket("wss://salbot.ch/cable");
        } catch (e) {
            this.websocket = null;
        }
        this.message_callbacks = [];
        this.open_callbacks = [];
        this.action_handler = action_handler;
        this.ping_interval = null;

        if (!this.websocket) return;

        this.websocket.onopen = async () => {
            await this.setup();

            this.ping();
            this.ping_interval = setInterval(this.ping.bind(this), 1000);

            for (let callback of this.open_callbacks) {
                callback();
            }
        };

        this.websocket.onmessage = async (event: any) => {
            const data = JSON.parse(event.data);
            if (data.type == "ping") return;

            const message = data.message;
            if (!message) return;

            if (message.type == "change_uuid") {
                await chrome.storage.sync.set({uuid: message.uuid});
                await this.setup();
                await this.ping();
            } else {
                try {
                    action_handler.handle(message);

                    if (message.callback_uuid) {
                        this.executed_action(message.callback_uuid);
                    }
                } catch (e) {
                    this.error_happened(message.callback_uuid);
                }
            }

            for (let callback of this.message_callbacks) {
                callback(message);
            }
        };
    }

    close(): void {
        if (this.ping_interval) clearInterval(this.ping_interval);
    }

    get socket(): WebSocket | null {
        return this.websocket;
    }

    async uuid(): Promise<String> {
        const uuid_container = await chrome.storage.sync.get(["uuid"]);
        return uuid_container.uuid;
    }

    onmessage(func: (message: object) => void): void {
        this.message_callbacks.push(func);
    }

    onopen(func: () => void): void {
        this.open_callbacks.push(func);
    }

    executed_action(callback_uuid: string) {
        this.send(JSON.stringify({
            command: "message",
            identifier: JSON.stringify({
                channel: "ConsumerChannel"
            }),
            data: JSON.stringify({
                action: "executed_action",
                callback_uuid: callback_uuid
            })
        }));
    }

    error_happened(callback_uuid: string) {
        this.send(JSON.stringify({
            command: "message",
            identifier: JSON.stringify({
                channel: "ConsumerChannel"
            }),
            data: JSON.stringify({
                action: "error",
                callback_uuid: callback_uuid
            })
        }))
    }

    async ping(): Promise<void> {
        // Works with Chrome version 118.0.5993.89 (Offizieller Build) (64-Bit) (cohort: Stable) 
        let uuid = await this.uuid();

        if (!uuid) return;

        let tabs: chrome.tabs.Tab[] = await chrome.tabs.query({});

        let num_tabs: number = 0;
        let visible_tabs: number = 0;
        let active: boolean = false;
        for (let tab of tabs) {
            if (!tab.id) return;

            try {
                let extension_status = await chrome.tabs.sendMessage(tab.id, { query_tab_status: true });
                num_tabs++;
                // @ts-ignore
                visible_tabs += extension_status.visible;
                // @ts-ignore
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
        this.send(JSON.stringify(ping_request));
    }

    async setup(): Promise<void> {
        const subscribe_request = {
            command: "subscribe",
            identifier: JSON.stringify({
                channel: "ConsumerChannel"
            })
        }
        this.send(JSON.stringify(subscribe_request));

        const identify_request = {
            command: "message",
            identifier: JSON.stringify({
                channel: "ConsumerChannel"
            }),
            data: JSON.stringify({
                action: "identify",
                uuid: await this.uuid()
            })
        }
        this.send(JSON.stringify(identify_request));
    }

    async send(message: string): Promise<void> {
        if (!this.websocket) return;

        try {
            if (this.websocket.readyState === WebSocket.OPEN) {
                this.websocket.send(message);
            }
        } catch (e) {}
    }
}