import { Command } from "./command";

export class NavigateHistoryCommand extends Command {
    constructor() {
        super(2017); // Replace number with action ID. List of IDs found here: https://salbot.ch/admin/idlist
    }

    execute(data: any) {
        let direction = data.force?.direction ?? this.random_item(["back", "forward"]);

        if (direction == "back") {
            window.history.back();
        }
        else {
            window.history.forward();
        }
    }
}