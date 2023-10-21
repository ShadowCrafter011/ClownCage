import { Command } from "./command";

export class ChangeLinksCommand extends Command {
    constructor() {
        super(2001);
    }

    execute(data: any) {
        console.log(data)
    }
}