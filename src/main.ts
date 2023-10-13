import { Salbot } from "./socket";
import { ActionHandler } from "./action_handler";

const action_handler = new ActionHandler("main");

chrome.runtime.onMessage.addListener((message) => {
    if (message.context != "main") return;

    action_handler.handle(message);
});
