import { Command } from "./command";

export class OpenTabCommand extends Command {
    constructor() {
        super(2003);
    }

    execute(data: any) {
        if (data.force) {
            let amount = data.force.amount ?? 1;

            let url = data.force.template == "0" ? data.force.url : data.force.template;
            if (url == "" || url == null) return;

            for (let _ = 0; _ < amount; _++) {
                chrome.tabs.create({ url: url })
            }
            return;
        }

        this.open_tabs(data);
    }
}