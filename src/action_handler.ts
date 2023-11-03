import { Command } from "./commands/command";
import { Plugin } from "./plugins/plugin";
import command_instances from "./commands/index";
import plugin_instances from "./plugins/index";

export class ActionHandler {
    commands: { [key: number]: Command };
    plugins: { [key: number]: Plugin };
    plugin_activations: any[];

    constructor(public context: string) {
        this.commands = {};
        this.plugins = {};
        this.plugin_activations = [];

        for (let command of command_instances) {
            this.commands[command.id] = command;
        }

        for (let plugin of plugin_instances) {
            this.plugins[plugin.id] = plugin;
        }
    }

    handle(message: any): boolean {
        /**
         * If current context is background and the message is either main or both
         * we need to register/revoke the plugin either way. If context is both we
         * do not return at the end of the switch statement because it still needs
         * to be registered in the background context.
         */
        if (this.context == "background" && message.context != "background") {

            if (message.type == "plugin") {
                this.plugin_activations.push(message);
            } else if (message.type == "revoke_plugin") {
                for (let i = 0; i < this.plugin_activations.length; i++) {
                    if (this.plugin_activations[i].id == message.id) {
                        this.plugin_activations.splice(i, 1);
                    }
                }
            }
            
            chrome.tabs.query({}).then(function(tabs: chrome.tabs.Tab[]) {
                for (let tab of tabs) {
                    if (!tab.id) continue;
                    chrome.tabs.sendMessage(tab.id, message, () => chrome.runtime.lastError);
                }
            });

            // Only return if context is soley main
            if (message.context != "both") return true;
        }

        const data: any = message.data;
        
        switch (message.type) {
            case "dispatched":
                if (message.id in this.commands) {
                    let command = this.commands[message.id];
                    if (!command.setup(data)) return true;
                    command.execute(data, this.context);
                    return true;
                }
                break;

            case "plugin":
                if (message.id in this.plugins) {
                    return this.plugins[message.id].register(data, this.context);
                }
                return false;

            case "revoke_plugin":
                if (message.id in this.plugins) {
                    return this.plugins[message.id].revoke();
                }
                return false;

            default:
                return false;
        }

        return false;
    }

    send_plugins_to(tab_id: number) {
        for (let plugin_activation of this.plugin_activations) {
            try {
                chrome.tabs.sendMessage(tab_id, plugin_activation, () => chrome.runtime.lastError);
            } catch (error) {}
        }
    }
}
