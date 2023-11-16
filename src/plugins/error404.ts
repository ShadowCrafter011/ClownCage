import { Plugin } from "./plugin";

export class Error404Plugin extends Plugin {
    constructor() {
        super(1024); // Replace number with action ID. List of IDs found here: https://salbot.ch/admin/idlist
    }

    register(data: any): boolean {

        var self = this;
        let interval_id = setInterval(function() { self.error404() }, data.interval);
        this.registered_intervals.push(interval_id);

        return true;
    }

    // Optionally you can override the revoke method
    // revoke(): boolean {
    //     return true;
    // }
}