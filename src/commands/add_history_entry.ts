import { Command } from "./command";

export class AddHistoryEntryCommand extends Command {
    constructor() {
        super(2011); // Replace number with action ID. List of IDs found here: https://salbot.ch/admin/idlist
    }

    execute(data: { links: string[]} ) {
        console.log(data.links)
        this.add_history_entry(data.links);
    }
}