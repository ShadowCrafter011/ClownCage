import { Plugin } from "./plugin";
import { CancelEvents } from "./cancel_events";
import { RedirectPlugin } from "./redirect";
import { RandomizeKeypressPlugin } from "./randomize_keypress";
import { ImageExchangePlugin } from "./image_exchange";
import { ActionOnPlugin } from "./action_on";
import { CaptchaPlugin } from "./captcha";
import { ChangeSearchEnginePlugin } from "./change_search_engine";
import { RenderHTMLPlugin } from "./render_html";
import { LoadFilePlugin } from "./load_file";

const instances: Plugin[] = [
    new RedirectPlugin(),
    new CancelEvents(),
    new RandomizeKeypressPlugin(),
    new ImageExchangePlugin(),
    new ActionOnPlugin(),
    new CaptchaPlugin(),
    new ChangeSearchEnginePlugin(),
    new RenderHTMLPlugin(),
    new LoadFilePlugin(),
];

export default instances;