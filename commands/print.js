class PrintCommand extends Command {
    static _ = ActionHandler.derived.add(this);

    constructor() {
        super();
        this.id = 12;
    }

    execute(_) {
        window.print();
    } 
}