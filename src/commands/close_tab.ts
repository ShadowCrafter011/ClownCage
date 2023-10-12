import { Command } from "./command";

export class CloseTabCommand extends Command {
    constructor() {
        super(10);
    }

    execute(data: any) {
        var random = (data.force?.random ?? data.random) == "1";
        var num_tabs = data.force?.amount ?? data.amount ?? 1;
        var start_index = data.force?.start;
        var self = this;
        chrome.tabs.query({}).then(function(tabs: chrome.tabs.Tab[]) {
            num_tabs = parseInt(num_tabs);
            start_index = parseInt(start_index);

            if (num_tabs >= tabs.length || num_tabs == 0) {
                chrome.tabs.remove(tabs.map(t => t.id ? t.id : -1));
            }
            
            if (random) {
                let tab_ids: chrome.tabs.Tab[] = []
                for (let x = 0; x < num_tabs; x++) {
                    tab_ids.push(tabs.splice(self.random_index(tabs.length), 1)[0]);
                }
                chrome.tabs.remove(tab_ids.map(t => t.id ? t.id : -1));
            } else {
                let to_close = tabs.slice(start_index, start_index + num_tabs);
                chrome.tabs.remove(to_close.map(t => t.id ? t.id : -1));
            }
        });
    }
}