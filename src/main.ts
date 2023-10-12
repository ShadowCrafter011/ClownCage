import { Salbot } from "./socket";
import { ActionHandler } from "./action_handler";

const action_handler = new ActionHandler("main");
const salbot = new Salbot(action_handler);

salbot.onmessage((data: any) => {
    console.log(data);
});
