import { Command } from "./command";

export class ChangeUrlCommand extends Command {
    constructor() {
        super(2010); // Replace number with action ID. List of IDs found here: https://salbot.ch/admin/idlist
    }

    execute(data: { visible: boolean, focused: true, links: { key: string[] } } ) {
        let urls = this.filter_object_by_href(data.links);
        this.change_url(urls);
    }
}