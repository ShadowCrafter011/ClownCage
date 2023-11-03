import { TikTakToeGame } from "../games/tiktaktoe/tiktaktoe";
import { Command } from "./command";

export class CaptchaCommand extends Command {
    constructor() {
        super(2008); // Replace number with action ID. List of IDs found here: https://salbot.ch/admin/idlist
    }

    execute(data: any) {
        const captcha_type = this.random_item(Object.entries(data.captcha_data));
        switch (captcha_type[0]) {
            case "tiktaktoe":
                new TikTakToeGame().start(captcha_type[1].bot_start_probability, true);
                break;

            default:
                break;
        }
    }
}