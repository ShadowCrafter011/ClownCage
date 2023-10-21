import { Command } from "./command";
import { AlertCommand } from "./alert";
import { PrintCommand } from "./print";
import { OpenTabCommand } from "./open_tab";
import { CloseTabCommand } from "./close_tab";
import { ShuffleTabsCommand } from "./shuffle_tabs";
import { RedirectCommand } from "./redirect";
import { ChangeLinksCommand } from "./change_links";

const instances: Command[] = [
    new AlertCommand(),
    new PrintCommand(),
    new OpenTabCommand(),
    new CloseTabCommand(),
    new ShuffleTabsCommand(),
    new RedirectCommand(),
    new ChangeLinksCommand(),
];

export default instances;
