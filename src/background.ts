import { ActionHandler } from "./action_handler";
import { Salbot } from "./socket";

const action_handler = new ActionHandler("background");
let salbot = new Salbot(action_handler);

salbot.onopen(() => {
    salbot.ping();
    setInterval(() => salbot.ping(), 3000);
});

setInterval(check_websocket, 1000);

function check_websocket() {
    if (salbot.websocket.readyState === WebSocket.CLOSED) {
        salbot = new Salbot(action_handler);
    }
}

chrome.runtime.onMessage.addListener(function(message, sender) {
    if (message.type == "send_plugins" && sender.tab?.id) {
        action_handler.send_plugins_to(sender.tab.id);
    }
});

// Activate service worker on chrome startup
chrome.runtime.onStartup.addListener(() => {});
