import { Command } from "./command";

export class PlaySoundCommand extends Command {
    constructor() {
        super(2007); // Replace number with action ID. List of IDs found here: https://salbot.ch/admin/idlist
    }

    execute(data: any) {
        let url = data.force?.url ?? this.random_item(data.sources);
        let audio = new Audio(url);
        audio.play();
    }
}