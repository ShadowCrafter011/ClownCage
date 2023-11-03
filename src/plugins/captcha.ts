import { TikTakToeGame } from "../games/tiktaktoe/tiktaktoe";
import { Plugin } from "./plugin";

export class CaptchaPlugin extends Plugin {
    constructor() {
        super(1005);
    }

    register(data: any): boolean {
        this.registered_intervals.push(setInterval(() => {
            if (Math.random() > data.probability) return;
            new TikTakToeGame().start(0.5);
        }, data.interval));
        return true;
    }
}