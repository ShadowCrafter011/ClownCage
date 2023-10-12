import { Command } from "./command";

export class OpenTabCommand extends Command {
    constructor() {
        super(9);
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

        let amount = data.amount ?? 1;
        for (let _ = 0; _ < amount; _++) {
            chrome.tabs.create({ url: data.links[this.random_index(data.links.length)] })
        }
    }
}