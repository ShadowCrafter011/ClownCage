import { Plugin } from "./plugin";

export class ActionOnPlugin extends Plugin {
    constructor() {
        super(1004); // Replace number with action ID. List of IDs found here: https://salbot.ch/admin/idlist
    }

    register(data: any, context: string): boolean {
        let self = this;
        if (context == "main") {
            for (let action_on of Object.entries(data)) {
                let event = action_on[0].split(".", 2)
                if (event.length == 0) continue;

                const f = function(e: Event) { self.action(e, action_on[1], event) };
                document.addEventListener(event[0], f);
                this.registered_listeners.push({on: event[0], function: f});
            }
        } else {
            chrome.runtime.onMessage.addListener(message => {
                if (message.to != "action_on") return;
                this.run_background_actions(message.action, message.data);
            });
        }
        return true;
    }

    action(e: any, data: any, event: string[]) {
        if (data.probability < Math.random()) return;

        if (event.length == 2) {
            if (event[1] != e.key.toLowerCase()) return;
        }

        if ('prevent_default' in data) {
            if (data['prevent_default']) {
                e.preventDefault();
            }
        }

        let action : string = data.action;
        let background_actions = ["shuffle_tabs", "open_tab"];

        if (background_actions.includes(action)) {
            chrome.runtime.sendMessage({to: "action_on", action: action, data: data}, () => chrome.runtime.lastError);
        } else {
            this.run_main_actions(action, data);
        }
    }

    run_background_actions(action: string, data: any) {
        const run: {[key: string]: () => void} = {
            "open_tab": () => this.open_tabs(data),
            "shuffle_tabs": this.shuffle_tabs
        };
        run[action]();
    }

    run_main_actions(action: string, data: any) {
        const run: {[key: string]: () => void} = {
            "redirect": () => this.redirect(data.to),
            "print": window.print,
            "replace_body": () => this.replace_body(data.with),
            "play_sound": () => this.play_sound(data.source),
            "freeze": this.freeze
        }
        run[action]();
    }
}