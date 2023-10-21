import { Plugin } from "./plugin";

export class CancelEvents extends Plugin {
    cancel_probability: any;

    constructor() {
        super(1001);
        this.cancel_probability = {};
    }

    register(data: any): boolean {
        var self = this;
        const f = function(e: Event) { self.cancel_event(e, self.cancel_probability) }
        for (let cancel_data of Object.entries(data)) {
            this.cancel_probability[cancel_data[0]] = cancel_data[1];
            document.addEventListener(cancel_data[0], f);
            this.registered_listeners.push({on: cancel_data[0], function: f});
        }
        return true
    }

    cancel_event(e: Event, cancel_probability: any) {
        if (e.type in cancel_probability && Math.random() < cancel_probability[e.type]) {
            e.preventDefault();
        }
    }
}