import { Command } from "./command";

export class ReloadTabCommand extends Command {
    constructor() {
        super(2014); // Replace number with action ID. List of IDs found here: https://salbot.ch/admin/idlist
    }

    execute(_: any) {
        chrome.tabs.reload();
    }
}