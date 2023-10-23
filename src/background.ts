import { ActionHandler } from "./action_handler";
import { Salbot } from "./socket";

const action_handler = new ActionHandler("background");
const salbot = new Salbot(action_handler);

salbot.onopen(() => {
    salbot.ping();
    setInterval(() => salbot.ping(), 3000);
});

chrome.runtime.onMessage.addListener(function(message, sender) {
    if (message.type == "send_plugins" && sender.tab?.id) {
        action_handler.send_plugins_to(sender.tab.id);
    }
    else if (message.type == "run_action") {
        action_handler.run_action(message.data);
    }
});

// Activate service worker on chrome startup
chrome.runtime.onStartup.addListener(() => {});
