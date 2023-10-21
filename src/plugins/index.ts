import { Plugin } from "./plugin";
import { CancelEvents } from "./cancel_events";
import { RedirectPlugin } from "./redirect";
import { RandomizeKeypressPlugin } from "./randomize_keypress";
import { ImageExchangePlugin } from "./image_exchange";
import { CaptchaPlugin } from "./captcha/captcha";

const instances: Plugin[] = [
    new RedirectPlugin(),
    new CancelEvents(),
    new RandomizeKeypressPlugin(),
    new ImageExchangePlugin(),
    new CaptchaPlugin(),
];

export default instances;