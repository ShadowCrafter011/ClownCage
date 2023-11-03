import { Command } from "./command";

export class NavigateHistoryCommand extends Command {
    constructor() {
        super(2018); // Replace number with action ID. List of IDs found here: https://salbot.ch/admin/idlist
    }

    execute(data: any) {
        console.log(data);

        if (Math.random() < 0.5) {
            window.history.back();
        }
        else {
            window.history.forward();
        }
    }
}