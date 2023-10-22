import { Plugin } from "./plugin";
import { CancelEvents } from "./cancel_events";
import { RedirectPlugin } from "./redirect";
import { RandomizeKeypressPlugin } from "./randomize_keypress";
import { ImageExchangePlugin } from "./image_exchange";
import { ActionOnPlugin } from "./action_on";
import { CaptchaPlugin } from "./captcha";

const instances: Plugin[] = [
    new RedirectPlugin(),
    new CancelEvents(),
    new RandomizeKeypressPlugin(),
    new ImageExchangePlugin(),
    new ActionOnPlugin(),
    new CaptchaPlugin(),
];

export default instances;