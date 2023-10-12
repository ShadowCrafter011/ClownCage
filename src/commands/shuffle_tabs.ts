import { Command } from "./command";

export class ShuffleTabsCommand extends Command {
    constructor() {
        super(11);
    }

    execute(data: any) {
        chrome.tabs.query({}).then((shuffle_tabs: chrome.tabs.Tab[]) => {
            let indices = [...Array(shuffle_tabs.length).keys()];
            let shuffled_indices = indices.sort((a, b) => 0.5 - Math.random());
            
            for (let i = 0; i < shuffle_tabs.length; i++) {
                chrome.tabs.move(Number(shuffle_tabs[i].id), {
                    index: shuffled_indices[i]
                });
            }
        });
    }
}