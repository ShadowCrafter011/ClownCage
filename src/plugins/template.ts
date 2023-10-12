import { Plugin } from "./plugin";

// Make sure class name is unique!
// And don't forget to add a new instance of the class to the instances array in index.ts
export class TemplatePlugin extends Plugin {
    constructor() {
        super(0); // Replace number with action ID. List of IDs found here: https://salbot.ch/admin/idlist
    }

    register(data: any): boolean {
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

    // Optionally you can override the revoke method
    // revoke(): boolean {
    //     return true;
    // }
}