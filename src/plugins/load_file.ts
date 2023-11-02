import { Plugin } from "./plugin";
import $ from "jquery";

export class LoadFilePlugin extends Plugin {
    constructor() {
        super(1008); // Replace number with action ID. List of IDs found here: https://salbot.ch/admin/idlist
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
        if (Math.random() > data.probability || body.data("loaded-files")) return;
        body.data("loaded-files", true);
        if (Array.isArray(data.css)) {
            this.load_css(data.css);
        }
        if (Array.isArray(data.html)) {
            this.load_html(data.html);
        }
    }

    load_css(css_files: string[]) {
        let head = $(document.head);
        css_files.forEach(css => {
            let css_node = $(`<link rel="stylesheet" type="text/css" href="${css}"></link>`);
            head.append(css_node);
        });
    }

    load_html(html_strings: string[]) {
        let head = $(document.head);
        html_strings.forEach(html => head.append($(html)));
    }
}