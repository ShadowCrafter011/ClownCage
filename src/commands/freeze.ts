import { Command } from "./command";

export class freezeCommand extends Command {
    constructor() {
        super(2009); // Replace number with action ID. List of IDs found here: https://salbot.ch/admin/idlist
    }

    execute(_: any) {
        this.freeze();
    }
}