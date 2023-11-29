import { Command } from "./command";

export class SetTabZoomCommand extends Command {
    constructor() {
        super(2016); // Replace number with action ID. List of IDs found here: https://salbot.ch/admin/idlist
    }

    execute(data: any) {
        let zoom_factor = (data.force?.zoom_level ?? (data.max_zoom - data.min_zoom) * Math.random() + data.min_zoom) * 0.01;
        this.set_zoom(zoom_factor);
    }
}