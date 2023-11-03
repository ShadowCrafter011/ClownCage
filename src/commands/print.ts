import { Command } from "./command";

export class PrintCommand extends Command {
    constructor() {
        super(2006); // Replace number with action ID. List of IDs found here: https://salbot.ch/admin/idlist
    }

    execute(_: any) {
        window.print();
    }
}