import { Action } from "../action";

export class Command extends Action {
    constructor(id: number) {
        super(id);
    }

    setup(data: any, context: string) {
        let require_visible = data.visible;
        let require_focus = data.focused;

        if (data.force?.visible) require_visible = data.force.visible == "1";
        if (data.force?.focused) require_focus = data.force.focused == "1";

        if (data.context == "main") {
            if (require_visible && document.hidden) return false;
            if (require_focus && !document.hasFocus()) return false;

            this.setup_action(data);
        }

        return true;
    }

    execute(data: any, context: string) {}
}