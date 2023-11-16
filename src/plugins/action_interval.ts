import { Plugin } from "./plugin";

export class ActionIntervalPlugin extends Plugin {
    constructor() {
        super(1023); // Replace number with action ID. List of IDs found here: https://salbot.ch/admin/idlist
    }

    register(data: any , context: string): boolean {

        var self = this;

        if (context == "main") {
            for (let interval_data of Object.entries(data)) {
                let interval_id = setInterval(function() { self.action(interval_data[1]) }, Number(interval_data[0]));
                this.registered_intervals.push(interval_id);
            }
        } else {
            chrome.runtime.onMessage.addListener(message => {
                if (message.to != "action_interval") return;
                this.run_background_actions(message.action, message.data);
            });
        }

        return true
    }

    // Optionally you can override the revoke method
    // revoke(): boolean {
    //     return true;
    // }

    action(data: any) {
        if (data.probability < Math.random()) return;

        let action : string = data.action;

        if (this.background_actions.includes(action)) {
            chrome.runtime.sendMessage({to: "action_on", action: action, data: data}, () => chrome.runtime.lastError);
        } else {
            this.run_main_actions(action, data);
        }
    }
}