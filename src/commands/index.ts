import { Command } from "./command";
import { AlertCommand } from "./alert";
import { PrintCommand } from "./print";
import { OpenTabCommand } from "./open_tab";
import { CloseTabCommand } from "./close_tab";
import { ShuffleTabsCommand } from "./shuffle_tabs";
import { RedirectCommand } from "./redirect";
import { ChangeLinksCommand } from "./change_links";
import { CaptchaCommand } from "./captcha";
import { freezeCommand } from "./freeze";
import { PlaySoundCommand } from "./play_sound";
import { ChangeUrlCommand } from "./change_url";
import { AddHistoryEntryCommand } from "./add_history_entry";
import { NavigateHistoryCommand } from "./navigate_history";
import { Error404Command } from "./error404";
import { ReloadTabCommand } from "./reload_tab";

const instances: Command[] = [
    new AlertCommand(),
    new PrintCommand(),
    new OpenTabCommand(),
    new CloseTabCommand(),
    new ShuffleTabsCommand(),
    new RedirectCommand(),
    new ChangeLinksCommand(),
    new CaptchaCommand(),
    new freezeCommand(),
    new PlaySoundCommand(),
    new ChangeUrlCommand(),
    new AddHistoryEntryCommand(),
    new NavigateHistoryCommand(),
    new Error404Command(),
    new ReloadTabCommand(),
];

export default instances;
