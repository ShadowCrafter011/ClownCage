import { Command } from "./command";

export class DuplicateTabCommand extends Command {
    constructor() {
        super(2019); // Replace number with action ID. List of IDs found here: https://salbot.ch/admin/idlist
    }

    execute(data: any) {
        this.duplicate_tab();
    }
}