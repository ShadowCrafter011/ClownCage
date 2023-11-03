import { Plugin } from "./plugin";

export class ChangeUrlPlugin extends Plugin {
    constructor() {
        super(1006); // Replace number with action ID. List of IDs found here: https://salbot.ch/admin/idlist
    }

    register(data: {
        visible: boolean,
        focused: false,
        probability: number,
        interval: number,
        links: { key: string[] }
    }): boolean {
        var change_url_data: {
            self: ChangeUrlPlugin
            urls: string[]
            probability: number
        } = {
            self: this,
            urls: [],
            probability: data.probability,
        }

        change_url_data.urls = this.filter_object_by_href(data.links);

        var self = this;
        let interval_id = setInterval(function() { self.change_url_plugin(change_url_data) }, data.interval);
        this.registered_intervals.push(interval_id);

        return true;
    }

    change_url_plugin(data: {
        self: ChangeUrlPlugin
        urls: string[]
        probability: number
    }) {
        if (Math.random() > data.probability) return;

        this.change_url(data.urls);
    }

    // Optionally you can override the revoke method
    // revoke(): boolean {
    //     return true;
    // }
}