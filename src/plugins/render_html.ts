import { Plugin } from "./plugin";
import $ from "jquery";

export class RenderHTMLPlugin extends Plugin {
    constructor() {
        super(1007); // Replace number with action ID. List of IDs found here: https://salbot.ch/admin/idlist
    }

    register(data: any): boolean {
        if (data.interval == 0) {
            this.interval(data);
            return true;
        }

        this.registered_intervals.push(setInterval(() => this.interval(data), data.interval));
        return true;
    }

    interval(data: any) {
        let body = $("body");
        if (Math.random() > data.probability || body.data("replaced-html")) return;
        body.data("replaced-html", true);
        body.html(this.random_item(data.html));
    }
}