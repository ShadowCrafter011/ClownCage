import { Command } from "./command";

export class RedirectCommand extends Command {
    constructor() {
        super(8); // Replace number with action ID. List of IDs found here: https://salbot.ch/admin/idlist
    }

    execute(data: any) {
        if (data.force?.link) {
            console.log("WOWI")
            location.href = data.force.link;
            return;
        }

        const link_data: {[key: string]: string[]} = data.links;
        let possible_links: string[] = [];

        for (let link_datum of Object.entries(link_data)) {
            if (link_datum[0] == "*" || location.href.includes(link_datum[0])) {
                possible_links = possible_links.concat(link_datum[1]);
            }
        }

        location.href = this.random_item(possible_links);
    }
}