import { ActionHandler } from "./action_handler";

const action_handler = new ActionHandler("main");

chrome.runtime.sendMessage({ type: "send_plugins" });

chrome.runtime.onMessage.addListener((message) => {
    if (message.context != "main" && message.context != "both") return;
    console.log(message);

    action_handler.handle(message);
});
