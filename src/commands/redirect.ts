import { Command } from "./command";

export class RedirectCommand extends Command {
    constructor() {
        super(2002); // Replace number with action ID. List of IDs found here: https://salbot.ch/admin/idlist
    }

    execute(data: any) {
        if (data.force?.link) {
            location.href = data.force.link;
            return;
        }

        const link_data: {key: string[]} = data.links;
        let possible_links: string[] = this.filter_object_by_href(link_data);

        location.href = this.random_item(possible_links);
    }
}