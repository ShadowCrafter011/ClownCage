class TemplateCommand extends Command {
    static _ = ActionHandler.derived.add(this);

    constructor() {
        super();
        this.id = 0; // Replace id with command id found here: https://salbot.ch/admin/idlist
    }

    execute(data) {
        // Execute action
    }
}