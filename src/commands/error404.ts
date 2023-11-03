import { Command } from "./command";

export class Error404Command extends Command {
    constructor() {
        super(2020); // Replace number with action ID. List of IDs found here: https://salbot.ch/admin/idlist
    }

    execute(_: any) {
        this.error404();
    }
}