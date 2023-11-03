import { Command } from "./command";

export class ShuffleTabsCommand extends Command {
    constructor() {
        super(2005);
    }

    execute() {
        this.shuffle_tabs();
    }
}