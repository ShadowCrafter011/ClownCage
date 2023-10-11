class ActionHandler {
    static derived = new Set();

    constructor() {
        this.commands = {};
        this.plugins = {};

        for (let action of ActionHandler.derived) {
            let action_type = Object.getPrototypeOf(action).name;
            let instantiated_action = new action();

            if (action_type == "Command") {
                this.commands[instantiated_action.id] = instantiated_action;
                continue;
            }

            this.plugins[instantiated_action.id] = instantiated_action;
        }
    }

    execute_command(id, data) {
        if (id in this.commands) {
            let command = this.commands[id];
            if (!command.setup(data)) return true;
            command.execute(data);
            return true;
        }
        return false;
    }

    register_plugin() {

    }

    revoke_plugin() {

    }
}