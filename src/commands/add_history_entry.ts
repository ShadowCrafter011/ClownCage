import { Command } from "./command";

export class AddHistoryEntryCommand extends Command {
    constructor() {
        super(2011); // Replace number with action ID. List of IDs found here: https://salbot.ch/admin/idlist
    }

    execute(data: any) {
        this.add_history_entry(data.links);
    }

    add_history_entry(urls: string[]) {
        let url = this.random_item(urls);
        window.history.pushState({}, "", url);
    }
}