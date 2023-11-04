import { Command } from "./command";

export class HighlightTabCommand extends Command {
    constructor() {
        super(2015); // Replace number with action ID. List of IDs found here: https://salbot.ch/admin/idlist
    }

    execute(data: any) {
        this.highlight();
    }
}