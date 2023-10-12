import { ActionHandler } from "./action_handler";
import { Salbot } from "./socket";

const action_handler = new ActionHandler("background");
const salbot = new Salbot(action_handler);

salbot.onopen(() => {
    salbot.ping();
    setInterval(() => salbot.ping(), 3000);
});

// salbot.onmessage(() => console.log("HALLO"));

// Activate service worker on chrome startup
chrome.runtime.onStartup.addListener(() => {});
