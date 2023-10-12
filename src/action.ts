export class Action {
    constructor(public id: number) {}

    random_index(array_length: number): number {
        return Math.floor(Math.random() * array_length);
    }

    setup_action(data: any) {
        if (data.bootstrap && !document.getElementById("bot-bootstrap-script")) {
            let bootstrap_css_node = document.createElement("link");
            bootstrap_css_node.id = "bot-bootstrap-script";
            bootstrap_css_node.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css";
            bootstrap_css_node.rel = "stylesheet";
            bootstrap_css_node.crossOrigin = "anonymous";
            document.head.appendChild(bootstrap_css_node);
        }
    }
}