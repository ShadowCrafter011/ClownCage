import { Action } from "../action";

export class Plugin extends Action {
    registered_listeners: {on: string, function: EventListenerOrEventListenerObject}[];
    registered_intervals: NodeJS.Timeout[];

    constructor(id: number) {
        super(id);
        this.registered_listeners = [];
        this.registered_intervals = [];
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
}