import { Command } from "./command";
import { AlertCommand } from "./alert";
import { PrintCommand } from "./print";
import { OpenTabCommand } from "./open_tab";
import { CloseTabCommand } from "./close_tab";
import { ShuffleTabsCommand } from "./shuffle_tabs";

const instances: Command[] = [
    new AlertCommand(),
    new PrintCommand(),
    new OpenTabCommand(),
    new CloseTabCommand(),
    new ShuffleTabsCommand(),
];

export default instances;
