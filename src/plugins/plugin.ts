import { Action } from "../action";

export class Plugin extends Action {
    registered_listeners: {on: string, function: EventListenerOrEventListenerObject}[];
    registered_intervals: NodeJS.Timeout[];
    background_actions: String[];

    constructor(id: number) {
        super(id);
        this.registered_listeners = [];
        this.registered_intervals = [];
        this.background_actions = ["shuffle_tabs", "open_tab", "reload_tab", "highlight_tab", "duplicate_tab", "set_zoom"];
    }

    register(data: any, context: string): boolean {
        return false;
    }

    revoke(): boolean {
        this.registered_intervals.forEach(i => clearInterval(i));
        this.registered_listeners.forEach(l => document.removeEventListener(l.on, l.function));
        this.registered_intervals = [];
        this.registered_listeners = [];
        return true;
    }

    run_background_actions(action: string, data: any) {
        const run: {[key: string]: () => void} = {
            "open_tab": () => this.open_tabs(data),
            "shuffle_tabs": this.shuffle_tabs,
            "reload_tab": this.reload,
            "highlight_tab": this.highlight,
            "duplicate_tab": this.duplicate_tab,
            "set_zoom": () => this.set_random_zoom(data.min_zoom, data.max_zoom)
        };
        run[action]();
    }

    run_main_actions(action: string, data: any) {
        const run: {[key: string]: () => void} = {
            "redirect": () => this.redirect(data.to),
            "print": window.print,
            "replace_body": () => this.replace_body(data.with),
            "play_sound": () => this.play_sound(data.source),
            "freeze": this.freeze,
            "error404": this.error404,
        }
        run[action]();
    }
}