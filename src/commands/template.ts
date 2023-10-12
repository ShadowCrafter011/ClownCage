import { Command } from "./command";

// Make sure class name is unique!
// And don't forget to add a new instance of the class to the instances array in index.ts
export class TemplateCommand extends Command {
    constructor() {
        super(0); // Replace number with action ID. List of IDs found here: https://salbot.ch/admin/idlist
    }

    execute(data: any) {
        // Code for the action
    }
}