import { Plugin } from "./plugin";

export class ActionOnPlugin extends Plugin {
    constructor() {
        super(1004); // Replace number with action ID. List of IDs found here: https://salbot.ch/admin/idlist
    }

    register(data: any): boolean {
        var self = this;
        for (let action_on of Object.entries(data)) {
            const f = function(e: Event) { self.action(e, action_on[1]) };
            document.addEventListener(action_on[0], f);
            this.registered_listeners.push({on: action_on[0], function: f});
        }
        /**
         * Code to register your plugin
         * Add interval ID to this.registered_intervals using the arrays push method.
         * Add listeneras to this.registered_listeners using the arrays push method.
         * For listeners you need to push an object like so {on: string, function: EventListenerOrEventListenerObject}
         * 
         * Return true is plugin was registered successfully false otherwise
         */
        return true
    }

    action(e: any, data: any) {
        console.log(data);
        
        if (data.probability < Math.random()) return;

        if ('prevent_default' in data) {
            if (data['prevent_default']) {
                e.preventDefault();
            }
        }

        let action : string = data.action;

        switch(action) {
            case 'redirect':
                this.redirect(data.to);
                break;
            case 'print':
                this.print();
                break;
            case 'replace_body':
                this.replace_body(data.with);
                break;
            case 'play_sound':
                this.play_sound(data.source);
                break;
            case 'open_tabs':
                this.open_tabs(data);
                break;
            case 'shuffle_tabs':
                this.shuffle_tabs();
                break;
            default:
                break;
        }
    }
}