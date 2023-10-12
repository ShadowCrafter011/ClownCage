import { Command } from "./commands/command";
import { Plugin } from "./plugins/plugin";
import command_instances from "./commands/index";
import plugin_instances from "./plugins/index";

export class ActionHandler {
    commands: { [key: number]: Command };
    plugins: { [key: number]: Plugin };

    constructor(public context: string) {
        this.commands = {};
        this.plugins = {};

        for (let command of command_instances) {
            this.commands[command.id] = command;
        }

        for (let plugin of plugin_instances) {
            this.plugins[plugin.id] = plugin;
        }
    }

    handle(message: any): boolean {
        if (message.context != this.context) return false;
        const data: any = message.data;
        
        switch (message.type) {
            case "dispatched":
                if (message.id in this.commands) {
                    let command = this.commands[message.id];
                    if (!command.setup(data)) return true;
                    command.execute(data);
                    return true;
                }
                break;

            case "plugin":
                if (message.id in this.plugins) {
                    return this.plugins[message.id].register(data);
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
}
