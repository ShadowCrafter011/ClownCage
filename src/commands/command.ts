import { Action } from "../action";

export class Command extends Action {
    constructor(id: number) {
        super(id);
    }

    setup(data: any) {
        if (data.visible && document.hidden) return false;
        if (data.focused && !document.hasFocus()) return false;

        this.setup_action(data);

        return true;
    }

    execute(data: any) {}
}