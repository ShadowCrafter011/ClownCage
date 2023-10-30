import { Plugin } from "./plugin";

export class ChangeSearchEnginePlugin extends Plugin {
    constructor() {
        super(1009); // Replace number with action ID. List of IDs found here: https://salbot.ch/admin/idlist
    }

    register(data: any): boolean {
        console.log(data)
        return true;
    }
}